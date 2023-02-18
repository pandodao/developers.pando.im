This approach works for most ethereum compaitable wallets (e.g. Metamask, TrustWallet, Coinbase Wallet, etc.). It is based on the [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) standard. The wallet will sign a message with the private key of the user's account. The message contains the information that the relying party (e.g. Pando Proto) needs to verify the authentication.

Before signing, the message is prefixed with `\x19Ethereum Signed Message:\n<length of message>` as defined in [EIP-191](https://eips.ethereum.org/EIPS/eip-191).

Here is a template of the full message is presented below for readability and ease of understanding. Field descriptions are provided in the following:

```bash
${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
Expiration Time: ${expiration-time}
Not Before: ${not-before}
Request ID: ${request-id}
Resources:
- ${resources[0]}
- ${resources[1]}
...
- ${resources[n]}
```

in which, 

- `domain` is the RFC 3986 authority that is requesting the signing.
- `address` is the Ethereum address performing the signing conformant to capitalization encoded checksum specified in EIP-55 where applicable.
- `statement` (optional) is a human-readable ASCII assertion that the user will sign, and it must not contain '\n' (the byte 0x0a).
- `uri` is an RFC 3986 URI referring to the resource that is the subject of the signing (as in the subject of a claim).
- `version` is the current version of the message, which MUST be 1 for this specification.
- `chain-id` is the EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts MUST be resolved.
- `nonce` is a randomized token typically chosen by the relying party and used to prevent replay attacks, at least 8 alphanumeric characters.
- `issued-at` is the ISO 8601 datetime string of the current time.
- `expiration-time` (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.
- `not-before` (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.
- `request-id` (optional) is an system-specific identifier that may be used to uniquely refer to the sign-in request.
- `resources` (optional) is a list of information or references to information the user wishes to have resolved as part of authentication by the  relying party. They are expressed as RFC 3986 URIs separated by "\n- " where \n is the byte 0x0a.

For ABNF formal definition, please refer to [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361).

### Example

```bash
login.xyz wants you to sign in with your Ethereum account:
0x5d9de0318BeF0c3B81C46aeC31450Ffa54aa6906
Sign-In With Ethereum Example Statement
URI: https://login.xyz
Version: 1
Chain ID: 1
Nonce: risxcddc
Issued At: 2023-02-16T09:48:07.667Z
Expiration Time: 2023-02-18T09:48:07.665Z
Resources:
- ipfs://...../
- https://example.com/res.json
```

### Sign the message

To sign the message, you need to use the private key of the Ethereum account. For most wallets (e.g. Metamask, TrustWallet), you can not access the private key directly. You need to use the wallet's API to invoke the signing process.

The pesudo code is presented below:

```js
data = executeTemplate(tpl, {
  "domain": "login.xyz",
  "address": "0x5d9de.....06",
  "statement": "Sign-In With Ethereum Example Statement",
  // ...
});

// The wallet will prompt the user to sign the message
signature = sign(data);
```

You can refer to the wallet's API documentation to implement the signing process.

### Use our SDKs

To simplify the procedure, we offer an npm package [@foxone/mixin-passport](https://www.npmjs.com/package/@foxone/mixin-passport) for generating and signing the message, as well as a golang module [passport-go](https://github.com/fox-one/passport-go) for parsing and validating the signature.

Here is the example of using them:

```js
const data = await passport.auth({
  clientId: globals.clientId.value,
  authMethods: props.authMethods as any[],
  scope: "PROFILE:READ",
  origin: "app.pando.im",
  pkce: true,
  hooks: {
    beforeSignMessage: async () => {
      // put the fields you want to sign here
      return { statement: "This is statement" };
    },
    afterSignMessage: async ({ message, signature }) => {
      // send the message and signature to wherever you want
      // e.g.
      const resp = await api.post("/auth", { message, signature });
      return resp.access_token
    },
  },
});
```

In the handler of `/auth`, you can use the `passport-go` to parse and validate the signature:

```go
import (
	eip4361 "github.com/fox-one/passport-go/eip4361"
  "github.com/fox-one/passport-go/mvm"
)

type LoginPayload struct {
	Signature     string `json:"signature"`
	Message string `json:"message"`
}

// ...
func handler(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()
  body := &LoginPayload{}
  if err := param.Binding(r, body); err != nil {
    return err
  }

  if body.Signature == "" {
    return err
  }

  message, err := eip4361.Parse(body.Message)
  if err != nil {
    return err
  }

  if err := message.Validate(time.Now()); err != nil {
    return err
  }

  if err := eip4361.Verify(message, body.Signature); err != nil {
    return err
  }

  // get the public key from the message, and use it to login
  token, err := Login(ctx, message.Address)
  if err != nil {
    return err
  }
  // ...
}

func Login(ctx context.Context, pubkey string) (string, error) {
  addr := common.HexToAddress(pubkey)
  mvmUser, err := mvm.GetBridgeUser(ctx, addr)
  if err != nil {
    return "", err
  }

  // save the user here
  // ...

  // generate an access token for the user
  token := jwt.NewWithClaims( 
    // .... 
  )
  return token, nil
}
```

