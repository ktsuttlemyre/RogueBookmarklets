/**
 *  @author https://codepen.io/bookmarklets
 *  @author Kyle Suttlemyre
 *  @revision {{ site.github.build_revision }}
 *  @file Travolta WTF?!? <br><i class="gray">Puts a puzzled and lost looking John Travolta on the page making his famous WTF (from Pulp-Fiction)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){
	var id='RogueRunner_travoltaWTF'
	var travoltaWTF = document.getElementById(id);
	if(travoltaWTF){
		var elm=document.getElementById(id);
		elm.parentNode.removeChild(elm);
	} else {
		var travolta = document.createElement('img');
		travolta.setAttribute('id', id);
		travolta.src='https://i.imgur.com/Yc0G92s.gif';travolta.alt='WTF!';
		travolta.style.position='fixed';
		travolta.style.bottom='0';
		travolta.style.right='10%';
		travolta.style.zIndex='2147483647'; //max safe https://joeist.com/2012/06/what-is-the-highest-possible-z-index-value/
		document.body.appendChild(travolta);
	    }})()
