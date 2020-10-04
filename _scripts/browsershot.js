---
description: |
  Takes a screenshot of the current webpage in diffrent browsers
 
####### Other Metadata #######
authors: |
    Hong Kiat collection <hongkiat.com>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

####### function signature #######
qualified urls: []
async: false
layout: script
type: tool
data privacy: [third-party-request]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {type} location=location - Location of current webpage
returns: |
  {undefined} 
  
  
---
{{ raw }}
void(location.href='http://browsershots.org/?url='+encodeURIComponent(location))
{{ endraw }}
