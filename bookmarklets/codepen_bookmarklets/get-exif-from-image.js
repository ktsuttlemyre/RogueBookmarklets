/**
 *  @author https://codepen.io/bookmarklets
 *  @file Retrieves the EXIF &amp; XMP data from pictures.<br><i class="gray">Get data such as location, type of camera - all exif or XMP meta data from an image.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: if(window.location.href.indexOf('jpg') > -1 || window.location.href.indexOf('png') > -1 || window.location.href.indexOf('jpeg') > -1 || window.location.href.indexOf('gif') > -1 )  {window.open('http://metapicz.com/#landing?imgsrc=' + document.location);}else {alert('You need to directly open the image in its own URL. (.jpg, .jpeg, .gif or .png) ')}