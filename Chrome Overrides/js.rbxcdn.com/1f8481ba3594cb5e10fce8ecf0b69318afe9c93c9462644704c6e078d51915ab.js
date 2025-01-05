!function() {
    var n = {
        2779: function(e, t) {
            var n;
            /*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
            !function() {
                "use strict";
                var i = {}.hasOwnProperty;
                function l() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        if (n) {
                            var r, a = typeof n;
                            if ("string" == a || "number" == a)
                                e.push(n);
                            else if (Array.isArray(n))
                                !n.length || (r = l.apply(null, n)) && e.push(r);
                            else if ("object" == a)
                                if (n.toString === Object.prototype.toString || n.toString.toString().includes("[native code]"))
                                    for (var o in n)
                                        i.call(n, o) && n[o] && e.push(o);
                                else
                                    e.push(n.toString())
                        }
                    }
                    return e.join(" ")
                }
                e.exports ? (l.default = l,
                e.exports = l) : void 0 === (n = function() {
                    return l
                }
                .apply(t, [])) || (e.exports = n)
            }()
        },
        6635: function(A, L, O) {
            var k;
            /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
            A = O.nmd(A),
            function() {
                var Ho, zo = "Expected a function", Vo = "__lodash_hash_undefined__", Wo = "__lodash_placeholder__", qo = 16, $o = 32, Ko = 64, Yo = 128, Zo = 256, Jo = 1 / 0, Xo = 9007199254740991, Qo = NaN, ei = 4294967295, ti = [["ary", Yo], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", qo], ["flip", 512], ["partial", $o], ["partialRight", Ko], ["rearg", Zo]], ni = "[object Arguments]", ri = "[object Array]", ai = "[object Boolean]", oi = "[object Date]", ii = "[object Error]", li = "[object Function]", ui = "[object GeneratorFunction]", si = "[object Map]", ci = "[object Number]", di = "[object Object]", fi = "[object Promise]", pi = "[object RegExp]", mi = "[object Set]", vi = "[object String]", hi = "[object Symbol]", gi = "[object WeakMap]", yi = "[object ArrayBuffer]", bi = "[object DataView]", Ei = "[object Float32Array]", wi = "[object Float64Array]", Si = "[object Int8Array]", Ii = "[object Int16Array]", Pi = "[object Int32Array]", Ci = "[object Uint8Array]", _i = "[object Uint8ClampedArray]", Ti = "[object Uint16Array]", xi = "[object Uint32Array]", Ni = /\b__p \+= '';/g, Ai = /\b(__p \+=) '' \+/g, Li = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Oi = /&(?:amp|lt|gt|quot|#39);/g, ki = /[&<>"']/g, Di = RegExp(Oi.source), Ri = RegExp(ki.source), Mi = /<%-([\s\S]+?)%>/g, Ui = /<%([\s\S]+?)%>/g, Gi = /<%=([\s\S]+?)%>/g, Bi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ji = /^\w*$/, Fi = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Hi = /[\\^$.*+?()[\]{}|]/g, zi = RegExp(Hi.source), Vi = /^\s+/, n = /\s/, Wi = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, qi = /\{\n\/\* \[wrapped with (.+)\] \*/, $i = /,? & /, Ki = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Yi = /[()=,{}\[\]\/\s]/, Zi = /\\(\\)?/g, Ji = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Xi = /\w*$/, Qi = /^[-+]0x[0-9a-f]+$/i, el = /^0b[01]+$/i, tl = /^\[object .+?Constructor\]$/, nl = /^0o[0-7]+$/i, rl = /^(?:0|[1-9]\d*)$/, al = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, ol = /($^)/, il = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", a = "a-z\\xdf-\\xf6\\xf8-\\xff", o = "A-Z\\xc0-\\xd6\\xd8-\\xde", i = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", u = "['’]", s = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + a + "]", v = "[^" + e + l + f + r + a + o + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", E = "[" + o + "]", w = "\\u200d", S = "(?:" + m + "|" + v + ")", l = "(?:" + E + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", a = "(?:['’](?:D|LL|M|RE|S|T|VE))?", o = "(?:" + d + "|" + h + ")" + "?", v = "[" + i + "]?", o = v + o + ("(?:" + w + "(?:" + [g, y, b].join("|") + ")" + v + o + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + o, s = "(?:" + [g + d + "?", d, y, b, s].join("|") + ")", ll = RegExp(u, "g"), ul = RegExp(d, "g"), I = RegExp(h + "(?=" + h + ")|" + s + o, "g"), sl = RegExp([E + "?" + m + "+" + r + "(?=" + [c, E, "$"].join("|") + ")", l + "+" + a + "(?=" + [c, E + S, "$"].join("|") + ")", E + "?" + S + "+" + r, E + "+" + a, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), P = RegExp("[" + w + e + t + i + "]"), cl = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, dl = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], fl = -1, pl = {};
                pl[Ei] = pl[wi] = pl[Si] = pl[Ii] = pl[Pi] = pl[Ci] = pl[_i] = pl[Ti] = pl[xi] = !0,
                pl[ni] = pl[ri] = pl[yi] = pl[ai] = pl[bi] = pl[oi] = pl[ii] = pl[li] = pl[si] = pl[ci] = pl[di] = pl[pi] = pl[mi] = pl[vi] = pl[gi] = !1;
                var ml = {};
                ml[ni] = ml[ri] = ml[yi] = ml[bi] = ml[ai] = ml[oi] = ml[Ei] = ml[wi] = ml[Si] = ml[Ii] = ml[Pi] = ml[si] = ml[ci] = ml[di] = ml[pi] = ml[mi] = ml[vi] = ml[hi] = ml[Ci] = ml[_i] = ml[Ti] = ml[xi] = !0,
                ml[ii] = ml[li] = ml[gi] = !1;
                var C = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }
                  , vl = parseFloat
                  , hl = parseInt
                  , t = "object" == typeof O.g && O.g && O.g.Object === Object && O.g
                  , i = "object" == typeof self && self && self.Object === Object && self
                  , gl = t || i || Function("return this")()
                  , i = L && !L.nodeType && L
                  , _ = i && A && !A.nodeType && A
                  , yl = _ && _.exports === i
                  , T = yl && t.process
                  , t = function() {
                    try {
                        var e = _ && _.require && _.require("util").types;
                        return e ? e : T && T.binding && T.binding("util")
                    } catch (e) {}
                }()
                  , bl = t && t.isArrayBuffer
                  , El = t && t.isDate
                  , wl = t && t.isMap
                  , Sl = t && t.isRegExp
                  , Il = t && t.isSet
                  , Pl = t && t.isTypedArray;
                function Cl(e, t, n) {
                    switch (n.length) {
                    case 0:
                        return e.call(t);
                    case 1:
                        return e.call(t, n[0]);
                    case 2:
                        return e.call(t, n[0], n[1]);
                    case 3:
                        return e.call(t, n[0], n[1], n[2])
                    }
                    return e.apply(t, n)
                }
                function _l(e, t, n, r) {
                    for (var a = -1, o = null == e ? 0 : e.length; ++a < o; ) {
                        var i = e[a];
                        t(r, i, n(i), e)
                    }
                    return r
                }
                function Tl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function xl(e, t) {
                    for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function Nl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (!t(e[n], n, e))
                            return !1;
                    return !0
                }
                function Al(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, a = 0, o = []; ++n < r; ) {
                        var i = e[n];
                        t(i, n, e) && (o[a++] = i)
                    }
                    return o
                }
                function Ll(e, t) {
                    return !!(null == e ? 0 : e.length) && -1 < jl(e, t, 0)
                }
                function Ol(e, t, n) {
                    for (var r = -1, a = null == e ? 0 : e.length; ++r < a; )
                        if (n(t, e[r]))
                            return !0;
                    return !1
                }
                function kl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, a = Array(r); ++n < r; )
                        a[n] = t(e[n], n, e);
                    return a
                }
                function Dl(e, t) {
                    for (var n = -1, r = t.length, a = e.length; ++n < r; )
                        e[a + n] = t[n];
                    return e
                }
                function Rl(e, t, n, r) {
                    var a = -1
                      , o = null == e ? 0 : e.length;
                    for (r && o && (n = e[++a]); ++a < o; )
                        n = t(n, e[a], a, e);
                    return n
                }
                function Ml(e, t, n, r) {
                    var a = null == e ? 0 : e.length;
                    for (r && a && (n = e[--a]); a--; )
                        n = t(n, e[a], a, e);
                    return n
                }
                function Ul(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var x = Vl("length");
                function Gl(e, r, t) {
                    var a;
                    return t(e, function(e, t, n) {
                        if (r(e, t, n))
                            return a = t,
                            !1
                    }),
                    a
                }
                function Bl(e, t, n, r) {
                    for (var a = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < a; )
                        if (t(e[o], o, e))
                            return o;
                    return -1
                }
                function jl(e, t, n) {
                    return t == t ? function(e, t, n) {
                        var r = n - 1
                          , a = e.length;
                        for (; ++r < a; )
                            if (e[r] === t)
                                return r;
                        return -1
                    }(e, t, n) : Bl(e, Hl, n)
                }
                function Fl(e, t, n, r) {
                    for (var a = n - 1, o = e.length; ++a < o; )
                        if (r(e[a], t))
                            return a;
                    return -1
                }
                function Hl(e) {
                    return e != e
                }
                function zl(e, t) {
                    var n = null == e ? 0 : e.length;
                    return n ? ql(e, t) / n : Qo
                }
                function Vl(t) {
                    return function(e) {
                        return null == e ? Ho : e[t]
                    }
                }
                function N(t) {
                    return function(e) {
                        return null == t ? Ho : t[e]
                    }
                }
                function Wl(e, r, a, o, t) {
                    return t(e, function(e, t, n) {
                        a = o ? (o = !1,
                        e) : r(a, e, t, n)
                    }),
                    a
                }
                function ql(e, t) {
                    for (var n, r = -1, a = e.length; ++r < a; ) {
                        var o = t(e[r]);
                        o !== Ho && (n = n === Ho ? o : n + o)
                    }
                    return n
                }
                function $l(e, t) {
                    for (var n = -1, r = Array(e); ++n < e; )
                        r[n] = t(n);
                    return r
                }
                function Kl(e) {
                    return e && e.slice(0, cu(e) + 1).replace(Vi, "")
                }
                function Yl(t) {
                    return function(e) {
                        return t(e)
                    }
                }
                function Zl(t, e) {
                    return kl(e, function(e) {
                        return t[e]
                    })
                }
                function Jl(e, t) {
                    return e.has(t)
                }
                function Xl(e, t) {
                    for (var n = -1, r = e.length; ++n < r && -1 < jl(t, e[n], 0); )
                        ;
                    return n
                }
                function Ql(e, t) {
                    for (var n = e.length; n-- && -1 < jl(t, e[n], 0); )
                        ;
                    return n
                }
                var eu = N({
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss",
                    "Ā": "A",
                    "Ă": "A",
                    "Ą": "A",
                    "ā": "a",
                    "ă": "a",
                    "ą": "a",
                    "Ć": "C",
                    "Ĉ": "C",
                    "Ċ": "C",
                    "Č": "C",
                    "ć": "c",
                    "ĉ": "c",
                    "ċ": "c",
                    "č": "c",
                    "Ď": "D",
                    "Đ": "D",
                    "ď": "d",
                    "đ": "d",
                    "Ē": "E",
                    "Ĕ": "E",
                    "Ė": "E",
                    "Ę": "E",
                    "Ě": "E",
                    "ē": "e",
                    "ĕ": "e",
                    "ė": "e",
                    "ę": "e",
                    "ě": "e",
                    "Ĝ": "G",
                    "Ğ": "G",
                    "Ġ": "G",
                    "Ģ": "G",
                    "ĝ": "g",
                    "ğ": "g",
                    "ġ": "g",
                    "ģ": "g",
                    "Ĥ": "H",
                    "Ħ": "H",
                    "ĥ": "h",
                    "ħ": "h",
                    "Ĩ": "I",
                    "Ī": "I",
                    "Ĭ": "I",
                    "Į": "I",
                    "İ": "I",
                    "ĩ": "i",
                    "ī": "i",
                    "ĭ": "i",
                    "į": "i",
                    "ı": "i",
                    "Ĵ": "J",
                    "ĵ": "j",
                    "Ķ": "K",
                    "ķ": "k",
                    "ĸ": "k",
                    "Ĺ": "L",
                    "Ļ": "L",
                    "Ľ": "L",
                    "Ŀ": "L",
                    "Ł": "L",
                    "ĺ": "l",
                    "ļ": "l",
                    "ľ": "l",
                    "ŀ": "l",
                    "ł": "l",
                    "Ń": "N",
                    "Ņ": "N",
                    "Ň": "N",
                    "Ŋ": "N",
                    "ń": "n",
                    "ņ": "n",
                    "ň": "n",
                    "ŋ": "n",
                    "Ō": "O",
                    "Ŏ": "O",
                    "Ő": "O",
                    "ō": "o",
                    "ŏ": "o",
                    "ő": "o",
                    "Ŕ": "R",
                    "Ŗ": "R",
                    "Ř": "R",
                    "ŕ": "r",
                    "ŗ": "r",
                    "ř": "r",
                    "Ś": "S",
                    "Ŝ": "S",
                    "Ş": "S",
                    "Š": "S",
                    "ś": "s",
                    "ŝ": "s",
                    "ş": "s",
                    "š": "s",
                    "Ţ": "T",
                    "Ť": "T",
                    "Ŧ": "T",
                    "ţ": "t",
                    "ť": "t",
                    "ŧ": "t",
                    "Ũ": "U",
                    "Ū": "U",
                    "Ŭ": "U",
                    "Ů": "U",
                    "Ű": "U",
                    "Ų": "U",
                    "ũ": "u",
                    "ū": "u",
                    "ŭ": "u",
                    "ů": "u",
                    "ű": "u",
                    "ų": "u",
                    "Ŵ": "W",
                    "ŵ": "w",
                    "Ŷ": "Y",
                    "ŷ": "y",
                    "Ÿ": "Y",
                    "Ź": "Z",
                    "Ż": "Z",
                    "Ž": "Z",
                    "ź": "z",
                    "ż": "z",
                    "ž": "z",
                    "Ĳ": "IJ",
                    "ĳ": "ij",
                    "Œ": "Oe",
                    "œ": "oe",
                    "ŉ": "'n",
                    "ſ": "s"
                })
                  , tu = N({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function nu(e) {
                    return "\\" + C[e]
                }
                function ru(e) {
                    return P.test(e)
                }
                function au(e) {
                    var n = -1
                      , r = Array(e.size);
                    return e.forEach(function(e, t) {
                        r[++n] = [t, e]
                    }),
                    r
                }
                function ou(t, n) {
                    return function(e) {
                        return t(n(e))
                    }
                }
                function iu(e, t) {
                    for (var n = -1, r = e.length, a = 0, o = []; ++n < r; ) {
                        var i = e[n];
                        i !== t && i !== Wo || (e[n] = Wo,
                        o[a++] = n)
                    }
                    return o
                }
                function lu(e) {
                    var t = -1
                      , n = Array(e.size);
                    return e.forEach(function(e) {
                        n[++t] = e
                    }),
                    n
                }
                function uu(e) {
                    return (ru(e) ? function(e) {
                        var t = I.lastIndex = 0;
                        for (; I.test(e); )
                            ++t;
                        return t
                    }
                    : x)(e)
                }
                function su(e) {
                    return ru(e) ? e.match(I) || [] : e.split("")
                }
                function cu(e) {
                    for (var t = e.length; t-- && n.test(e.charAt(t)); )
                        ;
                    return t
                }
                var du = N({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                });
                var fu = function e(t) {
                    var I = (t = null == t ? gl : fu.defaults(gl.Object(), t, fu.pick(gl, dl))).Array
                      , n = t.Date
                      , d = t.Error
                      , f = t.Function
                      , a = t.Math
                      , v = t.Object
                      , p = t.RegExp
                      , c = t.String
                      , S = t.TypeError
                      , o = I.prototype
                      , r = f.prototype
                      , m = v.prototype
                      , i = t["__core-js_shared__"]
                      , l = r.toString
                      , y = m.hasOwnProperty
                      , u = 0
                      , s = (ko = /[^.]+$/.exec(i && i.keys && i.keys.IE_PROTO || "")) ? "Symbol(src)_1." + ko : ""
                      , h = m.toString
                      , g = l.call(v)
                      , b = gl._
                      , E = p("^" + l.call(y).replace(Hi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , w = yl ? t.Buffer : Ho
                      , P = t.Symbol
                      , C = t.Uint8Array
                      , _ = w ? w.allocUnsafe : Ho
                      , T = ou(v.getPrototypeOf, v)
                      , x = v.create
                      , N = m.propertyIsEnumerable
                      , A = o.splice
                      , L = P ? P.isConcatSpreadable : Ho
                      , O = P ? P.iterator : Ho
                      , k = P ? P.toStringTag : Ho
                      , D = function() {
                        try {
                            var e = Hn(v, "defineProperty");
                            return e({}, "", {}),
                            e
                        } catch (e) {}
                    }()
                      , R = t.clearTimeout !== gl.clearTimeout && t.clearTimeout
                      , M = n && n.now !== gl.Date.now && n.now
                      , U = t.setTimeout !== gl.setTimeout && t.setTimeout
                      , G = a.ceil
                      , B = a.floor
                      , j = v.getOwnPropertySymbols
                      , F = w ? w.isBuffer : Ho
                      , H = t.isFinite
                      , z = o.join
                      , V = ou(v.keys, v)
                      , W = a.max
                      , q = a.min
                      , $ = n.now
                      , K = t.parseInt
                      , Y = a.random
                      , Z = o.reverse
                      , J = Hn(t, "DataView")
                      , X = Hn(t, "Map")
                      , Q = Hn(t, "Promise")
                      , ee = Hn(t, "Set")
                      , te = Hn(t, "WeakMap")
                      , ne = Hn(v, "create")
                      , re = te && new te
                      , ae = {}
                      , oe = hr(J)
                      , ie = hr(X)
                      , le = hr(Q)
                      , ue = hr(ee)
                      , se = hr(te)
                      , ce = P ? P.prototype : Ho
                      , de = ce ? ce.valueOf : Ho
                      , fe = ce ? ce.toString : Ho;
                    function pe(e) {
                        if (ka(e) && !Sa(e) && !(e instanceof ye)) {
                            if (e instanceof ge)
                                return e;
                            if (y.call(e, "__wrapped__"))
                                return gr(e)
                        }
                        return new ge(e)
                    }
                    var me = function(e) {
                        if (!Oa(e))
                            return {};
                        if (x)
                            return x(e);
                        ve.prototype = e;
                        e = new ve;
                        return ve.prototype = Ho,
                        e
                    };
                    function ve() {}
                    function he() {}
                    function ge(e, t) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__chain__ = !!t,
                        this.__index__ = 0,
                        this.__values__ = Ho
                    }
                    function ye(e) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__dir__ = 1,
                        this.__filtered__ = !1,
                        this.__iteratees__ = [],
                        this.__takeCount__ = ei,
                        this.__views__ = []
                    }
                    function be(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function Ee(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function we(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function Se(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.__data__ = new we; ++t < n; )
                            this.add(e[t])
                    }
                    function Ie(e) {
                        e = this.__data__ = new Ee(e);
                        this.size = e.size
                    }
                    function Pe(e, t) {
                        var n, r = Sa(e), a = !r && wa(e), o = !r && !a && _a(e), i = !r && !a && !o && Fa(e), l = r || a || o || i, u = l ? $l(e.length, c) : [], s = u.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || o && ("offset" == n || "parent" == n) || i && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Yn(n, s)) || u.push(n);
                        return u
                    }
                    function Ce(e) {
                        var t = e.length;
                        return t ? e[St(0, t - 1)] : Ho
                    }
                    function _e(e, t) {
                        return dr(rn(e), Re(t, 0, e.length))
                    }
                    function Te(e) {
                        return dr(rn(e))
                    }
                    function xe(e, t, n) {
                        (n === Ho || ya(e[t], n)) && (n !== Ho || t in e) || ke(e, t, n)
                    }
                    function Ne(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && ya(r, n) && (n !== Ho || t in e) || ke(e, t, n)
                    }
                    function Ae(e, t) {
                        for (var n = e.length; n--; )
                            if (ya(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Le(e, r, a, o) {
                        return je(e, function(e, t, n) {
                            r(o, e, a(e), n)
                        }),
                        o
                    }
                    function Oe(e, t) {
                        return e && an(t, so(t), e)
                    }
                    function ke(e, t, n) {
                        "__proto__" == t && D ? D(e, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: n,
                            writable: !0
                        }) : e[t] = n
                    }
                    function De(e, t) {
                        for (var n = -1, r = t.length, a = I(r), o = null == e; ++n < r; )
                            a[n] = o ? Ho : ao(e, t[n]);
                        return a
                    }
                    function Re(e, t, n) {
                        return e == e && (n !== Ho && (e = e <= n ? e : n),
                        t !== Ho && (e = t <= e ? e : t)),
                        e
                    }
                    function Me(n, r, a, e, t, o) {
                        var i, l = 1 & r, u = 2 & r, s = 4 & r;
                        if (a && (i = t ? a(n, e, t, o) : a(n)),
                        i !== Ho)
                            return i;
                        if (!Oa(n))
                            return n;
                        var c, d, f = Sa(n);
                        if (f) {
                            if (i = function(e) {
                                var t = e.length
                                  , n = new e.constructor(t);
                                t && "string" == typeof e[0] && y.call(e, "index") && (n.index = e.index,
                                n.input = e.input);
                                return n
                            }(n),
                            !l)
                                return rn(n, i)
                        } else {
                            var p = Wn(n)
                              , e = p == li || p == ui;
                            if (_a(n))
                                return Jt(n, l);
                            if (p == di || p == ni || e && !t) {
                                if (i = u || e ? {} : $n(n),
                                !l)
                                    return u ? (e = c = n,
                                    d = (d = i) && an(e, co(e), d),
                                    an(c, Vn(c), d)) : (d = Oe(i, c = n),
                                    an(c, zn(c), d))
                            } else {
                                if (!ml[p])
                                    return t ? n : {};
                                i = function(e, t, n) {
                                    var r = e.constructor;
                                    switch (t) {
                                    case yi:
                                        return Xt(e);
                                    case ai:
                                    case oi:
                                        return new r(+e);
                                    case bi:
                                        return function(e, t) {
                                            t = t ? Xt(e.buffer) : e.buffer;
                                            return new e.constructor(t,e.byteOffset,e.byteLength)
                                        }(e, n);
                                    case Ei:
                                    case wi:
                                    case Si:
                                    case Ii:
                                    case Pi:
                                    case Ci:
                                    case _i:
                                    case Ti:
                                    case xi:
                                        return Qt(e, n);
                                    case si:
                                        return new r;
                                    case ci:
                                    case vi:
                                        return new r(e);
                                    case pi:
                                        return function(e) {
                                            var t = new e.constructor(e.source,Xi.exec(e));
                                            return t.lastIndex = e.lastIndex,
                                            t
                                        }(e);
                                    case mi:
                                        return new r;
                                    case hi:
                                        return function(e) {
                                            return de ? v(de.call(e)) : {}
                                        }(e)
                                    }
                                }(n, p, l)
                            }
                        }
                        l = (o = o || new Ie).get(n);
                        if (l)
                            return l;
                        o.set(n, i),
                        Ga(n) ? n.forEach(function(e) {
                            i.add(Me(e, r, a, e, n, o))
                        }) : Da(n) && n.forEach(function(e, t) {
                            i.set(t, Me(e, r, a, t, n, o))
                        });
                        var m = f ? Ho : (s ? u ? Rn : Dn : u ? co : so)(n);
                        return Tl(m || n, function(e, t) {
                            m && (e = n[t = e]),
                            Ne(i, t, Me(e, r, a, t, n, o))
                        }),
                        i
                    }
                    function Ue(e, t, n) {
                        var r = n.length;
                        if (null == e)
                            return !r;
                        for (e = v(e); r--; ) {
                            var a = n[r]
                              , o = t[a]
                              , i = e[a];
                            if (i === Ho && !(a in e) || !o(i))
                                return !1
                        }
                        return !0
                    }
                    function Ge(e, t, n) {
                        if ("function" != typeof e)
                            throw new S(zo);
                        return lr(function() {
                            e.apply(Ho, n)
                        }, t)
                    }
                    function Be(e, t, n, r) {
                        var a = -1
                          , o = Ll
                          , i = !0
                          , l = e.length
                          , u = []
                          , s = t.length;
                        if (!l)
                            return u;
                        n && (t = kl(t, Yl(n))),
                        r ? (o = Ol,
                        i = !1) : 200 <= t.length && (o = Jl,
                        i = !1,
                        t = new Se(t));
                        e: for (; ++a < l; ) {
                            var c = e[a]
                              , d = null == n ? c : n(c)
                              , c = r || 0 !== c ? c : 0;
                            if (i && d == d) {
                                for (var f = s; f--; )
                                    if (t[f] === d)
                                        continue e;
                                u.push(c)
                            } else
                                o(t, d, r) || u.push(c)
                        }
                        return u
                    }
                    pe.templateSettings = {
                        escape: Mi,
                        evaluate: Ui,
                        interpolate: Gi,
                        variable: "",
                        imports: {
                            _: pe
                        }
                    },
                    (pe.prototype = he.prototype).constructor = pe,
                    (ge.prototype = me(he.prototype)).constructor = ge,
                    (ye.prototype = me(he.prototype)).constructor = ye,
                    be.prototype.clear = function() {
                        this.__data__ = ne ? ne(null) : {},
                        this.size = 0
                    }
                    ,
                    be.prototype.delete = function(e) {
                        return e = this.has(e) && delete this.__data__[e],
                        this.size -= e ? 1 : 0,
                        e
                    }
                    ,
                    be.prototype.get = function(e) {
                        var t = this.__data__;
                        if (ne) {
                            var n = t[e];
                            return n === Vo ? Ho : n
                        }
                        return y.call(t, e) ? t[e] : Ho
                    }
                    ,
                    be.prototype.has = function(e) {
                        var t = this.__data__;
                        return ne ? t[e] !== Ho : y.call(t, e)
                    }
                    ,
                    be.prototype.set = function(e, t) {
                        var n = this.__data__;
                        return this.size += this.has(e) ? 0 : 1,
                        n[e] = ne && t === Ho ? Vo : t,
                        this
                    }
                    ,
                    Ee.prototype.clear = function() {
                        this.__data__ = [],
                        this.size = 0
                    }
                    ,
                    Ee.prototype.delete = function(e) {
                        var t = this.__data__;
                        return !((e = Ae(t, e)) < 0) && (e == t.length - 1 ? t.pop() : A.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ee.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = Ae(t, e)) < 0 ? Ho : t[e][1]
                    }
                    ,
                    Ee.prototype.has = function(e) {
                        return -1 < Ae(this.__data__, e)
                    }
                    ,
                    Ee.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = Ae(n, e);
                        return r < 0 ? (++this.size,
                        n.push([e, t])) : n[r][1] = t,
                        this
                    }
                    ,
                    we.prototype.clear = function() {
                        this.size = 0,
                        this.__data__ = {
                            hash: new be,
                            map: new (X || Ee),
                            string: new be
                        }
                    }
                    ,
                    we.prototype.delete = function(e) {
                        return e = jn(this, e).delete(e),
                        this.size -= e ? 1 : 0,
                        e
                    }
                    ,
                    we.prototype.get = function(e) {
                        return jn(this, e).get(e)
                    }
                    ,
                    we.prototype.has = function(e) {
                        return jn(this, e).has(e)
                    }
                    ,
                    we.prototype.set = function(e, t) {
                        var n = jn(this, e)
                          , r = n.size;
                        return n.set(e, t),
                        this.size += n.size == r ? 0 : 1,
                        this
                    }
                    ,
                    Se.prototype.add = Se.prototype.push = function(e) {
                        return this.__data__.set(e, Vo),
                        this
                    }
                    ,
                    Se.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ie.prototype.clear = function() {
                        this.__data__ = new Ee,
                        this.size = 0
                    }
                    ,
                    Ie.prototype.delete = function(e) {
                        var t = this.__data__
                          , e = t.delete(e);
                        return this.size = t.size,
                        e
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__;
                        if (n instanceof Ee) {
                            var r = n.__data__;
                            if (!X || r.length < 199)
                                return r.push([e, t]),
                                this.size = ++n.size,
                                this;
                            n = this.__data__ = new we(r)
                        }
                        return n.set(e, t),
                        this.size = n.size,
                        this
                    }
                    ;
                    var je = un(Ke)
                      , Fe = un(Ye, !0);
                    function He(e, r) {
                        var a = !0;
                        return je(e, function(e, t, n) {
                            return a = !!r(e, t, n)
                        }),
                        a
                    }
                    function ze(e, t, n) {
                        for (var r = -1, a = e.length; ++r < a; ) {
                            var o, i, l = e[r], u = t(l);
                            null != u && (o === Ho ? u == u && !ja(u) : n(u, o)) && (o = u,
                            i = l)
                        }
                        return i
                    }
                    function Ve(e, r) {
                        var a = [];
                        return je(e, function(e, t, n) {
                            r(e, t, n) && a.push(e)
                        }),
                        a
                    }
                    function We(e, t, n, r, a) {
                        var o = -1
                          , i = e.length;
                        for (n = n || Kn,
                        a = a || []; ++o < i; ) {
                            var l = e[o];
                            0 < t && n(l) ? 1 < t ? We(l, t - 1, n, r, a) : Dl(a, l) : r || (a[a.length] = l)
                        }
                        return a
                    }
                    var qe = sn()
                      , $e = sn(!0);
                    function Ke(e, t) {
                        return e && qe(e, t, so)
                    }
                    function Ye(e, t) {
                        return e && $e(e, t, so)
                    }
                    function Ze(t, e) {
                        return Al(e, function(e) {
                            return Na(t[e])
                        })
                    }
                    function Je(e, t) {
                        for (var n = 0, r = (t = $t(t, e)).length; null != e && n < r; )
                            e = e[vr(t[n++])];
                        return n && n == r ? e : Ho
                    }
                    function Xe(e, t, n) {
                        t = t(e);
                        return Sa(e) ? t : Dl(t, n(e))
                    }
                    function Qe(e) {
                        return null == e ? e === Ho ? "[object Undefined]" : "[object Null]" : k && k in v(e) ? function(e) {
                            var t = y.call(e, k)
                              , n = e[k];
                            try {
                                e[k] = Ho;
                                var r = !0
                            } catch (e) {}
                            var a = h.call(e);
                            r && (t ? e[k] = n : delete e[k]);
                            return a
                        }(e) : (e = e,
                        h.call(e))
                    }
                    function et(e, t) {
                        return t < e
                    }
                    function tt(e, t) {
                        return null != e && y.call(e, t)
                    }
                    function nt(e, t) {
                        return null != e && t in v(e)
                    }
                    function rt(e, t, n) {
                        for (var r = n ? Ol : Ll, a = e[0].length, o = e.length, i = o, l = I(o), u = 1 / 0, s = []; i--; ) {
                            var c = e[i];
                            i && t && (c = kl(c, Yl(t))),
                            u = q(c.length, u),
                            l[i] = !n && (t || 120 <= a && 120 <= c.length) ? new Se(i && c) : Ho
                        }
                        c = e[0];
                        var d = -1
                          , f = l[0];
                        e: for (; ++d < a && s.length < u; ) {
                            var p = c[d]
                              , m = t ? t(p) : p
                              , p = n || 0 !== p ? p : 0;
                            if (!(f ? Jl(f, m) : r(s, m, n))) {
                                for (i = o; --i; ) {
                                    var v = l[i];
                                    if (!(v ? Jl(v, m) : r(e[i], m, n)))
                                        continue e
                                }
                                f && f.push(m),
                                s.push(p)
                            }
                        }
                        return s
                    }
                    function at(e, t, n) {
                        t = null == (e = ar(e, t = $t(t, e))) ? e : e[vr(xr(t))];
                        return null == t ? Ho : Cl(t, e, n)
                    }
                    function ot(e) {
                        return ka(e) && Qe(e) == ni
                    }
                    function it(e, t, n, r, a) {
                        return e === t || (null == e || null == t || !ka(e) && !ka(t) ? e != e && t != t : function(e, t, n, r, a, o) {
                            var i = Sa(e)
                              , l = Sa(t)
                              , u = i ? ri : Wn(e)
                              , s = l ? ri : Wn(t)
                              , c = (u = u == ni ? di : u) == di
                              , l = (s = s == ni ? di : s) == di
                              , s = u == s;
                            if (s && _a(e)) {
                                if (!_a(t))
                                    return !1;
                                c = !(i = !0)
                            }
                            if (s && !c)
                                return o = o || new Ie,
                                i || Fa(e) ? On(e, t, n, r, a, o) : function(e, t, n, r, a, o, i) {
                                    switch (n) {
                                    case bi:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                                            return !1;
                                        e = e.buffer,
                                        t = t.buffer;
                                    case yi:
                                        return e.byteLength == t.byteLength && o(new C(e), new C(t)) ? !0 : !1;
                                    case ai:
                                    case oi:
                                    case ci:
                                        return ya(+e, +t);
                                    case ii:
                                        return e.name == t.name && e.message == t.message;
                                    case pi:
                                    case vi:
                                        return e == t + "";
                                    case si:
                                        var l = au;
                                    case mi:
                                        var u = 1 & r;
                                        if (l = l || lu,
                                        e.size != t.size && !u)
                                            return !1;
                                        u = i.get(e);
                                        if (u)
                                            return u == t;
                                        r |= 2,
                                        i.set(e, t);
                                        l = On(l(e), l(t), r, a, o, i);
                                        return i.delete(e),
                                        l;
                                    case hi:
                                        if (de)
                                            return de.call(e) == de.call(t)
                                    }
                                    return !1
                                }(e, t, u, n, r, a, o);
                            if (!(1 & n)) {
                                c = c && y.call(e, "__wrapped__"),
                                l = l && y.call(t, "__wrapped__");
                                if (c || l) {
                                    c = c ? e.value() : e,
                                    l = l ? t.value() : t;
                                    return o = o || new Ie,
                                    a(c, l, n, r, o)
                                }
                            }
                            return s && (o = o || new Ie,
                            function(e, t, n, r, a, o) {
                                var i = 1 & n
                                  , l = Dn(e)
                                  , u = l.length
                                  , s = Dn(t).length;
                                if (u != s && !i)
                                    return !1;
                                var c = u;
                                for (; c--; ) {
                                    var d = l[c];
                                    if (!(i ? d in t : y.call(t, d)))
                                        return !1
                                }
                                var f = o.get(e)
                                  , s = o.get(t);
                                if (f && s)
                                    return f == t && s == e;
                                var p = !0;
                                o.set(e, t),
                                o.set(t, e);
                                var m = i;
                                for (; ++c < u; ) {
                                    d = l[c];
                                    var v, h = e[d], g = t[d];
                                    if (r && (v = i ? r(g, h, d, t, e, o) : r(h, g, d, e, t, o)),
                                    !(v === Ho ? h === g || a(h, g, n, r, o) : v)) {
                                        p = !1;
                                        break
                                    }
                                    m = m || "constructor" == d
                                }
                                p && !m && (f = e.constructor,
                                s = t.constructor,
                                f != s && "constructor"in e && "constructor"in t && !("function" == typeof f && f instanceof f && "function" == typeof s && s instanceof s) && (p = !1));
                                return o.delete(e),
                                o.delete(t),
                                p
                            }(e, t, n, r, a, o))
                        }(e, t, n, r, it, a))
                    }
                    function lt(e, t, n, r) {
                        var a = n.length
                          , o = a
                          , i = !r;
                        if (null == e)
                            return !o;
                        for (e = v(e); a--; ) {
                            var l = n[a];
                            if (i && l[2] ? l[1] !== e[l[0]] : !(l[0]in e))
                                return !1
                        }
                        for (; ++a < o; ) {
                            var u = (l = n[a])[0]
                              , s = e[u]
                              , c = l[1];
                            if (i && l[2]) {
                                if (s === Ho && !(u in e))
                                    return !1
                            } else {
                                var d, f = new Ie;
                                if (r && (d = r(s, c, u, e, t, f)),
                                !(d === Ho ? it(c, s, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function ut(e) {
                        return !(!Oa(e) || (t = e,
                        s && s in t)) && (Na(e) ? E : tl).test(hr(e));
                        var t
                    }
                    function st(e) {
                        return "function" == typeof e ? e : null == e ? Do : "object" == typeof e ? Sa(e) ? vt(e[0], e[1]) : mt(e) : Go(e)
                    }
                    function ct(e) {
                        if (!er(e))
                            return V(e);
                        var t, n = [];
                        for (t in v(e))
                            y.call(e, t) && "constructor" != t && n.push(t);
                        return n
                    }
                    function dt(e) {
                        if (!Oa(e))
                            return function(e) {
                                var t = [];
                                if (null != e)
                                    for (var n in v(e))
                                        t.push(n);
                                return t
                            }(e);
                        var t, n = er(e), r = [];
                        for (t in e)
                            ("constructor" != t || !n && y.call(e, t)) && r.push(t);
                        return r
                    }
                    function ft(e, t) {
                        return e < t
                    }
                    function pt(e, r) {
                        var a = -1
                          , o = Pa(e) ? I(e.length) : [];
                        return je(e, function(e, t, n) {
                            o[++a] = r(e, t, n)
                        }),
                        o
                    }
                    function mt(t) {
                        var n = Fn(t);
                        return 1 == n.length && n[0][2] ? nr(n[0][0], n[0][1]) : function(e) {
                            return e === t || lt(e, t, n)
                        }
                    }
                    function vt(n, r) {
                        return Jn(n) && tr(r) ? nr(vr(n), r) : function(e) {
                            var t = ao(e, n);
                            return t === Ho && t === r ? oo(e, n) : it(r, t, 3)
                        }
                    }
                    function ht(r, a, o, i, l) {
                        r !== a && qe(a, function(e, t) {
                            var n;
                            l = l || new Ie,
                            Oa(e) ? function(e, t, n, r, a, o, i) {
                                var l = or(e, n)
                                  , u = or(t, n)
                                  , s = i.get(u);
                                if (s)
                                    return xe(e, n, s);
                                var c, d = o ? o(l, u, n + "", e, t, i) : Ho, f = d === Ho;
                                f && (c = Sa(u),
                                s = !c && _a(u),
                                t = !c && !s && Fa(u),
                                d = u,
                                c || s || t ? d = Sa(l) ? l : Ca(l) ? rn(l) : s ? Jt(u, !(f = !1)) : t ? Qt(u, !(f = !1)) : [] : Ma(u) || wa(u) ? wa(d = l) ? d = Ya(l) : Oa(l) && !Na(l) || (d = $n(u)) : f = !1),
                                f && (i.set(u, d),
                                a(d, u, r, o, i),
                                i.delete(u)),
                                xe(e, n, d)
                            }(r, a, t, o, ht, i, l) : ((n = i ? i(or(r, t), e, t + "", r, a, l) : Ho) === Ho && (n = e),
                            xe(r, t, n))
                        }, co)
                    }
                    function gt(e, t) {
                        var n = e.length;
                        if (n)
                            return Yn(t += t < 0 ? n : 0, n) ? e[t] : Ho
                    }
                    function yt(e, r, n) {
                        r = r.length ? kl(r, function(t) {
                            return Sa(t) ? function(e) {
                                return Je(e, 1 === t.length ? t[0] : t)
                            }
                            : t
                        }) : [Do];
                        var a = -1;
                        return r = kl(r, Yl(Bn())),
                        function(e, t) {
                            var n = e.length;
                            for (e.sort(t); n--; )
                                e[n] = e[n].value;
                            return e
                        }(pt(e, function(t, e, n) {
                            return {
                                criteria: kl(r, function(e) {
                                    return e(t)
                                }),
                                index: ++a,
                                value: t
                            }
                        }), function(e, t) {
                            return function(e, t, n) {
                                var r = -1
                                  , a = e.criteria
                                  , o = t.criteria
                                  , i = a.length
                                  , l = n.length;
                                for (; ++r < i; ) {
                                    var u = en(a[r], o[r]);
                                    if (u) {
                                        if (l <= r)
                                            return u;
                                        var s = n[r];
                                        return u * ("desc" == s ? -1 : 1)
                                    }
                                }
                                return e.index - t.index
                            }(e, t, n)
                        })
                    }
                    function bt(e, t, n) {
                        for (var r = -1, a = t.length, o = {}; ++r < a; ) {
                            var i = t[r]
                              , l = Je(e, i);
                            n(l, i) && Tt(o, $t(i, e), l)
                        }
                        return o
                    }
                    function Et(e, t, n, r) {
                        var a = r ? Fl : jl
                          , o = -1
                          , i = t.length
                          , l = e;
                        for (e === t && (t = rn(t)),
                        n && (l = kl(e, Yl(n))); ++o < i; )
                            for (var u = 0, s = t[o], c = n ? n(s) : s; -1 < (u = a(l, c, u, r)); )
                                l !== e && A.call(l, u, 1),
                                A.call(e, u, 1);
                        return e
                    }
                    function wt(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var a, o = t[n];
                            n != r && o === a || (Yn(a = o) ? A.call(e, o, 1) : Bt(e, o))
                        }
                        return e
                    }
                    function St(e, t) {
                        return e + B(Y() * (t - e + 1))
                    }
                    function It(e, t) {
                        var n = "";
                        if (!e || t < 1 || Xo < t)
                            return n;
                        for (; t % 2 && (n += e),
                        (t = B(t / 2)) && (e += e),
                        t; )
                            ;
                        return n
                    }
                    function Pt(e, t) {
                        return ur(rr(e, t, Do), e + "")
                    }
                    function Ct(e) {
                        return Ce(bo(e))
                    }
                    function _t(e, t) {
                        e = bo(e);
                        return dr(e, Re(t, 0, e.length))
                    }
                    function Tt(e, t, n, r) {
                        if (!Oa(e))
                            return e;
                        for (var a = -1, o = (t = $t(t, e)).length, i = o - 1, l = e; null != l && ++a < o; ) {
                            var u, s = vr(t[a]), c = n;
                            if ("__proto__" === s || "constructor" === s || "prototype" === s)
                                return e;
                            a != i && (u = l[s],
                            (c = r ? r(u, s, l) : Ho) === Ho && (c = Oa(u) ? u : Yn(t[a + 1]) ? [] : {})),
                            Ne(l, s, c),
                            l = l[s]
                        }
                        return e
                    }
                    var xt = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : Do
                      , Nt = D ? function(e, t) {
                        return D(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Oo(t),
                            writable: !0
                        })
                    }
                    : Do;
                    function At(e) {
                        return dr(bo(e))
                    }
                    function Lt(e, t, n) {
                        var r = -1
                          , a = e.length;
                        t < 0 && (t = a < -t ? 0 : a + t),
                        (n = a < n ? a : n) < 0 && (n += a),
                        a = n < t ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var o = I(a); ++r < a; )
                            o[r] = e[r + t];
                        return o
                    }
                    function Ot(e, r) {
                        var a;
                        return je(e, function(e, t, n) {
                            return !(a = r(e, t, n))
                        }),
                        !!a
                    }
                    function kt(e, t, n) {
                        var r = 0
                          , a = null == e ? r : e.length;
                        if ("number" == typeof t && t == t && a <= 2147483647) {
                            for (; r < a; ) {
                                var o = r + a >>> 1
                                  , i = e[o];
                                null !== i && !ja(i) && (n ? i <= t : i < t) ? r = 1 + o : a = o
                            }
                            return a
                        }
                        return Dt(e, t, Do, n)
                    }
                    function Dt(e, t, n, r) {
                        var a = 0
                          , o = null == e ? 0 : e.length;
                        if (0 === o)
                            return 0;
                        for (var i = (t = n(t)) != t, l = null === t, u = ja(t), s = t === Ho; a < o; ) {
                            var c = B((a + o) / 2)
                              , d = n(e[c])
                              , f = d !== Ho
                              , p = null === d
                              , m = d == d
                              , v = ja(d)
                              , d = i ? r || m : s ? m && (r || f) : l ? m && f && (r || !p) : u ? m && f && !p && (r || !v) : !p && !v && (r ? d <= t : d < t);
                            d ? a = c + 1 : o = c
                        }
                        return q(o, 4294967294)
                    }
                    function Rt(e, t) {
                        for (var n = -1, r = e.length, a = 0, o = []; ++n < r; ) {
                            var i, l = e[n], u = t ? t(l) : l;
                            n && ya(u, i) || (i = u,
                            o[a++] = 0 === l ? 0 : l)
                        }
                        return o
                    }
                    function Mt(e) {
                        return "number" == typeof e ? e : ja(e) ? Qo : +e
                    }
                    function Ut(e) {
                        if ("string" == typeof e)
                            return e;
                        if (Sa(e))
                            return kl(e, Ut) + "";
                        if (ja(e))
                            return fe ? fe.call(e) : "";
                        var t = e + "";
                        return "0" == t && 1 / e == -Jo ? "-0" : t
                    }
                    function Gt(e, t, n) {
                        var r = -1
                          , a = Ll
                          , o = e.length
                          , i = !0
                          , l = []
                          , u = l;
                        if (n)
                            i = !1,
                            a = Ol;
                        else if (200 <= o) {
                            var s = t ? null : _n(e);
                            if (s)
                                return lu(s);
                            i = !1,
                            a = Jl,
                            u = new Se
                        } else
                            u = t ? [] : l;
                        e: for (; ++r < o; ) {
                            var c = e[r]
                              , d = t ? t(c) : c
                              , c = n || 0 !== c ? c : 0;
                            if (i && d == d) {
                                for (var f = u.length; f--; )
                                    if (u[f] === d)
                                        continue e;
                                t && u.push(d),
                                l.push(c)
                            } else
                                a(u, d, n) || (u !== l && u.push(d),
                                l.push(c))
                        }
                        return l
                    }
                    function Bt(e, t) {
                        return null == (e = ar(e, t = $t(t, e))) || delete e[vr(xr(t))]
                    }
                    function jt(e, t, n, r) {
                        return Tt(e, t, n(Je(e, t)), r)
                    }
                    function Ft(e, t, n, r) {
                        for (var a = e.length, o = r ? a : -1; (r ? o-- : ++o < a) && t(e[o], o, e); )
                            ;
                        return n ? Lt(e, r ? 0 : o, r ? o + 1 : a) : Lt(e, r ? o + 1 : 0, r ? a : o)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        Rl(t, function(e, t) {
                            return t.func.apply(t.thisArg, Dl([e], t.args))
                        }, e)
                    }
                    function zt(e, t, n) {
                        var r = e.length;
                        if (r < 2)
                            return r ? Gt(e[0]) : [];
                        for (var a = -1, o = I(r); ++a < r; )
                            for (var i = e[a], l = -1; ++l < r; )
                                l != a && (o[a] = Be(o[a] || i, e[l], t, n));
                        return Gt(We(o, 1), t, n)
                    }
                    function Vt(e, t, n) {
                        for (var r = -1, a = e.length, o = t.length, i = {}; ++r < a; ) {
                            var l = r < o ? t[r] : Ho;
                            n(i, e[r], l)
                        }
                        return i
                    }
                    function Wt(e) {
                        return Ca(e) ? e : []
                    }
                    function qt(e) {
                        return "function" == typeof e ? e : Do
                    }
                    function $t(e, t) {
                        return Sa(e) ? e : Jn(e, t) ? [e] : mr(Za(e))
                    }
                    var Kt = Pt;
                    function Yt(e, t, n) {
                        var r = e.length;
                        return n = n === Ho ? r : n,
                        !t && r <= n ? e : Lt(e, t, n)
                    }
                    var Zt = R || function(e) {
                        return gl.clearTimeout(e)
                    }
                    ;
                    function Jt(e, t) {
                        if (t)
                            return e.slice();
                        t = e.length,
                        t = _ ? _(t) : new e.constructor(t);
                        return e.copy(t),
                        t
                    }
                    function Xt(e) {
                        var t = new e.constructor(e.byteLength);
                        return new C(t).set(new C(e)),
                        t
                    }
                    function Qt(e, t) {
                        t = t ? Xt(e.buffer) : e.buffer;
                        return new e.constructor(t,e.byteOffset,e.length)
                    }
                    function en(e, t) {
                        if (e !== t) {
                            var n = e !== Ho
                              , r = null === e
                              , a = e == e
                              , o = ja(e)
                              , i = t !== Ho
                              , l = null === t
                              , u = t == t
                              , s = ja(t);
                            if (!l && !s && !o && t < e || o && i && u && !l && !s || r && i && u || !n && u || !a)
                                return 1;
                            if (!r && !o && !s && e < t || s && n && a && !r && !o || l && n && a || !i && a || !u)
                                return -1
                        }
                        return 0
                    }
                    function tn(e, t, n, r) {
                        for (var a = -1, o = e.length, i = n.length, l = -1, u = t.length, s = W(o - i, 0), c = I(u + s), d = !r; ++l < u; )
                            c[l] = t[l];
                        for (; ++a < i; )
                            (d || a < o) && (c[n[a]] = e[a]);
                        for (; s--; )
                            c[l++] = e[a++];
                        return c
                    }
                    function nn(e, t, n, r) {
                        for (var a = -1, o = e.length, i = -1, l = n.length, u = -1, s = t.length, c = W(o - l, 0), d = I(c + s), f = !r; ++a < c; )
                            d[a] = e[a];
                        for (var p = a; ++u < s; )
                            d[p + u] = t[u];
                        for (; ++i < l; )
                            (f || a < o) && (d[p + n[i]] = e[a++]);
                        return d
                    }
                    function rn(e, t) {
                        var n = -1
                          , r = e.length;
                        for (t = t || I(r); ++n < r; )
                            t[n] = e[n];
                        return t
                    }
                    function an(e, t, n, r) {
                        var a = !n;
                        n = n || {};
                        for (var o = -1, i = t.length; ++o < i; ) {
                            var l = t[o]
                              , u = r ? r(n[l], e[l], l, n, e) : Ho;
                            u === Ho && (u = e[l]),
                            (a ? ke : Ne)(n, l, u)
                        }
                        return n
                    }
                    function on(a, o) {
                        return function(e, t) {
                            var n = Sa(e) ? _l : Le
                              , r = o ? o() : {};
                            return n(e, a, Bn(t, 2), r)
                        }
                    }
                    function ln(l) {
                        return Pt(function(e, t) {
                            var n = -1
                              , r = t.length
                              , a = 1 < r ? t[r - 1] : Ho
                              , o = 2 < r ? t[2] : Ho
                              , a = 3 < l.length && "function" == typeof a ? (r--,
                            a) : Ho;
                            for (o && Zn(t[0], t[1], o) && (a = r < 3 ? Ho : a,
                            r = 1),
                            e = v(e); ++n < r; ) {
                                var i = t[n];
                                i && l(e, i, n, a)
                            }
                            return e
                        })
                    }
                    function un(o, i) {
                        return function(e, t) {
                            if (null == e)
                                return e;
                            if (!Pa(e))
                                return o(e, t);
                            for (var n = e.length, r = i ? n : -1, a = v(e); (i ? r-- : ++r < n) && !1 !== t(a[r], r, a); )
                                ;
                            return e
                        }
                    }
                    function sn(u) {
                        return function(e, t, n) {
                            for (var r = -1, a = v(e), o = n(e), i = o.length; i--; ) {
                                var l = o[u ? i : ++r];
                                if (!1 === t(a[l], l, a))
                                    break
                            }
                            return e
                        }
                    }
                    function cn(r) {
                        return function(e) {
                            var t = ru(e = Za(e)) ? su(e) : Ho
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? Yt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return Rl(Ao(So(e).replace(ll, "")), t, "")
                        }
                    }
                    function fn(r) {
                        return function() {
                            var e = arguments;
                            switch (e.length) {
                            case 0:
                                return new r;
                            case 1:
                                return new r(e[0]);
                            case 2:
                                return new r(e[0],e[1]);
                            case 3:
                                return new r(e[0],e[1],e[2]);
                            case 4:
                                return new r(e[0],e[1],e[2],e[3]);
                            case 5:
                                return new r(e[0],e[1],e[2],e[3],e[4]);
                            case 6:
                                return new r(e[0],e[1],e[2],e[3],e[4],e[5]);
                            case 7:
                                return new r(e[0],e[1],e[2],e[3],e[4],e[5],e[6])
                            }
                            var t = me(r.prototype)
                              , n = r.apply(t, e);
                            return Oa(n) ? n : t
                        }
                    }
                    function pn(o, i, l) {
                        var u = fn(o);
                        return function e() {
                            for (var t = arguments.length, n = I(t), r = t, a = Gn(e); r--; )
                                n[r] = arguments[r];
                            a = t < 3 && n[0] !== a && n[t - 1] !== a ? [] : iu(n, a);
                            return (t -= a.length) < l ? Pn(o, i, hn, e.placeholder, Ho, n, a, Ho, Ho, l - t) : Cl(this && this !== gl && this instanceof e ? u : o, this, n)
                        }
                    }
                    function mn(o) {
                        return function(e, t, n) {
                            var r, a = v(e);
                            Pa(e) || (r = Bn(t, 3),
                            e = so(e),
                            t = function(e) {
                                return r(a[e], e, a)
                            }
                            );
                            n = o(e, t, n);
                            return -1 < n ? a[r ? e[n] : n] : Ho
                        }
                    }
                    function vn(u) {
                        return kn(function(a) {
                            var o = a.length
                              , e = o
                              , t = ge.prototype.thru;
                            for (u && a.reverse(); e--; ) {
                                var n = a[e];
                                if ("function" != typeof n)
                                    throw new S(zo);
                                t && !l && "wrapper" == Un(n) && (l = new ge([],!0))
                            }
                            for (e = l ? e : o; ++e < o; )
                                var r = Un(n = a[e])
                                  , i = "wrapper" == r ? Mn(n) : Ho
                                  , l = i && Xn(i[0]) && 424 == i[1] && !i[4].length && 1 == i[9] ? l[Un(i[0])].apply(l, i[3]) : 1 == n.length && Xn(n) ? l[r]() : l.thru(n);
                            return function() {
                                var e = arguments
                                  , t = e[0];
                                if (l && 1 == e.length && Sa(t))
                                    return l.plant(t).value();
                                for (var n = 0, r = o ? a[n].apply(this, e) : t; ++n < o; )
                                    r = a[n].call(this, r);
                                return r
                            }
                        })
                    }
                    function hn(l, u, s, c, d, f, p, m, v, h) {
                        var g = u & Yo
                          , y = 1 & u
                          , b = 2 & u
                          , E = 24 & u
                          , w = 512 & u
                          , S = b ? Ho : fn(l);
                        return function e() {
                            for (var t, n = I(i = arguments.length), r = i; r--; )
                                n[r] = arguments[r];
                            if (E && (t = function(e, t) {
                                for (var n = e.length, r = 0; n--; )
                                    e[n] === t && ++r;
                                return r
                            }(n, o = Gn(e))),
                            c && (n = tn(n, c, d, E)),
                            f && (n = nn(n, f, p, E)),
                            i -= t,
                            E && i < h) {
                                var a = iu(n, o);
                                return Pn(l, u, hn, e.placeholder, s, n, a, m, v, h - i)
                            }
                            var o = y ? s : this
                              , a = b ? o[l] : l
                              , i = n.length;
                            return m ? n = function(e, t) {
                                for (var n = e.length, r = q(t.length, n), a = rn(e); r--; ) {
                                    var o = t[r];
                                    e[r] = Yn(o, n) ? a[o] : Ho
                                }
                                return e
                            }(n, m) : w && 1 < i && n.reverse(),
                            g && v < i && (n.length = v),
                            this && this !== gl && this instanceof e && (a = S || fn(a)),
                            a.apply(o, n)
                        }
                    }
                    function gn(n, i) {
                        return function(e, t) {
                            return e = e,
                            r = n,
                            a = i(t),
                            o = {},
                            Ke(e, function(e, t, n) {
                                r(o, a(e), t, n)
                            }),
                            o;
                            var r, a, o
                        }
                    }
                    function yn(r, a) {
                        return function(e, t) {
                            var n;
                            if (e === Ho && t === Ho)
                                return a;
                            if (e !== Ho && (n = e),
                            t !== Ho) {
                                if (n === Ho)
                                    return t;
                                t = "string" == typeof e || "string" == typeof t ? (e = Ut(e),
                                Ut(t)) : (e = Mt(e),
                                Mt(t)),
                                n = r(e, t)
                            }
                            return n
                        }
                    }
                    function bn(r) {
                        return kn(function(e) {
                            return e = kl(e, Yl(Bn())),
                            Pt(function(t) {
                                var n = this;
                                return r(e, function(e) {
                                    return Cl(e, n, t)
                                })
                            })
                        })
                    }
                    function En(e, t) {
                        var n = (t = t === Ho ? " " : Ut(t)).length;
                        if (n < 2)
                            return n ? It(t, e) : t;
                        n = It(t, G(e / uu(t)));
                        return ru(t) ? Yt(su(n), 0, e).join("") : n.slice(0, e)
                    }
                    function wn(l, e, u, s) {
                        var c = 1 & e
                          , d = fn(l);
                        return function e() {
                            for (var t = -1, n = arguments.length, r = -1, a = s.length, o = I(a + n), i = this && this !== gl && this instanceof e ? d : l; ++r < a; )
                                o[r] = s[r];
                            for (; n--; )
                                o[r++] = arguments[++t];
                            return Cl(i, c ? u : this, o)
                        }
                    }
                    function Sn(r) {
                        return function(e, t, n) {
                            return n && "number" != typeof n && Zn(e, t, n) && (t = n = Ho),
                            e = Wa(e),
                            t === Ho ? (t = e,
                            e = 0) : t = Wa(t),
                            function(e, t, n, r) {
                                for (var a = -1, o = W(G((t - e) / (n || 1)), 0), i = I(o); o--; )
                                    i[r ? o : ++a] = e,
                                    e += n;
                                return i
                            }(e, t, n = n === Ho ? e < t ? 1 : -1 : Wa(n), r)
                        }
                    }
                    function In(n) {
                        return function(e, t) {
                            return "string" == typeof e && "string" == typeof t || (e = Ka(e),
                            t = Ka(t)),
                            n(e, t)
                        }
                    }
                    function Pn(e, t, n, r, a, o, i, l, u, s) {
                        var c = 8 & t;
                        t |= c ? $o : Ko,
                        4 & (t &= ~(c ? Ko : $o)) || (t &= -4);
                        s = [e, t, a, c ? o : Ho, c ? i : Ho, c ? Ho : o, c ? Ho : i, l, u, s],
                        n = n.apply(Ho, s);
                        return Xn(e) && ir(n, s),
                        n.placeholder = r,
                        sr(n, e, t)
                    }
                    function Cn(e) {
                        var r = a[e];
                        return function(e, t) {
                            if (e = Ka(e),
                            (t = null == t ? 0 : q(qa(t), 292)) && H(e)) {
                                var n = (Za(e) + "e").split("e");
                                return +((n = (Za(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
                            }
                            return r(e)
                        }
                    }
                    var _n = ee && 1 / lu(new ee([, -0]))[1] == Jo ? function(e) {
                        return new ee(e)
                    }
                    : Uo;
                    function Tn(o) {
                        return function(e) {
                            var t, n, r, a = Wn(e);
                            return a == si ? au(e) : a == mi ? (a = e,
                            t = -1,
                            n = Array(a.size),
                            a.forEach(function(e) {
                                n[++t] = [e, e]
                            }),
                            n) : kl(o(r = e), function(e) {
                                return [e, r[e]]
                            })
                        }
                    }
                    function xn(e, t, n, r, a, o, i, l) {
                        var u = 2 & t;
                        if (!u && "function" != typeof e)
                            throw new S(zo);
                        var s = r ? r.length : 0;
                        s || (t &= -97,
                        r = a = Ho),
                        i = i === Ho ? i : W(qa(i), 0),
                        l = l === Ho ? l : qa(l),
                        s -= a ? a.length : 0,
                        t & Ko && (m = r,
                        v = a,
                        r = a = Ho);
                        var c, d, f, p, m, v, h, g, y, b, E = u ? Ho : Mn(e), w = [e, t, n, r, a, m, v, o, i, l];
                        return E && (d = E,
                        p = (c = w)[1],
                        m = d[1],
                        o = (v = p | m) < 131,
                        i = m == Yo && 8 == p || m == Yo && p == Zo && c[7].length <= d[8] || 384 == m && d[7].length <= d[8] && 8 == p,
                        (o || i) && (1 & m && (c[2] = d[2],
                        v |= 1 & p ? 0 : 4),
                        (p = d[3]) && (f = c[3],
                        c[3] = f ? tn(f, p, d[4]) : p,
                        c[4] = f ? iu(c[3], Wo) : d[4]),
                        (p = d[5]) && (f = c[5],
                        c[5] = f ? nn(f, p, d[6]) : p,
                        c[6] = f ? iu(c[5], Wo) : d[6]),
                        (p = d[7]) && (c[7] = p),
                        m & Yo && (c[8] = null == c[8] ? d[8] : q(c[8], d[8])),
                        null == c[9] && (c[9] = d[9]),
                        c[0] = d[0],
                        c[1] = v)),
                        e = w[0],
                        t = w[1],
                        n = w[2],
                        r = w[3],
                        a = w[4],
                        !(l = w[9] = w[9] === Ho ? u ? 0 : e.length : W(w[9] - s, 0)) && 24 & t && (t &= -25),
                        n = t && 1 != t ? 8 == t || t == qo ? pn(e, t, l) : t != $o && 33 != t || a.length ? hn.apply(Ho, w) : wn(e, t, n, r) : (g = n,
                        y = 1 & t,
                        b = fn(h = e),
                        function e() {
                            return (this && this !== gl && this instanceof e ? b : h).apply(y ? g : this, arguments)
                        }
                        ),
                        sr((E ? xt : ir)(n, w), e, t)
                    }
                    function Nn(e, t, n, r) {
                        return e === Ho || ya(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function An(e, t, n, r, a, o) {
                        return Oa(e) && Oa(t) && (o.set(t, e),
                        ht(e, t, Ho, An, o),
                        o.delete(t)),
                        e
                    }
                    function Ln(e) {
                        return Ma(e) ? Ho : e
                    }
                    function On(e, t, n, r, a, o) {
                        var i = 1 & n
                          , l = e.length
                          , u = t.length;
                        if (l != u && !(i && l < u))
                            return !1;
                        var s = o.get(e)
                          , u = o.get(t);
                        if (s && u)
                            return s == t && u == e;
                        var c = -1
                          , d = !0
                          , f = 2 & n ? new Se : Ho;
                        for (o.set(e, t),
                        o.set(t, e); ++c < l; ) {
                            var p, m = e[c], v = t[c];
                            if (r && (p = i ? r(v, m, c, t, e, o) : r(m, v, c, e, t, o)),
                            p !== Ho) {
                                if (p)
                                    continue;
                                d = !1;
                                break
                            }
                            if (f) {
                                if (!Ul(t, function(e, t) {
                                    return !Jl(f, t) && (m === e || a(m, e, n, r, o)) && f.push(t)
                                })) {
                                    d = !1;
                                    break
                                }
                            } else if (m !== v && !a(m, v, n, r, o)) {
                                d = !1;
                                break
                            }
                        }
                        return o.delete(e),
                        o.delete(t),
                        d
                    }
                    function kn(e) {
                        return ur(rr(e, Ho, Ir), e + "")
                    }
                    function Dn(e) {
                        return Xe(e, so, zn)
                    }
                    function Rn(e) {
                        return Xe(e, co, Vn)
                    }
                    var Mn = re ? function(e) {
                        return re.get(e)
                    }
                    : Uo;
                    function Un(e) {
                        for (var t = e.name + "", n = ae[t], r = y.call(ae, t) ? n.length : 0; r--; ) {
                            var a = n[r]
                              , o = a.func;
                            if (null == o || o == e)
                                return a.name
                        }
                        return t
                    }
                    function Gn(e) {
                        return (y.call(pe, "placeholder") ? pe : e).placeholder
                    }
                    function Bn() {
                        var e = (e = pe.iteratee || Ro) === Ro ? st : e;
                        return arguments.length ? e(arguments[0], arguments[1]) : e
                    }
                    function jn(e, t) {
                        var n, r = e.__data__;
                        return ("string" == (e = typeof (n = t)) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== n : null === n) ? r["string" == typeof t ? "string" : "hash"] : r.map
                    }
                    function Fn(e) {
                        for (var t = so(e), n = t.length; n--; ) {
                            var r = t[n]
                              , a = e[r];
                            t[n] = [r, a, tr(a)]
                        }
                        return t
                    }
                    function Hn(e, t) {
                        t = t,
                        t = null == (e = e) ? Ho : e[t];
                        return ut(t) ? t : Ho
                    }
                    var zn = j ? function(t) {
                        return null == t ? [] : (t = v(t),
                        Al(j(t), function(e) {
                            return N.call(t, e)
                        }))
                    }
                    : Bo
                      , Vn = j ? function(e) {
                        for (var t = []; e; )
                            Dl(t, zn(e)),
                            e = T(e);
                        return t
                    }
                    : Bo
                      , Wn = Qe;
                    function qn(e, t, n) {
                        for (var r = -1, a = (t = $t(t, e)).length, o = !1; ++r < a; ) {
                            var i = vr(t[r]);
                            if (!(o = null != e && n(e, i)))
                                break;
                            e = e[i]
                        }
                        return o || ++r != a ? o : !!(a = null == e ? 0 : e.length) && La(a) && Yn(i, a) && (Sa(e) || wa(e))
                    }
                    function $n(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function Kn(e) {
                        return Sa(e) || wa(e) || !!(L && e && e[L])
                    }
                    function Yn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Xo : t) && ("number" == n || "symbol" != n && rl.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Zn(e, t, n) {
                        if (Oa(n)) {
                            var r = typeof t;
                            return ("number" == r ? Pa(n) && Yn(t, n.length) : "string" == r && t in n) && ya(n[t], e)
                        }
                    }
                    function Jn(e, t) {
                        if (!Sa(e)) {
                            var n = typeof e;
                            return "number" == n || "symbol" == n || "boolean" == n || null == e || ja(e) || (ji.test(e) || !Bi.test(e) || null != t && e in v(t))
                        }
                    }
                    function Xn(e) {
                        var t = Un(e)
                          , n = pe[t];
                        if ("function" == typeof n && t in ye.prototype) {
                            if (e === n)
                                return 1;
                            n = Mn(n);
                            return n && e === n[0]
                        }
                    }
                    (J && Wn(new J(new ArrayBuffer(1))) != bi || X && Wn(new X) != si || Q && Wn(Q.resolve()) != fi || ee && Wn(new ee) != mi || te && Wn(new te) != gi) && (Wn = function(e) {
                        var t = Qe(e)
                          , e = t == di ? e.constructor : Ho
                          , e = e ? hr(e) : "";
                        if (e)
                            switch (e) {
                            case oe:
                                return bi;
                            case ie:
                                return si;
                            case le:
                                return fi;
                            case ue:
                                return mi;
                            case se:
                                return gi
                            }
                        return t
                    }
                    );
                    var Qn = i ? Na : jo;
                    function er(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || m)
                    }
                    function tr(e) {
                        return e == e && !Oa(e)
                    }
                    function nr(t, n) {
                        return function(e) {
                            return null != e && (e[t] === n && (n !== Ho || t in v(e)))
                        }
                    }
                    function rr(o, i, l) {
                        return i = W(i === Ho ? o.length - 1 : i, 0),
                        function() {
                            for (var e = arguments, t = -1, n = W(e.length - i, 0), r = I(n); ++t < n; )
                                r[t] = e[i + t];
                            t = -1;
                            for (var a = I(i + 1); ++t < i; )
                                a[t] = e[t];
                            return a[i] = l(r),
                            Cl(o, this, a)
                        }
                    }
                    function ar(e, t) {
                        return t.length < 2 ? e : Je(e, Lt(t, 0, -1))
                    }
                    function or(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ir = cr(xt)
                      , lr = U || function(e, t) {
                        return gl.setTimeout(e, t)
                    }
                      , ur = cr(Nt);
                    function sr(e, t, n) {
                        var r, a, t = t + "";
                        return ur(e, function(e, t) {
                            var n = t.length;
                            if (!n)
                                return e;
                            var r = n - 1;
                            return t[r] = (1 < n ? "& " : "") + t[r],
                            t = t.join(2 < n ? ", " : " "),
                            e.replace(Wi, "{\n/* [wrapped with " + t + "] */\n")
                        }(t, (r = (t = (t = t).match(qi)) ? t[1].split($i) : [],
                        a = n,
                        Tl(ti, function(e) {
                            var t = "_." + e[0];
                            a & e[1] && !Ll(r, t) && r.push(t)
                        }),
                        r.sort())))
                    }
                    function cr(n) {
                        var r = 0
                          , a = 0;
                        return function() {
                            var e = $()
                              , t = 16 - (e - a);
                            if (a = e,
                            0 < t) {
                                if (800 <= ++r)
                                    return arguments[0]
                            } else
                                r = 0;
                            return n.apply(Ho, arguments)
                        }
                    }
                    function dr(e, t) {
                        var n = -1
                          , r = e.length
                          , a = r - 1;
                        for (t = t === Ho ? r : t; ++n < t; ) {
                            var o = St(n, a)
                              , i = e[o];
                            e[o] = e[n],
                            e[n] = i
                        }
                        return e.length = t,
                        e
                    }
                    var fr, pr, mr = (pr = (fr = fa(fr = function(e) {
                        var a = [];
                        return 46 === e.charCodeAt(0) && a.push(""),
                        e.replace(Fi, function(e, t, n, r) {
                            a.push(n ? r.replace(Zi, "$1") : t || e)
                        }),
                        a
                    }
                    , function(e) {
                        return 500 === pr.size && pr.clear(),
                        e
                    })).cache,
                    fr);
                    function vr(e) {
                        if ("string" == typeof e || ja(e))
                            return e;
                        var t = e + "";
                        return "0" == t && 1 / e == -Jo ? "-0" : t
                    }
                    function hr(e) {
                        if (null != e) {
                            try {
                                return l.call(e)
                            } catch (e) {}
                            try {
                                return e + ""
                            } catch (e) {}
                        }
                        return ""
                    }
                    function gr(e) {
                        if (e instanceof ye)
                            return e.clone();
                        var t = new ge(e.__wrapped__,e.__chain__);
                        return t.__actions__ = rn(e.__actions__),
                        t.__index__ = e.__index__,
                        t.__values__ = e.__values__,
                        t
                    }
                    var yr = Pt(function(e, t) {
                        return Ca(e) ? Be(e, We(t, 1, Ca, !0)) : []
                    })
                      , br = Pt(function(e, t) {
                        var n = xr(t);
                        return Ca(n) && (n = Ho),
                        Ca(e) ? Be(e, We(t, 1, Ca, !0), Bn(n, 2)) : []
                    })
                      , Er = Pt(function(e, t) {
                        var n = xr(t);
                        return Ca(n) && (n = Ho),
                        Ca(e) ? Be(e, We(t, 1, Ca, !0), Ho, n) : []
                    });
                    function wr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        n = null == n ? 0 : qa(n);
                        return n < 0 && (n = W(r + n, 0)),
                        Bl(e, Bn(t, 3), n)
                    }
                    function Sr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var a = r - 1;
                        return n !== Ho && (a = qa(n),
                        a = n < 0 ? W(r + a, 0) : q(a, r - 1)),
                        Bl(e, Bn(t, 3), a, !0)
                    }
                    function Ir(e) {
                        return (null == e ? 0 : e.length) ? We(e, 1) : []
                    }
                    function Pr(e) {
                        return e && e.length ? e[0] : Ho
                    }
                    var Cr = Pt(function(e) {
                        var t = kl(e, Wt);
                        return t.length && t[0] === e[0] ? rt(t) : []
                    })
                      , _r = Pt(function(e) {
                        var t = xr(e)
                          , n = kl(e, Wt);
                        return t === xr(n) ? t = Ho : n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Bn(t, 2)) : []
                    })
                      , Tr = Pt(function(e) {
                        var t = xr(e)
                          , n = kl(e, Wt);
                        return (t = "function" == typeof t ? t : Ho) && n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Ho, t) : []
                    });
                    function xr(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : Ho
                    }
                    var Nr = Pt(Ar);
                    function Ar(e, t) {
                        return e && e.length && t && t.length ? Et(e, t) : e
                    }
                    var Lr = kn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = De(e, t);
                        return wt(e, kl(t, function(e) {
                            return Yn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Or(e) {
                        return null == e ? e : Z.call(e)
                    }
                    var kr = Pt(function(e) {
                        return Gt(We(e, 1, Ca, !0))
                    })
                      , Dr = Pt(function(e) {
                        var t = xr(e);
                        return Ca(t) && (t = Ho),
                        Gt(We(e, 1, Ca, !0), Bn(t, 2))
                    })
                      , Rr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Ho;
                        return Gt(We(e, 1, Ca, !0), Ho, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = Al(t, function(e) {
                            return Ca(e) && (n = W(e.length, n),
                            1)
                        }),
                        $l(n, function(e) {
                            return kl(t, Vl(e))
                        })
                    }
                    function Ur(e, t) {
                        if (!e || !e.length)
                            return [];
                        e = Mr(e);
                        return null == t ? e : kl(e, function(e) {
                            return Cl(t, Ho, e)
                        })
                    }
                    var Gr = Pt(function(e, t) {
                        return Ca(e) ? Be(e, t) : []
                    })
                      , Br = Pt(function(e) {
                        return zt(Al(e, Ca))
                    })
                      , jr = Pt(function(e) {
                        var t = xr(e);
                        return Ca(t) && (t = Ho),
                        zt(Al(e, Ca), Bn(t, 2))
                    })
                      , Fr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Ho;
                        return zt(Al(e, Ca), Ho, t)
                    })
                      , Hr = Pt(Mr);
                    var zr = Pt(function(e) {
                        var t = e.length
                          , t = "function" == typeof (t = 1 < t ? e[t - 1] : Ho) ? (e.pop(),
                        t) : Ho;
                        return Ur(e, t)
                    });
                    function Vr(e) {
                        e = pe(e);
                        return e.__chain__ = !0,
                        e
                    }
                    function Wr(e, t) {
                        return t(e)
                    }
                    var qr = kn(function(t) {
                        function e(e) {
                            return De(e, t)
                        }
                        var n = t.length
                          , r = n ? t[0] : 0
                          , a = this.__wrapped__;
                        return !(1 < n || this.__actions__.length) && a instanceof ye && Yn(r) ? ((a = a.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                            func: Wr,
                            args: [e],
                            thisArg: Ho
                        }),
                        new ge(a,this.__chain__).thru(function(e) {
                            return n && !e.length && e.push(Ho),
                            e
                        })) : this.thru(e)
                    });
                    var $r = on(function(e, t, n) {
                        y.call(e, n) ? ++e[n] : ke(e, n, 1)
                    });
                    var Kr = mn(wr)
                      , Yr = mn(Sr);
                    function Zr(e, t) {
                        return (Sa(e) ? Tl : je)(e, Bn(t, 3))
                    }
                    function Jr(e, t) {
                        return (Sa(e) ? xl : Fe)(e, Bn(t, 3))
                    }
                    var Xr = on(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : ke(e, n, [t])
                    });
                    var Qr = Pt(function(e, t, n) {
                        var r = -1
                          , a = "function" == typeof t
                          , o = Pa(e) ? I(e.length) : [];
                        return je(e, function(e) {
                            o[++r] = a ? Cl(t, e, n) : at(e, t, n)
                        }),
                        o
                    })
                      , ea = on(function(e, t, n) {
                        ke(e, n, t)
                    });
                    function ta(e, t) {
                        return (Sa(e) ? kl : pt)(e, Bn(t, 3))
                    }
                    var na = on(function(e, t, n) {
                        e[n ? 0 : 1].push(t)
                    }, function() {
                        return [[], []]
                    });
                    var ra = Pt(function(e, t) {
                        if (null == e)
                            return [];
                        var n = t.length;
                        return 1 < n && Zn(e, t[0], t[1]) ? t = [] : 2 < n && Zn(t[0], t[1], t[2]) && (t = [t[0]]),
                        yt(e, We(t, 1), [])
                    })
                      , aa = M || function() {
                        return gl.Date.now()
                    }
                    ;
                    function oa(e, t, n) {
                        return t = n ? Ho : t,
                        t = e && null == t ? e.length : t,
                        xn(e, Yo, Ho, Ho, Ho, Ho, t)
                    }
                    function ia(e, t) {
                        var n;
                        if ("function" != typeof t)
                            throw new S(zo);
                        return e = qa(e),
                        function() {
                            return 0 < --e && (n = t.apply(this, arguments)),
                            e <= 1 && (t = Ho),
                            n
                        }
                    }
                    var la = Pt(function(e, t, n) {
                        var r, a = 1;
                        return n.length && (r = iu(n, Gn(la)),
                        a |= $o),
                        xn(e, a, t, n, r)
                    })
                      , ua = Pt(function(e, t, n) {
                        var r, a = 3;
                        return n.length && (r = iu(n, Gn(ua)),
                        a |= $o),
                        xn(t, a, e, n, r)
                    });
                    function sa(r, n, e) {
                        var a, o, i, l, u, s, c = 0, d = !1, f = !1, t = !0;
                        if ("function" != typeof r)
                            throw new S(zo);
                        function p(e) {
                            var t = a
                              , n = o;
                            return a = o = Ho,
                            c = e,
                            l = r.apply(n, t)
                        }
                        function m(e) {
                            var t = e - s;
                            return s === Ho || n <= t || t < 0 || f && i <= e - c
                        }
                        function v() {
                            var e, t = aa();
                            if (m(t))
                                return h(t);
                            u = lr(v, (t = n - ((e = t) - s),
                            f ? q(t, i - (e - c)) : t))
                        }
                        function h(e) {
                            return u = Ho,
                            t && a ? p(e) : (a = o = Ho,
                            l)
                        }
                        function g() {
                            var e = aa()
                              , t = m(e);
                            if (a = arguments,
                            o = this,
                            s = e,
                            t) {
                                if (u === Ho)
                                    return c = t = s,
                                    u = lr(v, n),
                                    d ? p(t) : l;
                                if (f)
                                    return Zt(u),
                                    u = lr(v, n),
                                    p(s)
                            }
                            return u === Ho && (u = lr(v, n)),
                            l
                        }
                        return n = Ka(n) || 0,
                        Oa(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        i = f ? W(Ka(e.maxWait) || 0, n) : i,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            u !== Ho && Zt(u),
                            c = 0,
                            a = s = o = u = Ho
                        }
                        ,
                        g.flush = function() {
                            return u === Ho ? l : h(aa())
                        }
                        ,
                        g
                    }
                    var ca = Pt(function(e, t) {
                        return Ge(e, 1, t)
                    })
                      , da = Pt(function(e, t, n) {
                        return Ge(e, Ka(t) || 0, n)
                    });
                    function fa(r, a) {
                        if ("function" != typeof r || null != a && "function" != typeof a)
                            throw new S(zo);
                        var o = function() {
                            var e = arguments
                              , t = a ? a.apply(this, e) : e[0]
                              , n = o.cache;
                            if (n.has(t))
                                return n.get(t);
                            e = r.apply(this, e);
                            return o.cache = n.set(t, e) || n,
                            e
                        };
                        return o.cache = new (fa.Cache || we),
                        o
                    }
                    function pa(t) {
                        if ("function" != typeof t)
                            throw new S(zo);
                        return function() {
                            var e = arguments;
                            switch (e.length) {
                            case 0:
                                return !t.call(this);
                            case 1:
                                return !t.call(this, e[0]);
                            case 2:
                                return !t.call(this, e[0], e[1]);
                            case 3:
                                return !t.call(this, e[0], e[1], e[2])
                            }
                            return !t.apply(this, e)
                        }
                    }
                    fa.Cache = we;
                    var ma = Kt(function(r, a) {
                        var o = (a = 1 == a.length && Sa(a[0]) ? kl(a[0], Yl(Bn())) : kl(We(a, 1), Yl(Bn()))).length;
                        return Pt(function(e) {
                            for (var t = -1, n = q(e.length, o); ++t < n; )
                                e[t] = a[t].call(this, e[t]);
                            return Cl(r, this, e)
                        })
                    })
                      , va = Pt(function(e, t) {
                        var n = iu(t, Gn(va));
                        return xn(e, $o, Ho, t, n)
                    })
                      , ha = Pt(function(e, t) {
                        var n = iu(t, Gn(ha));
                        return xn(e, Ko, Ho, t, n)
                    })
                      , ga = kn(function(e, t) {
                        return xn(e, Zo, Ho, Ho, Ho, t)
                    });
                    function ya(e, t) {
                        return e === t || e != e && t != t
                    }
                    var ba = In(et)
                      , Ea = In(function(e, t) {
                        return t <= e
                    })
                      , wa = ot(function() {
                        return arguments
                    }()) ? ot : function(e) {
                        return ka(e) && y.call(e, "callee") && !N.call(e, "callee")
                    }
                      , Sa = I.isArray
                      , Ia = bl ? Yl(bl) : function(e) {
                        return ka(e) && Qe(e) == yi
                    }
                    ;
                    function Pa(e) {
                        return null != e && La(e.length) && !Na(e)
                    }
                    function Ca(e) {
                        return ka(e) && Pa(e)
                    }
                    var _a = F || jo
                      , Ta = El ? Yl(El) : function(e) {
                        return ka(e) && Qe(e) == oi
                    }
                    ;
                    function xa(e) {
                        if (!ka(e))
                            return !1;
                        var t = Qe(e);
                        return t == ii || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Ma(e)
                    }
                    function Na(e) {
                        if (!Oa(e))
                            return !1;
                        e = Qe(e);
                        return e == li || e == ui || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function Aa(e) {
                        return "number" == typeof e && e == qa(e)
                    }
                    function La(e) {
                        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= Xo
                    }
                    function Oa(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t)
                    }
                    function ka(e) {
                        return null != e && "object" == typeof e
                    }
                    var Da = wl ? Yl(wl) : function(e) {
                        return ka(e) && Wn(e) == si
                    }
                    ;
                    function Ra(e) {
                        return "number" == typeof e || ka(e) && Qe(e) == ci
                    }
                    function Ma(e) {
                        if (!ka(e) || Qe(e) != di)
                            return !1;
                        e = T(e);
                        if (null === e)
                            return !0;
                        e = y.call(e, "constructor") && e.constructor;
                        return "function" == typeof e && e instanceof e && l.call(e) == g
                    }
                    var Ua = Sl ? Yl(Sl) : function(e) {
                        return ka(e) && Qe(e) == pi
                    }
                    ;
                    var Ga = Il ? Yl(Il) : function(e) {
                        return ka(e) && Wn(e) == mi
                    }
                    ;
                    function Ba(e) {
                        return "string" == typeof e || !Sa(e) && ka(e) && Qe(e) == vi
                    }
                    function ja(e) {
                        return "symbol" == typeof e || ka(e) && Qe(e) == hi
                    }
                    var Fa = Pl ? Yl(Pl) : function(e) {
                        return ka(e) && La(e.length) && !!pl[Qe(e)]
                    }
                    ;
                    var Ha = In(ft)
                      , za = In(function(e, t) {
                        return e <= t
                    });
                    function Va(e) {
                        if (!e)
                            return [];
                        if (Pa(e))
                            return (Ba(e) ? su : rn)(e);
                        if (O && e[O])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[O]());
                        var t = Wn(e);
                        return (t == si ? au : t == mi ? lu : bo)(e)
                    }
                    function Wa(e) {
                        return e ? (e = Ka(e)) !== Jo && e !== -Jo ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function qa(e) {
                        var t = Wa(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function $a(e) {
                        return e ? Re(qa(e), 0, ei) : 0
                    }
                    function Ka(e) {
                        if ("number" == typeof e)
                            return e;
                        if (ja(e))
                            return Qo;
                        if (Oa(e) && (e = Oa(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = Kl(e);
                        var t = el.test(e);
                        return t || nl.test(e) ? hl(e.slice(2), t ? 2 : 8) : Qi.test(e) ? Qo : +e
                    }
                    function Ya(e) {
                        return an(e, co(e))
                    }
                    function Za(e) {
                        return null == e ? "" : Ut(e)
                    }
                    var Ja = ln(function(e, t) {
                        if (er(t) || Pa(t))
                            an(t, so(t), e);
                        else
                            for (var n in t)
                                y.call(t, n) && Ne(e, n, t[n])
                    })
                      , Xa = ln(function(e, t) {
                        an(t, co(t), e)
                    })
                      , Qa = ln(function(e, t, n, r) {
                        an(t, co(t), e, r)
                    })
                      , eo = ln(function(e, t, n, r) {
                        an(t, so(t), e, r)
                    })
                      , to = kn(De);
                    var no = Pt(function(e, t) {
                        e = v(e);
                        var n = -1
                          , r = t.length
                          , a = 2 < r ? t[2] : Ho;
                        for (a && Zn(t[0], t[1], a) && (r = 1); ++n < r; )
                            for (var o = t[n], i = co(o), l = -1, u = i.length; ++l < u; ) {
                                var s = i[l]
                                  , c = e[s];
                                (c === Ho || ya(c, m[s]) && !y.call(e, s)) && (e[s] = o[s])
                            }
                        return e
                    })
                      , ro = Pt(function(e) {
                        return e.push(Ho, An),
                        Cl(po, Ho, e)
                    });
                    function ao(e, t, n) {
                        t = null == e ? Ho : Je(e, t);
                        return t === Ho ? n : t
                    }
                    function oo(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var io = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        e[t] = n
                    }, Oo(Do))
                      , lo = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        y.call(e, t) ? e[t].push(n) : e[t] = [n]
                    }, Bn)
                      , uo = Pt(at);
                    function so(e) {
                        return (Pa(e) ? Pe : ct)(e)
                    }
                    function co(e) {
                        return Pa(e) ? Pe(e, !0) : dt(e)
                    }
                    var fo = ln(function(e, t, n) {
                        ht(e, t, n)
                    })
                      , po = ln(function(e, t, n, r) {
                        ht(e, t, n, r)
                    })
                      , mo = kn(function(t, e) {
                        var n = {};
                        if (null == t)
                            return n;
                        var r = !1;
                        e = kl(e, function(e) {
                            return e = $t(e, t),
                            r = r || 1 < e.length,
                            e
                        }),
                        an(t, Rn(t), n),
                        r && (n = Me(n, 7, Ln));
                        for (var a = e.length; a--; )
                            Bt(n, e[a]);
                        return n
                    });
                    var vo = kn(function(e, t) {
                        return null == e ? {} : bt(n = e, t, function(e, t) {
                            return oo(n, t)
                        });
                        var n
                    });
                    function ho(e, n) {
                        if (null == e)
                            return {};
                        var t = kl(Rn(e), function(e) {
                            return [e]
                        });
                        return n = Bn(n),
                        bt(e, t, function(e, t) {
                            return n(e, t[0])
                        })
                    }
                    var go = Tn(so)
                      , yo = Tn(co);
                    function bo(e) {
                        return null == e ? [] : Zl(e, so(e))
                    }
                    var Eo = dn(function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? wo(t) : t)
                    });
                    function wo(e) {
                        return No(Za(e).toLowerCase())
                    }
                    function So(e) {
                        return (e = Za(e)) && e.replace(al, eu).replace(ul, "")
                    }
                    var Io = dn(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , Po = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    })
                      , Co = cn("toLowerCase");
                    var _o = dn(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    });
                    var To = dn(function(e, t, n) {
                        return e + (n ? " " : "") + No(t)
                    });
                    var xo = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , No = cn("toUpperCase");
                    function Ao(e, t, n) {
                        return e = Za(e),
                        (t = n ? Ho : t) === Ho ? (n = e,
                        cl.test(n) ? e.match(sl) || [] : e.match(Ki) || []) : e.match(t) || []
                    }
                    var Lo = Pt(function(e, t) {
                        try {
                            return Cl(e, Ho, t)
                        } catch (e) {
                            return xa(e) ? e : new d(e)
                        }
                    })
                      , r = kn(function(t, e) {
                        return Tl(e, function(e) {
                            e = vr(e),
                            ke(t, e, la(t[e], t))
                        }),
                        t
                    });
                    function Oo(e) {
                        return function() {
                            return e
                        }
                    }
                    var ko = vn()
                      , w = vn(!0);
                    function Do(e) {
                        return e
                    }
                    function Ro(e) {
                        return st("function" == typeof e ? e : Me(e, 1))
                    }
                    n = Pt(function(t, n) {
                        return function(e) {
                            return at(e, t, n)
                        }
                    }),
                    t = Pt(function(t, n) {
                        return function(e) {
                            return at(t, e, n)
                        }
                    });
                    function Mo(r, t, e) {
                        var n = so(t)
                          , a = Ze(t, n);
                        null != e || Oa(t) && (a.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        a = Ze(t, so(t)));
                        var o = !(Oa(e) && "chain"in e && !e.chain)
                          , i = Na(r);
                        return Tl(a, function(e) {
                            var n = t[e];
                            r[e] = n,
                            i && (r.prototype[e] = function() {
                                var e = this.__chain__;
                                if (o || e) {
                                    var t = r(this.__wrapped__);
                                    return (t.__actions__ = rn(this.__actions__)).push({
                                        func: n,
                                        args: arguments,
                                        thisArg: r
                                    }),
                                    t.__chain__ = e,
                                    t
                                }
                                return n.apply(r, Dl([this.value()], arguments))
                            }
                            )
                        }),
                        r
                    }
                    function Uo() {}
                    P = bn(kl),
                    ce = bn(Nl),
                    R = bn(Ul);
                    function Go(e) {
                        return Jn(e) ? Vl(vr(e)) : (t = e,
                        function(e) {
                            return Je(e, t)
                        }
                        );
                        var t
                    }
                    J = Sn(),
                    Q = Sn(!0);
                    function Bo() {
                        return []
                    }
                    function jo() {
                        return !1
                    }
                    te = yn(function(e, t) {
                        return e + t
                    }, 0),
                    i = Cn("ceil"),
                    U = yn(function(e, t) {
                        return e / t
                    }, 1),
                    Nt = Cn("floor");
                    var Fo, M = yn(function(e, t) {
                        return e * t
                    }, 1), Kt = Cn("round"), F = yn(function(e, t) {
                        return e - t
                    }, 0);
                    return pe.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new S(zo);
                        return e = qa(e),
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    ,
                    pe.ary = oa,
                    pe.assign = Ja,
                    pe.assignIn = Xa,
                    pe.assignInWith = Qa,
                    pe.assignWith = eo,
                    pe.at = to,
                    pe.before = ia,
                    pe.bind = la,
                    pe.bindAll = r,
                    pe.bindKey = ua,
                    pe.castArray = function() {
                        if (!arguments.length)
                            return [];
                        var e = arguments[0];
                        return Sa(e) ? e : [e]
                    }
                    ,
                    pe.chain = Vr,
                    pe.chunk = function(e, t, n) {
                        t = (n ? Zn(e, t, n) : t === Ho) ? 1 : W(qa(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var a = 0, o = 0, i = I(G(r / t)); a < r; )
                            i[o++] = Lt(e, a, a += t);
                        return i
                    }
                    ,
                    pe.compact = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = 0, a = []; ++t < n; ) {
                            var o = e[t];
                            o && (a[r++] = o)
                        }
                        return a
                    }
                    ,
                    pe.concat = function() {
                        var e = arguments.length;
                        if (!e)
                            return [];
                        for (var t = I(e - 1), n = arguments[0], r = e; r--; )
                            t[r - 1] = arguments[r];
                        return Dl(Sa(n) ? rn(n) : [n], We(t, 1))
                    }
                    ,
                    pe.cond = function(r) {
                        var a = null == r ? 0 : r.length
                          , t = Bn();
                        return r = a ? kl(r, function(e) {
                            if ("function" != typeof e[1])
                                throw new S(zo);
                            return [t(e[0]), e[1]]
                        }) : [],
                        Pt(function(e) {
                            for (var t = -1; ++t < a; ) {
                                var n = r[t];
                                if (Cl(n[0], this, e))
                                    return Cl(n[1], this, e)
                            }
                        })
                    }
                    ,
                    pe.conforms = function(e) {
                        return t = Me(e, 1),
                        n = so(t),
                        function(e) {
                            return Ue(e, t, n)
                        }
                        ;
                        var t, n
                    }
                    ,
                    pe.constant = Oo,
                    pe.countBy = $r,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : Oe(e, t)
                    }
                    ,
                    pe.curry = function e(t, n, r) {
                        n = xn(t, 8, Ho, Ho, Ho, Ho, Ho, n = r ? Ho : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.curryRight = function e(t, n, r) {
                        n = xn(t, qo, Ho, Ho, Ho, Ho, Ho, n = r ? Ho : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.debounce = sa,
                    pe.defaults = no,
                    pe.defaultsDeep = ro,
                    pe.defer = ca,
                    pe.delay = da,
                    pe.difference = yr,
                    pe.differenceBy = br,
                    pe.differenceWith = Er,
                    pe.drop = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Lt(e, (t = n || t === Ho ? 1 : qa(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Lt(e, 0, (t = r - (t = n || t === Ho ? 1 : qa(t))) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.dropRightWhile = function(e, t) {
                        return e && e.length ? Ft(e, Bn(t, 3), !0, !0) : []
                    }
                    ,
                    pe.dropWhile = function(e, t) {
                        return e && e.length ? Ft(e, Bn(t, 3), !0) : []
                    }
                    ,
                    pe.fill = function(e, t, n, r) {
                        var a = null == e ? 0 : e.length;
                        return a ? (n && "number" != typeof n && Zn(e, t, n) && (n = 0,
                        r = a),
                        function(e, t, n, r) {
                            var a = e.length;
                            for ((n = qa(n)) < 0 && (n = a < -n ? 0 : a + n),
                            (r = r === Ho || a < r ? a : qa(r)) < 0 && (r += a),
                            r = r < n ? 0 : $a(r); n < r; )
                                e[n++] = t;
                            return e
                        }(e, t, n, r)) : []
                    }
                    ,
                    pe.filter = function(e, t) {
                        return (Sa(e) ? Al : Ve)(e, Bn(t, 3))
                    }
                    ,
                    pe.flatMap = function(e, t) {
                        return We(ta(e, t), 1)
                    }
                    ,
                    pe.flatMapDeep = function(e, t) {
                        return We(ta(e, t), Jo)
                    }
                    ,
                    pe.flatMapDepth = function(e, t, n) {
                        return n = n === Ho ? 1 : qa(n),
                        We(ta(e, t), n)
                    }
                    ,
                    pe.flatten = Ir,
                    pe.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? We(e, Jo) : []
                    }
                    ,
                    pe.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? We(e, t = t === Ho ? 1 : qa(t)) : []
                    }
                    ,
                    pe.flip = function(e) {
                        return xn(e, 512)
                    }
                    ,
                    pe.flow = ko,
                    pe.flowRight = w,
                    pe.fromPairs = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
                            var a = e[t];
                            r[a[0]] = a[1]
                        }
                        return r
                    }
                    ,
                    pe.functions = function(e) {
                        return null == e ? [] : Ze(e, so(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Ze(e, co(e))
                    }
                    ,
                    pe.groupBy = Xr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? Lt(e, 0, -1) : []
                    }
                    ,
                    pe.intersection = Cr,
                    pe.intersectionBy = _r,
                    pe.intersectionWith = Tr,
                    pe.invert = io,
                    pe.invertBy = lo,
                    pe.invokeMap = Qr,
                    pe.iteratee = Ro,
                    pe.keyBy = ea,
                    pe.keys = so,
                    pe.keysIn = co,
                    pe.map = ta,
                    pe.mapKeys = function(e, r) {
                        var a = {};
                        return r = Bn(r, 3),
                        Ke(e, function(e, t, n) {
                            ke(a, r(e, t, n), e)
                        }),
                        a
                    }
                    ,
                    pe.mapValues = function(e, r) {
                        var a = {};
                        return r = Bn(r, 3),
                        Ke(e, function(e, t, n) {
                            ke(a, t, r(e, t, n))
                        }),
                        a
                    }
                    ,
                    pe.matches = function(e) {
                        return mt(Me(e, 1))
                    }
                    ,
                    pe.matchesProperty = function(e, t) {
                        return vt(e, Me(t, 1))
                    }
                    ,
                    pe.memoize = fa,
                    pe.merge = fo,
                    pe.mergeWith = po,
                    pe.method = n,
                    pe.methodOf = t,
                    pe.mixin = Mo,
                    pe.negate = pa,
                    pe.nthArg = function(t) {
                        return t = qa(t),
                        Pt(function(e) {
                            return gt(e, t)
                        })
                    }
                    ,
                    pe.omit = mo,
                    pe.omitBy = function(e, t) {
                        return ho(e, pa(Bn(t)))
                    }
                    ,
                    pe.once = function(e) {
                        return ia(2, e)
                    }
                    ,
                    pe.orderBy = function(e, t, n, r) {
                        return null == e ? [] : (Sa(t) || (t = null == t ? [] : [t]),
                        Sa(n = r ? Ho : n) || (n = null == n ? [] : [n]),
                        yt(e, t, n))
                    }
                    ,
                    pe.over = P,
                    pe.overArgs = ma,
                    pe.overEvery = ce,
                    pe.overSome = R,
                    pe.partial = va,
                    pe.partialRight = ha,
                    pe.partition = na,
                    pe.pick = vo,
                    pe.pickBy = ho,
                    pe.property = Go,
                    pe.propertyOf = function(t) {
                        return function(e) {
                            return null == t ? Ho : Je(t, e)
                        }
                    }
                    ,
                    pe.pull = Nr,
                    pe.pullAll = Ar,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? Et(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? Et(e, t, Ho, n) : e
                    }
                    ,
                    pe.pullAt = Lr,
                    pe.range = J,
                    pe.rangeRight = Q,
                    pe.rearg = ga,
                    pe.reject = function(e, t) {
                        return (Sa(e) ? Al : Ve)(e, pa(Bn(t, 3)))
                    }
                    ,
                    pe.remove = function(e, t) {
                        var n = [];
                        if (!e || !e.length)
                            return n;
                        var r = -1
                          , a = []
                          , o = e.length;
                        for (t = Bn(t, 3); ++r < o; ) {
                            var i = e[r];
                            t(i, r, e) && (n.push(i),
                            a.push(r))
                        }
                        return wt(e, a),
                        n
                    }
                    ,
                    pe.rest = function(e, t) {
                        if ("function" != typeof e)
                            throw new S(zo);
                        return Pt(e, t = t === Ho ? t : qa(t))
                    }
                    ,
                    pe.reverse = Or,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Zn(e, t, n) : t === Ho) ? 1 : qa(t),
                        (Sa(e) ? _e : _t)(e, t)
                    }
                    ,
                    pe.set = function(e, t, n) {
                        return null == e ? e : Tt(e, t, n)
                    }
                    ,
                    pe.setWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Ho,
                        null == e ? e : Tt(e, t, n, r)
                    }
                    ,
                    pe.shuffle = function(e) {
                        return (Sa(e) ? Te : At)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Zn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : qa(t),
                        n === Ho ? r : qa(n)),
                        Lt(e, t, n)) : []
                    }
                    ,
                    pe.sortBy = ra,
                    pe.sortedUniq = function(e) {
                        return e && e.length ? Rt(e) : []
                    }
                    ,
                    pe.sortedUniqBy = function(e, t) {
                        return e && e.length ? Rt(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.split = function(e, t, n) {
                        return n && "number" != typeof n && Zn(e, t, n) && (t = n = Ho),
                        (n = n === Ho ? ei : n >>> 0) ? (e = Za(e)) && ("string" == typeof t || null != t && !Ua(t)) && !(t = Ut(t)) && ru(e) ? Yt(su(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new S(zo);
                        return r = null == r ? 0 : W(qa(r), 0),
                        Pt(function(e) {
                            var t = e[r]
                              , e = Yt(e, 0, r);
                            return t && Dl(e, t),
                            Cl(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? Lt(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? Lt(e, 0, (t = n || t === Ho ? 1 : qa(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Lt(e, (t = r - (t = n || t === Ho ? 1 : qa(t))) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.takeRightWhile = function(e, t) {
                        return e && e.length ? Ft(e, Bn(t, 3), !1, !0) : []
                    }
                    ,
                    pe.takeWhile = function(e, t) {
                        return e && e.length ? Ft(e, Bn(t, 3)) : []
                    }
                    ,
                    pe.tap = function(e, t) {
                        return t(e),
                        e
                    }
                    ,
                    pe.throttle = function(e, t, n) {
                        var r = !0
                          , a = !0;
                        if ("function" != typeof e)
                            throw new S(zo);
                        return Oa(n) && (r = "leading"in n ? !!n.leading : r,
                        a = "trailing"in n ? !!n.trailing : a),
                        sa(e, t, {
                            leading: r,
                            maxWait: t,
                            trailing: a
                        })
                    }
                    ,
                    pe.thru = Wr,
                    pe.toArray = Va,
                    pe.toPairs = go,
                    pe.toPairsIn = yo,
                    pe.toPath = function(e) {
                        return Sa(e) ? kl(e, vr) : ja(e) ? [e] : rn(mr(Za(e)))
                    }
                    ,
                    pe.toPlainObject = Ya,
                    pe.transform = function(e, r, a) {
                        var t, n = Sa(e), o = n || _a(e) || Fa(e);
                        return r = Bn(r, 4),
                        null == a && (t = e && e.constructor,
                        a = o ? n ? new t : [] : Oa(e) && Na(t) ? me(T(e)) : {}),
                        (o ? Tl : Ke)(e, function(e, t, n) {
                            return r(a, e, t, n)
                        }),
                        a
                    }
                    ,
                    pe.unary = function(e) {
                        return oa(e, 1)
                    }
                    ,
                    pe.union = kr,
                    pe.unionBy = Dr,
                    pe.unionWith = Rr,
                    pe.uniq = function(e) {
                        return e && e.length ? Gt(e) : []
                    }
                    ,
                    pe.uniqBy = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.uniqWith = function(e, t) {
                        return t = "function" == typeof t ? t : Ho,
                        e && e.length ? Gt(e, Ho, t) : []
                    }
                    ,
                    pe.unset = function(e, t) {
                        return null == e || Bt(e, t)
                    }
                    ,
                    pe.unzip = Mr,
                    pe.unzipWith = Ur,
                    pe.update = function(e, t, n) {
                        return null == e ? e : jt(e, t, qt(n))
                    }
                    ,
                    pe.updateWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Ho,
                        null == e ? e : jt(e, t, qt(n), r)
                    }
                    ,
                    pe.values = bo,
                    pe.valuesIn = function(e) {
                        return null == e ? [] : Zl(e, co(e))
                    }
                    ,
                    pe.without = Gr,
                    pe.words = Ao,
                    pe.wrap = function(e, t) {
                        return va(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = jr,
                    pe.xorWith = Fr,
                    pe.zip = Hr,
                    pe.zipObject = function(e, t) {
                        return Vt(e || [], t || [], Ne)
                    }
                    ,
                    pe.zipObjectDeep = function(e, t) {
                        return Vt(e || [], t || [], Tt)
                    }
                    ,
                    pe.zipWith = zr,
                    pe.entries = go,
                    pe.entriesIn = yo,
                    pe.extend = Xa,
                    pe.extendWith = Qa,
                    Mo(pe, pe),
                    pe.add = te,
                    pe.attempt = Lo,
                    pe.camelCase = Eo,
                    pe.capitalize = wo,
                    pe.ceil = i,
                    pe.clamp = function(e, t, n) {
                        return n === Ho && (n = t,
                        t = Ho),
                        n !== Ho && (n = (n = Ka(n)) == n ? n : 0),
                        t !== Ho && (t = (t = Ka(t)) == t ? t : 0),
                        Re(Ka(e), t, n)
                    }
                    ,
                    pe.clone = function(e) {
                        return Me(e, 4)
                    }
                    ,
                    pe.cloneDeep = function(e) {
                        return Me(e, 5)
                    }
                    ,
                    pe.cloneDeepWith = function(e, t) {
                        return Me(e, 5, t = "function" == typeof t ? t : Ho)
                    }
                    ,
                    pe.cloneWith = function(e, t) {
                        return Me(e, 4, t = "function" == typeof t ? t : Ho)
                    }
                    ,
                    pe.conformsTo = function(e, t) {
                        return null == t || Ue(e, t, so(t))
                    }
                    ,
                    pe.deburr = So,
                    pe.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    pe.divide = U,
                    pe.endsWith = function(e, t, n) {
                        e = Za(e),
                        t = Ut(t);
                        var r = e.length
                          , r = n = n === Ho ? r : Re(qa(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = ya,
                    pe.escape = function(e) {
                        return (e = Za(e)) && Ri.test(e) ? e.replace(ki, tu) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Za(e)) && zi.test(e) ? e.replace(Hi, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = Sa(e) ? Nl : He;
                        return n && Zn(e, t, n) && (t = Ho),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = Kr,
                    pe.findIndex = wr,
                    pe.findKey = function(e, t) {
                        return Gl(e, Bn(t, 3), Ke)
                    }
                    ,
                    pe.findLast = Yr,
                    pe.findLastIndex = Sr,
                    pe.findLastKey = function(e, t) {
                        return Gl(e, Bn(t, 3), Ye)
                    }
                    ,
                    pe.floor = Nt,
                    pe.forEach = Zr,
                    pe.forEachRight = Jr,
                    pe.forIn = function(e, t) {
                        return null == e ? e : qe(e, Bn(t, 3), co)
                    }
                    ,
                    pe.forInRight = function(e, t) {
                        return null == e ? e : $e(e, Bn(t, 3), co)
                    }
                    ,
                    pe.forOwn = function(e, t) {
                        return e && Ke(e, Bn(t, 3))
                    }
                    ,
                    pe.forOwnRight = function(e, t) {
                        return e && Ye(e, Bn(t, 3))
                    }
                    ,
                    pe.get = ao,
                    pe.gt = ba,
                    pe.gte = Ea,
                    pe.has = function(e, t) {
                        return null != e && qn(e, t, tt)
                    }
                    ,
                    pe.hasIn = oo,
                    pe.head = Pr,
                    pe.identity = Do,
                    pe.includes = function(e, t, n, r) {
                        return e = Pa(e) ? e : bo(e),
                        n = n && !r ? qa(n) : 0,
                        r = e.length,
                        n < 0 && (n = W(r + n, 0)),
                        Ba(e) ? n <= r && -1 < e.indexOf(t, n) : !!r && -1 < jl(e, t, n)
                    }
                    ,
                    pe.indexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? ((n = null == n ? 0 : qa(n)) < 0 && (n = W(r + n, 0)),
                        jl(e, t, n)) : -1
                    }
                    ,
                    pe.inRange = function(e, t, n) {
                        return t = Wa(t),
                        n === Ho ? (n = t,
                        t = 0) : n = Wa(n),
                        (e = e = Ka(e)) >= q(t = t, n = n) && e < W(t, n)
                    }
                    ,
                    pe.invoke = uo,
                    pe.isArguments = wa,
                    pe.isArray = Sa,
                    pe.isArrayBuffer = Ia,
                    pe.isArrayLike = Pa,
                    pe.isArrayLikeObject = Ca,
                    pe.isBoolean = function(e) {
                        return !0 === e || !1 === e || ka(e) && Qe(e) == ai
                    }
                    ,
                    pe.isBuffer = _a,
                    pe.isDate = Ta,
                    pe.isElement = function(e) {
                        return ka(e) && 1 === e.nodeType && !Ma(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (Pa(e) && (Sa(e) || "string" == typeof e || "function" == typeof e.splice || _a(e) || Fa(e) || wa(e)))
                            return !e.length;
                        var t, n = Wn(e);
                        if (n == si || n == mi)
                            return !e.size;
                        if (er(e))
                            return !ct(e).length;
                        for (t in e)
                            if (y.call(e, t))
                                return !1;
                        return !0
                    }
                    ,
                    pe.isEqual = function(e, t) {
                        return it(e, t)
                    }
                    ,
                    pe.isEqualWith = function(e, t, n) {
                        var r = (n = "function" == typeof n ? n : Ho) ? n(e, t) : Ho;
                        return r === Ho ? it(e, t, Ho, n) : !!r
                    }
                    ,
                    pe.isError = xa,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && H(e)
                    }
                    ,
                    pe.isFunction = Na,
                    pe.isInteger = Aa,
                    pe.isLength = La,
                    pe.isMap = Da,
                    pe.isMatch = function(e, t) {
                        return e === t || lt(e, t, Fn(t))
                    }
                    ,
                    pe.isMatchWith = function(e, t, n) {
                        return n = "function" == typeof n ? n : Ho,
                        lt(e, t, Fn(t), n)
                    }
                    ,
                    pe.isNaN = function(e) {
                        return Ra(e) && e != +e
                    }
                    ,
                    pe.isNative = function(e) {
                        if (Qn(e))
                            throw new d("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                        return ut(e)
                    }
                    ,
                    pe.isNil = function(e) {
                        return null == e
                    }
                    ,
                    pe.isNull = function(e) {
                        return null === e
                    }
                    ,
                    pe.isNumber = Ra,
                    pe.isObject = Oa,
                    pe.isObjectLike = ka,
                    pe.isPlainObject = Ma,
                    pe.isRegExp = Ua,
                    pe.isSafeInteger = function(e) {
                        return Aa(e) && -Xo <= e && e <= Xo
                    }
                    ,
                    pe.isSet = Ga,
                    pe.isString = Ba,
                    pe.isSymbol = ja,
                    pe.isTypedArray = Fa,
                    pe.isUndefined = function(e) {
                        return e === Ho
                    }
                    ,
                    pe.isWeakMap = function(e) {
                        return ka(e) && Wn(e) == gi
                    }
                    ,
                    pe.isWeakSet = function(e) {
                        return ka(e) && "[object WeakSet]" == Qe(e)
                    }
                    ,
                    pe.join = function(e, t) {
                        return null == e ? "" : z.call(e, t)
                    }
                    ,
                    pe.kebabCase = Io,
                    pe.last = xr,
                    pe.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var a = r;
                        return n !== Ho && (a = (a = qa(n)) < 0 ? W(r + a, 0) : q(a, r - 1)),
                        t == t ? function(e, t, n) {
                            for (var r = n + 1; r--; )
                                if (e[r] === t)
                                    return r;
                            return r
                        }(e, t, a) : Bl(e, Hl, a, !0)
                    }
                    ,
                    pe.lowerCase = Po,
                    pe.lowerFirst = Co,
                    pe.lt = Ha,
                    pe.lte = za,
                    pe.max = function(e) {
                        return e && e.length ? ze(e, Do, et) : Ho
                    }
                    ,
                    pe.maxBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), et) : Ho
                    }
                    ,
                    pe.mean = function(e) {
                        return zl(e, Do)
                    }
                    ,
                    pe.meanBy = function(e, t) {
                        return zl(e, Bn(t, 2))
                    }
                    ,
                    pe.min = function(e) {
                        return e && e.length ? ze(e, Do, ft) : Ho
                    }
                    ,
                    pe.minBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), ft) : Ho
                    }
                    ,
                    pe.stubArray = Bo,
                    pe.stubFalse = jo,
                    pe.stubObject = function() {
                        return {}
                    }
                    ,
                    pe.stubString = function() {
                        return ""
                    }
                    ,
                    pe.stubTrue = function() {
                        return !0
                    }
                    ,
                    pe.multiply = M,
                    pe.nth = function(e, t) {
                        return e && e.length ? gt(e, qa(t)) : Ho
                    }
                    ,
                    pe.noConflict = function() {
                        return gl._ === this && (gl._ = b),
                        this
                    }
                    ,
                    pe.noop = Uo,
                    pe.now = aa,
                    pe.pad = function(e, t, n) {
                        e = Za(e);
                        var r = (t = qa(t)) ? uu(e) : 0;
                        return !t || t <= r ? e : En(B(r = (t - r) / 2), n) + e + En(G(r), n)
                    }
                    ,
                    pe.padEnd = function(e, t, n) {
                        e = Za(e);
                        var r = (t = qa(t)) ? uu(e) : 0;
                        return t && r < t ? e + En(t - r, n) : e
                    }
                    ,
                    pe.padStart = function(e, t, n) {
                        e = Za(e);
                        var r = (t = qa(t)) ? uu(e) : 0;
                        return t && r < t ? En(t - r, n) + e : e
                    }
                    ,
                    pe.parseInt = function(e, t, n) {
                        return t = n || null == t ? 0 : t && +t,
                        K(Za(e).replace(Vi, ""), t || 0)
                    }
                    ,
                    pe.random = function(e, t, n) {
                        var r;
                        if (n && "boolean" != typeof n && Zn(e, t, n) && (t = n = Ho),
                        n === Ho && ("boolean" == typeof t ? (n = t,
                        t = Ho) : "boolean" == typeof e && (n = e,
                        e = Ho)),
                        e === Ho && t === Ho ? (e = 0,
                        t = 1) : (e = Wa(e),
                        t === Ho ? (t = e,
                        e = 0) : t = Wa(t)),
                        t < e && (r = e,
                        e = t,
                        t = r),
                        n || e % 1 || t % 1) {
                            n = Y();
                            return q(e + n * (t - e + vl("1e-" + ((n + "").length - 1))), t)
                        }
                        return St(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = Sa(e) ? Rl : Wl
                          , a = arguments.length < 3;
                        return r(e, Bn(t, 4), n, a, je)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = Sa(e) ? Ml : Wl
                          , a = arguments.length < 3;
                        return r(e, Bn(t, 4), n, a, Fe)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Zn(e, t, n) : t === Ho) ? 1 : qa(t),
                        It(Za(e), t)
                    }
                    ,
                    pe.replace = function() {
                        var e = arguments
                          , t = Za(e[0]);
                        return e.length < 3 ? t : t.replace(e[1], e[2])
                    }
                    ,
                    pe.result = function(e, t, n) {
                        var r = -1
                          , a = (t = $t(t, e)).length;
                        for (a || (a = 1,
                        e = Ho); ++r < a; ) {
                            var o = null == e ? Ho : e[vr(t[r])];
                            o === Ho && (r = a,
                            o = n),
                            e = Na(o) ? o.call(e) : o
                        }
                        return e
                    }
                    ,
                    pe.round = Kt,
                    pe.runInContext = e,
                    pe.sample = function(e) {
                        return (Sa(e) ? Ce : Ct)(e)
                    }
                    ,
                    pe.size = function(e) {
                        if (null == e)
                            return 0;
                        if (Pa(e))
                            return Ba(e) ? uu(e) : e.length;
                        var t = Wn(e);
                        return t == si || t == mi ? e.size : ct(e).length
                    }
                    ,
                    pe.snakeCase = _o,
                    pe.some = function(e, t, n) {
                        var r = Sa(e) ? Ul : Ot;
                        return n && Zn(e, t, n) && (t = Ho),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.sortedIndex = function(e, t) {
                        return kt(e, t)
                    }
                    ,
                    pe.sortedIndexBy = function(e, t, n) {
                        return Dt(e, t, Bn(n, 2))
                    }
                    ,
                    pe.sortedIndexOf = function(e, t) {
                        var n = null == e ? 0 : e.length;
                        if (n) {
                            var r = kt(e, t);
                            if (r < n && ya(e[r], t))
                                return r
                        }
                        return -1
                    }
                    ,
                    pe.sortedLastIndex = function(e, t) {
                        return kt(e, t, !0)
                    }
                    ,
                    pe.sortedLastIndexBy = function(e, t, n) {
                        return Dt(e, t, Bn(n, 2), !0)
                    }
                    ,
                    pe.sortedLastIndexOf = function(e, t) {
                        if (null == e ? 0 : e.length) {
                            var n = kt(e, t, !0) - 1;
                            if (ya(e[n], t))
                                return n
                        }
                        return -1
                    }
                    ,
                    pe.startCase = To,
                    pe.startsWith = function(e, t, n) {
                        return e = Za(e),
                        n = null == n ? 0 : Re(qa(n), 0, e.length),
                        t = Ut(t),
                        e.slice(n, n + t.length) == t
                    }
                    ,
                    pe.subtract = F,
                    pe.sum = function(e) {
                        return e && e.length ? ql(e, Do) : 0
                    }
                    ,
                    pe.sumBy = function(e, t) {
                        return e && e.length ? ql(e, Bn(t, 2)) : 0
                    }
                    ,
                    pe.template = function(i, e, t) {
                        var n = pe.templateSettings;
                        t && Zn(i, e, t) && (e = Ho),
                        i = Za(i),
                        e = Qa({}, e, n, Nn);
                        var l, u, r = so(n = Qa({}, e.imports, n.imports, Nn)), a = Zl(n, r), s = 0, n = e.interpolate || ol, c = "__p += '", n = p((e.escape || ol).source + "|" + n.source + "|" + (n === Gi ? Ji : ol).source + "|" + (e.evaluate || ol).source + "|$", "g"), o = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++fl + "]") + "\n";
                        if (i.replace(n, function(e, t, n, r, a, o) {
                            return n = n || r,
                            c += i.slice(s, o).replace(il, nu),
                            t && (l = !0,
                            c += "' +\n__e(" + t + ") +\n'"),
                            a && (u = !0,
                            c += "';\n" + a + ";\n__p += '"),
                            n && (c += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
                            s = o + e.length,
                            e
                        }),
                        c += "';\n",
                        e = y.call(e, "variable") && e.variable) {
                            if (Yi.test(e))
                                throw new d("Invalid `variable` option passed into `_.template`")
                        } else
                            c = "with (obj) {\n" + c + "\n}\n";
                        if (c = (u ? c.replace(Ni, "") : c).replace(Ai, "$1").replace(Li, "$1;"),
                        c = "function(" + (e || "obj") + ") {\n" + (e ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (u ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}",
                        (e = Lo(function() {
                            return f(r, o + "return " + c).apply(Ho, a)
                        })).source = c,
                        xa(e))
                            throw e;
                        return e
                    }
                    ,
                    pe.times = function(e, t) {
                        if ((e = qa(e)) < 1 || Xo < e)
                            return [];
                        var n = ei
                          , r = q(e, ei);
                        for (t = Bn(t),
                        e -= ei,
                        r = $l(r, t); ++n < e; )
                            t(n);
                        return r
                    }
                    ,
                    pe.toFinite = Wa,
                    pe.toInteger = qa,
                    pe.toLength = $a,
                    pe.toLower = function(e) {
                        return Za(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = Ka,
                    pe.toSafeInteger = function(e) {
                        return e ? Re(qa(e), -Xo, Xo) : 0 === e ? e : 0
                    }
                    ,
                    pe.toString = Za,
                    pe.toUpper = function(e) {
                        return Za(e).toUpperCase()
                    }
                    ,
                    pe.trim = function(e, t, n) {
                        return (e = Za(e)) && (n || t === Ho) ? Kl(e) : e && (t = Ut(t)) ? (e = su(e),
                        t = su(t),
                        Yt(e, Xl(e, t), Ql(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Za(e)) && (n || t === Ho) ? e.slice(0, cu(e) + 1) : e && (t = Ut(t)) ? Yt(e = su(e), 0, Ql(e, su(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Za(e)) && (n || t === Ho) ? e.replace(Vi, "") : e && (t = Ut(t)) ? Yt(e = su(e), Xl(e, su(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, a = "...";
                        Oa(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? qa(t.length) : r,
                        a = "omission"in t ? Ut(t.omission) : a);
                        var o, t = (e = Za(e)).length;
                        if (ru(e) && (t = (o = su(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - uu(a)) < 1)
                            return a;
                        if (r = o ? Yt(o, 0, t).join("") : e.slice(0, t),
                        n === Ho)
                            return r + a;
                        if (o && (t += r.length - t),
                        Ua(n)) {
                            if (e.slice(t).search(n)) {
                                var i, l = r;
                                for (n.global || (n = p(n.source, Za(Xi.exec(n)) + "g")),
                                n.lastIndex = 0; i = n.exec(l); )
                                    var u = i.index;
                                r = r.slice(0, u === Ho ? t : u)
                            }
                        } else
                            e.indexOf(Ut(n), t) == t || -1 < (t = r.lastIndexOf(n)) && (r = r.slice(0, t));
                        return r + a
                    }
                    ,
                    pe.unescape = function(e) {
                        return (e = Za(e)) && Di.test(e) ? e.replace(Oi, du) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++u;
                        return Za(e) + t
                    }
                    ,
                    pe.upperCase = xo,
                    pe.upperFirst = No,
                    pe.each = Zr,
                    pe.eachRight = Jr,
                    pe.first = Pr,
                    Mo(pe, (Fo = {},
                    Ke(pe, function(e, t) {
                        y.call(pe.prototype, t) || (Fo[t] = e)
                    }),
                    Fo), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    Tl(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    Tl(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === Ho ? 1 : W(qa(e), 0);
                            var t = this.__filtered__ && !r ? new ye(this) : this.clone();
                            return t.__filtered__ ? t.__takeCount__ = q(e, t.__takeCount__) : t.__views__.push({
                                size: q(e, ei),
                                type: n + (t.__dir__ < 0 ? "Right" : "")
                            }),
                            t
                        }
                        ,
                        ye.prototype[n + "Right"] = function(e) {
                            return this.reverse()[n](e).reverse()
                        }
                    }),
                    Tl(["filter", "map", "takeWhile"], function(e, t) {
                        var n = t + 1
                          , r = 1 == n || 3 == n;
                        ye.prototype[e] = function(e) {
                            var t = this.clone();
                            return t.__iteratees__.push({
                                iteratee: Bn(e, 3),
                                type: n
                            }),
                            t.__filtered__ = t.__filtered__ || r,
                            t
                        }
                    }),
                    Tl(["head", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        ye.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    Tl(["initial", "tail"], function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        ye.prototype[e] = function() {
                            return this.__filtered__ ? new ye(this) : this[n](1)
                        }
                    }),
                    ye.prototype.compact = function() {
                        return this.filter(Do)
                    }
                    ,
                    ye.prototype.find = function(e) {
                        return this.filter(e).head()
                    }
                    ,
                    ye.prototype.findLast = function(e) {
                        return this.reverse().find(e)
                    }
                    ,
                    ye.prototype.invokeMap = Pt(function(t, n) {
                        return "function" == typeof t ? new ye(this) : this.map(function(e) {
                            return at(e, t, n)
                        })
                    }),
                    ye.prototype.reject = function(e) {
                        return this.filter(pa(Bn(e)))
                    }
                    ,
                    ye.prototype.slice = function(e, t) {
                        e = qa(e);
                        var n = this;
                        return n.__filtered__ && (0 < e || t < 0) ? new ye(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)),
                        t !== Ho && (n = (t = qa(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                        n)
                    }
                    ,
                    ye.prototype.takeRightWhile = function(e) {
                        return this.reverse().takeWhile(e).reverse()
                    }
                    ,
                    ye.prototype.toArray = function() {
                        return this.take(ei)
                    }
                    ,
                    Ke(ye.prototype, function(s, e) {
                        var c = /^(?:filter|find|map|reject)|While$/.test(e)
                          , d = /^(?:head|last)$/.test(e)
                          , f = pe[d ? "take" + ("last" == e ? "Right" : "") : e]
                          , p = d || /^find/.test(e);
                        f && (pe.prototype[e] = function() {
                            function e(e) {
                                return e = f.apply(pe, Dl([e], n)),
                                d && i ? e[0] : e
                            }
                            var t = this.__wrapped__
                              , n = d ? [1] : arguments
                              , r = t instanceof ye
                              , a = n[0]
                              , o = r || Sa(t);
                            o && c && "function" == typeof a && 1 != a.length && (r = o = !1);
                            var i = this.__chain__
                              , l = !!this.__actions__.length
                              , a = p && !i
                              , l = r && !l;
                            if (p || !o)
                                return a && l ? s.apply(this, n) : (u = this.thru(e),
                                a ? d ? u.value()[0] : u.value() : u);
                            t = l ? t : new ye(this);
                            var u = s.apply(t, n);
                            return u.__actions__.push({
                                func: Wr,
                                args: [e],
                                thisArg: Ho
                            }),
                            new ge(u,i)
                        }
                        )
                    }),
                    Tl(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                        var n = o[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , a = /^(?:pop|shift)$/.test(e);
                        pe.prototype[e] = function() {
                            var t = arguments;
                            if (!a || this.__chain__)
                                return this[r](function(e) {
                                    return n.apply(Sa(e) ? e : [], t)
                                });
                            var e = this.value();
                            return n.apply(Sa(e) ? e : [], t)
                        }
                    }),
                    Ke(ye.prototype, function(e, t) {
                        var n, r = pe[t];
                        r && (n = r.name + "",
                        y.call(ae, n) || (ae[n] = []),
                        ae[n].push({
                            name: t,
                            func: r
                        }))
                    }),
                    ae[hn(Ho, 2).name] = [{
                        name: "wrapper",
                        func: Ho
                    }],
                    ye.prototype.clone = function() {
                        var e = new ye(this.__wrapped__);
                        return e.__actions__ = rn(this.__actions__),
                        e.__dir__ = this.__dir__,
                        e.__filtered__ = this.__filtered__,
                        e.__iteratees__ = rn(this.__iteratees__),
                        e.__takeCount__ = this.__takeCount__,
                        e.__views__ = rn(this.__views__),
                        e
                    }
                    ,
                    ye.prototype.reverse = function() {
                        var e;
                        return this.__filtered__ ? ((e = new ye(this)).__dir__ = -1,
                        e.__filtered__ = !0) : (e = this.clone()).__dir__ *= -1,
                        e
                    }
                    ,
                    ye.prototype.value = function() {
                        var e = this.__wrapped__.value()
                          , t = this.__dir__
                          , n = Sa(e)
                          , r = t < 0
                          , a = n ? e.length : 0
                          , o = function(e, t, n) {
                            var r = -1
                              , a = n.length;
                            for (; ++r < a; ) {
                                var o = n[r]
                                  , i = o.size;
                                switch (o.type) {
                                case "drop":
                                    e += i;
                                    break;
                                case "dropRight":
                                    t -= i;
                                    break;
                                case "take":
                                    t = q(t, e + i);
                                    break;
                                case "takeRight":
                                    e = W(e, t - i)
                                }
                            }
                            return {
                                start: e,
                                end: t
                            }
                        }(0, a, this.__views__)
                          , i = o.start
                          , l = (o = o.end) - i
                          , u = r ? o : i - 1
                          , s = this.__iteratees__
                          , c = s.length
                          , d = 0
                          , f = q(l, this.__takeCount__);
                        if (!n || !r && a == l && f == l)
                            return Ht(e, this.__actions__);
                        var p = [];
                        e: for (; l-- && d < f; ) {
                            for (var m = -1, v = e[u += t]; ++m < c; ) {
                                var h = s[m]
                                  , g = h.iteratee
                                  , h = h.type
                                  , g = g(v);
                                if (2 == h)
                                    v = g;
                                else if (!g) {
                                    if (1 == h)
                                        continue e;
                                    break e
                                }
                            }
                            p[d++] = v
                        }
                        return p
                    }
                    ,
                    pe.prototype.at = qr,
                    pe.prototype.chain = function() {
                        return Vr(this)
                    }
                    ,
                    pe.prototype.commit = function() {
                        return new ge(this.value(),this.__chain__)
                    }
                    ,
                    pe.prototype.next = function() {
                        this.__values__ === Ho && (this.__values__ = Va(this.value()));
                        var e = this.__index__ >= this.__values__.length;
                        return {
                            done: e,
                            value: e ? Ho : this.__values__[this.__index__++]
                        }
                    }
                    ,
                    pe.prototype.plant = function(e) {
                        for (var t, n = this; n instanceof he; ) {
                            var r = gr(n);
                            r.__index__ = 0,
                            r.__values__ = Ho,
                            t ? a.__wrapped__ = r : t = r;
                            var a = r
                              , n = n.__wrapped__
                        }
                        return a.__wrapped__ = e,
                        t
                    }
                    ,
                    pe.prototype.reverse = function() {
                        var e = this.__wrapped__;
                        if (e instanceof ye) {
                            e = e;
                            return this.__actions__.length && (e = new ye(this)),
                            (e = e.reverse()).__actions__.push({
                                func: Wr,
                                args: [Or],
                                thisArg: Ho
                            }),
                            new ge(e,this.__chain__)
                        }
                        return this.thru(Or)
                    }
                    ,
                    pe.prototype.toJSON = pe.prototype.valueOf = pe.prototype.value = function() {
                        return Ht(this.__wrapped__, this.__actions__)
                    }
                    ,
                    pe.prototype.first = pe.prototype.head,
                    O && (pe.prototype[O] = function() {
                        return this
                    }
                    ),
                    pe
                }();
                gl._ = fu,
                (k = function() {
                    return fu
                }
                .call(L, O, L, A)) === Ho || (A.exports = k)
            }
            .call(this)
        }
    }
      , r = {};
    function xo(e) {
        if (r[e])
            return r[e].exports;
        var t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, xo),
        t.loaded = !0,
        t.exports
    }
    xo.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return xo.d(t, {
            a: t
        }),
        t
    }
    ,
    xo.d = function(e, t) {
        for (var n in t)
            xo.o(t, n) && !xo.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    xo.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    xo.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    xo.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var E, w, q, D, R, M, K = React, Y = xo.n(K), e = ReactDOM, L = CoreUtilities, p = ReactUtilities, S = CoreRobloxUtilities, I = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, P = Roblox, r = P.EnvironmentUrls.apiGatewayUrl, i = {
            getExperimentationValues: function(e, t, n) {
                return {
                    url: r + "/product-experimentation-platform/v1/projects/" + e + "/layers/" + t + "/values?parameters=" + n.join(","),
                    withCredentials: !0
                }
            }
        }, C = {
            homePage: {},
            homePageWeb: {
                IsExpandHomeContentEnabled: !0,
                IsCarouselHorizontalScrollEnabled: !1,
                IsNewScrollArrowsEnabled: !1
            },
            serverTab: {
                ShouldDisableJoinButtonForFullServers: !1
            },
            gameDetails: {
                ShouldHidePrivateServersInAboutTab: !1,
                IsGameStorePreviewEnabled: !1,
                IsEventsSectionUprankEnabled: !1,
                IsEventsSectionRedesignEnabled: !1
            },
            searchPage: {
                ShouldUseOmniSearchAPI: !1
            },
            discoverPage: {
                IsChartsPageRenameEnabled: !0
            },
            tileLayer: {
                IsHigherResolutionImageEnabled: !1
            },
            playButton: {
                HasUpdatedPlayButtons: !1,
                HasUpdatedPlayButtonsVpc: !1
            }
        }, _ = {
            homePage: "PlayerApp.HomePage.UX",
            homePageWeb: "Website.Homepage",
            serverTab: "GameDetails.ServersTab",
            gameDetails: "Website.GameDetails",
            searchPage: "Website.SearchResultsPage",
            discoverPage: "Website.GamesPage",
            tileLayer: "Website.TileLayer",
            playButton: "Website.PlayButton"
        }, t = P.EnvironmentUrls.apiGatewayUrl, u = {
            url: {
                getOmniRecommendations: {
                    url: t + "/discovery-api/omni-recommendation",
                    withCredentials: !0
                },
                getOmniRecommendationsMetadata: {
                    url: t + "/discovery-api/omni-recommendation-metadata",
                    withCredentials: !0
                },
                getOmniSearch: {
                    url: t + "/search-api/omni-search",
                    withCredentials: !0
                },
                getExploreSorts: {
                    url: t + "/explore-api/v1/get-sorts",
                    withCredentials: !0
                },
                getExploreSortContents: {
                    url: t + "/explore-api/v1/get-sort-content",
                    withCredentials: !0
                },
                getSurvey: function(e) {
                    return {
                        url: t + "/rocap/v1/locations/" + e + "/prompts",
                        withCredentials: !0
                    }
                },
                postSurveyResults: function(e) {
                    return {
                        url: t + "/rocap/v1/locations/" + e + "/annotations",
                        withCredentials: !0
                    }
                },
                getGuacAppPolicyBehaviorData: function() {
                    return {
                        url: t + "/universal-app-configuration/v1/behaviors/app-policy/content",
                        withCredentials: !0
                    }
                }
            }
        };
        (he = E = E || {}).Game = "Game",
        he.CatalogAsset = "CatalogAsset",
        he.CatalogBundle = "CatalogBundle",
        (tt = w = w || {}).Carousel = "Carousel",
        tt.AvatarCarousel = "AvatarCarousel",
        tt.SortlessGrid = "SortlessGrid",
        tt.FriendCarousel = "FriendCarousel",
        tt.InterestGrid = "InterestGrid",
        tt.Pills = "Pills",
        (nt = {}).Sponsored = "Sponsored",
        nt.SponsoredGame = "SponsoredGame",
        (ut = q = q || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        ut.GridTile = "GridTile",
        ut.EventTile = "EventTile",
        ut.InterestTile = "InterestTile",
        ut.ExperienceEventsTile = "ExperienceEventsTile",
        (te = D = D || {}).Always = "Always",
        te.Hover = "Hover",
        te.Footer = "Footer",
        (ae = R = R || {}).Disabled = "Disabled",
        ae.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var n, a = "robloxAttributionIds";
        function o(e) {
            var t = window
              , n = t[a];
            return n || (n = {},
            t[a] = n),
            (t = n[e]) || (t = L.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function l() {
            return document.getElementById("place-list")
        }
        (n = n || {}).GameDetailReferral = "gameDetailReferral";
        var Z, s = function(e) {
            return "discover#/sortName/" + e
        }, c = function(e) {
            return "discover#/sortName/v2/" + e
        }, d = function(e) {
            return "charts#/sortName/" + e
        };
        function v(e, t, n) {
            return void 0 === n && (n = {}),
            L.urlService.getUrlWithQueries(S.entityUrl.game.getRelativePath(e) + "/" + L.seoName.formatSeoName(t), n)
        }
        function O(e, t, n, r, a) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === a && (a = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case Z.HomePage:
                    return c(r);
                case Z.GamesPage:
                    return (n ? d : s)(r);
                default:
                    return c(r)
                }
            }(e, t, r),
            L.urlService.getUrlWithQueries(r, b(b({}, n), a))
        }
        function f() {
            return document.referrer
        }
        (he = Z = Z || {}).SearchPage = "searchPage",
        he.SortDetailPageDiscover = "sortDetailPageDiscover",
        he.SortDetailPageHome = "sortDetailPageHome",
        he.GameDetailPage = "gameDetailPage",
        he.GamesPage = "gamesPage",
        he.HomePage = "homePage",
        he.PeopleListInHomePage = "peopleListInHomePage",
        he.InterestCatcher = "interestCatcher";
        var k, m, U, h, g, y, b = function() {
            return (b = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, G = v, T = function() {
            return (T = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, x = function(e, t) {
            var n = {};
            for (a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
                    t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
            return n
        }, N = (tt = S.eventStreamService.eventTypes).pageLoad, A = tt.formInteraction;
        function B(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === P.Presence.PresenceTypes.InGame
            })
        }
        function j(e, t) {
            var n = 0;
            if (!Number.isNaN(e) && !Number.isNaN(t)) {
                if (0 === e && 0 === t)
                    return;
                n = 0 === e && 0 !== t ? 0 : 0 !== e && 0 === t || 100 < (n = Math.floor(e / (e + t) * 100)) ? 100 : n
            }
            return n
        }
        function F(t, e) {
            var n;
            return e.some(function(e) {
                return null === (e = t[e]) || void 0 === e ? void 0 : e.isSponsored
            }) ? ((n = {})[k.AdsPositions] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[k.AdFlags] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[k.AdIds] = e.map(function(e) {
                return (null === (e = t[e]) || void 0 === e ? void 0 : e.nativeAdData) || "0"
            }),
            n) : {}
        }
        function H(e, t) {
            function n(e) {
                return (e = null === (e = null == e ? void 0 : e.primaryMediaAsset) || void 0 === e ? void 0 : e.wideImageAssetId) && "0" !== e ? parseInt(e, 10) : null
            }
            var r;
            return e.layoutDataBySort && t && e.layoutDataBySort[t] ? r = n(e.layoutDataBySort[t]) : e.defaultLayoutData && (r = n(e.defaultLayoutData)),
            r || n(e)
        }
        function z(r, a, e, t) {
            return t === q.GridTile || t === q.EventTile || t === q.InterestTile ? ((t = {})[k.ThumbnailAssetIds] = e.map(function(e) {
                return null !== (e = H(r[e], a.toString())) && void 0 !== e ? e : "0"
            }),
            t[k.ThumbnailListIds] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = a.toString(),
                t = t.layoutDataBySort && e && t.layoutDataBySort[e] ? null === (n = t.layoutDataBySort[e].primaryMediaAsset) || void 0 === n ? void 0 : n.wideImageListId : t.defaultLayoutData ? null === (n = t.defaultLayoutData.primaryMediaAsset) || void 0 === n ? void 0 : n.wideImageListId : null === (t = t.primaryMediaAsset) || void 0 === t ? void 0 : t.wideImageListId) && void 0 !== t ? t : "0"
            }),
            t) : {}
        }
        function V(e) {
            var t = e.tileBadgesByPosition
              , e = [];
            if (t)
                return !t.ImageTopLeft || (t = t.ImageTopLeft.map(function(e) {
                    return e.analyticsId
                })) && 0 < t.length && e.push("ImageTopLeft=" + t.join("+")),
                0 < e.length ? e.join("&") : void 0
        }
        function W(r, a, e, t) {
            return t === q.GridTile || t === q.EventTile || t === q.InterestTile ? ((t = {})[k.TileBadgeContexts] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = a.toString(),
                t.layoutDataBySort && e && t.layoutDataBySort[e] ? n = V(t.layoutDataBySort[e]) : t.defaultLayoutData && (n = V(t.defaultLayoutData)),
                n) && void 0 !== n ? n : "0"
            }),
            t) : {}
        }
        function J(n, r, e, t) {
            if (void 0 === n || void 0 === r || void 0 === e)
                return {};
            var a = []
              , o = [];
            return t.forEach(function(e) {
                var t = n + Math.floor(e / r)
                  , e = e % r;
                a.push(t),
                o.push(e)
            }),
            (t = {})[k.RowsOnPage] = a,
            t[k.PositionsInRow] = o,
            t
        }
        function X(e) {
            return void 0 !== e ? {
                inputUniverseIds: {
                    interestCatcher: e.map(function(e) {
                        return e.toString()
                    })
                }
            } : {}
        }
        function Q(t) {
            return ce(void 0, void 0, Promise, function() {
                return de(this, function(e) {
                    return [2, L.httpService.get({
                        url: P.EnvironmentUrls.thumbnailsApi + "/v1/assets",
                        timeout: 1e4,
                        withCredentials: !0
                    }, {
                        assetIds: [t],
                        size: "768x432",
                        format: "Png"
                    }).then(function(e) {
                        var t, n;
                        return "Completed" === (null === (t = null === (t = e.data.data) || void 0 === t ? void 0 : t[0]) || void 0 === t ? void 0 : t.state) && null !== (n = null === (n = e.data.data) || void 0 === n ? void 0 : n[0]) && void 0 !== n && n.imageUrl ? e.data.data[0].imageUrl : Promise.reject()
                    })]
                })
            })
        }
        (nt = k = k || {}).AbsPositions = "absPositions",
        nt.AdsPositions = "adsPositions",
        nt.AdFlags = "adFlags",
        nt.Algorithm = "algorithm",
        nt.AppliedFilters = "appliedFilters",
        nt.AttributionId = "attributionId",
        nt.Direction = "direction",
        nt.Distance = "distance",
        nt.HttpReferrer = "httpReferrer",
        nt.EmphasisFlag = "emphasisFlag",
        nt.FilterId = "filterId",
        nt.FilterIds = "filterIds",
        nt.GameSetTargetId = "gameSetTargetId",
        nt.GameSetTypeId = "gameSetTypeId",
        nt.InteractionType = "interactionType",
        nt.IsAd = "isAd",
        nt.NativeAdData = "nativeAdData",
        nt.AdIds = "adIds",
        nt.NumberOfLoadedTiles = "numberOfLoadedTiles",
        nt.Page = "page",
        nt.PageSession = "pageSession",
        nt.PlaceId = "placeId",
        nt.PlayContext = "playContext",
        nt.Position = "position",
        nt.PreviousOptionId = "previousOptionId",
        nt.PromptId = "promptId",
        nt.PromptText = "promptText",
        nt.ResourceId = "resourceId",
        nt.ResponseOptionIds = "responseOptionIds",
        nt.ResponseOptionTexts = "responseOptionTexts",
        nt.RootPlaceIds = "rootPlaceIds",
        nt.SelectedIds = "selectedIds",
        nt.SelectedTexts = "selectedTexts",
        nt.ScreenSizeX = "screenSizeX",
        nt.ScreenSizeY = "screenSizeY",
        nt.ScrollAreaSize = "scrollAreaSize",
        nt.ScrollDepth = "scrollDepth",
        nt.SelectedOptionId = "selectedOptionId",
        nt.SelectedOptionIds = "selectedOptionIds",
        nt.ShareLinkType = "shareLinkType",
        nt.ShareLinkId = "shareLinkId",
        nt.SortId = "sortId",
        nt.SortPos = "sortPos",
        nt.StartDepth = "startDepth",
        nt.StartPos = "startPos",
        nt.SuggestionKwd = "suggestionKwd",
        nt.SuggestionReplacedKwd = "suggestionReplacedKwd",
        nt.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        nt.SuggestionAlgorithm = "suggestionAlgorithm",
        nt.TimeToRespond = "timeToRespond",
        nt.Token = "token",
        nt.Topics = "topics",
        nt.TreatmentType = "treatmentType",
        nt.UniverseId = "universeId",
        nt.UniverseIds = "universeIds",
        nt.FriendId = "friendId",
        nt.ThumbnailAssetIds = "thumbnailAssetIds",
        nt.ThumbnailListIds = "thumbnailListIds",
        nt.LinkPath = "linkPath",
        nt.LocationName = "locationName",
        nt.RowsOnPage = "rowsOnPage",
        nt.PositionsInRow = "positionsInRow",
        nt.NavigationUids = "navigationUids",
        nt.TileBadgeContexts = "tileBadgeContexts",
        nt.ButtonName = "buttonName",
        nt.IsInterested = "isInterested",
        nt.InterestedUniverseIds = "interestedUniverseIds",
        (ut = m = m || {}).GameImpressions = "gameImpressions",
        ut.GameDetailReferral = "gameDetailReferral",
        ut.SortDetailReferral = "sortDetailReferral",
        ut.FeedScroll = "feedScroll",
        ut.NavigateToSortLink = "navigateToSortLink",
        ut.SurveyInteraction = "surveyInteraction",
        ut.SurveyImpression = "surveyImpression",
        ut.InterestCatcherClick = "interestCatcherClick",
        ut.FilterImpressions = "filterImpressions",
        ut.GamesFilterClick = "gamesFilterClick",
        (te = U = U || {}).HomePageSessionInfo = "homePageSessionInfo",
        te.GameSearchSessionInfo = "gameSearchSessionInfo",
        te.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        (ae = {}).Submission = "submission",
        ae.Cancellation = "cancellation",
        (he = h = h || {}).Horizontal = "horizontal",
        he.Vertical = "vertical",
        (tt = g = g || {}).Skip = "skip",
        tt.Continue = "continue",
        tt.Interested = "interested",
        (nt = y = y || {}).OpenDropdown = "openDropdown",
        nt.CloseDropdown = "closeDropdown",
        nt.Apply = "apply";
        var ee = ((ut = {})[m.GameImpressions] = function(e) {
            e = x(e, []);
            return [{
                name: m.GameImpressions,
                type: m.GameImpressions,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: m.GameDetailReferral,
                type: m.GameDetailReferral,
                context: N
            }, ne(T(((t = {})[k.AttributionId] = o(n.GameDetailReferral),
            t[k.HttpReferrer] = f(),
            t), e))]
        }
        ,
        ut[m.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SortDetailReferral,
                type: m.SortDetailReferral,
                context: N
            }, ne(T({}, e))]
        }
        ,
        ut[m.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.NavigateToSortLink,
                type: m.NavigateToSortLink,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyInteraction,
                type: m.SurveyInteraction,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyImpression,
                type: m.SurveyImpression,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.InterestCatcherClick,
                type: m.InterestCatcherClick,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.FilterImpressions,
                type: m.FilterImpressions,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut[m.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.GamesFilterClick,
                type: m.GamesFilterClick,
                context: A
            }, ne(T({}, e))]
        }
        ,
        ut)
          , te = (new P.Intl).getDateTimeFormatter()
          , ne = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return "object" == typeof n[t] && n[t] && (e[t] = JSON.stringify(n[t])),
                "number" == typeof n[t] && (e[t] = n[t]),
                "string" == typeof n[t] && (e[t] = encodeURIComponent(n[t])),
                "boolean" == typeof n[t] && (e[t] = n[t] ? 1 : 0),
                e
            }, {})
        }
          , re = L.urlService.parseQueryString
          , ae = L.numberFormat.getNumberFormat
          , oe = j
          , ie = function(e, t) {
            t = j(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , le = function(e) {
            return -1 === e ? "--" : L.abbreviateNumber.getAbbreviatedValue(e)
        }
          , ue = function(n, r) {
            if (0 === n.length || 0 === r)
                return [n];
            var e = Math.ceil(n.length / r);
            return new Array(e).fill(0).map(function(e, t) {
                return n.slice(t * r, (t + 1) * r)
            })
        }
          , se = function() {
            return (se = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , ce = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , de = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , fe = function(r, a, o) {
            return void 0 === o && (o = 1),
            ce(void 0, void 0, Promise, function() {
                var n, t;
                return de(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return e.trys.push([0, 2, , 3]),
                        [4, L.httpService.get(i.getExperimentationValues(o, r, Object.keys(a)))];
                    case 1:
                        return n = e.sent().data,
                        t = Object.keys(n).reduce(function(e, t) {
                            return null !== n[t] && (e[t] = n[t]),
                            e
                        }, {}),
                        [2, se(se({}, a), t)];
                    case 2:
                        return e.sent(),
                        [2, a];
                    case 3:
                        return [2]
                    }
                })
            })
        }
          , pe = function(r, a, o, i, l) {
            return ce(void 0, void 0, Promise, function() {
                var t, n;
                return de(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = se(se({
                            pageType: r,
                            sessionId: a,
                            supportedTreatmentTypes: [w.SortlessGrid],
                            authIntentData: i
                        }, o), X(l)),
                        [4, L.httpService.post(u.url.getOmniRecommendations, t)];
                    case 1:
                        return n = e.sent().data,
                        Object.keys(n.contentMetadata.Game).forEach(function(e) {
                            e = n.contentMetadata.Game[e];
                            e.placeId = e.rootPlaceId
                        }),
                        [2, n]
                    }
                })
            })
        }
          , me = function(n, r) {
            return ce(void 0, void 0, Promise, function() {
                var t;
                return de(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, L.httpService.post(u.url.getOmniRecommendationsMetadata, {
                            contents: n,
                            sessionId: r
                        })];
                    case 1:
                        return t = e.sent().data,
                        Object.keys(t.contentMetadata.Game).forEach(function(e) {
                            e = t.contentMetadata.Game[e];
                            e.placeId = e.rootPlaceId
                        }),
                        [2, t]
                    }
                })
            })
        }
          , ve = function() {
            return L.httpService.get(u.url.getGuacAppPolicyBehaviorData()).then(function(e) {
                return e.data
            })
        }
          , he = xo(2779)
          , ge = xo.n(he)
          , ye = ReactStyleGuide
          , be = ye.Button.variants;
        function Ee(n, r) {
            var a;
            return void 0 === r && (r = 300),
            [function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                clearTimeout(a),
                a = setTimeout(function() {
                    n.apply(void 0, e)
                }, r)
            }
            , function() {
                clearTimeout(a)
            }
            ]
        }
        (tt = function(e) {
            var t = e.errorMessage
              , n = e.onRefresh
              , e = e.className;
            return Y().createElement("div", {
                "data-testid": "error-status",
                className: ge()("game-error", e)
            }, Y().createElement("span", {
                className: "icon-spot-error-2xl"
            }), Y().createElement("p", {
                className: "text-label error-text"
            }, t), Y().createElement(ye.Button, {
                className: "refresh-button",
                variant: be.control,
                onClick: n
            }, Y().createElement("span", {
                className: "icon-common-refresh"
            })))
        }
        ).defaultProps = {
            className: ""
        };
        var we, Se, Ie, Pe, Ce = tt, _e = function() {
            var e = (0,
            K.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = (e = Ee(function() {
                n(!0)
            }, 100))[0]
              , a = e[1]
              , o = (e = Ee(function() {
                n(!1)
            }, 100))[0]
              , i = e[1];
            return [t, function() {
                i(),
                r()
            }
            , function() {
                a(),
                o()
            }
            ]
        }, Te = function(e, t) {
            return (0,
            K.useMemo)(function() {
                return e.layoutDataBySort && t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
            }, [e.layoutDataBySort, e.defaultLayoutData, t])
        }, xe = HeaderScripts, Ne = P.EnvironmentUrls.gamesApi, Ae = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: Ne + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: Ne + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: Ne + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: Ne + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: Ne + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: Ne + "/v1/games/sorts",
                    withCredentials: !0
                },
                getUniverseVoiceStatus: function(e) {
                    return {
                        withCredentials: !0,
                        url: P.EnvironmentUrls.voiceApi + "/v1/settings/universe/" + e
                    }
                },
                getVoiceOptInStatus: {
                    withCredentials: !0,
                    url: P.EnvironmentUrls.voiceApi + "/v1/settings/user-opt-in"
                }
            },
            defaultCacheCriteria: {
                refreshCache: !1,
                expirationWindowMS: 3e4,
                useCache: !0
            }
        }, Le = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, Oe = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, ke = Ae.defaultCacheCriteria, De = S.dataStores.gamesDataStore, Re = S.dataStores.userDataStoreV2, Me = (S.dataStores.localeDataStore,
        S.dataStores.userDataStore.FriendsUserSortType), Ue = function() {
            return Re.getFriends({
                userId: null === xe.authenticatedUser || void 0 === xe.authenticatedUser ? void 0 : xe.authenticatedUser.id,
                userSort: Me.StatusFrequents,
                isGuest: !1
            }, ke)
        }, Ge = function(t) {
            return Le(void 0, void 0, Promise, function() {
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, De.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Be = function(n) {
            return Le(void 0, void 0, Promise, function() {
                var t;
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, De.getPlaceDetails([n])];
                    case 1:
                        return t = e.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                })
            })
        };
        function je(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function Fe(e) {
            return e.isShimmerEnabled ? "shimmer-animation" : null
        }
        function He(e) {
            return e !== we.IMAGE_TOP_LEFT ? "" : "game-card-pill-top-left"
        }
        function ze(e) {
            var t = [];
            return (e = null === (e = null == e ? void 0 : e.tileBadgesByPosition) || void 0 === e ? void 0 : e.ImageTopLeft) && e.length && (t = e.map(function(e) {
                var t, n = {
                    id: e.analyticsId
                };
                return e.tileBadgeType === Pe.Text && e.text ? (n.text = e.text,
                n.animationClass = Fe(e)) : e.tileBadgeType === Pe.Icon && e.icons && (t = e.icons.map(je).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = Fe(e)),
                n
            })),
            t.length ? ((e = {})[we.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function Ve(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === Ie.TextLabel ? e.footer : null
        }
        function We(e) {
            var t = e.children
              , n = (0,
            K.useState)({
                shouldUseHigherResolutionIcon: !1
            })
              , e = n[0]
              , r = n[1];
            return (0,
            K.useEffect)(function() {
                fe(qe.tileLayer, $e.tileLayer).then(function(e) {
                    null != e && e.IsHigherResolutionImageEnabled && r({
                        shouldUseHigherResolutionIcon: !(null == e || !e.IsHigherResolutionImageEnabled)
                    })
                }).catch(function() {})
            }, []),
            Y().createElement(Ke.Provider, {
                value: e
            }, t)
        }
        (nt = we = we || {}).INVALID = "Invalid",
        nt.IMAGE_TOP_LEFT = "ImageTopLeft",
        nt.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (ut = Se = Se || {}).Home = "Home",
        ut.Games = "Games",
        (ae = {}).Invalid = "Invalid",
        ae.HasLootBoxes = "HasLootBoxes",
        ae.HasInGameTrading = "HasInGameTrading",
        ae.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        ae.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        ae.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        ae.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (te = {}).MorphToR6 = "MorphToR6",
        te.PlayerChoice = "PlayerChoice",
        te.MorphToR15 = "MorphToR15",
        (Ie = Ie || {}).TextLabel = "TextLabel",
        (he = Pe = Pe || {}).Text = "Text",
        he.Icon = "Icon";
        var qe = _
          , $e = C
          , Ke = (0,
        K.createContext)({
            shouldUseHigherResolutionIcon: !1
        })
          , Ye = RobloxThumbnails
          , Ze = {
            maxTilesPerCarouselPage: 6,
            maxWideGameTilesPerCarouselPage: 4,
            minWideGameTilesPerCarouselPage: 2,
            gameTileWidth: 150,
            homeFeedMaxWidth: 970,
            wideGameTileTilesPerRowBreakpointWidth: 738,
            sortlessGridMaxTilesMetadataToFetch: 300,
            adSortHomePageId: 4e8,
            topicIdsWithoutSeeAll: [5e8, 500000001],
            friendsCarouselAngularBootstrapErrorEvent: "HomePageFriendsCarouselBootstrapError",
            missingNumberOfRowsForLoggingErrorEvent: "HomePageMissingNumberOfRowsForLoggingError",
            omniRecommendationEndpointErrorEvent: "HomePageOmniRecommendationEndpointError",
            omniRecommendationEndpointSuccessEvent: "HomePageOmniRecommendationEndpointSuccess",
            subtitleLinkStart: "{linkStart}",
            subtitleLinkEnd: "{linkEnd}"
        }
          , Je = {
            numGameCarouselLookAheadWindows: 3,
            adSortDiscoverId: 27,
            carouselContainerBufferWidth: 80,
            gameTileGutterWidth: 14,
            wideGameTileGutterWidth: 16
        }
          , Xe = {
            maxTilesInGameImpressionsEvent: 25,
            gameImpressionsIntersectionThreshold: .5,
            filterImpressionsIntersectionThreshold: .5,
            wideTileHoverGrowWidthPx: 26,
            numberOfInGameAvatarIcons: 3,
            numberOfInGameNames: 1,
            maxFacepileFriendCountValue: 99,
            numberOfGameTilesPerLoad: 60,
            numberOfGamePassesPerLoad: 50,
            keyBoardEventCode: {
                enter: "Enter",
                escape: "Escape"
            },
            RatingPercentageText: "Label.RatingPercentage"
        }
          , Qe = .1
          , et = Ze
          , tt = Je
          , nt = Xe
          , rt = {
            ActionApply: "Action.Apply",
            LabelSponsoredAd: "Label.SponsoredAd",
            LabelNoSearchResults: "LabelNoSearchResults",
            LabelPlayingOnePlusUsersWithComma: "LabelPlayingOnePlusUsersWithComma",
            LabelPlayingOneUser: "LabelPlayingOneUser",
            LabelBy: "LabelCreatorBy",
            LabelByPrefix: "Label.By"
        }
          , at = {
            LabelApiError: "Label.ApiError",
            LabelGames: "Label.Games",
            LabelSponsoredAdsDisclosureStatic: "Label.SponsoredAdsDisclosureStatic"
        }
          , ot = {
            LabelDiscover: "Label.Discover",
            LabelCharts: "Label.Charts",
            ActionClose: "Action.Close",
            ActionDropdownSelected: "Action.DropdownSelected",
            ActionDropdownNotSelected: "Action.DropdownNotSelected"
        }
          , it = {
            ActionSeeAll: "Action.SeeAll",
            ActionInterestCatcherContinue: "Action.InterestCatcherContinue",
            ActionInterestCatcherContinueSelected: "Action.InterestCatcherContinueSelected",
            ActionInterestCatcherSkip: "Action.InterestCatcherSkip",
            ActionInterestCatcherInterested: "Action.InterestCatcherInterested"
        }
          , lt = {
            HeadingDescription: "Heading.Description",
            LabelAgeGuidelines: "Label.AgeGuidelines",
            LabelLearnMore: "Label.LearnMore",
            LabelBy: "Label.By",
            LabelPlaying: "Label.Playing",
            LabelFavorites: "Label.Favorites",
            LabelVisits: "Label.Visits",
            LabelCreated: "Label.Created",
            LabelUpdated: "Label.Updated",
            LabelMaxPlayers: "Label.MaxPlayers",
            LabelGenre: "Label.Genre",
            LabelSubgenre: "Label.Subgenre",
            LabelReportAbuse: "Label.ReportAbuse",
            LabelPlaceCopyingAllowed: "Label.PlaceCopyingAllowed",
            LabelVoiceEnabled: "Label.VoiceEnabled",
            LabelYes: "Label.Yes",
            LabelNo: "Label.No",
            LabelUnavailable: "Label.Unavailable",
            LabelSuitableForEveryone: "Label.SuitableForEveryone",
            LabelMicrophone: "Label.Microphone",
            LabelCamera: "Label.Camera",
            LabelNone: "Label.None",
            LabelThankYou: "Label.ThankYouMessage",
            LabelGenreUnderConstruction: "Label.GenreUnderConstruction",
            LabelGenreInProgress: "Label.GenreInProgress",
            HeadingRecommendedGames: "Heading.RecommendedGames",
            ActionSwapToSource: "Action.SwapToSource",
            ActionSwapToTranslation: "Action.SwapToTranslation",
            ActionTranslate: "Action.Translate",
            LabelNotSupported: "Label.NotSupported",
            LabelSupported: "Label.Supported",
            LabelVoiceChat: "Label.VoiceChat"
        }
          , ut = PropTypes
          , st = "Label.ContextMenuTitle"
          , ct = "Action.ViewDetails"
          , dt = "Action.JoinGame"
          , ft = {
            goToProfileInPlacesList: {
                name: "goToProfileInPlacesList",
                ctx: "click"
            },
            openModalFromGameTile: {
                name: "openModalFromGameTile",
                ctx: "click"
            },
            goToChatInPlacesList: {
                name: "goToChatInPlacesList",
                ctx: "click"
            },
            joinGameInPlacesList: {
                name: "joinGameInPlacesList",
                ctx: "click"
            },
            goToGameDetailInPlacesList: {
                name: "goToGameDetailInPlacesList",
                ctx: "click"
            },
            gamePlayIntentInPlacesList: {
                ctx: "placesListInHomePage"
            }
        };
        function pt(e) {
            var t = e.game
              , n = e.translate
              , r = t.universeId
              , a = t.name
              , e = t.referralUrl
              , t = t.isPlayable
              , r = Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameIcon,
                size: Ye.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: Ye.ThumbnailFormat.jpeg
            });
            return Y().createElement("div", {
                className: "border-bottom player-interaction-container"
            }, Y().createElement("span", {
                className: "cursor-pointer game-icon"
            }, Y().createElement(ye.Link, {
                url: e,
                className: "game-card-link"
            }, r)), Y().createElement("span", {
                className: "game-info-container"
            }, Y().createElement(ye.Link, {
                url: e,
                className: "game-name"
            }, a), !t && Y().createElement(ye.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(ct))))
        }
        pt.propTypes = {
            game: (ae = xo.n(ut))().shape({
                universeId: ae().number,
                placeId: ae().number,
                name: ae().string,
                playerCount: ae().number,
                isShowSponsoredLabel: ae().bool,
                nativeAdData: ae().string,
                imageUrl: ae().string,
                referralUrl: ae().string,
                isPlayable: ae().bool
            }).isRequired,
            translate: ae().func.isRequired
        };
        var mt = pt;
        function vt(e) {
            var t = e.playerId
              , e = e.altName;
            return Y().createElement("div", {
                className: "avatar-card-link"
            }, Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.avatarHeadshot,
                size: Ye.ThumbnailAvatarHeadshotSize.size48,
                targetId: t,
                imgClassName: "avatar-card-image",
                format: Ye.ThumbnailFormat.webp,
                altName: e
            }))
        }
        vt.defaultProps = {
            altName: ""
        },
        vt.propTypes = {
            playerId: ae().number.isRequired,
            altName: ae().string
        };
        var ht = vt;
        function gt(e) {
            var t = e.playerData
              , o = e.dismissModal
              , n = e.isPlayable
              , r = e.translate
              , e = t.presence
              , i = e.rootPlaceId
              , l = e.placeId
              , u = e.gameId
              , s = t.id
              , t = t.nameForDisplay;
            return Y().createElement("div", {
                className: "border-bottom player-info"
            }, Y().createElement("span", {
                className: "player-name"
            }, t), Y().createElement(ye.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: i,
                        placeId: l
                    }
                      , n = S.playGameService.buildPlayGameProperties(i, l, u, s)
                      , r = ft.joinGameInPlacesList
                      , a = ft.gamePlayIntentInPlacesList
                      , a = {
                        eventName: r.name,
                        ctx: r.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: a.ctx
                    };
                    S.playGameService.launchGame(n, a),
                    o(e)
                },
                isDisabled: !n
            }, r(dt)))
        }
        gt.propTypes = {
            playerData: ae().shape({
                presence: ae().shape({
                    rootPlaceId: ae().number,
                    placeId: ae().number,
                    gameId: ae().string
                }),
                id: ae().number,
                nameForDisplay: ae().string
            }).isRequired,
            dismissModal: ae().func.isRequired,
            isPlayable: ae().bool.isRequired,
            translate: ae().func.isRequired
        };
        var yt = gt;
        function bt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , a = e.dismissModal
              , o = e.isPlayable
              , i = e.translate
              , l = {};
            return t.forEach(function(e) {
                l[e.id] = e
            }),
            Y().createElement("div", {
                className: "interaction-container"
            }, Y().createElement("ul", {
                className: "interaction-list"
            }, n.map(function(e, t) {
                var n = e + t
                  , r = l[e]
                  , t = r.id
                  , e = r.nameForDisplay;
                return Y().createElement("li", {
                    key: n,
                    className: "interaction-item",
                    "aria-hidden": "true"
                }, Y().createElement("span", {
                    className: "avatar avatar-headshot avatar-headshot-sm player-avatar"
                }, Y().createElement(ht, {
                    playerId: t,
                    altName: e
                })), Y().createElement(yt, {
                    playerData: r,
                    dismissModal: a,
                    isPlayable: o,
                    translate: i
                }))
            })))
        }
        bt.propTypes = {
            friendsData: ae().arrayOf(ae().shape({
                presense: ae().shape({
                    rootPlaceId: ae().number,
                    placeId: ae().number,
                    gameId: ae().string
                }),
                id: ae().number,
                nameForDisplay: ae().string
            })).isRequired,
            friendsInGame: ae().arrayOf(ae().number).isRequired,
            dismissModal: ae().func.isRequired,
            isPlayable: ae().bool.isRequired,
            translate: ae().func.isRequired
        };
        var Et = bt;
        function wt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , a = e.dismissModal
              , o = e.translate
              , e = o(st);
            return Y().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, Y().createElement(ye.Modal.Header, {
                title: e,
                onClose: a
            }), Y().createElement(mt, {
                game: r,
                translate: o
            }), Y().createElement(Et, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: a,
                isPlayable: r.isPlayable,
                translate: o
            }))
        }
        wt.propTypes = {
            friendsData: ae().arrayOf(ae().shape({
                presense: ae().shape({
                    rootPlaceId: ae().number,
                    placeId: ae().number,
                    gameId: ae().string
                }),
                id: ae().number,
                nameForDisplay: ae().string
            })).isRequired,
            friendsInGame: ae().arrayOf(ae().number).isRequired,
            game: ae().shape({
                universeId: ae().number,
                placeId: ae().number,
                name: ae().string,
                playerCount: ae().number,
                isShowSponsoredLabel: ae().bool,
                nativeAdData: ae().string,
                imageUrl: ae().string,
                referralUrl: ae().string,
                isPlayable: ae().bool
            }).isRequired,
            dismissModal: ae().func.isRequired,
            translate: ae().func.isRequired
        };
        var St = wt
          , te = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (he = function(e) {
            var t = e.tooltipText
              , e = e.sizeInPx
              , e = void 0 === e ? 16 : e;
            return Y().createElement("span", {
                className: "info-tooltip-container"
            }, Y().createElement(ye.Tooltip, {
                id: "games-info-tooltip",
                placement: "right",
                containerClassName: "games-info-tooltip",
                content: t
            }, Y().createElement("svg", {
                width: e,
                height: e,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, Y().createElement("path", {
                d: "M8.97 5.44H7V4H8.97V5.44Z",
                fill: "currentColor"
            }), Y().createElement("path", {
                d: "M8.94347 11.9999H7.05347V6.37988H8.94347V11.9999Z",
                fill: "currentColor"
            }), Y().createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",
                fill: "currentColor"
            }))))
        }
        ).defaultProps = {
            sizeInPx: 16
        };
        var It = he
          , Pt = function() {
            return (Pt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ct = ((ut = {})[q.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        ut[q.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        ut[q.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        ut[q.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        ut[q.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        ut)
          , _t = Pt(Pt({}, Ct), ((he = {})[q.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        he))
          , Tt = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function xt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return Y().createElement(K.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && Y().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + He(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return Y().createElement(Lt, {
                        key: e.id,
                        id: e.id,
                        animationClass: e.animationClass,
                        icons: e.icons,
                        text: e.text,
                        isFocused: r
                    })
                }))
            }))
        }
        function Nt(e) {
            return e = e.playerCount,
            e = le(e),
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-player-count"
            }, Y().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), Y().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function At(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = ge()("game-card-image-pill", {
                "hover-only": e === D.Hover
            });
            return Y().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, Y().createElement(Nt, {
                playerCount: t
            }))
        }
        (ut = function(e) {
            var t = e.animationClass
              , n = e.isFocused
              , r = e.icons
              , a = e.text;
            return null != r && r.length || a ? Y().createElement("div", {
                className: "game-card-pill-with-animation"
            }, Y().createElement("div", {
                className: ge()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
                e))
            }, (null == r ? void 0 : r.length) && r.map(function(e, t) {
                return Y().createElement("span", {
                    key: t,
                    className: "game-card-pill-icon " + e
                })
            }), a && Y().createElement("div", {
                className: "game-card-pill-text"
            }, a))) : null
        }
        ).defaultProps = {
            animation: void 0
        };
        var Lt = ut;
        function Ot(e) {
            return e = e.featureTypes,
            Y().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, e.map(function(e) {
                return kt[e] && Y().createElement("span", {
                    key: e,
                    className: kt[e]
                })
            })))
        }
        At.defaultProps = {
            playerCountStyle: void 0
        };
        var kt = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        };
        function Dt(e) {
            var t = e.id
              , n = e.children
              , r = e.gameData
              , a = e.isOnScreen
              , o = e.page
              , i = e.shouldUseHigherResolutionIcon
              , l = e.buildEventProperties
              , u = e.isFocused
              , e = e.topicId
              , i = i ? Ye.ThumbnailGameIconSize.size256 : Ye.ThumbnailGameIconSize.size150
              , e = Te(r, e);
            return Y().createElement(ye.Link, {
                url: G(r.placeId, r.name, l(r, t)),
                tabIndex: a ? 0 : -1,
                "aria-hidden": !a,
                className: "game-card-link",
                id: r.universeId.toString()
            }, Y().createElement(Rt, {
                gameLayoutData: e,
                isFocused: !!u
            }), o === Z.GamesPage ? Y().createElement("div", {
                className: "game-card-thumb-container"
            }, Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameIcon,
                size: i,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: Ye.ThumbnailFormat.jpeg,
                altName: r.name
            })) : Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameIcon,
                size: i,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: Ye.ThumbnailFormat.jpeg,
                altName: r.name
            }), Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        }
        (he = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , a = e.isFocused
              , e = ze(t);
            return e ? Y().createElement(xt, {
                pills: e,
                isFocused: a
            }) : null !== (a = null == t ? void 0 : t.pill) && void 0 !== a && a.types && 0 < t.pill.types.length ? Y().createElement(Ot, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== D.Always && n !== D.Hover ? null : Y().createElement(At, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Rt = he
          , Mt = function() {
            return (Mt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ut = Xe.keyBoardEventCode
          , Gt = Xe.numberOfInGameAvatarIcons
          , Bt = Xe.numberOfInGameNames;
        function jt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , e = e.playerCount
              , t = ie(n, t)
              , e = le(e);
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats"
            }, Y().createElement("span", {
                className: "info-label icon-votes-gray"
            }), t ? Y().createElement("span", {
                className: "info-label vote-percentage-label"
            }, t) : Y().createElement("span", {
                className: "info-label no-vote"
            }), Y().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), Y().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function Ft(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = Xe.RatingPercentageText
              , t = (null == (t = oe(n, t)) ? void 0 : t.toString()) || "--";
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-rating"
            }, Y().createElement("span", {
                className: "info-label icon-votes-gray"
            }), Y().createElement("span", {
                className: "info-label vote-percentage-label"
            }, r(e, {
                percentRating: t
            }) || t + "% Rating"))
        }
        function Ht(e) {
            return e = e.footerData,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, Y().createElement("span", {
                className: "info-label"
            }, e.text.textLiteral))
        }
        function zt(e) {
            var t = e.iconClassName
              , e = e.text;
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, Y().createElement("span", {
                className: ge()("info-label", t)
            }), Y().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e))
        }
        function Vt(e) {
            return e = e.footerText,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, Y().createElement("span", {
                className: "info-label"
            }, e))
        }
        function Wt(e) {
            return e = e.translate,
            Y().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, Y().createElement("div", {
                className: "native-ad-label"
            }, e(rt.LabelSponsoredAd), Y().createElement(It, {
                tooltipText: e(at.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            })))
        }
        function qt(e) {
            return e = e.user,
            Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.avatarHeadshot,
                size: Ye.ThumbnailAvatarHeadshotSize.size48,
                targetId: e.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: Ye.ThumbnailFormat.webp,
                altName: e.displayName
            })
        }
        function $t(e) {
            return e = e.translate,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, Y().createElement(It, {
                tooltipText: e(at.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            }), Y().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(rt.LabelSponsoredAd)))
        }
        function Kt(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = Xe.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Gt ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? Gt - 1 : Gt
              , a = ge()("avatar-card", {
                "avatar-card-online": n
            });
            return Y().createElement("div", {
                className: "info-avatar"
            }, r && Y().createElement("div", {
                className: a
            }, Y().createElement("div", {
                className: "avatar-count-container"
            }, Y().createElement("span", {
                className: "avatar-count info-label"
            }, r))), t.slice(0, e).map(function(e) {
                return Y().createElement("div", {
                    className: a,
                    key: e.displayName
                }, Y().createElement(qt, {
                    user: e
                }))
            }))
        }
        function Yt(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, Y().createElement(Kt, {
                friendsData: t,
                isOnline: e
            }), Y().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function Zt(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , a = (0,
            K.useState)(!1)
              , e = a[0]
              , o = a[1];
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return Y().createElement("div", {
                className: "game-card-friend-info game-card-info",
                "data-testid": "game-tile-stats-friends"
            }, Y().createElement("div", {
                className: "info-avatar",
                style: {
                    width: 22 * (t.slice(0, Gt).length - 1) + 32 + "px"
                }
            }, t.slice(0, Gt).map(function(e) {
                return Y().createElement("div", {
                    className: "avatar-card",
                    role: "button",
                    tabIndex: 0,
                    key: e.displayName,
                    onClick: function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        o(!0)
                    },
                    onKeyDown: function(e) {
                        e.code === Ut.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        o(!0))
                    }
                }, Y().createElement(qt, {
                    user: e
                }))
            })), r && Y().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Bt ? r(rt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Bt
            }) : r(rt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), Y().createElement(Jt, {
                friendsDataInGame: t,
                game: n,
                show: e,
                onHide: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    o(!1)
                }
            }))
        }
        Dt.defaultProps = {
            page: Z.HomePage,
            isOnScreen: !0,
            shouldUseHigherResolutionIcon: !1,
            isFocused: !1
        },
        Zt.defaultProps = {
            translate: void 0
        };
        var Jt = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , a = e.game
              , e = e.translate;
            return Y().createElement(ye.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, Y().createElement(St, {
                friendsData: r.map(function(e) {
                    return Mt(Mt({}, e), {
                        nameForDisplay: e.displayName
                    })
                }),
                friendsInGame: r.map(function(e) {
                    return e.id
                }),
                game: a,
                dismissModal: n,
                translate: e
            }))
        }, te)
          , Xt = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , Qt = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        (ut = (0,
        K.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , a = e.gameData
              , o = e.page
              , i = void 0 === o ? Z.HomePage : o
              , l = e.className
              , u = void 0 === l ? "grid-item-container game-card-container" : l
              , s = e.friendData
              , c = void 0 === s ? [] : s
              , d = e.isOnScreen
              , f = void 0 === d || d
              , o = e.shouldShowMetadata
              , p = void 0 === o || o
              , l = e.isSponsoredFooterAllowed
              , m = void 0 !== l && l
              , s = e.topicId
              , v = e.translate
              , d = (0,
            K.useState)()
              , h = d[0]
              , g = d[1]
              , o = _e()
              , l = o[0]
              , e = o[1]
              , d = o[2]
              , y = (0,
            K.useMemo)(function() {
                return B(c, a.universeId)
            }, [c, a.universeId])
              , b = Te(a, s)
              , o = (0,
            K.useContext)(Ke).shouldUseHigherResolutionIcon;
            (0,
            K.useEffect)(function() {
                void 0 === h && 0 < y.length && Xt(void 0, void 0, void 0, function() {
                    var t;
                    return Qt(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Be(a.placeId.toString())];
                        case 1:
                            return t = e.sent(),
                            g(t),
                            [3, 3];
                        case 2:
                            return t = e.sent(),
                            console.error(t),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    })
                })
            }, [y, h]);
            return Y().createElement("div", {
                ref: t,
                className: u,
                "data-testid": "game-tile",
                onMouseOver: e,
                onMouseLeave: d,
                onFocus: e,
                onBlur: d
            }, Y().createElement(Dt, {
                id: n,
                isOnScreen: f,
                buildEventProperties: r,
                gameData: a,
                page: i,
                shouldUseHigherResolutionIcon: o,
                isFocused: l,
                topicId: s
            }, function() {
                if (!p)
                    return Y().createElement(Y().Fragment, null);
                if (null != a && a.isShowSponsoredLabel || null != a && a.isSponsored && m)
                    return Y().createElement(Wt, {
                        translate: v
                    });
                var e = Ve(b);
                return e ? Y().createElement(Ht, {
                    footerData: e
                }) : 0 < y.length && h ? Y().createElement(Zt, {
                    friendData: y,
                    gameData: h
                }) : null != a && a.friendActivityTitle ? Y().createElement(Vt, {
                    footerText: a.friendActivityTitle
                }) : Y().createElement(jt, {
                    totalUpVotes: a.totalUpVotes,
                    totalDownVotes: a.totalDownVotes,
                    playerCount: a.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var en = ut;
        (he = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , a = e.purchaseIconClassName
              , o = (0,
            K.useState)(void 0)
              , i = o[0]
              , l = o[1]
              , e = (0,
            K.useState)(void 0)
              , o = e[0]
              , u = e[1];
            if ((0,
            K.useEffect)(function() {
                Be(t).then(function(e) {
                    return l(e)
                }).catch(function() {
                    u(!0)
                })
            }, [t]),
            void 0 === i && !o)
                return Y().createElement(nn, null);
            r = ge()(r, "btn-full-width");
            return Y().createElement(Y().Fragment, null, Y().createElement(ye.Link, {
                "data-testid": "hover-tile-purchase-button",
                className: r,
                url: n || (null == i ? void 0 : i.url)
            }, Y().createElement("span", {
                className: a
            }), Y().createElement("span", {
                className: "btn-text"
            }, (null == i ? void 0 : i.price) || "--"), " "))
        }
        ).defaultProps = {
            clientReferralUrl: ""
        };
        var tn = he
          , nn = function() {
            return Y().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function rn(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , a = (0,
            K.useMemo)(function() {
                return H(t, n)
            }, [t, n])
              , e = (0,
            K.useMemo)(function() {
                return r === q.EventTile ? Ye.ThumbnailGameThumbnailSize.width576 : Ye.ThumbnailGameThumbnailSize.width384
            }, [r]);
            return null !== a ? Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.assetThumbnail,
                size: e,
                targetId: a,
                containerClass: "brief-game-icon",
                format: Ye.ThumbnailFormat.jpeg,
                altName: t.name
            }) : Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameThumbnail,
                size: e,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: Ye.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
        function an(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , a = e.linkUrl
              , e = e.children;
            return n ? Y().createElement(ye.Link, {
                url: a,
                className: t,
                tabIndex: r ? 0 : -1
            }, e) : Y().createElement("span", {
                className: t
            }, e)
        }
        (ut = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , a = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = e.clientReferralUrl
              , l = e.shouldPurchaseNavigateToDetails
              , e = P.PlayButton.usePlayabilityStatus
              , u = P.PlayButton.PlayabilityStatuses
              , s = P.PlayButton.PlayButton
              , c = P.PlayButton.PurchaseButton
              , e = e(t)
              , d = e[0]
              , f = e[1];
            switch (d) {
            case void 0:
            case u.GuestProhibited:
            case u.Playable:
                return Y().createElement(s, {
                    universeId: t,
                    placeId: n,
                    status: null != d ? d : u.Playable,
                    eventProperties: r,
                    buttonClassName: a ? ge()(a, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case u.PurchaseRequired:
                return l ? Y().createElement(tn, {
                    placeId: n,
                    clientReferralUrl: i,
                    purchaseIconClassName: null != o ? o : "icon-common-play",
                    buttonClassName: ge()(null != a ? a : "btn-growth-lg play-button", "purchase-button")
                }) : Y().createElement(c, {
                    universeId: t,
                    placeId: n,
                    iconClassName: null != o ? o : "icon-common-play",
                    refetchPlayabilityStatus: f,
                    buttonClassName: a
                });
            case u.UniverseRootPlaceIsPrivate:
                return Y().createElement("div", {
                    className: null != a ? a : "btn-growth-lg play-button"
                }, Y().createElement("span", {
                    className: "icon-status-private"
                }));
            default:
                return Y().createElement("div", {
                    className: null != a ? a : "btn-growth-lg play-button"
                }, Y().createElement("span", {
                    className: "icon-status-unavailable"
                }))
            }
        }
        ).defaultProps = {
            playButtonEventProperties: {},
            buttonClassName: void 0,
            purchaseIconClassName: void 0,
            clientReferralUrl: void 0,
            shouldPurchaseNavigateToDetails: !1
        };
        var on = ut;
        (he = Y().forwardRef(function(e, t) {
            var n = e.gameData
              , r = e.id
              , a = e.buildEventProperties
              , o = e.friendData
              , i = void 0 === o ? [] : o
              , l = e.playerCountStyle
              , u = e.playButtonStyle
              , s = e.navigationRootPlaceId
              , c = e.isSponsoredFooterAllowed
              , d = void 0 !== c && c
              , f = e.wideTileType
              , p = e.hoverStyle
              , m = e.topicId
              , v = e.isOnScreen
              , h = void 0 === v || v
              , g = e.isInterestedUniverse
              , y = void 0 === g ? void 0 : g
              , b = e.toggleInterest
              , E = void 0 === b ? void 0 : b
              , w = e.translate
              , S = 0 === r
              , I = r === et.maxWideGameTilesPerCarouselPage - 1
              , P = _e()
              , C = P[0]
              , _ = P[1]
              , T = P[2]
              , o = (0,
            K.useState)(n.placeId)
              , x = o[0]
              , N = o[1];
            (0,
            K.useEffect)(function() {
                s && !Number.isNaN(s) ? N(parseInt(s, 10)) : n.navigationUid && Ge(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && N(e.rootPlaceId)
                }).catch(function() {})
            }, [s, n.navigationUid]);
            function A() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== q.EventTile ? Y().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, Y().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            K.useMemo)(function() {
                return G(x, n.name, a(n, r))
            }, [n, a, r, x])
              , v = a(n, r)
              , L = (0,
            K.useMemo)(function() {
                return B(i, n.universeId)
            }, [i, n.universeId])
              , O = (0,
            K.useMemo)(function() {
                return function(e, t) {
                    if (!t)
                        return [];
                    var n = new Map(e.map(function(e) {
                        return [e.id, e]
                    }));
                    return t.map(function(e) {
                        return n.get(e.userId)
                    }).filter(function(e) {
                        return void 0 !== e
                    })
                }(i, n.friendVisits)
            }, [i, n.friendVisits])
              , k = Te(n, m)
              , g = function() {
                return (f !== q.GridTile || u !== R.Disabled) && ((f !== q.EventTile || u === R.Enabled) && f !== q.InterestTile)
            }
              , b = (0,
            K.useMemo)(function() {
                return null != k && k.title ? k.title : n.name
            }, [n.name, null == k ? void 0 : k.title])
              , e = f !== q.InterestTile
              , P = f !== q.InterestTile
              , o = (0,
            K.useCallback)(function() {
                E && E()
            }, [E]);
            return Y().createElement("li", {
                className: ge()("list-item", "hover-game-tile", {
                    "grid-tile": f === q.GridTile
                }, {
                    "event-tile": f === q.EventTile
                }, {
                    "interest-tile": f === q.InterestTile
                }, {
                    "first-tile": S
                }, {
                    "last-tile": I
                }, {
                    "image-overlay": p === M.imageOverlay
                }, {
                    "old-hover": p !== M.imageOverlay
                }, {
                    focused: C
                }),
                "data-testid": "wide-game-tile",
                onMouseOver: P ? _ : void 0,
                onMouseLeave: P ? T : void 0,
                onFocus: P ? _ : void 0,
                onBlur: P ? T : void 0,
                id: n.universeId.toString()
            }, n.universeId && Y().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, Y().createElement(an, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: h,
                linkUrl: c
            }, Y().createElement("div", {
                className: "featured-game-icon-container"
            }, Y().createElement(rn, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), Y().createElement(Rt, {
                gameLayoutData: k,
                playerCountStyle: l,
                playerCount: n.playerCount,
                isFocused: C
            })), Y().createElement("div", {
                className: "info-container"
            }, Y().createElement("div", {
                className: "info-metadata-container"
            }, Y().createElement("div", {
                className: "game-card-name game-name-title",
                "data-testid": "game-tile-game-title",
                title: b
            }, b), Y().createElement("div", {
                className: "wide-game-tile-metadata"
            }, Y().createElement("div", {
                className: "base-metadata"
            }, function() {
                var e = A();
                if (C && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return Y().createElement($t, {
                        translate: w
                    });
                e = Ve(k);
                return e ? Y().createElement(Ht, {
                    footerData: e
                }) : 0 < (null == L ? void 0 : L.length) ? Y().createElement(Yt, {
                    friendsData: L,
                    isOnline: !0
                }) : 0 < (null == O ? void 0 : O.length) ? Y().createElement(Yt, {
                    friendsData: O,
                    isOnline: !1
                }) : n.friendVisitedString ? Y().createElement(zt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === D.Footer ? Y().createElement(jt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : Y().createElement(Ft, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: w
                })
            }()), Y().createElement("div", {
                className: "hover-metadata"
            }, A()))), C && p === M.imageOverlay && g() && Y().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, Y().createElement(on, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })))), C && p !== M.imageOverlay && g() && Y().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, Y().createElement(on, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === q.InterestTile && Y().createElement(ye.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: w(it.ActionInterestCatcherInterested),
                onClick: o
            }, y ? Y().createElement("span", {
                className: "icon-heart-red"
            }) : Y().createElement("span", {
                className: "icon-heart"
            }), Y().createElement("span", null, w(it.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var ln = he
          , un = function() {
            return (un = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , sn = function(e, t) {
            var n = {};
            for (a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
                    t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
            return n
        };
        (ut = (0,
        K.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = sn(e, ["componentType"]);
            switch (n) {
            case q.AppGameTileNoMetadata:
                return Y().createElement(en, un({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case q.GridTile:
            case q.EventTile:
            case q.InterestTile:
                return Y().createElement(ln, un({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return Y().createElement(en, un({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var cn = ut
          , dn = (0,
        K.forwardRef)(function(e, t) {
            var n = e.gameData
              , r = e.buildEventProperties
              , a = e.translate
              , o = e.friendData
              , i = e.componentType
              , l = e.playerCountStyle
              , u = e.playButtonStyle
              , s = e.navigationRootPlaceId
              , c = e.isSponsoredFooterAllowed
              , d = e.hoverStyle
              , f = e.topicId
              , p = e.isExpandHomeContentEnabled
              , m = e.tileRef
              , p = ge()("game-carousel", {
                "wide-game-tile-carousel": i === q.GridTile || i === q.EventTile
            }, {
                "expand-home-content": p
            }, {
                "expand-home-content-disabled": !p
            });
            return Y().createElement("div", {
                "data-testid": "game-carousel",
                ref: t,
                className: p
            }, n.map(function(e, t) {
                return Y().createElement(cn, {
                    componentType: i,
                    playerCountStyle: l,
                    playButtonStyle: u,
                    navigationRootPlaceId: s,
                    isSponsoredFooterAllowed: c,
                    hoverStyle: d,
                    topicId: f,
                    ref: m,
                    key: t,
                    id: t,
                    gameData: e,
                    translate: a,
                    buildEventProperties: r,
                    friendData: o
                })
            }))
        });
        function fn(e) {
            var t = e.children
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && re(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            K.useState)(e && "string" == typeof e ? e : L.uuidService.generateRandomUuid())[0];
            return Y().createElement(gn.Provider, {
                value: e
            }, t)
        }
        function pn() {
            return (0,
            K.useContext)(gn)
        }
        function mn(e) {
            var n = e.defaultSubtitle
              , t = e.endTimestamp
              , r = e.countdownString
              , a = e.formatSubtitleLink
              , o = e.subtitleLink
              , i = e.handleSeeAllLinkClick
              , l = e.backgroundImageAssetId
              , u = (0,
            K.useMemo)(function() {
                var e = t && parseInt(t, 10);
                if (e || 0 === e)
                    return e
            }, [t])
              , s = (e = (0,
            K.useState)(void 0 !== u ? u - Math.floor(Date.now() / 1e3) : void 0))[0]
              , c = e[1];
            (0,
            K.useEffect)(function() {
                if (void 0 !== u) {
                    c(u - Math.floor(Date.now() / 1e3));
                    var e = setInterval(function() {
                        c(u - Math.floor(Date.now() / 1e3))
                    }, 15e3);
                    return function() {
                        clearInterval(e)
                    }
                }
                c(void 0)
            }, [u]);
            var d = (0,
            K.useMemo)(function() {
                if (void 0 !== s && r) {
                    var e = 0
                      , t = 0;
                    if (0 < s && (t = Math.ceil(s / 60),
                    t -= 60 * (e = Math.floor(t / 60))),
                    e < 24)
                        return r.replace("{hours}", e.toString()).replace("{minutes}", t.toString())
                }
                return n
            }, [n, s, r])
              , e = (0,
            K.useMemo)(function() {
                if (a && o && d) {
                    var e = d.indexOf(yn)
                      , t = d.indexOf(bn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + yn.length, t)
                          , t = d.slice(t + bn.length);
                        return Y().createElement(ye.Link, {
                            url: o,
                            onClick: i
                        }, n, Y().createElement("span", {
                            className: "link-text"
                        }, e), t, l ? Y().createElement("span", {
                            className: "icon-chevron-right-dark"
                        }) : Y().createElement("span", {
                            className: "icon-chevron-right"
                        }))
                    }
                }
                return d
            }, [d, o, l, i]);
            return d ? Y().createElement("div", {
                className: "sort-subtitle-container"
            }, Y().createElement("span", {
                className: "font-sort-subtitle text-default"
            }, e)) : null
        }
        dn.displayName = "GameCarousel";
        var vn = function(t, e, n) {
            var r = (0,
            K.useState)(new Set)
              , a = r[0]
              , o = r[1]
              , r = (0,
            K.useState)(new Set)
              , i = r[0]
              , l = r[1]
              , u = (0,
            K.useRef)(null)
              , s = (0,
            K.useRef)(n);
            (0,
            K.useEffect)(function() {
                s.current = n
            }, [n]);
            var c = (0,
            K.useCallback)(function() {
                ue(Array.from(i).filter(function(e) {
                    return !a.has(e)
                }), Xe.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = s.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = ee.gameImpressions(t),
                    S.eventStreamService.sendEvent.apply(S.eventStreamService, t),
                    o(function(e) {
                        var t = e;
                        return n.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }))
                })
            }, [a, i])
              , r = Ee(function() {
                return c()
            })
              , d = r[0]
              , f = r[1];
            (0,
            K.useEffect)(function() {
                var e, o = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return u.current = S.elementVisibilityService.observeChildrenVisibility({
                    elements: o,
                    threshold: Xe.gameImpressionsIntersectionThreshold
                }, function(e, t) {
                    f();
                    var n, r, a = (n = t,
                    r = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = o.findIndex(function(e) {
                            return e === t.target
                        })) && (r.push(e),
                        n.unobserve(t.target))
                    }),
                    r.sort(function(e, t) {
                        return e - t
                    }));
                    l(function(e) {
                        var t = e;
                        return a.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }),
                    d()
                }),
                function() {
                    null != u && u.current && u.current()
                }
            }, [t, e, i, d, f])
        }
          , hn = function() {
            return (hn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , gn = (0,
        K.createContext)("")
          , yn = Ze.subtitleLinkStart
          , bn = Ze.subtitleLinkEnd;
        function En(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            K.useState)("")
              , e = r[0]
              , a = r[1];
            return (0,
            K.useEffect)(function() {
                var t = !0;
                return n ? Q(n).then(function(e) {
                    t && a(e)
                }, function() {
                    t && a("")
                }) : a(""),
                function() {
                    t = !1
                }
            }, [n]),
            Y().createElement("div", {
                className: ge()(["game-sort-carousel-wrapper", {
                    "game-sort-with-mural": !!n,
                    "game-sort-mural-loaded": !!e
                }])
            }, e && Y().createElement("div", {
                className: "game-sort-mural-wrapper"
            }, Y().createElement("img", {
                className: "game-sort-mural",
                alt: "",
                src: e
            }), Y().createElement("div", {
                className: "game-sort-mural-gradient"
            })), t)
        }
        function wn(e) {
            var t = e.scrollClassNames
              , n = e.scrollIconClassName
              , r = e.scroll
              , a = e.isDisabled
              , e = e.isNewScrollArrowsEnabled;
            return Y().createElement("div", {
                "data-testid": "game-carousel-scroll-bar",
                className: t,
                onClick: r,
                "aria-disabled": a,
                onKeyDown: function(e) {
                    e.code === In.enter && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, e ? Y().createElement("span", {
                className: n
            }) : Y().createElement(Y().Fragment, null, Y().createElement("div", {
                className: "arrow"
            }, Y().createElement("span", {
                className: n
            })), Y().createElement("div", {
                className: "spacer"
            })))
        }
        (he = function(e) {
            var t = e.sortTitle
              , n = e.sortSubtitle
              , r = e.seeAllLink
              , a = e.subtitleLink
              , o = e.shouldShowSeparateSubtitleLink
              , i = e.isSortLinkOverrideEnabled
              , l = e.buildNavigateToSortLinkEventProperties
              , u = e.shouldShowSponsoredTooltip
              , s = e.tooltipInfoText
              , c = e.titleContainerClassName
              , d = e.hideSeeAll
              , f = e.endTimestamp
              , p = e.countdownString
              , m = e.backgroundImageAssetId
              , v = e.translate
              , h = (0,
            K.useMemo)(function() {
                return s || (u ? v(at.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [u, s, v])
              , g = (0,
            K.useMemo)(function() {
                return v(i ? lt.LabelLearnMore : it.ActionSeeAll)
            }, [i, v])
              , e = (0,
            K.useCallback)(function() {
                var e;
                i && l && (e = l(),
                e = ee.navigateToSortLink(e),
                S.eventStreamService.sendEvent.apply(S.eventStreamService, e))
            }, [i, l]);
            return Y().createElement("div", {
                className: "game-sort-header-container"
            }, Y().createElement("div", {
                className: c
            }, Y().createElement("h2", {
                className: "sort-header"
            }, d ? Y().createElement("span", null, t) : Y().createElement(ye.Link, {
                url: r
            }, t), h && Y().createElement(It, {
                tooltipText: h
            })), !d && Y().createElement(ye.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, g)), Y().createElement(mn, {
                defaultSubtitle: n,
                endTimestamp: f,
                countdownString: p,
                formatSubtitleLink: i || o,
                subtitleLink: a,
                handleSeeAllLinkClick: e,
                backgroundImageAssetId: m
            }))
        }
        ).defaultProps = {
            sortSubtitle: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            endTimestamp: void 0,
            countdownString: void 0,
            buildNavigateToSortLinkEventProperties: void 0,
            backgroundImageAssetId: void 0
        };
        var Sn = he
          , In = Xe.keyBoardEventCode;
        function Pn(e) {
            var t = e.distance
              , n = e.scrollAreaSize
              , r = e.direction
              , a = e.startingPosition
              , o = e.currentPage
              , i = e.pageSession
              , l = e.gameSetTypeId
              , u = e.gameSetTargetId
              , s = e.sortPosition
              , e = ((e = {})[k.StartPos] = a,
            e[k.Distance] = t,
            e[k.Direction] = r,
            e[k.PageSession] = i,
            e[k.GameSetTypeId] = l,
            e[k.GameSetTargetId] = u,
            e[k.SortPos] = s,
            e[k.ScrollDepth] = t / n,
            e[k.StartDepth] = a / n,
            e[k.ScreenSizeX] = window.innerWidth,
            e[k.ScreenSizeY] = window.innerHeight,
            e[k.ScrollAreaSize] = n,
            e);
            P.EventStream.SendEventWithTarget(m.FeedScroll, o, e, P.EventStream.TargetTypes.WWW)
        }
        function Cn(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , a = e.gameSetTargetId
              , o = e.sortPosition
              , i = e.wrapperRef
              , l = (0,
            K.useRef)(t)
              , u = pn()
              , s = (0,
            K.useMemo)(function() {
                return Ee(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = i.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    Pn({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: h.Horizontal,
                        gameSetTypeId: r,
                        gameSetTargetId: a,
                        sortPosition: o,
                        pageSession: u
                    }),
                    l.current = e)
                }, 250)[0]
            }, [n, r, a, o, u]);
            (0,
            K.useEffect)(function() {
                s(t)
            }, [s, t])
        }
        function _n(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = Mn({}, t),
                    e = null == e ? void 0 : e.EncryptedAdTrackingData;
                    return n.isSponsored = 0 < (null == e ? void 0 : e.length),
                    n.nativeAdData = e,
                    n
                }
                return t
            }).filter(function(e) {
                return void 0 !== e
            })
        }
        function Tn(e) {
            return "recommendationList"in e
        }
        function xn(e) {
            return "games"in e
        }
        function Nn(e) {
            return "filters"in e
        }
        function An(e, t) {
            return "recommendationList"in e ? _n(e.recommendationList, t) : xn(e) ? e.games : []
        }
        function Ln(e) {
            if (e && xn(e))
                return e.gameSetTargetId
        }
        function On(e) {
            var t = Ln(e);
            return void 0 !== t ? ((e = {})[k.GameSetTargetId] = t,
            e) : {}
        }
        function kn(e) {
            if (e = e.find(Nn)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function Dn(e) {
            var t;
            return e && xn(e) && e.appliedFilters ? ((t = {})[k.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (ut = function(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , a = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? Y().createElement(Y().Fragment, null, !t && Y().createElement(wn, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: r,
                isDisabled: t,
                isNewScrollArrowsEnabled: !0
            }), !n && Y().createElement(wn, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: a,
                isDisabled: n,
                isNewScrollArrowsEnabled: !0
            })) : Y().createElement(Y().Fragment, null, Y().createElement(wn, {
                scrollClassNames: ge()("scroller", "prev", {
                    disabled: t
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: t,
                scroll: r,
                isNewScrollArrowsEnabled: !1
            }), Y().createElement(wn, {
                scrollClassNames: ge()("scroller", "next", {
                    disabled: n
                }),
                scrollIconClassName: "icon-games-carousel-right",
                isDisabled: n,
                scroll: a,
                isNewScrollArrowsEnabled: !1
            }))
        }
        ).defaultProps = {
            isNewScrollArrowsEnabled: void 0
        };
        var Rn = ut
          , Mn = function() {
            return (Mn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Un = "undefined" != typeof Map ? Map : (Object.defineProperty(Bn.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Bn.prototype.get = function(e) {
            e = Gn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Bn.prototype.set = function(e, t) {
            var n = Gn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Bn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = Gn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Bn.prototype.has = function(e) {
            return !!~Gn(this.__entries__, e)
        }
        ,
        Bn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Bn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var a = r[n];
                e.call(t, a[1], a[0])
            }
        }
        ,
        Bn);
        function Gn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function Bn() {
            this.__entries__ = []
        }
        var jn = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , Fn = void 0 !== xo.g && xo.g.Math === Math ? xo.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , Hn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Fn) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , zn = 2
          , Vn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , Wn = "undefined" != typeof MutationObserver
          , qn = ($n.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        $n.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        $n.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        $n.prototype.updateObservers_ = function() {
            var e = this.observers_.filter(function(e) {
                return e.gatherActive(),
                e.hasActive()
            });
            return e.forEach(function(e) {
                return e.broadcastActive()
            }),
            0 < e.length
        }
        ,
        $n.prototype.connect_ = function() {
            jn && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            Wn ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
            this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            })) : (document.addEventListener("DOMSubtreeModified", this.refresh),
            this.mutationEventsAdded_ = !0),
            this.connected_ = !0)
        }
        ,
        $n.prototype.disconnect_ = function() {
            jn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        $n.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Vn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        $n.getInstance = function() {
            return this.instance_ || (this.instance_ = new $n),
            this.instance_
        }
        ,
        $n.instance_ = null,
        $n);
        function $n() {
            function e() {
                o && (o = !1,
                r()),
                i && n()
            }
            function t() {
                Hn(e)
            }
            function n() {
                var e = Date.now();
                if (o) {
                    if (e - l < zn)
                        return;
                    i = !0
                } else
                    i = !(o = !0),
                    setTimeout(t, a);
                l = e
            }
            var r, a, o, i, l;
            this.connected_ = !1,
            this.mutationEventsAdded_ = !1,
            this.mutationsObserver_ = null,
            this.observers_ = [],
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this),
            this.refresh = (r = this.refresh.bind(this),
            i = o = !(a = 20),
            l = 0,
            n)
        }
        var Kn = function(e, t) {
            for (var n = 0, r = Object.keys(t); n < r.length; n++) {
                var a = r[n];
                Object.defineProperty(e, a, {
                    value: t[a],
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                })
            }
            return e
        }
          , Yn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Fn
        }
          , Zn = nr(0, 0, 0, 0);
        function Jn(e) {
            return parseFloat(e) || 0
        }
        function Xn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Jn(n["border-" + t + "-width"])
            }, 0)
        }
        function Qn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Zn;
            var r = Yn(e).getComputedStyle(e)
              , a = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var a = r[n]
                      , o = e["padding-" + a];
                    t[a] = Jn(o)
                }
                return t
            }(r)
              , o = a.left + a.right
              , i = a.top + a.bottom
              , l = Jn(r.width)
              , u = Jn(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + o) !== t && (l -= Xn(r, "left", "right") + o),
            Math.round(u + i) !== n && (u -= Xn(r, "top", "bottom") + i)),
            (e = e) !== Yn(e).document.documentElement && (t = Math.round(l + o) - t,
            n = Math.round(u + i) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (u -= n)),
            nr(a.left, a.top, l, u)
        }
        var er = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Yn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Yn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function tr(e) {
            return jn ? er(e) ? nr(0, 0, (t = (t = e).getBBox()).width, t.height) : Qn(e) : Zn;
            var t
        }
        function nr(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var rr = (ar.prototype.isActive = function() {
            var e = tr(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        ar.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        ar);
        function ar(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = nr(0, 0, 0, 0),
            this.target = e
        }
        var or = function(e, t) {
            var n, r, a, o = (n = (o = t).x,
            r = o.y,
            a = o.width,
            t = o.height,
            o = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            o = Object.create(o.prototype),
            Kn(o, {
                x: n,
                y: r,
                width: a,
                height: t,
                top: r,
                right: n + a,
                bottom: t + r,
                left: n
            }),
            o);
            Kn(this, {
                target: e,
                contentRect: o
            })
        }
          , ir = (lr.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Yn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new rr(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        lr.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Yn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e),
                t.size || this.controller_.removeObserver(this))
            }
        }
        ,
        lr.prototype.disconnect = function() {
            this.clearActive(),
            this.observations_.clear(),
            this.controller_.removeObserver(this)
        }
        ,
        lr.prototype.gatherActive = function() {
            var t = this;
            this.clearActive(),
            this.observations_.forEach(function(e) {
                e.isActive() && t.activeObservations_.push(e)
            })
        }
        ,
        lr.prototype.broadcastActive = function() {
            var e, t;
            this.hasActive() && (e = this.callbackCtx_,
            t = this.activeObservations_.map(function(e) {
                return new or(e.target,e.broadcastRect())
            }),
            this.callback_.call(e, t, e),
            this.clearActive())
        }
        ,
        lr.prototype.clearActive = function() {
            this.activeObservations_.splice(0)
        }
        ,
        lr.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length
        }
        ,
        lr);
        function lr(e, t, n) {
            if (this.activeObservations_ = [],
            this.observations_ = new Un,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var ur = new ("undefined" != typeof WeakMap ? WeakMap : Un)
          , sr = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = qn.getInstance()
              , n = new ir(t,n,this);
            ur.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            sr.prototype[t] = function() {
                var e;
                return (e = ur.get(this))[t].apply(e, arguments)
            }
        });
        var he = void 0 !== Fn.ResizeObserver ? Fn.ResizeObserver : sr
          , cr = null !== (ut = window.ResizeObserver) && void 0 !== ut ? ut : he
          , dr = function() {
            var e = (0,
            K.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            K.useCallback)(function(e) {
                e = null === (e = null == e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                void 0 !== e && n(e)
            }, [])
              , e = (0,
            K.useCallback)(function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }, [r])
              , a = (0,
            K.useRef)(new cr(e))
              , e = (0,
            K.useCallback)(function(e) {
                e && null != a && a.current && (r(e),
                a.current.disconnect(),
                a.current.observe(e))
            }, [r]);
            return (0,
            K.useEffect)(function() {
                return function() {
                    null != a && a.current && a.current.disconnect()
                }
            }, []),
            [e, t]
        }
          , fr = tt.numGameCarouselLookAheadWindows
          , pr = tt.gameTileGutterWidth
          , mr = tt.wideGameTileGutterWidth
          , vr = nt.wideTileHoverGrowWidthPx;
        (he = function(e) {
            var t = e.gameData
              , n = e.sort
              , r = e.positionId
              , a = e.page
              , o = e.gamesContainerRef
              , i = e.buildEventProperties
              , l = e.loadMoreGames
              , u = e.isLoadingMoreGames
              , s = e.componentType
              , c = e.playerCountStyle
              , d = e.playButtonStyle
              , f = e.itemsPerRow
              , p = e.friendData
              , m = e.navigationRootPlaceId
              , v = e.isSponsoredFooterAllowed
              , h = e.hoverStyle
              , g = e.topicId
              , y = e.isExpandHomeContentEnabled
              , b = e.isCarouselHorizontalScrollEnabled
              , E = e.isNewScrollArrowsEnabled
              , w = e.translate
              , S = (0,
            K.useRef)(null)
              , I = (0,
            K.useState)(0)
              , P = I[0]
              , C = I[1]
              , _ = (0,
            K.useState)(!1)
              , T = _[0]
              , x = _[1]
              , e = (0,
            K.useState)(!0)
              , N = e[0]
              , A = e[1]
              , I = (0,
            K.useState)(!0)
              , L = I[0]
              , O = I[1]
              , _ = (0,
            K.useState)(0)
              , k = _[0]
              , D = _[1]
              , R = (0,
            K.useMemo)(function() {
                return s === q.GridTile || s === q.EventTile
            }, [s])
              , M = (0,
            K.useMemo)(function() {
                return R ? mr : pr
            }, [R])
              , e = dr()
              , I = e[0]
              , U = e[1]
              , _ = dr()
              , e = _[0]
              , G = _[1]
              , B = (0,
            K.useMemo)(function() {
                if (R && f)
                    return f;
                var e = null === (e = null === (e = null == S ? void 0 : S.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== G && void 0 !== e ? Math.max(1, Math.floor((G + M) / (e + M))) : 0
            }, [G, M, f, R]);
            (0,
            K.useEffect)(function() {
                A(0 <= k),
                u || void 0 !== G && void 0 !== U && Math.abs(k) + G + vr >= U ? O(!0) : O(!1)
            }, [k, G, U, null == t ? void 0 : t.length, u]);
            var j = (0,
            K.useCallback)(function() {
                P + fr * B >= (null == t ? void 0 : t.length) && l && !u && l()
            }, [P, B, l, u, null == t ? void 0 : t.length])
              , F = (0,
            K.useCallback)(function() {
                var e = null === (e = null === (e = null == S ? void 0 : S.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(B) * (e + M)
            }, [B, M])
              , H = (0,
            K.useCallback)(function() {
                var t;
                N || (t = F(),
                D(function(e) {
                    return Math.min(e + t, 0)
                }),
                C(function(e) {
                    return e - B
                }))
            }, [F, N, B])
              , z = (0,
            K.useCallback)(function() {
                var t;
                L || (t = F(),
                D(function(e) {
                    return b && a === Z.HomePage ? void 0 !== U && void 0 !== G ? Math.max(e - t, -1 * (U - G)) : e - t : void 0 !== U ? Math.max(e - t, -1 * U) : e - t
                }),
                C(function(e) {
                    return e + B
                }),
                j())
            }, [j, F, L, B, G, U, a, b])
              , V = (0,
            K.useCallback)(function(e) {
                return P <= e && e < P + B
            }, [P, B])
              , W = (0,
            K.useCallback)(function(e) {
                T || (x(!0),
                e(),
                setTimeout(function() {
                    x(!1)
                }, 200))
            }, [T])
              , _ = (0,
            K.useRef)(null);
            Cn({
                scrollPosition: -k,
                page: a,
                gameSetTypeId: n.topicId,
                gameSetTargetId: Ln(n),
                wrapperRef: _,
                sortPosition: r
            });
            r = (0,
            K.useMemo)(function() {
                return ge()({
                    "hlist games game-cards game-tile-list": !R,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": R,
                    "games-page-carousel": a === Z.GamesPage,
                    "home-page-carousel": a === Z.HomePage
                })
            }, [R, a]);
            return Y().createElement("div", {
                "data-testid": "game-carousel",
                ref: _,
                className: ge()("horizontal-scroller games-list", {
                    "home-page-games-list": a === Z.HomePage,
                    "wide-game-tile-list": R,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, Y().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, Y().createElement("div", {
                ref: I,
                className: "horizontally-scrollable",
                style: {
                    left: k + "px"
                }
            }, Y().createElement("ul", {
                ref: o,
                className: r
            }, t.map(function(e, t) {
                return R ? Y().createElement(cn, {
                    key: e.universeId,
                    ref: S,
                    id: t,
                    isOnScreen: V(t),
                    page: a,
                    gameData: e,
                    translate: w,
                    buildEventProperties: i,
                    componentType: s,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: h,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: v,
                    navigationRootPlaceId: m
                }) : Y().createElement("li", {
                    key: e.universeId,
                    className: "list-item game-card game-tile"
                }, Y().createElement(cn, {
                    ref: S,
                    id: t,
                    isOnScreen: V(t),
                    page: a,
                    gameData: e,
                    className: "game-card-container",
                    translate: w,
                    buildEventProperties: i,
                    componentType: s,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: h,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: v,
                    navigationRootPlaceId: m
                }))
            }))), Y().createElement(Rn, {
                isScrollBackDisabled: N,
                isScrollForwardDisabled: L,
                onScrollBack: function() {
                    return W(H)
                },
                onScrollForward: function() {
                    return W(z)
                },
                isNewScrollArrowsEnabled: E
            })))
        }
        ).defaultProps = {
            loadMoreGames: void 0,
            componentType: void 0,
            itemsPerRow: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            friendData: void 0,
            navigationRootPlaceId: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            topicId: void 0,
            isExpandHomeContentEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0
        };
        var hr = he
          , gr = function() {
            return (gr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        (tt = function(e) {
            function t(e, t) {
                var n = {};
                return n[k.PlaceId] = e.placeId,
                n[k.UniverseId] = e.universeId,
                n[k.IsAd] = e.isSponsored,
                n[k.NativeAdData] = e.nativeAdData,
                n[k.Position] = t,
                n[k.SortPos] = l,
                n[k.NumberOfLoadedTiles] = (o || []).length,
                n[k.GameSetTypeId] = i.topicId,
                n[k.Page] = Z.HomePage,
                n[U.HomePageSessionInfo] = T,
                n[k.PlayContext] = Z.HomePage,
                n
            }
            var n, r = e.translate, a = e.friendsPresence, o = e.gameData, i = e.sort, l = e.positionId, u = e.componentType, s = e.playerCountStyle, c = e.playButtonStyle, d = e.hoverStyle, f = e.tooltipInfoText, p = e.hideSeeAll, m = e.navigationRootPlaceId, v = e.isSponsoredFooterAllowed, h = e.seeAllLinkPath, g = e.subtitleLinkPath, y = e.itemsPerRow, b = e.startingRow, E = e.endTimestamp, w = e.countdownString, S = e.isExpandHomeContentEnabled, I = e.isCarouselHorizontalScrollEnabled, P = e.isNewScrollArrowsEnabled, C = (0,
            K.useRef)(null), _ = (0,
            K.useRef)(null), T = pn(), x = (0,
            K.useCallback)(function(e) {
                if (void 0 !== o && void 0 !== b) {
                    var t = e.filter(function(e) {
                        return e < (null == o ? void 0 : o.length)
                    });
                    return gr(gr(gr(gr(gr(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return o[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return o[e].universeId
                    }),
                    e), z(o, i.topicId, t, u)), W(o, i.topicId, t, u)), F(o, t)), J(b, null == o ? void 0 : o.length, null == o ? void 0 : o.length, t)), ((e = {})[k.NavigationUids] = t.map(function(e) {
                        return null !== (e = o[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[k.AbsPositions] = t,
                    e[k.SortPos] = l,
                    e[k.GameSetTypeId] = i.topicId,
                    e[k.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e))
                }
            }, [o, T, l, i.topicId, u, b]);
            vn(C, o.length, x),
            (0,
            K.useEffect)(function() {
                S && y && null != C && C.current && C.current.style.setProperty("--items-per-row", y.toString())
            }, [S, y]);
            var N = (0,
            K.useMemo)(function() {
                return h ? L.urlService.getAbsoluteUrl(h) : O(i.topic, Z.HomePage, {
                    position: l,
                    sortId: i.topicId,
                    page: Z.HomePage,
                    treatmentType: i.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, l, i.topic, i.topicId, i.treatmentType, h])
              , A = (0,
            K.useMemo)(function() {
                return g || N
            }, [g, N])
              , e = (0,
            K.useCallback)(function() {
                var e;
                if (h)
                    return (e = {})[k.LinkPath] = h,
                    e[k.SortPos] = l,
                    e[k.GameSetTypeId] = i.topicId,
                    e[k.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e
            }, [T, l, h, i.topicId]);
            return Y().createElement(En, {
                backgroundImageAssetId: null !== (x = i.topicLayoutData) && void 0 !== x && x.backgroundImageAssetId ? parseInt(null === (x = i.topicLayoutData) || void 0 === x ? void 0 : x.backgroundImageAssetId, 10) : void 0
            }, Y().createElement(Sn, {
                sortTitle: i.topic,
                sortSubtitle: i.subtitle,
                seeAllLink: N,
                subtitleLink: A,
                shouldShowSeparateSubtitleLink: !!g,
                isSortLinkOverrideEnabled: !!h,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: i.topicId === Ze.adSortHomePageId,
                tooltipInfoText: f,
                titleContainerClassName: "container-header",
                hideSeeAll: p,
                endTimestamp: E,
                countdownString: w,
                backgroundImageAssetId: null !== (w = i.topicLayoutData) && void 0 !== w && w.backgroundImageAssetId ? parseInt(null === (n = i.topicLayoutData) || void 0 === n ? void 0 : n.backgroundImageAssetId, 10) : void 0,
                translate: r
            }), I ? Y().createElement(hr, {
                gameData: o,
                sort: i,
                positionId: l,
                page: Z.HomePage,
                gamesContainerRef: C,
                buildEventProperties: t,
                loadMoreGames: void 0,
                isLoadingMoreGames: !1,
                componentType: u,
                playerCountStyle: s,
                playButtonStyle: c,
                itemsPerRow: y,
                friendData: a,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: v,
                hoverStyle: d,
                topicId: null === (n = i.topicId) || void 0 === n ? void 0 : n.toString(),
                isExpandHomeContentEnabled: S,
                isCarouselHorizontalScrollEnabled: I,
                isNewScrollArrowsEnabled: P,
                translate: r
            }) : Y().createElement(dn, {
                ref: C,
                tileRef: _,
                gameData: o,
                friendData: a,
                buildEventProperties: t,
                translate: r,
                componentType: u,
                playerCountStyle: s,
                playButtonStyle: c,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: v,
                hoverStyle: d,
                topicId: null === (d = i.topicId) || void 0 === d ? void 0 : d.toString(),
                isExpandHomeContentEnabled: S
            }))
        }
        ).defaultProps = {
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            hoverStyle: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            navigationRootPlaceId: void 0,
            isSponsoredFooterAllowed: void 0,
            seeAllLinkPath: void 0,
            subtitleLinkPath: void 0,
            itemsPerRow: void 0,
            endTimestamp: void 0,
            countdownString: void 0,
            isExpandHomeContentEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0
        };
        var yr = tt
          , br = function() {
            return (br = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Er = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , wr = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function Sr() {
            function r(e) {
                (e.detail || []).forEach(function(e) {
                    o.current[e.userId] && (o.current[e.userId] = br(br({}, o.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(br({}, o.current))
            }
            var e = this
              , t = (0,
            K.useState)({})
              , n = t[0]
              , a = t[1]
              , o = (0,
            K.useRef)(n);
            return (0,
            K.useEffect)(function() {
                return Er(e, void 0, void 0, function() {
                    var t, n;
                    return wr(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (t = xe.deviceMeta.getDeviceMeta()) ? void 0 : t.deviceType) !== xe.deviceMeta.DeviceTypes.computer)
                                return [3, 4];
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 3, , 4]),
                            [4, Ue()];
                        case 2:
                            return n = e.sent().userData,
                            n = (n || []).reduce(function(e, t) {
                                return e[t.id] = t,
                                e
                            }, {}),
                            o.current = n,
                            a(br({}, o.current)),
                            document.addEventListener("Roblox.Presence.Update", r),
                            [3, 4];
                        case 3:
                            return n = e.sent(),
                            console.error("useFriendsPresence failed to initialized with the error", n),
                            [3, 4];
                        case 4:
                            return [2]
                        }
                    })
                }),
                function() {
                    document.removeEventListener("Roblox.Presence.Update", r)
                }
            }, []),
            Object.values(n)
        }
        function Ir() {
            var e = (0,
            K.useContext)(Pr);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var Pr = (0,
        K.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Cr = function() {
            return (Cr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        (he = function(e) {
            var t = e.translate
              , r = e.gameData
              , a = e.sort
              , o = e.page
              , i = e.positionId
              , n = e.isLoadingMoreGames
              , l = e.loadMoreGames
              , u = e.tooltipInfoText
              , s = e.hideSeeAll
              , c = e.componentType
              , d = e.playerCountStyle
              , f = e.playButtonStyle
              , p = e.itemsPerRow
              , m = e.isChartsPageRenameEnabled
              , v = e.subtitleLinkPath
              , h = (0,
            K.useRef)(null)
              , g = pn()
              , e = (0,
            K.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Cr(Cr(Cr(Cr(Cr(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), F(r, t)), ((e = {})[k.AbsPositions] = t,
                    e[k.SortPos] = i,
                    e[k.GameSetTypeId] = a.topicId,
                    e)), On(a)), Dn(a)), ((e = {})[k.Page] = o,
                    e[k.NumberOfLoadedTiles] = (r || []).length,
                    e[U.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, i, a, o]);
            vn(h, r.length, e),
            (0,
            K.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            K.useMemo)(function() {
                var e = Cr(Cr(((e = {})[k.Position] = i,
                e[k.GameSetTypeId] = a.topicId,
                e), On(a)), ((t = {})[k.Page] = o,
                t[k.TreatmentType] = w.Carousel,
                t[U.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (xn(e) && e.appliedFilters) {
                        var n = {};
                        return e.appliedFilters.split(",").forEach(function(e) {
                            var t = e.split("=")
                              , e = t[0]
                              , t = t[1];
                            e && t && (n[e] = t)
                        }),
                        n
                    }
                    return {}
                }(a);
                return O(a.sortId, o, e, m, t)
            }, [g, o, i, a, m]);
            return Y().createElement("div", {
                className: ge()("games-list-container", {
                    "wide-game-tile-container": c === q.GridTile || c === q.EventTile
                })
            }, Y().createElement(Sn, {
                sortTitle: a.topic,
                sortSubtitle: a.subtitle,
                subtitleLink: v || e,
                seeAllLink: e,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!v,
                shouldShowSponsoredTooltip: a.topicId === Je.adSortDiscoverId,
                tooltipInfoText: u,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: s,
                translate: t
            }), Y().createElement(hr, {
                gamesContainerRef: h,
                gameData: r,
                sort: a,
                positionId: i,
                loadMoreGames: l,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Cr(Cr(Cr(Cr(((n = {})[k.PlaceId] = e.placeId,
                    n[k.UniverseId] = e.universeId,
                    n[k.IsAd] = e.isSponsored,
                    n[k.NativeAdData] = e.nativeAdData,
                    n[k.Position] = t,
                    n[k.SortPos] = i,
                    n[k.GameSetTypeId] = a.topicId,
                    n), On(a)), ((n = {})[k.NumberOfLoadedTiles] = (r || []).length,
                    n[k.Page] = o,
                    n)), Dn(a)), ((n = {})[U.DiscoverPageSessionInfo] = g,
                    n[k.PlayContext] = Z.GamesPage,
                    n))
                },
                translate: t,
                page: o,
                componentType: c,
                playerCountStyle: d,
                playButtonStyle: f,
                itemsPerRow: p
            }))
        }
        ).defaultProps = {
            loadMoreGames: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            componentType: void 0,
            itemsPerRow: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isChartsPageRenameEnabled: void 0,
            subtitleLinkPath: void 0
        };
        var _r = he;
        function Tr(e) {
            var t = e.sort
              , a = Ir().contentMetadata;
            return 0 === (null == (e = (0,
            K.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == a ? void 0 : a[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, Ar)
            }, [t.recommendationList, a])) ? void 0 : e.length) ? null : Y().createElement(P.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function xr(e) {
            var t = e.loadData
              , n = (0,
            K.useRef)(null)
              , r = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                var e = n.current;
                return e && (r.current = S.elementVisibilityService.observeVisibility({
                    element: e,
                    threshold: Qe
                }, function(e) {
                    e && t && t()
                })),
                function() {
                    null != r && r.current && r.current()
                }
            }, [t]),
            t ? Y().createElement("div", {
                ref: n,
                "data-testid": "sentinel-tile",
                className: "grid-item-container game-card-container invisible"
            }) : null
        }
        (tt = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , a = e.page
              , o = e.itemsPerRow
              , i = e.startingRow
              , l = e.loadMoreGames
              , u = e.isLoadingMoreGames
              , s = e.isExpandHomeContentEnabled
              , c = e.isChartsPageRenameEnabled
              , d = e.isCarouselHorizontalScrollEnabled
              , f = e.isNewScrollArrowsEnabled
              , e = Sr()
              , p = Ir().contentMetadata
              , m = d || a === Z.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === q.EventTile
              , f = f || a === Z.HomePage && (null === (v = null == n ? void 0 : n.topicLayoutData) || void 0 === v ? void 0 : v.componentType) === q.EventTile
              , v = (0,
            K.useMemo)(function() {
                var e;
                return m ? An(n, p) : s ? An(n, p).slice(0, o) : An(n, p).slice(0, function(e, t) {
                    var n = Ze.maxWideGameTilesPerCarouselPage
                      , r = Ze.maxTilesPerCarouselPage;
                    if (e !== Z.GamesPage)
                        switch (t) {
                        case q.GridTile:
                        case q.EventTile:
                        case q.InterestTile:
                            return n;
                        case q.AppGameTileNoMetadata:
                        default:
                            return r
                        }
                }(a, null === (e = n.topicLayoutData) || void 0 === e ? void 0 : e.componentType))
            }, [n, p, a, o, s, m]);
            return 0 === (null == v ? void 0 : v.length) ? null : a === Z.GamesPage ? Y().createElement(_r, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                page: a,
                gameData: v,
                loadMoreGames: l,
                isLoadingMoreGames: !0 === u,
                tooltipInfoText: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.infoText,
                hideSeeAll: "true" === (null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.hideSeeAll),
                componentType: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.componentType,
                playerCountStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playerCountStyle,
                playButtonStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playButtonStyle,
                subtitleLinkPath: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.subtitleLinkPath,
                itemsPerRow: o,
                isChartsPageRenameEnabled: c
            }) : Y().createElement(yr, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                gameData: v,
                friendsPresence: e,
                itemsPerRow: o,
                startingRow: i,
                componentType: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.componentType,
                playerCountStyle: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.playerCountStyle,
                playButtonStyle: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.playButtonStyle,
                hoverStyle: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.hoverStyle,
                tooltipInfoText: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.infoText,
                hideSeeAll: "true" === (null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.hideSeeAll),
                navigationRootPlaceId: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.navigationRootPlaceId,
                isSponsoredFooterAllowed: "true" === (null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.isSponsoredFooterAllowed),
                seeAllLinkPath: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.linkPath,
                subtitleLinkPath: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.subtitleLinkPath,
                endTimestamp: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.endTimestamp,
                countdownString: null === (i = n.topicLayoutData) || void 0 === i ? void 0 : i.countdownString,
                isExpandHomeContentEnabled: s,
                isCarouselHorizontalScrollEnabled: m,
                isNewScrollArrowsEnabled: f
            })
        }
        ).defaultProps = {
            loadMoreGames: void 0,
            isLoadingMoreGames: void 0,
            isExpandHomeContentEnabled: void 0,
            isChartsPageRenameEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0
        };
        var Nr = tt
          , Ar = Ze.maxTilesPerCarouselPage;
        function Lr(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , a = e.creatorId
              , o = e.linkUrl
              , i = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            K.useRef)(null);
            return Y().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, Y().createElement("span", {
                className: "text-label creator-name-label"
            }, l(rt.LabelByPrefix), " "), Y().createElement("a", {
                href: o,
                onClick: function() {
                    P.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: a,
                        creatorType: r,
                        universeId: t
                    }, P.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), i && Y().createElement(Or.VerifiedBadgeIconContainer, {
                size: Or.BadgeSizes.CAPTIONHEADER
            }))
        }
        xr.displayName = "SentinelTile",
        xr.defaultProps = {
            loadData: null
        };
        var Or = RobloxBadges
          , kr = function() {
            var e = (0,
            K.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            K.useState)(!1)
              , e = r[0]
              , a = r[1];
            return (0,
            K.useEffect)(function() {
                a(!0),
                ve().then(function(e) {
                    n(e.shouldShowVpcPlayButtonUpsells)
                }).catch(function() {
                    n(!1)
                }).finally(function() {
                    a(!1)
                })
            }, []),
            {
                shouldShowVpcPlayButtonUpsells: t,
                isFetchingPolicy: e
            }
        };
        (he = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , a = e.disableLoadingState
              , o = e.redirectPurchaseUrl
              , i = P.PlayButton.usePlayabilityStatus
              , l = P.PlayButton.shouldShowUnplayableButton
              , u = P.PlayButton.PlayabilityStatuses
              , s = P.PlayButton.DefaultPlayButton
              , c = i(t)
              , d = c[0]
              , f = c[1]
              , p = _
              , m = C
              , v = (0,
            K.useState)(void 0)
              , h = v[0]
              , g = v[1]
              , e = (0,
            K.useState)(void 0)
              , i = e[0]
              , y = e[1]
              , c = (0,
            K.useState)(!1)
              , v = c[0]
              , b = c[1]
              , e = kr()
              , c = e.shouldShowVpcPlayButtonUpsells
              , e = e.isFetchingPolicy;
            return (0,
            K.useEffect)(function() {
                b(!0),
                fe(p.playButton, m.playButton).then(function(e) {
                    g(!0 === e.HasUpdatedPlayButtons),
                    y(!0 === e.HasUpdatedPlayButtonsVpc)
                }).catch(function() {
                    g(m.playButton.HasUpdatedPlayButtons),
                    y(m.playButton.HasUpdatedPlayButtonsVpc)
                }).finally(function() {
                    b(!1)
                })
            }, [p.playButton, m.playButton]),
            v || e ? a ? Y().createElement(s, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: u.Playable,
                eventProperties: r,
                hideButtonText: !0,
                disableLoadingState: a
            }) : Y().createElement(ye.Loading, null) : !h && l(d, c, i) ? Y().createElement("div", {
                className: "btn-growth-lg play-button"
            }, Y().createElement("span", {
                className: "icon-status-unavailable"
            })) : Y().createElement(s, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: d,
                eventProperties: r,
                disableLoadingState: a,
                buttonClassName: d === u.PurchaseRequired ? "btn-common-play-game-lg purchase-button" : void 0,
                hideButtonText: d !== u.PurchaseRequired,
                hasUpdatedPlayButtonsIxp: h,
                hasUpdatedPlayButtonsVpcIxp: i,
                shouldShowVpcPlayButtonUpsells: c,
                redirectPurchaseUrl: d === u.PurchaseRequired ? o : void 0
            })
        }
        ).defaultProps = {
            playButtonEventProperties: {},
            disableLoadingState: !1,
            redirectPurchaseUrl: void 0
        };
        var Dr = he
          , Rr = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , Mr = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , Ur = (0,
        K.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , a = e.gameData
              , o = e.translate
              , i = e.topicId
              , l = (0,
            K.useState)()
              , u = l[0]
              , s = l[1]
              , c = _e()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Sr()
              , l = Te(a, i)
              , m = (0,
            K.useMemo)(function() {
                return B(p, a.universeId)
            }, [p, a.universeId])
              , c = (0,
            K.useMemo)(function() {
                return 0 < m.length && u ? Y().createElement(Zt, {
                    gameData: u,
                    friendData: m,
                    translate: o
                }) : Y().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == u ? void 0 : u.description)
            }, [m]);
            (0,
            K.useEffect)(function() {
                Rr(void 0, void 0, void 0, function() {
                    var t;
                    return Mr(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Be(a.placeId.toString())];
                        case 1:
                            return t = e.sent(),
                            s(t),
                            [3, 3];
                        case 2:
                            return t = e.sent(),
                            console.error(t),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    })
                })
            }, []);
            var i = v(a.placeId, a.name, r(a, n))
              , r = r(a, n)
              , n = Ve(l);
            return Y().createElement("div", {
                ref: t,
                className: "featured-grid-item-container game-card-container",
                "data-testid": "game-tile-featured",
                onMouseOver: f,
                onMouseLeave: e,
                onFocus: f,
                onBlur: e
            }, Y().createElement(ye.Link, {
                url: i,
                className: "game-card-link",
                id: a.universeId.toString()
            }, Y().createElement(Rt, {
                gameLayoutData: l,
                isFocused: d
            }), Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameIcon,
                size: Ye.ThumbnailGameIconSize.size512,
                targetId: a.universeId,
                containerClass: "game-card-thumb-container",
                format: Ye.ThumbnailFormat.jpeg,
                altName: a.name
            }), Y().createElement("div", {
                className: "game-card-name-info"
            }, Y().createElement("div", null, Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: a.name
            }, a.name), n ? Y().createElement(Ht, {
                footerData: n
            }) : Y().createElement(jt, {
                totalUpVotes: a.totalUpVotes,
                totalDownVotes: a.totalDownVotes,
                playerCount: a.playerCount
            })), Y().createElement(Dr, {
                universeId: a.universeId.toString(),
                placeId: a.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: L.urlService.isValidHttpUrl(i) ? i : void 0
            })), null !== a.creatorName && Y().createElement(Lr, {
                universeId: a.universeId.toString(),
                creatorId: a.creatorId,
                creatorType: a.creatorType,
                creatorName: a.creatorName,
                isCreatorVerified: null !== (r = a.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: i,
                translate: o
            }), c))
        });
        Ur.displayName = "FeaturedGridTile";
        var Gr = function() {
            return (Gr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Br = function(e, t) {
            var n = {};
            for (a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
                    t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
            return n
        };
        (tt = (0,
        K.forwardRef)(function(e, t) {
            var n = e.emphasis
              , r = e.friendData
              , a = e.componentType
              , o = e.playerCountStyle
              , i = e.playButtonStyle
              , l = e.isSponsoredFooterAllowed
              , u = e.hoverStyle
              , s = e.topicId
              , c = e.isInterestedUniverse
              , d = e.toggleInterest
              , e = Br(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? Y().createElement(Ur, Gr({
                ref: t
            }, e)) : Y().createElement(cn, Gr({
                ref: t,
                friendData: r,
                componentType: a,
                playerCountStyle: o,
                playButtonStyle: i,
                isSponsoredFooterAllowed: l,
                hoverStyle: u,
                topicId: s,
                isInterestedUniverse: c,
                toggleInterest: d
            }, e))
        })).displayName = "GameGridTile",
        tt.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var jr = tt
          , Fr = (0,
        K.forwardRef)(function(e, t) {
            var n = e.gameData
              , r = e.translate
              , a = e.emphasis
              , o = e.buildEventProperties
              , i = e.tileRef
              , l = e.loadData
              , u = e.shouldUseSentinelTile
              , s = e.friendsPresence
              , c = e.componentType
              , d = e.playerCountStyle
              , f = e.playButtonStyle
              , p = e.isHomeGameGrid
              , m = e.isSponsoredFooterAllowed
              , v = e.hoverStyle
              , h = e.topicId
              , g = e.isExpandHomeContentEnabled
              , y = e.interestedUniverses
              , b = e.toggleInterest
              , g = ge()("game-grid", {
                "home-game-grid": p
            }, {
                "wide-game-tile-game-grid": c === q.GridTile || c === q.EventTile || c === q.InterestTile
            }, {
                "interest-tile-game-grid": c === q.InterestTile
            }, {
                "expand-home-content": g
            }, {
                "expand-home-content-disabled": !g
            });
            return Y().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: g
            }, n.map(function(e, t) {
                return Y().createElement(jr, {
                    ref: function(e) {
                        (!0 === a && 1 === t || !1 === a && 0 === t) && i && (i.current = e)
                    },
                    key: e.universeId,
                    id: t,
                    gameData: e,
                    translate: r,
                    buildEventProperties: o,
                    emphasis: !0 === a && 0 === t && !p,
                    friendData: s,
                    componentType: c,
                    playerCountStyle: d,
                    playButtonStyle: f,
                    isSponsoredFooterAllowed: m,
                    hoverStyle: v,
                    topicId: h,
                    isInterestedUniverse: null == y ? void 0 : y.has(e.universeId),
                    toggleInterest: b ? function() {
                        return b(e.universeId)
                    }
                    : void 0
                })
            }), u && Y().createElement(xr, {
                loadData: l
            }))
        });
        Fr.displayName = "GameGrid",
        Fr.defaultProps = {
            friendsPresence: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isHomeGameGrid: !1,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            topicId: void 0,
            isExpandHomeContentEnabled: void 0,
            interestedUniverses: void 0,
            toggleInterest: void 0
        };
        var Hr = Fr
          , zr = function() {
            return (zr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        (he = function(e) {
            var r = e.gameData
              , a = e.sort
              , o = e.positionId
              , t = e.friendsPresence
              , n = e.componentType
              , i = e.playerCountStyle
              , l = e.playButtonStyle
              , u = e.hoverStyle
              , s = e.itemsPerRow
              , c = e.startingRow
              , d = e.isSponsoredFooterAllowed
              , f = e.isExpandHomeContentEnabled
              , p = e.translate
              , m = (0,
            K.useRef)(null)
              , v = (0,
            K.useRef)(null)
              , h = pn()
              , e = (0,
            K.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return zr(zr(zr(zr(zr(zr(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), z(r, a.topicId, t, n)), W(r, a.topicId, t, n)), ((e = {})[k.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[k.AbsPositions] = t,
                    e)), F(r, t)), J(c, s, null == r ? void 0 : r.length, t)), ((t = {})[k.SortPos] = o,
                    t[k.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[k.GameSetTypeId] = a.topicId,
                    t[k.Page] = Z.HomePage,
                    t[U.HomePageSessionInfo] = h,
                    t))
                }
            }, [r, h, o, a.topicId, n, s, c]);
            return vn(m, r.length, e),
            (0,
            K.useEffect)(function() {
                s && null != m && m.current && m.current.style.setProperty("--items-per-row", s.toString())
            }, [s]),
            Y().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, Y().createElement("div", {
                className: "container-header"
            }, Y().createElement("h2", null, a.topic, a.topicId === Ze.adSortHomePageId && Y().createElement(It, {
                tooltipText: p(at.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics."
            }))), Y().createElement(Fr, {
                ref: m,
                tileRef: v,
                gameData: r,
                emphasis: !1,
                translate: p,
                buildEventProperties: function(e, t) {
                    var n = {};
                    return n[k.PlaceId] = e.placeId,
                    n[k.UniverseId] = e.universeId,
                    n[k.IsAd] = e.isSponsored,
                    n[k.NativeAdData] = e.nativeAdData,
                    n[k.Position] = t,
                    n[k.SortPos] = o,
                    n[k.NumberOfLoadedTiles] = (r || []).length,
                    n[k.GameSetTypeId] = a.topicId,
                    n[k.Page] = Z.HomePage,
                    n[U.HomePageSessionInfo] = h,
                    n[k.PlayContext] = Z.HomePage,
                    n
                },
                isHomeGameGrid: !0,
                friendsPresence: t,
                componentType: n,
                playerCountStyle: i,
                playButtonStyle: l,
                isSponsoredFooterAllowed: d,
                hoverStyle: u,
                topicId: null === (u = a.topicId) || void 0 === u ? void 0 : u.toString(),
                isExpandHomeContentEnabled: f
            }))
        }
        ).defaultProps = {
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            hoverStyle: void 0,
            itemsPerRow: void 0,
            isSponsoredFooterAllowed: void 0,
            isExpandHomeContentEnabled: void 0
        };
        var Vr = he
          , Wr = Ze.sortlessGridMaxTilesMetadataToFetch;
        function qr(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , a = e.translate
              , e = "(" + (null != t ? t : 0) + ")"
              , n = r ? P.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : P.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends";
            return Y().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? Y().createElement("h2", null, a("Heading.Friends")) : Y().createElement("h2", null, a("Heading.Friends"), Y().createElement("span", {
                className: "friends-count"
            }, e)), Y().createElement("a", {
                href: n,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, a("Heading.SeeAll")))
        }
        function $r(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.translate
              , e = Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.avatarHeadshot,
                size: Ye.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            });
            return Y().createElement(ye.AvatarCardItem.Headshot, {
                statusIcon: Y().createElement(oa().PresenceStatusIcon, {
                    translate: r,
                    userId: t
                }),
                thumbnail: e,
                imageLink: n
            })
        }
        function Kr(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , a = e.userPresence
              , o = e.hasVerifiedBadge
              , e = e.translate;
            return Y().createElement("div", {
                className: "friend-tile-content"
            }, Y().createElement($r, {
                id: t,
                translate: e,
                userProfileUrl: r
            }), Y().createElement("a", {
                href: r,
                className: "friends-carousel-tile-labels"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-label"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-name"
            }, Y().createElement("span", {
                className: "friends-carousel-display-name"
            }, n), o && Y().createElement("div", {
                className: "friend-tile-verified-badge"
            }, Y().createElement("div", {
                className: "friend-tile-spacer"
            }), Y().createElement(Or.VerifiedBadgeIconContainer, {
                size: Or.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), Y().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != a && Y().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, a))))
        }
        (tt = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , a = e.itemsPerRow
              , o = e.startingRow
              , i = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , u = Sr()
              , s = pn()
              , e = Ir()
              , c = e.contentMetadata
              , d = e.appendContentMetadata
              , f = (0,
            K.useCallback)(function() {
                var e = i.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == c ? void 0 : c[t]) && void 0 !== t && t[e])
                });
                0 < e.length && me(e.slice(0, Wr), s).then(function(e) {
                    return d(e.contentMetadata)
                }).catch(function() {})
            }, [i, s, c, d]);
            (0,
            K.useEffect)(function() {
                f()
            }, [f]);
            e = (0,
            K.useMemo)(function() {
                return _n(i, c)
            }, [i, c]);
            return 0 === (null == e ? void 0 : e.length) ? null : Y().createElement(Vr, {
                key: n.topic,
                sort: n,
                gameData: e,
                translate: t,
                positionId: r,
                itemsPerRow: a,
                startingRow: o,
                friendsPresence: u,
                componentType: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.componentType,
                playerCountStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playerCountStyle,
                playButtonStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playButtonStyle,
                hoverStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.hoverStyle,
                isSponsoredFooterAllowed: "true" === (null === (n = n.topicLayoutData) || void 0 === n ? void 0 : n.isSponsoredFooterAllowed),
                isExpandHomeContentEnabled: l
            })
        }
        ).defaultProps = {
            isExpandHomeContentEnabled: void 0
        };
        var Yr = tt
          , Zr = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , Jr = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , Xr = function(e, t) {
            for (var n = 0, r = t.length, a = e.length; n < r; n++,
            a++)
                e[a] = t[n];
            return e
        }
          , Qr = function(n) {
            return Zr(void 0, void 0, Promise, function() {
                var t;
                return Jr(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, L.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ea = function(m, v) {
            return Zr(void 0, void 0, Promise, function() {
                var t, i, l, u, s, c, d, f, p;
                return Jr(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (o = m,
                        Zr(void 0, void 0, Promise, function() {
                            var t;
                            return Jr(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: P.EnvironmentUrls.friendsApi + "/v1/users/" + o + "/friends/online",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, L.httpService.get(t)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))] : [3, 2];
                    case 1:
                        return i = e.sent().data,
                        [3, 3];
                    case 2:
                        i = [],
                        e.label = 3;
                    case 3:
                        return (t = i).sort(function(e, t) {
                            var n = {
                                InGame: 0,
                                Online: 1,
                                InStudio: 2
                            }
                              , e = e.userPresence.UserPresenceType
                              , t = t.userPresence.UserPresenceType;
                            return !(e in n && t in n) || n[e] < n[t] ? -1 : 1
                        }),
                        [4, (n = m,
                        a = v,
                        Zr(void 0, void 0, Promise, function() {
                            var t;
                            return Jr(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
                                    t = {
                                        url: a ? t + "?userSort=1" : t,
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, L.httpService.get(t)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))];
                    case 4:
                        for (f = e.sent().PageItems,
                        l = new Map,
                        u = 0,
                        s = t; u < s.length; u++)
                            c = s[u],
                            l.set(c.id, c.userPresence);
                        return d = t.map(function(e) {
                            return e.id
                        }),
                        f = f.filter(function(e) {
                            return !d.includes(e.id)
                        }).map(function(e) {
                            return e.id
                        }),
                        f = Xr(Xr([], d), f),
                        [4, (r = f,
                        Zr(void 0, void 0, Promise, function() {
                            var t, n;
                            return Jr(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: P.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    n = {
                                        userIds: r,
                                        fields: ["names.combinedName", "isVerified"]
                                    },
                                    [4, L.httpService.post(t, n)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))];
                    case 5:
                        return f = e.sent().profileDetails,
                        p = [],
                        f.forEach(function(e) {
                            var t, n, r, a, o = l.has(e.userId), i = {
                                isOnline: o,
                                isInGame: o && "InGame" === (null === (t = l.get(e.userId)) || void 0 === t ? void 0 : t.UserPresenceType),
                                lastLocation: !o || null === (n = l.get(e.userId)) || void 0 === n ? void 0 : n.lastLocation,
                                gameId: !o || null === (r = l.get(e.userId)) || void 0 === r ? void 0 : r.gameInstanceId,
                                universeId: !o || null === (a = l.get(e.userId)) || void 0 === a ? void 0 : a.universeId,
                                placeId: !o || null === (i = l.get(e.userId)) || void 0 === i ? void 0 : i.placeId
                            };
                            p.push({
                                id: e.userId,
                                combinedName: e.names.combinedName,
                                presence: i,
                                hasVerifiedBadge: e.isVerified
                            })
                        }),
                        [2, p]
                    }
                    var r, n, a, o
                })
            })
        }
          , ta = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , na = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , ra = P.EnvironmentUrls.chatApi
          , aa = function() {
            return ta(void 0, void 0, Promise, function() {
                var t;
                return na(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, L.httpService.get({
                            url: ra + "/v1/metadata",
                            withCredentials: !0
                        })];
                    case 1:
                        return [2, {
                            chatEnabled: null == (t = e.sent().data) ? void 0 : t.isChatUserMessagesEnabled
                        }]
                    }
                })
            })
        }
          , he = {
            common: [],
            feature: "Feature.PeopleList"
        }
          , tt = RobloxPresence
          , oa = xo.n(tt);
        function ia(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function la(r) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2 ? ia(Object(a), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = a[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : ia(Object(a)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
                })
            }
            return r
        }
        function ua() {
            return void 0 !== P.EventStream
        }
        function sa(e, t, n, r) {
            ua() && P.EventStream.SendEventWithTarget && (r = Object.values(ma).includes(r) ? r : ma.WWW,
            P.EventStream.SendEventWithTarget(e, t, n, r))
        }
        function ca(e) {
            var n = e.friend
              , t = e.displayName
              , r = e.userProfileUrl
              , a = e.userPresence
              , o = e.isInGame
              , i = e.gameUrl
              , l = e.universeId
              , u = e.canChat
              , e = e.translate;
            return Y().createElement("div", {
                className: "friend-tile-dropdown"
            }, o && null != a && Y().createElement("div", {
                className: "in-game-friend-card"
            }, Y().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(i)
                }
            }, Y().createElement(Ye.Thumbnail2d, {
                type: Ye.ThumbnailTypes.gameIcon,
                size: Ye.ThumbnailGameIconSize.size150,
                targetId: l,
                imgClassName: "game-card-thumb",
                containerClass: "friend-tile-game-card"
            })), Y().createElement("div", {
                className: "friend-presence-info"
            }, Y().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(i)
                }
            }, a), Y().createElement(ye.Button, {
                variant: ye.Button.variants.growth,
                size: ye.Button.sizes.small,
                width: ye.Button.widths.full,
                onClick: function() {
                    return ga(void 0, void 0, void 0, function() {
                        var t;
                        return ya(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return (t = n.presence.gameId || "",
                                (0,
                                P.DeviceMeta)().isInApp) ? ((0,
                                P.DeviceMeta)().isDesktop ? P.GameLauncher.followPlayerIntoGame(n.id, t, "JoinUser") : window.location.href = "/games/start?userID=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 1];
                            case 1:
                                return (0,
                                P.DeviceMeta)().isAndroidDevice || (0,
                                P.DeviceMeta)().isChromeOs ? (window.location.href = "intent://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser#Intent;scheme=robloxmobile;package=com.roblox.client;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.roblox.client;end",
                                [3, 5]) : [3, 2];
                            case 2:
                                return (0,
                                P.DeviceMeta)().isIosDevice ? (window.location.href = "robloxmobile://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 3];
                            case 3:
                                return [4, P.ProtocolHandlerClientInterface.followPlayerIntoGame({
                                    userId: n.id,
                                    joinAttemptId: t,
                                    joinAttemptOrigin: "JoinUser"
                                })];
                            case 4:
                                e.sent(),
                                e.label = 5;
                            case 5:
                                return [2]
                            }
                        })
                    })
                }
            }, e("Action.Join")))), Y().createElement("ul", null, u && Y().createElement("li", null, Y().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    ha({
                        userId: n.id
                    })
                }
            }, Y().createElement("span", {
                className: "icon icon-chat-gray"
            }), " ", e("Label.Chat", {
                username: t
            }))), Y().createElement("li", null, Y().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    window.open(r)
                }
            }, Y().createElement("span", {
                className: "icon icon-viewdetails"
            }), " ", e("Label.ViewProfile")))))
        }
        function da(e) {
            function t() {
                l(!0)
            }
            function n(e) {
                var t;
                null == e || null !== (t = u.current) && void 0 !== t && t.contains(e.relatedTarget) || null !== (t = s.current) && void 0 !== t && t.contains(e.relatedTarget) || l(!1)
            }
            var r = e.trigger
              , a = e.content
              , o = e.dropdownWidth
              , i = (0,
            K.useState)(!1)
              , e = i[0]
              , l = i[1]
              , u = (0,
            K.useRef)(null)
              , s = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                console.log("DOM element referenced by triggerRef:", u.current, u.current.offsetLeft);
                
                return u.current ? (u.current.addEventListener("mouseover", t),
                u.current.addEventListener("mouseout", n),
                function() {
                    var e;
                    null !== (e = u.current) && void 0 !== e && e.removeEventListener("mouseover", t),
                    null !== (e = u.current) && void 0 !== e && e.removeEventListener("mouseout", n)
                }
                ) : function() {}
            }, []),
            Y().createElement("div", null, Y().createElement("div", {
                ref: u
            }, r), e && Y().createElement("div", {
                ref: s,
                style: {
                    position: "absolute",
                    top: ((null === (e = u.current) || void 0 === e ? void 0 : e.offsetHeight) || 0) + ((null === (e = u.current) || void 0 === e ? void 0 : e.offsetTop) || 0),
                    left: ((null === (e = u.current) || void 0 === e ? void 0 : e.offsetLeft) || 0) + ((null === (e = u.current) || void 0 === e ? void 0 : e.offsetWidth) || 0) / 2 - o / 2,
                    zIndex: 1002,
                    width: o
                },
                onMouseOver: t,
                onMouseOut: n,
                onFocus: t,
                onBlur: n
            }, a))
        }
        function fa(e) {
            var t = e.friend
              , n = e.isOwnUser
              , r = e.translate
              , a = e.canChat
              , o = P.EnvironmentUrls.websiteUrl + "/users/" + t.id + "/profile"
              , i = t.combinedName
              , l = oa().usePresence(t.id, void 0)
              , u = null != l && null != l.gameId
              , s = u ? l.lastLocation : null
              , e = null != s && 15 < s.length ? s.slice(0, 15) + "..." : s
              , c = u ? P.EnvironmentUrls.websiteUrl + "/games/" + (null !== (c = l.placeId) && void 0 !== c ? c : "") : "";
            return Y().createElement("div", {
                className: "friends-carousel-tile"
            }, Y().createElement(da, {
                trigger: Y().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, Y().createElement(Kr, {
                    id: t.id,
                    displayName: i,
                    userProfileUrl: o,
                    userPresence: e,
                    translate: r,
                    hasVerifiedBadge: t.hasVerifiedBadge
                })),
                content: n ? Y().createElement(ca, {
                    friend: t,
                    isInGame: u,
                    universeId: null !== (l = l.universeId) && void 0 !== l ? l : 0,
                    displayName: i,
                    userProfileUrl: o,
                    userPresence: s,
                    translate: r,
                    gameUrl: c,
                    canChat: a
                }) : Y().createElement("div", null),
                dropdownWidth: null == e ? 240 : 315
            }))
        }
        function pa(e) {
            var n = e.friendsList
              , t = e.isOwnUser
              , r = e.translate
              , a = e.canChat
              , o = (0,
            K.useRef)(null)
              , i = (u = (0,
            K.useState)(n))[0]
              , l = u[1]
              , u = (e = (0,
            K.useState)(!1))[0]
              , s = e[1];
            return (0,
            K.useEffect)(function() {
                var e, t = null === (e = o.current) || void 0 === e ? void 0 : e.offsetWidth;
                s(110 * (null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0) > (null != t ? t : 0)),
                null != t && null != n && (t = 25,
                l(n.slice(0, t)))
            }, [null === (e = o.current) || void 0 === e ? void 0 : e.offsetWidth, n]),
            Y().createElement("div", null, Y().createElement("div", {
                ref: function(e) {
                    return o.current = e,
                    o.current
                },
                className: "friends-carousel-container"
            }, null == i ? Y().createElement("span", {
                className: "spinner spinner-default"
            }) : Y().createElement("div", {
                className: u ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, i.map(function(e) {
                return Y().createElement("div", {
                    key: e.id
                }, Y().createElement(fa, {
                    friend: e,
                    translate: r,
                    isOwnUser: t,
                    canChat: a
                }))
            }))))
        }
        var ma = la(la({}, {
            DEFAULT: 0,
            WWW: 1,
            STUDIO: 2,
            DIAGNOSTIC: 3
        }), ua() ? P.EventStream.TargetTypes : {})
          , va = sa
          , ha = function(e) {
            var t, n, r, a = e.userId;
            a ? ((r = P.DeviceMeta && new P.DeviceMeta) && r.isAndroidApp ? ((t = {
                userIds: []
            }).userIds.push(a),
            null !== (e = P.Hybrid.Chat) && void 0 !== e && e.startChatConversation(t)) : r && r.isIosApp ? null !== (t = P.Hybrid.Navigation) && void 0 !== t && t.startWebChatConversation(a) : r && r.isUWPApp ? null !== (n = P.Hybrid.Navigation) && void 0 !== n && n.startWebChatConversation(a) : r && r.isWin32App ? null !== (n = P.Hybrid.Navigation) && void 0 !== n && n.startWebChatConversation(a) : r && r.isUniversalApp ? null !== (r = P.Hybrid.Navigation) && void 0 !== r && r.startWebChatConversation(a) : $(document).triggerHandler("Roblox.Chat.StartChat", {
                userId: a
            }),
            va("startChatByUser", "click", {
                userId: a
            })) : console.log("missing valid params to start web chat")
        }
          , ga = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , ya = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , ba = function(e, i, l, u) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , Ea = function(n, r) {
            var a, o, i, l = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = l.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < i[1]) {
                                        l.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && l.label < i[2]) {
                                        l.label = i[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    i[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function wa() {
            var e = document.querySelector('meta[name="user-data"]')
              , t = e ? e.getAttribute("data-userid") : Number(null !== (t = P.CurrentUser.userId) && void 0 !== t ? t : "0");
            return Y().createElement("div", {
                className: "friend-carousel-container"
            }, Y().createElement(_a, {
                profileUserId: t,
                isOwnUser: !0
            }))
        }
        function Sa() {
            return Y().createElement(wa, null)
        }
        function Ia(e) {
            var t = e.option
              , n = e.isSelected
              , r = e.setSelectedOptionId
              , e = e.translate;
            return Y().createElement("button", {
                type: "button",
                onClick: function() {
                    return r(t.optionId)
                },
                className: ge()("filter-option", {
                    "selected-option": n
                }),
                "aria-label": e(n ? ot.ActionDropdownSelected : ot.ActionDropdownNotSelected, {
                    optionName: t.optionDisplayName
                })
            }, Y().createElement("span", {
                className: "filter-option-name"
            }, t.optionDisplayName), n ? Y().createElement("span", {
                className: "icon-radio-check-circle-filled"
            }) : Y().createElement("span", {
                className: "icon-radio-check-circle"
            }))
        }
        function Pa(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , a = e.setSelectedOptionId
              , o = e.setIsDropdownOpen
              , i = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , u = e.translate
              , e = (0,
            K.useCallback)(function() {
                i(r),
                o(!1),
                l(t.filterId, y.Apply, r, t.selectedOptionId)
            }, [r, i, o, t.filterId, t.selectedOptionId, l])
              , s = (0,
            K.useCallback)(function() {
                var e = r;
                o(!1),
                a(t.selectedOptionId),
                l(t.filterId, y.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, o, l, t.filterId, a, r])
              , c = (0,
            K.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && s()
            }, [s, n])
              , d = (0,
            K.useCallback)(function(e) {
                e.key === Ta.keyBoardEventCode.escape && s()
            }, [s]);
            return (0,
            K.useEffect)(function() {
                return document.addEventListener("mousedown", c),
                document.addEventListener("keydown", d),
                function() {
                    document.removeEventListener("mousedown", c),
                    document.removeEventListener("keydown", d)
                }
            }, [c, d]),
            Y().createElement("div", {
                className: "filters-modal-container"
            }, Y().createElement("div", {
                className: "header-container"
            }, Y().createElement("h3", null, t.filterDisplayName), Y().createElement("div", null, Y().createElement("button", {
                type: "button",
                className: "header-close-button",
                onClick: function() {
                    return s()
                },
                "aria-label": u(ot.ActionClose)
            }, Y().createElement("span", {
                className: "icon-close"
            })))), Y().createElement("div", {
                className: "filter-options-container"
            }, t.filterOptions.map(function(e, t) {
                return Y().createElement(Y().Fragment, {
                    key: e.optionId
                }, Y().createElement(Ia, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: a,
                    translate: u
                }), 0 === t && Y().createElement("div", {
                    className: "filter-option-divider"
                }))
            })), Y().createElement("div", {
                className: "action-buttons-container"
            }, Y().createElement(ye.Button, {
                onClick: e,
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                width: ye.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, u(rt.ActionApply) || "Apply")))
        }
        function Ca(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , a = e.sendFilterClickEvent
              , n = e.translate
              , o = Y().useRef(null)
              , i = (s = (0,
            K.useState)(!1))[0]
              , l = s[1]
              , u = (e = (0,
            K.useState)(r.selectedOptionId))[0]
              , s = e[1]
              , e = (0,
            K.useMemo)(function() {
                var e = r.filterOptions.find(function(e) {
                    return e.optionId === r.selectedOptionId
                });
                return null == e ? void 0 : e.optionDisplayName
            }, [r.selectedOptionId, r.filterOptions]);
            return Y().createElement("div", {
                ref: o
            }, Y().createElement(ye.Button, {
                onClick: function() {
                    l(function(e) {
                        var t = e ? y.CloseDropdown : y.OpenDropdown
                          , n = e ? u : void 0;
                        return a(r.filterId, t, r.selectedOptionId, n),
                        !e
                    })
                },
                variant: i ? ye.Button.variants.primary : ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                className: "filter-select"
            }, Y().createElement("span", {
                className: "filter-display-text"
            }, e), Y().createElement("span", {
                className: i ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), i && Y().createElement(Pa, {
                filter: r,
                dropdownContainerRef: o,
                selectedOptionId: u,
                setSelectedOptionId: s,
                setIsDropdownOpen: l,
                updateFilterValue: t,
                sendFilterClickEvent: a,
                translate: n
            }))
        }
        (tt = function(e) {
            var t = e.translate
              , u = e.profileUserId
              , s = e.isOwnUser
              , n = (0,
            K.useState)(null)
              , r = n[0]
              , c = n[1]
              , a = (0,
            K.useState)(null)
              , e = a[0]
              , d = a[1]
              , n = (0,
            K.useState)(!1)
              , a = n[0]
              , f = n[1];
            return (0,
            K.useEffect)(function() {
                ba(void 0, void 0, void 0, function() {
                    var n, r, a, o, i, l;
                    return Ea(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return i = [Qr(u), ea(u, s), aa()],
                            [4, (t = i,
                            Promise.all(t.map(function(e) {
                                return e.then(function(e) {
                                    return {
                                        status: "fulfilled",
                                        value: e
                                    }
                                })
                            })))];
                        case 1:
                            return l = e.sent(),
                            n = l[0],
                            r = l[1],
                            a = l[2],
                            o = n.value,
                            i = r.value,
                            l = a.value,
                            c("fulfilled" === n.status ? o.count : 0),
                            d("fulfilled" === r.status ? i : []),
                            f("fulfilled" === a.status && l.chatEnabled),
                            [2]
                        }
                        var t
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [u]),
            0 === r ? Y().createElement("div", {
                className: "friends-carousel-0-friends"
            }) : Y().createElement("div", {
                className: "react-friends-carousel-container"
            }, Y().createElement(qr, {
                friendsCount: r,
                translate: t,
                profileUserId: u,
                isOwnUser: s
            }), Y().createElement(pa, {
                friendsList: e,
                translate: t,
                isOwnUser: s,
                canChat: a
            }))
        }
        ).defaultProps = {
            translate: void 0
        };
        var _a = (0,
        p.withTranslations)(tt, he)
          , Ta = nt
          , xa = function() {
            return (xa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , Na = function(o, i, e) {
            var l = pn()
              , t = (0,
            K.useRef)(null)
              , n = (0,
            K.useCallback)(function() {
                var e = {};
                return e[k.AbsPositions] = o.filters.map(function(e, t) {
                    return t
                }),
                e[k.FilterIds] = o.filters.map(function(e) {
                    return e.filterId
                }),
                e[k.SelectedOptionIds] = o.filters.map(function(e) {
                    return e.selectedOptionId
                }),
                e[k.GameSetTypeId] = o.topicId,
                e[k.GameSetTargetId] = o.gameSetTargetId,
                e[k.SortPos] = i,
                e[U.DiscoverPageSessionInfo] = l,
                e[k.Page] = Z.GamesPage,
                e
            }, [o.filters, o.topicId, o.gameSetTargetId, i, l]);
            (0,
            K.useEffect)(function() {
                return null != e && e.current && (t.current = S.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: Xe.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = ee.filterImpressions(e)) && S.eventStreamService.sendEvent.apply(S.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var a = (0,
            K.useCallback)(function(e, t, n, r) {
                var a;
                return xa(((a = {})[k.ButtonName] = t,
                a[k.GameSetTypeId] = o.topicId,
                a[k.GameSetTargetId] = o.gameSetTargetId,
                a[k.SortPos] = i,
                a[U.DiscoverPageSessionInfo] = l,
                a[k.Page] = Z.GamesPage,
                a[k.FilterId] = e,
                a[k.SelectedOptionId] = n,
                a), r && ((a = {})[k.PreviousOptionId] = r,
                a))
            }, [o.topicId, o.gameSetTargetId, i, l]);
            return (0,
            K.useCallback)(function(e, t, n, r) {
                r = a(e, t, n, r),
                r = ee.gamesFilterClick(r);
                r && S.eventStreamService.sendEvent.apply(S.eventStreamService, r)
            }, [a])
        };
        (he = function(e) {
            var a = e.sort
              , t = e.positionId
              , n = e.translate
              , o = e.fetchGamesPageData
              , e = (0,
            K.useRef)(null)
              , i = Na(a, t, e);
            return Y().createElement("div", {
                ref: e,
                className: "filters-container"
            }, Y().createElement("div", {
                className: "filters-header-container"
            }, Y().createElement("span", {
                className: "filters-header"
            }, a.topic)), Y().createElement("div", {
                className: "filter-items-container"
            }, a.filters.map(function(r) {
                return Y().createElement(Ca, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = kn([a]),
                        void (o && e && (e.set(t, n),
                        o(e)));
                        var t, n
                    },
                    sendFilterClickEvent: i,
                    translate: n
                })
            })))
        }
        ).defaultProps = {
            fetchGamesPageData: void 0
        };
        var Aa = he;
        function La() {
            return Y().createElement("div", {
                className: "grid-item-container game-card-container game-card-loading"
            }, Y().createElement("div", {
                className: "game-card-thumb-container shimmer"
            }), Y().createElement("div", {
                className: "game-card-name game-name-title shimmer"
            }), Y().createElement("div", {
                className: "game-card-name game-name-title game-name-title-half shimmer"
            }))
        }
        function Oa(a) {
            var o = pn();
            (0,
            K.useEffect)(function() {
                var t = window.scrollY
                  , e = Ee(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    Pn({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: h.Vertical,
                        startingPosition: t,
                        currentPage: a,
                        pageSession: o
                    }),
                    t = window.scrollY)
                }, 250)
                  , n = e[0]
                  , r = e[1];
                return window.addEventListener("scroll", n),
                function() {
                    window.removeEventListener("scroll", n),
                    r()
                }
            }, [a, o])
        }
        (nt = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , a = e.currentPage
              , o = e.itemsPerRow
              , i = e.startingRow
              , l = e.gridRecommendations
              , u = e.loadMoreGames
              , s = e.isLoadingMoreGames
              , c = e.isExpandHomeContentEnabled
              , d = e.isChartsPageRenameEnabled
              , f = e.isCarouselHorizontalScrollEnabled
              , p = e.isNewScrollArrowsEnabled
              , m = e.fetchGamesPageData;
            switch (n.treatmentType) {
            case w.Carousel:
                return Y().createElement(Nr, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    page: a,
                    itemsPerRow: o,
                    startingRow: i,
                    loadMoreGames: u,
                    isLoadingMoreGames: s,
                    isExpandHomeContentEnabled: c,
                    isChartsPageRenameEnabled: d,
                    isCarouselHorizontalScrollEnabled: f,
                    isNewScrollArrowsEnabled: p
                });
            case w.AvatarCarousel:
                return Y().createElement(Tr, {
                    sort: n
                });
            case w.SortlessGrid:
                return Y().createElement(Yr, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: o,
                    startingRow: i,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c
                });
            case w.FriendCarousel:
                return Y().createElement(Sa, null);
            case w.Pills:
                return Y().createElement(Aa, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: m
                });
            default:
                return null
            }
        }
        ).defaultProps = {
            loadMoreGames: void 0,
            isLoadingMoreGames: void 0,
            gridRecommendations: [],
            isExpandHomeContentEnabled: void 0,
            isChartsPageRenameEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            fetchGamesPageData: void 0,
            isNewScrollArrowsEnabled: void 0
        };
        var ka = nt
          , Da = xo(6635)
          , Ra = function(e, a, r) {
            var t = (0,
            K.useState)(new Map)
              , o = t[0]
              , n = t[1]
              , t = (0,
            K.useState)(new Map)
              , u = t[0]
              , i = t[1]
              , l = (0,
            p.usePrevious)(u)
              , s = (0,
            p.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            K.useEffect)(function() {
                void 0 !== l && (0,
                Da.isEqual)(u, l) && (0,
                Da.isEqual)(null == e ? void 0 : e.sorts, s) || function() {
                    var o = new Map
                      , i = new Map;
                    null != e && e.sorts.forEach(function(e) {
                        var t;
                        e.treatmentType === w.SortlessGrid && ((t = null !== (t = o.get(e.topicId)) && void 0 !== t ? t : []).push.apply(t, e.recommendationList),
                        o.set(e.topicId, t))
                    });
                    var l = new Map;
                    null != e && e.sorts.forEach(function(e, t) {
                        var n, r, a;
                        e.treatmentType === w.SortlessGrid && (n = null !== (r = o.get(e.topicId)) && void 0 !== r ? r : [],
                        r = null !== (a = i.get(e.topicId)) && void 0 !== a ? a : 0,
                        void 0 !== e.numberOfRows && 0 <= e.numberOfRows ? (a = (null !== (a = u.get(t)) && void 0 !== a ? a : 0) * e.numberOfRows,
                        l.set(t, n.slice(r, r + a)),
                        i.set(e.topicId, r + a)) : (l.set(t, n.slice(r)),
                        i.set(e.topicId, n.length)))
                    }),
                    n(l)
                }()
            }, [null == e ? void 0 : e.sorts, s, u, l]);
            var t = (0,
            K.useMemo)(function() {
                var n = new Map
                  , r = 0;
                return null != e && e.sorts.forEach(function(e, t) {
                    r && n.set(t, r);
                    t = function(e, t) {
                        if (void 0 === e.numberOfRows)
                            return (0,
                            I.fireEvent)(Ze.missingNumberOfRowsForLoggingErrorEvent),
                            1;
                        if (0 === e.numberOfRows || 1 === e.numberOfRows)
                            return e.numberOfRows;
                        e = o.get(t),
                        t = u.get(t);
                        return e && t ? Math.ceil(e.length / t) : null
                    }(e, t);
                    void 0 !== r && null !== t ? r += t : r = void 0
                }),
                n
            }, [o, u, null == e ? void 0 : e.sorts])
              , c = (0,
            K.useRef)(null)
              , d = (0,
            K.useCallback)(function(e, t) {
                if (a || e.treatmentType === w.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, a, o) {
                        var i = n ? (r ? _t : Ct)[n] : Tt;
                        if (!e)
                            return i.minTilesPerRow;
                        var l = i.minTileWidth
                          , u = i.columnGap
                          , n = i.minTilesPerRow
                          , i = i.maxTilesPerRow
                          , u = Math.floor((e - t + u) / (l + u))
                          , u = Math.min(i, Math.max(n, u));
                        return r && a === w.Carousel && void 0 !== o && u < o ? u + .3 : u
                    }(t, 1, n, r || n === q.EventTile, null == e ? void 0 : e.treatmentType, null === (n = null == e ? void 0 : e.recommendationList) || void 0 === n ? void 0 : n.length)
                }
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === q.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === q.EventTile ? t && t < Ze.wideGameTileTilesPerRowBreakpointWidth ? Ze.minWideGameTilesPerCarouselPage : Ze.maxWideGameTilesPerCarouselPage : t && t < Ze.homeFeedMaxWidth ? Math.max(1, Math.floor(t / Ze.gameTileWidth)) : Ze.maxTilesPerCarouselPage
            }, [a, r])
              , f = (0,
            K.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === w.SortlessGrid || e.treatmentType === w.InterestGrid || a && e.treatmentType === w.Carousel) && r.set(t, d(e, n))
                }),
                i(r)
            }, [null == e ? void 0 : e.sorts, d, a]);
            return (0,
            K.useLayoutEffect)(function() {
                function e() {
                    var e = null === (e = null == c ? void 0 : c.current) || void 0 === e ? void 0 : e.getBoundingClientRect().width;
                    e && (document.documentElement.style.setProperty("--home-feed-width", e + "px"),
                    f(e))
                }
                return e(),
                window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, [f]),
            {
                homeFeedRef: c,
                gridRecommendationsMap: o,
                itemsPerRowMap: u,
                startingRowNumbersMap: t
            }
        }
          , Ma = function() {
            try {
                return {
                    cpuCores: null === navigator || void 0 === navigator ? void 0 : navigator.hardwareConcurrency,
                    maxResolution: function() {
                        var e, t;
                        if (null !== (e = null === window || void 0 === window ? void 0 : window.screen) && void 0 !== e && e.width && null !== (t = null === window || void 0 === window ? void 0 : window.screen) && void 0 !== t && t.height)
                            return window.screen.width + "x" + window.screen.height
                    }(),
                    maxMemory: function() {
                        if ("deviceMemory"in navigator && "number" == typeof navigator.deviceMemory)
                            return 1024 * navigator.deviceMemory
                    }(),
                    networkType: function() {
                        var e;
                        if ("connection"in navigator && null !== (e = navigator.connection) && void 0 !== e && e.effectiveType)
                            return navigator.connection.effectiveType
                    }()
                }
            } catch (e) {
                return {}
            }
        }
          , he = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , Ua = (P.EnvironmentUrls.apiGatewayUrl,
        P.EnvironmentUrls.voiceApi);
        function Ga(e, t, n, r, a, o, i) {
            try {
                var l = e[o](i)
                  , u = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(u) : Promise.resolve(u).then(r, a)
        }
        var Ba = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, a;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(Ua, "/v1/settings/user-opt-in")
                            },
                            a = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            L.httpService.post(r, a);
                        case 4:
                            return a = e.sent,
                            a = a.data,
                            e.abrupt("return", a);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }, e)
            }),
            function() {
                var e = this
                  , i = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, i);
                    function a(e) {
                        Ga(r, t, n, a, o, "next", e)
                    }
                    function o(e) {
                        Ga(r, t, n, a, o, "throw", e)
                    }
                    a(void 0)
                }
                )
            }
            );
            return function() {
                return e.apply(this, arguments)
            }
        }();
        function ja(e, t, n, r, a, o, i) {
            try {
                var l = e[o](i)
                  , u = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(u) : Promise.resolve(u).then(r, a)
        }
        function Fa(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Ha(r) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Fa(Object(a), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = a[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : Fa(Object(a)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
                })
            }
            return r
        }
        function za(e, n) {
            switch (e) {
            case "ContactMethodEmail":
                return {
                    primaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    }
                };
            case "ContactMethodPhoneNumber":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberVoiceOptIn":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: function(e) {
                            return null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell(Ha({
                                addPhoneAlwaysShowLegalText: !0,
                                addPhoneRequireLegalTextCheckbox: n,
                                addPhoneHeadingKey: "Action.AddPhoneVoice",
                                addPhoneDescriptionKey: "Description.AddPhoneBodyVoice",
                                addPhoneButtonKey: "Action.EnableVoice",
                                addPhoneLegalTextKey: n ? "Description.VoiceLegalConsent" : "Description.VoiceLegalDisclaimer",
                                beforeSuccess: (l = regeneratorRuntime.mark(function e() {
                                    var t, n;
                                    return regeneratorRuntime.wrap(function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.prev = 0,
                                                e.next = 3,
                                                Ba(!0, !1);
                                            case 3:
                                                if (e.t1 = t = e.sent,
                                                e.t0 = null === e.t1,
                                                e.t0) {
                                                    e.next = 7;
                                                    break
                                                }
                                                e.t0 = void 0 === t;
                                            case 7:
                                                if (!e.t0) {
                                                    e.next = 11;
                                                    break
                                                }
                                                e.t2 = void 0,
                                                e.next = 12;
                                                break;
                                            case 11:
                                                e.t2 = t.isUserOptIn;
                                            case 12:
                                                return n = e.t2,
                                                e.abrupt("return", n ? ["Heading.VoiceChatEnabled", "Description.CanNowJoinVoice"] : ["Heading.PhoneIsVerified", "Description.TurnOnVoiceChat"]);
                                            case 16:
                                                return e.prev = 16,
                                                e.t3 = e.catch(0),
                                                e.abrupt("return", ["Heading.PhoneIsVerified", "Description.TurnOnVoiceChat"]);
                                            case 19:
                                            case "end":
                                                return e.stop()
                                            }
                                    }, e, null, [[0, 16]])
                                }),
                                t = function() {
                                    var e = this
                                      , i = arguments;
                                    return new Promise(function(t, n) {
                                        var r = l.apply(e, i);
                                        function a(e) {
                                            ja(r, t, n, a, o, "next", e)
                                        }
                                        function o(e) {
                                            ja(r, t, n, a, o, "throw", e)
                                        }
                                        a(void 0)
                                    }
                                    )
                                }
                                ,
                                function() {
                                    return t.apply(this, arguments)
                                }
                                )
                            }, e));
                            var l, t
                        },
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberEmailHorizontalLayout":
            case "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1":
                return {
                    primaryButton: {
                        text: "Action.AddPhoneShort",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: Za
                };
            case "ContactMethodPhoneNumberEmailVerticalLayout":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmailAddress",
                        onClick: null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: Ya
                };
            case "FacebookSunset":
                return {
                    primaryButton: {
                        text: "Action.SetPassword",
                        onClick: null === P.FacebookSunsetService || void 0 === P.FacebookSunsetService ? void 0 : P.FacebookSunsetService.openFacebookSunsetModal,
                        buttonClickBtnLog: "setPassword"
                    }
                };
            default:
                return null
            }
        }
        var Va = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , Wa = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , qa = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , $a = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , Ka = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , Ya = "vertical"
          , Za = "horizontal"
          , Ja = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function Xa(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Qa(r) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Xa(Object(a), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = a[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : Xa(Object(a)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
                })
            }
            return r
        }
        function eo(e, t, n, r, a) {
            a = 4 < arguments.length && void 0 !== a ? a : void 0,
            S.eventStreamService.sendEventWithTarget(e.type, $a[n], Qa(Qa({}, e.params), {}, {
                origin: t,
                section: r,
                btn: a
            }))
        }
        var nt = S.eventStreamService.eventTypes
          , to = "mandatory"
          , no = "homepage"
          , ro = {
            cardShown: {
                name: "cardShown",
                type: nt.modalAction,
                params: {
                    aType: "shown"
                }
            },
            buttonClick: {
                name: "buttonClick",
                type: "buttonClick",
                params: {}
            }
        };
        function ao(e, t) {
            return function(e) {
                if (Array.isArray(e))
                    return e
            }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                    return;
                var n = []
                  , r = !0
                  , a = !1
                  , o = void 0;
                try {
                    for (var i, l = e[Symbol.iterator](); !(r = (i = l.next()).done) && (n.push(i.value),
                    !t || n.length !== t); r = !0)
                        ;
                } catch (e) {
                    a = !0,
                    o = e
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (a)
                            throw o
                    }
                }
                return n
            }(e, t) || function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return oo(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return oo(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function oo(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function io(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , a = e.titleTextOverride
              , o = e.bodyTextOverride
              , i = e.requireExplicitVoiceConsent
              , l = ao((0,
            K.useState)(!1), 2)
              , u = l[0]
              , s = l[1]
              , c = Ka[n];
            (0,
            K.useEffect)(function() {
                eo(ro.cardShown, r, n, c)
            }, []);
            var e = za(n, i)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? Y().createElement(ye.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    eo(ro.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        s(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , i = f ? Y().createElement(ye.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    eo(ro.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        s(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : Za
              , i = Y().createElement("div", {
                className: e === Za ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, i)
              , a = lo(a) ? t(Wa[n]) : a
              , o = lo(o) ? t(qa[n]) : o
              , a = Y().createElement("div", {
                className: "upsell-card-text-content-group"
            }, Wa[n] ? Y().createElement("div", {
                className: "font-header-1"
            }, " ", a) : null, Y().createElement("div", {
                className: "upsell-card-content"
            }, " ", o))
              , o = Ja[n] ? Y().createElement("div", {
                className: "home-page-upsell-card-image ".concat(Ja[n])
            }) : null;
            return u ? null : Y().createElement("div", {
                className: "home-page-upsell-card-banner-container"
            }, Y().createElement("div", {
                className: "banner-contents"
            }, Y().createElement("div", {
                className: "icon-and-text"
            }, o, Y().createElement("div", {
                className: "banner-content-container"
            }, a)), Y().createElement("div", {
                className: "add-email-btn-container"
            }, i), Y().createElement("div", {
                id: "facebookSunsetModal-container"
            })))
        }
        function lo(e) {
            return !e || 0 === e.length
        }
        io.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        io.propTypes = {
            translate: ae().func.isRequired,
            cardType: ae().string.isRequired,
            titleTextOverride: ae().string,
            bodyTextOverride: ae().string,
            origin: ae().string,
            requireExplicitVoiceConsent: ae().bool
        };
        var uo = io
          , so = function(e) {
            return !![Va.ContactMethodEmail, Va.ContactMethodPhoneNumber, Va.ContactMethodPhoneNumberEmailHorizontalLayout, Va.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, Va.ContactMethodPhoneNumberEmailVerticalLayout, Va.ContactMethodPhoneNumberVoiceOptIn, Va.FacebookSunset].includes(e)
        };
        function co(e, t, n, r, a, o, i) {
            try {
                var l = e[o](i)
                  , u = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(u) : Promise.resolve(u).then(r, a)
        }
        function fo(l) {
            return function() {
                var e = this
                  , i = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, i);
                    function a(e) {
                        co(r, t, n, a, o, "next", e)
                    }
                    function o(e) {
                        co(r, t, n, a, o, "throw", e)
                    }
                    a(void 0)
                }
                )
            }
        }
        function po(e, t) {
            return function(e) {
                if (Array.isArray(e))
                    return e
            }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                    return;
                var n = []
                  , r = !0
                  , a = !1
                  , o = void 0;
                try {
                    for (var i, l = e[Symbol.iterator](); !(r = (i = l.next()).done) && (n.push(i.value),
                    !t || n.length !== t); r = !0)
                        ;
                } catch (e) {
                    a = !0,
                    o = e
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (a)
                            throw o
                    }
                }
                return n
            }(e, t) || function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return mo(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return mo(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function mo(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function vo(e) {
            var t = e.translate
              , n = Va.ContactMethodMandatoryEmailPhone
              , r = po((0,
            K.useState)(null), 2)
              , a = r[0]
              , o = r[1]
              , i = po((0,
            K.useState)(""), 2)
              , l = i[0]
              , u = i[1]
              , e = po((0,
            K.useState)(""), 2)
              , r = e[0]
              , s = e[1]
              , i = po((0,
            K.useState)(!1), 2)
              , e = i[0]
              , c = i[1];
            return (0,
            K.useEffect)(function() {
                var e = function() {
                    var e = fo(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    P.HomePageUpsellCardService.getHomePageUpsellCardVariation();
                                case 3:
                                    t = e.sent,
                                    (null == t ? void 0 : t.upsellCardType) && (o(null == t ? void 0 : t.upsellCardType),
                                    u(null == t ? void 0 : t.localizedTitleTextOverride),
                                    s(null == t ? void 0 : t.localizedBodyTextOverride)),
                                    e.next = 12;
                                    break;
                                case 8:
                                    e.prev = 8,
                                    e.t0 = e.catch(0),
                                    console.error("Error getting the upsell card variation ".concat(e.t0)),
                                    o(null);
                                case 12:
                                case "end":
                                    return e.stop()
                                }
                        }, e, null, [[0, 8]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }()
                  , t = function() {
                    var e = fo(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    P.HomePageUpsellCardService.getVoicePolicy();
                                case 3:
                                    null != (null == (t = e.sent) ? void 0 : t.requireExplicitVoiceConsent) && c(null == t ? void 0 : t.requireExplicitVoiceConsent),
                                    e.next = 11;
                                    break;
                                case 7:
                                    e.prev = 7,
                                    e.t0 = e.catch(0),
                                    console.error("Error reading policy for homepage upsellcard ".concat(e.t0)),
                                    c(!0);
                                case 11:
                                case "end":
                                    return e.stop()
                                }
                        }, e, null, [[0, 7]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }();
                e(),
                t()
            }, []),
            (0,
            K.useEffect)(function() {
                a === n && null !== P.UpsellService && void 0 !== P.UpsellService && P.UpsellService.renderContactMethodPromptModal({
                    origin: no,
                    section: to
                })
            }, [a]),
            so(a) ? Y().createElement(uo, {
                translate: t,
                cardType: a,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        vo.propTypes = {
            translate: ae().func.isRequired
        };
        var ho = vo;
        function go(e) {
            var t = e.translate
              , e = e.context;
            return Y().createElement(ho, {
                translate: t,
                context: e
            })
        }
        function yo(e) {
            var t, a = e.sort, n = e.itemsPerRow, r = e.toggleInterest, o = e.interestedUniverses, i = e.homePageSessionInfo, l = e.translate, u = (0,
            K.useRef)(null), s = (0,
            K.useRef)(null), c = Ir().contentMetadata, d = (0,
            K.useMemo)(function() {
                return _n(a.recommendationList, c)
            }, [a.recommendationList, c]), f = (0,
            K.useCallback)(function(t) {
                var e = null == d ? void 0 : d.findIndex(function(e) {
                    return e.universeId === t
                });
                if (void 0 !== e && -1 !== e) {
                    var n, r = d[e];
                    return (n = {})[k.ButtonName] = g.Interested,
                    n[k.PlaceId] = r.placeId,
                    n[k.UniverseId] = t,
                    n[k.Position] = e,
                    n[k.GameSetTypeId] = a.topicId,
                    n[k.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[k.Page] = Z.InterestCatcher,
                    n[U.HomePageSessionInfo] = i,
                    n[k.IsInterested] = !o.has(t),
                    n
                }
            }, [o, d, i, a.topicId]), p = (0,
            K.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && S.eventStreamService.sendEvent.apply(S.eventStreamService, e)
            }, [r, f]), e = (0,
            K.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return So(So(So(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), z(d, a.topicId, t, null === (e = null == a ? void 0 : a.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), W(d, a.topicId, t, null === (e = null == a ? void 0 : a.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[k.AbsPositions] = t,
                    e[k.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[k.GameSetTypeId] = a.topicId,
                    e[k.Page] = Z.InterestCatcher,
                    e[U.HomePageSessionInfo] = i,
                    e))
                }
            }, [d, i, a.topicId, null === (t = null == a ? void 0 : a.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return vn(u, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            K.useLayoutEffect)(function() {
                n && null != u && u.current && u.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            Y().createElement(Hr, {
                ref: u,
                tileRef: s,
                gameData: d,
                emphasis: !1,
                translate: l,
                isHomeGameGrid: !0,
                isExpandHomeContentEnabled: !0,
                buildEventProperties: function() {
                    return {}
                },
                componentType: null === (l = null == a ? void 0 : a.topicLayoutData) || void 0 === l ? void 0 : l.componentType,
                playerCountStyle: null === (l = null == a ? void 0 : a.topicLayoutData) || void 0 === l ? void 0 : l.playerCountStyle,
                playButtonStyle: null === (l = null == a ? void 0 : a.topicLayoutData) || void 0 === l ? void 0 : l.playButtonStyle,
                topicId: null === (l = null == a ? void 0 : a.topicId) || void 0 === l ? void 0 : l.toString(),
                shouldUseSentinelTile: !1,
                interestedUniverses: o,
                toggleInterest: p
            })
        }
        function bo(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , a = e.translate
              , o = (f = (0,
            K.useState)(new Set))[0]
              , i = f[1]
              , l = pn()
              , u = (0,
            K.useCallback)(function(e) {
                var t = {};
                return t[k.ButtonName] = e,
                t[U.HomePageSessionInfo] = l,
                t[k.InterestedUniverseIds] = Array.from(o),
                t[k.Page] = Z.InterestCatcher,
                t
            }, [l, o])
              , s = (0,
            K.useCallback)(function(e) {
                e = u(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && S.eventStreamService.sendEvent.apply(S.eventStreamService, e)
            }, [u])
              , c = (0,
            K.useCallback)(function() {
                r([]),
                s(g.Skip)
            }, [r, s])
              , d = (0,
            K.useCallback)(function() {
                r(Array.from(o)),
                s(g.Continue)
            }, [o, r, s])
              , e = (0,
            K.useMemo)(function() {
                return null != o && o.size ? a(it.ActionInterestCatcherContinueSelected, {
                    numSelected: o.size
                }) : a(it.ActionInterestCatcherContinue)
            }, [o, a])
              , f = (0,
            K.useCallback)(function(e) {
                var t, n;
                null === e || void 0 === (null === (n = e.getBoundingClientRect()) || void 0 === n ? void 0 : n.top) || (n = document.getElementById("header")) && null !== (t = n.getBoundingClientRect()) && void 0 !== t && t.height && (n = n.getBoundingClientRect().height,
                window.scrollTo({
                    top: e.getBoundingClientRect().top + window.scrollY - n
                }))
            }, []);
            return Y().createElement("div", {
                ref: f,
                className: "interest-catcher-container",
                "data-testid": "interest-catcher-container"
            }, Y().createElement("div", {
                className: "header-container"
            }, Y().createElement("div", {
                className: "header-text-container"
            }, Y().createElement("h1", {
                className: "header-text"
            }, t.topic), Y().createElement("span", {
                className: "header-subtext"
            }, t.subtitle)), Y().createElement("div", {
                className: "header-buttons-container"
            }, !(null != o && o.size) && Y().createElement(ye.Button, {
                variant: ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                title: a(it.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, a(it.ActionInterestCatcherSkip)), Y().createElement(ye.Button, {
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != o && o.size),
                className: "continue-button"
            }, e))), Y().createElement(yo, {
                sort: t,
                itemsPerRow: n,
                translate: a,
                toggleInterest: function(t) {
                    i(function(e) {
                        e = new Set(e);
                        return e.has(t) ? e.delete(t) : e.add(t),
                        e
                    })
                },
                interestedUniverses: o,
                homePageSessionInfo: l
            }))
        }
        go.defaultProps = {
            context: Va.ContactMethod
        },
        go.propTypes = {
            translate: ae().func.isRequired,
            context: ae().string
        };
        var Eo, wo = (0,
        p.withTranslations)(go, he), So = function() {
            return (So = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Io = function() {
            return (Io = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Po = Ze.maxTilesPerCarouselPage, Co = _, _o = C, To = (Eo = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = pn()
              , r = (0,
            K.useState)(void 0)
              , a = r[0]
              , o = r[1]
              , i = (0,
            K.useState)(!1)
              , l = i[0]
              , u = i[1]
              , s = (0,
            K.useMemo)(function() {
                return Ma()
            }, [])
              , c = (0,
            K.useMemo)(function() {
                try {
                    return (0,
                    S.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            K.useCallback)(function(e) {
                o(void 0),
                u(!1),
                pe(Se.Home, t, s, c, e).then(function(e) {
                    o(e),
                    (0,
                    I.fireEvent)(Ze.omniRecommendationEndpointSuccessEvent)
                }).catch(function() {
                    u(!0),
                    (0,
                    I.fireEvent)(Ze.omniRecommendationEndpointErrorEvent)
                })
            }, [t, s, c]);
            (0,
            K.useEffect)(function() {
                d()
            }, [d]);
            var f = (0,
            K.useState)(void 0)
              , e = f[0]
              , p = f[1];
            (0,
            K.useEffect)(function() {
                fe(Co.homePageWeb, _o.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(_o.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , v = null == e ? void 0 : e.IsCarouselHorizontalScrollEnabled
              , h = null == e ? void 0 : e.IsNewScrollArrowsEnabled
              , r = (0,
            K.useCallback)(function(n) {
                o(function(e) {
                    var t;
                    return e && Io(Io({}, e), {
                        contentMetadata: ((t = {})[E.Game] = Io(Io({}, e.contentMetadata[E.Game]), n[E.Game]),
                        t[E.CatalogAsset] = Io(Io({}, e.contentMetadata[E.CatalogAsset]), n[E.CatalogAsset]),
                        t[E.CatalogBundle] = Io(Io({}, e.contentMetadata[E.CatalogBundle]), n[E.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , i = Ra(a, m, v)
              , f = i.homeFeedRef
              , g = i.gridRecommendationsMap
              , y = i.itemsPerRowMap
              , b = i.startingRowNumbersMap;
            Oa(Z.HomePage);
            e = (0,
            K.useMemo)(function() {
                return !(null == a || !a.sorts) && a.sorts.every(function(e) {
                    return e.treatmentType !== w.FriendCarousel
                })
            }, [null == a ? void 0 : a.sorts]),
            i = (0,
            K.useMemo)(function() {
                return null == a ? void 0 : a.sorts.findIndex(function(e) {
                    return e.treatmentType === w.InterestGrid
                })
            }, [null == a ? void 0 : a.sorts]);
            if (l)
                return Y().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, Y().createElement("h2", null, n(at.LabelGames)), Y().createElement(Ce, {
                    errorMessage: n(at.LabelApiError),
                    onRefresh: function() {
                        return d()
                    }
                }));
            if (void 0 === a)
                return Y().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, Y().createElement("div", {
                    className: "game-home-page-loading-title shimmer"
                }), Y().createElement("div", {
                    className: "game-home-page-loading-carousel"
                }, Array.from({
                    length: Po
                }, function(e, t) {
                    return Y().createElement(La, {
                        key: t
                    })
                })));
            if (void 0 !== i && -1 < i) {
                l = a.sorts[i];
                if (l && Tn(l))
                    return Y().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, Y().createElement("div", {
                        ref: f
                    }, Y().createElement(Pr.Provider, {
                        value: {
                            contentMetadata: a.contentMetadata,
                            appendContentMetadata: r
                        }
                    }, Y().createElement(bo, {
                        sort: l,
                        itemsPerRow: y.get(i),
                        fetchRecommendations: d,
                        translate: n
                    }))))
            }
            return Y().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, Y().createElement("div", {
                ref: f
            }, Y().createElement(Pr.Provider, {
                value: {
                    contentMetadata: a.contentMetadata,
                    appendContentMetadata: r
                }
            }, Y().createElement(We, null, Y().createElement(wo, {
                translate: n,
                context: void 0
            }), e && Y().createElement(wa, null), a.sorts.map(function(e, t) {
                return Y().createElement(Y().Fragment, {
                    key: t
                }, Y().createElement(ka, {
                    translate: n,
                    sort: e,
                    positionId: t,
                    startingRow: b.get(t),
                    currentPage: Z.HomePage,
                    itemsPerRow: y.get(t),
                    gridRecommendations: null !== (t = g.get(t)) && void 0 !== t ? t : [],
                    isExpandHomeContentEnabled: m,
                    isCarouselHorizontalScrollEnabled: v,
                    isNewScrollArrowsEnabled: h
                }))
            })))))
        }, te),
        function(e) {
            return Y().createElement(fn, null, Y().createElement(Eo, hn({}, e)))
        }
        );
        (0,
        L.ready)(function() {
            l() && (0,
            e.render)(Y().createElement(To, null), l())
        })
    }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/2bbbc9c3a04a9e203f9eeb3e1ba4879c-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
