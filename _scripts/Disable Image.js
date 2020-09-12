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
javascript:function C(v)%7breturn '<td>'+v+'</td><td>'+((v>>4).toString(16)+(v&15).toString(16)).toUpperCase()+'</td><td bgcolor=DDDDDD>&'+'#'+v+';</td>%0A<p>‘;%7Dvar c=4,b=Math.ceil(224/c),a=’<table border=0>%0A<tr>‘;for(j=0;j<c;j++)%7Ba+='%0A%0A<td>DEC</td>%0A<td>HEX</td>%0A<td>ASC</td>%0A<p>‘;%7Da+=’</tr>%0A<p>‘;for(i=33;i<33+b;i++)%7Ba+='%0A%0A<tr>‘;for(j=0;j<c;j++)%7Bt=i+(j*b);if(t<=255)a+=C(t);%7Da+='</tr>%0A<p>‘;%7Da+=’</table>%0A<p>‘;var W=open(”,”,’width=500,height=600,left=0,top=0,resizable,scrollbars’);void(W.document.write(a));”><strong>ASCII Table</strong></a> – Brings up a ASCII table for your reference.</p>%0A<p><a class=
{{ endraw }}
