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
message = executeTemplate(tpl, {
  "domain": "login.xyz",
  "address": "0x5d9de.....06",
  "statement": "Sign-In With Ethereum Example Statement",
  // ...
});

// The wallet will prompt the user to sign the message
signature = sign(message);
```

We provide a SDK to help you generate the message and sign it:

```js
// @TODO
```

Or you can also refer to the wallet's API documentation to implement the signing process.

Now you get the signature and the messages, you can use it to login to Pando Proto.
