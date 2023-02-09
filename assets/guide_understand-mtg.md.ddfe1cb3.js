import{_ as s,o as a,c as n,a as e}from"./app.bf30e28a.js";const t="/assets/mm-mtg.2b44ca3e.webp",o="/assets/fennec-mtg.7e9a1fa6.webp",l="/assets/metamask-mtg.70a898e2.webp",g=JSON.parse(`{"title":"Understand MTG","description":"","frontmatter":{},"headers":[{"level":2,"title":"What's MTG?","slug":"what-s-mtg","link":"#what-s-mtg","children":[{"level":3,"title":"Response","slug":"response","link":"#response","children":[]}]},{"level":2,"title":"How Pando's MTG works?","slug":"how-pando-s-mtg-works","link":"#how-pando-s-mtg-works","children":[]},{"level":2,"title":"Interaction with Pando's MTG","slug":"interaction-with-pando-s-mtg","link":"#interaction-with-pando-s-mtg","children":[]}],"relativePath":"guide/understand-mtg.md"}`),p={name:"guide/understand-mtg.md"},r=e(`<h1 id="understand-mtg" tabindex="-1">Understand MTG <a class="header-anchor" href="#understand-mtg" aria-hidden="true">#</a></h1><h2 id="what-s-mtg" tabindex="-1">What&#39;s MTG? <a class="header-anchor" href="#what-s-mtg" aria-hidden="true">#</a></h2><p>MTG stands for &quot;<a href="https://developers.mixin.one/docs/mainnet/mtg/overview" target="_blank" rel="noreferrer">Mixin Trusted Group</a>&quot; and is a multi-sig technology based application development paradigm.</p><p>Each MTG implementation can be considered a side chain of the Mixin Network, comprised of multiple, independent nodes that reach consensus through multi-sig technology on the Mixin main network.</p><p>Pando uses MTG to manage assets in a decentralized manner, with nodes referred to as &quot;MTG Nodes&quot;. Currently, there are three protocols built on MTG: <a href="https://pando.im/4swap" target="_blank" rel="noreferrer">4swap/Pando Lake</a>, <a href="https://pando.im/leaf" target="_blank" rel="noreferrer">Pando Leaf</a>, and <a href="https://pando.im/rings" target="_blank" rel="noreferrer">Pando Rings</a>, all managed and controlled by a group of nodes.</p><p>The MTG information can be read through calling <code>/info</code> API, with the <code>members</code> and <code>threshold</code> combination representing the unique multi-sig address on the Mixin Network.</p><h3 id="response" tabindex="-1">Response <a class="header-anchor" href="#response" aria-hidden="true">#</a></h3><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1674965956448</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">members</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a753e0eb-3010-4c4a-a7b2-a7bda4063f62</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">099627f8-4031-42e3-a846-006ee598c56e</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">aefbfd62-727d-4424-89db-ae41f75d2e04</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">d68ca71f-0e2c-458a-bb9c-1d6c2eed2497</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">e4bc0740-f8fe-418c-ae1b-32d9926f5863</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">public_key</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dt351xp3KjNlVCMqBYUeUSF45upCEiReSZAqcjcP/Lc=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">threshold</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="how-pando-s-mtg-works" tabindex="-1">How Pando&#39;s MTG works? <a class="header-anchor" href="#how-pando-s-mtg-works" aria-hidden="true">#</a></h2><p>Each Pando MTG is basically a multi-sig address owned by the group of MTG Nodes. These nodes monitor incoming transactions to the multi-sig address.</p><p>When a transaction is sent to the multi-sig address, the MTG Nodes handle it individually, verifying the transaction and processing the data carried by it according to the protocols&#39; requirements. They then reach consensus by signing transactions.</p><p>When a response transaction is required, the MTG Nodes sign and send it to the Mixin Network, which broadcasts it to the entire network.</p><h2 id="interaction-with-pando-s-mtg" tabindex="-1">Interaction with Pando&#39;s MTG <a class="header-anchor" href="#interaction-with-pando-s-mtg" aria-hidden="true">#</a></h2><p>To send transactions to MTG automatically, you need to create applications.</p><p>To send transactions to MTG by human, a supported wallet must be used.</p><p>A list of supported wallets can be found in the &quot;<a href="/guide/wallets.html">Supported Wallets</a>&quot; section. When sending multi-sig transactions from a wallet, similar screens should appear:</p><p><img src="`+t+'" width="320"><strong>Mixin Messenger</strong></p><p><img src="'+o+'" width="320"><strong>Fennec</strong></p><p><img src="'+l+'" width="320"><strong>Metamask and WalletConnect compatible wallets</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Please note that for the limitation of Metamask and WalletConnect compatible wallets, there is no obvious way to identify the MTG transactions. You may need to check the opponent&#39;s address and transaction memo to identify the MTG transactions.</p></div>',20),i=[r];function c(d,h,D,u,y,F){return a(),n("div",null,i)}const C=s(p,[["render",c]]);export{g as __pageData,C as default};