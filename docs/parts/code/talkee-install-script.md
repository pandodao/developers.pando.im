```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@foxone/talkee@2.0.2/dist/index.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.27/dist/mvm.min.js"></script>
<script>
const talkeeOpts = {
  apiBase: "https://talkee-api.pando.im/api",
  slug: window.location.pathname,
  // show the link to the arweave transaction page if possible
  showLink: true,
  // the site id, required
  siteId: "YOUR_SITE_ID_HERE",
  // the container selector to render the talkee
  container: "#comments",
  // default locale is en
  locale: "en",
  // add supported auth methods
  auth: {
    authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
  }
};

function installTalkee() {
  const _checkTalkee = () => {
    return window.Talkee && window.Talkee.install && window.Vue;
  }
  setTimeout(() => {
    if (_checkTalkee()) {
	    if (document.getElementById("comments")) {
        window.Talkee.show(talkeeOpts);
	    }
    } else {
      // try again
      installTalkee();
    }
  }, 1000);
}
installTalkee();
</script>
```