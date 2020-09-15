/**
 *  @author https://codepen.io/bookmarklets
 *  @file Display all outbound links on the page.<br><i class="gray">A popup will display all the links in HTML</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var a='';for(var ln=0;ln<document.links.length;ln++){var lk=document.links[ln];a+=ln+': <a href=\''+lk+'\' title=\''+lk.text+'\'>'+lk+'</a><br>\n';}w=window.open('','Links','scrollbars,resizable,width=400,height=600');w.document.write(a);