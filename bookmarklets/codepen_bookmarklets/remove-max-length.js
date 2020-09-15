/**
 *  @author https://codepen.io/bookmarklets
 *  @file Remove Maxlength<br><i class="gray">Removes the maximum length for a form field. Have a field that's too short? Click &amp; Fix!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var x,k,f,j;x=document.forms;for(k=0;k<x.length;++k){f=x[k];for(j=0;j<f.length;++j)f[j].removeAttribute("maxLength");}})()