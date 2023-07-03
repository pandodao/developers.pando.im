# 4swap Action

## Swap

```yaml
20    bytes: header
---
20~84 bytes: MMISG
16    bytes: fill_asset_id
1     byte : length of route_hash
N     bytes: route_hash
8     bytes: minimum
4     bytes: checksum
```

In which, 

- `header` is the header of the action, `header.action` = `0x03`.
- `MMISG` is the address of the user or the group who will receive the swap result asset.
- `fill_asset_id` is the asset id of the asset to be filled.
- `route_hash` is the [hash_id](https://hashids.org/) of the route. The length of the hash is determined by the incoming byte.
- `minimum` is the minimum amount of the asset you expect to receive. When encoding, the number should be multiplied by 10^8 and then encoded as an integer.
- `checksum` is the checksum of the action. It is the last 4 bytes of the two round sha256 hash of the action without the checksum.

`@TODO: add the route hash implementation here`


## Add liquidity

```yaml
20    bytes: header
---
20~84 bytes: MMISG
16    bytes: asset_id
8     bytes: slippage
2     bytes: timeout
4     bytes: checksum
```

In which, 

- `header` is the header of the action, `header.action` = `0x01`.
- `MMISG` is the address of the user or the group who will receive the lp token.
- `asset_id` is the asset id of the asset to be added.
- `slippage` is the maximum slippage of the deposit. When encoding, the number should be multiplied by 10^8 and then encoded as an integer.
- `timeout` is the timeout of the action, in seconds.
- `checksum` is the checksum of the action. It is the last 4 bytes of the two round sha256 hash of the action without the checksum.

## Remove liquidity

```yaml
20    bytes: header
---
20~84 bytes: MMISG
4     bytes: checksum
```

In which, 

- `header` is the header of the action, `header.action` = `0x02`.
- `MMISG` is the address of the user or the group who will receive the assets.
- `checksum` is the checksum of the action. It is the last 4 bytes of the two round sha256 hash of the action without the checksum.
