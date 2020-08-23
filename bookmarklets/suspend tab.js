var storageURL="https://ktsuttlemyre.github.io/RogueBookmarklets/SuspendTab.html#"

if(window.location.href.indexOf(storageURL) == 0){
	window['SuspendTab']['unsuspend']();
}else{
	window.location=storageURL+'#?l='+window.location
}
