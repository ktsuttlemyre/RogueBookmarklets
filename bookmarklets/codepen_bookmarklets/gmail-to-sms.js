/**
 *  @author https://codepen.io/bookmarklets
 *  @file Sends selected text via Gmail→SMS text message to any US mobile telephone<br><i class="gray">Highlight some text, click. Opens Gmail and sends the text + Title + URL</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var message=window.getSelection().toString();var someLocation=window.location.href,msgLength=message.length,locLength=someLocation.length,totalMsg=locLength+msgLength,howMany=totalMsg/160;howMany=parseFloat(howMany);howMany=Math.ceil(howMany);document.getElementsByTagName("body")[0].setAttribute("onMouseUp","changeSel();");
	function changeSel(){message=window.getSelection().toString();if(1<message.length){document.getElementById("hiddenSelect").innerHTML=message;howMany=message.length/160;howMany=parseFloat(howMany);howMany=Math.ceil(howMany);howManyURL=(message.length+locLength)/160;howManyURL=parseFloat(howManyURL);howManyURL=Math.ceil(howManyURL);var a=message.length+locLength;document.getElementById("totsize").innerHTML="New message is "+a+" chars. sent in "+howMany+"SMS messages.";918<message.length&&alert("Your message exceeds 918 characters!\nPlease shorten it.")}}
	if(document.getElementById("mymenu"))document.getElementById("mymenu").remove();else{var showURL=function(){var a=document.getElementById("urlCheck"),b=document.getElementById("hider");1==a.checked?(b.style.display="block",document.getElementById("totsize").innerHTML=message.length+someLocation.length+" chars. - Sent in "+howManyURL+" SMS message(s)"):(b.style.display="none",document.getElementById("totsize").innerHTML=message.length+" chars. - Sent in "+howMany+" SMS message(s)")},sendIt=function(){console.log("Here");
	var a="",b=message,d=document,e=window;b=document.getElementById("hiddenSelect").innerHTML;var c=document.getElementById("numero").value;c=c.split("-").join("");c=c.split(" ").join("");c=c.replace(/[()]/g,"");theLocation=1==urlCheck.checked?encodeURIComponent(d.location):"";a=e.open("http://mail.google.com/mail/s?view=cm&fs=1&tf=1&to="+c+"@"+getOperator()+"&su="+encodeURIComponent(d.title)+"&body="+encodeURIComponent(b)+escape("\n\n")+theLocation+"&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1",
	"gmailForm","scrollbars=yes,width=680,height=575,top=175,left=75,status=no,resizable=yes");d.all||setTimeout(function(){a.focus()},50)},getOperator=function(){for(var a=0,b=ops.length;a<b;a++)if(ops[a].checked)return ops[a].value},remMen=function(){document.getElementById("mymenu").remove()},ops=document.getElementsByName("operator"),bottomMsg="Your original message is "+msgLength+" characters long; The URL is "+locLength+" characters long.<br />Total Message Size: ";918<totalMsg&&alert("Your message exceeds 918 characters!\nPlease shorten it.");
	var block_to_insert=document.createElement("div");block_to_insert.id="mymenu";block_to_insert.innerHTML="<div style=float:right><a href=# onClick=remMen() style=color:red;size:400%;text-decoration:none; title=Cancel>&times;</a><br><textarea id=hiddenSelect style=display:none; maxlength=918>"+message+"&lt;/textarea&gt;</div><br><table><tr><td width=25% ><h3>&#128241; Send Text to Mobile Phone. &nbsp;&nbsp;</h3><br /><form id=messager name=messager><input type=text size=37 id=numero name=numero placeholder=Enter&nbsp;mobile&nbsp;number&nbsp;here maxlength=14 required /><br /><sup style=color:gray;size:70%><i>Your highlighted text will be sent via Gmail.</i></sup><br/><label><input type=checkbox checked id=urlCheck onClick=showURL()> <font size=-2>Include URL: <span id=hider style=color:#00F>"+
	someLocation+"</span></font><br /></font></label><br /><input type=button name=send value=send onClick='sendIt()'/></td><td width=25%><b>Please choose an operator:</b><br /><label><input type=radio name=operator value=txt.att.net required> AT&T</label><br /><label><input type=radio name=operator value=tmomail.net> T-Mobile</label><br /><label><input type=radio name=operator value=messaging.sprintpcs.com> Sprint PCS</label><br /><label><input type=radio name=operator value=vtext.com> Verizon</label><br /><label><input type=radio name=operator value=sms.cricketwireless.net> Cricket</label><br /><label><input type=radio name=operator value=email.uscc.net> US Cellular</label><br /><label><input type=radio name=operator value=vmobl.com> Virgin Mobile</label><br /><label><input type=radio name=operator value=smsmyboostmobile.com> Boost</label><br /><input type=hidden name=operator value=YOU MUST CHOOSE AN OPERATOR! checked=checked/></td></tr></form></table><br><font size=-2 color=#FF0000><i>"+
	bottomMsg+"</i></font><font size=-2 color=#405d27><b><span id=totsize>"+totalMsg+" chars. - Sent in "+howMany+" SMS message(s)</span></b</font><div style=float:right><a href=https://realphonevalidation.com/resources/phone-carrier-lookup/#gf_44 target=_blank style=color:blue;size:400%;text-decoration:none; title=Look&nbsp;up&nbsp;Carrier>LookUp Carrier &#9432;</a></div>";var container_block=document.getElementsByTagName("body")[0];container_block.appendChild(block_to_insert);mymenu.setAttribute("style",
	"margin-left:auto;margin-right:auto;width:50%;background-color:#FFFF00;border-style:outset;color:black;float:left;font-family:arial,sans,verdana;font-size:1rem!important;font-size:100%!important;z-index:10000;display:inline-block;line-height:1!important;overflow:visible;position:fixed;top:0;padding:2px 5px;")};