(function(A,k,B,q,u){function p(c){var g=Array.prototype.slice.call(arguments);g.unshift("RogueBM[injection]: ");console.error.apply(console,g)}function v(c,g,d){var b=document.createElement("script");b.setAttribute("type","text/javascript");if(c)b.setAttribute("src",c),b.setAttribute("crossorigin","anonymous"),b.onerror=d;else try{b.appendChild(document.createTextNode(g))}catch(f){b.text=g}return b}function w(c,g){var d=k.RogueBM.xDLStorage;d||p("Error injecting "+c," xDLStorage isn't loaded as a backup either",g);d.getScript(c,function(b){b.error&&p("Error loading script from xDLStorage",b.error);try{document.getElementsByTagName("head")[0].appendChild(v(null,b.data))}catch(f){eval(b)}})}function x(){function c(d,b,f){function r(a){console.log("got message",a);if(f.includes(a.origin)){var e=JSON.parse(a.data);e.error&&p(e.error,a);if(e.ready)console.log("doing preload handlers"),m();else if(null==e.messageID)console.error("need data.messageID for callbacks to function",a);else{var l=t[e.messageID];l?l.method!=l.method?p("methods do not match. Possible security risk"):(l.a&&l.a(e,a),t[e.b]=null,delete t[e.b]):p("no handler found for ",a.messageID,a)}}else console.warn("rejected post message from",a.origin,"Allowed origins are",f,"you attempted",a)}function m(){if(n){for(var a=0;a<n.length;a++)h.postMessage(JSON.stringify(n[a]),"*");n=null}}var h,n=[];g(function(){var a=document.createElement("iframe");a.addEventListener("load",m);a.onerror=function(){alert("yeeeet")};a.src=b;a.style.display="none";a.style.position="absolute";document.body.appendChild(a);try{h=a.contentWindow}catch(e){h=a.contentWindow}a&&a.contentDocument&&h||(h=window.open(b.src||b,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1"),h.blur())});var t={};d.addEventListener?d.addEventListener("message",r,!1):d.attachEvent("onmessage",r);this.getScript=function(a,e){this.postMessage({method:"getScript",url:a},e)};this.postMessage=function(a,e){var l=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();a.messageID=l;t[l]={a:e,method:a.method};null!=n?n.push(a):h.postMessage(JSON.stringify(a),"*")}}var g=function(){var d=[],b,f="object"==typeof document&&document,r=f&&f.documentElement.doScroll,m=f&&(r?/^loaded|^c/:/^loaded|^i|^c/).test(f.readyState);return!m&&f&&f.addEventListener("DOMContentLoaded",b=function(){f.removeEventListener("DOMContentLoaded",b);for(m=1;b=d.shift();)b()}),function(h){m?setTimeout(h,0):d.push(h)}}();k.RogueBM.CrossOriginLocalStorage=c;k.RogueBM.xDLStorage=new c(k,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html",["https://ktsuttlemyre.github.io"])}Date.now||(Date.now=function(){return(new Date).getTime()});k.RogueBM=k.RogueBM||{};k.RogueBM.c=u;window.RogueBM.show&&(k.RogueBM.CrossOriginLocalStorage||x(),u||window.RogueBM.show());var y=Math.floor(9E9*Math.random())+1E9+"-"+Date.now(),z=document.documentElement;q=0==!!q&&("all"in z.style||"cssall"in z.style)?"_"+q:"";var C="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+q+".js?user="+B+"&cmd="+u;window.RogueBM.injectScript=function(c,g){if(y!=g)return console.error("sessionID either not correct or not provided. Will not load this url",c),1;document.getElementsByTagName("head")[0].appendChild(v(c,null,function(d){w(c,d)}));return 0};window.RogueBM.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",y)};window.RogueBM.about={injector:{revision:"{{ site.github.build_revision }}",version:A}};setTimeout(function(){w(C)},1);x()})("0.0.1",window,"anonymous","");
