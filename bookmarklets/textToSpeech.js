//https://github.com/ejucovy/readability

(function() {
	var voice={}

	var domready=(function(){var e=[],t,n=typeof document=="object"&&document,r=n&&n.documentElement.doScroll,i="DOMContentLoaded",s=n&&(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return!s&&n&&n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?setTimeout(t,0):e.push(t)}})()
	readConvertLinksToFootnotes = false;
	readStyle = 'style-athelas';
	readSize = 'size-medium';
	readMargin = 'margin-wide';
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://ejucovy.github.io/readability/js/readability.js?x=' + (Math.random());
	document.documentElement.appendChild(script);
	css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = 'https://ejucovy.github.io/readability/css/readability.css?1';
	css.type = 'text/css';
	css.media = 'all';
	document.documentElement.appendChild(css);
	print_css = document.createElement('link');
	print_css.rel = 'stylesheet';
	print_css.href = 'https://ejucovy.github.io/readability/css/readability-print.css';
	print_css.media = 'print';
	print_css.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(print_css);

	
	var main=function(){
		var theDiv = document.getElementById("readTools");

		var link = document.createElement('a')
		link.appendChild(document.createTextNode("Play/Pause"));
		link.title="Play/Pause"
		link.href="#"
		link.id="play_pause"
		//link.style="text-indent:0"
		link.onclick=function(e){
			e.preventDefault();
			if(!window.speechSynthesis.speaking){
				speakIt(0)
				return
			}
			if(window.speechSynthesis.paused){
				window.speechSynthesis.resume()
			}else{
				window.speechSynthesis.pause()
			}
		}
		theDiv.appendChild(link);

		link = document.createElement('a')
		link.appendChild(document.createTextNode("Next"));
		link.title="Next"
		link.href="#"
		link.id="next"
		//link.style="text-indent:0"
		link.onclick=function(e){
			e.preventDefault();
			voice.onEnd()
		}
		theDiv.appendChild(link);

		function makeSpans(text){
			return text.replace(/\u00a0/g, " ").replace(/(^|<\/?[^>]+>|\s+)([^\s\.\,<]+)/g, '$1<span class="word">$2</span>');
		}


		function textNodeArray(node){
		    var A= [];
		    if(node){
		        node= node.firstChild;
		        while(node!= null){
		            if(node.nodeType== 3) A[A.length]=node;
		            else A= A.concat(textNodeArray(node));
		            node= node.nextSibling;
		        }
		    }
		    return A;
		}


		function wrapTextInSpans(el){
			  var spans=[],text=''
			  var n, nodeList=textNodeArray(el)
			  for(var i=0;i<nodeList.length;i++){
			  	n=nodeList[i]
			  	text+=n.nodeValue

			  	frag = document.createRange().createContextualFragment(makeSpans(n.nodeValue));
			  	console.warn(frag.children)
			  	spans.push.apply(spans,frag.children);
			  	n.parentNode.insertBefore(frag,n)
			  	
			  	n.parentNode.removeChild(n)
			  }
			  return {spans:spans,text:text}
		}

		var i;
		function speakIt(p){
			if(typeof p == 'number'){
				i=p;
				p=document.querySelectorAll('p,li')[i++]
			}
			console.log('reading',p)
			if(!p){return}

			var j=0

			var val = wrapTextInSpans(p)
			var spans=val.spans
			var text=val.text

		 	voice.onEnd=function(event) {
		 		var node = spans[j]
				if(node){
					(node.style.backgroundColor='')
				}
				p.style.backgroundColor = "";


				var item = document.querySelectorAll('p,li')[i++]
			  	speakIt(item)
			}

			if(text){
				//p.innerHTML=spans
				//spans = p.children
				var node = spans[j]
				//console.log('word',node)
				if(node){
					(node.style.backgroundColor='#f6b73c')
				}
				var to_speak = new SpeechSynthesisUtterance(text);
				to_speak.addEventListener('end',voice.onEnd);

				to_speak.addEventListener('boundary', function(event) { 
				  if(event.name != 'word' ) {
				  	return
				  }
				  node=spans[j]
				  if(node){
				  	(node.style.backgroundColor='')
				  }
				  node=spans[++j]
				  if(node){
				  	node.style.backgroundColor='#f6b73c'
				  }
				});
				p.style.backgroundColor = "#fff3d7";
				window.speechSynthesis.cancel()
				window.speechSynthesis.speak(to_speak);
			}else{
				voice.onEnd()
			}
		}

		speakIt(0)
	}
	domready(setTimeout(main,1000))
})()





//readability score
//https://accessibility.oit.ncsu.edu/tools/readability/
//javascript:%20(function()%7Bvar%20yourURL=(window.location.protocol=='http:'?'https://webapps.ncsu.edu/accessibility-readability/readability.php':'https://webapps.ncsu.edu/accessibility-readability/readability.php');function%20getScript(url,success)%7Bvar%20script=document.createElement('script');script.src=url;var%20head=document.getElementsByTagName('head')%5B0%5D,done=false;script.onload=script.onreadystatechange=function()%7Bif(!done&&(!this.readyState%7C%7Cthis.readyState=='loaded'%7C%7Cthis.readyState=='complete'))%7Bdone=true;success();script.onload=script.onreadystatechange=null;head.removeChild(script);%7D%7D;head.appendChild(script);%7D%20getScript(yourURL,function()%7B%7D);%7D)();