(function (self,user) {
	var NotLoadedRogueBM=!self['RogueBM'];

	if (!Date.now) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

	self['RogueBM']=self['RogueBM'] || {} //in block notation so closure compiler will 'export' the vairable
	if(window['RogueBM']['show']){
		!self['RogueBM']['CrossOriginLocalStorage'] && loadCrossOriginLocalStorage()
		return window['RogueBM']['show']()
	}



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
            } catch (err) { //silent error fallback for shitty browsers
                script.text = code;
            }
        }
        return script
    }

	function loadFromIframe(url,err){
		//start the injection
		var xDLStorage=self['RogueBM']['xDLStorage']
		if(!xDLStorage){
			showError('Error injecting '+url,' xDLStorage isn\'t loaded as a backup either',err)
		}
		xDLStorage.getScript(url,function(payload){
			payload.error && showError("Error loading script from xDLStorage",payload.error)
		
			appendToHead(ScriptOBJ(null,payload.data));
		})
	}

	//start the injection
	appendToHead(ScriptOBJ('https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js?user='+user,null,function(err){loadFromIframe(s.src,err)}))
	
	// use this to test script injection failures to load
	//setTimeout(function(){loadFromIframe()},1);
	

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
					while (t = e.shift()) t()
				}),
				function(t) {
					s ? setTimeout(t, 0) : e.push(t)
				}
		})();

		/**
		 * @constructor
		 */
		var CrossOriginLocalStorage = function(currentWindow, urlORiframe, allowedOrigins) {

			var childWindow;

			var preloadQueue=[]
			var doPreloadHandlers = function(){
				for(var i=0;i<preloadQueue.length;i++){
					childWindow.postMessage(JSON.stringify(preloadQueue[i]), '*'); //TODO fix this security risk
				}
				preloadQueue=null
			}

			// var url,iframe;
			// if(typeof urlORiframe == 'string'){
			// 	url=urlORiframe
			// }else{
			// 	iframe=urlORiframe
			// }

			domready(function(){
				var iframe = document.createElement('iframe');
				iframe.style.display = "none";
				iframe.style.position = 'absolute'; //ensure no reflow
				iframe.addEventListener("load",doPreloadHandlers)
				iframe.src = urlORiframe;
				document.body.appendChild(iframe);

				// some browser (don't remember which one) throw exception when you try to access
				// contentWindow for the first time, it works when you do that second time
				try {
					childWindow = iframe.contentWindow;
				} catch(e) { //silent error, fallback for browsers
					childWindow = iframe.contentWindow;
				}

			})

			var messageQueue={};

			var isAllowedOrigin = function (origin) {
				return allowedOrigins.includes(origin);
			}
			var _listener = function (event) {
				if (!isAllowedOrigin(event.origin)) {
					showError('rejected post message from',event.origin,'Allowed origins are',allowedOrigins)
					return;
				}

				var data=JSON.parse(event.data)
				if(data.error){
					showError(data.error,event)
				}

				if(data.messageID==null){
					showError('need data.messageID for callbacks to function',event)
					return
				}

				var handler=messageQueue[data.messageID]
				if(handler){
					if(handler.method!=handler.method){
						showError('methods do not match. Possible security risk')
						return
					}
					handler.fn && handler.fn(data, event);
					messageQueue[data.messageID]=null
					delete messageQueue[data.messageID]
				}else{
					showError('no handler found for ',event.messageID,event)
				}
			};

			// Support IE8 with attachEvent
			if (currentWindow.addEventListener) {
				currentWindow.addEventListener('message', _listener, false);
			} else {
				currentWindow.attachEvent('onmessage', _listener);
			}

			this.getScript = function(url,handler){
				var messageData = {
					method: 'getScript',
					url:url,
				}
				this.postMessage(messageData,handler);
			}

			this.postMessage = function(messageData,handler) {
				var str=new Array(17);
				for(var i=0;i<15;i++){
					var r = Math.random() * 16 | 0;
					//v = c == 'x' ? r : (r & 0x3 | 0x8);
					str[i]=r.toString(16);
				}
				str[15]='-'
				str[16]=Date.now() //put the date on the end to speed up 
				var id=str.join('')

				messageData.messageID=id
				messageQueue[id]={fn:handler,method:messageData.method}
				if(preloadQueue != null){
					preloadQueue.push(messageData)
					return
				}
				childWindow.postMessage(JSON.stringify(messageData), '*'); //TODO fix this security risk
			}
		};
		self['RogueBM']['CrossOriginLocalStorage']= CrossOriginLocalStorage;

		var allowedOrigins = ['https://ktsuttlemyre.github.io'];
		self['RogueBM']['xDLStorage'] = new CrossOriginLocalStorage(self, 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner.html' , allowedOrigins);
	}
	loadCrossOriginLocalStorage()

})(window,'anonymous')
