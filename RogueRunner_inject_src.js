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


(function (vers,self,user,skin,cmd) {
	function UUID(){
		return Math.floor(Math.random()*9000000000) + 1000000000+'-'+Date.now();
	}


	// show err
	function showError(message){
		//statusBar.innerHTML=message
		var args = Array.prototype.slice.call( arguments );
		args.unshift("RogueBM[injection]: ");
		console.error.apply(console, args);
	}

	function appendToHead(el,callback) {
		document.getElementsByTagName('head')[0].appendChild(el);
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

	function getScriptFromLocalStorageIframe(url,err){
		//start the injection
		var xDLStorage=self['RogueBM']['xDLStorage'];
		if(!xDLStorage){
			showError('Error injecting '+url,' xDLStorage isn\'t loaded as a backup either',err);
		}

		xDLStorage['getScript'](url,function(payload){
			payload.error && showError("Error loading script from xDLStorage",payload.error);
			try{
				appendToHead(ScriptOBJ(null,payload.data));
			}catch(e){
				eval(payload);
			}
		});
	}


	function loadCrossOriginLocalStorage(){
		//  Use this micro framework to see if the dom is ready
		//some modifications to make it init faster
		//https://github.com/ded/domready
		var domready = (function() {
			var e = [],
				t, n = typeof document == "object" && document,
				r = n && n.documentElement.doScroll,
				i = "DOMContentLoaded",
				s = n && (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
			return !s && n && n.addEventListener(i, t = function() {
					n.removeEventListener(i, t), s = 1;
					while (t = e.shift()) t();
				}),
				function(t) {
					s ? setTimeout(t, 0) : e.push(t);
				};
		})();

		/**
		 * @constructor
		 */
		var CrossOriginLocalStorage = function(currentWindow, url, allowedOrigins) {
			var xOriginElement; //could be an iframe or a window
			var preloadQueue=[];
			var doPreloadHandlers = function(){
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
			// 	url=url
			// }else{
			// 	iframe=url
			// }

			domready(function(){
				var forcePopOut=false;
        var iframe;
				if(!forcePopOut){
					iframe = document.createElement('iframe');
					iframe.addEventListener("load",doPreloadHandlers);
					iframe.onerror=function(){alert('yeeeet');};
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
				if(data.error){
					showError(data.error,event);
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
					handler.fn && handler.fn(data, event);
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
				// 	var r = Math.random() * 16 | 0;
				// 	//v = c == 'x' ? r : (r & 0x3 | 0x8);
				// 	str[i]=r.toString(16);
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
		};
		self['RogueBM']['CrossOriginLocalStorage']= CrossOriginLocalStorage;

		var allowedOrigins = ['https://ktsuttlemyre.github.io'];
		self['RogueBM']['xDLStorage'] = new CrossOriginLocalStorage(self, 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html' , allowedOrigins);
	}

	



	var NotLoadedRogueBM=!self['RogueBM'];

	// pollyfill for date.now
	if (!Date.now) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

		// set the RogueBM object
	self['RogueBM']=self['RogueBM'] || {}; //in block notation so closure compiler will 'export' the vairable
	self['RogueBM'].cmd=cmd;
	if(window['RogueBM']['show']){
		//if crossorignlocal storage not loaded then load it
    if(!self['RogueBM']['CrossOriginLocalStorage']){
      loadCrossOriginLocalStorage();
    }
    if(!cmd){
      window['RogueBM']['show']();
    }

	}


	function injectScript(src,token){
		/*low level injection script. 
		Use RogueBookmarklet.loadScript for more reliable script loading
		*/
		if(sessionID!=token){
			console.error('sessionID either not correct or not provided. Will not load this url',src)
			return 1
		}
		appendToHead(ScriptOBJ(src,null,function(err){getScriptFromLocalStorageIframe(src,err);}));
		return 0
	}

	//a bit of security 
	var sessionID=UUID();
	var forceIframe=true;
	//inject the rogue runner dialog
	var doc=document.documentElement;
	skin=(skin != null && (("all" in doc.style) || ("cssall" in doc.style)) )?'_'+skin:'';
	var src='https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src'+skin+'.js?user='+user+'&cmd='+cmd;


	window['RogueBM']['injectScript']=injectScript //helper function for loading external scripts (//TODO maybe remove this? make it more difficult?)
	window['RogueBM']['getSessionID']=function(){prompt('Copy the session id below to use in protected RogueBM[injector] calls',sessionID)}
	window['RogueBM']['about']={'injector':{'revision':'{{ site.github.build_revision }}','version':vers}}
	
	if(forceIframe){
		// use this to test script injection failures to load
		setTimeout(function(){getScriptFromLocalStorageIframe(src);},1);
	}else{
		injectScript(src,forceIframe,sessionID);
	}
	loadCrossOriginLocalStorage();
})('0.0.1',window,'anonymous','experimental');
