/**
 *  Open a youtube video
 *  @param {type} describe what you expect to see as input
 *  @param {type} describe what you expect to see as input
 *  @returns {type}
 *  @author Kyle Suttlemyre <ktsuttlemyre>
 */
 
(function(global){
  if(!global.['RogueBM']['xDLStorage']){
   alert('need xDLStorage loaded from RogueRunner to work')
   return
 }
  var storage=global.['RogueBM']['xDLStorage']
    var str=prompt('What youtube object would you like to play?','')
  
     //Playground
    self['RogueBM']['xDLStorage'].setData('name', 'buren')
    var onMessage = function(payload, event) {
     //console.log('inject got',payload,event)
     var data = payload.data;
     switch (payload.method) {
         case 'get':
             alert('message data'+ JSON.stringify(payload));
             break;
         default:
             console.error('Unknown method "' + payload.method + '"', payload);
         }
     };
    self['RogueBM']['xDLStorage'].getData('YoutubePlayer:status',function(payload,event){
     if(payload){
      storage.setItem('youtubePlayer', JSON.stringify({search:search,timestamp:new Date().getTime(),origin:window.location.href}));
     }else{
      var externalWindowString="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300)
       var externalWindow=function(url){
         var win = window.open(url, _blank, externalWindowString);
       }
       externalWindow('https://ktsuttlemyre.github.io/RogueBookmarklets/site/player#?search'+search)
     }
    })




})(window)
