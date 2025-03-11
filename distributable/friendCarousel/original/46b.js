!function() {
    var n = {
        4777: function(e) {
            var s = 4
              , u = 1e-7
              , c = 10
              , o = "function" == typeof Float32Array;
            function r(e, t) {
                return 1 - 3 * t + 3 * e
            }
            function i(e, t) {
                return 3 * t - 6 * e
            }
            function d(e, t, n) {
                return ((r(t, n) * e + i(t, n)) * e + 3 * t) * e
            }
            function f(e, t, n) {
                return 3 * r(t, n) * e * e + 2 * i(t, n) * e + 3 * t
            }
            function p(e) {
                return e
            }
            e.exports = function(i, t, a, n) {
                if (!(0 <= i && i <= 1 && 0 <= a && a <= 1))
                    throw new Error("bezier x values must be in [0, 1] range");
                if (i === t && a === n)
                    return p;
                for (var l = new (o ? Float32Array : Array)(11), e = 0; e < 11; ++e)
                    l[e] = d(.1 * e, i, a);
                function r(e) {
                    for (var t = 0, n = 1; 10 !== n && l[n] <= e; ++n)
                        t += .1;
                    var r = t + .1 * ((e - l[--n]) / (l[n + 1] - l[n]))
                      , o = f(r, i, a);
                    return .001 <= o ? function(e, t, n, r) {
                        for (var o = 0; o < s; ++o) {
                            var i = f(t, n, r);
                            if (0 === i)
                                return t;
                            t -= (d(t, n, r) - e) / i
                        }
                        return t
                    }(e, r, i, a) : 0 === o ? r : function(e, t, n, r, o) {
                        for (var i, a, l = 0; 0 < (i = d(a = t + (n - t) / 2, r, o) - e) ? n = a : t = a,
                        Math.abs(i) > u && ++l < c; )
                            ;
                        return a
                    }(e, t, t + .1, i, a)
                }
                return function(e) {
                    return 0 === e ? 0 : 1 === e ? 1 : d(r(e), t, n)
                }
            }
        },
        1315: function() {
            !function() {
                "use strict";
                var f, n, p, m;
                function i(e) {
                    try {
                        return e.defaultView && e.defaultView.frameElement || null
                    } catch (e) {
                        return null
                    }
                }
                function u(e) {
                    this.time = e.time,
                    this.target = e.target,
                    this.rootBounds = r(e.rootBounds),
                    this.boundingClientRect = r(e.boundingClientRect),
                    this.intersectionRect = r(e.intersectionRect || c()),
                    this.isIntersecting = !!e.intersectionRect;
                    var t = this.boundingClientRect
                      , e = t.width * t.height
                      , t = this.intersectionRect
                      , t = t.width * t.height;
                    this.intersectionRatio = e ? Number((t / e).toFixed(4)) : this.isIntersecting ? 1 : 0
                }
                function e(e, t) {
                    var n, r, o, t = t || {};
                    if ("function" != typeof e)
                        throw new Error("callback must be a function");
                    if (t.root && 1 != t.root.nodeType && 9 != t.root.nodeType)
                        throw new Error("root must be a Document or Element");
                    this._checkForIntersections = (n = this._checkForIntersections.bind(this),
                    r = this.THROTTLE_TIMEOUT,
                    o = null,
                    function() {
                        o = o || setTimeout(function() {
                            n(),
                            o = null
                        }, r)
                    }
                    ),
                    this._callback = e,
                    this._observationTargets = [],
                    this._queuedEntries = [],
                    this._rootMarginValues = this._parseRootMargin(t.rootMargin),
                    this.thresholds = this._initThresholds(t.threshold),
                    this.root = t.root || null,
                    this.rootMargin = this._rootMarginValues.map(function(e) {
                        return e.value + e.unit
                    }).join(" "),
                    this._monitoringDocuments = [],
                    this._monitoringUnsubscribes = []
                }
                function a(e, t, n, r) {
                    "function" == typeof e.addEventListener ? e.addEventListener(t, n, r || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
                }
                function l(e, t, n, r) {
                    "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, r || !1) : "function" == typeof e.detachEvent && e.detachEvent("on" + t, n)
                }
                function v(e) {
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
                    t) : c()
                }
                function c() {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
                function r(e) {
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
                function h(e, t) {
                    var n = t.top - e.top
                      , e = t.left - e.left;
                    return {
                        top: n,
                        left: e,
                        height: t.height,
                        width: t.width,
                        bottom: n + t.height,
                        right: e + t.width
                    }
                }
                function o(e, t) {
                    for (var n = t; n; ) {
                        if (n == e)
                            return !0;
                        n = g(n)
                    }
                    return !1
                }
                function g(e) {
                    var t = e.parentNode;
                    return 9 == e.nodeType && e != f ? i(e) : (t && t.assignedSlot && (t = t.assignedSlot.parentNode),
                    t && 11 == t.nodeType && t.host ? t.host : t)
                }
                function s(e) {
                    return e && 9 === e.nodeType
                }
                "object" == typeof window && ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype ? "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function() {
                        return 0 < this.intersectionRatio
                    }
                }) : (f = function() {
                    for (var e = window.document, t = i(e); t; )
                        t = i(e = t.ownerDocument);
                    return e
                }(),
                n = [],
                m = p = null,
                e.prototype.THROTTLE_TIMEOUT = 100,
                e.prototype.POLL_INTERVAL = null,
                e.prototype.USE_MUTATION_OBSERVER = !0,
                e._setupCrossOriginUpdater = function() {
                    return p = p || function(e, t) {
                        m = e && t ? h(e, t) : c(),
                        n.forEach(function(e) {
                            e._checkForIntersections()
                        })
                    }
                }
                ,
                e._resetCrossOriginUpdater = function() {
                    m = p = null
                }
                ,
                e.prototype.observe = function(t) {
                    if (!this._observationTargets.some(function(e) {
                        return e.element == t
                    })) {
                        if (!t || 1 != t.nodeType)
                            throw new Error("target must be an Element");
                        this._registerInstance(),
                        this._observationTargets.push({
                            element: t,
                            entry: null
                        }),
                        this._monitorIntersections(t.ownerDocument),
                        this._checkForIntersections()
                    }
                }
                ,
                e.prototype.unobserve = function(t) {
                    this._observationTargets = this._observationTargets.filter(function(e) {
                        return e.element != t
                    }),
                    this._unmonitorIntersections(t.ownerDocument),
                    0 == this._observationTargets.length && this._unregisterInstance()
                }
                ,
                e.prototype.disconnect = function() {
                    this._observationTargets = [],
                    this._unmonitorAllIntersections(),
                    this._unregisterInstance()
                }
                ,
                e.prototype.takeRecords = function() {
                    var e = this._queuedEntries.slice();
                    return this._queuedEntries = [],
                    e
                }
                ,
                e.prototype._initThresholds = function(e) {
                    e = e || [0];
                    return Array.isArray(e) || (e = [e]),
                    e.sort().filter(function(e, t, n) {
                        if ("number" != typeof e || isNaN(e) || e < 0 || 1 < e)
                            throw new Error("threshold must be a number between 0 and 1 inclusively");
                        return e !== n[t - 1]
                    })
                }
                ,
                e.prototype._parseRootMargin = function(e) {
                    e = (e || "0px").split(/\s+/).map(function(e) {
                        e = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                        if (!e)
                            throw new Error("rootMargin must be specified in pixels or percent");
                        return {
                            value: parseFloat(e[1]),
                            unit: e[2]
                        }
                    });
                    return e[1] = e[1] || e[0],
                    e[2] = e[2] || e[0],
                    e[3] = e[3] || e[1],
                    e
                }
                ,
                e.prototype._monitorIntersections = function(t) {
                    var n, r, o, e = t.defaultView;
                    e && -1 == this._monitoringDocuments.indexOf(t) && (n = this._checkForIntersections,
                    o = r = null,
                    this.POLL_INTERVAL ? r = e.setInterval(n, this.POLL_INTERVAL) : (a(e, "resize", n, !0),
                    a(t, "scroll", n, !0),
                    this.USE_MUTATION_OBSERVER && "MutationObserver"in e && (o = new e.MutationObserver(n)).observe(t, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })),
                    this._monitoringDocuments.push(t),
                    this._monitoringUnsubscribes.push(function() {
                        var e = t.defaultView;
                        e && (r && e.clearInterval(r),
                        l(e, "resize", n, !0)),
                        l(t, "scroll", n, !0),
                        o && o.disconnect()
                    }),
                    e = this.root && (this.root.ownerDocument || this.root) || f,
                    t == e || (e = i(t)) && this._monitorIntersections(e.ownerDocument))
                }
                ,
                e.prototype._unmonitorIntersections = function(r) {
                    var o, e, t = this._monitoringDocuments.indexOf(r);
                    -1 != t && (o = this.root && (this.root.ownerDocument || this.root) || f,
                    this._observationTargets.some(function(e) {
                        if ((t = e.element.ownerDocument) == r)
                            return !0;
                        for (; t && t != o; ) {
                            var t, n = i(t);
                            if ((t = n && n.ownerDocument) == r)
                                return !0
                        }
                        return !1
                    }) || (e = this._monitoringUnsubscribes[t],
                    this._monitoringDocuments.splice(t, 1),
                    this._monitoringUnsubscribes.splice(t, 1),
                    e(),
                    r == o || (e = i(r)) && this._unmonitorIntersections(e.ownerDocument)))
                }
                ,
                e.prototype._unmonitorAllIntersections = function() {
                    var e = this._monitoringUnsubscribes.slice(0);
                    this._monitoringDocuments.length = 0;
                    for (var t = this._monitoringUnsubscribes.length = 0; t < e.length; t++)
                        e[t]()
                }
                ,
                e.prototype._checkForIntersections = function() {
                    var l, s;
                    !this.root && p && !m || (l = this._rootIsInDom(),
                    s = l ? this._getRootRect() : c(),
                    this._observationTargets.forEach(function(e) {
                        var t = e.element
                          , n = v(t)
                          , r = this._rootContainsTarget(t)
                          , o = e.entry
                          , i = l && r && this._computeTargetAndRootIntersection(t, n, s)
                          , a = null;
                        this._rootContainsTarget(t) ? p && !this.root || (a = s) : a = c();
                        i = e.entry = new u({
                            time: window.performance && performance.now && performance.now(),
                            target: t,
                            boundingClientRect: n,
                            rootBounds: a,
                            intersectionRect: i
                        });
                        o ? l && r ? this._hasCrossedThreshold(o, i) && this._queuedEntries.push(i) : o && o.isIntersecting && this._queuedEntries.push(i) : this._queuedEntries.push(i)
                    }, this),
                    this._queuedEntries.length && this._callback(this.takeRecords(), this))
                }
                ,
                e.prototype._computeTargetAndRootIntersection = function(e, t, n) {
                    if ("none" != window.getComputedStyle(e).display) {
                        for (var r = t, o = g(e), i = !1; !i && o; ) {
                            var a, l, s, u, c = null, d = 1 == o.nodeType ? window.getComputedStyle(o) : {};
                            if ("none" == d.display)
                                return null;
                            if (o == this.root || 9 == o.nodeType ? (i = !0,
                            o == this.root || o == f ? p && !this.root ? !m || 0 == m.width && 0 == m.height ? r = c = o = null : c = m : c = n : (l = (a = g(o)) && v(a),
                            s = a && this._computeTargetAndRootIntersection(a, l, n),
                            l && s ? (o = a,
                            c = h(l, s)) : r = o = null)) : o != (u = o.ownerDocument).body && o != u.documentElement && "visible" != d.overflow && (c = v(o)),
                            c && (a = c,
                            l = r,
                            c = d = u = s = void 0,
                            s = Math.max(a.top, l.top),
                            u = Math.min(a.bottom, l.bottom),
                            d = Math.max(a.left, l.left),
                            c = Math.min(a.right, l.right),
                            l = u - s,
                            r = 0 <= (a = c - d) && 0 <= l ? {
                                top: s,
                                bottom: u,
                                left: d,
                                right: c,
                                width: a,
                                height: l
                            } : null),
                            !r)
                                break;
                            o = o && g(o)
                        }
                        return r
                    }
                }
                ,
                e.prototype._getRootRect = function() {
                    var e, t;
                    return t = this.root && !s(this.root) ? v(this.root) : (e = (t = s(this.root) ? this.root : f).documentElement,
                    t = t.body,
                    {
                        top: 0,
                        left: 0,
                        right: e.clientWidth || t.clientWidth,
                        width: e.clientWidth || t.clientWidth,
                        bottom: e.clientHeight || t.clientHeight,
                        height: e.clientHeight || t.clientHeight
                    }),
                    this._expandRectByRootMargin(t)
                }
                ,
                e.prototype._expandRectByRootMargin = function(n) {
                    var e = this._rootMarginValues.map(function(e, t) {
                        return "px" == e.unit ? e.value : e.value * (t % 2 ? n.width : n.height) / 100
                    })
                      , e = {
                        top: n.top - e[0],
                        right: n.right + e[1],
                        bottom: n.bottom + e[2],
                        left: n.left - e[3]
                    };
                    return e.width = e.right - e.left,
                    e.height = e.bottom - e.top,
                    e
                }
                ,
                e.prototype._hasCrossedThreshold = function(e, t) {
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
                e.prototype._rootIsInDom = function() {
                    return !this.root || o(f, this.root)
                }
                ,
                e.prototype._rootContainsTarget = function(e) {
                    var t = this.root && (this.root.ownerDocument || this.root) || f;
                    return o(t, e) && (!this.root || t == e.ownerDocument)
                }
                ,
                e.prototype._registerInstance = function() {
                    n.indexOf(this) < 0 && n.push(this)
                }
                ,
                e.prototype._unregisterInstance = function() {
                    var e = n.indexOf(this);
                    -1 != e && n.splice(e, 1)
                }
                ,
                window.IntersectionObserver = e,
                window.IntersectionObserverEntry = u))
            }()
        },
        8550: function(e, t, n) {
            var y = "Expected a function"
              , o = NaN
              , i = "[object Symbol]"
              , a = /^\s+|\s+$/g
              , l = /^[-+]0x[0-9a-f]+$/i
              , s = /^0b[01]+$/i
              , u = /^0o[0-7]+$/i
              , c = parseInt
              , r = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
              , n = "object" == typeof self && self && self.Object === Object && self
              , d = r || n || Function("return this")()
              , f = Object.prototype.toString
              , b = Math.max
              , I = Math.min
              , w = function() {
                return d.Date.now()
            };
            function p(r, n, e) {
                var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                if ("function" != typeof r)
                    throw new TypeError(y);
                function p(e) {
                    var t = o
                      , n = i;
                    return o = i = void 0,
                    c = e,
                    l = r.apply(n, t)
                }
                function m(e) {
                    var t = e - u;
                    return void 0 === u || n <= t || t < 0 || f && a <= e - c
                }
                function v() {
                    var e, t = w();
                    if (m(t))
                        return h(t);
                    s = setTimeout(v, (t = n - ((e = t) - u),
                    f ? I(t, a - (e - c)) : t))
                }
                function h(e) {
                    return s = void 0,
                    t && o ? p(e) : (o = i = void 0,
                    l)
                }
                function g() {
                    var e = w()
                      , t = m(e);
                    if (o = arguments,
                    i = this,
                    u = e,
                    t) {
                        if (void 0 === s)
                            return c = t = u,
                            s = setTimeout(v, n),
                            d ? p(t) : l;
                        if (f)
                            return s = setTimeout(v, n),
                            p(u)
                    }
                    return void 0 === s && (s = setTimeout(v, n)),
                    l
                }
                return n = E(n) || 0,
                S(e) && (d = !!e.leading,
                f = "maxWait"in e,
                a = f ? b(E(e.maxWait) || 0, n) : a,
                t = "trailing"in e ? !!e.trailing : t),
                g.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                    o = u = i = s = void (c = 0)
                }
                ,
                g.flush = function() {
                    return void 0 === s ? l : h(w())
                }
                ,
                g
            }
            function S(e) {
                var t = typeof e;
                return e && ("object" == t || "function" == t)
            }
            function E(e) {
                if ("number" == typeof e)
                    return e;
                if ("symbol" == typeof (t = e) || !!(n = t) && "object" == typeof n && f.call(t) == i)
                    return o;
                var t, n;
                if (S(e) && (e = S(r = "function" == typeof e.valueOf ? e.valueOf() : e) ? r + "" : r),
                "string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(a, "");
                var r = s.test(e);
                return r || u.test(e) ? c(e.slice(2), r ? 2 : 8) : l.test(e) ? o : +e
            }
            e.exports = function(e, t, n) {
                var r = !0
                  , o = !0;
                if ("function" != typeof e)
                    throw new TypeError(y);
                return S(n) && (r = "leading"in n ? !!n.leading : r,
                o = "trailing"in n ? !!n.trailing : o),
                p(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: o
                })
            }
        },
        9870: function(e, t) {
            var n;
            /*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
            !function() {
                "use strict";
                var a = {}.hasOwnProperty;
                function l() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        if (n) {
                            var r, o = typeof n;
                            if ("string" == o || "number" == o)
                                e.push(n);
                            else if (Array.isArray(n))
                                !n.length || (r = l.apply(null, n)) && e.push(r);
                            else if ("object" == o)
                                if (n.toString === Object.prototype.toString || n.toString.toString().includes("[native code]"))
                                    for (var i in n)
                                        a.call(n, i) && n[i] && e.push(i);
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
        6870: function() {
            !function() {
                "use strict";
                var f, n, p, m;
                function i(e) {
                    try {
                        return e.defaultView && e.defaultView.frameElement || null
                    } catch (e) {
                        return null
                    }
                }
                function u(e) {
                    this.time = e.time,
                    this.target = e.target,
                    this.rootBounds = r(e.rootBounds),
                    this.boundingClientRect = r(e.boundingClientRect),
                    this.intersectionRect = r(e.intersectionRect || c()),
                    this.isIntersecting = !!e.intersectionRect;
                    var t = this.boundingClientRect
                      , e = t.width * t.height
                      , t = this.intersectionRect
                      , t = t.width * t.height;
                    this.intersectionRatio = e ? Number((t / e).toFixed(4)) : this.isIntersecting ? 1 : 0
                }
                function e(e, t) {
                    var n, r, o, t = t || {};
                    if ("function" != typeof e)
                        throw new Error("callback must be a function");
                    if (t.root && 1 != t.root.nodeType && 9 != t.root.nodeType)
                        throw new Error("root must be a Document or Element");
                    this._checkForIntersections = (n = this._checkForIntersections.bind(this),
                    r = this.THROTTLE_TIMEOUT,
                    o = null,
                    function() {
                        o = o || setTimeout(function() {
                            n(),
                            o = null
                        }, r)
                    }
                    ),
                    this._callback = e,
                    this._observationTargets = [],
                    this._queuedEntries = [],
                    this._rootMarginValues = this._parseRootMargin(t.rootMargin),
                    this.thresholds = this._initThresholds(t.threshold),
                    this.root = t.root || null,
                    this.rootMargin = this._rootMarginValues.map(function(e) {
                        return e.value + e.unit
                    }).join(" "),
                    this._monitoringDocuments = [],
                    this._monitoringUnsubscribes = []
                }
                function a(e, t, n, r) {
                    "function" == typeof e.addEventListener ? e.addEventListener(t, n, r || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
                }
                function l(e, t, n, r) {
                    "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, r || !1) : "function" == typeof e.detachEvent && e.detachEvent("on" + t, n)
                }
                function v(e) {
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
                    t) : c()
                }
                function c() {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
                function r(e) {
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
                function h(e, t) {
                    var n = t.top - e.top
                      , e = t.left - e.left;
                    return {
                        top: n,
                        left: e,
                        height: t.height,
                        width: t.width,
                        bottom: n + t.height,
                        right: e + t.width
                    }
                }
                function o(e, t) {
                    for (var n = t; n; ) {
                        if (n == e)
                            return !0;
                        n = g(n)
                    }
                    return !1
                }
                function g(e) {
                    var t = e.parentNode;
                    return 9 == e.nodeType && e != f ? i(e) : (t && t.assignedSlot && (t = t.assignedSlot.parentNode),
                    t && 11 == t.nodeType && t.host ? t.host : t)
                }
                function s(e) {
                    return e && 9 === e.nodeType
                }
                "object" == typeof window && ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype ? "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function() {
                        return 0 < this.intersectionRatio
                    }
                }) : (f = function() {
                    for (var e = window.document, t = i(e); t; )
                        t = i(e = t.ownerDocument);
                    return e
                }(),
                n = [],
                m = p = null,
                e.prototype.THROTTLE_TIMEOUT = 100,
                e.prototype.POLL_INTERVAL = null,
                e.prototype.USE_MUTATION_OBSERVER = !0,
                e._setupCrossOriginUpdater = function() {
                    return p = p || function(e, t) {
                        m = e && t ? h(e, t) : c(),
                        n.forEach(function(e) {
                            e._checkForIntersections()
                        })
                    }
                }
                ,
                e._resetCrossOriginUpdater = function() {
                    m = p = null
                }
                ,
                e.prototype.observe = function(t) {
                    if (!this._observationTargets.some(function(e) {
                        return e.element == t
                    })) {
                        if (!t || 1 != t.nodeType)
                            throw new Error("target must be an Element");
                        this._registerInstance(),
                        this._observationTargets.push({
                            element: t,
                            entry: null
                        }),
                        this._monitorIntersections(t.ownerDocument),
                        this._checkForIntersections()
                    }
                }
                ,
                e.prototype.unobserve = function(t) {
                    this._observationTargets = this._observationTargets.filter(function(e) {
                        return e.element != t
                    }),
                    this._unmonitorIntersections(t.ownerDocument),
                    0 == this._observationTargets.length && this._unregisterInstance()
                }
                ,
                e.prototype.disconnect = function() {
                    this._observationTargets = [],
                    this._unmonitorAllIntersections(),
                    this._unregisterInstance()
                }
                ,
                e.prototype.takeRecords = function() {
                    var e = this._queuedEntries.slice();
                    return this._queuedEntries = [],
                    e
                }
                ,
                e.prototype._initThresholds = function(e) {
                    e = e || [0];
                    return Array.isArray(e) || (e = [e]),
                    e.sort().filter(function(e, t, n) {
                        if ("number" != typeof e || isNaN(e) || e < 0 || 1 < e)
                            throw new Error("threshold must be a number between 0 and 1 inclusively");
                        return e !== n[t - 1]
                    })
                }
                ,
                e.prototype._parseRootMargin = function(e) {
                    e = (e || "0px").split(/\s+/).map(function(e) {
                        e = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                        if (!e)
                            throw new Error("rootMargin must be specified in pixels or percent");
                        return {
                            value: parseFloat(e[1]),
                            unit: e[2]
                        }
                    });
                    return e[1] = e[1] || e[0],
                    e[2] = e[2] || e[0],
                    e[3] = e[3] || e[1],
                    e
                }
                ,
                e.prototype._monitorIntersections = function(t) {
                    var n, r, o, e = t.defaultView;
                    e && -1 == this._monitoringDocuments.indexOf(t) && (n = this._checkForIntersections,
                    o = r = null,
                    this.POLL_INTERVAL ? r = e.setInterval(n, this.POLL_INTERVAL) : (a(e, "resize", n, !0),
                    a(t, "scroll", n, !0),
                    this.USE_MUTATION_OBSERVER && "MutationObserver"in e && (o = new e.MutationObserver(n)).observe(t, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })),
                    this._monitoringDocuments.push(t),
                    this._monitoringUnsubscribes.push(function() {
                        var e = t.defaultView;
                        e && (r && e.clearInterval(r),
                        l(e, "resize", n, !0)),
                        l(t, "scroll", n, !0),
                        o && o.disconnect()
                    }),
                    e = this.root && (this.root.ownerDocument || this.root) || f,
                    t == e || (e = i(t)) && this._monitorIntersections(e.ownerDocument))
                }
                ,
                e.prototype._unmonitorIntersections = function(r) {
                    var o, e, t = this._monitoringDocuments.indexOf(r);
                    -1 != t && (o = this.root && (this.root.ownerDocument || this.root) || f,
                    this._observationTargets.some(function(e) {
                        if ((t = e.element.ownerDocument) == r)
                            return !0;
                        for (; t && t != o; ) {
                            var t, n = i(t);
                            if ((t = n && n.ownerDocument) == r)
                                return !0
                        }
                        return !1
                    }) || (e = this._monitoringUnsubscribes[t],
                    this._monitoringDocuments.splice(t, 1),
                    this._monitoringUnsubscribes.splice(t, 1),
                    e(),
                    r == o || (e = i(r)) && this._unmonitorIntersections(e.ownerDocument)))
                }
                ,
                e.prototype._unmonitorAllIntersections = function() {
                    var e = this._monitoringUnsubscribes.slice(0);
                    this._monitoringDocuments.length = 0;
                    for (var t = this._monitoringUnsubscribes.length = 0; t < e.length; t++)
                        e[t]()
                }
                ,
                e.prototype._checkForIntersections = function() {
                    var l, s;
                    !this.root && p && !m || (l = this._rootIsInDom(),
                    s = l ? this._getRootRect() : c(),
                    this._observationTargets.forEach(function(e) {
                        var t = e.element
                          , n = v(t)
                          , r = this._rootContainsTarget(t)
                          , o = e.entry
                          , i = l && r && this._computeTargetAndRootIntersection(t, n, s)
                          , a = null;
                        this._rootContainsTarget(t) ? p && !this.root || (a = s) : a = c();
                        i = e.entry = new u({
                            time: window.performance && performance.now && performance.now(),
                            target: t,
                            boundingClientRect: n,
                            rootBounds: a,
                            intersectionRect: i
                        });
                        o ? l && r ? this._hasCrossedThreshold(o, i) && this._queuedEntries.push(i) : o && o.isIntersecting && this._queuedEntries.push(i) : this._queuedEntries.push(i)
                    }, this),
                    this._queuedEntries.length && this._callback(this.takeRecords(), this))
                }
                ,
                e.prototype._computeTargetAndRootIntersection = function(e, t, n) {
                    if ("none" != window.getComputedStyle(e).display) {
                        for (var r = t, o = g(e), i = !1; !i && o; ) {
                            var a, l, s, u, c = null, d = 1 == o.nodeType ? window.getComputedStyle(o) : {};
                            if ("none" == d.display)
                                return null;
                            if (o == this.root || 9 == o.nodeType ? (i = !0,
                            o == this.root || o == f ? p && !this.root ? !m || 0 == m.width && 0 == m.height ? r = c = o = null : c = m : c = n : (l = (a = g(o)) && v(a),
                            s = a && this._computeTargetAndRootIntersection(a, l, n),
                            l && s ? (o = a,
                            c = h(l, s)) : r = o = null)) : o != (u = o.ownerDocument).body && o != u.documentElement && "visible" != d.overflow && (c = v(o)),
                            c && (a = c,
                            l = r,
                            c = d = u = s = void 0,
                            s = Math.max(a.top, l.top),
                            u = Math.min(a.bottom, l.bottom),
                            d = Math.max(a.left, l.left),
                            c = Math.min(a.right, l.right),
                            l = u - s,
                            r = 0 <= (a = c - d) && 0 <= l ? {
                                top: s,
                                bottom: u,
                                left: d,
                                right: c,
                                width: a,
                                height: l
                            } : null),
                            !r)
                                break;
                            o = o && g(o)
                        }
                        return r
                    }
                }
                ,
                e.prototype._getRootRect = function() {
                    var e, t;
                    return t = this.root && !s(this.root) ? v(this.root) : (e = (t = s(this.root) ? this.root : f).documentElement,
                    t = t.body,
                    {
                        top: 0,
                        left: 0,
                        right: e.clientWidth || t.clientWidth,
                        width: e.clientWidth || t.clientWidth,
                        bottom: e.clientHeight || t.clientHeight,
                        height: e.clientHeight || t.clientHeight
                    }),
                    this._expandRectByRootMargin(t)
                }
                ,
                e.prototype._expandRectByRootMargin = function(n) {
                    var e = this._rootMarginValues.map(function(e, t) {
                        return "px" == e.unit ? e.value : e.value * (t % 2 ? n.width : n.height) / 100
                    })
                      , e = {
                        top: n.top - e[0],
                        right: n.right + e[1],
                        bottom: n.bottom + e[2],
                        left: n.left - e[3]
                    };
                    return e.width = e.right - e.left,
                    e.height = e.bottom - e.top,
                    e
                }
                ,
                e.prototype._hasCrossedThreshold = function(e, t) {
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
                e.prototype._rootIsInDom = function() {
                    return !this.root || o(f, this.root)
                }
                ,
                e.prototype._rootContainsTarget = function(e) {
                    var t = this.root && (this.root.ownerDocument || this.root) || f;
                    return o(t, e) && (!this.root || t == e.ownerDocument)
                }
                ,
                e.prototype._registerInstance = function() {
                    n.indexOf(this) < 0 && n.push(this)
                }
                ,
                e.prototype._unregisterInstance = function() {
                    var e = n.indexOf(this);
                    -1 != e && n.splice(e, 1)
                }
                ,
                window.IntersectionObserver = e,
                window.IntersectionObserverEntry = u))
            }()
        },
        5250: function(O, N, R) {
            var k;
            /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
            O = R.nmd(O),
            function() {
                var Hi, zi = "Expected a function", Vi = "__lodash_hash_undefined__", Wi = "__lodash_placeholder__", qi = 128, Ji = 9007199254740991, $i = NaN, Ki = 4294967295, Yi = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Zi = "[object Arguments]", Qi = "[object Array]", Xi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", va = "[object Float32Array]", ha = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", Ia = "[object Uint8Array]", wa = "[object Uint8ClampedArray]", Sa = "[object Uint16Array]", Ea = "[object Uint32Array]", Pa = /\b__p \+= '';/g, Ca = /\b(__p \+=) '' \+/g, _a = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ta = /&(?:amp|lt|gt|quot|#39);/g, xa = /[&<>"']/g, Aa = RegExp(Ta.source), Oa = RegExp(xa.source), Na = /<%-([\s\S]+?)%>/g, Ra = /<%([\s\S]+?)%>/g, ka = /<%=([\s\S]+?)%>/g, Da = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, La = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ua = /[\\^$.*+?()[\]{}|]/g, Fa = RegExp(Ua.source), Ba = /^\s+/, n = /\s/, ja = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ga = /\{\n\/\* \[wrapped with (.+)\] \*/, Ha = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Va = /[()=,{}\[\]\/\s]/, Wa = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ja = /\w*$/, $a = /^[-+]0x[0-9a-f]+$/i, Ka = /^0b[01]+$/i, Ya = /^\[object .+?Constructor\]$/, Za = /^0o[0-7]+$/i, Qa = /^(?:0|[1-9]\d*)$/, Xa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", v = "[^" + e + l + f + r + o + i + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "[" + i + "]", w = "\\u200d", S = "(?:" + m + "|" + v + ")", l = "(?:" + I + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + h + ")" + "?", v = "[" + a + "]?", i = v + i + ("(?:" + w + "(?:" + [g, y, b].join("|") + ")" + v + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), E = RegExp(h + "(?=" + h + ")|" + u + i, "g"), ol = RegExp([I + "?" + m + "+" + r + "(?=" + [c, I, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, I + S, "$"].join("|") + ")", I + "?" + S + "+" + r, I + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), P = RegExp("[" + w + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
                sl[va] = sl[ha] = sl[ga] = sl[ya] = sl[ba] = sl[Ia] = sl[wa] = sl[Sa] = sl[Ea] = !0,
                sl[Zi] = sl[Qi] = sl[pa] = sl[Xi] = sl[ma] = sl[ea] = sl[ta] = sl[na] = sl[oa] = sl[ia] = sl[aa] = sl[sa] = sl[ua] = sl[ca] = sl[fa] = !1;
                var ul = {};
                ul[Zi] = ul[Qi] = ul[pa] = ul[ma] = ul[Xi] = ul[ea] = ul[va] = ul[ha] = ul[ga] = ul[ya] = ul[ba] = ul[oa] = ul[ia] = ul[aa] = ul[sa] = ul[ua] = ul[ca] = ul[da] = ul[Ia] = ul[wa] = ul[Sa] = ul[Ea] = !0,
                ul[ta] = ul[na] = ul[fa] = !1;
                var C = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }
                  , cl = parseFloat
                  , dl = parseInt
                  , t = "object" == typeof R.g && R.g && R.g.Object === Object && R.g
                  , a = "object" == typeof self && self && self.Object === Object && self
                  , fl = t || a || Function("return this")()
                  , a = N && !N.nodeType && N
                  , _ = a && O && !O.nodeType && O
                  , pl = _ && _.exports === a
                  , T = pl && t.process
                  , t = function() {
                    try {
                        var e = _ && _.require && _.require("util").types;
                        return e ? e : T && T.binding && T.binding("util")
                    } catch (e) {}
                }()
                  , ml = t && t.isArrayBuffer
                  , vl = t && t.isDate
                  , hl = t && t.isMap
                  , gl = t && t.isRegExp
                  , yl = t && t.isSet
                  , bl = t && t.isTypedArray;
                function Il(e, t, n) {
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
                function wl(e, t, n, r) {
                    for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
                        var a = e[o];
                        t(r, a, n(a), e)
                    }
                    return r
                }
                function Sl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function El(e, t) {
                    for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function Pl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (!t(e[n], n, e))
                            return !1;
                    return !0
                }
                function Cl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        t(a, n, e) && (i[o++] = a)
                    }
                    return i
                }
                function _l(e, t) {
                    return !!(null == e ? 0 : e.length) && -1 < Ll(e, t, 0)
                }
                function Tl(e, t, n) {
                    for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
                        if (n(t, e[r]))
                            return !0;
                    return !1
                }
                function xl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r; )
                        o[n] = t(e[n], n, e);
                    return o
                }
                function Al(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r; )
                        e[o + n] = t[n];
                    return e
                }
                function Ol(e, t, n, r) {
                    var o = -1
                      , i = null == e ? 0 : e.length;
                    for (r && i && (n = e[++o]); ++o < i; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Nl(e, t, n, r) {
                    var o = null == e ? 0 : e.length;
                    for (r && o && (n = e[--o]); o--; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Rl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var x = Bl("length");
                function kl(e, r, t) {
                    var o;
                    return t(e, function(e, t, n) {
                        if (r(e, t, n))
                            return o = t,
                            !1
                    }),
                    o
                }
                function Dl(e, t, n, r) {
                    for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
                        if (t(e[i], i, e))
                            return i;
                    return -1
                }
                function Ll(e, t, n) {
                    return t == t ? function(e, t, n) {
                        var r = n - 1
                          , o = e.length;
                        for (; ++r < o; )
                            if (e[r] === t)
                                return r;
                        return -1
                    }(e, t, n) : Dl(e, Ul, n)
                }
                function Ml(e, t, n, r) {
                    for (var o = n - 1, i = e.length; ++o < i; )
                        if (r(e[o], t))
                            return o;
                    return -1
                }
                function Ul(e) {
                    return e != e
                }
                function Fl(e, t) {
                    var n = null == e ? 0 : e.length;
                    return n ? Gl(e, t) / n : $i
                }
                function Bl(t) {
                    return function(e) {
                        return null == e ? Hi : e[t]
                    }
                }
                function A(t) {
                    return function(e) {
                        return null == t ? Hi : t[e]
                    }
                }
                function jl(e, r, o, i, t) {
                    return t(e, function(e, t, n) {
                        o = i ? (i = !1,
                        e) : r(o, e, t, n)
                    }),
                    o
                }
                function Gl(e, t) {
                    for (var n, r = -1, o = e.length; ++r < o; ) {
                        var i = t(e[r]);
                        i !== Hi && (n = n === Hi ? i : n + i)
                    }
                    return n
                }
                function Hl(e, t) {
                    for (var n = -1, r = Array(e); ++n < e; )
                        r[n] = t(n);
                    return r
                }
                function zl(e) {
                    return e && e.slice(0, is(e) + 1).replace(Ba, "")
                }
                function Vl(t) {
                    return function(e) {
                        return t(e)
                    }
                }
                function Wl(t, e) {
                    return xl(e, function(e) {
                        return t[e]
                    })
                }
                function ql(e, t) {
                    return e.has(t)
                }
                function Jl(e, t) {
                    for (var n = -1, r = e.length; ++n < r && -1 < Ll(t, e[n], 0); )
                        ;
                    return n
                }
                function $l(e, t) {
                    for (var n = e.length; n-- && -1 < Ll(t, e[n], 0); )
                        ;
                    return n
                }
                var Kl = A({
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
                  , Yl = A({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function Zl(e) {
                    return "\\" + C[e]
                }
                function Ql(e) {
                    return P.test(e)
                }
                function Xl(e) {
                    var n = -1
                      , r = Array(e.size);
                    return e.forEach(function(e, t) {
                        r[++n] = [t, e]
                    }),
                    r
                }
                function es(t, n) {
                    return function(e) {
                        return t(n(e))
                    }
                }
                function ts(e, t) {
                    for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        a !== t && a !== Wi || (e[n] = Wi,
                        i[o++] = n)
                    }
                    return i
                }
                function ns(e) {
                    var t = -1
                      , n = Array(e.size);
                    return e.forEach(function(e) {
                        n[++t] = e
                    }),
                    n
                }
                function rs(e) {
                    return (Ql(e) ? function(e) {
                        var t = E.lastIndex = 0;
                        for (; E.test(e); )
                            ++t;
                        return t
                    }
                    : x)(e)
                }
                function os(e) {
                    return Ql(e) ? e.match(E) || [] : e.split("")
                }
                function is(e) {
                    for (var t = e.length; t-- && n.test(e.charAt(t)); )
                        ;
                    return t
                }
                var as = A({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                });
                var ls = function e(t) {
                    var E = (t = null == t ? fl : ls.defaults(fl.Object(), t, ls.pick(fl, al))).Array
                      , n = t.Date
                      , d = t.Error
                      , f = t.Function
                      , o = t.Math
                      , v = t.Object
                      , p = t.RegExp
                      , c = t.String
                      , S = t.TypeError
                      , i = E.prototype
                      , r = f.prototype
                      , m = v.prototype
                      , a = t["__core-js_shared__"]
                      , l = r.toString
                      , y = m.hasOwnProperty
                      , s = 0
                      , u = (ki = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "")) ? "Symbol(src)_1." + ki : ""
                      , h = m.toString
                      , g = l.call(v)
                      , b = fl._
                      , I = p("^" + l.call(y).replace(Ua, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , w = pl ? t.Buffer : Hi
                      , P = t.Symbol
                      , C = t.Uint8Array
                      , _ = w ? w.allocUnsafe : Hi
                      , T = es(v.getPrototypeOf, v)
                      , x = v.create
                      , A = m.propertyIsEnumerable
                      , O = i.splice
                      , N = P ? P.isConcatSpreadable : Hi
                      , R = P ? P.iterator : Hi
                      , k = P ? P.toStringTag : Hi
                      , D = function() {
                        try {
                            var e = Hn(v, "defineProperty");
                            return e({}, "", {}),
                            e
                        } catch (e) {}
                    }()
                      , L = t.clearTimeout !== fl.clearTimeout && t.clearTimeout
                      , M = n && n.now !== fl.Date.now && n.now
                      , U = t.setTimeout !== fl.setTimeout && t.setTimeout
                      , F = o.ceil
                      , B = o.floor
                      , j = v.getOwnPropertySymbols
                      , G = w ? w.isBuffer : Hi
                      , H = t.isFinite
                      , z = i.join
                      , V = es(v.keys, v)
                      , W = o.max
                      , q = o.min
                      , J = n.now
                      , $ = t.parseInt
                      , K = o.random
                      , Y = i.reverse
                      , Z = Hn(t, "DataView")
                      , Q = Hn(t, "Map")
                      , X = Hn(t, "Promise")
                      , ee = Hn(t, "Set")
                      , te = Hn(t, "WeakMap")
                      , ne = Hn(v, "create")
                      , re = te && new te
                      , oe = {}
                      , ie = hr(Z)
                      , ae = hr(Q)
                      , le = hr(X)
                      , se = hr(ee)
                      , ue = hr(te)
                      , ce = P ? P.prototype : Hi
                      , de = ce ? ce.valueOf : Hi
                      , fe = ce ? ce.toString : Hi;
                    function pe(e) {
                        if (Do(e) && !Eo(e) && !(e instanceof ye)) {
                            if (e instanceof ge)
                                return e;
                            if (y.call(e, "__wrapped__"))
                                return gr(e)
                        }
                        return new ge(e)
                    }
                    var me = function(e) {
                        if (!ko(e))
                            return {};
                        if (x)
                            return x(e);
                        ve.prototype = e;
                        e = new ve;
                        return ve.prototype = Hi,
                        e
                    };
                    function ve() {}
                    function he() {}
                    function ge(e, t) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__chain__ = !!t,
                        this.__index__ = 0,
                        this.__values__ = Hi
                    }
                    function ye(e) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__dir__ = 1,
                        this.__filtered__ = !1,
                        this.__iteratees__ = [],
                        this.__takeCount__ = Ki,
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
                    function Ie(e) {
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
                    function Ee(e) {
                        e = this.__data__ = new Ie(e);
                        this.size = e.size
                    }
                    function Pe(e, t) {
                        var n, r = Eo(e), o = !r && So(e), i = !r && !o && To(e), a = !r && !o && !i && Ho(e), l = r || o || i || a, s = l ? Hl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Kn(n, u)) || s.push(n);
                        return s
                    }
                    function Ce(e) {
                        var t = e.length;
                        return t ? e[St(0, t - 1)] : Hi
                    }
                    function _e(e, t) {
                        return dr(rn(e), Le(t, 0, e.length))
                    }
                    function Te(e) {
                        return dr(rn(e))
                    }
                    function xe(e, t, n) {
                        (n === Hi || bo(e[t], n)) && (n !== Hi || t in e) || ke(e, t, n)
                    }
                    function Ae(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== Hi || t in e) || ke(e, t, n)
                    }
                    function Oe(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Ne(e, r, o, i) {
                        return je(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function Re(e, t) {
                        return e && on(t, ci(t), e)
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
                        for (var n = -1, r = t.length, o = E(r), i = null == e; ++n < r; )
                            o[n] = i ? Hi : ii(e, t[n]);
                        return o
                    }
                    function Le(e, t, n) {
                        return e == e && (n !== Hi && (e = e <= n ? e : n),
                        t !== Hi && (e = t <= e ? e : t)),
                        e
                    }
                    function Me(n, r, o, e, t, i) {
                        var a, l = 1 & r, s = 2 & r, u = 4 & r;
                        if (o && (a = t ? o(n, e, t, i) : o(n)),
                        a !== Hi)
                            return a;
                        if (!ko(n))
                            return n;
                        var c, d, f = Eo(n);
                        if (f) {
                            if (a = function(e) {
                                var t = e.length
                                  , n = new e.constructor(t);
                                t && "string" == typeof e[0] && y.call(e, "index") && (n.index = e.index,
                                n.input = e.input);
                                return n
                            }(n),
                            !l)
                                return rn(n, a)
                        } else {
                            var p = Wn(n)
                              , e = p == na || p == ra;
                            if (To(n))
                                return Zt(n, l);
                            if (p == aa || p == Zi || e && !t) {
                                if (a = s || e ? {} : Jn(n),
                                !l)
                                    return s ? (e = c = n,
                                    d = (d = a) && on(e, di(e), d),
                                    on(c, Vn(c), d)) : (d = Re(a, c = n),
                                    on(c, zn(c), d))
                            } else {
                                if (!ul[p])
                                    return t ? n : {};
                                a = function(e, t, n) {
                                    var r = e.constructor;
                                    switch (t) {
                                    case pa:
                                        return Qt(e);
                                    case Xi:
                                    case ea:
                                        return new r(+e);
                                    case ma:
                                        return function(e, t) {
                                            t = t ? Qt(e.buffer) : e.buffer;
                                            return new e.constructor(t,e.byteOffset,e.byteLength)
                                        }(e, n);
                                    case va:
                                    case ha:
                                    case ga:
                                    case ya:
                                    case ba:
                                    case Ia:
                                    case wa:
                                    case Sa:
                                    case Ea:
                                        return Xt(e, n);
                                    case oa:
                                        return new r;
                                    case ia:
                                    case ca:
                                        return new r(e);
                                    case sa:
                                        return function(e) {
                                            var t = new e.constructor(e.source,Ja.exec(e));
                                            return t.lastIndex = e.lastIndex,
                                            t
                                        }(e);
                                    case ua:
                                        return new r;
                                    case da:
                                        return function(e) {
                                            return de ? v(de.call(e)) : {}
                                        }(e)
                                    }
                                }(n, p, l)
                            }
                        }
                        l = (i = i || new Ee).get(n);
                        if (l)
                            return l;
                        i.set(n, a),
                        Bo(n) ? n.forEach(function(e) {
                            a.add(Me(e, r, o, e, n, i))
                        }) : Lo(n) && n.forEach(function(e, t) {
                            a.set(t, Me(e, r, o, t, n, i))
                        });
                        var m = f ? Hi : (u ? s ? Ln : Dn : s ? di : ci)(n);
                        return Sl(m || n, function(e, t) {
                            m && (e = n[t = e]),
                            Ae(a, t, Me(e, r, o, t, n, i))
                        }),
                        a
                    }
                    function Ue(e, t, n) {
                        var r = n.length;
                        if (null == e)
                            return !r;
                        for (e = v(e); r--; ) {
                            var o = n[r]
                              , i = t[o]
                              , a = e[o];
                            if (a === Hi && !(o in e) || !i(a))
                                return !1
                        }
                        return !0
                    }
                    function Fe(e, t, n) {
                        if ("function" != typeof e)
                            throw new S(zi);
                        return lr(function() {
                            e.apply(Hi, n)
                        }, t)
                    }
                    function Be(e, t, n, r) {
                        var o = -1
                          , i = _l
                          , a = !0
                          , l = e.length
                          , s = []
                          , u = t.length;
                        if (!l)
                            return s;
                        n && (t = xl(t, Vl(n))),
                        r ? (i = Tl,
                        a = !1) : 200 <= t.length && (i = ql,
                        a = !1,
                        t = new Se(t));
                        e: for (; ++o < l; ) {
                            var c = e[o]
                              , d = null == n ? c : n(c)
                              , c = r || 0 !== c ? c : 0;
                            if (a && d == d) {
                                for (var f = u; f--; )
                                    if (t[f] === d)
                                        continue e;
                                s.push(c)
                            } else
                                i(t, d, r) || s.push(c)
                        }
                        return s
                    }
                    pe.templateSettings = {
                        escape: Na,
                        evaluate: Ra,
                        interpolate: ka,
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
                            return n === Vi ? Hi : n
                        }
                        return y.call(t, e) ? t[e] : Hi
                    }
                    ,
                    be.prototype.has = function(e) {
                        var t = this.__data__;
                        return ne ? t[e] !== Hi : y.call(t, e)
                    }
                    ,
                    be.prototype.set = function(e, t) {
                        var n = this.__data__;
                        return this.size += this.has(e) ? 0 : 1,
                        n[e] = ne && t === Hi ? Vi : t,
                        this
                    }
                    ,
                    Ie.prototype.clear = function() {
                        this.__data__ = [],
                        this.size = 0
                    }
                    ,
                    Ie.prototype.delete = function(e) {
                        var t = this.__data__;
                        return !((e = Oe(t, e)) < 0) && (e == t.length - 1 ? t.pop() : O.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = Oe(t, e)) < 0 ? Hi : t[e][1]
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return -1 < Oe(this.__data__, e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = Oe(n, e);
                        return r < 0 ? (++this.size,
                        n.push([e, t])) : n[r][1] = t,
                        this
                    }
                    ,
                    we.prototype.clear = function() {
                        this.size = 0,
                        this.__data__ = {
                            hash: new be,
                            map: new (Q || Ie),
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
                        return this.__data__.set(e, Vi),
                        this
                    }
                    ,
                    Se.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ee.prototype.clear = function() {
                        this.__data__ = new Ie,
                        this.size = 0
                    }
                    ,
                    Ee.prototype.delete = function(e) {
                        var t = this.__data__
                          , e = t.delete(e);
                        return this.size = t.size,
                        e
                    }
                    ,
                    Ee.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    Ee.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ee.prototype.set = function(e, t) {
                        var n = this.__data__;
                        if (n instanceof Ie) {
                            var r = n.__data__;
                            if (!Q || r.length < 199)
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
                    var je = sn($e)
                      , Ge = sn(Ke, !0);
                    function He(e, r) {
                        var o = !0;
                        return je(e, function(e, t, n) {
                            return o = !!r(e, t, n)
                        }),
                        o
                    }
                    function ze(e, t, n) {
                        for (var r = -1, o = e.length; ++r < o; ) {
                            var i, a, l = e[r], s = t(l);
                            null != s && (i === Hi ? s == s && !Go(s) : n(s, i)) && (i = s,
                            a = l)
                        }
                        return a
                    }
                    function Ve(e, r) {
                        var o = [];
                        return je(e, function(e, t, n) {
                            r(e, t, n) && o.push(e)
                        }),
                        o
                    }
                    function We(e, t, n, r, o) {
                        var i = -1
                          , a = e.length;
                        for (n = n || $n,
                        o = o || []; ++i < a; ) {
                            var l = e[i];
                            0 < t && n(l) ? 1 < t ? We(l, t - 1, n, r, o) : Al(o, l) : r || (o[o.length] = l)
                        }
                        return o
                    }
                    var qe = un()
                      , Je = un(!0);
                    function $e(e, t) {
                        return e && qe(e, t, ci)
                    }
                    function Ke(e, t) {
                        return e && Je(e, t, ci)
                    }
                    function Ye(t, e) {
                        return Cl(e, function(e) {
                            return Oo(t[e])
                        })
                    }
                    function Ze(e, t) {
                        for (var n = 0, r = (t = Jt(t, e)).length; null != e && n < r; )
                            e = e[vr(t[n++])];
                        return n && n == r ? e : Hi
                    }
                    function Qe(e, t, n) {
                        t = t(e);
                        return Eo(e) ? t : Al(t, n(e))
                    }
                    function Xe(e) {
                        return null == e ? e === Hi ? "[object Undefined]" : "[object Null]" : k && k in v(e) ? function(e) {
                            var t = y.call(e, k)
                              , n = e[k];
                            try {
                                e[k] = Hi;
                                var r = !0
                            } catch (e) {}
                            var o = h.call(e);
                            r && (t ? e[k] = n : delete e[k]);
                            return o
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
                        for (var r = n ? Tl : _l, o = e[0].length, i = e.length, a = i, l = E(i), s = 1 / 0, u = []; a--; ) {
                            var c = e[a];
                            a && t && (c = xl(c, Vl(t))),
                            s = q(c.length, s),
                            l[a] = !n && (t || 120 <= o && 120 <= c.length) ? new Se(a && c) : Hi
                        }
                        c = e[0];
                        var d = -1
                          , f = l[0];
                        e: for (; ++d < o && u.length < s; ) {
                            var p = c[d]
                              , m = t ? t(p) : p
                              , p = n || 0 !== p ? p : 0;
                            if (!(f ? ql(f, m) : r(u, m, n))) {
                                for (a = i; --a; ) {
                                    var v = l[a];
                                    if (!(v ? ql(v, m) : r(e[a], m, n)))
                                        continue e
                                }
                                f && f.push(m),
                                u.push(p)
                            }
                        }
                        return u
                    }
                    function ot(e, t, n) {
                        t = null == (e = or(e, t = Jt(t, e))) ? e : e[vr(xr(t))];
                        return null == t ? Hi : Il(t, e, n)
                    }
                    function it(e) {
                        return Do(e) && Xe(e) == Zi
                    }
                    function at(e, t, n, r, o) {
                        return e === t || (null == e || null == t || !Do(e) && !Do(t) ? e != e && t != t : function(e, t, n, r, o, i) {
                            var a = Eo(e)
                              , l = Eo(t)
                              , s = a ? Qi : Wn(e)
                              , u = l ? Qi : Wn(t)
                              , c = (s = s == Zi ? aa : s) == aa
                              , l = (u = u == Zi ? aa : u) == aa
                              , u = s == u;
                            if (u && To(e)) {
                                if (!To(t))
                                    return !1;
                                c = !(a = !0)
                            }
                            if (u && !c)
                                return i = i || new Ee,
                                a || Ho(e) ? Rn(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
                                    switch (n) {
                                    case ma:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                                            return !1;
                                        e = e.buffer,
                                        t = t.buffer;
                                    case pa:
                                        return e.byteLength == t.byteLength && i(new C(e), new C(t)) ? !0 : !1;
                                    case Xi:
                                    case ea:
                                    case ia:
                                        return bo(+e, +t);
                                    case ta:
                                        return e.name == t.name && e.message == t.message;
                                    case sa:
                                    case ca:
                                        return e == t + "";
                                    case oa:
                                        var l = Xl;
                                    case ua:
                                        var s = 1 & r;
                                        if (l = l || ns,
                                        e.size != t.size && !s)
                                            return !1;
                                        s = a.get(e);
                                        if (s)
                                            return s == t;
                                        r |= 2,
                                        a.set(e, t);
                                        l = Rn(l(e), l(t), r, o, i, a);
                                        return a.delete(e),
                                        l;
                                    case da:
                                        if (de)
                                            return de.call(e) == de.call(t)
                                    }
                                    return !1
                                }(e, t, s, n, r, o, i);
                            if (!(1 & n)) {
                                c = c && y.call(e, "__wrapped__"),
                                l = l && y.call(t, "__wrapped__");
                                if (c || l) {
                                    c = c ? e.value() : e,
                                    l = l ? t.value() : t;
                                    return i = i || new Ee,
                                    o(c, l, n, r, i)
                                }
                            }
                            return u && (i = i || new Ee,
                            function(e, t, n, r, o, i) {
                                var a = 1 & n
                                  , l = Dn(e)
                                  , s = l.length
                                  , u = Dn(t).length;
                                if (s != u && !a)
                                    return !1;
                                var c = s;
                                for (; c--; ) {
                                    var d = l[c];
                                    if (!(a ? d in t : y.call(t, d)))
                                        return !1
                                }
                                var f = i.get(e)
                                  , u = i.get(t);
                                if (f && u)
                                    return f == t && u == e;
                                var p = !0;
                                i.set(e, t),
                                i.set(t, e);
                                var m = a;
                                for (; ++c < s; ) {
                                    d = l[c];
                                    var v, h = e[d], g = t[d];
                                    if (r && (v = a ? r(g, h, d, t, e, i) : r(h, g, d, e, t, i)),
                                    !(v === Hi ? h === g || o(h, g, n, r, i) : v)) {
                                        p = !1;
                                        break
                                    }
                                    m = m || "constructor" == d
                                }
                                p && !m && (f = e.constructor,
                                u = t.constructor,
                                f != u && "constructor"in e && "constructor"in t && !("function" == typeof f && f instanceof f && "function" == typeof u && u instanceof u) && (p = !1));
                                return i.delete(e),
                                i.delete(t),
                                p
                            }(e, t, n, r, o, i))
                        }(e, t, n, r, at, o))
                    }
                    function lt(e, t, n, r) {
                        var o = n.length
                          , i = o
                          , a = !r;
                        if (null == e)
                            return !i;
                        for (e = v(e); o--; ) {
                            var l = n[o];
                            if (a && l[2] ? l[1] !== e[l[0]] : !(l[0]in e))
                                return !1
                        }
                        for (; ++o < i; ) {
                            var s = (l = n[o])[0]
                              , u = e[s]
                              , c = l[1];
                            if (a && l[2]) {
                                if (u === Hi && !(s in e))
                                    return !1
                            } else {
                                var d, f = new Ee;
                                if (r && (d = r(u, c, s, e, t, f)),
                                !(d === Hi ? at(c, u, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function st(e) {
                        return !(!ko(e) || (t = e,
                        u && u in t)) && (Oo(e) ? I : Ya).test(hr(e));
                        var t
                    }
                    function ut(e) {
                        return "function" == typeof e ? e : null == e ? Di : "object" == typeof e ? Eo(e) ? vt(e[0], e[1]) : mt(e) : Fi(e)
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
                        if (!ko(e))
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
                        var o = -1
                          , i = Co(e) ? E(e.length) : [];
                        return je(e, function(e, t, n) {
                            i[++o] = r(e, t, n)
                        }),
                        i
                    }
                    function mt(t) {
                        var n = Gn(t);
                        return 1 == n.length && n[0][2] ? nr(n[0][0], n[0][1]) : function(e) {
                            return e === t || lt(e, t, n)
                        }
                    }
                    function vt(n, r) {
                        return Zn(n) && tr(r) ? nr(vr(n), r) : function(e) {
                            var t = ii(e, n);
                            return t === Hi && t === r ? ai(e, n) : at(r, t, 3)
                        }
                    }
                    function ht(r, o, i, a, l) {
                        r !== o && qe(o, function(e, t) {
                            var n;
                            l = l || new Ee,
                            ko(e) ? function(e, t, n, r, o, i, a) {
                                var l = ir(e, n)
                                  , s = ir(t, n)
                                  , u = a.get(s);
                                if (u)
                                    return xe(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : Hi, f = d === Hi;
                                f && (c = Eo(s),
                                u = !c && To(s),
                                t = !c && !u && Ho(s),
                                d = s,
                                c || u || t ? d = Eo(l) ? l : _o(l) ? rn(l) : u ? Zt(s, !(f = !1)) : t ? Xt(s, !(f = !1)) : [] : Uo(s) || So(s) ? So(d = l) ? d = Yo(l) : ko(l) && !Oo(l) || (d = Jn(s)) : f = !1),
                                f && (a.set(s, d),
                                o(d, s, r, i, a),
                                a.delete(s)),
                                xe(e, n, d)
                            }(r, o, t, i, ht, a, l) : ((n = a ? a(ir(r, t), e, t + "", r, o, l) : Hi) === Hi && (n = e),
                            xe(r, t, n))
                        }, di)
                    }
                    function gt(e, t) {
                        var n = e.length;
                        if (n)
                            return Kn(t += t < 0 ? n : 0, n) ? e[t] : Hi
                    }
                    function yt(e, r, n) {
                        r = r.length ? xl(r, function(t) {
                            return Eo(t) ? function(e) {
                                return Ze(e, 1 === t.length ? t[0] : t)
                            }
                            : t
                        }) : [Di];
                        var o = -1;
                        return r = xl(r, Vl(Bn())),
                        function(e, t) {
                            var n = e.length;
                            for (e.sort(t); n--; )
                                e[n] = e[n].value;
                            return e
                        }(pt(e, function(t, e, n) {
                            return {
                                criteria: xl(r, function(e) {
                                    return e(t)
                                }),
                                index: ++o,
                                value: t
                            }
                        }), function(e, t) {
                            return function(e, t, n) {
                                var r = -1
                                  , o = e.criteria
                                  , i = t.criteria
                                  , a = o.length
                                  , l = n.length;
                                for (; ++r < a; ) {
                                    var s = en(o[r], i[r]);
                                    if (s) {
                                        if (l <= r)
                                            return s;
                                        var u = n[r];
                                        return s * ("desc" == u ? -1 : 1)
                                    }
                                }
                                return e.index - t.index
                            }(e, t, n)
                        })
                    }
                    function bt(e, t, n) {
                        for (var r = -1, o = t.length, i = {}; ++r < o; ) {
                            var a = t[r]
                              , l = Ze(e, a);
                            n(l, a) && Tt(i, Jt(a, e), l)
                        }
                        return i
                    }
                    function It(e, t, n, r) {
                        var o = r ? Ml : Ll
                          , i = -1
                          , a = t.length
                          , l = e;
                        for (e === t && (t = rn(t)),
                        n && (l = xl(e, Vl(n))); ++i < a; )
                            for (var s = 0, u = t[i], c = n ? n(u) : u; -1 < (s = o(l, c, s, r)); )
                                l !== e && O.call(l, s, 1),
                                O.call(e, s, 1);
                        return e
                    }
                    function wt(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || (Kn(o = i) ? O.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function St(e, t) {
                        return e + B(K() * (t - e + 1))
                    }
                    function Et(e, t) {
                        var n = "";
                        if (!e || t < 1 || Ji < t)
                            return n;
                        for (; t % 2 && (n += e),
                        (t = B(t / 2)) && (e += e),
                        t; )
                            ;
                        return n
                    }
                    function Pt(e, t) {
                        return sr(rr(e, t, Di), e + "")
                    }
                    function Ct(e) {
                        return Ce(bi(e))
                    }
                    function _t(e, t) {
                        e = bi(e);
                        return dr(e, Le(t, 0, e.length))
                    }
                    function Tt(e, t, n, r) {
                        if (!ko(e))
                            return e;
                        for (var o = -1, i = (t = Jt(t, e)).length, a = i - 1, l = e; null != l && ++o < i; ) {
                            var s, u = vr(t[o]), c = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u)
                                return e;
                            o != a && (s = l[u],
                            (c = r ? r(s, u, l) : Hi) === Hi && (c = ko(s) ? s : Kn(t[o + 1]) ? [] : {})),
                            Ae(l, u, c),
                            l = l[u]
                        }
                        return e
                    }
                    var xt = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : Di
                      , At = D ? function(e, t) {
                        return D(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Ri(t),
                            writable: !0
                        })
                    }
                    : Di;
                    function Ot(e) {
                        return dr(bi(e))
                    }
                    function Nt(e, t, n) {
                        var r = -1
                          , o = e.length;
                        t < 0 && (t = o < -t ? 0 : o + t),
                        (n = o < n ? o : n) < 0 && (n += o),
                        o = n < t ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var i = E(o); ++r < o; )
                            i[r] = e[r + t];
                        return i
                    }
                    function Rt(e, r) {
                        var o;
                        return je(e, function(e, t, n) {
                            return !(o = r(e, t, n))
                        }),
                        !!o
                    }
                    function kt(e, t, n) {
                        var r = 0
                          , o = null == e ? r : e.length;
                        if ("number" == typeof t && t == t && o <= 2147483647) {
                            for (; r < o; ) {
                                var i = r + o >>> 1
                                  , a = e[i];
                                null !== a && !Go(a) && (n ? a <= t : a < t) ? r = 1 + i : o = i
                            }
                            return o
                        }
                        return Dt(e, t, Di, n)
                    }
                    function Dt(e, t, n, r) {
                        var o = 0
                          , i = null == e ? 0 : e.length;
                        if (0 === i)
                            return 0;
                        for (var a = (t = n(t)) != t, l = null === t, s = Go(t), u = t === Hi; o < i; ) {
                            var c = B((o + i) / 2)
                              , d = n(e[c])
                              , f = d !== Hi
                              , p = null === d
                              , m = d == d
                              , v = Go(d)
                              , d = a ? r || m : u ? m && (r || f) : l ? m && f && (r || !p) : s ? m && f && !p && (r || !v) : !p && !v && (r ? d <= t : d < t);
                            d ? o = c + 1 : i = c
                        }
                        return q(i, 4294967294)
                    }
                    function Lt(e, t) {
                        for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                            var a, l = e[n], s = t ? t(l) : l;
                            n && bo(s, a) || (a = s,
                            i[o++] = 0 === l ? 0 : l)
                        }
                        return i
                    }
                    function Mt(e) {
                        return "number" == typeof e ? e : Go(e) ? $i : +e
                    }
                    function Ut(e) {
                        if ("string" == typeof e)
                            return e;
                        if (Eo(e))
                            return xl(e, Ut) + "";
                        if (Go(e))
                            return fe ? fe.call(e) : "";
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function Ft(e, t, n) {
                        var r = -1
                          , o = _l
                          , i = e.length
                          , a = !0
                          , l = []
                          , s = l;
                        if (n)
                            a = !1,
                            o = Tl;
                        else if (200 <= i) {
                            var u = t ? null : _n(e);
                            if (u)
                                return ns(u);
                            a = !1,
                            o = ql,
                            s = new Se
                        } else
                            s = t ? [] : l;
                        e: for (; ++r < i; ) {
                            var c = e[r]
                              , d = t ? t(c) : c
                              , c = n || 0 !== c ? c : 0;
                            if (a && d == d) {
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
                    function Bt(e, t) {
                        return null == (e = or(e, t = Jt(t, e))) || delete e[vr(xr(t))]
                    }
                    function jt(e, t, n, r) {
                        return Tt(e, t, n(Ze(e, t)), r)
                    }
                    function Gt(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? Nt(e, r ? 0 : i, r ? i + 1 : o) : Nt(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        Ol(t, function(e, t) {
                            return t.func.apply(t.thisArg, Al([e], t.args))
                        }, e)
                    }
                    function zt(e, t, n) {
                        var r = e.length;
                        if (r < 2)
                            return r ? Ft(e[0]) : [];
                        for (var o = -1, i = E(r); ++o < r; )
                            for (var a = e[o], l = -1; ++l < r; )
                                l != o && (i[o] = Be(i[o] || a, e[l], t, n));
                        return Ft(We(i, 1), t, n)
                    }
                    function Vt(e, t, n) {
                        for (var r = -1, o = e.length, i = t.length, a = {}; ++r < o; ) {
                            var l = r < i ? t[r] : Hi;
                            n(a, e[r], l)
                        }
                        return a
                    }
                    function Wt(e) {
                        return _o(e) ? e : []
                    }
                    function qt(e) {
                        return "function" == typeof e ? e : Di
                    }
                    function Jt(e, t) {
                        return Eo(e) ? e : Zn(e, t) ? [e] : mr(Zo(e))
                    }
                    var $t = Pt;
                    function Kt(e, t, n) {
                        var r = e.length;
                        return n = n === Hi ? r : n,
                        !t && r <= n ? e : Nt(e, t, n)
                    }
                    var Yt = L || function(e) {
                        return fl.clearTimeout(e)
                    }
                    ;
                    function Zt(e, t) {
                        if (t)
                            return e.slice();
                        t = e.length,
                        t = _ ? _(t) : new e.constructor(t);
                        return e.copy(t),
                        t
                    }
                    function Qt(e) {
                        var t = new e.constructor(e.byteLength);
                        return new C(t).set(new C(e)),
                        t
                    }
                    function Xt(e, t) {
                        t = t ? Qt(e.buffer) : e.buffer;
                        return new e.constructor(t,e.byteOffset,e.length)
                    }
                    function en(e, t) {
                        if (e !== t) {
                            var n = e !== Hi
                              , r = null === e
                              , o = e == e
                              , i = Go(e)
                              , a = t !== Hi
                              , l = null === t
                              , s = t == t
                              , u = Go(t);
                            if (!l && !u && !i && t < e || i && a && s && !l && !u || r && a && s || !n && s || !o)
                                return 1;
                            if (!r && !i && !u && e < t || u && n && o && !r && !i || l && n && o || !a && o || !s)
                                return -1
                        }
                        return 0
                    }
                    function tn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = n.length, l = -1, s = t.length, u = W(i - a, 0), c = E(s + u), d = !r; ++l < s; )
                            c[l] = t[l];
                        for (; ++o < a; )
                            (d || o < i) && (c[n[o]] = e[o]);
                        for (; u--; )
                            c[l++] = e[o++];
                        return c
                    }
                    function nn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = -1, l = n.length, s = -1, u = t.length, c = W(i - l, 0), d = E(c + u), f = !r; ++o < c; )
                            d[o] = e[o];
                        for (var p = o; ++s < u; )
                            d[p + s] = t[s];
                        for (; ++a < l; )
                            (f || o < i) && (d[p + n[a]] = e[o++]);
                        return d
                    }
                    function rn(e, t) {
                        var n = -1
                          , r = e.length;
                        for (t = t || E(r); ++n < r; )
                            t[n] = e[n];
                        return t
                    }
                    function on(e, t, n, r) {
                        var o = !n;
                        n = n || {};
                        for (var i = -1, a = t.length; ++i < a; ) {
                            var l = t[i]
                              , s = r ? r(n[l], e[l], l, n, e) : Hi;
                            s === Hi && (s = e[l]),
                            (o ? ke : Ae)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = Eo(e) ? wl : Ne
                              , r = i ? i() : {};
                            return n(e, o, Bn(t, 2), r)
                        }
                    }
                    function ln(l) {
                        return Pt(function(e, t) {
                            var n = -1
                              , r = t.length
                              , o = 1 < r ? t[r - 1] : Hi
                              , i = 2 < r ? t[2] : Hi
                              , o = 3 < l.length && "function" == typeof o ? (r--,
                            o) : Hi;
                            for (i && Yn(t[0], t[1], i) && (o = r < 3 ? Hi : o,
                            r = 1),
                            e = v(e); ++n < r; ) {
                                var a = t[n];
                                a && l(e, a, n, o)
                            }
                            return e
                        })
                    }
                    function sn(i, a) {
                        return function(e, t) {
                            if (null == e)
                                return e;
                            if (!Co(e))
                                return i(e, t);
                            for (var n = e.length, r = a ? n : -1, o = v(e); (a ? r-- : ++r < n) && !1 !== t(o[r], r, o); )
                                ;
                            return e
                        }
                    }
                    function un(s) {
                        return function(e, t, n) {
                            for (var r = -1, o = v(e), i = n(e), a = i.length; a--; ) {
                                var l = i[s ? a : ++r];
                                if (!1 === t(o[l], l, o))
                                    break
                            }
                            return e
                        }
                    }
                    function cn(r) {
                        return function(e) {
                            var t = Ql(e = Zo(e)) ? os(e) : Hi
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? Kt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return Ol(Oi(Si(e).replace(nl, "")), t, "")
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
                            return ko(n) ? n : t
                        }
                    }
                    function pn(i, a, l) {
                        var s = fn(i);
                        return function e() {
                            for (var t = arguments.length, n = E(t), r = t, o = Fn(e); r--; )
                                n[r] = arguments[r];
                            o = t < 3 && n[0] !== o && n[t - 1] !== o ? [] : ts(n, o);
                            return (t -= o.length) < l ? Pn(i, a, hn, e.placeholder, Hi, n, o, Hi, Hi, l - t) : Il(this && this !== fl && this instanceof e ? s : i, this, n)
                        }
                    }
                    function mn(i) {
                        return function(e, t, n) {
                            var r, o = v(e);
                            Co(e) || (r = Bn(t, 3),
                            e = ci(e),
                            t = function(e) {
                                return r(o[e], e, o)
                            }
                            );
                            n = i(e, t, n);
                            return -1 < n ? o[r ? e[n] : n] : Hi
                        }
                    }
                    function vn(s) {
                        return kn(function(o) {
                            var i = o.length
                              , e = i
                              , t = ge.prototype.thru;
                            for (s && o.reverse(); e--; ) {
                                var n = o[e];
                                if ("function" != typeof n)
                                    throw new S(zi);
                                t && !l && "wrapper" == Un(n) && (l = new ge([],!0))
                            }
                            for (e = l ? e : i; ++e < i; )
                                var r = Un(n = o[e])
                                  , a = "wrapper" == r ? Mn(n) : Hi
                                  , l = a && Qn(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9] ? l[Un(a[0])].apply(l, a[3]) : 1 == n.length && Qn(n) ? l[r]() : l.thru(n);
                            return function() {
                                var e = arguments
                                  , t = e[0];
                                if (l && 1 == e.length && Eo(t))
                                    return l.plant(t).value();
                                for (var n = 0, r = i ? o[n].apply(this, e) : t; ++n < i; )
                                    r = o[n].call(this, r);
                                return r
                            }
                        })
                    }
                    function hn(l, s, u, c, d, f, p, m, v, h) {
                        var g = s & qi
                          , y = 1 & s
                          , b = 2 & s
                          , I = 24 & s
                          , w = 512 & s
                          , S = b ? Hi : fn(l);
                        return function e() {
                            for (var t, n = E(a = arguments.length), r = a; r--; )
                                n[r] = arguments[r];
                            if (I && (t = function(e, t) {
                                for (var n = e.length, r = 0; n--; )
                                    e[n] === t && ++r;
                                return r
                            }(n, i = Fn(e))),
                            c && (n = tn(n, c, d, I)),
                            f && (n = nn(n, f, p, I)),
                            a -= t,
                            I && a < h) {
                                var o = ts(n, i);
                                return Pn(l, s, hn, e.placeholder, u, n, o, m, v, h - a)
                            }
                            var i = y ? u : this
                              , o = b ? i[l] : l
                              , a = n.length;
                            return m ? n = function(e, t) {
                                for (var n = e.length, r = q(t.length, n), o = rn(e); r--; ) {
                                    var i = t[r];
                                    e[r] = Kn(i, n) ? o[i] : Hi
                                }
                                return e
                            }(n, m) : w && 1 < a && n.reverse(),
                            g && v < a && (n.length = v),
                            this && this !== fl && this instanceof e && (o = S || fn(o)),
                            o.apply(i, n)
                        }
                    }
                    function gn(n, a) {
                        return function(e, t) {
                            return e = e,
                            r = n,
                            o = a(t),
                            i = {},
                            $e(e, function(e, t, n) {
                                r(i, o(e), t, n)
                            }),
                            i;
                            var r, o, i
                        }
                    }
                    function yn(r, o) {
                        return function(e, t) {
                            var n;
                            if (e === Hi && t === Hi)
                                return o;
                            if (e !== Hi && (n = e),
                            t !== Hi) {
                                if (n === Hi)
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
                            return e = xl(e, Vl(Bn())),
                            Pt(function(t) {
                                var n = this;
                                return r(e, function(e) {
                                    return Il(e, n, t)
                                })
                            })
                        })
                    }
                    function In(e, t) {
                        var n = (t = t === Hi ? " " : Ut(t)).length;
                        if (n < 2)
                            return n ? Et(t, e) : t;
                        n = Et(t, F(e / rs(t)));
                        return Ql(t) ? Kt(os(n), 0, e).join("") : n.slice(0, e)
                    }
                    function wn(l, e, s, u) {
                        var c = 1 & e
                          , d = fn(l);
                        return function e() {
                            for (var t = -1, n = arguments.length, r = -1, o = u.length, i = E(o + n), a = this && this !== fl && this instanceof e ? d : l; ++r < o; )
                                i[r] = u[r];
                            for (; n--; )
                                i[r++] = arguments[++t];
                            return Il(a, c ? s : this, i)
                        }
                    }
                    function Sn(r) {
                        return function(e, t, n) {
                            return n && "number" != typeof n && Yn(e, t, n) && (t = n = Hi),
                            e = qo(e),
                            t === Hi ? (t = e,
                            e = 0) : t = qo(t),
                            function(e, t, n, r) {
                                for (var o = -1, i = W(F((t - e) / (n || 1)), 0), a = E(i); i--; )
                                    a[r ? i : ++o] = e,
                                    e += n;
                                return a
                            }(e, t, n = n === Hi ? e < t ? 1 : -1 : qo(n), r)
                        }
                    }
                    function En(n) {
                        return function(e, t) {
                            return "string" == typeof e && "string" == typeof t || (e = Ko(e),
                            t = Ko(t)),
                            n(e, t)
                        }
                    }
                    function Pn(e, t, n, r, o, i, a, l, s, u) {
                        var c = 8 & t;
                        t |= c ? 32 : 64,
                        4 & (t &= ~(c ? 64 : 32)) || (t &= -4);
                        u = [e, t, o, c ? i : Hi, c ? a : Hi, c ? Hi : i, c ? Hi : a, l, s, u],
                        n = n.apply(Hi, u);
                        return Qn(e) && ar(n, u),
                        n.placeholder = r,
                        ur(n, e, t)
                    }
                    function Cn(e) {
                        var r = o[e];
                        return function(e, t) {
                            if (e = Ko(e),
                            (t = null == t ? 0 : q(Jo(t), 292)) && H(e)) {
                                var n = (Zo(e) + "e").split("e");
                                return +((n = (Zo(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
                            }
                            return r(e)
                        }
                    }
                    var _n = ee && 1 / ns(new ee([, -0]))[1] == 1 / 0 ? function(e) {
                        return new ee(e)
                    }
                    : Ui;
                    function Tn(i) {
                        return function(e) {
                            var t, n, r, o = Wn(e);
                            return o == oa ? Xl(e) : o == ua ? (o = e,
                            t = -1,
                            n = Array(o.size),
                            o.forEach(function(e) {
                                n[++t] = [e, e]
                            }),
                            n) : xl(i(r = e), function(e) {
                                return [e, r[e]]
                            })
                        }
                    }
                    function xn(e, t, n, r, o, i, a, l) {
                        var s = 2 & t;
                        if (!s && "function" != typeof e)
                            throw new S(zi);
                        var u = r ? r.length : 0;
                        u || (t &= -97,
                        r = o = Hi),
                        a = a === Hi ? a : W(Jo(a), 0),
                        l = l === Hi ? l : Jo(l),
                        u -= o ? o.length : 0,
                        64 & t && (m = r,
                        v = o,
                        r = o = Hi);
                        var c, d, f, p, m, v, h, g, y, b, I = s ? Hi : Mn(e), w = [e, t, n, r, o, m, v, i, a, l];
                        return I && (d = I,
                        p = (c = w)[1],
                        m = d[1],
                        i = (v = p | m) < 131,
                        a = m == qi && 8 == p || m == qi && 256 == p && c[7].length <= d[8] || 384 == m && d[7].length <= d[8] && 8 == p,
                        (i || a) && (1 & m && (c[2] = d[2],
                        v |= 1 & p ? 0 : 4),
                        (p = d[3]) && (f = c[3],
                        c[3] = f ? tn(f, p, d[4]) : p,
                        c[4] = f ? ts(c[3], Wi) : d[4]),
                        (p = d[5]) && (f = c[5],
                        c[5] = f ? nn(f, p, d[6]) : p,
                        c[6] = f ? ts(c[5], Wi) : d[6]),
                        (p = d[7]) && (c[7] = p),
                        m & qi && (c[8] = null == c[8] ? d[8] : q(c[8], d[8])),
                        null == c[9] && (c[9] = d[9]),
                        c[0] = d[0],
                        c[1] = v)),
                        e = w[0],
                        t = w[1],
                        n = w[2],
                        r = w[3],
                        o = w[4],
                        !(l = w[9] = w[9] === Hi ? s ? 0 : e.length : W(w[9] - u, 0)) && 24 & t && (t &= -25),
                        n = t && 1 != t ? 8 == t || 16 == t ? pn(e, t, l) : 32 != t && 33 != t || o.length ? hn.apply(Hi, w) : wn(e, t, n, r) : (g = n,
                        y = 1 & t,
                        b = fn(h = e),
                        function e() {
                            return (this && this !== fl && this instanceof e ? b : h).apply(y ? g : this, arguments)
                        }
                        ),
                        ur((I ? xt : ar)(n, w), e, t)
                    }
                    function An(e, t, n, r) {
                        return e === Hi || bo(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function On(e, t, n, r, o, i) {
                        return ko(e) && ko(t) && (i.set(t, e),
                        ht(e, t, Hi, On, i),
                        i.delete(t)),
                        e
                    }
                    function Nn(e) {
                        return Uo(e) ? Hi : e
                    }
                    function Rn(e, t, n, r, o, i) {
                        var a = 1 & n
                          , l = e.length
                          , s = t.length;
                        if (l != s && !(a && l < s))
                            return !1;
                        var u = i.get(e)
                          , s = i.get(t);
                        if (u && s)
                            return u == t && s == e;
                        var c = -1
                          , d = !0
                          , f = 2 & n ? new Se : Hi;
                        for (i.set(e, t),
                        i.set(t, e); ++c < l; ) {
                            var p, m = e[c], v = t[c];
                            if (r && (p = a ? r(v, m, c, t, e, i) : r(m, v, c, e, t, i)),
                            p !== Hi) {
                                if (p)
                                    continue;
                                d = !1;
                                break
                            }
                            if (f) {
                                if (!Rl(t, function(e, t) {
                                    return !ql(f, t) && (m === e || o(m, e, n, r, i)) && f.push(t)
                                })) {
                                    d = !1;
                                    break
                                }
                            } else if (m !== v && !o(m, v, n, r, i)) {
                                d = !1;
                                break
                            }
                        }
                        return i.delete(e),
                        i.delete(t),
                        d
                    }
                    function kn(e) {
                        return sr(rr(e, Hi, Er), e + "")
                    }
                    function Dn(e) {
                        return Qe(e, ci, zn)
                    }
                    function Ln(e) {
                        return Qe(e, di, Vn)
                    }
                    var Mn = re ? function(e) {
                        return re.get(e)
                    }
                    : Ui;
                    function Un(e) {
                        for (var t = e.name + "", n = oe[t], r = y.call(oe, t) ? n.length : 0; r--; ) {
                            var o = n[r]
                              , i = o.func;
                            if (null == i || i == e)
                                return o.name
                        }
                        return t
                    }
                    function Fn(e) {
                        return (y.call(pe, "placeholder") ? pe : e).placeholder
                    }
                    function Bn() {
                        var e = (e = pe.iteratee || Li) === Li ? ut : e;
                        return arguments.length ? e(arguments[0], arguments[1]) : e
                    }
                    function jn(e, t) {
                        var n, r = e.__data__;
                        return ("string" == (e = typeof (n = t)) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== n : null === n) ? r["string" == typeof t ? "string" : "hash"] : r.map
                    }
                    function Gn(e) {
                        for (var t = ci(e), n = t.length; n--; ) {
                            var r = t[n]
                              , o = e[r];
                            t[n] = [r, o, tr(o)]
                        }
                        return t
                    }
                    function Hn(e, t) {
                        t = t,
                        t = null == (e = e) ? Hi : e[t];
                        return st(t) ? t : Hi
                    }
                    var zn = j ? function(t) {
                        return null == t ? [] : (t = v(t),
                        Cl(j(t), function(e) {
                            return A.call(t, e)
                        }))
                    }
                    : Bi
                      , Vn = j ? function(e) {
                        for (var t = []; e; )
                            Al(t, zn(e)),
                            e = T(e);
                        return t
                    }
                    : Bi
                      , Wn = Xe;
                    function qn(e, t, n) {
                        for (var r = -1, o = (t = Jt(t, e)).length, i = !1; ++r < o; ) {
                            var a = vr(t[r]);
                            if (!(i = null != e && n(e, a)))
                                break;
                            e = e[a]
                        }
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && Ro(o) && Kn(a, o) && (Eo(e) || So(e))
                    }
                    function Jn(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function $n(e) {
                        return Eo(e) || So(e) || !!(N && e && e[N])
                    }
                    function Kn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Ji : t) && ("number" == n || "symbol" != n && Qa.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Yn(e, t, n) {
                        if (ko(n)) {
                            var r = typeof t;
                            return ("number" == r ? Co(n) && Kn(t, n.length) : "string" == r && t in n) && bo(n[t], e)
                        }
                    }
                    function Zn(e, t) {
                        if (!Eo(e)) {
                            var n = typeof e;
                            return "number" == n || "symbol" == n || "boolean" == n || null == e || Go(e) || (La.test(e) || !Da.test(e) || null != t && e in v(t))
                        }
                    }
                    function Qn(e) {
                        var t = Un(e)
                          , n = pe[t];
                        if ("function" == typeof n && t in ye.prototype) {
                            if (e === n)
                                return 1;
                            n = Mn(n);
                            return n && e === n[0]
                        }
                    }
                    (Z && Wn(new Z(new ArrayBuffer(1))) != ma || Q && Wn(new Q) != oa || X && Wn(X.resolve()) != la || ee && Wn(new ee) != ua || te && Wn(new te) != fa) && (Wn = function(e) {
                        var t = Xe(e)
                          , e = t == aa ? e.constructor : Hi
                          , e = e ? hr(e) : "";
                        if (e)
                            switch (e) {
                            case ie:
                                return ma;
                            case ae:
                                return oa;
                            case le:
                                return la;
                            case se:
                                return ua;
                            case ue:
                                return fa
                            }
                        return t
                    }
                    );
                    var Xn = a ? Oo : ji;
                    function er(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || m)
                    }
                    function tr(e) {
                        return e == e && !ko(e)
                    }
                    function nr(t, n) {
                        return function(e) {
                            return null != e && (e[t] === n && (n !== Hi || t in v(e)))
                        }
                    }
                    function rr(i, a, l) {
                        return a = W(a === Hi ? i.length - 1 : a, 0),
                        function() {
                            for (var e = arguments, t = -1, n = W(e.length - a, 0), r = E(n); ++t < n; )
                                r[t] = e[a + t];
                            t = -1;
                            for (var o = E(a + 1); ++t < a; )
                                o[t] = e[t];
                            return o[a] = l(r),
                            Il(i, this, o)
                        }
                    }
                    function or(e, t) {
                        return t.length < 2 ? e : Ze(e, Nt(t, 0, -1))
                    }
                    function ir(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ar = cr(xt)
                      , lr = U || function(e, t) {
                        return fl.setTimeout(e, t)
                    }
                      , sr = cr(At);
                    function ur(e, t, n) {
                        var r, o, t = t + "";
                        return sr(e, function(e, t) {
                            var n = t.length;
                            if (!n)
                                return e;
                            var r = n - 1;
                            return t[r] = (1 < n ? "& " : "") + t[r],
                            t = t.join(2 < n ? ", " : " "),
                            e.replace(ja, "{\n/* [wrapped with " + t + "] */\n")
                        }(t, (r = (t = (t = t).match(Ga)) ? t[1].split(Ha) : [],
                        o = n,
                        Sl(Yi, function(e) {
                            var t = "_." + e[0];
                            o & e[1] && !_l(r, t) && r.push(t)
                        }),
                        r.sort())))
                    }
                    function cr(n) {
                        var r = 0
                          , o = 0;
                        return function() {
                            var e = J()
                              , t = 16 - (e - o);
                            if (o = e,
                            0 < t) {
                                if (800 <= ++r)
                                    return arguments[0]
                            } else
                                r = 0;
                            return n.apply(Hi, arguments)
                        }
                    }
                    function dr(e, t) {
                        var n = -1
                          , r = e.length
                          , o = r - 1;
                        for (t = t === Hi ? r : t; ++n < t; ) {
                            var i = St(n, o)
                              , a = e[i];
                            e[i] = e[n],
                            e[n] = a
                        }
                        return e.length = t,
                        e
                    }
                    var fr, pr, mr = (pr = (fr = po(fr = function(e) {
                        var o = [];
                        return 46 === e.charCodeAt(0) && o.push(""),
                        e.replace(Ma, function(e, t, n, r) {
                            o.push(n ? r.replace(Wa, "$1") : t || e)
                        }),
                        o
                    }
                    , function(e) {
                        return 500 === pr.size && pr.clear(),
                        e
                    })).cache,
                    fr);
                    function vr(e) {
                        if ("string" == typeof e || Go(e))
                            return e;
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
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
                        return _o(e) ? Be(e, We(t, 1, _o, !0)) : []
                    })
                      , br = Pt(function(e, t) {
                        var n = xr(t);
                        return _o(n) && (n = Hi),
                        _o(e) ? Be(e, We(t, 1, _o, !0), Bn(n, 2)) : []
                    })
                      , Ir = Pt(function(e, t) {
                        var n = xr(t);
                        return _o(n) && (n = Hi),
                        _o(e) ? Be(e, We(t, 1, _o, !0), Hi, n) : []
                    });
                    function wr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        n = null == n ? 0 : Jo(n);
                        return n < 0 && (n = W(r + n, 0)),
                        Dl(e, Bn(t, 3), n)
                    }
                    function Sr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r - 1;
                        return n !== Hi && (o = Jo(n),
                        o = n < 0 ? W(r + o, 0) : q(o, r - 1)),
                        Dl(e, Bn(t, 3), o, !0)
                    }
                    function Er(e) {
                        return (null == e ? 0 : e.length) ? We(e, 1) : []
                    }
                    function Pr(e) {
                        return e && e.length ? e[0] : Hi
                    }
                    var Cr = Pt(function(e) {
                        var t = xl(e, Wt);
                        return t.length && t[0] === e[0] ? rt(t) : []
                    })
                      , _r = Pt(function(e) {
                        var t = xr(e)
                          , n = xl(e, Wt);
                        return t === xr(n) ? t = Hi : n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Bn(t, 2)) : []
                    })
                      , Tr = Pt(function(e) {
                        var t = xr(e)
                          , n = xl(e, Wt);
                        return (t = "function" == typeof t ? t : Hi) && n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Hi, t) : []
                    });
                    function xr(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : Hi
                    }
                    var Ar = Pt(Or);
                    function Or(e, t) {
                        return e && e.length && t && t.length ? It(e, t) : e
                    }
                    var Nr = kn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = De(e, t);
                        return wt(e, xl(t, function(e) {
                            return Kn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Rr(e) {
                        return null == e ? e : Y.call(e)
                    }
                    var kr = Pt(function(e) {
                        return Ft(We(e, 1, _o, !0))
                    })
                      , Dr = Pt(function(e) {
                        var t = xr(e);
                        return _o(t) && (t = Hi),
                        Ft(We(e, 1, _o, !0), Bn(t, 2))
                    })
                      , Lr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return Ft(We(e, 1, _o, !0), Hi, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = Cl(t, function(e) {
                            return _o(e) && (n = W(e.length, n),
                            1)
                        }),
                        Hl(n, function(e) {
                            return xl(t, Bl(e))
                        })
                    }
                    function Ur(e, t) {
                        if (!e || !e.length)
                            return [];
                        e = Mr(e);
                        return null == t ? e : xl(e, function(e) {
                            return Il(t, Hi, e)
                        })
                    }
                    var Fr = Pt(function(e, t) {
                        return _o(e) ? Be(e, t) : []
                    })
                      , Br = Pt(function(e) {
                        return zt(Cl(e, _o))
                    })
                      , jr = Pt(function(e) {
                        var t = xr(e);
                        return _o(t) && (t = Hi),
                        zt(Cl(e, _o), Bn(t, 2))
                    })
                      , Gr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return zt(Cl(e, _o), Hi, t)
                    })
                      , Hr = Pt(Mr);
                    var zr = Pt(function(e) {
                        var t = e.length
                          , t = "function" == typeof (t = 1 < t ? e[t - 1] : Hi) ? (e.pop(),
                        t) : Hi;
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
                          , o = this.__wrapped__;
                        return !(1 < n || this.__actions__.length) && o instanceof ye && Kn(r) ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                            func: Wr,
                            args: [e],
                            thisArg: Hi
                        }),
                        new ge(o,this.__chain__).thru(function(e) {
                            return n && !e.length && e.push(Hi),
                            e
                        })) : this.thru(e)
                    });
                    var Jr = an(function(e, t, n) {
                        y.call(e, n) ? ++e[n] : ke(e, n, 1)
                    });
                    var $r = mn(wr)
                      , Kr = mn(Sr);
                    function Yr(e, t) {
                        return (Eo(e) ? Sl : je)(e, Bn(t, 3))
                    }
                    function Zr(e, t) {
                        return (Eo(e) ? El : Ge)(e, Bn(t, 3))
                    }
                    var Qr = an(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : ke(e, n, [t])
                    });
                    var Xr = Pt(function(e, t, n) {
                        var r = -1
                          , o = "function" == typeof t
                          , i = Co(e) ? E(e.length) : [];
                        return je(e, function(e) {
                            i[++r] = o ? Il(t, e, n) : ot(e, t, n)
                        }),
                        i
                    })
                      , eo = an(function(e, t, n) {
                        ke(e, n, t)
                    });
                    function to(e, t) {
                        return (Eo(e) ? xl : pt)(e, Bn(t, 3))
                    }
                    var no = an(function(e, t, n) {
                        e[n ? 0 : 1].push(t)
                    }, function() {
                        return [[], []]
                    });
                    var ro = Pt(function(e, t) {
                        if (null == e)
                            return [];
                        var n = t.length;
                        return 1 < n && Yn(e, t[0], t[1]) ? t = [] : 2 < n && Yn(t[0], t[1], t[2]) && (t = [t[0]]),
                        yt(e, We(t, 1), [])
                    })
                      , oo = M || function() {
                        return fl.Date.now()
                    }
                    ;
                    function io(e, t, n) {
                        return t = n ? Hi : t,
                        t = e && null == t ? e.length : t,
                        xn(e, qi, Hi, Hi, Hi, Hi, t)
                    }
                    function ao(e, t) {
                        var n;
                        if ("function" != typeof t)
                            throw new S(zi);
                        return e = Jo(e),
                        function() {
                            return 0 < --e && (n = t.apply(this, arguments)),
                            e <= 1 && (t = Hi),
                            n
                        }
                    }
                    var lo = Pt(function(e, t, n) {
                        var r, o = 1;
                        return n.length && (r = ts(n, Fn(lo)),
                        o |= 32),
                        xn(e, o, t, n, r)
                    })
                      , so = Pt(function(e, t, n) {
                        var r, o = 3;
                        return n.length && (r = ts(n, Fn(so)),
                        o |= 32),
                        xn(t, o, e, n, r)
                    });
                    function uo(r, n, e) {
                        var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                        if ("function" != typeof r)
                            throw new S(zi);
                        function p(e) {
                            var t = o
                              , n = i;
                            return o = i = Hi,
                            c = e,
                            l = r.apply(n, t)
                        }
                        function m(e) {
                            var t = e - u;
                            return u === Hi || n <= t || t < 0 || f && a <= e - c
                        }
                        function v() {
                            var e, t = oo();
                            if (m(t))
                                return h(t);
                            s = lr(v, (t = n - ((e = t) - u),
                            f ? q(t, a - (e - c)) : t))
                        }
                        function h(e) {
                            return s = Hi,
                            t && o ? p(e) : (o = i = Hi,
                            l)
                        }
                        function g() {
                            var e = oo()
                              , t = m(e);
                            if (o = arguments,
                            i = this,
                            u = e,
                            t) {
                                if (s === Hi)
                                    return c = t = u,
                                    s = lr(v, n),
                                    d ? p(t) : l;
                                if (f)
                                    return Yt(s),
                                    s = lr(v, n),
                                    p(u)
                            }
                            return s === Hi && (s = lr(v, n)),
                            l
                        }
                        return n = Ko(n) || 0,
                        ko(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? W(Ko(e.maxWait) || 0, n) : a,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            s !== Hi && Yt(s),
                            c = 0,
                            o = u = i = s = Hi
                        }
                        ,
                        g.flush = function() {
                            return s === Hi ? l : h(oo())
                        }
                        ,
                        g
                    }
                    var co = Pt(function(e, t) {
                        return Fe(e, 1, t)
                    })
                      , fo = Pt(function(e, t, n) {
                        return Fe(e, Ko(t) || 0, n)
                    });
                    function po(r, o) {
                        if ("function" != typeof r || null != o && "function" != typeof o)
                            throw new S(zi);
                        var i = function() {
                            var e = arguments
                              , t = o ? o.apply(this, e) : e[0]
                              , n = i.cache;
                            if (n.has(t))
                                return n.get(t);
                            e = r.apply(this, e);
                            return i.cache = n.set(t, e) || n,
                            e
                        };
                        return i.cache = new (po.Cache || we),
                        i
                    }
                    function mo(t) {
                        if ("function" != typeof t)
                            throw new S(zi);
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
                    po.Cache = we;
                    var vo = $t(function(r, o) {
                        var i = (o = 1 == o.length && Eo(o[0]) ? xl(o[0], Vl(Bn())) : xl(We(o, 1), Vl(Bn()))).length;
                        return Pt(function(e) {
                            for (var t = -1, n = q(e.length, i); ++t < n; )
                                e[t] = o[t].call(this, e[t]);
                            return Il(r, this, e)
                        })
                    })
                      , ho = Pt(function(e, t) {
                        var n = ts(t, Fn(ho));
                        return xn(e, 32, Hi, t, n)
                    })
                      , go = Pt(function(e, t) {
                        var n = ts(t, Fn(go));
                        return xn(e, 64, Hi, t, n)
                    })
                      , yo = kn(function(e, t) {
                        return xn(e, 256, Hi, Hi, Hi, t)
                    });
                    function bo(e, t) {
                        return e === t || e != e && t != t
                    }
                    var Io = En(et)
                      , wo = En(function(e, t) {
                        return t <= e
                    })
                      , So = it(function() {
                        return arguments
                    }()) ? it : function(e) {
                        return Do(e) && y.call(e, "callee") && !A.call(e, "callee")
                    }
                      , Eo = E.isArray
                      , Po = ml ? Vl(ml) : function(e) {
                        return Do(e) && Xe(e) == pa
                    }
                    ;
                    function Co(e) {
                        return null != e && Ro(e.length) && !Oo(e)
                    }
                    function _o(e) {
                        return Do(e) && Co(e)
                    }
                    var To = G || ji
                      , xo = vl ? Vl(vl) : function(e) {
                        return Do(e) && Xe(e) == ea
                    }
                    ;
                    function Ao(e) {
                        if (!Do(e))
                            return !1;
                        var t = Xe(e);
                        return t == ta || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Uo(e)
                    }
                    function Oo(e) {
                        if (!ko(e))
                            return !1;
                        e = Xe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function No(e) {
                        return "number" == typeof e && e == Jo(e)
                    }
                    function Ro(e) {
                        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= Ji
                    }
                    function ko(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t)
                    }
                    function Do(e) {
                        return null != e && "object" == typeof e
                    }
                    var Lo = hl ? Vl(hl) : function(e) {
                        return Do(e) && Wn(e) == oa
                    }
                    ;
                    function Mo(e) {
                        return "number" == typeof e || Do(e) && Xe(e) == ia
                    }
                    function Uo(e) {
                        if (!Do(e) || Xe(e) != aa)
                            return !1;
                        e = T(e);
                        if (null === e)
                            return !0;
                        e = y.call(e, "constructor") && e.constructor;
                        return "function" == typeof e && e instanceof e && l.call(e) == g
                    }
                    var Fo = gl ? Vl(gl) : function(e) {
                        return Do(e) && Xe(e) == sa
                    }
                    ;
                    var Bo = yl ? Vl(yl) : function(e) {
                        return Do(e) && Wn(e) == ua
                    }
                    ;
                    function jo(e) {
                        return "string" == typeof e || !Eo(e) && Do(e) && Xe(e) == ca
                    }
                    function Go(e) {
                        return "symbol" == typeof e || Do(e) && Xe(e) == da
                    }
                    var Ho = bl ? Vl(bl) : function(e) {
                        return Do(e) && Ro(e.length) && !!sl[Xe(e)]
                    }
                    ;
                    var zo = En(ft)
                      , Vo = En(function(e, t) {
                        return e <= t
                    });
                    function Wo(e) {
                        if (!e)
                            return [];
                        if (Co(e))
                            return (jo(e) ? os : rn)(e);
                        if (R && e[R])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[R]());
                        var t = Wn(e);
                        return (t == oa ? Xl : t == ua ? ns : bi)(e)
                    }
                    function qo(e) {
                        return e ? (e = Ko(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function Jo(e) {
                        var t = qo(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function $o(e) {
                        return e ? Le(Jo(e), 0, Ki) : 0
                    }
                    function Ko(e) {
                        if ("number" == typeof e)
                            return e;
                        if (Go(e))
                            return $i;
                        if (ko(e) && (e = ko(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = Ka.test(e);
                        return t || Za.test(e) ? dl(e.slice(2), t ? 2 : 8) : $a.test(e) ? $i : +e
                    }
                    function Yo(e) {
                        return on(e, di(e))
                    }
                    function Zo(e) {
                        return null == e ? "" : Ut(e)
                    }
                    var Qo = ln(function(e, t) {
                        if (er(t) || Co(t))
                            on(t, ci(t), e);
                        else
                            for (var n in t)
                                y.call(t, n) && Ae(e, n, t[n])
                    })
                      , Xo = ln(function(e, t) {
                        on(t, di(t), e)
                    })
                      , ei = ln(function(e, t, n, r) {
                        on(t, di(t), e, r)
                    })
                      , ti = ln(function(e, t, n, r) {
                        on(t, ci(t), e, r)
                    })
                      , ni = kn(De);
                    var ri = Pt(function(e, t) {
                        e = v(e);
                        var n = -1
                          , r = t.length
                          , o = 2 < r ? t[2] : Hi;
                        for (o && Yn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === Hi || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Pt(function(e) {
                        return e.push(Hi, On),
                        Il(pi, Hi, e)
                    });
                    function ii(e, t, n) {
                        t = null == e ? Hi : Ze(e, t);
                        return t === Hi ? n : t
                    }
                    function ai(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var li = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        e[t] = n
                    }, Ri(Di))
                      , si = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        y.call(e, t) ? e[t].push(n) : e[t] = [n]
                    }, Bn)
                      , ui = Pt(ot);
                    function ci(e) {
                        return (Co(e) ? Pe : ct)(e)
                    }
                    function di(e) {
                        return Co(e) ? Pe(e, !0) : dt(e)
                    }
                    var fi = ln(function(e, t, n) {
                        ht(e, t, n)
                    })
                      , pi = ln(function(e, t, n, r) {
                        ht(e, t, n, r)
                    })
                      , mi = kn(function(t, e) {
                        var n = {};
                        if (null == t)
                            return n;
                        var r = !1;
                        e = xl(e, function(e) {
                            return e = Jt(e, t),
                            r = r || 1 < e.length,
                            e
                        }),
                        on(t, Ln(t), n),
                        r && (n = Me(n, 7, Nn));
                        for (var o = e.length; o--; )
                            Bt(n, e[o]);
                        return n
                    });
                    var vi = kn(function(e, t) {
                        return null == e ? {} : bt(n = e, t, function(e, t) {
                            return ai(n, t)
                        });
                        var n
                    });
                    function hi(e, n) {
                        if (null == e)
                            return {};
                        var t = xl(Ln(e), function(e) {
                            return [e]
                        });
                        return n = Bn(n),
                        bt(e, t, function(e, t) {
                            return n(e, t[0])
                        })
                    }
                    var gi = Tn(ci)
                      , yi = Tn(di);
                    function bi(e) {
                        return null == e ? [] : Wl(e, ci(e))
                    }
                    var Ii = dn(function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? wi(t) : t)
                    });
                    function wi(e) {
                        return Ai(Zo(e).toLowerCase())
                    }
                    function Si(e) {
                        return (e = Zo(e)) && e.replace(Xa, Kl).replace(rl, "")
                    }
                    var Ei = dn(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , Pi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    })
                      , Ci = cn("toLowerCase");
                    var _i = dn(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    });
                    var Ti = dn(function(e, t, n) {
                        return e + (n ? " " : "") + Ai(t)
                    });
                    var xi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Ai = cn("toUpperCase");
                    function Oi(e, t, n) {
                        return e = Zo(e),
                        (t = n ? Hi : t) === Hi ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var Ni = Pt(function(e, t) {
                        try {
                            return Il(e, Hi, t)
                        } catch (e) {
                            return Ao(e) ? e : new d(e)
                        }
                    })
                      , r = kn(function(t, e) {
                        return Sl(e, function(e) {
                            e = vr(e),
                            ke(t, e, lo(t[e], t))
                        }),
                        t
                    });
                    function Ri(e) {
                        return function() {
                            return e
                        }
                    }
                    var ki = vn()
                      , w = vn(!0);
                    function Di(e) {
                        return e
                    }
                    function Li(e) {
                        return ut("function" == typeof e ? e : Me(e, 1))
                    }
                    n = Pt(function(t, n) {
                        return function(e) {
                            return ot(e, t, n)
                        }
                    }),
                    t = Pt(function(t, n) {
                        return function(e) {
                            return ot(t, e, n)
                        }
                    });
                    function Mi(r, t, e) {
                        var n = ci(t)
                          , o = Ye(t, n);
                        null != e || ko(t) && (o.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        o = Ye(t, ci(t)));
                        var i = !(ko(e) && "chain"in e && !e.chain)
                          , a = Oo(r);
                        return Sl(o, function(e) {
                            var n = t[e];
                            r[e] = n,
                            a && (r.prototype[e] = function() {
                                var e = this.__chain__;
                                if (i || e) {
                                    var t = r(this.__wrapped__);
                                    return (t.__actions__ = rn(this.__actions__)).push({
                                        func: n,
                                        args: arguments,
                                        thisArg: r
                                    }),
                                    t.__chain__ = e,
                                    t
                                }
                                return n.apply(r, Al([this.value()], arguments))
                            }
                            )
                        }),
                        r
                    }
                    function Ui() {}
                    P = bn(xl),
                    ce = bn(Pl),
                    L = bn(Rl);
                    function Fi(e) {
                        return Zn(e) ? Bl(vr(e)) : (t = e,
                        function(e) {
                            return Ze(e, t)
                        }
                        );
                        var t
                    }
                    Z = Sn(),
                    X = Sn(!0);
                    function Bi() {
                        return []
                    }
                    function ji() {
                        return !1
                    }
                    te = yn(function(e, t) {
                        return e + t
                    }, 0),
                    a = Cn("ceil"),
                    U = yn(function(e, t) {
                        return e / t
                    }, 1),
                    At = Cn("floor");
                    var Gi, M = yn(function(e, t) {
                        return e * t
                    }, 1), $t = Cn("round"), G = yn(function(e, t) {
                        return e - t
                    }, 0);
                    return pe.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new S(zi);
                        return e = Jo(e),
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    ,
                    pe.ary = io,
                    pe.assign = Qo,
                    pe.assignIn = Xo,
                    pe.assignInWith = ei,
                    pe.assignWith = ti,
                    pe.at = ni,
                    pe.before = ao,
                    pe.bind = lo,
                    pe.bindAll = r,
                    pe.bindKey = so,
                    pe.castArray = function() {
                        if (!arguments.length)
                            return [];
                        var e = arguments[0];
                        return Eo(e) ? e : [e]
                    }
                    ,
                    pe.chain = Vr,
                    pe.chunk = function(e, t, n) {
                        t = (n ? Yn(e, t, n) : t === Hi) ? 1 : W(Jo(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = E(F(r / t)); o < r; )
                            a[i++] = Nt(e, o, o += t);
                        return a
                    }
                    ,
                    pe.compact = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = 0, o = []; ++t < n; ) {
                            var i = e[t];
                            i && (o[r++] = i)
                        }
                        return o
                    }
                    ,
                    pe.concat = function() {
                        var e = arguments.length;
                        if (!e)
                            return [];
                        for (var t = E(e - 1), n = arguments[0], r = e; r--; )
                            t[r - 1] = arguments[r];
                        return Al(Eo(n) ? rn(n) : [n], We(t, 1))
                    }
                    ,
                    pe.cond = function(r) {
                        var o = null == r ? 0 : r.length
                          , t = Bn();
                        return r = o ? xl(r, function(e) {
                            if ("function" != typeof e[1])
                                throw new S(zi);
                            return [t(e[0]), e[1]]
                        }) : [],
                        Pt(function(e) {
                            for (var t = -1; ++t < o; ) {
                                var n = r[t];
                                if (Il(n[0], this, e))
                                    return Il(n[1], this, e)
                            }
                        })
                    }
                    ,
                    pe.conforms = function(e) {
                        return t = Me(e, 1),
                        n = ci(t),
                        function(e) {
                            return Ue(e, t, n)
                        }
                        ;
                        var t, n
                    }
                    ,
                    pe.constant = Ri,
                    pe.countBy = Jr,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : Re(e, t)
                    }
                    ,
                    pe.curry = function e(t, n, r) {
                        n = xn(t, 8, Hi, Hi, Hi, Hi, Hi, n = r ? Hi : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.curryRight = function e(t, n, r) {
                        n = xn(t, 16, Hi, Hi, Hi, Hi, Hi, n = r ? Hi : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.debounce = uo,
                    pe.defaults = ri,
                    pe.defaultsDeep = oi,
                    pe.defer = co,
                    pe.delay = fo,
                    pe.difference = yr,
                    pe.differenceBy = br,
                    pe.differenceWith = Ir,
                    pe.drop = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Nt(e, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Nt(e, 0, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.dropRightWhile = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 3), !0, !0) : []
                    }
                    ,
                    pe.dropWhile = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 3), !0) : []
                    }
                    ,
                    pe.fill = function(e, t, n, r) {
                        var o = null == e ? 0 : e.length;
                        return o ? (n && "number" != typeof n && Yn(e, t, n) && (n = 0,
                        r = o),
                        function(e, t, n, r) {
                            var o = e.length;
                            for ((n = Jo(n)) < 0 && (n = o < -n ? 0 : o + n),
                            (r = r === Hi || o < r ? o : Jo(r)) < 0 && (r += o),
                            r = r < n ? 0 : $o(r); n < r; )
                                e[n++] = t;
                            return e
                        }(e, t, n, r)) : []
                    }
                    ,
                    pe.filter = function(e, t) {
                        return (Eo(e) ? Cl : Ve)(e, Bn(t, 3))
                    }
                    ,
                    pe.flatMap = function(e, t) {
                        return We(to(e, t), 1)
                    }
                    ,
                    pe.flatMapDeep = function(e, t) {
                        return We(to(e, t), 1 / 0)
                    }
                    ,
                    pe.flatMapDepth = function(e, t, n) {
                        return n = n === Hi ? 1 : Jo(n),
                        We(to(e, t), n)
                    }
                    ,
                    pe.flatten = Er,
                    pe.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? We(e, 1 / 0) : []
                    }
                    ,
                    pe.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? We(e, t = t === Hi ? 1 : Jo(t)) : []
                    }
                    ,
                    pe.flip = function(e) {
                        return xn(e, 512)
                    }
                    ,
                    pe.flow = ki,
                    pe.flowRight = w,
                    pe.fromPairs = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
                            var o = e[t];
                            r[o[0]] = o[1]
                        }
                        return r
                    }
                    ,
                    pe.functions = function(e) {
                        return null == e ? [] : Ye(e, ci(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Ye(e, di(e))
                    }
                    ,
                    pe.groupBy = Qr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? Nt(e, 0, -1) : []
                    }
                    ,
                    pe.intersection = Cr,
                    pe.intersectionBy = _r,
                    pe.intersectionWith = Tr,
                    pe.invert = li,
                    pe.invertBy = si,
                    pe.invokeMap = Xr,
                    pe.iteratee = Li,
                    pe.keyBy = eo,
                    pe.keys = ci,
                    pe.keysIn = di,
                    pe.map = to,
                    pe.mapKeys = function(e, r) {
                        var o = {};
                        return r = Bn(r, 3),
                        $e(e, function(e, t, n) {
                            ke(o, r(e, t, n), e)
                        }),
                        o
                    }
                    ,
                    pe.mapValues = function(e, r) {
                        var o = {};
                        return r = Bn(r, 3),
                        $e(e, function(e, t, n) {
                            ke(o, t, r(e, t, n))
                        }),
                        o
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
                    pe.memoize = po,
                    pe.merge = fi,
                    pe.mergeWith = pi,
                    pe.method = n,
                    pe.methodOf = t,
                    pe.mixin = Mi,
                    pe.negate = mo,
                    pe.nthArg = function(t) {
                        return t = Jo(t),
                        Pt(function(e) {
                            return gt(e, t)
                        })
                    }
                    ,
                    pe.omit = mi,
                    pe.omitBy = function(e, t) {
                        return hi(e, mo(Bn(t)))
                    }
                    ,
                    pe.once = function(e) {
                        return ao(2, e)
                    }
                    ,
                    pe.orderBy = function(e, t, n, r) {
                        return null == e ? [] : (Eo(t) || (t = null == t ? [] : [t]),
                        Eo(n = r ? Hi : n) || (n = null == n ? [] : [n]),
                        yt(e, t, n))
                    }
                    ,
                    pe.over = P,
                    pe.overArgs = vo,
                    pe.overEvery = ce,
                    pe.overSome = L,
                    pe.partial = ho,
                    pe.partialRight = go,
                    pe.partition = no,
                    pe.pick = vi,
                    pe.pickBy = hi,
                    pe.property = Fi,
                    pe.propertyOf = function(t) {
                        return function(e) {
                            return null == t ? Hi : Ze(t, e)
                        }
                    }
                    ,
                    pe.pull = Ar,
                    pe.pullAll = Or,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Hi, n) : e
                    }
                    ,
                    pe.pullAt = Nr,
                    pe.range = Z,
                    pe.rangeRight = X,
                    pe.rearg = yo,
                    pe.reject = function(e, t) {
                        return (Eo(e) ? Cl : Ve)(e, mo(Bn(t, 3)))
                    }
                    ,
                    pe.remove = function(e, t) {
                        var n = [];
                        if (!e || !e.length)
                            return n;
                        var r = -1
                          , o = []
                          , i = e.length;
                        for (t = Bn(t, 3); ++r < i; ) {
                            var a = e[r];
                            t(a, r, e) && (n.push(a),
                            o.push(r))
                        }
                        return wt(e, o),
                        n
                    }
                    ,
                    pe.rest = function(e, t) {
                        if ("function" != typeof e)
                            throw new S(zi);
                        return Pt(e, t = t === Hi ? t : Jo(t))
                    }
                    ,
                    pe.reverse = Rr,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Yn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        (Eo(e) ? _e : _t)(e, t)
                    }
                    ,
                    pe.set = function(e, t, n) {
                        return null == e ? e : Tt(e, t, n)
                    }
                    ,
                    pe.setWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Hi,
                        null == e ? e : Tt(e, t, n, r)
                    }
                    ,
                    pe.shuffle = function(e) {
                        return (Eo(e) ? Te : Ot)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Yn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : Jo(t),
                        n === Hi ? r : Jo(n)),
                        Nt(e, t, n)) : []
                    }
                    ,
                    pe.sortBy = ro,
                    pe.sortedUniq = function(e) {
                        return e && e.length ? Lt(e) : []
                    }
                    ,
                    pe.sortedUniqBy = function(e, t) {
                        return e && e.length ? Lt(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.split = function(e, t, n) {
                        return n && "number" != typeof n && Yn(e, t, n) && (t = n = Hi),
                        (n = n === Hi ? Ki : n >>> 0) ? (e = Zo(e)) && ("string" == typeof t || null != t && !Fo(t)) && !(t = Ut(t)) && Ql(e) ? Kt(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new S(zi);
                        return r = null == r ? 0 : W(Jo(r), 0),
                        Pt(function(e) {
                            var t = e[r]
                              , e = Kt(e, 0, r);
                            return t && Al(e, t),
                            Il(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? Nt(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? Nt(e, 0, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Nt(e, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.takeRightWhile = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 3), !1, !0) : []
                    }
                    ,
                    pe.takeWhile = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 3)) : []
                    }
                    ,
                    pe.tap = function(e, t) {
                        return t(e),
                        e
                    }
                    ,
                    pe.throttle = function(e, t, n) {
                        var r = !0
                          , o = !0;
                        if ("function" != typeof e)
                            throw new S(zi);
                        return ko(n) && (r = "leading"in n ? !!n.leading : r,
                        o = "trailing"in n ? !!n.trailing : o),
                        uo(e, t, {
                            leading: r,
                            maxWait: t,
                            trailing: o
                        })
                    }
                    ,
                    pe.thru = Wr,
                    pe.toArray = Wo,
                    pe.toPairs = gi,
                    pe.toPairsIn = yi,
                    pe.toPath = function(e) {
                        return Eo(e) ? xl(e, vr) : Go(e) ? [e] : rn(mr(Zo(e)))
                    }
                    ,
                    pe.toPlainObject = Yo,
                    pe.transform = function(e, r, o) {
                        var t, n = Eo(e), i = n || To(e) || Ho(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : ko(e) && Oo(t) ? me(T(e)) : {}),
                        (i ? Sl : $e)(e, function(e, t, n) {
                            return r(o, e, t, n)
                        }),
                        o
                    }
                    ,
                    pe.unary = function(e) {
                        return io(e, 1)
                    }
                    ,
                    pe.union = kr,
                    pe.unionBy = Dr,
                    pe.unionWith = Lr,
                    pe.uniq = function(e) {
                        return e && e.length ? Ft(e) : []
                    }
                    ,
                    pe.uniqBy = function(e, t) {
                        return e && e.length ? Ft(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.uniqWith = function(e, t) {
                        return t = "function" == typeof t ? t : Hi,
                        e && e.length ? Ft(e, Hi, t) : []
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
                        return r = "function" == typeof r ? r : Hi,
                        null == e ? e : jt(e, t, qt(n), r)
                    }
                    ,
                    pe.values = bi,
                    pe.valuesIn = function(e) {
                        return null == e ? [] : Wl(e, di(e))
                    }
                    ,
                    pe.without = Fr,
                    pe.words = Oi,
                    pe.wrap = function(e, t) {
                        return ho(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = jr,
                    pe.xorWith = Gr,
                    pe.zip = Hr,
                    pe.zipObject = function(e, t) {
                        return Vt(e || [], t || [], Ae)
                    }
                    ,
                    pe.zipObjectDeep = function(e, t) {
                        return Vt(e || [], t || [], Tt)
                    }
                    ,
                    pe.zipWith = zr,
                    pe.entries = gi,
                    pe.entriesIn = yi,
                    pe.extend = Xo,
                    pe.extendWith = ei,
                    Mi(pe, pe),
                    pe.add = te,
                    pe.attempt = Ni,
                    pe.camelCase = Ii,
                    pe.capitalize = wi,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === Hi && (n = t,
                        t = Hi),
                        n !== Hi && (n = (n = Ko(n)) == n ? n : 0),
                        t !== Hi && (t = (t = Ko(t)) == t ? t : 0),
                        Le(Ko(e), t, n)
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
                        return Me(e, 5, t = "function" == typeof t ? t : Hi)
                    }
                    ,
                    pe.cloneWith = function(e, t) {
                        return Me(e, 4, t = "function" == typeof t ? t : Hi)
                    }
                    ,
                    pe.conformsTo = function(e, t) {
                        return null == t || Ue(e, t, ci(t))
                    }
                    ,
                    pe.deburr = Si,
                    pe.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    pe.divide = U,
                    pe.endsWith = function(e, t, n) {
                        e = Zo(e),
                        t = Ut(t);
                        var r = e.length
                          , r = n = n === Hi ? r : Le(Jo(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = bo,
                    pe.escape = function(e) {
                        return (e = Zo(e)) && Oa.test(e) ? e.replace(xa, Yl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Zo(e)) && Fa.test(e) ? e.replace(Ua, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = Eo(e) ? Pl : He;
                        return n && Yn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = $r,
                    pe.findIndex = wr,
                    pe.findKey = function(e, t) {
                        return kl(e, Bn(t, 3), $e)
                    }
                    ,
                    pe.findLast = Kr,
                    pe.findLastIndex = Sr,
                    pe.findLastKey = function(e, t) {
                        return kl(e, Bn(t, 3), Ke)
                    }
                    ,
                    pe.floor = At,
                    pe.forEach = Yr,
                    pe.forEachRight = Zr,
                    pe.forIn = function(e, t) {
                        return null == e ? e : qe(e, Bn(t, 3), di)
                    }
                    ,
                    pe.forInRight = function(e, t) {
                        return null == e ? e : Je(e, Bn(t, 3), di)
                    }
                    ,
                    pe.forOwn = function(e, t) {
                        return e && $e(e, Bn(t, 3))
                    }
                    ,
                    pe.forOwnRight = function(e, t) {
                        return e && Ke(e, Bn(t, 3))
                    }
                    ,
                    pe.get = ii,
                    pe.gt = Io,
                    pe.gte = wo,
                    pe.has = function(e, t) {
                        return null != e && qn(e, t, tt)
                    }
                    ,
                    pe.hasIn = ai,
                    pe.head = Pr,
                    pe.identity = Di,
                    pe.includes = function(e, t, n, r) {
                        return e = Co(e) ? e : bi(e),
                        n = n && !r ? Jo(n) : 0,
                        r = e.length,
                        n < 0 && (n = W(r + n, 0)),
                        jo(e) ? n <= r && -1 < e.indexOf(t, n) : !!r && -1 < Ll(e, t, n)
                    }
                    ,
                    pe.indexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? ((n = null == n ? 0 : Jo(n)) < 0 && (n = W(r + n, 0)),
                        Ll(e, t, n)) : -1
                    }
                    ,
                    pe.inRange = function(e, t, n) {
                        return t = qo(t),
                        n === Hi ? (n = t,
                        t = 0) : n = qo(n),
                        (e = e = Ko(e)) >= q(t = t, n = n) && e < W(t, n)
                    }
                    ,
                    pe.invoke = ui,
                    pe.isArguments = So,
                    pe.isArray = Eo,
                    pe.isArrayBuffer = Po,
                    pe.isArrayLike = Co,
                    pe.isArrayLikeObject = _o,
                    pe.isBoolean = function(e) {
                        return !0 === e || !1 === e || Do(e) && Xe(e) == Xi
                    }
                    ,
                    pe.isBuffer = To,
                    pe.isDate = xo,
                    pe.isElement = function(e) {
                        return Do(e) && 1 === e.nodeType && !Uo(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (Co(e) && (Eo(e) || "string" == typeof e || "function" == typeof e.splice || To(e) || Ho(e) || So(e)))
                            return !e.length;
                        var t, n = Wn(e);
                        if (n == oa || n == ua)
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
                        return at(e, t)
                    }
                    ,
                    pe.isEqualWith = function(e, t, n) {
                        var r = (n = "function" == typeof n ? n : Hi) ? n(e, t) : Hi;
                        return r === Hi ? at(e, t, Hi, n) : !!r
                    }
                    ,
                    pe.isError = Ao,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && H(e)
                    }
                    ,
                    pe.isFunction = Oo,
                    pe.isInteger = No,
                    pe.isLength = Ro,
                    pe.isMap = Lo,
                    pe.isMatch = function(e, t) {
                        return e === t || lt(e, t, Gn(t))
                    }
                    ,
                    pe.isMatchWith = function(e, t, n) {
                        return n = "function" == typeof n ? n : Hi,
                        lt(e, t, Gn(t), n)
                    }
                    ,
                    pe.isNaN = function(e) {
                        return Mo(e) && e != +e
                    }
                    ,
                    pe.isNative = function(e) {
                        if (Xn(e))
                            throw new d("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                        return st(e)
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
                    pe.isNumber = Mo,
                    pe.isObject = ko,
                    pe.isObjectLike = Do,
                    pe.isPlainObject = Uo,
                    pe.isRegExp = Fo,
                    pe.isSafeInteger = function(e) {
                        return No(e) && -Ji <= e && e <= Ji
                    }
                    ,
                    pe.isSet = Bo,
                    pe.isString = jo,
                    pe.isSymbol = Go,
                    pe.isTypedArray = Ho,
                    pe.isUndefined = function(e) {
                        return e === Hi
                    }
                    ,
                    pe.isWeakMap = function(e) {
                        return Do(e) && Wn(e) == fa
                    }
                    ,
                    pe.isWeakSet = function(e) {
                        return Do(e) && "[object WeakSet]" == Xe(e)
                    }
                    ,
                    pe.join = function(e, t) {
                        return null == e ? "" : z.call(e, t)
                    }
                    ,
                    pe.kebabCase = Ei,
                    pe.last = xr,
                    pe.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r;
                        return n !== Hi && (o = (o = Jo(n)) < 0 ? W(r + o, 0) : q(o, r - 1)),
                        t == t ? function(e, t, n) {
                            for (var r = n + 1; r--; )
                                if (e[r] === t)
                                    return r;
                            return r
                        }(e, t, o) : Dl(e, Ul, o, !0)
                    }
                    ,
                    pe.lowerCase = Pi,
                    pe.lowerFirst = Ci,
                    pe.lt = zo,
                    pe.lte = Vo,
                    pe.max = function(e) {
                        return e && e.length ? ze(e, Di, et) : Hi
                    }
                    ,
                    pe.maxBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), et) : Hi
                    }
                    ,
                    pe.mean = function(e) {
                        return Fl(e, Di)
                    }
                    ,
                    pe.meanBy = function(e, t) {
                        return Fl(e, Bn(t, 2))
                    }
                    ,
                    pe.min = function(e) {
                        return e && e.length ? ze(e, Di, ft) : Hi
                    }
                    ,
                    pe.minBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), ft) : Hi
                    }
                    ,
                    pe.stubArray = Bi,
                    pe.stubFalse = ji,
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
                        return e && e.length ? gt(e, Jo(t)) : Hi
                    }
                    ,
                    pe.noConflict = function() {
                        return fl._ === this && (fl._ = b),
                        this
                    }
                    ,
                    pe.noop = Ui,
                    pe.now = oo,
                    pe.pad = function(e, t, n) {
                        e = Zo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return !t || t <= r ? e : In(B(r = (t - r) / 2), n) + e + In(F(r), n)
                    }
                    ,
                    pe.padEnd = function(e, t, n) {
                        e = Zo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? e + In(t - r, n) : e
                    }
                    ,
                    pe.padStart = function(e, t, n) {
                        e = Zo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? In(t - r, n) + e : e
                    }
                    ,
                    pe.parseInt = function(e, t, n) {
                        return t = n || null == t ? 0 : t && +t,
                        $(Zo(e).replace(Ba, ""), t || 0)
                    }
                    ,
                    pe.random = function(e, t, n) {
                        var r;
                        if (n && "boolean" != typeof n && Yn(e, t, n) && (t = n = Hi),
                        n === Hi && ("boolean" == typeof t ? (n = t,
                        t = Hi) : "boolean" == typeof e && (n = e,
                        e = Hi)),
                        e === Hi && t === Hi ? (e = 0,
                        t = 1) : (e = qo(e),
                        t === Hi ? (t = e,
                        e = 0) : t = qo(t)),
                        t < e && (r = e,
                        e = t,
                        t = r),
                        n || e % 1 || t % 1) {
                            n = K();
                            return q(e + n * (t - e + cl("1e-" + ((n + "").length - 1))), t)
                        }
                        return St(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = Eo(e) ? Ol : jl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, je)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = Eo(e) ? Nl : jl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Ge)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Yn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        Et(Zo(e), t)
                    }
                    ,
                    pe.replace = function() {
                        var e = arguments
                          , t = Zo(e[0]);
                        return e.length < 3 ? t : t.replace(e[1], e[2])
                    }
                    ,
                    pe.result = function(e, t, n) {
                        var r = -1
                          , o = (t = Jt(t, e)).length;
                        for (o || (o = 1,
                        e = Hi); ++r < o; ) {
                            var i = null == e ? Hi : e[vr(t[r])];
                            i === Hi && (r = o,
                            i = n),
                            e = Oo(i) ? i.call(e) : i
                        }
                        return e
                    }
                    ,
                    pe.round = $t,
                    pe.runInContext = e,
                    pe.sample = function(e) {
                        return (Eo(e) ? Ce : Ct)(e)
                    }
                    ,
                    pe.size = function(e) {
                        if (null == e)
                            return 0;
                        if (Co(e))
                            return jo(e) ? rs(e) : e.length;
                        var t = Wn(e);
                        return t == oa || t == ua ? e.size : ct(e).length
                    }
                    ,
                    pe.snakeCase = _i,
                    pe.some = function(e, t, n) {
                        var r = Eo(e) ? Rl : Rt;
                        return n && Yn(e, t, n) && (t = Hi),
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
                            if (r < n && bo(e[r], t))
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
                            if (bo(e[n], t))
                                return n
                        }
                        return -1
                    }
                    ,
                    pe.startCase = Ti,
                    pe.startsWith = function(e, t, n) {
                        return e = Zo(e),
                        n = null == n ? 0 : Le(Jo(n), 0, e.length),
                        t = Ut(t),
                        e.slice(n, n + t.length) == t
                    }
                    ,
                    pe.subtract = G,
                    pe.sum = function(e) {
                        return e && e.length ? Gl(e, Di) : 0
                    }
                    ,
                    pe.sumBy = function(e, t) {
                        return e && e.length ? Gl(e, Bn(t, 2)) : 0
                    }
                    ,
                    pe.template = function(a, e, t) {
                        var n = pe.templateSettings;
                        t && Yn(a, e, t) && (e = Hi),
                        a = Zo(a),
                        e = ei({}, e, n, An);
                        var l, s, r = ci(n = ei({}, e.imports, n.imports, An)), o = Wl(n, r), u = 0, n = e.interpolate || el, c = "__p += '", n = p((e.escape || el).source + "|" + n.source + "|" + (n === ka ? qa : el).source + "|" + (e.evaluate || el).source + "|$", "g"), i = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ll + "]") + "\n";
                        if (a.replace(n, function(e, t, n, r, o, i) {
                            return n = n || r,
                            c += a.slice(u, i).replace(tl, Zl),
                            t && (l = !0,
                            c += "' +\n__e(" + t + ") +\n'"),
                            o && (s = !0,
                            c += "';\n" + o + ";\n__p += '"),
                            n && (c += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
                            u = i + e.length,
                            e
                        }),
                        c += "';\n",
                        e = y.call(e, "variable") && e.variable) {
                            if (Va.test(e))
                                throw new d("Invalid `variable` option passed into `_.template`")
                        } else
                            c = "with (obj) {\n" + c + "\n}\n";
                        if (c = (s ? c.replace(Pa, "") : c).replace(Ca, "$1").replace(_a, "$1;"),
                        c = "function(" + (e || "obj") + ") {\n" + (e ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}",
                        (e = Ni(function() {
                            return f(r, i + "return " + c).apply(Hi, o)
                        })).source = c,
                        Ao(e))
                            throw e;
                        return e
                    }
                    ,
                    pe.times = function(e, t) {
                        if ((e = Jo(e)) < 1 || Ji < e)
                            return [];
                        var n = Ki
                          , r = q(e, Ki);
                        for (t = Bn(t),
                        e -= Ki,
                        r = Hl(r, t); ++n < e; )
                            t(n);
                        return r
                    }
                    ,
                    pe.toFinite = qo,
                    pe.toInteger = Jo,
                    pe.toLength = $o,
                    pe.toLower = function(e) {
                        return Zo(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = Ko,
                    pe.toSafeInteger = function(e) {
                        return e ? Le(Jo(e), -Ji, Ji) : 0 === e ? e : 0
                    }
                    ,
                    pe.toString = Zo,
                    pe.toUpper = function(e) {
                        return Zo(e).toUpperCase()
                    }
                    ,
                    pe.trim = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? zl(e) : e && (t = Ut(t)) ? (e = os(e),
                        t = os(t),
                        Kt(e, Jl(e, t), $l(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.slice(0, is(e) + 1) : e && (t = Ut(t)) ? Kt(e = os(e), 0, $l(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.replace(Ba, "") : e && (t = Ut(t)) ? Kt(e = os(e), Jl(e, os(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, o = "...";
                        ko(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? Jo(t.length) : r,
                        o = "omission"in t ? Ut(t.omission) : o);
                        var i, t = (e = Zo(e)).length;
                        if (Ql(e) && (t = (i = os(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - rs(o)) < 1)
                            return o;
                        if (r = i ? Kt(i, 0, t).join("") : e.slice(0, t),
                        n === Hi)
                            return r + o;
                        if (i && (t += r.length - t),
                        Fo(n)) {
                            if (e.slice(t).search(n)) {
                                var a, l = r;
                                for (n.global || (n = p(n.source, Zo(Ja.exec(n)) + "g")),
                                n.lastIndex = 0; a = n.exec(l); )
                                    var s = a.index;
                                r = r.slice(0, s === Hi ? t : s)
                            }
                        } else
                            e.indexOf(Ut(n), t) == t || -1 < (t = r.lastIndexOf(n)) && (r = r.slice(0, t));
                        return r + o
                    }
                    ,
                    pe.unescape = function(e) {
                        return (e = Zo(e)) && Aa.test(e) ? e.replace(Ta, as) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++s;
                        return Zo(e) + t
                    }
                    ,
                    pe.upperCase = xi,
                    pe.upperFirst = Ai,
                    pe.each = Yr,
                    pe.eachRight = Zr,
                    pe.first = Pr,
                    Mi(pe, (Gi = {},
                    $e(pe, function(e, t) {
                        y.call(pe.prototype, t) || (Gi[t] = e)
                    }),
                    Gi), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    Sl(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    Sl(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === Hi ? 1 : W(Jo(e), 0);
                            var t = this.__filtered__ && !r ? new ye(this) : this.clone();
                            return t.__filtered__ ? t.__takeCount__ = q(e, t.__takeCount__) : t.__views__.push({
                                size: q(e, Ki),
                                type: n + (t.__dir__ < 0 ? "Right" : "")
                            }),
                            t
                        }
                        ,
                        ye.prototype[n + "Right"] = function(e) {
                            return this.reverse()[n](e).reverse()
                        }
                    }),
                    Sl(["filter", "map", "takeWhile"], function(e, t) {
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
                    Sl(["head", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        ye.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    Sl(["initial", "tail"], function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        ye.prototype[e] = function() {
                            return this.__filtered__ ? new ye(this) : this[n](1)
                        }
                    }),
                    ye.prototype.compact = function() {
                        return this.filter(Di)
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
                            return ot(e, t, n)
                        })
                    }),
                    ye.prototype.reject = function(e) {
                        return this.filter(mo(Bn(e)))
                    }
                    ,
                    ye.prototype.slice = function(e, t) {
                        e = Jo(e);
                        var n = this;
                        return n.__filtered__ && (0 < e || t < 0) ? new ye(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)),
                        t !== Hi && (n = (t = Jo(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                        n)
                    }
                    ,
                    ye.prototype.takeRightWhile = function(e) {
                        return this.reverse().takeWhile(e).reverse()
                    }
                    ,
                    ye.prototype.toArray = function() {
                        return this.take(Ki)
                    }
                    ,
                    $e(ye.prototype, function(u, e) {
                        var c = /^(?:filter|find|map|reject)|While$/.test(e)
                          , d = /^(?:head|last)$/.test(e)
                          , f = pe[d ? "take" + ("last" == e ? "Right" : "") : e]
                          , p = d || /^find/.test(e);
                        f && (pe.prototype[e] = function() {
                            function e(e) {
                                return e = f.apply(pe, Al([e], n)),
                                d && a ? e[0] : e
                            }
                            var t = this.__wrapped__
                              , n = d ? [1] : arguments
                              , r = t instanceof ye
                              , o = n[0]
                              , i = r || Eo(t);
                            i && c && "function" == typeof o && 1 != o.length && (r = i = !1);
                            var a = this.__chain__
                              , l = !!this.__actions__.length
                              , o = p && !a
                              , l = r && !l;
                            if (p || !i)
                                return o && l ? u.apply(this, n) : (s = this.thru(e),
                                o ? d ? s.value()[0] : s.value() : s);
                            t = l ? t : new ye(this);
                            var s = u.apply(t, n);
                            return s.__actions__.push({
                                func: Wr,
                                args: [e],
                                thisArg: Hi
                            }),
                            new ge(s,a)
                        }
                        )
                    }),
                    Sl(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                        var n = i[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , o = /^(?:pop|shift)$/.test(e);
                        pe.prototype[e] = function() {
                            var t = arguments;
                            if (!o || this.__chain__)
                                return this[r](function(e) {
                                    return n.apply(Eo(e) ? e : [], t)
                                });
                            var e = this.value();
                            return n.apply(Eo(e) ? e : [], t)
                        }
                    }),
                    $e(ye.prototype, function(e, t) {
                        var n, r = pe[t];
                        r && (n = r.name + "",
                        y.call(oe, n) || (oe[n] = []),
                        oe[n].push({
                            name: t,
                            func: r
                        }))
                    }),
                    oe[hn(Hi, 2).name] = [{
                        name: "wrapper",
                        func: Hi
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
                          , n = Eo(e)
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
                                    t = q(t, e + a);
                                    break;
                                case "takeRight":
                                    e = W(e, t - a)
                                }
                            }
                            return {
                                start: e,
                                end: t
                            }
                        }(0, o, this.__views__)
                          , a = i.start
                          , l = (i = i.end) - a
                          , s = r ? i : a - 1
                          , u = this.__iteratees__
                          , c = u.length
                          , d = 0
                          , f = q(l, this.__takeCount__);
                        if (!n || !r && o == l && f == l)
                            return Ht(e, this.__actions__);
                        var p = [];
                        e: for (; l-- && d < f; ) {
                            for (var m = -1, v = e[s += t]; ++m < c; ) {
                                var h = u[m]
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
                        this.__values__ === Hi && (this.__values__ = Wo(this.value()));
                        var e = this.__index__ >= this.__values__.length;
                        return {
                            done: e,
                            value: e ? Hi : this.__values__[this.__index__++]
                        }
                    }
                    ,
                    pe.prototype.plant = function(e) {
                        for (var t, n = this; n instanceof he; ) {
                            var r = gr(n);
                            r.__index__ = 0,
                            r.__values__ = Hi,
                            t ? o.__wrapped__ = r : t = r;
                            var o = r
                              , n = n.__wrapped__
                        }
                        return o.__wrapped__ = e,
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
                                args: [Rr],
                                thisArg: Hi
                            }),
                            new ge(e,this.__chain__)
                        }
                        return this.thru(Rr)
                    }
                    ,
                    pe.prototype.toJSON = pe.prototype.valueOf = pe.prototype.value = function() {
                        return Ht(this.__wrapped__, this.__actions__)
                    }
                    ,
                    pe.prototype.first = pe.prototype.head,
                    R && (pe.prototype[R] = function() {
                        return this
                    }
                    ),
                    pe
                }();
                fl._ = ls,
                (k = function() {
                    return ls
                }
                .call(N, R, N, O)) === Hi || (O.exports = k)
            }
            .call(this)
        }
    }
      , r = {};
    function Cl(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, Cl),
        t.loaded = !0,
        t.exports
    }
    Cl.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return Cl.d(t, {
            a: t
        }),
        t
    }
    ,
    Cl.d = function(e, t) {
        for (var n in t)
            Cl.o(t, n) && !Cl.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    Cl.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    Cl.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    Cl.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var I, w, $, D, L, M, K = React, Y = Cl.n(K), e = ReactDOM, N = CoreUtilities, p = ReactUtilities, S = CoreRobloxUtilities, E = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, P = Roblox, r = P.EnvironmentUrls.apiGatewayUrl, a = {
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
                IsGameStorePreviewEnabled: !1
            },
            gameDetailsExposure: {
                IsEventsSectionUprankEnabled: !1,
                IsEventsSectionRedesignEnabled: !1
            },
            searchPage: {
                ShouldUseOmniSearchAPI: !1
            },
            discoverPage: {
                IsChartsPageRenameEnabled: !0
            },
            tileLayer: {},
            playButton: {
                HasUpdatedPlayButtons: !1,
                HasUpdatedPlayButtonsVpc: !1
            }
        }, _ = {
            homePage: "PlayerApp.HomePage.UX",
            homePageWeb: "Website.Homepage",
            serverTab: "GameDetails.ServersTab",
            gameDetails: "Website.GameDetails",
            gameDetailsExposure: "Website.GameDetails.Exposure",
            searchPage: "Website.SearchResultsPage",
            discoverPage: "Website.GamesPage",
            tileLayer: "Website.TileLayer",
            playButton: "Website.PlayButton"
        }, t = P.EnvironmentUrls.apiGatewayUrl, s = {
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
                getSearchLandingPage: {
                    url: t + "/search-api/search-landing-page",
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
        (ee = I = I || {}).Game = "Game",
        ee.CatalogAsset = "CatalogAsset",
        ee.CatalogBundle = "CatalogBundle",
        (re = w = w || {}).Carousel = "Carousel",
        re.AvatarCarousel = "AvatarCarousel",
        re.SortlessGrid = "SortlessGrid",
        re.FriendCarousel = "FriendCarousel",
        re.InterestGrid = "InterestGrid",
        re.Pills = "Pills",
        re.Sdui = "sdui",
        (he = {}).Sponsored = "Sponsored",
        he.SponsoredGame = "SponsoredGame",
        (at = $ = $ || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        at.GridTile = "GridTile",
        at.EventTile = "EventTile",
        at.InterestTile = "InterestTile",
        at.ExperienceEventsTile = "ExperienceEventsTile",
        (lt = D = D || {}).Always = "Always",
        lt.Hover = "Hover",
        lt.Footer = "Footer",
        (St = L = L || {}).Disabled = "Disabled",
        St.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var n, o = "robloxAttributionIds";
        function i(e) {
            var t = window
              , n = t[o];
            return n || (n = {},
            t[o] = n),
            (t = n[e]) || (t = N.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function l() {
            return document.getElementById("place-list")
        }
        (n = n || {}).GameDetailReferral = "gameDetailReferral";
        var Z, u = function(e) {
            return "discover#/sortName/" + e
        }, c = function(e) {
            return "discover#/sortName/v2/" + e
        }, d = function(e) {
            return "charts#/sortName/" + e
        };
        function v(e, t, n) {
            return void 0 === n && (n = {}),
            N.urlService.getUrlWithQueries(S.entityUrl.game.getRelativePath(e) + "/" + N.seoName.formatSeoName(t), n)
        }
        function R(e, t, n, r, o) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === o && (o = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case Z.HomePage:
                    return c(r);
                case Z.GamesPage:
                    return (n ? d : u)(r);
                default:
                    return c(r)
                }
            }(e, t, r),
            N.urlService.getUrlWithQueries(r, b(b({}, n), o))
        }
        function f() {
            return document.referrer
        }
        (cr = Z = Z || {}).SearchPage = "searchPage",
        cr.SortDetailPageDiscover = "sortDetailPageDiscover",
        cr.SortDetailPageHome = "sortDetailPageHome",
        cr.GameDetailPage = "gameDetailPage",
        cr.GamesPage = "gamesPage",
        cr.HomePage = "homePage",
        cr.PeopleListInHomePage = "peopleListInHomePage",
        cr.InterestCatcher = "interestCatcher",
        cr.SearchLandingPage = "searchLandingPage";
        var k, m, U, h, g, y, b = function() {
            return (b = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, F = v, T = function() {
            return (T = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, x = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        }, A = (Ca = S.eventStreamService.eventTypes).pageLoad, O = Ca.formInteraction;
        function B(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === P.Presence.PresenceTypes.InGame
            })
        }
        function j(e, t) {
            var n = 0;
            if (void 0 !== e && void 0 !== t) {
                if (!Number.isNaN(e) && !Number.isNaN(t)) {
                    if (0 === e && 0 === t)
                        return;
                    n = 0 === e && 0 !== t ? 0 : 0 !== e && 0 === t || 100 < (n = Math.floor(e / (e + t) * 100)) ? 100 : n
                }
                return n
            }
        }
        function G(t, e) {
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
        function z(r, o, e, t) {
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[k.ThumbnailAssetIds] = e.map(function(e) {
                return null !== (e = H(r[e], o.toString())) && void 0 !== e ? e : "0"
            }),
            t[k.ThumbnailListIds] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = o.toString(),
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
        function W(r, o, e, t) {
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[k.TileBadgeContexts] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = o.toString(),
                t.layoutDataBySort && e && t.layoutDataBySort[e] ? n = V(t.layoutDataBySort[e]) : t.defaultLayoutData && (n = V(t.defaultLayoutData)),
                n) && void 0 !== n ? n : "0"
            }),
            t) : {}
        }
        function q(n, r, e, t) {
            if (void 0 === n || void 0 === r || void 0 === e)
                return {};
            var o = []
              , i = [];
            return t.forEach(function(e) {
                var t = n + Math.floor(e / r)
                  , e = e % r;
                o.push(t),
                i.push(e)
            }),
            (t = {})[k.RowsOnPage] = o,
            t[k.PositionsInRow] = i,
            t
        }
        function J(e) {
            return void 0 !== e ? {
                inputUniverseIds: {
                    interestCatcher: e.map(function(e) {
                        return e.toString()
                    })
                }
            } : {}
        }
        function Q(t) {
            return ue(void 0, void 0, Promise, function() {
                return ce(this, function(e) {
                    return [2, N.httpService.get({
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
        (ee = k = k || {}).AbsPositions = "absPositions",
        ee.AdsPositions = "adsPositions",
        ee.AdFlags = "adFlags",
        ee.Algorithm = "algorithm",
        ee.AppliedFilters = "appliedFilters",
        ee.AttributionId = "attributionId",
        ee.ComponentType = "componentType",
        ee.Direction = "direction",
        ee.Distance = "distance",
        ee.HttpReferrer = "httpReferrer",
        ee.EmphasisFlag = "emphasisFlag",
        ee.FilterId = "filterId",
        ee.FilterIds = "filterIds",
        ee.GameSetTargetId = "gameSetTargetId",
        ee.GameSetTypeId = "gameSetTypeId",
        ee.InteractionType = "interactionType",
        ee.IsAd = "isAd",
        ee.NativeAdData = "nativeAdData",
        ee.AdIds = "adIds",
        ee.NumberOfLoadedTiles = "numberOfLoadedTiles",
        ee.Page = "page",
        ee.PageSession = "pageSession",
        ee.PlaceId = "placeId",
        ee.PlayContext = "playContext",
        ee.Position = "position",
        ee.PreviousOptionId = "previousOptionId",
        ee.PromptId = "promptId",
        ee.PromptText = "promptText",
        ee.ResourceId = "resourceId",
        ee.ResponseOptionIds = "responseOptionIds",
        ee.ResponseOptionTexts = "responseOptionTexts",
        ee.RootPlaceIds = "rootPlaceIds",
        ee.SelectedIds = "selectedIds",
        ee.SelectedTexts = "selectedTexts",
        ee.ScreenSizeX = "screenSizeX",
        ee.ScreenSizeY = "screenSizeY",
        ee.ScrollAreaSize = "scrollAreaSize",
        ee.ScrollDepth = "scrollDepth",
        ee.SelectedOptionId = "selectedOptionId",
        ee.SelectedOptionIds = "selectedOptionIds",
        ee.ShareLinkType = "shareLinkType",
        ee.ShareLinkId = "shareLinkId",
        ee.SortId = "sortId",
        ee.SortPos = "sortPos",
        ee.StartDepth = "startDepth",
        ee.StartPos = "startPos",
        ee.SuggestionKwd = "suggestionKwd",
        ee.SuggestionReplacedKwd = "suggestionReplacedKwd",
        ee.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        ee.SuggestionAlgorithm = "suggestionAlgorithm",
        ee.TimeToRespond = "timeToRespond",
        ee.Token = "token",
        ee.Topics = "topics",
        ee.TreatmentType = "treatmentType",
        ee.UniverseId = "universeId",
        ee.UniverseIds = "universeIds",
        ee.FriendId = "friendId",
        ee.ThumbnailAssetIds = "thumbnailAssetIds",
        ee.ThumbnailListIds = "thumbnailListIds",
        ee.LinkPath = "linkPath",
        ee.LocationName = "locationName",
        ee.RowsOnPage = "rowsOnPage",
        ee.PositionsInRow = "positionsInRow",
        ee.NavigationUids = "navigationUids",
        ee.TileBadgeContexts = "tileBadgeContexts",
        ee.ButtonName = "buttonName",
        ee.IsInterested = "isInterested",
        ee.InterestedUniverseIds = "interestedUniverseIds",
        (re = m = m || {}).GameImpressions = "gameImpressions",
        re.GameDetailReferral = "gameDetailReferral",
        re.SortDetailReferral = "sortDetailReferral",
        re.FeedScroll = "feedScroll",
        re.NavigateToSortLink = "navigateToSortLink",
        re.SurveyInteraction = "surveyInteraction",
        re.SurveyImpression = "surveyImpression",
        re.InterestCatcherClick = "interestCatcherClick",
        re.FilterImpressions = "filterImpressions",
        re.GamesFilterClick = "gamesFilterClick",
        re.RequestRefundClick = "requestRefundClick",
        (he = U = U || {}).HomePageSessionInfo = "homePageSessionInfo",
        he.GameSearchSessionInfo = "gameSearchSessionInfo",
        he.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        he.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
        (at = {}).Submission = "submission",
        at.Cancellation = "cancellation",
        (lt = h = h || {}).Horizontal = "horizontal",
        lt.Vertical = "vertical",
        (St = g = g || {}).Skip = "skip",
        St.Continue = "continue",
        St.Interested = "interested",
        (cr = y = y || {}).OpenDropdown = "openDropdown",
        cr.CloseDropdown = "closeDropdown",
        cr.Apply = "apply";
        var X = ((Ca = {})[m.GameImpressions] = function(e) {
            e = x(e, []);
            return [{
                name: m.GameImpressions,
                type: m.GameImpressions,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: m.GameDetailReferral,
                type: m.GameDetailReferral,
                context: A
            }, te(T(((t = {})[k.AttributionId] = i(n.GameDetailReferral),
            t[k.HttpReferrer] = f(),
            t), e))]
        }
        ,
        Ca[m.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SortDetailReferral,
                type: m.SortDetailReferral,
                context: A
            }, te(T({}, e))]
        }
        ,
        Ca[m.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.NavigateToSortLink,
                type: m.NavigateToSortLink,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyInteraction,
                type: m.SurveyInteraction,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyImpression,
                type: m.SurveyImpression,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.InterestCatcherClick,
                type: m.InterestCatcherClick,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.FilterImpressions,
                type: m.FilterImpressions,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.GamesFilterClick,
                type: m.GamesFilterClick,
                context: O
            }, te(T({}, e))]
        }
        ,
        Ca[m.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: m.RequestRefundClick,
                type: m.RequestRefundClick,
                context: O
            }, te(((t = {})[k.PlaceId] = e.placeId,
            t))]
        }
        ,
        Ca)
          , ee = (new P.Intl).getDateTimeFormatter()
          , te = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return "object" == typeof n[t] && n[t] && (e[t] = JSON.stringify(n[t])),
                "number" == typeof n[t] && (e[t] = n[t]),
                "string" == typeof n[t] && (e[t] = encodeURIComponent(n[t])),
                "boolean" == typeof n[t] && (e[t] = n[t] ? 1 : 0),
                e
            }, {})
        }
          , ne = N.urlService.parseQueryString
          , re = N.numberFormat.getNumberFormat
          , oe = j
          , ie = function(e, t) {
            t = j(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , ae = function(e) {
            return -1 === e ? "--" : N.abbreviateNumber.getAbbreviatedValue(e)
        }
          , le = function(n, r) {
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
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ue = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , ce = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
          , de = function(r, o, i) {
            return void 0 === i && (i = 1),
            ue(void 0, void 0, Promise, function() {
                var n, t;
                return ce(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return e.trys.push([0, 2, , 3]),
                        [4, N.httpService.get(a.getExperimentationValues(i, r, Object.keys(o)))];
                    case 1:
                        return n = e.sent().data,
                        t = Object.keys(n).reduce(function(e, t) {
                            return null !== n[t] && (e[t] = n[t]),
                            e
                        }, {}),
                        [2, se(se({}, o), t)];
                    case 2:
                        return e.sent(),
                        [2, o];
                    case 3:
                        return [2]
                    }
                })
            })
        }
          , fe = function(r, o, i, a, l) {
            return ue(void 0, void 0, Promise, function() {
                var t, n;
                return ce(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = se(se({
                            pageType: r,
                            sessionId: o,
                            supportedTreatmentTypes: [w.SortlessGrid],
                            authIntentData: a
                        }, i), J(l)),
                        [4, N.httpService.post(s.url.getOmniRecommendations, t)];
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
          , pe = function(n, r) {
            return ue(void 0, void 0, Promise, function() {
                var t;
                return ce(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, N.httpService.post(s.url.getOmniRecommendationsMetadata, {
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
          , me = function() {
            return N.httpService.get(s.url.getGuacAppPolicyBehaviorData()).then(function(e) {
                return e.data
            })
        }
          , ve = function(r) {
            return ue(void 0, void 0, Promise, function() {
                var t, n;
                return ce(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: P.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                            retryable: !0,
                            withCredentials: !0
                        },
                        n = {
                            userIds: r,
                            fields: ["names.combinedName", "names.username"]
                        },
                        [4, N.httpService.post(t, n)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , he = Cl(9870)
          , ge = Cl.n(he)
          , ye = ReactStyleGuide
          , be = ye.Button.variants;
        function Ie(n, r) {
            var o;
            return void 0 === r && (r = 300),
            [function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                clearTimeout(o),
                o = setTimeout(function() {
                    n.apply(void 0, e)
                }, r)
            }
            , function() {
                clearTimeout(o)
            }
            ]
        }
        (at = function(e) {
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
        var we, Se, Ee, Pe, Ce = at, _e = function() {
            var e = (0,
            K.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = (e = Ie(function() {
                n(!0)
            }, 100))[0]
              , o = e[1]
              , i = (e = Ie(function() {
                n(!1)
            }, 100))[0]
              , a = e[1];
            return [t, function() {
                a(),
                r()
            }
            , function() {
                o(),
                i()
            }
            ]
        }, Te = function(e, t) {
            return (0,
            K.useMemo)(function() {
                return e.layoutDataBySort && t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
            }, [e.layoutDataBySort, e.defaultLayoutData, t])
        }, xe = HeaderScripts, Ae = P.EnvironmentUrls.gamesApi, Oe = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: Ae + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: Ae + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: Ae + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: Ae + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: Ae + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: Ae + "/v1/games/sorts",
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
                },
                getAssetDataFromAssetId: function(e) {
                    return {
                        url: P.EnvironmentUrls.assetDeliveryApi + "/v2/assetId/" + e,
                        withCredentials: !0
                    }
                }
            },
            defaultCacheCriteria: {
                refreshCache: !1,
                expirationWindowMS: 3e4,
                useCache: !0
            }
        }, Ne = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }, Re = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
        }, ke = Oe.defaultCacheCriteria, De = S.dataStores.gamesDataStore, Le = S.dataStores.userDataStoreV2, Me = (S.dataStores.localeDataStore,
        S.dataStores.userDataStore.FriendsUserSortType), Ue = function() {
            return Le.getFriends({
                userId: null === xe.authenticatedUser || void 0 === xe.authenticatedUser ? void 0 : xe.authenticatedUser.id,
                userSort: Me.StatusFrequents,
                isGuest: !1
            }, ke)
        }, Fe = function(t) {
            return Ne(void 0, void 0, Promise, function() {
                return Re(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, De.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Be = function(n) {
            return Ne(void 0, void 0, Promise, function() {
                var t;
                return Re(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, De.getPlaceDetails([n])];
                    case 1:
                        return t = e.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                })
            })
        }, je = function(e) {
            return N.httpService.get(Oe.url.getAssetDataFromAssetId(e)).then(function(e) {
                return e.data
            })
        };
        function Ge(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function He(e) {
            return e.isShimmerEnabled ? "shimmer-animation" : null
        }
        function ze(e) {
            return e !== we.IMAGE_TOP_LEFT ? "" : "game-card-pill-top-left"
        }
        function Ve(e) {
            var t = [];
            return (e = null === (e = null == e ? void 0 : e.tileBadgesByPosition) || void 0 === e ? void 0 : e.ImageTopLeft) && e.length && (t = e.map(function(e) {
                var t, n = {
                    id: e.analyticsId
                };
                return e.tileBadgeType === Pe.Text && e.text ? (n.text = e.text,
                n.animationClass = He(e)) : e.tileBadgeType === Pe.Icon && e.icons && (t = e.icons.map(Ge).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = He(e)),
                n
            })),
            t.length ? ((e = {})[we.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function We(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === Ee.TextLabel ? e.footer : null
        }
        (lt = we = we || {}).INVALID = "Invalid",
        lt.IMAGE_TOP_LEFT = "ImageTopLeft",
        lt.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (St = Se = Se || {}).Home = "Home",
        St.Games = "Games",
        (cr = {}).Invalid = "Invalid",
        cr.HasLootBoxes = "HasLootBoxes",
        cr.HasInGameTrading = "HasInGameTrading",
        cr.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        cr.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        cr.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        cr.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (Ca = {}).MorphToR6 = "MorphToR6",
        Ca.PlayerChoice = "PlayerChoice",
        Ca.MorphToR15 = "MorphToR15",
        (Ee = Ee || {}).TextLabel = "TextLabel",
        (re = Pe = Pe || {}).Text = "Text",
        re.Icon = "Icon";
        var qe = RobloxThumbnails
          , Je = {
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
            linkStartDelimiter: "{linkStart}",
            linkEndDelimiter: "{linkEnd}"
        }
          , $e = {
            numGameCarouselLookAheadWindows: 3,
            adSortDiscoverId: 27,
            carouselContainerBufferWidth: 80,
            gameTileGutterWidth: 14,
            wideGameTileGutterWidth: 16,
            scrollerWidth: 30
        }
          , Ke = {
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
          , Ye = .1
          , Ze = "SearchLandingMissingSortIdError"
          , Qe = "undefined"
          , Xe = 5
          , et = Je
          , ee = $e
          , he = Ke
          , tt = {
            ActionApply: "Action.Apply",
            LabelSponsoredAd: "Label.SponsoredAd",
            LabelNoSearchResults: "LabelNoSearchResults",
            LabelPlayingOnePlusUsersWithComma: "LabelPlayingOnePlusUsersWithComma",
            LabelPlayingOneUser: "LabelPlayingOneUser",
            LabelBy: "LabelCreatorBy",
            LabelByPrefix: "Label.By"
        }
          , nt = {
            LabelApiError: "Label.ApiError",
            LabelGames: "Label.Games",
            LabelSponsoredAdsDisclosureStatic: "Label.SponsoredAdsDisclosureStatic"
        }
          , rt = {
            LabelDiscover: "Label.Discover",
            LabelCharts: "Label.Charts",
            ActionClose: "Action.Close",
            ActionDropdownSelected: "Action.DropdownSelected",
            ActionDropdownNotSelected: "Action.DropdownNotSelected"
        }
          , ot = {
            ActionSeeAll: "Action.SeeAll",
            ActionInterestCatcherContinue: "Action.InterestCatcherContinue",
            ActionInterestCatcherContinueSelected: "Action.InterestCatcherContinueSelected",
            ActionInterestCatcherSkip: "Action.InterestCatcherSkip",
            ActionInterestCatcherInterested: "Action.InterestCatcherInterested"
        }
          , it = {
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
            LabelVoiceChat: "Label.VoiceChat",
            HeadingRefund: "Heading.Refund",
            ActionRequestRefund: "Action.RequestRefund"
        }
          , at = PropTypes
          , lt = Cl.n(at)
          , st = "Label.ContextMenuTitle"
          , ut = "Action.ViewDetails"
          , ct = "Action.JoinGame"
          , dt = {
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
        function ft(e) {
            var t = e.game
              , n = e.translate
              , r = t.universeId
              , o = t.name
              , e = t.referralUrl
              , t = t.isPlayable
              , r = Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: qe.ThumbnailFormat.jpeg
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
            }, o), !t && Y().createElement(ye.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(ut))))
        }
        ft.propTypes = {
            game: lt().shape({
                universeId: lt().number,
                placeId: lt().number,
                name: lt().string,
                playerCount: lt().number,
                isShowSponsoredLabel: lt().bool,
                nativeAdData: lt().string,
                imageUrl: lt().string,
                referralUrl: lt().string,
                isPlayable: lt().bool
            }).isRequired,
            translate: lt().func.isRequired
        };
        var pt = ft;
        function mt(e) {
            var t = e.playerId
              , e = e.altName;
            return Y().createElement("div", {
                className: "avatar-card-link"
            }, Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.avatarHeadshot,
                size: qe.ThumbnailAvatarHeadshotSize.size48,
                targetId: t,
                imgClassName: "avatar-card-image",
                format: qe.ThumbnailFormat.webp,
                altName: e
            }))
        }
        mt.defaultProps = {
            altName: ""
        },
        mt.propTypes = {
            playerId: lt().number.isRequired,
            altName: lt().string
        };
        var vt = mt;
        function ht(e) {
            var t = e.playerData
              , i = e.dismissModal
              , n = e.isPlayable
              , r = e.translate
              , e = t.presence
              , a = e.rootPlaceId
              , l = e.placeId
              , s = e.gameId
              , u = t.id
              , t = t.nameForDisplay;
            return Y().createElement("div", {
                className: "border-bottom player-info"
            }, Y().createElement("span", {
                className: "player-name"
            }, t), Y().createElement(ye.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , n = S.playGameService.buildPlayGameProperties(a, l, s, u)
                      , r = dt.joinGameInPlacesList
                      , o = dt.gamePlayIntentInPlacesList
                      , o = {
                        eventName: r.name,
                        ctx: r.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: o.ctx
                    };
                    S.playGameService.launchGame(n, o),
                    i(e)
                },
                isDisabled: !n
            }, r(ct)))
        }
        ht.propTypes = {
            playerData: lt().shape({
                presence: lt().shape({
                    rootPlaceId: lt().number,
                    placeId: lt().number,
                    gameId: lt().string
                }),
                id: lt().number,
                nameForDisplay: lt().string
            }).isRequired,
            dismissModal: lt().func.isRequired,
            isPlayable: lt().bool.isRequired,
            translate: lt().func.isRequired
        };
        var gt = ht;
        function yt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , o = e.dismissModal
              , i = e.isPlayable
              , a = e.translate
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
                }, Y().createElement(vt, {
                    playerId: t,
                    altName: e
                })), Y().createElement(gt, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        yt.propTypes = {
            friendsData: lt().arrayOf(lt().shape({
                presense: lt().shape({
                    rootPlaceId: lt().number,
                    placeId: lt().number,
                    gameId: lt().string
                }),
                id: lt().number,
                nameForDisplay: lt().string
            })).isRequired,
            friendsInGame: lt().arrayOf(lt().number).isRequired,
            dismissModal: lt().func.isRequired,
            isPlayable: lt().bool.isRequired,
            translate: lt().func.isRequired
        };
        var bt = yt;
        function It(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(st);
            return Y().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, Y().createElement(ye.Modal.Header, {
                title: e,
                onClose: o
            }), Y().createElement(pt, {
                game: r,
                translate: i
            }), Y().createElement(bt, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        It.propTypes = {
            friendsData: lt().arrayOf(lt().shape({
                presense: lt().shape({
                    rootPlaceId: lt().number,
                    placeId: lt().number,
                    gameId: lt().string
                }),
                id: lt().number,
                nameForDisplay: lt().string
            })).isRequired,
            friendsInGame: lt().arrayOf(lt().number).isRequired,
            game: lt().shape({
                universeId: lt().number,
                placeId: lt().number,
                name: lt().string,
                playerCount: lt().number,
                isShowSponsoredLabel: lt().bool,
                nativeAdData: lt().string,
                imageUrl: lt().string,
                referralUrl: lt().string,
                isPlayable: lt().bool
            }).isRequired,
            dismissModal: lt().func.isRequired,
            translate: lt().func.isRequired
        };
        var wt = It
          , St = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (cr = function(e) {
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
        var Et = cr
          , Pt = function() {
            return (Pt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ct = ((Ca = {})[$.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ca[$.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        Ca[$.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ca[$.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        Ca[$.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        Ca)
          , _t = Pt(Pt({}, Ct), ((re = {})[$.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        re))
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
                    className: "game-card-pills-container " + ze(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return Y().createElement(Nt, {
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
        function At(e) {
            return e = e.playerCount,
            e = ae(e),
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-player-count"
            }, Y().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), Y().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function Ot(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = ge()("game-card-image-pill", {
                "hover-only": e === D.Hover
            });
            return Y().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, Y().createElement(At, {
                playerCount: t
            }))
        }
        (at = function(e) {
            var t = e.animationClass
              , n = e.isFocused
              , r = e.icons
              , o = e.text;
            return null != r && r.length || o ? Y().createElement("div", {
                className: "game-card-pill-with-animation"
            }, Y().createElement("div", {
                className: ge()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
                e))
            }, (null == r ? void 0 : r.length) && r.map(function(e, t) {
                return Y().createElement("span", {
                    key: t,
                    className: "game-card-pill-icon " + e
                })
            }), o && Y().createElement("div", {
                className: "game-card-pill-text"
            }, o))) : null
        }
        ).defaultProps = {
            animation: void 0
        };
        var Nt = at;
        function Rt(e) {
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
        Ot.defaultProps = {
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
              , o = e.isOnScreen
              , i = e.page
              , a = e.buildEventProperties
              , l = e.isFocused
              , s = e.topicId
              , e = qe.ThumbnailGameIconSize.size256
              , s = Te(r, s);
            return Y().createElement(ye.Link, {
                url: F(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, Y().createElement(Lt, {
                gameLayoutData: s,
                isFocused: !!l
            }), i === Z.GamesPage ? Y().createElement("div", {
                className: "game-card-thumb-container"
            }, Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: qe.ThumbnailFormat.jpeg,
                altName: r.name
            })) : Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: qe.ThumbnailFormat.jpeg,
                altName: r.name
            }), Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        }
        (cr = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = Ve(t);
            return e ? Y().createElement(xt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? Y().createElement(Rt, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== D.Always && n !== D.Hover ? null : Y().createElement(Ot, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Lt = cr
          , Mt = function() {
            return (Mt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ut = Ke.keyBoardEventCode
          , Ft = Ke.numberOfInGameAvatarIcons
          , Bt = Ke.numberOfInGameNames;
        function jt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , e = e.playerCount
              , t = ie(n, t)
              , e = ae(e);
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
        function Gt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = Ke.RatingPercentageText
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
            }, e(tt.LabelSponsoredAd), Y().createElement(Et, {
                tooltipText: e(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            })))
        }
        function qt(e) {
            return e = e.user,
            Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.avatarHeadshot,
                size: qe.ThumbnailAvatarHeadshotSize.size48,
                targetId: e.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: qe.ThumbnailFormat.webp,
                altName: e.displayName
            })
        }
        function Jt(e) {
            return e = e.translate,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, Y().createElement(Et, {
                tooltipText: e(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            }), Y().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(tt.LabelSponsoredAd)))
        }
        function $t(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = Ke.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Ft ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? Ft - 1 : Ft
              , o = ge()("avatar-card", {
                "avatar-card-online": n
            });
            return Y().createElement("div", {
                className: "info-avatar"
            }, r && Y().createElement("div", {
                className: o
            }, Y().createElement("div", {
                className: "avatar-count-container"
            }, Y().createElement("span", {
                className: "avatar-count info-label"
            }, r))), t.slice(0, e).map(function(e) {
                return Y().createElement("div", {
                    className: o,
                    key: e.displayName
                }, Y().createElement(qt, {
                    user: e
                }))
            }))
        }
        function Kt(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, Y().createElement($t, {
                friendsData: t,
                isOnline: e
            }), Y().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function Yt(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            K.useState)(!1)
              , e = o[0]
              , i = o[1];
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return Y().createElement("div", {
                className: "game-card-friend-info game-card-info",
                "data-testid": "game-tile-stats-friends"
            }, Y().createElement("div", {
                className: "info-avatar",
                style: {
                    width: 22 * (t.slice(0, Ft).length - 1) + 32 + "px"
                }
            }, t.slice(0, Ft).map(function(e) {
                return Y().createElement("div", {
                    className: "avatar-card",
                    role: "button",
                    tabIndex: 0,
                    key: e.displayName,
                    onClick: function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        i(!0)
                    },
                    onKeyDown: function(e) {
                        e.code === Ut.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        i(!0))
                    }
                }, Y().createElement(qt, {
                    user: e
                }))
            })), r && Y().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Bt ? r(tt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Bt
            }) : r(tt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), Y().createElement(Zt, {
                friendsDataInGame: t,
                game: n,
                show: e,
                onHide: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    i(!1)
                }
            }))
        }
        Dt.defaultProps = {
            page: Z.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        Yt.defaultProps = {
            translate: void 0
        };
        var Zt = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , e = e.translate;
            return Y().createElement(ye.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, Y().createElement(wt, {
                friendsData: r.map(function(e) {
                    return Mt(Mt({}, e), {
                        nameForDisplay: e.displayName
                    })
                }),
                friendsInGame: r.map(function(e) {
                    return e.id
                }),
                game: o,
                dismissModal: n,
                translate: e
            }))
        }, St)
          , Qt = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , Xt = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
        (Ca = (0,
        K.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.page
              , a = void 0 === i ? Z.HomePage : i
              , l = e.className
              , s = void 0 === l ? "grid-item-container game-card-container" : l
              , u = e.friendData
              , c = void 0 === u ? [] : u
              , d = e.isOnScreen
              , i = void 0 === d || d
              , l = e.shouldShowMetadata
              , f = void 0 === l || l
              , u = e.isSponsoredFooterAllowed
              , p = void 0 !== u && u
              , d = e.topicId
              , m = e.translate
              , l = (0,
            K.useState)()
              , v = l[0]
              , h = l[1]
              , u = _e()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            K.useMemo)(function() {
                return B(c, o.universeId)
            }, [c, o.universeId])
              , y = Te(o, d);
            (0,
            K.useEffect)(function() {
                void 0 === v && 0 < g.length && Qt(void 0, void 0, void 0, function() {
                    var t;
                    return Xt(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Be(o.placeId.toString())];
                        case 1:
                            return t = e.sent(),
                            h(t),
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
            }, [g, v]);
            return Y().createElement("div", {
                ref: t,
                className: s,
                "data-testid": "game-tile",
                onMouseOver: l,
                onMouseLeave: u,
                onFocus: l,
                onBlur: u
            }, Y().createElement(Dt, {
                id: n,
                isOnScreen: i,
                buildEventProperties: r,
                gameData: o,
                page: a,
                isFocused: e,
                topicId: d
            }, function() {
                if (!f)
                    return Y().createElement(Y().Fragment, null);
                if (null != o && o.isShowSponsoredLabel || null != o && o.isSponsored && p)
                    return Y().createElement(Wt, {
                        translate: m
                    });
                var e = We(y);
                return e ? Y().createElement(Ht, {
                    footerData: e
                }) : 0 < g.length && v ? Y().createElement(Yt, {
                    friendData: g,
                    gameData: v
                }) : null != o && o.friendActivityTitle ? Y().createElement(Vt, {
                    footerText: o.friendActivityTitle
                }) : Y().createElement(jt, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var en = Ca;
        (re = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = (0,
            K.useState)(void 0)
              , a = i[0]
              , l = i[1]
              , e = (0,
            K.useState)(void 0)
              , i = e[0]
              , s = e[1];
            if ((0,
            K.useEffect)(function() {
                Be(t).then(function(e) {
                    return l(e)
                }).catch(function() {
                    s(!0)
                })
            }, [t]),
            void 0 === a && !i)
                return Y().createElement(nn, null);
            r = ge()(r, "btn-full-width");
            return Y().createElement(Y().Fragment, null, Y().createElement(ye.Link, {
                "data-testid": "hover-tile-purchase-button",
                className: r,
                url: n || (null == a ? void 0 : a.url)
            }, Y().createElement("span", {
                className: o
            }), Y().createElement("span", {
                className: "btn-text"
            }, (null == a ? void 0 : a.price) || "--"), " "))
        }
        ).defaultProps = {
            clientReferralUrl: ""
        };
        var tn = re
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
              , o = (0,
            K.useMemo)(function() {
                return H(t, n)
            }, [t, n])
              , e = (0,
            K.useMemo)(function() {
                return r === $.EventTile ? qe.ThumbnailGameThumbnailSize.width576 : qe.ThumbnailGameThumbnailSize.width384
            }, [r]);
            return null !== o ? Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.assetThumbnail,
                size: e,
                targetId: o,
                containerClass: "brief-game-icon",
                format: qe.ThumbnailFormat.jpeg,
                altName: t.name
            }) : Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameThumbnail,
                size: e,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: qe.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
        function on(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , e = e.children;
            return n ? Y().createElement(ye.Link, {
                url: o,
                className: t,
                tabIndex: r ? 0 : -1
            }, e) : Y().createElement("span", {
                className: t
            }, e)
        }
        (at = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.buttonClassName
              , i = e.purchaseIconClassName
              , a = e.clientReferralUrl
              , l = e.shouldPurchaseNavigateToDetails
              , e = P.PlayButton.usePlayabilityStatus
              , s = P.PlayButton.PlayabilityStatuses
              , u = P.PlayButton.PlayButton
              , c = P.PlayButton.PurchaseButton
              , e = e(t)
              , d = e[0]
              , f = e[1];
            switch (d) {
            case void 0:
            case s.GuestProhibited:
            case s.Playable:
                return Y().createElement(u, {
                    universeId: t,
                    placeId: n,
                    status: null != d ? d : s.Playable,
                    eventProperties: r,
                    buttonClassName: o ? ge()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case s.PurchaseRequired:
                return l ? Y().createElement(tn, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: ge()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
                }) : Y().createElement(c, {
                    universeId: t,
                    placeId: n,
                    iconClassName: null != i ? i : "icon-common-play",
                    refetchPlayabilityStatus: f,
                    buttonClassName: o
                });
            case s.UniverseRootPlaceIsPrivate:
                return Y().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, Y().createElement("span", {
                    className: "icon-status-private"
                }));
            default:
                return Y().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
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
        var an = at;
        (cr = Y().forwardRef(function(e, t) {
            var n = e.gameData
              , r = e.id
              , o = e.buildEventProperties
              , i = e.friendData
              , a = void 0 === i ? [] : i
              , l = e.playerCountStyle
              , s = e.playButtonStyle
              , u = e.navigationRootPlaceId
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
              , I = void 0 === b ? void 0 : b
              , w = e.translate
              , S = 0 === r
              , E = r === et.maxWideGameTilesPerCarouselPage - 1
              , P = _e()
              , C = P[0]
              , _ = P[1]
              , T = P[2]
              , i = (0,
            K.useState)(n.placeId)
              , x = i[0]
              , A = i[1];
            (0,
            K.useEffect)(function() {
                u && !Number.isNaN(u) ? A(parseInt(u, 10)) : n.navigationUid && Fe(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && A(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function O() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== $.EventTile ? Y().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, Y().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            K.useMemo)(function() {
                return F(x, n.name, o(n, r))
            }, [n, o, r, x])
              , v = o(n, r)
              , N = (0,
            K.useMemo)(function() {
                return B(a, n.universeId)
            }, [a, n.universeId])
              , R = (0,
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
                }(a, n.friendVisits)
            }, [a, n.friendVisits])
              , k = Te(n, m)
              , g = function() {
                return (f !== $.GridTile || s !== L.Disabled) && ((f !== $.EventTile || s === L.Enabled) && f !== $.InterestTile)
            }
              , b = (0,
            K.useMemo)(function() {
                return null != k && k.title ? k.title : n.name
            }, [n.name, null == k ? void 0 : k.title])
              , e = f !== $.InterestTile
              , P = f !== $.InterestTile
              , i = (0,
            K.useCallback)(function() {
                I && I()
            }, [I]);
            return Y().createElement("li", {
                className: ge()("list-item", "hover-game-tile", {
                    "grid-tile": f === $.GridTile
                }, {
                    "event-tile": f === $.EventTile
                }, {
                    "interest-tile": f === $.InterestTile
                }, {
                    "first-tile": S
                }, {
                    "last-tile": E
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
            }, Y().createElement(on, {
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
            }), Y().createElement(Lt, {
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
                var e = O();
                if (C && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return Y().createElement(Jt, {
                        translate: w
                    });
                e = We(k);
                return e ? Y().createElement(Ht, {
                    footerData: e
                }) : 0 < (null == N ? void 0 : N.length) ? Y().createElement(Kt, {
                    friendsData: N,
                    isOnline: !0
                }) : 0 < (null == R ? void 0 : R.length) ? Y().createElement(Kt, {
                    friendsData: R,
                    isOnline: !1
                }) : n.friendVisitedString ? Y().createElement(zt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === D.Footer ? Y().createElement(jt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : Y().createElement(Gt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: w
                })
            }()), Y().createElement("div", {
                className: "hover-metadata"
            }, O()))), C && p === M.imageOverlay && g() && Y().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, Y().createElement(an, {
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
            }, Y().createElement(an, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === $.InterestTile && Y().createElement(ye.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: w(ot.ActionInterestCatcherInterested),
                onClick: i
            }, y ? Y().createElement("span", {
                className: "icon-heart-red"
            }) : Y().createElement("span", {
                className: "icon-heart"
            }), Y().createElement("span", null, w(ot.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var ln = cr
          , sn = function() {
            return (sn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , un = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (Ca = (0,
        K.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = un(e, ["componentType"]);
            switch (n) {
            case $.AppGameTileNoMetadata:
                return Y().createElement(en, sn({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case $.GridTile:
            case $.EventTile:
            case $.InterestTile:
                return Y().createElement(ln, sn({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return Y().createElement(en, sn({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var cn = Ca
          , dn = (0,
        K.forwardRef)(function(e, t) {
            var n = e.gameData
              , r = e.buildEventProperties
              , o = e.translate
              , i = e.friendData
              , a = e.componentType
              , l = e.playerCountStyle
              , s = e.playButtonStyle
              , u = e.navigationRootPlaceId
              , c = e.isSponsoredFooterAllowed
              , d = e.hoverStyle
              , f = e.topicId
              , p = e.isExpandHomeContentEnabled
              , m = e.tileRef
              , p = ge()("game-carousel", {
                "wide-game-tile-carousel": a === $.GridTile || a === $.EventTile
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
                    componentType: a,
                    playerCountStyle: l,
                    playButtonStyle: s,
                    navigationRootPlaceId: u,
                    isSponsoredFooterAllowed: c,
                    hoverStyle: d,
                    topicId: f,
                    ref: m,
                    key: t,
                    id: t,
                    gameData: e,
                    translate: o,
                    buildEventProperties: r,
                    friendData: i
                })
            }))
        });
        function fn(e) {
            var t = e.children
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && ne(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            K.useState)(e && "string" == typeof e ? e : N.uuidService.generateRandomUuid())[0];
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
              , o = e.formatSubtitleLink
              , i = e.subtitleLink
              , a = e.handleSeeAllLinkClick
              , l = e.backgroundImageAssetId
              , s = (0,
            K.useMemo)(function() {
                var e = t && parseInt(t, 10);
                if (e || 0 === e)
                    return e
            }, [t])
              , u = (e = (0,
            K.useState)(void 0 !== s ? s - Math.floor(Date.now() / 1e3) : void 0))[0]
              , c = e[1];
            (0,
            K.useEffect)(function() {
                if (void 0 !== s) {
                    c(s - Math.floor(Date.now() / 1e3));
                    var e = setInterval(function() {
                        c(s - Math.floor(Date.now() / 1e3))
                    }, 15e3);
                    return function() {
                        clearInterval(e)
                    }
                }
                c(void 0)
            }, [s]);
            var d = (0,
            K.useMemo)(function() {
                if (void 0 !== u && r) {
                    var e = 0
                      , t = 0;
                    if (0 < u && (t = Math.ceil(u / 60),
                    t -= 60 * (e = Math.floor(t / 60))),
                    e < 24)
                        return r.replace("{hours}", e.toString()).replace("{minutes}", t.toString())
                }
                return n
            }, [n, u, r])
              , e = (0,
            K.useMemo)(function() {
                if (o && i && d) {
                    var e = d.indexOf(yn)
                      , t = d.indexOf(bn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + yn.length, t)
                          , t = d.slice(t + bn.length);
                        return Y().createElement(ye.Link, {
                            url: i,
                            onClick: a
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
            }, [d, i, l, a]);
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
              , o = r[0]
              , i = r[1]
              , r = (0,
            K.useState)(new Set)
              , a = r[0]
              , l = r[1]
              , s = (0,
            K.useRef)(null)
              , u = (0,
            K.useRef)(n);
            (0,
            K.useEffect)(function() {
                u.current = n
            }, [n]);
            var c = (0,
            K.useCallback)(function() {
                le(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), Ke.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = u.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = X.gameImpressions(t),
                    S.eventStreamService.sendEvent.apply(S.eventStreamService, t),
                    i(function(e) {
                        var t = e;
                        return n.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }))
                })
            }, [o, a])
              , r = Ie(function() {
                return c()
            })
              , d = r[0]
              , f = r[1];
            (0,
            K.useEffect)(function() {
                var e, i = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return s.current = S.elementVisibilityService.observeChildrenVisibility({
                    elements: i,
                    threshold: Ke.gameImpressionsIntersectionThreshold
                }, function(e, t) {
                    f();
                    var n, r, o = (n = t,
                    r = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = i.findIndex(function(e) {
                            return e === t.target
                        })) && (r.push(e),
                        n.unobserve(t.target))
                    }),
                    r.sort(function(e, t) {
                        return e - t
                    }));
                    l(function(e) {
                        var t = e;
                        return o.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }),
                    d()
                }),
                function() {
                    null != s && s.current && s.current()
                }
            }, [t, e, a, d, f])
        }
          , hn = function() {
            return (hn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , gn = (0,
        K.createContext)("")
          , yn = Je.linkStartDelimiter
          , bn = Je.linkEndDelimiter;
        function In(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            K.useState)("")
              , e = r[0]
              , o = r[1];
            return (0,
            K.useEffect)(function() {
                var t = !0;
                return n ? Q(n).then(function(e) {
                    t && o(e)
                }, function() {
                    t && o("")
                }) : o(""),
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
              , o = e.isDisabled
              , e = e.isNewScrollArrowsEnabled;
            return Y().createElement("div", {
                "data-testid": "game-carousel-scroll-bar",
                className: t,
                onClick: r,
                "aria-disabled": o,
                onKeyDown: function(e) {
                    e.code === En.enter && (e.stopPropagation(),
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
        (re = function(e) {
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
              , f = e.endTimestamp
              , p = e.countdownString
              , m = e.backgroundImageAssetId
              , v = e.translate
              , h = (0,
            K.useMemo)(function() {
                return u || (s ? v(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, v])
              , g = (0,
            K.useMemo)(function() {
                return v(a ? it.LabelLearnMore : ot.ActionSeeAll)
            }, [a, v])
              , e = (0,
            K.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = X.navigateToSortLink(e),
                S.eventStreamService.sendEvent.apply(S.eventStreamService, e))
            }, [a, l]);
            return Y().createElement("div", {
                className: "game-sort-header-container"
            }, Y().createElement("div", {
                className: c
            }, Y().createElement("h2", {
                className: "sort-header"
            }, d ? Y().createElement("span", null, t) : Y().createElement(ye.Link, {
                url: r
            }, t), h && Y().createElement(Et, {
                tooltipText: h
            })), !d && Y().createElement(ye.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, g)), Y().createElement(mn, {
                defaultSubtitle: n,
                endTimestamp: f,
                countdownString: p,
                formatSubtitleLink: a || i,
                subtitleLink: o,
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
        var Sn = re
          , En = Ke.keyBoardEventCode;
        function Pn(e) {
            var t = e.distance
              , n = e.scrollAreaSize
              , r = e.direction
              , o = e.startingPosition
              , i = e.currentPage
              , a = e.pageSession
              , l = e.gameSetTypeId
              , s = e.gameSetTargetId
              , u = e.sortPosition
              , e = ((e = {})[k.StartPos] = o,
            e[k.Distance] = t,
            e[k.Direction] = r,
            e[k.PageSession] = a,
            e[k.GameSetTypeId] = l,
            e[k.GameSetTargetId] = s,
            e[k.SortPos] = u,
            e[k.ScrollDepth] = t / n,
            e[k.StartDepth] = o / n,
            e[k.ScreenSizeX] = window.innerWidth,
            e[k.ScreenSizeY] = window.innerHeight,
            e[k.ScrollAreaSize] = n,
            e);
            P.EventStream.SendEventWithTarget(m.FeedScroll, i, e, P.EventStream.TargetTypes.WWW)
        }
        function Cn(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            K.useRef)(t)
              , s = pn()
              , u = (0,
            K.useMemo)(function() {
                return Ie(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    Pn({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: h.Horizontal,
                        gameSetTypeId: r,
                        gameSetTargetId: o,
                        sortPosition: i,
                        pageSession: s
                    }),
                    l.current = e)
                }, 250)[0]
            }, [n, r, o, i, s]);
            (0,
            K.useEffect)(function() {
                u(t)
            }, [u, t])
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
        function An(e) {
            return "filters"in e
        }
        function On(e, t) {
            return "recommendationList"in e ? _n(e.recommendationList, t) : xn(e) ? e.games : []
        }
        function Nn(e) {
            if (e && xn(e))
                return e.gameSetTargetId
        }
        function Rn(e) {
            var t = Nn(e);
            return void 0 !== t ? ((e = {})[k.GameSetTargetId] = t,
            e) : {}
        }
        function kn(e) {
            if (e = e.find(An)) {
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
        (at = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , t = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? Y().createElement(Y().Fragment, null, !r && Y().createElement(wn, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && Y().createElement(wn, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: t,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : Y().createElement(Y().Fragment, null, n && r ? null : Y().createElement(wn, {
                scrollClassNames: ge()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), Y().createElement(wn, {
                scrollClassNames: ge()("scroller", "next", {
                    disabled: o
                }),
                scrollIconClassName: "icon-games-carousel-right",
                isDisabled: o,
                scroll: t,
                isNewScrollArrowsEnabled: !1
            }))
        }
        ).defaultProps = {
            isNewScrollArrowsEnabled: void 0
        };
        var Ln = at
          , Mn = function() {
            return (Mn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
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
            e = Fn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Bn.prototype.set = function(e, t) {
            var n = Fn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Bn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = Fn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Bn.prototype.has = function(e) {
            return !!~Fn(this.__entries__, e)
        }
        ,
        Bn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Bn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        Bn);
        function Fn(e, n) {
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
          , Gn = void 0 !== Cl.g && Cl.g.Math === Math ? Cl.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , Hn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Gn) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , zn = 2
          , Vn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , Wn = "undefined" != typeof MutationObserver
          , qn = (Jn.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        Jn.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        Jn.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        Jn.prototype.updateObservers_ = function() {
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
        Jn.prototype.connect_ = function() {
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
        Jn.prototype.disconnect_ = function() {
            jn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        Jn.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Vn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        Jn.getInstance = function() {
            return this.instance_ || (this.instance_ = new Jn),
            this.instance_
        }
        ,
        Jn.instance_ = null,
        Jn);
        function Jn() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                Hn(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < zn)
                        return;
                    a = !0
                } else
                    a = !(i = !0),
                    setTimeout(t, o);
                l = e
            }
            var r, o, i, a, l;
            this.connected_ = !1,
            this.mutationEventsAdded_ = !1,
            this.mutationsObserver_ = null,
            this.observers_ = [],
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this),
            this.refresh = (r = this.refresh.bind(this),
            a = i = !(o = 20),
            l = 0,
            n)
        }
        var $n = function(e, t) {
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
          , Kn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Gn
        }
          , Yn = nr(0, 0, 0, 0);
        function Zn(e) {
            return parseFloat(e) || 0
        }
        function Qn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Zn(n["border-" + t + "-width"])
            }, 0)
        }
        function Xn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Yn;
            var r = Kn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Zn(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Zn(r.width)
              , s = Zn(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Qn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Qn(r, "top", "bottom") + a)),
            (e = e) !== Kn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            nr(o.left, o.top, l, s)
        }
        var er = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Kn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Kn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function tr(e) {
            return jn ? er(e) ? nr(0, 0, (t = (t = e).getBBox()).width, t.height) : Xn(e) : Yn;
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
        var rr = (or.prototype.isActive = function() {
            var e = tr(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        or.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        or);
        function or(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = nr(0, 0, 0, 0),
            this.target = e
        }
        var ir = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            $n(i, {
                x: n,
                y: r,
                width: o,
                height: t,
                top: r,
                right: n + o,
                bottom: t + r,
                left: n
            }),
            i);
            $n(this, {
                target: e,
                contentRect: i
            })
        }
          , ar = (lr.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Kn(e).Element))
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
                if (!(e instanceof Kn(e).Element))
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
                return new ir(e.target,e.broadcastRect())
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
        var sr = new ("undefined" != typeof WeakMap ? WeakMap : Un)
          , ur = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = qn.getInstance()
              , n = new ar(t,n,this);
            sr.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            ur.prototype[t] = function() {
                var e;
                return (e = sr.get(this))[t].apply(e, arguments)
            }
        });
        var cr = void 0 !== Gn.ResizeObserver ? Gn.ResizeObserver : ur
          , dr = null !== (Ca = window.ResizeObserver) && void 0 !== Ca ? Ca : cr
          , fr = function() {
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
              , o = (0,
            K.useRef)(new dr(e))
              , e = (0,
            K.useCallback)(function(e) {
                e && null != o && o.current && (r(e),
                o.current.disconnect(),
                o.current.observe(e))
            }, [r]);
            return (0,
            K.useEffect)(function() {
                return function() {
                    null != o && o.current && o.current.disconnect()
                }
            }, []),
            [e, t]
        }
          , pr = ee.numGameCarouselLookAheadWindows
          , mr = ee.gameTileGutterWidth
          , vr = ee.wideGameTileGutterWidth
          , hr = ee.scrollerWidth
          , gr = he.wideTileHoverGrowWidthPx;
        (re = function(e) {
            var t = e.gameData
              , n = e.sort
              , r = e.positionId
              , o = e.page
              , i = e.gamesContainerRef
              , a = e.buildEventProperties
              , l = e.loadMoreGames
              , s = e.isLoadingMoreGames
              , u = e.componentType
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
              , I = e.isNewScrollArrowsEnabled
              , w = e.hideScrollBackWhenDisabled
              , S = e.sortId
              , E = e.translate
              , P = (0,
            K.useRef)(null)
              , C = (0,
            K.useState)(0)
              , _ = C[0]
              , T = C[1]
              , x = (0,
            K.useState)(!1)
              , A = x[0]
              , O = x[1]
              , e = (0,
            K.useState)(!0)
              , N = e[0]
              , R = e[1]
              , C = (0,
            K.useState)(!0)
              , k = C[0]
              , D = C[1]
              , x = (0,
            K.useState)(0)
              , L = x[0]
              , M = x[1]
              , U = (0,
            K.useMemo)(function() {
                return u === $.GridTile || u === $.EventTile
            }, [u])
              , F = (0,
            K.useMemo)(function() {
                return U ? vr : mr
            }, [U])
              , e = fr()
              , C = e[0]
              , B = e[1]
              , x = fr()
              , e = x[0]
              , j = x[1]
              , G = (0,
            K.useMemo)(function() {
                if (U && f)
                    return f;
                var e = null === (e = null === (e = null == P ? void 0 : P.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== j && void 0 !== e ? Math.max(1, Math.floor((j + F) / (e + F))) : 0
            }, [j, F, f, U]);
            (0,
            K.useEffect)(function() {
                R(0 <= L),
                s || void 0 !== j && void 0 !== B && Math.abs(L) + j + gr >= B ? D(!0) : D(!1)
            }, [L, j, B, null == t ? void 0 : t.length, s]);
            var H = (0,
            K.useCallback)(function() {
                _ + pr * G >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [_, G, l, s, null == t ? void 0 : t.length])
              , z = (0,
            K.useCallback)(function() {
                var e = null === (e = null === (e = null == P ? void 0 : P.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(G) * (e + F)
            }, [G, F])
              , V = (0,
            K.useCallback)(function() {
                var t;
                N || (t = z(),
                M(function(e) {
                    return Math.min(e + t, 0)
                }),
                T(function(e) {
                    return e - G
                }))
            }, [z, N, G])
              , W = (0,
            K.useCallback)(function() {
                var n;
                k || (n = z(),
                M(function(e) {
                    if (b && o === Z.HomePage)
                        return void 0 !== B && void 0 !== j ? Math.max(e - n, -1 * (B - j)) : e - n;
                    if (void 0 === B)
                        return e - n;
                    var t = w && N ? hr : 0;
                    return Math.max(e - n, -1 * B) + t
                }),
                T(function(e) {
                    return e + G
                }),
                H())
            }, [k, z, H, b, o, B, j, w, N, G])
              , q = (0,
            K.useCallback)(function(e) {
                return _ <= e && e < _ + G
            }, [_, G])
              , J = (0,
            K.useCallback)(function(e) {
                A || (O(!0),
                e(),
                setTimeout(function() {
                    O(!1)
                }, 200))
            }, [A])
              , x = (0,
            K.useRef)(null);
            Cn({
                scrollPosition: -L,
                page: o,
                gameSetTypeId: S,
                gameSetTargetId: Nn(n),
                wrapperRef: x,
                sortPosition: r
            });
            r = (0,
            K.useMemo)(function() {
                return ge()({
                    "hlist games game-cards game-tile-list": !U,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": U,
                    "games-page-carousel": o === Z.GamesPage,
                    "home-page-carousel": o === Z.HomePage
                })
            }, [U, o]);
            return Y().createElement("div", {
                "data-testid": "game-carousel",
                ref: x,
                className: ge()("horizontal-scroller games-list", {
                    "home-page-games-list": o === Z.HomePage,
                    "wide-game-tile-list": U,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, Y().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, Y().createElement("div", {
                ref: C,
                className: "horizontally-scrollable",
                style: {
                    left: L + "px"
                }
            }, Y().createElement("ul", {
                ref: i,
                className: r
            }, t.map(function(e, t) {
                return U ? Y().createElement(cn, {
                    key: e.universeId,
                    ref: P,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    translate: E,
                    buildEventProperties: a,
                    componentType: u,
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
                    ref: P,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    className: "game-card-container",
                    translate: E,
                    buildEventProperties: a,
                    componentType: u,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: h,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: v,
                    navigationRootPlaceId: m
                }))
            }))), Y().createElement(Ln, {
                hideScrollBackWhenDisabled: w,
                isScrollBackDisabled: N,
                isScrollForwardDisabled: k,
                onScrollBack: function() {
                    return J(V)
                },
                onScrollForward: function() {
                    return J(W)
                },
                isNewScrollArrowsEnabled: I
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
            isNewScrollArrowsEnabled: void 0,
            hideScrollBackWhenDisabled: !1
        };
        var yr = re
          , br = function() {
            return (br = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (at = function(e) {
            function t(e, t) {
                var n = {};
                return n[k.PlaceId] = e.placeId,
                n[k.UniverseId] = e.universeId,
                n[k.IsAd] = e.isSponsored,
                n[k.NativeAdData] = e.nativeAdData,
                n[k.Position] = t,
                n[k.SortPos] = l,
                n[k.NumberOfLoadedTiles] = (i || []).length,
                n[k.GameSetTypeId] = a.topicId,
                n[k.Page] = Z.HomePage,
                n[U.HomePageSessionInfo] = T,
                n[k.PlayContext] = Z.HomePage,
                n
            }
            var n, r = e.translate, o = e.friendsPresence, i = e.gameData, a = e.sort, l = e.positionId, s = e.componentType, u = e.playerCountStyle, c = e.playButtonStyle, d = e.hoverStyle, f = e.tooltipInfoText, p = e.hideSeeAll, m = e.navigationRootPlaceId, v = e.isSponsoredFooterAllowed, h = e.seeAllLinkPath, g = e.subtitleLinkPath, y = e.itemsPerRow, b = e.startingRow, I = e.endTimestamp, w = e.countdownString, S = e.isExpandHomeContentEnabled, E = e.isCarouselHorizontalScrollEnabled, P = e.isNewScrollArrowsEnabled, C = (0,
            K.useRef)(null), _ = (0,
            K.useRef)(null), T = pn(), x = (0,
            K.useCallback)(function(e) {
                if (void 0 !== i && void 0 !== b) {
                    var t = e.filter(function(e) {
                        return e < (null == i ? void 0 : i.length)
                    });
                    return br(br(br(br(br(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return i[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return i[e].universeId
                    }),
                    e), z(i, a.topicId, t, s)), W(i, a.topicId, t, s)), G(i, t)), q(b, null == i ? void 0 : i.length, null == i ? void 0 : i.length, t)), ((e = {})[k.NavigationUids] = t.map(function(e) {
                        return null !== (e = i[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[k.AbsPositions] = t,
                    e[k.SortPos] = l,
                    e[k.GameSetTypeId] = a.topicId,
                    e[k.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e))
                }
            }, [i, T, l, a.topicId, s, b]);
            vn(C, i.length, x),
            (0,
            K.useEffect)(function() {
                S && y && null != C && C.current && C.current.style.setProperty("--items-per-row", y.toString())
            }, [S, y]);
            var A = (0,
            K.useMemo)(function() {
                return h ? N.urlService.getAbsoluteUrl(h) : R(a.topic, Z.HomePage, {
                    position: l,
                    sortId: a.topicId,
                    page: Z.HomePage,
                    treatmentType: a.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, l, a.topic, a.topicId, a.treatmentType, h])
              , O = (0,
            K.useMemo)(function() {
                return g || A
            }, [g, A])
              , e = (0,
            K.useCallback)(function() {
                var e;
                if (h)
                    return (e = {})[k.LinkPath] = h,
                    e[k.SortPos] = l,
                    e[k.GameSetTypeId] = a.topicId,
                    e[k.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e
            }, [T, l, h, a.topicId]);
            return Y().createElement(In, {
                backgroundImageAssetId: null !== (x = a.topicLayoutData) && void 0 !== x && x.backgroundImageAssetId ? parseInt(null === (x = a.topicLayoutData) || void 0 === x ? void 0 : x.backgroundImageAssetId, 10) : void 0
            }, Y().createElement(Sn, {
                sortTitle: a.topic,
                sortSubtitle: a.subtitle,
                seeAllLink: A,
                subtitleLink: O,
                shouldShowSeparateSubtitleLink: !!g,
                isSortLinkOverrideEnabled: !!h,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: a.topicId === Je.adSortHomePageId,
                tooltipInfoText: f,
                titleContainerClassName: "container-header",
                hideSeeAll: p,
                endTimestamp: I,
                countdownString: w,
                backgroundImageAssetId: null !== (w = a.topicLayoutData) && void 0 !== w && w.backgroundImageAssetId ? parseInt(null === (n = a.topicLayoutData) || void 0 === n ? void 0 : n.backgroundImageAssetId, 10) : void 0,
                translate: r
            }), E ? Y().createElement(yr, {
                gameData: i,
                sort: a,
                positionId: l,
                page: Z.HomePage,
                gamesContainerRef: C,
                buildEventProperties: t,
                loadMoreGames: void 0,
                isLoadingMoreGames: !1,
                componentType: s,
                sortId: a.topicId,
                playerCountStyle: u,
                playButtonStyle: c,
                itemsPerRow: y,
                friendData: o,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: v,
                hoverStyle: d,
                topicId: null === (n = a.topicId) || void 0 === n ? void 0 : n.toString(),
                isExpandHomeContentEnabled: S,
                isCarouselHorizontalScrollEnabled: E,
                isNewScrollArrowsEnabled: P,
                translate: r
            }) : Y().createElement(dn, {
                ref: C,
                tileRef: _,
                gameData: i,
                friendData: o,
                buildEventProperties: t,
                translate: r,
                componentType: s,
                playerCountStyle: u,
                playButtonStyle: c,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: v,
                hoverStyle: d,
                topicId: null === (d = a.topicId) || void 0 === d ? void 0 : d.toString(),
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
        var Ir = at
          , wr = function() {
            return (wr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Sr = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , Er = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
        function Pr() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = wr(wr({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(wr({}, l.current))
            }
            var e = this
              , t = (0,
            K.useState)({})
              , n = t[0]
              , a = t[1]
              , l = (0,
            K.useRef)(n);
            return (0,
            K.useEffect)(function() {
                return Sr(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return Er(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (n = xe.deviceMeta.getDeviceMeta()) ? void 0 : n.deviceType) !== xe.deviceMeta.DeviceTypes.computer || null === P.CurrentUser || void 0 === P.CurrentUser || !P.CurrentUser.isAuthenticated)
                                return [3, 5];
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 4, , 5]),
                            [4, Ue()];
                        case 2:
                            return t = e.sent().userData,
                            0 === (n = t ? t.map(function(e) {
                                return e.id
                            }) : []).length ? [2] : [4, ve(n)];
                        case 3:
                            return r = e.sent().profileDetails,
                            o = (t || []).reduce(function(e, t) {
                                var n = r.find(function(e) {
                                    return e.userId === t.id
                                });
                                return n && (e[t.id] = wr(wr({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(wr({}, l.current)),
                            document.addEventListener("Roblox.Presence.Update", i),
                            [3, 5];
                        case 4:
                            return o = e.sent(),
                            console.error("useFriendsPresence failed to initialized with the error", o),
                            [3, 5];
                        case 5:
                            return [2]
                        }
                    })
                }),
                function() {
                    document.removeEventListener("Roblox.Presence.Update", i)
                }
            }, []),
            Object.values(n)
        }
        function Cr() {
            var e = (0,
            K.useContext)(_r);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var _r = (0,
        K.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Tr = function() {
            return (Tr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ca = function(e) {
            var t = e.translate
              , r = e.gameData
              , o = e.sort
              , i = e.page
              , a = e.positionId
              , n = e.isLoadingMoreGames
              , l = e.loadMoreGames
              , s = e.tooltipInfoText
              , u = e.hideSeeAll
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
                    return Tr(Tr(Tr(Tr(Tr(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), G(r, t)), ((e = {})[k.AbsPositions] = t,
                    e[k.SortPos] = a,
                    e[k.GameSetTypeId] = o.topicId,
                    e)), Rn(o)), Dn(o)), ((e = {})[k.Page] = i,
                    e[k.NumberOfLoadedTiles] = (r || []).length,
                    e[U.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            vn(h, r.length, e),
            (0,
            K.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            K.useMemo)(function() {
                var e = Tr(Tr(((e = {})[k.Position] = a,
                e[k.GameSetTypeId] = o.topicId,
                e), Rn(o)), ((t = {})[k.Page] = i,
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
                }(o);
                return R(o.sortId, i, e, m, t)
            }, [g, i, a, o, m]);
            return Y().createElement("div", {
                className: ge()("games-list-container", {
                    "wide-game-tile-container": c === $.GridTile || c === $.EventTile
                })
            }, Y().createElement(Sn, {
                sortTitle: o.topic,
                sortSubtitle: o.subtitle,
                subtitleLink: v || e,
                seeAllLink: e,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!v,
                shouldShowSponsoredTooltip: o.topicId === $e.adSortDiscoverId,
                tooltipInfoText: s,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: u,
                translate: t
            }), Y().createElement(yr, {
                gamesContainerRef: h,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                sortId: o.topicId,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Tr(Tr(Tr(Tr(((n = {})[k.PlaceId] = e.placeId,
                    n[k.UniverseId] = e.universeId,
                    n[k.IsAd] = e.isSponsored,
                    n[k.NativeAdData] = e.nativeAdData,
                    n[k.Position] = t,
                    n[k.SortPos] = a,
                    n[k.GameSetTypeId] = o.topicId,
                    n), Rn(o)), ((n = {})[k.NumberOfLoadedTiles] = (r || []).length,
                    n[k.Page] = i,
                    n)), Dn(o)), ((n = {})[U.DiscoverPageSessionInfo] = g,
                    n[k.PlayContext] = Z.GamesPage,
                    n))
                },
                translate: t,
                page: i,
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
        var xr = Ca
          , Ar = (0,
        K.createContext)(void 0)
          , Or = function() {
            return (Or = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (cr = function(e) {
            var t = e.translate
              , r = e.sort
              , o = e.positionId
              , n = e.itemsPerRow
              , i = e.gameData
              , a = (0,
            K.useContext)(Ar)
              , l = (0,
            K.useRef)(null)
              , s = Pr()
              , u = (0,
            K.useMemo)(function() {
                var e = function(e) {
                    if (e && xn(e))
                        return e.sortId
                }(r);
                return e || (0,
                E.fireEvent)(Ze),
                null != e ? e : Qe
            }, [r])
              , c = (0,
            K.useCallback)(function(e, t) {
                var n;
                return Or(Or(((n = {})[k.PlaceId] = e.placeId,
                n[k.UniverseId] = e.universeId,
                n[k.IsAd] = e.isSponsored,
                n[k.NativeAdData] = e.nativeAdData,
                n[k.Position] = t,
                n[k.SortPos] = o,
                n[k.NumberOfLoadedTiles] = i.length,
                n[k.GameSetTypeId] = u,
                n), Rn(r)), ((n = {})[k.Page] = Z.SearchLandingPage,
                n[U.SearchLandingPageSessionInfo] = a,
                n[k.PlayContext] = Z.SearchLandingPage,
                n))
            }, [o, i.length, r, a, u])
              , e = (0,
            K.useCallback)(function(e) {
                var t = e.filter(function(e) {
                    return e < i.length
                });
                return Or(Or(Or(Or(Or(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.placeId
                }),
                e[k.UniverseIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.universeId
                }),
                e), z(i, u, t)), W(i, u, t)), G(i, t)), Rn(r)), ((e = {})[k.AbsPositions] = t,
                e[k.SortPos] = o,
                e[k.NumberOfLoadedTiles] = i.length,
                e[k.GameSetTypeId] = u,
                e[k.Page] = Z.SearchLandingPage,
                e[U.SearchLandingPageSessionInfo] = a,
                e))
            }, [i, r, o, a, u]);
            return vn(l, i.length, e),
            Y().createElement(Y().Fragment, null, Y().createElement(Sn, {
                sortTitle: r.topic,
                sortSubtitle: r.subtitle,
                shouldShowSeparateSubtitleLink: !1,
                isSortLinkOverrideEnabled: !1,
                titleContainerClassName: "container-header",
                hideSeeAll: !0,
                translate: t,
                seeAllLink: void 0,
                subtitleLink: void 0,
                shouldShowSponsoredTooltip: void 0
            }), Y().createElement(yr, {
                gameData: i,
                sort: r,
                positionId: o,
                hideScrollBackWhenDisabled: !0,
                sortId: u,
                page: Z.SearchLandingPage,
                gamesContainerRef: l,
                buildEventProperties: c,
                isLoadingMoreGames: !1,
                itemsPerRow: n,
                friendData: s,
                topicId: null === (s = r.topicId) || void 0 === s ? void 0 : s.toString(),
                isExpandHomeContentEnabled: !1,
                isCarouselHorizontalScrollEnabled: !0,
                isNewScrollArrowsEnabled: !1,
                translate: t
            }))
        }
        ).defaultProps = {
            itemsPerRow: void 0
        };
        var Nr = cr;
        function Rr(e) {
            var t = e.sort
              , o = Cr().contentMetadata;
            return 0 === (null == (e = (0,
            K.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, Lr)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : Y().createElement(P.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function kr(e) {
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
                    threshold: Ye
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
        (ee = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.page
              , i = e.itemsPerRow
              , a = e.startingRow
              , l = e.loadMoreGames
              , s = e.isLoadingMoreGames
              , u = e.isExpandHomeContentEnabled
              , c = e.isChartsPageRenameEnabled
              , d = e.isCarouselHorizontalScrollEnabled
              , f = e.isNewScrollArrowsEnabled
              , e = Pr()
              , p = Cr().contentMetadata
              , m = d || o === Z.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === $.EventTile
              , f = f || o === Z.HomePage && (null === (v = null == n ? void 0 : n.topicLayoutData) || void 0 === v ? void 0 : v.componentType) === $.EventTile
              , v = (0,
            K.useMemo)(function() {
                var e;
                return m ? On(n, p) : u ? On(n, p).slice(0, i) : On(n, p).slice(0, function(e, t) {
                    var n = Je.maxWideGameTilesPerCarouselPage
                      , r = Je.maxTilesPerCarouselPage;
                    if (e !== Z.GamesPage && e !== Z.SearchLandingPage)
                        switch (t) {
                        case $.GridTile:
                        case $.EventTile:
                        case $.InterestTile:
                            return n;
                        case $.AppGameTileNoMetadata:
                        default:
                            return r
                        }
                }(o, null === (e = n.topicLayoutData) || void 0 === e ? void 0 : e.componentType))
            }, [n, p, o, i, u, m]);
            return 0 === (null == v ? void 0 : v.length) ? null : o === Z.GamesPage ? Y().createElement(xr, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                page: o,
                gameData: v,
                loadMoreGames: l,
                isLoadingMoreGames: !0 === s,
                tooltipInfoText: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.infoText,
                hideSeeAll: "true" === (null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.hideSeeAll),
                componentType: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.componentType,
                playerCountStyle: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.playerCountStyle,
                playButtonStyle: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.playButtonStyle,
                subtitleLinkPath: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.subtitleLinkPath,
                itemsPerRow: i,
                isChartsPageRenameEnabled: c
            }) : o === Z.SearchLandingPage ? Y().createElement(Nr, {
                key: n.topic,
                sort: n,
                gameData: v,
                translate: t,
                positionId: r,
                itemsPerRow: Xe
            }) : Y().createElement(Ir, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                gameData: v,
                friendsPresence: e,
                itemsPerRow: i,
                startingRow: a,
                componentType: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.componentType,
                playerCountStyle: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.playerCountStyle,
                playButtonStyle: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.playButtonStyle,
                hoverStyle: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.hoverStyle,
                tooltipInfoText: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.infoText,
                hideSeeAll: "true" === (null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.hideSeeAll),
                navigationRootPlaceId: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.navigationRootPlaceId,
                isSponsoredFooterAllowed: "true" === (null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.isSponsoredFooterAllowed),
                seeAllLinkPath: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.linkPath,
                subtitleLinkPath: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.subtitleLinkPath,
                endTimestamp: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.endTimestamp,
                countdownString: null === (a = n.topicLayoutData) || void 0 === a ? void 0 : a.countdownString,
                isExpandHomeContentEnabled: u,
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
        var Dr = ee
          , Lr = Je.maxTilesPerCarouselPage;
        function Mr(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            K.useRef)(null);
            return Y().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, Y().createElement("span", {
                className: "text-label creator-name-label"
            }, l(tt.LabelByPrefix), " "), Y().createElement("a", {
                href: i,
                onClick: function() {
                    P.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, P.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && Y().createElement(Ur.VerifiedBadgeIconContainer, {
                size: Ur.BadgeSizes.CAPTIONHEADER
            }))
        }
        kr.displayName = "SentinelTile",
        kr.defaultProps = {
            loadData: null
        };
        var Ur = RobloxBadges
          , Fr = function() {
            var e = (0,
            K.useState)({
                shouldShowVpcPlayButtonUpsells: void 0,
                shouldShowLikeFavoriteCounts: void 0
            })
              , t = e[0]
              , n = e[1]
              , e = (0,
            K.useState)(!1)
              , r = e[0]
              , o = e[1];
            return (0,
            K.useEffect)(function() {
                o(!0),
                me().then(function(e) {
                    n({
                        shouldShowVpcPlayButtonUpsells: e.shouldShowVpcPlayButtonUpsells,
                        shouldShowLikeFavoriteCounts: e.EnableAggregateLikesFavoritesCount
                    })
                }).catch(function() {
                    n({
                        shouldShowVpcPlayButtonUpsells: !1,
                        shouldShowLikeFavoriteCounts: !1
                    })
                }).finally(function() {
                    o(!1)
                })
            }, []),
            (0,
            K.useMemo)(function() {
                return {
                    shouldShowVpcPlayButtonUpsells: t.shouldShowVpcPlayButtonUpsells,
                    shouldShowLikeFavoriteCounts: t.shouldShowLikeFavoriteCounts,
                    isFetchingPolicy: r
                }
            }, [t.shouldShowVpcPlayButtonUpsells, t.shouldShowLikeFavoriteCounts, r])
        };
        (re = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.disableLoadingState
              , i = e.redirectPurchaseUrl
              , a = P.PlayButton.usePlayabilityStatus
              , l = P.PlayButton.shouldShowUnplayableButton
              , s = P.PlayButton.PlayabilityStatuses
              , u = P.PlayButton.DefaultPlayButton
              , c = a(t)
              , d = c[0]
              , f = c[1]
              , p = _
              , m = C
              , v = (0,
            K.useState)(void 0)
              , h = v[0]
              , g = v[1]
              , y = (0,
            K.useState)(void 0)
              , e = y[0]
              , b = y[1]
              , a = (0,
            K.useState)(!1)
              , c = a[0]
              , I = a[1]
              , v = Fr()
              , y = v.shouldShowVpcPlayButtonUpsells
              , a = v.isFetchingPolicy;
            (0,
            K.useEffect)(function() {
                I(!0),
                de(p.playButton, m.playButton).then(function(e) {
                    g(!0 === e.HasUpdatedPlayButtons),
                    b(!0 === e.HasUpdatedPlayButtonsVpc)
                }).catch(function() {
                    g(m.playButton.HasUpdatedPlayButtons),
                    b(m.playButton.HasUpdatedPlayButtonsVpc)
                }).finally(function() {
                    I(!1)
                })
            }, [p.playButton, m.playButton]);
            v = (0,
            K.useMemo)(function() {
                return !!d && [s.PurchaseRequired, s.FiatPurchaseRequired].includes(d)
            }, [d, s]);
            return c || a ? o ? Y().createElement(u, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: s.Playable,
                eventProperties: r,
                hideButtonText: !0,
                disableLoadingState: o
            }) : Y().createElement(ye.Loading, null) : !h && l(d, y, e) ? Y().createElement("div", {
                className: "btn-growth-lg play-button"
            }, Y().createElement("span", {
                className: "icon-status-unavailable"
            })) : Y().createElement(u, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: d,
                eventProperties: r,
                disableLoadingState: o,
                buttonClassName: v ? "btn-common-play-game-lg purchase-button" : void 0,
                hideButtonText: !v,
                hasUpdatedPlayButtonsIxp: h,
                hasUpdatedPlayButtonsVpcIxp: e,
                shouldShowVpcPlayButtonUpsells: y,
                redirectPurchaseUrl: v ? i : void 0,
                showDefaultPurchaseText: d === s.FiatPurchaseRequired
            })
        }
        ).defaultProps = {
            playButtonEventProperties: {},
            disableLoadingState: !1,
            redirectPurchaseUrl: void 0
        };
        var Br = re
          , jr = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , Gr = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
          , Hr = (0,
        K.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.translate
              , a = e.topicId
              , l = (0,
            K.useState)()
              , s = l[0]
              , u = l[1]
              , c = _e()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Pr()
              , l = Te(o, a)
              , m = (0,
            K.useMemo)(function() {
                return B(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            K.useMemo)(function() {
                return 0 < m.length && s ? Y().createElement(Yt, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : Y().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            K.useEffect)(function() {
                jr(void 0, void 0, void 0, function() {
                    var t;
                    return Gr(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Be(o.placeId.toString())];
                        case 1:
                            return t = e.sent(),
                            u(t),
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
            var a = v(o.placeId, o.name, r(o, n))
              , r = r(o, n)
              , n = We(l);
            return Y().createElement("div", {
                ref: t,
                className: "featured-grid-item-container game-card-container",
                "data-testid": "game-tile-featured",
                onMouseOver: f,
                onMouseLeave: e,
                onFocus: f,
                onBlur: e
            }, Y().createElement(ye.Link, {
                url: a,
                className: "game-card-link",
                id: o.universeId.toString()
            }, Y().createElement(Lt, {
                gameLayoutData: l,
                isFocused: d
            }), Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.ThumbnailGameIconSize.size512,
                targetId: o.universeId,
                containerClass: "game-card-thumb-container",
                format: qe.ThumbnailFormat.jpeg,
                altName: o.name
            }), Y().createElement("div", {
                className: "game-card-name-info"
            }, Y().createElement("div", null, Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: o.name
            }, o.name), n ? Y().createElement(Ht, {
                footerData: n
            }) : Y().createElement(jt, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), Y().createElement(Br, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: N.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && Y().createElement(Mr, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        Hr.displayName = "FeaturedGridTile";
        var zr = function() {
            return (zr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Vr = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (at = (0,
        K.forwardRef)(function(e, t) {
            var n = e.emphasis
              , r = e.friendData
              , o = e.componentType
              , i = e.playerCountStyle
              , a = e.playButtonStyle
              , l = e.isSponsoredFooterAllowed
              , s = e.hoverStyle
              , u = e.topicId
              , c = e.isInterestedUniverse
              , d = e.toggleInterest
              , e = Vr(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? Y().createElement(Hr, zr({
                ref: t
            }, e)) : Y().createElement(cn, zr({
                ref: t,
                friendData: r,
                componentType: o,
                playerCountStyle: i,
                playButtonStyle: a,
                isSponsoredFooterAllowed: l,
                hoverStyle: s,
                topicId: u,
                isInterestedUniverse: c,
                toggleInterest: d
            }, e))
        })).displayName = "GameGridTile",
        at.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var Wr = at
          , qr = (0,
        K.forwardRef)(function(e, t) {
            var n = e.gameData
              , r = e.translate
              , o = e.emphasis
              , i = e.buildEventProperties
              , a = e.tileRef
              , l = e.loadData
              , s = e.shouldUseSentinelTile
              , u = e.friendsPresence
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
                "wide-game-tile-game-grid": c === $.GridTile || c === $.EventTile || c === $.InterestTile
            }, {
                "interest-tile-game-grid": c === $.InterestTile
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
                return Y().createElement(Wr, {
                    ref: function(e) {
                        (!0 === o && 1 === t || !1 === o && 0 === t) && a && (a.current = e)
                    },
                    key: e.universeId,
                    id: t,
                    gameData: e,
                    translate: r,
                    buildEventProperties: i,
                    emphasis: !0 === o && 0 === t && !p,
                    friendData: u,
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
            }), s && Y().createElement(kr, {
                loadData: l
            }))
        });
        qr.displayName = "GameGrid",
        qr.defaultProps = {
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
        var Jr = qr
          , $r = function() {
            return ($r = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ca = function(e) {
            var r = e.gameData
              , o = e.sort
              , i = e.positionId
              , t = e.friendsPresence
              , n = e.componentType
              , a = e.playerCountStyle
              , l = e.playButtonStyle
              , s = e.hoverStyle
              , u = e.itemsPerRow
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
                    return $r($r($r($r($r($r(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), z(r, o.topicId, t, n)), W(r, o.topicId, t, n)), ((e = {})[k.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[k.AbsPositions] = t,
                    e)), G(r, t)), q(c, u, null == r ? void 0 : r.length, t)), ((t = {})[k.SortPos] = i,
                    t[k.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[k.GameSetTypeId] = o.topicId,
                    t[k.Page] = Z.HomePage,
                    t[U.HomePageSessionInfo] = h,
                    t))
                }
            }, [r, h, i, o.topicId, n, u, c]);
            return vn(m, r.length, e),
            (0,
            K.useEffect)(function() {
                u && null != m && m.current && m.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            Y().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, Y().createElement("div", {
                className: "container-header"
            }, Y().createElement("h2", null, o.topic, o.topicId === Je.adSortHomePageId && Y().createElement(Et, {
                tooltipText: p(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics."
            }))), Y().createElement(qr, {
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
                    n[k.SortPos] = i,
                    n[k.NumberOfLoadedTiles] = (r || []).length,
                    n[k.GameSetTypeId] = o.topicId,
                    n[k.Page] = Z.HomePage,
                    n[U.HomePageSessionInfo] = h,
                    n[k.PlayContext] = Z.HomePage,
                    n
                },
                isHomeGameGrid: !0,
                friendsPresence: t,
                componentType: n,
                playerCountStyle: a,
                playButtonStyle: l,
                isSponsoredFooterAllowed: d,
                hoverStyle: s,
                topicId: null === (s = o.topicId) || void 0 === s ? void 0 : s.toString(),
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
        var Kr = Ca
          , Yr = Je.sortlessGridMaxTilesMetadataToFetch;
        (cr = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = Pr()
              , u = pn()
              , e = Cr()
              , c = e.contentMetadata
              , d = e.appendContentMetadata
              , f = (0,
            K.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == c ? void 0 : c[t]) && void 0 !== t && t[e])
                });
                0 < e.length && pe(e.slice(0, Yr), u).then(function(e) {
                    return d(e.contentMetadata)
                }).catch(function() {})
            }, [a, u, c, d]);
            (0,
            K.useEffect)(function() {
                f()
            }, [f]);
            e = (0,
            K.useMemo)(function() {
                return _n(a, c)
            }, [a, c]);
            return 0 === (null == e ? void 0 : e.length) ? null : Y().createElement(Kr, {
                key: n.topic,
                sort: n,
                gameData: e,
                translate: t,
                positionId: r,
                itemsPerRow: o,
                startingRow: i,
                friendsPresence: s,
                componentType: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.componentType,
                playerCountStyle: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.playerCountStyle,
                playButtonStyle: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.playButtonStyle,
                hoverStyle: null === (s = n.topicLayoutData) || void 0 === s ? void 0 : s.hoverStyle,
                isSponsoredFooterAllowed: "true" === (null === (n = n.topicLayoutData) || void 0 === n ? void 0 : n.isSponsoredFooterAllowed),
                isExpandHomeContentEnabled: l
            })
        }
        ).defaultProps = {
            isExpandHomeContentEnabled: void 0
        };
        var Zr = cr
          , Qr = Cl(5250);
        function Xr(e) {
            return (Xr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function eo(e, t) {
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
                    return to(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return to(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function to(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function no(e, t) {
            var n = e.elements
              , r = e.threshold;
            try {
                var o = new window.IntersectionObserver(t,{
                    threshold: r
                });
                return n.forEach(function(e) {
                    o.observe(e)
                }),
                function() {
                    return o.disconnect()
                }
            } catch (e) {}
            return function() {}
        }
        function ro(t, e, r) {
            var n = eo((0,
            K.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = eo((0,
            K.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            K.useRef)(null)
              , u = (0,
            K.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), co).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    r(n),
                    i(function(e) {
                        var t = e;
                        return n.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    })
                })
            }, [o, a, r])
              , c = (0,
            Qr.debounce)(function() {
                return u()
            });
            (0,
            K.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = no({
                    elements: i,
                    threshold: fo
                }, function(e, t) {
                    c.cancel();
                    var n, r, o = (n = t,
                    r = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = i.findIndex(function(e) {
                            return e === t.target
                        })) && (r.push(e),
                        n.unobserve(t.target))
                    }),
                    r.sort(function(e, t) {
                        return e - t
                    }));
                    l(function(e) {
                        var t = e;
                        return o.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }),
                    c()
                }),
                function() {
                    null != s && s.current && s.current()
                }
            }, [t, e, a, c])
        }
        Cl(1315);
        var oo, io, ao, lo, so, uo, co = 25, fo = .5;
        function po(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === Xr(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function mo(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , e = "(" + (null != t ? t : 0) + ")"
              , n = r ? P.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : P.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends";
            return Y().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? Y().createElement("h2", null, o("Heading.Friends")) : Y().createElement("h2", null, o("Heading.Friends"), Y().createElement("span", {
                className: "friends-count"
            }, e)), Y().createElement("a", {
                href: n,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        (ee = oo = oo || {}).ItemImpressions = "itemImpressions",
        ee.ItemAction = "itemAction",
        (re = io = io || {}).Home = "home",
        re.UserProfile = "userProfile",
        (at = ao = ao || {}).HomePageSessionInfo = "homePageSessionInfo",
        at.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        at.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ca = lo = lo || {}).ContentType = "contentType",
        Ca.Context = "context",
        Ca.CollectionId = "collectionId",
        Ca.CollectionPosition = "collectionPosition",
        (cr = {}).Online = "online",
        cr.InGame = "inGame",
        cr.InStudio = "inStudio",
        cr.Offline = "offline",
        (ee = {}).Friend = "friend",
        ee.NotFriend = "notFriend",
        (re = so = so || {}).ItemIds = "itemIds",
        re.ItemPositions = "itemPositions",
        re.RowNumbers = "rowNumbers",
        re.FeedRowNumbers = "feedRowNumbers",
        re.PositionsInRow = "positionsInRow",
        re.PositionsInTopic = "positionsInTopic",
        re.TotalNumberOfItems = "totalNumberOfItems",
        (at = {}).Presences = "presences",
        at.PresenceUniverseIds = "presenceUniverseIds",
        at.FriendStatuses = "friendStatuses",
        at.SourceCarousel = "sourceCarousel",
        (Ca = uo = uo || {}).ItemId = "itemId",
        Ca.ItemPosition = "itemPosition",
        Ca.RowNumber = "rowNumber",
        Ca.FeedRowNumber = "feedRowNumber",
        Ca.PositionInRow = "positionInRow",
        Ca.PositionInTopic = "positionInTopic",
        Ca.TotalNumberOfItems = "totalNumberOfItems",
        (cr = {}).Presence = "presence",
        cr.PresenceUniverseId = "presenceUniverseId",
        cr.FriendStatus = "friendStatus",
        cr.SourceCarousel = "sourceCarousel";
        var vo = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , ho = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
          , go = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , yo = function(n) {
            return vo(void 0, void 0, Promise, function() {
                var t;
                return ho(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, N.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , bo = function(m, v) {
            return vo(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return ho(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (i = m,
                        vo(void 0, void 0, Promise, function() {
                            var t;
                            return ho(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: P.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, N.httpService.get(t)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))] : [3, 2];
                    case 1:
                        return a = e.sent().data,
                        [3, 3];
                    case 2:
                        a = [],
                        e.label = 3;
                    case 3:
                        return (t = a).sort(function(e, t) {
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
                        o = v,
                        vo(void 0, void 0, Promise, function() {
                            var t;
                            return ho(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
                                    t = {
                                        url: o ? t + "?userSort=1" : t,
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, N.httpService.get(t)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))];
                    case 4:
                        for (f = e.sent().PageItems,
                        l = new Map,
                        s = 0,
                        u = t; s < u.length; s++)
                            c = u[s],
                            l.set(c.id, c.userPresence);
                        return d = t.map(function(e) {
                            return e.id
                        }),
                        f = f.filter(function(e) {
                            return !d.includes(e.id)
                        }).map(function(e) {
                            return e.id
                        }),
                        f = go(go([], d), f),
                        [4, (r = f,
                        vo(void 0, void 0, Promise, function() {
                            var t, n;
                            return ho(this, function(e) {
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
                                    [4, N.httpService.post(t, n)];
                                case 1:
                                    return [2, e.sent().data]
                                }
                            })
                        }))];
                    case 5:
                        return f = e.sent().profileDetails,
                        p = [],
                        f.forEach(function(e) {
                            var t, n, r, o, i = l.has(e.userId), a = {
                                isOnline: i,
                                isInGame: i && "InGame" === (null === (t = l.get(e.userId)) || void 0 === t ? void 0 : t.UserPresenceType),
                                lastLocation: !i || null === (n = l.get(e.userId)) || void 0 === n ? void 0 : n.lastLocation,
                                gameId: !i || null === (r = l.get(e.userId)) || void 0 === r ? void 0 : r.gameInstanceId,
                                universeId: !i || null === (o = l.get(e.userId)) || void 0 === o ? void 0 : o.universeId,
                                placeId: !i || null === (a = l.get(e.userId)) || void 0 === a ? void 0 : a.placeId
                            };
                            p.push({
                                id: e.userId,
                                combinedName: e.names.combinedName,
                                presence: a,
                                hasVerifiedBadge: e.isVerified
                            })
                        }),
                        [2, p]
                    }
                    var r, n, o, i
                })
            })
        }
          , Io = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , wo = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
          , So = P.EnvironmentUrls.chatApi
          , Eo = function() {
            return Io(void 0, void 0, Promise, function() {
                var t;
                return wo(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, N.httpService.get({
                            url: So + "/v1/metadata",
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
          , ee = {
            common: [],
            feature: "Feature.PeopleList"
        }
          , re = RobloxPresence
          , Po = Cl.n(re);
        function Co(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return Y().createElement("div", {
                className: "friend-tile-content"
            }, Y().createElement(xo, {
                id: t,
                translate: e,
                userProfileUrl: r,
                handleImageClick: a
            }), Y().createElement("a", {
                href: r,
                onClick: a,
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-label"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-name"
            }, Y().createElement("span", {
                className: "friends-carousel-display-name"
            }, n), i && Y().createElement("div", {
                className: "friend-tile-verified-badge"
            }, Y().createElement("div", {
                className: "friend-tile-spacer"
            }), Y().createElement(Ur.VerifiedBadgeIconContainer, {
                size: Ur.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), Y().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && Y().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function _o(e) {
            var n = e.friend
              , t = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.isInGame
              , a = e.gameUrl
              , l = e.universeId
              , s = e.canChat
              , e = e.translate;
            return Y().createElement("div", {
                className: "friend-tile-dropdown"
            }, i && null != o && Y().createElement("div", {
                className: "in-game-friend-card"
            }, Y().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.ThumbnailGameIconSize.size150,
                targetId: l,
                imgClassName: "game-card-thumb",
                containerClass: "friend-tile-game-card"
            })), Y().createElement("div", {
                className: "friend-presence-info"
            }, Y().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, o), Y().createElement(ye.Button, {
                variant: ye.Button.variants.growth,
                size: ye.Button.sizes.small,
                width: ye.Button.widths.full,
                onClick: function() {
                    return Ao(void 0, void 0, void 0, function() {
                        var t;
                        return Oo(this, function(e) {
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
            }, e("Action.Join")))), Y().createElement("ul", null, s && Y().createElement("li", null, Y().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    S.chatService.startDesktopAndMobileWebChat({
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
        function To(e) {
            function t() {
                l(!0)
            }
            function n(e) {
                var t;
                null == e || null !== (t = s.current) && void 0 !== t && t.contains(e.relatedTarget) || null !== (t = u.current) && void 0 !== t && t.contains(e.relatedTarget) || l(!1)
            }
            var r = e.trigger
              , o = e.content
              , i = e.dropdownWidth
              , a = (0,
            K.useState)(!1)
              , e = a[0]
              , l = a[1]
              , s = (0,
            K.useRef)(null)
              , u = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                return s.current ? (s.current.addEventListener("mouseover", t),
                s.current.addEventListener("mouseout", n),
                function() {
                    var e;
                    null !== (e = s.current) && void 0 !== e && e.removeEventListener("mouseover", t),
                    null !== (e = s.current) && void 0 !== e && e.removeEventListener("mouseout", n)
                }
                ) : function() {}
            }, []),
            Y().createElement("div", null, Y().createElement("div", {
                ref: s
            }, r), e && Y().createElement("div", {
                ref: u,
                style: {
                    position: "absolute",
                    top: ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetHeight) || 0) + ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetTop) || 0),
                    left: (e = ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetLeft) || 0) + ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetWidth) || 0) / 2 - i / 2) < 0 ? 24 : e + i > window.innerWidth ? window.innerWidth - (i + 24) : e,
                    zIndex: 1002,
                    width: i
                },
                onMouseOver: t,
                onMouseOut: n,
                onFocus: t,
                onBlur: n
            }, o))
        }
        (at = function(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.handleImageClick
              , o = e.translate
              , e = Y().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.avatarHeadshot,
                size: qe.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            });
            return Y().createElement(ye.AvatarCardItem.Headshot, {
                statusIcon: Y().createElement(Po().PresenceStatusIcon, {
                    translate: o,
                    userId: t
                }),
                thumbnail: e,
                imageLink: n,
                handleImageClick: r
            })
        }
        ).defaultProps = {
            handleImageClick: void 0
        };
        var xo = at
          , Ao = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , Oo = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
        function No(e) {
            return (No = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Ro(e, t) {
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
                    return ko(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return ko(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function ko(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Do(e, t) {
            var n = e.elements
              , r = e.threshold;
            try {
                var o = new window.IntersectionObserver(t,{
                    threshold: r
                });
                return n.forEach(function(e) {
                    o.observe(e)
                }),
                function() {
                    return o.disconnect()
                }
            } catch (e) {}
            return function() {}
        }
        function Lo(t, e, r) {
            var n = Ro((0,
            K.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = Ro((0,
            K.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            K.useRef)(null)
              , u = (0,
            K.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), qo).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    r(n),
                    i(function(e) {
                        var t = e;
                        return n.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    })
                })
            }, [o, a, r])
              , c = (0,
            Qr.debounce)(function() {
                return u()
            });
            (0,
            K.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = Do({
                    elements: i,
                    threshold: Jo
                }, function(e, t) {
                    c.cancel();
                    var n, r, o = (n = t,
                    r = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = i.findIndex(function(e) {
                            return e === t.target
                        })) && (r.push(e),
                        n.unobserve(t.target))
                    }),
                    r.sort(function(e, t) {
                        return e - t
                    }));
                    l(function(e) {
                        var t = e;
                        return o.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }),
                    c()
                }),
                function() {
                    null != s && s.current && s.current()
                }
            }, [t, e, a, c])
        }
        Cl(6870);
        var Mo, Uo, Fo, Bo, jo, Go, Ho, zo, Vo, Wo, qo = 25, Jo = .5;
        function $o(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === No(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function Ko(e, t, n) {
            return t ? jo.InGame : e && "Studio" === n ? jo.InStudio : e ? jo.Online : jo.Offline
        }
        function Yo(e) {
            var t = e.friend
              , n = e.friendIndex
              , r = e.isOwnUser
              , o = e.translate
              , i = e.canChat
              , a = e.carouselName
              , l = e.eventContext
              , s = e.homePageSessionInfo
              , u = e.sortId
              , c = e.sortPosition
              , d = e.totalNumberOfFriends
              , f = P.EnvironmentUrls.websiteUrl + "/users/" + t.id + "/profile"
              , p = t.combinedName
              , m = Po().usePresence(t.id, void 0)
              , v = null != m && null != m.gameId
              , h = v ? m.lastLocation : null
              , e = null != h && 15 < h.length ? h.slice(0, 15) + "..." : h
              , g = v ? P.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = Xo(t, n, a, l, s, u, c, d);
            return Y().createElement("div", {
                className: "friends-carousel-tile"
            }, Y().createElement(To, {
                trigger: Y().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, Y().createElement(Co, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? Y().createElement(_o, {
                    friend: t,
                    isInGame: v,
                    universeId: null !== (m = m.universeId) && void 0 !== m ? m : 0,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: h,
                    translate: o,
                    gameUrl: g,
                    canChat: i
                }) : Y().createElement("div", null),
                dropdownWidth: null == e ? 240 : 315
            }))
        }
        function Zo(e) {
            var n = e.friendsList
              , r = e.isOwnUser
              , o = e.translate
              , i = e.canChat
              , a = e.carouselName
              , l = e.eventContext
              , s = e.homePageSessionInfo
              , u = e.sortId
              , c = e.sortPosition
              , d = (0,
            K.useRef)(null)
              , t = (v = (0,
            K.useState)(n))[0]
              , f = v[1]
              , p = (0,
            K.useState)(!1)
              , e = p[0]
              , m = p[1]
              , v = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                var e, t = null === (e = d.current) || void 0 === e ? void 0 : e.offsetWidth;
                m(110 * (null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0) > (null != t ? t : 0)),
                null != t && null != n && (t = Math.floor(t / 110),
                f(n.slice(0, t)))
            }, [null === (p = d.current) || void 0 === p ? void 0 : p.offsetWidth, n]),
            ti(v, n, a, l, s, u, c),
            Y().createElement("div", null, Y().createElement("div", {
                ref: function(e) {
                    return d.current = e,
                    d.current
                },
                className: "friends-carousel-container"
            }, null == t ? Y().createElement("span", {
                className: "spinner spinner-default"
            }) : Y().createElement("div", {
                ref: v,
                className: e ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, t.map(function(e, t) {
                return Y().createElement("div", {
                    key: e.id
                }, Y().createElement(Yo, {
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
                    totalNumberOfFriends: null !== (t = null == n ? void 0 : n.length) && void 0 !== t ? t : 0
                }))
            }))))
        }
        (Ca = Mo = Mo || {}).ItemImpressions = "itemImpressions",
        Ca.ItemAction = "itemAction",
        (cr = {}).Home = "home",
        cr.UserProfile = "userProfile",
        (re = Uo = Uo || {}).HomePageSessionInfo = "homePageSessionInfo",
        re.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        re.GameSearchSessionInfo = "gameSearchSessionInfo",
        (at = Fo = Fo || {}).ContentType = "contentType",
        at.Context = "context",
        at.CollectionId = "collectionId",
        at.CollectionPosition = "collectionPosition",
        (Bo = Bo || {}).User = "User",
        (Ca = jo = jo || {}).Online = "online",
        Ca.InGame = "inGame",
        Ca.InStudio = "inStudio",
        Ca.Offline = "offline",
        (cr = Go = Go || {}).Friend = "friend",
        cr.NotFriend = "notFriend",
        (re = Ho = Ho || {}).ItemIds = "itemIds",
        re.ItemPositions = "itemPositions",
        re.RowNumbers = "rowNumbers",
        re.FeedRowNumbers = "feedRowNumbers",
        re.PositionsInRow = "positionsInRow",
        re.PositionsInTopic = "positionsInTopic",
        re.TotalNumberOfItems = "totalNumberOfItems",
        (at = zo = zo || {}).Presences = "presences",
        at.PresenceUniverseIds = "presenceUniverseIds",
        at.FriendStatuses = "friendStatuses",
        at.SourceCarousel = "sourceCarousel",
        (Ca = Vo = Vo || {}).ItemId = "itemId",
        Ca.ItemPosition = "itemPosition",
        Ca.RowNumber = "rowNumber",
        Ca.FeedRowNumber = "feedRowNumber",
        Ca.PositionInRow = "positionInRow",
        Ca.PositionInTopic = "positionInTopic",
        Ca.TotalNumberOfItems = "totalNumberOfItems",
        (cr = Wo = Wo || {}).Presence = "presence",
        cr.PresenceUniverseId = "presenceUniverseId",
        cr.FriendStatus = "friendStatus",
        cr.SourceCarousel = "sourceCarousel";
        var Qo = function() {
            return (Qo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Xo = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            K.useCallback)(function() {
                var e, t = {};
                return t[Fo.Context] = i,
                t[Fo.ContentType] = Bo.User,
                t[Fo.CollectionId] = l,
                t[Fo.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[Vo.TotalNumberOfItems] = u,
                t[Vo.ItemId] = n.id.toString(),
                t[Vo.ItemPosition] = r + 1,
                t[Vo.PositionInTopic] = r + 1,
                t[Vo.RowNumber] = 1,
                t[Wo.Presence] = Ko(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[Wo.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[Wo.FriendStatus] = "friend",
                t[Wo.SourceCarousel] = o,
                t[Uo.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            K.useCallback)(function() {
                var e = t();
                S.eventStreamService.sendEvent({
                    name: Mo.ItemAction,
                    type: Mo.ItemAction,
                    context: i
                }, $o(Qo({}, e)))
            }, [t, i])
        }
          , ei = function() {
            return (ei = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ti = function(e, n, r, o, i, a, l) {
            var t = (0,
            K.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[Fo.Context] = o,
                    e[Fo.ContentType] = Bo.User,
                    e[Fo.CollectionId] = a,
                    e[Fo.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[Ho.TotalNumberOfItems] = n.length,
                    e[Ho.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[Ho.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Ho.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Ho.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[zo.Presences] = t.map(function(e) {
                        var t;
                        return Ko(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[zo.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[zo.FriendStatuses] = t.map(function() {
                        return Go.Friend
                    }),
                    e[zo.SourceCarousel] = r,
                    e[Uo.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            K.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? S.eventStreamService.sendEvent({
                    name: Mo.ItemImpressions,
                    type: Mo.ItemImpressions,
                    context: o
                }, $o(ei({}, e))) : (0,
                E.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            Lo(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        }
          , ni = function(e, a, l, s) {
            return new (l = l || Promise)(function(n, t) {
                function r(e) {
                    try {
                        i(s.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    try {
                        i(s.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function i(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof l ? t : new l(function(e) {
                        e(t)
                    }
                    )).then(r, o)
                }
                i((s = s.apply(e, a || [])).next())
            }
            )
        }
          , ri = function(n, r) {
            var o, i, a, l = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
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
                        if (o)
                            throw new TypeError("Generator is already executing.");
                        for (; l; )
                            try {
                                if (o = 1,
                                i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, t[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (t = [2 & t[0], a.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    a = t;
                                    break;
                                case 4:
                                    return l.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    l.label++,
                                    i = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = l.ops.pop(),
                                    l.trys.pop();
                                    continue;
                                default:
                                    if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        l = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                        l.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && l.label < a[1]) {
                                        l.label = a[1],
                                        a = t;
                                        break
                                    }
                                    if (a && l.label < a[2]) {
                                        l.label = a[2],
                                        l.ops.push(t);
                                        break
                                    }
                                    a[2] && l.ops.pop(),
                                    l.trys.pop();
                                    continue
                                }
                                t = r.call(n, l)
                            } catch (e) {
                                t = [6, e],
                                i = 0
                            } finally {
                                o = a = 0
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
        (re = function(e) {
            var t = e.translate
              , d = e.profileUserId
              , f = e.isOwnUser
              , n = e.carouselName
              , r = e.eventContext
              , o = e.homePageSessionInfo
              , i = e.sortId
              , a = e.sortPosition
              , l = (0,
            K.useState)(null)
              , s = l[0]
              , p = l[1]
              , u = (0,
            K.useState)(null)
              , c = u[0]
              , m = u[1]
              , e = (0,
            K.useState)(!1)
              , l = e[0]
              , v = e[1]
              , u = (0,
            K.useState)(!0)
              , e = u[0]
              , h = u[1];
            return (0,
            K.useEffect)(function() {
                ni(void 0, void 0, void 0, function() {
                    var n, r, a, l, s, u, c;
                    return ri(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return u = [yo(d), bo(d, f), Eo(), (o = d,
                            i = f,
                            ni(void 0, void 0, void 0, function() {
                                var t, n, r;
                                return ri(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        if (i)
                                            return [2, !1];
                                        t = [{
                                            name: "vieweeUserId",
                                            type: "UserId",
                                            value: o.toString()
                                        }],
                                        r = (n = {
                                            mustHideConnections: !0
                                        }).mustHideConnections,
                                        e.label = 1;
                                    case 1:
                                        return e.trys.push([1, 3, , 4]),
                                        [4, P.AccessManagementUpsellV2Service.startAccessManagementUpsell({
                                            featureName: "MustHideConnections",
                                            ampFeatureCheckData: t,
                                            isAsyncCall: !1,
                                            usePrologue: !0,
                                            ampRecourseData: n
                                        })];
                                    case 2:
                                        return r = e.sent(),
                                        [3, 4];
                                    case 3:
                                        return e.sent(),
                                        [2, n.mustHideConnections];
                                    case 4:
                                        return [2, r]
                                    }
                                })
                            }))],
                            [4, (t = u,
                            Promise.all(t.map(function(e) {
                                return e.then(function(e) {
                                    return {
                                        status: "fulfilled",
                                        value: e
                                    }
                                })
                            })))];
                        case 1:
                            return c = e.sent(),
                            n = c[0],
                            r = c[1],
                            a = c[2],
                            l = c[3],
                            s = n.value,
                            u = r.value,
                            c = a.value,
                            p("fulfilled" === n.status ? s.count : 0),
                            m("fulfilled" === r.status ? u : []),
                            v("fulfilled" === a.status && c.chatEnabled),
                            h("fulfilled" !== l.status || l.value),
                            [2]
                        }
                        var t, o, i
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [d, f]),
            e || 0 === s ? Y().createElement("div", {
                className: "friends-carousel-0-friends"
            }) : Y().createElement("div", {
                className: "react-friends-carousel-container"
            }, Y().createElement(mo, {
                friendsCount: s,
                translate: t,
                profileUserId: d,
                isOwnUser: f
            }), Y().createElement(Zo, {
                friendsList: c,
                translate: t,
                isOwnUser: f,
                canChat: l,
                carouselName: n,
                eventContext: r,
                homePageSessionInfo: o,
                sortId: i,
                sortPosition: a
            }))
        }
        ).defaultProps = {
            translate: void 0
        };
        var oi = (0,
        p.withTranslations)(re, ee);
        function ii(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = P.CurrentUser.userId) && void 0 !== o ? o : "0");
            return Y().createElement("div", {
                className: "friend-carousel-container"
            }, Y().createElement(oi, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: ci.WebHomeFriendsCarousel,
                eventContext: io.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function ai(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = pn();
            return Y().createElement(ii, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
        }
        function li(e) {
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
                "aria-label": e(n ? rt.ActionDropdownSelected : rt.ActionDropdownNotSelected, {
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
        function si(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , o = e.setSelectedOptionId
              , i = e.setIsDropdownOpen
              , a = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , s = e.translate
              , e = (0,
            K.useCallback)(function() {
                a(r),
                i(!1),
                l(t.filterId, y.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            K.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, y.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            K.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            K.useCallback)(function(e) {
                e.key === di.keyBoardEventCode.escape && u()
            }, [u]);
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
                    return u()
                },
                "aria-label": s(rt.ActionClose)
            }, Y().createElement("span", {
                className: "icon-close"
            })))), Y().createElement("div", {
                className: "filter-options-container"
            }, t.filterOptions.map(function(e, t) {
                return Y().createElement(Y().Fragment, {
                    key: e.optionId
                }, Y().createElement(li, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
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
            }, s(tt.ActionApply) || "Apply")))
        }
        function ui(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = Y().useRef(null)
              , a = (u = (0,
            K.useState)(!1))[0]
              , l = u[1]
              , s = (e = (0,
            K.useState)(r.selectedOptionId))[0]
              , u = e[1]
              , e = (0,
            K.useMemo)(function() {
                var e = r.filterOptions.find(function(e) {
                    return e.optionId === r.selectedOptionId
                });
                return null == e ? void 0 : e.optionDisplayName
            }, [r.selectedOptionId, r.filterOptions]);
            return Y().createElement("div", {
                ref: i
            }, Y().createElement(ye.Button, {
                onClick: function() {
                    l(function(e) {
                        var t = e ? y.CloseDropdown : y.OpenDropdown
                          , n = e ? s : void 0;
                        return o(r.filterId, t, r.selectedOptionId, n),
                        !e
                    })
                },
                variant: a ? ye.Button.variants.primary : ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                className: "filter-select"
            }, Y().createElement("span", {
                className: "filter-display-text"
            }, e), Y().createElement("span", {
                className: a ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), a && Y().createElement(si, {
                filter: r,
                dropdownContainerRef: i,
                selectedOptionId: s,
                setSelectedOptionId: u,
                setIsDropdownOpen: l,
                updateFilterValue: t,
                sendFilterClickEvent: o,
                translate: n
            }))
        }
        (at = Zi = Zi || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        at.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var ci = Zi
          , di = he
          , fi = function() {
            return (fi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , pi = function(i, a, e) {
            var l = pn()
              , t = (0,
            K.useRef)(null)
              , n = (0,
            K.useCallback)(function() {
                var e = {};
                return e[k.AbsPositions] = i.filters.map(function(e, t) {
                    return t
                }),
                e[k.FilterIds] = i.filters.map(function(e) {
                    return e.filterId
                }),
                e[k.SelectedOptionIds] = i.filters.map(function(e) {
                    return e.selectedOptionId
                }),
                e[k.GameSetTypeId] = i.topicId,
                e[k.GameSetTargetId] = i.gameSetTargetId,
                e[k.SortPos] = a,
                e[U.DiscoverPageSessionInfo] = l,
                e[k.Page] = Z.GamesPage,
                e
            }, [i.filters, i.topicId, i.gameSetTargetId, a, l]);
            (0,
            K.useEffect)(function() {
                return null != e && e.current && (t.current = S.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: Ke.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = X.filterImpressions(e)) && S.eventStreamService.sendEvent.apply(S.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var o = (0,
            K.useCallback)(function(e, t, n, r) {
                var o;
                return fi(((o = {})[k.ButtonName] = t,
                o[k.GameSetTypeId] = i.topicId,
                o[k.GameSetTargetId] = i.gameSetTargetId,
                o[k.SortPos] = a,
                o[U.DiscoverPageSessionInfo] = l,
                o[k.Page] = Z.GamesPage,
                o[k.FilterId] = e,
                o[k.SelectedOptionId] = n,
                o), r && ((o = {})[k.PreviousOptionId] = r,
                o))
            }, [i.topicId, i.gameSetTargetId, a, l]);
            return (0,
            K.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = X.gamesFilterClick(r);
                r && S.eventStreamService.sendEvent.apply(S.eventStreamService, r)
            }, [o])
        };
        (Ca = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            K.useRef)(null)
              , a = pi(o, t, e);
            return Y().createElement("div", {
                ref: e,
                className: "filters-container"
            }, Y().createElement("div", {
                className: "filters-header-container"
            }, Y().createElement("span", {
                className: "filters-header"
            }, o.topic)), Y().createElement("div", {
                className: "filter-items-container"
            }, o.filters.map(function(r) {
                return Y().createElement(ui, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = kn([o]),
                        void (i && e && (e.set(t, n),
                        i(e)));
                        var t, n
                    },
                    sendFilterClickEvent: a,
                    translate: n
                })
            })))
        }
        ).defaultProps = {
            fetchGamesPageData: void 0
        };
        var mi, vi = Ca, hi = "webDiscoverySduiError";
        function gi(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }
        function yi(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                e = parseInt(e, 10);
                if (!Number.isNaN(e))
                    return e
            }
            return t
        }
        function bi(e, t) {
            if ("boolean" == typeof e)
                return e;
            if ("string" != typeof e)
                return "number" == typeof e ? 1 === e || 0 !== e && (Pi(mi.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e),
                t) : (Pi(mi.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined")),
                t);
            var n = e.toLowerCase();
            return "true" === n || "t" === n || "false" !== n && "f" !== n && (Pi(mi.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e),
            t)
        }
        function Ii(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }
        function wi(n) {
            var r = {};
            return Object.keys(n).forEach(function(e) {
                var t = n[e];
                Ii(t) ? r[e] = t : Pi(mi.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + e + ", value: " + JSON.stringify(t) + ", type: " + typeof t)
            }),
            r
        }
        function Si(e, t, n) {
            return null != t && t.analyticsData && void 0 !== (null == t ? void 0 : t.analyticsData[e]) && null !== (null == t ? void 0 : t.analyticsData[e]) ? t.analyticsData[e] : null != t && t.ancestorAnalyticsData && void 0 !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) && null !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) ? t.ancestorAnalyticsData[e] : n
        }
        function Ei(e, t, n) {
            return e = Ci(Ci(Ci({}, t), e), n),
            n = Ci(Ci({}, e), {
                id: gi(e.id, _i.id),
                itemPosition: yi(e.itemPosition, _i.itemPosition)
            }),
            void 0 === (e = n).id || void 0 === e.itemPosition || e.itemPosition < 0 ? (Pi(mi.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(n)),
            Ci(Ci({}, _i), n)) : n
        }
        (cr = mi = mi || {}).AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
        cr.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
        cr.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
        cr.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
        cr.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
        cr.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
        cr.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
        cr.ComponentNotFound = "ComponentNotFound",
        cr.ExecuteActionInvalidActionType = "ExecuteActionInvalidActionType",
        cr.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
        cr.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
        cr.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
        cr.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
        cr.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
        cr.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
        cr.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
        cr.PropParseFailure = "PropParseFailure",
        cr.PropParserNotFound = "PropParserNotFound",
        cr.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
        cr.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
        cr.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
        cr.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
        cr.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
        cr.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
        cr.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
        cr.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
        cr.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
        cr.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
        cr.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
        cr.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
        cr.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
        cr.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
        cr.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
        cr.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
        cr.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
        cr.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
        cr.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
        cr.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey",
        cr.VerticalFeedMissingFeedItems = "VerticalFeedMissingFeedItems";
        var Pi = function(e, t) {
            (0,
            E.fireEvent)(e);
            t = {
                errorName: e,
                errorMessage: t
            };
            S.eventStreamService.sendEvent({
                name: hi,
                type: hi,
                context: io.Home
            }, po(t))
        }
          , Ci = function() {
            return (Ci = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , _i = {
            id: "Unknown",
            itemPosition: -1
        }
          , Ti = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1
        }
          , xi = function() {
            return (xi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ai = [lo.CollectionId, lo.CollectionPosition, lo.ContentType, "id", "itemPosition", "itemsPerRow", "rowNumber", so.TotalNumberOfItems]
          , Oi = function(e, t, n) {
            var r, o, i, a, l, s, u, c, d, f, p;
            n && t ? 0 !== e.length ? (p = e,
            r = t,
            o = n.contentType,
            i = n.itemsPerRow,
            a = n.collectionPosition,
            l = n.collectionId,
            s = n.totalNumberOfItems,
            u = [],
            c = [],
            d = [],
            f = [],
            p.forEach(function(e) {
                var t = r[e];
                null != t ? (u.push(t.id),
                c.push(t.itemPosition + 1),
                f.push(t.itemPosition + 1),
                void 0 !== i && 0 < i ? (t = Math.floor(e / i),
                d.push(t + 1)) : d.push(1)) : Pi(mi.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + l)
            }),
            (p = {})[lo.CollectionId] = l,
            p[lo.CollectionPosition] = a,
            p[lo.ContentType] = o,
            p[so.TotalNumberOfItems] = s,
            p[so.ItemIds] = u.join(","),
            p[so.ItemPositions] = c.join(","),
            p[so.RowNumbers] = d.join(","),
            p[so.PositionsInTopic] = f.join(","),
            p = p,
            e = function(r, o, i) {
                var a = {};
                r.forEach(function(e, n) {
                    var t = o[e];
                    null != t ? Object.entries(t).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        Ai.includes(t) || null == e || (a[t] || (a[t] = r.map(function() {
                            return ""
                        })),
                        a[t][n] = e.toString())
                    }) : Pi(mi.BuildItemImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i)
                });
                var n = {};
                return Object.entries(a).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n[t + "_arr"] = e.join(",")
                }),
                n
            }(e, t, n.collectionId),
            p = xi(xi(xi({}, e), n), p),
            S.eventStreamService.sendEvent({
                name: oo.ItemImpressions,
                type: oo.ItemImpressions,
                context: io.Home
            }, po(xi({}, p)))) : Pi(mi.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId) : Pi(mi.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (n = null == n ? void 0 : n.collectionId) && void 0 !== n ? n : "undefined"))
        }
          , Ni = function() {
            return (Ni = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ri = function(e, t, n) {
            var r = Ei(null !== (l = t.analyticsData) && void 0 !== l ? l : {}, null !== (s = t.ancestorAnalyticsData) && void 0 !== s ? s : {}, void 0)
              , o = null !== (u = null != n ? n : t.getCollectionData && t.getCollectionData()) && void 0 !== u ? u : null;
            o || Pi(mi.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e));
            var i, a, l, s, u, c = null != o ? o : Ti, n = (a = (i = r).itemPosition,
            l = c.contentType,
            s = c.collectionPosition,
            n = c.collectionId,
            t = c.totalNumberOfItems,
            u = e.actionType,
            i ? ((o = {})[lo.CollectionId] = n,
            o[lo.CollectionPosition] = s,
            o[lo.ContentType] = l,
            o[uo.TotalNumberOfItems] = t,
            o[uo.ItemId] = i.id,
            o[uo.ItemPosition] = a + 1,
            o[uo.PositionInTopic] = a + 1,
            o.actionType = u,
            o) : (Pi(mi.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + n),
            {})), n = Ni(Ni(Ni(Ni({}, r), c), wi(e.actionParams)), n);
            S.eventStreamService.sendEvent({
                name: oo.ItemAction,
                type: oo.ItemAction,
                context: io.Home
            }, po(Ni({}, n)))
        }
          , ki = function() {
            return (ki = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , re = function(e) {
            var r = e.componentConfig
              , t = e.analyticsContext
              , o = e.item
              , n = e.children
              , i = (0,
            K.useRef)(null)
              , a = (0,
            K.useRef)(null)
              , l = (0,
            K.useCallback)(function(e, t) {
                Ri(e, t, i.current)
            }, [i])
              , s = (0,
            K.useCallback)(function() {
                return i.current
            }, [i])
              , u = (0,
            K.useMemo)(function() {
                return ki(ki({}, t), {
                    logAction: l,
                    getCollectionAnalyticsData: s
                })
            }, [t, l, s]);
            i.current = (0,
            K.useMemo)(function() {
                var e;
                return function(e, t, n, r, o) {
                    t = Ci(Ci({}, e), t),
                    r = Ci(Ci({}, t), {
                        collectionId: yi(t.collectionId, Ti.collectionId),
                        collectionPosition: yi(t.collectionPosition, -1),
                        contentType: gi(t.contentType, Ti.contentType),
                        itemsPerRow: r,
                        totalNumberOfItems: o
                    });
                    return void 0 === (o = r).collectionId || o.collectionId < 0 || void 0 === o.contentType || void 0 === o.itemsPerRow || o.itemsPerRow < 0 || void 0 === o.collectionPosition || o.collectionPosition < 0 || void 0 === o.totalNumberOfItems || o.totalNumberOfItems < 0 ? (Pi(mi.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + n + " is invalid: " + JSON.stringify(r)),
                    Ci(Ci({}, Ti), r)) : r
                }(null !== (e = u.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = u.analyticsData) && void 0 !== e ? e : {}, r.componentType, 1, 1)
            }, [u.ancestorAnalyticsData, u.analyticsData, r.componentType]);
            var c = (0,
            K.useCallback)(function(e) {
                var t, n;
                o ? (i.current && ("Game" !== (n = i.current.contentType) && "HeroUnit" !== n || null !== (t = a.current) && void 0 !== t && t.universeId && ((n = {})[k.RootPlaceIds] = [yi(null === (t = a.current) || void 0 === t ? void 0 : t.placeId, -1)],
                n[k.UniverseIds] = [yi(null === (t = a.current) || void 0 === t ? void 0 : t.universeId, -1)],
                n[k.AdsPositions] = [!0 === bi(null === (t = a.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[k.AdFlags] = [!0 === bi(null === (t = a.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[k.AbsPositions] = [0],
                n[k.SortPos] = null !== (t = null === (t = i.current) || void 0 === t ? void 0 : t.collectionPosition) && void 0 !== t ? t : -1,
                n[k.GameSetTypeId] = null === (t = i.current) || void 0 === t ? void 0 : t.collectionId,
                n[k.Page] = Z.HomePage,
                n[k.ComponentType] = "HeroUnit",
                n[U.HomePageSessionInfo] = gi(null === (t = i.current) || void 0 === t ? void 0 : t[ao.HomePageSessionInfo], ""),
                n = n,
                n = X.gameImpressions(n),
                S.eventStreamService.sendEvent.apply(S.eventStreamService, n))),
                Oi(e, [a.current], i.current)) : Pi(mi.SingleItemCollectionItemImpressedButMissing, "SingleItemCollection onItemImpressed missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r))
            }, [o, r, i, a])
              , d = (0,
            K.useRef)(null);
            ro(d, 1, c);
            e = (0,
            K.useMemo)(function() {
                var e;
                if (!o)
                    return Pi(mi.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r)),
                    Y().createElement(Y().Fragment, null);
                var t = {
                    itemPosition: 0
                };
                return a.current = Ei(null !== (e = o.analyticsData) && void 0 !== e ? e : {}, null !== (e = i.current) && void 0 !== e ? e : {}, t),
                Y().createElement(Pa, {
                    componentConfig: o,
                    parentAnalyticsContext: u,
                    localAnalyticsData: t
                })
            }, [o, r, u, i]),
            c = (0,
            K.useMemo)(function() {
                return Y().Children.map(n, function(e, t) {
                    if (!Y().isValidElement(e))
                        return Pi("SingleItemCollectionChildNotReactElement", "SingleItemCollectionChildNotReactElement " + JSON.stringify(r) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = r.componentType + "-child-" + t;
                    return Y().cloneElement(e, ki(ki({}, e.props), {
                        key: t,
                        parentAnalyticsContext: u
                    }))
                })
            }, [n, u, r]);
            return Y().createElement("div", {
                ref: d
            }, e, c)
        }
          , ee = function(e) {
            var t = e.componentConfig
              , n = e.analyticsContext
              , e = e.feedItems;
            return e ? Y().createElement("div", null, e.map(function(e, t) {
                return Y().createElement(Pa, {
                    key: e.componentType + "--" + t,
                    componentConfig: e,
                    parentAnalyticsContext: n
                })
            })) : (Pi(mi.VerticalFeedMissingFeedItems, "SCI missing feedItems " + JSON.stringify(e) + " with config " + JSON.stringify(t)),
            Y().createElement(Y().Fragment, null))
        }
          , Di = WebBlox
          , Li = Cl(4777)
          , Mi = Cl(8550);
        function Ui(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Fi(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ui(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ui(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function Bi(e, t) {
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
                    return ji(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return ji(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function ji(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Gi(e) {
            var t = e.gradient
              , n = e.gradientHeightPercent
              , r = e.gradientWidthPercent
              , o = t.startColor
              , i = t.endColor
              , a = t.startOpacity
              , l = t.endOpacity
              , s = t.degree
              , t = (e = Bi(K.useState(""), 2))[0]
              , u = e[1]
              , c = "".concat(100 * n, "%")
              , d = "".concat(100 * r, "%");
            return (0,
            K.useEffect)(function() {
                var e = "linear-gradient(".concat(s, "deg, ").concat(o).concat(Math.round(255 * a).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * l).toString(16).padStart(2, "0"), ")");
                u(e)
            }, [o, i, a, l, s]),
            r = (0,
            Di.makeStyles)()(function() {
                return {
                    heroUnitGradient: {
                        width: d,
                        height: c,
                        bottom: "0px",
                        left: "0px",
                        position: "absolute"
                    }
                }
            })().classes.heroUnitGradient,
            K.createElement("div", {
                style: {
                    background: t
                },
                className: r
            })
        }
        function Hi(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.heroUnitRef
              , o = e.gradient
              , i = e.gradientHeightPercent
              , a = e.gradientWidthPercent
              , l = e.bottomRowComponent
              , s = e.overlayPillComponent
              , u = void 0 !== (p = e.forceViewportWidth) && p <= 414
              , c = void 0 !== p && p <= 600 && 415 <= p
              , d = u || c
              , f = (m = (0,
            Di.makeStyles)()(function() {
                return {
                    heroUnitContentContainer: Fi(Fi({
                        height: "".concat(336, "px"),
                        width: "100%",
                        position: "relative",
                        display: "flex",
                        overflow: "hidden",
                        borderRadius: "8px",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "20px"
                    }, d ? {
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
                    heroUnitTitle: Fi(Fi(Fi(Fi({
                        color: "white",
                        position: "relative",
                        textShadow: "".concat(Ki),
                        fontFamily: "Builder Sans",
                        fontSize: "40px",
                        fontWeight: 700,
                        lineHeight: "48px"
                    }, d ? {
                        lineHeight: "28.8px"
                    } : {}), u ? {
                        fontSize: "24px"
                    } : {}), c ? {
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
                    heroUnitSubtitle: Fi({
                        color: "white",
                        textShadow: "".concat(Ki),
                        marginTop: "2px",
                        position: "relative",
                        fontFamily: "Builder Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px"
                    }, d ? {
                        display: "none"
                    } : {
                        "@media (max-width: 600px)": {
                            display: "none"
                        }
                    })
                }
            })().classes).heroUnitContentContainer
              , e = m.heroUnitTitleContainer
              , p = m.heroUnitTitle
              , m = m.heroUnitSubtitle;
            return K.createElement("div", {
                className: f,
                ref: r
            }, K.createElement(Gi, {
                gradient: o,
                gradientHeightPercent: i,
                gradientWidthPercent: a
            }), s, K.createElement("div", {
                className: e
            }, K.createElement("span", {
                className: p
            }, t), K.createElement("span", {
                className: m
            }, n)), l)
        }
        function zi(e) {
            var t = e.backgroundImageComponent
              , n = void 0 !== (r = e.forceViewportWidth) && r <= 600
              , r = (e = (0,
            Di.makeStyles)()(function() {
                return {
                    heroUnitBackgroundWindow: Fi(Fi({
                        height: "".concat(336, "px"),
                        width: "100%",
                        position: "absolute",
                        top: "24px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }, n ? {
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
                    heroUnitBackgroundContainer: Fi(Fi({
                        "--parallax-scale": "100",
                        minWidth: "max(100%, 1320px)",
                        height: "436px",
                        display: "flex",
                        flexDirection: "column",
                        transform: "translateY(calc(var(--parallax-scale) * ((var(--scroll) * 1px) - 0.5px)))",
                        "@media (prefers-reduced-motion)": {
                            transform: "translateY(0.5px)"
                        },
                        "@media (min-width: 1320px)": {
                            height: "auto"
                        }
                    }, n ? {
                        minHeight: "calc(100% + 66px)",
                        width: "auto",
                        "--parallax-scale": "66"
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            minHeight: "calc(100% + 66px)",
                            width: "auto",
                            "--parallax-scale": "66"
                        }
                    })
                }
            })().classes).heroUnitBackgroundWindow
              , e = e.heroUnitBackgroundContainer;
            return K.createElement("div", {
                className: r
            }, K.createElement("div", {
                className: e
            }, t))
        }
        function Vi(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.foregroundImageComponent
              , o = e.backgroundImageComponent
              , i = e.gradient
              , a = void 0 === (f = e.gradientHeightPercent) ? .5 : f
              , l = void 0 === (d = e.gradientWidthPercent) ? 1 : d
              , s = e.backgroundClickAction
              , u = e.bottomRowComponent
              , c = e.overlayPillComponent
              , d = void 0 === (f = e.minForegroundHeightPercent) ? .8 : f
              , f = void 0 === (f = e.maxForegroundHeightPercent) ? 1 : f
              , p = e.forceViewportWidth
              , m = K.useRef(!1)
              , v = (e = Bi(K.useState(1), 2))[0]
              , h = e[1]
              , g = void 0 !== p && p <= 600
              , y = K.useRef(null)
              , b = K.useRef(null)
              , I = "".concat(Math.round(100 * d), "%")
              , w = "".concat(Math.round(100 * f), "%")
              , S = 360 * (f - d)
              , f = (e = (0,
            Di.makeStyles)()(function() {
                return {
                    heroUnitContainer: Fi({
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
                    }, p ? {
                        maxWidth: "".concat(p, "px")
                    } : {}),
                    heroUnitForegroundContainer: Fi(Fi({
                        height: w,
                        aspectRatio: "1",
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        top: "0px",
                        "--parallax-scale": "".concat(48),
                        transform: "translateY(calc(var(--parallax-scale) * ((var(--scroll) * -1px) + 1px)))",
                        "@media (prefers-reduced-motion)": {
                            transform: "translateY(0px)"
                        }
                    }, g ? {
                        height: I,
                        "--parallax-scale": "".concat(32)
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            height: I,
                            "--parallax-scale": "".concat(32)
                        },
                        "@media (min-width: 601px) and (max-width: 1140px)": {
                            height: "calc(".concat(I, " + ((").concat(S, " * (100vw - 600px)) / 540))")
                        }
                    }),
                    heroUnitTopSpacer: Fi(Fi({
                        height: "".concat(24, "px")
                    }, g ? {
                        height: "".concat(16, "px")
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            height: "".concat(16, "px")
                        }
                    })
                }
            })().classes).heroUnitContainer
              , d = e.heroUnitForegroundContainer
              , e = e.heroUnitTopSpacer
              , E = (0,
            K.useCallback)(function() {
                var e = Li(.2, 0, .8, 1);
                if (y.current && window.innerHeight) {
                    var t = v;
                    if (!m.current) {
                        var n = y.current.getBoundingClientRect().top + 168;
                        if (n <= 0)
                            return;
                        t = Math.min(n, window.innerHeight) / window.innerHeight,
                        h(t)
                    }
                    t = (t - y.current.getBoundingClientRect().top / window.innerHeight) / t,
                    t = e(Math.max(Math.min(t, 1), 0));
                    b.current && b.current.style.setProperty("--scroll", t.toString())
                }
            }, [y, m, v]);
            return (0,
            K.useEffect)(function() {
                var e = Mi(E, 100)
                  , t = new MutationObserver(e);
                document.body && !m.current && t.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }),
                E();
                function n() {
                    E(),
                    m.current = !0,
                    t.disconnect()
                }
                return window.addEventListener("scroll", n),
                window.addEventListener("resize", n),
                function() {
                    window.removeEventListener("scroll", n),
                    window.removeEventListener("resize", n),
                    t.disconnect()
                }
            }, [m, E]),
            K.createElement("div", {
                ref: b,
                className: f,
                onClick: s,
                "data-testid": "hero-unit"
            }, K.createElement("div", {
                className: e
            }), K.createElement(zi, {
                backgroundImageComponent: o,
                forceViewportWidth: p
            }), K.createElement("div", {
                className: d
            }, r), K.createElement(Hi, {
                title: t,
                subtitle: n,
                heroUnitRef: y,
                gradient: i,
                gradientHeightPercent: a,
                gradientWidthPercent: l,
                bottomRowComponent: u,
                overlayPillComponent: c,
                forceViewportWidth: p
            }))
        }
        function Wi(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.leftAssetComponent
              , o = e.rightButtonComponent
              , i = (u = (0,
            Di.makeStyles)()(function() {
                return {
                    attributionRowContainer: {
                        display: "flex",
                        position: "relative",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        height: "40px"
                    },
                    attributionRowThumbnailContainer: {
                        height: "100%",
                        aspectRatio: "1",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "8px",
                        overflow: "hidden"
                    },
                    attributionRowTextContainer: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        height: "100%",
                        marginLeft: "12px"
                    },
                    attributionRowButtonContainer: {
                        marginLeft: "auto"
                    },
                    assetTitle: {
                        color: "white",
                        fontFamily: "Builder Sans",
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: "19.6px",
                        textShadow: "".concat(Ki)
                    },
                    assetSubtitle: {
                        marginTop: "auto",
                        color: "white",
                        fontFamily: "Builder Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "19.6px",
                        textShadow: "".concat(Ki)
                    }
                }
            })().classes).attributionRowContainer
              , a = u.attributionRowThumbnailContainer
              , l = u.attributionRowTextContainer
              , s = u.attributionRowButtonContainer
              , e = u.assetTitle
              , u = u.assetSubtitle;
            return K.createElement("div", {
                className: i
            }, K.createElement("div", {
                className: a
            }, r), K.createElement("div", {
                className: l
            }, K.createElement("span", {
                className: e
            }, t), K.createElement("span", {
                className: u
            }, n)), K.createElement("div", {
                className: s
            }, o))
        }
        function qi(e) {
            var t = e.pillText
              , e = (n = (0,
            Di.makeStyles)()(function() {
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
                        marginBottom: "auto"
                    },
                    heroUnitPillText: {
                        fontFamily: "Builder Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "12px"
                    }
                }
            })().classes).heroUnitPill
              , n = n.heroUnitPillText;
            return K.createElement("div", {
                className: e
            }, K.createElement("span", {
                className: n
            }, t))
        }
        function Ji(e) {
            var t = bi(Si("adFlag", e, !1), !1)
              , n = yi(Si("itemPosition", e, -1), -1)
              , r = null != e && e.getCollectionData ? e.getCollectionData() : void 0
              , o = null !== (i = null == r ? void 0 : r.collectionPosition) && void 0 !== i ? i : yi(Si("collectionPosition", e, -1), -1)
              , i = null !== (a = null == r ? void 0 : r.totalNumberOfItems) && void 0 !== a ? a : yi(Si("totalNumberOfItems", e, -1), -1)
              , r = null !== (a = null == r ? void 0 : r.collectionId) && void 0 !== a ? a : yi(Si("collectionId", e, -1), -1)
              , a = gi(Si(ao.HomePageSessionInfo, e, ""), "");
            return (e = {})[k.IsAd] = t,
            e[k.Position] = n,
            e[k.SortPos] = o,
            e[k.NumberOfLoadedTiles] = i,
            e[k.GameSetTypeId] = r,
            e[k.Page] = Z.HomePage,
            e[U.HomePageSessionInfo] = a,
            e
        }
        var $i, Ki = "2px 2px 4px rgba(0, 0, 0, 0.15)", at = function(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.bottomRowComponent
              , o = e.gradient
              , i = e.gradientHeightPercent
              , a = e.gradientWidthPercent
              , l = e.foregroundImage
              , s = e.backgroundImage
              , u = e.onActivated
              , c = e.badgeText
              , d = e.asset
              , f = e.ctaButtonComponent
              , p = e.minForegroundHeightPercent
              , m = e.maxForegroundHeightPercent
              , v = e.children
              , h = (0,
            K.useMemo)(function() {
                return d ? Y().createElement(Wi, {
                    title: d.title,
                    subtitle: d.subtitle,
                    leftAssetComponent: d.image,
                    rightButtonComponent: f
                }) : Y().createElement(Y().Fragment, null)
            }, [d, f])
              , g = (0,
            K.useMemo)(function() {
                return c ? Y().createElement(qi, {
                    pillText: c
                }) : Y().createElement(Y().Fragment, null)
            }, [c]);
            return (0,
            K.useMemo)(function() {
                return Y().createElement(Vi, {
                    title: t,
                    subtitle: n,
                    foregroundImageComponent: l,
                    backgroundImageComponent: s,
                    gradient: o,
                    gradientHeightPercent: i,
                    gradientWidthPercent: a,
                    overlayPillComponent: g,
                    backgroundClickAction: u,
                    bottomRowComponent: null != r ? r : h,
                    minForegroundHeightPercent: p,
                    maxForegroundHeightPercent: m
                }, v)
            }, [s, u, r, h, l, o, i, a, n, t, v, g, p, m])
        }, Yi = function() {
            return (Yi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Zi = function(e, t) {
            var n, r = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.placeId, o = "number" == typeof (n = r) ? n : "string" == typeof n ? parseInt(n, 10) : void 0;
            void 0 !== o ? (n = t,
            t = wi(null !== (e = null == (t = e) ? void 0 : t.actionParams) && void 0 !== e ? e : {}),
            e = yi(null !== (e = t.placeId) && void 0 !== e ? e : Si("placeId", n, -1), -1),
            t = yi(null !== (t = t.universeId) && void 0 !== t ? t : Si("universeId", n, -1), -1),
            n = Ji(n),
            n = Yi(Yi({}, n), ((n = {})[k.PlaceId] = e,
            n[k.UniverseId] = t,
            n)),
            n = v(o, "", n),
            window.location.href = n) : Pi(mi.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(r) + " to open game details")
        };
        (he = $i = $i || {}).OpenGameDetails = "OpenGameDetails",
        he.PlayButtonClick = "PlayButtonClick";
        var Qi = ((Ca = {})[$i.OpenGameDetails] = Zi,
        Ca[$i.PlayButtonClick] = function() {}
        ,
        Ca)
          , Xi = function(e, t) {
            var n = Qi[e.actionType]
              , r = t.logAction;
            r ? r(e, t) : Ri(e, t, null),
            n ? n(e, t) : Pi(mi.ExecuteActionInvalidActionType, "Invalid action type " + e.actionType + " to execute action. No handler found.")
        }
          , ea = function() {
            return (ea = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function ta(n, r, o) {
            var i, e = ha[n], a = oa({}, r);
            return !e || (i = e.propParsers) && Object.keys(r).forEach(function(e) {
                var t;
                void 0 !== r[e] && i[e] && ((t = i[e]) && "function" == typeof t ? void 0 !== (t = t(r[e], o)) ? a[e] = t : Pi(mi.PropParseFailure, "Failed to parse prop " + e + " with value " + JSON.stringify(r[e]) + " using for component " + n) : Pi(mi.PropParserNotFound, "Prop parser not found for prop " + e + " and component " + n))
            }),
            a
        }
        function na(e) {
            var t = e.assetId
              , n = (o = (0,
            K.useState)(""))[0]
              , r = o[1]
              , o = (e = (0,
            K.useState)(!0))[0]
              , i = e[1];
            return (0,
            K.useEffect)(function() {
                i(!0),
                je(t).then(function(e) {
                    r(null !== (e = null === (e = null == e ? void 0 : e.locations[0]) || void 0 === e ? void 0 : e.location) && void 0 !== e ? e : "")
                }).catch(function() {
                    r("")
                }).finally(function() {
                    i(!1)
                })
            }, [t]),
            o ? Y().createElement(ye.Loading, null) : n ? Y().createElement("img", {
                src: n,
                alt: "asset"
            }) : (Pi(mi.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t),
            Y().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }
        (cr = function(e) {
            var n = e.analyticsContext
              , r = e.universeId
              , o = e.placeId
              , t = e.width
              , i = e.playableText
              , a = e.hidePlayableIcon
              , l = P.PlayButton.usePlayabilityStatus
              , s = P.PlayButton.PlayabilityStatuses
              , u = P.PlayButton.PlayButton
              , c = l(r.toString())[0]
              , e = (0,
            K.useCallback)(function() {
                var e = {
                    actionType: $i.PlayButtonClick,
                    actionParams: {}
                };
                Xi(e, n)
            }, [n])
              , l = (0,
            K.useMemo)(function() {
                var e, t = Ji(n);
                return ea(ea({}, t), ((e = {})[k.IsAd] = (null !== (t = t[k.IsAd]) && void 0 !== t && t).toString(),
                e[k.PlaceId] = yi(o, -1),
                e[k.UniverseId] = yi(r, -1),
                e[k.PlayContext] = Z.HomePage,
                e))
            }, [n, o, r]);
            return void 0 === c || c !== s.Playable ? Y().createElement(Y().Fragment, null) : Y().createElement("div", {
                className: "sdui-play-button-container",
                "data-testid": "sdui-play-button-container",
                style: t ? {
                    width: t + "px"
                } : {}
            }, Y().createElement(u, {
                universeId: r.toString(),
                placeId: o.toString(),
                eventProperties: l,
                status: c,
                disableLoadingState: !0,
                buttonText: i,
                hideIcon: a,
                analyticsCallback: e
            }))
        }
        ).defaultProps = {
            width: void 0,
            playableText: void 0,
            hidePlayableIcon: void 0
        };
        var ra, he = cr, oa = function() {
            return (oa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function ia(e, t) {
            if (void 0 !== e && (r = null === (n = null === (r = null == e ? void 0 : e.feed) || void 0 === r ? void 0 : r.props) || void 0 === n ? void 0 : n.feedItems,
            Array.isArray(r) && r.every(function(e) {
                return "object" == typeof e && null !== e
            }))) {
                var n = e.feed.props.feedItems
                  , r = n.find(function(e) {
                    return e.feedItemKey === t
                });
                if (r)
                    return r;
                Pi(mi.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(n) + " missing matching feed item with key " + t)
            } else
                Pi(mi.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e))
        }
        function aa(e) {
            return !!(e && "object" == typeof e && e.componentType && ga(e.componentType))
        }
        function la(e) {
            if ("string" != typeof e)
                return Pi(mi.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string."),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var t = e.split("//");
            if (2 === t.length && (e.includes(ra.RbxAsset) || e.includes(ra.RbxThumb))) {
                if (t[0].includes(ra.RbxAsset))
                    return {
                        assetType: ra.RbxAsset,
                        assetTarget: t[1]
                    };
                if (t[0].includes(ra.RbxThumb))
                    return {
                        assetType: ra.RbxThumb,
                        assetTarget: t[1]
                    }
            }
            return Pi(mi.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }
        function sa(e) {
            if ("string" != typeof e)
                return Y().createElement(Y().Fragment, null);
            var t, n, r = la(e), o = r.assetType, i = r.assetTarget;
            if (o === ra.RbxAsset) {
                var a = i;
                return Y().createElement(na, {
                    assetId: a
                })
            }
            if (o !== ra.RbxThumb)
                return Pi(mi.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported."),
                Y().createElement(Y().Fragment, null);
            var o = (r = (l = (l = i).split("&"),
            n = {},
            l.forEach(function(e) {
                var t = e.split("=")
                  , e = t[0]
                  , t = t[1];
                n[e] = t
            }),
            {
                thumbnailType: n.type,
                id: n.id,
                w: n.w,
                h: n.h
            })).thumbnailType
              , i = r.w
              , l = r.h;
            return void 0 === (a = r.id) || void 0 === o || void 0 === i || void 0 === l ? (Pi(mi.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != o ? o : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != i ? i : "undefined") + ", or h " + (null != l ? l : "undefined") + " is invalid"),
            Y().createElement(Y().Fragment, null)) : (t = i + "x" + l,
            void 0 !== (e = null === (e = pa[e = o]) || void 0 === e ? void 0 : e.find(function(e) {
                return e === t
            })) ? Y().createElement(qe.Thumbnail2d, {
                containerClass: "sdui-thumbnail-container",
                type: o,
                targetId: a,
                format: qe.ThumbnailFormat.webp,
                size: e
            }) : (Pi(mi.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + i + "x" + l + " for type " + o),
            Y().createElement(Y().Fragment, null)))
        }
        function ua(e, t, n, r) {
            if (!aa(e))
                return Pi(mi.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children"),
                {
                    props: {},
                    children: null
                };
            var o, i, a = e.componentType, l = (o = t,
            l = n,
            n = (t = e).analyticsData,
            t = ma(ma({}, n), null != l ? l : {}),
            n = o.logAction,
            l = o.getCollectionData,
            {
                analyticsData: t,
                ancestorAnalyticsData: ma(ma({}, o.ancestorAnalyticsData), o.analyticsData),
                logAction: n,
                getCollectionData: l
            }), r = ma(ma(ma({}, e.props), {
                componentConfig: e,
                analyticsContext: l
            }), r);
            return {
                props: ta(a, r, l),
                children: (i = l,
                (e = e).children ? e.children.map(function(e, t) {
                    t = e.componentType + "-" + t;
                    return Y().createElement(Pa, {
                        key: t,
                        componentConfig: e,
                        parentAnalyticsContext: i
                    })
                }) : null)
            }
        }
        (Zi = ra = ra || {}).RbxAsset = "rbxassetid",
        Zi.RbxThumb = "rbxthumb";
        var ca, da = function() {
            return (da = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, fa = {
            startColor: "#000000",
            endColor: "#000000",
            startOpacity: 0,
            endOpacity: 1,
            degree: 180
        }, pa = ((Ca = {})[qe.ThumbnailTypes.gameIcon] = Object.values(qe.ThumbnailGameIconSize),
        Ca[qe.ThumbnailTypes.assetThumbnail] = Object.values(qe.ThumbnailAssetsSize),
        Ca), cr = {
            parseUiComponent: function(e, t) {
                return aa(e) ? Y().createElement(Pa, {
                    componentConfig: e,
                    parentAnalyticsContext: t
                }) : (Pi(mi.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component"),
                Y().createElement(Y().Fragment, null))
            },
            parseCallback: function(e, t) {
                return function(e) {
                    if (e && "object" == typeof e && (e.actionType && e.actionParams && Qi[e.actionType]))
                        return !0;
                    return !1
                }(e) ? function() {
                    return Xi(e, t)
                }
                : (Pi(mi.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(e) + " to parse callback"),
                function() {}
                )
            },
            parseHeroUnitAsset: function(e) {
                if (!function(e) {
                    if ("object" == typeof e && (e.image && e.title && e.subtitle))
                        return !0;
                    return !1
                }(e))
                    return {
                        image: Y().createElement(Y().Fragment, null),
                        title: "Hero Unit Asset Title",
                        subtitle: "Hero Unit Asset Subtitle"
                    };
                var t = sa(e.image);
                return da(da({}, e), {
                    image: t
                })
            },
            parseAssetUrl: la,
            parseAssetUrlIntoComponent: sa,
            parseGradient: function(e) {
                if (!(t = e) || "object" != typeof t || (!t.startColor || "string" != typeof t.startColor || !t.endColor || "string" != typeof t.endColor || void 0 === t.startOpacity || "number" != typeof t.startOpacity || void 0 === t.endOpacity || "number" != typeof t.endOpacity || void 0 === t.degree || "number" != typeof t.degree))
                    return Pi(mi.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e)),
                    fa;
                var t = da(da({}, e), {
                    degree: (e.degree - 90 + 360) % 360
                });
                return e.startColor.startsWith("#") || (t.startColor = "#" + e.startColor),
                e.endColor.startsWith("#") || (t.endColor = "#" + e.endColor),
                t
            }
        }, ma = function() {
            return (ma = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Zi = function(r) {
            var e = Y().memo(function(n) {
                return (0,
                K.useMemo)(function() {
                    var e = ua(n.componentConfig, n.parentAnalyticsContext, n.localAnalyticsData, n.responsivePropOverrides)
                      , t = e.props
                      , e = e.children;
                    return Y().createElement(r, t, e)
                }, [n.componentConfig, r, n.parentAnalyticsContext, n.localAnalyticsData, n.responsivePropOverrides])
            });
            return e.displayName = "SduiWrapped" + (r.displayName || r.name),
            e
        };
        (Ca = ca = ca || {}).SingleItemCollection = "SingleItemCollection",
        Ca.VerticalFeed = "VerticalFeed",
        Ca.HeroUnit = "HeroUnit",
        Ca.PlayButton = "PlayButton";
        var va, ha = ((Ca = {})[ca.SingleItemCollection] = {
            component: Zi(re),
            propParsers: {}
        },
        Ca[ca.VerticalFeed] = {
            component: Zi(ee),
            propParsers: {}
        },
        Ca[ca.PlayButton] = {
            component: Zi(he),
            propParsers: {}
        },
        Ca[ca.HeroUnit] = {
            component: Zi(at),
            propParsers: {
                backgroundComponent: cr.parseUiComponent,
                bottomRowComponent: cr.parseUiComponent,
                ctaButtonComponent: cr.parseUiComponent,
                headerComponent: cr.parseUiComponent,
                onActivated: cr.parseCallback,
                overlayComponent: cr.parseUiComponent,
                asset: cr.parseHeroUnitAsset,
                gradient: cr.parseGradient,
                foregroundImage: cr.parseAssetUrlIntoComponent,
                backgroundImage: cr.parseAssetUrlIntoComponent
            }
        },
        Ca), ga = function(e) {
            return ha[e] ? ha[e].component : null
        };
        function ya(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.localAnalyticsData
              , i = (e = (0,
            K.useState)(window.innerWidth))[0]
              , a = e[1];
            return (0,
            K.useEffect)(function() {
                function e() {
                    a(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            e = (0,
            K.useMemo)(function() {
                return Ea(n.responsiveProps, i)
            }, [n, i]),
            Y().createElement(t, {
                componentConfig: n,
                parentAnalyticsContext: r,
                localAnalyticsData: o,
                responsivePropOverrides: e
            })
        }
        (cr = va = va || {}).ImageQualityLevel = "imageQualityLevel",
        cr.MaxWidth = "maxWidth";
        var ba, Ia, wa = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }, Sa = wa.High, Ea = function(e, o) {
            if (!e)
                return {};
            e = e.find(function(e) {
                e = e.conditions;
                return !e || Object.entries(e).every(function(e) {
                    var t = e[0]
                      , n = e[1];
                    switch (t) {
                    case va.ImageQualityLevel:
                        if (!Ii(n))
                            return Pi(mi.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        var r = wa[gi(n, "")];
                        return void 0 === r ? (Pi(mi.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + n.toString()),
                        !1) : Sa === r;
                    case va.MaxWidth:
                        if (!Ii(n))
                            return Pi(mi.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        r = yi(n, -1);
                        return r < 0 ? (Pi(mi.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + n.toString()),
                        !1) : o <= r;
                    default:
                        return Pi("UnknownResponsivePropConditionKey", "Unknown responsive prop condition key: " + t),
                        !1
                    }
                })
            });
            return e ? e.overrides : {}
        }, Pa = function(e) {
            var n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.localAnalyticsData;
            return (0,
            K.useMemo)(function() {
                var e = n.componentType
                  , t = ga(e);
                return t ? n.responsiveProps ? Y().createElement(ya, {
                    wrappedComponent: t,
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    localAnalyticsData: o
                }) : Y().createElement(t, {
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    localAnalyticsData: o
                }) : (Pi(mi.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(n)),
                Y().createElement(Y().Fragment, null))
            }, [n, r, o])
        }, Ca = (ba = function(e, t) {
            return (ba = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            ba(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        function _a(e) {
            e = Ia.call(this, e) || this;
            return e.state = {
                hasError: !1
            },
            e
        }
        function Ta(e) {
            var n = e.sort
              , r = e.sduiRoot
              , o = e.currentPage
              , i = pn()
              , t = (0,
            K.useMemo)(function() {
                var e = ia(r, n.feedItemKey);
                if (!e)
                    return Y().createElement(Y().Fragment, null);
                var t = Aa({}, function(e, t) {
                    var n;
                    switch (t) {
                    case Z.HomePage:
                        return (n = {})[ao.HomePageSessionInfo] = e,
                        n;
                    case Z.GamesPage:
                        return (n = {})[ao.DiscoverPageSessionInfo] = e,
                        n;
                    default:
                        return Pi(mi.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (t ? JSON.stringify(t) : "undefined") + " with session info: " + e),
                        {}
                    }
                }(i, o));
                return Y().createElement("div", {
                    className: "sdui-feed-item-container"
                }, Y().createElement(Pa, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: t
                }))
            }, [n, r, i, o])
              , e = (0,
            K.useCallback)(function(e, t) {
                Pi(mi.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(n) + " with error message " + e + " and callstack " + t)
            }, [n]);
            return Y().createElement(xa, {
                fallback: Y().createElement(Y().Fragment, null),
                logError: e
            }, t)
        }
        var xa = (Ia = Y().Component,
        Ca(_a, Ia),
        _a.getDerivedStateFromError = function() {
            return {
                hasError: !0
            }
        }
        ,
        _a.prototype.componentDidCatch = function(e, t) {
            e = e.message,
            t = t.componentStack;
            (0,
            this.props.logError)(e, t)
        }
        ,
        _a.prototype.render = function() {
            var e = this.state.hasError
              , t = this.props
              , n = t.fallback
              , t = t.children;
            return e ? n : t
        }
        ,
        _a)
          , Aa = function() {
            return (Aa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Oa() {
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
        function Na(o) {
            var i = pn();
            (0,
            K.useEffect)(function() {
                var t = window.scrollY
                  , e = Ie(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    Pn({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: h.Vertical,
                        startingPosition: t,
                        currentPage: o,
                        pageSession: i
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
            }, [o, i])
        }
        (cr = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.currentPage
              , i = e.itemsPerRow
              , a = e.startingRow
              , l = e.gridRecommendations
              , s = e.loadMoreGames
              , u = e.isLoadingMoreGames
              , c = e.isExpandHomeContentEnabled
              , d = e.isChartsPageRenameEnabled
              , f = e.isCarouselHorizontalScrollEnabled
              , p = e.isNewScrollArrowsEnabled
              , m = e.sduiRoot
              , v = e.fetchGamesPageData;
            switch (n.treatmentType) {
            case w.Carousel:
                return Y().createElement(Dr, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    page: o,
                    itemsPerRow: i,
                    startingRow: a,
                    loadMoreGames: s,
                    isLoadingMoreGames: u,
                    isExpandHomeContentEnabled: c,
                    isChartsPageRenameEnabled: d,
                    isCarouselHorizontalScrollEnabled: f,
                    isNewScrollArrowsEnabled: p
                });
            case w.AvatarCarousel:
                return Y().createElement(Rr, {
                    sort: n
                });
            case w.SortlessGrid:
                return Y().createElement(Zr, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: i,
                    startingRow: a,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c
                });
            case w.FriendCarousel:
                return Y().createElement(ai, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case w.Pills:
                return Y().createElement(vi, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: v
                });
            case w.Sdui:
                return Y().createElement(Ta, {
                    sort: n,
                    sduiRoot: m,
                    currentPage: o
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
        var Ra = cr
          , ka = function(e, o, r) {
            var t = (0,
            K.useState)(new Map)
              , i = t[0]
              , n = t[1]
              , t = (0,
            K.useState)(new Map)
              , s = t[0]
              , a = t[1]
              , l = (0,
            p.usePrevious)(s)
              , u = (0,
            p.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            K.useEffect)(function() {
                void 0 !== l && (0,
                Qr.isEqual)(s, l) && (0,
                Qr.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
                    var i = new Map
                      , a = new Map;
                    null != e && e.sorts.forEach(function(e) {
                        var t;
                        e.treatmentType === w.SortlessGrid && ((t = null !== (t = i.get(e.topicId)) && void 0 !== t ? t : []).push.apply(t, e.recommendationList),
                        i.set(e.topicId, t))
                    });
                    var l = new Map;
                    null != e && e.sorts.forEach(function(e, t) {
                        var n, r, o;
                        e.treatmentType === w.SortlessGrid && (n = null !== (r = i.get(e.topicId)) && void 0 !== r ? r : [],
                        r = null !== (o = a.get(e.topicId)) && void 0 !== o ? o : 0,
                        void 0 !== e.numberOfRows && 0 <= e.numberOfRows ? (o = (null !== (o = s.get(t)) && void 0 !== o ? o : 0) * e.numberOfRows,
                        l.set(t, n.slice(r, r + o)),
                        a.set(e.topicId, r + o)) : (l.set(t, n.slice(r)),
                        a.set(e.topicId, n.length)))
                    }),
                    n(l)
                }()
            }, [null == e ? void 0 : e.sorts, u, s, l]);
            var t = (0,
            K.useMemo)(function() {
                var n = new Map
                  , r = 0;
                return null != e && e.sorts.forEach(function(e, t) {
                    r && n.set(t, r);
                    t = function(e, t) {
                        if (void 0 === e.numberOfRows)
                            return (0,
                            E.fireEvent)(Je.missingNumberOfRowsForLoggingErrorEvent),
                            1;
                        if (0 === e.numberOfRows || 1 === e.numberOfRows)
                            return e.numberOfRows;
                        e = i.get(t),
                        t = s.get(t);
                        return e && t ? Math.ceil(e.length / t) : null
                    }(e, t);
                    void 0 !== r && null !== t ? r += t : r = void 0
                }),
                n
            }, [i, s, null == e ? void 0 : e.sorts])
              , c = (0,
            K.useRef)(null)
              , d = (0,
            K.useCallback)(function(e, t) {
                if (o || e.treatmentType === w.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, o, i) {
                        var a = n ? (r ? _t : Ct)[n] : Tt;
                        if (!e)
                            return a.minTilesPerRow;
                        var l = a.minTileWidth
                          , s = a.columnGap
                          , n = a.minTilesPerRow
                          , a = a.maxTilesPerRow
                          , s = Math.floor((e - t + s) / (l + s))
                          , s = Math.min(a, Math.max(n, s));
                        return r && o === w.Carousel && void 0 !== i && s < i ? s + .3 : s
                    }(t, 1, n, r || n === $.EventTile, null == e ? void 0 : e.treatmentType, null === (n = null == e ? void 0 : e.recommendationList) || void 0 === n ? void 0 : n.length)
                }
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === $.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === $.EventTile ? t && t < Je.wideGameTileTilesPerRowBreakpointWidth ? Je.minWideGameTilesPerCarouselPage : Je.maxWideGameTilesPerCarouselPage : t && t < Je.homeFeedMaxWidth ? Math.max(1, Math.floor(t / Je.gameTileWidth)) : Je.maxTilesPerCarouselPage
            }, [o, r])
              , f = (0,
            K.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === w.SortlessGrid || e.treatmentType === w.InterestGrid || o && e.treatmentType === w.Carousel) && r.set(t, d(e, n))
                }),
                a(r)
            }, [null == e ? void 0 : e.sorts, d, o]);
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
                gridRecommendationsMap: i,
                itemsPerRowMap: s,
                startingRowNumbersMap: t
            }
        }
          , Da = function() {
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
          , Ca = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , La = (P.EnvironmentUrls.apiGatewayUrl,
        P.EnvironmentUrls.voiceApi);
        function Ma(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var Ua = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(La, "/v1/settings/user-opt-in")
                            },
                            o = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            N.httpService.post(r, o);
                        case 4:
                            return o = e.sent,
                            o = o.data,
                            e.abrupt("return", o);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                }, e)
            }),
            function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        Ma(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Ma(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
            );
            return function() {
                return e.apply(this, arguments)
            }
        }();
        function Fa(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ba(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function ja(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ba(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ba(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function Ga(e, n) {
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
                            return null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell(ja({
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
                                                Ua(!0, !1);
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
                                      , a = arguments;
                                    return new Promise(function(t, n) {
                                        var r = l.apply(e, a);
                                        function o(e) {
                                            Fa(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            Fa(r, t, n, o, i, "throw", e)
                                        }
                                        o(void 0)
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
                    buttonStackOrientation: $a
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
                    buttonStackOrientation: Ja
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
        var Ha = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , za = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , Va = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , Wa = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , qa = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , Ja = "vertical"
          , $a = "horizontal"
          , Ka = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function Ya(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Za(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ya(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ya(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function Qa(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            S.eventStreamService.sendEventWithTarget(e.type, Wa[n], Za(Za({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var cr = S.eventStreamService.eventTypes
          , Xa = "mandatory"
          , el = "homepage"
          , tl = {
            cardShown: {
                name: "cardShown",
                type: cr.modalAction,
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
        function nl(e, t) {
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
                    return rl(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return rl(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function rl(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function ol(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = nl((0,
            K.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = qa[n];
            (0,
            K.useEffect)(function() {
                Qa(tl.cardShown, r, n, c)
            }, []);
            var e = Ga(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? Y().createElement(ye.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    Qa(tl.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , a = f ? Y().createElement(ye.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    Qa(tl.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : $a
              , a = Y().createElement("div", {
                className: e === $a ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = il(o) ? t(za[n]) : o
              , i = il(i) ? t(Va[n]) : i
              , o = Y().createElement("div", {
                className: "upsell-card-text-content-group"
            }, za[n] ? Y().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, Y().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = Ka[n] ? Y().createElement("div", {
                className: "home-page-upsell-card-image ".concat(Ka[n])
            }) : null;
            return s ? null : Y().createElement("div", {
                className: "home-page-upsell-card-banner-container"
            }, Y().createElement("div", {
                className: "banner-contents"
            }, Y().createElement("div", {
                className: "icon-and-text"
            }, i, Y().createElement("div", {
                className: "banner-content-container"
            }, o)), Y().createElement("div", {
                className: "add-email-btn-container"
            }, a), Y().createElement("div", {
                id: "facebookSunsetModal-container"
            })))
        }
        function il(e) {
            return !e || 0 === e.length
        }
        ol.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        ol.propTypes = {
            translate: lt().func.isRequired,
            cardType: lt().string.isRequired,
            titleTextOverride: lt().string,
            bodyTextOverride: lt().string,
            origin: lt().string,
            requireExplicitVoiceConsent: lt().bool
        };
        var al = ol
          , ll = function(e) {
            return !![Ha.ContactMethodEmail, Ha.ContactMethodPhoneNumber, Ha.ContactMethodPhoneNumberEmailHorizontalLayout, Ha.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, Ha.ContactMethodPhoneNumberEmailVerticalLayout, Ha.ContactMethodPhoneNumberVoiceOptIn, Ha.FacebookSunset].includes(e)
        };
        function sl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function ul(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        sl(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        sl(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function cl(e, t) {
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
                    return dl(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return dl(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function dl(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function fl(e) {
            var t = e.translate
              , n = Ha.ContactMethodMandatoryEmailPhone
              , r = cl((0,
            K.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = cl((0,
            K.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = cl((0,
            K.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = cl((0,
            K.useState)(!1), 2)
              , e = a[0]
              , c = a[1];
            return (0,
            K.useEffect)(function() {
                var e = function() {
                    var e = ul(regeneratorRuntime.mark(function e() {
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
                                    (null == t ? void 0 : t.upsellCardType) && (i(null == t ? void 0 : t.upsellCardType),
                                    s(null == t ? void 0 : t.localizedTitleTextOverride),
                                    u(null == t ? void 0 : t.localizedBodyTextOverride)),
                                    e.next = 12;
                                    break;
                                case 8:
                                    e.prev = 8,
                                    e.t0 = e.catch(0),
                                    console.error("Error getting the upsell card variation ".concat(e.t0)),
                                    i(null);
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
                    var e = ul(regeneratorRuntime.mark(function e() {
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
                o === n && null !== P.UpsellService && void 0 !== P.UpsellService && P.UpsellService.renderContactMethodPromptModal({
                    origin: el,
                    section: Xa
                })
            }, [o]),
            ll(o) ? Y().createElement(al, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        fl.propTypes = {
            translate: lt().func.isRequired
        };
        var pl = fl;
        function ml(e) {
            var t = e.translate
              , e = e.context;
            return Y().createElement(pl, {
                translate: t,
                context: e
            })
        }
        function vl(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            K.useRef)(null), u = (0,
            K.useRef)(null), c = Cr().contentMetadata, d = (0,
            K.useMemo)(function() {
                return _n(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
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
                    n[k.GameSetTypeId] = o.topicId,
                    n[k.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[k.Page] = Z.InterestCatcher,
                    n[U.HomePageSessionInfo] = a,
                    n[k.IsInterested] = !i.has(t),
                    n
                }
            }, [i, d, a, o.topicId]), p = (0,
            K.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = X.interestCatcherClick(e);
                void 0 !== e && S.eventStreamService.sendEvent.apply(S.eventStreamService, e)
            }, [r, f]), e = (0,
            K.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return bl(bl(bl(((e = {})[k.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[k.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), z(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), W(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[k.AbsPositions] = t,
                    e[k.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[k.GameSetTypeId] = o.topicId,
                    e[k.Page] = Z.InterestCatcher,
                    e[U.HomePageSessionInfo] = a,
                    e))
                }
            }, [d, a, o.topicId, null === (t = null == o ? void 0 : o.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return vn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            K.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            Y().createElement(Jr, {
                ref: s,
                tileRef: u,
                gameData: d,
                emphasis: !1,
                translate: l,
                isHomeGameGrid: !0,
                isExpandHomeContentEnabled: !0,
                buildEventProperties: function() {
                    return {}
                },
                componentType: null === (l = null == o ? void 0 : o.topicLayoutData) || void 0 === l ? void 0 : l.componentType,
                playerCountStyle: null === (l = null == o ? void 0 : o.topicLayoutData) || void 0 === l ? void 0 : l.playerCountStyle,
                playButtonStyle: null === (l = null == o ? void 0 : o.topicLayoutData) || void 0 === l ? void 0 : l.playButtonStyle,
                topicId: null === (l = null == o ? void 0 : o.topicId) || void 0 === l ? void 0 : l.toString(),
                shouldUseSentinelTile: !1,
                interestedUniverses: i,
                toggleInterest: p
            })
        }
        function hl(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            K.useState)(new Set))[0]
              , a = f[1]
              , l = pn()
              , s = (0,
            K.useCallback)(function(e) {
                var t = {};
                return t[k.ButtonName] = e,
                t[U.HomePageSessionInfo] = l,
                t[k.InterestedUniverseIds] = Array.from(i),
                t[k.Page] = Z.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            K.useCallback)(function(e) {
                e = s(e),
                e = X.interestCatcherClick(e);
                void 0 !== e && S.eventStreamService.sendEvent.apply(S.eventStreamService, e)
            }, [s])
              , c = (0,
            K.useCallback)(function() {
                r([]),
                u(g.Skip)
            }, [r, u])
              , d = (0,
            K.useCallback)(function() {
                r(Array.from(i)),
                u(g.Continue)
            }, [i, r, u])
              , e = (0,
            K.useMemo)(function() {
                return null != i && i.size ? o(ot.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(ot.ActionInterestCatcherContinue)
            }, [i, o])
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
            }, !(null != i && i.size) && Y().createElement(ye.Button, {
                variant: ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                title: o(ot.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, o(ot.ActionInterestCatcherSkip)), Y().createElement(ye.Button, {
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != i && i.size),
                className: "continue-button"
            }, e))), Y().createElement(vl, {
                sort: t,
                itemsPerRow: n,
                translate: o,
                toggleInterest: function(t) {
                    a(function(e) {
                        e = new Set(e);
                        return e.has(t) ? e.delete(t) : e.add(t),
                        e
                    })
                },
                interestedUniverses: i,
                homePageSessionInfo: l
            }))
        }
        ml.defaultProps = {
            context: Ha.ContactMethod
        },
        ml.propTypes = {
            translate: lt().func.isRequired,
            context: lt().string
        };
        var gl, yl = (0,
        p.withTranslations)(ml, Ca), bl = function() {
            return (bl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Il = function() {
            return (Il = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, wl = Je.maxTilesPerCarouselPage, Sl = _, El = C, Pl = (gl = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = pn()
              , r = (0,
            K.useState)(void 0)
              , o = r[0]
              , i = r[1]
              , a = (0,
            K.useState)(!1)
              , l = a[0]
              , s = a[1]
              , u = (0,
            K.useMemo)(function() {
                return Da()
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
                i(void 0),
                s(!1),
                fe(Se.Home, t, u, c, e).then(function(e) {
                    i(e),
                    (0,
                    E.fireEvent)(Je.omniRecommendationEndpointSuccessEvent)
                }).catch(function() {
                    s(!0),
                    (0,
                    E.fireEvent)(Je.omniRecommendationEndpointErrorEvent)
                })
            }, [t, u, c]);
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
                de(Sl.homePageWeb, El.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(El.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , v = null == e ? void 0 : e.IsCarouselHorizontalScrollEnabled
              , h = null == e ? void 0 : e.IsNewScrollArrowsEnabled
              , r = (0,
            K.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && Il(Il({}, e), {
                        contentMetadata: ((t = {})[I.Game] = Il(Il({}, e.contentMetadata[I.Game]), n[I.Game]),
                        t[I.CatalogAsset] = Il(Il({}, e.contentMetadata[I.CatalogAsset]), n[I.CatalogAsset]),
                        t[I.CatalogBundle] = Il(Il({}, e.contentMetadata[I.CatalogBundle]), n[I.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , a = ka(o, m, v)
              , f = a.homeFeedRef
              , g = a.gridRecommendationsMap
              , y = a.itemsPerRowMap
              , b = a.startingRowNumbersMap;
            Na(Z.HomePage);
            e = (0,
            K.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== w.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            a = (0,
            K.useMemo)(function() {
                return null == o ? void 0 : o.sorts.findIndex(function(e) {
                    return e.treatmentType === w.InterestGrid
                })
            }, [null == o ? void 0 : o.sorts]);
            if (l)
                return Y().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, Y().createElement("h2", null, n(nt.LabelGames)), Y().createElement(Ce, {
                    errorMessage: n(nt.LabelApiError),
                    onRefresh: function() {
                        return d()
                    }
                }));
            if (void 0 === o)
                return Y().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, Y().createElement("div", {
                    className: "game-home-page-loading-title shimmer"
                }), Y().createElement("div", {
                    className: "game-home-page-loading-carousel"
                }, Array.from({
                    length: wl
                }, function(e, t) {
                    return Y().createElement(Oa, {
                        key: t
                    })
                })));
            if (void 0 !== a && -1 < a) {
                l = o.sorts[a];
                if (l && Tn(l))
                    return Y().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, Y().createElement("div", {
                        ref: f
                    }, Y().createElement(_r.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: r
                        }
                    }, Y().createElement(hl, {
                        sort: l,
                        itemsPerRow: y.get(a),
                        fetchRecommendations: d,
                        translate: n
                    }))))
            }
            return Y().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, Y().createElement("div", {
                ref: f
            }, Y().createElement(_r.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: r
                }
            }, Y().createElement(yl, {
                translate: n,
                context: void 0
            }), e && Y().createElement(ii, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return Y().createElement(Y().Fragment, {
                    key: t
                }, Y().createElement(Ra, {
                    translate: n,
                    sort: e,
                    positionId: t,
                    startingRow: b.get(t),
                    currentPage: Z.HomePage,
                    itemsPerRow: y.get(t),
                    gridRecommendations: null !== (t = g.get(t)) && void 0 !== t ? t : [],
                    isExpandHomeContentEnabled: m,
                    isCarouselHorizontalScrollEnabled: v,
                    isNewScrollArrowsEnabled: h,
                    sduiRoot: o.sdui
                }))
            }))))
        }, St),
        function(e) {
            return Y().createElement(fn, null, Y().createElement(gl, hn({}, e)))
        }
        );
        (0,
        N.ready)(function() {
            l() && (0,
            e.render)(Y().createElement(Pl, null), l())
        })
    }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/3dda6fc147d0484f0d52f16dfb5b0fd9-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
