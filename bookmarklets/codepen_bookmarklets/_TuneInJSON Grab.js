/**
 *  @author https://codepen.io/bookmarklets
 *  @file <h3>THIS ONE NEEDS WORK - QUIRKY!</h3> Use the first button to get the JSON page, <br>the second button grabs the MP3 stream.<br><i class="gray">Grab an MP3 stream from any TuneIn station.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var url = "";var r = false;try{url = TuneIn.payload.Program.broadcast.StreamUrl;r = confirm("Station JSON URL successfully retrieved. Opening now.");if(r) {window.open(url);}}catch(e) {try {url = TuneIn.payload.Program.broadcast.StreamUrl;r = confirm("Station JSON URL successfully retrieved. Opening now.");if(r) {window.open(url);}}catch(ee) {alert("No TuneIn Station Detected");}}})()