(function(l,r,I,T,k,q,J,P,U,E,y){function K(){return(Math.floor(9E15*Math.random())+1).toString(36)+"-"+(new Date).getTime().toString(36)}function A(){var a=Array.prototype.slice.call(arguments);a.unshift("RogueBM[injection]: ");k.error.apply(k,a)}function L(a,b,c){"string"==typeof a&&(a=r.createElement(a));for(var d=Object.keys(b),e=0,w=d.length;e<w;e++)0<=V.indexOf(d[e])?a.setAttribute(d[e],b[d[e]]):a[d[e]]=b[d[e]];c&&c.appendChild(a);return a}function M(a,b,c,d){function e(t,m){if(p)k("call after BLOCKED");else if(x)u&&k.log("call after finish!!!",d);else if(p=1,b())u&&k.log("test",b),x=!0,f.loaded(a),c&&c.call&&c(),p=0;else{!0===n&&(N=n,w=100);if(t||100<=w++){x=1;if(d)return p=0,q(function(){N&&0<=["ajax","xdomainiframe"].indexOf(d)&&(d="iframe");u&&k.log("fallback is going to ",d,a);W[d](a,b,c)},1);p=0;return c&&q(function(){c("error:inlining failed")},1)}n=null;m&&!N&&(n=!0,w=100,q(function(){b()||Q(null,m)},1),q(function(){b()||(new Function(m))()},1),q(function(){b()||eval(m)},1));p=0;q(e,100)}}var w=0,x=!1,n,p=0;return e}function Q(a,b,c){c=c&&c.call?c:function(e){e&&A(e)};var d=L("script",{type:"text/javascript",id:"injected_"+K()+"_"+X++});if(b)try{d.appendChild(r.createTextNode(b))}catch(e){d.text=b,q(function(){c(null,b)},1)}else L(d,{src:a,c:"anonymous"}),d.onerror=d.onload=c,q(c,1);r.getElementsByTagName("head")[0].appendChild(d);return d}function Y(a,b){var c=l.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");c.onreadystatechange=function(){4==c.readyState&&(200==c.status||0==c.status?b(null,c.responseText):b(c.status))};try{c.open("GET",a,!0),c.send()}catch(d){b(d)}}function R(){function a(b,c,d){function e(g){u&&k.log("got message",g);if(d.includes(g.origin)){var h=null;try{h=J.parse(g.data)}catch(da){h=g.data;"RogueRunner:Blur"==h&&(m.display="none");return}var z=h.error;h.error=null;delete h.error;if(z)A(z,h,g);else if(h.ready)u&&k.log("doing preload handlers"),w();else if(null==h.messageID)k.error("need data.messageID for callbacks to function",g);else{var B=F[h.messageID];B?B.method!=B.method?A("methods do not match. Possible security risk"):(B.a&&B.a(z,h,g),F[h.messageID]=null,delete F[h.messageID]):A("no handler found for ",g.messageID,g)}}else k.warn("rejected post message from",g.origin,"Allowed origins are",d,"you attempted",g)}function w(){clearTimeout(0);x.status="ready";if(p){for(var g=0;g<p.length;g++)n.postMessage(J.stringify(p[g]),"*");p=null}}var x=this,n,p=[];x.status="loading";var t,m,S;l.b(function(){if(!E.forcePopOut){t=L("iframe",{onerror:function(){x.status="blocked"},frameBorder:"0",allowTransparency:"true",src:c,style:"background-color:transparent;display:none;position:absolute"},r.body);t.addEventListener("load",w);m=t.style;try{n=t.contentWindow}catch(g){n=t.contentWindow}}if(!t||!t.contentDocument||!n){t=null;n=S=l.open(c.src||c,"RogueRunner","scrollbars=no, width=1, height=1, top=1, left=1");if(!n||n.closed||"undefined"==typeof n.closed)x.status="blocked";n.blur()}});var F={};b.addEventListener?b.addEventListener("message",e,!1):b.attachEvent("onmessage",e);this.getScript=function(g,h){this.postMessage({method:"getScript",url:g},h)};this.postMessage=function(g,h){F[g.messageID=K()]={a:h,method:g.method};null!=p?p.push(g):n.postMessage(J.stringify(g),"*")};this.convertToInterface=function(){this.postMessage({method:"convertToInterface"},function(g,h){h.data&&(t&&(m.width=m.height="100%",m.display="block",m.position="absolute",m.bottom=m.right="0",m.border="0",f.show=function(){m.display="block"},r.addEventListener("keyup",function(z){z.ctrlKey&&192==z.keyCode&&f.show()},!1)),S&&P("not implemented yet"))})}}l.b=function(){var b=[],c,d=(r.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(r.readyState);return!d&&r.addEventListener("DOMContentLoaded",c=function(){r.removeEventListener("DOMContentLoaded",c);for(d=1;c=b.shift();)c()}),function(e){d?q(e,0):b.push(e)}}();f.CrossOriginLocalStorage=a;f.xDLStorage=new a(l,"https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage",["https://ktsuttlemyre.github.io"])}function G(a,b,c){if(b!=C)return k.error("RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url",a),1;b=M(a,c,function(){u&&k.log("####complete#####")},"ajax");Q(a,!1,b);q(b,1);return 0}var f=l.RogueBM=l.RogueBM||{},v,Z=Array.prototype.slice.call(r.getElementsByTagName("script")),u=E.debug,aa=/https:\/\/ktsuttlemyre.github.io\/RogueBookmarklets\/RogueRunner_inject.*\.js\?/,D=[1];if("{{ site.github.build_revision }}"!=f.revision){for(;D[0]&&(v=Z.shift());)D=(v.src||"postMessage").split(aa);D=D[1]||"";v&&r.body.removeChild(v);v=0<=D.indexOf("forceRun");if(l===top&&!v){y==String.fromCharCode(37,115)&&(y="");var V=["style"],W={popup:function(a,b,c,d){u&&k.info("using popup last resort");a=1;b=l.screenLeft||l.screenX||0;c=l.innerWidth||I.clientWidth||screen.width||0;null==a&&(a=c/l.screen.availWidth||1);a=l.open("https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html","RogueRunner","scrollbars=no, width="+500/a+", height="+200/a+", top=0, left="+((c-500)/2/a+b));a.focus&&a.focus();a&&!a.closed&&"undefined"!=typeof a.closed||P("RogueRunner external window popup blocked");d&&d.call&&d()},iframe:function(a){u&&k.info("using iframe to show");a===H&&(u&&k.log("using iframe embed for RogueRunner only",l===parent,H),f.xDLStorage.convertToInterface())},ajax:function(a,b,c){u&&k.info("using ajax to inline");b=M(a,b,c,"xdomainiframe");Y(a,b);q(b,1)},xdomainiframe:function(a,b,c){u&&k.info("using xDiframe to inline");var d=M(a,b,c,"iframe");f.xDLStorage.getScript(a,function(e,w){e&&A("Error loading script from xDiframe",e);d(e,w)});q(d,1)}},N,X=0;f.lastCMD=y;if(f.show)f.CrossOriginLocalStorage||R(),y||f.show();else{v=E.skin;v=("all"in I.style||"cssall"in I.style)&&0!=v?"_"+v:"";var H="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src"+v+".js";y&&(H+="&cmd="+T(y));var O=["RogueRunner.js","index.js","js-yaml.min.js"],ba=[];f.loaded=function(a){k.log("loaded",a);a=a.split("/").pop();ba.push(a);O=O.filter(function(b){return b!=a});!O.length&&f.init()};var C=K();R();f.xDLStorage.postMessage({key:".",method:"get",prefix:"bind"},function(a){var b=setInterval(function(){f.autoRun&&f.autoRun(a,b)},1)});G("https://ktsuttlemyre.github.io/RogueBookmarklets/libs/js-yaml.min.js",C,function(){return l.jsyaml});G("https://ktsuttlemyre.github.io/RogueBookmarklets/index.js",C,function(){return f.scripts});G(H,C,function(){return f.show});f.injectScript=G;f.getSessionID=function(){prompt("Copy the session id below to use in protected RogueBM[injector] calls",C)};f.revision="{{ site.github.build_revision }}";f.about={injector:{version:U,option:function(a){return E[a]}}};var ca="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300);f.open=function(a){l.open(a,"_blank",ca)}}}}})(this,document,document.documentElement,encodeURIComponent,console,setTimeout,JSON,alert,"0.0.51",{skin:"experimental",debug:!1,autoShow:!1},"%s");
