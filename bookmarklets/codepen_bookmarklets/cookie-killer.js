/**
 *  @author https://codepen.io/bookmarklets
 *  @file The best cookie remover there is.<br><i class="gray">Expires all site cookies.</i>
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
	document.cookie=(a[e]+"; domain="+b+"; 
	path="+c+"; 
	expires="+new Date((new Date()).getTime()-1e11).toGMTString());}}}
	alert("Expired "+f+" cookies");
	})())