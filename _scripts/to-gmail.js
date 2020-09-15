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
popw='';Q='';x=document;y=window;if(x.selection) {Q=x.selection.createRange().text;} else if (y.getSelection) {Q=y.getSelection();} else if (x.getSelection) {Q=x.getSelection();}popw = y.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=' + escape(document.title) + '&body=' + escape(Q) + escape('n') + escape(location.href) + '&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1','gmailForm','scrollbars=yes,width=680,height=510,top=175,left=75,status=no,resizable=yes');if (!document.all) T = setTimeout('popw.focus()',50);void(0);
{{ endraw }}
