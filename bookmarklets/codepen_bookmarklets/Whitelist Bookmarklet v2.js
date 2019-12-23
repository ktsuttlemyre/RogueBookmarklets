/**
 *  @author https://codepen.io/bookmarklets
 *  @file Whitelist the page you are on.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:   url = document.location.hostname;thisvalue = url.split(".").slice(-2).join(".");                   var linkval = "@@||"+ thisvalue +"/$document"; { prompt("Copy the link Below:",linkval);}linkval=null;;