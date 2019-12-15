(function (user) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js?user='+user);
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('crossorigin', "anonymous");
    s.onerror = function(a){alert('RogueBookmarks:Error loading \n '+a)}
    document.getElementsByTagName('head')[0].appendChild(s);
})('anonymous')
