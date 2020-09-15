/**
 *  @author https://codepen.io/bookmarklets
 *  @file This will identify the highlighted surname.<br><i class="gray">See the locations in the USA where they live!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var surname = window.getSelection();
	window.open("https://www.ancestry.com/name-origin?surname=" + surname);