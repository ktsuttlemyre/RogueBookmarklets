/**
 *  @author https://codepen.io/bookmarklets
 *  @file Selection plus the URL where you found it.<br><i class="gray">Highlight some text and this will copy it to your clipboard along with the URL.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var stext = "";var sdom = "";stext = window.getSelection().toString();sdom = document.location;window.prompt("Copy to clipboard: Ctrl+C", stext + " â ( "+ sdom +" )");stext=null;sdom=null;