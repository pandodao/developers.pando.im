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

```
3,:receiver_id,:follow_id,:fill_asset_id,:routes,:minimum
3,eac51982-6cf9-42c9-8fc8-ee5c17d3cb27,ae301d7b-7ead-432f-9d3a-d6ea18c34030,c6d0c728-2624-429b-8e0d-d9d19b6592fa,,0.00000001
```

## Send Transactions

When you have the action, encoded in the memo field, you're ready to send transactions to Pando's MTG.

There are several ways to send transactions to Pando's MTG. For testing purpose, you can use `mixin-cli`. 

```bash [mixin-cli]
mixin-cli -f $LYRIC_KEYSTORE transfer --asset 31d2ea9c-95eb-3355-b65b-ba096853bc18 \
--amount 0.1 \
--receivers a753e0eb-3010-4c4a-a7b2-a7bda4063f62 \
--receivers 099627f8-4031-42e3-a846-006ee598c56e \
--receivers aefbfd62-727d-4424-89db-ae41f75d2e04 \
--receivers d68ca71f-0e2c-458a-bb9c-1d6c2eed2497 \
--receivers e4bc0740-f8fe-418c-ae1b-32d9926f5863 \
--threshold 3 \
--memo MyxlYWM1MTk4Mi02Y2Y5LTQyYzktOGZjOC1lZTVjMTdkM2NiMjcsYWUzMDFkN2ItN2VhZC00MzJmLTlkM2EtZDZlYTE4YzM0MDMwLGM2ZDBjNzI4LTI2MjQtNDI5Yi04ZTBkLWQ5ZDE5YjY1OTJmYSwsMC4wMDAwMDAwMQo=
```

Note that the `receivers` fields are filled with the members of the MTG. The `threshold` field is the multisig threshold of the MTG. You can get the members and threshold from `/info` API as we mentioned in the [previous section](./call-apis).

For production, you may need to use the [mixin-sdk-go](https://github.com/fox-one/mixin-sdk-go) or other SDKs to do that.

```go [Go]
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

Please note that the `members` field contains an array of UUIDs, which presents the members of the MTG. The `threshold` field is the multisig threshold of the MTG. You can get the members and threshold from `/info` API.

