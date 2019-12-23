/**
 *  @author https://codepen.io/bookmarklets
 *  @file Kill that annoying sticky bar at the top/bottom/side of page.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){(function () {var i, elements = document.querySelectorAll("body *");for (i = 0; i < elements.length; i++) {if (getComputedStyle(elements[i]).position === "fixed") {elements[i].parentNode.removeChild(elements[i]);}}})()})()