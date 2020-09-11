---
description: |
    SEO and Competitive analyhsis software created by amazon.com
    check the website for their alexa rank
params: |
    {string} current location
returns: |
    {null} opens alexa window with current url as search
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
layout: script
---
{{ raw }}
open("https://www.alexa.com/siteinfo/" + encodeURIComponent(location.hostname));
{{ endraw }}
