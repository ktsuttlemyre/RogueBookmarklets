/**
 *  @author https://codepen.io/bookmarklets
 *  @file Find a movie on the IMDB.com site<br><i class="gray">Then click this bookmarklet to find it on the web!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	if (document.URL.indexOf('imdb.com/title/') > -1) { 
	var film = document.getElementsByTagName('H1')[0].innerText;
	var film2=film.split(' ').join('_');var film3=film.split(' ').join('');var url='https://www.google.com/search?q="parent+directory"+mp4+OR+AVI+OR+WMV+OR+MOV+OR+FLV+"' + film +'" OR "' + film2 + '" OR "' + film3 + '"+-html+-htm+-shtml+-phtml+-php+-buy+-aspx+-jsp+-asp+-cgi+-pdf+-ftp+-unknownsecret&num=100&filter=0';window.open(url,'_self');
	} else {
	alert('You must be on an IMDB page for this tool!\nRedirecting you now... try again!');
	open('https://www.imdb.com/title/tt0031381/?ref_=nv_sr_1');
	}
