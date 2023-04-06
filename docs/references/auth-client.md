# Authorization (Client-side)

In certain situations, you may need to request that a user signs in before they can use your application. To facilitate this authentication process in Pando Proto, you can make use of the following methods. Both of these methods will prompt the user to use their wallet to continue with the authentication process.

## Request to authenticate

For Javascript/Typescript developers, we provide a [@foxone/mixin-passport](https://www.npmjs.com/package/@foxone/mixin-passport) package to help you request the Mixin Messenger's OAuth or EIP-4361 authentication (MVM-based).

Here is a code snippet to show how to use the package to request the authentications.

```js
async function login() {
  // ...
  const data = await passport.auth({
    origin: "Your App",
    authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
    clientId: "Your Client ID",
    scope: "PROFILE:READ ASSETS:READ",
    pkce: true,
    mvmAuthType: "SignedMessage",
    // only works when mvmAuthType is "SignedMessage"
    hooks: {
      beforeSignMessage: async () => {
        // sign a message 
        return {
          statement: "You'll login to your_app by the signature",
          expirationTime: new Date(
            new Date().getTime() + 1000 * 60 * 3
          ).toISOString(),
        };
      },
      afterSignMessage: async ({ signedMsg, sign }) => {
        // use the signedMsg and sign to login to your backend
        const resp = await loginEIP4361(signedMsg, sign);
        return resp.access_token;
      },
    }
  });
  // save data.token and data.channel for later use
}
```

::: info
If using the `SignedMessage`, you must generate your own access token by the credentials provided. Once generated, assign the access token to data.token.

You can use the package `passport-go` to verify the provided credentials, and return a self-signed access token
:::

In some cases, you may want to use the Mixin Network's keystore to generate a access token locally, without a backend server. In this case, you can use the `mvmAuthType` option to set it to `MixinToken`, and ignore the `hooks` option. The code snippet below shows how to use the package to request the authentications.

```js
async function login() {
  // ...
  const data = await passport.auth({
    origin: "Your App",
    authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
    clientId: "Your Client ID",
    scope: "PROFILE:READ ASSETS:READ",
    pkce: true,
    mvmAuthType: "MixinToken"
  });
  // save data.token and data.channel for later use
}
```

::: info
By using `MixinToken`, a Mixin Network access token based on the provided credentials will be assigned to `data.token`.
:::


## Verify the authentication

For Golang developers, we provide a golang package [passport-go](https://github.com/pandodao/passport-go) to help you verify the Mixin Messenger's OAuth or EIP-4361 authentication (MVM-based).

The code snippet below shows how to use the package to verify the authentications.

```go
func Login(ctx context.Context, loginMethod, mixinToken, sign, signedMsg) error {
  switch loginMethod {
  case "mixin_token":
    // Mixin OAuth flow
    {
      authUser, err := authorizer.Authorize(ctx, &auth.AuthorizationParams{
        Method:     auth.AuthMethodMixinToken,
        MixinToken: mixinToken,
      })
      if err != nil {
        render.Error(w, http.StatusUnauthorized, err)
        return
      }
      // deal with authUser, sign a JWT token, save to db, etc.
      return
    }
  case "mvm":
    // EIP-4361 flow (MVM-based)
    {
      authUser, err := authorizer.Authorize(ctx, &auth.AuthorizationParams{
        Method:           auth.AuthMethodMvm,
        MvmSignature:     sign,
        MvmSignedMessage: signedMsg,
      })
      if err != nil {
        render.Error(w, http.StatusUnauthorized, err)
        return
      }
      // deal with authUser, sign a JWT token, save to db, etc.
      return
    }
  case "email":
  case "phone":
    // ... other login methods
  default:
```

## Technical Specifications

### EIP-4361: Sign-In with Ethereum

<!--@include: ../parts/auth-eip4361.md-->

### Use a Mixin OAuth token

This approach works for [Mixin Messenger](https://mixin.network/messenger) only. It is a bit different from the EIP-4361 approach. Instead of signing a message, you will be redirected to the Mixin Messenger app to complete the authentication process.

The Mixin OAuth token works like the signed token mentioned above. Please refer to [Mixin OAuth](https://developers.mixin.one/docs/dapp/getting-started/oauth) for more details.
