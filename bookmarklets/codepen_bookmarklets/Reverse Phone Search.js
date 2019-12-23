/**
 *  @author https://codepen.io/bookmarklets
 *  @file Highlight a phone number on any webpage, then click this to look it up!<br><i class="gray">This will do a reverse phone number search!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var phone = window.getSelection();
	phone=phone+= ''; 
	var phone=phone.split('-').join(''); 
	var phone=phone.split(' ').join(''); 
	phone = phone.replace(/[()]/g,'');
	window.open('https://www.reversephonelookup.com/results.php?phone=' + phone);