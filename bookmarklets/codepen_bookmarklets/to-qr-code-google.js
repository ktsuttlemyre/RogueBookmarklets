/**
 *  @author https://codepen.io/bookmarklets
 *  @file Generate a QR code for the current page
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
  * @deprecated This script reaches out to google (privacy conflict) and the specific chart api is also deprecated
 */

javascript: (function(){window.open("http://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=" + window.location,"", "width=500, height=500")})()
