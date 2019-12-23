/**
 *  @author https://codepen.io/bookmarklets
 *  @file Cleans up Quora.com<br>     <i class="gray">You can surf Quora in 'stealth' mode. Kills sticky, removes images.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	if(window.location.href.indexOf('quora.com') > -1) { 
	(function(){ (function () { var i, elements = document.querySelectorAll('body *'); 
	for (i = 0; i < elements.length; i++) { 
	if (getComputedStyle(elements[i]).position === 'fixed') { 
	elements[i].parentNode.removeChild(elements[i]); 
	} }})()})(); 
	(function(){function toArray (c){ 
	var a, k;a=new Array; for (k=0; k < c.length; ++k)a[k]=c[k]; return a; 
	} var images, img, altText; images=toArray(document.images); 
	for (var i=0; i < images.length; ++i){img=images[i]; 
	altText=document.createTextNode(img.alt); 
	img.parentNode.replaceChild(altText, img) } })(); 
	function cleanup() { 
	var elements = document.getElementsByClassName('hyperlink_image'); 
	for (var i = 0; i < elements.length; i++) { 
	elements[i].style.display = 'none';
	 } 
	var element2 = document.getElementsByClassName('ui_layout_thumbnail'); 
	for (var i = 0; i < element2.length; i++) { 
	element2[i].style.display = 'none'; 
	} var element3 = document.getElementsByClassName('u-flex-auto'); 
	for (var i = 0; i < element3.length; i++) { 
	element3[i].style.display = 'none'; 
	} 
	}; 
	cleanup(); 
	}else{
	alert('This script only works on Quora.com!');
	}