/**
 *  @author https://codepen.io/bookmarklets
 *  @file HTML Element Count<br><i class="gray">Counts how many links, images, forms and scripts are on the page.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:function getACount() {
	    return document.getElementsByTagName('a').length;
	}
	function getImgCount() {
	    return document.getElementsByTagName('img').length;
	}
	function getScriptCount() {
	    return document.getElementsByTagName('script').length;
	}
	function getFormCount() {
	    return document.getElementsByTagName('form').length;
	}
	var forms=getFormCount();
	var links=getACount();
	var images = getImgCount();
	var scripts=getScriptCount();
	var message='There are:\n' + links + ' links on this page,\n' + images + ' images on this page,\n' + forms + ' forms on this page, and\n'+ scripts + ' Scripts on this page.';
	    alert(message);