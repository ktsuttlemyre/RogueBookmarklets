/**
 *  @author https://codepen.io/bookmarklets
 *  @file Converts drop down lists on the page to pure text lists.<br><i class="gray">Reveals all of the contents of a dropdown to see it all at a glance.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){function callback(){(function($){var jQuery=$;/**code**/droptxt = $("option").text();$("select").contents().unwrap();$("option").contents().unwrap().wrap("<span style=clear:both;display:block; >");/**end-code**/})(jQuery.noConflict(true))}var s=document.createElement("script");s.src="//cdn.jsdelivr.net/jquery/1.10.2/jquery-1.10.2.min.js";if(s.addEventListener){s.addEventListener("load",callback,false)}else if(s.readyState){s.onreadystatechange=callback}document.body.appendChild(s);})()