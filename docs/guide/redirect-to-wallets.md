# Redirect to Wallets

If you are going to provide a Web interface to users, you may need to integrate your dApp with the cryptocurrency wallets and redirect users to them to pay at the desired time.

Let's assume you have already understand the previous sections, and you have already generate required `memo`.

## Using `@foxone/passport`

Pando supports [multiple wallets](./wallets), and provides 2 npm packages to help you redirect users to all supported wallets.

- `@foxone/passport`: a SDK for sign in with Mixin Messenger, Fennec, and other wallets.
- `@foxone/mvm`: if you want to redirect users to WalletConnect compatible wallets, you need it.

It's a recommended way to use them, and they will save you a lot of time.

```typescript
@TODO
```

## Redirect manually

If you can not use `@foxone/passport`, or you prefer to do that yourself, you can redirect users to Mixin Messenger to pay.

```typescript
const BTC_ASSET_ID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa';
const ETH_ASSET_ID = '43d61dcd-e413-450d-80b8-101d5e903357';

async function pay() {
  const follow_id = uuid.v4();

  // construct the memo
  const memo = `$YOUR_MEMO_HERE`;

  // create action to swap from BTC to ETH
  const resp = await http.post(`https://api.mixin.one/payments`, {
    data: {
      BTC_ASSET_ID,
      '0.0001',
      memo,
      trace_id: follow_id,
      // read receivers and threshold from API `/api/information`
      opponent_multisig: { receivers, threshold },
    }
  });

  // if your web app is running in Messenger's webview
  // it will invoke the payment UI
  window.location.href = resp.data.code_url;

  // if your web also support to visit on desktop
  // you may need to show the QrCode to the users like this:
  // const qrCode = generateQrCode(`https://mixin.one/codes/${resp.coded}`)
  // showQrCodeDialog();
}
```