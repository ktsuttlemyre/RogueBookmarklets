/*
Closure compiler api which exposes a function with the signature
code = string (can be 'clear_cache' to clear cache)
opts[optional] = options object
callback function expecting to recive (err,Compiled) where Compiled is an object with the methods 'compiled','oneLine',closure','bookmarklet'


All options the compiler accepts are aviable but here are a few
compilation_level 'WHITESPACE_ONLY','SIMPLE_OPTIMIZATIONS','ADVANCED_OPTIMIZATIONS' or 0,1,2 or pretty_print
output_file_name default.js
formatting pretty_print,print_input_delimiter

//more flags can be found here https://developers.google.com/closure/compiler/docs/api-ref

This will also accept compilation_level strings as opts. This also includes "pretty_print"
which will auto set formatting to pretty_print and compliation_level to WHITESPACE_ONLY

calls are cached in order to reduce calls to the compiler
cache can be cleared by calling closureCompiler('cache_clear') or disabled by closureCompiler('cache_off')
*/
//Example closureCompiler('(function(){/*yeet*/alert("big mood")})()',function(e,obj){console.log(obj.closure())})
var closureCompiler=(function(){
	var cache={};
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

	Compiled.prototype.closure = function(force) {
		if(this.compiledClosure){
			return this.compiledClosure
		}
		var oneLine=this.oneLine()
		//simple check to see if it is a closure. if not make it a closure
		if(force || !(oneLine.indexOf('(function(')==0 &&  oneLine.lastIndexOf('})(')>-1 && oneLine.lastIndexOf(')'==oneLine.length-1))){
			oneLine='(function(){'+oneLine+'})();'
		}
		return this.compiledClosure=oneLine;
	};
	Compiled.prototype.bookmarklet = function(force) {
		if(this.compiledBookmarklet){
			return this.compiledBookmarklet
		}
		var closure=this.closure()
		//add the javascript: protocol to make it a bookmarklet
		if(force || !(closure.indexOf('javascript:')==0)){
			closure='javascript:'+closure
		}
		return this.compiledBookmarklet=closure;
	};

	function closureCompiler(code,opts,callback){
		opts=opts||{};
		//clear cache if needed
		if(code=='cache_clear'){
			cache={};
			return
		}else if(code=='cache_off'){
			cache=null;
			return
		}

		if(typeof opts == 'function'){
			callback=opts;
			opts=null;
		}
		var compileLevels=['WHITESPACE_ONLY','SIMPLE_OPTIMIZATIONS','ADVANCED_OPTIMIZATIONS'];

		var optsType=typeof opts
		if(optsType=='string'){
			opts={'compilation_level':opts}
		}else if(optsType=='number'){
			opts={'compilation_level':compileLevels[optsType]}
		}else if(optsType=='object'){
			opts=jQuery.extend({}, opts);
		}else{
			console.error('wrong opts typeof ',optsType)
		}

		opts['js_code']=code
		opts['compilation_level']=opts['compilation_level']||'ADVANCED_OPTIMIZATIONS'
		opts['output_format']=opts['output_format']||'text'
		opts['output_info']=opts['output_info']||'compiled_code'

		//if user has set the compilation to pretty_print which isn't a compile mode but a format mode
		//assume whitespace only and set format to pretty_print
		if(opts['compilation_level']=="pretty_print"){
			opts['compilation_level']='WHITESPACE_ONLY'
			opts['formatting']='pretty_print';
		}

		callback=callback||function(e,obj){console.log(obj.compiled())}
		var cachedResponse=cache && cache[JSON.stringify(opts)]
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
		    	cache && (cache[JSON.stringify(opts)]=obj);
		    	callback(null,obj);
		    },
		    error: function(jqXHR,textStatus,errorThrown ){
		    	console.error(textStatus,errorThrown,jqXHR)
		    	callback(errorThrown)
		    }
		})

	}
	return closureCompiler
})()
