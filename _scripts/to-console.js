---
description: |
    This is a set of toCommands. It will take selected text, RogueBM.stdin or prompt the user for input to act on
params: |
    {string} input - value to act upon
returns: |
    {undefined} Should do an action
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
layout: script
---
console.log('arguments',Array.prototype.slice.call(arguments))
console.log('RogueBM["stdin"]',RogueBM['stdin'])
console.log('window.getSelection()',window.getSelection())
console.log('RogueBM["stdout"]',RogueBM["stdout"])



