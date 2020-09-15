---
description: |
    takes all html5 video sources from the page and creates snapshots of their current frame.
params: |
    {type} VarName - describe what you expect to see as input
    {type} VarName - describe what you expect to see as input
returns: |
    {bool} Something something
authors: |
    Bookmarklets <https://codepen.io/bookmarklets>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://cdpn.io/bookmarklets/fullpage/NobJbq
layout: script_native
---

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
  var data = c.toDataURL()
  d.src = data;
  d.height = e.videoHeight;
  document.body.appendChild(d);
  window.open(data);
  
}
