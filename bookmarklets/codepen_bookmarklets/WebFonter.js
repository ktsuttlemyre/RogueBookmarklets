/**
 *  @author https://codepen.io/bookmarklets
 *  @file Cool tool lets you tweak the fonts you use right on a live page!<br><i class="gray">Experiment with sizes, font-faces and more while live!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:void(function() { if (typeof(fsi_webfonter) === 'undefined') { console.log('load webfonter'); var gaTrack = function (g,h,i){function c(e,j){return e+Math.floor(Math.random()*(j-e))}var f=1000000000,k=c(f,9999999999),a=c(10000000,99999999),l=c(f,2147483647),b=(new Date()).getTime(),d=window.location,m=new Image(),n='https://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='+k+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='+h+'&utmr='+d+'&utmp='+i+'&utmac='+g+'&utmcc=__utma='+a+'.'+l+'.'+b+'.'+b+'.'+b+'.2;+__utmb='+a+';+__utmc='+a+';+__utmz='+a+'.'+b+'.2.2.utmccn=(referral)|utmcsr='+d.host+'|utmcct='+d.pathname+'|utmcmd=referral;+__utmv='+a+'.-;';m.src=n}; var url = '/bookmarklet?url=' + location.host + location.pathname; gaTrack('UA-45420013-1', 'webfonter.fontshop.com', url); var base = '//webfonter.fontshop.com/'; var r = function(u) { return u + '?r='+(Math.round(new Date().getTime()/600000)); }; var sc = function(p, a) { var e = document.createElement('script'); e.setAttribute('type','text/javascript'); e.setAttribute('charset','UTF-8'); e.setAttribute('src', r(base + p)); if (a) { for (var k in a) { e.setAttribute(k, a[k]); } } document.body.appendChild(e); }; var head = document.getElementsByTagName('head')[0]; if (!head) { head = document.getElementsByTagName('html')[0]; } var ss = function(c) { e = document.createElement('link'); e.setAttribute('type','text/css'); e.setAttribute('rel', 'stylesheet'); e.setAttribute('href',r(base + c)); head.appendChild(e); }; window.require = { baseUrl:base+'js', urlArgs: 'bust=' + (new Date()).getTime(), config: { text: { useXhr:function(url,protocol,hostname,port) { return true; } } } }; window.fsi_webfonter_config = { isDev: true, api: { baseUrl: '//d3otl0lvq84taj.cloudfront.net'+'/webfonter/api/' }, wfs: { ssl: false } }; sc('js/webfonter.js'); ss('css/bookmarklet.css'); ss('css/fsi-swapper.css'); fsi_webfonter = true; } else { if (typeof($) !== 'undefined') { $('#fsi-webfonter').trigger('reopen'); }; } }());