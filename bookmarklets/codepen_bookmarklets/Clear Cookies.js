/**
 *  @author https://codepen.io/bookmarklets
 *  @file Clear site cookies from your browser.<br><i class="gray">Many paywalls work with time-stamped cookies - this will fix those.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function () { var cookies = document.cookie.split("; "); for (var c = 0; c < cookies.length; c++) { var d = window.location.hostname.split("."); while (d.length > 0) { var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + d.join(".") + " ;path="; var p = location.pathname.split("/"); document.cookie = cookieBase + "/"; while (p.length > 0) { document.cookie = cookieBase + p.join("/"); p.pop(); }; d.shift(); } } })();