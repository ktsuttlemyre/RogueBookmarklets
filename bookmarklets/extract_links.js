
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


var o={};$('a').each(function(){o[$(this).text()]=($(this).attr('href'))});


function popUp(o){

	var newWindow = window.open("","Test","width=300,height=300,scrollbars=1,resizable=1")

	newWindow .document.open()
	newWindow .document.write('<textarea>'+JSON.stringify(o,null,2)+'</textarea>')
	newWindow .document.close()

}
if(Object.keys(o).length){
	popUp(o)
}