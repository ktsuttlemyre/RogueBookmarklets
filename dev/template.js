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
specs: [async, textselect, stdin, stdout]
layout: script
data-privacy: [local-only, third-party, single-party]
libraries:
  - ["https://code.jquery.com/jquery-3.5.1.min.js", "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" ]

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

