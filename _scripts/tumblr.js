---
description: |
    <h1>This is some markdown content in YAML that will be output as an </h1>.
    describe the code here

    you can use multiple lines. Its totally cool here
params: |
    {type} describe what you expect to see as input
    {type} describe what you expect to see as input
returns: |
    {bool} something something
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/
layout: script
---
{{ raw }}

var d = document, w = window, e = w.getSelection, k = d.getSelection, x = d.selection, s = e ? e() : k ? k() : x ? x.createRange().text : 0, f = "http://www.tumblr.com/share", l = d.location, e = encodeURIComponent, p = "?v=3&u=" + e(l.href) + "&t=" + e(d.title) + "&s=" + e(s), u = f + p;
try {
  if (!/^(.*.)?tumblr[^.]*$/.test(l.host)) {
    throw 0;
  }
  tstbklt();
} catch (z) {
  a = function() {
    if (!w.open(u, "t", "toolbar=0,resizable=0,status=1,width=450,height=430")) {
      l.href = u;
    }
  };
  if (/Firefox/.test(navigator.userAgent)) {
    setTimeout(a, 0);
  } else {
    a();
  }
}
void 0;
{{ endraw }}
