(function(l,v,H,O,k,q,I,P,T,C,x){function J(){return(Math.floor(9E15*Math.random())+1).toString(36)+"-"+(new Date).getTime().toString(36)}function z(){var a=Array.prototype.slice.call(arguments);a.unshift("RogueBM[injection]: ");k.error.apply(k,a)}function K(a,c,b){"string"==typeof a&&(a=v.createElement(a));for(var d=Object.keys(c),e=0,u=d.length;e<u;e++)0<=U.indexOf(d[e])?a.setAttribute(d[e],c[d[e]]):a[d[e]]=c[d[e]];b&&b.appendChild(a);return a}function L(a,c,b,d){function e(r,m){if(p)k("call after BLOCKED");else if(w)t&&k.log("call after finish!!!",d);else if(p=1,c())t&&k.log("test",c),w=!0,g.loaded(a),b&&b.call&&b(),p=0;else{!0===n&&(M=n,u=100);if(r||100<=u++){w=1;if(d)return p=0,q(function(){M&&0<=["ajax","xdomainiframe"].indexOf(d)&&(d="iframe");t&&k.log("fallback is going to ",d,a);V[d](a,c,b)},1);p=0;return b&&q(function(){b("error:inlining failed")},1)}n=null;m&&!M&&(n=!0,u=100,q(function(){c()||Q(null,m)},1),q(function(){c()||(new Function(m))()},1),q(function(){c()||eval(m)},1));p=0;q(e,100)}}var u=0,w=!1,n,p=0;return e}function Q(a,c,b){b=b&&b.call?b:function(e){e&&z(e)};var d=K("script",{type:"text/javascript",id:"injected_"+J()+"_"+W++});if(c)try{d.appendChild(v.createTextNode(c))}catch(e){d.text=c,q(function(){b(null,c)},1)}else K(d,{src:a,c:"anonymous"}),d.onerror=d.onload=b,q(b,1);v.getElementsByTagName("head")[0].appendChild(d);return d}function X(a,c){var b=l.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");b.onreadystatechange=function(){4==b.readyState&&(200==b.status||0==b.status?c(null,b.responseText):c(b.status))};try{b.open("GET",a,!0),b.send()}catch(d){c(d)}}function R(){function a(c,b,d){function e(f){t&&k.log("got message",f);if(d.includes(f.origin)){var h=null;try{h=I.parse(f.data)}catch(aa){h=f.data;"RogueRunner:Blur"==h&&(m.display="none");return}var y=h.error;h.error=null;delete h.error;if(y)z(y,h,f);else if(h.ready)t&&k.log("doing preload handlers"),u();else if(null==h.messageID)k.error("need data.messageID for callbacks to function",f);else{var A=D[h.messageID];A?A.method!=A.method?z("methods do not match. Possible security risk"):(A.a&&A.a(y,h,f),D[h.messageID]=null,delete D[h.messageID]):z("no handler found for ",f.messageID,f)}}else k.warn("rejected post message from",f.origin,"Allowed origins are",d,"you attempted",f)}function u(){clearTimeout(0);w.status="ready";if(p){for(var f=0;f<p.length;f++)n.postMessage(I.stringify(p[f]),"*");p=null}}var w=this,n,p=[];w.status="loading";var r,m,S;l.b(function(){if(!C.forcePopOut){r=K("iframe",{onerror:function(){w.status="blocked"},frameBorder:"0",allowTransparency:"true",src:b,style:"background-color:transparent;display:none;position:absolute"},v.body);r.addEventListener("load",u);m=r.style;try{n=r.contentWindow}catch(f){n=r.contentWindow}}if(!r||!r.contentDocument||!n){r=null;n=S=l.open(b.src||b,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1");if(!n||n.closed||"undefined"==typeof n.closed)w.status="blocked";n.blur()}});var D={};c.addEventListener?c.addEventListener("message",e,!1):c.attachEvent("onmessage",e);this.getScript=function(f,h){this.postMessage({method:"getScript",url:f},h)};this.postMessage=function(f,h){D[f.messageID=J()]={a:h,method:f.method};null!=p?p.push(f):n.postMessage(I.stringify(f),"*")};this.convertToInterface=function(){this.postMessage({method:"convertToInterface"},function(f,h){h.data&&(r&&(m.width=m.height="100%",m.display="block",m.position="absolute",m.bottom=m.right="0",m.border="0",g.show=function(){m.display="block"},v.addEventListener("keyup",function(y){y.ctrlKey&&192==y.keyCode&&g.show()},!1)),S&&P("not implemented yet"))})}}l.b=function(){var c=[],b,d=(v.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(v.readyState);return!d&&v.addEventListener("DOMContentLoaded",b=function(){v.removeEventListener("DOMContentLoaded",b);for(d=1;b=c.shift();)b()}),function(e){d?q(e,0):c.push(e)}}();g.CrossOriginLocalStorage=a;g.xDLStorage=new a(l,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage",["https://ktsuttlemyre.github.io"])}function E(a,c,b){if(c!=B)return k.error("RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url",a),1;c=L(a,b,function(){t&&k.log("####complete#####")},"ajax");Q(a,!1,c);q(c,1);return 0}var t=C.debug,g=l.RogueBM=l.RogueBM||{};x==String.fromCharCode(37,115)&&(x="");var U=["style"],V={popup:function(a,c,b,d){t&&k.info("using popup last resort");a=1;c=l.screenLeft||l.screenX||0;b=l.innerWidth||H.clientWidth||screen.width||0;null==a&&(a=b/l.screen.availWidth||1);a=l.open("https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html","RogueRunner","scrollbars=no, width="+500/a+", height="+200/a+", top=0, left="+((b-500)/2/a+c));a.focus&&a.focus();a&&!a.closed&&"undefined"!=typeof a.closed||P("RogueRunner external window popup blocked");d&&d.call&&d()},iframe:function(a){t&&k.info("using iframe to show");a===F&&(t&&k.log("using iframe embed for RogueRunner only",l===parent,F),g.xDLStorage.convertToInterface())},ajax:function(a,c,b){t&&k.info("using ajax to inline");c=L(a,c,b,"xdomainiframe");X(a,c);q(c,1)},xdomainiframe:function(a,c,b){t&&k.info("using xDiframe to inline");var d=L(a,c,b,"iframe");g.xDLStorage.getScript(a,function(e,u){e&&z("Error loading script from xDiframe",e);d(e,u)});q(d,1)}},M,W=0;g.lastCMD=x;if(g.show)g.CrossOriginLocalStorage||R(),x||g.show();else{var G=C.skin;G=("all"in H.style||"cssall"in H.style)&&0!=G?"_"+G:"";var F="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+G+".js?user="+O(C.user);x&&(F+="&cmd="+O(x));var N=["RogueRunner.js","index.js","js-yaml.min.js"],Y=[];g.loaded=function(a){k.log("loaded",a);a=a.split("/").pop();Y.push(a);N=N.filter(function(c){return c!=a});!N.length&&g.init()};var B=J();R();E("https://ktsuttlemyre.github.io/RogueBookmarklets/libs/js-yaml.min.js",B,function(){return l.jsyaml});E("https://ktsuttlemyre.github.io/RogueBookmarklets/index.js",B,function(){return g.scripts});E(F,B,function(){return g.show});g.injectScript=E;g.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",B)};g.about={injector:{revision:"{{ site.github.build_revision }}",version:T}};var Z="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300);g.open=function(a){l.open(a,"_blank",Z)}}})(this,document,document.documentElement,encodeURIComponent,console,setTimeout,JSON,alert,"0.0.5",{user:"anonymous",skin:"experimental",debug:!1},"%s");
