# Invoke Actions

Pando are a set of a blockchain based protocols, which are designed to be executed by sending transactions to Pando's MTG.

For example, if you want to get information from the protocols, call the APIs and read the response is the easiest way. But if you want to interact with the protocols, tell the protocols what you want to do, with cryptocurrency as the medium, you need to send transactions to Pando's MTG.

The `Action Protocol` to illustrate behaviors of each transaction. `Action Protocol` is basically a bytes array, which is encoded in the transaction memo field.

When you send a transaction to Pando's MTG, MTG Nodes will try to decode the memo field and execute the action in it.

## Generate Actions by SDK

Although action are encoded in bytes, you can easily generate them by using the [4swap SDK](https://github.com/fox-one/4swap-sdk-go), to simplify the process. 

The following example showcases how to generate a swap action by `mtg.SwapAction`:

```go
// the ID to trace the orders
followID, _ := uuid.NewV4()

// build a swap action, specified the parameters
action := mtg.SwapAction(
    receiverID,
    followID.String(),
    OutputAssetID,
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

## Generate Actions Manually

`@TODO`

```
3,:receiver_id,:follow_id,:fill_asset_id,:routes,:minimum
```

## Send Transactions

When you have the action, encoded in the memo field, you're ready to send transactions to Pando's MTG.

There are several ways to send transactions to Pando's MTG. For testing purpose, you can use `mixin-cli`. 

```bash{3,4,5,6,7,8,9} [mixin-cli]
mixin-cli -f $LYRIC_KEYSTORE transfer --asset 31d2ea9c-95eb-3355-b65b-ba096853bc18 \
--amount 0.1 \
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

