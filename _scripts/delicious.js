---
description: |
  Link sharing site. Use this script to share the current page to del.icio.us

####### Other Metadata #######
authors: |
  Hong Kiat collection <hongkiat.com>
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

####### function signature #######
specs: [a]
layout: script
data-privacy: [third-party]
libraries: ''

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} location - location you want to share to del.icio.us
returns: |
  {undefined} 
---
{{ raw }}
location=location||document.location.href;
window.open("http://del.icio.us/url?url=" + encodeURIComponent(location));
{{ endraw }}
