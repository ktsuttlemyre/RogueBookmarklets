/**
 *  @author https://codepen.io/bookmarklets
 *  @file Save a frame from a YouTube video
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

var v = document.querySelectorAll("video");
for(var i=0,l=v.length;i<l;i++){
  var e=v[i],
  w = e.videoWidth,
  h = e.videoHeight,
  c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.getContext("2d").drawImage(e, 0, 0, w, h);
  d = document.createElement("img");
  d.src = c.toDataURL();
  d.height = e.videoHeight;
  document.body.appendChild(d);
}
