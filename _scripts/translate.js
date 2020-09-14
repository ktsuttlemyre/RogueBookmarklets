---
description: |
    This bookmarklet attempts to detect your native language and then provide a convinent way to translate words and phrases.
    If you highlight a word or phrase on any webpage and then run this command it will translate the highlighted word for you.
    If no highlited words are selected this command will use Google Translate to automatically detect the page language and convert it to your own native language
params: |
    {string} highlighted phrase, url or current location
returns: |
    {bool} something something
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/
layout: script
---
{{ raw }}

// var trans = window.getSelection();
// if(trans){
//     return window.open("https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=" + trans);
// }

var e = document.charset || document.characterSet;
var selection=window.getSelection();

if (selection) {
  location.href=("http://translate.google.com/translate_t?text=" + selection + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
} else {
  location.href=("http://translate.google.com/translate?u=" + escape(location.href) + "&hl=en&langpair=auto|en&tbb=1&ie=" + e);
}

{{ endraw }}
