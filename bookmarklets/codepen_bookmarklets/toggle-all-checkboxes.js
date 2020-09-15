/**
 *  @author https://codepen.io/bookmarklets
 *  @file Toggle All checkboxes.<br><i class="gray">Toggle all of the checkboxes on a page with a single click.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){ function toggle(box){ temp=box.onchange; box.onchange=null; box.checked=!box.checked; box.onchange=temp; } var x,k,f,j; x=document.forms; for (k=0; k<x.length; ++k) { f=x[k]; for (j=0;j<f.length;++j) if (f[j].type.toLowerCase() == "checkbox") toggle(f[j]); } })();