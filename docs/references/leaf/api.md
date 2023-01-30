# Leaf API

<!--@include: ../../parts/leaf-api-params.md-->

## Read info

<APIEndpoint method="GET" url="/info" />

This API will return MTG information about Leaf

### Response

```json
{
  "ts": 1633139812299,
  "data": {
    "oauth_client_id": "75f18fe8-b056-46d6-9c48-0214425e58ce",
    "members": [
      "75f18fe8-b056-46d6-9c48-0214425e58ce",
      "e96c26ca-666a-417b-9731-112d48725cca",
      "1265e53d-3642-484c-9f3d-b8616606fd6d",
      "db33b0c9-2e64-4aed-98b4-4d0b1d6a2826",
      "04601cb1-6691-4666-b4d8-720172c3a7d9",
      "d2d4399d-669d-4448-89f6-d65805e62fb7"
    ],
    "threshold": 4,
    "public_key": "mCNrmLpdwJ9zk5GsNL/ot9YXOSrCndx1ZFAiLHZxnMI="
  }
}
```

::: tip
You can save the response to use it later because the MTG information wouldn't change frequently.
:::

## Read server time

<APIEndpoint method="GET" url="/time" />

This API will respond the server time of Pando Leaf.

### Response

```json
{
  "ts": 1633139971226,
  "data": {
    "iso": "2021-10-02T01:59:31Z",
    "epoch": 1633139971
  }
}
```

## Read assets

<APIEndpoint method="GET" url="/assets" />

This API will respond all supported crypto assets.

### Response

```json
{
  "ts": 1633110638578,
  "data": {
    "assets": [
      {
        "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "name": "Bitcoin",
        "symbol": "BTC",
        "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
        "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "chain": {
          "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
          "name": "Bitcoin",
          "symbol": "BTC",
          "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
          "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
          "chain": null,
          "price": "47640"
        },
        "price": "47640"
      },
      // ...
    ]
  }
}
```

## Read asset

<APIEndpoint method="GET" url="/assets/:asset" />

This API will respond all supported crypto assets.

<APIParams :params="[ assetParam ]" />

### Response

```json
{
  "ts": 1656410506896,
  "data": {
    "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "name": "Bitcoin",
    "symbol": "BTC",
    "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "chain": {
      "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "name": "Bitcoin",
      "symbol": "BTC",
      "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "chain": null,
      "price": "21089"
    },
    "price": "21089"
  }
}
```

## Read collaterals

<APIEndpoint method="GET" url="/cats" />

This API will respond all supported collaterals.

### Response

```json
{
  "collaterals": [
    {
      // normalized debt
      "art": "number",
      // minimum bid increase
      "beg": "number",
      // max pUSD out for liquidation 
      "box": "number",
      // the liquidation penalty
      "chop": "number",
      "created_at": "2021-10-02",
      // the asset id of debt
      "dai": "string",
      // total pUSD issued
      "debt": "number",
      // max liquidation Quantity per auction
      "dunk": "number",
      // debt floor per vault
      "dust": "number",
      // stability fee
      "duty": "number",
      // the asset id of collateral
      "gem": "string",
      // id of this collateral type
      "id": "string",
      // locked Collateral
      "ink": "number",
      // debt Ceiling 
      "line": "number",
      // balance of pUSD out for liquidation
      "litter": "number",
      // status of this collateral type
      "live": true,
      // liquidation ratio, eg 150%
      "mat": "number",
      // name of this collateral type
      "name": "string",
      // number of vaults belong to this collateral type
      "number_of_vaults": 0,
      // current price of gem/dai
      "price": "number",
      // accumulated Rates
      "rate": "number",
      // the update date of `rate`
      "rho": "2021-10-02",
      // total debt supplied
      "supply": "number",
      // total auction length
      "tau": 0,
      // single bid lifetime
      "ttl": 0
    }
  ]
}
```

## Read collateral

<APIEndpoint method="GET" url="/cats/:cat" />

This API will respond one collateral with :cat

<APIParams :params="[ catParam ]" />

### Response

```json
{
  "ts": 1656410506896,
  "data": {
    "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "name": "Bitcoin",
    "symbol": "BTC",
    "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "chain": {
      "id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "name": "Bitcoin",
      "symbol": "BTC",
      "logo": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "chain": null,
      "price": "21089"
    },
    "price": "21089"
  }
}
```

## Read actions

<APIEndpoint method="GET" url="/flips?cursor=:cursor&limit=:limit" />

This API will respond all auctions.

<APIParams :params="txQueryParams" />

### Response

```json
{
  "flips": [
    {
      // ActionKick: the auction begins, any bid are accepted
      // ActionBid: the auction bidding
      // ActionDeal: the auction is over
      "action": 0,
      "art": "string",
      // the current amount of bid
      "bid": "string",
      "collateral_id": "string",
      "created_at": "2021-10-02",
      // auction end time
      "end": "2021-10-02",
      "guy": "string",
      "id": "string",
      // the amount of auctioned collateral
      "lot": "100",
      // the max amount of bid accepted
      "tab": "2",
      // bid end time
      "tic": "2021-10-02",
      "vault_id": "string"
    }
  ],
  "pagination": {
    "has_next": true,
    "next_cursor": "string"
  }
}
```

## Read action

<APIEndpoint method="GET" url="/flips/:flip" />

This API will respond one auction by `:flip`.

<APIParams :params="[ flipParam ]" />

### Response

