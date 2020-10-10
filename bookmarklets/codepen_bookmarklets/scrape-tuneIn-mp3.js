/**
 *  @author https://codepen.io/bookmarklets
 *  @file Grab the MP3 from a TuneIn radio station
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){try {var data = JSON.parse(document.getElementsByTagName("PRE")[0].innerHTML);data.Streams.forEach(function(element) {prompt(element.Badwidth + "kbps: ", element.Url);});}catch(err) {alert = "This is not a valid TuneIn metadata page."}})()
