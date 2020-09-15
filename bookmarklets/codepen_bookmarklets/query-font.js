/**
 *  @author https://codepen.io/bookmarklets
 *  @file Identifies the font on a page.<br><i class="gray">Just highlight some text and it will tell you the name of the font!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new Date().getTime()));b.appendChild(s)})();