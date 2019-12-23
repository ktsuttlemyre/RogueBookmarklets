/**
 *  @author https://codepen.io/bookmarklets
 *  @file Un-Require. Removes required from a required input field.<br><i class="gray">Don't want to answer a required field? (Age, desired salary...). Click it! </i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	function remReqALL(){
	var x = document.getElementsByTagName('input');
	for (var i=0; i<x.length; i++) {
	    document.getElementsByTagName('input')[i].removeAttribute('required');
	}}