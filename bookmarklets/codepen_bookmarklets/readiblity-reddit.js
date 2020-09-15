/**
 *  @author https://codepen.io/bookmarklets
 *  @file This cleans up the look of both old and new Reddit for a quick stealth mode.<br><i class="gray">This works in <b>OLD REDDIT AND New Reddit!</b></i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: if(window.location.href.indexOf("old.reddit.com") > -1) { 
	(function(){var newcss=".midcol, .thumbnail, .rank,  .flairichtext, .flaircolordark, .linkflairlabel, .flaircolorlight, .res-flairSearch {display:none} .title {color:black !important} .title{font-size:120% !important} body {background-color:white}";
	if("\v"=="v"){document.createStyleSheet().cssText=newcss}else{var tag=document.createElement("style");
	tag.type="text/css";document.getElementsByTagName("head")[0].appendChild(tag);
	tag[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"]=newcss}})();document.getElementsByClassName("side")[0].remove();document.getElementById("header").remove();
	document.getElementsByClassName("panestack-title")[0].remove();document.getElementsByClassName("menuarea")[0].remove();
	document.getElementsByClassName("usertext cloneable")[0].remove();document.getElementsByName("content")[0].remove();
	document.getElementsByClassName("footer-parent")[0].remove();
	} else if (window.location.href.indexOf("reddit.com") > -1)  {
	(function(){(function () {var i, elements = document.querySelectorAll("body *");for (i = 0; i < elements.length; i++) {if (getComputedStyle(elements[i]).position === "fixed") {elements[i].parentNode.removeChild(elements[i]);}}})()})();
	(function(){var e=document.getElementsByClassName("s7pq5uy-6")||("jspfgX");
	if(e[0].style.display=="none") {e[0].style.display="block"}else{e[0].style.display="none"}})();
	} else {
	alert("You need to be on Reddit.com for this bookmarklet to work!\nStealth mode looks best on old.reddit.com!");
	          }