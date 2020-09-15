/**
 *  @author https://codepen.io/bookmarklets
 *  @file Tool for testing Paywalls<br><i class="gray">Find a way around Paywalls with this tool.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	if (document.getElementById('mymenu')) {
	    document.getElementById('mymenu').remove();
	} else {
	(function(){(function () {var i, elements = document.querySelectorAll('body *');for (i = 0; i < elements.length; i++) {if (getComputedStyle(elements[i]).position === 'fixed') {elements[i].parentNode.removeChild(elements[i]);}}})()})();
	(function () { var cookies = document.cookie.split('; '); for (var c = 0; c < cookies.length; c++) { var d = window.location.hostname.split('.'); while (d.length > 0) { var cookieBase = encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path='; var p = location.pathname.split('/'); document.cookie = cookieBase + '/'; while (p.length > 0) { document.cookie = cookieBase + p.join('/'); p.pop(); }; d.shift(); } } })();
	window.localStorage.clear();
	var block_to_insert ;
	var container_block ;
	var outline= '<font size=-1><a href=https://outline.com/' + window.location.href + ' target=_blank title=Via Outline.com>  Outline Article</a></font>';
	var pageTitle=document.getElementsByTagName('title')[0].innerText;
	var pageTitle = pageTitle.toString();
	var pageTitle = pageTitle.replace(/ /g, ' ');
	var pageTitle = pageTitle.replace(/WSJ/g, '');
	var gogoog= 'https://www.google.com/search?q=site:wsj.com/articles/ ' + pageTitle;
	var go2='<font size=-1><a href=' + gogoog + ' target=_blank>  Via Google referrer</a></font>';
	var twit= 'https://twitter.com/search?q=' + pageTitle + '&src=typd';
	var gotwit='<font size=-1><a href=' + twit + ' target=_blank>  Via Twitter referrer</a></font>';
	var arch='<font size=-1><a href=https://archive.today/?run=1&url=' + window.location.href +'>  Archive</a></font>';
	var wayBack='<font size=-1><a href=https://web.archive.org/web/*/' + window.location.href +'>  WayBack Machine</a></font>';
	var goFace='<font size=-1><a href=https://m.facebook.com/l.php?u=' +encodeURIComponent(window.location.href)+ '?ClearCache=true target=_blank>  Via Facebook Referrer</a></font>';
	var titletag=document.getElementsByTagName('title')[0].innerHTML;
	titletag.replace(' ',' ');
	var tytul=document.getElementsByClassName('title');
	var ft=document.getElementsByClassName('barrier__heading-serif');
	if (tytul.length <= 0) {
	tytul = 'Title Class does not exist!';
	} else {
	tytul=document.getElementsByClassName('title')[0].innerText;
	}
	if (titletag.length <= 0) {
	titletag = 'There is no <title> tag on this page!';
	} else {
	titletag=document.getElementsByTagName('title')[0].innerHTML;
	}
	if (ft.length <=0) {
	ft ='';
	} else {
	ft = '\nFT Title: ' + document.getElementsByClassName('barrier__heading-serif')[0].innerHTML;
	}
	function clearCache(){window.open(document.location + '?ClearCache=true', '_self');};
	function clearCache2(){location.reload(true)};
	function clearCookies(){var a,b,c,e,f;f=0; a=document.cookie.split('; '); for(e=0;e<a.length&&a[e];e++){ f++; for(b='.'+location.host;b;b=b.replace(/^(?:\.|[^\.]+)/,'')){ for(c=location.pathname;c;c=c.replace(/.$/,'')){ document.cookie=(a[e]+'; domain='+b+'; path='+c+'; expires='+new Date((new Date()).getTime()-1e11).toGMTString());}}} alert('Expired '+f+' cookies'); };
	function showCookies(){var c=document.cookie; if (c==''){alert('This site didn\'t give you any cookies at all.\nNot a single one!'); }else{ w=window.open('','Links','scrollbars,resizable,width=400,height=600');w.document.write(c); }};
	function cancel() {document.getElementById('mymenu').remove();};
	function info(){alert('by Dan')};
	/* Create our stylesheet */
	var style = document.createElement('style');
	style.innerHTML =
		'#mymenu a:link{color:#00FF00;text-decoration:none;font-size: 12px;border:0}' +
	  '#mymenu a:hover{color:#0000FF;text-decoration:underline;}' +
	  '#mymenu {font-size:12px;font-family:arial,verdana,sans;}' +
	  '#mymenu .yellow a:link{color:yellow}'+
	  '#mymenu img{height: 14px; margin-left: auto; margin-right: auto;}'+
	  '#mymenu .x{font-size: 20px; text-align:right;}' +
	  '#mymenu textarea{font-size: 10px; height:16px; padding:3px 3px; border-radius:5px}'+
	  'td {border: 0;}' +
	  'td.x {vertical-align:top; text-align:right; font-size:20px; color:#F00}' +
	  'td, th {text-align: left; padding: 1px 1px;}'
	  ;
	/* Get the first script tag */
	var ref = document.querySelector('script');
	/* Insert new styles before the first script tag */
	ref.parentNode.insertBefore(style, ref);
	block_to_insert = document.createElement('div');
	block_to_insert.id = 'mymenu';
	block_to_insert.innerHTML = '<table width=100%><tr><td> </td><td><center><font color=#FF0000>Paywall Penetration Tester:</font></center></td><td class=x><font color=red size=+3><a href=# onClick=cancel();return false; title=Close>×</a></font></td></tr></table>
	  <table><tr><td><b><font size=-1>Title: </td><td></b> <textarea rows=1 cols=80>'+ titletag +'&lt;/textarea&gt;</td></tr><tr><td><b><font size=-1>Class:</b></td><td> <textarea rows=1 cols=80>' + tytul + ft +'&lt;/textarea&gt;</td></tr><tr><td><b><font size=-1>URL:</b></td><td> <textarea rows=1 cols=80>' + window.location.href +'&lt;/textarea&gt;</td></tr></table>
	<table width=100%><tr><td>       </td><td>
	  <table><tr><td><img src=https://outline.com/favicon.png height=14></td><td> '+ outline + '</td></tr><tr><td><img src=http://archive.fo/favicon.ico height=13></td><td> ' + arch + '</td></tr><tr><td><img src=https://archive.org/favicon.ico height=16></td><td>' + wayBack + '</td></tr></table>
	</td><td>      </td><td>
	<table><tr><td>
	<tr><td><img src=http://google.com/favicon.ico height=14></td><td>' + go2 + '</td></tr><tr><td><img src=http://twitter.com/favicon.ico height=16></td><td>' + gotwit + '</td></tr><tr><td><img src=http://facebook.com/favicon.ico height=16></td><td>' + goFace + '</td></tr></table>
	</td><td>      </td><td>
	<table class=yellow><tr><td><font size=-1 color=yellow><a href=# onClick=clearCache2()>  Clear Cache</a></font></td><td> </td></tr>
	       <tr><td><font size=-1 color=yellow><a href=# onClick=clearCookies()>  Delete Cookies</a></font></td><td> </td></tr>
	       <tr><td><font size=-1 color=yellow><a href=# onClick=showCookies()>  Show Cookies</a></font></td><td style=text-align:right;color:blue><font size=-1>    <a href=# onClick=info()>ⓘ</a></font></td></tr>
	</table>
	</td></tr></table>';
	container_block = document.getElementsByTagName('body')[0];
	container_block.appendChild(block_to_insert);
	mymenu.setAttribute('style', 'border: 3px solid red; display:inline-block; background-color:#000000; color:#00FF00; float:left; font-family:arial,sans,verdana; font-size:20px; z-index:10000; display: inline-block; line-height:1!important; overflow:visible; position:fixed; top: 0; padding:2px 5px;');
	}