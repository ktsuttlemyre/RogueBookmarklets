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
  var s = document.createElement("script");
  s.charset = "UTF-8";
  s.language = "javascript";
  s.type = "text/javascript";
  s.src = "http://tidyread.com/tidyread.js?u=" + encodeURIComponent(document.location.href) + "&t=" + encodeURIComponent(document.title);
  document.body.appendChild(s);
})();
{{ endraw }}