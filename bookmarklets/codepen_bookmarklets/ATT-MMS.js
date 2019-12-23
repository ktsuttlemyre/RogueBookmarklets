/**
 *  @author https://codepen.io/bookmarklets
 *  @file Send your selection and the URL to any AT&amp;T mobile phone (Via Gmail).<br><i class="gray">Select some text, then click. Enter the T-Mobile number and it sends an SMS.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){
	popw='';Q='';
	d=document;w=window;if(d.selection){
	   Q=d.selection.createRange().text;
	   }else if(w.getSelection){Q=w.getSelection();
	   }else if(d.getSelection){Q=d.getSelection();
	   }
	var recip=window.prompt('Enter the AT&T Mobile Phone Number:', 'Enter the phone number here'); 
	var recip=recip.split('-').join(''); var recip=recip.split(' ').join(''); var recip = recip.replace(/[()]/g,'');
	   popw=w.open('http://mail.google.com/mail/s?view=cm&fs=1&tf=1&to='+ recip +'@mms.att.net&su='+encodeURIComponent(d.title)+'&body='+encodeURIComponent(Q)+escape('\n\n')+encodeURIComponent(d.location)+'&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1','gmailForm','scrollbars=yes,width=680,height=575,top=175,left=75,status=no,resizable=yes');
	   if(!d.all)setTimeout(function(){popw.focus();
	   },50);
	})();