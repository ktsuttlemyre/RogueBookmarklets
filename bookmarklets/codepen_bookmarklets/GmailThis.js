/**
 *  @author https://codepen.io/bookmarklets
 *  @file Select some text and then click this bookmarklet.<br><i class="gray">Gmail will open, the contents of your clipboard along with the URL will be pasted inside</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){popw='';Q='';d=document;w=window;if(d.selection){Q=d.selection.createRange().text;}else if(w.getSelection){Q=w.getSelection();}else if(d.getSelection){Q=d.getSelection();}popw=w.open('http://mail.google.com/mail/s?view=cm&fs=1&tf=1&to=&su='+encodeURIComponent(d.title)+'&body='+encodeURIComponent(Q)+escape('\n\n')+encodeURIComponent(d.location)+'&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1','gmailForm','scrollbars=yes,width=680,height=575,top=175,left=75,status=no,resizable=yes');if(!d.all)setTimeout(function(){popw.focus();},50);})();