---
description: |
    <h1>This is some markdown content in YAML that will be output as an </h1>.
    describe the code here

    you can use multiple lines. Its totally cool here
params: |
    {type} describe what you expect to see as input
    {type} describe what you expect to see as input
returns: |
    {bool} something something
authors: |
    Hong Kiat collection <hongkiat.com>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://www.hongkiat.com/blog/100-useful-bookmarklets-for-better-productivity-ultimate-list/
layout: script
---
{{ raw }}

(function() {
  readStyle = "style-newspaper";
  readSize = "size-large";
  readMargin = "margin-wide";
  _readability_script = document.createElement("SCRIPT");
  _readability_script.type = "text/javascript";
  _readability_script.src = "http://lab.arc90.com/experiments/readability/js/readability.js?x=" + Math.random();
  document.getElementsByTagName("head")[0].appendChild(_readability_script);
  _readability_css = document.createElement("LINK");
  _readability_css.rel = "stylesheet";
  _readability_css.href = "http://lab.arc90.com/experiments/readability/css/readability.css";
  _readability_css.type = "text/css";
  _readability_css.media = "screen";
  document.getElementsByTagName("head")[0].appendChild(_readability_css);
  _readability_print_css = document.createElement("LINK");
  _readability_print_css.rel = "stylesheet";
  _readability_print_css.href = "http://lab.arc90.com/experiments/readability/css/readability-print.css";
  _readability_print_css.media = "print";
  _readability_print_css.type = "text/css";
  document.getElementsByTagName("head")[0].appendChild(_readability_print_css);
})();
{{ endraw }}