---
description: |
  A test to see how coffee script will be compiled by jekyll and ran within RogueRunner
  
####### Other Metadata #######
authors: |
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://github.com/ktsuttlemyre/RogueBookmarklets

####### function signature #######
qualified urls: []

type: tool, web-app, toy, service
data privacy: [local]


# for syntax see: https://jsdoc.app/tags-type.html
params: |

returns: |
  {undefined} 
---
# Assignment:
number   = 420
opposite = true

# Conditions:
number = -420 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
