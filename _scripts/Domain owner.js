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
  var h, p;
  h = location.host.split(".");
  p = h.length;
  if (h[p - 1].match(/com$|net$|org$|edu$/i)) {
    location = "http://www.netsol.com/cgi-bin/whois/whois?SearchType=do&STRING=" + h[p - 2] + "." + h[p - 1];
  } else {
    alert("This bookmarklet can only look up owners for .com, .net, .org, and .edu domains.");
  }
  void 0;
})();
{{ endraw }}