# Getting Started

This section will help you get started with Pando Protocols. We will walk you through the basic concepts of Pando Protocols, and how to integrate them into your projects.

## Register your Mixin Network App

The only prerequisite to develop with Pando is to register as a Mixin Developer. You may need to download Mixin Messenger at first if you don't have it installed: [Download it](https://mixin.network/messenger).

After you have Mixin Messenger installed, you can register as a Mixin Developer by [those steps](https://developers.mixin.one/docs/dapp/getting-started/create-dapp).

For more information about Mixin Network, please visit [Mixin Network Developer Portal](https://developers.mixin.one/).

::: info
Each developer account can creates 2 applications for free, pay if you need more.
:::

## Generate the keys

Click `Ed25519 session` button to generate a new keystore, which includes sensitive information such as the application's PIN, session ID, pin token, and private key:

```json
{
  "pin":        "123456",
  "client_id":  "96c1460b-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL...ZaNag34",
  "private_key":"tbcUDgb4...2TxNfQi"
}
```

and save it to a file named `keystore.json`. Note that the `client_id` is the only unique identifier of your application, you will need it later.

::: warning
Note that the above keys and info are generated in the browser, it will not be saved by the server and browser, please store it properly.
:::

## Install `mixin-cli`

We are strongly recommending you to use `mixin-cli` to help you develop with Pando. It is a command line tool that helps you to manage your dApps and manpuate with Mixin Network.

```bash
git clone git@github.com:fox-one/mixin-cli.git
cd mixin-cli
go install
```

Now you can use `mixin-cli`, for example, show the information of your application:

```bash
$ mixin-cli -f ./keystore.json user me
```

In the following sections, we will use `mixin-cli` to do some operations without writing too much code.

## Get CNB for testing

To test your dApp, you need to get some cryptocurrencies into your keystore. You can get some CNB from [Pando Catkin](https://catkin.pando.im), which has a faucet to give you some CNB for free.

After you get some CNB, you can transfer them to your keystore by paste your application's `client_id` to the entry field, and using Mixin Messenger to scan the QR code.

<QrCodeView :qrcode-label="'Scan to transfer'" prepend-text="mixin://transfer/"/>

If you successfully make it, you will see the CNB in your keystore by `mixing-cli`:

```bash
$ mixin-cli -f ./keystore.json asset list
```

You would see something like this:

```bash
AssetId                               Symbol     Name                     Balance
965e5c6e-434c-3fa9-b780-c50f43cd955c  CNB        Chui Niu Bi              100.01234
```

## What's next?

By now, you should have a basic prerequisite to start developing with Pando Protocols. 

But currently, you haven't interacted with Pando Protocols yet. Before we start, let's take a look at the basic concepts of Pando Protocols, which will help you understand how Pando Protocols work.

If you would like to know about the restful APIs Pando provides, visit [Call API](./call-apis). To put it simply, we will use `curl` to interact with these APIs.

If you want to know how to interact with Pando by sending transactions, visit [Invoke Actions](./invoke-actions). 

If you are not familiar with how Pando manages assets in a decentralized way, you may want to read [MTG](./understand-mtg).

If you want to know how to fill the transfer and redirect to supported wallets in a web browser, visit [Redirect to Wallets](./redirect-to-wallets).

To learn the full power of Pando Protocols, you may want to read [References](/references/overview).

