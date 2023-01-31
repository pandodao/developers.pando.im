import{r as D,o as y,c as C,e as s,b as a,d as e,a as o}from"./app.39b47e28.js";const i=a("h1",{id:"_4swap-api",tabindex:"-1"},[e("4swap API "),a("a",{class:"header-anchor",href:"#_4swap-api","aria-hidden":"true"},"#")],-1),u=a("h2",{id:"read-info",tabindex:"-1"},[e("Read info "),a("a",{class:"header-anchor",href:"#read-info","aria-hidden":"true"},"#")],-1),A=o("",5),d=o("",4),q=o("",4),_=o("",4),h=a("p",null,"This API will respond historical market statistics.",-1),f=o("",3),b=a("p",null,"This API will respond historical market statistics specified by base and quote asset.",-1),E=o("",3),m=a("p",null,"This API will respond the candlestick data specified by base and quote asset.",-1),B=o("",3),T=a("p",null,"This API will respond the order detail related to the follow id.",-1),x=o("",3),g=a("p",null,"This API will respond the order detail related to the follow id.",-1),v=o("",3),k=a("p",null,"This API will respond a list of transactions of the specified pair.",-1),R=o("",3),P=a("p",null,"This API will respond a list of transactions of the specified pair releated to me.",-1),I=o("",3),S=a("p",null,[e("This is an API to generate an encrypted transfer by provided "),a("a",{href:"./action.html"},"action protocol"),e(" data. It's useful if you don't want to sign and encrypt the transaction memo yourself.")],-1),w=o("",4),U=JSON.parse('{"title":"4swap API","description":"","frontmatter":{},"headers":[{"level":2,"title":"Read info","slug":"read-info","link":"#read-info","children":[{"level":3,"title":"Response","slug":"response","link":"#response","children":[]}]},{"level":2,"title":"Read assets","slug":"read-assets","link":"#read-assets","children":[{"level":3,"title":"Response","slug":"response-1","link":"#response-1","children":[]}]},{"level":2,"title":"Read pairs","slug":"read-pairs","link":"#read-pairs","children":[{"level":3,"title":"Response","slug":"response-2","link":"#response-2","children":[]}]},{"level":2,"title":"Read pairs (CMC compatible version)","slug":"read-pairs-cmc-compatible-version","link":"#read-pairs-cmc-compatible-version","children":[{"level":3,"title":"Response","slug":"response-3","link":"#response-3","children":[]}]},{"level":2,"title":"Read statistics","slug":"read-statistics","link":"#read-statistics","children":[{"level":3,"title":"Response","slug":"response-4","link":"#response-4","children":[]}]},{"level":2,"title":"Read statistics of pair","slug":"read-statistics-of-pair","link":"#read-statistics-of-pair","children":[{"level":3,"title":"Response","slug":"response-5","link":"#response-5","children":[]}]},{"level":2,"title":"Read candlestick data","slug":"read-candlestick-data","link":"#read-candlestick-data","children":[{"level":3,"title":"Response","slug":"response-6","link":"#response-6","children":[]}]},{"level":2,"title":"Read order","slug":"read-order","link":"#read-order","children":[{"level":3,"title":"Response","slug":"response-7","link":"#response-7","children":[]}]},{"level":2,"title":"Read transactions","slug":"read-transactions","link":"#read-transactions","children":[{"level":3,"title":"Response","slug":"response-8","link":"#response-8","children":[]}]},{"level":2,"title":"Read transactions of pair","slug":"read-transactions-of-pair","link":"#read-transactions-of-pair","children":[{"level":3,"title":"Response","slug":"response-9","link":"#response-9","children":[]}]},{"level":2,"title":"Read transactions of me","slug":"read-transactions-of-me","link":"#read-transactions-of-me","children":[{"level":3,"title":"Response","slug":"response-10","link":"#response-10","children":[]}]},{"level":2,"title":"Create action","slug":"create-action","link":"#create-action","children":[{"level":3,"title":"Response","slug":"response-11","link":"#response-11","children":[]}]}],"relativePath":"references/4swap/api.md"}'),j={name:"references/4swap/api.md"},Z=Object.assign(j,{setup(V){const t={name:"dur",type:"string",required:!1,description:"The duration of returning data. for example, 4320h means latest 180 days"},p=[{name:"base",type:"uuid",required:!0,description:"The base asset id"},{name:"quote",type:"uuid",required:!0,description:"The quote asset id"}],r={name:"follow_id",type:"uuid",required:!0,description:"The follow id to trace the order"},c=[{name:"next_cursor",type:"number",required:!1,description:"The next cursor to fetch next page"},{name:"limit",type:"number",required:!1,description:"The limit of returned items"}],F=[{name:"action",type:"string",where:"json",required:!0,description:"action protocol data"},{name:"amount",type:"string",where:"json",required:!1,description:"amount of transaction"},{name:"asset_id",type:"string",where:"json",required:!1,description:"asset uuid of transaction"},{name:"broker_id",type:"string",where:"json",required:!1,description:"broker id, leave it empty to use 4swap's default broker"},{name:"trace_id",type:"string",where:"json",required:!1,description:"an UUID to trace the transaction."}];return(N,G)=>{const n=D("APIEndpoint"),l=D("APIParams");return y(),C("div",null,[i,u,s(n,{method:"GET",url:"/info"}),A,s(n,{method:"GET",url:"/assets"}),d,s(n,{method:"GET",url:"/pairs"}),q,s(n,{method:"GET",url:"/cmc/pairs"}),_,s(n,{method:"GET",url:"/states/markets?dur=:dur"}),h,s(l,{params:[t]},null,8,["params"]),f,s(n,{method:"GET",url:"/states/markets/:base/:quote"}),b,s(l,{params:p.concat([t])},null,8,["params"]),E,s(n,{method:"GET",url:"/states/markets/:base/:quote/kline/v2?dur=:dur"}),m,s(l,{params:p.concat([t])},null,8,["params"]),B,s(n,{method:"GET",auth:"",url:"/orders/:follow_id"}),T,s(l,{params:[r]},null,8,["params"]),x,s(n,{method:"GET",url:"/transactions?cursor=:next_cursor&limit=:limit"}),g,s(l,{params:c}),v,s(n,{method:"GET",url:"transactions/:base/:quote?cursor=:next_cursor&limit=:limit"}),k,s(l,{params:c.concat(p)},null,8,["params"]),R,s(n,{method:"GET",auth:"",url:"transactions/:base/:quote/mine?cursor=:next_cursor&limit=:limit"}),P,s(l,{params:c.concat(p)},null,8,["params"]),I,s(n,{method:"POST",url:"/actions"}),S,s(l,{params:F}),w])}}});export{U as __pageData,Z as default};
