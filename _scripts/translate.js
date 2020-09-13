---
#layout: default
---
//Jekyll metadata<META>{{ page.url }}<META>{{ page.path }}<META>{{ page.title }}<META>{{ page.date }}<META>{{ site.github.build_revision }}
{%- comment --%}
-----Options-----{%- endcomment -%}
{%- assign desciptionWordWrapLength = 7 -%}
{%- comment -%}
-----END OPTIONS-----

-----Predefined special characters-----{%- endcomment -%}
{%- assign curlyOpen = "{" -%}
{%- assign curlyClose = "}" -%}
{%- assign SPACE = "}" -%}
{% capture NL %}
{% endcapture %}
{% capture COMMENT_NL %}
 *  {% endcapture %}
{% capture PARAM_NL %}
 *  @param {% endcapture %}
{% capture AUTHOR_NL %}
 *  @author Contributor: {% endcapture %}
{%- comment -%}
-----END Predefined Special Charaters-----

-----Data preprocess----- {%- endcomment -%}
{%- assign words = page.description | split: " " -%}


{%- comment -%}-----TEMPLATE-----{%- endcomment -%}
/**
 *  {% for word in words %}{% assign remainder = forloop.index | modulo: desciptionWordWrapLength %}{% if remainder == 0 %}{{ COMMENT_NL }}{% endif %}{{ word }} {% endfor %}
 *  
 *  @param {{ page.params | split: NL | join: PARAM_NL }} 
 *  @returns {{ page.returns | replace: NL, COMMENT_NL }}
 *
 *  @author Original: {{ page.authors | split: NL | join: AUTHOR_NL }} 
{%- if page.originalsource -%}{{ COMMENT_NL }}@see OriginalSource: {{ curlyOpen }}@link {{ page.originalsource }}{{ curlyClose }} {% endif %}
 *  @see This is part of a collection of bookmarklets https://ktsuttlemyre.github.io/RogueBookmarklets/
 *  @see Hosted at https://ktsuttlemyre.github.io/RogueBookmarklets{{ page.url }}
 *  @file LastModified: {{ page.date }}
 */
{%- comment -%}
Special vars all functions get (to make them independent)
selection = if there was text selected it is now accessable via this variable
open = similar to window.open but will open modal, window, 
{% endcomment -%}


if(!Function.prototype.bind){
    //implementatino from https://github.com/Raynos/function-bind
    //repurposed for easy browser pollyfill
    Function.prototype.bind=(function(){
        'use strict';

        /* eslint no-invalid-this: 1 */

        var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
        var slice = Array.prototype.slice;
        var toStr = Object.prototype.toString;
        var funcType = '[object Function]';

        return  function bind(that) {
            var target = this;
            if (typeof target !== 'function' || toStr.call(target) !== funcType) {
                throw new TypeError(ERROR_MESSAGE + target);
            }
            var args = slice.call(arguments, 1);

            var bound;
            var binder = function () {
                if (this instanceof bound) {
                    var result = target.apply(
                        this,
                        args.concat(slice.call(arguments))
                    );
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;
                } else {
                    return target.apply(
                        that,
                        args.concat(slice.call(arguments))
                    );
                }
            };

            var boundLength = Math.max(0, target.length - args.length);
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                boundArgs.push('$' + i);
            }

            bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

            if (target.prototype) {
                var Empty = function Empty() {};
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                Empty.prototype = null;
            }

            return bound;
        };
    })()
};


function allProperties(obj,callback){
    //https://stackoverflow.com/questions/17776830/looping-through-all-of-the-items-in-the-window-object#comment25928156_17776830
    var props;
    if(!callback){
        props=[];
        callback=function(name){props.push(name)}
    }
    do{
        Object.getOwnPropertyNames(obj).forEach(function(name) {
            callback(name);
        });
        console.log("=============================");
    }while(obj = Object.getPrototypeOf(obj));
    return props;
}

