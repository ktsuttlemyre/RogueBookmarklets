---
---
//Common functions that I don't want to load async but have them compiled into js files
  
  

function getCommentBlock(text) {
  //https://stackoverflow.com/questions/27113509/how-to-extract-block-comments-from-a-string-using-regular-expressions
    var comments,
    regex,
    match;
    comments = [];
    regex = /\/\*[\s\S]*?\*\//g
    //GET comment section
    while ((match = regex.exec(text)) != null) {
        comments.push(match);
    }
    
    
    //parse out comments into an object
    comments = comments[0]||''
    comments = (comments[0])?comments[0]:comments
  
    var commentObj={}
    regex = /.*\*.*\@(.*?)\s(.+)/g
    
    while ((match = regex.exec(text)) != null) {
        var key = match[1]
        if(key==''){
          key='description'
        }
        if(!commentObj[key]){
          commentObj[key]=[]
        }
        commentObj[key].push(match[2]);
    }
  
   
  
    return commentObj;
};

function getArgumentDetails (scriptEntry){
        var doc=scriptEntry.params;
        if(typeof scriptEntry.params =='string'){
            doc=doc.trim().split('\n');
        }
        var params=[];
        var args=[]
        for(var i=0,l=doc.length;i<l;i++){
            var type,name,description,value,optional;
            doc[i].replace(/\s\{(\S*)\}|(?<=\}?)\s*(\S*)\s*-|(?<=-|})\s*(.*)/gm,function(match,t,n,d){
                type=(type||t||'').trim();
                name=(name||n||'').trim();
                description=(description||d||'').trim();
                console.log('type',type,'name',name,'description',description)
            })
            var nameval=name.split('=');
            if(nameval.length==2){
                name=nameval[0].trim();
                value=nameval[1].trim();
            }
            
            if(name.charAt(0)=='[' && name.charAt(name.length-1)==']'){
                optional=true;
                name=name.substring(1,name.length-1).trim();
            }

            if(description.indexOf('=')>=0){
                description=description.replace('=','');
                optional=true;
            }
            args.push(name);
            params.push({optional:optional,type:type,name:name,default:value,description:description});
        }
        return {args:args,params:params};
    };

    var createElement=(function(){
        var cache={}, setAttributesFor=['style'];
        return function (element, attrs, parent){
            if(typeof element=='string'){
                element=document.createElement(element);
            }
            var id=(attrs && attrs.id)||element.id;
            if(!cache[id]){
                cache[id]=element;
            }

            if(attrs){
                if(attrs['text']){
                    element.appendChild(document.createTextNode(attrs['text']));
                    attrs['text']=null;
                    delete attrs['text'];
                }

                var keys=Object.keys(attrs);
                for(var i=0,l=keys.length;i<l;i++) { //iter options
                    if(setAttributesFor.indexOf(keys[i])>=0){
                        element.setAttribute(keys[i],attrs[keys[i]]);
                        continue;
                    }
                    element[keys[i]]=attrs[keys[i]];
                }
            }
            if(parent){
                var candidate;
                if(typeof parent == 'string'){
                    candidate=cache[candidate];
                    if(candidate){
                        if(candidate.id==parent){
                            parent = candidate
                        }else{
                            cache[parent]=candidate=null
                        }
                    }
                    if(!candidate){   
                        parent = document.getElementById(parent);
                    }
                }
                parent && parent.appendChild(element);
            }

            return element;
        }
    })();

    
 var generateStringFormatter=(function(){
  //encodeURI(RogueBM.stringFormat(RogueBM.scriptEndpoints.edit,RogueBM.scripts['to_qr']))
  var format=function(prefix,suffix){
    "use strict";
    return  function(str/*obj,clean*/){
      // this is modeled off the stringFormat function used at stackoverflow
       // orignal https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
       var t = typeof arguments[1], args, clean;
       if(t === "object" || (arguments[1]!=null && arguments[1].length!=null && t!=="string")){
          args=arguments[1];
          clean = arguments[2];
       }else{
         args=Array.prototype.slice.call(arguments,1);
         if(!args.length){
           clean=true
         }
       }
       if(args){
         var keys=Object.keys(args)
         for (var i=0,l=keys.length;i<l;i++) {
             str = str.replace(new RegExp(prefix + '.*?:?' + keys[i] + suffix, "gi"), function(match,group){
               //var split=group.split(':');
               //var value = args[keys[i]].toString();    
               //var fn=null
               //while(var fn=split.pop()){
               //   fn=this[split[j]]||window[split[j]]
                //  if(fn){
               //     value=fn(value);
               //   }
               //}
               return args[keys[i]].toString();                                                                    
             });
         }
       }
       if(clean===true){
         str = str.replace(new RegExp(prefix + ".*?" + suffix, "gi"), '');
       }
       return str;
    };
  }
  RogueBM.stringFormat=format("\\{","\\}")
  RogueBM.stringHandlebarFormat=format("\\{\\{","\\}\\}")
  return format
})();
