appendToHead = function(el) {
    document.getElementsByTagName('head')[0].appendChild(el);
}


var script = document.createElement('script');
script.setAttribute('src', 'https://ktsuttlemyre.github.io/RogueBookmarklets/index.js');
script.setAttribute('type', 'text/javascript');
script.setAttribute('crossorigin', "anonymous")
appendToHead(script);

var script = document.createElement('script');
script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/horsey/4.2.2/horsey.js');
script.setAttribute('type', 'text/javascript');
script.setAttribute('integrity', "sha256-J38IjXBALk7t+VGTss0JmSzOYJ3Y8YBQpB4vjCnwESs=")
script.setAttribute('crossorigin', "anonymous")
appendToHead(script);

var link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/horsey/4.2.2/horsey.css";
link.type = "text/css";
link.rel = "stylesheet";
link.setAttribute('integrity', "sha256-R84Ldk4o+RHLjJnR6FuD8R80lBToAgzDvEQ3d0NhDiw=");
link.setAttribute('crossorigin', "anonymous");
appendToHead(link);

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
closeButton.classname = 'close';
closeButton.innerHTML = '&times;';

var paragraph = document.createElement('p')
var input = document.createElement('input')
input.id = "search_bar"

// Append the div to the body
paragraph.append(input);
innerDiv.append(paragraph);
innerDiv.append(closeButton);
div.appendChild(innerDiv);
domready(function() {
    document.body.appendChild(div);
});

initSearch = function() {

    if (!window.horsey || !window.scripts) {
        return setTimeout(initSearch, 0);
    }
    //input
    horsey(document.querySelector('#search_bar'), {
        source: [{
            list: scripts
        }],
        getText: 'name',
        getValue: 'src',
        predictNextSearch: function(info) {
            var script = document.createElement('script');
            script.setAttribute('src', info.value);
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('crossorigin', "anonymous");
            appendToHead(script);
        }
    });
    document.getElementById("search_bar").focus();
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
            if (event.target == modal) {
                modal.style.display = "none";
            }
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
