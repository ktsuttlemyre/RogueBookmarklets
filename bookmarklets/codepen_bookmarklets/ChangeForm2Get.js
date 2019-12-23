/**
 *  @author https://codepen.io/bookmarklets
 *  @file Changes the method from post to Get for all of the forms on the page.<br><i class="gray">You can then see what is being sent to the remote server.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:void((function(){var a,b;a=b=0;(function(c){var d,e,f,g;for(d=0;d<c.length;d++){try{arguments.callee(c.frames[d]);}catch(h){}}e=c.document.forms;for(f=0;f<e.length;f++){g=e[f];if(g.method.toLowerCase()=="post"){g.method="GET";a++;}b++;}})(top);alert(a+" of "+b+" forms changed from POST to GET");})())