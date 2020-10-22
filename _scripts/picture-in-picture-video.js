---
description: |
  Finds the first html5 video on the page and pops it out in to the external player
  //TODO fallback to mini player (popout window)
  
####### Other Metadata #######
authors: |
  Krazete <//github.com/Krazete/bookmarklets>
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: //github.com/Krazete/bookmarklets

####### function signature #######
qualified urls: []
async: false
type: tool
data privacy: [local]


# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {number|id} videoIndex - The index of the video or selector
returns: |
  {undefined} 

---
videoIndex=videoIndex||0
var video;
if(typeof videoIndex=='number"){
  video = document.getElementsByTagName("video")[videoIndex];
}else{
  video = document.querySelectorAll(videoIndex)[0];
}


var pop;
function popout() {
	video.disablePictureInPicture = false;
	video.requestPictureInPicture();
}
function popin() {
	video.disablePictureInPicture = true;
}
video.addEventListener("enterpictureinpicture", e => pop = popin);
video.addEventListener("leavepictureinpicture", e => pop = popout);

pop ? void(0) : pop = popout;
pop();
