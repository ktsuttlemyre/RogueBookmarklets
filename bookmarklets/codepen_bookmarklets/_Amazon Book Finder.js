/**
 *  @author https://codepen.io/bookmarklets
 *  @file This bookmarklet will find a book you selected on Amazon.com online for free!<br><i class="gray">Go to the page of any book on Amazon, then click this bookmarklet!</i>
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