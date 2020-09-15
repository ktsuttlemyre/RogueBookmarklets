/**
 *  @author https://codepen.io/bookmarklets
 *  @file Word Count<br><i class="gray">Alerts the number of words on the current page.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var wordCount=document.body.innerText.split(' ').length + 1;
	var message='There are ' + wordCount + ' words on this page.';
	alert(message);