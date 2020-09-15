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

void(myDiv = document.createElement("div"));
void(myBody = document.getElementsByTagName("body")[0]);
void(myDiv.style.background = "url(http://www.andybudd.com/images/layoutgrid.png)");
void(myDiv.style.position = "absolute");
void(myDiv.style.width = "100%");
void(myDiv.style.height = "100%");
void(myDiv.style.top = "0");
void(myDiv.style.left = "0");
void myBody.appendChild(myDiv);
{{ endraw }}