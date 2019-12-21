(function (self,user) {
	//start the injection
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js?user='+user);
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('crossorigin', "anonymous");
	s.onerror = function(a){alert('RogueBookmarks:Error loading \n '+a)}
	document.getElementsByTagName('head')[0].appendChild(s);


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

function uuidv4(format) {
	if(!format){
		format='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
	}
	return format.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	return v.toString(16);
	});
}

/**
 * @constructor
 */
	var CrossOriginLocalStorage = function(currentWindow, iframe, allowedOrigins) {

		var childWindow;
		// some browser (don't remember which one) throw exception when you try to access
		// contentWindow for the first time, it works when you do that second time
		try {
			childWindow = iframe.contentWindow;
		} catch(e) {
			childWindow = iframe.contentWindow;
		}

		var messageQueue={};

		var _listener=this._listener = function (event) {
			if (!isAllowedOrigin(event.origin)) {
				console.error('Injector rejected post message from',event.origin,'Allowed origins are',allowedOrigins)
				return;
			}

			var data=JSON.parse(event.data)
			var handler=messageQueue[data.messageID]
			if(handler){
				if(handler.method!=handler.method){
					console.error('methods do not match. Possible security risk')
					return
				}

				handler.fn(data, event);
				messageQueue[data.messageID]=null
				delete messageQueue[data.messageID]
			}else{
				console.error('no handler found for ',event.messageID)
			}
		};

		// Support IE8 with attachEvent
		if (currentWindow.addEventListener) {
			currentWindow.addEventListener('message', _listener, false);
		} else {
			currentWindow.attachEvent('onmessage', _listener);
		}


		var isAllowedOrigin = function (origin) {
			return allowedOrigins.includes(origin);
		}

		var getData = this.getData = function (key,handler) {
			var id=uuidv4()
			messageData = {
				key: key,
				method: 'get',
				messageID:id
			}
			messageQueue[id]={fn:handler,method:messageData.method}
			postMessage(messageData);
		}

		var setData = this.setData = function(key, data) {
			messageData = {
				key: key,
				method: 'set',
				data: data,
			}
			messageQueue[id]={fn:handler,method:messageData.method}
			postMessage(messageData);
		}

		var postMessage=this.postMessage = function(messageData) {
			childWindow.postMessage(JSON.stringify(messageData), '*');
		}
	};


	var allowedOrigins = ['https://ktsuttlemyre.github.io'];
	domready(function() {
		var iframe = document.createElement('iframe');
		iframe.style.display = "none";

		iframe.addEventListener("load", function() {
			var onMessage = function(payload, event) {
				console.log('inject got',payload,event)
				var data = payload.data;
				switch (payload.method) {
					case 'storage#get':
						console.log('message data', payload);
						break;
					default:
						console.error('Unknown method "' + payload.method + '"', payload);
					}
			};
			var cross = self['RogueBookmarklets']['cross'] = new CrossOriginLocalStorage(self, iframe, allowedOrigins);
			cross.setData('name', 'buren')
			cross.getData('name',onMessage)
		});

		iframe.src = 'https://ktsuttlemyre.github.io/RogueBookmarklets/LocalStorage.html' 
		document.body.appendChild(iframe);


	});

	self['RogueBookmarklets']=self['RogueBookmarklets'] || {} //in block notation so closure compiler will 'export' the vairable
})(window,'anonymous')
