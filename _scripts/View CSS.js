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

s=document.getElementsByTagName('STYLE'); ex=document.getElementsByTagName('LINK'); d=window.open().document; /*set base href*/d.open();d.close(); b=d.body; function trim(s){return s.replace(/^s*n/, '').replace(/s*$/, ''); }; function iff(a,b,c){return b?a+b+c:'';}function add(h){b.appendChild(h);} function makeTag(t){return d.createElement(t);} function makeText(tag,text){t=makeTag(tag);t.appendChild(d.createTextNode(text)); return t;} add(makeText('style', 'iframe{width:100%;height:18em;border:1px solid;')); add(makeText('h3', d.title='Style sheets in ' + location.href)); for(i=0; i<s.length; ++i) { add(makeText('h4','Inline style sheet'  + iff(' title=
{{ endraw }}
