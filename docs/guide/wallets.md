# Wallets

## Fennec

[Fennec](https://pando.im/fennec) is an open source browser extension that allows you to easily manage your own crypto assets wallet of Mixin Network.

You can install Fennec from Chrome web store or Firefox Add-ons:

- [Chrome Store](https://chrome.google.com/webstore/detail/fennec/eincngenkhohbbfpkohipekcmnkfamjp)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/fennec/)

Fennec uses Mixin Network's keystore files to identify your assets and manage your wallet. There are two ways to create your keystore files.

The first option is to create a dApp from Mixin Developer Dashboard. After creating the dApp, you can generate a keystore file. The second option is to use the [Account Service Providers](https://github.com/fox-one/fennec-asp) to generate a keystore file.

Account Service Provider is also an open source program that creating valid keystore files for you. You can host an instance yourself or use one from the 3rd party hoster.

::: warning CAUTION
The hoster has the permission to view the transactions and assets of your keystore (but no permission to operate your keystore). Please make sure you trust the 3rd party hoster before using it.
:::

## Metamask & WalletConnect compatible wallets

Pando supports Metamask and WalletConnect compatible wallets by [MVM](https://mvm.app/), which is an EVM compatible virtual machine running on Mixin Network.

MVM provides a standard interface for Metamask and WalletConnect compatible wallets to interact with Pando. You may want to check out [Authorization (Client-side)](../references/auth-client) and [MVM's developer documentation](https://mvm.dev/) to learn more about it.

## Mixin Messenger

[Mixin Messenger](https://mixin.network/messenger) is an open source cryptocurrency wallet, which supports almost all popular cryptocurrencies.

Mixin Messenger is developed by Mixin Dev Team, who release it under the GPL-3.0 license.

For users, please download the app from its [official website](https://mixin.network/messenger).

For developers, please check out [its source code here](https://github.com/MixinNetwork/).
