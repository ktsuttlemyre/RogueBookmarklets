(function(window,document,location,alert,prompt,confirm) {
    window['RogueBM']=window['RogueBM'] || {}; //in block notation so closure compiler will 'export' the vairable
    if(window['RogueBM']['show']){
        return window['RogueBM']['show']();
    }
     // pollyfill for date.now
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
     
     
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

     


     

    var mimeToTag={'javascript':'script','css':'style','html':'iframe','p':'plain'}; //omit text/ Registries as it is assumed default
    //limitation: urls must end with an extention otherwise it will be assumed to be inline source
    //TODO show loading icon on rogueDJ as long as we are loading
    function inject(str,mime,callback){ 
        /*
        str = url or embeded code
        mime = mimetype 
        callback must be true if external source (aka str is a url
         - given the arguments (error,data)
        
        mime prefix assumed to be 'text/'
        */
        if(mime.indexOf('text/')==0){
          mime=mime.substring(5);
        }
        var ext=str.substr(str.lastIndexOf('.') + 1);
        var tag=mimeToTag[mime]||mimeToTag[(mime='plain')]
        var obj=document.createElement(tag)
        obj.setAttribute('type', (mime.indexOf('/')<0)?'text/'+mime:mime);
        switch(mime){
            case "javascript":
                if(callback){
                    obj.setAttribute('src',str);
                    obj.setAttribute('crossorigin', "anonymous");
                    obj.onerror = callback;
                }else{
                    try {
                      obj.appendChild(document.createTextNode(str));
                    } catch (err) { //silent error fallback for shitty browsers
                      obj.text = str;
                    }
                }
            break;
            case "css":
                if(callback){ //https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
                    obj = document.createElement( "link" );
                    obj.href = str
                    obj.rel = "stylesheet";
                    obj.media = "screen,print";
                }else{
                    if ("textContent" in obj){
                        obj.textContent = str;
                    }else if(obj.styleSheet){
                        obj.styleSheet.cssText =str
                    }else{
                        obj.innerText = str;
                    }
                }
            break;
            default:
            throw Error('unknown mime injection',mime)
        }

        document.getElementsByTagName('head')[0].appendChild(obj);
        if(typeof callback == 'function'){
            obj.onload=function(err){
                var args=Array.prototype.slice.call(arguments);
                args.unshift(null);
                callback.apply(callback, args)
            };
        }
    }




    ///////////////////////
    //  helper functions
    function showError(message){
            statusBar.innerHTML=message
            var args = Array.prototype.slice.call( arguments );
            args.unshift("RogueBM[runner]: ");
            console.error.apply(console, args);
    };


  


    function UUID(){return Math.floor(Math.random()*9000000000) + 1000000000+'-'+Date.now()}

    var selector={
        backdrop:UUID(),
        window:UUID(),
        content:UUID(),
        div:UUID(),
        input:UUID(),
        statusBar:UUID(),
        suggestion:UUID(),
    }

    function getViewportWidth(){
        var e = window;
        var a = 'inner';
        if (!('innerWidth' in window)){
            a = 'client';
            e = document.documentElement || document.body;
        }
        return e[ a+'Width' ]
    }
    ///////////////////////////
    // CSS for modal and input
    // use this to create a nice long text block
    //https://codebeautify.org/string-builder
    //modal code came from
    //https://www.w3schools.com/howto/howto_css_modals.asp
    var cssText = ''+ /* The Modal (background) */

        // '#RogueRunner {'+
        //     'all:initial;'+
        // '}'+

        // '#RogueRunner *{'+
        //     'all:unset'+
        // '}'+
        /* Modal Content/Box */
        '#RogueRunner .modal-content {'+
            'background-color: #fefefe;'+
            'margin: 15% auto;'+ /* 15% from the top and centered */
            'padding: 20px;'+
            'border: 1px solid #888;'+
            '-webkit-border-radius: 15px;'+
            '-moz-border-radius: 15px;'+
            'border-radius: 15px;'+
            'width: 80%;'+ /* Could be more or less, depending on screen size */
        '}'+

        '#RogueRunner #RogueRunner_div{'+
            'position: relative;'+
        '}'+

        '#RogueRunner #RogueRunner_div > .rogue-input {'+
            'outline: none;'+
            'font-size: 1em;'+
            'height: 1.5em;'+
            'width: 100%;'+
            '-webkit-border-radius: 15px;'+
            '-moz-border-radius: 15px;'+
            'border-radius: 15px;'+
            'padding: 1em 0em;'+
            'background:#EEEEEE'+
        '}'+

        '#RogueRunner #RogueRunner_div > .status_bar {'+
            'color:#000000;'+
            'position: absolute;'+
            'font-size: 1.5em;'+
            'right: '+((getViewportWidth()/2)-125)+'px;'+
            'bottom: .5em;'+
            'transition: all 0.1s ease;'+
        '}'+

        '#RogueRunner #RogueRunner_div .rogue-input:focus ~ .status_bar{'+
            'color:#999999;'+
            'right: 1em;'+
            'bottom: 0.1em;'+
            'font-size: .75em;'+
        '}' +
        '.RogueRunner_animate{'+
            '-webkit-transition: all .5s ease;'+
            '-moz-transition: all .5s ease;'+
            '-o-transition: all .5s ease;'+
            'transition: all .5s ease;'+
        '}'+

        '.RogueRunner_collapsed{'+
            'max-height:0px !important;'+
        '}'+

        '#RogueRunner_div > #result_pane{'+
            'height:auto;'+
            'max-height:800px'+
        '}'+

        '.Rogue_suggestion_link{'+
            'font-size:1em'+
            'margin: .5em;'+
            'display: block;'+
        '}'+

        '.Rogue_suggestion_link:focus{'+
            'bottom: 1px;'+
             'font-size: 1.30em;'+
        '}'+


        '#RogueRunner {'+
            'position: fixed;'+ /* Stay in place */
            'z-index: 2147483647;'+ /* Sit on top */
            'left: 0px;'+
            'top: 0px;'+
            'width: 100%;'+
            'height: 100%;'+ /* Full height */
            'overflow: auto;'+ /* Enable scroll if needed */
            'background-color: rgb(0,0,0);'+ /* Fallback color */
            'background-color: rgba(0,0,0,0.4);'+ /* Black w/ opacity */

// 'align-content:normal;'+
// 'align-items:normal;'+
// 'align-self:auto;'+
// 'alignment-baseline:auto;'+
// 'animation-delay:0s;'+
// 'animation-direction:normal;'+
// 'animation-duration:0s;'+
// 'animation-fill-mode:none;'+
// 'animation-iteration-count:1;'+
// 'animation-name:none;'+
// 'animation-play-state:running;'+
// 'animation-timing-function:ease;'+
// 'backdrop-filter:none;'+
// 'backface-visibility:visible;'+
// 'background-attachment:scroll;'+
// 'background-blend-mode:normal;'+
// 'background-clip:border-box;'+

// 'background-image:none;'+
// 'background-origin:padding-box;'+
// 'background-position-x:0%;'+
// 'background-position-y:0%;'+
// 'background-size:auto;'+
// 'baseline-shift:0px;'+
// 'block-size:666px;'+
// 'border-block-end-color:rgb(0, 0, 0);'+
// 'border-block-end-style:none;'+
// 'border-block-end-width:0px;'+
// 'border-block-start-color:rgb(0, 0, 0);'+
// 'border-block-start-style:none;'+
// 'border-block-start-width:0px;'+
// 'border-bottom-color:rgb(0, 0, 0);'+
// 'border-bottom-left-radius:0px;'+
// 'border-bottom-right-radius:0px;'+
// 'border-bottom-style:none;'+
// 'border-bottom-width:0px;'+
// 'border-collapse:separate;'+
// 'border-image-outset:0px;'+
// 'border-image-repeat:stretch;'+
// 'border-image-slice:100%;'+
// 'border-image-source:none;'+
// 'border-image-width:1;'+
// 'border-inline-end-color:rgb(0, 0, 0);'+
// 'border-inline-end-style:none;'+
// 'border-inline-end-width:0px;'+
// 'border-inline-start-color:rgb(0, 0, 0);'+
// 'border-inline-start-style:none;'+
// 'border-inline-start-width:0px;'+
// 'border-left-color:rgb(0, 0, 0);'+
// 'border-left-style:none;'+
// 'border-left-width:0px;'+
// 'border-right-color:rgb(0, 0, 0);'+
// 'border-right-style:none;'+
// 'border-right-width:0px;'+
// 'border-top-color:rgb(0, 0, 0);'+
// 'border-top-left-radius:0px;'+
// 'border-top-right-radius:0px;'+
// 'border-top-style:none;'+
// 'border-top-width:0px;'+
// 'bottom:0px;'+
// 'box-shadow:none;'+
// 'box-sizing:content-box;'+
// 'break-after:auto;'+
// 'break-before:auto;'+
// 'break-inside:auto;'+
// 'buffered-rendering:auto;'+
// 'caption-side:top;'+
// 'caret-color:rgb(0, 0, 0);'+
// 'clear:none;'+
// 'clip:auto;'+
// 'clip-path:none;'+
// 'clip-rule:nonzero;'+
// 'color:rgb(0, 0, 0);'+
// 'color-interpolation:srgb;'+
// 'color-interpolation-filters:linearrgb;'+
// 'color-rendering:auto;'+
// 'column-count:auto;'+
// 'column-fill:balance;'+
// 'column-gap:normal;'+
// 'column-rule-color:rgb(0, 0, 0);'+
// 'column-rule-style:none;'+
// 'column-rule-width:0px;'+
// 'column-span:none;'+
// 'column-width:auto;'+
// 'contain:none;'+
// 'content:normal;'+
// 'counter-increment:none;'+
// 'counter-reset:none;'+
// 'cursor:auto;'+
// 'cx:0px;'+
// 'cy:0px;'+
// 'd:none;'+
// 'direction:ltr;'+
// 'dominant-baseline:auto;'+
// 'empty-cells:show;'+
// 'fill:rgb(0, 0, 0);'+
// 'fill-opacity:1;'+
// 'fill-rule:nonzero;'+
// 'filter:none;'+
// 'flex-basis:auto;'+
// 'flex-direction:row;'+
// 'flex-grow:0;'+
// 'flex-shrink:1;'+
// 'flex-wrap:nowrap;'+
// 'float:none;'+
// 'flood-color:rgb(0, 0, 0);'+
// 'flood-opacity:1;'+
// 'font-family:Times;'+
// 'font-feature-settings:normal;'+
// 'font-kerning:auto;'+
// 'font-optical-sizing:auto;'+
// 'font-size:16px;'+
// 'font-stretch:100%;'+
// 'font-style:normal;'+
// 'font-variant-caps:normal;'+
// 'font-variant-east-asian:normal;'+
// 'font-variant-ligatures:normal;'+
// 'font-variant-numeric:normal;'+
// 'font-variation-settings:normal;'+
// 'font-weight:400;'+
// 'grid-auto-columns:auto;'+
// 'grid-auto-flow:row;'+
// 'grid-auto-rows:auto;'+
// 'grid-column-end:auto;'+
// 'grid-column-start:auto;'+
// 'grid-row-end:auto;'+
// 'grid-row-start:auto;'+
// 'grid-template-areas:none;'+
// 'grid-template-columns:none;'+
// 'grid-template-rows:none;'+
// 'hyphens:manual;'+
// 'image-rendering:auto;'+
// 'inline-size:602px;'+
// 'isolation:auto;'+
// 'justify-content:normal;'+
// 'justify-items:normal;'+
// 'justify-self:auto;'+

// 'letter-spacing:normal;'+
// 'lighting-color:rgb(255, 255, 255);'+
// 'line-break:auto;'+
// 'line-height:normal;'+
// 'list-style-image:none;'+
// 'list-style-position:outside;'+
// 'list-style-type:disc;'+
// 'margin-block-end:0px;'+
// 'margin-block-start:0px;'+
// 'margin-bottom:0px;'+
// 'margin-inline-end:0px;'+
// 'margin-inline-start:0px;'+
// 'margin-left:0px;'+
// 'margin-right:0px;'+
// 'margin-top:0px;'+
// 'marker-end:none;'+
// 'marker-mid:none;'+
// 'marker-start:none;'+
// 'mask:none;'+
// 'mask-type:luminance;'+
// 'max-block-size:none;'+
// 'max-height:none;'+
// 'max-inline-size:none;'+
// 'max-width:none;'+
// 'min-block-size:0px;'+
// 'min-height:0px;'+
// 'min-inline-size:0px;'+
// 'min-width:0px;'+
// 'mix-blend-mode:normal;'+
// 'object-fit:fill;'+
// 'object-position:50% 50%;'+
// 'offset-distance:0px;'+
// 'offset-path:none;'+
// 'offset-rotate:auto 0deg;'+
// 'opacity:1;'+
// 'order:0;'+
// 'orphans:2;'+
// 'outline-color:rgb(0, 0, 0);'+
// 'outline-offset:0px;'+
// 'outline-style:none;'+
// 'outline-width:0px;'+
// 'overflow-wrap:normal;'+
// 'overscroll-behavior-block:auto;'+
// 'overscroll-behavior-inline:auto;'+
// 'overscroll-behavior-x:auto;'+
// 'overscroll-behavior-y:auto;'+
// 'padding-block-end:0px;'+
// 'padding-block-start:0px;'+
// 'padding-bottom:0px;'+
// 'padding-inline-end:0px;'+
// 'padding-inline-start:0px;'+
// 'padding-left:0px;'+
// 'padding-right:0px;'+
// 'padding-top:0px;'+

// 'paint-order:normal;'+
// 'perspective:none;'+
// 'perspective-origin:301px 333px;'+
// 'pointer-events:auto;'+

// 'r:0px;'+
// 'resize:none;'+
// 'right:0px;'+
// 'row-gap:normal;'+
// 'rx:auto;'+
// 'ry:auto;'+
// 'scroll-behavior:auto;'+
// 'scroll-margin-block-end:0px;'+
// 'scroll-margin-block-start:0px;'+
// 'scroll-margin-bottom:0px;'+
// 'scroll-margin-inline-end:0px;'+
// 'scroll-margin-inline-start:0px;'+
// 'scroll-margin-left:0px;'+
// 'scroll-margin-right:0px;'+
// 'scroll-margin-top:0px;'+
// 'scroll-padding-block-end:auto;'+
// 'scroll-padding-block-start:auto;'+
// 'scroll-padding-bottom:auto;'+
// 'scroll-padding-inline-end:auto;'+
// 'scroll-padding-inline-start:auto;'+
// 'scroll-padding-left:auto;'+
// 'scroll-padding-right:auto;'+
// 'scroll-padding-top:auto;'+
// 'scroll-snap-align:none;'+
// 'scroll-snap-stop:normal;'+
// 'scroll-snap-type:none;'+
// 'shape-image-threshold:0;'+
// 'shape-margin:0px;'+
// 'shape-outside:none;'+
// 'shape-rendering:auto;'+

// 'speak:normal;'+
// 'stop-color:rgb(0, 0, 0);'+
// 'stop-opacity:1;'+
// 'stroke:none;'+
// 'stroke-dasharray:none;'+
// 'stroke-dashoffset:0px;'+
// 'stroke-linecap:butt;'+
// 'stroke-linejoin:miter;'+
// 'stroke-miterlimit:4;'+
// 'stroke-opacity:1;'+
// 'stroke-width:1px;'+
// 'tab-size:8;'+
// 'table-layout:auto;'+
// 'text-align:start;'+
// 'text-align-last:auto;'+
// 'text-anchor:start;'+
// 'text-combine-upright:none;'+
// 'text-decoration-color:rgb(0, 0, 0);'+
// 'text-decoration-line:none;'+
// 'text-decoration-skip-ink:auto;'+
// 'text-decoration-style:solid;'+
// 'text-indent:0px;'+
// 'text-orientation:mixed;'+
// 'text-overflow:clip;'+
// 'text-rendering:auto;'+
// 'text-shadow:none;'+
// 'text-size-adjust:auto;'+
// 'text-transform:none;'+
// 'text-underline-position:auto;'+

// 'touch-action:auto;'+
// 'transform:none;'+
// 'transform-box:view-box;'+
// 'transform-origin:301px 333px;'+
// 'transform-style:flat;'+
// 'transition-delay:0s;'+
// 'transition-duration:0s;'+
// 'transition-property:all;'+
// 'transition-timing-function:ease;'+
// 'unicode-bidi:normal;'+
// 'user-select:auto;'+
// 'vector-effect:none;'+
// 'vertical-align:baseline;'+
// 'visibility:visible;'+
// 'white-space:normal;'+
// 'widows:2;'+
// 'will-change:auto;'+
// 'word-break:normal;'+
// 'word-spacing:0px;'+
// 'writing-mode:horizontal-tb;'+
// 'x:0px;'+
// 'y:0px;'+
// 'zoom:1;'+
// ''+


        '}'+


        '';

    //attach the above text as a style tag to the document head
    inject(cssText,'css')

    var setAttributesFor=['style']
    function createElement(element, attrs, parent){
        if(typeof element=='string'){
            element=document.createElement(element);
        }
        
        var keys=Object.keys(attrs)
        for(var i=0,l=keys.length;i<l;i++) { //iter options
            if(setAttributesFor.indexOf(keys[i])>=0){
                element.setAttribute(keys[i],attrs[keys[i]])
                continue
            }
            element[keys[i]]=attrs[keys[i]];
        }
        parent && parent.appendChild(element);

        return element
    }
    
    ///////////////////////
    var modalBackdropDiv = createElement('div',{id:'RogueRunner'}); //this will be appended to body when document is finished loading
    // Create modal; 
    var modalPane = createElement('div',{className:'modal-content'},modalBackdropDiv);
    // input for rogue runner
    var runnerWrapper = createElement('div',{id:'RogueRunner_div'},modalPane);
    ///////////////////////

    
    /* multiLine svg icon
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.09668 6.99707H3.09668V17.0031H1.15881L4.15881 20.0031L7.15881 17.0031H5.09668V6.99707Z" fill="currentColor" /><path d="M22.8412 7H8.84119V5H22.8412V7Z" fill="currentColor" /><path d="M22.8412 11H8.84119V9H22.8412V11Z" fill="currentColor" /><path d="M8.84119 15H22.8412V13H8.84119V15Z" fill="currentColor" /><path d="M22.8412 19H8.84119V17H22.8412V19Z" fill="currentColor" /></svg>
    */
    
    var inputs={
        multiLine:createElement('textarea',{name:'text',id:'multiLine-input',className:'rogue-input',style:"width:100%; display:none;"},runnerWrapper),
        singleLine:createElement('input',{id:'input',type:'text',className:'rogue-input',autocomplete:'off',style:'display:block;'},runnerWrapper)
    }


    inputs.current=inputs.singleLine;
    inputs.multiLineMode=false;
    inputs.toggleMultiline=function(bool){
        if(bool==null){
            bool=!inputs.multiLineMode;
        }
        
        singleLine.style.display=(bool)?'none':'block';
        multiLine.style.display=(bool)?'block':'none';
        inputs.current=(bool)?inputs.multiLine:inputs.singleLine;
        inputs.current.focus();
        setTextAreaHeight();
    }
    var multiLine=inputs.multiLine;
    var singleLine=inputs.singleLine;

    var setTextAreaHeight=function(){
        inputs.singleLine.value='';
        multiLine.style.height = "";
        multiLine.style.height = Math.max(multiLine.scrollHeight +3,12) + "px";
    }
    multiLine.oninput=setTextAreaHeight;



    singleLine.oninput=function(){
        inputs.multiLine.value=inputs.singleLine.value;
    };
    
    var keyUP = function(evt) {
        var keycode = keyCode(evt)
        if(!statusBar_isLink){
            statusBar.innerHTML='';
            statusBar.appendChild(rogueLink);
        }
        if(keycode == 13){ //enter will focus again
            if(evt.shiftKey){
                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                inputs.toggleMultiline(true)
                return false
            }
            var focused = getFocusedElement();
            if(focused && focused.className && focused.className.indexOf('Rogue_suggestion_link') > -1){
                run(focused.title);
            }
            run(multiLine.value);
            return
        }
        getSuggestions(multiLine.value)
    }
    multiLine.onkeyup = function(evt){
        singleLine.value=multiLine.value;
        var keycode = keyCode(evt)
        if(keycode==13 && !evt.ctrlKey){
            return
        }
        return keyUP(evt);
    }
    singleLine.onkeyup = keyUP
    

    var statusBar = createElement('span',{className:'status_bar'},runnerWrapper); //id: 'statusBar'

    var statusBar_isLink=true;
    var rogueLink=createElement('a',{title:'RogueRunner',href:'https://ktsuttlemyre.github.io/RogueBookmarklets/',tabIndex:-1},statusBar); //className :'Rogue_suggestion_link RogueRunner_animate'
        rogueLink.appendChild(document.createTextNode('RogueRunner'));

    var resultPane = createElement('p',{id:'result_pane',className:'RogueRunner_collapsed RogueRunner_animate'},runnerWrapper);

    //  Use this micro framework to see if the dom is ready
    // some modifications to make it init faster
    //https://github.com/ded/domready
    var domready = (function() {
        var e = [],
            t, n = typeof document == "object" && document,
            r = n && n.documentElement.doScroll,
            i = "DOMContentLoaded",
            s = n && (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
        return !s && n && n.addEventListener(i, t = function() {
                n.removeEventListener(i, t), s = 1;
                while (t = e.shift()) t()
            }),
            function(t) {
                s ? setTimeout(t, 0) : e.push(t)
            }
    })();

    /////////////////////////////
    // Append the modal to the body this is done after all html elements
    // are nested and after dom is ready this prevents unnessisisary redraws
    ///////////////////////
    domready(function(){
        //add interface to dom
        document.body.appendChild(modalBackdropDiv);
        setTextAreaHeight(); //make multiLine have some height
        var about=window['RogueBM']['about']
        if(!about || !about['injector'] ){
            showError('RogueRunner wasn\'t injected with the injector script!');
        }
        //if there is a cmd passed from the injector
        //then dont show the prompt and wait for the event to trigger from downlaoding the index.js
        var lastCMD=RogueBM.lastCMD;
        if(!lastCMD){
           show();
        }
    });


    function show(){
        singleLine.value=''
        multiLine.value=''

        modalBackdropDiv.style.display = "block";

        //make the input active so we can type without anymore inputs
        singleLine.focus()
    }
     


    //function isShown(){ //idk if i need this?
    //  return modalBackdropDiv.style.display == "block";
    //}

    function getFocusedElement(){
        var focused = document.activeElement;
        if (!focused || focused == document.body)
            focused = null;
        else if (document.querySelector)
            focused = document.querySelector(":focus");
        return focused
    }

    function hide(){
        if(parent!== window){
          parent.postMessage("RogueRunner:Blur",'*');
        }else{
             modalBackdropDiv.style.display = "none";
        }
        singleLine.value='';
        multiLine.value=''
    }
     
    var runLink=function(){
        return void(RogueBM.run(this.title));
    }
    var linkCache={};
    function generateSelectionLink(key){
        if(linkCache[key]){
            return linkCache[key]
        }
        var a = createElement('a',{title:key,className:'Rogue_suggestion_link RogueRunner_animate',href:'#',onclick:runLink,tabIndex:0});
        a.appendChild(document.createTextNode(key.replace(/^.|-./gi,function(match,group){
               return (' '+match.charAt(match.length-1)).toUpperCase()
            }).trim()));
        //a.href = "javascript:void(RogueBM.run(\'"+key+"\'));";
        //a.onfocus = "RogueBM.setSelection(\'"+key+"\')";
        return linkCache[key]=a;
    }

    var arraysMatch = function (arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    ////////////////////////////////
    //search logic and interactivity
    var defaultSuggestions=[];
    var lastSearch=''
    function searchScripts(input) {
        input=input||''
        //https://stackoverflow.com/questions/11404855/javascript-autocomplete-without-external-library
        if(input == lastSearch){
            return
        }
        lastSearch=input
        var reg = new RegExp(input.replace(/\B/g,'\\S*?'), 'i');
        console.log(reg.toString())
        var list = [] //new list each time
        
        var numberOfSuggestions=window['RogueBM']['keys'].length
        if(!input.length){
            numberOfSuggestions=5
            if(defaultSuggestions.length){
                return defaultSuggestions
            }
        }
        
        for (var i = 0; i < numberOfSuggestions; i++) {
            var key = window['RogueBM']['keys'][i]
            if (key && key.match(reg)) {
                list.push(generateSelectionLink(key));
            }
        }

        if(list.length){
            return list
        }

        if(!defaultSuggestions.length){
            defaultSuggestions=searchScripts('')
            return defaultSuggestions
        }

        return list;
    }

    var deferedInput
    var currentSuggestions=[];
    function getSuggestions(input) {
        if(input===undefined&&deferedInput){
            input=deferedInput
            deferedInput=null
        }
        if(!window['RogueBM']['keys'].length){
            deferedInput=input
            setTimeout(getSuggestions, 0)
            return
        }

        var suggestionResult = searchScripts(input);
        if(!suggestionResult){
            return
        }
        //if the arrays are the same then do nothing
        if(arraysMatch(suggestionResult,currentSuggestions)){
            return
        }
        resultPane.innerHTML="";
        if(suggestionResult.length){
            resultPane.className=resultPane.className.replace('RogueRunner_collapsed','')
            resultPane.append.apply(resultPane,suggestionResult);
        }else{
            resultPane.className+=' RogueRunner_collapsed';
        }
        //for(var i=0;i<suggestionResult.length;i++){
        //}
        currentSuggestions = suggestionResult
    }

    function keyCode(evt){
        return evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    }

    function inputFocus(){
        inputs.current.focus()
    };
    ///////////////////
    //  load hotkeys
    document.onkeyup = function(evt) {
        //TODO handle this with show hide possibly? to leave the environment as it was before roguerunner ran
        if(modalBackdropDiv.style.display == "none"){
            return
        }
        var keycode=keyCode(evt)
        switch(keycode){
            case 27: //escape hides the window
                hide()
            break;
            case 8: //delete will force focus on input as well as delete
            case 13: // enter refocus 
                setTimeout(inputFocus,1)
            break;
            case 32: //space [action=select] if a link is highlighted autofill then focus for more input
                setTimeout(inputFocus,1)
        }
    }

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(evt) {
        //TODO handle this with show hide possibly? to leave the environment as it was before roguerunner ran
        if (evt.target == modalBackdropDiv) {
            hide()
        }
    }

    function normalizeCommandToScriptName(name){
        //Because commands can be in camelcase, pascal case, snake case, underscore case, URI encoded or even have spaces
        //this will take a command name and convert it to the hyphanated script name in the repository
        return decodeURIComponent(name).replace(/[\u0000-\u0030\u003A-\u0040\u005B-\u0060\u007B-\u00A0]/gi,' ').replace(/(?:^|\.?)([A-Z])/g, function (x,y){return " " + y}).trim().replace(/\s+/gi,'-').toLowerCase()
    }

    var cachedCommands={};
    function fullURLtoPath(url){ //cant use this because RogueBM.processTick is called with relateive path or filename only
        var prefix='/RogueBookmarklets/';
        var restOfPath=url.split(prefix)[1];
        if(!restOfPath){
            return null
        }
        return prefix + restOfPath
    }
    var cdnPreference='github_pages,github_raw,jsdelivr'.split(',')
    function getScript(scriptEntry){
        var cached=cachedCommands[scriptEntry.path||scriptEntry];
        if(cached){
            return scriptEntry
        }

        if(typeof scriptEntry == 'string'){ //assume its code
            //if it is a string assume its code
            //TODO handle https:// http:// and javascript:
            inject(script,'javascript')
            return scriptEntry
        }

        //src takes priority
        if(scriptEntry.src){//if we get a script obj use the src attribute
            inject(scriptEntry.src,'javascript',true)
            return scriptEntry
        }

        //TODO have cdn fallback failures
        
        inject(RogueBM.stringFormat(cdnPreference[0], scriptEntry.path),'javascript',true)
        return scriptEntry
    }

    function inheritProperties(target,source,defaults){
        Object.keys(source).forEach(function(key){
            target=(source.hasOwnProperty(key))?source[key]:defaults;
        })
    }


    var nestedThread
        ,rogueSchema
        ,emptyRef={}
        ,RunnerOptions={
            skipAlerts:true,
            autoConfirmAnswer:true,
            autoConfirm:true,
            blocking:false //TODO implement blocking currently async only
        }
    //http://nodeca.github.io/js-yaml/#yaml=LS0tCi0gR3JheXNjYWxlOgogIC0gfAogICAgYXNkZmFmZHMKICAgIGFzZGYKICAgIGFzCiAgICBkZmFmZAogICAgYXNkCiAgLSAgc2RmYQogIC0gIHNhZHNmCi0gQVNDSUk6CiAgLSBsamthc2RramYKICAtIHNkZmFzZGYKICAtIGFzZGZhc2Zk
    // http://nodeca.github.io/js-yaml/#yaml=Um9ndWVSdW5uZXI6CiAgLSBnZXRMb2NhdGlvbjoKICAgICAgLSB8CiAgICAgICAgYXNkZgogICAgICAgIHNzCiAgICAgICAgCiAgICAgICAgYWRzZmEKICAgICAgLSAxMS8yNy8yMDE1CiAgICAgIC0KICAgICAgLSBhbm90aGVyIGFyZwogICAgICAtIGZpbmFsIGFyZwogICAgICAtIFsxLDIsMyw0XQogICAgICAtIHsgJ3NheSc6J2phdnNjcmlwdCBvYmonIH0KICAtIHRvV2luZG93OgogICAgICB1bm9yZGVyZCBsaXN0OiBzb21ldGhpbmcgbGlrZSB0aGlzCiAgICAgIG11bHRpbGluZTogfAogICAgICAgIHNkZmEgYQogICAgICAgIGFzZGYKICAgICAgICBhYWRmCiAgICAgICAgYWEKICAgICAgYXJnczogMTEvMjYvMjAxNQ==
    function run(rogueYML,callback){ //Interperate input/yaml
        rogueYML=rogueYML.trim();
        RogueBM.lastInput=rogueYML;
        if(!rogueYML){
            statusBar.innerHTML="Nothing to execute";
            return
        }

        var parsed,commands;
        if(typeof rogueYML=='string'){
            if(rogueYML.indexOf('\n')<0){
                rogueYML='[ '+rogueYML+' ]';
                parsed=jsyaml.safeLoad(rogueYML,{ schema: rogueSchema });
                commands=parsed
            }else{
                rogueYML=rogueYML.replace(/^[^\s-#]/gm,function(match){
                    return '---\n'+match
                })
                commands=[]
                var iterArray=rogueYML.split(/^---\s*$/gm);
                iterArray.forEach(function(page){
                    var parsedPage=jsyaml.safeLoad(page,{ schema: rogueSchema });
                    parsedPage && commands.push(parsedPage);
                });
            }
            if(!Array.isArray(commands)){
                commands=[commands];
            }
        }else{
            throw 'error input run object'
        }
        
        var thread={processes:[],stdout:[],callback:callback}

        var options={}
        for(var index=0,l=commands.length;index<l;index++){
            var command=commands[index];
            var commandVarType= typeof command
            var scriptEntry,args,rawCMD;
            if(commandVarType == 'string'){
                rawCMD=command
                scriptEntry=queryScriptEntry(rawCMD)
                args=[]
            }else if(Array.isArray(command)){
                alert('got array of arrays!')
                console.log('got array of arrays',parsed)
                return
            }else if(commandVarType=='object'){
                var keys=Object.keys(command)
                var key=keys[0];
                if(keys.length!=1){
                    alert('Currently not accepting unordered commands');
                    alert('Schema Error see console. For issues')
                    console.error('Schema structure looks like this and RogueRunner doesn\'t know how to handle it',index,command,keys,commands);
                    return
                }

                //allow changin default options through the yml via a RogueRunner command
                if(normalizeCommandToScriptName(key).replace('-','')=='roguerunner'){
                    options=command[key]
                    continue
                }

                rawCMD=key
                scriptEntry=queryScriptEntry(rawCMD)
                args=command[key];
            }else{
                alert('Schema Error see console. For issues')
                console.error('Schema structure looks like this and RogueRunner doesn\'t know how to handle it',index,command,keys,commands);
            }



            //now we have a script obj or string
            //download the src if it exists OR run the string
            if(!scriptEntry){
                statusBar_isLink=false
                statusBar.innerHTML="Interpreter error. One or more commands can not be executed";
                return
            }

            thread.processes.push({scriptEntry:scriptEntry,rawCMD:rawCMD,args:args,processID:processIndex++})
            inheritProperties(thread,options,RogueRunner)

            //go ahead and asyncget/cache the script (even if there is a syntax error it is likely the person will fix it and need this soon)
            //if command is already cached then use it
            getScript(scriptEntry)
        }
        var threadID=(threadIndex++).toString(36)
        activity[thread.threadID=threadID]=thread;
        //parsed and everything seems ok. Create the thread
        hide();
        RogueBM['processTick']();
        return threadID;
    }

    var threads={}; //hash of threads(arrays)
    var processIDSs=[]; //array of processIDs
    var processIndex=1
    var threadIndex=1
    var activity={}
    function queryScriptEntry(rawCMD){
        var normalizedCommand=normalizeCommandToScriptName(rawCMD);
        if(rawCMD){
            //assume user put in the right scriptname
            scriptEntry=window.RogueBM.scripts[rawCMD];
            if(!scriptEntry){  //no script goes by key name then try to normalize the key
                scriptEntry=window.RogueBM.scripts[normalizedCommand];
                if(!scriptEntry){// if that fails then get the first suggestion script obj  
                    scriptEntry = (currentSuggestions[0] && window.RogueBM.scripts[currentSuggestions[0].title])
                }
            }
        }
        return scriptEntry
    }

        

    var CrossOriginLocalStorage = window['RogueBM']['CrossOriginLocalStorage']
    if(!CrossOriginLocalStorage){
        //TODO inject CrossOriginLocalStorage via injection script
        showError('CrossOriginLocalStorage not loaded!')
    }else{
        extendCrossOriginLocalStorage(CrossOriginLocalStorage)
    }

    function extendCrossOriginLocalStorage(CrossOriginLocalStorage){
        CrossOriginLocalStorage.prototype.getData = function (key,handler) {
            var messageData = {
                key: key,
                method: 'get',
            }
            this.postMessage(messageData,handler);
        }

        CrossOriginLocalStorage.prototype.setData = function(key, data, handler) {
            var messageData = {
                key: key,
                method: 'set',
                data: data,
            }
            this.postMessage(messageData,handler);
        }
    }

    //Playground
    // self['RogueBM']['xDLStorage'].setData('name', 'buren')
    // var onMessage = function(payload, event) {
    //  //console.log('inject got',payload,event)
    //  var data = payload.data;
    //  switch (payload.method) {
    //      case 'get':
    //          alert('message data'+ JSON.stringify(payload));
    //          break;
    //      default:
    //          console.error('Unknown method "' + payload.method + '"', payload);
    //      }
    //  };
    // self['RogueBM']['xDLStorage'].getData('name',onMessage);

          


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
            if(obj[name] && obj[name].bind && typeof obj[name] == 'function'){ //if it is a bindable function
                Mock.prototype[name] = obj[name].bind(obj);
            }else{
                Mock.prototype[name] = obj[name];
            }
        });
        var mock = new Mock();
        Mock.prototype=null
        return mock
    }

     
     
     
     


   function getArgsFromUrl(url){ 
        var args = {};  
        url.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {  
            args[decodeURIComponent(key)] = decodeURIComponent(value);  
        });   
        return args;  
    } 
    var RogueRunnerScriptOBJ=(function(){
            var scripts = document.getElementsByTagName('script');  
            var index = scripts.length - 1; 
            if(scripts.length){
                return scripts[index];
            }
        })();


    var args=''
    RogueRunnerScriptOBJ&&getArgsFromUrl(RogueRunnerScriptOBJ.src); 
    //in block notation so closure compiler will 'export' the vairable
    window['RogueBM']['envRefs']={
         window:window,
         document:window.document,
         location:window.document.location
    }
   
     
    function createMockEnv(threadID,processID){
         //win.document.location='http://google.com'
         var mocks = {
             window:mock(window),
             document:mock(window.document,['location']),
             location:mock(window.document.location)
         }

         //build higherarchy 
         mocks.window.document=mocks.document;
         mocks.window.document.location=mocks.location
         mocks.window.location=mocks.location;

         //custom apis
         //mocks.location.href=location.href.toString()

         var refs=RogueBM['envRefs'];
         var alert=mocks.window.alert=function alert(message){
             var skipAlerts=activity.threadID['skipAlerts'];
             if(skipAlerts){return undefined;}
             return refs.window.alert(message);
         }
         var confirm=mocks.window.confirm=function confirm(){
             var autoConfirmAnswer=activity.threadID['autoConfirm'];
             if(typeof autoConfirmAnswer =='boolean'){return autoConfirmAnswer;}
             var args=commandChain['args'];
             if(args.length){
                  var arg=args.shift(); //maybe check if argument is a boolean and enforce it?
                  return !!arg;
             }
             return refs.window.confirm(message,value);
         }
         var prompt=mocks.window.prompt=function prompt(message,value){
             alert('NEED TO IMPLMENT PROMPT')
             RogueBM['getCommandArgs'](currentCommandID)['handoffArgs'];
             if(args.length){
                  var arg=args.shift(); //maybe check if argument is string and enforce it?
                  return arg;
             }
             return refs.window.prompt(message,value);
         }

         var checkedWindows
         var getSelection=function getSelection(){
             var win,doc;
             if(this==mocks.window){
                 win=refs.window
                 doc=refs.window.document
             }else{
                 win=this;
                 doc=this.contentDocument||this.document;
             }
             console.log('getSelection',win,doc);

             var selection=(win.getSelection && win.getSelection() || doc.getSelection && doc.getSelection() || doc.selection && doc.selection.createRange && doc.selection.createRange().text).toString()
             if(selection){
               return selection
             }
             //try to get from frames
             // for(var i=0,l=window.frames.length;i<l;i++){
             //   //call document this way because of IE
             //   //https://stackoverflow.com/questions/17197084/difference-between-contentdocument-and-contentwindow-javascript-iframe-frame-acc
             //   try{
             //       console.log('iframe index',i)
             //       selection=getSelection.call(window.frames[i]); // /*.contentWindow note: that is the contentWindow*/ ,window.frames[i].contentDocument);
             //   }catch(error1){
             //       continue;
             //   }
             //   if(selection){
             //     return selection;
             //     }
             // }
         }
         mocks.window.getSelection=getSelection.bind(mocks.window)
         mocks.document.getSelection=getSelection.bind(mocks.document)

         mocks.document.selection={
             'createRange':function(){
                 return {'text': mocks.window.getSelection()}
             }
         }
          return mocks
     ///////////END MOCKS CODE //////
    }
     
     
     
    //pakage first needs to be extracte from container
    window['RogueBM']['cacheCommand']=function(path,container,paramNames,options){

        if(!cachedCommands[path]){
           cachedCommands[path]={container:container,path:path,options:options,paramNames:paramNames};//function(){window['RogueBM']['processTick'](package,options,args,filename)}
        }

        window['RogueBM']['processTick']()
    }

    function argMap(paramNames, kwargs){
        if(!paramNames){
            throw 'no array of paramNames to map';
            return
        }
        var args=[]
        for(var i=0,l=paramNames.length;i<l;i++){
           var key = paramNames[i];
           args[i]=kwargs[key];
        }
        return args
    }

    var blocked=0
    window['RogueBM']['processTick']=function(){
        if(!blocked){
            blocked=setTimeout(function(){tick()},1);
        }
    }

    function garbageCollect(thread){
        if(thread.error||thread.killed||thread.complete){ //garbage collection
            //using a thread getter so that we wont have a circular reference if I want to jsonify it later
            thread.callback&&thread.callback((thread.error&&{threadID:thread.threadID,error:thread.error,threadGetter:function(){return thread}}),thread.stdout[thread.stdout.length-1])
            inactiveThreads.push(thread)
            activity[threadID]=null
            delete activity[threadID]

            
            if(inactiveThreads.length>processHistoryMaxLength){
                inactiveThreads.shift()
                //if(Date.now()-thread.killed>(60*60*1000)){ //garbage collect every ho
                
            }
                         return true
        }
    }

    var processHistoryMaxLength=10;
    var inactiveThreads=[]
    function tick(){
        blocked=0
        var activeThreadIDs=Object.keys(activity).sort()
        for(var i=0,l=activeThreadIDs.length;i<l;i++){
            var threadID=activeThreadIDs[i]
            var thread=activity[threadID]

            if(thread.processes.length==thread.stdout.length){
                thread.complete=Date.now();
            }

            if(garbageCollect(thread)){
               continue
               }



            if(thread.currentProcessIndex!=thread.stdout.length){
                //TODO check for ArgPromiseRef instances and set thread to pending if any exist

                thread.pending=null

                //init a thread
                var proc=thread.processes[thread.stdout.length]; //scriptEntry:,rawCMD:,args:args,processID:})

                var pending = Object.keys(proc.args).some(function(key){
                    var arg = proc.args[key];
                    if(arg instanceof ArgPromiseRef){
                        if(arg.hasOwnProperty('error')){
                            thread.error=arg.error
                            thread.killed=Date.now()
                            garbageCollect(thread)
                            return true
                        }
                        if(!arg.hasOwnProperty('value')){
                            thread.pending=arg.childThreadID;
                            return true;
                        }
                        //if theres a value then replace it silentely and keep going
                        proc.args[key]=arg.value;
                    }
                    return false;
                })
                if(pending){
                    continue;
                }

        
                var cache=cachedCommands[proc.scriptEntry.path]; //{container:,filename:,options:,paramNames:}
                if(!cache){
                    continue
                }

                var mocksModeDisabled=true
                var kwargs=null
                if(!mocksModeDisabled && cache.options.mode=="useMocks"){
                    kwargs=createMockEnv(threadID,proc.processID)
                }else{
                    kwargs={window:window,
                      document:window.document,
                      alert:window.alert,
                      confirm:window.confirm,
                      location:window.document.location,
                      prompt:window.prompt,
                      open:window.open
                    }
                      
                }
                //constants
                kwargs.RogueBM=window['RogueBM'];
                kwargs.next=function(returnValue){
                    thread.stdout.push(returnValue)
                    RogueBM['processTick']()
                }
                kwargs.stdin=thread.stdout[thread.stdout.length-1]
         
                var package = cache.container.apply(cache.container,argMap('window,document,location,alert,prompt,confirm,open,RogueBM,stdin,next'.split(','),kwargs));

                //call tick again since we did a call
                RogueBM['processTick']()
                thread.active=Date.now();
                thread.currentProcessIndex=thread.stdout.length
                var returnValue;
                if(Array.isArray(proc.args)){
                    returnValue=package.apply(package,proc.args);
                }else{
                    returnValue=package.apply(package,argMap(cache.paramNames,proc.args));
                }

                if(!cache.options.isAsync){
                    kwargs.next(returnValue)
                }

            }


        }


    }






    //     //check chain for next execution
    //     //check cache for if it has a cached function

    //     var type = typeof args;
    //     if(Array.isArray(args)){
    //         package.apply(package,args)
    //     }else if(type=='object'){
    //         fn.apply(fn,argMap(fn,argNames,params));
    //     }else if (type == 'string'){
    //         package(args);
    //     }


    //     var commandMetaData=commandChain[currentCommandID];
    //     var args=commandMetaData.args;
    //     if(mode){
    //        var mocks=RogueBM['mocks']||mode;
    //        var refs=window['RogueBM']['envRefs']
    //        package.apply(mocks.window,[mocks.window,mocks.window.document,mocks.window.location,mocks.window.prompt,mocks.window.alert,mocks.window.confirm])
    //         //cleanup and check for inconsistantcies 
    //         //check location and location href
    //         if(mocks.document.location.href != refs.location.href){
    //             refs.location.href=mocks.document.location.href
    //         }
    //         if(mocks.document.location.toString() != refs.document.location.toString()){
    //             refs.document.location=mocks.document.location.toString()
    //         }
    //     }else{
    //        package(window,document,location,prompt,alert,confirm)
    //     }
    // }
    window['RogueBM']['show']=show;
    window['RogueBM']['hide']=hide;
    window['RogueBM']['run']=run;
    window['RogueBM']['loadScript']=inject;
    if(window['RogueBM']['cmd']){ 
        window['RogueBM']['run'](window['RogueBM']['cmd']); 
    }else if(args.cmd){ 
        window['RogueBM']['run'](args.cmd); 
    }


    var ArgPromiseRef = function ArgPromiseRef(childThreadID){
        this.childThreadID=childThreadID;
    };


    var isInit=false;
    window['RogueBM']['init']=function(){
        if(!isInit){ //init once
            console.info('init RogueRunner');
            isInit=true;

            nestedThread = new jsyaml.Type('!subRun', {
               kind: 'sequence',
               construct: function (data) {
                data.forEach(function (obj) {
                    if(typeof obj != 'object'){
                        throw "Roguetine must be array of RogueBookmarklets"
                    }else if(Array.isArray(obj)){
                        throw "Roguetine must be array of RogueBookmarklets"
                    }
                });

                var callback=function(err,value){
                    ref.error=err;
                    ref.value=value;
                    RogueBM.processTick();
                }
                var childThreadID=RogueBM.run(data,callback);
                var ref=new ArgPromiseRef(childThreadID);
                return ref;
               }
            });

            rogueSchema = jsyaml.Schema.create([ nestedThread ]);




            //go ahead and prepopulate suggestions
            getSuggestions()
            //RogueRunner completely loaded
            var lastCMD=RogueBM.lastCMD;
            if(lastCMD){
                console.info('running injected cmd')
                RogueBM.run(lastCMD);
            }
        }
      }
    
    
    //set up hotkey to show/hide
    document.addEventListener('keyup', function doc_keyUp(e) {
        // this would test for ~ and the ctrl key at the same time
        if (e.ctrlKey && e.keyCode == 192) {
            // call your function to do the thing
            show()
        }
    }, false);

    //send loaded signal
    window['RogueBM']['loaded']('RogueRunner.js')
//usersessions
})(window,document,location,alert,prompt,confirm)
