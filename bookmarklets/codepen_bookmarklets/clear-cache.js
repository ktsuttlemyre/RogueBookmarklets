/**
 *  @author https://codepen.io/bookmarklets
 *  @file Clears the server's web cache. <br><i class="gray">This also helps with memory-hog and/or crash prone WebApps.</i> This may not work for all websites as it's not a web standard but might work for Cloudflair or Americommerce sites https://support.americommerce.com/hc/en-us/articles/203052310-Changes-not-Showing-Clear-Cache-Purge-CDN
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:window.open(document.location + "?ClearCache=true", "_self");
