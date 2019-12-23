/**
 *  @author https://codepen.io/bookmarklets
 *  @file Search the current site via Google.<br><i class="gray">Google's search is often better than the local site search!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:q = "" + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text); if (!q) q = prompt("You didn't select any text.  Enter a search phrase:", ""); if (q!=null) location=("https://www.google.com/search?num=100&q=site:" + escape(location.hostname) + " \"" + escape(q.replace(/\"/g,"")) + "\"").replace(/ /g, "+"); void 0