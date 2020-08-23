var storageURL=/^http.?:\/\/(ktsuttlemyre\.github\.io|rogueware\.com)\/RogueBookmarklets\/SuspendTab/g;
var l=window.location.href; //'https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab.html';
var redirectURL='https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab';
if(storageURL.test(l)){
	window['SuspendTab']['unsuspend']();
}else{
	window.location.href=redirectURL+'#?l='+encodeURIComponent(l);
}
