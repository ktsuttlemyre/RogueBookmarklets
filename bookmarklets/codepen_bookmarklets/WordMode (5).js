/**
 *  @author https://codepen.io/bookmarklets
 *  @file Word Mode 2 - Gives you the "mode" for a page(word); <br><i class="gray">Displays the top 20 words to appear on the current page in a popup modal window. </i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var page=window.location.href;
	var counts={};
	var text=document.body.textContent||document.body.innerText||'';
	var words=text.split(/\b/).filter(function(word){return word.match(/^\w+$/)!==null});words.forEach(function(word){counts['_'+word.toLowerCase()]=(counts['_'+word]||0)+1});
	var sorted=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]});
	var message=sorted[0]===undefined?'No words found!':'<center><b>For the page: <i><font color=\"#0000FF\" size=\"-2\">'+page+'<\/i><\/font><br\/>The Top 20 words are:<\/center><\/b><br>';
	sorted.forEach(function(word,index){if(index>19||word===undefined)return;message+='\n#'+(index+1)+': '+word.substring(1)+' ('+counts[word]+' occurrences)<br>'});
	w=window.open('','Word Mode','scrollbars,resizable,width=250,height=500');
	w.document.write(message);
	