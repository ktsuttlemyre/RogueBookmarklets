
if (!window.jQuery) {  
	javascript:(function() {
	    function l(u, i) {
	        var d = document;
	        if (!d.getElementById(i)) {
	            var s = d.createElement('script');
	            s.src = u;
	            s.id = i;
	            d.body.appendChild(s);
	        }
	    }
	    l('//code.jquery.com/jquery-3.2.1.min.js', 'jquery')
	})();
}





var yaml='---  # document start'
var titles=[]

var duplicates=[]
function onlyUnique(value, index, self) { 
	if(self.indexOf(value) === index){
		return true
	}
		duplicates.push(value)
	return false
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function removeEmojis(txt){
	var ranges = [
	  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
	  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
	  '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
	];

	return txt.replace(new RegExp(ranges.join('|'), 'g'), '');
}

function main(){
	var author=prompt('author')
	if(!author){
		console.log('no author exiting')
		return
	}
	var counter=1
	$('a').each(function(index){
		var anchor=$(this)
		var title=(anchor.text()||'').trim()
		var src=(anchor.attr('href')||'').trim()
		var description=(anchor.parent().next().html()||'').trim()

		src=unescape(src)
		// try{
		// 	var tmp=src
		// 	src=decodeURIComponent(tmp)
		// 	//title+='decodeURIComponent'
		// }catch(e){
		// }

		title = removeEmojis(title.split('\n').join('').split(':').join('').split('|').join(''))
		titles.push(title)

		var filtered=titles.filter( onlyUnique )
		var isDuplicates=titles.length - filtered.length
		titles=filtered
		if(isDuplicates){
			title+=" ("+(counter++)+")"
			//alert('warning there are '+JSON.stringify(duplicates)+' duplicate titles/keys in yaml!')
		}


		description = description.split('\n').join('')
		src = src.replace(/[\n\r]+/g,'\n\t').split('</textarea>').join('&lt;/textarea&gt;')



		var jsdoc = '/**\n'+
		' *  @author '+author+'\n'+
		' *  @file '+description+'\n'+
		// ' *\n'+
		' *  Original Source {@link '+top.location.href+'}\n'+
		' */\n\n';
		setTimeout(function(){download(title+'.js',jsdoc+src)},500*index);

		yaml+='\n'+
				title+': |\n'+
				'\t'+description+'\n'+
				'\t'+src+
				'\n\n\n'
	});
	yaml+='...  # document end'
}



 popUp=function(yaml){

	var newWindow = window.open("","Test","width=800,height=600,scrollbars=1,resizable=1")



	// var str='';//JSON.stringify(o,null,2)
	// var output=JSON.stringify(o,function(key,value) {
	// 	if(key){
	// 		//console.log(key,value)
	// 		str+='==========['+key+']==========\n'+
	// 				value+'\n\n\n'+
	// 			'-------------------------\n'
	// 	}
	// 	return value
	// })

	newWindow .document.open()
	//newWindow.document.body.appendChild(document.createTextNode(yaml))
	newWindow .document.write('<textarea wrap="soft" style="width:100%;height:100%;white-space: nowrap;  overflow: auto;">'+yaml+'</textarea>')
	newWindow .document.close()
}
//popUp(yaml)

main()

