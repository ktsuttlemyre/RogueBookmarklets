---
description: |
  Redirects to builtwith.com to show stats on what the current web page is build with

####### Other Metadata #######
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

####### function signature #######
qualified urls: []
async: false
layout: script
type: service
data privacy: [local, server, third-party-request, third-party-inline, third-party-visit]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} host|location.host - host to analize 

returns: |
  {undefined}
---
{{ raw }}
void window.open("http://builtwith.com/?" + location.host);
{{ endraw }}
