/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:if (window.getSelection() == ""){ alert("Highlight a Email address then click this bookmarlet")}else{window.open("https://pipl.com/search/?q=" +encodeURIComponent(window.getSelection())+"&l=&sloc=&in=5");};