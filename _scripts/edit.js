---
description: |
    <h1>This is some markdown content in YAML that will be output as an </h1>.
    describe the code here

    you can use multiple lines. Its totally cool here
params: |
    {string} element describe what you expect to see as input
    {type} describe what you expect to see as input
returns: |
    {bool} The state that the document is in now
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/
layout: script
---
{{ raw }}
if(typeof element=='string'){
    element=document.querySelectorAll(element);
}

if(element){
    if(!element.length){
        element=[element];
    }
    for (i = 0; i < element.length; ++i) {
      element[i].contentEditable='true';
    }
    return true
}

var isOn=element.contentEditable=='true'||document.designMode=='on';
if(isOn){
    document.body;.contentEditable='false';
    document.designMode='off';
}else{
    document.body;.contentEditable='true';
    document.designMode='on';
}
return !isOn;
{{ endraw }}
