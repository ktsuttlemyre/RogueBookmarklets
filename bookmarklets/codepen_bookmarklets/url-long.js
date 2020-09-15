/**
 *  @author https://codepen.io/bookmarklets
 *  @file Get the long URL from a short url without clicking it.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:void(function(){if(typeof jQuery == 'undefined'){var s=document.createElement('script');s.src='http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';document.getElementsByTagName('head')[0].appendChild(s);}var l=document.createElement('script');l.src='http://www.longurlplease.com/js/jquery.longurlplease.js';document.getElementsByTagName('head')[0].appendChild(l);function runIfReady(){try{if($.longurlplease){ $.longurlplease(); clearInterval(interval);}}catch(e){alert('sadsda')}}; var interval = window.setInterval(runIfReady,100);}())