```json
{
  "ts": 1633139399005,
  "data": {
    "id": "4ce8a961-4b90-34e8-9780-6ce46a8205a6",
    "created_at": "2021-06-22T13:00:42Z",
    "tic": "2021-06-22T14:01:13Z",
    "end": "2021-06-23T01:00:42Z",
    "bid": "1859.30248633",
    "lot": "1.07",
    "tab": "1859.30248633",
    "art": "1631.9052992207771378",
    "collateral_id": "686cb137-b5e6-586c-bece-926736ffc583",
    "vault_id": "754a82aa-6f9a-3ddc-aa4e-985f6e1b7687",
    "guy": "",
    "action": "FlipDeal"
  }
}
```

## Read action events

<APIEndpoint method="GET" url="/flips/:flip/events" />

This API will respond all events of one auction by `:flip`.

<APIParams :params="[ flipParam ]" />

### Response

```json
{
  "ts": 1633139503820,
  "data": {
    "events": [
      {
        "flip_id": "4ce8a961-4b90-34e8-9780-6ce46a8205a6",
        "created_at": "2021-06-22T13:00:42Z",
        "action": "FlipKick",
        "bid": "0",
        "lot": "1.358"
      },
      {
        "flip_id": "4ce8a961-4b90-34e8-9780-6ce46a8205a6",
        "created_at": "2021-06-22T13:01:55Z",
        "action": "FlipBid",
        "bid": "5",
        "lot": "1.358"
      },
      {
        "flip_id": "4This API will respond one auction by `:flip`.
ce8a961-4b90-34e8-9780-6ce46a8205a6",
        "created_at": "2021-06-22T13:02:49Z",
        "action": "FlipBid",
        "bid": "1859.30248633",
        "lot": "1.358"
      },
      // ...
    ]
  }
}
```

## Read vaults

<APIEndpoint method="GET" url="/vats?cursor=:cursor&limit=:limit" />

This API will respond all vaults.

<APIParams :params="txQueryParams" />

### Response

```json
{
  "ts": 1633140121000,
  "data": {
    "vaults": [
      {
        "id": "52010fd0-6a9d-393c-abcb-ca997d950bf5",
        "created_at": "2021-04-27T10:51:16Z",
        "collateral_id": "d0ec4cc7-edf6-5359-bf23-41fc9d26444e",
        // locked Collateral
        "ink": "2",
        // normalized debt
        "art": "30530.6925452775230346",
        "identity_id": "1"
      },
      {
        "id": "321b4903-c291-39e4-9563-6b01c4826b08",
        "created_at": "2021-04-27T10:53:26Z",
        "collateral_id": "686cb137-b5e6-586c-bece-926736ffc583",
        "ink": "2",
        "art": "98.1633931890668012",
        "identity_id": "2"
      },
      {
        "id": "6fbd8796-3ffa-38ab-aa95-64584e6e57ca",
        "created_at": "2021-04-27T11:01:52Z",
        "collateral_id": "d0ec4cc7-edf6-5359-bf23-41fc9d26444e",
        "ink": "10",
        "art": "206146.036118189767744",
        "identity_id": "3"
      }
      // ...
    ],
    "pagination": {
      "next_cursor": "100",
      "has_next": true
    }
  }
}
```

## Read vault

<APIEndpoint method="GET" url="/vats/:vat" />

This API will respond one vault by `:vat`.

<APIParams :params="[ vatParam ]" />

### Response

```json
{
  "ts": 1633140496485,
  "data": {
    "id": "52010fd0-6a9d-393c-abcb-ca997d950bf5",
    "created_at": "2021-04-27T10:51:16Z",
    "collateral_id": "d0ec4cc7-edf6-5359-bf23-41fc9d26444e",
    "ink": "2",
    "art": "30530.6925452775230346",
    "identity_id": "1"
  }
}
```

## Read vault events

<APIEndpoint method="GET" url="/vats/:vat/events" />

This API will respond all events of one vault with `:vat`.

<APIParams :params="[ vatParam ]" />

### Response

```json
{
  "ts": 1633140563750,
  "data": {
    "events": [
      {
        "vault_id": "52010fd0-6a9d-393c-abcb-ca997d950bf5",
        "created_at": "2021-09-28T06:52:14Z",
        "action": "VatWithdraw",
        "dink": "-1",
        "dart": "0",
        "debt": "0"
      },
      {
        "vault_id": "52010fd0-6a9d-393c-abcb-ca997d950bf5",
        "created_at": "2021-09-28T06:51:54Z",
        "action": "VatPayback",
        "dink": "0",
        "dart": "-14724.0127094986199707",
        "debt": "-15000"
      },
      // ...
    ]
  }
}
```

## Read my vaults

<APIEndpoint method="GET" auth url="/me/vats?cursor=:cursor&limit=:limit" />

This API will respond all vaults belonging to current user.

<APIParams :params="txQueryParams" />

### Response

```json
{
  "ts": 1633140121000,
  "data": {
    "vaults": [
      {
        "id": "52010fd0-6a9d-393c-abcb-ca997d950bf5",
        "created_at": "2021-04-27T10:51:16Z",
        "collateral_id": "d0ec4cc7-edf6-5359-bf23-41fc9d26444e",
        "ink": "2",
        "art": "30530.6925452775230346",
        "identity_id": "1"
      },
      // ...
    ],
    "pagination": {
      "next_cursor": "100",
      "has_next": true
    }
  }
}
```
