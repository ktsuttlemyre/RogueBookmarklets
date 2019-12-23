/**
 *  @author https://codepen.io/bookmarklets
 *  @file Alternative search for a book.<br><i class="gray">Checks to see if there's a free version</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: var book = encodeURIComponent(window.location.href); book = book.substring(31); book = book.replace("https://amazon.com/", ""); book = book.split("ebook")[0]; (open("https://epdf.tips/search/"+book))