var storageURL=/^http.?:\/\/(ktsuttlemyre\.github\.io|rogueware\.com)\/RogueBookmarklets\/SuspendTab/g;
var l=window.location.href; //'https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab.html';
var redirectURL='https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab';
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

if(storageURL.test(l)){
	window['SuspendTab']['unsuspend']();
}else{
	window.location.href=redirectURL+'#?l='+encodeURIComponent(l);
}




var image = new Image(),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

image.src = 'https://i.stack.imgur.com/I4jXc.png';

image.onload = function(){
    ctx.drawImage(image,
        0, 0,   // Start at 0/0 pixels from the left and the top of the image (crop),
        50, 50,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
        0, 0,     // Place the result at 0, 0 in the canvas,
        width, height); // With as width / height: 100 * 100 (scale)
    var saved = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href=saved; // it will save locally
}


