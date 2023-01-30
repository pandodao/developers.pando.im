# Read Statistics Data

<script setup>
const paramDur =   {
  name: 'dur',
  type: 'string',
  required: false,
  description: 'The duration of returning data. for example, 4320h means latest 180 days'
};

const params = [
  {
    name: 'base',
    type: 'uuid',
    required: true,
    description: 'The base asset id'
  },
  {
    name: 'quote',
    type: 'uuid',
    required: true,
    description: 'The quote asset id'
  },
  paramDur,
];
</script>

## Read global statistics

<APIEndpoint method="GET" url="/states/markets?dur=:dur" />

This API will respond historical market statistics.

<APIParams :params="[ paramDur ]" />

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

## Read pair statistics

<APIEndpoint method="GET" url="/states/markets/:base/:quote" />

This API will respond historical market statistics specified by base and quote asset.

<APIParams :params="params" />

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

<APIParams :params="params" />

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