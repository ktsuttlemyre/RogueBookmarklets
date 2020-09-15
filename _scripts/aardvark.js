---
description: |
    Aardvark is a developer toolset that was once an old Firefox extention now turned into a bookmarklet.
    - Clean up unwanted banners and surrounding "fluff," especially prior to printing a page
    - See how the page is created, block by block
    - View the source code of one or more elements
authors: |
    Rob Brown <rob@karmatics.com>
originalsource: https://www.karmatics.com/aardvark/
deprecated: Originally created in 2005 it doesn't seem to work as well at it once did as browsers have evovled a lot since then.
layout: script
---
{{ raw }}
document.getElementsByTagName("head")[0].appendChild(document.createElement("script")).setAttribute("src", "http://www.karmatics.com/aardvark/loader.js");
{{ endraw }}
