---
description: |
    Use Google Translate to automatically detect the language and convert it to your own native language
params: |
    {string} url current location or selected text
returns: |
    {bool} something something
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/
layout: script
---
{{ raw }}
var e = document.charset || document.characterSet;
if (selection != "") {
  open("http://translate.google.com/translate_t?text=" + selection + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
} else {
  open("http://translate.google.com/translate?u=" + escape(location.href) + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
};
{{ endraw }}
