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
  function R(w) {
    try {
      var d = w.document, j, i, t, T, N, b, r = 1, C;
      for (j = 0; t = ["object", "embed", "applet", "iframe"][j]; ++j) {
        T = d.getElementsByTagName(t);
        for (i = T.length - 1; i + 1 && (N = T[i]); --i) {
          if (j != 3 || !R((C = N.contentWindow) ? C : N.contentDocument.defaultView)) {
            b = d.createElement("div");
            b.style.width = N.width;
            b.style.height = N.height;
            b.innerHTML = "<del>" + (j == 3 ? "third-party " + t : t) + "</del>";
            N.parentNode.replaceChild(b, N);
          }
        }
      }
    } catch (E) {
      r = 0;
    }
    return r;
  }
  R(self);
  var i, x;
  for (i = 0; x = frames[i]; ++i) {
    R(x);
  }
})();
{{ endraw }}