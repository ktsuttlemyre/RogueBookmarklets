(function(C,k,v,w){function p(d){var g=Array.prototype.slice.call(arguments);g.unshift("RogueBM[injection]: ");console.error.apply(console,g)}function y(d,g,c){var b=document.createElement("script");b.setAttribute("type","text/javascript");if(d)b.setAttribute("src",d),b.setAttribute("crossorigin","anonymous"),b.onerror=c;else try{b.appendChild(document.createTextNode(g))}catch(f){b.text=g}return b}function z(d,g){var c=k.RogueBM.xDLStorage;c||p("Error injecting "+d," xDLStorage isn't loaded as a backup either",g);c.getScript(d,function(b){b.error&&p("Error loading script from xDLStorage",b.error);try{document.getElementsByTagName("head")[0].appendChild(y(null,b.data))}catch(f){eval(b)}})}function A(){function d(c,b,f){function q(a){console.log("got message",a);if(f.includes(a.origin)){var e=JSON.parse(a.data);e.error&&p(e.error,a);if(e.ready)console.log("doing preload handlers"),m();else if(null==e.messageID)console.error("need data.messageID for callbacks to function",a);else{var l=r[e.messageID];l?l.method!=l.method?p("methods do not match. Possible security risk"):(l.a&&l.a(e,a),r[e.b]=null,delete r[e.b]):p("no handler found for ",a.messageID,a)}}else console.warn("rejected post message from",a.origin,"Allowed origins are",f,"you attempted",a)}function m(){if(n){for(var a=0;a<n.length;a++)h.postMessage(JSON.stringify(n[a]),"*");n=null}}var h,n=[];g(function(){var a=document.createElement("iframe");a.addEventListener("load",m);a.onerror=function(){alert("yeeeet")};a.src=b;a.style.display="none";a.style.position="absolute";document.body.appendChild(a);try{h=a.contentWindow}catch(e){h=a.contentWindow}a&&a.contentDocument&&h||(h=window.open(b.src||b,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1"),h.blur())});var r={};c.addEventListener?c.addEventListener("message",q,!1):c.attachEvent("onmessage",q);this.getScript=function(a,e){this.postMessage({method:"getScript",url:a},e)};this.postMessage=function(a,e){var l=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();a.messageID=l;r[l]={a:e,method:a.method};null!=n?n.push(a):h.postMessage(JSON.stringify(a),"*")}}var g=function(){var c=[],b,f="object"==typeof document&&document,q=f&&f.documentElement.doScroll,m=f&&(q?/^loaded|^c/:/^loaded|^i|^c/).test(f.readyState);return!m&&f&&f.addEventListener("DOMContentLoaded",b=function(){f.removeEventListener("DOMContentLoaded",b);for(m=1;b=c.shift();)b()}),function(h){m?setTimeout(h,0):c.push(h)}}();k.RogueBM.CrossOriginLocalStorage=d;k.RogueBM.xDLStorage=new d(k,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html",["https://ktsuttlemyre.github.io"])}function B(d,g,c){null==c&&(c=v.forceIframeInjecting);if(g!=x)return console.error("RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url",d),1;c?setTimeout(function(){z(d)},1):document.getElementsByTagName("head")[0].appendChild(y(d,null,function(b){z(d,b)}));return 0}Date.now||(Date.now=function(){return(new Date).getTime()});k.RogueBM=k.RogueBM||{};k.RogueBM.c=function(){return w};window.RogueBM.show&&(k.RogueBM.CrossOriginLocalStorage||A(),w||window.RogueBM.show());var x=Math.floor(9E9*Math.random())+1E9+"-"+Date.now(),t=document.documentElement,u=v.skin;u=("all"in t.style||"cssall"in t.style)&&0!=!!u?"_"+u:"";t="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+u+".js?user="+v.user+"&cmd="+w;window.RogueBM.injectScript=B;window.RogueBM.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",x)};window.RogueBM.about={injector:{revision:"{{ site.github.build_revision }}",version:C}};B(t,x);A()})("0.0.1",window,{user:"anonymous",skin:"experimental",forceIframeInjecting:!1});
