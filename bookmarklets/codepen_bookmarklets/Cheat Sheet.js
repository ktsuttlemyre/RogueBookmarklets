/**
 *  @author https://codepen.io/bookmarklets
 *  @file Cheat Sheet<br><i class="gray">Clicking this bookmarklet toggles a cheatsheet - replace with any image.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: 
	var x = 'https://i.imgur.com/M37gJv9.png';
	if(document.getElementById('z2')) { 
	document.getElementById('z2').remove();
	 }else{ 
	var xz ; 
	var zx ; 
	xz = document.createElement('div'); 
	xz.id = 'z2'; 
	function x4() { document.getElementById('z2').remove(); };
	xz.innerHTML = '<p style=text-align:right;font-size:24px;><a href=# style=text-decoration:none;color:red;text-align:right; title=Close onClick=x4() onBlur=x4()>   × </a><br /></p><img src="' + x + '" />';
	zx = document.getElementsByTagName('body')[0]; 
	zx.appendChild(xz); 
	z2.setAttribute('style', 'margin-left:auto; margin-right:auto; text-align:center; background-color:#000; color:red; float:left; font-family:arial,sans,verdana; font-size:24px; z-index:10000; display: inline-block;line-height:unset!important; line-height:1!important; overflow:visible; position:fixed; float:center; top: 0; padding:2px 5px;'); };