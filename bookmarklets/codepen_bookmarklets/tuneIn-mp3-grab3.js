/**
 *  @author https://codepen.io/bookmarklets
 *  @file Grab the MP3 from a TuneIn radio station<br><i class="gray">This one works - you can try to fix the upper two... :)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){try {var data = JSON.parse(document.getElementsByTagName("PRE")[0].innerHTML);data.Streams.forEach(function(element) {prompt(element.Badwidth + "kbps: ", element.Url);});}catch(err) {alert = "This is not a valid TuneIn metadata page."}})()