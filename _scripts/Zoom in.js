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

function zoomImage(image, amt) {
  if (image.initialHeight == null) {
    image.initialHeight = image.height;
    image.initialWidth = image.width;
    image.scalingFactor = 1;
  }
  image.scalingFactor *= amt;
  image.width = image.scalingFactor * image.initialWidth;
  image.height = image.scalingFactor * image.initialHeight;
}
function rZoomFont(n, node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].nodeType == 1) {
      rZoomFont(n, node.childNodes[i]);
    }
  }
  startSize = getComputedStyle(node, "").getPropertyValue("font-size");
  startSize = Number(startSize.substr(0, startSize.length - 2));
  lh = getComputedStyle(node, "").getPropertyValue("line-height");
  if (lh != "normal") {
    lh = Number(lh.substr(0, lh.length - 2)) * n + "px";
    node.style.lineHeight = lh;
  }
  newSize = startSize * n + "px";
  node.style.fontSize = newSize;
}
rZoomFont(1.5, document.getElementsByTagName("body")[0]);
for (i = 0; i < document.images.length; ++i) {
  zoomImage(document.images[i], 1.5);
}
;
{{ endraw }}