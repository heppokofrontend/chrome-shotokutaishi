(()=>{"use strict";const t={availWidth:0,availHeight:0},e=[];chrome.runtime.onMessage.addListener((async({message:e,availWidth:a,availHeight:i},o)=>{if("loadstart"!==e||"number"!=typeof o.tab?.id||"number"!=typeof o.tab?.windowId)return;const{type:s}=await chrome.windows.get(o.tab?.windowId);chrome.tabs.sendMessage(o.tab.id,{task:"pageload",windowType:s}),t.availWidth=a,t.availHeight=i})),chrome.runtime.onConnect.addListener((a=>{a.onMessage.addListener((async({task:a,data:i})=>{switch(a){case"windowOpen":(t=>{const{windowId:e,type:a,rows:i,cols:o,targets:s,...d}=t,n="popup"===a;d.availWidth<=0||(async()=>{const t=await chrome.tabs.query({windowId:e}),r=d.availWidth,h=d.availHeight,c=Math.ceil(n?r/o:500)+16,w={top:0,left:0,width:c,height:n?Math.ceil(d.availHeight/i):Math.ceil(.5625*c+39+140)};for(const e of t)if("number"==typeof e.id){const t=await chrome.windows.create({url:e.url,type:a,...w});s.push(t.tabs[0].id),chrome.tabs.remove(e.id),w.left+=c-16,r<w.left&&(w.left=0,w.top+=w.height),h<w.top+w.height&&(w.top=0)}(await chrome.windows.create({url:"./controller.html",type:"popup",width:300,height:290})).alwaysOnTop=!0})()})({...i,...t,targets:e});break;case"gather":await(async t=>{const e=await chrome.windows.create({focused:!0});for(const a of t)chrome.tabs.move(a,{index:-1,windowId:e.id});e.tabs?.[0].id&&chrome.tabs.remove(e.tabs[0].id)})(e),e.length=0;break;default:if(a.startsWith("video-"))for(const t of e)chrome.tabs.sendMessage(t,{task:a,data:i})}}))}))})();