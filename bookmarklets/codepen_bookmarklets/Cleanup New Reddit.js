/**
 *  @author https://codepen.io/bookmarklets
 *  @file Cleans up new Reddit<br><i class="gray">Not as stealthy as Stealth Mode in Old Reddit.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){(function () {var i, elements = document.querySelectorAll("body *");for (i = 0; i < elements.length; i++) {if (getComputedStyle(elements[i]).position === "fixed") {elements[i].parentNode.removeChild(elements[i]);}}})()})();
	(function(){var e=document.getElementsByClassName("s7pq5uy-6")||("jspfgX");
	if(e[0].style.display=="none") {e[0].style.display="block"}else{e[0].style.display="none"}})()