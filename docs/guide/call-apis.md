# Call APIs

Pando provides a set of restful APIs for developers to get the information of Pando Protocols.  

All those APIs are available at protocol's API base. For example, one API base of 4swap is `https://api.4swap.org/api`. 

If you're looking for the API base of a specific protocol, you can find it in the [References](/references/overview#api-base) page.

## Public APIs

Public APIs are available to everyone. You can simply call them without any authentication.

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

Although most restful APIs are public and available to everyone, some APIs require authentication. You need to provide the access token to call them.

Usually, you can use the a regular Mixin Access Token for `GET https://api.mixin.one/me` with scope `"FULL"`.

::: tip
The access token should be signed and generate by **Your Own Mixn Application**. 
:::

Generate the access token by using `mixin-cli` is pretty easy:

```bash [mixin-cli]
$ mixin-cli -f ./keystore.json sign /me
```

`mixin-cli` will output the access token, you can use it to call the protected APIs:

```bash
sign GET /me with request id e98b1200-xxxx-xxxx-xxxx-xxxxxxxxxxxx & exp 1m0s

eyJhbGciOiJFZER....jTtecIBiQo4OrJ7q7Ag
```

But in a real project, using SDKs to generate the access token is recommended. For example, if you're using the [mixin-sdk-go](https://github.com/fox-one/mixin-sdk-go) or [@foxone/mixin-api](https://github.com/fox-one/fe-tools-mixin/blob/main/packages/api/README.md), you can use the following code to generate the access token:

::: code-group

```go [Go]
package main

import (
  // ...
  "github.com/fox-one/mixin-sdk-go"
)

func main() {
	// open the keystore file and decode it
	f, err := os.Open("./keystore.json")
	if err != nil {
		log.Panicln(err)
	}

	var keystore mixin.Keystore
	if err := json.NewDecoder(f).Decode(&keystore); err != nil {
		log.Panicln(err)
	}

	_ = f.Close()

	auth, err := mixin.AuthFromKeystore(&keystore)
	if err != nil {
		log.Panicln(err)
	}

	// generate signature for GET /me
	sig := mixin.SignRaw("GET", "/me", nil)

	// generate an access token, it will be expired in 10 minutes
	token := auth.SignToken(sig, mixin.RandomTraceID(), time.Minute*10d)

	log.Println("access token:", token)
}
```

```typescript [Typescript]
import { signAuthenticationToken } from "@foxone/mixin-api/encrypt";

const keys = {
  client_id: "",
  session_id: "",
  private_key: ""
};

signAuthenticationToken(
  keys.client_id,
  keys.session_id,
  keys.private_key,
  "GET",
  "/me",
  ""
);
```

:::

to validate your access token, by calling those API, it's an API to get the transactions of pairs `BTC/ETH` in 4swap:

```bash
$ curl -X GET "https://api.4swap.org/api/transactions/c6d0c728-2624-429b-8e0d-d9d19b6592fa/43d61dcd-e413-450d-80b8-101d5e903357/mine" -H "accept: application/json" \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN_HERE'
```

::: details Looking for other SDKs?
There are some SDKs available for different languages, you can find them in [this page](https://developers.mixin.one/docs/resources/sdk).

Pando Dev Team is the main maintainer of the [mixin-sdk-go](https://github.com/fox-one/mixin-sdk-go) (for Golang) and [@foxone/mixin-api](https://github.com/fox-one/fe-tools-mixin/blob/main/packages/api/README.md) (for Typescript). We recommend you to use them.
:::

If you want to know the details of how to generate the token, please visit [this document](https://developers.mixin.one/docs/api/guide#signing).

