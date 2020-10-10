/**
 *  @author https://codepen.io/bookmarklets
 *  @file Grab the URL from any TuneIn station and open it in a new window.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:if(window.location.href.indexOf("tunein.com/radio") > -1) { var muzyk = document.getElementById("jp_audio_0").src; (open(muzyk)); var title = document.getElementById("jp_audio_0").title; alert(title+"Was opened in a new window"); } else { alert("You need to be streaming Music on the TuneIn.com page for this to work!") }
