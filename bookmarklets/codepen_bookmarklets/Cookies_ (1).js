/**
 *  @author https://codepen.io/bookmarklets
 *  @file Does the same as the script above, but shows the cookies in an iFrame<br><i class="gray">This will let you copy and paste the cookies - you cannot do this with an alert!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var c=document.cookie;
	if (c==''){alert('This site didn\'t give you any cookies at all.\nNot a single one!');
	}else{
	w=window.open('','Links','scrollbars,resizable,width=400,height=600');w.document.write(c);
	    }