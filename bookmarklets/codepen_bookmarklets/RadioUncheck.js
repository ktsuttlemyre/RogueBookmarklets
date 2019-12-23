/**
 *  @author https://codepen.io/bookmarklets
 *  @file Unchecks radio buttons. Click the one you want to unclick &amp; highlight.<br><i class="gray">Inconsistent - you may need to tweak the code for various radio-buttons. :)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var myRadios = document.getElementsByTagName('input'); var setCheck; var x = 0; for(x = 0; x < myRadios.length; x++){ myRadios[x].onclick = function(){ if(setCheck != this){ setCheck = this; }else{ this.checked = false; setCheck = null; } }; }