/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:if (window.getSelection() == ""){ alert("Highlight a IP address then click this bookmarlet")}else{window.open("https://www.iplocation.net/?query=" +window.getSelection());};