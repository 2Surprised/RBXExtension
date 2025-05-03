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
            function w(e) {
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
                return n = w(n) || 0,
                S(e) && (d = !!e.leading,
                f = "maxWait"in e,
                a = f ? b(w(e.maxWait) || 0, n) : a,
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
                return n = C(n) || 0,
                w(e) && (d = !!e.leading,
                f = "maxWait"in e,
                a = f ? b(C(e.maxWait) || 0, n) : a,
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
            function w(e) {
                var t = typeof e;
                return e && ("object" == t || "function" == t)
            }
            function C(e) {
                if ("number" == typeof e)
                    return e;
                if ("symbol" == typeof (t = e) || !!(n = t) && "object" == typeof n && f.call(t) == i)
                    return o;
                var t, n;
                if (w(e) && (e = w(r = "function" == typeof e.valueOf ? e.valueOf() : e) ? r + "" : r),
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
                return w(n) && (r = "leading"in n ? !!n.leading : r,
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
        5250: function(A, k, O) {
            var R;
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
                var Hi, zi = "Expected a function", Wi = "__lodash_hash_undefined__", Vi = "__lodash_placeholder__", qi = 128, Ji = 9007199254740991, $i = NaN, Xi = 4294967295, Yi = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Ki = "[object Arguments]", Zi = "[object Array]", Qi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", va = "[object Float32Array]", ha = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", Ia = "[object Uint8Array]", Sa = "[object Uint8ClampedArray]", wa = "[object Uint16Array]", Ca = "[object Uint32Array]", Ea = /\b__p \+= '';/g, Pa = /\b(__p \+=) '' \+/g, xa = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ta = /&(?:amp|lt|gt|quot|#39);/g, _a = /[&<>"']/g, Na = RegExp(Ta.source), Aa = RegExp(_a.source), ka = /<%-([\s\S]+?)%>/g, Oa = /<%([\s\S]+?)%>/g, Ra = /<%=([\s\S]+?)%>/g, La = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Da = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fa = /[\\^$.*+?()[\]{}|]/g, Ua = RegExp(Fa.source), Ba = /^\s+/, n = /\s/, Ga = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ja = /\{\n\/\* \[wrapped with (.+)\] \*/, Ha = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Wa = /[()=,{}\[\]\/\s]/, Va = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ja = /\w*$/, $a = /^[-+]0x[0-9a-f]+$/i, Xa = /^0b[01]+$/i, Ya = /^\[object .+?Constructor\]$/, Ka = /^0o[0-7]+$/i, Za = /^(?:0|[1-9]\d*)$/, Qa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", v = "[^" + e + l + f + r + o + i + "]", h = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "[" + i + "]", S = "\\u200d", w = "(?:" + m + "|" + v + ")", l = "(?:" + I + "|" + v + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + h + ")" + "?", v = "[" + a + "]?", i = v + i + ("(?:" + S + "(?:" + [g, y, b].join("|") + ")" + v + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), C = RegExp(h + "(?=" + h + ")|" + u + i, "g"), ol = RegExp([I + "?" + m + "+" + r + "(?=" + [c, I, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, I + w, "$"].join("|") + ")", I + "?" + w + "+" + r, I + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), E = RegExp("[" + S + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
                sl[va] = sl[ha] = sl[ga] = sl[ya] = sl[ba] = sl[Ia] = sl[Sa] = sl[wa] = sl[Ca] = !0,
                sl[Ki] = sl[Zi] = sl[pa] = sl[Qi] = sl[ma] = sl[ea] = sl[ta] = sl[na] = sl[oa] = sl[ia] = sl[aa] = sl[sa] = sl[ua] = sl[ca] = sl[fa] = !1;
                var ul = {};
                ul[Ki] = ul[Zi] = ul[pa] = ul[ma] = ul[Qi] = ul[ea] = ul[va] = ul[ha] = ul[ga] = ul[ya] = ul[ba] = ul[oa] = ul[ia] = ul[aa] = ul[sa] = ul[ua] = ul[ca] = ul[da] = ul[Ia] = ul[Sa] = ul[wa] = ul[Ca] = !0,
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
                  , t = "object" == typeof O.g && O.g && O.g.Object === Object && O.g
                  , a = "object" == typeof self && self && self.Object === Object && self
                  , fl = t || a || Function("return this")()
                  , a = k && !k.nodeType && k
                  , x = a && A && !A.nodeType && A
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
                function wl(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function Cl(e, t) {
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
                function Nl(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r; )
                        e[o + n] = t[n];
                    return e
                }
                function Al(e, t, n, r) {
                    var o = -1
                      , i = null == e ? 0 : e.length;
                    for (r && i && (n = e[++o]); ++o < i; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function kl(e, t, n, r) {
                    var o = null == e ? 0 : e.length;
                    for (r && o && (n = e[--o]); o--; )
                        n = t(n, e[o], o, e);
                    return n
                }
                function Ol(e, t) {
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
                function N(t) {
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
                var Xl = N({
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
                  , Yl = N({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function Kl(e) {
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
                        var t = C.lastIndex = 0;
                        for (; C.test(e); )
                            ++t;
                        return t
                    }
                    : _)(e)
                }
                function os(e) {
                    return Zl(e) ? e.match(C) || [] : e.split("")
                }
                function is(e) {
                    for (var t = e.length; t-- && n.test(e.charAt(t)); )
                        ;
                    return t
                }
                var as = N({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                });
                var ls = function e(t) {
                    var C = (t = null == t ? fl : ls.defaults(fl.Object(), t, ls.pick(fl, al))).Array
                      , n = t.Date
                      , d = t.Error
                      , f = t.Function
                      , o = t.Math
                      , v = t.Object
                      , p = t.RegExp
                      , c = t.String
                      , w = t.TypeError
                      , i = C.prototype
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
                      , N = m.propertyIsEnumerable
                      , A = i.splice
                      , k = E ? E.isConcatSpreadable : Hi
                      , O = E ? E.iterator : Hi
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
                      , X = o.random
                      , Y = i.reverse
                      , K = Hn(t, "DataView")
                      , Z = Hn(t, "Map")
                      , Q = Hn(t, "Promise")
                      , ee = Hn(t, "Set")
                      , te = Hn(t, "WeakMap")
                      , ne = Hn(v, "create")
                      , re = te && new te
                      , oe = {}
                      , ie = hr(K)
                      , ae = hr(Z)
                      , le = hr(Q)
                      , se = hr(ee)
                      , ue = hr(te)
                      , ce = E ? E.prototype : Hi
                      , de = ce ? ce.valueOf : Hi
                      , fe = ce ? ce.toString : Hi;
                    function pe(e) {
                        if (Lo(e) && !Co(e) && !(e instanceof ye)) {
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
                        this.__takeCount__ = Xi,
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
                    function we(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.__data__ = new Se; ++t < n; )
                            this.add(e[t])
                    }
                    function Ce(e) {
                        e = this.__data__ = new Ie(e);
                        this.size = e.size
                    }
                    function Ee(e, t) {
                        var n, r = Co(e), o = !r && wo(e), i = !r && !o && To(e), a = !r && !o && !i && Ho(e), l = r || o || i || a, s = l ? Hl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Xn(n, u)) || s.push(n);
                        return s
                    }
                    function Pe(e) {
                        var t = e.length;
                        return t ? e[wt(0, t - 1)] : Hi
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
                    function Ne(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== Hi || t in e) || Re(e, t, n)
                    }
                    function Ae(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function ke(e, r, o, i) {
                        return Ge(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function Oe(e, t) {
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
                        for (var n = -1, r = t.length, o = C(r), i = null == e; ++n < r; )
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
                        var c, d, f = Co(n);
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
                                return Kt(n, l);
                            if (p == aa || p == Ki || e && !t) {
                                if (a = s || e ? {} : Jn(n),
                                !l)
                                    return s ? (e = c = n,
                                    d = (d = a) && on(e, di(e), d),
                                    on(c, Wn(c), d)) : (d = Oe(a, c = n),
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
                                    case wa:
                                    case Ca:
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
                        l = (i = i || new Ce).get(n);
                        if (l)
                            return l;
                        i.set(n, a),
                        Bo(n) ? n.forEach(function(e) {
                            a.add(Me(e, r, o, e, n, i))
                        }) : Do(n) && n.forEach(function(e, t) {
                            a.set(t, Me(e, r, o, t, n, i))
                        });
                        var m = f ? Hi : (u ? s ? Dn : Ln : s ? di : ci)(n);
                        return wl(m || n, function(e, t) {
                            m && (e = n[t = e]),
                            Ne(a, t, Me(e, r, o, t, n, i))
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
                            throw new w(zi);
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
                        t = new we(t));
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
                        escape: ka,
                        evaluate: Oa,
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
                        return !((e = Ae(t, e)) < 0) && (e == t.length - 1 ? t.pop() : A.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = Ae(t, e)) < 0 ? Hi : t[e][1]
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return -1 < Ae(this.__data__, e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = Ae(n, e);
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
                    we.prototype.add = we.prototype.push = function(e) {
                        return this.__data__.set(e, Wi),
                        this
                    }
                    ,
                    we.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ce.prototype.clear = function() {
                        this.__data__ = new Ie,
                        this.size = 0
                    }
                    ,
                    Ce.prototype.delete = function(e) {
                        var t = this.__data__
                          , e = t.delete(e);
                        return this.size = t.size,
                        e
                    }
                    ,
                    Ce.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    Ce.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Ce.prototype.set = function(e, t) {
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
                      , je = sn(Xe, !0);
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
                            0 < t && n(l) ? 1 < t ? Ve(l, t - 1, n, r, o) : Nl(o, l) : r || (o[o.length] = l)
                        }
                        return o
                    }
                    var qe = un()
                      , Je = un(!0);
                    function $e(e, t) {
                        return e && qe(e, t, ci)
                    }
                    function Xe(e, t) {
                        return e && Je(e, t, ci)
                    }
                    function Ye(t, e) {
                        return Pl(e, function(e) {
                            return Ao(t[e])
                        })
                    }
                    function Ke(e, t) {
                        for (var n = 0, r = (t = Jt(t, e)).length; null != e && n < r; )
                            e = e[vr(t[n++])];
                        return n && n == r ? e : Hi
                    }
                    function Ze(e, t, n) {
                        t = t(e);
                        return Co(e) ? t : Nl(t, n(e))
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
                        for (var r = n ? Tl : xl, o = e[0].length, i = e.length, a = i, l = C(i), s = 1 / 0, u = []; a--; ) {
                            var c = e[a];
                            a && t && (c = _l(c, Wl(t))),
                            s = q(c.length, s),
                            l[a] = !n && (t || 120 <= o && 120 <= c.length) ? new we(a && c) : Hi
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
                        return Lo(e) && Qe(e) == Ki
                    }
                    function at(e, t, n, r, o) {
                        return e === t || (null == e || null == t || !Lo(e) && !Lo(t) ? e != e && t != t : function(e, t, n, r, o, i) {
                            var a = Co(e)
                              , l = Co(t)
                              , s = a ? Zi : Vn(e)
                              , u = l ? Zi : Vn(t)
                              , c = (s = s == Ki ? aa : s) == aa
                              , l = (u = u == Ki ? aa : u) == aa
                              , u = s == u;
                            if (u && To(e)) {
                                if (!To(t))
                                    return !1;
                                c = !(a = !0)
                            }
                            if (u && !c)
                                return i = i || new Ce,
                                a || Ho(e) ? On(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
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
                                        l = On(l(e), l(t), r, o, i, a);
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
                                    return i = i || new Ce,
                                    o(c, l, n, r, i)
                                }
                            }
                            return u && (i = i || new Ce,
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
                                var d, f = new Ce;
                                if (r && (d = r(u, c, s, e, t, f)),
                                !(d === Hi ? at(c, u, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function st(e) {
                        return !(!Ro(e) || (t = e,
                        u && u in t)) && (Ao(e) ? I : Ya).test(hr(e));
                        var t
                    }
                    function ut(e) {
                        return "function" == typeof e ? e : null == e ? Li : "object" == typeof e ? Co(e) ? vt(e[0], e[1]) : mt(e) : Ui(e)
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
                          , i = Po(e) ? C(e.length) : [];
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
                        return Kn(n) && tr(r) ? nr(vr(n), r) : function(e) {
                            var t = ii(e, n);
                            return t === Hi && t === r ? ai(e, n) : at(r, t, 3)
                        }
                    }
                    function ht(r, o, i, a, l) {
                        r !== o && qe(o, function(e, t) {
                            var n;
                            l = l || new Ce,
                            Ro(e) ? function(e, t, n, r, o, i, a) {
                                var l = ir(e, n)
                                  , s = ir(t, n)
                                  , u = a.get(s);
                                if (u)
                                    return _e(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : Hi, f = d === Hi;
                                f && (c = Co(s),
                                u = !c && To(s),
                                t = !c && !u && Ho(s),
                                d = s,
                                c || u || t ? d = Co(l) ? l : xo(l) ? rn(l) : u ? Kt(s, !(f = !1)) : t ? Qt(s, !(f = !1)) : [] : Fo(s) || wo(s) ? wo(d = l) ? d = Yo(l) : Ro(l) && !Ao(l) || (d = Jn(s)) : f = !1),
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
                            return Xn(t += t < 0 ? n : 0, n) ? e[t] : Hi
                    }
                    function yt(e, r, n) {
                        r = r.length ? _l(r, function(t) {
                            return Co(t) ? function(e) {
                                return Ke(e, 1 === t.length ? t[0] : t)
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
                              , l = Ke(e, a);
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
                                l !== e && A.call(l, s, 1),
                                A.call(e, s, 1);
                        return e
                    }
                    function St(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || (Xn(o = i) ? A.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function wt(e, t) {
                        return e + B(X() * (t - e + 1))
                    }
                    function Ct(e, t) {
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
                            (c = r ? r(s, u, l) : Hi) === Hi && (c = Ro(s) ? s : Xn(t[o + 1]) ? [] : {})),
                            Ne(l, u, c),
                            l = l[u]
                        }
                        return e
                    }
                    var _t = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : Li
                      , Nt = L ? function(e, t) {
                        return L(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Oi(t),
                            writable: !0
                        })
                    }
                    : Li;
                    function At(e) {
                        return dr(bi(e))
                    }
                    function kt(e, t, n) {
                        var r = -1
                          , o = e.length;
                        t < 0 && (t = o < -t ? 0 : o + t),
                        (n = o < n ? o : n) < 0 && (n += o),
                        o = n < t ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var i = C(o); ++r < o; )
                            i[r] = e[r + t];
                        return i
                    }
                    function Ot(e, r) {
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
                        if (Co(e))
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
                            s = new we
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
                        return Tt(e, t, n(Ke(e, t)), r)
                    }
                    function jt(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? kt(e, r ? 0 : i, r ? i + 1 : o) : kt(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        Al(t, function(e, t) {
                            return t.func.apply(t.thisArg, Nl([e], t.args))
                        }, e)
                    }
                    function zt(e, t, n) {
                        var r = e.length;
                        if (r < 2)
                            return r ? Ut(e[0]) : [];
                        for (var o = -1, i = C(r); ++o < r; )
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
                        return Co(e) ? e : Kn(e, t) ? [e] : mr(Ko(e))
                    }
                    var $t = Et;
                    function Xt(e, t, n) {
                        var r = e.length;
                        return n = n === Hi ? r : n,
                        !t && r <= n ? e : kt(e, t, n)
                    }
                    var Yt = D || function(e) {
                        return fl.clearTimeout(e)
                    }
                    ;
                    function Kt(e, t) {
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
                        for (var o = -1, i = e.length, a = n.length, l = -1, s = t.length, u = V(i - a, 0), c = C(s + u), d = !r; ++l < s; )
                            c[l] = t[l];
                        for (; ++o < a; )
                            (d || o < i) && (c[n[o]] = e[o]);
                        for (; u--; )
                            c[l++] = e[o++];
                        return c
                    }
                    function nn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = -1, l = n.length, s = -1, u = t.length, c = V(i - l, 0), d = C(c + u), f = !r; ++o < c; )
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
                        for (t = t || C(r); ++n < r; )
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
                            (o ? Re : Ne)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = Co(e) ? Sl : ke
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
                            var t = Zl(e = Ko(e)) ? os(e) : Hi
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? Xt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return Al(Ai(wi(e).replace(nl, "")), t, "")
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
                            for (var t = arguments.length, n = C(t), r = t, o = Un(e); r--; )
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
                                    throw new w(zi);
                                t && !l && "wrapper" == Fn(n) && (l = new ge([],!0))
                            }
                            for (e = l ? e : i; ++e < i; )
                                var r = Fn(n = o[e])
                                  , a = "wrapper" == r ? Mn(n) : Hi
                                  , l = a && Zn(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9] ? l[Fn(a[0])].apply(l, a[3]) : 1 == n.length && Zn(n) ? l[r]() : l.thru(n);
                            return function() {
                                var e = arguments
                                  , t = e[0];
                                if (l && 1 == e.length && Co(t))
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
                          , w = b ? Hi : fn(l);
                        return function e() {
                            for (var t, n = C(a = arguments.length), r = a; r--; )
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
                                    e[r] = Xn(i, n) ? o[i] : Hi
                                }
                                return e
                            }(n, m) : S && 1 < a && n.reverse(),
                            g && v < a && (n.length = v),
                            this && this !== fl && this instanceof e && (o = w || fn(o)),
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
                            return n ? Ct(t, e) : t;
                        n = Ct(t, U(e / rs(t)));
                        return Zl(t) ? Xt(os(n), 0, e).join("") : n.slice(0, e)
                    }
                    function Sn(l, e, s, u) {
                        var c = 1 & e
                          , d = fn(l);
                        return function e() {
                            for (var t = -1, n = arguments.length, r = -1, o = u.length, i = C(o + n), a = this && this !== fl && this instanceof e ? d : l; ++r < o; )
                                i[r] = u[r];
                            for (; n--; )
                                i[r++] = arguments[++t];
                            return Il(a, c ? s : this, i)
                        }
                    }
                    function wn(r) {
                        return function(e, t, n) {
                            return n && "number" != typeof n && Yn(e, t, n) && (t = n = Hi),
                            e = qo(e),
                            t === Hi ? (t = e,
                            e = 0) : t = qo(t),
                            function(e, t, n, r) {
                                for (var o = -1, i = V(U((t - e) / (n || 1)), 0), a = C(i); i--; )
                                    a[r ? i : ++o] = e,
                                    e += n;
                                return a
                            }(e, t, n = n === Hi ? e < t ? 1 : -1 : qo(n), r)
                        }
                    }
                    function Cn(n) {
                        return function(e, t) {
                            return "string" == typeof e && "string" == typeof t || (e = Xo(e),
                            t = Xo(t)),
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
                            if (e = Xo(e),
                            (t = null == t ? 0 : q(Jo(t), 292)) && H(e)) {
                                var n = (Ko(e) + "e").split("e");
                                return +((n = (Ko(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
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
                            throw new w(zi);
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
                    function Nn(e, t, n, r) {
                        return e === Hi || bo(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function An(e, t, n, r, o, i) {
                        return Ro(e) && Ro(t) && (i.set(t, e),
                        ht(e, t, Hi, An, i),
                        i.delete(t)),
                        e
                    }
                    function kn(e) {
                        return Fo(e) ? Hi : e
                    }
                    function On(e, t, n, r, o, i) {
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
                          , f = 2 & n ? new we : Hi;
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
                                if (!Ol(t, function(e, t) {
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
                        return sr(rr(e, Hi, Cr), e + "")
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
                            return N.call(t, e)
                        }))
                    }
                    : Bi
                      , Wn = G ? function(e) {
                        for (var t = []; e; )
                            Nl(t, zn(e)),
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
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && Oo(o) && Xn(a, o) && (Co(e) || wo(e))
                    }
                    function Jn(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function $n(e) {
                        return Co(e) || wo(e) || !!(k && e && e[k])
                    }
                    function Xn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? Ji : t) && ("number" == n || "symbol" != n && Za.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Yn(e, t, n) {
                        if (Ro(n)) {
                            var r = typeof t;
                            return ("number" == r ? Po(n) && Xn(t, n.length) : "string" == r && t in n) && bo(n[t], e)
                        }
                    }
                    function Kn(e, t) {
                        if (!Co(e)) {
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
                    (K && Vn(new K(new ArrayBuffer(1))) != ma || Z && Vn(new Z) != oa || Q && Vn(Q.resolve()) != la || ee && Vn(new ee) != ua || te && Vn(new te) != fa) && (Vn = function(e) {
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
                    var Qn = a ? Ao : Gi;
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
                            for (var e = arguments, t = -1, n = V(e.length - a, 0), r = C(n); ++t < n; )
                                r[t] = e[a + t];
                            t = -1;
                            for (var o = C(a + 1); ++t < a; )
                                o[t] = e[t];
                            return o[a] = l(r),
                            Il(i, this, o)
                        }
                    }
                    function or(e, t) {
                        return t.length < 2 ? e : Ke(e, kt(t, 0, -1))
                    }
                    function ir(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ar = cr(_t)
                      , lr = F || function(e, t) {
                        return fl.setTimeout(e, t)
                    }
                      , sr = cr(Nt);
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
                        wl(Yi, function(e) {
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
                            var i = wt(n, o)
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
                    function wr(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r - 1;
                        return n !== Hi && (o = Jo(n),
                        o = n < 0 ? V(r + o, 0) : q(o, r - 1)),
                        Ll(e, Bn(t, 3), o, !0)
                    }
                    function Cr(e) {
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
                    var Nr = Et(Ar);
                    function Ar(e, t) {
                        return e && e.length && t && t.length ? It(e, t) : e
                    }
                    var kr = Rn(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = Le(e, t);
                        return St(e, _l(t, function(e) {
                            return Xn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Or(e) {
                        return null == e ? e : Y.call(e)
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
                        return !(1 < n || this.__actions__.length) && o instanceof ye && Xn(r) ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
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
                      , Xr = mn(wr);
                    function Yr(e, t) {
                        return (Co(e) ? wl : Ge)(e, Bn(t, 3))
                    }
                    function Kr(e, t) {
                        return (Co(e) ? Cl : je)(e, Bn(t, 3))
                    }
                    var Zr = an(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : Re(e, n, [t])
                    });
                    var Qr = Et(function(e, t, n) {
                        var r = -1
                          , o = "function" == typeof t
                          , i = Po(e) ? C(e.length) : [];
                        return Ge(e, function(e) {
                            i[++r] = o ? Il(t, e, n) : ot(e, t, n)
                        }),
                        i
                    })
                      , eo = an(function(e, t, n) {
                        Re(e, n, t)
                    });
                    function to(e, t) {
                        return (Co(e) ? _l : pt)(e, Bn(t, 3))
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
                        return 1 < n && Yn(e, t[0], t[1]) ? t = [] : 2 < n && Yn(t[0], t[1], t[2]) && (t = [t[0]]),
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
                            throw new w(zi);
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
                            throw new w(zi);
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
                        return n = Xo(n) || 0,
                        Ro(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? V(Xo(e.maxWait) || 0, n) : a,
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
                    var co = Et(function(e, t) {
                        return Ue(e, 1, t)
                    })
                      , fo = Et(function(e, t, n) {
                        return Ue(e, Xo(t) || 0, n)
                    });
                    function po(r, o) {
                        if ("function" != typeof r || null != o && "function" != typeof o)
                            throw new w(zi);
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
                            throw new w(zi);
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
                        var i = (o = 1 == o.length && Co(o[0]) ? _l(o[0], Wl(Bn())) : _l(Ve(o, 1), Wl(Bn()))).length;
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
                    var Io = Cn(et)
                      , So = Cn(function(e, t) {
                        return t <= e
                    })
                      , wo = it(function() {
                        return arguments
                    }()) ? it : function(e) {
                        return Lo(e) && y.call(e, "callee") && !N.call(e, "callee")
                    }
                      , Co = C.isArray
                      , Eo = ml ? Wl(ml) : function(e) {
                        return Lo(e) && Qe(e) == pa
                    }
                    ;
                    function Po(e) {
                        return null != e && Oo(e.length) && !Ao(e)
                    }
                    function xo(e) {
                        return Lo(e) && Po(e)
                    }
                    var To = j || Gi
                      , _o = vl ? Wl(vl) : function(e) {
                        return Lo(e) && Qe(e) == ea
                    }
                    ;
                    function No(e) {
                        if (!Lo(e))
                            return !1;
                        var t = Qe(e);
                        return t == ta || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Fo(e)
                    }
                    function Ao(e) {
                        if (!Ro(e))
                            return !1;
                        e = Qe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function ko(e) {
                        return "number" == typeof e && e == Jo(e)
                    }
                    function Oo(e) {
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
                        return "string" == typeof e || !Co(e) && Lo(e) && Qe(e) == ca
                    }
                    function jo(e) {
                        return "symbol" == typeof e || Lo(e) && Qe(e) == da
                    }
                    var Ho = bl ? Wl(bl) : function(e) {
                        return Lo(e) && Oo(e.length) && !!sl[Qe(e)]
                    }
                    ;
                    var zo = Cn(ft)
                      , Wo = Cn(function(e, t) {
                        return e <= t
                    });
                    function Vo(e) {
                        if (!e)
                            return [];
                        if (Po(e))
                            return (Go(e) ? os : rn)(e);
                        if (O && e[O])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[O]());
                        var t = Vn(e);
                        return (t == oa ? Ql : t == ua ? ns : bi)(e)
                    }
                    function qo(e) {
                        return e ? (e = Xo(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function Jo(e) {
                        var t = qo(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function $o(e) {
                        return e ? De(Jo(e), 0, Xi) : 0
                    }
                    function Xo(e) {
                        if ("number" == typeof e)
                            return e;
                        if (jo(e))
                            return $i;
                        if (Ro(e) && (e = Ro(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = Xa.test(e);
                        return t || Ka.test(e) ? dl(e.slice(2), t ? 2 : 8) : $a.test(e) ? $i : +e
                    }
                    function Yo(e) {
                        return on(e, di(e))
                    }
                    function Ko(e) {
                        return null == e ? "" : Ft(e)
                    }
                    var Zo = ln(function(e, t) {
                        if (er(t) || Po(t))
                            on(t, ci(t), e);
                        else
                            for (var n in t)
                                y.call(t, n) && Ne(e, n, t[n])
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
                        for (o && Yn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === Hi || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Et(function(e) {
                        return e.push(Hi, An),
                        Il(pi, Hi, e)
                    });
                    function ii(e, t, n) {
                        t = null == e ? Hi : Ke(e, t);
                        return t === Hi ? n : t
                    }
                    function ai(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var li = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = h.call(t)),
                        e[t] = n
                    }, Oi(Li))
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
                        r && (n = Me(n, 7, kn));
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
                        return Ni(Ko(e).toLowerCase())
                    }
                    function wi(e) {
                        return (e = Ko(e)) && e.replace(Qa, Xl).replace(rl, "")
                    }
                    var Ci = dn(function(e, t, n) {
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
                        return e + (n ? " " : "") + Ni(t)
                    });
                    var _i = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Ni = cn("toUpperCase");
                    function Ai(e, t, n) {
                        return e = Ko(e),
                        (t = n ? Hi : t) === Hi ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var ki = Et(function(e, t) {
                        try {
                            return Il(e, Hi, t)
                        } catch (e) {
                            return No(e) ? e : new d(e)
                        }
                    })
                      , r = Rn(function(t, e) {
                        return wl(e, function(e) {
                            e = vr(e),
                            Re(t, e, lo(t[e], t))
                        }),
                        t
                    });
                    function Oi(e) {
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
                          , o = Ye(t, n);
                        null != e || Ro(t) && (o.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        o = Ye(t, ci(t)));
                        var i = !(Ro(e) && "chain"in e && !e.chain)
                          , a = Ao(r);
                        return wl(o, function(e) {
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
                                return n.apply(r, Nl([this.value()], arguments))
                            }
                            )
                        }),
                        r
                    }
                    function Fi() {}
                    E = bn(_l),
                    ce = bn(El),
                    D = bn(Ol);
                    function Ui(e) {
                        return Kn(e) ? Bl(vr(e)) : (t = e,
                        function(e) {
                            return Ke(e, t)
                        }
                        );
                        var t
                    }
                    K = wn(),
                    Q = wn(!0);
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
                    Nt = Pn("floor");
                    var ji, M = yn(function(e, t) {
                        return e * t
                    }, 1), $t = Pn("round"), j = yn(function(e, t) {
                        return e - t
                    }, 0);
                    return pe.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new w(zi);
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
                        return Co(e) ? e : [e]
                    }
                    ,
                    pe.chain = Wr,
                    pe.chunk = function(e, t, n) {
                        t = (n ? Yn(e, t, n) : t === Hi) ? 1 : V(Jo(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = C(U(r / t)); o < r; )
                            a[i++] = kt(e, o, o += t);
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
                        for (var t = C(e - 1), n = arguments[0], r = e; r--; )
                            t[r - 1] = arguments[r];
                        return Nl(Co(n) ? rn(n) : [n], Ve(t, 1))
                    }
                    ,
                    pe.cond = function(r) {
                        var o = null == r ? 0 : r.length
                          , t = Bn();
                        return r = o ? _l(r, function(e) {
                            if ("function" != typeof e[1])
                                throw new w(zi);
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
                    pe.constant = Oi,
                    pe.countBy = Jr,
                    pe.create = function(e, t) {
                        return e = me(e),
                        null == t ? e : Oe(e, t)
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
                        return r ? kt(e, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? kt(e, 0, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t) : []
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
                        return (Co(e) ? Pl : We)(e, Bn(t, 3))
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
                    pe.flatten = Cr,
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
                        return null == e ? [] : Ye(e, ci(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Ye(e, di(e))
                    }
                    ,
                    pe.groupBy = Zr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? kt(e, 0, -1) : []
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
                        return null == e ? [] : (Co(t) || (t = null == t ? [] : [t]),
                        Co(n = r ? Hi : n) || (n = null == n ? [] : [n]),
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
                            return null == t ? Hi : Ke(t, e)
                        }
                    }
                    ,
                    pe.pull = Nr,
                    pe.pullAll = Ar,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? It(e, t, Hi, n) : e
                    }
                    ,
                    pe.pullAt = kr,
                    pe.range = K,
                    pe.rangeRight = Q,
                    pe.rearg = yo,
                    pe.reject = function(e, t) {
                        return (Co(e) ? Pl : We)(e, mo(Bn(t, 3)))
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
                            throw new w(zi);
                        return Et(e, t = t === Hi ? t : Jo(t))
                    }
                    ,
                    pe.reverse = Or,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Yn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        (Co(e) ? xe : xt)(e, t)
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
                        return (Co(e) ? Te : At)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Yn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : Jo(t),
                        n === Hi ? r : Jo(n)),
                        kt(e, t, n)) : []
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
                        return n && "number" != typeof n && Yn(e, t, n) && (t = n = Hi),
                        (n = n === Hi ? Xi : n >>> 0) ? (e = Ko(e)) && ("string" == typeof t || null != t && !Uo(t)) && !(t = Ft(t)) && Zl(e) ? Xt(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new w(zi);
                        return r = null == r ? 0 : V(Jo(r), 0),
                        Et(function(e) {
                            var t = e[r]
                              , e = Xt(e, 0, r);
                            return t && Nl(e, t),
                            Il(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? kt(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? kt(e, 0, (t = n || t === Hi ? 1 : Jo(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? kt(e, (t = r - (t = n || t === Hi ? 1 : Jo(t))) < 0 ? 0 : t, r) : []
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
                            throw new w(zi);
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
                        return Co(e) ? _l(e, vr) : jo(e) ? [e] : rn(mr(Ko(e)))
                    }
                    ,
                    pe.toPlainObject = Yo,
                    pe.transform = function(e, r, o) {
                        var t, n = Co(e), i = n || To(e) || Ho(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : Ro(e) && Ao(t) ? me(T(e)) : {}),
                        (i ? wl : $e)(e, function(e, t, n) {
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
                    pe.words = Ai,
                    pe.wrap = function(e, t) {
                        return ho(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = Gr,
                    pe.xorWith = jr,
                    pe.zip = Hr,
                    pe.zipObject = function(e, t) {
                        return Wt(e || [], t || [], Ne)
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
                    pe.attempt = ki,
                    pe.camelCase = Ii,
                    pe.capitalize = Si,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === Hi && (n = t,
                        t = Hi),
                        n !== Hi && (n = (n = Xo(n)) == n ? n : 0),
                        t !== Hi && (t = (t = Xo(t)) == t ? t : 0),
                        De(Xo(e), t, n)
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
                    pe.deburr = wi,
                    pe.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    pe.divide = F,
                    pe.endsWith = function(e, t, n) {
                        e = Ko(e),
                        t = Ft(t);
                        var r = e.length
                          , r = n = n === Hi ? r : De(Jo(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = bo,
                    pe.escape = function(e) {
                        return (e = Ko(e)) && Aa.test(e) ? e.replace(_a, Yl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Ko(e)) && Ua.test(e) ? e.replace(Fa, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = Co(e) ? El : He;
                        return n && Yn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = $r,
                    pe.findIndex = Sr,
                    pe.findKey = function(e, t) {
                        return Rl(e, Bn(t, 3), $e)
                    }
                    ,
                    pe.findLast = Xr,
                    pe.findLastIndex = wr,
                    pe.findLastKey = function(e, t) {
                        return Rl(e, Bn(t, 3), Xe)
                    }
                    ,
                    pe.floor = Nt,
                    pe.forEach = Yr,
                    pe.forEachRight = Kr,
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
                        return e && Xe(e, Bn(t, 3))
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
                        (e = e = Xo(e)) >= q(t = t, n = n) && e < V(t, n)
                    }
                    ,
                    pe.invoke = ui,
                    pe.isArguments = wo,
                    pe.isArray = Co,
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
                        if (Po(e) && (Co(e) || "string" == typeof e || "function" == typeof e.splice || To(e) || Ho(e) || wo(e)))
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
                    pe.isError = No,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && H(e)
                    }
                    ,
                    pe.isFunction = Ao,
                    pe.isInteger = ko,
                    pe.isLength = Oo,
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
                        return ko(e) && -Ji <= e && e <= Ji
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
                    pe.kebabCase = Ci,
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
                        e = Ko(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return !t || t <= r ? e : In(B(r = (t - r) / 2), n) + e + In(U(r), n)
                    }
                    ,
                    pe.padEnd = function(e, t, n) {
                        e = Ko(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? e + In(t - r, n) : e
                    }
                    ,
                    pe.padStart = function(e, t, n) {
                        e = Ko(e);
                        var r = (t = Jo(t)) ? rs(e) : 0;
                        return t && r < t ? In(t - r, n) + e : e
                    }
                    ,
                    pe.parseInt = function(e, t, n) {
                        return t = n || null == t ? 0 : t && +t,
                        $(Ko(e).replace(Ba, ""), t || 0)
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
                            n = X();
                            return q(e + n * (t - e + cl("1e-" + ((n + "").length - 1))), t)
                        }
                        return wt(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = Co(e) ? Al : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Ge)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = Co(e) ? kl : Gl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, je)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Yn(e, t, n) : t === Hi) ? 1 : Jo(t),
                        Ct(Ko(e), t)
                    }
                    ,
                    pe.replace = function() {
                        var e = arguments
                          , t = Ko(e[0]);
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
                            e = Ao(i) ? i.call(e) : i
                        }
                        return e
                    }
                    ,
                    pe.round = $t,
                    pe.runInContext = e,
                    pe.sample = function(e) {
                        return (Co(e) ? Pe : Pt)(e)
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
                        var r = Co(e) ? Ol : Ot;
                        return n && Yn(e, t, n) && (t = Hi),
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
                        return e = Ko(e),
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
                        t && Yn(a, e, t) && (e = Hi),
                        a = Ko(a),
                        e = ei({}, e, n, Nn);
                        var l, s, r = ci(n = ei({}, e.imports, n.imports, Nn)), o = Vl(n, r), u = 0, n = e.interpolate || el, c = "__p += '", n = p((e.escape || el).source + "|" + n.source + "|" + (n === Ra ? qa : el).source + "|" + (e.evaluate || el).source + "|$", "g"), i = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ll + "]") + "\n";
                        if (a.replace(n, function(e, t, n, r, o, i) {
                            return n = n || r,
                            c += a.slice(u, i).replace(tl, Kl),
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
                        (e = ki(function() {
                            return f(r, i + "return " + c).apply(Hi, o)
                        })).source = c,
                        No(e))
                            throw e;
                        return e
                    }
                    ,
                    pe.times = function(e, t) {
                        if ((e = Jo(e)) < 1 || Ji < e)
                            return [];
                        var n = Xi
                          , r = q(e, Xi);
                        for (t = Bn(t),
                        e -= Xi,
                        r = Hl(r, t); ++n < e; )
                            t(n);
                        return r
                    }
                    ,
                    pe.toFinite = qo,
                    pe.toInteger = Jo,
                    pe.toLength = $o,
                    pe.toLower = function(e) {
                        return Ko(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = Xo,
                    pe.toSafeInteger = function(e) {
                        return e ? De(Jo(e), -Ji, Ji) : 0 === e ? e : 0
                    }
                    ,
                    pe.toString = Ko,
                    pe.toUpper = function(e) {
                        return Ko(e).toUpperCase()
                    }
                    ,
                    pe.trim = function(e, t, n) {
                        return (e = Ko(e)) && (n || t === Hi) ? zl(e) : e && (t = Ft(t)) ? (e = os(e),
                        t = os(t),
                        Xt(e, Jl(e, t), $l(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Ko(e)) && (n || t === Hi) ? e.slice(0, is(e) + 1) : e && (t = Ft(t)) ? Xt(e = os(e), 0, $l(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Ko(e)) && (n || t === Hi) ? e.replace(Ba, "") : e && (t = Ft(t)) ? Xt(e = os(e), Jl(e, os(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, o = "...";
                        Ro(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? Jo(t.length) : r,
                        o = "omission"in t ? Ft(t.omission) : o);
                        var i, t = (e = Ko(e)).length;
                        if (Zl(e) && (t = (i = os(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - rs(o)) < 1)
                            return o;
                        if (r = i ? Xt(i, 0, t).join("") : e.slice(0, t),
                        n === Hi)
                            return r + o;
                        if (i && (t += r.length - t),
                        Uo(n)) {
                            if (e.slice(t).search(n)) {
                                var a, l = r;
                                for (n.global || (n = p(n.source, Ko(Ja.exec(n)) + "g")),
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
                        return (e = Ko(e)) && Na.test(e) ? e.replace(Ta, as) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++s;
                        return Ko(e) + t
                    }
                    ,
                    pe.upperCase = _i,
                    pe.upperFirst = Ni,
                    pe.each = Yr,
                    pe.eachRight = Kr,
                    pe.first = Er,
                    Mi(pe, (ji = {},
                    $e(pe, function(e, t) {
                        y.call(pe.prototype, t) || (ji[t] = e)
                    }),
                    ji), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    wl(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    wl(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === Hi ? 1 : V(Jo(e), 0);
                            var t = this.__filtered__ && !r ? new ye(this) : this.clone();
                            return t.__filtered__ ? t.__takeCount__ = q(e, t.__takeCount__) : t.__views__.push({
                                size: q(e, Xi),
                                type: n + (t.__dir__ < 0 ? "Right" : "")
                            }),
                            t
                        }
                        ,
                        ye.prototype[n + "Right"] = function(e) {
                            return this.reverse()[n](e).reverse()
                        }
                    }),
                    wl(["filter", "map", "takeWhile"], function(e, t) {
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
                    wl(["head", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        ye.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    wl(["initial", "tail"], function(e, t) {
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
                        return this.take(Xi)
                    }
                    ,
                    $e(ye.prototype, function(u, e) {
                        var c = /^(?:filter|find|map|reject)|While$/.test(e)
                          , d = /^(?:head|last)$/.test(e)
                          , f = pe[d ? "take" + ("last" == e ? "Right" : "") : e]
                          , p = d || /^find/.test(e);
                        f && (pe.prototype[e] = function() {
                            function e(e) {
                                return e = f.apply(pe, Nl([e], n)),
                                d && a ? e[0] : e
                            }
                            var t = this.__wrapped__
                              , n = d ? [1] : arguments
                              , r = t instanceof ye
                              , o = n[0]
                              , i = r || Co(t);
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
                    wl(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                        var n = i[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , o = /^(?:pop|shift)$/.test(e);
                        pe.prototype[e] = function() {
                            var t = arguments;
                            if (!o || this.__chain__)
                                return this[r](function(e) {
                                    return n.apply(Co(e) ? e : [], t)
                                });
                            var e = this.value();
                            return n.apply(Co(e) ? e : [], t)
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
                          , n = Co(e)
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
                                args: [Or],
                                thisArg: Hi
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
                fl._ = ls,
                (R = function() {
                    return ls
                }
                .call(k, O, k, A)) === Hi || (A.exports = R)
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
    function Zs(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, Zs),
        t.loaded = !0,
        t.exports
    }
    Zs.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return Zs.d(t, {
            a: t
        }),
        t
    }
    ,
    Zs.d = function(e, t) {
        for (var n in t)
            Zs.o(t, n) && !Zs.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    Zs.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    Zs.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    Zs.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var w, C, $, L, D, M, X = React, Y = Zs.n(X), e = ReactDOM, k = CoreUtilities, E = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        }, p = ReactUtilities, P = CoreRobloxUtilities, x = Roblox, r = x.EnvironmentUrls.apiGatewayUrl, a = {
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
        }, o = x.EnvironmentUrls.apiGatewayUrl, s = {
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
        (Xa = w = w || {}).Game = "Game",
        Xa.CatalogAsset = "CatalogAsset",
        Xa.CatalogBundle = "CatalogBundle",
        (Qe = C = C || {}).Carousel = "Carousel",
        Qe.AvatarCarousel = "AvatarCarousel",
        Qe.SortlessGrid = "SortlessGrid",
        Qe.FriendCarousel = "FriendCarousel",
        Qe.InterestGrid = "InterestGrid",
        Qe.Pills = "Pills",
        Qe.Sdui = "sdui",
        (et = {}).Sponsored = "Sponsored",
        et.SponsoredGame = "SponsoredGame",
        (at = $ = $ || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        at.GridTile = "GridTile",
        at.EventTile = "EventTile",
        at.InterestTile = "InterestTile",
        at.ExperienceEventsTile = "ExperienceEventsTile",
        (ee = L = L || {}).Always = "Always",
        ee.Hover = "Hover",
        ee.Footer = "Footer",
        (re = D = D || {}).Disabled = "Disabled",
        re.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var i, l = "robloxAttributionIds";
        function u(e) {
            var t = window
              , n = t[l];
            return n || (n = {},
            t[l] = n),
            (t = n[e]) || (t = k.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function c() {
            return document.getElementById("place-list")
        }
        (i = i || {}).GameDetailReferral = "gameDetailReferral";
        var K, d = function(e) {
            return "discover#/sortName/" + e
        }, f = function(e) {
            return "discover#/sortName/v2/" + e
        }, m = function(e) {
            return "charts#/sortName/" + e
        };
        function v(e, t, n) {
            return void 0 === n && (n = {}),
            k.urlService.getUrlWithQueries(P.entityUrl.game.getRelativePath(e) + "/" + k.seoName.formatSeoName(t), n)
        }
        function O(e, t, n, r, o) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === o && (o = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case K.HomePage:
                    return f(r);
                case K.GamesPage:
                    return (n ? m : d)(r);
                default:
                    return f(r)
                }
            }(e, t, r),
            k.urlService.getUrlWithQueries(r, S(S({}, n), o))
        }
        function h() {
            return document.referrer
        }
        (Ka = K = K || {}).SearchPage = "searchPage",
        Ka.SortDetailPageDiscover = "sortDetailPageDiscover",
        Ka.SortDetailPageHome = "sortDetailPageHome",
        Ka.GameDetailPage = "gameDetailPage",
        Ka.GamesPage = "gamesPage",
        Ka.HomePage = "homePage",
        Ka.PeopleListInHomePage = "peopleListInHomePage",
        Ka.InterestCatcher = "interestCatcher",
        Ka.SearchLandingPage = "searchLandingPage";
        var R, g, F, y, b, I, S = function() {
            return (S = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, U = v, T = function() {
            return (T = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, _ = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        }, N = (Ul = P.eventStreamService.eventTypes).pageLoad, A = Ul.formInteraction;
        function B(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === x.Presence.PresenceTypes.InGame
            })
        }
        function G(e, t) {
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
        function W(e) {
            var t = e.tileBadgesByPosition
              , e = [];
            if (t)
                return !t.ImageTopLeft || (t = t.ImageTopLeft.map(function(e) {
                    return e.analyticsId
                })) && 0 < t.length && e.push("ImageTopLeft=" + t.join("+")),
                0 < e.length ? e.join("&") : void 0
        }
        function V(r, o, e, t) {
            return t === $.GridTile || t === $.EventTile || t === $.InterestTile ? ((t = {})[R.TileBadgeContexts] = e.map(function(e) {
                var t, n;
                return null !== (t = r[e],
                e = o.toString(),
                t.layoutDataBySort && e && t.layoutDataBySort[e] ? n = W(t.layoutDataBySort[e]) : t.defaultLayoutData && (n = W(t.defaultLayoutData)),
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
        function Z(t) {
            return ue(void 0, void 0, Promise, function() {
                return ce(this, function(e) {
                    return [2, k.httpService.get({
                        url: x.EnvironmentUrls.thumbnailsApi + "/v1/assets",
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
        ($n = R = R || {}).AbsPositions = "absPositions",
        $n.AdsPositions = "adsPositions",
        $n.AdFlags = "adFlags",
        $n.Algorithm = "algorithm",
        $n.AppliedFilters = "appliedFilters",
        $n.AttributionId = "attributionId",
        $n.ComponentType = "componentType",
        $n.Direction = "direction",
        $n.Distance = "distance",
        $n.HttpReferrer = "httpReferrer",
        $n.EmphasisFlag = "emphasisFlag",
        $n.FilterId = "filterId",
        $n.FilterIds = "filterIds",
        $n.GameSetTargetId = "gameSetTargetId",
        $n.GameSetTypeId = "gameSetTypeId",
        $n.InteractionType = "interactionType",
        $n.IsAd = "isAd",
        $n.NativeAdData = "nativeAdData",
        $n.AdIds = "adIds",
        $n.NumberOfLoadedTiles = "numberOfLoadedTiles",
        $n.Page = "page",
        $n.PageSession = "pageSession",
        $n.PlaceId = "placeId",
        $n.PlayContext = "playContext",
        $n.Position = "position",
        $n.PreviousOptionId = "previousOptionId",
        $n.PromptId = "promptId",
        $n.PromptText = "promptText",
        $n.ResourceId = "resourceId",
        $n.ResponseOptionIds = "responseOptionIds",
        $n.ResponseOptionTexts = "responseOptionTexts",
        $n.RootPlaceIds = "rootPlaceIds",
        $n.SelectedIds = "selectedIds",
        $n.SelectedTexts = "selectedTexts",
        $n.ScreenSizeX = "screenSizeX",
        $n.ScreenSizeY = "screenSizeY",
        $n.ScrollAreaSize = "scrollAreaSize",
        $n.ScrollDepth = "scrollDepth",
        $n.SelectedOptionId = "selectedOptionId",
        $n.SelectedOptionIds = "selectedOptionIds",
        $n.ShareLinkType = "shareLinkType",
        $n.ShareLinkId = "shareLinkId",
        $n.SortId = "sortId",
        $n.SortPos = "sortPos",
        $n.StartDepth = "startDepth",
        $n.StartPos = "startPos",
        $n.SuggestionKwd = "suggestionKwd",
        $n.SuggestionReplacedKwd = "suggestionReplacedKwd",
        $n.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        $n.SuggestionAlgorithm = "suggestionAlgorithm",
        $n.TimeToRespond = "timeToRespond",
        $n.Token = "token",
        $n.Topics = "topics",
        $n.TreatmentType = "treatmentType",
        $n.UniverseId = "universeId",
        $n.UniverseIds = "universeIds",
        $n.FriendId = "friendId",
        $n.ThumbnailAssetIds = "thumbnailAssetIds",
        $n.ThumbnailListIds = "thumbnailListIds",
        $n.LinkPath = "linkPath",
        $n.LocationName = "locationName",
        $n.RowsOnPage = "rowsOnPage",
        $n.PositionsInRow = "positionsInRow",
        $n.NavigationUids = "navigationUids",
        $n.TileBadgeContexts = "tileBadgeContexts",
        $n.ButtonName = "buttonName",
        $n.IsInterested = "isInterested",
        $n.InterestedUniverseIds = "interestedUniverseIds",
        (fr = g = g || {}).GameImpressions = "gameImpressions",
        fr.GameDetailReferral = "gameDetailReferral",
        fr.SortDetailReferral = "sortDetailReferral",
        fr.FeedScroll = "feedScroll",
        fr.NavigateToSortLink = "navigateToSortLink",
        fr.SurveyInteraction = "surveyInteraction",
        fr.SurveyImpression = "surveyImpression",
        fr.InterestCatcherClick = "interestCatcherClick",
        fr.FilterImpressions = "filterImpressions",
        fr.GamesFilterClick = "gamesFilterClick",
        fr.RequestRefundClick = "requestRefundClick",
        (pr = F = F || {}).HomePageSessionInfo = "homePageSessionInfo",
        pr.GameSearchSessionInfo = "gameSearchSessionInfo",
        pr.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        pr.SearchLandingPageSessionInfo = "searchLandingPageSessionInfo",
        (Cl = {}).Submission = "submission",
        Cl.Cancellation = "cancellation",
        (Xa = y = y || {}).Horizontal = "horizontal",
        Xa.Vertical = "vertical",
        (Qe = b = b || {}).Skip = "skip",
        Qe.Continue = "continue",
        Qe.Interested = "interested",
        (et = I = I || {}).OpenDropdown = "openDropdown",
        et.CloseDropdown = "closeDropdown",
        et.Apply = "apply";
        var Q = ((at = {})[g.GameImpressions] = function(e) {
            e = _(e, []);
            return [{
                name: g.GameImpressions,
                type: g.GameImpressions,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: g.GameDetailReferral,
                type: g.GameDetailReferral,
                context: N
            }, te(T(((t = {})[R.AttributionId] = u(i.GameDetailReferral),
            t[R.HttpReferrer] = h(),
            t), e))]
        }
        ,
        at[g.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SortDetailReferral,
                type: g.SortDetailReferral,
                context: N
            }, te(T({}, e))]
        }
        ,
        at[g.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.NavigateToSortLink,
                type: g.NavigateToSortLink,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyInteraction,
                type: g.SurveyInteraction,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.SurveyImpression,
                type: g.SurveyImpression,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.InterestCatcherClick,
                type: g.InterestCatcherClick,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.FilterImpressions,
                type: g.FilterImpressions,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: g.GamesFilterClick,
                type: g.GamesFilterClick,
                context: A
            }, te(T({}, e))]
        }
        ,
        at[g.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: g.RequestRefundClick,
                type: g.RequestRefundClick,
                context: A
            }, te(((t = {})[R.PlaceId] = e.placeId,
            t))]
        }
        ,
        at)
          , ee = (new x.Intl).getDateTimeFormatter()
          , te = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return "object" == typeof n[t] && n[t] && (e[t] = JSON.stringify(n[t])),
                "number" == typeof n[t] && (e[t] = n[t]),
                "string" == typeof n[t] && (e[t] = encodeURIComponent(n[t])),
                "boolean" == typeof n[t] && (e[t] = n[t] ? 1 : 0),
                e
            }, {})
        }
          , ne = k.urlService.parseQueryString
          , re = k.numberFormat.getNumberFormat
          , oe = G
          , ie = function(e, t) {
            t = G(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , ae = function(e) {
            return -1 === e ? "--" : k.abbreviateNumber.getAbbreviatedValue(e)
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
                        [4, k.httpService.get(a.getExperimentationValues(i, r, Object.keys(o)))];
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
                            supportedTreatmentTypes: [C.SortlessGrid],
                            authIntentData: a
                        }, i), J(l)),
                        [4, k.httpService.post(s.url.getOmniRecommendations, t)];
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
                        return [4, k.httpService.post(s.url.getOmniRecommendationsMetadata, {
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
                            url: x.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                            retryable: !0,
                            withCredentials: !0
                        },
                        n = {
                            userIds: r,
                            fields: ["names.combinedName", "names.username"]
                        },
                        [4, k.httpService.post(t, n)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ve = Zs(4452)
          , he = Zs.n(ve)
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
        (Ka = function(e) {
            var t = e.errorMessage
              , n = e.onRefresh
              , e = e.className;
            return Y().createElement("div", {
                "data-testid": "error-status",
                className: he()("game-error", e)
            }, Y().createElement("span", {
                className: "icon-spot-error-2xl"
            }), Y().createElement("p", {
                className: "text-label error-text"
            }, t), Y().createElement(ge.Button, {
                className: "refresh-button",
                variant: ye.control,
                onClick: n
            }, Y().createElement("span", {
                className: "icon-common-refresh"
            })))
        }
        ).defaultProps = {
            className: ""
        };
        var Ie, Se, we, Ce, Ee = Ka, Pe = function() {
            var e = (0,
            X.useState)(!1)
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
        }, xe = function(e, t) {
            return (0,
            X.useMemo)(function() {
                return e.layoutDataBySort && t && e.layoutDataBySort[t] ? e.layoutDataBySort[t] : e.defaultLayoutData
            }, [e.layoutDataBySort, e.defaultLayoutData, t])
        }, Te = HeaderScripts, _e = x.EnvironmentUrls.gamesApi, Ne = {
            url: {
                getOmniRecommendations: function(e, t) {
                    return {
                        url: _e + "/v1/games/omni-recommendations?model.pageType=" + e + (void 0 !== t ? "&model.sessionId=" + t : ""),
                        withCredentials: !0
                    }
                },
                getOmniRecommendationsMetadata: {
                    url: _e + "/v1/games/omni-recommendations-metadata",
                    withCredentials: !0
                },
                getGameList: {
                    url: _e + "/v1/games/list",
                    withCredentials: !0
                },
                getGamePasses: function(e, t) {
                    return {
                        url: _e + "/v1/games/" + e + "/game-passes?limit=" + t,
                        withCredentials: !0
                    }
                },
                getGameRecommendations: function(e) {
                    return {
                        url: _e + "/v1/games/recommendations/game/" + e,
                        withCredentials: !0
                    }
                },
                getGameSorts: {
                    url: _e + "/v1/games/sorts",
                    withCredentials: !0
                },
                getUniverseVoiceStatus: function(e) {
                    return {
                        withCredentials: !0,
                        url: x.EnvironmentUrls.voiceApi + "/v1/settings/universe/" + e
                    }
                },
                getVoiceOptInStatus: {
                    withCredentials: !0,
                    url: x.EnvironmentUrls.voiceApi + "/v1/settings/user-opt-in"
                },
                getAssetDataFromAssetId: function(e) {
                    return {
                        url: x.EnvironmentUrls.assetDeliveryApi + "/v2/assetId/" + e,
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
        }, ke = function(n, r) {
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
        }, Oe = Ne.defaultCacheCriteria, Re = P.dataStores.gamesDataStore, Le = P.dataStores.userDataStoreV2, De = (P.dataStores.localeDataStore,
        P.dataStores.userDataStore.FriendsUserSortType), Me = function() {
            return Le.getFriends({
                userId: null === Te.authenticatedUser || void 0 === Te.authenticatedUser ? void 0 : Te.authenticatedUser.id,
                userSort: De.StatusFrequents,
                isGuest: !1
            }, Oe)
        }, Fe = function(t) {
            return Ae(void 0, void 0, Promise, function() {
                return ke(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Re.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Ue = function(n) {
            return Ae(void 0, void 0, Promise, function() {
                var t;
                return ke(this, function(e) {
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
            return k.httpService.get(Ne.url.getAssetDataFromAssetId(e)).then(function(e) {
                return e.data
            })
        };
        function Ge(e) {
            return "icons/menu/gem_small" !== e ? null : "icon-gem-dark-stroke"
        }
        function je(e) {
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
                return e.tileBadgeType === Ce.Text && e.text ? (n.text = e.text,
                n.animationClass = je(e)) : e.tileBadgeType === Ce.Icon && e.icons && (t = e.icons.map(Ge).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = je(e)),
                n
            })),
            t.length ? ((e = {})[Ie.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function We(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === we.TextLabel ? e.footer : null
        }
        (Ul = Ie = Ie || {}).INVALID = "Invalid",
        Ul.IMAGE_TOP_LEFT = "ImageTopLeft",
        Ul.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        ($n = Se = Se || {}).Home = "Home",
        $n.Games = "Games",
        (fr = {}).Invalid = "Invalid",
        fr.HasLootBoxes = "HasLootBoxes",
        fr.HasInGameTrading = "HasInGameTrading",
        fr.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        fr.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        fr.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        fr.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (pr = {}).MorphToR6 = "MorphToR6",
        pr.PlayerChoice = "PlayerChoice",
        pr.MorphToR15 = "MorphToR15",
        (Cl = {}).Scroll = "Scroll",
        Cl.Button = "Button",
        (we = we || {}).TextLabel = "TextLabel",
        (Xa = Ce = Ce || {}).Text = "Text",
        Xa.Icon = "Icon";
        var Ve = RobloxThumbnails
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
          , Xe = .1
          , Ye = -1
          , Ke = 5
          , Ze = qe
          , Qe = Je
          , et = $e
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
            LabelsHome: "Label.sHome",
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
          , lt = "Label.ContextMenuTitle"
          , st = "Action.ViewDetails"
          , ut = "Action.JoinGame"
          , ct = {
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
        function dt(e) {
            var t = e.game
              , n = e.translate
              , r = t.universeId
              , o = t.name
              , e = t.referralUrl
              , t = t.isPlayable
              , r = Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameIcon,
                size: Ve.DefaultThumbnailSize,
                targetId: r,
                imgClassName: "game-card-thumb",
                format: Ve.ThumbnailFormat.jpeg
            });
            return Y().createElement("div", {
                className: "border-bottom player-interaction-container"
            }, Y().createElement("span", {
                className: "cursor-pointer game-icon"
            }, Y().createElement(ge.Link, {
                url: e,
                className: "game-card-link"
            }, r)), Y().createElement("span", {
                className: "game-info-container"
            }, Y().createElement(ge.Link, {
                url: e,
                className: "game-name"
            }, o), !t && Y().createElement(ge.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(st))))
        }
        dt.propTypes = {
            game: (re = Zs.n(at))().shape({
                universeId: re().number,
                placeId: re().number,
                name: re().string,
                playerCount: re().number,
                isShowSponsoredLabel: re().bool,
                nativeAdData: re().string,
                imageUrl: re().string,
                referralUrl: re().string,
                isPlayable: re().bool
            }).isRequired,
            translate: re().func.isRequired
        };
        var ft = dt;
        function pt(e) {
            var t = e.playerId
              , e = e.altName;
            return Y().createElement("div", {
                className: "avatar-card-link"
            }, Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.avatarHeadshot,
                size: Ve.ThumbnailAvatarHeadshotSize.size48,
                targetId: t,
                imgClassName: "avatar-card-image",
                format: Ve.ThumbnailFormat.webp,
                altName: e
            }))
        }
        pt.defaultProps = {
            altName: ""
        },
        pt.propTypes = {
            playerId: re().number.isRequired,
            altName: re().string
        };
        var mt = pt;
        function vt(e) {
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
            }, t), Y().createElement(ge.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , n = P.playGameService.buildPlayGameProperties(a, l, s, u)
                      , r = ct.joinGameInPlacesList
                      , o = ct.gamePlayIntentInPlacesList
                      , o = {
                        eventName: r.name,
                        ctx: r.ctx,
                        properties: t,
                        gamePlayIntentEventCtx: o.ctx
                    };
                    P.playGameService.launchGame(n, o),
                    i(e)
                },
                isDisabled: !n
            }, r(ut)))
        }
        vt.propTypes = {
            playerData: re().shape({
                presence: re().shape({
                    rootPlaceId: re().number,
                    placeId: re().number,
                    gameId: re().string
                }),
                id: re().number,
                nameForDisplay: re().string
            }).isRequired,
            dismissModal: re().func.isRequired,
            isPlayable: re().bool.isRequired,
            translate: re().func.isRequired
        };
        var ht = vt;
        function gt(e) {
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
                }, Y().createElement(mt, {
                    playerId: t,
                    altName: e
                })), Y().createElement(ht, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        gt.propTypes = {
            friendsData: re().arrayOf(re().shape({
                presense: re().shape({
                    rootPlaceId: re().number,
                    placeId: re().number,
                    gameId: re().string
                }),
                id: re().number,
                nameForDisplay: re().string
            })).isRequired,
            friendsInGame: re().arrayOf(re().number).isRequired,
            dismissModal: re().func.isRequired,
            isPlayable: re().bool.isRequired,
            translate: re().func.isRequired
        };
        var yt = gt;
        function bt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(lt);
            return Y().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, Y().createElement(ge.Modal.Header, {
                title: e,
                onClose: o
            }), Y().createElement(ft, {
                game: r,
                translate: i
            }), Y().createElement(yt, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
        }
        bt.propTypes = {
            friendsData: re().arrayOf(re().shape({
                presense: re().shape({
                    rootPlaceId: re().number,
                    placeId: re().number,
                    gameId: re().string
                }),
                id: re().number,
                nameForDisplay: re().string
            })).isRequired,
            friendsInGame: re().arrayOf(re().number).isRequired,
            game: re().shape({
                universeId: re().number,
                placeId: re().number,
                name: re().string,
                playerCount: re().number,
                isShowSponsoredLabel: re().bool,
                nativeAdData: re().string,
                imageUrl: re().string,
                referralUrl: re().string,
                isPlayable: re().bool
            }).isRequired,
            dismissModal: re().func.isRequired,
            translate: re().func.isRequired
        };
        var It = bt
          , ee = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (Ka = function(e) {
            var t = e.tooltipText
              , n = e.placement
              , e = e.sizeInPx
              , e = void 0 === e ? 16 : e;
            return Y().createElement("span", {
                className: "info-tooltip-container"
            }, Y().createElement(ge.Tooltip, {
                id: "games-info-tooltip",
                placement: n,
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
        var St = Ka
          , wt = function() {
            return (wt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ct = ((Ul = {})[$.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ul[$.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        Ul[$.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        Ul[$.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        Ul[$.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        Ul)
          , Et = wt(wt({}, Ct), (($n = {})[$.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        $n))
          , Pt = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function xt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return Y().createElement(X.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && Y().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + He(e)
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
        function Tt(e) {
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
        function _t(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = he()("game-card-image-pill", {
                "hover-only": e === L.Hover
            });
            return Y().createElement("div", {
                className: e,
                "data-testid": "game-tile-player-count-pill"
            }, Y().createElement(Tt, {
                playerCount: t
            }))
        }
        (fr = function(e) {
            var t = e.animationClass
              , n = e.isFocused
              , r = e.icons
              , o = e.text;
            return null != r && r.length || o ? Y().createElement("div", {
                className: "game-card-pill-with-animation"
            }, Y().createElement("div", {
                className: he()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
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
        var Nt = fr;
        function At(e) {
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
        _t.defaultProps = {
            playerCountStyle: void 0
        };
        var kt = {
            Voice: "pill-icon icon-default-voice-16x16-white",
            Camera: "pill-icon icon-default-camera-white"
        };
        function Ot(e) {
            var t = e.id
              , n = e.children
              , r = e.gameData
              , o = e.isOnScreen
              , i = e.page
              , a = e.buildEventProperties
              , l = e.isFocused
              , s = e.topicId
              , e = Ve.ThumbnailGameIconSize.size256
              , s = xe(r, s);
            return Y().createElement(ge.Link, {
                url: U(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, Y().createElement(Rt, {
                gameLayoutData: s,
                isFocused: !!l
            }), i === K.GamesPage ? Y().createElement("div", {
                className: "game-card-thumb-container"
            }, Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb",
                format: Ve.ThumbnailFormat.jpeg,
                altName: r.name
            })) : Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameIcon,
                size: e,
                targetId: r.universeId,
                containerClass: "game-card-thumb-container",
                format: Ve.ThumbnailFormat.jpeg,
                altName: r.name
            }), Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: r.name
            }, r.name), n)
        }
        (pr = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = ze(t);
            return e ? Y().createElement(xt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? Y().createElement(At, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== L.Always && n !== L.Hover ? null : Y().createElement(_t, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var Rt = pr
          , Lt = function() {
            return (Lt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Dt = $e.keyBoardEventCode
          , Mt = $e.numberOfInGameAvatarIcons
          , Ft = $e.numberOfInGameNames;
        function Ut(e) {
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
        function Bt(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = $e.RatingPercentageText
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
        function Gt(e) {
            return e = e.footerData,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, Y().createElement("span", {
                className: "info-label"
            }, e.text.textLiteral))
        }
        function jt(e) {
            var t = e.iconClassName
              , e = e.text;
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, Y().createElement("span", {
                className: he()("info-label", t)
            }), Y().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e))
        }
        function Ht(e) {
            return e = e.footerText,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, Y().createElement("span", {
                className: "info-label"
            }, e))
        }
        function zt(e) {
            return e = e.translate,
            Y().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, Y().createElement("div", {
                className: "native-ad-label"
            }, e(tt.LabelSponsoredAd), Y().createElement(St, {
                tooltipText: e(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            })))
        }
        function Wt(e) {
            return e = e.user,
            Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.avatarHeadshot,
                size: Ve.ThumbnailAvatarHeadshotSize.size48,
                targetId: e.id,
                containerClass: "avatar avatar-headshot avatar-headshot-xs",
                imgClassName: "avatar-card-image",
                format: Ve.ThumbnailFormat.webp,
                altName: e.displayName
            })
        }
        function Vt(e) {
            return e = e.translate,
            Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, Y().createElement(St, {
                tooltipText: e(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right",
                sizeInPx: 12
            }), Y().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(tt.LabelSponsoredAd)))
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
                }, Y().createElement(Wt, {
                    user: e
                }))
            }))
        }
        function Jt(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return Y().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, Y().createElement(qt, {
                friendsData: t,
                isOnline: e
            }), Y().createElement("span", {
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
            X.useState)(!1)
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
                    width: 22 * (t.slice(0, Mt).length - 1) + 32 + "px"
                }
            }, t.slice(0, Mt).map(function(e) {
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
                        e.code === Dt.enter && (e.stopPropagation(),
                        e.preventDefault(),
                        i(!0))
                    }
                }, Y().createElement(Wt, {
                    user: e
                }))
            })), r && Y().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Ft ? r(tt.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Ft
            }) : r(tt.LabelPlayingOneUser, {
                user: t[0].displayName
            })), Y().createElement(Xt, {
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
        Ot.defaultProps = {
            page: K.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        $t.defaultProps = {
            translate: void 0
        };
        var Xt = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , e = e.translate;
            return Y().createElement(ge.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, Y().createElement(It, {
                friendsData: r.map(function(e) {
                    return Lt(Lt({}, e), {
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
        }, ee)
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
          , Kt = function(n, r) {
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
        X.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.page
              , a = void 0 === i ? K.HomePage : i
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
            X.useState)()
              , v = l[0]
              , h = l[1]
              , u = Pe()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            X.useMemo)(function() {
                return B(c, o.universeId)
            }, [c, o.universeId])
              , y = xe(o, d);
            (0,
            X.useEffect)(function() {
                void 0 === v && 0 < g.length && Yt(void 0, void 0, void 0, function() {
                    var t;
                    return Kt(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Ue(o.placeId.toString())];
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
            }, Y().createElement(Ot, {
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
                    return Y().createElement(zt, {
                        translate: m
                    });
                var e = We(y);
                return e ? Y().createElement(Gt, {
                    footerData: e
                }) : 0 < g.length && v ? Y().createElement($t, {
                    friendData: g,
                    gameData: v
                }) : null != o && o.friendActivityTitle ? Y().createElement(Ht, {
                    footerText: o.friendActivityTitle
                }) : Y().createElement(Ut, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var Zt = Cl;
        (Xa = function(e) {
            var t = e.placeId
              , n = e.clientReferralUrl
              , r = e.buttonClassName
              , o = e.purchaseIconClassName
              , i = (0,
            X.useState)(void 0)
              , a = i[0]
              , l = i[1]
              , e = (0,
            X.useState)(void 0)
              , i = e[0]
              , s = e[1];
            if ((0,
            X.useEffect)(function() {
                Ue(t).then(function(e) {
                    return l(e)
                }).catch(function() {
                    s(!0)
                })
            }, [t]),
            void 0 === a && !i)
                return Y().createElement(en, null);
            r = he()(r, "btn-full-width");
            return Y().createElement(Y().Fragment, null, Y().createElement(ge.Link, {
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
        var Qt = Xa
          , en = function() {
            return Y().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function tn(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            X.useMemo)(function() {
                return H(t, n)
            }, [t, n])
              , e = (0,
            X.useMemo)(function() {
                return r === $.EventTile ? Ve.ThumbnailGameThumbnailSize.width576 : Ve.ThumbnailGameThumbnailSize.width384
            }, [r]);
            return null !== o ? Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.assetThumbnail,
                size: e,
                targetId: o,
                containerClass: "brief-game-icon",
                format: Ve.ThumbnailFormat.jpeg,
                altName: t.name
            }) : Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameThumbnail,
                size: e,
                targetId: t.placeId,
                containerClass: "brief-game-icon",
                format: Ve.ThumbnailFormat.jpeg,
                altName: t.name
            })
        }
        function nn(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , e = e.children;
            return n ? Y().createElement(ge.Link, {
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
              , e = x.PlayButton.usePlayabilityStatus
              , s = x.PlayButton.PlayabilityStatuses
              , u = x.PlayButton.PlayButton
              , c = x.PlayButton.PurchaseButton
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
                    buttonClassName: o ? he()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case s.PurchaseRequired:
                return l ? Y().createElement(Qt, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: he()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
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
        var rn = at;
        (Ka = Y().forwardRef(function(e, t) {
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
              , w = 0 === r
              , C = r === Ze.maxWideGameTilesPerCarouselPage - 1
              , E = Pe()
              , P = E[0]
              , x = E[1]
              , T = E[2]
              , i = (0,
            X.useState)(n.placeId)
              , _ = i[0]
              , N = i[1];
            (0,
            X.useEffect)(function() {
                u && !Number.isNaN(u) ? N(parseInt(u, 10)) : n.navigationUid && Fe(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && N(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function A() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== $.EventTile ? Y().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, Y().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            X.useMemo)(function() {
                return U(_, n.name, o(n, r))
            }, [n, o, r, _])
              , v = o(n, r)
              , k = (0,
            X.useMemo)(function() {
                return B(a, n.universeId)
            }, [a, n.universeId])
              , O = (0,
            X.useMemo)(function() {
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
              , R = xe(n, m)
              , g = function() {
                return (f !== $.GridTile || s === D.Enabled) && ((f !== $.EventTile || s === D.Enabled) && f !== $.InterestTile)
            }
              , b = (0,
            X.useMemo)(function() {
                return null != R && R.title ? R.title : n.name
            }, [n.name, null == R ? void 0 : R.title])
              , e = f !== $.InterestTile
              , E = f !== $.InterestTile
              , i = (0,
            X.useCallback)(function() {
                I && I()
            }, [I]);
            return Y().createElement("li", {
                className: he()("list-item", "hover-game-tile", {
                    "grid-tile": f === $.GridTile
                }, {
                    "event-tile": f === $.EventTile
                }, {
                    "interest-tile": f === $.InterestTile
                }, {
                    "first-tile": w
                }, {
                    "last-tile": C
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
            }, n.universeId && Y().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, Y().createElement(nn, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: h,
                linkUrl: c
            }, Y().createElement("div", {
                className: "featured-game-icon-container"
            }, Y().createElement(tn, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), Y().createElement(Rt, {
                gameLayoutData: R,
                playerCountStyle: l,
                playerCount: n.playerCount,
                isFocused: P
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
                if (P && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return Y().createElement(Vt, {
                        translate: S
                    });
                e = We(R);
                return e ? Y().createElement(Gt, {
                    footerData: e
                }) : 0 < (null == k ? void 0 : k.length) ? Y().createElement(Jt, {
                    friendsData: k,
                    isOnline: !0
                }) : 0 < (null == O ? void 0 : O.length) ? Y().createElement(Jt, {
                    friendsData: O,
                    isOnline: !1
                }) : n.friendVisitedString ? Y().createElement(jt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === L.Footer ? Y().createElement(Ut, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : Y().createElement(Bt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: S
                })
            }()), Y().createElement("div", {
                className: "hover-metadata"
            }, A()))), P && p === M.imageOverlay && g() && Y().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, Y().createElement(rn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })))), P && p !== M.imageOverlay && g() && Y().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, Y().createElement(rn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: v,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === $.InterestTile && Y().createElement(ge.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                title: S(ot.ActionInterestCatcherInterested),
                onClick: i
            }, y ? Y().createElement("span", {
                className: "icon-heart-red"
            }) : Y().createElement("span", {
                className: "icon-heart"
            }), Y().createElement("span", null, S(ot.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var on = Ka
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
        (Ul = (0,
        X.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = ln(e, ["componentType"]);
            switch (n) {
            case $.AppGameTileNoMetadata:
                return Y().createElement(Zt, an({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case $.GridTile:
            case $.EventTile:
            case $.InterestTile:
                return Y().createElement(on, an({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return Y().createElement(Zt, an({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var sn = Ul
          , un = (0,
        X.forwardRef)(function(e, t) {
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
            return Y().createElement("div", {
                "data-testid": "game-carousel",
                ref: t,
                className: p
            }, n.map(function(e, t) {
                return Y().createElement(sn, {
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
            X.useState)(e && "string" == typeof e ? e : k.uuidService.generateRandomUuid())[0];
            return Y().createElement(vn.Provider, {
                value: e
            }, t)
        }
        function dn() {
            return (0,
            X.useContext)(vn)
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
            X.useMemo)(function() {
                var e = t && parseInt(t, 10);
                if (e || 0 === e)
                    return e
            }, [t])
              , u = (e = (0,
            X.useState)(void 0 !== s ? s - Math.floor(Date.now() / 1e3) : void 0))[0]
              , c = e[1];
            (0,
            X.useEffect)(function() {
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
            X.useMemo)(function() {
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
            X.useMemo)(function() {
                if (o && i && d) {
                    var e = d.indexOf(hn)
                      , t = d.indexOf(gn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + hn.length, t)
                          , t = d.slice(t + gn.length);
                        return Y().createElement(ge.Link, {
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
        un.displayName = "GameCarousel";
        var pn = function(t, e, n) {
            var r = (0,
            X.useState)(new Set)
              , o = r[0]
              , i = r[1]
              , r = (0,
            X.useState)(new Set)
              , a = r[0]
              , l = r[1]
              , s = (0,
            X.useRef)(null)
              , u = (0,
            X.useRef)(n);
            (0,
            X.useEffect)(function() {
                u.current = n
            }, [n]);
            var c = (0,
            X.useCallback)(function() {
                le(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), $e.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = u.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = Q.gameImpressions(t),
                    P.eventStreamService.sendEvent.apply(P.eventStreamService, t),
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
            X.useEffect)(function() {
                var e, i = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return s.current = P.elementVisibilityService.observeChildrenVisibility({
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
        X.createContext)("")
          , hn = qe.linkStartDelimiter
          , gn = qe.linkEndDelimiter
          , yn = WebBlox
          , bn = Zs(4777)
          , In = Zs(8550)
          , Sn = "undefined" != typeof Map ? Map : (Object.defineProperty(Cn.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Cn.prototype.get = function(e) {
            e = wn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Cn.prototype.set = function(e, t) {
            var n = wn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Cn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = wn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Cn.prototype.has = function(e) {
            return !!~wn(this.__entries__, e)
        }
        ,
        Cn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Cn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        Cn);
        function wn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function Cn() {
            this.__entries__ = []
        }
        var En = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , Pn = void 0 !== Zs.g && Zs.g.Math === Math ? Zs.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , xn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Pn) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , Tn = 2
          , _n = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , Nn = "undefined" != typeof MutationObserver
          , An = (kn.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        kn.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        kn.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        kn.prototype.updateObservers_ = function() {
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
        kn.prototype.connect_ = function() {
            En && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            Nn ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
        kn.prototype.disconnect_ = function() {
            En && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        kn.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            _n.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        kn.getInstance = function() {
            return this.instance_ || (this.instance_ = new kn),
            this.instance_
        }
        ,
        kn.instance_ = null,
        kn);
        function kn() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                xn(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < Tn)
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
        var On = function(e, t) {
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
          , Rn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Pn
        }
          , Ln = Gn(0, 0, 0, 0);
        function Dn(e) {
            return parseFloat(e) || 0
        }
        function Mn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + Dn(n["border-" + t + "-width"])
            }, 0)
        }
        function Fn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return Ln;
            var r = Rn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = Dn(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = Dn(r.width)
              , s = Dn(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Mn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Mn(r, "top", "bottom") + a)),
            (e = e) !== Rn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            Gn(o.left, o.top, l, s)
        }
        var Un = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Rn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Rn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function Bn(e) {
            return En ? Un(e) ? Gn(0, 0, (t = (t = e).getBBox()).width, t.height) : Fn(e) : Ln;
            var t
        }
        function Gn(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var jn = (Hn.prototype.isActive = function() {
            var e = Bn(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        Hn.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        Hn);
        function Hn(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = Gn(0, 0, 0, 0),
            this.target = e
        }
        var zn = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            On(i, {
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
            On(this, {
                target: e,
                contentRect: i
            })
        }
          , Wn = (Vn.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Rn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new jn(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        Vn.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Rn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e),
                t.size || this.controller_.removeObserver(this))
            }
        }
        ,
        Vn.prototype.disconnect = function() {
            this.clearActive(),
            this.observations_.clear(),
            this.controller_.removeObserver(this)
        }
        ,
        Vn.prototype.gatherActive = function() {
            var t = this;
            this.clearActive(),
            this.observations_.forEach(function(e) {
                e.isActive() && t.activeObservations_.push(e)
            })
        }
        ,
        Vn.prototype.broadcastActive = function() {
            var e, t;
            this.hasActive() && (e = this.callbackCtx_,
            t = this.activeObservations_.map(function(e) {
                return new zn(e.target,e.broadcastRect())
            }),
            this.callback_.call(e, t, e),
            this.clearActive())
        }
        ,
        Vn.prototype.clearActive = function() {
            this.activeObservations_.splice(0)
        }
        ,
        Vn.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length
        }
        ,
        Vn);
        function Vn(e, t, n) {
            if (this.activeObservations_ = [],
            this.observations_ = new Sn,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var qn = new ("undefined" != typeof WeakMap ? WeakMap : Sn)
          , Jn = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = An.getInstance()
              , n = new Wn(t,n,this);
            qn.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            Jn.prototype[t] = function() {
                var e;
                return (e = qn.get(this))[t].apply(e, arguments)
            }
        });
        var $n = void 0 !== Pn.ResizeObserver ? Pn.ResizeObserver : Jn
          , Xn = Zs(8601);
        function Yn(e, t) {
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
                    return Kn(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Kn(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Kn(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Zn(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function Qn(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Zn(Object(n), !0).forEach(function(e) {
                    er(t, e, n[e])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Zn(Object(n)).forEach(function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                })
            }
            return t
        }
        function er(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function tr(e) {
            var t = e.gradient
              , n = e.gradientHeightPercent
              , r = e.gradientWidthPercent
              , o = t.startColor
              , i = t.endColor
              , a = t.startOpacity
              , e = t.endOpacity
              , l = (t.degree + 90) % 360
              , s = 1 - a
              , u = 1 - e
              , a = "".concat(100 * n, "%")
              , e = "".concat(100 * r, "%")
              , n = (0,
            X.useMemo)(function() {
                return "linear-gradient(".concat(l, "deg, ").concat(o).concat(Math.round(255 * s).toString(16).padStart(2, "0"), ", ").concat(i).concat(Math.round(255 * u).toString(16).padStart(2, "0"), ")")
            }, [o, i, s, u, l])
              , r = (0,
            yn.makeStyles)()(function() {
                return {
                    heroUnitGradient: {
                        bottom: "0px",
                        left: "0px",
                        position: "absolute"
                    }
                }
            })().classes.heroUnitGradient;
            return X.createElement("div", {
                style: {
                    background: n,
                    width: e,
                    height: a
                },
                className: r
            })
        }
        function nr(e) {
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
            yn.makeStyles)()(function() {
                return {
                    heroUnitContentContainer: Qn(Qn({
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
                    heroUnitTitle: Qn(Qn(Qn(Qn({
                        color: "white",
                        position: "relative",
                        textShadow: "".concat(cr),
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
                    heroUnitSubtitle: Qn({
                        color: "white",
                        textShadow: "".concat(cr),
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
            return X.createElement("div", {
                className: f,
                ref: r
            }, X.createElement(tr, {
                gradient: o,
                gradientHeightPercent: i,
                gradientWidthPercent: a
            }), s, X.createElement("div", {
                className: e
            }, X.createElement("span", {
                className: p
            }, t), X.createElement("span", {
                className: m
            }, n)), l)
        }
        function rr(e) {
            var t = e.backgroundImageComponent
              , n = void 0 !== (r = e.forceViewportWidth) && r <= 600
              , r = (e = (0,
            yn.makeStyles)()(function() {
                return {
                    heroUnitBackgroundWindow: Qn(Qn({
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
                    heroUnitBackgroundContainer: Qn(Qn({
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
            return X.createElement("div", {
                className: r
            }, X.createElement("div", {
                className: e
            }, t))
        }
        function or(e) {
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
            return r ? X.createElement("a", {
                href: r,
                onClick: function(e) {
                    e.stopPropagation(),
                    n && n()
                },
                onKeyDown: function(e) {
                    e.code === dr && (e.stopPropagation(),
                    n && n())
                },
                className: ve(t, e),
                "aria-label": o,
                tabIndex: i,
                onFocus: a,
                onMouseOver: a,
                onBlur: l,
                onMouseLeave: l,
                "data-testid": s
            }, u) : n ? X.createElement("button", {
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
                className: ve(t, c),
                "aria-label": o,
                tabIndex: i,
                onFocus: a,
                onMouseOver: a,
                onBlur: l,
                onMouseLeave: l,
                "data-testid": s
            }, u) : X.createElement("div", {
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
        function ir(e) {
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
              , v = X.useRef(!1)
              , h = (e = Yn(X.useState(1), 2))[0]
              , g = e[1]
              , y = void 0 !== m && m <= 600
              , b = X.useRef(null)
              , I = X.useRef(null)
              , S = "".concat(Math.round(100 * f), "%")
              , w = "".concat(Math.round(100 * p), "%")
              , C = 360 * (p - f)
              , p = (e = (0,
            yn.makeStyles)()(function() {
                return {
                    heroUnitContainer: Qn({
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
                    heroUnitForegroundContainer: Qn(Qn({
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
                    }, y ? {
                        height: S,
                        "--parallax-scale": "".concat(32)
                    } : {}), {}, {
                        "@media (max-width: 600px)": {
                            height: S,
                            "--parallax-scale": "".concat(32)
                        },
                        "@media (min-width: 601px) and (max-width: 1140px)": {
                            height: "calc(".concat(S, " + ((").concat(C, " * (100vw - 600px)) / 540))")
                        }
                    }),
                    heroUnitTopSpacer: Qn(Qn({
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
            X.useCallback)(function() {
                var e = bn(.2, 0, .8, 1);
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
            X.useEffect)(function() {
                var e = In(E, 100)
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
            X.createElement("div", {
                ref: I
            }, X.createElement(or, {
                containerClassName: p,
                callback: s,
                linkPath: u,
                ariaLabel: t,
                dataTestId: "hero-unit"
            }, X.createElement("div", {
                className: e
            }), X.createElement(rr, {
                backgroundImageComponent: o,
                forceViewportWidth: m
            }), X.createElement("div", {
                className: f
            }, r), X.createElement(nr, {
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
        function ar(e) {
            var t = e.title
              , n = e.subtitle
              , r = e.leftAssetComponent
              , o = e.rightButtonComponent
              , i = (u = (0,
            yn.makeStyles)()(function() {
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
                        textShadow: "".concat(cr)
                    },
                    assetSubtitle: {
                        marginTop: "auto",
                        color: "white",
                        fontFamily: "Builder Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "19.6px",
                        textShadow: "".concat(cr)
                    }
                }
            })().classes).attributionRowContainer
              , a = u.attributionRowThumbnailContainer
              , l = u.attributionRowTextContainer
              , s = u.attributionRowButtonContainer
              , e = u.assetTitle
              , u = u.assetSubtitle;
            return X.createElement("div", {
                className: i
            }, X.createElement("div", {
                className: a
            }, r), X.createElement("div", {
                className: l
            }, X.createElement("span", {
                className: e
            }, t), X.createElement("span", {
                className: u
            }, n)), X.createElement("div", {
                className: s
            }, o))
        }
        function lr(e) {
            var t = e.pillText
              , e = (n = (0,
            yn.makeStyles)()(function() {
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
            return X.createElement("div", {
                className: e
            }, X.createElement("span", {
                className: n
            }, t))
        }
        function sr(e) {
            var t = e.scrollArrowClassName
              , n = e.scrollIconClassName
              , r = e.handleClick;
            return X.createElement("div", {
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
            }, X.createElement("span", {
                className: n,
                "data-testid": "carousel-scroll-arrow-icon"
            }))
        }
        function ur(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , o = e.onScrollForward
              , i = e.scrollBackArrowClassName
              , e = e.scrollForwardArrowClassName;
            return X.createElement(X.Fragment, null, !t && X.createElement(sr, {
                scrollArrowClassName: i,
                scrollIconClassName: "icon-chevron-heavy-left",
                handleClick: r
            }), !n && X.createElement(sr, {
                scrollArrowClassName: e,
                scrollIconClassName: "icon-chevron-heavy-right",
                handleClick: o
            }))
        }
        var cr = "2px 2px 4px rgba(0, 0, 0, 0.15)"
          , dr = "Enter"
          , fr = "{linkStart}"
          , pr = "{linkEnd}"
          , mr = "0.3s"
          , vr = "cubic-bezier(0.45, 0, 0, 1)"
          , hr = {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "start"
        }
          , gr = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordWrap: "break-word"
        }
          , yr = (0,
        yn.makeStyles)()(function() {
            return {
                linkContainerOverride: {
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "none"
                    },
                    cursor: "pointer"
                },
                buttonContainerOverride: Qn({}, hr)
            }
        })
          , br = null !== (Cl = window.ResizeObserver) && void 0 !== Cl ? Cl : $n;
        function Ir(e) {
            var n, t, r, o, i, a, l, s, u, c, d = e.items, f = e.renderItem, p = e.collectionItemSize, m = e.layoutOverrides, v = e.headerComponent, h = e.gapBetweenHeaderAndItems, g = e.isHorizontalScrollEnabled, y = e.scrollArrowBackgroundColor, b = e.scrollArrowBoxShadowColor, I = e.thresholdFromEnd, S = e.onReachedThresholdFromEnd, w = (C = Yn((0,
            X.useState)(void 0), 2),
            N = C[0],
            n = C[1],
            t = (0,
            X.useCallback)(function(e) {
                var t = null == e || null === (t = e.getBoundingClientRect()) || void 0 === t ? void 0 : t.width;
                void 0 !== t && n(t)
            }, []),
            C = (0,
            X.useCallback)(function(e) {
                e && e[0] && e[0].target && t(e[0].target)
            }, [t]),
            r = (0,
            X.useRef)(new br(C)),
            C = (0,
            X.useCallback)(function(e) {
                e && null != r && r.current && (t(e),
                r.current.disconnect(),
                r.current.observe(e))
            }, [t]),
            (0,
            X.useEffect)(function() {
                var e = r.current;
                return function() {
                    e && e.disconnect()
                }
            }, []),
            [C, N]), C = (e = Yn(w, 2))[0], E = e[1], P = (m = (o = E,
            i = null != m ? m : {},
            a = (w = Cr[N = p]).minItemWidth,
            l = w.minItemCount,
            s = w.maxItemCount,
            e = w.fractionalItemAmount,
            u = (0,
            X.useMemo)(function() {
                return null != i && i.columnGap ? i.columnGap : o ? o < 1024 ? 12 : o < 1280 ? 18 : 24 : 18
            }, [null == i ? void 0 : i.columnGap, o]),
            c = null !== (N = null == i ? void 0 : i.sideMargin) && void 0 !== N ? N : 0,
            w = (0,
            X.useMemo)(function() {
                if (o) {
                    var e = o - 2 * c
                      , e = Math.floor((e + u) / (a + u));
                    return Math.min(Math.max(l, e), s)
                }
                return l
            }, [o, l, s, a, u, c]),
            {
                numColumns: null !== (N = null == i ? void 0 : i.numColumns) && void 0 !== N ? N : w,
                fractionalItemAmount: null !== (w = null == i ? void 0 : i.fractionalItemAmount) && void 0 !== w ? w : e,
                columnGap: u,
                sideMargin: c
            })).numColumns, x = m.fractionalItemAmount, T = m.columnGap, p = m.sideMargin, _ = g && d.length > P, N = (0,
            X.useMemo)(function() {
                if (E && 0 < P) {
                    var e = _ ? P + x : P;
                    return (E - (null != T ? T : 0) * (Math.ceil(e) - 1)) / e
                }
                return 0
            }, [E, _, P, x, T]), e = (w = function(n, r, o, i, a, l, s, u) {
                var t = (0,
                X.useRef)(0)
                  , c = (0,
                X.useRef)(null)
                  , e = Yn((0,
                X.useState)(!1), 2)
                  , d = e[0]
                  , f = e[1]
                  , p = Yn((0,
                X.useState)(!1), 2)
                  , m = p[0]
                  , v = p[1]
                  , h = Yn((0,
                X.useState)(!1), 2)
                  , g = h[0]
                  , y = h[1]
                  , b = (0,
                X.useRef)(!1)
                  , I = (0,
                X.useCallback)(function(e) {
                    return t.current = e < 0 ? 0 : l - i < e ? l - i : e,
                    t.current
                }, [l, i])
                  , S = (0,
                X.useCallback)(function(e) {
                    var t;
                    n && u && c.current && o && (t = Math.max(null != s ? s : 0, 3 * o),
                    e + o >= c.current.scrollWidth - t ? b.current || (u(),
                    b.current = !0) : b.current = !1)
                }, [u, c, o, s, n])
                  , w = (0,
                X.useCallback)(function(e) {
                    var t;
                    c.current && (t = e * (r + (null != a ? a : 0)),
                    c.current.scrollLeft = t,
                    S(t),
                    f(e <= 0),
                    v(l - i <= e))
                }, [r, a, S, l, i]);
                (0,
                X.useEffect)(function() {
                    n && w(t.current)
                }, [w, n]);
                var C = (0,
                X.useCallback)(function() {
                    var e = I(t.current + i);
                    w(e)
                }, [I, w, i])
                  , E = (0,
                X.useCallback)(function() {
                    var e = I(t.current - i);
                    w(e)
                }, [I, w, i])
                  , P = (0,
                X.useCallback)(function(e) {
                    g || (y(!0),
                    e(),
                    setTimeout(function() {
                        y(!1)
                    }, 500))
                }, [g])
                  , e = (0,
                X.useCallback)(function() {
                    P(E)
                }, [E, P])
                  , p = (0,
                X.useCallback)(function() {
                    P(C)
                }, [C, P])
                  , h = (0,
                X.useCallback)(function(e) {
                    return e >= t.current && e < t.current + i
                }, [t, i]);
                return {
                    carouselScrollRef: c,
                    isScrollBackDisabled: d || g,
                    isScrollForwardDisabled: m || g,
                    handleScrollBackClick: e,
                    handleScrollForwardClick: p,
                    getIsTileVisible: h
                }
            }(_, N, E, P, T, d.length, I, S)).carouselScrollRef, m = w.isScrollBackDisabled, g = w.isScrollForwardDisabled, I = w.handleScrollBackClick, S = w.handleScrollForwardClick, A = w.getIsTileVisible, h = (p = Er({
                itemWidth: N,
                columnGap: T,
                sideMargin: p,
                gapBetweenHeaderAndItems: h,
                scrollArrowBackgroundColor: y,
                scrollArrowBoxShadowColor: b,
                scrollArrowBaseClassName: w = "scroll-arrow",
                scrollArrowPrevClassName: "prev",
                scrollArrowNextClassName: "next"
            }).classes).collectionCarouselContainer, y = p.carouselContainer, b = p.carousel, k = p.carouselItem;
            return X.createElement("div", {
                className: h
            }, v, X.createElement("div", {
                ref: C,
                className: y
            }, X.createElement("div", {
                ref: e,
                className: b
            }, d.map(function(e, t) {
                return X.createElement("div", {
                    key: t,
                    id: "collection-carousel-item",
                    className: k
                }, f(e, A(t)))
            })), _ && X.createElement(ur, {
                isScrollBackDisabled: m,
                isScrollForwardDisabled: g,
                onScrollBack: I,
                onScrollForward: S,
                scrollBackArrowClassName: ve(w, "prev"),
                scrollForwardArrowClassName: ve(w, "next")
            })))
        }
        function Sr(e) {
            var t = e.iconClassName
              , n = e.color
              , r = e.width
              , e = e.iconOverrideStyles
              , e = (r = Pr({
                color: n,
                width: r,
                iconOverrideStyles: e || {}
            }).classes).iconBaseStyles
              , r = r.iconOverride;
            return X.createElement("span", {
                className: ve(e, r, t),
                "data-testid": "icon-component"
            })
        }
        (Xa = Ii = Ii || {}).XSmall = "XSmall",
        Xa.Small = "Small",
        Xa.Medium = "Medium",
        Xa.Large = "Large",
        Xa.XLarge = "XLarge";
        var wr, Cr = (er(at = {}, Ii.XSmall, {
            minItemWidth: 80,
            minItemCount: 3,
            maxItemCount: 20,
            fractionalItemAmount: .15
        }),
        er(at, Ii.Small, {
            minItemWidth: 150,
            minItemCount: 3,
            maxItemCount: 12,
            fractionalItemAmount: .15
        }),
        er(at, Ii.Medium, {
            minItemWidth: 233,
            minItemCount: 2,
            maxItemCount: 6,
            fractionalItemAmount: .15
        }),
        er(at, Ii.Large, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 4,
            fractionalItemAmount: .3
        }),
        er(at, Ii.XLarge, {
            minItemWidth: 300,
            minItemCount: 1,
            maxItemCount: 1,
            fractionalItemAmount: .1
        }),
        at), Er = (0,
        yn.makeStyles)()(function(e, t) {
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
                carouselContainer: (er(o = {
                    position: "relative"
                }, "& .".concat(s), Qn(Qn(Qn({
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
                }), {}, (er(l = {}, "&.".concat(u), {
                    left: "-10px"
                }),
                er(l, "&.".concat(t), {
                    right: "-10px"
                }),
                er(l, "opacity", .9),
                er(l, "&:hover", {
                    opacity: 1
                }),
                l))),
                er(o, "&:hover", er({}, "& .".concat(s), {
                    display: "flex"
                })),
                o),
                carousel: {
                    display: "flex",
                    overflowX: "hidden",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    gap: "".concat(null != r ? r : 0, "px")
                },
                carouselItem: {
                    width: n,
                    height: "auto",
                    flexShrink: 0
                }
            }
        }), Pr = (0,
        yn.makeStyles)()(function(e, t) {
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
                iconOverride: Qn({}, t)
            }
        });
        function xr(e) {
            var t = {};
            return void 0 === e || (void 0 !== e.layoutOrder && (t.order = e.layoutOrder),
            void 0 !== e.anchorPoint && (t.transformOrigin = "".concat(100 * e.anchorPoint.x, "% ").concat(100 * e.anchorPoint.y, "%")),
            void 0 !== e.automaticSize && (e.automaticSize === wr.XY ? (t.width = "auto",
            t.height = "auto") : e.automaticSize === wr.X ? t.width = "auto" : e.automaticSize === wr.Y && (t.height = "auto")),
            void 0 !== e.size && (t.width = "".concat(100 * e.size.xScale, "%"),
            t.height = "".concat(100 * e.size.yScale, "%")),
            void 0 !== e.position && (t.position = "absolute",
            t.left = "".concat(e.position.xOffset, "px"),
            t.top = "".concat(e.position.yOffset, "px")),
            void 0 !== e.zIndex && (t.zIndex = e.zIndex)),
            t
        }
        function Tr(e) {
            return er({}, "".concat(e.key), e.value)
        }
        function _r(e, t, n) {
            return er({}, "&[".concat(e.key, "='").concat(e.value, "']"), {
                color: t,
                font: n.Font,
                letterSpacing: n.LetterSpacing,
                fontFamily: n.FontFamily,
                fontWeight: n.FontWeight,
                fontSize: n.FontSize,
                lineHeight: n.LineHeight
            })
        }
        function Nr(e) {
            var r, t = e.onActivated, n = e.linkPath, o = e.text, i = e.textColor, a = e.fontStyle, l = void 0 === (d = e.gap) ? 0 : d, s = e.iconClassName, u = e.iconWidth, c = e.iconColor, d = void 0 !== (v = e.iconFirst) && v, f = e.containerOverrides, p = e.textOverrides, m = e.iconOverrides, v = (0,
            X.useMemo)(function() {
                return f ? xr(f) : {}
            }, [f]), e = (0,
            X.useMemo)(function() {
                return p ? xr(p) : {}
            }, [p]), h = (0,
            X.useMemo)(function() {
                return m ? xr(m) : {}
            }, [m]), e = (v = Dr({
                gap: l,
                textColor: i,
                fontStyle: a,
                containerOverrideStyles: v,
                textOverrideStyles: e
            }).classes).textIconRow, g = v.textIconRowText, y = v.textOverride, b = v.iconBaseStyles, I = (v = (r = o,
            (0,
            X.useMemo)(function() {
                var e = r.indexOf(Or)
                  , t = r.indexOf(Rr);
                if (-1 !== e && -1 !== t && e < t) {
                    var n = r.slice(0, e)
                      , e = r.slice(e + Or.length, t)
                      , t = r.slice(t + Rr.length);
                    return {
                        parsedTextContent: X.createElement(X.Fragment, null, n, X.createElement("b", null, X.createElement("u", null, e)), t),
                        cleansedTextLabel: "".concat(n).concat(e).concat(t)
                    }
                }
                return {
                    parsedTextContent: r,
                    cleansedTextLabel: r
                }
            }, [r]))).parsedTextContent, o = v.cleansedTextLabel, v = (0,
            X.useMemo)(function() {
                return X.createElement("span", Qn({
                    className: ve(g, y),
                    "data-testid": "text-icon-row-text"
                }, Tr(Lr)), I)
            }, [I, g, y]), a = a.LineHeight * a.FontSize, S = null != c ? c : i, w = null != u ? u : a, a = (0,
            X.useMemo)(function() {
                return s ? X.createElement(Sr, {
                    iconClassName: ve(b, s),
                    color: S,
                    width: w,
                    iconOverrideStyles: h
                }) : null
            }, [S, w, b, s, h]), a = d ? X.createElement(X.Fragment, null, a, v) : X.createElement(X.Fragment, null, v, a);
            return X.createElement(or, {
                containerClassName: e,
                callback: t,
                linkPath: n,
                ariaLabel: o,
                dataTestId: "text-icon-row"
            }, a)
        }
        function Ar(e) {
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
              , o = (i = Mr({
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
            X.useMemo)(function() {
                return u || (s ? X.createElement(Sr, {
                    iconClassName: s,
                    color: m,
                    width: v
                }) : null)
            }, [s, u, m, v])
              , S = (0,
            X.useMemo)(function() {
                return f || (d ? X.createElement(Sr, {
                    iconClassName: d,
                    color: m,
                    width: v
                }) : null)
            }, [d, f, m, v])
              , i = (0,
            X.useMemo)(function() {
                return X.createElement(X.Fragment, null, X.createElement("div", {
                    className: h
                }, X.createElement("div", {
                    className: b
                }, I), X.createElement("div", Qn({
                    className: y
                }, Tr(Lr)), c)), X.createElement("div", {
                    className: g
                }, X.createElement("div", {
                    className: b
                }, S), p && X.createElement("div", Qn({
                    className: y
                }, Tr(Lr)), p)))
            }, [h, g, y, I, S, c, p, b]);
            return X.createElement(or, {
                containerClassName: o,
                callback: t,
                linkPath: n,
                ariaLabel: c
            }, i)
        }
        function kr(e) {
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
              , r = (o = Fr({
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
            X.useMemo)(function() {
                return i || (t ? X.createElement("div", {
                    className: c,
                    "data-testid": "tile-title-container"
                }, X.createElement("div", Qn({
                    className: d
                }, Tr(Lr)), t)) : null)
            }, [i, t, c, d]);
            return X.createElement("div", {
                className: r
            }, X.createElement("div", {
                className: s
            }, o, a && a), l && X.createElement("div", {
                className: u
            }, l))
        }
        (Ka = wr = wr || {}).None = "None",
        Ka.X = "X",
        Ka.Y = "Y",
        Ka.XY = "XY";
        var Or = fr
          , Rr = pr
          , Lr = {
            key: "data-sdui-text",
            value: "true"
        }
          , Dr = (0,
        yn.makeStyles)()(function(e, t) {
            var n = t.gap
              , r = t.textColor
              , o = t.fontStyle
              , i = t.containerOverrideStyles
              , t = t.textOverrideStyles;
            return {
                textIconRow: Qn({
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
                textIconRowText: Qn(Qn({}, gr), _r(Lr, r, o)),
                textOverride: Qn({
                    flexShrink: 1,
                    minWidth: 0
                }, t),
                iconBaseStyles: {
                    flexShrink: 0
                }
            }
        })
          , Mr = (0,
        yn.makeStyles)()(function(e, t) {
            var n = t.textHeight
              , r = t.textColor
              , o = t.gap
              , t = t.fontStyle;
            return {
                tileFooterContainer: Qn({
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
                textClassName: Qn(Qn({
                    width: "100%",
                    height: "100%"
                }, gr), _r(Lr, r, t)),
                iconContainer: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center"
                }
            }
        })
          , Fr = (0,
        yn.makeStyles)()(function(e, t) {
            var n = t.titleHeight
              , r = t.titleLines
              , o = t.titleColor
              , i = t.titleFontStyles
              , a = t.isContained
              , t = t.containmentPadding;
            return {
                tileBottomContentContainer: Qn({
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
                tileTitleText: Qn(Qn({
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }, 1 === r && Qn({}, gr)), _r(Lr, o, i))
            }
        });
        function Ur(e) {
            var t, n, r = e.isFocused, o = e.imageComponent, i = e.imageAspectRatio, a = e.thumbnailOverlayComponent, l = e.onActivated, s = e.linkPath, u = e.isContained, c = e.containmentPadding, d = e.containmentBackgroundColor, f = e.cornerRadius, p = e.titleText, m = e.titleColor, v = e.titleFont, h = e.titleLines, g = e.titleComponent, y = e.footerComponent, b = e.ctaButtonComponent, I = e.isOnScreen, e = (w = Yn((0,
            X.useState)(!1), 2),
            S = w[0],
            t = w[1],
            n = Xn(function() {
                t(!0)
            }, 100),
            [S, function() {
                n()
            }
            , function() {
                n.cancel(),
                t(!1)
            }
            ]), S = (w = Yn(e, 3))[0], e = w[1], w = w[2], f = (r = jr({
                imageAspectRatio: i,
                isContained: u,
                containmentBackgroundColor: d,
                isFocused: S || r,
                cornerRadius: f
            }).classes).tileContainer, r = r.tileImageContainer;
            return X.createElement(or, {
                containerClassName: f,
                callback: l,
                linkPath: s,
                tabIndex: I ? 0 : -1,
                onFocus: e,
                onFocusLost: w,
                ariaLabel: p
            }, X.createElement("div", {
                className: r
            }, o, a && a), X.createElement(kr, {
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
        function Br(e) {
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
              , S = void 0 !== (C = e.subtitleIconFirst) && C
              , w = e.subtitleComponent
              , C = void 0 === (E = e.verticalGap) ? 0 : E
              , E = e.iconComponent
              , P = e.containerOverrides
              , e = (0,
            X.useMemo)(function() {
                return P ? xr(P) : {}
            }, [P])
              , e = (C = Hr({
                verticalGap: C,
                containerOverrideStyles: e
            }).classes).sectionHeader
              , x = C.titleSubtitleContainer
              , T = (0,
            X.useMemo)(function() {
                return d || (void 0 !== n && void 0 !== o && void 0 !== i ? X.createElement(Nr, {
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
            X.useMemo)(function() {
                return w || (void 0 !== m && void 0 !== v && void 0 !== h ? X.createElement(Nr, {
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
            }, [f, p, w, h, g, y, I, S, b, m, v])
              , C = E
              , E = (0,
            X.useMemo)(function() {
                return X.createElement(or, {
                    containerClassName: x,
                    callback: t,
                    linkPath: r,
                    ariaLabel: n,
                    dataTestId: "section-header-title-subtitle-container"
                }, T, _)
            }, [t, _, T, r, x, n]);
            return X.createElement("div", {
                className: e,
                "data-testid": "section-header"
            }, E, C)
        }
        function Gr(e) {
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
            X.useMemo)(function() {
                if (i)
                    return s ? c.Color.Extended.Gray.Gray_100 : c.Color.Content.Emphasis
            }, [i, s, c.Color.Extended.Gray.Gray_100, c.Color.Content.Emphasis])
              , l = (0,
            X.useMemo)(function() {
                if (d)
                    return s ? "icon-chevron-right-dark" : "icon-chevron-right"
            }, [d, s]);
            return Y().createElement("div", {
                className: "home-sort-header-container",
                style: {
                    marginBottom: c.Gap.Large
                }
            }, Y().createElement(Br, {
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
                iconComponent: u ? Y().createElement(St, {
                    tooltipText: u,
                    placement: "left"
                }) : void 0,
                containerOverrides: s ? {
                    zIndex: 1
                } : void 0
            }))
        }
        var jr = (0,
        yn.makeStyles)()(function(e, t) {
            var n = t.imageAspectRatio
              , r = t.isContained
              , o = t.containmentBackgroundColor
              , i = t.isFocused
              , t = t.cornerRadius;
            return {
                tileContainer: Qn({
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }, r && Qn({
                    borderBottomLeftRadius: "".concat(t, "px"),
                    borderBottomRightRadius: "".concat(t, "px")
                }, o && {
                    backgroundColor: o
                })),
                tileImageContainer: {
                    width: "100%",
                    height: "auto",
                    position: "relative",
                    "&::before": Qn(Qn({
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "".concat(t, "px")
                    }, r && {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px"
                    }), {}, {
                        backgroundColor: "transparent",
                        transition: "background-color ".concat(mr, " ").concat(vr)
                    }, i && {
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }),
                    "& img": Qn({
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        aspectRatio: "".concat(n),
                        borderRadius: "".concat(t, "px")
                    }, r && {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px"
                    })
                }
            }
        })
          , Hr = (0,
        yn.makeStyles)()(function(e, t) {
            var n = t.verticalGap;
            return {
                sectionHeader: Qn({
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
        });
        function zr(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            X.useState)("")
              , e = r[0]
              , o = r[1];
            return (0,
            X.useEffect)(function() {
                var t = !0;
                return n ? Z(n).then(function(e) {
                    t && o(e)
                }, function() {
                    t && o("")
                }) : o(""),
                function() {
                    t = !1
                }
            }, [n]),
            Y().createElement("div", {
                className: he()(["game-sort-carousel-wrapper", {
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
        function Wr(e) {
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
                    e.code === qr.enter && (e.stopPropagation(),
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
        (Ul = function(e) {
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
            X.useMemo)(function() {
                return u || (s ? h(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, h])
              , y = (0,
            X.useMemo)(function() {
                return h(a ? it.LabelLearnMore : ot.ActionSeeAll)
            }, [a, h])
              , e = (0,
            X.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = Q.navigateToSortLink(e),
                P.eventStreamService.sendEvent.apply(P.eventStreamService, e))
            }, [a, l]);
            return v ? Y().createElement(Gr, {
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
            }) : Y().createElement("div", {
                className: "game-sort-header-container"
            }, Y().createElement("div", {
                className: c
            }, Y().createElement("h2", {
                className: "sort-header"
            }, d ? Y().createElement("span", null, t) : Y().createElement(ge.Link, {
                url: r
            }, t), g && Y().createElement(St, {
                tooltipText: g,
                placement: "right"
            })), !d && Y().createElement(ge.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, y)), Y().createElement(fn, {
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
        var Vr = Ul
          , qr = $e.keyBoardEventCode;
        function Jr(e) {
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
            x.EventStream.SendEventWithTarget(g.FeedScroll, i, e, x.EventStream.TargetTypes.WWW)
        }
        function $r(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            X.useRef)(t)
              , s = dn()
              , u = (0,
            X.useMemo)(function() {
                return be(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    Jr({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: y.Horizontal,
                        gameSetTypeId: r,
                        gameSetTargetId: o,
                        sortPosition: i,
                        pageSession: s
                    }),
                    l.current = e)
                }, 250)[0]
            }, [n, r, o, i, s]);
            (0,
            X.useEffect)(function() {
                u(t)
            }, [u, t])
        }
        function Xr(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = io({}, t),
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
        function Yr(e) {
            return "recommendationList"in e
        }
        function Kr(e) {
            return "games"in e
        }
        function Zr(e) {
            return "filters"in e
        }
        function Qr(e, t) {
            return "recommendationList"in e ? Xr(e.recommendationList, t) : Kr(e) ? e.games : []
        }
        function eo(e) {
            if (e && Kr(e))
                return e.gameSetTargetId
        }
        function to(e) {
            var t = eo(e);
            return void 0 !== t ? ((e = {})[R.GameSetTargetId] = t,
            e) : {}
        }
        function no(e) {
            if (e = e.find(Zr)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function ro(e) {
            var t;
            return e && Kr(e) && e.appliedFilters ? ((t = {})[R.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (Cl = function(e) {
            var t = e.hideScrollBackWhenDisabled
              , n = void 0 !== t && t
              , r = e.isScrollBackDisabled
              , o = e.isScrollForwardDisabled
              , i = e.onScrollBack
              , t = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? Y().createElement(Y().Fragment, null, !r && Y().createElement(Wr, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: i,
                isDisabled: r,
                isNewScrollArrowsEnabled: !0
            }), !o && Y().createElement(Wr, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: t,
                isDisabled: o,
                isNewScrollArrowsEnabled: !0
            })) : Y().createElement(Y().Fragment, null, n && r ? null : Y().createElement(Wr, {
                scrollClassNames: he()("scroller", "prev", {
                    disabled: r
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: r,
                scroll: i,
                isNewScrollArrowsEnabled: !1
            }), Y().createElement(Wr, {
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
        var oo = Cl
          , io = function() {
            return (io = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , ao = null !== (Xa = window.ResizeObserver) && void 0 !== Xa ? Xa : $n
          , lo = function() {
            var e = (0,
            X.useState)(void 0)
              , t = e[0]
              , n = e[1]
              , r = (0,
            X.useCallback)(function(e) {
                e = null === (e = null == e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                void 0 !== e && n(e)
            }, [])
              , e = (0,
            X.useCallback)(function(e) {
                e && e[0] && e[0].target && r(e[0].target)
            }, [r])
              , o = (0,
            X.useRef)(new ao(e))
              , e = (0,
            X.useCallback)(function(e) {
                e && null != o && o.current && (r(e),
                o.current.disconnect(),
                o.current.observe(e))
            }, [r]);
            return (0,
            X.useEffect)(function() {
                return function() {
                    null != o && o.current && o.current.disconnect()
                }
            }, []),
            [e, t]
        }
          , so = Qe.numGameCarouselLookAheadWindows
          , uo = Qe.gameTileGutterWidth
          , co = Qe.wideGameTileGutterWidth
          , fo = Qe.scrollerWidth
          , po = et.wideTileHoverGrowWidthPx;
        (Ii = function(e) {
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
              , w = e.sortId
              , C = e.translate
              , E = (0,
            X.useRef)(null)
              , P = (0,
            X.useState)(0)
              , x = P[0]
              , T = P[1]
              , _ = (0,
            X.useState)(!1)
              , N = _[0]
              , A = _[1]
              , e = (0,
            X.useState)(!0)
              , k = e[0]
              , O = e[1]
              , P = (0,
            X.useState)(!0)
              , R = P[0]
              , L = P[1]
              , _ = (0,
            X.useState)(0)
              , D = _[0]
              , M = _[1]
              , F = (0,
            X.useMemo)(function() {
                return u === $.GridTile || u === $.EventTile
            }, [u])
              , U = (0,
            X.useMemo)(function() {
                return F ? co : uo
            }, [F])
              , e = lo()
              , P = e[0]
              , B = e[1]
              , _ = lo()
              , e = _[0]
              , G = _[1]
              , j = (0,
            X.useMemo)(function() {
                if (F && f)
                    return f;
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== G && void 0 !== e ? Math.max(1, Math.floor((G + U) / (e + U))) : 0
            }, [G, U, f, F]);
            (0,
            X.useEffect)(function() {
                O(0 <= D),
                s || void 0 !== G && void 0 !== B && Math.abs(D) + G + po >= B ? L(!0) : L(!1)
            }, [D, G, B, null == t ? void 0 : t.length, s]);
            var H = (0,
            X.useCallback)(function() {
                x + so * j >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [x, j, l, s, null == t ? void 0 : t.length])
              , z = (0,
            X.useCallback)(function() {
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(j) * (e + U)
            }, [j, U])
              , W = (0,
            X.useCallback)(function() {
                var t;
                k || (t = z(),
                M(function(e) {
                    return Math.min(e + t, 0)
                }),
                T(function(e) {
                    return e - j
                }))
            }, [z, k, j])
              , V = (0,
            X.useCallback)(function() {
                var n;
                R || (n = z(),
                M(function(e) {
                    if (b && o === K.HomePage)
                        return void 0 !== B && void 0 !== G ? Math.max(e - n, -1 * (B - G)) : e - n;
                    if (void 0 === B)
                        return e - n;
                    var t = S && k ? fo : 0;
                    return Math.max(e - n, -1 * B) + t
                }),
                T(function(e) {
                    return e + j
                }),
                H())
            }, [R, z, H, b, o, B, G, S, k, j])
              , q = (0,
            X.useCallback)(function(e) {
                return x <= e && e < x + j
            }, [x, j])
              , J = (0,
            X.useCallback)(function(e) {
                N || (A(!0),
                e(),
                setTimeout(function() {
                    A(!1)
                }, 200))
            }, [N])
              , _ = (0,
            X.useRef)(null);
            $r({
                scrollPosition: -D,
                page: o,
                gameSetTypeId: w,
                gameSetTargetId: eo(n),
                wrapperRef: _,
                sortPosition: r
            });
            r = (0,
            X.useMemo)(function() {
                return he()({
                    "hlist games game-cards game-tile-list": !F,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": F,
                    "games-page-carousel": o === K.GamesPage,
                    "home-page-carousel": o === K.HomePage
                })
            }, [F, o]);
            return Y().createElement("div", {
                "data-testid": "game-carousel",
                ref: _,
                className: he()("horizontal-scroller games-list", {
                    "home-page-games-list": o === K.HomePage,
                    "wide-game-tile-list": F,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, Y().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, Y().createElement("div", {
                ref: P,
                className: "horizontally-scrollable",
                style: {
                    left: D + "px"
                }
            }, Y().createElement("ul", {
                ref: i,
                className: r
            }, t.map(function(e, t) {
                return F ? Y().createElement(sn, {
                    key: e.universeId,
                    ref: E,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    translate: C,
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
                }, Y().createElement(sn, {
                    ref: E,
                    id: t,
                    isOnScreen: q(t),
                    page: o,
                    gameData: e,
                    className: "game-card-container",
                    translate: C,
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
            }))), Y().createElement(oo, {
                hideScrollBackWhenDisabled: S,
                isScrollBackDisabled: k,
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
        var mo = Ii
          , vo = function() {
            return (vo = Object.assign || function(e) {
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
                return n[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = a,
                n[R.NumberOfLoadedTiles] = (o || []).length,
                n[R.GameSetTypeId] = i.topicId,
                n[R.Page] = K.HomePage,
                n[F.HomePageSessionInfo] = T,
                n[R.PlayContext] = K.HomePage,
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
              , w = e.isCarouselHorizontalScrollEnabled
              , C = e.isNewScrollArrowsEnabled
              , E = e.isNewSortHeaderEnabled
              , P = (0,
            X.useRef)(null)
              , x = (0,
            X.useRef)(null)
              , T = dn()
              , _ = (0,
            X.useCallback)(function(e) {
                if (void 0 !== o && void 0 !== y) {
                    var t = e.filter(function(e) {
                        return e < (null == o ? void 0 : o.length)
                    });
                    return vo(vo(vo(vo(vo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return o[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return o[e].universeId
                    }),
                    e), z(o, i.topicId, t, l)), V(o, i.topicId, t, l)), j(o, t)), q(y, null == o ? void 0 : o.length, null == o ? void 0 : o.length, t)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = o[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = i.topicId,
                    e[R.Page] = K.HomePage,
                    e[F.HomePageSessionInfo] = T,
                    e))
                }
            }, [o, T, a, i.topicId, l, y]);
            pn(P, o.length, _),
            (0,
            X.useEffect)(function() {
                S && g && null != P && P.current && P.current.style.setProperty("--items-per-row", g.toString())
            }, [S, g]);
            var N = (0,
            X.useMemo)(function() {
                return v ? k.urlService.getAbsoluteUrl(v) : O(i.topic, K.HomePage, {
                    position: a,
                    sortId: i.topicId,
                    page: K.HomePage,
                    treatmentType: i.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, a, i.topic, i.topicId, i.treatmentType, v])
              , A = (0,
            X.useMemo)(function() {
                return h || N
            }, [h, N])
              , e = (0,
            X.useCallback)(function() {
                var e;
                if (v)
                    return (e = {})[R.LinkPath] = v,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = i.topicId,
                    e[R.Page] = K.HomePage,
                    e[F.HomePageSessionInfo] = T,
                    e
            }, [T, a, v, i.topicId]);
            return Y().createElement(zr, {
                backgroundImageAssetId: null !== (_ = i.topicLayoutData) && void 0 !== _ && _.backgroundImageAssetId ? parseInt(null === (_ = i.topicLayoutData) || void 0 === _ ? void 0 : _.backgroundImageAssetId, 10) : void 0
            }, Y().createElement(Vr, {
                sortTitle: i.topic,
                sortSubtitle: i.subtitle,
                seeAllLink: N,
                subtitleLink: A,
                shouldShowSeparateSubtitleLink: !!h,
                isSortLinkOverrideEnabled: !!v,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: i.topicId === qe.adSortHomePageId,
                tooltipInfoText: d,
                titleContainerClassName: "container-header",
                hideSeeAll: f,
                endTimestamp: b,
                countdownString: I,
                backgroundImageAssetId: null !== (I = i.topicLayoutData) && void 0 !== I && I.backgroundImageAssetId ? parseInt(null === (I = i.topicLayoutData) || void 0 === I ? void 0 : I.backgroundImageAssetId, 10) : void 0,
                isNewSortHeaderEnabled: E,
                translate: n
            }), w ? Y().createElement(mo, {
                gameData: o,
                sort: i,
                positionId: a,
                page: K.HomePage,
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
                isCarouselHorizontalScrollEnabled: w,
                isNewScrollArrowsEnabled: C,
                translate: n
            }) : Y().createElement(un, {
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
        var ho = at
          , go = function() {
            return (go = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , yo = function(e, a, l, s) {
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
          , bo = function(n, r) {
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
        function Io() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = go(go({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(go({}, l.current))
            }
            var e = this
              , t = (0,
            X.useState)({})
              , n = t[0]
              , a = t[1]
              , l = (0,
            X.useRef)(n);
            return (0,
            X.useEffect)(function() {
                return yo(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return bo(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if ((null == (n = Te.deviceMeta.getDeviceMeta()) ? void 0 : n.deviceType) !== Te.deviceMeta.DeviceTypes.computer || null === x.CurrentUser || void 0 === x.CurrentUser || !x.CurrentUser.isAuthenticated)
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
                                return n && (e[t.id] = go(go({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(go({}, l.current)),
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
        function So() {
            var e = (0,
            X.useContext)(wo);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var wo = (0,
        X.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Co = function() {
            return (Co = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ka = function(e) {
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
            X.useRef)(null)
              , g = dn()
              , e = (0,
            X.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Co(Co(Co(Co(Co(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), j(r, t)), ((e = {})[R.AbsPositions] = t,
                    e[R.SortPos] = a,
                    e[R.GameSetTypeId] = o.topicId,
                    e)), to(o)), ro(o)), ((e = {})[R.Page] = i,
                    e[R.NumberOfLoadedTiles] = (r || []).length,
                    e[F.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            pn(h, r.length, e),
            (0,
            X.useEffect)(function() {
                p && null != h && h.current && h.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            X.useMemo)(function() {
                var e = Co(Co(((e = {})[R.Position] = a,
                e[R.GameSetTypeId] = o.topicId,
                e), to(o)), ((t = {})[R.Page] = i,
                t[R.TreatmentType] = C.Carousel,
                t[F.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (Kr(e) && e.appliedFilters) {
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
                return O(o.sortId, i, e, m, t)
            }, [g, i, a, o, m]);
            return Y().createElement("div", {
                className: he()("games-list-container", {
                    "wide-game-tile-container": c === $.GridTile || c === $.EventTile
                })
            }, Y().createElement(Vr, {
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
            }), Y().createElement(mo, {
                gamesContainerRef: h,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                sortId: o.topicId,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Co(Co(Co(Co(((n = {})[R.PlaceId] = e.placeId,
                    n[R.UniverseId] = e.universeId,
                    n[R.IsAd] = e.isSponsored,
                    n[R.NativeAdData] = e.nativeAdData,
                    n[R.Position] = t,
                    n[R.SortPos] = a,
                    n[R.GameSetTypeId] = o.topicId,
                    n), to(o)), ((n = {})[R.NumberOfLoadedTiles] = (r || []).length,
                    n[R.Page] = i,
                    n)), ro(o)), ((n = {})[F.DiscoverPageSessionInfo] = g,
                    n[R.PlayContext] = K.GamesPage,
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
        var Eo = Ka
          , Po = (0,
        X.createContext)(void 0)
          , xo = function() {
            return (xo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (fr = function(e) {
            var t = e.translate
              , r = e.sort
              , o = e.positionId
              , n = e.itemsPerRow
              , i = e.gameData
              , a = (0,
            X.useContext)(Po)
              , l = (0,
            X.useRef)(null)
              , s = Io()
              , u = (0,
            X.useMemo)(function() {
                return Ye
            }, [])
              , c = (0,
            X.useCallback)(function(e, t) {
                var n;
                return xo(xo(((n = {})[R.PlaceId] = e.placeId,
                n[R.UniverseId] = e.universeId,
                n[R.IsAd] = e.isSponsored,
                n[R.NativeAdData] = e.nativeAdData,
                n[R.Position] = t,
                n[R.SortPos] = o,
                n[R.NumberOfLoadedTiles] = i.length,
                n[R.GameSetTypeId] = u,
                n), to(r)), ((n = {})[R.Page] = K.SearchLandingPage,
                n[F.SearchLandingPageSessionInfo] = a,
                n[R.PlayContext] = K.SearchLandingPage,
                n))
            }, [o, i.length, u, r, a])
              , e = (0,
            X.useCallback)(function(e) {
                var t = e.filter(function(e) {
                    return e < i.length
                });
                return xo(xo(xo(xo(xo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.placeId
                }),
                e[R.UniverseIds] = t.map(function(e) {
                    return null === (e = i[e]) || void 0 === e ? void 0 : e.universeId
                }),
                e), z(i, u, t)), V(i, u, t)), j(i, t)), to(r)), ((e = {})[R.AbsPositions] = t,
                e[R.SortPos] = o,
                e[R.NumberOfLoadedTiles] = i.length,
                e[R.GameSetTypeId] = u,
                e[R.Page] = K.SearchLandingPage,
                e[F.SearchLandingPageSessionInfo] = a,
                e))
            }, [i, r, o, a, u]);
            return pn(l, i.length, e),
            Y().createElement(Y().Fragment, null, Y().createElement(Vr, {
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
            }), Y().createElement(mo, {
                gameData: i,
                sort: r,
                positionId: o,
                hideScrollBackWhenDisabled: !0,
                sortId: u,
                page: K.SearchLandingPage,
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
        var To = fr;
        function _o(e) {
            var t = e.sort
              , o = So().contentMetadata;
            return 0 === (null == (e = (0,
            X.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, ko)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : Y().createElement(x.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function No(e) {
            var t = e.loadData
              , n = (0,
            X.useRef)(null)
              , r = (0,
            X.useRef)(null);
            return (0,
            X.useEffect)(function() {
                var e = n.current;
                return e && (r.current = P.elementVisibilityService.observeVisibility({
                    element: e,
                    threshold: Xe
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
        (pr = function(e) {
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
              , e = Io()
              , m = So().contentMetadata
              , v = d || o === K.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === $.EventTile
              , f = f || o === K.HomePage && (null === (h = null == n ? void 0 : n.topicLayoutData) || void 0 === h ? void 0 : h.componentType) === $.EventTile
              , h = (0,
            X.useMemo)(function() {
                var e;
                return v ? Qr(n, m) : u ? Qr(n, m).slice(0, i) : Qr(n, m).slice(0, function(e, t) {
                    var n = qe.maxWideGameTilesPerCarouselPage
                      , r = qe.maxTilesPerCarouselPage;
                    if (e !== K.GamesPage && e !== K.SearchLandingPage)
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
            return 0 === (null == h ? void 0 : h.length) ? null : o === K.GamesPage ? Y().createElement(Eo, {
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
            }) : o === K.SearchLandingPage ? Y().createElement(To, {
                key: n.topic,
                sort: n,
                gameData: h,
                translate: t,
                positionId: r,
                itemsPerRow: Ke
            }) : Y().createElement(ho, {
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
        var Ao = pr
          , ko = qe.maxTilesPerCarouselPage;
        function Oo(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            X.useRef)(null);
            return Y().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, Y().createElement("span", {
                className: "text-label creator-name-label"
            }, l(tt.LabelByPrefix), " "), Y().createElement("a", {
                href: i,
                onClick: function() {
                    x.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, x.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && Y().createElement(Ro.VerifiedBadgeIconContainer, {
                size: Ro.BadgeSizes.CAPTIONHEADER
            }))
        }
        No.displayName = "SentinelTile",
        No.defaultProps = {
            loadData: null
        };
        var Ro = RobloxBadges;
        (Ul = function(e) {
            var t = e.universeId
              , n = e.placeId
              , r = e.playButtonEventProperties
              , o = e.disableLoadingState
              , i = e.redirectPurchaseUrl
              , a = x.PlayButton.usePlayabilityStatus
              , l = x.PlayButton.PlayabilityStatuses
              , s = x.PlayButton.DefaultPlayButton
              , e = a(t)
              , u = e[0]
              , a = e[1]
              , e = (0,
            X.useMemo)(function() {
                return !!u && [l.PurchaseRequired, l.FiatPurchaseRequired].includes(u)
            }, [u, l]);
            return Y().createElement(s, {
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
        var Lo = Ul
          , Do = function(e, a, l, s) {
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
          , Mo = function(n, r) {
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
          , Fo = (0,
        X.forwardRef)(function(e, t) {
            var n = e.id
              , r = e.buildEventProperties
              , o = e.gameData
              , i = e.translate
              , a = e.topicId
              , l = (0,
            X.useState)()
              , s = l[0]
              , u = l[1]
              , c = Pe()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = Io()
              , l = xe(o, a)
              , m = (0,
            X.useMemo)(function() {
                return B(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            X.useMemo)(function() {
                return 0 < m.length && s ? Y().createElement($t, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : Y().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            X.useEffect)(function() {
                Do(void 0, void 0, void 0, function() {
                    var t;
                    return Mo(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Ue(o.placeId.toString())];
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
            }, Y().createElement(ge.Link, {
                url: a,
                className: "game-card-link",
                id: o.universeId.toString()
            }, Y().createElement(Rt, {
                gameLayoutData: l,
                isFocused: d
            }), Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameIcon,
                size: Ve.ThumbnailGameIconSize.size512,
                targetId: o.universeId,
                containerClass: "game-card-thumb-container",
                format: Ve.ThumbnailFormat.jpeg,
                altName: o.name
            }), Y().createElement("div", {
                className: "game-card-name-info"
            }, Y().createElement("div", null, Y().createElement("div", {
                className: "game-card-name game-name-title",
                title: o.name
            }, o.name), n ? Y().createElement(Gt, {
                footerData: n
            }) : Y().createElement(Ut, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), Y().createElement(Lo, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: k.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && Y().createElement(Oo, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        Fo.displayName = "FeaturedGridTile";
        var Uo = function() {
            return (Uo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Bo = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (Cl = (0,
        X.forwardRef)(function(e, t) {
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
              , e = Bo(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? Y().createElement(Fo, Uo({
                ref: t
            }, e)) : Y().createElement(sn, Uo({
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
        Cl.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var Go = Cl
          , jo = (0,
        X.forwardRef)(function(e, t) {
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
            return Y().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: g
            }, n.map(function(e, t) {
                return Y().createElement(Go, {
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
            }), s && Y().createElement(No, {
                loadData: l
            }))
        });
        jo.displayName = "GameGrid",
        jo.defaultProps = {
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
        var Ho = jo
          , zo = function() {
            return (zo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Xa = function(e) {
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
            X.useRef)(null)
              , h = (0,
            X.useRef)(null)
              , g = dn()
              , e = (0,
            X.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return zo(zo(zo(zo(zo(zo(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), z(r, o.topicId, t, n)), V(r, o.topicId, t, n)), ((e = {})[R.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[R.AbsPositions] = t,
                    e)), j(r, t)), q(c, u, null == r ? void 0 : r.length, t)), ((t = {})[R.SortPos] = i,
                    t[R.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[R.GameSetTypeId] = o.topicId,
                    t[R.Page] = K.HomePage,
                    t[F.HomePageSessionInfo] = g,
                    t))
                }
            }, [r, g, i, o.topicId, n, u, c]);
            return pn(v, r.length, e),
            (0,
            X.useEffect)(function() {
                u && null != v && v.current && v.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            Y().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, p ? Y().createElement(Gr, {
                titleText: o.topic,
                sendNavigateToSortLinkEvent: void 0,
                titleLink: void 0,
                isSortLinkOverrideEnabled: !1,
                subtitleText: void 0,
                subtitleLink: void 0,
                shouldShowSeparateSubtitleLink: !1,
                hasBackgroundMural: !1,
                tooltipText: o.topicId === qe.adSortHomePageId ? m(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0,
                hideSeeAll: !0
            }) : Y().createElement("div", {
                className: "container-header"
            }, Y().createElement("h2", null, o.topic, o.topicId === qe.adSortHomePageId && Y().createElement(St, {
                tooltipText: m(nt.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                placement: "right"
            }))), Y().createElement(jo, {
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
                    n[R.Page] = K.HomePage,
                    n[F.HomePageSessionInfo] = g,
                    n[R.PlayContext] = K.HomePage,
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
        var Wo = Xa
          , Vo = qe.sortlessGridMaxTilesMetadataToFetch;
        ($n = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = e.isNewSortHeaderEnabled
              , u = Io()
              , c = dn()
              , e = So()
              , d = e.contentMetadata
              , f = e.appendContentMetadata
              , p = (0,
            X.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == d ? void 0 : d[t]) && void 0 !== t && t[e])
                });
                0 < e.length && pe(e.slice(0, Vo), c).then(function(e) {
                    return f(e.contentMetadata)
                }).catch(function() {})
            }, [a, c, d, f]);
            (0,
            X.useEffect)(function() {
                p()
            }, [p]);
            e = (0,
            X.useMemo)(function() {
                return Xr(a, d)
            }, [a, d]);
            return 0 === (null == e ? void 0 : e.length) ? null : Y().createElement(Wo, {
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
        var qo = $n
          , Jo = Zs(5250);
        function $o(e) {
            return ($o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Xo(e, t) {
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
                    return Yo(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Yo(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Yo(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Ko(e, t) {
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
        function Zo(t, e, r) {
            var n = Xo((0,
            X.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = Xo((0,
            X.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            X.useRef)(null)
              , u = (0,
            X.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), ii).filter(function(e) {
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
            Jo.debounce)(function() {
                return u()
            });
            (0,
            X.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = Ko({
                    elements: i,
                    threshold: ai
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
        Zs(1315);
        var Qo, ei, ti, ni, ri, oi, ii = 25, ai = .5;
        function li(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === $o(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function si(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , e = "(" + (null != t ? t : 0) + ")"
              , n = r ? x.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : x.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends";
            return Y().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? Y().createElement("h2", null, o("Heading.Friends")) : Y().createElement("h2", null, o("Heading.Friends"), Y().createElement("span", {
                className: "friends-count"
            }, e)), Y().createElement("a", {
                href: n,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        (Qe = Qo = Qo || {}).ItemImpressions = "itemImpressions",
        Qe.ItemAction = "itemAction",
        (Ii = ei = ei || {}).Home = "home",
        Ii.UserProfile = "userProfile",
        (at = ti = ti || {}).HomePageSessionInfo = "homePageSessionInfo",
        at.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        at.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ka = ni = ni || {}).ContentType = "contentType",
        Ka.Context = "context",
        Ka.CollectionId = "collectionId",
        Ka.CollectionPosition = "collectionPosition",
        (fr = {}).Online = "online",
        fr.InGame = "inGame",
        fr.InStudio = "inStudio",
        fr.Offline = "offline",
        (pr = {}).Friend = "friend",
        pr.NotFriend = "notFriend",
        (Ul = ri = ri || {}).ItemIds = "itemIds",
        Ul.ItemPositions = "itemPositions",
        Ul.RowNumbers = "rowNumbers",
        Ul.FeedRowNumbers = "feedRowNumbers",
        Ul.PositionsInRow = "positionsInRow",
        Ul.PositionsInTopic = "positionsInTopic",
        Ul.TotalNumberOfItems = "totalNumberOfItems",
        (Cl = {}).Presences = "presences",
        Cl.PresenceUniverseIds = "presenceUniverseIds",
        Cl.FriendStatuses = "friendStatuses",
        Cl.SourceCarousel = "sourceCarousel",
        (Xa = oi = oi || {}).ItemId = "itemId",
        Xa.ItemPosition = "itemPosition",
        Xa.RowNumber = "rowNumber",
        Xa.FeedRowNumber = "feedRowNumber",
        Xa.PositionInRow = "positionInRow",
        Xa.PositionInTopic = "positionInTopic",
        Xa.TotalNumberOfItems = "totalNumberOfItems",
        Xa.ActionType = "actionType",
        ($n = {}).Presence = "presence",
        $n.PresenceUniverseId = "presenceUniverseId",
        $n.FriendStatus = "friendStatus",
        $n.SourceCarousel = "sourceCarousel";
        var ui = function() {
            return x.RealTime.Factory.GetClient()
        }
          , ci = function(e, a, l, s) {
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
          , di = function(n, r) {
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
          , fi = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , pi = function(n) {
            return ci(void 0, void 0, Promise, function() {
                var t;
                return di(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: x.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, k.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , mi = function(m, v) {
            return ci(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return di(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v ? [4, (i = m,
                        ci(void 0, void 0, Promise, function() {
                            var t;
                            return di(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: x.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, k.httpService.get(t)];
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
                        ci(void 0, void 0, Promise, function() {
                            var t;
                            return di(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = x.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
                                    t = {
                                        url: o ? t + "?userSort=1" : t,
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    [4, k.httpService.get(t)];
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
                        f = fi(fi([], d), f),
                        [4, (r = f,
                        ci(void 0, void 0, Promise, function() {
                            var t, n;
                            return di(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: x.EnvironmentUrls.apiGatewayUrl + "/user-profile-api/v1/user/profiles/get-profiles",
                                        retryable: !0,
                                        withCredentials: !0
                                    },
                                    n = {
                                        userIds: r,
                                        fields: ["names.combinedName", "isVerified"]
                                    },
                                    [4, k.httpService.post(t, n)];
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
          , vi = function() {
            return ci(void 0, void 0, Promise, function() {
                var t;
                return di(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: x.EnvironmentUrls.friendsApi + "/v1/my/new-friend-requests/count",
                            retryable: !0,
                            withCredentials: !0
                        },
                        [4, k.httpService.get(t)];
                    case 1:
                        return [2, e.sent().data.count]
                    }
                })
            })
        }
          , hi = function(e, a, l, s) {
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
          , gi = function(n, r) {
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
          , yi = x.EnvironmentUrls.chatApi
          , bi = function() {
            return hi(void 0, void 0, Promise, function() {
                var t;
                return gi(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, k.httpService.get({
                            url: yi + "/v1/metadata",
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
          , Qe = {
            common: [],
            feature: "Feature.PeopleList"
        }
          , Ii = RobloxPresence
          , Si = Zs.n(Ii);
        function wi(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return Y().createElement("div", {
                className: "friend-tile-content"
            }, Y().createElement(Pi, {
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
            }), Y().createElement(Ro.VerifiedBadgeIconContainer, {
                size: Ro.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), Y().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && Y().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function Ci(e) {
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
            }, Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.gameIcon,
                size: Ve.ThumbnailGameIconSize.size150,
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
            }, o), Y().createElement(ge.Button, {
                variant: ge.Button.variants.growth,
                size: ge.Button.sizes.small,
                width: ge.Button.widths.full,
                onClick: function() {
                    return xi(void 0, void 0, void 0, function() {
                        var t;
                        return Ti(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return (t = n.presence.gameId || "",
                                (0,
                                x.DeviceMeta)().isInApp) ? ((0,
                                x.DeviceMeta)().isDesktop ? x.GameLauncher.followPlayerIntoGame(n.id, t, "JoinUser") : window.location.href = "/games/start?userID=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 1];
                            case 1:
                                return (0,
                                x.DeviceMeta)().isAndroidDevice || (0,
                                x.DeviceMeta)().isChromeOs ? (window.location.href = "intent://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser#Intent;scheme=robloxmobile;package=com.roblox.client;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.roblox.client;end",
                                [3, 5]) : [3, 2];
                            case 2:
                                return (0,
                                x.DeviceMeta)().isIosDevice ? (window.location.href = "robloxmobile://userId=" + n.id + "&joinAttemptId=" + t + "&joinAttemptOrigin=JoinUser",
                                [3, 5]) : [3, 3];
                            case 3:
                                return [4, x.ProtocolHandlerClientInterface.followPlayerIntoGame({
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
                    P.chatService.startDesktopAndMobileWebChat({
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
        function Ei(e) {
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
            X.useState)(!1)
              , e = a[0]
              , l = a[1]
              , s = (0,
            X.useRef)(null)
              , u = (0,
            X.useRef)(null);
            return (0,
            X.useEffect)(function() {
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
        (at = function(e) {
            var t = e.id
              , n = e.userProfileUrl
              , r = e.handleImageClick
              , o = e.translate
              , e = Y().createElement(Ve.Thumbnail2d, {
                type: Ve.ThumbnailTypes.avatarHeadshot,
                size: Ve.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            });
            return Y().createElement(ge.AvatarCardItem.Headshot, {
                statusIcon: Y().createElement(Si().PresenceStatusIcon, {
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
        var Pi = at
          , xi = function(e, a, l, s) {
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
          , Ti = function(n, r) {
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
        function _i(e) {
            return (_i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Ni(e, t) {
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
                    return Ai(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Ai(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Ai(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function ki(e, t) {
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
        function Oi(t, e, r) {
            var n = Ni((0,
            X.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = Ni((0,
            X.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            X.useRef)(null)
              , u = (0,
            X.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), zi).filter(function(e) {
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
            Jo.debounce)(function() {
                return u()
            });
            (0,
            X.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = ki({
                    elements: i,
                    threshold: Wi
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
        Zs(6870);
        var Ri, Li, Di, Mi, Fi, Ui, Bi, Gi, ji, Hi, zi = 25, Wi = .5;
        function Vi(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === _i(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function qi(e, t, n) {
            return t ? Fi.InGame : e && "Studio" === n ? Fi.InStudio : e ? Fi.Online : Fi.Offline
        }
        function Ji(e) {
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
              , f = x.EnvironmentUrls.websiteUrl + "/users/" + t.id + "/profile"
              , p = t.combinedName
              , m = Si().usePresence(t.id, void 0)
              , v = null != m && null != m.gameId
              , h = v ? m.lastLocation : null
              , e = null != h && 15 < h.length ? h.slice(0, 15) + "..." : h
              , g = v ? x.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = Xi(t, n, a, l, s, u, c, d);
            return Y().createElement("div", {
                className: "friends-carousel-tile"
            }, Y().createElement(Ei, {
                trigger: Y().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, Y().createElement(wi, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? Y().createElement(Ci, {
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
        (Ka = Ri = Ri || {}).ItemImpressions = "itemImpressions",
        Ka.ItemAction = "itemAction",
        (fr = {}).Home = "home",
        fr.UserProfile = "userProfile",
        (pr = Li = Li || {}).HomePageSessionInfo = "homePageSessionInfo",
        pr.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        pr.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ul = Di = Di || {}).ContentType = "contentType",
        Ul.Context = "context",
        Ul.CollectionId = "collectionId",
        Ul.CollectionPosition = "collectionPosition",
        (Mi = Mi || {}).User = "User",
        (Cl = Fi = Fi || {}).Online = "online",
        Cl.InGame = "inGame",
        Cl.InStudio = "inStudio",
        Cl.Offline = "offline",
        (Xa = Ui = Ui || {}).Friend = "friend",
        Xa.NotFriend = "notFriend",
        ($n = Bi = Bi || {}).ItemIds = "itemIds",
        $n.ItemPositions = "itemPositions",
        $n.RowNumbers = "rowNumbers",
        $n.FeedRowNumbers = "feedRowNumbers",
        $n.PositionsInRow = "positionsInRow",
        $n.PositionsInTopic = "positionsInTopic",
        $n.TotalNumberOfItems = "totalNumberOfItems",
        (Ii = Gi = Gi || {}).Presences = "presences",
        Ii.PresenceUniverseIds = "presenceUniverseIds",
        Ii.FriendStatuses = "friendStatuses",
        Ii.SourceCarousel = "sourceCarousel",
        (at = ji = ji || {}).ItemId = "itemId",
        at.ItemPosition = "itemPosition",
        at.RowNumber = "rowNumber",
        at.FeedRowNumber = "feedRowNumber",
        at.PositionInRow = "positionInRow",
        at.PositionInTopic = "positionInTopic",
        at.TotalNumberOfItems = "totalNumberOfItems",
        at.ActionType = "actionType",
        (Ka = Hi = Hi || {}).Presence = "presence",
        Ka.PresenceUniverseId = "presenceUniverseId",
        Ka.FriendStatus = "friendStatus",
        Ka.SourceCarousel = "sourceCarousel";
        var $i = function() {
            return ($i = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Xi = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            X.useCallback)(function() {
                var e, t = {};
                return t[Di.Context] = i,
                t[Di.ContentType] = Mi.User,
                t[Di.CollectionId] = l,
                t[Di.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[ji.TotalNumberOfItems] = u,
                t[ji.ActionType] = "OpenProfile",
                t[ji.ItemId] = n.id.toString(),
                t[ji.ItemPosition] = r + 1,
                t[ji.PositionInTopic] = r + 1,
                t[ji.RowNumber] = 1,
                t[Hi.Presence] = qi(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[Hi.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[Hi.FriendStatus] = "friend",
                t[Hi.SourceCarousel] = o,
                t[Li.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            X.useCallback)(function() {
                var e = t();
                P.eventStreamService.sendEvent({
                    name: Ri.ItemAction,
                    type: Ri.ItemAction,
                    context: i
                }, Vi($i({}, e)))
            }, [t, i])
        }
          , Yi = function() {
            return (Yi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ki = function(e, n, r, o, i, a, l) {
            var t = (0,
            X.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[Di.Context] = o,
                    e[Di.ContentType] = Mi.User,
                    e[Di.CollectionId] = a,
                    e[Di.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[Bi.TotalNumberOfItems] = n.length,
                    e[Bi.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[Bi.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Bi.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[Bi.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[Gi.Presences] = t.map(function(e) {
                        var t;
                        return qi(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[Gi.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[Gi.FriendStatuses] = t.map(function() {
                        return Ui.Friend
                    }),
                    e[Gi.SourceCarousel] = r,
                    e[Li.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            X.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? P.eventStreamService.sendEvent({
                    name: Ri.ItemImpressions,
                    type: Ri.ItemImpressions,
                    context: o
                }, Vi(Yi({}, e))) : (0,
                E.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            Oi(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        };
        function Zi(e) {
            var t = e.translate
              , e = e.badgeCount;
            return Y().createElement("div", {
                className: "friends-carousel-tile"
            }, Y().createElement("a", {
                href: "/users/friends#!/friend-requests"
            }, Y().createElement("div", {
                className: "add-friends-icon-container"
            }, 0 < e && Y().createElement(yn.Badge, {
                className: "friend-request-badge",
                overlap: "rectangular",
                variant: "standard",
                max: 99,
                color: "error",
                badgeContent: e.toString()
            }), Y().createElement(yn.PlusHeavyIcon, {
                className: "add-friends-icon",
                color: "secondary"
            })), Y().createElement("div", {
                className: "friends-carousel-tile-labels",
                "data-testid": "friends-carousel-tile-labels"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-label"
            }, Y().createElement("div", {
                className: "friends-carousel-tile-name"
            }, Y().createElement("span", {
                className: "friends-carousel-display-name"
            }, t("Heading.AddFriends")))))))
        }
        function Qi(e) {
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
            X.useRef)(null)
              , p = (g = (0,
            X.useState)(n))[0]
              , m = g[1]
              , v = (0,
            X.useState)(!1)
              , e = v[0]
              , h = v[1]
              , g = (0,
            X.useRef)(null);
            return (0,
            X.useEffect)(function() {
                var e, t = null === (e = f.current) || void 0 === e ? void 0 : e.offsetWidth;
                h(110 * (null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0) > (null != t ? t : 0)),
                null != t && null != n && (t = 50,
                m(n.slice(0, t)))
            }, [null === (v = f.current) || void 0 === v ? void 0 : v.offsetWidth, n]),
            Ki(g, n, a, l, s, u, c),
            Y().createElement("div", null, Y().createElement("div", {
                ref: function(e) {
                    return f.current = e,
                    f.current
                },
                className: "friends-carousel-container"
            }, null == p ? Y().createElement("span", {
                className: "spinner spinner-default"
            }) : Y().createElement("div", {
                ref: g,
                className: e ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, a === ea.WebHomeFriendsCarousel && d ? Y().createElement(Zi, {
                key: "add-friends-tile",
                translate: o,
                badgeCount: t,
                "data-testid": "add-friends-tile"
            }) : null, p.map(function(e, t) {
                return Y().createElement("div", {
                    key: e.id
                }, Y().createElement(Ji, {
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
        (fr = El = El || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        fr.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var ea = El
          , ta = (x.EnvironmentUrls.friendsApi,
        x.EnvironmentUrls.premiumFeaturesApi,
        x.EnvironmentUrls.usersApi,
        x.EnvironmentUrls.gamesApi,
        x.EnvironmentUrls.contactsApi,
        x.EnvironmentUrls.accountSettingsApi,
        x.EnvironmentUrls.authApi,
        x.EnvironmentUrls.tradesApi,
        x.EnvironmentUrls.apiGatewayUrl)
          , na = (x.EnvironmentUrls.chatApi,
        function() {
            return {
                url: "".concat(ta, "/user-blocking-api/v1/users/batch-check-reciprocal-block"),
                withCredentials: !0
            }
        }
        )
          , ra = function(e, a, l, s) {
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
          , oa = function(n, r) {
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
          , ia = function(n) {
            return ra(void 0, void 0, Promise, function() {
                var t;
                return oa(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = parseInt(x.CurrentUser.userId, 10),
                        Number.isNaN(t) || !t ? [2, {
                            users: [{
                                isBlocked: !1,
                                isBlockingViewer: !1,
                                userId: 0
                            }]
                        }] : [4, k.httpService.post(na(), {
                            userIds: n,
                            requesterUserId: t
                        })];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , aa = x.EnvironmentUrls.apiGatewayUrl
          , la = (x.EnvironmentUrls.friendsApi,
        x.EnvironmentUrls.thumbnailsApi,
        x.EnvironmentUrls.presenceApi,
        x.EnvironmentUrls.gamesApi,
        x.EnvironmentUrls.usersApi,
        function(e, t, n) {
            t = 1 < arguments.length && void 0 !== t ? t : null,
            n = 2 < arguments.length && void 0 !== n ? n : null;
            return {
                retryable: !0,
                withCredentials: !0,
                url: "".concat(aa, "/access-management/v1/upsell-feature-access?featureName=").concat(e).concat(t ? "&extraParameters=".concat(t) : "").concat(n ? "&successfulActions=".concat(n) : "")
            }
        }
        );
        function sa(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var ua = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n, r) {
                var o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return o = n ? btoa(JSON.stringify(n)) : null,
                            o = la(t, o, r),
                            e.next = 4,
                            k.httpService.get(o);
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
                        sa(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        sa(r, t, n, o, i, "throw", e)
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
        function ca(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function da(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        ca(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        ca(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        var fa = function() {
            var e = da(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            ua("MustHideConnections", [{
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
          , pa = function() {
            var e = da(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0,
                            e.next = 3,
                            ia([parseInt(t, 10)]);
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
          , ma = function(e, a, l, s) {
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
          , va = function(n, r) {
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
          , ha = "FriendshipNotifications"
          , ga = "fulfilled";
        function ya(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = x.CurrentUser.userId) && void 0 !== o ? o : "0");
            return Y().createElement("div", {
                className: "friend-carousel-container"
            }, Y().createElement(Ca, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: ea.WebHomeFriendsCarousel,
                eventContext: ei.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function ba(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = dn();
            return Y().createElement(ya, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
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
                className: he()("filter-option", {
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
        function Sa(e) {
            var t = e.filter
              , n = e.dropdownContainerRef
              , r = e.selectedOptionId
              , o = e.setSelectedOptionId
              , i = e.setIsDropdownOpen
              , a = e.updateFilterValue
              , l = e.sendFilterClickEvent
              , s = e.translate
              , e = (0,
            X.useCallback)(function() {
                a(r),
                i(!1),
                l(t.filterId, I.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            X.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, I.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            X.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            X.useCallback)(function(e) {
                e.key === Ea.keyBoardEventCode.escape && u()
            }, [u]);
            return (0,
            X.useEffect)(function() {
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
                }, Y().createElement(Ia, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
                }), 0 === t && Y().createElement("div", {
                    className: "filter-option-divider"
                }))
            })), Y().createElement("div", {
                className: "action-buttons-container"
            }, Y().createElement(ge.Button, {
                onClick: e,
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                width: ge.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, s(tt.ActionApply) || "Apply")))
        }
        function wa(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = Y().useRef(null)
              , a = (u = (0,
            X.useState)(!1))[0]
              , l = u[1]
              , s = (e = (0,
            X.useState)(r.selectedOptionId))[0]
              , u = e[1]
              , e = (0,
            X.useMemo)(function() {
                var e = r.filterOptions.find(function(e) {
                    return e.optionId === r.selectedOptionId
                });
                return null == e ? void 0 : e.optionDisplayName
            }, [r.selectedOptionId, r.filterOptions]);
            return Y().createElement("div", {
                ref: i
            }, Y().createElement(ge.Button, {
                onClick: function() {
                    l(function(e) {
                        var t = e ? I.CloseDropdown : I.OpenDropdown
                          , n = e ? s : void 0;
                        return o(r.filterId, t, r.selectedOptionId, n),
                        !e
                    })
                },
                variant: a ? ge.Button.variants.primary : ge.Button.variants.secondary,
                size: ge.Button.sizes.medium,
                className: "filter-select"
            }, Y().createElement("span", {
                className: "filter-display-text"
            }, e), Y().createElement("span", {
                className: a ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), a && Y().createElement(Sa, {
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
        (pr = function(e) {
            var t = e.translate
              , m = e.profileUserId
              , v = e.isOwnUser
              , h = e.carouselName
              , n = e.eventContext
              , r = e.homePageSessionInfo
              , o = e.sortId
              , i = e.sortPosition
              , a = (0,
            X.useState)(null)
              , l = a[0]
              , g = a[1]
              , s = (0,
            X.useState)(null)
              , u = s[0]
              , y = s[1]
              , c = (0,
            X.useState)(!1)
              , d = c[0]
              , b = c[1]
              , e = (0,
            X.useState)(null)
              , a = e[0]
              , I = e[1]
              , s = (0,
            X.useState)(!1)
              , f = s[0]
              , S = s[1]
              , c = (0,
            X.useState)({
                isBadgeEnabled: !1,
                isAddFriendsTileEnabledWeb: !1
            })
              , e = c[0]
              , w = c[1]
              , s = (0,
            yn.createCache)()
              , c = (0,
            p.useTheme)();
            return (0,
            X.useEffect)(function() {
                if (f) {
                    var e = function() {
                        return ma(void 0, void 0, void 0, function() {
                            var t;
                            return va(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return e.trys.push([0, 2, , 3]),
                                    [4, vi()];
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
                      , t = ui();
                    return t.Subscribe(ha, e),
                    function() {
                        t.Unsubscribe(ha, e)
                    }
                }
            }, [f]),
            (0,
            X.useEffect)(function() {
                ma(void 0, void 0, void 0, function() {
                    var s, u, c, d, f, p;
                    return va(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return p = [pi(m), mi(m, v), bi(), vi(), (a = m,
                            l = v,
                            ma(void 0, void 0, void 0, function() {
                                return va(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        return l ? [2, !1] : [4, pa(a)];
                                    case 1:
                                        return e.sent() ? [2, !0] : [4, fa(a)];
                                    case 2:
                                        return [2, e.sent()]
                                    }
                                })
                            })), ma(void 0, void 0, Promise, function() {
                                var t;
                                return va(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        if (null === x.ExperimentationService || void 0 === x.ExperimentationService || !x.ExperimentationService.getAllValuesForLayer)
                                            return [3, 4];
                                        e.label = 1;
                                    case 1:
                                        return e.trys.push([1, 3, , 4]),
                                        [4, x.ExperimentationService.getAllValuesForLayer("Social.Friends")];
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
                                        status: ga,
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
                            s = s.status === ga ? s.value.count : 0,
                            u = u.status === ga ? u.value : [],
                            c = c.status === ga && c.value.chatEnabled,
                            d = d.status === ga ? d.value : 0,
                            f = f.status === ga ? f.value : {
                                isBadgeEnabled: !1,
                                isAddFriendsTileEnabledWeb: !1
                            },
                            p = p.status !== ga || p.value,
                            g(s),
                            y(u),
                            b(c),
                            I(d),
                            w(f),
                            S((t = p,
                            n = h,
                            r = s,
                            o = d,
                            i = f.isAddFriendsTileEnabledWeb,
                            !t && (n !== ea.WebHomeFriendsCarousel ? 0 !== r : 0 !== r || i && 0 !== o))),
                            [2]
                        }
                        var t, n, r, o, i, a, l
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [m, v]),
            Y().createElement(yn.CacheProvider, {
                cache: s
            }, Y().createElement(yn.UIThemeProvider, {
                theme: c,
                cssBaselineMode: "disabled"
            }, f ? Y().createElement("div", {
                className: "react-friends-carousel-container"
            }, Y().createElement(si, {
                friendsCount: l,
                translate: t,
                profileUserId: m,
                isOwnUser: v
            }), Y().createElement(Qi, {
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
            })) : Y().createElement("div", {
                className: "friends-carousel-0-friends"
            })))
        }
        ).defaultProps = {
            translate: void 0
        };
        var Ca = (0,
        p.withTranslations)(pr, Qe)
          , Ea = et
          , Pa = function() {
            return (Pa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , xa = function(i, a, e) {
            var l = dn()
              , t = (0,
            X.useRef)(null)
              , n = (0,
            X.useCallback)(function() {
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
                e[R.Page] = K.GamesPage,
                e
            }, [i.filters, i.topicId, i.gameSetTargetId, a, l]);
            (0,
            X.useEffect)(function() {
                return null != e && e.current && (t.current = P.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: $e.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = Q.filterImpressions(e)) && P.eventStreamService.sendEvent.apply(P.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var o = (0,
            X.useCallback)(function(e, t, n, r) {
                var o;
                return Pa(((o = {})[R.ButtonName] = t,
                o[R.GameSetTypeId] = i.topicId,
                o[R.GameSetTargetId] = i.gameSetTargetId,
                o[R.SortPos] = a,
                o[F.DiscoverPageSessionInfo] = l,
                o[R.Page] = K.GamesPage,
                o[R.FilterId] = e,
                o[R.SelectedOptionId] = n,
                o), r && ((o = {})[R.PreviousOptionId] = r,
                o))
            }, [i.topicId, i.gameSetTargetId, a, l]);
            return (0,
            X.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = Q.gamesFilterClick(r);
                r && P.eventStreamService.sendEvent.apply(P.eventStreamService, r)
            }, [o])
        };
        (Ul = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            X.useRef)(null)
              , a = xa(o, t, e);
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
                return Y().createElement(wa, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = no([o]),
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
        var Ta, _a = Ul, Na = "webDiscoverySduiError";
        function Aa(e, t) {
            return void 0 === e || "number" != typeof e && "boolean" != typeof e ? void 0 !== e && "string" == typeof e ? e : t : e.toString()
        }
        function ka(e, t) {
            if ("number" == typeof e)
                return e;
            if ("string" == typeof e) {
                e = parseInt(e, 10);
                if (!Number.isNaN(e))
                    return e
            }
            return t
        }
        function Oa(e, t) {
            if ("boolean" == typeof e)
                return e;
            if ("string" != typeof e)
                return "number" == typeof e ? 1 === e || 0 !== e && (Ba(Ta.ParseBooleanFieldInvalidNumber, "Invalid number value for boolean field: " + e),
                t) : (Ba(Ta.ParseBooleanFieldInvalidType, "Invalid type for boolean field: " + typeof e + ", input: " + (e ? JSON.stringify(e) : "undefined")),
                t);
            var n = e.toLowerCase();
            return "true" === n || "t" === n || "false" !== n && "f" !== n && (Ba(Ta.ParseBooleanFieldInvalidString, "Invalid string value for boolean field: " + e),
            t)
        }
        function Ra(e) {
            return null != e && ("string" == typeof e || "number" == typeof e || "boolean" == typeof e)
        }
        function La(n) {
            var r = {};
            return Object.keys(n).forEach(function(e) {
                var t = n[e];
                Ra(t) ? r[e] = t : Ba(Ta.AnalyticsParsingDiscardedInvalidParam, "Discarding invalid event parameter key: " + e + ", value: " + JSON.stringify(t) + ", type: " + typeof t)
            }),
            r
        }
        function Da(e, t, n) {
            return null != t && t.analyticsData && void 0 !== (null == t ? void 0 : t.analyticsData[e]) && null !== (null == t ? void 0 : t.analyticsData[e]) ? t.analyticsData[e] : null != t && t.ancestorAnalyticsData && void 0 !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) && null !== (null == t ? void 0 : t.ancestorAnalyticsData[e]) ? t.ancestorAnalyticsData[e] : n
        }
        function Ma(e, t, n) {
            return e = Ga(Ga(Ga({}, t), e), n),
            n = Ga(Ga({}, e), {
                id: Aa(e.id, ja.id),
                itemPosition: ka(e.itemPosition, ja.itemPosition)
            }),
            void 0 === (e = n).id || void 0 === e.itemPosition || e.itemPosition < 0 ? (Ba(Ta.AnalyticsBuilderInvalidItemAnalyticsData, "Item analytics data is invalid: " + JSON.stringify(n)),
            Ga(Ga({}, ja), n)) : n
        }
        function Fa(e) {
            var t = Oa(Da("adFlag", e, !1), !1)
              , n = ka(Da("itemPosition", e, -1), -1)
              , r = null != e && e.getCollectionData ? e.getCollectionData() : void 0
              , o = null !== (i = null == r ? void 0 : r.collectionPosition) && void 0 !== i ? i : ka(Da("collectionPosition", e, -1), -1)
              , i = null !== (a = null == r ? void 0 : r.totalNumberOfItems) && void 0 !== a ? a : ka(Da("totalNumberOfItems", e, -1), -1)
              , r = null !== (a = null == r ? void 0 : r.collectionId) && void 0 !== a ? a : ka(Da("collectionId", e, -1), -1)
              , a = Aa(Da(ti.HomePageSessionInfo, e, ""), "");
            return (e = {})[R.IsAd] = t,
            e[R.Position] = n,
            e[R.SortPos] = o,
            e[R.NumberOfLoadedTiles] = i,
            e[R.GameSetTypeId] = r,
            e[R.Page] = K.HomePage,
            e[F.HomePageSessionInfo] = a,
            e
        }
        (Cl = Ta = Ta || {}).AnalyticsBuilderInvalidCollectionAnalyticsData = "AnalyticsBuilderInvalidCollectionAnalyticsData",
        Cl.AnalyticsBuilderInvalidItemAnalyticsData = "AnalyticsBuilderInvalidItemAnalyticsData",
        Cl.AnalyticsParsingDiscardedInvalidParam = "AnalyticsParsingDiscardedInvalidParam",
        Cl.AssetImageMissingAssetUrl = "AssetImageMissingAssetUrl",
        Cl.BuildBaseActionParamsMissingItem = "BuildBaseActionParamsMissingItem",
        Cl.BuildBaseImpressionParamsMissingItem = "BuildBaseImpressionParamsMissingItem",
        Cl.BuildItemImpressionParamsMissingItem = "BuildItemImpressionParamsMissingItem",
        Cl.ComponentNotFound = "ComponentNotFound",
        Cl.InvalidImageQualityLevelConditionValue = "InvalidImageQualityLevelConditionValue",
        Cl.InvalidMaxWidthConditionValue = "InvalidMaxWidthConditionValue",
        Cl.InvalidPageForSessionAnalytics = "InvalidPageForSessionAnalytics",
        Cl.InvalidParsedMaxWidthConditionValue = "InvalidParsedMaxWidthConditionValue",
        Cl.NestedPropParseFailure = "NestedPropParseFailure",
        Cl.ParseBooleanFieldInvalidNumber = "ParseBooleanFieldInvalidNumber",
        Cl.ParseBooleanFieldInvalidString = "ParseBooleanFieldInvalidString",
        Cl.ParseBooleanFieldInvalidType = "ParseBooleanFieldInvalidType",
        Cl.PropParseFailure = "PropParseFailure",
        Cl.PropParserNotFound = "PropParserNotFound",
        Cl.ReportItemActionMissingCollectionData = "ReportItemActionMissingCollectionData",
        Cl.ReportItemImpressionsMissingData = "ReportItemImpressionsMissingData",
        Cl.ReportItemImpressionsNoIndexesToSend = "ReportItemImpressionsNoIndexesToSend",
        Cl.SduiActionOpenGameDetailsInvalidId = "SduiActionOpenGameDetailsInvalidId",
        Cl.SduiActionOpenSeeAllInvalidCollectionId = "SduiActionOpenSeeAllInvalidCollectionId",
        Cl.SduiActionOpenSeeAllInvalidCollectionName = "SduiActionOpenSeeAllInvalidCollectionName",
        Cl.SduiComponentBuildPropsAndChildrenInvalidConfig = "SduiComponentBuildPropsAndChildrenInvalidConfig",
        Cl.SduiFeedItemBoundaryError = "SduiFeedItemBoundaryError",
        Cl.SduiParseAssetUrlInvalidFormat = "SduiParseAssetUrlInvalidFormat",
        Cl.SduiParseAssetUrlInvalidInput = "SduiParseAssetUrlInvalidInput",
        Cl.SduiParseAssetUrlIntoComponentInvalidAssetType = "SduiParseAssetUrlIntoComponentInvalidAssetType",
        Cl.SduiParseAssetUrlIntoComponentInvalidRbxThumb = "SduiParseAssetUrlIntoComponentInvalidRbxThumb",
        Cl.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType = "SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType",
        Cl.SduiParseAutomaticSizeInvalidInput = "SduiParseAutomaticSizeInvalidInput",
        Cl.SduiParseCallbackInvalidConfig = "SduiParseCallbackInvalidConfig",
        Cl.SduiParseColorValueInvalidInput = "SduiParseColorValueInvalidInput",
        Cl.SduiParseFoundationTokenInvalidInput = "SduiParseFoundationTokenInvalidInput",
        Cl.SduiParseFoundationTokenInvalidInputPath = "SduiParseFoundationTokenInvalidInputPath",
        Cl.SduiParseFoundationTokenInvalidOutputType = "SduiParseFoundationTokenInvalidOutputType",
        Cl.SduiParseFoundationTokenMissingTokens = "SduiParseFoundationTokenMissingTokens",
        Cl.SduiParseGradientInvalidConfig = "SduiParseGradientInvalidConfig",
        Cl.SduiParseIconInvalidInput = "SduiParseIconInvalidInput",
        Cl.SduiParseUDim2InvalidInput = "SduiParseUDim2InvalidInput",
        Cl.SduiParseVector2InvalidInput = "SduiParseVector2InvalidInput",
        Cl.SduiParseUiComponentInvalidConfig = "SduiParseUiComponentInvalidConfig",
        Cl.ServerDrivenFeedItemMissingFeedOrFeedItems = "ServerDrivenFeedItemMissingFeedOrFeedItems",
        Cl.ServerDrivenFeedItemMissingItem = "ServerDrivenFeedItemMissingItem",
        Cl.SingleItemCollectionItemImpressedButMissing = "SingleItemCollectionItemImpressedButMissing",
        Cl.SingleItemCollectionMissingItem = "SingleItemCollectionMissingItem",
        Cl.CollectionCarouselMissingItem = "CollectionCarouselMissingItem",
        Cl.UnknownImageQualityLevelConditionValue = "UnknownImageQualityLevelConditionValue",
        Cl.UnknownResponsivePropConditionKey = "UnknownResponsivePropConditionKey",
        Cl.VerticalFeedMissingFeedItems = "VerticalFeedMissingFeedItems";
        var Ua, Ba = function(e, t) {
            (0,
            E.fireEvent)(e);
            t = {
                errorName: e,
                errorMessage: t
            };
            P.eventStreamService.sendEvent({
                name: Na,
                type: Na,
                context: ei.Home
            }, li(t))
        }, Ga = function() {
            return (Ga = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, ja = {
            id: "Unknown",
            itemPosition: -1
        }, Ha = {
            collectionId: -1,
            contentType: "Unknown",
            itemsPerRow: -1,
            collectionPosition: -1,
            totalNumberOfItems: -1
        }, za = function() {
            return (za = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Wa = [ni.CollectionId, ni.CollectionPosition, ni.ContentType, "id", "itemPosition", "itemsPerRow", "rowNumber", ri.TotalNumberOfItems], Va = function(e, t, n) {
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
                d.push(t + 1)) : d.push(1)) : Ba(Ta.BuildBaseImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + l)
            }),
            (p = {})[ni.CollectionId] = l,
            p[ni.CollectionPosition] = a,
            p[ni.ContentType] = o,
            p[ri.TotalNumberOfItems] = s,
            p[ri.ItemIds] = u.join(","),
            p[ri.ItemPositions] = c.join(","),
            p[ri.RowNumbers] = d.join(","),
            p[ri.PositionsInTopic] = f.join(","),
            p = p,
            e = function(r, o, i) {
                var a = {};
                r.forEach(function(e, n) {
                    var t = o[e];
                    null != t ? Object.entries(t).forEach(function(e) {
                        var t = e[0]
                          , e = e[1];
                        Wa.includes(t) || null == e || (a[t] || (a[t] = r.map(function() {
                            return ""
                        })),
                        a[t][n] = e.toString())
                    }) : Ba(Ta.BuildItemImpressionParamsMissingItem, "Item at index " + e + " is nil when sending impressions for collection " + i)
                });
                var n = {};
                return Object.entries(a).forEach(function(e) {
                    var t = e[0]
                      , e = e[1];
                    n[t + "_arr"] = e.join(",")
                }),
                n
            }(e, t, n.collectionId),
            p = za(za(za({}, e), n), p),
            P.eventStreamService.sendEvent({
                name: Qo.ItemImpressions,
                type: Qo.ItemImpressions,
                context: ei.Home
            }, li(za({}, p)))) : Ba(Ta.ReportItemImpressionsNoIndexesToSend, "No indexes to send for collection " + n.collectionId) : Ba(Ta.ReportItemImpressionsMissingData, "Missing collection " + JSON.stringify(n) + " or item " + JSON.stringify(t) + " data when sending impressions for collection " + (null !== (n = null == n ? void 0 : n.collectionId) && void 0 !== n ? n : "undefined"))
        }, qa = function() {
            return (qa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Ja = function(e, t, n) {
            var r = Ma(null !== (l = t.analyticsData) && void 0 !== l ? l : {}, null !== (s = t.ancestorAnalyticsData) && void 0 !== s ? s : {}, void 0)
              , o = null !== (u = null != n ? n : t.getCollectionData && t.getCollectionData()) && void 0 !== u ? u : null;
            o || Ba(Ta.ReportItemActionMissingCollectionData, "Collection data is missing when sending action " + JSON.stringify(e));
            var i, a, l, s, u, c = null != o ? o : Ha, n = (a = (i = r).itemPosition,
            l = c.contentType,
            s = c.collectionPosition,
            n = c.collectionId,
            t = c.totalNumberOfItems,
            u = e.actionType,
            i ? ((o = {})[ni.CollectionId] = n,
            o[ni.CollectionPosition] = s,
            o[ni.ContentType] = l,
            o[oi.TotalNumberOfItems] = t,
            o[oi.ItemId] = i.id,
            o[oi.ItemPosition] = a + 1,
            o[oi.PositionInTopic] = a + 1,
            o[oi.ActionType] = u,
            o) : (Ba(Ta.BuildBaseActionParamsMissingItem, "Item is nil when sending action for collection " + n),
            {})), n = qa(qa(qa(qa({}, r), c), La(e.actionParams)), n);
            P.eventStreamService.sendEvent({
                name: Qo.ItemAction,
                type: Qo.ItemAction,
                context: ei.Home
            }, li(qa({}, n)))
        }, $a = function() {
            return ($a = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Xa = function(e) {
            var r = e.componentConfig
              , t = e.analyticsContext
              , n = e.sduiContext
              , o = e.item
              , i = e.children
              , a = (0,
            X.useRef)(null)
              , l = (0,
            X.useRef)(null)
              , s = (0,
            X.useCallback)(function(e, t) {
                Ja(e, t, a.current)
            }, [a])
              , u = (0,
            X.useCallback)(function() {
                return a.current
            }, [a])
              , c = (0,
            X.useMemo)(function() {
                return $a($a({}, t), {
                    logAction: s,
                    getCollectionAnalyticsData: u
                })
            }, [t, s, u]);
            a.current = (0,
            X.useMemo)(function() {
                var e;
                return function(e, t, n, r, o) {
                    t = Ga(Ga({}, e), t),
                    r = Ga(Ga({}, t), {
                        collectionId: ka(t.collectionId, Ha.collectionId),
                        collectionPosition: ka(t.collectionPosition, -1),
                        contentType: Aa(t.contentType, Ha.contentType),
                        itemsPerRow: r,
                        totalNumberOfItems: o
                    });
                    return void 0 === (o = r).collectionId || o.collectionId < 0 || void 0 === o.contentType || void 0 === o.itemsPerRow || o.itemsPerRow < 0 || void 0 === o.collectionPosition || o.collectionPosition < 0 || void 0 === o.totalNumberOfItems || o.totalNumberOfItems < 0 ? (Ba(Ta.AnalyticsBuilderInvalidCollectionAnalyticsData, "Collection analytics data for component type " + n + " is invalid: " + JSON.stringify(r)),
                    Ga(Ga({}, Ha), r)) : r
                }(null !== (e = c.ancestorAnalyticsData) && void 0 !== e ? e : {}, null !== (e = c.analyticsData) && void 0 !== e ? e : {}, r.componentType, 1, 1)
            }, [c.ancestorAnalyticsData, c.analyticsData, r.componentType]);
            var d = (0,
            X.useCallback)(function(e) {
                var t, n;
                o ? (a.current && ("Game" !== (n = a.current.contentType) && "HeroUnit" !== n || null !== (t = l.current) && void 0 !== t && t.universeId && ((n = {})[R.RootPlaceIds] = [ka(null === (t = l.current) || void 0 === t ? void 0 : t.placeId, -1)],
                n[R.UniverseIds] = [ka(null === (t = l.current) || void 0 === t ? void 0 : t.universeId, -1)],
                n[R.AdsPositions] = [!0 === Oa(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AdFlags] = [!0 === Oa(null === (t = l.current) || void 0 === t ? void 0 : t.adFlag, !1) ? 1 : 0],
                n[R.AbsPositions] = [0],
                n[R.SortPos] = null !== (t = null === (t = a.current) || void 0 === t ? void 0 : t.collectionPosition) && void 0 !== t ? t : -1,
                n[R.GameSetTypeId] = null === (t = a.current) || void 0 === t ? void 0 : t.collectionId,
                n[R.Page] = K.HomePage,
                n[R.ComponentType] = "HeroUnit",
                n[F.HomePageSessionInfo] = Aa(null === (t = a.current) || void 0 === t ? void 0 : t[ti.HomePageSessionInfo], ""),
                n = n,
                n = Q.gameImpressions(n),
                P.eventStreamService.sendEvent.apply(P.eventStreamService, n))),
                Va(e, [l.current], a.current)) : Ba(Ta.SingleItemCollectionItemImpressedButMissing, "SingleItemCollection onItemImpressed missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r))
            }, [o, r, a, l])
              , f = (0,
            X.useRef)(null);
            Zo(f, 1, d);
            e = (0,
            X.useMemo)(function() {
                var e;
                if (!o)
                    return Ba(Ta.SingleItemCollectionMissingItem, "SingleItemCollection missing item " + JSON.stringify(o) + " with config " + JSON.stringify(r)),
                    Y().createElement(Y().Fragment, null);
                var t = {
                    itemPosition: 0
                };
                return l.current = Ma(null !== (e = o.analyticsData) && void 0 !== e ? e : {}, null !== (e = a.current) && void 0 !== e ? e : {}, t),
                Y().createElement(Fl, {
                    componentConfig: o,
                    parentAnalyticsContext: c,
                    sduiContext: n,
                    localAnalyticsData: t
                })
            }, [o, r, c, a, n]),
            d = (0,
            X.useMemo)(function() {
                return Y().Children.map(i, function(e, t) {
                    if (!Y().isValidElement(e))
                        return Ba("SingleItemCollectionChildNotReactElement", "SingleItemCollectionChildNotReactElement " + JSON.stringify(r) + " child " + JSON.stringify(e) + " is not a valid React element"),
                        e;
                    t = r.componentType + "-child-" + t;
                    return Y().cloneElement(e, $a($a({}, e.props), {
                        key: t,
                        parentAnalyticsContext: c
                    }))
                })
            }, [i, c, r]);
            return Y().createElement("div", {
                ref: f
            }, e, d)
        }, $n = function(e) {
            var t = e.componentConfig
              , n = e.analyticsContext
              , r = e.sduiContext
              , e = e.feedItems;
            return e ? Y().createElement("div", null, e.map(function(e, t) {
                return Y().createElement(Fl, {
                    key: e.componentType + "--" + t,
                    componentConfig: e,
                    parentAnalyticsContext: n,
                    sduiContext: r
                })
            })) : (Ba(Ta.VerticalFeedMissingFeedItems, "SCI missing feedItems " + JSON.stringify(e) + " with config " + JSON.stringify(t)),
            Y().createElement(Y().Fragment, null))
        }, Ii = function(e) {
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
            X.useMemo)(function() {
                return d ? Y().createElement(ar, {
                    title: d.title,
                    subtitle: d.subtitle,
                    leftAssetComponent: d.image,
                    rightButtonComponent: f
                }) : Y().createElement(Y().Fragment, null)
            }, [d, f])
              , g = (0,
            X.useMemo)(function() {
                return c ? Y().createElement(lr, {
                    pillText: c
                }) : Y().createElement(Y().Fragment, null)
            }, [c])
              , y = (0,
            X.useMemo)(function() {
                return void 0 !== i ? i : 0 === o.degree || 180 === o.degree ? 1 : .5
            }, [i, o])
              , b = (0,
            X.useMemo)(function() {
                return void 0 !== a ? a : 0 === o.degree || 180 === o.degree ? .5 : 1
            }, [a, o]);
            return (0,
            X.useMemo)(function() {
                return Y().createElement(ir, {
                    title: t,
                    subtitle: n,
                    foregroundImageComponent: l,
                    backgroundImageComponent: s,
                    gradient: o,
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
        }, Ya = function() {
            return (Ya = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, at = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.placeId
              , r = ka(n, -1);
            if (r && -1 !== r) {
                var o = (o = t,
                t = La(null !== (e = null == (t = e) ? void 0 : t.actionParams) && void 0 !== e ? e : {}),
                e = ka(null !== (e = t.placeId) && void 0 !== e ? e : Da("placeId", o, -1), -1),
                t = ka(null !== (t = t.universeId) && void 0 !== t ? t : Da("universeId", o, -1), -1),
                o = Fa(o),
                Ya(Ya({}, o), ((o = {})[R.PlaceId] = e,
                o[R.UniverseId] = t,
                o)));
                return {
                    callback: void 0,
                    linkPath: v(r, "", o)
                }
            }
            return Ba(Ta.SduiActionOpenGameDetailsInvalidId, "Invalid id " + JSON.stringify(n) + " to open game details"),
            {
                callback: void 0,
                linkPath: void 0
            }
        }, Ka = function(e, t) {
            var n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionName
              , r = Aa(n, "");
            if (!r)
                return Ba(Ta.SduiActionOpenSeeAllInvalidCollectionName, "Invalid collection name " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            n = null === (o = null == e ? void 0 : e.actionParams) || void 0 === o ? void 0 : o.collectionId,
            e = ka(n, -1);
            if (!e || -1 === e)
                return Ba(Ta.SduiActionOpenSeeAllInvalidCollectionId, "Invalid collection id " + JSON.stringify(n) + " to open see all"),
                {
                    callback: void 0,
                    linkPath: void 0
                };
            var o, n = (o = e,
            e = ka(Da("collectionPosition", n = t, -1), -1),
            null !== (t = null == (t = null != n && n.getCollectionData ? n.getCollectionData() : void 0) ? void 0 : t.collectionId) && void 0 !== t || ka(Da("collectionId", n, -1), -1),
            t = Aa(Da(ti.HomePageSessionInfo, n, ""), ""),
            (n = {})[R.Position] = e,
            n[R.SortId] = o,
            n[R.GameSetTypeId] = o,
            n[R.Page] = K.HomePage,
            n[F.HomePageSessionInfo] = t,
            n);
            return {
                callback: void 0,
                linkPath: O(r, n[R.Page], n)
            }
        };
        function Za(e) {
            var t = e.assetId
              , n = (o = (0,
            X.useState)(""))[0]
              , r = o[1]
              , o = (e = (0,
            X.useState)(!0))[0]
              , i = e[1];
            return (0,
            X.useEffect)(function() {
                i(!0),
                Be(t).then(function(e) {
                    r(null !== (e = null === (e = null == e ? void 0 : e.locations[0]) || void 0 === e ? void 0 : e.location) && void 0 !== e ? e : "")
                }).catch(function() {
                    r("")
                }).finally(function() {
                    i(!1)
                })
            }, [t]),
            o ? Y().createElement(ge.Loading, null) : n ? Y().createElement("img", {
                src: n,
                alt: "asset"
            }) : (Ba(Ta.AssetImageMissingAssetUrl, "AssetImage missing asset url for assetId " + t),
            Y().createElement("img", {
                src: "",
                alt: "asset"
            }))
        }
        function Qa(e) {
            var t = e.thumbnailType
              , n = e.targetId
              , r = e.format
              , e = e.size;
            return Y().createElement(Ve.Thumbnail2d, {
                containerClass: "sdui-thumbnail-image-container",
                type: t,
                targetId: n,
                format: r,
                size: e
            })
        }
        (fr = Ua = Ua || {}).OpenGameDetails = "OpenGameDetails",
        fr.OpenSeeAll = "OpenSeeAll",
        fr.PlayButtonClick = "PlayButtonClick";
        var el, tl = ((El = {})[Ua.OpenGameDetails] = at,
        El[Ua.OpenSeeAll] = Ka,
        El[Ua.PlayButtonClick] = function() {
            return {
                callback: void 0,
                linkPath: void 0
            }
        }
        ,
        El);
        function nl(e, t) {
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
                Ba(Ta.ServerDrivenFeedItemMissingItem, "SDUI feed items " + JSON.stringify(n) + " missing matching feed item with key " + t)
            } else
                Ba(Ta.ServerDrivenFeedItemMissingFeedOrFeedItems, "SDUI missing feed items, root is " + JSON.stringify(e))
        }
        function rl(e) {
            return !!(e && "object" == typeof e && e.componentType && Al(e.componentType))
        }
        function ol(i, a, l) {
            if (!function(e) {
                if (e && "object" == typeof e && (e.actionType && e.actionParams && tl[e.actionType]))
                    return !0;
                return !1
            }(i))
                return Ba(Ta.SduiParseCallbackInvalidConfig, "Invalid action config " + JSON.stringify(i) + " to parse callback"),
                {
                    onActivated: function() {},
                    linkPath: void 0
                };
            var s = (0,
            tl[i.actionType])(i, a, l);
            return {
                onActivated: function() {
                    return e = s,
                    t = i,
                    r = l,
                    (o = (n = a).logAction) ? o(t, n) : Ja(t, n, null),
                    void (e.callback && e.callback(t, n, r));
                    var e, t, n, r, o
                },
                linkPath: s.linkPath
            }
        }
        function il(e) {
            if ("string" != typeof e)
                return Ba(Ta.SduiParseAssetUrlInvalidInput, "Invalid asset url input " + JSON.stringify(e) + ". Input must be a string."),
                {
                    assetType: void 0,
                    assetTarget: "0"
                };
            var t = e.split("//");
            if (2 === t.length && (e.includes(el.RbxAsset) || e.includes(el.RbxThumb))) {
                if (t[0].includes(el.RbxAsset))
                    return {
                        assetType: el.RbxAsset,
                        assetTarget: t[1]
                    };
                if (t[0].includes(el.RbxThumb))
                    return {
                        assetType: el.RbxThumb,
                        assetTarget: t[1]
                    }
            }
            return Ba(Ta.SduiParseAssetUrlInvalidFormat, "Invalid asset url format " + e),
            {
                assetType: void 0,
                assetTarget: "0"
            }
        }
        function al(e) {
            if ("string" != typeof e)
                return Y().createElement(Y().Fragment, null);
            var t, n, r = il(e), o = r.assetType, i = r.assetTarget;
            if (o === el.RbxAsset) {
                var a = i;
                return Y().createElement(Za, {
                    assetId: a
                })
            }
            if (o !== el.RbxThumb)
                return Ba(Ta.SduiParseAssetUrlIntoComponentInvalidAssetType, "Invalid asset type " + JSON.stringify(o) + ". Only RbxThumb and RbxAsset are supported."),
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
            return void 0 === (a = r.id) || void 0 === o || void 0 === i || void 0 === l ? (Ba(Ta.SduiParseAssetUrlIntoComponentInvalidRbxThumb, "Invalid rbxthumb url " + JSON.stringify(e) + ". At least one of thumbnailType " + (null != o ? o : "undefined") + " id " + (null != a ? a : "undefined") + ", w " + (null != i ? i : "undefined") + ", or h " + (null != l ? l : "undefined") + " is invalid"),
            Y().createElement(Y().Fragment, null)) : (t = i + "x" + l,
            void 0 !== (e = null === (e = yl[e = o]) || void 0 === e ? void 0 : e.find(function(e) {
                return e === t
            })) ? Y().createElement(Qa, {
                thumbnailType: o,
                targetId: a,
                format: Ve.ThumbnailFormat.webp,
                size: e
            }) : (Ba(Ta.SduiParseAssetUrlIntoComponentNoSupportedThumbSizeForType, "No supported thumbnail size " + i + "x" + l + " for type " + o),
            Y().createElement(Y().Fragment, null)))
        }
        function ll(e, t) {
            if (t)
                if ("string" == typeof e) {
                    for (var n = e.split("."), r = t, o = 0; o < n.length; ++o) {
                        var i = n[o];
                        if (null == r || "object" != typeof r || Array.isArray(r))
                            return void Ba(Ta.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". Token path step " + i + " is invalid. Token is " + JSON.stringify(r));
                        r = r[i]
                    }
                    if (null != r)
                        return r;
                    Ba(Ta.SduiParseFoundationTokenInvalidInputPath, "Invalid token path " + e + ". The final token " + (r ? JSON.stringify(r) : "undefined") + " is invalid.")
                } else
                    Ba(Ta.SduiParseFoundationTokenInvalidInput, "Invalid input " + JSON.stringify(e) + " for foundation token. Input must be a string.");
            else
                Ba(Ta.SduiParseFoundationTokenMissingTokens, "Missing tokens in parseFoundationTokenHelper for input " + JSON.stringify(e))
        }
        function sl(e) {
            return !(!e || "object" != typeof e)
        }
        function ul(e) {
            return "string" == typeof e && /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(e)
        }
        function cl(e) {
            return "string" == typeof e && /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/.test(e)
        }
        function dl(e, t, n) {
            return ul(e) || cl(e) ? e : (n = function(e, t) {
                t = ll(e, t.dependencies.tokens);
                if (void 0 !== t && "string" == typeof t)
                    return t;
                Ba(Ta.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof t + ". Expected string.")
            }(e, n)) && (ul(n) || cl(n)) ? n : void Ba(Ta.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected color string.")
        }
        function fl(e) {
            return !(!e || "object" != typeof e || void 0 === e.xScale || "number" != typeof e.xScale || void 0 === e.xOffset || "number" != typeof e.xOffset || void 0 === e.yScale || "number" != typeof e.yScale || void 0 === e.yOffset || "number" != typeof e.yOffset)
        }
        function pl(e) {
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
        function ml(e) {
            return !(!e || "object" != typeof e || void 0 === e.x || "number" != typeof e.x || void 0 === e.y || "number" != typeof e.y)
        }
        function vl(e) {
            if (e && Array.isArray(e) && 2 === e.length) {
                e = e.map(Number);
                return {
                    x: e[0],
                    y: e[1]
                }
            }
        }
        (pr = el = el || {}).RbxAsset = "rbxassetid",
        pr.RbxThumb = "rbxthumb";
        var hl = function() {
            return (hl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , gl = {
            startColor: "#000000",
            endColor: "#000000",
            startOpacity: 0,
            endOpacity: 1,
            degree: 270
        }
          , yl = ((Qe = {})[Ve.ThumbnailTypes.gameIcon] = Object.values(Ve.ThumbnailGameIconSize),
        Qe[Ve.ThumbnailTypes.gameThumbnail] = Object.values(Ve.ThumbnailGameThumbnailSize),
        Qe[Ve.ThumbnailTypes.assetThumbnail] = Object.values(Ve.ThumbnailAssetsSize),
        Qe)
          , bl = {
            "icons/status/games/rating_small": "icon-rating-16x16",
            "icons/status/games/people-playing_small": "icon-current-players-16x16",
            "icons/navigation/pushRight_small": "icon-push-right-16x16"
        }
          , et = {
            parseUiComponent: function(e, t, n) {
                return rl(e) ? Y().createElement(Fl, {
                    componentConfig: e,
                    parentAnalyticsContext: t,
                    sduiContext: n
                }) : (Ba(Ta.SduiParseUiComponentInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to parse UI component"),
                Y().createElement(Y().Fragment, null))
            },
            parseCallback: ol,
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
                var t = al(e.image);
                return hl(hl({}, e), {
                    image: t
                })
            },
            parseAssetUrl: il,
            parseAssetUrlIntoComponent: al,
            parseGradient: function(e) {
                if (!(t = e) || "object" != typeof t || (!t.startColor || "string" != typeof t.startColor || !t.endColor || "string" != typeof t.endColor || void 0 === t.startOpacity || "number" != typeof t.startOpacity || void 0 === t.endOpacity || "number" != typeof t.endOpacity || void 0 === t.degree || "number" != typeof t.degree))
                    return Ba(Ta.SduiParseGradientInvalidConfig, "Invalid gradient config " + JSON.stringify(e)),
                    gl;
                var t = hl({}, e);
                return e.startColor.startsWith("#") || (t.startColor = "#" + e.startColor),
                e.endColor.startsWith("#") || (t.endColor = "#" + e.endColor),
                t
            },
            parseFoundationNumberToken: function(e, t, n) {
                if ("number" == typeof e)
                    return e;
                n = ll(e, n.dependencies.tokens);
                if (void 0 !== n && "number" == typeof n)
                    return n;
                Ba(Ta.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + " for token " + JSON.stringify(n) + " with input " + JSON.stringify(e) + ". Expected number.")
            },
            parseFoundationTypographyToken: function(e, t, n) {
                if (sl(e))
                    return e;
                n = ll(e, n.dependencies.tokens);
                if (void 0 !== n && sl(n))
                    return n;
                Ba(Ta.SduiParseFoundationTokenInvalidOutputType, "Invalid output type " + typeof n + ". Expected TypographyToken.")
            },
            parseColorValue: function(e, t, n) {
                if ("string" == typeof (r = e) && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(r))
                    return e;
                var r;
                if ("string" == typeof (r = e) && /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(r))
                    return "#" + e;
                n = dl(e, 0, n);
                if (n)
                    return n;
                Ba(Ta.SduiParseColorValueInvalidInput, "Invalid input " + JSON.stringify(e) + " for color value. Input must be a hex color or a foundation color token.")
            },
            parseUDim2: function(e) {
                if (fl(e))
                    return e;
                var t = pl(e);
                if (fl(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = pl(t);
                    if (fl(t))
                        return t;
                    Ba(Ta.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string with 4 comma-separated values.")
                } else
                    Ba(Ta.SduiParseUDim2InvalidInput, "Invalid input " + JSON.stringify(e) + " for uDim2. Input must be a string.")
            },
            parseVector2: function(e) {
                if (ml(e))
                    return e;
                var t = vl(e);
                if (ml(t))
                    return t;
                if (e && "string" == typeof e) {
                    t = e.split(","),
                    t = vl(t);
                    if (ml(t))
                        return t;
                    Ba(Ta.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string with 2 comma-separated values.")
                } else
                    Ba(Ta.SduiParseVector2InvalidInput, "Invalid input " + JSON.stringify(e) + " for vector2. Input must be a string.")
            },
            parseAutomaticSize: function(e) {
                if (e && "string" == typeof e)
                    switch (e) {
                    case wr.X:
                        return wr.X;
                    case wr.Y:
                        return wr.Y;
                    case wr.XY:
                        return wr.XY;
                    case wr.None:
                        return wr.None;
                    default:
                        return void Ba(Ta.SduiParseAutomaticSizeInvalidInput, "Invalid automatic size " + JSON.stringify(e) + ". Expected one of " + Object.values(wr).join(", ") + ".")
                    }
                else
                    Ba(Ta.SduiParseAutomaticSizeInvalidInput, "Invalid input " + JSON.stringify(e) + " for automatic size. Input must be a string.")
            },
            parseIcon: function(e) {
                if ("string" == typeof e) {
                    if (bl[e])
                        return he()("sdui-icon", bl[e]);
                    Ba(Ta.SduiParseIconInvalidInput, "Invalid icon " + JSON.stringify(e) + ". Expected one of " + Object.keys(bl).join(", ") + ".")
                } else
                    Ba(Ta.SduiParseIconInvalidInput, "Invalid input " + JSON.stringify(e) + " for icon. Input must be a string.")
            }
        }
          , Il = function() {
            return (Il = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Sl(e, t, n, r, o, i) {
            if (!rl(e))
                return Ba(Ta.SduiComponentBuildPropsAndChildrenInvalidConfig, "Invalid component config " + JSON.stringify(e) + " to build React props and children"),
                {
                    props: {},
                    children: null
                };
            var a, l, s, u = e.componentType, c = (a = t,
            c = r,
            r = (t = e).analyticsData,
            t = Tl(Tl({}, r), null != c ? c : {}),
            r = a.logAction,
            c = a.getCollectionData,
            {
                analyticsData: t,
                ancestorAnalyticsData: Tl(Tl({}, a.ancestorAnalyticsData), a.analyticsData),
                logAction: r,
                getCollectionData: c
            }), i = Tl(Tl(Tl(Tl({}, e.props), {
                componentConfig: e,
                sduiContext: n,
                analyticsContext: c
            }), o), i);
            return {
                props: xl(u, i, c, n),
                children: (l = c,
                s = n,
                (e = e).children ? e.children.map(function(e, t) {
                    t = e.componentType + "-" + t;
                    return Y().createElement(Fl, {
                        key: t,
                        componentConfig: e,
                        parentAnalyticsContext: l,
                        sduiContext: s
                    })
                }) : null)
            }
        }
        (Ul = function(e) {
            var n = e.analyticsContext
              , t = e.sduiContext
              , r = e.universeId
              , o = e.placeId
              , i = e.width
              , a = e.playableText
              , l = e.hidePlayableIcon
              , s = x.PlayButton.usePlayabilityStatus
              , u = x.PlayButton.PlayabilityStatuses
              , c = x.PlayButton.PlayButton
              , d = s(r.toString())[0]
              , e = (0,
            X.useCallback)(function() {
                var e = {
                    actionType: Ua.PlayButtonClick,
                    actionParams: {}
                };
                ol(e, n, t).onActivated()
            }, [n, t])
              , s = (0,
            X.useMemo)(function() {
                var e, t = Fa(n);
                return Il(Il({}, t), ((e = {})[R.IsAd] = (null !== (t = t[R.IsAd]) && void 0 !== t && t).toString(),
                e[R.PlaceId] = ka(o, -1),
                e[R.UniverseId] = ka(r, -1),
                e[R.PlayContext] = K.HomePage,
                e))
            }, [n, o, r]);
            return void 0 === d || d !== u.Playable ? Y().createElement(Y().Fragment, null) : Y().createElement("div", {
                className: "sdui-play-button-container",
                "data-testid": "sdui-play-button-container",
                style: i ? {
                    width: i + "px"
                } : {}
            }, Y().createElement(c, {
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
        var wl, Cl = Ul, fr = function(e) {
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
            X.useMemo)(function() {
                return {
                    layoutOrder: t,
                    anchorPoint: n,
                    automaticSize: r,
                    size: o,
                    position: i,
                    zIndex: a
                }
            }, [t, n, r, o, i, a]);
            return Y().createElement(Nr, {
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
        }, at = function(e) {
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
            return Y().createElement(Ar, {
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
        }, Ka = function(e) {
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
            return Y().createElement(Ur, {
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
                isOnScreen: null != e && e
            })
        }, El = function(e) {
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
              , w = e.subtitleComponent
              , C = e.verticalGap
              , E = e.infoText
              , P = e.onInfoIconActivated
              , x = e.iconComponent
              , T = e.sduiContext.dependencies.tokens
              , _ = (0,
            X.useMemo)(function() {
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
            X.useMemo)(function() {
                return x || (E ? Y().createElement(or, {
                    callback: null == P ? void 0 : P.onActivated,
                    linkPath: null == P ? void 0 : P.linkPath,
                    ariaLabel: E
                }, Y().createElement(St, {
                    tooltipText: E,
                    placement: "left"
                })) : void 0)
            }, [x, E, P]);
            return Y().createElement(Br, {
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
                subtitleComponent: w,
                verticalGap: null != C ? C : T.Gap.XXSmall,
                iconComponent: e,
                containerOverrides: _
            })
        }, pr = function(e) {
            var n = e.sduiContext
              , r = e.analyticsContext
              , o = e.componentConfig
              , t = e.items
              , i = e.collectionItemSize
              , a = e.layoutOverrides
              , l = e.headerComponent
              , s = e.children
              , u = e.scrollThresholdFromEnd
              , c = e.onScrollToEnd
              , d = n.dependencies.tokens
              , e = (0,
            X.useCallback)(function(e, t) {
                return e ? Y().createElement(Fl, {
                    componentConfig: e,
                    parentAnalyticsContext: r,
                    sduiContext: n,
                    extraLocalProps: {
                        isOnScreen: t
                    }
                }) : (Ba(Ta.CollectionCarouselMissingItem, "CollectionCarousel with config " + JSON.stringify(o) + " trying to render item " + JSON.stringify(e) + " that is missing"),
                Y().createElement(Y().Fragment, null))
            }, [r, n, o]);
            return Y().createElement("div", null, Y().createElement(Ir, {
                items: t,
                renderItem: e,
                collectionItemSize: i,
                headerComponent: l,
                layoutOverrides: a,
                gapBetweenHeaderAndItems: d.Gap.Large,
                isHorizontalScrollEnabled: !0,
                scrollArrowBackgroundColor: d.Color.Surface.Surface_100,
                scrollArrowBoxShadowColor: d.Color.Common.Shadow,
                thresholdFromEnd: u,
                onReachedThresholdFromEnd: c
            }), s)
        }, Pl = function() {
            return (Pl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, xl = function(o, i, a, l, e) {
            var t = Nl[o]
              , s = Pl({}, i)
              , u = null != e ? e : null == t ? void 0 : t.propParsers;
            return u && Object.keys(i).forEach(function(e) {
                var t, n = i[e], r = u[e];
                void 0 !== n && r && ("function" == typeof r ? void 0 !== (t = r(n, a, l)) ? s[e] = t : Ba(Ta.PropParseFailure, "Failed to parse prop " + e + " with value " + JSON.stringify(n) + " for component " + o) : "object" == typeof r ? "object" == typeof (t = n) && null !== t && Object.keys(t).every(function(e) {
                    return "string" == typeof e
                }) ? s[e] = xl(o, n, a, l, r) : Ba(Ta.NestedPropParseFailure, "Expected a nested object for prop " + e + " with value " + JSON.stringify(n) + " using for component " + o) : Ba(Ta.PropParserNotFound, "Prop parser not found for prop " + e + " and component " + o))
            }),
            s
        }, Tl = function() {
            return (Tl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Qe = function(r) {
            var e = Y().memo(function(n) {
                return (0,
                X.useMemo)(function() {
                    var e = Sl(n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides)
                      , t = e.props
                      , e = e.children;
                    return Y().createElement(r, t, e)
                }, [n.componentConfig, n.parentAnalyticsContext, n.sduiContext, n.localAnalyticsData, n.extraLocalProps, n.responsivePropOverrides])
            });
            return e.displayName = "SduiWrapped" + (r.displayName || r.name),
            e
        };
        (Ul = wl = wl || {}).SingleItemCollection = "SingleItemCollection",
        Ul.VerticalFeed = "VerticalFeed",
        Ul.HeroUnit = "HeroUnit",
        Ul.PlayButton = "PlayButton",
        Ul.TextIconRow = "TextIconRow",
        Ul.TileFooter = "TileFooter",
        Ul.Tile = "Tile",
        Ul.SectionHeader = "SectionHeader",
        Ul.CollectionCarousel = "CollectionCarousel";
        var _l, Nl = ((Ul = {})[wl.SingleItemCollection] = {
            component: Qe(Xa),
            propParsers: {}
        },
        Ul[wl.VerticalFeed] = {
            component: Qe($n),
            propParsers: {}
        },
        Ul[wl.PlayButton] = {
            component: Qe(Cl),
            propParsers: {}
        },
        Ul[wl.HeroUnit] = {
            component: Qe(Ii),
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
        Ul[wl.TextIconRow] = {
            component: Qe(fr),
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
        Ul[wl.TileFooter] = {
            component: Qe(at),
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
        Ul[wl.Tile] = {
            component: Qe(Ka),
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
        Ul[wl.SectionHeader] = {
            component: Qe(El),
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
        Ul[wl.CollectionCarousel] = {
            component: Qe(pr),
            propParsers: {
                layoutOverrides: {
                    columnGap: et.parseFoundationNumberToken,
                    sideMargin: et.parseFoundationNumberToken
                },
                onScrollToEnd: et.parseCallback,
                headerComponent: et.parseUiComponent
            }
        },
        Ul), Al = function(e) {
            return Nl[e] ? Nl[e].component : null
        };
        function kl(e) {
            var t = e.wrappedComponent
              , n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps
              , l = (e = (0,
            X.useState)(window.innerWidth))[0]
              , s = e[1];
            return (0,
            X.useEffect)(function() {
                function e() {
                    s(window.innerWidth)
                }
                return window.addEventListener("resize", e),
                function() {
                    window.removeEventListener("resize", e)
                }
            }, []),
            e = (0,
            X.useMemo)(function() {
                return Ml(n.responsiveProps, l)
            }, [n, l]),
            Y().createElement(t, {
                componentConfig: n,
                parentAnalyticsContext: r,
                sduiContext: o,
                localAnalyticsData: i,
                extraLocalProps: a,
                responsivePropOverrides: e
            })
        }
        (et = _l = _l || {}).ImageQualityLevel = "imageQualityLevel",
        et.MaxWidth = "maxWidth";
        var Ol, Rl, Ll = {
            low: 1,
            Low: 1,
            medium: 2,
            Medium: 2,
            high: 3,
            High: 3
        }, Dl = Ll.High, Ml = function(e, o) {
            if (!e)
                return {};
            e = e.find(function(e) {
                e = e.conditions;
                return !e || Object.entries(e).every(function(e) {
                    var t = e[0]
                      , n = e[1];
                    switch (t) {
                    case _l.ImageQualityLevel:
                        if (!Ra(n))
                            return Ba(Ta.InvalidImageQualityLevelConditionValue, "Invalid image quality level value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        var r = Ll[Aa(n, "")];
                        return void 0 === r ? (Ba(Ta.UnknownImageQualityLevelConditionValue, "Unknown image quality level: " + n.toString()),
                        !1) : Dl === r;
                    case _l.MaxWidth:
                        if (!Ra(n))
                            return Ba(Ta.InvalidMaxWidthConditionValue, "Invalid max width condition value: " + (n ? JSON.stringify(n) : "undefined")),
                            !1;
                        r = ka(n, -1);
                        return r < 0 ? (Ba(Ta.InvalidParsedMaxWidthConditionValue, "Cannot parse max width value: " + n.toString()),
                        !1) : o <= r;
                    default:
                        return Ba("UnknownResponsivePropConditionKey", "Unknown responsive prop condition key: " + t),
                        !1
                    }
                })
            });
            return e ? e.overrides : {}
        }, Fl = function(e) {
            var n = e.componentConfig
              , r = e.parentAnalyticsContext
              , o = e.sduiContext
              , i = e.localAnalyticsData
              , a = e.extraLocalProps;
            return (0,
            X.useMemo)(function() {
                var e = n.componentType
                  , t = Al(e);
                return t ? n.responsiveProps ? Y().createElement(kl, {
                    wrappedComponent: t,
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i,
                    extraLocalProps: a
                }) : Y().createElement(t, {
                    componentConfig: n,
                    parentAnalyticsContext: r,
                    sduiContext: o,
                    localAnalyticsData: i,
                    extraLocalProps: a
                }) : (Ba(Ta.ComponentNotFound, "Component not found for type " + e + " using config " + JSON.stringify(n)),
                Y().createElement(Y().Fragment, null))
            }, [n, r, o, i, a])
        }, Ul = (Ol = function(e, t) {
            return (Ol = Object.setPrototypeOf || {
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
            Ol(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        function Bl(e) {
            e = Rl.call(this, e) || this;
            return e.state = {
                hasError: !1
            },
            e
        }
        function Gl(e) {
            var n = e.sort
              , r = e.sduiRoot
              , o = e.currentPage
              , i = dn()
              , a = Hl()
              , t = (0,
            X.useMemo)(function() {
                var e = nl(r, n.feedItemKey);
                if (!e)
                    return Y().createElement(Y().Fragment, null);
                var t = zl({}, function(e, t) {
                    var n;
                    switch (t) {
                    case K.HomePage:
                        return (n = {})[ti.HomePageSessionInfo] = e,
                        n;
                    case K.GamesPage:
                        return (n = {})[ti.DiscoverPageSessionInfo] = e,
                        n;
                    default:
                        return Ba(Ta.InvalidPageForSessionAnalytics, "Invalid page context for session analytics: " + (t ? JSON.stringify(t) : "undefined") + " with session info: " + e),
                        {}
                    }
                }(i, o));
                return Y().createElement("div", {
                    className: "sdui-feed-item-container"
                }, Y().createElement(Fl, {
                    componentConfig: e,
                    parentAnalyticsContext: {},
                    localAnalyticsData: t,
                    sduiContext: a
                }))
            }, [n, r, i, o, a])
              , e = (0,
            X.useCallback)(function(e, t) {
                Ba(Ta.SduiFeedItemBoundaryError, "Error rendering feed item for sort " + JSON.stringify(n) + " and sdui root " + JSON.stringify(r) + " with error message " + e + " and callstack " + t)
            }, [n, r]);
            return Y().createElement(jl, {
                fallback: Y().createElement(Y().Fragment, null),
                logError: e
            }, t)
        }
        var jl = (Rl = Y().Component,
        Ul(Bl, Rl),
        Bl.getDerivedStateFromError = function() {
            return {
                hasError: !0
            }
        }
        ,
        Bl.prototype.componentDidCatch = function(e, t) {
            e = e.message,
            t = t.componentStack;
            (0,
            this.props.logError)(e, t)
        }
        ,
        Bl.prototype.render = function() {
            var e = this.state.hasError
              , t = this.props
              , n = t.fallback
              , t = t.children;
            return e ? n : t
        }
        ,
        Bl)
          , Hl = function() {
            var e = (0,
            p.useTokens)()
              , t = (0,
            X.useMemo)(function() {
                return {
                    tokens: e
                }
            }, [e]);
            return (0,
            X.useMemo)(function() {
                return {
                    dependencies: t
                }
            }, [t])
        }
          , zl = function() {
            return (zl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        function Wl() {
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
        function Vl(o) {
            var i = dn();
            (0,
            X.useEffect)(function() {
                var t = window.scrollY
                  , e = be(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    Jr({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: y.Vertical,
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
        (et = function(e) {
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
            case C.Carousel:
                return Y().createElement(Ao, {
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
            case C.AvatarCarousel:
                return Y().createElement(_o, {
                    sort: n
                });
            case C.SortlessGrid:
                return Y().createElement(qo, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: i,
                    startingRow: a,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c,
                    isNewSortHeaderEnabled: m
                });
            case C.FriendCarousel:
                return Y().createElement(ba, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case C.Pills:
                return Y().createElement(_a, {
                    sort: n,
                    positionId: r,
                    translate: t,
                    fetchGamesPageData: h
                });
            case C.Sdui:
                return Y().createElement(Gl, {
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
        var ql = et
          , Jl = function(e, o, r) {
            var t = (0,
            X.useState)(new Map)
              , i = t[0]
              , n = t[1]
              , t = (0,
            X.useState)(new Map)
              , s = t[0]
              , a = t[1]
              , l = (0,
            p.usePrevious)(s)
              , u = (0,
            p.usePrevious)(null == e ? void 0 : e.sorts);
            (0,
            X.useEffect)(function() {
                void 0 !== l && (0,
                Jo.isEqual)(s, l) && (0,
                Jo.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
                    var i = new Map
                      , a = new Map;
                    null != e && e.sorts.forEach(function(e) {
                        var t;
                        e.treatmentType === C.SortlessGrid && ((t = null !== (t = i.get(e.topicId)) && void 0 !== t ? t : []).push.apply(t, e.recommendationList),
                        i.set(e.topicId, t))
                    });
                    var l = new Map;
                    null != e && e.sorts.forEach(function(e, t) {
                        var n, r, o;
                        e.treatmentType === C.SortlessGrid && (n = null !== (r = i.get(e.topicId)) && void 0 !== r ? r : [],
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
            X.useMemo)(function() {
                var n = new Map
                  , r = 0;
                return null != e && e.sorts.forEach(function(e, t) {
                    r && n.set(t, r);
                    t = function(e, t) {
                        if (void 0 === e.numberOfRows)
                            return (0,
                            E.fireEvent)(qe.missingNumberOfRowsForLoggingErrorEvent),
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
            X.useRef)(null)
              , d = (0,
            X.useCallback)(function(e, t) {
                if (o || e.treatmentType === C.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, o, i) {
                        var a = n ? (r ? Et : Ct)[n] : Pt;
                        if (!e)
                            return a.minTilesPerRow;
                        var l = a.minTileWidth
                          , s = a.columnGap
                          , n = a.minTilesPerRow
                          , a = a.maxTilesPerRow
                          , s = Math.floor((e - t + s) / (l + s))
                          , s = Math.min(a, Math.max(n, s));
                        return r && o === C.Carousel && void 0 !== i && s < i ? s + .3 : s
                    }(t, 1, n, r || n === $.EventTile, null == e ? void 0 : e.treatmentType, null === (n = null == e ? void 0 : e.recommendationList) || void 0 === n ? void 0 : n.length)
                }
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === $.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === $.EventTile ? t && t < qe.wideGameTileTilesPerRowBreakpointWidth ? qe.minWideGameTilesPerCarouselPage : qe.maxWideGameTilesPerCarouselPage : t && t < qe.homeFeedMaxWidth ? Math.max(1, Math.floor(t / qe.gameTileWidth)) : qe.maxTilesPerCarouselPage
            }, [o, r])
              , f = (0,
            X.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === C.SortlessGrid || e.treatmentType === C.InterestGrid || o && e.treatmentType === C.Carousel) && r.set(t, d(e, n))
                }),
                a(r)
            }, [null == e ? void 0 : e.sorts, d, o]);
            return (0,
            X.useLayoutEffect)(function() {
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
          , $l = function() {
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
          , Ul = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , Xl = (x.EnvironmentUrls.apiGatewayUrl,
        x.EnvironmentUrls.voiceApi);
        function Yl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var Kl = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(Xl, "/v1/settings/user-opt-in")
                            },
                            o = {
                                isUserOptIn: t,
                                isOptedInThroughUpsell: n
                            },
                            e.next = 4,
                            k.httpService.post(r, o);
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
                        Yl(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Yl(r, t, n, o, i, "throw", e)
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
        function Zl(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ql(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function es(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ql(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : Ql(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function ts(e, n) {
            switch (e) {
            case "ContactMethodEmail":
                return {
                    primaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    }
                };
            case "ContactMethodPhoneNumber":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    }
                };
            case "ContactMethodPhoneNumberVoiceOptIn":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: function(e) {
                            return null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderPhoneUpsell(es({
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
                                                Kl(!0, !1);
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
                                            Zl(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            Zl(r, t, n, o, i, "throw", e)
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
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmail",
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: ss
                };
            case "ContactMethodPhoneNumberEmailVerticalLayout":
                return {
                    primaryButton: {
                        text: "Action.AddPhone",
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderPhoneUpsell,
                        buttonClickBtnLog: "phone"
                    },
                    secondaryButton: {
                        text: "Action.AddEmailAddress",
                        onClick: null === x.UpsellService || void 0 === x.UpsellService ? void 0 : x.UpsellService.renderEmailUpsell,
                        buttonClickBtnLog: "email"
                    },
                    buttonStackOrientation: ls
                };
            case "FacebookSunset":
                return {
                    primaryButton: {
                        text: "Action.SetPassword",
                        onClick: null === x.FacebookSunsetService || void 0 === x.FacebookSunsetService ? void 0 : x.FacebookSunsetService.openFacebookSunsetModal,
                        buttonClickBtnLog: "setPassword"
                    }
                };
            default:
                return null
            }
        }
        var ns = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , rs = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , os = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , is = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , as = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , ls = "vertical"
          , ss = "horizontal"
          , us = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function cs(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function ds(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? cs(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : cs(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function fs(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            P.eventStreamService.sendEventWithTarget(e.type, is[n], ds(ds({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var et = P.eventStreamService.eventTypes
          , ps = "mandatory"
          , ms = "homepage"
          , vs = {
            cardShown: {
                name: "cardShown",
                type: et.modalAction,
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
        function hs(e, t) {
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
                    return gs(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return gs(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function gs(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function ys(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = hs((0,
            X.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = as[n];
            (0,
            X.useEffect)(function() {
                fs(vs.cardShown, r, n, c)
            }, []);
            var e = ts(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? Y().createElement(ge.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    fs(vs.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , a = f ? Y().createElement(ge.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    fs(vs.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : ss
              , a = Y().createElement("div", {
                className: e === ss ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = bs(o) ? t(rs[n]) : o
              , i = bs(i) ? t(os[n]) : i
              , o = Y().createElement("div", {
                className: "upsell-card-text-content-group"
            }, rs[n] ? Y().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, Y().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = us[n] ? Y().createElement("div", {
                className: "home-page-upsell-card-image ".concat(us[n])
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
        function bs(e) {
            return !e || 0 === e.length
        }
        ys.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        ys.propTypes = {
            translate: re().func.isRequired,
            cardType: re().string.isRequired,
            titleTextOverride: re().string,
            bodyTextOverride: re().string,
            origin: re().string,
            requireExplicitVoiceConsent: re().bool
        };
        var Is = ys
          , Ss = function(e) {
            return !![ns.ContactMethodEmail, ns.ContactMethodPhoneNumber, ns.ContactMethodPhoneNumberEmailHorizontalLayout, ns.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, ns.ContactMethodPhoneNumberEmailVerticalLayout, ns.ContactMethodPhoneNumberVoiceOptIn, ns.FacebookSunset].includes(e)
        };
        function ws(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Cs(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        ws(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        ws(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function Es(e, t) {
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
                    return Ps(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Ps(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Ps(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function xs(e) {
            var t = e.translate
              , n = ns.ContactMethodMandatoryEmailPhone
              , r = Es((0,
            X.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = Es((0,
            X.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = Es((0,
            X.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = Es((0,
            X.useState)(!1), 2)
              , e = a[0]
              , c = a[1]
              , a = Es((0,
            X.useState)(!1), 2);
            a[0],
            a[1];
            return (0,
            X.useEffect)(function() {
                var e = function() {
                    var e = Cs(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    x.HomePageUpsellCardService.getHomePageUpsellCardVariation();
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
                    var e = Cs(regeneratorRuntime.mark(function e() {
                        var t;
                        return regeneratorRuntime.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0,
                                    e.next = 3,
                                    x.HomePageUpsellCardService.getVoicePolicy();
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
            X.useEffect)(function() {
                o === n && null !== x.UpsellService && void 0 !== x.UpsellService && x.UpsellService.renderContactMethodPromptModal({
                    origin: ms,
                    section: ps
                })
            }, [o]),
            Ss(o) ? Y().createElement(Is, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        xs.propTypes = {
            translate: re().func.isRequired
        };
        var Ts = xs;
        function _s(e) {
            var t = e.translate
              , e = e.context;
            return Y().createElement(Ts, {
                translate: t,
                context: e
            })
        }
        function Ns(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            X.useRef)(null), u = (0,
            X.useRef)(null), c = So().contentMetadata, d = (0,
            X.useMemo)(function() {
                return Xr(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
            X.useCallback)(function(t) {
                var e = null == d ? void 0 : d.findIndex(function(e) {
                    return e.universeId === t
                });
                if (void 0 !== e && -1 !== e) {
                    var n, r = d[e];
                    return (n = {})[R.ButtonName] = b.Interested,
                    n[R.PlaceId] = r.placeId,
                    n[R.UniverseId] = t,
                    n[R.Position] = e,
                    n[R.GameSetTypeId] = o.topicId,
                    n[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[R.Page] = K.InterestCatcher,
                    n[F.HomePageSessionInfo] = a,
                    n[R.IsInterested] = !i.has(t),
                    n
                }
            }, [i, d, a, o.topicId]), p = (0,
            X.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = Q.interestCatcherClick(e);
                void 0 !== e && P.eventStreamService.sendEvent.apply(P.eventStreamService, e)
            }, [r, f]), e = (0,
            X.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return Ds(Ds(Ds(((e = {})[R.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[R.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), z(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), V(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[R.AbsPositions] = t,
                    e[R.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[R.GameSetTypeId] = o.topicId,
                    e[R.Page] = K.InterestCatcher,
                    e[F.HomePageSessionInfo] = a,
                    e))
                }
            }, [d, a, o.topicId, null === (t = null == o ? void 0 : o.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return pn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            X.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            Y().createElement(Ho, {
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
        function As(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            X.useState)(new Set))[0]
              , a = f[1]
              , l = dn()
              , s = (0,
            X.useCallback)(function(e) {
                var t = {};
                return t[R.ButtonName] = e,
                t[F.HomePageSessionInfo] = l,
                t[R.InterestedUniverseIds] = Array.from(i),
                t[R.Page] = K.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            X.useCallback)(function(e) {
                e = s(e),
                e = Q.interestCatcherClick(e);
                void 0 !== e && P.eventStreamService.sendEvent.apply(P.eventStreamService, e)
            }, [s])
              , c = (0,
            X.useCallback)(function() {
                r([]),
                u(b.Skip)
            }, [r, u])
              , d = (0,
            X.useCallback)(function() {
                r(Array.from(i)),
                u(b.Continue)
            }, [i, r, u])
              , e = (0,
            X.useMemo)(function() {
                return null != i && i.size ? o(ot.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(ot.ActionInterestCatcherContinue)
            }, [i, o])
              , f = (0,
            X.useCallback)(function(e) {
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
            }, !(null != i && i.size) && Y().createElement(ge.Button, {
                variant: ge.Button.variants.secondary,
                size: ge.Button.sizes.medium,
                title: o(ot.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, o(ot.ActionInterestCatcherSkip)), Y().createElement(ge.Button, {
                variant: ge.Button.variants.primary,
                size: ge.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != i && i.size),
                className: "continue-button"
            }, e))), Y().createElement(Ns, {
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
        function ks(e) {
            var t = e.children
              , n = (0,
            X.useState)(null)
              , e = n[0]
              , r = n[1];
            return (0,
            X.useEffect)(function() {
                Ws().then(function(e) {
                    null != (null == e ? void 0 : e.data) && r(e.data)
                }, function(e) {
                    console.error(e)
                })
            }, []),
            Y().createElement(Vs.Provider, {
                value: e
            }, t)
        }
        _s.defaultProps = {
            context: ns.ContactMethod
        },
        _s.propTypes = {
            translate: re().func.isRequired,
            context: re().string
        };
        var Os, Rs, Ls = (0,
        p.withTranslations)(_s, Ul), Ds = function() {
            return (Ds = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Ms = function() {
            return (Ms = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Fs = qe.maxTilesPerCarouselPage, Us = n, Bs = t, Gs = (Os = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = dn()
              , r = (0,
            X.useState)(void 0)
              , o = r[0]
              , i = r[1]
              , a = (0,
            X.useState)(!1)
              , l = a[0]
              , s = a[1]
              , u = (0,
            X.useMemo)(function() {
                return $l()
            }, [])
              , c = (0,
            X.useMemo)(function() {
                try {
                    return (0,
                    P.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            X.useCallback)(function(e) {
                i(void 0),
                s(!1),
                fe(Se.Home, t, u, c, e).then(function(e) {
                    i(e),
                    (0,
                    E.fireEvent)(qe.omniRecommendationEndpointSuccessEvent)
                }).catch(function() {
                    s(!0),
                    (0,
                    E.fireEvent)(qe.omniRecommendationEndpointErrorEvent)
                })
            }, [t, u, c]);
            (0,
            X.useEffect)(function() {
                d()
            }, [d]);
            var f = (0,
            X.useState)(void 0)
              , e = f[0]
              , p = f[1];
            (0,
            X.useEffect)(function() {
                de(Us.homePageWeb, Bs.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(Bs.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , r = (0,
            X.useState)(void 0)
              , a = r[0]
              , v = r[1];
            (0,
            X.useEffect)(function() {
                de(Us.gridUi, Bs.gridUi).then(function(e) {
                    v(e)
                }).catch(function() {
                    v(Bs.gridUi)
                })
            }, []);
            var h = null == a ? void 0 : a.IsNewSortHeaderEnabled
              , g = null == a ? void 0 : a.IsCarouselHorizontalScrollEnabled
              , y = null == a ? void 0 : a.IsNewScrollArrowsEnabled
              , f = (0,
            X.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && Ms(Ms({}, e), {
                        contentMetadata: ((t = {})[w.Game] = Ms(Ms({}, e.contentMetadata[w.Game]), n[w.Game]),
                        t[w.CatalogAsset] = Ms(Ms({}, e.contentMetadata[w.CatalogAsset]), n[w.CatalogAsset]),
                        t[w.CatalogBundle] = Ms(Ms({}, e.contentMetadata[w.CatalogBundle]), n[w.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , e = Jl(o, m, g)
              , r = e.homeFeedRef
              , b = e.gridRecommendationsMap
              , I = e.itemsPerRowMap
              , S = e.startingRowNumbersMap;
            Vl(K.HomePage);
            a = (0,
            X.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== C.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            e = (0,
            X.useMemo)(function() {
                return null == o ? void 0 : o.sorts.findIndex(function(e) {
                    return e.treatmentType === C.InterestGrid
                })
            }, [null == o ? void 0 : o.sorts]);
            if (l)
                return Y().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, Y().createElement("h2", null, n(nt.LabelGames)), Y().createElement(Ee, {
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
                    length: Fs
                }, function(e, t) {
                    return Y().createElement(Wl, {
                        key: t
                    })
                })));
            if (void 0 !== e && -1 < e) {
                l = o.sorts[e];
                if (l && Yr(l))
                    return Y().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, Y().createElement("div", {
                        ref: r
                    }, Y().createElement(wo.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: f
                        }
                    }, Y().createElement(As, {
                        sort: l,
                        itemsPerRow: I.get(e),
                        fetchRecommendations: d,
                        translate: n
                    }))))
            }
            return Y().createElement("div", {
                className: "game-home-page-container",
                "data-testid": "HomePageContainerTestId"
            }, Y().createElement("div", {
                ref: r
            }, Y().createElement(wo.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: f
                }
            }, Y().createElement(Ls, {
                translate: n,
                context: void 0
            }), a && Y().createElement(ya, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return Y().createElement(Y().Fragment, {
                    key: t
                }, Y().createElement(ql, {
                    translate: n,
                    sort: e,
                    positionId: t,
                    startingRow: S.get(t),
                    currentPage: K.HomePage,
                    itemsPerRow: I.get(t),
                    gridRecommendations: null !== (t = b.get(t)) && void 0 !== t ? t : [],
                    isExpandHomeContentEnabled: m,
                    isCarouselHorizontalScrollEnabled: g,
                    isNewScrollArrowsEnabled: y,
                    isNewSortHeaderEnabled: h,
                    sduiRoot: o.sdui
                }))
            }))))
        }, ee),
        function(e) {
            return Y().createElement(cn, null, Y().createElement(Os, mn({}, e)))
        }
        ), js = function(e, a, l, s) {
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
        }, Hs = function(n, r) {
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
        }, zs = x.EnvironmentUrls.userModerationApi + "/v1/reminder", Ws = function() {
            return js(void 0, void 0, Promise, function() {
                var t;
                return Hs(this, function(e) {
                    return t = {
                        url: zs,
                        withCredentials: !0
                    },
                    [2, k.httpService.get(t)]
                })
            })
        }, Vs = (0,
        X.createContext)(null), qs = {
            common: [],
            feature: "Feature.Home"
        }, Js = function(e, t) {
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
        function $s() {
            var e = (s = (0,
            X.useState)(!1))[0]
              , t = s[1]
              , n = (0,
            X.useContext)(Vs)
              , r = (0,
            X.useRef)(0)
              , o = x.CurrentUser.userId;
            (0,
            X.useEffect)(function() {
                r.current = Date.now()
            }, []);
            var i = (0,
            p.useTranslation)().translate;
            if (null == n || null == n || !n.shouldSurfaceReminder || null == n || !n.policyViolation)
                return null;
            var a = n.interventionId
              , l = !e && (null == n ? void 0 : n.shouldSurfaceReminder)
              , s = (u = Js(n, i)).dialogTitle
              , e = u.dialogBodyAbuseType
              , i = u.dialogBodyGuidelineReminder
              , u = u.confirmationButtonLabel;
            return Y().createElement(ge.Modal, {
                className: "reminder-of-norms-dialog-modal",
                show: l,
                onHide: function() {
                    var e = Date.now();
                    Xs(a, Rs.DISMISSED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, Y().createElement(ge.Modal.Header, {
                className: "reminder-of-norms-dialog-title",
                title: s,
                showCloseButton: !1
            }), Y().createElement(ge.Modal.Body, {
                className: "reminder-of-norms-dialog-body"
            }, Y().createElement("p", {
                className: "dialog-body-abuse-type"
            }, e), Y().createElement("p", {
                className: "dialog-body-guideline-reminder"
            }, i)), Y().createElement(ge.Modal.Footer, null, Y().createElement(ge.Button, {
                className: "reminder-of-norms-confirm-button",
                onClick: function() {
                    var e = Date.now();
                    Xs(a, Rs.CTA_CLICKED, n.reminderNumber, o, e, (e - r.current) / 1e3, n.experimentVariant),
                    t(!0)
                }
            }, u)))
        }
        (ee = Rs = Rs || {}).CTA_CLICKED = "REMINDER_INTERACTION_CTA_CLICKED",
        ee.DISMISSED = "REMINDER_INTERACTION_REMINDER_DISMISSED";
        var Xs = function(e, t, n, r, o, i, a) {
            x.EventStream.SendEventWithTarget("HomePageRemindersEvent", "WebApp", {
                user_id: r,
                source_intervention_id: e,
                reminder_number: n,
                timestamp_milliseconds: o,
                time_to_interact_seconds: i,
                interaction: t,
                platform: "PLATFORM_WEB",
                experiment_variant: a
            }, x.EventStream.TargetTypes.WWW)
        };
        function Ys() {
            return Y().createElement(p.TranslationProvider, {
                config: qs
            }, Y().createElement(ks, null, Y().createElement($s, null)))
        }
        var Ks = (0,
        p.withTranslations)(function(e) {
            e = e.translate;
            return Y().createElement("div", {
                id: "HomeContainer",
                className: "row home-container expand-max-width"
            }, Y().createElement("div", {
                className: "section"
            }, Y().createElement("div", {
                className: "col-xs-12 container-header"
            }, Y().createElement("h1", null, e(rt.LabelsHome)))), Y().createElement("div", null, Y().createElement(Ys, null)), Y().createElement("div", {
                className: "place-list-container"
            }, Y().createElement(Gs, null)))
        }, {
            common: [],
            feature: "CommonUI.Features"
        });
        (0,
        k.ready)(function() {
            c() ? (0,
            e.render)(Y().createElement(Gs, null), c()) : document.getElementById("places-list-web-app") && document.getElementById("content") ? (0,
            e.render)(Y().createElement(Ks, null), document.getElementById("content")) : (0,
            E.fireEvent)("HomePageMissingContainerDiv")
        })
    }()
}();
//# sourceMappingURL=https://sourcemaps.rbxcdn.com/1c71a1bffadaa57848f82b8a1211a2cf-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
