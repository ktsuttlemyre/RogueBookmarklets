/**
 *  @author https://codepen.io/bookmarklets
 *  @file Stitches together those annoying "Click to read more" sites <br>that require some 20+ clicks to get to the point.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){if(window["pgzp"]){_pgzpToggleBookmarklet();}else{window._page_zipper_is_bookmarklet=true;window._page_zipper=document.createElement("script");window._page_zipper.type="text/javascript";window._page_zipper.src="//www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js";document.getElementsByTagName("head")[0].appendChild(window._page_zipper);}})();