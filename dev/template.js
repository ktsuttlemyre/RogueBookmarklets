---
description: |
  <h1>This is some markdown content in YAML.</h1>
  Note that description should always be followed by a pipe character "|" 
  so you can use multiple lines.

  It's totally cool here
  
deprecated: Originally created in 2005 it doesn't seem to work as well at it once did as browsers have evovled a lot since then.
####### Other Metadata #######
authors: |
  Jane Doe <another url>
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: codepen.com/something/something

####### function signature #######
qualified urls: []
async: true|false
type: tool, web-app, toy, service
data privacy: [local, server, third-party-request, third-party-inline, third-party-visit]
libraries:
  src: "https://code.jquery.com/jquery-3.5.1.min.js"
  integrity: "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  test: "window.jQuery"
  callback: "aFunction"

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {type} VarName - describe what you expect to see as input
  {type} VarName - describe what you expect to see as input
returns: |
  {undefined} Some Description if needed

---
var aLiquidVariable = {{ site.github.build_revision }}
var g={g:function(){alert('Aye, It\'s just me. Imma template!');}}
g.g()


/**
 *  Put your description here
 *  You can use multi lines
 *  Original Source: {@link ######}
 *  @param {type} describe what you expect to see as input
 *  @param {type} describe what you expect to see as input
 *  @returns {type}
 *  @author Jane Smith <jsmith@example.com> 
 */

//Example:
/**
 *  Converts the entire page to grayscale.<br><i class="gray">Toggles the page color on and off.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 *  @returns {bool} isGrayscale 
 *  @author Original: Anon <https://codepen.io/bookmarklets>
 *  @author Modifided: Kyle Suttlemyre <http://tildestar.com>
 */

