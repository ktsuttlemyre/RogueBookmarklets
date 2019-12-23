/**
 *  @author https://codepen.io/bookmarklets
 *  @file Did the site you're on give you cookies?<br>If so, it will show them to you in an alert.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var c=document.cookie;
	if (c==''){
	alert('This site didn\'t give you any cookies at all.\nNot a single one!');
	} else {
	alert('This site has given you the following cookies:\n'+c);
	}