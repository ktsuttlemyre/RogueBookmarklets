/**
 *  @author https://codepen.io/bookmarklets
 *  @file This will reveal any pre-filled password fields.  <br><i class="gray">Converts passwords to text ***** → Pa$sW0rD123</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){
	var IN,F;IN=document.getElementsByTagName('input');
	for(var i=0;i<IN.length;i++){F=IN[i];
	if(F.type.toLowerCase()=='password'){
	try{F.type='text'}catch(r){
	var n,Fa;n=document.createElement('input');
	Fa=F.attributes;for(var ii=0;ii<Fa.length;ii++){
	var k,knn,knv;k=Fa[ii];knn=k.nodeName;knv=k.nodeValue;
	if(knn.toLowerCase()!='type'){
	if(knn!='height'&&knn!='width'&!!knv)n[knn]=knv}};
	F.parentNode.replaceChild(n,F)}}}})()