/**
 *  @author https://codepen.io/bookmarklets
 *  @file Toggle CSS on or off.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(()=>{var a=document.querySelectorAll.bind(document),b="forEach",c="state_",d="disabled",e="display",f="type",g="text",h=(l,n,d,o,p,q)=>{if(n===e)l=l.style;o=n+"_org";p=f+"_org";if(!(c in l)){l[c]=0;l[o]=l[n];l[p]=l[f]}q=l instanceof HTMLInputElement;if(l[c]=!l[c]){l[n]=d;if(q&&(l.type==="hidden"))l[f]=g}else{l[n]=l[o];if(q)l[f]=l[p];delete l[c];delete l[o];delete l[p]}};a("link[rel=stylesheet],style")[b]((l)=>{h(l,d,1)});a("button,input,select")[b]((l)=>{h(l,d,0)});a("*")[b]((l)=>{h(l,e,"")});return})()