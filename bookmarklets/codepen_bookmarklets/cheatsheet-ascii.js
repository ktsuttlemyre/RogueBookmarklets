/**
 *  @author https://codepen.io/bookmarklets
 *  @file Pops up an ASCII Reference Table<br><i class="gray">This also works as a button - click the button to the left to see.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:function C(v){return '<td>'+v+'</td><td>'+((v>>4).toString(16)+(v&15).toString(16)).toUpperCase()+'</td><td bgcolor=DDDDDD><b>&'+'#'+v+';</b></td>';}var c=4,b=Math.ceil(224/c),a='<table border=0><tr>';for(j=0;j<c;j++){a+='<td>DEC</td><td>HEX</td><td><b>ASC</b></td>';}a+='</tr>';for(i=32;i<33+b;i++){a+='<tr>';for(j=0;j<c;j++){t=i+(j*b);if(t<=255)a+=C(t);}a+='</tr>';}a+='</table>';var W=open('','','width=500,height=600,left=0,top=0,resizable,scrollbars');void(W.document.writeln(a));