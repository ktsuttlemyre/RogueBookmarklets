/**
 *  @author https://codepen.io/bookmarklets
 *  @file Downvote ALL on the current page (subs only).<br><i class="gray">This only works in <b>OLD REDDIT!</b></i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: if(window.location.href.indexOf("old.reddit.com/r/") > -1) { 
	(function(){var q=[];$('.down').each(function(){var that=this;var f=function(index){$(that).trigger('click');$(that).trigger('mousedown');setTimeout(function(){if(q[index]){q[index](index+1);}else{if(downVoteTimer){window.clearTimeout(downVoteTimer);}}},500);};q.push(f);});var downVoteTimer=window.setTimeout(function(){q[0](1);},50);}());
	} else {
	alert("You need to be voting in a single sub in OLD reddit for this to work!\nSWITCH TO OLD REDDIT!\n
	Go to: http://old.reddit.com/r/ and choose a subreddit")
	}
