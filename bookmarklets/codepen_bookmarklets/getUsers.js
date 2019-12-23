/**
 *  @author https://codepen.io/bookmarklets
 *  @file Shows a popup with all of the users in a sub.<br><i class="gray">Generates a sorted, hyperlinked list with all duplicates removed.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var haystack= document.body.innerHTML; 
	haystack=haystack.toString().trim(); 
	var needle = /\s*(["'])(\/user\/.+?)\1/ig; 
	var found = haystack.match(needle); 
	function removeDupes(found) { 
	let unique = {}; 
	found.forEach(function(i) { 
	if(!unique[i]) { unique[i] = true; } }); 
	return Object.keys(unique); 
	} 
	found=removeDupes(found); 
	found = found.sort();
	found.sort(function (a, b) {
	    return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	var baseUrl='http://www.reddit.com';
	var text = '';
	var i;
	for (i = 0; i < found.length; i++) {
	 found[i] = found[i].replace(/['']/gi,'');
	 text +=  found[i].replace(/["]/gi,'').link(baseUrl+ found[i].replace(/["]/gi,'')) + '<br>';
	}
	if(found !== null && found !=='') { 
	w=window.open('','users','scrollbars,resizable,width=400,height=600'); w.document.write('<html><head><title>Reddit Users</title></head><body>' + text); 
	}else{ 
	alert('No Reddit users found on this page'); 
	}