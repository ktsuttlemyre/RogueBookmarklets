---
description: |
    This is a copy of the Readability bookmarklet from Arc90 Labs:

      http://arc90labs-readability.googlecode.com/

    I love the Readability bookmarklet, but they replaced it with a whole
    web service at http://www.readability.com .. it redirects you to a
    page on readability.com when you activate it instead of just modifying
    the page you're viewing .. and they changed the font/color options a
    little .. and it's a browser extension instead of a bookmarklet now,
    and other things that make me like the new version less.

    But the bookmarklet is open source! And has no non-static server-side
    dependencies at all! So it still works perfectly!  Thanks, Arc90 Labs
    people!
    Description from: https://github.com/ejucovy/readability
    Additional Info:
    https://stackoverflow.com/questions/3652657/what-algorithm-does-readability-use-for-extracting-text-from-urls


####### Other Metadata #######
authors: |
    ejucovy <https://github.com/ejucovy/readability>
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://github.com/ejucovy/readability

####### function signature #######
qualified urls: []
async: false
type: tool
data privacy: [third-party-inline]

params: |
    {string} readStyle=readStyle - style-newspaper style-novel style-ebook style-apertura style-athelas 
    {string} readSizee=readSize - size-x-small size-x-small size-medium size-large size-x-large
    {string} readMargin=readMargin - margin-x-narrow margin-narrow margin-medium margin-wide margin-x-wide
    {boolean} readConvertLinksToFootnotes=readConvertLinksToFootnotes - converts links to footnotes like a report
returns: |
    {undefined} 

---
{{ raw }}

window.readStyle = readStyle||"style-newspaper";
window.readSize = readSize||"size-large";
window.readMargin = readMargin||"margin-wide";
window.readConvertLinksToFootnotes=readConvertLinksToFootnotes=||false
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

{{ endraw }}
