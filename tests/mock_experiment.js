
function createMock(obj,methods){
	var mock={};
	// todo create fake window,document and also create fake about,confirm, prompt and other calls
	//https://stackoverflow.com/questions/17776830/looping-through-all-of-the-items-in-the-window-object#comment25928156_17776830
	do Object.getOwnPropertyNames(obj).forEach(function(name) {
	       mock[name]=function(/*arguments*/){
	       	windowref[name].apply(this,arguments)
	       };
		console.log("=============================");
	   });
	while(obj = Object.getPrototypeOf(obj));
}

var win=createMock(window,{})

(function closure(obj){
	function mockWindow() {
	};
	//do Object.getOwnPropertyNames(obj).forEach(function(name) {
	//	    mockWindow.prototype[name] = function(/*arguments*/) {
	//		    window[name].apply(this,arguments)
	//		};
	//   });
	//while(obj = Object.getPrototypeOf(obj));
	//mockWindow.prototype=window

	// mockWindow.prototype.alert = function() {
	//   console.log.apply(console,arguments)
	// };
    var window= Object.setPrototypeOf({},obj)
	// var window = new mockWindow();
	// window.prototype=obj
	console.log(window.alert)
	window.alert('hey boi','yes','it applies')
	window.confirm()
	alert('bypass')

})(window)
