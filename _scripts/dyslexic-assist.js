---
description: |
  loads the opendyslexic font into the current page. Hope this helps someone :-)
  
####### Other Metadata #######
authors: |
  cazepeda <https://github.com/cazepeda/dyslexic-font/>
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://opendyslexic.org/

####### function signature #######
qualified urls: []
async: false
type: tool
data privacy: [local]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {undefined} none - just nothing
returns: |
  {undefined} 

---
(function() {
    var s = document.createElement('link');
    s.setAttribute('href', '//https://ktsuttlemyre.github.io/RogueBookmarklets/libs/css/opendyslexic.css');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(s);
})();
