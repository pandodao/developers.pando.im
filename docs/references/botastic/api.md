# Botastic API

<!--@include: ../../parts/botastic-api-params.md-->

## Create Indexes

<APIEndpoint method="GET" url="/indexes" />

This API will create an index with current `app_id`

The payload should be a JSON array containing multiple records to be indexed, with the following fields:

```json
[
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
```

### Response

```json
@TODO
```

## Search Indexes

<APIEndpoint method="GET" url="/search?keywords=:keywords&n=:n" />

This API will search a specific index with keywords.

<APIParams :params="searchIndexParams" />

### Response

```json
@TODO
```

## Create Conversation

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

## Post to Conversation

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
}
```

### Response

```json
{
  "ts": 1676991393874,
  "data": {
    "id": 33,
    "conversation_id": "55a81c0b-1b9f-42e7-ab09-8b482cbfe2bf",
    "bot_id": 1,
    "app_id": 1,
    "user_identity": "user-1001",
    // the request from the "user-1001"
    "request": "Hello!",
    // the response from the bot
    "response": "",
    // the status of the request. 0: init, 1: pending, 2: success, 3: failed
    "status": 0,
    "created_at": "2023-02-21T23:56:33.879369+09:00",
    "updated_at": "2023-02-21T23:56:33.879369+09:00"
  }
}
```

## Read Conversation

<APIEndpoint method="GET" url="/conversations/:conversation_id" />

This API will get a conversation by id. It will return both the conversation's info and the conversation history. 

<APIParams :params="[conversationIDParam]" />

### Response

```json
{
  "ts": 1676987811469,
  "data": {
    "id": "c2e91b52-c634-4815-9998-908e60fb15a0",
    "bot": {
        "id": 1,
        "name": "General Chatbot"
    },
    "app": {
        "id": 1,
        "app_id": "a4a25815-029b-42b0-be3f-5d72184a2d09",
        "created_at": "2023-02-20T16:37:51.066553+09:00",
        "updated_at": "2023-02-20T16:37:51.066553+09:00"
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