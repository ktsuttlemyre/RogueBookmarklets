---
description: |
  <h1>This is some markdown content in YAML.</h1>
  Note that description should always be followed by a pipe character "|" 
  so you can use multiple lines.

  It's totally cool here
  
deprecated: Originally created in 2005 it doesn't seem to work as well at it once did as browsers have evovled a lot since then.
####### Other Metadata #######
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/

####### function signature #######
qualified urls: []
async: true|false
layout: script
type: tool, web-app, toy, service
data privacy: [local, server, third-party-request, third-party-inline, third-party-visit]
libraries:
  - ["https://code.jquery.com/jquery-3.5.1.min.js", "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" ]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {type} VarName - describe what you expect to see as input
  {type} VarName - describe what you expect to see as input
returns: |
  {bool} Something something
---
{{ raw }}
(function() {
  if (window["ppw"] && ppw["bookmarklet"]) {
    ppw.bookmarklet.toggle();
  } else {
    window._pwyl_home = "http://www.printwhatyoulike.com/";
    window._pwyl_pro_id = null;
    window._pwyl_bmkl = document.createElement("script");
    window._pwyl_bmkl.setAttribute("type", "text/javascript");
    window._pwyl_bmkl.setAttribute("src", window._pwyl_home + "static/compressed/pwyl_bookmarklet_10.js");
    window._pwyl_bmkl.setAttribute("pwyl", "true");
    document.getElementsByTagName("head")[0].appendChild(window._pwyl_bmkl);
  }
})();
{{ endraw }}
