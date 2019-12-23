/**
 *  @author https://codepen.io/bookmarklets
 *  @file <h3>THIS ONE NEEDS WORK - QUIRKY!</h3> Use the first button to get the JSON page, <br>the second button grabs the MP3 stream.<br><i class="gray">Grab an MP3 stream from any TuneIn station.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){try {var data = JSON.parse(document.getElementsByTagName("PRE")[0].innerHTML);data.Streams.forEach(function(element) {prompt(element.Badwidth + "kbps: ", element.Url);});}catch(err) {alert = "This is not a valid TuneIn metadata page."}})()