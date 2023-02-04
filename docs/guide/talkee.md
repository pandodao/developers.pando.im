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

## Installation


### Put the scripts and css in your HTML

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- insert styles -->
  <link
    href="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.1/dist/style.css"
    rel="stylesheet"
  />
  <title>Talkee UMD Demo</title>
</head>
<body>
  <!-- insert scripts -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.1/dist/index.umd.js"></script>
  <!-- the container -->
  <div class="#talkee-wrapper"></div>
</body>
```

### Use Talkee in your js code

```js
const talkeeOpts = computed(() => {
  const slug = window.location.pathname;
  return {
    slug,
    // show the link to the arweave transaction page if possible
    showLink: true,
    // the site id, required
    siteId: "3",
    // the container selector to render the talkee
    container: "#talkee-wrapper",
    // default locale is en
    locale: "en",
    // add supported auth methods
    auth: {
      authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
    }
  };
});

function installTalkee() {
  const _checkTalkee = () => {
    return window.Talkee && window.Talkee.install && window.Vue;
  }
  setTimeout(() => {
    if (_checkTalkee()) {
      window.Talkee.show(talkeeOpts.value);
    } else {
      // try again
      installTalkee();
    }
  }, 1000);
}

// install talkee when the page is loaded
onload() {
  installTalkee();
}
```

for more options, please visit [this page](https://github.com/fox-one/uikit-next/tree/main/packages/talkee) to see the installation guide.

### Enable MetaMask and WalletConnect support

To enable MetaMask and WalletConnect support, add the following code to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.27/dist/mvm.min.js"></script>
```

### Use Talkee in your Vue3 project

Talkee is a Vue3 component, making it easy to integrate into your Vue3 project. For installation instructions, visit [this page](https://github.com/fox-one/uikit-next/tree/main/packages/talkee).

### Gitch and workarounds

To resolve issues with incorrect button styling in certain scenarios, add the following code to your custom CSS file.

```css
:root {
  --v-theme-overlay-multiplier: 1;
}
```




