# Talkee

Talkee is a comment hosting service for web sites and web3 applications. It can be embedded in any web based applications. People can connect their wallets to leave comments.

The content of comments could be stored on the blockchain, by default it's stored on [Arweave](https://www.arweave.org/), a decentralized storage network.

The host can distribute crypto rewards to the commenters according to the some specific rules.

## Demo

Please visit [this page](https://fox-one.github.io/uikit-next/?path=/story/talkee-talkee--default) to see the demo.

## Who's using Talkee

- [Pando](https://pando.im) - The official website of Pando.
- [Coinpost](https://coinpost.jp) - Coinpost is a Japanese crypto media. Talkee is used to collect comments from the readers and distribute Bitcoin to the top commenters.


## Register your site

Please send an email to `contact@pando.im` to apply for a site id. Please provide the following information in the email:

- Your site name
- Your site url

and anwser the following questions:

1. How many comments do you expect to have per day?
2. Do you want to enable the reward feature?
3. If so, how many tokens do you want to distribute per day and what's the token/coin symbol?
4. Do you want to enable the seal on blockchain feature?

We will review your application and reply to you as soon as possible.

::: tip
1. Please make sure the token/coins you want to distribute are supported by [Mixin Network](https://mixin.one/snapshots).
2. We will ask you to pay an mount of tokens/coins to cover the cost of the reward feature.
3. At present, we only support Arweave as the storage network.
:::

### Pricing

Talkee is free for now.

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
  <script src="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.0/dist/index.umd.js"></script>
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

If you want to enable MetaMask and WalletConnect support, please add the following code to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.27/dist/mvm.min.js"></script>
```

### Use Talkee in your Vue3 project

Please visit [this page](https://github.com/fox-one/uikit-next/tree/main/packages/talkee) to see the installation guide.

### Gitch and workarounds

for some reason, the button's style is not applied correctly, so we need to add the following code to your custom css file:

```css
:root {
  --v-theme-overlay-multiplier: 1;
}
```




