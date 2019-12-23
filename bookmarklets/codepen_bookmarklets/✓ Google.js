/**
 *  @author https://codepen.io/bookmarklets
 *  @file See if you can find a better price on Google Shopping<br><i class="gray">Can you find a better price on Google? - click while on the Amazon page.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:
	var ebookcheck = document.getElementById("ebooksProductTitle");
	var prodcheck = document.getElementById("productTitle");
	if(ebookcheck !=null){ 
	var prod= document.getElementById("ebooksProductTitle").innerText;
	var prod=prod.split("  ").join("+");
	(open("https://www.google.com/search?q="+prod+"&source=lnms&tbm=shop"));
	}else if(prodcheck !=null){
	var prod= document.getElementById("productTitle").innerText;
	var prod=prod.split("  ").join("+");
	(open("https://www.google.com/search?q="+prod+"&source=lnms&tbm=shop"));
	} else {
	var prod=window.prompt("Check eBay:", "Enter the product title"); 
	if(prod == "Enter the product name" || prod == null){
	alert("Enter a product name or find one on Amazon");
	} else {
	(open("https://www.google.com/search?q="+prod+"&source=lnms&tbm=shop"));
	}}