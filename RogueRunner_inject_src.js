// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

/*how to compile this file

1) Use closer compiler (with above header)
   Troubleshooting: if you get errors use JSHint to fix any errors (EXCEPT BRACKET NOTATION!)
   You must use braket notation for objects crated outside the scope of this script
2) Remove line breaks that occure every 500 characters or so. See https://stackoverflow.com/questions/3018049/why-does-googles-closure-compiler-leave-a-few-unnecessary-spaces-or-line-breaks
3)  save in RogueRunner_inject.js
*/


/*test websites

https://glebbahmutov.com/disable-inline-javascript-tutorial/index-secure.html
Blocks [script injection] [script inlining] [eval] 
Allows [iframe insertion] [popups]
*/

(function (vers,self,options,cmd) {
    function UUID(){
      return Math.floor(Math.random()*9000000000) + 1000000000+'-'+Date.now();
    }

  // show err
  function showError(/*arguments*/){
    var args = Array.prototype.slice.call( arguments );
    args.unshift("RogueBM[injection]: ");
    console.error.apply(console, args);
      //statusBar.innerHTML=arguments[0]
  }
  var scriptIndex=0;
  function appendToHead(el,callback) {
    //var id='injected_'+UUID()+'_'+scriptIndex;
    //el.id=id;
    //try{
      document.getElementsByTagName('head')[0].appendChild(el);
    //}catch(error){
    //  return false
    //}
    //return !!(document.getElementById(id));
  }

  function ScriptOBJ(src,code,err) { //callback might not work
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    if(src){
      script.setAttribute('src',src);
      script.setAttribute('crossorigin', "anonymous");
      script.onerror = err;
    }else{
      try {
        script.appendChild(document.createTextNode(code));
      } catch (e) { //silent error fallback for shitty browsers
        script.text = code;
      }
    }
        return script;
  }

  function getScriptFromLocalStorageIframe(url,test){
    //start the injection
    var xDLStorage=self['RogueBM']['xDLStorage'];

    xDLStorage['getScript'](url,function(err,payload){
      var errors=0;
      if(err){
        errors=1;
        showError("Error loading script from xDLStorage",error);
      }

      appendToHead(ScriptOBJ(null,payload.data));

      setTimeout(function(){
        if(!test()){
          eval(payload.data);
        }
      },10);
      
      if(url==rogueRunnerSrc){
        setTimeout(function(){
          console.log('doin external probably');
          if(!test()){
            console.log('using iframe embed');
            xDLStorage['convertToInterface']();
          }
        },10);
      }

 

    });
  }


  function loadCrossOriginLocalStorage(){
    //  Use this micro framework to see if the dom is ready
    //some modifications to make it init faster
    //https://github.com/ded/domready
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){var e=[],t,n=typeof document=="object"&&document,r=n&&n.documentElement.doScroll,i="DOMContentLoaded",s=n&&(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return!s&&n&&n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?setTimeout(t,0):e.push(t)}})


    /**
     * @constructor
     */
    var CrossOriginLocalStorage = function(currentWindow, url, allowedOrigins) {
      var self=this;
      var timeout=0; //setTimeout(function(){self.status='blocked';alert('failed to load CrossOriginLocalStorage')},20000);
      var xOriginElement; //could be an iframe or a window
      var preloadQueue=[];
      self.status='loading';
      var doPreloadHandlers = function(){
        clearTimeout(timeout); //don't show error now
        self.status='ready';
        if(!preloadQueue){
          return;
        }
        for(var i=0;i<preloadQueue.length;i++){
              xOriginElement.postMessage(JSON.stringify(preloadQueue[i]), '*'); //TODO fix this security risk
            }
            preloadQueue=null;
          };

      // var url,iframe;
      // if(typeof url == 'string'){
      //  url=url
      // }else{
      //  iframe=url
      // }

      domready(function(){
        var iframe;
        if(!options['forcePopOut']){
          iframe = document.createElement('iframe');
          iframe.addEventListener("load",doPreloadHandlers);
          iframe.onerror=function(){self.status='blocked';};
          iframe.src = url;
          iframe.style.display = "none";
              iframe.style.position = 'absolute'; //ensure no reflow
              document.body.appendChild(iframe);

              //some browser (don't remember which one) throw exception when you try to access
              //contentWindow for the first time, it works when you do that second time
              try {
                xOriginElement = iframe.contentWindow;
              } catch(e) { //silent error, fallback for browsers
                xOriginElement = iframe.contentWindow;
              }
            }
          //TODO
          //use a webworker?
          //https://stackoverflow.com/questions/20410119/cross-domain-web-worker
          //use a socket?
          //use XMLHttpRequest?

          //if the iframe fails use a window
          if(!iframe || !iframe.contentDocument || !xOriginElement){
            xOriginElement = window.open(url.src || url, 'RogueRunner', 'scrollbars=no, width=1, height=1, top=1, left=1');
              //xOriginElement[xOriginElement.addEventListener ? 'addEventListener' : 'attachEvent'](
              //(xOriginElement.attachEvent ? 'on' : '') + 'load', doPreloadHandlers, false)
             if(!xOriginElement || xOriginElement.closed || typeof xOriginElement.closed=='undefined'){
                //alert('popup window blocked') //TODO replace with a model or something nice
                self.status='blocked';
             }
              xOriginElement.blur();
            }
          });

      var messageQueue={};
      var isAllowedOrigin = function (origin) {
        return allowedOrigins.includes(origin);
      };
      var _listener = function (event) {
        console.log('got message',event);
        if (!isAllowedOrigin(event.origin)) {
          console.warn('rejected post message from',event.origin,'Allowed origins are',allowedOrigins, 'you attempted', event);
          return;
        }

        var data=JSON.parse(event.data);
        var err=data.error;
        data.error=null;
        delete data.error;
        if(err){
          showError(err,data,event);
        }
          //debugger
          if(data.ready){
            console.log('doing preload handlers');
            doPreloadHandlers();
            return;
          }

          if(data['messageID']==null){
            console.error('need data.messageID for callbacks to function',event);
            return;
          }


          var handler=messageQueue[data['messageID']];
          if(handler){
            if(handler.method!=handler.method){
              showError('methods do not match. Possible security risk');
              return;
            }
            if(handler.fn){
              handler.fn(err, data, event);
            }
            messageQueue[data.messageID]=null;
            delete messageQueue[data.messageID];
          }else{
            showError('no handler found for ',event['messageID'],event);
          }
        };

      // Support IE8 with attachEvent
      if (currentWindow.addEventListener) {
        currentWindow.addEventListener('message', _listener, false);
      } else {
        currentWindow.attachEvent('onmessage', _listener);
      }

      this['getScript'] = function(url,handler){
        var messageData = {
          method: 'getScript',
          url:url,
        };
        this.postMessage(messageData,handler);
      };

      this['postMessage'] = function(messageData,handler) {
        // var str=new Array(17);
        // for(var i=0;i<15;i++){
        //  var r = Math.random() * 16 | 0;
        //  //v = c == 'x' ? r : (r & 0x3 | 0x8);
        //  str[i]=r.toString(16);
        // }
        // str[15]='-'+Date.now() //put the date on the end to speed up
        //var id=str.join('')

        var id=UUID();

        messageData['messageID']=id;
        messageQueue[id]={fn:handler,method:messageData.method};
        if(preloadQueue != null){
          preloadQueue.push(messageData);
          return;
        }
        xOriginElement.postMessage(JSON.stringify(messageData), '*'); //TODO fix this security risk
      };
      this['convertToInterface']=function(){
        var messageData = {
          method: 'convertToInterface'
        };
        this.postMessage(messageData,function(){alert('now interface');});
      };
    };//end CrossOriginLocalStorage
    self['RogueBM']['CrossOriginLocalStorage']=CrossOriginLocalStorage;

    var allowedOrigins = ['https://ktsuttlemyre.github.io'];
    self['RogueBM']['xDLStorage'] = new CrossOriginLocalStorage(self, 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage' , allowedOrigins);
  }

   ///////FROM ROGUE RUNNER index.js backup loading
   
     //https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
    function PopupCenter(url, title, w, h, systemZoom) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        if(systemZoom==null){
            systemZoom=width / window.screen.availWidth||0;
        }
        console.log(width,w,2,systemZoom,dualScreenLeft);
        var left = (width - w) / 2 / systemZoom + dualScreenLeft;
        var top = 0; //(height - h) / 2 / systemZoom + dualScreenTop;

        var rogueRunnerPopup = window.open(url, title, 'scrollbars=no, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
        //toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, 

        // Puts focus on the rogueRunnerPopup
        if (window.focus) rogueRunnerPopup.focus();
        return rogueRunnerPopup;
    }

    function loadInExternalWindow(){
        var rogueRunnerPopup = PopupCenter('https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html',"RogueRunner",500,200,1);

        if(!rogueRunnerPopup || rogueRunnerPopup.closed || typeof rogueRunnerPopup.closed=='undefined'){
            alert('RogueRunner external window popup blocked');
        }
        
        /*
        var html = ''+
            '<html>'+
                '<head>'+
                    '<script src="https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js"></script>'+
                    '<script>'+
                    'parent.postMessage("a message you didn\'t expect","*");'+
                    '</script>'+
                '</head>'+
                '<body>'+
                '</body>'+
            '</html>';

        
        rogueRunnerPopup.document.open()
        rogueRunnerPopup.document.write(html)
        rogueRunnerPopup.document.close()
        */

    }
    //setTimeout(function(){loadInExternalWindow()},5000)

   ///END OF FROM ROGUERUNNER INJECT index.js backup loading

  var NotLoadedRogueBM=!self['RogueBM'];

  // pollyfill for date.now
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  // set the RogueBM object
  var RogueBM=self['RogueBM']=(self['RogueBM'] || {}); //in block notation so closure compiler will 'export' the vairable
  RogueBM['lastCMD']=function(){return cmd;};
  if(RogueBM['show']){
    //if crossorignlocal storage not loaded then load it
    if(!RogueBM['CrossOriginLocalStorage']){
      loadCrossOriginLocalStorage();
    }
    if(!cmd){ //if we have a command then don't show the interface just do the command
      RogueBM['show']();
    }
  }

  //inject the rogue runner dialog
  var doc=document.documentElement;
  var skin=options['skin'];
  skin=( (("all" in doc.style) || ("cssall" in doc.style)) && ( !!skin != false) )?'_'+skin:'';
  var rogueRunnerSrc='https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src'+skin+'.js?user='+options['user'];
  if(cmd){
    rogueRunnerSrc+='&cmd='+cmd;
  }
  function injectRogueRunner(){
    injectScript('https://ktsuttlemyre.github.io/RogueBookmarklets/index.js?user='+options['user'],sessionID,function(){return window['RogueBM']['scripts']});
    injectScript(rogueRunnerSrc,sessionID,function(){return window['RogueBM']['loaded']});
  }

  function injectScript(src,token,test){
    /*low level injection script. 
    Use RogueBookmarklet.loadScript for more reliable script loading
    */
    if(token != sessionID){
      console.error('RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url',src);
      return 1;
    }

    if(options['forceIframeInjecting']){
      // use this to test script injection failures to load
      setTimeout(function(){getScriptFromLocalStorageIframe(src,test);},1);
    }else{
      appendToHead(ScriptOBJ(src,null,function(err){getScriptFromLocalStorageIframe(src,test);}));
    }
    return 0;
  }

    //a bit of security 
    var sessionID=UUID();

    injectRogueRunner();
   
    loadCrossOriginLocalStorage();


    //expose helper functions
    RogueBM['injectScript']=injectScript; //helper function for loading external scripts (//TODO maybe remove this? make it more difficult?)
    RogueBM['getSessionID']=function(){
      prompt('Copy the session id below to use in protected RogueBM[injector] calls',sessionID);
    };
    RogueBM['about']={'injector':{'revision':'{{ site.github.build_revision }}','version':vers}};

    var externalWindowString="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=300,top="+(screen.height-800)+",left="+(screen.width-300);
    RogueBM.open=function(url){
        var win = window.open(url, '_blank', externalWindowString);
    };
})('0.0.1',window,{'user':'anonymous','skin':'experimental','forceIframeInjecting':false} /*,cmd*/);
