/**
 *  @author https://codepen.io/bookmarklets
 *  @file Find a free copy of an Amazon book in online libraries.<br><i class="gray">Scans online libraries - sometimes there is a free or library version you can borrow.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	var ebookcheck = document.getElementById("ebooksProductTitle");
	var bookcheck = document.getElementById("productTitle");
	if(ebookcheck !=null){ 
	var book= document.getElementById("ebooksProductTitle").innerText;
	(open("https://archive.org/search.php?query="+book));
	}else if(bookcheck !=null){
	var book= document.getElementById("productTitle").innerText;
	(open("https://archive.org/search.php?query="+book));
	} else {
	var book=window.prompt("Find Free Books:", "Enter the book title"); 
	if(book == "Enter the book title" || book == null){
	alert("Enter a book title or find one on Amazon");
	} else {
	(open("https://archive.org/search.php?query="+book));
	}}