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

(function() {
  var a = window, b = document, c = encodeURIComponent, d = a.open("http://www.stumbleupon.com/url/" + b.location, "StumbleUpOn", "location=1,status=1,scrollbars=1,resizable=1,alwaysRaised=1,width=800px,height=600px");
  a.setTimeout(function() {
    d.focus();
  }, 60);
})();
{{ endraw }}