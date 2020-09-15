/**
 *  @author https://codepen.io/bookmarklets
 *  @file Convert to US Dollars<br><i class="gray">Highlight an amount with the currency symbol and it will convert it to US Dollars.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var str=document.getSelection();
	value = str.toString();
	var value = value.toLowerCase(); 
	var num=value.replace(/[^\d.-]/g, "");
	if(value.indexOf("£") > -1 || value.indexOf("gbp") > -1 || value.indexOf("pound") > -1|| value.indexOf("sterling") > -1) {
	  window.open("https://transferwise.com/us/currency-converter/gbp-to-usd-rate?amount="+num)
	} else if(value.indexOf("€") >-1 || value.indexOf("euro") >-1 || value.indexOf("eur") >-1) {
	  window.open("https://transferwise.com/us/currency-converter/eur-to-usd-rate?amount="+num)
	} else if(value.indexOf("can$") >-1 || value.indexOf("cad") >-1 || value.indexOf("c$") >-1) {
	  window.open("https://transferwise.com/us/currency-converter/cad-to-usd-rate?amount="+num)
	} else if(value.indexOf("au$") >-1 || value.indexOf("aud") >-1 || value.indexOf("a$") >-1) {   window.open("https://transferwise.com/us/currency-converter/aud-to-usd-rate?amount="+num)
	} else if(value.indexOf("yen") >-1 || value.indexOf("jpy") >-1 ) {
	  window.open("https://transferwise.com/us/currency-converter/jpy-to-usd-rate?amount="+num)
	} else if(value.indexOf("Renminbi") >-1 || value.indexOf("yuan") >-1 || value.indexOf("RMB") >-1 || value.indexOf("元") >-1) {
	  window.open("https://transferwise.com/us/currency-converter/cny-to-usd-rate?amount="+num)
	} else if(value.indexOf("¥") >-1) {
	var entry=window.prompt("Do you mean Japanese Yen or Chinese Yuan\nEnter Yen or Yuan in the field below:", "Enter Yen or Yuan."); 
	value = entry.toString(); 
	var value = value.toLowerCase(); 
	}
	   if(value.indexOf("yuan") >-1 || value.indexOf("chin") >-1 || value.indexOf("renminbi") >-1) {
	  window.open("https://transferwise.com/us/currency-converter/cny-to-usd-rate?amount="+num);
	 } else if(value.indexOf("yen") >-1 || value.indexOf("japan") >-1) {
	  window.open("https://transferwise.com/us/currency-converter/jpy-to-usd-rate?amount="+num);
	} else if(value.indexOf("Enter Yen or Yuan.") >-1) {
	   alert("You did not choose!")
	} else {
	var entry=window.prompt("A currency was not identified\nEnter the three letter currency name in the field below:", "Enter currency here"); 
	value = entry.toString(); 
	var value = value.toLowerCase(); 
	window.open("https://transferwise.com/us/currency-converter/"+value+"-to-usd-rate?amount="+num);
	  }