/**
 *  @author https://codepen.io/bookmarklets
 *  @file Find movies online<br><i class="gray">Search for directories of movies online from any page.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var song=window.prompt('Find Movies:', 'Enter movie or film title'); 
	var song2=song.split(' ').join('_');
	var song3=song.split(' ').join('');
	var url='https://www.google.com/search?q="parent+directory"+mp4+OR+AVI+OR+WMV+OR+MOV+OR+FLV+"' + song +'" OR "' + song2 + '" OR "' + song3 + '"+-html+-htm+-shtml+-phtml+-php+-buy+-aspx+-jsp+-asp+-cgi+-pdf+-ftp+-unknownsecret&num=100&filter=0';window.open(url,'_self');