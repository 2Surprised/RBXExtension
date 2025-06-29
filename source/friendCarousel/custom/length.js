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
        5250: function(_, A, N) {
            var R;
            /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
            _ = N.nmd(_),
            function() {
                var ji, zi = "Expected a function", Wi = "__lodash_hash_undefined__", Vi = "__lodash_placeholder__", qi = 128, Ji = 9007199254740991, Ki = NaN, $i = 4294967295, Xi = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Yi = "[object Arguments]", Zi = "[object Array]", Qi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", va = "[object Float32Array]", ha = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", Ia = "[object Uint8Array]", Sa = "[object Uint8ClampedArray]", Ca = "[object Uint16Array]", wa = "[object Uint32Array]", Ea = /\b__p \+= '';/g, Pa = /\b(__p \+=) '' \+/g, xa = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ta = /&(?:amp|lt|gt|quot|#39);/g, ka = /[&<>"']/g, Oa = RegExp(Ta.source), _a = RegExp(ka.source), Aa = /<%-([\s\S]+?)%>/g, Na = /<%([\s\S]+?)%>/g, Ra = /<%=([\s\S]+?)%>/g, La = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Da = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fa = /[\\^$.*+?()[\]{}|]/g, Ua = RegExp(Fa.source), Ba = /^\s+/, n = /\s/, Ga = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ha = /\{\n\/\* \[wrapped with (.+)\] \*/, ja = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Wa = /[()=,{}\[\]\/\s]/, Va = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ja = /\w*$/, Ka = /^[-+]0x[0-9a-f]+$/i, $a = /^0b[01]+$/i, Xa = /^\[object .+?Constructor\]$/, Ya = /^0o[0-7]+$/i, Za = /^(?:0|[1-9]\d*)$/, Qa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", v = "[^" + e + l + f + r + o + i + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "[" + i + "]", S = "\\u200d", C = "(?:" + m + "|" + v + ")", l = "(?:" + I + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + h + ")" + "?", v = "[" + a + "]?", i = v + i + ("(?:" + S + "(?:" + [g, y, b].join("|") + ")" + v + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), w = RegExp(h + "(?=" + h + ")|" + u + i, "g"), ol = RegExp([I + "?" + m + "+" + r + "(?=" + [c, I, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, I + C, "$"].join("|") + ")", I + "?" + C + "+" + r, I + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), E = RegExp("[" + S + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
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
                  , t = "object" == typeof N.g && N.g && N.g.Object === Object && N.g
                  , a = "object" == typeof self && self && self.Object === Object && self
                  , fl = t || a || Function("return this")()
                  , a = A && !A.nodeType && A
                  , x = a && _ && !_.nodeType && _
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
                function kl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r; )
                        o[n] = t(e[n], n, e);
                    return o
                }
                function Ol(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r; )
                        e[o + n] = t[n];
                    return e
                }
                function _l(e, t, n, r) {
                    var o = -1
                      , i = null == e ? 0 : e.length;
                    for (r && i && (n = e[++o]); ++o < i; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Al(e, t, n, r) {
                    var o = null == e ? 0 : e.length;
                    for (r && o && (n = e[--o]); o--; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Nl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
                        if (t(e[n], n, e))
                            return !0;
                    return !1
                }
                var k = Bl("length");
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
                    return n ? Hl(e, t) / n : Ki
                }
                function Bl(t) {
                    return function(e) {
                        return null == e ? ji : e[t]
                    }
                }
                function O(t) {
                    return function(e) {
                        return null == t ? ji : t[e]
                    }
                }
                function Gl(e, r, o, i, t) {
                    return t(e, function(e, t, n) {
                        o = i ? (i = !1,
                        e) : r(o, e, t, n)
                    }),
                    o
                }
                function Hl(e, t) {
                    for (var n, r = -1, o = e.length; ++r < o; ) {
                        var i = t(e[r]);
                        i !== ji && (n = n === ji ? i : n + i)
                    }
                    return n
                }
                function jl(e, t) {
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
                    return kl(e, function(e) {
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
                function Kl(e, t) {
                    for (var n = e.length; n-- && -1 < Dl(t, e[n], 0); )
                        ;
                    return n
                }
                var $l = O({
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
                    : k)(e)
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
                      , S = pl ? t.Buffer : ji
                      , E = t.Symbol
                      , P = t.Uint8Array
                      , x = S ? S.allocUnsafe : ji
                      , T = es(v.getPrototypeOf, v)
                      , k = v.create
                      , O = m.propertyIsEnumerable
                      , _ = i.splice
                      , A = E ? E.isConcatSpreadable : ji
                      , N = E ? E.iterator : ji
                      , R = E ? E.toStringTag : ji
                      , L = function() {
                        try {
                            var e = jn(v, "defineProperty");
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
                      , H = S ? S.isBuffer : ji
                      , j = t.isFinite
                      , z = i.join
                      , W = es(v.keys, v)
                      , V = o.max
                      , q = o.min
                      , J = n.now
                      , K = t.parseInt
                      , $ = o.random
                      , X = i.reverse
                      , Y = jn(t, "DataView")
                      , Z = jn(t, "Map")
                      , Q = jn(t, "Promise")
                      , ee = jn(t, "Set")
                      , te = jn(t, "WeakMap")
                      , ne = jn(v, "create")
                      , re = te && new te
                      , oe = {}
                      , ie = hr(Y)
                      , ae = hr(Z)
                      , le = hr(Q)
                      , se = hr(ee)
                      , ue = hr(te)
                      , ce = E ? E.prototype : ji
                      , de = ce ? ce.valueOf : ji
                      , fe = ce ? ce.toString : ji;
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
                        if (k)
                            return k(e);
                        ve.prototype = e;
                        e = new ve;
                        return ve.prototype = ji,
                        e
                    };
                    function ve() {}
                    function he() {}
                    function ge(e, t) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__chain__ = !!t,
                        this.__index__ = 0,
                        this.__values__ = ji
                    }
                    function ye(e) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__dir__ = 1,
                        this.__filtered__ = !1,
                        this.__iteratees__ = [],
                        this.__takeCount__ = $i,
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
                        var n, r = wo(e), o = !r && Co(e), i = !r && !o && To(e), a = !r && !o && !i && jo(e), l = r || o || i || a, s = l ? jl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || $n(n, u)) || s.push(n);
                        return s
                    }
                    function Pe(e) {
                        var t = e.length;
                        return t ? e[Ct(0, t - 1)] : ji
                    }
                    function xe(e, t) {
                        return dr(rn(e), De(t, 0, e.length))
                    }
                    function Te(e) {
                        return dr(rn(e))
                    }
                    function ke(e, t, n) {
                        (n === ji || bo(e[t], n)) && (n !== ji || t in e) || Re(e, t, n)
                    }
                    function Oe(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== ji || t in e) || Re(e, t, n)
                    }
                    function _e(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Ae(e, r, o, i) {
                        return Ge(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function Ne(e, t) {
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
                            o[n] = i ? ji : ii(e, t[n]);
                        return o
                    }
                    function De(e, t, n) {
                        return e == e && (n !== ji && (e = e <= n ? e : n),
                        t !== ji && (e = t <= e ? e : t)),
                        e
                    }
                    function Me(n, r, o, e, t, i) {
                        var a, l = 1 & r, s = 2 & r, u = 4 & r;
                        if (o && (a = t ? o(n, e, t, i) : o(n)),
                        a !== ji)
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
                                    on(c, Wn(c), d)) : (d = Ne(a, c = n),
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
                        var m = f ? ji : (u ? s ? Dn : Ln : s ? di : ci)(n);
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
                            if (a === ji && !(o in e) || !i(a))
                                return !1
                        }
                        return !0
                    }
                    function Ue(e, t, n) {
                        if ("function" != typeof e)
                            throw new C(zi);
                        return lr(function() {
                            e.apply(ji, n)
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
                        n && (t = kl(t, Wl(n))),
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
                        escape: Aa,
                        evaluate: Na,
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
                            return n === Wi ? ji : n
                        }
                        return y.call(t, e) ? t[e] : ji
                    }
                    ,
                    be.prototype.has = function(e) {
                        var t = this.__data__;
                        return ne ? t[e] !== ji : y.call(t, e)
                    }
                    ,
                    be.prototype.set = function(e, t) {
                        var n = this.__data__;
                        return this.size += this.has(e) ? 0 : 1,
                        n[e] = ne && t === ji ? Wi : t,
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
                        return !((e = _e(t, e)) < 0) && (e == t.length - 1 ? t.pop() : _.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = _e(t, e)) < 0 ? ji : t[e][1]
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return -1 < _e(this.__data__, e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = _e(n, e);
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
                    var Ge = sn(Ke)
                      , He = sn($e, !0);
                    function je(e, r) {
                        var o = !0;
                        return Ge(e, function(e, t, n) {
                            return o = !!r(e, t, n)
                        }),
                        o
                    }
                    function ze(e, t, n) {
                        for (var r = -1, o = e.length; ++r < o; ) {
                            var i, a, l = e[r], s = t(l);
                            null != s && (i === ji ? s == s && !Ho(s) : n(s, i)) && (i = s,
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
                        for (n = n || Kn,
                        o = o || []; ++i < a; ) {
                            var l = e[i];
                            0 < t && n(l) ? 1 < t ? Ve(l, t - 1, n, r, o) : Ol(o, l) : r || (o[o.length] = l)
                        }
                        return o
                    }
                    var qe = un()
                      , Je = un(!0);
                    function Ke(e, t) {
                        return e && qe(e, t, ci)
                    }
                    function $e(e, t) {
                        return e && Je(e, t, ci)
                    }
                    function Xe(t, e) {
                        return Pl(e, function(e) {
                            return _o(t[e])
                        })
                    }
                    function Ye(e, t) {
                        for (var n = 0, r = (t = Jt(t, e)).length; null != e && n < r; )
                            e = e[vr(t[n++])];
                        return n && n == r ? e : ji
                    }
                    function Ze(e, t, n) {
                        t = t(e);
                        return wo(e) ? t : Ol(t, n(e))
                    }
                    function Qe(e) {
                        return null == e ? e === ji ? "[object Undefined]" : "[object Null]" : R && R in v(e) ? function(e) {
                            var t = y.call(e, R)
                              , n = e[R];
                            try {
                                e[R] = ji;
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
                            a && t && (c = kl(c, Wl(t))),
                            s = q(c.length, s),
                            l[a] = !n && (t || 120 <= o && 120 <= c.length) ? new Ce(a && c) : ji
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
                        t = null == (e = or(e, t = Jt(t, e))) ? e : e[vr(kr(t))];
                        return null == t ? ji : Il(t, e, n)
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
                                a || jo(e) ? Nn(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
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
                                        l = Nn(l(e), l(t), r, o, i, a);
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
                                    !(v === ji ? h === g || o(h, g, n, r, i) : v)) {
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
                                if (u === ji && !(s in e))
                                    return !1
                            } else {
                                var d, f = new we;
                                if (r && (d = r(u, c, s, e, t, f)),
                                !(d === ji ? at(c, u, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function st(e) {
                        return !(!Ro(e) || (t = e,
                        u && u in t)) && (_o(e) ? I : Xa).test(hr(e));
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
                        var n = Hn(t);
                        return 1 == n.length && n[0][2] ? nr(n[0][0], n[0][1]) : function(e) {
                            return e === t || lt(e, t, n)
                        }
                    }
                    function vt(n, r) {
                        return Yn(n) && tr(r) ? nr(vr(n), r) : function(e) {
                            var t = ii(e, n);
                            return t === ji && t === r ? ai(e, n) : at(r, t, 3)
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
                                    return ke(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : ji, f = d === ji;
                                f && (c = wo(s),
                                u = !c && To(s),
                                t = !c && !u && jo(s),
                                d = s,
                                c || u || t ? d = wo(l) ? l : xo(l) ? rn(l) : u ? Yt(s, !(f = !1)) : t ? Qt(s, !(f = !1)) : [] : Fo(s) || Co(s) ? Co(d = l) ? d = Xo(l) : Ro(l) && !_o(l) || (d = Jn(s)) : f = !1),
                                f && (a.set(s, d),
                                o(d, s, r, i, a),
                                a.delete(s)),
                                ke(e, n, d)
                            }(r, o, t, i, ht, a, l) : ((n = a ? a(ir(r, t), e, t + "", r, o, l) : ji) === ji && (n = e),
                            ke(r, t, n))
                        }, di)
                    }
                    function gt(e, t) {
                        var n = e.length;
                        if (n)
                            return $n(t += t < 0 ? n : 0, n) ? e[t] : ji
                    }
                    function yt(e, r, n) {
                        r = r.length ? kl(r, function(t) {
                            return wo(t) ? function(e) {
                                return Ye(e, 1 === t.length ? t[0] : t)
                            }
                            : t
                        }) : [Li];
                        var o = -1;
                        return r = kl(r, Wl(Bn())),
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
                        n && (l = kl(e, Wl(n))); ++i < a; )
                            for (var s = 0, u = t[i], c = n ? n(u) : u; -1 < (s = o(l, c, s, r)); )
                                l !== e && _.call(l, s, 1),
                                _.call(e, s, 1);
                        return e
                    }
                    function St(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || ($n(o = i) ? _.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function Ct(e, t) {
                        return e + B($() * (t - e + 1))
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
                            (c = r ? r(s, u, l) : ji) === ji && (c = Ro(s) ? s : $n(t[o + 1]) ? [] : {})),
                            Oe(l, u, c),
                            l = l[u]
                        }
                        return e
                    }
                    var kt = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : Li
                      , Ot = L ? function(e, t) {
                        return L(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Ni(t),
                            writable: !0
                        })
                    }
                    : Li;
                    function _t(e) {
                        return dr(bi(e))
                    }
                    function At(e, t, n) {
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
                    function Nt(e, r) {
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
                                null !== a && !Ho(a) && (n ? a <= t : a < t) ? r = 1 + i : o = i
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
                        for (var a = (t = n(t)) != t, l = null === t, s = Ho(t), u = t === ji; o < i; ) {
                            var c = B((o + i) / 2)
                              , d = n(e[c])
                              , f = d !== ji
                              , p = null === d
                              , m = d == d
                              , v = Ho(d)
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
                        return "number" == typeof e ? e : Ho(e) ? Ki : +e
                    }
                    function Ft(e) {
                        if ("string" == typeof e)
                            return e;
                        if (wo(e))
                            return kl(e, Ft) + "";
                        if (Ho(e))
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
                        return null == (e = or(e, t = Jt(t, e))) || delete e[vr(kr(t))]
                    }
                    function Gt(e, t, n, r) {
                        return Tt(e, t, n(Ye(e, t)), r)
                    }
                    function Ht(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? At(e, r ? 0 : i, r ? i + 1 : o) : At(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function jt(e, t) {
                        return e instanceof ye && (e = e.value()),
                        _l(t, function(e, t) {
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
                            var l = r < i ? t[r] : ji;
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
                    var Kt = Et;
                    function $t(e, t, n) {
                        var r = e.length;
                        return n = n === ji ? r : n,
                        !t && r <= n ? e : At(e, t, n)
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
                            var n = e !== ji
                              , r = null === e
                              , o = e == e
                              , i = Ho(e)
                              , a = t !== ji
                              , l = null === t
                              , s = t == t
                              , u = Ho(t);
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
                              , s = r ? r(n[l], e[l], l, n, e) : ji;
                            s === ji && (s = e[l]),
                            (o ? Re : Oe)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = wo(e) ? Sl : Ae
                              , r = i ? i() : {};
                            return n(e, o, Bn(t, 2), r)
                        }
                    }
                    function ln(l) {
                        return Et(function(e, t) {
                            var n = -1
                              , r = t.length
                              , o = 1 < r ? t[r - 1] : ji
                              , i = 2 < r ? t[2] : ji
                              , o = 3 < l.length && "function" == typeof o ? (r--,
                            o) : ji;
                            for (i && Xn(t[0], t[1], i) && (o = r < 3 ? ji : o,
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
                            var t = Zl(e = Yo(e)) ? os(e) : ji
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? $t(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return _l(_i(Ci(e).replace(nl, "")), t, "")
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
                            return (t -= o.length) < l ? En(i, a, hn, e.placeholder, ji, n, o, ji, ji, l - t) : Il(this && this !== fl && this instanceof e ? s : i, this, n)
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
                            return -1 < n ? o[r ? e[n] : n] : ji
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
                                  , a = "wrapper" == r ? Mn(n) : ji
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
                          , C = b ? ji : fn(l);
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
                                    e[r] = $n(i, n) ? o[i] : ji
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
                            Ke(e, function(e, t, n) {
                                r(i, o(e), t, n)
                            }),
                            i;
                            var r, o, i
                        }
                    }
                    function yn(r, o) {
                        return function(e, t) {
                            var n;
                            if (e === ji && t === ji)
                                return o;
                            if (e !== ji && (n = e),
                            t !== ji) {
                                if (n === ji)
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
                            return e = kl(e, Wl(Bn())),
                            Et(function(t) {
                                var n = this;
                                return r(e, function(e) {
                                    return Il(e, n, t)
                                })
                            })
                        })
                    }
                    function In(e, t) {
                        var n = (t = t === ji ? " " : Ft(t)).length;
                        if (n < 2)
                            return n ? wt(t, e) : t;
                        n = wt(t, U(e / rs(t)));
                        return Zl(t) ? $t(os(n), 0, e).join("") : n.slice(0, e)
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
                            return n && "number" != typeof n && Xn(e, t, n) && (t = n = ji),
                            e = qo(e),
                            t === ji ? (t = e,
                            e = 0) : t = qo(t),
                            function(e, t, n, r) {
                                for (var o = -1, i = V(U((t - e) / (n || 1)), 0), a = w(i); i--; )
                                    a[r ? i : ++o] = e,
                                    e += n;
                                return a
                            }(e, t, n = n === ji ? e < t ? 1 : -1 : qo(n), r)
                        }
                    }
                    function wn(n) {
                        return function(e, t) {
                            return "string" == typeof e && "string" == typeof t || (e = $o(e),
                            t = $o(t)),
                            n(e, t)
                        }
                    }
                    function En(e, t, n, r, o, i, a, l, s, u) {
                        var c = 8 & t;
                        t |= c ? 32 : 64,
                        4 & (t &= ~(c ? 64 : 32)) || (t &= -4);
                        u = [e, t, o, c ? i : ji, c ? a : ji, c ? ji : i, c ? ji : a, l, s, u],
                        n = n.apply(ji, u);
                        return Zn(e) && ar(n, u),
                        n.placeholder = r,
                        ur(n, e, t)
                    }
                    function Pn(e) {
                        var r = o[e];
                        return function(e, t) {
                            if (e = $o(e),
                            (t = null == t ? 0 : q(Jo(t), 292)) && j(e)) {
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
                            n) : kl(i(r = e), function(e) {
                                return [e, r[e]]
                            })
                        }
                    }
                    function kn(e, t, n, r, o, i, a, l) {
                        var s = 2 & t;
                        if (!s && "function" != typeof e)
                            throw new C(zi);
                        var u = r ? r.length : 0;
                        u || (t &= -97,
                        r = o = ji),
                        a = a === ji ? a : V(Jo(a), 0),
                        l = l === ji ? l : Jo(l),
                        u -= o ? o.length : 0,
                        64 & t && (m = r,
                        v = o,
                        r = o = ji);
                        var c, d, f, p, m, v, h, g, y, b, I = s ? ji : Mn(e), S = [e, t, n, r, o, m, v, i, a, l];
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
                        !(l = S[9] = S[9] === ji ? s ? 0 : e.length : V(S[9] - u, 0)) && 24 & t && (t &= -25),
                        n = t && 1 != t ? 8 == t || 16 == t ? pn(e, t, l) : 32 != t && 33 != t || o.length ? hn.apply(ji, S) : Sn(e, t, n, r) : (g = n,
                        y = 1 & t,
                        b = fn(h = e),
                        function e() {
                            return (this && this !== fl && this instanceof e ? b : h).apply(y ? g : this, arguments)
                        }
                        ),
                        ur((I ? kt : ar)(n, S), e, t)
                    }
                    function On(e, t, n, r) {
                        return e === ji || bo(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function _n(e, t, n, r, o, i) {
                        return Ro(e) && Ro(t) && (i.set(t, e),
                        ht(e, t, ji, _n, i),
                        i.delete(t)),
                        e
                    }
                    function An(e) {
                        return Fo(e) ? ji : e
                    }
                    function Nn(e, t, n, r, o, i) {
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
                          , f = 2 & n ? new Ce : ji;
                        for (i.set(e, t),
                        i.set(t, e); ++c < l; ) {
                            var p, m = e[c], v = t[c];
                            if (r && (p = a ? r(v, m, c, t, e, i) : r(m, v, c, e, t, i)),
                            p !== ji) {
                                if (p)
                                    continue;
                                d = !1;
                                break
                            }
                            if (f) {
                                if (!Nl(t, function(e, t) {
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
                        return sr(rr(e, ji, wr), e + "")
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
                    function Hn(e) {
                        for (var t = ci(e), n = t.length; n--; ) {
                            var r = t[n]
                              , o = e[r];
                            t[n] = [r, o, tr(o)]
                        }
                        return t
                    }
                    function jn(e, t) {
                        t = t,
                        t = null == (e = e) ? ji : e[t];
                        return st(t) ? t : ji
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
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && No(o) && $n(a, o) && (wo(e) || Co(e))
                    }
                    function Jn(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function Kn(e) {
                        return wo(e) || Co(e) || !!(A && e && e[A])
                    }
                    function $n(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Ji : t) && ("number" == n || "symbol" != n && Za.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Xn(e, t, n) {
                        if (Ro(n)) {
                            var r = typeof t;
                            return ("number" == r ? Po(n) && $n(t, n.length) : "string" == r && t in n) && bo(n[t], e)
                        }
                    }
                    function Yn(e, t) {
                        if (!wo(e)) {
                            var n = typeof e;
                            return "number" == n || "symbol" == n || "boolean" == n || null == e || Ho(e) || (Da.test(e) || !La.test(e) || null != t && e in v(t))
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
                          , e = t == aa ? e.constructor : ji
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
                    var Qn = a ? _o : Gi;
                    function er(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || m)
                    }
                    function tr(e) {
                        return e == e && !Ro(e)
                    }
                    function nr(t, n) {
                        return function(e) {
                            return null != e && (e[t] === n && (n !== ji || t in v(e)))
                        }
                    }
                    function rr(i, a, l) {
                        return a = V(a === ji ? i.length - 1 : a, 0),
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
                        return t.length < 2 ? e : Ye(e, At(t, 0, -1))
                    }
                    function ir(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ar = cr(kt)
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
                        }(t, (r = (t = (t = t).match(Ha)) ? t[1].split(ja) : [],
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
                            return n.apply(ji, arguments)
                        }
                    }
                    function dr(e, t) {
                        var n = -1
                          , r = e.length
                          , o = r - 1;
                        for (t = t === ji ? r : t; ++n < t; ) {
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
                        if ("string" == typeof e || Ho(e))
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
                        var n = kr(t);
                        return xo(n) && (n = ji),
                        xo(e) ? Be(e, Ve(t, 1, xo, !0), Bn(n, 2)) : []
                    })
                      , Ir = Et(function(e, t) {
                        var n = kr(t);
                        return xo(n) && (n = ji),
                        xo(e) ? Be(e, Ve(t, 1, xo, !0), ji, n) : []
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
                        return n !== ji && (o = Jo(n),
                        o = n < 0 ? V(r + o, 0) : q(o, r - 1)),
                        Ll(e, Bn(t, 3), o, !0)
                    }
                    function wr(e) {
                        return (null == e ? 0 : e.length) ? Ve(e, 1) : []
                    }
                    function Er(e) {
                        return e && e.length ? e[0] : ji
                    }
                    var Pr = Et(function(e) {
                        var t = kl(e, Vt);
                        return t.length && t[0] === e[0] ? rt(t) : []
                    })
                      , xr = Et(function(e) {
                        var t = kr(e)
                          , n = kl(e, Vt);
                        return t === kr(n) ? t = ji : n.pop(),
                        n.length && n[0] === e[0] ? rt(n, Bn(t, 2)) : []
                    })
                      , Tr = Et(function(e) {
                        var t = kr(e)
                          , n = kl(e, Vt);
                        return (t = "function" == typeof t ? t : ji) && n.pop(),
                        n.length && n[0] === e[0] ? rt(n, ji, t) : []
                    });
                    function kr(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? e[t - 1] : ji
                    }
                    var Or = Et(_r);
                    function _r(e, t) {
                        return e && e.length && t && t.length ? It(e, t) : e
                    }
                    var Ar = Rn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = Le(e, t);
                        return St(e, kl(t, function(e) {
                            return $n(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Nr(e) {
                        return null == e ? e : X.call(e)
                    }
                    var Rr = Et(function(e) {
                        return Ut(Ve(e, 1, xo, !0))
                    })
                      , Lr = Et(function(e) {
                        var t = kr(e);
                        return xo(t) && (t = ji),
                        Ut(Ve(e, 1, xo, !0), Bn(t, 2))
                    })
                      , Dr = Et(function(e) {
                        var t = "function" == typeof (t = kr(e)) ? t : ji;
                        return Ut(Ve(e, 1, xo, !0), ji, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = Pl(t, function(e) {
                            return xo(e) && (n = V(e.length, n),
                            1)
                        }),
                        jl(n, function(e) {
                            return kl(t, Bl(e))
                        })
                    }
                    function Fr(e, t) {
                        if (!e || !e.length)
                            return [];
                        e = Mr(e);
                        return null == t ? e : kl(e, function(e) {
                            return Il(t, ji, e)
                        })
                    }
                    var Ur = Et(function(e, t) {
                        return xo(e) ? Be(e, t) : []
                    })
                      , Br = Et(function(e) {
                        return zt(Pl(e, xo))
                    })
                      , Gr = Et(function(e) {
                        var t = kr(e);
                        return xo(t) && (t = ji),
                        zt(Pl(e, xo), Bn(t, 2))
                    })
                      , Hr = Et(function(e) {
                        var t = "function" == typeof (t = kr(e)) ? t : ji;
                        return zt(Pl(e, xo), ji, t)
                    })
                      , jr = Et(Mr);
                    var zr = Et(function(e) {
                        var t = e.length
                          , t = "function" == typeof (t = 1 < t ? e[t - 1] : ji) ? (e.pop(),
                        t) : ji;
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
                        return !(1 < n || this.__actions__.length) && o instanceof ye && $n(r) ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                            func: Vr,
                            args: [e],
                            thisArg: ji
                        }),
                        new ge(o,this.__chain__).thru(function(e) {
                            return n && !e.length && e.push(ji),
                            e
                        })) : this.thru(e)
                    });
                    var Jr = an(function(e, t, n) {
                        y.call(e, n) ? ++e[n] : Re(e, n, 1)
                    });
                    var Kr = mn(Sr)
                      , $r = mn(Cr);
                    function Xr(e, t) {
                        return (wo(e) ? Cl : Ge)(e, Bn(t, 3))
                    }
                    function Yr(e, t) {
                        return (wo(e) ? wl : He)(e, Bn(t, 3))
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
                        return (wo(e) ? kl : pt)(e, Bn(t, 3))
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
                        return t = n ? ji : t,
                        t = e && null == t ? e.length : t,
                        kn(e, qi, ji, ji, ji, ji, t)
                    }
                    function ao(e, t) {
                        var n;
                        if ("function" != typeof t)
                            throw new C(zi);
                        return e = Jo(e),
                        function() {
                            return 0 < --e && (n = t.apply(this, arguments)),
                            e <= 1 && (t = ji),
                            n
                        }
                    }
                    var lo = Et(function(e, t, n) {
                        var r, o = 1;
                        return n.length && (r = ts(n, Un(lo)),
                        o |= 32),
                        kn(e, o, t, n, r)
                    })
                      , so = Et(function(e, t, n) {
                        var r, o = 3;
                        return n.length && (r = ts(n, Un(so)),
                        o |= 32),
                        kn(t, o, e, n, r)
                    });
                    function uo(r, n, e) {
                        var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                        if ("function" != typeof r)
                            throw new C(zi);
                        function p(e) {
                            var t = o
                              , n = i;
                            return o = i = ji,
                            c = e,
                            l = r.apply(n, t)
                        }
                        function m(e) {
                            var t = e - u;
                            return u === ji || n <= t || t < 0 || f && a <= e - c
                        }
                        function v() {
                            var e, t = oo();
                            if (m(t))
                                return h(t);
                            s = lr(v, (t = n - ((e = t) - u),
                            f ? q(t, a - (e - c)) : t))
                        }
                        function h(e) {
                            return s = ji,
                            t && o ? p(e) : (o = i = ji,
                            l)
                        }
                        function g() {
                            var e = oo()
                              , t = m(e);
                            if (o = arguments,
                            i = this,
                            u = e,
                            t) {
                                if (s === ji)
                                    return c = t = u,
                                    s = lr(v, n),
                                    d ? p(t) : l;
                                if (f)
                                    return Xt(s),
                                    s = lr(v, n),
                                    p(u)
                            }
                            return s === ji && (s = lr(v, n)),
                            l
                        }
                        return n = $o(n) || 0,
                        Ro(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? V($o(e.maxWait) || 0, n) : a,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            s !== ji && Xt(s),
                            c = 0,
                            o = u = i = s = ji
                        }
                        ,
                        g.flush = function() {
                            return s === ji ? l : h(oo())
                        }
                        ,
                        g
                    }
                    var co = Et(function(e, t) {
                        return Ue(e, 1, t)
                    })
                      , fo = Et(function(e, t, n) {
                        return Ue(e, $o(t) || 0, n)
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
                    var vo = Kt(function(r, o) {
                        var i = (o = 1 == o.length && wo(o[0]) ? kl(o[0], Wl(Bn())) : kl(Ve(o, 1), Wl(Bn()))).length;
                        return Et(function(e) {
                            for (var t = -1, n = q(e.length, i); ++t < n; )
                                e[t] = o[t].call(this, e[t]);
                            return Il(r, this, e)
                        })
                    })
                      , ho = Et(function(e, t) {
                        var n = ts(t, Un(ho));
                        return kn(e, 32, ji, t, n)
                    })
                      , go = Et(function(e, t) {
                        var n = ts(t, Un(go));
                        return kn(e, 64, ji, t, n)
                    })
                      , yo = Rn(function(e, t) {
                        return kn(e, 256, ji, ji, ji, t)
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
                        return null != e && No(e.length) && !_o(e)
                    }
                    function xo(e) {
                        return Lo(e) && Po(e)
                    }
                    var To = H || Gi
                      , ko = vl ? Wl(vl) : function(e) {
                        return Lo(e) && Qe(e) == ea
                    }
                    ;
                    function Oo(e) {
                        if (!Lo(e))
                            return !1;
                        var t = Qe(e);
                        return t == ta || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Fo(e)
                    }
                    function _o(e) {
                        if (!Ro(e))
                            return !1;
                        e = Qe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function Ao(e) {
                        return "number" == typeof e && e == Jo(e)
                    }
                    function No(e) {
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
                    function Ho(e) {
                        return "symbol" == typeof e || Lo(e) && Qe(e) == da
                    }
                    var jo = bl ? Wl(bl) : function(e) {
                        return Lo(e) && No(e.length) && !!sl[Qe(e)]
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
                        if (N && e[N])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[N]());
                        var t = Vn(e);
                        return (t == oa ? Ql : t == ua ? ns : bi)(e)
                    }
                    function qo(e) {
                        return e ? (e = $o(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function Jo(e) {
                        var t = qo(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function Ko(e) {
                        return e ? De(Jo(e), 0, $i) : 0
                    }
                    function $o(e) {
                        if ("number" == typeof e)
                            return e;
                        if (Ho(e))
                            return Ki;
                        if (Ro(e) && (e = Ro(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = $a.test(e);
                        return t || Ya.test(e) ? dl(e.slice(2), t ? 2 : 8) : Ka.test(e) ? Ki : +e
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
                          , o = 2 < r ? t[2] : ji;
                        for (o && Xn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === ji || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Et(function(e) {
                        return e.push(ji, _n),
                        Il(pi, ji, e)
                    });
                    function ii(e, t, n) {
                        t = null == e ? ji : Ye(e, t);
                        return t === ji ? n : t
                    }
                    function ai(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var li = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        e[t] = n
                    }, Ni(Li))
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
                        e = kl(e, function(e) {
                            return e = Jt(e, t),
                            r = r || 1 < e.length,
                            e
                        }),
                        on(t, Dn(t), n),
                        r && (n = Me(n, 7, An));
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
                        var t = kl(Dn(e), function(e) {
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
                        return (e = Yo(e)) && e.replace(Qa, $l).replace(rl, "")
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
                    var ki = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Oi = cn("toUpperCase");
                    function _i(e, t, n) {
                        return e = Yo(e),
                        (t = n ? ji : t) === ji ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var Ai = Et(function(e, t) {
                        try {
                            return Il(e, ji, t)
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
                    function Ni(e) {
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
                          , a = _o(r);
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
                    E = bn(kl),
                    ce = bn(El),
                    D = bn(Nl);
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
                    var Hi, M = yn(function(e, t) {
                        return e * t
                    }, 1), Kt = Pn("round"), H = yn(function(e, t) {
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
                        t = (n ? Xn(e, t, n) : t === ji) ? 1 : V(Jo(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = w(U(r / t)); o < r; )
                            a[i++] = At(e, o, o += t);
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
                        return r = o ? kl(r, function(e) {
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
                    pe.constant = Ni,
                    pe.countBy = Jr,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : Ne(e, t)
                    }
                    ,
                    pe.curry = function e(t, n, r) {
                        n = kn(t, 8, ji, ji, ji, ji, ji, n = r ? ji : n);
                        return n.placeholder = e.placeholder,
                        n
                    }
                    ,
                    pe.curryRight = function e(t, n, r) {
                        n = kn(t, 16, ji, ji, ji, ji, ji, n = r ? ji : n);
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
                        return r ? At(e, (t = n || t === ji ? 1 : Jo(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? At(e, 0, (t = r - (t = n || t === ji ? 1 : Jo(t))) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.dropRightWhile = function(e, t) {
                        return e && e.length ? Ht(e, Bn(t, 3), !0, !0) : []
                    }
                    ,
                    pe.dropWhile = function(e, t) {
                        return e && e.length ? Ht(e, Bn(t, 3), !0) : []
                    }
                    ,
                    pe.fill = function(e, t, n, r) {
                        var o = null == e ? 0 : e.length;
                        return o ? (n && "number" != typeof n && Xn(e, t, n) && (n = 0,
                        r = o),
                        function(e, t, n, r) {
                            var o = e.length;
                            for ((n = Jo(n)) < 0 && (n = o < -n ? 0 : o + n),
                            (r = r === ji || o < r ? o : Jo(r)) < 0 && (r += o),
                            r = r < n ? 0 : Ko(r); n < r; )
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
                        return n = n === ji ? 1 : Jo(n),
                        Ve(to(e, t), n)
                    }
                    ,
                    pe.flatten = wr,
                    pe.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? Ve(e, 1 / 0) : []
                    }
                    ,
                    pe.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? Ve(e, t = t === ji ? 1 : Jo(t)) : []
                    }
                    ,
                    pe.flip = function(e) {
                        return kn(e, 512)
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
                        return (null == e ? 0 : e.length) ? At(e, 0, -1) : []
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
                        Ke(e, function(e, t, n) {
                            Re(o, r(e, t, n), e)
                        }),
                        o
                    }
                    ,
                    pe.mapValues = function(e, r) {
                        var o = {};
                        return r = Bn(r, 3),
                        Ke(e, function(e, t, n) {
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
                        wo(n = r ? ji : n) || (n = null == n ? [] : [n]),
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
                            return null == t ? ji : Ye(t, e)
                        }
                    }
                    ,
                    pe.pull = Or,
                    pe.pullAll = _r,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, ji, n) : e
                    }
                    ,
                    pe.pullAt = Ar,
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
                        return Et(e, t = t === ji ? t : Jo(t))
                    }
                    ,
                    pe.reverse = Nr,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Xn(e, t, n) : t === ji) ? 1 : Jo(t),
                        (wo(e) ? xe : xt)(e, t)
                    }
                    ,
                    pe.set = function(e, t, n) {
                        return null == e ? e : Tt(e, t, n)
                    }
                    ,
                    pe.setWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : ji,
                        null == e ? e : Tt(e, t, n, r)
                    }
                    ,
                    pe.shuffle = function(e) {
                        return (wo(e) ? Te : _t)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Xn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : Jo(t),
                        n === ji ? r : Jo(n)),
                        At(e, t, n)) : []
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
                        return n && "number" != typeof n && Xn(e, t, n) && (t = n = ji),
                        (n = n === ji ? $i : n >>> 0) ? (e = Yo(e)) && ("string" == typeof t || null != t && !Uo(t)) && !(t = Ft(t)) && Zl(e) ? $t(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new C(zi);
                        return r = null == r ? 0 : V(Jo(r), 0),
                        Et(function(e) {
                            var t = e[r]
                              , e = $t(e, 0, r);
                            return t && Ol(e, t),
                            Il(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? At(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? At(e, 0, (t = n || t === ji ? 1 : Jo(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? At(e, (t = r - (t = n || t === ji ? 1 : Jo(t))) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.takeRightWhile = function(e, t) {
                        return e && e.length ? Ht(e, Bn(t, 3), !1, !0) : []
                    }
                    ,
                    pe.takeWhile = function(e, t) {
                        return e && e.length ? Ht(e, Bn(t, 3)) : []
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
                        return wo(e) ? kl(e, vr) : Ho(e) ? [e] : rn(mr(Yo(e)))
                    }
                    ,
                    pe.toPlainObject = Xo,
                    pe.transform = function(e, r, o) {
                        var t, n = wo(e), i = n || To(e) || jo(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : Ro(e) && _o(t) ? me(T(e)) : {}),
                        (i ? Cl : Ke)(e, function(e, t, n) {
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
                        return t = "function" == typeof t ? t : ji,
                        e && e.length ? Ut(e, ji, t) : []
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
                        return r = "function" == typeof r ? r : ji,
                        null == e ? e : Gt(e, t, qt(n), r)
                    }
                    ,
                    pe.values = bi,
                    pe.valuesIn = function(e) {
                        return null == e ? [] : Vl(e, di(e))
                    }
                    ,
                    pe.without = Ur,
                    pe.words = _i,
                    pe.wrap = function(e, t) {
                        return ho(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = Gr,
                    pe.xorWith = Hr,
                    pe.zip = jr,
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
                    pe.attempt = Ai,
                    pe.camelCase = Ii,
                    pe.capitalize = Si,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === ji && (n = t,
                        t = ji),
                        n !== ji && (n = (n = $o(n)) == n ? n : 0),
                        t !== ji && (t = (t = $o(t)) == t ? t : 0),
                        De($o(e), t, n)
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
                        return Me(e, 5, t = "function" == typeof t ? t : ji)
                    }
                    ,
                    pe.cloneWith = function(e, t) {
                        return Me(e, 4, t = "function" == typeof t ? t : ji)
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
                          , r = n = n === ji ? r : De(Jo(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = bo,
                    pe.escape = function(e) {
                        return (e = Yo(e)) && _a.test(e) ? e.replace(ka, Xl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Yo(e)) && Ua.test(e) ? e.replace(Fa, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = wo(e) ? El : je;
                        return n && Xn(e, t, n) && (t = ji),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = Kr,
                    pe.findIndex = Sr,
                    pe.findKey = function(e, t) {
                        return Rl(e, Bn(t, 3), Ke)
                    }
                    ,
                    pe.findLast = $r,
                    pe.findLastIndex = Cr,
                    pe.findLastKey = function(e, t) {
                        return Rl(e, Bn(t, 3), $e)
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
                        return e && Ke(e, Bn(t, 3))
                    }
                    ,
                    pe.forOwnRight = function(e, t) {
                        return e && $e(e, Bn(t, 3))
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
                        n === ji ? (n = t,
                        t = 0) : n = qo(n),
                        (e = e = $o(e)) >= q(t = t, n = n) && e < V(t, n)
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
                    pe.isDate = ko,
                    pe.isElement = function(e) {
                        return Lo(e) && 1 === e.nodeType && !Fo(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (Po(e) && (wo(e) || "string" == typeof e || "function" == typeof e.splice || To(e) || jo(e) || Co(e)))
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
                        var r = (n = "function" == typeof n ? n : ji) ? n(e, t) : ji;
                        return r === ji ? at(e, t, ji, n) : !!r
                    }
                    ,
                    pe.isError = Oo,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && j(e)
                    }
                    ,
                    pe.isFunction = _o,
                    pe.isInteger = Ao,
                    pe.isLength = No,
                    pe.isMap = Do,
                    pe.isMatch = function(e, t) {
                        return e === t || lt(e, t, Hn(t))
                    }
                    ,
                    pe.isMatchWith = function(e, t, n) {
                        return n = "function" == typeof n ? n : ji,
                        lt(e, t, Hn(t), n)
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
                        return Ao(e) && -Ji <= e && e <= Ji
                    }
                    ,
                    pe.isSet = Bo,
                    pe.isString = Go,
                    pe.isSymbol = Ho,
                    pe.isTypedArray = jo,
                    pe.isUndefined = function(e) {
                        return e === ji
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
                    pe.last = kr,
                    pe.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r;
                        return n !== ji && (o = (o = Jo(n)) < 0 ? V(r + o, 0) : q(o, r - 1)),
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
                        return e && e.length ? ze(e, Li, et) : ji
                    }
                    ,
                    pe.maxBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), et) : ji
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
                        return e && e.length ? ze(e, Li, ft) : ji
                    }
                    ,
                    pe.minBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), ft) : ji
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
                        return e && e.length ? gt(e, Jo(t)) : ji
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
                        K(Yo(e).replace(Ba, ""), t || 0)
                    }
                    ,
                    pe.random = function(e, t, n) {
                        var r;
                        if (n && "boolean" != typeof n && Xn(e, t, n) && (t = n = ji),
                        n === ji && ("boolean" == typeof t ? (n = t,
                        t = ji) : "boolean" == typeof e && (n = e,
                        e = ji)),
                        e === ji && t === ji ? (e = 0,
                        t = 1) : (e = qo(e),
                        t === ji ? (t = e,
                        e = 0) : t = qo(t)),
                        t < e && (r = e,
                        e = t,
                        t = r),
                        n || e % 1 || t % 1) {
                            n = $();
                            return q(e + n * (t - e + cl("1e-" + ((n + "").length - 1))), t)
                        }
                        return Ct(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = wo(e) ? _l : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Ge)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = wo(e) ? Al : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, He)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Xn(e, t, n) : t === ji) ? 1 : Jo(t),
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
                        e = ji); ++r < o; ) {
                            var i = null == e ? ji : e[vr(t[r])];
                            i === ji && (r = o,
                            i = n),
                            e = _o(i) ? i.call(e) : i
                        }
                        return e
                    }
                    ,
                    pe.round = Kt,
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
                        var r = wo(e) ? Nl : Nt;
                        return n && Xn(e, t, n) && (t = ji),
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
                    pe.subtract = H,
                    pe.sum = function(e) {
                        return e && e.length ? Hl(e, Li) : 0
                    }
                    ,
                    pe.sumBy = function(e, t) {
                        return e && e.length ? Hl(e, Bn(t, 2)) : 0
                    }
                    ,
                    pe.template = function(a, e, t) {
                        var n = pe.templateSettings;
                        t && Xn(a, e, t) && (e = ji),
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
                        (e = Ai(function() {
                            return f(r, i + "return " + c).apply(ji, o)
                        })).source = c,
                        Oo(e))
                            throw e;
                        return e
                    }
                    ,
                    pe.times = function(e, t) {
                        if ((e = Jo(e)) < 1 || Ji < e)
                            return [];
                        var n = $i
                          , r = q(e, $i);
                        for (t = Bn(t),
                        e -= $i,
                        r = jl(r, t); ++n < e; )
                            t(n);
                        return r
                    }
                    ,
                    pe.toFinite = qo,
                    pe.toInteger = Jo,
                    pe.toLength = Ko,
                    pe.toLower = function(e) {
                        return Yo(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = $o,
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
                        return (e = Yo(e)) && (n || t === ji) ? zl(e) : e && (t = Ft(t)) ? (e = os(e),
                        t = os(t),
                        $t(e, Jl(e, t), Kl(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Yo(e)) && (n || t === ji) ? e.slice(0, is(e) + 1) : e && (t = Ft(t)) ? $t(e = os(e), 0, Kl(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Yo(e)) && (n || t === ji) ? e.replace(Ba, "") : e && (t = Ft(t)) ? $t(e = os(e), Jl(e, os(t))).join("") : e
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
                        if (r = i ? $t(i, 0, t).join("") : e.slice(0, t),
                        n === ji)
                            return r + o;
                        if (i && (t += r.length - t),
                        Uo(n)) {
                            if (e.slice(t).search(n)) {
                                var a, l = r;
                                for (n.global || (n = p(n.source, Yo(Ja.exec(n)) + "g")),
                                n.lastIndex = 0; a = n.exec(l); )
                                    var s = a.index;
                                r = r.slice(0, s === ji ? t : s)
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
                    pe.upperCase = ki,
                    pe.upperFirst = Oi,
                    pe.each = Xr,
                    pe.eachRight = Yr,
                    pe.first = Er,
                    Mi(pe, (Hi = {},
                    Ke(pe, function(e, t) {
                        y.call(pe.prototype, t) || (Hi[t] = e)
                    }),
                    Hi), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    Cl(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    Cl(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === ji ? 1 : V(Jo(e), 0);
                            var t = this.__filtered__ && !r ? new ye(this) : this.clone();
                            return t.__filtered__ ? t.__takeCount__ = q(e, t.__takeCount__) : t.__views__.push({
                                size: q(e, $i),
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
                        t !== ji && (n = (t = Jo(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                        n)
                    }
                    ,
                    ye.prototype.takeRightWhile = function(e) {
                        return this.reverse().takeWhile(e).reverse()
                    }
                    ,
                    ye.prototype.toArray = function() {
                        return this.take($i)
                    }
                    ,
                    Ke(ye.prototype, function(u, e) {
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
                                thisArg: ji
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
                    Ke(ye.prototype, function(e, t) {
                        var n, r = pe[t];
                        r && (n = r.name + "",
                        y.call(oe, n) || (oe[n] = []),
                        oe[n].push({
                            name: t,
                            func: r
                        }))
                    }),
                    oe[hn(ji, 2).name] = [{
                        name: "wrapper",
                        func: ji
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
                            return jt(e, this.__actions__);
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
                        this.__values__ === ji && (this.__values__ = Vo(this.value()));
                        var e = this.__index__ >= this.__values__.length;
                        return {
                            done: e,
                            value: e ? ji : this.__values__[this.__index__++]
                        }
                    }
                    ,
                    pe.prototype.plant = function(e) {
                        for (var t, n = this; n instanceof he; ) {
                            var r = gr(n);
                            r.__index__ = 0,
                            r.__values__ = ji,
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
                                args: [Nr],
                                thisArg: ji
                            }),
                            new ge(e,this.__chain__)
                        }
                        return this.thru(Nr)
                    }
                    ,
                    pe.prototype.toJSON = pe.prototype.valueOf = pe.prototype.value = function() {
                        return jt(this.__wrapped__, this.__actions__)
                    }
                    ,
                    pe.prototype.first = pe.prototype.head,
                    N && (pe.prototype[N] = function() {
                        return this
                    }
                    ),
                    pe
                }();
                fl._ = ls,
                (R = function() {
                    return ls
                }
                .call(A, N, A, _)) === ji || (_.exports = R)
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
    function oc(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, oc),
        t.loaded = !0,
        t.exports
    }
    oc.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return oc.d(t, {
            a: t
        }),
        t
    }
    ,
    oc.d = function(e, t) {
        for (var n in t)
            oc.o(t, n) && !oc.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    oc.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    oc.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    oc.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var C, w, E, K, L, D, M, $ = React, X = oc.n($), e = ReactDOM, A = CoreUtilities, P = window.EventTracker ? EventTracker : {
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
        (et = C = C || {}).Game = "Game",
        et.CatalogAsset = "CatalogAsset",
        et.CatalogBundle = "CatalogBundle",
        (tt = w = w || {}).Carousel = "Carousel",
        tt.AvatarCarousel = "AvatarCarousel",
        tt.SortlessGrid = "SortlessGrid",
        tt.FriendCarousel = "FriendCarousel",
        tt.InterestGrid = "InterestGrid",
        tt.Pills = "Pills",
        tt.Sdui = "sdui",
        tt.SongCarousel = "SongCarousel",
        (lt = E = E || {}).Carousel = "Carousel",
        lt.HeroUnit = "HeroUnit",
        (st = {}).Sponsored = "Sponsored",
        st.SponsoredGame = "SponsoredGame",
        (te = K = K || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        te.GridTile = "GridTile",
        te.EventTile = "EventTile",
        te.InterestTile = "InterestTile",
        te.ExperienceEventsTile = "ExperienceEventsTile",
        (oe = L = L || {}).Always = "Always",
        oe.Hover = "Hover",
        oe.Footer = "Footer",
        (Zn = D = D || {}).Disabled = "Disabled",
        Zn.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var i, l = "robloxAttributionIds";
        function s(e) {
            var t = window
              , n = t[l];
            return n || (n = {},
            t[l] = n),
            (t = n[e]) || (t = A.uuidService.generateRandomUuid(),
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
            A.urlService.getUrlWithQueries(x.entityUrl.game.getRelativePath(e) + "/" + A.seoName.formatSeoName(t), n)
        }
        function N(e, t, n, r, o) {
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
            A.urlService.getUrlWithQueries(r, I(I({}, n), o))
        }
        function h() {
            return document.referrer
        }
        (fr = Y = Y || {}).SearchPage = "searchPage",
        fr.SortDetailPageDiscover = "sortDetailPageDiscover",
        fr.SortDetailPageHome = "sortDetailPageHome",
        fr.GameDetailPage = "gameDetailPage",
        fr.GamesPage = "gamesPage",
        fr.HomePage = "homePage",
        fr.PeopleListInHomePage = "peopleListInHomePage",
        fr.InterestCatcher = "interestCatcher",
        fr.SearchLandingPage = "searchLandingPage";
        var R, g, F, S, y, b, I = function() {
            return (I = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, U = v, k = function() {
            return (k = Object.assign || function(e) {
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
        }, _ = (pr = x.eventStreamService.eventTypes).pageLoad, B = pr.formInteraction;
        function G(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === T.Presence.PresenceTypes.InGame
            })
        }
        function H(e, t) {
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
        function j(t, e) {
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
            return t === K.GridTile || t === K.EventTile || t === K.InterestTile ? ((t = {})[R.ThumbnailAssetIds] = e.map(function(e) {
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
            return t === K.GridTile || t === K.EventTile || t === K.InterestTile ? ((t = {})[R.TileBadgeContexts] = e.map(function(e) {
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
                    return [2, A.httpService.get({
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
        (Wi = R = R || {}).AbsPositions = "absPositions",
        Wi.AdsPositions = "adsPositions",
        Wi.AdFlags = "adFlags",
        Wi.Algorithm = "algorithm",
        Wi.AppliedFilters = "appliedFilters",
        Wi.AttributionId = "attributionId",
        Wi.ComponentType = "componentType",
        Wi.Direction = "direction",
        Wi.Distance = "distance",
        Wi.HttpReferrer = "httpReferrer",
        Wi.EmphasisFlag = "emphasisFlag",
        Wi.FilterId = "filterId",
        Wi.FilterIds = "filterIds",
        Wi.GameSetTargetId = "gameSetTargetId",
        Wi.GameSetTypeId = "gameSetTypeId",
        Wi.InteractionType = "interactionType",
        Wi.IsAd = "isAd",
        Wi.NativeAdData = "nativeAdData",
        Wi.AdIds = "adIds",
        Wi.NumberOfLoadedTiles = "numberOfLoadedTiles",
        Wi.Page = "page",
        Wi.PageSession = "pageSession",
        Wi.PlaceId = "placeId",
        Wi.PlayContext = "playContext",
        Wi.Position = "position",
        Wi.PreviousOptionId = "previousOptionId",
        Wi.PromptId = "promptId",
        Wi.PromptText = "promptText",
        Wi.ResourceId = "resourceId",
        Wi.ResponseOptionIds = "responseOptionIds",
        Wi.ResponseOptionTexts = "responseOptionTexts",
        Wi.RootPlaceIds = "rootPlaceIds",
        Wi.SelectedIds = "selectedIds",
        Wi.SelectedTexts = "selectedTexts",
        Wi.ScreenSizeX = "screenSizeX",
        Wi.ScreenSizeY = "screenSizeY",
        Wi.ScrollAreaSize = "scrollAreaSize",
        Wi.ScrollDepth = "scrollDepth",
        Wi.SelectedOptionId = "selectedOptionId",
        Wi.SelectedOptionIds = "selectedOptionIds",
        Wi.ShareLinkType = "shareLinkType",
        Wi.ShareLinkId = "shareLinkId",
        Wi.SortId = "sortId",
        Wi.SortPos = "sortPos",
        Wi.StartDepth = "startDepth",
        Wi.StartPos = "startPos",
        Wi.SuggestionKwd = "suggestionKwd",
        Wi.SuggestionReplacedKwd = "suggestionReplacedKwd",
        Wi.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        Wi.SuggestionAlgorithm = "suggestionAlgorithm",
        Wi.TimeToRespond = "timeToRespond",
        Wi.Token = "token",
        Wi.Topics = "topics",
        Wi.TreatmentType = "treatmentType",
        Wi.UniverseId = "universeId",
        Wi.UniverseIds = "universeIds",
        Wi.FriendId = "friendId",
        Wi.ThumbnailAssetIds = "thumbnailAssetIds",
        Wi.ThumbnailListIds = "thumbnailListIds",
        Wi.LinkPath = "linkPath",
        Wi.LocationName = "locationName",
        Wi.RowsOnPage = "rowsOnPage",
        Wi.PositionsInRow = "positionsInRow",
        Wi.NavigationUids = "navigationUids",
        Wi.TileBadgeContexts = "tileBadgeContexts",
        Wi.ButtonName = "buttonName",
        Wi.IsInterested = "isInterested",
        Wi.InterestedUniverseIds = "interestedUniverseIds",
        (cs = g = g || {}).GameImpressions = "gameImpressions",
        cs.GameDetailReferral = "gameDetailReferral",
        cs.SortDetailReferral = "sortDetailReferral",
        cs.FeedScroll = "feedScroll",
        cs.NavigateToSortLink = "navigateToSortLink",
        cs.SurveyInteraction = "surveyInteraction",
        cs.SurveyImpression = "surveyImpression",
        cs.InterestCatcherClick = "interestCatcherClick",
        cs.FilterImpressions = "filterImpressions",
        cs.GamesFilterClick = "gamesFilterClick",
        cs.RequestRefundClick = "requestRefundClick",
        (hs = F = F || {}).HomePageSessionInfo = "homePageSessionInfo",
        hs.GameSearchSessionInfo = "gameSearchSessionInfo",
        hs.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        hs.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
        (as = {}).Submission = "submission",
        as.Cancellation = "cancellation",
        (et = S = S || {}).Horizontal = "horizontal",
        et.Vertical = "vertical",
        (tt = y = y || {}).Skip = "skip",
        tt.Continue = "continue",
        tt.Interested = "interested",
        (lt = b = b || {}).OpenDropdown = "openDropdown",
        lt.CloseDropdown = "closeDropdown",
        lt.Apply = "apply";
        var ee = ((st = {})[g.GameImpressions] = function(e) {
            e = O(e, []);
            return [{
                name: g.GameImpressions,
                type: g.GameImpressions,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: g.GameDetailReferral,
                type: g.GameDetailReferral,
                context: _
            }, ne(k(((t = {})[R.AttributionId] = s(i.GameDetailReferral),
            t[R.HttpReferrer] = h(),
            t), e))]
        }
        ,
        st[g.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SortDetailReferral,
                type: g.SortDetailReferral,
                context: _
            }, ne(k({}, e))]
        }
        ,
        st[g.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.NavigateToSortLink,
                type: g.NavigateToSortLink,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyInteraction,
                type: g.SurveyInteraction,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyImpression,
                type: g.SurveyImpression,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.InterestCatcherClick,
                type: g.InterestCatcherClick,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.FilterImpressions,
                type: g.FilterImpressions,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.GamesFilterClick,
                type: g.GamesFilterClick,
                context: B
            }, ne(k({}, e))]
        }
        ,
        st[g.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: g.RequestRefundClick,
                type: g.RequestRefundClick,
                context: B
            }, ne(((t = {})[R.PlaceId] = e.placeId,
            t))]
        }
        ,
        st)
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
          , re = A.urlService.parseQueryString
          , oe = A.numberFormat.getNumberFormat
          , ie = H
          , ae = function(e, t) {
            t = H(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , le = function(e) {
            return -1 === e ? "--" : A.abbreviateNumber.getAbbreviatedValue(e)
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
                        [4, A.httpService.get(a.getExperimentationValues(i, r, Object.keys(o)))];
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
                        [4, A.httpService.post(u.url.getOmniRecommendations, t)];
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
                        return [4, A.httpService.post(u.url.getOmniRecommendationsMetadata, {
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
                        [4, A.httpService.post(t, n)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , he = oc(4452)
          , ge = oc.n(he)
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
        (Zn = function(e) {
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
        var Se, Ce, we, Ee, Pe = Zn, xe = function() {
            var e = (0,
            $.useState)(!1)
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
            $.useMemo)(function() {
                return e.layoutDataBySort && t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
            }, [e.layoutDataBySort, e.defaultLayoutData, t])
        }, ke = HeaderScripts, Oe = T.EnvironmentUrls.gamesApi, _e = {
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
        }, Ae = function(e, a, l, s) {
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
        }, Ne = function(n, r) {
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
        }, Re = _e.defaultCacheCriteria, Le = x.dataStores.gamesDataStore, De = x.dataStores.userDataStoreV2, Me = (x.dataStores.localeDataStore,
        x.dataStores.userDataStore.FriendsUserSortType), Fe = function() {
            return De.getFriends({
                userId: null === ke.authenticatedUser || void 0 === ke.authenticatedUser ? void 0 : ke.authenticatedUser.id,
                userSort: Me.StatusFrequents,
                isGuest: !1
            }, Re)
        }, Ue = function(t) {
            return Ae(void 0, void 0, Promise, function() {
                return Ne(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Le.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Be = function(n) {
            return Ae(void 0, void 0, Promise, function() {
                var t;
                return Ne(this, function(e) {
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
            return A.httpService.get(_e.url.getAssetDataFromAssetId(e)).then(function(e) {
                return e.data
            })
        };
        function He(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function je(e) {
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
                n.animationClass = je(e)) : e.tileBadgeType === Ee.Icon && e.icons && (t = e.icons.map(He).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = je(e)),
                n
            })),
            t.length ? ((e = {})[Se.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function Ve(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === we.TextLabel ? e.footer : null
        }
        (fr = Se = Se || {}).INVALID = "Invalid",
        fr.IMAGE_TOP_LEFT = "ImageTopLeft",
        fr.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (pr = Ce = Ce || {}).Home = "Home",
        pr.Games = "Games",
        (Wi = {}).Invalid = "Invalid",
        Wi.HasLootBoxes = "HasLootBoxes",
        Wi.HasInGameTrading = "HasInGameTrading",
        Wi.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        Wi.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        Wi.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        Wi.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (cs = {}).MorphToR6 = "MorphToR6",
        cs.PlayerChoice = "PlayerChoice",
        cs.MorphToR15 = "MorphToR15",
        (hs = {}).Scroll = "Scroll",
        hs.Button = "Button",
        (we = we || {}).TextLabel = "TextLabel",
        (as = Ee = Ee || {}).Text = "Text",
        as.Icon = "Icon";
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
            omniRecommendationFeedStatsLoggingErrorEvent: "HomePageOmniRecommendationFeedStatsLoggingError",
            linkStartDelimiter: "{linkStart}",
            linkEndDelimiter: "{linkEnd}"
        }
          , Ke = {
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
          , Xe = .1
          , Ye = -1
          , Ze = 5
          , Qe = Je
          , et = Ke
          , tt = $e
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
          , st = oc.n(lt)
          , ut = "Label.ContextMenuTitle"
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
            }, n(ct))))
        }
        pt.propTypes = {
            game: st().shape({
                universeId: st().number,
                placeId: st().number,
                name: st().string,
                playerCount: st().number,
                isShowSponsoredLabel: st().bool,
                nativeAdData: st().string,
                imageUrl: st().string,
                referralUrl: st().string,
                isPlayable: st().bool
            }).isRequired,
            translate: st().func.isRequired
        };
        var mt = pt;
        function vt(e) {
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
        vt.defaultProps = {
            altName: ""
        },
        vt.propTypes = {
            playerId: st().number.isRequired,
            altName: st().string
        };
        var ht = vt;
        function gt(e) {
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
                      , r = ft.joinGameInPlacesList
                      , o = ft.gamePlayIntentInPlacesList
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
            }, r(dt)))
        }
        gt.propTypes = {
            playerData: st().shape({
                presence: st().shape({
                    rootPlaceId: st().number,
                    placeId: st().number,
                    gameId: st().string
                }),
                id: st().number,
                nameForDisplay: st().string
            }).isRequired,
            dismissModal: st().func.isRequired,
            isPlayable: st().bool.isRequired,
            translate: st().func.isRequired
        };
        var yt = gt;
        function bt(e) {
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
                }, X().createElement(ht, {
                    playerId: t,
                    altName: e
                })), X().createElement(yt, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        bt.propTypes = {
            friendsData: st().arrayOf(st().shape({
                presense: st().shape({
                    rootPlaceId: st().number,
                    placeId: st().number,
                    gameId: st().string
                }),
                id: st().number,
                nameForDisplay: st().string
            })).isRequired,
            friendsInGame: st().arrayOf(st().number).isRequired,
            dismissModal: st().func.isRequired,
            isPlayable: st().bool.isRequired,
            translate: st().func.isRequired
        };
        var It = bt;
        function St(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(ut);
            return X().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, X().createElement(ye.Modal.Header, {
                title: e,
                onClose: o
            }), X().createElement(mt, {
                game: r,
                translate: i
            }), X().createElement(It, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        St.propTypes = {
            friendsData: st().arrayOf(st().shape({
                presense: st().shape({
                    rootPlaceId: st().number,
                    placeId: st().number,
                    gameId: st().string
                }),
                id: st().number,
                nameForDisplay: st().string
            })).isRequired,
            friendsInGame: st().arrayOf(st().number).isRequired,
            game: st().shape({
                universeId: st().number,
                placeId: st().number,
                name: st().string,
                playerCount: st().number,
                isShowSponsoredLabel: st().bool,
                nativeAdData: st().string,
                imageUrl: st().string,
                referralUrl: st().string,
                isPlayable: st().bool
            }).isRequired,
            dismissModal: st().func.isRequired,
            translate: st().func.isRequired
        };
        var Ct = St
          , oe = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (te = function(e) {
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
        var wt = te
          , Et = function() {
            return (Et = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Pt = ((Zn = {})[K.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Zn[K.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        Zn[K.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Zn[K.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        Zn[K.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        Zn)
          , xt = Et(Et({}, Pt), ((fr = {})[K.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        fr))
          , Tt = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function kt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return X().createElement($.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && X().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + ze(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return X().createElement(At, {
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
        function Ot(e) {
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
        function _t(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = ge()("game-card-image-pill", {
                "hover-only": e === L.Hover
            });
            return X().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, X().createElement(Ot, {
                playerCount: t
            }))
        }
        (pr = function(e) {
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
        var At = pr;
        function Nt(e) {
            return e = e.featureTypes,
            X().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, e.map(function(e) {
                return Rt[e] && X().createElement("span", {
                    key: e,
                    className: Rt[e]
                })
            })))
        }
        _t.defaultProps = {
            playerCountStyle: void 0
        };
        var Rt = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        };
        function Lt(e) {
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
            }, X().createElement(Dt, {
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
        (Wi = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = We(t);
            return e ? X().createElement(kt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? X().createElement(Nt, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== L.Always && n !== L.Hover ? null : X().createElement(_t, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Dt = Wi
          , Mt = function() {
            return (Mt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ft = $e.keyBoardEventCode
          , Ut = $e.numberOfInGameAvatarIcons
          , Bt = $e.numberOfInGameNames;
        function Gt(e) {
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
        function Ht(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = $e.RatingPercentageText
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
        function zt(e) {
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
        function Wt(e) {
            return e = e.footerText,
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, X().createElement("span", {
                className: "info-label"
            }, e))
        }
        function Vt(e) {
            return e = e.translate,
            X().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, X().createElement("div", {
                className: "native-ad-label"
            }, e(nt.LabelSponsoredAd), X().createElement(wt, {
                tooltipText: e(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            })))
        }
        function qt(e) {
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
        function Jt(e) {
            return e = e.translate,
            X().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, X().createElement(wt, {
                tooltipText: e(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            }), X().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(nt.LabelSponsoredAd)))
        }
        function Kt(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = $e.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > Ut ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? Ut - 1 : Ut
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
                }, X().createElement(qt, {
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
            }, X().createElement(Kt, {
                friendsData: t,
                isOnline: e
            }), X().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function Xt(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            $.useState)(!1)
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
                    width: 22 * (t.slice(0, Ut).length - 1) + 32 + "px"
                }
            }, t.slice(0, Ut).map(function(e) {
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
                        e.code === Ft.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        i(!0))
                    }
                }, X().createElement(qt, {
                    user: e
                }))
            })), r && X().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Bt ? r(nt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Bt
            }) : r(nt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), X().createElement(Yt, {
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
        Lt.defaultProps = {
            page: Y.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        Xt.defaultProps = {
            translate: void 0
        };
        var Yt = (0,
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
            }, X().createElement(Ct, {
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
        }, oe)
          , Zt = function(e, a, l, s) {
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
          , Qt = function(n, r) {
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
        (cs = (0,
        $.forwardRef)(function(e, t) {
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
            $.useState)()
              , v = l[0]
              , h = l[1]
              , u = xe()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            $.useMemo)(function() {
                return G(c, o.universeId)
            }, [c, o.universeId])
              , y = Te(o, d);
            (0,
            $.useEffect)(function() {
                void 0 === v && 0 < g.length && Zt(void 0, void 0, void 0, function() {
                    var t;
                    return Qt(this, function(e) {
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
            }, X().createElement(Lt, {
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
                    return X().createElement(Vt, {
                        translate: m
                    });
                var e = Ve(y);
                return e ? X().createElement(jt, {
                    footerData: e
                }) : 0 < g.length && v ? X().createElement(Xt, {
                    friendData: g,
                    gameData: v
                }) : null != o && o.friendActivityTitle ? X().createElement(Wt, {
                    footerText: o.friendActivityTitle
                }) : X().createElement(Gt, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var en = cs;
        (hs = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = (0,
            $.useState)(void 0)
              , a = i[0]
              , l = i[1]
              , e = (0,
            $.useState)(void 0)
              , i = e[0]
              , s = e[1];
            if ((0,
            $.useEffect)(function() {
                Be(t).then(function(e) {
                    return l(e)
                }).catch(function() {
                    s(!0)
                })
            }, [t]),
            void 0 === a && !i)
                return X().createElement(nn, null);
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
        var tn = hs
          , nn = function() {
            return X().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function rn(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            $.useMemo)(function() {
                return z(t, n)
            }, [t, n])
              , e = (0,
            $.useMemo)(function() {
                return r === K.EventTile ? qe.ThumbnailGameThumbnailSize.width576 : qe.ThumbnailGameThumbnailSize.width384
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
        function on(e) {
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
        (as = function(e) {
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
                return l ? X().createElement(tn, {
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
        var an = as;
        (lt = X().forwardRef(function(e, t) {
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
            $.useState)(n.placeId)
              , k = i[0]
              , O = i[1];
            (0,
            $.useEffect)(function() {
                u && !Number.isNaN(u) ? O(parseInt(u, 10)) : n.navigationUid && Ue(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && O(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function _() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== K.EventTile ? X().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, X().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            $.useMemo)(function() {
                return U(k, n.name, o(n, r))
            }, [n, o, r, k])
              , v = o(n, r)
              , A = (0,
            $.useMemo)(function() {
                return G(a, n.universeId)
            }, [a, n.universeId])
              , N = (0,
            $.useMemo)(function() {
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
                return (f !== K.GridTile || s === D.Enabled) && ((f !== K.EventTile || s === D.Enabled) && f !== K.InterestTile)
            }
              , b = (0,
            $.useMemo)(function() {
                return null != R && R.title ? R.title : n.name
            }, [n.name, null == R ? void 0 : R.title])
              , e = f !== K.InterestTile
              , E = f !== K.InterestTile
              , i = (0,
            $.useCallback)(function() {
                I && I()
            }, [I]);
            return X().createElement("li", {
                className: ge()("list-item", "hover-game-tile", {
                    "grid-tile": f === K.GridTile
                }, {
                    "event-tile": f === K.EventTile
                }, {
                    "interest-tile": f === K.InterestTile
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
            }, X().createElement(on, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: h,
                linkUrl: c
            }, X().createElement("div", {
                className: "featured-game-icon-container"
            }, X().createElement(rn, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), X().createElement(Dt, {
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
                var e = _();
                if (P && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return X().createElement(Jt, {
                        translate: S
                    });
                e = Ve(R);
                return e ? X().createElement(jt, {
                    footerData: e
                }) : 0 < (null == A ? void 0 : A.length) ? X().createElement($t, {
                    friendsData: A,
                    isOnline: !0
                }) : 0 < (null == N ? void 0 : N.length) ? X().createElement($t, {
                    friendsData: N,
                    isOnline: !1
                }) : n.friendVisitedString ? X().createElement(zt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === L.Footer ? X().createElement(Gt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : X().createElement(Ht, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: S
                })
            }()), X().createElement("div", {
                className: "hover-metadata"
            }, _()))), P && p === M.imageOverlay && g() && X().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, X().createElement(an, {
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
            }, X().createElement(an, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === K.InterestTile && X().createElement(ye.Button, {
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
        var ln = lt
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
        (te = (0,
        $.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = un(e, ["componentType"]);
            switch (n) {
            case K.AppGameTileNoMetadata:
                return X().createElement(en, sn({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case K.GridTile:
            case K.EventTile:
            case K.InterestTile:
                return X().createElement(ln, sn({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return X().createElement(en, sn({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var cn = te
          , dn = (0,
        $.forwardRef)(function(e, t) {
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
                "wide-game-tile-carousel": a === K.GridTile || a === K.EventTile
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
                return X().createElement(cn, {
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
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && re(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            $.useState)(e && "string" == typeof e ? e : A.uuidService.generateRandomUuid())[0];
            return X().createElement(gn.Provider, {
                value: e
            }, t)
        }
        function pn() {
            return (0,
            $.useContext)(gn)
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
            $.useMemo)(function() {
                var e = t && parseInt(t, 10);
                if (e || 0 === e)
                    return e
            }, [t])
              , u = (e = (0,
            $.useState)(void 0 !== s ? s - Math.floor(Date.now() / 1e3) : void 0))[0]
              , c = e[1];
            (0,
            $.useEffect)(function() {
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
            $.useMemo)(function() {
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
            $.useMemo)(function() {
                if (o && i && d) {
                    var e = d.indexOf(yn)
                      , t = d.indexOf(bn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + yn.length, t)
                          , t = d.slice(t + bn.length);
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
        dn.displayName = "GameCarousel";
        var vn = function(t, e, n) {
            var r = (0,
            $.useState)(new Set)
              , o = r[0]
              , i = r[1]
              , r = (0,
            $.useState)(new Set)
              , a = r[0]
              , l = r[1]
              , s = (0,
            $.useRef)(null)
              , u = (0,
            $.useRef)(n);
            (0,
            $.useEffect)(function() {
                u.current = n
            }, [n]);
            var c = (0,
            $.useCallback)(function() {
                se(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), $e.maxTilesInGameImpressionsEvent).filter(function(e) {
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
            $.useEffect)(function() {
                var e, i = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return s.current = x.elementVisibilityService.observeChildrenVisibility({
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
        $.createContext)("")
          , yn = Je.linkStartDelimiter
          , bn = Je.linkEndDelimiter
          , In = WebBlox;
        function Sn(e, t) {
            var n;
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (n = function(e, t) {
                    if (!e)
                        return;
                    if ("string" == typeof e)
                        return Cn(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n)
                        return Array.from(e);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Cn(e, t)
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
        function Cn(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function wn(e, t) {
            if ("function" == typeof e)
                return e(t);
            e && (e.current = t)
        }
        var En = 19 <= parseInt($.version.split(".")[0], 10) ? function(e) {
            return function(r) {
                var o, i = [], t = Sn(e);
                try {
                    for (t.s(); !(o = t.n()).done; )
                        !function() {
                            var e = o.value
                              , t = wn(e, r)
                              , n = "function" == typeof t;
                            i.push(n ? t : function() {
                                return wn(e, null)
                            }
                            )
                        }()
                } catch (e) {
                    t.e(e)
                } finally {
                    t.f()
                }
                return function() {
                    var e, t = Sn(i);
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
                var t, n = Sn(r);
                try {
                    for (n.s(); !(t = n.n()).done; )
                        wn(t.value, e)
                } catch (e) {
                    n.e(e)
                } finally {
                    n.f()
                }
            }
        }
          , Pn = "undefined" != typeof Map ? Map : (Object.defineProperty(Tn.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Tn.prototype.get = function(e) {
            e = xn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Tn.prototype.set = function(e, t) {
            var n = xn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Tn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = xn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Tn.prototype.has = function(e) {
            return !!~xn(this.__entries__, e)
        }
        ,
        Tn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Tn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        Tn);
        function xn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function Tn() {
            this.__entries__ = []
        }
        var kn = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , On = void 0 !== oc.g && oc.g.Math === Math ? oc.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , _n = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(On) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , An = 2
          , Nn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , Rn = "undefined" != typeof MutationObserver
          , Ln = (Dn.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        Dn.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        Dn.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        Dn.prototype.updateObservers_ = function() {
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
        Dn.prototype.connect_ = function() {
            kn && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            Rn ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
        Dn.prototype.disconnect_ = function() {
            kn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        Dn.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Nn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        Dn.getInstance = function() {
            return this.instance_ || (this.instance_ = new Dn),
            this.instance_
        }
        ,
        Dn.instance_ = null,
        Dn);
        function Dn() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                _n(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < An)
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
        var Mn = function(e, t) {
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
          , Fn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || On
        }
          , Un = Wn(0, 0, 0, 0);
        function Bn(e) {
            return parseFloat(e) || 0
        }
        function Gn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Bn(n["border-" + t + "-width"])
            }, 0)
        }
        function Hn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Un;
            var r = Fn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Bn(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Bn(r.width)
              , s = Bn(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Gn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Gn(r, "top", "bottom") + a)),
            (e = e) !== Fn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            Wn(o.left, o.top, l, s)
        }
        var jn = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Fn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Fn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function zn(e) {
            return kn ? jn(e) ? Wn(0, 0, (t = (t = e).getBBox()).width, t.height) : Hn(e) : Un;
            var t
        }
        function Wn(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var Vn = (qn.prototype.isActive = function() {
            var e = zn(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        qn.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        qn);
        function qn(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = Wn(0, 0, 0, 0),
            this.target = e
        }
        var Jn = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            Mn(i, {
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
            Mn(this, {
                target: e,
                contentRect: i
            })
        }
          , Kn = ($n.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Fn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new Vn(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        $n.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Fn(e).Element))
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
                return new Jn(e.target,e.broadcastRect())
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
            this.observations_ = new Pn,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var Xn = new ("undefined" != typeof WeakMap ? WeakMap : Pn)
          , Yn = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = Ln.getInstance()
              , n = new Kn(t,n,this);
            Xn.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            Yn.prototype[t] = function() {
                var e;
                return (e = Xn.get(this))[t].apply(e, arguments)
            }
        });
        var Zn = void 0 !== On.ResizeObserver ? On.ResizeObserver : Yn
          , Qn = oc(4777)
          , er = oc(8550)
          , tr = oc(8601);
        function nr(e, t) {
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
                    return rr(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return rr(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function rr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function or(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function ir(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? or(Object(n), !0).forEach(function(e) {
                    ar(t, e, n[e])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : or(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                })
            }
            return t
        }
        function ar(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function lr(e) {
            var t = e.iconClassName
              , n = e.color
              , r = e.width
              , e = e.iconOverrideStyles
              , e = (r = cr({
                color: n,
                width: r,
                iconOverrideStyles: e || {}
            }).classes).iconBaseStyles
              , r = r.iconOverride;
            return $.createElement("span", {
                className: he(e, r, t),
                "data-testid": "icon-component"
            })
        }
        function sr(e) {
            var t = e.containerClassName
              , n = e.callback
              , r = e.linkPath
              , o = e.ariaLabel
              , i = e.tabIndex
              , a = e.onFocus
              , l = e.onFocusLost
              , s = e.dataTestId
              , u = e.children
              , e = (c = yr({}).classes).linkContainerOverride
              , c = c.buttonContainerOverride;
            return r ? $.createElement("a", {
                href: r,
                onClick: function(e) {
                    e.stopPropagation(),
                    n && n()
                },
                onKeyDown: function(e) {
                    e.code === dr && (e.stopPropagation(),
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
            }, u) : n ? $.createElement("button", {
                type: "button",
                onClick: function(e) {
                    e.stopPropagation(),
                    e.preventDefault(),
                    n()
                },
                onKeyDown: function(e) {
                    e.code === dr && (e.stopPropagation(),
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
            }, u) : $.createElement("div", {
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
        var ur, cr = (0,
        In.makeStyles)()(function(e, t) {
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
                iconOverride: ir({}, t)
            }
        }), dr = "Enter", fr = "{linkStart}", pr = "{linkEnd}", mr = "0.3s", vr = "cubic-bezier(0.45, 0, 0, 1)", hr = {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "start"
        }, gr = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordWrap: "break-word"
        }, yr = (0,
        In.makeStyles)()(function() {
            return {
                linkContainerOverride: {
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "none"
                    },
                    cursor: "pointer"
                },
                buttonContainerOverride: ir({}, hr)
            }
        });
        function br(e) {
            var t, n, r = {};
            return void 0 === e || (void 0 !== e.layoutOrder && (r.order = e.layoutOrder),
            void 0 !== e.anchorPoint && (r.transformOrigin = "".concat(100 * e.anchorPoint.x, "% ").concat(100 * e.anchorPoint.y, "%")),
            void 0 !== e.automaticSize && (e.automaticSize === ur.XY ? (r.width = "auto",
            r.height = "auto") : e.automaticSize === ur.X ? r.width = "auto" : e.automaticSize === ur.Y && (r.height = "auto")),
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
        function Ir(e) {
            return ar({}, "".concat(e.key), e.value)
        }
        function Sr(e, t, n) {
            return ar({}, "&[".concat(e.key, "='").concat(e.value, "']"), ir({
                color: t
            }, n && {
                font: n.Font,
                letterSpacing: n.LetterSpacing,
                fontFamily: n.FontFamily,
                fontWeight: n.FontWeight,
                fontSize: n.FontSize,
                lineHeight: n.LineHeight
            }))
        }
        function Cr(e) {
            var r, t = e.onActivated, n = e.linkPath, o = e.text, i = e.textColor, a = e.fontStyle, l = void 0 === (d = e.gap) ? 0 : d, s = e.iconClassName, u = e.iconWidth, c = e.iconColor, d = void 0 !== (v = e.iconFirst) && v, f = e.containerOverrides, p = e.textOverrides, m = e.iconOverrides, v = (0,
            $.useMemo)(function() {
                return f ? br(f) : {}
            }, [f]), e = (0,
            $.useMemo)(function() {
                return p ? br(p) : {}
            }, [p]), h = (0,
            $.useMemo)(function() {
                return m ? br(m) : {}
            }, [m]), e = (v = Nr({
                gap: l,
                textColor: i,
                fontStyle: a,
                containerOverrideStyles: v,
                textOverrideStyles: e
            }).classes).textIconRow, g = v.textIconRowText, y = v.textOverride, b = v.iconBaseStyles, I = (v = (r = o,
            (0,
            $.useMemo)(function() {
                if (!r)
                    return {
                        parsedTextContent: "",
                        cleansedTextLabel: ""
                    };
                var e = r.indexOf(Or)
                  , t = r.indexOf(_r);
                if (-1 !== e && -1 !== t && e < t) {
                    var n = r.slice(0, e)
                      , e = r.slice(e + Or.length, t)
                      , t = r.slice(t + _r.length);
                    return {
                        parsedTextContent: $.createElement($.Fragment, null, n, $.createElement("b", null, $.createElement("u", null, e)), t),
                        cleansedTextLabel: "".concat(n).concat(e).concat(t)
                    }
                }
                return {
                    parsedTextContent: r,
                    cleansedTextLabel: r
                }
            }, [r]))).parsedTextContent, o = v.cleansedTextLabel, v = (0,
            $.useMemo)(function() {
                return $.createElement("span", ir({
                    className: he(g, y),
                    "data-testid": "text-icon-row-text"
                }, Ir(Ar)), I)
            }, [I, g, y]), a = a.LineHeight * a.FontSize, S = null != c ? c : i, C = null != u ? u : a, a = (0,
            $.useMemo)(function() {
                return s ? $.createElement(lr, {
                    iconClassName: he(b, s),
                    color: S,
                    width: C,
                    iconOverrideStyles: h
                }) : null
            }, [S, C, b, s, h]), a = d ? $.createElement($.Fragment, null, a, v) : $.createElement($.Fragment, null, v, a);
            return $.createElement(sr, {
                containerClassName: e,
                callback: t,
                linkPath: n,
                ariaLabel: o,
                dataTestId: "text-icon-row"
            }, a)
        }
        function wr(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.textColor
              , o = e.titleFontStyle
              , i = e.subtitleFontStyle
              , a = void 0 === (a = e.subtitleMaxLines) ? 1 : a
              , e = e.textGap
              , e = Rr({
                subtitleMaxLines: a,
                subtitleFontStyle: i,
                textColor: r,
                textGap: void 0 === e ? 0 : e
            }).classes;
            return $.createElement("div", {
                className: e.attributionTextContentContainer,
                "data-testid": "attribution-text-content-container"
            }, $.createElement(Cr, {
                text: t,
                fontStyle: o,
                textColor: r
            }), n && $.createElement("span", ir({
                className: e.attributionSubtitle
            }, Ir(Ar)), n))
        }
        function Er(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.textColor
              , o = e.height
              , i = e.imageComponent
              , a = e.rightButtonContent
              , l = e.titleFontStyle
              , s = e.subtitleFontStyle
              , u = e.subtitleMaxLines
              , c = e.titleSubtitleGap
              , e = (d = Lr({
                height: o
            }).classes).attributionRowContainer
              , o = d.attributionRowThumbnailContainer
              , d = d.attributionRowButtonContainer;
            return $.createElement("div", {
                className: e
            }, i && $.createElement("div", {
                className: o
            }, i), $.createElement(wr, {
                title: t,
                subtitle: n,
                textColor: r,
                titleFontStyle: l,
                subtitleFontStyle: s,
                subtitleMaxLines: u,
                textGap: c
            }), a && $.createElement("div", {
                className: d
            }, a))
        }
        function Pr(e) {
            var t = e.scrollArrowClassName
              , n = e.scrollIconClassName
              , r = e.handleClick;
            return $.createElement("div", {
                "data-testid": "carousel-scroll-arrow",
                className: t,
                onClick: r,
                onKeyDown: function(e) {
                    e.code === dr && (e.stopPropagation(),
                    e.preventDefault(),
                    r())
                },
                role: "button",
                tabIndex: 0
            }, $.createElement("span", {
                className: n,
                "data-testid": "carousel-scroll-arrow-icon"
            }))
        }
        function xr(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , o = e.onScrollForward
              , i = e.scrollBackArrowClassName
              , e = e.scrollForwardArrowClassName;
            return $.createElement($.Fragment, null, !t && $.createElement(Pr, {
                scrollArrowClassName: i,
                scrollIconClassName: "icon-chevron-heavy-left",
                handleClick: r
            }), !n && $.createElement(Pr, {
                scrollArrowClassName: e,
                scrollIconClassName: "icon-chevron-heavy-right",
                handleClick: o
            }))
        }
        function Tr() {
            var e = (r = nr((0,
            $.useState)(void 0), 2))[0]
              , n = r[1]
              , t = (0,
            $.useCallback)(function(e) {
                var t = null == e || null === (t = e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                void 0 !== t && n(t)
            }, [])
              , r = (0,
            $.useCallback)(function(e) {
                e && e[0] && e[0].target && t(e[0].target)
            }, [t])
              , o = (0,
            $.useRef)(new Dr(r))
              , r = (0,
            $.useCallback)(function(e) {
                e && null != o && o.current && (t(e),
                o.current.disconnect(),
                o.current.observe(e))
            }, [t]);
            return (0,
            $.useEffect)(function() {
                var e = o.current;
                return function() {
                    e && e.disconnect()
                }
            }, []),
            [r, e]
        }
        (Wi = ur = ur || {}).None = "None",
        Wi.X = "X",
        Wi.Y = "Y",
        Wi.XY = "XY";
        var kr, Or = fr, _r = pr, Ar = {
            key: "data-sdui-text",
            value: "true"
        }, Nr = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.gap
              , r = t.textColor
              , o = t.fontStyle
              , i = t.containerOverrideStyles
              , t = t.textOverrideStyles;
            return {
                textIconRow: ir({
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
                textIconRowText: ir(ir({}, gr), Sr(Ar, r, o)),
                textOverride: ir({
                    flexShrink: 1,
                    minWidth: 0
                }, t),
                iconBaseStyles: {
                    flexShrink: 0
                }
            }
        }), Rr = (0,
        In.makeStyles)({
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
                attributionSubtitle: ir({
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "140%",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: n,
                    WebkitBoxOrient: "vertical"
                }, Sr(Ar, o, r))
            }
        }), Lr = (0,
        In.makeStyles)()(function(e, t) {
            t = t.height;
            return {
                attributionRowContainer: {
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: t ? "".concat(t, "px") : "auto"
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
        }), Dr = "undefined" != typeof window && window.ResizeObserver ? window.ResizeObserver : Zn;
        function Mr(e, t, n) {
            var r = (u = Kr[e]).minItemWidth
              , o = u.minItemCount
              , i = u.maxItemCount
              , a = u.fractionalItemAmount
              , l = (0,
            $.useMemo)(function() {
                return null != n && n.columnGap ? n.columnGap : t ? t < 1024 ? 12 : t < 1280 ? 18 : 24 : 18
            }, [null == n ? void 0 : n.columnGap, t])
              , s = null !== (e = null == n ? void 0 : n.sideMargin) && void 0 !== e ? e : 0
              , u = (0,
            $.useMemo)(function() {
                if (t) {
                    var e = t - 2 * s
                      , e = Math.floor((e + l) / (r + l));
                    return Math.min(Math.max(o, e), i)
                }
                return o
            }, [t, o, i, r, l, s]);
            return {
                numColumns: null !== (e = null == n ? void 0 : n.numColumns) && void 0 !== e ? e : u,
                fractionalItemAmount: null !== (u = null == n ? void 0 : n.fractionalItemAmount) && void 0 !== u ? u : a,
                columnGap: l,
                sideMargin: s
            }
        }
        function Fr(e) {
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
              , f = e.thresholdFromEnd
              , p = e.onReachedThresholdFromEnd
              , m = e.reportHorizontalScrollTelemetry
              , v = (I = nr(Tr(), 2))[0]
              , h = I[1]
              , g = (e = Mr(o, h, null != a ? a : {})).numColumns
              , y = e.fractionalItemAmount
              , b = e.columnGap
              , I = e.sideMargin;
            (0,
            $.useEffect)(function() {
                i && i(g)
            }, [i, g]);
            var S = u && n.length > g
              , o = (0,
            $.useMemo)(function() {
                if (h && 0 < g) {
                    var e = S ? g + y : g;
                    return (h - (null != b ? b : 0) * (Math.ceil(e) - 1)) / e
                }
                return 0
            }, [h, S, g, y, b])
              , e = (a = function(n, o, i, a, l, s, r, u, c) {
                var t = (0,
                $.useRef)(0)
                  , d = (0,
                $.useRef)(null)
                  , e = nr((0,
                $.useState)(!1), 2)
                  , f = e[0]
                  , p = e[1]
                  , m = nr((0,
                $.useState)(!1), 2)
                  , v = m[0]
                  , h = m[1]
                  , g = nr((0,
                $.useState)(!1), 2)
                  , y = g[0]
                  , b = g[1]
                  , I = (0,
                $.useRef)(!1)
                  , S = (0,
                $.useCallback)(function(e) {
                    return t.current = e < 0 ? 0 : s - a < e ? s - a : e,
                    t.current
                }, [s, a])
                  , C = (0,
                $.useCallback)(function(e) {
                    var t;
                    n && u && d.current && i && (t = Math.max(null != r ? r : 0, 3 * i),
                    e + i >= d.current.scrollWidth - t ? I.current || (u(),
                    I.current = !0) : I.current = !1)
                }, [u, d, i, r, n])
                  , w = (0,
                $.useCallback)(function(e, t) {
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
                $.useEffect)(function() {
                    n && w(t.current, !1)
                }, [w, n]);
                var E = (0,
                $.useCallback)(function() {
                    var e = S(t.current + a);
                    w(e, !0)
                }, [S, w, a])
                  , P = (0,
                $.useCallback)(function() {
                    var e = S(t.current - a);
                    w(e, !0)
                }, [S, w, a])
                  , x = (0,
                $.useCallback)(function(e) {
                    y || (b(!0),
                    e(),
                    setTimeout(function() {
                        b(!1)
                    }, 500))
                }, [y])
                  , e = (0,
                $.useCallback)(function() {
                    x(P)
                }, [P, x])
                  , m = (0,
                $.useCallback)(function() {
                    x(E)
                }, [E, x])
                  , g = (0,
                $.useCallback)(function(e) {
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
            }(S, o, h, g, b, n.length, f, p, m)).carouselScrollRef
              , u = a.isScrollBackDisabled
              , f = a.isScrollForwardDisabled
              , p = a.handleScrollBackClick
              , m = a.handleScrollForwardClick
              , C = a.getIsTileVisible
              , s = (I = $r({
                itemWidth: o,
                columnGap: b,
                sideMargin: I,
                gapBetweenHeaderAndItems: s,
                scrollArrowBackgroundColor: c,
                scrollArrowBoxShadowColor: d,
                scrollArrowBaseClassName: a = "scroll-arrow",
                scrollArrowPrevClassName: "prev",
                scrollArrowNextClassName: "next"
            }).classes).collectionCarouselContainer
              , c = I.carouselContainer
              , d = I.carousel
              , w = I.carouselItem;
            return $.createElement("div", {
                className: s
            }, l, $.createElement("div", {
                ref: v,
                className: c
            }, $.createElement("div", {
                ref: En([e, t]),
                className: d
            }, n.map(function(e, t) {
                return $.createElement("div", {
                    key: t,
                    id: "collection-carousel-item",
                    className: w
                }, r(e, t, C(t)))
            })), S && $.createElement(xr, {
                isScrollBackDisabled: u,
                isScrollForwardDisabled: f,
                onScrollBack: p,
                onScrollForward: m,
                scrollBackArrowClassName: he(a, "prev"),
                scrollForwardArrowClassName: he(a, "next")
            })))
        }
        function Ur(e) {
            var t = (l = e.gradient).startColor
              , n = l.endColor
              , r = l.startTransparency
              , o = l.endTransparency
              , i = l.degree
              , e = void 0 === (a = l.heightPercent) ? 1 : a
              , a = void 0 === (a = l.widthPercent) ? 1 : a
              , l = void 0 === (l = l.midpointPercent) ? .5 : l
              , s = (i + 90) % 360
              , u = 1 - r
              , c = 1 - o
              , e = "".concat(100 * e, "%")
              , a = "".concat(100 * a, "%")
              , d = "".concat(100 * l, "%")
              , l = (0,
            $.useMemo)(function() {
                return "linear-gradient(".concat(s, "deg, ").concat(t).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ", ").concat(d, ", ").concat(n).concat(Math.round(255 * c).toString(16).padStart(2, "0"), ")")
            }, [t, n, u, c, s, d])
              , a = Xr({
                linearGradient: l,
                height: e,
                width: a
            }).classes;
            return $.createElement("div", {
                className: a.gradient
            })
        }
        function Br(e) {
            var t = e.avatarThumbnails
              , n = e.iconWidth
              , r = e.avatarContainerBackgroundColor
              , o = e.avatarImageBackgroundColor
              , e = e.avatarBorderColor
              , e = (o = Zr({
                iconWidth: n,
                avatarContainerBackgroundColor: r,
                avatarImageBackgroundColor: o,
                avatarBorderColor: e,
                maxZIndex: t.length
            }).classes).facepileContainer
              , i = o.avatarContainer;
            return $.createElement("div", {
                className: e
            }, t.map(function(e) {
                return $.createElement("div", {
                    key: e.key,
                    className: i
                }, e)
            }))
        }
        function Gr(e) {
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
            $.useMemo)(function() {
                return "linear-gradient(".concat(l, "deg, ").concat(o).concat(Math.round(255 * s).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ")")
            }, [o, i, s, u, l])
              , r = (0,
            In.makeStyles)()(function() {
                return {
                    heroUnitGradient: {
                        bottom: "0px",
                        left: "0px",
                        position: "absolute"
                    }
                }
            })().classes.heroUnitGradient;
            return $.createElement("div", {
                style: {
                    background: n,
                    width: e,
                    height: a
                },
                className: r
            })
        }
        function Hr(e) {
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
              , d = void 0 === (p = e.titleImageAspectRatio) ? 3 : p
              , f = e.titleImageHeightPercentage
              , p = e.minCardHeight
              , c = (e = eo({
                hasTitleImage: !!r,
                forceSmallView: e = void 0 !== c && c <= 414,
                forceMediumView: c = void 0 !== c && c <= 600 && 415 <= c,
                forceSmallOrMediumView: e || c,
                minCardHeight: p,
                titleImageHeightPercentLarge: null != f ? f : .3,
                titleImageHeightPercentCompact: null != f ? f : .25,
                titleImageAspectRatio: d
            }).classes).heroUnitContentContainer
              , p = e.heroUnitTitleContainer
              , f = e.heroUnitTitle
              , d = e.heroUnitSubtitle
              , e = e.heroUnitTitleImageContainer
              , m = (0,
            $.useCallback)(function() {
                null != o && o.current && o.current.style.setProperty("--hero-unit-content-height", "".concat(o.current.getBoundingClientRect().height, "px"))
            }, [o]);
            return (0,
            $.useEffect)(function() {
                var e = null == o ? void 0 : o.current;
                if (e) {
                    m();
                    var t = new ResizeObserver(er(m, 100));
                    return t.observe(e),
                    function() {
                        t.unobserve(e)
                    }
                }
            }, [o, m]),
            t = r ? $.createElement("div", {
                className: e
            }, r) : $.createElement("span", {
                className: f
            }, t),
            $.createElement("div", {
                className: c,
                ref: o
            }, $.createElement(Gr, {
                gradient: i,
                gradientHeightPercent: a,
                gradientWidthPercent: l
            }), u, $.createElement("div", {
                className: p
            }, t, $.createElement("span", {
                className: d
            }, n)), s)
        }
        function jr(e) {
            var t = e.backgroundImageComponent
              , n = e.forceViewportWidth
              , r = e.minCardHeight
              , o = void 0 !== n && n <= 600
              , n = (e = (0,
            In.makeStyles)()(function() {
                return {
                    heroUnitBackgroundWindow: ir(ir({
                        height: "".concat(336, "px"),
                        width: "100%",
                        position: "absolute",
                        top: "24px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "".concat(r, "px")
                    }, o ? {
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
                    heroUnitBackgroundContainer: ir(ir({
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
                    }, o ? {
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
            return $.createElement("div", {
                className: n
            }, $.createElement("div", {
                className: e
            }, t))
        }
        function zr(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.titleImageComponent
              , o = e.foregroundImageComponent
              , i = e.backgroundImageComponent
              , a = e.gradient
              , l = void 0 === (g = e.gradientHeightPercent) ? .5 : g
              , s = void 0 === (x = e.gradientWidthPercent) ? 1 : x
              , u = e.backgroundClickAction
              , c = e.backgroundClickLinkPath
              , d = e.bottomRowComponent
              , f = e.overlayPillComponent
              , p = void 0 === (y = e.minForegroundHeightPercent) ? .8 : y
              , m = void 0 === (P = e.maxForegroundHeightPercent) ? 1 : P
              , v = e.forceViewportWidth
              , h = void 0 === (b = e.titleImageAspectRatio) ? 3 : b
              , g = e.titleImageHeightPercentage
              , y = void 0 === (x = e.minCardHeight) ? 262 : x
              , b = void 0 === (P = e.foregroundAspectRatio) ? 1 : P
              , I = $.useRef(!1)
              , S = (x = nr($.useState(1), 2))[0]
              , C = x[1]
              , e = void 0 !== v && v <= 600
              , w = $.useRef(null)
              , E = $.useRef(null)
              , P = "".concat(Math.round(100 * p), "%")
              , x = "".concat(Math.round(100 * m), "%")
              , p = (m = to({
                forceViewportWidth: v,
                maxForegroundHeightPercentString: x,
                forceSmallOrMediumView: e,
                minForegroundHeightPercentString: P,
                foregroundScaleFactor: 360 * (m - p),
                foregroundAspectRatio: b
            }).classes).heroUnitContainer
              , b = m.heroUnitForegroundContainer
              , m = m.heroUnitTopSpacer
              , T = (0,
            $.useCallback)(function() {
                var e = Qn(.2, 0, .8, 1);
                if (w.current && window.innerHeight) {
                    var t = S;
                    if (!I.current) {
                        var n = w.current.getBoundingClientRect().top + 168;
                        if (n <= 0)
                            return;
                        t = Math.min(n, window.innerHeight) / window.innerHeight,
                        C(t)
                    }
                    n = w.current.getBoundingClientRect(),
                    t = (t - n.top / window.innerHeight) / t,
                    t = e(Math.max(Math.min(t, 1), 0));
                    E.current && (E.current.style.setProperty("--scroll", t.toString()),
                    E.current.style.setProperty("--hero-unit-container-width", "".concat(n.width, "px")))
                }
            }, [w, I, S]);
            return (0,
            $.useEffect)(function() {
                var e = er(T, 100)
                  , t = new MutationObserver(e);
                document.body && !I.current && t.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }),
                T();
                function n() {
                    T(),
                    I.current = !0,
                    t.disconnect()
                }
                return window.addEventListener("scroll", n),
                window.addEventListener("resize", n),
                function() {
                    window.removeEventListener("scroll", n),
                    window.removeEventListener("resize", n),
                    t.disconnect()
                }
            }, [I, T]),
            $.createElement("div", {
                ref: E
            }, $.createElement(sr, {
                containerClassName: p,
                callback: u,
                linkPath: c,
                ariaLabel: t,
                dataTestId: "hero-unit"
            }, $.createElement("div", {
                className: m
            }), $.createElement(jr, {
                backgroundImageComponent: i,
                forceViewportWidth: v,
                minCardHeight: y
            }), $.createElement("div", {
                className: b
            }, o), $.createElement(Hr, {
                title: t,
                subtitle: n,
                titleImageComponent: r,
                heroUnitRef: w,
                gradient: a,
                gradientHeightPercent: l,
                gradientWidthPercent: s,
                bottomRowComponent: d,
                overlayPillComponent: f,
                forceViewportWidth: v,
                titleImageAspectRatio: h,
                titleImageHeightPercentage: g,
                minCardHeight: y
            })))
        }
        function Wr(e) {
            var t = e.pillText
              , e = (n = (0,
            In.makeStyles)()(function() {
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
            return $.createElement("div", {
                className: e
            }, $.createElement("span", {
                className: n
            }, t))
        }
        function Vr(e) {
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
            $.useMemo)(function() {
                return P ? br(P) : {}
            }, [P])
              , e = (w = no({
                verticalGap: w,
                containerOverrideStyles: e
            }).classes).sectionHeader
              , x = w.titleSubtitleContainer
              , T = (0,
            $.useMemo)(function() {
                return d || (void 0 !== n && void 0 !== o && void 0 !== i ? $.createElement(Cr, {
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
              , k = (0,
            $.useMemo)(function() {
                return C || (void 0 !== m && void 0 !== v && void 0 !== h ? $.createElement(Cr, {
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
            $.useMemo)(function() {
                return $.createElement(sr, {
                    containerClassName: x,
                    callback: t,
                    linkPath: r,
                    ariaLabel: n,
                    dataTestId: "section-header-title-subtitle-container"
                }, T, k)
            }, [t, k, T, r, x, n]);
            return $.createElement("div", {
                className: e,
                "data-testid": "section-header"
            }, E, w)
        }
        function qr(e) {
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
            $.useMemo)(function() {
                return d ? br(d) : {}
            }, [d])
              , p = ao({
                padding: c,
                containerOverrideStyles: e
            }).classes
              , m = (0,
            $.useMemo)(function() {
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
            $.useMemo)(function() {
                return oo.map(function(e) {
                    var t = m[e];
                    if (t) {
                        var n = p[e];
                        return $.createElement("div", {
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
            return $.createElement("div", {
                className: p.overlayContainer,
                "data-testid": "slot-overlay-container"
            }, f, e)
        }
        function Jr(e) {
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
              , r = (o = lo({
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
            $.useMemo)(function() {
                return i || (t ? $.createElement("div", {
                    className: c,
                    "data-testid": "tile-title-container"
                }, $.createElement("div", ir({
                    className: d
                }, Ir(Ar)), t)) : null)
            }, [i, t, c, d]);
            return $.createElement("div", {
                className: r
            }, $.createElement("div", {
                className: s
            }, o, a && a), l && $.createElement("div", {
                className: u
            }, l))
        }
        (cs = kr = kr || {}).XSmall = "XSmall",
        cs.Small = "Small",
        cs.Medium = "Medium",
        cs.Large = "Large",
        cs.XLarge = "XLarge";
        var Kr = (ar(hs = {}, kr.XSmall, {
            minItemWidth: 80,
            minItemCount: 3,
            maxItemCount: 20,
            fractionalItemAmount: .15
        }),
        ar(hs, kr.Small, {
            minItemWidth: 150,
            minItemCount: 3,
            maxItemCount: 12,
            fractionalItemAmount: .15
        }),
        ar(hs, kr.Medium, {
            minItemWidth: 233,
            minItemCount: 2,
            maxItemCount: 6,
            fractionalItemAmount: .15
        }),
        ar(hs, kr.Large, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 4,
            fractionalItemAmount: .3
        }),
        ar(hs, kr.XLarge, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 1,
            fractionalItemAmount: .1
        }),
        hs)
          , $r = (0,
        In.makeStyles)()(function(e, t) {
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
                carouselContainer: (ar(o = {
                    position: "relative"
                }, "& .".concat(s), ir(ir(ir({
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
                }), {}, (ar(l = {}, "&.".concat(u), {
                    left: "-10px"
                }),
                ar(l, "&.".concat(t), {
                    right: "-10px"
                }),
                ar(l, "opacity", .9),
                ar(l, "&:hover", {
                    opacity: 1
                }),
                ar(l, "@media (pointer: coarse) and (not (any-pointer: fine))", {
                    display: "none"
                }),
                l))),
                ar(o, "&:hover", ar({}, "& .".concat(s), {
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
          , Xr = ((0,
        In.makeStyles)()(function(e, t) {
            var n = t.itemWidth
              , r = t.columnGap
              , o = t.sideMargin
              , t = t.gapBetweenHeaderAndItems;
            return {
                collectionGridContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(t, "px"),
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
        }),
        (0,
        In.makeStyles)({
            name: "Gradient"
        })(function(e, t) {
            var n = t.linearGradient
              , r = t.height
              , t = t.width;
            return {
                gradient: ir({
                    position: "absolute",
                    bottom: 0,
                    left: 0
                }, n && {
                    width: t,
                    height: r,
                    background: n
                })
            }
        }))
          , Yr = (0,
        In.makeStyles)({
            name: "ImageWithGradient"
        })(function(e, t) {
            var n = t.imageContainerHeight
              , r = t.borderRadius
              , t = t.imageAspectRatio;
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
                    aspectRatio: t,
                    minWidth: "100%",
                    flex: 1
                }
            }
        })
          , Zr = (0,
        In.makeStyles)()(function(e, t) {
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
                avatarContainer: ir(ir({
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
          , Qr = "2px 2px 4px rgba(0, 0, 0, 0.15)"
          , eo = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.hasTitleImage
              , r = t.forceSmallView
              , o = t.forceMediumView
              , i = t.forceSmallOrMediumView
              , a = t.minCardHeight
              , l = t.titleImageHeightPercentLarge
              , s = t.titleImageHeightPercentCompact
              , t = t.titleImageAspectRatio;
            return {
                heroUnitContentContainer: ir(ir({
                    minHeight: "".concat(a, "px"),
                    height: "".concat(336, "px"),
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
                heroUnitTitle: ir(ir(ir(ir({
                    color: "white",
                    position: "relative",
                    textShadow: "".concat(Qr),
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
                heroUnitSubtitle: ir(ir({
                    color: "white",
                    textShadow: "".concat(Qr),
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
                heroUnitTitleImageContainer: ir(ir({
                    height: "calc(var(--hero-unit-content-height) * ".concat(l, ")"),
                    width: "calc(var(--hero-unit-content-height) *".concat(l, " * ").concat(t, ")")
                }, i && {
                    height: "calc(var(--hero-unit-content-height) * ".concat(s, ")"),
                    width: "calc(var(--hero-unit-content-height) *".concat(s, " * ").concat(t, ")")
                }), {}, {
                    "@media (max-width: 600px)": {
                        height: "calc(var(--hero-unit-content-height) * ".concat(s, ")"),
                        width: "calc(var(--hero-unit-content-height) *".concat(s, " * ").concat(t, ")")
                    }
                })
            }
        })
          , to = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.forceViewportWidth
              , r = t.maxForegroundHeightPercentString
              , o = t.forceSmallOrMediumView
              , i = t.minForegroundHeightPercentString
              , a = t.foregroundScaleFactor
              , t = t.foregroundAspectRatio;
            return {
                heroUnitContainer: ir({
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
                heroUnitForegroundContainer: ir(ir({
                    height: r,
                    aspectRatio: "".concat(t),
                    maxHeight: "calc(var(--hero-unit-container-width) / ".concat(t, ")"),
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "0px",
                    "--parallax-scale": "".concat(48),
                    transform: "translateY(calc(var(--parallax-scale) * ((var(--scroll) * -1px) + 1px)))",
                    "@media (prefers-reduced-motion)": {
                        transform: "translateY(0px)"
                    }
                }, o ? {
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
                heroUnitTopSpacer: ir(ir({
                    height: "".concat(24, "px")
                }, o ? {
                    height: "".concat(16, "px")
                } : {}), {}, {
                    "@media (max-width: 600px)": {
                        height: "".concat(16, "px")
                    }
                })
            }
        })
          , no = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.verticalGap;
            return {
                sectionHeader: ir({
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
          , ro = {
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
          , oo = Object.keys(ro)
          , io = {
            background: "transparent",
            width: "auto",
            height: "auto",
            zIndex: 10,
            pointerEvents: "none",
            position: "absolute"
        }
          , ao = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.padding
              , r = t.containerOverrideStyles
              , t = Object.keys(ro).reduce(function(e, t) {
                return e[t] = ir(ir(ir({}, io), {
                    left: "".concat(100 * (t = ro[t]).position.xScale, "%"),
                    top: "".concat(100 * t.position.yScale, "%"),
                    transform: "translate(-".concat(100 * t.anchorPoint.x, "%, -").concat(100 * t.anchorPoint.y, "%)")
                }), {}, {
                    padding: "".concat(n, "px")
                }),
                e
            }, {});
            return ir({
                overlayContainer: ir({
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
          , lo = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.titleHeight
              , r = t.titleLines
              , o = t.titleColor
              , i = t.titleFontStyles
              , a = t.isContained
              , t = t.containmentPadding;
            return {
                tileBottomContentContainer: ir({
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
                tileTitleText: ir(ir({
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }, 1 === r && ir({}, gr)), Sr(Ar, o, i))
            }
        });
        function so(e) {
            var t, n, r = e.isFocused, o = e.imageComponent, i = e.imageAspectRatio, a = e.thumbnailOverlayComponent, l = e.onActivated, s = e.linkPath, u = e.isContained, c = e.containmentPadding, d = e.containmentBackgroundColor, f = e.cornerRadius, p = e.titleText, m = e.titleColor, v = e.titleFont, h = e.titleLines, g = e.titleComponent, y = e.footerComponent, b = e.ctaButtonComponent, I = e.isOnScreen, S = e.placeholderImageBackgroundColor, e = (w = nr((0,
            $.useState)(!1), 2),
            C = w[0],
            t = w[1],
            n = tr(function() {
                t(!0)
            }, 100),
            [C, function() {
                n()
            }
            , function() {
                n.cancel(),
                t(!1)
            }
            ]), C = (w = nr(e, 3))[0], e = w[1], w = w[2], f = (r = fo({
                imageAspectRatio: i,
                isContained: u,
                containmentBackgroundColor: d,
                isFocused: C || r,
                cornerRadius: f,
                placeholderImageBackgroundColor: S
            }).classes).tileContainer, S = r.tileImageContainer, E = r.placeholderImage, r = (0,
            $.useMemo)(function() {
                return o || $.createElement("div", {
                    "data-testid": "placeholder-image",
                    className: E
                })
            }, [o, E]);
            return $.createElement(sr, {
                containerClassName: f,
                callback: l,
                linkPath: s,
                tabIndex: I ? 0 : -1,
                onFocus: e,
                onFocusLost: w,
                ariaLabel: p
            }, $.createElement("div", {
                className: S
            }, r, a), $.createElement(Jr, {
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
        function uo(e) {
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
              , o = (i = po({
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
            $.useMemo)(function() {
                return u || (s ? $.createElement(lr, {
                    iconClassName: s,
                    color: m,
                    width: v
                }) : null)
            }, [s, u, m, v])
              , S = (0,
            $.useMemo)(function() {
                return f || (d ? $.createElement(lr, {
                    iconClassName: d,
                    color: m,
                    width: v
                }) : null)
            }, [d, f, m, v])
              , i = (0,
            $.useMemo)(function() {
                return $.createElement($.Fragment, null, $.createElement("div", {
                    className: h
                }, I && $.createElement("div", {
                    className: b,
                    "data-testid": "left-icon-container"
                }, I), $.createElement("div", ir({
                    className: y
                }, Ir(Ar)), c)), $.createElement("div", {
                    className: g
                }, S && $.createElement("div", {
                    className: b
                }, S), p && $.createElement("div", ir({
                    className: y
                }, Ir(Ar)), p)))
            }, [h, g, y, I, S, c, p, b]);
            return $.createElement(sr, {
                containerClassName: o,
                callback: t,
                linkPath: n,
                ariaLabel: c
            }, i)
        }
        function co(e) {
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
            $.useMemo)(function() {
                if (i)
                    return s ? c.Color.Extended.Gray.Gray_100 : c.Color.Content.Emphasis
            }, [i, s, c.Color.Extended.Gray.Gray_100, c.Color.Content.Emphasis])
              , l = (0,
            $.useMemo)(function() {
                if (d)
                    return s ? "icon-chevron-right-dark" : "icon-chevron-right"
            }, [d, s]);
            return X().createElement("div", {
                className: "home-sort-header-container",
                style: {
                    marginBottom: c.Gap.Large
                }
            }, X().createElement(Vr, {
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
                iconComponent: u ? X().createElement(wt, {
                    tooltipText: u,
                    placement: "left",
                    centerIcon: !0
                }) : void 0,
                containerOverrides: s ? {
                    zIndex: 1
                } : void 0
            }))
        }
        var fo = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.imageAspectRatio
              , r = t.isContained
              , o = t.containmentBackgroundColor
              , i = t.isFocused
              , a = t.cornerRadius
              , t = t.placeholderImageBackgroundColor;
            return {
                tileContainer: ir({
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }, r && ir({
                    borderBottomLeftRadius: "".concat(a, "px"),
                    borderBottomRightRadius: "".concat(a, "px")
                }, o && {
                    backgroundColor: o
                })),
                tileImageContainer: {
                    width: "100%",
                    height: "auto",
                    position: "relative",
                    "&::before": ir(ir({
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
                        transition: "background-color ".concat(mr, " ").concat(vr)
                    }, i && {
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }),
                    "& img": ir({
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
                placeholderImage: ir({
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
          , po = (0,
        In.makeStyles)()(function(e, t) {
            var n = t.textHeight
              , r = t.textColor
              , o = t.gap
              , t = t.fontStyle;
            return {
                tileFooterContainer: ir({
                    display: "flex",
                    alignItems: "center",
                    gap: "".concat(o, "px"),
                    width: "100%",
                    height: n,
                    whiteSpace: "nowrap"
                }, hr),
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
                textClassName: ir(ir({
                    width: "100%",
                    height: "100%"
                }, gr), Sr(Ar, r, t)),
                iconContainer: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center"
                }
            }
        });
        function mo(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            $.useState)("")
              , e = r[0]
              , o = r[1];
            return (0,
            $.useEffect)(function() {
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
        function vo(e) {
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
                    e.code === go.enter && (e.stopPropagation(),
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
        (as = ((0,
        In.makeStyles)({
            name: "VerticalFeed"
        })(function(e, t) {
            var n = t.maxWidth
              , r = t.gapBetweenFeedItems
              , o = t.paddingLeft
              , t = t.paddingRight;
            return {
                verticalFeedContainer: {
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: o ? "".concat(o, "px") : "0px",
                    paddingRight: t ? "".concat(t, "px") : "0px"
                },
                verticalFeedContentContainer: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "".concat(r, "px"),
                    width: "100%",
                    maxWidth: n ? "".concat(n, "px") : "100%"
                }
            }
        }),
        (0,
        In.makeStyles)({
            name: "DetailsPageHeader"
        })(function(e, t) {
            var n = t.backgroundMaxWidth
              , r = t.contentMaxWidth
              , o = t.contentPaddingLeft
              , t = t.contentPaddingRight;
            return {
                detailsPageHeaderContainer: {
                    position: "relative",
                    display: "flex"
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
                    paddingRight: t ? "".concat(t, "px") : "0px",
                    display: "flex",
                    justifyContent: "center"
                },
                contentMaxWidthContainer: {
                    width: "100%",
                    maxWidth: r ? "".concat(r, "px") : "100%"
                }
            }
        }),
        (0,
        In.makeStyles)({
            name: "Page"
        })(function(e, t) {
            t = t.backgroundColor;
            return {
                pageContainer: ir({
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    gap: "24px"
                }, t && {
                    backgroundColor: t
                })
            }
        }),
        function(e) {
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
            $.useMemo)(function() {
                return u || (s ? h(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, h])
              , y = (0,
            $.useMemo)(function() {
                return h(a ? at.LabelLearnMore : it.ActionSeeAll)
            }, [a, h])
              , e = (0,
            $.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = ee.navigateToSortLink(e),
                x.eventStreamService.sendEvent.apply(x.eventStreamService, e))
            }, [a, l]);
            return v ? X().createElement(co, {
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
            }, t), g && X().createElement(wt, {
                tooltipText: g,
                placement: "right"
            })), !d && X().createElement(ye.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, y)), X().createElement(mn, {
                defaultSubtitle: n,
                endTimestamp: f,
                countdownString: p,
                formatSubtitleLink: a || i,
                subtitleLink: o,
                handleSeeAllLinkClick: e,
                backgroundImageAssetId: m
            }))
        }
        )).defaultProps = {
            sortSubtitle: void 0,
            tooltipInfoText: void 0,
            hideSeeAll: void 0,
            endTimestamp: void 0,
            countdownString: void 0,
            buildNavigateToSortLinkEventProperties: void 0,
            backgroundImageAssetId: void 0,
            isNewSortHeaderEnabled: void 0
        };
        var ho = as
          , go = $e.keyBoardEventCode;
        function yo(e) {
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
        function bo(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            $.useRef)(t)
              , s = pn()
              , u = (0,
            $.useMemo)(function() {
                return Ie(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    yo({
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
            $.useEffect)(function() {
                u(t)
            }, [u, t])
        }
        function Io(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = _o({}, t),
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
        function So(e) {
            return "recommendationList"in e
        }
        function Co(e) {
            return "games"in e
        }
        function wo(e) {
            return "filters"in e
        }
        function Eo(e, t) {
            return "recommendationList"in e ? Io(e.recommendationList, t) : Co(e) ? e.games : []
        }
        function Po(e) {
            if (e && Co(e))
                return e.gameSetTargetId
        }
        function xo(e) {
            var t = Po(e);
            return void 0 !== t ? ((e = {})[R.GameSetTargetId] = t,
            e) : {}
        }
        function To(e) {
            if (e = e.find(wo)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function ko(e) {
            var t;
            return e && Co(e) && e.appliedFilters ? ((t = {})[R.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (lt = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , t = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? X().createElement(X().Fragment, null, !r && X().createElement(vo, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && X().createElement(vo, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: t,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : X().createElement(X().Fragment, null, n && r ? null : X().createElement(vo, {
                scrollClassNames: ge()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), X().createElement(vo, {
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
        var Oo = lt
          , _o = function() {
            return (_o = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ao = null !== (te = window.ResizeObserver) && void 0 !== te ? te : Zn
          , No = function() {
            var e = (0,
            $.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            $.useCallback)(function(e) {
                e = null === (e = null == e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                void 0 !== e && n(e)
            }, [])
              , e = (0,
            $.useCallback)(function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }, [r])
              , o = (0,
            $.useRef)(new Ao(e))
              , e = (0,
            $.useCallback)(function(e) {
                e && null != o && o.current && (r(e),
                o.current.disconnect(),
                o.current.observe(e))
            }, [r]);
            return (0,
            $.useEffect)(function() {
                return function() {
                    null != o && o.current && o.current.disconnect()
                }
            }, []),
            [e, t]
        }
          , Ro = et.numGameCarouselLookAheadWindows
          , Lo = et.gameTileGutterWidth
          , Do = et.wideGameTileGutterWidth
          , Mo = et.scrollerWidth
          , Fo = tt.wideTileHoverGrowWidthPx;
        (Wi = function(e) {
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
            $.useRef)(null)
              , P = (0,
            $.useState)(0)
              , x = P[0]
              , T = P[1]
              , k = (0,
            $.useState)(!1)
              , O = k[0]
              , _ = k[1]
              , e = (0,
            $.useState)(!0)
              , A = e[0]
              , N = e[1]
              , P = (0,
            $.useState)(!0)
              , R = P[0]
              , L = P[1]
              , k = (0,
            $.useState)(0)
              , D = k[0]
              , M = k[1]
              , F = (0,
            $.useMemo)(function() {
                return u === K.GridTile || u === K.EventTile
            }, [u])
              , U = (0,
            $.useMemo)(function() {
                return F ? Do : Lo
            }, [F])
              , e = No()
              , P = e[0]
              , B = e[1]
              , k = No()
              , e = k[0]
              , G = k[1]
              , H = (0,
            $.useMemo)(function() {
                if (F && f)
                    return f;
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== G && void 0 !== e ? Math.max(1, Math.floor((G + U) / (e + U))) : 0
            }, [G, U, f, F]);
            (0,
            $.useEffect)(function() {
                N(0 <= D),
                s || void 0 !== G && void 0 !== B && Math.abs(D) + G + Fo >= B ? L(!0) : L(!1)
            }, [D, G, B, null == t ? void 0 : t.length, s]);
            var j = (0,
            $.useCallback)(function() {
                x + Ro * H >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [x, H, l, s, null == t ? void 0 : t.length])
              , z = (0,
            $.useCallback)(function() {
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(H) * (e + U)
            }, [H, U])
              , W = (0,
            $.useCallback)(function() {
                var t;
                A || (t = z(),
                M(function(e) {
                    return Math.min(e + t, 0)
                }),
                T(function(e) {
                    return e - H
                }))
            }, [z, A, H])
              , V = (0,
            $.useCallback)(function() {
                var n;
                R || (n = z(),
                M(function(e) {
                    if (b && o === Y.HomePage)
                        return void 0 !== B && void 0 !== G ? Math.max(e - n, -1 * (B - G)) : e - n;
                    if (void 0 === B)
                        return e - n;
                    var t = S && A ? Mo : 0;
                    return Math.max(e - n, -1 * B) + t
                }),
                T(function(e) {
                    return e + H
                }),
                j())
            }, [R, z, j, b, o, B, G, S, A, H])
              , q = (0,
            $.useCallback)(function(e) {
                return x <= e && e < x + H
            }, [x, H])
              , J = (0,
            $.useCallback)(function(e) {
                O || (_(!0),
                e(),
                setTimeout(function() {
                    _(!1)
                }, 200))
            }, [O])
              , k = (0,
            $.useRef)(null);
            bo({
                scrollPosition: -D,
                page: o,
                gameSetTypeId: C,
                gameSetTargetId: Po(n),
                wrapperRef: k,
                sortPosition: r
            });
            r = (0,
            $.useMemo)(function() {
                return ge()({
                    "hlist games game-cards game-tile-list": !F,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": F,
                    "games-page-carousel": o === Y.GamesPage,
                    "home-page-carousel": o === Y.HomePage
                })
            }, [F, o]);
            return X().createElement("div", {
                "data-testid": "game-carousel",
                ref: k,
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
                return F ? X().createElement(cn, {
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
                }, X().createElement(cn, {
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
            }))), X().createElement(Oo, {
                hideScrollBackWhenDisabled: S,
                isScrollBackDisabled: A,
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
        var Uo = Wi
          , Bo = function() {
            return (Bo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (fr = function(e) {
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
            $.useRef)(null)
              , x = (0,
            $.useRef)(null)
              , T = pn()
              , k = (0,
            $.useCallback)(function(e) {
                if (void 0 !== o && void 0 !== y) {
                    var t = e.filter(function(e) {
                        return e < (null == o ? void 0 : o.length)
                    });
                    return Bo(Bo(Bo(Bo(Bo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return o[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return o[e].universeId
                    }),
                    e), W(o, i.topicId, t, l)), q(o, i.topicId, t, l)), j(o, t)), J(y, null == o ? void 0 : o.length, null == o ? void 0 : o.length, t)), ((e = {})[R.NavigationUids] = t.map(function(e) {
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
            vn(P, o.length, k),
            (0,
            $.useEffect)(function() {
                S && g && null != P && P.current && P.current.style.setProperty("--items-per-row", g.toString())
            }, [S, g]);
            var O = (0,
            $.useMemo)(function() {
                return v ? A.urlService.getAbsoluteUrl(v) : N(i.topic, Y.HomePage, {
                    position: a,
                    sortId: i.topicId,
                    page: Y.HomePage,
                    treatmentType: i.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, a, i.topic, i.topicId, i.treatmentType, v])
              , _ = (0,
            $.useMemo)(function() {
                return h || O
            }, [h, O])
              , e = (0,
            $.useCallback)(function() {
                var e;
                if (v)
                    return (e = {})[R.LinkPath] = v,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = i.topicId,
                    e[R.Page] = Y.HomePage,
                    e[F.HomePageSessionInfo] = T,
                    e
            }, [T, a, v, i.topicId]);
            return X().createElement(mo, {
                backgroundImageAssetId: null !== (k = i.topicLayoutData) && void 0 !== k && k.backgroundImageAssetId ? parseInt(null === (k = i.topicLayoutData) || void 0 === k ? void 0 : k.backgroundImageAssetId, 10) : void 0
            }, X().createElement(ho, {
                sortTitle: i.topic,
                sortSubtitle: i.subtitle,
                seeAllLink: O,
                subtitleLink: _,
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
            }), C ? X().createElement(Uo, {
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
            }) : X().createElement(dn, {
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
        var Go = fr
          , Ho = function() {
            return (Ho = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , jo = function(e, a, l, s) {
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
          , zo = function(n, r) {
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
        function Wo() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = Ho(Ho({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(Ho({}, l.current))
            }
            var e = this
              , t = (0,
            $.useState)({})
              , n = t[0]
              , a = t[1]
              , l = (0,
            $.useRef)(n);
            return (0,
            $.useEffect)(function() {
                return jo(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return zo(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (n = ke.deviceMeta.getDeviceMeta()) ? void 0 : n.deviceType) !== ke.deviceMeta.DeviceTypes.computer || null === T.CurrentUser || void 0 === T.CurrentUser || !T.CurrentUser.isAuthenticated)
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
                                return n && (e[t.id] = Ho(Ho({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(Ho({}, l.current)),
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
        function Vo() {
            var e = (0,
            $.useContext)(qo);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var qo = (0,
        $.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Jo = function() {
            return (Jo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (pr = function(e) {
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
            $.useRef)(null)
              , g = pn()
              , e = (0,
            $.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Jo(Jo(Jo(Jo(Jo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), j(r, t)), ((e = {})[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = o.topicId,
                    e)), xo(o)), ko(o)), ((e = {})[R.Page] = i,
                    e[R.NumberOfLoadedTiles] = (r || []).length,
                    e[F.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            vn(h, r.length, e),
            (0,
            $.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            $.useMemo)(function() {
                var e = Jo(Jo(((e = {})[R.Position] = a,
                e[R.GameSetTypeId] = o.topicId,
                e), xo(o)), ((t = {})[R.Page] = i,
                t[R.TreatmentType] = w.Carousel,
                t[F.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (Co(e) && e.appliedFilters) {
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
                return N(o.sortId, i, e, m, t)
            }, [g, i, a, o, m]);
            return X().createElement("div", {
                className: ge()("games-list-container", {
                    "wide-game-tile-container": c === K.GridTile || c === K.EventTile
                })
            }, X().createElement(ho, {
                sortTitle: o.topic,
                sortSubtitle: o.subtitle,
                subtitleLink: v || e,
                seeAllLink: e,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!v,
                shouldShowSponsoredTooltip: o.topicId === Ke.adSortDiscoverId,
                tooltipInfoText: s,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: u,
                translate: t
            }), X().createElement(Uo, {
                gamesContainerRef: h,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                sortId: o.topicId,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Jo(Jo(Jo(Jo(((n = {})[R.PlaceId] = e.placeId,
                    n[R.UniverseId] = e.universeId,
                    n[R.IsAd] = e.isSponsored,
                    n[R.NativeAdData] = e.nativeAdData,
                    n[R.Position] = t,
                    n[R.SortPos] = a,
                    n[R.GameSetTypeId] = o.topicId,
                    n), xo(o)), ((n = {})[R.NumberOfLoadedTiles] = (r || []).length,
                    n[R.Page] = i,
                    n)), ko(o)), ((n = {})[F.DiscoverPageSessionInfo] = g,
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
        var Ko = pr
          , $o = (0,
        $.createContext)(void 0)
          , Xo = function() {
            return (Xo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (cs = function(e) {
            var t = e.translate
              , r = e.sort
              , o = e.positionId
              , n = e.itemsPerRow
              , i = e.gameData
              , a = (0,
            $.useContext)($o)
              , l = (0,
            $.useRef)(null)
              , s = Wo()
              , u = (0,
            $.useMemo)(function() {
                return Ye
            }, [])
              , c = (0,
            $.useCallback)(function(e, t) {
                var n;
                return Xo(Xo(((n = {})[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = o,
                n[R.NumberOfLoadedTiles] = i.length,
                n[R.GameSetTypeId] = u,
                n), xo(r)), ((n = {})[R.Page] = Y.SearchLandingPage,
                n[F.SearchLandingPageSessionInfo] = a,
                n[R.PlayContext] = Y.SearchLandingPage,
                n))
            }, [o, i.length, u, r, a])
              , e = (0,
            $.useCallback)(function(e) {
                var t = e.filter(function(e) {
                    return e < i.length
                });
                return Xo(Xo(Xo(Xo(Xo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.placeId
                }),
                e[R.UniverseIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.universeId
                }),
                e), W(i, u, t)), q(i, u, t)), j(i, t)), xo(r)), ((e = {})[R.AbsPositions] = t,
                e[R.SortPos] = o,
                e[R.NumberOfLoadedTiles] = i.length,
                e[R.GameSetTypeId] = u,
                e[R.Page] = Y.SearchLandingPage,
                e[F.SearchLandingPageSessionInfo] = a,
                e))
            }, [i, r, o, a, u]);
            return vn(l, i.length, e),
            X().createElement(X().Fragment, null, X().createElement(ho, {
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
            }), X().createElement(Uo, {
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
        var Yo = cs;
        function Zo(e) {
            var t = e.sort
              , o = Vo().contentMetadata;
            return 0 === (null == (e = (0,
            $.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, ti)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : X().createElement(T.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function Qo(e) {
            var t = e.loadData
              , n = (0,
            $.useRef)(null)
              , r = (0,
            $.useRef)(null);
            return (0,
            $.useEffect)(function() {
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
        (hs = function(e) {
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
              , e = Wo()
              , m = Vo().contentMetadata
              , v = d || o === Y.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === K.EventTile
              , f = f || o === Y.HomePage && (null === (h = null == n ? void 0 : n.topicLayoutData) || void 0 === h ? void 0 : h.componentType) === K.EventTile
              , h = (0,
            $.useMemo)(function() {
                var e;
                return v ? Eo(n, m) : u ? Eo(n, m).slice(0, i) : Eo(n, m).slice(0, function(e, t) {
                    var n = Je.maxWideGameTilesPerCarouselPage
                      , r = Je.maxTilesPerCarouselPage;
                    if (e !== Y.GamesPage && e !== Y.SearchLandingPage)
                        switch (t) {
                        case K.GridTile:
                        case K.EventTile:
                        case K.InterestTile:
                            return n;
                        case K.AppGameTileNoMetadata:
                        default:
                            return r
                        }
                }(o, null === (e = n.topicLayoutData) || void 0 === e ? void 0 : e.componentType))
            }, [n, m, o, i, u, v]);
            return 0 === (null == h ? void 0 : h.length) ? null : o === Y.GamesPage ? X().createElement(Ko, {
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
            }) : o === Y.SearchLandingPage ? X().createElement(Yo, {
                key: n.topic,
                sort: n,
                gameData: h,
                translate: t,
                positionId: r,
                itemsPerRow: Ze
            }) : X().createElement(Go, {
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
        var ei = hs
          , ti = Je.maxTilesPerCarouselPage;
        function ni(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            $.useRef)(null);
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
            }, n), a && X().createElement(ri.VerifiedBadgeIconContainer, {
                size: ri.BadgeSizes.CAPTIONHEADER
            }))
        }
        Qo.displayName = "SentinelTile",
        Qo.defaultProps = {
            loadData: null
        };
        var ri = RobloxBadges;
        (as = function(e) {
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
            $.useMemo)(function() {
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
        var oi = as
          , ii = function(e, a, l, s) {
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
          , ai = function(n, r) {
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
          , li = (0,
        $.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.translate
              , a = e.topicId
              , l = (0,
            $.useState)()
              , s = l[0]
              , u = l[1]
              , c = xe()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Wo()
              , l = Te(o, a)
              , m = (0,
            $.useMemo)(function() {
                return G(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            $.useMemo)(function() {
                return 0 < m.length && s ? X().createElement(Xt, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : X().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            $.useEffect)(function() {
                ii(void 0, void 0, void 0, function() {
                    var t;
                    return ai(this, function(e) {
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
            }, X().createElement(Dt, {
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
            }) : X().createElement(Gt, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), X().createElement(oi, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: A.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && X().createElement(ni, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        li.displayName = "FeaturedGridTile";
        var si = function() {
            return (si = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ui = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (lt = (0,
        $.forwardRef)(function(e, t) {
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
              , e = ui(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? X().createElement(li, si({
                ref: t
            }, e)) : X().createElement(cn, si({
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
        lt.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var ci = lt
          , di = (0,
        $.forwardRef)(function(e, t) {
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
                "wide-game-tile-game-grid": c === K.GridTile || c === K.EventTile || c === K.InterestTile
            }, {
                "interest-tile-game-grid": c === K.InterestTile
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
                return X().createElement(ci, {
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
            }), s && X().createElement(Qo, {
                loadData: l
            }))
        });
        di.displayName = "GameGrid",
        di.defaultProps = {
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
        var fi = di
          , pi = function() {
            return (pi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (te = function(e) {
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
            $.useRef)(null)
              , h = (0,
            $.useRef)(null)
              , g = pn()
              , e = (0,
            $.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return pi(pi(pi(pi(pi(pi(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), W(r, o.topicId, t, n)), q(r, o.topicId, t, n)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e)), j(r, t)), J(c, u, null == r ? void 0 : r.length, t)), ((t = {})[R.SortPos] = i,
                    t[R.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[R.GameSetTypeId] = o.topicId,
                    t[R.Page] = Y.HomePage,
                    t[F.HomePageSessionInfo] = g,
                    t))
                }
            }, [r, g, i, o.topicId, n, u, c]);
            return vn(v, r.length, e),
            (0,
            $.useEffect)(function() {
                u && null != v && v.current && v.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            X().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, p ? X().createElement(co, {
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
            }, X().createElement("h2", null, o.topic, o.topicId === Je.adSortHomePageId && X().createElement(wt, {
                tooltipText: m(rt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right"
            }))), X().createElement(di, {
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
        var mi = te
          , vi = Je.sortlessGridMaxTilesMetadataToFetch;
        (Zn = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = e.isNewSortHeaderEnabled
              , u = Wo()
              , c = pn()
              , e = Vo()
              , d = e.contentMetadata
              , f = e.appendContentMetadata
              , p = (0,
            $.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == d ? void 0 : d[t]) && void 0 !== t && t[e])
                });
                0 < e.length && me(e.slice(0, vi), c).then(function(e) {
                    return f(e.contentMetadata)
                }).catch(function() {})
            }, [a, c, d, f]);
            (0,
            $.useEffect)(function() {
                p()
            }, [p]);
            e = (0,
            $.useMemo)(function() {
                return Io(a, d)
            }, [a, d]);
            return 0 === (null == e ? void 0 : e.length) ? null : X().createElement(mi, {
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
        var hi = Zn
          , gi = oc(5250);
        function yi(e) {
            return (yi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function bi(e, t) {
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
        function Ii(t, e, n) {
            var r = (0,
            $.useRef)(new Set)
              , a = (0,
            $.useRef)(new Set)
              , o = (0,
            $.useRef)(null)
              , i = (0,
            $.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a.current).filter(function(e) {
                    return !r.current.has(e)
                }), Ti).filter(function(e) {
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
            $.useMemo)(function() {
                return (0,
                gi.debounce)(function() {
                    return i()
                }, 200)
            }, [i]);
            (0,
            $.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return o.current && (o.current(),
                o.current = null),
                o.current = bi({
                    elements: i,
                    threshold: ki
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
        oc(1315);
        var Si, Ci, wi, Ei, Pi, xi, Ti = 25, ki = .5;
        function Oi(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === yi(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function _i(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , i = "(" + (null != t ? t : 0) + ")"
              , e = r ? T.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : T.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends"
              , n = (r = (0,
            $.useState)(!1))[0]
              , a = r[1];
            return (0,
            $.useEffect)(function() {
                Ui().then(function(e) {
                    a(e)
                }).catch(function(e) {
                    console.error("Error fetching friends rename status:", e)
                })
            }, []),
            n = n || "true" === localStorage.getItem(zi) ? "Label.Connections" : "Heading.Friends",
            X().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? X().createElement("h2", null, o(n)) : X().createElement("h2", null, o(n), X().createElement("span", {
                className: "friends-count"
            }, i)), X().createElement("a", {
                href: e,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        (et = Si = Si || {}).ItemImpressions = "itemImpressions",
        et.ItemAction = "itemAction",
        (Wi = Ci = Ci || {}).Home = "home",
        Wi.UserProfile = "userProfile",
        (fr = wi = wi || {}).HomePageSessionInfo = "homePageSessionInfo",
        fr.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        fr.GameSearchSessionInfo = "gameSearchSessionInfo",
        (pr = Ei = Ei || {}).ContentType = "contentType",
        pr.Context = "context",
        pr.CollectionId = "collectionId",
        pr.CollectionPosition = "collectionPosition",
        (cs = {}).Online = "online",
        cs.InGame = "inGame",
        cs.InStudio = "inStudio",
        cs.Offline = "offline",
        (hs = {}).Friend = "friend",
        hs.NotFriend = "notFriend",
        (as = Pi = Pi || {}).ItemIds = "itemIds",
        as.ItemPositions = "itemPositions",
        as.RowNumbers = "rowNumbers",
        as.FeedRowNumbers = "feedRowNumbers",
        as.PositionsInRow = "positionsInRow",
        as.PositionsInTopic = "positionsInTopic",
        as.TotalNumberOfItems = "totalNumberOfItems",
        (lt = {}).Presences = "presences",
        lt.PresenceUniverseIds = "presenceUniverseIds",
        lt.FriendStatuses = "friendStatuses",
        lt.SourceCarousel = "sourceCarousel",
        (te = xi = xi || {}).ItemId = "itemId",
        te.ItemPosition = "itemPosition",
        te.RowNumber = "rowNumber",
        te.FeedRowNumber = "feedRowNumber",
        te.PositionInRow = "positionInRow",
        te.PositionInTopic = "positionInTopic",
        te.TotalNumberOfItems = "totalNumberOfItems",
        te.ActionType = "actionType",
        (Zn = {}).Presence = "presence",
        Zn.PresenceUniverseId = "presenceUniverseId",
        Zn.FriendStatus = "friendStatus",
        Zn.SourceCarousel = "sourceCarousel";
        var Ai = function() {
            return T.RealTime.Factory.GetClient()
        }
          , Ni = function(e, a, l, s) {
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
          , Ri = function(n, r) {
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
          , Li = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , Di = function(n) {
            return Ni(void 0, void 0, Promise, function() {
                var t;
                return Ri(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: T.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, A.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , Mi = function(m, v) {
            return Ni(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return Ri(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (i = m,
                        Ni(void 0, void 0, Promise, function() {
                            var t;
                            return Ri(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: T.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, A.httpService.get(t)];
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
                        Ni(void 0, void 0, Promise, function() {
                            var t;
                            return Ri(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = T.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
                                    t = {
                                        url: o ? t + "?userSort=1" : t,
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, A.httpService.get(t)];
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
                        f = Li(Li([], d), f),
                        [4, (r = f,
                        Ni(void 0, void 0, Promise, function() {
                            var t, n;
                            return Ri(this, function(e) {
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
                                    [4, A.httpService.post(t, n)];
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
          , Fi = function() {
            return Ni(void 0, void 0, Promise, function() {
                var t;
                return Ri(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: T.EnvironmentUrls.friendsApi + "/v1/my/new-friend-requests/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, A.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data.count]
                    }
                })
            })
        }
          , Ui = function() {
            return Ni(void 0, void 0, Promise, function() {
                var t;
                return Ri(this, function(e) {
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
                        [4, A.httpService.get(t)];
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
          , Bi = function(e, a, l, s) {
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
          , Gi = function(n, r) {
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
          , Hi = T.EnvironmentUrls.chatApi
          , ji = function() {
            return Bi(void 0, void 0, Promise, function() {
                var t;
                return Gi(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, A.httpService.get({
                            url: Hi + "/v1/metadata",
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
          , et = {
            common: ["CommonUI.Features"],
            feature: "Feature.PeopleList"
        }
          , zi = "isFriendsRenamedToConnections"
          , Wi = RobloxPresence
          , Vi = oc.n(Wi);
        function qi(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return X().createElement("div", {
                className: "friend-tile-content"
            }, X().createElement($i, {
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
            }), X().createElement(ri.VerifiedBadgeIconContainer, {
                size: ri.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), X().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && X().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function Ji(e) {
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
                    return Xi(void 0, void 0, void 0, function() {
                        var t;
                        return Yi(this, function(e) {
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
        function Ki(e) {
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
            $.useState)(!1)
              , e = a[0]
              , l = a[1]
              , s = (0,
            $.useRef)(null)
              , u = (0,
            $.useRef)(null);
            return (0,
            $.useEffect)(function() {
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
        (fr = function(e) {
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
                statusIcon: X().createElement(Vi().PresenceStatusIcon, {
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
        var $i = fr
          , Xi = function(e, a, l, s) {
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
          , Yi = function(n, r) {
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
        function Zi(e) {
            return (Zi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Qi(e, t) {
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
        function ea(t, e, n) {
            var r = (0,
            $.useRef)(new Set)
              , a = (0,
            $.useRef)(new Set)
              , o = (0,
            $.useRef)(null)
              , i = (0,
            $.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a.current).filter(function(e) {
                    return !r.current.has(e)
                }), da).filter(function(e) {
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
            $.useMemo)(function() {
                return (0,
                gi.debounce)(function() {
                    return i()
                }, 200)
            }, [i]);
            (0,
            $.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return o.current && (o.current(),
                o.current = null),
                o.current = Qi({
                    elements: i,
                    threshold: fa
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
        oc(6870);
        var ta, na, ra, oa, ia, aa, la, sa, ua, ca, da = 25, fa = .5;
        function pa(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === Zi(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function ma(e, t, n) {
            return t ? ia.InGame : e && "Studio" === n ? ia.InStudio : e ? ia.Online : ia.Offline
        }
        function va(e) {
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
              , m = Vi().usePresence(t.id, void 0)
              , v = null != m && null != m.gameId
              , h = v ? m.lastLocation : null
              , e = null != h && 15 < h.length ? h.slice(0, 15) + "..." : h
              , g = v ? T.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = ga(t, n, a, l, s, u, c, d);
            return X().createElement("div", {
                className: "friends-carousel-tile"
            }, X().createElement(Ki, {
                trigger: X().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, X().createElement(qi, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? X().createElement(Ji, {
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
        (pr = ta = ta || {}).ItemImpressions = "itemImpressions",
        pr.ItemAction = "itemAction",
        (cs = {}).Home = "home",
        cs.UserProfile = "userProfile",
        (hs = na = na || {}).HomePageSessionInfo = "homePageSessionInfo",
        hs.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        hs.GameSearchSessionInfo = "gameSearchSessionInfo",
        (as = ra = ra || {}).ContentType = "contentType",
        as.Context = "context",
        as.CollectionId = "collectionId",
        as.CollectionPosition = "collectionPosition",
        (oa = oa || {}).User = "User",
        (lt = ia = ia || {}).Online = "online",
        lt.InGame = "inGame",
        lt.InStudio = "inStudio",
        lt.Offline = "offline",
        (te = aa = aa || {}).Friend = "friend",
        te.NotFriend = "notFriend",
        (Zn = la = la || {}).ItemIds = "itemIds",
        Zn.ItemPositions = "itemPositions",
        Zn.RowNumbers = "rowNumbers",
        Zn.FeedRowNumbers = "feedRowNumbers",
        Zn.PositionsInRow = "positionsInRow",
        Zn.PositionsInTopic = "positionsInTopic",
        Zn.TotalNumberOfItems = "totalNumberOfItems",
        (Wi = sa = sa || {}).Presences = "presences",
        Wi.PresenceUniverseIds = "presenceUniverseIds",
        Wi.FriendStatuses = "friendStatuses",
        Wi.SourceCarousel = "sourceCarousel",
        (fr = ua = ua || {}).ItemId = "itemId",
        fr.ItemPosition = "itemPosition",
        fr.RowNumber = "rowNumber",
        fr.FeedRowNumber = "feedRowNumber",
        fr.PositionInRow = "positionInRow",
        fr.PositionInTopic = "positionInTopic",
        fr.TotalNumberOfItems = "totalNumberOfItems",
        fr.ActionType = "actionType",
        (pr = ca = ca || {}).Presence = "presence",
        pr.PresenceUniverseId = "presenceUniverseId",
        pr.FriendStatus = "friendStatus",
        pr.SourceCarousel = "sourceCarousel";
        var ha = function() {
            return (ha = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ga = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            $.useCallback)(function() {
                var e, t = {};
                return t[ra.Context] = i,
                t[ra.ContentType] = oa.User,
                t[ra.CollectionId] = l,
                t[ra.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[ua.TotalNumberOfItems] = u,
                t[ua.ActionType] = "OpenProfile",
                t[ua.ItemId] = n.id.toString(),
                t[ua.ItemPosition] = r + 1,
                t[ua.PositionInTopic] = r + 1,
                t[ua.RowNumber] = 1,
                t[ca.Presence] = ma(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[ca.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[ca.FriendStatus] = "friend",
                t[ca.SourceCarousel] = o,
                t[na.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            $.useCallback)(function() {
                var e = t();
                x.eventStreamService.sendEvent({
                    name: ta.ItemAction,
                    type: ta.ItemAction,
                    context: i
                }, pa(ha({}, e)))
            }, [t, i])
        }
          , ya = function() {
            return (ya = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ba = function(e, n, r, o, i, a, l) {
            var t = (0,
            $.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[ra.Context] = o,
                    e[ra.ContentType] = oa.User,
                    e[ra.CollectionId] = a,
                    e[ra.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[la.TotalNumberOfItems] = n.length,
                    e[la.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[la.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[la.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[la.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[sa.Presences] = t.map(function(e) {
                        var t;
                        return ma(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[sa.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[sa.FriendStatuses] = t.map(function() {
                        return aa.Friend
                    }),
                    e[sa.SourceCarousel] = r,
                    e[na.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            $.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? x.eventStreamService.sendEvent({
                    name: ta.ItemImpressions,
                    type: ta.ItemImpressions,
                    context: o
                }, pa(ya({}, e))) : (0,
                P.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            ea(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        };
        function Ia(e) {
            var t = e.translate
              , n = e.badgeCount
              , r = (0,
            $.useState)(!1)
              , e = r[0]
              , o = r[1];
            return (0,
            $.useEffect)(function() {
                Ui().then(function(e) {
                    o(e)
                }).catch(function(e) {
                    console.error("Error fetching friends rename status:", e)
                })
            }, []),
            X().createElement("div", {
                className: "friends-carousel-tile"
            }, X().createElement("button", {
                type: "button",
                id: "friend-tile-button"
            }, X().createElement("a", {
                href: "/users/friends#!/friend-requests"
            }, X().createElement("div", {
                className: "add-friends-icon-container"
            }, 0 < n && X().createElement(In.Badge, {
                className: "friend-request-badge",
                overlap: "rectangular",
                variant: "standard",
                max: 99,
                color: "error",
                badgeContent: n.toString()
            }), X().createElement(In.PlusHeavyIcon, {
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
            }, e || "true" === localStorage.getItem(zi) ? t("Label.Connect") : t("Heading.AddFriends"))))))))
        }
        function Sa(e) {
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
            $.useRef)(null)
              , p = (g = (0,
            $.useState)(n))[0]
              , m = g[1]
              , v = (0,
            $.useState)(!1)
              , e = v[0]
              , h = v[1]
              , g = (0,
            $.useRef)(null);
            return (0,
            $.useEffect)(function() {
                var e = null === (t = f.current) || void 0 === t ? void 0 : t.offsetWidth
                  , t = null !== (t = null == n ? void 0 : n.length) && void 0 !== t ? t : 0;
                h((null != e ? e : 0) < 110 * (t + 1)),
                null != e && null != n && (e = 51,
                m(n.slice(0, e - 1)))
            }, [null === (v = f.current) || void 0 === v ? void 0 : v.offsetWidth, n]),
            ba(g, n, a, l, s, u, c),
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
            }, a === Ca.WebHomeFriendsCarousel && d ? X().createElement(Ia, {
                key: "add-friends-tile",
                translate: o,
                badgeCount: t,
                "data-testid": "add-friends-tile"
            }) : null, p.map(function(e, t) {
                return X().createElement("div", {
                    key: e.id
                }, X().createElement(va, {
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
        (cs = fs = fs || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        cs.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var Ca = fs
          , wa = (T.EnvironmentUrls.friendsApi,
        T.EnvironmentUrls.premiumFeaturesApi,
        T.EnvironmentUrls.usersApi,
        T.EnvironmentUrls.gamesApi,
        T.EnvironmentUrls.contactsApi,
        T.EnvironmentUrls.accountSettingsApi,
        T.EnvironmentUrls.authApi,
        T.EnvironmentUrls.tradesApi,
        T.EnvironmentUrls.apiGatewayUrl)
          , Ea = (T.EnvironmentUrls.chatApi,
        function() {
            return {
                url: "".concat(wa, "/user-blocking-api/v1/users/batch-check-reciprocal-block"),
                withCredentials: !0
            }
        }
        )
          , Pa = function(e, a, l, s) {
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
          , xa = function(n, r) {
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
          , Ta = function(n) {
            return Pa(void 0, void 0, Promise, function() {
                var t;
                return xa(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = parseInt(T.CurrentUser.userId, 10),
                        Number.isNaN(t) || !t ? [2, {
                            users: [{
                                isBlocked: !1,
                                isBlockingViewer: !1,
                                userId: 0
                            }]
                        }] : [4, A.httpService.post(Ea(), {
                            userIds: n,
                            requesterUserId: t
                        })];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ka = T.EnvironmentUrls.apiGatewayUrl
          , Oa = (T.EnvironmentUrls.friendsApi,
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
                url: "".concat(ka, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "")
            }
        }
        );
        function _a(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var Aa = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n, r) {
                var o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return o = n ? btoa(JSON.stringify(n)) : null,
                            o = Oa(t, o, r),
                            e.next = 4,
                            A.httpService.get(o);
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
                        _a(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        _a(r, t, n, o, i, "throw", e)
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
        function Na(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ra(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        Na(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Na(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        var La = function() {
            var e = Ra(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            Aa("MustHideConnections", [{
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
          , Da = function() {
            var e = Ra(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            Ta([parseInt(t, 10)]);
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
          , Ma = function(e, a, l, s) {
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
          , Fa = function(n, r) {
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
          , Ua = "FriendshipNotifications"
          , Ba = "fulfilled";
        function Ga(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = T.CurrentUser.userId) && void 0 !== o ? o : "0");
            return X().createElement("div", {
                className: "friend-carousel-container"
            }, X().createElement(Va, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: Ca.WebHomeFriendsCarousel,
                eventContext: Ci.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function Ha(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = pn();
            return X().createElement(Ga, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
        }
        function ja(e) {
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
        function za(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , o = e.setSelectedOptionId
              , i = e.setIsDropdownOpen
              , a = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , s = e.translate
              , e = (0,
            $.useCallback)(function() {
                a(r),
                i(!1),
                l(t.filterId, b.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            $.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, b.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            $.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            $.useCallback)(function(e) {
                e.key === qa.keyBoardEventCode.escape && u()
            }, [u]);
            return (0,
            $.useEffect)(function() {
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
                }, X().createElement(ja, {
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
        function Wa(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = X().useRef(null)
              , a = (u = (0,
            $.useState)(!1))[0]
              , l = u[1]
              , s = (e = (0,
            $.useState)(r.selectedOptionId))[0]
              , u = e[1]
              , e = (0,
            $.useMemo)(function() {
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
            })), a && X().createElement(za, {
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
        (hs = function(e) {
            var t = e.translate
              , m = e.profileUserId
              , v = e.isOwnUser
              , h = e.carouselName
              , n = e.eventContext
              , r = e.homePageSessionInfo
              , o = e.sortId
              , i = e.sortPosition
              , a = (0,
            $.useState)(null)
              , l = a[0]
              , g = a[1]
              , s = (0,
            $.useState)(null)
              , u = s[0]
              , y = s[1]
              , c = (0,
            $.useState)(!1)
              , d = c[0]
              , b = c[1]
              , e = (0,
            $.useState)(null)
              , a = e[0]
              , I = e[1]
              , s = (0,
            $.useState)(!1)
              , f = s[0]
              , S = s[1]
              , c = (0,
            $.useState)({
                isBadgeEnabled: !1,
                isAddFriendsTileEnabledWeb: !1
            })
              , e = c[0]
              , C = c[1]
              , s = (0,
            In.createCache)()
              , c = (0,
            p.useTheme)();
            return (0,
            $.useEffect)(function() {
                if (f) {
                    var e = function() {
                        return Ma(void 0, void 0, void 0, function() {
                            var t;
                            return Fa(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return e.trys.push([0, 2, , 3]),
                                    [4, Fi()];
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
                      , t = Ai();
                    return t.Subscribe(Ua, e),
                    function() {
                        t.Unsubscribe(Ua, e)
                    }
                }
            }, [f]),
            (0,
            $.useEffect)(function() {
                Ma(void 0, void 0, void 0, function() {
                    var s, u, c, d, f, p;
                    return Fa(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return p = [Di(m), Mi(m, v), ji(), Fi(), (a = m,
                            l = v,
                            Ma(void 0, void 0, void 0, function() {
                                return Fa(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        return l ? [2, !1] : [4, Da(a)];
                                    case 1:
                                        return e.sent() ? [2, !0] : [4, La(a)];
                                    case 2:
                                        return [2, e.sent()]
                                    }
                                })
                            })), Ma(void 0, void 0, Promise, function() {
                                var t;
                                return Fa(this, function(e) {
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
                                        status: Ba,
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
                            s = s.status === Ba ? s.value.count : 0,
                            u = u.status === Ba ? u.value : [],
                            c = c.status === Ba && c.value.chatEnabled,
                            d = d.status === Ba ? d.value : 0,
                            f = f.status === Ba ? f.value : {
                                isBadgeEnabled: !1,
                                isAddFriendsTileEnabledWeb: !1
                            },
                            p = p.status !== Ba || p.value,
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
                            !t && (n !== Ca.WebHomeFriendsCarousel ? 0 !== r : 0 !== r || i && 0 !== o))),
                            [2]
                        }
                        var t, n, r, o, i, a, l
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [m, v]),
            X().createElement(In.CacheProvider, {
                cache: s
            }, X().createElement(In.UIThemeProvider, {
                theme: c,
                cssBaselineMode: "disabled"
            }, f ? X().createElement("div", {
                className: "react-friends-carousel-container"
            }, X().createElement(_i, {
                friendsCount: l,
                translate: t,
                profileUserId: m,
                isOwnUser: v
            }), X().createElement(Sa, {
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
        var Va = (0,
        p.withTranslations)(hs, et)
          , qa = tt
          , Ja = function() {
            return (Ja = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ka = function(i, a, e) {
            var l = pn()
              , t = (0,
            $.useRef)(null)
              , n = (0,
            $.useCallback)(function() {
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
            $.useEffect)(function() {
                return null != e && e.current && (t.current = x.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: $e.filterImpressionsIntersectionThreshold
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
            $.useCallback)(function(e, t, n, r) {
                var o;
                return Ja(((o = {})[R.ButtonName] = t,
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
            $.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = ee.gamesFilterClick(r);
                r && x.eventStreamService.sendEvent.apply(x.eventStreamService, r)
            }, [o])
        };
        (as = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            $.useRef)(null)
              , a = Ka(o, t, e);
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
                return X().createElement(Wa, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = To([o]),
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
        var $a, Xa = as, Ya = "webDiscoverySduiError", Za = "DiscoverySdui_FeedStats";
        function Qa(e, t) {
            try {
                var n = e.sorts
                  , r = e.sdui
                  , o = {}
                  , i = {};
                n.forEach(function(e) {
                    var t;
                    e.topicId && (e.treatmentType === w.Sdui ? (i[e.topicId] = !0,
                    o[e.topicId] = (null !== (t = o[e.topicId]) && void 0 !== t ? t : 0) + function(t, e) {
                        var n = null === (e = null === (n = null == e ? void 0 : e.feed) || void 0 === n ? void 0 : n.props) || void 0 === e ? void 0 : e.feedItems;
                        if (!n || !Array.isArray(n))
                            return 0;
                        var e = n.find(function(e) {
                            return e.feedItemKey === t
                        });
                        return null !== (n = null == e ? void 0 : e.props) && void 0 !== n && n.items && Array.isArray(e.props.items) ? e.props.items.length : null !== (e = null == e ? void 0 : e.props) && void 0 !== e && e.item ? 1 : 0
                    }(e.feedItemKey, r)) : (i[e.topicId] = !1,
                    o[e.topicId] = (null !== (t = o[e.topicId]) && void 0 !== t ? t : 0) + (So(e = e) && e.recommendationList && Array.isArray(e.recommendationList) ? e.recommendationList.length : 0)))
                });
                var a = ((n = {})[F.HomePageSessionInfo] = t,
                n);
                Object.entries(o).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    a[t + "_item_count"] = e,
                    a[t + "_is_sdui"] = i[t] ? 1 : 0
                }),
                x.eventStreamService.sendEvent({
                    name: Za,
                    type: Za,
                    context: Ci.Home
                }, Oi(a))
            } catch (e) {
                (0,
                P.fireEvent)(Je.omniRecommendationFeedStatsLoggingErrorEvent)
            }
        }
        function el(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }
        function tl(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                e = parseInt(e, 10);
                if (!Number.isNaN(e))
                    return e
            }
            return t
        }
        function nl(e, t) {
            if ("boolean" == typeof e)
                return e;
            if ("string" != typeof e)
                return "number" == typeof e ? 1 === e || 0 !== e && (fl($a.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e),
                t) : (fl($a.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined")),
                t);
            var n = e.toLowerCase();
            return "true" === n || "t" === n || "false" !== n && "f" !== n && (fl($a.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e),
            t)
        }
        function rl(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }
        function ol(n) {
            var r = {};
            return Object.keys(n).forEach(function(e) {
                var t = n[e];
                rl(t) ? r[e] = t : fl($a.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + e + ", value: " + JSON.stringify(t) + ", type: " + typeof t)
            }),
            r
        }
        function il(e, t) {
            var n;
            switch (t) {
            case Y.HomePage:
                return (n = {})[wi.HomePageSessionInfo] = e,
                n;
            case Y.GamesPage:
                return (n = {})[wi.DiscoverPageSessionInfo] = e,
                n;
            default:
                return fl($a.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (t ? JSON.stringify(t) : "undefined") + " with session info: " + e),
                {}
            }
        }
        function al(e, t, n) {
            return null != t && t.analyticsData && void 0 !== (null == t ? void 0 : t.analyticsData[e]) && null !== (null == t ? void 0 : t.analyticsData[e]) ? t.analyticsData[e] : null != t && t.ancestorAnalyticsData && void 0 !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) && null !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) ? t.ancestorAnalyticsData[e] : n
        }
        function ll(e, t, n, r, o) {
            return t = ml(ml({}, e), t),
            r = ml(ml({}, t), {
                collectionId: tl(t.collectionId, hl.collectionId),
                collectionPosition: tl(t.collectionPosition, -1),
                contentType: el(t.contentType, hl.contentType),
                itemsPerRow: r,
                totalNumberOfItems: o
            }),
            void 0 === (o = r).collectionId || o.collectionId < 0 || void 0 === o.contentType || void 0 === o.collectionPosition || o.collectionPosition < 0 || void 0 === o.totalNumberOfItems || o.totalNumberOfItems < 0 ? (fl($a.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + n + " is invalid: " + JSON.stringify(r)),
            ml(ml({}, hl), r)) : r
        }
        function sl(e, t, n) {
            return e = ml(ml(ml({}, t), e), n),
            n = ml(ml({}, e), {
                id: el(e.id, vl.id),
                itemPosition: tl(e.itemPosition, vl.itemPosition)
            }),
            void 0 === (e = n).id || e.itemPosition < 0 ? (fl($a.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(n)),
            ml(ml({}, vl), n)) : n
        }
        function ul(e) {
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
            return X().createElement(so, {
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
        function cl(e) {
            var t, n = nl(al("adFlag", e, !1), !1), r = el(al("adId", e, ""), ""), o = tl(al("itemPosition", e, -1), -1), i = null != e && e.getCollectionData ? e.getCollectionData() : void 0, a = null !== (l = null == i ? void 0 : i.collectionPosition) && void 0 !== l ? l : tl(al("collectionPosition", e, -1), -1), l = null !== (s = null == i ? void 0 : i.totalNumberOfItems) && void 0 !== s ? s : tl(al("totalNumberOfItems", e, -1), -1), i = null !== (s = null == i ? void 0 : i.collectionId) && void 0 !== s ? s : tl(al("collectionId", e, -1), -1), s = el(al(wi.HomePageSessionInfo, e, ""), "");
            return Tl(Tl(((e = {})[R.IsAd] = n,
            e), "" !== r && ((t = {})[R.NativeAdData] = r,
            t)), ((t = {})[R.Position] = o,
            t[R.SortPos] = a,
            t[R.NumberOfLoadedTiles] = l,
            t[R.GameSetTypeId] = i,
            t[R.Page] = Y.HomePage,
            t[F.HomePageSessionInfo] = s,
            t))
        }
        (lt = $a = $a || {}).AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
        lt.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
        lt.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
        lt.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
        lt.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
        lt.BuildBaseImpressionParamsInvalidItemsPerRow = "BuildBaseImpressionParamsInvalidItemsPerRow",
        lt.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
        lt.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
        lt.CollectionCarouselMissingItem = "CollectionCarouselMissingItem",
        lt.CollectionCarouselItemMissingComponentType = "CollectionCarouselItemMissingComponentType",
        lt.CollectionCarouselItemsImpressedButMissing = "CollectionCarouselItemsImpressedButMissing",
        lt.CollectionCarouselChildNotReactElement = "CollectionCarouselChildNotReactElement",
        lt.CollectionCarouselHeaderNotReactElement = "CollectionCarouselHeaderNotReactElement",
        lt.ComponentNotFound = "ComponentNotFound",
        lt.FriendsPresenceFetchFailure = "FriendsPresenceFetchFailure",
        lt.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
        lt.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
        lt.InvalidMinWidthConditionValue = "InvalidMinWidthConditionValue",
        lt.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
        lt.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
        lt.InvalidParsedMinWidthConditionValue = "InvalidParsedMinWidthConditionValue",
        lt.InvalidPresenceConditionValue = "InvalidPresenceConditionValue",
        lt.InvalidPresenceUpdateEvent = "InvalidPresenceUpdateEvent",
        lt.NestedPropParseFailure = "NestedPropParseFailure",
        lt.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
        lt.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
        lt.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
        lt.PropParseFailure = "PropParseFailure",
        lt.PropParserNotFound = "PropParserNotFound",
        lt.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
        lt.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
        lt.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
        lt.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
        lt.SduiActionOpenSeeAllInvalidCollectionId = "SduiActionOpenSeeAllInvalidCollectionId",
        lt.SduiActionOpenSeeAllInvalidCollectionName = "SduiActionOpenSeeAllInvalidCollectionName",
        lt.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
        lt.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
        lt.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
        lt.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
        lt.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
        lt.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
        lt.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
        lt.SduiParseAutomaticSizeInvalidInput = "SduiParseAutomaticSizeInvalidInput",
        lt.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
        lt.SduiParseColorValueInvalidInput = "SduiParseColorValueInvalidInput",
        lt.SduiParseFoundationTokenInvalidInput = "SduiParseFoundationTokenInvalidInput",
        lt.SduiParseFoundationTokenInvalidInputPath = "SduiParseFoundationTokenInvalidInputPath",
        lt.SduiParseFoundationTokenInvalidOutputType = "SduiParseFoundationTokenInvalidOutputType",
        lt.SduiParseFoundationTokenMissingTokens = "SduiParseFoundationTokenMissingTokens",
        lt.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
        lt.SduiParseIconInvalidInput = "SduiParseIconInvalidInput",
        lt.SduiParseUDim2InvalidInput = "SduiParseUDim2InvalidInput",
        lt.SduiParseVector2InvalidInput = "SduiParseVector2InvalidInput",
        lt.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
        lt.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
        lt.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
        lt.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
        lt.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
        lt.TemplateResolutionCircularReference = "TemplateResolutionCircularReference",
        lt.TemplateResolutionComponentTypeMismatch = "TemplateResolutionComponentTypeMismatch",
        lt.TemplateResolutionTemplateNotFound = "TemplateResolutionTemplateNotFound",
        lt.UnsupportedConditionalPropsCondition = "UnsupportedConditionalPropsCondition",
        lt.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
        lt.UnknownPresenceConditionKey = "UnknownPresenceConditionKey",
        lt.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey";
        var dl, fl = function(e, t) {
            (0,
            P.fireEvent)(e);
            t = {
                errorName: e,
                errorMessage: t
            };
            x.eventStreamService.sendEvent({
                name: Ya,
                type: Ya,
                context: Ci.Home
            }, Oi(t))
        }, pl = function() {
            return (pl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, te = function(e) {
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
              , f = e.badgeText
              , p = e.asset
              , m = e.ctaButtonComponent
              , v = e.minForegroundHeightPercent
              , h = e.maxForegroundHeightPercent
              , g = e.titleImageAspectRatio
              , y = e.titleImageHeightPercentage
              , b = e.minCardHeight
              , I = e.foregroundAspectRatio
              , S = e.children
              , C = (0,
            $.useMemo)(function() {
                var e = t.dependencies.tokens;
                return p ? X().createElement(Er, {
                    title: p.title,
                    titleFontStyle: e.Typography.TitleMedium,
                    subtitle: p.subtitle,
                    subtitleFontStyle: e.Typography.BodyMedium,
                    imageComponent: p.image,
                    rightButtonContent: m,
                    subtitleMaxLines: 1,
                    textColor: "white",
                    height: 40
                }) : X().createElement(X().Fragment, null)
            }, [p, m, t])
              , w = (0,
            $.useMemo)(function() {
                return f ? X().createElement(Wr, {
                    pillText: f
                }) : X().createElement(X().Fragment, null)
            }, [f])
              , E = (0,
            $.useMemo)(function() {
                return void 0 !== l ? l : 0 === a.degree || 180 === a.degree ? 1 : .5
            }, [l, a])
              , P = (0,
            $.useMemo)(function() {
                return void 0 !== s ? s : 0 === a.degree || 180 === a.degree ? .5 : 1
            }, [s, a]);
            return (0,
            $.useMemo)(function() {
                return X().createElement(zr, {
                    title: n,
                    subtitle: r,
                    titleImageComponent: o,
                    foregroundImageComponent: u,
                    backgroundImageComponent: c,
                    gradient: pl(pl({}, a), {
                        heightPercent: E,
                        widthPercent: P
                    }),
                    gradientHeightPercent: E,
                    gradientWidthPercent: P,
                    overlayPillComponent: w,
                    backgroundClickAction: null == d ? void 0 : d.onActivated,
                    backgroundClickLinkPath: null == d ? void 0 : d.linkPath,
                    bottomRowComponent: null != i ? i : C,
                    minForegroundHeightPercent: v,
                    maxForegroundHeightPercent: h,
                    titleImageAspectRatio: g,
                    titleImageHeightPercentage: y,
                    minCardHeight: b,
                    foregroundAspectRatio: I
                }, S)
            }, [c, d, i, C, u, a, E, P, r, n, o, S, w, v, h, g, y, b, I])
        }, ml = function() {
            return (ml = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, vl = {
            id: "Unknown",
            itemPosition: -1
        }, hl = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1
        }, gl = function() {
            return (gl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, yl = function(e, t, n) {
            var r = sl(null !== (l = t.analyticsData) && void 0 !== l ? l : {}, null !== (s = t.ancestorAnalyticsData) && void 0 !== s ? s : {}, void 0)
              , o = null !== (u = null != n ? n : t.getCollectionData && t.getCollectionData()) && void 0 !== u ? u : null;
            o || fl($a.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e));
            var i, a, l, s, u, c = null != o ? o : hl, n = (a = (i = r).itemPosition,
            l = c.contentType,
            s = c.collectionPosition,
            n = c.collectionId,
            t = c.totalNumberOfItems,
            u = e.actionType,
            i ? ((o = {})[Ei.CollectionId] = n,
            o[Ei.CollectionPosition] = s,
            o[Ei.ContentType] = l,
            o[xi.TotalNumberOfItems] = t,
            o[xi.ItemId] = i.id,
            o[xi.ItemPosition] = a,
            o[xi.PositionInTopic] = a,
            o[xi.ActionType] = u,
            o) : (fl($a.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + n),
            {})), n = gl(gl(gl(gl({}, r), c), ol(e.actionParams)), n);
            x.eventStreamService.sendEvent({
                name: Si.ItemAction,
                type: Si.ItemAction,
                context: Ci.Home
            }, Oi(gl({}, n)))
        }, bl = function() {
            return (bl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Il = function(e, t, n, r) {
            var o = (0,
            $.useRef)(null)
              , i = (0,
            $.useCallback)(function(e, t) {
                yl(e, t, o.current)
            }, [o])
              , a = (0,
            $.useCallback)(function() {
                return o.current
            }, [o])
              , l = (0,
            $.useMemo)(function() {
                return bl(bl({}, e), {
                    logAction: i,
                    getCollectionAnalyticsData: a
                })
            }, [e, i, a]);
            return o.current = (0,
            $.useMemo)(function() {
                var e;
                return ll(null !== (e = l.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = l.analyticsData) && void 0 !== e ? e : {}, t, n, r)
            }, [l.ancestorAnalyticsData, l.analyticsData, t, n, r]),
            {
                collectionAnalyticsContext: l,
                collectionAnalyticsDataRef: o
            }
        }, Sl = function() {
            return (Sl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Cl = [Ei.CollectionId, Ei.CollectionPosition, Ei.ContentType, "id", "itemPosition", "itemsPerRow", "rowNumber", Pi.TotalNumberOfItems], wl = function(e, t, n) {
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
                d.push(t + 1)) : (fl($a.BuildBaseImpressionParamsInvalidItemsPerRow, "itemsPerRow is undefined or not greater than 0 when sending impressions for collection " + l + ": " + JSON.stringify(i)),
                d.push(1))) : fl($a.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + l)
            }),
            (p = {})[Ei.CollectionId] = l,
            p[Ei.CollectionPosition] = a,
            p[Ei.ContentType] = o,
            p[Pi.TotalNumberOfItems] = s,
            p[Pi.ItemIds] = u.join(","),
            p[Pi.ItemPositions] = c.join(","),
            p[Pi.RowNumbers] = d.join(","),
            p[Pi.PositionsInTopic] = f.join(","),
            p = p,
            e = function(r, o, i) {
                var a = {};
                r.forEach(function(e, n) {
                    var t = o[e];
                    null != t ? Object.entries(t).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        Cl.includes(t) || null == e || (a[t] || (a[t] = r.map(function() {
                            return ""
                        })),
                        a[t][n] = e.toString())
                    }) : fl($a.BuildItemImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i)
                });
                var n = {};
                return Object.entries(a).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n[t + "_arr"] = e.join(",")
                }),
                n
            }(e, t, n.collectionId),
            p = Sl(Sl(Sl({}, e), n), p),
            x.eventStreamService.sendEvent({
                name: Si.ItemImpressions,
                type: Si.ItemImpressions,
                context: Ci.Home
            }, Oi(Sl({}, p)))) : fl($a.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId) : fl($a.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (n = null == n ? void 0 : n.collectionId) && void 0 !== n ? n : "undefined"))
        }, El = function() {
            return (El = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Pl = function(e, t, n, r) {
            var o, i, a, l, s = function(e) {
                var e = null == e ? void 0 : e[0];
                if ((null == e ? void 0 : e.componentType) === us.Tile || (null == e ? void 0 : e.componentType) === us.GameTile) {
                    e = null === (e = e.props) || void 0 === e ? void 0 : e.imageAspectRatio;
                    if (rl(e))
                        if (1 < tl(e, 0))
                            return !0
                }
                return !1
            }(n), u = El(El(El(El(((a = {})[R.RootPlaceIds] = e.map(function(e) {
                return tl(null === (e = t[e]) || void 0 === e ? void 0 : e.placeId, -1)
            }),
            a[R.UniverseIds] = e.map(function(e) {
                return tl(null === (e = t[e]) || void 0 === e ? void 0 : e.universeId, -1)
            }),
            a), (n = e,
            l = t,
            (a = s) ? ((a = {})[R.ThumbnailAssetIds] = n.map(function(e) {
                return el(null === (e = l[e]) || void 0 === e ? void 0 : e.thumbnailAssetId, "0")
            }),
            a[R.ThumbnailListIds] = n.map(function(e) {
                return el(null === (e = l[e]) || void 0 === e ? void 0 : e.thumbnailListId, "0")
            }),
            a) : {})), (a = e,
            i = t,
            (s = s) ? ((s = {})[R.TileBadgeContexts] = a.map(function(e) {
                return el(null === (e = i[e]) || void 0 === e ? void 0 : e.tileBadgeIds, "0")
            }),
            s) : {})), (o = t,
            (s = (a = e).map(function(e) {
                return !0 === nl(null === (e = o[e]) || void 0 === e ? void 0 : e.adFlag, !1) ? 1 : 0
            })).some(function(e) {
                return 1 === e
            }) ? ((u = {})[R.AdsPositions] = s,
            u[R.AdFlags] = s,
            u[R.AdIds] = a.map(function(e) {
                return el(null === (e = o[e]) || void 0 === e ? void 0 : e.adId, "0")
            }),
            u) : {})), ((u = {})[R.NavigationUids] = e.map(function(e) {
                return el(null === (e = t[e]) || void 0 === e ? void 0 : e.navigationUniverseId, "0")
            }),
            u[R.AbsPositions] = e,
            u[R.SortPos] = 0 <= (null == r ? void 0 : r.collectionPosition) ? r.collectionPosition - 1 : -1,
            u[R.GameSetTypeId] = null !== (e = null == r ? void 0 : r.collectionId) && void 0 !== e ? e : -1,
            u[R.Page] = Y.HomePage,
            u[F.HomePageSessionInfo] = el(null == r ? void 0 : r[wi.HomePageSessionInfo], ""),
            u)), u = ee.gameImpressions(u);
            x.eventStreamService.sendEvent.apply(x.eventStreamService, u)
        }, xl = function() {
            return (xl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Zn = function(e) {
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
            $.useMemo)(function() {
                return n ? n.map(function(e) {
                    return e.templateKey ? o.templateRegistry.resolveTemplateForConfig(e) : a ? o.templateRegistry.resolveTemplateForConfig(xl(xl({}, e), {
                        templateKey: a
                    })) : e
                }) : []
            }, [n, o, a])
              , m = (0,
            $.useRef)([])
              , v = (0,
            $.useState)(-1)
              , h = v[0]
              , g = v[1]
              , y = Il(t, i.componentType, h, p.length)
              , b = y.collectionAnalyticsContext
              , I = y.collectionAnalyticsDataRef
              , e = (0,
            $.useCallback)(function(e) {
                var t;
                p ? ("Game" === (null === (t = I.current) || void 0 === t ? void 0 : t.contentType) && Pl(e, m.current, p, I.current),
                wl(e, m.current, I.current)) : fl($a.CollectionCarouselItemsImpressedButMissing, "CollectionCarousel with config " + JSON.stringify(i) + " is missing item configs on impression. Configs are " + JSON.stringify(p))
            }, [p, I, i])
              , v = (0,
            $.useRef)(null);
            Ii(v, p.length, e);
            t = (0,
            $.useCallback)(function(e, t, n) {
                var r = void 0 !== (null === (r = I.current) || void 0 === r ? void 0 : r.collectionPosition) && 0 <= I.current.collectionPosition ? I.current.collectionPosition - 1 : -1;
                yo({
                    distance: e,
                    scrollAreaSize: n,
                    startingPosition: t,
                    direction: S.Horizontal,
                    gameSetTypeId: null !== (t = null === (t = I.current) || void 0 === t ? void 0 : t.collectionId) && void 0 !== t ? t : -1,
                    gameSetTargetId: void 0,
                    sortPosition: r,
                    currentPage: Y.HomePage,
                    pageSession: el(null === (r = I.current) || void 0 === r ? void 0 : r[wi.HomePageSessionInfo], "")
                })
            }, [I]),
            h = (0,
            $.useCallback)(function(e, t, n) {
                if (!e)
                    return fl($a.CollectionCarouselMissingItem, "CollectionCarousel with config " + JSON.stringify(i) + " trying to render item " + JSON.stringify(e) + " that is missing"),
                    X().createElement(X().Fragment, null);
                var r = el(al("componentType", e.analyticsData, ""), "") || e.componentType;
                if (!r)
                    return fl($a.CollectionCarouselItemMissingComponentType, "CollectionCarousel with config " + JSON.stringify(i) + " is missing item component type on item config " + JSON.stringify(e)),
                    X().createElement(X().Fragment, null);
                r = {
                    itemPosition: t + 1,
                    itemComponentType: r,
                    componentType: r
                };
                return m.current[t] = sl(null !== (t = e.analyticsData) && void 0 !== t ? t : {}, null !== (t = I.current) && void 0 !== t ? t : {}, r),
                X().createElement(Ls, {
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
            $.useMemo)(function() {
                return X().Children.map(d, function(e, t) {
                    if (!X().isValidElement(e))
                        return fl($a.CollectionCarouselChildNotReactElement, "SduiCollectionCarouselChildNotReactElement " + JSON.stringify(i) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = i.componentType + "-child-" + t;
                    return X().cloneElement(e, xl(xl({}, e.props), {
                        key: t,
                        parentAnalyticsContext: b
                    }))
                })
            }, [d, b, i]),
            e = (0,
            $.useMemo)(function() {
                return c ? X().cloneElement(c, xl(xl({}, c.props), {
                    parentAnalyticsContext: b
                })) : null
            }, [c, b]);
            return X().createElement("div", null, X().createElement(Fr, {
                itemsContainerRef: v,
                items: p,
                renderItem: h,
                collectionItemSize: null != r ? r : kr.Small,
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
        }, Tl = function() {
            return (Tl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Wi = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.placeId
              , r = tl(n, -1);
            if (r && -1 !== r) {
                var o = (o = t,
                t = ol(null !== (e = null == (t = e) ? void 0 : t.actionParams) && void 0 !== e ? e : {}),
                e = tl(null !== (e = t.placeId) && void 0 !== e ? e : al("placeId", o, -1), -1),
                t = tl(null !== (t = t.universeId) && void 0 !== t ? t : al("universeId", o, -1), -1),
                o = cl(o),
                Tl(Tl({}, o), ((o = {})[R.PlaceId] = e,
                o[R.UniverseId] = t,
                o)));
                return {
                    callback: void 0,
                    linkPath: v(r, "", o)
                }
            }
            return fl($a.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(n) + " to open game details"),
            {
                callback: void 0,
                linkPath: void 0
            }
        }, fr = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionName
              , r = el(n, "");
            if (!r)
                return fl($a.SduiActionOpenSeeAllInvalidCollectionName, "Invalid collection name " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionId,
            e = tl(n, -1);
            if (!e || -1 === e)
                return fl($a.SduiActionOpenSeeAllInvalidCollectionId, "Invalid collection id " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            var o, n = (o = e,
            e = tl(al("collectionPosition", n = t, -1), -1),
            null !== (t = null == (t = null != n && n.getCollectionData ? n.getCollectionData() : void 0) ? void 0 : t.collectionId) && void 0 !== t || tl(al("collectionId", n, -1), -1),
            t = el(al(wi.HomePageSessionInfo, n, ""), ""),
            (n = {})[R.Position] = e,
            n[R.SortId] = o,
            n[R.GameSetTypeId] = o,
            n[R.Page] = Y.HomePage,
            n[F.HomePageSessionInfo] = t,
            n);
            return {
                callback: void 0,
                linkPath: N(r, n[R.Page], n)
            }
        };
        function kl(e) {
            var t = e.assetId
              , n = (o = (0,
            $.useState)(""))[0]
              , r = o[1]
              , o = (e = (0,
            $.useState)(!0))[0]
              , i = e[1];
            return (0,
            $.useEffect)(function() {
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
            }) : (fl($a.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t),
            X().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }
        function Ol(e) {
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
        (pr = dl = dl || {}).OpenGameDetails = "OpenGameDetails",
        pr.OpenSeeAll = "OpenSeeAll",
        pr.PlayButtonClick = "PlayButtonClick";
        var _l, Al, Nl, Rl = ((cs = {})[dl.OpenGameDetails] = Wi,
        cs[dl.OpenSeeAll] = fr,
        cs[dl.PlayButtonClick] = function() {
            return {
                callback: void 0,
                linkPath: void 0
            }
        }
        ,
        cs);
        function Ll(e, t) {
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
                fl($a.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(n) + " missing matching feed item with key " + t)
            } else
                fl($a.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e))
        }
        function Dl(e) {
            return !!(e && "object" == typeof e && e.componentType && Ts(e.componentType))
        }
        function Ml(i, a, l) {
            if (!function(e) {
                if (e && "object" == typeof e && (e.actionType && e.actionParams && Rl[e.actionType]))
                    return !0;
                return !1
            }(i))
                return fl($a.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(i) + " to parse callback"),
                {
                    onActivated: function() {},
                    linkPath: void 0
                };
            var s = (0,
            Rl[i.actionType])(i, a, l);
            return {
                onActivated: function() {
                    return e = s,
                    t = i,
                    r = l,
                    (o = (n = a).logAction) ? o(t, n) : yl(t, n, null),
                    void (e.callback && e.callback(t, n, r));
                    var e, t, n, r, o
                },
                linkPath: s.linkPath
            }
        }
        function Fl(e) {
            if ("string" != typeof e)
                return fl($a.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string."),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var t = e.split("//");
            if (2 === t.length && (e.includes(Nl.RbxAsset) || e.includes(Nl.RbxThumb))) {
                if (t[0].includes(Nl.RbxAsset))
                    return {
                        assetType: Nl.RbxAsset,
                        assetTarget: t[1]
                    };
                if (t[0].includes(Nl.RbxThumb))
                    return {
                        assetType: Nl.RbxThumb,
                        assetTarget: t[1]
                    }
            }
            return fl($a.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }
        function Ul(e) {
            if ("string" != typeof e)
                return null;
            var t, n, r = Fl(e), o = r.assetType, i = r.assetTarget;
            if (o === Nl.RbxAsset) {
                var a = i;
                return X().createElement(kl, {
                    assetId: a
                })
            }
            if (o !== Nl.RbxThumb)
                return fl($a.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported."),
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
            return void 0 === (a = r.id) || void 0 === o || void 0 === i || void 0 === l ? (fl($a.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != o ? o : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != i ? i : "undefined") + ", or h " + (null != l ? l : "undefined") + " is invalid"),
            null) : (t = i + "x" + l,
            void 0 !== (e = null === (e = ts[e = o]) || void 0 === e ? void 0 : e.find(function(e) {
                return e === t
            })) ? X().createElement(Ol, {
                thumbnailType: o,
                targetId: a,
                format: qe.ThumbnailFormat.webp,
                size: e
            }) : (fl($a.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + i + "x" + l + " for type " + o),
            null))
        }
        function Bl(e, t) {
            if (t)
                if ("string" == typeof e) {
                    for (var n = e.split("."), r = t, o = 0; o < n.length; ++o) {
                        var i = n[o];
                        if (null == r || "object" != typeof r || Array.isArray(r))
                            return void fl($a.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". Token path step " + i + " is invalid. Token is " + JSON.stringify(r));
                        r = r[i]
                    }
                    if (null != r)
                        return r;
                    fl($a.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". The final token " + (r ? JSON.stringify(r) : "undefined") + " is invalid.")
                } else
                    fl($a.SduiParseFoundationTokenInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation token. Input must be a string.");
            else
                fl($a.SduiParseFoundationTokenMissingTokens, "Missing tokens in parseFoundationTokenHelper for input " + JSON.stringify(e))
        }
        function Gl(e) {
            return !(!e || "object" != typeof e)
        }
        function Hl(e) {
            return "string" == typeof e && /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(e)
        }
        function jl(e) {
            return "string" == typeof e && /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*(?:\.\d+)?)\s*\)$/.test(e)
        }
        function zl(e, t, n) {
            return Hl(e) || jl(e) ? e : (n = function(e, t) {
                t = Bl(e, t.dependencies.tokens);
                if (void 0 !== t && "string" == typeof t)
                    return t;
                fl($a.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof t + ". Expected string.")
            }(e, n)) && (Hl(n) || jl(n)) ? n : void fl($a.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected color string.")
        }
        function Wl(e) {
            return "string" == typeof e && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }
        function Vl(e) {
            return "string" == typeof e && /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(e)
        }
        function ql(e) {
            return !(!e || "object" != typeof e || void 0 === e.xScale || "number" != typeof e.xScale || void 0 === e.xOffset || "number" != typeof e.xOffset || void 0 === e.yScale || "number" != typeof e.yScale || void 0 === e.yOffset || "number" != typeof e.yOffset)
        }
        function Jl(e) {
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
        function Kl(e) {
            return !(!e || "object" != typeof e || void 0 === e.x || "number" != typeof e.x || void 0 === e.y || "number" != typeof e.y)
        }
        function $l(e) {
            if (e && Array.isArray(e) && 2 === e.length) {
                e = e.map(Number);
                return {
                    x: e[0],
                    y: e[1]
                }
            }
        }
        function Xl(e) {
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
            return X().createElement(uo, {
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
        function Yl(e) {
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
            $.useMemo)(function() {
                var e;
                return (null !== (e = t.dataStore.social.inGameFriendsByUniverseId[r]) && void 0 !== e ? e : []).slice(0, l)
            }, [t.dataStore.social.inGameFriendsByUniverseId, r, l])
              , o = (0,
            $.useMemo)(function() {
                return u.map(function(e) {
                    return e.displayName
                }).join(", ")
            }, [u])
              , i = (0,
            $.useMemo)(function() {
                var e = u.map(function(e) {
                    return X().createElement(Ol, {
                        key: e.userId,
                        thumbnailType: qe.ThumbnailTypes.avatarHeadshot,
                        targetId: e.userId.toString(),
                        format: qe.ThumbnailFormat.webp,
                        size: qe.ThumbnailAvatarHeadshotSize.size48
                    })
                });
                return X().createElement(Br, {
                    avatarThumbnails: e,
                    iconWidth: s,
                    avatarContainerBackgroundColor: a.Color.Surface.Surface_200,
                    avatarImageBackgroundColor: a.Color.Extended.Gray.Gray_800,
                    avatarBorderColor: a.Color.System.Success
                })
            }, [u, s, a]);
            return X().createElement(Xl, {
                componentConfig: {
                    componentType: us.TileFooter,
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
        function Zl(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , e = e.footerComponent;
            return (0,
            $.useMemo)(function() {
                return !!(t.dataStore.social.inGameFriendsByUniverseId[r] && 0 < t.dataStore.social.inGameFriendsByUniverseId[r].length)
            }, [t.dataStore.social.inGameFriendsByUniverseId, r]) ? X().createElement(Yl, {
                componentConfig: {
                    componentType: us.GameTileActiveFriendsFooter,
                    props: {}
                },
                sduiContext: t,
                analyticsContext: n,
                universeId: r
            }) : null != e ? e : null
        }
        (fs = _l = _l || {}).imageQualityLevel = "imageQualityLevel",
        fs.maxScreenWidth = "maxScreenWidth",
        fs.minScreenWidth = "minScreenWidth",
        (Al = Al || {}).friendInGame = "friendInGame",
        (hs = Nl = Nl || {}).RbxAsset = "rbxassetid",
        hs.RbxThumb = "rbxthumb";
        var Ql = function() {
            return (Ql = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , es = {
            startColor: "#000000",
            endColor: "#000000",
            startTransparency: 0,
            endTransparency: 1,
            degree: 270
        }
          , ts = ((et = {})[qe.ThumbnailTypes.gameIcon] = Object.values(qe.ThumbnailGameIconSize),
        et[qe.ThumbnailTypes.gameThumbnail] = Object.values(qe.ThumbnailGameThumbnailSize),
        et[qe.ThumbnailTypes.assetThumbnail] = Object.values(qe.ThumbnailAssetsSize),
        et[qe.ThumbnailTypes.avatarHeadshot] = Object.values(qe.ThumbnailAvatarHeadshotSize),
        et)
          , ns = function(e, t, n) {
            if (Wl(e))
                return e;
            if (Vl(e))
                return "#" + e;
            if (Hl(e) || jl(e))
                return function(e) {
                    if (Hl(e) || jl(e)) {
                        var t = e.match(/\d+(?:\.\d+)?/g);
                        if (!(!t || t.length < 3 || 4 < t.length)) {
                            var n = t.map(Number)
                              , r = n[0]
                              , t = n[1]
                              , n = n[2];
                            return "#" + r.toString(16).padStart(2, "0") + t.toString(16).padStart(2, "0") + n.toString(16).padStart(2, "0")
                        }
                        fl($a.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a valid rgb or rgba color.")
                    } else
                        fl($a.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in convertRbxColorToHex. Input must be a rgb or rgba color.")
                }(e);
            var r = zl(e, 0, n);
            if (r)
                return ns(r, t, n);
            fl($a.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value in parseColorValueToHex. Input must be a hex color or a foundation color token.")
        }
          , rs = {
            "icons/status/games/rating_small": "icon-rating-16x16",
            "icons/status/games/people-playing_small": "icon-current-players-16x16",
            "icons/navigation/pushRight_small": "icon-push-right-16x16"
        }
          , tt = {
            parseUiComponent: function(e, t, n) {
                if (!e || "object" != typeof e)
                    return fl($a.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component"),
                    X().createElement(X().Fragment, null);
                return X().createElement(Ls, {
                    componentConfig: e,
                    parentAnalyticsContext: t,
                    sduiContext: n
                })
            },
            parseCallback: Ml,
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
                var t = Ul(e.image);
                return Ql(Ql({}, e), {
                    image: t
                })
            },
            parseAssetUrl: Fl,
            parseAssetUrlIntoComponent: Ul,
            parseGradient: function(e, t, n) {
                var r, o = !(!(r = e) || "object" != typeof r) && (!(!r.startColor || "string" != typeof r.startColor) && (!(!r.endColor || "string" != typeof r.endColor) && (void 0 !== r.startOpacity && "number" == typeof r.startOpacity && (void 0 !== r.endOpacity && "number" == typeof r.endOpacity && (void 0 !== r.degree && "number" == typeof r.degree))))), r = !(!(r = e) || "object" != typeof r) && (!(!r.startColor || "string" != typeof r.startColor) && (!(!r.endColor || "string" != typeof r.endColor) && (!(void 0 === r.startTransparency || "number" != typeof r.startTransparency || r.startTransparency < 0 || 1 < r.startTransparency) && (!(void 0 === r.endTransparency || "number" != typeof r.endTransparency || r.endTransparency < 0 || 1 < r.endTransparency) && (void 0 !== r.degree && "number" == typeof r.degree && ((void 0 === r.widthPercent || !("number" != typeof r.widthPercent || r.widthPercent < 0 || 1 < r.widthPercent)) && ((void 0 === r.heightPercent || !("number" != typeof r.heightPercent || r.heightPercent < 0 || 1 < r.heightPercent)) && (void 0 === r.midpointPercent || !("number" != typeof r.midpointPercent || r.midpointPercent < 0 || 1 < r.midpointPercent)))))))));
                return o || r ? (r = o ? {
                    startColor: e.startColor,
                    endColor: e.endColor,
                    startTransparency: e.startOpacity,
                    endTransparency: e.endOpacity,
                    degree: e.degree
                } : e,
                Ql(Ql({}, r), {
                    startColor: null !== (o = ns(r.startColor, t, n)) && void 0 !== o ? o : es.startColor,
                    endColor: null !== (n = ns(r.endColor, t, n)) && void 0 !== n ? n : es.endColor
                })) : (fl($a.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e)),
                es)
            },
            parseFoundationNumberToken: function(e, t, n) {
                if ("number" == typeof e)
                    return e;
                n = Bl(e, n.dependencies.tokens);
                if (void 0 !== n && "number" == typeof n)
                    return n;
                fl($a.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + " for token " + JSON.stringify(n) + " with input " + JSON.stringify(e) + ". Expected number.")
            },
            parseFoundationTypographyToken: function(e, t, n) {
                if (Gl(e))
                    return e;
                n = Bl(e, n.dependencies.tokens);
                if (void 0 !== n && Gl(n))
                    return n;
                fl($a.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected TypographyToken.")
            },
            parseColorValue: function(e, t, n) {
                if (Wl(e))
                    return e;
                if (Vl(e))
                    return "#" + e;
                n = zl(e, 0, n);
                if (n)
                    return n;
                fl($a.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value. Input must be a hex color or a foundation color token.")
            },
            parseUDim2: function(e) {
                if (ql(e))
                    return e;
                var t = Jl(e);
                if (ql(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = Jl(t);
                    if (ql(t))
                        return t;
                    fl($a.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string with 4 comma-separated values.")
                } else
                    fl($a.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string.")
            },
            parseVector2: function(e) {
                if (Kl(e))
                    return e;
                var t = $l(e);
                if (Kl(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = $l(t);
                    if (Kl(t))
                        return t;
                    fl($a.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string with 2 comma-separated values.")
                } else
                    fl($a.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string.")
            },
            parseAutomaticSize: function(e) {
                if (e && "string" == typeof e)
                    switch (e) {
                    case ur.X:
                        return ur.X;
                    case ur.Y:
                        return ur.Y;
                    case ur.XY:
                        return ur.XY;
                    case ur.None:
                        return ur.None;
                    default:
                        return void fl($a.SduiParseAutomaticSizeInvalidInput, "Invalid automatic size " + JSON.stringify(e) + ". Expected one of " + Object.values(ur).join(", ") + ".")
                    }
                else
                    fl($a.SduiParseAutomaticSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for automatic size. Input must be a string.")
            },
            parseIcon: function(e) {
                if ("string" == typeof e) {
                    if (rs[e])
                        return ge()("sdui-icon", rs[e]);
                    fl($a.SduiParseIconInvalidInput, "Invalid icon " + JSON.stringify(e) + ". Expected one of " + Object.keys(rs).join(", ") + ".")
                } else
                    fl($a.SduiParseIconInvalidInput, "Invalid input " + JSON.stringify(e) + " for icon. Input must be a string.")
            }
        }
          , os = function() {
            return (os = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , is = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        }
          , as = function(e) {
            var t = e.sduiContext
              , n = e.analyticsContext
              , r = e.universeId
              , o = e.placeId
              , i = e.disableDefaultFooterLogic
              , a = e.onActivated
              , l = e.footerComponent
              , s = is(e, ["sduiContext", "analyticsContext", "universeId", "placeId", "disableDefaultFooterLogic", "onActivated", "footerComponent"])
              , u = (0,
            $.useMemo)(function() {
                if (a)
                    return a;
                var e = {
                    actionType: dl.OpenGameDetails,
                    actionParams: {
                        placeId: o,
                        universeId: r
                    }
                };
                return Ml(e, n, t)
            }, [a, o, r, n, t])
              , e = (0,
            $.useMemo)(function() {
                return i ? l : X().createElement(Zl, {
                    universeId: r,
                    footerComponent: l,
                    sduiContext: t,
                    analyticsContext: n
                })
            }, [i, l, r, t, n]);
            return X().createElement(ul, os({}, s, {
                sduiContext: t,
                analyticsContext: n,
                onActivated: u,
                footerComponent: e
            }))
        }
          , ls = function() {
            return (ls = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function ss(e, t, n, r, o, i, a) {
            if (!Dl(e))
                return fl($a.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children"),
                {
                    props: {},
                    children: null
                };
            var l, s, u, c = e.componentType, d = (l = t,
            d = r,
            r = (t = e).analyticsData,
            t = vs(vs({}, r), null != d ? d : {}),
            r = l.logAction,
            d = l.getCollectionData,
            {
                analyticsData: t,
                ancestorAnalyticsData: vs(vs({}, l.ancestorAnalyticsData), l.analyticsData),
                logAction: r,
                getCollectionData: d
            }), a = vs(vs(vs(vs(vs({}, e.props), {
                componentConfig: e,
                sduiContext: n,
                analyticsContext: d
            }), o), i), a);
            return {
                props: ms(c, a, d, n),
                children: (s = d,
                u = n,
                (e = e).children ? e.children.map(function(e, t) {
                    var n, t = (null !== (n = e.componentType) && void 0 !== n ? n : "undefined") + "-" + t;
                    return X().createElement(Ls, {
                        key: t,
                        componentConfig: e,
                        parentAnalyticsContext: s,
                        sduiContext: u
                    })
                }) : null)
            }
        }
        (lt = function(e) {
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
            $.useCallback)(function() {
                var e = {
                    actionType: dl.PlayButtonClick,
                    actionParams: {}
                };
                Ml(e, n, t).onActivated()
            }, [n, t])
              , s = (0,
            $.useMemo)(function() {
                var e, t = cl(n);
                return ls(ls({}, t), ((e = {})[R.IsAd] = (null !== (t = t[R.IsAd]) && void 0 !== t && t).toString(),
                e[R.PlaceId] = tl(o, -1),
                e[R.UniverseId] = tl(r, -1),
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
        var us, pr = lt, Wi = function(e) {
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
              , k = (0,
            $.useMemo)(function() {
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
            $.useMemo)(function() {
                return x || (E ? X().createElement(sr, {
                    callback: null == P ? void 0 : P.onActivated,
                    linkPath: null == P ? void 0 : P.linkPath,
                    ariaLabel: E
                }, X().createElement(wt, {
                    tooltipText: E,
                    placement: "left",
                    centerIcon: !0
                })) : void 0)
            }, [x, E, P]);
            return X().createElement(Vr, {
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
                containerOverrides: k
            })
        }, fr = function(e) {
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
            $.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a]);
            return X().createElement(qr, {
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
        }, cs = function(e) {
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
            $.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a]);
            return X().createElement(Cr, {
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
        }, ds = function() {
            return (ds = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, fs = function(e) {
            var r = e.componentConfig
              , t = e.analyticsContext
              , n = e.sduiContext
              , o = e.item
              , i = e.children
              , a = (0,
            $.useRef)(null)
              , l = (0,
            $.useRef)(null)
              , s = (0,
            $.useCallback)(function(e, t) {
                yl(e, t, a.current)
            }, [a])
              , u = (0,
            $.useCallback)(function() {
                return a.current
            }, [a])
              , c = (0,
            $.useMemo)(function() {
                return ds(ds({}, t), {
                    logAction: s,
                    getCollectionAnalyticsData: u
                })
            }, [t, s, u]);
            a.current = (0,
            $.useMemo)(function() {
                var e;
                return ll(null !== (e = c.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = c.analyticsData) && void 0 !== e ? e : {}, r.componentType, 1, 1)
            }, [c.ancestorAnalyticsData, c.analyticsData, r.componentType]);
            var d = (0,
            $.useMemo)(function() {
                return null != o && o.templateKey ? n.templateRegistry.resolveTemplateForConfig(o) : o
            }, [o, n])
              , f = (0,
            $.useCallback)(function(e) {
                var t, n;
                d ? (a.current && ("Game" !== (n = a.current.contentType) && "HeroUnit" !== n || null !== (t = l.current) && void 0 !== t && t.universeId && ((n = {})[R.RootPlaceIds] = [tl(null === (t = l.current) || void 0 === t ? void 0 : t.placeId, -1)],
                n[R.UniverseIds] = [tl(null === (t = l.current) || void 0 === t ? void 0 : t.universeId, -1)],
                n[R.AdsPositions] = [!0 === nl(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AdFlags] = [!0 === nl(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AbsPositions] = [0],
                n[R.SortPos] = null !== (t = null === (t = a.current) || void 0 === t ? void 0 : t.collectionPosition) && void 0 !== t ? t : -1,
                n[R.GameSetTypeId] = null === (t = a.current) || void 0 === t ? void 0 : t.collectionId,
                n[R.Page] = Y.HomePage,
                n[R.ComponentType] = "HeroUnit",
                n[F.HomePageSessionInfo] = el(null === (t = a.current) || void 0 === t ? void 0 : t[wi.HomePageSessionInfo], ""),
                n = n,
                n = ee.gameImpressions(n),
                x.eventStreamService.sendEvent.apply(x.eventStreamService, n))),
                wl(e, [l.current], a.current)) : fl($a.SingleItemCollectionItemImpressedButMissing, "SingleItemCollection onItemImpressed missing item " + JSON.stringify(d) + " with config " + JSON.stringify(r))
            }, [d, r, a, l])
              , p = (0,
            $.useRef)(null);
            Ii(p, 1, f);
            e = (0,
            $.useMemo)(function() {
                var e;
                if (!d)
                    return fl($a.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(d) + " with config " + JSON.stringify(r)),
                    X().createElement(X().Fragment, null);
                var t = {
                    itemPosition: 1
                };
                return l.current = sl(null !== (e = d.analyticsData) && void 0 !== e ? e : {}, null !== (e = a.current) && void 0 !== e ? e : {}, t),
                X().createElement(Ls, {
                    componentConfig: d,
                    parentAnalyticsContext: c,
                    sduiContext: n,
                    localAnalyticsData: t
                })
            }, [d, r, c, a, n]),
            f = (0,
            $.useMemo)(function() {
                return X().Children.map(i, function(e, t) {
                    if (!X().isValidElement(e))
                        return fl("SingleItemCollectionChildNotReactElement", "SingleItemCollectionChildNotReactElement " + JSON.stringify(r) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = r.componentType + "-child-" + t;
                    return X().cloneElement(e, ds(ds({}, e.props), {
                        key: t,
                        parentAnalyticsContext: c
                    }))
                })
            }, [i, c, r]);
            return X().createElement("div", {
                ref: p
            }, e, f)
        }, ps = function() {
            return (ps = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ms = function(o, i, a, l, e) {
            var t = xs[o]
              , s = ps({}, i)
              , u = null != e ? e : null == t ? void 0 : t.propParsers;
            return u && Object.keys(i).forEach(function(e) {
                var t, n = i[e], r = u[e];
                void 0 !== n && r && ("function" == typeof r ? void 0 !== (t = r(n, a, l)) ? s[e] = t : fl($a.PropParseFailure, "Failed to parse prop " + e + " with value " + JSON.stringify(n) + " for component " + o) : "object" == typeof r ? "object" == typeof (t = n) && null !== t && Object.keys(t).every(function(e) {
                    return "string" == typeof e
                }) ? s[e] = ms(o, n, a, l, r) : fl($a.NestedPropParseFailure, "Expected a nested object for prop " + e + " with value " + JSON.stringify(n) + " using for component " + o) : fl($a.PropParserNotFound, "Prop parser not found for prop " + e + " and component " + o))
            }),
            s
        }, vs = function() {
            return (vs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, hs = function(r) {
            var e = X().memo(function(n) {
                return (0,
                $.useMemo)(function() {
                    var e = ss(n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides, n.conditionalPropOverrides)
                      , t = e.props
                      , e = e.children;
                    return X().createElement(r, t, e)
                }, [n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides, n.conditionalPropOverrides])
            });
            return e.displayName = "SduiWrapped" + (r.displayName || r.name),
            e
        }, et = function(e) {
            var t = e.sduiContext
              , n = e.title
              , r = e.titleFontStyle
              , o = e.subtitle
              , i = e.subtitleFontStyle
              , a = e.titleSubtitleGap
              , l = e.subtitleMaxLines
              , s = e.height
              , u = e.rightButtonContent
              , e = e.image
              , t = t.dependencies.tokens;
            return X().createElement(Er, {
                title: n,
                subtitle: o,
                textColor: t.Color.Content.Emphasis,
                titleFontStyle: null != r ? r : t.Typography.TitleMedium,
                subtitleFontStyle: null != i ? i : t.Typography.BodyMedium,
                titleSubtitleGap: a,
                subtitleMaxLines: l,
                rightButtonContent: u,
                imageComponent: e,
                height: s
            })
        };
        function gs(e, t, n) {
            switch (e) {
            case _l.imageQualityLevel:
                if (!rl(t))
                    return fl($a.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                var r = ks[el(t, "")];
                return void 0 === r ? (fl($a.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + t.toString()),
                !1) : Os === r;
            case _l.maxScreenWidth:
                if (!rl(t))
                    return fl($a.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                var o = tl(t, -1);
                return o < 0 ? (fl($a.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + t.toString()),
                !1) : n <= o;
            case _l.minScreenWidth:
                if (!rl(t))
                    return fl($a.InvalidMinWidthConditionValue, "Invalid min width condition value: " + (t ? JSON.stringify(t) : "undefined")),
                    !1;
                o = tl(t, -1);
                return o < 0 ? (fl($a.InvalidParsedMinWidthConditionValue, "Cannot parse min width value: " + t.toString()),
                !1) : o <= n;
            default:
                return fl($a.UnknownResponsivePropConditionKey, "Unknown responsive prop condition key: " + JSON.stringify(e)),
                !1
            }
        }
        function ys(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = (e = (0,
            $.useState)(window.innerWidth))[0]
              , s = e[1];
            return (0,
            $.useEffect)(function() {
                function e() {
                    s(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            e = (0,
            $.useMemo)(function() {
                return _s(n.responsiveProps, l)
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
        function bs(e) {
            return As.includes(e)
        }
        function Is(e) {
            var t = e.conditionalProps
              , n = e.setFailedPresenceConditionIndexes
              , o = e.sduiContext;
            return (0,
            $.useEffect)(function() {
                var r = new Set;
                null != t && t.forEach(function(e, n) {
                    e = e.conditions;
                    e && Object.entries(e).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        bs(t) && (function(e, t, n) {
                            if (e !== Al.friendInGame)
                                return fl($a.UnknownPresenceConditionKey, "Unknown presence condition key: " + JSON.stringify(e)),
                                !1;
                            if (!rl(t))
                                return fl($a.InvalidPresenceConditionValue, "Invalid presence condition value: " + JSON.stringify(t) + ", for key: " + e),
                                !1;
                            var r = el(t, "");
                            return r ? 0 < (null === (r = n.inGameFriendsByUniverseId[r]) || void 0 === r ? void 0 : r.length) : (fl($a.InvalidPresenceConditionValue, "Invalid friend in game condition value: " + JSON.stringify(t) + ", for key: " + e),
                            !1)
                        }(t, e, o.dataStore.social) || r.add(n))
                    })
                }),
                n(function(e) {
                    return (0,
                    gi.isEqual)(e, r) ? e : r
                })
            }, [t, o.dataStore.social, n]),
            null
        }
        function Ss(e) {
            return Ns.includes(e)
        }
        function Cs(e) {
            var t = e.conditionalProps
              , n = e.setFailedResponsiveConditionIndexes
              , o = (e = (0,
            $.useState)(window.innerWidth))[0]
              , r = e[1];
            return (0,
            $.useEffect)(function() {
                function e() {
                    r(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            (0,
            $.useEffect)(function() {
                var r = new Set;
                null != t && t.forEach(function(e, n) {
                    e = e.conditions;
                    e && Object.entries(e).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        Ss(t) && (gs(t, e, o) || r.add(n))
                    })
                }),
                n(function(e) {
                    return (0,
                    gi.isEqual)(e, r) ? e : r
                })
            }, [t, n, o]),
            null
        }
        function ws(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = n.conditionalProps
              , s = (p = (0,
            $.useState)(new Set))[0]
              , u = p[1]
              , c = (e = (0,
            $.useState)(new Set))[0]
              , d = e[1]
              , f = (0,
            $.useMemo)(function() {
                var t = {
                    hasPresenceCondition: !1,
                    hasResponsiveCondition: !1
                };
                if (!l)
                    return t;
                var n = Object.keys(Al)
                  , r = Object.keys(_l);
                return l.forEach(function(e) {
                    e = e.conditions;
                    e && Object.keys(e).forEach(function(e) {
                        n.includes(e) ? t.hasPresenceCondition = !0 : r.includes(e) && (t.hasResponsiveCondition = !0)
                    })
                }),
                t
            }, [l])
              , p = (0,
            $.useMemo)(function() {
                return X().createElement(X().Fragment, null, f.hasPresenceCondition && X().createElement(Is, {
                    conditionalProps: l,
                    setFailedPresenceConditionIndexes: d,
                    sduiContext: o
                }), f.hasResponsiveCondition && X().createElement(Cs, {
                    conditionalProps: l,
                    setFailedResponsiveConditionIndexes: u
                }))
            }, [f, l, o])
              , m = (0,
            $.useCallback)(function(e, t) {
                return !c.has(t) && !s.has(t) && (!e || Object.keys(e).every(function(e) {
                    return !(!bs(e) && !Ss(e)) || (fl($a.UnsupportedConditionalPropsCondition, "Unsupported condition: " + e),
                    !1)
                }))
            }, [c, s])
              , v = (0,
            $.useMemo)(function() {
                return l ? l.reduce(function(e, t, n) {
                    var r = t.conditions
                      , t = t.propOverrides;
                    return t && m(r, n) ? Rs(Rs({}, e), t) : e
                }, {}) : {}
            }, [l, m])
              , e = (0,
            $.useMemo)(function() {
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
        (lt = us = us || {}).SingleItemCollection = "SingleItemCollection",
        lt.HeroUnit = "HeroUnit",
        lt.PlayButton = "PlayButton",
        lt.TextIconRow = "TextIconRow",
        lt.TileFooter = "TileFooter",
        lt.GameTileActiveFriendsFooter = "GameTileActiveFriendsFooter",
        lt.Tile = "Tile",
        lt.GameTile = "GameTile",
        lt.SectionHeader = "SectionHeader",
        lt.SlotOverlay = "SlotOverlay",
        lt.CollectionCarousel = "CollectionCarousel",
        lt.ImageWithGradient = "ImageWithGradient",
        lt.AttributionRow = "AttributionRow";
        var Es, Ps, xs = ((lt = {})[us.SingleItemCollection] = {
            component: hs(fs),
            propParsers: {}
        },
        lt[us.PlayButton] = {
            component: hs(pr),
            propParsers: {}
        },
        lt[us.HeroUnit] = {
            component: hs(te),
            propParsers: {
                backgroundComponent: tt.parseUiComponent,
                bottomRowComponent: tt.parseUiComponent,
                ctaButtonComponent: tt.parseUiComponent,
                headerComponent: tt.parseUiComponent,
                onActivated: tt.parseCallback,
                overlayComponent: tt.parseUiComponent,
                asset: tt.parseHeroUnitAsset,
                gradient: tt.parseGradient,
                foregroundImage: tt.parseAssetUrlIntoComponent,
                backgroundImage: tt.parseAssetUrlIntoComponent,
                titleImage: tt.parseAssetUrlIntoComponent
            }
        },
        lt[us.TextIconRow] = {
            component: hs(cs),
            propParsers: {
                anchorPoint: tt.parseVector2,
                automaticSize: tt.parseAutomaticSize,
                size: tt.parseUDim2,
                position: tt.parseUDim2,
                onActivated: tt.parseCallback,
                textColor: tt.parseColorValue,
                fontStyle: tt.parseFoundationTypographyToken,
                gap: tt.parseFoundationNumberToken,
                icon: tt.parseIcon,
                iconWidth: tt.parseFoundationNumberToken,
                iconColor: tt.parseColorValue
            }
        },
        lt[us.TileFooter] = {
            component: hs(Xl),
            propParsers: {
                onActivated: tt.parseCallback,
                textColor: tt.parseColorValue,
                fontStyle: tt.parseFoundationTypographyToken,
                gap: tt.parseFoundationNumberToken,
                leftIcon: tt.parseIcon,
                leftIconComponent: tt.parseUiComponent,
                rightIcon: tt.parseIcon,
                rightIconComponent: tt.parseUiComponent
            }
        },
        lt[us.GameTileActiveFriendsFooter] = {
            component: hs(Yl),
            propParsers: {
                iconWidth: tt.parseFoundationNumberToken,
                onActivated: tt.parseCallback
            }
        },
        lt[us.Tile] = {
            component: hs(ul),
            propParsers: {
                image: tt.parseAssetUrlIntoComponent,
                imageComponent: tt.parseUiComponent,
                thumbnailOverlayComponent: tt.parseUiComponent,
                onActivated: tt.parseCallback,
                titleColor: tt.parseColorValue,
                titleFont: tt.parseFoundationTypographyToken,
                titleComponent: tt.parseUiComponent,
                containmentPadding: tt.parseFoundationNumberToken,
                cornerRadius: tt.parseFoundationNumberToken,
                footerComponent: tt.parseUiComponent,
                ctaButtonComponent: tt.parseUiComponent
            }
        },
        lt[us.GameTile] = {
            component: hs(as),
            propParsers: {
                image: tt.parseAssetUrlIntoComponent,
                imageComponent: tt.parseUiComponent,
                thumbnailOverlayComponent: tt.parseUiComponent,
                onActivated: tt.parseCallback,
                titleColor: tt.parseColorValue,
                titleFont: tt.parseFoundationTypographyToken,
                titleComponent: tt.parseUiComponent,
                containmentPadding: tt.parseFoundationNumberToken,
                cornerRadius: tt.parseFoundationNumberToken,
                footerComponent: tt.parseUiComponent,
                ctaButtonComponent: tt.parseUiComponent
            }
        },
        lt[us.SectionHeader] = {
            component: hs(Wi),
            propParsers: {
                anchorPoint: tt.parseVector2,
                automaticSize: tt.parseAutomaticSize,
                size: tt.parseUDim2,
                position: tt.parseUDim2,
                onTitleActivated: tt.parseCallback,
                titleColor: tt.parseColorValue,
                titleFontStyle: tt.parseFoundationTypographyToken,
                titleGap: tt.parseFoundationNumberToken,
                titleIcon: tt.parseIcon,
                titleIconWidth: tt.parseFoundationNumberToken,
                titleComponent: tt.parseUiComponent,
                onSubtitleActivated: tt.parseCallback,
                subtitleColor: tt.parseColorValue,
                subtitleFontStyle: tt.parseFoundationTypographyToken,
                subtitleGap: tt.parseFoundationNumberToken,
                subtitleIcon: tt.parseIcon,
                subtitleIconWidth: tt.parseFoundationNumberToken,
                subtitleComponent: tt.parseUiComponent,
                verticalGap: tt.parseFoundationNumberToken,
                onInfoIconActivated: tt.parseCallback,
                iconComponent: tt.parseUiComponent
            }
        },
        lt[us.SlotOverlay] = {
            component: hs(fr),
            propParsers: {
                anchorPoint: tt.parseVector2,
                automaticSize: tt.parseAutomaticSize,
                size: tt.parseUDim2,
                position: tt.parseUDim2,
                topLeftSlot: tt.parseUiComponent,
                topMiddleSlot: tt.parseUiComponent,
                topRightSlot: tt.parseUiComponent,
                centerLeftSlot: tt.parseUiComponent,
                centerMiddleSlot: tt.parseUiComponent,
                centerRightSlot: tt.parseUiComponent,
                bottomLeftSlot: tt.parseUiComponent,
                bottomMiddleSlot: tt.parseUiComponent,
                bottomRightSlot: tt.parseUiComponent,
                padding: tt.parseFoundationNumberToken
            }
        },
        lt[us.CollectionCarousel] = {
            component: hs(Zn),
            propParsers: {
                layoutOverrides: {
                    columnGap: tt.parseFoundationNumberToken,
                    sideMargin: tt.parseFoundationNumberToken
                },
                onScrollToEnd: tt.parseCallback,
                headerComponent: tt.parseUiComponent
            }
        },
        lt[us.ImageWithGradient] = {
            component: hs(function(e) {
                var t = e.image
                  , n = e.imageContainerHeight
                  , r = e.imageAspectRatio
                  , o = e.gradient
                  , e = e.borderRadius
                  , r = Yr({
                    imageContainerHeight: n,
                    borderRadius: void 0 === e ? 0 : e,
                    imageAspectRatio: r
                }).classes;
                return $.createElement("div", {
                    className: r.imageWithGradientWindow,
                    "data-testid": "image-with-gradient-window"
                }, $.createElement("div", {
                    className: r.imageContainer,
                    "data-testid": "image-container"
                }, t), o && $.createElement(Ur, {
                    gradient: o
                }))
            }),
            propParsers: {
                image: tt.parseAssetUrlIntoComponent,
                gradient: tt.parseGradient
            }
        },
        lt[us.AttributionRow] = {
            component: hs(et),
            propParsers: {
                rightButtonContent: tt.parseUiComponent,
                image: tt.parseAssetUrlIntoComponent,
                titleFontStyle: tt.parseFoundationTypographyToken,
                subtitleFontStyle: tt.parseFoundationTypographyToken,
                titleSubtitleGap: tt.parseFoundationNumberToken,
                height: tt.parseFoundationNumberToken
            }
        },
        lt), Ts = function(e) {
            return xs[e] ? xs[e].component : null
        }, ks = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }, Os = ks.High, _s = function(e, n) {
            if (!e)
                return {};
            e = e.find(function(e) {
                e = e.conditions;
                return !e || Object.entries(e).every(function(e) {
                    var t = e[0]
                      , e = e[1];
                    return gs(t, e, n)
                })
            });
            return e ? e.overrides : {}
        }, As = Object.keys(Al), Ns = Object.keys(_l), Rs = function() {
            return (Rs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Ls = function(e) {
            var t = e.componentConfig
              , n = e.parentAnalyticsContext
              , r = e.sduiContext
              , o = e.localAnalyticsData
              , i = e.extraLocalProps
              , a = (0,
            $.useMemo)(function() {
                return t.templateKey ? r.templateRegistry.resolveTemplateForConfig(t) : t
            }, [t, r]);
            return (0,
            $.useMemo)(function() {
                if (!Dl(a))
                    return fl($a.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(a) + " to build React props and children"),
                    X().createElement(X().Fragment, null);
                var e = a.componentType
                  , t = Ts(e);
                return t ? a.conditionalProps ? X().createElement(ws, {
                    wrappedComponent: t,
                    componentConfig: a,
                    parentAnalyticsContext: n,
                    sduiContext: r,
                    localAnalyticsData: o,
                    extraLocalProps: i
                }) : a.responsiveProps ? X().createElement(ys, {
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
                }) : (fl($a.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(a)),
                X().createElement(X().Fragment, null))
            }, [a, n, r, o, i])
        }, tt = (Es = function(e, t) {
            return (Es = Object.setPrototypeOf || {
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
            Es(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        function Ds(e) {
            e = Ps.call(this, e) || this;
            return e.state = {
                hasError: !1
            },
            e
        }
        function Ms(e) {
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
        function Fs(e) {
            var n = e.sort
              , r = e.sduiRoot
              , o = e.currentPage
              , i = pn()
              , a = Ks(null == r ? void 0 : r.templates)
              , t = (0,
            $.useMemo)(function() {
                var e = Ll(r, n.feedItemKey);
                if (!e)
                    return X().createElement(X().Fragment, null);
                var t = $s({}, il(i, o));
                return X().createElement("div", {
                    className: "sdui-feed-item-container"
                }, X().createElement(Ls, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: t,
                    sduiContext: a
                }))
            }, [n, r, i, o, a])
              , e = (0,
            $.useCallback)(function(e, t) {
                fl($a.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(n) + " and sdui root " + JSON.stringify(r) + " with error message " + e + " and callstack " + t)
            }, [n, r]);
            return X().createElement(Bs, {
                fallback: X().createElement(X().Fragment, null),
                logError: e
            }, t)
        }
        function Us(e) {
            var t = e.sort
              , n = (e.positionId,
            e.currentPage)
              , r = (0,
            p.useTokens)()
              , o = Ks(void 0)
              , i = pn()
              , a = (0,
            $.useMemo)(function() {
                return il(i, n)
            }, [i, n])
              , l = (0,
            $.useMemo)(function() {
                return t.songs.map(function(e) {
                    return {
                        componentType: us.Tile,
                        analyticsData: {
                            id: e.assetId
                        },
                        props: {
                            imageAspectRatio: 1,
                            titleText: e.title,
                            image: "rbxthumb://type=Asset&id=" + e.albumArtAssetId + "&w=150&h=150",
                            footerComponent: {
                                componentType: us.TileFooter,
                                props: {
                                    leftText: e.artist
                                }
                            }
                        }
                    }
                })
            }, [t.songs])
              , e = (0,
            $.useMemo)(function() {
                var e;
                return {
                    componentType: us.CollectionCarousel,
                    props: {
                        items: l,
                        layoutOverrides: {
                            sideMargin: r.Gap.XLarge
                        },
                        scrollingEnabledOverride: !0,
                        collectionItemSize: "Small",
                        headerComponent: {
                            componentType: us.SectionHeader,
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
            return 0 === l.length ? null : X().createElement(Ls, {
                componentConfig: e,
                parentAnalyticsContext: {},
                localAnalyticsData: a,
                sduiContext: o
            })
        }
        var Bs = (Ps = X().Component,
        tt(Ds, Ps),
        Ds.getDerivedStateFromError = function() {
            return {
                hasError: !0
            }
        }
        ,
        Ds.prototype.componentDidCatch = function(e, t) {
            e = e.message,
            t = t.componentStack;
            (0,
            this.props.logError)(e, t)
        }
        ,
        Ds.prototype.render = function() {
            var e = this.state.hasError
              , t = this.props
              , n = t.fallback
              , t = t.children;
            return e ? n : t
        }
        ,
        Ds)
          , Gs = function() {
            return (Gs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Hs = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , js = function(e) {
            var i = (0,
            $.useMemo)(function() {
                var n = new Map;
                return e && Object.entries(e).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n.set(t, e)
                }),
                n
            }, [e])
              , a = (0,
            $.useCallback)(function(e, t) {
                var n = e.templateKey;
                if (!n)
                    return e;
                var r = (0,
                gi.cloneDeep)(e);
                if (t && t[n])
                    return fl($a.TemplateResolutionCircularReference, "Circular reference detected for template key: " + n),
                    r.templateKey = void 0,
                    r;
                var o = t || {};
                o[n] = !0;
                t = i.get(n);
                if (!t)
                    return fl($a.TemplateResolutionTemplateNotFound, "Template not found for template key: " + n + " with config: " + JSON.stringify(e)),
                    r.templateKey = void 0,
                    r;
                t = a(t, o);
                if (r.templateKey = void 0,
                e.componentType) {
                    if (e.componentType && t.componentType && e.componentType !== t.componentType)
                        return fl($a.TemplateResolutionComponentTypeMismatch, "Component type mismatch for template key: " + n + ". Template type: " + t.componentType + ", Config type: " + e.componentType),
                        r
                } else
                    r.componentType = t.componentType;
                return t.analyticsData && (r.analyticsData = Gs(Gs({}, t.analyticsData), e.analyticsData)),
                t.props && (r.props = null !== (o = t.props,
                n = e.props,
                n = o ? (0,
                gi.merge)((0,
                gi.cloneDeep)(o), n) : (0,
                gi.cloneDeep)(n)) && void 0 !== n ? n : {}),
                t.children && (r.children = Hs(Hs([], t.children), e.children || [])),
                r
            }, [i]);
            return (0,
            $.useMemo)(function() {
                return {
                    resolveTemplateForConfig: a
                }
            }, [a])
        }
          , zs = function() {
            return (zs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ws = function(e, a, l, s) {
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
          , Vs = function(n, r) {
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
          , qs = function() {
            var e = (0,
            $.useState)({})
              , t = e[0]
              , i = e[1]
              , a = (0,
            $.useRef)({})
              , l = (0,
            $.useCallback)(function(e) {
                var t, n, r;
                "Roblox.Presence.Update" === (t = e).type && "detail"in t && e.detail && a.current ? (n = (0,
                gi.cloneDeep)(a.current),
                e.detail.forEach(function(e) {
                    n[e.userId] && (n[e.userId] = zs(zs({}, n[e.userId]), {
                        presence: e
                    }))
                }),
                a.current = n,
                r = Ms(n),
                i(function(e) {
                    return (0,
                    gi.isEqual)(r, e) ? e : r
                })) : fl($a.InvalidPresenceUpdateEvent, "Invalid presence update event, event is " + JSON.stringify(e) + " and friends details are " + JSON.stringify(a.current))
            }, [a]);
            return (0,
            $.useEffect)(function() {
                var e = ke.deviceMeta.getDeviceMeta();
                if ((null == e ? void 0 : e.deviceType) === ke.deviceMeta.DeviceTypes.computer && null !== T.CurrentUser && void 0 !== T.CurrentUser && T.CurrentUser.isAuthenticated)
                    return Ws(void 0, void 0, Promise, function() {
                        var t, n, r, o;
                        return Vs(this, function(e) {
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
                                    return n && n.names && (e[t.id] = zs(zs({}, t), {
                                        displayName: n.names.combinedName,
                                        name: n.names.username
                                    })),
                                    e
                                }, {}),
                                a.current = o,
                                o = Ms(o),
                                i(o),
                                document.addEventListener("Roblox.Presence.Update", l),
                                [3, 4];
                            case 3:
                                return o = e.sent(),
                                fl($a.FriendsPresenceFetchFailure, "Failed to get friends details info, error is " + JSON.stringify(o)),
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
            $.useMemo)(function() {
                return {
                    inGameFriendsByUniverseId: t
                }
            }, [t])
        }
          , Js = function() {
            var e = qs();
            return (0,
            $.useMemo)(function() {
                return {
                    social: e
                }
            }, [e])
        }
          , Ks = function(e) {
            var t = (0,
            p.useTokens)()
              , n = js(e)
              , r = Js()
              , o = (0,
            $.useMemo)(function() {
                return {
                    tokens: t
                }
            }, [t]);
            return (0,
            $.useMemo)(function() {
                return {
                    dependencies: o,
                    templateRegistry: n,
                    dataStore: r
                }
            }, [o, n, r])
        }
          , $s = function() {
            return ($s = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Xs() {
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
        function Ys(o) {
            var i = pn();
            (0,
            $.useEffect)(function() {
                var t = window.scrollY
                  , e = Ie(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    yo({
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
        (lt = function(e) {
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
                return X().createElement(ei, {
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
                return X().createElement(Zo, {
                    sort: n
                });
            case w.SortlessGrid:
                return X().createElement(hi, {
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
                return X().createElement(Ha, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case w.SongCarousel:
                return X().createElement(Us, {
                    sort: n,
                    positionId: r,
                    currentPage: o
                });
            case w.Pills:
                return X().createElement(Xa, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: h
                });
            case w.Sdui:
                return X().createElement(Fs, {
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
        var Zs = lt
          , Qs = function(e, o, r) {
            var t = (0,
            $.useState)(new Map)
              , i = t[0]
              , n = t[1]
              , t = (0,
            $.useState)(new Map)
              , s = t[0]
              , a = t[1]
              , l = (0,
            p.usePrevious)(s)
              , u = (0,
            p.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            $.useEffect)(function() {
                void 0 !== l && (0,
                gi.isEqual)(s, l) && (0,
                gi.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
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
            $.useMemo)(function() {
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
            $.useRef)(null)
              , d = (0,
            $.useCallback)(function(e, t) {
                if (o || e.treatmentType === w.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, o, i) {
                        var a = n ? (r ? xt : Pt)[n] : Tt;
                        if (!e)
                            return a.minTilesPerRow;
                        var l = a.minTileWidth
                          , s = a.columnGap
                          , n = a.minTilesPerRow
                          , a = a.maxTilesPerRow
                          , s = Math.floor((e - t + s) / (l + s))
                          , s = Math.min(a, Math.max(n, s));
                        return r && o === w.Carousel && void 0 !== i && s < i ? s + .3 : s
                    }(t, 1, n, r || n === K.EventTile, null == e ? void 0 : e.treatmentType, null === (n = null == e ? void 0 : e.recommendationList) || void 0 === n ? void 0 : n.length)
                }
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === K.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === K.EventTile ? t && t < Je.wideGameTileTilesPerRowBreakpointWidth ? Je.minWideGameTilesPerCarouselPage : Je.maxWideGameTilesPerCarouselPage : t && t < Je.homeFeedMaxWidth ? Math.max(1, Math.floor(t / Je.gameTileWidth)) : Je.maxTilesPerCarouselPage
            }, [o, r])
              , f = (0,
            $.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === w.SortlessGrid || e.treatmentType === w.InterestGrid || o && e.treatmentType === w.Carousel) && r.set(t, d(e, n))
                }),
                a(r)
            }, [null == e ? void 0 : e.sorts, d, o]);
            return (0,
            $.useLayoutEffect)(function() {
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
          , eu = function() {
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
          , tt = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , tu = (T.EnvironmentUrls.apiGatewayUrl,
        T.EnvironmentUrls.voiceApi);
        function nu(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var ru = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(tu, "/v1/settings/user-opt-in")
                            },
                            o = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            A.httpService.post(r, o);
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
                        nu(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        nu(r, t, n, o, i, "throw", e)
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
        function ou(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function iu(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function au(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? iu(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : iu(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function lu(e, n) {
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
                            return null === T.UpsellService || void 0 === T.UpsellService ? void 0 : T.UpsellService.renderPhoneUpsell(au({
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
                                                ru(!0, !1);
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
                                            ou(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            ou(r, t, n, o, i, "throw", e)
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
                    buttonStackOrientation: mu
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
                    buttonStackOrientation: pu
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
        var su = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , uu = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , cu = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , du = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , fu = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , pu = "vertical"
          , mu = "horizontal"
          , vu = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function hu(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function gu(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? hu(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : hu(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function yu(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            x.eventStreamService.sendEventWithTarget(e.type, du[n], gu(gu({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var lt = x.eventStreamService.eventTypes
          , bu = "mandatory"
          , Iu = "homepage"
          , Su = {
            cardShown: {
                name: "cardShown",
                type: lt.modalAction,
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
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = Cu((0,
            $.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = fu[n];
            (0,
            $.useEffect)(function() {
                yu(Su.cardShown, r, n, c)
            }, []);
            var e = lu(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? X().createElement(ye.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    yu(Su.buttonClick, r, n, c, d.buttonClickBtnLog),
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
                    yu(Su.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : mu
              , a = X().createElement("div", {
                className: e === mu ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = Pu(o) ? t(uu[n]) : o
              , i = Pu(i) ? t(cu[n]) : i
              , o = X().createElement("div", {
                className: "upsell-card-text-content-group"
            }, uu[n] ? X().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, X().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = vu[n] ? X().createElement("div", {
                className: "home-page-upsell-card-image ".concat(vu[n])
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
        function Pu(e) {
            return !e || 0 === e.length
        }
        Eu.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        Eu.propTypes = {
            translate: st().func.isRequired,
            cardType: st().string.isRequired,
            titleTextOverride: st().string,
            bodyTextOverride: st().string,
            origin: st().string,
            requireExplicitVoiceConsent: st().bool
        };
        var xu = Eu
          , Tu = function(e) {
            return !![su.ContactMethodEmail, su.ContactMethodPhoneNumber, su.ContactMethodPhoneNumberEmailHorizontalLayout, su.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, su.ContactMethodPhoneNumberEmailVerticalLayout, su.ContactMethodPhoneNumberVoiceOptIn, su.FacebookSunset].includes(e)
        };
        function ku(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ou(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        ku(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        ku(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function _u(e, t) {
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
                    return Au(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Au(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Au(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Nu(e) {
            var t = e.translate
              , n = su.ContactMethodMandatoryEmailPhone
              , r = _u((0,
            $.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = _u((0,
            $.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = _u((0,
            $.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = _u((0,
            $.useState)(!1), 2)
              , e = a[0]
              , c = a[1]
              , a = _u((0,
            $.useState)(!1), 2);
            a[0],
            a[1];
            return (0,
            $.useEffect)(function() {
                var e = function() {
                    var e = Ou(regeneratorRuntime.mark(function e() {
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
                    var e = Ou(regeneratorRuntime.mark(function e() {
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
            $.useEffect)(function() {
                o === n && null !== T.UpsellService && void 0 !== T.UpsellService && T.UpsellService.renderContactMethodPromptModal({
                    origin: Iu,
                    section: bu
                })
            }, [o]),
            Tu(o) ? X().createElement(xu, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        Nu.propTypes = {
            translate: st().func.isRequired
        };
        var Ru = Nu;
        function Lu(e) {
            var t = e.translate
              , e = e.context;
            return X().createElement(Ru, {
                translate: t,
                context: e
            })
        }
        function Du(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            $.useRef)(null), u = (0,
            $.useRef)(null), c = Vo().contentMetadata, d = (0,
            $.useMemo)(function() {
                return Io(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
            $.useCallback)(function(t) {
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
            $.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && x.eventStreamService.sendEvent.apply(x.eventStreamService, e)
            }, [r, f]), e = (0,
            $.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return Hu(Hu(Hu(((e = {})[R.RootPlaceIds] = t.map(function(e) {
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
            return vn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            $.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            X().createElement(fi, {
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
        function Mu(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            $.useState)(new Set))[0]
              , a = f[1]
              , l = pn()
              , s = (0,
            $.useCallback)(function(e) {
                var t = {};
                return t[R.ButtonName] = e,
                t[F.HomePageSessionInfo] = l,
                t[R.InterestedUniverseIds] = Array.from(i),
                t[R.Page] = Y.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            $.useCallback)(function(e) {
                e = s(e),
                e = ee.interestCatcherClick(e);
                void 0 !== e && x.eventStreamService.sendEvent.apply(x.eventStreamService, e)
            }, [s])
              , c = (0,
            $.useCallback)(function() {
                r([]),
                u(y.Skip)
            }, [r, u])
              , d = (0,
            $.useCallback)(function() {
                r(Array.from(i)),
                u(y.Continue)
            }, [i, r, u])
              , e = (0,
            $.useMemo)(function() {
                return null != i && i.size ? o(it.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(it.ActionInterestCatcherContinue)
            }, [i, o])
              , f = (0,
            $.useCallback)(function(e) {
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
            }, e))), X().createElement(Du, {
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
        function Fu(e) {
            var t = e.children
              , n = (0,
            $.useState)(null)
              , e = n[0]
              , r = n[1];
            return (0,
            $.useEffect)(function() {
                Xu().then(function(e) {
                    null != (null == e ? void 0 : e.data) && r(e.data)
                }, function(e) {
                    console.error(e)
                })
            }, []),
            X().createElement(Yu.Provider, {
                value: e
            }, t)
        }
        Lu.defaultProps = {
            context: su.ContactMethod
        },
        Lu.propTypes = {
            translate: st().func.isRequired,
            context: st().string
        };
        var Uu, Bu, Gu = (0,
        p.withTranslations)(Lu, tt), Hu = function() {
            return (Hu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ju = function() {
            return (ju = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, zu = Je.maxTilesPerCarouselPage, Wu = n, Vu = t, qu = (Uu = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = pn()
              , r = (0,
            $.useState)(void 0)
              , o = r[0]
              , i = r[1]
              , a = (0,
            $.useState)(!1)
              , l = a[0]
              , s = a[1]
              , u = (0,
            $.useMemo)(function() {
                return eu()
            }, [])
              , c = (0,
            $.useMemo)(function() {
                try {
                    return (0,
                    x.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            $.useCallback)(function(e) {
                i(void 0),
                s(!1),
                pe(Ce.Home, t, u, c, e, [E.Carousel, E.HeroUnit]).then(function(e) {
                    i(e),
                    (0,
                    P.fireEvent)(Je.omniRecommendationEndpointSuccessEvent),
                    Qa(e, t)
                }).catch(function() {
                    s(!0),
                    (0,
                    P.fireEvent)(Je.omniRecommendationEndpointErrorEvent)
                })
            }, [t, u, c]);
            (0,
            $.useEffect)(function() {
                d()
            }, [d]);
            var f = (0,
            $.useState)(void 0)
              , e = f[0]
              , p = f[1];
            (0,
            $.useEffect)(function() {
                fe(Wu.homePageWeb, Vu.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(Vu.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , r = (0,
            $.useState)(void 0)
              , a = r[0]
              , v = r[1];
            (0,
            $.useEffect)(function() {
                fe(Wu.gridUi, Vu.gridUi).then(function(e) {
                    v(e)
                }).catch(function() {
                    v(Vu.gridUi)
                })
            }, []);
            var h = null == a ? void 0 : a.IsNewSortHeaderEnabled
              , g = null == a ? void 0 : a.IsCarouselHorizontalScrollEnabled
              , y = null == a ? void 0 : a.IsNewScrollArrowsEnabled
              , f = (0,
            $.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && ju(ju({}, e), {
                        contentMetadata: ((t = {})[C.Game] = ju(ju({}, e.contentMetadata[C.Game]), n[C.Game]),
                        t[C.CatalogAsset] = ju(ju({}, e.contentMetadata[C.CatalogAsset]), n[C.CatalogAsset]),
                        t[C.CatalogBundle] = ju(ju({}, e.contentMetadata[C.CatalogBundle]), n[C.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , e = Qs(o, m, g)
              , r = e.homeFeedRef
              , b = e.gridRecommendationsMap
              , I = e.itemsPerRowMap
              , S = e.startingRowNumbersMap;
            Ys(Y.HomePage);
            a = (0,
            $.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== w.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            e = (0,
            $.useMemo)(function() {
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
                    length: zu
                }, function(e, t) {
                    return X().createElement(Xs, {
                        key: t
                    })
                })));
            if (void 0 !== e && -1 < e) {
                l = o.sorts[e];
                if (l && So(l))
                    return X().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, X().createElement("div", {
                        ref: r
                    }, X().createElement(qo.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: f
                        }
                    }, X().createElement(Mu, {
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
            }, X().createElement(qo.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: f
                }
            }, X().createElement(Gu, {
                translate: n,
                context: void 0
            }), a && X().createElement(Ga, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return X().createElement(X().Fragment, {
                    key: t
                }, X().createElement(Zs, {
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
        }, oe),
        function(e) {
            return X().createElement(fn, null, X().createElement(Uu, hn({}, e)))
        }
        ), Ju = function(e, a, l, s) {
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
        }, Ku = function(n, r) {
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
        }, $u = T.EnvironmentUrls.userModerationApi + "/v1/reminder", Xu = function() {
            return Ju(void 0, void 0, Promise, function() {
                var t;
                return Ku(this, function(e) {
                    return t = {
                        url: $u,
                        withCredentials: !0
                    },
                    [2, A.httpService.get(t)]
                })
            })
        }, Yu = (0,
        $.createContext)(null), Zu = {
            common: [],
            feature: "Feature.Home"
        }, Qu = function(e, t) {
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
        function ec() {
            var e = (s = (0,
            $.useState)(!1))[0]
              , t = s[1]
              , n = (0,
            $.useContext)(Yu)
              , r = (0,
            $.useRef)(0)
              , o = T.CurrentUser.userId;
            (0,
            $.useEffect)(function() {
                r.current = Date.now()
            }, []);
            var i = (0,
            p.useTranslation)().translate;
            if (null == n || null == n || !n.shouldSurfaceReminder || null == n || !n.policyViolation)
                return null;
            var a = n.interventionId
              , l = !e && (null == n ? void 0 : n.shouldSurfaceReminder)
              , s = (u = Qu(n, i)).dialogTitle
              , e = u.dialogBodyAbuseType
              , i = u.dialogBodyGuidelineReminder
              , u = u.confirmationButtonLabel;
            return X().createElement(ye.Modal, {
                className: "reminder-of-norms-dialog-modal",
                show: l,
                onHide: function() {
                    var e = Date.now();
                    tc(a, Bu.DISMISSED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
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
                    tc(a, Bu.CTA_CLICKED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, u)))
        }
        (oe = Bu = Bu || {}).CTA_CLICKED = "REMINDER_INTERACTION_CTA_CLICKED",
        oe.DISMISSED = "REMINDER_INTERACTION_REMINDER_DISMISSED";
        var tc = function(e, t, n, r, o, i, a) {
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
        function nc() {
            return X().createElement(p.TranslationProvider, {
                config: Zu
            }, X().createElement(Fu, null, X().createElement(ec, null)))
        }
        var rc = (0,
        p.withTranslations)(function(e) {
            e = e.translate;
            return X().createElement("div", {
                id: "HomeContainer",
                className: "row home-container expand-max-width"
            }, X().createElement("div", {
                className: "section"
            }, X().createElement("div", {
                className: "col-xs-12 container-header"
            }, X().createElement("h1", null, e(ot.LabelsHome)))), X().createElement("div", null, X().createElement(nc, null)), X().createElement("div", {
                className: "place-list-container"
            }, X().createElement(qu, null)))
        }, {
            common: [],
            feature: "CommonUI.Features"
        });
        (0,
        A.ready)(function() {
            c() ? (0,
            e.render)(X().createElement(qu, null), c()) : document.getElementById("places-list-web-app") && document.getElementById("content") ? (0,
            e.render)(X().createElement(rc, null), document.getElementById("content")) : (0,
            P.fireEvent)("HomePageMissingContainerDiv")
        })
    }()
}();
//# sourceMappingURL=https://sourcemaps.rbxcdn.com/75b88e5ee5e988a9480dbdd61c41d300-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
