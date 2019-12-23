/**
 *  @author https://codepen.io/bookmarklets
 *  @file Undisable. Undisables a disabled field.<br><i class="gray">This one is good if a field disabled and you want to answer.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var x,k,f,j;x=document.forms;for (k=0;k<x.length;++k){f=x[k];for(j=0;j<f.length;++j){f[j].disabled=false; f[j].readOnly=false;}}})()