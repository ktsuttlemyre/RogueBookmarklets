/**
 *  @author https://codepen.io/bookmarklets
 *  @file Download a video from Reddit.<br> <i class="gray">Go to the page with the video, then click to download it from Reddit!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var url = location.href; if (url.includes('old')) { 
	var url = url.replace('old', 'www'); 
	} (window.open('https://redv.co/?url='+url));