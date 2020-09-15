(function(user,devMode) {
     // pollyfill for date.now
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }


    window['RogueBM']=window['RogueBM'] || {}; //in block notation so closure compiler will 'export' the vairable
    if(window['RogueBM']['show']){
        return window['RogueBM']['show']();
    }


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
        callback.apply(callback, args)}
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
    
    var multiLineInput=document.createElement('textarea');
    multiLineInput.name="text";
    multiLineInput.oninput=function(){
        this.style.height = "";
        this.style.height = this.scrollHeight +3 + "px";
    }
    multiLineInput.id="multiline-input";
    multiLineInput.style.display='none';
    multiLineInput.style.width='100%';

    var input = document.createElement('input');
    input.id = "input";
    input.type = 'text';
    input.autocomplete="off";
    input.style.display='block';
    input.onkeyup = multiLineInput.onkeyup function(evt) {
        var keycode = keyCode(evt)
        if(!statusBar_isLink){
            statusBar.innerHTML='';
            statusBar.appendChild(rogueLink)
        }
        if(keycode == 13){ //enter will focus again
	    if(evt.shiftKey){
		    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
		    var display=input.style.display;
		    input.style.display=(display=='block')?'none':'block';
		    multiLineInput.style.display=display
		    return false
	    }    
            var focused = getFocusedElement();
            if(focused && focused.className && focused.className.indexOf('Rogue_suggestion_link') > -1){
                run(focused.title)
            }
            run(input.value)
            return
        }
        getSuggestions(this.value)
    }
    runnerWrapper.appendChild(input);
    runnerWrapper.appendChild(multiLineInput);

    var statusBar_isLink=true;
    var rogueLink= document.createElement('a');
        rogueLink.appendChild(document.createTextNode('RogueRunner'));
        rogueLink.title = 'RogueRunner';
        //a.className = 'Rogue_suggestion_link RogueRunner_animate'
        rogueLink.href = "https://ktsuttlemyre.github.io/RogueBookmarklets/";
        rogueLink.tabIndex=-1;

    var statusBar = document.createElement('span');
    //statusBar.id = 'statusBar'
    statusBar.className = 'status_bar';
    statusBar.appendChild(rogueLink);
    //statusBar.appendChild(document.createTextNode('RogueRunner'));
    runnerWrapper.appendChild(statusBar);

    var resultPane = document.createElement('p');
    resultPane.id="result_pane";
    resultPane.className='RogueRunner_collapsed RogueRunner_animate'
    runnerWrapper.appendChild(resultPane);

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
        input.value=''

        modalBackdropDiv.style.display = "block";

        //make the input active so we can type without anymore inputs
        input.focus()
    }
     
     function normalizeCommandToScriptName(name){
          //Because commands can be in camelcase, pascal case, snake case, underscore case, URI encoded or even have spaces
          //this will take a command name and convert it to the hyphanated script name in the repository
          return decodeURIComponent(name).replace(/[\u0000-\u0030\u003A-\u0040\u005B-\u0060\u007B-\u00A0]/gi,' ').replace(/(?:^|\.?)([A-Z])/g, function (x,y){return " " + y.toLowerCase()}).trim().replace(/\s+/gi,'-')
     }

    function isShown(){ //idk if i need this?
      return modalBackdropDiv.style.display == "block";
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
        if(parent!== window){
          parent.postMessage("RogueRunner:Blur",'*');
        }else{
             modalBackdropDiv.style.display = "none";
        }
        input.value='';
    }
     
     function loadBookmarklet(loading){
          if(loading){
          }else{
          }
     }

    var linkCache={};
    function generateSelectionLink(key){
        if(linkCache[key]){
            return linkCache[key]
        }
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(key));
        a.title = key;
        a.className = 'Rogue_suggestion_link Roguener_animate'
        a.href = "javascript:RogueBM.run(\'"+key+"\')";
        a.tabIndex=0;
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

    function inputFocus(){input.focus()};
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


    // http://nodeca.github.io/js-yaml/#yaml=Um9ndWVSdW5uZXI6CiAgLSBnZXRMb2NhdGlvbjoKICAgICAgLSB8CiAgICAgICAgYXNkZgogICAgICAgIHNzCiAgICAgICAgCiAgICAgICAgYWRzZmEKICAgICAgLSAxMS8yNy8yMDE1CiAgICAgIC0KICAgICAgLSBhbm90aGVyIGFyZwogICAgICAtIGZpbmFsIGFyZwogICAgICAtIFsxLDIsMyw0XQogICAgICAtIHsgJ3NheSc6J2phdnNjcmlwdCBvYmonIH0KICAtIHRvV2luZG93OgogICAgICB1bm9yZGVyZCBsaXN0OiBzb21ldGhpbmcgbGlrZSB0aGlzCiAgICAgIG11bHRpbGluZTogfAogICAgICAgIHNkZmEgYQogICAgICAgIGFzZGYKICAgICAgICBhYWRmCiAgICAgICAgYWEKICAgICAgYXJnczogMTEvMjYvMjAxNQ==
    function run(rogueYML){
    	if(!rogueYML){
    		statusBar.innerHTML="Nothing to execute";
    		return
    	}
    	RogueBM.lastInput=rogueYML;
    	var parsed=jsyaml.load(rogueYML);
	if(typeof parsed == 'string'){
    		var obj={};
		obj[parsed]=[];
		parsed=obj;
        }
	    
	if(!Array.isArray(parsed)){
		parsed=[parsed];
    	}
	    
	commands=parsed;
    	for(var index=0,l=commands.length;index<l;index++){
    		var command=commands[index]
    		var keys=Object.keys(command)
		if(keys.length!=1){
			alert('Currently not accepting unordered commands');
			alert('Schema Error see console. For issues')
    			console.error('Schema structure looks like this and RogueRunner doesn\'t know how to handle it',index,command,keys,commands);
			return
		}
    		handleCommand(keys[0],command[keys[0]])//command and arguments seperated
    	}
	//input.value='';
    }
    function handleCommand(inputCommand,args){
    	var normalizedCommand=normalizeCommandToScriptName(inputCommand);
    	if(inputCommand){
	        //assume user put in the right scriptname
	        script=window.RogueBM.scripts[inputCommand]  
	        if(!script){  //no script goes by key name then try to normalize the key
	        	script=window.RogueBM.scripts[normalizedCommand];
	        	if(!script){// if that fails then get the first suggestion script obj  
	            	script = (currentSuggestions[0] && window.RogueBM.scripts[currentSuggestions[0].title])
	            }
	        }
	    }

        //now we have a script obj or string
        //download the src if it exists OR run the string
        if(!script){
            statusBar_isLink=false
            statusBar.innerHTML="Nothing to execute";
            return
        }

        //potential api to send arguments to roguebookmarks
        var commandID=RogueBM.commandChain.length
        if(RogueBM.currentCommandID==-1){
        	RogueBM.currentCommandID=commandID
        }
        var command={
        	inputCommand:inputCommand,
        	normalizedCommand:normalizedCommand,
        	script:script,
        	src:script.src,
        	args:args,
        	commandID:commandID
        }
        RogueBM.commandChain.push(command);

        //async calls
        if(script.src){ //if we get a script obj use the src attribute
            inject(script.src,'javascript',true)
        }else{ //if it is a string assume its code
            inject(script,'javascript')
        }
        RogueBM.lastCMD=inputCommand;
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

   function toggleMultiline(){
      
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
    window['RogueBM']['currentCommandID']=-1
    window['RogueBM']['commandChain']=[]
    window['RogueBM']['execute']=function(packge,filename,mode){
         //TODO fix the loading situation
         var index = waitingForBookmarklet.indexOf(filename);
         var item=null
          if (index > -1) {
            item=waitingForBookmarklet[index]
            waitingForBookmarklet.splice(index, 1);
          }
         if(item){
              
         }
         loadedBookmarklet('filename')
         hide()
         var commandMetaData=RogueBM.commandChain[RogueBM.currentCommandID];
         var args=commandMetaData.args;
         if(mode){
            var mocks=RogueBM['mocks']||mode;
            var refs=window['RogueBM']['envRefs']
            package.apply(mocks.window,[mocks.window,mocks.window.document,mocks.window.location,mocks.window.prompt,mocks.window.alert,mocks.window.confirm])
             //cleanup and check for inconsistantcies 
             //check location and location href
             if(mocks.document.location.href != refs.location.href){
                 refs.location.href=mocks.document.location.href
             }
             if(mocks.document.location.toString() != refs.document.location.toString()){
                 refs.document.location=mocks.document.location.toString()
             }
         }else{
            package(window,document,location,prompt,alert,confirm)
         }
    }
    window['RogueBM']['show']=show;
    window['RogueBM']['hide']=hide;
    window['RogueBM']['run']=run;
    window['RogueBM']['loadScript']=inject;
    if(window['RogueBM']['cmd']){ 
        window['RogueBM']['run'](window['RogueBM']['cmd']); 
    }else if(args.cmd){ 
        window['RogueBM']['run'](args.cmd); 
    }
    var init=false;
    var initScripts=['RogueRunner.js','index.js','js-yaml.min.js']
    var loadedScripts=[]
    window['RogueBM']['loaded']=function(name,secret){
         console.log('loaded',name)
	var split=name.split('/');
	name=split[split.length-1];
        loadedScripts.push(name)
        
        var startInit=(!init && loadedScripts.filter(function (elem) {
            return initScripts.indexOf(elem) > -1;
        }).length == initScripts.length)
        if(startInit){ //init once
            console.info('init RogueRunner');
            init=true;
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
})("")
