/**
 *  @author https://codepen.io/bookmarklets
 *  @file Highlight a word on any webpage, then click this to translate it!<br><i class="gray">This will identify the language and translate into English.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var trans = window.getSelection();
	window.open("https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=" + trans);