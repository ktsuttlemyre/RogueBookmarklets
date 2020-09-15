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

var d = document, w = window, enc = encodeURIComponent, e = w.getSelection, k = d.getSelection, x = d.selection, s = e ? e() : k ? k() : x ? x.createRange().text : 0, s2 = s.toString() == "" ? s : '"' + enc(s) + '"', f = "http://bit.ly/", l = d.location, p = "?v=3&u=" + enc(l.href) + "&s=" + enc(d.title) + " " + s2, u = f + p;
try {
  if (!/^(.*.)?tumblrzzz[^.]*$/.test(l.host)) {
    throw 0;
  }
  tstbklt();
} catch (z) {
  a = function() {
    if (!w.open(u)) {
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