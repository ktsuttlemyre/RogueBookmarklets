/**
 *  @author https://codepen.io/bookmarklets
 *  @file 3 Ways to open the WSJ<br><i class="gray">Choose how to circumvent the paywall at the WSJ</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	if(window.location.href.indexOf('wsj.com') > -1) { 
	(function () { var cookies = document.cookie.split('; '); for (var c = 0; c < cookies.length; c++) { var d = window.location.hostname.split('.'); while (d.length > 0) { var cookieBase = encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path='; var p = location.pathname.split('/'); document.cookie = cookieBase + '/'; while (p.length > 0) { document.cookie = cookieBase + p.join('/'); p.pop(); }; d.shift(); } } })(); 
	window.localStorage.clear();
	var block_to_insert ; 
	var container_block ; 
	var outline= '<a href=https://outline.com/' + window.location.href + '>  Outline WSJ Article</a>';
	var pageTitle=document.getElementsByTagName('title')[0].innerText; 
	var pageTitle = pageTitle.toString();
	var pageTitle = pageTitle.replace(/ /g, ' ');
	var pageTitle = pageTitle.replace(/WSJ/g, '');
	var gogoog= 'https://www.google.com/search?q=site:wsj.com/articles/ ' + pageTitle;
	var go2='<a href=' + gogoog + '>  Via Google referrer</a>';
	var twit= 'https://twitter.com/search?q=' + pageTitle + '&src=typd';
	var gotwit='<a href=' + twit + '>  Via Twitter referrer</a>';
	block_to_insert = document.createElement('div'); 
	block_to_insert.id = 'mymenu'; 
	block_to_insert.innerHTML = '<center>Three Ways to Open The WSJ:<br /><table><tr><td>O</td><td> 1.) </td><td>'+ outline + '</td></tr><tr><td><img src=http://google.com/favicon.ico height=20></td><td> 2.) </td><td>' + go2 + '</td></tr><tr><td><img src=http://twitter.com/favicon.ico></td><td> 3.) </td><td>' + gotwit + '</td></tr></table>'; 
	container_block = document.getElementsByTagName('body')[0]; 
	container_block.appendChild(block_to_insert); 
	mymenu.setAttribute('style', 'margin-left:auto; margin-right:auto; height:80px; width:50%; background-color:#FFFF00; color:black; float:left; font-family:arial,sans,verdana; font-size:20px; z-index:10000; display: inline-block;line-height:unset!important; line-height:1!important; overflow:visible; position:fixed; top: 0; padding:2px 5px;');
	} else {
	alert('This script is meant to be used on Wall Street Journal Articles!');
	window.open('http://wsj.com', '_self');
	}