/**
 *  @author https://codepen.io/bookmarklets
 *  @file Twitter Referrer<br>    <i class="gray">Enter a site via Twitter. (Paywall avoidance tactic)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: if(window.location.href.indexOf('ft.com') > -1) { var pageTitle=document.getElementsByClassName('barrier__heading-serif')[0].innerHTML; } else { var pageTitle=document.getElementsByTagName('title')[0].innerText; } var host=(window.location.hostname); var host=host.replace('www.',''); var pageTitle = pageTitle.toString(); var twit= 'https://twitter.com/search?q=' + host + ' '+ pageTitle + '&src=typd'; window.open(twit, '_self');