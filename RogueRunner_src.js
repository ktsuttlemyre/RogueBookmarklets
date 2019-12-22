(function(user,devMode) {
    window['RogueBookmarklets']=window['RogueBookmarklets'] || {} //in block notation so closure compiler will 'export' the vairable
    if(window['RogueBookmarklets']['show']){
        return window['RogueBookmarklets']['show']()
    }
    ///////////////////////
    // start the index download asap
    var keys = [] //init when scripts are loaded
    appendToHead(ScriptOBJ('https://ktsuttlemyre.github.io/RogueBookmarklets/index.js'+user));
    function scriptIndexReady(){
        if (!window.scripts) {
            return setTimeout(scriptIndexReady, 0);
        }
        keys = Object.keys(window.scripts)
    }
    scriptIndexReady()

    ///////////////////////
    //  helper functions
    function appendToHead(el,callback) {
        document.getElementsByTagName('head')[0].appendChild(el);
        if(callback){
            el.onload=callback
        }
    }

    function loadFromIframe(url){
        //start the injection
        self['RogueBookmarklets']['xDomainStorage'].getScript(url,function(payload){
            var s = document.createElement('script');
            s.setAttribute('type', 'text/javascript');
            s.appendChild(document.createTextNode(payload.data)); 
            document.getElementsByTagName('head')[0].appendChild(s);
        })
    }

    function ScriptOBJ(src,code) { //callback might not work
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        if(src){
            script.setAttribute('src',src);
            script.setAttribute('crossorigin', "anonymous");
            script.onerror = function(){loadFromIframe(src)} //function(a,b,c){statusBar.innerHTML='RogueBookmarklets:Error loading \n '+src}
        }else{
            try {
                script.appendChild(document.createTextNode(code));
            } catch (e) {
                script.text = code;
            }
        }
        return script
    }


    function UUID(){return Math.floor(Math.random()*9000000000) + 1000000000;}

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

        '#RogueRunner #RogueRunner_div > #input {'+
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

        '#RogueRunner #RogueRunner_div #input:focus ~ .status_bar{'+
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

'align-content:normal;'+
'align-items:normal;'+
'align-self:auto;'+
'alignment-baseline:auto;'+
'animation-delay:0s;'+
'animation-direction:normal;'+
'animation-duration:0s;'+
'animation-fill-mode:none;'+
'animation-iteration-count:1;'+
'animation-name:none;'+
'animation-play-state:running;'+
'animation-timing-function:ease;'+
'backdrop-filter:none;'+
'backface-visibility:visible;'+
'background-attachment:scroll;'+
'background-blend-mode:normal;'+
'background-clip:border-box;'+

'background-image:none;'+
'background-origin:padding-box;'+
'background-position-x:0%;'+
'background-position-y:0%;'+
'background-size:auto;'+
'baseline-shift:0px;'+
'block-size:666px;'+
'border-block-end-color:rgb(0, 0, 0);'+
'border-block-end-style:none;'+
'border-block-end-width:0px;'+
'border-block-start-color:rgb(0, 0, 0);'+
'border-block-start-style:none;'+
'border-block-start-width:0px;'+
'border-bottom-color:rgb(0, 0, 0);'+
'border-bottom-left-radius:0px;'+
'border-bottom-right-radius:0px;'+
'border-bottom-style:none;'+
'border-bottom-width:0px;'+
'border-collapse:separate;'+
'border-image-outset:0px;'+
'border-image-repeat:stretch;'+
'border-image-slice:100%;'+
'border-image-source:none;'+
'border-image-width:1;'+
'border-inline-end-color:rgb(0, 0, 0);'+
'border-inline-end-style:none;'+
'border-inline-end-width:0px;'+
'border-inline-start-color:rgb(0, 0, 0);'+
'border-inline-start-style:none;'+
'border-inline-start-width:0px;'+
'border-left-color:rgb(0, 0, 0);'+
'border-left-style:none;'+
'border-left-width:0px;'+
'border-right-color:rgb(0, 0, 0);'+
'border-right-style:none;'+
'border-right-width:0px;'+
'border-top-color:rgb(0, 0, 0);'+
'border-top-left-radius:0px;'+
'border-top-right-radius:0px;'+
'border-top-style:none;'+
'border-top-width:0px;'+
'bottom:0px;'+
'box-shadow:none;'+
'box-sizing:content-box;'+
'break-after:auto;'+
'break-before:auto;'+
'break-inside:auto;'+
'buffered-rendering:auto;'+
'caption-side:top;'+
'caret-color:rgb(0, 0, 0);'+
'clear:none;'+
'clip:auto;'+
'clip-path:none;'+
'clip-rule:nonzero;'+
'color:rgb(0, 0, 0);'+
'color-interpolation:srgb;'+
'color-interpolation-filters:linearrgb;'+
'color-rendering:auto;'+
'column-count:auto;'+
'column-fill:balance;'+
'column-gap:normal;'+
'column-rule-color:rgb(0, 0, 0);'+
'column-rule-style:none;'+
'column-rule-width:0px;'+
'column-span:none;'+
'column-width:auto;'+
'contain:none;'+
'content:normal;'+
'counter-increment:none;'+
'counter-reset:none;'+
'cursor:auto;'+
'cx:0px;'+
'cy:0px;'+
'd:none;'+
'direction:ltr;'+
'dominant-baseline:auto;'+
'empty-cells:show;'+
'fill:rgb(0, 0, 0);'+
'fill-opacity:1;'+
'fill-rule:nonzero;'+
'filter:none;'+
'flex-basis:auto;'+
'flex-direction:row;'+
'flex-grow:0;'+
'flex-shrink:1;'+
'flex-wrap:nowrap;'+
'float:none;'+
'flood-color:rgb(0, 0, 0);'+
'flood-opacity:1;'+
'font-family:Times;'+
'font-feature-settings:normal;'+
'font-kerning:auto;'+
'font-optical-sizing:auto;'+
'font-size:16px;'+
'font-stretch:100%;'+
'font-style:normal;'+
'font-variant-caps:normal;'+
'font-variant-east-asian:normal;'+
'font-variant-ligatures:normal;'+
'font-variant-numeric:normal;'+
'font-variation-settings:normal;'+
'font-weight:400;'+
'grid-auto-columns:auto;'+
'grid-auto-flow:row;'+
'grid-auto-rows:auto;'+
'grid-column-end:auto;'+
'grid-column-start:auto;'+
'grid-row-end:auto;'+
'grid-row-start:auto;'+
'grid-template-areas:none;'+
'grid-template-columns:none;'+
'grid-template-rows:none;'+
'hyphens:manual;'+
'image-rendering:auto;'+
'inline-size:602px;'+
'isolation:auto;'+
'justify-content:normal;'+
'justify-items:normal;'+
'justify-self:auto;'+

'letter-spacing:normal;'+
'lighting-color:rgb(255, 255, 255);'+
'line-break:auto;'+
'line-height:normal;'+
'list-style-image:none;'+
'list-style-position:outside;'+
'list-style-type:disc;'+
'margin-block-end:0px;'+
'margin-block-start:0px;'+
'margin-bottom:0px;'+
'margin-inline-end:0px;'+
'margin-inline-start:0px;'+
'margin-left:0px;'+
'margin-right:0px;'+
'margin-top:0px;'+
'marker-end:none;'+
'marker-mid:none;'+
'marker-start:none;'+
'mask:none;'+
'mask-type:luminance;'+
'max-block-size:none;'+
'max-height:none;'+
'max-inline-size:none;'+
'max-width:none;'+
'min-block-size:0px;'+
'min-height:0px;'+
'min-inline-size:0px;'+
'min-width:0px;'+
'mix-blend-mode:normal;'+
'object-fit:fill;'+
'object-position:50% 50%;'+
'offset-distance:0px;'+
'offset-path:none;'+
'offset-rotate:auto 0deg;'+
'opacity:1;'+
'order:0;'+
'orphans:2;'+
'outline-color:rgb(0, 0, 0);'+
'outline-offset:0px;'+
'outline-style:none;'+
'outline-width:0px;'+
'overflow-wrap:normal;'+
'overscroll-behavior-block:auto;'+
'overscroll-behavior-inline:auto;'+
'overscroll-behavior-x:auto;'+
'overscroll-behavior-y:auto;'+
'padding-block-end:0px;'+
'padding-block-start:0px;'+
'padding-bottom:0px;'+
'padding-inline-end:0px;'+
'padding-inline-start:0px;'+
'padding-left:0px;'+
'padding-right:0px;'+
'padding-top:0px;'+

'paint-order:normal;'+
'perspective:none;'+
'perspective-origin:301px 333px;'+
'pointer-events:auto;'+

'r:0px;'+
'resize:none;'+
'right:0px;'+
'row-gap:normal;'+
'rx:auto;'+
'ry:auto;'+
'scroll-behavior:auto;'+
'scroll-margin-block-end:0px;'+
'scroll-margin-block-start:0px;'+
'scroll-margin-bottom:0px;'+
'scroll-margin-inline-end:0px;'+
'scroll-margin-inline-start:0px;'+
'scroll-margin-left:0px;'+
'scroll-margin-right:0px;'+
'scroll-margin-top:0px;'+
'scroll-padding-block-end:auto;'+
'scroll-padding-block-start:auto;'+
'scroll-padding-bottom:auto;'+
'scroll-padding-inline-end:auto;'+
'scroll-padding-inline-start:auto;'+
'scroll-padding-left:auto;'+
'scroll-padding-right:auto;'+
'scroll-padding-top:auto;'+
'scroll-snap-align:none;'+
'scroll-snap-stop:normal;'+
'scroll-snap-type:none;'+
'shape-image-threshold:0;'+
'shape-margin:0px;'+
'shape-outside:none;'+
'shape-rendering:auto;'+

'speak:normal;'+
'stop-color:rgb(0, 0, 0);'+
'stop-opacity:1;'+
'stroke:none;'+
'stroke-dasharray:none;'+
'stroke-dashoffset:0px;'+
'stroke-linecap:butt;'+
'stroke-linejoin:miter;'+
'stroke-miterlimit:4;'+
'stroke-opacity:1;'+
'stroke-width:1px;'+
'tab-size:8;'+
'table-layout:auto;'+
'text-align:start;'+
'text-align-last:auto;'+
'text-anchor:start;'+
'text-combine-upright:none;'+
'text-decoration-color:rgb(0, 0, 0);'+
'text-decoration-line:none;'+
'text-decoration-skip-ink:auto;'+
'text-decoration-style:solid;'+
'text-indent:0px;'+
'text-orientation:mixed;'+
'text-overflow:clip;'+
'text-rendering:auto;'+
'text-shadow:none;'+
'text-size-adjust:auto;'+
'text-transform:none;'+
'text-underline-position:auto;'+

'touch-action:auto;'+
'transform:none;'+
'transform-box:view-box;'+
'transform-origin:301px 333px;'+
'transform-style:flat;'+
'transition-delay:0s;'+
'transition-duration:0s;'+
'transition-property:all;'+
'transition-timing-function:ease;'+
'unicode-bidi:normal;'+
'user-select:auto;'+
'vector-effect:none;'+
'vertical-align:baseline;'+
'visibility:visible;'+
'white-space:normal;'+
'widows:2;'+
'will-change:auto;'+
'word-break:normal;'+
'word-spacing:0px;'+
'writing-mode:horizontal-tb;'+
'x:0px;'+
'y:0px;'+
'zoom:1;'+
''+


        '}'+


        '';

    //attach the above text as a style tag to the document head
    var css = document.createElement("style");
    css.type = "text/css";
    if ("textContent" in css)
        css.textContent = cssText;
    else
        css.innerText = cssText;
    appendToHead(css);



    ///////////////////////
    // Create modal; 
    var modalBackdropDiv = document.createElement('div');
    modalBackdropDiv.id = 'RogueRunner';

    var modalPane = document.createElement('div');
    modalPane.className = 'modal-content';
    modalBackdropDiv.appendChild(modalPane);


    ///////////////////////
    // input for rogue runner
    var runnerWrapper = document.createElement('div');
    runnerWrapper.id = 'RogueRunner_div';
    modalPane.appendChild(runnerWrapper);

    var input = document.createElement('input');
    input.id = "input";
    input.type = 'text';
    input.onkeyup = function(evt) {
        var keycode = keyCode(evt)
        if(!statusBar_isLink){
            statusBar.innerHTML='';
            statusBar.appendChild(rogueLink)
        }
        if(keycode==13){ //enter will focus again
            
            var focused = getFocusedElement();
            if(focused && focused.className && focused.className.indexOf('Rogue_suggestion_link') > -1){
                run(focused.title)
            }
            run()
            return
        }
        getSuggestions(this.value)
    }
    runnerWrapper.appendChild(input);


    var statusBar_isLink=true;
    var rogueLink= document.createElement('a');
        rogueLink.appendChild(document.createTextNode('RogueRunner'));
        rogueLink.title = 'RogueRunner';
        //a.className = 'Rogue_suggestion_link RogueRunner_animate'
        rogueLink.href = "https://ktsuttlemyre.github.io/RogueBookmarklets/";
        rogueLink.tabIndex=-1;


    var statusBar = document.createElement('span');
    //statusBar.id = 'statusBar'
    statusBar.className = 'status_bar'
    statusBar.appendChild(rogueLink)
    //statusBar.appendChild(document.createTextNode('RogueRunner'));
    runnerWrapper.appendChild(statusBar)

    var resultPane = document.createElement('p');
    resultPane.id="result_pane";
    resultPane.className='RogueRunner_collapsed RogueRunner_animate'
    runnerWrapper.appendChild(resultPane);


    //  Use this micro framework to see if the dom is ready
    //some modifications to make it init faster
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
    // Append the modal to the body
    // this is done after all html elements are nested
    // and after dom is ready
    // this prevents unnessisisary redraws
    ///////////////////////
    domready(function() {
        //add interface to dom
        document.body.appendChild(modalBackdropDiv);
        //make sure to show it and run any patching of the environment
        show();
    });


    var cacheWgetSelection=window.getSelection;
    var cacheDgetSelection=document.getSelection;
    function show(){
        input.value=''
        cacheWgetSelection=window.getSelection;
        cacheDgetSelection=document.getSelection;

        //Patch the getselection function
        //try to get selection from document and then window
        var selectedTextCache=document.getSelection() || window.getSelection();

        //try to get from frames
        for(i=0;i<frames.length;i++){
            if(selectedTextCache){
                break;
            }
            selectedTextCache=frames[i].document.getSelection() || frames[i].window.getSelection();
        }

        window.getSelection=document.getSelection=function(){
            return selectedTextCache || prompt('Enter parameter','');
        }

        modalBackdropDiv.style.display = "block";

        //make the input active so we can type without anymore inputs
        input.focus()
        //go ahead and prepopulate suggestions
        getSuggestions()
    }
    function getFocusedElement(){
        var focused = document.activeElement;
        if (!focused || focused == document.body)
            focused = null;
        else if (document.querySelector)
            focused = document.querySelector(":focus");
        return focused
    }
    function hide(){

        //unpatch
        document.getSelection=cacheDgetSelection
        window.getSelection=cacheWgetSelection

        modalBackdropDiv.style.display = "none";
        input.value='';
    }

    var linkCache={};
    function generateSelectionLink(key){
        if(linkCache[key]){
            return linkCache[key]
        }
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(key));
        a.title = key;
        a.className = 'Rogue_suggestion_link RogueRunner_animate'
        a.href = "javascript:RogueBookmarklets.run(\'"+key+"\')";
        a.tabIndex=0;
        //a.onfocus = "RogueBookmarklets.setSelection(\'"+key+"\')";
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
    function searchScripts(input) {
        input=input||''
        var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
        var list = [] //new list each time
        
        var numberOfSuggestions=keys.length
        if(!input.length){
            numberOfSuggestions=5
            if(defaultSuggestions.length){
                return defaultSuggestions
            }
        }
        
        for (var i = 0; i < numberOfSuggestions; i++) {
            var key = keys[i]
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
        if(!keys.length){
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
            resultPane.className+=' RogueRunner_collapsed'
        }
        //for(var i=0;i<suggestionResult.length;i++){
        //}
        currentSuggestions = suggestionResult
    }

    function keyCode(evt){
        return evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    }

    function inputFocus(){input.focus()}
    ///////////////////
    //  load hotkeys
    document.onkeyup = function(evt) {
        //TODO handle this with show hide possibly? to leave the environment as it was before roguerunner ran
        if(modalBackdropDiv.style.display == "none"){
            return
        }
        var keycode=keyCode(evt)
        if (keycode == 27) { //escape hides the window
            hide()
        }else if(keycode==8){ //delete will force focus on input as well as delete
            setTimeout(inputFocus);
        }else if(keycode==13){ //enter will focus again
            setTimeout(inputFocus);
        }
    }

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(evt) {
        //TODO handle this with show hide possibly? to leave the environment as it was before roguerunner ran
        if (evt.target == modalBackdropDiv) {
            hide()
        }
    }

    function run(key){
        //no key, then get the first suggestion script obj
        var script=scripts[key] 

        if(!script){
            script = (url=currentSuggestions[0] && scripts[currentSuggestions[0].title])
        }

        //now we have a script obj or string
        //download the src if it exists OR run the string
        if(!script){
            statusBar_isLink=false
            statusBar.innerHTML="Nothing to execute";
            return
        }

        //potential api to send arguments to roguebookmarks
        RogueBookmarklets.key=key
        RogueBookmarklets.arguments=[]
        if(script.src){
            appendToHead(ScriptOBJ(script.src))
        }else{
            appendToHead(ScriptOBJ('',script))
        }
    }

    var CrossOriginLocalStorage = window['RogueBookmarklets']['CrossOriginLocalStorage']
    if(!CrossOriginLocalStorage){
        //TODO inject CrossOriginLocalStorage via injection script
        alert('CrossOriginLocalStorage not loaded!')
    }
    var extendCrossOriginLocalStorage= function(CrossOriginLocalStorage){
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
    extendCrossOriginLocalStorage(window['RogueBookmarklets']['CrossOriginLocalStorage'])

    //Playground
    // self['RogueBookmarklets']['xDomainStorage'].setData('name', 'buren')
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
    // self['RogueBookmarklets']['xDomainStorage'].getData('name',onMessage);





    //in block notation so closure compiler will 'export' the vairable
    window['RogueBookmarklets']['show']=show
    window['RogueBookmarklets']['run']=run

//usersessions
})("")