function mock(obj,skip){
    skip=skip||[]

    var Mock = function Mock() {};

    var props=allProperties(obj,function(name){
        console.log(name)
        //if(skip.indexOf(name)>=0){return;}
        if(obj[name] && obj[name].bind){ //if it is a bindable function
            Mock.prototype[name] = obj[name].bind(obj);
        }else{
            Mock.prototype[name] = obj[name];
        }
    });
    var mock = new Mock();
    Mock.prototype=null
    return mock
}



(function container(window,document,location){
 
    var RogueBM=window['RogueBM']||{};
    
    var win=mock(window);
    var doc=mock(window.document,['location']);
    var loc=mock(window.document.location);

    //custom apis
    //loc.href=location.href.toString()

    var refs=RogueBM['envRefs'];
    var currentCommandID=RogueBM['currentCommandID']
    var alert=win.alert=function alert(message){
        var skipAlerts=RogueBM['skipAlerts'][currentCommandID];
        if(skipAlerts){return autoConfirmAnswer;}
        return refs.window.alert(message);
    }
    var confirm=win.confirm=function confirm(){
        var autoConfirmAnswer=RogueBM['autoConfirm'][currentCommandID];
        if(typeof autoConfirmAnswer =='boolean'){return autoConfirmAnswer;}
        var args=RogueBM['handoffArgs'][currentCommandID];
        if(args.length){
             var arg=args.shift(); //maybe check if argument is a boolean and enforce it?
             return !!arg;
        }
        return refs.window.confirm(message,value);
    }
    var prompt=win.prompt=function prompt(message,value){
        var args=RogueBM['handoffArgs'][currentCommandID];
        if(args.length){
             var arg=args.shift(); //maybe check if argument is string and enforce it?
             return arg;
        }
        return refs.window.prompt(message,value);
    }

    var checkedWindows
    var getSelection=win.getSelection=doc.getSelection=function getSelection(win,doc){
        console.log('getSelection',win,doc);
      var selection=(win.getSelection && win.getSelection() || doc.getSelection && doc.getSelection() || doc.selection && doc.selection.createRange && doc.selection.createRange().text).toString()
      if(selection){
        return selection
      }
      //try to get from frames
      for(var i=0,l=window.frames.length;i<l;i++){
        //call document this way because of IE
        //https://stackoverflow.com/questions/17197084/difference-between-contentdocument-and-contentwindow-javascript-iframe-frame-acc
        try{
            console.log('iframe index',i)
            selection=getSelection(window.frames[i] /*.contentWindow note: that is the contentWindow*/ ,window.frames[i].contentDocument);
        }catch(error1){
            continue;
        }
        if(selection){
          return selection;
        }
      }
    }
    doc.selection={
        'createRange':function(){
            return {'text': getSelection()}
        }
    }


    //build higherarchy 
    win.document=doc;
    win.document.location=loc
    win.location=loc;

    //win.document.location='http://google.com'
    var mocks = {
            window:win,
            document:doc,
            location:loc
        }


    var package=function bookmarkletClosure(window,document,location,prompt,alert,confirm){

        var stdout=RogueBM['stdout'];
        var selection = (stdout!=null)?stdout:(getSelection(window,window.document)||'');
        var serverSecret='{{ site.github.build_revision }}'
        //Their code
        {{ page.content }}
        //End their code

        //cleanup and check for inconsistantcies 
        //check location and location href
        if(!mock.document.location.href == location.href){
            location.href=mock.document.location.href
        }
        if(mock.document.location != loc){
            document.location=mock.document.location
        }
    }

    
    if(RogueBM){
        if(RogueBM['execute']){
            RogueBM['execute'](package)
        }else{
            var mocks=RogueBM['mocks']||mocks;
            package.apply(mocks.window,[mocks.window,mocks.window.document,mocks.window.location,mocks.window.prompt,mocks.window.alert,mocks.window.confirm])
        }
    }else{
        package(window,document,location,prompt,alert,confirm)
    }

})(window,document,location)
