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
        5250: function(N, O, k) {
            var R;
            /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
            N = k.nmd(N),
            function() {
                var Hi, zi = "Expected a function", Vi = "__lodash_hash_undefined__", Wi = "__lodash_placeholder__", qi = 128, Ji = 9007199254740991, $i = NaN, Yi = 4294967295, Ki = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Zi = "[object Arguments]", Qi = "[object Array]", Xi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", va = "[object Float32Array]", ha = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", Ia = "[object Uint8Array]", wa = "[object Uint8ClampedArray]", Sa = "[object Uint16Array]", Ea = "[object Uint32Array]", Pa = /\b__p \+= '';/g, Ca = /\b(__p \+=) '' \+/g, Ta = /(__e\(.*?\)|\b__t\)) \+\n'';/g, _a = /&(?:amp|lt|gt|quot|#39);/g, xa = /[&<>"']/g, Aa = RegExp(_a.source), Na = RegExp(xa.source), Oa = /<%-([\s\S]+?)%>/g, ka = /<%([\s\S]+?)%>/g, Ra = /<%=([\s\S]+?)%>/g, Da = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, La = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ua = /[\\^$.*+?()[\]{}|]/g, Fa = RegExp(Ua.source), Ba = /^\s+/, n = /\s/, ja = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ga = /\{\n\/\* \[wrapped with (.+)\] \*/, Ha = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Va = /[()=,{}\[\]\/\s]/, Wa = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ja = /\w*$/, $a = /^[-+]0x[0-9a-f]+$/i, Ya = /^0b[01]+$/i, Ka = /^\[object .+?Constructor\]$/, Za = /^0o[0-7]+$/i, Qa = /^(?:0|[1-9]\d*)$/, Xa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", v = "[^" + e + l + f + r + o + i + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "[" + i + "]", w = "\\u200d", S = "(?:" + m + "|" + v + ")", l = "(?:" + I + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + h + ")" + "?", v = "[" + a + "]?", i = v + i + ("(?:" + w + "(?:" + [g, y, b].join("|") + ")" + v + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), E = RegExp(h + "(?=" + h + ")|" + u + i, "g"), ol = RegExp([I + "?" + m + "+" + r + "(?=" + [c, I, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, I + S, "$"].join("|") + ")", I + "?" + S + "+" + r, I + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), P = RegExp("[" + w + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
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
                  , t = "object" == typeof k.g && k.g && k.g.Object === Object && k.g
                  , a = "object" == typeof self && self && self.Object === Object && self
                  , fl = t || a || Function("return this")()
                  , a = O && !O.nodeType && O
                  , T = a && N && !N.nodeType && N
                  , pl = T && T.exports === a
                  , _ = pl && t.process
                  , t = function() {
                    try {
                        var e = T && T.require && T.require("util").types;
                        return e ? e : _ && _.binding && _.binding("util")
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
                function Tl(e, t) {
                    return !!(null == e ? 0 : e.length) && -1 < Ll(e, t, 0)
                }
                function _l(e, t, n) {
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
                function Nl(e, t, n, r) {
                    var o = -1
                      , i = null == e ? 0 : e.length;
                    for (r && i && (n = e[++o]); ++o < i; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Ol(e, t, n, r) {
                    var o = null == e ? 0 : e.length;
                    for (r && o && (n = e[--o]); o--; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function kl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var x = Bl("length");
                function Rl(e, r, t) {
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
                var Yl = A({
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
                  , Kl = A({
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
                      , u = (Ri = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Ri : ""
                      , h = m.toString
                      , g = l.call(v)
                      , b = fl._
                      , I = p("^" + l.call(y).replace(Ua, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , w = pl ? t.Buffer : Hi
                      , P = t.Symbol
                      , C = t.Uint8Array
                      , T = w ? w.allocUnsafe : Hi
                      , _ = es(v.getPrototypeOf, v)
                      , x = v.create
                      , A = m.propertyIsEnumerable
                      , N = i.splice
                      , O = P ? P.isConcatSpreadable : Hi
                      , k = P ? P.iterator : Hi
                      , R = P ? P.toStringTag : Hi
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
                      , Y = o.random
                      , K = i.reverse
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
                        if (!Ro(e))
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
                        this.__takeCount__ = Yi,
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
                        var n, r = Eo(e), o = !r && So(e), i = !r && !o && _o(e), a = !r && !o && !i && Ho(e), l = r || o || i || a, s = l ? Hl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Yn(n, u)) || s.push(n);
                        return s
                    }
                    function Ce(e) {
                        var t = e.length;
                        return t ? e[St(0, t - 1)] : Hi
                    }
                    function Te(e, t) {
                        return dr(rn(e), Le(t, 0, e.length))
                    }
                    function _e(e) {
                        return dr(rn(e))
                    }
                    function xe(e, t, n) {
                        (n === Hi || bo(e[t], n)) && (n !== Hi || t in e) || Re(e, t, n)
                    }
                    function Ae(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== Hi || t in e) || Re(e, t, n)
                    }
                    function Ne(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Oe(e, r, o, i) {
                        return je(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function ke(e, t) {
                        return e && on(t, ci(t), e)
                    }
                    function Re(e, t, n) {
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
                        if (!Ro(n))
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
                            if (_o(n))
                                return Zt(n, l);
                            if (p == aa || p == Zi || e && !t) {
                                if (a = s || e ? {} : Jn(n),
                                !l)
                                    return s ? (e = c = n,
                                    d = (d = a) && on(e, di(e), d),
                                    on(c, Vn(c), d)) : (d = ke(a, c = n),
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
                          , i = Tl
                          , a = !0
                          , l = e.length
                          , s = []
                          , u = t.length;
                        if (!l)
                            return s;
                        n && (t = xl(t, Vl(n))),
                        r ? (i = _l,
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
                        escape: Oa,
                        evaluate: ka,
                        interpolate: Ra,
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
                        return !((e = Ne(t, e)) < 0) && (e == t.length - 1 ? t.pop() : N.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = Ne(t, e)) < 0 ? Hi : t[e][1]
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return -1 < Ne(this.__data__, e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = Ne(n, e);
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
                      , Ge = sn(Ye, !0);
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
                    function Ye(e, t) {
                        return e && Je(e, t, ci)
                    }
                    function Ke(t, e) {
                        return Cl(e, function(e) {
                            return No(t[e])
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
                        return null == e ? e === Hi ? "[object Undefined]" : "[object Null]" : R && R in v(e) ? function(e) {
                            var t = y.call(e, R)
                              , n = e[R];
                            try {
                                e[R] = Hi;
                                var r = !0
                            } catch (e) {}
                            var o = h.call(e);
                            r && (t ? e[R] = n : delete e[R]);
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
                        for (var r = n ? _l : Tl, o = e[0].length, i = e.length, a = i, l = E(i), s = 1 / 0, u = []; a--; ) {
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
                            if (u && _o(e)) {
                                if (!_o(t))
                                    return !1;
                                c = !(a = !0)
                            }
                            if (u && !c)
                                return i = i || new Ee,
                                a || Ho(e) ? kn(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
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
                                        l = kn(l(e), l(t), r, o, i, a);
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
                        return !(!Ro(e) || (t = e,
                        u && u in t)) && (No(e) ? I : Ka).test(hr(e));
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
                        if (!Ro(e))
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
                            Ro(e) ? function(e, t, n, r, o, i, a) {
                                var l = ir(e, n)
                                  , s = ir(t, n)
                                  , u = a.get(s);
                                if (u)
                                    return xe(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : Hi, f = d === Hi;
                                f && (c = Eo(s),
                                u = !c && _o(s),
                                t = !c && !u && Ho(s),
                                d = s,
                                c || u || t ? d = Eo(l) ? l : To(l) ? rn(l) : u ? Zt(s, !(f = !1)) : t ? Xt(s, !(f = !1)) : [] : Uo(s) || So(s) ? So(d = l) ? d = Ko(l) : Ro(l) && !No(l) || (d = Jn(s)) : f = !1),
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
                            return Yn(t += t < 0 ? n : 0, n) ? e[t] : Hi
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
                            n(l, a) && _t(i, Jt(a, e), l)
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
                                l !== e && N.call(l, s, 1),
                                N.call(e, s, 1);
                        return e
                    }
                    function wt(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || (Yn(o = i) ? N.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function St(e, t) {
                        return e + B(Y() * (t - e + 1))
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
                    function Tt(e, t) {
                        e = bi(e);
                        return dr(e, Le(t, 0, e.length))
                    }
                    function _t(e, t, n, r) {
                        if (!Ro(e))
                            return e;
                        for (var o = -1, i = (t = Jt(t, e)).length, a = i - 1, l = e; null != l && ++o < i; ) {
                            var s, u = vr(t[o]), c = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u)
                                return e;
                            o != a && (s = l[u],
                            (c = r ? r(s, u, l) : Hi) === Hi && (c = Ro(s) ? s : Yn(t[o + 1]) ? [] : {})),
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
                            value: ki(t),
                            writable: !0
                        })
                    }
                    : Di;
                    function Nt(e) {
                        return dr(bi(e))
                    }
                    function Ot(e, t, n) {
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
                    function kt(e, r) {
                        var o;
                        return je(e, function(e, t, n) {
                            return !(o = r(e, t, n))
                        }),
                        !!o
                    }
                    function Rt(e, t, n) {
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
                          , o = Tl
                          , i = e.length
                          , a = !0
                          , l = []
                          , s = l;
                        if (n)
                            a = !1,
                            o = _l;
                        else if (200 <= i) {
                            var u = t ? null : Tn(e);
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
                        return _t(e, t, n(Ze(e, t)), r)
                    }
                    function Gt(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? Ot(e, r ? 0 : i, r ? i + 1 : o) : Ot(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        Nl(t, function(e, t) {
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
                        return To(e) ? e : []
                    }
                    function qt(e) {
                        return "function" == typeof e ? e : Di
                    }
                    function Jt(e, t) {
                        return Eo(e) ? e : Zn(e, t) ? [e] : mr(Zo(e))
                    }
                    var $t = Pt;
                    function Yt(e, t, n) {
                        var r = e.length;
                        return n = n === Hi ? r : n,
                        !t && r <= n ? e : Ot(e, t, n)
                    }
                    var Kt = L || function(e) {
                        return fl.clearTimeout(e)
                    }
                    ;
                    function Zt(e, t) {
                        if (t)
                            return e.slice();
                        t = e.length,
                        t = T ? T(t) : new e.constructor(t);
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
                            (o ? Re : Ae)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = Eo(e) ? wl : Oe
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
                            for (i && Kn(t[0], t[1], i) && (o = r < 3 ? Hi : o,
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
                              , e = t ? Yt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return Nl(Ni(Si(e).replace(nl, "")), t, "")
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
                            return Ro(n) ? n : t
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
                        return Rn(function(o) {
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
                                    e[r] = Yn(i, n) ? o[i] : Hi
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
                        return Rn(function(e) {
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
                        return Ql(t) ? Yt(os(n), 0, e).join("") : n.slice(0, e)
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
                            return n && "number" != typeof n && Kn(e, t, n) && (t = n = Hi),
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
                            return "string" == typeof e && "string" == typeof t || (e = Yo(e),
                            t = Yo(t)),
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
                            if (e = Yo(e),
                            (t = null == t ? 0 : q(Jo(t), 292)) && H(e)) {
                                var n = (Zo(e) + "e").split("e");
                                return +((n = (Zo(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
                            }
                            return r(e)
                        }
                    }
                    var Tn = ee && 1 / ns(new ee([, -0]))[1] == 1 / 0 ? function(e) {
                        return new ee(e)
                    }
                    : Ui;
                    function _n(i) {
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
                    function Nn(e, t, n, r, o, i) {
                        return Ro(e) && Ro(t) && (i.set(t, e),
                        ht(e, t, Hi, Nn, i),
                        i.delete(t)),
                        e
                    }
                    function On(e) {
                        return Uo(e) ? Hi : e
                    }
                    function kn(e, t, n, r, o, i) {
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
                                if (!kl(t, function(e, t) {
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
                    function Rn(e) {
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
                            e = _(e);
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
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && ko(o) && Yn(a, o) && (Eo(e) || So(e))
                    }
                    function Jn(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(_(e))
                    }
                    function $n(e) {
                        return Eo(e) || So(e) || !!(O && e && e[O])
                    }
                    function Yn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Ji : t) && ("number" == n || "symbol" != n && Qa.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Kn(e, t, n) {
                        if (Ro(n)) {
                            var r = typeof t;
                            return ("number" == r ? Co(n) && Yn(t, n.length) : "string" == r && t in n) && bo(n[t], e)
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
                    var Xn = a ? No : ji;
                    function er(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || m)
                    }
                    function tr(e) {
                        return e == e && !Ro(e)
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
                        return t.length < 2 ? e : Ze(e, Ot(t, 0, -1))
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
                        Sl(Ki, function(e) {
                            var t = "_." + e[0];
                            o & e[1] && !Tl(r, t) && r.push(t)
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
                        return To(e) ? Be(e, We(t, 1, To, !0)) : []
                    })
                      , br = Pt(function(e, t) {
                        var n = xr(t);
                        return To(n) && (n = Hi),
                        To(e) ? Be(e, We(t, 1, To, !0), Bn(n, 2)) : []
                    })
                      , Ir = Pt(function(e, t) {
                        var n = xr(t);
                        return To(n) && (n = Hi),
                        To(e) ? Be(e, We(t, 1, To, !0), Hi, n) : []
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
                      , Tr = Pt(function(e) {
                        var t = xr(e)
                          , n = xl(e, Wt);
                        return t === xr(n) ? t = Hi : n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Bn(t, 2)) : []
                    })
                      , _r = Pt(function(e) {
                        var t = xr(e)
                          , n = xl(e, Wt);
                        return (t = "function" == typeof t ? t : Hi) && n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Hi, t) : []
                    });
                    function xr(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : Hi
                    }
                    var Ar = Pt(Nr);
                    function Nr(e, t) {
                        return e && e.length && t && t.length ? It(e, t) : e
                    }
                    var Or = Rn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = De(e, t);
                        return wt(e, xl(t, function(e) {
                            return Yn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function kr(e) {
                        return null == e ? e : K.call(e)
                    }
                    var Rr = Pt(function(e) {
                        return Ft(We(e, 1, To, !0))
                    })
                      , Dr = Pt(function(e) {
                        var t = xr(e);
                        return To(t) && (t = Hi),
                        Ft(We(e, 1, To, !0), Bn(t, 2))
                    })
                      , Lr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return Ft(We(e, 1, To, !0), Hi, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = Cl(t, function(e) {
                            return To(e) && (n = W(e.length, n),
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
                        return To(e) ? Be(e, t) : []
                    })
                      , Br = Pt(function(e) {
                        return zt(Cl(e, To))
                    })
                      , jr = Pt(function(e) {
                        var t = xr(e);
                        return To(t) && (t = Hi),
                        zt(Cl(e, To), Bn(t, 2))
                    })
                      , Gr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return zt(Cl(e, To), Hi, t)
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
                    var qr = Rn(function(t) {
                        function e(e) {
                            return De(e, t)
                        }
                        var n = t.length
                          , r = n ? t[0] : 0
                          , o = this.__wrapped__;
                        return !(1 < n || this.__actions__.length) && o instanceof ye && Yn(r) ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
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
                        y.call(e, n) ? ++e[n] : Re(e, n, 1)
                    });
                    var $r = mn(wr)
                      , Yr = mn(Sr);
                    function Kr(e, t) {
                        return (Eo(e) ? Sl : je)(e, Bn(t, 3))
                    }
                    function Zr(e, t) {
                        return (Eo(e) ? El : Ge)(e, Bn(t, 3))
                    }
                    var Qr = an(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : Re(e, n, [t])
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
                        Re(e, n, t)
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
                        return 1 < n && Kn(e, t[0], t[1]) ? t = [] : 2 < n && Kn(t[0], t[1], t[2]) && (t = [t[0]]),
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
                                    return Kt(s),
                                    s = lr(v, n),
                                    p(u)
                            }
                            return s === Hi && (s = lr(v, n)),
                            l
                        }
                        return n = Yo(n) || 0,
                        Ro(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? W(Yo(e.maxWait) || 0, n) : a,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            s !== Hi && Kt(s),
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
                        return Fe(e, Yo(t) || 0, n)
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
                      , yo = Rn(function(e, t) {
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
                        return null != e && ko(e.length) && !No(e)
                    }
                    function To(e) {
                        return Do(e) && Co(e)
                    }
                    var _o = G || ji
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
                    function No(e) {
                        if (!Ro(e))
                            return !1;
                        e = Xe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function Oo(e) {
                        return "number" == typeof e && e == Jo(e)
                    }
                    function ko(e) {
                        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= Ji
                    }
                    function Ro(e) {
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
                        e = _(e);
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
                        return Do(e) && ko(e.length) && !!sl[Xe(e)]
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
                        if (k && e[k])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[k]());
                        var t = Wn(e);
                        return (t == oa ? Xl : t == ua ? ns : bi)(e)
                    }
                    function qo(e) {
                        return e ? (e = Yo(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function Jo(e) {
                        var t = qo(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function $o(e) {
                        return e ? Le(Jo(e), 0, Yi) : 0
                    }
                    function Yo(e) {
                        if ("number" == typeof e)
                            return e;
                        if (Go(e))
                            return $i;
                        if (Ro(e) && (e = Ro(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = Ya.test(e);
                        return t || Za.test(e) ? dl(e.slice(2), t ? 2 : 8) : $a.test(e) ? $i : +e
                    }
                    function Ko(e) {
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
                      , ni = Rn(De);
                    var ri = Pt(function(e, t) {
                        e = v(e);
                        var n = -1
                          , r = t.length
                          , o = 2 < r ? t[2] : Hi;
                        for (o && Kn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === Hi || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Pt(function(e) {
                        return e.push(Hi, Nn),
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
                    }, ki(Di))
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
                      , mi = Rn(function(t, e) {
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
                        r && (n = Me(n, 7, On));
                        for (var o = e.length; o--; )
                            Bt(n, e[o]);
                        return n
                    });
                    var vi = Rn(function(e, t) {
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
                    var gi = _n(ci)
                      , yi = _n(di);
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
                        return (e = Zo(e)) && e.replace(Xa, Yl).replace(rl, "")
                    }
                    var Ei = dn(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , Pi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    })
                      , Ci = cn("toLowerCase");
                    var Ti = dn(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    });
                    var _i = dn(function(e, t, n) {
                        return e + (n ? " " : "") + Ai(t)
                    });
                    var xi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Ai = cn("toUpperCase");
                    function Ni(e, t, n) {
                        return e = Zo(e),
                        (t = n ? Hi : t) === Hi ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var Oi = Pt(function(e, t) {
                        try {
                            return Il(e, Hi, t)
                        } catch (e) {
                            return Ao(e) ? e : new d(e)
                        }
                    })
                      , r = Rn(function(t, e) {
                        return Sl(e, function(e) {
                            e = vr(e),
                            Re(t, e, lo(t[e], t))
                        }),
                        t
                    });
                    function ki(e) {
                        return function() {
                            return e
                        }
                    }
                    var Ri = vn()
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
                          , o = Ke(t, n);
                        null != e || Ro(t) && (o.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        o = Ke(t, ci(t)));
                        var i = !(Ro(e) && "chain"in e && !e.chain)
                          , a = No(r);
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
                    L = bn(kl);
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
                        t = (n ? Kn(e, t, n) : t === Hi) ? 1 : W(Jo(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = E(F(r / t)); o < r; )
                            a[i++] = Ot(e, o, o += t);
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
                    pe.constant = ki,
                    pe.countBy = Jr,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : ke(e, t)
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
                        return r ? Ot(e, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Ot(e, 0, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t) : []
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
                        return o ? (n && "number" != typeof n && Kn(e, t, n) && (n = 0,
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
                    pe.flow = Ri,
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
                        return null == e ? [] : Ke(e, ci(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Ke(e, di(e))
                    }
                    ,
                    pe.groupBy = Qr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? Ot(e, 0, -1) : []
                    }
                    ,
                    pe.intersection = Cr,
                    pe.intersectionBy = Tr,
                    pe.intersectionWith = _r,
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
                            Re(o, r(e, t, n), e)
                        }),
                        o
                    }
                    ,
                    pe.mapValues = function(e, r) {
                        var o = {};
                        return r = Bn(r, 3),
                        $e(e, function(e, t, n) {
                            Re(o, t, r(e, t, n))
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
                    pe.pullAll = Nr,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Hi, n) : e
                    }
                    ,
                    pe.pullAt = Or,
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
                    pe.reverse = kr,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Kn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        (Eo(e) ? Te : Tt)(e, t)
                    }
                    ,
                    pe.set = function(e, t, n) {
                        return null == e ? e : _t(e, t, n)
                    }
                    ,
                    pe.setWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Hi,
                        null == e ? e : _t(e, t, n, r)
                    }
                    ,
                    pe.shuffle = function(e) {
                        return (Eo(e) ? _e : Nt)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Kn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : Jo(t),
                        n === Hi ? r : Jo(n)),
                        Ot(e, t, n)) : []
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
                        return n && "number" != typeof n && Kn(e, t, n) && (t = n = Hi),
                        (n = n === Hi ? Yi : n >>> 0) ? (e = Zo(e)) && ("string" == typeof t || null != t && !Fo(t)) && !(t = Ut(t)) && Ql(e) ? Yt(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new S(zi);
                        return r = null == r ? 0 : W(Jo(r), 0),
                        Pt(function(e) {
                            var t = e[r]
                              , e = Yt(e, 0, r);
                            return t && Al(e, t),
                            Il(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? Ot(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? Ot(e, 0, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? Ot(e, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t, r) : []
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
                        return Ro(n) && (r = "leading"in n ? !!n.leading : r,
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
                    pe.toPlainObject = Ko,
                    pe.transform = function(e, r, o) {
                        var t, n = Eo(e), i = n || _o(e) || Ho(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : Ro(e) && No(t) ? me(_(e)) : {}),
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
                    pe.union = Rr,
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
                    pe.words = Ni,
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
                        return Vt(e || [], t || [], _t)
                    }
                    ,
                    pe.zipWith = zr,
                    pe.entries = gi,
                    pe.entriesIn = yi,
                    pe.extend = Xo,
                    pe.extendWith = ei,
                    Mi(pe, pe),
                    pe.add = te,
                    pe.attempt = Oi,
                    pe.camelCase = Ii,
                    pe.capitalize = wi,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === Hi && (n = t,
                        t = Hi),
                        n !== Hi && (n = (n = Yo(n)) == n ? n : 0),
                        t !== Hi && (t = (t = Yo(t)) == t ? t : 0),
                        Le(Yo(e), t, n)
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
                        return (e = Zo(e)) && Na.test(e) ? e.replace(xa, Kl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Zo(e)) && Fa.test(e) ? e.replace(Ua, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = Eo(e) ? Pl : He;
                        return n && Kn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = $r,
                    pe.findIndex = wr,
                    pe.findKey = function(e, t) {
                        return Rl(e, Bn(t, 3), $e)
                    }
                    ,
                    pe.findLast = Yr,
                    pe.findLastIndex = Sr,
                    pe.findLastKey = function(e, t) {
                        return Rl(e, Bn(t, 3), Ye)
                    }
                    ,
                    pe.floor = At,
                    pe.forEach = Kr,
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
                        return e && Ye(e, Bn(t, 3))
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
                        (e = e = Yo(e)) >= q(t = t, n = n) && e < W(t, n)
                    }
                    ,
                    pe.invoke = ui,
                    pe.isArguments = So,
                    pe.isArray = Eo,
                    pe.isArrayBuffer = Po,
                    pe.isArrayLike = Co,
                    pe.isArrayLikeObject = To,
                    pe.isBoolean = function(e) {
                        return !0 === e || !1 === e || Do(e) && Xe(e) == Xi
                    }
                    ,
                    pe.isBuffer = _o,
                    pe.isDate = xo,
                    pe.isElement = function(e) {
                        return Do(e) && 1 === e.nodeType && !Uo(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (Co(e) && (Eo(e) || "string" == typeof e || "function" == typeof e.splice || _o(e) || Ho(e) || So(e)))
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
                    pe.isFunction = No,
                    pe.isInteger = Oo,
                    pe.isLength = ko,
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
                    pe.isObject = Ro,
                    pe.isObjectLike = Do,
                    pe.isPlainObject = Uo,
                    pe.isRegExp = Fo,
                    pe.isSafeInteger = function(e) {
                        return Oo(e) && -Ji <= e && e <= Ji
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
                        if (n && "boolean" != typeof n && Kn(e, t, n) && (t = n = Hi),
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
                            n = Y();
                            return q(e + n * (t - e + cl("1e-" + ((n + "").length - 1))), t)
                        }
                        return St(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = Eo(e) ? Nl : jl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, je)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = Eo(e) ? Ol : jl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Ge)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Kn(e, t, n) : t === Hi) ? 1 : Jo(t),
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
                            e = No(i) ? i.call(e) : i
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
                    pe.snakeCase = Ti,
                    pe.some = function(e, t, n) {
                        var r = Eo(e) ? kl : kt;
                        return n && Kn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.sortedIndex = function(e, t) {
                        return Rt(e, t)
                    }
                    ,
                    pe.sortedIndexBy = function(e, t, n) {
                        return Dt(e, t, Bn(n, 2))
                    }
                    ,
                    pe.sortedIndexOf = function(e, t) {
                        var n = null == e ? 0 : e.length;
                        if (n) {
                            var r = Rt(e, t);
                            if (r < n && bo(e[r], t))
                                return r
                        }
                        return -1
                    }
                    ,
                    pe.sortedLastIndex = function(e, t) {
                        return Rt(e, t, !0)
                    }
                    ,
                    pe.sortedLastIndexBy = function(e, t, n) {
                        return Dt(e, t, Bn(n, 2), !0)
                    }
                    ,
                    pe.sortedLastIndexOf = function(e, t) {
                        if (null == e ? 0 : e.length) {
                            var n = Rt(e, t, !0) - 1;
                            if (bo(e[n], t))
                                return n
                        }
                        return -1
                    }
                    ,
                    pe.startCase = _i,
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
                        t && Kn(a, e, t) && (e = Hi),
                        a = Zo(a),
                        e = ei({}, e, n, An);
                        var l, s, r = ci(n = ei({}, e.imports, n.imports, An)), o = Wl(n, r), u = 0, n = e.interpolate || el, c = "__p += '", n = p((e.escape || el).source + "|" + n.source + "|" + (n === Ra ? qa : el).source + "|" + (e.evaluate || el).source + "|$", "g"), i = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ll + "]") + "\n";
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
                        if (c = (s ? c.replace(Pa, "") : c).replace(Ca, "$1").replace(Ta, "$1;"),
                        c = "function(" + (e || "obj") + ") {\n" + (e ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}",
                        (e = Oi(function() {
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
                        var n = Yi
                          , r = q(e, Yi);
                        for (t = Bn(t),
                        e -= Yi,
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
                    pe.toNumber = Yo,
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
                        Yt(e, Jl(e, t), $l(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.slice(0, is(e) + 1) : e && (t = Ut(t)) ? Yt(e = os(e), 0, $l(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.replace(Ba, "") : e && (t = Ut(t)) ? Yt(e = os(e), Jl(e, os(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, o = "...";
                        Ro(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? Jo(t.length) : r,
                        o = "omission"in t ? Ut(t.omission) : o);
                        var i, t = (e = Zo(e)).length;
                        if (Ql(e) && (t = (i = os(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - rs(o)) < 1)
                            return o;
                        if (r = i ? Yt(i, 0, t).join("") : e.slice(0, t),
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
                        return (e = Zo(e)) && Aa.test(e) ? e.replace(_a, as) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++s;
                        return Zo(e) + t
                    }
                    ,
                    pe.upperCase = xi,
                    pe.upperFirst = Ai,
                    pe.each = Kr,
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
                                size: q(e, Yi),
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
                        return this.take(Yi)
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
                                args: [kr],
                                thisArg: Hi
                            }),
                            new ge(e,this.__chain__)
                        }
                        return this.thru(kr)
                    }
                    ,
                    pe.prototype.toJSON = pe.prototype.valueOf = pe.prototype.value = function() {
                        return Ht(this.__wrapped__, this.__actions__)
                    }
                    ,
                    pe.prototype.first = pe.prototype.head,
                    k && (pe.prototype[k] = function() {
                        return this
                    }
                    ),
                    pe
                }();
                fl._ = ls,
                (R = function() {
                    return ls
                }
                .call(O, k, O, N)) === Hi || (N.exports = R)
            }
            .call(this)
        }
    }
      , r = {};
    function rs(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, rs),
        t.loaded = !0,
        t.exports
    }
    rs.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return rs.d(t, {
            a: t
        }),
        t
    }
    ,
    rs.d = function(e, t) {
        for (var n in t)
            rs.o(t, n) && !rs.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    rs.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    rs.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    rs.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var I, w, $, D, L, M, Y = React, K = rs.n(Y), e = ReactDOM, O = CoreUtilities, S = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, p = ReactUtilities, E = CoreRobloxUtilities, y = Roblox, r = y.EnvironmentUrls.apiGatewayUrl, a = {
            getExperimentationValues: function(e, t, n) {
                return {
                    url: r + "/product-experimentation-platform/v1/projects/" + e + "/layers/" + t + "/values?parameters=" + n.join(","),
                    withCredentials: !0
                }
            }
        }, t = {
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
            playButton: {}
        }, n = {
            homePage: "PlayerApp.HomePage.UX",
            homePageWeb: "Website.Homepage",
            serverTab: "GameDetails.ServersTab",
            gameDetails: "Website.GameDetails",
            gameDetailsExposure: "Website.GameDetails.Exposure",
            searchPage: "Website.SearchResultsPage",
            discoverPage: "Website.GamesPage",
            tileLayer: "Website.TileLayer",
            playButton: "Website.PlayButton"
        }, o = y.EnvironmentUrls.apiGatewayUrl, s = {
            url: {
                getOmniRecommendations: {
                    url: o + "/discovery-api/omni-recommendation",
                    withCredentials: !0
                },
                getOmniRecommendationsMetadata: {
                    url: o + "/discovery-api/omni-recommendation-metadata",
                    withCredentials: !0
                },
                getOmniSearch: {
                    url: o + "/search-api/omni-search",
                    withCredentials: !0
                },
                getExploreSorts: {
                    url: o + "/explore-api/v1/get-sorts",
                    withCredentials: !0
                },
                getExploreSortContents: {
                    url: o + "/explore-api/v1/get-sort-content",
                    withCredentials: !0
                },
                getSearchLandingPage: {
                    url: o + "/search-api/search-landing-page",
                    withCredentials: !0
                },
                getSurvey: function(e) {
                    return {
                        url: o + "/rocap/v1/locations/" + e + "/prompts",
                        withCredentials: !0
                    }
                },
                postSurveyResults: function(e) {
                    return {
                        url: o + "/rocap/v1/locations/" + e + "/annotations",
                        withCredentials: !0
                    }
                },
                getGuacAppPolicyBehaviorData: function() {
                    return {
                        url: o + "/universal-app-configuration/v1/behaviors/app-policy/content",
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
        (ve = {}).Sponsored = "Sponsored",
        ve.SponsoredGame = "SponsoredGame",
        (ot = $ = $ || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        ot.GridTile = "GridTile",
        ot.EventTile = "EventTile",
        ot.InterestTile = "InterestTile",
        ot.ExperienceEventsTile = "ExperienceEventsTile",
        (it = D = D || {}).Always = "Always",
        it.Hover = "Hover",
        it.Footer = "Footer",
        (It = L = L || {}).Disabled = "Disabled",
        It.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var i, l = "robloxAttributionIds";
        function u(e) {
            var t = window
              , n = t[l];
            return n || (n = {},
            t[l] = n),
            (t = n[e]) || (t = O.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function c() {
            return document.getElementById("place-list")
        }
        (i = i || {}).GameDetailReferral = "gameDetailReferral";
        var Z, d = function(e) {
            return "discover#/sortName/" + e
        }, f = function(e) {
            return "discover#/sortName/v2/" + e
        }, m = function(e) {
            return "charts#/sortName/" + e
        };
        function v(e, t, n) {
            return void 0 === n && (n = {}),
            O.urlService.getUrlWithQueries(E.entityUrl.game.getRelativePath(e) + "/" + O.seoName.formatSeoName(t), n)
        }
        function k(e, t, n, r, o) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === o && (o = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case Z.HomePage:
                    return f(r);
                case Z.GamesPage:
                    return (n ? m : d)(r);
                default:
                    return f(r)
                }
            }(e, t, r),
            O.urlService.getUrlWithQueries(r, T(T({}, n), o))
        }
        function h() {
            return document.referrer
        }
        (sr = Z = Z || {}).SearchPage = "searchPage",
        sr.SortDetailPageDiscover = "sortDetailPageDiscover",
        sr.SortDetailPageHome = "sortDetailPageHome",
        sr.GameDetailPage = "gameDetailPage",
        sr.GamesPage = "gamesPage",
        sr.HomePage = "homePage",
        sr.PeopleListInHomePage = "peopleListInHomePage",
        sr.InterestCatcher = "interestCatcher",
        sr.SearchLandingPage = "searchLandingPage";
        var R, g, U, b, P, C, T = function() {
            return (T = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, F = v, _ = function() {
            return (_ = Object.assign || function(e) {
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
        }, A = (Ra = E.eventStreamService.eventTypes).pageLoad, N = Ra.formInteraction;
        function B(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === y.Presence.PresenceTypes.InGame
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
            }) ? ((n = {})[R.AdsPositions] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[R.AdFlags] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[R.AdIds] = e.map(function(e) {
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
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[R.ThumbnailAssetIds] = e.map(function(e) {
                return null !== (e = H(r[e], o.toString())) && void 0 !== e ? e : "0"
            }),
            t[R.ThumbnailListIds] = e.map(function(e) {
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
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[R.TileBadgeContexts] = e.map(function(e) {
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
            (t = {})[R.RowsOnPage] = o,
            t[R.PositionsInRow] = i,
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
                    return [2, O.httpService.get({
                        url: y.EnvironmentUrls.thumbnailsApi + "/v1/assets",
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
        (ee = R = R || {}).AbsPositions = "absPositions",
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
        (re = g = g || {}).GameImpressions = "gameImpressions",
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
        (ve = U = U || {}).HomePageSessionInfo = "homePageSessionInfo",
        ve.GameSearchSessionInfo = "gameSearchSessionInfo",
        ve.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        ve.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
        (ot = {}).Submission = "submission",
        ot.Cancellation = "cancellation",
        (it = b = b || {}).Horizontal = "horizontal",
        it.Vertical = "vertical",
        (It = P = P || {}).Skip = "skip",
        It.Continue = "continue",
        It.Interested = "interested",
        (sr = C = C || {}).OpenDropdown = "openDropdown",
        sr.CloseDropdown = "closeDropdown",
        sr.Apply = "apply";
        var X = ((Ra = {})[g.GameImpressions] = function(e) {
            e = x(e, []);
            return [{
                name: g.GameImpressions,
                type: g.GameImpressions,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: g.GameDetailReferral,
                type: g.GameDetailReferral,
                context: A
            }, te(_(((t = {})[R.AttributionId] = u(i.GameDetailReferral),
            t[R.HttpReferrer] = h(),
            t), e))]
        }
        ,
        Ra[g.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SortDetailReferral,
                type: g.SortDetailReferral,
                context: A
            }, te(_({}, e))]
        }
        ,
        Ra[g.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.NavigateToSortLink,
                type: g.NavigateToSortLink,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyInteraction,
                type: g.SurveyInteraction,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyImpression,
                type: g.SurveyImpression,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.InterestCatcherClick,
                type: g.InterestCatcherClick,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.FilterImpressions,
                type: g.FilterImpressions,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.GamesFilterClick,
                type: g.GamesFilterClick,
                context: N
            }, te(_({}, e))]
        }
        ,
        Ra[g.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: g.RequestRefundClick,
                type: g.RequestRefundClick,
                context: N
            }, te(((t = {})[R.PlaceId] = e.placeId,
            t))]
        }
        ,
        Ra)
          , ee = (new y.Intl).getDateTimeFormatter()
          , te = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return "object" == typeof n[t] && n[t] && (e[t] = JSON.stringify(n[t])),
                "number" == typeof n[t] && (e[t] = n[t]),
                "string" == typeof n[t] && (e[t] = encodeURIComponent(n[t])),
                "boolean" == typeof n[t] && (e[t] = n[t] ? 1 : 0),
                e
            }, {})
        }
          , ne = O.urlService.parseQueryString
          , re = O.numberFormat.getNumberFormat
          , oe = j
          , ie = function(e, t) {
            t = j(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , ae = function(e) {
            return -1 === e ? "--" : O.abbreviateNumber.getAbbreviatedValue(e)
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
                        [4, O.httpService.get(a.getExperimentationValues(i, r, Object.keys(o)))];
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
                        [4, O.httpService.post(s.url.getOmniRecommendations, t)];
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
                        return [4, O.httpService.post(s.url.getOmniRecommendationsMetadata, {
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
          , me = function(r) {
            return ue(void 0, void 0, Promise, function() {
                var t, n;
                return ce(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: y.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                            retryable: !0,
                            withCredentials: !0
                        },
                        n = {
                            userIds: r,
                            fields: ["names.combinedName", "names.username"]
                        },
                        [4, O.httpService.post(t, n)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ve = rs(9870)
          , he = rs.n(ve)
          , ge = ReactStyleGuide
          , ye = ge.Button.variants;
        function be(n, r) {
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
        (ot = function(e) {
            var t = e.errorMessage
              , n = e.onRefresh
              , e = e.className;
            return K().createElement("div", {
                "data-testid": "error-status",
                className: he()("game-error", e)
            }, K().createElement("span", {
                className: "icon-spot-error-2xl"
            }), K().createElement("p", {
                className: "text-label error-text"
            }, t), K().createElement(ge.Button, {
                className: "refresh-button",
                variant: ye.control,
                onClick: n
            }, K().createElement("span", {
                className: "icon-common-refresh"
            })))
        }
        ).defaultProps = {
            className: ""
        };
        var Ie, we, Se, Ee, Pe = ot, Ce = function() {
            var e = (0,
            Y.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = (e = be(function() {
                n(!0)
            }, 100))[0]
              , o = e[1]
              , i = (e = be(function() {
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
            Y.useMemo)(function() {
                return e.layoutDataBySort && t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
            }, [e.layoutDataBySort, e.defaultLayoutData, t])
        }, _e = HeaderScripts, xe = y.EnvironmentUrls.gamesApi, Ae = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: xe + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: xe + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: xe + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: xe + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: xe + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: xe + "/v1/games/sorts",
                    withCredentials: !0
                },
                getUniverseVoiceStatus: function(e) {
                    return {
                        withCredentials: !0,
                        url: y.EnvironmentUrls.voiceApi + "/v1/settings/universe/" + e
                    }
                },
                getVoiceOptInStatus: {
                    withCredentials: !0,
                    url: y.EnvironmentUrls.voiceApi + "/v1/settings/user-opt-in"
                },
                getAssetDataFromAssetId: function(e) {
                    return {
                        url: y.EnvironmentUrls.assetDeliveryApi + "/v2/assetId/" + e,
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
        }, Oe = function(n, r) {
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
        }, ke = Ae.defaultCacheCriteria, Re = E.dataStores.gamesDataStore, De = E.dataStores.userDataStoreV2, Le = (E.dataStores.localeDataStore,
        E.dataStores.userDataStore.FriendsUserSortType), Me = function() {
            return De.getFriends({
                userId: null === _e.authenticatedUser || void 0 === _e.authenticatedUser ? void 0 : _e.authenticatedUser.id,
                userSort: Le.StatusFrequents,
                isGuest: !1
            }, ke)
        }, Ue = function(t) {
            return Ne(void 0, void 0, Promise, function() {
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Re.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Fe = function(n) {
            return Ne(void 0, void 0, Promise, function() {
                var t;
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Re.getPlaceDetails([n])];
                    case 1:
                        return t = e.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                })
            })
        }, Be = function(e) {
            return O.httpService.get(Ae.url.getAssetDataFromAssetId(e)).then(function(e) {
                return e.data
            })
        };
        function je(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function Ge(e) {
            return e.isShimmerEnabled ? "shimmer-animation" : null
        }
        function He(e) {
            return e !== Ie.IMAGE_TOP_LEFT ? "" : "game-card-pill-top-left"
        }
        function ze(e) {
            var t = [];
            return (e = null === (e = null == e ? void 0 : e.tileBadgesByPosition) || void 0 === e ? void 0 : e.ImageTopLeft) && e.length && (t = e.map(function(e) {
                var t, n = {
                    id: e.analyticsId
                };
                return e.tileBadgeType === Ee.Text && e.text ? (n.text = e.text,
                n.animationClass = Ge(e)) : e.tileBadgeType === Ee.Icon && e.icons && (t = e.icons.map(je).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = Ge(e)),
                n
            })),
            t.length ? ((e = {})[Ie.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function Ve(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === Se.TextLabel ? e.footer : null
        }
        (it = Ie = Ie || {}).INVALID = "Invalid",
        it.IMAGE_TOP_LEFT = "ImageTopLeft",
        it.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (It = we = we || {}).Home = "Home",
        It.Games = "Games",
        (sr = {}).Invalid = "Invalid",
        sr.HasLootBoxes = "HasLootBoxes",
        sr.HasInGameTrading = "HasInGameTrading",
        sr.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        sr.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        sr.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        sr.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (Ra = {}).MorphToR6 = "MorphToR6",
        Ra.PlayerChoice = "PlayerChoice",
        Ra.MorphToR15 = "MorphToR15",
        (Se = Se || {}).TextLabel = "TextLabel",
        (re = Ee = Ee || {}).Text = "Text",
        re.Icon = "Icon";
        var We = RobloxThumbnails
          , qe = {
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
          , Je = {
            numGameCarouselLookAheadWindows: 3,
            adSortDiscoverId: 27,
            carouselContainerBufferWidth: 80,
            gameTileGutterWidth: 14,
            wideGameTileGutterWidth: 16,
            scrollerWidth: 30
        }
          , $e = {
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
          , Ke = -1
          , Ze = 5
          , Qe = qe
          , ee = Je
          , ve = $e
          , Xe = {
            ActionApply: "Action.Apply",
            LabelSponsoredAd: "Label.SponsoredAd",
            LabelNoSearchResults: "LabelNoSearchResults",
            LabelPlayingOnePlusUsersWithComma: "LabelPlayingOnePlusUsersWithComma",
            LabelPlayingOneUser: "LabelPlayingOneUser",
            LabelBy: "LabelCreatorBy",
            LabelByPrefix: "Label.By"
        }
          , et = {
            LabelApiError: "Label.ApiError",
            LabelGames: "Label.Games",
            LabelSponsoredAdsDisclosureStatic: "Label.SponsoredAdsDisclosureStatic"
        }
          , tt = {
            LabelDiscover: "Label.Discover",
            LabelCharts: "Label.Charts",
            LabelsHome: "Label.sHome",
            ActionClose: "Action.Close",
            ActionDropdownSelected: "Action.DropdownSelected",
            ActionDropdownNotSelected: "Action.DropdownNotSelected"
        }
          , nt = {
            ActionSeeAll: "Action.SeeAll",
            ActionInterestCatcherContinue: "Action.InterestCatcherContinue",
            ActionInterestCatcherContinueSelected: "Action.InterestCatcherContinueSelected",
            ActionInterestCatcherSkip: "Action.InterestCatcherSkip",
            ActionInterestCatcherInterested: "Action.InterestCatcherInterested"
        }
          , rt = {
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
          , ot = PropTypes
          , it = rs.n(ot)
          , at = "Label.ContextMenuTitle"
          , lt = "Action.ViewDetails"
          , st = "Action.JoinGame"
          , ut = {
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
        function ct(e) {
            var t = e.game
              , n = e.translate
              , r = t.universeId
              , o = t.name
              , e = t.referralUrl
              , t = t.isPlayable
              , r = K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameIcon,
                size: We.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: We.ThumbnailFormat.jpeg
            });
            return K().createElement("div", {
                className: "border-bottom player-interaction-container"
            }, K().createElement("span", {
                className: "cursor-pointer game-icon"
            }, K().createElement(ge.Link, {
                url: e,
                className: "game-card-link"
            }, r)), K().createElement("span", {
                className: "game-info-container"
            }, K().createElement(ge.Link, {
                url: e,
                className: "game-name"
            }, o), !t && K().createElement(ge.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(lt))))
        }
        ct.propTypes = {
            game: it().shape({
                universeId: it().number,
                placeId: it().number,
                name: it().string,
                playerCount: it().number,
                isShowSponsoredLabel: it().bool,
                nativeAdData: it().string,
                imageUrl: it().string,
                referralUrl: it().string,
                isPlayable: it().bool
            }).isRequired,
            translate: it().func.isRequired
        };
        var dt = ct;
        function ft(e) {
            var t = e.playerId
              , e = e.altName;
            return K().createElement("div", {
                className: "avatar-card-link"
            }, K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.avatarHeadshot,
                size: We.ThumbnailAvatarHeadshotSize.size48,
                targetId: t,
                imgClassName: "avatar-card-image",
                format: We.ThumbnailFormat.webp,
                altName: e
            }))
        }
        ft.defaultProps = {
            altName: ""
        },
        ft.propTypes = {
            playerId: it().number.isRequired,
            altName: it().string
        };
        var pt = ft;
        function mt(e) {
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
            return K().createElement("div", {
                className: "border-bottom player-info"
            }, K().createElement("span", {
                className: "player-name"
            }, t), K().createElement(ge.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , n = E.playGameService.buildPlayGameProperties(a, l, s, u)
                      , r = ut.joinGameInPlacesList
                      , o = ut.gamePlayIntentInPlacesList
                      , o = {
                        eventName: r.name,
                        ctx: r.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: o.ctx
                    };
                    E.playGameService.launchGame(n, o),
                    i(e)
                },
                isDisabled: !n
            }, r(st)))
        }
        mt.propTypes = {
            playerData: it().shape({
                presence: it().shape({
                    rootPlaceId: it().number,
                    placeId: it().number,
                    gameId: it().string
                }),
                id: it().number,
                nameForDisplay: it().string
            }).isRequired,
            dismissModal: it().func.isRequired,
            isPlayable: it().bool.isRequired,
            translate: it().func.isRequired
        };
        var vt = mt;
        function ht(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , o = e.dismissModal
              , i = e.isPlayable
              , a = e.translate
              , l = {};
            return t.forEach(function(e) {
                l[e.id] = e
            }),
            K().createElement("div", {
                className: "interaction-container"
            }, K().createElement("ul", {
                className: "interaction-list"
            }, n.map(function(e, t) {
                var n = e + t
                  , r = l[e]
                  , t = r.id
                  , e = r.nameForDisplay;
                return K().createElement("li", {
                    key: n,
                    className: "interaction-item",
                    "aria-hidden": "true"
                }, K().createElement("span", {
                    className: "avatar avatar-headshot avatar-headshot-sm player-avatar"
                }, K().createElement(pt, {
                    playerId: t,
                    altName: e
                })), K().createElement(vt, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        ht.propTypes = {
            friendsData: it().arrayOf(it().shape({
                presense: it().shape({
                    rootPlaceId: it().number,
                    placeId: it().number,
                    gameId: it().string
                }),
                id: it().number,
                nameForDisplay: it().string
            })).isRequired,
            friendsInGame: it().arrayOf(it().number).isRequired,
            dismissModal: it().func.isRequired,
            isPlayable: it().bool.isRequired,
            translate: it().func.isRequired
        };
        var gt = ht;
        function yt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(at);
            return K().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, K().createElement(ge.Modal.Header, {
                title: e,
                onClose: o
            }), K().createElement(dt, {
                game: r,
                translate: i
            }), K().createElement(gt, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        yt.propTypes = {
            friendsData: it().arrayOf(it().shape({
                presense: it().shape({
                    rootPlaceId: it().number,
                    placeId: it().number,
                    gameId: it().string
                }),
                id: it().number,
                nameForDisplay: it().string
            })).isRequired,
            friendsInGame: it().arrayOf(it().number).isRequired,
            game: it().shape({
                universeId: it().number,
                placeId: it().number,
                name: it().string,
                playerCount: it().number,
                isShowSponsoredLabel: it().bool,
                nativeAdData: it().string,
                imageUrl: it().string,
                referralUrl: it().string,
                isPlayable: it().bool
            }).isRequired,
            dismissModal: it().func.isRequired,
            translate: it().func.isRequired
        };
        var bt = yt
          , It = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (sr = function(e) {
            var t = e.tooltipText
              , e = e.sizeInPx
              , e = void 0 === e ? 16 : e;
            return K().createElement("span", {
                className: "info-tooltip-container"
            }, K().createElement(ge.Tooltip, {
                id: "games-info-tooltip",
                placement: "right",
                containerClassName: "games-info-tooltip",
                content: t
            }, K().createElement("svg", {
                width: e,
                height: e,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, K().createElement("path", {
                d: "M8.97 5.44H7V4H8.97V5.44Z",
                fill: "currentColor"
            }), K().createElement("path", {
                d: "M8.94347 11.9999H7.05347V6.37988H8.94347V11.9999Z",
                fill: "currentColor"
            }), K().createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",
                fill: "currentColor"
            }))))
        }
        ).defaultProps = {
            sizeInPx: 16
        };
        var wt = sr
          , St = function() {
            return (St = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Et = ((Ra = {})[$.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ra[$.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        Ra[$.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ra[$.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        Ra[$.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        Ra)
          , Pt = St(St({}, Et), ((re = {})[$.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        re))
          , Ct = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function Tt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return K().createElement(Y.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && K().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + He(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return K().createElement(At, {
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
        function _t(e) {
            return e = e.playerCount,
            e = ae(e),
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-player-count"
            }, K().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), K().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function xt(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = he()("game-card-image-pill", {
                "hover-only": e === D.Hover
            });
            return K().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, K().createElement(_t, {
                playerCount: t
            }))
        }
        (ot = function(e) {
            var t = e.animationClass
              , n = e.isFocused
              , r = e.icons
              , o = e.text;
            return null != r && r.length || o ? K().createElement("div", {
                className: "game-card-pill-with-animation"
            }, K().createElement("div", {
                className: he()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
                e))
            }, (null == r ? void 0 : r.length) && r.map(function(e, t) {
                return K().createElement("span", {
                    key: t,
                    className: "game-card-pill-icon " + e
                })
            }), o && K().createElement("div", {
                className: "game-card-pill-text"
            }, o))) : null
        }
        ).defaultProps = {
            animation: void 0
        };
        var At = ot;
        function Nt(e) {
            return e = e.featureTypes,
            K().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, e.map(function(e) {
                return Ot[e] && K().createElement("span", {
                    key: e,
                    className: Ot[e]
                })
            })))
        }
        xt.defaultProps = {
            playerCountStyle: void 0
        };
        var Ot = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        };
        function kt(e) {
            var t = e.id
              , n = e.children
              , r = e.gameData
              , o = e.isOnScreen
              , i = e.page
              , a = e.buildEventProperties
              , l = e.isFocused
              , s = e.topicId
              , e = We.ThumbnailGameIconSize.size256
              , s = Te(r, s);
            return K().createElement(ge.Link, {
                url: F(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, K().createElement(Rt, {
                gameLayoutData: s,
                isFocused: !!l
            }), i === Z.GamesPage ? K().createElement("div", {
                className: "game-card-thumb-container"
            }, K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: We.ThumbnailFormat.jpeg,
                altName: r.name
            })) : K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: We.ThumbnailFormat.jpeg,
                altName: r.name
            }), K().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        }
        (sr = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = ze(t);
            return e ? K().createElement(Tt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? K().createElement(Nt, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== D.Always && n !== D.Hover ? null : K().createElement(xt, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Rt = sr
          , Dt = function() {
            return (Dt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Lt = $e.keyBoardEventCode
          , Mt = $e.numberOfInGameAvatarIcons
          , Ut = $e.numberOfInGameNames;
        function Ft(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , e = e.playerCount
              , t = ie(n, t)
              , e = ae(e);
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats"
            }, K().createElement("span", {
                className: "info-label icon-votes-gray"
            }), t ? K().createElement("span", {
                className: "info-label vote-percentage-label"
            }, t) : K().createElement("span", {
                className: "info-label no-vote"
            }), K().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), K().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function Bt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = $e.RatingPercentageText
              , t = (null == (t = oe(n, t)) ? void 0 : t.toString()) || "--";
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-rating"
            }, K().createElement("span", {
                className: "info-label icon-votes-gray"
            }), K().createElement("span", {
                className: "info-label vote-percentage-label"
            }, r(e, {
                percentRating: t
            }) || t + "% Rating"))
        }
        function jt(e) {
            return e = e.footerData,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, K().createElement("span", {
                className: "info-label"
            }, e.text.textLiteral))
        }
        function Gt(e) {
            var t = e.iconClassName
              , e = e.text;
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, K().createElement("span", {
                className: he()("info-label", t)
            }), K().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e))
        }
        function Ht(e) {
            return e = e.footerText,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, K().createElement("span", {
                className: "info-label"
            }, e))
        }
        function zt(e) {
            return e = e.translate,
            K().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, K().createElement("div", {
                className: "native-ad-label"
            }, e(Xe.LabelSponsoredAd), K().createElement(wt, {
                tooltipText: e(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            })))
        }
        function Vt(e) {
            return e = e.user,
            K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.avatarHeadshot,
                size: We.ThumbnailAvatarHeadshotSize.size48,
                targetId: e.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: We.ThumbnailFormat.webp,
                altName: e.displayName
            })
        }
        function Wt(e) {
            return e = e.translate,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, K().createElement(wt, {
                tooltipText: e(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            }), K().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(Xe.LabelSponsoredAd)))
        }
        function qt(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = $e.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Mt ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? Mt - 1 : Mt
              , o = he()("avatar-card", {
                "avatar-card-online": n
            });
            return K().createElement("div", {
                className: "info-avatar"
            }, r && K().createElement("div", {
                className: o
            }, K().createElement("div", {
                className: "avatar-count-container"
            }, K().createElement("span", {
                className: "avatar-count info-label"
            }, r))), t.slice(0, e).map(function(e) {
                return K().createElement("div", {
                    className: o,
                    key: e.displayName
                }, K().createElement(Vt, {
                    user: e
                }))
            }))
        }
        function Jt(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, K().createElement(qt, {
                friendsData: t,
                isOnline: e
            }), K().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function $t(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            Y.useState)(!1)
              , e = o[0]
              , i = o[1];
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return K().createElement("div", {
                className: "game-card-friend-info game-card-info",
                "data-testid": "game-tile-stats-friends"
            }, K().createElement("div", {
                className: "info-avatar",
                style: {
                    width: 22 * (t.slice(0, Mt).length - 1) + 32 + "px"
                }
            }, t.slice(0, Mt).map(function(e) {
                return K().createElement("div", {
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
                        e.code === Lt.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        i(!0))
                    }
                }, K().createElement(Vt, {
                    user: e
                }))
            })), r && K().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Ut ? r(Xe.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Ut
            }) : r(Xe.LabelPlayingOneUser, {
                user: t[0].displayName
            })), K().createElement(Yt, {
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
        kt.defaultProps = {
            page: Z.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        $t.defaultProps = {
            translate: void 0
        };
        var Yt = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , e = e.translate;
            return K().createElement(ge.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, K().createElement(bt, {
                friendsData: r.map(function(e) {
                    return Dt(Dt({}, e), {
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
        }, It)
          , Kt = function(e, a, l, s) {
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
          , Zt = function(n, r) {
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
        (Ra = (0,
        Y.forwardRef)(function(e, t) {
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
            Y.useState)()
              , v = l[0]
              , h = l[1]
              , u = Ce()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            Y.useMemo)(function() {
                return B(c, o.universeId)
            }, [c, o.universeId])
              , y = Te(o, d);
            (0,
            Y.useEffect)(function() {
                void 0 === v && 0 < g.length && Kt(void 0, void 0, void 0, function() {
                    var t;
                    return Zt(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Fe(o.placeId.toString())];
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
            return K().createElement("div", {
                ref: t,
                className: s,
                "data-testid": "game-tile",
                onMouseOver: l,
                onMouseLeave: u,
                onFocus: l,
                onBlur: u
            }, K().createElement(kt, {
                id: n,
                isOnScreen: i,
                buildEventProperties: r,
                gameData: o,
                page: a,
                isFocused: e,
                topicId: d
            }, function() {
                if (!f)
                    return K().createElement(K().Fragment, null);
                if (null != o && o.isShowSponsoredLabel || null != o && o.isSponsored && p)
                    return K().createElement(zt, {
                        translate: m
                    });
                var e = Ve(y);
                return e ? K().createElement(jt, {
                    footerData: e
                }) : 0 < g.length && v ? K().createElement($t, {
                    friendData: g,
                    gameData: v
                }) : null != o && o.friendActivityTitle ? K().createElement(Ht, {
                    footerText: o.friendActivityTitle
                }) : K().createElement(Ft, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var Qt = Ra;
        (re = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = (0,
            Y.useState)(void 0)
              , a = i[0]
              , l = i[1]
              , e = (0,
            Y.useState)(void 0)
              , i = e[0]
              , s = e[1];
            if ((0,
            Y.useEffect)(function() {
                Fe(t).then(function(e) {
                    return l(e)
                }).catch(function() {
                    s(!0)
                })
            }, [t]),
            void 0 === a && !i)
                return K().createElement(en, null);
            r = he()(r, "btn-full-width");
            return K().createElement(K().Fragment, null, K().createElement(ge.Link, {
                "data-testid": "hover-tile-purchase-button",
                className: r,
                url: n || (null == a ? void 0 : a.url)
            }, K().createElement("span", {
                className: o
            }), K().createElement("span", {
                className: "btn-text"
            }, (null == a ? void 0 : a.price) || "--"), " "))
        }
        ).defaultProps = {
            clientReferralUrl: ""
        };
        var Xt = re
          , en = function() {
            return K().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function tn(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            Y.useMemo)(function() {
                return H(t, n)
            }, [t, n])
              , e = (0,
            Y.useMemo)(function() {
                return r === $.EventTile ? We.ThumbnailGameThumbnailSize.width576 : We.ThumbnailGameThumbnailSize.width384
            }, [r]);
            return null !== o ? K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.assetThumbnail,
                size: e,
                targetId: o,
                containerClass: "brief-game-icon",
                format: We.ThumbnailFormat.jpeg,
                altName: t.name
            }) : K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameThumbnail,
                size: e,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: We.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
        function nn(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , e = e.children;
            return n ? K().createElement(ge.Link, {
                url: o,
                className: t,
                tabIndex: r ? 0 : -1
            }, e) : K().createElement("span", {
                className: t
            }, e)
        }
        (ot = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.buttonClassName
              , i = e.purchaseIconClassName
              , a = e.clientReferralUrl
              , l = e.shouldPurchaseNavigateToDetails
              , e = y.PlayButton.usePlayabilityStatus
              , s = y.PlayButton.PlayabilityStatuses
              , u = y.PlayButton.PlayButton
              , c = y.PlayButton.PurchaseButton
              , e = e(t)
              , d = e[0]
              , f = e[1];
            switch (d) {
            case void 0:
            case s.GuestProhibited:
            case s.Playable:
                return K().createElement(u, {
                    universeId: t,
                    placeId: n,
                    status: null != d ? d : s.Playable,
                    eventProperties: r,
                    buttonClassName: o ? he()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case s.PurchaseRequired:
                return l ? K().createElement(Xt, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: he()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
                }) : K().createElement(c, {
                    universeId: t,
                    placeId: n,
                    iconClassName: null != i ? i : "icon-common-play",
                    refetchPlayabilityStatus: f,
                    buttonClassName: o
                });
            case s.UniverseRootPlaceIsPrivate:
                return K().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, K().createElement("span", {
                    className: "icon-status-private"
                }));
            default:
                return K().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, K().createElement("span", {
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
        var rn = ot;
        (sr = K().forwardRef(function(e, t) {
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
              , E = r === Qe.maxWideGameTilesPerCarouselPage - 1
              , P = Ce()
              , C = P[0]
              , T = P[1]
              , _ = P[2]
              , i = (0,
            Y.useState)(n.placeId)
              , x = i[0]
              , A = i[1];
            (0,
            Y.useEffect)(function() {
                u && !Number.isNaN(u) ? A(parseInt(u, 10)) : n.navigationUid && Ue(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && A(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function N() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== $.EventTile ? K().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, K().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            Y.useMemo)(function() {
                return F(x, n.name, o(n, r))
            }, [n, o, r, x])
              , v = o(n, r)
              , O = (0,
            Y.useMemo)(function() {
                return B(a, n.universeId)
            }, [a, n.universeId])
              , k = (0,
            Y.useMemo)(function() {
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
              , R = Te(n, m)
              , g = function() {
                return (f !== $.GridTile || s !== L.Disabled) && ((f !== $.EventTile || s === L.Enabled) && f !== $.InterestTile)
            }
              , b = (0,
            Y.useMemo)(function() {
                return null != R && R.title ? R.title : n.name
            }, [n.name, null == R ? void 0 : R.title])
              , e = f !== $.InterestTile
              , P = f !== $.InterestTile
              , i = (0,
            Y.useCallback)(function() {
                I && I()
            }, [I]);
            return K().createElement("li", {
                className: he()("list-item", "hover-game-tile", {
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
                onMouseOver: P ? T : void 0,
                onMouseLeave: P ? _ : void 0,
                onFocus: P ? T : void 0,
                onBlur: P ? _ : void 0,
                id: n.universeId.toString()
            }, n.universeId && K().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, K().createElement(nn, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: h,
                linkUrl: c
            }, K().createElement("div", {
                className: "featured-game-icon-container"
            }, K().createElement(tn, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), K().createElement(Rt, {
                gameLayoutData: R,
                playerCountStyle: l,
                playerCount: n.playerCount,
                isFocused: C
            })), K().createElement("div", {
                className: "info-container"
            }, K().createElement("div", {
                className: "info-metadata-container"
            }, K().createElement("div", {
                className: "game-card-name game-name-title",
                "data-testid": "game-tile-game-title",
                title: b
            }, b), K().createElement("div", {
                className: "wide-game-tile-metadata"
            }, K().createElement("div", {
                className: "base-metadata"
            }, function() {
                var e = N();
                if (C && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return K().createElement(Wt, {
                        translate: w
                    });
                e = Ve(R);
                return e ? K().createElement(jt, {
                    footerData: e
                }) : 0 < (null == O ? void 0 : O.length) ? K().createElement(Jt, {
                    friendsData: O,
                    isOnline: !0
                }) : 0 < (null == k ? void 0 : k.length) ? K().createElement(Jt, {
                    friendsData: k,
                    isOnline: !1
                }) : n.friendVisitedString ? K().createElement(Gt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === D.Footer ? K().createElement(Ft, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : K().createElement(Bt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: w
                })
            }()), K().createElement("div", {
                className: "hover-metadata"
            }, N()))), C && p === M.imageOverlay && g() && K().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, K().createElement(rn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })))), C && p !== M.imageOverlay && g() && K().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, K().createElement(rn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === $.InterestTile && K().createElement(ge.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                title: w(nt.ActionInterestCatcherInterested),
                onClick: i
            }, y ? K().createElement("span", {
                className: "icon-heart-red"
            }) : K().createElement("span", {
                className: "icon-heart"
            }), K().createElement("span", null, w(nt.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var on = sr
          , an = function() {
            return (an = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ln = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (Ra = (0,
        Y.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = ln(e, ["componentType"]);
            switch (n) {
            case $.AppGameTileNoMetadata:
                return K().createElement(Qt, an({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case $.GridTile:
            case $.EventTile:
            case $.InterestTile:
                return K().createElement(on, an({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return K().createElement(Qt, an({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var sn = Ra
          , un = (0,
        Y.forwardRef)(function(e, t) {
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
              , p = he()("game-carousel", {
                "wide-game-tile-carousel": a === $.GridTile || a === $.EventTile
            }, {
                "expand-home-content": p
            }, {
                "expand-home-content-disabled": !p
            });
            return K().createElement("div", {
                "data-testid": "game-carousel",
                ref: t,
                className: p
            }, n.map(function(e, t) {
                return K().createElement(sn, {
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
        function cn(e) {
            var t = e.children
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && ne(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            Y.useState)(e && "string" == typeof e ? e : O.uuidService.generateRandomUuid())[0];
            return K().createElement(vn.Provider, {
                value: e
            }, t)
        }
        function dn() {
            return (0,
            Y.useContext)(vn)
        }
        function fn(e) {
            var n = e.defaultSubtitle
              , t = e.endTimestamp
              , r = e.countdownString
              , o = e.formatSubtitleLink
              , i = e.subtitleLink
              , a = e.handleSeeAllLinkClick
              , l = e.backgroundImageAssetId
              , s = (0,
            Y.useMemo)(function() {
                var e = t && parseInt(t, 10);
                if (e || 0 === e)
                    return e
            }, [t])
              , u = (e = (0,
            Y.useState)(void 0 !== s ? s - Math.floor(Date.now() / 1e3) : void 0))[0]
              , c = e[1];
            (0,
            Y.useEffect)(function() {
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
            Y.useMemo)(function() {
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
            Y.useMemo)(function() {
                if (o && i && d) {
                    var e = d.indexOf(hn)
                      , t = d.indexOf(gn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + hn.length, t)
                          , t = d.slice(t + gn.length);
                        return K().createElement(ge.Link, {
                            url: i,
                            onClick: a
                        }, n, K().createElement("span", {
                            className: "link-text"
                        }, e), t, l ? K().createElement("span", {
                            className: "icon-chevron-right-dark"
                        }) : K().createElement("span", {
                            className: "icon-chevron-right"
                        }))
                    }
                }
                return d
            }, [d, i, l, a]);
            return d ? K().createElement("div", {
                className: "sort-subtitle-container"
            }, K().createElement("span", {
                className: "font-sort-subtitle text-default"
            }, e)) : null
        }
        un.displayName = "GameCarousel";
        var pn = function(t, e, n) {
            var r = (0,
            Y.useState)(new Set)
              , o = r[0]
              , i = r[1]
              , r = (0,
            Y.useState)(new Set)
              , a = r[0]
              , l = r[1]
              , s = (0,
            Y.useRef)(null)
              , u = (0,
            Y.useRef)(n);
            (0,
            Y.useEffect)(function() {
                u.current = n
            }, [n]);
            var c = (0,
            Y.useCallback)(function() {
                le(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), $e.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = u.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = X.gameImpressions(t),
                    E.eventStreamService.sendEvent.apply(E.eventStreamService, t),
                    i(function(e) {
                        var t = e;
                        return n.forEach(function(e) {
                            return t.add(e)
                        }),
                        t
                    }))
                })
            }, [o, a])
              , r = be(function() {
                return c()
            })
              , d = r[0]
              , f = r[1];
            (0,
            Y.useEffect)(function() {
                var e, i = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return s.current = E.elementVisibilityService.observeChildrenVisibility({
                    elements: i,
                    threshold: $e.gameImpressionsIntersectionThreshold
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
          , mn = function() {
            return (mn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , vn = (0,
        Y.createContext)("")
          , hn = qe.linkStartDelimiter
          , gn = qe.linkEndDelimiter;
        function yn(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            Y.useState)("")
              , e = r[0]
              , o = r[1];
            return (0,
            Y.useEffect)(function() {
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
            K().createElement("div", {
                className: he()(["game-sort-carousel-wrapper", {
                    "game-sort-with-mural": !!n,
                    "game-sort-mural-loaded": !!e
                }])
            }, e && K().createElement("div", {
                className: "game-sort-mural-wrapper"
            }, K().createElement("img", {
                className: "game-sort-mural",
                alt: "",
                src: e
            }), K().createElement("div", {
                className: "game-sort-mural-gradient"
            })), t)
        }
        function bn(e) {
            var t = e.scrollClassNames
              , n = e.scrollIconClassName
              , r = e.scroll
              , o = e.isDisabled
              , e = e.isNewScrollArrowsEnabled;
            return K().createElement("div", {
                "data-testid": "game-carousel-scroll-bar",
                className: t,
                onClick: r,
                "aria-disabled": o,
                onKeyDown: function(e) {
                    e.code === wn.enter && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, e ? K().createElement("span", {
                className: n
            }) : K().createElement(K().Fragment, null, K().createElement("div", {
                className: "arrow"
            }, K().createElement("span", {
                className: n
            })), K().createElement("div", {
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
            Y.useMemo)(function() {
                return u || (s ? v(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, v])
              , g = (0,
            Y.useMemo)(function() {
                return v(a ? rt.LabelLearnMore : nt.ActionSeeAll)
            }, [a, v])
              , e = (0,
            Y.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = X.navigateToSortLink(e),
                E.eventStreamService.sendEvent.apply(E.eventStreamService, e))
            }, [a, l]);
            return K().createElement("div", {
                className: "game-sort-header-container"
            }, K().createElement("div", {
                className: c
            }, K().createElement("h2", {
                className: "sort-header"
            }, d ? K().createElement("span", null, t) : K().createElement(ge.Link, {
                url: r
            }, t), h && K().createElement(wt, {
                tooltipText: h
            })), !d && K().createElement(ge.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, g)), K().createElement(fn, {
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
        var In = re
          , wn = $e.keyBoardEventCode;
        function Sn(e) {
            var t = e.distance
              , n = e.scrollAreaSize
              , r = e.direction
              , o = e.startingPosition
              , i = e.currentPage
              , a = e.pageSession
              , l = e.gameSetTypeId
              , s = e.gameSetTargetId
              , u = e.sortPosition
              , e = ((e = {})[R.StartPos] = o,
            e[R.Distance] = t,
            e[R.Direction] = r,
            e[R.PageSession] = a,
            e[R.GameSetTypeId] = l,
            e[R.GameSetTargetId] = s,
            e[R.SortPos] = u,
            e[R.ScrollDepth] = t / n,
            e[R.StartDepth] = o / n,
            e[R.ScreenSizeX] = window.innerWidth,
            e[R.ScreenSizeY] = window.innerHeight,
            e[R.ScrollAreaSize] = n,
            e);
            y.EventStream.SendEventWithTarget(g.FeedScroll, i, e, y.EventStream.TargetTypes.WWW)
        }
        function En(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            Y.useRef)(t)
              , s = dn()
              , u = (0,
            Y.useMemo)(function() {
                return be(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    Sn({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: b.Horizontal,
                        gameSetTypeId: r,
                        gameSetTargetId: o,
                        sortPosition: i,
                        pageSession: s
                    }),
                    l.current = e)
                }, 250)[0]
            }, [n, r, o, i, s]);
            (0,
            Y.useEffect)(function() {
                u(t)
            }, [u, t])
        }
        function Pn(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = Dn({}, t),
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
        function Cn(e) {
            return "recommendationList"in e
        }
        function Tn(e) {
            return "games"in e
        }
        function _n(e) {
            return "filters"in e
        }
        function xn(e, t) {
            return "recommendationList"in e ? Pn(e.recommendationList, t) : Tn(e) ? e.games : []
        }
        function An(e) {
            if (e && Tn(e))
                return e.gameSetTargetId
        }
        function Nn(e) {
            var t = An(e);
            return void 0 !== t ? ((e = {})[R.GameSetTargetId] = t,
            e) : {}
        }
        function On(e) {
            if (e = e.find(_n)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function kn(e) {
            var t;
            return e && Tn(e) && e.appliedFilters ? ((t = {})[R.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (ot = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , t = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? K().createElement(K().Fragment, null, !r && K().createElement(bn, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && K().createElement(bn, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: t,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : K().createElement(K().Fragment, null, n && r ? null : K().createElement(bn, {
                scrollClassNames: he()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), K().createElement(bn, {
                scrollClassNames: he()("scroller", "next", {
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
        var Rn = ot
          , Dn = function() {
            return (Dn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ln = "undefined" != typeof Map ? Map : (Object.defineProperty(Un.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Un.prototype.get = function(e) {
            e = Mn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Un.prototype.set = function(e, t) {
            var n = Mn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Un.prototype.delete = function(e) {
            var t = this.__entries__
              , e = Mn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Un.prototype.has = function(e) {
            return !!~Mn(this.__entries__, e)
        }
        ,
        Un.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Un.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        Un);
        function Mn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function Un() {
            this.__entries__ = []
        }
        var Fn = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , Bn = void 0 !== rs.g && rs.g.Math === Math ? rs.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , jn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Bn) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , Gn = 2
          , Hn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , zn = "undefined" != typeof MutationObserver
          , Vn = (Wn.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        Wn.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        Wn.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        Wn.prototype.updateObservers_ = function() {
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
        Wn.prototype.connect_ = function() {
            Fn && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            zn ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
        Wn.prototype.disconnect_ = function() {
            Fn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        Wn.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Hn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        Wn.getInstance = function() {
            return this.instance_ || (this.instance_ = new Wn),
            this.instance_
        }
        ,
        Wn.instance_ = null,
        Wn);
        function Wn() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                jn(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < Gn)
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
        var qn = function(e, t) {
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
          , Jn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Bn
        }
          , $n = er(0, 0, 0, 0);
        function Yn(e) {
            return parseFloat(e) || 0
        }
        function Kn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Yn(n["border-" + t + "-width"])
            }, 0)
        }
        function Zn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return $n;
            var r = Jn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Yn(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Yn(r.width)
              , s = Yn(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Kn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Kn(r, "top", "bottom") + a)),
            (e = e) !== Jn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            er(o.left, o.top, l, s)
        }
        var Qn = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Jn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Jn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function Xn(e) {
            return Fn ? Qn(e) ? er(0, 0, (t = (t = e).getBBox()).width, t.height) : Zn(e) : $n;
            var t
        }
        function er(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var tr = (nr.prototype.isActive = function() {
            var e = Xn(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        nr.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        nr);
        function nr(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = er(0, 0, 0, 0),
            this.target = e
        }
        var rr = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            qn(i, {
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
            qn(this, {
                target: e,
                contentRect: i
            })
        }
          , or = (ir.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Jn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new tr(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        ir.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Jn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e),
                t.size || this.controller_.removeObserver(this))
            }
        }
        ,
        ir.prototype.disconnect = function() {
            this.clearActive(),
            this.observations_.clear(),
            this.controller_.removeObserver(this)
        }
        ,
        ir.prototype.gatherActive = function() {
            var t = this;
            this.clearActive(),
            this.observations_.forEach(function(e) {
                e.isActive() && t.activeObservations_.push(e)
            })
        }
        ,
        ir.prototype.broadcastActive = function() {
            var e, t;
            this.hasActive() && (e = this.callbackCtx_,
            t = this.activeObservations_.map(function(e) {
                return new rr(e.target,e.broadcastRect())
            }),
            this.callback_.call(e, t, e),
            this.clearActive())
        }
        ,
        ir.prototype.clearActive = function() {
            this.activeObservations_.splice(0)
        }
        ,
        ir.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length
        }
        ,
        ir);
        function ir(e, t, n) {
            if (this.activeObservations_ = [],
            this.observations_ = new Ln,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var ar = new ("undefined" != typeof WeakMap ? WeakMap : Ln)
          , lr = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = Vn.getInstance()
              , n = new or(t,n,this);
            ar.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            lr.prototype[t] = function() {
                var e;
                return (e = ar.get(this))[t].apply(e, arguments)
            }
        });
        var sr = void 0 !== Bn.ResizeObserver ? Bn.ResizeObserver : lr
          , ur = null !== (Ra = window.ResizeObserver) && void 0 !== Ra ? Ra : sr
          , cr = function() {
            var e = (0,
            Y.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            Y.useCallback)(function(e) {
                e = null === (e = null == e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                void 0 !== e && n(e)
            }, [])
              , e = (0,
            Y.useCallback)(function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }, [r])
              , o = (0,
            Y.useRef)(new ur(e))
              , e = (0,
            Y.useCallback)(function(e) {
                e && null != o && o.current && (r(e),
                o.current.disconnect(),
                o.current.observe(e))
            }, [r]);
            return (0,
            Y.useEffect)(function() {
                return function() {
                    null != o && o.current && o.current.disconnect()
                }
            }, []),
            [e, t]
        }
          , dr = ee.numGameCarouselLookAheadWindows
          , fr = ee.gameTileGutterWidth
          , pr = ee.wideGameTileGutterWidth
          , mr = ee.scrollerWidth
          , vr = ve.wideTileHoverGrowWidthPx;
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
            Y.useRef)(null)
              , C = (0,
            Y.useState)(0)
              , T = C[0]
              , _ = C[1]
              , x = (0,
            Y.useState)(!1)
              , A = x[0]
              , N = x[1]
              , e = (0,
            Y.useState)(!0)
              , O = e[0]
              , k = e[1]
              , C = (0,
            Y.useState)(!0)
              , R = C[0]
              , D = C[1]
              , x = (0,
            Y.useState)(0)
              , L = x[0]
              , M = x[1]
              , U = (0,
            Y.useMemo)(function() {
                return u === $.GridTile || u === $.EventTile
            }, [u])
              , F = (0,
            Y.useMemo)(function() {
                return U ? pr : fr
            }, [U])
              , e = cr()
              , C = e[0]
              , B = e[1]
              , x = cr()
              , e = x[0]
              , j = x[1]
              , G = (0,
            Y.useMemo)(function() {
                if (U && f)
                    return f;
                var e = null === (e = null === (e = null == P ? void 0 : P.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== j && void 0 !== e ? Math.max(1, Math.floor((j + F) / (e + F))) : 0
            }, [j, F, f, U]);
            (0,
            Y.useEffect)(function() {
                k(0 <= L),
                s || void 0 !== j && void 0 !== B && Math.abs(L) + j + vr >= B ? D(!0) : D(!1)
            }, [L, j, B, null == t ? void 0 : t.length, s]);
            var H = (0,
            Y.useCallback)(function() {
                T + dr * G >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [T, G, l, s, null == t ? void 0 : t.length])
              , z = (0,
            Y.useCallback)(function() {
                var e = null === (e = null === (e = null == P ? void 0 : P.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(G) * (e + F)
            }, [G, F])
              , V = (0,
            Y.useCallback)(function() {
                var t;
                O || (t = z(),
                M(function(e) {
                    return Math.min(e + t, 0)
                }),
                _(function(e) {
                    return e - G
                }))
            }, [z, O, G])
              , W = (0,
            Y.useCallback)(function() {
                var n;
                R || (n = z(),
                M(function(e) {
                    if (b && o === Z.HomePage)
                        return void 0 !== B && void 0 !== j ? Math.max(e - n, -1 * (B - j)) : e - n;
                    if (void 0 === B)
                        return e - n;
                    var t = w && O ? mr : 0;
                    return Math.max(e - n, -1 * B) + t
                }),
                _(function(e) {
                    return e + G
                }),
                H())
            }, [R, z, H, b, o, B, j, w, O, G])
              , q = (0,
            Y.useCallback)(function(e) {
                return T <= e && e < T + G
            }, [T, G])
              , J = (0,
            Y.useCallback)(function(e) {
                A || (N(!0),
                e(),
                setTimeout(function() {
                    N(!1)
                }, 200))
            }, [A])
              , x = (0,
            Y.useRef)(null);
            En({
                scrollPosition: -L,
                page: o,
                gameSetTypeId: S,
                gameSetTargetId: An(n),
                wrapperRef: x,
                sortPosition: r
            });
            r = (0,
            Y.useMemo)(function() {
                return he()({
                    "hlist games game-cards game-tile-list": !U,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": U,
                    "games-page-carousel": o === Z.GamesPage,
                    "home-page-carousel": o === Z.HomePage
                })
            }, [U, o]);
            return K().createElement("div", {
                "data-testid": "game-carousel",
                ref: x,
                className: he()("horizontal-scroller games-list", {
                    "home-page-games-list": o === Z.HomePage,
                    "wide-game-tile-list": U,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, K().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, K().createElement("div", {
                ref: C,
                className: "horizontally-scrollable",
                style: {
                    left: L + "px"
                }
            }, K().createElement("ul", {
                ref: i,
                className: r
            }, t.map(function(e, t) {
                return U ? K().createElement(sn, {
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
                }) : K().createElement("li", {
                    key: e.universeId,
                    className: "list-item game-card game-tile"
                }, K().createElement(sn, {
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
            }))), K().createElement(Rn, {
                hideScrollBackWhenDisabled: w,
                isScrollBackDisabled: O,
                isScrollForwardDisabled: R,
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
        var hr = re
          , gr = function() {
            return (gr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (ot = function(e) {
            function t(e, t) {
                var n = {};
                return n[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = l,
                n[R.NumberOfLoadedTiles] = (i || []).length,
                n[R.GameSetTypeId] = a.topicId,
                n[R.Page] = Z.HomePage,
                n[U.HomePageSessionInfo] = _,
                n[R.PlayContext] = Z.HomePage,
                n
            }
            var n, r = e.translate, o = e.friendsPresence, i = e.gameData, a = e.sort, l = e.positionId, s = e.componentType, u = e.playerCountStyle, c = e.playButtonStyle, d = e.hoverStyle, f = e.tooltipInfoText, p = e.hideSeeAll, m = e.navigationRootPlaceId, v = e.isSponsoredFooterAllowed, h = e.seeAllLinkPath, g = e.subtitleLinkPath, y = e.itemsPerRow, b = e.startingRow, I = e.endTimestamp, w = e.countdownString, S = e.isExpandHomeContentEnabled, E = e.isCarouselHorizontalScrollEnabled, P = e.isNewScrollArrowsEnabled, C = (0,
            Y.useRef)(null), T = (0,
            Y.useRef)(null), _ = dn(), x = (0,
            Y.useCallback)(function(e) {
                if (void 0 !== i && void 0 !== b) {
                    var t = e.filter(function(e) {
                        return e < (null == i ? void 0 : i.length)
                    });
                    return gr(gr(gr(gr(gr(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return i[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return i[e].universeId
                    }),
                    e), z(i, a.topicId, t, s)), W(i, a.topicId, t, s)), G(i, t)), q(b, null == i ? void 0 : i.length, null == i ? void 0 : i.length, t)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = i[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e[R.SortPos] = l,
                    e[R.GameSetTypeId] = a.topicId,
                    e[R.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = _,
                    e))
                }
            }, [i, _, l, a.topicId, s, b]);
            pn(C, i.length, x),
            (0,
            Y.useEffect)(function() {
                S && y && null != C && C.current && C.current.style.setProperty("--items-per-row", y.toString())
            }, [S, y]);
            var A = (0,
            Y.useMemo)(function() {
                return h ? O.urlService.getAbsoluteUrl(h) : k(a.topic, Z.HomePage, {
                    position: l,
                    sortId: a.topicId,
                    page: Z.HomePage,
                    treatmentType: a.treatmentType,
                    homePageSessionInfo: _
                })
            }, [_, l, a.topic, a.topicId, a.treatmentType, h])
              , N = (0,
            Y.useMemo)(function() {
                return g || A
            }, [g, A])
              , e = (0,
            Y.useCallback)(function() {
                var e;
                if (h)
                    return (e = {})[R.LinkPath] = h,
                    e[R.SortPos] = l,
                    e[R.GameSetTypeId] = a.topicId,
                    e[R.Page] = Z.HomePage,
                    e[U.HomePageSessionInfo] = _,
                    e
            }, [_, l, h, a.topicId]);
            return K().createElement(yn, {
                backgroundImageAssetId: null !== (x = a.topicLayoutData) && void 0 !== x && x.backgroundImageAssetId ? parseInt(null === (x = a.topicLayoutData) || void 0 === x ? void 0 : x.backgroundImageAssetId, 10) : void 0
            }, K().createElement(In, {
                sortTitle: a.topic,
                sortSubtitle: a.subtitle,
                seeAllLink: A,
                subtitleLink: N,
                shouldShowSeparateSubtitleLink: !!g,
                isSortLinkOverrideEnabled: !!h,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: a.topicId === qe.adSortHomePageId,
                tooltipInfoText: f,
                titleContainerClassName: "container-header",
                hideSeeAll: p,
                endTimestamp: I,
                countdownString: w,
                backgroundImageAssetId: null !== (w = a.topicLayoutData) && void 0 !== w && w.backgroundImageAssetId ? parseInt(null === (n = a.topicLayoutData) || void 0 === n ? void 0 : n.backgroundImageAssetId, 10) : void 0,
                translate: r
            }), E ? K().createElement(hr, {
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
            }) : K().createElement(un, {
                ref: C,
                tileRef: T,
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
        var yr = ot
          , br = function() {
            return (br = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ir = function(e, a, l, s) {
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
          , wr = function(n, r) {
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
        function Sr() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = br(br({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(br({}, l.current))
            }
            var e = this
              , t = (0,
            Y.useState)({})
              , n = t[0]
              , a = t[1]
              , l = (0,
            Y.useRef)(n);
            return (0,
            Y.useEffect)(function() {
                return Ir(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return wr(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (n = _e.deviceMeta.getDeviceMeta()) ? void 0 : n.deviceType) !== _e.deviceMeta.DeviceTypes.computer || null === y.CurrentUser || void 0 === y.CurrentUser || !y.CurrentUser.isAuthenticated)
                                return [3, 5];
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 4, , 5]),
                            [4, Me()];
                        case 2:
                            return t = e.sent().userData,
                            0 === (n = t ? t.map(function(e) {
                                return e.id
                            }) : []).length ? [2] : [4, me(n)];
                        case 3:
                            return r = e.sent().profileDetails,
                            o = (t || []).reduce(function(e, t) {
                                var n = r.find(function(e) {
                                    return e.userId === t.id
                                });
                                return n && (e[t.id] = br(br({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(br({}, l.current)),
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
        function Er() {
            var e = (0,
            Y.useContext)(Pr);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var Pr = (0,
        Y.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Cr = function() {
            return (Cr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ra = function(e) {
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
            Y.useRef)(null)
              , g = dn()
              , e = (0,
            Y.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Cr(Cr(Cr(Cr(Cr(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), G(r, t)), ((e = {})[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = o.topicId,
                    e)), Nn(o)), kn(o)), ((e = {})[R.Page] = i,
                    e[R.NumberOfLoadedTiles] = (r || []).length,
                    e[U.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            pn(h, r.length, e),
            (0,
            Y.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            Y.useMemo)(function() {
                var e = Cr(Cr(((e = {})[R.Position] = a,
                e[R.GameSetTypeId] = o.topicId,
                e), Nn(o)), ((t = {})[R.Page] = i,
                t[R.TreatmentType] = w.Carousel,
                t[U.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (Tn(e) && e.appliedFilters) {
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
                return k(o.sortId, i, e, m, t)
            }, [g, i, a, o, m]);
            return K().createElement("div", {
                className: he()("games-list-container", {
                    "wide-game-tile-container": c === $.GridTile || c === $.EventTile
                })
            }, K().createElement(In, {
                sortTitle: o.topic,
                sortSubtitle: o.subtitle,
                subtitleLink: v || e,
                seeAllLink: e,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!v,
                shouldShowSponsoredTooltip: o.topicId === Je.adSortDiscoverId,
                tooltipInfoText: s,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: u,
                translate: t
            }), K().createElement(hr, {
                gamesContainerRef: h,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                sortId: o.topicId,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Cr(Cr(Cr(Cr(((n = {})[R.PlaceId] = e.placeId,
                    n[R.UniverseId] = e.universeId,
                    n[R.IsAd] = e.isSponsored,
                    n[R.NativeAdData] = e.nativeAdData,
                    n[R.Position] = t,
                    n[R.SortPos] = a,
                    n[R.GameSetTypeId] = o.topicId,
                    n), Nn(o)), ((n = {})[R.NumberOfLoadedTiles] = (r || []).length,
                    n[R.Page] = i,
                    n)), kn(o)), ((n = {})[U.DiscoverPageSessionInfo] = g,
                    n[R.PlayContext] = Z.GamesPage,
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
        var Tr = Ra
          , _r = (0,
        Y.createContext)(void 0)
          , xr = function() {
            return (xr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (sr = function(e) {
            var t = e.translate
              , r = e.sort
              , o = e.positionId
              , n = e.itemsPerRow
              , i = e.gameData
              , a = (0,
            Y.useContext)(_r)
              , l = (0,
            Y.useRef)(null)
              , s = Sr()
              , u = (0,
            Y.useMemo)(function() {
                return Ke
            }, [])
              , c = (0,
            Y.useCallback)(function(e, t) {
                var n;
                return xr(xr(((n = {})[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = o,
                n[R.NumberOfLoadedTiles] = i.length,
                n[R.GameSetTypeId] = u,
                n), Nn(r)), ((n = {})[R.Page] = Z.SearchLandingPage,
                n[U.SearchLandingPageSessionInfo] = a,
                n[R.PlayContext] = Z.SearchLandingPage,
                n))
            }, [o, i.length, u, r, a])
              , e = (0,
            Y.useCallback)(function(e) {
                var t = e.filter(function(e) {
                    return e < i.length
                });
                return xr(xr(xr(xr(xr(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.placeId
                }),
                e[R.UniverseIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.universeId
                }),
                e), z(i, u, t)), W(i, u, t)), G(i, t)), Nn(r)), ((e = {})[R.AbsPositions] = t,
                e[R.SortPos] = o,
                e[R.NumberOfLoadedTiles] = i.length,
                e[R.GameSetTypeId] = u,
                e[R.Page] = Z.SearchLandingPage,
                e[U.SearchLandingPageSessionInfo] = a,
                e))
            }, [i, r, o, a, u]);
            return pn(l, i.length, e),
            K().createElement(K().Fragment, null, K().createElement(In, {
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
            }), K().createElement(hr, {
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
        var Ar = sr;
        function Nr(e) {
            var t = e.sort
              , o = Er().contentMetadata;
            return 0 === (null == (e = (0,
            Y.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, Rr)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : K().createElement(y.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function Or(e) {
            var t = e.loadData
              , n = (0,
            Y.useRef)(null)
              , r = (0,
            Y.useRef)(null);
            return (0,
            Y.useEffect)(function() {
                var e = n.current;
                return e && (r.current = E.elementVisibilityService.observeVisibility({
                    element: e,
                    threshold: Ye
                }, function(e) {
                    e && t && t()
                })),
                function() {
                    null != r && r.current && r.current()
                }
            }, [t]),
            t ? K().createElement("div", {
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
              , e = Sr()
              , p = Er().contentMetadata
              , m = d || o === Z.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === $.EventTile
              , f = f || o === Z.HomePage && (null === (v = null == n ? void 0 : n.topicLayoutData) || void 0 === v ? void 0 : v.componentType) === $.EventTile
              , v = (0,
            Y.useMemo)(function() {
                var e;
                return m ? xn(n, p) : u ? xn(n, p).slice(0, i) : xn(n, p).slice(0, function(e, t) {
                    var n = qe.maxWideGameTilesPerCarouselPage
                      , r = qe.maxTilesPerCarouselPage;
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
            return 0 === (null == v ? void 0 : v.length) ? null : o === Z.GamesPage ? K().createElement(Tr, {
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
            }) : o === Z.SearchLandingPage ? K().createElement(Ar, {
                key: n.topic,
                sort: n,
                gameData: v,
                translate: t,
                positionId: r,
                itemsPerRow: Ze
            }) : K().createElement(yr, {
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
        var kr = ee
          , Rr = qe.maxTilesPerCarouselPage;
        function Dr(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            Y.useRef)(null);
            return K().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, K().createElement("span", {
                className: "text-label creator-name-label"
            }, l(Xe.LabelByPrefix), " "), K().createElement("a", {
                href: i,
                onClick: function() {
                    y.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, y.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && K().createElement(Lr.VerifiedBadgeIconContainer, {
                size: Lr.BadgeSizes.CAPTIONHEADER
            }))
        }
        Or.displayName = "SentinelTile",
        Or.defaultProps = {
            loadData: null
        };
        var Lr = RobloxBadges;
        (re = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.disableLoadingState
              , i = e.redirectPurchaseUrl
              , a = y.PlayButton.usePlayabilityStatus
              , l = y.PlayButton.PlayabilityStatuses
              , s = y.PlayButton.DefaultPlayButton
              , e = a(t)
              , u = e[0]
              , a = e[1]
              , e = (0,
            Y.useMemo)(function() {
                return !!u && [l.PurchaseRequired, l.FiatPurchaseRequired].includes(u)
            }, [u, l]);
            return K().createElement(s, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: a,
                playabilityStatus: u,
                eventProperties: r,
                disableLoadingState: o,
                buttonClassName: e ? "btn-economy-robux-white-lg purchase-button" : void 0,
                hideButtonText: !e,
                redirectPurchaseUrl: e ? i : void 0,
                showDefaultPurchaseText: u === l.FiatPurchaseRequired
            })
        }
        ).defaultProps = {
            playButtonEventProperties: {},
            disableLoadingState: !1,
            redirectPurchaseUrl: void 0
        };
        var Mr = re
          , Ur = function(e, a, l, s) {
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
          , Fr = function(n, r) {
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
          , Br = (0,
        Y.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.translate
              , a = e.topicId
              , l = (0,
            Y.useState)()
              , s = l[0]
              , u = l[1]
              , c = Ce()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Sr()
              , l = Te(o, a)
              , m = (0,
            Y.useMemo)(function() {
                return B(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            Y.useMemo)(function() {
                return 0 < m.length && s ? K().createElement($t, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : K().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            Y.useEffect)(function() {
                Ur(void 0, void 0, void 0, function() {
                    var t;
                    return Fr(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Fe(o.placeId.toString())];
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
              , n = Ve(l);
            return K().createElement("div", {
                ref: t,
                className: "featured-grid-item-container game-card-container",
                "data-testid": "game-tile-featured",
                onMouseOver: f,
                onMouseLeave: e,
                onFocus: f,
                onBlur: e
            }, K().createElement(ge.Link, {
                url: a,
                className: "game-card-link",
                id: o.universeId.toString()
            }, K().createElement(Rt, {
                gameLayoutData: l,
                isFocused: d
            }), K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameIcon,
                size: We.ThumbnailGameIconSize.size512,
                targetId: o.universeId,
                containerClass: "game-card-thumb-container",
                format: We.ThumbnailFormat.jpeg,
                altName: o.name
            }), K().createElement("div", {
                className: "game-card-name-info"
            }, K().createElement("div", null, K().createElement("div", {
                className: "game-card-name game-name-title",
                title: o.name
            }, o.name), n ? K().createElement(jt, {
                footerData: n
            }) : K().createElement(Ft, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), K().createElement(Mr, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: O.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && K().createElement(Dr, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        Br.displayName = "FeaturedGridTile";
        var jr = function() {
            return (jr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Gr = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (ot = (0,
        Y.forwardRef)(function(e, t) {
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
              , e = Gr(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? K().createElement(Br, jr({
                ref: t
            }, e)) : K().createElement(sn, jr({
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
        ot.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var Hr = ot
          , zr = (0,
        Y.forwardRef)(function(e, t) {
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
              , g = he()("game-grid", {
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
            return K().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: g
            }, n.map(function(e, t) {
                return K().createElement(Hr, {
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
            }), s && K().createElement(Or, {
                loadData: l
            }))
        });
        zr.displayName = "GameGrid",
        zr.defaultProps = {
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
        var Vr = zr
          , Wr = function() {
            return (Wr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ra = function(e) {
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
            Y.useRef)(null)
              , v = (0,
            Y.useRef)(null)
              , h = dn()
              , e = (0,
            Y.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Wr(Wr(Wr(Wr(Wr(Wr(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), z(r, o.topicId, t, n)), W(r, o.topicId, t, n)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e)), G(r, t)), q(c, u, null == r ? void 0 : r.length, t)), ((t = {})[R.SortPos] = i,
                    t[R.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[R.GameSetTypeId] = o.topicId,
                    t[R.Page] = Z.HomePage,
                    t[U.HomePageSessionInfo] = h,
                    t))
                }
            }, [r, h, i, o.topicId, n, u, c]);
            return pn(m, r.length, e),
            (0,
            Y.useEffect)(function() {
                u && null != m && m.current && m.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            K().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, K().createElement("div", {
                className: "container-header"
            }, K().createElement("h2", null, o.topic, o.topicId === qe.adSortHomePageId && K().createElement(wt, {
                tooltipText: p(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics."
            }))), K().createElement(zr, {
                ref: m,
                tileRef: v,
                gameData: r,
                emphasis: !1,
                translate: p,
                buildEventProperties: function(e, t) {
                    var n = {};
                    return n[R.PlaceId] = e.placeId,
                    n[R.UniverseId] = e.universeId,
                    n[R.IsAd] = e.isSponsored,
                    n[R.NativeAdData] = e.nativeAdData,
                    n[R.Position] = t,
                    n[R.SortPos] = i,
                    n[R.NumberOfLoadedTiles] = (r || []).length,
                    n[R.GameSetTypeId] = o.topicId,
                    n[R.Page] = Z.HomePage,
                    n[U.HomePageSessionInfo] = h,
                    n[R.PlayContext] = Z.HomePage,
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
        var qr = Ra
          , Jr = qe.sortlessGridMaxTilesMetadataToFetch;
        (sr = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = Sr()
              , u = dn()
              , e = Er()
              , c = e.contentMetadata
              , d = e.appendContentMetadata
              , f = (0,
            Y.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == c ? void 0 : c[t]) && void 0 !== t && t[e])
                });
                0 < e.length && pe(e.slice(0, Jr), u).then(function(e) {
                    return d(e.contentMetadata)
                }).catch(function() {})
            }, [a, u, c, d]);
            (0,
            Y.useEffect)(function() {
                f()
            }, [f]);
            e = (0,
            Y.useMemo)(function() {
                return Pn(a, c)
            }, [a, c]);
            return 0 === (null == e ? void 0 : e.length) ? null : K().createElement(qr, {
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
        var $r = sr
          , Yr = rs(5250);
        function Kr(e) {
            return (Kr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Zr(e, t) {
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
                    return Qr(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Qr(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Qr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Xr(e, t) {
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
        function eo(t, e, r) {
            var n = Zr((0,
            Y.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = Zr((0,
            Y.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            Y.useRef)(null)
              , u = (0,
            Y.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), lo).filter(function(e) {
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
            Yr.debounce)(function() {
                return u()
            });
            (0,
            Y.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = Xr({
                    elements: i,
                    threshold: so
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
        rs(1315);
        var to, no, ro, oo, io, ao, lo = 25, so = .5;
        function uo(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === Kr(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function co(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , e = "(" + (null != t ? t : 0) + ")"
              , n = r ? y.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : y.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends";
            return K().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? K().createElement("h2", null, o("Heading.Friends")) : K().createElement("h2", null, o("Heading.Friends"), K().createElement("span", {
                className: "friends-count"
            }, e)), K().createElement("a", {
                href: n,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        (ee = to = to || {}).ItemImpressions = "itemImpressions",
        ee.ItemAction = "itemAction",
        (re = no = no || {}).Home = "home",
        re.UserProfile = "userProfile",
        (ot = ro = ro || {}).HomePageSessionInfo = "homePageSessionInfo",
        ot.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        ot.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ra = oo = oo || {}).ContentType = "contentType",
        Ra.Context = "context",
        Ra.CollectionId = "collectionId",
        Ra.CollectionPosition = "collectionPosition",
        (sr = {}).Online = "online",
        sr.InGame = "inGame",
        sr.InStudio = "inStudio",
        sr.Offline = "offline",
        (ee = {}).Friend = "friend",
        ee.NotFriend = "notFriend",
        (re = io = io || {}).ItemIds = "itemIds",
        re.ItemPositions = "itemPositions",
        re.RowNumbers = "rowNumbers",
        re.FeedRowNumbers = "feedRowNumbers",
        re.PositionsInRow = "positionsInRow",
        re.PositionsInTopic = "positionsInTopic",
        re.TotalNumberOfItems = "totalNumberOfItems",
        (ot = {}).Presences = "presences",
        ot.PresenceUniverseIds = "presenceUniverseIds",
        ot.FriendStatuses = "friendStatuses",
        ot.SourceCarousel = "sourceCarousel",
        (Ra = ao = ao || {}).ItemId = "itemId",
        Ra.ItemPosition = "itemPosition",
        Ra.RowNumber = "rowNumber",
        Ra.FeedRowNumber = "feedRowNumber",
        Ra.PositionInRow = "positionInRow",
        Ra.PositionInTopic = "positionInTopic",
        Ra.TotalNumberOfItems = "totalNumberOfItems",
        Ra.ActionType = "actionType",
        (sr = {}).Presence = "presence",
        sr.PresenceUniverseId = "presenceUniverseId",
        sr.FriendStatus = "friendStatus",
        sr.SourceCarousel = "sourceCarousel";
        var fo = function(e, a, l, s) {
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
          , po = function(n, r) {
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
          , mo = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , vo = function(n) {
            return fo(void 0, void 0, Promise, function() {
                var t;
                return po(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: y.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, O.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ho = function(m, v) {
            return fo(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return po(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (i = m,
                        fo(void 0, void 0, Promise, function() {
                            var t;
                            return po(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: y.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, O.httpService.get(t)];
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
                        fo(void 0, void 0, Promise, function() {
                            var t;
                            return po(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = y.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
                                    t = {
                                        url: o ? t + "?userSort=1" : t,
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, O.httpService.get(t)];
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
                        f = mo(mo([], d), f),
                        [4, (r = f,
                        fo(void 0, void 0, Promise, function() {
                            var t, n;
                            return po(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: y.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    n = {
                                        userIds: r,
                                        fields: ["names.combinedName", "isVerified"]
                                    },
                                    [4, O.httpService.post(t, n)];
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
          , go = function(e, a, l, s) {
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
          , yo = function(n, r) {
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
          , bo = y.EnvironmentUrls.chatApi
          , Io = function() {
            return go(void 0, void 0, Promise, function() {
                var t;
                return yo(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, O.httpService.get({
                            url: bo + "/v1/metadata",
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
          , wo = rs.n(re);
        function So(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return K().createElement("div", {
                className: "friend-tile-content"
            }, K().createElement(Co, {
                id: t,
                translate: e,
                userProfileUrl: r,
                handleImageClick: a
            }), K().createElement("a", {
                href: r,
                onClick: a,
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, K().createElement("div", {
                className: "friends-carousel-tile-label"
            }, K().createElement("div", {
                className: "friends-carousel-tile-name"
            }, K().createElement("span", {
                className: "friends-carousel-display-name"
            }, n), i && K().createElement("div", {
                className: "friend-tile-verified-badge"
            }, K().createElement("div", {
                className: "friend-tile-spacer"
            }), K().createElement(Lr.VerifiedBadgeIconContainer, {
                size: Lr.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), K().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && K().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function Eo(e) {
            var n = e.friend
              , t = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.isInGame
              , a = e.gameUrl
              , l = e.universeId
              , s = e.canChat
              , e = e.translate;
            return K().createElement("div", {
                className: "friend-tile-dropdown"
            }, i && null != o && K().createElement("div", {
                className: "in-game-friend-card"
            }, K().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.gameIcon,
                size: We.ThumbnailGameIconSize.size150,
                targetId: l,
                imgClassName: "game-card-thumb",
                containerClass: "friend-tile-game-card"
            })), K().createElement("div", {
                className: "friend-presence-info"
            }, K().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, o), K().createElement(ge.Button, {
                variant: ge.Button.variants.growth,
                size: ge.Button.sizes.small,
                width: ge.Button.widths.full,
                onClick: function() {
                    return To(void 0, void 0, void 0, function() {
                        var t;
                        return _o(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return (t = n.presence.gameId || "",
                                (0,
                                y.DeviceMeta)().isInApp) ? ((0,
                                y.DeviceMeta)().isDesktop ? y.GameLauncher.followPlayerIntoGame(n.id, t, "JoinUser") : window.location.href = "/games/start?userID=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 1];
                            case 1:
                                return (0,
                                y.DeviceMeta)().isAndroidDevice || (0,
                                y.DeviceMeta)().isChromeOs ? (window.location.href = "intent://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser#Intent;scheme=robloxmobile;package=com.roblox.client;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.roblox.client;end",
                                [3, 5]) : [3, 2];
                            case 2:
                                return (0,
                                y.DeviceMeta)().isIosDevice ? (window.location.href = "robloxmobile://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 3];
                            case 3:
                                return [4, y.ProtocolHandlerClientInterface.followPlayerIntoGame({
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
            }, e("Action.Join")))), K().createElement("ul", null, s && K().createElement("li", null, K().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    E.chatService.startDesktopAndMobileWebChat({
                        userId: n.id
                    })
                }
            }, K().createElement("span", {
                className: "icon icon-chat-gray"
            }), " ", e("Label.Chat", {
                username: t
            }))), K().createElement("li", null, K().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    window.open(r)
                }
            }, K().createElement("span", {
                className: "icon icon-viewdetails"
            }), " ", e("Label.ViewProfile")))))
        }
        function Po(e) {
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
            Y.useState)(!1)
              , e = a[0]
              , l = a[1]
              , s = (0,
            Y.useRef)(null)
              , u = (0,
            Y.useRef)(null);
            return (0,
            Y.useEffect)(function() {
                return s.current ? (s.current.addEventListener("mouseover", t),
                s.current.addEventListener("mouseout", n),
                function() {
                    var e;
                    null !== (e = s.current) && void 0 !== e && e.removeEventListener("mouseover", t),
                    null !== (e = s.current) && void 0 !== e && e.removeEventListener("mouseout", n)
                }
                ) : function() {}
            }, []),
            K().createElement("div", null, K().createElement("div", {
                ref: s
            }, r), e && K().createElement("div", {
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
        (ot = function(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.handleImageClick
              , o = e.translate
              , e = K().createElement(We.Thumbnail2d, {
                type: We.ThumbnailTypes.avatarHeadshot,
                size: We.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            });
            return K().createElement(ge.AvatarCardItem.Headshot, {
                statusIcon: K().createElement(wo().PresenceStatusIcon, {
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
        var Co = ot
          , To = function(e, a, l, s) {
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
          , _o = function(n, r) {
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
        function xo(e) {
            return (xo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Ao(e, t) {
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
                    return No(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return No(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function No(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Oo(e, t) {
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
        function ko(t, e, r) {
            var n = Ao((0,
            Y.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = Ao((0,
            Y.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            Y.useRef)(null)
              , u = (0,
            Y.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), zo).filter(function(e) {
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
            Yr.debounce)(function() {
                return u()
            });
            (0,
            Y.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = Oo({
                    elements: i,
                    threshold: Vo
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
        rs(6870);
        var Ro, Do, Lo, Mo, Uo, Fo, Bo, jo, Go, Ho, zo = 25, Vo = .5;
        function Wo(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === xo(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function qo(e, t, n) {
            return t ? Uo.InGame : e && "Studio" === n ? Uo.InStudio : e ? Uo.Online : Uo.Offline
        }
        function Jo(e) {
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
              , f = y.EnvironmentUrls.websiteUrl + "/users/" + t.id + "/profile"
              , p = t.combinedName
              , m = wo().usePresence(t.id, void 0)
              , v = null != m && null != m.gameId
              , h = v ? m.lastLocation : null
              , e = null != h && 15 < h.length ? h.slice(0, 15) + "..." : h
              , g = v ? y.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = Ko(t, n, a, l, s, u, c, d);
            return K().createElement("div", {
                className: "friends-carousel-tile"
            }, K().createElement(Po, {
                trigger: K().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, K().createElement(So, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? K().createElement(Eo, {
                    friend: t,
                    isInGame: v,
                    universeId: null !== (m = m.universeId) && void 0 !== m ? m : 0,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: h,
                    translate: o,
                    gameUrl: g,
                    canChat: i
                }) : K().createElement("div", null),
                dropdownWidth: null == e ? 240 : 315
            }))
        }
        function $o(e) {
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
            Y.useRef)(null)
              , t = (v = (0,
            Y.useState)(n))[0]
              , f = v[1]
              , p = (0,
            Y.useState)(!1)
              , e = p[0]
              , m = p[1]
              , v = (0,
            Y.useRef)(null);
            return (0,
            Y.useEffect)(function() {
                var e, t = null === (e = d.current) || void 0 === e ? void 0 : e.offsetWidth;
                m(110 * (null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0) > (null != t ? t : 0)),
                null != t && null != n && (t = Math.floor(t / 110),
                f(n.slice(0, t)))
            }, [null === (p = d.current) || void 0 === p ? void 0 : p.offsetWidth, n]),
            Qo(v, n, a, l, s, u, c),
            K().createElement("div", null, K().createElement("div", {
                ref: function(e) {
                    return d.current = e,
                    d.current
                },
                className: "friends-carousel-container"
            }, null == t ? K().createElement("span", {
                className: "spinner spinner-default"
            }) : K().createElement("div", {
                ref: v,
                className: e ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, t.map(function(e, t) {
                return K().createElement("div", {
                    key: e.id
                }, K().createElement(Jo, {
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
        (Ra = Ro = Ro || {}).ItemImpressions = "itemImpressions",
        Ra.ItemAction = "itemAction",
        (sr = {}).Home = "home",
        sr.UserProfile = "userProfile",
        (re = Do = Do || {}).HomePageSessionInfo = "homePageSessionInfo",
        re.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        re.GameSearchSessionInfo = "gameSearchSessionInfo",
        (ot = Lo = Lo || {}).ContentType = "contentType",
        ot.Context = "context",
        ot.CollectionId = "collectionId",
        ot.CollectionPosition = "collectionPosition",
        (Mo = Mo || {}).User = "User",
        (Ra = Uo = Uo || {}).Online = "online",
        Ra.InGame = "inGame",
        Ra.InStudio = "inStudio",
        Ra.Offline = "offline",
        (sr = Fo = Fo || {}).Friend = "friend",
        sr.NotFriend = "notFriend",
        (re = Bo = Bo || {}).ItemIds = "itemIds",
        re.ItemPositions = "itemPositions",
        re.RowNumbers = "rowNumbers",
        re.FeedRowNumbers = "feedRowNumbers",
        re.PositionsInRow = "positionsInRow",
        re.PositionsInTopic = "positionsInTopic",
        re.TotalNumberOfItems = "totalNumberOfItems",
        (ot = jo = jo || {}).Presences = "presences",
        ot.PresenceUniverseIds = "presenceUniverseIds",
        ot.FriendStatuses = "friendStatuses",
        ot.SourceCarousel = "sourceCarousel",
        (Ra = Go = Go || {}).ItemId = "itemId",
        Ra.ItemPosition = "itemPosition",
        Ra.RowNumber = "rowNumber",
        Ra.FeedRowNumber = "feedRowNumber",
        Ra.PositionInRow = "positionInRow",
        Ra.PositionInTopic = "positionInTopic",
        Ra.TotalNumberOfItems = "totalNumberOfItems",
        Ra.ActionType = "actionType",
        (sr = Ho = Ho || {}).Presence = "presence",
        sr.PresenceUniverseId = "presenceUniverseId",
        sr.FriendStatus = "friendStatus",
        sr.SourceCarousel = "sourceCarousel";
        var Yo = function() {
            return (Yo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ko = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            Y.useCallback)(function() {
                var e, t = {};
                return t[Lo.Context] = i,
                t[Lo.ContentType] = Mo.User,
                t[Lo.CollectionId] = l,
                t[Lo.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[Go.TotalNumberOfItems] = u,
                t[Go.ActionType] = "OpenProfile",
                t[Go.ItemId] = n.id.toString(),
                t[Go.ItemPosition] = r + 1,
                t[Go.PositionInTopic] = r + 1,
                t[Go.RowNumber] = 1,
                t[Ho.Presence] = qo(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[Ho.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[Ho.FriendStatus] = "friend",
                t[Ho.SourceCarousel] = o,
                t[Do.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            Y.useCallback)(function() {
                var e = t();
                E.eventStreamService.sendEvent({
                    name: Ro.ItemAction,
                    type: Ro.ItemAction,
                    context: i
                }, Wo(Yo({}, e)))
            }, [t, i])
        }
          , Zo = function() {
            return (Zo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Qo = function(e, n, r, o, i, a, l) {
            var t = (0,
            Y.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[Lo.Context] = o,
                    e[Lo.ContentType] = Mo.User,
                    e[Lo.CollectionId] = a,
                    e[Lo.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[Bo.TotalNumberOfItems] = n.length,
                    e[Bo.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[Bo.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Bo.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Bo.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[jo.Presences] = t.map(function(e) {
                        var t;
                        return qo(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[jo.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[jo.FriendStatuses] = t.map(function() {
                        return Fo.Friend
                    }),
                    e[jo.SourceCarousel] = r,
                    e[Do.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            Y.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? E.eventStreamService.sendEvent({
                    name: Ro.ItemImpressions,
                    type: Ro.ItemImpressions,
                    context: o
                }, Wo(Zo({}, e))) : (0,
                S.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            ko(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        }
          , Xo = (y.EnvironmentUrls.friendsApi,
        y.EnvironmentUrls.premiumFeaturesApi,
        y.EnvironmentUrls.usersApi,
        y.EnvironmentUrls.gamesApi,
        y.EnvironmentUrls.contactsApi,
        y.EnvironmentUrls.accountSettingsApi,
        y.EnvironmentUrls.authApi,
        y.EnvironmentUrls.tradesApi,
        y.EnvironmentUrls.apiGatewayUrl)
          , ei = (y.EnvironmentUrls.chatApi,
        function() {
            return {
                url: "".concat(Xo, "/user-blocking-api/v1/users/batch-check-reciprocal-block"),
                withCredentials: !0
            }
        }
        )
          , ti = function(e, a, l, s) {
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
          , ni = function(n, r) {
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
          , ri = function(n) {
            return ti(void 0, void 0, Promise, function() {
                var t;
                return ni(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = parseInt(y.CurrentUser.userId, 10),
                        Number.isNaN(t) || !t ? [2, {
                            users: [{
                                isBlocked: !1,
                                isBlockingViewer: !1,
                                userId: 0
                            }]
                        }] : [4, O.httpService.post(ei(), {
                            userIds: n,
                            requesterUserId: t
                        })];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , oi = y.EnvironmentUrls.apiGatewayUrl
          , ii = (y.EnvironmentUrls.friendsApi,
        y.EnvironmentUrls.thumbnailsApi,
        y.EnvironmentUrls.presenceApi,
        y.EnvironmentUrls.gamesApi,
        y.EnvironmentUrls.usersApi,
        function(e, t, n) {
            t = 1 < arguments.length && void 0 !== t ? t : null,
            n = 2 < arguments.length && void 0 !== n ? n : null;
            return {
                retryable: !0,
                withCredentials: !0,
                url: "".concat(oi, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "")
            }
        }
        );
        function ai(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var li = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n, r) {
                var o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return o = n ? btoa(JSON.stringify(n)) : null,
                            o = ii(t, o, r),
                            e.next = 4,
                            O.httpService.get(o);
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
                        ai(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        ai(r, t, n, o, i, "throw", e)
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
        function si(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function ui(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        si(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        si(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        var ci = function() {
            var e = ui(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            li("MustHideConnections", [{
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
                }, e, null, [[0, 7]])
            }));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , di = function() {
            var e = ui(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            ri([parseInt(t, 10)]);
                        case 3:
                            if (null != (n = e.sent) && n.users && 0 < n.users.length)
                                return e.abrupt("return", n.users[0].isBlockingViewer);
                            e.next = 6;
                            break;
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
                }, e, null, [[0, 8]])
            }));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , fi = function(e, a, l, s) {
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
          , pi = function(n, r) {
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
            Y.useState)(null)
              , s = l[0]
              , p = l[1]
              , u = (0,
            Y.useState)(null)
              , c = u[0]
              , m = u[1]
              , e = (0,
            Y.useState)(!1)
              , l = e[0]
              , v = e[1]
              , u = (0,
            Y.useState)(!0)
              , e = u[0]
              , h = u[1];
            return (0,
            Y.useEffect)(function() {
                fi(void 0, void 0, void 0, function() {
                    var o, i, a, l, s, u, c;
                    return pi(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return u = [vo(d), ho(d, f), Io(), (n = d,
                            r = f,
                            fi(void 0, void 0, void 0, function() {
                                return pi(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        return r ? [2, !1] : [4, di(n)];
                                    case 1:
                                        return e.sent() ? [2, !0] : [4, ci(n)];
                                    case 2:
                                        return [2, e.sent()]
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
                            o = c[0],
                            i = c[1],
                            a = c[2],
                            l = c[3],
                            s = o.value,
                            u = i.value,
                            c = a.value,
                            p("fulfilled" === o.status ? s.count : 0),
                            m("fulfilled" === i.status ? u : []),
                            v("fulfilled" === a.status && c.chatEnabled),
                            h("fulfilled" !== l.status || l.value),
                            [2]
                        }
                        var t, n, r
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [d, f]),
            e || 0 === s ? K().createElement("div", {
                className: "friends-carousel-0-friends"
            }) : K().createElement("div", {
                className: "react-friends-carousel-container"
            }, K().createElement(co, {
                friendsCount: s,
                translate: t,
                profileUserId: d,
                isOwnUser: f
            }), K().createElement($o, {
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
        var mi = (0,
        p.withTranslations)(re, ee);
        function vi(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = y.CurrentUser.userId) && void 0 !== o ? o : "0");
            return K().createElement("div", {
                className: "friend-carousel-container"
            }, K().createElement(mi, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: Ii.WebHomeFriendsCarousel,
                eventContext: no.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function hi(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = dn();
            return K().createElement(vi, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
        }
        function gi(e) {
            var t = e.option
              , n = e.isSelected
              , r = e.setSelectedOptionId
              , e = e.translate;
            return K().createElement("button", {
                type: "button",
                onClick: function() {
                    return r(t.optionId)
                },
                className: he()("filter-option", {
                    "selected-option": n
                }),
                "aria-label": e(n ? tt.ActionDropdownSelected : tt.ActionDropdownNotSelected, {
                    optionName: t.optionDisplayName
                })
            }, K().createElement("span", {
                className: "filter-option-name"
            }, t.optionDisplayName), n ? K().createElement("span", {
                className: "icon-radio-check-circle-filled"
            }) : K().createElement("span", {
                className: "icon-radio-check-circle"
            }))
        }
        function yi(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , o = e.setSelectedOptionId
              , i = e.setIsDropdownOpen
              , a = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , s = e.translate
              , e = (0,
            Y.useCallback)(function() {
                a(r),
                i(!1),
                l(t.filterId, C.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            Y.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, C.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            Y.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            Y.useCallback)(function(e) {
                e.key === wi.keyBoardEventCode.escape && u()
            }, [u]);
            return (0,
            Y.useEffect)(function() {
                return document.addEventListener("mousedown", c),
                document.addEventListener("keydown", d),
                function() {
                    document.removeEventListener("mousedown", c),
                    document.removeEventListener("keydown", d)
                }
            }, [c, d]),
            K().createElement("div", {
                className: "filters-modal-container"
            }, K().createElement("div", {
                className: "header-container"
            }, K().createElement("h3", null, t.filterDisplayName), K().createElement("div", null, K().createElement("button", {
                type: "button",
                className: "header-close-button",
                onClick: function() {
                    return u()
                },
                "aria-label": s(tt.ActionClose)
            }, K().createElement("span", {
                className: "icon-close"
            })))), K().createElement("div", {
                className: "filter-options-container"
            }, t.filterOptions.map(function(e, t) {
                return K().createElement(K().Fragment, {
                    key: e.optionId
                }, K().createElement(gi, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
                }), 0 === t && K().createElement("div", {
                    className: "filter-option-divider"
                }))
            })), K().createElement("div", {
                className: "action-buttons-container"
            }, K().createElement(ge.Button, {
                onClick: e,
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                width: ge.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, s(Xe.ActionApply) || "Apply")))
        }
        function bi(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = K().useRef(null)
              , a = (u = (0,
            Y.useState)(!1))[0]
              , l = u[1]
              , s = (e = (0,
            Y.useState)(r.selectedOptionId))[0]
              , u = e[1]
              , e = (0,
            Y.useMemo)(function() {
                var e = r.filterOptions.find(function(e) {
                    return e.optionId === r.selectedOptionId
                });
                return null == e ? void 0 : e.optionDisplayName
            }, [r.selectedOptionId, r.filterOptions]);
            return K().createElement("div", {
                ref: i
            }, K().createElement(ge.Button, {
                onClick: function() {
                    l(function(e) {
                        var t = e ? C.CloseDropdown : C.OpenDropdown
                          , n = e ? s : void 0;
                        return o(r.filterId, t, r.selectedOptionId, n),
                        !e
                    })
                },
                variant: a ? ge.Button.variants.primary : ge.Button.variants.secondary,
                size: ge.Button.sizes.medium,
                className: "filter-select"
            }, K().createElement("span", {
                className: "filter-display-text"
            }, e), K().createElement("span", {
                className: a ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), a && K().createElement(yi, {
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
        (ot = la = la || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        ot.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var Ii = la
          , wi = ve
          , Si = function() {
            return (Si = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ei = function(i, a, e) {
            var l = dn()
              , t = (0,
            Y.useRef)(null)
              , n = (0,
            Y.useCallback)(function() {
                var e = {};
                return e[R.AbsPositions] = i.filters.map(function(e, t) {
                    return t
                }),
                e[R.FilterIds] = i.filters.map(function(e) {
                    return e.filterId
                }),
                e[R.SelectedOptionIds] = i.filters.map(function(e) {
                    return e.selectedOptionId
                }),
                e[R.GameSetTypeId] = i.topicId,
                e[R.GameSetTargetId] = i.gameSetTargetId,
                e[R.SortPos] = a,
                e[U.DiscoverPageSessionInfo] = l,
                e[R.Page] = Z.GamesPage,
                e
            }, [i.filters, i.topicId, i.gameSetTargetId, a, l]);
            (0,
            Y.useEffect)(function() {
                return null != e && e.current && (t.current = E.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: $e.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = X.filterImpressions(e)) && E.eventStreamService.sendEvent.apply(E.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var o = (0,
            Y.useCallback)(function(e, t, n, r) {
                var o;
                return Si(((o = {})[R.ButtonName] = t,
                o[R.GameSetTypeId] = i.topicId,
                o[R.GameSetTargetId] = i.gameSetTargetId,
                o[R.SortPos] = a,
                o[U.DiscoverPageSessionInfo] = l,
                o[R.Page] = Z.GamesPage,
                o[R.FilterId] = e,
                o[R.SelectedOptionId] = n,
                o), r && ((o = {})[R.PreviousOptionId] = r,
                o))
            }, [i.topicId, i.gameSetTargetId, a, l]);
            return (0,
            Y.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = X.gamesFilterClick(r);
                r && E.eventStreamService.sendEvent.apply(E.eventStreamService, r)
            }, [o])
        };
        (Ra = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            Y.useRef)(null)
              , a = Ei(o, t, e);
            return K().createElement("div", {
                ref: e,
                className: "filters-container"
            }, K().createElement("div", {
                className: "filters-header-container"
            }, K().createElement("span", {
                className: "filters-header"
            }, o.topic)), K().createElement("div", {
                className: "filter-items-container"
            }, o.filters.map(function(r) {
                return K().createElement(bi, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = On([o]),
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
        var Pi, Ci = Ra, Ti = "webDiscoverySduiError";
        function _i(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }
        function xi(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                e = parseInt(e, 10);
                if (!Number.isNaN(e))
                    return e
            }
            return t
        }
        function Ai(e, t) {
            if ("boolean" == typeof e)
                return e;
            if ("string" != typeof e)
                return "number" == typeof e ? 1 === e || 0 !== e && (Di(Pi.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e),
                t) : (Di(Pi.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined")),
                t);
            var n = e.toLowerCase();
            return "true" === n || "t" === n || "false" !== n && "f" !== n && (Di(Pi.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e),
            t)
        }
        function Ni(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }
        function Oi(n) {
            var r = {};
            return Object.keys(n).forEach(function(e) {
                var t = n[e];
                Ni(t) ? r[e] = t : Di(Pi.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + e + ", value: " + JSON.stringify(t) + ", type: " + typeof t)
            }),
            r
        }
        function ki(e, t, n) {
            return null != t && t.analyticsData && void 0 !== (null == t ? void 0 : t.analyticsData[e]) && null !== (null == t ? void 0 : t.analyticsData[e]) ? t.analyticsData[e] : null != t && t.ancestorAnalyticsData && void 0 !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) && null !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) ? t.ancestorAnalyticsData[e] : n
        }
        function Ri(e, t, n) {
            return e = Li(Li(Li({}, t), e), n),
            n = Li(Li({}, e), {
                id: _i(e.id, Mi.id),
                itemPosition: xi(e.itemPosition, Mi.itemPosition)
            }),
            void 0 === (e = n).id || void 0 === e.itemPosition || e.itemPosition < 0 ? (Di(Pi.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(n)),
            Li(Li({}, Mi), n)) : n
        }
        (sr = Pi = Pi || {}).AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
        sr.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
        sr.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
        sr.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
        sr.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
        sr.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
        sr.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
        sr.ComponentNotFound = "ComponentNotFound",
        sr.ExecuteActionInvalidActionType = "ExecuteActionInvalidActionType",
        sr.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
        sr.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
        sr.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
        sr.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
        sr.NestedPropParseFailure = "NestedPropParseFailure",
        sr.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
        sr.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
        sr.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
        sr.PropParseFailure = "PropParseFailure",
        sr.PropParserNotFound = "PropParserNotFound",
        sr.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
        sr.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
        sr.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
        sr.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
        sr.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
        sr.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
        sr.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
        sr.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
        sr.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
        sr.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
        sr.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
        sr.SduiParseAutomaticSizeInvalidInput = "SduiParseAutomaticSizeInvalidInput",
        sr.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
        sr.SduiParseColorValueInvalidInput = "SduiParseColorValueInvalidInput",
        sr.SduiParseFoundationTokenInvalidInput = "SduiParseFoundationTokenInvalidInput",
        sr.SduiParseFoundationTokenInvalidInputPath = "SduiParseFoundationTokenInvalidInputPath",
        sr.SduiParseFoundationTokenInvalidOutputType = "SduiParseFoundationTokenInvalidOutputType",
        sr.SduiParseFoundationTokenMissingTokens = "SduiParseFoundationTokenMissingTokens",
        sr.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
        sr.SduiParseUDim2InvalidInput = "SduiParseUDim2InvalidInput",
        sr.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
        sr.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
        sr.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
        sr.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
        sr.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
        sr.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
        sr.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey",
        sr.VerticalFeedMissingFeedItems = "VerticalFeedMissingFeedItems";
        var Di = function(e, t) {
            (0,
            S.fireEvent)(e);
            t = {
                errorName: e,
                errorMessage: t
            };
            E.eventStreamService.sendEvent({
                name: Ti,
                type: Ti,
                context: no.Home
            }, uo(t))
        }
          , Li = function() {
            return (Li = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Mi = {
            id: "Unknown",
            itemPosition: -1
        }
          , Ui = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1
        }
          , Fi = function() {
            return (Fi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Bi = [oo.CollectionId, oo.CollectionPosition, oo.ContentType, "id", "itemPosition", "itemsPerRow", "rowNumber", io.TotalNumberOfItems]
          , ji = function(e, t, n) {
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
                d.push(t + 1)) : d.push(1)) : Di(Pi.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + l)
            }),
            (p = {})[oo.CollectionId] = l,
            p[oo.CollectionPosition] = a,
            p[oo.ContentType] = o,
            p[io.TotalNumberOfItems] = s,
            p[io.ItemIds] = u.join(","),
            p[io.ItemPositions] = c.join(","),
            p[io.RowNumbers] = d.join(","),
            p[io.PositionsInTopic] = f.join(","),
            p = p,
            e = function(r, o, i) {
                var a = {};
                r.forEach(function(e, n) {
                    var t = o[e];
                    null != t ? Object.entries(t).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        Bi.includes(t) || null == e || (a[t] || (a[t] = r.map(function() {
                            return ""
                        })),
                        a[t][n] = e.toString())
                    }) : Di(Pi.BuildItemImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i)
                });
                var n = {};
                return Object.entries(a).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n[t + "_arr"] = e.join(",")
                }),
                n
            }(e, t, n.collectionId),
            p = Fi(Fi(Fi({}, e), n), p),
            E.eventStreamService.sendEvent({
                name: to.ItemImpressions,
                type: to.ItemImpressions,
                context: no.Home
            }, uo(Fi({}, p)))) : Di(Pi.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId) : Di(Pi.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (n = null == n ? void 0 : n.collectionId) && void 0 !== n ? n : "undefined"))
        }
          , Gi = function() {
            return (Gi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Hi = function(e, t, n) {
            var r = Ri(null !== (l = t.analyticsData) && void 0 !== l ? l : {}, null !== (s = t.ancestorAnalyticsData) && void 0 !== s ? s : {}, void 0)
              , o = null !== (u = null != n ? n : t.getCollectionData && t.getCollectionData()) && void 0 !== u ? u : null;
            o || Di(Pi.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e));
            var i, a, l, s, u, c = null != o ? o : Ui, n = (a = (i = r).itemPosition,
            l = c.contentType,
            s = c.collectionPosition,
            n = c.collectionId,
            t = c.totalNumberOfItems,
            u = e.actionType,
            i ? ((o = {})[oo.CollectionId] = n,
            o[oo.CollectionPosition] = s,
            o[oo.ContentType] = l,
            o[ao.TotalNumberOfItems] = t,
            o[ao.ItemId] = i.id,
            o[ao.ItemPosition] = a + 1,
            o[ao.PositionInTopic] = a + 1,
            o[ao.ActionType] = u,
            o) : (Di(Pi.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + n),
            {})), n = Gi(Gi(Gi(Gi({}, r), c), Oi(e.actionParams)), n);
            E.eventStreamService.sendEvent({
                name: to.ItemAction,
                type: to.ItemAction,
                context: no.Home
            }, uo(Gi({}, n)))
        }
          , zi = function() {
            return (zi = Object.assign || function(e) {
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
              , n = e.sduiContext
              , o = e.item
              , i = e.children
              , a = (0,
            Y.useRef)(null)
              , l = (0,
            Y.useRef)(null)
              , s = (0,
            Y.useCallback)(function(e, t) {
                Hi(e, t, a.current)
            }, [a])
              , u = (0,
            Y.useCallback)(function() {
                return a.current
            }, [a])
              , c = (0,
            Y.useMemo)(function() {
                return zi(zi({}, t), {
                    logAction: s,
                    getCollectionAnalyticsData: u
                })
            }, [t, s, u]);
            a.current = (0,
            Y.useMemo)(function() {
                var e;
                return function(e, t, n, r, o) {
                    t = Li(Li({}, e), t),
                    r = Li(Li({}, t), {
                        collectionId: xi(t.collectionId, Ui.collectionId),
                        collectionPosition: xi(t.collectionPosition, -1),
                        contentType: _i(t.contentType, Ui.contentType),
                        itemsPerRow: r,
                        totalNumberOfItems: o
                    });
                    return void 0 === (o = r).collectionId || o.collectionId < 0 || void 0 === o.contentType || void 0 === o.itemsPerRow || o.itemsPerRow < 0 || void 0 === o.collectionPosition || o.collectionPosition < 0 || void 0 === o.totalNumberOfItems || o.totalNumberOfItems < 0 ? (Di(Pi.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + n + " is invalid: " + JSON.stringify(r)),
                    Li(Li({}, Ui), r)) : r
                }(null !== (e = c.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = c.analyticsData) && void 0 !== e ? e : {}, r.componentType, 1, 1)
            }, [c.ancestorAnalyticsData, c.analyticsData, r.componentType]);
            var d = (0,
            Y.useCallback)(function(e) {
                var t, n;
                o ? (a.current && ("Game" !== (n = a.current.contentType) && "HeroUnit" !== n || null !== (t = l.current) && void 0 !== t && t.universeId && ((n = {})[R.RootPlaceIds] = [xi(null === (t = l.current) || void 0 === t ? void 0 : t.placeId, -1)],
                n[R.UniverseIds] = [xi(null === (t = l.current) || void 0 === t ? void 0 : t.universeId, -1)],
                n[R.AdsPositions] = [!0 === Ai(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AdFlags] = [!0 === Ai(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AbsPositions] = [0],
                n[R.SortPos] = null !== (t = null === (t = a.current) || void 0 === t ? void 0 : t.collectionPosition) && void 0 !== t ? t : -1,
                n[R.GameSetTypeId] = null === (t = a.current) || void 0 === t ? void 0 : t.collectionId,
                n[R.Page] = Z.HomePage,
                n[R.ComponentType] = "HeroUnit",
                n[U.HomePageSessionInfo] = _i(null === (t = a.current) || void 0 === t ? void 0 : t[ro.HomePageSessionInfo], ""),
                n = n,
                n = X.gameImpressions(n),
                E.eventStreamService.sendEvent.apply(E.eventStreamService, n))),
                ji(e, [l.current], a.current)) : Di(Pi.SingleItemCollectionItemImpressedButMissing, "SingleItemCollection onItemImpressed missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r))
            }, [o, r, a, l])
              , f = (0,
            Y.useRef)(null);
            eo(f, 1, d);
            e = (0,
            Y.useMemo)(function() {
                var e;
                if (!o)
                    return Di(Pi.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r)),
                    K().createElement(K().Fragment, null);
                var t = {
                    itemPosition: 0
                };
                return l.current = Ri(null !== (e = o.analyticsData) && void 0 !== e ? e : {}, null !== (e = a.current) && void 0 !== e ? e : {}, t),
                K().createElement(za, {
                    componentConfig: o,
                    parentAnalyticsContext: c,
                    sduiContext: n,
                    localAnalyticsData: t
                })
            }, [o, r, c, a, n]),
            d = (0,
            Y.useMemo)(function() {
                return K().Children.map(i, function(e, t) {
                    if (!K().isValidElement(e))
                        return Di("SingleItemCollectionChildNotReactElement", "SingleItemCollectionChildNotReactElement " + JSON.stringify(r) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = r.componentType + "-child-" + t;
                    return K().cloneElement(e, zi(zi({}, e.props), {
                        key: t,
                        parentAnalyticsContext: c
                    }))
                })
            }, [i, c, r]);
            return K().createElement("div", {
                ref: f
            }, e, d)
        }
          , ee = function(e) {
            var t = e.componentConfig
              , n = e.analyticsContext
              , r = e.sduiContext
              , e = e.feedItems;
            return e ? K().createElement("div", null, e.map(function(e, t) {
                return K().createElement(za, {
                    key: e.componentType + "--" + t,
                    componentConfig: e,
                    parentAnalyticsContext: n,
                    sduiContext: r
                })
            })) : (Di(Pi.VerticalFeedMissingFeedItems, "SCI missing feedItems " + JSON.stringify(e) + " with config " + JSON.stringify(t)),
            K().createElement(K().Fragment, null))
        }
          , Vi = WebBlox
          , Wi = rs(4777)
          , qi = rs(8550);
        function Ji(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function $i(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ji(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ji(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function Yi(e, t) {
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
                    return Ki(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Ki(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Ki(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Zi(e) {
            var t = e.gradient
              , n = e.gradientHeightPercent
              , r = e.gradientWidthPercent
              , o = t.startColor
              , i = t.endColor
              , a = t.startOpacity
              , l = t.endOpacity
              , s = t.degree
              , t = (e = Yi(Y.useState(""), 2))[0]
              , u = e[1]
              , c = "".concat(100 * n, "%")
              , d = "".concat(100 * r, "%");
            return (0,
            Y.useEffect)(function() {
                var e = "linear-gradient(".concat(s, "deg, ").concat(o).concat(Math.round(255 * a).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * l).toString(16).padStart(2, "0"), ")");
                u(e)
            }, [o, i, a, l, s]),
            r = (0,
            Vi.makeStyles)()(function() {
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
            Y.createElement("div", {
                style: {
                    background: t
                },
                className: r
            })
        }
        function Qi(e) {
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
            Vi.makeStyles)()(function() {
                return {
                    heroUnitContentContainer: $i($i({
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
                    heroUnitTitle: $i($i($i($i({
                        color: "white",
                        position: "relative",
                        textShadow: "".concat(ia),
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
                    heroUnitSubtitle: $i({
                        color: "white",
                        textShadow: "".concat(ia),
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
            return Y.createElement("div", {
                className: f,
                ref: r
            }, Y.createElement(Zi, {
                gradient: o,
                gradientHeightPercent: i,
                gradientWidthPercent: a
            }), s, Y.createElement("div", {
                className: e
            }, Y.createElement("span", {
                className: p
            }, t), Y.createElement("span", {
                className: m
            }, n)), l)
        }
        function Xi(e) {
            var t = e.backgroundImageComponent
              , n = void 0 !== (r = e.forceViewportWidth) && r <= 600
              , r = (e = (0,
            Vi.makeStyles)()(function() {
                return {
                    heroUnitBackgroundWindow: $i($i({
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
                    heroUnitBackgroundContainer: $i($i({
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
            return Y.createElement("div", {
                className: r
            }, Y.createElement("div", {
                className: e
            }, t))
        }
        function ea(e) {
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
              , m = Y.useRef(!1)
              , v = (e = Yi(Y.useState(1), 2))[0]
              , h = e[1]
              , g = void 0 !== p && p <= 600
              , y = Y.useRef(null)
              , b = Y.useRef(null)
              , I = "".concat(Math.round(100 * d), "%")
              , w = "".concat(Math.round(100 * f), "%")
              , S = 360 * (f - d)
              , f = (e = (0,
            Vi.makeStyles)()(function() {
                return {
                    heroUnitContainer: $i({
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
                    heroUnitForegroundContainer: $i($i({
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
                    heroUnitTopSpacer: $i($i({
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
            Y.useCallback)(function() {
                var e = Wi(.2, 0, .8, 1);
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
            Y.useEffect)(function() {
                var e = qi(E, 100)
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
            Y.createElement("div", {
                ref: b,
                className: f,
                onClick: s,
                "data-testid": "hero-unit"
            }, Y.createElement("div", {
                className: e
            }), Y.createElement(Xi, {
                backgroundImageComponent: o,
                forceViewportWidth: p
            }), Y.createElement("div", {
                className: d
            }, r), Y.createElement(Qi, {
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
        function ta(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.leftAssetComponent
              , o = e.rightButtonComponent
              , i = (u = (0,
            Vi.makeStyles)()(function() {
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
                        textShadow: "".concat(ia)
                    },
                    assetSubtitle: {
                        marginTop: "auto",
                        color: "white",
                        fontFamily: "Builder Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "19.6px",
                        textShadow: "".concat(ia)
                    }
                }
            })().classes).attributionRowContainer
              , a = u.attributionRowThumbnailContainer
              , l = u.attributionRowTextContainer
              , s = u.attributionRowButtonContainer
              , e = u.assetTitle
              , u = u.assetSubtitle;
            return Y.createElement("div", {
                className: i
            }, Y.createElement("div", {
                className: a
            }, r), Y.createElement("div", {
                className: l
            }, Y.createElement("span", {
                className: e
            }, t), Y.createElement("span", {
                className: u
            }, n)), Y.createElement("div", {
                className: s
            }, o))
        }
        function na(e) {
            var t = e.pillText
              , e = (n = (0,
            Vi.makeStyles)()(function() {
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
            return Y.createElement("div", {
                className: e
            }, Y.createElement("span", {
                className: n
            }, t))
        }
        function ra(e) {
            var t = Ai(ki("adFlag", e, !1), !1)
              , n = xi(ki("itemPosition", e, -1), -1)
              , r = null != e && e.getCollectionData ? e.getCollectionData() : void 0
              , o = null !== (i = null == r ? void 0 : r.collectionPosition) && void 0 !== i ? i : xi(ki("collectionPosition", e, -1), -1)
              , i = null !== (a = null == r ? void 0 : r.totalNumberOfItems) && void 0 !== a ? a : xi(ki("totalNumberOfItems", e, -1), -1)
              , r = null !== (a = null == r ? void 0 : r.collectionId) && void 0 !== a ? a : xi(ki("collectionId", e, -1), -1)
              , a = _i(ki(ro.HomePageSessionInfo, e, ""), "");
            return (e = {})[R.IsAd] = t,
            e[R.Position] = n,
            e[R.SortPos] = o,
            e[R.NumberOfLoadedTiles] = i,
            e[R.GameSetTypeId] = r,
            e[R.Page] = Z.HomePage,
            e[U.HomePageSessionInfo] = a,
            e
        }
        var oa, ia = "2px 2px 4px rgba(0, 0, 0, 0.15)", ot = function(e) {
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
            Y.useMemo)(function() {
                return d ? K().createElement(ta, {
                    title: d.title,
                    subtitle: d.subtitle,
                    leftAssetComponent: d.image,
                    rightButtonComponent: f
                }) : K().createElement(K().Fragment, null)
            }, [d, f])
              , g = (0,
            Y.useMemo)(function() {
                return c ? K().createElement(na, {
                    pillText: c
                }) : K().createElement(K().Fragment, null)
            }, [c])
              , y = (0,
            Y.useMemo)(function() {
                return void 0 !== i ? i : 90 === o.degree || 270 === o.degree ? 1 : .5
            }, [i, o])
              , b = (0,
            Y.useMemo)(function() {
                return void 0 !== a ? a : 90 === o.degree || 270 === o.degree ? .5 : 1
            }, [a, o]);
            return (0,
            Y.useMemo)(function() {
                return K().createElement(ea, {
                    title: t,
                    subtitle: n,
                    foregroundImageComponent: l,
                    backgroundImageComponent: s,
                    gradient: o,
                    gradientHeightPercent: y,
                    gradientWidthPercent: b,
                    overlayPillComponent: g,
                    backgroundClickAction: u,
                    bottomRowComponent: null != r ? r : h,
                    minForegroundHeightPercent: p,
                    maxForegroundHeightPercent: m
                }, v)
            }, [s, u, r, h, l, o, y, b, n, t, v, g, p, m])
        }, aa = function() {
            return (aa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, la = function(e, t) {
            var n, r = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.placeId, o = "number" == typeof (n = r) ? n : "string" == typeof n ? parseInt(n, 10) : void 0;
            void 0 !== o ? (n = t,
            t = Oi(null !== (e = null == (t = e) ? void 0 : t.actionParams) && void 0 !== e ? e : {}),
            e = xi(null !== (e = t.placeId) && void 0 !== e ? e : ki("placeId", n, -1), -1),
            t = xi(null !== (t = t.universeId) && void 0 !== t ? t : ki("universeId", n, -1), -1),
            n = ra(n),
            n = aa(aa({}, n), ((n = {})[R.PlaceId] = e,
            n[R.UniverseId] = t,
            n)),
            n = v(o, "", n),
            window.location.href = n) : Di(Pi.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(r) + " to open game details")
        };
        (ve = oa = oa || {}).OpenGameDetails = "OpenGameDetails",
        ve.PlayButtonClick = "PlayButtonClick";
        var sa = ((Ra = {})[oa.OpenGameDetails] = la,
        Ra[oa.PlayButtonClick] = function() {}
        ,
        Ra)
          , ua = function(e, t, n) {
            var r = sa[e.actionType]
              , o = t.logAction;
            o ? o(e, t) : Hi(e, t, null),
            r ? r(e, t, n) : Di(Pi.ExecuteActionInvalidActionType, "Invalid action type " + e.actionType + " to execute action. No handler found.")
        }
          , ca = function() {
            return (ca = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function da(e) {
            var t = e.assetId
              , n = (o = (0,
            Y.useState)(""))[0]
              , r = o[1]
              , o = (e = (0,
            Y.useState)(!0))[0]
              , i = e[1];
            return (0,
            Y.useEffect)(function() {
                i(!0),
                Be(t).then(function(e) {
                    r(null !== (e = null === (e = null == e ? void 0 : e.locations[0]) || void 0 === e ? void 0 : e.location) && void 0 !== e ? e : "")
                }).catch(function() {
                    r("")
                }).finally(function() {
                    i(!1)
                })
            }, [t]),
            o ? K().createElement(ge.Loading, null) : n ? K().createElement("img", {
                src: n,
                alt: "asset"
            }) : (Di(Pi.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t),
            K().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }
        (sr = function(e) {
            var n = e.analyticsContext
              , t = e.sduiContext
              , r = e.universeId
              , o = e.placeId
              , i = e.width
              , a = e.playableText
              , l = e.hidePlayableIcon
              , s = y.PlayButton.usePlayabilityStatus
              , u = y.PlayButton.PlayabilityStatuses
              , c = y.PlayButton.PlayButton
              , d = s(r.toString())[0]
              , e = (0,
            Y.useCallback)(function() {
                var e = {
                    actionType: oa.PlayButtonClick,
                    actionParams: {}
                };
                ua(e, n, t)
            }, [n, t])
              , s = (0,
            Y.useMemo)(function() {
                var e, t = ra(n);
                return ca(ca({}, t), ((e = {})[R.IsAd] = (null !== (t = t[R.IsAd]) && void 0 !== t && t).toString(),
                e[R.PlaceId] = xi(o, -1),
                e[R.UniverseId] = xi(r, -1),
                e[R.PlayContext] = Z.HomePage,
                e))
            }, [n, o, r]);
            return void 0 === d || d !== u.Playable ? K().createElement(K().Fragment, null) : K().createElement("div", {
                className: "sdui-play-button-container",
                "data-testid": "sdui-play-button-container",
                style: i ? {
                    width: i + "px"
                } : {}
            }, K().createElement(c, {
                universeId: r.toString(),
                placeId: o.toString(),
                eventProperties: s,
                status: d,
                disableLoadingState: !0,
                buttonText: a,
                hideIcon: l,
                analyticsCallback: e
            }))
        }
        ).defaultProps = {
            width: void 0,
            playableText: void 0,
            hidePlayableIcon: void 0
        };
        var fa, pa, ve = sr;
        function ma(e, t) {
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
                Di(Pi.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(n) + " missing matching feed item with key " + t)
            } else
                Di(Pi.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e))
        }
        function va(e) {
            return !!(e && "object" == typeof e && e.componentType && Ma(e.componentType))
        }
        function ha(e) {
            if ("string" != typeof e)
                return Di(Pi.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string."),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var t = e.split("//");
            if (2 === t.length && (e.includes(fa.RbxAsset) || e.includes(fa.RbxThumb))) {
                if (t[0].includes(fa.RbxAsset))
                    return {
                        assetType: fa.RbxAsset,
                        assetTarget: t[1]
                    };
                if (t[0].includes(fa.RbxThumb))
                    return {
                        assetType: fa.RbxThumb,
                        assetTarget: t[1]
                    }
            }
            return Di(Pi.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }
        function ga(e) {
            if ("string" != typeof e)
                return K().createElement(K().Fragment, null);
            var t, n, r = ha(e), o = r.assetType, i = r.assetTarget;
            if (o === fa.RbxAsset) {
                var a = i;
                return K().createElement(da, {
                    assetId: a
                })
            }
            if (o !== fa.RbxThumb)
                return Di(Pi.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported."),
                K().createElement(K().Fragment, null);
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
            return void 0 === (a = r.id) || void 0 === o || void 0 === i || void 0 === l ? (Di(Pi.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != o ? o : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != i ? i : "undefined") + ", or h " + (null != l ? l : "undefined") + " is invalid"),
            K().createElement(K().Fragment, null)) : (t = i + "x" + l,
            void 0 !== (e = null === (e = Aa[e = o]) || void 0 === e ? void 0 : e.find(function(e) {
                return e === t
            })) ? K().createElement(We.Thumbnail2d, {
                containerClass: "sdui-thumbnail-container",
                type: o,
                targetId: a,
                format: We.ThumbnailFormat.webp,
                size: e
            }) : (Di(Pi.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + i + "x" + l + " for type " + o),
            K().createElement(K().Fragment, null)))
        }
        function ya(e, t) {
            if (t)
                if ("string" == typeof e) {
                    for (var n = e.split("."), r = t, o = 0; o < n.length; ++o) {
                        var i = n[o];
                        if (null == r || "object" != typeof r || Array.isArray(r))
                            return void Di(Pi.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". Token path step " + i + " is invalid. Token is " + JSON.stringify(r));
                        r = r[i]
                    }
                    if (null != r)
                        return r;
                    Di(Pi.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". The final token " + (r ? JSON.stringify(r) : "undefined") + " is invalid.")
                } else
                    Di(Pi.SduiParseFoundationTokenInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation token. Input must be a string.");
            else
                Di(Pi.SduiParseFoundationTokenMissingTokens, "Missing tokens in parseFoundationTokenHelper for input " + JSON.stringify(e))
        }
        function ba(e) {
            return !(!e || "object" != typeof e)
        }
        function Ia(e) {
            return "string" == typeof e && /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(e)
        }
        function wa(e) {
            return "string" == typeof e && /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/.test(e)
        }
        function Sa(e, t, n) {
            return Ia(e) || wa(e) ? e : (n = function(e, t) {
                t = ya(e, t.dependencies.tokens);
                if (void 0 !== t && "string" == typeof t)
                    return t;
                Di(Pi.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof t + ". Expected string.")
            }(e, n)) && (Ia(n) || wa(n)) ? n : void Di(Pi.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected color string.")
        }
        function Ea(e) {
            return !(!e || "object" != typeof e || void 0 === e.xScale || "number" != typeof e.xScale || void 0 === e.xOffset || "number" != typeof e.xOffset || void 0 === e.yScale || "number" != typeof e.yScale || void 0 === e.yOffset || "number" != typeof e.yOffset)
        }
        function Pa(e) {
            if (e && Array.isArray(e) && 4 === e.length) {
                e = e.map(Number);
                return {
                    xScale: e[0],
                    xOffset: e[1],
                    yScale: e[2],
                    yOffset: e[3]
                }
            }
        }
        function Ca(e, t, n, r, o) {
            if (!va(e))
                return Di(Pi.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children"),
                {
                    props: {},
                    children: null
                };
            var i, a, l, s = e.componentType, u = (i = t,
            u = r,
            r = (t = e).analyticsData,
            t = ka(ka({}, r), null != u ? u : {}),
            r = i.logAction,
            u = i.getCollectionData,
            {
                analyticsData: t,
                ancestorAnalyticsData: ka(ka({}, i.ancestorAnalyticsData), i.analyticsData),
                logAction: r,
                getCollectionData: u
            }), o = ka(ka(ka({}, e.props), {
                componentConfig: e,
                sduiContext: n,
                analyticsContext: u
            }), o);
            return {
                props: Oa(s, o, u, n),
                children: (a = u,
                l = n,
                (e = e).children ? e.children.map(function(e, t) {
                    t = e.componentType + "-" + t;
                    return K().createElement(za, {
                        key: t,
                        componentConfig: e,
                        parentAnalyticsContext: a,
                        sduiContext: l
                    })
                }) : null)
            }
        }
        (la = fa = fa || {}).RbxAsset = "rbxassetid",
        la.RbxThumb = "rbxthumb",
        (Ra = pa = pa || {}).None = "None",
        Ra.X = "X",
        Ra.Y = "Y",
        Ra.XY = "XY";
        var Ta, _a = function() {
            return (_a = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, xa = {
            startColor: "#000000",
            endColor: "#000000",
            startOpacity: 0,
            endOpacity: 1,
            degree: 180
        }, Aa = ((sr = {})[We.ThumbnailTypes.gameIcon] = Object.values(We.ThumbnailGameIconSize),
        sr[We.ThumbnailTypes.assetThumbnail] = Object.values(We.ThumbnailAssetsSize),
        sr), la = {
            parseUiComponent: function(e, t, n) {
                return va(e) ? K().createElement(za, {
                    componentConfig: e,
                    parentAnalyticsContext: t,
                    sduiContext: n
                }) : (Di(Pi.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component"),
                K().createElement(K().Fragment, null))
            },
            parseCallback: function(e, t, n) {
                return function(e) {
                    if (e && "object" == typeof e && (e.actionType && e.actionParams && sa[e.actionType]))
                        return !0;
                    return !1
                }(e) ? function() {
                    return ua(e, t, n)
                }
                : (Di(Pi.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(e) + " to parse callback"),
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
                        image: K().createElement(K().Fragment, null),
                        title: "Hero Unit Asset Title",
                        subtitle: "Hero Unit Asset Subtitle"
                    };
                var t = ga(e.image);
                return _a(_a({}, e), {
                    image: t
                })
            },
            parseAssetUrl: ha,
            parseAssetUrlIntoComponent: ga,
            parseGradient: function(e) {
                if (!(t = e) || "object" != typeof t || (!t.startColor || "string" != typeof t.startColor || !t.endColor || "string" != typeof t.endColor || void 0 === t.startOpacity || "number" != typeof t.startOpacity || void 0 === t.endOpacity || "number" != typeof t.endOpacity || void 0 === t.degree || "number" != typeof t.degree))
                    return Di(Pi.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e)),
                    xa;
                var t = _a(_a({}, e), {
                    degree: (e.degree - 90 + 360) % 360
                });
                return e.startColor.startsWith("#") || (t.startColor = "#" + e.startColor),
                e.endColor.startsWith("#") || (t.endColor = "#" + e.endColor),
                t
            },
            parseFoundationNumberToken: function(e, t, n) {
                if ("number" == typeof e)
                    return e;
                n = ya(e, n.dependencies.tokens);
                if (void 0 !== n && "number" == typeof n)
                    return n;
                Di(Pi.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + " for token " + JSON.stringify(n) + " with input " + JSON.stringify(e) + ". Expected number.")
            },
            parseFoundationTypographyToken: function(e, t, n) {
                if (ba(e))
                    return e;
                n = ya(e, n.dependencies.tokens);
                if (void 0 !== n && ba(n))
                    return n;
                Di(Pi.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected TypographyToken.")
            },
            parseColorValue: function(e, t, n) {
                if ("string" == typeof (r = e) && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(r))
                    return e;
                var r;
                if ("string" == typeof (r = e) && /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(r))
                    return "#" + e;
                n = Sa(e, 0, n);
                if (n)
                    return n;
                Di(Pi.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value. Input must be a hex color or a foundation color token.")
            },
            parseUDim2: function(e) {
                if (Ea(e))
                    return e;
                var t = Pa(e);
                if (Ea(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = Pa(t);
                    if (Ea(t))
                        return t;
                    Di(Pi.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string with 4 comma-separated values.")
                } else
                    Di(Pi.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string.")
            },
            parseAutomaticSize: function(e) {
                if (e && "string" == typeof e)
                    switch (e) {
                    case pa.X:
                        return pa.X;
                    case pa.Y:
                        return pa.Y;
                    case pa.XY:
                        return pa.XY;
                    case pa.None:
                        return pa.None;
                    default:
                        return void Di(Pi.SduiParseAutomaticSizeInvalidInput, "Invalid automatic size " + JSON.stringify(e) + ". Expected one of " + Object.values(pa).join(", ") + ".")
                    }
                else
                    Di(Pi.SduiParseAutomaticSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for automatic size. Input must be a string.")
            }
        }, Na = function() {
            return (Na = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Oa = function(o, i, a, l, e) {
            var t = La[o]
              , s = Na({}, i)
              , u = null != e ? e : null == t ? void 0 : t.propParsers;
            return u && Object.keys(i).forEach(function(e) {
                var t, n = i[e], r = u[e];
                void 0 !== n && r && ("function" == typeof r ? void 0 !== (t = r(n, a, l)) ? s[e] = t : Di(Pi.PropParseFailure, "Failed to parse prop " + e + " with value " + JSON.stringify(n) + " for component " + o) : "object" == typeof r ? "object" == typeof (t = n) && null !== t && Object.keys(t).every(function(e) {
                    return "string" == typeof e
                }) ? s[e] = Oa(o, n, a, l, r) : Di(Pi.NestedPropParseFailure, "Expected a nested object for prop " + e + " with value " + JSON.stringify(n) + " using for component " + o) : Di(Pi.PropParserNotFound, "Prop parser not found for prop " + e + " and component " + o))
            }),
            s
        }, ka = function() {
            return (ka = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Ra = function(r) {
            var e = K().memo(function(n) {
                return (0,
                Y.useMemo)(function() {
                    var e = Ca(n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.responsivePropOverrides)
                      , t = e.props
                      , e = e.children;
                    return K().createElement(r, t, e)
                }, [n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.responsivePropOverrides])
            });
            return e.displayName = "SduiWrapped" + (r.displayName || r.name),
            e
        };
        (sr = Ta = Ta || {}).SingleItemCollection = "SingleItemCollection",
        sr.VerticalFeed = "VerticalFeed",
        sr.HeroUnit = "HeroUnit",
        sr.PlayButton = "PlayButton";
        var Da, La = ((sr = {})[Ta.SingleItemCollection] = {
            component: Ra(re),
            propParsers: {}
        },
        sr[Ta.VerticalFeed] = {
            component: Ra(ee),
            propParsers: {}
        },
        sr[Ta.PlayButton] = {
            component: Ra(ve),
            propParsers: {}
        },
        sr[Ta.HeroUnit] = {
            component: Ra(ot),
            propParsers: {
                backgroundComponent: la.parseUiComponent,
                bottomRowComponent: la.parseUiComponent,
                ctaButtonComponent: la.parseUiComponent,
                headerComponent: la.parseUiComponent,
                onActivated: la.parseCallback,
                overlayComponent: la.parseUiComponent,
                asset: la.parseHeroUnitAsset,
                gradient: la.parseGradient,
                foregroundImage: la.parseAssetUrlIntoComponent,
                backgroundImage: la.parseAssetUrlIntoComponent
            }
        },
        sr), Ma = function(e) {
            return La[e] ? La[e].component : null
        };
        function Ua(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = (e = (0,
            Y.useState)(window.innerWidth))[0]
              , l = e[1];
            return (0,
            Y.useEffect)(function() {
                function e() {
                    l(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            e = (0,
            Y.useMemo)(function() {
                return Ha(n.responsiveProps, a)
            }, [n, a]),
            K().createElement(t, {
                componentConfig: n,
                parentAnalyticsContext: r,
                sduiContext: o,
                localAnalyticsData: i,
                responsivePropOverrides: e
            })
        }
        (la = Da = Da || {}).ImageQualityLevel = "imageQualityLevel",
        la.MaxWidth = "maxWidth";
        var Fa, Ba, ja = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }, Ga = ja.High, Ha = function(e, o) {
            if (!e)
                return {};
            e = e.find(function(e) {
                e = e.conditions;
                return !e || Object.entries(e).every(function(e) {
                    var t = e[0]
                      , n = e[1];
                    switch (t) {
                    case Da.ImageQualityLevel:
                        if (!Ni(n))
                            return Di(Pi.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        var r = ja[_i(n, "")];
                        return void 0 === r ? (Di(Pi.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + n.toString()),
                        !1) : Ga === r;
                    case Da.MaxWidth:
                        if (!Ni(n))
                            return Di(Pi.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        r = xi(n, -1);
                        return r < 0 ? (Di(Pi.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + n.toString()),
                        !1) : o <= r;
                    default:
                        return Di("UnknownResponsivePropConditionKey", "Unknown responsive prop condition key: " + t),
                        !1
                    }
                })
            });
            return e ? e.overrides : {}
        }, za = function(e) {
            var n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData;
            return (0,
            Y.useMemo)(function() {
                var e = n.componentType
                  , t = Ma(e);
                return t ? n.responsiveProps ? K().createElement(Ua, {
                    wrappedComponent: t,
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i
                }) : K().createElement(t, {
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i
                }) : (Di(Pi.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(n)),
                K().createElement(K().Fragment, null))
            }, [n, r, o, i])
        }, sr = (Fa = function(e, t) {
            return (Fa = Object.setPrototypeOf || {
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
            Fa(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        function Va(e) {
            e = Ba.call(this, e) || this;
            return e.state = {
                hasError: !1
            },
            e
        }
        function Wa(e) {
            var n = e.sort
              , r = e.sduiRoot
              , o = e.currentPage
              , i = dn()
              , a = Ja()
              , t = (0,
            Y.useMemo)(function() {
                var e = ma(r, n.feedItemKey);
                if (!e)
                    return K().createElement(K().Fragment, null);
                var t = $a({}, function(e, t) {
                    var n;
                    switch (t) {
                    case Z.HomePage:
                        return (n = {})[ro.HomePageSessionInfo] = e,
                        n;
                    case Z.GamesPage:
                        return (n = {})[ro.DiscoverPageSessionInfo] = e,
                        n;
                    default:
                        return Di(Pi.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (t ? JSON.stringify(t) : "undefined") + " with session info: " + e),
                        {}
                    }
                }(i, o));
                return K().createElement("div", {
                    className: "sdui-feed-item-container"
                }, K().createElement(za, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: t,
                    sduiContext: a
                }))
            }, [n, r, i, o, a])
              , e = (0,
            Y.useCallback)(function(e, t) {
                Di(Pi.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(n) + " and sdui root " + JSON.stringify(r) + " with error message " + e + " and callstack " + t)
            }, [n, r]);
            return K().createElement(qa, {
                fallback: K().createElement(K().Fragment, null),
                logError: e
            }, t)
        }
        var qa = (Ba = K().Component,
        sr(Va, Ba),
        Va.getDerivedStateFromError = function() {
            return {
                hasError: !0
            }
        }
        ,
        Va.prototype.componentDidCatch = function(e, t) {
            e = e.message,
            t = t.componentStack;
            (0,
            this.props.logError)(e, t)
        }
        ,
        Va.prototype.render = function() {
            var e = this.state.hasError
              , t = this.props
              , n = t.fallback
              , t = t.children;
            return e ? n : t
        }
        ,
        Va)
          , Ja = function() {
            var e = (0,
            p.useTokens)()
              , t = (0,
            Y.useMemo)(function() {
                return {
                    tokens: e
                }
            }, [e]);
            return (0,
            Y.useMemo)(function() {
                return {
                    dependencies: t
                }
            }, [t])
        }
          , $a = function() {
            return ($a = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Ya() {
            return K().createElement("div", {
                className: "grid-item-container game-card-container game-card-loading"
            }, K().createElement("div", {
                className: "game-card-thumb-container shimmer"
            }), K().createElement("div", {
                className: "game-card-name game-name-title shimmer"
            }), K().createElement("div", {
                className: "game-card-name game-name-title game-name-title-half shimmer"
            }))
        }
        function Ka(o) {
            var i = dn();
            (0,
            Y.useEffect)(function() {
                var t = window.scrollY
                  , e = be(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    Sn({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: b.Vertical,
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
        (la = function(e) {
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
                return K().createElement(kr, {
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
                return K().createElement(Nr, {
                    sort: n
                });
            case w.SortlessGrid:
                return K().createElement($r, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: i,
                    startingRow: a,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c
                });
            case w.FriendCarousel:
                return K().createElement(hi, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case w.Pills:
                return K().createElement(Ci, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: v
                });
            case w.Sdui:
                return K().createElement(Wa, {
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
        var Za = la
          , Qa = function(e, o, r) {
            var t = (0,
            Y.useState)(new Map)
              , i = t[0]
              , n = t[1]
              , t = (0,
            Y.useState)(new Map)
              , s = t[0]
              , a = t[1]
              , l = (0,
            p.usePrevious)(s)
              , u = (0,
            p.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            Y.useEffect)(function() {
                void 0 !== l && (0,
                Yr.isEqual)(s, l) && (0,
                Yr.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
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
            Y.useMemo)(function() {
                var n = new Map
                  , r = 0;
                return null != e && e.sorts.forEach(function(e, t) {
                    r && n.set(t, r);
                    t = function(e, t) {
                        if (void 0 === e.numberOfRows)
                            return (0,
                            S.fireEvent)(qe.missingNumberOfRowsForLoggingErrorEvent),
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
            Y.useRef)(null)
              , d = (0,
            Y.useCallback)(function(e, t) {
                if (o || e.treatmentType === w.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, o, i) {
                        var a = n ? (r ? Pt : Et)[n] : Ct;
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
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === $.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === $.EventTile ? t && t < qe.wideGameTileTilesPerRowBreakpointWidth ? qe.minWideGameTilesPerCarouselPage : qe.maxWideGameTilesPerCarouselPage : t && t < qe.homeFeedMaxWidth ? Math.max(1, Math.floor(t / qe.gameTileWidth)) : qe.maxTilesPerCarouselPage
            }, [o, r])
              , f = (0,
            Y.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === w.SortlessGrid || e.treatmentType === w.InterestGrid || o && e.treatmentType === w.Carousel) && r.set(t, d(e, n))
                }),
                a(r)
            }, [null == e ? void 0 : e.sorts, d, o]);
            return (0,
            Y.useLayoutEffect)(function() {
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
          , Xa = function() {
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
          , sr = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , el = (y.EnvironmentUrls.apiGatewayUrl,
        y.EnvironmentUrls.voiceApi);
        function tl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var nl = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(el, "/v1/settings/user-opt-in")
                            },
                            o = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            O.httpService.post(r, o);
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
                        tl(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        tl(r, t, n, o, i, "throw", e)
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
        function rl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function ol(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function il(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? ol(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : ol(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function al(e, n) {
            switch (e) {
            case "ContactMethodEmail":
                return {
                    primaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    }
                };
            case "ContactMethodPhoneNumber":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberVoiceOptIn":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: function(e) {
                            return null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderPhoneUpsell(il({
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
                                                nl(!0, !1);
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
                                            rl(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            rl(r, t, n, o, i, "throw", e)
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
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: pl
                };
            case "ContactMethodPhoneNumberEmailVerticalLayout":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmailAddress",
                        onClick: null === y.UpsellService || void 0 === y.UpsellService ? void 0 : y.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: fl
                };
            case "FacebookSunset":
                return {
                    primaryButton: {
                        text: "Action.SetPassword",
                        onClick: null === y.FacebookSunsetService || void 0 === y.FacebookSunsetService ? void 0 : y.FacebookSunsetService.openFacebookSunsetModal,
                        buttonClickBtnLog: "setPassword"
                    }
                };
            default:
                return null
            }
        }
        var ll = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , sl = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , ul = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , cl = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , dl = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , fl = "vertical"
          , pl = "horizontal"
          , ml = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function vl(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function hl(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? vl(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : vl(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function gl(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            E.eventStreamService.sendEventWithTarget(e.type, cl[n], hl(hl({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var la = E.eventStreamService.eventTypes
          , yl = "mandatory"
          , bl = "homepage"
          , Il = {
            cardShown: {
                name: "cardShown",
                type: la.modalAction,
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
        function wl(e, t) {
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
                    return Sl(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Sl(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Sl(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function El(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = wl((0,
            Y.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = dl[n];
            (0,
            Y.useEffect)(function() {
                gl(Il.cardShown, r, n, c)
            }, []);
            var e = al(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? K().createElement(ge.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    gl(Il.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , a = f ? K().createElement(ge.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    gl(Il.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : pl
              , a = K().createElement("div", {
                className: e === pl ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = Pl(o) ? t(sl[n]) : o
              , i = Pl(i) ? t(ul[n]) : i
              , o = K().createElement("div", {
                className: "upsell-card-text-content-group"
            }, sl[n] ? K().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, K().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = ml[n] ? K().createElement("div", {
                className: "home-page-upsell-card-image ".concat(ml[n])
            }) : null;
            return s ? null : K().createElement("div", {
                className: "home-page-upsell-card-banner-container"
            }, K().createElement("div", {
                className: "banner-contents"
            }, K().createElement("div", {
                className: "icon-and-text"
            }, i, K().createElement("div", {
                className: "banner-content-container"
            }, o)), K().createElement("div", {
                className: "add-email-btn-container"
            }, a), K().createElement("div", {
                id: "facebookSunsetModal-container"
            })))
        }
        function Pl(e) {
            return !e || 0 === e.length
        }
        El.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        El.propTypes = {
            translate: it().func.isRequired,
            cardType: it().string.isRequired,
            titleTextOverride: it().string,
            bodyTextOverride: it().string,
            origin: it().string,
            requireExplicitVoiceConsent: it().bool
        };
        var Cl = El
          , Tl = function(e) {
            return !![ll.ContactMethodEmail, ll.ContactMethodPhoneNumber, ll.ContactMethodPhoneNumberEmailHorizontalLayout, ll.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, ll.ContactMethodPhoneNumberEmailVerticalLayout, ll.ContactMethodPhoneNumberVoiceOptIn, ll.FacebookSunset].includes(e)
        };
        function _l(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function xl(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        _l(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        _l(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function Al(e, t) {
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
                    return Nl(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Nl(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Nl(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Ol(e) {
            var t = e.translate
              , n = ll.ContactMethodMandatoryEmailPhone
              , r = Al((0,
            Y.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = Al((0,
            Y.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = Al((0,
            Y.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = Al((0,
            Y.useState)(!1), 2)
              , e = a[0]
              , c = a[1]
              , a = Al((0,
            Y.useState)(!1), 2);
            a[0],
            a[1];
            return (0,
            Y.useEffect)(function() {
                var e = function() {
                    var e = xl(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    y.HomePageUpsellCardService.getHomePageUpsellCardVariation();
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
                    var e = xl(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    y.HomePageUpsellCardService.getVoicePolicy();
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
            Y.useEffect)(function() {
                o === n && null !== y.UpsellService && void 0 !== y.UpsellService && y.UpsellService.renderContactMethodPromptModal({
                    origin: bl,
                    section: yl
                })
            }, [o]),
            Tl(o) ? K().createElement(Cl, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        Ol.propTypes = {
            translate: it().func.isRequired
        };
        var kl = Ol;
        function Rl(e) {
            var t = e.translate
              , e = e.context;
            return K().createElement(kl, {
                translate: t,
                context: e
            })
        }
        function Dl(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            Y.useRef)(null), u = (0,
            Y.useRef)(null), c = Er().contentMetadata, d = (0,
            Y.useMemo)(function() {
                return Pn(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
            Y.useCallback)(function(t) {
                var e = null == d ? void 0 : d.findIndex(function(e) {
                    return e.universeId === t
                });
                if (void 0 !== e && -1 !== e) {
                    var n, r = d[e];
                    return (n = {})[R.ButtonName] = P.Interested,
                    n[R.PlaceId] = r.placeId,
                    n[R.UniverseId] = t,
                    n[R.Position] = e,
                    n[R.GameSetTypeId] = o.topicId,
                    n[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[R.Page] = Z.InterestCatcher,
                    n[U.HomePageSessionInfo] = a,
                    n[R.IsInterested] = !i.has(t),
                    n
                }
            }, [i, d, a, o.topicId]), p = (0,
            Y.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = X.interestCatcherClick(e);
                void 0 !== e && E.eventStreamService.sendEvent.apply(E.eventStreamService, e)
            }, [r, f]), e = (0,
            Y.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return jl(jl(jl(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), z(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), W(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[R.AbsPositions] = t,
                    e[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[R.GameSetTypeId] = o.topicId,
                    e[R.Page] = Z.InterestCatcher,
                    e[U.HomePageSessionInfo] = a,
                    e))
                }
            }, [d, a, o.topicId, null === (t = null == o ? void 0 : o.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return pn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            Y.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            K().createElement(Vr, {
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
        function Ll(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            Y.useState)(new Set))[0]
              , a = f[1]
              , l = dn()
              , s = (0,
            Y.useCallback)(function(e) {
                var t = {};
                return t[R.ButtonName] = e,
                t[U.HomePageSessionInfo] = l,
                t[R.InterestedUniverseIds] = Array.from(i),
                t[R.Page] = Z.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            Y.useCallback)(function(e) {
                e = s(e),
                e = X.interestCatcherClick(e);
                void 0 !== e && E.eventStreamService.sendEvent.apply(E.eventStreamService, e)
            }, [s])
              , c = (0,
            Y.useCallback)(function() {
                r([]),
                u(P.Skip)
            }, [r, u])
              , d = (0,
            Y.useCallback)(function() {
                r(Array.from(i)),
                u(P.Continue)
            }, [i, r, u])
              , e = (0,
            Y.useMemo)(function() {
                return null != i && i.size ? o(nt.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(nt.ActionInterestCatcherContinue)
            }, [i, o])
              , f = (0,
            Y.useCallback)(function(e) {
                var t, n;
                null === e || void 0 === (null === (n = e.getBoundingClientRect()) || void 0 === n ? void 0 : n.top) || (n = document.getElementById("header")) && null !== (t = n.getBoundingClientRect()) && void 0 !== t && t.height && (n = n.getBoundingClientRect().height,
                window.scrollTo({
                    top: e.getBoundingClientRect().top + window.scrollY - n
                }))
            }, []);
            return K().createElement("div", {
                ref: f,
                className: "interest-catcher-container",
                "data-testid": "interest-catcher-container"
            }, K().createElement("div", {
                className: "header-container"
            }, K().createElement("div", {
                className: "header-text-container"
            }, K().createElement("h1", {
                className: "header-text"
            }, t.topic), K().createElement("span", {
                className: "header-subtext"
            }, t.subtitle)), K().createElement("div", {
                className: "header-buttons-container"
            }, !(null != i && i.size) && K().createElement(ge.Button, {
                variant: ge.Button.variants.secondary,
                size: ge.Button.sizes.medium,
                title: o(nt.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, o(nt.ActionInterestCatcherSkip)), K().createElement(ge.Button, {
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != i && i.size),
                className: "continue-button"
            }, e))), K().createElement(Dl, {
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
        function Ml(e) {
            var t = e.children
              , n = (0,
            Y.useState)(null)
              , e = n[0]
              , r = n[1];
            return (0,
            Y.useEffect)(function() {
                Yl().then(function(e) {
                    null != (null == e ? void 0 : e.data) && r(e.data)
                }, function(e) {
                    console.error(e)
                })
            }, []),
            K().createElement(Kl.Provider, {
                value: e
            }, t)
        }
        Rl.defaultProps = {
            context: ll.ContactMethod
        },
        Rl.propTypes = {
            translate: it().func.isRequired,
            context: it().string
        };
        var Ul, Fl, Bl = (0,
        p.withTranslations)(Rl, sr), jl = function() {
            return (jl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Gl = function() {
            return (Gl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Hl = qe.maxTilesPerCarouselPage, zl = n, Vl = t, Wl = (Ul = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = dn()
              , r = (0,
            Y.useState)(void 0)
              , o = r[0]
              , i = r[1]
              , a = (0,
            Y.useState)(!1)
              , l = a[0]
              , s = a[1]
              , u = (0,
            Y.useMemo)(function() {
                return Xa()
            }, [])
              , c = (0,
            Y.useMemo)(function() {
                try {
                    return (0,
                    E.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            Y.useCallback)(function(e) {
                i(void 0),
                s(!1),
                fe(we.Home, t, u, c, e).then(function(e) {
                    i(e),
                    (0,
                    S.fireEvent)(qe.omniRecommendationEndpointSuccessEvent)
                }).catch(function() {
                    s(!0),
                    (0,
                    S.fireEvent)(qe.omniRecommendationEndpointErrorEvent)
                })
            }, [t, u, c]);
            (0,
            Y.useEffect)(function() {
                d()
            }, [d]);
            var f = (0,
            Y.useState)(void 0)
              , e = f[0]
              , p = f[1];
            (0,
            Y.useEffect)(function() {
                de(zl.homePageWeb, Vl.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(Vl.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , v = null == e ? void 0 : e.IsCarouselHorizontalScrollEnabled
              , h = null == e ? void 0 : e.IsNewScrollArrowsEnabled
              , r = (0,
            Y.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && Gl(Gl({}, e), {
                        contentMetadata: ((t = {})[I.Game] = Gl(Gl({}, e.contentMetadata[I.Game]), n[I.Game]),
                        t[I.CatalogAsset] = Gl(Gl({}, e.contentMetadata[I.CatalogAsset]), n[I.CatalogAsset]),
                        t[I.CatalogBundle] = Gl(Gl({}, e.contentMetadata[I.CatalogBundle]), n[I.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , a = Qa(o, m, v)
              , f = a.homeFeedRef
              , g = a.gridRecommendationsMap
              , y = a.itemsPerRowMap
              , b = a.startingRowNumbersMap;
            Ka(Z.HomePage);
            e = (0,
            Y.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== w.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            a = (0,
            Y.useMemo)(function() {
                return null == o ? void 0 : o.sorts.findIndex(function(e) {
                    return e.treatmentType === w.InterestGrid
                })
            }, [null == o ? void 0 : o.sorts]);
            if (l)
                return K().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, K().createElement("h2", null, n(et.LabelGames)), K().createElement(Pe, {
                    errorMessage: n(et.LabelApiError),
                    onRefresh: function() {
                        return d()
                    }
                }));
            if (void 0 === o)
                return K().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, K().createElement("div", {
                    className: "game-home-page-loading-title shimmer"
                }), K().createElement("div", {
                    className: "game-home-page-loading-carousel"
                }, Array.from({
                    length: Hl
                }, function(e, t) {
                    return K().createElement(Ya, {
                        key: t
                    })
                })));
            if (void 0 !== a && -1 < a) {
                l = o.sorts[a];
                if (l && Cn(l))
                    return K().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, K().createElement("div", {
                        ref: f
                    }, K().createElement(Pr.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: r
                        }
                    }, K().createElement(Ll, {
                        sort: l,
                        itemsPerRow: y.get(a),
                        fetchRecommendations: d,
                        translate: n
                    }))))
            }
            return K().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, K().createElement("div", {
                ref: f
            }, K().createElement(Pr.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: r
                }
            }, K().createElement(Bl, {
                translate: n,
                context: void 0
            }), e && K().createElement(vi, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return K().createElement(K().Fragment, {
                    key: t
                }, K().createElement(Za, {
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
        }, It),
        function(e) {
            return K().createElement(cn, null, K().createElement(Ul, mn({}, e)))
        }
        ), ql = function(e, a, l, s) {
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
        }, Jl = function(n, r) {
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
        }, $l = y.EnvironmentUrls.userModerationApi + "/v1/reminder", Yl = function() {
            return ql(void 0, void 0, Promise, function() {
                var t;
                return Jl(this, function(e) {
                    return t = {
                        url: $l,
                        withCredentials: !0
                    },
                    [2, O.httpService.get(t)]
                })
            })
        }, Kl = (0,
        Y.createContext)(null), Zl = {
            common: [],
            feature: "Feature.Home"
        }, Ql = function(e, t) {
            var n = e.contentVariant
              , e = e.policyViolation
              , r = "";
            switch (n) {
            case "positive":
                r = t("Experiment.Reminders.BodyPositiveVariant");
                break;
            case "warning":
                r = t("Experiment.Reminders.BodyWarningVariant")
            }
            return {
                dialogTitle: t("Experiment.Reminders.Title"),
                dialogBodyAbuseType: t("Experiment.Reminders.BodyShared", {
                    policy_violation: t(e)
                }),
                dialogBodyGuidelineReminder: r,
                confirmationButtonLabel: t("Experiment.Reminders.Button")
            }
        };
        function Xl() {
            var e = (s = (0,
            Y.useState)(!1))[0]
              , t = s[1]
              , n = (0,
            Y.useContext)(Kl)
              , r = (0,
            Y.useRef)(0)
              , o = y.CurrentUser.userId;
            (0,
            Y.useEffect)(function() {
                r.current = Date.now()
            }, []);
            var i = (0,
            p.useTranslation)().translate;
            if (null == n || null == n || !n.shouldSurfaceReminder || null == n || !n.policyViolation)
                return null;
            var a = n.interventionId
              , l = !e && (null == n ? void 0 : n.shouldSurfaceReminder)
              , s = (u = Ql(n, i)).dialogTitle
              , e = u.dialogBodyAbuseType
              , i = u.dialogBodyGuidelineReminder
              , u = u.confirmationButtonLabel;
            return K().createElement(ge.Modal, {
                className: "reminder-of-norms-dialog-modal",
                show: l,
                onHide: function() {
                    var e = Date.now();
                    es(a, Fl.DISMISSED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, K().createElement(ge.Modal.Header, {
                className: "reminder-of-norms-dialog-title",
                title: s,
                showCloseButton: !1
            }), K().createElement(ge.Modal.Body, {
                className: "reminder-of-norms-dialog-body"
            }, K().createElement("p", {
                className: "dialog-body-abuse-type"
            }, e), K().createElement("p", {
                className: "dialog-body-guideline-reminder"
            }, i)), K().createElement(ge.Modal.Footer, null, K().createElement(ge.Button, {
                className: "reminder-of-norms-confirm-button",
                onClick: function() {
                    var e = Date.now();
                    es(a, Fl.CTA_CLICKED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, u)))
        }
        (It = Fl = Fl || {}).CTA_CLICKED = "REMINDER_INTERACTION_CTA_CLICKED",
        It.DISMISSED = "REMINDER_INTERACTION_REMINDER_DISMISSED";
        var es = function(e, t, n, r, o, i, a) {
            y.EventStream.SendEventWithTarget("HomePageRemindersEvent", "WebApp", {
                user_id: r,
                source_intervention_id: e,
                reminder_number: n,
                timestamp_milliseconds: o,
                time_to_interact_seconds: i,
                interaction: t,
                platform: "PLATFORM_WEB",
                experiment_variant: a
            }, y.EventStream.TargetTypes.WWW)
        };
        function ts() {
            return K().createElement(p.TranslationProvider, {
                config: Zl
            }, K().createElement(Ml, null, K().createElement(Xl, null)))
        }
        var ns = (0,
        p.withTranslations)(function(e) {
            e = e.translate;
            return K().createElement("div", {
                id: "HomeContainer",
                className: "row home-container expand-max-width"
            }, K().createElement("div", {
                className: "section"
            }, K().createElement("div", {
                className: "col-xs-12 container-header"
            }, K().createElement("h1", null, e(tt.LabelsHome)))), K().createElement("div", null, K().createElement(ts, null)), K().createElement("div", {
                className: "place-list-container"
            }, K().createElement(Wl, null)))
        }, {
            common: [],
            feature: "CommonUI.Features"
        });
        (0,
        O.ready)(function() {
            c() ? (0,
            e.render)(K().createElement(Wl, null), c()) : document.getElementById("places-list-web-app") && document.getElementById("content") ? (0,
            e.render)(K().createElement(ns, null), document.getElementById("content")) : (0,
            S.fireEvent)("HomePageMissingContainerDiv")
        })
    }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/95e43a23588e7b437a70ee556c790501-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
