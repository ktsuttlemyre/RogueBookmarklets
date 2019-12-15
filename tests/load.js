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
function load(url,onDone,onError){
    if(onDone=='append')onDone=function(){/*TODO auto detect css and js*/};
    else if(!onDone)onDone=function(){};
    if(!onError)onError=function(){};
    var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200||xhr.status==0){
                setTimeout(function(){
                    try{
                        onDone(xhr.responseText);
                    }catch(e){
                        onError(e);
                        return;
                    }
                }.bind(this),1);
            }else{
              onError(xhr.status);
            }
        }
    }.bind(this);
    try{
      xhr.open("GET",url,true);
      xhr.send();
    }catch(e){
      onError(e);
    }  
}