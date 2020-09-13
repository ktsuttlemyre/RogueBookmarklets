---
description: |
    Works on google translate page to break out of the translate page to the original url.
params: |
    {type} describe what you expect to see as input
returns: |
    {bool} something
authors: |
    kyle suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: http://7is7.com/software/bookmarklets/translate.html
layout: script
---
(function() {
  l = location.href;
  if (l.indexOf("translate")) {
    location.href = decodeURIComponent(l.replace(/^.*[&?](trurl|url|u)=/, "").replace(/[&?].*$/, ""));
  }
})();
