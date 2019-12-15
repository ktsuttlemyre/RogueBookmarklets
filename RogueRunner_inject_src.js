(function (src) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('crossorigin', "anonymous");
    s.onerror = function(a){alert('RogueBookmarks:Error loading \n '+a)}
    document.getElementsByTagName('head')[0].appendChild(s);
})('https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js')
