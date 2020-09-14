description: |
    Does a regular expression search and replace on the current page
params: |
    {string} input - value to act upon
returns: |
    {undefined} Should do an action
authors: |
    bookmarklets <https://codepen.io/bookmarklets>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalSource: https://codepen.io/bookmarklets
layout: script
---
function htmlreplace(a, b, element) {
  a=a||'';
  b=b||'';
  if (!element) {
    element = document.body;
  }
  var nodes = element.childNodes;
  for (var n = 0; n < nodes.length; n++) {
    if (nodes[n].nodeType == Node.TEXT_NODE) {
      nodes[n].textContent = nodes[n].textContent.replace(new RegExp(a, "gi"), b);
    } else {
      htmlreplace(a, b, nodes[n]);
    }
  }
}
htmlreplace(prompt("Text to replace:", ""), prompt("Replacement text:", ""));
