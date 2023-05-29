# Invoke Actions

Pando is a set of blockchain protocols executed by sending transactions to multisig address.

To retrieve information, call the APIs and read the response. 

However, if you want to interact with the protocols and tell them what you want to do with cryptocurrency, you need to send transactions to Pando's multisig address. 

The behavior of each transaction is illustrated by the [Action Protocol](https://developers.pando.im/references/action.html), a byte array encoded in the transaction memo field. When you send a transaction, MTG Nodes decode the memo field and execute the action within.

To better understand how the action works, let's generate the action manually. This time, we'll use 4swap's `swap` action as an example: We want to swap `CNB` to `DOGE`.

First, we need to know the asset ID of `CNB` and `DOGE`: 

- CNB: `965e5c6e-434c-3fa9-b780-c50f43cd955c`
- DOGE: `6770a1e5-6086-44d5-b60f-545f9d9e8ffd`

Those 2 assets has [a pool at Pando](https://app.pando.im/swap?mode=pro&base=6770a1e5-6086-44d5-b60f-545f9d9e8ffd&quote=965e5c6e-434c-3fa9-b780-c50f43cd955c), so we can swap them directly.

## Form the action

The ["Swap" action](references/4swap/action.html#swap) are formed as a byte-based structure. You can see the specification in the [reference](https://developer.pando.im/references/4swap/action.html#swap).

You can build the structure yourself, or using the packages provided by Pando Team.

### Generate action using `@foxone/memo-encode`

For JavaScript developers, you can use the `@foxone/memo-encode` to generate the action quickly:

```javascript
import { swap as MemoEncoder } from "@foxone/memo-encode";

// swap encode
const params = {
  // an UUID to trace the order. We just generate a random UUID.
  follow_id: uuid(),
  // the asset ID of the asset you want to get. In the example, we want to get `DOGE`.
  fill_asset_id: '6770a1e5-6086-44d5-b60f-545f9d9e8ffd',
  // the minimum amount of asset you will get. In the example, we want to get at least `0.00000001 DOGE`.
  minimum: 0.00000001,
  // the routes of the swap. We'll leave it blank for now
  // Pando will use CNB/DOGE pool for the swap. 
  // In real projects, you need to calculate the routes by yourself: https://github.com/fox-one/4swap-sdk-go/blob/e62757b2c4966d3ebac7eb40dcad7d1926c7f9e3/route.go 
  route_hash: "",
  // the members group to receive the filled asset.
  // we leave it blank to use the sender(our bot) as the receiver.
  members: [],
};

// base64 memo for mixin transaction
const memo = MemoEncoder.encodeSwapMemo(params);
```

### Generate actions by 4swap SDK

Action are encoded in bytes and encrypted by ed25519. It's recommended to generate it by using the [4swap SDK](https://github.com/fox-one/4swap-sdk-go), to simplify the process. 

The following example shows how to generate a swap action by `mtg.SwapAction`:

```go
import (
  fswap "github.com/fox-one/4swap-sdk-go"
	"github.com/fox-one/4swap-sdk-go/mtg"
	"github.com/fox-one/mixin-sdk-go"
)

// ...

// fetch the pair list
pairs, err := fswap.ListPairs(context.TODO())
if err != nil {
  return
}

// sort first
sort.Slice(pairs, func(i, j int) bool {
  aLiquidity := pairs[i].BaseValue.Add(pairs[i].QuoteValue)
  bLiquidity := pairs[j].BaseValue.Add(pairs[j].QuoteValue)
  return aLiquidity.GreaterThan(bLiquidity)
})

// calculate the routes
preOrder, err := fswap.Route(pairs, inputAssetID, outputAssetID, inputAmount)
if err != nil {
  return nil, err
}

// the ID to trace the orders
followID, _ := uuid.NewV4()

// build a swap action, specified the parameters
action := mtg.SwapAction(
    receiverID,
    followID.String(),
    outputAssetID,
    // the routes of the swap
    preOrder.Routes,
    // the minimum amount of asset you will get.
    // you may want to change this value to a number which is less than preOrder.FillAmount
    preOrder.FillAmount.Div(decimal.NewFromFloat(0.005)),
)

// generate the memo
memo, err := action.Encode(group.PublicKey)
if err != nil {
    return err
}
log.Println("memo", memo)
```

## Send transactions

### Send by `mixin-cli`

When you have the encoded action for the memo field, you can send transactions to Pando's MTG. 

There are various ways to send transactions, but for testing, you can use `mixin-cli`.

```bash{3,4,5,6,7,8,9} [mixin-cli]
$ mixin-cli -f ./keystore.json transfer --asset 965e5c6e-434c-3fa9-b780-c50f43cd955c \
--amount 20 \
--receivers a753e0eb-3010-4c4a-a7b2-a7bda4063f62 \
--receivers 099627f8-4031-42e3-a846-006ee598c56e \
--receivers aefbfd62-727d-4424-89db-ae41f75d2e04 \
--receivers d68ca71f-0e2c-458a-bb9c-1d6c2eed2497 \
--receivers e4bc0740-f8fe-418c-ae1b-32d9926f5863 \
--threshold 3 \
--memo $YOUR_MEMO_HERE 
```

Note that the `receivers` fields are filled with the members of the MTG. The `threshold` field is the multisig threshold of the MTG. You can get the members and threshold from `/info` API as we mentioned in the [previous section](./call-apis).

the `memo` field is the action you generated.

Run the command and type `y` to confirm the transfer, you will see the transaction is sent to the 4swap MTG. Wait for a while, you will receive some `DOGE` in your keystore:

```base{3}
$ mixin-cli -f $LYRIC_KEYSTORE asset list
AssetId                               Symbol     Name                     Balance
6770a1e5-6086-44d5-b60f-545f9d9e8ffd  DOGE       Dogecoin                 0.00000212
965e5c6e-434c-3fa9-b780-c50f43cd955c  CNB        Chui Niu Bi              12.919
```

### Send programmatically

For production, you may need to use the [mixin-sdk-go](https://github.com/fox-one/mixin-sdk-go) or other SDKs to do that.

```go{7,12,13} [Go]
client := mixin.NewFromKeystore(keystore)

tx, err := client.Transaction(ctx, &mixin.TransferInput{
  AssetID: payAssetID,
  Amount:  decimal.RequireFromString(amount),
  TraceID: mixin.RandomTraceID(),
  Memo:    `$YOUR_MEMO_HERE`,
  OpponentMultisig: struct {
    Receivers []string `json:"receivers,omitempty"`
    Threshold uint8    `json:"threshold,omitempty"`
  }{
    Receivers: members,          
    Threshold: uint8(threshold),
  },
}, *pin)
```

