(function(window, document, undefined) {
	var selectedText = document.getSelection().toString();
	if (selectedText === '') {
		selectedText = window.location.href;
	}
		//var initSrc= "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(window);
		var html=''+
			'<html>'+
			'<head>'+
			'<style>'+
			'html, body {overflow: hidden; scrollbar-width: none;}'+
			'::-webkit-scrollbar {display: none;}'+
			'</style>'+
			'</head>'+
			'<body style="padding:0;margin:0;background:black" >'+ //onclick="window.close()"
			//'<div id="qrCode">'+
			'<input id="input" type="text" style="margin:0 auto; display:block; width:90%;" oninput="generateQR()" value="'+selectedText+'"></input>'+
			'<img id="qr" style="margin:1em auto; display:block;" alt="QR code" src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + encodeURIComponent(selectedText)+'">'+
			//'</div>'+
			'<script>'+
			//'window.addEventListener("message",function(e) { '+
			//'alert(e.data);'+
			//'}, false);'+
			'var img = document.getElementById("qr"),'+
			' d = document.documentElement,'+
			' b = document.body,'+
			' input = document.getElementById("input");'+
			'function generateQR(){img.src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(input.value);}'+
			'generateQR();'+
			'img.onload=function(){'+
			'setTimeout(function(){'+
			//'var box = document.getElementById("qrCode");'+
			'var dim=function(x){return Math.max(d["client"+x],b["scroll"+x],d["scroll"+x],b["offset"+x],d["offset"+x])};'+
			//'alert(width);alert(height);'+
			'var errorMargin=75;'+
			'window.resizeTo(dim("Width")+errorMargin, dim("Height")+errorMargin);'+
			'setTimeout(function(){window.close()},300000);'+
			'},100);'+
			'}'+
			'</script>'+
			'</body>'+
			'</html>';

		var win=window.open(null, '_blank', 'width=1,height=1'); // 'width='+Math.max(x*.5,200)+',height='+Math.max(y*.5,200));
		win.document.title=selectedText
		win.document.open()
		win.document.write(html)
		win.document.close()
		//win.postMessage('some infomration to alert',"*");

})(window, document);
