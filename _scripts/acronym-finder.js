---
description: |
    With more than 1,000,000 human-edited definitions, Acronym Finder is the world's largest and most comprehensive dictionary of acronyms, abbreviations, and initialisms. Combined with the Acronym Attic, Acronym Finder contains more than 5 million acronyms and abbreviations. You can also search for more than 850,000 US and Canadian postal codes.
  
####### Other Metadata #######
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.acronymfinder.com/

####### function signature #######
qualified urls: []
specs: []
layout: script
type: tool
data privacy: [third-party-visit]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} word=getSelection|stdin - word to find the acronym for
returns: |
  {undefined} 
---
{{ raw }}
if (!word) {
  word = prompt("Input an acronym", "");
}
if (word) {
  open("http://www.acronymfinder.com/af-query.asp?String=exact&Acronym=" + encodeURIComponent(word) + "&Find=Find");
};
{{ endraw }}
