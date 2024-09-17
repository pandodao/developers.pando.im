## Brief

The `pool` is the internal name of the project, which is the functional implementation of `Earns` on the front-end interface. It handles user requests to buy/redeem/queue to buy/queue to redeem, etc, and also handles cases such as interest payment and aggregation of queued orders for fulfillment.

We use [Protocol Buffers](https://protobuf.dev) to define the service details, which are also part of the documentation, so you know the APIs we provide, the data structure of the request and response, the meaning of the enumeration values, the supported actions and the list of parameters needed to generate the memo. 

The proto file is located in [pool.proto](https://github.com/pandodao/pando-protos/blob/feat/add-pool-service/protos/pool/v1/pool.proto). 

## APIs

We use [twirp](https://twitchtv.github.io/twirp/docs/intro.html) as the RPC framework to provide APIs access, so it's in the form of RPC style, not a traditional RESTful request. About the difference between them, you can refer to [this article](https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/).

Each RPC method has its own separate request and response structure even if it's empty, you can easily find the appropriate structure. For example, the `ListAssets` method is defined as follows:

```protobuf
rpc ListAssets(ListAssetsRequest) returns (ListAssetsResponse);
```

The service host is `https://pool-api.fennec.rocks`, then you can call the API with curl as follows (the request body is empty):

```bash
curl -X POST -d "{}" -H "Content-Type: application/json" $POOL_HOST/twirp/pool.v1.PoolService/ListAssets
```

For some APIs that require authentication for access, you need to request with the `Authorization` header.

## Actions

For write operations we don't do through the API, you need to do it by initiating a transfer to the mixin app. This approach has natural auditing and any operation is logged.

Now we support the following actions, actions prefixed with `ADMIN_` are only available to administrators. (copied from proto file, for any inconsistency, please refer to the proto file)

```protobuf
message EventAction {
  enum Enum {
    NOT_SET = 0;
    BUY = 1;
    REDEEM = 2;
    DEPOSIT = 3;
    INTEREST_PAYMENT = 4;
    CANCEL_QUEUE = 5;

    // for admins

    ADMIN_INTEREST_PAYMENT = 100;
    ADMIN_PRODUCT_EXPAND = 101;
    ADMIN_PRODUCT_MERGE_EXPANSION = 102;
    ADMIN_PLEDGE = 103;
    ADMIN_CANCEL_PLEDGE = 104;
    ADMIN_LEGACY_ASSET_MIGRATION = 105;
  }
}
```

Let's take the `BUY` operation as an example. The corresponding data structure named `EarningSnapshotBuyData` can be found in the proto file, which defines the list of parameters of the action. If it is not found, it means that the operation does not need to carry any parameters.

```protobuf
message EarningSnapshotBuyData {
  int32 product_id = 1;
  EarningProductStatus.Enum product_status = 2;
}
```

You can then generate the memo for the action, which can be found in our [Action Specification](https://developers.pando.im/references/action.html).

Normally you should generate memo in your program, for convenience we use `mtgmemo` here to generate memo, which is a command-line tool. You can simply install it with the following command:

```bash
go instal github.com/pandodao/mtg/cmd/mtgmemo@latest
```

Let's generate the memo for the `BUY` action with parameters `product_id=1` and `product_status=1` as follows. The order of the parameters is the same as the order of the fields in the data structure, and the type of the parameter is specified in the format of `type:value`. 

For enumeration types, please use `uint8` type, and the value is the corresponding enumeration value. It's an agreement.

```bash
$ mtgmemo -e '{"version":2,"protocol_id":4,"follow_id":"33c11af4-dbae-2cea-158f-2eaf97872dc8","action":1,"params":["int32:1","uint8:1"]}'
AgQBM8Ea9NuuLOoVjy6vl4ctyAABAAAAAQGaHI/0
```

Then initiate a transfer with the memo, and the operation is completed. Then you can query the status of the operation through the `GetEvent` API, if an error occurs, you can refer to the error code to find the cause of the error.
