/**
 *  @author https://codepen.io/bookmarklets
 *  @file Create a link to the current page
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:function htmlEscape(s){s=s.replace(/&/g,'&');s=s.replace(/>/g,'>');s=s.replace(/</g,'<');return s;} function linkEscape(s){s=s.replace(/&/g,'&');s=s.replace(/"/,'"');return s} h = '<a href="' + linkEscape(location.href) + '">' + htmlEscape(document.title) + '</a>'; with(window.open().document){write(h+'<form name=f><textarea  name=a rows=5 cols=80 wrap=hard>'+htmlEscape(h)+'&lt;/textarea&gt;</form>'); close(); f.a.select(); } void 0