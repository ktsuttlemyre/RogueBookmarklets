---
description: |
    Uses google translate to autodetect language and convert
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
var t = window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || document.selection && document.selection.createRange && document.selection.createRange().text;
var e = document.charset || document.characterSet;
if (t != "") {
  open("http://translate.google.com/translate_t?text=" + t + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
} else {
  open("http://translate.google.com/translate?u=" + escape(location.href) + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
};
{{ endraw }}
