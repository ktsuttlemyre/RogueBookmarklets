/**
 *  @author https://codepen.io/bookmarklets
 *  @file Inject CSS into site<br><i class="gray">Simply replace the CSS/URL in this script with the StyleSheet you want to use.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var s=document.createElement('link');s.setAttribute('href','http://l.yimg.com/a/lib/arc/core_1.0.5.css');
	s.setAttribute('rel','stylesheet');s.setAttribute('type','text/css');document.getElementsByTagName('head')[0].appendChild(s);alert('Stylesheet injected!');})();