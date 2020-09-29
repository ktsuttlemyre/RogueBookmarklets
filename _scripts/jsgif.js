---
description: |
    uses jsgif (an animated GIF player bookmarklet) to enhance gif interactins. It provides features such as pause, advance frame-by-frame, play in reverse, and others that one might expect from a video player.
params: |
    {type} VarName - describe what you expect to see as input
returns: |
    {bool} Something something
authors: |
    Shachaf <https://github.com/shachaf/jsgif>
originalsource: https://slbkbs.org/jsgif/
layout: script
---
(function() {
  var n = null, C = false;
  function h(m) {
    d(m, "jsgif_overlaid");
    m.removeEventListener("click", i, C);
  }
  function i(m) {
    var o = this;
    c.forEach(h);
    setTimeout(function() {
      j(o);
    }, 0);
    m.preventDefault();
  }
  function d(m, p) {
    var o = m.className.split(/\s/).filter(function(r) {
      return r !== p;
    });
    m.className = g(o, " ");
  }
  function g(m, o) {
    if (o === undefined) {
      o = "";
    }
    return m.reduce(function(p, r) {
      return p + o + r;
    }, "");
  }
  function j(ai) {
    function ag(p, m) {
      return function(q) {
        p(q);
        T(m);
      };
    }
    function ac() {
    }
    function T(m) {
      ab("Decoding (frame " + (M.length + 1) + ")...", Z.i, Z.data.length, m);
    }
    function I() {
      G = C;
      o.insertBefore(ai, L);
      o.removeChild(L);
    }
    function F() {
      N && M.push({data:N.getImageData(0, 0, ae.width, ae.height), f:Y});
    }
    function V(m) {
      af = m;
      ae = {width:ai.width, height:ai.height};
      M = [];
      O.fillStyle = "black";
      O.fillRect(0, 0, ae.width, ae.height);
      O.strokeStyle = "red";
      O.lineWidth = 3;
      O.moveTo(0, 0);
      O.lineTo(ae.width, ae.height);
      O.moveTo(0, ae.height);
      O.lineTo(ae.width, 0);
      O.stroke();
      setTimeout(x, 0);
    }
    function ah(m) {
      m.lengthComputable && ab("Loading...", m.loaded, m.total, true);
    }
    function ab(u, p, r, t) {
      K.style.visibility = p === r ? "" : "visible";
      if (t) {
        t = Math.min(J.height >> 3, J.height);
        var q = J.height - t >> 1, m = p / r * J.width;
        O.fillStyle = "rgba(255,160,122,0.5)";
        O.fillRect(m, q, J.width - m, t);
        O.fillStyle = "rgba(0,128,128,0.5)";
        O.fillRect(0, q, p / r * J.width, t);
      }
      K.innerHTML = u + " " + Math.floor(p / r * 100) + "%";
    }
    function ad() {
      try {
        b(Z, aj);
      } catch (m) {
        V("parse");
      }
    }
    var Z, ae, af = n, U = n, Y = n, w = n, s = n, N = n, G = true, P = true, M = [], x = function() {
      function y() {
        function S() {
          G = !G;
          aa();
          W.focus();
          u();
        }
        function aa() {
          if (G) {
            W.innerHTML = "&#10073;&#10073;";
            W.title = "Pause";
            R.style.visibility = "hidden";
            Q.style.visibility = "hidden";
          } else {
            W.innerHTML = P ? "&#9654;" : "&#9664;";
            W.title = "Play";
            R.style.visibility = "";
            Q.style.visibility = "";
          }
          K.style.visibility = r ? "visible" : "";
          z.style.display = m ? "" : "none";
          E.innerHTML = "i";
          E.title = "Show info/more tools";
          D.innerHTML = P ? "&larr;" : "&rarr;";
          D.title = P ? "Reverse" : "Un-reverse";
          R.innerHTML = "&#9664;&#10073;";
          R.title = "Previous frame";
          Q.innerHTML = "&#10073;&#9654;";
          Q.title = "Next frame";
          B.innerHTML = r ? "&#9675;" : "&#8857;";
          B.title = r ? "Unpin" : "Pin";
          A.innerHTML = "&#10006;";
          A.title = "Close jsgif and go back to original image";
          v.disabled = G;
          q.disabled = G;
          K.innerHTML = "";
          H.innerHTML = "";
          z.innerHTML = "";
          if (M.length < 2) {
            if (af == "xhr") {
              K.appendChild(document.createTextNode("Load failed; cross-domain? "));
              var al = ak("button", "popup");
              al.addEventListener("click", function() {
                window.open(ai.src);
              });
              al.innerHTML = "&nearr;";
              al.title = "Click to open GIF in new window; try running jsgif there instead";
              K.appendChild(al);
            } else {
              af == "parse" && K.appendChild(document.createTextNode("Parse failed "));
            }
            K.appendChild(A);
          } else {
            al = function(an, ao) {
              an.innerHTML = "";
              ao.forEach(function(ap) {
                an.appendChild(ap);
              });
            };
            var am = P ? [E, D, R, W, Q, B, A] : [E, D, Q, W, R, B, A];
            al(K, [H, z]);
            al(H, am);
            al(z, [document.createTextNode(" frame: "), v, document.createTextNode(" / "), document.createTextNode(M.length), document.createTextNode(" (delay: "), q, document.createTextNode(")")]);
          }
        }
        function ak(am, an, al) {
          am = document.createElement(am);
          if (an) {
            am.className = "jsgif_" + an;
          }
          for (var ao in al) {
            am[ao] = al[ao];
          }
          return am;
        }
        var H = ak("div", "simple_tools"), D = ak("button", "rev"), E = ak("button", "show_info"), R = ak("button", "prev"), W = ak("button", "play_pause"), Q = ak("button", "next"), B = ak("button", "pin"), A = ak("button", "close"), z = ak("div", "info_tools");
        v = ak("input", "cur_frame", {type:"text"});
        q = ak("input", "delay_info", {type:"text"});
        E.addEventListener("click", function() {
          m = !m;
          aa();
          E.focus();
        }, C);
        D.addEventListener("click", function() {
          P = !P;
          aa();
          D.focus();
        }, C);
        v.addEventListener("change", function() {
          var al = +v.value;
          if (isNaN(al) || al < 1 || al > M.length) {
            v.value = t + 1;
          } else {
            t = al - 1;
            O.putImageData(M[t].data, 0, 0);
          }
        }, C);
        R.addEventListener("click", function() {
          p(-1);
        }, C);
        W.addEventListener("click", S, C);
        Q.addEventListener("click", function() {
          p(1);
        }, C);
        B.addEventListener("click", function() {
          r = !r;
          aa();
          B.focus();
        }, C);
        A.addEventListener("click", I, C);
        q.addEventListener("change", function() {
          var al = +q.value;
          if (!isNaN(al)) {
            M[t].f = al;
          }
        }, C);
        J.addEventListener("click", S, C);
        L.addEventListener("click", function(al) {
          al.preventDefault();
        }, C);
        aa();
      }
      function p(z) {
        t = (t + z + M.length) % M.length;
        v.value = t + 1;
        q.value = M[t].f;
        O.putImageData(M[t].data, 0, 0);
      }
      var t = -1, v, q, m = C, r = C, u = function() {
        function z() {
          if (A = G) {
            p(P ? 1 : -1);
            var B = M[t].f * 10;
            B || (B = 100);
            setTimeout(z, B);
          }
        }
        var A = C;
        return function() {
          A || setTimeout(z, 0);
        };
      }();
      return function() {
        setTimeout(y, 0);
        if (!af) {
          J.width = ae.width;
          J.height = ae.height;
          u();
        }
      };
    }(), aj = {p:ag(function(m) {
      ae = m;
      J.width = ae.width;
      J.height = ae.height;
      L.style.width = ae.width + "px";
      K.style.minWidth = ae.width + "px";
      X.width = ae.width;
      X.height = ae.height;
    }), o:ag(function(m) {
      F();
      Y = U = n;
      s = w;
      N = w = n;
      U = m.L ? m.M : n;
      Y = m.u;
      w = m.v;
    }), m:ag(ac), c:{l:ag(ac)}, q:ag(function(q) {
      N || (N = X.getContext("2d"));
      var m = q.r ? q.C : ae.w, p = N.getImageData(q.g, q.k, q.width, q.height);
      q.h.forEach(function(t, r) {
        if (U !== t) {
          p.data[r * 4 + 0] = m[t][0];
          p.data[r * 4 + 1] = m[t][1];
          p.data[r * 4 + 2] = m[t][2];
          p.data[r * 4 + 3] = 255;
        } else {
          if (s === 2 || s === 3) {
            p.data[r * 4 + 3] = 0;
          }
        }
      });
      N.putImageData(p, q.g, q.k);
      O.putImageData(p, q.g, q.k);
    }, true), n:function() {
      F();
      T(C);
      K.innerHTML = "Playing...";
      x();
    }}, o = ai.parentNode, L = document.createElement("div"), J = document.createElement("canvas"), O = J.getContext("2d"), K = document.createElement("div"), X = document.createElement("canvas");
    J.width = ai.width;
    J.height = ai.height;
    K.style.minWidth = ai.width + "px";
    L.className = "jsgif";
    K.className = "jsgif_toolbar";
    L.appendChild(J);
    L.appendChild(K);
    o.insertBefore(L, ai);
    o.removeChild(ai);
    K.innerHTML = "Loading...";
    (function() {
      var m = new XMLHttpRequest;
      m.overrideMimeType("text/plain; charset=x-user-defined");
      m.onload = function() {
        Z = new f(m.responseText);
        setTimeout(ad, 0);
      };
      m.onprogress = ah;
      m.onerror = function() {
        V("xhr");
      };
      m.open("GET", ai.src, true);
      m.send();
    })();
  }
  function b(o, u) {
    function r() {
      var q = {};
      q.s = o.a();
      switch(String.fromCharCode(q.s)) {
        case "!":
          q.type = "ext";
          p(q);
          break;
        case ",":
          q.type = "img";
          s(q);
          break;
        case ";":
          q.type = "eof";
          u.n && u.n(q);
          break;
        default:
          throw Error("Unknown block: 0x" + q.s.toString(16));
      }
      q.type !== "eof" && setTimeout(r, 0);
    }
    function s(q) {
      function v(F, I) {
        function J(y, B) {
          var D = F.slice(B * I, (B + 1) * I);
          A.splice.apply(A, [y * I, I].concat(D));
        }
        for (var A = Array(F.length), E = F.length / I, H = [0, 4, 2, 1], G = [8, 8, 4, 2], x = 0, K = 0; K < 4; K++) {
          for (var z = H[K]; z < E; z += G[K]) {
            J(z, x);
            x++;
          }
        }
        return A;
      }
      q.g = o.b();
      q.k = o.b();
      q.width = o.b();
      q.height = o.b();
      var w = l(o.a());
      q.r = w.shift();
      q.B = w.shift();
      q.J = w.shift();
      q.H = w.splice(0, 2);
      q.D = e(w.splice(0, 3));
      if (q.r) {
        q.C = m(1 << q.D + 1);
      }
      q.F = o.a();
      w = t();
      q.h = a(q.F, w);
      if (q.B) {
        q.h = v(q.h, q.width);
      }
      u.q && u.q(q);
    }
    function p(q) {
      function w(A) {
        function z(B) {
          o.a();
          B.t = o.a();
          B.R = o.b();
          B.K = o.a();
          u.c && u.c.l && u.c.l(B);
        }
        o.a();
        A.identifier = o.d(8);
        A.O = o.d(3);
        switch(A.identifier) {
          case "NETSCAPE":
            z(A);
            break;
          default:
            (function(B) {
              B.N = t();
              u.c && u.c[B.identifier] && u.c[B.identifier](B);
            })(A);
        }
      }
      function x(z) {
        o.a();
        z.V = o.j(12);
        z.U = t();
        u.G && u.G(z);
      }
      function v(z) {
        z.Q = t();
        u.m && u.m(z);
      }
      function y(A) {
        o.a();
        var z = l(o.a());
        A.H = z.splice(0, 3);
        A.v = e(z.splice(0, 3));
        A.W = z.shift();
        A.L = z.shift();
        A.u = o.b();
        A.M = o.a();
        A.K = o.a();
        u.o && u.o(A);
      }
      q.label = o.a();
      switch(q.label) {
        case 249:
          q.e = "gce";
          y(q);
          break;
        case 254:
          q.e = "com";
          v(q);
          break;
        case 1:
          q.e = "pte";
          x(q);
          break;
        case 255:
          q.e = "app";
          w(q);
          break;
        default:
          q.e = "unknown";
          (function(z) {
            z.data = t();
            u.t && u.t(z);
          })(q);
      }
    }
    function t() {
      var q, v;
      v = "";
      do {
        q = o.a();
        v += o.d(q);
      } while (q !== 0);
      return v;
    }
    function m(q) {
      for (var v = [], w = 0; w < q; w++) {
        v.push(o.j(3));
      }
      return v;
    }
    u || (u = {});
    (function() {
      var q = {};
      q.I = o.d(3);
      q.X = o.d(3);
      if (q.I !== "GIF") {
        throw Error("Not a GIF file.");
      }
      q.width = o.b();
      q.height = o.b();
      var v = l(o.a());
      q.z = v.shift();
      q.P = e(v.splice(0, 3));
      q.J = v.shift();
      q.A = e(v.splice(0, 3));
      q.bgColor = o.a();
      q.T = o.a();
      if (q.z) {
        q.w = m(1 << q.A + 1);
      }
      u.p && u.p(q);
    })();
    setTimeout(r, 0);
  }
  function a(y, w) {
    function s() {
      t = [];
      r = y + 1;
      for (var q = 0; q < o; q++) {
        t[q] = [q];
      }
      t[o] = [];
      t[x] = n;
    }
    function m(A) {
      for (var z = 0, q = 0; q < A; q++) {
        if (w.charCodeAt(B >> 3) & 1 << (B & 7)) {
          z |= 1 << q;
        }
        B++;
      }
      return z;
    }
    for (var B = 0, v = [], o = 1 << y, x = o + 1, r = y + 1, t = [], p, u;;) {
      u = p;
      p = m(r);
      if (p === o) {
        s();
      } else {
        if (p === x) {
          break;
        }
        if (p < t.length) {
          u !== o && t.push(t[u].concat(t[p][0]));
        } else {
          if (p !== t.length) {
            throw Error("Invalid LZW code.");
          }
          t.push(t[u].concat(t[u][0]));
        }
        v.push.apply(v, t[p]);
        t.length === 1 << r && r < 12 && r++;
      }
    }
    return v;
  }
  function f(m) {
    this.data = m;
    this.S = this.data.length;
    this.i = 0;
    this.a = function() {
      if (this.i >= this.data.length) {
        throw Error("Attempted to read past end of stream.");
      }
      return m.charCodeAt(this.i++) & 255;
    };
    this.j = function(r) {
      for (var o = [], p = 0; p < r; p++) {
        o.push(this.a());
      }
      return o;
    };
    this.d = function(r) {
      for (var o = "", p = 0; p < r; p++) {
        o += String.fromCharCode(this.a());
      }
      return o;
    };
    this.b = function() {
      var o = this.j(2);
      return (o[1] << 8) + o[0];
    };
  }
  function l(m) {
    for (var p = [], o = 7; o >= 0; o--) {
      p.push(!!(m & 1 << o));
    }
    return p;
  }
  function e(m) {
    return m.reduce(function(p, o) {
      return p * 2 + o;
    }, 0);
  }
  var k = function(m) {
    for (var p = [], o = 0; o < m.length; o++) {
      p.push(m[o]);
    }
    return p;
  }(document.getElementsByTagName("img")), c = k.filter(function(m) {
    return m.src.slice(-4).toLowerCase() === ".gif";
  });
  if (c.length === 0) {
    c = k;
  }
  (function(m) {
    var o = document.createElement("style");
    o.type = "text/css";
    o.textContent = m;
    document.body.appendChild(o);
  })(".jsgif{display:inline;position:relative;padding-bottom:3px;}.jsgif_toolbar{visibility:hidden;font-family:sans-serif;background-color:#555;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;overflow:visible;white-space:nowrap;padding:3px;position:absolute;left:0;text-align:center;z-index:50;}.jsgif_toolbar button{width:3em;color:black;text-align:center;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;margin:1px;cursor:pointer;background-color:#ddd;}.jsgif_cur_frame{width:2em;color:black;}.jsgif_delay_info{width:2em;color:black;}.jsgif_toolbar button:hover{color:red;}.jsgif:hover .jsgif_toolbar{visibility:visible;}.jsgif{text-decoration:none;color:black;}.jsgif_overlaid{border:5px solid red;}.jsgif_overlaid:hover{border:5px solid blue;}");
  c.forEach(function(m) {
    if (m.className.split(/\s/).indexOf("jsgif_overlaid") === -1) {
      m.className += " jsgif_overlaid";
      m.addEventListener("click", i, C);
    }
  });
})();
