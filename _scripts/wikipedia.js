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

s = document.getSelection();
for (i = 0; i < frames.length; i++) {
  if (s) {
    break;
  }
  s = frames[i].document.getSelection();
}
if (!s) {
  void(s = prompt("Enter search terms for Wikipedia", ""));
}
wikiw = open("http://en.wikipedia.org/" + (s ? "w/wiki.phtml?search=" + escape(s) : ""));
wikiw.focus();
{{ endraw }}
