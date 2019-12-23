/**
 *  @author https://codepen.io/bookmarklets
 *  @file Unselect all Radio Buttons<br>    <i class="gray">Unselects all of them.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	(function() {
	  var inputs = document.getElementsByTagName('input');
	  for(var i=0; i<inputs.length; i++){
	    if(inputs[i].getAttribute('type')=='radio'){
	    document.getElementsByTagName('input')[i].checked = false;
	  }
	 }
	}());