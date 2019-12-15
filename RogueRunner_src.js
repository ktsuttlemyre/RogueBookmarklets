(function(user) {
    if(window.RogueBookmarks){
        RogueBookmarks.show()
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
    function appendToHead(el) {
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    function ScriptOBJ(src,callback) { //callback might not work
        var script = document.createElement('script');
        script.setAttribute('src', src);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('crossorigin', "anonymous");
        script.onerror = function(a,b,c){alert('RogueBookmarks:Error loading \n '+src)}
        if(callback){
            appendToHead(el)
            script.onload=callback
            return
        }
        return script
    }


    var UUID=Math.floor(Math.random()*9000000000) + 1000000000;

    ///////////////////////////
    // CSS for modal and input
    // use this to create a nice long text block
    //https://codebeautify.org/string-builder
    //modal code came from
    //https://www.w3schools.com/howto/howto_css_modals.asp
    var cssText = '   /* The Modal (background) */  ' +
        '   #RogueRunner {  ' +
        //'     display: none; /* Hidden by default */  ' +
        '     position: fixed; /* Stay in place */  ' +
        '     z-index: 1; /* Sit on top */  ' +
        '     left: 0;  ' +
        '     top: 0;  ' +
        '     width: 100%; /* Full width */  ' +
        '     height: 100%; /* Full height */  ' +
        '     overflow: auto; /* Enable scroll if needed */  ' +
        '     background-color: rgb(0,0,0); /* Fallback color */  ' +
        '     background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  ' +
        '   }  ' +
        '     ' +
        '   /* Modal Content/Box */  ' +
        '   #RogueRunner .modal-content {  ' +
        '     background-color: #fefefe;  ' +
        '     margin: 15% auto; /* 15% from the top and centered */  ' +
        '     padding: 20px;  ' +
        '     border: 1px solid #888;  ' +
        '     -webkit-border-radius: 15px;  ' +
        '     -moz-border-radius: 15px;  ' +
        '     border-radius: 15px;  ' +
        '     width: 80%; /* Could be more or less, depending on screen size */  ' +
        '   }  ' +
        '     ' +
        '   /* The Close Button */  ' +
        '   #RogueRunner .close {  ' +
        '     color: #aaa;  ' +
        '     float: right;  ' +
        '     font-size: 28px;  ' +
        '     font-weight: bold;  ' +
        '   }  ' +
        '     ' +
        '   #RogueRunner #RogueRunner_div{  ' +
        '     position: relative;  ' +
        '   }  ' +
        '     ' +
        '   #RogueRunner #RogueRunner_div > #input {  ' +
        '     outline: none;'+
        '     font-size: 1rem;  ' +
        '     height: 1.5rem;  ' +
        '     width: 20rem;  ' +
        '     -webkit-border-radius: 15px;  ' +
        '     -moz-border-radius: 15px;  ' +
        '     border-radius: 15px;  ' +
        '     padding-bottom: 1rem;  ' +
        '     padding-left: 0.5rem;  ' +
        '     padding-right: 0.5rem;  ' +
        '   }  ' +
        '     ' +
        '   #RogueRunner #RogueRunner_div > .placeholder {  ' +
        '     position: absolute;  ' +
        '     font-size: 25px;  ' +
        //'     pointer-events: none;  ' +
        '     left: 1rem;  ' +
        '     bottom: 1px;  ' +
        '     transition: 0.1s ease all;  ' +
        '   }  ' +
        '     ' +
        '    #RogueRunner #RogueRunner_div #input:focus ~ .placeholder{  ' +
        '     bottom: 1px;  ' +
        '     font-size: 13px;  ' +
        '   }  ' +
        '     ' +
        '    .Rogue_suggestion_link{  ' +
        '     margin: .5em;  ' +
       // '     font-size: 13px;  ' +
        '   }  ' +
        '    ';
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


    var paragraph = document.createElement('p');
    modalPane.appendChild(paragraph);

    ///////////////////////
    // input for rogue runner
    var runnerWrapper = document.createElement('div');
    runnerWrapper.id = 'RogueRunner_div';
    paragraph.appendChild(runnerWrapper);

    var input = document.createElement('input');
    input.id = "input";
    input.type = 'text';
    input.onkeyup = function(evt) {
        changeInput(this.value)
    }
    runnerWrapper.appendChild(input);

    var resultBar = document.createElement('span');
    resultBar.id = 'result'
    resultBar.className = 'placeholder'
    //resultBar.innerHTML = "placeholder boi"
    runnerWrapper.appendChild(resultBar)


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
        document.body.appendChild(modalBackdropDiv);
        input.focus()
    });

    function show(){
        modalBackdropDiv.style.display = "block";
    }
    function hide(){
        modalBackdropDiv.style.display = "none";
    }

    var linkCache={};
    function generateSelectionLink(key){
        if(linkCache[key]){
            return linkCache[key]
        }
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(key));
        a.title = key;
        a.className = 'Rogue_suggestion_link'
        a.href = "javascript:RogueBookmarks(\'"+key+"\')";
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
    var defaultSuggestions;
    function searchScripts(input) {
        var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
        var list = [] //new list each time
        var numberOfSuggestions=keys.length
        for(var j=0;j<2;j++){
            for (var i = 0; i < numberOfSuggestions; i++) {
                var key = keys[i]
                if (j || key.match(reg)) {
                    console.log('suggesting',key)
                    list.push(generateSelectionLink(key));
                }
            }
            if(list.length){
                return list
            }
            if(!defaultSuggestions||!defaultSuggestions.length){
                numberOfSuggestions=5
                continue
            }
            return defaultSuggestions
        }
        return list;
    }

    var previousSuggestionsCache = "";
    function changeInput(val) {
        var suggestionResult = searchScripts(val);
        //if they are different lengths then dont check cause they differ
        if(arraysMatch(suggestionResult,previousSuggestionsCache)){
            return
        }
        console.log(suggestionResult)

        resultBar.innerHTML="";
        //for(var i=0;i<suggestionResult.length;i++){
            resultBar.append.apply(resultBar,suggestionResult);
        //}
        previousSuggestionsCache = suggestionResult
    }

    function keyCode(evt){
        return evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    }

    ///////////////////
    //  load hotkeys
    document.onkeydown = function(evt) {
        if(modalBackdropDiv.style.display == "none"){
            return
        }
        if (keycode == 27) { //escape hides the window
            hide()
        }else if(keycode==8){
            input.focus()
        }
    }

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalBackdropDiv) {
            hide()
        }
    }

    function run(key){
        var script=scripts[key]
        if(!script){
            resultBar.innerHTML="Nothing to execute";
            return
        }
        //loadJS(script)
        appendToHead(ScriptOBJ(script.src))
    }

    run.show=show
    window.RogueBookmarks=run
//usersession
})("")

