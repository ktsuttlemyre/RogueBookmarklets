/**
 *  @author https://codepen.io/bookmarklets
 *  @file This will search for books across the Internet via a Google script.<br><i class="gray">Generic book search using Google.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var song=window.prompt('Find Books:', 'Enter book or author name'); 
	var song2=song.split(' ').join('_');
	var song3=song.split(' ').join('');
	var url='https://www.google.com/search?q="parent+directory"+pdf+OR+epub+OR+DjVU+OR+xps+"' + song +'" OR "' + song2 + '" OR "' + song3 + '"+-html+-htm+-shtml+-phtml+-php+-buy+-aspx+-jsp+-asp+-cgi+-pdf+-ftp+-unknownsecret&num=100&filter=0';
	window.open(url,'_self')
