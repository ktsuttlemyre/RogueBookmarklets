/**
 *  Open a youtube video
 *  @param {type} describe what you expect to see as input
 *  @param {type} describe what you expect to see as input
 *  @returns {type}
 *  @author Kyle Suttlemyre <ktsuttlemyre>
 */
 
 var videoId=prompt('What youtube search would you like to play?','')
 if(localStorage.getItem('youtubePlayer:status')){
    localStorage.setItem('youtubePlayer', JSON.stringify({search:search,timestamp:new Date().getTime(),origin:window.location.href}));
 }else{
      var externalWindowString="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300)
      var externalWindow=function(url){
        var win = window.open(url, _blank, externalWindowString);
      }
      externalWindow('https://ktsuttlemyre.github.io/RogueBookmarklets/site/player#?search'+search)
 }
