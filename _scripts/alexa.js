---
description: |
    hows you the Alexa ranking of the site.
    SEO and Competitive analyhsis software created by amazon.com
  
#deprecated: 
####### Other Metadata #######
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: codepen.com/something/something

####### function signature #######
qualified urls: []
specs: []
layout: script
type: tool
data privacy: [third-party-visit]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} location=stdin|location.hostname - current location
returns: |
  {undefined} opens alexa window with current url as search
---
{{ raw }}
open("https://www.alexa.com/siteinfo/" + encodeURIComponent(location));
{{ endraw }}
