---
description: []
  
####### Other Metadata #######
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

####### function signature #######
qualified urls: []
async: true
layout: script
type: tool,
data privacy: [third-party-inline]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} VarName - describe what you expect to see as input
returns: |
  {undefined} 
---
{{ raw }}
(function() {
  if (window["ppw"] && ppw["bookmarklet"]) {
    ppw.bookmarklet.toggle();
  } else {
    window._pwyl_home = "//www.printwhatyoulike.com/";
    window._pwyl_pro_id = null;
    window._pwyl_bmkl = document.createElement("script");
    window._pwyl_bmkl.setAttribute("type", "text/javascript");
    window._pwyl_bmkl.setAttribute("src", window._pwyl_home + "static/compressed/pwyl_bookmarklet_10.js");
    window._pwyl_bmkl.setAttribute("pwyl", "true");
    document.getElementsByTagName("head")[0].appendChild(window._pwyl_bmkl);
  }
})();
{{ endraw }}
