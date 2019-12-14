var RogueBookmarks = (function() {
    appendToHead = function(el) {
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    var script = document.createElement('script');
    script.setAttribute('src', 'https://ktsuttlemyre.github.io/RogueBookmarklets/index.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('crossorigin', "anonymous")
    appendToHead(script);

    //https://codebeautify.org/string-builder
    var cssText = '   /* The Modal (background) */  ' +
        '   .modal {  ' +
        '     display: none; /* Hidden by default */  ' +
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
        '   .modal-content {  ' +
        '     background-color: #fefefe;  ' +
        '     margin: 15% auto; /* 15% from the top and centered */  ' +
        '     padding: 20px;  ' +
        '     border: 1px solid #888;  ' +
        '     width: 80%; /* Could be more or less, depending on screen size */  ' +
        '   }  ' +
        '     ' +
        '   /* The Close Button */  ' +
        '   .close {  ' +
        '     color: #aaa;  ' +
        '     float: right;  ' +
        '     font-size: 28px;  ' +
        '     font-weight: bold;  ' +
        '   }  ' +
        '     ' +
        '   .close:hover,  ' +
        '   .close:focus {  ' +
        '     color: black;  ' +
        '     text-decoration: none;  ' +
        '     cursor: pointer;  ' +
        '   }  ' +
        '   #RogueRunner{  ' +
        '     position: relative;  ' +
        '   }  ' +
        '     ' +
        '   #RogueRunner > #input {  ' +
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
        '   #RogueRunner > .placeholder {  ' +
        '     position: absolute;  ' +
        '     font-size: 25px;  ' +
        '     pointer-events: none;  ' +
        '     left: 1rem;  ' +
        '     bottom: 1px;  ' +
        '     transition: 0.1s ease all;  ' +
        '   }  ' +
        '     ' +
        '    #RogueRunner #input:focus ~ .placeholder{  ' +
        '     bottom: 1px;  ' +
        '     font-size: 13px;  ' +
        '   }  ' +
        '     ' +
        '    ';

    var css = document.createElement("style");
    css.type = "text/css";
    if ("textContent" in css)
        css.textContent = cssText;
    else
        css.innerText = cssText;
    appendToHead(css);

    //https://github.com/ded/domready
    ! function(e, t) {
        typeof module != "undefined" ? module.exports = t() : typeof define == "function" && typeof define.amd == "object" ? define(t) : this[e] = t()
    }("domready", function() {
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
    })


    // Create element; can be whatever you want, e. g. div, h1, p, img...
    var div = document.createElement('div');
    div.id = 'myModal';
    div.className = 'modal';

    var innerDiv = document.createElement('div');
    innerDiv.className = 'modal-content';

    var closeButton = document.createElement('span')
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';

    var paragraph = document.createElement('p')



    var runner_wrapper = document.createElement('div')
    runner_wrapper.id = 'RogueRunner'

    var input = document.createElement('input')
    input.id = "input"
    input.type = 'text'
    input.onkeyup = function(){RogueBookmarks.changeInput(this.value)}
    runner_wrapper.appendChild(input);

    var result = document.createElement('span');
    result.id = 'result'
    result.className = 'placeholder'
    result.innerHTML = "placeholder boi"
    runner_wrapper.appendChild(result)

    // Append the div to the body
    paragraph.appendChild(runner_wrapper);
    innerDiv.appendChild(closeButton);
    innerDiv.appendChild(paragraph);
    div.appendChild(innerDiv);
    domready(function() {
        document.body.appendChild(div);
    });

    
        function searchScripts(input) {
            var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
            var list = []
            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i]
                if (script.name.match(reg)) {
                    list.push('<a href="#" onFocus="RogueBookmarks.setSelection(\'' + script.src + '\')">' + script.name + "</a>");
                }
            }
            return list;
        }
        var previousCache = ""

        
        function appendScript(src){
                console.log('loading', src)
                var script = document.createElement('script');
                script.setAttribute('src', src);
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('crossorigin', "anonymous");
                appendToHead(script);
        }
        function changeInput(val) {
            var autoCompleteResult = searchScripts(val);
            var current = autoCompleteResult.toString()
            if (previousCache != current) {
                document.getElementById("result").innerHTML = current;
                previousCache = current
            }
        }

        var selection = '';

        function setSelection(slection) {
            selection = slection;
        }
            
            
    
    initSearch = function() {
        if (!window.scripts) {
            return setTimeout(initSearch, 0);
        }        
        input.focus();
    }

    //https://www.w3schools.com/howto/howto_css_modals.asp
    // Get the modal
    var modal = div // document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = closeButton; //document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    //btn.onclick = function() {
    domready(function() {
        modal.style.display = "block";

        initSearch(input)
        document.onkeydown = function(evt) {
            var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
            if (keyCode == 27) {
                  modal.style.display = "none";
            }else if (keyCode == 13) {
                if (document.activeElement) {
                    selection = document.activeElement.text
                }
                appendScript(selection)
            }
        }
    })
    //}

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    return {
        changeInput: changeInput,
        setSelection: setSelection
    }

})()
