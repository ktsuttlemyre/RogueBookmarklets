var storageURL="https://ktsuttlemyre.github.io/RogueBookmarklets/LocalStorage.html#"

if(window.location.href.indexOf(storageURL) == 0){
	window.location=Array.prototype.slice.call(window.location.href.split('#'), 1).join('#');
}else{
	window.location=storageURL+window.location
}