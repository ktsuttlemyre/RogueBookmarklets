/**
 *  @author https://codepen.io/bookmarklets
 *  @file Save a frame from a YouTube video
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: e = document.querySelectorAll(".html5-main-video")[0]; w = e.videoWidth; h = e.videoHeight; c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(e, 0, 0, w, h); d=document.createElement("img"); d.src=c.toDataURL(); d.height=20; document.querySelectorAll("#count")[0].appendChild(d);