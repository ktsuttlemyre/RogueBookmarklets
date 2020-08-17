var closureCompiler=(function(){
	var cache={}

	function Compiled(compiled){
		this.data=$.trim(compiled)
	}
	Compiled.prototype.compiled = function() {
		return this.data
	};
	Compiled.prototype.oneLine = function() {
		if(this.compiledOneLine){
			return this.compiledOneLine
		}
		//convert to one line (remove windows and linux line breaks)
    	return this.compiledOneLine=this.compiled().replace(/\r?\n|\r/gm,''); //remove breaks
	};

	Compiled.prototype.closure = function() {
		if(this.compiledClosure){
			return this.compiledClosure
		}
		var oneLine=this.oneLine()
		//simple check to see if it is a closure. if not make it a closure
		return this.compiledClosure=(oneLine.indexOf('(function(')==0 &&  oneLie.lastIndexOf('})(')>-1 && oneLine.lastIndexOf(')'==oneLine.length-1))?oneLine:'(function(){'+oneLine+'})();';
	};
	Compiled.prototype.bookmarklet = function() {
		if(this.compiledBookmarklet){
			return this.compiledBookmarklet
		}
		var closure=this.closure()
		//add the javascript: protocol to make it a bookmarklet
		return this.compiledBookmarklet=(closure.indexOf('javascript:')!=0)?'javascript:'+closure:closure;
	};

	function closureCompiler(code,opts,callback){
		if(typeof opts == 'function'){
			callback=opts;
			opts=null;
		}
		opts=jQuery.extend({}, opts);
		opts['js_code']=code
		opts['compilation_level']=opts['compilation_level']||'ADVANCED_OPTIMIZATIONS'
		opts['output_format']=opts['output_format']||'text'
		opts['output_info']=opts['output_info']||'compiled_code'

		callback=callback||function(e,obj){console.log(obj.compiled())}
		var cachedResponse=cache[JSON.stringify(opts)]
		if(cachedResponse){
			setTimeout(function(){
				callback(null,cachedResponse)
			},1);
			return
		}
		$.ajax({
		    type:'post',
		    url:'https://closure-compiler.appspot.com/compile',
		    async: true,
		    crossDomain:true,
		    data:opts,
		    dataType:'text', 
		    success: function (compiled){
		    	var obj=new Compiled(compiled);
		    	cache[JSON.stringify(opts)]=obj;
		    	callback(null,obj);
		    },
		    error: function(jqXHR,textStatus,errorThrown ){
		    	console.log(textStatus,errorThrown,jqXHR)
		    	callback(errorThrown)
		    }
		})

	}
	return closureCompiler
})()

