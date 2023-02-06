# Talkee Websocket Protocol

<!--@include: ../../parts/talkee-ws-params.md-->

## Authentication

Talkee need client to send credentials (access token) as the first message in the WebSocket connection.

The JavaScript code below shows how to authenticate with Talkee WebSocket connection:

```js
const socket = new WebSocket(
  `${talkeeWsBase}?site_id=${site_id}&slug=${slug}`
);
socket.addEventListener("open", (event) => {
  // send the auth message
  socket.send(
    JSON.stringify({
      type: "auth",
      token: talkeeToken,
    })
  );
});

// Listen for incoming messages
socket.addEventListener("message", (event) => {
  console.log("receive a message", event.data);
});
```

Note that the `talkeeToken` is the `access_token` returned by Talkee `/auth/login` API, which we mentioned in the [previous section](./api#login) section.

## Message types

Talkee uses a simple message format to communicate with clients, which is a JSON object with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `category` | string | The type of the message. |
| `data` | object | The data of the message. Should be base64 encoded. |
| `message_id` | uuid | An uuid of message. |

At present, Talkee only supports one type of message: `text`. So, to send a text message, you can do it like this:

```js
const url = `${talkeeWsApiBase}/messages?site_id=${site_id}&slug=${slug}`;
const resp = await fetch(url, {
  method: "POST",
  mode: "cors",
  cahce: "no-cache",
  headers: {
    Authorization: "Bearer " + talkeeToken,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message_id: uuidv4(),
    category: "text",
    data: btoa("Hello!"),
  }),
});

const data = await resp.json();
console.log(data);
```

## Get latest messages

<APIEndpoint auth method="GET" url="/messages?site_id=:site_id&slug=:slug&filter=latest" />

This API is used to get latest 100 messages of specific site and slug.

<APIParams :params="siteMetaQueryParams.concat([msgFilterParam])" />

### Response

```json
{
  "ts": 1675582938650,
  "data": [
    "category":"text",
    "data":"SGVsbG8h",
    "created_at":"2023-02-06T17:26:17.800860098+09:00",
    "user":{
      "id": 1,
      "mixin_user_id": "36158804-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "mixin_identity_number": "1234456",
      "full_name": "John Wick",
      "avatar_url": "https://mixin-images.zeromesh.net/.../avatar.jpg",
      "created_at": "2022-02-05T16:11:16.420872+09:00"
    }
    // ...
  ]
}
```

## Create a new message

<APIEndpoint auth method="POST" url="/messages?site_id=:site_id&slug=:slug" />

This API is used to create a new message.

<APIParams :params="siteMetaQueryParams.concat(msgCreateParams)" />

### Response

```json
{
  "category":"text",
  "data":"SGVsbG8h",
  "created_at":"2023-02-06T17:26:17.800860098+09:00",
  "user":{
    "id": 1,
    "mixin_user_id": "36158804-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "mixin_identity_number": "1234456",
    "full_name": "John Wick",
    "avatar_url": "https://mixin-images.zeromesh.net/.../avatar.jpg",
    "created_at": "2022-02-05T16:11:16.420872+09:00"
  }
}
```

