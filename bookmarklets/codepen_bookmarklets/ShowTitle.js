/**
 *  @author https://codepen.io/bookmarklets
 *  @file Shows the pages &lt;TITLE&gt; tag(s) in an alert.<br><i class="gray">Also checks if there is a title class and displays it.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	var titletag=document.getElementsByTagName('title')[0].innerText; 
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
	titletag=document.getElementsByTagName('title')[0].innerText; 
	}
	if (ft.length <=0) {
	ft ='';
	} else {
	ft = '\nFT Title: ' + document.getElementsByClassName('barrier__heading-serif')[0].innerHTML; 
	}
	alert('<TITLE> ' + titletag + '</TITLE>\nTitle class: ' + tytul + ft);