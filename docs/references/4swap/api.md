# 4swap API

<!--@include: ../../parts/api-params.md-->

## Read info

<APIEndpoint method="GET" url="/info" />

This API will return MTG information about 4swap

### Response

```json
{
  "ts": 1627697766645,
  "data": {
    // user id of MTG members
    "members": [
      "a753e0eb-3010-4c4a-a7b2-a7bda4063f62",
      "099627f8-4031-42e3-a846-006ee598c56e",
      "aefbfd62-727d-4424-89db-ae41f75d2e04",
      "d68ca71f-0e2c-458a-bb9c-1d6c2eed2497",
      "e4bc0740-f8fe-418c-ae1b-32d9926f5863"
    ],
    "public_key": "dt351xp3KjNlVCMqBYUeUSF45upCEiReSZAqcjcP/Lc=",
    // multisig threshold
    "threshold": 3
  }
}
```

::: tip
You can save the response to use it later because the MTG information wouldn't change frequently.
:::


## Read assets

<APIEndpoint method="GET" url="/assets" />

This API will respond all supported crypto assets.

### Response

```json
{
  "ts": 1627697766503,
  "data": {
    "assets": [
      // {Asset Entity},
      // {Asset Entity},
      // ...
    ]
  }
}
```

## Read pairs

<APIEndpoint method="GET" url="/pairs" />

This API will return MTG information about 4swap

### Response

```json
{
  "ts": 1627697766503,
  "data": {
    "pairs": [
      // {Pair Entity},
      // ...
    ],
    "pair_count": 75,
    "transaction_count_24h": 25134,
    "volume_24h": "5189724.64904556",
    "fee_24h": "13687.38904891",
    "ts": 1627697766503,
  }
}
```

## Read pairs (CMC compatible version)

<APIEndpoint method="GET" url="/cmc/pairs" />

The API will respond all supported pairs. It's compatible with Coinmarketcap's requirements.

### Response

```json
{
  "ts": 1627697766503,
  "data": {
    // combination of 2 crypto's asset_ids
    "05c5ac01-31f9-4a69-aa8a-ab796de1d041_31d2ea9c-95eb-3355-b65b-ba096853bc18": {
      // Monero's asset id
      "base_id": "05c5ac01-31f9-4a69-aa8a-ab796de1d041",
      "base_name": "Monero",
      "base_symbol": "XMR",
      // pUSD's asset id
      "quote_id": "31d2ea9c-95eb-3355-b65b-ba096853bc18",
      "quote_name": "Pando USD",
      "quote_symbol": "pUSD",
      "last_price": "235.830040473787049",
      "base_volume": "1.87552947",
      "quote_volume": "439.96755122"
    },
    // ...
  }
}
```

## Read statistics

<APIEndpoint method="GET" url="/states/markets?dur=:dur" />

This API will respond historical market statistics.

<APIParams :params="[ durParam ]" />

### Response

```json
{
  "ts": 1627697766503,
  "data": [
    {
      "ts": 1617408000,
      "date": "2021-04-03T00:00:00Z",
      // liquidity in US dollar
      "value": "88919122.02992768",
      // liquidity in US dollar
      "volume": "10727320.64681277"
    },
    // ...
  ]
}
```

## Read statistics of pair

<APIEndpoint method="GET" url="/states/markets/:base/:quote" />

This API will respond historical market statistics specified by base and quote asset.

<APIParams :params="baseAndQuoteParams.concat([ durParam ])" />

### Response

```json
{
  "ts": 1627697766503,
  "data": [
    {
      "ts": 1617408000,
      "date": "2021-04-03T00:00:00Z",
      // liquidity in US dollar
      "value": "88919122.02992768",
      // liquidity in US dollar
      "volume": "10727320.64681277"
    },
    // ...
  ]
}
```

## Read candlestick data

<APIEndpoint method="GET" url="/states/markets/:base/:quote/kline/v2?dur=:dur" />

This API will respond the candlestick data specified by base and quote asset.

<APIParams :params="baseAndQuoteParams.concat([ durParam ])" />

### Response

```json
{
  "ts": 1627697766503,
  "data": [
    [
      // timestamp
      1612148400,
      // price of base / quote
      "0.039304863681",
      // price of quote / base
      "25.442131511901"
    ]
    // ...
  ]
}
```

## Read order

<APIEndpoint method="GET" auth url="/orders/:follow_id" />

This API will respond the order detail related to the follow id.

<APIParams :params="[ followIdParam ]" />

### Response

```json
{
  "data": {
    "id": "87ae5014-d20f-4cf1-b530-8771137e4e0e",
    "created_at": "2020-09-15T03:35:34Z",
    "user_id": "8017d200-7870-4b82-b53f-74bae1d2dad7",
    "state": "Done", // order status Trading/Rejected/Done
    "pay_asset_id": "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
    "fill_asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "pay_amount": "1",
    "fill_amount": "00025725", 
    "min_amount": "0.0002521",
    "routes": "1bv",
    "route_assets": [
      "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
      "c6d0c728-2624-429b-8e0d-d9d19b6592fa"
    ],
    "transactions": [
      {
        "id": "87ae5014-d20f-4cf1-b530-8771137e4e0e",
        "created_at": "2020-09-15T03:35:34Z",
        "user_id": "8017d200-7870-4b82-b53f-74bae1d2dad7",
        "type": "Swap",
        "base_asset_id": "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
        "quote_asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "base_amount": "1",
        "quote_amount": "-0.00025725",
        "fee_asset_id": "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
        "fee_amount": "0.003",
        "pay_asset_id": "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
        "filled_asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "funds": "1",
        "amount": "0.00025725"
      }
    ]
  }
}
```

## Read transactions

<APIEndpoint method="GET" url="/transactions?cursor=:next_cursor&limit=:limit" />

This API will respond the order detail related to the follow id.

<APIParams :params="txQueryParams" />

<!--@include: ../../parts/responses/transactions.md-->

## Read transactions of pair

<APIEndpoint method="GET" url="transactions/:base/:quote?cursor=:next_cursor&limit=:limit" />

This API will respond a list of transactions of the specified pair.

<APIParams :params="txQueryParams.concat(baseAndQuoteParams)" />

<!--@include: ../../parts/responses/transactions.md-->

## Read transactions of me

<APIEndpoint method="GET" auth url="transactions/:base/:quote/mine?cursor=:next_cursor&limit=:limit" />

This API will respond a list of transactions of the specified pair releated to me.

<APIParams :params="txQueryParams.concat(baseAndQuoteParams)" />

<!--@include: ../../parts/responses/transactions.md-->

## Create action

<APIEndpoint method="POST" auth url="/actions" />

This is an API to generate an encrypted transfer by provided [action protocol](/docs/references/4swap/action) data. It's useful if you don't want to sign and encrypt the transaction memo yourself.

<APIParams :params="actionParams" />

### Response

```json
{
  "ts": 1627697766503,
  "data": {
    // the encrypted action data
    "action": "...",
    // the code and the code url.
    // they could be used to invoke Mixin Network compatible wallet, like Messenger and Fennec.
    "code": "d294380f-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "code_url": "mixin://codes/d294380f-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    // an UUID to trace the transfer
    "follow_id": "yyyyyyyy-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
}
```