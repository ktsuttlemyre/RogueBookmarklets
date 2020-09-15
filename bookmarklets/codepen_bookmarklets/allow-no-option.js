/**
 *  @author https://codepen.io/bookmarklets
 *  @file Allow No Option<br><i class="gray">Allows no option if you don't like any of the choices!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){function down(){bmlRadioValue=this.checked;bmlRadioRef=this;} function click() {if((window.bmlRadioRef==this)&&window.bmlRadioValue) {this.checked=false;bmlRadioRef=null;}}function mU(radio){radio.onmousedown=down; radio.onkeydown=down;radio.onclick=click;}var x,k,f,j;x=document.forms;for (k=0;k<x.length;++k){f=x[k];for(j=0;j<f.length;++j)if(f[j].type.toLowerCase()=="radio")mU(f[j]);}window.status="To unselect a selected option button, click on it or press spacebar."})();