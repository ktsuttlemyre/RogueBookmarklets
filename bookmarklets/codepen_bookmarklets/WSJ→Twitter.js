/**
 *  @author https://codepen.io/bookmarklets
 *  @file Open the Wall Street Journal via Twitter Referrer<br><i class="gray">Opens the WSJ by going through twitter after clearing all cookies and cache.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	void((function(){
	var a,b,c,e,f;f=0;
	a=document.cookie.split("; ");
	for(e=0;e<a.length&&a[e];e++){
	f++;
	for(b="."+location.host;b;b=b.replace(/^(?:\.|[^\.]+)/,"")){
	for(c=location.pathname;c;c=c.replace(/.$/,"")){
	document.cookie=(a[e]+"; 
	domain="+b+"; 
	path="+c+"; 
	expires="+new Date((new Date()).getTime()-1e11).toGMTString());
	}}}
	alert("Expired "+f+" cookies");})()); 
	window.localStorage.clear(); 
	if(window.location.href.indexOf('ft.com') > -1) { 
	var pageTitle=document.getElementsByClassName('barrier__heading-serif')[0].innerHTML; 
	} else { 
	var pageTitle=document.getElementsByTagName('title')[0].innerText; 
	} var host=(window.location.hostname); var host=host.replace('www.',''); 
	var host = host.split(".", 1); var pageTitle = pageTitle.toString(); 
	var twit= 'https://twitter.com/search?q=' + host + ' '+ pageTitle + '&src=typd'; window.open(twit, '_blank');