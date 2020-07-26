//TODO NEED TO FORMAT AND MAKE THIS WORK PROPER

//tries to remove overlays and reenable scrollng on paywall sites
//Examle https://www.businessinsider.com/how-to-use-paypal-on-amazon-cards-2019-2#:~:text=While%20Amazon%20does%20not%20directly,of%20patience%2C%20so%20plan%20ahead.
//run the code 2 times on above site and it will fix
//TODO: use common ancistor technique to fix run twice limitation


function getViewport() {
	//https://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return {width:viewPortWidth, height:viewPortHeight};
}
var setCSS = function(element,key,value){
			element.style[key] = value;	 //primative
			//https://stackoverflow.com/questions/462537/overriding-important-style
			//1) Set a "style" attribute on the element:
			element.setAttribute('style', key+':'+value+' !important');
			//2) Modify the cssText property of the style object:
			//element.style.cssText = key+':'+value+' !important';
			element.style.cssText += ';'+key+':'+value+' !important;';
			//element.style has a setProperty method that can take the priority as a third parameter:
			element.style.setProperty(key, value, "important")
		}

//https://www.thecodeship.com/web-development/alternative-to-javascript-evil-setinterval/
function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};


function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function isIn(arr,elem){
	for(var i=0,l=arr.length;i<l;i++){
			if(arr[i]===elem){
				return true
			}
		}
}
var findOverlays=function(){
	//Remove overlays
	var ads=[]
	var viewport=getViewport()
	for(var i=0,l=1000;i<l;i++){
		var elem=document.elementFromPoint(randomInt(1,viewport['width']),randomInt(1,viewport['height']))
		if(! isIn(ads,elem) && elem !== document.body ){
			ads.push(elem)
		}
	}
	return ads
}

var enableScrolling=function(){
	//set body to visible
	setCSS(document.body,"overflow","visible")

	//remove mouse scroll inhibitors
	window.onmousewheel = document.onmousewheel = null
	window.ontouchmove = null 
	window.onwheel = null 

	for (div=0; div < document.querySelectorAll('div').length; div++) {
		document.querySelectorAll('div')[div].style.overflow = "auto";
	};
}



function parents(node) {
  var nodes = [node]
  for (; node; node = node.parentNode) {
    nodes.unshift(node)
  }
  return nodes
}

function commonAncestor(node1, node2) {
  var parents1 = parents(node1)
  var parents2 = parents(node2)

  if (parents1[0] != parents2[0]){return null}

  for (var i = 0; i < parents1.length; i++) {
    if (parents1[i] != parents2[i]) return parents1[i - 1]
  }
}



function removePaywallOverlays(){
	var ads=findOverlays();
	for(var i=0,l=ads.length;i<l;i++){
		var elem=ads[i]
		if(elem&&elem.parentNode){
				elem.parentNode.removeChild(elem);
		}
	}
	//var common = commonAncestor(ads)
	//common.parentNode.removeChild(common)
}
removePaywallOverlays()

interval(function() {
    enableScrolling();
}, 500);

