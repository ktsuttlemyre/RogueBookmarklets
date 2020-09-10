/**
 *  @author https://codepen.io/bookmarklets
 *  @file Converts the entire page to grayscale.<br><i class="gray">Toggles the page color on and off.</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

void function() {
  (function() {
    function i(i) {
      document.body.style.filter = i, document.body.style.webkitFilter = i;
    }
    window.isGrayscale ? (i("none"), window.isGrayscale = !1) : (i("grayscale(1)"), window.isGrayscale = !0);
  })();
}();
