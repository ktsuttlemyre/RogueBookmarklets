/**
 *  @author https://codepen.io/bookmarklets
 *  @file Benchmark the page you are on for its loading speed.<br><i class="gray">Speed check for webpages!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){ window.open('https://developers.google.com/speed/pagespeed/insights/?url='+encodeURIComponent(location.href))})();