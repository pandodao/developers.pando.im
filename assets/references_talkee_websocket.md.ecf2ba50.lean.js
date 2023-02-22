import{r as p,o as r,c as D,e as s,a,b as e}from"./app.137f2748.js";const F=a("",12),y=e("p",null,"This API is used to get latest 100 messages of specific site and slug.",-1),i=a("",3),C=e("p",null,"This API is used to create a new message.",-1),A=a("",2),m=JSON.parse('{"title":"Talkee Websocket Protocol","description":"","frontmatter":{},"headers":[{"level":2,"title":"Authentication","slug":"authentication","link":"#authentication","children":[]},{"level":2,"title":"Message types","slug":"message-types","link":"#message-types","children":[]},{"level":2,"title":"Get latest messages","slug":"get-latest-messages","link":"#get-latest-messages","children":[{"level":3,"title":"Response","slug":"response","link":"#response","children":[]}]},{"level":2,"title":"Create a new message","slug":"create-a-new-message","link":"#create-a-new-message","children":[{"level":3,"title":"Response","slug":"response-1","link":"#response-1","children":[]}]}],"relativePath":"references/talkee/websocket.md"}'),u={name:"references/talkee/websocket.md"},_=Object.assign(u,{setup(d){const n=[{name:"site_id",type:"number",required:!0,description:"site's id"},{name:"slug",type:"string",required:!0,description:"the slug of site"}],t={name:"filter",type:"string",required:!0,description:'the filter name of messages, can only be "latest"'},c=[{name:"category",type:"string",required:!0,where:"json",description:'the category of message, can only be "text"'},{name:"data",type:"string",required:!0,where:"json",description:"the data of message, should be base64 encoded"},{name:"message_id",type:"uuid",required:!0,where:"json",description:"An uuid of message"}];return(h,g)=>{const o=p("APIEndpoint"),l=p("APIParams");return r(),D("div",null,[F,s(o,{auth:"",method:"GET",url:"/messages?site_id=:site_id&slug=:slug&filter=latest"}),y,s(l,{params:n.concat([t])},null,8,["params"]),i,s(o,{auth:"",method:"POST",url:"/messages?site_id=:site_id&slug=:slug"}),C,s(l,{params:n.concat(c)},null,8,["params"]),A])}}});export{m as __pageData,_ as default};