
var postClass='.gpro0wi8.pcp91wgn'
function queryForPosts(query){
	query=query||'.rq0escxv.l9j0dhe7.du4w35lb.d2edcug0.hpfvmrgz.gile2uim.buofh1pr.g5gj957u.aov4n071.oi9244e8.bi6gxh9e.h676nmdw.aghb5jc5>*'
	return document.querySelectorAll(query)
}


function getPostScore(post){
	var scoreElement=post.querySelector(postClass)
    if(scoreElement){
        return parseFloat(scoreElement.textContent||scoreElement.innerHTML||0)
    }
    return 0

}
function filterPosts(tolerance){
	tolerance=tolerance||10
	var query=queryForPosts()
	var parentNode=query[0].parentNode
	var list=Array.prototype.slice.call(query)
	list.forEach(function(post){
		var score=getPostScore(post)
        if(score<tolerance){
           post.parentNode.removeChild(post)
        }
	
	})
}

function sortPosts(acending){
	var query=queryForPosts()
	var parentNode=query[0].parentNode
	var list=Array.prototype.slice.call(query)
	list.sort(function(a,b){
		return getPostScore(b) - getPostScore(a)
	})
	//removeAllPosts(parentNode)
	if(acending){
		list.reverse()
	}
	list.forEach(function(post){
		parentNode.appendChild(post)
	})
}

function removeAllPosts(parent){
	while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

  	
var intervalID=setInterval(function(){window.scrollTo(0,elm.scrollHeight);},200)

function onElementHeightChange(elm, timeout, callback) {
	if(typeof timeout=='function'){
		callback=timeout
		timeout=null
	}
	to=to||200

  var lastHeight = elm.clientHeight, newHeight;
  var promise={cancel:false,timeOut:timeOut}
  (function run() {
  	if(promise.cancel){
  		return
  	}
    newHeight = elm.clientHeight;
    if (lastHeight != newHeight)
    	promise.newHeight=newHeight
        promise.lastHeight=lastHeight
      callback(null,newHeight,promise)
    lastHeight = newHeight

    if (promise.timeOutID){
      clearTimeout(promise.timeOutID)
    }

    promise.timeOutID = setTimeout(run, promise.timeOut)
    return promise
  })()
}

onElementHeightChange(document.body,function(err,height,promise){
	asArray(document.querySelectorAll())

	if(timestamp=='1 week'){
		promise.cancel=true
		clearInterval(intervalID)
		alert('loaded one week')
		return
	}
})
