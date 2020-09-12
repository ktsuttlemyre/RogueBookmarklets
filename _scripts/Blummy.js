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
for(nIx5Bs=0;nIx5Bs<document.all.length;nIx5Bs++){if(document.all[nIx5Bs].tagName=='A'){with(document.all[nIx5Bs].style){if(backgroundColor=='yellow'){void(backgroundColor=document.bgColor)}else{void(backgroundColor='yellow')}}}}

{{ endraw }}
