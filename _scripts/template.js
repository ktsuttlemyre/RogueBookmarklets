---
description: |
    <h1>This is some markdown content in YAML that will be output as a header </h1>.
    describe the code here

    you can use multiple lines. Its totally cool here

####### Other Metadata #######
authors: |
    Jane Doe <another url>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: codepen.com/something/something



####### function signature #######
specs: async textselect stdin stdout
layout: script

# for syntax see: https://jsdoc.app/tags-type.html
params: |
    {type} VarName - describe what you expect to see as input
    {type} VarName - describe what you expect to see as input
returns: |
    {bool} Something something
---

var aLiquidVariable = {{ site.github.build_revision }}
var g={g:function(){alert('Aye, It\'s just me. Imma template!');}}
g.g()
