/**
 *  @author https://codepen.io/bookmarklets
 *  @file Send an MMS to an AT&amp;T phone via your email client (Not with Gmail)
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){
	popw='';Q='';
	d=document;w=window;if(d.selection){
	   Q=d.selection.createRange().text;
	   }else if(w.getSelection){
	Q=w.getSelection();
	   }else if(d.getSelection){
	Q=d.getSelection();
	   }
	var recip=window.prompt('Enter the AT&T Mobile Phone Number:', 'Enter the phone number here'); 
	var recip=recip.split('-').join(''); var recip=recip.split(' ').join(''); var recip = recip.replace(/[()]/g,'');
	   window.open('mailto:'+recip+'@mms.att.net'+'?subject='+encodeURIComponent(d.title)+'&body='+encodeURIComponent(Q)+escape('\n\n')+encodeURIComponent(d.location));
	  if(!d.all)setTimeout(function(){popw.focus();},50);
	})();