import{_ as s,o as n,c as a,a as l}from"./app.ce1ce304.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"Example","slug":"example","link":"#example","children":[]},{"level":3,"title":"Sign the message","slug":"sign-the-message","link":"#sign-the-message","children":[]},{"level":3,"title":"Use our SDKs","slug":"use-our-sdks","link":"#use-our-sdks","children":[]}],"relativePath":"parts/auth-eip4361.md"}'),p={name:"parts/auth-eip4361.md"},o=l(`<p>This approach works for most ethereum compaitable wallets (e.g. Metamask, TrustWallet, Coinbase Wallet, etc.). It is based on the <a href="https://eips.ethereum.org/EIPS/eip-4361" target="_blank" rel="noreferrer">EIP-4361</a> standard. The wallet will sign a message with the private key of the user&#39;s account. The message contains the information that the relying party (e.g. Pando Proto) needs to verify the authentication.</p><p>Before signing, the message is prefixed with <code>\\x19Ethereum Signed Message:\\n&lt;length of message&gt;</code> as defined in <a href="https://eips.ethereum.org/EIPS/eip-191" target="_blank" rel="noreferrer">EIP-191</a>.</p><p>Here is a template of the full message is presented below for readability and ease of understanding. Field descriptions are provided in the following:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">domain</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> wants you to sign </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> with your Ethereum account:</span></span>
<span class="line"><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">address</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">statement</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">URI:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">uri</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Version:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">version</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Chain</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ID:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">chain-id</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Nonce:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">nonce</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Issued</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">At:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">issued-at</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Expiration</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Time:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">expiration-time</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Not</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Before:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">not-before</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Request</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ID:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">request-id</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">Resources:</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">resources</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">]}</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">resources</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">1</span><span style="color:#89DDFF;">]}</span></span>
<span class="line"><span style="color:#82AAFF;">...</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">resources</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">]}</span></span>
<span class="line"></span></code></pre></div><p>in which,</p><ul><li><code>domain</code> is the RFC 3986 authority that is requesting the signing.</li><li><code>address</code> is the Ethereum address performing the signing conformant to capitalization encoded checksum specified in EIP-55 where applicable.</li><li><code>statement</code> (optional) is a human-readable ASCII assertion that the user will sign, and it must not contain &#39;\\n&#39; (the byte 0x0a).</li><li><code>uri</code> is an RFC 3986 URI referring to the resource that is the subject of the signing (as in the subject of a claim).</li><li><code>version</code> is the current version of the message, which MUST be 1 for this specification.</li><li><code>chain-id</code> is the EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts MUST be resolved.</li><li><code>nonce</code> is a randomized token typically chosen by the relying party and used to prevent replay attacks, at least 8 alphanumeric characters.</li><li><code>issued-at</code> is the ISO 8601 datetime string of the current time.</li><li><code>expiration-time</code> (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.</li><li><code>not-before</code> (optional) is the ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.</li><li><code>request-id</code> (optional) is an system-specific identifier that may be used to uniquely refer to the sign-in request.</li><li><code>resources</code> (optional) is a list of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed as RFC 3986 URIs separated by &quot;\\n- &quot; where \\n is the byte 0x0a.</li></ul><p>For ABNF formal definition, please refer to <a href="https://eips.ethereum.org/EIPS/eip-4361" target="_blank" rel="noreferrer">EIP-4361</a>.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">login.xyz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wants</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">you</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sign</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">with</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">your</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Ethereum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">account:</span></span>
<span class="line"><span style="color:#F78C6C;">0x5d9de0318BeF0c3B81C46aeC31450Ffa54aa6906</span></span>
<span class="line"><span style="color:#FFCB6B;">Sign-In</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">With</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Ethereum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Example</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Statement</span></span>
<span class="line"><span style="color:#FFCB6B;">URI:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://login.xyz</span></span>
<span class="line"><span style="color:#FFCB6B;">Version:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#FFCB6B;">Chain</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ID:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#FFCB6B;">Nonce:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">risxcddc</span></span>
<span class="line"><span style="color:#FFCB6B;">Issued</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">At:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2023</span><span style="color:#C3E88D;">-</span><span style="color:#F78C6C;">02</span><span style="color:#C3E88D;">-16T09:</span><span style="color:#F78C6C;">48</span><span style="color:#C3E88D;">:07.667Z</span></span>
<span class="line"><span style="color:#FFCB6B;">Expiration</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Time:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2023</span><span style="color:#C3E88D;">-</span><span style="color:#F78C6C;">02</span><span style="color:#C3E88D;">-18T09:</span><span style="color:#F78C6C;">48</span><span style="color:#C3E88D;">:07.665Z</span></span>
<span class="line"><span style="color:#FFCB6B;">Resources:</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ipfs://...../</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://example.com/res.json</span></span>
<span class="line"></span></code></pre></div><h3 id="sign-the-message" tabindex="-1">Sign the message <a class="header-anchor" href="#sign-the-message" aria-hidden="true">#</a></h3><p>To sign the message, you need to use the private key of the Ethereum account. For most wallets (e.g. Metamask, TrustWallet), you can not access the private key directly. You need to use the wallet&#39;s API to invoke the signing process.</p><p>The pesudo code is presented below:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">executeTemplate</span><span style="color:#A6ACCD;">(tpl</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">domain</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">login.xyz</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">address</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0x5d9de.....06</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">statement</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Sign-In With Ethereum Example Statement</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// The wallet will prompt the user to sign the message</span></span>
<span class="line"><span style="color:#A6ACCD;">signature </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sign</span><span style="color:#A6ACCD;">(data)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>You can refer to the wallet&#39;s API documentation to implement the signing process.</p><h3 id="use-our-sdks" tabindex="-1">Use our SDKs <a class="header-anchor" href="#use-our-sdks" aria-hidden="true">#</a></h3><p>To simplify the procedure, we offer an npm package <a href="https://www.npmjs.com/package/@foxone/mixin-passport" target="_blank" rel="noreferrer">@foxone/mixin-passport</a> for generating and signing the message, as well as a golang module <a href="https://github.com/fox-one/passport-go" target="_blank" rel="noreferrer">passport-go</a> for parsing and validating the signature.</p><p>Here is the example of using them:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> passport</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">auth</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">clientId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> globals</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">clientId</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">authMethods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">authMethods </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">PROFILE:READ</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">origin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app.pando.im</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pkce</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">hooks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">beforeSignMessage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// put the fields you want to sign here</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> statement</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">This is statement</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">afterSignMessage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">signature</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// send the message and signature to wherever you want</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// e.g.</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">api</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/auth</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">signature</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">access_token</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>In the handler of <code>/auth</code>, you can use the <code>passport-go</code> to parse and validate the signature:</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	eip4361 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/fox-one/passport-go/eip4361</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/fox-one/passport-go/mvm</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LoginPayload</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	Signature     </span><span style="color:#C792EA;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">json:&quot;signature&quot;</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">	Message </span><span style="color:#C792EA;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">json:&quot;message&quot;</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">handler</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">w http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ResponseWriter</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	ctx </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Context</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  body </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">LoginPayload</span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Binding</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> body</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Signature </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> eip4361</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Parse</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Message</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Validate</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Now</span><span style="color:#89DDFF;">());</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> eip4361</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Verify</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Signature</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// get the public key from the message, and use it to login</span></span>
<span class="line"><span style="color:#A6ACCD;">  token</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Login</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Address</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Login</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ctx context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> pubkey </span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  addr </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> common</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">HexToAddress</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">pubkey</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  mvmUser</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> mvm</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetBridgeUser</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> addr</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// save the user here</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// generate an access token for the user</span></span>
<span class="line"><span style="color:#A6ACCD;">  token </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> jwt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">NewWithClaims</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// .... </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> token</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,20),e=[o];function t(r,c,D,y,F,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};