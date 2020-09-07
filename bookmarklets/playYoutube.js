/**
 *  Open a youtube video
 *  @param {type} describe what you expect to see as input
 *  @param {type} describe what you expect to see as input
 *  @returns {type}
 *  @author Kyle Suttlemyre <ktsuttlemyre>
 */
 
(function(global){
  var storage=null;
  if(global['RogueBM'] && global['RogueBM']['xDLStorage']){
    storage=global['RogueBM']['xDLStorage']
  }else{
    alert('need xDLStorage loaded from RogueRunner to work')
    return
  }
  var str=prompt('What youtube object would you like to play?','list=PLglUu7rOaMDvrbxvSXjhCZuguPBV6YcPu')


  storage.getData('YoutubePlayer:status',function(err,payload,event){
    if(err){
      console.error(err)
      return
    }
    if(payload){ //if we have an instance running somewhere then use it
      storage.setItem('youtubePlayer', JSON.stringify({command:str,timestamp:new Date().getTime(),origin:window.location.href}));
    }else{ //create a new instance
      var externalWindowString="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300)
      var externalWindow=function(url){
        var win = window.open(url, _blank, externalWindowString);
      }
      if(str.indexOf('=')<=0){
        str='?'+str
      }
      externalWindow('https://ktsuttlemyre.github.io/RogueBookmarklets/site/player#'+str)
    }
  })

})(window)
