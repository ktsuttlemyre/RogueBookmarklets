/**
 *  @author https://codepen.io/bookmarklets
 *  @file An older script to clean up old Reddit.<br><i class="gray">Stealth Reddit or Coder Reddit above are better, more robust scripts!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:document.getElementsByClassName("side")[0].remove();
	document.getElementById("header").remove();
	document.getElementsByClassName("panestack-title")[0].remove();
	document.getElementsByClassName("menuarea")[0].remove();
	document.getElementsByClassName("usertext cloneable")[0].remove();
	document.getElementsByName("content")[0].remove();