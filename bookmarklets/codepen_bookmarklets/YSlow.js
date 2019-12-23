/**
 *  @author https://codepen.io/bookmarklets
 *  @file Why is this page slow?
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(y,p,o){p=y.body.appendChild(y.createElement('iframe'));p.id='YSLOW-bookmarklet';p.style.cssText='display:none';o=p.contentWindow.document;o.open().write('<head><body onload="YUI_config={win:window.parent,doc:window.parent.document};var d=document;d.getElementsByTagName(\'head\')[0].appendChild(d.createElement(\'script\')).src=\'http://yslow.org/yslow-bookmarklet.js\'">');o.close()}(document))