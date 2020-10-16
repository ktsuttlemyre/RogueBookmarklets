var Stopwatch = function(elem, options) {
  
  var timer       = createTimer(),
      startButton = createButton("start", start),
      stopButton  = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;
  
  // default options
  options = options || {};
  options.delay = options.delay || 1;
  options.format = options.format || function(t){return t;};
  
 
  // append elements     
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);
  
  // initialize
  reset();
  
  // private functions
  function createTimer() {
    return document.createElement("span");
  }
  
  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }
  
  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }
  
  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  
  function reset() {
    clock = 0;
    render(0);
  }
  
  function update() {
    clock += delta();
    render();
  }
  
  function render() {
    timer.innerHTML = options.format(clock/1000); 
  }
  
  function delta() {
    var now = Date.now(),
        d   = now - offset;
    
    offset = now;
    return d;
  }
  
  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};



var css = '.stopwatch {'+
		'     display: inline-block;background-color: white;opacity: 0.5;border: 1px solid #eee;padding: 5px;margin: 5px;'+
		'  }'+
		'  .stopwatch span {'+
		'    font-weight: bold;'+
		'    display: block;'+
		'    text-align:center;'+
		'  }'+
		'  .stopwatch a {'+
		'    padding-right:5px;'+
		'    text-decoration: none;'+
		'  }',
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

/*

<h2>Basic example; update every 1 ms</h2>
  
<p>click <code>start</code> to start a stopwatch</p>
  
<pre>
var elems = document.getElementsByClassName("basic");
  
for (var i=0, len=elems.length; i&lt;len; i++) {
  new Stopwatch(elems[i]);
}
</pre>
<div class="basic stopwatch"></div>
<div class="basic stopwatch"></div>

<hr>
<h2>Programmatic example</h2>

<p><strong>Note:</strong> despite the varying <code>delay</code> settings, each stopwatch displays the correct time (in seconds)</p>

<pre>
var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);
aTimer.start();
</pre>
<div class="stopwatch" id="a-timer"></div>1 ms<br>
  
<pre>
var b = document.getElementById("b-timer");
bTimer = new Stopwatch(b, {delay: 100});
bTimer.start();
</pre>
<div class="stopwatch" id="b-timer"></div>100 ms<br>

<pre>
var c = document.getElementById("c-timer");
cTimer = new Stopwatch(c, {delay: 456,format:function(t){return Math.floor(t);}});
cTimer.start();

</pre>
<div class="stopwatch" id="c-timer"></div>456 ms<br>
  
<pre>
var d = document.getElementById("d-timer");
dTimer = new Stopwatch(d, {delay: 1000,format:function(t){return parseInt(t)}});
dTimer.start();
</pre>
<div class="stopwatch" id="d-timer"></div>1000 ms<br>
  
*/

var d = document.createElement("div");
d.className='stopwatch'
d.setAttribute('style','position:fixed;top:1em;right:1em;z-index:2147483647')
document.body.appendChild(d)
dTimer = new Stopwatch(d, {delay: 1000,format:function(t){
    var sec_num = parseInt(t, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}});
dTimer.start();
