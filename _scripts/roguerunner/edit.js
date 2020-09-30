---
description: |
    Puts the page into edit mode. Enables you to add/remove text, remove ads, remove images, or format the page as a parody 
params: |
    {string} element - a query string to select specific objects to be editable. If undefined the current window document will be used
    {boolean} on - toggle edit mode on or off
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
