// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==
//for warning supression info see
//https://github.com/google/closure-compiler/wiki/@suppress-annotations

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

(function (window,document,console,setTimeout,vers,options,cmd,undefined) {
    // pollyfill for date.now
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  //options include
  //forceIframeInject = defaults false will force iframe injection only
  //options['forcePopOut'] = forces popout
  //skin = look and feel of roguerunner
  //user = your user name preferences on the server (if there is going to be one)[currently not used]
   //this helps support search engine features in browsers that use %s as a string replace to insert searches from the browsers location bar
    if(cmd ==  String.fromCharCode(37,115)){ //purposely convoluted so %s doesn't get replaced here as well
      cmd=''; //if %s comes through then remove it
    }
    function UUID(){
      return Math.floor(Math.random()*9.0e10 ) + 9.0e10+'-'+Date.now();
    }

  // show err
  function showError(/*arguments*/){
    var args = Array.prototype.slice.call( arguments );
    if(args.length){
      args.unshift("RogueBM[injection]: ");
      console.error.apply(console, args);
        //statusBar.innerHTML=arguments[0]
    }
  }


  var Fallback={
    popup:function(url,data,test,callback){
      loadInExternalWindow();
      callback && callback.call && callback();
    },
    iframe:function(url,test,callback){
      //actually, if you are roguerunner lets try to open in iframe or external window
      if(url===rogueRunnerSrc){ //roguerunner is a special case and gets a window attempt
        console.log('using iframe embed for RogueRunner only');
        var tester=Tester(url,test,callback,'popup');
        xDLStorage['convertToInterface'](tester);
        setTimeout(tester,1);
      }
    },
    ajax:function(url,test,callback){
        var tester=Tester(url,test,callback,'iframe');
        ajax(url,tester);
        setTimeout(tester,1);
      },
    localstorage:function(url,test,callback){
      //start the injection
      var tester = Tester(url,test,callback,'ajax');
      window['RogueBM']['xDLStorage']['getScript'](url,function(err,payload){
        if(err){
          showError("Error loading script from xDLStorage",err);
        }
        tester(err,payload && payload.data);
        // if(err){
        //   Fallback['ajax'](url,test,callback);
        //   return
        // }
        // //use xiframe to get script.
        // ScriptOBJ(false,payload.data,test,callback,'ajax');
      });
      setTimeout(tester,1);
    }
  };


  function Tester(url,test,callback,fallback){
      //if injection via script.src has already failed. this is an inline attempt
      //next we try a new Function()
      //next we try eval
      //finally if you are roguerunner.js we will try to use the xDLStorage iframe OR an external popup to display roguerunner
      var limit=100,
        to=100, //100*100=10 seconds
        failedCount=0,
        success=false;
      function check(err,data){
        if(success){
          return;
        }
        if(test()){
          success=true;
          window['RogueBM']['loaded'](url);
          callback && callback.call && callback();
          return;
        }
        if(err || failedCount++>=limit){
          if(fallback){
            return setTimeout(function(){
              var fb=Fallback[fallback](url,test,callback);
              //return (data)?fb(null,data):fb();
            },1);
          }
          return callback && setTimeout(function(){callback('error:inlining failed');},1);
        }
        
  
        if(data){
          failedCount=limit;
          setTimeout(function(){
            if(!test()){
              ScriptOBJ(null,data);
            }
          },1);
          //TODO INLINE SCRIPT HERE
          //test to see if it executed. if not then try new Function
          setTimeout(function(){
            if(!test()){
              new Function(data)();
            }
          },1); //need to do this because the whole tick is cancled when CSP blocks javascript execution
          
          
          //test to see if it executed. if not then try eval and end
          setTimeout(function(){
            if(!test()){
              eval(data);
            }
          },1); //need to do this because the whole tick is cancled when CSP blocks javascript execution
        }
        setTimeout(check,to);
      }
     return check;
  }

  var scriptIndex=0;
  function ScriptOBJ(url,inline,callback) { //callback might not work

    callback=(callback && callback.call)?callback:function(err){showError(err);};

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.id='injected_'+UUID()+'_'+scriptIndex++;
    if(!inline){
      script.setAttribute('src',url);
      script.setAttribute('crossorigin', "anonymous");
      script.onerror = callback;
      script.onload = callback;
      setTimeout(callback,1);
    }else{
      try {
        script.appendChild(document.createTextNode(inline));
      } catch (e) { //silent error fallback for shitty browsers
        script.text = inline;
        setTimeout(function(){callback(null,inline);},1);
      }
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    return script;
  }



    function ajax(url,callback){
        var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200||xhr.status==0){
                    callback(null,xhr.responseText);
                }else{
                    callback(xhr.status); //error
                }
            }
        };
        try{
          xhr.open("GET",url,true);
          xhr.send();
        }catch(e){
            callback(e); //error
        }  
    }






  function loadCrossOriginLocalStorage(){
    //  Use this micro framework to see if the dom is ready
    //some modifications to make it init faster
    //https://github.com/ded/domready
    window.domready=(function() {
      var e = [], t, n = document, r = n.documentElement.doScroll, i = "DOMContentLoaded", s = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
      return !s && n.addEventListener(i, t = function() {
        n.removeEventListener(i, t), s = 1;
        while (t = e.shift()) {
          t();
        }
      }), function(t) {
        s ? setTimeout(t, 0) : e.push(t);
      };
    })();
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
        var iframe,iframeStyle,popup;
      window.domready(function(){

        if(!options['forcePopOut']){
          iframe = document.createElement('iframe');
          iframe.addEventListener("load",doPreloadHandlers);
          iframe.onerror=function(){self.status='blocked';};
           
          //make transparent
          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency="true"; 
           
          iframe.src = url;
          iframeStyle=iframe.style;
          iframeStyle.display = "none";
              iframeStyle.position = 'absolute'; //ensure no reflow
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
            iframe=null;
            popup=window.open(url.src || url, 'RogueRunner', 'scrollbars=no, width=1, height=1, top=1, left=1');
            xOriginElement = popup;
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

        var data=null;
        try{
          data=JSON.parse(event.data);
        }catch(error1){
          data=event.data;
          if(data=='RogueRunner:Blur'){
            iframeStyle.display='none';
          }
          return;
        }
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
            messageQueue[data['messageID']]=null;
            delete messageQueue[data['messageID']];
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
        this['postMessage'](messageData,handler);
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
        this['postMessage'](messageData,function(err,payload){
          if(payload.data){
            if(iframe){
              iframeStyle.width=iframeStyle.height="100%";
              iframeStyle.display="block";
              iframeStyle.position='absolute';
              iframeStyle.bottom=iframeStyle.right='0';
              iframeStyle.border= '0';
              window['RogueBM']['show']=function(){iframeStyle.display="block";};

              //set up hotkey to show/hide
              document.addEventListener('keyup', function doc_keyUp(e) {
                  // this would test for ~ and the ctrl key at the same time
                  if (e.ctrlKey && e.keyCode == 192) {
                      // call your function to do the thing
                      window['RogueBM']['show']();
                  }
              }, false);
            }
            if(popup){
              alert('not implemented yet');
            }
          }
        });
      };
    };//end CrossOriginLocalStorage
    window['RogueBM']['CrossOriginLocalStorage']=CrossOriginLocalStorage;

    var allowedOrigins = ['https://ktsuttlemyre.github.io'];
    window['RogueBM']['xDLStorage'] = new CrossOriginLocalStorage(window, 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html#localstorage' , allowedOrigins);
  }

   ///////FROM ROGUE RUNNER index.js backup loading
   
     //https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
    function PopupCenter(url, title, w, h, systemZoom) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft ||  window.screenX ||0;
        var dualScreenTop = window.screenTop || window.screenY ||0;

        var width = window.innerWidth || document.documentElement.clientWidth || screen.width ||0;
        var height = window.innerHeight || document.documentElement.clientHeight || screen.height ||0;

        if(systemZoom==null){
            systemZoom=width / window.screen.availWidth||1;
        }
        //console.log(width,w,2,systemZoom,dualScreenLeft);
        var left = (width - w) / 2 / systemZoom + dualScreenLeft;
        var top = 0; //(height - h) / 2 / systemZoom + dualScreenTop;

        var rogueRunnerPopup = window.open(url, title, 'scrollbars=no, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
        //toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, 

        // Puts focus on the rogueRunnerPopup
        if (rogueRunnerPopup.focus){rogueRunnerPopup.focus();}
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

  var NotLoadedRogueBM=!window['RogueBM'];



  // set the RogueBM object
  var RogueBM=window['RogueBM']=(window['RogueBM'] || {}); //in block notation so closure compiler will 'export' the vairable
  RogueBM['lastCMD']=cmd;
  if(RogueBM['show']){
    //if crossorignlocal storage not loaded then load it
    if(!RogueBM['CrossOriginLocalStorage']){
      loadCrossOriginLocalStorage();
    }
    if(!cmd){ //if we have a command then don't show the interface just do the command
      RogueBM['show']();
    }
    return;
  }

  //inject the rogue runner dialog
  var baseURL='https://ktsuttlemyre.github.io/RogueBookmarklets/';
  var doc=document.documentElement;
  var skin=options['skin'];
  skin=( (("all" in doc.style) || ("cssall" in doc.style)) && ( !!skin != false) )?'_'+skin:'';
  var rogueRunnerSrc=baseURL+'RogueRunner_src'+skin+'.js?user='+encodeURIComponent(options['user']);
  if(cmd){
    rogueRunnerSrc+='&cmd='+encodeURIComponent(cmd);
  }


  function injectScript(src,token,test){
    /*low level injection script. 
    Use RogueBookmarklet.loadScript for more reliable script loading
    */
    if(token != sessionID){
      console.error('RogueRunner[injector]: sessionID either not correct or not provided. Will not load this url',src);
      return 1;
    }

    var tester=Tester(src,test,function(){console.log('####complete#####');},'localstorage');

    if(options['forceIframeInject']){
      // use this to test script injection failures to load force an error
      setTimeout(function(){tester('forced error');},1);
    }else{
      ScriptOBJ(src,false,tester);
    }

  
    return 0;
  }


    var initScripts=['RogueRunner.js','index.js','js-yaml.min.js'];
    var loadedScripts=[];
    window['RogueBM']['loaded']=function(name,secret){
        console.log('loaded',name);
        var name=name.split('/').pop();
        loadedScripts.push(name);
        initScripts=initScripts.filter(function (elem) {
            return elem!=name;
        })
        
        !initScripts.length && window['RogueBM']['init']();
    }




    //a bit of security 
    var sessionID=UUID();
    loadCrossOriginLocalStorage();
  
    injectScript(baseURL+'libs/js-yaml.min.js',sessionID,function(){return window['jsyaml'];});
    injectScript(baseURL+'index.js'/*?user='+options['user']*/,sessionID,function(){return window['RogueBM']['scripts'];});
    injectScript(rogueRunnerSrc,sessionID,function(){return window['RogueBM']['loaded'];});
   


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
})(this,document,console,setTimeout,'0.0.1',{'user':'anonymous','skin':'experimental'},'%s');
