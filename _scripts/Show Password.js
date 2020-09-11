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
  var s, F, j, f, i;
  s = "";
  F = document.forms;
  for (j = 0; j < F.length; ++j) {
    f = F[j];
    for (i = 0; i < f.length; ++i) {
      if (f[i].type.toLowerCase() == "password") {
        s += f[i].value + "n";
      }
    }
  }
  if (s) {
    alert("Passwords in forms on this page:nn" + s);
  } else {
    alert("There are no passwords in forms on this page.");
  }
})();
{{ endraw }}