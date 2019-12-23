/**
 *  @author https://codepen.io/bookmarklets
 *  @file Inject JQuery into the site.<br><i class="gray">If you want to create a bookmarklet of your own that needs JQuery... start here!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var s=document.createElement('script');s.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js');document.getElementsByTagName('body')[0].appendChild(s);alert('Script injected!');})();