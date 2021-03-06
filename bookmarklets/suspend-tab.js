window.RogueBM.loadScript('https://html2canvas.hertzen.com/dist/html2canvas.js','javascript',function(err){
	 if(err){
	   console.error(err)
	   return
	 }
	
	
	function setURL(title,location,image,e){
		var str=redirectURL+'#?t='+encodeURIComponent(title)+'&l='+encodeURIComponent(location)+'&i='+encodeURIComponent(image)+'&e='+encodeURIComponent(e);
		window.location.href=str;
	}
	var options={showPreview:true};
	var storageURL=/^http.?:\/\/(ktsuttlemyre\.github\.io|rogueware\.com)\/RogueBookmarklets\/SuspendTab/g;
	var l=window.location.href; //'https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab.html';
	var redirectURL='https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab';

	if(!storageURL.test(l)){ //if this isn't the suspend page then suspend this page
		if(options.showPreview){
			//hide RogueBM if it exists
			window['RogueBM'] && window['RogueBM']['hide'] && window['RogueBM']['hide']();
			//TODO scale image down to "compress"
			//https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas
			html2canvas(document.body,{ignoreElements: function (node) {
				return node.nodeName === 'IFRAME';
			    }}).then(function(canvas) {
				var width = window.innerWidth
					|| document.documentElement.clientWidth
					|| document.body.clientWidth;

				var height = window.innerHeight
					|| document.documentElement.clientHeight
					|| document.body.clientHeight;

				var scrollPosition=window.scrollY
					|| window.scrollTop
					||document.documentElement.scrollTop
					|| document.body.scrollTop
					|| window.pageYOffset
					||document.getElementsByTagName("html")[0].scrollTop;
				
				//document.body.appendChild(canvas);
				//crop html2canvas
				//https://stackoverflow.com/questions/13073647/crop-canvas-export-html5-canvas-with-certain-width-and-height
				// canvas context
				var context = canvas.getContext("2d");
				// get the current ImageData for the canvas
				var data = context.getImageData(0, scrollPosition, canvas.width, canvas.height);
				// store the current globalCompositeOperation
				var compositeOperation = context.globalCompositeOperation;
				// set to draw behind current content
				context.globalCompositeOperation = "destination-over";
				// draw background/rectangle on entire canvas
				context.fillRect(0,0,canvas.width,canvas.height);

				var tempCanvas = document.createElement("canvas"),
					tCtx = tempCanvas.getContext("2d");

				tempCanvas.width = width;
				tempCanvas.height = height;

				tCtx.drawImage(canvas,0,0);

				//tempCanvas now has your cropped image!

				//https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
				//var saved = tempCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
				//window.location.href=saved; // it will save locally
				setURL(document.title,l,tempCanvas.toDataURL("image/png"))
			}).catch(function(e) {
				console.log(e);
				var obj={}
				obj.name=e.name;
				obj.stack=e.stack;
				obj.message=e.message;
				setURL(document.title,l,null,JSON.stringify(obj));
			});
			return;
		}
		setURL(document.title,l);
	}else{
		window['SuspendTab']['unsuspend']();
	}
});
