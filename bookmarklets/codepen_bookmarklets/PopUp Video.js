/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var r = /^.*(?:vimeo\.com\/(\w{8})|(?:youtu.be\/|v\/|u\/\w\/|embed\/|v=)([^#\&\? ]*)).*/gi, m = r.exec(window.location.href); if (m[1]) { window.open("http://player.vimeo.com/video/"+m[1]); } else if (m[2]) { window.open("http://www.youtube.com/watch_popup/?v="+m[2], "_blank", "height=345,width=560"); }})()