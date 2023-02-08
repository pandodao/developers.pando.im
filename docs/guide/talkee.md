# Talkee

**Talkee** is a powerful comment hosting solution for web sites and web3 applications. With its seamless integration, it can be easily embedded into any web-based platform, allowing users to connect their wallets and leave comments.

The comments' content can be securely stored on the blockchain, with [Arweave](https://www.arweave.org/) as the default decentralized storage network.

Hosts have the ability to reward active commenters with cryptocurrencies based on customizable rules and criteria.

![Talkee Screenshot](./assets/talkee.webp)

## Demo

Please visit [this page](https://fox-one.github.io/uikit-next/?path=/story/talkee-talkee--default) to see the demo.

## Who's using Talkee

- [Pando](https://pando.im) - The official website of Pando.
- [Coinpost](https://coinpost.jp) - A famous Japanese cryptocurrency and blockchain media. Talkee is used to collect comments from the readers and distribute Bitcoin to the top commenters.

## Register your site

To apply for a `site_id`, please kindly send an email to `contact@pando.im` with the following details:

- Your site name
- Your site URL

Additionally, please answer the following questions:

1. What is your expected daily comment count?
2. Do you wish to enable the reward feature?
3. If yes, specify the number of tokens you want to distribute daily and the token/coin symbol.
4. Do you want to activate the stored on blockchain feature?

We'll review your application and get back to you promptly.

::: tip Notes
- Ensure that the tokens/coins you want to distribute are supported by [Mixin Network](https://mixin.one/snapshots).
- An amount of tokens/coins may be required to cover the cost of the reward feature.
- Currently, we only support arweave as the storage network.
:::

### Pricing

Talkee is free.

## Installation (Vue3)

Talkee is a Vue3 component, making it easy to integrate into your Vue3 project. 

For installation instructions, visit [this page](https://github.com/fox-one/uikit-next/tree/main/packages/talkee).

## Installation (Wordpress)

If you are using Wordpress, you can easily integrate Talkee into your site.

### Disable the default comment system

Follow the instructions [here](https://wordpress.com/support/comments/#enable-or-disable-comments) to disable the default comment system.

### Install the scripts

We recommend using the [WPCode](https://wordpress.org/plugins/insert-headers-and-footers/) plugin to integrate Talkee into your Wordpress site.

Please install WPCode, enable it. Then, go to the plugin settings page "Code Snippets -> Header & Footers".

and add the following code to the `Header` section:

```html
<link href="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.2/dist/style.css" rel="stylesheet" />
<style>
	.talkee {
		margin-top: 40px;
		padding: 0 !important;
	}
	.talkee textarea, .talkee input {
	  border: none;
	}
	.talkee .v-btn:hover {
	    background-color: inherit;
	}
	.talkee .info .v-btn {
		height: 20px;
		font-size: inherit;
		line-height: inherit;
		font-family: inherit;
		font-size-adjust: inherit;
		background: transparent;
		padding: 0;
		outline: none;
	}
	.talkee .info .v-btn__overlay {
		background: transparent;
	}
</style>
```

and add the following code to the `body` section:

<!--@include: ../parts/code/talkee-install-script.md-->

And then, click the `Save` button to save the changes.

## Installation (UMD)

Any web site can use Talkee with the UMD installation method.

### Put the scripts and css in your HTML

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- insert styles -->
  <link
    href="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.2/dist/style.css"
    rel="stylesheet"
  />
  <title>Talkee UMD Demo</title>
</head>
<body>
  <!-- insert scripts -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.2/dist/index.umd.js"></script>
  <!-- the container -->
  <div id="comments"></div>
</body>
```

### Use Talkee in your js code

<!--@include: ../parts/code/talkee-install-script.md-->

for more options, please visit [this page](https://github.com/fox-one/uikit-next/tree/main/packages/talkee) to see the installation guide.


## Installation (Full customized)

Talkee provides [comphrensive APIs](../references/talkee/api.md) for developers to customize the UI and the behavior of the comment system.

We provide a <a href="/demo/talkee" target="_blank">demo</a> to show how to use the APIs to build a custom comment system.

## Enable MetaMask and WalletConnect support

To enable MetaMask and WalletConnect support, add the following code to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.27/dist/mvm.min.js"></script>
```