/**
 *  @author https://codepen.io/bookmarklets
 *  @file Pops up a palette of web-safe colors.<br><i class="gray">As above, click on the button for a demo, or drag it to your bookmarks.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:t='';c=new Array('00','33','66','99','CC','FF');for(i=0;i<6;i++){t+='<table width=100%>';for(j=0;j<6;j++){t+='<tr>';for(k=0;k<6;k++){L=c[i]+c[j]+c[k];t+='<td bgcolor='+L+'>'+L}t+='</tr>'}t+='</table>'}; W=open('','','width=500,height=700,left=0,top=0,resizable,scrollbars');void(W.document.writeln(t));