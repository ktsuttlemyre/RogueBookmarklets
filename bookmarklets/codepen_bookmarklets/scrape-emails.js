/**
 *  @author https://codepen.io/bookmarklets
 *  @file Extracts all emails on the current page.<br><i class="gray">Extracts all emails and displays them in a popup iFrame (enable popups!)</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var StrObj= document.body.innerHTML; var haystack =StrObj.toString(); var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g; var found = haystack.match(regex); if(found !== null && found !=='') { mailz=(found.join('\r\n<br>')); w=window.open('','mailz','scrollbars,resizable,width=400,height=600'); w.document.write(mailz); }else{ alert('No emails found on page'); }