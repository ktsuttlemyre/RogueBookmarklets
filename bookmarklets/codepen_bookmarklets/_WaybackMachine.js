/**
 *  @author https://codepen.io/bookmarklets
 *  @file Find an archived version of the page you are on. (Pre paywall?)<br>          <i class="gray">Can't find that page? Did they put up a paywall? Try the Wayback Machine...</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){window.open(  "http://web.archive.org/web/*/" + document.domain)})()