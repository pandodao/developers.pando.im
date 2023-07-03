# Action Specification

Action is a byte array which contains the data and instructions for the protocol to execute. In practice, the action is encoded in the transaction memo field, which is very limited in size. So the action should be as compact as possible.

To make the action compatible with URL encoding, we usually use base64 to encode the action. 

:::info
All integers are encoded in big endian in the action. [Source](https://github.com/pandodao/mtg/blob/main/mtgpack/encode.go#L61).
:::

## MMISG

`MMISG` is standard for "Mixin Milti-signature Group address". It's an address format to describe a multisig group or a single user in Mixin Network. It's supported by Pando's protocols and CoWallet. 

A normal MMISG can be represented as following:

```yaml
1     byte : version
1     byte : member_count
1     bytes: threshold
N     bytes: members
```

in which `version` is the version of the address, `member_count` is the number of members in the group, `threshold` is the threshold of the group, and `members` is the list of members’ uuids. Note that `members` should be always a multiple of 16.

In particular, if `member_count` is 1, then the address is a single user address, the `threshold` chould be omitted. 

```yaml
1     byte : version
1     byte : member_count (1)
16    bytes: member_uuid
```

If `member_count` is 0, then the address is a null address, the `threshold` and `members` should be omitted.

```yaml 
1     byte : version
1     byte : member_count (0)
```

## Pando Action Protocol 

Each action chould be constructed as a header and a payload. The header is used to identify the protocol and the action, and the payload is the data of the action.

```yaml
5~21  bytes: header
N     bytes: payload
4     bytes: checksum (header version == 2)
```

- `checksum` is the checksum of the action. It is the last 4 bytes of the two round sha256 hash of the action without the checksum.

```
checksum = sha256(sha256(header + payload))[0:4]
```

## Pando Action Protocol Header

Protocol Header contains the version of the protocol, the protocol id, `follow_id` to trace it and the action. 

It's used to identify the protocol and the action in the payload.

```yaml
1     byte : version
1     byte : protocol_id
1     byte : has_follow_id or not.
16    bytes: follow_id, only if the previous byte = 1
2     bytes: action
```

In which, 

- `version` is the version of the protocol, it's used to identify the protocol version.
- `protocol_id` is described in [previous section](./overview#protocol-id).
- `has_follow_id` is a boolean value, if it's 1, then the `follow_id` is included in the header, otherwise it's not.
- `follow_id` is a 16 bytes uuid, it's used to trace the action. It can be omitted if the `has_follow_id` is 0.
- `action` is the action id. The meaning of the action id is described by the protocol.

## SDK to generate action

Although you can generate the action by yourself, and the action protocol is very simple, Pando Proto Team provides 2 packages to generate the action:

- Golang: [pandodao/mtgpack](https://github.com/pandodao/mtg)
- Javascript: [@foxone/memo-encode](https://github.com/pandodao/pando-libs/blob/main/packages/memo/ReadMe.md)

## Pando Action Protocol Payload

The protocol body is attached to the protocol header. You can define the content according to your own needs

- [4swap](./4swap/action)
- [Leaf](./leaf/action)
