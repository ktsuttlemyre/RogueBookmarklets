/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var url = location.href; if (url.includes("www")) { var url = url.replace("www", "old"); window.open(url,"_self") } else { var url = url.replace("old", "www"); window.open(url,"_self") }