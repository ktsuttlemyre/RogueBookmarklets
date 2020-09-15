/**
 *  @author https://codepen.io/bookmarklets
 *  @file Do a "WhoIs" search for domain owners via GoDaddy. <br><i class="gray">Want to find out who owns a domain? Godaddy will help.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){window.open("https://www.godaddy.com/whois/results.aspx?isc=cjcwebsite&checkAvail=1&tmskey=&domain=" + document.domain)})()