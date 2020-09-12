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
var t=document.getElementsByTagName('td');for (i=0;i<t.length;i++){void(t[i].style.border='1px solid navy');void(t[i].style.padding='6px');void(t[i].style.color='navy');void(t[i].style.background='#E5E5E5');}
{{ endraw }}
