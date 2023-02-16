# Authorization (Client-side)

In certain situations, you may need to request that a user signs in before they can use your application. To facilitate this authentication process in Pando Proto, you can make use of the following methods. Both of these methods will prompt the user to use their wallet to continue with the authentication process.

## EIP-4361: Sign-In with Ethereum

<!--@include: ../parts/auth-eip4361.md-->

## Use a Mixin OAuth token

This approach works for [Mixin Messenger](https://mixin.network/messenger) only. It is a bit different from the EIP-4361 approach. Instead of signing a message, you will be redirected to the Mixin Messenger app to complete the authentication process.

The Mixin OAuth token works like the signed token mentioned above. Please refer to [Mixin OAuth](https://developers.mixin.one/docs/dapp/getting-started/oauth) for more details.
