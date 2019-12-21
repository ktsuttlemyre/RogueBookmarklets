//original code
//https://fdossena.com/?p=html5cool/loadAsync/i.frag

if(!Function.prototype.bind){
    Function.prototype.bind=function(oThis){
        if (typeof this !== "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP && oThis? this: oThis,aArgs.concat(Array.prototype.slice.call(arguments)));};
        fNOP.prototype=this.prototype;
        fBound.prototype=new fNOP();
        return fBound;
    };
}
function load(url,onDone){
    if(onDone=='append'){
        onDone=function(e,src){
        /*TODO auto detect css and js*/
        var ext = url.substr(url.lastIndexOf('.') + 1),s;
        switch(ext){
            case 'js':
                s = document.createElement('script');
                s.setAttribute('type', 'text/javascript');
                break;
            case 'css':
                s = document.createElement('link');
                s.setAttribute('rel', 'stylesheet');
                s.setAttribute('type', 'text/css');
                break;
            default:
                console.log("can't append ",ext," to head. Reason: not implemented")
        }
        s.appendChild(document.createTextNode(src)); 
        document.getElementsByTagName('head')[0].appendChild(s);
        };
    }else if(!onDone){
        onDone=function(e,data){};
    }
    var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200||xhr.status==0){
                setTimeout(function(){
                    try{
                        onDone(null,xhr.responseText);
                    }catch(e){
                        onDone(e); //error
                        return;
                    }
                }.bind(this),1);
            }else{
                onDone(xhr.status); //error
            }
        }
    }.bind(this);
    try{
      xhr.open("GET",url,true);
      xhr.send();
    }catch(e){
        onDone(e); //error
    }  
}