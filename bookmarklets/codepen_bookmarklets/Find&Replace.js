/**
 *  @author https://codepen.io/bookmarklets
 *  @file 
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:function htmlreplace(a,b,element){if(!element)element=document.body;var nodes=element.childNodes;for(var n=0;n<nodes.length;n++){if(nodes[n].nodeType==Node.TEXT_NODE){nodes[n].textContent=nodes[n].textContent.replace(new RegExp(a,'gi'),b);}else{htmlreplace(a,b,nodes[n]);}}}htmlreplace(prompt("Text to replace:","old"),prompt("Replacement text:","new"));