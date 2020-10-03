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
}

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
    })()

    
    (function(){
  //encodeURI(RogueBM.stringFormat(RogueBM.scriptEndpoints.edit,RogueBM.scripts['to_qr']))
  var format=function(prefix,suffix){
    return  function(str){
      "use strict";
       // this is the stringFormat function used at stackoverflow
       // orignal https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
       var t = typeof arguments[1];
       var args = (t === "object" || (arguments[1].length!=null && t!=="string")) ?
            arguments[1]
           : Array.prototype.slice.call(arguments,1);
       var keys=Object.keys(args)
       for (var i=0,l=keys.length;i<l;i++) {
           str = str.replace(new RegExp(prefix + keys[i] + suffix, "gi"), args[keys[i]]);
       }
       return str;
    };
  }
  RogueBM.stringFormat=format("\\{","\\}")
  RogueBM.stringHandlebarFormat=format("\\{\\{","\\}\\}")
})();
