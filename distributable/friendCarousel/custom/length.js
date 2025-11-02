/*! For license information please see placesList.bundle.min.js.LICENSE.txt */
!function() {
    var e = {
        4777: function(e) {
            var t = .1
              , n = "function" == typeof Float32Array;
            function r(e, t) {
                return 1 - 3 * t + 3 * e
            }
            function o(e, t) {
                return 3 * t - 6 * e
            }
            function i(e) {
                return 3 * e
            }
            function a(e, t, n) {
                return ((r(t, n) * e + o(t, n)) * e + i(t)) * e
            }
            function l(e, t, n) {
                return 3 * r(t, n) * e * e + 2 * o(t, n) * e + i(t)
            }
            function s(e) {
                return e
            }
            e.exports = function(e, r, o, i) {
                if (!(0 <= e && e <= 1 && 0 <= o && o <= 1))
                    throw new Error("bezier x values must be in [0, 1] range");
                if (e === r && o === i)
                    return s;
                for (var u = n ? new Float32Array(11) : new Array(11), c = 0; c < 11; ++c)
                    u[c] = a(c * t, e, o);
                function d(n) {
                    for (var r = 0, i = 1; 10 !== i && u[i] <= n; ++i)
                        r += t;
                    --i;
                    var s = r + (n - u[i]) / (u[i + 1] - u[i]) * t
                      , c = l(s, e, o);
                    return c >= .001 ? function(e, t, n, r) {
                        for (var o = 0; o < 4; ++o) {
                            var i = l(t, n, r);
                            if (0 === i)
                                return t;
                            t -= (a(t, n, r) - e) / i
                        }
                        return t
                    }(n, s, e, o) : 0 === c ? s : function(e, t, n, r, o) {
                        var i, l, s = 0;
                        do {
                            (i = a(l = t + (n - t) / 2, r, o) - e) > 0 ? n = l : t = l
                        } while (Math.abs(i) > 1e-7 && ++s < 10);
                        return l
                    }(n, r, r + t, e, o)
                }
                return function(e) {
                    return 0 === e ? 0 : 1 === e ? 1 : a(d(e), r, i)
                }
            }
        },
        1315: function() {
            !function() {
                "use strict";
                if ("object" == typeof window)
                    if ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype)
                        "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                            get: function() {
                                return this.intersectionRatio > 0
                            }
                        });
                    else {
                        var e = function() {
                            for (var e = window.document, t = o(e); t; )
                                t = o(e = t.ownerDocument);
                            return e
                        }()
                          , t = []
                          , n = null
                          , r = null;
                        a.prototype.THROTTLE_TIMEOUT = 100,
                        a.prototype.POLL_INTERVAL = null,
                        a.prototype.USE_MUTATION_OBSERVER = !0,
                        a._setupCrossOriginUpdater = function() {
                            return n || (n = function(e, n) {
                                r = e && n ? d(e, n) : {
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: 0,
                                    height: 0
                                },
                                t.forEach((function(e) {
                                    e._checkForIntersections()
                                }
                                ))
                            }
                            ),
                            n
                        }
                        ,
                        a._resetCrossOriginUpdater = function() {
                            n = null,
                            r = null
                        }
                        ,
                        a.prototype.observe = function(e) {
                            if (!this._observationTargets.some((function(t) {
                                return t.element == e
                            }
                            ))) {
                                if (!e || 1 != e.nodeType)
                                    throw new Error("target must be an Element");
                                this._registerInstance(),
                                this._observationTargets.push({
                                    element: e,
                                    entry: null
                                }),
                                this._monitorIntersections(e.ownerDocument),
                                this._checkForIntersections()
                            }
                        }
                        ,
                        a.prototype.unobserve = function(e) {
                            this._observationTargets = this._observationTargets.filter((function(t) {
                                return t.element != e
                            }
                            )),
                            this._unmonitorIntersections(e.ownerDocument),
                            0 == this._observationTargets.length && this._unregisterInstance()
                        }
                        ,
                        a.prototype.disconnect = function() {
                            this._observationTargets = [],
                            this._unmonitorAllIntersections(),
                            this._unregisterInstance()
                        }
                        ,
                        a.prototype.takeRecords = function() {
                            var e = this._queuedEntries.slice();
                            return this._queuedEntries = [],
                            e
                        }
                        ,
                        a.prototype._initThresholds = function(e) {
                            var t = e || [0];
                            return Array.isArray(t) || (t = [t]),
                            t.sort().filter((function(e, t, n) {
                                if ("number" != typeof e || isNaN(e) || e < 0 || e > 1)
                                    throw new Error("threshold must be a number between 0 and 1 inclusively");
                                return e !== n[t - 1]
                            }
                            ))
                        }
                        ,
                        a.prototype._parseRootMargin = function(e) {
                            var t = (e || "0px").split(/\s+/).map((function(e) {
                                var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                                if (!t)
                                    throw new Error("rootMargin must be specified in pixels or percent");
                                return {
                                    value: parseFloat(t[1]),
                                    unit: t[2]
                                }
                            }
                            ));
                            return t[1] = t[1] || t[0],
                            t[2] = t[2] || t[0],
                            t[3] = t[3] || t[1],
                            t
                        }
                        ,
                        a.prototype._monitorIntersections = function(t) {
                            var n = t.defaultView;
                            if (n && -1 == this._monitoringDocuments.indexOf(t)) {
                                var r = this._checkForIntersections
                                  , i = null
                                  , a = null;
                                this.POLL_INTERVAL ? i = n.setInterval(r, this.POLL_INTERVAL) : (l(n, "resize", r, !0),
                                l(t, "scroll", r, !0),
                                this.USE_MUTATION_OBSERVER && "MutationObserver"in n && (a = new n.MutationObserver(r)).observe(t, {
                                    attributes: !0,
                                    childList: !0,
                                    characterData: !0,
                                    subtree: !0
                                })),
                                this._monitoringDocuments.push(t),
                                this._monitoringUnsubscribes.push((function() {
                                    var e = t.defaultView;
                                    e && (i && e.clearInterval(i),
                                    s(e, "resize", r, !0)),
                                    s(t, "scroll", r, !0),
                                    a && a.disconnect()
                                }
                                ));
                                var u = this.root && (this.root.ownerDocument || this.root) || e;
                                if (t != u) {
                                    var c = o(t);
                                    c && this._monitorIntersections(c.ownerDocument)
                                }
                            }
                        }
                        ,
                        a.prototype._unmonitorIntersections = function(t) {
                            var n = this._monitoringDocuments.indexOf(t);
                            if (-1 != n) {
                                var r = this.root && (this.root.ownerDocument || this.root) || e
                                  , i = this._observationTargets.some((function(e) {
                                    var n = e.element.ownerDocument;
                                    if (n == t)
                                        return !0;
                                    for (; n && n != r; ) {
                                        var i = o(n);
                                        if ((n = i && i.ownerDocument) == t)
                                            return !0
                                    }
                                    return !1
                                }
                                ));
                                if (!i) {
                                    var a = this._monitoringUnsubscribes[n];
                                    if (this._monitoringDocuments.splice(n, 1),
                                    this._monitoringUnsubscribes.splice(n, 1),
                                    a(),
                                    t != r) {
                                        var l = o(t);
                                        l && this._unmonitorIntersections(l.ownerDocument)
                                    }
                                }
                            }
                        }
                        ,
                        a.prototype._unmonitorAllIntersections = function() {
                            var e = this._monitoringUnsubscribes.slice(0);
                            this._monitoringDocuments.length = 0,
                            this._monitoringUnsubscribes.length = 0;
                            for (var t = 0; t < e.length; t++)
                                e[t]()
                        }
                        ,
                        a.prototype._checkForIntersections = function() {
                            if (this.root || !n || r) {
                                var e = this._rootIsInDom()
                                  , t = e ? this._getRootRect() : {
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: 0,
                                    height: 0
                                };
                                this._observationTargets.forEach((function(r) {
                                    var o = r.element
                                      , a = u(o)
                                      , l = this._rootContainsTarget(o)
                                      , s = r.entry
                                      , c = e && l && this._computeTargetAndRootIntersection(o, a, t)
                                      , d = null;
                                    this._rootContainsTarget(o) ? n && !this.root || (d = t) : d = {
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    var f = r.entry = new i({
                                        time: window.performance && performance.now && performance.now(),
                                        target: o,
                                        boundingClientRect: a,
                                        rootBounds: d,
                                        intersectionRect: c
                                    });
                                    s ? e && l ? this._hasCrossedThreshold(s, f) && this._queuedEntries.push(f) : s && s.isIntersecting && this._queuedEntries.push(f) : this._queuedEntries.push(f)
                                }
                                ), this),
                                this._queuedEntries.length && this._callback(this.takeRecords(), this)
                            }
                        }
                        ,
                        a.prototype._computeTargetAndRootIntersection = function(t, o, i) {
                            if ("none" != window.getComputedStyle(t).display) {
                                for (var a, l, s, c, f, m, v, h, g = o, y = p(t), b = !1; !b && y; ) {
                                    var I = null
                                      , C = 1 == y.nodeType ? window.getComputedStyle(y) : {};
                                    if ("none" == C.display)
                                        return null;
                                    if (y == this.root || 9 == y.nodeType)
                                        if (b = !0,
                                        y == this.root || y == e)
                                            n && !this.root ? !r || 0 == r.width && 0 == r.height ? (y = null,
                                            I = null,
                                            g = null) : I = r : I = i;
                                        else {
                                            var S = p(y)
                                              , w = S && u(S)
                                              , x = S && this._computeTargetAndRootIntersection(S, w, i);
                                            w && x ? (y = S,
                                            I = d(w, x)) : (y = null,
                                            g = null)
                                        }
                                    else {
                                        var E = y.ownerDocument;
                                        y != E.body && y != E.documentElement && "visible" != C.overflow && (I = u(y))
                                    }
                                    if (I && (a = I,
                                    l = g,
                                    s = void 0,
                                    c = void 0,
                                    f = void 0,
                                    m = void 0,
                                    v = void 0,
                                    h = void 0,
                                    s = Math.max(a.top, l.top),
                                    c = Math.min(a.bottom, l.bottom),
                                    f = Math.max(a.left, l.left),
                                    m = Math.min(a.right, l.right),
                                    h = c - s,
                                    g = (v = m - f) >= 0 && h >= 0 && {
                                        top: s,
                                        bottom: c,
                                        left: f,
                                        right: m,
                                        width: v,
                                        height: h
                                    } || null),
                                    !g)
                                        break;
                                    y = y && p(y)
                                }
                                return g
                            }
                        }
                        ,
                        a.prototype._getRootRect = function() {
                            var t;
                            if (this.root && !m(this.root))
                                t = u(this.root);
                            else {
                                var n = m(this.root) ? this.root : e
                                  , r = n.documentElement
                                  , o = n.body;
                                t = {
                                    top: 0,
                                    left: 0,
                                    right: r.clientWidth || o.clientWidth,
                                    width: r.clientWidth || o.clientWidth,
                                    bottom: r.clientHeight || o.clientHeight,
                                    height: r.clientHeight || o.clientHeight
                                }
                            }
                            return this._expandRectByRootMargin(t)
                        }
                        ,
                        a.prototype._expandRectByRootMargin = function(e) {
                            var t = this._rootMarginValues.map((function(t, n) {
                                return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
                            }
                            ))
                              , n = {
                                top: e.top - t[0],
                                right: e.right + t[1],
                                bottom: e.bottom + t[2],
                                left: e.left - t[3]
                            };
                            return n.width = n.right - n.left,
                            n.height = n.bottom - n.top,
                            n
                        }
                        ,
                        a.prototype._hasCrossedThreshold = function(e, t) {
                            var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1
                              , r = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                            if (n !== r)
                                for (var o = 0; o < this.thresholds.length; o++) {
                                    var i = this.thresholds[o];
                                    if (i == n || i == r || i < n != i < r)
                                        return !0
                                }
                        }
                        ,
                        a.prototype._rootIsInDom = function() {
                            return !this.root || f(e, this.root)
                        }
                        ,
                        a.prototype._rootContainsTarget = function(t) {
                            var n = this.root && (this.root.ownerDocument || this.root) || e;
                            return f(n, t) && (!this.root || n == t.ownerDocument)
                        }
                        ,
                        a.prototype._registerInstance = function() {
                            t.indexOf(this) < 0 && t.push(this)
                        }
                        ,
                        a.prototype._unregisterInstance = function() {
                            var e = t.indexOf(this);
                            -1 != e && t.splice(e, 1)
                        }
                        ,
                        window.IntersectionObserver = a,
                        window.IntersectionObserverEntry = i
                    }
                function o(e) {
                    try {
                        return e.defaultView && e.defaultView.frameElement || null
                    } catch (e) {
                        return null
                    }
                }
                function i(e) {
                    this.time = e.time,
                    this.target = e.target,
                    this.rootBounds = c(e.rootBounds),
                    this.boundingClientRect = c(e.boundingClientRect),
                    this.intersectionRect = c(e.intersectionRect || {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }),
                    this.isIntersecting = !!e.intersectionRect;
                    var t = this.boundingClientRect
                      , n = t.width * t.height
                      , r = this.intersectionRect
                      , o = r.width * r.height;
                    this.intersectionRatio = n ? Number((o / n).toFixed(4)) : this.isIntersecting ? 1 : 0
                }
                function a(e, t) {
                    var n, r, o, i = t || {};
                    if ("function" != typeof e)
                        throw new Error("callback must be a function");
                    if (i.root && 1 != i.root.nodeType && 9 != i.root.nodeType)
                        throw new Error("root must be a Document or Element");
                    this._checkForIntersections = (n = this._checkForIntersections.bind(this),
                    r = this.THROTTLE_TIMEOUT,
                    o = null,
                    function() {
                        o || (o = setTimeout((function() {
                            n(),
                            o = null
                        }
                        ), r))
                    }
                    ),
                    this._callback = e,
                    this._observationTargets = [],
                    this._queuedEntries = [],
                    this._rootMarginValues = this._parseRootMargin(i.rootMargin),
                    this.thresholds = this._initThresholds(i.threshold),
                    this.root = i.root || null,
                    this.rootMargin = this._rootMarginValues.map((function(e) {
                        return e.value + e.unit
                    }
                    )).join(" "),
                    this._monitoringDocuments = [],
                    this._monitoringUnsubscribes = []
                }
                function l(e, t, n, r) {
                    "function" == typeof e.addEventListener ? e.addEventListener(t, n, r || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
                }
                function s(e, t, n, r) {
                    "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, r || !1) : "function" == typeof e.detachEvent && e.detachEvent("on" + t, n)
                }
                function u(e) {
                    var t;
                    try {
                        t = e.getBoundingClientRect()
                    } catch (e) {}
                    return t ? (t.width && t.height || (t = {
                        top: t.top,
                        right: t.right,
                        bottom: t.bottom,
                        left: t.left,
                        width: t.right - t.left,
                        height: t.bottom - t.top
                    }),
                    t) : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
                function c(e) {
                    return !e || "x"in e ? e : {
                        top: e.top,
                        y: e.top,
                        bottom: e.bottom,
                        left: e.left,
                        x: e.left,
                        right: e.right,
                        width: e.width,
                        height: e.height
                    }
                }
                function d(e, t) {
                    var n = t.top - e.top
                      , r = t.left - e.left;
                    return {
                        top: n,
                        left: r,
                        height: t.height,
                        width: t.width,
                        bottom: n + t.height,
                        right: r + t.width
                    }
                }
                function f(e, t) {
                    for (var n = t; n; ) {
                        if (n == e)
                            return !0;
                        n = p(n)
                    }
                    return !1
                }
                function p(t) {
                    var n = t.parentNode;
                    return 9 == t.nodeType && t != e ? o(t) : (n && n.assignedSlot && (n = n.assignedSlot.parentNode),
                    n && 11 == n.nodeType && n.host ? n.host : n)
                }
                function m(e) {
                    return e && 9 === e.nodeType
                }
            }()
        },
        5199: function(e) {
            e.exports = function(e) {
                return !(!e || "string" == typeof e) && (e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && "String" !== e.constructor.name))
            }
        },
        8601: function(e, t, n) {
            var r = /^\s+|\s+$/g
              , o = /^[-+]0x[0-9a-f]+$/i
              , i = /^0b[01]+$/i
              , a = /^0o[0-7]+$/i
              , l = parseInt
              , s = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
              , u = "object" == typeof self && self && self.Object === Object && self
              , c = s || u || Function("return this")()
              , d = Object.prototype.toString
              , f = Math.max
              , p = Math.min
              , m = function() {
                return c.Date.now()
            };
            function v(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            function h(e) {
                if ("number" == typeof e)
                    return e;
                if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && "[object Symbol]" == d.call(e)
                }(e))
                    return NaN;
                if (v(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = v(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(r, "");
                var n = i.test(e);
                return n || a.test(e) ? l(e.slice(2), n ? 2 : 8) : o.test(e) ? NaN : +e
            }
            e.exports = function(e, t, n) {
                var r, o, i, a, l, s, u = 0, c = !1, d = !1, g = !0;
                if ("function" != typeof e)
                    throw new TypeError("Expected a function");
                function y(t) {
                    var n = r
                      , i = o;
                    return r = o = void 0,
                    u = t,
                    a = e.apply(i, n)
                }
                function b(e) {
                    var n = e - s;
                    return void 0 === s || n >= t || n < 0 || d && e - u >= i
                }
                function I() {
                    var e = m();
                    if (b(e))
                        return C(e);
                    l = setTimeout(I, function(e) {
                        var n = t - (e - s);
                        return d ? p(n, i - (e - u)) : n
                    }(e))
                }
                function C(e) {
                    return l = void 0,
                    g && r ? y(e) : (r = o = void 0,
                    a)
                }
                function S() {
                    var e = m()
                      , n = b(e);
                    if (r = arguments,
                    o = this,
                    s = e,
                    n) {
                        if (void 0 === l)
                            return function(e) {
                                return u = e,
                                l = setTimeout(I, t),
                                c ? y(e) : a
                            }(s);
                        if (d)
                            return l = setTimeout(I, t),
                            y(s)
                    }
                    return void 0 === l && (l = setTimeout(I, t)),
                    a
                }
                return t = h(t) || 0,
                v(n) && (c = !!n.leading,
                i = (d = "maxWait"in n) ? f(h(n.maxWait) || 0, t) : i,
                g = "trailing"in n ? !!n.trailing : g),
                S.cancel = function() {
                    void 0 !== l && clearTimeout(l),
                    u = 0,
                    r = s = o = l = void 0
                }
                ,
                S.flush = function() {
                    return void 0 === l ? a : C(m())
                }
                ,
                S
            }
        },
        8550: function(e, t, n) {
            var r = "Expected a function"
              , o = /^\s+|\s+$/g
              , i = /^[-+]0x[0-9a-f]+$/i
              , a = /^0b[01]+$/i
              , l = /^0o[0-7]+$/i
              , s = parseInt
              , u = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
              , c = "object" == typeof self && self && self.Object === Object && self
              , d = u || c || Function("return this")()
              , f = Object.prototype.toString
              , p = Math.max
              , m = Math.min
              , v = function() {
                return d.Date.now()
            };
            function h(e, t, n) {
                var o, i, a, l, s, u, c = 0, d = !1, f = !1, h = !0;
                if ("function" != typeof e)
                    throw new TypeError(r);
                function b(t) {
                    var n = o
                      , r = i;
                    return o = i = void 0,
                    c = t,
                    l = e.apply(r, n)
                }
                function I(e) {
                    var n = e - u;
                    return void 0 === u || n >= t || n < 0 || f && e - c >= a
                }
                function C() {
                    var e = v();
                    if (I(e))
                        return S(e);
                    s = setTimeout(C, function(e) {
                        var n = t - (e - u);
                        return f ? m(n, a - (e - c)) : n
                    }(e))
                }
                function S(e) {
                    return s = void 0,
                    h && o ? b(e) : (o = i = void 0,
                    l)
                }
                function w() {
                    var e = v()
                      , n = I(e);
                    if (o = arguments,
                    i = this,
                    u = e,
                    n) {
                        if (void 0 === s)
                            return function(e) {
                                return c = e,
                                s = setTimeout(C, t),
                                d ? b(e) : l
                            }(u);
                        if (f)
                            return s = setTimeout(C, t),
                            b(u)
                    }
                    return void 0 === s && (s = setTimeout(C, t)),
                    l
                }
                return t = y(t) || 0,
                g(n) && (d = !!n.leading,
                a = (f = "maxWait"in n) ? p(y(n.maxWait) || 0, t) : a,
                h = "trailing"in n ? !!n.trailing : h),
                w.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                    c = 0,
                    o = u = i = s = void 0
                }
                ,
                w.flush = function() {
                    return void 0 === s ? l : S(v())
                }
                ,
                w
            }
            function g(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            function y(e) {
                if ("number" == typeof e)
                    return e;
                if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && "[object Symbol]" == f.call(e)
                }(e))
                    return NaN;
                if (g(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = g(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(o, "");
                var n = a.test(e);
                return n || l.test(e) ? s(e.slice(2), n ? 2 : 8) : i.test(e) ? NaN : +e
            }
            e.exports = function(e, t, n) {
                var o = !0
                  , i = !0;
                if ("function" != typeof e)
                    throw new TypeError(r);
                return g(n) && (o = "leading"in n ? !!n.leading : o,
                i = "trailing"in n ? !!n.trailing : i),
                h(e, t, {
                    leading: o,
                    maxWait: t,
                    trailing: i
                })
            }
        },
        6852: function(e, t, n) {
            "use strict";
            var r = n(5199)
              , o = Array.prototype.concat
              , i = Array.prototype.slice
              , a = e.exports = function(e) {
                for (var t = [], n = 0, a = e.length; n < a; n++) {
                    var l = e[n];
                    r(l) ? t = o.call(t, i.call(l)) : t.push(l)
                }
                return t
            }
            ;
            a.wrap = function(e) {
                return function() {
                    return e(a(arguments))
                }
            }
        },
        7224: function(e, t, n) {
            function r(e, t) {
                return function(e) {
                    if (Array.isArray(e))
                        return e
                }(e) || function(e, t) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                        return;
                    var n = []
                      , r = !0
                      , o = !1
                      , i = void 0;
                    try {
                        for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value),
                        !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        o = !0,
                        i = e
                    } finally {
                        try {
                            r || null == l.return || l.return()
                        } finally {
                            if (o)
                                throw i
                        }
                    }
                    return n
                }(e, t) || function(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return o(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(e);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return o(e, t)
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function o(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++)
                    r[n] = e[n];
                return r
            }
            for (var i = n(9481), a = {}, l = 0, s = Object.keys(i); l < s.length; l++) {
                var u = s[l];
                a[i[u]] = u
            }
            var c = {
                rgb: {
                    channels: 3,
                    labels: "rgb"
                },
                hsl: {
                    channels: 3,
                    labels: "hsl"
                },
                hsv: {
                    channels: 3,
                    labels: "hsv"
                },
                hwb: {
                    channels: 3,
                    labels: "hwb"
                },
                cmyk: {
                    channels: 4,
                    labels: "cmyk"
                },
                xyz: {
                    channels: 3,
                    labels: "xyz"
                },
                lab: {
                    channels: 3,
                    labels: "lab"
                },
                lch: {
                    channels: 3,
                    labels: "lch"
                },
                hex: {
                    channels: 1,
                    labels: ["hex"]
                },
                keyword: {
                    channels: 1,
                    labels: ["keyword"]
                },
                ansi16: {
                    channels: 1,
                    labels: ["ansi16"]
                },
                ansi256: {
                    channels: 1,
                    labels: ["ansi256"]
                },
                hcg: {
                    channels: 3,
                    labels: ["h", "c", "g"]
                },
                apple: {
                    channels: 3,
                    labels: ["r16", "g16", "b16"]
                },
                gray: {
                    channels: 1,
                    labels: ["gray"]
                }
            };
            e.exports = c;
            for (var d = 0, f = Object.keys(c); d < f.length; d++) {
                var p = f[d];
                if (!("channels"in c[p]))
                    throw new Error("missing channels property: " + p);
                if (!("labels"in c[p]))
                    throw new Error("missing channel labels property: " + p);
                if (c[p].labels.length !== c[p].channels)
                    throw new Error("channel and label counts mismatch: " + p);
                var m = c[p]
                  , v = m.channels
                  , h = m.labels;
                delete c[p].channels,
                delete c[p].labels,
                Object.defineProperty(c[p], "channels", {
                    value: v
                }),
                Object.defineProperty(c[p], "labels", {
                    value: h
                })
            }
            c.rgb.hsl = function(e) {
                var t, n = e[0] / 255, r = e[1] / 255, o = e[2] / 255, i = Math.min(n, r, o), a = Math.max(n, r, o), l = a - i;
                a === i ? t = 0 : n === a ? t = (r - o) / l : r === a ? t = 2 + (o - n) / l : o === a && (t = 4 + (n - r) / l),
                (t = Math.min(60 * t, 360)) < 0 && (t += 360);
                var s = (i + a) / 2;
                return [t, 100 * (a === i ? 0 : s <= .5 ? l / (a + i) : l / (2 - a - i)), 100 * s]
            }
            ,
            c.rgb.hsv = function(e) {
                var t, n, r, o, i, a = e[0] / 255, l = e[1] / 255, s = e[2] / 255, u = Math.max(a, l, s), c = u - Math.min(a, l, s), d = function(e) {
                    return (u - e) / 6 / c + .5
                };
                return 0 === c ? (o = 0,
                i = 0) : (i = c / u,
                t = d(a),
                n = d(l),
                r = d(s),
                a === u ? o = r - n : l === u ? o = 1 / 3 + t - r : s === u && (o = 2 / 3 + n - t),
                o < 0 ? o += 1 : o > 1 && (o -= 1)),
                [360 * o, 100 * i, 100 * u]
            }
            ,
            c.rgb.hwb = function(e) {
                var t = e[0]
                  , n = e[1]
                  , r = e[2];
                return [c.rgb.hsl(e)[0], 100 * (1 / 255 * Math.min(t, Math.min(n, r))), 100 * (r = 1 - 1 / 255 * Math.max(t, Math.max(n, r)))]
            }
            ,
            c.rgb.cmyk = function(e) {
                var t = e[0] / 255
                  , n = e[1] / 255
                  , r = e[2] / 255
                  , o = Math.min(1 - t, 1 - n, 1 - r);
                return [100 * ((1 - t - o) / (1 - o) || 0), 100 * ((1 - n - o) / (1 - o) || 0), 100 * ((1 - r - o) / (1 - o) || 0), 100 * o]
            }
            ,
            c.rgb.keyword = function(e) {
                var t = a[e];
                if (t)
                    return t;
                for (var n, r, o, l = 1 / 0, s = 0, u = Object.keys(i); s < u.length; s++) {
                    var c = u[s]
                      , d = i[c]
                      , f = (r = e,
                    o = d,
                    Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2) + Math.pow(r[2] - o[2], 2));
                    f < l && (l = f,
                    n = c)
                }
                return n
            }
            ,
            c.keyword.rgb = function(e) {
                return i[e]
            }
            ,
            c.rgb.xyz = function(e) {
                var t = e[0] / 255
                  , n = e[1] / 255
                  , r = e[2] / 255;
                return [100 * (.4124 * (t = t > .04045 ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92)), 100 * (.2126 * t + .7152 * n + .0722 * r), 100 * (.0193 * t + .1192 * n + .9505 * r)]
            }
            ,
            c.rgb.lab = function(e) {
                var t = c.rgb.xyz(e)
                  , n = t[0]
                  , r = t[1]
                  , o = t[2];
                return r /= 100,
                o /= 108.883,
                n = (n /= 95.047) > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116,
                [116 * (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) - 16, 500 * (n - r), 200 * (r - (o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116))]
            }
            ,
            c.hsl.rgb = function(e) {
                var t, n, r, o = e[0] / 360, i = e[1] / 100, a = e[2] / 100;
                if (0 === i)
                    return [r = 255 * a, r, r];
                for (var l = 2 * a - (t = a < .5 ? a * (1 + i) : a + i - a * i), s = [0, 0, 0], u = 0; u < 3; u++)
                    (n = o + 1 / 3 * -(u - 1)) < 0 && n++,
                    n > 1 && n--,
                    r = 6 * n < 1 ? l + 6 * (t - l) * n : 2 * n < 1 ? t : 3 * n < 2 ? l + (t - l) * (2 / 3 - n) * 6 : l,
                    s[u] = 255 * r;
                return s
            }
            ,
            c.hsl.hsv = function(e) {
                var t = e[0]
                  , n = e[1] / 100
                  , r = e[2] / 100
                  , o = n
                  , i = Math.max(r, .01);
                return n *= (r *= 2) <= 1 ? r : 2 - r,
                o *= i <= 1 ? i : 2 - i,
                [t, 100 * (0 === r ? 2 * o / (i + o) : 2 * n / (r + n)), 100 * ((r + n) / 2)]
            }
            ,
            c.hsv.rgb = function(e) {
                var t = e[0] / 60
                  , n = e[1] / 100
                  , r = e[2] / 100
                  , o = Math.floor(t) % 6
                  , i = t - Math.floor(t)
                  , a = 255 * r * (1 - n)
                  , l = 255 * r * (1 - n * i)
                  , s = 255 * r * (1 - n * (1 - i));
                switch (r *= 255,
                o) {
                case 0:
                    return [r, s, a];
                case 1:
                    return [l, r, a];
                case 2:
                    return [a, r, s];
                case 3:
                    return [a, l, r];
                case 4:
                    return [s, a, r];
                case 5:
                    return [r, a, l]
                }
            }
            ,
            c.hsv.hsl = function(e) {
                var t, n, r = e[0], o = e[1] / 100, i = e[2] / 100, a = Math.max(i, .01);
                n = (2 - o) * i;
                var l = (2 - o) * a;
                return t = o * a,
                [r, 100 * (t = (t /= l <= 1 ? l : 2 - l) || 0), 100 * (n /= 2)]
            }
            ,
            c.hwb.rgb = function(e) {
                var t, n = e[0] / 360, r = e[1] / 100, o = e[2] / 100, i = r + o;
                i > 1 && (r /= i,
                o /= i);
                var a = Math.floor(6 * n)
                  , l = 1 - o;
                t = 6 * n - a,
                1 & a && (t = 1 - t);
                var s, u, c, d = r + t * (l - r);
                switch (a) {
                default:
                case 6:
                case 0:
                    s = l,
                    u = d,
                    c = r;
                    break;
                case 1:
                    s = d,
                    u = l,
                    c = r;
                    break;
                case 2:
                    s = r,
                    u = l,
                    c = d;
                    break;
                case 3:
                    s = r,
                    u = d,
                    c = l;
                    break;
                case 4:
                    s = d,
                    u = r,
                    c = l;
                    break;
                case 5:
                    s = l,
                    u = r,
                    c = d
                }
                return [255 * s, 255 * u, 255 * c]
            }
            ,
            c.cmyk.rgb = function(e) {
                var t = e[0] / 100
                  , n = e[1] / 100
                  , r = e[2] / 100
                  , o = e[3] / 100;
                return [255 * (1 - Math.min(1, t * (1 - o) + o)), 255 * (1 - Math.min(1, n * (1 - o) + o)), 255 * (1 - Math.min(1, r * (1 - o) + o))]
            }
            ,
            c.xyz.rgb = function(e) {
                var t, n, r, o = e[0] / 100, i = e[1] / 100, a = e[2] / 100;
                return n = -.9689 * o + 1.8758 * i + .0415 * a,
                r = .0557 * o + -.204 * i + 1.057 * a,
                t = (t = 3.2406 * o + -1.5372 * i + -.4986 * a) > .0031308 ? 1.055 * Math.pow(t, 1 / 2.4) - .055 : 12.92 * t,
                n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n,
                r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : 12.92 * r,
                [255 * (t = Math.min(Math.max(0, t), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (r = Math.min(Math.max(0, r), 1))]
            }
            ,
            c.xyz.lab = function(e) {
                var t = e[0]
                  , n = e[1]
                  , r = e[2];
                return n /= 100,
                r /= 108.883,
                t = (t /= 95.047) > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116,
                [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (t - n), 200 * (n - (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))]
            }
            ,
            c.lab.xyz = function(e) {
                var t, n, r, o = e[0];
                t = e[1] / 500 + (n = (o + 16) / 116),
                r = n - e[2] / 200;
                var i = Math.pow(n, 3)
                  , a = Math.pow(t, 3)
                  , l = Math.pow(r, 3);
                return n = i > .008856 ? i : (n - 16 / 116) / 7.787,
                t = a > .008856 ? a : (t - 16 / 116) / 7.787,
                r = l > .008856 ? l : (r - 16 / 116) / 7.787,
                [t *= 95.047, n *= 100, r *= 108.883]
            }
            ,
            c.lab.lch = function(e) {
                var t, n = e[0], r = e[1], o = e[2];
                return (t = 360 * Math.atan2(o, r) / 2 / Math.PI) < 0 && (t += 360),
                [n, Math.sqrt(r * r + o * o), t]
            }
            ,
            c.lch.lab = function(e) {
                var t = e[0]
                  , n = e[1]
                  , r = e[2] / 360 * 2 * Math.PI;
                return [t, n * Math.cos(r), n * Math.sin(r)]
            }
            ,
            c.rgb.ansi16 = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                  , n = r(e, 3)
                  , o = n[0]
                  , i = n[1]
                  , a = n[2]
                  , l = null === t ? c.rgb.hsv(e)[2] : t;
                if (0 === (l = Math.round(l / 50)))
                    return 30;
                var s = 30 + (Math.round(a / 255) << 2 | Math.round(i / 255) << 1 | Math.round(o / 255));
                return 2 === l && (s += 60),
                s
            }
            ,
            c.hsv.ansi16 = function(e) {
                return c.rgb.ansi16(c.hsv.rgb(e), e[2])
            }
            ,
            c.rgb.ansi256 = function(e) {
                var t = e[0]
                  , n = e[1]
                  , r = e[2];
                return t === n && n === r ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5)
            }
            ,
            c.ansi16.rgb = function(e) {
                var t = e % 10;
                if (0 === t || 7 === t)
                    return e > 50 && (t += 3.5),
                    [t = t / 10.5 * 255, t, t];
                var n = .5 * (1 + ~~(e > 50));
                return [(1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255]
            }
            ,
            c.ansi256.rgb = function(e) {
                if (e >= 232) {
                    var t = 10 * (e - 232) + 8;
                    return [t, t, t]
                }
                var n;
                return e -= 16,
                [Math.floor(e / 36) / 5 * 255, Math.floor((n = e % 36) / 6) / 5 * 255, n % 6 / 5 * 255]
            }
            ,
            c.rgb.hex = function(e) {
                var t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
                return "000000".substring(t.length) + t
            }
            ,
            c.hex.rgb = function(e) {
                var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                if (!t)
                    return [0, 0, 0];
                var n = t[0];
                3 === t[0].length && (n = n.split("").map((function(e) {
                    return e + e
                }
                )).join(""));
                var r = parseInt(n, 16);
                return [r >> 16 & 255, r >> 8 & 255, 255 & r]
            }
            ,
            c.rgb.hcg = function(e) {
                var t, n = e[0] / 255, r = e[1] / 255, o = e[2] / 255, i = Math.max(Math.max(n, r), o), a = Math.min(Math.min(n, r), o), l = i - a;
                return t = l <= 0 ? 0 : i === n ? (r - o) / l % 6 : i === r ? 2 + (o - n) / l : 4 + (n - r) / l,
                t /= 6,
                [360 * (t %= 1), 100 * l, 100 * (l < 1 ? a / (1 - l) : 0)]
            }
            ,
            c.hsl.hcg = function(e) {
                var t = e[1] / 100
                  , n = e[2] / 100
                  , r = n < .5 ? 2 * t * n : 2 * t * (1 - n)
                  , o = 0;
                return r < 1 && (o = (n - .5 * r) / (1 - r)),
                [e[0], 100 * r, 100 * o]
            }
            ,
            c.hsv.hcg = function(e) {
                var t = e[1] / 100
                  , n = e[2] / 100
                  , r = t * n
                  , o = 0;
                return r < 1 && (o = (n - r) / (1 - r)),
                [e[0], 100 * r, 100 * o]
            }
            ,
            c.hcg.rgb = function(e) {
                var t = e[0] / 360
                  , n = e[1] / 100
                  , r = e[2] / 100;
                if (0 === n)
                    return [255 * r, 255 * r, 255 * r];
                var o, i = [0, 0, 0], a = t % 1 * 6, l = a % 1, s = 1 - l;
                switch (Math.floor(a)) {
                case 0:
                    i[0] = 1,
                    i[1] = l,
                    i[2] = 0;
                    break;
                case 1:
                    i[0] = s,
                    i[1] = 1,
                    i[2] = 0;
                    break;
                case 2:
                    i[0] = 0,
                    i[1] = 1,
                    i[2] = l;
                    break;
                case 3:
                    i[0] = 0,
                    i[1] = s,
                    i[2] = 1;
                    break;
                case 4:
                    i[0] = l,
                    i[1] = 0,
                    i[2] = 1;
                    break;
                default:
                    i[0] = 1,
                    i[1] = 0,
                    i[2] = s
                }
                return o = (1 - n) * r,
                [255 * (n * i[0] + o), 255 * (n * i[1] + o), 255 * (n * i[2] + o)]
            }
            ,
            c.hcg.hsv = function(e) {
                var t = e[1] / 100
                  , n = t + e[2] / 100 * (1 - t)
                  , r = 0;
                return n > 0 && (r = t / n),
                [e[0], 100 * r, 100 * n]
            }
            ,
            c.hcg.hsl = function(e) {
                var t = e[1] / 100
                  , n = e[2] / 100 * (1 - t) + .5 * t
                  , r = 0;
                return n > 0 && n < .5 ? r = t / (2 * n) : n >= .5 && n < 1 && (r = t / (2 * (1 - n))),
                [e[0], 100 * r, 100 * n]
            }
            ,
            c.hcg.hwb = function(e) {
                var t = e[1] / 100
                  , n = t + e[2] / 100 * (1 - t);
                return [e[0], 100 * (n - t), 100 * (1 - n)]
            }
            ,
            c.hwb.hcg = function(e) {
                var t = e[1] / 100
                  , n = 1 - e[2] / 100
                  , r = n - t
                  , o = 0;
                return r < 1 && (o = (n - r) / (1 - r)),
                [e[0], 100 * r, 100 * o]
            }
            ,
            c.apple.rgb = function(e) {
                return [e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255]
            }
            ,
            c.rgb.apple = function(e) {
                return [e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535]
            }
            ,
            c.gray.rgb = function(e) {
                return [e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255]
            }
            ,
            c.gray.hsl = function(e) {
                return [0, 0, e[0]]
            }
            ,
            c.gray.hsv = c.gray.hsl,
            c.gray.hwb = function(e) {
                return [0, 100, e[0]]
            }
            ,
            c.gray.cmyk = function(e) {
                return [0, 0, 0, e[0]]
            }
            ,
            c.gray.lab = function(e) {
                return [e[0], 0, 0]
            }
            ,
            c.gray.hex = function(e) {
                var t = 255 & Math.round(e[0] / 100 * 255)
                  , n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
                return "000000".substring(n.length) + n
            }
            ,
            c.rgb.gray = function(e) {
                return [(e[0] + e[1] + e[2]) / 3 / 255 * 100]
            }
        },
        8041: function(e, t, n) {
            function r(e) {
                return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                r(e)
            }
            var o = n(7224)
              , i = n(8056)
              , a = {};
            Object.keys(o).forEach((function(e) {
                a[e] = {},
                Object.defineProperty(a[e], "channels", {
                    value: o[e].channels
                }),
                Object.defineProperty(a[e], "labels", {
                    value: o[e].labels
                });
                var t = i(e);
                Object.keys(t).forEach((function(n) {
                    var o = t[n];
                    a[e][n] = function(e) {
                        var t = function() {
                            for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                                n[o] = arguments[o];
                            var i = n[0];
                            if (null == i)
                                return i;
                            i.length > 1 && (n = i);
                            var a = e(n);
                            if ("object" === r(a))
                                for (var l = a.length, s = 0; s < l; s++)
                                    a[s] = Math.round(a[s]);
                            return a
                        };
                        return "conversion"in e && (t.conversion = e.conversion),
                        t
                    }(o),
                    a[e][n].raw = function(e) {
                        var t = function() {
                            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                                n[r] = arguments[r];
                            var o = n[0];
                            return null == o ? o : (o.length > 1 && (n = o),
                            e(n))
                        };
                        return "conversion"in e && (t.conversion = e.conversion),
                        t
                    }(o)
                }
                ))
            }
            )),
            e.exports = a
        },
        8056: function(e, t, n) {
            var r = n(7224);
            function o(e) {
                var t = function() {
                    for (var e = {}, t = Object.keys(r), n = t.length, o = 0; o < n; o++)
                        e[t[o]] = {
                            distance: -1,
                            parent: null
                        };
                    return e
                }()
                  , n = [e];
                for (t[e].distance = 0; n.length; )
                    for (var o = n.pop(), i = Object.keys(r[o]), a = i.length, l = 0; l < a; l++) {
                        var s = i[l]
                          , u = t[s];
                        -1 === u.distance && (u.distance = t[o].distance + 1,
                        u.parent = o,
                        n.unshift(s))
                    }
                return t
            }
            function i(e, t) {
                return function(n) {
                    return t(e(n))
                }
            }
            function a(e, t) {
                for (var n = [t[e].parent, e], o = r[t[e].parent][e], a = t[e].parent; t[a].parent; )
                    n.unshift(t[a].parent),
                    o = i(r[t[a].parent][a], o),
                    a = t[a].parent;
                return o.conversion = n,
                o
            }
            e.exports = function(e) {
                for (var t = o(e), n = {}, r = Object.keys(t), i = r.length, l = 0; l < i; l++) {
                    var s = r[l];
                    null !== t[s].parent && (n[s] = a(s, t))
                }
                return n
            }
        },
        9481: function(e) {
            "use strict";
            e.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        },
        3519: function(e, t, n) {
            var r = n(9481)
              , o = n(6852)
              , i = Object.hasOwnProperty
              , a = Object.create(null);
            for (var l in r)
                i.call(r, l) && (a[r[l]] = l);
            var s = e.exports = {
                to: {},
                get: {}
            };
            function u(e, t, n) {
                return Math.min(Math.max(t, e), n)
            }
            function c(e) {
                var t = Math.round(e).toString(16).toUpperCase();
                return t.length < 2 ? "0" + t : t
            }
            s.get = function(e) {
                var t, n;
                switch (e.substring(0, 3).toLowerCase()) {
                case "hsl":
                    t = s.get.hsl(e),
                    n = "hsl";
                    break;
                case "hwb":
                    t = s.get.hwb(e),
                    n = "hwb";
                    break;
                default:
                    t = s.get.rgb(e),
                    n = "rgb"
                }
                return t ? {
                    model: n,
                    value: t
                } : null
            }
            ,
            s.get.rgb = function(e) {
                if (!e)
                    return null;
                var t, n, o, a = [0, 0, 0, 1];
                if (t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
                    for (o = t[2],
                    t = t[1],
                    n = 0; n < 3; n++) {
                        var l = 2 * n;
                        a[n] = parseInt(t.slice(l, l + 2), 16)
                    }
                    o && (a[3] = parseInt(o, 16) / 255)
                } else if (t = e.match(/^#([a-f0-9]{3,4})$/i)) {
                    for (o = (t = t[1])[3],
                    n = 0; n < 3; n++)
                        a[n] = parseInt(t[n] + t[n], 16);
                    o && (a[3] = parseInt(o + o, 16) / 255)
                } else if (t = e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)) {
                    for (n = 0; n < 3; n++)
                        a[n] = parseInt(t[n + 1], 0);
                    t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]))
                } else {
                    if (!(t = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))
                        return (t = e.match(/^(\w+)$/)) ? "transparent" === t[1] ? [0, 0, 0, 0] : i.call(r, t[1]) ? ((a = r[t[1]])[3] = 1,
                        a) : null : null;
                    for (n = 0; n < 3; n++)
                        a[n] = Math.round(2.55 * parseFloat(t[n + 1]));
                    t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]))
                }
                for (n = 0; n < 3; n++)
                    a[n] = u(a[n], 0, 255);
                return a[3] = u(a[3], 0, 1),
                a
            }
            ,
            s.get.hsl = function(e) {
                if (!e)
                    return null;
                var t = e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
                if (t) {
                    var n = parseFloat(t[4]);
                    return [(parseFloat(t[1]) % 360 + 360) % 360, u(parseFloat(t[2]), 0, 100), u(parseFloat(t[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
                }
                return null
            }
            ,
            s.get.hwb = function(e) {
                if (!e)
                    return null;
                var t = e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
                if (t) {
                    var n = parseFloat(t[4]);
                    return [(parseFloat(t[1]) % 360 + 360) % 360, u(parseFloat(t[2]), 0, 100), u(parseFloat(t[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
                }
                return null
            }
            ,
            s.to.hex = function() {
                var e = o(arguments);
                return "#" + c(e[0]) + c(e[1]) + c(e[2]) + (e[3] < 1 ? c(Math.round(255 * e[3])) : "")
            }
            ,
            s.to.rgb = function() {
                var e = o(arguments);
                return e.length < 4 || 1 === e[3] ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")"
            }
            ,
            s.to.rgb.percent = function() {
                var e = o(arguments)
                  , t = Math.round(e[0] / 255 * 100)
                  , n = Math.round(e[1] / 255 * 100)
                  , r = Math.round(e[2] / 255 * 100);
                return e.length < 4 || 1 === e[3] ? "rgb(" + t + "%, " + n + "%, " + r + "%)" : "rgba(" + t + "%, " + n + "%, " + r + "%, " + e[3] + ")"
            }
            ,
            s.to.hsl = function() {
                var e = o(arguments);
                return e.length < 4 || 1 === e[3] ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")"
            }
            ,
            s.to.hwb = function() {
                var e = o(arguments)
                  , t = "";
                return e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]),
                "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")"
            }
            ,
            s.to.keyword = function(e) {
                return a[e.slice(0, 3)]
            }
        },
        7895: function(e, t, n) {
            function r(e) {
                return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                r(e)
            }
            function o(e, t) {
                var n;
                if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                    if (Array.isArray(e) || (n = l(e)) || t && e && "number" == typeof e.length) {
                        n && (e = n);
                        var r = 0
                          , o = function() {};
                        return {
                            s: o,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: o
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var i, a = !0, s = !1;
                return {
                    s: function() {
                        n = e[Symbol.iterator]()
                    },
                    n: function() {
                        var e = n.next();
                        return a = e.done,
                        e
                    },
                    e: function(e) {
                        s = !0,
                        i = e
                    },
                    f: function() {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (s)
                                throw i
                        }
                    }
                }
            }
            function i(e, t) {
                return function(e) {
                    if (Array.isArray(e))
                        return e
                }(e) || function(e, t) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                        return;
                    var n = []
                      , r = !0
                      , o = !1
                      , i = void 0;
                    try {
                        for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value),
                        !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        o = !0,
                        i = e
                    } finally {
                        try {
                            r || null == l.return || l.return()
                        } finally {
                            if (o)
                                throw i
                        }
                    }
                    return n
                }(e, t) || l(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function a(e) {
                return function(e) {
                    if (Array.isArray(e))
                        return s(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                        return Array.from(e)
                }(e) || l(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function l(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return s(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0
                }
            }
            function s(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++)
                    r[n] = e[n];
                return r
            }
            for (var u = n(3519), c = n(8041), d = ["keyword", "gray", "hex"], f = {}, p = 0, m = Object.keys(c); p < m.length; p++) {
                var v = m[p];
                f[a(c[v].labels).sort().join("")] = v
            }
            var h = {};
            function g(e, t) {
                if (!(this instanceof g))
                    return new g(e,t);
                if (t && t in d && (t = null),
                t && !(t in c))
                    throw new Error("Unknown model: " + t);
                var n, r;
                if (null == e)
                    this.model = "rgb",
                    this.color = [0, 0, 0],
                    this.valpha = 1;
                else if (e instanceof g)
                    this.model = e.model,
                    this.color = a(e.color),
                    this.valpha = e.valpha;
                else if ("string" == typeof e) {
                    var o = u.get(e);
                    if (null === o)
                        throw new Error("Unable to parse color from string: " + e);
                    this.model = o.model,
                    r = c[this.model].channels,
                    this.color = o.value.slice(0, r),
                    this.valpha = "number" == typeof o.value[r] ? o.value[r] : 1
                } else if (e.length > 0) {
                    this.model = t || "rgb",
                    r = c[this.model].channels;
                    var i = Array.prototype.slice.call(e, 0, r);
                    this.color = w(i, r),
                    this.valpha = "number" == typeof e[r] ? e[r] : 1
                } else if ("number" == typeof e)
                    this.model = "rgb",
                    this.color = [e >> 16 & 255, e >> 8 & 255, 255 & e],
                    this.valpha = 1;
                else {
                    this.valpha = 1;
                    var l = Object.keys(e);
                    "alpha"in e && (l.splice(l.indexOf("alpha"), 1),
                    this.valpha = "number" == typeof e.alpha ? e.alpha : 0);
                    var s = l.sort().join("");
                    if (!(s in f))
                        throw new Error("Unable to parse color from object: " + JSON.stringify(e));
                    this.model = f[s];
                    var p = c[this.model].labels
                      , m = [];
                    for (n = 0; n < p.length; n++)
                        m.push(e[p[n]]);
                    this.color = w(m)
                }
                if (h[this.model])
                    for (r = c[this.model].channels,
                    n = 0; n < r; n++) {
                        var v = h[this.model][n];
                        v && (this.color[n] = v(this.color[n]))
                    }
                this.valpha = Math.max(0, Math.min(1, this.valpha)),
                Object.freeze && Object.freeze(this)
            }
            g.prototype = {
                toString: function() {
                    return this.string()
                },
                toJSON: function() {
                    return this[this.model]()
                },
                string: function(e) {
                    var t = this.model in u.to ? this : this.rgb()
                      , n = 1 === (t = t.round("number" == typeof e ? e : 1)).valpha ? t.color : [].concat(a(t.color), [this.valpha]);
                    return u.to[t.model](n)
                },
                percentString: function(e) {
                    var t = this.rgb().round("number" == typeof e ? e : 1)
                      , n = 1 === t.valpha ? t.color : [].concat(a(t.color), [this.valpha]);
                    return u.to.rgb.percent(n)
                },
                array: function() {
                    return 1 === this.valpha ? a(this.color) : [].concat(a(this.color), [this.valpha])
                },
                object: function() {
                    for (var e = {}, t = c[this.model].channels, n = c[this.model].labels, r = 0; r < t; r++)
                        e[n[r]] = this.color[r];
                    return 1 !== this.valpha && (e.alpha = this.valpha),
                    e
                },
                unitArray: function() {
                    var e = this.rgb().color;
                    return e[0] /= 255,
                    e[1] /= 255,
                    e[2] /= 255,
                    1 !== this.valpha && e.push(this.valpha),
                    e
                },
                unitObject: function() {
                    var e = this.rgb().object();
                    return e.r /= 255,
                    e.g /= 255,
                    e.b /= 255,
                    1 !== this.valpha && (e.alpha = this.valpha),
                    e
                },
                round: function(e) {
                    return e = Math.max(e || 0, 0),
                    new g([].concat(a(this.color.map(function(e) {
                        return function(t) {
                            return function(e, t) {
                                return Number(e.toFixed(t))
                            }(t, e)
                        }
                    }(e))), [this.valpha]),this.model)
                },
                alpha: function(e) {
                    return void 0 !== e ? new g([].concat(a(this.color), [Math.max(0, Math.min(1, e))]),this.model) : this.valpha
                },
                red: C("rgb", 0, S(255)),
                green: C("rgb", 1, S(255)),
                blue: C("rgb", 2, S(255)),
                hue: C(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (function(e) {
                    return (e % 360 + 360) % 360
                }
                )),
                saturationl: C("hsl", 1, S(100)),
                lightness: C("hsl", 2, S(100)),
                saturationv: C("hsv", 1, S(100)),
                value: C("hsv", 2, S(100)),
                chroma: C("hcg", 1, S(100)),
                gray: C("hcg", 2, S(100)),
                white: C("hwb", 1, S(100)),
                wblack: C("hwb", 2, S(100)),
                cyan: C("cmyk", 0, S(100)),
                magenta: C("cmyk", 1, S(100)),
                yellow: C("cmyk", 2, S(100)),
                black: C("cmyk", 3, S(100)),
                x: C("xyz", 0, S(95.047)),
                y: C("xyz", 1, S(100)),
                z: C("xyz", 2, S(108.833)),
                l: C("lab", 0, S(100)),
                a: C("lab", 1),
                b: C("lab", 2),
                keyword: function(e) {
                    return void 0 !== e ? new g(e) : c[this.model].keyword(this.color)
                },
                hex: function(e) {
                    return void 0 !== e ? new g(e) : u.to.hex(this.rgb().round().color)
                },
                hexa: function(e) {
                    if (void 0 !== e)
                        return new g(e);
                    var t = this.rgb().round().color
                      , n = Math.round(255 * this.valpha).toString(16).toUpperCase();
                    return 1 === n.length && (n = "0" + n),
                    u.to.hex(t) + n
                },
                rgbNumber: function() {
                    var e = this.rgb().color;
                    return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2]
                },
                luminosity: function() {
                    var e, t = [], n = o(this.rgb().color.entries());
                    try {
                        for (n.s(); !(e = n.n()).done; ) {
                            var r = i(e.value, 2)
                              , a = r[0]
                              , l = r[1] / 255;
                            t[a] = l <= .04045 ? l / 12.92 : Math.pow((l + .055) / 1.055, 2.4)
                        }
                    } catch (e) {
                        n.e(e)
                    } finally {
                        n.f()
                    }
                    return .2126 * t[0] + .7152 * t[1] + .0722 * t[2]
                },
                contrast: function(e) {
                    var t = this.luminosity()
                      , n = e.luminosity();
                    return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05)
                },
                level: function(e) {
                    var t = this.contrast(e);
                    return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : ""
                },
                isDark: function() {
                    var e = this.rgb().color;
                    return (2126 * e[0] + 7152 * e[1] + 722 * e[2]) / 1e4 < 128
                },
                isLight: function() {
                    return !this.isDark()
                },
                negate: function() {
                    for (var e = this.rgb(), t = 0; t < 3; t++)
                        e.color[t] = 255 - e.color[t];
                    return e
                },
                lighten: function(e) {
                    var t = this.hsl();
                    return t.color[2] += t.color[2] * e,
                    t
                },
                darken: function(e) {
                    var t = this.hsl();
                    return t.color[2] -= t.color[2] * e,
                    t
                },
                saturate: function(e) {
                    var t = this.hsl();
                    return t.color[1] += t.color[1] * e,
                    t
                },
                desaturate: function(e) {
                    var t = this.hsl();
                    return t.color[1] -= t.color[1] * e,
                    t
                },
                whiten: function(e) {
                    var t = this.hwb();
                    return t.color[1] += t.color[1] * e,
                    t
                },
                blacken: function(e) {
                    var t = this.hwb();
                    return t.color[2] += t.color[2] * e,
                    t
                },
                grayscale: function() {
                    var e = this.rgb().color
                      , t = .3 * e[0] + .59 * e[1] + .11 * e[2];
                    return g.rgb(t, t, t)
                },
                fade: function(e) {
                    return this.alpha(this.valpha - this.valpha * e)
                },
                opaquer: function(e) {
                    return this.alpha(this.valpha + this.valpha * e)
                },
                rotate: function(e) {
                    var t = this.hsl()
                      , n = t.color[0];
                    return n = (n = (n + e) % 360) < 0 ? 360 + n : n,
                    t.color[0] = n,
                    t
                },
                mix: function(e, t) {
                    if (!e || !e.rgb)
                        throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + r(e));
                    var n = e.rgb()
                      , o = this.rgb()
                      , i = void 0 === t ? .5 : t
                      , a = 2 * i - 1
                      , l = n.alpha() - o.alpha()
                      , s = ((a * l == -1 ? a : (a + l) / (1 + a * l)) + 1) / 2
                      , u = 1 - s;
                    return g.rgb(s * n.red() + u * o.red(), s * n.green() + u * o.green(), s * n.blue() + u * o.blue(), n.alpha() * i + o.alpha() * (1 - i))
                }
            };
            for (var y = function() {
                var e = I[b];
                if (d.includes(e))
                    return "continue";
                var t = c[e].channels;
                g.prototype[e] = function() {
                    if (this.model === e)
                        return new g(this);
                    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                        n[r] = arguments[r];
                    return n.length > 0 ? new g(n,e) : new g([].concat(a((o = c[this.model][e].raw(this.color),
                    Array.isArray(o) ? o : [o])), [this.valpha]),e);
                    var o
                }
                ,
                g[e] = function() {
                    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                        r[o] = arguments[o];
                    var i = r[0];
                    return "number" == typeof i && (i = w(r, t)),
                    new g(i,e)
                }
            }, b = 0, I = Object.keys(c); b < I.length; b++)
                y();
            function C(e, t, n) {
                var r, i = o(e = Array.isArray(e) ? e : [e]);
                try {
                    for (i.s(); !(r = i.n()).done; ) {
                        var a = r.value;
                        (h[a] || (h[a] = []))[t] = n
                    }
                } catch (e) {
                    i.e(e)
                } finally {
                    i.f()
                }
                return e = e[0],
                function(r) {
                    var o;
                    return void 0 !== r ? (n && (r = n(r)),
                    (o = this[e]()).color[t] = r,
                    o) : (o = this[e]().color[t],
                    n && (o = n(o)),
                    o)
                }
            }
            function S(e) {
                return function(t) {
                    return Math.max(0, Math.min(e, t))
                }
            }
            function w(e, t) {
                for (var n = 0; n < t; n++)
                    "number" != typeof e[n] && (e[n] = 0);
                return e
            }
            e.exports = g
        },
        6870: function() {
            !function() {
                "use strict";
                if ("object" == typeof window)
                    if ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype)
                        "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                            get: function() {
                                return this.intersectionRatio > 0
                            }
                        });
                    else {
                        var e = function() {
                            for (var e = window.document, t = o(e); t; )
                                t = o(e = t.ownerDocument);
                            return e
                        }()
                          , t = []
                          , n = null
                          , r = null;
                        a.prototype.THROTTLE_TIMEOUT = 100,
                        a.prototype.POLL_INTERVAL = null,
                        a.prototype.USE_MUTATION_OBSERVER = !0,
                        a._setupCrossOriginUpdater = function() {
                            return n || (n = function(e, n) {
                                r = e && n ? d(e, n) : {
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: 0,
                                    height: 0
                                },
                                t.forEach((function(e) {
                                    e._checkForIntersections()
                                }
                                ))
                            }
                            ),
                            n
                        }
                        ,
                        a._resetCrossOriginUpdater = function() {
                            n = null,
                            r = null
                        }
                        ,
                        a.prototype.observe = function(e) {
                            if (!this._observationTargets.some((function(t) {
                                return t.element == e
                            }
                            ))) {
                                if (!e || 1 != e.nodeType)
                                    throw new Error("target must be an Element");
                                this._registerInstance(),
                                this._observationTargets.push({
                                    element: e,
                                    entry: null
                                }),
                                this._monitorIntersections(e.ownerDocument),
                                this._checkForIntersections()
                            }
                        }
                        ,
                        a.prototype.unobserve = function(e) {
                            this._observationTargets = this._observationTargets.filter((function(t) {
                                return t.element != e
                            }
                            )),
                            this._unmonitorIntersections(e.ownerDocument),
                            0 == this._observationTargets.length && this._unregisterInstance()
                        }
                        ,
                        a.prototype.disconnect = function() {
                            this._observationTargets = [],
                            this._unmonitorAllIntersections(),
                            this._unregisterInstance()
                        }
                        ,
                        a.prototype.takeRecords = function() {
                            var e = this._queuedEntries.slice();
                            return this._queuedEntries = [],
                            e
                        }
                        ,
                        a.prototype._initThresholds = function(e) {
                            var t = e || [0];
                            return Array.isArray(t) || (t = [t]),
                            t.sort().filter((function(e, t, n) {
                                if ("number" != typeof e || isNaN(e) || e < 0 || e > 1)
                                    throw new Error("threshold must be a number between 0 and 1 inclusively");
                                return e !== n[t - 1]
                            }
                            ))
                        }
                        ,
                        a.prototype._parseRootMargin = function(e) {
                            var t = (e || "0px").split(/\s+/).map((function(e) {
                                var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                                if (!t)
                                    throw new Error("rootMargin must be specified in pixels or percent");
                                return {
                                    value: parseFloat(t[1]),
                                    unit: t[2]
                                }
                            }
                            ));
                            return t[1] = t[1] || t[0],
                            t[2] = t[2] || t[0],
                            t[3] = t[3] || t[1],
                            t
                        }
                        ,
                        a.prototype._monitorIntersections = function(t) {
                            var n = t.defaultView;
                            if (n && -1 == this._monitoringDocuments.indexOf(t)) {
                                var r = this._checkForIntersections
                                  , i = null
                                  , a = null;
                                this.POLL_INTERVAL ? i = n.setInterval(r, this.POLL_INTERVAL) : (l(n, "resize", r, !0),
                                l(t, "scroll", r, !0),
                                this.USE_MUTATION_OBSERVER && "MutationObserver"in n && (a = new n.MutationObserver(r)).observe(t, {
                                    attributes: !0,
                                    childList: !0,
                                    characterData: !0,
                                    subtree: !0
                                })),
                                this._monitoringDocuments.push(t),
                                this._monitoringUnsubscribes.push((function() {
                                    var e = t.defaultView;
                                    e && (i && e.clearInterval(i),
                                    s(e, "resize", r, !0)),
                                    s(t, "scroll", r, !0),
                                    a && a.disconnect()
                                }
                                ));
                                var u = this.root && (this.root.ownerDocument || this.root) || e;
                                if (t != u) {
                                    var c = o(t);
                                    c && this._monitorIntersections(c.ownerDocument)
                                }
                            }
                        }
                        ,
                        a.prototype._unmonitorIntersections = function(t) {
                            var n = this._monitoringDocuments.indexOf(t);
                            if (-1 != n) {
                                var r = this.root && (this.root.ownerDocument || this.root) || e
                                  , i = this._observationTargets.some((function(e) {
                                    var n = e.element.ownerDocument;
                                    if (n == t)
                                        return !0;
                                    for (; n && n != r; ) {
                                        var i = o(n);
                                        if ((n = i && i.ownerDocument) == t)
                                            return !0
                                    }
                                    return !1
                                }
                                ));
                                if (!i) {
                                    var a = this._monitoringUnsubscribes[n];
                                    if (this._monitoringDocuments.splice(n, 1),
                                    this._monitoringUnsubscribes.splice(n, 1),
                                    a(),
                                    t != r) {
                                        var l = o(t);
                                        l && this._unmonitorIntersections(l.ownerDocument)
                                    }
                                }
                            }
                        }
                        ,
                        a.prototype._unmonitorAllIntersections = function() {
                            var e = this._monitoringUnsubscribes.slice(0);
                            this._monitoringDocuments.length = 0,
                            this._monitoringUnsubscribes.length = 0;
                            for (var t = 0; t < e.length; t++)
                                e[t]()
                        }
                        ,
                        a.prototype._checkForIntersections = function() {
                            if (this.root || !n || r) {
                                var e = this._rootIsInDom()
                                  , t = e ? this._getRootRect() : {
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: 0,
                                    height: 0
                                };
                                this._observationTargets.forEach((function(r) {
                                    var o = r.element
                                      , a = u(o)
                                      , l = this._rootContainsTarget(o)
                                      , s = r.entry
                                      , c = e && l && this._computeTargetAndRootIntersection(o, a, t)
                                      , d = null;
                                    this._rootContainsTarget(o) ? n && !this.root || (d = t) : d = {
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    var f = r.entry = new i({
                                        time: window.performance && performance.now && performance.now(),
                                        target: o,
                                        boundingClientRect: a,
                                        rootBounds: d,
                                        intersectionRect: c
                                    });
                                    s ? e && l ? this._hasCrossedThreshold(s, f) && this._queuedEntries.push(f) : s && s.isIntersecting && this._queuedEntries.push(f) : this._queuedEntries.push(f)
                                }
                                ), this),
                                this._queuedEntries.length && this._callback(this.takeRecords(), this)
                            }
                        }
                        ,
                        a.prototype._computeTargetAndRootIntersection = function(t, o, i) {
                            if ("none" != window.getComputedStyle(t).display) {
                                for (var a, l, s, c, f, m, v, h, g = o, y = p(t), b = !1; !b && y; ) {
                                    var I = null
                                      , C = 1 == y.nodeType ? window.getComputedStyle(y) : {};
                                    if ("none" == C.display)
                                        return null;
                                    if (y == this.root || 9 == y.nodeType)
                                        if (b = !0,
                                        y == this.root || y == e)
                                            n && !this.root ? !r || 0 == r.width && 0 == r.height ? (y = null,
                                            I = null,
                                            g = null) : I = r : I = i;
                                        else {
                                            var S = p(y)
                                              , w = S && u(S)
                                              , x = S && this._computeTargetAndRootIntersection(S, w, i);
                                            w && x ? (y = S,
                                            I = d(w, x)) : (y = null,
                                            g = null)
                                        }
                                    else {
                                        var E = y.ownerDocument;
                                        y != E.body && y != E.documentElement && "visible" != C.overflow && (I = u(y))
                                    }
                                    if (I && (a = I,
                                    l = g,
                                    s = void 0,
                                    c = void 0,
                                    f = void 0,
                                    m = void 0,
                                    v = void 0,
                                    h = void 0,
                                    s = Math.max(a.top, l.top),
                                    c = Math.min(a.bottom, l.bottom),
                                    f = Math.max(a.left, l.left),
                                    m = Math.min(a.right, l.right),
                                    h = c - s,
                                    g = (v = m - f) >= 0 && h >= 0 && {
                                        top: s,
                                        bottom: c,
                                        left: f,
                                        right: m,
                                        width: v,
                                        height: h
                                    } || null),
                                    !g)
                                        break;
                                    y = y && p(y)
                                }
                                return g
                            }
                        }
                        ,
                        a.prototype._getRootRect = function() {
                            var t;
                            if (this.root && !m(this.root))
                                t = u(this.root);
                            else {
                                var n = m(this.root) ? this.root : e
                                  , r = n.documentElement
                                  , o = n.body;
                                t = {
                                    top: 0,
                                    left: 0,
                                    right: r.clientWidth || o.clientWidth,
                                    width: r.clientWidth || o.clientWidth,
                                    bottom: r.clientHeight || o.clientHeight,
                                    height: r.clientHeight || o.clientHeight
                                }
                            }
                            return this._expandRectByRootMargin(t)
                        }
                        ,
                        a.prototype._expandRectByRootMargin = function(e) {
                            var t = this._rootMarginValues.map((function(t, n) {
                                return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
                            }
                            ))
                              , n = {
                                top: e.top - t[0],
                                right: e.right + t[1],
                                bottom: e.bottom + t[2],
                                left: e.left - t[3]
                            };
                            return n.width = n.right - n.left,
                            n.height = n.bottom - n.top,
                            n
                        }
                        ,
                        a.prototype._hasCrossedThreshold = function(e, t) {
                            var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1
                              , r = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                            if (n !== r)
                                for (var o = 0; o < this.thresholds.length; o++) {
                                    var i = this.thresholds[o];
                                    if (i == n || i == r || i < n != i < r)
                                        return !0
                                }
                        }
                        ,
                        a.prototype._rootIsInDom = function() {
                            return !this.root || f(e, this.root)
                        }
                        ,
                        a.prototype._rootContainsTarget = function(t) {
                            var n = this.root && (this.root.ownerDocument || this.root) || e;
                            return f(n, t) && (!this.root || n == t.ownerDocument)
                        }
                        ,
                        a.prototype._registerInstance = function() {
                            t.indexOf(this) < 0 && t.push(this)
                        }
                        ,
                        a.prototype._unregisterInstance = function() {
                            var e = t.indexOf(this);
                            -1 != e && t.splice(e, 1)
                        }
                        ,
                        window.IntersectionObserver = a,
                        window.IntersectionObserverEntry = i
                    }
                function o(e) {
                    try {
                        return e.defaultView && e.defaultView.frameElement || null
                    } catch (e) {
                        return null
                    }
                }
                function i(e) {
                    this.time = e.time,
                    this.target = e.target,
                    this.rootBounds = c(e.rootBounds),
                    this.boundingClientRect = c(e.boundingClientRect),
                    this.intersectionRect = c(e.intersectionRect || {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }),
                    this.isIntersecting = !!e.intersectionRect;
                    var t = this.boundingClientRect
                      , n = t.width * t.height
                      , r = this.intersectionRect
                      , o = r.width * r.height;
                    this.intersectionRatio = n ? Number((o / n).toFixed(4)) : this.isIntersecting ? 1 : 0
                }
                function a(e, t) {
                    var n, r, o, i = t || {};
                    if ("function" != typeof e)
                        throw new Error("callback must be a function");
                    if (i.root && 1 != i.root.nodeType && 9 != i.root.nodeType)
                        throw new Error("root must be a Document or Element");
                    this._checkForIntersections = (n = this._checkForIntersections.bind(this),
                    r = this.THROTTLE_TIMEOUT,
                    o = null,
                    function() {
                        o || (o = setTimeout((function() {
                            n(),
                            o = null
                        }
                        ), r))
                    }
                    ),
                    this._callback = e,
                    this._observationTargets = [],
                    this._queuedEntries = [],
                    this._rootMarginValues = this._parseRootMargin(i.rootMargin),
                    this.thresholds = this._initThresholds(i.threshold),
                    this.root = i.root || null,
                    this.rootMargin = this._rootMarginValues.map((function(e) {
                        return e.value + e.unit
                    }
                    )).join(" "),
                    this._monitoringDocuments = [],
                    this._monitoringUnsubscribes = []
                }
                function l(e, t, n, r) {
                    "function" == typeof e.addEventListener ? e.addEventListener(t, n, r || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
                }
                function s(e, t, n, r) {
                    "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, r || !1) : "function" == typeof e.detachEvent && e.detachEvent("on" + t, n)
                }
                function u(e) {
                    var t;
                    try {
                        t = e.getBoundingClientRect()
                    } catch (e) {}
                    return t ? (t.width && t.height || (t = {
                        top: t.top,
                        right: t.right,
                        bottom: t.bottom,
                        left: t.left,
                        width: t.right - t.left,
                        height: t.bottom - t.top
                    }),
                    t) : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
                function c(e) {
                    return !e || "x"in e ? e : {
                        top: e.top,
                        y: e.top,
                        bottom: e.bottom,
                        left: e.left,
                        x: e.left,
                        right: e.right,
                        width: e.width,
                        height: e.height
                    }
                }
                function d(e, t) {
                    var n = t.top - e.top
                      , r = t.left - e.left;
                    return {
                        top: n,
                        left: r,
                        height: t.height,
                        width: t.width,
                        bottom: n + t.height,
                        right: r + t.width
                    }
                }
                function f(e, t) {
                    for (var n = t; n; ) {
                        if (n == e)
                            return !0;
                        n = p(n)
                    }
                    return !1
                }
                function p(t) {
                    var n = t.parentNode;
                    return 9 == t.nodeType && t != e ? o(t) : (n && n.assignedSlot && (n = n.assignedSlot.parentNode),
                    n && 11 == n.nodeType && n.host ? n.host : n)
                }
                function m(e) {
                    return e && 9 === e.nodeType
                }
            }()
        },
        72: function(e, t, n) {
            var r = /^\s+|\s+$/g
              , o = /^[-+]0x[0-9a-f]+$/i
              , i = /^0b[01]+$/i
              , a = /^0o[0-7]+$/i
              , l = parseInt
              , s = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
              , u = "object" == typeof self && self && self.Object === Object && self
              , c = s || u || Function("return this")()
              , d = Object.prototype.toString
              , f = Math.max
              , p = Math.min
              , m = function() {
                return c.Date.now()
            };
            function v(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            function h(e) {
                if ("number" == typeof e)
                    return e;
                if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && "[object Symbol]" == d.call(e)
                }(e))
                    return NaN;
                if (v(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = v(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(r, "");
                var n = i.test(e);
                return n || a.test(e) ? l(e.slice(2), n ? 2 : 8) : o.test(e) ? NaN : +e
            }
            e.exports = function(e, t, n) {
                var r, o, i, a, l, s, u = 0, c = !1, d = !1, g = !0;
                if ("function" != typeof e)
                    throw new TypeError("Expected a function");
                function y(t) {
                    var n = r
                      , i = o;
                    return r = o = void 0,
                    u = t,
                    a = e.apply(i, n)
                }
                function b(e) {
                    var n = e - s;
                    return void 0 === s || n >= t || n < 0 || d && e - u >= i
                }
                function I() {
                    var e = m();
                    if (b(e))
                        return C(e);
                    l = setTimeout(I, function(e) {
                        var n = t - (e - s);
                        return d ? p(n, i - (e - u)) : n
                    }(e))
                }
                function C(e) {
                    return l = void 0,
                    g && r ? y(e) : (r = o = void 0,
                    a)
                }
                function S() {
                    var e = m()
                      , n = b(e);
                    if (r = arguments,
                    o = this,
                    s = e,
                    n) {
                        if (void 0 === l)
                            return function(e) {
                                return u = e,
                                l = setTimeout(I, t),
                                c ? y(e) : a
                            }(s);
                        if (d)
                            return l = setTimeout(I, t),
                            y(s)
                    }
                    return void 0 === l && (l = setTimeout(I, t)),
                    a
                }
                return t = h(t) || 0,
                v(n) && (c = !!n.leading,
                i = (d = "maxWait"in n) ? f(h(n.maxWait) || 0, t) : i,
                g = "trailing"in n ? !!n.trailing : g),
                S.cancel = function() {
                    void 0 !== l && clearTimeout(l),
                    u = 0,
                    r = s = o = l = void 0
                }
                ,
                S.flush = function() {
                    return void 0 === l ? a : C(m())
                }
                ,
                S
            }
        },
        5250: function(e, t, n) {
            var r;
            e = n.nmd(e),
            function() {
                var o, i = "Expected a function", a = "__lodash_hash_undefined__", l = "__lodash_placeholder__", s = 16, u = 32, c = 64, d = 128, f = 256, p = 1 / 0, m = 9007199254740991, v = NaN, h = 4294967295, g = [["ary", d], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", s], ["flip", 512], ["partial", u], ["partialRight", c], ["rearg", f]], y = "[object Arguments]", b = "[object Array]", I = "[object Boolean]", C = "[object Date]", S = "[object Error]", w = "[object Function]", x = "[object GeneratorFunction]", E = "[object Map]", P = "[object Number]", T = "[object Object]", k = "[object Promise]", N = "[object RegExp]", A = "[object Set]", O = "[object String]", _ = "[object Symbol]", M = "[object WeakMap]", R = "[object ArrayBuffer]", L = "[object DataView]", D = "[object Float32Array]", F = "[object Float64Array]", U = "[object Int8Array]", B = "[object Int16Array]", j = "[object Int32Array]", G = "[object Uint8Array]", z = "[object Uint8ClampedArray]", H = "[object Uint16Array]", W = "[object Uint32Array]", V = /\b__p \+= '';/g, J = /\b(__p \+=) '' \+/g, q = /(__e\(.*?\)|\b__t\)) \+\n'';/g, K = /&(?:amp|lt|gt|quot|#39);/g, $ = /[&<>"']/g, X = RegExp(K.source), Y = RegExp($.source), Z = /<%-([\s\S]+?)%>/g, Q = /<%([\s\S]+?)%>/g, ee = /<%=([\s\S]+?)%>/g, te = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ne = /^\w*$/, re = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, oe = /[\\^$.*+?()[\]{}|]/g, ie = RegExp(oe.source), ae = /^\s+/, le = /\s/, se = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ue = /\{\n\/\* \[wrapped with (.+)\] \*/, ce = /,? & /, de = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, fe = /[()=,{}\[\]\/\s]/, pe = /\\(\\)?/g, me = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, ve = /\w*$/, he = /^[-+]0x[0-9a-f]+$/i, ge = /^0b[01]+$/i, ye = /^\[object .+?Constructor\]$/, be = /^0o[0-7]+$/i, Ie = /^(?:0|[1-9]\d*)$/, Ce = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Se = /($^)/, we = /['\n\r\u2028\u2029\\]/g, xe = "\\ud800-\\udfff", Ee = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", Pe = "\\u2700-\\u27bf", Te = "a-z\\xdf-\\xf6\\xf8-\\xff", ke = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ne = "\\ufe0e\\ufe0f", Ae = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Oe = "['’]", _e = "[" + xe + "]", Me = "[" + Ae + "]", Re = "[" + Ee + "]", Le = "\\d+", De = "[" + Pe + "]", Fe = "[" + Te + "]", Ue = "[^" + xe + Ae + Le + Pe + Te + ke + "]", Be = "\\ud83c[\\udffb-\\udfff]", je = "[^" + xe + "]", Ge = "(?:\\ud83c[\\udde6-\\uddff]){2}", ze = "[\\ud800-\\udbff][\\udc00-\\udfff]", He = "[" + ke + "]", We = "\\u200d", Ve = "(?:" + Fe + "|" + Ue + ")", Je = "(?:" + He + "|" + Ue + ")", qe = "(?:['’](?:d|ll|m|re|s|t|ve))?", Ke = "(?:['’](?:D|LL|M|RE|S|T|VE))?", $e = "(?:" + Re + "|" + Be + ")" + "?", Xe = "[" + Ne + "]?", Ye = Xe + $e + ("(?:" + We + "(?:" + [je, Ge, ze].join("|") + ")" + Xe + $e + ")*"), Ze = "(?:" + [De, Ge, ze].join("|") + ")" + Ye, Qe = "(?:" + [je + Re + "?", Re, Ge, ze, _e].join("|") + ")", et = RegExp(Oe, "g"), tt = RegExp(Re, "g"), nt = RegExp(Be + "(?=" + Be + ")|" + Qe + Ye, "g"), rt = RegExp([He + "?" + Fe + "+" + qe + "(?=" + [Me, He, "$"].join("|") + ")", Je + "+" + Ke + "(?=" + [Me, He + Ve, "$"].join("|") + ")", He + "?" + Ve + "+" + qe, He + "+" + Ke, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Le, Ze].join("|"), "g"), ot = RegExp("[" + We + xe + Ee + Ne + "]"), it = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, at = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], lt = -1, st = {};
                st[D] = st[F] = st[U] = st[B] = st[j] = st[G] = st[z] = st[H] = st[W] = !0,
                st[y] = st[b] = st[R] = st[I] = st[L] = st[C] = st[S] = st[w] = st[E] = st[P] = st[T] = st[N] = st[A] = st[O] = st[M] = !1;
                var ut = {};
                ut[y] = ut[b] = ut[R] = ut[L] = ut[I] = ut[C] = ut[D] = ut[F] = ut[U] = ut[B] = ut[j] = ut[E] = ut[P] = ut[T] = ut[N] = ut[A] = ut[O] = ut[_] = ut[G] = ut[z] = ut[H] = ut[W] = !0,
                ut[S] = ut[w] = ut[M] = !1;
                var ct = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }
                  , dt = parseFloat
                  , ft = parseInt
                  , pt = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
                  , mt = "object" == typeof self && self && self.Object === Object && self
                  , vt = pt || mt || Function("return this")()
                  , ht = t && !t.nodeType && t
                  , gt = ht && e && !e.nodeType && e
                  , yt = gt && gt.exports === ht
                  , bt = yt && pt.process
                  , It = function() {
                    try {
                        var e = gt && gt.require && gt.require("util").types;
                        return e || bt && bt.binding && bt.binding("util")
                    } catch (e) {}
                }()
                  , Ct = It && It.isArrayBuffer
                  , St = It && It.isDate
                  , wt = It && It.isMap
                  , xt = It && It.isRegExp
                  , Et = It && It.isSet
                  , Pt = It && It.isTypedArray;
                function Tt(e, t, n) {
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
                function kt(e, t, n, r) {
                    for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
                        var a = e[o];
                        t(r, a, n(a), e)
                    }
                    return r
                }
                function Nt(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function At(e, t) {
                    for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function Ot(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (!t(e[n], n, e))
                            return !1;
                    return !0
                }
                function _t(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        t(a, n, e) && (i[o++] = a)
                    }
                    return i
                }
                function Mt(e, t) {
                    return !!(null == e ? 0 : e.length) && Ht(e, t, 0) > -1
                }
                function Rt(e, t, n) {
                    for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
                        if (n(t, e[r]))
                            return !0;
                    return !1
                }
                function Lt(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r; )
                        o[n] = t(e[n], n, e);
                    return o
                }
                function Dt(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r; )
                        e[o + n] = t[n];
                    return e
                }
                function Ft(e, t, n, r) {
                    var o = -1
                      , i = null == e ? 0 : e.length;
                    for (r && i && (n = e[++o]); ++o < i; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Ut(e, t, n, r) {
                    var o = null == e ? 0 : e.length;
                    for (r && o && (n = e[--o]); o--; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Bt(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var jt = qt("length");
                function Gt(e, t, n) {
                    var r;
                    return n(e, (function(e, n, o) {
                        if (t(e, n, o))
                            return r = n,
                            !1
                    }
                    )),
                    r
                }
                function zt(e, t, n, r) {
                    for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
                        if (t(e[i], i, e))
                            return i;
                    return -1
                }
                function Ht(e, t, n) {
                    return t == t ? function(e, t, n) {
                        var r = n - 1
                          , o = e.length;
                        for (; ++r < o; )
                            if (e[r] === t)
                                return r;
                        return -1
                    }(e, t, n) : zt(e, Vt, n)
                }
                function Wt(e, t, n, r) {
                    for (var o = n - 1, i = e.length; ++o < i; )
                        if (r(e[o], t))
                            return o;
                    return -1
                }
                function Vt(e) {
                    return e != e
                }
                function Jt(e, t) {
                    var n = null == e ? 0 : e.length;
                    return n ? Xt(e, t) / n : v
                }
                function qt(e) {
                    return function(t) {
                        return null == t ? o : t[e]
                    }
                }
                function Kt(e) {
                    return function(t) {
                        return null == e ? o : e[t]
                    }
                }
                function $t(e, t, n, r, o) {
                    return o(e, (function(e, o, i) {
                        n = r ? (r = !1,
                        e) : t(n, e, o, i)
                    }
                    )),
                    n
                }
                function Xt(e, t) {
                    for (var n, r = -1, i = e.length; ++r < i; ) {
                        var a = t(e[r]);
                        a !== o && (n = n === o ? a : n + a)
                    }
                    return n
                }
                function Yt(e, t) {
                    for (var n = -1, r = Array(e); ++n < e; )
                        r[n] = t(n);
                    return r
                }
                function Zt(e) {
                    return e ? e.slice(0, hn(e) + 1).replace(ae, "") : e
                }
                function Qt(e) {
                    return function(t) {
                        return e(t)
                    }
                }
                function en(e, t) {
                    return Lt(t, (function(t) {
                        return e[t]
                    }
                    ))
                }
                function tn(e, t) {
                    return e.has(t)
                }
                function nn(e, t) {
                    for (var n = -1, r = e.length; ++n < r && Ht(t, e[n], 0) > -1; )
                        ;
                    return n
                }
                function rn(e, t) {
                    for (var n = e.length; n-- && Ht(t, e[n], 0) > -1; )
                        ;
                    return n
                }
                var on = Kt({
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
                  , an = Kt({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function ln(e) {
                    return "\\" + ct[e]
                }
                function sn(e) {
                    return ot.test(e)
                }
                function un(e) {
                    var t = -1
                      , n = Array(e.size);
                    return e.forEach((function(e, r) {
                        n[++t] = [r, e]
                    }
                    )),
                    n
                }
                function cn(e, t) {
                    return function(n) {
                        return e(t(n))
                    }
                }
                function dn(e, t) {
                    for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        a !== t && a !== l || (e[n] = l,
                        i[o++] = n)
                    }
                    return i
                }
                function fn(e) {
                    var t = -1
                      , n = Array(e.size);
                    return e.forEach((function(e) {
                        n[++t] = e
                    }
                    )),
                    n
                }
                function pn(e) {
                    var t = -1
                      , n = Array(e.size);
                    return e.forEach((function(e) {
                        n[++t] = [e, e]
                    }
                    )),
                    n
                }
                function mn(e) {
                    return sn(e) ? function(e) {
                        var t = nt.lastIndex = 0;
                        for (; nt.test(e); )
                            ++t;
                        return t
                    }(e) : jt(e)
                }
                function vn(e) {
                    return sn(e) ? function(e) {
                        return e.match(nt) || []
                    }(e) : function(e) {
                        return e.split("")
                    }(e)
                }
                function hn(e) {
                    for (var t = e.length; t-- && le.test(e.charAt(t)); )
                        ;
                    return t
                }
                var gn = Kt({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                });
                var yn = function e(t) {
                    var n, r = (t = null == t ? vt : yn.defaults(vt.Object(), t, yn.pick(vt, at))).Array, le = t.Date, xe = t.Error, Ee = t.Function, Pe = t.Math, Te = t.Object, ke = t.RegExp, Ne = t.String, Ae = t.TypeError, Oe = r.prototype, _e = Ee.prototype, Me = Te.prototype, Re = t["__core-js_shared__"], Le = _e.toString, De = Me.hasOwnProperty, Fe = 0, Ue = (n = /[^.]+$/.exec(Re && Re.keys && Re.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "", Be = Me.toString, je = Le.call(Te), Ge = vt._, ze = ke("^" + Le.call(De).replace(oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), He = yt ? t.Buffer : o, We = t.Symbol, Ve = t.Uint8Array, Je = He ? He.allocUnsafe : o, qe = cn(Te.getPrototypeOf, Te), Ke = Te.create, $e = Me.propertyIsEnumerable, Xe = Oe.splice, Ye = We ? We.isConcatSpreadable : o, Ze = We ? We.iterator : o, Qe = We ? We.toStringTag : o, nt = function() {
                        try {
                            var e = pi(Te, "defineProperty");
                            return e({}, "", {}),
                            e
                        } catch (e) {}
                    }(), ot = t.clearTimeout !== vt.clearTimeout && t.clearTimeout, ct = le && le.now !== vt.Date.now && le.now, pt = t.setTimeout !== vt.setTimeout && t.setTimeout, mt = Pe.ceil, ht = Pe.floor, gt = Te.getOwnPropertySymbols, bt = He ? He.isBuffer : o, It = t.isFinite, jt = Oe.join, Kt = cn(Te.keys, Te), bn = Pe.max, In = Pe.min, Cn = le.now, Sn = t.parseInt, wn = Pe.random, xn = Oe.reverse, En = pi(t, "DataView"), Pn = pi(t, "Map"), Tn = pi(t, "Promise"), kn = pi(t, "Set"), Nn = pi(t, "WeakMap"), An = pi(Te, "create"), On = Nn && new Nn, _n = {}, Mn = Bi(En), Rn = Bi(Pn), Ln = Bi(Tn), Dn = Bi(kn), Fn = Bi(Nn), Un = We ? We.prototype : o, Bn = Un ? Un.valueOf : o, jn = Un ? Un.toString : o;
                    function Gn(e) {
                        if (nl(e) && !Va(e) && !(e instanceof Vn)) {
                            if (e instanceof Wn)
                                return e;
                            if (De.call(e, "__wrapped__"))
                                return ji(e)
                        }
                        return new Wn(e)
                    }
                    var zn = function() {
                        function e() {}
                        return function(t) {
                            if (!tl(t))
                                return {};
                            if (Ke)
                                return Ke(t);
                            e.prototype = t;
                            var n = new e;
                            return e.prototype = o,
                            n
                        }
                    }();
                    function Hn() {}
                    function Wn(e, t) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__chain__ = !!t,
                        this.__index__ = 0,
                        this.__values__ = o
                    }
                    function Vn(e) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__dir__ = 1,
                        this.__filtered__ = !1,
                        this.__iteratees__ = [],
                        this.__takeCount__ = h,
                        this.__views__ = []
                    }
                    function Jn(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function qn(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function Kn(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function $n(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.__data__ = new Kn; ++t < n; )
                            this.add(e[t])
                    }
                    function Xn(e) {
                        var t = this.__data__ = new qn(e);
                        this.size = t.size
                    }
                    function Yn(e, t) {
                        var n = Va(e)
                          , r = !n && Wa(e)
                          , o = !n && !r && $a(e)
                          , i = !n && !r && !o && cl(e)
                          , a = n || r || o || i
                          , l = a ? Yt(e.length, Ne) : []
                          , s = l.length;
                        for (var u in e)
                            !t && !De.call(e, u) || a && ("length" == u || o && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || Ii(u, s)) || l.push(u);
                        return l
                    }
                    function Zn(e) {
                        var t = e.length;
                        return t ? e[$r(0, t - 1)] : o
                    }
                    function Qn(e, t) {
                        return Di(Oo(e), sr(t, 0, e.length))
                    }
                    function er(e) {
                        return Di(Oo(e))
                    }
                    function tr(e, t, n) {
                        (n !== o && !Ga(e[t], n) || n === o && !(t in e)) && ar(e, t, n)
                    }
                    function nr(e, t, n) {
                        var r = e[t];
                        De.call(e, t) && Ga(r, n) && (n !== o || t in e) || ar(e, t, n)
                    }
                    function rr(e, t) {
                        for (var n = e.length; n--; )
                            if (Ga(e[n][0], t))
                                return n;
                        return -1
                    }
                    function or(e, t, n, r) {
                        return pr(e, (function(e, o, i) {
                            t(r, e, n(e), i)
                        }
                        )),
                        r
                    }
                    function ir(e, t) {
                        return e && _o(t, _l(t), e)
                    }
                    function ar(e, t, n) {
                        "__proto__" == t && nt ? nt(e, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: n,
                            writable: !0
                        }) : e[t] = n
                    }
                    function lr(e, t) {
                        for (var n = -1, i = t.length, a = r(i), l = null == e; ++n < i; )
                            a[n] = l ? o : Tl(e, t[n]);
                        return a
                    }
                    function sr(e, t, n) {
                        return e == e && (n !== o && (e = e <= n ? e : n),
                        t !== o && (e = e >= t ? e : t)),
                        e
                    }
                    function ur(e, t, n, r, i, a) {
                        var l, s = 1 & t, u = 2 & t, c = 4 & t;
                        if (n && (l = i ? n(e, r, i, a) : n(e)),
                        l !== o)
                            return l;
                        if (!tl(e))
                            return e;
                        var d = Va(e);
                        if (d) {
                            if (l = function(e) {
                                var t = e.length
                                  , n = new e.constructor(t);
                                t && "string" == typeof e[0] && De.call(e, "index") && (n.index = e.index,
                                n.input = e.input);
                                return n
                            }(e),
                            !s)
                                return Oo(e, l)
                        } else {
                            var f = hi(e)
                              , p = f == w || f == x;
                            if ($a(e))
                                return Eo(e, s);
                            if (f == T || f == y || p && !i) {
                                if (l = u || p ? {} : yi(e),
                                !s)
                                    return u ? function(e, t) {
                                        return _o(e, vi(e), t)
                                    }(e, function(e, t) {
                                        return e && _o(t, Ml(t), e)
                                    }(l, e)) : function(e, t) {
                                        return _o(e, mi(e), t)
                                    }(e, ir(l, e))
                            } else {
                                if (!ut[f])
                                    return i ? e : {};
                                l = function(e, t, n) {
                                    var r = e.constructor;
                                    switch (t) {
                                    case R:
                                        return Po(e);
                                    case I:
                                    case C:
                                        return new r(+e);
                                    case L:
                                        return function(e, t) {
                                            var n = t ? Po(e.buffer) : e.buffer;
                                            return new e.constructor(n,e.byteOffset,e.byteLength)
                                        }(e, n);
                                    case D:
                                    case F:
                                    case U:
                                    case B:
                                    case j:
                                    case G:
                                    case z:
                                    case H:
                                    case W:
                                        return To(e, n);
                                    case E:
                                        return new r;
                                    case P:
                                    case O:
                                        return new r(e);
                                    case N:
                                        return function(e) {
                                            var t = new e.constructor(e.source,ve.exec(e));
                                            return t.lastIndex = e.lastIndex,
                                            t
                                        }(e);
                                    case A:
                                        return new r;
                                    case _:
                                        return o = e,
                                        Bn ? Te(Bn.call(o)) : {}
                                    }
                                    var o
                                }(e, f, s)
                            }
                        }
                        a || (a = new Xn);
                        var m = a.get(e);
                        if (m)
                            return m;
                        a.set(e, l),
                        ll(e) ? e.forEach((function(r) {
                            l.add(ur(r, t, n, r, e, a))
                        }
                        )) : rl(e) && e.forEach((function(r, o) {
                            l.set(o, ur(r, t, n, o, e, a))
                        }
                        ));
                        var v = d ? o : (c ? u ? ai : ii : u ? Ml : _l)(e);
                        return Nt(v || e, (function(r, o) {
                            v && (r = e[o = r]),
                            nr(l, o, ur(r, t, n, o, e, a))
                        }
                        )),
                        l
                    }
                    function cr(e, t, n) {
                        var r = n.length;
                        if (null == e)
                            return !r;
                        for (e = Te(e); r--; ) {
                            var i = n[r]
                              , a = t[i]
                              , l = e[i];
                            if (l === o && !(i in e) || !a(l))
                                return !1
                        }
                        return !0
                    }
                    function dr(e, t, n) {
                        if ("function" != typeof e)
                            throw new Ae(i);
                        return _i((function() {
                            e.apply(o, n)
                        }
                        ), t)
                    }
                    function fr(e, t, n, r) {
                        var o = -1
                          , i = Mt
                          , a = !0
                          , l = e.length
                          , s = []
                          , u = t.length;
                        if (!l)
                            return s;
                        n && (t = Lt(t, Qt(n))),
                        r ? (i = Rt,
                        a = !1) : t.length >= 200 && (i = tn,
                        a = !1,
                        t = new $n(t));
                        e: for (; ++o < l; ) {
                            var c = e[o]
                              , d = null == n ? c : n(c);
                            if (c = r || 0 !== c ? c : 0,
                            a && d == d) {
                                for (var f = u; f--; )
                                    if (t[f] === d)
                                        continue e;
                                s.push(c)
                            } else
                                i(t, d, r) || s.push(c)
                        }
                        return s
                    }
                    Gn.templateSettings = {
                        escape: Z,
                        evaluate: Q,
                        interpolate: ee,
                        variable: "",
                        imports: {
                            _: Gn
                        }
                    },
                    Gn.prototype = Hn.prototype,
                    Gn.prototype.constructor = Gn,
                    Wn.prototype = zn(Hn.prototype),
                    Wn.prototype.constructor = Wn,
                    Vn.prototype = zn(Hn.prototype),
                    Vn.prototype.constructor = Vn,
                    Jn.prototype.clear = function() {
                        this.__data__ = An ? An(null) : {},
                        this.size = 0
                    }
                    ,
                    Jn.prototype.delete = function(e) {
                        var t = this.has(e) && delete this.__data__[e];
                        return this.size -= t ? 1 : 0,
                        t
                    }
                    ,
                    Jn.prototype.get = function(e) {
                        var t = this.__data__;
                        if (An) {
                            var n = t[e];
                            return n === a ? o : n
                        }
                        return De.call(t, e) ? t[e] : o
                    }
                    ,
                    Jn.prototype.has = function(e) {
                        var t = this.__data__;
                        return An ? t[e] !== o : De.call(t, e)
                    }
                    ,
                    Jn.prototype.set = function(e, t) {
                        var n = this.__data__;
                        return this.size += this.has(e) ? 0 : 1,
                        n[e] = An && t === o ? a : t,
                        this
                    }
                    ,
                    qn.prototype.clear = function() {
                        this.__data__ = [],
                        this.size = 0
                    }
                    ,
                    qn.prototype.delete = function(e) {
                        var t = this.__data__
                          , n = rr(t, e);
                        return !(n < 0) && (n == t.length - 1 ? t.pop() : Xe.call(t, n, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    qn.prototype.get = function(e) {
                        var t = this.__data__
                          , n = rr(t, e);
                        return n < 0 ? o : t[n][1]
                    }
                    ,
                    qn.prototype.has = function(e) {
                        return rr(this.__data__, e) > -1
                    }
                    ,
                    qn.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = rr(n, e);
                        return r < 0 ? (++this.size,
                        n.push([e, t])) : n[r][1] = t,
                        this
                    }
                    ,
                    Kn.prototype.clear = function() {
                        this.size = 0,
                        this.__data__ = {
                            hash: new Jn,
                            map: new (Pn || qn),
                            string: new Jn
                        }
                    }
                    ,
                    Kn.prototype.delete = function(e) {
                        var t = di(this, e).delete(e);
                        return this.size -= t ? 1 : 0,
                        t
                    }
                    ,
                    Kn.prototype.get = function(e) {
                        return di(this, e).get(e)
                    }
                    ,
                    Kn.prototype.has = function(e) {
                        return di(this, e).has(e)
                    }
                    ,
                    Kn.prototype.set = function(e, t) {
                        var n = di(this, e)
                          , r = n.size;
                        return n.set(e, t),
                        this.size += n.size == r ? 0 : 1,
                        this
                    }
                    ,
                    $n.prototype.add = $n.prototype.push = function(e) {
                        return this.__data__.set(e, a),
                        this
                    }
                    ,
                    $n.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Xn.prototype.clear = function() {
                        this.__data__ = new qn,
                        this.size = 0
                    }
                    ,
                    Xn.prototype.delete = function(e) {
                        var t = this.__data__
                          , n = t.delete(e);
                        return this.size = t.size,
                        n
                    }
                    ,
                    Xn.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    Xn.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Xn.prototype.set = function(e, t) {
                        var n = this.__data__;
                        if (n instanceof qn) {
                            var r = n.__data__;
                            if (!Pn || r.length < 199)
                                return r.push([e, t]),
                                this.size = ++n.size,
                                this;
                            n = this.__data__ = new Kn(r)
                        }
                        return n.set(e, t),
                        this.size = n.size,
                        this
                    }
                    ;
                    var pr = Lo(Cr)
                      , mr = Lo(Sr, !0);
                    function vr(e, t) {
                        var n = !0;
                        return pr(e, (function(e, r, o) {
                            return n = !!t(e, r, o)
                        }
                        )),
                        n
                    }
                    function hr(e, t, n) {
                        for (var r = -1, i = e.length; ++r < i; ) {
                            var a = e[r]
                              , l = t(a);
                            if (null != l && (s === o ? l == l && !ul(l) : n(l, s)))
                                var s = l
                                  , u = a
                        }
                        return u
                    }
                    function gr(e, t) {
                        var n = [];
                        return pr(e, (function(e, r, o) {
                            t(e, r, o) && n.push(e)
                        }
                        )),
                        n
                    }
                    function yr(e, t, n, r, o) {
                        var i = -1
                          , a = e.length;
                        for (n || (n = bi),
                        o || (o = []); ++i < a; ) {
                            var l = e[i];
                            t > 0 && n(l) ? t > 1 ? yr(l, t - 1, n, r, o) : Dt(o, l) : r || (o[o.length] = l)
                        }
                        return o
                    }
                    var br = Do()
                      , Ir = Do(!0);
                    function Cr(e, t) {
                        return e && br(e, t, _l)
                    }
                    function Sr(e, t) {
                        return e && Ir(e, t, _l)
                    }
                    function wr(e, t) {
                        return _t(t, (function(t) {
                            return Za(e[t])
                        }
                        ))
                    }
                    function xr(e, t) {
                        for (var n = 0, r = (t = Co(t, e)).length; null != e && n < r; )
                            e = e[Ui(t[n++])];
                        return n && n == r ? e : o
                    }
                    function Er(e, t, n) {
                        var r = t(e);
                        return Va(e) ? r : Dt(r, n(e))
                    }
                    function Pr(e) {
                        return null == e ? e === o ? "[object Undefined]" : "[object Null]" : Qe && Qe in Te(e) ? function(e) {
                            var t = De.call(e, Qe)
                              , n = e[Qe];
                            try {
                                e[Qe] = o;
                                var r = !0
                            } catch (e) {}
                            var i = Be.call(e);
                            r && (t ? e[Qe] = n : delete e[Qe]);
                            return i
                        }(e) : function(e) {
                            return Be.call(e)
                        }(e)
                    }
                    function Tr(e, t) {
                        return e > t
                    }
                    function kr(e, t) {
                        return null != e && De.call(e, t)
                    }
                    function Nr(e, t) {
                        return null != e && t in Te(e)
                    }
                    function Ar(e, t, n) {
                        for (var i = n ? Rt : Mt, a = e[0].length, l = e.length, s = l, u = r(l), c = 1 / 0, d = []; s--; ) {
                            var f = e[s];
                            s && t && (f = Lt(f, Qt(t))),
                            c = In(f.length, c),
                            u[s] = !n && (t || a >= 120 && f.length >= 120) ? new $n(s && f) : o
                        }
                        f = e[0];
                        var p = -1
                          , m = u[0];
                        e: for (; ++p < a && d.length < c; ) {
                            var v = f[p]
                              , h = t ? t(v) : v;
                            if (v = n || 0 !== v ? v : 0,
                            !(m ? tn(m, h) : i(d, h, n))) {
                                for (s = l; --s; ) {
                                    var g = u[s];
                                    if (!(g ? tn(g, h) : i(e[s], h, n)))
                                        continue e
                                }
                                m && m.push(h),
                                d.push(v)
                            }
                        }
                        return d
                    }
                    function Or(e, t, n) {
                        var r = null == (e = Ni(e, t = Co(t, e))) ? e : e[Ui(Yi(t))];
                        return null == r ? o : Tt(r, e, n)
                    }
                    function _r(e) {
                        return nl(e) && Pr(e) == y
                    }
                    function Mr(e, t, n, r, i) {
                        return e === t || (null == e || null == t || !nl(e) && !nl(t) ? e != e && t != t : function(e, t, n, r, i, a) {
                            var l = Va(e)
                              , s = Va(t)
                              , u = l ? b : hi(e)
                              , c = s ? b : hi(t)
                              , d = (u = u == y ? T : u) == T
                              , f = (c = c == y ? T : c) == T
                              , p = u == c;
                            if (p && $a(e)) {
                                if (!$a(t))
                                    return !1;
                                l = !0,
                                d = !1
                            }
                            if (p && !d)
                                return a || (a = new Xn),
                                l || cl(e) ? ri(e, t, n, r, i, a) : function(e, t, n, r, o, i, a) {
                                    switch (n) {
                                    case L:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                                            return !1;
                                        e = e.buffer,
                                        t = t.buffer;
                                    case R:
                                        return !(e.byteLength != t.byteLength || !i(new Ve(e), new Ve(t)));
                                    case I:
                                    case C:
                                    case P:
                                        return Ga(+e, +t);
                                    case S:
                                        return e.name == t.name && e.message == t.message;
                                    case N:
                                    case O:
                                        return e == t + "";
                                    case E:
                                        var l = un;
                                    case A:
                                        var s = 1 & r;
                                        if (l || (l = fn),
                                        e.size != t.size && !s)
                                            return !1;
                                        var u = a.get(e);
                                        if (u)
                                            return u == t;
                                        r |= 2,
                                        a.set(e, t);
                                        var c = ri(l(e), l(t), r, o, i, a);
                                        return a.delete(e),
                                        c;
                                    case _:
                                        if (Bn)
                                            return Bn.call(e) == Bn.call(t)
                                    }
                                    return !1
                                }(e, t, u, n, r, i, a);
                            if (!(1 & n)) {
                                var m = d && De.call(e, "__wrapped__")
                                  , v = f && De.call(t, "__wrapped__");
                                if (m || v) {
                                    var h = m ? e.value() : e
                                      , g = v ? t.value() : t;
                                    return a || (a = new Xn),
                                    i(h, g, n, r, a)
                                }
                            }
                            if (!p)
                                return !1;
                            return a || (a = new Xn),
                            function(e, t, n, r, i, a) {
                                var l = 1 & n
                                  , s = ii(e)
                                  , u = s.length
                                  , c = ii(t)
                                  , d = c.length;
                                if (u != d && !l)
                                    return !1;
                                var f = u;
                                for (; f--; ) {
                                    var p = s[f];
                                    if (!(l ? p in t : De.call(t, p)))
                                        return !1
                                }
                                var m = a.get(e)
                                  , v = a.get(t);
                                if (m && v)
                                    return m == t && v == e;
                                var h = !0;
                                a.set(e, t),
                                a.set(t, e);
                                var g = l;
                                for (; ++f < u; ) {
                                    var y = e[p = s[f]]
                                      , b = t[p];
                                    if (r)
                                        var I = l ? r(b, y, p, t, e, a) : r(y, b, p, e, t, a);
                                    if (!(I === o ? y === b || i(y, b, n, r, a) : I)) {
                                        h = !1;
                                        break
                                    }
                                    g || (g = "constructor" == p)
                                }
                                if (h && !g) {
                                    var C = e.constructor
                                      , S = t.constructor;
                                    C == S || !("constructor"in e) || !("constructor"in t) || "function" == typeof C && C instanceof C && "function" == typeof S && S instanceof S || (h = !1)
                                }
                                return a.delete(e),
                                a.delete(t),
                                h
                            }(e, t, n, r, i, a)
                        }(e, t, n, r, Mr, i))
                    }
                    function Rr(e, t, n, r) {
                        var i = n.length
                          , a = i
                          , l = !r;
                        if (null == e)
                            return !a;
                        for (e = Te(e); i--; ) {
                            var s = n[i];
                            if (l && s[2] ? s[1] !== e[s[0]] : !(s[0]in e))
                                return !1
                        }
                        for (; ++i < a; ) {
                            var u = (s = n[i])[0]
                              , c = e[u]
                              , d = s[1];
                            if (l && s[2]) {
                                if (c === o && !(u in e))
                                    return !1
                            } else {
                                var f = new Xn;
                                if (r)
                                    var p = r(c, d, u, e, t, f);
                                if (!(p === o ? Mr(d, c, 3, r, f) : p))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function Lr(e) {
                        return !(!tl(e) || (t = e,
                        Ue && Ue in t)) && (Za(e) ? ze : ye).test(Bi(e));
                        var t
                    }
                    function Dr(e) {
                        return "function" == typeof e ? e : null == e ? os : "object" == typeof e ? Va(e) ? zr(e[0], e[1]) : Gr(e) : ps(e)
                    }
                    function Fr(e) {
                        if (!Ei(e))
                            return Kt(e);
                        var t = [];
                        for (var n in Te(e))
                            De.call(e, n) && "constructor" != n && t.push(n);
                        return t
                    }
                    function Ur(e) {
                        if (!tl(e))
                            return function(e) {
                                var t = [];
                                if (null != e)
                                    for (var n in Te(e))
                                        t.push(n);
                                return t
                            }(e);
                        var t = Ei(e)
                          , n = [];
                        for (var r in e)
                            ("constructor" != r || !t && De.call(e, r)) && n.push(r);
                        return n
                    }
                    function Br(e, t) {
                        return e < t
                    }
                    function jr(e, t) {
                        var n = -1
                          , o = qa(e) ? r(e.length) : [];
                        return pr(e, (function(e, r, i) {
                            o[++n] = t(e, r, i)
                        }
                        )),
                        o
                    }
                    function Gr(e) {
                        var t = fi(e);
                        return 1 == t.length && t[0][2] ? Ti(t[0][0], t[0][1]) : function(n) {
                            return n === e || Rr(n, e, t)
                        }
                    }
                    function zr(e, t) {
                        return Si(e) && Pi(t) ? Ti(Ui(e), t) : function(n) {
                            var r = Tl(n, e);
                            return r === o && r === t ? kl(n, e) : Mr(t, r, 3)
                        }
                    }
                    function Hr(e, t, n, r, i) {
                        e !== t && br(t, (function(a, l) {
                            if (i || (i = new Xn),
                            tl(a))
                                !function(e, t, n, r, i, a, l) {
                                    var s = Ai(e, n)
                                      , u = Ai(t, n)
                                      , c = l.get(u);
                                    if (c)
                                        return void tr(e, n, c);
                                    var d = a ? a(s, u, n + "", e, t, l) : o
                                      , f = d === o;
                                    if (f) {
                                        var p = Va(u)
                                          , m = !p && $a(u)
                                          , v = !p && !m && cl(u);
                                        d = u,
                                        p || m || v ? Va(s) ? d = s : Ka(s) ? d = Oo(s) : m ? (f = !1,
                                        d = Eo(u, !0)) : v ? (f = !1,
                                        d = To(u, !0)) : d = [] : il(u) || Wa(u) ? (d = s,
                                        Wa(s) ? d = yl(s) : tl(s) && !Za(s) || (d = yi(u))) : f = !1
                                    }
                                    f && (l.set(u, d),
                                    i(d, u, r, a, l),
                                    l.delete(u));
                                    tr(e, n, d)
                                }(e, t, l, n, Hr, r, i);
                            else {
                                var s = r ? r(Ai(e, l), a, l + "", e, t, i) : o;
                                s === o && (s = a),
                                tr(e, l, s)
                            }
                        }
                        ), Ml)
                    }
                    function Wr(e, t) {
                        var n = e.length;
                        if (n)
                            return Ii(t += t < 0 ? n : 0, n) ? e[t] : o
                    }
                    function Vr(e, t, n) {
                        t = t.length ? Lt(t, (function(e) {
                            return Va(e) ? function(t) {
                                return xr(t, 1 === e.length ? e[0] : e)
                            }
                            : e
                        }
                        )) : [os];
                        var r = -1;
                        t = Lt(t, Qt(ci()));
                        var o = jr(e, (function(e, n, o) {
                            var i = Lt(t, (function(t) {
                                return t(e)
                            }
                            ));
                            return {
                                criteria: i,
                                index: ++r,
                                value: e
                            }
                        }
                        ));
                        return function(e, t) {
                            var n = e.length;
                            for (e.sort(t); n--; )
                                e[n] = e[n].value;
                            return e
                        }(o, (function(e, t) {
                            return function(e, t, n) {
                                var r = -1
                                  , o = e.criteria
                                  , i = t.criteria
                                  , a = o.length
                                  , l = n.length;
                                for (; ++r < a; ) {
                                    var s = ko(o[r], i[r]);
                                    if (s)
                                        return r >= l ? s : s * ("desc" == n[r] ? -1 : 1)
                                }
                                return e.index - t.index
                            }(e, t, n)
                        }
                        ))
                    }
                    function Jr(e, t, n) {
                        for (var r = -1, o = t.length, i = {}; ++r < o; ) {
                            var a = t[r]
                              , l = xr(e, a);
                            n(l, a) && eo(i, Co(a, e), l)
                        }
                        return i
                    }
                    function qr(e, t, n, r) {
                        var o = r ? Wt : Ht
                          , i = -1
                          , a = t.length
                          , l = e;
                        for (e === t && (t = Oo(t)),
                        n && (l = Lt(e, Qt(n))); ++i < a; )
                            for (var s = 0, u = t[i], c = n ? n(u) : u; (s = o(l, c, s, r)) > -1; )
                                l !== e && Xe.call(l, s, 1),
                                Xe.call(e, s, 1);
                        return e
                    }
                    function Kr(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o = t[n];
                            if (n == r || o !== i) {
                                var i = o;
                                Ii(o) ? Xe.call(e, o, 1) : po(e, o)
                            }
                        }
                        return e
                    }
                    function $r(e, t) {
                        return e + ht(wn() * (t - e + 1))
                    }
                    function Xr(e, t) {
                        var n = "";
                        if (!e || t < 1 || t > m)
                            return n;
                        do {
                            t % 2 && (n += e),
                            (t = ht(t / 2)) && (e += e)
                        } while (t);
                        return n
                    }
                    function Yr(e, t) {
                        return Mi(ki(e, t, os), e + "")
                    }
                    function Zr(e) {
                        return Zn(Gl(e))
                    }
                    function Qr(e, t) {
                        var n = Gl(e);
                        return Di(n, sr(t, 0, n.length))
                    }
                    function eo(e, t, n, r) {
                        if (!tl(e))
                            return e;
                        for (var i = -1, a = (t = Co(t, e)).length, l = a - 1, s = e; null != s && ++i < a; ) {
                            var u = Ui(t[i])
                              , c = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u)
                                return e;
                            if (i != l) {
                                var d = s[u];
                                (c = r ? r(d, u, s) : o) === o && (c = tl(d) ? d : Ii(t[i + 1]) ? [] : {})
                            }
                            nr(s, u, c),
                            s = s[u]
                        }
                        return e
                    }
                    var to = On ? function(e, t) {
                        return On.set(e, t),
                        e
                    }
                    : os
                      , no = nt ? function(e, t) {
                        return nt(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: ts(t),
                            writable: !0
                        })
                    }
                    : os;
                    function ro(e) {
                        return Di(Gl(e))
                    }
                    function oo(e, t, n) {
                        var o = -1
                          , i = e.length;
                        t < 0 && (t = -t > i ? 0 : i + t),
                        (n = n > i ? i : n) < 0 && (n += i),
                        i = t > n ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var a = r(i); ++o < i; )
                            a[o] = e[o + t];
                        return a
                    }
                    function io(e, t) {
                        var n;
                        return pr(e, (function(e, r, o) {
                            return !(n = t(e, r, o))
                        }
                        )),
                        !!n
                    }
                    function ao(e, t, n) {
                        var r = 0
                          , o = null == e ? r : e.length;
                        if ("number" == typeof t && t == t && o <= 2147483647) {
                            for (; r < o; ) {
                                var i = r + o >>> 1
                                  , a = e[i];
                                null !== a && !ul(a) && (n ? a <= t : a < t) ? r = i + 1 : o = i
                            }
                            return o
                        }
                        return lo(e, t, os, n)
                    }
                    function lo(e, t, n, r) {
                        var i = 0
                          , a = null == e ? 0 : e.length;
                        if (0 === a)
                            return 0;
                        for (var l = (t = n(t)) != t, s = null === t, u = ul(t), c = t === o; i < a; ) {
                            var d = ht((i + a) / 2)
                              , f = n(e[d])
                              , p = f !== o
                              , m = null === f
                              , v = f == f
                              , h = ul(f);
                            if (l)
                                var g = r || v;
                            else
                                g = c ? v && (r || p) : s ? v && p && (r || !m) : u ? v && p && !m && (r || !h) : !m && !h && (r ? f <= t : f < t);
                            g ? i = d + 1 : a = d
                        }
                        return In(a, 4294967294)
                    }
                    function so(e, t) {
                        for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                            var a = e[n]
                              , l = t ? t(a) : a;
                            if (!n || !Ga(l, s)) {
                                var s = l;
                                i[o++] = 0 === a ? 0 : a
                            }
                        }
                        return i
                    }
                    function uo(e) {
                        return "number" == typeof e ? e : ul(e) ? v : +e
                    }
                    function co(e) {
                        if ("string" == typeof e)
                            return e;
                        if (Va(e))
                            return Lt(e, co) + "";
                        if (ul(e))
                            return jn ? jn.call(e) : "";
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function fo(e, t, n) {
                        var r = -1
                          , o = Mt
                          , i = e.length
                          , a = !0
                          , l = []
                          , s = l;
                        if (n)
                            a = !1,
                            o = Rt;
                        else if (i >= 200) {
                            var u = t ? null : Yo(e);
                            if (u)
                                return fn(u);
                            a = !1,
                            o = tn,
                            s = new $n
                        } else
                            s = t ? [] : l;
                        e: for (; ++r < i; ) {
                            var c = e[r]
                              , d = t ? t(c) : c;
                            if (c = n || 0 !== c ? c : 0,
                            a && d == d) {
                                for (var f = s.length; f--; )
                                    if (s[f] === d)
                                        continue e;
                                t && s.push(d),
                                l.push(c)
                            } else
                                o(s, d, n) || (s !== l && s.push(d),
                                l.push(c))
                        }
                        return l
                    }
                    function po(e, t) {
                        return null == (e = Ni(e, t = Co(t, e))) || delete e[Ui(Yi(t))]
                    }
                    function mo(e, t, n, r) {
                        return eo(e, t, n(xr(e, t)), r)
                    }
                    function vo(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? oo(e, r ? 0 : i, r ? i + 1 : o) : oo(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function ho(e, t) {
                        var n = e;
                        return n instanceof Vn && (n = n.value()),
                        Ft(t, (function(e, t) {
                            return t.func.apply(t.thisArg, Dt([e], t.args))
                        }
                        ), n)
                    }
                    function go(e, t, n) {
                        var o = e.length;
                        if (o < 2)
                            return o ? fo(e[0]) : [];
                        for (var i = -1, a = r(o); ++i < o; )
                            for (var l = e[i], s = -1; ++s < o; )
                                s != i && (a[i] = fr(a[i] || l, e[s], t, n));
                        return fo(yr(a, 1), t, n)
                    }
                    function yo(e, t, n) {
                        for (var r = -1, i = e.length, a = t.length, l = {}; ++r < i; ) {
                            var s = r < a ? t[r] : o;
                            n(l, e[r], s)
                        }
                        return l
                    }
                    function bo(e) {
                        return Ka(e) ? e : []
                    }
                    function Io(e) {
                        return "function" == typeof e ? e : os
                    }
                    function Co(e, t) {
                        return Va(e) ? e : Si(e, t) ? [e] : Fi(bl(e))
                    }
                    var So = Yr;
                    function wo(e, t, n) {
                        var r = e.length;
                        return n = n === o ? r : n,
                        !t && n >= r ? e : oo(e, t, n)
                    }
                    var xo = ot || function(e) {
                        return vt.clearTimeout(e)
                    }
                    ;
                    function Eo(e, t) {
                        if (t)
                            return e.slice();
                        var n = e.length
                          , r = Je ? Je(n) : new e.constructor(n);
                        return e.copy(r),
                        r
                    }
                    function Po(e) {
                        var t = new e.constructor(e.byteLength);
                        return new Ve(t).set(new Ve(e)),
                        t
                    }
                    function To(e, t) {
                        var n = t ? Po(e.buffer) : e.buffer;
                        return new e.constructor(n,e.byteOffset,e.length)
                    }
                    function ko(e, t) {
                        if (e !== t) {
                            var n = e !== o
                              , r = null === e
                              , i = e == e
                              , a = ul(e)
                              , l = t !== o
                              , s = null === t
                              , u = t == t
                              , c = ul(t);
                            if (!s && !c && !a && e > t || a && l && u && !s && !c || r && l && u || !n && u || !i)
                                return 1;
                            if (!r && !a && !c && e < t || c && n && i && !r && !a || s && n && i || !l && i || !u)
                                return -1
                        }
                        return 0
                    }
                    function No(e, t, n, o) {
                        for (var i = -1, a = e.length, l = n.length, s = -1, u = t.length, c = bn(a - l, 0), d = r(u + c), f = !o; ++s < u; )
                            d[s] = t[s];
                        for (; ++i < l; )
                            (f || i < a) && (d[n[i]] = e[i]);
                        for (; c--; )
                            d[s++] = e[i++];
                        return d
                    }
                    function Ao(e, t, n, o) {
                        for (var i = -1, a = e.length, l = -1, s = n.length, u = -1, c = t.length, d = bn(a - s, 0), f = r(d + c), p = !o; ++i < d; )
                            f[i] = e[i];
                        for (var m = i; ++u < c; )
                            f[m + u] = t[u];
                        for (; ++l < s; )
                            (p || i < a) && (f[m + n[l]] = e[i++]);
                        return f
                    }
                    function Oo(e, t) {
                        var n = -1
                          , o = e.length;
                        for (t || (t = r(o)); ++n < o; )
                            t[n] = e[n];
                        return t
                    }
                    function _o(e, t, n, r) {
                        var i = !n;
                        n || (n = {});
                        for (var a = -1, l = t.length; ++a < l; ) {
                            var s = t[a]
                              , u = r ? r(n[s], e[s], s, n, e) : o;
                            u === o && (u = e[s]),
                            i ? ar(n, s, u) : nr(n, s, u)
                        }
                        return n
                    }
                    function Mo(e, t) {
                        return function(n, r) {
                            var o = Va(n) ? kt : or
                              , i = t ? t() : {};
                            return o(n, e, ci(r, 2), i)
                        }
                    }
                    function Ro(e) {
                        return Yr((function(t, n) {
                            var r = -1
                              , i = n.length
                              , a = i > 1 ? n[i - 1] : o
                              , l = i > 2 ? n[2] : o;
                            for (a = e.length > 3 && "function" == typeof a ? (i--,
                            a) : o,
                            l && Ci(n[0], n[1], l) && (a = i < 3 ? o : a,
                            i = 1),
                            t = Te(t); ++r < i; ) {
                                var s = n[r];
                                s && e(t, s, r, a)
                            }
                            return t
                        }
                        ))
                    }
                    function Lo(e, t) {
                        return function(n, r) {
                            if (null == n)
                                return n;
                            if (!qa(n))
                                return e(n, r);
                            for (var o = n.length, i = t ? o : -1, a = Te(n); (t ? i-- : ++i < o) && !1 !== r(a[i], i, a); )
                                ;
                            return n
                        }
                    }
                    function Do(e) {
                        return function(t, n, r) {
                            for (var o = -1, i = Te(t), a = r(t), l = a.length; l--; ) {
                                var s = a[e ? l : ++o];
                                if (!1 === n(i[s], s, i))
                                    break
                            }
                            return t
                        }
                    }
                    function Fo(e) {
                        return function(t) {
                            var n = sn(t = bl(t)) ? vn(t) : o
                              , r = n ? n[0] : t.charAt(0)
                              , i = n ? wo(n, 1).join("") : t.slice(1);
                            return r[e]() + i
                        }
                    }
                    function Uo(e) {
                        return function(t) {
                            return Ft(Zl(Wl(t).replace(et, "")), e, "")
                        }
                    }
                    function Bo(e) {
                        return function() {
                            var t = arguments;
                            switch (t.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t[0]);
                            case 2:
                                return new e(t[0],t[1]);
                            case 3:
                                return new e(t[0],t[1],t[2]);
                            case 4:
                                return new e(t[0],t[1],t[2],t[3]);
                            case 5:
                                return new e(t[0],t[1],t[2],t[3],t[4]);
                            case 6:
                                return new e(t[0],t[1],t[2],t[3],t[4],t[5]);
                            case 7:
                                return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                            }
                            var n = zn(e.prototype)
                              , r = e.apply(n, t);
                            return tl(r) ? r : n
                        }
                    }
                    function jo(e) {
                        return function(t, n, r) {
                            var i = Te(t);
                            if (!qa(t)) {
                                var a = ci(n, 3);
                                t = _l(t),
                                n = function(e) {
                                    return a(i[e], e, i)
                                }
                            }
                            var l = e(t, n, r);
                            return l > -1 ? i[a ? t[l] : l] : o
                        }
                    }
                    function Go(e) {
                        return oi((function(t) {
                            var n = t.length
                              , r = n
                              , a = Wn.prototype.thru;
                            for (e && t.reverse(); r--; ) {
                                var l = t[r];
                                if ("function" != typeof l)
                                    throw new Ae(i);
                                if (a && !s && "wrapper" == si(l))
                                    var s = new Wn([],!0)
                            }
                            for (r = s ? r : n; ++r < n; ) {
                                var u = si(l = t[r])
                                  , c = "wrapper" == u ? li(l) : o;
                                s = c && wi(c[0]) && 424 == c[1] && !c[4].length && 1 == c[9] ? s[si(c[0])].apply(s, c[3]) : 1 == l.length && wi(l) ? s[u]() : s.thru(l)
                            }
                            return function() {
                                var e = arguments
                                  , r = e[0];
                                if (s && 1 == e.length && Va(r))
                                    return s.plant(r).value();
                                for (var o = 0, i = n ? t[o].apply(this, e) : r; ++o < n; )
                                    i = t[o].call(this, i);
                                return i
                            }
                        }
                        ))
                    }
                    function zo(e, t, n, i, a, l, s, u, c, f) {
                        var p = t & d
                          , m = 1 & t
                          , v = 2 & t
                          , h = 24 & t
                          , g = 512 & t
                          , y = v ? o : Bo(e);
                        return function d() {
                            for (var b = arguments.length, I = r(b), C = b; C--; )
                                I[C] = arguments[C];
                            if (h)
                                var S = ui(d)
                                  , w = function(e, t) {
                                    for (var n = e.length, r = 0; n--; )
                                        e[n] === t && ++r;
                                    return r
                                }(I, S);
                            if (i && (I = No(I, i, a, h)),
                            l && (I = Ao(I, l, s, h)),
                            b -= w,
                            h && b < f) {
                                var x = dn(I, S);
                                return $o(e, t, zo, d.placeholder, n, I, x, u, c, f - b)
                            }
                            var E = m ? n : this
                              , P = v ? E[e] : e;
                            return b = I.length,
                            u ? I = function(e, t) {
                                var n = e.length
                                  , r = In(t.length, n)
                                  , i = Oo(e);
                                for (; r--; ) {
                                    var a = t[r];
                                    e[r] = Ii(a, n) ? i[a] : o
                                }
                                return e
                            }(I, u) : g && b > 1 && I.reverse(),
                            p && c < b && (I.length = c),
                            this && this !== vt && this instanceof d && (P = y || Bo(P)),
                            P.apply(E, I)
                        }
                    }
                    function Ho(e, t) {
                        return function(n, r) {
                            return function(e, t, n, r) {
                                return Cr(e, (function(e, o, i) {
                                    t(r, n(e), o, i)
                                }
                                )),
                                r
                            }(n, e, t(r), {})
                        }
                    }
                    function Wo(e, t) {
                        return function(n, r) {
                            var i;
                            if (n === o && r === o)
                                return t;
                            if (n !== o && (i = n),
                            r !== o) {
                                if (i === o)
                                    return r;
                                "string" == typeof n || "string" == typeof r ? (n = co(n),
                                r = co(r)) : (n = uo(n),
                                r = uo(r)),
                                i = e(n, r)
                            }
                            return i
                        }
                    }
                    function Vo(e) {
                        return oi((function(t) {
                            return t = Lt(t, Qt(ci())),
                            Yr((function(n) {
                                var r = this;
                                return e(t, (function(e) {
                                    return Tt(e, r, n)
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }
                    function Jo(e, t) {
                        var n = (t = t === o ? " " : co(t)).length;
                        if (n < 2)
                            return n ? Xr(t, e) : t;
                        var r = Xr(t, mt(e / mn(t)));
                        return sn(t) ? wo(vn(r), 0, e).join("") : r.slice(0, e)
                    }
                    function qo(e) {
                        return function(t, n, i) {
                            return i && "number" != typeof i && Ci(t, n, i) && (n = i = o),
                            t = ml(t),
                            n === o ? (n = t,
                            t = 0) : n = ml(n),
                            function(e, t, n, o) {
                                for (var i = -1, a = bn(mt((t - e) / (n || 1)), 0), l = r(a); a--; )
                                    l[o ? a : ++i] = e,
                                    e += n;
                                return l
                            }(t, n, i = i === o ? t < n ? 1 : -1 : ml(i), e)
                        }
                    }
                    function Ko(e) {
                        return function(t, n) {
                            return "string" == typeof t && "string" == typeof n || (t = gl(t),
                            n = gl(n)),
                            e(t, n)
                        }
                    }
                    function $o(e, t, n, r, i, a, l, s, d, f) {
                        var p = 8 & t;
                        t |= p ? u : c,
                        4 & (t &= ~(p ? c : u)) || (t &= -4);
                        var m = [e, t, i, p ? a : o, p ? l : o, p ? o : a, p ? o : l, s, d, f]
                          , v = n.apply(o, m);
                        return wi(e) && Oi(v, m),
                        v.placeholder = r,
                        Ri(v, e, t)
                    }
                    function Xo(e) {
                        var t = Pe[e];
                        return function(e, n) {
                            if (e = gl(e),
                            (n = null == n ? 0 : In(vl(n), 292)) && It(e)) {
                                var r = (bl(e) + "e").split("e");
                                return +((r = (bl(t(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n))
                            }
                            return t(e)
                        }
                    }
                    var Yo = kn && 1 / fn(new kn([, -0]))[1] == p ? function(e) {
                        return new kn(e)
                    }
                    : us;
                    function Zo(e) {
                        return function(t) {
                            var n = hi(t);
                            return n == E ? un(t) : n == A ? pn(t) : function(e, t) {
                                return Lt(t, (function(t) {
                                    return [t, e[t]]
                                }
                                ))
                            }(t, e(t))
                        }
                    }
                    function Qo(e, t, n, a, p, m, v, h) {
                        var g = 2 & t;
                        if (!g && "function" != typeof e)
                            throw new Ae(i);
                        var y = a ? a.length : 0;
                        if (y || (t &= -97,
                        a = p = o),
                        v = v === o ? v : bn(vl(v), 0),
                        h = h === o ? h : vl(h),
                        y -= p ? p.length : 0,
                        t & c) {
                            var b = a
                              , I = p;
                            a = p = o
                        }
                        var C = g ? o : li(e)
                          , S = [e, t, n, a, p, b, I, m, v, h];
                        if (C && function(e, t) {
                            var n = e[1]
                              , r = t[1]
                              , o = n | r
                              , i = o < 131
                              , a = r == d && 8 == n || r == d && n == f && e[7].length <= t[8] || 384 == r && t[7].length <= t[8] && 8 == n;
                            if (!i && !a)
                                return e;
                            1 & r && (e[2] = t[2],
                            o |= 1 & n ? 0 : 4);
                            var s = t[3];
                            if (s) {
                                var u = e[3];
                                e[3] = u ? No(u, s, t[4]) : s,
                                e[4] = u ? dn(e[3], l) : t[4]
                            }
                            (s = t[5]) && (u = e[5],
                            e[5] = u ? Ao(u, s, t[6]) : s,
                            e[6] = u ? dn(e[5], l) : t[6]);
                            (s = t[7]) && (e[7] = s);
                            r & d && (e[8] = null == e[8] ? t[8] : In(e[8], t[8]));
                            null == e[9] && (e[9] = t[9]);
                            e[0] = t[0],
                            e[1] = o
                        }(S, C),
                        e = S[0],
                        t = S[1],
                        n = S[2],
                        a = S[3],
                        p = S[4],
                        !(h = S[9] = S[9] === o ? g ? 0 : e.length : bn(S[9] - y, 0)) && 24 & t && (t &= -25),
                        t && 1 != t)
                            w = 8 == t || t == s ? function(e, t, n) {
                                var i = Bo(e);
                                return function a() {
                                    for (var l = arguments.length, s = r(l), u = l, c = ui(a); u--; )
                                        s[u] = arguments[u];
                                    var d = l < 3 && s[0] !== c && s[l - 1] !== c ? [] : dn(s, c);
                                    return (l -= d.length) < n ? $o(e, t, zo, a.placeholder, o, s, d, o, o, n - l) : Tt(this && this !== vt && this instanceof a ? i : e, this, s)
                                }
                            }(e, t, h) : t != u && 33 != t || p.length ? zo.apply(o, S) : function(e, t, n, o) {
                                var i = 1 & t
                                  , a = Bo(e);
                                return function t() {
                                    for (var l = -1, s = arguments.length, u = -1, c = o.length, d = r(c + s), f = this && this !== vt && this instanceof t ? a : e; ++u < c; )
                                        d[u] = o[u];
                                    for (; s--; )
                                        d[u++] = arguments[++l];
                                    return Tt(f, i ? n : this, d)
                                }
                            }(e, t, n, a);
                        else
                            var w = function(e, t, n) {
                                var r = 1 & t
                                  , o = Bo(e);
                                return function t() {
                                    return (this && this !== vt && this instanceof t ? o : e).apply(r ? n : this, arguments)
                                }
                            }(e, t, n);
                        return Ri((C ? to : Oi)(w, S), e, t)
                    }
                    function ei(e, t, n, r) {
                        return e === o || Ga(e, Me[n]) && !De.call(r, n) ? t : e
                    }
                    function ti(e, t, n, r, i, a) {
                        return tl(e) && tl(t) && (a.set(t, e),
                        Hr(e, t, o, ti, a),
                        a.delete(t)),
                        e
                    }
                    function ni(e) {
                        return il(e) ? o : e
                    }
                    function ri(e, t, n, r, i, a) {
                        var l = 1 & n
                          , s = e.length
                          , u = t.length;
                        if (s != u && !(l && u > s))
                            return !1;
                        var c = a.get(e)
                          , d = a.get(t);
                        if (c && d)
                            return c == t && d == e;
                        var f = -1
                          , p = !0
                          , m = 2 & n ? new $n : o;
                        for (a.set(e, t),
                        a.set(t, e); ++f < s; ) {
                            var v = e[f]
                              , h = t[f];
                            if (r)
                                var g = l ? r(h, v, f, t, e, a) : r(v, h, f, e, t, a);
                            if (g !== o) {
                                if (g)
                                    continue;
                                p = !1;
                                break
                            }
                            if (m) {
                                if (!Bt(t, (function(e, t) {
                                    if (!tn(m, t) && (v === e || i(v, e, n, r, a)))
                                        return m.push(t)
                                }
                                ))) {
                                    p = !1;
                                    break
                                }
                            } else if (v !== h && !i(v, h, n, r, a)) {
                                p = !1;
                                break
                            }
                        }
                        return a.delete(e),
                        a.delete(t),
                        p
                    }
                    function oi(e) {
                        return Mi(ki(e, o, Ji), e + "")
                    }
                    function ii(e) {
                        return Er(e, _l, mi)
                    }
                    function ai(e) {
                        return Er(e, Ml, vi)
                    }
                    var li = On ? function(e) {
                        return On.get(e)
                    }
                    : us;
                    function si(e) {
                        for (var t = e.name + "", n = _n[t], r = De.call(_n, t) ? n.length : 0; r--; ) {
                            var o = n[r]
                              , i = o.func;
                            if (null == i || i == e)
                                return o.name
                        }
                        return t
                    }
                    function ui(e) {
                        return (De.call(Gn, "placeholder") ? Gn : e).placeholder
                    }
                    function ci() {
                        var e = Gn.iteratee || is;
                        return e = e === is ? Dr : e,
                        arguments.length ? e(arguments[0], arguments[1]) : e
                    }
                    function di(e, t) {
                        var n, r, o = e.__data__;
                        return ("string" == (r = typeof (n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof t ? "string" : "hash"] : o.map
                    }
                    function fi(e) {
                        for (var t = _l(e), n = t.length; n--; ) {
                            var r = t[n]
                              , o = e[r];
                            t[n] = [r, o, Pi(o)]
                        }
                        return t
                    }
                    function pi(e, t) {
                        var n = function(e, t) {
                            return null == e ? o : e[t]
                        }(e, t);
                        return Lr(n) ? n : o
                    }
                    var mi = gt ? function(e) {
                        return null == e ? [] : (e = Te(e),
                        _t(gt(e), (function(t) {
                            return $e.call(e, t)
                        }
                        )))
                    }
                    : hs
                      , vi = gt ? function(e) {
                        for (var t = []; e; )
                            Dt(t, mi(e)),
                            e = qe(e);
                        return t
                    }
                    : hs
                      , hi = Pr;
                    function gi(e, t, n) {
                        for (var r = -1, o = (t = Co(t, e)).length, i = !1; ++r < o; ) {
                            var a = Ui(t[r]);
                            if (!(i = null != e && n(e, a)))
                                break;
                            e = e[a]
                        }
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && el(o) && Ii(a, o) && (Va(e) || Wa(e))
                    }
                    function yi(e) {
                        return "function" != typeof e.constructor || Ei(e) ? {} : zn(qe(e))
                    }
                    function bi(e) {
                        return Va(e) || Wa(e) || !!(Ye && e && e[Ye])
                    }
                    function Ii(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? m : t) && ("number" == n || "symbol" != n && Ie.test(e)) && e > -1 && e % 1 == 0 && e < t
                    }
                    function Ci(e, t, n) {
                        if (!tl(n))
                            return !1;
                        var r = typeof t;
                        return !!("number" == r ? qa(n) && Ii(t, n.length) : "string" == r && t in n) && Ga(n[t], e)
                    }
                    function Si(e, t) {
                        if (Va(e))
                            return !1;
                        var n = typeof e;
                        return !("number" != n && "symbol" != n && "boolean" != n && null != e && !ul(e)) || (ne.test(e) || !te.test(e) || null != t && e in Te(t))
                    }
                    function wi(e) {
                        var t = si(e)
                          , n = Gn[t];
                        if ("function" != typeof n || !(t in Vn.prototype))
                            return !1;
                        if (e === n)
                            return !0;
                        var r = li(n);
                        return !!r && e === r[0]
                    }
                    (En && hi(new En(new ArrayBuffer(1))) != L || Pn && hi(new Pn) != E || Tn && hi(Tn.resolve()) != k || kn && hi(new kn) != A || Nn && hi(new Nn) != M) && (hi = function(e) {
                        var t = Pr(e)
                          , n = t == T ? e.constructor : o
                          , r = n ? Bi(n) : "";
                        if (r)
                            switch (r) {
                            case Mn:
                                return L;
                            case Rn:
                                return E;
                            case Ln:
                                return k;
                            case Dn:
                                return A;
                            case Fn:
                                return M
                            }
                        return t
                    }
                    );
                    var xi = Re ? Za : gs;
                    function Ei(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || Me)
                    }
                    function Pi(e) {
                        return e == e && !tl(e)
                    }
                    function Ti(e, t) {
                        return function(n) {
                            return null != n && (n[e] === t && (t !== o || e in Te(n)))
                        }
                    }
                    function ki(e, t, n) {
                        return t = bn(t === o ? e.length - 1 : t, 0),
                        function() {
                            for (var o = arguments, i = -1, a = bn(o.length - t, 0), l = r(a); ++i < a; )
                                l[i] = o[t + i];
                            i = -1;
                            for (var s = r(t + 1); ++i < t; )
                                s[i] = o[i];
                            return s[t] = n(l),
                            Tt(e, this, s)
                        }
                    }
                    function Ni(e, t) {
                        return t.length < 2 ? e : xr(e, oo(t, 0, -1))
                    }
                    function Ai(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var Oi = Li(to)
                      , _i = pt || function(e, t) {
                        return vt.setTimeout(e, t)
                    }
                      , Mi = Li(no);
                    function Ri(e, t, n) {
                        var r = t + "";
                        return Mi(e, function(e, t) {
                            var n = t.length;
                            if (!n)
                                return e;
                            var r = n - 1;
                            return t[r] = (n > 1 ? "& " : "") + t[r],
                            t = t.join(n > 2 ? ", " : " "),
                            e.replace(se, "{\n/* [wrapped with " + t + "] */\n")
                        }(r, function(e, t) {
                            return Nt(g, (function(n) {
                                var r = "_." + n[0];
                                t & n[1] && !Mt(e, r) && e.push(r)
                            }
                            )),
                            e.sort()
                        }(function(e) {
                            var t = e.match(ue);
                            return t ? t[1].split(ce) : []
                        }(r), n)))
                    }
                    function Li(e) {
                        var t = 0
                          , n = 0;
                        return function() {
                            var r = Cn()
                              , i = 16 - (r - n);
                            if (n = r,
                            i > 0) {
                                if (++t >= 800)
                                    return arguments[0]
                            } else
                                t = 0;
                            return e.apply(o, arguments)
                        }
                    }
                    function Di(e, t) {
                        var n = -1
                          , r = e.length
                          , i = r - 1;
                        for (t = t === o ? r : t; ++n < t; ) {
                            var a = $r(n, i)
                              , l = e[a];
                            e[a] = e[n],
                            e[n] = l
                        }
                        return e.length = t,
                        e
                    }
                    var Fi = function(e) {
                        var t = La(e, (function(e) {
                            return 500 === n.size && n.clear(),
                            e
                        }
                        ))
                          , n = t.cache;
                        return t
                    }((function(e) {
                        var t = [];
                        return 46 === e.charCodeAt(0) && t.push(""),
                        e.replace(re, (function(e, n, r, o) {
                            t.push(r ? o.replace(pe, "$1") : n || e)
                        }
                        )),
                        t
                    }
                    ));
                    function Ui(e) {
                        if ("string" == typeof e || ul(e))
                            return e;
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function Bi(e) {
                        if (null != e) {
                            try {
                                return Le.call(e)
                            } catch (e) {}
                            try {
                                return e + ""
                            } catch (e) {}
                        }
                        return ""
                    }
                    function ji(e) {
                        if (e instanceof Vn)
                            return e.clone();
                        var t = new Wn(e.__wrapped__,e.__chain__);
                        return t.__actions__ = Oo(e.__actions__),
                        t.__index__ = e.__index__,
                        t.__values__ = e.__values__,
                        t
                    }
                    var Gi = Yr((function(e, t) {
                        return Ka(e) ? fr(e, yr(t, 1, Ka, !0)) : []
                    }
                    ))
                      , zi = Yr((function(e, t) {
                        var n = Yi(t);
                        return Ka(n) && (n = o),
                        Ka(e) ? fr(e, yr(t, 1, Ka, !0), ci(n, 2)) : []
                    }
                    ))
                      , Hi = Yr((function(e, t) {
                        var n = Yi(t);
                        return Ka(n) && (n = o),
                        Ka(e) ? fr(e, yr(t, 1, Ka, !0), o, n) : []
                    }
                    ));
                    function Wi(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = null == n ? 0 : vl(n);
                        return o < 0 && (o = bn(r + o, 0)),
                        zt(e, ci(t, 3), o)
                    }
                    function Vi(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var i = r - 1;
                        return n !== o && (i = vl(n),
                        i = n < 0 ? bn(r + i, 0) : In(i, r - 1)),
                        zt(e, ci(t, 3), i, !0)
                    }
                    function Ji(e) {
                        return (null == e ? 0 : e.length) ? yr(e, 1) : []
                    }
                    function qi(e) {
                        return e && e.length ? e[0] : o
                    }
                    var Ki = Yr((function(e) {
                        var t = Lt(e, bo);
                        return t.length && t[0] === e[0] ? Ar(t) : []
                    }
                    ))
                      , $i = Yr((function(e) {
                        var t = Yi(e)
                          , n = Lt(e, bo);
                        return t === Yi(n) ? t = o : n.pop(),
                        n.length && n[0] === e[0] ? Ar(n, ci(t, 2)) : []
                    }
                    ))
                      , Xi = Yr((function(e) {
                        var t = Yi(e)
                          , n = Lt(e, bo);
                        return (t = "function" == typeof t ? t : o) && n.pop(),
                        n.length && n[0] === e[0] ? Ar(n, o, t) : []
                    }
                    ));
                    function Yi(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : o
                    }
                    var Zi = Yr(Qi);
                    function Qi(e, t) {
                        return e && e.length && t && t.length ? qr(e, t) : e
                    }
                    var ea = oi((function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = lr(e, t);
                        return Kr(e, Lt(t, (function(e) {
                            return Ii(e, n) ? +e : e
                        }
                        )).sort(ko)),
                        r
                    }
                    ));
                    function ta(e) {
                        return null == e ? e : xn.call(e)
                    }
                    var na = Yr((function(e) {
                        return fo(yr(e, 1, Ka, !0))
                    }
                    ))
                      , ra = Yr((function(e) {
                        var t = Yi(e);
                        return Ka(t) && (t = o),
                        fo(yr(e, 1, Ka, !0), ci(t, 2))
                    }
                    ))
                      , oa = Yr((function(e) {
                        var t = Yi(e);
                        return t = "function" == typeof t ? t : o,
                        fo(yr(e, 1, Ka, !0), o, t)
                    }
                    ));
                    function ia(e) {
                        if (!e || !e.length)
                            return [];
                        var t = 0;
                        return e = _t(e, (function(e) {
                            if (Ka(e))
                                return t = bn(e.length, t),
                                !0
                        }
                        )),
                        Yt(t, (function(t) {
                            return Lt(e, qt(t))
                        }
                        ))
                    }
                    function aa(e, t) {
                        if (!e || !e.length)
                            return [];
                        var n = ia(e);
                        return null == t ? n : Lt(n, (function(e) {
                            return Tt(t, o, e)
                        }
                        ))
                    }
                    var la = Yr((function(e, t) {
                        return Ka(e) ? fr(e, t) : []
                    }
                    ))
                      , sa = Yr((function(e) {
                        return go(_t(e, Ka))
                    }
                    ))
                      , ua = Yr((function(e) {
                        var t = Yi(e);
                        return Ka(t) && (t = o),
                        go(_t(e, Ka), ci(t, 2))
                    }
                    ))
                      , ca = Yr((function(e) {
                        var t = Yi(e);
                        return t = "function" == typeof t ? t : o,
                        go(_t(e, Ka), o, t)
                    }
                    ))
                      , da = Yr(ia);
                    var fa = Yr((function(e) {
                        var t = e.length
                          , n = t > 1 ? e[t - 1] : o;
                        return n = "function" == typeof n ? (e.pop(),
                        n) : o,
                        aa(e, n)
                    }
                    ));
                    function pa(e) {
                        var t = Gn(e);
                        return t.__chain__ = !0,
                        t
                    }
                    function ma(e, t) {
                        return t(e)
                    }
                    var va = oi((function(e) {
                        var t = e.length
                          , n = t ? e[0] : 0
                          , r = this.__wrapped__
                          , i = function(t) {
                            return lr(t, e)
                        };
                        return !(t > 1 || this.__actions__.length) && r instanceof Vn && Ii(n) ? ((r = r.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                            func: ma,
                            args: [i],
                            thisArg: o
                        }),
                        new Wn(r,this.__chain__).thru((function(e) {
                            return t && !e.length && e.push(o),
                            e
                        }
                        ))) : this.thru(i)
                    }
                    ));
                    var ha = Mo((function(e, t, n) {
                        De.call(e, n) ? ++e[n] : ar(e, n, 1)
                    }
                    ));
                    var ga = jo(Wi)
                      , ya = jo(Vi);
                    function ba(e, t) {
                        return (Va(e) ? Nt : pr)(e, ci(t, 3))
                    }
                    function Ia(e, t) {
                        return (Va(e) ? At : mr)(e, ci(t, 3))
                    }
                    var Ca = Mo((function(e, t, n) {
                        De.call(e, n) ? e[n].push(t) : ar(e, n, [t])
                    }
                    ));
                    var Sa = Yr((function(e, t, n) {
                        var o = -1
                          , i = "function" == typeof t
                          , a = qa(e) ? r(e.length) : [];
                        return pr(e, (function(e) {
                            a[++o] = i ? Tt(t, e, n) : Or(e, t, n)
                        }
                        )),
                        a
                    }
                    ))
                      , wa = Mo((function(e, t, n) {
                        ar(e, n, t)
                    }
                    ));
                    function xa(e, t) {
                        return (Va(e) ? Lt : jr)(e, ci(t, 3))
                    }
                    var Ea = Mo((function(e, t, n) {
                        e[n ? 0 : 1].push(t)
                    }
                    ), (function() {
                        return [[], []]
                    }
                    ));
                    var Pa = Yr((function(e, t) {
                        if (null == e)
                            return [];
                        var n = t.length;
                        return n > 1 && Ci(e, t[0], t[1]) ? t = [] : n > 2 && Ci(t[0], t[1], t[2]) && (t = [t[0]]),
                        Vr(e, yr(t, 1), [])
                    }
                    ))
                      , Ta = ct || function() {
                        return vt.Date.now()
                    }
                    ;
                    function ka(e, t, n) {
                        return t = n ? o : t,
                        t = e && null == t ? e.length : t,
                        Qo(e, d, o, o, o, o, t)
                    }
                    function Na(e, t) {
                        var n;
                        if ("function" != typeof t)
                            throw new Ae(i);
                        return e = vl(e),
                        function() {
                            return --e > 0 && (n = t.apply(this, arguments)),
                            e <= 1 && (t = o),
                            n
                        }
                    }
                    var Aa = Yr((function(e, t, n) {
                        var r = 1;
                        if (n.length) {
                            var o = dn(n, ui(Aa));
                            r |= u
                        }
                        return Qo(e, r, t, n, o)
                    }
                    ))
                      , Oa = Yr((function(e, t, n) {
                        var r = 3;
                        if (n.length) {
                            var o = dn(n, ui(Oa));
                            r |= u
                        }
                        return Qo(t, r, e, n, o)
                    }
                    ));
                    function _a(e, t, n) {
                        var r, a, l, s, u, c, d = 0, f = !1, p = !1, m = !0;
                        if ("function" != typeof e)
                            throw new Ae(i);
                        function v(t) {
                            var n = r
                              , i = a;
                            return r = a = o,
                            d = t,
                            s = e.apply(i, n)
                        }
                        function h(e) {
                            var n = e - c;
                            return c === o || n >= t || n < 0 || p && e - d >= l
                        }
                        function g() {
                            var e = Ta();
                            if (h(e))
                                return y(e);
                            u = _i(g, function(e) {
                                var n = t - (e - c);
                                return p ? In(n, l - (e - d)) : n
                            }(e))
                        }
                        function y(e) {
                            return u = o,
                            m && r ? v(e) : (r = a = o,
                            s)
                        }
                        function b() {
                            var e = Ta()
                              , n = h(e);
                            if (r = arguments,
                            a = this,
                            c = e,
                            n) {
                                if (u === o)
                                    return function(e) {
                                        return d = e,
                                        u = _i(g, t),
                                        f ? v(e) : s
                                    }(c);
                                if (p)
                                    return xo(u),
                                    u = _i(g, t),
                                    v(c)
                            }
                            return u === o && (u = _i(g, t)),
                            s
                        }
                        return t = gl(t) || 0,
                        tl(n) && (f = !!n.leading,
                        l = (p = "maxWait"in n) ? bn(gl(n.maxWait) || 0, t) : l,
                        m = "trailing"in n ? !!n.trailing : m),
                        b.cancel = function() {
                            u !== o && xo(u),
                            d = 0,
                            r = c = a = u = o
                        }
                        ,
                        b.flush = function() {
                            return u === o ? s : y(Ta())
                        }
                        ,
                        b
                    }
                    var Ma = Yr((function(e, t) {
                        return dr(e, 1, t)
                    }
                    ))
                      , Ra = Yr((function(e, t, n) {
                        return dr(e, gl(t) || 0, n)
                    }
                    ));
                    function La(e, t) {
                        if ("function" != typeof e || null != t && "function" != typeof t)
                            throw new Ae(i);
                        var n = function() {
                            var r = arguments
                              , o = t ? t.apply(this, r) : r[0]
                              , i = n.cache;
                            if (i.has(o))
                                return i.get(o);
                            var a = e.apply(this, r);
                            return n.cache = i.set(o, a) || i,
                            a
                        };
                        return n.cache = new (La.Cache || Kn),
                        n
                    }
                    function Da(e) {
                        if ("function" != typeof e)
                            throw new Ae(i);
                        return function() {
                            var t = arguments;
                            switch (t.length) {
                            case 0:
                                return !e.call(this);
                            case 1:
                                return !e.call(this, t[0]);
                            case 2:
                                return !e.call(this, t[0], t[1]);
                            case 3:
                                return !e.call(this, t[0], t[1], t[2])
                            }
                            return !e.apply(this, t)
                        }
                    }
                    La.Cache = Kn;
                    var Fa = So((function(e, t) {
                        var n = (t = 1 == t.length && Va(t[0]) ? Lt(t[0], Qt(ci())) : Lt(yr(t, 1), Qt(ci()))).length;
                        return Yr((function(r) {
                            for (var o = -1, i = In(r.length, n); ++o < i; )
                                r[o] = t[o].call(this, r[o]);
                            return Tt(e, this, r)
                        }
                        ))
                    }
                    ))
                      , Ua = Yr((function(e, t) {
                        var n = dn(t, ui(Ua));
                        return Qo(e, u, o, t, n)
                    }
                    ))
                      , Ba = Yr((function(e, t) {
                        var n = dn(t, ui(Ba));
                        return Qo(e, c, o, t, n)
                    }
                    ))
                      , ja = oi((function(e, t) {
                        return Qo(e, f, o, o, o, t)
                    }
                    ));
                    function Ga(e, t) {
                        return e === t || e != e && t != t
                    }
                    var za = Ko(Tr)
                      , Ha = Ko((function(e, t) {
                        return e >= t
                    }
                    ))
                      , Wa = _r(function() {
                        return arguments
                    }()) ? _r : function(e) {
                        return nl(e) && De.call(e, "callee") && !$e.call(e, "callee")
                    }
                      , Va = r.isArray
                      , Ja = Ct ? Qt(Ct) : function(e) {
                        return nl(e) && Pr(e) == R
                    }
                    ;
                    function qa(e) {
                        return null != e && el(e.length) && !Za(e)
                    }
                    function Ka(e) {
                        return nl(e) && qa(e)
                    }
                    var $a = bt || gs
                      , Xa = St ? Qt(St) : function(e) {
                        return nl(e) && Pr(e) == C
                    }
                    ;
                    function Ya(e) {
                        if (!nl(e))
                            return !1;
                        var t = Pr(e);
                        return t == S || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !il(e)
                    }
                    function Za(e) {
                        if (!tl(e))
                            return !1;
                        var t = Pr(e);
                        return t == w || t == x || "[object AsyncFunction]" == t || "[object Proxy]" == t
                    }
                    function Qa(e) {
                        return "number" == typeof e && e == vl(e)
                    }
                    function el(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= m
                    }
                    function tl(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t)
                    }
                    function nl(e) {
                        return null != e && "object" == typeof e
                    }
                    var rl = wt ? Qt(wt) : function(e) {
                        return nl(e) && hi(e) == E
                    }
                    ;
                    function ol(e) {
                        return "number" == typeof e || nl(e) && Pr(e) == P
                    }
                    function il(e) {
                        if (!nl(e) || Pr(e) != T)
                            return !1;
                        var t = qe(e);
                        if (null === t)
                            return !0;
                        var n = De.call(t, "constructor") && t.constructor;
                        return "function" == typeof n && n instanceof n && Le.call(n) == je
                    }
                    var al = xt ? Qt(xt) : function(e) {
                        return nl(e) && Pr(e) == N
                    }
                    ;
                    var ll = Et ? Qt(Et) : function(e) {
                        return nl(e) && hi(e) == A
                    }
                    ;
                    function sl(e) {
                        return "string" == typeof e || !Va(e) && nl(e) && Pr(e) == O
                    }
                    function ul(e) {
                        return "symbol" == typeof e || nl(e) && Pr(e) == _
                    }
                    var cl = Pt ? Qt(Pt) : function(e) {
                        return nl(e) && el(e.length) && !!st[Pr(e)]
                    }
                    ;
                    var dl = Ko(Br)
                      , fl = Ko((function(e, t) {
                        return e <= t
                    }
                    ));
                    function pl(e) {
                        if (!e)
                            return [];
                        if (qa(e))
                            return sl(e) ? vn(e) : Oo(e);
                        if (Ze && e[Ze])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[Ze]());
                        var t = hi(e);
                        return (t == E ? un : t == A ? fn : Gl)(e)
                    }
                    function ml(e) {
                        return e ? (e = gl(e)) === p || e === -1 / 0 ? 17976931348623157e292 * (e < 0 ? -1 : 1) : e == e ? e : 0 : 0 === e ? e : 0
                    }
                    function vl(e) {
                        var t = ml(e)
                          , n = t % 1;
                        return t == t ? n ? t - n : t : 0
                    }
                    function hl(e) {
                        return e ? sr(vl(e), 0, h) : 0
                    }
                    function gl(e) {
                        if ("number" == typeof e)
                            return e;
                        if (ul(e))
                            return v;
                        if (tl(e)) {
                            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                            e = tl(t) ? t + "" : t
                        }
                        if ("string" != typeof e)
                            return 0 === e ? e : +e;
                        e = Zt(e);
                        var n = ge.test(e);
                        return n || be.test(e) ? ft(e.slice(2), n ? 2 : 8) : he.test(e) ? v : +e
                    }
                    function yl(e) {
                        return _o(e, Ml(e))
                    }
                    function bl(e) {
                        return null == e ? "" : co(e)
                    }
                    var Il = Ro((function(e, t) {
                        if (Ei(t) || qa(t))
                            _o(t, _l(t), e);
                        else
                            for (var n in t)
                                De.call(t, n) && nr(e, n, t[n])
                    }
                    ))
                      , Cl = Ro((function(e, t) {
                        _o(t, Ml(t), e)
                    }
                    ))
                      , Sl = Ro((function(e, t, n, r) {
                        _o(t, Ml(t), e, r)
                    }
                    ))
                      , wl = Ro((function(e, t, n, r) {
                        _o(t, _l(t), e, r)
                    }
                    ))
                      , xl = oi(lr);
                    var El = Yr((function(e, t) {
                        e = Te(e);
                        var n = -1
                          , r = t.length
                          , i = r > 2 ? t[2] : o;
                        for (i && Ci(t[0], t[1], i) && (r = 1); ++n < r; )
                            for (var a = t[n], l = Ml(a), s = -1, u = l.length; ++s < u; ) {
                                var c = l[s]
                                  , d = e[c];
                                (d === o || Ga(d, Me[c]) && !De.call(e, c)) && (e[c] = a[c])
                            }
                        return e
                    }
                    ))
                      , Pl = Yr((function(e) {
                        return e.push(o, ti),
                        Tt(Ll, o, e)
                    }
                    ));
                    function Tl(e, t, n) {
                        var r = null == e ? o : xr(e, t);
                        return r === o ? n : r
                    }
                    function kl(e, t) {
                        return null != e && gi(e, t, Nr)
                    }
                    var Nl = Ho((function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = Be.call(t)),
                        e[t] = n
                    }
                    ), ts(os))
                      , Al = Ho((function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = Be.call(t)),
                        De.call(e, t) ? e[t].push(n) : e[t] = [n]
                    }
                    ), ci)
                      , Ol = Yr(Or);
                    function _l(e) {
                        return qa(e) ? Yn(e) : Fr(e)
                    }
                    function Ml(e) {
                        return qa(e) ? Yn(e, !0) : Ur(e)
                    }
                    var Rl = Ro((function(e, t, n) {
                        Hr(e, t, n)
                    }
                    ))
                      , Ll = Ro((function(e, t, n, r) {
                        Hr(e, t, n, r)
                    }
                    ))
                      , Dl = oi((function(e, t) {
                        var n = {};
                        if (null == e)
                            return n;
                        var r = !1;
                        t = Lt(t, (function(t) {
                            return t = Co(t, e),
                            r || (r = t.length > 1),
                            t
                        }
                        )),
                        _o(e, ai(e), n),
                        r && (n = ur(n, 7, ni));
                        for (var o = t.length; o--; )
                            po(n, t[o]);
                        return n
                    }
                    ));
                    var Fl = oi((function(e, t) {
                        return null == e ? {} : function(e, t) {
                            return Jr(e, t, (function(t, n) {
                                return kl(e, n)
                            }
                            ))
                        }(e, t)
                    }
                    ));
                    function Ul(e, t) {
                        if (null == e)
                            return {};
                        var n = Lt(ai(e), (function(e) {
                            return [e]
                        }
                        ));
                        return t = ci(t),
                        Jr(e, n, (function(e, n) {
                            return t(e, n[0])
                        }
                        ))
                    }
                    var Bl = Zo(_l)
                      , jl = Zo(Ml);
                    function Gl(e) {
                        return null == e ? [] : en(e, _l(e))
                    }
                    var zl = Uo((function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? Hl(t) : t)
                    }
                    ));
                    function Hl(e) {
                        return Yl(bl(e).toLowerCase())
                    }
                    function Wl(e) {
                        return (e = bl(e)) && e.replace(Ce, on).replace(tt, "")
                    }
                    var Vl = Uo((function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    }
                    ))
                      , Jl = Uo((function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    }
                    ))
                      , ql = Fo("toLowerCase");
                    var Kl = Uo((function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    }
                    ));
                    var $l = Uo((function(e, t, n) {
                        return e + (n ? " " : "") + Yl(t)
                    }
                    ));
                    var Xl = Uo((function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    }
                    ))
                      , Yl = Fo("toUpperCase");
                    function Zl(e, t, n) {
                        return e = bl(e),
                        (t = n ? o : t) === o ? function(e) {
                            return it.test(e)
                        }(e) ? function(e) {
                            return e.match(rt) || []
                        }(e) : function(e) {
                            return e.match(de) || []
                        }(e) : e.match(t) || []
                    }
                    var Ql = Yr((function(e, t) {
                        try {
                            return Tt(e, o, t)
                        } catch (e) {
                            return Ya(e) ? e : new xe(e)
                        }
                    }
                    ))
                      , es = oi((function(e, t) {
                        return Nt(t, (function(t) {
                            t = Ui(t),
                            ar(e, t, Aa(e[t], e))
                        }
                        )),
                        e
                    }
                    ));
                    function ts(e) {
                        return function() {
                            return e
                        }
                    }
                    var ns = Go()
                      , rs = Go(!0);
                    function os(e) {
                        return e
                    }
                    function is(e) {
                        return Dr("function" == typeof e ? e : ur(e, 1))
                    }
                    var as = Yr((function(e, t) {
                        return function(n) {
                            return Or(n, e, t)
                        }
                    }
                    ))
                      , ls = Yr((function(e, t) {
                        return function(n) {
                            return Or(e, n, t)
                        }
                    }
                    ));
                    function ss(e, t, n) {
                        var r = _l(t)
                          , o = wr(t, r);
                        null != n || tl(t) && (o.length || !r.length) || (n = t,
                        t = e,
                        e = this,
                        o = wr(t, _l(t)));
                        var i = !(tl(n) && "chain"in n && !n.chain)
                          , a = Za(e);
                        return Nt(o, (function(n) {
                            var r = t[n];
                            e[n] = r,
                            a && (e.prototype[n] = function() {
                                var t = this.__chain__;
                                if (i || t) {
                                    var n = e(this.__wrapped__);
                                    return (n.__actions__ = Oo(this.__actions__)).push({
                                        func: r,
                                        args: arguments,
                                        thisArg: e
                                    }),
                                    n.__chain__ = t,
                                    n
                                }
                                return r.apply(e, Dt([this.value()], arguments))
                            }
                            )
                        }
                        )),
                        e
                    }
                    function us() {}
                    var cs = Vo(Lt)
                      , ds = Vo(Ot)
                      , fs = Vo(Bt);
                    function ps(e) {
                        return Si(e) ? qt(Ui(e)) : function(e) {
                            return function(t) {
                                return xr(t, e)
                            }
                        }(e)
                    }
                    var ms = qo()
                      , vs = qo(!0);
                    function hs() {
                        return []
                    }
                    function gs() {
                        return !1
                    }
                    var ys = Wo((function(e, t) {
                        return e + t
                    }
                    ), 0)
                      , bs = Xo("ceil")
                      , Is = Wo((function(e, t) {
                        return e / t
                    }
                    ), 1)
                      , Cs = Xo("floor");
                    var Ss, ws = Wo((function(e, t) {
                        return e * t
                    }
                    ), 1), xs = Xo("round"), Es = Wo((function(e, t) {
                        return e - t
                    }
                    ), 0);
                    return Gn.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new Ae(i);
                        return e = vl(e),
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    ,
                    Gn.ary = ka,
                    Gn.assign = Il,
                    Gn.assignIn = Cl,
                    Gn.assignInWith = Sl,
                    Gn.assignWith = wl,
                    Gn.at = xl,
                    Gn.before = Na,
                    Gn.bind = Aa,
                    Gn.bindAll = es,
                    Gn.bindKey = Oa,
                    Gn.castArray = function() {
                        if (!arguments.length)
                            return [];
                        var e = arguments[0];
                        return Va(e) ? e : [e]
                    }
                    ,
                    Gn.chain = pa,
                    Gn.chunk = function(e, t, n) {
                        t = (n ? Ci(e, t, n) : t === o) ? 1 : bn(vl(t), 0);
                        var i = null == e ? 0 : e.length;
                        if (!i || t < 1)
                            return [];
                        for (var a = 0, l = 0, s = r(mt(i / t)); a < i; )
                            s[l++] = oo(e, a, a += t);
                        return s
                    }
                    ,
                    Gn.compact = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = 0, o = []; ++t < n; ) {
                            var i = e[t];
                            i && (o[r++] = i)
                        }
                        return o
                    }
                    ,
                    Gn.concat = function() {
                        var e = arguments.length;
                        if (!e)
                            return [];
                        for (var t = r(e - 1), n = arguments[0], o = e; o--; )
                            t[o - 1] = arguments[o];
                        return Dt(Va(n) ? Oo(n) : [n], yr(t, 1))
                    }
                    ,
                    Gn.cond = function(e) {
                        var t = null == e ? 0 : e.length
                          , n = ci();
                        return e = t ? Lt(e, (function(e) {
                            if ("function" != typeof e[1])
                                throw new Ae(i);
                            return [n(e[0]), e[1]]
                        }
                        )) : [],
                        Yr((function(n) {
                            for (var r = -1; ++r < t; ) {
                                var o = e[r];
                                if (Tt(o[0], this, n))
                                    return Tt(o[1], this, n)
                            }
                        }
                        ))
                    }
                    ,
                    Gn.conforms = function(e) {
                        return function(e) {
                            var t = _l(e);
                            return function(n) {
                                return cr(n, e, t)
                            }
                        }(ur(e, 1))
                    }
                    ,
                    Gn.constant = ts,
                    Gn.countBy = ha,
                    Gn.create = function(e, t) {
                        var n = zn(e);
                        return null == t ? n : ir(n, t)
                    }
                    ,
                    Gn.curry = function e(t, n, r) {
                        var i = Qo(t, 8, o, o, o, o, o, n = r ? o : n);
                        return i.placeholder = e.placeholder,
                        i
                    }
                    ,
                    Gn.curryRight = function e(t, n, r) {
                        var i = Qo(t, s, o, o, o, o, o, n = r ? o : n);
                        return i.placeholder = e.placeholder,
                        i
                    }
                    ,
                    Gn.debounce = _a,
                    Gn.defaults = El,
                    Gn.defaultsDeep = Pl,
                    Gn.defer = Ma,
                    Gn.delay = Ra,
                    Gn.difference = Gi,
                    Gn.differenceBy = zi,
                    Gn.differenceWith = Hi,
                    Gn.drop = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? oo(e, (t = n || t === o ? 1 : vl(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    Gn.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? oo(e, 0, (t = r - (t = n || t === o ? 1 : vl(t))) < 0 ? 0 : t) : []
                    }
                    ,
                    Gn.dropRightWhile = function(e, t) {
                        return e && e.length ? vo(e, ci(t, 3), !0, !0) : []
                    }
                    ,
                    Gn.dropWhile = function(e, t) {
                        return e && e.length ? vo(e, ci(t, 3), !0) : []
                    }
                    ,
                    Gn.fill = function(e, t, n, r) {
                        var i = null == e ? 0 : e.length;
                        return i ? (n && "number" != typeof n && Ci(e, t, n) && (n = 0,
                        r = i),
                        function(e, t, n, r) {
                            var i = e.length;
                            for ((n = vl(n)) < 0 && (n = -n > i ? 0 : i + n),
                            (r = r === o || r > i ? i : vl(r)) < 0 && (r += i),
                            r = n > r ? 0 : hl(r); n < r; )
                                e[n++] = t;
                            return e
                        }(e, t, n, r)) : []
                    }
                    ,
                    Gn.filter = function(e, t) {
                        return (Va(e) ? _t : gr)(e, ci(t, 3))
                    }
                    ,
                    Gn.flatMap = function(e, t) {
                        return yr(xa(e, t), 1)
                    }
                    ,
                    Gn.flatMapDeep = function(e, t) {
                        return yr(xa(e, t), p)
                    }
                    ,
                    Gn.flatMapDepth = function(e, t, n) {
                        return n = n === o ? 1 : vl(n),
                        yr(xa(e, t), n)
                    }
                    ,
                    Gn.flatten = Ji,
                    Gn.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? yr(e, p) : []
                    }
                    ,
                    Gn.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? yr(e, t = t === o ? 1 : vl(t)) : []
                    }
                    ,
                    Gn.flip = function(e) {
                        return Qo(e, 512)
                    }
                    ,
                    Gn.flow = ns,
                    Gn.flowRight = rs,
                    Gn.fromPairs = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
                            var o = e[t];
                            r[o[0]] = o[1]
                        }
                        return r
                    }
                    ,
                    Gn.functions = function(e) {
                        return null == e ? [] : wr(e, _l(e))
                    }
                    ,
                    Gn.functionsIn = function(e) {
                        return null == e ? [] : wr(e, Ml(e))
                    }
                    ,
                    Gn.groupBy = Ca,
                    Gn.initial = function(e) {
                        return (null == e ? 0 : e.length) ? oo(e, 0, -1) : []
                    }
                    ,
                    Gn.intersection = Ki,
                    Gn.intersectionBy = $i,
                    Gn.intersectionWith = Xi,
                    Gn.invert = Nl,
                    Gn.invertBy = Al,
                    Gn.invokeMap = Sa,
                    Gn.iteratee = is,
                    Gn.keyBy = wa,
                    Gn.keys = _l,
                    Gn.keysIn = Ml,
                    Gn.map = xa,
                    Gn.mapKeys = function(e, t) {
                        var n = {};
                        return t = ci(t, 3),
                        Cr(e, (function(e, r, o) {
                            ar(n, t(e, r, o), e)
                        }
                        )),
                        n
                    }
                    ,
                    Gn.mapValues = function(e, t) {
                        var n = {};
                        return t = ci(t, 3),
                        Cr(e, (function(e, r, o) {
                            ar(n, r, t(e, r, o))
                        }
                        )),
                        n
                    }
                    ,
                    Gn.matches = function(e) {
                        return Gr(ur(e, 1))
                    }
                    ,
                    Gn.matchesProperty = function(e, t) {
                        return zr(e, ur(t, 1))
                    }
                    ,
                    Gn.memoize = La,
                    Gn.merge = Rl,
                    Gn.mergeWith = Ll,
                    Gn.method = as,
                    Gn.methodOf = ls,
                    Gn.mixin = ss,
                    Gn.negate = Da,
                    Gn.nthArg = function(e) {
                        return e = vl(e),
                        Yr((function(t) {
                            return Wr(t, e)
                        }
                        ))
                    }
                    ,
                    Gn.omit = Dl,
                    Gn.omitBy = function(e, t) {
                        return Ul(e, Da(ci(t)))
                    }
                    ,
                    Gn.once = function(e) {
                        return Na(2, e)
                    }
                    ,
                    Gn.orderBy = function(e, t, n, r) {
                        return null == e ? [] : (Va(t) || (t = null == t ? [] : [t]),
                        Va(n = r ? o : n) || (n = null == n ? [] : [n]),
                        Vr(e, t, n))
                    }
                    ,
                    Gn.over = cs,
                    Gn.overArgs = Fa,
                    Gn.overEvery = ds,
                    Gn.overSome = fs,
                    Gn.partial = Ua,
                    Gn.partialRight = Ba,
                    Gn.partition = Ea,
                    Gn.pick = Fl,
                    Gn.pickBy = Ul,
                    Gn.property = ps,
                    Gn.propertyOf = function(e) {
                        return function(t) {
                            return null == e ? o : xr(e, t)
                        }
                    }
                    ,
                    Gn.pull = Zi,
                    Gn.pullAll = Qi,
                    Gn.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? qr(e, t, ci(n, 2)) : e
                    }
                    ,
                    Gn.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? qr(e, t, o, n) : e
                    }
                    ,
                    Gn.pullAt = ea,
                    Gn.range = ms,
                    Gn.rangeRight = vs,
                    Gn.rearg = ja,
                    Gn.reject = function(e, t) {
                        return (Va(e) ? _t : gr)(e, Da(ci(t, 3)))
                    }
                    ,
                    Gn.remove = function(e, t) {
                        var n = [];
                        if (!e || !e.length)
                            return n;
                        var r = -1
                          , o = []
                          , i = e.length;
                        for (t = ci(t, 3); ++r < i; ) {
                            var a = e[r];
                            t(a, r, e) && (n.push(a),
                            o.push(r))
                        }
                        return Kr(e, o),
                        n
                    }
                    ,
                    Gn.rest = function(e, t) {
                        if ("function" != typeof e)
                            throw new Ae(i);
                        return Yr(e, t = t === o ? t : vl(t))
                    }
                    ,
                    Gn.reverse = ta,
                    Gn.sampleSize = function(e, t, n) {
                        return t = (n ? Ci(e, t, n) : t === o) ? 1 : vl(t),
                        (Va(e) ? Qn : Qr)(e, t)
                    }
                    ,
                    Gn.set = function(e, t, n) {
                        return null == e ? e : eo(e, t, n)
                    }
                    ,
                    Gn.setWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : o,
                        null == e ? e : eo(e, t, n, r)
                    }
                    ,
                    Gn.shuffle = function(e) {
                        return (Va(e) ? er : ro)(e)
                    }
                    ,
                    Gn.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n && "number" != typeof n && Ci(e, t, n) ? (t = 0,
                        n = r) : (t = null == t ? 0 : vl(t),
                        n = n === o ? r : vl(n)),
                        oo(e, t, n)) : []
                    }
                    ,
                    Gn.sortBy = Pa,
                    Gn.sortedUniq = function(e) {
                        return e && e.length ? so(e) : []
                    }
                    ,
                    Gn.sortedUniqBy = function(e, t) {
                        return e && e.length ? so(e, ci(t, 2)) : []
                    }
                    ,
                    Gn.split = function(e, t, n) {
                        return n && "number" != typeof n && Ci(e, t, n) && (t = n = o),
                        (n = n === o ? h : n >>> 0) ? (e = bl(e)) && ("string" == typeof t || null != t && !al(t)) && !(t = co(t)) && sn(e) ? wo(vn(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    Gn.spread = function(e, t) {
                        if ("function" != typeof e)
                            throw new Ae(i);
                        return t = null == t ? 0 : bn(vl(t), 0),
                        Yr((function(n) {
                            var r = n[t]
                              , o = wo(n, 0, t);
                            return r && Dt(o, r),
                            Tt(e, this, o)
                        }
                        ))
                    }
                    ,
                    Gn.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? oo(e, 1, t) : []
                    }
                    ,
                    Gn.take = function(e, t, n) {
                        return e && e.length ? oo(e, 0, (t = n || t === o ? 1 : vl(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    Gn.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? oo(e, (t = r - (t = n || t === o ? 1 : vl(t))) < 0 ? 0 : t, r) : []
                    }
                    ,
                    Gn.takeRightWhile = function(e, t) {
                        return e && e.length ? vo(e, ci(t, 3), !1, !0) : []
                    }
                    ,
                    Gn.takeWhile = function(e, t) {
                        return e && e.length ? vo(e, ci(t, 3)) : []
                    }
                    ,
                    Gn.tap = function(e, t) {
                        return t(e),
                        e
                    }
                    ,
                    Gn.throttle = function(e, t, n) {
                        var r = !0
                          , o = !0;
                        if ("function" != typeof e)
                            throw new Ae(i);
                        return tl(n) && (r = "leading"in n ? !!n.leading : r,
                        o = "trailing"in n ? !!n.trailing : o),
                        _a(e, t, {
                            leading: r,
                            maxWait: t,
                            trailing: o
                        })
                    }
                    ,
                    Gn.thru = ma,
                    Gn.toArray = pl,
                    Gn.toPairs = Bl,
                    Gn.toPairsIn = jl,
                    Gn.toPath = function(e) {
                        return Va(e) ? Lt(e, Ui) : ul(e) ? [e] : Oo(Fi(bl(e)))
                    }
                    ,
                    Gn.toPlainObject = yl,
                    Gn.transform = function(e, t, n) {
                        var r = Va(e)
                          , o = r || $a(e) || cl(e);
                        if (t = ci(t, 4),
                        null == n) {
                            var i = e && e.constructor;
                            n = o ? r ? new i : [] : tl(e) && Za(i) ? zn(qe(e)) : {}
                        }
                        return (o ? Nt : Cr)(e, (function(e, r, o) {
                            return t(n, e, r, o)
                        }
                        )),
                        n
                    }
                    ,
                    Gn.unary = function(e) {
                        return ka(e, 1)
                    }
                    ,
                    Gn.union = na,
                    Gn.unionBy = ra,
                    Gn.unionWith = oa,
                    Gn.uniq = function(e) {
                        return e && e.length ? fo(e) : []
                    }
                    ,
                    Gn.uniqBy = function(e, t) {
                        return e && e.length ? fo(e, ci(t, 2)) : []
                    }
                    ,
                    Gn.uniqWith = function(e, t) {
                        return t = "function" == typeof t ? t : o,
                        e && e.length ? fo(e, o, t) : []
                    }
                    ,
                    Gn.unset = function(e, t) {
                        return null == e || po(e, t)
                    }
                    ,
                    Gn.unzip = ia,
                    Gn.unzipWith = aa,
                    Gn.update = function(e, t, n) {
                        return null == e ? e : mo(e, t, Io(n))
                    }
                    ,
                    Gn.updateWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : o,
                        null == e ? e : mo(e, t, Io(n), r)
                    }
                    ,
                    Gn.values = Gl,
                    Gn.valuesIn = function(e) {
                        return null == e ? [] : en(e, Ml(e))
                    }
                    ,
                    Gn.without = la,
                    Gn.words = Zl,
                    Gn.wrap = function(e, t) {
                        return Ua(Io(t), e)
                    }
                    ,
                    Gn.xor = sa,
                    Gn.xorBy = ua,
                    Gn.xorWith = ca,
                    Gn.zip = da,
                    Gn.zipObject = function(e, t) {
                        return yo(e || [], t || [], nr)
                    }
                    ,
                    Gn.zipObjectDeep = function(e, t) {
                        return yo(e || [], t || [], eo)
                    }
                    ,
                    Gn.zipWith = fa,
                    Gn.entries = Bl,
                    Gn.entriesIn = jl,
                    Gn.extend = Cl,
                    Gn.extendWith = Sl,
                    ss(Gn, Gn),
                    Gn.add = ys,
                    Gn.attempt = Ql,
                    Gn.camelCase = zl,
                    Gn.capitalize = Hl,
                    Gn.ceil = bs,
                    Gn.clamp = function(e, t, n) {
                        return n === o && (n = t,
                        t = o),
                        n !== o && (n = (n = gl(n)) == n ? n : 0),
                        t !== o && (t = (t = gl(t)) == t ? t : 0),
                        sr(gl(e), t, n)
                    }
                    ,
                    Gn.clone = function(e) {
                        return ur(e, 4)
                    }
                    ,
                    Gn.cloneDeep = function(e) {
                        return ur(e, 5)
                    }
                    ,
                    Gn.cloneDeepWith = function(e, t) {
                        return ur(e, 5, t = "function" == typeof t ? t : o)
                    }
                    ,
                    Gn.cloneWith = function(e, t) {
                        return ur(e, 4, t = "function" == typeof t ? t : o)
                    }
                    ,
                    Gn.conformsTo = function(e, t) {
                        return null == t || cr(e, t, _l(t))
                    }
                    ,
                    Gn.deburr = Wl,
                    Gn.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    Gn.divide = Is,
                    Gn.endsWith = function(e, t, n) {
                        e = bl(e),
                        t = co(t);
                        var r = e.length
                          , i = n = n === o ? r : sr(vl(n), 0, r);
                        return (n -= t.length) >= 0 && e.slice(n, i) == t
                    }
                    ,
                    Gn.eq = Ga,
                    Gn.escape = function(e) {
                        return (e = bl(e)) && Y.test(e) ? e.replace($, an) : e
                    }
                    ,
                    Gn.escapeRegExp = function(e) {
                        return (e = bl(e)) && ie.test(e) ? e.replace(oe, "\\$&") : e
                    }
                    ,
                    Gn.every = function(e, t, n) {
                        var r = Va(e) ? Ot : vr;
                        return n && Ci(e, t, n) && (t = o),
                        r(e, ci(t, 3))
                    }
                    ,
                    Gn.find = ga,
                    Gn.findIndex = Wi,
                    Gn.findKey = function(e, t) {
                        return Gt(e, ci(t, 3), Cr)
                    }
                    ,
                    Gn.findLast = ya,
                    Gn.findLastIndex = Vi,
                    Gn.findLastKey = function(e, t) {
                        return Gt(e, ci(t, 3), Sr)
                    }
                    ,
                    Gn.floor = Cs,
                    Gn.forEach = ba,
                    Gn.forEachRight = Ia,
                    Gn.forIn = function(e, t) {
                        return null == e ? e : br(e, ci(t, 3), Ml)
                    }
                    ,
                    Gn.forInRight = function(e, t) {
                        return null == e ? e : Ir(e, ci(t, 3), Ml)
                    }
                    ,
                    Gn.forOwn = function(e, t) {
                        return e && Cr(e, ci(t, 3))
                    }
                    ,
                    Gn.forOwnRight = function(e, t) {
                        return e && Sr(e, ci(t, 3))
                    }
                    ,
                    Gn.get = Tl,
                    Gn.gt = za,
                    Gn.gte = Ha,
                    Gn.has = function(e, t) {
                        return null != e && gi(e, t, kr)
                    }
                    ,
                    Gn.hasIn = kl,
                    Gn.head = qi,
                    Gn.identity = os,
                    Gn.includes = function(e, t, n, r) {
                        e = qa(e) ? e : Gl(e),
                        n = n && !r ? vl(n) : 0;
                        var o = e.length;
                        return n < 0 && (n = bn(o + n, 0)),
                        sl(e) ? n <= o && e.indexOf(t, n) > -1 : !!o && Ht(e, t, n) > -1
                    }
                    ,
                    Gn.indexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = null == n ? 0 : vl(n);
                        return o < 0 && (o = bn(r + o, 0)),
                        Ht(e, t, o)
                    }
                    ,
                    Gn.inRange = function(e, t, n) {
                        return t = ml(t),
                        n === o ? (n = t,
                        t = 0) : n = ml(n),
                        function(e, t, n) {
                            return e >= In(t, n) && e < bn(t, n)
                        }(e = gl(e), t, n)
                    }
                    ,
                    Gn.invoke = Ol,
                    Gn.isArguments = Wa,
                    Gn.isArray = Va,
                    Gn.isArrayBuffer = Ja,
                    Gn.isArrayLike = qa,
                    Gn.isArrayLikeObject = Ka,
                    Gn.isBoolean = function(e) {
                        return !0 === e || !1 === e || nl(e) && Pr(e) == I
                    }
                    ,
                    Gn.isBuffer = $a,
                    Gn.isDate = Xa,
                    Gn.isElement = function(e) {
                        return nl(e) && 1 === e.nodeType && !il(e)
                    }
                    ,
                    Gn.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (qa(e) && (Va(e) || "string" == typeof e || "function" == typeof e.splice || $a(e) || cl(e) || Wa(e)))
                            return !e.length;
                        var t = hi(e);
                        if (t == E || t == A)
                            return !e.size;
                        if (Ei(e))
                            return !Fr(e).length;
                        for (var n in e)
                            if (De.call(e, n))
                                return !1;
                        return !0
                    }
                    ,
                    Gn.isEqual = function(e, t) {
                        return Mr(e, t)
                    }
                    ,
                    Gn.isEqualWith = function(e, t, n) {
                        var r = (n = "function" == typeof n ? n : o) ? n(e, t) : o;
                        return r === o ? Mr(e, t, o, n) : !!r
                    }
                    ,
                    Gn.isError = Ya,
                    Gn.isFinite = function(e) {
                        return "number" == typeof e && It(e)
                    }
                    ,
                    Gn.isFunction = Za,
                    Gn.isInteger = Qa,
                    Gn.isLength = el,
                    Gn.isMap = rl,
                    Gn.isMatch = function(e, t) {
                        return e === t || Rr(e, t, fi(t))
                    }
                    ,
                    Gn.isMatchWith = function(e, t, n) {
                        return n = "function" == typeof n ? n : o,
                        Rr(e, t, fi(t), n)
                    }
                    ,
                    Gn.isNaN = function(e) {
                        return ol(e) && e != +e
                    }
                    ,
                    Gn.isNative = function(e) {
                        if (xi(e))
                            throw new xe("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                        return Lr(e)
                    }
                    ,
                    Gn.isNil = function(e) {
                        return null == e
                    }
                    ,
                    Gn.isNull = function(e) {
                        return null === e
                    }
                    ,
                    Gn.isNumber = ol,
                    Gn.isObject = tl,
                    Gn.isObjectLike = nl,
                    Gn.isPlainObject = il,
                    Gn.isRegExp = al,
                    Gn.isSafeInteger = function(e) {
                        return Qa(e) && e >= -9007199254740991 && e <= m
                    }
                    ,
                    Gn.isSet = ll,
                    Gn.isString = sl,
                    Gn.isSymbol = ul,
                    Gn.isTypedArray = cl,
                    Gn.isUndefined = function(e) {
                        return e === o
                    }
                    ,
                    Gn.isWeakMap = function(e) {
                        return nl(e) && hi(e) == M
                    }
                    ,
                    Gn.isWeakSet = function(e) {
                        return nl(e) && "[object WeakSet]" == Pr(e)
                    }
                    ,
                    Gn.join = function(e, t) {
                        return null == e ? "" : jt.call(e, t)
                    }
                    ,
                    Gn.kebabCase = Vl,
                    Gn.last = Yi,
                    Gn.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var i = r;
                        return n !== o && (i = (i = vl(n)) < 0 ? bn(r + i, 0) : In(i, r - 1)),
                        t == t ? function(e, t, n) {
                            for (var r = n + 1; r--; )
                                if (e[r] === t)
                                    return r;
                            return r
                        }(e, t, i) : zt(e, Vt, i, !0)
                    }
                    ,
                    Gn.lowerCase = Jl,
                    Gn.lowerFirst = ql,
                    Gn.lt = dl,
                    Gn.lte = fl,
                    Gn.max = function(e) {
                        return e && e.length ? hr(e, os, Tr) : o
                    }
                    ,
                    Gn.maxBy = function(e, t) {
                        return e && e.length ? hr(e, ci(t, 2), Tr) : o
                    }
                    ,
                    Gn.mean = function(e) {
                        return Jt(e, os)
                    }
                    ,
                    Gn.meanBy = function(e, t) {
                        return Jt(e, ci(t, 2))
                    }
                    ,
                    Gn.min = function(e) {
                        return e && e.length ? hr(e, os, Br) : o
                    }
                    ,
                    Gn.minBy = function(e, t) {
                        return e && e.length ? hr(e, ci(t, 2), Br) : o
                    }
                    ,
                    Gn.stubArray = hs,
                    Gn.stubFalse = gs,
                    Gn.stubObject = function() {
                        return {}
                    }
                    ,
                    Gn.stubString = function() {
                        return ""
                    }
                    ,
                    Gn.stubTrue = function() {
                        return !0
                    }
                    ,
                    Gn.multiply = ws,
                    Gn.nth = function(e, t) {
                        return e && e.length ? Wr(e, vl(t)) : o
                    }
                    ,
                    Gn.noConflict = function() {
                        return vt._ === this && (vt._ = Ge),
                        this
                    }
                    ,
                    Gn.noop = us,
                    Gn.now = Ta,
                    Gn.pad = function(e, t, n) {
                        e = bl(e);
                        var r = (t = vl(t)) ? mn(e) : 0;
                        if (!t || r >= t)
                            return e;
                        var o = (t - r) / 2;
                        return Jo(ht(o), n) + e + Jo(mt(o), n)
                    }
                    ,
                    Gn.padEnd = function(e, t, n) {
                        e = bl(e);
                        var r = (t = vl(t)) ? mn(e) : 0;
                        return t && r < t ? e + Jo(t - r, n) : e
                    }
                    ,
                    Gn.padStart = function(e, t, n) {
                        e = bl(e);
                        var r = (t = vl(t)) ? mn(e) : 0;
                        return t && r < t ? Jo(t - r, n) + e : e
                    }
                    ,
                    Gn.parseInt = function(e, t, n) {
                        return n || null == t ? t = 0 : t && (t = +t),
                        Sn(bl(e).replace(ae, ""), t || 0)
                    }
                    ,
                    Gn.random = function(e, t, n) {
                        if (n && "boolean" != typeof n && Ci(e, t, n) && (t = n = o),
                        n === o && ("boolean" == typeof t ? (n = t,
                        t = o) : "boolean" == typeof e && (n = e,
                        e = o)),
                        e === o && t === o ? (e = 0,
                        t = 1) : (e = ml(e),
                        t === o ? (t = e,
                        e = 0) : t = ml(t)),
                        e > t) {
                            var r = e;
                            e = t,
                            t = r
                        }
                        if (n || e % 1 || t % 1) {
                            var i = wn();
                            return In(e + i * (t - e + dt("1e-" + ((i + "").length - 1))), t)
                        }
                        return $r(e, t)
                    }
                    ,
                    Gn.reduce = function(e, t, n) {
                        var r = Va(e) ? Ft : $t
                          , o = arguments.length < 3;
                        return r(e, ci(t, 4), n, o, pr)
                    }
                    ,
                    Gn.reduceRight = function(e, t, n) {
                        var r = Va(e) ? Ut : $t
                          , o = arguments.length < 3;
                        return r(e, ci(t, 4), n, o, mr)
                    }
                    ,
                    Gn.repeat = function(e, t, n) {
                        return t = (n ? Ci(e, t, n) : t === o) ? 1 : vl(t),
                        Xr(bl(e), t)
                    }
                    ,
                    Gn.replace = function() {
                        var e = arguments
                          , t = bl(e[0]);
                        return e.length < 3 ? t : t.replace(e[1], e[2])
                    }
                    ,
                    Gn.result = function(e, t, n) {
                        var r = -1
                          , i = (t = Co(t, e)).length;
                        for (i || (i = 1,
                        e = o); ++r < i; ) {
                            var a = null == e ? o : e[Ui(t[r])];
                            a === o && (r = i,
                            a = n),
                            e = Za(a) ? a.call(e) : a
                        }
                        return e
                    }
                    ,
                    Gn.round = xs,
                    Gn.runInContext = e,
                    Gn.sample = function(e) {
                        return (Va(e) ? Zn : Zr)(e)
                    }
                    ,
                    Gn.size = function(e) {
                        if (null == e)
                            return 0;
                        if (qa(e))
                            return sl(e) ? mn(e) : e.length;
                        var t = hi(e);
                        return t == E || t == A ? e.size : Fr(e).length
                    }
                    ,
                    Gn.snakeCase = Kl,
                    Gn.some = function(e, t, n) {
                        var r = Va(e) ? Bt : io;
                        return n && Ci(e, t, n) && (t = o),
                        r(e, ci(t, 3))
                    }
                    ,
                    Gn.sortedIndex = function(e, t) {
                        return ao(e, t)
                    }
                    ,
                    Gn.sortedIndexBy = function(e, t, n) {
                        return lo(e, t, ci(n, 2))
                    }
                    ,
                    Gn.sortedIndexOf = function(e, t) {
                        var n = null == e ? 0 : e.length;
                        if (n) {
                            var r = ao(e, t);
                            if (r < n && Ga(e[r], t))
                                return r
                        }
                        return -1
                    }
                    ,
                    Gn.sortedLastIndex = function(e, t) {
                        return ao(e, t, !0)
                    }
                    ,
                    Gn.sortedLastIndexBy = function(e, t, n) {
                        return lo(e, t, ci(n, 2), !0)
                    }
                    ,
                    Gn.sortedLastIndexOf = function(e, t) {
                        if (null == e ? 0 : e.length) {
                            var n = ao(e, t, !0) - 1;
                            if (Ga(e[n], t))
                                return n
                        }
                        return -1
                    }
                    ,
                    Gn.startCase = $l,
                    Gn.startsWith = function(e, t, n) {
                        return e = bl(e),
                        n = null == n ? 0 : sr(vl(n), 0, e.length),
                        t = co(t),
                        e.slice(n, n + t.length) == t
                    }
                    ,
                    Gn.subtract = Es,
                    Gn.sum = function(e) {
                        return e && e.length ? Xt(e, os) : 0
                    }
                    ,
                    Gn.sumBy = function(e, t) {
                        return e && e.length ? Xt(e, ci(t, 2)) : 0
                    }
                    ,
                    Gn.template = function(e, t, n) {
                        var r = Gn.templateSettings;
                        n && Ci(e, t, n) && (t = o),
                        e = bl(e),
                        t = Sl({}, t, r, ei);
                        var i, a, l = Sl({}, t.imports, r.imports, ei), s = _l(l), u = en(l, s), c = 0, d = t.interpolate || Se, f = "__p += '", p = ke((t.escape || Se).source + "|" + d.source + "|" + (d === ee ? me : Se).source + "|" + (t.evaluate || Se).source + "|$", "g"), m = "//# sourceURL=" + (De.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++lt + "]") + "\n";
                        e.replace(p, (function(t, n, r, o, l, s) {
                            return r || (r = o),
                            f += e.slice(c, s).replace(we, ln),
                            n && (i = !0,
                            f += "' +\n__e(" + n + ") +\n'"),
                            l && (a = !0,
                            f += "';\n" + l + ";\n__p += '"),
                            r && (f += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                            c = s + t.length,
                            t
                        }
                        )),
                        f += "';\n";
                        var v = De.call(t, "variable") && t.variable;
                        if (v) {
                            if (fe.test(v))
                                throw new xe("Invalid `variable` option passed into `_.template`")
                        } else
                            f = "with (obj) {\n" + f + "\n}\n";
                        f = (a ? f.replace(V, "") : f).replace(J, "$1").replace(q, "$1;"),
                        f = "function(" + (v || "obj") + ") {\n" + (v ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + f + "return __p\n}";
                        var h = Ql((function() {
                            return Ee(s, m + "return " + f).apply(o, u)
                        }
                        ));
                        if (h.source = f,
                        Ya(h))
                            throw h;
                        return h
                    }
                    ,
                    Gn.times = function(e, t) {
                        if ((e = vl(e)) < 1 || e > m)
                            return [];
                        var n = h
                          , r = In(e, h);
                        t = ci(t),
                        e -= h;
                        for (var o = Yt(r, t); ++n < e; )
                            t(n);
                        return o
                    }
                    ,
                    Gn.toFinite = ml,
                    Gn.toInteger = vl,
                    Gn.toLength = hl,
                    Gn.toLower = function(e) {
                        return bl(e).toLowerCase()
                    }
                    ,
                    Gn.toNumber = gl,
                    Gn.toSafeInteger = function(e) {
                        return e ? sr(vl(e), -9007199254740991, m) : 0 === e ? e : 0
                    }
                    ,
                    Gn.toString = bl,
                    Gn.toUpper = function(e) {
                        return bl(e).toUpperCase()
                    }
                    ,
                    Gn.trim = function(e, t, n) {
                        if ((e = bl(e)) && (n || t === o))
                            return Zt(e);
                        if (!e || !(t = co(t)))
                            return e;
                        var r = vn(e)
                          , i = vn(t);
                        return wo(r, nn(r, i), rn(r, i) + 1).join("")
                    }
                    ,
                    Gn.trimEnd = function(e, t, n) {
                        if ((e = bl(e)) && (n || t === o))
                            return e.slice(0, hn(e) + 1);
                        if (!e || !(t = co(t)))
                            return e;
                        var r = vn(e);
                        return wo(r, 0, rn(r, vn(t)) + 1).join("")
                    }
                    ,
                    Gn.trimStart = function(e, t, n) {
                        if ((e = bl(e)) && (n || t === o))
                            return e.replace(ae, "");
                        if (!e || !(t = co(t)))
                            return e;
                        var r = vn(e);
                        return wo(r, nn(r, vn(t))).join("")
                    }
                    ,
                    Gn.truncate = function(e, t) {
                        var n = 30
                          , r = "...";
                        if (tl(t)) {
                            var i = "separator"in t ? t.separator : i;
                            n = "length"in t ? vl(t.length) : n,
                            r = "omission"in t ? co(t.omission) : r
                        }
                        var a = (e = bl(e)).length;
                        if (sn(e)) {
                            var l = vn(e);
                            a = l.length
                        }
                        if (n >= a)
                            return e;
                        var s = n - mn(r);
                        if (s < 1)
                            return r;
                        var u = l ? wo(l, 0, s).join("") : e.slice(0, s);
                        if (i === o)
                            return u + r;
                        if (l && (s += u.length - s),
                        al(i)) {
                            if (e.slice(s).search(i)) {
                                var c, d = u;
                                for (i.global || (i = ke(i.source, bl(ve.exec(i)) + "g")),
                                i.lastIndex = 0; c = i.exec(d); )
                                    var f = c.index;
                                u = u.slice(0, f === o ? s : f)
                            }
                        } else if (e.indexOf(co(i), s) != s) {
                            var p = u.lastIndexOf(i);
                            p > -1 && (u = u.slice(0, p))
                        }
                        return u + r
                    }
                    ,
                    Gn.unescape = function(e) {
                        return (e = bl(e)) && X.test(e) ? e.replace(K, gn) : e
                    }
                    ,
                    Gn.uniqueId = function(e) {
                        var t = ++Fe;
                        return bl(e) + t
                    }
                    ,
                    Gn.upperCase = Xl,
                    Gn.upperFirst = Yl,
                    Gn.each = ba,
                    Gn.eachRight = Ia,
                    Gn.first = qi,
                    ss(Gn, (Ss = {},
                    Cr(Gn, (function(e, t) {
                        De.call(Gn.prototype, t) || (Ss[t] = e)
                    }
                    )),
                    Ss), {
                        chain: !1
                    }),
                    Gn.VERSION = "4.17.21",
                    Nt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], (function(e) {
                        Gn[e].placeholder = Gn
                    }
                    )),
                    Nt(["drop", "take"], (function(e, t) {
                        Vn.prototype[e] = function(n) {
                            n = n === o ? 1 : bn(vl(n), 0);
                            var r = this.__filtered__ && !t ? new Vn(this) : this.clone();
                            return r.__filtered__ ? r.__takeCount__ = In(n, r.__takeCount__) : r.__views__.push({
                                size: In(n, h),
                                type: e + (r.__dir__ < 0 ? "Right" : "")
                            }),
                            r
                        }
                        ,
                        Vn.prototype[e + "Right"] = function(t) {
                            return this.reverse()[e](t).reverse()
                        }
                    }
                    )),
                    Nt(["filter", "map", "takeWhile"], (function(e, t) {
                        var n = t + 1
                          , r = 1 == n || 3 == n;
                        Vn.prototype[e] = function(e) {
                            var t = this.clone();
                            return t.__iteratees__.push({
                                iteratee: ci(e, 3),
                                type: n
                            }),
                            t.__filtered__ = t.__filtered__ || r,
                            t
                        }
                    }
                    )),
                    Nt(["head", "last"], (function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        Vn.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }
                    )),
                    Nt(["initial", "tail"], (function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        Vn.prototype[e] = function() {
                            return this.__filtered__ ? new Vn(this) : this[n](1)
                        }
                    }
                    )),
                    Vn.prototype.compact = function() {
                        return this.filter(os)
                    }
                    ,
                    Vn.prototype.find = function(e) {
                        return this.filter(e).head()
                    }
                    ,
                    Vn.prototype.findLast = function(e) {
                        return this.reverse().find(e)
                    }
                    ,
                    Vn.prototype.invokeMap = Yr((function(e, t) {
                        return "function" == typeof e ? new Vn(this) : this.map((function(n) {
                            return Or(n, e, t)
                        }
                        ))
                    }
                    )),
                    Vn.prototype.reject = function(e) {
                        return this.filter(Da(ci(e)))
                    }
                    ,
                    Vn.prototype.slice = function(e, t) {
                        e = vl(e);
                        var n = this;
                        return n.__filtered__ && (e > 0 || t < 0) ? new Vn(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)),
                        t !== o && (n = (t = vl(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                        n)
                    }
                    ,
                    Vn.prototype.takeRightWhile = function(e) {
                        return this.reverse().takeWhile(e).reverse()
                    }
                    ,
                    Vn.prototype.toArray = function() {
                        return this.take(h)
                    }
                    ,
                    Cr(Vn.prototype, (function(e, t) {
                        var n = /^(?:filter|find|map|reject)|While$/.test(t)
                          , r = /^(?:head|last)$/.test(t)
                          , i = Gn[r ? "take" + ("last" == t ? "Right" : "") : t]
                          , a = r || /^find/.test(t);
                        i && (Gn.prototype[t] = function() {
                            var t = this.__wrapped__
                              , l = r ? [1] : arguments
                              , s = t instanceof Vn
                              , u = l[0]
                              , c = s || Va(t)
                              , d = function(e) {
                                var t = i.apply(Gn, Dt([e], l));
                                return r && f ? t[0] : t
                            };
                            c && n && "function" == typeof u && 1 != u.length && (s = c = !1);
                            var f = this.__chain__
                              , p = !!this.__actions__.length
                              , m = a && !f
                              , v = s && !p;
                            if (!a && c) {
                                t = v ? t : new Vn(this);
                                var h = e.apply(t, l);
                                return h.__actions__.push({
                                    func: ma,
                                    args: [d],
                                    thisArg: o
                                }),
                                new Wn(h,f)
                            }
                            return m && v ? e.apply(this, l) : (h = this.thru(d),
                            m ? r ? h.value()[0] : h.value() : h)
                        }
                        )
                    }
                    )),
                    Nt(["pop", "push", "shift", "sort", "splice", "unshift"], (function(e) {
                        var t = Oe[e]
                          , n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , r = /^(?:pop|shift)$/.test(e);
                        Gn.prototype[e] = function() {
                            var e = arguments;
                            if (r && !this.__chain__) {
                                var o = this.value();
                                return t.apply(Va(o) ? o : [], e)
                            }
                            return this[n]((function(n) {
                                return t.apply(Va(n) ? n : [], e)
                            }
                            ))
                        }
                    }
                    )),
                    Cr(Vn.prototype, (function(e, t) {
                        var n = Gn[t];
                        if (n) {
                            var r = n.name + "";
                            De.call(_n, r) || (_n[r] = []),
                            _n[r].push({
                                name: t,
                                func: n
                            })
                        }
                    }
                    )),
                    _n[zo(o, 2).name] = [{
                        name: "wrapper",
                        func: o
                    }],
                    Vn.prototype.clone = function() {
                        var e = new Vn(this.__wrapped__);
                        return e.__actions__ = Oo(this.__actions__),
                        e.__dir__ = this.__dir__,
                        e.__filtered__ = this.__filtered__,
                        e.__iteratees__ = Oo(this.__iteratees__),
                        e.__takeCount__ = this.__takeCount__,
                        e.__views__ = Oo(this.__views__),
                        e
                    }
                    ,
                    Vn.prototype.reverse = function() {
                        if (this.__filtered__) {
                            var e = new Vn(this);
                            e.__dir__ = -1,
                            e.__filtered__ = !0
                        } else
                            (e = this.clone()).__dir__ *= -1;
                        return e
                    }
                    ,
                    Vn.prototype.value = function() {
                        var e = this.__wrapped__.value()
                          , t = this.__dir__
                          , n = Va(e)
                          , r = t < 0
                          , o = n ? e.length : 0
                          , i = function(e, t, n) {
                            var r = -1
                              , o = n.length;
                            for (; ++r < o; ) {
                                var i = n[r]
                                  , a = i.size;
                                switch (i.type) {
                                case "drop":
                                    e += a;
                                    break;
                                case "dropRight":
                                    t -= a;
                                    break;
                                case "take":
                                    t = In(t, e + a);
                                    break;
                                case "takeRight":
                                    e = bn(e, t - a)
                                }
                            }
                            return {
                                start: e,
                                end: t
                            }
                        }(0, o, this.__views__)
                          , a = i.start
                          , l = i.end
                          , s = l - a
                          , u = r ? l : a - 1
                          , c = this.__iteratees__
                          , d = c.length
                          , f = 0
                          , p = In(s, this.__takeCount__);
                        if (!n || !r && o == s && p == s)
                            return ho(e, this.__actions__);
                        var m = [];
                        e: for (; s-- && f < p; ) {
                            for (var v = -1, h = e[u += t]; ++v < d; ) {
                                var g = c[v]
                                  , y = g.iteratee
                                  , b = g.type
                                  , I = y(h);
                                if (2 == b)
                                    h = I;
                                else if (!I) {
                                    if (1 == b)
                                        continue e;
                                    break e
                                }
                            }
                            m[f++] = h
                        }
                        return m
                    }
                    ,
                    Gn.prototype.at = va,
                    Gn.prototype.chain = function() {
                        return pa(this)
                    }
                    ,
                    Gn.prototype.commit = function() {
                        return new Wn(this.value(),this.__chain__)
                    }
                    ,
                    Gn.prototype.next = function() {
                        this.__values__ === o && (this.__values__ = pl(this.value()));
                        var e = this.__index__ >= this.__values__.length;
                        return {
                            done: e,
                            value: e ? o : this.__values__[this.__index__++]
                        }
                    }
                    ,
                    Gn.prototype.plant = function(e) {
                        for (var t, n = this; n instanceof Hn; ) {
                            var r = ji(n);
                            r.__index__ = 0,
                            r.__values__ = o,
                            t ? i.__wrapped__ = r : t = r;
                            var i = r;
                            n = n.__wrapped__
                        }
                        return i.__wrapped__ = e,
                        t
                    }
                    ,
                    Gn.prototype.reverse = function() {
                        var e = this.__wrapped__;
                        if (e instanceof Vn) {
                            var t = e;
                            return this.__actions__.length && (t = new Vn(this)),
                            (t = t.reverse()).__actions__.push({
                                func: ma,
                                args: [ta],
                                thisArg: o
                            }),
                            new Wn(t,this.__chain__)
                        }
                        return this.thru(ta)
                    }
                    ,
                    Gn.prototype.toJSON = Gn.prototype.valueOf = Gn.prototype.value = function() {
                        return ho(this.__wrapped__, this.__actions__)
                    }
                    ,
                    Gn.prototype.first = Gn.prototype.head,
                    Ze && (Gn.prototype[Ze] = function() {
                        return this
                    }
                    ),
                    Gn
                }();
                vt._ = yn,
                (r = function() {
                    return yn
                }
                .call(t, n, t, e)) === o || (e.exports = r)
            }
            .call(this)
        },
        5660: function(e) {
            e.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Ny43NzY4IDI2LjIzNzVDNDguNzY0OSAyNC41ODc1IDUxLjIzNTEgMjQuNTg3NSA1Mi4yMjMzIDI2LjIzNzVMNzguOTAyMiA3MC43ODc1Qzc5Ljg5MDMgNzIuNDM3NSA3OC42NTUyIDc0LjUgNzYuNjc5IDc0LjVIMjMuMzIxQzIxLjM0NDggNzQuNSAyMC4xMDk3IDcyLjQzNzUgMjEuMDk3OCA3MC43ODc1TDQ3Ljc3NjggMjYuMjM3NVoiIHN0cm9rZT0iI0Y3RjdGOCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iNDkuOTI1IiBjeT0iNjIuMzUxNiIgcj0iMi4zNzUiIGZpbGw9IiNGN0Y3RjgiLz4KPHBhdGggZD0iTTQ5LjkyNSA1NC4yNVY0MyIgc3Ryb2tlPSIjRjdGN0Y4IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
        },
        5796: function(e) {
            e.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Ny43NzY4IDI2LjIzNzVDNDguNzY0OSAyNC41ODc1IDUxLjIzNTEgMjQuNTg3NSA1Mi4yMjMzIDI2LjIzNzVMNzguOTAyMiA3MC43ODc1Qzc5Ljg5MDMgNzIuNDM3NSA3OC42NTUyIDc0LjUgNzYuNjc5IDc0LjVIMjMuMzIxQzIxLjM0NDggNzQuNSAyMC4xMDk3IDcyLjQzNzUgMjEuMDk3OCA3MC43ODc1TDQ3Ljc3NjggMjYuMjM3NVoiIHN0cm9rZT0iIzIwMjIyNyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iNDkuOTI1IiBjeT0iNjIuMzUxNiIgcj0iMi4zNzUiIGZpbGw9IiMyMDIyMjciLz4KPHBhdGggZD0iTTQ5LjkyNSA1NC4yNVY0MyIgc3Ryb2tlPSIjMjAyMjI3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
        },
        4452: function(e, t) {
            var n;
            !function() {
                "use strict";
                var r = {}.hasOwnProperty;
                function o() {
                    for (var e = "", t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        n && (e = a(e, i(n)))
                    }
                    return e
                }
                function i(e) {
                    if ("string" == typeof e || "number" == typeof e)
                        return e;
                    if ("object" != typeof e)
                        return "";
                    if (Array.isArray(e))
                        return o.apply(null, e);
                    if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]"))
                        return e.toString();
                    var t = "";
                    for (var n in e)
                        r.call(e, n) && e[n] && (t = a(t, n));
                    return t
                }
                function a(e, t) {
                    return t ? e ? e + " " + t : e + t : e
                }
                e.exports ? (o.default = o,
                e.exports = o) : void 0 === (n = function() {
                    return o
                }
                .apply(t, [])) || (e.exports = n)
            }()
        }
    }
      , t = {};
    function n(r) {
        var o = t[r];
        if (void 0 !== o)
            return o.exports;
        var i = t[r] = {
            id: r,
            loaded: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n),
        i.loaded = !0,
        i.exports
    }
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, {
            a: t
        }),
        t
    }
    ,
    n.d = function(e, t) {
        for (var r in t)
            n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    n.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var e, t, r, o, i, a, l, s, u, c, d, f = React, p = n.n(f), m = ReactDOM, v = CoreUtilities, h = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, g = ReactUtilities, y = CoreRobloxUtilities, b = Roblox, I = (b.EnvironmentUrls.apiGatewayUrl,
        b.EnvironmentUrls.apiGatewayUrl), C = {
            url: {
                getOmniRecommendations: {
                    url: I + "/discovery-api/omni-recommendation",
                    withCredentials: !0
                },
                getOmniRecommendationsMetadata: {
                    url: I + "/discovery-api/omni-recommendation-metadata",
                    withCredentials: !0
                },
                getOmniSearch: {
                    url: I + "/search-api/omni-search",
                    withCredentials: !0
                },
                getExploreSorts: {
                    url: I + "/explore-api/v1/get-sorts",
                    withCredentials: !0
                },
                getExploreSortContents: {
                    url: I + "/explore-api/v1/get-sort-content",
                    withCredentials: !0
                },
                getSearchLandingPage: {
                    url: I + "/search-api/search-landing-page",
                    withCredentials: !0
                },
                getSurvey: function(e) {
                    return {
                        url: I + "/rocap/v1/locations/" + e + "/prompts",
                        withCredentials: !0
                    }
                },
                postSurveyResults: function(e) {
                    return {
                        url: I + "/rocap/v1/locations/" + e + "/annotations",
                        withCredentials: !0
                    }
                },
                getLandingPageData: function() {
                    return {
                        url: I + "/landing-page-api/landing-page",
                        withCredentials: !0
                    }
                }
            }
        };
        !function(e) {
            e.Game = "Game",
            e.CatalogAsset = "CatalogAsset",
            e.CatalogBundle = "CatalogBundle"
        }(e || (e = {})),
        function(e) {
            e.Carousel = "Carousel",
            e.AvatarCarousel = "AvatarCarousel",
            e.SortlessGrid = "SortlessGrid",
            e.FriendCarousel = "FriendCarousel",
            e.InterestGrid = "InterestGrid",
            e.Pills = "Pills",
            e.Sdui = "sdui",
            e.SongCarousel = "SongCarousel"
        }(t || (t = {})),
        function(e) {
            e.Carousel = "Carousel",
            e.HeroUnit = "HeroUnit"
        }(r || (r = {})),
        function(e) {
            e.Sponsored = "Sponsored",
            e.SponsoredGame = "SponsoredGame"
        }(o || (o = {})),
        function(e) {
            e.AppGameTileNoMetadata = "AppGameTileNoMetadata",
            e.GridTile = "GridTile",
            e.EventTile = "EventTile",
            e.InterestTile = "InterestTile",
            e.ExperienceEventsTile = "ExperienceEventsTile"
        }(i || (i = {})),
        function(e) {
            e.Always = "Always",
            e.Hover = "Hover",
            e.Footer = "Footer"
        }(a || (a = {})),
        function(e) {
            e.Disabled = "Disabled",
            e.Enabled = "Enabled"
        }(l || (l = {})),
        function(e) {
            e.imageOverlay = "imageOverlay"
        }(s || (s = {})),
        function(e) {
            e.All = "all"
        }(u || (u = {})),
        function(e) {
            e.Game = "Game"
        }(c || (c = {})),
        function(e) {
            e.helpIcon = "helpIcon"
        }(d || (d = {}));
        var S = n(8601);
        n(1315);
        function w(e) {
            return w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            w(e)
        }
        function x(e, t) {
            var n = e.elements
              , r = e.threshold;
            try {
                var o = new window.IntersectionObserver(t,{
                    threshold: r
                });
                return n.forEach((function(e) {
                    o.observe(e)
                }
                )),
                function() {
                    return o.disconnect()
                }
            } catch (e) {}
            return function() {}
        }
        var E, P, T, k, N, A, O, _, M, R, L, D = 25, F = .5, U = function(e, t, n) {
            var r = (0,
            f.useRef)(new Set)
              , o = (0,
            f.useRef)(new Set)
              , i = (0,
            f.useRef)(null)
              , a = (0,
            f.useCallback)((function() {
                var e = function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }(Array.from(o.current).filter((function(e) {
                    return !r.current.has(e)
                }
                )), D).filter((function(e) {
                    return e.length > 0
                }
                ));
                e.forEach((function(e) {
                    n(e),
                    e.forEach((function(e) {
                        return r.current.add(e)
                    }
                    ))
                }
                )),
                o.current.clear()
            }
            ), [n])
              , l = (0,
            f.useMemo)((function() {
                return S((function() {
                    return a()
                }
                ), 200)
            }
            ), [a]);
            (0,
            f.useEffect)((function() {
                var t, n, r = Array.from(null !== (t = null == e || null === (n = e.current) || void 0 === n ? void 0 : n.children) && void 0 !== t ? t : []).filter((function(e) {
                    return e instanceof HTMLElement
                }
                ));
                return i.current && (i.current(),
                i.current = null),
                i.current = x({
                    elements: r,
                    threshold: F
                }, (function(e, t) {
                    l.cancel();
                    var n = function(e, t, n) {
                        var r = [];
                        return t.forEach((function(t) {
                            if (null != t && t.isIntersecting) {
                                var o = e.findIndex((function(e) {
                                    return e === t.target
                                }
                                ));
                                o >= 0 && (r.push(o),
                                n.unobserve(t.target))
                            }
                        }
                        )),
                        r.sort((function(e, t) {
                            return e - t
                        }
                        ))
                    }(r, e, t);
                    n.forEach((function(e) {
                        return o.current.add(e)
                    }
                    )),
                    l()
                }
                )),
                function() {
                    l.cancel(),
                    i.current && (i.current(),
                    i.current = null)
                }
            }
            ), [e, t, l, o])
        };
        !function(e) {
            e.ItemImpressions = "itemImpressions",
            e.ItemAction = "itemAction"
        }(E || (E = {})),
        function(e) {
            e.Games = "Games",
            e.Home = "Home",
            e.SearchLanding = "SearchLanding",
            e.Spotlight = "Spotlight",
            e.UserProfile = "UserProfile"
        }(P || (P = {})),
        function(e) {
            e.HomePageSessionInfo = "homePageSessionInfo",
            e.DiscoverPageSessionInfo = "discoverPageSessionInfo",
            e.GameSearchSessionInfo = "gameSearchSessionInfo",
            e.SpotlightPageSessionInfo = "spotlightPageSessionInfo"
        }(T || (T = {})),
        function(e) {
            e.ContentType = "contentType",
            e.Context = "context",
            e.CollectionId = "collectionId",
            e.CollectionPosition = "collectionPosition",
            e.CollectionComponentType = "collectionComponentType"
        }(k || (k = {})),
        function(e) {
            e.User = "User",
            e.Game = "Game"
        }(N || (N = {})),
        function(e) {
            e.Online = "online",
            e.InGame = "inGame",
            e.InStudio = "inStudio",
            e.Offline = "offline"
        }(A || (A = {})),
        function(e) {
            e.Friend = "friend",
            e.NotFriend = "notFriend"
        }(O || (O = {})),
        function(e) {
            e.ItemIds = "itemIds",
            e.ItemPositions = "itemPositions",
            e.RowNumbers = "rowNumbers",
            e.FeedRowNumbers = "feedRowNumbers",
            e.PositionsInRow = "positionsInRow",
            e.PositionsInTopic = "positionsInTopic",
            e.TotalNumberOfItems = "totalNumberOfItems"
        }(_ || (_ = {})),
        function(e) {
            e.Presences = "presences",
            e.PresenceUniverseIds = "presenceUniverseIds",
            e.FriendStatuses = "friendStatuses",
            e.SourceCarousel = "sourceCarousel"
        }(M || (M = {})),
        function(e) {
            e.ItemId = "itemId",
            e.ItemPosition = "itemPosition",
            e.ItemComponentType = "itemComponentType",
            e.RowNumber = "rowNumber",
            e.FeedRowNumber = "feedRowNumber",
            e.PositionInRow = "positionInRow",
            e.PositionInTopic = "positionInTopic",
            e.TotalNumberOfItems = "totalNumberOfItems",
            e.ActionType = "actionType"
        }(R || (R = {})),
        function(e) {
            e.Presence = "presence",
            e.PresenceUniverseId = "presenceUniverseId",
            e.FriendStatus = "friendStatus",
            e.SourceCarousel = "sourceCarousel"
        }(L || (L = {}));
        var B, j = function(e) {
            return Object.keys(e).reduce((function(t, n) {
                var r, o, i = (r = e[n],
                o = !1,
                Array.isArray(r) && !o ? r.join(",") : "object" === w(r) && r ? JSON.stringify(r) : "number" == typeof r || "string" == typeof r ? r : "boolean" == typeof r ? r ? 1 : 0 : void 0);
                return void 0 !== i && (t[n] = i),
                t
            }
            ), {})
        }, G = "robloxAttributionIds";
        !function(e) {
            e.GameDetailReferral = "gameDetailReferral"
        }(B || (B = {}));
        var z, H = function(e) {
            var t = window
              , n = t[G];
            n || (n = {},
            t[G] = n);
            var r = n[e];
            return r || (r = v.uuidService.generateRandomUuid(),
            n[e] = r),
            r
        }, W = function() {
            return document.getElementById("place-list")
        }, V = function(e) {
            return "charts/" + e
        }, J = function(e) {
            return "charts/v2/" + e
        };
        !function(e) {
            e.SearchPage = "searchPage",
            e.SortDetailPageDiscover = "sortDetailPageDiscover",
            e.SortDetailPageHome = "sortDetailPageHome",
            e.GameDetailPage = "gameDetailPage",
            e.GamesPage = "gamesPage",
            e.HomePage = "homePage",
            e.PeopleListInHomePage = "peopleListInHomePage",
            e.InterestCatcher = "interestCatcher",
            e.SearchLandingPage = "searchLandingPage",
            e.SpotlightPage = "spotlightPage"
        }(z || (z = {}));
        var q, K, $, X, Y, Z, Q, ee, te = function() {
            return te = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            te.apply(this, arguments)
        }, ne = function(e, t, n) {
            return void 0 === n && (n = {}),
            v.urlService.getUrlWithQueries(y.entityUrl.game.getRelativePath(e) + "/" + v.seoName.formatSeoName(t), n)
        }, re = function(e, t) {
            var n = encodeURIComponent(e);
            switch (t) {
            case z.HomePage:
                return J(n);
            case z.GamesPage:
                return V(n);
            default:
                return J(n)
            }
        }, oe = function(e, t, n, r) {
            void 0 === n && (n = {}),
            void 0 === r && (r = {});
            var o = re(e, t);
            return v.urlService.getUrlWithQueries(o, te(te({}, n), r))
        }, ie = function(e, t, n, r) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = {}),
            b.Endpoints.attachRelativeUrlLocale(v.urlService.getRelativeUrlWithQueries("/" + re(e, t), te(te({}, n), r)))
        }, ae = function() {
            return document.referrer
        }, le = ne, se = function() {
            return se = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            se.apply(this, arguments)
        }, ue = function(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                    t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
            }
            return n
        }, ce = y.eventStreamService.eventTypes, de = ce.pageLoad, fe = ce.formInteraction;
        !function(e) {
            e.ActionType = "actionType",
            e.AbsPositions = "absPositions",
            e.AdsPositions = "adsPositions",
            e.AdFlags = "adFlags",
            e.Algorithm = "algorithm",
            e.AppliedFilters = "appliedFilters",
            e.AttributionId = "attributionId",
            e.ComponentType = "componentType",
            e.ContentType = "contentType",
            e.Direction = "direction",
            e.Distance = "distance",
            e.HttpReferrer = "httpReferrer",
            e.EmphasisFlag = "emphasisFlag",
            e.FilterId = "filterId",
            e.FilterIds = "filterIds",
            e.FooterTextLiterals = "footerTextLiterals",
            e.FooterLocalizationKeys = "footerLocalizationKeys",
            e.GameSetTargetId = "gameSetTargetId",
            e.GameSetTypeId = "gameSetTypeId",
            e.HeroUnitId = "heroUnitId",
            e.InteractionType = "interactionType",
            e.InteractionUuid = "interactionUuid",
            e.IsAd = "isAd",
            e.NativeAdData = "nativeAdData",
            e.AdIds = "adIds",
            e.NumberOfLoadedTiles = "numberOfLoadedTiles",
            e.Page = "page",
            e.PageSession = "pageSession",
            e.PlaceId = "placeId",
            e.PlayContext = "playContext",
            e.Position = "position",
            e.PreviousOptionId = "previousOptionId",
            e.PromptId = "promptId",
            e.PromptText = "promptText",
            e.ResourceId = "resourceId",
            e.ResponseOptionIds = "responseOptionIds",
            e.ResponseOptionTexts = "responseOptionTexts",
            e.RootPlaceIds = "rootPlaceIds",
            e.SelectedIds = "selectedIds",
            e.SelectedTexts = "selectedTexts",
            e.ScreenSizeX = "screenSizeX",
            e.ScreenSizeY = "screenSizeY",
            e.ScrollAreaSize = "scrollAreaSize",
            e.ScrollDepth = "scrollDepth",
            e.SelectedOptionId = "selectedOptionId",
            e.SelectedOptionIds = "selectedOptionIds",
            e.ShareLinkType = "shareLinkType",
            e.ShareLinkId = "shareLinkId",
            e.SortId = "sortId",
            e.SortPos = "sortPos",
            e.StartDepth = "startDepth",
            e.StartPos = "startPos",
            e.SubPageName = "subPageName",
            e.SuggestionKwd = "suggestionKwd",
            e.SuggestionReplacedKwd = "suggestionReplacedKwd",
            e.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
            e.SuggestionAlgorithm = "suggestionAlgorithm",
            e.TimeToRespond = "timeToRespond",
            e.Token = "token",
            e.Topics = "topics",
            e.TreatmentType = "treatmentType",
            e.UniverseId = "universeId",
            e.UniverseIds = "universeIds",
            e.FriendId = "friendId",
            e.ThumbnailAssetIds = "thumbnailAssetIds",
            e.ThumbnailListIds = "thumbnailListIds",
            e.LinkPath = "linkPath",
            e.LocationName = "locationName",
            e.RowOnPage = "rowOnPage",
            e.RowsOnPage = "rowsOnPage",
            e.PositionInRow = "positionInRow",
            e.PositionsInRow = "positionsInRow",
            e.NavigationUids = "navigationUids",
            e.TileBadgeContexts = "tileBadgeContexts",
            e.ButtonName = "buttonName",
            e.IsInterested = "isInterested",
            e.InterestedUniverseIds = "interestedUniverseIds"
        }(K || (K = {})),
        function(e) {
            e.GameImpressions = "gameImpressions",
            e.GameDetailReferral = "gameDetailReferral",
            e.SortDetailReferral = "sortDetailReferral",
            e.FeedScroll = "feedScroll",
            e.NavigateToSortLink = "navigateToSortLink",
            e.SurveyInteraction = "surveyInteraction",
            e.SurveyImpression = "surveyImpression",
            e.InterestCatcherClick = "interestCatcherClick",
            e.FilterImpressions = "filterImpressions",
            e.GamesFilterClick = "gamesFilterClick",
            e.RequestRefundClick = "requestRefundClick"
        }($ || ($ = {})),
        function(e) {
            e.HomePageSessionInfo = "homePageSessionInfo",
            e.GameSearchSessionInfo = "gameSearchSessionInfo",
            e.DiscoverPageSessionInfo = "discoverPageSessionInfo",
            e.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
            e.SpotlightPageSessionInfo = "spotlightPageSessionInfo"
        }(X || (X = {})),
        function(e) {
            e.Submission = "submission",
            e.Cancellation = "cancellation"
        }(Y || (Y = {})),
        function(e) {
            e.Horizontal = "horizontal",
            e.Vertical = "vertical"
        }(Z || (Z = {})),
        function(e) {
            e.Skip = "skip",
            e.Continue = "continue",
            e.Interested = "interested"
        }(Q || (Q = {})),
        function(e) {
            e.OpenDropdown = "openDropdown",
            e.CloseDropdown = "closeDropdown",
            e.Apply = "apply"
        }(ee || (ee = {}));
        var pe = ((q = {})[$.GameImpressions] = function(e) {
            var t = ue(e, []);
            return [{
                name: $.GameImpressions,
                type: $.GameImpressions,
                context: fe
            }, Ie(se({}, t))]
        }
        ,
        q[$.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: $.GameDetailReferral,
                type: $.GameDetailReferral,
                context: de
            }, Ie(se((t = {},
            t[K.AttributionId] = H(B.GameDetailReferral),
            t[K.HttpReferrer] = ae(),
            t[K.ContentType] = N.Game,
            t[K.ActionType] = "OpenGameDetails",
            t[K.InteractionUuid] = v.uuidService.generateRandomUuid(),
            t), e))]
        }
        ,
        q[$.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.SortDetailReferral,
                type: $.SortDetailReferral,
                context: de
            }, Ie(se({}, e))]
        }
        ,
        q[$.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.NavigateToSortLink,
                type: $.NavigateToSortLink,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.SurveyInteraction,
                type: $.SurveyInteraction,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.SurveyImpression,
                type: $.SurveyImpression,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.InterestCatcherClick,
                type: $.InterestCatcherClick,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.FilterImpressions,
                type: $.FilterImpressions,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: $.GamesFilterClick,
                type: $.GamesFilterClick,
                context: fe
            }, Ie(se({}, e))]
        }
        ,
        q[$.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: $.RequestRefundClick,
                type: $.RequestRefundClick,
                context: fe
            }, Ie((t = {},
            t[K.PlaceId] = e.placeId,
            t))]
        }
        ,
        q)
          , me = function(e, t) {
            return e.layoutDataBySort && void 0 !== t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
        }
          , ve = function(e, t) {
            return (0,
            f.useMemo)((function() {
                return me(e, t)
            }
            ), [e, t])
        }
          , he = function() {
            return he = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            he.apply(this, arguments)
        }
          , ge = "--"
          , ye = ((new b.Intl).getDateTimeFormatter(),
        function(e, t) {
            return e.filter((function(e) {
                var n, r;
                return (null === (n = e.presence) || void 0 === n ? void 0 : n.universeId) === t && (null === (r = e.presence) || void 0 === r ? void 0 : r.userPresenceType) === b.Presence.PresenceTypes.InGame
            }
            ))
        }
        )
          , be = function(e, t) {
            var n = 0;
            if (void 0 !== e && void 0 !== t) {
                if (!Number.isNaN(e) && !Number.isNaN(t)) {
                    if (0 === e && 0 === t)
                        return;
                    n = 0 === e && 0 !== t ? 0 : 0 !== e && 0 === t || (n = Math.floor(e / (e + t) * 100)) > 100 ? 100 : n
                }
                return n
            }
        }
          , Ie = function(e) {
            return Object.keys(e).reduce((function(t, n) {
                return "object" == typeof e[n] && e[n] && (t[n] = JSON.stringify(e[n])),
                "number" == typeof e[n] && (t[n] = e[n]),
                "string" == typeof e[n] && (t[n] = encodeURIComponent(e[n])),
                "boolean" == typeof e[n] && (t[n] = e[n] ? 1 : 0),
                t
            }
            ), {})
        }
          , Ce = function(e, t) {
            var n, r = t.some((function(t) {
                var n;
                return null === (n = e[t]) || void 0 === n ? void 0 : n.isSponsored
            }
            ));
            return r ? ((n = {})[K.AdsPositions] = t.map((function(t) {
                return e[t].isSponsored ? 1 : 0
            }
            )),
            n[K.AdFlags] = t.map((function(t) {
                return e[t].isSponsored ? 1 : 0
            }
            )),
            n[K.AdIds] = t.map((function(t) {
                var n;
                return (null === (n = e[t]) || void 0 === n ? void 0 : n.nativeAdData) || "0"
            }
            )),
            n) : {}
        }
          , Se = function(e, t) {
            var n, r = function(e) {
                var t, n = null === (t = null == e ? void 0 : e.primaryMediaAsset) || void 0 === t ? void 0 : t.wideImageAssetId;
                return n && "0" !== n ? parseInt(n, 10) : null
            };
            return e.layoutDataBySort && t && e.layoutDataBySort[t] ? n = r(e.layoutDataBySort[t]) : e.defaultLayoutData && (n = r(e.defaultLayoutData)),
            n || r(e)
        }
          , we = function(e, t, n, r) {
            var o;
            return r === i.GridTile || r === i.EventTile || r === i.InterestTile ? ((o = {})[K.ThumbnailAssetIds] = n.map((function(n) {
                var r;
                return null !== (r = Se(e[n], t.toString())) && void 0 !== r ? r : "0"
            }
            )),
            o[K.ThumbnailListIds] = n.map((function(n) {
                var r;
                return null !== (r = function(e, t) {
                    var n, r, o;
                    return e.layoutDataBySort && t && e.layoutDataBySort[t] ? null === (n = e.layoutDataBySort[t].primaryMediaAsset) || void 0 === n ? void 0 : n.wideImageListId : e.defaultLayoutData ? null === (r = e.defaultLayoutData.primaryMediaAsset) || void 0 === r ? void 0 : r.wideImageListId : null === (o = e.primaryMediaAsset) || void 0 === o ? void 0 : o.wideImageListId
                }(e[n], t.toString())) && void 0 !== r ? r : "0"
            }
            )),
            o) : {}
        }
          , xe = function(e, t, n, r) {
            var o, a;
            if (r !== i.GridTile && r !== i.EventTile && r !== i.InterestTile)
                return {};
            var l = []
              , s = []
              , u = !1
              , c = !1;
            return n.forEach((function(n) {
                if (e[n]) {
                    var r = t ? t.toString() : void 0
                      , o = function(e) {
                        var t, n, r, o, i, a;
                        return {
                            textLiteral: null !== (r = null === (n = null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.analytics) || void 0 === n ? void 0 : n.textLiteral) && void 0 !== r ? r : "0",
                            localizationKey: null !== (a = null === (i = null === (o = null == e ? void 0 : e.footer) || void 0 === o ? void 0 : o.analytics) || void 0 === i ? void 0 : i.locKey) && void 0 !== a ? a : "0"
                        }
                    }(me(e[n], r))
                      , i = o.textLiteral
                      , a = o.localizationKey;
                    l.push(i),
                    s.push(a),
                    "0" !== i && (u = !0),
                    "0" !== a && (c = !0)
                }
            }
            )),
            he(he({}, u ? ((o = {})[K.FooterTextLiterals] = l,
            o) : {}), c ? ((a = {})[K.FooterLocalizationKeys] = s,
            a) : {})
        }
          , Ee = function(e) {
            var t = e.tileBadgesByPosition
              , n = [];
            if (t) {
                if (t.ImageTopLeft) {
                    var r = t.ImageTopLeft.map((function(e) {
                        return e.analyticsId
                    }
                    ));
                    r && r.length > 0 && n.push("ImageTopLeft=" + r.join("+"))
                }
                return n.length > 0 ? n.join("&") : void 0
            }
        }
          , Pe = function(e, t, n, r) {
            var o;
            return r === i.GridTile || r === i.EventTile || r === i.InterestTile ? ((o = {})[K.TileBadgeContexts] = n.map((function(n) {
                var r;
                return null !== (r = function(e, t) {
                    var n;
                    return e.layoutDataBySort && t && e.layoutDataBySort[t] ? n = Ee(e.layoutDataBySort[t]) : e.defaultLayoutData && (n = Ee(e.defaultLayoutData)),
                    n
                }(e[n], t.toString())) && void 0 !== r ? r : "0"
            }
            )),
            o) : {}
        }
          , Te = function(e, t, n) {
            return {
                positionInRow: n % t,
                rowOnPage: e + Math.floor(n / t)
            }
        }
          , ke = function(e, t, n) {
            var r;
            if (void 0 !== e && void 0 !== t) {
                var o = Te(e, t, n)
                  , i = o.positionInRow
                  , a = o.rowOnPage;
                return (r = {})[K.RowOnPage] = a,
                r[K.PositionInRow] = i,
                r
            }
            return {}
        }
          , Ne = function(e, t, n, r) {
            var o;
            if (void 0 !== e && void 0 !== t && void 0 !== n) {
                var i = []
                  , a = [];
                return r.forEach((function(n) {
                    var r = Te(e, t, n)
                      , o = r.positionInRow
                      , l = r.rowOnPage;
                    a.push(o),
                    i.push(l)
                }
                )),
                (o = {})[K.RowsOnPage] = i,
                o[K.PositionsInRow] = a,
                o
            }
            return {}
        }
          , Ae = v.urlService.parseQueryString
          , Oe = (v.numberFormat.getNumberFormat,
        function(e) {
            return void 0 !== e ? {
                inputUniverseIds: {
                    interestCatcher: e.map((function(e) {
                        return e.toString()
                    }
                    ))
                }
            } : {}
        }
        )
          , _e = be
          , Me = function(e, t) {
            var n = be(e, t);
            return void 0 !== n ? n + "%" : void 0
        }
          , Re = function(e) {
            return -1 === e ? ge : v.abbreviateNumber.getAbbreviatedValue(e)
        }
          , Le = function(e, t) {
            if (0 === e.length || 0 === t)
                return [e];
            var n = Math.ceil(e.length / t);
            return new Array(n).fill(0).map((function(n, r) {
                return e.slice(r * t, (r + 1) * t)
            }
            ))
        }
          , De = function() {
            return De = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            De.apply(this, arguments)
        }
          , Fe = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , Ue = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , Be = function(e) {
            return Fe(void 0, void 0, Promise, (function() {
                return Ue(this, (function(t) {
                    return [2, v.httpService.get({
                        url: b.EnvironmentUrls.thumbnailsApi + "/v1/assets",
                        timeout: 1e4,
                        withCredentials: !0
                    }, {
                        assetIds: [e],
                        size: "768x432",
                        format: "Png"
                    }).then((function(e) {
                        var t, n, r, o;
                        return "Completed" === (null === (n = null === (t = e.data.data) || void 0 === t ? void 0 : t[0]) || void 0 === n ? void 0 : n.state) && (null === (o = null === (r = e.data.data) || void 0 === r ? void 0 : r[0]) || void 0 === o ? void 0 : o.imageUrl) ? e.data.data[0].imageUrl : Promise.reject()
                    }
                    ))]
                }
                ))
            }
            ))
        }
          , je = function(e, n, r, o, i, a) {
            return Fe(void 0, void 0, Promise, (function() {
                var l, s;
                return Ue(this, (function(u) {
                    switch (u.label) {
                    case 0:
                        return l = De(De({
                            pageType: e,
                            sessionId: n,
                            supportedTreatmentTypes: [t.SortlessGrid],
                            sduiTreatmentTypes: a,
                            authIntentData: o
                        }, r), Oe(i)),
                        [4, v.httpService.post(C.url.getOmniRecommendations, l)];
                    case 1:
                        return s = u.sent().data,
                        Object.keys(s.contentMetadata.Game).forEach((function(e) {
                            var t = s.contentMetadata.Game[e];
                            t.placeId = t.rootPlaceId
                        }
                        )),
                        [2, s]
                    }
                }
                ))
            }
            ))
        }
          , Ge = function(e, t) {
            return Fe(void 0, void 0, Promise, (function() {
                var n;
                return Ue(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, v.httpService.post(C.url.getOmniRecommendationsMetadata, {
                            contents: e,
                            sessionId: t
                        })];
                    case 1:
                        return n = r.sent().data,
                        Object.keys(n.contentMetadata.Game).forEach((function(e) {
                            var t = n.contentMetadata.Game[e];
                            t.placeId = t.rootPlaceId
                        }
                        )),
                        [2, n]
                    }
                }
                ))
            }
            ))
        }
          , ze = function() {
            return b.Guac.callBehaviour("app-policy")
        }
          , He = function(e) {
            return Fe(void 0, void 0, Promise, (function() {
                var t, n;
                return Ue(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return t = {
                            url: b.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                            retryable: !0,
                            withCredentials: !0
                        },
                        n = {
                            userIds: e,
                            fields: ["names.combinedName", "names.username"]
                        },
                        [4, v.httpService.post(t, n)];
                    case 1:
                        return [2, r.sent().data]
                    }
                }
                ))
            }
            ))
        }
          , We = n(5796)
          , Ve = n.n(We)
          , Je = n(5660)
          , qe = n.n(Je)
          , Ke = function() {
            return Ke = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ke.apply(this, arguments)
        };
        function $e(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                    t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
            }
            return n
        }
        function Xe(e) {
            var t, n, r = "";
            if ("string" == typeof e || "number" == typeof e)
                r += e;
            else if ("object" == typeof e)
                if (Array.isArray(e)) {
                    var o = e.length;
                    for (t = 0; t < o; t++)
                        e[t] && (n = Xe(e[t])) && (r && (r += " "),
                        r += n)
                } else
                    for (n in e)
                        e[n] && (r && (r += " "),
                        r += n);
            return r
        }
        var Ye = function() {
            for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
                (e = arguments[n]) && (t = Xe(e)) && (r && (r += " "),
                r += t);
            return r
        }
          , Ze = "relative clip group/interactable focus-visible:outline-focus disabled:outline-none"
          , Qe = function() {
            return p().createElement("div", {
                role: "presentation",
                className: "absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)] group-disabled/interactable:bg-none"
            })
        }
          , et = "opacity-[0.5]";
        !function(e, t) {
            void 0 === t && (t = {});
            var n = t.insertAt;
            if (e && "undefined" != typeof document) {
                var r = document.head || document.getElementsByTagName("head")[0]
                  , o = document.createElement("style");
                o.type = "text/css",
                "top" === n && r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o),
                o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
            }
        }("@keyframes rotation{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}.foundation-web-loading-spinner{animation:rotation 1s linear infinite normal}");
        var tt = function(e) {
            var t = e.width
              , n = e.height;
            return p().createElement("svg", {
                className: "foundation-web-loading-spinner",
                width: t,
                height: n,
                viewBox: "0 0 20 20",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, p().createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                fill: "currentColor",
                d: "M10 2.75C8.56609 2.75 7.16438 3.1752 5.97212 3.97185C4.77986 4.76849 3.85061 5.90078 3.30188 7.22554C2.75314 8.55031 2.60957 10.008 2.88931 11.4144C3.16905 12.8208 3.85955 14.1126 4.87348 15.1265C5.88741 16.1405 7.17924 16.831 8.5856 17.1107C9.99196 17.3904 11.4497 17.2469 12.7745 16.6981C14.0992 16.1494 15.2315 15.2201 16.0282 14.0279C16.8248 12.8356 17.25 11.4339 17.25 10C17.25 9.58579 17.5858 9.25 18 9.25C18.4142 9.25 18.75 9.58579 18.75 10C18.75 11.7306 18.2368 13.4223 17.2754 14.8612C16.3139 16.3002 14.9473 17.4217 13.3485 18.0839C11.7496 18.7462 9.9903 18.9195 8.29296 18.5819C6.59563 18.2443 5.03653 17.4109 3.81282 16.1872C2.58911 14.9635 1.75575 13.4044 1.41813 11.707C1.08051 10.0097 1.25379 8.25037 1.91606 6.65152C2.57832 5.05267 3.69983 3.6861 5.13876 2.72464C6.57769 1.76318 8.26942 1.25 10 1.25C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75Z"
            }))
        }
          , nt = ["Emphasis", "Standard", "SoftEmphasis", "ActionUtility", "Alert"]
          , rt = ["XSmall", "Small", "Medium", "Large"]
          , ot = {
            Large: 24,
            Medium: 20,
            Small: 16,
            XSmall: 12
        }
          , it = {
            Large: ["radius-medium", "text-label-large", "height-1200", "padding-x-large"],
            Medium: ["radius-medium", "text-label-medium", "height-1000", "padding-x-medium"],
            Small: ["radius-medium", "text-label-small", "height-800", "padding-x-small"],
            XSmall: ["radius-small", "text-label-small", "height-600", "padding-x-small"]
        }
          , at = {
            Emphasis: ["bg-action-emphasis", "content-action-emphasis"],
            Standard: ["bg-action-standard", "content-action-standard"],
            SoftEmphasis: ["bg-action-soft-emphasis", "content-action-soft-emphasis"],
            ActionUtility: ["bg-action-subtle", "content-action-standard"],
            Alert: ["bg-action-alert", "content-action-alert"]
        }
          , lt = {
            Emphasis: ["bg-action-standard", "content-action-standard"],
            Standard: ["bg-action-standard", "content-action-standard"],
            SoftEmphasis: ["bg-action-standard", "content-action-standard"],
            ActionUtility: ["bg-action-subtle", "content-action-standard"],
            Alert: ["bg-action-standard", "content-action-standard"]
        }
          , st = (0,
        f.forwardRef)((function(e, t) {
            var n = e.children
              , r = e.className
              , o = e.style
              , i = e.as
              , a = e.isDisabled
              , l = void 0 !== a && a
              , s = e.isLoading
              , u = void 0 !== s && s
              , c = e.size
              , d = void 0 === c ? "Large" : c
              , f = e.variant
              , m = void 0 === f ? "Emphasis" : f
              , v = $e(e, ["children", "className", "style", "as", "isDisabled", "isLoading", "size", "variant"])
              , h = null != i ? i : "button"
              , g = v.href
              , y = $e(v, ["href"]);
            return p().createElement(h, Ke({
                ref: t,
                type: "button" === h ? "button" : void 0,
                disabled: l,
                "aria-disabled": l,
                href: l ? void 0 : g
            }, y, {
                className: Ye("foundation-web-button", Ze, l ? et : "cursor-pointer", "flex items-center justify-center stroke-none padding-y-none select-none", it[d], l ? lt[m] : at[m], r),
                style: Ke({
                    textDecoration: "none"
                }, o)
            }), p().createElement(Qe, null), u && p().createElement("div", {
                "aria-hidden": "true",
                className: "absolute flex"
            }, p().createElement(tt, {
                width: ot[d],
                height: ot[d]
            })), p().createElement("span", {
                className: Ye("padding-y-xsmall text-truncate-end text-no-wrap", u && "invisible")
            }, n))
        }
        ))
          , ut = {
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
            omniRecommendationFeedStatsLoggingErrorEvent: "HomePageOmniRecommendationFeedStatsLoggingError",
            linkStartDelimiter: "{linkStart}",
            linkEndDelimiter: "{linkEnd}"
        }
          , ct = {
            numGameCarouselLookAheadWindows: 3,
            adSortDiscoverId: 27,
            carouselContainerBufferWidth: 80,
            gameTileGutterWidth: 14,
            wideGameTileGutterWidth: 16,
            scrollerWidth: 30
        }
          , dt = {
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
          , ft = .1
          , pt = -1
          , mt = 5
          , vt = ut
          , ht = ct
          , gt = dt
          , yt = {
            retryText: "Action.Retry",
            somethingWentWrongText: "Response.SomethingWentWrong"
        }
          , bt = (0,
        g.withTranslations)((function(e) {
            var t = e.errorSubtext
              , n = e.onRefresh
              , r = e.translate
              , o = (0,
            g.useTheme)();
            return p().createElement("div", {
                "data-testid": "error-container",
                className: "discovery-error-container"
            }, p().createElement("div", {
                className: "error-container-content"
            }, p().createElement("img", {
                "data-testid": "error-container-image",
                className: "error-container-content-image",
                src: "dark" === o ? qe() : Ve(),
                alt: ""
            }), p().createElement("h2", null, r(yt.somethingWentWrongText)), p().createElement("p", {
                className: "error-container-content-subtext"
            }, t)), n && p().createElement(st, {
                "data-testid": "error-refresh-button",
                variant: "Standard",
                size: "Medium",
                onClick: n
            }, p().createElement("span", null, r(yt.retryText))))
        }
        ), {
            common: ["CommonUI.Messages", "CommonUI.Controls"],
            feature: ""
        })
          , It = n(4452)
          , Ct = n.n(It)
          , St = function(e, t) {
            var n;
            return void 0 === t && (t = 300),
            [function() {
                for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                clearTimeout(n),
                n = setTimeout((function() {
                    e.apply(undefined, r)
                }
                ), t)
            }
            , function() {
                clearTimeout(n)
            }
            ]
        };
        var wt, xt = function() {
            var e = (0,
            f.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = St((function() {
                n(!0)
            }
            ), 100)
              , o = r[0]
              , i = r[1]
              , a = St((function() {
                n(!1)
            }
            ), 100)
              , l = a[0]
              , s = a[1];
            return [t, function() {
                s(),
                o()
            }
            , function() {
                i(),
                l()
            }
            ]
        }, Et = HeaderScripts, Pt = b.EnvironmentUrls.gamesApi, Tt = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: Pt + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: Pt + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: Pt + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: Pt + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: Pt + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: Pt + "/v1/games/sorts",
                    withCredentials: !0
                },
                getUniverseVoiceStatus: function(e) {
                    return {
                        withCredentials: !0,
                        url: b.EnvironmentUrls.voiceApi + "/v1/settings/universe/" + e
                    }
                },
                getVoiceOptInStatus: {
                    withCredentials: !0,
                    url: b.EnvironmentUrls.voiceApi + "/v1/settings/user-opt-in"
                },
                getAssetDataFromAssetId: function(e) {
                    return {
                        url: b.EnvironmentUrls.assetDeliveryApi + "/v2/assetId/" + e,
                        withCredentials: !0
                    }
                }
            },
            defaultCacheCriteria: {
                refreshCache: !1,
                expirationWindowMS: 3e4,
                useCache: !0
            }
        }, kt = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }, Nt = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }, At = Tt.defaultCacheCriteria, Ot = y.dataStores.gamesDataStore, _t = y.dataStores.userDataStoreV2, Mt = (y.dataStores.localeDataStore,
        y.dataStores.userDataStore.FriendsUserSortType), Rt = function() {
            return _t.getFriends({
                userId: null === Et.authenticatedUser || void 0 === Et.authenticatedUser ? void 0 : Et.authenticatedUser.id,
                userSort: Mt.StatusFrequents,
                isGuest: !1
            }, At)
        }, Lt = function(e) {
            return kt(void 0, void 0, Promise, (function() {
                return Nt(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return [4, Ot.getGameDetails([e])];
                    case 1:
                        return [2, t.sent().data.data[0]]
                    }
                }
                ))
            }
            ))
        }, Dt = function(e) {
            return kt(void 0, void 0, Promise, (function() {
                var t;
                return Nt(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, Ot.getPlaceDetails([e])];
                    case 1:
                        return t = n.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                }
                ))
            }
            ))
        }, Ft = function(e) {
            return v.httpService.get(Tt.url.getAssetDataFromAssetId(e)).then((function(e) {
                return e.data
            }
            ))
        };
        !function(e) {
            e.INVALID = "Invalid",
            e.IMAGE_TOP_LEFT = "ImageTopLeft",
            e.IMAGE_BOTTOM_LEFT = "ImageBottomLeft"
        }(wt || (wt = {}));
        var Ut, Bt, jt, Gt, zt, Ht, Wt, Vt;
        !function(e) {
            e.Home = "Home",
            e.Games = "Games"
        }(Ut || (Ut = {})),
        function(e) {
            e.Games = "Games"
        }(Bt || (Bt = {})),
        function(e) {
            e.Carousel = "Carousel"
        }(jt || (jt = {})),
        function(e) {
            e.Invalid = "Invalid",
            e.HasLootBoxes = "HasLootBoxes",
            e.HasInGameTrading = "HasInGameTrading",
            e.IsUsingLootBoxApi = "IsUsingLootBoxApi",
            e.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
            e.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
            e.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi"
        }(Gt || (Gt = {})),
        function(e) {
            e.MorphToR6 = "MorphToR6",
            e.PlayerChoice = "PlayerChoice",
            e.MorphToR15 = "MorphToR15"
        }(zt || (zt = {})),
        function(e) {
            e.Scroll = "Scroll",
            e.Button = "Button"
        }(Ht || (Ht = {})),
        function(e) {
            e.TextLabel = "TextLabel"
        }(Wt || (Wt = {})),
        function(e) {
            e.Text = "Text",
            e.Icon = "Icon"
        }(Vt || (Vt = {}));
        var Jt = function(e) {
            return "icons/menu/gem_small" === e ? "icon-gem-dark-stroke" : null
        }
          , qt = function(e) {
            return e.isShimmerEnabled ? "shimmer-animation" : null
        }
          , Kt = function(e) {
            return e === wt.IMAGE_TOP_LEFT ? "game-card-pill-top-left" : ""
        }
          , $t = function(e) {
            var t, n, r = [], o = null === (n = null == e ? void 0 : e.tileBadgesByPosition) || void 0 === n ? void 0 : n.ImageTopLeft;
            return o && o.length && (r = o.map((function(e) {
                var t = {
                    id: e.analyticsId
                };
                if (e.tileBadgeType === Vt.Text && e.text)
                    t.text = e.text,
                    t.animationClass = qt(e);
                else if (e.tileBadgeType === Vt.Icon && e.icons) {
                    var n = e.icons.map((function(e) {
                        return Jt(e)
                    }
                    )).filter((function(e) {
                        return !!e
                    }
                    ));
                    t.icons = n,
                    t.animationClass = qt(e)
                }
                return t
            }
            ))),
            r.length ? ((t = {})[wt.IMAGE_TOP_LEFT] = r,
            t) : null
        }
          , Xt = function(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === Wt.TextLabel ? e.footer : null
        }
          , Yt = ReactStyleGuide
          , Zt = RobloxThumbnails
          , Qt = {
            ActionApply: "Action.Apply",
            LabelSponsoredAd: "Label.SponsoredAd",
            LabelNoSearchResults: "LabelNoSearchResults",
            LabelPlayingOnePlusUsersWithComma: "LabelPlayingOnePlusUsersWithComma",
            LabelPlayingOneUser: "LabelPlayingOneUser",
            LabelBy: "LabelCreatorBy",
            LabelByPrefix: "Label.By"
        }
          , en = {
            LabelApiError: "Label.ApiError",
            LabelGames: "Label.Games",
            LabelSponsoredAdsDisclosureStatic: "Label.SponsoredAdsDisclosureStatic",
            LabelContentLoadFailed: "Label.ContentLoadFailed"
        }
          , tn = {
            LabelCharts: "Label.Charts",
            LabelsHome: "Label.sHome",
            ActionClose: "Action.Close",
            ActionDropdownSelected: "Action.DropdownSelected",
            ActionDropdownNotSelected: "Action.DropdownNotSelected"
        }
          , nn = {
            ActionSeeAll: "Action.SeeAll",
            ActionInterestCatcherContinue: "Action.InterestCatcherContinue",
            ActionInterestCatcherContinueSelected: "Action.InterestCatcherContinueSelected",
            ActionInterestCatcherSkip: "Action.InterestCatcherSkip",
            ActionInterestCatcherInterested: "Action.InterestCatcherInterested"
        }
          , rn = {
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
            LabelContentFailedToLoad: "Label.ContentFailedToLoad",
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
            LabelVoiceChat: "Label.VoiceChat",
            HeadingRefund: "Heading.Refund",
            ActionRequestRefund: "Action.RequestRefund",
            HeadingNotice: "Body.NotesTitle",
            InExperiencePurchase: "Notes.InExperiencePurchase"
        }
          , on = PropTypes
          , an = n.n(on)
          , ln = "Label.ContextMenuTitle"
          , sn = "Action.ViewDetails"
          , un = "Action.JoinGame"
          , cn = {
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
        function dn(e) {
            var t = e.game
              , n = e.translate
              , r = t.universeId
              , o = t.name
              , i = t.referralUrl
              , a = t.isPlayable
              , l = p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameIcon,
                size: Zt.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: Zt.ThumbnailFormat.jpeg
            });
            return p().createElement("div", {
                className: "border-bottom player-interaction-container"
            }, p().createElement("span", {
                className: "cursor-pointer game-icon"
            }, p().createElement(Yt.Link, {
                url: i,
                className: "game-card-link"
            }, l)), p().createElement("span", {
                className: "game-info-container"
            }, p().createElement(Yt.Link, {
                url: i,
                className: "game-name"
            }, o), !a && p().createElement(Yt.Link, {
                url: i,
                className: "btn-control-sm game-link"
            }, n(sn))))
        }
        dn.propTypes = {
            game: an().shape({
                universeId: an().number,
                placeId: an().number,
                name: an().string,
                playerCount: an().number,
                isShowSponsoredLabel: an().bool,
                nativeAdData: an().string,
                imageUrl: an().string,
                referralUrl: an().string,
                isPlayable: an().bool
            }).isRequired,
            translate: an().func.isRequired
        };
        var fn = dn;
        function pn(e) {
            var t = e.playerId
              , n = e.altName;
            return p().createElement("div", {
                className: "avatar-card-link"
            }, p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.avatarHeadshot,
                size: Zt.ThumbnailAvatarHeadshotSize.size48,
                targetId: t,
                imgClassName: "avatar-card-image",
                format: Zt.ThumbnailFormat.webp,
                altName: n
            }))
        }
        pn.defaultProps = {
            altName: ""
        },
        pn.propTypes = {
            playerId: an().number.isRequired,
            altName: an().string
        };
        var mn = pn;
        function vn(e) {
            var t = e.playerData
              , n = e.dismissModal
              , r = e.isPlayable
              , o = e.translate
              , i = t.presence
              , a = i.rootPlaceId
              , l = i.placeId
              , s = i.gameId
              , u = t.id
              , c = t.nameForDisplay;
            return p().createElement("div", {
                className: "border-bottom player-info"
            }, p().createElement("span", {
                className: "player-name"
            }, c), p().createElement(Yt.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , r = y.playGameService.buildPlayGameProperties(a, l, s, u)
                      , o = cn
                      , i = o.joinGameInPlacesList
                      , c = o.gamePlayIntentInPlacesList
                      , d = {
                        eventName: i.name,
                        ctx: i.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: c.ctx
                    };
                    y.playGameService.launchGame(r, d),
                    n(e)
                },
                isDisabled: !r
            }, o(un)))
        }
        vn.propTypes = {
            playerData: an().shape({
                presence: an().shape({
                    rootPlaceId: an().number,
                    placeId: an().number,
                    gameId: an().string
                }),
                id: an().number,
                nameForDisplay: an().string
            }).isRequired,
            dismissModal: an().func.isRequired,
            isPlayable: an().bool.isRequired,
            translate: an().func.isRequired
        };
        var hn = vn;
        function gn(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.dismissModal
              , o = e.isPlayable
              , i = e.translate
              , a = {};
            return t.forEach((function(e) {
                a[e.id] = e
            }
            )),
            p().createElement("div", {
                className: "interaction-container"
            }, p().createElement("ul", {
                className: "interaction-list"
            }, n.map((function(e, t) {
                var n = e + t
                  , l = a[e]
                  , s = l.id
                  , u = l.nameForDisplay;
                return p().createElement("li", {
                    key: n,
                    className: "interaction-item",
                    "aria-hidden": "true"
                }, p().createElement("span", {
                    className: "avatar avatar-headshot avatar-headshot-sm player-avatar"
                }, p().createElement(mn, {
                    playerId: s,
                    altName: u
                })), p().createElement(hn, {
                    playerData: l,
                    dismissModal: r,
                    isPlayable: o,
                    translate: i
                }))
            }
            ))))
        }
        gn.propTypes = {
            friendsData: an().arrayOf(an().shape({
                presense: an().shape({
                    rootPlaceId: an().number,
                    placeId: an().number,
                    gameId: an().string
                }),
                id: an().number,
                nameForDisplay: an().string
            })).isRequired,
            friendsInGame: an().arrayOf(an().number).isRequired,
            dismissModal: an().func.isRequired,
            isPlayable: an().bool.isRequired,
            translate: an().func.isRequired
        };
        var yn = gn;
        function bn(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , a = i(ln);
            return p().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, p().createElement(Yt.Modal.Header, {
                title: a,
                onClose: o
            }), p().createElement(fn, {
                game: r,
                translate: i
            }), p().createElement(yn, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        bn.propTypes = {
            friendsData: an().arrayOf(an().shape({
                presense: an().shape({
                    rootPlaceId: an().number,
                    placeId: an().number,
                    gameId: an().string
                }),
                id: an().number,
                nameForDisplay: an().string
            })).isRequired,
            friendsInGame: an().arrayOf(an().number).isRequired,
            game: an().shape({
                universeId: an().number,
                placeId: an().number,
                name: an().string,
                playerCount: an().number,
                isShowSponsoredLabel: an().bool,
                nativeAdData: an().string,
                imageUrl: an().string,
                referralUrl: an().string,
                isPlayable: an().bool
            }).isRequired,
            dismissModal: an().func.isRequired,
            translate: an().func.isRequired
        };
        var In = bn
          , Cn = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        }
          , Sn = function(e) {
            var t = e.tooltipText
              , n = e.placement
              , r = e.sizeInPx
              , o = void 0 === r ? 16 : r
              , i = e.centerIcon;
            return p().createElement("span", {
                className: Ct()("info-tooltip-container", {
                    "icon-centered": i
                })
            }, p().createElement(Yt.Tooltip, {
                id: "games-info-tooltip",
                placement: n,
                containerClassName: Ct()("games-info-tooltip", {
                    "icon-centered": i
                }),
                content: t
            }, p().createElement("svg", {
                width: o,
                height: o,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, p().createElement("path", {
                d: "M8.97 5.44H7V4H8.97V5.44Z",
                fill: "currentColor"
            }), p().createElement("path", {
                d: "M8.94347 11.9999H7.05347V6.37988H8.94347V11.9999Z",
                fill: "currentColor"
            }), p().createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",
                fill: "currentColor"
            }))))
        };
        Sn.defaultProps = {
            sizeInPx: 16
        };
        var wn, xn, En = Sn, Pn = function() {
            return Pn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Pn.apply(this, arguments)
        }, Tn = ((wn = {})[i.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        wn[i.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        wn[i.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        wn[i.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        wn[i.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        wn), kn = Pn(Pn({}, Tn), ((xn = {})[i.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        xn)), Nn = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        }, An = function(e) {
            var t, n = e.animationClass, r = e.isFocused, o = e.icons, i = e.text;
            return (null == o ? void 0 : o.length) || i ? p().createElement("div", {
                className: "game-card-pill-with-animation"
            }, p().createElement("div", {
                className: Ct()("game-card-pill-animation-container", (t = {},
                t[null != n ? n : ""] = n && r,
                t))
            }, (null == o ? void 0 : o.length) && o.map((function(e, t) {
                return p().createElement("span", {
                    key: t,
                    className: "game-card-pill-icon " + e
                })
            }
            )), i && p().createElement("div", {
                className: "game-card-pill-text"
            }, i))) : null
        };
        An.defaultProps = {
            animation: void 0
        };
        var On = An
          , _n = function(e) {
            var t = e.pills
              , n = e.isFocused
              , r = Object.keys(t);
            return p().createElement(f.Fragment, null, r.map((function(e) {
                var r;
                return function(e) {
                    var n;
                    return !!(null === (n = t[e]) || void 0 === n ? void 0 : n.length)
                }(e) && p().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + Kt(e)
                }, null === (r = t[e]) || void 0 === r ? void 0 : r.map((function(e) {
                    return p().createElement(On, {
                        key: e.id,
                        id: e.id,
                        animationClass: e.animationClass,
                        icons: e.icons,
                        text: e.text,
                        isFocused: n
                    })
                }
                )))
            }
            )))
        }
          , Mn = function(e) {
            var t = e.playerCount
              , n = Re(t);
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-player-count"
            }, p().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), p().createElement("span", {
                className: "info-label playing-counts-label"
            }, n))
        }
          , Rn = function(e) {
            var t = e.playerCount
              , n = e.playerCountStyle
              , r = Ct()("game-card-image-pill", {
                "hover-only": n === a.Hover
            });
            return p().createElement("div", {
                className: r,
                "data-testid": "game-tile-player-count-pill"
            }, p().createElement(Mn, {
                playerCount: t
            }))
        };
        Rn.defaultProps = {
            playerCountStyle: void 0
        };
        var Ln = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        }
          , Dn = function(e) {
            var t = e.featureTypes;
            return p().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, t.map((function(e) {
                return Ln[e] && p().createElement("span", {
                    key: e,
                    className: Ln[e]
                })
            }
            ))))
        }
          , Fn = function(e) {
            var t, n = e.gameLayoutData, r = e.playerCountStyle, o = e.playerCount, i = e.isFocused, l = $t(n);
            return l ? p().createElement(_n, {
                pills: l,
                isFocused: i
            }) : (null === (t = null == n ? void 0 : n.pill) || void 0 === t ? void 0 : t.types) && n.pill.types.length > 0 ? p().createElement(Dn, {
                featureTypes: n.pill.types
            }) : void 0 === o || r !== a.Always && r !== a.Hover ? null : p().createElement(Rn, {
                playerCount: o,
                playerCountStyle: r
            })
        };
        Fn.defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Un = Fn
          , Bn = function() {
            return Bn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Bn.apply(this, arguments)
        }
          , jn = dt.keyBoardEventCode
          , Gn = dt.numberOfInGameAvatarIcons
          , zn = dt.numberOfInGameNames
          , Hn = function(e) {
            var t = e.id
              , n = e.children
              , r = e.gameData
              , o = e.isOnScreen
              , i = e.page
              , a = e.buildEventProperties
              , l = e.isFocused
              , s = e.topicId
              , u = Zt.ThumbnailGameIconSize.size256
              , c = ve(r, s);
            return p().createElement(Yt.Link, {
                url: le(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, p().createElement(Un, {
                gameLayoutData: c,
                isFocused: !!l
            }), i === z.GamesPage ? p().createElement("div", {
                className: "game-card-thumb-container"
            }, p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameIcon,
                size: u,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: Zt.ThumbnailFormat.jpeg,
                altName: r.name
            })) : p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameIcon,
                size: u,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: Zt.ThumbnailFormat.jpeg,
                altName: r.name
            }), p().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        };
        Hn.defaultProps = {
            page: z.HomePage,
            isOnScreen: !0,
            isFocused: !1
        };
        var Wn = function(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.playerCount
              , o = Me(n, t)
              , i = Re(r);
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats"
            }, p().createElement("span", {
                className: "info-label icon-votes-gray"
            }), o ? p().createElement("span", {
                className: "info-label vote-percentage-label"
            }, o) : p().createElement("span", {
                className: "info-label no-vote"
            }), p().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), p().createElement("span", {
                className: "info-label playing-counts-label"
            }, i))
        }
          , Vn = function(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , o = dt.RatingPercentageText
              , i = _e(n, t)
              , a = (null == i ? void 0 : i.toString()) || ge;
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-rating"
            }, p().createElement("span", {
                className: "info-label icon-votes-gray"
            }), p().createElement("span", {
                className: "info-label vote-percentage-label"
            }, r(o, {
                percentRating: a
            }) || a + "% Rating"))
        }
          , Jn = function(e) {
            var t = e.footerData;
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, p().createElement("span", {
                className: "info-label"
            }, t.text.textLiteral))
        }
          , qn = function(e) {
            var t = e.iconClassName
              , n = e.text;
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, p().createElement("span", {
                className: Ct()("info-label", t)
            }), p().createElement("span", {
                className: "info-label text-label-with-icon"
            }, n))
        }
          , Kn = function(e) {
            var t = e.footerText;
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, p().createElement("span", {
                className: "info-label"
            }, t))
        }
          , $n = function(e) {
            var t = e.translate;
            return p().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, p().createElement("div", {
                className: "native-ad-label"
            }, t(Qt.LabelSponsoredAd), p().createElement(En, {
                tooltipText: t(en.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            })))
        }
          , Xn = function(e) {
            var t = e.user;
            return p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.avatarHeadshot,
                size: Zt.ThumbnailAvatarHeadshotSize.size48,
                targetId: t.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: Zt.ThumbnailFormat.webp,
                altName: t.displayName
            })
        }
          , Yn = function(e) {
            var t = e.translate;
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, p().createElement("span", {
                className: "info-label interleaved-sponsored"
            }, t(Qt.LabelSponsoredAd)), p().createElement(En, {
                tooltipText: t(en.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 16
            }))
        }
          , Zn = function(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = dt.maxFacepileFriendCountValue
              , o = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Gn ? null == t ? void 0 : t.length.toString() : ""
              , i = o ? Gn - 1 : Gn
              , a = Ct()("avatar-card", {
                "avatar-card-online": n
            });
            return p().createElement("div", {
                className: "info-avatar"
            }, o && p().createElement("div", {
                className: a
            }, p().createElement("div", {
                className: "avatar-count-container"
            }, p().createElement("span", {
                className: "avatar-count info-label"
            }, o))), t.slice(0, i).map((function(e) {
                return p().createElement("div", {
                    className: a,
                    key: e.displayName
                }, p().createElement(Xn, {
                    user: e
                }))
            }
            )))
        }
          , Qn = function(e) {
            var t = e.friendsData
              , n = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return p().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (n ? "online" : "offline") + "-friends-facepile"
            }, p().createElement(Zn, {
                friendsData: t,
                isOnline: n
            }), p().createElement("span", {
                className: "info-label"
            }, t.map((function(e) {
                return e.displayName
            }
            )).join(", ")))
        }
          , er = function(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            f.useState)(!1)
              , i = o[0]
              , a = o[1];
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return p().createElement("div", {
                className: "game-card-friend-info game-card-info",
                "data-testid": "game-tile-stats-friends"
            }, p().createElement("div", {
                className: "info-avatar",
                style: {
                    width: 22 * (t.slice(0, Gn).length - 1) + 32 + "px"
                }
            }, t.slice(0, Gn).map((function(e) {
                return p().createElement("div", {
                    className: "avatar-card",
                    role: "button",
                    tabIndex: 0,
                    key: e.displayName,
                    onClick: function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        a(!0)
                    },
                    onKeyDown: function(e) {
                        e.code === jn.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        a(!0))
                    }
                }, p().createElement(Xn, {
                    user: e
                }))
            }
            ))), r && p().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > zn ? r(Qt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - zn
            }) : r(Qt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), p().createElement(tr, {
                friendsDataInGame: t,
                game: n,
                show: i,
                onHide: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    a(!1)
                }
            }))
        };
        er.defaultProps = {
            translate: void 0
        };
        var tr = (0,
        g.withTranslations)((function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , i = e.translate;
            return p().createElement(Yt.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, p().createElement(In, {
                friendsData: r.map((function(e) {
                    return Bn(Bn({}, e), {
                        nameForDisplay: e.displayName
                    })
                }
                )),
                friendsInGame: r.map((function(e) {
                    return e.id
                }
                )),
                game: o,
                dismissModal: n,
                translate: i
            }))
        }
        ), Cn)
          , nr = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , rr = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , or = (0,
        f.forwardRef)((function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.page
              , a = void 0 === i ? z.HomePage : i
              , l = e.className
              , s = void 0 === l ? "grid-item-container game-card-container" : l
              , u = e.friendData
              , c = void 0 === u ? [] : u
              , d = e.isOnScreen
              , m = void 0 === d || d
              , v = e.hideTileMetadata
              , h = void 0 !== v && v
              , g = e.isSponsoredFooterAllowed
              , y = void 0 !== g && g
              , b = e.topicId
              , I = e.translate
              , C = (0,
            f.useState)()
              , S = C[0]
              , w = C[1]
              , x = xt()
              , E = x[0]
              , P = x[1]
              , T = x[2]
              , k = (0,
            f.useMemo)((function() {
                return ye(c, o.universeId)
            }
            ), [c, o.universeId])
              , N = ve(o, b);
            (0,
            f.useEffect)((function() {
                void 0 === S && k.length > 0 && nr(void 0, void 0, void 0, (function() {
                    var e, t;
                    return rr(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            [4, Dt(o.placeId.toString())];
                        case 1:
                            return e = n.sent(),
                            w(e),
                            [3, 3];
                        case 2:
                            return t = n.sent(),
                            console.error(t),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ), [k, S]);
            return p().createElement("div", {
                ref: t,
                className: s,
                "data-testid": "game-tile",
                onMouseOver: P,
                onMouseLeave: T,
                onFocus: P,
                onBlur: T
            }, p().createElement(Hn, {
                id: n,
                isOnScreen: m,
                buildEventProperties: r,
                gameData: o,
                page: a,
                isFocused: E,
                topicId: b
            }, function() {
                if (h)
                    return p().createElement(p().Fragment, null);
                if ((null == o ? void 0 : o.isShowSponsoredLabel) || (null == o ? void 0 : o.isSponsored) && y)
                    return p().createElement($n, {
                        translate: I
                    });
                var e = Xt(N);
                return e ? p().createElement(Jn, {
                    footerData: e
                }) : k.length > 0 && S ? p().createElement(er, {
                    friendData: k,
                    gameData: S
                }) : (null == o ? void 0 : o.friendActivityTitle) ? p().createElement(Kn, {
                    footerText: o.friendActivityTitle
                }) : p().createElement(Wn, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        }
        ));
        or.displayName = "GameTile";
        var ir = or
          , ar = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = (0,
            f.useState)(void 0)
              , a = i[0]
              , l = i[1]
              , s = (0,
            f.useState)(void 0)
              , u = s[0]
              , c = s[1];
            if ((0,
            f.useEffect)((function() {
                Dt(t).then((function(e) {
                    return l(e)
                }
                )).catch((function() {
                    c(!0)
                }
                ))
            }
            ), [t]),
            void 0 === a && !u)
                return p().createElement(sr, null);
            var d = Ct()(r, "btn-full-width");
            return p().createElement(p().Fragment, null, p().createElement(Yt.Link, {
                "data-testid": "hover-tile-purchase-button",
                className: d,
                url: n || (null == a ? void 0 : a.url)
            }, p().createElement("span", {
                className: o
            }), p().createElement("span", {
                className: "btn-text"
            }, (null == a ? void 0 : a.price) || "--"), " "))
        };
        ar.defaultProps = {
            clientReferralUrl: ""
        };
        var lr = ar
          , sr = function() {
            return p().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        }
          , ur = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.buttonClassName
              , i = e.purchaseIconClassName
              , a = e.clientReferralUrl
              , l = e.shouldPurchaseNavigateToDetails
              , s = b.PlayButton.usePlayabilityStatus
              , u = b.PlayButton.PlayabilityStatuses
              , c = b.PlayButton.PlayButton
              , d = b.PlayButton.PurchaseButton
              , f = s(t)
              , m = f[0]
              , v = f[1];
            switch (m) {
            case void 0:
            case u.GuestProhibited:
            case u.Playable:
                return p().createElement(c, {
                    universeId: t,
                    placeId: n,
                    status: null != m ? m : u.Playable,
                    eventProperties: r,
                    buttonClassName: o ? Ct()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case u.PurchaseRequired:
                return l ? p().createElement(lr, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: Ct()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
                }) : p().createElement(d, {
                    universeId: t,
                    placeId: n,
                    iconClassName: null != i ? i : "icon-common-play",
                    refetchPlayabilityStatus: v,
                    buttonClassName: o
                });
            case u.UniverseRootPlaceIsPrivate:
                return p().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, p().createElement("span", {
                    className: "icon-status-private"
                }));
            default:
                return p().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, p().createElement("span", {
                    className: "icon-status-unavailable"
                }))
            }
        };
        ur.defaultProps = {
            playButtonEventProperties: {},
            buttonClassName: void 0,
            purchaseIconClassName: void 0,
            clientReferralUrl: void 0,
            shouldPurchaseNavigateToDetails: !1
        };
        var cr = ur
          , dr = function(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            f.useMemo)((function() {
                return Se(t, n)
            }
            ), [t, n])
              , a = (0,
            f.useMemo)((function() {
                return r === i.EventTile ? Zt.ThumbnailGameThumbnailSize.width576 : Zt.ThumbnailGameThumbnailSize.width384
            }
            ), [r]);
            return null !== o ? p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.assetThumbnail,
                size: a,
                targetId: o,
                containerClass: "brief-game-icon",
                format: Zt.ThumbnailFormat.jpeg,
                altName: t.name
            }) : p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameThumbnail,
                size: a,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: Zt.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
          , fr = function(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , i = e.children;
            return n ? p().createElement(Yt.Link, {
                url: o,
                className: t,
                tabIndex: r ? 0 : -1
            }, i) : p().createElement("span", {
                className: t
            }, i)
        }
          , pr = p().forwardRef((function(e, t) {
            var n = e.gameData
              , r = e.id
              , o = e.buildEventProperties
              , u = e.friendData
              , c = void 0 === u ? [] : u
              , d = e.playerCountStyle
              , m = e.playButtonStyle
              , v = e.navigationRootPlaceId
              , h = e.isSponsoredFooterAllowed
              , g = void 0 !== h && h
              , y = e.hideTileMetadata
              , b = void 0 !== y && y
              , I = e.wideTileType
              , C = e.hoverStyle
              , S = e.topicId
              , w = e.isOnScreen
              , x = void 0 === w || w
              , E = e.isInterestedUniverse
              , P = void 0 === E ? void 0 : E
              , T = e.toggleInterest
              , k = void 0 === T ? void 0 : T
              , N = e.translate
              , A = 0 === r
              , O = r === vt.maxWideGameTilesPerCarouselPage - 1
              , _ = xt()
              , M = _[0]
              , R = _[1]
              , L = _[2]
              , D = (0,
            f.useState)(n.placeId)
              , F = D[0]
              , U = D[1];
            (0,
            f.useEffect)((function() {
                v && !Number.isNaN(v) ? U(parseInt(v, 10)) : n.navigationUid && Lt(n.navigationUid).then((function(e) {
                    (null == e ? void 0 : e.rootPlaceId) && U(e.rootPlaceId)
                }
                )).catch((function() {}
                ))
            }
            ), [v, n.navigationUid]);
            var B = (0,
            f.useMemo)((function() {
                return le(F, n.name, o(n, r))
            }
            ), [n, o, r, F])
              , j = o(n, r)
              , G = (0,
            f.useMemo)((function() {
                return ye(c, n.universeId)
            }
            ), [c, n.universeId])
              , z = (0,
            f.useMemo)((function() {
                return function(e, t) {
                    if (!t)
                        return [];
                    var n = new Map(e.map((function(e) {
                        return [e.id, e]
                    }
                    )));
                    return t.map((function(e) {
                        return n.get(e.userId)
                    }
                    )).filter((function(e) {
                        return void 0 !== e
                    }
                    ))
                }(c, n.friendVisits)
            }
            ), [c, n.friendVisits])
              , H = ve(n, S)
              , W = function() {
                return n.minimumAge && n.ageRecommendationDisplayName && I !== i.EventTile ? p().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, p().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
              , V = function() {
                return (I !== i.GridTile || m === l.Enabled) && ((I !== i.EventTile || m === l.Enabled) && I !== i.InterestTile)
            }
              , J = (0,
            f.useMemo)((function() {
                return (null == H ? void 0 : H.title) ? H.title : n.name
            }
            ), [n.name, null == H ? void 0 : H.title])
              , q = I !== i.InterestTile
              , K = I !== i.InterestTile
              , $ = (0,
            f.useCallback)((function() {
                k && k()
            }
            ), [k]);
            return p().createElement("li", {
                className: Ct()("list-item", "hover-game-tile", {
                    "grid-tile": I === i.GridTile
                }, {
                    "event-tile": I === i.EventTile
                }, {
                    "interest-tile": I === i.InterestTile
                }, {
                    "first-tile": A
                }, {
                    "last-tile": O
                }, {
                    "image-overlay": C === s.imageOverlay
                }, {
                    "old-hover": C !== s.imageOverlay
                }, {
                    focused: M
                }),
                "data-testid": "wide-game-tile",
                onMouseOver: K ? R : void 0,
                onMouseLeave: K ? L : void 0,
                onFocus: K ? R : void 0,
                onBlur: K ? L : void 0,
                id: n.universeId.toString()
            }, n.universeId && p().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, p().createElement(fr, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: q,
                isOnScreen: x,
                linkUrl: B
            }, p().createElement("div", {
                className: "featured-game-icon-container"
            }, p().createElement(dr, {
                gameData: n,
                topicId: S,
                wideTileType: I
            }), p().createElement(Un, {
                gameLayoutData: H,
                playerCountStyle: d,
                playerCount: n.playerCount,
                isFocused: M
            })), p().createElement("div", {
                className: "info-container"
            }, p().createElement("div", {
                className: "info-metadata-container"
            }, p().createElement("div", {
                className: "game-card-name game-name-title",
                "data-testid": "game-tile-game-title",
                title: J
            }, J), p().createElement("div", {
                className: "wide-game-tile-metadata"
            }, p().createElement("div", {
                className: "base-metadata"
            }, function() {
                var e = W();
                if (M && C === s.imageOverlay && e)
                    return e;
                if (b)
                    return p().createElement(p().Fragment, null);
                if (n.isShowSponsoredLabel || n.isSponsored && g)
                    return p().createElement(Yn, {
                        translate: N
                    });
                var t = Xt(H);
                return t ? p().createElement(Jn, {
                    footerData: t
                }) : (null == G ? void 0 : G.length) > 0 ? p().createElement(Qn, {
                    friendsData: G,
                    isOnline: !0
                }) : (null == z ? void 0 : z.length) > 0 ? p().createElement(Qn, {
                    friendsData: z,
                    isOnline: !1
                }) : n.friendVisitedString ? p().createElement(qn, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : d === a.Footer ? p().createElement(Wn, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : p().createElement(Vn, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: N
                })
            }()), p().createElement("div", {
                className: "hover-metadata"
            }, W()))), M && C === s.imageOverlay && V() && p().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, p().createElement(cr, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: j,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: B,
                shouldPurchaseNavigateToDetails: !0
            })))), M && C !== s.imageOverlay && V() && p().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, p().createElement(cr, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: j,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: B,
                shouldPurchaseNavigateToDetails: !0
            })), I === i.InterestTile && p().createElement(Yt.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: Yt.Button.variants.primary,
                size: Yt.Button.sizes.medium,
                title: N(nn.ActionInterestCatcherInterested),
                onClick: $
            }, P ? p().createElement("span", {
                className: "icon-heart-red"
            }) : p().createElement("span", {
                className: "icon-heart"
            }), p().createElement("span", null, N(nn.ActionInterestCatcherInterested)))))
        }
        ));
        pr.displayName = "WideGameTile";
        var mr = pr
          , vr = function() {
            return vr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            vr.apply(this, arguments)
        }
          , hr = function(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                    t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
            }
            return n
        }
          , gr = (0,
        f.forwardRef)((function(e, t) {
            var n = e.componentType
              , r = hr(e, ["componentType"]);
            switch (n) {
            case i.AppGameTileNoMetadata:
                return p().createElement(ir, vr({
                    ref: t,
                    hideTileMetadata: !0
                }, r));
            case i.GridTile:
            case i.EventTile:
            case i.InterestTile:
                return p().createElement(mr, vr({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return p().createElement(ir, vr({
                    ref: t
                }, r))
            }
        }
        ));
        gr.displayName = "GameTileTypeMap";
        var yr = gr
          , br = (0,
        f.forwardRef)((function(e, t) {
            var n = e.gameData
              , r = e.buildEventProperties
              , o = e.translate
              , a = e.friendData
              , l = e.componentType
              , s = e.playerCountStyle
              , u = e.playButtonStyle
              , c = e.navigationRootPlaceId
              , d = e.isSponsoredFooterAllowed
              , f = e.hideTileMetadata
              , m = e.hoverStyle
              , v = e.topicId
              , h = e.isExpandHomeContentEnabled
              , g = e.tileRef
              , y = Ct()("game-carousel", {
                "wide-game-tile-carousel": l === i.GridTile || l === i.EventTile
            }, {
                "expand-home-content": h
            }, {
                "expand-home-content-disabled": !h
            });
            return p().createElement("div", {
                "data-testid": "game-carousel",
                ref: t,
                className: y
            }, n.map((function(e, t) {
                return p().createElement(yr, {
                    componentType: l,
                    playerCountStyle: s,
                    playButtonStyle: u,
                    navigationRootPlaceId: c,
                    isSponsoredFooterAllowed: d,
                    hideTileMetadata: f,
                    hoverStyle: m,
                    topicId: v,
                    ref: g,
                    key: t,
                    id: t,
                    gameData: e,
                    translate: o,
                    buildEventProperties: r,
                    friendData: a
                })
            }
            )))
        }
        ));
        br.displayName = "GameCarousel";
        var Ir = function(e, t, n) {
            var r = (0,
            f.useState)(new Set)
              , o = r[0]
              , i = r[1]
              , a = (0,
            f.useState)(new Set)
              , l = a[0]
              , s = a[1]
              , u = (0,
            f.useRef)(null)
              , c = (0,
            f.useRef)(n);
            (0,
            f.useEffect)((function() {
                c.current = n
            }
            ), [n]);
            var d = (0,
            f.useCallback)((function() {
                var e = Le(Array.from(l).filter((function(e) {
                    return !o.has(e)
                }
                )), dt.maxTilesInGameImpressionsEvent).filter((function(e) {
                    return e.length > 0
                }
                ));
                e.forEach((function(e) {
                    var t, n = c.current(e);
                    if (void 0 !== n && (null === (t = n.absPositions) || void 0 === t ? void 0 : t.length) > 0) {
                        var r = pe.gameImpressions(n);
                        y.eventStreamService.sendEvent.apply(y.eventStreamService, r),
                        i((function(t) {
                            var n = t;
                            return e.forEach((function(e) {
                                return n.add(e)
                            }
                            )),
                            n
                        }
                        ))
                    }
                }
                ))
            }
            ), [o, l])
              , p = St((function() {
                return d()
            }
            ))
              , m = p[0]
              , v = p[1];
            (0,
            f.useEffect)((function() {
                var t, n, r = Array.from(null !== (n = null === (t = null == e ? void 0 : e.current) || void 0 === t ? void 0 : t.children) && void 0 !== n ? n : []);
                return u.current = y.elementVisibilityService.observeChildrenVisibility({
                    elements: r,
                    threshold: dt.gameImpressionsIntersectionThreshold
                }, (function(e, t) {
                    v();
                    var n = function(e, t) {
                        var n = [];
                        return e.forEach((function(e) {
                            if (null == e ? void 0 : e.isIntersecting) {
                                var o = r.findIndex((function(t) {
                                    return t === e.target
                                }
                                ));
                                o >= 0 && (n.push(o),
                                t.unobserve(e.target))
                            }
                        }
                        )),
                        n.sort((function(e, t) {
                            return e - t
                        }
                        ))
                    }(e, t);
                    s((function(e) {
                        var t = e;
                        return n.forEach((function(e) {
                            return t.add(e)
                        }
                        )),
                        t
                    }
                    )),
                    m()
                }
                )),
                function() {
                    (null == u ? void 0 : u.current) && u.current()
                }
            }
            ), [e, t, l, m, v])
        }
          , Cr = function() {
            return Cr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Cr.apply(this, arguments)
        }
          , Sr = (0,
        f.createContext)("")
          , wr = function(e) {
            var t, n = e.children, r = null === (t = window.location.href) || void 0 === t ? void 0 : t.split("?")[1], o = r && Ae(r), i = o && (o.discoverPageSessionInfo || o.homePageSessionInfo || o.spotlightPageSessionInfo), a = (0,
            f.useState)(i && "string" == typeof i ? i : v.uuidService.generateRandomUuid())[0];
            return p().createElement(Sr.Provider, {
                value: a
            }, n)
        }
          , xr = function() {
            return (0,
            f.useContext)(Sr)
        }
          , Er = ReactRouterDOM
          , Pr = ut.linkStartDelimiter
          , Tr = ut.linkEndDelimiter
          , kr = function(e) {
            var t = e.defaultSubtitle
              , n = e.endTimestamp
              , r = e.countdownString
              , o = e.formatSubtitleLink
              , i = e.subtitleLink
              , a = e.handleSeeAllLinkClick
              , l = e.backgroundImageAssetId
              , s = (0,
            f.useMemo)((function() {
                var e = n && parseInt(n, 10);
                if (e || 0 === e)
                    return e
            }
            ), [n])
              , u = (0,
            f.useState)(void 0 !== s ? s - Math.floor(Date.now() / 1e3) : void 0)
              , c = u[0]
              , d = u[1];
            (0,
            f.useEffect)((function() {
                if (void 0 !== s) {
                    d(s - Math.floor(Date.now() / 1e3));
                    var e = setInterval((function() {
                        d(s - Math.floor(Date.now() / 1e3))
                    }
                    ), 15e3);
                    return function() {
                        clearInterval(e)
                    }
                }
                d(void 0)
            }
            ), [s]);
            var m = (0,
            f.useMemo)((function() {
                if (void 0 !== c && r) {
                    var e = 0
                      , n = 0;
                    if (c > 0 && (n = Math.ceil(c / 60),
                    n -= 60 * (e = Math.floor(n / 60))),
                    e < 24)
                        return r.replace("{hours}", e.toString()).replace("{minutes}", n.toString())
                }
                return t
            }
            ), [t, c, r])
              , v = (0,
            f.useMemo)((function() {
                if (o && i && m) {
                    var e = m.indexOf(Pr)
                      , t = m.indexOf(Tr);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = m.slice(0, e)
                          , r = m.slice(e + Pr.length, t)
                          , s = m.slice(t + Tr.length);
                        return p().createElement(Yt.Link, {
                            url: i,
                            onClick: a
                        }, n, p().createElement("span", {
                            className: "link-text"
                        }, r), s, l ? p().createElement("span", {
                            className: "icon-chevron-right-dark"
                        }) : p().createElement("span", {
                            className: "icon-chevron-right"
                        }))
                    }
                }
                return m
            }
            ), [m, i, l, a]);
            return m ? p().createElement("div", {
                className: "sort-subtitle-container"
            }, p().createElement("span", {
                className: "font-sort-subtitle text-default"
            }, v)) : null
        }
          , Nr = Roblox.ui;
        function Ar(e, t) {
            var n;
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (n = function(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return Or(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(e);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Or(e, t)
                }(e)) || t && e && "number" == typeof e.length) {
                    n && (e = n);
                    var r = 0
                      , o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return r >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[r++]
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: o
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, a = !0, l = !1;
            return {
                s: function() {
                    n = e[Symbol.iterator]()
                },
                n: function() {
                    var e = n.next();
                    return a = e.done,
                    e
                },
                e: function(e) {
                    l = !0,
                    i = e
                },
                f: function() {
                    try {
                        a || null == n.return || n.return()
                    } finally {
                        if (l)
                            throw i
                    }
                }
            }
        }
        function Or(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function _r(e, t) {
            if ("function" == typeof e)
                return e(t);
            e && (e.current = t)
        }
        var Mr = parseInt(f.version.split(".")[0], 10) >= 19 ? function(e) {
            return function(t) {
                var n, r = [], o = Ar(e);
                try {
                    var i = function() {
                        var e = n.value
                          , o = _r(e, t)
                          , i = "function" == typeof o;
                        r.push(i ? o : function() {
                            return _r(e, null)
                        }
                        )
                    };
                    for (o.s(); !(n = o.n()).done; )
                        i()
                } catch (e) {
                    o.e(e)
                } finally {
                    o.f()
                }
                return function() {
                    var e, t = Ar(r);
                    try {
                        for (t.s(); !(e = t.n()).done; ) {
                            (0,
                            e.value)()
                        }
                    } catch (e) {
                        t.e(e)
                    } finally {
                        t.f()
                    }
                }
            }
        }
        : function(e) {
            return function(t) {
                var n, r = Ar(e);
                try {
                    for (r.s(); !(n = r.n()).done; ) {
                        _r(n.value, t)
                    }
                } catch (e) {
                    r.e(e)
                } finally {
                    r.f()
                }
            }
        }
        ;
        var Rr = function() {
            if ("undefined" != typeof Map)
                return Map;
            function e(e, t) {
                var n = -1;
                return e.some((function(e, r) {
                    return e[0] === t && (n = r,
                    !0)
                }
                )),
                n
            }
            return function() {
                function t() {
                    this.__entries__ = []
                }
                return Object.defineProperty(t.prototype, "size", {
                    get: function() {
                        return this.__entries__.length
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.get = function(t) {
                    var n = e(this.__entries__, t)
                      , r = this.__entries__[n];
                    return r && r[1]
                }
                ,
                t.prototype.set = function(t, n) {
                    var r = e(this.__entries__, t);
                    ~r ? this.__entries__[r][1] = n : this.__entries__.push([t, n])
                }
                ,
                t.prototype.delete = function(t) {
                    var n = this.__entries__
                      , r = e(n, t);
                    ~r && n.splice(r, 1)
                }
                ,
                t.prototype.has = function(t) {
                    return !!~e(this.__entries__, t)
                }
                ,
                t.prototype.clear = function() {
                    this.__entries__.splice(0)
                }
                ,
                t.prototype.forEach = function(e, t) {
                    void 0 === t && (t = null);
                    for (var n = 0, r = this.__entries__; n < r.length; n++) {
                        var o = r[n];
                        e.call(t, o[1], o[0])
                    }
                }
                ,
                t
            }()
        }()
          , Lr = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , Dr = void 0 !== n.g && n.g.Math === Math ? n.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , Fr = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Dr) : function(e) {
            return setTimeout((function() {
                return e(Date.now())
            }
            ), 1e3 / 60)
        }
        ;
        var Ur = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , Br = "undefined" != typeof MutationObserver
          , jr = function() {
            function e() {
                this.connected_ = !1,
                this.mutationEventsAdded_ = !1,
                this.mutationsObserver_ = null,
                this.observers_ = [],
                this.onTransitionEnd_ = this.onTransitionEnd_.bind(this),
                this.refresh = function(e, t) {
                    var n = !1
                      , r = !1
                      , o = 0;
                    function i() {
                        n && (n = !1,
                        e()),
                        r && l()
                    }
                    function a() {
                        Fr(i)
                    }
                    function l() {
                        var e = Date.now();
                        if (n) {
                            if (e - o < 2)
                                return;
                            r = !0
                        } else
                            n = !0,
                            r = !1,
                            setTimeout(a, t);
                        o = e
                    }
                    return l
                }(this.refresh.bind(this), 20)
            }
            return e.prototype.addObserver = function(e) {
                ~this.observers_.indexOf(e) || this.observers_.push(e),
                this.connected_ || this.connect_()
            }
            ,
            e.prototype.removeObserver = function(e) {
                var t = this.observers_
                  , n = t.indexOf(e);
                ~n && t.splice(n, 1),
                !t.length && this.connected_ && this.disconnect_()
            }
            ,
            e.prototype.refresh = function() {
                this.updateObservers_() && this.refresh()
            }
            ,
            e.prototype.updateObservers_ = function() {
                var e = this.observers_.filter((function(e) {
                    return e.gatherActive(),
                    e.hasActive()
                }
                ));
                return e.forEach((function(e) {
                    return e.broadcastActive()
                }
                )),
                e.length > 0
            }
            ,
            e.prototype.connect_ = function() {
                Lr && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
                window.addEventListener("resize", this.refresh),
                Br ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
            e.prototype.disconnect_ = function() {
                Lr && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
                window.removeEventListener("resize", this.refresh),
                this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
                this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
                this.mutationsObserver_ = null,
                this.mutationEventsAdded_ = !1,
                this.connected_ = !1)
            }
            ,
            e.prototype.onTransitionEnd_ = function(e) {
                var t = e.propertyName
                  , n = void 0 === t ? "" : t;
                Ur.some((function(e) {
                    return !!~n.indexOf(e)
                }
                )) && this.refresh()
            }
            ,
            e.getInstance = function() {
                return this.instance_ || (this.instance_ = new e),
                this.instance_
            }
            ,
            e.instance_ = null,
            e
        }()
          , Gr = function(e, t) {
            for (var n = 0, r = Object.keys(t); n < r.length; n++) {
                var o = r[n];
                Object.defineProperty(e, o, {
                    value: t[o],
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                })
            }
            return e
        }
          , zr = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Dr
        }
          , Hr = $r(0, 0, 0, 0);
        function Wr(e) {
            return parseFloat(e) || 0
        }
        function Vr(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            return t.reduce((function(t, n) {
                return t + Wr(e["border-" + n + "-width"])
            }
            ), 0)
        }
        function Jr(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Hr;
            var r = zr(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Wr(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Wr(r.width)
              , s = Wr(r.height);
            if ("border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Vr(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Vr(r, "top", "bottom") + a)),
            !function(e) {
                return e === zr(e).document.documentElement
            }(e)) {
                var u = Math.round(l + i) - t
                  , c = Math.round(s + a) - n;
                1 !== Math.abs(u) && (l -= u),
                1 !== Math.abs(c) && (s -= c)
            }
            return $r(o.left, o.top, l, s)
        }
        var qr = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof zr(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof zr(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function Kr(e) {
            return Lr ? qr(e) ? function(e) {
                var t = e.getBBox();
                return $r(0, 0, t.width, t.height)
            }(e) : Jr(e) : Hr
        }
        function $r(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var Xr = function() {
            function e(e) {
                this.broadcastWidth = 0,
                this.broadcastHeight = 0,
                this.contentRect_ = $r(0, 0, 0, 0),
                this.target = e
            }
            return e.prototype.isActive = function() {
                var e = Kr(this.target);
                return this.contentRect_ = e,
                e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
            }
            ,
            e.prototype.broadcastRect = function() {
                var e = this.contentRect_;
                return this.broadcastWidth = e.width,
                this.broadcastHeight = e.height,
                e
            }
            ,
            e
        }()
          , Yr = function(e, t) {
            var n = function(e) {
                var t = e.x
                  , n = e.y
                  , r = e.width
                  , o = e.height
                  , i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object
                  , a = Object.create(i.prototype);
                return Gr(a, {
                    x: t,
                    y: n,
                    width: r,
                    height: o,
                    top: n,
                    right: t + r,
                    bottom: o + n,
                    left: t
                }),
                a
            }(t);
            Gr(this, {
                target: e,
                contentRect: n
            })
        }
          , Zr = function() {
            function e(e, t, n) {
                if (this.activeObservations_ = [],
                this.observations_ = new Rr,
                "function" != typeof e)
                    throw new TypeError("The callback provided as parameter 1 is not a function.");
                this.callback_ = e,
                this.controller_ = t,
                this.callbackCtx_ = n
            }
            return e.prototype.observe = function(e) {
                if (!arguments.length)
                    throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(e instanceof zr(e).Element))
                        throw new TypeError('parameter 1 is not of type "Element".');
                    var t = this.observations_;
                    t.has(e) || (t.set(e, new Xr(e)),
                    this.controller_.addObserver(this),
                    this.controller_.refresh())
                }
            }
            ,
            e.prototype.unobserve = function(e) {
                if (!arguments.length)
                    throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(e instanceof zr(e).Element))
                        throw new TypeError('parameter 1 is not of type "Element".');
                    var t = this.observations_;
                    t.has(e) && (t.delete(e),
                    t.size || this.controller_.removeObserver(this))
                }
            }
            ,
            e.prototype.disconnect = function() {
                this.clearActive(),
                this.observations_.clear(),
                this.controller_.removeObserver(this)
            }
            ,
            e.prototype.gatherActive = function() {
                var e = this;
                this.clearActive(),
                this.observations_.forEach((function(t) {
                    t.isActive() && e.activeObservations_.push(t)
                }
                ))
            }
            ,
            e.prototype.broadcastActive = function() {
                if (this.hasActive()) {
                    var e = this.callbackCtx_
                      , t = this.activeObservations_.map((function(e) {
                        return new Yr(e.target,e.broadcastRect())
                    }
                    ));
                    this.callback_.call(e, t, e),
                    this.clearActive()
                }
            }
            ,
            e.prototype.clearActive = function() {
                this.activeObservations_.splice(0)
            }
            ,
            e.prototype.hasActive = function() {
                return this.activeObservations_.length > 0
            }
            ,
            e
        }()
          , Qr = "undefined" != typeof WeakMap ? new WeakMap : new Rr
          , eo = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = jr.getInstance()
              , r = new Zr(t,n,this);
            Qr.set(this, r)
        };
        ["observe", "unobserve", "disconnect"].forEach((function(e) {
            eo.prototype[e] = function() {
                var t;
                return (t = Qr.get(this))[e].apply(t, arguments)
            }
        }
        ));
        var to, no = void 0 !== Dr.ResizeObserver ? Dr.ResizeObserver : eo, ro = n(4777), oo = n(8550), io = n(7895);
        function ao(e, t) {
            return function(e) {
                if (Array.isArray(e))
                    return e
            }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                    return;
                var n = []
                  , r = !0
                  , o = !1
                  , i = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value),
                    !t || n.length !== t); r = !0)
                        ;
                } catch (e) {
                    o = !0,
                    i = e
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                return n
            }(e, t) || so(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function lo(e) {
            return function(e) {
                if (Array.isArray(e))
                    return uo(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                    return Array.from(e)
            }(e) || so(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function so(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return uo(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? uo(e, t) : void 0
            }
        }
        function uo(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function co(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function fo(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? co(Object(n), !0).forEach((function(t) {
                    po(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : co(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function po(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var mo, vo = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.color
              , r = t.width
              , o = t.iconOverrideStyles;
            return {
                iconBaseStyles: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: n,
                    width: "".concat(r, "px"),
                    height: "".concat(r, "px")
                },
                iconOverride: fo({}, o)
            }
        }
        )), ho = function(e) {
            var t = e.iconClassName
              , n = e.color
              , r = e.width
              , o = e.iconOverrideStyles
              , i = vo({
                color: n,
                width: r,
                iconOverrideStyles: o || {}
            }).classes
              , a = i.iconBaseStyles
              , l = i.iconOverride;
            return f.createElement("span", {
                className: It(a, l, t),
                "data-testid": "icon-component"
            })
        }, go = "Enter", yo = "{lineBreak}", bo = "{linkStart}", Io = "{linkEnd}", Co = "0.3s", So = "cubic-bezier(0.45, 0, 0, 1)", wo = {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "start"
        }, xo = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordWrap: "break-word"
        }, Eo = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "break-word"
        }, Po = (0,
        Nr.makeStyles)()((function() {
            return {
                linkContainerOverride: {
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "none"
                    },
                    cursor: "pointer"
                },
                buttonContainerOverride: fo({}, wo)
            }
        }
        )), To = function(e) {
            var t = e.containerClassName
              , n = e.callback
              , r = e.linkPath
              , o = e.ariaLabel
              , i = e.openInNewTab
              , a = e.tabIndex
              , l = e.onFocus
              , s = e.onFocusLost
              , u = e.dataTestId
              , c = e.children
              , d = Po({}).classes
              , p = d.linkContainerOverride
              , m = d.buttonContainerOverride;
            return r ? f.createElement("a", {
                href: r,
                target: i ? "_blank" : void 0,
                onClick: function(e) {
                    e.stopPropagation(),
                    n && n()
                },
                onKeyDown: function(e) {
                    e.code === go && (e.stopPropagation(),
                    n && n())
                },
                className: It(t, p),
                "aria-label": o,
                tabIndex: a,
                onFocus: l,
                onMouseOver: l,
                onBlur: s,
                onMouseLeave: s,
                "data-testid": u,
                rel: "noreferrer"
            }, c) : n ? f.createElement("button", {
                type: "button",
                onClick: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    n()
                },
                onKeyDown: function(e) {
                    e.code === go && (e.stopPropagation(),
                    e.preventDefault(),
                    n())
                },
                className: It(t, m),
                "aria-label": o,
                tabIndex: a,
                onFocus: l,
                onMouseOver: l,
                onBlur: s,
                onMouseLeave: s,
                "data-testid": u
            }, c) : f.createElement("div", {
                className: t,
                "aria-label": o,
                tabIndex: a,
                onFocus: l,
                onMouseOver: l,
                onBlur: s,
                onMouseLeave: s,
                "data-testid": u
            }, c)
        };
        function ko(e) {
            var t = {};
            if (void 0 === e)
                return t;
            if (void 0 !== e.layoutOrder && (t.order = e.layoutOrder),
            void 0 !== e.anchorPoint && (t.transformOrigin = "".concat(100 * e.anchorPoint.x, "% ").concat(100 * e.anchorPoint.y, "%")),
            void 0 !== e.automaticSize && (e.automaticSize === mo.XY ? (t.width = "auto",
            t.height = "auto") : e.automaticSize === mo.X ? t.width = "auto" : e.automaticSize === mo.Y && (t.height = "auto")),
            void 0 !== e.size && (t.width = "calc(".concat(100 * e.size.xScale, "% + ").concat(e.size.xOffset, "px)"),
            t.height = "calc(".concat(100 * e.size.yScale, "% + ").concat(e.size.yOffset, "px)")),
            void 0 !== e.position) {
                var n, r, o, i;
                t.position = "absolute",
                t.left = "calc(".concat(100 * e.position.xScale, "% + ").concat(e.position.xOffset, "px)"),
                t.top = "calc(".concat(100 * e.position.yScale, "% + ").concat(e.position.yOffset, "px)");
                var a = null !== (n = null === (r = e.anchorPoint) || void 0 === r ? void 0 : r.x) && void 0 !== n ? n : 0
                  , l = null !== (o = null === (i = e.anchorPoint) || void 0 === i ? void 0 : i.y) && void 0 !== o ? o : 0;
                0 === a && 0 === l || (t.transform = "translate(-".concat(100 * a, "%, -").concat(100 * l, "%)"))
            }
            return void 0 !== e.zIndex && (t.zIndex = e.zIndex),
            t
        }
        !function(e) {
            e.None = "None",
            e.X = "X",
            e.Y = "Y",
            e.XY = "XY"
        }(mo || (mo = {}));
        var No = bo
          , Ao = Io
          , Oo = yo;
        var _o, Mo = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            return (0,
            f.useMemo)((function() {
                if (!e)
                    return {
                        parsedTextContent: "",
                        cleansedTextLabel: ""
                    };
                var n = []
                  , r = []
                  , o = !1;
                return e.split(Oo).forEach((function(e, i) {
                    if (i > 0 && n.push(f.createElement("br", null)),
                    o)
                        n.push(e),
                        r.push(e);
                    else {
                        var a = function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0
                              , n = e.indexOf(No)
                              , r = e.indexOf(Ao, n + No.length);
                            if (!(-1 !== n && -1 !== r && n < r))
                                return {
                                    linkContentParts: [e],
                                    linkLabelPart: e,
                                    isProcessed: !1
                                };
                            var o = e.slice(0, n)
                              , i = e.slice(n + No.length, r)
                              , a = e.slice(r + Ao.length)
                              , l = [];
                            o && l.push(o);
                            var s = f.createElement("b", null, f.createElement("u", null, i));
                            return t ? l.push(f.createElement(To, {
                                callback: void 0,
                                linkPath: t,
                                ariaLabel: i,
                                openInNewTab: !0,
                                dataTestId: "link-action-wrapper"
                            }, s)) : l.push(s),
                            a && l.push(a),
                            {
                                linkContentParts: l,
                                linkLabelPart: "".concat(o).concat(i).concat(a),
                                isProcessed: !0
                            }
                        }(e, t)
                          , l = a.linkContentParts
                          , s = a.linkLabelPart
                          , u = a.isProcessed;
                        n.push.apply(n, lo(l)),
                        r.push(s),
                        o = u
                    }
                }
                )),
                {
                    parsedTextContent: f.createElement(f.Fragment, null, n),
                    cleansedTextLabel: r.join("")
                }
            }
            ), [e, t])
        }, Ro = {
            key: "data-sdui-text",
            value: "true"
        }, Lo = function(e) {
            return po({}, "".concat(e.key), e.value)
        }, Do = function(e, t, n) {
            return po({}, "&[".concat(e.key, "='").concat(e.value, "']"), fo({
                color: t
            }, n && {
                font: n.Font,
                letterSpacing: n.LetterSpacing,
                fontFamily: n.FontFamily,
                fontWeight: n.FontWeight,
                fontSize: n.FontSize,
                lineHeight: n.LineHeight
            }))
        }, Fo = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.gap
              , r = t.textColor
              , o = t.fontStyle
              , i = t.containerOverrideStyles
              , a = t.textOverrideStyles;
            return {
                textIconRow: fo({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "".concat(n, "px"),
                    border: "none",
                    margin: "0px",
                    padding: "0px",
                    backgroundColor: "transparent",
                    appearance: "none",
                    width: "100%"
                }, i),
                textIconRowText: fo(fo({}, xo), Do(Ro, r, o)),
                textOverride: fo({
                    flexShrink: 1,
                    minWidth: 0
                }, a),
                iconBaseStyles: {
                    flexShrink: 0
                }
            }
        }
        )), Uo = function(e) {
            var t = e.onActivated
              , n = e.linkPath
              , r = e.text
              , o = e.textColor
              , i = e.fontStyle
              , a = e.gap
              , l = void 0 === a ? 0 : a
              , s = e.iconClassName
              , u = e.iconWidth
              , c = e.iconColor
              , d = e.iconFirst
              , p = void 0 !== d && d
              , m = e.containerOverrides
              , v = e.textOverrides
              , h = e.iconOverrides
              , g = (0,
            f.useMemo)((function() {
                return m ? ko(m) : {}
            }
            ), [m])
              , y = (0,
            f.useMemo)((function() {
                return v ? ko(v) : {}
            }
            ), [v])
              , b = (0,
            f.useMemo)((function() {
                return h ? ko(h) : {}
            }
            ), [h])
              , I = Fo({
                gap: l,
                textColor: o,
                fontStyle: i,
                containerOverrideStyles: g,
                textOverrideStyles: y
            }).classes
              , C = I.textIconRow
              , S = I.textIconRowText
              , w = I.textOverride
              , x = I.iconBaseStyles
              , E = Mo(r)
              , P = E.parsedTextContent
              , T = E.cleansedTextLabel
              , k = (0,
            f.useMemo)((function() {
                return f.createElement("span", fo({
                    className: It(S, w),
                    "data-testid": "text-icon-row-text"
                }, Lo(Ro)), P)
            }
            ), [P, S, w])
              , N = i.LineHeight * i.FontSize
              , A = null != c ? c : o
              , O = null != u ? u : N
              , _ = (0,
            f.useMemo)((function() {
                return s ? f.createElement(ho, {
                    iconClassName: It(x, s),
                    color: A,
                    width: O,
                    iconOverrideStyles: b
                }) : null
            }
            ), [A, O, x, s, b])
              , M = p ? f.createElement(f.Fragment, null, _, k) : f.createElement(f.Fragment, null, k, _);
            return f.createElement(To, {
                containerClassName: C,
                callback: t,
                linkPath: n,
                ariaLabel: T,
                dataTestId: "text-icon-row"
            }, M)
        }, Bo = (0,
        Nr.makeStyles)({
            name: "AttributionTextContent"
        })((function(e, t) {
            var n = t.subtitleMaxLines
              , r = t.subtitleFontStyle
              , o = t.textColor
              , i = t.textGap;
            return {
                attributionTextContentContainer: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "".concat(i, "px"),
                    maxWidth: "100%"
                },
                attributionSubtitle: fo({
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "140%",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: n,
                    WebkitBoxOrient: "vertical"
                }, Do(Ro, o, r))
            }
        }
        )), jo = function(e) {
            var t = e.title
              , n = e.titleComponent
              , r = e.subtitle
              , o = e.textColor
              , i = e.titleFontStyle
              , a = e.subtitleFontStyle
              , l = e.subtitleMaxLines
              , s = void 0 === l ? 1 : l
              , u = e.textGap
              , c = Bo({
                subtitleMaxLines: s,
                subtitleFontStyle: a,
                textColor: o,
                textGap: void 0 === u ? 0 : u
            }).classes;
            return f.createElement("div", {
                className: c.attributionTextContentContainer,
                "data-testid": "attribution-text-content-container"
            }, n || f.createElement(Uo, {
                text: t,
                fontStyle: i,
                textColor: o
            }), r && f.createElement("span", fo({
                className: c.attributionSubtitle
            }, Lo(Ro)), r))
        }, Go = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.height;
            return {
                attributionRowContainer: {
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: n ? "".concat(n, "px") : "auto"
                },
                attributionRowThumbnailContainer: {
                    height: "100%",
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginRight: "12px"
                },
                attributionRowButtonContainer: {
                    marginLeft: "auto"
                }
            }
        }
        )), zo = function(e) {
            var t = e.title
              , n = e.titleComponent
              , r = e.subtitle
              , o = e.textColor
              , i = e.height
              , a = e.imageComponent
              , l = e.rightButtonContent
              , s = e.titleFontStyle
              , u = e.subtitleFontStyle
              , c = e.subtitleMaxLines
              , d = e.titleSubtitleGap
              , p = Go({
                height: i
            }).classes
              , m = p.attributionRowContainer
              , v = p.attributionRowThumbnailContainer
              , h = p.attributionRowButtonContainer;
            return f.createElement("div", {
                className: m
            }, a && f.createElement("div", {
                className: v
            }, a), f.createElement(jo, {
                title: t,
                titleComponent: n,
                subtitle: r,
                textColor: o,
                titleFontStyle: s,
                subtitleFontStyle: u,
                subtitleMaxLines: c,
                textGap: d
            }), l && f.createElement("div", {
                className: h
            }, l))
        }, Ho = function(e) {
            var t = e.scrollArrowClassName
              , n = e.scrollIconClassName
              , r = e.handleClick;
            return f.createElement("div", {
                "data-testid": "carousel-scroll-arrow",
                className: t,
                onClick: r,
                onKeyDown: function(e) {
                    e.code === go && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, f.createElement("span", {
                className: n,
                "data-testid": "carousel-scroll-arrow-icon"
            }))
        }, Wo = function(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , o = e.onScrollForward
              , i = e.scrollBackArrowClassName
              , a = e.scrollForwardArrowClassName;
            return f.createElement(f.Fragment, null, !t && f.createElement(Ho, {
                scrollArrowClassName: i,
                scrollIconClassName: "icon-chevron-heavy-left",
                handleClick: r
            }), !n && f.createElement(Ho, {
                scrollArrowClassName: a,
                scrollIconClassName: "icon-chevron-heavy-right",
                handleClick: o
            }))
        }, Vo = "undefined" != typeof window && window.ResizeObserver ? window.ResizeObserver : no, Jo = function() {
            var e = ao((0,
            f.useState)(void 0), 2)
              , t = e[0]
              , n = e[1]
              , r = (0,
            f.useCallback)((function(e) {
                var t, r = null == e || null === (t = e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                void 0 !== r && n(r)
            }
            ), [])
              , o = (0,
            f.useCallback)((function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }
            ), [r])
              , i = (0,
            f.useRef)(new Vo(o))
              , a = (0,
            f.useCallback)((function(e) {
                e && null != i && i.current && (r(e),
                i.current.disconnect(),
                i.current.observe(e))
            }
            ), [r]);
            return (0,
            f.useEffect)((function() {
                var e = i.current;
                return function() {
                    e && e.disconnect()
                }
            }
            ), []),
            [a, t]
        };
        !function(e) {
            e.XSmall = "XSmall",
            e.Small = "Small",
            e.Medium = "Medium",
            e.Large = "Large",
            e.XLarge = "XLarge"
        }(_o || (_o = {}));
        var qo = (po(to = {}, _o.XSmall, {
            minItemWidth: 80,
            minItemCount: 3,
            maxItemCount: 20,
            fractionalItemAmount: .15
        }),
        po(to, _o.Small, {
            minItemWidth: 150,
            minItemCount: 3,
            maxItemCount: 12,
            fractionalItemAmount: .15
        }),
        po(to, _o.Medium, {
            minItemWidth: 233,
            minItemCount: 2,
            maxItemCount: 6,
            fractionalItemAmount: .15
        }),
        po(to, _o.Large, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 4,
            fractionalItemAmount: .3
        }),
        po(to, _o.XLarge, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 1,
            fractionalItemAmount: .1
        }),
        to)
          , Ko = function(e, t, n) {
            var r, o, i, a = qo[e], l = a.minItemWidth, s = a.minItemCount, u = a.maxItemCount, c = a.fractionalItemAmount, d = (0,
            f.useMemo)((function() {
                return null != n && n.columnGap ? n.columnGap : t ? t < 1024 ? 12 : t < 1280 ? 18 : 24 : 18
            }
            ), [null == n ? void 0 : n.columnGap, t]), p = null !== (r = null == n ? void 0 : n.sideMargin) && void 0 !== r ? r : 0, m = (0,
            f.useMemo)((function() {
                if (t) {
                    var e = t - 2 * p
                      , n = Math.floor((e + d) / (l + d));
                    return Math.min(Math.max(s, n), u)
                }
                return s
            }
            ), [t, s, u, l, d, p]);
            return {
                numColumns: null !== (o = null == n ? void 0 : n.numColumns) && void 0 !== o ? o : m,
                fractionalItemAmount: null !== (i = null == n ? void 0 : n.fractionalItemAmount) && void 0 !== i ? i : c,
                columnGap: d,
                sideMargin: p
            }
        }
          , $o = (0,
        Nr.makeStyles)()((function(e, t) {
            var n, r, o = t.itemWidth, i = t.columnGap, a = t.sideMargin, l = t.gapBetweenHeaderAndItems, s = t.scrollArrowBackgroundColor, u = t.scrollArrowBoxShadowColor, c = t.scrollArrowBaseClassName, d = t.scrollArrowPrevClassName, f = t.scrollArrowNextClassName;
            return {
                collectionCarouselContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(l, "px"),
                    marginLeft: "".concat(null != a ? a : 0, "px"),
                    marginRight: "".concat(null != a ? a : 0, "px")
                },
                carouselContainer: (r = {
                    position: "relative"
                },
                po(r, "& .".concat(c), fo(fo(fo({
                    position: "absolute",
                    top: "calc(50% - (40px / 2))",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 5
                }, s && {
                    backgroundColor: s
                }), u && {
                    boxShadow: "0px 0px 4px 0px ".concat(u)
                }), {}, (n = {},
                po(n, "&.".concat(d), {
                    left: "-10px"
                }),
                po(n, "&.".concat(f), {
                    right: "-10px"
                }),
                po(n, "opacity", .9),
                po(n, "&:hover", {
                    opacity: 1
                }),
                po(n, "@media (pointer: coarse) and (not (any-pointer: fine))", {
                    display: "none"
                }),
                n))),
                po(r, "&:hover", po({}, "& .".concat(c), {
                    display: "flex"
                })),
                r),
                carousel: {
                    display: "flex",
                    overflowX: "hidden",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    gap: "".concat(null != i ? i : 0, "px"),
                    "@media (pointer: coarse) and (not (any-pointer: fine))": {
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }
                },
                carouselItem: {
                    width: o,
                    height: "auto",
                    flexShrink: 0
                }
            }
        }
        ))
          , Xo = function(e) {
            var t = e.itemsContainerRef
              , n = e.items
              , r = e.renderItem
              , o = e.collectionItemSize
              , i = e.updateItemsPerRow
              , a = e.layoutOverrides
              , l = e.headerComponent
              , s = e.gapBetweenHeaderAndItems
              , u = e.isHorizontalScrollEnabled
              , c = e.scrollArrowBackgroundColor
              , d = e.scrollArrowBoxShadowColor
              , p = e.thresholdFromEnd
              , m = e.onReachedThresholdFromEnd
              , v = e.reportHorizontalScrollTelemetry
              , h = ao(Jo(), 2)
              , g = h[0]
              , y = h[1]
              , b = Ko(o, y, null != a ? a : {})
              , I = b.numColumns
              , C = b.fractionalItemAmount
              , S = b.columnGap
              , w = b.sideMargin;
            (0,
            f.useEffect)((function() {
                i && i(I)
            }
            ), [i, I]);
            var x = u && n.length > I
              , E = (0,
            f.useMemo)((function() {
                if (y && I > 0) {
                    var e = x ? I + C : I;
                    return (y - (null != S ? S : 0) * (Math.ceil(e) - 1)) / e
                }
                return 0
            }
            ), [y, x, I, C, S])
              , P = function(e, t, n, r, o, i, a, l, s) {
                var u = (0,
                f.useRef)(0)
                  , c = (0,
                f.useRef)(null)
                  , d = ao((0,
                f.useState)(!1), 2)
                  , p = d[0]
                  , m = d[1]
                  , v = ao((0,
                f.useState)(!1), 2)
                  , h = v[0]
                  , g = v[1]
                  , y = ao((0,
                f.useState)(!1), 2)
                  , b = y[0]
                  , I = y[1]
                  , C = (0,
                f.useRef)(!1)
                  , S = (0,
                f.useCallback)((function(e) {
                    return u.current = e < 0 ? 0 : e > i - r ? i - r : e,
                    u.current
                }
                ), [i, r])
                  , w = (0,
                f.useCallback)((function(t) {
                    if (e && l && c.current && n) {
                        var r = Math.max(null != a ? a : 0, 3 * n);
                        t + n >= c.current.scrollWidth - r ? C.current || (l(),
                        C.current = !0) : C.current = !1
                    }
                }
                ), [l, c, n, a, e])
                  , x = (0,
                f.useCallback)((function(e, a) {
                    if (c.current) {
                        var l = c.current.scrollLeft
                          , u = e * (t + (null != o ? o : 0));
                        c.current.scrollLeft = u,
                        w(u),
                        m(e <= 0),
                        g(e >= i - r),
                        s && a && s(u - l, l, null != n ? n : -1)
                    }
                }
                ), [t, o, w, i, r, n, s]);
                (0,
                f.useEffect)((function() {
                    e && x(u.current, !1)
                }
                ), [x, e]);
                var E = (0,
                f.useCallback)((function() {
                    var e = S(u.current + r);
                    x(e, !0)
                }
                ), [S, x, r])
                  , P = (0,
                f.useCallback)((function() {
                    var e = S(u.current - r);
                    x(e, !0)
                }
                ), [S, x, r])
                  , T = (0,
                f.useCallback)((function(e) {
                    b || (I(!0),
                    e(),
                    setTimeout((function() {
                        I(!1)
                    }
                    ), 500))
                }
                ), [b])
                  , k = (0,
                f.useCallback)((function() {
                    T(P)
                }
                ), [P, T])
                  , N = (0,
                f.useCallback)((function() {
                    T(E)
                }
                ), [E, T])
                  , A = (0,
                f.useCallback)((function(e) {
                    return e >= u.current && e < u.current + r
                }
                ), [u, r]);
                return {
                    carouselScrollRef: c,
                    isScrollBackDisabled: p || b,
                    isScrollForwardDisabled: h || b,
                    handleScrollBackClick: k,
                    handleScrollForwardClick: N,
                    getIsTileVisible: A
                }
            }(x, E, y, I, S, n.length, p, m, v)
              , T = P.carouselScrollRef
              , k = P.isScrollBackDisabled
              , N = P.isScrollForwardDisabled
              , A = P.handleScrollBackClick
              , O = P.handleScrollForwardClick
              , _ = P.getIsTileVisible
              , M = "scroll-arrow"
              , R = "prev"
              , L = "next"
              , D = $o({
                itemWidth: E,
                columnGap: S,
                sideMargin: w,
                gapBetweenHeaderAndItems: s,
                scrollArrowBackgroundColor: c,
                scrollArrowBoxShadowColor: d,
                scrollArrowBaseClassName: M,
                scrollArrowPrevClassName: R,
                scrollArrowNextClassName: L
            }).classes
              , F = D.collectionCarouselContainer
              , U = D.carouselContainer
              , B = D.carousel
              , j = D.carouselItem;
            return f.createElement("div", {
                className: F
            }, l, f.createElement("div", {
                ref: g,
                className: U
            }, f.createElement("div", {
                ref: Mr([T, t]),
                className: B
            }, n.map((function(e, t) {
                return f.createElement("div", {
                    key: t,
                    id: "collection-carousel-item",
                    className: j
                }, r(e, t, _(t)))
            }
            ))), x && f.createElement(Wo, {
                isScrollBackDisabled: k,
                isScrollForwardDisabled: N,
                onScrollBack: A,
                onScrollForward: O,
                scrollBackArrowClassName: It(M, R),
                scrollForwardArrowClassName: It(M, L)
            })))
        }
          , Yo = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.itemWidth
              , r = t.columnGap
              , o = t.sideMargin
              , i = t.gapBetweenHeaderAndItems;
            return {
                collectionGridContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(i, "px"),
                    marginLeft: "".concat(null != o ? o : 0, "px"),
                    marginRight: "".concat(null != o ? o : 0, "px")
                },
                grid: {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "".concat(null != r ? r : 0, "px")
                },
                gridItem: {
                    width: n,
                    height: "auto"
                }
            }
        }
        ))
          , Zo = function(e) {
            var t = e.itemsContainerRef
              , n = e.items
              , r = e.renderItem
              , o = e.collectionItemSize
              , i = e.updateItemsPerRow
              , a = e.layoutOverrides
              , l = e.headerComponent
              , s = e.gapBetweenHeaderAndItems
              , u = ao(Jo(), 2)
              , c = u[0]
              , d = u[1]
              , p = Ko(o, d, null != a ? a : {})
              , m = p.numColumns
              , v = p.columnGap
              , h = p.sideMargin;
            (0,
            f.useEffect)((function() {
                i && i(m)
            }
            ), [i, m]);
            var g = (0,
            f.useMemo)((function() {
                return d && m > 0 ? (d - (null != v ? v : 0) * (Math.ceil(m) - 1)) / m : 0
            }
            ), [d, m, v])
              , y = Yo({
                itemWidth: g,
                columnGap: v,
                sideMargin: h,
                gapBetweenHeaderAndItems: s
            }).classes
              , b = y.collectionGridContainer
              , I = y.grid
              , C = y.gridItem;
            return f.createElement("div", {
                className: b
            }, l, f.createElement("div", {
                ref: Mr([c, t]),
                className: I
            }, n.map((function(e, t) {
                return f.createElement("div", {
                    key: t,
                    id: "collection-grid-item",
                    className: C
                }, r(e, t))
            }
            ))))
        }
          , Qo = function(e) {
            for (var t = {}, n = 1; n <= e; n += 1)
                t["&:nth-child(".concat(n, ")")] = {
                    zIndex: e - n + 1
                };
            return t
        }
          , ei = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.iconWidth
              , r = t.avatarContainerBackgroundColor
              , o = t.avatarImageBackgroundColor
              , i = t.avatarBorderColor
              , a = t.maxZIndex;
            return {
                facepileContainer: {
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center"
                },
                avatarContainer: fo(fo({
                    marginRight: "-".concat((n + 4) / 2, "px")
                }, Qo(a)), {}, {
                    "&:last-child": {
                        marginRight: 0
                    },
                    "& span": {
                        width: n + 4,
                        height: n + 4,
                        padding: "".concat(2, "px"),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: r
                    },
                    "& img": {
                        width: n,
                        height: n,
                        objectFit: "cover",
                        borderRadius: "50%",
                        backgroundColor: o,
                        border: "1px solid ".concat(i)
                    }
                })
            }
        }
        ))
          , ti = function(e) {
            var t = e.avatarThumbnails
              , n = e.iconWidth
              , r = e.avatarContainerBackgroundColor
              , o = e.avatarImageBackgroundColor
              , i = e.avatarBorderColor
              , a = ei({
                iconWidth: n,
                avatarContainerBackgroundColor: r,
                avatarImageBackgroundColor: o,
                avatarBorderColor: i,
                maxZIndex: t.length
            }).classes
              , l = a.facepileContainer
              , s = a.avatarContainer;
            return f.createElement("div", {
                className: l
            }, t.map((function(e) {
                return f.createElement("div", {
                    key: e.key,
                    className: s
                }, e)
            }
            )))
        }
          , ni = (0,
        Nr.makeStyles)({
            name: "Gradient"
        })((function(e, t) {
            var n = t.linearGradient
              , r = t.height
              , o = t.width;
            return {
                gradient: fo({
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }, n && {
                    width: o,
                    height: r,
                    background: n
                })
            }
        }
        ))
          , ri = function(e) {
            var t = e.gradient
              , n = t.startColor
              , r = t.endColor
              , o = t.startTransparency
              , i = t.endTransparency
              , a = t.degree
              , l = t.heightPercent
              , s = void 0 === l ? 1 : l
              , u = t.widthPercent
              , c = void 0 === u ? 1 : u
              , d = t.midpointPercent
              , p = void 0 === d ? .5 : d
              , m = (a + 90) % 360
              , v = 1 - o
              , h = 1 - i
              , g = "".concat(100 * s, "%")
              , y = "".concat(100 * c, "%")
              , b = "".concat(100 * p, "%")
              , I = (0,
            f.useMemo)((function() {
                return "linear-gradient(".concat(m, "deg, ").concat(n).concat(Math.round(255 * v).toString(16).padStart(2, "0"), ", ").concat(b, ", ").concat(r).concat(Math.round(255 * h).toString(16).padStart(2, "0"), ")")
            }
            ), [n, r, v, h, m, b])
              , C = ni({
                linearGradient: I,
                height: g,
                width: y
            }).classes;
            return f.createElement("div", {
                className: C.gradient
            })
        }
          , oi = (0,
        Nr.makeStyles)({
            name: "ImageWithGradient"
        })((function(e, t) {
            var n = t.imageContainerHeight
              , r = t.borderRadius
              , o = t.imageAspectRatio;
            return {
                imageWithGradientWindow: {
                    height: "".concat(n, "px"),
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "".concat(r, "px"),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                },
                imageContainer: {
                    aspectRatio: o,
                    minWidth: "100%",
                    flex: 1
                }
            }
        }
        ))
          , ii = function(e) {
            var t = e.gradient
              , n = e.gradientHeightPercent
              , r = e.gradientWidthPercent
              , o = t.startColor
              , i = t.endColor
              , a = t.startTransparency
              , l = t.endTransparency
              , s = (t.degree + 90) % 360
              , u = 1 - a
              , c = 1 - l
              , d = "".concat(100 * n, "%")
              , p = "".concat(100 * r, "%")
              , m = (0,
            f.useMemo)((function() {
                return "linear-gradient(".concat(s, "deg, ").concat(o).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * c).toString(16).padStart(2, "0"), ")")
            }
            ), [o, i, u, c, s])
              , v = (0,
            Nr.makeStyles)()((function() {
                return {
                    heroUnitGradient: {
                        bottom: "0px",
                        left: "0px",
                        position: "absolute"
                    }
                }
            }
            ))().classes.heroUnitGradient;
            return f.createElement("div", {
                style: {
                    background: m,
                    width: p,
                    height: d
                },
                className: v
            })
        }
          , ai = 336
          , li = "2px 2px 4px rgba(0, 0, 0, 0.15)"
          , si = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.hasTitleImage
              , r = t.forceSmallView
              , o = t.forceMediumView
              , i = t.forceSmallOrMediumView
              , a = t.minCardHeight
              , l = t.titleImageHeightPercentLarge
              , s = t.titleImageHeightPercentCompact
              , u = t.titleImageAspectRatio;
            return {
                heroUnitContentContainer: fo(fo({
                    minHeight: "".concat(a, "px"),
                    height: "".concat(ai, "px"),
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    overflow: "hidden",
                    borderRadius: "8px",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px"
                }, i ? {
                    padding: "16px",
                    aspectRatio: "16 / 9",
                    height: "auto"
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        padding: "16px",
                        aspectRatio: "16 / 9",
                        height: "auto"
                    }
                }),
                heroUnitTitleContainer: {
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                },
                heroUnitTitle: fo(fo(fo(fo({
                    color: "white",
                    position: "relative",
                    textShadow: "".concat(li),
                    fontFamily: "Builder Sans",
                    fontSize: "40px",
                    fontWeight: 700,
                    lineHeight: "48px"
                }, i ? {
                    lineHeight: "28.8px"
                } : {}), r ? {
                    fontSize: "24px"
                } : {}), o ? {
                    fontSize: "28px"
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        lineHeight: "28.8px"
                    },
                    "@media (min-width: 415px) and (max-width: 600px)": {
                        fontSize: "24px"
                    },
                    "@media (max-width: 414px)": {
                        fontSize: "28px"
                    }
                }),
                heroUnitSubtitle: fo(fo({
                    color: "white",
                    textShadow: "".concat(li),
                    marginTop: "2px",
                    position: "relative",
                    fontFamily: "Builder Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px"
                }, !n && i && {
                    display: "none"
                }), !n && {
                    "@media (max-width: 600px)": {
                        display: "none"
                    }
                }),
                heroUnitTitleImageContainer: fo(fo({
                    position: "absolute",
                    height: "calc(var(--hero-unit-content-height) * ".concat(l, ")"),
                    width: "calc(var(--hero-unit-content-height) *".concat(l, " * ").concat(u, ")"),
                    right: "20px",
                    top: "20px"
                }, i && {
                    height: "calc(var(--hero-unit-content-height) * ".concat(s, ")"),
                    width: "calc(var(--hero-unit-content-height) *".concat(s, " * ").concat(u, ")"),
                    right: "16px",
                    top: "16px"
                }), {}, {
                    "@media (max-width: 600px)": {
                        height: "calc(var(--hero-unit-content-height) * ".concat(s, ")"),
                        width: "calc(var(--hero-unit-content-height) *".concat(s, " * ").concat(u, ")"),
                        right: "16px",
                        top: "16px"
                    }
                })
            }
        }
        ))
          , ui = function(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.titleImageComponent
              , o = e.heroUnitRef
              , i = e.gradient
              , a = e.gradientHeightPercent
              , l = e.gradientWidthPercent
              , s = e.bottomRowComponent
              , u = e.overlayPillComponent
              , c = e.forceViewportWidth
              , d = e.titleImageAspectRatio
              , p = void 0 === d ? 3 : d
              , m = e.titleImageHeightPercentage
              , v = e.minCardHeight
              , h = void 0 !== c && c <= 414
              , g = void 0 !== c && c <= 600 && c >= 415
              , y = si({
                hasTitleImage: !!r,
                forceSmallView: h,
                forceMediumView: g,
                forceSmallOrMediumView: h || g,
                minCardHeight: v,
                titleImageHeightPercentLarge: null != m ? m : 1 === p ? .3 : .2,
                titleImageHeightPercentCompact: null != m ? m : 1 === p ? .26 : .16,
                titleImageAspectRatio: p
            }).classes
              , b = y.heroUnitContentContainer
              , I = y.heroUnitTitleContainer
              , C = y.heroUnitTitle
              , S = y.heroUnitSubtitle
              , w = y.heroUnitTitleImageContainer
              , x = (0,
            f.useCallback)((function() {
                null != o && o.current && o.current.style.setProperty("--hero-unit-content-height", "".concat(o.current.getBoundingClientRect().height, "px"))
            }
            ), [o]);
            return (0,
            f.useEffect)((function() {
                var e = null == o ? void 0 : o.current;
                if (e) {
                    x();
                    var t = new ResizeObserver(oo(x, 100));
                    return t.observe(e),
                    function() {
                        t.unobserve(e)
                    }
                }
            }
            ), [o, x]),
            f.createElement("div", {
                className: b,
                ref: o
            }, f.createElement(ii, {
                gradient: i,
                gradientHeightPercent: a,
                gradientWidthPercent: l
            }), u, r && f.createElement("div", {
                className: w
            }, r), f.createElement("div", {
                className: I
            }, f.createElement("span", {
                className: C
            }, t), f.createElement("span", {
                className: S
            }, n)), s)
        }
          , ci = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.minCardHeight
              , r = t.forceSmallOrMediumView
              , o = t.enableBackgroundAnimation;
            return {
                heroUnitBackgroundWindow: fo(fo({
                    height: "".concat(ai, "px"),
                    width: "100%",
                    position: "absolute",
                    top: "24px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "".concat(n, "px")
                }, r ? {
                    aspectRatio: "16 / 9",
                    height: "auto",
                    top: "16px"
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        aspectRatio: "16 / 9",
                        height: "auto",
                        top: "16px"
                    }
                }),
                heroUnitBackgroundContainer: fo(fo(fo({
                    "--parallax-scale": "100",
                    minWidth: "max(100%, 1320px)",
                    height: "436px",
                    display: "flex",
                    flexDirection: "column"
                }, o && {
                    transform: "translateY(calc(var(--parallax-scale) * ((var(--scroll) * 1px) - 0.5px)))",
                    "@media (prefers-reduced-motion)": {
                        transform: "translateY(0px)"
                    }
                }), {}, {
                    "@media (min-width: 1320px)": {
                        height: "auto"
                    }
                }, r ? {
                    minHeight: "calc(100% + 66px)",
                    width: "auto",
                    "--parallax-scale": "66",
                    "& img": {
                        objectFit: "cover"
                    }
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        minHeight: "calc(100% + 66px)",
                        width: "auto",
                        "--parallax-scale": "66",
                        "& img": {
                            objectFit: "cover"
                        }
                    }
                })
            }
        }
        ))
          , di = function(e) {
            var t = e.backgroundImageComponent
              , n = e.forceViewportWidth
              , r = e.minCardHeight
              , o = e.enableBackgroundAnimation
              , i = ci({
                minCardHeight: r,
                forceSmallOrMediumView: void 0 !== n && n <= 600,
                enableBackgroundAnimation: o
            }).classes
              , a = i.heroUnitBackgroundWindow
              , l = i.heroUnitBackgroundContainer;
            return f.createElement("div", {
                className: a
            }, f.createElement("div", {
                className: l
            }, t))
        }
          , fi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.forceViewportWidth
              , r = t.maxForegroundHeightPercentString
              , o = t.forceSmallOrMediumView
              , i = t.minForegroundHeightPercentString
              , a = t.foregroundScaleFactor
              , l = t.foregroundAspectRatio
              , s = t.enableForegroundAnimation;
            return {
                heroUnitContainer: fo({
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    overflow: "hidden",
                    alignItems: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                    margin: "none",
                    "& img": {
                        width: "100%",
                        height: "100%"
                    }
                }, n ? {
                    maxWidth: "".concat(n, "px")
                } : {}),
                heroUnitForegroundContainer: fo(fo(fo({
                    height: r,
                    aspectRatio: "".concat(l),
                    maxHeight: "calc(var(--hero-unit-container-width) / ".concat(l, ")"),
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "0px",
                    "--parallax-scale": "".concat(48)
                }, s && {
                    transform: "translateY(calc(var(--parallax-scale) * ((var(--scroll) * -1px) + 1px)))",
                    "@media (prefers-reduced-motion)": {
                        transform: "translateY(0px)"
                    }
                }), o ? {
                    height: i,
                    "--parallax-scale": "".concat(32)
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        height: i,
                        "--parallax-scale": "".concat(32)
                    },
                    "@media (min-width: 601px) and (max-width: 1140px)": {
                        height: "calc(".concat(i, " + ((").concat(a, " * (100vw - 600px)) / 540))")
                    }
                }),
                heroUnitTopSpacer: fo(fo({
                    height: "".concat(24, "px")
                }, o ? {
                    height: "".concat(16, "px")
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        height: "".concat(16, "px")
                    }
                })
            }
        }
        ))
          , pi = function(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.titleImageComponent
              , o = e.foregroundImageComponent
              , i = e.backgroundImageComponent
              , a = e.gradient
              , l = e.gradientHeightPercent
              , s = void 0 === l ? .5 : l
              , u = e.gradientWidthPercent
              , c = void 0 === u ? 1 : u
              , d = e.backgroundClickAction
              , p = e.backgroundClickLinkPath
              , m = e.bottomRowComponent
              , v = e.overlayPillComponent
              , h = e.minForegroundHeightPercent
              , g = void 0 === h ? .8 : h
              , y = e.maxForegroundHeightPercent
              , b = void 0 === y ? 1 : y
              , I = e.forceViewportWidth
              , C = e.titleImageAspectRatio
              , S = void 0 === C ? 3 : C
              , w = e.titleImageHeightPercentage
              , x = e.minCardHeight
              , E = void 0 === x ? 262 : x
              , P = e.foregroundAspectRatio
              , T = void 0 === P ? 1 : P
              , k = e.enableBackgroundAnimation
              , N = void 0 === k || k
              , A = e.enableForegroundAnimation
              , O = void 0 === A || A
              , _ = f.useRef(!1)
              , M = ao(f.useState(1), 2)
              , R = M[0]
              , L = M[1]
              , D = void 0 !== I && I <= 600
              , F = f.useRef(null)
              , U = f.useRef(null)
              , B = "".concat(Math.round(100 * g), "%")
              , j = "".concat(Math.round(100 * b), "%")
              , G = fi({
                forceViewportWidth: I,
                maxForegroundHeightPercentString: j,
                forceSmallOrMediumView: D,
                minForegroundHeightPercentString: B,
                foregroundScaleFactor: 360 * (b - g),
                foregroundAspectRatio: T,
                enableForegroundAnimation: O
            }).classes
              , z = G.heroUnitContainer
              , H = G.heroUnitForegroundContainer
              , W = G.heroUnitTopSpacer
              , V = (0,
            f.useCallback)((function() {
                var e = ro(.2, 0, .8, 1);
                if (F.current && window.innerHeight) {
                    var t = R;
                    if (!_.current) {
                        var n = F.current.getBoundingClientRect().top + 168;
                        if (n <= 0)
                            return;
                        t = Math.min(n, window.innerHeight) / window.innerHeight,
                        L(t)
                    }
                    var r = F.current.getBoundingClientRect()
                      , o = (t - r.top / window.innerHeight) / t
                      , i = e(Math.max(Math.min(o, 1), 0));
                    U.current && (U.current.style.setProperty("--scroll", i.toString()),
                    U.current.style.setProperty("--hero-unit-container-width", "".concat(r.width, "px")))
                }
            }
            ), [F, _, R]);
            return (0,
            f.useEffect)((function() {
                var e = oo(V, 100)
                  , t = new MutationObserver(e);
                document.body && !_.current && t.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }),
                V();
                var n = function() {
                    V(),
                    _.current = !0,
                    t.disconnect()
                };
                return window.addEventListener("scroll", n),
                window.addEventListener("resize", n),
                function() {
                    window.removeEventListener("scroll", n),
                    window.removeEventListener("resize", n),
                    t.disconnect()
                }
            }
            ), [_, V]),
            f.createElement("div", {
                ref: U
            }, f.createElement(To, {
                containerClassName: z,
                callback: d,
                linkPath: p,
                ariaLabel: t,
                dataTestId: "hero-unit"
            }, f.createElement("div", {
                className: W
            }), f.createElement(di, {
                backgroundImageComponent: i,
                forceViewportWidth: I,
                minCardHeight: E,
                enableBackgroundAnimation: N
            }), f.createElement("div", {
                className: H
            }, o), f.createElement(ui, {
                title: t,
                subtitle: n,
                titleImageComponent: r,
                heroUnitRef: F,
                gradient: a,
                gradientHeightPercent: s,
                gradientWidthPercent: c,
                bottomRowComponent: m,
                overlayPillComponent: v,
                forceViewportWidth: I,
                titleImageAspectRatio: S,
                titleImageHeightPercentage: w,
                minCardHeight: E
            })))
        }
          , mi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.textColor
              , r = t.fontStyle
              , o = t.containerOverrideStyles;
            return {
                labelTextSpan: fo({
                    backgroundColor: "transparent"
                }, Do(Ro, n, r)),
                bottomRowContainer: fo({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    alignSelf: "stretch"
                }, o)
            }
        }
        ))
          , vi = function(e) {
            var t = e.ctaButton
              , n = e.labelText
              , r = e.labelTextColor
              , o = void 0 === r ? "white" : r
              , i = e.labelTextFontStyle
              , a = e.rightLabelContent
              , l = e.containerOverrides
              , s = (0,
            f.useMemo)((function() {
                return l ? ko(l) : {}
            }
            ), [l])
              , u = mi({
                textColor: o,
                fontStyle: i,
                containerOverrideStyles: s
            }).classes
              , c = u.labelTextSpan
              , d = u.bottomRowContainer
              , p = (0,
            f.useMemo)((function() {
                return a ? f.createElement("div", {
                    "data-testid": "hero-unit-bottom-row-right-content-wrapper"
                }, a) : n ? f.createElement("span", fo({
                    className: c,
                    "data-testid": "hero-unit-bottom-row-text"
                }, Lo(Ro)), n) : null
            }
            ), [n, c, a]);
            return f.createElement("div", {
                className: d,
                "data-testid": "hero-unit-bottom-row"
            }, t, p)
        }
          , hi = function(e) {
            var t = e.pillText
              , n = (0,
            Nr.makeStyles)()((function() {
                return {
                    heroUnitPill: {
                        width: "76px",
                        height: "24px",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "auto",
                        zIndex: 10
                    },
                    heroUnitPillText: {
                        fontFamily: "Builder Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "12px"
                    }
                }
            }
            ))().classes
              , r = n.heroUnitPill
              , o = n.heroUnitPillText;
            return f.createElement("div", {
                className: r
            }, f.createElement("span", {
                className: o
            }, t))
        }
          , gi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.verticalGap;
            return {
                sectionHeader: fo({
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }, t.containerOverrideStyles),
                titleSubtitleContainer: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "".concat(n, "px"),
                    minWidth: 0,
                    width: "100%"
                }
            }
        }
        ))
          , yi = function(e) {
            var t = e.onTitleActivated
              , n = e.titleText
              , r = e.titleLinkPath
              , o = e.titleTextColor
              , i = e.titleFontStyle
              , a = e.titleGap
              , l = e.titleIconClassName
              , s = e.titleIconWidth
              , u = e.titleIconColor
              , c = e.titleIconFirst
              , d = void 0 !== c && c
              , p = e.titleComponent
              , m = e.onSubtitleActivated
              , v = e.subtitleLinkPath
              , h = e.subtitleText
              , g = e.subtitleTextColor
              , y = e.subtitleFontStyle
              , b = e.subtitleGap
              , I = e.subtitleIconClassName
              , C = e.subtitleIconWidth
              , S = e.subtitleIconColor
              , w = e.subtitleIconFirst
              , x = void 0 !== w && w
              , E = e.subtitleComponent
              , P = e.verticalGap
              , T = void 0 === P ? 0 : P
              , k = e.iconComponent
              , N = e.containerOverrides
              , A = (0,
            f.useMemo)((function() {
                return N ? ko(N) : {}
            }
            ), [N])
              , O = gi({
                verticalGap: T,
                containerOverrideStyles: A
            }).classes
              , _ = O.sectionHeader
              , M = O.titleSubtitleContainer
              , R = (0,
            f.useMemo)((function() {
                return p || (void 0 !== n && void 0 !== o && void 0 !== i ? f.createElement(Uo, {
                    text: n,
                    textColor: o,
                    fontStyle: i,
                    gap: a,
                    iconClassName: l,
                    iconWidth: s,
                    iconColor: u,
                    iconFirst: d
                }) : null)
            }
            ), [p, i, a, l, u, d, s, n, o])
              , L = (0,
            f.useMemo)((function() {
                return E || (void 0 !== h && void 0 !== g && void 0 !== y ? f.createElement(Uo, {
                    onActivated: m,
                    linkPath: v,
                    text: h,
                    textColor: g,
                    fontStyle: y,
                    gap: b,
                    iconClassName: I,
                    iconWidth: C,
                    iconColor: S,
                    iconFirst: x
                }) : null)
            }
            ), [m, v, E, y, b, I, S, x, C, h, g])
              , D = k
              , F = (0,
            f.useMemo)((function() {
                return f.createElement(To, {
                    containerClassName: M,
                    callback: t,
                    linkPath: r,
                    ariaLabel: n,
                    dataTestId: "section-header-title-subtitle-container"
                }, R, L)
            }
            ), [t, L, R, r, M, n]);
            return f.createElement("div", {
                className: _,
                "data-testid": "section-header"
            }, F, D)
        }
          , bi = {
            topLeftSlot: {
                anchorPoint: {
                    x: 0,
                    y: 0
                },
                position: {
                    xScale: 0,
                    yScale: 0,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            topMiddleSlot: {
                anchorPoint: {
                    x: .5,
                    y: 0
                },
                position: {
                    xScale: .5,
                    yScale: 0,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            topRightSlot: {
                anchorPoint: {
                    x: 1,
                    y: 0
                },
                position: {
                    xScale: 1,
                    yScale: 0,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            centerLeftSlot: {
                anchorPoint: {
                    x: 0,
                    y: .5
                },
                position: {
                    xScale: 0,
                    yScale: .5,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            centerMiddleSlot: {
                anchorPoint: {
                    x: .5,
                    y: .5
                },
                position: {
                    xScale: .5,
                    yScale: .5,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            centerRightSlot: {
                anchorPoint: {
                    x: 1,
                    y: .5
                },
                position: {
                    xScale: 1,
                    yScale: .5,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            bottomLeftSlot: {
                anchorPoint: {
                    x: 0,
                    y: 1
                },
                position: {
                    xScale: 0,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            bottomMiddleSlot: {
                anchorPoint: {
                    x: .5,
                    y: 1
                },
                position: {
                    xScale: .5,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            bottomRightSlot: {
                anchorPoint: {
                    x: 1,
                    y: 1
                },
                position: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                }
            }
        }
          , Ii = Object.keys(bi)
          , Ci = {
            background: "transparent",
            width: "auto",
            height: "auto",
            zIndex: 10,
            pointerEvents: "none",
            position: "absolute"
        }
          , Si = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.padding
              , r = t.containerOverrideStyles
              , o = Object.keys(bi).reduce((function(e, t) {
                var r, o = t;
                return e[o] = fo(fo(fo({}, Ci), {
                    left: "".concat(100 * (r = bi[o]).position.xScale, "%"),
                    top: "".concat(100 * r.position.yScale, "%"),
                    transform: "translate(-".concat(100 * r.anchorPoint.x, "%, -").concat(100 * r.anchorPoint.y, "%)")
                }), {}, {
                    padding: "".concat(n, "px")
                }),
                e
            }
            ), {});
            return fo({
                overlayContainer: fo({
                    position: "relative",
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    overflow: "hidden",
                    display: "block"
                }, r)
            }, o)
        }
        ))
          , wi = function(e) {
            var t = e.topLeftSlot
              , n = e.topMiddleSlot
              , r = e.topRightSlot
              , o = e.centerLeftSlot
              , i = e.centerMiddleSlot
              , a = e.centerRightSlot
              , l = e.bottomLeftSlot
              , s = e.bottomMiddleSlot
              , u = e.bottomRightSlot
              , c = e.padding
              , d = void 0 === c ? 0 : c
              , p = e.containerOverrides
              , m = e.children
              , v = (0,
            f.useMemo)((function() {
                return p ? ko(p) : {}
            }
            ), [p])
              , h = Si({
                padding: d,
                containerOverrideStyles: v
            }).classes
              , g = (0,
            f.useMemo)((function() {
                return {
                    topLeftSlot: t,
                    topMiddleSlot: n,
                    topRightSlot: r,
                    centerLeftSlot: o,
                    centerMiddleSlot: i,
                    centerRightSlot: a,
                    bottomLeftSlot: l,
                    bottomMiddleSlot: s,
                    bottomRightSlot: u
                }
            }
            ), [t, n, r, o, i, a, l, s, u])
              , y = (0,
            f.useMemo)((function() {
                return Ii.map((function(e) {
                    var t = g[e];
                    if (t) {
                        var n = h[e];
                        return f.createElement("div", {
                            key: e,
                            className: n,
                            "data-testid": "slot-wrapper-".concat(e)
                        }, t)
                    }
                    return null
                }
                )).filter((function(e) {
                    return null !== e
                }
                ))
            }
            ), [g, h]);
            return f.createElement("div", {
                className: h.overlayContainer,
                "data-testid": "slot-overlay-container"
            }, m, y)
        }
          , xi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.textFontStyle
              , r = t.textColor;
            return {
                textElement: fo(fo({}, Eo), Do(Ro, r, n))
            }
        }
        ))
          , Ei = function(e) {
            var t = e.text
              , n = e.textFontStyle
              , r = e.textColor
              , o = e.textLink
              , i = xi({
                textFontStyle: n,
                textColor: r
            }).classes.textElement
              , a = Mo(t, o).parsedTextContent;
            return f.createElement("span", fo({
                className: i
            }, Lo(Ro)), a)
        }
          , Pi = function(e, t) {
            try {
                var n = ao(io(e).rgb().array(), 3)
                  , r = n[0]
                  , o = n[1]
                  , i = n[2];
                return "rgba(".concat(r, ", ").concat(o, ", ").concat(i, ", ").concat(1 - t, ")")
            } catch (t) {
                return e
            }
        }
          , Ti = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.textColor
              , r = t.fontStyle
              , o = t.backgroundColor
              , i = t.backgroundTransparency
              , a = t.verticalPadding
              , l = t.horizontalPadding
              , s = t.containerOverrideStyles;
            return {
                pillText: fo(fo({
                    backgroundColor: "transparent",
                    padding: "".concat(a, "px ").concat(l, "px")
                }, Do(Ro, n, r)), xo),
                pillContainer: fo({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    backgroundColor: Pi(o, i)
                }, s)
            }
        }
        ))
          , ki = function(e) {
            var t = e.text
              , n = e.textColor
              , r = e.fontStyle
              , o = e.backgroundColor
              , i = e.backgroundTransparency
              , a = e.verticalPadding
              , l = e.horizontalPadding
              , s = e.containerOverrides
              , u = (0,
            f.useMemo)((function() {
                return s ? ko(s) : {}
            }
            ), [s])
              , c = Ti({
                textColor: n,
                fontStyle: r,
                backgroundColor: o,
                backgroundTransparency: i,
                verticalPadding: a,
                horizontalPadding: l,
                containerOverrideStyles: u
            }).classes
              , d = c.pillText
              , p = c.pillContainer;
            return f.createElement("div", {
                className: p,
                "data-testid": "pill-container"
            }, f.createElement("span", fo({
                className: d,
                "data-testid": "pill-text"
            }, Lo(Ro)), t))
        }
          , Ni = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.titleHeight
              , r = t.titleLines
              , o = t.titleColor
              , i = t.titleFontStyles
              , a = t.isContained
              , l = t.containmentPadding;
            return {
                tileBottomContentContainer: fo({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px"
                }, a && {
                    padding: "0px ".concat(l, "px ").concat(l, "px ").concat(l, "px")
                }),
                tileBottomLeftContentContainer: {
                    width: "fit-content",
                    maxWidth: "100%",
                    overflow: "hidden",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                },
                tileBottomRightContentContainer: {
                    width: "fit-content",
                    maxWidth: "100%",
                    flexShrink: 0,
                    display: "flex"
                },
                tileTitleContainer: {
                    height: n
                },
                tileTitleText: fo(fo({
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }, 1 === r && fo({}, xo)), Do(Ro, o, i))
            }
        }
        ))
          , Ai = function(e) {
            var t = e.titleText
              , n = e.titleLines
              , r = e.titleFontStyles
              , o = e.titleColor
              , i = e.titleComponent
              , a = e.footerComponent
              , l = e.ctaButtonComponent
              , s = e.isContained
              , u = e.containmentPadding
              , c = n * (r.LineHeight * r.FontSize)
              , d = Ni({
                titleHeight: c,
                titleLines: n,
                titleColor: o,
                titleFontStyles: r,
                isContained: s,
                containmentPadding: u
            }).classes
              , p = d.tileBottomContentContainer
              , m = d.tileBottomLeftContentContainer
              , v = d.tileBottomRightContentContainer
              , h = d.tileTitleContainer
              , g = d.tileTitleText
              , y = (0,
            f.useMemo)((function() {
                return i || (t ? f.createElement("div", {
                    className: h,
                    "data-testid": "tile-title-container"
                }, f.createElement("div", fo({
                    className: g
                }, Lo(Ro)), t)) : null)
            }
            ), [i, t, h, g]);
            return f.createElement("div", {
                className: p
            }, f.createElement("div", {
                className: m
            }, y, a && a), l && f.createElement("div", {
                className: v
            }, l))
        };
        var Oi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.imageAspectRatio
              , r = t.isContained
              , o = t.containmentBackgroundColor
              , i = t.isFocused
              , a = t.cornerRadius
              , l = t.placeholderImageBackgroundColor;
            return {
                tileContainer: fo({
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }, r && fo({
                    borderBottomLeftRadius: "".concat(a, "px"),
                    borderBottomRightRadius: "".concat(a, "px")
                }, o && {
                    backgroundColor: o
                })),
                tileImageContainer: {
                    width: "100%",
                    height: "auto",
                    aspectRatio: "".concat(n),
                    position: "relative",
                    "&::before": fo(fo({
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "".concat(a, "px")
                    }, r && {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px"
                    }), {}, {
                        backgroundColor: "transparent",
                        transition: "background-color ".concat(Co, " ").concat(So)
                    }, i && {
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }),
                    "& img": fo({
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        aspectRatio: "".concat(n),
                        borderRadius: "".concat(a, "px")
                    }, r && {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px"
                    })
                },
                placeholderImage: fo({
                    width: "100%",
                    height: "100%",
                    aspectRatio: "".concat(n),
                    backgroundColor: l,
                    borderRadius: "".concat(a, "px")
                }, r && {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px"
                })
            }
        }
        ))
          , _i = function(e) {
            var t = e.isFocused
              , n = e.imageComponent
              , r = e.imageAspectRatio
              , o = e.thumbnailOverlayComponent
              , i = e.onActivated
              , a = e.linkPath
              , l = e.isContained
              , s = e.containmentPadding
              , u = e.containmentBackgroundColor
              , c = e.cornerRadius
              , d = e.titleText
              , p = e.titleColor
              , m = e.titleFont
              , v = e.titleLines
              , h = e.titleComponent
              , g = e.footerComponent
              , y = e.ctaButtonComponent
              , b = e.isOnScreen
              , I = e.placeholderImageBackgroundColor
              , C = function() {
                var e = ao((0,
                f.useState)(!1), 2)
                  , t = e[0]
                  , n = e[1]
                  , r = S((function() {
                    n(!0)
                }
                ), 100);
                return [t, function() {
                    r()
                }
                , function() {
                    r.cancel(),
                    n(!1)
                }
                ]
            }()
              , w = ao(C, 3)
              , x = w[0]
              , E = w[1]
              , P = w[2]
              , T = Oi({
                imageAspectRatio: r,
                isContained: l,
                containmentBackgroundColor: u,
                isFocused: x || t,
                cornerRadius: c,
                placeholderImageBackgroundColor: I
            }).classes
              , k = T.tileContainer
              , N = T.tileImageContainer
              , A = T.placeholderImage
              , O = (0,
            f.useMemo)((function() {
                return n || f.createElement("div", {
                    "data-testid": "placeholder-image",
                    className: A
                })
            }
            ), [n, A]);
            return f.createElement(To, {
                containerClassName: k,
                callback: i,
                linkPath: a,
                tabIndex: b ? 0 : -1,
                onFocus: E,
                onFocusLost: P,
                ariaLabel: d
            }, f.createElement("div", {
                className: N
            }, O, o), f.createElement(Ai, {
                titleText: d,
                titleLines: v,
                titleColor: p,
                titleFontStyles: m,
                titleComponent: h,
                footerComponent: g,
                ctaButtonComponent: y,
                isContained: l,
                containmentPadding: null != s ? s : 0
            }))
        }
          , Mi = (0,
        Nr.makeStyles)()((function(e, t) {
            var n = t.textHeight
              , r = t.textColor
              , o = t.textIconGap
              , i = t.sectionGap
              , a = t.fontStyle;
            return {
                tileFooterContainer: fo({
                    display: "flex",
                    alignItems: "center",
                    gap: "".concat(i, "px"),
                    width: "100%",
                    height: n,
                    whiteSpace: "nowrap"
                }, wo),
                leftContainer: {
                    flexShrink: 0,
                    minWidth: 0,
                    width: "fit-content",
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "".concat(o, "px")
                },
                rightContainer: {
                    flexShrink: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "".concat(o, "px")
                },
                textClassName: fo(fo({
                    width: "100%",
                    height: "100%"
                }, xo), Do(Ro, r, a)),
                iconContainer: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center"
                }
            }
        }
        ))
          , Ri = function(e) {
            var t = e.onActivated
              , n = e.linkPath
              , r = e.textColor
              , o = e.fontStyle
              , i = e.textIconGap
              , a = e.sectionGap
              , l = e.iconWidth
              , s = e.iconColor
              , u = e.leftIcon
              , c = e.leftIconComponent
              , d = e.leftText
              , p = e.rightIcon
              , m = e.rightIconComponent
              , v = e.rightText
              , h = o.LineHeight * o.FontSize
              , g = null != s ? s : r
              , y = null != l ? l : h
              , b = Mi({
                textHeight: h,
                textColor: r,
                textIconGap: null != i ? i : 0,
                sectionGap: null != a ? a : 0,
                fontStyle: o
            }).classes
              , I = b.tileFooterContainer
              , C = b.leftContainer
              , S = b.rightContainer
              , w = b.textClassName
              , x = b.iconContainer
              , E = (0,
            f.useMemo)((function() {
                return c || (u ? f.createElement(ho, {
                    iconClassName: u,
                    color: g,
                    width: y
                }) : null)
            }
            ), [u, c, g, y])
              , P = (0,
            f.useMemo)((function() {
                return m || (p ? f.createElement(ho, {
                    iconClassName: p,
                    color: g,
                    width: y
                }) : null)
            }
            ), [p, m, g, y])
              , T = (0,
            f.useMemo)((function() {
                return f.createElement(f.Fragment, null, f.createElement("div", {
                    className: C
                }, E && f.createElement("div", {
                    className: x,
                    "data-testid": "left-icon-container"
                }, E), f.createElement("div", fo({
                    className: w
                }, Lo(Ro)), d)), f.createElement("div", {
                    className: S
                }, P && f.createElement("div", {
                    className: x
                }, P), v && f.createElement("div", fo({
                    className: w
                }, Lo(Ro)), v)))
            }
            ), [C, S, w, E, P, d, v, x]);
            return f.createElement(To, {
                containerClassName: I,
                callback: t,
                linkPath: n,
                ariaLabel: d
            }, T)
        }
          , Li = (0,
        Nr.makeStyles)({
            name: "VerticalFeed"
        })((function(e, t) {
            var n = t.maxWidth
              , r = t.gapBetweenFeedItems
              , o = t.paddingLeft
              , i = t.paddingRight;
            return {
                verticalFeedContainer: {
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: o ? "".concat(o, "px") : "0px",
                    paddingRight: i ? "".concat(i, "px") : "0px"
                },
                verticalFeedContentContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(r, "px"),
                    width: "100%",
                    maxWidth: n ? "".concat(n, "px") : "100%"
                }
            }
        }
        ))
          , Di = function(e) {
            var t = e.feedItems
              , n = e.maxWidth
              , r = e.gapBetweenFeedItems
              , o = void 0 === r ? 0 : r
              , i = e.paddingLeft
              , a = e.paddingRight
              , l = Li({
                maxWidth: n,
                gapBetweenFeedItems: o,
                paddingLeft: i,
                paddingRight: a
            }).classes;
            return f.createElement("div", {
                className: l.verticalFeedContainer
            }, f.createElement("div", {
                className: l.verticalFeedContentContainer
            }, t.map((function(e) {
                var t = e.key
                  , n = e.component;
                return f.createElement("div", {
                    key: t
                }, n)
            }
            ))))
        }
          , Fi = (0,
        Nr.makeStyles)({
            name: "DetailsPageHeader"
        })((function(e, t) {
            var n = t.backgroundMaxWidth
              , r = t.contentMaxWidth
              , o = t.contentPaddingLeft
              , i = t.contentPaddingRight;
            return {
                detailsPageHeaderContainer: {
                    position: "relative",
                    display: "flex",
                    justifyContent: "center"
                },
                backgroundContainer: {
                    width: "100%",
                    maxWidth: n ? "".concat(n, "px") : "100%"
                },
                contentContainer: {
                    position: "absolute",
                    bottom: "24px",
                    left: 0,
                    width: "100%",
                    paddingLeft: o ? "".concat(o, "px") : "0px",
                    paddingRight: i ? "".concat(i, "px") : "0px",
                    display: "flex",
                    justifyContent: "center"
                },
                contentMaxWidthContainer: {
                    width: "100%",
                    maxWidth: r ? "".concat(r, "px") : "100%"
                }
            }
        }
        ))
          , Ui = (0,
        Nr.makeStyles)({
            name: "Page"
        })((function(e, t) {
            var n = t.backgroundColor;
            return {
                pageContainer: fo({
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    gap: "24px"
                }, n && {
                    backgroundColor: n
                })
            }
        }
        ))
          , Bi = function(e) {
            var t = e.titleText
              , n = e.sendNavigateToSortLinkEvent
              , r = e.titleLink
              , o = e.isSortLinkOverrideEnabled
              , i = e.subtitleText
              , a = e.subtitleLink
              , l = e.shouldShowSeparateSubtitleLink
              , s = e.hasBackgroundMural
              , u = e.tooltipText
              , c = e.hideSeeAll
              , d = (0,
            g.useTokens)()
              , m = (o || l) && a && i
              , v = (0,
            f.useMemo)((function() {
                if (i)
                    return s ? d.Color.Extended.Gray.Gray_100 : d.Color.Content.Emphasis
            }
            ), [i, s, d.Color.Extended.Gray.Gray_100, d.Color.Content.Emphasis])
              , h = (0,
            f.useMemo)((function() {
                if (m)
                    return s ? "icon-chevron-right-dark" : "icon-chevron-right"
            }
            ), [m, s]);
            return p().createElement("div", {
                className: "home-sort-header-container",
                style: {
                    marginBottom: d.Gap.Large
                }
            }, p().createElement(yi, {
                titleText: t,
                onTitleActivated: c ? void 0 : n,
                titleLinkPath: c ? void 0 : r,
                titleTextColor: s ? d.Color.Extended.Gray.Gray_100 : d.Color.Content.Emphasis,
                titleFontStyle: d.Typography.HeadingSmall,
                titleGap: c ? void 0 : d.Gap.XSmall,
                titleIconClassName: c ? void 0 : "sdui-icon icon-push-right-16x16",
                titleIconWidth: c ? void 0 : 16,
                titleIconFirst: !1,
                subtitleText: i || void 0,
                subtitleTextColor: v,
                subtitleFontStyle: i ? d.Typography.BodyMedium : void 0,
                subtitleGap: m ? d.Gap.XXSmall : void 0,
                onSubtitleActivated: m ? n : void 0,
                subtitleLinkPath: m ? a : void 0,
                subtitleIconClassName: m ? h : void 0,
                subtitleIconWidth: m ? 22 : void 0,
                subtitleIconFirst: !1,
                verticalGap: d.Gap.XXSmall,
                iconComponent: u ? p().createElement(En, {
                    tooltipText: u,
                    placement: "left",
                    centerIcon: !0
                }) : void 0,
                containerOverrides: s ? {
                    zIndex: 1
                } : void 0
            }))
        }
          , ji = function(e) {
            var t = e.sortTitle
              , n = e.sortSubtitle
              , r = e.seeAllLink
              , o = e.subtitleLink
              , i = e.shouldShowSeparateSubtitleLink
              , a = e.isSortLinkOverrideEnabled
              , l = e.buildNavigateToSortLinkEventProperties
              , s = e.shouldShowSponsoredTooltip
              , u = e.tooltipInfoText
              , c = e.titleContainerClassName
              , d = e.hideSeeAll
              , m = e.endTimestamp
              , v = e.countdownString
              , h = e.backgroundImageAssetId
              , g = e.isNewSortHeaderEnabled
              , b = e.useRouterLink
              , I = e.translate
              , C = (0,
            f.useMemo)((function() {
                return u || (s ? I(en.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }
            ), [s, u, I])
              , S = (0,
            f.useMemo)((function() {
                return I(a ? rn.LabelLearnMore : nn.ActionSeeAll)
            }
            ), [a, I])
              , w = (0,
            f.useCallback)((function() {
                if (a && l) {
                    var e = l()
                      , t = pe.navigateToSortLink(e);
                    y.eventStreamService.sendEvent.apply(y.eventStreamService, t)
                }
            }
            ), [a, l])
              , x = (0,
            f.useMemo)((function() {
                return d || !r ? p().createElement("span", null, t) : b ? p().createElement(Er.Link, {
                    to: r
                }, t) : p().createElement(Yt.Link, {
                    url: r
                }, t)
            }
            ), [d, r, b, t])
              , E = (0,
            f.useMemo)((function() {
                return d || !r ? null : b ? p().createElement(Er.Link, {
                    to: r,
                    onClick: w,
                    className: "btn-secondary-xs see-all-link-icon btn-more"
                }, S) : p().createElement(Yt.Link, {
                    url: r,
                    onClick: w,
                    className: "btn-secondary-xs see-all-link-icon btn-more"
                }, S)
            }
            ), [d, r, b, S, w]);
            return g ? p().createElement(Bi, {
                titleText: t,
                sendNavigateToSortLinkEvent: w,
                titleLink: r,
                isSortLinkOverrideEnabled: a,
                subtitleText: n,
                subtitleLink: o,
                shouldShowSeparateSubtitleLink: i,
                hasBackgroundMural: !!h,
                tooltipText: C,
                hideSeeAll: d
            }) : p().createElement("div", {
                className: "game-sort-header-container"
            }, p().createElement("div", {
                className: c
            }, p().createElement("h2", {
                className: "sort-header"
            }, x, C && p().createElement(En, {
                tooltipText: C,
                placement: "right"
            })), E), p().createElement(kr, {
                defaultSubtitle: n,
                endTimestamp: m,
                countdownString: v,
                formatSubtitleLink: a || i,
                subtitleLink: o,
                handleSeeAllLinkClick: w,
                backgroundImageAssetId: h
            }))
        };
        ji.defaultProps = {
            sortSubtitle: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            endTimestamp: void 0,
            countdownString: void 0,
            buildNavigateToSortLinkEventProperties: void 0,
            backgroundImageAssetId: void 0,
            isNewSortHeaderEnabled: void 0,
            useRouterLink: !1
        };
        var Gi = ji
          , zi = function(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            f.useState)("")
              , o = r[0]
              , i = r[1];
            return (0,
            f.useEffect)((function() {
                var e = !0;
                return n ? Be(n).then((function(t) {
                    e && i(t)
                }
                ), (function() {
                    e && i("")
                }
                )) : i(""),
                function() {
                    e = !1
                }
            }
            ), [n]),
            p().createElement("div", {
                className: Ct()(["game-sort-carousel-wrapper", {
                    "game-sort-with-mural": !!n,
                    "game-sort-mural-loaded": !!o
                }])
            }, o && p().createElement("div", {
                className: "game-sort-mural-wrapper"
            }, p().createElement("img", {
                className: "game-sort-mural",
                alt: "",
                src: o
            }), p().createElement("div", {
                className: "game-sort-mural-gradient"
            })), t)
        }
          , Hi = dt.keyBoardEventCode
          , Wi = function(e) {
            var t = e.scrollClassNames
              , n = e.scrollIconClassName
              , r = e.scroll
              , o = e.isDisabled
              , i = e.isNewScrollArrowsEnabled;
            return p().createElement("div", {
                "data-testid": "game-carousel-scroll-bar",
                className: t,
                onClick: r,
                "aria-disabled": o,
                onKeyDown: function(e) {
                    e.code === Hi.enter && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, i ? p().createElement("span", {
                className: n
            }) : p().createElement(p().Fragment, null, p().createElement("div", {
                className: "arrow"
            }, p().createElement("span", {
                className: n
            })), p().createElement("div", {
                className: "spacer"
            })))
        }
          , Vi = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , a = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? p().createElement(p().Fragment, null, !r && p().createElement(Wi, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && p().createElement(Wi, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: a,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : p().createElement(p().Fragment, null, n && r ? null : p().createElement(Wi, {
                scrollClassNames: Ct()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), p().createElement(Wi, {
                scrollClassNames: Ct()("scroller", "next", {
                    disabled: o
                }),
                scrollIconClassName: "icon-games-carousel-right",
                isDisabled: o,
                scroll: a,
                isNewScrollArrowsEnabled: !1
            }))
        };
        Vi.defaultProps = {
            isNewScrollArrowsEnabled: void 0
        };
        var Ji, qi = Vi, Ki = function(e) {
            var t, n = e.distance, r = e.scrollAreaSize, o = e.direction, i = e.startingPosition, a = e.currentPage, l = e.pageSession, s = e.gameSetTypeId, u = e.gameSetTargetId, c = e.sortPosition, d = ((t = {})[K.StartPos] = i,
            t[K.Distance] = n,
            t[K.Direction] = o,
            t[K.PageSession] = l,
            t[K.GameSetTypeId] = s,
            t[K.GameSetTargetId] = u,
            t[K.SortPos] = c,
            t[K.ScrollDepth] = n / r,
            t[K.StartDepth] = i / r,
            t[K.ScreenSizeX] = window.innerWidth,
            t[K.ScreenSizeY] = window.innerHeight,
            t[K.ScrollAreaSize] = r,
            t);
            b.EventStream.SendEventWithTarget($.FeedScroll, a, d, b.EventStream.TargetTypes.WWW)
        }, $i = function(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            f.useRef)(t)
              , s = xr()
              , u = (0,
            f.useMemo)((function() {
                var e = St((function(e) {
                    var t;
                    if (e !== l.current) {
                        var u = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth);
                        Ki({
                            distance: e - l.current,
                            scrollAreaSize: u,
                            startingPosition: l.current,
                            currentPage: n,
                            direction: Z.Horizontal,
                            gameSetTypeId: r,
                            gameSetTargetId: o,
                            sortPosition: i,
                            pageSession: s
                        }),
                        l.current = e
                    }
                }
                ), 250)[0];
                return e
            }
            ), [n, r, o, i, s]);
            (0,
            f.useEffect)((function() {
                u(t)
            }
            ), [u, t])
        }, Xi = function() {
            return Xi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Xi.apply(this, arguments)
        }, Yi = function(e, t) {
            return e.map((function(e) {
                var n, r = e.contentType, o = e.contentId, i = e.contentMetadata, a = null === (n = null == t ? void 0 : t[r]) || void 0 === n ? void 0 : n[o];
                if (a) {
                    var l = Xi({}, a)
                      , s = null == i ? void 0 : i.EncryptedAdTrackingData;
                    return l.isSponsored = (null == s ? void 0 : s.length) > 0,
                    l.nativeAdData = s,
                    l
                }
                return a
            }
            )).filter((function(e) {
                return void 0 !== e
            }
            ))
        }, Zi = function(e) {
            return "recommendationList"in e
        }, Qi = function(e) {
            return "games"in e
        }, ea = function(e) {
            return "filters"in e
        }, ta = function(e, t) {
            return "recommendationList"in e ? Yi(e.recommendationList, t) : Qi(e) ? e.games : []
        }, na = function(e) {
            if (e && Qi(e))
                return e.gameSetTargetId
        }, ra = function(e) {
            var t, n = na(e);
            return void 0 !== n ? ((t = {})[K.GameSetTargetId] = n,
            t) : {}
        }, oa = function(e) {
            var t = e.find(ea);
            if (t) {
                var n = new Map;
                return t.filters.forEach((function(e) {
                    n.set(e.filterType, e.selectedOptionId)
                }
                )),
                n
            }
        }, ia = function(e) {
            var t;
            return e && Qi(e) && e.appliedFilters ? ((t = {})[K.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }, aa = null !== (Ji = window.ResizeObserver) && void 0 !== Ji ? Ji : no, la = function() {
            var e = (0,
            f.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            f.useCallback)((function(e) {
                var t, r = null === (t = null == e ? void 0 : e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                void 0 !== r && n(r)
            }
            ), [])
              , o = (0,
            f.useCallback)((function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }
            ), [r])
              , i = (0,
            f.useRef)(new aa(o))
              , a = (0,
            f.useCallback)((function(e) {
                e && (null == i ? void 0 : i.current) && (r(e),
                i.current.disconnect(),
                i.current.observe(e))
            }
            ), [r]);
            return (0,
            f.useEffect)((function() {
                return function() {
                    (null == i ? void 0 : i.current) && i.current.disconnect()
                }
            }
            ), []),
            [a, t]
        }, sa = ht, ua = sa.numGameCarouselLookAheadWindows, ca = sa.gameTileGutterWidth, da = sa.wideGameTileGutterWidth, fa = sa.scrollerWidth, pa = gt.wideTileHoverGrowWidthPx, ma = function(e) {
            var t = e.gameData
              , n = e.sort
              , r = e.positionId
              , o = e.page
              , a = e.gamesContainerRef
              , l = e.buildEventProperties
              , s = e.loadMoreGames
              , u = e.isLoadingMoreGames
              , c = e.componentType
              , d = e.playerCountStyle
              , m = e.playButtonStyle
              , v = e.itemsPerRow
              , h = e.friendData
              , g = e.navigationRootPlaceId
              , y = e.isSponsoredFooterAllowed
              , b = e.hideTileMetadata
              , I = e.hoverStyle
              , C = e.topicId
              , S = e.isExpandHomeContentEnabled
              , w = e.isCarouselHorizontalScrollEnabled
              , x = e.isNewScrollArrowsEnabled
              , E = e.hideScrollBackWhenDisabled
              , P = e.sortId
              , T = e.translate
              , k = (0,
            f.useRef)(null)
              , N = (0,
            f.useState)(0)
              , A = N[0]
              , O = N[1]
              , _ = (0,
            f.useState)(!1)
              , M = _[0]
              , R = _[1]
              , L = (0,
            f.useState)(!0)
              , D = L[0]
              , F = L[1]
              , U = (0,
            f.useState)(!0)
              , B = U[0]
              , j = U[1]
              , G = (0,
            f.useState)(0)
              , H = G[0]
              , W = G[1]
              , V = (0,
            f.useMemo)((function() {
                return c === i.GridTile || c === i.EventTile
            }
            ), [c])
              , J = (0,
            f.useMemo)((function() {
                return V ? da : ca
            }
            ), [V])
              , q = la()
              , K = q[0]
              , $ = q[1]
              , X = la()
              , Y = X[0]
              , Z = X[1]
              , Q = (0,
            f.useMemo)((function() {
                var e, t;
                if (V && v)
                    return v;
                var n = null === (t = null === (e = null == k ? void 0 : k.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                return void 0 !== Z && void 0 !== n ? Math.max(1, Math.floor((Z + J) / (n + J))) : 0
            }
            ), [Z, J, v, V]);
            (0,
            f.useEffect)((function() {
                F(H >= 0),
                u || void 0 !== Z && void 0 !== $ && Math.abs(H) + Z + pa >= $ ? j(!0) : j(!1)
            }
            ), [H, Z, $, null == t ? void 0 : t.length, u]);
            var ee = (0,
            f.useCallback)((function() {
                A + ua * Q >= (null == t ? void 0 : t.length) && s && !u && s()
            }
            ), [A, Q, s, u, null == t ? void 0 : t.length])
              , te = (0,
            f.useCallback)((function() {
                var e, t, n = null === (t = null === (e = null == k ? void 0 : k.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                return void 0 === n ? 0 : Math.floor(Q) * (n + J)
            }
            ), [Q, J])
              , ne = (0,
            f.useCallback)((function() {
                if (!D) {
                    var e = te();
                    W((function(t) {
                        return Math.min(t + e, 0)
                    }
                    )),
                    O((function(e) {
                        return e - Q
                    }
                    ))
                }
            }
            ), [te, D, Q])
              , re = (0,
            f.useCallback)((function() {
                if (!B) {
                    var e = te();
                    W((function(t) {
                        if (w && o === z.HomePage)
                            return void 0 !== $ && void 0 !== Z ? Math.max(t - e, -1 * ($ - Z)) : t - e;
                        if (void 0 !== $) {
                            var n = E && D ? fa : 0;
                            return Math.max(t - e, -1 * $) + n
                        }
                        return t - e
                    }
                    )),
                    O((function(e) {
                        return e + Q
                    }
                    )),
                    ee()
                }
            }
            ), [B, te, ee, w, o, $, Z, E, D, Q])
              , oe = (0,
            f.useCallback)((function(e) {
                return e >= A && e < A + Q
            }
            ), [A, Q])
              , ie = (0,
            f.useCallback)((function(e) {
                M || (R(!0),
                e(),
                setTimeout((function() {
                    R(!1)
                }
                ), 200))
            }
            ), [M])
              , ae = (0,
            f.useRef)(null);
            $i({
                scrollPosition: -H,
                page: o,
                gameSetTypeId: P,
                gameSetTargetId: na(n),
                wrapperRef: ae,
                sortPosition: r
            });
            var le = (0,
            f.useMemo)((function() {
                return Ct()({
                    "hlist games game-cards game-tile-list": !V,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": V,
                    "games-page-carousel": o === z.GamesPage,
                    "home-page-carousel": o === z.HomePage
                })
            }
            ), [V, o]);
            return p().createElement("div", {
                "data-testid": "game-carousel",
                ref: ae,
                className: Ct()("horizontal-scroller games-list", {
                    "home-page-games-list": o === z.HomePage,
                    "wide-game-tile-list": V,
                    "expand-home-content": S,
                    "expand-home-content-disabled": !S
                })
            }, p().createElement("div", {
                ref: Y,
                className: "clearfix horizontal-scroll-window"
            }, p().createElement("div", {
                ref: K,
                className: "horizontally-scrollable",
                style: {
                    left: H + "px"
                }
            }, p().createElement("ul", {
                ref: a,
                className: le
            }, t.map((function(e, t) {
                return V ? p().createElement(yr, {
                    key: e.universeId,
                    ref: k,
                    id: t,
                    isOnScreen: oe(t),
                    page: o,
                    gameData: e,
                    translate: T,
                    buildEventProperties: l,
                    componentType: c,
                    playerCountStyle: d,
                    playButtonStyle: m,
                    hoverStyle: I,
                    topicId: C,
                    friendData: h,
                    isSponsoredFooterAllowed: y,
                    hideTileMetadata: b,
                    navigationRootPlaceId: g
                }) : p().createElement("li", {
                    key: e.universeId,
                    className: "list-item game-card game-tile"
                }, p().createElement(yr, {
                    ref: k,
                    id: t,
                    isOnScreen: oe(t),
                    page: o,
                    gameData: e,
                    className: "game-card-container",
                    translate: T,
                    buildEventProperties: l,
                    componentType: c,
                    playerCountStyle: d,
                    playButtonStyle: m,
                    hoverStyle: I,
                    topicId: C,
                    friendData: h,
                    isSponsoredFooterAllowed: y,
                    hideTileMetadata: b,
                    navigationRootPlaceId: g
                }))
            }
            )))), p().createElement(qi, {
                hideScrollBackWhenDisabled: E,
                isScrollBackDisabled: D,
                isScrollForwardDisabled: B,
                onScrollBack: function() {
                    return ie(ne)
                },
                onScrollForward: function() {
                    return ie(re)
                },
                isNewScrollArrowsEnabled: x
            })))
        };
        ma.defaultProps = {
            loadMoreGames: void 0,
            componentType: void 0,
            itemsPerRow: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            friendData: void 0,
            navigationRootPlaceId: void 0,
            isSponsoredFooterAllowed: void 0,
            hideTileMetadata: void 0,
            hoverStyle: void 0,
            topicId: void 0,
            isExpandHomeContentEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0,
            hideScrollBackWhenDisabled: !1
        };
        var va = ma
          , ha = function() {
            return ha = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ha.apply(this, arguments)
        }
          , ga = function(e) {
            var t, n, r, o, i, a, l = e.translate, s = e.friendsPresence, u = e.gameData, c = e.sort, d = e.positionId, m = e.componentType, h = e.playerCountStyle, g = e.playButtonStyle, y = e.hoverStyle, b = e.tooltipInfoText, I = e.hideSeeAll, C = e.navigationRootPlaceId, S = e.isSponsoredFooterAllowed, w = e.seeAllLinkPath, x = e.subtitleLinkPath, E = e.itemsPerRow, P = e.startingRow, T = e.endTimestamp, k = e.countdownString, N = e.hideTileMetadata, A = e.isExpandHomeContentEnabled, O = e.isCarouselHorizontalScrollEnabled, _ = e.isNewScrollArrowsEnabled, M = e.isNewSortHeaderEnabled, R = (0,
            f.useRef)(null), L = (0,
            f.useRef)(null), D = xr(), F = function(e, t) {
                var n, r;
                return ha(ha(((n = {})[K.PlaceId] = e.placeId,
                n[K.UniverseId] = e.universeId,
                n[K.IsAd] = e.isSponsored,
                n[K.NativeAdData] = e.nativeAdData,
                n[K.Position] = t,
                n), ke(P, E, t)), ((r = {})[K.SortPos] = d,
                r[K.NumberOfLoadedTiles] = (u || []).length,
                r[K.GameSetTypeId] = c.topicId,
                r[K.Page] = z.HomePage,
                r[X.HomePageSessionInfo] = D,
                r[K.PlayContext] = z.HomePage,
                r))
            }, U = (0,
            f.useCallback)((function(e) {
                var t, n;
                if (void 0 !== u && void 0 !== P) {
                    var r = e.filter((function(e) {
                        return e < (null == u ? void 0 : u.length)
                    }
                    ));
                    return ha(ha(ha(ha(ha(ha(((t = {})[K.RootPlaceIds] = r.map((function(e) {
                        return u[e].placeId
                    }
                    )),
                    t[K.UniverseIds] = r.map((function(e) {
                        return u[e].universeId
                    }
                    )),
                    t), we(u, c.topicId, r, m)), Pe(u, c.topicId, r, m)), xe(u, c.topicId, r, m)), Ce(u, r)), Ne(P, null == u ? void 0 : u.length, null == u ? void 0 : u.length, r)), ((n = {})[K.NavigationUids] = r.map((function(e) {
                        var t;
                        return null !== (t = u[e].navigationUid) && void 0 !== t ? t : "0"
                    }
                    )),
                    n[K.AbsPositions] = r,
                    n[K.SortPos] = d,
                    n[K.GameSetTypeId] = c.topicId,
                    n[K.Page] = z.HomePage,
                    n[X.HomePageSessionInfo] = D,
                    n))
                }
            }
            ), [u, D, d, c.topicId, m, P]);
            Ir(R, u.length, U),
            (0,
            f.useEffect)((function() {
                A && E && (null == R ? void 0 : R.current) && R.current.style.setProperty("--items-per-row", E.toString())
            }
            ), [A, E]);
            var B = (0,
            f.useMemo)((function() {
                return w ? v.urlService.getAbsoluteUrl(w) : oe(c.topic, z.HomePage, {
                    position: d,
                    sortId: c.topicId,
                    page: z.HomePage,
                    treatmentType: c.treatmentType,
                    homePageSessionInfo: D
                })
            }
            ), [D, d, c.topic, c.topicId, c.treatmentType, w])
              , j = (0,
            f.useMemo)((function() {
                return x || B
            }
            ), [x, B])
              , G = (0,
            f.useCallback)((function() {
                var e;
                if (w)
                    return (e = {})[K.LinkPath] = w,
                    e[K.SortPos] = d,
                    e[K.GameSetTypeId] = c.topicId,
                    e[K.Page] = z.HomePage,
                    e[X.HomePageSessionInfo] = D,
                    e
            }
            ), [D, d, w, c.topicId]);
            return p().createElement(zi, {
                backgroundImageAssetId: (null === (t = c.topicLayoutData) || void 0 === t ? void 0 : t.backgroundImageAssetId) ? parseInt(null === (n = c.topicLayoutData) || void 0 === n ? void 0 : n.backgroundImageAssetId, 10) : void 0
            }, p().createElement(Gi, {
                sortTitle: c.topic,
                sortSubtitle: c.subtitle,
                seeAllLink: B,
                subtitleLink: j,
                shouldShowSeparateSubtitleLink: !!x,
                isSortLinkOverrideEnabled: !!w,
                buildNavigateToSortLinkEventProperties: G,
                shouldShowSponsoredTooltip: c.topicId === ut.adSortHomePageId,
                tooltipInfoText: b,
                titleContainerClassName: "container-header",
                hideSeeAll: I,
                endTimestamp: T,
                countdownString: k,
                backgroundImageAssetId: (null === (r = c.topicLayoutData) || void 0 === r ? void 0 : r.backgroundImageAssetId) ? parseInt(null === (o = c.topicLayoutData) || void 0 === o ? void 0 : o.backgroundImageAssetId, 10) : void 0,
                isNewSortHeaderEnabled: M,
                translate: l
            }), O ? p().createElement(va, {
                gameData: u,
                sort: c,
                positionId: d,
                page: z.HomePage,
                gamesContainerRef: R,
                buildEventProperties: F,
                loadMoreGames: void 0,
                isLoadingMoreGames: !1,
                componentType: m,
                sortId: c.topicId,
                playerCountStyle: h,
                playButtonStyle: g,
                itemsPerRow: E,
                friendData: s,
                navigationRootPlaceId: C,
                isSponsoredFooterAllowed: S,
                hideTileMetadata: N,
                hoverStyle: y,
                topicId: null === (i = c.topicId) || void 0 === i ? void 0 : i.toString(),
                isExpandHomeContentEnabled: A,
                isCarouselHorizontalScrollEnabled: O,
                isNewScrollArrowsEnabled: _,
                translate: l
            }) : p().createElement(br, {
                ref: R,
                tileRef: L,
                gameData: u,
                friendData: s,
                buildEventProperties: F,
                translate: l,
                componentType: m,
                playerCountStyle: h,
                playButtonStyle: g,
                navigationRootPlaceId: C,
                isSponsoredFooterAllowed: S,
                hideTileMetadata: N,
                hoverStyle: y,
                topicId: null === (a = c.topicId) || void 0 === a ? void 0 : a.toString(),
                isExpandHomeContentEnabled: A
            }))
        };
        ga.defaultProps = {
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
            hideTileMetadata: void 0,
            isExpandHomeContentEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var ya = ga
          , ba = (0,
        f.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Ia = function() {
            var e = (0,
            f.useContext)(ba);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
          , Ca = function() {
            return Ca = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ca.apply(this, arguments)
        }
          , Sa = function(e) {
            var n = e.translate
              , r = e.gameData
              , o = e.sort
              , a = e.page
              , l = e.positionId
              , s = e.isLoadingMoreGames
              , u = e.loadMoreGames
              , c = e.tooltipInfoText
              , d = e.hideSeeAll
              , m = e.componentType
              , v = e.playerCountStyle
              , h = e.playButtonStyle
              , g = e.itemsPerRow
              , y = e.subtitleLinkPath
              , b = (0,
            f.useRef)(null)
              , I = xr()
              , C = (0,
            f.useCallback)((function(e) {
                var t, n, i;
                if (void 0 !== r) {
                    var s = e.filter((function(e) {
                        return e < (null == r ? void 0 : r.length)
                    }
                    ));
                    return Ca(Ca(Ca(Ca(Ca(((t = {})[K.RootPlaceIds] = s.map((function(e) {
                        return r[e].placeId
                    }
                    )),
                    t[K.UniverseIds] = s.map((function(e) {
                        return r[e].universeId
                    }
                    )),
                    t), Ce(r, s)), ((n = {})[K.AbsPositions] = s,
                    n[K.SortPos] = l,
                    n[K.GameSetTypeId] = o.topicId,
                    n)), ra(o)), ia(o)), ((i = {})[K.Page] = a,
                    i[K.NumberOfLoadedTiles] = (r || []).length,
                    i[X.DiscoverPageSessionInfo] = I,
                    i))
                }
            }
            ), [r, I, l, o, a]);
            Ir(b, r.length, C),
            (0,
            f.useEffect)((function() {
                g && (null == b ? void 0 : b.current) && b.current.style.setProperty("--items-per-row", g.toString())
            }
            ), [g]);
            var S = (0,
            f.useMemo)((function() {
                var e, n, r = Ca(Ca(((e = {})[K.Position] = l,
                e[K.GameSetTypeId] = o.topicId,
                e), ra(o)), ((n = {})[K.Page] = a,
                n[K.TreatmentType] = t.Carousel,
                n[X.DiscoverPageSessionInfo] = I,
                n)), i = function(e) {
                    if (Qi(e) && e.appliedFilters) {
                        var t = {};
                        return e.appliedFilters.split(",").forEach((function(e) {
                            var n = e.split("=")
                              , r = n[0]
                              , o = n[1];
                            r && o && (t[r] = o)
                        }
                        )),
                        t
                    }
                    return {}
                }(o);
                return ie(o.sortId, a, r, i)
            }
            ), [I, a, l, o]);
            return p().createElement("div", {
                className: Ct()("games-list-container", {
                    "wide-game-tile-container": m === i.GridTile || m === i.EventTile
                })
            }, p().createElement(Gi, {
                sortTitle: o.topic,
                sortSubtitle: o.subtitle,
                subtitleLink: y || S,
                seeAllLink: S,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!y,
                shouldShowSponsoredTooltip: o.topicId === ct.adSortDiscoverId,
                tooltipInfoText: c,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: d,
                useRouterLink: !0,
                translate: n
            }), p().createElement(va, {
                gamesContainerRef: b,
                gameData: r,
                sort: o,
                positionId: l,
                loadMoreGames: u,
                sortId: o.topicId,
                isLoadingMoreGames: s,
                buildEventProperties: function(e, t) {
                    var n, i, s;
                    return Ca(Ca(Ca(Ca(((n = {})[K.PlaceId] = e.placeId,
                    n[K.UniverseId] = e.universeId,
                    n[K.IsAd] = e.isSponsored,
                    n[K.NativeAdData] = e.nativeAdData,
                    n[K.Position] = t,
                    n[K.SortPos] = l,
                    n[K.GameSetTypeId] = o.topicId,
                    n), ra(o)), ((i = {})[K.NumberOfLoadedTiles] = (r || []).length,
                    i[K.Page] = a,
                    i)), ia(o)), ((s = {})[X.DiscoverPageSessionInfo] = I,
                    s[K.PlayContext] = z.GamesPage,
                    s))
                },
                translate: n,
                page: a,
                componentType: m,
                playerCountStyle: v,
                playButtonStyle: h,
                itemsPerRow: g
            }))
        };
        Sa.defaultProps = {
            loadMoreGames: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            componentType: void 0,
            itemsPerRow: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            subtitleLinkPath: void 0
        };
        var wa = Sa
          , xa = (0,
        f.createContext)(void 0)
          , Ea = function() {
            return Ea = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ea.apply(this, arguments)
        }
          , Pa = function(e) {
            var t, n = e.translate, r = e.sort, o = e.positionId, i = e.itemsPerRow, a = e.gameData, l = e.friendsPresenceData, s = (0,
            f.useContext)(xa), u = (0,
            f.useRef)(null), c = (0,
            f.useMemo)((function() {
                return pt
            }
            ), []), d = (0,
            f.useCallback)((function(e, t) {
                var n, i;
                return Ea(Ea(((n = {})[K.PlaceId] = e.placeId,
                n[K.UniverseId] = e.universeId,
                n[K.IsAd] = e.isSponsored,
                n[K.NativeAdData] = e.nativeAdData,
                n[K.Position] = t,
                n[K.SortPos] = o,
                n[K.NumberOfLoadedTiles] = a.length,
                n[K.GameSetTypeId] = c,
                n), ra(r)), ((i = {})[K.Page] = z.SearchLandingPage,
                i[X.SearchLandingPageSessionInfo] = s,
                i[K.PlayContext] = z.SearchLandingPage,
                i))
            }
            ), [o, a.length, c, r, s]), m = (0,
            f.useCallback)((function(e) {
                var t, n, i = e.filter((function(e) {
                    return e < a.length
                }
                ));
                return Ea(Ea(Ea(Ea(Ea(((t = {})[K.RootPlaceIds] = i.map((function(e) {
                    var t;
                    return null === (t = a[e]) || void 0 === t ? void 0 : t.placeId
                }
                )),
                t[K.UniverseIds] = i.map((function(e) {
                    var t;
                    return null === (t = a[e]) || void 0 === t ? void 0 : t.universeId
                }
                )),
                t), we(a, c, i)), Pe(a, c, i)), Ce(a, i)), ra(r)), ((n = {})[K.AbsPositions] = i,
                n[K.SortPos] = o,
                n[K.NumberOfLoadedTiles] = a.length,
                n[K.GameSetTypeId] = c,
                n[K.Page] = z.SearchLandingPage,
                n[X.SearchLandingPageSessionInfo] = s,
                n))
            }
            ), [a, r, o, s, c]);
            return Ir(u, a.length, m),
            p().createElement(p().Fragment, null, p().createElement(Gi, {
                sortTitle: r.topic,
                sortSubtitle: r.subtitle,
                shouldShowSeparateSubtitleLink: !1,
                isSortLinkOverrideEnabled: !1,
                titleContainerClassName: "container-header",
                hideSeeAll: !0,
                translate: n,
                seeAllLink: void 0,
                subtitleLink: void 0,
                shouldShowSponsoredTooltip: void 0
            }), p().createElement(va, {
                gameData: a,
                sort: r,
                positionId: o,
                hideScrollBackWhenDisabled: !0,
                sortId: c,
                page: z.SearchLandingPage,
                gamesContainerRef: u,
                buildEventProperties: d,
                isLoadingMoreGames: !1,
                itemsPerRow: i,
                friendData: l,
                topicId: null === (t = r.topicId) || void 0 === t ? void 0 : t.toString(),
                isExpandHomeContentEnabled: !1,
                isCarouselHorizontalScrollEnabled: !0,
                isNewScrollArrowsEnabled: !1,
                translate: n
            }))
        };
        Pa.defaultProps = {
            itemsPerRow: void 0
        };
        var Ta = Pa
          , ka = function(e) {
            var t, n, r, o, a, l, s, u, c, d, m, v, h, g, y, b, I, C, S, w, x, E = e.translate, P = e.sort, T = e.positionId, k = e.page, N = e.itemsPerRow, A = e.startingRow, O = e.friendsPresenceData, _ = e.loadMoreGames, M = e.isLoadingMoreGames, R = e.isExpandHomeContentEnabled, L = e.isCarouselHorizontalScrollEnabled, D = e.isNewScrollArrowsEnabled, F = e.isNewSortHeaderEnabled, U = Ia().contentMetadata, B = L || k === z.HomePage && (null === (t = null == P ? void 0 : P.topicLayoutData) || void 0 === t ? void 0 : t.componentType) === i.EventTile, j = D || k === z.HomePage && (null === (n = null == P ? void 0 : P.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === i.EventTile, G = (0,
            f.useMemo)((function() {
                var e;
                return B ? ta(P, U) : R ? ta(P, U).slice(0, N) : ta(P, U).slice(0, function(e, t) {
                    var n = ut.maxWideGameTilesPerCarouselPage
                      , r = ut.maxTilesPerCarouselPage;
                    if (e !== z.GamesPage && e !== z.SearchLandingPage)
                        switch (t) {
                        case i.GridTile:
                        case i.EventTile:
                        case i.InterestTile:
                            return n;
                        case i.AppGameTileNoMetadata:
                        default:
                            return r
                        }
                }(k, null === (e = P.topicLayoutData) || void 0 === e ? void 0 : e.componentType))
            }
            ), [P, U, k, N, R, B]);
            return 0 === (null == G ? void 0 : G.length) ? null : k === z.GamesPage ? p().createElement(wa, {
                key: P.topic,
                sort: P,
                translate: E,
                positionId: T,
                page: k,
                gameData: G,
                loadMoreGames: _,
                isLoadingMoreGames: !0 === M,
                tooltipInfoText: null === (r = P.topicLayoutData) || void 0 === r ? void 0 : r.infoText,
                hideSeeAll: "true" === (null === (o = P.topicLayoutData) || void 0 === o ? void 0 : o.hideSeeAll),
                componentType: null === (a = P.topicLayoutData) || void 0 === a ? void 0 : a.componentType,
                playerCountStyle: null === (l = P.topicLayoutData) || void 0 === l ? void 0 : l.playerCountStyle,
                playButtonStyle: null === (s = P.topicLayoutData) || void 0 === s ? void 0 : s.playButtonStyle,
                subtitleLinkPath: null === (u = P.topicLayoutData) || void 0 === u ? void 0 : u.subtitleLinkPath,
                itemsPerRow: N
            }) : k === z.SearchLandingPage ? p().createElement(Ta, {
                key: P.topic,
                sort: P,
                gameData: G,
                translate: E,
                positionId: T,
                itemsPerRow: mt,
                friendsPresenceData: O
            }) : p().createElement(ya, {
                key: P.topic,
                sort: P,
                translate: E,
                positionId: T,
                gameData: G,
                friendsPresence: O,
                itemsPerRow: N,
                startingRow: A,
                componentType: null === (c = P.topicLayoutData) || void 0 === c ? void 0 : c.componentType,
                playerCountStyle: null === (d = P.topicLayoutData) || void 0 === d ? void 0 : d.playerCountStyle,
                playButtonStyle: null === (m = P.topicLayoutData) || void 0 === m ? void 0 : m.playButtonStyle,
                hoverStyle: null === (v = P.topicLayoutData) || void 0 === v ? void 0 : v.hoverStyle,
                tooltipInfoText: null === (h = P.topicLayoutData) || void 0 === h ? void 0 : h.infoText,
                hideSeeAll: "true" === (null === (g = P.topicLayoutData) || void 0 === g ? void 0 : g.hideSeeAll),
                navigationRootPlaceId: null === (y = P.topicLayoutData) || void 0 === y ? void 0 : y.navigationRootPlaceId,
                isSponsoredFooterAllowed: "true" === (null === (b = P.topicLayoutData) || void 0 === b ? void 0 : b.isSponsoredFooterAllowed),
                seeAllLinkPath: null === (I = P.topicLayoutData) || void 0 === I ? void 0 : I.linkPath,
                subtitleLinkPath: null === (C = P.topicLayoutData) || void 0 === C ? void 0 : C.subtitleLinkPath,
                endTimestamp: null === (S = P.topicLayoutData) || void 0 === S ? void 0 : S.endTimestamp,
                countdownString: null === (w = P.topicLayoutData) || void 0 === w ? void 0 : w.countdownString,
                hideTileMetadata: "true" === (null === (x = P.topicLayoutData) || void 0 === x ? void 0 : x.hideTileMetadata),
                isExpandHomeContentEnabled: R,
                isCarouselHorizontalScrollEnabled: B,
                isNewScrollArrowsEnabled: j,
                isNewSortHeaderEnabled: F
            })
        };
        ka.defaultProps = {
            loadMoreGames: void 0,
            isLoadingMoreGames: void 0,
            isExpandHomeContentEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var Na = ka
          , Aa = ut.maxTilesPerCarouselPage
          , Oa = function(e) {
            var t = e.sort
              , n = Ia().contentMetadata
              , r = (0,
            f.useMemo)((function() {
                return t.recommendationList.map((function(e) {
                    var t, r = e.contentType, o = e.contentId, i = null === (t = null == n ? void 0 : n[r]) || void 0 === t ? void 0 : t[o];
                    if (i) {
                        var a = i;
                        a.itemId = o,
                        a.itemType = r
                    }
                    return i
                }
                )).filter((function(e) {
                    return e
                }
                )).slice(0, Aa)
            }
            ), [t.recommendationList, n]);
            return 0 === (null == r ? void 0 : r.length) ? null : p().createElement(b.AvatarShopHomepageRecommendations, {
                recommendedItems: r
            })
        }
          , _a = function(e) {
            var t = e.loadData
              , n = (0,
            f.useRef)(null)
              , r = (0,
            f.useRef)(null);
            return (0,
            f.useEffect)((function() {
                var e = n.current;
                return e && (r.current = y.elementVisibilityService.observeVisibility({
                    element: e,
                    threshold: ft
                }, (function(e) {
                    e && t && t()
                }
                ))),
                function() {
                    (null == r ? void 0 : r.current) && r.current()
                }
            }
            ), [t]),
            t ? p().createElement("div", {
                ref: n,
                "data-testid": "sentinel-tile",
                className: "grid-item-container game-card-container invisible"
            }) : null
        };
        _a.displayName = "SentinelTile",
        _a.defaultProps = {
            loadData: null
        };
        var Ma = function() {
            return Ma = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ma.apply(this, arguments)
        }
          , Ra = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , La = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        };
        function Da() {
            var e = this
              , t = (0,
            f.useState)({})
              , n = t[0]
              , r = t[1]
              , o = (0,
            f.useRef)(n)
              , i = function(e) {
                (e.detail || []).forEach((function(e) {
                    o.current[e.userId] && (o.current[e.userId] = Ma(Ma({}, o.current[e.userId]), {
                        presence: e
                    }))
                }
                )),
                r(Ma({}, o.current))
            };
            return (0,
            f.useEffect)((function() {
                return Ra(e, void 0, void 0, (function() {
                    var e, t, n, a, l, s;
                    return La(this, (function(u) {
                        switch (u.label) {
                        case 0:
                            if ((null == (e = Et.deviceMeta.getDeviceMeta()) ? void 0 : e.deviceType) !== Et.deviceMeta.DeviceTypes.computer || !(null === b.CurrentUser || void 0 === b.CurrentUser ? void 0 : b.CurrentUser.isAuthenticated))
                                return [3, 5];
                            u.label = 1;
                        case 1:
                            return u.trys.push([1, 4, , 5]),
                            [4, Rt()];
                        case 2:
                            return t = u.sent().userData,
                            0 === (n = t ? t.map((function(e) {
                                return e.id
                            }
                            )) : []).length ? [2] : [4, He(n)];
                        case 3:
                            return a = u.sent().profileDetails,
                            l = (t || []).reduce((function(e, t) {
                                var n = a.find((function(e) {
                                    return e.userId === t.id
                                }
                                ));
                                return n && (e[t.id] = Ma(Ma({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }
                            ), {}),
                            o.current = l,
                            r(Ma({}, o.current)),
                            document.addEventListener("Roblox.Presence.Update", i),
                            [3, 5];
                        case 4:
                            return s = u.sent(),
                            console.error("useFriendsPresence failed to initialized with the error", s),
                            [3, 5];
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                )),
                function() {
                    document.removeEventListener("Roblox.Presence.Update", i)
                }
            }
            ), []),
            Object.values(n)
        }
        var Fa = RobloxBadges
          , Ua = function(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , s = (0,
            f.useRef)(null);
            return p().createElement("div", {
                ref: s,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, p().createElement("span", {
                className: "text-label creator-name-label"
            }, l(Qt.LabelByPrefix), " "), p().createElement("a", {
                href: i,
                onClick: function() {
                    b.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, b.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && p().createElement(Fa.VerifiedBadgeIconContainer, {
                size: Fa.BadgeSizes.CAPTIONHEADER
            }))
        }
          , Ba = function() {
            var e = (0,
            f.useState)({
                shouldShowLikeFavoriteCounts: void 0,
                experienceDetailsNoticeType: void 0,
                shouldShowVpcPlayButtonUpsells: void 0
            })
              , t = e[0]
              , n = e[1]
              , r = (0,
            f.useState)(!1)
              , o = r[0]
              , i = r[1];
            return (0,
            f.useEffect)((function() {
                i(!0),
                ze().then((function(e) {
                    n({
                        shouldShowLikeFavoriteCounts: e.EnableAggregateLikesFavoritesCount,
                        experienceDetailsNoticeType: e.experienceDetailsNoticeType,
                        shouldShowVpcPlayButtonUpsells: e.shouldShowVpcPlayButtonUpsells
                    })
                }
                )).catch((function() {
                    n({
                        shouldShowLikeFavoriteCounts: !1,
                        experienceDetailsNoticeType: void 0,
                        shouldShowVpcPlayButtonUpsells: !1
                    })
                }
                )).finally((function() {
                    i(!1)
                }
                ))
            }
            ), []),
            (0,
            f.useMemo)((function() {
                return {
                    shouldShowLikeFavoriteCounts: t.shouldShowLikeFavoriteCounts,
                    experienceDetailsNoticeType: t.experienceDetailsNoticeType,
                    shouldShowVpcPlayButtonUpsells: t.shouldShowVpcPlayButtonUpsells,
                    isFetchingPolicy: o
                }
            }
            ), [t.shouldShowLikeFavoriteCounts, t.experienceDetailsNoticeType, t.shouldShowVpcPlayButtonUpsells, o])
        }
          , ja = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.disableLoadingState
              , i = e.redirectPurchaseUrl
              , a = b.PlayButton.usePlayabilityStatus
              , l = b.PlayButton.PlayabilityStatuses
              , s = b.PlayButton.DefaultPlayButton
              , u = a(t)
              , c = u[0]
              , d = u[1]
              , m = Ba()
              , v = m.shouldShowVpcPlayButtonUpsells
              , h = m.isFetchingPolicy
              , g = (0,
            f.useMemo)((function() {
                return !!c && [l.PurchaseRequired, l.FiatPurchaseRequired].includes(c)
            }
            ), [c, l]);
            return h ? o ? p().createElement(s, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: d,
                playabilityStatus: l.Playable,
                eventProperties: r,
                hideButtonText: !0,
                disableLoadingState: o
            }) : p().createElement(Yt.Loading, null) : p().createElement(s, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: d,
                playabilityStatus: c,
                eventProperties: r,
                disableLoadingState: o,
                buttonClassName: g ? "btn-economy-robux-white-lg purchase-button" : void 0,
                hideButtonText: !g,
                redirectPurchaseUrl: g ? i : void 0,
                showDefaultPurchaseText: c === l.FiatPurchaseRequired,
                shouldShowVpcPlayButtonUpsells: v
            })
        };
        ja.defaultProps = {
            playButtonEventProperties: {},
            disableLoadingState: !1,
            redirectPurchaseUrl: void 0
        };
        var Ga = ja
          , za = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , Ha = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , Wa = (0,
        f.forwardRef)((function(e, t) {
            var n, r = e.id, o = e.buildEventProperties, i = e.gameData, a = e.translate, l = e.topicId, s = (0,
            f.useState)(), u = s[0], c = s[1], d = xt(), m = d[0], h = d[1], g = d[2], y = Da(), b = ve(i, l), I = (0,
            f.useMemo)((function() {
                return ye(y, i.universeId)
            }
            ), [y, i.universeId]), C = (0,
            f.useMemo)((function() {
                return I.length > 0 && u ? p().createElement(er, {
                    gameData: u,
                    friendData: I,
                    translate: a
                }) : p().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == u ? void 0 : u.description)
            }
            ), [I]);
            (0,
            f.useEffect)((function() {
                za(void 0, void 0, void 0, (function() {
                    var e, t;
                    return Ha(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            [4, Dt(i.placeId.toString())];
                        case 1:
                            return e = n.sent(),
                            c(e),
                            [3, 3];
                        case 2:
                            return t = n.sent(),
                            console.error(t),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ), []);
            var S = ne(i.placeId, i.name, o(i, r))
              , w = o(i, r)
              , x = Xt(b);
            return p().createElement("div", {
                ref: t,
                className: "featured-grid-item-container game-card-container",
                "data-testid": "game-tile-featured",
                onMouseOver: h,
                onMouseLeave: g,
                onFocus: h,
                onBlur: g
            }, p().createElement(Yt.Link, {
                url: S,
                className: "game-card-link",
                id: i.universeId.toString()
            }, p().createElement(Un, {
                gameLayoutData: b,
                isFocused: m
            }), p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameIcon,
                size: Zt.ThumbnailGameIconSize.size512,
                targetId: i.universeId,
                containerClass: "game-card-thumb-container",
                format: Zt.ThumbnailFormat.jpeg,
                altName: i.name
            }), p().createElement("div", {
                className: "game-card-name-info"
            }, p().createElement("div", null, p().createElement("div", {
                className: "game-card-name game-name-title",
                title: i.name
            }, i.name), x ? p().createElement(Jn, {
                footerData: x
            }) : p().createElement(Wn, {
                totalUpVotes: i.totalUpVotes,
                totalDownVotes: i.totalDownVotes,
                playerCount: i.playerCount
            })), p().createElement(Ga, {
                universeId: i.universeId.toString(),
                placeId: i.placeId.toString(),
                playButtonEventProperties: w,
                redirectPurchaseUrl: v.urlService.isValidHttpUrl(S) ? S : void 0
            })), null !== i.creatorName && p().createElement(Ua, {
                universeId: i.universeId.toString(),
                creatorId: i.creatorId,
                creatorType: i.creatorType,
                creatorName: i.creatorName,
                isCreatorVerified: null !== (n = i.creatorHasVerifiedBadge) && void 0 !== n && n,
                linkUrl: S,
                translate: a
            }), C))
        }
        ));
        Wa.displayName = "FeaturedGridTile";
        var Va = function() {
            return Va = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Va.apply(this, arguments)
        }
          , Ja = function(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                    t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
            }
            return n
        }
          , qa = (0,
        f.forwardRef)((function(e, t) {
            var n = e.emphasis
              , r = e.friendData
              , o = e.componentType
              , i = e.playerCountStyle
              , a = e.playButtonStyle
              , l = e.isSponsoredFooterAllowed
              , s = e.hideTileMetadata
              , u = e.hoverStyle
              , c = e.topicId
              , d = e.isInterestedUniverse
              , f = e.toggleInterest
              , m = Ja(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hideTileMetadata", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? p().createElement(Wa, Va({
                ref: t
            }, m)) : p().createElement(yr, Va({
                ref: t,
                friendData: r,
                componentType: o,
                playerCountStyle: i,
                playButtonStyle: a,
                isSponsoredFooterAllowed: l,
                hideTileMetadata: s,
                hoverStyle: u,
                topicId: c,
                isInterestedUniverse: d,
                toggleInterest: f
            }, m))
        }
        ));
        qa.displayName = "GameGridTile",
        qa.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hideTileMetadata: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var Ka = qa
          , $a = (0,
        f.forwardRef)((function(e, t) {
            var n = e.gameData
              , r = e.translate
              , o = e.emphasis
              , a = e.buildEventProperties
              , l = e.tileRef
              , s = e.loadData
              , u = e.shouldUseSentinelTile
              , c = e.friendsPresence
              , d = e.componentType
              , f = e.playerCountStyle
              , m = e.playButtonStyle
              , v = e.isHomeGameGrid
              , h = e.isSponsoredFooterAllowed
              , g = e.hideTileMetadata
              , y = e.hoverStyle
              , b = e.topicId
              , I = e.isExpandHomeContentEnabled
              , C = e.interestedUniverses
              , S = e.toggleInterest
              , w = Ct()("game-grid", {
                "home-game-grid": v
            }, {
                "wide-game-tile-game-grid": d === i.GridTile || d === i.EventTile || d === i.InterestTile
            }, {
                "interest-tile-game-grid": d === i.InterestTile
            }, {
                "expand-home-content": I
            }, {
                "expand-home-content-disabled": !I
            });
            return p().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: w
            }, n.map((function(e, t) {
                var n;
                return p().createElement(Ka, {
                    ref: function(e) {
                        (!0 === o && 1 === t || !1 === o && 0 === t) && l && (l.current = e)
                    },
                    key: e.universeId + "-isSponsored=" + (null !== (n = e.isSponsored) && void 0 !== n && n).toString(),
                    id: t,
                    gameData: e,
                    translate: r,
                    buildEventProperties: a,
                    emphasis: !0 === o && 0 === t && !v,
                    friendData: c,
                    componentType: d,
                    playerCountStyle: f,
                    playButtonStyle: m,
                    isSponsoredFooterAllowed: h,
                    hideTileMetadata: g,
                    hoverStyle: y,
                    topicId: b,
                    isInterestedUniverse: null == C ? void 0 : C.has(e.universeId),
                    toggleInterest: S ? function() {
                        return S(e.universeId)
                    }
                    : void 0
                })
            }
            )), u && p().createElement(_a, {
                loadData: s
            }))
        }
        ));
        $a.displayName = "GameGrid",
        $a.defaultProps = {
            friendsPresence: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isHomeGameGrid: !1,
            isSponsoredFooterAllowed: void 0,
            hideTileMetadata: void 0,
            hoverStyle: void 0,
            topicId: void 0,
            isExpandHomeContentEnabled: void 0,
            interestedUniverses: void 0,
            toggleInterest: void 0
        };
        var Xa = $a
          , Ya = function() {
            return Ya = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ya.apply(this, arguments)
        }
          , Za = function(e) {
            var t, n = e.gameData, r = e.sort, o = e.positionId, i = e.friendsPresence, a = e.componentType, l = e.playerCountStyle, s = e.playButtonStyle, u = e.hoverStyle, c = e.itemsPerRow, d = e.startingRow, m = e.isSponsoredFooterAllowed, v = e.hideTileMetadata, h = e.isExpandHomeContentEnabled, g = e.isNewSortHeaderEnabled, y = e.translate, b = (0,
            f.useRef)(null), I = (0,
            f.useRef)(null), C = xr(), S = (0,
            f.useCallback)((function(e) {
                var t, i, l;
                if (void 0 !== n && void 0 !== d) {
                    var s = e.filter((function(e) {
                        return e < (null == n ? void 0 : n.length)
                    }
                    ));
                    return Ya(Ya(Ya(Ya(Ya(Ya(Ya(((t = {})[K.RootPlaceIds] = s.map((function(e) {
                        return n[e].placeId
                    }
                    )),
                    t[K.UniverseIds] = s.map((function(e) {
                        return n[e].universeId
                    }
                    )),
                    t), we(n, r.topicId, s, a)), Pe(n, r.topicId, s, a)), xe(n, r.topicId, s, a)), ((i = {})[K.NavigationUids] = s.map((function(e) {
                        var t;
                        return null !== (t = n[e].navigationUid) && void 0 !== t ? t : "0"
                    }
                    )),
                    i[K.AbsPositions] = s,
                    i)), Ce(n, s)), Ne(d, c, null == n ? void 0 : n.length, s)), ((l = {})[K.SortPos] = o,
                    l[K.NumberOfLoadedTiles] = null == n ? void 0 : n.length,
                    l[K.GameSetTypeId] = r.topicId,
                    l[K.Page] = z.HomePage,
                    l[X.HomePageSessionInfo] = C,
                    l))
                }
            }
            ), [n, C, o, r.topicId, a, c, d]);
            return Ir(b, n.length, S),
            (0,
            f.useEffect)((function() {
                c && (null == b ? void 0 : b.current) && b.current.style.setProperty("--items-per-row", c.toString())
            }
            ), [c]),
            p().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, g ? p().createElement(Bi, {
                titleText: r.topic,
                sendNavigateToSortLinkEvent: void 0,
                titleLink: void 0,
                isSortLinkOverrideEnabled: !1,
                subtitleText: void 0,
                subtitleLink: void 0,
                shouldShowSeparateSubtitleLink: !1,
                hasBackgroundMural: !1,
                tooltipText: r.topicId === ut.adSortHomePageId ? y(en.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0,
                hideSeeAll: !0
            }) : p().createElement("div", {
                className: "container-header"
            }, p().createElement("h2", null, r.topic, r.topicId === ut.adSortHomePageId && p().createElement(En, {
                tooltipText: y(en.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right"
            }))), p().createElement($a, {
                ref: b,
                tileRef: I,
                gameData: n,
                emphasis: !1,
                translate: y,
                buildEventProperties: function(e, t) {
                    var i, a;
                    return Ya(Ya(((i = {})[K.PlaceId] = e.placeId,
                    i[K.UniverseId] = e.universeId,
                    i[K.IsAd] = e.isSponsored,
                    i[K.NativeAdData] = e.nativeAdData,
                    i[K.Position] = t,
                    i), ke(d, c, t)), ((a = {})[K.SortPos] = o,
                    a[K.NumberOfLoadedTiles] = (n || []).length,
                    a[K.GameSetTypeId] = r.topicId,
                    a[K.Page] = z.HomePage,
                    a[X.HomePageSessionInfo] = C,
                    a[K.PlayContext] = z.HomePage,
                    a))
                },
                isHomeGameGrid: !0,
                friendsPresence: i,
                componentType: a,
                playerCountStyle: l,
                playButtonStyle: s,
                isSponsoredFooterAllowed: m,
                hideTileMetadata: v,
                hoverStyle: u,
                topicId: null === (t = r.topicId) || void 0 === t ? void 0 : t.toString(),
                isExpandHomeContentEnabled: h
            }))
        };
        Za.defaultProps = {
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            hoverStyle: void 0,
            itemsPerRow: void 0,
            isSponsoredFooterAllowed: void 0,
            hideTileMetadata: void 0,
            isExpandHomeContentEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var Qa = Za
          , el = ut.sortlessGridMaxTilesMetadataToFetch
          , tl = function(e) {
            var t, n, r, o, i, a, l = e.translate, s = e.sort, u = e.positionId, c = e.itemsPerRow, d = e.startingRow, m = e.recommendations, v = e.friendsPresenceData, h = e.isExpandHomeContentEnabled, g = e.isNewSortHeaderEnabled, y = xr(), b = Ia(), I = b.contentMetadata, C = b.appendContentMetadata, S = (0,
            f.useCallback)((function() {
                var e = m.filter((function(e) {
                    var t, n = e.contentType, r = e.contentId;
                    return !(null === (t = null == I ? void 0 : I[n]) || void 0 === t ? void 0 : t[r])
                }
                ));
                e.length > 0 && Ge(e.slice(0, el), y).then((function(e) {
                    return C(e.contentMetadata)
                }
                )).catch((function() {}
                ))
            }
            ), [m, y, I, C]);
            (0,
            f.useEffect)((function() {
                S()
            }
            ), [S]);
            var w = (0,
            f.useMemo)((function() {
                return Yi(m, I)
            }
            ), [m, I]);
            return 0 === (null == w ? void 0 : w.length) ? null : p().createElement(Qa, {
                key: s.topic,
                sort: s,
                gameData: w,
                translate: l,
                positionId: u,
                itemsPerRow: c,
                startingRow: d,
                friendsPresence: v,
                componentType: null === (t = s.topicLayoutData) || void 0 === t ? void 0 : t.componentType,
                playerCountStyle: null === (n = s.topicLayoutData) || void 0 === n ? void 0 : n.playerCountStyle,
                playButtonStyle: null === (r = s.topicLayoutData) || void 0 === r ? void 0 : r.playButtonStyle,
                hoverStyle: null === (o = s.topicLayoutData) || void 0 === o ? void 0 : o.hoverStyle,
                isSponsoredFooterAllowed: "true" === (null === (i = s.topicLayoutData) || void 0 === i ? void 0 : i.isSponsoredFooterAllowed),
                hideTileMetadata: "true" === (null === (a = s.topicLayoutData) || void 0 === a ? void 0 : a.hideTileMetadata),
                isExpandHomeContentEnabled: h,
                isNewSortHeaderEnabled: g
            })
        };
        tl.defaultProps = {
            isExpandHomeContentEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var nl = tl
          , rl = function() {
            return b.RealTime.Factory.GetClient()
        }
          , ol = b.EnvironmentUrls.apiGatewayUrl
          , il = (b.EnvironmentUrls.friendsApi,
        b.EnvironmentUrls.thumbnailsApi,
        b.EnvironmentUrls.presenceApi,
        b.EnvironmentUrls.gamesApi,
        b.EnvironmentUrls.usersApi,
        function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            return {
                retryable: !0,
                withCredentials: !0,
                url: "".concat(ol, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "")
            }
        }
        )
          , al = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
              , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            return {
                retryable: !0,
                withCredentials: !0,
                url: "".concat(ol, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "").concat(r ? "&namespace=".concat(encodeURIComponent(r)) : "")
            }
        };
        function ll(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function sl(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                        ll(i, r, o, a, l, "next", e)
                    }
                    function l(e) {
                        ll(i, r, o, a, l, "throw", e)
                    }
                    a(void 0)
                }
                ))
            }
        }
        var ul = function() {
            var e = sl(regeneratorRuntime.mark((function e(t, n, r) {
                var o, i, a, l;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return o = n ? btoa(JSON.stringify(n)) : null,
                            i = il(t, o, r),
                            e.next = 4,
                            v.httpService.get(i);
                        case 4:
                            return a = e.sent,
                            l = a.data,
                            e.abrupt("return", l);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n, r) {
                return e.apply(this, arguments)
            }
        }()
          , cl = function() {
            var e = sl(regeneratorRuntime.mark((function e(t, n, r, o) {
                var i, a, l, s;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return i = n ? btoa(JSON.stringify(n)) : null,
                            a = al(t, i, r, o),
                            e.next = 4,
                            v.httpService.get(a);
                        case 4:
                            return l = e.sent,
                            s = l.data,
                            e.abrupt("return", s);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n, r, o) {
                return e.apply(this, arguments)
            }
        }();
        function dl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var fl = function() {
            var e, t = (e = regeneratorRuntime.mark((function e() {
                var t, n;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            cl("TrustedConnectionIndicatorOnUserTileAccess", null, null, "connection_social_identity/TrustedConnectionIndicator");
                        case 3:
                            return t = e.sent,
                            n = "Granted" === (null == t ? void 0 : t.access),
                            e.abrupt("return", n);
                        case 8:
                            return e.prev = 8,
                            e.t0 = e.catch(0),
                            console.error(e.t0),
                            e.abrupt("return", !1);
                        case 12:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[0, 8]])
            }
            )),
            function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                        dl(i, r, o, a, l, "next", e)
                    }
                    function l(e) {
                        dl(i, r, o, a, l, "throw", e)
                    }
                    a(void 0)
                }
                ))
            }
            );
            return function() {
                return t.apply(this, arguments)
            }
        }()
          , pl = fl
          , ml = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , vl = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , hl = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , gl = function(e) {
            return ml(void 0, void 0, Promise, (function() {
                var t;
                return vl(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t = {
                            url: b.EnvironmentUrls.friendsApi + "/v1/users/" + e + "/friends/online",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, v.httpService.get(t)];
                    case 1:
                        return [2, n.sent().data]
                    }
                }
                ))
            }
            ))
        }
          , yl = function(e, t) {
            return ml(void 0, void 0, Promise, (function() {
                var n, r;
                return vl(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return n = b.EnvironmentUrls.friendsApi + "/v1/users/" + e + "/friends/find",
                        r = {
                            url: t ? n + "?userSort=1" : n,
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, v.httpService.get(r)];
                    case 1:
                        return [2, o.sent().data]
                    }
                }
                ))
            }
            ))
        }
          , bl = function(e) {
            return ml(void 0, void 0, Promise, (function() {
                var t;
                return vl(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t = {
                            url: b.EnvironmentUrls.friendsApi + "/v1/my/trusted-friends/" + e + "/status",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, v.httpService.get(t)];
                    case 1:
                        return [2, n.sent().data]
                    }
                }
                ))
            }
            ))
        }
          , Il = function(e) {
            return ml(void 0, void 0, Promise, (function() {
                var t;
                return vl(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t = {
                            url: b.EnvironmentUrls.friendsApi + "/v1/users/" + e + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, v.httpService.get(t)];
                    case 1:
                        return [2, n.sent().data]
                    }
                }
                ))
            }
            ))
        }
          , Cl = function(e, t) {
            return ml(void 0, void 0, Promise, (function() {
                var n, r, o, i, a, l, s, u, c, d, f, p, m;
                return vl(this, (function(h) {
                    switch (h.label) {
                    case 0:
                        return t ? [4, gl(e)] : [3, 2];
                    case 1:
                        return r = h.sent().data,
                        [3, 3];
                    case 2:
                        r = [],
                        h.label = 3;
                    case 3:
                        return (n = r).sort((function(e, t) {
                            var n = {
                                InGame: 0,
                                Online: 1,
                                InStudio: 2
                            }
                              , r = e.userPresence.UserPresenceType
                              , o = t.userPresence.UserPresenceType;
                            return r in n && o in n ? n[r] < n[o] ? -1 : 1 : -1
                        }
                        )),
                        [4, yl(e, t)];
                    case 4:
                        for (o = h.sent().PageItems,
                        i = new Map,
                        a = 0,
                        l = n; a < l.length; a++)
                            s = l[a],
                            i.set(s.id, s.userPresence);
                        return u = n.map((function(e) {
                            return e.id
                        }
                        )),
                        c = o.filter((function(e) {
                            return !u.includes(e.id)
                        }
                        )).map((function(e) {
                            return e.id
                        }
                        )),
                        d = hl(hl([], u), c),
                        [4, (g = d,
                        ml(void 0, void 0, Promise, (function() {
                            var e, t;
                            return vl(this, (function(n) {
                                switch (n.label) {
                                case 0:
                                    return e = {
                                        url: b.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    t = {
                                        userIds: g,
                                        fields: ["names.combinedName", "isVerified"]
                                    },
                                    [4, v.httpService.post(e, t)];
                                case 1:
                                    return [2, n.sent().data]
                                }
                            }
                            ))
                        }
                        )))];
                    case 5:
                        return f = h.sent().profileDetails,
                        p = new Map(f.map((function(e) {
                            return [e.userId, e]
                        }
                        ))),
                        [4, pl()];
                    case 6:
                        return m = h.sent(),
                        [4, Promise.all(d.map((function(e) {
                            return ml(void 0, void 0, void 0, (function() {
                                var t, n, r, o, a, l, s, u, c, d, f;
                                return vl(this, (function(v) {
                                    switch (v.label) {
                                    case 0:
                                        return t = i.has(e),
                                        n = {
                                            isOnline: t,
                                            isInGame: t && "InGame" === (null === (l = i.get(e)) || void 0 === l ? void 0 : l.UserPresenceType),
                                            lastLocation: t ? null === (s = i.get(e)) || void 0 === s ? void 0 : s.lastLocation : void 0,
                                            gameId: t ? null === (u = i.get(e)) || void 0 === u ? void 0 : u.gameInstanceId : void 0,
                                            universeId: t ? null === (c = i.get(e)) || void 0 === c ? void 0 : c.universeId : void 0,
                                            placeId: t ? null === (d = i.get(e)) || void 0 === d ? void 0 : d.placeId : void 0
                                        },
                                        m ? [4, bl(e)] : [3, 2];
                                    case 1:
                                        return o = v.sent(),
                                        [3, 3];
                                    case 2:
                                        o = {
                                            status: "Invalid"
                                        },
                                        v.label = 3;
                                    case 3:
                                        return r = o,
                                        a = p.get(e),
                                        [2, {
                                            id: e,
                                            combinedName: null == a ? void 0 : a.names.combinedName,
                                            presence: n,
                                            hasVerifiedBadge: null !== (f = null == a ? void 0 : a.isVerified) && void 0 !== f && f,
                                            isTrustedConnection: "TrustedFriends" === r.status
                                        }]
                                    }
                                }
                                ))
                            }
                            ))
                        }
                        )))];
                    case 7:
                        return [2, h.sent()]
                    }
                    var g
                }
                ))
            }
            ))
        }
          , Sl = function() {
            return ml(void 0, void 0, Promise, (function() {
                var e;
                return vl(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return e = {
                            url: b.EnvironmentUrls.friendsApi + "/v1/my/new-friend-requests/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, v.httpService.get(e)];
                    case 1:
                        return [2, t.sent().data.count]
                    }
                }
                ))
            }
            ))
        }
          , wl = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , xl = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , El = b.EnvironmentUrls.chatApi
          , Pl = function() {
            return wl(void 0, void 0, Promise, (function() {
                var e;
                return xl(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return [4, v.httpService.get({
                            url: El + "/v1/metadata",
                            withCredentials: !0
                        })];
                    case 1:
                        return [2, {
                            chatEnabled: null == (e = t.sent().data) ? void 0 : e.isChatUserMessagesEnabled
                        }]
                    }
                }
                ))
            }
            ))
        }
          , Tl = {
            common: ["CommonUI.Features"],
            feature: "Feature.PeopleList"
        }
          , kl = function(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , i = "(" + (null != t ? t : 0) + ")"
              , a = r ? b.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : b.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends"
              , l = "Label.Connections";
            return p().createElement("div", {
                className: "container-header people-list-header"
            }, null == t || 0 === t ? p().createElement("h2", null, o(l)) : p().createElement("h2", null, o(l), p().createElement("span", {
                className: "friends-count"
            }, i)), p().createElement("a", {
                href: a,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
          , Nl = RobloxPresence
          , Al = n.n(Nl)
          , Ol = function(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.handleImageClick
              , o = e.translate
              , i = e.isTrustedConnection ? "trusted-connection-avatar-headshot" : ""
              , a = p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.avatarHeadshot,
                size: Zt.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image " + i
            });
            return p().createElement(Yt.AvatarCardItem.Headshot, {
                statusIcon: p().createElement(Al().PresenceStatusIcon, {
                    translate: o,
                    userId: t
                }),
                thumbnail: a,
                imageLink: n,
                handleImageClick: r
            })
        };
        Ol.defaultProps = {
            handleImageClick: void 0
        };
        var _l = Ol
          , Ml = function(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , l = e.translate
              , s = e.isTrustedConnection;
            return p().createElement("div", {
                className: "friend-tile-content"
            }, p().createElement(_l, {
                id: t,
                translate: l,
                userProfileUrl: r,
                handleImageClick: a,
                isTrustedConnection: s
            }), p().createElement("a", {
                href: r,
                onClick: a,
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, p().createElement("div", {
                className: "friends-carousel-tile-label"
            }, p().createElement("div", {
                className: "friends-carousel-tile-name"
            }, p().createElement("span", {
                className: "friends-carousel-display-name"
            }, n), i && p().createElement("div", {
                className: "friend-tile-verified-badge"
            }, p().createElement("div", {
                className: "friend-tile-spacer"
            }), p().createElement(Fa.VerifiedBadgeIconContainer, {
                size: Fa.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), p().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && p().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
          , Rl = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , Ll = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , Dl = function(e) {
            var t = e.friend
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.isInGame
              , a = e.gameUrl
              , l = e.universeId
              , s = e.canChat
              , u = e.translate;
            return p().createElement("div", {
                className: "friend-tile-dropdown"
            }, i && null != o && p().createElement("div", {
                className: "in-game-friend-card"
            }, p().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, p().createElement(Zt.Thumbnail2d, {
                type: Zt.ThumbnailTypes.gameIcon,
                size: Zt.ThumbnailGameIconSize.size150,
                targetId: l,
                imgClassName: "game-card-thumb",
                containerClass: "friend-tile-game-card"
            })), p().createElement("div", {
                className: "friend-presence-info"
            }, p().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, o), p().createElement(Yt.Button, {
                variant: Yt.Button.variants.growth,
                size: Yt.Button.sizes.small,
                width: Yt.Button.widths.full,
                onClick: function() {
                    return Rl(void 0, void 0, void 0, (function() {
                        var e;
                        return Ll(this, (function(n) {
                            switch (n.label) {
                            case 0:
                                return e = t.presence.gameId || "",
                                (0,
                                b.DeviceMeta)().isInApp ? ((0,
                                b.DeviceMeta)().isDesktop ? b.GameLauncher.followPlayerIntoGame(t.id, e, "JoinUser") : window.location.href = "/games/start?userID=" + t.id + "&joinAttemptId=" + e + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 1];
                            case 1:
                                return (0,
                                b.DeviceMeta)().isAndroidDevice || (0,
                                b.DeviceMeta)().isChromeOs ? (window.location.href = "intent://userId=" + t.id + "&joinAttemptId=" + e + "&joinAttemptOrigin=JoinUser#Intent;scheme=robloxmobile;package=com.roblox.client;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.roblox.client;end",
                                [3, 5]) : [3, 2];
                            case 2:
                                return (0,
                                b.DeviceMeta)().isIosDevice ? (window.location.href = "robloxmobile://userId=" + t.id + "&joinAttemptId=" + e + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 3];
                            case 3:
                                return [4, b.ProtocolHandlerClientInterface.followPlayerIntoGame({
                                    userId: t.id,
                                    joinAttemptId: e,
                                    joinAttemptOrigin: "JoinUser"
                                })];
                            case 4:
                                n.sent(),
                                n.label = 5;
                            case 5:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
            }, u("Action.Join")))), p().createElement("ul", null, s && p().createElement("li", null, p().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    y.chatService.startDesktopAndMobileWebChat({
                        userId: t.id
                    })
                }
            }, p().createElement("span", {
                className: "icon-chat-gray"
            }), " ", u("Label.Chat", {
                username: n
            }))), p().createElement("li", null, p().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    window.open(r)
                }
            }, p().createElement("span", {
                className: "icon-viewdetails"
            }), " ", u("Label.ViewProfile")))))
        }
          , Fl = function(e) {
            var t, n, r = e.trigger, o = e.content, i = e.dropdownWidth, a = (0,
            f.useState)(!1), l = a[0], s = a[1], u = (0,
            f.useRef)(null), c = (0,
            f.useRef)(null), d = function() {
                s(!0)
            }, m = function(e) {
                var t, n;
                null == e || (null === (t = u.current) || void 0 === t ? void 0 : t.contains(e.relatedTarget)) || (null === (n = c.current) || void 0 === n ? void 0 : n.contains(e.relatedTarget)) || s(!1)
            };
            (0,
            f.useEffect)((function() {
                return u.current ? (u.current.addEventListener("mouseover", d),
                u.current.addEventListener("mouseout", m),
                function() {
                    var e, t;
                    null === (e = u.current) || void 0 === e || e.removeEventListener("mouseover", d),
                    null === (t = u.current) || void 0 === t || t.removeEventListener("mouseout", m)
                }
                ) : function() {}
            }
            ), []);
            return p().createElement("div", null, p().createElement("div", {
                ref: u
            }, r), l && p().createElement("div", {
                ref: c,
                style: {
                    position: "absolute",
                    top: ((null === (t = u.current) || void 0 === t ? void 0 : t.offsetHeight) || 0) + ((null === (n = u.current) || void 0 === n ? void 0 : n.offsetTop) || 0),
                    left: function() {
                        var e, t, n = ((null === (e = u.current) || void 0 === e ? void 0 : e.offsetLeft) || 0) + ((null === (t = u.current) || void 0 === t ? void 0 : t.offsetWidth) || 0) / 2 - i / 2;
                        return n < 0 ? 24 : n + i > document.getElementsByClassName("friends-carousel-container")[0].scrollWidth ? document.getElementsByClassName("friends-carousel-container")[0].scrollWidth - (i + 24) : n
                    }(),
                    zIndex: 1002,
                    width: i
                },
                onMouseOver: d,
                onMouseOut: m,
                onFocus: d,
                onBlur: m
            }, o))
        }
          , Ul = n(72);
        n(6870);
        function Bl(e) {
            return Bl = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            Bl(e)
        }
        function jl(e, t) {
            var n = e.elements
              , r = e.threshold;
            try {
                var o = new window.IntersectionObserver(t,{
                    threshold: r
                });
                return n.forEach((function(e) {
                    o.observe(e)
                }
                )),
                function() {
                    return o.disconnect()
                }
            } catch (e) {}
            return function() {}
        }
        var Gl, zl, Hl, Wl, Vl, Jl, ql, Kl, $l, Xl, Yl, Zl = 25, Ql = .5;
        !function(e) {
            e.ItemImpressions = "itemImpressions",
            e.ItemAction = "itemAction"
        }(Gl || (Gl = {})),
        function(e) {
            e.Games = "Games",
            e.Home = "Home",
            e.SearchLanding = "SearchLanding",
            e.Spotlight = "Spotlight",
            e.UserProfile = "UserProfile"
        }(zl || (zl = {})),
        function(e) {
            e.HomePageSessionInfo = "homePageSessionInfo",
            e.DiscoverPageSessionInfo = "discoverPageSessionInfo",
            e.GameSearchSessionInfo = "gameSearchSessionInfo",
            e.SpotlightPageSessionInfo = "spotlightPageSessionInfo"
        }(Hl || (Hl = {})),
        function(e) {
            e.ContentType = "contentType",
            e.Context = "context",
            e.CollectionId = "collectionId",
            e.CollectionPosition = "collectionPosition",
            e.CollectionComponentType = "collectionComponentType"
        }(Wl || (Wl = {})),
        function(e) {
            e.User = "User",
            e.Game = "Game"
        }(Vl || (Vl = {})),
        function(e) {
            e.Online = "online",
            e.InGame = "inGame",
            e.InStudio = "inStudio",
            e.Offline = "offline"
        }(Jl || (Jl = {})),
        function(e) {
            e.Friend = "friend",
            e.NotFriend = "notFriend"
        }(ql || (ql = {})),
        function(e) {
            e.ItemIds = "itemIds",
            e.ItemPositions = "itemPositions",
            e.RowNumbers = "rowNumbers",
            e.FeedRowNumbers = "feedRowNumbers",
            e.PositionsInRow = "positionsInRow",
            e.PositionsInTopic = "positionsInTopic",
            e.TotalNumberOfItems = "totalNumberOfItems"
        }(Kl || (Kl = {})),
        function(e) {
            e.Presences = "presences",
            e.PresenceUniverseIds = "presenceUniverseIds",
            e.FriendStatuses = "friendStatuses",
            e.SourceCarousel = "sourceCarousel"
        }($l || ($l = {})),
        function(e) {
            e.ItemId = "itemId",
            e.ItemPosition = "itemPosition",
            e.ItemComponentType = "itemComponentType",
            e.RowNumber = "rowNumber",
            e.FeedRowNumber = "feedRowNumber",
            e.PositionInRow = "positionInRow",
            e.PositionInTopic = "positionInTopic",
            e.TotalNumberOfItems = "totalNumberOfItems",
            e.ActionType = "actionType"
        }(Xl || (Xl = {})),
        function(e) {
            e.Presence = "presence",
            e.PresenceUniverseId = "presenceUniverseId",
            e.FriendStatus = "friendStatus",
            e.SourceCarousel = "sourceCarousel"
        }(Yl || (Yl = {}));
        var es, ts = function(e) {
            return Object.keys(e).reduce((function(t, n) {
                var r, o, i = (r = e[n],
                o = !1,
                Array.isArray(r) && !o ? r.join(",") : "object" === Bl(r) && r ? JSON.stringify(r) : "number" == typeof r || "string" == typeof r ? r : "boolean" == typeof r ? r ? 1 : 0 : void 0);
                return void 0 !== i && (t[n] = i),
                t
            }
            ), {})
        }, ns = function(e, t, n) {
            return t ? Jl.InGame : e && "Studio" === n ? Jl.InStudio : e ? Jl.Online : Jl.Offline
        }, rs = function() {
            return rs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            rs.apply(this, arguments)
        }, os = function(e, t, n, r, o, i, a, l) {
            var s = (0,
            f.useCallback)((function() {
                var s, u, c, d, f, p;
                return (s = {})[Wl.Context] = r,
                s[Wl.ContentType] = Vl.User,
                s[Wl.CollectionId] = i,
                s[Wl.CollectionPosition] = void 0 !== a ? a + 1 : -1,
                s[Xl.TotalNumberOfItems] = l,
                s[Xl.ActionType] = "OpenProfile",
                s[Xl.ItemId] = e.id.toString(),
                s[Xl.ItemPosition] = t + 1,
                s[Xl.PositionInTopic] = t + 1,
                s[Xl.RowNumber] = 1,
                s[Yl.Presence] = ns(null === (u = e.presence) || void 0 === u ? void 0 : u.isOnline, null === (c = e.presence) || void 0 === c ? void 0 : c.isInGame, null === (d = e.presence) || void 0 === d ? void 0 : d.lastLocation),
                s[Yl.PresenceUniverseId] = null !== (p = null === (f = e.presence) || void 0 === f ? void 0 : f.universeId) && void 0 !== p ? p : -1,
                s[Yl.FriendStatus] = "friend",
                s[Yl.SourceCarousel] = n,
                s[Hl.HomePageSessionInfo] = o,
                s
            }
            ), [e, t, o, i, a, n, r, l]);
            return (0,
            f.useCallback)((function() {
                var e = s();
                y.eventStreamService.sendEvent({
                    name: Gl.ItemAction,
                    type: Gl.ItemAction,
                    context: r
                }, ts(rs({}, e)))
            }
            ), [s, r])
        }, is = "Label.UnavailableFriendName", as = (0,
        g.withTranslations)((function(e) {
            var t, n, r, o = e.friend, i = e.friendIndex, a = e.isOwnUser, l = e.translate, s = e.canChat, u = e.carouselName, c = e.eventContext, d = e.homePageSessionInfo, f = e.sortId, m = e.sortPosition, v = e.totalNumberOfFriends, h = b.EnvironmentUrls.websiteUrl + "/users/" + o.id + "/profile", g = null !== (t = o.combinedName) && void 0 !== t ? t : l(is), y = Al().usePresence(o.id, void 0), I = null != y && null != y.gameId, C = I ? y.lastLocation : null, S = null != C && C.length > 15 ? C.slice(0, 15) + "..." : C, w = I ? b.EnvironmentUrls.websiteUrl + "/games/" + (null !== (n = y.placeId) && void 0 !== n ? n : "") : "", x = os(o, i, u, c, d, f, m, v);
            return p().createElement("div", {
                className: "friends-carousel-tile"
            }, p().createElement(Fl, {
                trigger: p().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, p().createElement(Ml, {
                    id: o.id,
                    displayName: g,
                    userProfileUrl: h,
                    userPresence: S,
                    translate: l,
                    hasVerifiedBadge: o.hasVerifiedBadge,
                    sendClickEvent: x,
                    isTrustedConnection: o.isTrustedConnection
                })),
                content: a ? p().createElement(Dl, {
                    friend: o,
                    isInGame: I,
                    universeId: null !== (r = y.universeId) && void 0 !== r ? r : 0,
                    displayName: g,
                    userProfileUrl: h,
                    userPresence: C,
                    translate: l,
                    gameUrl: w,
                    canChat: s
                }) : p().createElement("div", null),
                dropdownWidth: null == S ? 240 : 315
            }))
        }
        ), Tl), ls = function() {
            return ls = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ls.apply(this, arguments)
        }, ss = function(e, t, n, r, o, i, a) {
            var l, s = (0,
            f.useCallback)((function(e) {
                var l;
                if (t) {
                    var s = e.filter((function(e) {
                        return e < t.length
                    }
                    ));
                    return (l = {})[Wl.Context] = r,
                    l[Wl.ContentType] = Vl.User,
                    l[Wl.CollectionId] = i,
                    l[Wl.CollectionPosition] = void 0 !== a ? a + 1 : -1,
                    l[Kl.TotalNumberOfItems] = t.length,
                    l[Kl.ItemIds] = s.map((function(e) {
                        var n, r, o;
                        return null !== (o = null === (r = null === (n = t[e]) || void 0 === n ? void 0 : n.id) || void 0 === r ? void 0 : r.toString()) && void 0 !== o ? o : "-1"
                    }
                    )),
                    l[Kl.ItemPositions] = s.map((function(e) {
                        return e + 1
                    }
                    )),
                    l[Kl.PositionsInTopic] = s.map((function(e) {
                        return e + 1
                    }
                    )),
                    l[Kl.RowNumbers] = s.map((function() {
                        return 1
                    }
                    )),
                    l[$l.Presences] = s.map((function(e) {
                        var n, r, o, i, a, l;
                        return ns(null === (r = null === (n = t[e]) || void 0 === n ? void 0 : n.presence) || void 0 === r ? void 0 : r.isOnline, null === (i = null === (o = t[e]) || void 0 === o ? void 0 : o.presence) || void 0 === i ? void 0 : i.isInGame, null === (l = null === (a = t[e]) || void 0 === a ? void 0 : a.presence) || void 0 === l ? void 0 : l.lastLocation)
                    }
                    )),
                    l[$l.PresenceUniverseIds] = s.map((function(e) {
                        var n, r, o;
                        return null !== (o = null === (r = null === (n = t[e]) || void 0 === n ? void 0 : n.presence) || void 0 === r ? void 0 : r.universeId) && void 0 !== o ? o : -1
                    }
                    )),
                    l[$l.FriendStatuses] = s.map((function() {
                        return ql.Friend
                    }
                    )),
                    l[$l.SourceCarousel] = n,
                    l[Hl.HomePageSessionInfo] = o,
                    l
                }
            }
            ), [t, o, i, a, n, r]), u = (0,
            f.useCallback)((function(e) {
                var t = s(e);
                void 0 !== t ? y.eventStreamService.sendEvent({
                    name: Gl.ItemImpressions,
                    type: Gl.ItemImpressions,
                    context: r
                }, ts(ls({}, t))) : (0,
                h.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }
            ), [s, r]);
            !function(e, t, n) {
                var r = (0,
                f.useRef)(new Set)
                  , o = (0,
                f.useRef)(new Set)
                  , i = (0,
                f.useRef)(null)
                  , a = (0,
                f.useCallback)((function() {
                    var e = function(e, t) {
                        if (0 === e.length || 0 === t)
                            return [e];
                        for (var n = [], r = 0; r < e.length; r += t)
                            n.push(e.slice(r, r + t));
                        return n
                    }(Array.from(o.current).filter((function(e) {
                        return !r.current.has(e)
                    }
                    )), Zl).filter((function(e) {
                        return e.length > 0
                    }
                    ));
                    e.forEach((function(e) {
                        n(e),
                        e.forEach((function(e) {
                            return r.current.add(e)
                        }
                        ))
                    }
                    )),
                    o.current.clear()
                }
                ), [n])
                  , l = (0,
                f.useMemo)((function() {
                    return Ul((function() {
                        return a()
                    }
                    ), 200)
                }
                ), [a]);
                (0,
                f.useEffect)((function() {
                    var t, n, r = Array.from(null !== (t = null == e || null === (n = e.current) || void 0 === n ? void 0 : n.children) && void 0 !== t ? t : []).filter((function(e) {
                        return e instanceof HTMLElement
                    }
                    ));
                    return i.current && (i.current(),
                    i.current = null),
                    i.current = jl({
                        elements: r,
                        threshold: Ql
                    }, (function(e, t) {
                        l.cancel();
                        var n = function(e, t, n) {
                            var r = [];
                            return t.forEach((function(t) {
                                if (null != t && t.isIntersecting) {
                                    var o = e.findIndex((function(e) {
                                        return e === t.target
                                    }
                                    ));
                                    o >= 0 && (r.push(o),
                                    n.unobserve(t.target))
                                }
                            }
                            )),
                            r.sort((function(e, t) {
                                return e - t
                            }
                            ))
                        }(r, e, t);
                        n.forEach((function(e) {
                            return o.current.add(e)
                        }
                        )),
                        l()
                    }
                    )),
                    function() {
                        l.cancel(),
                        i.current && (i.current(),
                        i.current = null)
                    }
                }
                ), [e, t, l, o])
            }(e, null !== (l = null == t ? void 0 : t.length) && void 0 !== l ? l : 0, u)
        };
        !function(e) {
            e.WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
            e.WebProfileFriendsCarousel = "WebProfileFriendsCarousel"
        }(es || (es = {}));
        var us = es
          , cs = function(e) {
            var t = e.translate
              , n = e.badgeCount;
            return p().createElement("div", {
                className: "friends-carousel-tile"
            }, p().createElement("button", {
                type: "button",
                id: "friend-tile-button"
            }, p().createElement("a", {
                href: "/users/friends#!/friend-requests"
            }, p().createElement("div", {
                className: "add-friends-icon-container"
            }, n > 0 && p().createElement(Nr.Badge, {
                className: "friend-request-badge",
                overlap: "rectangular",
                variant: "standard",
                max: 99,
                color: "error",
                badgeContent: n.toString()
            }), p().createElement(Nr.PlusHeavyIcon, {
                className: "add-friends-icon",
                color: "secondary"
            })), p().createElement("div", {
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, p().createElement("div", {
                className: "friends-carousel-tile-label"
            }, p().createElement("div", {
                className: "friends-carousel-tile-name"
            }, p().createElement("span", {
                className: "friends-carousel-display-name"
            }, t("Label.Connect"))))))))
        }
          , ds = function(e) {
            var t, n = e.friendsList, r = e.isOwnUser, o = e.translate, i = e.canChat, a = e.carouselName, l = e.eventContext, s = e.homePageSessionInfo, u = e.sortId, c = e.sortPosition, d = e.badgeCount, m = e.isAddFriendsTileEnabled, v = (0,
            f.useRef)(null), h = (0,
            f.useState)(n), g = h[0], y = h[1], b = (0,
            f.useState)(!1), I = b[0], C = b[1], S = (0,
            f.useRef)(null);
            return (0,
            f.useEffect)((function() {
                var e, t, r = null === (e = v.current) || void 0 === e ? void 0 : e.offsetWidth, o = null !== (t = null == n ? void 0 : n.length) && void 0 !== t ? t : 0;
                if (null != r && null != n) {
                    var i = 51;
                    C(110 * (m ? o + 1 : o) > r),
                    y(n.slice(0, i - (m ? 1 : 0)))
                }
            }
            ), [null === (t = v.current) || void 0 === t ? void 0 : t.offsetWidth, n, m]),
            ss(S, n, a, l, s, u, c),
            p().createElement("div", null, p().createElement("div", {
                ref: function(e) {
                    return v.current = e,
                    v.current
                },
                className: "friends-carousel-container"
            }, null == g ? p().createElement("span", {
                className: "spinner spinner-default"
            }) : p().createElement("div", {
                ref: S,
                className: I ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, a === us.WebHomeFriendsCarousel && m ? p().createElement(cs, {
                key: "add-friends-tile",
                translate: o,
                badgeCount: d,
                "data-testid": "add-friends-tile"
            }) : null, g.map((function(e, t) {
                var d;
                return p().createElement("div", {
                    key: e.id
                }, p().createElement(as, {
                    friend: e,
                    friendIndex: t,
                    translate: o,
                    isOwnUser: r,
                    canChat: i,
                    carouselName: a,
                    eventContext: l,
                    homePageSessionInfo: s,
                    sortId: u,
                    sortPosition: c,
                    totalNumberOfFriends: null !== (d = null == n ? void 0 : n.length) && void 0 !== d ? d : 0
                }))
            }
            )))))
        }
          , fs = (b.EnvironmentUrls.friendsApi,
        b.EnvironmentUrls.premiumFeaturesApi,
        b.EnvironmentUrls.usersApi,
        b.EnvironmentUrls.gamesApi,
        b.EnvironmentUrls.contactsApi,
        b.EnvironmentUrls.accountSettingsApi,
        b.EnvironmentUrls.authApi,
        b.EnvironmentUrls.tradesApi,
        b.EnvironmentUrls.apiGatewayUrl)
          , ps = (b.EnvironmentUrls.chatApi,
        function() {
            return {
                url: "".concat(fs, "/user-blocking-api/v1/users/batch-check-reciprocal-block"),
                withCredentials: !0
            }
        }
        )
          , ms = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , vs = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , hs = function(e) {
            return ms(void 0, void 0, Promise, (function() {
                var t;
                return vs(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t = parseInt(b.CurrentUser.userId, 10),
                        Number.isNaN(t) || !t ? [2, {
                            users: [{
                                isBlocked: !1,
                                isBlockingViewer: !1,
                                userId: 0
                            }]
                        }] : [4, v.httpService.post(ps(), {
                            userIds: e,
                            requesterUserId: t
                        })];
                    case 1:
                        return [2, n.sent().data]
                    }
                }
                ))
            }
            ))
        };
        function gs(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function ys(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                        gs(i, r, o, a, l, "next", e)
                    }
                    function l(e) {
                        gs(i, r, o, a, l, "throw", e)
                    }
                    a(void 0)
                }
                ))
            }
        }
        var bs = function() {
            var e = ys(regeneratorRuntime.mark((function e(t) {
                var n;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            ul("MustHideConnections", [{
                                name: "vieweeUserId",
                                type: "UserId",
                                value: "".concat(t)
                            }]);
                        case 3:
                            return n = e.sent,
                            e.abrupt("return", "Granted" === (null == n ? void 0 : n.access));
                        case 7:
                            e.prev = 7,
                            e.t0 = e.catch(0),
                            console.debug(e.t0);
                        case 10:
                            return e.abrupt("return", !0);
                        case 11:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[0, 7]])
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , Is = function() {
            var e = ys(regeneratorRuntime.mark((function e(t) {
                var n;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            hs([parseInt(t, 10)]);
                        case 3:
                            if (!(null != (n = e.sent) && n.users && n.users.length > 0)) {
                                e.next = 6;
                                break
                            }
                            return e.abrupt("return", n.users[0].isBlockingViewer);
                        case 6:
                            e.next = 11;
                            break;
                        case 8:
                            e.prev = 8,
                            e.t0 = e.catch(0),
                            console.debug(e.t0);
                        case 11:
                            return e.abrupt("return", !0);
                        case 12:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[0, 8]])
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , Cs = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , Ss = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , ws = "FriendshipNotifications"
          , xs = "fulfilled"
          , Es = y.dataStores.userDataStore
          , Ps = function(e) {
            return Promise.all(e.map((function(e) {
                return e.then((function(e) {
                    return {
                        status: xs,
                        value: e
                    }
                }
                ), (function(e) {
                    return {
                        status: "rejected",
                        value: null,
                        error: e
                    }
                }
                ))
            }
            )))
        }
          , Ts = function(e, t) {
            return Cs(void 0, void 0, void 0, (function() {
                return Ss(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return t ? [2, !1] : [4, Is(e)];
                    case 1:
                        return n.sent() ? [2, !0] : [4, bs(e)];
                    case 2:
                        return [2, n.sent()]
                    }
                }
                ))
            }
            ))
        }
          , ks = function(e) {
            var t = e.translate
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.carouselName
              , i = e.eventContext
              , a = e.homePageSessionInfo
              , l = e.sortId
              , s = e.sortPosition
              , u = (0,
            f.useState)(null)
              , c = u[0]
              , d = u[1]
              , m = (0,
            f.useState)(null)
              , v = m[0]
              , h = m[1]
              , y = (0,
            f.useState)(!1)
              , I = y[0]
              , C = y[1]
              , S = (0,
            f.useState)(null)
              , w = S[0]
              , x = S[1]
              , E = (0,
            f.useState)(!1)
              , P = E[0]
              , T = E[1]
              , k = (0,
            f.useState)({
                isBadgeEnabled: !1,
                isAddFriendsTileEnabledWeb: !1
            })
              , N = k[0]
              , A = k[1]
              , O = (0,
            Nr.createCache)()
              , _ = (0,
            g.useTheme)();
            return (0,
            f.useEffect)((function() {
                Es.clearUserDataStoreCache && Es.clearUserDataStoreCache()
            }
            ), []),
            (0,
            f.useEffect)((function() {
                if (P) {
                    var e = function() {
                        return Cs(void 0, void 0, void 0, (function() {
                            var e, t;
                            return Ss(this, (function(n) {
                                switch (n.label) {
                                case 0:
                                    return n.trys.push([0, 2, , 3]),
                                    [4, Sl()];
                                case 1:
                                    return e = n.sent(),
                                    x(e),
                                    [3, 3];
                                case 2:
                                    return t = n.sent(),
                                    console.error("Error fetching friend request count:", t),
                                    [3, 3];
                                case 3:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                      , t = rl();
                    return t.Subscribe(ws, e),
                    function() {
                        t.Unsubscribe(ws, e)
                    }
                }
            }
            ), [P]),
            (0,
            f.useEffect)((function() {
                Cs(void 0, void 0, void 0, (function() {
                    var e, t, i, a, l, s, u, c, f, p, m, v, g, y, I;
                    return Ss(this, (function(S) {
                        switch (S.label) {
                        case 0:
                            return e = [Il(n), Cl(n, r), Pl(), Sl(), Ts(n, r), Cs(void 0, void 0, Promise, (function() {
                                var e, t;
                                return Ss(this, (function(n) {
                                    switch (n.label) {
                                    case 0:
                                        if (!(null === b.ExperimentationService || void 0 === b.ExperimentationService ? void 0 : b.ExperimentationService.getAllValuesForLayer))
                                            return [3, 4];
                                        n.label = 1;
                                    case 1:
                                        return n.trys.push([1, 3, , 4]),
                                        [4, b.ExperimentationService.getAllValuesForLayer("Social.Friends")];
                                    case 2:
                                        return [2, {
                                            isBadgeEnabled: !0 === (null == (e = n.sent()) ? void 0 : e.enableNewFriendRequestsBadge),
                                            isAddFriendsTileEnabledWeb: !0 === (null == e ? void 0 : e.enableAddFriendsTileOnWeb)
                                        }];
                                    case 3:
                                        return t = n.sent(),
                                        console.error("Error fetching experimentation config:", t),
                                        [2, {
                                            isBadgeEnabled: !1,
                                            isAddFriendsTileEnabledWeb: !1
                                        }];
                                    case 4:
                                        return [2, {
                                            isBadgeEnabled: !1,
                                            isAddFriendsTileEnabledWeb: !1
                                        }]
                                    }
                                }
                                ))
                            }
                            ))],
                            [4, Ps(e)];
                        case 1:
                            return t = S.sent(),
                            i = t[0],
                            a = t[1],
                            l = t[2],
                            s = t[3],
                            u = t[4],
                            c = t[5],
                            f = i.status === xs ? i.value.count : 0,
                            p = a.status === xs ? a.value : [],
                            m = l.status === xs && l.value.chatEnabled,
                            v = s.status === xs ? s.value : 0,
                            g = c.status === xs ? c.value : {
                                isBadgeEnabled: !1,
                                isAddFriendsTileEnabledWeb: !1
                            },
                            y = u.status !== xs || u.value,
                            d(f),
                            h(p),
                            C(m),
                            x(v),
                            A(g),
                            T((w = y,
                            E = o,
                            P = f,
                            k = null !== (I = null == p ? void 0 : p.length) && void 0 !== I ? I : 0,
                            N = v,
                            O = g.isAddFriendsTileEnabledWeb,
                            !w && (E !== us.WebHomeFriendsCarousel ? 0 !== P : 0 !== P || 0 !== k || O && 0 !== N))),
                            [2]
                        }
                        var w, E, P, k, N, O
                    }
                    ))
                }
                )).catch((function(e) {
                    throw e
                }
                ))
            }
            ), [n, r]),
            p().createElement(Nr.CacheProvider, {
                cache: O
            }, p().createElement(Nr.UIThemeProvider, {
                theme: _,
                cssBaselineMode: "disabled"
            }, P ? p().createElement("div", {
                className: "react-friends-carousel-container"
            }, p().createElement(kl, {
                friendsCount: c,
                translate: t,
                profileUserId: n,
                isOwnUser: r
            }), p().createElement(ds, {
                badgeCount: N.isBadgeEnabled && null != w ? w : 0,
                friendsList: v,
                translate: t,
                isOwnUser: r,
                canChat: I,
                carouselName: o,
                eventContext: i,
                homePageSessionInfo: a,
                sortId: l,
                sortPosition: s,
                isAddFriendsTileEnabled: N.isAddFriendsTileEnabledWeb
            })) : p().createElement("div", {
                className: "friends-carousel-0-friends"
            })))
        };
        ks.defaultProps = {
            translate: void 0
        };
        var Ns = (0,
        g.withTranslations)(ks, Tl)
          , As = function(e) {
            var t, n = e.homePageSessionInfo, r = e.sortId, o = e.sortPosition, i = document.querySelector('meta[name="user-data"]'), a = i ? i.getAttribute("data-userid") : Number(null !== (t = b.CurrentUser.userId) && void 0 !== t ? t : "0");
            return p().createElement("div", {
                className: "friend-carousel-container"
            }, p().createElement(Ns, {
                profileUserId: a,
                isOwnUser: !0,
                carouselName: us.WebHomeFriendsCarousel,
                eventContext: P.Home,
                homePageSessionInfo: n,
                sortId: r,
                sortPosition: o
            }))
        }
          , Os = function(e) {
            var t = e.sortId
              , n = e.sortPosition
              , r = xr();
            return p().createElement(As, {
                homePageSessionInfo: r,
                sortId: t,
                sortPosition: n
            })
        }
          , _s = function(e) {
            var t = e.option
              , n = e.isSelected
              , r = e.setSelectedOptionId
              , o = e.translate;
            return p().createElement("button", {
                type: "button",
                onClick: function() {
                    return r(t.optionId)
                },
                className: Ct()("filter-option", {
                    "selected-option": n
                }),
                "aria-label": o(n ? tn.ActionDropdownSelected : tn.ActionDropdownNotSelected, {
                    optionName: t.optionDisplayName
                })
            }, p().createElement("span", {
                className: "filter-option-name"
            }, t.optionDisplayName), n ? p().createElement("span", {
                className: "icon-radio-check-circle-filled"
            }) : p().createElement("span", {
                className: "icon-radio-check-circle"
            }))
        }
          , Ms = gt
          , Rs = function(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , o = e.setSelectedOptionId
              , i = e.setIsDropdownOpen
              , a = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , s = e.translate
              , u = (0,
            f.useCallback)((function() {
                a(r),
                i(!1),
                l(t.filterId, ee.Apply, r, t.selectedOptionId)
            }
            ), [r, a, i, t.filterId, t.selectedOptionId, l])
              , c = (0,
            f.useCallback)((function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, ee.CloseDropdown, t.selectedOptionId, e)
            }
            ), [t.selectedOptionId, i, l, t.filterId, o, r])
              , d = (0,
            f.useCallback)((function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && c()
            }
            ), [c, n])
              , m = (0,
            f.useCallback)((function(e) {
                e.key === Ms.keyBoardEventCode.escape && c()
            }
            ), [c]);
            return (0,
            f.useEffect)((function() {
                return document.addEventListener("mousedown", d),
                document.addEventListener("keydown", m),
                function() {
                    document.removeEventListener("mousedown", d),
                    document.removeEventListener("keydown", m)
                }
            }
            ), [d, m]),
            p().createElement("div", {
                className: "filters-modal-container"
            }, p().createElement("div", {
                className: "header-container"
            }, p().createElement("h3", null, t.filterDisplayName), p().createElement("div", null, p().createElement("button", {
                type: "button",
                className: "header-close-button",
                onClick: function() {
                    return c()
                },
                "aria-label": s(tn.ActionClose)
            }, p().createElement("span", {
                className: "icon-close"
            })))), p().createElement("div", {
                className: "filter-options-container"
            }, t.filterOptions.map((function(e, t) {
                return p().createElement(p().Fragment, {
                    key: e.optionId
                }, p().createElement(_s, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
                }), 0 === t && p().createElement("div", {
                    className: "filter-option-divider"
                }))
            }
            ))), p().createElement("div", {
                className: "action-buttons-container"
            }, p().createElement(Yt.Button, {
                onClick: u,
                variant: Yt.Button.variants.primary,
                size: Yt.Button.sizes.medium,
                width: Yt.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, s(Qt.ActionApply) || "Apply")))
        }
          , Ls = function(e) {
            var t = e.filter
              , n = e.updateFilterValue
              , r = e.sendFilterClickEvent
              , o = e.translate
              , i = p().useRef(null)
              , a = (0,
            f.useState)(!1)
              , l = a[0]
              , s = a[1]
              , u = (0,
            f.useState)(t.selectedOptionId)
              , c = u[0]
              , d = u[1]
              , m = (0,
            f.useMemo)((function() {
                var e = t.filterOptions.find((function(e) {
                    return e.optionId === t.selectedOptionId
                }
                ));
                return null == e ? void 0 : e.optionDisplayName
            }
            ), [t.selectedOptionId, t.filterOptions]);
            return p().createElement("div", {
                ref: i
            }, p().createElement(Yt.Button, {
                onClick: function() {
                    s((function(e) {
                        var n = e ? ee.CloseDropdown : ee.OpenDropdown
                          , o = e ? c : void 0;
                        return r(t.filterId, n, t.selectedOptionId, o),
                        !e
                    }
                    ))
                },
                variant: l ? Yt.Button.variants.primary : Yt.Button.variants.secondary,
                size: Yt.Button.sizes.medium,
                className: "filter-select"
            }, p().createElement("span", {
                className: "filter-display-text"
            }, m), p().createElement("span", {
                className: l ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), l && p().createElement(Rs, {
                filter: t,
                dropdownContainerRef: i,
                selectedOptionId: c,
                setSelectedOptionId: d,
                setIsDropdownOpen: s,
                updateFilterValue: n,
                sendFilterClickEvent: r,
                translate: o
            }))
        }
          , Ds = function() {
            return Ds = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ds.apply(this, arguments)
        }
          , Fs = function(e, t, n) {
            var r = xr()
              , o = (0,
            f.useRef)(null)
              , i = (0,
            f.useCallback)((function() {
                var n;
                return (n = {})[K.AbsPositions] = e.filters.map((function(e, t) {
                    return t
                }
                )),
                n[K.FilterIds] = e.filters.map((function(e) {
                    return e.filterId
                }
                )),
                n[K.SelectedOptionIds] = e.filters.map((function(e) {
                    return e.selectedOptionId
                }
                )),
                n[K.GameSetTypeId] = e.topicId,
                n[K.GameSetTargetId] = e.gameSetTargetId,
                n[K.SortPos] = t,
                n[X.DiscoverPageSessionInfo] = r,
                n[K.Page] = z.GamesPage,
                n
            }
            ), [e.filters, e.topicId, e.gameSetTargetId, t, r]);
            (0,
            f.useEffect)((function() {
                return (null == n ? void 0 : n.current) && (o.current = y.elementVisibilityService.observeVisibility({
                    element: n.current,
                    threshold: dt.filterImpressionsIntersectionThreshold
                }, (function(e) {
                    if (e) {
                        var t = i()
                          , n = pe.filterImpressions(t);
                        n && y.eventStreamService.sendEvent.apply(y.eventStreamService, n),
                        (null == o ? void 0 : o.current) && o.current()
                    }
                }
                ))),
                function() {
                    (null == o ? void 0 : o.current) && o.current()
                }
            }
            ), [i, n]);
            var a = (0,
            f.useCallback)((function(n, o, i, a) {
                var l, s;
                return Ds(((l = {})[K.ButtonName] = o,
                l[K.GameSetTypeId] = e.topicId,
                l[K.GameSetTargetId] = e.gameSetTargetId,
                l[K.SortPos] = t,
                l[X.DiscoverPageSessionInfo] = r,
                l[K.Page] = z.GamesPage,
                l[K.FilterId] = n,
                l[K.SelectedOptionId] = i,
                l), a && ((s = {})[K.PreviousOptionId] = a,
                s))
            }
            ), [e.topicId, e.gameSetTargetId, t, r]);
            return (0,
            f.useCallback)((function(e, t, n, r) {
                var o = a(e, t, n, r)
                  , i = pe.gamesFilterClick(o);
                i && y.eventStreamService.sendEvent.apply(y.eventStreamService, i)
            }
            ), [a])
        }
          , Us = function(e) {
            var t = e.sort
              , n = e.positionId
              , r = e.translate
              , o = e.fetchGamesPageData
              , i = (0,
            f.useRef)(null)
              , a = Fs(t, n, i);
            return p().createElement("div", {
                ref: i,
                className: "filters-container"
            }, p().createElement("div", {
                className: "filters-header-container"
            }, p().createElement("span", {
                className: "filters-header"
            }, t.topic)), p().createElement("div", {
                className: "filter-items-container"
            }, t.filters.map((function(e) {
                return p().createElement(Ls, {
                    key: e.filterId,
                    filter: e,
                    updateFilterValue: function(n) {
                        return function(e, n) {
                            var r = oa([t]);
                            o && r && (r.set(e, n),
                            o(r))
                        }(e.filterType, n)
                    },
                    sendFilterClickEvent: a,
                    translate: r
                })
            }
            ))))
        };
        Us.defaultProps = {
            fetchGamesPageData: void 0
        };
        var Bs, js = Us, Gs = function(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }, zs = function(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                var n = parseInt(e, 10);
                if (!Number.isNaN(n))
                    return n
            }
            return t
        }, Hs = function(e, t, n) {
            if ("boolean" == typeof e)
                return e;
            if ("string" == typeof e) {
                var r = e.toLowerCase();
                return "true" === r || "t" === r || "false" !== r && "f" !== r && (ru(Bs.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e, n),
                t)
            }
            return "number" == typeof e ? 1 === e || 0 !== e && (ru(Bs.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e, n),
            t) : (ru(Bs.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined"), n),
            t)
        }, Ws = function(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }, Vs = function(e, t) {
            var n = {};
            return Object.keys(e).forEach((function(r) {
                var o = e[r];
                Ws(o) ? n[r] = o : ru(Bs.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + r + ", value: " + JSON.stringify(o) + ", type: " + typeof o, t)
            }
            )),
            n
        }, Js = function(e) {
            var t = e.pageName;
            switch (t) {
            case z.HomePage:
                return T.HomePageSessionInfo;
            case z.GamesPage:
                return T.DiscoverPageSessionInfo;
            case z.SpotlightPage:
                return T.SpotlightPageSessionInfo;
            default:
                return ru(Bs.SessionInfoKeyNotFound, "Session info key not found for page: " + (t ? JSON.stringify(t) : "undefined"), e),
                null
            }
        }, qs = function(e, t) {
            var n, r = t.pageContext.pageName, o = Js(t.pageContext);
            return o ? ((n = {})[o] = e,
            n) : (ru(Bs.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (r ? JSON.stringify(r) : "undefined") + " with session info: " + e, t.pageContext),
            {})
        }, Ks = function(e) {
            var t = e.pageName
              , n = "webDiscoverySduiError";
            switch (t) {
            case z.HomePage:
                return P.Home;
            case z.GamesPage:
                return P.Games;
            case z.SpotlightPage:
                return P.Spotlight;
            default:
                return y.eventStreamService.sendEvent({
                    name: n,
                    type: n,
                    context: e.pageName
                }, j({
                    errorName: Bs.InvalidEventContextForPage,
                    errorMessage: "Page context does not have a valid event context: " + (t ? JSON.stringify(t) : "undefined")
                })),
                null
            }
        }, $s = function(e, t, n) {
            return t.analyticsData && void 0 !== t.analyticsData[e] && null !== t.analyticsData[e] ? t.analyticsData[e] : t.ancestorAnalyticsData && void 0 !== t.ancestorAnalyticsData[e] && null !== t.ancestorAnalyticsData[e] ? t.ancestorAnalyticsData[e] : n
        }, Xs = "webDiscoverySduiError", Ys = "DiscoverySdui_FeedStats";
        !function(e) {
            e.ActiveFriendsFooterPlaceDetailsFetchError = "ActiveFriendsFooterPlaceDetailsFetchError",
            e.AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
            e.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
            e.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
            e.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
            e.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
            e.BuildBaseImpressionParamsInvalidItemsPerRow = "BuildBaseImpressionParamsInvalidItemsPerRow",
            e.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
            e.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
            e.CollectionCarouselMissingItem = "CollectionCarouselMissingItem",
            e.CollectionCarouselItemMissingComponentType = "CollectionCarouselItemMissingComponentType",
            e.CollectionCarouselHeaderNotReactElement = "CollectionCarouselHeaderNotReactElement",
            e.CollectionGridMissingItem = "CollectionGridMissingItem",
            e.CollectionGridItemMissingComponentType = "CollectionGridItemMissingComponentType",
            e.CollectionComponentItemsImpressedButMissing = "CollectionComponentItemsImpressedButMissing",
            e.CollectionComponentChildNotReactElement = "CollectionComponentChildNotReactElement",
            e.ComponentNotFound = "ComponentNotFound",
            e.FriendsPresenceFetchFailure = "FriendsPresenceFetchFailure",
            e.InvalidEventContextForPage = "InvalidEventContextForPage",
            e.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
            e.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
            e.InvalidMinWidthConditionValue = "InvalidMinWidthConditionValue",
            e.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
            e.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
            e.InvalidParsedMinWidthConditionValue = "InvalidParsedMinWidthConditionValue",
            e.InvalidPresenceConditionValue = "InvalidPresenceConditionValue",
            e.InvalidPresenceUpdateEvent = "InvalidPresenceUpdateEvent",
            e.NestedPropParseFailure = "NestedPropParseFailure",
            e.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
            e.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
            e.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
            e.PropParseFailure = "PropParseFailure",
            e.PropParserNotFound = "PropParserNotFound",
            e.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
            e.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
            e.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
            e.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
            e.SduiActionOpenSeeAllInvalidCollectionId = "SduiActionOpenSeeAllInvalidCollectionId",
            e.SduiActionOpenSeeAllInvalidCollectionName = "SduiActionOpenSeeAllInvalidCollectionName",
            e.SduiActionOpenSignupInvalidGetSignupUrl = "SduiActionOpenSignupInvalidGetSignupUrl",
            e.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
            e.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
            e.SduiLandingPageConfigurationNotFound = "SduiLandingPageConfigurationNotFound",
            e.SduiLandingPageDataFetchError = "SduiLandingPageDataFetchError",
            e.SduiLandingPageDataParseError = "SduiLandingPageDataParseError",
            e.SduiLandingPageDeviceFeaturesFetchError = "SduiLandingPageDeviceFeaturesFetchError",
            e.SduiLandingPagePageSlugFetchError = "SduiLandingPagePageSlugFetchError",
            e.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
            e.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
            e.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
            e.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
            e.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
            e.SduiParseAutomaticSizeInvalidInput = "SduiParseAutomaticSizeInvalidInput",
            e.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
            e.SduiParseColorValueInvalidInput = "SduiParseColorValueInvalidInput",
            e.SduiParseFoundationButtonSizeInvalidInput = "SduiParseFoundationButtonSizeInvalidInput",
            e.SduiParseFoundationButtonVariantInvalidInput = "SduiParseFoundationButtonVariantInvalidInput",
            e.SduiParseFoundationTokenInvalidInput = "SduiParseFoundationTokenInvalidInput",
            e.SduiParseFoundationTokenInvalidInputPath = "SduiParseFoundationTokenInvalidInputPath",
            e.SduiParseFoundationTokenInvalidOutputType = "SduiParseFoundationTokenInvalidOutputType",
            e.SduiParseFoundationTokenMissingTokens = "SduiParseFoundationTokenMissingTokens",
            e.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
            e.SduiParseIconInvalidInput = "SduiParseIconInvalidInput",
            e.SduiParseUDim2InvalidInput = "SduiParseUDim2InvalidInput",
            e.SduiParseVector2InvalidInput = "SduiParseVector2InvalidInput",
            e.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
            e.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
            e.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
            e.SessionInfoKeyNotFound = "SessionInfoKeyNotFound",
            e.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
            e.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
            e.SingleItemCollectionItemMissingItemComponentType = "SingleItemCollectionItemMissingItemComponentType",
            e.TemplateResolutionCircularReference = "TemplateResolutionCircularReference",
            e.TemplateResolutionComponentTypeMismatch = "TemplateResolutionComponentTypeMismatch",
            e.TemplateResolutionTemplateNotFound = "TemplateResolutionTemplateNotFound",
            e.UnsupportedConditionalPropsCondition = "UnsupportedConditionalPropsCondition",
            e.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
            e.UnknownPresenceConditionKey = "UnknownPresenceConditionKey",
            e.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey",
            e.UnsupportedSduiPage = "UnsupportedSduiPage"
        }(Bs || (Bs = {}));
        var Zs, Qs, eu = function(e) {
            if (e) {
                var t = Ks(e);
                if (t)
                    return t
            }
            return "unknown"
        }, tu = function(e, t, n) {
            (0,
            h.fireEvent)(e);
            var r = {
                errorName: e,
                errorMessage: t
            };
            y.eventStreamService.sendEvent({
                name: Xs,
                type: Xs,
                context: eu(n)
            }, j(r))
        }, nu = function(e, n) {
            var r;
            try {
                var o = e.sorts
                  , i = e.sdui
                  , a = {}
                  , l = {};
                o.forEach((function(e) {
                    var n, r;
                    e.topicId && (!function(e) {
                        return e.treatmentType === t.Sdui
                    }(e) ? (l[e.topicId] = !1,
                    a[e.topicId] = (null !== (r = a[e.topicId]) && void 0 !== r ? r : 0) + function(e) {
                        return Zi(e) && e.recommendationList && Array.isArray(e.recommendationList) ? e.recommendationList.length : 0
                    }(e)) : (l[e.topicId] = !0,
                    a[e.topicId] = (null !== (n = a[e.topicId]) && void 0 !== n ? n : 0) + function(e, t) {
                        var n, r, o, i, a = null === (r = null === (n = null == t ? void 0 : t.feed) || void 0 === n ? void 0 : n.props) || void 0 === r ? void 0 : r.feedItems;
                        if (!a || !Array.isArray(a))
                            return 0;
                        var l = a.find((function(t) {
                            return t.feedItemKey === e
                        }
                        ));
                        return (null === (o = null == l ? void 0 : l.props) || void 0 === o ? void 0 : o.items) && Array.isArray(l.props.items) ? l.props.items.length : (null === (i = null == l ? void 0 : l.props) || void 0 === i ? void 0 : i.item) ? 1 : 0
                    }(e.feedItemKey, i)))
                }
                ));
                var s = ((r = {})[X.HomePageSessionInfo] = n,
                r);
                Object.entries(a).forEach((function(e) {
                    var t = e[0]
                      , n = e[1];
                    s[t + "_item_count"] = n,
                    s[t + "_is_sdui"] = l[t] ? 1 : 0
                }
                )),
                y.eventStreamService.sendEvent({
                    name: Ys,
                    type: Ys,
                    context: P.Home
                }, j(s))
            } catch (e) {
                (0,
                h.fireEvent)(ut.omniRecommendationFeedStatsLoggingErrorEvent)
            }
        }, ru = tu, ou = function() {
            return ou = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ou.apply(this, arguments)
        }, iu = function(e) {
            var t = e.sduiContext
              , n = e.title
              , r = e.subtitle
              , o = e.titleImage
              , i = e.bottomRowComponent
              , a = e.gradient
              , l = e.gradientHeightPercent
              , s = e.gradientWidthPercent
              , u = e.foregroundImage
              , c = e.backgroundImage
              , d = e.onActivated
              , m = e.badgeText
              , v = e.asset
              , h = e.ctaButtonComponent
              , g = e.minForegroundHeightPercent
              , y = e.maxForegroundHeightPercent
              , b = e.titleImageAspectRatio
              , I = e.titleImageHeightPercentage
              , C = e.minCardHeight
              , S = e.foregroundAspectRatio
              , w = e.enableBackgroundAnimation
              , x = e.enableForegroundAnimation
              , E = e.children
              , P = (0,
            f.useMemo)((function() {
                var e = t.dependencies.tokens;
                return v ? p().createElement(zo, {
                    title: v.title,
                    titleFontStyle: e.Typography.TitleMedium,
                    subtitle: v.subtitle,
                    subtitleFontStyle: e.Typography.BodyMedium,
                    imageComponent: v.image,
                    rightButtonContent: h,
                    subtitleMaxLines: 1,
                    textColor: "white",
                    height: 40
                }) : p().createElement(p().Fragment, null)
            }
            ), [v, h, t])
              , T = (0,
            f.useMemo)((function() {
                return m ? p().createElement(hi, {
                    pillText: m
                }) : p().createElement(p().Fragment, null)
            }
            ), [m])
              , k = (0,
            f.useMemo)((function() {
                return void 0 !== l ? l : 0 === a.degree || 180 === a.degree ? 1 : .5
            }
            ), [l, a])
              , N = (0,
            f.useMemo)((function() {
                return void 0 !== s ? s : 0 === a.degree || 180 === a.degree ? .5 : 1
            }
            ), [s, a]);
            return (0,
            f.useMemo)((function() {
                return p().createElement(pi, {
                    title: n,
                    subtitle: r,
                    titleImageComponent: o,
                    foregroundImageComponent: u,
                    backgroundImageComponent: c,
                    gradient: ou(ou({}, a), {
                        heightPercent: k,
                        widthPercent: N
                    }),
                    gradientHeightPercent: k,
                    gradientWidthPercent: N,
                    overlayPillComponent: T,
                    backgroundClickAction: null == d ? void 0 : d.onActivated,
                    backgroundClickLinkPath: null == d ? void 0 : d.linkPath,
                    bottomRowComponent: null != i ? i : P,
                    minForegroundHeightPercent: g,
                    maxForegroundHeightPercent: y,
                    titleImageAspectRatio: b,
                    titleImageHeightPercentage: I,
                    minCardHeight: C,
                    foregroundAspectRatio: S,
                    enableBackgroundAnimation: w,
                    enableForegroundAnimation: x
                }, E)
            }
            ), [c, d, i, P, u, a, k, N, r, n, o, E, T, g, y, b, I, C, S, w, x])
        }, au = function(e) {
            var t = e.layoutOrder
              , n = e.anchorPoint
              , r = e.automaticSize
              , o = e.size
              , i = e.position
              , a = e.zIndex
              , l = e.ctaButton
              , s = e.labelText
              , u = e.rightLabelContent
              , c = e.sduiContext.dependencies.tokens
              , d = (0,
            f.useMemo)((function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }
            ), [t, n, r, o, i, a]);
            return p().createElement(vi, {
                ctaButton: l,
                labelText: s,
                labelTextColor: c.Color.Extended.Gray.Gray_400,
                labelTextFontStyle: c.Typography.BodySmall,
                rightLabelContent: u,
                containerOverrides: d
            })
        }, lu = function() {
            return lu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            lu.apply(this, arguments)
        }, su = {
            id: "Unknown",
            itemPosition: -1,
            itemComponentType: "Unknown"
        }, uu = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1,
            collectionComponentType: "Unknown"
        }, cu = function(e, t, n, r) {
            var o, i = lu(lu(lu({}, t), e), n), a = lu(lu({}, i), {
                id: Gs(i.id, su.id),
                itemPosition: zs(i.itemPosition, su.itemPosition),
                itemComponentType: Gs(i.itemComponentType, su.itemComponentType)
            });
            return void 0 === (o = a).id || o.itemPosition < 0 ? (ru(Bs.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(a), r.pageContext),
            lu(lu({}, su), a)) : a
        }, du = function() {
            return du = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            du.apply(this, arguments)
        }, fu = function(e, t, n, r) {
            var o, i, a, l, s = cu(null !== (o = t.analyticsData) && void 0 !== o ? o : {}, null !== (i = t.ancestorAnalyticsData) && void 0 !== i ? i : {}, void 0, n), u = null !== (a = null != r ? r : t.getCollectionData && t.getCollectionData()) && void 0 !== a ? a : null;
            u || ru(Bs.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e), n.pageContext);
            var c = null != u ? u : uu
              , d = function(e, t, n, r, o, i, a, l, s) {
                var u;
                return e ? ((u = {})[k.CollectionId] = o,
                u[k.CollectionPosition] = r,
                u[k.ContentType] = n,
                u[k.CollectionComponentType] = i,
                u[R.TotalNumberOfItems] = a,
                u[R.ItemId] = e.id,
                u[R.ItemPosition] = t,
                u[R.PositionInTopic] = t,
                u[R.ItemComponentType] = e.itemComponentType,
                u[R.ActionType] = l,
                u) : (ru(Bs.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + o, s.pageContext),
                {})
            }(s, s.itemPosition, c.contentType, c.collectionPosition, c.collectionId, c.collectionComponentType, c.totalNumberOfItems, e.actionType, n)
              , f = du(du(du(du({}, c), s), Vs(e.actionParams, n.pageContext)), d);
            y.eventStreamService.sendEvent({
                name: E.ItemAction,
                type: E.ItemAction,
                context: null !== (l = Ks(n.pageContext)) && void 0 !== l ? l : "unknown"
            }, j(du({}, f)))
        }, pu = function() {
            return pu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            pu.apply(this, arguments)
        }, mu = function(e, t, n, r, o) {
            var i = (0,
            f.useRef)(null)
              , a = (0,
            f.useCallback)((function(e, t) {
                fu(e, t, o, i.current)
            }
            ), [i, o])
              , l = (0,
            f.useCallback)((function() {
                return i.current
            }
            ), [i])
              , s = (0,
            f.useMemo)((function() {
                return pu(pu({}, e), {
                    logAction: a,
                    getCollectionAnalyticsData: l
                })
            }
            ), [e, a, l]);
            return i.current = (0,
            f.useMemo)((function() {
                var e, i, a, l = Gs(null === (e = s.analyticsData) || void 0 === e ? void 0 : e.collectionComponentType, t);
                return function(e, t, n, r, o, i) {
                    var a, l = lu(lu({}, e), t), s = lu(lu({}, l), {
                        collectionId: zs(l.collectionId, uu.collectionId),
                        collectionPosition: zs(l.collectionPosition, -1),
                        contentType: Gs(l.contentType, uu.contentType),
                        itemsPerRow: r,
                        totalNumberOfItems: o,
                        collectionComponentType: n || uu.collectionComponentType
                    });
                    return void 0 === (a = s).collectionId || a.collectionId < 0 || void 0 === a.contentType || void 0 === a.collectionPosition || a.collectionPosition < 0 || void 0 === a.totalNumberOfItems || a.totalNumberOfItems < 0 ? (ru(Bs.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + (n || uu.collectionComponentType) + " is invalid: " + JSON.stringify(s), i.pageContext),
                    lu(lu({}, uu), s)) : s
                }(null !== (i = s.ancestorAnalyticsData) && void 0 !== i ? i : {}, null !== (a = s.analyticsData) && void 0 !== a ? a : {}, l, n, r, o)
            }
            ), [s.ancestorAnalyticsData, s.analyticsData, t, n, r, o]),
            {
                collectionAnalyticsContext: s,
                collectionAnalyticsDataRef: i
            }
        }, vu = function() {
            return vu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            vu.apply(this, arguments)
        }, hu = function(e, t, n) {
            return (0,
            f.useMemo)((function() {
                return t ? t.map((function(t) {
                    return t.templateKey ? e.templateRegistry.resolveTemplateForConfig(t) : n ? e.templateRegistry.resolveTemplateForConfig(vu(vu({}, t), {
                        templateKey: n
                    })) : t
                }
                )) : []
            }
            ), [t, e, n])
        }, gu = function() {
            return gu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            gu.apply(this, arguments)
        }, yu = function(e, t, n, r, o) {
            var i, a, l, s, u, c = function(e) {
                var t, n = null == e ? void 0 : e[0];
                if ((null == n ? void 0 : n.componentType) === Tc.Tile || (null == n ? void 0 : n.componentType) === Tc.GameTile) {
                    var r = null === (t = n.props) || void 0 === t ? void 0 : t.imageAspectRatio;
                    if (Ws(r) && zs(r, 0) > 1)
                        return !0
                }
                return !1
            }(n), d = null !== (l = Js(o.pageContext)) && void 0 !== l ? l : "", f = Gs(null == r ? void 0 : r[d], ""), p = e.length > 0 ? Gs(null === (s = t[e[0]]) || void 0 === s ? void 0 : s.itemComponentType, su.itemComponentType) : su.itemComponentType, m = gu(gu(gu(gu(gu(((i = {})[K.RootPlaceIds] = e.map((function(e) {
                var n;
                return zs(null === (n = t[e]) || void 0 === n ? void 0 : n.placeId, -1)
            }
            )),
            i[K.UniverseIds] = e.map((function(e) {
                var n;
                return zs(null === (n = t[e]) || void 0 === n ? void 0 : n.universeId, -1)
            }
            )),
            i), function(e, t, n) {
                var r;
                return e ? ((r = {})[K.ThumbnailAssetIds] = t.map((function(e) {
                    var t;
                    return Gs(null === (t = n[e]) || void 0 === t ? void 0 : t.thumbnailAssetId, "0")
                }
                )),
                r[K.ThumbnailListIds] = t.map((function(e) {
                    var t;
                    return Gs(null === (t = n[e]) || void 0 === t ? void 0 : t.thumbnailListId, "0")
                }
                )),
                r) : {}
            }(c, e, t)), function(e, t, n) {
                var r;
                return e ? ((r = {})[K.TileBadgeContexts] = t.map((function(e) {
                    var t;
                    return Gs(null === (t = n[e]) || void 0 === t ? void 0 : t.tileBadgeIds, "0")
                }
                )),
                r) : {}
            }(c, e, t)), function(e, t, n) {
                var r, o = e.map((function(e) {
                    var r;
                    return !0 === Hs(null === (r = t[e]) || void 0 === r ? void 0 : r.adFlag, !1, n.pageContext) ? 1 : 0
                }
                ));
                return o.some((function(e) {
                    return 1 === e
                }
                )) ? ((r = {})[K.AdsPositions] = o,
                r[K.AdFlags] = o,
                r[K.AdIds] = e.map((function(e) {
                    var n;
                    return Gs(null === (n = t[e]) || void 0 === n ? void 0 : n.adId, "0")
                }
                )),
                r) : {}
            }(e, t, o)), ((a = {})[K.NavigationUids] = e.map((function(e) {
                var n;
                return Gs(null === (n = t[e]) || void 0 === n ? void 0 : n.navigationUniverseId, "0")
            }
            )),
            a[K.AbsPositions] = e,
            a[K.SortPos] = (null == r ? void 0 : r.collectionPosition) >= 0 ? r.collectionPosition - 1 : -1,
            a[K.ComponentType] = p,
            a[K.GameSetTypeId] = null !== (u = null == r ? void 0 : r.collectionId) && void 0 !== u ? u : -1,
            a[K.Page] = o.pageContext.pageName,
            a)), qs(f, o)), v = pe.gameImpressions(m);
            y.eventStreamService.sendEvent.apply(y.eventStreamService, v)
        }, bu = function() {
            return bu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            bu.apply(this, arguments)
        }, Iu = [k.CollectionId, k.CollectionPosition, k.ContentType, k.CollectionComponentType, "id", "itemPosition", "itemsPerRow", "rowNumber", _.TotalNumberOfItems], Cu = function(e, t, n, r) {
            var o, i;
            if (n && t)
                if (0 !== e.length) {
                    var a = function(e, t, n, r, o, i, a, l, s) {
                        var u, c = [], d = [], f = [], p = [];
                        return e.forEach((function(e) {
                            var n = t[e];
                            if (null != n)
                                if (c.push(n.id),
                                d.push(n.itemPosition),
                                p.push(n.itemPosition),
                                void 0 !== r && r > 0) {
                                    var o = Math.floor(e / r);
                                    f.push(o + 1)
                                } else
                                    ru(Bs.BuildBaseImpressionParamsInvalidItemsPerRow, "itemsPerRow is undefined or not greater than 0 when sending impressions for collection " + i + ": " + JSON.stringify(r), s.pageContext),
                                    f.push(1);
                            else
                                ru(Bs.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i, s.pageContext)
                        }
                        )),
                        (u = {})[k.CollectionId] = i,
                        u[k.CollectionPosition] = o,
                        u[k.ContentType] = n,
                        u[k.CollectionComponentType] = a,
                        u[_.TotalNumberOfItems] = l,
                        u[_.ItemIds] = c.join(","),
                        u[_.ItemPositions] = d.join(","),
                        u[_.RowNumbers] = f.join(","),
                        u[_.PositionsInTopic] = p.join(","),
                        u
                    }(e, t, n.contentType, n.itemsPerRow, n.collectionPosition, n.collectionId, n.collectionComponentType, n.totalNumberOfItems, r)
                      , l = function(e, t, n, r) {
                        var o = {};
                        e.forEach((function(i, a) {
                            var l = t[i];
                            null != l ? Object.entries(l).forEach((function(t) {
                                var n = t[0]
                                  , r = t[1];
                                Iu.includes(n) || null == r || (o[n] || (o[n] = e.map((function() {
                                    return ""
                                }
                                ))),
                                o[n][a] = r.toString())
                            }
                            )) : ru(Bs.BuildItemImpressionParamsMissingItem, "Item at index " + i + " is nil when sending impressions for collection " + n, r.pageContext)
                        }
                        ));
                        var i = {};
                        return Object.entries(o).forEach((function(e) {
                            var t = e[0]
                              , n = e[1];
                            i[t + "_arr"] = n.join(",")
                        }
                        )),
                        i
                    }(e, t, n.collectionId, r)
                      , s = bu(bu(bu({}, n), l), a);
                    y.eventStreamService.sendEvent({
                        name: E.ItemImpressions,
                        type: E.ItemImpressions,
                        context: null !== (i = Ks(r.pageContext)) && void 0 !== i ? i : "unknown"
                    }, j(bu({}, s)))
                } else
                    ru(Bs.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId, r.pageContext);
            else
                ru(Bs.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (o = null == n ? void 0 : n.collectionId) && void 0 !== o ? o : "undefined"), r.pageContext)
        }, Su = function(e, t, n, r, o) {
            var i = (0,
            f.useCallback)((function(i) {
                var a;
                t ? ("Game" === (null === (a = r.current) || void 0 === a ? void 0 : a.contentType) && yu(i, n.current, t, r.current, o),
                Cu(i, n.current, r.current, o)) : ru(Bs.CollectionComponentItemsImpressedButMissing, e.componentType + " with config " + JSON.stringify(e) + " is missing item configs on impression. Configs are " + JSON.stringify(t), o.pageContext)
            }
            ), [t, r, n, o, e]);
            return {
                onItemsImpressed: i
            }
        }, wu = function() {
            return wu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            wu.apply(this, arguments)
        }, xu = function(e, t) {
            return (0,
            f.useMemo)((function() {
                return t ? p().cloneElement(t, wu(wu({}, t.props), {
                    parentAnalyticsContext: e
                })) : null
            }
            ), [t, e])
        }, Eu = function() {
            return Eu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Eu.apply(this, arguments)
        }, Pu = function(e, t, n, r) {
            return (0,
            f.useMemo)((function() {
                return p().Children.map(r, (function(r, o) {
                    if (!p().isValidElement(r))
                        return ru(Bs.CollectionComponentChildNotReactElement, t.componentType + " with config " + JSON.stringify(t) + " has child " + JSON.stringify(r) + " that is not a valid React element", n.pageContext),
                        r;
                    var i = t.componentType + "-child-" + o;
                    return p().cloneElement(r, Eu(Eu({}, r.props), {
                        key: i,
                        parentAnalyticsContext: e
                    }))
                }
                ))
            }
            ), [r, e, t, n])
        }, Tu = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.componentConfig
              , o = e.items
              , i = e.collectionItemSize
              , a = e.itemTemplateKey
              , l = e.layoutOverrides
              , s = e.scrollThresholdFromEnd
              , u = e.onScrollToEnd
              , c = e.headerComponent
              , d = e.children
              , m = t.dependencies.tokens
              , v = hu(t, o, a)
              , h = (0,
            f.useRef)([])
              , g = (0,
            f.useState)(-1)
              , y = g[0]
              , b = g[1]
              , I = mu(n, r.componentType, y, v.length, t)
              , C = I.collectionAnalyticsContext
              , S = I.collectionAnalyticsDataRef
              , w = Su(r, v, h, S, t).onItemsImpressed
              , x = (0,
            f.useRef)(null);
            U(x, v.length, w);
            var E = (0,
            f.useCallback)((function(e, n, r) {
                var o, i, a, l, s, u = void 0 !== (null === (o = S.current) || void 0 === o ? void 0 : o.collectionPosition) && S.current.collectionPosition >= 0 ? S.current.collectionPosition - 1 : -1, c = null !== (i = Js(t.pageContext)) && void 0 !== i ? i : "";
                Ki({
                    distance: e,
                    scrollAreaSize: r,
                    startingPosition: n,
                    direction: Z.Horizontal,
                    gameSetTypeId: null !== (l = null === (a = S.current) || void 0 === a ? void 0 : a.collectionId) && void 0 !== l ? l : -1,
                    gameSetTargetId: void 0,
                    sortPosition: u,
                    currentPage: t.pageContext.pageName,
                    pageSession: Gs(null === (s = S.current) || void 0 === s ? void 0 : s[c], "")
                })
            }
            ), [S, t])
              , P = (0,
            f.useCallback)((function(e, n, o) {
                var i, a;
                if (!e)
                    return ru(Bs.CollectionCarouselMissingItem, "CollectionCarousel with config " + JSON.stringify(r) + " trying to render item " + JSON.stringify(e) + " that is missing", t.pageContext),
                    p().createElement(p().Fragment, null);
                var l = Gs(null === (i = e.analyticsData) || void 0 === i ? void 0 : i.componentType, "") || e.componentType;
                if (!l)
                    return ru(Bs.CollectionCarouselItemMissingComponentType, "CollectionCarousel with config " + JSON.stringify(r) + " is missing item component type on item config " + JSON.stringify(e), t.pageContext),
                    p().createElement(p().Fragment, null);
                var s = {
                    itemPosition: n + 1,
                    itemComponentType: l,
                    componentType: l
                };
                return h.current[n] = cu(null !== (a = e.analyticsData) && void 0 !== a ? a : {}, {}, s, t),
                p().createElement(sd, {
                    componentConfig: e,
                    parentAnalyticsContext: C,
                    sduiContext: t,
                    localAnalyticsData: s,
                    extraLocalProps: {
                        isOnScreen: o
                    }
                })
            }
            ), [t, r, C])
              , T = xu(C, c)
              , k = Pu(C, r, t, d);
            return p().createElement("div", null, p().createElement(Xo, {
                itemsContainerRef: x,
                items: v,
                renderItem: P,
                collectionItemSize: null != i ? i : _o.Small,
                updateItemsPerRow: b,
                headerComponent: T,
                layoutOverrides: l,
                gapBetweenHeaderAndItems: m.Gap.Large,
                isHorizontalScrollEnabled: !0,
                scrollArrowBackgroundColor: m.Color.Surface.Surface_100,
                scrollArrowBoxShadowColor: m.Color.Common.Shadow,
                thresholdFromEnd: s,
                onReachedThresholdFromEnd: u,
                reportHorizontalScrollTelemetry: E
            }), k)
        }, ku = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.componentConfig
              , o = e.items
              , i = e.collectionItemSize
              , a = e.itemTemplateKey
              , l = e.layoutOverrides
              , s = e.headerComponent
              , u = e.children
              , c = t.dependencies.tokens
              , d = hu(t, o, a)
              , m = (0,
            f.useRef)([])
              , v = (0,
            f.useState)(-1)
              , h = v[0]
              , g = v[1]
              , y = mu(n, r.componentType, h, d.length, t)
              , b = y.collectionAnalyticsContext
              , I = y.collectionAnalyticsDataRef
              , C = Su(r, d, m, I, t).onItemsImpressed
              , S = (0,
            f.useRef)(null);
            U(S, d.length, C);
            var w = (0,
            f.useCallback)((function(e, n) {
                var o, i;
                if (!e)
                    return ru(Bs.CollectionGridMissingItem, "CollectionGrid with config " + JSON.stringify(r) + " trying to render item " + JSON.stringify(e) + " that is missing", t.pageContext),
                    p().createElement(p().Fragment, null);
                var a = Gs(null === (o = e.analyticsData) || void 0 === o ? void 0 : o.componentType, "") || e.componentType;
                if (!a)
                    return ru(Bs.CollectionGridItemMissingComponentType, "CollectionGrid with config " + JSON.stringify(r) + " is missing item component type on item config " + JSON.stringify(e), t.pageContext),
                    p().createElement(p().Fragment, null);
                var l = {
                    itemPosition: n + 1,
                    itemComponentType: a,
                    componentType: a
                };
                return m.current[n] = cu(null !== (i = e.analyticsData) && void 0 !== i ? i : {}, {}, l, t),
                p().createElement(sd, {
                    componentConfig: e,
                    parentAnalyticsContext: b,
                    sduiContext: t,
                    localAnalyticsData: l
                })
            }
            ), [t, r, b])
              , x = xu(b, s)
              , E = Pu(b, r, t, u);
            return p().createElement("div", null, p().createElement(Zo, {
                itemsContainerRef: S,
                items: d,
                renderItem: w,
                collectionItemSize: null != i ? i : _o.Small,
                updateItemsPerRow: g,
                headerComponent: x,
                layoutOverrides: l,
                gapBetweenHeaderAndItems: c.Gap.Large
            }), E)
        }, Nu = function(e) {
            var t = e.sduiContext
              , n = e.isFocused
              , r = e.isHovered
              , o = e.image
              , i = e.imageComponent
              , a = e.imageAspectRatio
              , l = e.thumbnailOverlayComponent
              , s = e.onActivated
              , u = e.titleText
              , c = e.titleColor
              , d = e.titleFont
              , f = e.titleLines
              , m = e.titleComponent
              , v = e.isContained
              , h = e.containmentPadding
              , g = e.cornerRadius
              , y = e.footerComponent
              , b = e.ctaButtonComponent
              , I = e.isOnScreen
              , C = t.dependencies.tokens;
            return p().createElement(_i, {
                isFocused: null != n && n || null != r && r,
                imageComponent: null != i ? i : o,
                imageAspectRatio: null != a ? a : 1,
                thumbnailOverlayComponent: l,
                onActivated: null == s ? void 0 : s.onActivated,
                linkPath: null == s ? void 0 : s.linkPath,
                isContained: null != v && v,
                containmentBackgroundColor: C.Color.Surface.Surface_100,
                containmentPadding: null != h ? h : C.Padding.Small,
                cornerRadius: null != g ? g : C.Radius.Medium,
                titleText: u,
                titleColor: null != c ? c : C.Color.Content.Emphasis,
                titleFont: null != d ? d : C.Typography.TitleMedium,
                titleLines: null != f ? f : 1,
                titleComponent: m,
                footerComponent: y,
                ctaButtonComponent: b,
                isOnScreen: null != I && I,
                placeholderImageBackgroundColor: C.Color.Surface.Surface_300
            })
        };
        !function(e) {
            e.AfAd = "af_ad",
            e.AfAdId = "af_ad_id",
            e.AfAdset = "af_adset",
            e.AfAdsetId = "af_adset_id",
            e.AfChannel = "af_channel",
            e.AfCid = "af_c_id",
            e.AfSub1 = "af_sub1",
            e.AfSub2 = "af_sub2",
            e.AfSub4 = "af_sub4",
            e.C = "c",
            e.Pid = "pid",
            e.Gclid = "gclid",
            e.Fbclid = "fbclid"
        }(Qs || (Qs = {}));
        var Au, Ou, _u = ((Zs = {})[Qs.AfAd] = ["utm_adname", "af_ad"],
        Zs[Qs.AfAdId] = ["utm_adid", "af_ad_id"],
        Zs[Qs.AfAdset] = ["utm_adset", "af_adset"],
        Zs[Qs.AfAdsetId] = ["utm_adsetid", "af_adset_id"],
        Zs[Qs.AfChannel] = ["utm_channel", "af_channel"],
        Zs[Qs.AfCid] = ["utm_id", "af_c_id"],
        Zs[Qs.AfSub1] = ["gclid", "af_sub1"],
        Zs[Qs.Gclid] = ["gclid", "gclid"],
        Zs[Qs.AfSub2] = ["fbclid", "af_sub2"],
        Zs[Qs.Fbclid] = ["fbclid", "fbclid"],
        Zs[Qs.C] = ["utm_campaign", "c"],
        Zs[Qs.Pid] = ["utm_source", "pid"],
        Zs[Qs.AfSub4] = ["utm_control_test", "af_sub4"],
        Zs), Mu = function(e) {
            void 0 === e && (e = window.location);
            var t = Ae(e.search);
            return t ? Object.entries(_u).reduce((function(e, n) {
                var r = n[0]
                  , o = n[1].find((function(e) {
                    return void 0 !== t[e] && null !== t[e]
                }
                ));
                return !o || "string" != typeof t[o] && "number" != typeof t[o] || (e[r] = t[o]),
                e
            }
            ), {}) : {}
        }, Ru = function() {
            return Ru = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ru.apply(this, arguments)
        }, Lu = function(e, t) {
            var n, r, o, i, a, l, s, u, c = Hs($s("adFlag", e, !1), !1, t.pageContext), d = Gs($s("adId", e, ""), ""), f = Gs($s("heroUnitId", e, ""), ""), p = zs($s("itemPosition", e, -1), -1), m = e.getCollectionData ? e.getCollectionData() : void 0, v = null !== (a = null == m ? void 0 : m.collectionPosition) && void 0 !== a ? a : zs($s("collectionPosition", e, -1), -1), h = null !== (l = null == m ? void 0 : m.totalNumberOfItems) && void 0 !== l ? l : zs($s("totalNumberOfItems", e, -1), -1), g = null !== (s = null == m ? void 0 : m.collectionId) && void 0 !== s ? s : zs($s("collectionId", e, -1), -1), y = Gs($s(null !== (u = Js(t.pageContext)) && void 0 !== u ? u : "", e, ""), "");
            return Ru(Ru(Ru(Ru(((n = {})[K.IsAd] = c,
            n), "" !== d && ((r = {})[K.NativeAdData] = d,
            r)), "" !== f && ((o = {})[K.HeroUnitId] = f,
            o)), ((i = {})[K.Position] = p,
            i[K.SortPos] = v,
            i[K.NumberOfLoadedTiles] = h,
            i[K.GameSetTypeId] = g,
            i[K.Page] = t.pageContext.pageName,
            i)), qs(y, t))
        }, Du = function(e, t, n) {
            var r, o = null === (r = e.actionParams) || void 0 === r ? void 0 : r.placeId, i = zs(o, -1);
            if (i && -1 !== i) {
                var a = function(e, t, n) {
                    var r, o, i, a, l = Vs(null !== (o = e.actionParams) && void 0 !== o ? o : {}, n.pageContext), s = zs(null !== (i = l.placeId) && void 0 !== i ? i : $s("placeId", t, -1), -1), u = zs(null !== (a = l.universeId) && void 0 !== a ? a : $s("universeId", t, -1), -1), c = Lu(t, n), d = Mu();
                    return Ru(Ru(Ru({}, c), d), ((r = {})[K.PlaceId] = s,
                    r[K.UniverseId] = u,
                    r))
                }(e, t, n);
                return {
                    callback: void 0,
                    linkPath: ne(i, "", a)
                }
            }
            return ru(Bs.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(o) + " to open game details", n.pageContext),
            {
                callback: void 0,
                linkPath: void 0
            }
        }, Fu = function() {
            return Fu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Fu.apply(this, arguments)
        }, Uu = function(e, t, n) {
            var r, o, i = null === (r = e.actionParams) || void 0 === r ? void 0 : r.collectionName, a = Gs(i, "");
            if (!a)
                return ru(Bs.SduiActionOpenSeeAllInvalidCollectionName, "Invalid collection name " + JSON.stringify(i) + " to open see all", n.pageContext),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            var l = null === (o = e.actionParams) || void 0 === o ? void 0 : o.collectionId
              , s = zs(l, -1);
            if (!s || -1 === s)
                return ru(Bs.SduiActionOpenSeeAllInvalidCollectionId, "Invalid collection id " + JSON.stringify(l) + " to open see all", n.pageContext),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            var u = function(e, t, n) {
                var r, o, i = zs($s("collectionPosition", e, -1), -1), a = Gs($s(null !== (o = Js(n.pageContext)) && void 0 !== o ? o : "", e, ""), "");
                return Fu(((r = {})[K.Position] = i,
                r[K.SortId] = t,
                r[K.GameSetTypeId] = t,
                r[K.Page] = n.pageContext.pageName,
                r), qs(a, n))
            }(t, s, n);
            return {
                callback: void 0,
                linkPath: oe(a, u[K.Page], u)
            }
        }, Bu = function(e, t, n) {
            var r = (b.NavigationService || {}).getSignupUrl;
            if (!r) {
                var o = v.urlService.getAbsoluteUrl("/account/signupredir");
                return ru(Bs.SduiActionOpenSignupInvalidGetSignupUrl, "getSignupUrl is not defined", n.pageContext),
                {
                    linkPath: o
                }
            }
            return {
                linkPath: r()
            }
        };
        !function(e) {
            e.OpenGameDetails = "OpenGameDetails",
            e.OpenSeeAll = "OpenSeeAll",
            e.PlayButtonClick = "PlayButtonClick",
            e.OpenSignup = "OpenSignup",
            e.OpenJoinFriends = "OpenJoinFriends"
        }(Ou || (Ou = {}));
        var ju, Gu, zu, Hu = function() {
            return {
                callback: void 0,
                linkPath: void 0
            }
        }, Wu = ((Au = {})[Ou.OpenGameDetails] = Du,
        Au[Ou.OpenSeeAll] = Uu,
        Au[Ou.OpenSignup] = Bu,
        Au[Ou.PlayButtonClick] = Hu,
        Au[Ou.OpenJoinFriends] = Hu,
        Au), Vu = function(e) {
            var t = e.assetId
              , n = e.sduiContext
              , r = (0,
            f.useState)("")
              , o = r[0]
              , i = r[1]
              , a = (0,
            f.useState)(!0)
              , l = a[0]
              , s = a[1];
            return (0,
            f.useEffect)((function() {
                s(!0),
                Ft(t).then((function(e) {
                    var t, n;
                    i(null !== (n = null === (t = null == e ? void 0 : e.locations[0]) || void 0 === t ? void 0 : t.location) && void 0 !== n ? n : "")
                }
                )).catch((function() {
                    i("")
                }
                )).finally((function() {
                    s(!1)
                }
                ))
            }
            ), [t]),
            l ? p().createElement(Yt.Loading, null) : o ? p().createElement("img", {
                src: o,
                alt: "asset"
            }) : (ru(Bs.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t, n.pageContext),
            p().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }, Ju = function(e) {
            var t = e.thumbnailType
              , n = e.targetId
              , r = e.format
              , o = e.size;
            return p().createElement(Zt.Thumbnail2d, {
                containerClass: "sdui-thumbnail-image-container",
                type: t,
                targetId: n,
                format: r,
                size: o
            })
        };
        !function(e) {
            e.imageQualityLevel = "imageQualityLevel",
            e.maxScreenWidth = "maxScreenWidth",
            e.minScreenWidth = "minScreenWidth"
        }(ju || (ju = {})),
        function(e) {
            e.friendInGame = "friendInGame"
        }(Gu || (Gu = {})),
        function(e) {
            e.RbxAsset = "rbxassetid",
            e.RbxThumb = "rbxthumb"
        }(zu || (zu = {}));
        var qu, Ku = function() {
            return Ku = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ku.apply(this, arguments)
        }, $u = {
            startColor: "#000000",
            endColor: "#000000",
            startTransparency: 0,
            endTransparency: 1,
            degree: 270
        }, Xu = function(e, t, n) {
            var r, o;
            if (void 0 !== e && (i = null === (o = null === (r = null == e ? void 0 : e.feed) || void 0 === r ? void 0 : r.props) || void 0 === o ? void 0 : o.feedItems,
            Array.isArray(i) && i.every((function(e) {
                return "object" == typeof e && null !== e
            }
            )))) {
                var i, a = e.feed.props.feedItems, l = a.find((function(e) {
                    return e.feedItemKey === t
                }
                ));
                if (l)
                    return l;
                ru(Bs.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(a) + " missing matching feed item with key " + t, n.pageContext)
            } else
                ru(Bs.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e), n.pageContext)
        }, Yu = function(e) {
            if (e && "object" == typeof e) {
                var t = e;
                if (t.componentType && qc(t.componentType))
                    return !0
            }
            return !1
        }, Zu = function(e, t, n) {
            if (!function(e) {
                if (e && "object" == typeof e) {
                    var t = e;
                    if (t.actionType && t.actionParams && Wu[t.actionType])
                        return !0
                }
                return !1
            }(e))
                return ru(Bs.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(e) + " to parse callback", n.pageContext),
                {
                    onActivated: function() {},
                    linkPath: void 0
                };
            var r = (0,
            Wu[e.actionType])(e, t, n);
            return {
                onActivated: function() {
                    return function(e, t, n, r) {
                        var o = n.logAction;
                        o ? o(t, n) : fu(t, n, r, null),
                        e.callback && e.callback()
                    }(r, e, t, n)
                },
                linkPath: r.linkPath
            }
        }, Qu = function(e, t, n) {
            if ("string" != typeof e)
                return ru(Bs.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string.", n.pageContext),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var r = e.split("//");
            if (2 === r.length && (e.includes(zu.RbxAsset) || e.includes(zu.RbxThumb))) {
                if (r[0].includes(zu.RbxAsset))
                    return {
                        assetType: zu.RbxAsset,
                        assetTarget: r[1]
                    };
                if (r[0].includes(zu.RbxThumb))
                    return {
                        assetType: zu.RbxThumb,
                        assetTarget: r[1]
                    }
            }
            return ru(Bs.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e, n.pageContext),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }, ec = ((qu = {})[Zt.ThumbnailTypes.gameIcon] = Object.values(Zt.ThumbnailGameIconSize),
        qu[Zt.ThumbnailTypes.gameThumbnail] = Object.values(Zt.ThumbnailGameThumbnailSize),
        qu[Zt.ThumbnailTypes.assetThumbnail] = Object.values(Zt.ThumbnailAssetsSize),
        qu[Zt.ThumbnailTypes.avatarHeadshot] = Object.values(Zt.ThumbnailAvatarHeadshotSize),
        qu), tc = function(e, t, n) {
            if ("string" != typeof e)
                return null;
            var r = Qu(e, 0, n)
              , o = r.assetType
              , i = r.assetTarget;
            if (o === zu.RbxAsset) {
                var a = i;
                return p().createElement(Vu, {
                    assetId: a,
                    sduiContext: n
                })
            }
            if (o === zu.RbxThumb) {
                var l = function(e) {
                    var t = e.split("&")
                      , n = {};
                    return t.forEach((function(e) {
                        var t = e.split("=")
                          , r = t[0]
                          , o = t[1];
                        n[r] = o
                    }
                    )),
                    {
                        thumbnailType: n.type,
                        id: n.id,
                        w: n.w,
                        h: n.h
                    }
                }(i)
                  , s = l.thumbnailType
                  , u = (a = l.id,
                l.w)
                  , c = l.h;
                if (void 0 !== a && void 0 !== s && void 0 !== u && void 0 !== c) {
                    var d = function(e, t, n) {
                        var r, o = t + "x" + n;
                        return null === (r = ec[e]) || void 0 === r ? void 0 : r.find((function(e) {
                            return e === o
                        }
                        ))
                    }(s, u, c);
                    return void 0 !== d ? p().createElement(Ju, {
                        thumbnailType: s,
                        targetId: a,
                        format: Zt.ThumbnailFormat.webp,
                        size: d
                    }) : (ru(Bs.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + u + "x" + c + " for type " + s, n.pageContext),
                    null)
                }
                return ru(Bs.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != s ? s : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != u ? u : "undefined") + ", or h " + (null != c ? c : "undefined") + " is invalid", n.pageContext),
                null
            }
            return ru(Bs.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported.", n.pageContext),
            null
        }, nc = function(e, t, n, r) {
            if (t)
                if ("string" == typeof e) {
                    for (var o = e.split("."), i = t, a = 0; a < o.length; ++a) {
                        var l = o[a];
                        if (null == i || "object" != typeof i || Array.isArray(i))
                            return void ru(Bs.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". Token path step " + l + " is invalid. Token is " + JSON.stringify(i), r.pageContext);
                        i = i[l]
                    }
                    if (null != i)
                        return i;
                    ru(Bs.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". The final token " + (i ? JSON.stringify(i) : "undefined") + " is invalid.", r.pageContext)
                } else
                    ru(Bs.SduiParseFoundationTokenInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation token. Input must be a string.", r.pageContext);
            else
                ru(Bs.SduiParseFoundationTokenMissingTokens, "Missing tokens in parseFoundationTokenHelper for input " + JSON.stringify(e), r.pageContext)
        }, rc = function(e) {
            return !(!e || "object" != typeof e)
        }, oc = function(e) {
            return "string" == typeof e && /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(e)
        }, ic = function(e) {
            return "string" == typeof e && /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*(?:\.\d+)?)\s*\)$/.test(e)
        }, ac = function(e, t, n) {
            if (oc(e) || ic(e))
                return e;
            var r = function(e, t, n) {
                var r = nc(e, n.dependencies.tokens, 0, n);
                if (void 0 !== r && "string" == typeof r)
                    return r;
                ru(Bs.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof r + ". Expected string.", n.pageContext)
            }(e, 0, n);
            if (r && (oc(r) || ic(r)))
                return r;
            ru(Bs.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof r + ". Expected color string.", n.pageContext)
        }, lc = function(e) {
            return "string" == typeof e && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }, sc = function(e) {
            return "string" == typeof e && /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }, uc = function(e, t, n) {
            if (lc(e))
                return e;
            if (sc(e))
                return "#" + e;
            if (oc(e) || ic(e))
                return function(e, t, n) {
                    if (oc(e) || ic(e)) {
                        var r = e.match(/\d+(?:\.\d+)?/g);
                        if (!(!r || r.length < 3 || r.length > 4)) {
                            var o = r.map(Number)
                              , i = o[0]
                              , a = o[1]
                              , l = o[2];
                            return "#" + i.toString(16).padStart(2, "0") + a.toString(16).padStart(2, "0") + l.toString(16).padStart(2, "0")
                        }
                        ru(Bs.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a valid rgb or rgba color.", n.pageContext)
                    } else
                        ru(Bs.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a rgb or rgba color.", n.pageContext)
                }(e, 0, n);
            var r = ac(e, 0, n);
            if (r)
                return uc(r, t, n);
            ru(Bs.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in parseColorValueToHex. Input must be a hex color or a foundation color token.", n.pageContext)
        }, cc = function(e) {
            if (e && "object" == typeof e) {
                var t = e;
                if (void 0 !== t.xScale && "number" == typeof t.xScale && void 0 !== t.xOffset && "number" == typeof t.xOffset && void 0 !== t.yScale && "number" == typeof t.yScale && void 0 !== t.yOffset && "number" == typeof t.yOffset)
                    return !0
            }
            return !1
        }, dc = function(e) {
            if (e && Array.isArray(e) && 4 === e.length) {
                var t = e.map(Number);
                return {
                    xScale: t[0],
                    xOffset: t[1],
                    yScale: t[2],
                    yOffset: t[3]
                }
            }
        }, fc = function(e) {
            if (e && "object" == typeof e) {
                var t = e;
                if (void 0 !== t.x && "number" == typeof t.x && void 0 !== t.y && "number" == typeof t.y)
                    return !0
            }
            return !1
        }, pc = function(e) {
            if (e && Array.isArray(e) && 2 === e.length) {
                var t = e.map(Number);
                return {
                    x: t[0],
                    y: t[1]
                }
            }
        }, mc = {
            "icons/status/games/rating_small": "icon-rating-16x16",
            "icons/status/games/people-playing_small": "icon-current-players-16x16",
            "icons/navigation/pushRight_small": "icon-push-right-16x16"
        }, vc = {
            parseUiComponent: function(e, t, n) {
                if (!e || "object" != typeof e)
                    return ru(Bs.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component", n.pageContext),
                    p().createElement(p().Fragment, null);
                var r = e;
                return p().createElement(sd, {
                    componentConfig: r,
                    parentAnalyticsContext: t,
                    sduiContext: n
                })
            },
            parseCallback: Zu,
            parseHeroUnitAsset: function(e, t, n) {
                if (!function(e) {
                    if ("object" == typeof e) {
                        var t = e;
                        if (t.image && t.title && t.subtitle)
                            return !0
                    }
                    return !1
                }(e))
                    return {
                        image: p().createElement(p().Fragment, null),
                        title: "Hero Unit Asset Title",
                        subtitle: "Hero Unit Asset Subtitle"
                    };
                var r = tc(e.image, 0, n);
                return Ku(Ku({}, e), {
                    image: r
                })
            },
            parseAssetUrl: Qu,
            parseAssetUrlIntoComponent: tc,
            parseGradient: function(e, t, n) {
                var r, o, i, a = function(e) {
                    if (!e || "object" != typeof e)
                        return !1;
                    var t = e;
                    return !(!t.startColor || "string" != typeof t.startColor || !t.endColor || "string" != typeof t.endColor || void 0 === t.startOpacity || "number" != typeof t.startOpacity || void 0 === t.endOpacity || "number" != typeof t.endOpacity || void 0 === t.degree || "number" != typeof t.degree)
                }(e), l = function(e) {
                    if (!e || "object" != typeof e)
                        return !1;
                    var t = e;
                    return !(!t.startColor || "string" != typeof t.startColor || !t.endColor || "string" != typeof t.endColor || void 0 === t.startTransparency || "number" != typeof t.startTransparency || t.startTransparency < 0 || t.startTransparency > 1 || void 0 === t.endTransparency || "number" != typeof t.endTransparency || t.endTransparency < 0 || t.endTransparency > 1 || void 0 === t.degree || "number" != typeof t.degree || void 0 !== t.widthPercent && ("number" != typeof t.widthPercent || t.widthPercent < 0 || t.widthPercent > 1) || void 0 !== t.heightPercent && ("number" != typeof t.heightPercent || t.heightPercent < 0 || t.heightPercent > 1) || void 0 !== t.midpointPercent && ("number" != typeof t.midpointPercent || t.midpointPercent < 0 || t.midpointPercent > 1))
                }(e);
                return a || l ? (i = a ? {
                    startColor: e.startColor,
                    endColor: e.endColor,
                    startTransparency: e.startOpacity,
                    endTransparency: e.endOpacity,
                    degree: e.degree
                } : e,
                Ku(Ku({}, i), {
                    startColor: null !== (r = uc(i.startColor, t, n)) && void 0 !== r ? r : $u.startColor,
                    endColor: null !== (o = uc(i.endColor, t, n)) && void 0 !== o ? o : $u.endColor
                })) : (ru(Bs.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e), n.pageContext),
                $u)
            },
            parseFoundationNumberToken: function(e, t, n) {
                if ("number" == typeof e)
                    return e;
                var r = nc(e, n.dependencies.tokens, 0, n);
                if (void 0 !== r && "number" == typeof r)
                    return r;
                ru(Bs.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof r + " for token " + JSON.stringify(r) + " with input " + JSON.stringify(e) + ". Expected number.", n.pageContext)
            },
            parseFoundationTypographyToken: function(e, t, n) {
                if (rc(e))
                    return e;
                var r = nc(e, n.dependencies.tokens, 0, n);
                if (void 0 !== r && rc(r))
                    return r;
                ru(Bs.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof r + ". Expected TypographyToken.", n.pageContext)
            },
            parseColorValue: function(e, t, n) {
                if (lc(e))
                    return e;
                if (sc(e))
                    return "#" + e;
                var r = ac(e, 0, n);
                if (r)
                    return r;
                ru(Bs.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value. Input must be a hex color or a foundation color token.", n.pageContext)
            },
            parseUDim2: function(e, t, n) {
                if (cc(e))
                    return e;
                var r = dc(e);
                if (cc(r))
                    return r;
                if (e && "string" == typeof e) {
                    var o = e.split(",")
                      , i = dc(o);
                    if (cc(i))
                        return i;
                    ru(Bs.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string with 4 comma-separated values.", n.pageContext)
                } else
                    ru(Bs.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string.", n.pageContext)
            },
            parseVector2: function(e, t, n) {
                if (fc(e))
                    return e;
                var r = pc(e);
                if (fc(r))
                    return r;
                if (e && "string" == typeof e) {
                    var o = e.split(",")
                      , i = pc(o);
                    if (fc(i))
                        return i;
                    ru(Bs.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string with 2 comma-separated values.", n.pageContext)
                } else
                    ru(Bs.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string.", n.pageContext)
            },
            parseAutomaticSize: function(e, t, n) {
                if (e && "string" == typeof e)
                    switch (e) {
                    case mo.X:
                        return mo.X;
                    case mo.Y:
                        return mo.Y;
                    case mo.XY:
                        return mo.XY;
                    case mo.None:
                        return mo.None;
                    default:
                        return void ru(Bs.SduiParseAutomaticSizeInvalidInput, "Invalid automatic size " + JSON.stringify(e) + ". Expected one of " + Object.values(mo).join(", ") + ".", n.pageContext)
                    }
                else
                    ru(Bs.SduiParseAutomaticSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for automatic size. Input must be a string.", n.pageContext)
            },
            parseIcon: function(e, t, n) {
                if ("string" == typeof e) {
                    if (mc[e])
                        return Ct()("sdui-icon", mc[e]);
                    ru(Bs.SduiParseIconInvalidInput, "Invalid icon " + JSON.stringify(e) + ". Expected one of " + Object.keys(mc).join(", ") + ".", n.pageContext)
                } else
                    ru(Bs.SduiParseIconInvalidInput, "Invalid input " + JSON.stringify(e) + " for icon. Input must be a string.", n.pageContext)
            },
            parseFoundationButtonSize: function(e, t, n) {
                if ("string" == typeof e && rt.includes(e))
                    return e;
                ru(Bs.SduiParseFoundationButtonSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation button size. Input must be a valid string and button size.", n.pageContext)
            },
            parseFoundationButtonVariant: function(e, t, n) {
                if ("string" == typeof e && nt.includes(e))
                    return e;
                ru(Bs.SduiParseFoundationButtonVariantInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation button variant. Input must be a valid string and button variant.", n.pageContext)
            }
        }, hc = function(e) {
            var t = e.sduiContext
              , n = e.onActivated
              , r = e.textColor
              , o = e.fontStyle
              , i = e.textIconGap
              , a = e.sectionGap
              , l = e.leftText
              , s = e.leftIcon
              , u = e.leftIconComponent
              , c = e.rightText
              , d = e.rightIcon
              , f = e.rightIconComponent
              , m = t.dependencies.tokens;
            return p().createElement(Ri, {
                onActivated: null == n ? void 0 : n.onActivated,
                linkPath: null == n ? void 0 : n.linkPath,
                textColor: null != r ? r : m.Color.Content.Default,
                fontStyle: null != o ? o : m.Typography.BodyMedium,
                textIconGap: null != i ? i : m.Gap.XSmall,
                sectionGap: null != a ? a : m.Gap.Small,
                iconWidth: 16,
                leftText: null != l ? l : "",
                leftIcon: s,
                leftIconComponent: u,
                rightText: c,
                rightIcon: d,
                rightIconComponent: f
            })
        }, gc = function(e) {
            var t = e.friendsInGame
              , n = e.onHide
              , r = e.placeId
              , o = e.sduiContext
              , i = (0,
            f.useState)(void 0)
              , a = i[0]
              , l = i[1];
            (0,
            f.useEffect)((function() {
                Dt(r.toString()).then((function(e) {
                    l(e)
                }
                )).catch((function(e) {
                    l(void 0),
                    ru(Bs.ActiveFriendsFooterPlaceDetailsFetchError, "Error fetching place details for active friends footer with placeId " + r + ", error message is: " + JSON.stringify(e), o.pageContext)
                }
                ))
            }
            ), [r, o.pageContext]);
            var s = (0,
            f.useMemo)((function() {
                return t.map((function(e) {
                    return {
                        id: e.userId,
                        displayName: e.displayName,
                        presence: e.presence
                    }
                }
                ))
            }
            ), [t]);
            return a ? p().createElement(tr, {
                friendsDataInGame: s,
                show: !0,
                onHide: n,
                game: a
            }) : p().createElement(p().Fragment, null)
        }, yc = function(e) {
            var t, n, r = e.sduiContext, o = e.analyticsContext, i = e.universeId, a = e.maxAvatars, l = e.iconWidth, s = e.onActivated, u = r.dependencies.tokens, c = null != a ? a : 3, d = null != l ? l : u.Size.Size_400, m = (0,
            f.useMemo)((function() {
                var e;
                return (null !== (e = r.dataStore.social.inGameFriendsByUniverseId[i]) && void 0 !== e ? e : []).slice(0, c)
            }
            ), [r.dataStore.social.inGameFriendsByUniverseId, i, c]), v = (0,
            f.useMemo)((function() {
                return m.map((function(e) {
                    return e.displayName
                }
                )).join(", ")
            }
            ), [m]), h = (0,
            f.useState)(!1), g = h[0], y = h[1], b = null === (n = null === (t = m[0]) || void 0 === t ? void 0 : t.presence) || void 0 === n ? void 0 : n.placeId, I = (0,
            f.useCallback)((function() {
                var e = {
                    actionType: Ou.OpenJoinFriends,
                    actionParams: {
                        placeId: b,
                        universeId: i
                    }
                };
                Zu(e, o, r).onActivated()
            }
            ), [b, i, o, r]), C = (0,
            f.useMemo)((function() {
                return s || (b ? {
                    onActivated: function() {
                        y(!0),
                        I()
                    }
                } : void 0)
            }
            ), [s, b, I]), S = (0,
            f.useCallback)((function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                y(!1)
            }
            ), []), w = (0,
            f.useMemo)((function() {
                var e = m.map((function(e) {
                    return p().createElement(Ju, {
                        key: e.userId,
                        thumbnailType: Zt.ThumbnailTypes.avatarHeadshot,
                        targetId: e.userId.toString(),
                        format: Zt.ThumbnailFormat.webp,
                        size: Zt.ThumbnailAvatarHeadshotSize.size48
                    })
                }
                ));
                return p().createElement(ti, {
                    avatarThumbnails: e,
                    iconWidth: d,
                    avatarContainerBackgroundColor: u.Color.Surface.Surface_200,
                    avatarImageBackgroundColor: u.Color.Extended.Gray.Gray_800,
                    avatarBorderColor: u.Color.System.Success
                })
            }
            ), [m, d, u]);
            return p().createElement(p().Fragment, null, p().createElement(hc, {
                componentConfig: {
                    componentType: Tc.TileFooter,
                    props: {}
                },
                sduiContext: r,
                analyticsContext: o,
                leftIconComponent: w,
                leftText: v,
                textIconGap: u.Gap.Small,
                onActivated: C
            }), b && g && p().createElement(gc, {
                friendsInGame: m,
                onHide: S,
                placeId: b,
                sduiContext: r
            }))
        }, bc = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , o = e.ratingText
              , i = e.playerCount
              , a = e.footerComponent
              , l = (t.dependencies.tokens,
            (0,
            f.useMemo)((function() {
                return !!(t.dataStore.social.inGameFriendsByUniverseId[r] && t.dataStore.social.inGameFriendsByUniverseId[r].length > 0)
            }
            ), [t.dataStore.social.inGameFriendsByUniverseId, r]))
              , s = (0,
            f.useMemo)((function() {
                if (null != i)
                    return Re(i)
            }
            ), [i]);
            return l ? p().createElement(yc, {
                componentConfig: {
                    componentType: Tc.GameTileActiveFriendsFooter,
                    props: {}
                },
                sduiContext: t,
                analyticsContext: n,
                universeId: r
            }) : o ? p().createElement(hc, {
                componentConfig: {
                    componentType: Tc.TileFooter,
                    props: {}
                },
                leftText: o,
                leftIcon: "sdui-icon icon-rating-16x16",
                rightText: s,
                rightIcon: s ? "sdui-icon icon-current-players-16x16" : void 0,
                sduiContext: t,
                analyticsContext: n
            }) : null != a ? a : null
        }, Ic = function() {
            return Ic = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Ic.apply(this, arguments)
        }, Cc = function(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                    t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
            }
            return n
        }, Sc = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , o = e.placeId
              , i = e.ratingText
              , a = e.playerCount
              , l = e.disableDefaultFooterLogic
              , s = e.onActivated
              , u = e.footerComponent
              , c = Cc(e, ["sduiContext", "analyticsContext", "universeId", "placeId", "ratingText", "playerCount", "disableDefaultFooterLogic", "onActivated", "footerComponent"])
              , d = (0,
            f.useMemo)((function() {
                if (s)
                    return s;
                var e = {
                    actionType: Ou.OpenGameDetails,
                    actionParams: {
                        placeId: o,
                        universeId: r
                    }
                };
                return Zu(e, n, t)
            }
            ), [s, o, r, n, t])
              , m = (0,
            f.useMemo)((function() {
                return l ? u : p().createElement(bc, {
                    universeId: r,
                    footerComponent: u,
                    ratingText: i,
                    playerCount: a,
                    sduiContext: t,
                    analyticsContext: n
                })
            }
            ), [l, u, r, i, a, t, n]);
            return p().createElement(Nu, Ic({}, c, {
                sduiContext: t,
                analyticsContext: n,
                onActivated: d,
                footerComponent: m
            }))
        }, wc = function() {
            return wc = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            wc.apply(this, arguments)
        }, xc = function(e) {
            var t = e.analyticsContext
              , n = e.sduiContext
              , r = e.universeId
              , o = e.placeId
              , i = e.width
              , a = e.playableText
              , l = e.hidePlayableIcon
              , s = b.PlayButton.usePlayabilityStatus
              , u = b.PlayButton.PlayabilityStatuses
              , c = b.PlayButton.PlayButton
              , d = s(r.toString())[0]
              , m = (0,
            f.useCallback)((function() {
                var e = {
                    actionType: Ou.PlayButtonClick,
                    actionParams: {}
                };
                Zu(e, t, n).onActivated()
            }
            ), [t, n])
              , v = (0,
            f.useMemo)((function() {
                var e, i, a = Lu(t, n);
                return wc(wc({}, a), ((e = {})[K.IsAd] = (null !== (i = a[K.IsAd]) && void 0 !== i && i).toString(),
                e[K.PlaceId] = zs(o, -1),
                e[K.UniverseId] = zs(r, -1),
                e[K.PlayContext] = n.pageContext.pageName,
                e))
            }
            ), [t, o, r, n]);
            return void 0 === d || d !== u.Playable ? p().createElement(p().Fragment, null) : p().createElement("div", {
                className: "sdui-play-button-container",
                "data-testid": "sdui-play-button-container",
                style: i ? {
                    width: i + "px"
                } : {}
            }, p().createElement(c, {
                universeId: r.toString(),
                placeId: o.toString(),
                eventProperties: v,
                status: d,
                disableLoadingState: !0,
                buttonText: a,
                hideIcon: l,
                analyticsCallback: m
            }))
        };
        xc.defaultProps = {
            width: void 0,
            playableText: void 0,
            hidePlayableIcon: void 0
        };
        var Ec, Pc, Tc, kc = xc, Nc = function(e) {
            var t = e.layoutOrder
              , n = e.anchorPoint
              , r = e.automaticSize
              , o = e.size
              , i = e.position
              , a = e.zIndex
              , l = e.onTitleActivated
              , s = e.titleText
              , u = e.titleColor
              , c = e.titleFontStyle
              , d = e.titleGap
              , m = e.titleIcon
              , v = e.titleIconWidth
              , h = e.titleComponent
              , g = e.onSubtitleActivated
              , y = e.subtitleText
              , b = e.subtitleColor
              , I = e.subtitleFontStyle
              , C = e.subtitleGap
              , S = e.subtitleIcon
              , w = e.subtitleIconWidth
              , x = e.subtitleComponent
              , E = e.verticalGap
              , P = e.infoText
              , T = e.onInfoIconActivated
              , k = e.iconComponent
              , N = e.sduiContext.dependencies.tokens
              , A = (0,
            f.useMemo)((function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }
            ), [t, n, r, o, i, a])
              , O = (0,
            f.useMemo)((function() {
                return k || (P ? p().createElement(To, {
                    callback: null == T ? void 0 : T.onActivated,
                    linkPath: null == T ? void 0 : T.linkPath,
                    ariaLabel: P
                }, p().createElement(En, {
                    tooltipText: P,
                    placement: "left",
                    centerIcon: !0
                })) : void 0)
            }
            ), [k, P, T]);
            return p().createElement(yi, {
                onTitleActivated: null == l ? void 0 : l.onActivated,
                titleLinkPath: null == l ? void 0 : l.linkPath,
                titleText: s,
                titleTextColor: null != u ? u : N.Color.Content.Emphasis,
                titleFontStyle: null != c ? c : N.Typography.HeadingSmall,
                titleGap: null != d ? d : N.Gap.XXSmall,
                titleIconClassName: m,
                titleIconWidth: null != v ? v : N.Size.Size_600,
                titleComponent: h,
                onSubtitleActivated: null == g ? void 0 : g.onActivated,
                subtitleLinkPath: null == g ? void 0 : g.linkPath,
                subtitleText: y,
                subtitleTextColor: null != b ? b : N.Color.Content.Default,
                subtitleFontStyle: null != I ? I : N.Typography.BodyMedium,
                subtitleGap: null != C ? C : N.Gap.XXSmall,
                subtitleIconClassName: S,
                subtitleIconWidth: null != w ? w : N.Size.Size_400,
                subtitleComponent: x,
                verticalGap: null != E ? E : N.Gap.XXSmall,
                iconComponent: O,
                containerOverrides: A
            })
        }, Ac = function(e) {
            var t = e.layoutOrder
              , n = e.anchorPoint
              , r = e.automaticSize
              , o = e.size
              , i = e.position
              , a = e.zIndex
              , l = e.topLeftSlot
              , s = e.topMiddleSlot
              , u = e.topRightSlot
              , c = e.centerLeftSlot
              , d = e.centerMiddleSlot
              , m = e.centerRightSlot
              , v = e.bottomLeftSlot
              , h = e.bottomMiddleSlot
              , g = e.bottomRightSlot
              , y = e.padding
              , b = e.children
              , I = (0,
            f.useMemo)((function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }
            ), [t, n, r, o, i, a]);
            return p().createElement(wi, {
                topLeftSlot: l,
                topMiddleSlot: s,
                topRightSlot: u,
                centerLeftSlot: c,
                centerMiddleSlot: d,
                centerRightSlot: m,
                bottomLeftSlot: v,
                bottomMiddleSlot: h,
                bottomRightSlot: g,
                padding: y,
                containerOverrides: I
            }, b)
        }, Oc = function(e) {
            var t = e.layoutOrder
              , n = e.anchorPoint
              , r = e.automaticSize
              , o = e.size
              , i = e.position
              , a = e.zIndex
              , l = e.onActivated
              , s = e.text
              , u = e.textColor
              , c = e.fontStyle
              , d = e.gap
              , m = e.icon
              , v = e.iconWidth
              , h = e.iconColor
              , g = e.iconFirst
              , y = e.textOverrides
              , b = e.iconOverrides
              , I = e.sduiContext.dependencies.tokens
              , C = (0,
            f.useMemo)((function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }
            ), [t, n, r, o, i, a]);
            return p().createElement(Uo, {
                onActivated: null == l ? void 0 : l.onActivated,
                linkPath: null == l ? void 0 : l.linkPath,
                text: s,
                textColor: null != u ? u : I.Color.Content.Emphasis,
                fontStyle: null != c ? c : I.Typography.HeadingSmall,
                gap: d,
                iconClassName: m,
                iconWidth: v,
                iconColor: h,
                iconFirst: g,
                containerOverrides: C,
                textOverrides: y,
                iconOverrides: b
            })
        }, _c = function(e) {
            var t = e.componentConfig
              , n = e.analyticsContext
              , r = e.sduiContext
              , o = e.item
              , i = e.children
              , a = (0,
            f.useRef)([])
              , l = hu(r, o ? [o] : [], void 0)
              , s = l.length > 0 ? l[0] : void 0
              , u = mu(n, t.componentType, 1, 1, r)
              , c = u.collectionAnalyticsContext
              , d = u.collectionAnalyticsDataRef
              , m = Su(t, l, a, d, r).onItemsImpressed
              , v = (0,
            f.useRef)(null);
            U(v, 1, m);
            var h = (0,
            f.useMemo)((function() {
                var e, n;
                if (!s)
                    return ru(Bs.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(s) + " with config " + JSON.stringify(t), r.pageContext),
                    p().createElement(p().Fragment, null);
                var o = Gs(null === (e = s.analyticsData) || void 0 === e ? void 0 : e.componentType, "") || s.componentType;
                if (!o)
                    return ru(Bs.SingleItemCollectionItemMissingItemComponentType, "SingleItemCollection missing item component type " + JSON.stringify(s), r.pageContext),
                    p().createElement(p().Fragment, null);
                var i = {
                    itemPosition: 1,
                    itemComponentType: o,
                    componentType: o
                };
                return a.current[0] = cu(null !== (n = s.analyticsData) && void 0 !== n ? n : {}, {}, i, r),
                p().createElement(sd, {
                    componentConfig: s,
                    parentAnalyticsContext: c,
                    sduiContext: r,
                    localAnalyticsData: i
                })
            }
            ), [s, t, c, r])
              , g = Pu(c, t, r, i);
            return p().createElement("div", {
                ref: v
            }, h, g)
        }, Mc = function() {
            return Mc = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Mc.apply(this, arguments)
        }, Rc = function(e, t, n, r, o) {
            var i = Jc[e]
              , a = Mc({}, t)
              , l = null != o ? o : null == i ? void 0 : i.propParsers;
            return l && Object.keys(t).forEach((function(o) {
                var i, s = t[o], u = l[o];
                if (void 0 !== s && u)
                    if ("function" == typeof u) {
                        var c = u(s, n, r);
                        void 0 !== c ? a[o] = c : ru(Bs.PropParseFailure, "Failed to parse prop " + o + " with value " + JSON.stringify(s) + " for component " + e, r.pageContext)
                    } else
                        "object" == typeof u ? "object" == typeof (i = s) && null !== i && Object.keys(i).every((function(e) {
                            return "string" == typeof e
                        }
                        )) ? a[o] = Rc(e, s, n, r, u) : ru(Bs.NestedPropParseFailure, "Expected a nested object for prop " + o + " with value " + JSON.stringify(s) + " using for component " + e, r.pageContext) : ru(Bs.PropParserNotFound, "Prop parser not found for prop " + o + " and component " + e, r.pageContext)
            }
            )),
            a
        }, Lc = function() {
            return Lc = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Lc.apply(this, arguments)
        }, Dc = function(e, t, n, r, o, i, a) {
            if (!Yu(e))
                return ru(Bs.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children", n.pageContext),
                {
                    props: {},
                    children: null
                };
            var l = e.componentType
              , s = function(e, t, n) {
                var r = e.analyticsData
                  , o = Lc(Lc({}, r), null != n ? n : {})
                  , i = t.logAction
                  , a = t.getCollectionData;
                return {
                    analyticsData: o,
                    ancestorAnalyticsData: Lc(Lc({}, t.ancestorAnalyticsData), t.analyticsData),
                    logAction: i,
                    getCollectionData: a
                }
            }(e, t, r)
              , u = Lc(Lc(Lc(Lc(Lc({}, e.props), {
                componentConfig: e,
                sduiContext: n,
                analyticsContext: s
            }), o), i), a)
              , c = Rc(l, u, s, n)
              , d = function(e, t, n) {
                return e.children ? e.children.map((function(e, r) {
                    var o, i = (null !== (o = e.componentType) && void 0 !== o ? o : "undefined") + "-" + r;
                    return p().createElement(sd, {
                        key: i,
                        componentConfig: e,
                        parentAnalyticsContext: t,
                        sduiContext: n
                    })
                }
                )) : null
            }(e, s, n);
            return {
                props: c,
                children: d
            }
        }, Fc = function(e) {
            var t = p().memo((function(t) {
                return (0,
                f.useMemo)((function() {
                    var n = Dc(t.componentConfig, t.parentAnalyticsContext, t.sduiContext, t.localAnalyticsData, t.extraLocalProps, t.responsivePropOverrides, t.conditionalPropOverrides)
                      , r = n.props
                      , o = n.children;
                    return p().createElement(e, r, o)
                }
                ), [t.componentConfig, t.parentAnalyticsContext, t.sduiContext, t.localAnalyticsData, t.extraLocalProps, t.responsivePropOverrides, t.conditionalPropOverrides])
            }
            ));
            return t.displayName = "SduiWrapped" + (e.displayName || e.name),
            t
        }, Uc = function(e) {
            var t = e.size
              , n = e.variant
              , r = e.text
              , o = e.onActivated
              , i = null != t ? t : "Medium"
              , a = null != n ? n : "Emphasis"
              , l = function() {
                (null == o ? void 0 : o.onActivated) && o.onActivated()
            };
            return (null == o ? void 0 : o.linkPath) ? p().createElement(st, {
                as: "a",
                altText: r,
                size: i,
                variant: a,
                href: o.linkPath,
                onClick: l
            }, r) : p().createElement(st, {
                as: "button",
                altText: r,
                size: i,
                variant: a,
                onClick: l
            }, r)
        }, Bc = (Ec = function(e, t) {
            return Ec = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            Ec(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Ec(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), jc = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.state = {
                    hasError: !1
                },
                n
            }
            return Bc(t, e),
            t.getDerivedStateFromError = function() {
                return {
                    hasError: !0
                }
            }
            ,
            t.prototype.componentDidCatch = function(e, t) {
                var n = e.message
                  , r = t.componentStack;
                (0,
                this.props.logError)(n, r)
            }
            ,
            t.prototype.render = function() {
                var e = this.state.hasError
                  , t = this.props
                  , n = t.fallback
                  , r = t.children;
                return e ? n : r
            }
            ,
            t
        }(p().Component), Gc = jc, zc = function(e) {
            var t = e.feedItems
              , n = e.analyticsContext
              , r = e.sduiContext
              , o = e.maxWidth
              , i = e.gapBetweenFeedItems
              , a = e.paddingLeft
              , l = e.paddingRight
              , s = r.dependencies.tokens
              , u = (0,
            f.useCallback)((function(e, t) {
                ru(Bs.SduiFeedItemBoundaryError, "Error rendering feed item with error message " + e + " and callstack " + t, r.pageContext)
            }
            ), [r.pageContext])
              , c = (0,
            f.useMemo)((function() {
                return t.map((function(e, t) {
                    var o;
                    return {
                        key: null !== (o = e.feedItemKey) && void 0 !== o ? o : t.toString(),
                        component: p().createElement(Gc, {
                            fallback: p().createElement(p().Fragment, null),
                            logError: u
                        }, p().createElement(sd, {
                            componentConfig: e,
                            parentAnalyticsContext: n,
                            sduiContext: r
                        }))
                    }
                }
                ))
            }
            ), [t, n, r, u]);
            return p().createElement(Di, {
                feedItems: c,
                maxWidth: o,
                gapBetweenFeedItems: null != i ? i : s.Gap.XXLarge,
                paddingLeft: a,
                paddingRight: l
            })
        }, Hc = function(e) {
            var t = e.sduiContext
              , n = e.title
              , r = e.titleFontStyle
              , o = e.subtitle
              , i = e.subtitleFontStyle
              , a = e.titleSubtitleGap
              , l = e.subtitleMaxLines
              , s = e.height
              , u = e.rightButtonContent
              , c = e.image
              , d = t.dependencies.tokens;
            return p().createElement(zo, {
                title: n,
                subtitle: o,
                textColor: d.Color.Content.Emphasis,
                titleFontStyle: null != r ? r : d.Typography.TitleMedium,
                subtitleFontStyle: null != i ? i : d.Typography.BodyMedium,
                titleSubtitleGap: a,
                subtitleMaxLines: l,
                rightButtonContent: u,
                imageComponent: c,
                height: s
            })
        }, Wc = function(e) {
            var t = e.layoutOrder
              , n = e.anchorPoint
              , r = e.automaticSize
              , o = e.size
              , i = e.position
              , a = e.zIndex
              , l = e.text
              , s = e.textColor
              , u = e.fontStyle
              , c = e.backgroundColor
              , d = e.backgroundTransparency
              , m = e.sduiContext.dependencies.tokens
              , v = (0,
            f.useMemo)((function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }
            ), [t, n, r, o, i, a]);
            return l ? p().createElement(ki, {
                text: l,
                textColor: null != s ? s : m.LightMode.Content.Emphasis,
                fontStyle: null != u ? u : m.Typography.LabelSmall,
                backgroundColor: null != c ? c : m.Color.Extended.White.White_100,
                backgroundTransparency: null != d ? d : 0,
                verticalPadding: m.Padding.XSmall,
                horizontalPadding: m.Padding.Small,
                containerOverrides: v
            }) : p().createElement(p().Fragment, null)
        }, Vc = function(e) {
            var t = e.text
              , n = e.textFontStyle
              , r = e.textColor
              , o = e.textLink
              , i = e.sduiContext.dependencies.tokens;
            return p().createElement(Ei, {
                text: t,
                textFontStyle: null != n ? n : i.Typography.BodyMedium,
                textColor: null != r ? r : i.Color.Content.Default,
                textLink: o
            })
        };
        !function(e) {
            e.SingleItemCollection = "SingleItemCollection",
            e.HeroUnit = "HeroUnit",
            e.HeroUnitBottomRow = "HeroUnitBottomRow",
            e.PlayButton = "PlayButton",
            e.TextIconRow = "TextIconRow",
            e.TileFooter = "TileFooter",
            e.GameTileActiveFriendsFooter = "GameTileActiveFriendsFooter",
            e.Tile = "Tile",
            e.GameTile = "GameTile",
            e.SectionHeader = "SectionHeader",
            e.SlotOverlay = "SlotOverlay",
            e.CollectionCarousel = "CollectionCarousel",
            e.CollectionGrid = "CollectionGrid",
            e.ImageWithGradient = "ImageWithGradient",
            e.Button = "Button",
            e.VerticalFeed = "VerticalFeed",
            e.Page = "Page",
            e.DetailsPageHeader = "DetailsPageHeader",
            e.AttributionRow = "AttributionRow",
            e.TextPill = "TextPill",
            e.Text = "Text"
        }(Tc || (Tc = {}));
        var Jc = ((Pc = {})[Tc.SingleItemCollection] = {
            component: Fc(_c),
            propParsers: {}
        },
        Pc[Tc.PlayButton] = {
            component: Fc(kc),
            propParsers: {}
        },
        Pc[Tc.HeroUnit] = {
            component: Fc(iu),
            propParsers: {
                backgroundComponent: vc.parseUiComponent,
                bottomRowComponent: vc.parseUiComponent,
                ctaButtonComponent: vc.parseUiComponent,
                headerComponent: vc.parseUiComponent,
                onActivated: vc.parseCallback,
                overlayComponent: vc.parseUiComponent,
                asset: vc.parseHeroUnitAsset,
                gradient: vc.parseGradient,
                foregroundImage: vc.parseAssetUrlIntoComponent,
                backgroundImage: vc.parseAssetUrlIntoComponent,
                titleImage: vc.parseAssetUrlIntoComponent
            }
        },
        Pc[Tc.HeroUnitBottomRow] = {
            component: Fc(au),
            propParsers: {
                ctaButton: vc.parseUiComponent,
                rightLabelContent: vc.parseUiComponent,
                anchorPoint: vc.parseVector2,
                automaticSize: vc.parseAutomaticSize,
                size: vc.parseUDim2,
                position: vc.parseUDim2
            }
        },
        Pc[Tc.TextIconRow] = {
            component: Fc(Oc),
            propParsers: {
                anchorPoint: vc.parseVector2,
                automaticSize: vc.parseAutomaticSize,
                size: vc.parseUDim2,
                position: vc.parseUDim2,
                onActivated: vc.parseCallback,
                textColor: vc.parseColorValue,
                fontStyle: vc.parseFoundationTypographyToken,
                gap: vc.parseFoundationNumberToken,
                icon: vc.parseIcon,
                iconWidth: vc.parseFoundationNumberToken,
                iconColor: vc.parseColorValue
            }
        },
        Pc[Tc.TileFooter] = {
            component: Fc(hc),
            propParsers: {
                onActivated: vc.parseCallback,
                textColor: vc.parseColorValue,
                fontStyle: vc.parseFoundationTypographyToken,
                textIconGap: vc.parseFoundationNumberToken,
                sectionGap: vc.parseFoundationNumberToken,
                leftIcon: vc.parseIcon,
                leftIconComponent: vc.parseUiComponent,
                rightIcon: vc.parseIcon,
                rightIconComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.GameTileActiveFriendsFooter] = {
            component: Fc(yc),
            propParsers: {
                iconWidth: vc.parseFoundationNumberToken,
                onActivated: vc.parseCallback
            }
        },
        Pc[Tc.Tile] = {
            component: Fc(Nu),
            propParsers: {
                image: vc.parseAssetUrlIntoComponent,
                imageComponent: vc.parseUiComponent,
                thumbnailOverlayComponent: vc.parseUiComponent,
                onActivated: vc.parseCallback,
                titleColor: vc.parseColorValue,
                titleFont: vc.parseFoundationTypographyToken,
                titleComponent: vc.parseUiComponent,
                containmentPadding: vc.parseFoundationNumberToken,
                cornerRadius: vc.parseFoundationNumberToken,
                footerComponent: vc.parseUiComponent,
                ctaButtonComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.GameTile] = {
            component: Fc(Sc),
            propParsers: {
                image: vc.parseAssetUrlIntoComponent,
                imageComponent: vc.parseUiComponent,
                thumbnailOverlayComponent: vc.parseUiComponent,
                onActivated: vc.parseCallback,
                titleColor: vc.parseColorValue,
                titleFont: vc.parseFoundationTypographyToken,
                titleComponent: vc.parseUiComponent,
                containmentPadding: vc.parseFoundationNumberToken,
                cornerRadius: vc.parseFoundationNumberToken,
                footerComponent: vc.parseUiComponent,
                ctaButtonComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.SectionHeader] = {
            component: Fc(Nc),
            propParsers: {
                anchorPoint: vc.parseVector2,
                automaticSize: vc.parseAutomaticSize,
                size: vc.parseUDim2,
                position: vc.parseUDim2,
                onTitleActivated: vc.parseCallback,
                titleColor: vc.parseColorValue,
                titleFontStyle: vc.parseFoundationTypographyToken,
                titleGap: vc.parseFoundationNumberToken,
                titleIcon: vc.parseIcon,
                titleIconWidth: vc.parseFoundationNumberToken,
                titleComponent: vc.parseUiComponent,
                onSubtitleActivated: vc.parseCallback,
                subtitleColor: vc.parseColorValue,
                subtitleFontStyle: vc.parseFoundationTypographyToken,
                subtitleGap: vc.parseFoundationNumberToken,
                subtitleIcon: vc.parseIcon,
                subtitleIconWidth: vc.parseFoundationNumberToken,
                subtitleComponent: vc.parseUiComponent,
                verticalGap: vc.parseFoundationNumberToken,
                onInfoIconActivated: vc.parseCallback,
                iconComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.SlotOverlay] = {
            component: Fc(Ac),
            propParsers: {
                anchorPoint: vc.parseVector2,
                automaticSize: vc.parseAutomaticSize,
                size: vc.parseUDim2,
                position: vc.parseUDim2,
                topLeftSlot: vc.parseUiComponent,
                topMiddleSlot: vc.parseUiComponent,
                topRightSlot: vc.parseUiComponent,
                centerLeftSlot: vc.parseUiComponent,
                centerMiddleSlot: vc.parseUiComponent,
                centerRightSlot: vc.parseUiComponent,
                bottomLeftSlot: vc.parseUiComponent,
                bottomMiddleSlot: vc.parseUiComponent,
                bottomRightSlot: vc.parseUiComponent,
                padding: vc.parseFoundationNumberToken
            }
        },
        Pc[Tc.CollectionCarousel] = {
            component: Fc(Tu),
            propParsers: {
                layoutOverrides: {
                    columnGap: vc.parseFoundationNumberToken,
                    sideMargin: vc.parseFoundationNumberToken
                },
                onScrollToEnd: vc.parseCallback,
                headerComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.CollectionGrid] = {
            component: Fc(ku),
            propParsers: {
                layoutOverrides: {
                    columnGap: vc.parseFoundationNumberToken,
                    sideMargin: vc.parseFoundationNumberToken
                },
                headerComponent: vc.parseUiComponent
            }
        },
        Pc[Tc.ImageWithGradient] = {
            component: Fc((function(e) {
                var t = e.image
                  , n = e.imageContainerHeight
                  , r = e.imageAspectRatio
                  , o = e.gradient
                  , i = e.borderRadius
                  , a = oi({
                    imageContainerHeight: n,
                    borderRadius: void 0 === i ? 0 : i,
                    imageAspectRatio: r
                }).classes;
                return f.createElement("div", {
                    className: a.imageWithGradientWindow,
                    "data-testid": "image-with-gradient-window"
                }, f.createElement("div", {
                    className: a.imageContainer,
                    "data-testid": "image-container"
                }, t), o && f.createElement(ri, {
                    gradient: o
                }))
            }
            )),
            propParsers: {
                image: vc.parseAssetUrlIntoComponent,
                gradient: vc.parseGradient
            }
        },
        Pc[Tc.Button] = {
            component: Fc(Uc),
            propParsers: {
                onActivated: vc.parseCallback,
                size: vc.parseFoundationButtonSize,
                variant: vc.parseFoundationButtonVariant
            }
        },
        Pc[Tc.Page] = {
            component: Fc((function(e) {
                var t = e.backgroundColor
                  , n = e.pageHeader
                  , r = e.feed
                  , o = Ui({
                    backgroundColor: t
                }).classes;
                return f.createElement("div", {
                    className: o.pageContainer
                }, n, r)
            }
            )),
            propParsers: {
                backgroundColor: vc.parseColorValue,
                pageHeader: vc.parseUiComponent,
                feed: vc.parseUiComponent
            }
        },
        Pc[Tc.DetailsPageHeader] = {
            component: Fc((function(e) {
                var t = e.backgroundComponent
                  , n = e.backgroundMaxWidth
                  , r = e.contentComponent
                  , o = e.contentMaxWidth
                  , i = e.contentPaddingLeft
                  , a = e.contentPaddingRight
                  , l = Fi({
                    backgroundMaxWidth: n,
                    contentMaxWidth: o,
                    contentPaddingLeft: i,
                    contentPaddingRight: a
                }).classes;
                return f.createElement("div", {
                    className: l.detailsPageHeaderContainer
                }, f.createElement("div", {
                    className: l.backgroundContainer
                }, t), f.createElement("div", {
                    className: l.contentContainer
                }, f.createElement("div", {
                    className: l.contentMaxWidthContainer
                }, r)))
            }
            )),
            propParsers: {
                backgroundComponent: vc.parseUiComponent,
                backgroundMaxWidth: vc.parseFoundationNumberToken,
                contentComponent: vc.parseUiComponent,
                contentMaxWidth: vc.parseFoundationNumberToken,
                paddingLeft: vc.parseFoundationNumberToken,
                paddingRight: vc.parseFoundationNumberToken
            }
        },
        Pc[Tc.VerticalFeed] = {
            component: Fc(zc),
            propParsers: {
                gapBetweenFeedItems: vc.parseFoundationNumberToken,
                maxWidth: vc.parseFoundationNumberToken,
                paddingLeft: vc.parseFoundationNumberToken,
                paddingRight: vc.parseFoundationNumberToken
            }
        },
        Pc[Tc.AttributionRow] = {
            component: Fc(Hc),
            propParsers: {
                rightButtonContent: vc.parseUiComponent,
                image: vc.parseAssetUrlIntoComponent,
                titleFontStyle: vc.parseFoundationTypographyToken,
                subtitleFontStyle: vc.parseFoundationTypographyToken,
                titleSubtitleGap: vc.parseFoundationNumberToken,
                height: vc.parseFoundationNumberToken
            }
        },
        Pc[Tc.TextPill] = {
            component: Fc(Wc),
            propParsers: {
                anchorPoint: vc.parseVector2,
                automaticSize: vc.parseAutomaticSize,
                size: vc.parseUDim2,
                position: vc.parseUDim2,
                textColor: vc.parseColorValue,
                fontStyle: vc.parseFoundationTypographyToken,
                backgroundColor: vc.parseColorValue
            }
        },
        Pc[Tc.Text] = {
            component: Fc(Vc),
            propParsers: {
                textFontStyle: vc.parseFoundationTypographyToken,
                textColor: vc.parseColorValue
            }
        },
        Pc)
          , qc = function(e) {
            return Jc[e] ? Jc[e].component : null
        }
          , Kc = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }
          , $c = Kc.High
          , Xc = function(e, t, n, r) {
            switch (e) {
            case ju.imageQualityLevel:
                if (!Ws(t))
                    return ru(Bs.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (t ? JSON.stringify(t) : "undefined"), r.pageContext),
                    !1;
                var o = Kc[Gs(t, "")];
                return void 0 === o ? (ru(Bs.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + t.toString(), r.pageContext),
                !1) : $c === o;
            case ju.maxScreenWidth:
                if (!Ws(t))
                    return ru(Bs.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (t ? JSON.stringify(t) : "undefined"), r.pageContext),
                    !1;
                var i = zs(t, -1);
                return i < 0 ? (ru(Bs.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + t.toString(), r.pageContext),
                !1) : i >= n;
            case ju.minScreenWidth:
                if (!Ws(t))
                    return ru(Bs.InvalidMinWidthConditionValue, "Invalid min width condition value: " + (t ? JSON.stringify(t) : "undefined"), r.pageContext),
                    !1;
                var a = zs(t, -1);
                return a < 0 ? (ru(Bs.InvalidParsedMinWidthConditionValue, "Cannot parse min width value: " + t.toString(), r.pageContext),
                !1) : a <= n;
            default:
                return ru(Bs.UnknownResponsivePropConditionKey, "Unknown responsive prop condition key: " + JSON.stringify(e), r.pageContext),
                !1
            }
        }
          , Yc = function(e, t, n) {
            if (!e)
                return {};
            var r = e.find((function(e) {
                var r = e.conditions;
                return !r || Object.entries(r).every((function(e) {
                    var r = e[0]
                      , o = e[1];
                    return Xc(r, o, t, n)
                }
                ))
            }
            ));
            return r ? r.overrides : {}
        }
          , Zc = function(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = (0,
            f.useState)(window.innerWidth)
              , s = l[0]
              , u = l[1];
            (0,
            f.useEffect)((function() {
                var e = function() {
                    u(window.innerWidth)
                };
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }
            ), []);
            var c = (0,
            f.useMemo)((function() {
                return Yc(n.responsiveProps, s, o)
            }
            ), [n.responsiveProps, s, o]);
            return p().createElement(t, {
                componentConfig: n,
                parentAnalyticsContext: r,
                sduiContext: o,
                localAnalyticsData: i,
                extraLocalProps: a,
                responsivePropOverrides: c
            })
        }
          , Qc = n(5250)
          , ed = Object.keys(Gu)
          , td = function(e) {
            return ed.includes(e)
        }
          , nd = function(e) {
            var t = e.conditionalProps
              , n = e.setFailedPresenceConditionIndexes
              , r = e.sduiContext;
            return (0,
            f.useEffect)((function() {
                var e = new Set;
                null == t || t.forEach((function(t, n) {
                    var o = t.conditions;
                    o && Object.entries(o).forEach((function(t) {
                        var o = t[0]
                          , i = t[1];
                        if (td(o)) {
                            var a = function(e, t, n, r) {
                                var o;
                                if (e === Gu.friendInGame) {
                                    if (!Ws(t))
                                        return ru(Bs.InvalidPresenceConditionValue, "Invalid presence condition value: " + JSON.stringify(t) + ", for key: " + e, r.pageContext),
                                        !1;
                                    var i = Gs(t, "");
                                    return i ? (null === (o = n.inGameFriendsByUniverseId[i]) || void 0 === o ? void 0 : o.length) > 0 : (ru(Bs.InvalidPresenceConditionValue, "Invalid friend in game condition value: " + JSON.stringify(t) + ", for key: " + e, r.pageContext),
                                    !1)
                                }
                                return ru(Bs.UnknownPresenceConditionKey, "Unknown presence condition key: " + JSON.stringify(e), r.pageContext),
                                !1
                            }(o, i, r.dataStore.social, r);
                            a || e.add(n)
                        }
                    }
                    ))
                }
                )),
                n((function(t) {
                    return (0,
                    Qc.isEqual)(t, e) ? t : e
                }
                ))
            }
            ), [t, r, n]),
            null
        }
          , rd = Object.keys(ju)
          , od = function(e) {
            return rd.includes(e)
        }
          , id = function(e) {
            var t = e.conditionalProps
              , n = e.setFailedResponsiveConditionIndexes
              , r = e.sduiContext
              , o = (0,
            f.useState)(window.innerWidth)
              , i = o[0]
              , a = o[1];
            return (0,
            f.useEffect)((function() {
                var e = function() {
                    a(window.innerWidth)
                };
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }
            ), []),
            (0,
            f.useEffect)((function() {
                var e = new Set;
                null == t || t.forEach((function(t, n) {
                    var o = t.conditions;
                    o && Object.entries(o).forEach((function(t) {
                        var o = t[0]
                          , a = t[1];
                        od(o) && (Xc(o, a, i, r) || e.add(n))
                    }
                    ))
                }
                )),
                n((function(t) {
                    return (0,
                    Qc.isEqual)(t, e) ? t : e
                }
                ))
            }
            ), [t, n, i, r]),
            null
        }
          , ad = function() {
            return ad = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ad.apply(this, arguments)
        }
          , ld = function(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = n.conditionalProps
              , s = (0,
            f.useState)(new Set)
              , u = s[0]
              , c = s[1]
              , d = (0,
            f.useState)(new Set)
              , m = d[0]
              , v = d[1]
              , h = (0,
            f.useMemo)((function() {
                var e = {
                    hasPresenceCondition: !1,
                    hasResponsiveCondition: !1
                };
                if (!l)
                    return e;
                var t = Object.keys(Gu)
                  , n = Object.keys(ju);
                return l.forEach((function(r) {
                    var o = r.conditions;
                    o && Object.keys(o).forEach((function(r) {
                        t.includes(r) ? e.hasPresenceCondition = !0 : n.includes(r) && (e.hasResponsiveCondition = !0)
                    }
                    ))
                }
                )),
                e
            }
            ), [l])
              , g = (0,
            f.useMemo)((function() {
                return p().createElement(p().Fragment, null, h.hasPresenceCondition && p().createElement(nd, {
                    conditionalProps: l,
                    setFailedPresenceConditionIndexes: v,
                    sduiContext: o
                }), h.hasResponsiveCondition && p().createElement(id, {
                    conditionalProps: l,
                    setFailedResponsiveConditionIndexes: c,
                    sduiContext: o
                }))
            }
            ), [h, l, o])
              , y = (0,
            f.useCallback)((function(e, t) {
                return !m.has(t) && !u.has(t) && (!e || Object.keys(e).every((function(e) {
                    return !(!td(e) && !od(e)) || (ru(Bs.UnsupportedConditionalPropsCondition, "Unsupported condition: " + e, o.pageContext),
                    !1)
                }
                )))
            }
            ), [m, u, o.pageContext])
              , b = (0,
            f.useMemo)((function() {
                return l ? l.reduce((function(e, t, n) {
                    var r = t.conditions
                      , o = t.propOverrides;
                    return o && y(r, n) ? ad(ad({}, e), o) : e
                }
                ), {}) : {}
            }
            ), [l, y])
              , I = (0,
            f.useMemo)((function() {
                return p().createElement(t, {
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i,
                    extraLocalProps: a,
                    conditionalPropOverrides: b
                })
            }
            ), [t, n, r, o, i, a, b]);
            return p().createElement(p().Fragment, null, I, g)
        }
          , sd = function(e) {
            var t = e.componentConfig
              , n = e.parentAnalyticsContext
              , r = e.sduiContext
              , o = e.localAnalyticsData
              , i = e.extraLocalProps
              , a = (0,
            f.useMemo)((function() {
                return t.templateKey ? r.templateRegistry.resolveTemplateForConfig(t) : t
            }
            ), [t, r]);
            return (0,
            f.useMemo)((function() {
                if (!Yu(a))
                    return ru(Bs.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(a) + " to build React props and children", r.pageContext),
                    p().createElement(p().Fragment, null);
                var e = a.componentType
                  , t = qc(e);
                return t ? a.conditionalProps ? p().createElement(ld, {
                    wrappedComponent: t,
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : a.responsiveProps ? p().createElement(Zc, {
                    wrappedComponent: t,
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : p().createElement(t, {
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : (ru(Bs.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(a), r.pageContext),
                p().createElement(p().Fragment, null))
            }
            ), [a, n, r, o, i])
        }
          , ud = function() {
            return ud = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ud.apply(this, arguments)
        }
          , cd = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , dd = function(e, t) {
            var n = (0,
            f.useMemo)((function() {
                var t = new Map;
                return e && Object.entries(e).forEach((function(e) {
                    var n = e[0]
                      , r = e[1];
                    t.set(n, r)
                }
                )),
                t
            }
            ), [e])
              , r = (0,
            f.useCallback)((function(e, o) {
                var i, a = e.templateKey;
                if (!a)
                    return e;
                var l = (0,
                Qc.cloneDeep)(e);
                if (o && o[a])
                    return ru(Bs.TemplateResolutionCircularReference, "Circular reference detected for template key: " + a, t),
                    l.templateKey = void 0,
                    l;
                var s = o || {};
                s[a] = !0;
                var u = n.get(a);
                if (!u)
                    return ru(Bs.TemplateResolutionTemplateNotFound, "Template not found for template key: " + a + " with config: " + JSON.stringify(e), t),
                    l.templateKey = void 0,
                    l;
                var c, d, f = r(u, s);
                if (l.templateKey = void 0,
                e.componentType) {
                    if (e.componentType && f.componentType && e.componentType !== f.componentType)
                        return ru(Bs.TemplateResolutionComponentTypeMismatch, "Component type mismatch for template key: " + a + ". Template type: " + f.componentType + ", Config type: " + e.componentType, t),
                        l
                } else
                    l.componentType = f.componentType;
                return f.analyticsData && (l.analyticsData = ud(ud({}, f.analyticsData), e.analyticsData)),
                f.props && (l.props = null !== (c = f.props,
                d = e.props,
                i = c ? (0,
                Qc.merge)((0,
                Qc.cloneDeep)(c), d) : (0,
                Qc.cloneDeep)(d)) && void 0 !== i ? i : {}),
                f.children && (l.children = cd(cd([], f.children), e.children || [])),
                l
            }
            ), [n, t]);
            return (0,
            f.useMemo)((function() {
                return {
                    resolveTemplateForConfig: r
                }
            }
            ), [r])
        }
          , fd = function(e) {
            var t = {};
            return Object.values(e).forEach((function(e) {
                var n, r;
                void 0 !== (null === (n = e.presence) || void 0 === n ? void 0 : n.universeId) && (null === (r = e.presence) || void 0 === r ? void 0 : r.userPresenceType) === b.Presence.PresenceTypes.InGame && (t[e.presence.universeId] || (t[e.presence.universeId] = []),
                t[e.presence.universeId].push({
                    userId: e.id,
                    displayName: e.displayName,
                    presence: {
                        gameId: e.presence.gameId,
                        placeId: e.presence.placeId,
                        rootPlaceId: e.presence.rootPlaceId
                    }
                }))
            }
            )),
            t
        }
          , pd = function() {
            return pd = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            pd.apply(this, arguments)
        }
          , md = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
          , vd = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }
          , hd = function(e) {
            var t = (0,
            f.useState)({})
              , n = t[0]
              , r = t[1]
              , o = (0,
            f.useRef)({})
              , i = (0,
            f.useCallback)((function(t) {
                if (function(e) {
                    return "Roblox.Presence.Update" === e.type && "detail"in e
                }(t) && t.detail && o.current) {
                    var n = (0,
                    Qc.cloneDeep)(o.current);
                    t.detail.forEach((function(e) {
                        n[e.userId] && (n[e.userId] = pd(pd({}, n[e.userId]), {
                            presence: e
                        }))
                    }
                    )),
                    o.current = n;
                    var i = fd(n);
                    r((function(e) {
                        return (0,
                        Qc.isEqual)(i, e) ? e : i
                    }
                    ))
                } else
                    ru(Bs.InvalidPresenceUpdateEvent, "Invalid presence update event, event is " + JSON.stringify(t) + " and friends details are " + JSON.stringify(o.current), e)
            }
            ), [o, e]);
            return (0,
            f.useEffect)((function() {
                var t = Et.deviceMeta.getDeviceMeta();
                if ((null == t ? void 0 : t.deviceType) === Et.deviceMeta.DeviceTypes.computer && (null === b.CurrentUser || void 0 === b.CurrentUser ? void 0 : b.CurrentUser.isAuthenticated)) {
                    return md(void 0, void 0, Promise, (function() {
                        var t, n, a, l, s, u, c, d;
                        return vd(this, (function(f) {
                            switch (f.label) {
                            case 0:
                                return f.trys.push([0, 3, , 4]),
                                [4, Rt()];
                            case 1:
                                return t = f.sent(),
                                n = t.userData || [],
                                (a = n.map((function(e) {
                                    return e.id
                                }
                                ))) ? [4, He(a)] : [2];
                            case 2:
                                return l = f.sent(),
                                s = l.profileDetails || [],
                                u = n.reduce((function(e, t) {
                                    var n = s.find((function(e) {
                                        return e.userId === t.id
                                    }
                                    ));
                                    return n && n.names && (e[t.id] = pd(pd({}, t), {
                                        displayName: n.names.combinedName,
                                        name: n.names.username
                                    })),
                                    e
                                }
                                ), {}),
                                o.current = u,
                                c = fd(u),
                                r(c),
                                document.addEventListener("Roblox.Presence.Update", i),
                                [3, 4];
                            case 3:
                                return d = f.sent(),
                                ru(Bs.FriendsPresenceFetchFailure, "Failed to get friends details info, error is " + JSON.stringify(d), e),
                                [3, 4];
                            case 4:
                                return [2]
                            }
                        }
                        ))
                    }
                    )).catch((function() {}
                    )),
                    function() {
                        document.removeEventListener("Roblox.Presence.Update", i)
                    }
                }
            }
            ), [i, e]),
            (0,
            f.useMemo)((function() {
                return {
                    inGameFriendsByUniverseId: n
                }
            }
            ), [n])
        }
          , gd = function(e) {
            var t = hd(e);
            return (0,
            f.useMemo)((function() {
                return {
                    social: t
                }
            }
            ), [t])
        }
          , yd = function(e, t) {
            var n = (0,
            g.useTokens)()
              , r = (0,
            f.useMemo)((function() {
                return {
                    pageName: t
                }
            }
            ), [t])
              , o = dd(e, r)
              , i = gd(r)
              , a = (0,
            f.useMemo)((function() {
                return {
                    tokens: n
                }
            }
            ), [n]);
            return (0,
            f.useMemo)((function() {
                return {
                    dependencies: a,
                    templateRegistry: o,
                    dataStore: i,
                    pageContext: r
                }
            }
            ), [a, o, i, r])
        }
          , bd = function() {
            return bd = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            bd.apply(this, arguments)
        }
          , Id = function(e) {
            var t = e.sort
              , n = e.sduiRoot
              , r = e.currentPage
              , o = xr()
              , i = yd(null == n ? void 0 : n.templates, r)
              , a = (0,
            f.useMemo)((function() {
                var e = Xu(n, t.feedItemKey, i);
                if (!e)
                    return p().createElement(p().Fragment, null);
                var r = bd({}, qs(o, i));
                return p().createElement("div", {
                    className: "sdui-feed-item-container"
                }, p().createElement(sd, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: r,
                    sduiContext: i
                }))
            }
            ), [t, n, o, i])
              , l = (0,
            f.useCallback)((function(e, r) {
                ru(Bs.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(t) + " and sdui root " + JSON.stringify(n) + " with error message " + e + " and callstack " + r, i.pageContext)
            }
            ), [t, n, i.pageContext]);
            return p().createElement(Gc, {
                fallback: p().createElement(p().Fragment, null),
                logError: l
            }, a)
        }
          , Cd = function(e) {
            var t, n = e.sort, r = e.positionId, o = e.currentPage, i = (0,
            g.useTokens)(), a = yd(void 0, o), l = xr(), s = (0,
            f.useMemo)((function() {
                return qs(l, a)
            }
            ), [l, a]), u = (0,
            f.useMemo)((function() {
                return n.songs.map((function(e) {
                    return {
                        componentType: Tc.Tile,
                        analyticsData: {
                            id: e.assetId
                        },
                        props: {
                            imageAspectRatio: 1,
                            titleText: e.title,
                            image: "rbxthumb://type=Asset&id=" + e.albumArtAssetId + "&w=150&h=150",
                            footerComponent: {
                                componentType: Tc.TileFooter,
                                props: {
                                    leftText: e.artist
                                }
                            }
                        }
                    }
                }
                ))
            }
            ), [n.songs]), c = (0,
            f.useMemo)((function() {
                var e;
                return {
                    componentType: Tc.CollectionCarousel,
                    props: {
                        items: u,
                        layoutOverrides: {
                            sideMargin: i.Gap.XLarge
                        },
                        scrollingEnabledOverride: !0,
                        collectionItemSize: "Small",
                        headerComponent: {
                            componentType: Tc.SectionHeader,
                            props: {
                                titleText: n.topic,
                                titleGap: i.Gap.XSmall,
                                subtitleText: n.subtitle,
                                titleIcon: "icons/navigation/pushRight_small",
                                infoText: null === (e = n.topicLayoutData) || void 0 === e ? void 0 : e.infoText,
                                onTitleActivated: {
                                    actionType: Ou.OpenSeeAll,
                                    actionParams: {
                                        collectionId: n.topicId,
                                        collectionName: n.sortId,
                                        collectionPosition: r + 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ), [u, r, n.sortId, n.subtitle, n.topic, n.topicId, null === (t = n.topicLayoutData) || void 0 === t ? void 0 : t.infoText, i.Gap.XLarge, i.Gap.XSmall]);
            return 0 === u.length ? null : p().createElement(sd, {
                componentConfig: c,
                parentAnalyticsContext: {},
                localAnalyticsData: s,
                sduiContext: a
            })
        }
          , Sd = function(e) {
            return e === z.HomePage || e === z.GamesPage || e === z.SpotlightPage
        }
          , wd = function(e) {
            var n = e.translate
              , r = e.sort
              , o = e.positionId
              , i = e.currentPage
              , a = e.itemsPerRow
              , l = e.startingRow
              , s = e.gridRecommendations
              , u = e.friendsPresenceData
              , c = e.loadMoreGames
              , d = e.isLoadingMoreGames
              , f = e.isExpandHomeContentEnabled
              , m = e.isMusicChartsCarouselEnabled
              , v = e.isCarouselHorizontalScrollEnabled
              , h = e.isNewScrollArrowsEnabled
              , g = e.isNewSortHeaderEnabled
              , y = e.sduiRoot
              , b = e.fetchGamesPageData;
            switch (r.treatmentType) {
            case t.Carousel:
                return p().createElement(Na, {
                    translate: n,
                    sort: r,
                    positionId: o,
                    page: i,
                    itemsPerRow: a,
                    startingRow: l,
                    friendsPresenceData: u,
                    loadMoreGames: c,
                    isLoadingMoreGames: d,
                    isExpandHomeContentEnabled: f,
                    isCarouselHorizontalScrollEnabled: v,
                    isNewSortHeaderEnabled: g,
                    isNewScrollArrowsEnabled: h
                });
            case t.AvatarCarousel:
                return p().createElement(Oa, {
                    sort: r
                });
            case t.SortlessGrid:
                return p().createElement(nl, {
                    translate: n,
                    sort: r,
                    positionId: o,
                    itemsPerRow: a,
                    startingRow: l,
                    recommendations: null != s ? s : [],
                    friendsPresenceData: u,
                    isExpandHomeContentEnabled: f,
                    isNewSortHeaderEnabled: g
                });
            case t.FriendCarousel:
                return p().createElement(Os, {
                    sortId: r.topicId,
                    sortPosition: o
                });
            case t.SongCarousel:
                return m ? Sd(i) ? p().createElement(Cd, {
                    sort: r,
                    positionId: o,
                    currentPage: i
                }) : (tu(Bs.UnsupportedSduiPage, i + " is not supported for SongCarouselFeedItem", {
                    pageName: i
                }),
                p().createElement(p().Fragment, null)) : p().createElement(p().Fragment, null);
            case t.Pills:
                return p().createElement(js, {
                    sort: r,
                    positionId: o,
                    translate: n,
                    fetchGamesPageData: b
                });
            case t.Sdui:
                return Sd(i) ? p().createElement(Id, {
                    sort: r,
                    sduiRoot: y,
                    currentPage: i
                }) : (tu(Bs.UnsupportedSduiPage, i + " is not supported for SduiFeedItem", {
                    pageName: i
                }),
                p().createElement(p().Fragment, null));
            default:
                return null
            }
        };
        wd.defaultProps = {
            loadMoreGames: void 0,
            isLoadingMoreGames: void 0,
            gridRecommendations: [],
            isExpandHomeContentEnabled: void 0,
            isMusicChartsCarouselEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            fetchGamesPageData: void 0,
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var xd = wd
          , Ed = function() {
            return p().createElement("div", {
                className: "grid-item-container game-card-container game-card-loading"
            }, p().createElement("div", {
                className: "game-card-thumb-container shimmer"
            }), p().createElement("div", {
                className: "game-card-name game-name-title shimmer"
            }), p().createElement("div", {
                className: "game-card-name game-name-title game-name-title-half shimmer"
            }))
        }
          , Pd = function(e, n, r) {
            var o = (0,
            f.useState)(new Map)
              , a = o[0]
              , l = o[1]
              , s = (0,
            f.useState)(new Map)
              , u = s[0]
              , c = s[1]
              , d = (0,
            g.usePrevious)(u)
              , p = (0,
            g.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            f.useEffect)((function() {
                void 0 !== d && (0,
                Qc.isEqual)(u, d) && (0,
                Qc.isEqual)(null == e ? void 0 : e.sorts, p) || function() {
                    var n = new Map
                      , r = new Map;
                    null == e || e.sorts.forEach((function(e) {
                        var r;
                        if (e.treatmentType === t.SortlessGrid) {
                            var o = null !== (r = n.get(e.topicId)) && void 0 !== r ? r : [];
                            o.push.apply(o, e.recommendationList),
                            n.set(e.topicId, o)
                        }
                    }
                    ));
                    var o = new Map;
                    null == e || e.sorts.forEach((function(e, i) {
                        var a, l, s;
                        if (e.treatmentType === t.SortlessGrid) {
                            var c = null !== (a = n.get(e.topicId)) && void 0 !== a ? a : []
                              , d = null !== (l = r.get(e.topicId)) && void 0 !== l ? l : 0;
                            if (void 0 !== e.numberOfRows && e.numberOfRows >= 0) {
                                var f = (null !== (s = u.get(i)) && void 0 !== s ? s : 0) * e.numberOfRows;
                                o.set(i, c.slice(d, d + f)),
                                r.set(e.topicId, d + f)
                            } else
                                o.set(i, c.slice(d)),
                                r.set(e.topicId, c.length)
                        }
                    }
                    )),
                    l(o)
                }()
            }
            ), [null == e ? void 0 : e.sorts, p, u, d]);
            var m = (0,
            f.useMemo)((function() {
                var t = new Map
                  , n = 0;
                return null == e || e.sorts.forEach((function(e, r) {
                    n && t.set(r, n);
                    var o = function(e, t) {
                        if (void 0 !== e.numberOfRows) {
                            if (0 === e.numberOfRows || 1 === e.numberOfRows)
                                return e.numberOfRows;
                            var n = a.get(t)
                              , r = u.get(t);
                            return n && r ? Math.ceil(n.length / r) : null
                        }
                        return (0,
                        h.fireEvent)(ut.missingNumberOfRowsForLoggingErrorEvent),
                        1
                    }(e, r);
                    void 0 !== n && null !== o ? n += o : n = void 0
                }
                )),
                t
            }
            ), [a, u, null == e ? void 0 : e.sorts])
              , v = (0,
            f.useRef)(null)
              , y = (0,
            f.useCallback)((function(e, o) {
                var a, l, s, u;
                if (n || e.treatmentType === t.InterestGrid) {
                    var c = null === (a = e.topicLayoutData) || void 0 === a ? void 0 : a.componentType;
                    return function(e, n, r, o, i, a) {
                        var l = r ? (o ? kn : Tn)[r] : Nn;
                        if (!e)
                            return l.minTilesPerRow;
                        var s = l.minTileWidth
                          , u = l.columnGap
                          , c = l.minTilesPerRow
                          , d = l.maxTilesPerRow
                          , f = Math.floor((e - n + u) / (s + u))
                          , p = Math.min(d, Math.max(c, f));
                        return o && i === t.Carousel && void 0 !== a && a > p ? p + .3 : p
                    }(o, 1, c, r || c === i.EventTile, null == e ? void 0 : e.treatmentType, null === (l = null == e ? void 0 : e.recommendationList) || void 0 === l ? void 0 : l.length)
                }
                return (null === (s = e.topicLayoutData) || void 0 === s ? void 0 : s.componentType) === i.GridTile || (null === (u = e.topicLayoutData) || void 0 === u ? void 0 : u.componentType) === i.EventTile ? o && o < ut.wideGameTileTilesPerRowBreakpointWidth ? ut.minWideGameTilesPerCarouselPage : ut.maxWideGameTilesPerCarouselPage : o && o < ut.homeFeedMaxWidth ? Math.max(1, Math.floor(o / ut.gameTileWidth)) : ut.maxTilesPerCarouselPage
            }
            ), [n, r])
              , b = (0,
            f.useCallback)((function(r) {
                var o = new Map;
                null == e || e.sorts.forEach((function(e, i) {
                    (e.treatmentType === t.SortlessGrid || e.treatmentType === t.InterestGrid || n && e.treatmentType === t.Carousel) && o.set(i, y(e, r))
                }
                )),
                c(o)
            }
            ), [null == e ? void 0 : e.sorts, y, n]);
            return (0,
            f.useLayoutEffect)((function() {
                var e = function() {
                    var e, t = null === (e = null == v ? void 0 : v.current) || void 0 === e ? void 0 : e.getBoundingClientRect().width;
                    t && (document.documentElement.style.setProperty("--home-feed-width", t + "px"),
                    b(t))
                };
                return e(),
                window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }
            ), [b]),
            {
                homeFeedRef: v,
                gridRecommendationsMap: a,
                itemsPerRowMap: u,
                startingRowNumbersMap: m
            }
        }
          , Td = function(e) {
            var t = xr();
            (0,
            f.useEffect)((function() {
                var n = window.scrollY
                  , r = St((function() {
                    var r, o;
                    if (window.scrollY !== n) {
                        var i = null === (r = document.getElementById("header")) || void 0 === r ? void 0 : r.getBoundingClientRect()
                          , a = null !== (o = null == i ? void 0 : i.bottom) && void 0 !== o ? o : 0;
                        Ki({
                            distance: window.scrollY - n,
                            scrollAreaSize: window.innerHeight - a,
                            direction: Z.Vertical,
                            startingPosition: n,
                            currentPage: e,
                            pageSession: t
                        }),
                        n = window.scrollY
                    }
                }
                ), 250)
                  , o = r[0]
                  , i = r[1];
                return window.addEventListener("scroll", o),
                function() {
                    window.removeEventListener("scroll", o),
                    i()
                }
            }
            ), [e, t])
        }
          , kd = function() {
            var e, t;
            if ((null === (e = null === window || void 0 === window ? void 0 : window.screen) || void 0 === e ? void 0 : e.width) && (null === (t = null === window || void 0 === window ? void 0 : window.screen) || void 0 === t ? void 0 : t.height))
                return window.screen.width + "x" + window.screen.height
        }
          , Nd = function() {
            if (function(e) {
                return "deviceMemory"in e
            }(navigator) && "number" == typeof navigator.deviceMemory)
                return 1024 * navigator.deviceMemory
        }
          , Ad = function() {
            var e;
            if (function(e) {
                return "connection"in e
            }(navigator) && (null === (e = navigator.connection) || void 0 === e ? void 0 : e.effectiveType))
                return navigator.connection.effectiveType
        }
          , Od = function() {
            try {
                return {
                    cpuCores: null === navigator || void 0 === navigator ? void 0 : navigator.hardwareConcurrency,
                    maxResolution: kd(),
                    maxMemory: Nd(),
                    networkType: Ad()
                }
            } catch (e) {
                return {}
            }
        }
          , _d = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , Md = {
            XSmall: "size-[var(--icon-size-xsmall)]",
            Small: "size-[var(--icon-size-small)]",
            Medium: "size-[var(--icon-size-medium)]",
            Large: "size-[var(--icon-size-large)]",
            XLarge: "size-[var(--icon-size-xlarge)]"
        }
          , Rd = p().forwardRef((function(e, t) {
            var n = e.name
              , r = e.size
              , o = void 0 === r ? "Medium" : r
              , i = e.className;
            e.children;
            var a = $e(e, ["name", "size", "className", "children"]);
            return p().createElement("span", Ke({
                ref: t,
                role: "presentation",
                className: Ye("grow-0 shrink-0 basis-auto icon", n, Md[o], i)
            }, a))
        }
        ));
        Rd.displayName = "Icon";
        var Ld = function(e) {
            var t = e.buttonProps
              , n = e.titleText
              , r = e.iconClassName;
            return p().createElement("div", {
                className: "flex flex-row grow-1 gap-medium items-center"
            }, r && p().createElement("div", {
                className: "flex shrink-0"
            }, p().createElement(Rd, {
                size: "Large",
                name: r
            })), p().createElement("div", {
                className: "text-title-medium grow-1"
            }, n), t && p().createElement(st, {
                onClick: t.onClick,
                variant: t.variant,
                size: "Small",
                ariaLabel: t.text,
                className: "shrink-0"
            }, t.text))
        }
          , Dd = {
            Neutral: "bg-shift-300",
            Contrast: "bg-system-contrast",
            Success: "bg-system-success",
            Warning: "bg-system-warning",
            Alert: "bg-system-alert",
            OverMedia: "bg-[var(--light-mode-surface-100)]"
        }
          , Fd = {
            Neutral: "content-emphasis",
            Contrast: "content-inverse-emphasis",
            Success: "content-[var(--light-mode-content-emphasis)]",
            Warning: "content-[var(--light-mode-content-emphasis)]",
            Alert: "content-[var(--dark-mode-content-emphasis)]",
            OverMedia: "content-[var(--light-mode-content-emphasis)]"
        }
          , Ud = {
            Neutral: "stroke-none",
            Contrast: "stroke-none",
            Success: "stroke-none",
            Warning: "stroke-none",
            Alert: "stroke-none",
            OverMedia: "stroke-standard"
        }
          , Bd = p().forwardRef((function(e, t) {
            var n = e.className
              , r = e.label
              , o = e.variant
              , i = void 0 === o ? "Neutral" : o
              , a = e.icon
              , l = $e(e, ["className", "label", "variant", "icon"])
              , s = a && !r;
            return p().createElement("div", Ke({
                ref: t
            }, l, {
                className: Ye("foundation-web-badge flex items-center radius-circle select-none height-600 gap-xsmall", s ? "width-600 justify-center" : "width-[fit-content] padding-x-small", Dd[i], Fd[i], Ud[i], n),
                style: {
                    borderColor: "var(--light-mode-stroke-default)"
                }
            }), a && p().createElement(Rd, {
                name: a,
                size: "XSmall"
            }), r && p().createElement("span", {
                className: Ye("text-no-wrap text-truncate-split text-label-small", Fd[i])
            }, r))
        }
        ));
        Bd.displayName = "Badge";
        var jd = {
            Large: "size-1200",
            Medium: "size-1000",
            Small: "size-800",
            XSmall: "size-600"
        }
          , Gd = {
            XSmall: "size-300",
            Small: "size-400",
            Medium: "size-500",
            Large: "size-500"
        }
          , zd = {
            Large: {
                circular: "radius-circle",
                square: "radius-medium"
            },
            Medium: {
                circular: "radius-circle",
                square: "radius-medium"
            },
            Small: {
                circular: "radius-circle",
                square: "radius-medium"
            },
            XSmall: {
                circular: "radius-circle",
                square: "radius-small"
            }
        }
          , Hd = {
            Emphasis: "bg-action-emphasis",
            Standard: "bg-action-standard",
            Alert: "bg-action-alert",
            Utility: "bg-action-link",
            OverMedia: "bg-over-media-0"
        }
          , Wd = {
            Emphasis: "bg-action-standard",
            Standard: "bg-action-standard",
            Alert: "bg-action-standard",
            Utility: "bg-action-link",
            OverMedia: "bg-over-media-0"
        }
          , Vd = {
            Emphasis: "content-action-emphasis",
            Standard: "content-action-standard",
            Alert: "content-action-alert",
            Utility: "content-emphasis",
            OverMedia: "content-emphasis"
        }
          , Jd = {
            Emphasis: "content-action-standard",
            Standard: "content-action-standard",
            Alert: "content-action-standard",
            Utility: "content-emphasis",
            OverMedia: "content-emphasis"
        }
          , qd = (0,
        f.forwardRef)((function(e, t) {
            var n = e.className
              , r = e.as
              , o = e.icon
              , i = e.ariaLabel
              , a = e.isDisabled
              , l = void 0 !== a && a
              , s = e.isCircular
              , u = void 0 !== s && s
              , c = e.size
              , d = void 0 === c ? "Large" : c
              , f = e.variant
              , m = void 0 === f ? "Emphasis" : f
              , v = $e(e, ["className", "as", "icon", "ariaLabel", "isDisabled", "isCircular", "size", "variant"])
              , h = null != r ? r : "button"
              , g = v.href
              , y = $e(v, ["href"]);
            return p().createElement(h, Ke({
                ref: t,
                type: "button" === h ? "button" : void 0,
                "aria-label": i,
                disabled: l,
                "aria-disabled": l,
                href: l ? void 0 : g
            }, y, {
                className: Ye("foundation-web-icon-button", Ze, l ? et : "cursor-pointer", "flex items-center justify-center padding-none stroke-none select-none", jd[d], zd[d][u ? "circular" : "square"], l ? Wd[m] : Hd[m], n)
            }), p().createElement(Qe, null), p().createElement("span", {
                className: Ye("icon", o, Gd[d], l ? Jd[m] : Vd[m])
            }))
        }
        ))
          , Kd = function(e) {
            var t = e.badgePropsArray
              , n = e.titleText
              , r = e.bodyText
              , o = e.iconClassName
              , i = e.dismissible
              , a = e.onDismiss
              , l = e.buttonPropsArray
              , s = t.length > 0
              , u = (0,
            g.useTranslation)().translate;
            return p().createElement("div", {
                className: "flex flex-col grow-1 gap-large"
            }, s && p().createElement("div", {
                className: "flex flex-row width-full gap-large align-y-center"
            }, p().createElement("div", {
                className: "flex flex-row grow-1 gap-large"
            }, t.map((function(e) {
                return p().createElement(Bd, {
                    variant: "Neutral",
                    label: e.text,
                    icon: e.iconClassName,
                    key: e.text
                })
            }
            ))), i && p().createElement(qd, {
                variant: "Utility",
                size: "Medium",
                icon: "icon-filled-x",
                onClick: a,
                className: "size-600 shrink-0",
                ariaLabel: u("Action.Close")
            })), p().createElement("div", {
                className: "flex flex-row gap-medium"
            }, o && p().createElement("div", {
                className: "height-full shrink-0"
            }, p().createElement(Rd, {
                size: "Large",
                name: o
            })), p().createElement("div", {
                className: "flex flex-col grow-1 " + (r ? "gap-xsmall" : "gap-small")
            }, p().createElement("div", {
                className: "text-title-medium"
            }, n), p().createElement("div", {
                className: "flex flex-col gap-large"
            }, r && p().createElement("div", {
                className: "text-body-medium"
            }, r), p().createElement("div", {
                className: "flex flex-row flex-wrap gap-small"
            }, l.map((function(e) {
                return p().createElement(st, {
                    onClick: e.onClick,
                    variant: e.variant,
                    size: "Small",
                    "aria-label": e.text,
                    key: e.text,
                    className: "shrink-0"
                }, e.text)
            }
            ))))), i && !s && p().createElement(qd, {
                variant: "Utility",
                size: "Medium",
                icon: "icon-filled-x",
                onClick: a,
                className: "size-600 shrink-0",
                ariaLabel: u("Action.Close")
            })))
        }
          , $d = function(e) {
            var t = e.badgePropsArray
              , n = e.buttonPropsArray
              , r = e.dismissible
              , o = e.bodyText;
            return 0 === t.length && n.length < 2 && !r && !o
        }
          , Xd = "Homepage"
          , Yd = "Banner"
          , Zd = "socialUpsellShown"
          , Qd = "socialUpsellButtonClick"
          , ef = function() {
            return ef = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            ef.apply(this, arguments)
        }
          , tf = function(e, t) {
            var n = void 0 === t ? {} : t
              , r = n.upsellPurpose
              , o = n.upsellEntrySurface
              , i = n.upsellComponent
              , a = n.upsellStage
              , l = n.impressionId
              , s = n.btn
              , u = n.context
              , c = void 0 === u ? "upsellBanner" : u
              , d = function(e, t, n) {
                if (e && t && n)
                    return "" + e + t + n
            }(r, o, i)
              , f = {
                upsellIdentifier: d,
                upsellEntrySurface: o,
                upsellStage: a,
                upsellComponent: i,
                upsellPurpose: r,
                clientTimeStamp: Math.floor(Date.now() / 1e3),
                upsellImpressionId: l
            };
            s && (f.btn = s),
            y.eventStreamService.sendEventWithTarget(e, c, f)
        }
          , nf = function(e) {
            var t = e || {}
              , n = t.upsellPurpose
              , r = t.upsellEntrySurface
              , o = t.upsellComponent
              , i = t.upsellStage
              , a = t.impressionId
              , l = (0,
            f.useMemo)((function() {
                return a || v.uuidService.generateRandomUuid()
            }
            ), [a])
              , s = (0,
            f.useRef)(null)
              , u = (0,
            f.useMemo)((function() {
                return n || r || o || i || a ? {
                    upsellPurpose: n,
                    upsellEntrySurface: r,
                    upsellComponent: o,
                    upsellStage: i,
                    impressionId: l
                } : null
            }
            ), [n, r, o, i, l, a]);
            return (0,
            f.useEffect)((function() {
                u && s.current !== l && (tf(Zd, u),
                s.current = l)
            }
            ), [u, l]),
            {
                logDismissed: (0,
                f.useCallback)((function() {
                    u && tf(Qd, ef(ef({}, u), {
                        btn: "Dismiss"
                    }))
                }
                ), [u]),
                logButtonClick: (0,
                f.useCallback)((function(e) {
                    u && function(e, t) {
                        tf(Qd, ef(ef({}, t), {
                            btn: e
                        }))
                    }(e, u)
                }
                ), [u])
            }
        }
          , rf = function() {
            return rf = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            rf.apply(this, arguments)
        }
          , of = function(e) {
            var t = e.badgePropsArray
              , n = e.titleText
              , r = e.bodyText
              , o = e.iconClassName
              , i = e.dismissible
              , a = e.buttonPropsArray
              , l = e.onDismiss
              , s = e.analyticsConfig
              , u = nf(s)
              , c = u.logDismissed
              , d = u.logButtonClick
              , m = (0,
            f.useCallback)((function() {
                c(),
                l()
            }
            ), [c, l])
              , v = (0,
            f.useCallback)((function(e, t) {
                return function() {
                    d(t),
                    e()
                }
            }
            ), [d])
              , h = (0,
            f.useMemo)((function() {
                return a.map((function(e) {
                    return rf(rf({}, e), {
                        onClick: v(e.onClick, e.variant)
                    })
                }
                ))
            }
            ), [a, v])
              , g = $d({
                badgePropsArray: t,
                buttonPropsArray: a,
                dismissible: i,
                bodyText: r
            });
            return p().createElement("div", {
                className: "flex margin-bottom-medium"
            }, p().createElement("div", {
                className: "flex grow-1 radius-medium padding-large stroke-standard stroke-default bg-shift-100"
            }, g ? p().createElement(Ld, {
                buttonProps: h[0],
                titleText: n,
                iconClassName: o
            }) : p().createElement(Kd, {
                badgePropsArray: t,
                titleText: n,
                bodyText: r,
                iconClassName: o,
                dismissible: i,
                onDismiss: m,
                buttonPropsArray: h
            })))
        }
          , af = b.EnvironmentUrls.apiGatewayUrl
          , lf = b.EnvironmentUrls.voiceApi;
        function sf(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var uf = function() {
            var e, t = (e = regeneratorRuntime.mark((function e(t, n) {
                var r, o, i, a;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(lf, "/v1/settings/user-opt-in")
                            },
                            o = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            v.httpService.post(r, o);
                        case 4:
                            return i = e.sent,
                            a = i.data,
                            e.abrupt("return", a);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )),
            function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                        sf(i, r, o, a, l, "next", e)
                    }
                    function l(e) {
                        sf(i, r, o, a, l, "throw", e)
                    }
                    a(void 0)
                }
                ))
            }
            );
            return function(e, n) {
                return t.apply(this, arguments)
            }
        }();
        function cf(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function df(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function ff(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var pf = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone",
            AgeVerificationModal: "Fae"
        }
          , mf = "OpenFaeUpsell"
          , vf = "OpenFaeViewDetails"
          , hf = "Dismiss"
          , gf = "HomePageUpsellCard"
          , yf = "UpsellBanner"
          , bf = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , If = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , Cf = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , Sf = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , wf = "vertical"
          , xf = "horizontal"
          , Ef = function(e, t) {
            switch (e) {
            case "ContactMethodEmail":
                return {
                    primaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    }
                };
            case "ContactMethodPhoneNumber":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberVoiceOptIn":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: function(e) {
                            return null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderPhoneUpsell(function(e) {
                                for (var t = 1; t < arguments.length; t++) {
                                    var n = null != arguments[t] ? arguments[t] : {};
                                    t % 2 ? df(Object(n), !0).forEach((function(t) {
                                        ff(e, t, n[t])
                                    }
                                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : df(Object(n)).forEach((function(t) {
                                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                                    }
                                    ))
                                }
                                return e
                            }({
                                addPhoneAlwaysShowLegalText: !0,
                                addPhoneRequireLegalTextCheckbox: t,
                                addPhoneHeadingKey: "Action.AddPhoneVoice",
                                addPhoneDescriptionKey: "Description.AddPhoneNumber",
                                addPhoneButtonKey: "Action.Verify",
                                addPhoneLegalTextKey: t ? "Description.VoiceLegalConsent" : "Description.VoiceLegalDisclaimer3",
                                beforeSuccess: (n = regeneratorRuntime.mark((function e() {
                                    var t, n;
                                    return regeneratorRuntime.wrap((function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.prev = 0,
                                                e.next = 3,
                                                uf(!0, !1);
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
                                    }
                                    ), e, null, [[0, 16]])
                                }
                                )),
                                r = function() {
                                    var e = this
                                      , t = arguments;
                                    return new Promise((function(r, o) {
                                        var i = n.apply(e, t);
                                        function a(e) {
                                            cf(i, r, o, a, l, "next", e)
                                        }
                                        function l(e) {
                                            cf(i, r, o, a, l, "throw", e)
                                        }
                                        a(void 0)
                                    }
                                    ))
                                }
                                ,
                                function() {
                                    return r.apply(this, arguments)
                                }
                                )
                            }, e));
                            var n, r
                        },
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberEmailHorizontalLayout":
            case "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1":
                return {
                    primaryButton: {
                        text: "Action.AddPhoneShort",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: xf
                };
            case "ContactMethodPhoneNumberEmailVerticalLayout":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmailAddress",
                        onClick: null === b.UpsellService || void 0 === b.UpsellService ? void 0 : b.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: wf
                };
            case "FacebookSunset":
                return {
                    primaryButton: {
                        text: "Action.SetPassword",
                        onClick: null === b.FacebookSunsetService || void 0 === b.FacebookSunsetService ? void 0 : b.FacebookSunsetService.openFacebookSunsetModal,
                        buttonClickBtnLog: "setPassword"
                    }
                };
            default:
                return null
            }
        }
          , Pf = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function Tf(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function kf(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Tf(Object(n), !0).forEach((function(t) {
                    Nf(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tf(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function Nf(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var Af = function(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0;
            y.eventStreamService.sendEventWithTarget(e.type, Cf[n], kf(kf({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
          , Of = function(e) {
            var t = {
                retryable: !1,
                withCredentials: !0,
                url: "".concat(af, "/upsellCard/dismiss")
            };
            return v.httpService.post(t, {
                cardType: e
            }).then((function(e) {
                return e.data
            }
            ))
        }
          , _f = y.eventStreamService.eventTypes
          , Mf = "mandatory"
          , Rf = "homepage"
          , Lf = {
            cardShown: {
                name: "cardShown",
                type: _f.modalAction,
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
        function Df(e) {
            var t, n = e.translate, r = e.cardType, o = e.origin, i = e.titleTextOverride, a = e.bodyTextOverride, l = e.requireExplicitVoiceConsent, s = e.onDismiss, u = Sf[r];
            (0,
            f.useEffect)((function() {
                Af(Lf.cardShown, o, r, u)
            }
            ), []);
            var c = Ef(r, l)
              , d = null == c ? void 0 : c.primaryButton
              , m = d ? p().createElement(Yt.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    Af(Lf.buttonClick, o, r, u, d.buttonClickBtnLog),
                    d.onClick((function(e) {
                        e && s()
                    }
                    ))
                }
            }, n(d.text)) : null
              , v = null == c ? void 0 : c.secondaryButton
              , h = v ? p().createElement(Yt.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    Af(Lf.buttonClick, o, r, u, v.buttonClickBtnLog),
                    v.onClick((function(e) {
                        e && s()
                    }
                    ))
                }
            }, n(v.text)) : null
              , g = null !== (t = null == c ? void 0 : c.buttonStackOrientation) && void 0 !== t ? t : xf
              , y = p().createElement("div", {
                className: g === xf ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, m, h)
              , b = Ff(i) ? n(bf[r]) : i
              , I = Ff(a) ? n(If[r]) : a
              , C = p().createElement("div", {
                className: "upsell-card-text-content-group"
            }, bf[r] ? p().createElement("div", {
                className: "font-header-1"
            }, " ", b) : null, p().createElement("div", {
                className: "upsell-card-content"
            }, " ", I))
              , S = Pf[r] ? p().createElement("div", {
                className: "home-page-upsell-card-image ".concat(Pf[r])
            }) : null;
            return p().createElement("div", {
                className: "home-page-upsell-card-banner-container"
            }, p().createElement("div", {
                className: "banner-contents"
            }, p().createElement("div", {
                className: "icon-and-text"
            }, S, p().createElement("div", {
                className: "banner-content-container"
            }, C)), p().createElement("div", {
                className: "add-email-btn-container"
            }, y), p().createElement("div", {
                id: "facebookSunsetModal-container"
            })))
        }
        function Ff(e) {
            return !e || 0 === e.length
        }
        Df.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        Df.propTypes = {
            translate: an().func.isRequired,
            cardType: an().string.isRequired,
            titleTextOverride: an().string,
            bodyTextOverride: an().string,
            origin: an().string,
            requireExplicitVoiceConsent: an().bool,
            onDismiss: an().func.isRequired
        };
        var Uf, Bf = Df, jf = function(e) {
            return e === pf.AgeVerificationModal ? yf : [pf.ContactMethodEmail, pf.ContactMethodPhoneNumber, pf.ContactMethodPhoneNumberEmailHorizontalLayout, pf.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, pf.ContactMethodPhoneNumberEmailVerticalLayout, pf.ContactMethodPhoneNumberVoiceOptIn, pf.FacebookSunset].includes(e) ? gf : null
        };
        function Gf(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var zf = Gf({}, "Countdown", {
            iconClassName: "icon-filled-clock"
        })
          , Hf = Gf({}, pf.AgeVerificationModal, {
            iconClassNames: {
                full: "icon-regular-speech-bubble-align-center",
                compact: "icon-regular-shield-check"
            }
        })
          , Wf = (Gf(Uf = {}, mf, {
            variant: "Emphasis"
        }),
        Gf(Uf, vf, {
            variant: "ActionUtility"
        }),
        Gf(Uf, hf, {
            variant: "ActionUtility"
        }),
        Uf)
          , Vf = Gf({}, pf.AgeVerificationModal, {
            upsellPurpose: "FacialAgeEstimation",
            upsellStage: "fae"
        })
          , Jf = function(e, t, n) {
            var r, o, i, a, l, s, u, c = jf(e), d = ((null == t ? void 0 : t.label_items) || []).map((function(e) {
                var t, n;
                return {
                    text: (null === (t = e.metadata) || void 0 === t ? void 0 : t.countdown_text) || "",
                    iconClassName: null === (n = zf[e.type]) || void 0 === n ? void 0 : n.iconClassName
                }
            }
            )), f = ((null == t ? void 0 : t.buttons) || []).filter((function(e) {
                return n[e.action.type]
            }
            )).map((function(e) {
                var t;
                return {
                    text: e.text || "",
                    onClick: n[e.action.type],
                    variant: (null === (t = Wf[e.action.type]) || void 0 === t ? void 0 : t.variant) || "ActionUtility"
                }
            }
            )), p = $d({
                badgePropsArray: d,
                buttonPropsArray: f,
                dismissible: null == t ? void 0 : t.dismissible,
                bodyText: null == t || null === (r = t.body) || void 0 === r ? void 0 : r.text
            }) ? null === (o = Hf[e]) || void 0 === o || null === (i = o.iconClassNames) || void 0 === i ? void 0 : i.compact : null === (a = Hf[e]) || void 0 === a || null === (l = a.iconClassNames) || void 0 === l ? void 0 : l.full;
            return c === yf ? {
                badgePropsArray: d,
                buttonPropsArray: f,
                titleText: (null == t || null === (s = t.header) || void 0 === s ? void 0 : s.text) || "",
                bodyText: null == t || null === (u = t.body) || void 0 === u ? void 0 : u.text,
                iconClassName: p,
                dismissible: (null == t ? void 0 : t.dismissible) || !1,
                cardTypeAnalyticsFields: Vf[e] || {}
            } : {
                badgePropsArray: [],
                buttonPropsArray: [],
                titleText: "",
                dismissible: !1,
                cardTypeAnalyticsFields: {}
            }
        }
          , qf = "AgeVerificationStatusChange";
        function Kf(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function $f(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Kf(Object(n), !0).forEach((function(t) {
                    Xf(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Kf(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function Xf(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function Yf(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Zf(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                        Yf(i, r, o, a, l, "next", e)
                    }
                    function l(e) {
                        Yf(i, r, o, a, l, "throw", e)
                    }
                    a(void 0)
                }
                ))
            }
        }
        function Qf(e, t) {
            return function(e) {
                if (Array.isArray(e))
                    return e
            }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                    return;
                var n = []
                  , r = !0
                  , o = !1
                  , i = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value),
                    !t || n.length !== t); r = !0)
                        ;
                } catch (e) {
                    o = !0,
                    i = e
                } finally {
                    try {
                        r || null == l.return || l.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                return n
            }(e, t) || function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return ep(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return ep(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function ep(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        var tp = {};
        function np(e) {
            var t, n = e.translate, r = pf.ContactMethodMandatoryEmailPhone, o = Qf((0,
            f.useState)(null), 2), i = o[0], a = o[1], l = Qf((0,
            f.useState)(""), 2), s = l[0], u = l[1], c = Qf((0,
            f.useState)(""), 2), d = c[0], m = c[1], v = Qf((0,
            f.useState)(!1), 2), h = v[0], g = v[1], y = Qf((0,
            f.useState)(tp), 2), I = y[0], C = y[1], S = Qf((0,
            f.useState)(!1), 2), w = S[0], x = S[1], E = (0,
            f.useCallback)((function() {
                a(null),
                C(tp),
                u(""),
                m("")
            }
            ), []), P = (0,
            f.useCallback)(Zf(regeneratorRuntime.mark((function e() {
                var t, n;
                return regeneratorRuntime.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            b.HomePageUpsellCardService.getHomePageUpsellCardVariation();
                        case 3:
                            t = e.sent,
                            (n = null == t ? void 0 : t.upsellCardType) === pf.AgeVerificationModal ? (a(null == t ? void 0 : t.upsellCardType),
                            C(null == t ? void 0 : t.upsellCardV2Config)) : n ? (a(null == t ? void 0 : t.upsellCardType),
                            u(null == t ? void 0 : t.localizedTitleTextOverride),
                            m(null == t ? void 0 : t.localizedBodyTextOverride)) : E(),
                            e.next = 12;
                            break;
                        case 8:
                            e.prev = 8,
                            e.t0 = e.catch(0),
                            console.error("Error getting the upsell card variation ".concat(e.t0)),
                            E();
                        case 12:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[0, 8]])
            }
            ))), [E]);
            (0,
            f.useEffect)((function() {
                var e = function() {
                    var e = Zf(regeneratorRuntime.mark((function e() {
                        var t;
                        return regeneratorRuntime.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    b.HomePageUpsellCardService.getVoicePolicy();
                                case 3:
                                    null != (null == (t = e.sent) ? void 0 : t.requireExplicitVoiceConsent) && g(null == t ? void 0 : t.requireExplicitVoiceConsent),
                                    e.next = 11;
                                    break;
                                case 7:
                                    e.prev = 7,
                                    e.t0 = e.catch(0),
                                    console.error("Error reading policy for homepage upsellcard ".concat(e.t0)),
                                    g(!0);
                                case 11:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e, null, [[0, 7]])
                    }
                    )));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }();
                P(),
                e()
            }
            ), []),
            (0,
            f.useEffect)((function() {
                if (b.RealTime) {
                    var e = b.RealTime.Factory.GetClient()
                      , t = function() {
                        P()
                    };
                    return e.Subscribe(qf, t),
                    function() {
                        e.Unsubscribe(qf, t)
                    }
                }
            }
            ), [P]),
            (0,
            f.useEffect)((function() {
                i === r && (null === b.UpsellService || void 0 === b.UpsellService || b.UpsellService.renderContactMethodPromptModal({
                    origin: Rf,
                    section: Mf
                }))
            }
            ), [i]);
            var T = (0,
            f.useCallback)((function() {
                b.AccessManagementUpsellV2Service && b.AccessManagementUpsellV2Service.startAccessManagementUpsell({
                    featureName: "TriggerAgeVerifyRecourse",
                    namespace: "social/Upsells"
                }).then((function(e) {
                    e && P()
                }
                )).catch((function(e) {
                    console.error("Error in homePageUpsellCardContainer FAE upsell", e)
                }
                ))
            }
            ), [P])
              , k = !(!i || !I)
              , N = (0,
            f.useCallback)((function() {
                k && Of(i).catch((function(e) {
                    console.error("Error recording dismissal for ".concat(i, " ").concat(e))
                }
                )),
                x(!0)
            }
            ), [i, k])
              , A = (Xf(t = {}, mf, T),
            Xf(t, hf, N),
            t)
              , O = Jf(i, I, A)
              , _ = jf(i);
            return w ? null : _ === yf ? p().createElement(of, {
                badgePropsArray: O.badgePropsArray,
                titleText: O.titleText,
                bodyText: O.bodyText,
                buttonPropsArray: O.buttonPropsArray,
                dismissible: O.dismissible,
                iconClassName: O.iconClassName,
                onDismiss: N,
                analyticsConfig: $f($f({}, O.cardTypeAnalyticsFields), {}, {
                    upsellEntrySurface: Xd,
                    upsellComponent: Yd
                })
            }) : _ === gf ? p().createElement(Bf, {
                translate: n,
                cardType: i,
                titleTextOverride: s,
                bodyTextOverride: d,
                requireExplicitVoiceConsent: h,
                onDismiss: N
            }) : null
        }
        np.propTypes = {
            translate: an().func.isRequired
        };
        var rp = np;
        function op(e) {
            var t = e.translate
              , n = e.context;
            return p().createElement(g.TranslationProvider, {
                config: _d
            }, p().createElement(rp, {
                translate: t,
                context: n
            }))
        }
        op.defaultProps = {
            context: pf.ContactMethod
        },
        op.propTypes = {
            translate: an().func.isRequired,
            context: an().string
        };
        var ip, ap = (0,
        g.withTranslations)(op, _d), lp = function() {
            return lp = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            lp.apply(this, arguments)
        }, sp = function(e) {
            var t, n, r, o, i, a, l = e.sort, s = e.itemsPerRow, u = e.toggleInterest, c = e.interestedUniverses, d = e.homePageSessionInfo, m = e.translate, v = (0,
            f.useRef)(null), h = (0,
            f.useRef)(null), g = Ia().contentMetadata, b = (0,
            f.useMemo)((function() {
                return Yi(l.recommendationList, g)
            }
            ), [l.recommendationList, g]), I = (0,
            f.useCallback)((function(e) {
                var t, n = null == b ? void 0 : b.findIndex((function(t) {
                    return t.universeId === e
                }
                ));
                if (void 0 !== n && -1 !== n) {
                    var r = b[n];
                    return (t = {})[K.ButtonName] = Q.Interested,
                    t[K.PlaceId] = r.placeId,
                    t[K.UniverseId] = e,
                    t[K.Position] = n,
                    t[K.GameSetTypeId] = l.topicId,
                    t[K.NumberOfLoadedTiles] = null == b ? void 0 : b.length,
                    t[K.Page] = z.InterestCatcher,
                    t[X.HomePageSessionInfo] = d,
                    t[K.IsInterested] = !c.has(e),
                    t
                }
            }
            ), [c, b, d, l.topicId]), C = (0,
            f.useCallback)((function(e) {
                u(e);
                var t = I(e)
                  , n = pe.interestCatcherClick(t);
                void 0 !== n && y.eventStreamService.sendEvent.apply(y.eventStreamService, n)
            }
            ), [u, I]), S = (0,
            f.useCallback)((function(e) {
                var t, n, r, o;
                if (b) {
                    var i = e.filter((function(e) {
                        return e < (null == b ? void 0 : b.length)
                    }
                    ));
                    return lp(lp(lp(((t = {})[K.RootPlaceIds] = i.map((function(e) {
                        return b[e].placeId
                    }
                    )),
                    t[K.UniverseIds] = i.map((function(e) {
                        return b[e].universeId
                    }
                    )),
                    t), we(b, l.topicId, i, null === (r = null == l ? void 0 : l.topicLayoutData) || void 0 === r ? void 0 : r.componentType)), Pe(b, l.topicId, i, null === (o = null == l ? void 0 : l.topicLayoutData) || void 0 === o ? void 0 : o.componentType)), ((n = {})[K.AbsPositions] = i,
                    n[K.NumberOfLoadedTiles] = null == b ? void 0 : b.length,
                    n[K.GameSetTypeId] = l.topicId,
                    n[K.Page] = z.InterestCatcher,
                    n[X.HomePageSessionInfo] = d,
                    n))
                }
            }
            ), [b, d, l.topicId, null === (t = null == l ? void 0 : l.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return Ir(v, null !== (n = null == b ? void 0 : b.length) && void 0 !== n ? n : 0, S),
            (0,
            f.useLayoutEffect)((function() {
                s && (null == v ? void 0 : v.current) && v.current.style.setProperty("--items-per-row", s.toString())
            }
            ), [s]),
            p().createElement(Xa, {
                ref: v,
                tileRef: h,
                gameData: b,
                emphasis: !1,
                translate: m,
                isHomeGameGrid: !0,
                isExpandHomeContentEnabled: !0,
                buildEventProperties: function() {
                    return {}
                },
                componentType: null === (r = null == l ? void 0 : l.topicLayoutData) || void 0 === r ? void 0 : r.componentType,
                playerCountStyle: null === (o = null == l ? void 0 : l.topicLayoutData) || void 0 === o ? void 0 : o.playerCountStyle,
                playButtonStyle: null === (i = null == l ? void 0 : l.topicLayoutData) || void 0 === i ? void 0 : i.playButtonStyle,
                topicId: null === (a = null == l ? void 0 : l.topicId) || void 0 === a ? void 0 : a.toString(),
                shouldUseSentinelTile: !1,
                interestedUniverses: c,
                toggleInterest: C
            })
        }, up = function(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (0,
            f.useState)(new Set)
              , a = i[0]
              , l = i[1]
              , s = xr()
              , u = (0,
            f.useCallback)((function(e) {
                var t;
                return (t = {})[K.ButtonName] = e,
                t[X.HomePageSessionInfo] = s,
                t[K.InterestedUniverseIds] = Array.from(a),
                t[K.Page] = z.InterestCatcher,
                t
            }
            ), [s, a])
              , c = (0,
            f.useCallback)((function(e) {
                var t = u(e)
                  , n = pe.interestCatcherClick(t);
                void 0 !== n && y.eventStreamService.sendEvent.apply(y.eventStreamService, n)
            }
            ), [u])
              , d = (0,
            f.useCallback)((function() {
                r([]),
                c(Q.Skip)
            }
            ), [r, c])
              , m = (0,
            f.useCallback)((function() {
                r(Array.from(a)),
                c(Q.Continue)
            }
            ), [a, r, c])
              , v = (0,
            f.useMemo)((function() {
                return (null == a ? void 0 : a.size) ? o(nn.ActionInterestCatcherContinueSelected, {
                    numSelected: a.size
                }) : o(nn.ActionInterestCatcherContinue)
            }
            ), [a, o])
              , h = (0,
            f.useCallback)((function(e) {
                var t, n;
                if (null !== e && void 0 !== (null === (t = e.getBoundingClientRect()) || void 0 === t ? void 0 : t.top)) {
                    var r = document.getElementById("header");
                    if (r && (null === (n = r.getBoundingClientRect()) || void 0 === n ? void 0 : n.height)) {
                        var o = r.getBoundingClientRect().height;
                        window.scrollTo({
                            top: e.getBoundingClientRect().top + window.scrollY - o
                        })
                    }
                }
            }
            ), []);
            return p().createElement("div", {
                ref: h,
                className: "interest-catcher-container",
                "data-testid": "interest-catcher-container"
            }, p().createElement("div", {
                className: "header-container"
            }, p().createElement("div", {
                className: "header-text-container"
            }, p().createElement("h1", {
                className: "header-text"
            }, t.topic), p().createElement("span", {
                className: "header-subtext"
            }, t.subtitle)), p().createElement("div", {
                className: "header-buttons-container"
            }, !(null == a ? void 0 : a.size) && p().createElement(Yt.Button, {
                variant: Yt.Button.variants.secondary,
                size: Yt.Button.sizes.medium,
                title: o(nn.ActionInterestCatcherSkip),
                onClick: d,
                className: "skip-button"
            }, o(nn.ActionInterestCatcherSkip)), p().createElement(Yt.Button, {
                variant: Yt.Button.variants.primary,
                size: Yt.Button.sizes.medium,
                title: v,
                onClick: m,
                isDisabled: !(null == a ? void 0 : a.size),
                className: "continue-button"
            }, v))), p().createElement(sp, {
                sort: t,
                itemsPerRow: n,
                translate: o,
                toggleInterest: function(e) {
                    l((function(t) {
                        var n = new Set(t);
                        return n.has(e) ? n.delete(e) : n.add(e),
                        n
                    }
                    ))
                },
                interestedUniverses: a,
                homePageSessionInfo: s
            }))
        }, cp = function() {
            return cp = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            cp.apply(this, arguments)
        }, dp = ut.maxTilesPerCarouselPage, fp = (ip = (0,
        g.withTranslations)((function(n) {
            var o = n.translate
              , i = xr()
              , a = Da()
              , l = (0,
            f.useState)(void 0)
              , s = l[0]
              , u = l[1]
              , c = (0,
            f.useState)(!1)
              , d = c[0]
              , m = c[1]
              , v = (0,
            f.useMemo)((function() {
                return Od()
            }
            ), [])
              , g = (0,
            f.useMemo)((function() {
                try {
                    return (0,
                    y.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }
            ), [])
              , b = (0,
            f.useCallback)((function(e) {
                u(void 0),
                m(!1),
                je(Ut.Home, i, v, g, e, [r.Carousel, r.HeroUnit]).then((function(e) {
                    u(e),
                    (0,
                    h.fireEvent)(ut.omniRecommendationEndpointSuccessEvent),
                    nu(e, i)
                }
                )).catch((function() {
                    m(!0),
                    (0,
                    h.fireEvent)(ut.omniRecommendationEndpointErrorEvent)
                }
                ))
            }
            ), [i, v, g]);
            (0,
            f.useEffect)((function() {
                b()
            }
            ), [b]);
            var I = !0
              , C = !0
              , S = (0,
            f.useCallback)((function(t) {
                u((function(n) {
                    var r;
                    return n ? cp(cp({}, n), {
                        contentMetadata: (r = {},
                        r[e.Game] = cp(cp({}, n.contentMetadata[e.Game]), t[e.Game]),
                        r[e.CatalogAsset] = cp(cp({}, n.contentMetadata[e.CatalogAsset]), t[e.CatalogAsset]),
                        r[e.CatalogBundle] = cp(cp({}, n.contentMetadata[e.CatalogBundle]), t[e.CatalogBundle]),
                        r)
                    }) : n
                }
                ))
            }
            ), [])
              , w = Pd(s, I, C)
              , x = w.homeFeedRef
              , E = w.gridRecommendationsMap
              , P = w.itemsPerRowMap
              , T = w.startingRowNumbersMap;
            Td(z.HomePage);
            var k = (0,
            f.useMemo)((function() {
                return !!(null == s ? void 0 : s.sorts) && s.sorts.every((function(e) {
                    return e.treatmentType !== t.FriendCarousel
                }
                ))
            }
            ), [null == s ? void 0 : s.sorts])
              , N = (0,
            f.useMemo)((function() {
                return null == s ? void 0 : s.sorts.findIndex((function(e) {
                    return e.treatmentType === t.InterestGrid
                }
                ))
            }
            ), [null == s ? void 0 : s.sorts]);
            if (d)
                return p().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, p().createElement("h2", null, o(en.LabelGames)), p().createElement(bt, {
                    errorSubtext: o(en.LabelApiError),
                    onRefresh: function() {
                        return b()
                    }
                }));
            if (void 0 === s)
                return p().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, p().createElement("div", {
                    className: "game-home-page-loading-title shimmer"
                }), p().createElement("div", {
                    className: "game-home-page-loading-carousel"
                }, Array.from({
                    length: dp
                }, (function(e, t) {
                    return p().createElement(Ed, {
                        key: t
                    })
                }
                ))));
            if (void 0 !== N && N > -1) {
                var A = s.sorts[N];
                if (A && Zi(A))
                    return p().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, p().createElement("div", {
                        ref: x
                    }, p().createElement(ba.Provider, {
                        value: {
                            contentMetadata: s.contentMetadata,
                            appendContentMetadata: S
                        }
                    }, p().createElement(up, {
                        sort: A,
                        itemsPerRow: P.get(N),
                        fetchRecommendations: b,
                        translate: o
                    }))))
            }
            return p().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, p().createElement("div", {
                ref: x
            }, p().createElement(ba.Provider, {
                value: {
                    contentMetadata: s.contentMetadata,
                    appendContentMetadata: S
                }
            }, p().createElement(ap, {
                translate: o,
                context: void 0
            }), k && p().createElement(As, {
                homePageSessionInfo: i,
                sortId: void 0,
                sortPosition: 0
            }), s.sorts.map((function(e, t) {
                var n;
                return p().createElement(p().Fragment, {
                    key: t
                }, p().createElement(xd, {
                    translate: o,
                    sort: e,
                    positionId: t,
                    startingRow: T.get(t),
                    currentPage: z.HomePage,
                    itemsPerRow: P.get(t),
                    gridRecommendations: null !== (n = E.get(t)) && void 0 !== n ? n : [],
                    friendsPresenceData: a,
                    isExpandHomeContentEnabled: I,
                    isCarouselHorizontalScrollEnabled: C,
                    isNewScrollArrowsEnabled: !0,
                    isNewSortHeaderEnabled: !0,
                    sduiRoot: s.sdui
                }))
            }
            )))))
        }
        ), Cn),
        function(e) {
            return p().createElement(wr, null, p().createElement(ip, Cr({}, e)))
        }
        ), pp = function(e, t, n, r) {
            return new (n || (n = Promise))((function(o, i) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, l)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }, mp = function(e, t) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: l(0),
                throw: l(1),
                return: l(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function l(i) {
                return function(l) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
                                0) : r.next) && !(o = o.call(r, i[1])).done)
                                    return o;
                                switch (r = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    r = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2],
                                        a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                i = t.call(e, a)
                            } catch (e) {
                                i = [6, e],
                                r = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, l])
                }
            }
        }, vp = b.EnvironmentUrls.userModerationApi + "/v1/reminder", hp = function() {
            return pp(void 0, void 0, Promise, (function() {
                var e;
                return mp(this, (function(t) {
                    return e = {
                        url: vp,
                        withCredentials: !0
                    },
                    [2, v.httpService.get(e)]
                }
                ))
            }
            ))
        }, gp = (0,
        f.createContext)(null), yp = function(e) {
            var t = e.children
              , n = (0,
            f.useState)(null)
              , r = n[0]
              , o = n[1];
            return (0,
            f.useEffect)((function() {
                hp().then((function(e) {
                    null != (null == e ? void 0 : e.data) && o(e.data)
                }
                ), (function(e) {
                    console.error(e)
                }
                ))
            }
            ), []),
            p().createElement(gp.Provider, {
                value: r
            }, t)
        }, bp = {
            common: [],
            feature: "Feature.Home"
        };
        var Ip, Cp = function(e, t) {
            var n = e.contentVariant
              , r = e.policyViolation
              , o = "";
            switch (n) {
            case "positive":
                o = t("Experiment.Reminders.BodyPositiveVariant");
                break;
            case "warning":
                o = t("Experiment.Reminders.BodyWarningVariant")
            }
            return {
                dialogTitle: t("Experiment.Reminders.Title"),
                dialogBodyAbuseType: t("Experiment.Reminders.BodyShared", {
                    policy_violation: t(r)
                }),
                dialogBodyGuidelineReminder: o,
                confirmationButtonLabel: t("Experiment.Reminders.Button")
            }
        };
        !function(e) {
            e.CTA_CLICKED = "REMINDER_INTERACTION_CTA_CLICKED",
            e.DISMISSED = "REMINDER_INTERACTION_REMINDER_DISMISSED"
        }(Ip || (Ip = {}));
        var Sp = function(e, t, n, r, o, i, a) {
            b.EventStream.SendEventWithTarget("HomePageRemindersEvent", "WebApp", {
                user_id: r,
                source_intervention_id: e,
                reminder_number: n,
                timestamp_milliseconds: o,
                time_to_interact_seconds: i,
                interaction: t,
                platform: "PLATFORM_WEB",
                experiment_variant: a
            }, b.EventStream.TargetTypes.WWW)
        }
          , wp = function() {
            var e = (0,
            f.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = (0,
            f.useContext)(gp)
              , o = (0,
            f.useRef)(0)
              , i = b.CurrentUser.userId;
            (0,
            f.useEffect)((function() {
                o.current = Date.now()
            }
            ), []);
            var a = (0,
            g.useTranslation)().translate;
            if (null == r || !(null == r ? void 0 : r.shouldSurfaceReminder) || !(null == r ? void 0 : r.policyViolation))
                return null;
            var l = r.interventionId
              , s = !t && (null == r ? void 0 : r.shouldSurfaceReminder)
              , u = Cp(r, a)
              , c = u.dialogTitle
              , d = u.dialogBodyAbuseType
              , m = u.dialogBodyGuidelineReminder
              , v = u.confirmationButtonLabel;
            return p().createElement(Yt.Modal, {
                className: "reminder-of-norms-dialog-modal",
                show: s,
                onHide: function() {
                    var e = Date.now();
                    Sp(l, Ip.DISMISSED, r.reminderNumber, i, e, (e - o.current) / 1e3, r.experimentVariant),
                    n(!0)
                }
            }, p().createElement(Yt.Modal.Header, {
                className: "reminder-of-norms-dialog-title",
                title: c,
                showCloseButton: !1
            }), p().createElement(Yt.Modal.Body, {
                className: "reminder-of-norms-dialog-body"
            }, p().createElement("p", {
                className: "dialog-body-abuse-type"
            }, d), p().createElement("p", {
                className: "dialog-body-guideline-reminder"
            }, m)), p().createElement(Yt.Modal.Footer, null, p().createElement(Yt.Button, {
                className: "reminder-of-norms-confirm-button",
                onClick: function() {
                    var e = Date.now();
                    Sp(l, Ip.CTA_CLICKED, r.reminderNumber, i, e, (e - o.current) / 1e3, r.experimentVariant),
                    n(!0)
                }
            }, v)))
        };
        var xp = function() {
            return p().createElement(g.TranslationProvider, {
                config: bp
            }, p().createElement(yp, null, p().createElement(wp, null)))
        }
          , Ep = (0,
        g.withTranslations)((function(e) {
            var t = e.translate;
            return p().createElement("div", {
                id: "HomeContainer",
                className: "row home-container expand-max-width"
            }, p().createElement("div", {
                className: "section"
            }, p().createElement("div", {
                className: "col-xs-12 container-header"
            }, p().createElement("h1", null, t(tn.LabelsHome)))), p().createElement("div", null, p().createElement(xp, null)), p().createElement("div", {
                className: "place-list-container"
            }, p().createElement(fp, null)))
        }
        ), {
            common: [],
            feature: "CommonUI.Features"
        });
        (0,
        v.ready)((function() {
            W() ? (0,
            m.render)(p().createElement(fp, null), W()) : document.getElementById("places-list-web-app") && document.getElementById("content") ? (0,
            m.render)(p().createElement(Ep, null), document.getElementById("content")) : (0,
            h.fireEvent)("HomePageMissingContainerDiv")
        }
        ))
    }()
}();
//# sourceMappingURL=https://sourcemaps.rbxcdn.com/3097f2401d9439746862a2181920da4f-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
