(function(user,devMode) {
    if(window['RogueBookmarks']&&window['RogueBookmarks'].show){
        return RogueBookmarks.show()
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

    function ScriptOBJ(src,code) { //callback might not work
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        if(src){
            script.setAttribute('src',src);
            script.setAttribute('crossorigin', "anonymous");
            script.onerror = function(a,b,c){statusBar.innerHTML='RogueBookmarks:Error loading \n '+src}
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
        '#RogueRunner {'+
            'position: fixed;'+ /* Stay in place */
            'z-index: 2147483647;'+ /* Sit on top */
            'left: 0;'+
            'top: 0;'+
            'width: 100%;'+ /* Full width */
            'height: 100%;'+ /* Full height */
            'overflow: auto;'+ /* Enable scroll if needed */
            'background-color: rgb(0,0,0);'+ /* Fallback color */
            'background-color: rgba(0,0,0,0.4);'+ /* Black w/ opacity */
        '}'+

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
        '}';

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
        a.href = "javascript:RogueBookmarks.run(\'"+key+"\')";
        a.tabIndex=0;
        //a.onfocus = "RogueBookmarks.setSelection(\'"+key+"\')";
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
    document.onkeydown = function(evt) {
        //TODO handle this with show hide possibly? to leave the environment as it was before roguerunner ran
        if(modalBackdropDiv.style.display == "none"){
            return
        }
        var keycode=keyCode(evt)
        if (keycode == 27) { //escape hides the window
            hide()
        }else if(keycode==8){ //delete will force focus on input as well as delete
            setTimeout(inputFocus)
        }else if(keycode==13){ //enter will focus again
            input.focus();
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
        var script=scripts[key] || (url=currentSuggestions[0] && scripts[currentSuggestions[0].title])

        //now we have a script obj or string
        //download the src if it exists OR run the string
        if(!script){
            statusBar_isLink=false
            statusBar.innerHTML="Nothing to execute";
            return
        }

        RogueBookmarks.key=key
        RogueBookmarks.arguments=[]
        if(script.src){
            appendToHead(ScriptOBJ(script.src))
        }else{
            appendToHead(ScriptOBJ('',script))
        }
    }

    window['RogueBookmarks']=window['RogueBookmarks']||{run:run,show:show} //in block notation so closure compiler will 'export' the vairable
//usersession
})("")

