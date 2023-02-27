# 4swap Action

::: warning DRAFT PROPOSAL
The section is a draft proposal, it's not finalized yet.
:::


## Swap

```yaml
20    bytes: header
---
20~84 bytes: MMISG
16    bytes: fill_asset_id
8     bytes: minimum
1     byte : length of route_hash
N     bytes: route_hash
```

In which, 

- `header` is the header of the action, `header.action` = `0x01`.
- `MMISG` is the address of the user or the group who will receive the swap result asset.
- `fill_asset_id` is the asset id of the asset to be filled.
- `minimum` is the minimum amount of the asset you expect to receive.
- `route_hash` is the [hash_id](https://hashids.org/) of the route. The length of the hash is determined by the incoming byte.

`@TODO: add the route hash implementation here`


## Add liquidity

```yaml
20    bytes: header
---
20~84 bytes: MMISG
16    bytes: asset_id
2     bytes: slippage
2     bytes: timeout
```

In which, 

- `header` is the header of the action, `header.action` = `0x02`.
- `MMISG` is the address of the user or the group who will receive the lp token.
- `asset_id` is the asset id of the asset to be added.
- `slippage` is a number between 0 and 10000, which means the maximum slippage of the action. For example, if the slippage is 100, it means the maximum slippage is 1%.
- `timeout` is the timeout of the action, in seconds.

## Remove liquidity

```yaml
20    bytes: header
---
20~84 bytes: MMISG
```

In which, 

- `header` is the header of the action, `header.action` = `0x03`.
- `MMISG` is the address of the user or the group who will receive the assets.
