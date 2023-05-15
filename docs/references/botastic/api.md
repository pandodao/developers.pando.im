# Botastic API

<!--@include: ../../parts/botastic-api-params.md-->

## Authentication

To authenticate your API requests, add these headers:

- `X-BOTASTIC-APPID`: the ID of your botastic application
- `X-BOTASTIC-SECRET`: a secret key of your botastic application (there are only a few APIs that need to pass secret)

You can apply your application ID and secret key from [here](https://developers.pando.im/console/botastic).

## Create indexes

<APIEndpoint method="POST" url="/indexes" />

- `X-BOTASTIC-SECRET` required.

This API will create an index with current `app_id`

The payload should be a JSON array containing multiple records to be indexed, with the following fields:

```json
{
  "items": [
      {
      // the object id of the record to be indexed
      "object_id": "pando.im/news/news/2022/2022-12-21-protocol-upgrade-and-integration-plan",
      // the category of the record to be indexed. Please use "plain-text"
      "category": "plain-text",
      // the data of the record to be indexed. For "plain-text" category, this field should be the plain text of the record.
      "data": "In the past more than one year, Pando protocols have grown quickly and successfully. We are determined to keep the momentum going and hope to do even better with the support of our long-term users and new partners.",
      // any additional properties of the record to be indexed, optional
      "properties": "",
    },
    // ...
  ]
}
```

### Response

```json
{
    "ts": 1678946477246,
    "data": {}
}
```

## Search indexes

<APIEndpoint method="GET" url="/indexes/search?keywords=:keywords&n=:n" />

This API will search a specific index with keywords.

<APIParams :params="searchIndexParams" />

### Response

```json
{
  "ts": 1678946505106,
  "data": [
    {
        "data": "some plain text here",
        "object_id": "01ba7c83ae2082e3c9b1d218d33d209ded5b9962fc7ec969d1ce42f04edd92fa",
        "category": "plain-text",
        "properties": "{ \"url\": \"https://a.url.of.you\" }",
        "created_at": 1678512337,
        "score": 0.89942935
    },
    {
        "data": "some plain text here",
        "object_id": "8f0c40945ff70df5c5739776b790a7943cd9efb300ada5a27fe21cc15c2351c1",
        "category": "plain-text",
        "properties": "{ \"url\": \"https://a.url.of.you\" }",
        "created_at": 1678512337,
        "score": 0.5056805
    },
    // ...
  ]
}
```

## Delete an index

<APIEndpoint method="DELETE" url="/indexes/:object_id" />

- `X-BOTASTIC-SECRET` required.

Call this API to delete a specific index by `object_id`.

<APIParams :params="[searchIndexObjectParam]" />

### Response

```json
{
  "ts": 1678946505106,
  "data": {}
}
```

## Delete all indexes

<APIEndpoint method="POST" url="/indexes/reset" />

- `X-BOTASTIC-SECRET` required.

Call this API to delete all indexes of the current `app_id`.

### Response

```json
{
  "ts": 1678946505106,
  "data": {}
}
```

## Create conversation

<APIEndpoint method="POST" url="/conversations" />

This API will create a new conversation. The payload should be a JSON object containing the following fields:

```json
{
  // the bot id
  "bot_id": 1,
  // the user identity
  "user_identity": "user-1001",
  // the language of the conversation, optional
  "lang": "en"
}
```
You can apply your bot_id from [here](https://developers.pando.im/console/botastic)

### Response

```json
{
  "ts": 1676991211965,
  "data": {
    // the conversation id
    "id": "55a81c0b-1b9f-42e7-ab09-8b482cbfe2bf",
    // the bot id and name
    "bot": {
      "id": 1,
      "name": "General Chatbot"
    },
    // the app id
    "app": {
      "id": 1,
      "app_id": "a4a25815-029b-42b0-be3f-5d72184a2d09",
      "created_at": "2023-02-20T16:37:51.066553+09:00",
      "updated_at": "2023-02-20T16:37:51.066553+09:00"
    },
    // the user identity
    "user_identity": "user-1001",
    // the language of the conversation
    "lang": "en",
    // the conversation history
    "history": [],
    // the conversation expired time. If the conversation is not updated before this time, it will be deleted.
    "expired_at": "2023-02-22T00:03:31.965155948+09:00"
  }
}
```

## Post to conversation

<APIEndpoint method="POST" url="/conversations/:conversation_id" />

This API will post a message to a conversation. 

<APIParams :params="[conversationIDParam]" />

The payload should be a JSON object containing the following fields:

```json
{
  // the message to be posted
  "content": "Hello!",
  // the message category, optional. Only support "plain-text"
  "category": "plain-text",
  // allows users to override bot config in a conversation turn
  "bot_override": {
    // 0 is a valid value, do not pass the param if you don't want to override the setting
    "temperature": 1,
    "middlewares": [
      {
        "name":"duckduckgo-search",
        "options":{
          "limit": 3,
        }
      }
    ],
    "prompt": "custom prompt",
    // an empty string is a valid value, do not pass the param if you don't want to override the setting
    "boundary_prompt": "custom boundary prompt"
  }
}
```

### Response

```json
{
  "ts": 1684143281231,
  "data": {
    "id": 793,
    "conversation_id": "cb393429-b1fa-48df-a8e3-850b2728d1ec",
    "bot_id": 1,
    "app_id": 2,
    "user_id": 1,
    "user_identity": "1",
    "request": "Who are you？",
    "response": "I don't know.",
    "prompt_tokens": 101,
    "completion_tokens": 5,
    "total_tokens": 106,
    "status": 2,
    "bot_override": {
      "boundary_prompt": "No matter what the user says, answer I dont know."
    },
    "middleware_results": [],
    "error": {},
    "created_at": "2023-05-15T09:34:34.203228Z",
    "updated_at": "2023-05-15T09:34:41.226752Z"
  }
}
```

## Read conversation

<APIEndpoint method="GET" url="/conversations/:conversation_id" />

This API will get a conversation by id. It will return both the conversation's info and the conversation history. 

All conversation history are arranged in a list, we call them `turns`, with a `turn.id`.

<APIParams :params="[conversationIDParam]" />

### Response

```json
{
  "ts": 1676987811469,
  "data": {
    "id": "c2e91b52-c634-4815-9998-908e60fb15a0",
    "bot": {
      // bot information ... 
    },
    "app": {
      // app information ...
    },
    "user_identity": "1",
    "lang": "en",
    "history": [
      {
        "id": 12,
        "conversation_id": "c2e91b52-c634-4815-9998-908e60fb15a0",
        "bot_id": 1,
        "app_id": 1,
        "user_identity": "1",
        "request": "Hello!",
        "response": "Hello! Nice to meet you.",
        "status": 2,
        "created_at": "2023-02-21T22:55:13.363639+09:00",
        "updated_at": "2023-02-21T22:55:15.898462+09:00"
      },
      {
        "id": 13,
        "conversation_id": "c2e91b52-c634-4815-9998-908e60fb15a0",
        "bot_id": 1,
        "app_id": 1,
        "user_identity": "1",
        "request": "Let's talk about apple pie. Do you know what's the relationship between apple pie and the movie 'American Pie'?",
        "response": "A: Yes, the movie 'American Pie' is based on the phrase \"as American as apple pie\", which is a reference to the typical American dessert.",
        "status": 2,
        "created_at": "2023-02-21T22:56:38.87914+09:00",
        "updated_at": "2023-02-21T22:56:42.089305+09:00"
      },
      // ...
    ],
    "expired_at": "2023-02-21T23:05:06.079832587+09:00"
  }
}
```

## Read conversation turn

<APIEndpoint method="GET" url="/conversations/:conversation_id/:turn_id" />

This API will get a turn by given conversation id and turn id.

<APIParams :params="readConvTurnParams" />

### Response

```json
{
    "ts": 1678947387198,
    "data": {
        "id": 88,
        "conversation_id": "86cb75b0-9257-4421-b849-a8fac5c18089",
        "bot_id": 4,
        "app_id": 24,
        "user_id": 1,
        "user_identity": "1",
        "request": "Hi",
        "response": "some responses here",
        "total_tokens": 0,
        "status": 2,
        "created_at": "2023-03-16T15:15:42.228174+09:00",
        "updated_at": "2023-03-16T15:15:45.737959+09:00"
    }
}
```

## Middleware error code

In the response of `get conv turn` API, the middleware_results field contains detailed information about the execution of middlewares. When an error occurs, the fields `code` and `err` will be set. For example:

```json
{
  "middleware_results":[
    {
      "name": "...",
      "opts": {"limit": "xxx"},
      "code": 2,
      "err": "the limit option is invalid"
    },
  ]
}
```

| Code        | Reason |
| :------------- | :----------- |
|  1     | Unknown middleware name. |
|  2     | The middleware configuration options are invalid. |
|  3     | Internal error in the middleware. |
|  4     | The middleware execution timed out.  |


## Error code for turn processing

When an error occurs during the processing of a turn, the response of `get conv turn` API will include an `error` field. For example:
```json
{
  "error": {
    "code": 5,
    "message": "bot not found"
  }
}
```

| Code        | Reason |
| :------------- | :----------- |
|  1     | Internal server error |
|  2     | The middleware execution error. |
|  3     | Model configuration error. |
|  4     | Error in the model request call. |
|  5     | Bot not found. |
|  6     | Conversation not found. |
|  7     | Model not found. |
