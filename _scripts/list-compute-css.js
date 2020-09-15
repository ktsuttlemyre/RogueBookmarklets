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
var w=window.open('','','width=360,height=480,resizable=1');var wd=w.document;var prop=(document.defaultView)?'font-size':'fontSize';w.document.write('<html><head></head><body style='background:white;color:black;font:small monospace'><br /></p>%0A<h2>Cascaded Styles</h2>%0A<p>Favelet made by <a href='http://pixy.cz/blog/favelets'>pixy</strong></a></p>%0A<p>‘);w.document.write(’<br /><input type='text' id='prop' value=''+prop+'' />‘);w.document.write(’<br /><hr />%0A<pre id='props'>‘);w.document.write(‘</pre>%0A<p></body></html>‘);w.document.close();var wp=w.document.getElementById(’props’);Ev(document.childNodes);function ES(e)%7Bvar o,s=”,nm=e.nodeName;var p=w.document.getElementById(’prop’).value;if(e.id)nm+=’#’+e.id;if(e.className)nm+=’.’+e.className;if(document.defaultView)s=document.defaultView.getComputedStyle(e,null).getPropertyValue(p);else if(e.currentStyle)s=eval(’e.currentStyle.’+p);o=nm+’<br />↓   ′+p+’: ′+s+’<br />‘;wp.innerHTML+=o;w.document.close()%7Dfunction Ev(ch)%7Bvar i,e;if(ch)for(i=0;i<ch.length;i++)%7Be=ch%5Bi%5D;if(e.nodeType==1&&e.nodeName!='HEAD')%7Be.onmouseover=SS1;e.onmouseout=SS0;Ev(e.childNodes);%7D%7D%7Dfunction SS1()%7Bif(w)ES(this);return false%7Dfunction SS0()%7Bif(w)wp.innerHTML=''%7Dvoid('List %computed styles by%pixy at pixy.cz 03-04-23');
{{ endraw }}
