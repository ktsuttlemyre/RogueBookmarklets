/**
 *  @author https://codepen.io/bookmarklets
 *  @file Instantly shows meta information about the current site in an on-page iFrame.
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript: (function(){           if (window.ouiseo === undefined) {            var jsCode = document.createElement('script');            jsCode.setAttribute('src', '//carlsednaoui.s3.amazonaws.com/ouiseo/ouiseo.min.js');            document.body.appendChild(jsCode);          } else if (!!window.ouiseo && !document.getElementById('ouiseo')) {             ouiseo();           } else {            console.log('ouiseo is already open');          }        })();