javascript:(function(G,q,t,v){function w(){var f=Array.prototype.slice.call(arguments);f.unshift("RogueBM[injection]: ");console.error.apply(console,f)}function C(f,g,c){var d=document.createElement("script");d.setAttribute("type","text/javascript");if(f)d.setAttribute("src",f),d.setAttribute("crossorigin","anonymous"),d.onerror=c;else try{d.appendChild(document.createTextNode(g))}catch(l){d.text=g}return d}function D(f,g){var c=q.RogueBM.xDLStorage;c.getScript(f,function(d,l){function m(){if(!g()){h++;if(500>h)return setTimeout(m,10);setTimeout(function(){g()||(new Function(l.data))()},10);setTimeout(function(){g()||eval(l.data)},10);f===A&&setTimeout(function(){console.log("doin external probably");g()||(console.log("using iframe embed"),c.convertToInterface())},10)}}d&&w("Error loading script from xDLStorage",error);document.getElementsByTagName("head")[0].appendChild(C(null,l.data));var h=0;m()})}function E(){function f(g,c,d){function l(a){console.log("got message",a);if(d.includes(a.origin)){var e=null;try{e=JSON.parse(a.data)}catch(J){e=a.data;"RogueRunner:Blur"==e&&(b.style.display="none");return}var n=e.error;e.error=null;delete e.error;n&&w(n,e,a);if(e.ready)console.log("doing preload handlers"),m();else if(null==e.messageID)console.error("need data.messageID for callbacks to function",a);else{var u=x[e.messageID];u?u.method!=u.method?w("methods do not match. Possible security risk"):(u.a&&u.a(n,e,a),x[e.b]=null,delete x[e.b]):w("no handler found for ",a.messageID,a)}}else console.warn("rejected post message from",a.origin,"Allowed origins are",d,"you attempted",a)}function m(){clearTimeout(0);h.status="ready";if(r){for(var a=0;a<r.length;a++)k.postMessage(JSON.stringify(r[a]),"*");r=null}}var h=this,k,r=[];h.status="loading";var b,H;domready(function(){if(!t.forcePopOut){b=document.createElement("iframe");b.addEventListener("load",m);b.onerror=function(){h.status="blocked"};b.src=c;b.style.display="none";b.style.position="absolute";document.body.appendChild(b);try{k=b.contentWindow}catch(a){k=b.contentWindow}}if(!b||!b.contentDocument||!k){b=null;k=H=window.open(c.src||c,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1");if(!k||k.closed||"undefined"==typeof k.closed)h.status="blocked";k.blur()}});var x={};g.addEventListener?g.addEventListener("message",l,!1):g.attachEvent("onmessage",l);this.getScript=function(a,e){this.postMessage({method:"getScript",url:a},e)};this.postMessage=function(a,e){var n=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();a.messageID=n;x[n]={a:e,method:a.method};null!=r?r.push(a):k.postMessage(JSON.stringify(a),"*")};this.convertToInterface=function(){this.postMessage({method:"convertToInterface"},function(a,e){e.data&&b&&(b.style.width="100%",b.style.height="100%",b.style.display="block",b.style.position="absolute",b.style.bottom=b.style.right="2em",b.style.border="0",window.RogueBM.show=function(){b.style.display="block"},document.addEventListener("keyup",function(n){n.ctrlKey&&192==n.keyCode&&window.RogueBM.show()},!1))})}}!function(g,c){"undefined"!=typeof module?module.exports=c():"function"==typeof define&&"object"==typeof define.c?define(c):this[g]=c()}("domready",function(){var g=[],c,d="object"==typeof document&&document,l=d&&d.documentElement.doScroll,m=d&&(l?/^loaded|^c/:/^loaded|^i|^c/).test(d.readyState);return!m&&d&&d.addEventListener("DOMContentLoaded",c=function(){d.removeEventListener("DOMContentLoaded",c);for(m=1;c=g.shift();)c()}),function(h){m?setTimeout(h,0):g.push(h)}});q.RogueBM.CrossOriginLocalStorage=f;q.RogueBM.xDLStorage=new f(q,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage",["https://ktsuttlemyre.github.io"])}function B(f,g,c){if(g!=y)return console.error("RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url",f),1;t["force.Injecting"]?setTimeout(function(){D(f,c)},1):document.getElementsByTagName("head")[0].appendChild(C(f,null,function(){D(f,c)}));return 0}Date.now||(Date.now=function(){return(new Date).getTime()});var p=q.RogueBM=q.RogueBM||{};p.lastCMD=function(){return v};if(p.show)p.CrossOriginLocalStorage||E(),v||p.show();else{var F=document.documentElement,z=t.skin;z=("all"in F.style||"cssall"in F.style)&&0!=!!z?"_"+z:"";var A="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+z+".js?user="+t.user;v&&(A+="&cmd="+v);var y=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();(function(){B("https://ktsuttlemyre.github.io/RogueBookmarklets/index.js?user="+t.user,y,function(){return window.RogueBM.scripts});B(A,y,function(){return window.RogueBM.loaded})})();E();p.injectScript=B;p.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",y)};p.about={injector:{revision:"{{ site.github.build_revision }}",version:G}};var I="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300);p.open=function(f){window.open(f,"_blank",I)}}})("0.0.1",window,{user:"anonymous",skin:"experimental",forceIframeInjecting:!1});
