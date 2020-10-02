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

function loadScript(scriptURL) {
  var scriptElem = document.createElement("SCRIPT");
  scriptElem.setAttribute("language", "JavaScript");
  scriptElem.setAttribute("src", scriptURL);
  document.body.appendChild(scriptElem);
}
loadScript("http://westciv.com/xray/thexray.js");
{{ endraw }}
