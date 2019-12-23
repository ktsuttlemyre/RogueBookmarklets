/**
 *  @author https://codepen.io/bookmarklets
 *  @file Travolta WTF?!? <br><i class="gray">Puts a puzzled and lost looking John Travolta on the page making his famous WTF (from Pulp-Fiction)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var travoltaWTF = document.getElementById('travoltaWTF');
	if(travoltaWTF){
	document.getElementById('travoltaWTF').remove();
	} else {
	var travolta = document.createElement('img');
	travolta.setAttribute('id', 'travoltaWTF');
	travolta.src='https://i.imgur.com/Yc0G92s.gif';travolta.alt='WTF!';
	travolta.style.position='fixed';
	travolta.style.left='0';
	travolta.style.top='10%';
	travolta.style.zIndex='10000';
	document.body.appendChild(travolta);
	    }