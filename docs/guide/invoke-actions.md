# Invoke Actions

Pando is a set of blockchain protocols executed by sending transactions to multisig address.

To retrieve information, call the APIs and read the response. 

However, if you want to interact with the protocols and tell them what you want to do with cryptocurrency, you need to send transactions to Pando's multisig address. 

The behavior of each transaction is illustrated by the `Action Protocol`, a byte array encoded in the transaction memo field. When you send a transaction, MTG Nodes decode the memo field and execute the action within.

## Generate actions by API

To better understand how the action works, let's generate the action manually. This time, we'll use 4swap's `swap` action as an example: We want to swap `CNB` to `DOGE`.

First, we need to know the asset ID of `CNB` and `DOGE`: 

- CNB: `965e5c6e-434c-3fa9-b780-c50f43cd955c`
- DOGE: `6770a1e5-6086-44d5-b60f-545f9d9e8ffd`

Those 2 assets has [a pool in 4swap](https://app.4swap.org/#/pair/detail?base=6770a1e5-6086-44d5-b60f-545f9d9e8ffd&quote=965e5c6e-434c-3fa9-b780-c50f43cd955c), so we can swap them directly.

### Form the action

The `swap` action are formatted as following string

```
3,:receiver_id,:follow_id,:fill_asset_id,:routes,:minimum
```

:::info in which:
- `3`: the action type, `3` means `swap`.
- `receiver_id`: the ID of the receiver, you can use the `client_id` in your keystore.
- `follow_id`: an UUID to trace the order. You can use `uuidgen` to generate a random UUID.
- `fill_asset_id`: the asset ID of the asset you want to get. In the example, we want to get `DOGE`, which is `6770a1e5-6086-44d5-b60f-545f9d9e8ffd`.
- `routes`: the routes of the swap. We'll leave it blank for now, 4swap will use [CNB/DOGE pool](https://app.4swap.org/#/pair/detail?base=6770a1e5-6086-44d5-b60f-545f9d9e8ffd&quote=965e5c6e-434c-3fa9-b780-c50f43cd955c&source=market) for the swap. In real projects, you need to [calculate the routes](https://github.com/fox-one/4swap-sdk-go/blob/e62757b2c4966d3ebac7eb40dcad7d1926c7f9e3/route.go#L169) by yourself.
- `minimum`: the minimum amount of asset you will get. In the example, we want to get at least `0.00000001 DOGE`.
:::

Assume that your `client_id` is `eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx`, so the action will be:

```bash
3,eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx,$RANDOM_UUID_HERE,6770a1e5-6086-44d5-b60f-545f9d9e8ffd,,0.00000001
```

### Encode the action

It's hard to encode the action without writing code. Fortunately, 4swap provides an API to encode the action:

```bash{4}
$ curl --location --request POST 'https://api.4swap.org/api/actions' \
--header 'Content-Type: application/json' \
--data-raw '{
  "action":     "3,eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx,'$(uuidgen)',6770a1e5-6086-44d5-b60f-545f9d9e8ffd,,0.00000001"
}'
```

It will output something like that:

```bash{4}
{
  "ts":1675064016874,
  "data": {
    "action":"PBK6......7czqcUt",
    "follow_id":"bde36668-8715-4bdf-9a40-d13ad5561d53"
  }
}
```

The `action` field is the encoded action, we will put it in the `memo` field of the transaction.

## Generate actions by SDK

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

