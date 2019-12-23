/**
 *  @author https://codepen.io/bookmarklets
 *  @file Word Mode - Gives you the "mode" for a page(word); <br><i class="gray">What are the top 10 words that most commonly appear on the current page. </i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var counts={};
	var text=document.body.textContent||document.body.innerText||'';
	var words=text.split(/\b/).filter(function(word){return word.match(/^\w+$/)!==null});
	words.forEach(function(word){counts['_'+word.toLowerCase()]=(counts['_'+word]||0)+1});var sorted=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]});var message=sorted[0]===undefined?'No words found!':'Top 10 words:';sorted.forEach(function(word,index){if(index>9||word===undefined)return;message+='\n#'+(index+1)+': '+word.substring(1)+' ('+counts[word]+' occurrences)'});
	    alert(message);