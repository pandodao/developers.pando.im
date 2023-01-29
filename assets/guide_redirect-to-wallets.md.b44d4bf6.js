import{_ as s,o as a,c as n,a as l}from"./app.0fa8e07e.js";const C=JSON.parse('{"title":"Redirect to Wallets","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using @foxone/passport","slug":"using-foxone-passport","link":"#using-foxone-passport","children":[]},{"level":2,"title":"Redirect Manually","slug":"redirect-manually","link":"#redirect-manually","children":[]}],"relativePath":"guide/redirect-to-wallets.md"}'),o={name:"guide/redirect-to-wallets.md"},e=l(`<h1 id="redirect-to-wallets" tabindex="-1">Redirect to Wallets <a class="header-anchor" href="#redirect-to-wallets" aria-hidden="true">#</a></h1><p>If you are going to provide a Web interface to users, you may need to integrate your dApp with the cryptocurrency wallets and redirect users to them to pay at the desired time.</p><p>Let&#39;s assume you have already understand the previous sections, and you have already generate required <code>memo</code>.</p><h2 id="using-foxone-passport" tabindex="-1">Using <code>@foxone/passport</code> <a class="header-anchor" href="#using-foxone-passport" aria-hidden="true">#</a></h2><p>Pando supports <a href="./wallets.html">multiple wallets</a>, and provides 2 npm packages to help you redirect users to all supported wallets.</p><ul><li><code>@foxone/passport</code>: a SDK for sign in with Mixin Messenger, Fennec, and other wallets.</li><li><code>@foxone/mvm</code>: if you want to redirect users to WalletConnect compatible wallets, you need it.</li></ul><p>It&#39;s a recommended way to use them, and they will save you a lot of time.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">[WIP]</span></span>
<span class="line"></span></code></pre></div><h2 id="redirect-manually" tabindex="-1">Redirect Manually <a class="header-anchor" href="#redirect-manually" aria-hidden="true">#</a></h2><p>If you can not use <code>@foxone/passport</code>, or you prefer to do that yourself, you can redirect users to Mixin Messenger to pay.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> BTC_ASSET_ID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">c6d0c728-2624-429b-8e0d-d9d19b6592fa</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ETH_ASSET_ID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">43d61dcd-e413-450d-80b8-101d5e903357</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pay</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">follow_id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">uuid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">v4</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// construct the memo</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">memo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">$YOUR_MEMO_HERE</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// create action to swap from BTC to ETH</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">https://api.mixin.one/payments</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    data</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">BTC_ASSET_ID</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">0.0001</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">memo</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      trace_id</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">follow_id</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// read receivers and threshold from API \`/api/information\`</span></span>
<span class="line"><span style="color:#F07178;">      opponent_multisig</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">receivers</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">threshold</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// if your web app is running in Messenger&#39;s webview</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// it will invoke the payment UI</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">location</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">code_url</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// if your web also support to visit on desktop</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// you may need to show the QrCode to the users like this:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// const qrCode = generateQrCode(\`https://mixin.one/codes/\${resp.coded}\`)</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// showQrCodeDialog();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,11),p=[e];function t(c,r,y,i,F,D){return a(),n("div",null,p)}const u=s(o,[["render",t]]);export{C as __pageData,u as default};
