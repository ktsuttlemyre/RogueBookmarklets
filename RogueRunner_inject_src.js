(function (self,user) {
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



	CrossOriginLocalStorage = function(currentWindow, iframe, allowedOrigins, onMessage) {
		this.allowedOrigins = allowedOrigins;

		var childWindow;
		// some browser (don't remember which one) throw exception when you try to access
		// contentWindow for the first time, it works when you do that second time
		try {
			childWindow = iframe.contentWindow;
		} catch(e) {
			childWindow = iframe.contentWindow;
		}

		this._listener = function (event) {
			if (!this.isAllowedOrigin(event.origin)) {
				return;
			}

			return onMessage(JSON.parse(event.data), event);
		};

		// Support IE8 with attachEvent
		if (currentWindow.addEventListener) {
			currentWindow.addEventListener('message', this._listener, false);
		} else {
			currentWindow.attachEvent('onmessage', this._listener);
		}


		this.isAllowedOrigin = function (origin) {
			return this.allowedOrigins.includes(origin);
		}

		this.getData = function (key) {
			messageData = {
				key: key,
				method: 'get',
			}
			this.postMessage(messageData);
		}

		this.setData = function(key, data) {
			messageData = {
				key: key,
				method: 'set',
				data: data,
			}
			this.postMessage(messageData);
		}

		this.postMessage = function(messageData) {
			childWindow.postMessage(JSON.stringify(messageData), '*');
		}
	};


	var allowedOrigins = ['https://ktsuttlemyre.github.io/RogueBookmarklets/'];
	domready(function() {
		var iframe = document.createElement('iframe');
		iframe.style.display = "none";
		iframe.src = 'https://ktsuttlemyre.github.io/RogueBookmarklets/LocalStorage.html' 
		document.body.appendChild(iframe);

		var onMessage = function(payload, event) {
			var data = payload.data;
			switch (payload.method) {
			case 'storage#get':
				console.log('message data', payload);
				break;
			default:
				console.error('Unknown method "' + payload.method + '"', payload);
			}
		};
		var cross = new CrossOriginLocalStorage(window, iframe, allowedOrigins, onMessage);
		cross.setData('name', 'buren')
		cross.getData('name')
	});



	var s = document.createElement('script');
	s.setAttribute('src', 'https://ktsuttlemyre.github.io/RogueBookmarklets/RogueRunner_src.js?user='+user);
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('crossorigin', "anonymous");
	s.onerror = function(a){alert('RogueBookmarks:Error loading \n '+a)}
	document.getElementsByTagName('head')[0].appendChild(s);
	self.RogueBookmarks=self.RogueBookmarks || {}
})(window,'anonymous')
