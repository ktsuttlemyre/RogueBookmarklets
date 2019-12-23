/**
 *  @author https://codepen.io/bookmarklets
 *  @file Look up the selected word in the thesaurus.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var q=document.getSelection(); 
	if(q!='') {
	window.open('http://thesaurus.com/browse/'+q); 
	} else {
	 var q=window.prompt('Highlight a word to look up on the page\nOr just enter it here:', 'Enter word to look up');
	}
	if (q!='Enter word to look up') {
	window.open('http://thesaurus.com/browse/'+q); 
	} else  {
	alert('You must either highlight a word on the page\n or enter a word in the dialog box!');
	}