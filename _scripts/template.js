---
description: |
    <h1>This is some markdown content in YAML that will be output as an </h1>.
    describe the code here

    you can use multiple lines. Its totally cool here
params: |
    {type} describe what you expect to see as input
    {type} describe what you expect to see as input
returns: |
    {bool} somethign something
authors: |
    Jane Doe <another url>
    kyle suttlemyre <url>
originalsource: codepen.com/something/something
layout: script
---
//test
alert('Aye, It\'s just me. Imma template!');
{{ page.url }}
{{ date }}
{{ page.returns }}
{{ url }}
{{ returns }}
{%- comment --%}
-----Options-----{%- endcomment -%}
