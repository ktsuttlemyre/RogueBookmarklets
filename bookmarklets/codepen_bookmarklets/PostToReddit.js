/**
 *  @author https://codepen.io/bookmarklets
 *  @file Posts the page you're on to Reddit.<br><i class="gray">You simply need to select which sub you want it to post to.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){location.href='http://reddit.com/submit?url='+location.href+'&title='+encodeURIComponent(document.title)})()