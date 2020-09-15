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

void(d = document);
void(cs = "http://sam-i-am.com/misc/css/tableborders.css");
void(d.g = d.getElementsByTagName);
void(l = "link");
void(H = d.g("head").item(0));
void(c = d.all ? c = d.all.tags(l) : d.g(l));
with(c) {
  for (i = 0; i < length; i++) {
    if (item(i).getAttribute("href") == cs) {
      location.reload();
    }
  }
}
void(L = d.createElement(l));
void(L.s = L.setAttribute);
void L.s("rel", "StyleSheet");
void L.s("href", cs);
void H.appendChild(L);
{{ endraw }}