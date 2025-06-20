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
        8601: function(e, t, n) {
            function y() {
                return d.Date.now()
            }
            var o = NaN
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
              , I = Math.min;
            function S(e) {
                var t = typeof e;
                return e && ("object" == t || "function" == t)
            }
            function C(e) {
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
            e.exports = function(r, n, e) {
                var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                if ("function" != typeof r)
                    throw new TypeError("Expected a function");
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
                    var e, t = y();
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
                    var e = y()
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
                return n = C(n) || 0,
                S(e) && (d = !!e.leading,
                f = "maxWait"in e,
                a = f ? b(C(e.maxWait) || 0, n) : a,
                t = "trailing"in e ? !!e.trailing : t),
                g.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                    o = u = i = s = void (c = 0)
                }
                ,
                g.flush = function() {
                    return void 0 === s ? l : h(y())
                }
                ,
                g
            }
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
              , S = function() {
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
                    var e, t = S();
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
                    var e = S()
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
                return n = w(n) || 0,
                C(e) && (d = !!e.leading,
                f = "maxWait"in e,
                a = f ? b(w(e.maxWait) || 0, n) : a,
                t = "trailing"in e ? !!e.trailing : t),
                g.cancel = function() {
                    void 0 !== s && clearTimeout(s),
                    o = u = i = s = void (c = 0)
                }
                ,
                g.flush = function() {
                    return void 0 === s ? l : h(S())
                }
                ,
                g
            }
            function C(e) {
                var t = typeof e;
                return e && ("object" == t || "function" == t)
            }
            function w(e) {
                if ("number" == typeof e)
                    return e;
                if ("symbol" == typeof (t = e) || !!(n = t) && "object" == typeof n && f.call(t) == i)
                    return o;
                var t, n;
                if (C(e) && (e = C(r = "function" == typeof e.valueOf ? e.valueOf() : e) ? r + "" : r),
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
                return C(n) && (r = "leading"in n ? !!n.leading : r,
                o = "trailing"in n ? !!n.trailing : o),
                p(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: o
                })
            }
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
        5250: function(k, N, A) {
            var R;
            /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
            k = A.nmd(k),
            function() {
                var Hi, zi = "Expected a function", Wi = "__lodash_hash_undefined__", Vi = "__lodash_placeholder__", qi = 128, Ji = 9007199254740991, $i = NaN, Ki = 4294967295, Xi = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Yi = "[object Arguments]", Zi = "[object Array]", Qi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", va = "[object Float32Array]", ha = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", Ia = "[object Uint8Array]", Sa = "[object Uint8ClampedArray]", Ca = "[object Uint16Array]", wa = "[object Uint32Array]", Ea = /\b__p \+= '';/g, Pa = /\b(__p \+=) '' \+/g, xa = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ta = /&(?:amp|lt|gt|quot|#39);/g, _a = /[&<>"']/g, Oa = RegExp(Ta.source), ka = RegExp(_a.source), Na = /<%-([\s\S]+?)%>/g, Aa = /<%([\s\S]+?)%>/g, Ra = /<%=([\s\S]+?)%>/g, La = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Da = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fa = /[\\^$.*+?()[\]{}|]/g, Ua = RegExp(Fa.source), Ba = /^\s+/, n = /\s/, Ga = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ja = /\{\n\/\* \[wrapped with (.+)\] \*/, Ha = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Wa = /[()=,{}\[\]\/\s]/, Va = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ja = /\w*$/, $a = /^[-+]0x[0-9a-f]+$/i, Ka = /^0b[01]+$/i, Xa = /^\[object .+?Constructor\]$/, Ya = /^0o[0-7]+$/i, Za = /^(?:0|[1-9]\d*)$/, Qa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", v = "[^" + e + l + f + r + o + i + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "[" + i + "]", S = "\\u200d", C = "(?:" + m + "|" + v + ")", l = "(?:" + I + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + h + ")" + "?", v = "[" + a + "]?", i = v + i + ("(?:" + S + "(?:" + [g, y, b].join("|") + ")" + v + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), w = RegExp(h + "(?=" + h + ")|" + u + i, "g"), ol = RegExp([I + "?" + m + "+" + r + "(?=" + [c, I, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, I + C, "$"].join("|") + ")", I + "?" + C + "+" + r, I + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), E = RegExp("[" + S + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
                sl[va] = sl[ha] = sl[ga] = sl[ya] = sl[ba] = sl[Ia] = sl[Sa] = sl[Ca] = sl[wa] = !0,
                sl[Yi] = sl[Zi] = sl[pa] = sl[Qi] = sl[ma] = sl[ea] = sl[ta] = sl[na] = sl[oa] = sl[ia] = sl[aa] = sl[sa] = sl[ua] = sl[ca] = sl[fa] = !1;
                var ul = {};
                ul[Yi] = ul[Zi] = ul[pa] = ul[ma] = ul[Qi] = ul[ea] = ul[va] = ul[ha] = ul[ga] = ul[ya] = ul[ba] = ul[oa] = ul[ia] = ul[aa] = ul[sa] = ul[ua] = ul[ca] = ul[da] = ul[Ia] = ul[Sa] = ul[Ca] = ul[wa] = !0,
                ul[ta] = ul[na] = ul[fa] = !1;
                var P = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }
                  , cl = parseFloat
                  , dl = parseInt
                  , t = "object" == typeof A.g && A.g && A.g.Object === Object && A.g
                  , a = "object" == typeof self && self && self.Object === Object && self
                  , fl = t || a || Function("return this")()
                  , a = N && !N.nodeType && N
                  , x = a && k && !k.nodeType && k
                  , pl = x && x.exports === a
                  , T = pl && t.process
                  , t = function() {
                    try {
                        var e = x && x.require && x.require("util").types;
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
                function Sl(e, t, n, r) {
                    for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
                        var a = e[o];
                        t(r, a, n(a), e)
                    }
                    return r
                }
                function Cl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function wl(e, t) {
                    for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function El(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (!t(e[n], n, e))
                            return !1;
                    return !0
                }
                function Pl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        t(a, n, e) && (i[o++] = a)
                    }
                    return i
                }
                function xl(e, t) {
                    return !!(null == e ? 0 : e.length) && -1 < Dl(e, t, 0)
                }
                function Tl(e, t, n) {
                    for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
                        if (n(t, e[r]))
                            return !0;
                    return !1
                }
                function _l(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r; )
                        o[n] = t(e[n], n, e);
                    return o
                }
                function Ol(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r; )
                        e[o + n] = t[n];
                    return e
                }
                function kl(e, t, n, r) {
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
                function Al(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var _ = Bl("length");
                function Rl(e, r, t) {
                    var o;
                    return t(e, function(e, t, n) {
                        if (r(e, t, n))
                            return o = t,
                            !1
                    }),
                    o
                }
                function Ll(e, t, n, r) {
                    for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
                        if (t(e[i], i, e))
                            return i;
                    return -1
                }
                function Dl(e, t, n) {
                    return t == t ? function(e, t, n) {
                        var r = n - 1
                          , o = e.length;
                        for (; ++r < o; )
                            if (e[r] === t)
                                return r;
                        return -1
                    }(e, t, n) : Ll(e, Fl, n)
                }
                function Ml(e, t, n, r) {
                    for (var o = n - 1, i = e.length; ++o < i; )
                        if (r(e[o], t))
                            return o;
                    return -1
                }
                function Fl(e) {
                    return e != e
                }
                function Ul(e, t) {
                    var n = null == e ? 0 : e.length;
                    return n ? jl(e, t) / n : $i
                }
                function Bl(t) {
                    return function(e) {
                        return null == e ? Hi : e[t]
                    }
                }
                function O(t) {
                    return function(e) {
                        return null == t ? Hi : t[e]
                    }
                }
                function Gl(e, r, o, i, t) {
                    return t(e, function(e, t, n) {
                        o = i ? (i = !1,
                        e) : r(o, e, t, n)
                    }),
                    o
                }
                function jl(e, t) {
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
                function Wl(t) {
                    return function(e) {
                        return t(e)
                    }
                }
                function Vl(t, e) {
                    return _l(e, function(e) {
                        return t[e]
                    })
                }
                function ql(e, t) {
                    return e.has(t)
                }
                function Jl(e, t) {
                    for (var n = -1, r = e.length; ++n < r && -1 < Dl(t, e[n], 0); )
                        ;
                    return n
                }
                function $l(e, t) {
                    for (var n = e.length; n-- && -1 < Dl(t, e[n], 0); )
                        ;
                    return n
                }
                var Kl = O({
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
                  , Xl = O({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function Yl(e) {
                    return "\\" + P[e]
                }
                function Zl(e) {
                    return E.test(e)
                }
                function Ql(e) {
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
                        a !== t && a !== Vi || (e[n] = Vi,
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
                    return (Zl(e) ? function(e) {
                        var t = w.lastIndex = 0;
                        for (; w.test(e); )
                            ++t;
                        return t
                    }
                    : _)(e)
                }
                function os(e) {
                    return Zl(e) ? e.match(w) || [] : e.split("")
                }
                function is(e) {
                    for (var t = e.length; t-- && n.test(e.charAt(t)); )
                        ;
                    return t
                }
                var as = O({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                });
                var ls = function e(t) {
                    var w = (t = null == t ? fl : ls.defaults(fl.Object(), t, ls.pick(fl, al))).Array
                      , n = t.Date
                      , d = t.Error
                      , f = t.Function
                      , o = t.Math
                      , v = t.Object
                      , p = t.RegExp
                      , c = t.String
                      , C = t.TypeError
                      , i = w.prototype
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
                      , I = p("^" + l.call(y).replace(Fa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , S = pl ? t.Buffer : Hi
                      , E = t.Symbol
                      , P = t.Uint8Array
                      , x = S ? S.allocUnsafe : Hi
                      , T = es(v.getPrototypeOf, v)
                      , _ = v.create
                      , O = m.propertyIsEnumerable
                      , k = i.splice
                      , N = E ? E.isConcatSpreadable : Hi
                      , A = E ? E.iterator : Hi
                      , R = E ? E.toStringTag : Hi
                      , L = function() {
                        try {
                            var e = Hn(v, "defineProperty");
                            return e({}, "", {}),
                            e
                        } catch (e) {}
                    }()
                      , D = t.clearTimeout !== fl.clearTimeout && t.clearTimeout
                      , M = n && n.now !== fl.Date.now && n.now
                      , F = t.setTimeout !== fl.setTimeout && t.setTimeout
                      , U = o.ceil
                      , B = o.floor
                      , G = v.getOwnPropertySymbols
                      , j = S ? S.isBuffer : Hi
                      , H = t.isFinite
                      , z = i.join
                      , W = es(v.keys, v)
                      , V = o.max
                      , q = o.min
                      , J = n.now
                      , $ = t.parseInt
                      , K = o.random
                      , X = i.reverse
                      , Y = Hn(t, "DataView")
                      , Z = Hn(t, "Map")
                      , Q = Hn(t, "Promise")
                      , ee = Hn(t, "Set")
                      , te = Hn(t, "WeakMap")
                      , ne = Hn(v, "create")
                      , re = te && new te
                      , oe = {}
                      , ie = hr(Y)
                      , ae = hr(Z)
                      , le = hr(Q)
                      , se = hr(ee)
                      , ue = hr(te)
                      , ce = E ? E.prototype : Hi
                      , de = ce ? ce.valueOf : Hi
                      , fe = ce ? ce.toString : Hi;
                    function pe(e) {
                        if (Lo(e) && !wo(e) && !(e instanceof ye)) {
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
                        if (_)
                            return _(e);
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
                    function Se(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.clear(); ++t < n; ) {
                            var r = e[t];
                            this.set(r[0], r[1])
                        }
                    }
                    function Ce(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.__data__ = new Se; ++t < n; )
                            this.add(e[t])
                    }
                    function we(e) {
                        e = this.__data__ = new Ie(e);
                        this.size = e.size
                    }
                    function Ee(e, t) {
                        var n, r = wo(e), o = !r && Co(e), i = !r && !o && To(e), a = !r && !o && !i && Ho(e), l = r || o || i || a, s = l ? Hl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Kn(n, u)) || s.push(n);
                        return s
                    }
                    function Pe(e) {
                        var t = e.length;
                        return t ? e[Ct(0, t - 1)] : Hi
                    }
                    function xe(e, t) {
                        return dr(rn(e), De(t, 0, e.length))
                    }
                    function Te(e) {
                        return dr(rn(e))
                    }
                    function _e(e, t, n) {
                        (n === Hi || bo(e[t], n)) && (n !== Hi || t in e) || Re(e, t, n)
                    }
                    function Oe(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== Hi || t in e) || Re(e, t, n)
                    }
                    function ke(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Ne(e, r, o, i) {
                        return Ge(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function Ae(e, t) {
                        return e && on(t, ci(t), e)
                    }
                    function Re(e, t, n) {
                        "__proto__" == t && L ? L(e, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: n,
                            writable: !0
                        }) : e[t] = n
                    }
                    function Le(e, t) {
                        for (var n = -1, r = t.length, o = w(r), i = null == e; ++n < r; )
                            o[n] = i ? Hi : ii(e, t[n]);
                        return o
                    }
                    function De(e, t, n) {
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
                        var c, d, f = wo(n);
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
                            var p = Vn(n)
                              , e = p == na || p == ra;
                            if (To(n))
                                return Yt(n, l);
                            if (p == aa || p == Yi || e && !t) {
                                if (a = s || e ? {} : Jn(n),
                                !l)
                                    return s ? (e = c = n,
                                    d = (d = a) && on(e, di(e), d),
                                    on(c, Wn(c), d)) : (d = Ae(a, c = n),
                                    on(c, zn(c), d))
                            } else {
                                if (!ul[p])
                                    return t ? n : {};
                                a = function(e, t, n) {
                                    var r = e.constructor;
                                    switch (t) {
                                    case pa:
                                        return Zt(e);
                                    case Qi:
                                    case ea:
                                        return new r(+e);
                                    case ma:
                                        return function(e, t) {
                                            t = t ? Zt(e.buffer) : e.buffer;
                                            return new e.constructor(t,e.byteOffset,e.byteLength)
                                        }(e, n);
                                    case va:
                                    case ha:
                                    case ga:
                                    case ya:
                                    case ba:
                                    case Ia:
                                    case Sa:
                                    case Ca:
                                    case wa:
                                        return Qt(e, n);
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
                        l = (i = i || new we).get(n);
                        if (l)
                            return l;
                        i.set(n, a),
                        Bo(n) ? n.forEach(function(e) {
                            a.add(Me(e, r, o, e, n, i))
                        }) : Do(n) && n.forEach(function(e, t) {
                            a.set(t, Me(e, r, o, t, n, i))
                        });
                        var m = f ? Hi : (u ? s ? Dn : Ln : s ? di : ci)(n);
                        return Cl(m || n, function(e, t) {
                            m && (e = n[t = e]),
                            Oe(a, t, Me(e, r, o, t, n, i))
                        }),
                        a
                    }
                    function Fe(e, t, n) {
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
                    function Ue(e, t, n) {
                        if ("function" != typeof e)
                            throw new C(zi);
                        return lr(function() {
                            e.apply(Hi, n)
                        }, t)
                    }
                    function Be(e, t, n, r) {
                        var o = -1
                          , i = xl
                          , a = !0
                          , l = e.length
                          , s = []
                          , u = t.length;
                        if (!l)
                            return s;
                        n && (t = _l(t, Wl(n))),
                        r ? (i = Tl,
                        a = !1) : 200 <= t.length && (i = ql,
                        a = !1,
                        t = new Ce(t));
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
                        evaluate: Aa,
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
                            return n === Wi ? Hi : n
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
                        n[e] = ne && t === Hi ? Wi : t,
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
                        return !((e = ke(t, e)) < 0) && (e == t.length - 1 ? t.pop() : k.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = ke(t, e)) < 0 ? Hi : t[e][1]
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return -1 < ke(this.__data__, e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = ke(n, e);
                        return r < 0 ? (++this.size,
                        n.push([e, t])) : n[r][1] = t,
                        this
                    }
                    ,
                    Se.prototype.clear = function() {
                        this.size = 0,
                        this.__data__ = {
                            hash: new be,
                            map: new (Z || Ie),
                            string: new be
                        }
                    }
                    ,
                    Se.prototype.delete = function(e) {
                        return e = Gn(this, e).delete(e),
                        this.size -= e ? 1 : 0,
                        e
                    }
                    ,
                    Se.prototype.get = function(e) {
                        return Gn(this, e).get(e)
                    }
                    ,
                    Se.prototype.has = function(e) {
                        return Gn(this, e).has(e)
                    }
                    ,
                    Se.prototype.set = function(e, t) {
                        var n = Gn(this, e)
                          , r = n.size;
                        return n.set(e, t),
                        this.size += n.size == r ? 0 : 1,
                        this
                    }
                    ,
                    Ce.prototype.add = Ce.prototype.push = function(e) {
                        return this.__data__.set(e, Wi),
                        this
                    }
                    ,
                    Ce.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    we.prototype.clear = function() {
                        this.__data__ = new Ie,
                        this.size = 0
                    }
                    ,
                    we.prototype.delete = function(e) {
                        var t = this.__data__
                          , e = t.delete(e);
                        return this.size = t.size,
                        e
                    }
                    ,
                    we.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    we.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    we.prototype.set = function(e, t) {
                        var n = this.__data__;
                        if (n instanceof Ie) {
                            var r = n.__data__;
                            if (!Z || r.length < 199)
                                return r.push([e, t]),
                                this.size = ++n.size,
                                this;
                            n = this.__data__ = new Se(r)
                        }
                        return n.set(e, t),
                        this.size = n.size,
                        this
                    }
                    ;
                    var Ge = sn($e)
                      , je = sn(Ke, !0);
                    function He(e, r) {
                        var o = !0;
                        return Ge(e, function(e, t, n) {
                            return o = !!r(e, t, n)
                        }),
                        o
                    }
                    function ze(e, t, n) {
                        for (var r = -1, o = e.length; ++r < o; ) {
                            var i, a, l = e[r], s = t(l);
                            null != s && (i === Hi ? s == s && !jo(s) : n(s, i)) && (i = s,
                            a = l)
                        }
                        return a
                    }
                    function We(e, r) {
                        var o = [];
                        return Ge(e, function(e, t, n) {
                            r(e, t, n) && o.push(e)
                        }),
                        o
                    }
                    function Ve(e, t, n, r, o) {
                        var i = -1
                          , a = e.length;
                        for (n = n || $n,
                        o = o || []; ++i < a; ) {
                            var l = e[i];
                            0 < t && n(l) ? 1 < t ? Ve(l, t - 1, n, r, o) : Ol(o, l) : r || (o[o.length] = l)
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
                    function Xe(t, e) {
                        return Pl(e, function(e) {
                            return ko(t[e])
                        })
                    }
                    function Ye(e, t) {
                        for (var n = 0, r = (t = Jt(t, e)).length; null != e && n < r; )
                            e = e[vr(t[n++])];
                        return n && n == r ? e : Hi
                    }
                    function Ze(e, t, n) {
                        t = t(e);
                        return wo(e) ? t : Ol(t, n(e))
                    }
                    function Qe(e) {
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
                        for (var r = n ? Tl : xl, o = e[0].length, i = e.length, a = i, l = w(i), s = 1 / 0, u = []; a--; ) {
                            var c = e[a];
                            a && t && (c = _l(c, Wl(t))),
                            s = q(c.length, s),
                            l[a] = !n && (t || 120 <= o && 120 <= c.length) ? new Ce(a && c) : Hi
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
                        t = null == (e = or(e, t = Jt(t, e))) ? e : e[vr(_r(t))];
                        return null == t ? Hi : Il(t, e, n)
                    }
                    function it(e) {
                        return Lo(e) && Qe(e) == Yi
                    }
                    function at(e, t, n, r, o) {
                        return e === t || (null == e || null == t || !Lo(e) && !Lo(t) ? e != e && t != t : function(e, t, n, r, o, i) {
                            var a = wo(e)
                              , l = wo(t)
                              , s = a ? Zi : Vn(e)
                              , u = l ? Zi : Vn(t)
                              , c = (s = s == Yi ? aa : s) == aa
                              , l = (u = u == Yi ? aa : u) == aa
                              , u = s == u;
                            if (u && To(e)) {
                                if (!To(t))
                                    return !1;
                                c = !(a = !0)
                            }
                            if (u && !c)
                                return i = i || new we,
                                a || Ho(e) ? An(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
                                    switch (n) {
                                    case ma:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                                            return !1;
                                        e = e.buffer,
                                        t = t.buffer;
                                    case pa:
                                        return e.byteLength == t.byteLength && i(new P(e), new P(t)) ? !0 : !1;
                                    case Qi:
                                    case ea:
                                    case ia:
                                        return bo(+e, +t);
                                    case ta:
                                        return e.name == t.name && e.message == t.message;
                                    case sa:
                                    case ca:
                                        return e == t + "";
                                    case oa:
                                        var l = Ql;
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
                                        l = An(l(e), l(t), r, o, i, a);
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
                                    return i = i || new we,
                                    o(c, l, n, r, i)
                                }
                            }
                            return u && (i = i || new we,
                            function(e, t, n, r, o, i) {
                                var a = 1 & n
                                  , l = Ln(e)
                                  , s = l.length
                                  , u = Ln(t).length;
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
                                var d, f = new we;
                                if (r && (d = r(u, c, s, e, t, f)),
                                !(d === Hi ? at(c, u, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function st(e) {
                        return !(!Ro(e) || (t = e,
                        u && u in t)) && (ko(e) ? I : Xa).test(hr(e));
                        var t
                    }
                    function ut(e) {
                        return "function" == typeof e ? e : null == e ? Li : "object" == typeof e ? wo(e) ? vt(e[0], e[1]) : mt(e) : Ui(e)
                    }
                    function ct(e) {
                        if (!er(e))
                            return W(e);
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
                          , i = Po(e) ? w(e.length) : [];
                        return Ge(e, function(e, t, n) {
                            i[++o] = r(e, t, n)
                        }),
                        i
                    }
                    function mt(t) {
                        var n = jn(t);
                        return 1 == n.length && n[0][2] ? nr(n[0][0], n[0][1]) : function(e) {
                            return e === t || lt(e, t, n)
                        }
                    }
                    function vt(n, r) {
                        return Yn(n) && tr(r) ? nr(vr(n), r) : function(e) {
                            var t = ii(e, n);
                            return t === Hi && t === r ? ai(e, n) : at(r, t, 3)
                        }
                    }
                    function ht(r, o, i, a, l) {
                        r !== o && qe(o, function(e, t) {
                            var n;
                            l = l || new we,
                            Ro(e) ? function(e, t, n, r, o, i, a) {
                                var l = ir(e, n)
                                  , s = ir(t, n)
                                  , u = a.get(s);
                                if (u)
                                    return _e(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : Hi, f = d === Hi;
                                f && (c = wo(s),
                                u = !c && To(s),
                                t = !c && !u && Ho(s),
                                d = s,
                                c || u || t ? d = wo(l) ? l : xo(l) ? rn(l) : u ? Yt(s, !(f = !1)) : t ? Qt(s, !(f = !1)) : [] : Fo(s) || Co(s) ? Co(d = l) ? d = Xo(l) : Ro(l) && !ko(l) || (d = Jn(s)) : f = !1),
                                f && (a.set(s, d),
                                o(d, s, r, i, a),
                                a.delete(s)),
                                _e(e, n, d)
                            }(r, o, t, i, ht, a, l) : ((n = a ? a(ir(r, t), e, t + "", r, o, l) : Hi) === Hi && (n = e),
                            _e(r, t, n))
                        }, di)
                    }
                    function gt(e, t) {
                        var n = e.length;
                        if (n)
                            return Kn(t += t < 0 ? n : 0, n) ? e[t] : Hi
                    }
                    function yt(e, r, n) {
                        r = r.length ? _l(r, function(t) {
                            return wo(t) ? function(e) {
                                return Ye(e, 1 === t.length ? t[0] : t)
                            }
                            : t
                        }) : [Li];
                        var o = -1;
                        return r = _l(r, Wl(Bn())),
                        function(e, t) {
                            var n = e.length;
                            for (e.sort(t); n--; )
                                e[n] = e[n].value;
                            return e
                        }(pt(e, function(t, e, n) {
                            return {
                                criteria: _l(r, function(e) {
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
                              , l = Ye(e, a);
                            n(l, a) && Tt(i, Jt(a, e), l)
                        }
                        return i
                    }
                    function It(e, t, n, r) {
                        var o = r ? Ml : Dl
                          , i = -1
                          , a = t.length
                          , l = e;
                        for (e === t && (t = rn(t)),
                        n && (l = _l(e, Wl(n))); ++i < a; )
                            for (var s = 0, u = t[i], c = n ? n(u) : u; -1 < (s = o(l, c, s, r)); )
                                l !== e && k.call(l, s, 1),
                                k.call(e, s, 1);
                        return e
                    }
                    function St(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || (Kn(o = i) ? k.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function Ct(e, t) {
                        return e + B(K() * (t - e + 1))
                    }
                    function wt(e, t) {
                        var n = "";
                        if (!e || t < 1 || Ji < t)
                            return n;
                        for (; t % 2 && (n += e),
                        (t = B(t / 2)) && (e += e),
                        t; )
                            ;
                        return n
                    }
                    function Et(e, t) {
                        return sr(rr(e, t, Li), e + "")
                    }
                    function Pt(e) {
                        return Pe(bi(e))
                    }
                    function xt(e, t) {
                        e = bi(e);
                        return dr(e, De(t, 0, e.length))
                    }
                    function Tt(e, t, n, r) {
                        if (!Ro(e))
                            return e;
                        for (var o = -1, i = (t = Jt(t, e)).length, a = i - 1, l = e; null != l && ++o < i; ) {
                            var s, u = vr(t[o]), c = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u)
                                return e;
                            o != a && (s = l[u],
                            (c = r ? r(s, u, l) : Hi) === Hi && (c = Ro(s) ? s : Kn(t[o + 1]) ? [] : {})),
                            Oe(l, u, c),
                            l = l[u]
                        }
                        return e
                    }
                    var _t = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : Li
                      , Ot = L ? function(e, t) {
                        return L(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Ai(t),
                            writable: !0
                        })
                    }
                    : Li;
                    function kt(e) {
                        return dr(bi(e))
                    }
                    function Nt(e, t, n) {
                        var r = -1
                          , o = e.length;
                        t < 0 && (t = o < -t ? 0 : o + t),
                        (n = o < n ? o : n) < 0 && (n += o),
                        o = n < t ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var i = w(o); ++r < o; )
                            i[r] = e[r + t];
                        return i
                    }
                    function At(e, r) {
                        var o;
                        return Ge(e, function(e, t, n) {
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
                                null !== a && !jo(a) && (n ? a <= t : a < t) ? r = 1 + i : o = i
                            }
                            return o
                        }
                        return Lt(e, t, Li, n)
                    }
                    function Lt(e, t, n, r) {
                        var o = 0
                          , i = null == e ? 0 : e.length;
                        if (0 === i)
                            return 0;
                        for (var a = (t = n(t)) != t, l = null === t, s = jo(t), u = t === Hi; o < i; ) {
                            var c = B((o + i) / 2)
                              , d = n(e[c])
                              , f = d !== Hi
                              , p = null === d
                              , m = d == d
                              , v = jo(d)
                              , d = a ? r || m : u ? m && (r || f) : l ? m && f && (r || !p) : s ? m && f && !p && (r || !v) : !p && !v && (r ? d <= t : d < t);
                            d ? o = c + 1 : i = c
                        }
                        return q(i, 4294967294)
                    }
                    function Dt(e, t) {
                        for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                            var a, l = e[n], s = t ? t(l) : l;
                            n && bo(s, a) || (a = s,
                            i[o++] = 0 === l ? 0 : l)
                        }
                        return i
                    }
                    function Mt(e) {
                        return "number" == typeof e ? e : jo(e) ? $i : +e
                    }
                    function Ft(e) {
                        if ("string" == typeof e)
                            return e;
                        if (wo(e))
                            return _l(e, Ft) + "";
                        if (jo(e))
                            return fe ? fe.call(e) : "";
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function Ut(e, t, n) {
                        var r = -1
                          , o = xl
                          , i = e.length
                          , a = !0
                          , l = []
                          , s = l;
                        if (n)
                            a = !1,
                            o = Tl;
                        else if (200 <= i) {
                            var u = t ? null : xn(e);
                            if (u)
                                return ns(u);
                            a = !1,
                            o = ql,
                            s = new Ce
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
                        return null == (e = or(e, t = Jt(t, e))) || delete e[vr(_r(t))]
                    }
                    function Gt(e, t, n, r) {
                        return Tt(e, t, n(Ye(e, t)), r)
                    }
                    function jt(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? Nt(e, r ? 0 : i, r ? i + 1 : o) : Nt(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        kl(t, function(e, t) {
                            return t.func.apply(t.thisArg, Ol([e], t.args))
                        }, e)
                    }
                    function zt(e, t, n) {
                        var r = e.length;
                        if (r < 2)
                            return r ? Ut(e[0]) : [];
                        for (var o = -1, i = w(r); ++o < r; )
                            for (var a = e[o], l = -1; ++l < r; )
                                l != o && (i[o] = Be(i[o] || a, e[l], t, n));
                        return Ut(Ve(i, 1), t, n)
                    }
                    function Wt(e, t, n) {
                        for (var r = -1, o = e.length, i = t.length, a = {}; ++r < o; ) {
                            var l = r < i ? t[r] : Hi;
                            n(a, e[r], l)
                        }
                        return a
                    }
                    function Vt(e) {
                        return xo(e) ? e : []
                    }
                    function qt(e) {
                        return "function" == typeof e ? e : Li
                    }
                    function Jt(e, t) {
                        return wo(e) ? e : Yn(e, t) ? [e] : mr(Yo(e))
                    }
                    var $t = Et;
                    function Kt(e, t, n) {
                        var r = e.length;
                        return n = n === Hi ? r : n,
                        !t && r <= n ? e : Nt(e, t, n)
                    }
                    var Xt = D || function(e) {
                        return fl.clearTimeout(e)
                    }
                    ;
                    function Yt(e, t) {
                        if (t)
                            return e.slice();
                        t = e.length,
                        t = x ? x(t) : new e.constructor(t);
                        return e.copy(t),
                        t
                    }
                    function Zt(e) {
                        var t = new e.constructor(e.byteLength);
                        return new P(t).set(new P(e)),
                        t
                    }
                    function Qt(e, t) {
                        t = t ? Zt(e.buffer) : e.buffer;
                        return new e.constructor(t,e.byteOffset,e.length)
                    }
                    function en(e, t) {
                        if (e !== t) {
                            var n = e !== Hi
                              , r = null === e
                              , o = e == e
                              , i = jo(e)
                              , a = t !== Hi
                              , l = null === t
                              , s = t == t
                              , u = jo(t);
                            if (!l && !u && !i && t < e || i && a && s && !l && !u || r && a && s || !n && s || !o)
                                return 1;
                            if (!r && !i && !u && e < t || u && n && o && !r && !i || l && n && o || !a && o || !s)
                                return -1
                        }
                        return 0
                    }
                    function tn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = n.length, l = -1, s = t.length, u = V(i - a, 0), c = w(s + u), d = !r; ++l < s; )
                            c[l] = t[l];
                        for (; ++o < a; )
                            (d || o < i) && (c[n[o]] = e[o]);
                        for (; u--; )
                            c[l++] = e[o++];
                        return c
                    }
                    function nn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = -1, l = n.length, s = -1, u = t.length, c = V(i - l, 0), d = w(c + u), f = !r; ++o < c; )
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
                        for (t = t || w(r); ++n < r; )
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
                            (o ? Re : Oe)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = wo(e) ? Sl : Ne
                              , r = i ? i() : {};
                            return n(e, o, Bn(t, 2), r)
                        }
                    }
                    function ln(l) {
                        return Et(function(e, t) {
                            var n = -1
                              , r = t.length
                              , o = 1 < r ? t[r - 1] : Hi
                              , i = 2 < r ? t[2] : Hi
                              , o = 3 < l.length && "function" == typeof o ? (r--,
                            o) : Hi;
                            for (i && Xn(t[0], t[1], i) && (o = r < 3 ? Hi : o,
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
                            if (!Po(e))
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
                            var t = Zl(e = Yo(e)) ? os(e) : Hi
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? Kt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return kl(ki(Ci(e).replace(nl, "")), t, "")
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
                            for (var t = arguments.length, n = w(t), r = t, o = Un(e); r--; )
                                n[r] = arguments[r];
                            o = t < 3 && n[0] !== o && n[t - 1] !== o ? [] : ts(n, o);
                            return (t -= o.length) < l ? En(i, a, hn, e.placeholder, Hi, n, o, Hi, Hi, l - t) : Il(this && this !== fl && this instanceof e ? s : i, this, n)
                        }
                    }
                    function mn(i) {
                        return function(e, t, n) {
                            var r, o = v(e);
                            Po(e) || (r = Bn(t, 3),
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
                                    throw new C(zi);
                                t && !l && "wrapper" == Fn(n) && (l = new ge([],!0))
                            }
                            for (e = l ? e : i; ++e < i; )
                                var r = Fn(n = o[e])
                                  , a = "wrapper" == r ? Mn(n) : Hi
                                  , l = a && Zn(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9] ? l[Fn(a[0])].apply(l, a[3]) : 1 == n.length && Zn(n) ? l[r]() : l.thru(n);
                            return function() {
                                var e = arguments
                                  , t = e[0];
                                if (l && 1 == e.length && wo(t))
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
                          , S = 512 & s
                          , C = b ? Hi : fn(l);
                        return function e() {
                            for (var t, n = w(a = arguments.length), r = a; r--; )
                                n[r] = arguments[r];
                            if (I && (t = function(e, t) {
                                for (var n = e.length, r = 0; n--; )
                                    e[n] === t && ++r;
                                return r
                            }(n, i = Un(e))),
                            c && (n = tn(n, c, d, I)),
                            f && (n = nn(n, f, p, I)),
                            a -= t,
                            I && a < h) {
                                var o = ts(n, i);
                                return En(l, s, hn, e.placeholder, u, n, o, m, v, h - a)
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
                            }(n, m) : S && 1 < a && n.reverse(),
                            g && v < a && (n.length = v),
                            this && this !== fl && this instanceof e && (o = C || fn(o)),
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
                                t = "string" == typeof e || "string" == typeof t ? (e = Ft(e),
                                Ft(t)) : (e = Mt(e),
                                Mt(t)),
                                n = r(e, t)
                            }
                            return n
                        }
                    }
                    function bn(r) {
                        return Rn(function(e) {
                            return e = _l(e, Wl(Bn())),
                            Et(function(t) {
                                var n = this;
                                return r(e, function(e) {
                                    return Il(e, n, t)
                                })
                            })
                        })
                    }
                    function In(e, t) {
                        var n = (t = t === Hi ? " " : Ft(t)).length;
                        if (n < 2)
                            return n ? wt(t, e) : t;
                        n = wt(t, U(e / rs(t)));
                        return Zl(t) ? Kt(os(n), 0, e).join("") : n.slice(0, e)
                    }
                    function Sn(l, e, s, u) {
                        var c = 1 & e
                          , d = fn(l);
                        return function e() {
                            for (var t = -1, n = arguments.length, r = -1, o = u.length, i = w(o + n), a = this && this !== fl && this instanceof e ? d : l; ++r < o; )
                                i[r] = u[r];
                            for (; n--; )
                                i[r++] = arguments[++t];
                            return Il(a, c ? s : this, i)
                        }
                    }
                    function Cn(r) {
                        return function(e, t, n) {
                            return n && "number" != typeof n && Xn(e, t, n) && (t = n = Hi),
                            e = qo(e),
                            t === Hi ? (t = e,
                            e = 0) : t = qo(t),
                            function(e, t, n, r) {
                                for (var o = -1, i = V(U((t - e) / (n || 1)), 0), a = w(i); i--; )
                                    a[r ? i : ++o] = e,
                                    e += n;
                                return a
                            }(e, t, n = n === Hi ? e < t ? 1 : -1 : qo(n), r)
                        }
                    }
                    function wn(n) {
                        return function(e, t) {
                            return "string" == typeof e && "string" == typeof t || (e = Ko(e),
                            t = Ko(t)),
                            n(e, t)
                        }
                    }
                    function En(e, t, n, r, o, i, a, l, s, u) {
                        var c = 8 & t;
                        t |= c ? 32 : 64,
                        4 & (t &= ~(c ? 64 : 32)) || (t &= -4);
                        u = [e, t, o, c ? i : Hi, c ? a : Hi, c ? Hi : i, c ? Hi : a, l, s, u],
                        n = n.apply(Hi, u);
                        return Zn(e) && ar(n, u),
                        n.placeholder = r,
                        ur(n, e, t)
                    }
                    function Pn(e) {
                        var r = o[e];
                        return function(e, t) {
                            if (e = Ko(e),
                            (t = null == t ? 0 : q(Jo(t), 292)) && H(e)) {
                                var n = (Yo(e) + "e").split("e");
                                return +((n = (Yo(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
                            }
                            return r(e)
                        }
                    }
                    var xn = ee && 1 / ns(new ee([, -0]))[1] == 1 / 0 ? function(e) {
                        return new ee(e)
                    }
                    : Fi;
                    function Tn(i) {
                        return function(e) {
                            var t, n, r, o = Vn(e);
                            return o == oa ? Ql(e) : o == ua ? (o = e,
                            t = -1,
                            n = Array(o.size),
                            o.forEach(function(e) {
                                n[++t] = [e, e]
                            }),
                            n) : _l(i(r = e), function(e) {
                                return [e, r[e]]
                            })
                        }
                    }
                    function _n(e, t, n, r, o, i, a, l) {
                        var s = 2 & t;
                        if (!s && "function" != typeof e)
                            throw new C(zi);
                        var u = r ? r.length : 0;
                        u || (t &= -97,
                        r = o = Hi),
                        a = a === Hi ? a : V(Jo(a), 0),
                        l = l === Hi ? l : Jo(l),
                        u -= o ? o.length : 0,
                        64 & t && (m = r,
                        v = o,
                        r = o = Hi);
                        var c, d, f, p, m, v, h, g, y, b, I = s ? Hi : Mn(e), S = [e, t, n, r, o, m, v, i, a, l];
                        return I && (d = I,
                        p = (c = S)[1],
                        m = d[1],
                        i = (v = p | m) < 131,
                        a = m == qi && 8 == p || m == qi && 256 == p && c[7].length <= d[8] || 384 == m && d[7].length <= d[8] && 8 == p,
                        (i || a) && (1 & m && (c[2] = d[2],
                        v |= 1 & p ? 0 : 4),
                        (p = d[3]) && (f = c[3],
                        c[3] = f ? tn(f, p, d[4]) : p,
                        c[4] = f ? ts(c[3], Vi) : d[4]),
                        (p = d[5]) && (f = c[5],
                        c[5] = f ? nn(f, p, d[6]) : p,
                        c[6] = f ? ts(c[5], Vi) : d[6]),
                        (p = d[7]) && (c[7] = p),
                        m & qi && (c[8] = null == c[8] ? d[8] : q(c[8], d[8])),
                        null == c[9] && (c[9] = d[9]),
                        c[0] = d[0],
                        c[1] = v)),
                        e = S[0],
                        t = S[1],
                        n = S[2],
                        r = S[3],
                        o = S[4],
                        !(l = S[9] = S[9] === Hi ? s ? 0 : e.length : V(S[9] - u, 0)) && 24 & t && (t &= -25),
                        n = t && 1 != t ? 8 == t || 16 == t ? pn(e, t, l) : 32 != t && 33 != t || o.length ? hn.apply(Hi, S) : Sn(e, t, n, r) : (g = n,
                        y = 1 & t,
                        b = fn(h = e),
                        function e() {
                            return (this && this !== fl && this instanceof e ? b : h).apply(y ? g : this, arguments)
                        }
                        ),
                        ur((I ? _t : ar)(n, S), e, t)
                    }
                    function On(e, t, n, r) {
                        return e === Hi || bo(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function kn(e, t, n, r, o, i) {
                        return Ro(e) && Ro(t) && (i.set(t, e),
                        ht(e, t, Hi, kn, i),
                        i.delete(t)),
                        e
                    }
                    function Nn(e) {
                        return Fo(e) ? Hi : e
                    }
                    function An(e, t, n, r, o, i) {
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
                          , f = 2 & n ? new Ce : Hi;
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
                                if (!Al(t, function(e, t) {
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
                        return sr(rr(e, Hi, wr), e + "")
                    }
                    function Ln(e) {
                        return Ze(e, ci, zn)
                    }
                    function Dn(e) {
                        return Ze(e, di, Wn)
                    }
                    var Mn = re ? function(e) {
                        return re.get(e)
                    }
                    : Fi;
                    function Fn(e) {
                        for (var t = e.name + "", n = oe[t], r = y.call(oe, t) ? n.length : 0; r--; ) {
                            var o = n[r]
                              , i = o.func;
                            if (null == i || i == e)
                                return o.name
                        }
                        return t
                    }
                    function Un(e) {
                        return (y.call(pe, "placeholder") ? pe : e).placeholder
                    }
                    function Bn() {
                        var e = (e = pe.iteratee || Di) === Di ? ut : e;
                        return arguments.length ? e(arguments[0], arguments[1]) : e
                    }
                    function Gn(e, t) {
                        var n, r = e.__data__;
                        return ("string" == (e = typeof (n = t)) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== n : null === n) ? r["string" == typeof t ? "string" : "hash"] : r.map
                    }
                    function jn(e) {
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
                    var zn = G ? function(t) {
                        return null == t ? [] : (t = v(t),
                        Pl(G(t), function(e) {
                            return O.call(t, e)
                        }))
                    }
                    : Bi
                      , Wn = G ? function(e) {
                        for (var t = []; e; )
                            Ol(t, zn(e)),
                            e = T(e);
                        return t
                    }
                    : Bi
                      , Vn = Qe;
                    function qn(e, t, n) {
                        for (var r = -1, o = (t = Jt(t, e)).length, i = !1; ++r < o; ) {
                            var a = vr(t[r]);
                            if (!(i = null != e && n(e, a)))
                                break;
                            e = e[a]
                        }
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && Ao(o) && Kn(a, o) && (wo(e) || Co(e))
                    }
                    function Jn(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function $n(e) {
                        return wo(e) || Co(e) || !!(N && e && e[N])
                    }
                    function Kn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Ji : t) && ("number" == n || "symbol" != n && Za.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Xn(e, t, n) {
                        if (Ro(n)) {
                            var r = typeof t;
                            return ("number" == r ? Po(n) && Kn(t, n.length) : "string" == r && t in n) && bo(n[t], e)
                        }
                    }
                    function Yn(e, t) {
                        if (!wo(e)) {
                            var n = typeof e;
                            return "number" == n || "symbol" == n || "boolean" == n || null == e || jo(e) || (Da.test(e) || !La.test(e) || null != t && e in v(t))
                        }
                    }
                    function Zn(e) {
                        var t = Fn(e)
                          , n = pe[t];
                        if ("function" == typeof n && t in ye.prototype) {
                            if (e === n)
                                return 1;
                            n = Mn(n);
                            return n && e === n[0]
                        }
                    }
                    (Y && Vn(new Y(new ArrayBuffer(1))) != ma || Z && Vn(new Z) != oa || Q && Vn(Q.resolve()) != la || ee && Vn(new ee) != ua || te && Vn(new te) != fa) && (Vn = function(e) {
                        var t = Qe(e)
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
                    var Qn = a ? ko : Gi;
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
                        return a = V(a === Hi ? i.length - 1 : a, 0),
                        function() {
                            for (var e = arguments, t = -1, n = V(e.length - a, 0), r = w(n); ++t < n; )
                                r[t] = e[a + t];
                            t = -1;
                            for (var o = w(a + 1); ++t < a; )
                                o[t] = e[t];
                            return o[a] = l(r),
                            Il(i, this, o)
                        }
                    }
                    function or(e, t) {
                        return t.length < 2 ? e : Ye(e, Nt(t, 0, -1))
                    }
                    function ir(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ar = cr(_t)
                      , lr = F || function(e, t) {
                        return fl.setTimeout(e, t)
                    }
                      , sr = cr(Ot);
                    function ur(e, t, n) {
                        var r, o, t = t + "";
                        return sr(e, function(e, t) {
                            var n = t.length;
                            if (!n)
                                return e;
                            var r = n - 1;
                            return t[r] = (1 < n ? "& " : "") + t[r],
                            t = t.join(2 < n ? ", " : " "),
                            e.replace(Ga, "{\n/* [wrapped with " + t + "] */\n")
                        }(t, (r = (t = (t = t).match(ja)) ? t[1].split(Ha) : [],
                        o = n,
                        Cl(Xi, function(e) {
                            var t = "_." + e[0];
                            o & e[1] && !xl(r, t) && r.push(t)
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
                            var i = Ct(n, o)
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
                            o.push(n ? r.replace(Va, "$1") : t || e)
                        }),
                        o
                    }
                    , function(e) {
                        return 500 === pr.size && pr.clear(),
                        e
                    })).cache,
                    fr);
                    function vr(e) {
                        if ("string" == typeof e || jo(e))
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
                    var yr = Et(function(e, t) {
                        return xo(e) ? Be(e, Ve(t, 1, xo, !0)) : []
                    })
                      , br = Et(function(e, t) {
                        var n = _r(t);
                        return xo(n) && (n = Hi),
                        xo(e) ? Be(e, Ve(t, 1, xo, !0), Bn(n, 2)) : []
                    })
                      , Ir = Et(function(e, t) {
                        var n = _r(t);
                        return xo(n) && (n = Hi),
                        xo(e) ? Be(e, Ve(t, 1, xo, !0), Hi, n) : []
                    });
                    function Sr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        n = null == n ? 0 : Jo(n);
                        return n < 0 && (n = V(r + n, 0)),
                        Ll(e, Bn(t, 3), n)
                    }
                    function Cr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r - 1;
                        return n !== Hi && (o = Jo(n),
                        o = n < 0 ? V(r + o, 0) : q(o, r - 1)),
                        Ll(e, Bn(t, 3), o, !0)
                    }
                    function wr(e) {
                        return (null == e ? 0 : e.length) ? Ve(e, 1) : []
                    }
                    function Er(e) {
                        return e && e.length ? e[0] : Hi
                    }
                    var Pr = Et(function(e) {
                        var t = _l(e, Vt);
                        return t.length && t[0] === e[0] ? rt(t) : []
                    })
                      , xr = Et(function(e) {
                        var t = _r(e)
                          , n = _l(e, Vt);
                        return t === _r(n) ? t = Hi : n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Bn(t, 2)) : []
                    })
                      , Tr = Et(function(e) {
                        var t = _r(e)
                          , n = _l(e, Vt);
                        return (t = "function" == typeof t ? t : Hi) && n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Hi, t) : []
                    });
                    function _r(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : Hi
                    }
                    var Or = Et(kr);
                    function kr(e, t) {
                        return e && e.length && t && t.length ? It(e, t) : e
                    }
                    var Nr = Rn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = Le(e, t);
                        return St(e, _l(t, function(e) {
                            return Kn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Ar(e) {
                        return null == e ? e : X.call(e)
                    }
                    var Rr = Et(function(e) {
                        return Ut(Ve(e, 1, xo, !0))
                    })
                      , Lr = Et(function(e) {
                        var t = _r(e);
                        return xo(t) && (t = Hi),
                        Ut(Ve(e, 1, xo, !0), Bn(t, 2))
                    })
                      , Dr = Et(function(e) {
                        var t = "function" == typeof (t = _r(e)) ? t : Hi;
                        return Ut(Ve(e, 1, xo, !0), Hi, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = Pl(t, function(e) {
                            return xo(e) && (n = V(e.length, n),
                            1)
                        }),
                        Hl(n, function(e) {
                            return _l(t, Bl(e))
                        })
                    }
                    function Fr(e, t) {
                        if (!e || !e.length)
                            return [];
                        e = Mr(e);
                        return null == t ? e : _l(e, function(e) {
                            return Il(t, Hi, e)
                        })
                    }
                    var Ur = Et(function(e, t) {
                        return xo(e) ? Be(e, t) : []
                    })
                      , Br = Et(function(e) {
                        return zt(Pl(e, xo))
                    })
                      , Gr = Et(function(e) {
                        var t = _r(e);
                        return xo(t) && (t = Hi),
                        zt(Pl(e, xo), Bn(t, 2))
                    })
                      , jr = Et(function(e) {
                        var t = "function" == typeof (t = _r(e)) ? t : Hi;
                        return zt(Pl(e, xo), Hi, t)
                    })
                      , Hr = Et(Mr);
                    var zr = Et(function(e) {
                        var t = e.length
                          , t = "function" == typeof (t = 1 < t ? e[t - 1] : Hi) ? (e.pop(),
                        t) : Hi;
                        return Fr(e, t)
                    });
                    function Wr(e) {
                        e = pe(e);
                        return e.__chain__ = !0,
                        e
                    }
                    function Vr(e, t) {
                        return t(e)
                    }
                    var qr = Rn(function(t) {
                        function e(e) {
                            return Le(e, t)
                        }
                        var n = t.length
                          , r = n ? t[0] : 0
                          , o = this.__wrapped__;
                        return !(1 < n || this.__actions__.length) && o instanceof ye && Kn(r) ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                            func: Vr,
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
                    var $r = mn(Sr)
                      , Kr = mn(Cr);
                    function Xr(e, t) {
                        return (wo(e) ? Cl : Ge)(e, Bn(t, 3))
                    }
                    function Yr(e, t) {
                        return (wo(e) ? wl : je)(e, Bn(t, 3))
                    }
                    var Zr = an(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : Re(e, n, [t])
                    });
                    var Qr = Et(function(e, t, n) {
                        var r = -1
                          , o = "function" == typeof t
                          , i = Po(e) ? w(e.length) : [];
                        return Ge(e, function(e) {
                            i[++r] = o ? Il(t, e, n) : ot(e, t, n)
                        }),
                        i
                    })
                      , eo = an(function(e, t, n) {
                        Re(e, n, t)
                    });
                    function to(e, t) {
                        return (wo(e) ? _l : pt)(e, Bn(t, 3))
                    }
                    var no = an(function(e, t, n) {
                        e[n ? 0 : 1].push(t)
                    }, function() {
                        return [[], []]
                    });
                    var ro = Et(function(e, t) {
                        if (null == e)
                            return [];
                        var n = t.length;
                        return 1 < n && Xn(e, t[0], t[1]) ? t = [] : 2 < n && Xn(t[0], t[1], t[2]) && (t = [t[0]]),
                        yt(e, Ve(t, 1), [])
                    })
                      , oo = M || function() {
                        return fl.Date.now()
                    }
                    ;
                    function io(e, t, n) {
                        return t = n ? Hi : t,
                        t = e && null == t ? e.length : t,
                        _n(e, qi, Hi, Hi, Hi, Hi, t)
                    }
                    function ao(e, t) {
                        var n;
                        if ("function" != typeof t)
                            throw new C(zi);
                        return e = Jo(e),
                        function() {
                            return 0 < --e && (n = t.apply(this, arguments)),
                            e <= 1 && (t = Hi),
                            n
                        }
                    }
                    var lo = Et(function(e, t, n) {
                        var r, o = 1;
                        return n.length && (r = ts(n, Un(lo)),
                        o |= 32),
                        _n(e, o, t, n, r)
                    })
                      , so = Et(function(e, t, n) {
                        var r, o = 3;
                        return n.length && (r = ts(n, Un(so)),
                        o |= 32),
                        _n(t, o, e, n, r)
                    });
                    function uo(r, n, e) {
                        var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                        if ("function" != typeof r)
                            throw new C(zi);
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
                                    return Xt(s),
                                    s = lr(v, n),
                                    p(u)
                            }
                            return s === Hi && (s = lr(v, n)),
                            l
                        }
                        return n = Ko(n) || 0,
                        Ro(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? V(Ko(e.maxWait) || 0, n) : a,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            s !== Hi && Xt(s),
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
                    var co = Et(function(e, t) {
                        return Ue(e, 1, t)
                    })
                      , fo = Et(function(e, t, n) {
                        return Ue(e, Ko(t) || 0, n)
                    });
                    function po(r, o) {
                        if ("function" != typeof r || null != o && "function" != typeof o)
                            throw new C(zi);
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
                        return i.cache = new (po.Cache || Se),
                        i
                    }
                    function mo(t) {
                        if ("function" != typeof t)
                            throw new C(zi);
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
                    po.Cache = Se;
                    var vo = $t(function(r, o) {
                        var i = (o = 1 == o.length && wo(o[0]) ? _l(o[0], Wl(Bn())) : _l(Ve(o, 1), Wl(Bn()))).length;
                        return Et(function(e) {
                            for (var t = -1, n = q(e.length, i); ++t < n; )
                                e[t] = o[t].call(this, e[t]);
                            return Il(r, this, e)
                        })
                    })
                      , ho = Et(function(e, t) {
                        var n = ts(t, Un(ho));
                        return _n(e, 32, Hi, t, n)
                    })
                      , go = Et(function(e, t) {
                        var n = ts(t, Un(go));
                        return _n(e, 64, Hi, t, n)
                    })
                      , yo = Rn(function(e, t) {
                        return _n(e, 256, Hi, Hi, Hi, t)
                    });
                    function bo(e, t) {
                        return e === t || e != e && t != t
                    }
                    var Io = wn(et)
                      , So = wn(function(e, t) {
                        return t <= e
                    })
                      , Co = it(function() {
                        return arguments
                    }()) ? it : function(e) {
                        return Lo(e) && y.call(e, "callee") && !O.call(e, "callee")
                    }
                      , wo = w.isArray
                      , Eo = ml ? Wl(ml) : function(e) {
                        return Lo(e) && Qe(e) == pa
                    }
                    ;
                    function Po(e) {
                        return null != e && Ao(e.length) && !ko(e)
                    }
                    function xo(e) {
                        return Lo(e) && Po(e)
                    }
                    var To = j || Gi
                      , _o = vl ? Wl(vl) : function(e) {
                        return Lo(e) && Qe(e) == ea
                    }
                    ;
                    function Oo(e) {
                        if (!Lo(e))
                            return !1;
                        var t = Qe(e);
                        return t == ta || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Fo(e)
                    }
                    function ko(e) {
                        if (!Ro(e))
                            return !1;
                        e = Qe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function No(e) {
                        return "number" == typeof e && e == Jo(e)
                    }
                    function Ao(e) {
                        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= Ji
                    }
                    function Ro(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t)
                    }
                    function Lo(e) {
                        return null != e && "object" == typeof e
                    }
                    var Do = hl ? Wl(hl) : function(e) {
                        return Lo(e) && Vn(e) == oa
                    }
                    ;
                    function Mo(e) {
                        return "number" == typeof e || Lo(e) && Qe(e) == ia
                    }
                    function Fo(e) {
                        if (!Lo(e) || Qe(e) != aa)
                            return !1;
                        e = T(e);
                        if (null === e)
                            return !0;
                        e = y.call(e, "constructor") && e.constructor;
                        return "function" == typeof e && e instanceof e && l.call(e) == g
                    }
                    var Uo = gl ? Wl(gl) : function(e) {
                        return Lo(e) && Qe(e) == sa
                    }
                    ;
                    var Bo = yl ? Wl(yl) : function(e) {
                        return Lo(e) && Vn(e) == ua
                    }
                    ;
                    function Go(e) {
                        return "string" == typeof e || !wo(e) && Lo(e) && Qe(e) == ca
                    }
                    function jo(e) {
                        return "symbol" == typeof e || Lo(e) && Qe(e) == da
                    }
                    var Ho = bl ? Wl(bl) : function(e) {
                        return Lo(e) && Ao(e.length) && !!sl[Qe(e)]
                    }
                    ;
                    var zo = wn(ft)
                      , Wo = wn(function(e, t) {
                        return e <= t
                    });
                    function Vo(e) {
                        if (!e)
                            return [];
                        if (Po(e))
                            return (Go(e) ? os : rn)(e);
                        if (A && e[A])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[A]());
                        var t = Vn(e);
                        return (t == oa ? Ql : t == ua ? ns : bi)(e)
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
                        return e ? De(Jo(e), 0, Ki) : 0
                    }
                    function Ko(e) {
                        if ("number" == typeof e)
                            return e;
                        if (jo(e))
                            return $i;
                        if (Ro(e) && (e = Ro(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = Ka.test(e);
                        return t || Ya.test(e) ? dl(e.slice(2), t ? 2 : 8) : $a.test(e) ? $i : +e
                    }
                    function Xo(e) {
                        return on(e, di(e))
                    }
                    function Yo(e) {
                        return null == e ? "" : Ft(e)
                    }
                    var Zo = ln(function(e, t) {
                        if (er(t) || Po(t))
                            on(t, ci(t), e);
                        else
                            for (var n in t)
                                y.call(t, n) && Oe(e, n, t[n])
                    })
                      , Qo = ln(function(e, t) {
                        on(t, di(t), e)
                    })
                      , ei = ln(function(e, t, n, r) {
                        on(t, di(t), e, r)
                    })
                      , ti = ln(function(e, t, n, r) {
                        on(t, ci(t), e, r)
                    })
                      , ni = Rn(Le);
                    var ri = Et(function(e, t) {
                        e = v(e);
                        var n = -1
                          , r = t.length
                          , o = 2 < r ? t[2] : Hi;
                        for (o && Xn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === Hi || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Et(function(e) {
                        return e.push(Hi, kn),
                        Il(pi, Hi, e)
                    });
                    function ii(e, t, n) {
                        t = null == e ? Hi : Ye(e, t);
                        return t === Hi ? n : t
                    }
                    function ai(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var li = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        e[t] = n
                    }, Ai(Li))
                      , si = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        y.call(e, t) ? e[t].push(n) : e[t] = [n]
                    }, Bn)
                      , ui = Et(ot);
                    function ci(e) {
                        return (Po(e) ? Ee : ct)(e)
                    }
                    function di(e) {
                        return Po(e) ? Ee(e, !0) : dt(e)
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
                        e = _l(e, function(e) {
                            return e = Jt(e, t),
                            r = r || 1 < e.length,
                            e
                        }),
                        on(t, Dn(t), n),
                        r && (n = Me(n, 7, Nn));
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
                        var t = _l(Dn(e), function(e) {
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
                        return null == e ? [] : Vl(e, ci(e))
                    }
                    var Ii = dn(function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? Si(t) : t)
                    });
                    function Si(e) {
                        return Oi(Yo(e).toLowerCase())
                    }
                    function Ci(e) {
                        return (e = Yo(e)) && e.replace(Qa, Kl).replace(rl, "")
                    }
                    var wi = dn(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , Ei = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    })
                      , Pi = cn("toLowerCase");
                    var xi = dn(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    });
                    var Ti = dn(function(e, t, n) {
                        return e + (n ? " " : "") + Oi(t)
                    });
                    var _i = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Oi = cn("toUpperCase");
                    function ki(e, t, n) {
                        return e = Yo(e),
                        (t = n ? Hi : t) === Hi ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var Ni = Et(function(e, t) {
                        try {
                            return Il(e, Hi, t)
                        } catch (e) {
                            return Oo(e) ? e : new d(e)
                        }
                    })
                      , r = Rn(function(t, e) {
                        return Cl(e, function(e) {
                            e = vr(e),
                            Re(t, e, lo(t[e], t))
                        }),
                        t
                    });
                    function Ai(e) {
                        return function() {
                            return e
                        }
                    }
                    var Ri = vn()
                      , S = vn(!0);
                    function Li(e) {
                        return e
                    }
                    function Di(e) {
                        return ut("function" == typeof e ? e : Me(e, 1))
                    }
                    n = Et(function(t, n) {
                        return function(e) {
                            return ot(e, t, n)
                        }
                    }),
                    t = Et(function(t, n) {
                        return function(e) {
                            return ot(t, e, n)
                        }
                    });
                    function Mi(r, t, e) {
                        var n = ci(t)
                          , o = Xe(t, n);
                        null != e || Ro(t) && (o.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        o = Xe(t, ci(t)));
                        var i = !(Ro(e) && "chain"in e && !e.chain)
                          , a = ko(r);
                        return Cl(o, function(e) {
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
                                return n.apply(r, Ol([this.value()], arguments))
                            }
                            )
                        }),
                        r
                    }
                    function Fi() {}
                    E = bn(_l),
                    ce = bn(El),
                    D = bn(Al);
                    function Ui(e) {
                        return Yn(e) ? Bl(vr(e)) : (t = e,
                        function(e) {
                            return Ye(e, t)
                        }
                        );
                        var t
                    }
                    Y = Cn(),
                    Q = Cn(!0);
                    function Bi() {
                        return []
                    }
                    function Gi() {
                        return !1
                    }
                    te = yn(function(e, t) {
                        return e + t
                    }, 0),
                    a = Pn("ceil"),
                    F = yn(function(e, t) {
                        return e / t
                    }, 1),
                    Ot = Pn("floor");
                    var ji, M = yn(function(e, t) {
                        return e * t
                    }, 1), $t = Pn("round"), j = yn(function(e, t) {
                        return e - t
                    }, 0);
                    return pe.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new C(zi);
                        return e = Jo(e),
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    ,
                    pe.ary = io,
                    pe.assign = Zo,
                    pe.assignIn = Qo,
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
                        return wo(e) ? e : [e]
                    }
                    ,
                    pe.chain = Wr,
                    pe.chunk = function(e, t, n) {
                        t = (n ? Xn(e, t, n) : t === Hi) ? 1 : V(Jo(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = w(U(r / t)); o < r; )
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
                        for (var t = w(e - 1), n = arguments[0], r = e; r--; )
                            t[r - 1] = arguments[r];
                        return Ol(wo(n) ? rn(n) : [n], Ve(t, 1))
                    }
                    ,
                    pe.cond = function(r) {
                        var o = null == r ? 0 : r.length
                          , t = Bn();
                        return r = o ? _l(r, function(e) {
                            if ("function" != typeof e[1])
                                throw new C(zi);
                            return [t(e[0]), e[1]]
                        }) : [],
                        Et(function(e) {
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
                            return Fe(e, t, n)
                        }
                        ;
                        var t, n
                    }
                    ,
                    pe.constant = Ai,
                    pe.countBy = Jr,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : Ae(e, t)
                    }
                    ,
                    pe.curry = function e(t, n, r) {
                        n = _n(t, 8, Hi, Hi, Hi, Hi, Hi, n = r ? Hi : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.curryRight = function e(t, n, r) {
                        n = _n(t, 16, Hi, Hi, Hi, Hi, Hi, n = r ? Hi : n);
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
                        return e && e.length ? jt(e, Bn(t, 3), !0, !0) : []
                    }
                    ,
                    pe.dropWhile = function(e, t) {
                        return e && e.length ? jt(e, Bn(t, 3), !0) : []
                    }
                    ,
                    pe.fill = function(e, t, n, r) {
                        var o = null == e ? 0 : e.length;
                        return o ? (n && "number" != typeof n && Xn(e, t, n) && (n = 0,
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
                        return (wo(e) ? Pl : We)(e, Bn(t, 3))
                    }
                    ,
                    pe.flatMap = function(e, t) {
                        return Ve(to(e, t), 1)
                    }
                    ,
                    pe.flatMapDeep = function(e, t) {
                        return Ve(to(e, t), 1 / 0)
                    }
                    ,
                    pe.flatMapDepth = function(e, t, n) {
                        return n = n === Hi ? 1 : Jo(n),
                        Ve(to(e, t), n)
                    }
                    ,
                    pe.flatten = wr,
                    pe.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? Ve(e, 1 / 0) : []
                    }
                    ,
                    pe.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? Ve(e, t = t === Hi ? 1 : Jo(t)) : []
                    }
                    ,
                    pe.flip = function(e) {
                        return _n(e, 512)
                    }
                    ,
                    pe.flow = Ri,
                    pe.flowRight = S,
                    pe.fromPairs = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
                            var o = e[t];
                            r[o[0]] = o[1]
                        }
                        return r
                    }
                    ,
                    pe.functions = function(e) {
                        return null == e ? [] : Xe(e, ci(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Xe(e, di(e))
                    }
                    ,
                    pe.groupBy = Zr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? Nt(e, 0, -1) : []
                    }
                    ,
                    pe.intersection = Pr,
                    pe.intersectionBy = xr,
                    pe.intersectionWith = Tr,
                    pe.invert = li,
                    pe.invertBy = si,
                    pe.invokeMap = Qr,
                    pe.iteratee = Di,
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
                        Et(function(e) {
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
                        return null == e ? [] : (wo(t) || (t = null == t ? [] : [t]),
                        wo(n = r ? Hi : n) || (n = null == n ? [] : [n]),
                        yt(e, t, n))
                    }
                    ,
                    pe.over = E,
                    pe.overArgs = vo,
                    pe.overEvery = ce,
                    pe.overSome = D,
                    pe.partial = ho,
                    pe.partialRight = go,
                    pe.partition = no,
                    pe.pick = vi,
                    pe.pickBy = hi,
                    pe.property = Ui,
                    pe.propertyOf = function(t) {
                        return function(e) {
                            return null == t ? Hi : Ye(t, e)
                        }
                    }
                    ,
                    pe.pull = Or,
                    pe.pullAll = kr,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Hi, n) : e
                    }
                    ,
                    pe.pullAt = Nr,
                    pe.range = Y,
                    pe.rangeRight = Q,
                    pe.rearg = yo,
                    pe.reject = function(e, t) {
                        return (wo(e) ? Pl : We)(e, mo(Bn(t, 3)))
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
                        return St(e, o),
                        n
                    }
                    ,
                    pe.rest = function(e, t) {
                        if ("function" != typeof e)
                            throw new C(zi);
                        return Et(e, t = t === Hi ? t : Jo(t))
                    }
                    ,
                    pe.reverse = Ar,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Xn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        (wo(e) ? xe : xt)(e, t)
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
                        return (wo(e) ? Te : kt)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Xn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : Jo(t),
                        n === Hi ? r : Jo(n)),
                        Nt(e, t, n)) : []
                    }
                    ,
                    pe.sortBy = ro,
                    pe.sortedUniq = function(e) {
                        return e && e.length ? Dt(e) : []
                    }
                    ,
                    pe.sortedUniqBy = function(e, t) {
                        return e && e.length ? Dt(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.split = function(e, t, n) {
                        return n && "number" != typeof n && Xn(e, t, n) && (t = n = Hi),
                        (n = n === Hi ? Ki : n >>> 0) ? (e = Yo(e)) && ("string" == typeof t || null != t && !Uo(t)) && !(t = Ft(t)) && Zl(e) ? Kt(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new C(zi);
                        return r = null == r ? 0 : V(Jo(r), 0),
                        Et(function(e) {
                            var t = e[r]
                              , e = Kt(e, 0, r);
                            return t && Ol(e, t),
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
                        return e && e.length ? jt(e, Bn(t, 3), !1, !0) : []
                    }
                    ,
                    pe.takeWhile = function(e, t) {
                        return e && e.length ? jt(e, Bn(t, 3)) : []
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
                            throw new C(zi);
                        return Ro(n) && (r = "leading"in n ? !!n.leading : r,
                        o = "trailing"in n ? !!n.trailing : o),
                        uo(e, t, {
                            leading: r,
                            maxWait: t,
                            trailing: o
                        })
                    }
                    ,
                    pe.thru = Vr,
                    pe.toArray = Vo,
                    pe.toPairs = gi,
                    pe.toPairsIn = yi,
                    pe.toPath = function(e) {
                        return wo(e) ? _l(e, vr) : jo(e) ? [e] : rn(mr(Yo(e)))
                    }
                    ,
                    pe.toPlainObject = Xo,
                    pe.transform = function(e, r, o) {
                        var t, n = wo(e), i = n || To(e) || Ho(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : Ro(e) && ko(t) ? me(T(e)) : {}),
                        (i ? Cl : $e)(e, function(e, t, n) {
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
                    pe.unionBy = Lr,
                    pe.unionWith = Dr,
                    pe.uniq = function(e) {
                        return e && e.length ? Ut(e) : []
                    }
                    ,
                    pe.uniqBy = function(e, t) {
                        return e && e.length ? Ut(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.uniqWith = function(e, t) {
                        return t = "function" == typeof t ? t : Hi,
                        e && e.length ? Ut(e, Hi, t) : []
                    }
                    ,
                    pe.unset = function(e, t) {
                        return null == e || Bt(e, t)
                    }
                    ,
                    pe.unzip = Mr,
                    pe.unzipWith = Fr,
                    pe.update = function(e, t, n) {
                        return null == e ? e : Gt(e, t, qt(n))
                    }
                    ,
                    pe.updateWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Hi,
                        null == e ? e : Gt(e, t, qt(n), r)
                    }
                    ,
                    pe.values = bi,
                    pe.valuesIn = function(e) {
                        return null == e ? [] : Vl(e, di(e))
                    }
                    ,
                    pe.without = Ur,
                    pe.words = ki,
                    pe.wrap = function(e, t) {
                        return ho(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = Gr,
                    pe.xorWith = jr,
                    pe.zip = Hr,
                    pe.zipObject = function(e, t) {
                        return Wt(e || [], t || [], Oe)
                    }
                    ,
                    pe.zipObjectDeep = function(e, t) {
                        return Wt(e || [], t || [], Tt)
                    }
                    ,
                    pe.zipWith = zr,
                    pe.entries = gi,
                    pe.entriesIn = yi,
                    pe.extend = Qo,
                    pe.extendWith = ei,
                    Mi(pe, pe),
                    pe.add = te,
                    pe.attempt = Ni,
                    pe.camelCase = Ii,
                    pe.capitalize = Si,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === Hi && (n = t,
                        t = Hi),
                        n !== Hi && (n = (n = Ko(n)) == n ? n : 0),
                        t !== Hi && (t = (t = Ko(t)) == t ? t : 0),
                        De(Ko(e), t, n)
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
                        return null == t || Fe(e, t, ci(t))
                    }
                    ,
                    pe.deburr = Ci,
                    pe.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    pe.divide = F,
                    pe.endsWith = function(e, t, n) {
                        e = Yo(e),
                        t = Ft(t);
                        var r = e.length
                          , r = n = n === Hi ? r : De(Jo(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = bo,
                    pe.escape = function(e) {
                        return (e = Yo(e)) && ka.test(e) ? e.replace(_a, Xl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Yo(e)) && Ua.test(e) ? e.replace(Fa, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = wo(e) ? El : He;
                        return n && Xn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = $r,
                    pe.findIndex = Sr,
                    pe.findKey = function(e, t) {
                        return Rl(e, Bn(t, 3), $e)
                    }
                    ,
                    pe.findLast = Kr,
                    pe.findLastIndex = Cr,
                    pe.findLastKey = function(e, t) {
                        return Rl(e, Bn(t, 3), Ke)
                    }
                    ,
                    pe.floor = Ot,
                    pe.forEach = Xr,
                    pe.forEachRight = Yr,
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
                    pe.gte = So,
                    pe.has = function(e, t) {
                        return null != e && qn(e, t, tt)
                    }
                    ,
                    pe.hasIn = ai,
                    pe.head = Er,
                    pe.identity = Li,
                    pe.includes = function(e, t, n, r) {
                        return e = Po(e) ? e : bi(e),
                        n = n && !r ? Jo(n) : 0,
                        r = e.length,
                        n < 0 && (n = V(r + n, 0)),
                        Go(e) ? n <= r && -1 < e.indexOf(t, n) : !!r && -1 < Dl(e, t, n)
                    }
                    ,
                    pe.indexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? ((n = null == n ? 0 : Jo(n)) < 0 && (n = V(r + n, 0)),
                        Dl(e, t, n)) : -1
                    }
                    ,
                    pe.inRange = function(e, t, n) {
                        return t = qo(t),
                        n === Hi ? (n = t,
                        t = 0) : n = qo(n),
                        (e = e = Ko(e)) >= q(t = t, n = n) && e < V(t, n)
                    }
                    ,
                    pe.invoke = ui,
                    pe.isArguments = Co,
                    pe.isArray = wo,
                    pe.isArrayBuffer = Eo,
                    pe.isArrayLike = Po,
                    pe.isArrayLikeObject = xo,
                    pe.isBoolean = function(e) {
                        return !0 === e || !1 === e || Lo(e) && Qe(e) == Qi
                    }
                    ,
                    pe.isBuffer = To,
                    pe.isDate = _o,
                    pe.isElement = function(e) {
                        return Lo(e) && 1 === e.nodeType && !Fo(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (Po(e) && (wo(e) || "string" == typeof e || "function" == typeof e.splice || To(e) || Ho(e) || Co(e)))
                            return !e.length;
                        var t, n = Vn(e);
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
                    pe.isError = Oo,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && H(e)
                    }
                    ,
                    pe.isFunction = ko,
                    pe.isInteger = No,
                    pe.isLength = Ao,
                    pe.isMap = Do,
                    pe.isMatch = function(e, t) {
                        return e === t || lt(e, t, jn(t))
                    }
                    ,
                    pe.isMatchWith = function(e, t, n) {
                        return n = "function" == typeof n ? n : Hi,
                        lt(e, t, jn(t), n)
                    }
                    ,
                    pe.isNaN = function(e) {
                        return Mo(e) && e != +e
                    }
                    ,
                    pe.isNative = function(e) {
                        if (Qn(e))
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
                    pe.isObjectLike = Lo,
                    pe.isPlainObject = Fo,
                    pe.isRegExp = Uo,
                    pe.isSafeInteger = function(e) {
                        return No(e) && -Ji <= e && e <= Ji
                    }
                    ,
                    pe.isSet = Bo,
                    pe.isString = Go,
                    pe.isSymbol = jo,
                    pe.isTypedArray = Ho,
                    pe.isUndefined = function(e) {
                        return e === Hi
                    }
                    ,
                    pe.isWeakMap = function(e) {
                        return Lo(e) && Vn(e) == fa
                    }
                    ,
                    pe.isWeakSet = function(e) {
                        return Lo(e) && "[object WeakSet]" == Qe(e)
                    }
                    ,
                    pe.join = function(e, t) {
                        return null == e ? "" : z.call(e, t)
                    }
                    ,
                    pe.kebabCase = wi,
                    pe.last = _r,
                    pe.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r;
                        return n !== Hi && (o = (o = Jo(n)) < 0 ? V(r + o, 0) : q(o, r - 1)),
                        t == t ? function(e, t, n) {
                            for (var r = n + 1; r--; )
                                if (e[r] === t)
                                    return r;
                            return r
                        }(e, t, o) : Ll(e, Fl, o, !0)
                    }
                    ,
                    pe.lowerCase = Ei,
                    pe.lowerFirst = Pi,
                    pe.lt = zo,
                    pe.lte = Wo,
                    pe.max = function(e) {
                        return e && e.length ? ze(e, Li, et) : Hi
                    }
                    ,
                    pe.maxBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), et) : Hi
                    }
                    ,
                    pe.mean = function(e) {
                        return Ul(e, Li)
                    }
                    ,
                    pe.meanBy = function(e, t) {
                        return Ul(e, Bn(t, 2))
                    }
                    ,
                    pe.min = function(e) {
                        return e && e.length ? ze(e, Li, ft) : Hi
                    }
                    ,
                    pe.minBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), ft) : Hi
                    }
                    ,
                    pe.stubArray = Bi,
                    pe.stubFalse = Gi,
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
                    pe.noop = Fi,
                    pe.now = oo,
                    pe.pad = function(e, t, n) {
                        e = Yo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return !t || t <= r ? e : In(B(r = (t - r) / 2), n) + e + In(U(r), n)
                    }
                    ,
                    pe.padEnd = function(e, t, n) {
                        e = Yo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? e + In(t - r, n) : e
                    }
                    ,
                    pe.padStart = function(e, t, n) {
                        e = Yo(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? In(t - r, n) + e : e
                    }
                    ,
                    pe.parseInt = function(e, t, n) {
                        return t = n || null == t ? 0 : t && +t,
                        $(Yo(e).replace(Ba, ""), t || 0)
                    }
                    ,
                    pe.random = function(e, t, n) {
                        var r;
                        if (n && "boolean" != typeof n && Xn(e, t, n) && (t = n = Hi),
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
                        return Ct(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = wo(e) ? kl : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Ge)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = wo(e) ? Nl : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, je)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Xn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        wt(Yo(e), t)
                    }
                    ,
                    pe.replace = function() {
                        var e = arguments
                          , t = Yo(e[0]);
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
                            e = ko(i) ? i.call(e) : i
                        }
                        return e
                    }
                    ,
                    pe.round = $t,
                    pe.runInContext = e,
                    pe.sample = function(e) {
                        return (wo(e) ? Pe : Pt)(e)
                    }
                    ,
                    pe.size = function(e) {
                        if (null == e)
                            return 0;
                        if (Po(e))
                            return Go(e) ? rs(e) : e.length;
                        var t = Vn(e);
                        return t == oa || t == ua ? e.size : ct(e).length
                    }
                    ,
                    pe.snakeCase = xi,
                    pe.some = function(e, t, n) {
                        var r = wo(e) ? Al : At;
                        return n && Xn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.sortedIndex = function(e, t) {
                        return Rt(e, t)
                    }
                    ,
                    pe.sortedIndexBy = function(e, t, n) {
                        return Lt(e, t, Bn(n, 2))
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
                        return Lt(e, t, Bn(n, 2), !0)
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
                    pe.startCase = Ti,
                    pe.startsWith = function(e, t, n) {
                        return e = Yo(e),
                        n = null == n ? 0 : De(Jo(n), 0, e.length),
                        t = Ft(t),
                        e.slice(n, n + t.length) == t
                    }
                    ,
                    pe.subtract = j,
                    pe.sum = function(e) {
                        return e && e.length ? jl(e, Li) : 0
                    }
                    ,
                    pe.sumBy = function(e, t) {
                        return e && e.length ? jl(e, Bn(t, 2)) : 0
                    }
                    ,
                    pe.template = function(a, e, t) {
                        var n = pe.templateSettings;
                        t && Xn(a, e, t) && (e = Hi),
                        a = Yo(a),
                        e = ei({}, e, n, On);
                        var l, s, r = ci(n = ei({}, e.imports, n.imports, On)), o = Vl(n, r), u = 0, n = e.interpolate || el, c = "__p += '", n = p((e.escape || el).source + "|" + n.source + "|" + (n === Ra ? qa : el).source + "|" + (e.evaluate || el).source + "|$", "g"), i = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ll + "]") + "\n";
                        if (a.replace(n, function(e, t, n, r, o, i) {
                            return n = n || r,
                            c += a.slice(u, i).replace(tl, Yl),
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
                            if (Wa.test(e))
                                throw new d("Invalid `variable` option passed into `_.template`")
                        } else
                            c = "with (obj) {\n" + c + "\n}\n";
                        if (c = (s ? c.replace(Ea, "") : c).replace(Pa, "$1").replace(xa, "$1;"),
                        c = "function(" + (e || "obj") + ") {\n" + (e ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}",
                        (e = Ni(function() {
                            return f(r, i + "return " + c).apply(Hi, o)
                        })).source = c,
                        Oo(e))
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
                        return Yo(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = Ko,
                    pe.toSafeInteger = function(e) {
                        return e ? De(Jo(e), -Ji, Ji) : 0 === e ? e : 0
                    }
                    ,
                    pe.toString = Yo,
                    pe.toUpper = function(e) {
                        return Yo(e).toUpperCase()
                    }
                    ,
                    pe.trim = function(e, t, n) {
                        return (e = Yo(e)) && (n || t === Hi) ? zl(e) : e && (t = Ft(t)) ? (e = os(e),
                        t = os(t),
                        Kt(e, Jl(e, t), $l(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Yo(e)) && (n || t === Hi) ? e.slice(0, is(e) + 1) : e && (t = Ft(t)) ? Kt(e = os(e), 0, $l(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Yo(e)) && (n || t === Hi) ? e.replace(Ba, "") : e && (t = Ft(t)) ? Kt(e = os(e), Jl(e, os(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, o = "...";
                        Ro(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? Jo(t.length) : r,
                        o = "omission"in t ? Ft(t.omission) : o);
                        var i, t = (e = Yo(e)).length;
                        if (Zl(e) && (t = (i = os(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - rs(o)) < 1)
                            return o;
                        if (r = i ? Kt(i, 0, t).join("") : e.slice(0, t),
                        n === Hi)
                            return r + o;
                        if (i && (t += r.length - t),
                        Uo(n)) {
                            if (e.slice(t).search(n)) {
                                var a, l = r;
                                for (n.global || (n = p(n.source, Yo(Ja.exec(n)) + "g")),
                                n.lastIndex = 0; a = n.exec(l); )
                                    var s = a.index;
                                r = r.slice(0, s === Hi ? t : s)
                            }
                        } else
                            e.indexOf(Ft(n), t) == t || -1 < (t = r.lastIndexOf(n)) && (r = r.slice(0, t));
                        return r + o
                    }
                    ,
                    pe.unescape = function(e) {
                        return (e = Yo(e)) && Oa.test(e) ? e.replace(Ta, as) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++s;
                        return Yo(e) + t
                    }
                    ,
                    pe.upperCase = _i,
                    pe.upperFirst = Oi,
                    pe.each = Xr,
                    pe.eachRight = Yr,
                    pe.first = Er,
                    Mi(pe, (ji = {},
                    $e(pe, function(e, t) {
                        y.call(pe.prototype, t) || (ji[t] = e)
                    }),
                    ji), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    Cl(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    Cl(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === Hi ? 1 : V(Jo(e), 0);
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
                    Cl(["filter", "map", "takeWhile"], function(e, t) {
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
                    Cl(["head", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        ye.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    Cl(["initial", "tail"], function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        ye.prototype[e] = function() {
                            return this.__filtered__ ? new ye(this) : this[n](1)
                        }
                    }),
                    ye.prototype.compact = function() {
                        return this.filter(Li)
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
                    ye.prototype.invokeMap = Et(function(t, n) {
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
                                return e = f.apply(pe, Ol([e], n)),
                                d && a ? e[0] : e
                            }
                            var t = this.__wrapped__
                              , n = d ? [1] : arguments
                              , r = t instanceof ye
                              , o = n[0]
                              , i = r || wo(t);
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
                                func: Vr,
                                args: [e],
                                thisArg: Hi
                            }),
                            new ge(s,a)
                        }
                        )
                    }),
                    Cl(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                        var n = i[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , o = /^(?:pop|shift)$/.test(e);
                        pe.prototype[e] = function() {
                            var t = arguments;
                            if (!o || this.__chain__)
                                return this[r](function(e) {
                                    return n.apply(wo(e) ? e : [], t)
                                });
                            var e = this.value();
                            return n.apply(wo(e) ? e : [], t)
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
                          , n = wo(e)
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
                                    e = V(e, t - a)
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
                        return Wr(this)
                    }
                    ,
                    pe.prototype.commit = function() {
                        return new ge(this.value(),this.__chain__)
                    }
                    ,
                    pe.prototype.next = function() {
                        this.__values__ === Hi && (this.__values__ = Vo(this.value()));
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
                                func: Vr,
                                args: [Ar],
                                thisArg: Hi
                            }),
                            new ge(e,this.__chain__)
                        }
                        return this.thru(Ar)
                    }
                    ,
                    pe.prototype.toJSON = pe.prototype.valueOf = pe.prototype.value = function() {
                        return Ht(this.__wrapped__, this.__actions__)
                    }
                    ,
                    pe.prototype.first = pe.prototype.head,
                    A && (pe.prototype[A] = function() {
                        return this
                    }
                    ),
                    pe
                }();
                fl._ = ls,
                (R = function() {
                    return ls
                }
                .call(N, A, N, k)) === Hi || (k.exports = R)
            }
            .call(this)
        },
        4452: function(e, t) {
            var n;
            /*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
            !function() {
                "use strict";
                var r = {}.hasOwnProperty;
                function o() {
                    for (var e = "", t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        n && (e = i(e, function(e) {
                            if ("string" == typeof e || "number" == typeof e)
                                return e;
                            if ("object" != typeof e)
                                return "";
                            if (Array.isArray(e))
                                return o.apply(null, e);
                            if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]"))
                                return e.toString();
                            var t, n = "";
                            for (t in e)
                                r.call(e, t) && e[t] && (n = i(n, t));
                            return n
                        }(n)))
                    }
                    return e
                }
                function i(e, t) {
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
      , r = {};
    function Xu(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, Xu),
        t.loaded = !0,
        t.exports
    }
    Xu.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return Xu.d(t, {
            a: t
        }),
        t
    }
    ,
    Xu.d = function(e, t) {
        for (var n in t)
            Xu.o(t, n) && !Xu.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    Xu.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    Xu.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    Xu.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var C, w, E, $, L, D, M, K = React, X = Xu.n(K), e = ReactDOM, N = CoreUtilities, P = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, p = ReactUtilities, x = CoreRobloxUtilities, T = Roblox, r = T.EnvironmentUrls.apiGatewayUrl, a = {
            getExperimentationValues: function(e, t, n) {
                return {
                    url: r + "/product-experimentation-platform/v1/projects/" + e + "/layers/" + t + "/values?parameters=" + n.join(","),
                    withCredentials: !0
                }
            }
        }, t = {
            homePage: {},
            homePageWeb: {
                IsExpandHomeContentEnabled: !0
            },
            gridUi: {
                IsNewSortHeaderEnabled: !1,
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
            gridUi: "PlayerApp.GridUI",
            serverTab: "GameDetails.ServersTab",
            gameDetails: "Website.GameDetails",
            gameDetailsExposure: "Website.GameDetails.Exposure",
            searchPage: "Website.SearchResultsPage",
            discoverPage: "Website.GamesPage",
            tileLayer: "Website.TileLayer",
            playButton: "Website.PlayButton"
        }, o = T.EnvironmentUrls.apiGatewayUrl, u = {
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
                },
                getWebFriendsRenamePoliciesGuacPolicy: function() {
                    return {
                        url: o + "/universal-app-configuration/v1/behaviors/web-rename-friends/content",
                        withCredentials: !0
                    }
                }
            }
        };
        (Cl = C = C || {}).Game = "Game",
        Cl.CatalogAsset = "CatalogAsset",
        Cl.CatalogBundle = "CatalogBundle",
        (Ui = w = w || {}).Carousel = "Carousel",
        Ui.AvatarCarousel = "AvatarCarousel",
        Ui.SortlessGrid = "SortlessGrid",
        Ui.FriendCarousel = "FriendCarousel",
        Ui.InterestGrid = "InterestGrid",
        Ui.Pills = "Pills",
        Ui.Sdui = "sdui",
        Ui.SongCarousel = "SongCarousel",
        (et = E = E || {}).Carousel = "Carousel",
        et.HeroUnit = "HeroUnit",
        (tt = {}).Sponsored = "Sponsored",
        tt.SponsoredGame = "SponsoredGame",
        (lt = $ = $ || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        lt.GridTile = "GridTile",
        lt.EventTile = "EventTile",
        lt.InterestTile = "InterestTile",
        lt.ExperienceEventsTile = "ExperienceEventsTile",
        (te = L = L || {}).Always = "Always",
        te.Hover = "Hover",
        te.Footer = "Footer",
        (oe = D = D || {}).Disabled = "Disabled",
        oe.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var i, l = "robloxAttributionIds";
        function s(e) {
            var t = window
              , n = t[l];
            return n || (n = {},
            t[l] = n),
            (t = n[e]) || (t = N.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function c() {
            return document.getElementById("place-list")
        }
        (i = i || {}).GameDetailReferral = "gameDetailReferral";
        var Y, d = function(e) {
            return "discover#/sortName/" + e
        }, f = function(e) {
            return "discover#/sortName/v2/" + e
        }, m = function(e) {
            return "charts#/sortName/" + e
        };
        function v(e, t, n) {
            return void 0 === n && (n = {}),
            N.urlService.getUrlWithQueries(x.entityUrl.game.getRelativePath(e) + "/" + N.seoName.formatSeoName(t), n)
        }
        function A(e, t, n, r, o) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === o && (o = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case Y.HomePage:
                    return f(r);
                case Y.GamesPage:
                    return (n ? m : d)(r);
                default:
                    return f(r)
                }
            }(e, t, r),
            N.urlService.getUrlWithQueries(r, I(I({}, n), o))
        }
        function h() {
            return document.referrer
        }
        (bl = Y = Y || {}).SearchPage = "searchPage",
        bl.SortDetailPageDiscover = "sortDetailPageDiscover",
        bl.SortDetailPageHome = "sortDetailPageHome",
        bl.GameDetailPage = "gameDetailPage",
        bl.GamesPage = "gamesPage",
        bl.HomePage = "homePage",
        bl.PeopleListInHomePage = "peopleListInHomePage",
        bl.InterestCatcher = "interestCatcher",
        bl.SearchLandingPage = "searchLandingPage";
        var R, g, F, S, y, b, I = function() {
            return (I = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, U = v, _ = function() {
            return (_ = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, O = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        }, k = (Sl = x.eventStreamService.eventTypes).pageLoad, B = Sl.formInteraction;
        function G(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === T.Presence.PresenceTypes.InGame
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
        function H(t, e) {
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
        function z(e, t) {
            function n(e) {
                return (e = null === (e = null == e ? void 0 : e.primaryMediaAsset) || void 0 === e ? void 0 : e.wideImageAssetId) && "0" !== e ? parseInt(e, 10) : null
            }
            var r;
            return e.layoutDataBySort && t && e.layoutDataBySort[t] ? r = n(e.layoutDataBySort[t]) : e.defaultLayoutData && (r = n(e.defaultLayoutData)),
            r || n(e)
        }
        function W(r, o, e, t) {
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[R.ThumbnailAssetIds] = e.map(function(e) {
                return null !== (e = z(r[e], o.toString())) && void 0 !== e ? e : "0"
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
        function q(r, o, e, t) {
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[R.TileBadgeContexts] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = o.toString(),
                t.layoutDataBySort && e && t.layoutDataBySort[e] ? n = V(t.layoutDataBySort[e]) : t.defaultLayoutData && (n = V(t.defaultLayoutData)),
                n) && void 0 !== n ? n : "0"
            }),
            t) : {}
        }
        function J(n, r, e, t) {
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
        function Z(e) {
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
                    return [2, N.httpService.get({
                        url: T.EnvironmentUrls.thumbnailsApi + "/v1/assets",
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
        (Yn = R = R || {}).AbsPositions = "absPositions",
        Yn.AdsPositions = "adsPositions",
        Yn.AdFlags = "adFlags",
        Yn.Algorithm = "algorithm",
        Yn.AppliedFilters = "appliedFilters",
        Yn.AttributionId = "attributionId",
        Yn.ComponentType = "componentType",
        Yn.Direction = "direction",
        Yn.Distance = "distance",
        Yn.HttpReferrer = "httpReferrer",
        Yn.EmphasisFlag = "emphasisFlag",
        Yn.FilterId = "filterId",
        Yn.FilterIds = "filterIds",
        Yn.GameSetTargetId = "gameSetTargetId",
        Yn.GameSetTypeId = "gameSetTypeId",
        Yn.InteractionType = "interactionType",
        Yn.IsAd = "isAd",
        Yn.NativeAdData = "nativeAdData",
        Yn.AdIds = "adIds",
        Yn.NumberOfLoadedTiles = "numberOfLoadedTiles",
        Yn.Page = "page",
        Yn.PageSession = "pageSession",
        Yn.PlaceId = "placeId",
        Yn.PlayContext = "playContext",
        Yn.Position = "position",
        Yn.PreviousOptionId = "previousOptionId",
        Yn.PromptId = "promptId",
        Yn.PromptText = "promptText",
        Yn.ResourceId = "resourceId",
        Yn.ResponseOptionIds = "responseOptionIds",
        Yn.ResponseOptionTexts = "responseOptionTexts",
        Yn.RootPlaceIds = "rootPlaceIds",
        Yn.SelectedIds = "selectedIds",
        Yn.SelectedTexts = "selectedTexts",
        Yn.ScreenSizeX = "screenSizeX",
        Yn.ScreenSizeY = "screenSizeY",
        Yn.ScrollAreaSize = "scrollAreaSize",
        Yn.ScrollDepth = "scrollDepth",
        Yn.SelectedOptionId = "selectedOptionId",
        Yn.SelectedOptionIds = "selectedOptionIds",
        Yn.ShareLinkType = "shareLinkType",
        Yn.ShareLinkId = "shareLinkId",
        Yn.SortId = "sortId",
        Yn.SortPos = "sortPos",
        Yn.StartDepth = "startDepth",
        Yn.StartPos = "startPos",
        Yn.SuggestionKwd = "suggestionKwd",
        Yn.SuggestionReplacedKwd = "suggestionReplacedKwd",
        Yn.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        Yn.SuggestionAlgorithm = "suggestionAlgorithm",
        Yn.TimeToRespond = "timeToRespond",
        Yn.Token = "token",
        Yn.Topics = "topics",
        Yn.TreatmentType = "treatmentType",
        Yn.UniverseId = "universeId",
        Yn.UniverseIds = "universeIds",
        Yn.FriendId = "friendId",
        Yn.ThumbnailAssetIds = "thumbnailAssetIds",
        Yn.ThumbnailListIds = "thumbnailListIds",
        Yn.LinkPath = "linkPath",
        Yn.LocationName = "locationName",
        Yn.RowsOnPage = "rowsOnPage",
        Yn.PositionsInRow = "positionsInRow",
        Yn.NavigationUids = "navigationUids",
        Yn.TileBadgeContexts = "tileBadgeContexts",
        Yn.ButtonName = "buttonName",
        Yn.IsInterested = "isInterested",
        Yn.InterestedUniverseIds = "interestedUniverseIds",
        (dr = g = g || {}).GameImpressions = "gameImpressions",
        dr.GameDetailReferral = "gameDetailReferral",
        dr.SortDetailReferral = "sortDetailReferral",
        dr.FeedScroll = "feedScroll",
        dr.NavigateToSortLink = "navigateToSortLink",
        dr.SurveyInteraction = "surveyInteraction",
        dr.SurveyImpression = "surveyImpression",
        dr.InterestCatcherClick = "interestCatcherClick",
        dr.FilterImpressions = "filterImpressions",
        dr.GamesFilterClick = "gamesFilterClick",
        dr.RequestRefundClick = "requestRefundClick",
        (fr = F = F || {}).HomePageSessionInfo = "homePageSessionInfo",
        fr.GameSearchSessionInfo = "gameSearchSessionInfo",
        fr.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        fr.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
        (Cl = {}).Submission = "submission",
        Cl.Cancellation = "cancellation",
        (Ui = S = S || {}).Horizontal = "horizontal",
        Ui.Vertical = "vertical",
        (et = y = y || {}).Skip = "skip",
        et.Continue = "continue",
        et.Interested = "interested",
        (tt = b = b || {}).OpenDropdown = "openDropdown",
        tt.CloseDropdown = "closeDropdown",
        tt.Apply = "apply";
        var ee = ((lt = {})[g.GameImpressions] = function(e) {
            e = O(e, []);
            return [{
                name: g.GameImpressions,
                type: g.GameImpressions,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: g.GameDetailReferral,
                type: g.GameDetailReferral,
                context: k
            }, ne(_(((t = {})[R.AttributionId] = s(i.GameDetailReferral),
            t[R.HttpReferrer] = h(),
            t), e))]
        }
        ,
        lt[g.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SortDetailReferral,
                type: g.SortDetailReferral,
                context: k
            }, ne(_({}, e))]
        }
        ,
        lt[g.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.NavigateToSortLink,
                type: g.NavigateToSortLink,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyInteraction,
                type: g.SurveyInteraction,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyImpression,
                type: g.SurveyImpression,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.InterestCatcherClick,
                type: g.InterestCatcherClick,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.FilterImpressions,
                type: g.FilterImpressions,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.GamesFilterClick,
                type: g.GamesFilterClick,
                context: B
            }, ne(_({}, e))]
        }
        ,
        lt[g.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: g.RequestRefundClick,
                type: g.RequestRefundClick,
                context: B
            }, ne(((t = {})[R.PlaceId] = e.placeId,
            t))]
        }
        ,
        lt)
          , te = (new T.Intl).getDateTimeFormatter()
          , ne = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return "object" == typeof n[t] && n[t] && (e[t] = JSON.stringify(n[t])),
                "number" == typeof n[t] && (e[t] = n[t]),
                "string" == typeof n[t] && (e[t] = encodeURIComponent(n[t])),
                "boolean" == typeof n[t] && (e[t] = n[t] ? 1 : 0),
                e
            }, {})
        }
          , re = N.urlService.parseQueryString
          , oe = N.numberFormat.getNumberFormat
          , ie = j
          , ae = function(e, t) {
            t = j(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , le = function(e) {
            return -1 === e ? "--" : N.abbreviateNumber.getAbbreviatedValue(e)
        }
          , se = function(n, r) {
            if (0 === n.length || 0 === r)
                return [n];
            var e = Math.ceil(n.length / r);
            return new Array(e).fill(0).map(function(e, t) {
                return n.slice(t * r, (t + 1) * r)
            })
        }
          , ue = function() {
            return (ue = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ce = function(e, a, l, s) {
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
          , de = function(n, r) {
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
          , fe = function(r, o, i) {
            return void 0 === i && (i = 1),
            ce(void 0, void 0, Promise, function() {
                var n, t;
                return de(this, function(e) {
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
                        [2, ue(ue({}, o), t)];
                    case 2:
                        return e.sent(),
                        [2, o];
                    case 3:
                        return [2]
                    }
                })
            })
        }
          , pe = function(r, o, i, a, l, s) {
            return ce(void 0, void 0, Promise, function() {
                var t, n;
                return de(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = ue(ue({
                            pageType: r,
                            sessionId: o,
                            supportedTreatmentTypes: [w.SortlessGrid],
                            sduiTreatmentTypes: s,
                            authIntentData: a
                        }, i), Z(l)),
                        [4, N.httpService.post(u.url.getOmniRecommendations, t)];
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
                        return [4, N.httpService.post(u.url.getOmniRecommendationsMetadata, {
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
          , ve = function(r) {
            return ce(void 0, void 0, Promise, function() {
                var t, n;
                return de(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: T.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
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
          , he = Xu(4452)
          , ge = Xu.n(he)
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
        (bl = function(e) {
            var t = e.errorMessage
              , n = e.onRefresh
              , e = e.className;
            return X().createElement("div", {
                "data-testid": "error-status",
                className: ge()("game-error", e)
            }, X().createElement("span", {
                className: "icon-spot-error-2xl"
            }), X().createElement("p", {
                className: "text-label error-text"
            }, t), X().createElement(ye.Button, {
                className: "refresh-button",
                variant: be.control,
                onClick: n
            }, X().createElement("span", {
                className: "icon-common-refresh"
            })))
        }
        ).defaultProps = {
            className: ""
        };
        var Se, Ce, we, Ee, Pe = bl, xe = function() {
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
        }, _e = HeaderScripts, Oe = T.EnvironmentUrls.gamesApi, ke = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: Oe + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: Oe + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: Oe + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: Oe + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: Oe + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: Oe + "/v1/games/sorts",
                    withCredentials: !0
                },
                getUniverseVoiceStatus: function(e) {
                    return {
                        withCredentials: !0,
                        url: T.EnvironmentUrls.voiceApi + "/v1/settings/universe/" + e
                    }
                },
                getVoiceOptInStatus: {
                    withCredentials: !0,
                    url: T.EnvironmentUrls.voiceApi + "/v1/settings/user-opt-in"
                },
                getAssetDataFromAssetId: function(e) {
                    return {
                        url: T.EnvironmentUrls.assetDeliveryApi + "/v2/assetId/" + e,
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
        }, Ae = function(n, r) {
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
        }, Re = ke.defaultCacheCriteria, Le = x.dataStores.gamesDataStore, De = x.dataStores.userDataStoreV2, Me = (x.dataStores.localeDataStore,
        x.dataStores.userDataStore.FriendsUserSortType), Fe = function() {
            return De.getFriends({
                userId: null === _e.authenticatedUser || void 0 === _e.authenticatedUser ? void 0 : _e.authenticatedUser.id,
                userSort: Me.StatusFrequents,
                isGuest: !1
            }, Re)
        }, Ue = function(t) {
            return Ne(void 0, void 0, Promise, function() {
                return Ae(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Le.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Be = function(n) {
            return Ne(void 0, void 0, Promise, function() {
                var t;
                return Ae(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Le.getPlaceDetails([n])];
                    case 1:
                        return t = e.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                })
            })
        }, Ge = function(e) {
            return N.httpService.get(ke.url.getAssetDataFromAssetId(e)).then(function(e) {
                return e.data
            })
        };
        function je(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function He(e) {
            return e.isShimmerEnabled ? "shimmer-animation" : null
        }
        function ze(e) {
            return e !== Se.IMAGE_TOP_LEFT ? "" : "game-card-pill-top-left"
        }
        function We(e) {
            var t = [];
            return (e = null === (e = null == e ? void 0 : e.tileBadgesByPosition) || void 0 === e ? void 0 : e.ImageTopLeft) && e.length && (t = e.map(function(e) {
                var t, n = {
                    id: e.analyticsId
                };
                return e.tileBadgeType === Ee.Text && e.text ? (n.text = e.text,
                n.animationClass = He(e)) : e.tileBadgeType === Ee.Icon && e.icons && (t = e.icons.map(je).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = He(e)),
                n
            })),
            t.length ? ((e = {})[Se.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function Ve(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === we.TextLabel ? e.footer : null
        }
        (Sl = Se = Se || {}).INVALID = "Invalid",
        Sl.IMAGE_TOP_LEFT = "ImageTopLeft",
        Sl.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (Yn = Ce = Ce || {}).Home = "Home",
        Yn.Games = "Games",
        (dr = {}).Invalid = "Invalid",
        dr.HasLootBoxes = "HasLootBoxes",
        dr.HasInGameTrading = "HasInGameTrading",
        dr.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        dr.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        dr.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        dr.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (fr = {}).MorphToR6 = "MorphToR6",
        fr.PlayerChoice = "PlayerChoice",
        fr.MorphToR15 = "MorphToR15",
        (Cl = {}).Scroll = "Scroll",
        Cl.Button = "Button",
        (we = we || {}).TextLabel = "TextLabel",
        (Ui = Ee = Ee || {}).Text = "Text",
        Ui.Icon = "Icon";
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
          , Xe = .1
          , Ye = -1
          , Ze = 5
          , Qe = Je
          , et = $e
          , tt = Ke
          , nt = {
            ActionApply: "Action.Apply",
            LabelSponsoredAd: "Label.SponsoredAd",
            LabelNoSearchResults: "LabelNoSearchResults",
            LabelPlayingOnePlusUsersWithComma: "LabelPlayingOnePlusUsersWithComma",
            LabelPlayingOneUser: "LabelPlayingOneUser",
            LabelBy: "LabelCreatorBy",
            LabelByPrefix: "Label.By"
        }
          , rt = {
            LabelApiError: "Label.ApiError",
            LabelGames: "Label.Games",
            LabelSponsoredAdsDisclosureStatic: "Label.SponsoredAdsDisclosureStatic"
        }
          , ot = {
            LabelDiscover: "Label.Discover",
            LabelCharts: "Label.Charts",
            LabelsHome: "Label.sHome",
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
          , at = {
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
            ActionRequestRefund: "Action.RequestRefund",
            HeadingNotice: "Body.NotesTitle",
            InExperiencePurchase: "Notes.InExperiencePurchase"
        }
          , lt = PropTypes
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
              , r = X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: qe.ThumbnailFormat.jpeg
            });
            return X().createElement("div", {
                className: "border-bottom player-interaction-container"
            }, X().createElement("span", {
                className: "cursor-pointer game-icon"
            }, X().createElement(ye.Link, {
                url: e,
                className: "game-card-link"
            }, r)), X().createElement("span", {
                className: "game-info-container"
            }, X().createElement(ye.Link, {
                url: e,
                className: "game-name"
            }, o), !t && X().createElement(ye.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(ut))))
        }
        ft.propTypes = {
            game: (oe = Xu.n(lt))().shape({
                universeId: oe().number,
                placeId: oe().number,
                name: oe().string,
                playerCount: oe().number,
                isShowSponsoredLabel: oe().bool,
                nativeAdData: oe().string,
                imageUrl: oe().string,
                referralUrl: oe().string,
                isPlayable: oe().bool
            }).isRequired,
            translate: oe().func.isRequired
        };
        var pt = ft;
        function mt(e) {
            var t = e.playerId
              , e = e.altName;
            return X().createElement("div", {
                className: "avatar-card-link"
            }, X().createElement(qe.Thumbnail2d, {
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
            playerId: oe().number.isRequired,
            altName: oe().string
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
            return X().createElement("div", {
                className: "border-bottom player-info"
            }, X().createElement("span", {
                className: "player-name"
            }, t), X().createElement(ye.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , n = x.playGameService.buildPlayGameProperties(a, l, s, u)
                      , r = dt.joinGameInPlacesList
                      , o = dt.gamePlayIntentInPlacesList
                      , o = {
                        eventName: r.name,
                        ctx: r.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: o.ctx
                    };
                    x.playGameService.launchGame(n, o),
                    i(e)
                },
                isDisabled: !n
            }, r(ct)))
        }
        ht.propTypes = {
            playerData: oe().shape({
                presence: oe().shape({
                    rootPlaceId: oe().number,
                    placeId: oe().number,
                    gameId: oe().string
                }),
                id: oe().number,
                nameForDisplay: oe().string
            }).isRequired,
            dismissModal: oe().func.isRequired,
            isPlayable: oe().bool.isRequired,
            translate: oe().func.isRequired
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
            X().createElement("div", {
                className: "interaction-container"
            }, X().createElement("ul", {
                className: "interaction-list"
            }, n.map(function(e, t) {
                var n = e + t
                  , r = l[e]
                  , t = r.id
                  , e = r.nameForDisplay;
                return X().createElement("li", {
                    key: n,
                    className: "interaction-item",
                    "aria-hidden": "true"
                }, X().createElement("span", {
                    className: "avatar avatar-headshot avatar-headshot-sm player-avatar"
                }, X().createElement(vt, {
                    playerId: t,
                    altName: e
                })), X().createElement(gt, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        yt.propTypes = {
            friendsData: oe().arrayOf(oe().shape({
                presense: oe().shape({
                    rootPlaceId: oe().number,
                    placeId: oe().number,
                    gameId: oe().string
                }),
                id: oe().number,
                nameForDisplay: oe().string
            })).isRequired,
            friendsInGame: oe().arrayOf(oe().number).isRequired,
            dismissModal: oe().func.isRequired,
            isPlayable: oe().bool.isRequired,
            translate: oe().func.isRequired
        };
        var bt = yt;
        function It(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(st);
            return X().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, X().createElement(ye.Modal.Header, {
                title: e,
                onClose: o
            }), X().createElement(pt, {
                game: r,
                translate: i
            }), X().createElement(bt, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        It.propTypes = {
            friendsData: oe().arrayOf(oe().shape({
                presense: oe().shape({
                    rootPlaceId: oe().number,
                    placeId: oe().number,
                    gameId: oe().string
                }),
                id: oe().number,
                nameForDisplay: oe().string
            })).isRequired,
            friendsInGame: oe().arrayOf(oe().number).isRequired,
            game: oe().shape({
                universeId: oe().number,
                placeId: oe().number,
                name: oe().string,
                playerCount: oe().number,
                isShowSponsoredLabel: oe().bool,
                nativeAdData: oe().string,
                imageUrl: oe().string,
                referralUrl: oe().string,
                isPlayable: oe().bool
            }).isRequired,
            dismissModal: oe().func.isRequired,
            translate: oe().func.isRequired
        };
        var St = It
          , te = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (bl = function(e) {
            var t = e.tooltipText
              , n = e.placement
              , r = e.sizeInPx
              , r = void 0 === r ? 16 : r
              , e = e.centerIcon;
            return X().createElement("span", {
                className: ge()("info-tooltip-container", {
                    "icon-centered": e
                })
            }, X().createElement(ye.Tooltip, {
                id: "games-info-tooltip",
                placement: n,
                containerClassName: ge()("games-info-tooltip", {
                    "icon-centered": e
                }),
                content: t
            }, X().createElement("svg", {
                width: r,
                height: r,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, X().createElement("path", {
                d: "M8.97 5.44H7V4H8.97V5.44Z",
                fill: "currentColor"
            }), X().createElement("path", {
                d: "M8.94347 11.9999H7.05347V6.37988H8.94347V11.9999Z",
                fill: "currentColor"
            }), X().createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",
                fill: "currentColor"
            }))))
        }
        ).defaultProps = {
            sizeInPx: 16
        };
        var Ct = bl
          , wt = function() {
            return (wt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Et = ((Sl = {})[$.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Sl[$.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        Sl[$.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Sl[$.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        Sl[$.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        Sl)
          , Pt = wt(wt({}, Et), ((Yn = {})[$.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        Yn))
          , xt = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function Tt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return X().createElement(K.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && X().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + ze(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return X().createElement(kt, {
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
            e = le(e),
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-player-count"
            }, X().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), X().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function Ot(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = ge()("game-card-image-pill", {
                "hover-only": e === L.Hover
            });
            return X().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, X().createElement(_t, {
                playerCount: t
            }))
        }
        (dr = function(e) {
            var t = e.animationClass
              , n = e.isFocused
              , r = e.icons
              , o = e.text;
            return null != r && r.length || o ? X().createElement("div", {
                className: "game-card-pill-with-animation"
            }, X().createElement("div", {
                className: ge()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
                e))
            }, (null == r ? void 0 : r.length) && r.map(function(e, t) {
                return X().createElement("span", {
                    key: t,
                    className: "game-card-pill-icon " + e
                })
            }), o && X().createElement("div", {
                className: "game-card-pill-text"
            }, o))) : null
        }
        ).defaultProps = {
            animation: void 0
        };
        var kt = dr;
        function Nt(e) {
            return e = e.featureTypes,
            X().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, e.map(function(e) {
                return At[e] && X().createElement("span", {
                    key: e,
                    className: At[e]
                })
            })))
        }
        Ot.defaultProps = {
            playerCountStyle: void 0
        };
        var At = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        };
        function Rt(e) {
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
            return X().createElement(ye.Link, {
                url: U(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, X().createElement(Lt, {
                gameLayoutData: s,
                isFocused: !!l
            }), i === Y.GamesPage ? X().createElement("div", {
                className: "game-card-thumb-container"
            }, X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: qe.ThumbnailFormat.jpeg,
                altName: r.name
            })) : X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: qe.ThumbnailFormat.jpeg,
                altName: r.name
            }), X().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        }
        (fr = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = We(t);
            return e ? X().createElement(Tt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? X().createElement(Nt, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== L.Always && n !== L.Hover ? null : X().createElement(Ot, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Lt = fr
          , Dt = function() {
            return (Dt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Mt = Ke.keyBoardEventCode
          , Ft = Ke.numberOfInGameAvatarIcons
          , Ut = Ke.numberOfInGameNames;
        function Bt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , e = e.playerCount
              , t = ae(n, t)
              , e = le(e);
            return X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats"
            }, X().createElement("span", {
                className: "info-label icon-votes-gray"
            }), t ? X().createElement("span", {
                className: "info-label vote-percentage-label"
            }, t) : X().createElement("span", {
                className: "info-label no-vote"
            }), X().createElement("span", {
                className: "info-label icon-playing-counts-gray"
            }), X().createElement("span", {
                className: "info-label playing-counts-label"
            }, e))
        }
        function Gt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = Ke.RatingPercentageText
              , t = (null == (t = ie(n, t)) ? void 0 : t.toString()) || "--";
            return X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-rating"
            }, X().createElement("span", {
                className: "info-label icon-votes-gray"
            }), X().createElement("span", {
                className: "info-label vote-percentage-label"
            }, r(e, {
                percentRating: t
            }) || t + "% Rating"))
        }
        function jt(e) {
            return e = e.footerData,
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, X().createElement("span", {
                className: "info-label"
            }, e.text.textLiteral))
        }
        function Ht(e) {
            var t = e.iconClassName
              , e = e.text;
            return X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, X().createElement("span", {
                className: ge()("info-label", t)
            }), X().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e))
        }
        function zt(e) {
            return e = e.footerText,
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, X().createElement("span", {
                className: "info-label"
            }, e))
        }
        function Wt(e) {
            return e = e.translate,
            X().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, X().createElement("div", {
                className: "native-ad-label"
            }, e(nt.LabelSponsoredAd), X().createElement(Ct, {
                tooltipText: e(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            })))
        }
        function Vt(e) {
            return e = e.user,
            X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.avatarHeadshot,
                size: qe.ThumbnailAvatarHeadshotSize.size48,
                targetId: e.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: qe.ThumbnailFormat.webp,
                altName: e.displayName
            })
        }
        function qt(e) {
            return e = e.translate,
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, X().createElement(Ct, {
                tooltipText: e(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            }), X().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(nt.LabelSponsoredAd)))
        }
        function Jt(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = Ke.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Ft ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? Ft - 1 : Ft
              , o = ge()("avatar-card", {
                "avatar-card-online": n
            });
            return X().createElement("div", {
                className: "info-avatar"
            }, r && X().createElement("div", {
                className: o
            }, X().createElement("div", {
                className: "avatar-count-container"
            }, X().createElement("span", {
                className: "avatar-count info-label"
            }, r))), t.slice(0, e).map(function(e) {
                return X().createElement("div", {
                    className: o,
                    key: e.displayName
                }, X().createElement(Vt, {
                    user: e
                }))
            }))
        }
        function $t(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, X().createElement(Jt, {
                friendsData: t,
                isOnline: e
            }), X().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function Kt(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            K.useState)(!1)
              , e = o[0]
              , i = o[1];
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return X().createElement("div", {
                className: "game-card-friend-info game-card-info",
                "data-testid": "game-tile-stats-friends"
            }, X().createElement("div", {
                className: "info-avatar",
                style: {
                    width: 22 * (t.slice(0, Ft).length - 1) + 32 + "px"
                }
            }, t.slice(0, Ft).map(function(e) {
                return X().createElement("div", {
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
                        e.code === Mt.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        i(!0))
                    }
                }, X().createElement(Vt, {
                    user: e
                }))
            })), r && X().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Ut ? r(nt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Ut
            }) : r(nt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), X().createElement(Xt, {
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
        Rt.defaultProps = {
            page: Y.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        Kt.defaultProps = {
            translate: void 0
        };
        var Xt = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , e = e.translate;
            return X().createElement(ye.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, X().createElement(St, {
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
        }, te)
          , Yt = function(e, a, l, s) {
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
        (Cl = (0,
        K.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.page
              , a = void 0 === i ? Y.HomePage : i
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
              , u = xe()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            K.useMemo)(function() {
                return G(c, o.universeId)
            }, [c, o.universeId])
              , y = Te(o, d);
            (0,
            K.useEffect)(function() {
                void 0 === v && 0 < g.length && Yt(void 0, void 0, void 0, function() {
                    var t;
                    return Zt(this, function(e) {
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
            return X().createElement("div", {
                ref: t,
                className: s,
                "data-testid": "game-tile",
                onMouseOver: l,
                onMouseLeave: u,
                onFocus: l,
                onBlur: u
            }, X().createElement(Rt, {
                id: n,
                isOnScreen: i,
                buildEventProperties: r,
                gameData: o,
                page: a,
                isFocused: e,
                topicId: d
            }, function() {
                if (!f)
                    return X().createElement(X().Fragment, null);
                if (null != o && o.isShowSponsoredLabel || null != o && o.isSponsored && p)
                    return X().createElement(Wt, {
                        translate: m
                    });
                var e = Ve(y);
                return e ? X().createElement(jt, {
                    footerData: e
                }) : 0 < g.length && v ? X().createElement(Kt, {
                    friendData: g,
                    gameData: v
                }) : null != o && o.friendActivityTitle ? X().createElement(zt, {
                    footerText: o.friendActivityTitle
                }) : X().createElement(Bt, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var Qt = Cl;
        (Ui = function(e) {
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
                return X().createElement(tn, null);
            r = ge()(r, "btn-full-width");
            return X().createElement(X().Fragment, null, X().createElement(ye.Link, {
                "data-testid": "hover-tile-purchase-button",
                className: r,
                url: n || (null == a ? void 0 : a.url)
            }, X().createElement("span", {
                className: o
            }), X().createElement("span", {
                className: "btn-text"
            }, (null == a ? void 0 : a.price) || "--"), " "))
        }
        ).defaultProps = {
            clientReferralUrl: ""
        };
        var en = Ui
          , tn = function() {
            return X().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function nn(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            K.useMemo)(function() {
                return z(t, n)
            }, [t, n])
              , e = (0,
            K.useMemo)(function() {
                return r === $.EventTile ? qe.ThumbnailGameThumbnailSize.width576 : qe.ThumbnailGameThumbnailSize.width384
            }, [r]);
            return null !== o ? X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.assetThumbnail,
                size: e,
                targetId: o,
                containerClass: "brief-game-icon",
                format: qe.ThumbnailFormat.jpeg,
                altName: t.name
            }) : X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameThumbnail,
                size: e,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: qe.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
        function rn(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , e = e.children;
            return n ? X().createElement(ye.Link, {
                url: o,
                className: t,
                tabIndex: r ? 0 : -1
            }, e) : X().createElement("span", {
                className: t
            }, e)
        }
        (lt = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.buttonClassName
              , i = e.purchaseIconClassName
              , a = e.clientReferralUrl
              , l = e.shouldPurchaseNavigateToDetails
              , e = T.PlayButton.usePlayabilityStatus
              , s = T.PlayButton.PlayabilityStatuses
              , u = T.PlayButton.PlayButton
              , c = T.PlayButton.PurchaseButton
              , e = e(t)
              , d = e[0]
              , f = e[1];
            switch (d) {
            case void 0:
            case s.GuestProhibited:
            case s.Playable:
                return X().createElement(u, {
                    universeId: t,
                    placeId: n,
                    status: null != d ? d : s.Playable,
                    eventProperties: r,
                    buttonClassName: o ? ge()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case s.PurchaseRequired:
                return l ? X().createElement(en, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: ge()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
                }) : X().createElement(c, {
                    universeId: t,
                    placeId: n,
                    iconClassName: null != i ? i : "icon-common-play",
                    refetchPlayabilityStatus: f,
                    buttonClassName: o
                });
            case s.UniverseRootPlaceIsPrivate:
                return X().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, X().createElement("span", {
                    className: "icon-status-private"
                }));
            default:
                return X().createElement("div", {
                    className: null != o ? o : "btn-growth-lg play-button"
                }, X().createElement("span", {
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
        var on = lt;
        (bl = X().forwardRef(function(e, t) {
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
              , S = e.translate
              , C = 0 === r
              , w = r === Qe.maxWideGameTilesPerCarouselPage - 1
              , E = xe()
              , P = E[0]
              , x = E[1]
              , T = E[2]
              , i = (0,
            K.useState)(n.placeId)
              , _ = i[0]
              , O = i[1];
            (0,
            K.useEffect)(function() {
                u && !Number.isNaN(u) ? O(parseInt(u, 10)) : n.navigationUid && Ue(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && O(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function k() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== $.EventTile ? X().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, X().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            K.useMemo)(function() {
                return U(_, n.name, o(n, r))
            }, [n, o, r, _])
              , v = o(n, r)
              , N = (0,
            K.useMemo)(function() {
                return G(a, n.universeId)
            }, [a, n.universeId])
              , A = (0,
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
              , R = Te(n, m)
              , g = function() {
                return (f !== $.GridTile || s === D.Enabled) && ((f !== $.EventTile || s === D.Enabled) && f !== $.InterestTile)
            }
              , b = (0,
            K.useMemo)(function() {
                return null != R && R.title ? R.title : n.name
            }, [n.name, null == R ? void 0 : R.title])
              , e = f !== $.InterestTile
              , E = f !== $.InterestTile
              , i = (0,
            K.useCallback)(function() {
                I && I()
            }, [I]);
            return X().createElement("li", {
                className: ge()("list-item", "hover-game-tile", {
                    "grid-tile": f === $.GridTile
                }, {
                    "event-tile": f === $.EventTile
                }, {
                    "interest-tile": f === $.InterestTile
                }, {
                    "first-tile": C
                }, {
                    "last-tile": w
                }, {
                    "image-overlay": p === M.imageOverlay
                }, {
                    "old-hover": p !== M.imageOverlay
                }, {
                    focused: P
                }),
                "data-testid": "wide-game-tile",
                onMouseOver: E ? x : void 0,
                onMouseLeave: E ? T : void 0,
                onFocus: E ? x : void 0,
                onBlur: E ? T : void 0,
                id: n.universeId.toString()
            }, n.universeId && X().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, X().createElement(rn, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: h,
                linkUrl: c
            }, X().createElement("div", {
                className: "featured-game-icon-container"
            }, X().createElement(nn, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), X().createElement(Lt, {
                gameLayoutData: R,
                playerCountStyle: l,
                playerCount: n.playerCount,
                isFocused: P
            })), X().createElement("div", {
                className: "info-container"
            }, X().createElement("div", {
                className: "info-metadata-container"
            }, X().createElement("div", {
                className: "game-card-name game-name-title",
                "data-testid": "game-tile-game-title",
                title: b
            }, b), X().createElement("div", {
                className: "wide-game-tile-metadata"
            }, X().createElement("div", {
                className: "base-metadata"
            }, function() {
                var e = k();
                if (P && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return X().createElement(qt, {
                        translate: S
                    });
                e = Ve(R);
                return e ? X().createElement(jt, {
                    footerData: e
                }) : 0 < (null == N ? void 0 : N.length) ? X().createElement($t, {
                    friendsData: N,
                    isOnline: !0
                }) : 0 < (null == A ? void 0 : A.length) ? X().createElement($t, {
                    friendsData: A,
                    isOnline: !1
                }) : n.friendVisitedString ? X().createElement(Ht, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === L.Footer ? X().createElement(Bt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : X().createElement(Gt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: S
                })
            }()), X().createElement("div", {
                className: "hover-metadata"
            }, k()))), P && p === M.imageOverlay && g() && X().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, X().createElement(on, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })))), P && p !== M.imageOverlay && g() && X().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, X().createElement(on, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === $.InterestTile && X().createElement(ye.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: S(it.ActionInterestCatcherInterested),
                onClick: i
            }, y ? X().createElement("span", {
                className: "icon-heart-red"
            }) : X().createElement("span", {
                className: "icon-heart"
            }), X().createElement("span", null, S(it.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var an = bl
          , ln = function() {
            return (ln = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , sn = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (Sl = (0,
        K.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = sn(e, ["componentType"]);
            switch (n) {
            case $.AppGameTileNoMetadata:
                return X().createElement(Qt, ln({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case $.GridTile:
            case $.EventTile:
            case $.InterestTile:
                return X().createElement(an, ln({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return X().createElement(Qt, ln({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var un = Sl
          , cn = (0,
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
            return X().createElement("div", {
                "data-testid": "game-carousel",
                ref: t,
                className: p
            }, n.map(function(e, t) {
                return X().createElement(un, {
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
        function dn(e) {
            var t = e.children
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && re(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            K.useState)(e && "string" == typeof e ? e : N.uuidService.generateRandomUuid())[0];
            return X().createElement(hn.Provider, {
                value: e
            }, t)
        }
        function fn() {
            return (0,
            K.useContext)(hn)
        }
        function pn(e) {
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
                    var e = d.indexOf(gn)
                      , t = d.indexOf(yn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + gn.length, t)
                          , t = d.slice(t + yn.length);
                        return X().createElement(ye.Link, {
                            url: i,
                            onClick: a
                        }, n, X().createElement("span", {
                            className: "link-text"
                        }, e), t, l ? X().createElement("span", {
                            className: "icon-chevron-right-dark"
                        }) : X().createElement("span", {
                            className: "icon-chevron-right"
                        }))
                    }
                }
                return d
            }, [d, i, l, a]);
            return d ? X().createElement("div", {
                className: "sort-subtitle-container"
            }, X().createElement("span", {
                className: "font-sort-subtitle text-default"
            }, e)) : null
        }
        cn.displayName = "GameCarousel";
        var mn = function(t, e, n) {
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
                se(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), Ke.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = u.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = ee.gameImpressions(t),
                    x.eventStreamService.sendEvent.apply(x.eventStreamService, t),
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
                return s.current = x.elementVisibilityService.observeChildrenVisibility({
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
          , vn = function() {
            return (vn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , hn = (0,
        K.createContext)("")
          , gn = Je.linkStartDelimiter
          , yn = Je.linkEndDelimiter
          , bn = WebBlox;
        function In(e, t) {
            var n;
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (n = function(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return Sn(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(e);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Sn(e, t)
                }(e)) || t && e && "number" == typeof e.length) {
                    n && (e = n);
                    var r = 0
                      , t = function() {};
                    return {
                        s: t,
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
                        f: t
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o, i = !0, a = !1;
            return {
                s: function() {
                    n = e[Symbol.iterator]()
                },
                n: function() {
                    var e = n.next();
                    return i = e.done,
                    e
                },
                e: function(e) {
                    a = !0,
                    o = e
                },
                f: function() {
                    try {
                        i || null == n.return || n.return()
                    } finally {
                        if (a)
                            throw o
                    }
                }
            }
        }
        function Sn(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Cn(e, t) {
            if ("function" == typeof e)
                return e(t);
            e && (e.current = t)
        }
        var wn = 19 <= parseInt(K.version.split(".")[0], 10) ? function(e) {
            return function(r) {
                var o, i = [], t = In(e);
                try {
                    for (t.s(); !(o = t.n()).done; )
                        !function() {
                            var e = o.value
                              , t = Cn(e, r)
                              , n = "function" == typeof t;
                            i.push(n ? t : function() {
                                return Cn(e, null)
                            }
                            )
                        }()
                } catch (e) {
                    t.e(e)
                } finally {
                    t.f()
                }
                return function() {
                    var e, t = In(i);
                    try {
                        for (t.s(); !(e = t.n()).done; )
                            (0,
                            e.value)()
                    } catch (e) {
                        t.e(e)
                    } finally {
                        t.f()
                    }
                }
            }
        }
        : function(r) {
            return function(e) {
                var t, n = In(r);
                try {
                    for (n.s(); !(t = n.n()).done; )
                        Cn(t.value, e)
                } catch (e) {
                    n.e(e)
                } finally {
                    n.f()
                }
            }
        }
          , En = "undefined" != typeof Map ? Map : (Object.defineProperty(xn.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        xn.prototype.get = function(e) {
            e = Pn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        xn.prototype.set = function(e, t) {
            var n = Pn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        xn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = Pn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        xn.prototype.has = function(e) {
            return !!~Pn(this.__entries__, e)
        }
        ,
        xn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        xn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        xn);
        function Pn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function xn() {
            this.__entries__ = []
        }
        var Tn = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , _n = void 0 !== Xu.g && Xu.g.Math === Math ? Xu.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , On = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(_n) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , kn = 2
          , Nn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , An = "undefined" != typeof MutationObserver
          , Rn = (Ln.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        Ln.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        Ln.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        Ln.prototype.updateObservers_ = function() {
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
        Ln.prototype.connect_ = function() {
            Tn && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            An ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
        Ln.prototype.disconnect_ = function() {
            Tn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        Ln.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Nn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        Ln.getInstance = function() {
            return this.instance_ || (this.instance_ = new Ln),
            this.instance_
        }
        ,
        Ln.instance_ = null,
        Ln);
        function Ln() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                On(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < kn)
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
        var Dn = function(e, t) {
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
          , Mn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || _n
        }
          , Fn = zn(0, 0, 0, 0);
        function Un(e) {
            return parseFloat(e) || 0
        }
        function Bn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Un(n["border-" + t + "-width"])
            }, 0)
        }
        function Gn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Fn;
            var r = Mn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Un(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Un(r.width)
              , s = Un(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Bn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Bn(r, "top", "bottom") + a)),
            (e = e) !== Mn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            zn(o.left, o.top, l, s)
        }
        var jn = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Mn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Mn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function Hn(e) {
            return Tn ? jn(e) ? zn(0, 0, (t = (t = e).getBBox()).width, t.height) : Gn(e) : Fn;
            var t
        }
        function zn(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var Wn = (Vn.prototype.isActive = function() {
            var e = Hn(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        Vn.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        Vn);
        function Vn(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = zn(0, 0, 0, 0),
            this.target = e
        }
        var qn = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            Dn(i, {
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
            Dn(this, {
                target: e,
                contentRect: i
            })
        }
          , Jn = ($n.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Mn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new Wn(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        $n.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Mn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e),
                t.size || this.controller_.removeObserver(this))
            }
        }
        ,
        $n.prototype.disconnect = function() {
            this.clearActive(),
            this.observations_.clear(),
            this.controller_.removeObserver(this)
        }
        ,
        $n.prototype.gatherActive = function() {
            var t = this;
            this.clearActive(),
            this.observations_.forEach(function(e) {
                e.isActive() && t.activeObservations_.push(e)
            })
        }
        ,
        $n.prototype.broadcastActive = function() {
            var e, t;
            this.hasActive() && (e = this.callbackCtx_,
            t = this.activeObservations_.map(function(e) {
                return new qn(e.target,e.broadcastRect())
            }),
            this.callback_.call(e, t, e),
            this.clearActive())
        }
        ,
        $n.prototype.clearActive = function() {
            this.activeObservations_.splice(0)
        }
        ,
        $n.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length
        }
        ,
        $n);
        function $n(e, t, n) {
            if (this.activeObservations_ = [],
            this.observations_ = new En,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var Kn = new ("undefined" != typeof WeakMap ? WeakMap : En)
          , Xn = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = Rn.getInstance()
              , n = new Jn(t,n,this);
            Kn.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            Xn.prototype[t] = function() {
                var e;
                return (e = Kn.get(this))[t].apply(e, arguments)
            }
        });
        var Yn = void 0 !== _n.ResizeObserver ? _n.ResizeObserver : Xn
          , Zn = Xu(4777)
          , Qn = Xu(8550)
          , er = Xu(8601);
        function tr(e, t) {
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
                    return nr(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return nr(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function nr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function rr(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function or(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? rr(Object(n), !0).forEach(function(e) {
                    ir(t, e, n[e])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : rr(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                })
            }
            return t
        }
        function ir(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function ar(e) {
            var t = e.iconClassName
              , n = e.color
              , r = e.width
              , e = e.iconOverrideStyles
              , e = (r = ur({
                color: n,
                width: r,
                iconOverrideStyles: e || {}
            }).classes).iconBaseStyles
              , r = r.iconOverride;
            return K.createElement("span", {
                className: he(e, r, t),
                "data-testid": "icon-component"
            })
        }
        function lr(e) {
            var t = e.containerClassName
              , n = e.callback
              , r = e.linkPath
              , o = e.ariaLabel
              , i = e.tabIndex
              , a = e.onFocus
              , l = e.onFocusLost
              , s = e.dataTestId
              , u = e.children
              , e = (c = gr({}).classes).linkContainerOverride
              , c = c.buttonContainerOverride;
            return r ? K.createElement("a", {
                href: r,
                onClick: function(e) {
                    e.stopPropagation(),
                    n && n()
                },
                onKeyDown: function(e) {
                    e.code === cr && (e.stopPropagation(),
                    n && n())
                },
                className: he(t, e),
                "aria-label": o,
                tabIndex: i,
                onFocus: a,
                onMouseOver: a,
                onBlur: l,
                onMouseLeave: l,
                "data-testid": s
            }, u) : n ? K.createElement("button", {
                type: "button",
                onClick: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    n()
                },
                onKeyDown: function(e) {
                    e.code === cr && (e.stopPropagation(),
                    e.preventDefault(),
                    n())
                },
                className: he(t, c),
                "aria-label": o,
                tabIndex: i,
                onFocus: a,
                onMouseOver: a,
                onBlur: l,
                onMouseLeave: l,
                "data-testid": s
            }, u) : K.createElement("div", {
                className: t,
                "aria-label": o,
                tabIndex: i,
                onFocus: a,
                onMouseOver: a,
                onBlur: l,
                onMouseLeave: l,
                "data-testid": s
            }, u)
        }
        var sr, ur = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.color
              , r = t.width
              , t = t.iconOverrideStyles;
            return {
                iconBaseStyles: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: n,
                    width: "".concat(r, "px"),
                    height: "".concat(r, "px")
                },
                iconOverride: or({}, t)
            }
        }), cr = "Enter", dr = "{linkStart}", fr = "{linkEnd}", pr = "0.3s", mr = "cubic-bezier(0.45, 0, 0, 1)", vr = {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "start"
        }, hr = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordWrap: "break-word"
        }, gr = (0,
        bn.makeStyles)()(function() {
            return {
                linkContainerOverride: {
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "none"
                    },
                    cursor: "pointer"
                },
                buttonContainerOverride: or({}, vr)
            }
        });
        function yr(e) {
            var t, n, r = {};
            return void 0 === e || (void 0 !== e.layoutOrder && (r.order = e.layoutOrder),
            void 0 !== e.anchorPoint && (r.transformOrigin = "".concat(100 * e.anchorPoint.x, "% ").concat(100 * e.anchorPoint.y, "%")),
            void 0 !== e.automaticSize && (e.automaticSize === sr.XY ? (r.width = "auto",
            r.height = "auto") : e.automaticSize === sr.X ? r.width = "auto" : e.automaticSize === sr.Y && (r.height = "auto")),
            void 0 !== e.size && (r.width = "calc(".concat(100 * e.size.xScale, "% + ").concat(e.size.xOffset, "px)"),
            r.height = "calc(".concat(100 * e.size.yScale, "% + ").concat(e.size.yOffset, "px)")),
            void 0 !== e.position && (r.position = "absolute",
            r.left = "calc(".concat(100 * e.position.xScale, "% + ").concat(e.position.xOffset, "px)"),
            r.top = "calc(".concat(100 * e.position.yScale, "% + ").concat(e.position.yOffset, "px)"),
            t = null !== (n = null === (t = e.anchorPoint) || void 0 === t ? void 0 : t.x) && void 0 !== n ? n : 0,
            n = null !== (n = null === (n = e.anchorPoint) || void 0 === n ? void 0 : n.y) && void 0 !== n ? n : 0,
            0 === t && 0 === n || (r.transform = "translate(-".concat(100 * t, "%, -").concat(100 * n, "%)"))),
            void 0 !== e.zIndex && (r.zIndex = e.zIndex)),
            r
        }
        function br(e) {
            return ir({}, "".concat(e.key), e.value)
        }
        function Ir(e, t, n) {
            return ir({}, "&[".concat(e.key, "='").concat(e.value, "']"), {
                color: t,
                font: n.Font,
                letterSpacing: n.LetterSpacing,
                fontFamily: n.FontFamily,
                fontWeight: n.FontWeight,
                fontSize: n.FontSize,
                lineHeight: n.LineHeight
            })
        }
        function Sr(e) {
            var r, t = e.onActivated, n = e.linkPath, o = e.text, i = e.textColor, a = e.fontStyle, l = void 0 === (d = e.gap) ? 0 : d, s = e.iconClassName, u = e.iconWidth, c = e.iconColor, d = void 0 !== (v = e.iconFirst) && v, f = e.containerOverrides, p = e.textOverrides, m = e.iconOverrides, v = (0,
            K.useMemo)(function() {
                return f ? yr(f) : {}
            }, [f]), e = (0,
            K.useMemo)(function() {
                return p ? yr(p) : {}
            }, [p]), h = (0,
            K.useMemo)(function() {
                return m ? yr(m) : {}
            }, [m]), e = (v = kr({
                gap: l,
                textColor: i,
                fontStyle: a,
                containerOverrideStyles: v,
                textOverrideStyles: e
            }).classes).textIconRow, g = v.textIconRowText, y = v.textOverride, b = v.iconBaseStyles, I = (v = (r = o,
            (0,
            K.useMemo)(function() {
                if (!r)
                    return {
                        parsedTextContent: "",
                        cleansedTextLabel: ""
                    };
                var e = r.indexOf(Tr)
                  , t = r.indexOf(_r);
                if (-1 !== e && -1 !== t && e < t) {
                    var n = r.slice(0, e)
                      , e = r.slice(e + Tr.length, t)
                      , t = r.slice(t + _r.length);
                    return {
                        parsedTextContent: K.createElement(K.Fragment, null, n, K.createElement("b", null, K.createElement("u", null, e)), t),
                        cleansedTextLabel: "".concat(n).concat(e).concat(t)
                    }
                }
                return {
                    parsedTextContent: r,
                    cleansedTextLabel: r
                }
            }, [r]))).parsedTextContent, o = v.cleansedTextLabel, v = (0,
            K.useMemo)(function() {
                return K.createElement("span", or({
                    className: he(g, y),
                    "data-testid": "text-icon-row-text"
                }, br(Or)), I)
            }, [I, g, y]), a = a.LineHeight * a.FontSize, S = null != c ? c : i, C = null != u ? u : a, a = (0,
            K.useMemo)(function() {
                return s ? K.createElement(ar, {
                    iconClassName: he(b, s),
                    color: S,
                    width: C,
                    iconOverrideStyles: h
                }) : null
            }, [S, C, b, s, h]), a = d ? K.createElement(K.Fragment, null, a, v) : K.createElement(K.Fragment, null, v, a);
            return K.createElement(lr, {
                containerClassName: e,
                callback: t,
                linkPath: n,
                ariaLabel: o,
                dataTestId: "text-icon-row"
            }, a)
        }
        function Cr(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.textColor
              , o = void 0 === (i = e.titleFontStyle) ? {
                Font: '700 14/1.2 "Builder Sans"',
                LetterSpacing: -.01,
                FontFamily: '"Builder Sans"',
                FontWeight: "700",
                FontSize: 14,
                LineHeight: 1.2
            } : i
              , i = void 0 === (a = e.subtitleFontStyle) ? {
                Font: '400 14/1.4 "Builder Sans"',
                LetterSpacing: 0,
                FontFamily: '"Builder Sans"',
                FontWeight: "400",
                FontSize: 14,
                LineHeight: 1.4
            } : a
              , a = void 0 === (a = e.subtitleMaxLines) ? 1 : a
              , e = e.textGap
              , e = Nr({
                subtitleMaxLines: a,
                subtitleFontStyle: i,
                textColor: r,
                textGap: void 0 === e ? 0 : e
            }).classes;
            return K.createElement("div", {
                className: e.attributionTextContentContainer,
                "data-testid": "attribution-text-content-container"
            }, K.createElement(Sr, {
                text: t,
                fontStyle: o,
                textColor: r
            }), K.createElement("span", {
                className: e.attributionSubtitle
            }, n))
        }
        function wr(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.textColor
              , o = void 0 === (d = e.height) ? "auto" : d
              , i = e.leftAssetComponent
              , a = e.rightButtonComponent
              , l = e.titleFontStyle
              , s = e.subtitleFontStyle
              , u = e.subtitleMaxLines
              , c = e.titleSubtitleGap
              , e = (d = Ar({
                height: o
            }).classes).attributionRowContainer
              , o = d.attributionRowThumbnailContainer
              , d = d.attributionRowButtonContainer;
            return K.createElement("div", {
                className: e
            }, i && K.createElement("div", {
                className: o
            }, i), K.createElement(Cr, {
                title: t,
                subtitle: n,
                textColor: r,
                titleFontStyle: l,
                subtitleFontStyle: s,
                subtitleMaxLines: u,
                textGap: c
            }), a && K.createElement("div", {
                className: d
            }, a))
        }
        function Er(e) {
            var t = e.scrollArrowClassName
              , n = e.scrollIconClassName
              , r = e.handleClick;
            return K.createElement("div", {
                "data-testid": "carousel-scroll-arrow",
                className: t,
                onClick: r,
                onKeyDown: function(e) {
                    e.code === cr && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, K.createElement("span", {
                className: n,
                "data-testid": "carousel-scroll-arrow-icon"
            }))
        }
        function Pr(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , o = e.onScrollForward
              , i = e.scrollBackArrowClassName
              , e = e.scrollForwardArrowClassName;
            return K.createElement(K.Fragment, null, !t && K.createElement(Er, {
                scrollArrowClassName: i,
                scrollIconClassName: "icon-chevron-heavy-left",
                handleClick: r
            }), !n && K.createElement(Er, {
                scrollArrowClassName: e,
                scrollIconClassName: "icon-chevron-heavy-right",
                handleClick: o
            }))
        }
        (Cl = sr = sr || {}).None = "None",
        Cl.X = "X",
        Cl.Y = "Y",
        Cl.XY = "XY";
        var xr, Tr = dr, _r = fr, Or = {
            key: "data-sdui-text",
            value: "true"
        }, kr = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.gap
              , r = t.textColor
              , o = t.fontStyle
              , i = t.containerOverrideStyles
              , t = t.textOverrideStyles;
            return {
                textIconRow: or({
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
                textIconRowText: or(or({}, hr), Ir(Or, r, o)),
                textOverride: or({
                    flexShrink: 1,
                    minWidth: 0
                }, t),
                iconBaseStyles: {
                    flexShrink: 0
                }
            }
        }), Nr = (0,
        bn.makeStyles)({
            name: "AttributionTextContent"
        })(function(e, t) {
            var n = t.subtitleMaxLines
              , r = t.subtitleFontStyle
              , o = t.textColor
              , t = t.textGap;
            return {
                attributionTextContentContainer: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "".concat(t, "px")
                },
                attributionSubtitle: or({
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "140%",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: n,
                    WebkitBoxOrient: "vertical"
                }, r && Ir(Or, o, r))
            }
        }), Ar = (0,
        bn.makeStyles)()(function(e, t) {
            return {
                attributionRowContainer: {
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: t.height
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
        }), Rr = null !== (Ui = window.ResizeObserver) && void 0 !== Ui ? Ui : Yn;
        function Lr(e) {
            var n, t, r, o, i, a, l, s, u, c, d = e.itemsContainerRef, f = e.items, p = e.renderItem, m = e.collectionItemSize, v = e.updateItemsPerRow, h = e.layoutOverrides, g = e.headerComponent, y = e.gapBetweenHeaderAndItems, b = e.isHorizontalScrollEnabled, I = e.scrollArrowBackgroundColor, S = e.scrollArrowBoxShadowColor, C = e.thresholdFromEnd, w = e.onReachedThresholdFromEnd, E = e.reportHorizontalScrollTelemetry, e = (N = tr((0,
            K.useState)(void 0), 2),
            P = N[0],
            n = N[1],
            t = (0,
            K.useCallback)(function(e) {
                var t = null == e || null === (t = e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                void 0 !== t && n(t)
            }, []),
            N = (0,
            K.useCallback)(function(e) {
                e && e[0] && e[0].target && t(e[0].target)
            }, [t]),
            r = (0,
            K.useRef)(new Rr(N)),
            N = (0,
            K.useCallback)(function(e) {
                e && null != r && r.current && (t(e),
                r.current.disconnect(),
                r.current.observe(e))
            }, [t]),
            (0,
            K.useEffect)(function() {
                var e = r.current;
                return function() {
                    e && e.disconnect()
                }
            }, []),
            [N, P]), P = (N = tr(e, 2))[0], x = N[1], T = (m = (o = x,
            i = null != h ? h : {},
            a = (N = Vr[e = m]).minItemWidth,
            l = N.minItemCount,
            s = N.maxItemCount,
            h = N.fractionalItemAmount,
            u = (0,
            K.useMemo)(function() {
                return null != i && i.columnGap ? i.columnGap : o ? o < 1024 ? 12 : o < 1280 ? 18 : 24 : 18
            }, [null == i ? void 0 : i.columnGap, o]),
            c = null !== (e = null == i ? void 0 : i.sideMargin) && void 0 !== e ? e : 0,
            N = (0,
            K.useMemo)(function() {
                if (o) {
                    var e = o - 2 * c
                      , e = Math.floor((e + u) / (a + u));
                    return Math.min(Math.max(l, e), s)
                }
                return l
            }, [o, l, s, a, u, c]),
            {
                numColumns: null !== (e = null == i ? void 0 : i.numColumns) && void 0 !== e ? e : N,
                fractionalItemAmount: null !== (N = null == i ? void 0 : i.fractionalItemAmount) && void 0 !== N ? N : h,
                columnGap: u,
                sideMargin: c
            })).numColumns, _ = m.fractionalItemAmount, O = m.columnGap, e = m.sideMargin;
            (0,
            K.useEffect)(function() {
                v && v(T)
            }, [v, T]);
            var k = b && f.length > T
              , N = (0,
            K.useMemo)(function() {
                if (x && 0 < T) {
                    var e = k ? T + _ : T;
                    return (x - (null != O ? O : 0) * (Math.ceil(e) - 1)) / e
                }
                return 0
            }, [x, k, T, _, O])
              , m = (h = function(n, o, i, a, l, s, r, u, c) {
                var t = (0,
                K.useRef)(0)
                  , d = (0,
                K.useRef)(null)
                  , e = tr((0,
                K.useState)(!1), 2)
                  , f = e[0]
                  , p = e[1]
                  , m = tr((0,
                K.useState)(!1), 2)
                  , v = m[0]
                  , h = m[1]
                  , g = tr((0,
                K.useState)(!1), 2)
                  , y = g[0]
                  , b = g[1]
                  , I = (0,
                K.useRef)(!1)
                  , S = (0,
                K.useCallback)(function(e) {
                    return t.current = e < 0 ? 0 : s - a < e ? s - a : e,
                    t.current
                }, [s, a])
                  , C = (0,
                K.useCallback)(function(e) {
                    var t;
                    n && u && d.current && i && (t = Math.max(null != r ? r : 0, 3 * i),
                    e + i >= d.current.scrollWidth - t ? I.current || (u(),
                    I.current = !0) : I.current = !1)
                }, [u, d, i, r, n])
                  , w = (0,
                K.useCallback)(function(e, t) {
                    var n, r;
                    d.current && (n = d.current.scrollLeft,
                    r = e * (o + (null != l ? l : 0)),
                    d.current.scrollLeft = r,
                    C(r),
                    p(e <= 0),
                    h(s - a <= e),
                    c && t && c(r - n, n, null != i ? i : -1))
                }, [o, l, C, s, a, i, c]);
                (0,
                K.useEffect)(function() {
                    n && w(t.current, !1)
                }, [w, n]);
                var E = (0,
                K.useCallback)(function() {
                    var e = S(t.current + a);
                    w(e, !0)
                }, [S, w, a])
                  , P = (0,
                K.useCallback)(function() {
                    var e = S(t.current - a);
                    w(e, !0)
                }, [S, w, a])
                  , x = (0,
                K.useCallback)(function(e) {
                    y || (b(!0),
                    e(),
                    setTimeout(function() {
                        b(!1)
                    }, 500))
                }, [y])
                  , e = (0,
                K.useCallback)(function() {
                    x(P)
                }, [P, x])
                  , m = (0,
                K.useCallback)(function() {
                    x(E)
                }, [E, x])
                  , g = (0,
                K.useCallback)(function(e) {
                    return e >= t.current && e < t.current + a
                }, [t, a]);
                return {
                    carouselScrollRef: d,
                    isScrollBackDisabled: f || y,
                    isScrollForwardDisabled: v || y,
                    handleScrollBackClick: e,
                    handleScrollForwardClick: m,
                    getIsTileVisible: g
                }
            }(k, N, x, T, O, f.length, C, w, E)).carouselScrollRef
              , b = h.isScrollBackDisabled
              , C = h.isScrollForwardDisabled
              , w = h.handleScrollBackClick
              , E = h.handleScrollForwardClick
              , A = h.getIsTileVisible
              , y = (e = qr({
                itemWidth: N,
                columnGap: O,
                sideMargin: e,
                gapBetweenHeaderAndItems: y,
                scrollArrowBackgroundColor: I,
                scrollArrowBoxShadowColor: S,
                scrollArrowBaseClassName: h = "scroll-arrow",
                scrollArrowPrevClassName: "prev",
                scrollArrowNextClassName: "next"
            }).classes).collectionCarouselContainer
              , I = e.carouselContainer
              , S = e.carousel
              , R = e.carouselItem;
            return K.createElement("div", {
                className: y
            }, g, K.createElement("div", {
                ref: P,
                className: I
            }, K.createElement("div", {
                ref: wn([m, d]),
                className: S
            }, f.map(function(e, t) {
                return K.createElement("div", {
                    key: t,
                    id: "collection-carousel-item",
                    className: R
                }, p(e, t, A(t)))
            })), k && K.createElement(Pr, {
                isScrollBackDisabled: b,
                isScrollForwardDisabled: C,
                onScrollBack: w,
                onScrollForward: E,
                scrollBackArrowClassName: he(h, "prev"),
                scrollForwardArrowClassName: he(h, "next")
            })))
        }
        function Dr(e) {
            var t = (l = e.gradient).startColor
              , n = l.endColor
              , r = l.startTransparency
              , o = l.endTransparency
              , i = l.degree
              , e = void 0 === (a = l.heightPercent) ? 1 : a
              , a = void 0 === (a = l.widthPercent) ? 1 : a
              , l = void 0 === (l = l.halfwayPointPercent) ? .5 : l
              , s = (i + 90) % 360
              , u = 1 - r
              , c = 1 - o
              , e = "".concat(100 * e, "%")
              , a = "".concat(100 * a, "%")
              , d = "".concat(100 * l, "%")
              , l = (0,
            K.useMemo)(function() {
                return "linear-gradient(".concat(s, "deg, ").concat(t).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ", ").concat(d, ", ").concat(n).concat(Math.round(255 * c).toString(16).padStart(2, "0"), ")")
            }, [t, n, u, c, s, d])
              , a = Jr({
                linearGradient: l,
                height: e,
                width: a
            }).classes;
            return K.createElement("div", {
                className: a.gradient
            })
        }
        function Mr(e) {
            var t = e.avatarThumbnails
              , n = e.iconWidth
              , r = e.avatarContainerBackgroundColor
              , o = e.avatarImageBackgroundColor
              , e = e.avatarBorderColor
              , e = (o = Kr({
                iconWidth: n,
                avatarContainerBackgroundColor: r,
                avatarImageBackgroundColor: o,
                avatarBorderColor: e,
                maxZIndex: t.length
            }).classes).facepileContainer
              , i = o.avatarContainer;
            return K.createElement("div", {
                className: e
            }, t.map(function(e) {
                return K.createElement("div", {
                    key: e.key,
                    className: i
                }, e)
            }))
        }
        function Fr(e) {
            var t = e.gradient
              , n = e.gradientHeightPercent
              , r = e.gradientWidthPercent
              , o = t.startColor
              , i = t.endColor
              , a = t.startTransparency
              , e = t.endTransparency
              , l = (t.degree + 90) % 360
              , s = 1 - a
              , u = 1 - e
              , a = "".concat(100 * n, "%")
              , e = "".concat(100 * r, "%")
              , n = (0,
            K.useMemo)(function() {
                return "linear-gradient(".concat(l, "deg, ").concat(o).concat(Math.round(255 * s).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ")")
            }, [o, i, s, u, l])
              , r = (0,
            bn.makeStyles)()(function() {
                return {
                    heroUnitGradient: {
                        bottom: "0px",
                        left: "0px",
                        position: "absolute"
                    }
                }
            })().classes.heroUnitGradient;
            return K.createElement("div", {
                style: {
                    background: n,
                    width: e,
                    height: a
                },
                className: r
            })
        }
        function Ur(e) {
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
            bn.makeStyles)()(function() {
                return {
                    heroUnitContentContainer: or(or({
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
                    heroUnitTitle: or(or(or(or({
                        color: "white",
                        position: "relative",
                        textShadow: "".concat(Xr),
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
                    heroUnitSubtitle: or({
                        color: "white",
                        textShadow: "".concat(Xr),
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
            }, K.createElement(Fr, {
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
        function Br(e) {
            var t = e.backgroundImageComponent
              , n = void 0 !== (r = e.forceViewportWidth) && r <= 600
              , r = (e = (0,
            bn.makeStyles)()(function() {
                return {
                    heroUnitBackgroundWindow: or(or({
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
                    heroUnitBackgroundContainer: or(or({
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
        function Gr(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.foregroundImageComponent
              , o = e.backgroundImageComponent
              , i = e.gradient
              , a = void 0 === (p = e.gradientHeightPercent) ? .5 : p
              , l = void 0 === (f = e.gradientWidthPercent) ? 1 : f
              , s = e.backgroundClickAction
              , u = e.backgroundClickLinkPath
              , c = e.bottomRowComponent
              , d = e.overlayPillComponent
              , f = void 0 === (p = e.minForegroundHeightPercent) ? .8 : p
              , p = void 0 === (p = e.maxForegroundHeightPercent) ? 1 : p
              , m = e.forceViewportWidth
              , v = K.useRef(!1)
              , h = (e = tr(K.useState(1), 2))[0]
              , g = e[1]
              , y = void 0 !== m && m <= 600
              , b = K.useRef(null)
              , I = K.useRef(null)
              , S = "".concat(Math.round(100 * f), "%")
              , C = "".concat(Math.round(100 * p), "%")
              , w = 360 * (p - f)
              , p = (e = (0,
            bn.makeStyles)()(function() {
                return {
                    heroUnitContainer: or({
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
                    }, m ? {
                        maxWidth: "".concat(m, "px")
                    } : {}),
                    heroUnitForegroundContainer: or(or({
                        height: C,
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
                    }, y ? {
                        height: S,
                        "--parallax-scale": "".concat(32)
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            height: S,
                            "--parallax-scale": "".concat(32)
                        },
                        "@media (min-width: 601px) and (max-width: 1140px)": {
                            height: "calc(".concat(S, " + ((").concat(w, " * (100vw - 600px)) / 540))")
                        }
                    }),
                    heroUnitTopSpacer: or(or({
                        height: "".concat(24, "px")
                    }, y ? {
                        height: "".concat(16, "px")
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            height: "".concat(16, "px")
                        }
                    })
                }
            })().classes).heroUnitContainer
              , f = e.heroUnitForegroundContainer
              , e = e.heroUnitTopSpacer
              , E = (0,
            K.useCallback)(function() {
                var e = Zn(.2, 0, .8, 1);
                if (b.current && window.innerHeight) {
                    var t = h;
                    if (!v.current) {
                        var n = b.current.getBoundingClientRect().top + 168;
                        if (n <= 0)
                            return;
                        t = Math.min(n, window.innerHeight) / window.innerHeight,
                        g(t)
                    }
                    t = (t - b.current.getBoundingClientRect().top / window.innerHeight) / t,
                    t = e(Math.max(Math.min(t, 1), 0));
                    I.current && I.current.style.setProperty("--scroll", t.toString())
                }
            }, [b, v, h]);
            return (0,
            K.useEffect)(function() {
                var e = Qn(E, 100)
                  , t = new MutationObserver(e);
                document.body && !v.current && t.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }),
                E();
                function n() {
                    E(),
                    v.current = !0,
                    t.disconnect()
                }
                return window.addEventListener("scroll", n),
                window.addEventListener("resize", n),
                function() {
                    window.removeEventListener("scroll", n),
                    window.removeEventListener("resize", n),
                    t.disconnect()
                }
            }, [v, E]),
            K.createElement("div", {
                ref: I
            }, K.createElement(lr, {
                containerClassName: p,
                callback: s,
                linkPath: u,
                ariaLabel: t,
                dataTestId: "hero-unit"
            }, K.createElement("div", {
                className: e
            }), K.createElement(Br, {
                backgroundImageComponent: o,
                forceViewportWidth: m
            }), K.createElement("div", {
                className: f
            }, r), K.createElement(Ur, {
                title: t,
                subtitle: n,
                heroUnitRef: b,
                gradient: i,
                gradientHeightPercent: a,
                gradientWidthPercent: l,
                bottomRowComponent: c,
                overlayPillComponent: d,
                forceViewportWidth: m
            })))
        }
        function jr(e) {
            var t = e.pillText
              , e = (n = (0,
            bn.makeStyles)()(function() {
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
        function Hr(e) {
            var t = e.onTitleActivated
              , n = e.titleText
              , r = e.titleLinkPath
              , o = e.titleTextColor
              , i = e.titleFontStyle
              , a = e.titleGap
              , l = e.titleIconClassName
              , s = e.titleIconWidth
              , u = e.titleIconColor
              , c = void 0 !== (E = e.titleIconFirst) && E
              , d = e.titleComponent
              , f = e.onSubtitleActivated
              , p = e.subtitleLinkPath
              , m = e.subtitleText
              , v = e.subtitleTextColor
              , h = e.subtitleFontStyle
              , g = e.subtitleGap
              , y = e.subtitleIconClassName
              , b = e.subtitleIconWidth
              , I = e.subtitleIconColor
              , S = void 0 !== (w = e.subtitleIconFirst) && w
              , C = e.subtitleComponent
              , w = void 0 === (E = e.verticalGap) ? 0 : E
              , E = e.iconComponent
              , P = e.containerOverrides
              , e = (0,
            K.useMemo)(function() {
                return P ? yr(P) : {}
            }, [P])
              , e = (w = Yr({
                verticalGap: w,
                containerOverrideStyles: e
            }).classes).sectionHeader
              , x = w.titleSubtitleContainer
              , T = (0,
            K.useMemo)(function() {
                return d || (void 0 !== n && void 0 !== o && void 0 !== i ? K.createElement(Sr, {
                    text: n,
                    textColor: o,
                    fontStyle: i,
                    gap: a,
                    iconClassName: l,
                    iconWidth: s,
                    iconColor: u,
                    iconFirst: c
                }) : null)
            }, [d, i, a, l, u, c, s, n, o])
              , _ = (0,
            K.useMemo)(function() {
                return C || (void 0 !== m && void 0 !== v && void 0 !== h ? K.createElement(Sr, {
                    onActivated: f,
                    linkPath: p,
                    text: m,
                    textColor: v,
                    fontStyle: h,
                    gap: g,
                    iconClassName: y,
                    iconWidth: b,
                    iconColor: I,
                    iconFirst: S
                }) : null)
            }, [f, p, C, h, g, y, I, S, b, m, v])
              , w = E
              , E = (0,
            K.useMemo)(function() {
                return K.createElement(lr, {
                    containerClassName: x,
                    callback: t,
                    linkPath: r,
                    ariaLabel: n,
                    dataTestId: "section-header-title-subtitle-container"
                }, T, _)
            }, [t, _, T, r, x, n]);
            return K.createElement("div", {
                className: e,
                "data-testid": "section-header"
            }, E, w)
        }
        function zr(e) {
            var t = e.topLeftSlot
              , n = e.topMiddleSlot
              , r = e.topRightSlot
              , o = e.centerLeftSlot
              , i = e.centerMiddleSlot
              , a = e.centerRightSlot
              , l = e.bottomLeftSlot
              , s = e.bottomMiddleSlot
              , u = e.bottomRightSlot
              , c = void 0 === (f = e.padding) ? 0 : f
              , d = e.containerOverrides
              , f = e.children
              , e = (0,
            K.useMemo)(function() {
                return d ? yr(d) : {}
            }, [d])
              , p = to({
                padding: c,
                containerOverrideStyles: e
            }).classes
              , m = (0,
            K.useMemo)(function() {
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
            }, [t, n, r, o, i, a, l, s, u])
              , e = (0,
            K.useMemo)(function() {
                return Qr.map(function(e) {
                    var t = m[e];
                    if (t) {
                        var n = p[e];
                        return K.createElement("div", {
                            key: e,
                            className: n,
                            "data-testid": "slot-wrapper-".concat(e)
                        }, t)
                    }
                    return null
                }).filter(function(e) {
                    return null !== e
                })
            }, [m, p]);
            return K.createElement("div", {
                className: p.overlayContainer,
                "data-testid": "slot-overlay-container"
            }, f, e)
        }
        function Wr(e) {
            var t = e.titleText
              , n = e.titleLines
              , r = e.titleFontStyles
              , o = e.titleColor
              , i = e.titleComponent
              , a = e.footerComponent
              , l = e.ctaButtonComponent
              , s = e.isContained
              , u = e.containmentPadding
              , e = n * (r.LineHeight * r.FontSize)
              , r = (o = no({
                titleHeight: e,
                titleLines: n,
                titleColor: o,
                titleFontStyles: r,
                isContained: s,
                containmentPadding: u
            }).classes).tileBottomContentContainer
              , s = o.tileBottomLeftContentContainer
              , u = o.tileBottomRightContentContainer
              , c = o.tileTitleContainer
              , d = o.tileTitleText
              , o = (0,
            K.useMemo)(function() {
                return i || (t ? K.createElement("div", {
                    className: c,
                    "data-testid": "tile-title-container"
                }, K.createElement("div", or({
                    className: d
                }, br(Or)), t)) : null)
            }, [i, t, c, d]);
            return K.createElement("div", {
                className: r
            }, K.createElement("div", {
                className: s
            }, o, a && a), l && K.createElement("div", {
                className: u
            }, l))
        }
        (lt = xr = xr || {}).XSmall = "XSmall",
        lt.Small = "Small",
        lt.Medium = "Medium",
        lt.Large = "Large",
        lt.XLarge = "XLarge";
        var Vr = (ir(bl = {}, xr.XSmall, {
            minItemWidth: 80,
            minItemCount: 3,
            maxItemCount: 20,
            fractionalItemAmount: .15
        }),
        ir(bl, xr.Small, {
            minItemWidth: 150,
            minItemCount: 3,
            maxItemCount: 12,
            fractionalItemAmount: .15
        }),
        ir(bl, xr.Medium, {
            minItemWidth: 233,
            minItemCount: 2,
            maxItemCount: 6,
            fractionalItemAmount: .15
        }),
        ir(bl, xr.Large, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 4,
            fractionalItemAmount: .3
        }),
        ir(bl, xr.XLarge, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 1,
            fractionalItemAmount: .1
        }),
        bl)
          , qr = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.itemWidth
              , r = t.columnGap
              , o = t.sideMargin
              , i = t.gapBetweenHeaderAndItems
              , a = t.scrollArrowBackgroundColor
              , l = t.scrollArrowBoxShadowColor
              , s = t.scrollArrowBaseClassName
              , u = t.scrollArrowPrevClassName
              , t = t.scrollArrowNextClassName;
            return {
                collectionCarouselContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(i, "px"),
                    marginLeft: "".concat(null != o ? o : 0, "px"),
                    marginRight: "".concat(null != o ? o : 0, "px")
                },
                carouselContainer: (ir(o = {
                    position: "relative"
                }, "& .".concat(s), or(or(or({
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
                }, a && {
                    backgroundColor: a
                }), l && {
                    boxShadow: "0px 0px 4px 0px ".concat(l)
                }), {}, (ir(l = {}, "&.".concat(u), {
                    left: "-10px"
                }),
                ir(l, "&.".concat(t), {
                    right: "-10px"
                }),
                ir(l, "opacity", .9),
                ir(l, "&:hover", {
                    opacity: 1
                }),
                ir(l, "@media (pointer: coarse) and (not (any-pointer: fine))", {
                    display: "none"
                }),
                l))),
                ir(o, "&:hover", ir({}, "& .".concat(s), {
                    display: "flex"
                })),
                o),
                carousel: {
                    display: "flex",
                    overflowX: "hidden",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    gap: "".concat(null != r ? r : 0, "px"),
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
                    width: n,
                    height: "auto",
                    flexShrink: 0
                }
            }
        })
          , Jr = (0,
        bn.makeStyles)({
            name: "Gradient"
        })(function(e, t) {
            var n = t.linearGradient
              , r = t.height
              , t = t.width;
            return {
                gradient: or({
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }, n && {
                    width: t,
                    height: r,
                    background: n
                })
            }
        })
          , $r = (0,
        bn.makeStyles)({
            name: "ImageWithGradient"
        })(function(e, t) {
            var n = t.imageWindowHeight
              , r = t.borderRadius
              , t = t.imageAspectRatio;
            return {
                imageWithGradientWindow: {
                    height: n,
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
                    aspectRatio: t,
                    minWidth: "100%",
                    flex: 1
                }
            }
        })
          , Kr = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.iconWidth
              , r = t.avatarContainerBackgroundColor
              , o = t.avatarImageBackgroundColor
              , i = t.avatarBorderColor
              , t = t.maxZIndex;
            return {
                facepileContainer: {
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center"
                },
                avatarContainer: or(or({
                    marginRight: "-".concat((n + 4) / 2, "px")
                }, function(e) {
                    for (var t = {}, n = 1; n <= e; n += 1)
                        t["&:nth-child(".concat(n, ")")] = {
                            zIndex: e - n + 1
                        };
                    return t
                }(t)), {}, {
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
        })
          , Xr = "2px 2px 4px rgba(0, 0, 0, 0.15)"
          , Yr = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.verticalGap;
            return {
                sectionHeader: or({
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
        })
          , Zr = {
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
          , Qr = Object.keys(Zr)
          , eo = {
            background: "transparent",
            width: "auto",
            height: "auto",
            zIndex: 10,
            pointerEvents: "none",
            position: "absolute"
        }
          , to = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.padding
              , r = t.containerOverrideStyles
              , t = Object.keys(Zr).reduce(function(e, t) {
                return e[t] = or(or(or({}, eo), {
                    left: "".concat(100 * (t = Zr[t]).position.xScale, "%"),
                    top: "".concat(100 * t.position.yScale, "%"),
                    transform: "translate(-".concat(100 * t.anchorPoint.x, "%, -").concat(100 * t.anchorPoint.y, "%)")
                }), {}, {
                    padding: "".concat(n, "px")
                }),
                e
            }, {});
            return or({
                overlayContainer: or({
                    position: "relative",
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    overflow: "hidden",
                    display: "block"
                }, r)
            }, t)
        })
          , no = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.titleHeight
              , r = t.titleLines
              , o = t.titleColor
              , i = t.titleFontStyles
              , a = t.isContained
              , t = t.containmentPadding;
            return {
                tileBottomContentContainer: or({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px"
                }, a && {
                    padding: "0px ".concat(t, "px ").concat(t, "px ").concat(t, "px")
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
                tileTitleText: or(or({
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }, 1 === r && or({}, hr)), Ir(Or, o, i))
            }
        });
        function ro(e) {
            var t, n, r = e.isFocused, o = e.imageComponent, i = e.imageAspectRatio, a = e.thumbnailOverlayComponent, l = e.onActivated, s = e.linkPath, u = e.isContained, c = e.containmentPadding, d = e.containmentBackgroundColor, f = e.cornerRadius, p = e.titleText, m = e.titleColor, v = e.titleFont, h = e.titleLines, g = e.titleComponent, y = e.footerComponent, b = e.ctaButtonComponent, I = e.isOnScreen, S = e.placeholderImageBackgroundColor, e = (w = tr((0,
            K.useState)(!1), 2),
            C = w[0],
            t = w[1],
            n = er(function() {
                t(!0)
            }, 100),
            [C, function() {
                n()
            }
            , function() {
                n.cancel(),
                t(!1)
            }
            ]), C = (w = tr(e, 3))[0], e = w[1], w = w[2], f = (r = ao({
                imageAspectRatio: i,
                isContained: u,
                containmentBackgroundColor: d,
                isFocused: C || r,
                cornerRadius: f,
                placeholderImageBackgroundColor: S
            }).classes).tileContainer, S = r.tileImageContainer, E = r.placeholderImage, r = (0,
            K.useMemo)(function() {
                return o || K.createElement("div", {
                    "data-testid": "placeholder-image",
                    className: E
                })
            }, [o, E]);
            return K.createElement(lr, {
                containerClassName: f,
                callback: l,
                linkPath: s,
                tabIndex: I ? 0 : -1,
                onFocus: e,
                onFocusLost: w,
                ariaLabel: p
            }, K.createElement("div", {
                className: S
            }, r, a), K.createElement(Wr, {
                titleText: p,
                titleLines: h,
                titleColor: m,
                titleFontStyles: v,
                titleComponent: g,
                footerComponent: y,
                ctaButtonComponent: b,
                isContained: u,
                containmentPadding: null != c ? c : 0
            }))
        }
        function oo(e) {
            var t = e.onActivated
              , n = e.linkPath
              , r = e.textColor
              , o = e.fontStyle
              , i = e.gap
              , a = e.iconWidth
              , l = e.iconColor
              , s = e.leftIcon
              , u = e.leftIconComponent
              , c = e.leftText
              , d = e.rightIcon
              , f = e.rightIconComponent
              , p = e.rightText
              , e = o.LineHeight * o.FontSize
              , m = null != l ? l : r
              , v = null != a ? a : e
              , o = (i = lo({
                textHeight: e,
                textColor: r,
                gap: null != i ? i : 0,
                fontStyle: o
            }).classes).tileFooterContainer
              , h = i.leftContainer
              , g = i.rightContainer
              , y = i.textClassName
              , b = i.iconContainer
              , I = (0,
            K.useMemo)(function() {
                return u || (s ? K.createElement(ar, {
                    iconClassName: s,
                    color: m,
                    width: v
                }) : null)
            }, [s, u, m, v])
              , S = (0,
            K.useMemo)(function() {
                return f || (d ? K.createElement(ar, {
                    iconClassName: d,
                    color: m,
                    width: v
                }) : null)
            }, [d, f, m, v])
              , i = (0,
            K.useMemo)(function() {
                return K.createElement(K.Fragment, null, K.createElement("div", {
                    className: h
                }, I && K.createElement("div", {
                    className: b,
                    "data-testid": "left-icon-container"
                }, I), K.createElement("div", or({
                    className: y
                }, br(Or)), c)), K.createElement("div", {
                    className: g
                }, S && K.createElement("div", {
                    className: b
                }, S), p && K.createElement("div", or({
                    className: y
                }, br(Or)), p)))
            }, [h, g, y, I, S, c, p, b]);
            return K.createElement(lr, {
                containerClassName: o,
                callback: t,
                linkPath: n,
                ariaLabel: c
            }, i)
        }
        function io(e) {
            var t = e.titleText
              , n = e.sendNavigateToSortLinkEvent
              , r = e.titleLink
              , o = e.isSortLinkOverrideEnabled
              , i = e.subtitleText
              , a = e.subtitleLink
              , l = e.shouldShowSeparateSubtitleLink
              , s = e.hasBackgroundMural
              , u = e.tooltipText
              , e = e.hideSeeAll
              , c = (0,
            p.useTokens)()
              , d = (o || l) && a && i
              , o = (0,
            K.useMemo)(function() {
                if (i)
                    return s ? c.Color.Extended.Gray.Gray_100 : c.Color.Content.Emphasis
            }, [i, s, c.Color.Extended.Gray.Gray_100, c.Color.Content.Emphasis])
              , l = (0,
            K.useMemo)(function() {
                if (d)
                    return s ? "icon-chevron-right-dark" : "icon-chevron-right"
            }, [d, s]);
            return X().createElement("div", {
                className: "home-sort-header-container",
                style: {
                    marginBottom: c.Gap.Large
                }
            }, X().createElement(Hr, {
                titleText: t,
                onTitleActivated: e ? void 0 : n,
                titleLinkPath: e ? void 0 : r,
                titleTextColor: s ? c.Color.Extended.Gray.Gray_100 : c.Color.Content.Emphasis,
                titleFontStyle: c.Typography.HeadingSmall,
                titleGap: e ? void 0 : c.Gap.XSmall,
                titleIconClassName: e ? void 0 : "sdui-icon icon-push-right-16x16",
                titleIconWidth: e ? void 0 : 16,
                titleIconFirst: !1,
                subtitleText: i || void 0,
                subtitleTextColor: o,
                subtitleFontStyle: i ? c.Typography.BodyMedium : void 0,
                subtitleGap: d ? c.Gap.XXSmall : void 0,
                onSubtitleActivated: d ? n : void 0,
                subtitleLinkPath: d ? a : void 0,
                subtitleIconClassName: d ? l : void 0,
                subtitleIconWidth: d ? 22 : void 0,
                subtitleIconFirst: !1,
                verticalGap: c.Gap.XXSmall,
                iconComponent: u ? X().createElement(Ct, {
                    tooltipText: u,
                    placement: "left",
                    centerIcon: !0
                }) : void 0,
                containerOverrides: s ? {
                    zIndex: 1
                } : void 0
            }))
        }
        var ao = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.imageAspectRatio
              , r = t.isContained
              , o = t.containmentBackgroundColor
              , i = t.isFocused
              , a = t.cornerRadius
              , t = t.placeholderImageBackgroundColor;
            return {
                tileContainer: or({
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }, r && or({
                    borderBottomLeftRadius: "".concat(a, "px"),
                    borderBottomRightRadius: "".concat(a, "px")
                }, o && {
                    backgroundColor: o
                })),
                tileImageContainer: {
                    width: "100%",
                    height: "auto",
                    position: "relative",
                    "&::before": or(or({
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
                        transition: "background-color ".concat(pr, " ").concat(mr)
                    }, i && {
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }),
                    "& img": or({
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
                placeholderImage: or({
                    width: "100%",
                    height: "100%",
                    aspectRatio: "".concat(n),
                    backgroundColor: t,
                    borderRadius: "".concat(a, "px")
                }, r && {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px"
                })
            }
        })
          , lo = (0,
        bn.makeStyles)()(function(e, t) {
            var n = t.textHeight
              , r = t.textColor
              , o = t.gap
              , t = t.fontStyle;
            return {
                tileFooterContainer: or({
                    display: "flex",
                    alignItems: "center",
                    gap: "".concat(o, "px"),
                    width: "100%",
                    height: n,
                    whiteSpace: "nowrap"
                }, vr),
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
                textClassName: or(or({
                    width: "100%",
                    height: "100%"
                }, hr), Ir(Or, r, t)),
                iconContainer: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center"
                }
            }
        });
        function so(e) {
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
            X().createElement("div", {
                className: ge()(["game-sort-carousel-wrapper", {
                    "game-sort-with-mural": !!n,
                    "game-sort-mural-loaded": !!e
                }])
            }, e && X().createElement("div", {
                className: "game-sort-mural-wrapper"
            }, X().createElement("img", {
                className: "game-sort-mural",
                alt: "",
                src: e
            }), X().createElement("div", {
                className: "game-sort-mural-gradient"
            })), t)
        }
        function uo(e) {
            var t = e.scrollClassNames
              , n = e.scrollIconClassName
              , r = e.scroll
              , o = e.isDisabled
              , e = e.isNewScrollArrowsEnabled;
            return X().createElement("div", {
                "data-testid": "game-carousel-scroll-bar",
                className: t,
                onClick: r,
                "aria-disabled": o,
                onKeyDown: function(e) {
                    e.code === fo.enter && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, e ? X().createElement("span", {
                className: n
            }) : X().createElement(X().Fragment, null, X().createElement("div", {
                className: "arrow"
            }, X().createElement("span", {
                className: n
            })), X().createElement("div", {
                className: "spacer"
            })))
        }
        (Sl = function(e) {
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
              , v = e.isNewSortHeaderEnabled
              , h = e.translate
              , g = (0,
            K.useMemo)(function() {
                return u || (s ? h(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, h])
              , y = (0,
            K.useMemo)(function() {
                return h(a ? at.LabelLearnMore : it.ActionSeeAll)
            }, [a, h])
              , e = (0,
            K.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = ee.navigateToSortLink(e),
                x.eventStreamService.sendEvent.apply(x.eventStreamService, e))
            }, [a, l]);
            return v ? X().createElement(io, {
                titleText: t,
                sendNavigateToSortLinkEvent: e,
                titleLink: r,
                isSortLinkOverrideEnabled: a,
                subtitleText: n,
                subtitleLink: o,
                shouldShowSeparateSubtitleLink: i,
                hasBackgroundMural: !!m,
                tooltipText: g,
                hideSeeAll: d
            }) : X().createElement("div", {
                className: "game-sort-header-container"
            }, X().createElement("div", {
                className: c
            }, X().createElement("h2", {
                className: "sort-header"
            }, d ? X().createElement("span", null, t) : X().createElement(ye.Link, {
                url: r
            }, t), g && X().createElement(Ct, {
                tooltipText: g,
                placement: "right"
            })), !d && X().createElement(ye.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, y)), X().createElement(pn, {
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
            backgroundImageAssetId: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var co = Sl
          , fo = Ke.keyBoardEventCode;
        function po(e) {
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
            T.EventStream.SendEventWithTarget(g.FeedScroll, i, e, T.EventStream.TargetTypes.WWW)
        }
        function mo(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            K.useRef)(t)
              , s = fn()
              , u = (0,
            K.useMemo)(function() {
                return Ie(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    po({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: S.Horizontal,
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
        function vo(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = Po({}, t),
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
        function ho(e) {
            return "recommendationList"in e
        }
        function go(e) {
            return "games"in e
        }
        function yo(e) {
            return "filters"in e
        }
        function bo(e, t) {
            return "recommendationList"in e ? vo(e.recommendationList, t) : go(e) ? e.games : []
        }
        function Io(e) {
            if (e && go(e))
                return e.gameSetTargetId
        }
        function So(e) {
            var t = Io(e);
            return void 0 !== t ? ((e = {})[R.GameSetTargetId] = t,
            e) : {}
        }
        function Co(e) {
            if (e = e.find(yo)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function wo(e) {
            var t;
            return e && go(e) && e.appliedFilters ? ((t = {})[R.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (Cl = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , t = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? X().createElement(X().Fragment, null, !r && X().createElement(uo, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && X().createElement(uo, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: t,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : X().createElement(X().Fragment, null, n && r ? null : X().createElement(uo, {
                scrollClassNames: ge()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), X().createElement(uo, {
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
        var Eo = Cl
          , Po = function() {
            return (Po = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , xo = null !== (dr = window.ResizeObserver) && void 0 !== dr ? dr : Yn
          , To = function() {
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
            K.useRef)(new xo(e))
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
          , _o = et.numGameCarouselLookAheadWindows
          , Oo = et.gameTileGutterWidth
          , ko = et.wideGameTileGutterWidth
          , No = et.scrollerWidth
          , Ao = tt.wideTileHoverGrowWidthPx;
        (fr = function(e) {
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
              , S = e.hideScrollBackWhenDisabled
              , C = e.sortId
              , w = e.translate
              , E = (0,
            K.useRef)(null)
              , P = (0,
            K.useState)(0)
              , x = P[0]
              , T = P[1]
              , _ = (0,
            K.useState)(!1)
              , O = _[0]
              , k = _[1]
              , e = (0,
            K.useState)(!0)
              , N = e[0]
              , A = e[1]
              , P = (0,
            K.useState)(!0)
              , R = P[0]
              , L = P[1]
              , _ = (0,
            K.useState)(0)
              , D = _[0]
              , M = _[1]
              , F = (0,
            K.useMemo)(function() {
                return u === $.GridTile || u === $.EventTile
            }, [u])
              , U = (0,
            K.useMemo)(function() {
                return F ? ko : Oo
            }, [F])
              , e = To()
              , P = e[0]
              , B = e[1]
              , _ = To()
              , e = _[0]
              , G = _[1]
              , j = (0,
            K.useMemo)(function() {
                if (F && f)
                    return f;
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== G && void 0 !== e ? Math.max(1, Math.floor((G + U) / (e + U))) : 0
            }, [G, U, f, F]);
            (0,
            K.useEffect)(function() {
                A(0 <= D),
                s || void 0 !== G && void 0 !== B && Math.abs(D) + G + Ao >= B ? L(!0) : L(!1)
            }, [D, G, B, null == t ? void 0 : t.length, s]);
            var H = (0,
            K.useCallback)(function() {
                x + _o * j >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [x, j, l, s, null == t ? void 0 : t.length])
              , z = (0,
            K.useCallback)(function() {
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(j) * (e + U)
            }, [j, U])
              , W = (0,
            K.useCallback)(function() {
                var t;
                N || (t = z(),
                M(function(e) {
                    return Math.min(e + t, 0)
                }),
                T(function(e) {
                    return e - j
                }))
            }, [z, N, j])
              , V = (0,
            K.useCallback)(function() {
                var n;
                R || (n = z(),
                M(function(e) {
                    if (b && o === Y.HomePage)
                        return void 0 !== B && void 0 !== G ? Math.max(e - n, -1 * (B - G)) : e - n;
                    if (void 0 === B)
                        return e - n;
                    var t = S && N ? No : 0;
                    return Math.max(e - n, -1 * B) + t
                }),
                T(function(e) {
                    return e + j
                }),
                H())
            }, [R, z, H, b, o, B, G, S, N, j])
              , q = (0,
            K.useCallback)(function(e) {
                return x <= e && e < x + j
            }, [x, j])
              , J = (0,
            K.useCallback)(function(e) {
                O || (k(!0),
                e(),
                setTimeout(function() {
                    k(!1)
                }, 200))
            }, [O])
              , _ = (0,
            K.useRef)(null);
            mo({
                scrollPosition: -D,
                page: o,
                gameSetTypeId: C,
                gameSetTargetId: Io(n),
                wrapperRef: _,
                sortPosition: r
            });
            r = (0,
            K.useMemo)(function() {
                return ge()({
                    "hlist games game-cards game-tile-list": !F,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": F,
                    "games-page-carousel": o === Y.GamesPage,
                    "home-page-carousel": o === Y.HomePage
                })
            }, [F, o]);
            return X().createElement("div", {
                "data-testid": "game-carousel",
                ref: _,
                className: ge()("horizontal-scroller games-list", {
                    "home-page-games-list": o === Y.HomePage,
                    "wide-game-tile-list": F,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, X().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, X().createElement("div", {
                ref: P,
                className: "horizontally-scrollable",
                style: {
                    left: D + "px"
                }
            }, X().createElement("ul", {
                ref: i,
                className: r
            }, t.map(function(e, t) {
                return F ? X().createElement(un, {
                    key: e.universeId,
                    ref: E,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    translate: w,
                    buildEventProperties: a,
                    componentType: u,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: h,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: v,
                    navigationRootPlaceId: m
                }) : X().createElement("li", {
                    key: e.universeId,
                    className: "list-item game-card game-tile"
                }, X().createElement(un, {
                    ref: E,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    className: "game-card-container",
                    translate: w,
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
            }))), X().createElement(Eo, {
                hideScrollBackWhenDisabled: S,
                isScrollBackDisabled: N,
                isScrollForwardDisabled: R,
                onScrollBack: function() {
                    return J(W)
                },
                onScrollForward: function() {
                    return J(V)
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
        var Ro = fr
          , Lo = function() {
            return (Lo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ui = function(e) {
            function t(e, t) {
                var n = {};
                return n[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = a,
                n[R.NumberOfLoadedTiles] = (o || []).length,
                n[R.GameSetTypeId] = i.topicId,
                n[R.Page] = Y.HomePage,
                n[F.HomePageSessionInfo] = T,
                n[R.PlayContext] = Y.HomePage,
                n
            }
            var n = e.translate
              , r = e.friendsPresence
              , o = e.gameData
              , i = e.sort
              , a = e.positionId
              , l = e.componentType
              , s = e.playerCountStyle
              , u = e.playButtonStyle
              , c = e.hoverStyle
              , d = e.tooltipInfoText
              , f = e.hideSeeAll
              , p = e.navigationRootPlaceId
              , m = e.isSponsoredFooterAllowed
              , v = e.seeAllLinkPath
              , h = e.subtitleLinkPath
              , g = e.itemsPerRow
              , y = e.startingRow
              , b = e.endTimestamp
              , I = e.countdownString
              , S = e.isExpandHomeContentEnabled
              , C = e.isCarouselHorizontalScrollEnabled
              , w = e.isNewScrollArrowsEnabled
              , E = e.isNewSortHeaderEnabled
              , P = (0,
            K.useRef)(null)
              , x = (0,
            K.useRef)(null)
              , T = fn()
              , _ = (0,
            K.useCallback)(function(e) {
                if (void 0 !== o && void 0 !== y) {
                    var t = e.filter(function(e) {
                        return e < (null == o ? void 0 : o.length)
                    });
                    return Lo(Lo(Lo(Lo(Lo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return o[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return o[e].universeId
                    }),
                    e), W(o, i.topicId, t, l)), q(o, i.topicId, t, l)), H(o, t)), J(y, null == o ? void 0 : o.length, null == o ? void 0 : o.length, t)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = o[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = i.topicId,
                    e[R.Page] = Y.HomePage,
                    e[F.HomePageSessionInfo] = T,
                    e))
                }
            }, [o, T, a, i.topicId, l, y]);
            mn(P, o.length, _),
            (0,
            K.useEffect)(function() {
                S && g && null != P && P.current && P.current.style.setProperty("--items-per-row", g.toString())
            }, [S, g]);
            var O = (0,
            K.useMemo)(function() {
                return v ? N.urlService.getAbsoluteUrl(v) : A(i.topic, Y.HomePage, {
                    position: a,
                    sortId: i.topicId,
                    page: Y.HomePage,
                    treatmentType: i.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, a, i.topic, i.topicId, i.treatmentType, v])
              , k = (0,
            K.useMemo)(function() {
                return h || O
            }, [h, O])
              , e = (0,
            K.useCallback)(function() {
                var e;
                if (v)
                    return (e = {})[R.LinkPath] = v,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = i.topicId,
                    e[R.Page] = Y.HomePage,
                    e[F.HomePageSessionInfo] = T,
                    e
            }, [T, a, v, i.topicId]);
            return X().createElement(so, {
                backgroundImageAssetId: null !== (_ = i.topicLayoutData) && void 0 !== _ && _.backgroundImageAssetId ? parseInt(null === (_ = i.topicLayoutData) || void 0 === _ ? void 0 : _.backgroundImageAssetId, 10) : void 0
            }, X().createElement(co, {
                sortTitle: i.topic,
                sortSubtitle: i.subtitle,
                seeAllLink: O,
                subtitleLink: k,
                shouldShowSeparateSubtitleLink: !!h,
                isSortLinkOverrideEnabled: !!v,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: i.topicId === Je.adSortHomePageId,
                tooltipInfoText: d,
                titleContainerClassName: "container-header",
                hideSeeAll: f,
                endTimestamp: b,
                countdownString: I,
                backgroundImageAssetId: null !== (I = i.topicLayoutData) && void 0 !== I && I.backgroundImageAssetId ? parseInt(null === (I = i.topicLayoutData) || void 0 === I ? void 0 : I.backgroundImageAssetId, 10) : void 0,
                isNewSortHeaderEnabled: E,
                translate: n
            }), C ? X().createElement(Ro, {
                gameData: o,
                sort: i,
                positionId: a,
                page: Y.HomePage,
                gamesContainerRef: P,
                buildEventProperties: t,
                loadMoreGames: void 0,
                isLoadingMoreGames: !1,
                componentType: l,
                sortId: i.topicId,
                playerCountStyle: s,
                playButtonStyle: u,
                itemsPerRow: g,
                friendData: r,
                navigationRootPlaceId: p,
                isSponsoredFooterAllowed: m,
                hoverStyle: c,
                topicId: null === (E = i.topicId) || void 0 === E ? void 0 : E.toString(),
                isExpandHomeContentEnabled: S,
                isCarouselHorizontalScrollEnabled: C,
                isNewScrollArrowsEnabled: w,
                translate: n
            }) : X().createElement(cn, {
                ref: P,
                tileRef: x,
                gameData: o,
                friendData: r,
                buildEventProperties: t,
                translate: n,
                componentType: l,
                playerCountStyle: s,
                playButtonStyle: u,
                navigationRootPlaceId: p,
                isSponsoredFooterAllowed: m,
                hoverStyle: c,
                topicId: null === (c = i.topicId) || void 0 === c ? void 0 : c.toString(),
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
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var Do = Ui
          , Mo = function() {
            return (Mo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Fo = function(e, a, l, s) {
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
          , Uo = function(n, r) {
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
        function Bo() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = Mo(Mo({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(Mo({}, l.current))
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
                return Fo(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return Uo(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (n = _e.deviceMeta.getDeviceMeta()) ? void 0 : n.deviceType) !== _e.deviceMeta.DeviceTypes.computer || null === T.CurrentUser || void 0 === T.CurrentUser || !T.CurrentUser.isAuthenticated)
                                return [3, 5];
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 4, , 5]),
                            [4, Fe()];
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
                                return n && (e[t.id] = Mo(Mo({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(Mo({}, l.current)),
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
        function Go() {
            var e = (0,
            K.useContext)(jo);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var jo = (0,
        K.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Ho = function() {
            return (Ho = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (lt = function(e) {
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
              , g = fn()
              , e = (0,
            K.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Ho(Ho(Ho(Ho(Ho(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), H(r, t)), ((e = {})[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = o.topicId,
                    e)), So(o)), wo(o)), ((e = {})[R.Page] = i,
                    e[R.NumberOfLoadedTiles] = (r || []).length,
                    e[F.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            mn(h, r.length, e),
            (0,
            K.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            K.useMemo)(function() {
                var e = Ho(Ho(((e = {})[R.Position] = a,
                e[R.GameSetTypeId] = o.topicId,
                e), So(o)), ((t = {})[R.Page] = i,
                t[R.TreatmentType] = w.Carousel,
                t[F.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (go(e) && e.appliedFilters) {
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
                return A(o.sortId, i, e, m, t)
            }, [g, i, a, o, m]);
            return X().createElement("div", {
                className: ge()("games-list-container", {
                    "wide-game-tile-container": c === $.GridTile || c === $.EventTile
                })
            }, X().createElement(co, {
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
            }), X().createElement(Ro, {
                gamesContainerRef: h,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                sortId: o.topicId,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Ho(Ho(Ho(Ho(((n = {})[R.PlaceId] = e.placeId,
                    n[R.UniverseId] = e.universeId,
                    n[R.IsAd] = e.isSponsored,
                    n[R.NativeAdData] = e.nativeAdData,
                    n[R.Position] = t,
                    n[R.SortPos] = a,
                    n[R.GameSetTypeId] = o.topicId,
                    n), So(o)), ((n = {})[R.NumberOfLoadedTiles] = (r || []).length,
                    n[R.Page] = i,
                    n)), wo(o)), ((n = {})[F.DiscoverPageSessionInfo] = g,
                    n[R.PlayContext] = Y.GamesPage,
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
        var zo = lt
          , Wo = (0,
        K.createContext)(void 0)
          , Vo = function() {
            return (Vo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (bl = function(e) {
            var t = e.translate
              , r = e.sort
              , o = e.positionId
              , n = e.itemsPerRow
              , i = e.gameData
              , a = (0,
            K.useContext)(Wo)
              , l = (0,
            K.useRef)(null)
              , s = Bo()
              , u = (0,
            K.useMemo)(function() {
                return Ye
            }, [])
              , c = (0,
            K.useCallback)(function(e, t) {
                var n;
                return Vo(Vo(((n = {})[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = o,
                n[R.NumberOfLoadedTiles] = i.length,
                n[R.GameSetTypeId] = u,
                n), So(r)), ((n = {})[R.Page] = Y.SearchLandingPage,
                n[F.SearchLandingPageSessionInfo] = a,
                n[R.PlayContext] = Y.SearchLandingPage,
                n))
            }, [o, i.length, u, r, a])
              , e = (0,
            K.useCallback)(function(e) {
                var t = e.filter(function(e) {
                    return e < i.length
                });
                return Vo(Vo(Vo(Vo(Vo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.placeId
                }),
                e[R.UniverseIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.universeId
                }),
                e), W(i, u, t)), q(i, u, t)), H(i, t)), So(r)), ((e = {})[R.AbsPositions] = t,
                e[R.SortPos] = o,
                e[R.NumberOfLoadedTiles] = i.length,
                e[R.GameSetTypeId] = u,
                e[R.Page] = Y.SearchLandingPage,
                e[F.SearchLandingPageSessionInfo] = a,
                e))
            }, [i, r, o, a, u]);
            return mn(l, i.length, e),
            X().createElement(X().Fragment, null, X().createElement(co, {
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
            }), X().createElement(Ro, {
                gameData: i,
                sort: r,
                positionId: o,
                hideScrollBackWhenDisabled: !0,
                sortId: u,
                page: Y.SearchLandingPage,
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
        var qo = bl;
        function Jo(e) {
            var t = e.sort
              , o = Go().contentMetadata;
            return 0 === (null == (e = (0,
            K.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, Xo)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : X().createElement(T.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function $o(e) {
            var t = e.loadData
              , n = (0,
            K.useRef)(null)
              , r = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                var e = n.current;
                return e && (r.current = x.elementVisibilityService.observeVisibility({
                    element: e,
                    threshold: Xe
                }, function(e) {
                    e && t && t()
                })),
                function() {
                    null != r && r.current && r.current()
                }
            }, [t]),
            t ? X().createElement("div", {
                ref: n,
                "data-testid": "sentinel-tile",
                className: "grid-item-container game-card-container invisible"
            }) : null
        }
        (Sl = function(e) {
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
              , p = e.isNewSortHeaderEnabled
              , e = Bo()
              , m = Go().contentMetadata
              , v = d || o === Y.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === $.EventTile
              , f = f || o === Y.HomePage && (null === (h = null == n ? void 0 : n.topicLayoutData) || void 0 === h ? void 0 : h.componentType) === $.EventTile
              , h = (0,
            K.useMemo)(function() {
                var e;
                return v ? bo(n, m) : u ? bo(n, m).slice(0, i) : bo(n, m).slice(0, function(e, t) {
                    var n = Je.maxWideGameTilesPerCarouselPage
                      , r = Je.maxTilesPerCarouselPage;
                    if (e !== Y.GamesPage && e !== Y.SearchLandingPage)
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
            }, [n, m, o, i, u, v]);
            return 0 === (null == h ? void 0 : h.length) ? null : o === Y.GamesPage ? X().createElement(zo, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                page: o,
                gameData: h,
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
            }) : o === Y.SearchLandingPage ? X().createElement(qo, {
                key: n.topic,
                sort: n,
                gameData: h,
                translate: t,
                positionId: r,
                itemsPerRow: Ze
            }) : X().createElement(Do, {
                key: n.topic,
                sort: n,
                translate: t,
                positionId: r,
                gameData: h,
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
                isCarouselHorizontalScrollEnabled: v,
                isNewScrollArrowsEnabled: f,
                isNewSortHeaderEnabled: p
            })
        }
        ).defaultProps = {
            loadMoreGames: void 0,
            isLoadingMoreGames: void 0,
            isExpandHomeContentEnabled: void 0,
            isChartsPageRenameEnabled: void 0,
            isCarouselHorizontalScrollEnabled: void 0,
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var Ko = Sl
          , Xo = Je.maxTilesPerCarouselPage;
        function Yo(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            K.useRef)(null);
            return X().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, X().createElement("span", {
                className: "text-label creator-name-label"
            }, l(nt.LabelByPrefix), " "), X().createElement("a", {
                href: i,
                onClick: function() {
                    T.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, T.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && X().createElement(Zo.VerifiedBadgeIconContainer, {
                size: Zo.BadgeSizes.CAPTIONHEADER
            }))
        }
        $o.displayName = "SentinelTile",
        $o.defaultProps = {
            loadData: null
        };
        var Zo = RobloxBadges;
        (Cl = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.disableLoadingState
              , i = e.redirectPurchaseUrl
              , a = T.PlayButton.usePlayabilityStatus
              , l = T.PlayButton.PlayabilityStatuses
              , s = T.PlayButton.DefaultPlayButton
              , e = a(t)
              , u = e[0]
              , a = e[1]
              , e = (0,
            K.useMemo)(function() {
                return !!u && [l.PurchaseRequired, l.FiatPurchaseRequired].includes(u)
            }, [u, l]);
            return X().createElement(s, {
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
        var Qo = Cl
          , ei = function(e, a, l, s) {
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
          , ti = function(n, r) {
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
          , ni = (0,
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
              , c = xe()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Bo()
              , l = Te(o, a)
              , m = (0,
            K.useMemo)(function() {
                return G(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            K.useMemo)(function() {
                return 0 < m.length && s ? X().createElement(Kt, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : X().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            K.useEffect)(function() {
                ei(void 0, void 0, void 0, function() {
                    var t;
                    return ti(this, function(e) {
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
              , n = Ve(l);
            return X().createElement("div", {
                ref: t,
                className: "featured-grid-item-container game-card-container",
                "data-testid": "game-tile-featured",
                onMouseOver: f,
                onMouseLeave: e,
                onFocus: f,
                onBlur: e
            }, X().createElement(ye.Link, {
                url: a,
                className: "game-card-link",
                id: o.universeId.toString()
            }, X().createElement(Lt, {
                gameLayoutData: l,
                isFocused: d
            }), X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.ThumbnailGameIconSize.size512,
                targetId: o.universeId,
                containerClass: "game-card-thumb-container",
                format: qe.ThumbnailFormat.jpeg,
                altName: o.name
            }), X().createElement("div", {
                className: "game-card-name-info"
            }, X().createElement("div", null, X().createElement("div", {
                className: "game-card-name game-name-title",
                title: o.name
            }, o.name), n ? X().createElement(jt, {
                footerData: n
            }) : X().createElement(Bt, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), X().createElement(Qo, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: N.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && X().createElement(Yo, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        ni.displayName = "FeaturedGridTile";
        var ri = function() {
            return (ri = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , oi = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (dr = (0,
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
              , e = oi(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? X().createElement(ni, ri({
                ref: t
            }, e)) : X().createElement(un, ri({
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
        dr.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var ii = dr
          , ai = (0,
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
            return X().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: g
            }, n.map(function(e, t) {
                return X().createElement(ii, {
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
            }), s && X().createElement($o, {
                loadData: l
            }))
        });
        ai.displayName = "GameGrid",
        ai.defaultProps = {
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
        var li = ai
          , si = function() {
            return (si = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Yn = function(e) {
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
              , p = e.isNewSortHeaderEnabled
              , m = e.translate
              , v = (0,
            K.useRef)(null)
              , h = (0,
            K.useRef)(null)
              , g = fn()
              , e = (0,
            K.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return si(si(si(si(si(si(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), W(r, o.topicId, t, n)), q(r, o.topicId, t, n)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e)), H(r, t)), J(c, u, null == r ? void 0 : r.length, t)), ((t = {})[R.SortPos] = i,
                    t[R.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[R.GameSetTypeId] = o.topicId,
                    t[R.Page] = Y.HomePage,
                    t[F.HomePageSessionInfo] = g,
                    t))
                }
            }, [r, g, i, o.topicId, n, u, c]);
            return mn(v, r.length, e),
            (0,
            K.useEffect)(function() {
                u && null != v && v.current && v.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            X().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, p ? X().createElement(io, {
                titleText: o.topic,
                sendNavigateToSortLinkEvent: void 0,
                titleLink: void 0,
                isSortLinkOverrideEnabled: !1,
                subtitleText: void 0,
                subtitleLink: void 0,
                shouldShowSeparateSubtitleLink: !1,
                hasBackgroundMural: !1,
                tooltipText: o.topicId === Je.adSortHomePageId ? m(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0,
                hideSeeAll: !0
            }) : X().createElement("div", {
                className: "container-header"
            }, X().createElement("h2", null, o.topic, o.topicId === Je.adSortHomePageId && X().createElement(Ct, {
                tooltipText: m(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right"
            }))), X().createElement(ai, {
                ref: v,
                tileRef: h,
                gameData: r,
                emphasis: !1,
                translate: m,
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
                    n[R.Page] = Y.HomePage,
                    n[F.HomePageSessionInfo] = g,
                    n[R.PlayContext] = Y.HomePage,
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
            isExpandHomeContentEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var ui = Yn
          , ci = Je.sortlessGridMaxTilesMetadataToFetch;
        (et = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = e.isNewSortHeaderEnabled
              , u = Bo()
              , c = fn()
              , e = Go()
              , d = e.contentMetadata
              , f = e.appendContentMetadata
              , p = (0,
            K.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == d ? void 0 : d[t]) && void 0 !== t && t[e])
                });
                0 < e.length && me(e.slice(0, ci), c).then(function(e) {
                    return f(e.contentMetadata)
                }).catch(function() {})
            }, [a, c, d, f]);
            (0,
            K.useEffect)(function() {
                p()
            }, [p]);
            e = (0,
            K.useMemo)(function() {
                return vo(a, d)
            }, [a, d]);
            return 0 === (null == e ? void 0 : e.length) ? null : X().createElement(ui, {
                key: n.topic,
                sort: n,
                gameData: e,
                translate: t,
                positionId: r,
                itemsPerRow: o,
                startingRow: i,
                friendsPresence: u,
                componentType: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.componentType,
                playerCountStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playerCountStyle,
                playButtonStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.playButtonStyle,
                hoverStyle: null === (u = n.topicLayoutData) || void 0 === u ? void 0 : u.hoverStyle,
                isSponsoredFooterAllowed: "true" === (null === (n = n.topicLayoutData) || void 0 === n ? void 0 : n.isSponsoredFooterAllowed),
                isExpandHomeContentEnabled: l,
                isNewSortHeaderEnabled: s
            })
        }
        ).defaultProps = {
            isExpandHomeContentEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var di = et
          , fi = Xu(5250);
        function pi(e) {
            return (pi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function mi(e, t) {
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
        function vi(t, e, n) {
            var r = (0,
            K.useRef)(new Set)
              , a = (0,
            K.useRef)(new Set)
              , o = (0,
            K.useRef)(null)
              , i = (0,
            K.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a.current).filter(function(e) {
                    return !r.current.has(e)
                }), Ci).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(e) {
                    n(e),
                    e.forEach(function(e) {
                        return r.current.add(e)
                    })
                }),
                a.current.clear()
            }, [n])
              , l = (0,
            K.useMemo)(function() {
                return (0,
                fi.debounce)(function() {
                    return i()
                }, 200)
            }, [i]);
            (0,
            K.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return o.current && (o.current(),
                o.current = null),
                o.current = mi({
                    elements: i,
                    threshold: wi
                }, function(e, t) {
                    var n, r, o;
                    l.cancel(),
                    (n = i,
                    r = t,
                    o = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = n.findIndex(function(e) {
                            return e === t.target
                        })) && (o.push(e),
                        r.unobserve(t.target))
                    }),
                    o.sort(function(e, t) {
                        return e - t
                    })).forEach(function(e) {
                        return a.current.add(e)
                    }),
                    l()
                }),
                function() {
                    l.cancel(),
                    o.current && (o.current(),
                    o.current = null)
                }
            }, [t, e, l, a])
        }
        Xu(1315);
        var hi, gi, yi, bi, Ii, Si, Ci = 25, wi = .5;
        function Ei(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === pi(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function Pi(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , i = "(" + (null != t ? t : 0) + ")"
              , e = r ? T.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : T.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends"
              , n = (r = (0,
            K.useState)(!1))[0]
              , a = r[1];
            return (0,
            K.useEffect)(function() {
                Ri().then(function(e) {
                    a(e)
                }).catch(function(e) {
                    console.error("Error fetching friends rename status:", e)
                })
            }, []),
            n = n ? "Label.Connections" : "Heading.Friends",
            X().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? X().createElement("h2", null, o(n)) : X().createElement("h2", null, o(n), X().createElement("span", {
                className: "friends-count"
            }, i)), X().createElement("a", {
                href: e,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        (fr = hi = hi || {}).ItemImpressions = "itemImpressions",
        fr.ItemAction = "itemAction",
        (Ui = gi = gi || {}).Home = "home",
        Ui.UserProfile = "userProfile",
        (lt = yi = yi || {}).HomePageSessionInfo = "homePageSessionInfo",
        lt.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        lt.GameSearchSessionInfo = "gameSearchSessionInfo",
        (bl = bi = bi || {}).ContentType = "contentType",
        bl.Context = "context",
        bl.CollectionId = "collectionId",
        bl.CollectionPosition = "collectionPosition",
        (Sl = {}).Online = "online",
        Sl.InGame = "inGame",
        Sl.InStudio = "inStudio",
        Sl.Offline = "offline",
        (Cl = {}).Friend = "friend",
        Cl.NotFriend = "notFriend",
        (dr = Ii = Ii || {}).ItemIds = "itemIds",
        dr.ItemPositions = "itemPositions",
        dr.RowNumbers = "rowNumbers",
        dr.FeedRowNumbers = "feedRowNumbers",
        dr.PositionsInRow = "positionsInRow",
        dr.PositionsInTopic = "positionsInTopic",
        dr.TotalNumberOfItems = "totalNumberOfItems",
        (Yn = {}).Presences = "presences",
        Yn.PresenceUniverseIds = "presenceUniverseIds",
        Yn.FriendStatuses = "friendStatuses",
        Yn.SourceCarousel = "sourceCarousel",
        (et = Si = Si || {}).ItemId = "itemId",
        et.ItemPosition = "itemPosition",
        et.RowNumber = "rowNumber",
        et.FeedRowNumber = "feedRowNumber",
        et.PositionInRow = "positionInRow",
        et.PositionInTopic = "positionInTopic",
        et.TotalNumberOfItems = "totalNumberOfItems",
        et.ActionType = "actionType",
        (fr = {}).Presence = "presence",
        fr.PresenceUniverseId = "presenceUniverseId",
        fr.FriendStatus = "friendStatus",
        fr.SourceCarousel = "sourceCarousel";
        var xi = function() {
            return T.RealTime.Factory.GetClient()
        }
          , Ti = function(e, a, l, s) {
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
          , _i = function(n, r) {
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
          , Oi = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , ki = function(n) {
            return Ti(void 0, void 0, Promise, function() {
                var t;
                return _i(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: T.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
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
          , Ni = function(m, v) {
            return Ti(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return _i(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (i = m,
                        Ti(void 0, void 0, Promise, function() {
                            var t;
                            return _i(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: T.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
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
                        Ti(void 0, void 0, Promise, function() {
                            var t;
                            return _i(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = T.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
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
                        f = Oi(Oi([], d), f),
                        [4, (r = f,
                        Ti(void 0, void 0, Promise, function() {
                            var t, n;
                            return _i(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: T.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
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
          , Ai = function() {
            return Ti(void 0, void 0, Promise, function() {
                var t;
                return _i(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: T.EnvironmentUrls.friendsApi + "/v1/my/new-friend-requests/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, N.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data.count]
                    }
                })
            })
        }
          , Ri = function() {
            return Ti(void 0, void 0, Promise, function() {
                var t;
                return _i(this, function(e) {
                    switch (e.label) {
                    case 0:
                        t = {
                            url: T.EnvironmentUrls.apiGatewayUrl + "/universal-app-configuration/v1/behaviors/web-rename-friends/content",
                            retryable: !0,
                            withCredentials: !0
                        },
                        e.label = 1;
                    case 1:
                        return e.trys.push([1, 3, , 4]),
                        [4, N.httpService.get(t)];
                    case 2:
                        return [2, e.sent().data.renameFriendsToConnections];
                    case 3:
                        return t = e.sent(),
                        console.error("Error fetching renameFriendsToConnections:", t),
                        [2, !1];
                    case 4:
                        return [2]
                    }
                })
            })
        }
          , Li = function(e, a, l, s) {
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
          , Di = function(n, r) {
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
          , Mi = T.EnvironmentUrls.chatApi
          , Fi = function() {
            return Li(void 0, void 0, Promise, function() {
                var t;
                return Di(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, N.httpService.get({
                            url: Mi + "/v1/metadata",
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
          , Ui = {
            common: ["CommonUI.Features"],
            feature: "Feature.PeopleList"
        }
          , lt = RobloxPresence
          , Bi = Xu.n(lt);
        function Gi(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return X().createElement("div", {
                className: "friend-tile-content"
            }, X().createElement(zi, {
                id: t,
                translate: e,
                userProfileUrl: r,
                handleImageClick: a
            }), X().createElement("a", {
                href: r,
                onClick: a,
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, X().createElement("div", {
                className: "friends-carousel-tile-label"
            }, X().createElement("div", {
                className: "friends-carousel-tile-name"
            }, X().createElement("span", {
                className: "friends-carousel-display-name"
            }, n), i && X().createElement("div", {
                className: "friend-tile-verified-badge"
            }, X().createElement("div", {
                className: "friend-tile-spacer"
            }), X().createElement(Zo.VerifiedBadgeIconContainer, {
                size: Zo.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), X().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && X().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function ji(e) {
            var n = e.friend
              , t = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.isInGame
              , a = e.gameUrl
              , l = e.universeId
              , s = e.canChat
              , e = e.translate;
            return X().createElement("div", {
                className: "friend-tile-dropdown"
            }, i && null != o && X().createElement("div", {
                className: "in-game-friend-card"
            }, X().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.gameIcon,
                size: qe.ThumbnailGameIconSize.size150,
                targetId: l,
                imgClassName: "game-card-thumb",
                containerClass: "friend-tile-game-card"
            })), X().createElement("div", {
                className: "friend-presence-info"
            }, X().createElement("button", {
                type: "button",
                className: "friend-tile-non-styled-button",
                onClick: function() {
                    window.open(a)
                }
            }, o), X().createElement(ye.Button, {
                variant: ye.Button.variants.growth,
                size: ye.Button.sizes.small,
                width: ye.Button.widths.full,
                onClick: function() {
                    return Wi(void 0, void 0, void 0, function() {
                        var t;
                        return Vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return (t = n.presence.gameId || "",
                                (0,
                                T.DeviceMeta)().isInApp) ? ((0,
                                T.DeviceMeta)().isDesktop ? T.GameLauncher.followPlayerIntoGame(n.id, t, "JoinUser") : window.location.href = "/games/start?userID=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 1];
                            case 1:
                                return (0,
                                T.DeviceMeta)().isAndroidDevice || (0,
                                T.DeviceMeta)().isChromeOs ? (window.location.href = "intent://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser#Intent;scheme=robloxmobile;package=com.roblox.client;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.roblox.client;end",
                                [3, 5]) : [3, 2];
                            case 2:
                                return (0,
                                T.DeviceMeta)().isIosDevice ? (window.location.href = "robloxmobile://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 3];
                            case 3:
                                return [4, T.ProtocolHandlerClientInterface.followPlayerIntoGame({
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
            }, e("Action.Join")))), X().createElement("ul", null, s && X().createElement("li", null, X().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    x.chatService.startDesktopAndMobileWebChat({
                        userId: n.id
                    })
                }
            }, X().createElement("span", {
                className: "icon icon-chat-gray"
            }), " ", e("Label.Chat", {
                username: t
            }))), X().createElement("li", null, X().createElement("button", {
                type: "button",
                className: "friend-tile-dropdown-button",
                onClick: function() {
                    window.open(r)
                }
            }, X().createElement("span", {
                className: "icon icon-viewdetails"
            }), " ", e("Label.ViewProfile")))))
        }
        function Hi(e) {
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
            X().createElement("div", null, X().createElement("div", {
                ref: s
            }, r), e && X().createElement("div", {
                ref: u,
                style: {
                    position: "absolute",
                    top: ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetHeight) || 0) + ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetTop) || 0),
                    left: (e = ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetLeft) || 0) + ((null === (e = s.current) || void 0 === e ? void 0 : e.offsetWidth) || 0) / 2 - i / 2) < 0 ? 0 : e + i > document.getElementsByClassName("friends-carousel-container")[0].scrollWidth ? document.getElementsByClassName("friends-carousel-container")[0].scrollWidth - (i + 24) : e,
                    zIndex: 1002,
                    width: i
                },
                onMouseOver: t,
                onMouseOut: n,
                onFocus: t,
                onBlur: n
            }, o))
        }
        (bl = function(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.handleImageClick
              , o = e.translate
              , e = X().createElement(qe.Thumbnail2d, {
                type: qe.ThumbnailTypes.avatarHeadshot,
                size: qe.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            });
            return X().createElement(ye.AvatarCardItem.Headshot, {
                statusIcon: X().createElement(Bi().PresenceStatusIcon, {
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
        var zi = bl
          , Wi = function(e, a, l, s) {
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
          , Vi = function(n, r) {
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
        function qi(e) {
            return (qi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Ji(e, t) {
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
        function $i(t, e, n) {
            var r = (0,
            K.useRef)(new Set)
              , a = (0,
            K.useRef)(new Set)
              , o = (0,
            K.useRef)(null)
              , i = (0,
            K.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a.current).filter(function(e) {
                    return !r.current.has(e)
                }), ia).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(e) {
                    n(e),
                    e.forEach(function(e) {
                        return r.current.add(e)
                    })
                }),
                a.current.clear()
            }, [n])
              , l = (0,
            K.useMemo)(function() {
                return (0,
                fi.debounce)(function() {
                    return i()
                }, 200)
            }, [i]);
            (0,
            K.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return o.current && (o.current(),
                o.current = null),
                o.current = Ji({
                    elements: i,
                    threshold: aa
                }, function(e, t) {
                    var n, r, o;
                    l.cancel(),
                    (n = i,
                    r = t,
                    o = [],
                    e.forEach(function(t) {
                        var e;
                        null == t || !t.isIntersecting || 0 <= (e = n.findIndex(function(e) {
                            return e === t.target
                        })) && (o.push(e),
                        r.unobserve(t.target))
                    }),
                    o.sort(function(e, t) {
                        return e - t
                    })).forEach(function(e) {
                        return a.current.add(e)
                    }),
                    l()
                }),
                function() {
                    l.cancel(),
                    o.current && (o.current(),
                    o.current = null)
                }
            }, [t, e, l, a])
        }
        Xu(6870);
        var Ki, Xi, Yi, Zi, Qi, ea, ta, na, ra, oa, ia = 25, aa = .5;
        function la(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === qi(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function sa(e, t, n) {
            return t ? Qi.InGame : e && "Studio" === n ? Qi.InStudio : e ? Qi.Online : Qi.Offline
        }
        function ua(e) {
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
              , f = T.EnvironmentUrls.websiteUrl + "/users/" + t.id + "/profile"
              , p = t.combinedName
              , m = Bi().usePresence(t.id, void 0)
              , v = null != m && null != m.gameId
              , h = v ? m.lastLocation : null
              , e = null != h && 15 < h.length ? h.slice(0, 15) + "..." : h
              , g = v ? T.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = da(t, n, a, l, s, u, c, d);
            return X().createElement("div", {
                className: "friends-carousel-tile"
            }, X().createElement(Hi, {
                trigger: X().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, X().createElement(Gi, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? X().createElement(ji, {
                    friend: t,
                    isInGame: v,
                    universeId: null !== (m = m.universeId) && void 0 !== m ? m : 0,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: h,
                    translate: o,
                    gameUrl: g,
                    canChat: i
                }) : X().createElement("div", null),
                dropdownWidth: null == e ? 240 : 315
            }))
        }
        (Sl = Ki = Ki || {}).ItemImpressions = "itemImpressions",
        Sl.ItemAction = "itemAction",
        (Cl = {}).Home = "home",
        Cl.UserProfile = "userProfile",
        (dr = Xi = Xi || {}).HomePageSessionInfo = "homePageSessionInfo",
        dr.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        dr.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Yn = Yi = Yi || {}).ContentType = "contentType",
        Yn.Context = "context",
        Yn.CollectionId = "collectionId",
        Yn.CollectionPosition = "collectionPosition",
        (Zi = Zi || {}).User = "User",
        (et = Qi = Qi || {}).Online = "online",
        et.InGame = "inGame",
        et.InStudio = "inStudio",
        et.Offline = "offline",
        (fr = ea = ea || {}).Friend = "friend",
        fr.NotFriend = "notFriend",
        (lt = ta = ta || {}).ItemIds = "itemIds",
        lt.ItemPositions = "itemPositions",
        lt.RowNumbers = "rowNumbers",
        lt.FeedRowNumbers = "feedRowNumbers",
        lt.PositionsInRow = "positionsInRow",
        lt.PositionsInTopic = "positionsInTopic",
        lt.TotalNumberOfItems = "totalNumberOfItems",
        (bl = na = na || {}).Presences = "presences",
        bl.PresenceUniverseIds = "presenceUniverseIds",
        bl.FriendStatuses = "friendStatuses",
        bl.SourceCarousel = "sourceCarousel",
        (Sl = ra = ra || {}).ItemId = "itemId",
        Sl.ItemPosition = "itemPosition",
        Sl.RowNumber = "rowNumber",
        Sl.FeedRowNumber = "feedRowNumber",
        Sl.PositionInRow = "positionInRow",
        Sl.PositionInTopic = "positionInTopic",
        Sl.TotalNumberOfItems = "totalNumberOfItems",
        Sl.ActionType = "actionType",
        (Cl = oa = oa || {}).Presence = "presence",
        Cl.PresenceUniverseId = "presenceUniverseId",
        Cl.FriendStatus = "friendStatus",
        Cl.SourceCarousel = "sourceCarousel";
        var ca = function() {
            return (ca = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , da = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            K.useCallback)(function() {
                var e, t = {};
                return t[Yi.Context] = i,
                t[Yi.ContentType] = Zi.User,
                t[Yi.CollectionId] = l,
                t[Yi.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[ra.TotalNumberOfItems] = u,
                t[ra.ActionType] = "OpenProfile",
                t[ra.ItemId] = n.id.toString(),
                t[ra.ItemPosition] = r + 1,
                t[ra.PositionInTopic] = r + 1,
                t[ra.RowNumber] = 1,
                t[oa.Presence] = sa(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[oa.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[oa.FriendStatus] = "friend",
                t[oa.SourceCarousel] = o,
                t[Xi.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            K.useCallback)(function() {
                var e = t();
                x.eventStreamService.sendEvent({
                    name: Ki.ItemAction,
                    type: Ki.ItemAction,
                    context: i
                }, la(ca({}, e)))
            }, [t, i])
        }
          , fa = function() {
            return (fa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , pa = function(e, n, r, o, i, a, l) {
            var t = (0,
            K.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[Yi.Context] = o,
                    e[Yi.ContentType] = Zi.User,
                    e[Yi.CollectionId] = a,
                    e[Yi.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[ta.TotalNumberOfItems] = n.length,
                    e[ta.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[ta.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[ta.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[ta.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[na.Presences] = t.map(function(e) {
                        var t;
                        return sa(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[na.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[na.FriendStatuses] = t.map(function() {
                        return ea.Friend
                    }),
                    e[na.SourceCarousel] = r,
                    e[Xi.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            K.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? x.eventStreamService.sendEvent({
                    name: Ki.ItemImpressions,
                    type: Ki.ItemImpressions,
                    context: o
                }, la(fa({}, e))) : (0,
                P.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            $i(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        };
        function ma(e) {
            var t = e.translate
              , e = e.badgeCount;
            return X().createElement("div", {
                className: "friends-carousel-tile"
            }, X().createElement("button", {
                type: "button",
                id: "friend-tile-button"
            }, X().createElement("a", {
                href: "/users/friends#!/friend-requests"
            }, X().createElement("div", {
                className: "add-friends-icon-container"
            }, 0 < e && X().createElement(bn.Badge, {
                className: "friend-request-badge",
                overlap: "rectangular",
                variant: "standard",
                max: 99,
                color: "error",
                badgeContent: e.toString()
            }), X().createElement(bn.PlusHeavyIcon, {
                className: "add-friends-icon",
                color: "secondary"
            })), X().createElement("div", {
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, X().createElement("div", {
                className: "friends-carousel-tile-label"
            }, X().createElement("div", {
                className: "friends-carousel-tile-name"
            }, X().createElement("span", {
                className: "friends-carousel-display-name"
            }, t("Heading.AddFriends"))))))))
        }
        function va(e) {
            var n = e.friendsList
              , r = e.isOwnUser
              , o = e.translate
              , i = e.canChat
              , a = e.carouselName
              , l = e.eventContext
              , s = e.homePageSessionInfo
              , u = e.sortId
              , c = e.sortPosition
              , t = e.badgeCount
              , d = e.isAddFriendsTileEnabled
              , f = (0,
            K.useRef)(null)
              , p = (g = (0,
            K.useState)(n))[0]
              , m = g[1]
              , v = (0,
            K.useState)(!1)
              , e = v[0]
              , h = v[1]
              , g = (0,
            K.useRef)(null);
            return (0,
            K.useEffect)(function() {
                var e = null === (t = f.current) || void 0 === t ? void 0 : t.offsetWidth
                  , t = null !== (t = null == n ? void 0 : n.length) && void 0 !== t ? t : 0;
                h((null != e ? e : 0) < 110 * (t + 1)),
                null != e && null != n && (e = 50,
                m(n.slice(0, e - 1)))
            }, [null === (v = f.current) || void 0 === v ? void 0 : v.offsetWidth, n]),
            pa(g, n, a, l, s, u, c),
            X().createElement("div", null, X().createElement("div", {
                ref: function(e) {
                    return f.current = e,
                    f.current
                },
                className: "friends-carousel-container"
            }, null == p ? X().createElement("span", {
                className: "spinner spinner-default"
            }) : X().createElement("div", {
                ref: g,
                className: e ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, a === ha.WebHomeFriendsCarousel && d ? X().createElement(ma, {
                key: "add-friends-tile",
                translate: o,
                badgeCount: t,
                "data-testid": "add-friends-tile"
            }) : null, p.map(function(e, t) {
                return X().createElement("div", {
                    key: e.id
                }, X().createElement(ua, {
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
        (dr = os = os || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        dr.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var ha = os
          , ga = (T.EnvironmentUrls.friendsApi,
        T.EnvironmentUrls.premiumFeaturesApi,
        T.EnvironmentUrls.usersApi,
        T.EnvironmentUrls.gamesApi,
        T.EnvironmentUrls.contactsApi,
        T.EnvironmentUrls.accountSettingsApi,
        T.EnvironmentUrls.authApi,
        T.EnvironmentUrls.tradesApi,
        T.EnvironmentUrls.apiGatewayUrl)
          , ya = (T.EnvironmentUrls.chatApi,
        function() {
            return {
                url: "".concat(ga, "/user-blocking-api/v1/users/batch-check-reciprocal-block"),
                withCredentials: !0
            }
        }
        )
          , ba = function(e, a, l, s) {
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
          , Ia = function(n, r) {
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
          , Sa = function(n) {
            return ba(void 0, void 0, Promise, function() {
                var t;
                return Ia(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = parseInt(T.CurrentUser.userId, 10),
                        Number.isNaN(t) || !t ? [2, {
                            users: [{
                                isBlocked: !1,
                                isBlockingViewer: !1,
                                userId: 0
                            }]
                        }] : [4, N.httpService.post(ya(), {
                            userIds: n,
                            requesterUserId: t
                        })];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , Ca = T.EnvironmentUrls.apiGatewayUrl
          , wa = (T.EnvironmentUrls.friendsApi,
        T.EnvironmentUrls.thumbnailsApi,
        T.EnvironmentUrls.presenceApi,
        T.EnvironmentUrls.gamesApi,
        T.EnvironmentUrls.usersApi,
        function(e, t, n) {
            t = 1 < arguments.length && void 0 !== t ? t : null,
            n = 2 < arguments.length && void 0 !== n ? n : null;
            return {
                retryable: !0,
                withCredentials: !0,
                url: "".concat(Ca, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "")
            }
        }
        );
        function Ea(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var Pa = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n, r) {
                var o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return o = n ? btoa(JSON.stringify(n)) : null,
                            o = wa(t, o, r),
                            e.next = 4,
                            N.httpService.get(o);
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
                        Ea(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Ea(r, t, n, o, i, "throw", e)
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
        function xa(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ta(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        xa(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        xa(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        var _a = function() {
            var e = Ta(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            Pa("MustHideConnections", [{
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
          , Oa = function() {
            var e = Ta(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            Sa([parseInt(t, 10)]);
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
          , ka = function(e, a, l, s) {
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
          , Na = function(n, r) {
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
          , Aa = "FriendshipNotifications"
          , Ra = "fulfilled";
        function La(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = T.CurrentUser.userId) && void 0 !== o ? o : "0");
            return X().createElement("div", {
                className: "friend-carousel-container"
            }, X().createElement(Ba, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: ha.WebHomeFriendsCarousel,
                eventContext: gi.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function Da(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = fn();
            return X().createElement(La, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
        }
        function Ma(e) {
            var t = e.option
              , n = e.isSelected
              , r = e.setSelectedOptionId
              , e = e.translate;
            return X().createElement("button", {
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
            }, X().createElement("span", {
                className: "filter-option-name"
            }, t.optionDisplayName), n ? X().createElement("span", {
                className: "icon-radio-check-circle-filled"
            }) : X().createElement("span", {
                className: "icon-radio-check-circle"
            }))
        }
        function Fa(e) {
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
                l(t.filterId, b.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            K.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, b.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            K.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            K.useCallback)(function(e) {
                e.key === Ga.keyBoardEventCode.escape && u()
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
            X().createElement("div", {
                className: "filters-modal-container"
            }, X().createElement("div", {
                className: "header-container"
            }, X().createElement("h3", null, t.filterDisplayName), X().createElement("div", null, X().createElement("button", {
                type: "button",
                className: "header-close-button",
                onClick: function() {
                    return u()
                },
                "aria-label": s(ot.ActionClose)
            }, X().createElement("span", {
                className: "icon-close"
            })))), X().createElement("div", {
                className: "filter-options-container"
            }, t.filterOptions.map(function(e, t) {
                return X().createElement(X().Fragment, {
                    key: e.optionId
                }, X().createElement(Ma, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
                }), 0 === t && X().createElement("div", {
                    className: "filter-option-divider"
                }))
            })), X().createElement("div", {
                className: "action-buttons-container"
            }, X().createElement(ye.Button, {
                onClick: e,
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                width: ye.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, s(nt.ActionApply) || "Apply")))
        }
        function Ua(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = X().useRef(null)
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
            return X().createElement("div", {
                ref: i
            }, X().createElement(ye.Button, {
                onClick: function() {
                    l(function(e) {
                        var t = e ? b.CloseDropdown : b.OpenDropdown
                          , n = e ? s : void 0;
                        return o(r.filterId, t, r.selectedOptionId, n),
                        !e
                    })
                },
                variant: a ? ye.Button.variants.primary : ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                className: "filter-select"
            }, X().createElement("span", {
                className: "filter-display-text"
            }, e), X().createElement("span", {
                className: a ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), a && X().createElement(Fa, {
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
        (Yn = function(e) {
            var t = e.translate
              , m = e.profileUserId
              , v = e.isOwnUser
              , h = e.carouselName
              , n = e.eventContext
              , r = e.homePageSessionInfo
              , o = e.sortId
              , i = e.sortPosition
              , a = (0,
            K.useState)(null)
              , l = a[0]
              , g = a[1]
              , s = (0,
            K.useState)(null)
              , u = s[0]
              , y = s[1]
              , c = (0,
            K.useState)(!1)
              , d = c[0]
              , b = c[1]
              , e = (0,
            K.useState)(null)
              , a = e[0]
              , I = e[1]
              , s = (0,
            K.useState)(!1)
              , f = s[0]
              , S = s[1]
              , c = (0,
            K.useState)({
                isBadgeEnabled: !1,
                isAddFriendsTileEnabledWeb: !1
            })
              , e = c[0]
              , C = c[1]
              , s = (0,
            bn.createCache)()
              , c = (0,
            p.useTheme)();
            return (0,
            K.useEffect)(function() {
                if (f) {
                    var e = function() {
                        return ka(void 0, void 0, void 0, function() {
                            var t;
                            return Na(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return e.trys.push([0, 2, , 3]),
                                    [4, Ai()];
                                case 1:
                                    return t = e.sent(),
                                    I(t),
                                    [3, 3];
                                case 2:
                                    return t = e.sent(),
                                    console.error("Error fetching friend request count:", t),
                                    [3, 3];
                                case 3:
                                    return [2]
                                }
                            })
                        })
                    }
                      , t = xi();
                    return t.Subscribe(Aa, e),
                    function() {
                        t.Unsubscribe(Aa, e)
                    }
                }
            }, [f]),
            (0,
            K.useEffect)(function() {
                ka(void 0, void 0, void 0, function() {
                    var s, u, c, d, f, p;
                    return Na(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return p = [ki(m), Ni(m, v), Fi(), Ai(), (a = m,
                            l = v,
                            ka(void 0, void 0, void 0, function() {
                                return Na(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        return l ? [2, !1] : [4, Oa(a)];
                                    case 1:
                                        return e.sent() ? [2, !0] : [4, _a(a)];
                                    case 2:
                                        return [2, e.sent()]
                                    }
                                })
                            })), ka(void 0, void 0, Promise, function() {
                                var t;
                                return Na(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        if (null === T.ExperimentationService || void 0 === T.ExperimentationService || !T.ExperimentationService.getAllValuesForLayer)
                                            return [3, 4];
                                        e.label = 1;
                                    case 1:
                                        return e.trys.push([1, 3, , 4]),
                                        [4, T.ExperimentationService.getAllValuesForLayer("Social.Friends")];
                                    case 2:
                                        return [2, {
                                            isBadgeEnabled: !0 === (null == (t = e.sent()) ? void 0 : t.enableNewFriendRequestsBadge),
                                            isAddFriendsTileEnabledWeb: !0 === (null == t ? void 0 : t.enableAddFriendsTileOnWeb)
                                        }];
                                    case 3:
                                        return t = e.sent(),
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
                                })
                            })],
                            [4, (i = p,
                            Promise.all(i.map(function(e) {
                                return e.then(function(e) {
                                    return {
                                        status: Ra,
                                        value: e
                                    }
                                })
                            })))];
                        case 1:
                            return f = e.sent(),
                            s = f[0],
                            u = f[1],
                            c = f[2],
                            d = f[3],
                            p = f[4],
                            f = f[5],
                            s = s.status === Ra ? s.value.count : 0,
                            u = u.status === Ra ? u.value : [],
                            c = c.status === Ra && c.value.chatEnabled,
                            d = d.status === Ra ? d.value : 0,
                            f = f.status === Ra ? f.value : {
                                isBadgeEnabled: !1,
                                isAddFriendsTileEnabledWeb: !1
                            },
                            p = p.status !== Ra || p.value,
                            g(s),
                            y(u),
                            b(c),
                            I(d),
                            C(f),
                            S((t = p,
                            n = h,
                            r = s,
                            o = d,
                            i = f.isAddFriendsTileEnabledWeb,
                            !t && (n !== ha.WebHomeFriendsCarousel ? 0 !== r : 0 !== r || i && 0 !== o))),
                            [2]
                        }
                        var t, n, r, o, i, a, l
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [m, v]),
            X().createElement(bn.CacheProvider, {
                cache: s
            }, X().createElement(bn.UIThemeProvider, {
                theme: c,
                cssBaselineMode: "disabled"
            }, f ? X().createElement("div", {
                className: "react-friends-carousel-container"
            }, X().createElement(Pi, {
                friendsCount: l,
                translate: t,
                profileUserId: m,
                isOwnUser: v
            }), X().createElement(va, {
                badgeCount: e.isBadgeEnabled && null != a ? a : 0,
                friendsList: u,
                translate: t,
                isOwnUser: v,
                canChat: d,
                carouselName: h,
                eventContext: n,
                homePageSessionInfo: r,
                sortId: o,
                sortPosition: i,
                isAddFriendsTileEnabled: e.isAddFriendsTileEnabledWeb
            })) : X().createElement("div", {
                className: "friends-carousel-0-friends"
            })))
        }
        ).defaultProps = {
            translate: void 0
        };
        var Ba = (0,
        p.withTranslations)(Yn, Ui)
          , Ga = tt
          , ja = function() {
            return (ja = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ha = function(i, a, e) {
            var l = fn()
              , t = (0,
            K.useRef)(null)
              , n = (0,
            K.useCallback)(function() {
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
                e[F.DiscoverPageSessionInfo] = l,
                e[R.Page] = Y.GamesPage,
                e
            }, [i.filters, i.topicId, i.gameSetTargetId, a, l]);
            (0,
            K.useEffect)(function() {
                return null != e && e.current && (t.current = x.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: Ke.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = ee.filterImpressions(e)) && x.eventStreamService.sendEvent.apply(x.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var o = (0,
            K.useCallback)(function(e, t, n, r) {
                var o;
                return ja(((o = {})[R.ButtonName] = t,
                o[R.GameSetTypeId] = i.topicId,
                o[R.GameSetTargetId] = i.gameSetTargetId,
                o[R.SortPos] = a,
                o[F.DiscoverPageSessionInfo] = l,
                o[R.Page] = Y.GamesPage,
                o[R.FilterId] = e,
                o[R.SelectedOptionId] = n,
                o), r && ((o = {})[R.PreviousOptionId] = r,
                o))
            }, [i.topicId, i.gameSetTargetId, a, l]);
            return (0,
            K.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = ee.gamesFilterClick(r);
                r && x.eventStreamService.sendEvent.apply(x.eventStreamService, r)
            }, [o])
        };
        (et = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            K.useRef)(null)
              , a = Ha(o, t, e);
            return X().createElement("div", {
                ref: e,
                className: "filters-container"
            }, X().createElement("div", {
                className: "filters-header-container"
            }, X().createElement("span", {
                className: "filters-header"
            }, o.topic)), X().createElement("div", {
                className: "filter-items-container"
            }, o.filters.map(function(r) {
                return X().createElement(Ua, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = Co([o]),
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
        var za, Wa = et, Va = "webDiscoverySduiError";
        function qa(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }
        function Ja(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                e = parseInt(e, 10);
                if (!Number.isNaN(e))
                    return e
            }
            return t
        }
        function $a(e, t) {
            if ("boolean" == typeof e)
                return e;
            if ("string" != typeof e)
                return "number" == typeof e ? 1 === e || 0 !== e && (ol(za.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e),
                t) : (ol(za.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined")),
                t);
            var n = e.toLowerCase();
            return "true" === n || "t" === n || "false" !== n && "f" !== n && (ol(za.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e),
            t)
        }
        function Ka(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }
        function Xa(n) {
            var r = {};
            return Object.keys(n).forEach(function(e) {
                var t = n[e];
                Ka(t) ? r[e] = t : ol(za.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + e + ", value: " + JSON.stringify(t) + ", type: " + typeof t)
            }),
            r
        }
        function Ya(e, t) {
            var n;
            switch (t) {
            case Y.HomePage:
                return (n = {})[yi.HomePageSessionInfo] = e,
                n;
            case Y.GamesPage:
                return (n = {})[yi.DiscoverPageSessionInfo] = e,
                n;
            default:
                return ol(za.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (t ? JSON.stringify(t) : "undefined") + " with session info: " + e),
                {}
            }
        }
        function Za(e, t, n) {
            return null != t && t.analyticsData && void 0 !== (null == t ? void 0 : t.analyticsData[e]) && null !== (null == t ? void 0 : t.analyticsData[e]) ? t.analyticsData[e] : null != t && t.ancestorAnalyticsData && void 0 !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) && null !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) ? t.ancestorAnalyticsData[e] : n
        }
        function Qa(e, t, n, r, o) {
            return t = al(al({}, e), t),
            r = al(al({}, t), {
                collectionId: Ja(t.collectionId, sl.collectionId),
                collectionPosition: Ja(t.collectionPosition, -1),
                contentType: qa(t.contentType, sl.contentType),
                itemsPerRow: r,
                totalNumberOfItems: o
            }),
            void 0 === (o = r).collectionId || o.collectionId < 0 || void 0 === o.contentType || void 0 === o.collectionPosition || o.collectionPosition < 0 || void 0 === o.totalNumberOfItems || o.totalNumberOfItems < 0 ? (ol(za.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + n + " is invalid: " + JSON.stringify(r)),
            al(al({}, sl), r)) : r
        }
        function el(e, t, n) {
            return e = al(al(al({}, t), e), n),
            n = al(al({}, e), {
                id: qa(e.id, ll.id),
                itemPosition: Ja(e.itemPosition, ll.itemPosition)
            }),
            void 0 === (e = n).id || e.itemPosition < 0 ? (ol(za.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(n)),
            al(al({}, ll), n)) : n
        }
        function tl(e) {
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
              , p = e.titleComponent
              , m = e.isContained
              , v = e.containmentPadding
              , h = e.cornerRadius
              , g = e.footerComponent
              , y = e.ctaButtonComponent
              , e = e.isOnScreen
              , t = t.dependencies.tokens;
            return X().createElement(ro, {
                isFocused: null != n && n || null != r && r,
                imageComponent: null != i ? i : o,
                imageAspectRatio: null != a ? a : 1,
                thumbnailOverlayComponent: l,
                onActivated: null == s ? void 0 : s.onActivated,
                linkPath: null == s ? void 0 : s.linkPath,
                isContained: null != m && m,
                containmentBackgroundColor: t.Color.Surface.Surface_100,
                containmentPadding: null != v ? v : t.Padding.Small,
                cornerRadius: null != h ? h : t.Radius.Medium,
                titleText: u,
                titleColor: null != c ? c : t.Color.Content.Emphasis,
                titleFont: null != d ? d : t.Typography.TitleMedium,
                titleLines: null != f ? f : 1,
                titleComponent: p,
                footerComponent: g,
                ctaButtonComponent: y,
                isOnScreen: null != e && e,
                placeholderImageBackgroundColor: t.Color.Surface.Surface_300
            })
        }
        function nl(e) {
            var t, n = $a(Za("adFlag", e, !1), !1), r = qa(Za("adId", e, ""), ""), o = Ja(Za("itemPosition", e, -1), -1), i = null != e && e.getCollectionData ? e.getCollectionData() : void 0, a = null !== (l = null == i ? void 0 : i.collectionPosition) && void 0 !== l ? l : Ja(Za("collectionPosition", e, -1), -1), l = null !== (s = null == i ? void 0 : i.totalNumberOfItems) && void 0 !== s ? s : Ja(Za("totalNumberOfItems", e, -1), -1), i = null !== (s = null == i ? void 0 : i.collectionId) && void 0 !== s ? s : Ja(Za("collectionId", e, -1), -1), s = qa(Za(yi.HomePageSessionInfo, e, ""), "");
            return Il(Il(((e = {})[R.IsAd] = n,
            e), "" !== r && ((t = {})[R.NativeAdData] = r,
            t)), ((t = {})[R.Position] = o,
            t[R.SortPos] = a,
            t[R.NumberOfLoadedTiles] = l,
            t[R.GameSetTypeId] = i,
            t[R.Page] = Y.HomePage,
            t[F.HomePageSessionInfo] = s,
            t))
        }
        (fr = za = za || {}).AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
        fr.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
        fr.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
        fr.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
        fr.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
        fr.BuildBaseImpressionParamsInvalidItemsPerRow = "BuildBaseImpressionParamsInvalidItemsPerRow",
        fr.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
        fr.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
        fr.CollectionCarouselMissingItem = "CollectionCarouselMissingItem",
        fr.CollectionCarouselItemMissingComponentType = "CollectionCarouselItemMissingComponentType",
        fr.CollectionCarouselItemsImpressedButMissing = "CollectionCarouselItemsImpressedButMissing",
        fr.CollectionCarouselChildNotReactElement = "CollectionCarouselChildNotReactElement",
        fr.CollectionCarouselHeaderNotReactElement = "CollectionCarouselHeaderNotReactElement",
        fr.ComponentNotFound = "ComponentNotFound",
        fr.FriendsPresenceFetchFailure = "FriendsPresenceFetchFailure",
        fr.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
        fr.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
        fr.InvalidMinWidthConditionValue = "InvalidMinWidthConditionValue",
        fr.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
        fr.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
        fr.InvalidParsedMinWidthConditionValue = "InvalidParsedMinWidthConditionValue",
        fr.InvalidPresenceConditionValue = "InvalidPresenceConditionValue",
        fr.InvalidPresenceUpdateEvent = "InvalidPresenceUpdateEvent",
        fr.NestedPropParseFailure = "NestedPropParseFailure",
        fr.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
        fr.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
        fr.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
        fr.PropParseFailure = "PropParseFailure",
        fr.PropParserNotFound = "PropParserNotFound",
        fr.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
        fr.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
        fr.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
        fr.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
        fr.SduiActionOpenSeeAllInvalidCollectionId = "SduiActionOpenSeeAllInvalidCollectionId",
        fr.SduiActionOpenSeeAllInvalidCollectionName = "SduiActionOpenSeeAllInvalidCollectionName",
        fr.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
        fr.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
        fr.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
        fr.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
        fr.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
        fr.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
        fr.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
        fr.SduiParseAutomaticSizeInvalidInput = "SduiParseAutomaticSizeInvalidInput",
        fr.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
        fr.SduiParseColorValueInvalidInput = "SduiParseColorValueInvalidInput",
        fr.SduiParseFoundationTokenInvalidInput = "SduiParseFoundationTokenInvalidInput",
        fr.SduiParseFoundationTokenInvalidInputPath = "SduiParseFoundationTokenInvalidInputPath",
        fr.SduiParseFoundationTokenInvalidOutputType = "SduiParseFoundationTokenInvalidOutputType",
        fr.SduiParseFoundationTokenMissingTokens = "SduiParseFoundationTokenMissingTokens",
        fr.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
        fr.SduiParseIconInvalidInput = "SduiParseIconInvalidInput",
        fr.SduiParseUDim2InvalidInput = "SduiParseUDim2InvalidInput",
        fr.SduiParseVector2InvalidInput = "SduiParseVector2InvalidInput",
        fr.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
        fr.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
        fr.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
        fr.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
        fr.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
        fr.TemplateResolutionCircularReference = "TemplateResolutionCircularReference",
        fr.TemplateResolutionComponentTypeMismatch = "TemplateResolutionComponentTypeMismatch",
        fr.TemplateResolutionTemplateNotFound = "TemplateResolutionTemplateNotFound",
        fr.UnsupportedConditionalPropsCondition = "UnsupportedConditionalPropsCondition",
        fr.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
        fr.UnknownPresenceConditionKey = "UnknownPresenceConditionKey",
        fr.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey";
        var rl, ol = function(e, t) {
            (0,
            P.fireEvent)(e);
            t = {
                errorName: e,
                errorMessage: t
            };
            x.eventStreamService.sendEvent({
                name: Va,
                type: Va,
                context: gi.Home
            }, Ei(t))
        }, il = function() {
            return (il = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, lt = function(e) {
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
                return d ? X().createElement(wr, {
                    title: d.title,
                    subtitle: d.subtitle,
                    leftAssetComponent: d.image,
                    rightButtonComponent: f,
                    subtitleMaxLines: 1,
                    textColor: "white",
                    height: "40px"
                }) : X().createElement(X().Fragment, null)
            }, [d, f])
              , g = (0,
            K.useMemo)(function() {
                return c ? X().createElement(jr, {
                    pillText: c
                }) : X().createElement(X().Fragment, null)
            }, [c])
              , y = (0,
            K.useMemo)(function() {
                return void 0 !== i ? i : 0 === o.degree || 180 === o.degree ? 1 : .5
            }, [i, o])
              , b = (0,
            K.useMemo)(function() {
                return void 0 !== a ? a : 0 === o.degree || 180 === o.degree ? .5 : 1
            }, [a, o]);
            return (0,
            K.useMemo)(function() {
                return X().createElement(Gr, {
                    title: t,
                    subtitle: n,
                    foregroundImageComponent: l,
                    backgroundImageComponent: s,
                    gradient: il(il({}, o), {
                        heightPercent: y,
                        widthPercent: b
                    }),
                    gradientHeightPercent: y,
                    gradientWidthPercent: b,
                    overlayPillComponent: g,
                    backgroundClickAction: null == u ? void 0 : u.onActivated,
                    backgroundClickLinkPath: null == u ? void 0 : u.linkPath,
                    bottomRowComponent: null != r ? r : h,
                    minForegroundHeightPercent: p,
                    maxForegroundHeightPercent: m
                }, v)
            }, [s, u, r, h, l, o, y, b, n, t, v, g, p, m])
        }, al = function() {
            return (al = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ll = {
            id: "Unknown",
            itemPosition: -1
        }, sl = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1
        }, ul = function() {
            return (ul = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, cl = function(e, t, n) {
            var r = el(null !== (l = t.analyticsData) && void 0 !== l ? l : {}, null !== (s = t.ancestorAnalyticsData) && void 0 !== s ? s : {}, void 0)
              , o = null !== (u = null != n ? n : t.getCollectionData && t.getCollectionData()) && void 0 !== u ? u : null;
            o || ol(za.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e));
            var i, a, l, s, u, c = null != o ? o : sl, n = (a = (i = r).itemPosition,
            l = c.contentType,
            s = c.collectionPosition,
            n = c.collectionId,
            t = c.totalNumberOfItems,
            u = e.actionType,
            i ? ((o = {})[bi.CollectionId] = n,
            o[bi.CollectionPosition] = s,
            o[bi.ContentType] = l,
            o[Si.TotalNumberOfItems] = t,
            o[Si.ItemId] = i.id,
            o[Si.ItemPosition] = a,
            o[Si.PositionInTopic] = a,
            o[Si.ActionType] = u,
            o) : (ol(za.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + n),
            {})), n = ul(ul(ul(ul({}, r), c), Xa(e.actionParams)), n);
            x.eventStreamService.sendEvent({
                name: hi.ItemAction,
                type: hi.ItemAction,
                context: gi.Home
            }, Ei(ul({}, n)))
        }, dl = function() {
            return (dl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, fl = function(e, t, n, r) {
            var o = (0,
            K.useRef)(null)
              , i = (0,
            K.useCallback)(function(e, t) {
                cl(e, t, o.current)
            }, [o])
              , a = (0,
            K.useCallback)(function() {
                return o.current
            }, [o])
              , l = (0,
            K.useMemo)(function() {
                return dl(dl({}, e), {
                    logAction: i,
                    getCollectionAnalyticsData: a
                })
            }, [e, i, a]);
            return o.current = (0,
            K.useMemo)(function() {
                var e;
                return Qa(null !== (e = l.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = l.analyticsData) && void 0 !== e ? e : {}, t, n, r)
            }, [l.ancestorAnalyticsData, l.analyticsData, t, n, r]),
            {
                collectionAnalyticsContext: l,
                collectionAnalyticsDataRef: o
            }
        }, pl = function() {
            return (pl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ml = [bi.CollectionId, bi.CollectionPosition, bi.ContentType, "id", "itemPosition", "itemsPerRow", "rowNumber", Ii.TotalNumberOfItems], vl = function(e, t, n) {
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
                c.push(t.itemPosition),
                f.push(t.itemPosition),
                void 0 !== i && 0 < i ? (t = Math.floor(e / i),
                d.push(t + 1)) : (ol(za.BuildBaseImpressionParamsInvalidItemsPerRow, "itemsPerRow is undefined or not greater than 0 when sending impressions for collection " + l + ": " + JSON.stringify(i)),
                d.push(1))) : ol(za.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + l)
            }),
            (p = {})[bi.CollectionId] = l,
            p[bi.CollectionPosition] = a,
            p[bi.ContentType] = o,
            p[Ii.TotalNumberOfItems] = s,
            p[Ii.ItemIds] = u.join(","),
            p[Ii.ItemPositions] = c.join(","),
            p[Ii.RowNumbers] = d.join(","),
            p[Ii.PositionsInTopic] = f.join(","),
            p = p,
            e = function(r, o, i) {
                var a = {};
                r.forEach(function(e, n) {
                    var t = o[e];
                    null != t ? Object.entries(t).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        ml.includes(t) || null == e || (a[t] || (a[t] = r.map(function() {
                            return ""
                        })),
                        a[t][n] = e.toString())
                    }) : ol(za.BuildItemImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i)
                });
                var n = {};
                return Object.entries(a).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n[t + "_arr"] = e.join(",")
                }),
                n
            }(e, t, n.collectionId),
            p = pl(pl(pl({}, e), n), p),
            x.eventStreamService.sendEvent({
                name: hi.ItemImpressions,
                type: hi.ItemImpressions,
                context: gi.Home
            }, Ei(pl({}, p)))) : ol(za.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId) : ol(za.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (n = null == n ? void 0 : n.collectionId) && void 0 !== n ? n : "undefined"))
        }, hl = function() {
            return (hl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, gl = function(e, t, n, r) {
            var o, i, a, l, s = function(e) {
                var e = null == e ? void 0 : e[0];
                if ((null == e ? void 0 : e.componentType) === rs.Tile || (null == e ? void 0 : e.componentType) === rs.GameTile) {
                    e = null === (e = e.props) || void 0 === e ? void 0 : e.imageAspectRatio;
                    if (Ka(e))
                        if (1 < Ja(e, 0))
                            return !0
                }
                return !1
            }(n), u = hl(hl(hl(hl(((a = {})[R.RootPlaceIds] = e.map(function(e) {
                return Ja(null === (e = t[e]) || void 0 === e ? void 0 : e.placeId, -1)
            }),
            a[R.UniverseIds] = e.map(function(e) {
                return Ja(null === (e = t[e]) || void 0 === e ? void 0 : e.universeId, -1)
            }),
            a), (n = e,
            l = t,
            (a = s) ? ((a = {})[R.ThumbnailAssetIds] = n.map(function(e) {
                return qa(null === (e = l[e]) || void 0 === e ? void 0 : e.thumbnailAssetId, "0")
            }),
            a[R.ThumbnailListIds] = n.map(function(e) {
                return qa(null === (e = l[e]) || void 0 === e ? void 0 : e.thumbnailListId, "0")
            }),
            a) : {})), (a = e,
            i = t,
            (s = s) ? ((s = {})[R.TileBadgeContexts] = a.map(function(e) {
                return qa(null === (e = i[e]) || void 0 === e ? void 0 : e.tileBadgeIds, "0")
            }),
            s) : {})), (o = t,
            (s = (a = e).map(function(e) {
                return !0 === $a(null === (e = o[e]) || void 0 === e ? void 0 : e.adFlag, !1) ? 1 : 0
            })).some(function(e) {
                return 1 === e
            }) ? ((u = {})[R.AdsPositions] = s,
            u[R.AdFlags] = s,
            u[R.AdIds] = a.map(function(e) {
                return qa(null === (e = o[e]) || void 0 === e ? void 0 : e.adId, "0")
            }),
            u) : {})), ((u = {})[R.NavigationUids] = e.map(function(e) {
                return qa(null === (e = t[e]) || void 0 === e ? void 0 : e.navigationUniverseId, "0")
            }),
            u[R.AbsPositions] = e,
            u[R.SortPos] = 0 <= (null == r ? void 0 : r.collectionPosition) ? r.collectionPosition - 1 : -1,
            u[R.GameSetTypeId] = null !== (e = null == r ? void 0 : r.collectionId) && void 0 !== e ? e : -1,
            u[R.Page] = Y.HomePage,
            u[F.HomePageSessionInfo] = qa(null == r ? void 0 : r[yi.HomePageSessionInfo], ""),
            u)), u = ee.gameImpressions(u);
            x.eventStreamService.sendEvent.apply(x.eventStreamService, u)
        }, yl = function() {
            return (yl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, bl = function(e) {
            var o = e.sduiContext
              , t = e.analyticsContext
              , i = e.componentConfig
              , n = e.items
              , r = e.collectionItemSize
              , a = e.itemTemplateKey
              , l = e.layoutOverrides
              , s = e.scrollThresholdFromEnd
              , u = e.onScrollToEnd
              , c = e.headerComponent
              , d = e.children
              , f = o.dependencies.tokens
              , p = (0,
            K.useMemo)(function() {
                return n ? n.map(function(e) {
                    return e.templateKey ? o.templateRegistry.resolveTemplateForConfig(e) : a ? o.templateRegistry.resolveTemplateForConfig(yl(yl({}, e), {
                        templateKey: a
                    })) : e
                }) : []
            }, [n, o, a])
              , m = (0,
            K.useRef)([])
              , v = (0,
            K.useState)(-1)
              , h = v[0]
              , g = v[1]
              , y = fl(t, i.componentType, h, p.length)
              , b = y.collectionAnalyticsContext
              , I = y.collectionAnalyticsDataRef
              , e = (0,
            K.useCallback)(function(e) {
                var t;
                p ? ("Game" === (null === (t = I.current) || void 0 === t ? void 0 : t.contentType) && gl(e, m.current, p, I.current),
                vl(e, m.current, I.current)) : ol(za.CollectionCarouselItemsImpressedButMissing, "CollectionCarousel with config " + JSON.stringify(i) + " is missing item configs on impression. Configs are " + JSON.stringify(p))
            }, [p, I, i])
              , v = (0,
            K.useRef)(null);
            vi(v, p.length, e);
            t = (0,
            K.useCallback)(function(e, t, n) {
                var r = void 0 !== (null === (r = I.current) || void 0 === r ? void 0 : r.collectionPosition) && 0 <= I.current.collectionPosition ? I.current.collectionPosition - 1 : -1;
                po({
                    distance: e,
                    scrollAreaSize: n,
                    startingPosition: t,
                    direction: S.Horizontal,
                    gameSetTypeId: null !== (t = null === (t = I.current) || void 0 === t ? void 0 : t.collectionId) && void 0 !== t ? t : -1,
                    gameSetTargetId: void 0,
                    sortPosition: r,
                    currentPage: Y.HomePage,
                    pageSession: qa(null === (r = I.current) || void 0 === r ? void 0 : r[yi.HomePageSessionInfo], "")
                })
            }, [I]),
            h = (0,
            K.useCallback)(function(e, t, n) {
                if (!e)
                    return ol(za.CollectionCarouselMissingItem, "CollectionCarousel with config " + JSON.stringify(i) + " trying to render item " + JSON.stringify(e) + " that is missing"),
                    X().createElement(X().Fragment, null);
                var r = qa(Za("componentType", e.analyticsData, ""), "") || e.componentType;
                if (!r)
                    return ol(za.CollectionCarouselItemMissingComponentType, "CollectionCarousel with config " + JSON.stringify(i) + " is missing item component type on item config " + JSON.stringify(e)),
                    X().createElement(X().Fragment, null);
                r = {
                    itemPosition: t + 1,
                    itemComponentType: r,
                    componentType: r
                };
                return m.current[t] = el(null !== (t = e.analyticsData) && void 0 !== t ? t : {}, null !== (t = I.current) && void 0 !== t ? t : {}, r),
                X().createElement(xs, {
                    componentConfig: e,
                    parentAnalyticsContext: b,
                    sduiContext: o,
                    localAnalyticsData: r,
                    extraLocalProps: {
                        isOnScreen: n
                    }
                })
            }, [o, i, b, I]),
            y = (0,
            K.useMemo)(function() {
                return X().Children.map(d, function(e, t) {
                    if (!X().isValidElement(e))
                        return ol(za.CollectionCarouselChildNotReactElement, "SduiCollectionCarouselChildNotReactElement " + JSON.stringify(i) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = i.componentType + "-child-" + t;
                    return X().cloneElement(e, yl(yl({}, e.props), {
                        key: t,
                        parentAnalyticsContext: b
                    }))
                })
            }, [d, b, i]),
            e = (0,
            K.useMemo)(function() {
                return c ? X().cloneElement(c, yl(yl({}, c.props), {
                    parentAnalyticsContext: b
                })) : null
            }, [c, b]);
            return X().createElement("div", null, X().createElement(Lr, {
                itemsContainerRef: v,
                items: p,
                renderItem: h,
                collectionItemSize: null != r ? r : xr.Small,
                updateItemsPerRow: g,
                headerComponent: e,
                layoutOverrides: l,
                gapBetweenHeaderAndItems: f.Gap.Large,
                isHorizontalScrollEnabled: !0,
                scrollArrowBackgroundColor: f.Color.Surface.Surface_100,
                scrollArrowBoxShadowColor: f.Color.Common.Shadow,
                thresholdFromEnd: s,
                onReachedThresholdFromEnd: u,
                reportHorizontalScrollTelemetry: t
            }), y)
        }, Il = function() {
            return (Il = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Sl = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.placeId
              , r = Ja(n, -1);
            if (r && -1 !== r) {
                var o = (o = t,
                t = Xa(null !== (e = null == (t = e) ? void 0 : t.actionParams) && void 0 !== e ? e : {}),
                e = Ja(null !== (e = t.placeId) && void 0 !== e ? e : Za("placeId", o, -1), -1),
                t = Ja(null !== (t = t.universeId) && void 0 !== t ? t : Za("universeId", o, -1), -1),
                o = nl(o),
                Il(Il({}, o), ((o = {})[R.PlaceId] = e,
                o[R.UniverseId] = t,
                o)));
                return {
                    callback: void 0,
                    linkPath: v(r, "", o)
                }
            }
            return ol(za.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(n) + " to open game details"),
            {
                callback: void 0,
                linkPath: void 0
            }
        }, Cl = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionName
              , r = qa(n, "");
            if (!r)
                return ol(za.SduiActionOpenSeeAllInvalidCollectionName, "Invalid collection name " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionId,
            e = Ja(n, -1);
            if (!e || -1 === e)
                return ol(za.SduiActionOpenSeeAllInvalidCollectionId, "Invalid collection id " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            var o, n = (o = e,
            e = Ja(Za("collectionPosition", n = t, -1), -1),
            null !== (t = null == (t = null != n && n.getCollectionData ? n.getCollectionData() : void 0) ? void 0 : t.collectionId) && void 0 !== t || Ja(Za("collectionId", n, -1), -1),
            t = qa(Za(yi.HomePageSessionInfo, n, ""), ""),
            (n = {})[R.Position] = e,
            n[R.SortId] = o,
            n[R.GameSetTypeId] = o,
            n[R.Page] = Y.HomePage,
            n[F.HomePageSessionInfo] = t,
            n);
            return {
                callback: void 0,
                linkPath: A(r, n[R.Page], n)
            }
        };
        function wl(e) {
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
                Ge(t).then(function(e) {
                    r(null !== (e = null === (e = null == e ? void 0 : e.locations[0]) || void 0 === e ? void 0 : e.location) && void 0 !== e ? e : "")
                }).catch(function() {
                    r("")
                }).finally(function() {
                    i(!1)
                })
            }, [t]),
            o ? X().createElement(ye.Loading, null) : n ? X().createElement("img", {
                src: n,
                alt: "asset"
            }) : (ol(za.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t),
            X().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }
        function El(e) {
            var t = e.thumbnailType
              , n = e.targetId
              , r = e.format
              , e = e.size;
            return X().createElement(qe.Thumbnail2d, {
                containerClass: "sdui-thumbnail-image-container",
                type: t,
                targetId: n,
                format: r,
                size: e
            })
        }
        (dr = rl = rl || {}).OpenGameDetails = "OpenGameDetails",
        dr.OpenSeeAll = "OpenSeeAll",
        dr.PlayButtonClick = "PlayButtonClick";
        var Pl, xl, Tl, _l = ((os = {})[rl.OpenGameDetails] = Sl,
        os[rl.OpenSeeAll] = Cl,
        os[rl.PlayButtonClick] = function() {
            return {
                callback: void 0,
                linkPath: void 0
            }
        }
        ,
        os);
        function Ol(e, t) {
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
                ol(za.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(n) + " missing matching feed item with key " + t)
            } else
                ol(za.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e))
        }
        function kl(e) {
            return !!(e && "object" == typeof e && e.componentType && bs(e.componentType))
        }
        function Nl(i, a, l) {
            if (!function(e) {
                if (e && "object" == typeof e && (e.actionType && e.actionParams && _l[e.actionType]))
                    return !0;
                return !1
            }(i))
                return ol(za.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(i) + " to parse callback"),
                {
                    onActivated: function() {},
                    linkPath: void 0
                };
            var s = (0,
            _l[i.actionType])(i, a, l);
            return {
                onActivated: function() {
                    return e = s,
                    t = i,
                    r = l,
                    (o = (n = a).logAction) ? o(t, n) : cl(t, n, null),
                    void (e.callback && e.callback(t, n, r));
                    var e, t, n, r, o
                },
                linkPath: s.linkPath
            }
        }
        function Al(e) {
            if ("string" != typeof e)
                return ol(za.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string."),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var t = e.split("//");
            if (2 === t.length && (e.includes(Tl.RbxAsset) || e.includes(Tl.RbxThumb))) {
                if (t[0].includes(Tl.RbxAsset))
                    return {
                        assetType: Tl.RbxAsset,
                        assetTarget: t[1]
                    };
                if (t[0].includes(Tl.RbxThumb))
                    return {
                        assetType: Tl.RbxThumb,
                        assetTarget: t[1]
                    }
            }
            return ol(za.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }
        function Rl(e) {
            if ("string" != typeof e)
                return null;
            var t, n, r = Al(e), o = r.assetType, i = r.assetTarget;
            if (o === Tl.RbxAsset) {
                var a = i;
                return X().createElement(wl, {
                    assetId: a
                })
            }
            if (o !== Tl.RbxThumb)
                return ol(za.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported."),
                null;
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
            return void 0 === (a = r.id) || void 0 === o || void 0 === i || void 0 === l ? (ol(za.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != o ? o : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != i ? i : "undefined") + ", or h " + (null != l ? l : "undefined") + " is invalid"),
            null) : (t = i + "x" + l,
            void 0 !== (e = null === (e = Xl[e = o]) || void 0 === e ? void 0 : e.find(function(e) {
                return e === t
            })) ? X().createElement(El, {
                thumbnailType: o,
                targetId: a,
                format: qe.ThumbnailFormat.webp,
                size: e
            }) : (ol(za.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + i + "x" + l + " for type " + o),
            null))
        }
        function Ll(e, t) {
            if (t)
                if ("string" == typeof e) {
                    for (var n = e.split("."), r = t, o = 0; o < n.length; ++o) {
                        var i = n[o];
                        if (null == r || "object" != typeof r || Array.isArray(r))
                            return void ol(za.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". Token path step " + i + " is invalid. Token is " + JSON.stringify(r));
                        r = r[i]
                    }
                    if (null != r)
                        return r;
                    ol(za.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". The final token " + (r ? JSON.stringify(r) : "undefined") + " is invalid.")
                } else
                    ol(za.SduiParseFoundationTokenInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation token. Input must be a string.");
            else
                ol(za.SduiParseFoundationTokenMissingTokens, "Missing tokens in parseFoundationTokenHelper for input " + JSON.stringify(e))
        }
        function Dl(e) {
            return !(!e || "object" != typeof e)
        }
        function Ml(e) {
            return "string" == typeof e && /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(e)
        }
        function Fl(e) {
            return "string" == typeof e && /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*(?:\.\d+)?)\s*\)$/.test(e)
        }
        function Ul(e, t, n) {
            return Ml(e) || Fl(e) ? e : (n = function(e, t) {
                t = Ll(e, t.dependencies.tokens);
                if (void 0 !== t && "string" == typeof t)
                    return t;
                ol(za.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof t + ". Expected string.")
            }(e, n)) && (Ml(n) || Fl(n)) ? n : void ol(za.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected color string.")
        }
        function Bl(e) {
            return "string" == typeof e && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }
        function Gl(e) {
            return "string" == typeof e && /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }
        function jl(e) {
            return !(!e || "object" != typeof e || void 0 === e.xScale || "number" != typeof e.xScale || void 0 === e.xOffset || "number" != typeof e.xOffset || void 0 === e.yScale || "number" != typeof e.yScale || void 0 === e.yOffset || "number" != typeof e.yOffset)
        }
        function Hl(e) {
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
        function zl(e) {
            return !(!e || "object" != typeof e || void 0 === e.x || "number" != typeof e.x || void 0 === e.y || "number" != typeof e.y)
        }
        function Wl(e) {
            if (e && Array.isArray(e) && 2 === e.length) {
                e = e.map(Number);
                return {
                    x: e[0],
                    y: e[1]
                }
            }
        }
        function Vl(e) {
            var t = e.sduiContext
              , n = e.onActivated
              , r = e.textColor
              , o = e.fontStyle
              , i = e.gap
              , a = e.leftText
              , l = e.leftIcon
              , s = e.leftIconComponent
              , u = e.rightText
              , c = e.rightIcon
              , e = e.rightIconComponent
              , t = t.dependencies.tokens;
            return X().createElement(oo, {
                onActivated: null == n ? void 0 : n.onActivated,
                linkPath: null == n ? void 0 : n.linkPath,
                textColor: null != r ? r : t.Color.Content.Default,
                fontStyle: null != o ? o : t.Typography.BodyMedium,
                gap: null != i ? i : t.Gap.Small,
                iconWidth: 16,
                leftText: null != a ? a : "",
                leftIcon: l,
                leftIconComponent: s,
                rightText: u,
                rightIcon: c,
                rightIconComponent: e
            })
        }
        function ql(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , o = e.maxAvatars
              , i = e.iconWidth
              , e = e.onActivated
              , a = t.dependencies.tokens
              , l = null != o ? o : 3
              , s = null != i ? i : a.Size.Size_400
              , u = (0,
            K.useMemo)(function() {
                var e;
                return (null !== (e = t.dataStore.social.inGameFriendsByUniverseId[r]) && void 0 !== e ? e : []).slice(0, l)
            }, [t.dataStore.social.inGameFriendsByUniverseId, r, l])
              , o = (0,
            K.useMemo)(function() {
                return u.map(function(e) {
                    return e.displayName
                }).join(", ")
            }, [u])
              , i = (0,
            K.useMemo)(function() {
                var e = u.map(function(e) {
                    return X().createElement(El, {
                        key: e.userId,
                        thumbnailType: qe.ThumbnailTypes.avatarHeadshot,
                        targetId: e.userId.toString(),
                        format: qe.ThumbnailFormat.webp,
                        size: qe.ThumbnailAvatarHeadshotSize.size48
                    })
                });
                return X().createElement(Mr, {
                    avatarThumbnails: e,
                    iconWidth: s,
                    avatarContainerBackgroundColor: a.Color.Surface.Surface_200,
                    avatarImageBackgroundColor: a.Color.Extended.Gray.Gray_800,
                    avatarBorderColor: a.Color.System.Success
                })
            }, [u, s, a]);
            return X().createElement(Vl, {
                componentConfig: {
                    componentType: rs.TileFooter,
                    props: {}
                },
                sduiContext: t,
                analyticsContext: n,
                leftIconComponent: i,
                leftText: o,
                gap: a.Gap.XSmall,
                onActivated: e
            })
        }
        function Jl(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , e = e.footerComponent;
            return (0,
            K.useMemo)(function() {
                return !!(t.dataStore.social.inGameFriendsByUniverseId[r] && 0 < t.dataStore.social.inGameFriendsByUniverseId[r].length)
            }, [t.dataStore.social.inGameFriendsByUniverseId, r]) ? X().createElement(ql, {
                componentConfig: {
                    componentType: rs.GameTileActiveFriendsFooter,
                    props: {}
                },
                sduiContext: t,
                analyticsContext: n,
                universeId: r
            }) : null != e ? e : null
        }
        (Yn = Pl = Pl || {}).imageQualityLevel = "imageQualityLevel",
        Yn.maxWidth = "maxWidth",
        Yn.minWidth = "minWidth",
        (xl = xl || {}).friendInGame = "friendInGame",
        (Ui = Tl = Tl || {}).RbxAsset = "rbxassetid",
        Ui.RbxThumb = "rbxthumb";
        var $l = function() {
            return ($l = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Kl = {
            startColor: "#000000",
            endColor: "#000000",
            startTransparency: 0,
            endTransparency: 1,
            degree: 270
        }
          , Xl = ((tt = {})[qe.ThumbnailTypes.gameIcon] = Object.values(qe.ThumbnailGameIconSize),
        tt[qe.ThumbnailTypes.gameThumbnail] = Object.values(qe.ThumbnailGameThumbnailSize),
        tt[qe.ThumbnailTypes.assetThumbnail] = Object.values(qe.ThumbnailAssetsSize),
        tt[qe.ThumbnailTypes.avatarHeadshot] = Object.values(qe.ThumbnailAvatarHeadshotSize),
        tt)
          , Yl = function(e, t, n) {
            if (Bl(e))
                return e;
            if (Gl(e))
                return "#" + e;
            if (Ml(e) || Fl(e))
                return function(e) {
                    if (Ml(e) || Fl(e)) {
                        var t = e.match(/\d+(?:\.\d+)?/g);
                        if (!(!t || t.length < 3 || 4 < t.length)) {
                            var n = t.map(Number)
                              , r = n[0]
                              , t = n[1]
                              , n = n[2];
                            return "#" + r.toString(16).padStart(2, "0") + t.toString(16).padStart(2, "0") + n.toString(16).padStart(2, "0")
                        }
                        ol(za.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a valid rgb or rgba color.")
                    } else
                        ol(za.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a rgb or rgba color.")
                }(e);
            var r = Ul(e, 0, n);
            if (r)
                return Yl(r, t, n);
            ol(za.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in parseColorValueToHex. Input must be a hex color or a foundation color token.")
        }
          , Zl = {
            "icons/status/games/rating_small": "icon-rating-16x16",
            "icons/status/games/people-playing_small": "icon-current-players-16x16",
            "icons/navigation/pushRight_small": "icon-push-right-16x16"
        }
          , et = {
            parseUiComponent: function(e, t, n) {
                if (!e || "object" != typeof e)
                    return ol(za.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component"),
                    X().createElement(X().Fragment, null);
                return X().createElement(xs, {
                    componentConfig: e,
                    parentAnalyticsContext: t,
                    sduiContext: n
                })
            },
            parseCallback: Nl,
            parseHeroUnitAsset: function(e) {
                if (!function(e) {
                    if ("object" == typeof e && (e.image && e.title && e.subtitle))
                        return !0;
                    return !1
                }(e))
                    return {
                        image: X().createElement(X().Fragment, null),
                        title: "Hero Unit Asset Title",
                        subtitle: "Hero Unit Asset Subtitle"
                    };
                var t = Rl(e.image);
                return $l($l({}, e), {
                    image: t
                })
            },
            parseAssetUrl: Al,
            parseAssetUrlIntoComponent: Rl,
            parseGradient: function(e, t, n) {
                var r, o = !(!(r = e) || "object" != typeof r) && (!(!r.startColor || "string" != typeof r.startColor) && (!(!r.endColor || "string" != typeof r.endColor) && (void 0 !== r.startOpacity && "number" == typeof r.startOpacity && (void 0 !== r.endOpacity && "number" == typeof r.endOpacity && (void 0 !== r.degree && "number" == typeof r.degree))))), r = !(!(r = e) || "object" != typeof r) && (!(!r.startColor || "string" != typeof r.startColor) && (!(!r.endColor || "string" != typeof r.endColor) && (!(void 0 === r.startTransparency || "number" != typeof r.startTransparency || r.startTransparency < 0 || 1 < r.startTransparency) && (!(void 0 === r.endTransparency || "number" != typeof r.endTransparency || r.endTransparency < 0 || 1 < r.endTransparency) && (void 0 !== r.degree && "number" == typeof r.degree && ((void 0 === r.widthPercent || !("number" != typeof r.widthPercent || r.widthPercent < 0 || 1 < r.widthPercent)) && ((void 0 === r.heightPercent || !("number" != typeof r.heightPercent || r.heightPercent < 0 || 1 < r.heightPercent)) && (void 0 === r.halfwayPointPercent || !("number" != typeof r.halfwayPointPercent || r.halfwayPointPercent < 0 || 1 < r.halfwayPointPercent)))))))));
                return o || r ? (r = o ? {
                    startColor: e.startColor,
                    endColor: e.endColor,
                    startTransparency: e.startOpacity,
                    endTransparency: e.endOpacity,
                    degree: e.degree
                } : e,
                $l($l({}, r), {
                    startColor: null !== (o = Yl(r.startColor, t, n)) && void 0 !== o ? o : Kl.startColor,
                    endColor: null !== (n = Yl(r.endColor, t, n)) && void 0 !== n ? n : Kl.endColor
                })) : (ol(za.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e)),
                Kl)
            },
            parseFoundationNumberToken: function(e, t, n) {
                if ("number" == typeof e)
                    return e;
                n = Ll(e, n.dependencies.tokens);
                if (void 0 !== n && "number" == typeof n)
                    return n;
                ol(za.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + " for token " + JSON.stringify(n) + " with input " + JSON.stringify(e) + ". Expected number.")
            },
            parseFoundationTypographyToken: function(e, t, n) {
                if (Dl(e))
                    return e;
                n = Ll(e, n.dependencies.tokens);
                if (void 0 !== n && Dl(n))
                    return n;
                ol(za.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected TypographyToken.")
            },
            parseColorValue: function(e, t, n) {
                if (Bl(e))
                    return e;
                if (Gl(e))
                    return "#" + e;
                n = Ul(e, 0, n);
                if (n)
                    return n;
                ol(za.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value. Input must be a hex color or a foundation color token.")
            },
            parseUDim2: function(e) {
                if (jl(e))
                    return e;
                var t = Hl(e);
                if (jl(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = Hl(t);
                    if (jl(t))
                        return t;
                    ol(za.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string with 4 comma-separated values.")
                } else
                    ol(za.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string.")
            },
            parseVector2: function(e) {
                if (zl(e))
                    return e;
                var t = Wl(e);
                if (zl(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = Wl(t);
                    if (zl(t))
                        return t;
                    ol(za.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string with 2 comma-separated values.")
                } else
                    ol(za.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string.")
            },
            parseAutomaticSize: function(e) {
                if (e && "string" == typeof e)
                    switch (e) {
                    case sr.X:
                        return sr.X;
                    case sr.Y:
                        return sr.Y;
                    case sr.XY:
                        return sr.XY;
                    case sr.None:
                        return sr.None;
                    default:
                        return void ol(za.SduiParseAutomaticSizeInvalidInput, "Invalid automatic size " + JSON.stringify(e) + ". Expected one of " + Object.values(sr).join(", ") + ".")
                    }
                else
                    ol(za.SduiParseAutomaticSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for automatic size. Input must be a string.")
            },
            parseIcon: function(e) {
                if ("string" == typeof e) {
                    if (Zl[e])
                        return ge()("sdui-icon", Zl[e]);
                    ol(za.SduiParseIconInvalidInput, "Invalid icon " + JSON.stringify(e) + ". Expected one of " + Object.keys(Zl).join(", ") + ".")
                } else
                    ol(za.SduiParseIconInvalidInput, "Invalid input " + JSON.stringify(e) + " for icon. Input must be a string.")
            }
        }
          , Ql = function() {
            return (Ql = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , es = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        }
          , fr = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , o = e.placeId
              , i = e.disableDefaultFooterLogic
              , a = e.onActivated
              , l = e.footerComponent
              , s = es(e, ["sduiContext", "analyticsContext", "universeId", "placeId", "disableDefaultFooterLogic", "onActivated", "footerComponent"])
              , u = (0,
            K.useMemo)(function() {
                if (a)
                    return a;
                var e = {
                    actionType: rl.OpenGameDetails,
                    actionParams: {
                        placeId: o,
                        universeId: r
                    }
                };
                return Nl(e, n, t)
            }, [a, o, r, n, t])
              , e = (0,
            K.useMemo)(function() {
                return i ? l : X().createElement(Jl, {
                    universeId: r,
                    footerComponent: l,
                    sduiContext: t,
                    analyticsContext: n
                })
            }, [i, l, r, t, n]);
            return X().createElement(tl, Ql({}, s, {
                sduiContext: t,
                analyticsContext: n,
                onActivated: u,
                footerComponent: e
            }))
        }
          , ts = function() {
            return (ts = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function ns(e, t, n, r, o, i, a) {
            if (!kl(e))
                return ol(za.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children"),
                {
                    props: {},
                    children: null
                };
            var l, s, u, c = e.componentType, d = (l = t,
            d = r,
            r = (t = e).analyticsData,
            t = ss(ss({}, r), null != d ? d : {}),
            r = l.logAction,
            d = l.getCollectionData,
            {
                analyticsData: t,
                ancestorAnalyticsData: ss(ss({}, l.ancestorAnalyticsData), l.analyticsData),
                logAction: r,
                getCollectionData: d
            }), a = ss(ss(ss(ss(ss({}, e.props), {
                componentConfig: e,
                sduiContext: n,
                analyticsContext: d
            }), o), i), a);
            return {
                props: ls(c, a, d, n),
                children: (s = d,
                u = n,
                (e = e).children ? e.children.map(function(e, t) {
                    var n, t = (null !== (n = e.componentType) && void 0 !== n ? n : "undefined") + "-" + t;
                    return X().createElement(xs, {
                        key: t,
                        componentConfig: e,
                        parentAnalyticsContext: s,
                        sduiContext: u
                    })
                }) : null)
            }
        }
        (dr = function(e) {
            var n = e.analyticsContext
              , t = e.sduiContext
              , r = e.universeId
              , o = e.placeId
              , i = e.width
              , a = e.playableText
              , l = e.hidePlayableIcon
              , s = T.PlayButton.usePlayabilityStatus
              , u = T.PlayButton.PlayabilityStatuses
              , c = T.PlayButton.PlayButton
              , d = s(r.toString())[0]
              , e = (0,
            K.useCallback)(function() {
                var e = {
                    actionType: rl.PlayButtonClick,
                    actionParams: {}
                };
                Nl(e, n, t).onActivated()
            }, [n, t])
              , s = (0,
            K.useMemo)(function() {
                var e, t = nl(n);
                return ts(ts({}, t), ((e = {})[R.IsAd] = (null !== (t = t[R.IsAd]) && void 0 !== t && t).toString(),
                e[R.PlaceId] = Ja(o, -1),
                e[R.UniverseId] = Ja(r, -1),
                e[R.PlayContext] = Y.HomePage,
                e))
            }, [n, o, r]);
            return void 0 === d || d !== u.Playable ? X().createElement(X().Fragment, null) : X().createElement("div", {
                className: "sdui-play-button-container",
                "data-testid": "sdui-play-button-container",
                style: i ? {
                    width: i + "px"
                } : {}
            }, X().createElement(c, {
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
        var rs, Sl = dr, Cl = function(e) {
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
              , f = e.titleIcon
              , p = e.titleIconWidth
              , m = e.titleComponent
              , v = e.onSubtitleActivated
              , h = e.subtitleText
              , g = e.subtitleColor
              , y = e.subtitleFontStyle
              , b = e.subtitleGap
              , I = e.subtitleIcon
              , S = e.subtitleIconWidth
              , C = e.subtitleComponent
              , w = e.verticalGap
              , E = e.infoText
              , P = e.onInfoIconActivated
              , x = e.iconComponent
              , T = e.sduiContext.dependencies.tokens
              , _ = (0,
            K.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a])
              , e = (0,
            K.useMemo)(function() {
                return x || (E ? X().createElement(lr, {
                    callback: null == P ? void 0 : P.onActivated,
                    linkPath: null == P ? void 0 : P.linkPath,
                    ariaLabel: E
                }, X().createElement(Ct, {
                    tooltipText: E,
                    placement: "left",
                    centerIcon: !0
                })) : void 0)
            }, [x, E, P]);
            return X().createElement(Hr, {
                onTitleActivated: null == l ? void 0 : l.onActivated,
                titleLinkPath: null == l ? void 0 : l.linkPath,
                titleText: s,
                titleTextColor: null != u ? u : T.Color.Content.Emphasis,
                titleFontStyle: null != c ? c : T.Typography.HeadingSmall,
                titleGap: null != d ? d : T.Gap.XXSmall,
                titleIconClassName: f,
                titleIconWidth: null != p ? p : T.Size.Size_600,
                titleComponent: m,
                onSubtitleActivated: null == v ? void 0 : v.onActivated,
                subtitleLinkPath: null == v ? void 0 : v.linkPath,
                subtitleText: h,
                subtitleTextColor: null != g ? g : T.Color.Content.Default,
                subtitleFontStyle: null != y ? y : T.Typography.BodyMedium,
                subtitleGap: null != b ? b : T.Gap.XXSmall,
                subtitleIconClassName: I,
                subtitleIconWidth: null != S ? S : T.Size.Size_400,
                subtitleComponent: C,
                verticalGap: null != w ? w : T.Gap.XXSmall,
                iconComponent: e,
                containerOverrides: _
            })
        }, os = function(e) {
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
              , f = e.centerRightSlot
              , p = e.bottomLeftSlot
              , m = e.bottomMiddleSlot
              , v = e.bottomRightSlot
              , h = e.padding
              , g = e.children
              , e = (0,
            K.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a]);
            return X().createElement(zr, {
                topLeftSlot: l,
                topMiddleSlot: s,
                topRightSlot: u,
                centerLeftSlot: c,
                centerMiddleSlot: d,
                centerRightSlot: f,
                bottomLeftSlot: p,
                bottomMiddleSlot: m,
                bottomRightSlot: v,
                padding: h,
                containerOverrides: e
            }, g)
        }, Yn = function(e) {
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
              , f = e.icon
              , p = e.iconWidth
              , m = e.iconColor
              , v = e.iconFirst
              , h = e.textOverrides
              , g = e.iconOverrides
              , y = e.sduiContext.dependencies.tokens
              , e = (0,
            K.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a]);
            return X().createElement(Sr, {
                onActivated: null == l ? void 0 : l.onActivated,
                linkPath: null == l ? void 0 : l.linkPath,
                text: s,
                textColor: null != u ? u : y.Color.Content.Emphasis,
                fontStyle: null != c ? c : y.Typography.HeadingSmall,
                gap: d,
                iconClassName: f,
                iconWidth: p,
                iconColor: m,
                iconFirst: v,
                containerOverrides: e,
                textOverrides: h,
                iconOverrides: g
            })
        }, is = function() {
            return (is = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Ui = function(e) {
            var r = e.componentConfig
              , t = e.analyticsContext
              , n = e.sduiContext
              , o = e.item
              , i = e.children
              , a = (0,
            K.useRef)(null)
              , l = (0,
            K.useRef)(null)
              , s = (0,
            K.useCallback)(function(e, t) {
                cl(e, t, a.current)
            }, [a])
              , u = (0,
            K.useCallback)(function() {
                return a.current
            }, [a])
              , c = (0,
            K.useMemo)(function() {
                return is(is({}, t), {
                    logAction: s,
                    getCollectionAnalyticsData: u
                })
            }, [t, s, u]);
            a.current = (0,
            K.useMemo)(function() {
                var e;
                return Qa(null !== (e = c.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = c.analyticsData) && void 0 !== e ? e : {}, r.componentType, 1, 1)
            }, [c.ancestorAnalyticsData, c.analyticsData, r.componentType]);
            var d = (0,
            K.useMemo)(function() {
                return null != o && o.templateKey ? n.templateRegistry.resolveTemplateForConfig(o) : o
            }, [o, n])
              , f = (0,
            K.useCallback)(function(e) {
                var t, n;
                d ? (a.current && ("Game" !== (n = a.current.contentType) && "HeroUnit" !== n || null !== (t = l.current) && void 0 !== t && t.universeId && ((n = {})[R.RootPlaceIds] = [Ja(null === (t = l.current) || void 0 === t ? void 0 : t.placeId, -1)],
                n[R.UniverseIds] = [Ja(null === (t = l.current) || void 0 === t ? void 0 : t.universeId, -1)],
                n[R.AdsPositions] = [!0 === $a(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AdFlags] = [!0 === $a(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AbsPositions] = [0],
                n[R.SortPos] = null !== (t = null === (t = a.current) || void 0 === t ? void 0 : t.collectionPosition) && void 0 !== t ? t : -1,
                n[R.GameSetTypeId] = null === (t = a.current) || void 0 === t ? void 0 : t.collectionId,
                n[R.Page] = Y.HomePage,
                n[R.ComponentType] = "HeroUnit",
                n[F.HomePageSessionInfo] = qa(null === (t = a.current) || void 0 === t ? void 0 : t[yi.HomePageSessionInfo], ""),
                n = n,
                n = ee.gameImpressions(n),
                x.eventStreamService.sendEvent.apply(x.eventStreamService, n))),
                vl(e, [l.current], a.current)) : ol(za.SingleItemCollectionItemImpressedButMissing, "SingleItemCollection onItemImpressed missing item " + JSON.stringify(d) + " with config " + JSON.stringify(r))
            }, [d, r, a, l])
              , p = (0,
            K.useRef)(null);
            vi(p, 1, f);
            e = (0,
            K.useMemo)(function() {
                var e;
                if (!d)
                    return ol(za.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(d) + " with config " + JSON.stringify(r)),
                    X().createElement(X().Fragment, null);
                var t = {
                    itemPosition: 1
                };
                return l.current = el(null !== (e = d.analyticsData) && void 0 !== e ? e : {}, null !== (e = a.current) && void 0 !== e ? e : {}, t),
                X().createElement(xs, {
                    componentConfig: d,
                    parentAnalyticsContext: c,
                    sduiContext: n,
                    localAnalyticsData: t
                })
            }, [d, r, c, a, n]),
            f = (0,
            K.useMemo)(function() {
                return X().Children.map(i, function(e, t) {
                    if (!X().isValidElement(e))
                        return ol("SingleItemCollectionChildNotReactElement", "SingleItemCollectionChildNotReactElement " + JSON.stringify(r) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = r.componentType + "-child-" + t;
                    return X().cloneElement(e, is(is({}, e.props), {
                        key: t,
                        parentAnalyticsContext: c
                    }))
                })
            }, [i, c, r]);
            return X().createElement("div", {
                ref: p
            }, e, f)
        }, as = function() {
            return (as = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ls = function(o, i, a, l, e) {
            var t = ys[o]
              , s = as({}, i)
              , u = null != e ? e : null == t ? void 0 : t.propParsers;
            return u && Object.keys(i).forEach(function(e) {
                var t, n = i[e], r = u[e];
                void 0 !== n && r && ("function" == typeof r ? void 0 !== (t = r(n, a, l)) ? s[e] = t : ol(za.PropParseFailure, "Failed to parse prop " + e + " with value " + JSON.stringify(n) + " for component " + o) : "object" == typeof r ? "object" == typeof (t = n) && null !== t && Object.keys(t).every(function(e) {
                    return "string" == typeof e
                }) ? s[e] = ls(o, n, a, l, r) : ol(za.NestedPropParseFailure, "Expected a nested object for prop " + e + " with value " + JSON.stringify(n) + " using for component " + o) : ol(za.PropParserNotFound, "Prop parser not found for prop " + e + " and component " + o))
            }),
            s
        }, ss = function() {
            return (ss = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, tt = function(r) {
            var e = X().memo(function(n) {
                return (0,
                K.useMemo)(function() {
                    var e = ns(n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides, n.conditionalPropOverrides)
                      , t = e.props
                      , e = e.children;
                    return X().createElement(r, t, e)
                }, [n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides, n.conditionalPropOverrides])
            });
            return e.displayName = "SduiWrapped" + (r.displayName || r.name),
            e
        };
        function us(e, t, n) {
            switch (e) {
            case Pl.imageQualityLevel:
                if (!Ka(t))
                    return ol(za.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                var r = Is[qa(t, "")];
                return void 0 === r ? (ol(za.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + t.toString()),
                !1) : Ss === r;
            case Pl.maxWidth:
                if (!Ka(t))
                    return ol(za.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                var o = Ja(t, -1);
                return o < 0 ? (ol(za.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + t.toString()),
                !1) : n <= o;
            case Pl.minWidth:
                if (!Ka(t))
                    return ol(za.InvalidMinWidthConditionValue, "Invalid min width condition value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                o = Ja(t, -1);
                return o < 0 ? (ol(za.InvalidParsedMinWidthConditionValue, "Cannot parse min width value: " + t.toString()),
                !1) : o <= n;
            default:
                return ol(za.UnknownResponsivePropConditionKey, "Unknown responsive prop condition key: " + JSON.stringify(e)),
                !1
            }
        }
        function cs(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = (e = (0,
            K.useState)(window.innerWidth))[0]
              , s = e[1];
            return (0,
            K.useEffect)(function() {
                function e() {
                    s(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            e = (0,
            K.useMemo)(function() {
                return Cs(n.responsiveProps, l)
            }, [n.responsiveProps, l]),
            X().createElement(t, {
                componentConfig: n,
                parentAnalyticsContext: r,
                sduiContext: o,
                localAnalyticsData: i,
                extraLocalProps: a,
                responsivePropOverrides: e
            })
        }
        function ds(e) {
            return ws.includes(e)
        }
        function fs(e) {
            var t = e.conditionalProps
              , n = e.setFailedPresenceConditionIndexes
              , o = e.sduiContext;
            return (0,
            K.useEffect)(function() {
                var r = new Set;
                null != t && t.forEach(function(e, n) {
                    e = e.conditions;
                    e && Object.entries(e).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        ds(t) && (function(e, t, n) {
                            if (e !== xl.friendInGame)
                                return ol(za.UnknownPresenceConditionKey, "Unknown presence condition key: " + JSON.stringify(e)),
                                !1;
                            if (!Ka(t))
                                return ol(za.InvalidPresenceConditionValue, "Invalid presence condition value: " + JSON.stringify(t) + ", for key: " + e),
                                !1;
                            var r = qa(t, "");
                            return r ? 0 < (null === (r = n.inGameFriendsByUniverseId[r]) || void 0 === r ? void 0 : r.length) : (ol(za.InvalidPresenceConditionValue, "Invalid friend in game condition value: " + JSON.stringify(t) + ", for key: " + e),
                            !1)
                        }(t, e, o.dataStore.social) || r.add(n))
                    })
                }),
                n(function(e) {
                    return (0,
                    fi.isEqual)(e, r) ? e : r
                })
            }, [t, o.dataStore.social, n]),
            null
        }
        function ps(e) {
            return Es.includes(e)
        }
        function ms(e) {
            var t = e.conditionalProps
              , n = e.setFailedResponsiveConditionIndexes
              , o = (e = (0,
            K.useState)(window.innerWidth))[0]
              , r = e[1];
            return (0,
            K.useEffect)(function() {
                function e() {
                    r(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            (0,
            K.useEffect)(function() {
                var r = new Set;
                null != t && t.forEach(function(e, n) {
                    e = e.conditions;
                    e && Object.entries(e).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        ps(t) && (us(t, e, o) || r.add(n))
                    })
                }),
                n(function(e) {
                    return (0,
                    fi.isEqual)(e, r) ? e : r
                })
            }, [t, n, o]),
            null
        }
        function vs(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = n.conditionalProps
              , s = (p = (0,
            K.useState)(new Set))[0]
              , u = p[1]
              , c = (e = (0,
            K.useState)(new Set))[0]
              , d = e[1]
              , f = (0,
            K.useMemo)(function() {
                var t = {
                    hasPresenceCondition: !1,
                    hasResponsiveCondition: !1
                };
                if (!l)
                    return t;
                var n = Object.keys(xl)
                  , r = Object.keys(Pl);
                return l.forEach(function(e) {
                    e = e.conditions;
                    e && Object.keys(e).forEach(function(e) {
                        n.includes(e) ? t.hasPresenceCondition = !0 : r.includes(e) && (t.hasResponsiveCondition = !0)
                    })
                }),
                t
            }, [l])
              , p = (0,
            K.useMemo)(function() {
                return X().createElement(X().Fragment, null, f.hasPresenceCondition && X().createElement(fs, {
                    conditionalProps: l,
                    setFailedPresenceConditionIndexes: d,
                    sduiContext: o
                }), f.hasResponsiveCondition && X().createElement(ms, {
                    conditionalProps: l,
                    setFailedResponsiveConditionIndexes: u
                }))
            }, [f, l, o])
              , m = (0,
            K.useCallback)(function(e, t) {
                return !c.has(t) && !s.has(t) && (!e || Object.keys(e).every(function(e) {
                    return !(!ds(e) && !ps(e)) || (ol(za.UnsupportedConditionalPropsCondition, "Unsupported condition: " + e),
                    !1)
                }))
            }, [c, s])
              , v = (0,
            K.useMemo)(function() {
                return l ? l.reduce(function(e, t, n) {
                    var r = t.conditions
                      , t = t.propOverrides;
                    return t && m(r, n) ? Ps(Ps({}, e), t) : e
                }, {}) : {}
            }, [l, m])
              , e = (0,
            K.useMemo)(function() {
                return X().createElement(t, {
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i,
                    extraLocalProps: a,
                    conditionalPropOverrides: v
                })
            }, [t, n, r, o, i, a, v]);
            return X().createElement(X().Fragment, null, e, p)
        }
        (dr = rs = rs || {}).SingleItemCollection = "SingleItemCollection",
        dr.HeroUnit = "HeroUnit",
        dr.PlayButton = "PlayButton",
        dr.TextIconRow = "TextIconRow",
        dr.TileFooter = "TileFooter",
        dr.GameTileActiveFriendsFooter = "GameTileActiveFriendsFooter",
        dr.Tile = "Tile",
        dr.GameTile = "GameTile",
        dr.SectionHeader = "SectionHeader",
        dr.SlotOverlay = "SlotOverlay",
        dr.CollectionCarousel = "CollectionCarousel",
        dr.ImageWithGradient = "ImageWithGradient";
        var hs, gs, ys = ((dr = {})[rs.SingleItemCollection] = {
            component: tt(Ui),
            propParsers: {}
        },
        dr[rs.PlayButton] = {
            component: tt(Sl),
            propParsers: {}
        },
        dr[rs.HeroUnit] = {
            component: tt(lt),
            propParsers: {
                backgroundComponent: et.parseUiComponent,
                bottomRowComponent: et.parseUiComponent,
                ctaButtonComponent: et.parseUiComponent,
                headerComponent: et.parseUiComponent,
                onActivated: et.parseCallback,
                overlayComponent: et.parseUiComponent,
                asset: et.parseHeroUnitAsset,
                gradient: et.parseGradient,
                foregroundImage: et.parseAssetUrlIntoComponent,
                backgroundImage: et.parseAssetUrlIntoComponent
            }
        },
        dr[rs.TextIconRow] = {
            component: tt(Yn),
            propParsers: {
                anchorPoint: et.parseVector2,
                automaticSize: et.parseAutomaticSize,
                size: et.parseUDim2,
                position: et.parseUDim2,
                onActivated: et.parseCallback,
                textColor: et.parseColorValue,
                fontStyle: et.parseFoundationTypographyToken,
                gap: et.parseFoundationNumberToken,
                icon: et.parseIcon,
                iconWidth: et.parseFoundationNumberToken,
                iconColor: et.parseColorValue
            }
        },
        dr[rs.TileFooter] = {
            component: tt(Vl),
            propParsers: {
                onActivated: et.parseCallback,
                textColor: et.parseColorValue,
                fontStyle: et.parseFoundationTypographyToken,
                gap: et.parseFoundationNumberToken,
                leftIcon: et.parseIcon,
                leftIconComponent: et.parseUiComponent,
                rightIcon: et.parseIcon,
                rightIconComponent: et.parseUiComponent
            }
        },
        dr[rs.GameTileActiveFriendsFooter] = {
            component: tt(ql),
            propParsers: {
                iconWidth: et.parseFoundationNumberToken,
                onActivated: et.parseCallback
            }
        },
        dr[rs.Tile] = {
            component: tt(tl),
            propParsers: {
                image: et.parseAssetUrlIntoComponent,
                imageComponent: et.parseUiComponent,
                thumbnailOverlayComponent: et.parseUiComponent,
                onActivated: et.parseCallback,
                titleColor: et.parseColorValue,
                titleFont: et.parseFoundationTypographyToken,
                titleComponent: et.parseUiComponent,
                containmentPadding: et.parseFoundationNumberToken,
                cornerRadius: et.parseFoundationNumberToken,
                footerComponent: et.parseUiComponent,
                ctaButtonComponent: et.parseUiComponent
            }
        },
        dr[rs.GameTile] = {
            component: tt(fr),
            propParsers: {
                image: et.parseAssetUrlIntoComponent,
                imageComponent: et.parseUiComponent,
                thumbnailOverlayComponent: et.parseUiComponent,
                onActivated: et.parseCallback,
                titleColor: et.parseColorValue,
                titleFont: et.parseFoundationTypographyToken,
                titleComponent: et.parseUiComponent,
                containmentPadding: et.parseFoundationNumberToken,
                cornerRadius: et.parseFoundationNumberToken,
                footerComponent: et.parseUiComponent,
                ctaButtonComponent: et.parseUiComponent
            }
        },
        dr[rs.SectionHeader] = {
            component: tt(Cl),
            propParsers: {
                anchorPoint: et.parseVector2,
                automaticSize: et.parseAutomaticSize,
                size: et.parseUDim2,
                position: et.parseUDim2,
                onTitleActivated: et.parseCallback,
                titleColor: et.parseColorValue,
                titleFontStyle: et.parseFoundationTypographyToken,
                titleGap: et.parseFoundationNumberToken,
                titleIcon: et.parseIcon,
                titleIconWidth: et.parseFoundationNumberToken,
                titleComponent: et.parseUiComponent,
                onSubtitleActivated: et.parseCallback,
                subtitleColor: et.parseColorValue,
                subtitleFontStyle: et.parseFoundationTypographyToken,
                subtitleGap: et.parseFoundationNumberToken,
                subtitleIcon: et.parseIcon,
                subtitleIconWidth: et.parseFoundationNumberToken,
                subtitleComponent: et.parseUiComponent,
                verticalGap: et.parseFoundationNumberToken,
                onInfoIconActivated: et.parseCallback,
                iconComponent: et.parseUiComponent
            }
        },
        dr[rs.SlotOverlay] = {
            component: tt(os),
            propParsers: {
                anchorPoint: et.parseVector2,
                automaticSize: et.parseAutomaticSize,
                size: et.parseUDim2,
                position: et.parseUDim2,
                topLeftSlot: et.parseUiComponent,
                topMiddleSlot: et.parseUiComponent,
                topRightSlot: et.parseUiComponent,
                centerLeftSlot: et.parseUiComponent,
                centerMiddleSlot: et.parseUiComponent,
                centerRightSlot: et.parseUiComponent,
                bottomLeftSlot: et.parseUiComponent,
                bottomMiddleSlot: et.parseUiComponent,
                bottomRightSlot: et.parseUiComponent,
                padding: et.parseFoundationNumberToken
            }
        },
        dr[rs.CollectionCarousel] = {
            component: tt(bl),
            propParsers: {
                layoutOverrides: {
                    columnGap: et.parseFoundationNumberToken,
                    sideMargin: et.parseFoundationNumberToken
                },
                onScrollToEnd: et.parseCallback,
                headerComponent: et.parseUiComponent
            }
        },
        dr[rs.ImageWithGradient] = {
            component: tt(function(e) {
                var t = e.image
                  , n = e.imageWindowHeight
                  , r = e.imageAspectRatio
                  , o = e.gradient
                  , e = e.borderRadius
                  , r = $r({
                    imageWindowHeight: n,
                    borderRadius: void 0 === e ? 0 : e,
                    imageAspectRatio: r
                }).classes;
                return K.createElement("div", {
                    className: r.imageWithGradientWindow,
                    "data-testid": "image-with-gradient-window"
                }, K.createElement("div", {
                    className: r.imageContainer,
                    "data-testid": "image-container"
                }, t), o && K.createElement(Dr, {
                    gradient: o
                }))
            }),
            propParsers: {
                image: et.parseAssetUrlIntoComponent,
                gradient: et.parseGradient
            }
        },
        dr), bs = function(e) {
            return ys[e] ? ys[e].component : null
        }, Is = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }, Ss = Is.High, Cs = function(e, n) {
            if (!e)
                return {};
            e = e.find(function(e) {
                e = e.conditions;
                return !e || Object.entries(e).every(function(e) {
                    var t = e[0]
                      , e = e[1];
                    return us(t, e, n)
                })
            });
            return e ? e.overrides : {}
        }, ws = Object.keys(xl), Es = Object.keys(Pl), Ps = function() {
            return (Ps = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, xs = function(e) {
            var t = e.componentConfig
              , n = e.parentAnalyticsContext
              , r = e.sduiContext
              , o = e.localAnalyticsData
              , i = e.extraLocalProps
              , a = (0,
            K.useMemo)(function() {
                return t.templateKey ? r.templateRegistry.resolveTemplateForConfig(t) : t
            }, [t, r]);
            return (0,
            K.useMemo)(function() {
                if (!kl(a))
                    return ol(za.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(a) + " to build React props and children"),
                    X().createElement(X().Fragment, null);
                var e = a.componentType
                  , t = bs(e);
                return t ? a.conditionalProps ? X().createElement(vs, {
                    wrappedComponent: t,
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : a.responsiveProps ? X().createElement(cs, {
                    wrappedComponent: t,
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : X().createElement(t, {
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : (ol(za.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(a)),
                X().createElement(X().Fragment, null))
            }, [a, n, r, o, i])
        }, et = (hs = function(e, t) {
            return (hs = Object.setPrototypeOf || {
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
            hs(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        function Ts(e) {
            e = gs.call(this, e) || this;
            return e.state = {
                hasError: !1
            },
            e
        }
        function _s(e) {
            var n = {};
            return Object.values(e).forEach(function(e) {
                var t;
                void 0 !== (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) && (null === (t = e.presence) || void 0 === t ? void 0 : t.userPresenceType) === T.Presence.PresenceTypes.InGame && (n[e.presence.universeId] || (n[e.presence.universeId] = []),
                n[e.presence.universeId].push({
                    userId: e.id,
                    displayName: e.displayName
                }))
            }),
            n
        }
        function Os(e) {
            var n = e.sort
              , r = e.sduiRoot
              , o = e.currentPage
              , i = fn()
              , a = Gs(null == r ? void 0 : r.templates)
              , t = (0,
            K.useMemo)(function() {
                var e = Ol(r, n.feedItemKey);
                if (!e)
                    return X().createElement(X().Fragment, null);
                var t = js({}, Ya(i, o));
                return X().createElement("div", {
                    className: "sdui-feed-item-container"
                }, X().createElement(xs, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: t,
                    sduiContext: a
                }))
            }, [n, r, i, o, a])
              , e = (0,
            K.useCallback)(function(e, t) {
                ol(za.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(n) + " and sdui root " + JSON.stringify(r) + " with error message " + e + " and callstack " + t)
            }, [n, r]);
            return X().createElement(Ns, {
                fallback: X().createElement(X().Fragment, null),
                logError: e
            }, t)
        }
        function ks(e) {
            var t = e.sort
              , n = (e.positionId,
            e.currentPage)
              , r = (0,
            p.useTokens)()
              , o = Gs(void 0)
              , i = fn()
              , a = (0,
            K.useMemo)(function() {
                return Ya(i, n)
            }, [i, n])
              , l = (0,
            K.useMemo)(function() {
                return t.songs.map(function(e) {
                    return {
                        componentType: rs.Tile,
                        analyticsData: {
                            id: e.assetId
                        },
                        props: {
                            imageAspectRatio: 1,
                            titleText: e.title,
                            image: "rbxthumb://type=Asset&id=" + e.albumArtAssetId + "&w=150&h=150",
                            footerComponent: {
                                componentType: rs.TileFooter,
                                props: {
                                    leftText: e.artist
                                }
                            }
                        }
                    }
                })
            }, [t.songs])
              , e = (0,
            K.useMemo)(function() {
                var e;
                return {
                    componentType: rs.CollectionCarousel,
                    props: {
                        items: l,
                        layoutOverrides: {
                            sideMargin: r.Gap.XLarge
                        },
                        scrollingEnabledOverride: !0,
                        collectionItemSize: "Small",
                        headerComponent: {
                            componentType: rs.SectionHeader,
                            props: {
                                titleText: t.topic,
                                titleGap: r.Gap.XSmall,
                                subtitleText: t.subtitle,
                                titleIcon: "icons/navigation/pushRight_small",
                                infoText: null === (e = t.topicLayoutData) || void 0 === e ? void 0 : e.infoText
                            }
                        }
                    }
                }
            }, [l, t.subtitle, t.topic, null === (e = t.topicLayoutData) || void 0 === e ? void 0 : e.infoText, r.Gap.XLarge, r.Gap.XSmall]);
            return 0 === l.length ? null : X().createElement(xs, {
                componentConfig: e,
                parentAnalyticsContext: {},
                localAnalyticsData: a,
                sduiContext: o
            })
        }
        var Ns = (gs = X().Component,
        et(Ts, gs),
        Ts.getDerivedStateFromError = function() {
            return {
                hasError: !0
            }
        }
        ,
        Ts.prototype.componentDidCatch = function(e, t) {
            e = e.message,
            t = t.componentStack;
            (0,
            this.props.logError)(e, t)
        }
        ,
        Ts.prototype.render = function() {
            var e = this.state.hasError
              , t = this.props
              , n = t.fallback
              , t = t.children;
            return e ? n : t
        }
        ,
        Ts)
          , As = function() {
            return (As = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Rs = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , Ls = function(e) {
            var i = (0,
            K.useMemo)(function() {
                var n = new Map;
                return e && Object.entries(e).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n.set(t, e)
                }),
                n
            }, [e])
              , a = (0,
            K.useCallback)(function(e, t) {
                var n = e.templateKey;
                if (!n)
                    return e;
                var r = (0,
                fi.cloneDeep)(e);
                if (t && t[n])
                    return ol(za.TemplateResolutionCircularReference, "Circular reference detected for template key: " + n),
                    r.templateKey = void 0,
                    r;
                var o = t || {};
                o[n] = !0;
                t = i.get(n);
                if (!t)
                    return ol(za.TemplateResolutionTemplateNotFound, "Template not found for template key: " + n + " with config: " + JSON.stringify(e)),
                    r.templateKey = void 0,
                    r;
                t = a(t, o);
                if (r.templateKey = void 0,
                e.componentType) {
                    if (e.componentType && t.componentType && e.componentType !== t.componentType)
                        return ol(za.TemplateResolutionComponentTypeMismatch, "Component type mismatch for template key: " + n + ". Template type: " + t.componentType + ", Config type: " + e.componentType),
                        r
                } else
                    r.componentType = t.componentType;
                return t.analyticsData && (r.analyticsData = As(As({}, t.analyticsData), e.analyticsData)),
                t.props && (r.props = null !== (o = t.props,
                n = e.props,
                n = o ? (0,
                fi.merge)((0,
                fi.cloneDeep)(o), n) : (0,
                fi.cloneDeep)(n)) && void 0 !== n ? n : {}),
                t.children && (r.children = Rs(Rs([], t.children), e.children || [])),
                r
            }, [i]);
            return (0,
            K.useMemo)(function() {
                return {
                    resolveTemplateForConfig: a
                }
            }, [a])
        }
          , Ds = function() {
            return (Ds = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ms = function(e, a, l, s) {
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
          , Fs = function(n, r) {
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
          , Us = function() {
            var e = (0,
            K.useState)({})
              , t = e[0]
              , i = e[1]
              , a = (0,
            K.useRef)({})
              , l = (0,
            K.useCallback)(function(e) {
                var t, n, r;
                "Roblox.Presence.Update" === (t = e).type && "detail"in t && e.detail && a.current ? (n = (0,
                fi.cloneDeep)(a.current),
                e.detail.forEach(function(e) {
                    n[e.userId] && (n[e.userId] = Ds(Ds({}, n[e.userId]), {
                        presence: e
                    }))
                }),
                a.current = n,
                r = _s(n),
                i(function(e) {
                    return (0,
                    fi.isEqual)(r, e) ? e : r
                })) : ol(za.InvalidPresenceUpdateEvent, "Invalid presence update event, event is " + JSON.stringify(e) + " and friends details are " + JSON.stringify(a.current))
            }, [a]);
            return (0,
            K.useEffect)(function() {
                var e = _e.deviceMeta.getDeviceMeta();
                if ((null == e ? void 0 : e.deviceType) === _e.deviceMeta.DeviceTypes.computer && null !== T.CurrentUser && void 0 !== T.CurrentUser && T.CurrentUser.isAuthenticated)
                    return Ms(void 0, void 0, Promise, function() {
                        var t, n, r, o;
                        return Fs(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return e.trys.push([0, 3, , 4]),
                                [4, Fe()];
                            case 1:
                                return n = e.sent(),
                                t = n.userData || [],
                                (n = t.map(function(e) {
                                    return e.id
                                })) ? [4, ve(n)] : [2];
                            case 2:
                                return o = e.sent(),
                                r = o.profileDetails || [],
                                o = t.reduce(function(e, t) {
                                    var n = r.find(function(e) {
                                        return e.userId === t.id
                                    });
                                    return n && n.names && (e[t.id] = Ds(Ds({}, t), {
                                        displayName: n.names.combinedName,
                                        name: n.names.username
                                    })),
                                    e
                                }, {}),
                                a.current = o,
                                o = _s(o),
                                i(o),
                                document.addEventListener("Roblox.Presence.Update", l),
                                [3, 4];
                            case 3:
                                return o = e.sent(),
                                ol(za.FriendsPresenceFetchFailure, "Failed to get friends details info, error is " + JSON.stringify(o)),
                                [3, 4];
                            case 4:
                                return [2]
                            }
                        })
                    }).catch(function() {}),
                    function() {
                        document.removeEventListener("Roblox.Presence.Update", l)
                    }
            }, [l]),
            (0,
            K.useMemo)(function() {
                return {
                    inGameFriendsByUniverseId: t
                }
            }, [t])
        }
          , Bs = function() {
            var e = Us();
            return (0,
            K.useMemo)(function() {
                return {
                    social: e
                }
            }, [e])
        }
          , Gs = function(e) {
            var t = (0,
            p.useTokens)()
              , n = Ls(e)
              , r = Bs()
              , o = (0,
            K.useMemo)(function() {
                return {
                    tokens: t
                }
            }, [t]);
            return (0,
            K.useMemo)(function() {
                return {
                    dependencies: o,
                    templateRegistry: n,
                    dataStore: r
                }
            }, [o, n, r])
        }
          , js = function() {
            return (js = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Hs() {
            return X().createElement("div", {
                className: "grid-item-container game-card-container game-card-loading"
            }, X().createElement("div", {
                className: "game-card-thumb-container shimmer"
            }), X().createElement("div", {
                className: "game-card-name game-name-title shimmer"
            }), X().createElement("div", {
                className: "game-card-name game-name-title game-name-title-half shimmer"
            }))
        }
        function zs(o) {
            var i = fn();
            (0,
            K.useEffect)(function() {
                var t = window.scrollY
                  , e = Ie(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    po({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: S.Vertical,
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
        (dr = function(e) {
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
              , m = e.isNewSortHeaderEnabled
              , v = e.sduiRoot
              , h = e.fetchGamesPageData;
            switch (n.treatmentType) {
            case w.Carousel:
                return X().createElement(Ko, {
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
                    isNewSortHeaderEnabled: m,
                    isNewScrollArrowsEnabled: p
                });
            case w.AvatarCarousel:
                return X().createElement(Jo, {
                    sort: n
                });
            case w.SortlessGrid:
                return X().createElement(di, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: i,
                    startingRow: a,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c,
                    isNewSortHeaderEnabled: m
                });
            case w.FriendCarousel:
                return X().createElement(Da, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case w.SongCarousel:
                return X().createElement(ks, {
                    sort: n,
                    positionId: r,
                    currentPage: o
                });
            case w.Pills:
                return X().createElement(Wa, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: h
                });
            case w.Sdui:
                return X().createElement(Os, {
                    sort: n,
                    sduiRoot: v,
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
            isNewScrollArrowsEnabled: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var Ws = dr
          , Vs = function(e, o, r) {
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
                fi.isEqual)(s, l) && (0,
                fi.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
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
                            P.fireEvent)(Je.missingNumberOfRowsForLoggingErrorEvent),
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
                        var a = n ? (r ? Pt : Et)[n] : xt;
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
          , qs = function() {
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
          , et = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , Js = (T.EnvironmentUrls.apiGatewayUrl,
        T.EnvironmentUrls.voiceApi);
        function $s(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var Ks = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(Js, "/v1/settings/user-opt-in")
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
                        $s(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        $s(r, t, n, o, i, "throw", e)
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
        function Xs(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ys(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Zs(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ys(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ys(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function Qs(e, n) {
            switch (e) {
            case "ContactMethodEmail":
                return {
                    primaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    }
                };
            case "ContactMethodPhoneNumber":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberVoiceOptIn":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: function(e) {
                            return null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderPhoneUpsell(Zs({
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
                                                Ks(!0, !1);
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
                                            Xs(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            Xs(r, t, n, o, i, "throw", e)
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
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: au
                };
            case "ContactMethodPhoneNumberEmailVerticalLayout":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmailAddress",
                        onClick: null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: iu
                };
            case "FacebookSunset":
                return {
                    primaryButton: {
                        text: "Action.SetPassword",
                        onClick: null === T.FacebookSunsetService || void 0 === T.FacebookSunsetService ? void 0 : T.FacebookSunsetService.openFacebookSunsetModal,
                        buttonClickBtnLog: "setPassword"
                    }
                };
            default:
                return null
            }
        }
        var eu = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , tu = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , nu = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , ru = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , ou = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , iu = "vertical"
          , au = "horizontal"
          , lu = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function su(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function uu(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? su(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : su(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function cu(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            x.eventStreamService.sendEventWithTarget(e.type, ru[n], uu(uu({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var dr = x.eventStreamService.eventTypes
          , du = "mandatory"
          , fu = "homepage"
          , pu = {
            cardShown: {
                name: "cardShown",
                type: dr.modalAction,
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
        function mu(e, t) {
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
                    return vu(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return vu(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function vu(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function hu(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = mu((0,
            K.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = ou[n];
            (0,
            K.useEffect)(function() {
                cu(pu.cardShown, r, n, c)
            }, []);
            var e = Qs(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? X().createElement(ye.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    cu(pu.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , a = f ? X().createElement(ye.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    cu(pu.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : au
              , a = X().createElement("div", {
                className: e === au ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = gu(o) ? t(tu[n]) : o
              , i = gu(i) ? t(nu[n]) : i
              , o = X().createElement("div", {
                className: "upsell-card-text-content-group"
            }, tu[n] ? X().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, X().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = lu[n] ? X().createElement("div", {
                className: "home-page-upsell-card-image ".concat(lu[n])
            }) : null;
            return s ? null : X().createElement("div", {
                className: "home-page-upsell-card-banner-container"
            }, X().createElement("div", {
                className: "banner-contents"
            }, X().createElement("div", {
                className: "icon-and-text"
            }, i, X().createElement("div", {
                className: "banner-content-container"
            }, o)), X().createElement("div", {
                className: "add-email-btn-container"
            }, a), X().createElement("div", {
                id: "facebookSunsetModal-container"
            })))
        }
        function gu(e) {
            return !e || 0 === e.length
        }
        hu.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        hu.propTypes = {
            translate: oe().func.isRequired,
            cardType: oe().string.isRequired,
            titleTextOverride: oe().string,
            bodyTextOverride: oe().string,
            origin: oe().string,
            requireExplicitVoiceConsent: oe().bool
        };
        var yu = hu
          , bu = function(e) {
            return !![eu.ContactMethodEmail, eu.ContactMethodPhoneNumber, eu.ContactMethodPhoneNumberEmailHorizontalLayout, eu.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, eu.ContactMethodPhoneNumberEmailVerticalLayout, eu.ContactMethodPhoneNumberVoiceOptIn, eu.FacebookSunset].includes(e)
        };
        function Iu(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Su(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        Iu(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Iu(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function Cu(e, t) {
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
                    return wu(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return wu(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function wu(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Eu(e) {
            var t = e.translate
              , n = eu.ContactMethodMandatoryEmailPhone
              , r = Cu((0,
            K.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = Cu((0,
            K.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = Cu((0,
            K.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = Cu((0,
            K.useState)(!1), 2)
              , e = a[0]
              , c = a[1]
              , a = Cu((0,
            K.useState)(!1), 2);
            a[0],
            a[1];
            return (0,
            K.useEffect)(function() {
                var e = function() {
                    var e = Su(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    T.HomePageUpsellCardService.getHomePageUpsellCardVariation();
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
                    var e = Su(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    T.HomePageUpsellCardService.getVoicePolicy();
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
                o === n && null !== T.UpsellService && void 0 !== T.UpsellService && T.UpsellService.renderContactMethodPromptModal({
                    origin: fu,
                    section: du
                })
            }, [o]),
            bu(o) ? X().createElement(yu, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        Eu.propTypes = {
            translate: oe().func.isRequired
        };
        var Pu = Eu;
        function xu(e) {
            var t = e.translate
              , e = e.context;
            return X().createElement(Pu, {
                translate: t,
                context: e
            })
        }
        function Tu(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            K.useRef)(null), u = (0,
            K.useRef)(null), c = Go().contentMetadata, d = (0,
            K.useMemo)(function() {
                return vo(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
            K.useCallback)(function(t) {
                var e = null == d ? void 0 : d.findIndex(function(e) {
                    return e.universeId === t
                });
                if (void 0 !== e && -1 !== e) {
                    var n, r = d[e];
                    return (n = {})[R.ButtonName] = y.Interested,
                    n[R.PlaceId] = r.placeId,
                    n[R.UniverseId] = t,
                    n[R.Position] = e,
                    n[R.GameSetTypeId] = o.topicId,
                    n[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[R.Page] = Y.InterestCatcher,
                    n[F.HomePageSessionInfo] = a,
                    n[R.IsInterested] = !i.has(t),
                    n
                }
            }, [i, d, a, o.topicId]), p = (0,
            K.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && x.eventStreamService.sendEvent.apply(x.eventStreamService, e)
            }, [r, f]), e = (0,
            K.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return Ru(Ru(Ru(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), W(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), q(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[R.AbsPositions] = t,
                    e[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[R.GameSetTypeId] = o.topicId,
                    e[R.Page] = Y.InterestCatcher,
                    e[F.HomePageSessionInfo] = a,
                    e))
                }
            }, [d, a, o.topicId, null === (t = null == o ? void 0 : o.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return mn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            K.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            X().createElement(li, {
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
        function _u(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            K.useState)(new Set))[0]
              , a = f[1]
              , l = fn()
              , s = (0,
            K.useCallback)(function(e) {
                var t = {};
                return t[R.ButtonName] = e,
                t[F.HomePageSessionInfo] = l,
                t[R.InterestedUniverseIds] = Array.from(i),
                t[R.Page] = Y.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            K.useCallback)(function(e) {
                e = s(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && x.eventStreamService.sendEvent.apply(x.eventStreamService, e)
            }, [s])
              , c = (0,
            K.useCallback)(function() {
                r([]),
                u(y.Skip)
            }, [r, u])
              , d = (0,
            K.useCallback)(function() {
                r(Array.from(i)),
                u(y.Continue)
            }, [i, r, u])
              , e = (0,
            K.useMemo)(function() {
                return null != i && i.size ? o(it.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(it.ActionInterestCatcherContinue)
            }, [i, o])
              , f = (0,
            K.useCallback)(function(e) {
                var t, n;
                null === e || void 0 === (null === (n = e.getBoundingClientRect()) || void 0 === n ? void 0 : n.top) || (n = document.getElementById("header")) && null !== (t = n.getBoundingClientRect()) && void 0 !== t && t.height && (n = n.getBoundingClientRect().height,
                window.scrollTo({
                    top: e.getBoundingClientRect().top + window.scrollY - n
                }))
            }, []);
            return X().createElement("div", {
                ref: f,
                className: "interest-catcher-container",
                "data-testid": "interest-catcher-container"
            }, X().createElement("div", {
                className: "header-container"
            }, X().createElement("div", {
                className: "header-text-container"
            }, X().createElement("h1", {
                className: "header-text"
            }, t.topic), X().createElement("span", {
                className: "header-subtext"
            }, t.subtitle)), X().createElement("div", {
                className: "header-buttons-container"
            }, !(null != i && i.size) && X().createElement(ye.Button, {
                variant: ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                title: o(it.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, o(it.ActionInterestCatcherSkip)), X().createElement(ye.Button, {
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != i && i.size),
                className: "continue-button"
            }, e))), X().createElement(Tu, {
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
        function Ou(e) {
            var t = e.children
              , n = (0,
            K.useState)(null)
              , e = n[0]
              , r = n[1];
            return (0,
            K.useEffect)(function() {
                Hu().then(function(e) {
                    null != (null == e ? void 0 : e.data) && r(e.data)
                }, function(e) {
                    console.error(e)
                })
            }, []),
            X().createElement(zu.Provider, {
                value: e
            }, t)
        }
        xu.defaultProps = {
            context: eu.ContactMethod
        },
        xu.propTypes = {
            translate: oe().func.isRequired,
            context: oe().string
        };
        var ku, Nu, Au = (0,
        p.withTranslations)(xu, et), Ru = function() {
            return (Ru = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Lu = function() {
            return (Lu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Du = Je.maxTilesPerCarouselPage, Mu = n, Fu = t, Uu = (ku = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = fn()
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
                return qs()
            }, [])
              , c = (0,
            K.useMemo)(function() {
                try {
                    return (0,
                    x.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            K.useCallback)(function(e) {
                i(void 0),
                s(!1),
                pe(Ce.Home, t, u, c, e, [E.Carousel, E.HeroUnit]).then(function(e) {
                    i(e),
                    (0,
                    P.fireEvent)(Je.omniRecommendationEndpointSuccessEvent)
                }).catch(function() {
                    s(!0),
                    (0,
                    P.fireEvent)(Je.omniRecommendationEndpointErrorEvent)
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
                fe(Mu.homePageWeb, Fu.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(Fu.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , r = (0,
            K.useState)(void 0)
              , a = r[0]
              , v = r[1];
            (0,
            K.useEffect)(function() {
                fe(Mu.gridUi, Fu.gridUi).then(function(e) {
                    v(e)
                }).catch(function() {
                    v(Fu.gridUi)
                })
            }, []);
            var h = null == a ? void 0 : a.IsNewSortHeaderEnabled
              , g = null == a ? void 0 : a.IsCarouselHorizontalScrollEnabled
              , y = null == a ? void 0 : a.IsNewScrollArrowsEnabled
              , f = (0,
            K.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && Lu(Lu({}, e), {
                        contentMetadata: ((t = {})[C.Game] = Lu(Lu({}, e.contentMetadata[C.Game]), n[C.Game]),
                        t[C.CatalogAsset] = Lu(Lu({}, e.contentMetadata[C.CatalogAsset]), n[C.CatalogAsset]),
                        t[C.CatalogBundle] = Lu(Lu({}, e.contentMetadata[C.CatalogBundle]), n[C.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , e = Vs(o, m, g)
              , r = e.homeFeedRef
              , b = e.gridRecommendationsMap
              , I = e.itemsPerRowMap
              , S = e.startingRowNumbersMap;
            zs(Y.HomePage);
            a = (0,
            K.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== w.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            e = (0,
            K.useMemo)(function() {
                return null == o ? void 0 : o.sorts.findIndex(function(e) {
                    return e.treatmentType === w.InterestGrid
                })
            }, [null == o ? void 0 : o.sorts]);
            if (l)
                return X().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, X().createElement("h2", null, n(rt.LabelGames)), X().createElement(Pe, {
                    errorMessage: n(rt.LabelApiError),
                    onRefresh: function() {
                        return d()
                    }
                }));
            if (void 0 === o)
                return X().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, X().createElement("div", {
                    className: "game-home-page-loading-title shimmer"
                }), X().createElement("div", {
                    className: "game-home-page-loading-carousel"
                }, Array.from({
                    length: Du
                }, function(e, t) {
                    return X().createElement(Hs, {
                        key: t
                    })
                })));
            if (void 0 !== e && -1 < e) {
                l = o.sorts[e];
                if (l && ho(l))
                    return X().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, X().createElement("div", {
                        ref: r
                    }, X().createElement(jo.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: f
                        }
                    }, X().createElement(_u, {
                        sort: l,
                        itemsPerRow: I.get(e),
                        fetchRecommendations: d,
                        translate: n
                    }))))
            }
            return X().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, X().createElement("div", {
                ref: r
            }, X().createElement(jo.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: f
                }
            }, X().createElement(Au, {
                translate: n,
                context: void 0
            }), a && X().createElement(La, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return X().createElement(X().Fragment, {
                    key: t
                }, X().createElement(Ws, {
                    translate: n,
                    sort: e,
                    positionId: t,
                    startingRow: S.get(t),
                    currentPage: Y.HomePage,
                    itemsPerRow: I.get(t),
                    gridRecommendations: null !== (t = b.get(t)) && void 0 !== t ? t : [],
                    isExpandHomeContentEnabled: m,
                    isCarouselHorizontalScrollEnabled: g,
                    isNewScrollArrowsEnabled: y,
                    isNewSortHeaderEnabled: h,
                    sduiRoot: o.sdui
                }))
            }))))
        }, te),
        function(e) {
            return X().createElement(dn, null, X().createElement(ku, vn({}, e)))
        }
        ), Bu = function(e, a, l, s) {
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
        }, Gu = function(n, r) {
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
        }, ju = T.EnvironmentUrls.userModerationApi + "/v1/reminder", Hu = function() {
            return Bu(void 0, void 0, Promise, function() {
                var t;
                return Gu(this, function(e) {
                    return t = {
                        url: ju,
                        withCredentials: !0
                    },
                    [2, N.httpService.get(t)]
                })
            })
        }, zu = (0,
        K.createContext)(null), Wu = {
            common: [],
            feature: "Feature.Home"
        }, Vu = function(e, t) {
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
        function qu() {
            var e = (s = (0,
            K.useState)(!1))[0]
              , t = s[1]
              , n = (0,
            K.useContext)(zu)
              , r = (0,
            K.useRef)(0)
              , o = T.CurrentUser.userId;
            (0,
            K.useEffect)(function() {
                r.current = Date.now()
            }, []);
            var i = (0,
            p.useTranslation)().translate;
            if (null == n || null == n || !n.shouldSurfaceReminder || null == n || !n.policyViolation)
                return null;
            var a = n.interventionId
              , l = !e && (null == n ? void 0 : n.shouldSurfaceReminder)
              , s = (u = Vu(n, i)).dialogTitle
              , e = u.dialogBodyAbuseType
              , i = u.dialogBodyGuidelineReminder
              , u = u.confirmationButtonLabel;
            return X().createElement(ye.Modal, {
                className: "reminder-of-norms-dialog-modal",
                show: l,
                onHide: function() {
                    var e = Date.now();
                    Ju(a, Nu.DISMISSED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, X().createElement(ye.Modal.Header, {
                className: "reminder-of-norms-dialog-title",
                title: s,
                showCloseButton: !1
            }), X().createElement(ye.Modal.Body, {
                className: "reminder-of-norms-dialog-body"
            }, X().createElement("p", {
                className: "dialog-body-abuse-type"
            }, e), X().createElement("p", {
                className: "dialog-body-guideline-reminder"
            }, i)), X().createElement(ye.Modal.Footer, null, X().createElement(ye.Button, {
                className: "reminder-of-norms-confirm-button",
                onClick: function() {
                    var e = Date.now();
                    Ju(a, Nu.CTA_CLICKED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, u)))
        }
        (te = Nu = Nu || {}).CTA_CLICKED = "REMINDER_INTERACTION_CTA_CLICKED",
        te.DISMISSED = "REMINDER_INTERACTION_REMINDER_DISMISSED";
        var Ju = function(e, t, n, r, o, i, a) {
            T.EventStream.SendEventWithTarget("HomePageRemindersEvent", "WebApp", {
                user_id: r,
                source_intervention_id: e,
                reminder_number: n,
                timestamp_milliseconds: o,
                time_to_interact_seconds: i,
                interaction: t,
                platform: "PLATFORM_WEB",
                experiment_variant: a
            }, T.EventStream.TargetTypes.WWW)
        };
        function $u() {
            return X().createElement(p.TranslationProvider, {
                config: Wu
            }, X().createElement(Ou, null, X().createElement(qu, null)))
        }
        var Ku = (0,
        p.withTranslations)(function(e) {
            e = e.translate;
            return X().createElement("div", {
                id: "HomeContainer",
                className: "row home-container expand-max-width"
            }, X().createElement("div", {
                className: "section"
            }, X().createElement("div", {
                className: "col-xs-12 container-header"
            }, X().createElement("h1", null, e(ot.LabelsHome)))), X().createElement("div", null, X().createElement($u, null)), X().createElement("div", {
                className: "place-list-container"
            }, X().createElement(Uu, null)))
        }, {
            common: [],
            feature: "CommonUI.Features"
        });
        (0,
        N.ready)(function() {
            c() ? (0,
            e.render)(X().createElement(Uu, null), c()) : document.getElementById("places-list-web-app") && document.getElementById("content") ? (0,
            e.render)(X().createElement(Ku, null), document.getElementById("content")) : (0,
            P.fireEvent)("HomePageMissingContainerDiv")
        })
    }()
}();
//# sourceMappingURL=https://sourcemaps.rbxcdn.com/bc0577a890785c30a551416ffbf311a6-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
