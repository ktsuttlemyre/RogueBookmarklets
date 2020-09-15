/**
 *  @author https://codepen.io/bookmarklets
 *  @file Send your selected text &amp; URL to a T-Mobile phone (via mail client - not Gmail)<br><i class="gray">Select some text on a page (128 characters) and text it!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){ popw='';Q=''; d=document;w=window;if(d.selection){ Q=d.selection.createRange().text; }else if(w.getSelection){ Q=w.getSelection(); }else if(d.getSelection){ Q=d.getSelection(); } var recip=window.prompt('Enter the T-Mobile Phone Number:', 'Enter the phone number here'); var recip=recip.split('-').join(''); var recip=recip.split(' ').join(''); var recip = recip.replace(/[()]/g,''); window.open('mailto:'+recip+'@tmomail.net'+'?subject='+encodeURIComponent(d.title)+'&body='+encodeURIComponent(Q)+escape('\n\n')+encodeURIComponent(d.location)); })();