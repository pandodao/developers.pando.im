# Talkee API

<!--@include: ../../parts/talkee-api-params.md-->

## How to specify a site 

Some APIs require you to specify a site, for example, `GET /comments` need to know which site you want to get comments from. There are two ways to do that:

1. You can specify a site by setting the `X-TALKEE-SITE-ID` or `X-TALKEE-SITE-SLUG` header.
2. You can specify a site by setting the `site_id` or `slug` query parameter.

Both ways are valid, but you can only use one of them at a time. If you specify a site by both ways, the header will be used.

## Login

<APIEndpoint method="POST" url="/auth/login" />

This API is used to login to Talkee. 

Talkee's authentication is slightly different from other pando protocols. It uses own JWT token to identify users. 

To get the JWT token, there are three ways:

1. Login with Mixin access token: You need to exchange Mixin's `access_token` to Talkee's `access_token`. Assign `mixin_token` to `method` and mixin's `access_token` mentioned in the [Authorization](../auth) to `mixin_access_token` in the request body.
2. Login with Ethereum: You need to sign an [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) messages to exchange for Talkee's `access_token`. Assign `mvm` to `method`, put the signed message to `signed_message` and the signature to `signature` in the request body. 
   
   Please read [this section](../auth-client#eip-4361-sign-in-with-ethereum) to learn how to generate the signed message and signature.

After you get the `access_token`, save the `access_token` in the response to access other authenticated APIs.

<APIParams :params="loginParams" />


The `signed_message` is an JSON object with the EIP-4361's fields. It looks like this:

```json
{
  "domain": "login.xyz",
  "address": "0x5d9de03......906",
  "statement": "Sign-In With Ethereum Example Statement",
  "uri": "https://login.xyz",
  "version": 1,
  "nonce": "risxcddc",
  "issued_at": "2023-02-16T09:48:07.667Z",
  "expiration_time": "2023-02-18T09:48:07.665Z",
  "chain_id": 1,
  "resources": ["https://login.xyz/abc.json", "ipfs://Qm..."]
}
```

::: tip 
Note that the `mixin_access_token` is same as the `access_token` in the [Authorization](../auth).
:::

### Response

```json
{
  "ts": 1675582938650,
  "data": {
    "access_token": "eyJhbG....lBM",
    "user": {
      "id": 1,
      "mixin_user_id": "36158804-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "mixin_identity_number": "1234456",
      "full_name": "John Wick",
      "avatar_url": "https://mixin-images.zeromesh.net/...",
      "created_at": "2022-02-05T16:11:16.420872+09:00"
    }
  }
}
```

## Get site info

<APIEndpoint method="GET" url="/sites/:site_id" />

This API is used to get site info.

<APIParams :params="[ siteIdParam ]" />

### Response

```json
{
  "ts": 1675583895807,
  "data": {
    "id": 1,
    "user_id": 1,
    "origins": [ "https://...", "https://..." ],
    "name": "A Test Site",
    "use_arweave": false,
    "reward_strategy": 0,
    "created_at": "2022-02-05T16:11:16.420872+09:00",
    "updated_at": "2022-02-05T16:11:16.420872+09:00"
  }
}
```

## Create a comment

<APIEndpoint auth method="POST" url="/comments" />

This API is used to create new comments.

<APIParams :params="siteMetaParams.concat([ contentParam ])" />

<!--@include: ../../parts/responses/talkee-comment.md-->

## Get comments

<APIEndpoint method="GET" url="/comments?limit=:limit&offset=:offset&order_by=:order_by" />

This API is used to get comments.

<APIParams :params="siteMetaParams.concat(commentQueryParams)" />

### Response

```json
{
  "ts": 1675583187295,
  "data": {
    "comments": [{
      "id": 15,
      "user_id": "4",
      "site_id": 1,
      "slug": "/posts/11",
      "favor_count": 3,
      "reply_count": 2,
      "arweave_tx_hash": "...",
      "content": "Hello!",
      "created_at": "2023-02-05T16:11:58.175076+09:00",
      "updated_at": "2023-02-05T16:11:58.175076+09:00",
      "creator": {
        "id": "4",
        "mixin_user_id": "36158804-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "mixin_identity_number": "1234456",
        "full_name": "John Wick",
        "avatar_url": "https://mixin-images.zeromesh.net/...",
        "created_at": "2022-02-05T16:11:16.420872+09:00"
      }
    },
    // ...
    ],
    "total": 128,
  }
}
```

## Get a comment

<APIEndpoint method="GET" url="/comments/:comment_id" />

This API is used to get a specific comment.

<APIParams :params="[ commentIdParam ]" />

### Response

<!--@include: ../../parts/responses/talkee-comment.md-->

## Favorite a comment

<APIEndpoint auth method="PUT" url="/comments/:comment_id/fav" />

This API is used to favorite a comment specified in the ID parameter as the authenticating user. Returns the favorite comment when successful.

<APIParams :params="siteMetaParams.concat([ commentIdParam ])" />

<!--@include: ../../parts/responses/talkee-comment.md-->

## Unfavorite a comment

<APIEndpoint auth method="PUT" url="/comments/:comment_id/unfav" />

This API is used to unfavorite a comment specified in the ID parameter as the authenticating user. Returns the unfavorite comment when successful.

<APIParams :params="siteMetaParams.concat([ commentIdParam ])" />

<!--@include: ../../parts/responses/talkee-comment.md-->

## Create a reply

<APIEndpoint auth method="POST" url="/comments/:comment_id/replies" />

This API is used to create new reply for a specific comment.

<APIParams :params="[commentIdParam, contentParam]" />

<!--@include: ../../parts/responses/talkee-reply.md-->

## Get replies

<APIEndpoint method="GET" url="/comments/:comment_id/replies?limit=:limit&offset=:offset&" />

This API is used to create new reply for a specific comment.

<APIParams :params="repliesQueryParams.concat([commentIdParam, contentParam])" />

### Response

```json
{
  "ts": 1675583187295,
  "data": {
    "replies": [{
      "id": 17,
      "user_id": "3",
      "comment_id": "4",
      "content": "A reply",
      "created_at": "2023-02-05T16:55:38.266176+09:00",
      "updated_at": "2023-02-05T16:55:38.266176+09:00",
      "creator": {
        "id": "4",
        "mixin_user_id": "36158804-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "mixin_identity_number": "1234456",
        "full_name": "John Wick",
        "avatar_url": "https://mixin-images.zeromesh.net/...",
        "created_at": "2022-02-05T16:11:16.420872+09:00"
      }
    }
    // ...
    ],
    "total": 128,
  }
}
```

## Get a user

<APIEndpoint method="GET" url="/users/:user_id" />

This API is used to get a user info.

<APIParams :params="[userIdParam]" />

<!--@include: ../../parts/responses/talkee-user.md-->

## Get me

<APIEndpoint method="GET" url="/me" />

This API is used to get my info.

<!--@include: ../../parts/responses/talkee-user.md-->


