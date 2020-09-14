---
---
(function(aliasDatabase,global){
	var seed=9834579834890
	//loadingScreen
	// var loadingScreen = document.createElement('div');
	// loadingScreen.style.cssText = 'position:absolute;top:0;left:0;display:block;width:100%;height:100%;z-index:100;background:#000';
	// //loadingScreen.className="loadingScreen_"+seed
	// document.body.appendChild(loadingScreen);


	//pollfill

	//super simple polyfill
	if(!Array.prototype.from){
		Array.prototype.from=function(arr){
			return Array.prototype.slice.call(arr);
		}
	}



	"use strict";
	var stats={}
	var redactedClass="privacy_"+seed
	var hiddenClass="hidden_"+seed
	var hiddenChildrenClass="hiddenchildren_"+seed


class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}
function hslToRgb(h, s, l){
	//https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   {number}  h       The hue
	 * @param   {number}  s       The saturation
	 * @param   {number}  l       The lightness
	 * @return  {Array}           The RGB representation
	 */
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

	function selectColor(number) {
	  //https://stackoverflow.com/questions/10014271/generate-random-color-distinguishable-to-humans
	  var  goldenAngle = 180 * (3 - Math.sqrt(5))
	  const hue = number * goldenAngle; // use golden angle approximation
	  return {css:'hsl(${hue},50%,75%)',values:[hue,.5,.75],'hue':hue};
	}



	function appendCSS(str){
		var styleSheet = document.createElement("style")
		styleSheet.type = "text/css"
		styleSheet.innerText = str
		document.head.appendChild(styleSheet)
	}

	var height=function(el){
		return parseFloat(getComputedStyle(el, null).height.replace("px", ""))
	}
	var width=function(el){
		return parseFloat(getComputedStyle(el, null).width.replace("px", ""))
	}

	//https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
	var getClosestParent = function (elem, selector) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
		    Element.prototype.matches =
		        Element.prototype.matchesSelector ||
		        Element.prototype.mozMatchesSelector ||
		        Element.prototype.msMatchesSelector ||
		        Element.prototype.oMatchesSelector ||
		        Element.prototype.webkitMatchesSelector ||
		        function(s) {
		            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
		                i = matches.length;
		            while (--i >= 0 && matches.item(i) !== this) {}
		            return i > -1;
		        };
		}

		// Get the closest matching element
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;

	};

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

	function popRandomElement(array) {
		return array.splice(Math.floor(Math.random()*array.length), 1)[0];
	}

	function Person(id){
		
		var person=population[id]
		if(!person){
			person={}
			person.id=id
			person.url='https://www.facebook.com/'+id
			person.index=Object.keys(population).length++

			person.cssClass="g_"+person.index+'_'+seed

			console.log(person)
			var hue=selectColor(person.index).hue%360 //modulo to keep wraping 0 through 360
			console.log(hue)
			var hsl=hslToRgb(hue/360,1,.4) //accepts 0 to 1 (percent)
			console.log(hsl)
			var color=new Color(hsl[0],hsl[1],hsl[2])
			var solve = new Solver(color)
			var result = solve.solve();
			person.color={value:color,result:result,solve:solve}

			//alias database expected to be a list of objects with properties
			//name:'somename'
			//image:'someurl'
			//or a list of strings where the string can be either name or image
			if(aliasDatabase){
				var alias=popRandomElement(aliasDatabase)
				if(typeof alias=='string'){
					if(validURL(alias)){
						person.alias={image:alias}
					}else{
						person.alias={name:alias}
					}
				}else{
					person.alias=alias
				}
			}

			population[person.id]=person
		}
		return person
	}


	function blurImages(){
		var profileImageArray=window.profileImageArray=[]

		//select all image tags from svg image tags (not img) (because all the small profile image circles are svg)
		Array.from(document.querySelectorAll('image')).forEach(function(image,i){
			//filter by size. 40x40 or smaller
			if((width(image)<=40 && height(image) <= 40) || width(image)==null || height(image)==null ){
				var parent = getClosestParent(image,'svg') //select the svg
				if(!parent){return}
				var anchor = getClosestParent(image,'a') 
				if(!anchor||!anchor.href){
					//This is expected to be the image next to "write a reply"
					parent.parentNode.className+=' '+redactedClass
					return
				}

				//create obj
				var obj={}
				obj.img=null
				obj.image=image;
				obj.svg=parent;
				var src=image.src
				if(!src){ //get svg url
					src=image.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
				}
				obj.src=src;

				obj.anchor=anchor
				obj.url=anchor.origin+anchor.pathname
				obj.href=anchor.href
				//anchor.href='javascript:void(0)'; //privacy remove href from link
				//anchor.onclick=function(){window.location.href=obj.href}
				obj.id=(function(url){
					var urlParts=url.split('/'); //split url via / character
					for(var i=0,l=urlParts.length;i<l;i++){
						if(urlParts[i]=='www.facebook.com'){ //find posts in url and assume the next string is the postID
							return urlParts[i+1]
						}
					}
				})(obj.url)
				obj.container=getClosestParent(image,'div')
				
				profileImageArray.push(obj)

				//create person
				var person = Person(obj.id)
				if(aliasDatabase && person.alias.image){
					image.src=person.alias.image
					image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', person.alias.image) //if its an svg:image tag set it here
				}
				//get person css class to tag the container element
				obj.container.className+= ' '+person.cssClass+' class_'+seed+'_img'
			}
		})
		
		//css
		//apply privacy css to them
		// profileImageArray.forEach(function(el) {
		// 	el.style.filter +=' brightness(0)'
		// })
		stats.blurImages={profileImageArray:profileImageArray}

	}

	function blurNames(){
		var profileNames=window.profileNames=[]


		Array.from(document.querySelectorAll('a')).forEach(function(anchor,i){
			/////////
			//filter	    
			////////

		    // Filter out the link element if it has a child of
		    // svg image tags
		    // html image tags 
		    // svg path tag
		  	var image = anchor.querySelectorAll('img, image, path')
			if(image && image.length ){
				return
			}

			//filter if href has current url id in the url
			//this will filter out time links that point back to the current post id
			if(anchor.href.indexOf(postID)>-1){
				return
			}

			//allow external links to be seen
			if(anchor.href.indexOf('//l.facebook.com/')>-1){
				return
			}

			//allow interface links to be visible
			if(anchor.href==null || anchor.href==''){
				return
			}			


			var obj={}
			obj.anchor=anchor
			//extract identifying url
			obj.url=anchor.origin+anchor.pathname
			obj.href=anchor.href
			//anchor.href='javascript:void(0)' //privacy remove href from anchor
			//anchor.onclick=function(){window.location.href=obj.href}
			obj.id=(function(url){
				var urlParts=url.split('/'); //split url via / character
				for(var i=0,l=urlParts.length;i<l;i++){
					if(urlParts[i]=='www.facebook.com'){ //find posts in url and assume the next string is the postID
						return urlParts[i+1]
					}
				}
			})(obj.url)

			obj.container=anchor
			profileNames.push(obj)
			//create person
			var person = Person(obj.id)
		
			//get person css class to tag the container element
			obj.container.className+= ' '+person.cssClass+' class_'+seed+'_name'


			var iter = document.createNodeIterator(obj.container, NodeFilter.SHOW_TEXT),
			textnode;
			if(aliasDatabase){
				while (textnode = iter.nextNode()) {
					textnode.textContent=person.alias.name
				}
			}else{
				obj.container.className+= ' '+hiddenChildrenClass
			}
			
			
		})


		//css
		// profileNames.forEach(function(el) {
		// 	el.style.filter +=' blur(.40em)'	
		// 	//el.style.backgroundColor  = "#AA0000"
		// })
		stats.blurNames={profileNames:profileNames,postID:postID}

	}


		// // // Your CSS as text
		//  var styles = 'a image { pointer-events: none;}'
		// //     'svg image { '+
		// //     '    filter: blur(1px) brightness(0);'+
		// //     '}'+
		// //     'a image {'+
		// //     '    font-size: 18px;'+
		// //     '    line-height: 1.58;'+
		// //     '    letter-spacing: -.004em;'+
		// //     '}'+
		// // 	''+
		// //     '.qwebirc-qui .nicklist a {'+
		// //     '    margin: 6px;'+
		// //     '}'

		// var styleSheet = document.createElement("style")
		// styleSheet.type = "text/css"
		// styleSheet.innerText = styles
		// document.head.appendChild(styleSheet)



	function expandAllComments(){
		//Try to expand just expand comments buttons
		var allIelements= document.querySelectorAll('i')
		var expandLinks=[]

		//filter the i elements
		allIelements.forEach(function(el) {
			var span = getClosestParent(el,'span')
			//'sp_FJ837XUUgqW' //this class contains a background image style (img matrix) witht he expand icon
			var className= 'sx_084c3c' //this class gives the coordinates for the expand icon
			if(el && el.className.indexOf(className)>-1){
				expandLinks.push(span)
			}
		})

		//action
		var clicks=0
		expandLinks.forEach(function(el){
			if(!el){return}
			clicks++
			el.click()
		})
		stats.expandAllComments={expandLinks:expandLinks,allIelements:allIelements,clicks:clicks}
	}


	function colorize(population){
		var css=""
		Object.keys(population).forEach(function(key){
			var person=Person(key)
			
			css+="."+person.cssClass+" svg {"+
				'filter:brightness(0) '+person.color.result.filter.replace('filter:','')+
			"} "+

			"."+person.cssClass+"."+"class_"+seed+"_name {"+
				"background-color:"+person.color.value.toString()+";"+
				"border-radius: .5em;"+
				"display:inline-block;"+
			"} "
		})

		css+="."+hiddenChildrenClass+">* {"+
			"visibility:hidden;"+
			//"filter:blur(.35em);"+
		"} "

		css+='.'+redactedClass+' {'+
			'filter:brightness(0);'+
			"visibility:hidden;"+
		'} ';
		

		// css+='.class_'+seed+'_name{'+
		// 	'filter:blur(.40em);'+
		// '} ';


		appendCSS(css)
		
	}

	function interactiveAdjustments(){
		//add click to delete elements
		var action=function(event){
		    event.preventDefault();
	    	var element = event.target;
			element.parentNode.removeChild(element);

		}
		// document.addEventListener('click',function(event){
		// 	if (event.which == 2) { //middle mouse click
		// 		action(event)
		// 	}
		// })
		// document.addEventListener('auxclick', function(event) {
		// 	if (event.button == 1) {
		// 		action(event)
		// 	}
		// })
		//document.addEventListener('contextmenu',function(event){
	//		action(event)
	//	})



		//Keeps info popups from poping up and clicking on comment total to regenerate page
		//var allElements=document.querySelectorAll('*')
		var cancel =  function (event) {
			event.stopPropagation();
		}
		window.addEventListener('mouseout',cancel, true);
		window.addEventListener('click', cancel, true);
		// allElements.forEach(function(el){
		// })
		//stats.removeMouseActions={allElements:allElements}


		//hide url links from statusbar
		Array.from(document.querySelectorAll('a[href]')).forEach(function(anchor,i){
			anchor.setAttribute('data-href',anchor.href)
			anchor.href='javascript:void(0);'
		    anchor.addEventListener('click', function(e){
		    	var bool=confirm('Do you wish to continue with this action?')
		    	if(bool==false){
		    		return
		    	}
		        var ele = e.target;
		        window.location=ele.getAttribute('data-href');
		    });    
		})

	}

	function getSiblings(el, filter) {
		//https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
	    var siblings = [];
	    el = el.parentNode.firstChild;
	    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
	    return siblings;
	}

	function cutPagelets(){
		//remove notifications
		//var notifications=document.lastElementChild
		//notifications.parentNode.removeChild(notifications)


		var roots=document.querySelectorAll('div[data-pagelet="root"]')
		var root=roots[0]

		// //delete all but the first root
		// //this removes messenger
		// for(var i=1,l=roots.length;i<l;i++){
		// 	roots[i].parentNode.removeChild(roots[i])
		// }
		// roots=null

		//find the child with position relative?
		//lets not do this yet but the idea is that pagelets need a parent that is relative
		

		//get a list of siblings to keep
		var keepPages=[]
		var banner=root.querySelectorAll('div[role="banner"]')[0]
		keepPages.push(banner) //banner

		var siblings=getSiblings(banner) //use banner element to find proper tier


		//find main pagelet
		//assume if it is the same size as parent then it is main
		for(var i=1,l=siblings.length;i<l;i++){
			var el=siblings[i]
			var parent=el.parentNode
			if(width(el)==width(parent) && height(el)==height(parent)){
				keepPages.push(el)
			}
		}


		//filter
		for(var i=0,l=siblings.length;i<l;i++){
			var el=siblings[i]
			var found=keepPages.includes(el)
			if(!found){
				el.parentNode.removeChild(el) //remove element if its not to be kept
			}
		}

		//hide all fixed elements
		//This removes banner and notifications
		appendCSS(".poy2od1o {"+
			"display:none !important;"+
			"opacity:0 !important;"+
			"width:0 !important;"+
			"height:0 !important;"+
			"}")

		//remove reactions
		appendCSS(".ja2t1vim {"+
			"display:none !important;"+
			"opacity:0 !important;"+
			"width:0 !important;"+
			"height:0 !important;"+
			"}")

		//disable all buttions
		appendCSS("*[role=button] {"+
			"pointer-events:none !important;"+
			"}")

		
		//var pageletContainer = 'l9j0dhe7' //class of container pagelet
		//var mainPagelet = 
	}


	var population=window.population={}

	//get postID
	var postID=(function(url){
		var urlParts=url.split('/'); //split url via / character
		for(var i=0,l=urlParts.length;i<l;i++){
			if(urlParts[i]=='posts'){ //find posts in url and assume the next string is the postID
				return urlParts[i+1]
			}
		}
	})(location.href)



	//main
	expandAllComments() //expanded comments don't exist till you click expand. So go head and expand them all

	setTimeout(function(){
		blurImages() //black out images
		blurNames() //blur user names in comments and comment labels
		cutPagelets()
		colorize(population) // assigns everyone a color as an identity
		interactiveAdjustments() //add click to delete
		console.log('Facebook Anonymizer stats:',stats)
		loadingScreen && document.body.removeChild(loadingScreen)
		global.RogueBookmarks&&global.RogueBookmarks.next()
	},3000)

	// document.body.addEventListener('click', function(){setTimeout(function(){
	// 	blurImages()
	// 	blurNames()
	// },1)}, true); 

})(null,this);

(['George Washington',
'John Adams',
'Thomas Jefferson',
'James Madison',
'James Monroe',
'John Quincy Adams',
'Andrew Jackson',
'Martin Van Buren',
'William H. Harrison',
'John Tyler',
'James K. Polk',
'Zachary Taylor',
'Millard Fillmore',
'Franklin Pierce',
'James Buchanan',
'Abraham Lincoln',
'Andrew Johnson',
'Ulysses S. Grant',
'Rutherford B. Hayes',
'James A. Garfield',
'Chester A. Arthur',
'Grover Cleveland',
'Benjamin Harrison',
'Grover Cleveland',
'William McKinley',
'Theodore Roosevelt',
'William H. Taft',
'Woodrow Wilson',
'Warren G. Harding',
'Calvin Coolidge',
'Herbert Hoover',
'Franklin D. Roosevelt',
'Harry S. Truman',
'Dwight D. Eisenhower',
'John F. Kennedy',
'Lyndon B. Johnson',
'Richard M. Nixon',
'Gerald R. Ford',
'Jimmy Carter',
'Ronald Reagan',
'George H. W. Bush',
'Bill Clinton',
'George W. Bush',
'Barack Hussein Obama',
'Donald J. Trump']);


