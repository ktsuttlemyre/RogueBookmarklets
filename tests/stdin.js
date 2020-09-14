/*
<div id="screenshot">
  <video autoplay></video>
  <img src=" "/>
  <canvas style="display:none; width:0;height:100%"></canvas>
  <div><span><button class="capture-button">Capture</button></span></div>
  <button id="screenshot-button">screenshot</button>
</div>
*/

////REGES

 //  \s*?(\S+?)\s*?\:\s*?(\S+?)\s*?(;|$)
//var match, properties={};
//while(match=regex.exec(cssText)) properties[match[1]] = match[2].trim();
@@@@@@@
function setElement(element, attrs, style){
    if(typeof element=='string'){
        element=document.createElement(element);
    }
    
    for(var key in attrs) { //iter options
        var value=attrs[key]
        element[key]=value
    }
     for(var key in style) { //iter options
        var value=style[key]
        element.style[key] = value;
    }
    return element
}
function getInput(callback){
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    /*
    callback signature
    (error,string)
    */
    var id='prompt'+Math.random()
    var ta=setElement('textarea',{id:id,className:'form-control'},{position:'relative',width:'100%',height:'100%'})
    var button=setElement('button',{'innerText':'Submit','type':'submit','className':'btn btn-default'},{position:'absolute',bottom:'1em',right:'1em'})
    var cancel=setElement('button',{'innerText':'X','className':'btn btn-default'},{position:'absolute',top:'1em',right:'1em'})
    var form=setElement('form',{role:'form'},{padding:'1em'})
    form.appendChild(ta)
    form.appendChild(button)
    form.appendChild(cancel)
    var remove=function(e,q){
        form.parentNode.removeChild(form)
    }
    cancel.addEventListener("click",remove)
    form.addEventListener("submit", function(e,q){
            e.preventDefault()
            var value = ta.value;
            remove()
            callback(null,value)
            return false;
        })
    setElement(form,null,{position:'absolute',top:height-(height*.8)+'px',right:'0',height:height*.8+'px',width:width*.8+'px'})
    document.body.appendChild(form)
    ta.focus()
}
//getInput(function(e,str){window.str=str;console.log(str)})


var results = [];

var walkDOM = (function(){
    //filter and select are expected to be lower case string values
    function walkDOM(node,func,options,path) {


        if(options.filter && options.filter.indexOf((node.tagName||'').toLowerCase()) >= 0){
            //console.info('filtered:',node.tagName,node)
            return
        }
        if(options.select && options.select.indexOf((node.tagName||'').toLowerCase()) < 0){
            //console.info('notSelected:',node.tagName,node)
            return
        }
        var response;

        path.push(node)
        response=func(node,path);
        if(response){ /*assume ==terminate or possible error?*/
            return response
        }

        node = node.firstChild;
        while(node) {
            path.push(node)
            response=walkDOM(node,func,options,path);
            path.pop();
            node = node.nextSibling;

            if(response == 'break'){
                break
            }else if(response == 'terminate'){
                return response
            }
        }
        return 0
    };
    return /*interface*/ function(node,func,options){
        //TODO enforce lowercase
        if(options.filter && !Array.isArray(options.filter)){
            options.filter=[]
        }
        if(options.select && !Array.isArray(options.select)){
            options.select=[]
        }
       return walkDOM(node,func,options,[]);
    }
})()

getInput(function(e,str){
    var div=setElement('div',{innerHTML:str})
    walkDOM(div,function(node,path){
        console.warn(node.tagName,node,node.attributes)
        for(var i=0,l=node.attributes.length;i<l;i++){
            var attr=node.attributes[i]
            console.log(Array(path.length).join("  "),attr.name,'=',attr.value)
        }
    },{filter:['']})
})
