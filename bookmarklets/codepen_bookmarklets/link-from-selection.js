/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var thisvalue = window.getSelection();var linkval = "<a class="button" href='" + thisvalue + "' >Link</a>";  if (thisvalue == "") { alert("Select/highlight text, then click this bookmarlet");  }else { prompt("Copy the link Below:",linkval);}linkval=null;;