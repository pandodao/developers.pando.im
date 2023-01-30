# Call APIs

Pando provides a set of restful APIs for developers to get the information of Pando Protocols.  

All those APIs are available at protocol's API base. For example, one API base of 4swap is `https://api.4swap.org/api`. 

If you're looking for the API base of a specific protocol, you can find it in the [References](/references/overview#api-base) page.

## Public APIs

Public APIs can be called without any authentication.

Here is an example of calling the `/info` API of 4swap:

```bash
$ curl -X GET "https://api.4swap.org/api/info" -H "accept: application/json"
```

The response will be like this:

<!--@include: ../parts/responses/4swap-info.md-->

The `members` and `threshold` combination indicates a unique multisig address on Mixin Network, which is controlled by the 4swap's MTG nodes.

The `public_key` is a ED25519 public key which is using for encrypting transaction data.

Please save them, we need them to interact with the multisig address in later sections.

## Protected APIs

<!--@include: ../parts/auth.md-->
