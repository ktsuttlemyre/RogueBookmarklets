---
description: |
    Gets the size of the current page.
params: |
    {type} VarName - describe what you expect to see as input
    {type} VarName - describe what you expect to see as input
returns: |
    {bool} Something something
authors: |
    Stev <https://stackoverflow.com/users/2375982/stev>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://stackoverflow.com/questions/890221/how-to-get-current-page-size-in-kb-using-just-javascript?fbclid=IwAR0WmdfgpuQDRW76mkShcn4wfsMuGZaaanfZhSKJYP7x900-wReJSAY3RvI
layout: script
---
//TODO use ajax to get the size if this doesn't work

a=document.getElementsByTagName('HTML')[0].outerHTML;b=a.length/1024;c=Math.round(b);alert(c+' kb');
