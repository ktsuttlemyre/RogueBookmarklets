(function(H,f,x,t){function y(){var d=Array.prototype.slice.call(arguments);d.unshift("RogueBM[injection]: ");console.error.apply(console,d)}function D(d,e,g){var b=document.createElement("script");b.setAttribute("type","text/javascript");if(d)b.setAttribute("src",d),b.setAttribute("crossorigin","anonymous"),b.onerror=g,b.onload=function(){window.RogueBM.loaded&&window.RogueBM.loaded(d)};else try{b.appendChild(document.createTextNode(e))}catch(l){b.text=e}return b}function I(d,e){var g=f.RogueBM.xDLStorage;g.getScript(d,function(b,l){function p(){if(!e()){r++;if(500>r)return setTimeout(p,10);setTimeout(function(){e()||(new Function(l.data))()},10);setTimeout(function(){e()||eval(l.data)},10);d===C&&setTimeout(function(){console.log("doin external probably");e()||(console.log("using iframe embed"),g.convertToInterface())},10)}}b&&y("Error loading script from xDLStorage",error);document.getElementsByTagName("head")[0].appendChild(D(null,l.data));var r=0;p()})}function E(){function d(e,g,b){function l(a){console.log("got message",a);if(b.includes(a.origin)){var c=null;try{c=JSON.parse(a.data)}catch(K){c=a.data;"RogueRunner:Blur"==c&&(h.display="none");return}var n=c.error;c.error=null;delete c.error;n&&y(n,c,a);if(c.ready)console.log("doing preload handlers"),p();else if(null==c.messageID)console.error("need data.messageID for callbacks to function",a);else{var v=z[c.messageID];v?v.method!=v.method?y("methods do not match. Possible security risk"):(v.a&&v.a(n,c,a),z[c.messageID]=null,delete z[c.messageID]):y("no handler found for ",a.messageID,a)}}else console.warn("rejected post message from",a.origin,"Allowed origins are",b,"you attempted",a)}function p(){clearTimeout(0);r.status="ready";if(u){for(var a=0;a<u.length;a++)m.postMessage(JSON.stringify(u[a]),"*");u=null}}var r=this,m,u=[];r.status="loading";var k,h,F;f.b(function(){if(!x.forcePopOut){k=document.createElement("iframe");k.addEventListener("load",p);k.onerror=function(){r.status="blocked"};k.src=g;h=k.style;h.display="none";h.position="absolute";document.body.appendChild(k);try{m=k.contentWindow}catch(a){m=k.contentWindow}}if(!k||!k.contentDocument||!m){k=null;m=F=f.open(g.src||g,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1");if(!m||m.closed||"undefined"==typeof m.closed)r.status="blocked";m.blur()}});var z={};e.addEventListener?e.addEventListener("message",l,!1):e.attachEvent("onmessage",l);this.getScript=function(a,c){this.postMessage({method:"getScript",url:a},c)};this.postMessage=function(a,c){var n=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();a.messageID=n;z[n]={a:c,method:a.method};null!=u?u.push(a):m.postMessage(JSON.stringify(a),"*")};this.convertToInterface=function(){this.postMessage({method:"convertToInterface"},function(a,c){c.data&&(k&&(h.width=h.height="100%",h.display="block",h.position="absolute",h.bottom=h.right="0",h.border="0",f.RogueBM.show=function(){h.display="block"},document.addEventListener("keyup",function(n){n.ctrlKey&&192==n.keyCode&&f.RogueBM.show()},!1)),F&&alert("not implemented yet"))})}}f.b=function(){var e=[],g,b=document,l=(b.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(b.readyState);return!l&&b.addEventListener("DOMContentLoaded",g=function(){b.removeEventListener("DOMContentLoaded",g);for(l=1;g=e.shift();)g()}),function(p){l?setTimeout(p,0):e.push(p)}}();f.RogueBM.CrossOriginLocalStorage=d;f.RogueBM.xDLStorage=new d(f,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage",["https://ktsuttlemyre.github.io"])}function A(d,e,g){function b(){I(d,g)}if(e!=w)return console.error("RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url",d),1;x.forceIframeInject?setTimeout(b,1):document.getElementsByTagName("head")[0].appendChild(D(d,null,b));return 0}t==String.fromCharCode(37,115)&&(t="");Date.now||(Date.now=function(){return(new Date).getTime()});var q=f.RogueBM=f.RogueBM||{};q.lastCMD=t;if(q.show)q.CrossOriginLocalStorage||E(),t||q.show();else{var G=document.documentElement,B=x.skin;B=("all"in G.style||"cssall"in G.style)&&0!=!!B?"_"+B:"";var C="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+B+".js?user="+encodeURIComponent(x.user);t&&(C+="&cmd="+encodeURIComponent(t));var w=Math.floor(9E9*Math.random())+1E9+"-"+Date.now();A("https://ktsuttlemyre.github.io/libs/js-yaml.min.js",w,function(){return f.jsyaml});A("https://ktsuttlemyre.github.io/RogueBookmarklets/index.js",w,function(){return f.RogueBM.scripts});A(C,w,function(){return f.RogueBM.loaded});E();q.injectScript=A;q.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",w)};q.about={injector:{revision:"{{ site.github.build_revision }}",version:H}};var J="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300);q.open=function(d){f.open(d,"_blank",J)}}})("0.0.1",window,{user:"anonymous",skin:"experimental"},"%s");
