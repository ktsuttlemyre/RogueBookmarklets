---
description: |
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

  calls are asyncryonus locally but blocked so that the service only gets one at a time. A pause time of 5 seconds is default between calls

  calls are cached in order to reduce calls to the compiler
  cache can be cleared by calling closureCompiler('cache_clear') or disabled by closureCompiler('cache_off')

  //Example closureCompiler('(function(){/*yeet*/alert("big mood")})()',function(e,obj){console.log(obj.closure())})
  //pretty print example: closureCompiler('(function(){/*yeet*/alert("big mood")})()',{'compilation_level':'pretty_print'},function(e,obj){console.log(obj.closure())})
####### Other Metadata #######
authors: |
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>

####### function signature #######
qualified urls: []
async: true
layout: script
type: library
data privacy: [third-party-request]


# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} code - the code to change
  {type} VarName - //TODO
returns: |
  {object} the compile object?
---
var closureCompiler=(function(){
	var cache={},queue=[],blocked=0,timeout=5000;//milliseconds;
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
	function next(){
		var item = queue.shift();
		if(item){
		    blocked=true;
		    setTimeout(function(){$.ajax(item)},timeout);
		}
	    }

	function closureCompiler(code,opts,callback){
		opts=opts||{};
		//clear cache if needed
		if(code=='cache:clear'){
			cache={};
			return
		}else if(code=='cache:off'){
			cache=null;
			return
		}
		
		if(code.indexOf('timeout:')==0){
	            timeout=parseFloat(code.split(':')[1]);
		    return
		}
		//if there are no ops the callback might be in the wrong argument spot. move that callback over
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
			opts=$.extend({}, opts);
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

		callback=callback||function(e,obj){
			if(e){
				return console.error(e);
			}
			console.log(obj.compiled())
			console.log('Response obj can be found on closureCompiler.lastResponse for DEBUG PURPOSES ONLY!');
			closureCompiler.lastResponse=obj;
		}
		var cachedResponse=cache && cache[JSON.stringify(opts)]
		if(cachedResponse){
			setTimeout(function(){
				callback(null,cachedResponse)
			},1);
			return
		}
		var post={
		    type:'post',
		    url:'https://closure-compiler.appspot.com/compile',
		    async: true,
		    crossDomain:true,
		    data:opts,
		    dataType:'text', 
		    success: function (compiled){
			blocked=false;
		    	var obj=new Compiled(compiled);
		    	compiled && cache && (cache[JSON.stringify(opts)]=obj);
		    	callback(null,obj);
		    },
		    error: function(jqXHR,textStatus,errorThrown ){
			blocked=false;
		    	console.error(textStatus,errorThrown,jqXHR)
		    	callback(errorThrown)
		    },
		    complete:next
		}
		queue.push(post);
		if(!blocked){
                    next();
		}

	}
	return closureCompiler
})()
