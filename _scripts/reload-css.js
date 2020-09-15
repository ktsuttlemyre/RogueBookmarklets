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
void setTimeout(function() {
  var qs = "?" + (new Date).getTime(), l, i = 0;
  while (l = document.getElementsByTagName("link")[i++]) {
    if (l.rel && "stylesheet" == l.rel.toLowerCase()) {
      if (!l._h) {
        l._h = l.href;
      }
      l.href = l._h + qs;
    }
  }
}, 2000);
{{ endraw }}