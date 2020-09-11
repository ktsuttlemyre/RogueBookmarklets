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

var d = document, f = "http://www.facebook.com/share", l = d.location, e = encodeURIComponent, p = ".php?src=bm&v=4&i=1250537391&u=" + e(l.href) + "&t=" + e(d.title);
1;
try {
  if (!/^(.*.)?facebook.[^.]*$/.test(l.host)) {
    throw 0;
  }
  share_internal_bookmarklet(p);
} catch (z) {
  a = function() {
    if (!window.open(f + "r" + p, "sharer", "toolbar=0,status=0,resizable=1,width=626,height=436")) {
      l.href = f + p;
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