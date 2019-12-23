/**
 *  @author https://codepen.io/bookmarklets
 *  @file Find music on the internet with this bookmarklet.<br><i class="gray">Search for directories of music online from any page.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var song=window.prompt('Find Music:', 'Enter song or artist name'); 
	var song2=song.split(' ').join('_');
	var song3=song.split(' ').join('');
	var url='https://www.google.com/search?q="parent+directory"+mp3+OR+wma+OR+ogg+OR+wav+"' + song +'" OR "' + song2 + '" OR "' + song3 + '"+-html+-htm+-shtml+-phtml+-php+-buy+-aspx+-jsp+-asp+-cgi+-pdf+-ftp+-unknownsecret&num=100&filter=0';
	window.open(url,'_self')