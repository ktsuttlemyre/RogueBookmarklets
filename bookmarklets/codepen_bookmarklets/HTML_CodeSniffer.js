/**
 *  @author https://codepen.io/bookmarklets
 *  @file Just highlight something on the page you are on and click this bookmarklet.<br><i class="gray">It will display the full HTML for what you've highlighted!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function() {var _p='//squizlabs.github.io/HTML_CodeSniffer/build/';var _i=function(s,cb) {var sc=document.createElement('script');sc.onload = function() {sc.onload = null;sc.onreadystatechange = null;cb.call(this);};sc.onreadystatechange = function(){if(/^(complete|loaded)$/.test(this.readyState) === true){sc.onreadystatechange = null;sc.onload();}};sc.src=s;if (document.head) {document.head.appendChild(sc);} else {document.getElementsByTagName('head')[0].appendChild(sc);}}; var options={path:_p};_i(_p+'HTMLCS.js',function(){HTMLCSAuditor.run('WCAG2AA',null,options);});})();