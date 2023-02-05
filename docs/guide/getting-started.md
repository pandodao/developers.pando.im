# Getting Started

Get started with Pando Protocols development with this guide. We'll cover fundamental concepts and show you how to integrate them into your projects.

## Register Mixin Network App

To start developing with Pando, first register as a Mixin Developer. If you don't have Mixin Messenger, [download it](https://mixin.network/messenger). Then follow [these steps](https://developers.mixin.one/docs/dapp/getting-started/create-dapp) to register as a developer.

For more information about Mixin Network, please visit [Mixin Network Developer Portal](https://developers.mixin.one/dashboard).

::: info
Each developer account can creates 2 Apps for free. Pay to the portal if you need more.
:::

## Generate the keys

At the App page, click `Ed25519 session` button to generate a new keystore, which includes sensitive information such as the application's PIN, session ID, pin token, and private key:

```json
{
  "pin":        "123456",
  "client_id":  "eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL...ZaNag34",
  "private_key":"tbcUDgb4...2TxNfQi"
}
```

Save it to a file named `keystore.json`. 

Note that the `client_id` is the only unique identifier of your application, you will need it later.

::: warning
Note that the above keys and info are generated in the browser, it will not be saved by the server and browser, please store it properly and don't share it with others.
:::

## Install `mixin-cli`

We highly recommend using `mixin-cli` for Pando development. It's a command-line tool that streamlines dApp management and interactions with the Mixin Network.

### Install the prebuilt binary

Download the prebuilt binary from [releases](https://github.com/fox-one/mixin-cli/releases).

Put it in your `$PATH` and make it executable.

### Install from source:

```bash
git clone git@github.com:fox-one/mixin-cli.git
cd mixin-cli
go build
go install
```

Now you can use it to show the information of your application:

```bash
$ mixin-cli -f ./keystore.json user me
```

In subsequent sections, we'll use `mixin-cli` to perform operations without coding.

## Get CNB for testing

To test your app, you'll need to acquire cryptocurrency. Obtain CNB from the [Pando Catkin](https://catkin.pando.im)'s CNB faucet, which provides free CNB tokens for developers.

Once you have CNB, transfer it to your keystore by entering your app's `client_id` in the field and scanning the QR code with Mixin Messenger:

<QrCodeView :qrcode-label="'Scan to transfer'" prepend-text="mixin://transfer/"/>

If successful, view the CNB in your keystore via `mixin-cli`:

```bash
$ mixin-cli -f ./keystore.json asset list
```

You would see something like this:

```bash
AssetId                               Symbol     Name                     Balance
965e5c6e-434c-3fa9-b780-c50f43cd955c  CNB        Chui Niu Bi              100.01234
```

## What's next?

You now have the basic prerequisites to start developing with Pando Protocols. To further understand how it works, explore the following:

If you would like to know about the restful APIs Pando provides, visit [Call API](./call-apis). To put it simply, we will use `curl` to interact with these APIs.

If you want to know how to interact with Pando by sending transactions, visit [Invoke Actions](./invoke-actions). 

If you are not familiar with how Pando manages assets in a decentralized way, you may want to read [MTG](./understand-mtg).

If you want to know how to fill the transfer and redirect to supported wallets in a web browser, visit [Redirect to Wallets](./redirect-to-wallets).

To learn the full power of Pando Protocols, you may want to read [References](/references/overview).

