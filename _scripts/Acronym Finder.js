---
description: |
    With more than 1,000,000 human-edited definitions, Acronym Finder is the world's largest and most comprehensive dictionary of acronyms, abbreviations, and initialisms. Combined with the Acronym Attic, Acronym Finder contains more than 5 million acronyms and abbreviations. You can also search for more than 850,000 US and Canadian postal codes.
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.acronymfinder.com/
layout: script
---
{{ raw }}
var Qr = document.getSelection().toString();
if (!Qr) {
  Qr = prompt("Input an acronym", "");
}
if (Qr) {
  open("http://www.acronymfinder.com/af-query.asp?String=exact&Acronym=" + escape(Qr) + "&Find=Find");
};
{{ endraw }}
