/**
 *  @author https://codepen.io/bookmarklets
 *  @file Highlight a business name you find on the web,<br>Click this and see the business listing!
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:if(window.getSelection()==""){alert("Highlight a company name then click this bookmarlet")}else{window.open("https://www.yext.com/partner/MobiSquad/listing-report.html?country=US&name="+window.getSelection());};