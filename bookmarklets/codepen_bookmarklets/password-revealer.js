/**
 *  @author https://codepen.io/bookmarklets
 *  @file Shows hidden passwords in an iFrame alert.<br><i class="gray">Another script similar to the one above. Also works on IE.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var p=r(); function r(){var g=0; var x=false;var x=z(document.forms); g=g+1; var w=window.frames; for(var k=0;k<w.length;k++) { var x = ((x) || (z(w[k].document.forms)));g=g+1; }if (!x) alert('Password not found in ' + g + ' forms'); }function z(f){ var b=false;for(var i=0;i<f.length;i++) { var e=f[i].elements; for(var j=0;j<e.length;j++) { if (h(e[j])) {b=true}}}return b; }function h(ej){var s=''; if (ej.type=='password'){ s=ej.value;if (s!=''){ prompt('Password found ', s) }else{alert('Password is blank') }return true; }}