/**
 *  @author https://codepen.io/bookmarklets
 *  @file Reload the page via a Facebook referrer.<br>    <i class="gray">This enters the page via Facebook; which may circumvent a paywall</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function () { var cookies = document.cookie.split("; "); for (var c = 0; c < cookies.length; c++) { var d = window.location.hostname.split("."); while (d.length > 0) { var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + d.join(".") + " ;path="; var p = location.pathname.split("/"); document.cookie = cookieBase + "/"; while (p.length > 0) { document.cookie = cookieBase + p.join("/"); p.pop(); }; d.shift(); } } })(); window.location.href="https://m.facebook.com/l.php?u="+encodeURIComponent(window.location.href)+"?ClearCache=true";
