---
description: |
    Simmple. Just refreshes the page!
params: |
    {undefined} nothing
returns: |
    {undefined} nothing cause we gonna refresh
authors: |
    Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets/>
---
//brute force one will work
window.location.reload && window.location.reload();
window.location.href=window.location.href;
window.location=window.location;
