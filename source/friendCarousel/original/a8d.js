!function() {
    var n = {
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
                function h(e) {
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
                function v(e, t) {
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
                        m = e && t ? v(e, t) : c(),
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
                          , n = h(t)
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
                            o == this.root || o == f ? p && !this.root ? !m || 0 == m.width && 0 == m.height ? r = c = o = null : c = m : c = n : (l = (a = g(o)) && h(a),
                            s = a && this._computeTargetAndRootIntersection(a, l, n),
                            l && s ? (o = a,
                            c = v(l, s)) : r = o = null)) : o != (u = o.ownerDocument).body && o != u.documentElement && "visible" != d.overflow && (c = h(o)),
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
                    return t = this.root && !s(this.root) ? h(this.root) : (e = (t = s(this.root) ? this.root : f).documentElement,
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
                function h(e) {
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
                function v(e, t) {
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
                        m = e && t ? v(e, t) : c(),
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
                          , n = h(t)
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
                            o == this.root || o == f ? p && !this.root ? !m || 0 == m.width && 0 == m.height ? r = c = o = null : c = m : c = n : (l = (a = g(o)) && h(a),
                            s = a && this._computeTargetAndRootIntersection(a, l, n),
                            l && s ? (o = a,
                            c = v(l, s)) : r = o = null)) : o != (u = o.ownerDocument).body && o != u.documentElement && "visible" != d.overflow && (c = h(o)),
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
                    return t = this.root && !s(this.root) ? h(this.root) : (e = (t = s(this.root) ? this.root : f).documentElement,
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
        5250: function(O, A, R) {
            var L;
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
                var Hi, zi = "Expected a function", Vi = "__lodash_hash_undefined__", Wi = "__lodash_placeholder__", qi = 128, $i = 9007199254740991, Ki = NaN, Yi = 4294967295, Ji = [["ary", qi], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], Zi = "[object Arguments]", Xi = "[object Array]", Qi = "[object Boolean]", ea = "[object Date]", ta = "[object Error]", na = "[object Function]", ra = "[object GeneratorFunction]", oa = "[object Map]", ia = "[object Number]", aa = "[object Object]", la = "[object Promise]", sa = "[object RegExp]", ua = "[object Set]", ca = "[object String]", da = "[object Symbol]", fa = "[object WeakMap]", pa = "[object ArrayBuffer]", ma = "[object DataView]", ha = "[object Float32Array]", va = "[object Float64Array]", ga = "[object Int8Array]", ya = "[object Int16Array]", ba = "[object Int32Array]", wa = "[object Uint8Array]", Ia = "[object Uint8ClampedArray]", Ea = "[object Uint16Array]", Sa = "[object Uint32Array]", Pa = /\b__p \+= '';/g, _a = /\b(__p \+=) '' \+/g, Ca = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ta = /&(?:amp|lt|gt|quot|#39);/g, xa = /[&<>"']/g, Na = RegExp(Ta.source), Oa = RegExp(xa.source), Aa = /<%-([\s\S]+?)%>/g, Ra = /<%([\s\S]+?)%>/g, La = /<%=([\s\S]+?)%>/g, ka = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Da = /^\w*$/, Ma = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ua = /[\\^$.*+?()[\]{}|]/g, Ga = RegExp(Ua.source), Ba = /^\s+/, n = /\s/, Fa = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ja = /\{\n\/\* \[wrapped with (.+)\] \*/, Ha = /,? & /, za = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Va = /[()=,{}\[\]\/\s]/, Wa = /\\(\\)?/g, qa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $a = /\w*$/, Ka = /^[-+]0x[0-9a-f]+$/i, Ya = /^0b[01]+$/i, Ja = /^\[object .+?Constructor\]$/, Za = /^0o[0-7]+$/i, Xa = /^(?:0|[1-9]\d*)$/, Qa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, el = /($^)/, tl = /['\n\r\u2028\u2029\\]/g, e = "\\ud800-\\udfff", t = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", r = "\\u2700-\\u27bf", o = "a-z\\xdf-\\xf6\\xf8-\\xff", i = "A-Z\\xc0-\\xd6\\xd8-\\xde", a = "\\ufe0e\\ufe0f", l = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", s = "['’]", u = "[" + e + "]", c = "[" + l + "]", d = "[" + t + "]", f = "\\d+", p = "[" + r + "]", m = "[" + o + "]", h = "[^" + e + l + f + r + o + i + "]", v = "\\ud83c[\\udffb-\\udfff]", g = "[^" + e + "]", y = "(?:\\ud83c[\\udde6-\\uddff]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", w = "[" + i + "]", I = "\\u200d", E = "(?:" + m + "|" + h + ")", l = "(?:" + w + "|" + h + ")", r = "(?:['’](?:d|ll|m|re|s|t|ve))?", o = "(?:['’](?:D|LL|M|RE|S|T|VE))?", i = "(?:" + d + "|" + v + ")" + "?", h = "[" + a + "]?", i = h + i + ("(?:" + I + "(?:" + [g, y, b].join("|") + ")" + h + i + ")*"), p = "(?:" + [p, y, b].join("|") + ")" + i, u = "(?:" + [g + d + "?", d, y, b, u].join("|") + ")", nl = RegExp(s, "g"), rl = RegExp(d, "g"), S = RegExp(v + "(?=" + v + ")|" + u + i, "g"), ol = RegExp([w + "?" + m + "+" + r + "(?=" + [c, w, "$"].join("|") + ")", l + "+" + o + "(?=" + [c, w + E, "$"].join("|") + ")", w + "?" + E + "+" + r, w + "+" + o, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", f, p].join("|"), "g"), P = RegExp("[" + I + e + t + a + "]"), il = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, al = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ll = -1, sl = {};
                sl[ha] = sl[va] = sl[ga] = sl[ya] = sl[ba] = sl[wa] = sl[Ia] = sl[Ea] = sl[Sa] = !0,
                sl[Zi] = sl[Xi] = sl[pa] = sl[Qi] = sl[ma] = sl[ea] = sl[ta] = sl[na] = sl[oa] = sl[ia] = sl[aa] = sl[sa] = sl[ua] = sl[ca] = sl[fa] = !1;
                var ul = {};
                ul[Zi] = ul[Xi] = ul[pa] = ul[ma] = ul[Qi] = ul[ea] = ul[ha] = ul[va] = ul[ga] = ul[ya] = ul[ba] = ul[oa] = ul[ia] = ul[aa] = ul[sa] = ul[ua] = ul[ca] = ul[da] = ul[wa] = ul[Ia] = ul[Ea] = ul[Sa] = !0,
                ul[ta] = ul[na] = ul[fa] = !1;
                var _ = {
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
                  , a = A && !A.nodeType && A
                  , C = a && O && !O.nodeType && O
                  , pl = C && C.exports === a
                  , T = pl && t.process
                  , t = function() {
                    try {
                        var e = C && C.require && C.require("util").types;
                        return e ? e : T && T.binding && T.binding("util")
                    } catch (e) {}
                }()
                  , ml = t && t.isArrayBuffer
                  , hl = t && t.isDate
                  , vl = t && t.isMap
                  , gl = t && t.isRegExp
                  , yl = t && t.isSet
                  , bl = t && t.isTypedArray;
                function wl(e, t, n) {
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
                function Il(e, t, n, r) {
                    for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
                        var a = e[o];
                        t(r, a, n(a), e)
                    }
                    return r
                }
                function El(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e); )
                        ;
                    return e
                }
                function Sl(e, t) {
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
                function _l(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r; ) {
                        var a = e[n];
                        t(a, n, e) && (i[o++] = a)
                    }
                    return i
                }
                function Cl(e, t) {
                    return !!(null == e ? 0 : e.length) && -1 < Dl(e, t, 0)
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
                function Nl(e, t) {
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
                function Al(e, t, n, r) {
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
                function Ll(e, r, t) {
                    var o;
                    return t(e, function(e, t, n) {
                        if (r(e, t, n))
                            return o = t,
                            !1
                    }),
                    o
                }
                function kl(e, t, n, r) {
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
                    }(e, t, n) : kl(e, Ul, n)
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
                function Gl(e, t) {
                    var n = null == e ? 0 : e.length;
                    return n ? jl(e, t) / n : Ki
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
                function Fl(e, r, o, i, t) {
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
                function $l(e, t) {
                    for (var n = -1, r = e.length; ++n < r && -1 < Dl(t, e[n], 0); )
                        ;
                    return n
                }
                function Kl(e, t) {
                    for (var n = e.length; n-- && -1 < Dl(t, e[n], 0); )
                        ;
                    return n
                }
                var Yl = N({
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
                  , Jl = N({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                });
                function Zl(e) {
                    return "\\" + _[e]
                }
                function Xl(e) {
                    return P.test(e)
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
                    return (Xl(e) ? function(e) {
                        var t = S.lastIndex = 0;
                        for (; S.test(e); )
                            ++t;
                        return t
                    }
                    : x)(e)
                }
                function os(e) {
                    return Xl(e) ? e.match(S) || [] : e.split("")
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
                    var S = (t = null == t ? fl : ls.defaults(fl.Object(), t, ls.pick(fl, al))).Array
                      , n = t.Date
                      , d = t.Error
                      , f = t.Function
                      , o = t.Math
                      , h = t.Object
                      , p = t.RegExp
                      , c = t.String
                      , E = t.TypeError
                      , i = S.prototype
                      , r = f.prototype
                      , m = h.prototype
                      , a = t["__core-js_shared__"]
                      , l = r.toString
                      , y = m.hasOwnProperty
                      , s = 0
                      , u = (Li = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Li : ""
                      , v = m.toString
                      , g = l.call(h)
                      , b = fl._
                      , w = p("^" + l.call(y).replace(Ua, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , I = pl ? t.Buffer : Hi
                      , P = t.Symbol
                      , _ = t.Uint8Array
                      , C = I ? I.allocUnsafe : Hi
                      , T = es(h.getPrototypeOf, h)
                      , x = h.create
                      , N = m.propertyIsEnumerable
                      , O = i.splice
                      , A = P ? P.isConcatSpreadable : Hi
                      , R = P ? P.iterator : Hi
                      , L = P ? P.toStringTag : Hi
                      , k = function() {
                        try {
                            var e = Hn(h, "defineProperty");
                            return e({}, "", {}),
                            e
                        } catch (e) {}
                    }()
                      , D = t.clearTimeout !== fl.clearTimeout && t.clearTimeout
                      , M = n && n.now !== fl.Date.now && n.now
                      , U = t.setTimeout !== fl.setTimeout && t.setTimeout
                      , G = o.ceil
                      , B = o.floor
                      , F = h.getOwnPropertySymbols
                      , j = I ? I.isBuffer : Hi
                      , H = t.isFinite
                      , z = i.join
                      , V = es(h.keys, h)
                      , W = o.max
                      , q = o.min
                      , $ = n.now
                      , K = t.parseInt
                      , Y = o.random
                      , J = i.reverse
                      , Z = Hn(t, "DataView")
                      , X = Hn(t, "Map")
                      , Q = Hn(t, "Promise")
                      , ee = Hn(t, "Set")
                      , te = Hn(t, "WeakMap")
                      , ne = Hn(h, "create")
                      , re = te && new te
                      , oe = {}
                      , ie = vr(Z)
                      , ae = vr(X)
                      , le = vr(Q)
                      , se = vr(ee)
                      , ue = vr(te)
                      , ce = P ? P.prototype : Hi
                      , de = ce ? ce.valueOf : Hi
                      , fe = ce ? ce.toString : Hi;
                    function pe(e) {
                        if (ko(e) && !So(e) && !(e instanceof ye)) {
                            if (e instanceof ge)
                                return e;
                            if (y.call(e, "__wrapped__"))
                                return gr(e)
                        }
                        return new ge(e)
                    }
                    var me = function(e) {
                        if (!Lo(e))
                            return {};
                        if (x)
                            return x(e);
                        he.prototype = e;
                        e = new he;
                        return he.prototype = Hi,
                        e
                    };
                    function he() {}
                    function ve() {}
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
                    function we(e) {
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
                    function Ee(e) {
                        var t = -1
                          , n = null == e ? 0 : e.length;
                        for (this.__data__ = new Ie; ++t < n; )
                            this.add(e[t])
                    }
                    function Se(e) {
                        e = this.__data__ = new we(e);
                        this.size = e.size
                    }
                    function Pe(e, t) {
                        var n, r = So(e), o = !r && Eo(e), i = !r && !o && To(e), a = !r && !o && !i && Ho(e), l = r || o || i || a, s = l ? Hl(e.length, c) : [], u = s.length;
                        for (n in e)
                            !t && !y.call(e, n) || l && ("length" == n || i && ("offset" == n || "parent" == n) || a && ("buffer" == n || "byteLength" == n || "byteOffset" == n) || Yn(n, u)) || s.push(n);
                        return s
                    }
                    function _e(e) {
                        var t = e.length;
                        return t ? e[Et(0, t - 1)] : Hi
                    }
                    function Ce(e, t) {
                        return dr(rn(e), De(t, 0, e.length))
                    }
                    function Te(e) {
                        return dr(rn(e))
                    }
                    function xe(e, t, n) {
                        (n === Hi || bo(e[t], n)) && (n !== Hi || t in e) || Le(e, t, n)
                    }
                    function Ne(e, t, n) {
                        var r = e[t];
                        y.call(e, t) && bo(r, n) && (n !== Hi || t in e) || Le(e, t, n)
                    }
                    function Oe(e, t) {
                        for (var n = e.length; n--; )
                            if (bo(e[n][0], t))
                                return n;
                        return -1
                    }
                    function Ae(e, r, o, i) {
                        return Fe(e, function(e, t, n) {
                            r(i, e, o(e), n)
                        }),
                        i
                    }
                    function Re(e, t) {
                        return e && on(t, ci(t), e)
                    }
                    function Le(e, t, n) {
                        "__proto__" == t && k ? k(e, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: n,
                            writable: !0
                        }) : e[t] = n
                    }
                    function ke(e, t) {
                        for (var n = -1, r = t.length, o = S(r), i = null == e; ++n < r; )
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
                        if (!Lo(n))
                            return n;
                        var c, d, f = So(n);
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
                                if (a = s || e ? {} : $n(n),
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
                                        return Xt(e);
                                    case Qi:
                                    case ea:
                                        return new r(+e);
                                    case ma:
                                        return function(e, t) {
                                            t = t ? Xt(e.buffer) : e.buffer;
                                            return new e.constructor(t,e.byteOffset,e.byteLength)
                                        }(e, n);
                                    case ha:
                                    case va:
                                    case ga:
                                    case ya:
                                    case ba:
                                    case wa:
                                    case Ia:
                                    case Ea:
                                    case Sa:
                                        return Qt(e, n);
                                    case oa:
                                        return new r;
                                    case ia:
                                    case ca:
                                        return new r(e);
                                    case sa:
                                        return function(e) {
                                            var t = new e.constructor(e.source,$a.exec(e));
                                            return t.lastIndex = e.lastIndex,
                                            t
                                        }(e);
                                    case ua:
                                        return new r;
                                    case da:
                                        return function(e) {
                                            return de ? h(de.call(e)) : {}
                                        }(e)
                                    }
                                }(n, p, l)
                            }
                        }
                        l = (i = i || new Se).get(n);
                        if (l)
                            return l;
                        i.set(n, a),
                        Bo(n) ? n.forEach(function(e) {
                            a.add(Me(e, r, o, e, n, i))
                        }) : Do(n) && n.forEach(function(e, t) {
                            a.set(t, Me(e, r, o, t, n, i))
                        });
                        var m = f ? Hi : (u ? s ? Dn : kn : s ? di : ci)(n);
                        return El(m || n, function(e, t) {
                            m && (e = n[t = e]),
                            Ne(a, t, Me(e, r, o, t, n, i))
                        }),
                        a
                    }
                    function Ue(e, t, n) {
                        var r = n.length;
                        if (null == e)
                            return !r;
                        for (e = h(e); r--; ) {
                            var o = n[r]
                              , i = t[o]
                              , a = e[o];
                            if (a === Hi && !(o in e) || !i(a))
                                return !1
                        }
                        return !0
                    }
                    function Ge(e, t, n) {
                        if ("function" != typeof e)
                            throw new E(zi);
                        return lr(function() {
                            e.apply(Hi, n)
                        }, t)
                    }
                    function Be(e, t, n, r) {
                        var o = -1
                          , i = Cl
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
                        t = new Ee(t));
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
                        evaluate: Ra,
                        interpolate: La,
                        variable: "",
                        imports: {
                            _: pe
                        }
                    },
                    (pe.prototype = ve.prototype).constructor = pe,
                    (ge.prototype = me(ve.prototype)).constructor = ge,
                    (ye.prototype = me(ve.prototype)).constructor = ye,
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
                    we.prototype.clear = function() {
                        this.__data__ = [],
                        this.size = 0
                    }
                    ,
                    we.prototype.delete = function(e) {
                        var t = this.__data__;
                        return !((e = Oe(t, e)) < 0) && (e == t.length - 1 ? t.pop() : O.call(t, e, 1),
                        --this.size,
                        !0)
                    }
                    ,
                    we.prototype.get = function(e) {
                        var t = this.__data__;
                        return (e = Oe(t, e)) < 0 ? Hi : t[e][1]
                    }
                    ,
                    we.prototype.has = function(e) {
                        return -1 < Oe(this.__data__, e)
                    }
                    ,
                    we.prototype.set = function(e, t) {
                        var n = this.__data__
                          , r = Oe(n, e);
                        return r < 0 ? (++this.size,
                        n.push([e, t])) : n[r][1] = t,
                        this
                    }
                    ,
                    Ie.prototype.clear = function() {
                        this.size = 0,
                        this.__data__ = {
                            hash: new be,
                            map: new (X || we),
                            string: new be
                        }
                    }
                    ,
                    Ie.prototype.delete = function(e) {
                        return e = Fn(this, e).delete(e),
                        this.size -= e ? 1 : 0,
                        e
                    }
                    ,
                    Ie.prototype.get = function(e) {
                        return Fn(this, e).get(e)
                    }
                    ,
                    Ie.prototype.has = function(e) {
                        return Fn(this, e).has(e)
                    }
                    ,
                    Ie.prototype.set = function(e, t) {
                        var n = Fn(this, e)
                          , r = n.size;
                        return n.set(e, t),
                        this.size += n.size == r ? 0 : 1,
                        this
                    }
                    ,
                    Ee.prototype.add = Ee.prototype.push = function(e) {
                        return this.__data__.set(e, Vi),
                        this
                    }
                    ,
                    Ee.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Se.prototype.clear = function() {
                        this.__data__ = new we,
                        this.size = 0
                    }
                    ,
                    Se.prototype.delete = function(e) {
                        var t = this.__data__
                          , e = t.delete(e);
                        return this.size = t.size,
                        e
                    }
                    ,
                    Se.prototype.get = function(e) {
                        return this.__data__.get(e)
                    }
                    ,
                    Se.prototype.has = function(e) {
                        return this.__data__.has(e)
                    }
                    ,
                    Se.prototype.set = function(e, t) {
                        var n = this.__data__;
                        if (n instanceof we) {
                            var r = n.__data__;
                            if (!X || r.length < 199)
                                return r.push([e, t]),
                                this.size = ++n.size,
                                this;
                            n = this.__data__ = new Ie(r)
                        }
                        return n.set(e, t),
                        this.size = n.size,
                        this
                    }
                    ;
                    var Fe = sn(Ke)
                      , je = sn(Ye, !0);
                    function He(e, r) {
                        var o = !0;
                        return Fe(e, function(e, t, n) {
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
                    function Ve(e, r) {
                        var o = [];
                        return Fe(e, function(e, t, n) {
                            r(e, t, n) && o.push(e)
                        }),
                        o
                    }
                    function We(e, t, n, r, o) {
                        var i = -1
                          , a = e.length;
                        for (n = n || Kn,
                        o = o || []; ++i < a; ) {
                            var l = e[i];
                            0 < t && n(l) ? 1 < t ? We(l, t - 1, n, r, o) : Nl(o, l) : r || (o[o.length] = l)
                        }
                        return o
                    }
                    var qe = un()
                      , $e = un(!0);
                    function Ke(e, t) {
                        return e && qe(e, t, ci)
                    }
                    function Ye(e, t) {
                        return e && $e(e, t, ci)
                    }
                    function Je(t, e) {
                        return _l(e, function(e) {
                            return Oo(t[e])
                        })
                    }
                    function Ze(e, t) {
                        for (var n = 0, r = (t = $t(t, e)).length; null != e && n < r; )
                            e = e[hr(t[n++])];
                        return n && n == r ? e : Hi
                    }
                    function Xe(e, t, n) {
                        t = t(e);
                        return So(e) ? t : Nl(t, n(e))
                    }
                    function Qe(e) {
                        return null == e ? e === Hi ? "[object Undefined]" : "[object Null]" : L && L in h(e) ? function(e) {
                            var t = y.call(e, L)
                              , n = e[L];
                            try {
                                e[L] = Hi;
                                var r = !0
                            } catch (e) {}
                            var o = v.call(e);
                            r && (t ? e[L] = n : delete e[L]);
                            return o
                        }(e) : (e = e,
                        v.call(e))
                    }
                    function et(e, t) {
                        return t < e
                    }
                    function tt(e, t) {
                        return null != e && y.call(e, t)
                    }
                    function nt(e, t) {
                        return null != e && t in h(e)
                    }
                    function rt(e, t, n) {
                        for (var r = n ? Tl : Cl, o = e[0].length, i = e.length, a = i, l = S(i), s = 1 / 0, u = []; a--; ) {
                            var c = e[a];
                            a && t && (c = xl(c, Vl(t))),
                            s = q(c.length, s),
                            l[a] = !n && (t || 120 <= o && 120 <= c.length) ? new Ee(a && c) : Hi
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
                                    var h = l[a];
                                    if (!(h ? ql(h, m) : r(e[a], m, n)))
                                        continue e
                                }
                                f && f.push(m),
                                u.push(p)
                            }
                        }
                        return u
                    }
                    function ot(e, t, n) {
                        t = null == (e = or(e, t = $t(t, e))) ? e : e[hr(xr(t))];
                        return null == t ? Hi : wl(t, e, n)
                    }
                    function it(e) {
                        return ko(e) && Qe(e) == Zi
                    }
                    function at(e, t, n, r, o) {
                        return e === t || (null == e || null == t || !ko(e) && !ko(t) ? e != e && t != t : function(e, t, n, r, o, i) {
                            var a = So(e)
                              , l = So(t)
                              , s = a ? Xi : Wn(e)
                              , u = l ? Xi : Wn(t)
                              , c = (s = s == Zi ? aa : s) == aa
                              , l = (u = u == Zi ? aa : u) == aa
                              , u = s == u;
                            if (u && To(e)) {
                                if (!To(t))
                                    return !1;
                                c = !(a = !0)
                            }
                            if (u && !c)
                                return i = i || new Se,
                                a || Ho(e) ? Rn(e, t, n, r, o, i) : function(e, t, n, r, o, i, a) {
                                    switch (n) {
                                    case ma:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                                            return !1;
                                        e = e.buffer,
                                        t = t.buffer;
                                    case pa:
                                        return e.byteLength == t.byteLength && i(new _(e), new _(t)) ? !0 : !1;
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
                                    return i = i || new Se,
                                    o(c, l, n, r, i)
                                }
                            }
                            return u && (i = i || new Se,
                            function(e, t, n, r, o, i) {
                                var a = 1 & n
                                  , l = kn(e)
                                  , s = l.length
                                  , u = kn(t).length;
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
                                    var h, v = e[d], g = t[d];
                                    if (r && (h = a ? r(g, v, d, t, e, i) : r(v, g, d, e, t, i)),
                                    !(h === Hi ? v === g || o(v, g, n, r, i) : h)) {
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
                        for (e = h(e); o--; ) {
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
                                var d, f = new Se;
                                if (r && (d = r(u, c, s, e, t, f)),
                                !(d === Hi ? at(c, u, 3, r, f) : d))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function st(e) {
                        return !(!Lo(e) || (t = e,
                        u && u in t)) && (Oo(e) ? w : Ja).test(vr(e));
                        var t
                    }
                    function ut(e) {
                        return "function" == typeof e ? e : null == e ? ki : "object" == typeof e ? So(e) ? ht(e[0], e[1]) : mt(e) : Gi(e)
                    }
                    function ct(e) {
                        if (!er(e))
                            return V(e);
                        var t, n = [];
                        for (t in h(e))
                            y.call(e, t) && "constructor" != t && n.push(t);
                        return n
                    }
                    function dt(e) {
                        if (!Lo(e))
                            return function(e) {
                                var t = [];
                                if (null != e)
                                    for (var n in h(e))
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
                          , i = _o(e) ? S(e.length) : [];
                        return Fe(e, function(e, t, n) {
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
                    function ht(n, r) {
                        return Zn(n) && tr(r) ? nr(hr(n), r) : function(e) {
                            var t = ii(e, n);
                            return t === Hi && t === r ? ai(e, n) : at(r, t, 3)
                        }
                    }
                    function vt(r, o, i, a, l) {
                        r !== o && qe(o, function(e, t) {
                            var n;
                            l = l || new Se,
                            Lo(e) ? function(e, t, n, r, o, i, a) {
                                var l = ir(e, n)
                                  , s = ir(t, n)
                                  , u = a.get(s);
                                if (u)
                                    return xe(e, n, u);
                                var c, d = i ? i(l, s, n + "", e, t, a) : Hi, f = d === Hi;
                                f && (c = So(s),
                                u = !c && To(s),
                                t = !c && !u && Ho(s),
                                d = s,
                                c || u || t ? d = So(l) ? l : Co(l) ? rn(l) : u ? Zt(s, !(f = !1)) : t ? Qt(s, !(f = !1)) : [] : Uo(s) || Eo(s) ? Eo(d = l) ? d = Jo(l) : Lo(l) && !Oo(l) || (d = $n(s)) : f = !1),
                                f && (a.set(s, d),
                                o(d, s, r, i, a),
                                a.delete(s)),
                                xe(e, n, d)
                            }(r, o, t, i, vt, a, l) : ((n = a ? a(ir(r, t), e, t + "", r, o, l) : Hi) === Hi && (n = e),
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
                            return So(t) ? function(e) {
                                return Ze(e, 1 === t.length ? t[0] : t)
                            }
                            : t
                        }) : [ki];
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
                            n(l, a) && Tt(i, $t(a, e), l)
                        }
                        return i
                    }
                    function wt(e, t, n, r) {
                        var o = r ? Ml : Dl
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
                    function It(e, t) {
                        for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                            var o, i = t[n];
                            n != r && i === o || (Yn(o = i) ? O.call(e, i, 1) : Bt(e, i))
                        }
                        return e
                    }
                    function Et(e, t) {
                        return e + B(Y() * (t - e + 1))
                    }
                    function St(e, t) {
                        var n = "";
                        if (!e || t < 1 || $i < t)
                            return n;
                        for (; t % 2 && (n += e),
                        (t = B(t / 2)) && (e += e),
                        t; )
                            ;
                        return n
                    }
                    function Pt(e, t) {
                        return sr(rr(e, t, ki), e + "")
                    }
                    function _t(e) {
                        return _e(bi(e))
                    }
                    function Ct(e, t) {
                        e = bi(e);
                        return dr(e, De(t, 0, e.length))
                    }
                    function Tt(e, t, n, r) {
                        if (!Lo(e))
                            return e;
                        for (var o = -1, i = (t = $t(t, e)).length, a = i - 1, l = e; null != l && ++o < i; ) {
                            var s, u = hr(t[o]), c = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u)
                                return e;
                            o != a && (s = l[u],
                            (c = r ? r(s, u, l) : Hi) === Hi && (c = Lo(s) ? s : Yn(t[o + 1]) ? [] : {})),
                            Ne(l, u, c),
                            l = l[u]
                        }
                        return e
                    }
                    var xt = re ? function(e, t) {
                        return re.set(e, t),
                        e
                    }
                    : ki
                      , Nt = k ? function(e, t) {
                        return k(e, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: Ri(t),
                            writable: !0
                        })
                    }
                    : ki;
                    function Ot(e) {
                        return dr(bi(e))
                    }
                    function At(e, t, n) {
                        var r = -1
                          , o = e.length;
                        t < 0 && (t = o < -t ? 0 : o + t),
                        (n = o < n ? o : n) < 0 && (n += o),
                        o = n < t ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var i = S(o); ++r < o; )
                            i[r] = e[r + t];
                        return i
                    }
                    function Rt(e, r) {
                        var o;
                        return Fe(e, function(e, t, n) {
                            return !(o = r(e, t, n))
                        }),
                        !!o
                    }
                    function Lt(e, t, n) {
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
                        return kt(e, t, ki, n)
                    }
                    function kt(e, t, n, r) {
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
                              , h = jo(d)
                              , d = a ? r || m : u ? m && (r || f) : l ? m && f && (r || !p) : s ? m && f && !p && (r || !h) : !p && !h && (r ? d <= t : d < t);
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
                        return "number" == typeof e ? e : jo(e) ? Ki : +e
                    }
                    function Ut(e) {
                        if ("string" == typeof e)
                            return e;
                        if (So(e))
                            return xl(e, Ut) + "";
                        if (jo(e))
                            return fe ? fe.call(e) : "";
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function Gt(e, t, n) {
                        var r = -1
                          , o = Cl
                          , i = e.length
                          , a = !0
                          , l = []
                          , s = l;
                        if (n)
                            a = !1,
                            o = Tl;
                        else if (200 <= i) {
                            var u = t ? null : Cn(e);
                            if (u)
                                return ns(u);
                            a = !1,
                            o = ql,
                            s = new Ee
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
                        return null == (e = or(e, t = $t(t, e))) || delete e[hr(xr(t))]
                    }
                    function Ft(e, t, n, r) {
                        return Tt(e, t, n(Ze(e, t)), r)
                    }
                    function jt(e, t, n, r) {
                        for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e); )
                            ;
                        return n ? At(e, r ? 0 : i, r ? i + 1 : o) : At(e, r ? i + 1 : 0, r ? o : i)
                    }
                    function Ht(e, t) {
                        return e instanceof ye && (e = e.value()),
                        Ol(t, function(e, t) {
                            return t.func.apply(t.thisArg, Nl([e], t.args))
                        }, e)
                    }
                    function zt(e, t, n) {
                        var r = e.length;
                        if (r < 2)
                            return r ? Gt(e[0]) : [];
                        for (var o = -1, i = S(r); ++o < r; )
                            for (var a = e[o], l = -1; ++l < r; )
                                l != o && (i[o] = Be(i[o] || a, e[l], t, n));
                        return Gt(We(i, 1), t, n)
                    }
                    function Vt(e, t, n) {
                        for (var r = -1, o = e.length, i = t.length, a = {}; ++r < o; ) {
                            var l = r < i ? t[r] : Hi;
                            n(a, e[r], l)
                        }
                        return a
                    }
                    function Wt(e) {
                        return Co(e) ? e : []
                    }
                    function qt(e) {
                        return "function" == typeof e ? e : ki
                    }
                    function $t(e, t) {
                        return So(e) ? e : Zn(e, t) ? [e] : mr(Zo(e))
                    }
                    var Kt = Pt;
                    function Yt(e, t, n) {
                        var r = e.length;
                        return n = n === Hi ? r : n,
                        !t && r <= n ? e : At(e, t, n)
                    }
                    var Jt = D || function(e) {
                        return fl.clearTimeout(e)
                    }
                    ;
                    function Zt(e, t) {
                        if (t)
                            return e.slice();
                        t = e.length,
                        t = C ? C(t) : new e.constructor(t);
                        return e.copy(t),
                        t
                    }
                    function Xt(e) {
                        var t = new e.constructor(e.byteLength);
                        return new _(t).set(new _(e)),
                        t
                    }
                    function Qt(e, t) {
                        t = t ? Xt(e.buffer) : e.buffer;
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
                        for (var o = -1, i = e.length, a = n.length, l = -1, s = t.length, u = W(i - a, 0), c = S(s + u), d = !r; ++l < s; )
                            c[l] = t[l];
                        for (; ++o < a; )
                            (d || o < i) && (c[n[o]] = e[o]);
                        for (; u--; )
                            c[l++] = e[o++];
                        return c
                    }
                    function nn(e, t, n, r) {
                        for (var o = -1, i = e.length, a = -1, l = n.length, s = -1, u = t.length, c = W(i - l, 0), d = S(c + u), f = !r; ++o < c; )
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
                        for (t = t || S(r); ++n < r; )
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
                            (o ? Le : Ne)(n, l, s)
                        }
                        return n
                    }
                    function an(o, i) {
                        return function(e, t) {
                            var n = So(e) ? Il : Ae
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
                            for (i && Jn(t[0], t[1], i) && (o = r < 3 ? Hi : o,
                            r = 1),
                            e = h(e); ++n < r; ) {
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
                            if (!_o(e))
                                return i(e, t);
                            for (var n = e.length, r = a ? n : -1, o = h(e); (a ? r-- : ++r < n) && !1 !== t(o[r], r, o); )
                                ;
                            return e
                        }
                    }
                    function un(s) {
                        return function(e, t, n) {
                            for (var r = -1, o = h(e), i = n(e), a = i.length; a--; ) {
                                var l = i[s ? a : ++r];
                                if (!1 === t(o[l], l, o))
                                    break
                            }
                            return e
                        }
                    }
                    function cn(r) {
                        return function(e) {
                            var t = Xl(e = Zo(e)) ? os(e) : Hi
                              , n = t ? t[0] : e.charAt(0)
                              , e = t ? Yt(t, 1).join("") : e.slice(1);
                            return n[r]() + e
                        }
                    }
                    function dn(t) {
                        return function(e) {
                            return Ol(Oi(Ei(e).replace(nl, "")), t, "")
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
                            return Lo(n) ? n : t
                        }
                    }
                    function pn(i, a, l) {
                        var s = fn(i);
                        return function e() {
                            for (var t = arguments.length, n = S(t), r = t, o = Gn(e); r--; )
                                n[r] = arguments[r];
                            o = t < 3 && n[0] !== o && n[t - 1] !== o ? [] : ts(n, o);
                            return (t -= o.length) < l ? Pn(i, a, vn, e.placeholder, Hi, n, o, Hi, Hi, l - t) : wl(this && this !== fl && this instanceof e ? s : i, this, n)
                        }
                    }
                    function mn(i) {
                        return function(e, t, n) {
                            var r, o = h(e);
                            _o(e) || (r = Bn(t, 3),
                            e = ci(e),
                            t = function(e) {
                                return r(o[e], e, o)
                            }
                            );
                            n = i(e, t, n);
                            return -1 < n ? o[r ? e[n] : n] : Hi
                        }
                    }
                    function hn(s) {
                        return Ln(function(o) {
                            var i = o.length
                              , e = i
                              , t = ge.prototype.thru;
                            for (s && o.reverse(); e--; ) {
                                var n = o[e];
                                if ("function" != typeof n)
                                    throw new E(zi);
                                t && !l && "wrapper" == Un(n) && (l = new ge([],!0))
                            }
                            for (e = l ? e : i; ++e < i; )
                                var r = Un(n = o[e])
                                  , a = "wrapper" == r ? Mn(n) : Hi
                                  , l = a && Xn(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9] ? l[Un(a[0])].apply(l, a[3]) : 1 == n.length && Xn(n) ? l[r]() : l.thru(n);
                            return function() {
                                var e = arguments
                                  , t = e[0];
                                if (l && 1 == e.length && So(t))
                                    return l.plant(t).value();
                                for (var n = 0, r = i ? o[n].apply(this, e) : t; ++n < i; )
                                    r = o[n].call(this, r);
                                return r
                            }
                        })
                    }
                    function vn(l, s, u, c, d, f, p, m, h, v) {
                        var g = s & qi
                          , y = 1 & s
                          , b = 2 & s
                          , w = 24 & s
                          , I = 512 & s
                          , E = b ? Hi : fn(l);
                        return function e() {
                            for (var t, n = S(a = arguments.length), r = a; r--; )
                                n[r] = arguments[r];
                            if (w && (t = function(e, t) {
                                for (var n = e.length, r = 0; n--; )
                                    e[n] === t && ++r;
                                return r
                            }(n, i = Gn(e))),
                            c && (n = tn(n, c, d, w)),
                            f && (n = nn(n, f, p, w)),
                            a -= t,
                            w && a < v) {
                                var o = ts(n, i);
                                return Pn(l, s, vn, e.placeholder, u, n, o, m, h, v - a)
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
                            }(n, m) : I && 1 < a && n.reverse(),
                            g && h < a && (n.length = h),
                            this && this !== fl && this instanceof e && (o = E || fn(o)),
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
                        return Ln(function(e) {
                            return e = xl(e, Vl(Bn())),
                            Pt(function(t) {
                                var n = this;
                                return r(e, function(e) {
                                    return wl(e, n, t)
                                })
                            })
                        })
                    }
                    function wn(e, t) {
                        var n = (t = t === Hi ? " " : Ut(t)).length;
                        if (n < 2)
                            return n ? St(t, e) : t;
                        n = St(t, G(e / rs(t)));
                        return Xl(t) ? Yt(os(n), 0, e).join("") : n.slice(0, e)
                    }
                    function In(l, e, s, u) {
                        var c = 1 & e
                          , d = fn(l);
                        return function e() {
                            for (var t = -1, n = arguments.length, r = -1, o = u.length, i = S(o + n), a = this && this !== fl && this instanceof e ? d : l; ++r < o; )
                                i[r] = u[r];
                            for (; n--; )
                                i[r++] = arguments[++t];
                            return wl(a, c ? s : this, i)
                        }
                    }
                    function En(r) {
                        return function(e, t, n) {
                            return n && "number" != typeof n && Jn(e, t, n) && (t = n = Hi),
                            e = qo(e),
                            t === Hi ? (t = e,
                            e = 0) : t = qo(t),
                            function(e, t, n, r) {
                                for (var o = -1, i = W(G((t - e) / (n || 1)), 0), a = S(i); i--; )
                                    a[r ? i : ++o] = e,
                                    e += n;
                                return a
                            }(e, t, n = n === Hi ? e < t ? 1 : -1 : qo(n), r)
                        }
                    }
                    function Sn(n) {
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
                        return Xn(e) && ar(n, u),
                        n.placeholder = r,
                        ur(n, e, t)
                    }
                    function _n(e) {
                        var r = o[e];
                        return function(e, t) {
                            if (e = Yo(e),
                            (t = null == t ? 0 : q($o(t), 292)) && H(e)) {
                                var n = (Zo(e) + "e").split("e");
                                return +((n = (Zo(r(n[0] + "e" + (+n[1] + t))) + "e").split("e"))[0] + "e" + (+n[1] - t))
                            }
                            return r(e)
                        }
                    }
                    var Cn = ee && 1 / ns(new ee([, -0]))[1] == 1 / 0 ? function(e) {
                        return new ee(e)
                    }
                    : Ui;
                    function Tn(i) {
                        return function(e) {
                            var t, n, r, o = Wn(e);
                            return o == oa ? Ql(e) : o == ua ? (o = e,
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
                            throw new E(zi);
                        var u = r ? r.length : 0;
                        u || (t &= -97,
                        r = o = Hi),
                        a = a === Hi ? a : W($o(a), 0),
                        l = l === Hi ? l : $o(l),
                        u -= o ? o.length : 0,
                        64 & t && (m = r,
                        h = o,
                        r = o = Hi);
                        var c, d, f, p, m, h, v, g, y, b, w = s ? Hi : Mn(e), I = [e, t, n, r, o, m, h, i, a, l];
                        return w && (d = w,
                        p = (c = I)[1],
                        m = d[1],
                        i = (h = p | m) < 131,
                        a = m == qi && 8 == p || m == qi && 256 == p && c[7].length <= d[8] || 384 == m && d[7].length <= d[8] && 8 == p,
                        (i || a) && (1 & m && (c[2] = d[2],
                        h |= 1 & p ? 0 : 4),
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
                        c[1] = h)),
                        e = I[0],
                        t = I[1],
                        n = I[2],
                        r = I[3],
                        o = I[4],
                        !(l = I[9] = I[9] === Hi ? s ? 0 : e.length : W(I[9] - u, 0)) && 24 & t && (t &= -25),
                        n = t && 1 != t ? 8 == t || 16 == t ? pn(e, t, l) : 32 != t && 33 != t || o.length ? vn.apply(Hi, I) : In(e, t, n, r) : (g = n,
                        y = 1 & t,
                        b = fn(v = e),
                        function e() {
                            return (this && this !== fl && this instanceof e ? b : v).apply(y ? g : this, arguments)
                        }
                        ),
                        ur((w ? xt : ar)(n, I), e, t)
                    }
                    function Nn(e, t, n, r) {
                        return e === Hi || bo(e, m[n]) && !y.call(r, n) ? t : e
                    }
                    function On(e, t, n, r, o, i) {
                        return Lo(e) && Lo(t) && (i.set(t, e),
                        vt(e, t, Hi, On, i),
                        i.delete(t)),
                        e
                    }
                    function An(e) {
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
                          , f = 2 & n ? new Ee : Hi;
                        for (i.set(e, t),
                        i.set(t, e); ++c < l; ) {
                            var p, m = e[c], h = t[c];
                            if (r && (p = a ? r(h, m, c, t, e, i) : r(m, h, c, e, t, i)),
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
                            } else if (m !== h && !o(m, h, n, r, i)) {
                                d = !1;
                                break
                            }
                        }
                        return i.delete(e),
                        i.delete(t),
                        d
                    }
                    function Ln(e) {
                        return sr(rr(e, Hi, Sr), e + "")
                    }
                    function kn(e) {
                        return Xe(e, ci, zn)
                    }
                    function Dn(e) {
                        return Xe(e, di, Vn)
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
                    function Gn(e) {
                        return (y.call(pe, "placeholder") ? pe : e).placeholder
                    }
                    function Bn() {
                        var e = (e = pe.iteratee || Di) === Di ? ut : e;
                        return arguments.length ? e(arguments[0], arguments[1]) : e
                    }
                    function Fn(e, t) {
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
                    var zn = F ? function(t) {
                        return null == t ? [] : (t = h(t),
                        _l(F(t), function(e) {
                            return N.call(t, e)
                        }))
                    }
                    : Bi
                      , Vn = F ? function(e) {
                        for (var t = []; e; )
                            Nl(t, zn(e)),
                            e = T(e);
                        return t
                    }
                    : Bi
                      , Wn = Qe;
                    function qn(e, t, n) {
                        for (var r = -1, o = (t = $t(t, e)).length, i = !1; ++r < o; ) {
                            var a = hr(t[r]);
                            if (!(i = null != e && n(e, a)))
                                break;
                            e = e[a]
                        }
                        return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && Ro(o) && Yn(a, o) && (So(e) || Eo(e))
                    }
                    function $n(e) {
                        return "function" != typeof e.constructor || er(e) ? {} : me(T(e))
                    }
                    function Kn(e) {
                        return So(e) || Eo(e) || !!(A && e && e[A])
                    }
                    function Yn(e, t) {
                        var n = typeof e;
                        return !!(t = null == t ? $i : t) && ("number" == n || "symbol" != n && Xa.test(e)) && -1 < e && e % 1 == 0 && e < t
                    }
                    function Jn(e, t, n) {
                        if (Lo(n)) {
                            var r = typeof t;
                            return ("number" == r ? _o(n) && Yn(t, n.length) : "string" == r && t in n) && bo(n[t], e)
                        }
                    }
                    function Zn(e, t) {
                        if (!So(e)) {
                            var n = typeof e;
                            return "number" == n || "symbol" == n || "boolean" == n || null == e || jo(e) || (Da.test(e) || !ka.test(e) || null != t && e in h(t))
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
                    (Z && Wn(new Z(new ArrayBuffer(1))) != ma || X && Wn(new X) != oa || Q && Wn(Q.resolve()) != la || ee && Wn(new ee) != ua || te && Wn(new te) != fa) && (Wn = function(e) {
                        var t = Qe(e)
                          , e = t == aa ? e.constructor : Hi
                          , e = e ? vr(e) : "";
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
                    var Qn = a ? Oo : Fi;
                    function er(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || m)
                    }
                    function tr(e) {
                        return e == e && !Lo(e)
                    }
                    function nr(t, n) {
                        return function(e) {
                            return null != e && (e[t] === n && (n !== Hi || t in h(e)))
                        }
                    }
                    function rr(i, a, l) {
                        return a = W(a === Hi ? i.length - 1 : a, 0),
                        function() {
                            for (var e = arguments, t = -1, n = W(e.length - a, 0), r = S(n); ++t < n; )
                                r[t] = e[a + t];
                            t = -1;
                            for (var o = S(a + 1); ++t < a; )
                                o[t] = e[t];
                            return o[a] = l(r),
                            wl(i, this, o)
                        }
                    }
                    function or(e, t) {
                        return t.length < 2 ? e : Ze(e, At(t, 0, -1))
                    }
                    function ir(e, t) {
                        if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                            return e[t]
                    }
                    var ar = cr(xt)
                      , lr = U || function(e, t) {
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
                            e.replace(Fa, "{\n/* [wrapped with " + t + "] */\n")
                        }(t, (r = (t = (t = t).match(ja)) ? t[1].split(Ha) : [],
                        o = n,
                        El(Ji, function(e) {
                            var t = "_." + e[0];
                            o & e[1] && !Cl(r, t) && r.push(t)
                        }),
                        r.sort())))
                    }
                    function cr(n) {
                        var r = 0
                          , o = 0;
                        return function() {
                            var e = $()
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
                            var i = Et(n, o)
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
                    function hr(e) {
                        if ("string" == typeof e || jo(e))
                            return e;
                        var t = e + "";
                        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
                    }
                    function vr(e) {
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
                        return Co(e) ? Be(e, We(t, 1, Co, !0)) : []
                    })
                      , br = Pt(function(e, t) {
                        var n = xr(t);
                        return Co(n) && (n = Hi),
                        Co(e) ? Be(e, We(t, 1, Co, !0), Bn(n, 2)) : []
                    })
                      , wr = Pt(function(e, t) {
                        var n = xr(t);
                        return Co(n) && (n = Hi),
                        Co(e) ? Be(e, We(t, 1, Co, !0), Hi, n) : []
                    });
                    function Ir(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        n = null == n ? 0 : $o(n);
                        return n < 0 && (n = W(r + n, 0)),
                        kl(e, Bn(t, 3), n)
                    }
                    function Er(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r - 1;
                        return n !== Hi && (o = $o(n),
                        o = n < 0 ? W(r + o, 0) : q(o, r - 1)),
                        kl(e, Bn(t, 3), o, !0)
                    }
                    function Sr(e) {
                        return (null == e ? 0 : e.length) ? We(e, 1) : []
                    }
                    function Pr(e) {
                        return e && e.length ? e[0] : Hi
                    }
                    var _r = Pt(function(e) {
                        var t = xl(e, Wt);
                        return t.length && t[0] === e[0] ? rt(t) : []
                    })
                      , Cr = Pt(function(e) {
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
                    var Nr = Pt(Or);
                    function Or(e, t) {
                        return e && e.length && t && t.length ? wt(e, t) : e
                    }
                    var Ar = Ln(function(e, t) {
                        var n = null == e ? 0 : e.length
                          , r = ke(e, t);
                        return It(e, xl(t, function(e) {
                            return Yn(e, n) ? +e : e
                        }).sort(en)),
                        r
                    });
                    function Rr(e) {
                        return null == e ? e : J.call(e)
                    }
                    var Lr = Pt(function(e) {
                        return Gt(We(e, 1, Co, !0))
                    })
                      , kr = Pt(function(e) {
                        var t = xr(e);
                        return Co(t) && (t = Hi),
                        Gt(We(e, 1, Co, !0), Bn(t, 2))
                    })
                      , Dr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return Gt(We(e, 1, Co, !0), Hi, t)
                    });
                    function Mr(t) {
                        if (!t || !t.length)
                            return [];
                        var n = 0;
                        return t = _l(t, function(e) {
                            return Co(e) && (n = W(e.length, n),
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
                            return wl(t, Hi, e)
                        })
                    }
                    var Gr = Pt(function(e, t) {
                        return Co(e) ? Be(e, t) : []
                    })
                      , Br = Pt(function(e) {
                        return zt(_l(e, Co))
                    })
                      , Fr = Pt(function(e) {
                        var t = xr(e);
                        return Co(t) && (t = Hi),
                        zt(_l(e, Co), Bn(t, 2))
                    })
                      , jr = Pt(function(e) {
                        var t = "function" == typeof (t = xr(e)) ? t : Hi;
                        return zt(_l(e, Co), Hi, t)
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
                    var qr = Ln(function(t) {
                        function e(e) {
                            return ke(e, t)
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
                    var $r = an(function(e, t, n) {
                        y.call(e, n) ? ++e[n] : Le(e, n, 1)
                    });
                    var Kr = mn(Ir)
                      , Yr = mn(Er);
                    function Jr(e, t) {
                        return (So(e) ? El : Fe)(e, Bn(t, 3))
                    }
                    function Zr(e, t) {
                        return (So(e) ? Sl : je)(e, Bn(t, 3))
                    }
                    var Xr = an(function(e, t, n) {
                        y.call(e, n) ? e[n].push(t) : Le(e, n, [t])
                    });
                    var Qr = Pt(function(e, t, n) {
                        var r = -1
                          , o = "function" == typeof t
                          , i = _o(e) ? S(e.length) : [];
                        return Fe(e, function(e) {
                            i[++r] = o ? wl(t, e, n) : ot(e, t, n)
                        }),
                        i
                    })
                      , eo = an(function(e, t, n) {
                        Le(e, n, t)
                    });
                    function to(e, t) {
                        return (So(e) ? xl : pt)(e, Bn(t, 3))
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
                        return 1 < n && Jn(e, t[0], t[1]) ? t = [] : 2 < n && Jn(t[0], t[1], t[2]) && (t = [t[0]]),
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
                            throw new E(zi);
                        return e = $o(e),
                        function() {
                            return 0 < --e && (n = t.apply(this, arguments)),
                            e <= 1 && (t = Hi),
                            n
                        }
                    }
                    var lo = Pt(function(e, t, n) {
                        var r, o = 1;
                        return n.length && (r = ts(n, Gn(lo)),
                        o |= 32),
                        xn(e, o, t, n, r)
                    })
                      , so = Pt(function(e, t, n) {
                        var r, o = 3;
                        return n.length && (r = ts(n, Gn(so)),
                        o |= 32),
                        xn(t, o, e, n, r)
                    });
                    function uo(r, n, e) {
                        var o, i, a, l, s, u, c = 0, d = !1, f = !1, t = !0;
                        if ("function" != typeof r)
                            throw new E(zi);
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
                        function h() {
                            var e, t = oo();
                            if (m(t))
                                return v(t);
                            s = lr(h, (t = n - ((e = t) - u),
                            f ? q(t, a - (e - c)) : t))
                        }
                        function v(e) {
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
                                    s = lr(h, n),
                                    d ? p(t) : l;
                                if (f)
                                    return Jt(s),
                                    s = lr(h, n),
                                    p(u)
                            }
                            return s === Hi && (s = lr(h, n)),
                            l
                        }
                        return n = Yo(n) || 0,
                        Lo(e) && (d = !!e.leading,
                        f = "maxWait"in e,
                        a = f ? W(Yo(e.maxWait) || 0, n) : a,
                        t = "trailing"in e ? !!e.trailing : t),
                        g.cancel = function() {
                            s !== Hi && Jt(s),
                            c = 0,
                            o = u = i = s = Hi
                        }
                        ,
                        g.flush = function() {
                            return s === Hi ? l : v(oo())
                        }
                        ,
                        g
                    }
                    var co = Pt(function(e, t) {
                        return Ge(e, 1, t)
                    })
                      , fo = Pt(function(e, t, n) {
                        return Ge(e, Yo(t) || 0, n)
                    });
                    function po(r, o) {
                        if ("function" != typeof r || null != o && "function" != typeof o)
                            throw new E(zi);
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
                        return i.cache = new (po.Cache || Ie),
                        i
                    }
                    function mo(t) {
                        if ("function" != typeof t)
                            throw new E(zi);
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
                    po.Cache = Ie;
                    var ho = Kt(function(r, o) {
                        var i = (o = 1 == o.length && So(o[0]) ? xl(o[0], Vl(Bn())) : xl(We(o, 1), Vl(Bn()))).length;
                        return Pt(function(e) {
                            for (var t = -1, n = q(e.length, i); ++t < n; )
                                e[t] = o[t].call(this, e[t]);
                            return wl(r, this, e)
                        })
                    })
                      , vo = Pt(function(e, t) {
                        var n = ts(t, Gn(vo));
                        return xn(e, 32, Hi, t, n)
                    })
                      , go = Pt(function(e, t) {
                        var n = ts(t, Gn(go));
                        return xn(e, 64, Hi, t, n)
                    })
                      , yo = Ln(function(e, t) {
                        return xn(e, 256, Hi, Hi, Hi, t)
                    });
                    function bo(e, t) {
                        return e === t || e != e && t != t
                    }
                    var wo = Sn(et)
                      , Io = Sn(function(e, t) {
                        return t <= e
                    })
                      , Eo = it(function() {
                        return arguments
                    }()) ? it : function(e) {
                        return ko(e) && y.call(e, "callee") && !N.call(e, "callee")
                    }
                      , So = S.isArray
                      , Po = ml ? Vl(ml) : function(e) {
                        return ko(e) && Qe(e) == pa
                    }
                    ;
                    function _o(e) {
                        return null != e && Ro(e.length) && !Oo(e)
                    }
                    function Co(e) {
                        return ko(e) && _o(e)
                    }
                    var To = j || Fi
                      , xo = hl ? Vl(hl) : function(e) {
                        return ko(e) && Qe(e) == ea
                    }
                    ;
                    function No(e) {
                        if (!ko(e))
                            return !1;
                        var t = Qe(e);
                        return t == ta || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !Uo(e)
                    }
                    function Oo(e) {
                        if (!Lo(e))
                            return !1;
                        e = Qe(e);
                        return e == na || e == ra || "[object AsyncFunction]" == e || "[object Proxy]" == e
                    }
                    function Ao(e) {
                        return "number" == typeof e && e == $o(e)
                    }
                    function Ro(e) {
                        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= $i
                    }
                    function Lo(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t)
                    }
                    function ko(e) {
                        return null != e && "object" == typeof e
                    }
                    var Do = vl ? Vl(vl) : function(e) {
                        return ko(e) && Wn(e) == oa
                    }
                    ;
                    function Mo(e) {
                        return "number" == typeof e || ko(e) && Qe(e) == ia
                    }
                    function Uo(e) {
                        if (!ko(e) || Qe(e) != aa)
                            return !1;
                        e = T(e);
                        if (null === e)
                            return !0;
                        e = y.call(e, "constructor") && e.constructor;
                        return "function" == typeof e && e instanceof e && l.call(e) == g
                    }
                    var Go = gl ? Vl(gl) : function(e) {
                        return ko(e) && Qe(e) == sa
                    }
                    ;
                    var Bo = yl ? Vl(yl) : function(e) {
                        return ko(e) && Wn(e) == ua
                    }
                    ;
                    function Fo(e) {
                        return "string" == typeof e || !So(e) && ko(e) && Qe(e) == ca
                    }
                    function jo(e) {
                        return "symbol" == typeof e || ko(e) && Qe(e) == da
                    }
                    var Ho = bl ? Vl(bl) : function(e) {
                        return ko(e) && Ro(e.length) && !!sl[Qe(e)]
                    }
                    ;
                    var zo = Sn(ft)
                      , Vo = Sn(function(e, t) {
                        return e <= t
                    });
                    function Wo(e) {
                        if (!e)
                            return [];
                        if (_o(e))
                            return (Fo(e) ? os : rn)(e);
                        if (R && e[R])
                            return function(e) {
                                for (var t, n = []; !(t = e.next()).done; )
                                    n.push(t.value);
                                return n
                            }(e[R]());
                        var t = Wn(e);
                        return (t == oa ? Ql : t == ua ? ns : bi)(e)
                    }
                    function qo(e) {
                        return e ? (e = Yo(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
                    }
                    function $o(e) {
                        var t = qo(e)
                          , e = t % 1;
                        return t == t ? e ? t - e : t : 0
                    }
                    function Ko(e) {
                        return e ? De($o(e), 0, Yi) : 0
                    }
                    function Yo(e) {
                        if ("number" == typeof e)
                            return e;
                        if (jo(e))
                            return Ki;
                        if (Lo(e) && (e = Lo(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t),
                        "string" != typeof e)
                            return 0 === e ? e : +e;
                        e = zl(e);
                        var t = Ya.test(e);
                        return t || Za.test(e) ? dl(e.slice(2), t ? 2 : 8) : Ka.test(e) ? Ki : +e
                    }
                    function Jo(e) {
                        return on(e, di(e))
                    }
                    function Zo(e) {
                        return null == e ? "" : Ut(e)
                    }
                    var Xo = ln(function(e, t) {
                        if (er(t) || _o(t))
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
                      , ni = Ln(ke);
                    var ri = Pt(function(e, t) {
                        e = h(e);
                        var n = -1
                          , r = t.length
                          , o = 2 < r ? t[2] : Hi;
                        for (o && Jn(t[0], t[1], o) && (r = 1); ++n < r; )
                            for (var i = t[n], a = di(i), l = -1, s = a.length; ++l < s; ) {
                                var u = a[l]
                                  , c = e[u];
                                (c === Hi || bo(c, m[u]) && !y.call(e, u)) && (e[u] = i[u])
                            }
                        return e
                    })
                      , oi = Pt(function(e) {
                        return e.push(Hi, On),
                        wl(pi, Hi, e)
                    });
                    function ii(e, t, n) {
                        t = null == e ? Hi : Ze(e, t);
                        return t === Hi ? n : t
                    }
                    function ai(e, t) {
                        return null != e && qn(e, t, nt)
                    }
                    var li = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = v.call(t)),
                        e[t] = n
                    }, Ri(ki))
                      , si = gn(function(e, t, n) {
                        null != t && "function" != typeof t.toString && (t = v.call(t)),
                        y.call(e, t) ? e[t].push(n) : e[t] = [n]
                    }, Bn)
                      , ui = Pt(ot);
                    function ci(e) {
                        return (_o(e) ? Pe : ct)(e)
                    }
                    function di(e) {
                        return _o(e) ? Pe(e, !0) : dt(e)
                    }
                    var fi = ln(function(e, t, n) {
                        vt(e, t, n)
                    })
                      , pi = ln(function(e, t, n, r) {
                        vt(e, t, n, r)
                    })
                      , mi = Ln(function(t, e) {
                        var n = {};
                        if (null == t)
                            return n;
                        var r = !1;
                        e = xl(e, function(e) {
                            return e = $t(e, t),
                            r = r || 1 < e.length,
                            e
                        }),
                        on(t, Dn(t), n),
                        r && (n = Me(n, 7, An));
                        for (var o = e.length; o--; )
                            Bt(n, e[o]);
                        return n
                    });
                    var hi = Ln(function(e, t) {
                        return null == e ? {} : bt(n = e, t, function(e, t) {
                            return ai(n, t)
                        });
                        var n
                    });
                    function vi(e, n) {
                        if (null == e)
                            return {};
                        var t = xl(Dn(e), function(e) {
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
                    var wi = dn(function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? Ii(t) : t)
                    });
                    function Ii(e) {
                        return Ni(Zo(e).toLowerCase())
                    }
                    function Ei(e) {
                        return (e = Zo(e)) && e.replace(Qa, Yl).replace(rl, "")
                    }
                    var Si = dn(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , Pi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toLowerCase()
                    })
                      , _i = cn("toLowerCase");
                    var Ci = dn(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    });
                    var Ti = dn(function(e, t, n) {
                        return e + (n ? " " : "") + Ni(t)
                    });
                    var xi = dn(function(e, t, n) {
                        return e + (n ? " " : "") + t.toUpperCase()
                    })
                      , Ni = cn("toUpperCase");
                    function Oi(e, t, n) {
                        return e = Zo(e),
                        (t = n ? Hi : t) === Hi ? (n = e,
                        il.test(n) ? e.match(ol) || [] : e.match(za) || []) : e.match(t) || []
                    }
                    var Ai = Pt(function(e, t) {
                        try {
                            return wl(e, Hi, t)
                        } catch (e) {
                            return No(e) ? e : new d(e)
                        }
                    })
                      , r = Ln(function(t, e) {
                        return El(e, function(e) {
                            e = hr(e),
                            Le(t, e, lo(t[e], t))
                        }),
                        t
                    });
                    function Ri(e) {
                        return function() {
                            return e
                        }
                    }
                    var Li = hn()
                      , I = hn(!0);
                    function ki(e) {
                        return e
                    }
                    function Di(e) {
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
                          , o = Je(t, n);
                        null != e || Lo(t) && (o.length || !n.length) || (e = t,
                        t = r,
                        r = this,
                        o = Je(t, ci(t)));
                        var i = !(Lo(e) && "chain"in e && !e.chain)
                          , a = Oo(r);
                        return El(o, function(e) {
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
                    function Ui() {}
                    P = bn(xl),
                    ce = bn(Pl),
                    D = bn(Rl);
                    function Gi(e) {
                        return Zn(e) ? Bl(hr(e)) : (t = e,
                        function(e) {
                            return Ze(e, t)
                        }
                        );
                        var t
                    }
                    Z = En(),
                    Q = En(!0);
                    function Bi() {
                        return []
                    }
                    function Fi() {
                        return !1
                    }
                    te = yn(function(e, t) {
                        return e + t
                    }, 0),
                    a = _n("ceil"),
                    U = yn(function(e, t) {
                        return e / t
                    }, 1),
                    Nt = _n("floor");
                    var ji, M = yn(function(e, t) {
                        return e * t
                    }, 1), Kt = _n("round"), j = yn(function(e, t) {
                        return e - t
                    }, 0);
                    return pe.after = function(e, t) {
                        if ("function" != typeof t)
                            throw new E(zi);
                        return e = $o(e),
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    ,
                    pe.ary = io,
                    pe.assign = Xo,
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
                        return So(e) ? e : [e]
                    }
                    ,
                    pe.chain = Vr,
                    pe.chunk = function(e, t, n) {
                        t = (n ? Jn(e, t, n) : t === Hi) ? 1 : W($o(t), 0);
                        var r = null == e ? 0 : e.length;
                        if (!r || t < 1)
                            return [];
                        for (var o = 0, i = 0, a = S(G(r / t)); o < r; )
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
                        for (var t = S(e - 1), n = arguments[0], r = e; r--; )
                            t[r - 1] = arguments[r];
                        return Nl(So(n) ? rn(n) : [n], We(t, 1))
                    }
                    ,
                    pe.cond = function(r) {
                        var o = null == r ? 0 : r.length
                          , t = Bn();
                        return r = o ? xl(r, function(e) {
                            if ("function" != typeof e[1])
                                throw new E(zi);
                            return [t(e[0]), e[1]]
                        }) : [],
                        Pt(function(e) {
                            for (var t = -1; ++t < o; ) {
                                var n = r[t];
                                if (wl(n[0], this, e))
                                    return wl(n[1], this, e)
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
                    pe.countBy = $r,
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
                    pe.differenceWith = wr,
                    pe.drop = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? At(e, (t = n || t === Hi ? 1 : $o(t)) < 0 ? 0 : t, r) : []
                    }
                    ,
                    pe.dropRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? At(e, 0, (t = r - (t = n || t === Hi ? 1 : $o(t))) < 0 ? 0 : t) : []
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
                        return o ? (n && "number" != typeof n && Jn(e, t, n) && (n = 0,
                        r = o),
                        function(e, t, n, r) {
                            var o = e.length;
                            for ((n = $o(n)) < 0 && (n = o < -n ? 0 : o + n),
                            (r = r === Hi || o < r ? o : $o(r)) < 0 && (r += o),
                            r = r < n ? 0 : Ko(r); n < r; )
                                e[n++] = t;
                            return e
                        }(e, t, n, r)) : []
                    }
                    ,
                    pe.filter = function(e, t) {
                        return (So(e) ? _l : Ve)(e, Bn(t, 3))
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
                        return n = n === Hi ? 1 : $o(n),
                        We(to(e, t), n)
                    }
                    ,
                    pe.flatten = Sr,
                    pe.flattenDeep = function(e) {
                        return (null == e ? 0 : e.length) ? We(e, 1 / 0) : []
                    }
                    ,
                    pe.flattenDepth = function(e, t) {
                        return (null == e ? 0 : e.length) ? We(e, t = t === Hi ? 1 : $o(t)) : []
                    }
                    ,
                    pe.flip = function(e) {
                        return xn(e, 512)
                    }
                    ,
                    pe.flow = Li,
                    pe.flowRight = I,
                    pe.fromPairs = function(e) {
                        for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n; ) {
                            var o = e[t];
                            r[o[0]] = o[1]
                        }
                        return r
                    }
                    ,
                    pe.functions = function(e) {
                        return null == e ? [] : Je(e, ci(e))
                    }
                    ,
                    pe.functionsIn = function(e) {
                        return null == e ? [] : Je(e, di(e))
                    }
                    ,
                    pe.groupBy = Xr,
                    pe.initial = function(e) {
                        return (null == e ? 0 : e.length) ? At(e, 0, -1) : []
                    }
                    ,
                    pe.intersection = _r,
                    pe.intersectionBy = Cr,
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
                            Le(o, r(e, t, n), e)
                        }),
                        o
                    }
                    ,
                    pe.mapValues = function(e, r) {
                        var o = {};
                        return r = Bn(r, 3),
                        Ke(e, function(e, t, n) {
                            Le(o, t, r(e, t, n))
                        }),
                        o
                    }
                    ,
                    pe.matches = function(e) {
                        return mt(Me(e, 1))
                    }
                    ,
                    pe.matchesProperty = function(e, t) {
                        return ht(e, Me(t, 1))
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
                        return t = $o(t),
                        Pt(function(e) {
                            return gt(e, t)
                        })
                    }
                    ,
                    pe.omit = mi,
                    pe.omitBy = function(e, t) {
                        return vi(e, mo(Bn(t)))
                    }
                    ,
                    pe.once = function(e) {
                        return ao(2, e)
                    }
                    ,
                    pe.orderBy = function(e, t, n, r) {
                        return null == e ? [] : (So(t) || (t = null == t ? [] : [t]),
                        So(n = r ? Hi : n) || (n = null == n ? [] : [n]),
                        yt(e, t, n))
                    }
                    ,
                    pe.over = P,
                    pe.overArgs = ho,
                    pe.overEvery = ce,
                    pe.overSome = D,
                    pe.partial = vo,
                    pe.partialRight = go,
                    pe.partition = no,
                    pe.pick = hi,
                    pe.pickBy = vi,
                    pe.property = Gi,
                    pe.propertyOf = function(t) {
                        return function(e) {
                            return null == t ? Hi : Ze(t, e)
                        }
                    }
                    ,
                    pe.pull = Nr,
                    pe.pullAll = Or,
                    pe.pullAllBy = function(e, t, n) {
                        return e && e.length && t && t.length ? wt(e, t, Bn(n, 2)) : e
                    }
                    ,
                    pe.pullAllWith = function(e, t, n) {
                        return e && e.length && t && t.length ? wt(e, t, Hi, n) : e
                    }
                    ,
                    pe.pullAt = Ar,
                    pe.range = Z,
                    pe.rangeRight = Q,
                    pe.rearg = yo,
                    pe.reject = function(e, t) {
                        return (So(e) ? _l : Ve)(e, mo(Bn(t, 3)))
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
                        return It(e, o),
                        n
                    }
                    ,
                    pe.rest = function(e, t) {
                        if ("function" != typeof e)
                            throw new E(zi);
                        return Pt(e, t = t === Hi ? t : $o(t))
                    }
                    ,
                    pe.reverse = Rr,
                    pe.sampleSize = function(e, t, n) {
                        return t = (n ? Jn(e, t, n) : t === Hi) ? 1 : $o(t),
                        (So(e) ? Ce : Ct)(e, t)
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
                        return (So(e) ? Te : Ot)(e)
                    }
                    ,
                    pe.slice = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? (n = n && "number" != typeof n && Jn(e, t, n) ? (t = 0,
                        r) : (t = null == t ? 0 : $o(t),
                        n === Hi ? r : $o(n)),
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
                        return n && "number" != typeof n && Jn(e, t, n) && (t = n = Hi),
                        (n = n === Hi ? Yi : n >>> 0) ? (e = Zo(e)) && ("string" == typeof t || null != t && !Go(t)) && !(t = Ut(t)) && Xl(e) ? Yt(os(e), 0, n) : e.split(t, n) : []
                    }
                    ,
                    pe.spread = function(n, r) {
                        if ("function" != typeof n)
                            throw new E(zi);
                        return r = null == r ? 0 : W($o(r), 0),
                        Pt(function(e) {
                            var t = e[r]
                              , e = Yt(e, 0, r);
                            return t && Nl(e, t),
                            wl(n, this, e)
                        })
                    }
                    ,
                    pe.tail = function(e) {
                        var t = null == e ? 0 : e.length;
                        return t ? At(e, 1, t) : []
                    }
                    ,
                    pe.take = function(e, t, n) {
                        return e && e.length ? At(e, 0, (t = n || t === Hi ? 1 : $o(t)) < 0 ? 0 : t) : []
                    }
                    ,
                    pe.takeRight = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? At(e, (t = r - (t = n || t === Hi ? 1 : $o(t))) < 0 ? 0 : t, r) : []
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
                            throw new E(zi);
                        return Lo(n) && (r = "leading"in n ? !!n.leading : r,
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
                        return So(e) ? xl(e, hr) : jo(e) ? [e] : rn(mr(Zo(e)))
                    }
                    ,
                    pe.toPlainObject = Jo,
                    pe.transform = function(e, r, o) {
                        var t, n = So(e), i = n || To(e) || Ho(e);
                        return r = Bn(r, 4),
                        null == o && (t = e && e.constructor,
                        o = i ? n ? new t : [] : Lo(e) && Oo(t) ? me(T(e)) : {}),
                        (i ? El : Ke)(e, function(e, t, n) {
                            return r(o, e, t, n)
                        }),
                        o
                    }
                    ,
                    pe.unary = function(e) {
                        return io(e, 1)
                    }
                    ,
                    pe.union = Lr,
                    pe.unionBy = kr,
                    pe.unionWith = Dr,
                    pe.uniq = function(e) {
                        return e && e.length ? Gt(e) : []
                    }
                    ,
                    pe.uniqBy = function(e, t) {
                        return e && e.length ? Gt(e, Bn(t, 2)) : []
                    }
                    ,
                    pe.uniqWith = function(e, t) {
                        return t = "function" == typeof t ? t : Hi,
                        e && e.length ? Gt(e, Hi, t) : []
                    }
                    ,
                    pe.unset = function(e, t) {
                        return null == e || Bt(e, t)
                    }
                    ,
                    pe.unzip = Mr,
                    pe.unzipWith = Ur,
                    pe.update = function(e, t, n) {
                        return null == e ? e : Ft(e, t, qt(n))
                    }
                    ,
                    pe.updateWith = function(e, t, n, r) {
                        return r = "function" == typeof r ? r : Hi,
                        null == e ? e : Ft(e, t, qt(n), r)
                    }
                    ,
                    pe.values = bi,
                    pe.valuesIn = function(e) {
                        return null == e ? [] : Wl(e, di(e))
                    }
                    ,
                    pe.without = Gr,
                    pe.words = Oi,
                    pe.wrap = function(e, t) {
                        return vo(qt(t), e)
                    }
                    ,
                    pe.xor = Br,
                    pe.xorBy = Fr,
                    pe.xorWith = jr,
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
                    pe.entries = gi,
                    pe.entriesIn = yi,
                    pe.extend = Qo,
                    pe.extendWith = ei,
                    Mi(pe, pe),
                    pe.add = te,
                    pe.attempt = Ai,
                    pe.camelCase = wi,
                    pe.capitalize = Ii,
                    pe.ceil = a,
                    pe.clamp = function(e, t, n) {
                        return n === Hi && (n = t,
                        t = Hi),
                        n !== Hi && (n = (n = Yo(n)) == n ? n : 0),
                        t !== Hi && (t = (t = Yo(t)) == t ? t : 0),
                        De(Yo(e), t, n)
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
                    pe.deburr = Ei,
                    pe.defaultTo = function(e, t) {
                        return null == e || e != e ? t : e
                    }
                    ,
                    pe.divide = U,
                    pe.endsWith = function(e, t, n) {
                        e = Zo(e),
                        t = Ut(t);
                        var r = e.length
                          , r = n = n === Hi ? r : De($o(n), 0, r);
                        return 0 <= (n -= t.length) && e.slice(n, r) == t
                    }
                    ,
                    pe.eq = bo,
                    pe.escape = function(e) {
                        return (e = Zo(e)) && Oa.test(e) ? e.replace(xa, Jl) : e
                    }
                    ,
                    pe.escapeRegExp = function(e) {
                        return (e = Zo(e)) && Ga.test(e) ? e.replace(Ua, "\\$&") : e
                    }
                    ,
                    pe.every = function(e, t, n) {
                        var r = So(e) ? Pl : He;
                        return n && Jn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.find = Kr,
                    pe.findIndex = Ir,
                    pe.findKey = function(e, t) {
                        return Ll(e, Bn(t, 3), Ke)
                    }
                    ,
                    pe.findLast = Yr,
                    pe.findLastIndex = Er,
                    pe.findLastKey = function(e, t) {
                        return Ll(e, Bn(t, 3), Ye)
                    }
                    ,
                    pe.floor = Nt,
                    pe.forEach = Jr,
                    pe.forEachRight = Zr,
                    pe.forIn = function(e, t) {
                        return null == e ? e : qe(e, Bn(t, 3), di)
                    }
                    ,
                    pe.forInRight = function(e, t) {
                        return null == e ? e : $e(e, Bn(t, 3), di)
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
                    pe.get = ii,
                    pe.gt = wo,
                    pe.gte = Io,
                    pe.has = function(e, t) {
                        return null != e && qn(e, t, tt)
                    }
                    ,
                    pe.hasIn = ai,
                    pe.head = Pr,
                    pe.identity = ki,
                    pe.includes = function(e, t, n, r) {
                        return e = _o(e) ? e : bi(e),
                        n = n && !r ? $o(n) : 0,
                        r = e.length,
                        n < 0 && (n = W(r + n, 0)),
                        Fo(e) ? n <= r && -1 < e.indexOf(t, n) : !!r && -1 < Dl(e, t, n)
                    }
                    ,
                    pe.indexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        return r ? ((n = null == n ? 0 : $o(n)) < 0 && (n = W(r + n, 0)),
                        Dl(e, t, n)) : -1
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
                    pe.isArguments = Eo,
                    pe.isArray = So,
                    pe.isArrayBuffer = Po,
                    pe.isArrayLike = _o,
                    pe.isArrayLikeObject = Co,
                    pe.isBoolean = function(e) {
                        return !0 === e || !1 === e || ko(e) && Qe(e) == Qi
                    }
                    ,
                    pe.isBuffer = To,
                    pe.isDate = xo,
                    pe.isElement = function(e) {
                        return ko(e) && 1 === e.nodeType && !Uo(e)
                    }
                    ,
                    pe.isEmpty = function(e) {
                        if (null == e)
                            return !0;
                        if (_o(e) && (So(e) || "string" == typeof e || "function" == typeof e.splice || To(e) || Ho(e) || Eo(e)))
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
                    pe.isError = No,
                    pe.isFinite = function(e) {
                        return "number" == typeof e && H(e)
                    }
                    ,
                    pe.isFunction = Oo,
                    pe.isInteger = Ao,
                    pe.isLength = Ro,
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
                    pe.isObject = Lo,
                    pe.isObjectLike = ko,
                    pe.isPlainObject = Uo,
                    pe.isRegExp = Go,
                    pe.isSafeInteger = function(e) {
                        return Ao(e) && -$i <= e && e <= $i
                    }
                    ,
                    pe.isSet = Bo,
                    pe.isString = Fo,
                    pe.isSymbol = jo,
                    pe.isTypedArray = Ho,
                    pe.isUndefined = function(e) {
                        return e === Hi
                    }
                    ,
                    pe.isWeakMap = function(e) {
                        return ko(e) && Wn(e) == fa
                    }
                    ,
                    pe.isWeakSet = function(e) {
                        return ko(e) && "[object WeakSet]" == Qe(e)
                    }
                    ,
                    pe.join = function(e, t) {
                        return null == e ? "" : z.call(e, t)
                    }
                    ,
                    pe.kebabCase = Si,
                    pe.last = xr,
                    pe.lastIndexOf = function(e, t, n) {
                        var r = null == e ? 0 : e.length;
                        if (!r)
                            return -1;
                        var o = r;
                        return n !== Hi && (o = (o = $o(n)) < 0 ? W(r + o, 0) : q(o, r - 1)),
                        t == t ? function(e, t, n) {
                            for (var r = n + 1; r--; )
                                if (e[r] === t)
                                    return r;
                            return r
                        }(e, t, o) : kl(e, Ul, o, !0)
                    }
                    ,
                    pe.lowerCase = Pi,
                    pe.lowerFirst = _i,
                    pe.lt = zo,
                    pe.lte = Vo,
                    pe.max = function(e) {
                        return e && e.length ? ze(e, ki, et) : Hi
                    }
                    ,
                    pe.maxBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), et) : Hi
                    }
                    ,
                    pe.mean = function(e) {
                        return Gl(e, ki)
                    }
                    ,
                    pe.meanBy = function(e, t) {
                        return Gl(e, Bn(t, 2))
                    }
                    ,
                    pe.min = function(e) {
                        return e && e.length ? ze(e, ki, ft) : Hi
                    }
                    ,
                    pe.minBy = function(e, t) {
                        return e && e.length ? ze(e, Bn(t, 2), ft) : Hi
                    }
                    ,
                    pe.stubArray = Bi,
                    pe.stubFalse = Fi,
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
                        return e && e.length ? gt(e, $o(t)) : Hi
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
                        var r = (t = $o(t)) ? rs(e) : 0;
                        return !t || t <= r ? e : wn(B(r = (t - r) / 2), n) + e + wn(G(r), n)
                    }
                    ,
                    pe.padEnd = function(e, t, n) {
                        e = Zo(e);
                        var r = (t = $o(t)) ? rs(e) : 0;
                        return t && r < t ? e + wn(t - r, n) : e
                    }
                    ,
                    pe.padStart = function(e, t, n) {
                        e = Zo(e);
                        var r = (t = $o(t)) ? rs(e) : 0;
                        return t && r < t ? wn(t - r, n) + e : e
                    }
                    ,
                    pe.parseInt = function(e, t, n) {
                        return t = n || null == t ? 0 : t && +t,
                        K(Zo(e).replace(Ba, ""), t || 0)
                    }
                    ,
                    pe.random = function(e, t, n) {
                        var r;
                        if (n && "boolean" != typeof n && Jn(e, t, n) && (t = n = Hi),
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
                        return Et(e, t)
                    }
                    ,
                    pe.reduce = function(e, t, n) {
                        var r = So(e) ? Ol : Fl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, Fe)
                    }
                    ,
                    pe.reduceRight = function(e, t, n) {
                        var r = So(e) ? Al : Fl
                          , o = arguments.length < 3;
                        return r(e, Bn(t, 4), n, o, je)
                    }
                    ,
                    pe.repeat = function(e, t, n) {
                        return t = (n ? Jn(e, t, n) : t === Hi) ? 1 : $o(t),
                        St(Zo(e), t)
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
                          , o = (t = $t(t, e)).length;
                        for (o || (o = 1,
                        e = Hi); ++r < o; ) {
                            var i = null == e ? Hi : e[hr(t[r])];
                            i === Hi && (r = o,
                            i = n),
                            e = Oo(i) ? i.call(e) : i
                        }
                        return e
                    }
                    ,
                    pe.round = Kt,
                    pe.runInContext = e,
                    pe.sample = function(e) {
                        return (So(e) ? _e : _t)(e)
                    }
                    ,
                    pe.size = function(e) {
                        if (null == e)
                            return 0;
                        if (_o(e))
                            return Fo(e) ? rs(e) : e.length;
                        var t = Wn(e);
                        return t == oa || t == ua ? e.size : ct(e).length
                    }
                    ,
                    pe.snakeCase = Ci,
                    pe.some = function(e, t, n) {
                        var r = So(e) ? Rl : Rt;
                        return n && Jn(e, t, n) && (t = Hi),
                        r(e, Bn(t, 3))
                    }
                    ,
                    pe.sortedIndex = function(e, t) {
                        return Lt(e, t)
                    }
                    ,
                    pe.sortedIndexBy = function(e, t, n) {
                        return kt(e, t, Bn(n, 2))
                    }
                    ,
                    pe.sortedIndexOf = function(e, t) {
                        var n = null == e ? 0 : e.length;
                        if (n) {
                            var r = Lt(e, t);
                            if (r < n && bo(e[r], t))
                                return r
                        }
                        return -1
                    }
                    ,
                    pe.sortedLastIndex = function(e, t) {
                        return Lt(e, t, !0)
                    }
                    ,
                    pe.sortedLastIndexBy = function(e, t, n) {
                        return kt(e, t, Bn(n, 2), !0)
                    }
                    ,
                    pe.sortedLastIndexOf = function(e, t) {
                        if (null == e ? 0 : e.length) {
                            var n = Lt(e, t, !0) - 1;
                            if (bo(e[n], t))
                                return n
                        }
                        return -1
                    }
                    ,
                    pe.startCase = Ti,
                    pe.startsWith = function(e, t, n) {
                        return e = Zo(e),
                        n = null == n ? 0 : De($o(n), 0, e.length),
                        t = Ut(t),
                        e.slice(n, n + t.length) == t
                    }
                    ,
                    pe.subtract = j,
                    pe.sum = function(e) {
                        return e && e.length ? jl(e, ki) : 0
                    }
                    ,
                    pe.sumBy = function(e, t) {
                        return e && e.length ? jl(e, Bn(t, 2)) : 0
                    }
                    ,
                    pe.template = function(a, e, t) {
                        var n = pe.templateSettings;
                        t && Jn(a, e, t) && (e = Hi),
                        a = Zo(a),
                        e = ei({}, e, n, Nn);
                        var l, s, r = ci(n = ei({}, e.imports, n.imports, Nn)), o = Wl(n, r), u = 0, n = e.interpolate || el, c = "__p += '", n = p((e.escape || el).source + "|" + n.source + "|" + (n === La ? qa : el).source + "|" + (e.evaluate || el).source + "|$", "g"), i = "//# sourceURL=" + (y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ll + "]") + "\n";
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
                        if (c = (s ? c.replace(Pa, "") : c).replace(_a, "$1").replace(Ca, "$1;"),
                        c = "function(" + (e || "obj") + ") {\n" + (e ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}",
                        (e = Ai(function() {
                            return f(r, i + "return " + c).apply(Hi, o)
                        })).source = c,
                        No(e))
                            throw e;
                        return e
                    }
                    ,
                    pe.times = function(e, t) {
                        if ((e = $o(e)) < 1 || $i < e)
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
                    pe.toInteger = $o,
                    pe.toLength = Ko,
                    pe.toLower = function(e) {
                        return Zo(e).toLowerCase()
                    }
                    ,
                    pe.toNumber = Yo,
                    pe.toSafeInteger = function(e) {
                        return e ? De($o(e), -$i, $i) : 0 === e ? e : 0
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
                        Yt(e, $l(e, t), Kl(e, t) + 1).join("")) : e
                    }
                    ,
                    pe.trimEnd = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.slice(0, is(e) + 1) : e && (t = Ut(t)) ? Yt(e = os(e), 0, Kl(e, os(t)) + 1).join("") : e
                    }
                    ,
                    pe.trimStart = function(e, t, n) {
                        return (e = Zo(e)) && (n || t === Hi) ? e.replace(Ba, "") : e && (t = Ut(t)) ? Yt(e = os(e), $l(e, os(t))).join("") : e
                    }
                    ,
                    pe.truncate = function(e, t) {
                        var n, r = 30, o = "...";
                        Lo(t) && (n = "separator"in t ? t.separator : n,
                        r = "length"in t ? $o(t.length) : r,
                        o = "omission"in t ? Ut(t.omission) : o);
                        var i, t = (e = Zo(e)).length;
                        if (Xl(e) && (t = (i = os(e)).length),
                        t <= r)
                            return e;
                        if ((t = r - rs(o)) < 1)
                            return o;
                        if (r = i ? Yt(i, 0, t).join("") : e.slice(0, t),
                        n === Hi)
                            return r + o;
                        if (i && (t += r.length - t),
                        Go(n)) {
                            if (e.slice(t).search(n)) {
                                var a, l = r;
                                for (n.global || (n = p(n.source, Zo($a.exec(n)) + "g")),
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
                        return (e = Zo(e)) && Na.test(e) ? e.replace(Ta, as) : e
                    }
                    ,
                    pe.uniqueId = function(e) {
                        var t = ++s;
                        return Zo(e) + t
                    }
                    ,
                    pe.upperCase = xi,
                    pe.upperFirst = Ni,
                    pe.each = Jr,
                    pe.eachRight = Zr,
                    pe.first = Pr,
                    Mi(pe, (ji = {},
                    Ke(pe, function(e, t) {
                        y.call(pe.prototype, t) || (ji[t] = e)
                    }),
                    ji), {
                        chain: !1
                    }),
                    pe.VERSION = "4.17.21",
                    El(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        pe[e].placeholder = pe
                    }),
                    El(["drop", "take"], function(n, r) {
                        ye.prototype[n] = function(e) {
                            e = e === Hi ? 1 : W($o(e), 0);
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
                    El(["filter", "map", "takeWhile"], function(e, t) {
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
                    El(["head", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        ye.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    El(["initial", "tail"], function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        ye.prototype[e] = function() {
                            return this.__filtered__ ? new ye(this) : this[n](1)
                        }
                    }),
                    ye.prototype.compact = function() {
                        return this.filter(ki)
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
                        e = $o(e);
                        var n = this;
                        return n.__filtered__ && (0 < e || t < 0) ? new ye(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)),
                        t !== Hi && (n = (t = $o(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
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
                    Ke(ye.prototype, function(u, e) {
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
                              , i = r || So(t);
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
                    El(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                        var n = i[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , o = /^(?:pop|shift)$/.test(e);
                        pe.prototype[e] = function() {
                            var t = arguments;
                            if (!o || this.__chain__)
                                return this[r](function(e) {
                                    return n.apply(So(e) ? e : [], t)
                                });
                            var e = this.value();
                            return n.apply(So(e) ? e : [], t)
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
                    oe[vn(Hi, 2).name] = [{
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
                          , n = So(e)
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
                            for (var m = -1, h = e[s += t]; ++m < c; ) {
                                var v = u[m]
                                  , g = v.iteratee
                                  , v = v.type
                                  , g = g(h);
                                if (2 == v)
                                    h = g;
                                else if (!g) {
                                    if (1 == v)
                                        continue e;
                                    break e
                                }
                            }
                            p[d++] = h
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
                        for (var t, n = this; n instanceof ve; ) {
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
                (L = function() {
                    return ls
                }
                .call(A, R, A, O)) === Hi || (O.exports = L)
            }
            .call(this)
        }
    }
      , r = {};
    function zi(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, zi),
        t.loaded = !0,
        t.exports
    }
    zi.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return zi.d(t, {
            a: t
        }),
        t
    }
    ,
    zi.d = function(e, t) {
        for (var n in t)
            zi.o(t, n) && !zi.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    zi.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    zi.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    zi.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        var w, I, q, k, D, M, $ = React, K = zi.n($), e = ReactDOM, A = CoreUtilities, p = ReactUtilities, E = CoreRobloxUtilities, S = window.EventTracker ? EventTracker : {
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
        }, _ = {
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
        }, C = {
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
        (ve = w = w || {}).Game = "Game",
        ve.CatalogAsset = "CatalogAsset",
        ve.CatalogBundle = "CatalogBundle",
        (Ze = I = I || {}).Carousel = "Carousel",
        Ze.AvatarCarousel = "AvatarCarousel",
        Ze.SortlessGrid = "SortlessGrid",
        Ze.FriendCarousel = "FriendCarousel",
        Ze.InterestGrid = "InterestGrid",
        Ze.Pills = "Pills",
        (Xe = {}).Sponsored = "Sponsored",
        Xe.SponsoredGame = "SponsoredGame",
        (ot = q = q || {}).AppGameTileNoMetadata = "AppGameTileNoMetadata",
        ot.GridTile = "GridTile",
        ot.EventTile = "EventTile",
        ot.InterestTile = "InterestTile",
        ot.ExperienceEventsTile = "ExperienceEventsTile",
        (ee = k = k || {}).Always = "Always",
        ee.Hover = "Hover",
        ee.Footer = "Footer",
        (re = D = D || {}).Disabled = "Disabled",
        re.Enabled = "Enabled",
        (M = M || {}).imageOverlay = "imageOverlay";
        var n, o = "robloxAttributionIds";
        function i(e) {
            var t = window
              , n = t[o];
            return n || (n = {},
            t[o] = n),
            (t = n[e]) || (t = A.uuidService.generateRandomUuid(),
            n[e] = t),
            t
        }
        function l() {
            return document.getElementById("place-list")
        }
        (n = n || {}).GameDetailReferral = "gameDetailReferral";
        var Y, u = function(e) {
            return "discover#/sortName/" + e
        }, c = function(e) {
            return "discover#/sortName/v2/" + e
        }, d = function(e) {
            return "charts#/sortName/" + e
        };
        function h(e, t, n) {
            return void 0 === n && (n = {}),
            A.urlService.getUrlWithQueries(E.entityUrl.game.getRelativePath(e) + "/" + A.seoName.formatSeoName(t), n)
        }
        function R(e, t, n, r, o) {
            return void 0 === n && (n = {}),
            void 0 === r && (r = !1),
            void 0 === o && (o = {}),
            r = function(e, t, n) {
                var r = encodeURIComponent(e);
                switch (t) {
                case Y.HomePage:
                    return c(r);
                case Y.GamesPage:
                    return (n ? d : u)(r);
                default:
                    return c(r)
                }
            }(e, t, r),
            A.urlService.getUrlWithQueries(r, b(b({}, n), o))
        }
        function f() {
            return document.referrer
        }
        (ve = Y = Y || {}).SearchPage = "searchPage",
        ve.SortDetailPageDiscover = "sortDetailPageDiscover",
        ve.SortDetailPageHome = "sortDetailPageHome",
        ve.GameDetailPage = "gameDetailPage",
        ve.GamesPage = "gamesPage",
        ve.HomePage = "homePage",
        ve.PeopleListInHomePage = "peopleListInHomePage",
        ve.InterestCatcher = "interestCatcher";
        var L, m, U, v, g, y, b = function() {
            return (b = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, G = h, T = function() {
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
        }, N = (Ze = E.eventStreamService.eventTypes).pageLoad, O = Ze.formInteraction;
        function B(e, n) {
            return e.filter(function(e) {
                var t;
                return (null === (t = e.presence) || void 0 === t ? void 0 : t.universeId) === n && (null === (e = e.presence) || void 0 === e ? void 0 : e.userPresenceType) === P.Presence.PresenceTypes.InGame
            })
        }
        function F(e, t) {
            var n = 0;
            if (!Number.isNaN(e) && !Number.isNaN(t)) {
                if (0 === e && 0 === t)
                    return;
                n = 0 === e && 0 !== t ? 0 : 0 !== e && 0 === t || 100 < (n = Math.floor(e / (e + t) * 100)) ? 100 : n
            }
            return n
        }
        function j(t, e) {
            var n;
            return e.some(function(e) {
                return null === (e = t[e]) || void 0 === e ? void 0 : e.isSponsored
            }) ? ((n = {})[L.AdsPositions] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[L.AdFlags] = e.map(function(e) {
                return t[e].isSponsored ? 1 : 0
            }),
            n[L.AdIds] = e.map(function(e) {
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
            return t === q.GridTile || t === q.EventTile || t === q.InterestTile ? ((t = {})[L.ThumbnailAssetIds] = e.map(function(e) {
                return null !== (e = H(r[e], o.toString())) && void 0 !== e ? e : "0"
            }),
            t[L.ThumbnailListIds] = e.map(function(e) {
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
            return t === q.GridTile || t === q.EventTile || t === q.InterestTile ? ((t = {})[L.TileBadgeContexts] = e.map(function(e) {
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
            (t = {})[L.RowsOnPage] = o,
            t[L.PositionsInRow] = i,
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
        function X(t) {
            return ue(void 0, void 0, Promise, function() {
                return ce(this, function(e) {
                    return [2, A.httpService.get({
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
        (Xe = L = L || {}).AbsPositions = "absPositions",
        Xe.AdsPositions = "adsPositions",
        Xe.AdFlags = "adFlags",
        Xe.Algorithm = "algorithm",
        Xe.AppliedFilters = "appliedFilters",
        Xe.AttributionId = "attributionId",
        Xe.Direction = "direction",
        Xe.Distance = "distance",
        Xe.HttpReferrer = "httpReferrer",
        Xe.EmphasisFlag = "emphasisFlag",
        Xe.FilterId = "filterId",
        Xe.FilterIds = "filterIds",
        Xe.GameSetTargetId = "gameSetTargetId",
        Xe.GameSetTypeId = "gameSetTypeId",
        Xe.InteractionType = "interactionType",
        Xe.IsAd = "isAd",
        Xe.NativeAdData = "nativeAdData",
        Xe.AdIds = "adIds",
        Xe.NumberOfLoadedTiles = "numberOfLoadedTiles",
        Xe.Page = "page",
        Xe.PageSession = "pageSession",
        Xe.PlaceId = "placeId",
        Xe.PlayContext = "playContext",
        Xe.Position = "position",
        Xe.PreviousOptionId = "previousOptionId",
        Xe.PromptId = "promptId",
        Xe.PromptText = "promptText",
        Xe.ResourceId = "resourceId",
        Xe.ResponseOptionIds = "responseOptionIds",
        Xe.ResponseOptionTexts = "responseOptionTexts",
        Xe.RootPlaceIds = "rootPlaceIds",
        Xe.SelectedIds = "selectedIds",
        Xe.SelectedTexts = "selectedTexts",
        Xe.ScreenSizeX = "screenSizeX",
        Xe.ScreenSizeY = "screenSizeY",
        Xe.ScrollAreaSize = "scrollAreaSize",
        Xe.ScrollDepth = "scrollDepth",
        Xe.SelectedOptionId = "selectedOptionId",
        Xe.SelectedOptionIds = "selectedOptionIds",
        Xe.ShareLinkType = "shareLinkType",
        Xe.ShareLinkId = "shareLinkId",
        Xe.SortId = "sortId",
        Xe.SortPos = "sortPos",
        Xe.StartDepth = "startDepth",
        Xe.StartPos = "startPos",
        Xe.SuggestionKwd = "suggestionKwd",
        Xe.SuggestionReplacedKwd = "suggestionReplacedKwd",
        Xe.SuggestionCorrectedKwd = "suggestionCorrectedKwd",
        Xe.SuggestionAlgorithm = "suggestionAlgorithm",
        Xe.TimeToRespond = "timeToRespond",
        Xe.Token = "token",
        Xe.Topics = "topics",
        Xe.TreatmentType = "treatmentType",
        Xe.UniverseId = "universeId",
        Xe.UniverseIds = "universeIds",
        Xe.FriendId = "friendId",
        Xe.ThumbnailAssetIds = "thumbnailAssetIds",
        Xe.ThumbnailListIds = "thumbnailListIds",
        Xe.LinkPath = "linkPath",
        Xe.LocationName = "locationName",
        Xe.RowsOnPage = "rowsOnPage",
        Xe.PositionsInRow = "positionsInRow",
        Xe.NavigationUids = "navigationUids",
        Xe.TileBadgeContexts = "tileBadgeContexts",
        Xe.ButtonName = "buttonName",
        Xe.IsInterested = "isInterested",
        Xe.InterestedUniverseIds = "interestedUniverseIds",
        (ot = m = m || {}).GameImpressions = "gameImpressions",
        ot.GameDetailReferral = "gameDetailReferral",
        ot.SortDetailReferral = "sortDetailReferral",
        ot.FeedScroll = "feedScroll",
        ot.NavigateToSortLink = "navigateToSortLink",
        ot.SurveyInteraction = "surveyInteraction",
        ot.SurveyImpression = "surveyImpression",
        ot.InterestCatcherClick = "interestCatcherClick",
        ot.FilterImpressions = "filterImpressions",
        ot.GamesFilterClick = "gamesFilterClick",
        ot.RequestRefundClick = "requestRefundClick",
        (ee = U = U || {}).HomePageSessionInfo = "homePageSessionInfo",
        ee.GameSearchSessionInfo = "gameSearchSessionInfo",
        ee.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        (re = {}).Submission = "submission",
        re.Cancellation = "cancellation",
        (ve = v = v || {}).Horizontal = "horizontal",
        ve.Vertical = "vertical",
        (Ze = g = g || {}).Skip = "skip",
        Ze.Continue = "continue",
        Ze.Interested = "interested",
        (Xe = y = y || {}).OpenDropdown = "openDropdown",
        Xe.CloseDropdown = "closeDropdown",
        Xe.Apply = "apply";
        var Q = ((ot = {})[m.GameImpressions] = function(e) {
            e = x(e, []);
            return [{
                name: m.GameImpressions,
                type: m.GameImpressions,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.GameDetailReferral] = function(e) {
            var t;
            return void 0 === e && (e = {}),
            [{
                name: m.GameDetailReferral,
                type: m.GameDetailReferral,
                context: N
            }, te(T(((t = {})[L.AttributionId] = i(n.GameDetailReferral),
            t[L.HttpReferrer] = f(),
            t), e))]
        }
        ,
        ot[m.SortDetailReferral] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SortDetailReferral,
                type: m.SortDetailReferral,
                context: N
            }, te(T({}, e))]
        }
        ,
        ot[m.NavigateToSortLink] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.NavigateToSortLink,
                type: m.NavigateToSortLink,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.SurveyInteraction] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyInteraction,
                type: m.SurveyInteraction,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.SurveyImpression] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.SurveyImpression,
                type: m.SurveyImpression,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.InterestCatcherClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.InterestCatcherClick,
                type: m.InterestCatcherClick,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.FilterImpressions] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.FilterImpressions,
                type: m.FilterImpressions,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.GamesFilterClick] = function(e) {
            return void 0 === e && (e = {}),
            [{
                name: m.GamesFilterClick,
                type: m.GamesFilterClick,
                context: O
            }, te(T({}, e))]
        }
        ,
        ot[m.RequestRefundClick] = function(e) {
            var t;
            return [{
                name: m.RequestRefundClick,
                type: m.RequestRefundClick,
                context: O
            }, te(((t = {})[L.PlaceId] = e.placeId,
            t))]
        }
        ,
        ot)
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
          , ne = A.urlService.parseQueryString
          , re = A.numberFormat.getNumberFormat
          , oe = F
          , ie = function(e, t) {
            t = F(e, t);
            return void 0 !== t ? t + "%" : void 0
        }
          , ae = function(e) {
            return -1 === e ? "--" : A.abbreviateNumber.getAbbreviatedValue(e)
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
                        [4, A.httpService.get(a.getExperimentationValues(i, r, Object.keys(o)))];
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
                            supportedTreatmentTypes: [I.SortlessGrid],
                            authIntentData: a
                        }, i), Z(l)),
                        [4, A.httpService.post(s.url.getOmniRecommendations, t)];
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
                        return [4, A.httpService.post(s.url.getOmniRecommendationsMetadata, {
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
            return A.httpService.get(s.url.getGuacAppPolicyBehaviorData()).then(function(e) {
                return e.data
            })
        }
          , he = function(r) {
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
                        [4, A.httpService.post(t, n)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
          , ve = zi(9870)
          , ge = zi.n(ve)
          , ye = ReactStyleGuide
          , be = ye.Button.variants;
        function we(n, r) {
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
        (Ze = function(e) {
            var t = e.errorMessage
              , n = e.onRefresh
              , e = e.className;
            return K().createElement("div", {
                "data-testid": "error-status",
                className: ge()("game-error", e)
            }, K().createElement("span", {
                className: "icon-spot-error-2xl"
            }), K().createElement("p", {
                className: "text-label error-text"
            }, t), K().createElement(ye.Button, {
                className: "refresh-button",
                variant: be.control,
                onClick: n
            }, K().createElement("span", {
                className: "icon-common-refresh"
            })))
        }
        ).defaultProps = {
            className: ""
        };
        var Ie, Ee, Se, Pe, _e = Ze, Ce = function() {
            var e = (0,
            $.useState)(!1)
              , t = e[0]
              , n = e[1]
              , r = (e = we(function() {
                n(!0)
            }, 100))[0]
              , o = e[1]
              , i = (e = we(function() {
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
        }, xe = HeaderScripts, Ne = P.EnvironmentUrls.gamesApi, Oe = {
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
        }, Le = Oe.defaultCacheCriteria, ke = E.dataStores.gamesDataStore, De = E.dataStores.userDataStoreV2, Me = (E.dataStores.localeDataStore,
        E.dataStores.userDataStore.FriendsUserSortType), Ue = function() {
            return De.getFriends({
                userId: null === xe.authenticatedUser || void 0 === xe.authenticatedUser ? void 0 : xe.authenticatedUser.id,
                userSort: Me.StatusFrequents,
                isGuest: !1
            }, Le)
        }, Ge = function(t) {
            return Ae(void 0, void 0, Promise, function() {
                return Re(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, ke.getGameDetails([t])];
                    case 1:
                        return [2, e.sent().data.data[0]]
                    }
                })
            })
        }, Be = function(n) {
            return Ae(void 0, void 0, Promise, function() {
                var t;
                return Re(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, ke.getPlaceDetails([n])];
                    case 1:
                        return t = e.sent().data,
                        [2, (void 0 === t ? [] : t)[0]]
                    }
                })
            })
        };
        function Fe(e) {
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
                return e.tileBadgeType === Pe.Text && e.text ? (n.text = e.text,
                n.animationClass = je(e)) : e.tileBadgeType === Pe.Icon && e.icons && (t = e.icons.map(Fe).filter(function(e) {
                    return !!e
                }),
                n.icons = t,
                n.animationClass = je(e)),
                n
            })),
            t.length ? ((e = {})[Ie.IMAGE_TOP_LEFT] = t,
            e) : null
        }
        function Ve(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.footer) || void 0 === t ? void 0 : t.type) === Se.TextLabel ? e.footer : null
        }
        (Xe = Ie = Ie || {}).INVALID = "Invalid",
        Xe.IMAGE_TOP_LEFT = "ImageTopLeft",
        Xe.IMAGE_BOTTOM_LEFT = "ImageBottomLeft",
        (ot = Ee = Ee || {}).Home = "Home",
        ot.Games = "Games",
        (re = {}).Invalid = "Invalid",
        re.HasLootBoxes = "HasLootBoxes",
        re.HasInGameTrading = "HasInGameTrading",
        re.IsUsingLootBoxApi = "IsUsingLootBoxApi",
        re.IsUsingInGameTradingApi = "IsUsingInGameTradingApi",
        re.HasAllowedExternalLinkReferences = "HasAllowedExternalLinkReferences",
        re.IsUsingAllowedExternalLinkReferencesApi = "IsUsingAllowedExternalLinkReferencesApi",
        (ee = {}).MorphToR6 = "MorphToR6",
        ee.PlayerChoice = "PlayerChoice",
        ee.MorphToR15 = "MorphToR15",
        (Se = Se || {}).TextLabel = "TextLabel",
        (ve = Pe = Pe || {}).Text = "Text",
        ve.Icon = "Icon";
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
          , $e = {
            numGameCarouselLookAheadWindows: 3,
            adSortDiscoverId: 27,
            carouselContainerBufferWidth: 80,
            gameTileGutterWidth: 14,
            wideGameTileGutterWidth: 16
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
          , Je = qe
          , Ze = $e
          , Xe = Ke
          , Qe = {
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
          , it = "Label.ContextMenuTitle"
          , at = "Action.ViewDetails"
          , lt = "Action.JoinGame"
          , st = {
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
        function ut(e) {
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
            }, K().createElement(ye.Link, {
                url: e,
                className: "game-card-link"
            }, r)), K().createElement("span", {
                className: "game-info-container"
            }, K().createElement(ye.Link, {
                url: e,
                className: "game-name"
            }, o), !t && K().createElement(ye.Link, {
                url: e,
                className: "btn-control-sm game-link"
            }, n(at))))
        }
        ut.propTypes = {
            game: (re = zi.n(ot))().shape({
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
        var ct = ut;
        function dt(e) {
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
        dt.defaultProps = {
            altName: ""
        },
        dt.propTypes = {
            playerId: re().number.isRequired,
            altName: re().string
        };
        var ft = dt;
        function pt(e) {
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
            }, t), K().createElement(ye.Button, {
                className: "cursor-pointer btn-primary-sm player-action",
                onClick: function(e) {
                    var t = {
                        rootPlaceId: a,
                        placeId: l
                    }
                      , n = E.playGameService.buildPlayGameProperties(a, l, s, u)
                      , r = st.joinGameInPlacesList
                      , o = st.gamePlayIntentInPlacesList
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
            }, r(lt)))
        }
        pt.propTypes = {
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
        var mt = pt;
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
                }, K().createElement(ft, {
                    playerId: t,
                    altName: e
                })), K().createElement(mt, {
                    playerData: r,
                    dismissModal: o,
                    isPlayable: i,
                    translate: a
                }))
            })))
        }
        ht.propTypes = {
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
        var vt = ht;
        function gt(e) {
            var t = e.friendsData
              , n = e.friendsInGame
              , r = e.game
              , o = e.dismissModal
              , i = e.translate
              , e = i(it);
            return K().createElement("div", {
                "data-testid": "game-players-player-interaction-modal"
            }, K().createElement(ye.Modal.Header, {
                title: e,
                onClose: o
            }), K().createElement(ct, {
                game: r,
                translate: i
            }), K().createElement(vt, {
                friendsData: t,
                friendsInGame: n,
                dismissModal: o,
                isPlayable: r.isPlayable,
                translate: i
            }))
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
        var yt = gt
          , ee = {
            common: ["Common.GameSorts", "Feature.GamePage", "Feature.GameDetails", "Feature.ContactUpsell"],
            feature: "Feature.PlacesList"
        };
        (ve = function(e) {
            var t = e.tooltipText
              , e = e.sizeInPx
              , e = void 0 === e ? 16 : e;
            return K().createElement("span", {
                className: "info-tooltip-container"
            }, K().createElement(ye.Tooltip, {
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
        var bt = ve
          , wt = function() {
            return (wt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , It = ((ot = {})[q.GridTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        ot[q.EventTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 4,
            maxTilesPerRow: 4
        },
        ot[q.InterestTile] = {
            minTileWidth: 311,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 6
        },
        ot[q.AppGameTileNoMetadata] = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        },
        ot[q.ExperienceEventsTile] = {
            minTileWidth: 233,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 3
        },
        ot)
          , Et = wt(wt({}, It), ((ve = {})[q.EventTile] = {
            minTileWidth: 300,
            columnGap: 16,
            minTilesPerRow: 2,
            maxTilesPerRow: 4
        },
        ve))
          , St = {
            minTileWidth: 150,
            columnGap: 16,
            minTilesPerRow: 3,
            maxTilesPerRow: 12
        };
        function Pt(e) {
            var n = e.pills
              , r = e.isFocused
              , e = Object.keys(n);
            return K().createElement($.Fragment, null, e.map(function(e) {
                var t;
                return !(null === (t = n[t = e]) || void 0 === t || !t.length) && K().createElement("div", {
                    key: e,
                    className: "game-card-pills-container " + He(e)
                }, null === (e = n[e]) || void 0 === e ? void 0 : e.map(function(e) {
                    return K().createElement(Tt, {
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
        function Ct(e) {
            var t = e.playerCount
              , e = e.playerCountStyle
              , e = ge()("game-card-image-pill", {
                "hover-only": e === k.Hover
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
                className: ge()("game-card-pill-animation-container", ((e = {})[null != t ? t : ""] = t && n,
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
        var Tt = ot;
        function xt(e) {
            return e = e.featureTypes,
            K().createElement("div", {
                className: "game-card-image-feature-pill",
                "data-testid": "game-tile-social-feature-pill"
            }, K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-social-feature-list"
            }, e.map(function(e) {
                return Nt[e] && K().createElement("span", {
                    key: e,
                    className: Nt[e]
                })
            })))
        }
        Ct.defaultProps = {
            playerCountStyle: void 0
        };
        var Nt = {
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
              , e = We.ThumbnailGameIconSize.size256
              , s = Te(r, s);
            return K().createElement(ye.Link, {
                url: G(r.placeId, r.name, a(r, t)),
                tabIndex: o ? 0 : -1,
                "aria-hidden": !o,
                className: "game-card-link",
                id: r.universeId.toString()
            }, K().createElement(At, {
                gameLayoutData: s,
                isFocused: !!l
            }), i === Y.GamesPage ? K().createElement("div", {
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
        (ve = function(e) {
            var t = e.gameLayoutData
              , n = e.playerCountStyle
              , r = e.playerCount
              , o = e.isFocused
              , e = ze(t);
            return e ? K().createElement(Pt, {
                pills: e,
                isFocused: o
            }) : null !== (o = null == t ? void 0 : t.pill) && void 0 !== o && o.types && 0 < t.pill.types.length ? K().createElement(xt, {
                featureTypes: t.pill.types
            }) : void 0 === r || n !== k.Always && n !== k.Hover ? null : K().createElement(Ct, {
                playerCount: r,
                playerCountStyle: n
            })
        }
        ).defaultProps = {
            gameLayoutData: void 0,
            playerCountStyle: void 0,
            playerCount: void 0
        };
        var At = ve
          , Rt = function() {
            return (Rt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Lt = Ke.keyBoardEventCode
          , kt = Ke.numberOfInGameAvatarIcons
          , Dt = Ke.numberOfInGameNames;
        function Mt(e) {
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
        function Ut(e) {
            var t = e.totalDownVotes
              , n = e.totalUpVotes
              , r = e.translate
              , e = Ke.RatingPercentageText
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
        function Gt(e) {
            return e = e.footerData,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-text-footer"
            }, K().createElement("span", {
                className: "info-label"
            }, e.text.textLiteral))
        }
        function Bt(e) {
            var t = e.iconClassName
              , e = e.text;
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-icon-text-footer"
            }, K().createElement("span", {
                className: ge()("info-label", t)
            }), K().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e))
        }
        function Ft(e) {
            return e = e.footerText,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-friend-activity"
            }, K().createElement("span", {
                className: "info-label"
            }, e))
        }
        function jt(e) {
            return e = e.translate,
            K().createElement("div", {
                className: "game-card-native-ad",
                "data-testid": "game-tile-sponsored-footer"
            }, K().createElement("div", {
                className: "native-ad-label"
            }, e(Qe.LabelSponsoredAd), K().createElement(bt, {
                tooltipText: e(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            })))
        }
        function Ht(e) {
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
        function zt(e) {
            return e = e.translate,
            K().createElement("div", {
                className: "game-card-info",
                "data-testid": "wide-game-tile-sponsored-footer"
            }, K().createElement(bt, {
                tooltipText: e(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics.",
                sizeInPx: 12
            }), K().createElement("span", {
                className: "info-label text-label-with-icon"
            }, e(Qe.LabelSponsoredAd)))
        }
        function Vt(e) {
            var t = e.friendsData
              , n = e.isOnline
              , r = Ke.maxFacepileFriendCountValue
              , r = (null == t ? void 0 : t.length) > r ? r.toString() + "+" : (null == t ? void 0 : t.length) > kt ? null == t ? void 0 : t.length.toString() : ""
              , e = r ? kt - 1 : kt
              , o = ge()("avatar-card", {
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
                }, K().createElement(Ht, {
                    user: e
                }))
            }))
        }
        function Wt(e) {
            var t = e.friendsData
              , e = e.isOnline;
            if (0 === t.length)
                throw new Error("friendData should not be empty");
            return K().createElement("div", {
                className: "game-card-info",
                "data-testid": "game-tile-stats-" + (e ? "online" : "offline") + "-friends-facepile"
            }, K().createElement(Vt, {
                friendsData: t,
                isOnline: e
            }), K().createElement("span", {
                className: "info-label"
            }, t.map(function(e) {
                return e.displayName
            }).join(", ")))
        }
        function qt(e) {
            var t = e.friendData
              , n = e.gameData
              , r = e.translate
              , o = (0,
            $.useState)(!1)
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
                    width: 22 * (t.slice(0, kt).length - 1) + 32 + "px"
                }
            }, t.slice(0, kt).map(function(e) {
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
                }, K().createElement(Ht, {
                    user: e
                }))
            })), r && K().createElement("span", {
                className: "info-label text-overflow",
                "data-testid": "game-tile-stats-info-label"
            }, t.length > Dt ? r(Qe.LabelPlayingOnePlusUsersWithComma, {
                username: t[0].displayName,
                count: t.length - Dt
            }) : r(Qe.LabelPlayingOneUser, {
                user: t[0].displayName
            })), K().createElement($t, {
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
            page: Y.HomePage,
            isOnScreen: !0,
            isFocused: !1
        },
        qt.defaultProps = {
            translate: void 0
        };
        var $t = (0,
        p.withTranslations)(function(e) {
            var t = e.show
              , n = e.onHide
              , r = e.friendsDataInGame
              , o = e.game
              , e = e.translate;
            return K().createElement(ye.Modal, {
                show: t,
                onHide: n,
                size: "lg"
            }, K().createElement(yt, {
                friendsData: r.map(function(e) {
                    return Rt(Rt({}, e), {
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
          , Yt = function(n, r) {
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
        (ot = (0,
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
              , h = l[0]
              , v = l[1]
              , u = Ce()
              , e = u[0]
              , l = u[1]
              , u = u[2]
              , g = (0,
            $.useMemo)(function() {
                return B(c, o.universeId)
            }, [c, o.universeId])
              , y = Te(o, d);
            (0,
            $.useEffect)(function() {
                void 0 === h && 0 < g.length && Kt(void 0, void 0, void 0, function() {
                    var t;
                    return Yt(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            [4, Be(o.placeId.toString())];
                        case 1:
                            return t = e.sent(),
                            v(t),
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
            }, [g, h]);
            return K().createElement("div", {
                ref: t,
                className: s,
                "data-testid": "game-tile",
                onMouseOver: l,
                onMouseLeave: u,
                onFocus: l,
                onBlur: u
            }, K().createElement(Ot, {
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
                    return K().createElement(jt, {
                        translate: m
                    });
                var e = Ve(y);
                return e ? K().createElement(Gt, {
                    footerData: e
                }) : 0 < g.length && h ? K().createElement(qt, {
                    friendData: g,
                    gameData: h
                }) : null != o && o.friendActivityTitle ? K().createElement(Ft, {
                    footerText: o.friendActivityTitle
                }) : K().createElement(Mt, {
                    totalUpVotes: o.totalUpVotes,
                    totalDownVotes: o.totalDownVotes,
                    playerCount: o.playerCount
                })
            }()))
        })).displayName = "GameTile";
        var Jt = ot;
        (ve = function(e) {
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
                return K().createElement(Xt, null);
            r = ge()(r, "btn-full-width");
            return K().createElement(K().Fragment, null, K().createElement(ye.Link, {
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
        var Zt = ve
          , Xt = function() {
            return K().createElement("div", {
                className: "shimmer play-button game-card-thumb-container",
                "data-testid": "play-button-default"
            })
        };
        function Qt(e) {
            var t = e.gameData
              , n = e.topicId
              , r = e.wideTileType
              , o = (0,
            $.useMemo)(function() {
                return H(t, n)
            }, [t, n])
              , e = (0,
            $.useMemo)(function() {
                return r === q.EventTile ? We.ThumbnailGameThumbnailSize.width576 : We.ThumbnailGameThumbnailSize.width384
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
        function en(e) {
            var t = e.wrapperClassName
              , n = e.isTileClickEnabled
              , r = e.isOnScreen
              , o = e.linkUrl
              , e = e.children;
            return n ? K().createElement(ye.Link, {
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
                return K().createElement(u, {
                    universeId: t,
                    placeId: n,
                    status: null != d ? d : s.Playable,
                    eventProperties: r,
                    buttonClassName: o ? ge()(o, "regular-play-button") : void 0,
                    disableLoadingState: !0
                });
            case s.PurchaseRequired:
                return l ? K().createElement(Zt, {
                    placeId: n,
                    clientReferralUrl: a,
                    purchaseIconClassName: null != i ? i : "icon-common-play",
                    buttonClassName: ge()(null != o ? o : "btn-growth-lg play-button", "purchase-button")
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
        var tn = ot;
        (ve = K().forwardRef(function(e, t) {
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
              , h = e.isOnScreen
              , v = void 0 === h || h
              , g = e.isInterestedUniverse
              , y = void 0 === g ? void 0 : g
              , b = e.toggleInterest
              , w = void 0 === b ? void 0 : b
              , I = e.translate
              , E = 0 === r
              , S = r === Je.maxWideGameTilesPerCarouselPage - 1
              , P = Ce()
              , _ = P[0]
              , C = P[1]
              , T = P[2]
              , i = (0,
            $.useState)(n.placeId)
              , x = i[0]
              , N = i[1];
            (0,
            $.useEffect)(function() {
                u && !Number.isNaN(u) ? N(parseInt(u, 10)) : n.navigationUid && Ge(n.navigationUid).then(function(e) {
                    null != e && e.rootPlaceId && N(e.rootPlaceId)
                }).catch(function() {})
            }, [u, n.navigationUid]);
            function O() {
                return n.minimumAge && n.ageRecommendationDisplayName && f !== q.EventTile ? K().createElement("div", {
                    className: "game-card-info",
                    "data-testid": "game-tile-hover-age-rating"
                }, K().createElement("span", {
                    className: "info-label"
                }, n.ageRecommendationDisplayName)) : null
            }
            var c = (0,
            $.useMemo)(function() {
                return G(x, n.name, o(n, r))
            }, [n, o, r, x])
              , h = o(n, r)
              , A = (0,
            $.useMemo)(function() {
                return B(a, n.universeId)
            }, [a, n.universeId])
              , R = (0,
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
              , L = Te(n, m)
              , g = function() {
                return (f !== q.GridTile || s !== D.Disabled) && ((f !== q.EventTile || s === D.Enabled) && f !== q.InterestTile)
            }
              , b = (0,
            $.useMemo)(function() {
                return null != L && L.title ? L.title : n.name
            }, [n.name, null == L ? void 0 : L.title])
              , e = f !== q.InterestTile
              , P = f !== q.InterestTile
              , i = (0,
            $.useCallback)(function() {
                w && w()
            }, [w]);
            return K().createElement("li", {
                className: ge()("list-item", "hover-game-tile", {
                    "grid-tile": f === q.GridTile
                }, {
                    "event-tile": f === q.EventTile
                }, {
                    "interest-tile": f === q.InterestTile
                }, {
                    "first-tile": E
                }, {
                    "last-tile": S
                }, {
                    "image-overlay": p === M.imageOverlay
                }, {
                    "old-hover": p !== M.imageOverlay
                }, {
                    focused: _
                }),
                "data-testid": "wide-game-tile",
                onMouseOver: P ? C : void 0,
                onMouseLeave: P ? T : void 0,
                onFocus: P ? C : void 0,
                onBlur: P ? T : void 0,
                id: n.universeId.toString()
            }, n.universeId && K().createElement("div", {
                className: "featured-game-container game-card-container",
                ref: t
            }, K().createElement(en, {
                wrapperClassName: "game-card-link",
                isTileClickEnabled: e,
                isOnScreen: v,
                linkUrl: c
            }, K().createElement("div", {
                className: "featured-game-icon-container"
            }, K().createElement(Qt, {
                gameData: n,
                topicId: m,
                wideTileType: f
            }), K().createElement(At, {
                gameLayoutData: L,
                playerCountStyle: l,
                playerCount: n.playerCount,
                isFocused: _
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
                var e = O();
                if (_ && p === M.imageOverlay && e)
                    return e;
                if (n.isShowSponsoredLabel || n.isSponsored && d)
                    return K().createElement(zt, {
                        translate: I
                    });
                e = Ve(L);
                return e ? K().createElement(Gt, {
                    footerData: e
                }) : 0 < (null == A ? void 0 : A.length) ? K().createElement(Wt, {
                    friendsData: A,
                    isOnline: !0
                }) : 0 < (null == R ? void 0 : R.length) ? K().createElement(Wt, {
                    friendsData: R,
                    isOnline: !1
                }) : n.friendVisitedString ? K().createElement(Bt, {
                    iconClassName: "icon-pastname",
                    text: n.friendVisitedString
                }) : l === k.Footer ? K().createElement(Mt, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    playerCount: n.playerCount
                }) : K().createElement(Ut, {
                    totalUpVotes: n.totalUpVotes,
                    totalDownVotes: n.totalDownVotes,
                    translate: I
                })
            }()), K().createElement("div", {
                className: "hover-metadata"
            }, O()))), _ && p === M.imageOverlay && g() && K().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "play-button-container"
            }, K().createElement(tn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: h,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })))), _ && p !== M.imageOverlay && g() && K().createElement("div", {
                "data-testid": "game-tile-hover-game-tile-contents",
                className: "game-card-contents"
            }, K().createElement(tn, {
                universeId: n.universeId.toString(),
                placeId: n.placeId.toString(),
                playButtonEventProperties: h,
                buttonClassName: "btn-growth-xs play-button",
                purchaseIconClassName: "icon-robux-white",
                clientReferralUrl: c,
                shouldPurchaseNavigateToDetails: !0
            })), f === q.InterestTile && K().createElement(ye.Button, {
                "data-testid": "tile-interest-button",
                className: "tile-interest-button",
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: I(nt.ActionInterestCatcherInterested),
                onClick: i
            }, y ? K().createElement("span", {
                className: "icon-heart-red"
            }) : K().createElement("span", {
                className: "icon-heart"
            }), K().createElement("span", null, I(nt.ActionInterestCatcherInterested)))))
        })).displayName = "WideGameTile";
        var nn = ve
          , rn = function() {
            return (rn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , on = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (ot = (0,
        $.forwardRef)(function(e, t) {
            var n = e.componentType
              , r = on(e, ["componentType"]);
            switch (n) {
            case q.AppGameTileNoMetadata:
                return K().createElement(Jt, rn({
                    ref: t,
                    shouldShowMetadata: !1
                }, r));
            case q.GridTile:
            case q.EventTile:
            case q.InterestTile:
                return K().createElement(nn, rn({
                    ref: t,
                    wideTileType: n
                }, r));
            default:
                return K().createElement(Jt, rn({
                    ref: t
                }, r))
            }
        })).displayName = "GameTileTypeMap";
        var an = ot
          , ln = (0,
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
                "wide-game-tile-carousel": a === q.GridTile || a === q.EventTile
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
                return K().createElement(an, {
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
        function sn(e) {
            var t = e.children
              , e = (e = (e = null === (e = window.location.href) || void 0 === e ? void 0 : e.split("?")[1]) && ne(e)) && (e.discoverPageSessionInfo || e.homePageSessionInfo)
              , e = (0,
            $.useState)(e && "string" == typeof e ? e : A.uuidService.generateRandomUuid())[0];
            return K().createElement(pn.Provider, {
                value: e
            }, t)
        }
        function un() {
            return (0,
            $.useContext)(pn)
        }
        function cn(e) {
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
                    var e = d.indexOf(mn)
                      , t = d.indexOf(hn);
                    if (-1 !== e && -1 !== t && e < t) {
                        var n = d.slice(0, e)
                          , e = d.slice(e + mn.length, t)
                          , t = d.slice(t + hn.length);
                        return K().createElement(ye.Link, {
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
        ln.displayName = "GameCarousel";
        var dn = function(t, e, n) {
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
                le(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), Ke.maxTilesInGameImpressionsEvent).filter(function(e) {
                    return 0 < e.length
                }).forEach(function(n) {
                    var e, t = u.current(n);
                    void 0 !== t && 0 < (null === (e = t.absPositions) || void 0 === e ? void 0 : e.length) && (t = Q.gameImpressions(t),
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
              , r = we(function() {
                return c()
            })
              , d = r[0]
              , f = r[1];
            (0,
            $.useEffect)(function() {
                var e, i = Array.from(null !== (e = null === (e = null == t ? void 0 : t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []);
                return s.current = E.elementVisibilityService.observeChildrenVisibility({
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
          , fn = function() {
            return (fn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , pn = (0,
        $.createContext)("")
          , mn = qe.linkStartDelimiter
          , hn = qe.linkEndDelimiter;
        function vn(e) {
            var t = e.children
              , n = e.backgroundImageAssetId
              , r = (0,
            $.useState)("")
              , e = r[0]
              , o = r[1];
            return (0,
            $.useEffect)(function() {
                var t = !0;
                return n ? X(n).then(function(e) {
                    t && o(e)
                }, function() {
                    t && o("")
                }) : o(""),
                function() {
                    t = !1
                }
            }, [n]),
            K().createElement("div", {
                className: ge()(["game-sort-carousel-wrapper", {
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
        function gn(e) {
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
                    e.code === bn.enter && (e.stopPropagation(),
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
        (ve = function(e) {
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
              , h = e.translate
              , v = (0,
            $.useMemo)(function() {
                return u || (s ? h(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics." : void 0)
            }, [s, u, h])
              , g = (0,
            $.useMemo)(function() {
                return h(a ? rt.LabelLearnMore : nt.ActionSeeAll)
            }, [a, h])
              , e = (0,
            $.useCallback)(function() {
                var e;
                a && l && (e = l(),
                e = Q.navigateToSortLink(e),
                E.eventStreamService.sendEvent.apply(E.eventStreamService, e))
            }, [a, l]);
            return K().createElement("div", {
                className: "game-sort-header-container"
            }, K().createElement("div", {
                className: c
            }, K().createElement("h2", {
                className: "sort-header"
            }, d ? K().createElement("span", null, t) : K().createElement(ye.Link, {
                url: r
            }, t), v && K().createElement(bt, {
                tooltipText: v
            })), !d && K().createElement(ye.Link, {
                url: r,
                onClick: e,
                className: "btn-secondary-xs see-all-link-icon btn-more"
            }, g)), K().createElement(cn, {
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
        var yn = ve
          , bn = Ke.keyBoardEventCode;
        function wn(e) {
            var t = e.distance
              , n = e.scrollAreaSize
              , r = e.direction
              , o = e.startingPosition
              , i = e.currentPage
              , a = e.pageSession
              , l = e.gameSetTypeId
              , s = e.gameSetTargetId
              , u = e.sortPosition
              , e = ((e = {})[L.StartPos] = o,
            e[L.Distance] = t,
            e[L.Direction] = r,
            e[L.PageSession] = a,
            e[L.GameSetTypeId] = l,
            e[L.GameSetTargetId] = s,
            e[L.SortPos] = u,
            e[L.ScrollDepth] = t / n,
            e[L.StartDepth] = o / n,
            e[L.ScreenSizeX] = window.innerWidth,
            e[L.ScreenSizeY] = window.innerHeight,
            e[L.ScrollAreaSize] = n,
            e);
            P.EventStream.SendEventWithTarget(m.FeedScroll, i, e, P.EventStream.TargetTypes.WWW)
        }
        function In(e) {
            var t = e.scrollPosition
              , n = e.page
              , r = e.gameSetTypeId
              , o = e.gameSetTargetId
              , i = e.sortPosition
              , a = e.wrapperRef
              , l = (0,
            $.useRef)(t)
              , s = un()
              , u = (0,
            $.useMemo)(function() {
                return we(function(e) {
                    var t;
                    e !== l.current && (t = Math.round((null === (t = a.current) || void 0 === t ? void 0 : t.getBoundingClientRect().width) || window.innerWidth),
                    wn({
                        distance: e - l.current,
                        scrollAreaSize: t,
                        startingPosition: l.current,
                        currentPage: n,
                        direction: v.Horizontal,
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
        function En(e, r) {
            return e.map(function(e) {
                var t = e.contentType
                  , n = e.contentId
                  , e = e.contentMetadata
                  , t = null === (t = null == r ? void 0 : r[t]) || void 0 === t ? void 0 : t[n];
                if (t) {
                    n = Rn({}, t),
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
        function Sn(e) {
            return "recommendationList"in e
        }
        function Pn(e) {
            return "games"in e
        }
        function _n(e) {
            return "filters"in e
        }
        function Cn(e, t) {
            return "recommendationList"in e ? En(e.recommendationList, t) : Pn(e) ? e.games : []
        }
        function Tn(e) {
            if (e && Pn(e))
                return e.gameSetTargetId
        }
        function xn(e) {
            var t = Tn(e);
            return void 0 !== t ? ((e = {})[L.GameSetTargetId] = t,
            e) : {}
        }
        function Nn(e) {
            if (e = e.find(_n)) {
                var t = new Map;
                return e.filters.forEach(function(e) {
                    t.set(e.filterType, e.selectedOptionId)
                }),
                t
            }
        }
        function On(e) {
            var t;
            return e && Pn(e) && e.appliedFilters ? ((t = {})[L.AppliedFilters] = encodeURIComponent(e.appliedFilters),
            t) : {}
        }
        (ot = function(e) {
            var t = e.isScrollBackDisabled
              , n = e.isScrollForwardDisabled
              , r = e.onScrollBack
              , o = e.onScrollForward;
            return e.isNewScrollArrowsEnabled ? K().createElement(K().Fragment, null, !t && K().createElement(gn, {
                scrollClassNames: "scroller-new prev",
                scrollIconClassName: "icon-chevron-heavy-left",
                scroll: r,
                isDisabled: t,
                isNewScrollArrowsEnabled: !0
            }), !n && K().createElement(gn, {
                scrollClassNames: "scroller-new next",
                scrollIconClassName: "icon-chevron-heavy-right",
                scroll: o,
                isDisabled: n,
                isNewScrollArrowsEnabled: !0
            })) : K().createElement(K().Fragment, null, K().createElement(gn, {
                scrollClassNames: ge()("scroller", "prev", {
                    disabled: t
                }),
                scrollIconClassName: "icon-games-carousel-left",
                isDisabled: t,
                scroll: r,
                isNewScrollArrowsEnabled: !1
            }), K().createElement(gn, {
                scrollClassNames: ge()("scroller", "next", {
                    disabled: n
                }),
                scrollIconClassName: "icon-games-carousel-right",
                isDisabled: n,
                scroll: o,
                isNewScrollArrowsEnabled: !1
            }))
        }
        ).defaultProps = {
            isNewScrollArrowsEnabled: void 0
        };
        var An = ot
          , Rn = function() {
            return (Rn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ln = "undefined" != typeof Map ? Map : (Object.defineProperty(Dn.prototype, "size", {
            get: function() {
                return this.__entries__.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Dn.prototype.get = function(e) {
            e = kn(this.__entries__, e),
            e = this.__entries__[e];
            return e && e[1]
        }
        ,
        Dn.prototype.set = function(e, t) {
            var n = kn(this.__entries__, e);
            ~n ? this.__entries__[n][1] = t : this.__entries__.push([e, t])
        }
        ,
        Dn.prototype.delete = function(e) {
            var t = this.__entries__
              , e = kn(t, e);
            ~e && t.splice(e, 1)
        }
        ,
        Dn.prototype.has = function(e) {
            return !!~kn(this.__entries__, e)
        }
        ,
        Dn.prototype.clear = function() {
            this.__entries__.splice(0)
        }
        ,
        Dn.prototype.forEach = function(e, t) {
            void 0 === t && (t = null);
            for (var n = 0, r = this.__entries__; n < r.length; n++) {
                var o = r[n];
                e.call(t, o[1], o[0])
            }
        }
        ,
        Dn);
        function kn(e, n) {
            var r = -1;
            return e.some(function(e, t) {
                return e[0] === n && (r = t,
                !0)
            }),
            r
        }
        function Dn() {
            this.__entries__ = []
        }
        var Mn = "undefined" != typeof window && "undefined" != typeof document && window.document === document
          , Un = void 0 !== zi.g && zi.g.Math === Math ? zi.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
          , Gn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(Un) : function(e) {
            return setTimeout(function() {
                return e(Date.now())
            }, 1e3 / 60)
        }
          , Bn = 2
          , Fn = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
          , jn = "undefined" != typeof MutationObserver
          , Hn = (zn.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e),
            this.connected_ || this.connect_()
        }
        ,
        zn.prototype.removeObserver = function(e) {
            var t = this.observers_
              , e = t.indexOf(e);
            ~e && t.splice(e, 1),
            !t.length && this.connected_ && this.disconnect_()
        }
        ,
        zn.prototype.refresh = function() {
            this.updateObservers_() && this.refresh()
        }
        ,
        zn.prototype.updateObservers_ = function() {
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
        zn.prototype.connect_ = function() {
            Mn && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
            window.addEventListener("resize", this.refresh),
            jn ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
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
        zn.prototype.disconnect_ = function() {
            Mn && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
            window.removeEventListener("resize", this.refresh),
            this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
            this.mutationsObserver_ = null,
            this.mutationEventsAdded_ = !1,
            this.connected_ = !1)
        }
        ,
        zn.prototype.onTransitionEnd_ = function(e) {
            var e = e.propertyName
              , t = void 0 === e ? "" : e;
            Fn.some(function(e) {
                return !!~t.indexOf(e)
            }) && this.refresh()
        }
        ,
        zn.getInstance = function() {
            return this.instance_ || (this.instance_ = new zn),
            this.instance_
        }
        ,
        zn.instance_ = null,
        zn);
        function zn() {
            function e() {
                i && (i = !1,
                r()),
                a && n()
            }
            function t() {
                Gn(e)
            }
            function n() {
                var e = Date.now();
                if (i) {
                    if (e - l < Bn)
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
        var Vn = function(e, t) {
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
          , Wn = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || Un
        }
          , qn = Xn(0, 0, 0, 0);
        function $n(e) {
            return parseFloat(e) || 0
        }
        function Kn(n) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            return e.reduce(function(e, t) {
                return e + $n(n["border-" + t + "-width"])
            }, 0)
        }
        function Yn(e) {
            var t = e.clientWidth
              , n = e.clientHeight;
            if (!t && !n)
                return qn;
            var r = Wn(e).getComputedStyle(e)
              , o = function(e) {
                for (var t = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                    var o = r[n]
                      , i = e["padding-" + o];
                    t[o] = $n(i)
                }
                return t
            }(r)
              , i = o.left + o.right
              , a = o.top + o.bottom
              , l = $n(r.width)
              , s = $n(r.height);
            return "border-box" === r.boxSizing && (Math.round(l + i) !== t && (l -= Kn(r, "left", "right") + i),
            Math.round(s + a) !== n && (s -= Kn(r, "top", "bottom") + a)),
            (e = e) !== Wn(e).document.documentElement && (t = Math.round(l + i) - t,
            n = Math.round(s + a) - n,
            1 !== Math.abs(t) && (l -= t),
            1 !== Math.abs(n) && (s -= n)),
            Xn(o.left, o.top, l, s)
        }
        var Jn = "undefined" != typeof SVGGraphicsElement ? function(e) {
            return e instanceof Wn(e).SVGGraphicsElement
        }
        : function(e) {
            return e instanceof Wn(e).SVGElement && "function" == typeof e.getBBox
        }
        ;
        function Zn(e) {
            return Mn ? Jn(e) ? Xn(0, 0, (t = (t = e).getBBox()).width, t.height) : Yn(e) : qn;
            var t
        }
        function Xn(e, t, n, r) {
            return {
                x: e,
                y: t,
                width: n,
                height: r
            }
        }
        var Qn = (er.prototype.isActive = function() {
            var e = Zn(this.target);
            return (this.contentRect_ = e).width !== this.broadcastWidth || e.height !== this.broadcastHeight
        }
        ,
        er.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width,
            this.broadcastHeight = e.height,
            e
        }
        ,
        er);
        function er(e) {
            this.broadcastWidth = 0,
            this.broadcastHeight = 0,
            this.contentRect_ = Xn(0, 0, 0, 0),
            this.target = e
        }
        var tr = function(e, t) {
            var n, r, o, i = (n = (i = t).x,
            r = i.y,
            o = i.width,
            t = i.height,
            i = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
            i = Object.create(i.prototype),
            Vn(i, {
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
            Vn(this, {
                target: e,
                contentRect: i
            })
        }
          , nr = (rr.prototype.observe = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Wn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new Qn(e)),
                this.controller_.addObserver(this),
                this.controller_.refresh())
            }
        }
        ,
        rr.prototype.unobserve = function(e) {
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof Wn(e).Element))
                    throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e),
                t.size || this.controller_.removeObserver(this))
            }
        }
        ,
        rr.prototype.disconnect = function() {
            this.clearActive(),
            this.observations_.clear(),
            this.controller_.removeObserver(this)
        }
        ,
        rr.prototype.gatherActive = function() {
            var t = this;
            this.clearActive(),
            this.observations_.forEach(function(e) {
                e.isActive() && t.activeObservations_.push(e)
            })
        }
        ,
        rr.prototype.broadcastActive = function() {
            var e, t;
            this.hasActive() && (e = this.callbackCtx_,
            t = this.activeObservations_.map(function(e) {
                return new tr(e.target,e.broadcastRect())
            }),
            this.callback_.call(e, t, e),
            this.clearActive())
        }
        ,
        rr.prototype.clearActive = function() {
            this.activeObservations_.splice(0)
        }
        ,
        rr.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length
        }
        ,
        rr);
        function rr(e, t, n) {
            if (this.activeObservations_ = [],
            this.observations_ = new Ln,
            "function" != typeof e)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e,
            this.controller_ = t,
            this.callbackCtx_ = n
        }
        var or = new ("undefined" != typeof WeakMap ? WeakMap : Ln)
          , ir = function e(t) {
            if (!(this instanceof e))
                throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
            var n = Hn.getInstance()
              , n = new nr(t,n,this);
            or.set(this, n)
        };
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            ir.prototype[t] = function() {
                var e;
                return (e = or.get(this))[t].apply(e, arguments)
            }
        });
        var ve = void 0 !== Un.ResizeObserver ? Un.ResizeObserver : ir
          , ar = null !== (ot = window.ResizeObserver) && void 0 !== ot ? ot : ve
          , lr = function() {
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
            $.useRef)(new ar(e))
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
          , sr = Ze.numGameCarouselLookAheadWindows
          , ur = Ze.gameTileGutterWidth
          , cr = Ze.wideGameTileGutterWidth
          , dr = Xe.wideTileHoverGrowWidthPx;
        (ve = function(e) {
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
              , h = e.isSponsoredFooterAllowed
              , v = e.hoverStyle
              , g = e.topicId
              , y = e.isExpandHomeContentEnabled
              , b = e.isCarouselHorizontalScrollEnabled
              , w = e.isNewScrollArrowsEnabled
              , I = e.translate
              , E = (0,
            $.useRef)(null)
              , S = (0,
            $.useState)(0)
              , P = S[0]
              , _ = S[1]
              , C = (0,
            $.useState)(!1)
              , T = C[0]
              , x = C[1]
              , e = (0,
            $.useState)(!0)
              , N = e[0]
              , O = e[1]
              , S = (0,
            $.useState)(!0)
              , A = S[0]
              , R = S[1]
              , C = (0,
            $.useState)(0)
              , L = C[0]
              , k = C[1]
              , D = (0,
            $.useMemo)(function() {
                return u === q.GridTile || u === q.EventTile
            }, [u])
              , M = (0,
            $.useMemo)(function() {
                return D ? cr : ur
            }, [D])
              , e = lr()
              , S = e[0]
              , U = e[1]
              , C = lr()
              , e = C[0]
              , G = C[1]
              , B = (0,
            $.useMemo)(function() {
                if (D && f)
                    return f;
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 !== G && void 0 !== e ? Math.max(1, Math.floor((G + M) / (e + M))) : 0
            }, [G, M, f, D]);
            (0,
            $.useEffect)(function() {
                O(0 <= L),
                s || void 0 !== G && void 0 !== U && Math.abs(L) + G + dr >= U ? R(!0) : R(!1)
            }, [L, G, U, null == t ? void 0 : t.length, s]);
            var F = (0,
            $.useCallback)(function() {
                P + sr * B >= (null == t ? void 0 : t.length) && l && !s && l()
            }, [P, B, l, s, null == t ? void 0 : t.length])
              , j = (0,
            $.useCallback)(function() {
                var e = null === (e = null === (e = null == E ? void 0 : E.current) || void 0 === e ? void 0 : e.getBoundingClientRect()) || void 0 === e ? void 0 : e.width;
                return void 0 === e ? 0 : Math.floor(B) * (e + M)
            }, [B, M])
              , H = (0,
            $.useCallback)(function() {
                var t;
                N || (t = j(),
                k(function(e) {
                    return Math.min(e + t, 0)
                }),
                _(function(e) {
                    return e - B
                }))
            }, [j, N, B])
              , z = (0,
            $.useCallback)(function() {
                var t;
                A || (t = j(),
                k(function(e) {
                    return b && o === Y.HomePage ? void 0 !== U && void 0 !== G ? Math.max(e - t, -1 * (U - G)) : e - t : void 0 !== U ? Math.max(e - t, -1 * U) : e - t
                }),
                _(function(e) {
                    return e + B
                }),
                F())
            }, [F, j, A, B, G, U, o, b])
              , V = (0,
            $.useCallback)(function(e) {
                return P <= e && e < P + B
            }, [P, B])
              , W = (0,
            $.useCallback)(function(e) {
                T || (x(!0),
                e(),
                setTimeout(function() {
                    x(!1)
                }, 200))
            }, [T])
              , C = (0,
            $.useRef)(null);
            In({
                scrollPosition: -L,
                page: o,
                gameSetTypeId: n.topicId,
                gameSetTargetId: Tn(n),
                wrapperRef: C,
                sortPosition: r
            });
            r = (0,
            $.useMemo)(function() {
                return ge()({
                    "hlist games game-cards game-tile-list": !D,
                    "game-carousel wide-game-tile-carousel scrollable-carousel": D,
                    "games-page-carousel": o === Y.GamesPage,
                    "home-page-carousel": o === Y.HomePage
                })
            }, [D, o]);
            return K().createElement("div", {
                "data-testid": "game-carousel",
                ref: C,
                className: ge()("horizontal-scroller games-list", {
                    "home-page-games-list": o === Y.HomePage,
                    "wide-game-tile-list": D,
                    "expand-home-content": y,
                    "expand-home-content-disabled": !y
                })
            }, K().createElement("div", {
                ref: e,
                className: "clearfix horizontal-scroll-window"
            }, K().createElement("div", {
                ref: S,
                className: "horizontally-scrollable",
                style: {
                    left: L + "px"
                }
            }, K().createElement("ul", {
                ref: i,
                className: r
            }, t.map(function(e, t) {
                return D ? K().createElement(an, {
                    key: e.universeId,
                    ref: E,
                    id: t,
                    isOnScreen: V(t),
                    page: o,
                    gameData: e,
                    translate: I,
                    buildEventProperties: a,
                    componentType: u,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: v,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: h,
                    navigationRootPlaceId: m
                }) : K().createElement("li", {
                    key: e.universeId,
                    className: "list-item game-card game-tile"
                }, K().createElement(an, {
                    ref: E,
                    id: t,
                    isOnScreen: V(t),
                    page: o,
                    gameData: e,
                    className: "game-card-container",
                    translate: I,
                    buildEventProperties: a,
                    componentType: u,
                    playerCountStyle: c,
                    playButtonStyle: d,
                    hoverStyle: v,
                    topicId: g,
                    friendData: p,
                    isSponsoredFooterAllowed: h,
                    navigationRootPlaceId: m
                }))
            }))), K().createElement(An, {
                isScrollBackDisabled: N,
                isScrollForwardDisabled: A,
                onScrollBack: function() {
                    return W(H)
                },
                onScrollForward: function() {
                    return W(z)
                },
                isNewScrollArrowsEnabled: w
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
        var fr = ve
          , pr = function() {
            return (pr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (Ze = function(e) {
            function t(e, t) {
                var n = {};
                return n[L.PlaceId] = e.placeId,
                n[L.UniverseId] = e.universeId,
                n[L.IsAd] = e.isSponsored,
                n[L.NativeAdData] = e.nativeAdData,
                n[L.Position] = t,
                n[L.SortPos] = l,
                n[L.NumberOfLoadedTiles] = (i || []).length,
                n[L.GameSetTypeId] = a.topicId,
                n[L.Page] = Y.HomePage,
                n[U.HomePageSessionInfo] = T,
                n[L.PlayContext] = Y.HomePage,
                n
            }
            var n, r = e.translate, o = e.friendsPresence, i = e.gameData, a = e.sort, l = e.positionId, s = e.componentType, u = e.playerCountStyle, c = e.playButtonStyle, d = e.hoverStyle, f = e.tooltipInfoText, p = e.hideSeeAll, m = e.navigationRootPlaceId, h = e.isSponsoredFooterAllowed, v = e.seeAllLinkPath, g = e.subtitleLinkPath, y = e.itemsPerRow, b = e.startingRow, w = e.endTimestamp, I = e.countdownString, E = e.isExpandHomeContentEnabled, S = e.isCarouselHorizontalScrollEnabled, P = e.isNewScrollArrowsEnabled, _ = (0,
            $.useRef)(null), C = (0,
            $.useRef)(null), T = un(), x = (0,
            $.useCallback)(function(e) {
                if (void 0 !== i && void 0 !== b) {
                    var t = e.filter(function(e) {
                        return e < (null == i ? void 0 : i.length)
                    });
                    return pr(pr(pr(pr(pr(((e = {})[L.RootPlaceIds] = t.map(function(e) {
                        return i[e].placeId
                    }),
                    e[L.UniverseIds] = t.map(function(e) {
                        return i[e].universeId
                    }),
                    e), z(i, a.topicId, t, s)), W(i, a.topicId, t, s)), j(i, t)), J(b, null == i ? void 0 : i.length, null == i ? void 0 : i.length, t)), ((e = {})[L.NavigationUids] = t.map(function(e) {
                        return null !== (e = i[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[L.AbsPositions] = t,
                    e[L.SortPos] = l,
                    e[L.GameSetTypeId] = a.topicId,
                    e[L.Page] = Y.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e))
                }
            }, [i, T, l, a.topicId, s, b]);
            dn(_, i.length, x),
            (0,
            $.useEffect)(function() {
                E && y && null != _ && _.current && _.current.style.setProperty("--items-per-row", y.toString())
            }, [E, y]);
            var N = (0,
            $.useMemo)(function() {
                return v ? A.urlService.getAbsoluteUrl(v) : R(a.topic, Y.HomePage, {
                    position: l,
                    sortId: a.topicId,
                    page: Y.HomePage,
                    treatmentType: a.treatmentType,
                    homePageSessionInfo: T
                })
            }, [T, l, a.topic, a.topicId, a.treatmentType, v])
              , O = (0,
            $.useMemo)(function() {
                return g || N
            }, [g, N])
              , e = (0,
            $.useCallback)(function() {
                var e;
                if (v)
                    return (e = {})[L.LinkPath] = v,
                    e[L.SortPos] = l,
                    e[L.GameSetTypeId] = a.topicId,
                    e[L.Page] = Y.HomePage,
                    e[U.HomePageSessionInfo] = T,
                    e
            }, [T, l, v, a.topicId]);
            return K().createElement(vn, {
                backgroundImageAssetId: null !== (x = a.topicLayoutData) && void 0 !== x && x.backgroundImageAssetId ? parseInt(null === (x = a.topicLayoutData) || void 0 === x ? void 0 : x.backgroundImageAssetId, 10) : void 0
            }, K().createElement(yn, {
                sortTitle: a.topic,
                sortSubtitle: a.subtitle,
                seeAllLink: N,
                subtitleLink: O,
                shouldShowSeparateSubtitleLink: !!g,
                isSortLinkOverrideEnabled: !!v,
                buildNavigateToSortLinkEventProperties: e,
                shouldShowSponsoredTooltip: a.topicId === qe.adSortHomePageId,
                tooltipInfoText: f,
                titleContainerClassName: "container-header",
                hideSeeAll: p,
                endTimestamp: w,
                countdownString: I,
                backgroundImageAssetId: null !== (I = a.topicLayoutData) && void 0 !== I && I.backgroundImageAssetId ? parseInt(null === (n = a.topicLayoutData) || void 0 === n ? void 0 : n.backgroundImageAssetId, 10) : void 0,
                translate: r
            }), S ? K().createElement(fr, {
                gameData: i,
                sort: a,
                positionId: l,
                page: Y.HomePage,
                gamesContainerRef: _,
                buildEventProperties: t,
                loadMoreGames: void 0,
                isLoadingMoreGames: !1,
                componentType: s,
                playerCountStyle: u,
                playButtonStyle: c,
                itemsPerRow: y,
                friendData: o,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: h,
                hoverStyle: d,
                topicId: null === (n = a.topicId) || void 0 === n ? void 0 : n.toString(),
                isExpandHomeContentEnabled: E,
                isCarouselHorizontalScrollEnabled: S,
                isNewScrollArrowsEnabled: P,
                translate: r
            }) : K().createElement(ln, {
                ref: _,
                tileRef: C,
                gameData: i,
                friendData: o,
                buildEventProperties: t,
                translate: r,
                componentType: s,
                playerCountStyle: u,
                playButtonStyle: c,
                navigationRootPlaceId: m,
                isSponsoredFooterAllowed: h,
                hoverStyle: d,
                topicId: null === (d = a.topicId) || void 0 === d ? void 0 : d.toString(),
                isExpandHomeContentEnabled: E
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
        var mr = Ze
          , hr = function() {
            return (hr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , vr = function(e, a, l, s) {
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
          , gr = function(n, r) {
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
        function yr() {
            function i(e) {
                (e.detail || []).forEach(function(e) {
                    l.current[e.userId] && (l.current[e.userId] = hr(hr({}, l.current[e.userId]), {
                        presence: e
                    }))
                }),
                a(hr({}, l.current))
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
                return vr(e, void 0, void 0, function() {
                    var t, n, r, o;
                    return gr(this, function(e) {
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
                            }) : []).length ? [2] : [4, he(n)];
                        case 3:
                            return r = e.sent().profileDetails,
                            o = (t || []).reduce(function(e, t) {
                                var n = r.find(function(e) {
                                    return e.userId === t.id
                                });
                                return n && (e[t.id] = hr(hr({}, t), {
                                    displayName: n.names.combinedName,
                                    name: n.names.username
                                })),
                                e
                            }, {}),
                            l.current = o,
                            a(hr({}, l.current)),
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
        function br() {
            var e = (0,
            $.useContext)(wr);
            return {
                contentMetadata: e.contentMetadata,
                appendContentMetadata: e.appendContentMetadata
            }
        }
        var wr = (0,
        $.createContext)({
            contentMetadata: null,
            appendContentMetadata: function() {}
        })
          , Ir = function() {
            return (Ir = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (ve = function(e) {
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
              , h = e.subtitleLinkPath
              , v = (0,
            $.useRef)(null)
              , g = un()
              , e = (0,
            $.useCallback)(function(e) {
                if (void 0 !== r) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Ir(Ir(Ir(Ir(Ir(((e = {})[L.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[L.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), j(r, t)), ((e = {})[L.AbsPositions] = t,
                    e[L.SortPos] = a,
                    e[L.GameSetTypeId] = o.topicId,
                    e)), xn(o)), On(o)), ((e = {})[L.Page] = i,
                    e[L.NumberOfLoadedTiles] = (r || []).length,
                    e[U.DiscoverPageSessionInfo] = g,
                    e))
                }
            }, [r, g, a, o, i]);
            dn(v, r.length, e),
            (0,
            $.useEffect)(function() {
                p && null != v && v.current && v.current.style.setProperty("--items-per-row", p.toString())
            }, [p]);
            e = (0,
            $.useMemo)(function() {
                var e = Ir(Ir(((e = {})[L.Position] = a,
                e[L.GameSetTypeId] = o.topicId,
                e), xn(o)), ((t = {})[L.Page] = i,
                t[L.TreatmentType] = I.Carousel,
                t[U.DiscoverPageSessionInfo] = g,
                t))
                  , t = function(e) {
                    if (Pn(e) && e.appliedFilters) {
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
            return K().createElement("div", {
                className: ge()("games-list-container", {
                    "wide-game-tile-container": c === q.GridTile || c === q.EventTile
                })
            }, K().createElement(yn, {
                sortTitle: o.topic,
                sortSubtitle: o.subtitle,
                subtitleLink: h || e,
                seeAllLink: e,
                isSortLinkOverrideEnabled: !1,
                shouldShowSeparateSubtitleLink: !!h,
                shouldShowSponsoredTooltip: o.topicId === $e.adSortDiscoverId,
                tooltipInfoText: s,
                titleContainerClassName: "container-header games-filter-changer",
                hideSeeAll: u,
                translate: t
            }), K().createElement(fr, {
                gamesContainerRef: v,
                gameData: r,
                sort: o,
                positionId: a,
                loadMoreGames: l,
                isLoadingMoreGames: n,
                buildEventProperties: function(e, t) {
                    var n;
                    return Ir(Ir(Ir(Ir(((n = {})[L.PlaceId] = e.placeId,
                    n[L.UniverseId] = e.universeId,
                    n[L.IsAd] = e.isSponsored,
                    n[L.NativeAdData] = e.nativeAdData,
                    n[L.Position] = t,
                    n[L.SortPos] = a,
                    n[L.GameSetTypeId] = o.topicId,
                    n), xn(o)), ((n = {})[L.NumberOfLoadedTiles] = (r || []).length,
                    n[L.Page] = i,
                    n)), On(o)), ((n = {})[U.DiscoverPageSessionInfo] = g,
                    n[L.PlayContext] = Y.GamesPage,
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
        var Er = ve;
        function Sr(e) {
            var t = e.sort
              , o = br().contentMetadata;
            return 0 === (null == (e = (0,
            $.useMemo)(function() {
                return t.recommendationList.map(function(e) {
                    var t, n = e.contentType, r = e.contentId, e = null === (t = null == o ? void 0 : o[n]) || void 0 === t ? void 0 : t[r];
                    return e && ((t = e).itemId = r,
                    t.itemType = n),
                    e
                }).filter(function(e) {
                    return e
                }).slice(0, Cr)
            }, [t.recommendationList, o])) ? void 0 : e.length) ? null : K().createElement(P.AvatarShopHomepageRecommendations, {
                recommendedItems: e
            })
        }
        function Pr(e) {
            var t = e.loadData
              , n = (0,
            $.useRef)(null)
              , r = (0,
            $.useRef)(null);
            return (0,
            $.useEffect)(function() {
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
        (Ze = function(e) {
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
              , e = yr()
              , p = br().contentMetadata
              , m = d || o === Y.HomePage && (null === (d = null == n ? void 0 : n.topicLayoutData) || void 0 === d ? void 0 : d.componentType) === q.EventTile
              , f = f || o === Y.HomePage && (null === (h = null == n ? void 0 : n.topicLayoutData) || void 0 === h ? void 0 : h.componentType) === q.EventTile
              , h = (0,
            $.useMemo)(function() {
                var e;
                return m ? Cn(n, p) : u ? Cn(n, p).slice(0, i) : Cn(n, p).slice(0, function(e, t) {
                    var n = qe.maxWideGameTilesPerCarouselPage
                      , r = qe.maxTilesPerCarouselPage;
                    if (e !== Y.GamesPage)
                        switch (t) {
                        case q.GridTile:
                        case q.EventTile:
                        case q.InterestTile:
                            return n;
                        case q.AppGameTileNoMetadata:
                        default:
                            return r
                        }
                }(o, null === (e = n.topicLayoutData) || void 0 === e ? void 0 : e.componentType))
            }, [n, p, o, i, u, m]);
            return 0 === (null == h ? void 0 : h.length) ? null : o === Y.GamesPage ? K().createElement(Er, {
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
            }) : K().createElement(mr, {
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
        var _r = Ze
          , Cr = qe.maxTilesPerCarouselPage;
        function Tr(e) {
            var t = e.universeId
              , n = e.creatorName
              , r = e.creatorType
              , o = e.creatorId
              , i = e.linkUrl
              , a = e.isCreatorVerified
              , l = e.translate
              , e = (0,
            $.useRef)(null);
            return K().createElement("div", {
                ref: e,
                className: "game-card-creator-name",
                "data-testid": "game-card-creator-name"
            }, K().createElement("span", {
                className: "text-label creator-name-label"
            }, l(Qe.LabelByPrefix), " "), K().createElement("a", {
                href: i,
                onClick: function() {
                    P.EventStream.SendEventWithTarget("buttonClick", "featuredTileCreatorLabel", {
                        creatorId: o,
                        creatorType: r,
                        universeId: t
                    }, P.EventStream.TargetTypes.WWW)
                },
                className: "text-overflow text-label creator-name"
            }, n), a && K().createElement(xr.VerifiedBadgeIconContainer, {
                size: xr.BadgeSizes.CAPTIONHEADER
            }))
        }
        Pr.displayName = "SentinelTile",
        Pr.defaultProps = {
            loadData: null
        };
        var xr = RobloxBadges
          , Nr = function() {
            var e = (0,
            $.useState)({
                shouldShowVpcPlayButtonUpsells: void 0,
                shouldShowLikeFavoriteCounts: void 0
            })
              , t = e[0]
              , n = e[1]
              , e = (0,
            $.useState)(!1)
              , r = e[0]
              , o = e[1];
            return (0,
            $.useEffect)(function() {
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
            $.useMemo)(function() {
                return {
                    shouldShowVpcPlayButtonUpsells: t.shouldShowVpcPlayButtonUpsells,
                    shouldShowLikeFavoriteCounts: t.shouldShowLikeFavoriteCounts,
                    isFetchingPolicy: r
                }
            }, [t.shouldShowVpcPlayButtonUpsells, t.shouldShowLikeFavoriteCounts, r])
        };
        (ve = function(e) {
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
              , p = C
              , m = _
              , h = (0,
            $.useState)(void 0)
              , v = h[0]
              , g = h[1]
              , y = (0,
            $.useState)(void 0)
              , e = y[0]
              , b = y[1]
              , a = (0,
            $.useState)(!1)
              , c = a[0]
              , w = a[1]
              , h = Nr()
              , y = h.shouldShowVpcPlayButtonUpsells
              , a = h.isFetchingPolicy;
            (0,
            $.useEffect)(function() {
                w(!0),
                de(p.playButton, m.playButton).then(function(e) {
                    g(!0 === e.HasUpdatedPlayButtons),
                    b(!0 === e.HasUpdatedPlayButtonsVpc)
                }).catch(function() {
                    g(m.playButton.HasUpdatedPlayButtons),
                    b(m.playButton.HasUpdatedPlayButtonsVpc)
                }).finally(function() {
                    w(!1)
                })
            }, [p.playButton, m.playButton]);
            h = (0,
            $.useMemo)(function() {
                return !!d && [s.PurchaseRequired, s.FiatPurchaseRequired].includes(d)
            }, [d, s]);
            return c || a ? o ? K().createElement(u, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: s.Playable,
                eventProperties: r,
                hideButtonText: !0,
                disableLoadingState: o
            }) : K().createElement(ye.Loading, null) : !v && l(d, y, e) ? K().createElement("div", {
                className: "btn-growth-lg play-button"
            }, K().createElement("span", {
                className: "icon-status-unavailable"
            })) : K().createElement(u, {
                placeId: n,
                universeId: t,
                refetchPlayabilityStatus: f,
                playabilityStatus: d,
                eventProperties: r,
                disableLoadingState: o,
                buttonClassName: h ? "btn-common-play-game-lg purchase-button" : void 0,
                hideButtonText: !h,
                hasUpdatedPlayButtonsIxp: v,
                hasUpdatedPlayButtonsVpcIxp: e,
                shouldShowVpcPlayButtonUpsells: y,
                redirectPurchaseUrl: h ? i : void 0,
                showDefaultPurchaseText: d === s.FiatPurchaseRequired
            })
        }
        ).defaultProps = {
            playButtonEventProperties: {},
            disableLoadingState: !1,
            redirectPurchaseUrl: void 0
        };
        var Or = ve
          , Ar = function(e, a, l, s) {
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
          , Rr = function(n, r) {
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
          , Lr = (0,
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
              , c = Ce()
              , d = c[0]
              , f = c[1]
              , e = c[2]
              , p = yr()
              , l = Te(o, a)
              , m = (0,
            $.useMemo)(function() {
                return B(p, o.universeId)
            }, [p, o.universeId])
              , c = (0,
            $.useMemo)(function() {
                return 0 < m.length && s ? K().createElement(qt, {
                    gameData: s,
                    friendData: m,
                    translate: i
                }) : K().createElement("div", {
                    className: "game-card-description-info font-body",
                    "data-testid": "featured-grid-tile-description"
                }, null == s ? void 0 : s.description)
            }, [m]);
            (0,
            $.useEffect)(function() {
                Ar(void 0, void 0, void 0, function() {
                    var t;
                    return Rr(this, function(e) {
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
            var a = h(o.placeId, o.name, r(o, n))
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
            }, K().createElement(ye.Link, {
                url: a,
                className: "game-card-link",
                id: o.universeId.toString()
            }, K().createElement(At, {
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
            }, o.name), n ? K().createElement(Gt, {
                footerData: n
            }) : K().createElement(Mt, {
                totalUpVotes: o.totalUpVotes,
                totalDownVotes: o.totalDownVotes,
                playerCount: o.playerCount
            })), K().createElement(Or, {
                universeId: o.universeId.toString(),
                placeId: o.placeId.toString(),
                playButtonEventProperties: r,
                redirectPurchaseUrl: A.urlService.isValidHttpUrl(a) ? a : void 0
            })), null !== o.creatorName && K().createElement(Tr, {
                universeId: o.universeId.toString(),
                creatorId: o.creatorId,
                creatorType: o.creatorType,
                creatorName: o.creatorName,
                isCreatorVerified: null !== (r = o.creatorHasVerifiedBadge) && void 0 !== r && r,
                linkUrl: a,
                translate: i
            }), c))
        });
        Lr.displayName = "FeaturedGridTile";
        var kr = function() {
            return (kr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Dr = function(e, t) {
            var n = {};
            for (o in e)
                Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                    t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]]);
            return n
        };
        (Ze = (0,
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
              , e = Dr(e, ["emphasis", "friendData", "componentType", "playerCountStyle", "playButtonStyle", "isSponsoredFooterAllowed", "hoverStyle", "topicId", "isInterestedUniverse", "toggleInterest"]);
            return n ? K().createElement(Lr, kr({
                ref: t
            }, e)) : K().createElement(an, kr({
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
        Ze.defaultProps = {
            friendData: [],
            componentType: void 0,
            playerCountStyle: void 0,
            playButtonStyle: void 0,
            isSponsoredFooterAllowed: void 0,
            hoverStyle: void 0,
            isInterestedUniverse: void 0,
            toggleInterest: void 0
        };
        var Mr = Ze
          , Ur = (0,
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
              , h = e.hoverStyle
              , v = e.topicId
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
            return K().createElement("div", {
                "data-testid": "game-grid",
                ref: t,
                className: g
            }, n.map(function(e, t) {
                return K().createElement(Mr, {
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
                    hoverStyle: h,
                    topicId: v,
                    isInterestedUniverse: null == y ? void 0 : y.has(e.universeId),
                    toggleInterest: b ? function() {
                        return b(e.universeId)
                    }
                    : void 0
                })
            }), s && K().createElement(Pr, {
                loadData: l
            }))
        });
        Ur.displayName = "GameGrid",
        Ur.defaultProps = {
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
        var Gr = Ur
          , Br = function() {
            return (Br = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        };
        (ve = function(e) {
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
            $.useRef)(null)
              , h = (0,
            $.useRef)(null)
              , v = un()
              , e = (0,
            $.useCallback)(function(e) {
                if (void 0 !== r && void 0 !== c) {
                    var t = e.filter(function(e) {
                        return e < (null == r ? void 0 : r.length)
                    });
                    return Br(Br(Br(Br(Br(Br(((e = {})[L.RootPlaceIds] = t.map(function(e) {
                        return r[e].placeId
                    }),
                    e[L.UniverseIds] = t.map(function(e) {
                        return r[e].universeId
                    }),
                    e), z(r, o.topicId, t, n)), W(r, o.topicId, t, n)), ((e = {})[L.NavigationUids] = t.map(function(e) {
                        return null !== (e = r[e].navigationUid) && void 0 !== e ? e : "0"
                    }),
                    e[L.AbsPositions] = t,
                    e)), j(r, t)), J(c, u, null == r ? void 0 : r.length, t)), ((t = {})[L.SortPos] = i,
                    t[L.NumberOfLoadedTiles] = null == r ? void 0 : r.length,
                    t[L.GameSetTypeId] = o.topicId,
                    t[L.Page] = Y.HomePage,
                    t[U.HomePageSessionInfo] = v,
                    t))
                }
            }, [r, v, i, o.topicId, n, u, c]);
            return dn(m, r.length, e),
            (0,
            $.useEffect)(function() {
                u && null != m && m.current && m.current.style.setProperty("--items-per-row", u.toString())
            }, [u]),
            K().createElement("div", {
                "data-testid": "home-page-game-grid"
            }, K().createElement("div", {
                className: "container-header"
            }, K().createElement("h2", null, o.topic, o.topicId === qe.adSortHomePageId && K().createElement(bt, {
                tooltipText: p(et.LabelSponsoredAdsDisclosureStatic) || "Sponsored experiences are paid for by Creators. They may be shown to you based on general information about your device type, location, and demographics."
            }))), K().createElement(Ur, {
                ref: m,
                tileRef: h,
                gameData: r,
                emphasis: !1,
                translate: p,
                buildEventProperties: function(e, t) {
                    var n = {};
                    return n[L.PlaceId] = e.placeId,
                    n[L.UniverseId] = e.universeId,
                    n[L.IsAd] = e.isSponsored,
                    n[L.NativeAdData] = e.nativeAdData,
                    n[L.Position] = t,
                    n[L.SortPos] = i,
                    n[L.NumberOfLoadedTiles] = (r || []).length,
                    n[L.GameSetTypeId] = o.topicId,
                    n[L.Page] = Y.HomePage,
                    n[U.HomePageSessionInfo] = v,
                    n[L.PlayContext] = Y.HomePage,
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
        var Fr = ve
          , jr = qe.sortlessGridMaxTilesMetadataToFetch;
        (Ze = function(e) {
            var t = e.translate
              , n = e.sort
              , r = e.positionId
              , o = e.itemsPerRow
              , i = e.startingRow
              , a = e.recommendations
              , l = e.isExpandHomeContentEnabled
              , s = yr()
              , u = un()
              , e = br()
              , c = e.contentMetadata
              , d = e.appendContentMetadata
              , f = (0,
            $.useCallback)(function() {
                var e = a.filter(function(e) {
                    var t = e.contentType
                      , e = e.contentId;
                    return !(null !== (t = null == c ? void 0 : c[t]) && void 0 !== t && t[e])
                });
                0 < e.length && pe(e.slice(0, jr), u).then(function(e) {
                    return d(e.contentMetadata)
                }).catch(function() {})
            }, [a, u, c, d]);
            (0,
            $.useEffect)(function() {
                f()
            }, [f]);
            e = (0,
            $.useMemo)(function() {
                return En(a, c)
            }, [a, c]);
            return 0 === (null == e ? void 0 : e.length) ? null : K().createElement(Fr, {
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
        var Hr, zr = Ze, Vr = zi(5250);
        function Wr(e) {
            var t = e.friendsCount
              , n = e.profileUserId
              , r = e.isOwnUser
              , o = e.translate
              , e = "(" + (null != t ? t : 0) + ")"
              , n = r ? P.EnvironmentUrls.websiteUrl + "/users/friends#!/friends" : P.EnvironmentUrls.websiteUrl + "/users/" + n + "/friends#!/friends";
            return K().createElement("div", {
                className: "container-header people-list-header"
            }, null == t ? K().createElement("h2", null, o("Heading.Friends")) : K().createElement("h2", null, o("Heading.Friends"), K().createElement("span", {
                className: "friends-count"
            }, e)), K().createElement("a", {
                href: n,
                className: "btn-secondary-xs btn-more see-all-link-icon"
            }, o("Heading.SeeAll")))
        }
        zi(1315),
        (ve = {}).ItemImpressions = "itemImpressions",
        ve.ItemAction = "itemAction",
        (Ze = Hr = Hr || {}).Home = "home",
        Ze.UserProfile = "userProfile",
        (ve = {}).HomePageSessionInfo = "homePageSessionInfo",
        ve.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        ve.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ze = {}).ContentType = "contentType",
        Ze.Context = "context",
        Ze.CollectionId = "collectionId",
        Ze.CollectionPosition = "collectionPosition",
        (ve = {}).Online = "online",
        ve.InGame = "inGame",
        ve.InStudio = "inStudio",
        ve.Offline = "offline",
        (Ze = {}).Friend = "friend",
        Ze.NotFriend = "notFriend",
        (ve = {}).ItemIds = "itemIds",
        ve.ItemPositions = "itemPositions",
        ve.RowNumbers = "rowNumbers",
        ve.FeedRowNumbers = "feedRowNumbers",
        ve.PositionsInRow = "positionsInRow",
        ve.PositionsInTopic = "positionsInTopic",
        ve.TotalNumberOfItems = "totalNumberOfItems",
        (Ze = {}).Presences = "presences",
        Ze.PresenceUniverseIds = "presenceUniverseIds",
        Ze.FriendStatuses = "friendStatuses",
        Ze.SourceCarousel = "sourceCarousel",
        (ve = {}).ItemId = "itemId",
        ve.ItemPosition = "itemPosition",
        ve.RowNumber = "rowNumber",
        ve.FeedRowNumber = "feedRowNumber",
        ve.PositionInRow = "positionInRow",
        ve.PositionInTopic = "positionInTopic",
        ve.TotalNumberOfItems = "totalNumberOfItems",
        (Ze = {}).Presence = "presence",
        Ze.PresenceUniverseId = "presenceUniverseId",
        Ze.FriendStatus = "friendStatus",
        Ze.SourceCarousel = "sourceCarousel";
        var qr = function(e, a, l, s) {
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
          , $r = function(n, r) {
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
          , Kr = function(e, t) {
            for (var n = 0, r = t.length, o = e.length; n < r; n++,
            o++)
                e[o] = t[n];
            return e
        }
          , Yr = function(n) {
            return qr(void 0, void 0, Promise, function() {
                var t;
                return $r(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = {
                            url: P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/count",
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
          , Jr = function(m, h) {
            return qr(void 0, void 0, Promise, function() {
                var t, a, l, s, u, c, d, f, p;
                return $r(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return h ? [4, (i = m,
                        qr(void 0, void 0, Promise, function() {
                            var t;
                            return $r(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = {
                                        url: P.EnvironmentUrls.friendsApi + "/v1/users/" + i + "/friends/online",
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
                        o = h,
                        qr(void 0, void 0, Promise, function() {
                            var t;
                            return $r(this, function(e) {
                                switch (e.label) {
                                case 0:
                                    return t = P.EnvironmentUrls.friendsApi + "/v1/users/" + n + "/friends/find",
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
                        f = Kr(Kr([], d), f),
                        [4, (r = f,
                        qr(void 0, void 0, Promise, function() {
                            var t, n;
                            return $r(this, function(e) {
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
          , Zr = function(e, a, l, s) {
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
          , Xr = function(n, r) {
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
          , Qr = P.EnvironmentUrls.chatApi
          , eo = function() {
            return Zr(void 0, void 0, Promise, function() {
                var t;
                return Xr(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, A.httpService.get({
                            url: Qr + "/v1/metadata",
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
          , ve = {
            common: [],
            feature: "Feature.PeopleList"
        }
          , Ze = RobloxPresence
          , to = zi.n(Ze);
        function no(e) {
            var t = e.id
              , n = e.displayName
              , r = e.userProfileUrl
              , o = e.userPresence
              , i = e.hasVerifiedBadge
              , a = e.sendClickEvent
              , e = e.translate;
            return K().createElement("div", {
                className: "friend-tile-content"
            }, K().createElement(io, {
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
            }), K().createElement(xr.VerifiedBadgeIconContainer, {
                size: xr.BadgeSizes.SUBHEADER,
                additionalContainerClass: "verified-badge"
            })))), K().createElement("div", {
                className: "friends-carousel-tile-sublabel"
            }, null != o && K().createElement("div", {
                className: "friends-carousel-tile-experience"
            }, o))))
        }
        function ro(e) {
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
            }, o), K().createElement(ye.Button, {
                variant: ye.Button.variants.growth,
                size: ye.Button.sizes.small,
                width: ye.Button.widths.full,
                onClick: function() {
                    return ao(void 0, void 0, void 0, function() {
                        var t;
                        return lo(this, function(e) {
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
        function oo(e) {
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
        (Ze = function(e) {
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
            return K().createElement(ye.AvatarCardItem.Headshot, {
                statusIcon: K().createElement(to().PresenceStatusIcon, {
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
        var io = Ze
          , ao = function(e, a, l, s) {
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
          , lo = function(n, r) {
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
        function so(e) {
            return (so = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function uo(e, t) {
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
                    return co(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return co(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function co(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function fo(e, t) {
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
        function po(t, e, r) {
            var n = uo((0,
            $.useState)(new Set), 2)
              , o = n[0]
              , i = n[1]
              , a = (n = uo((0,
            $.useState)(new Set), 2))[0]
              , l = n[1]
              , s = (0,
            $.useRef)(null)
              , u = (0,
            $.useCallback)(function() {
                (function(e, t) {
                    if (0 === e.length || 0 === t)
                        return [e];
                    for (var n = [], r = 0; r < e.length; r += t)
                        n.push(e.slice(r, r + t));
                    return n
                }
                )(Array.from(a).filter(function(e) {
                    return !o.has(e)
                }), Po).filter(function(e) {
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
            Vr.debounce)(function() {
                return u()
            });
            (0,
            $.useEffect)(function() {
                var e, i = Array.from(null !== (e = null == t || null === (e = t.current) || void 0 === e ? void 0 : e.children) && void 0 !== e ? e : []).filter(function(e) {
                    return e instanceof HTMLElement
                });
                return s.current = fo({
                    elements: i,
                    threshold: _o
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
        zi(6870);
        var mo, ho, vo, go, yo, bo, wo, Io, Eo, So, Po = 25, _o = .5;
        function Co(o) {
            return Object.keys(o).reduce(function(e, t) {
                var n, r, n = (n = o[t],
                r = !1,
                Array.isArray(n) && !r ? n.join(",") : "object" === so(n) && n ? JSON.stringify(n) : "number" == typeof n || "string" == typeof n ? n : "boolean" == typeof n ? n ? 1 : 0 : void 0);
                return void 0 !== n && (e[t] = n),
                e
            }, {})
        }
        function To(e, t, n) {
            return t ? yo.InGame : e && "Studio" === n ? yo.InStudio : e ? yo.Online : yo.Offline
        }
        function xo(e) {
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
              , m = to().usePresence(t.id, void 0)
              , h = null != m && null != m.gameId
              , v = h ? m.lastLocation : null
              , e = null != v && 15 < v.length ? v.slice(0, 15) + "..." : v
              , g = h ? P.EnvironmentUrls.websiteUrl + "/games/" + (null !== (g = m.placeId) && void 0 !== g ? g : "") : ""
              , d = Ao(t, n, a, l, s, u, c, d);
            return K().createElement("div", {
                className: "friends-carousel-tile"
            }, K().createElement(oo, {
                trigger: K().createElement("button", {
                    type: "button",
                    className: "options-dropdown",
                    id: "friend-tile-button",
                    onClick: function() {}
                }, K().createElement(no, {
                    id: t.id,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: e,
                    translate: o,
                    hasVerifiedBadge: t.hasVerifiedBadge,
                    sendClickEvent: d
                })),
                content: r ? K().createElement(ro, {
                    friend: t,
                    isInGame: h,
                    universeId: null !== (m = m.universeId) && void 0 !== m ? m : 0,
                    displayName: p,
                    userProfileUrl: f,
                    userPresence: v,
                    translate: o,
                    gameUrl: g,
                    canChat: i
                }) : K().createElement("div", null),
                dropdownWidth: null == e ? 240 : 315
            }))
        }
        function No(e) {
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
            $.useRef)(null)
              , t = (h = (0,
            $.useState)(n))[0]
              , f = h[1]
              , p = (0,
            $.useState)(!1)
              , e = p[0]
              , m = p[1]
              , h = (0,
            $.useRef)(null);
            return (0,
            $.useEffect)(function() {
                var e, t = null === (e = d.current) || void 0 === e ? void 0 : e.offsetWidth;
                m(110 * (null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0) > (null != t ? t : 0)),
                null != t && null != n && (t = Math.floor(t / 110),
                f(n.slice(0, t)))
            }, [null === (p = d.current) || void 0 === p ? void 0 : p.offsetWidth, n]),
            Lo(h, n, a, l, s, u, c),
            K().createElement("div", null, K().createElement("div", {
                ref: function(e) {
                    return d.current = e,
                    d.current
                },
                className: "friends-carousel-container"
            }, null == t ? K().createElement("span", {
                className: "spinner spinner-default"
            }) : K().createElement("div", {
                ref: h,
                className: e ? "friends-carousel-list-container" : "friends-carousel-list-container-not-full"
            }, t.map(function(e, t) {
                return K().createElement("div", {
                    key: e.id
                }, K().createElement(xo, {
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
        (Ze = mo = mo || {}).ItemImpressions = "itemImpressions",
        Ze.ItemAction = "itemAction",
        (Ze = {}).Home = "home",
        Ze.UserProfile = "userProfile",
        (Ze = ho = ho || {}).HomePageSessionInfo = "homePageSessionInfo",
        Ze.DiscoverPageSessionInfo = "discoverPageSessionInfo",
        Ze.GameSearchSessionInfo = "gameSearchSessionInfo",
        (Ze = vo = vo || {}).ContentType = "contentType",
        Ze.Context = "context",
        Ze.CollectionId = "collectionId",
        Ze.CollectionPosition = "collectionPosition",
        (go = go || {}).User = "User",
        (Ze = yo = yo || {}).Online = "online",
        Ze.InGame = "inGame",
        Ze.InStudio = "inStudio",
        Ze.Offline = "offline",
        (Ze = bo = bo || {}).Friend = "friend",
        Ze.NotFriend = "notFriend",
        (Ze = wo = wo || {}).ItemIds = "itemIds",
        Ze.ItemPositions = "itemPositions",
        Ze.RowNumbers = "rowNumbers",
        Ze.FeedRowNumbers = "feedRowNumbers",
        Ze.PositionsInRow = "positionsInRow",
        Ze.PositionsInTopic = "positionsInTopic",
        Ze.TotalNumberOfItems = "totalNumberOfItems",
        (Ze = Io = Io || {}).Presences = "presences",
        Ze.PresenceUniverseIds = "presenceUniverseIds",
        Ze.FriendStatuses = "friendStatuses",
        Ze.SourceCarousel = "sourceCarousel",
        (Ze = Eo = Eo || {}).ItemId = "itemId",
        Ze.ItemPosition = "itemPosition",
        Ze.RowNumber = "rowNumber",
        Ze.FeedRowNumber = "feedRowNumber",
        Ze.PositionInRow = "positionInRow",
        Ze.PositionInTopic = "positionInTopic",
        Ze.TotalNumberOfItems = "totalNumberOfItems",
        (Ze = So = So || {}).Presence = "presence",
        Ze.PresenceUniverseId = "presenceUniverseId",
        Ze.FriendStatus = "friendStatus",
        Ze.SourceCarousel = "sourceCarousel";
        var Oo = function() {
            return (Oo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Ao = function(n, r, o, i, a, l, s, u) {
            var t = (0,
            $.useCallback)(function() {
                var e, t = {};
                return t[vo.Context] = i,
                t[vo.ContentType] = go.User,
                t[vo.CollectionId] = l,
                t[vo.CollectionPosition] = void 0 !== s ? s + 1 : -1,
                t[Eo.TotalNumberOfItems] = u,
                t[Eo.ItemId] = n.id.toString(),
                t[Eo.ItemPosition] = r + 1,
                t[Eo.PositionInTopic] = r + 1,
                t[Eo.RowNumber] = 1,
                t[So.Presence] = To(null === (e = n.presence) || void 0 === e ? void 0 : e.isOnline, null === (e = n.presence) || void 0 === e ? void 0 : e.isInGame, null === (e = n.presence) || void 0 === e ? void 0 : e.lastLocation),
                t[So.PresenceUniverseId] = null !== (e = null === (e = n.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1,
                t[So.FriendStatus] = "friend",
                t[So.SourceCarousel] = o,
                t[ho.HomePageSessionInfo] = a,
                t
            }, [n, r, a, l, s, o, i, u]);
            return (0,
            $.useCallback)(function() {
                var e = t();
                E.eventStreamService.sendEvent({
                    name: mo.ItemAction,
                    type: mo.ItemAction,
                    context: i
                }, Co(Oo({}, e)))
            }, [t, i])
        }
          , Ro = function() {
            return (Ro = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Lo = function(e, n, r, o, i, a, l) {
            var t = (0,
            $.useCallback)(function(e) {
                if (n) {
                    var t = e.filter(function(e) {
                        return e < n.length
                    });
                    return (e = {})[vo.Context] = o,
                    e[vo.ContentType] = go.User,
                    e[vo.CollectionId] = a,
                    e[vo.CollectionPosition] = void 0 !== l ? l + 1 : -1,
                    e[wo.TotalNumberOfItems] = n.length,
                    e[wo.ItemIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.id) || void 0 === e ? void 0 : e.toString()) && void 0 !== e ? e : "-1"
                    }),
                    e[wo.ItemPositions] = t.map(function(e) {
                        return e + 1
                    }),
                    e[wo.PositionsInTopic] = t.map(function(e) {
                        return e + 1
                    }),
                    e[wo.RowNumbers] = t.map(function() {
                        return 1
                    }),
                    e[Io.Presences] = t.map(function(e) {
                        var t;
                        return To(null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isOnline, null === (t = null === (t = n[e]) || void 0 === t ? void 0 : t.presence) || void 0 === t ? void 0 : t.isInGame, null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.lastLocation)
                    }),
                    e[Io.PresenceUniverseIds] = t.map(function(e) {
                        return null !== (e = null === (e = null === (e = n[e]) || void 0 === e ? void 0 : e.presence) || void 0 === e ? void 0 : e.universeId) && void 0 !== e ? e : -1
                    }),
                    e[Io.FriendStatuses] = t.map(function() {
                        return bo.Friend
                    }),
                    e[Io.SourceCarousel] = r,
                    e[ho.HomePageSessionInfo] = i,
                    e
                }
            }, [n, i, a, l, r, o])
              , s = (0,
            $.useCallback)(function(e) {
                e = t(e);
                void 0 !== e ? E.eventStreamService.sendEvent({
                    name: mo.ItemImpressions,
                    type: mo.ItemImpressions,
                    context: o
                }, Co(Ro({}, e))) : (0,
                S.fireEvent)("WebHomePageFriendsCarouselItemImpressionsUndefinedError")
            }, [t, o]);
            po(e, null !== (e = null == n ? void 0 : n.length) && void 0 !== e ? e : 0, s)
        }
          , ko = function(e, a, l, s) {
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
          , Do = function(n, r) {
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
        (Ze = function(e) {
            var t = e.translate
              , s = e.profileUserId
              , u = e.isOwnUser
              , n = e.carouselName
              , r = e.eventContext
              , o = e.homePageSessionInfo
              , i = e.sortId
              , a = e.sortPosition
              , l = (0,
            $.useState)(null)
              , c = l[0]
              , d = l[1]
              , f = (0,
            $.useState)(null)
              , e = f[0]
              , p = f[1]
              , l = (0,
            $.useState)(!1)
              , f = l[0]
              , m = l[1];
            return (0,
            $.useEffect)(function() {
                ko(void 0, void 0, void 0, function() {
                    var n, r, o, i, a, l;
                    return Do(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return a = [Yr(s), Jr(s, u), eo()],
                            [4, (t = a,
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
                            o = l[2],
                            i = n.value,
                            a = r.value,
                            l = o.value,
                            d("fulfilled" === n.status ? i.count : 0),
                            p("fulfilled" === r.status ? a : []),
                            m("fulfilled" === o.status && l.chatEnabled),
                            [2]
                        }
                        var t
                    })
                }).catch(function(e) {
                    throw e
                })
            }, [s]),
            0 === c ? K().createElement("div", {
                className: "friends-carousel-0-friends"
            }) : K().createElement("div", {
                className: "react-friends-carousel-container"
            }, K().createElement(Wr, {
                friendsCount: c,
                translate: t,
                profileUserId: s,
                isOwnUser: u
            }), K().createElement(No, {
                friendsList: e,
                translate: t,
                isOwnUser: u,
                canChat: f,
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
        var Mo = (0,
        p.withTranslations)(Ze, ve);
        function Uo(e) {
            var t = e.homePageSessionInfo
              , n = e.sortId
              , r = e.sortPosition
              , o = (e = document.querySelector('meta[name="user-data"]')) ? e.getAttribute("data-userid") : Number(null !== (o = P.CurrentUser.userId) && void 0 !== o ? o : "0");
            return K().createElement("div", {
                className: "friend-carousel-container"
            }, K().createElement(Mo, {
                profileUserId: o,
                isOwnUser: !0,
                carouselName: Ho.WebHomeFriendsCarousel,
                eventContext: Hr.Home,
                homePageSessionInfo: t,
                sortId: n,
                sortPosition: r
            }))
        }
        function Go(e) {
            var t = e.sortId
              , n = e.sortPosition
              , e = un();
            return K().createElement(Uo, {
                homePageSessionInfo: e,
                sortId: t,
                sortPosition: n
            })
        }
        function Bo(e) {
            var t = e.option
              , n = e.isSelected
              , r = e.setSelectedOptionId
              , e = e.translate;
            return K().createElement("button", {
                type: "button",
                onClick: function() {
                    return r(t.optionId)
                },
                className: ge()("filter-option", {
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
        function Fo(e) {
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
                l(t.filterId, y.Apply, r, t.selectedOptionId)
            }, [r, a, i, t.filterId, t.selectedOptionId, l])
              , u = (0,
            $.useCallback)(function() {
                var e = r;
                i(!1),
                o(t.selectedOptionId),
                l(t.filterId, y.CloseDropdown, t.selectedOptionId, e)
            }, [t.selectedOptionId, i, l, t.filterId, o, r])
              , c = (0,
            $.useCallback)(function(e) {
                n.current && e.target instanceof Node && !n.current.contains(e.target) && u()
            }, [u, n])
              , d = (0,
            $.useCallback)(function(e) {
                e.key === zo.keyBoardEventCode.escape && u()
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
                }, K().createElement(Bo, {
                    option: e,
                    isSelected: r === e.optionId,
                    setSelectedOptionId: o,
                    translate: s
                }), 0 === t && K().createElement("div", {
                    className: "filter-option-divider"
                }))
            })), K().createElement("div", {
                className: "action-buttons-container"
            }, K().createElement(ye.Button, {
                onClick: e,
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                width: ye.Button.widths.full,
                className: "apply-button",
                isDisabled: r === t.selectedOptionId
            }, s(Qe.ActionApply) || "Apply")))
        }
        function jo(e) {
            var r = e.filter
              , t = e.updateFilterValue
              , o = e.sendFilterClickEvent
              , n = e.translate
              , i = K().useRef(null)
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
            return K().createElement("div", {
                ref: i
            }, K().createElement(ye.Button, {
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
            }, K().createElement("span", {
                className: "filter-display-text"
            }, e), K().createElement("span", {
                className: a ? "icon-expand-arrow-selected" : "icon-expand-arrow"
            })), a && K().createElement(Fo, {
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
        (ve = Xo = Xo || {}).WebHomeFriendsCarousel = "WebHomeFriendsCarousel",
        ve.WebProfileFriendsCarousel = "WebProfileFriendsCarousel";
        var Ho = Xo
          , zo = Xe
          , Vo = function() {
            return (Vo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
          , Wo = function(i, a, e) {
            var l = un()
              , t = (0,
            $.useRef)(null)
              , n = (0,
            $.useCallback)(function() {
                var e = {};
                return e[L.AbsPositions] = i.filters.map(function(e, t) {
                    return t
                }),
                e[L.FilterIds] = i.filters.map(function(e) {
                    return e.filterId
                }),
                e[L.SelectedOptionIds] = i.filters.map(function(e) {
                    return e.selectedOptionId
                }),
                e[L.GameSetTypeId] = i.topicId,
                e[L.GameSetTargetId] = i.gameSetTargetId,
                e[L.SortPos] = a,
                e[U.DiscoverPageSessionInfo] = l,
                e[L.Page] = Y.GamesPage,
                e
            }, [i.filters, i.topicId, i.gameSetTargetId, a, l]);
            (0,
            $.useEffect)(function() {
                return null != e && e.current && (t.current = E.elementVisibilityService.observeVisibility({
                    element: e.current,
                    threshold: Ke.filterImpressionsIntersectionThreshold
                }, function(e) {
                    e && (e = n(),
                    (e = Q.filterImpressions(e)) && E.eventStreamService.sendEvent.apply(E.eventStreamService, e),
                    null != t && t.current && t.current())
                })),
                function() {
                    null != t && t.current && t.current()
                }
            }, [n, e]);
            var o = (0,
            $.useCallback)(function(e, t, n, r) {
                var o;
                return Vo(((o = {})[L.ButtonName] = t,
                o[L.GameSetTypeId] = i.topicId,
                o[L.GameSetTargetId] = i.gameSetTargetId,
                o[L.SortPos] = a,
                o[U.DiscoverPageSessionInfo] = l,
                o[L.Page] = Y.GamesPage,
                o[L.FilterId] = e,
                o[L.SelectedOptionId] = n,
                o), r && ((o = {})[L.PreviousOptionId] = r,
                o))
            }, [i.topicId, i.gameSetTargetId, a, l]);
            return (0,
            $.useCallback)(function(e, t, n, r) {
                r = o(e, t, n, r),
                r = Q.gamesFilterClick(r);
                r && E.eventStreamService.sendEvent.apply(E.eventStreamService, r)
            }, [o])
        };
        (Xo = function(e) {
            var o = e.sort
              , t = e.positionId
              , n = e.translate
              , i = e.fetchGamesPageData
              , e = (0,
            $.useRef)(null)
              , a = Wo(o, t, e);
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
                return K().createElement(jo, {
                    key: r.filterId,
                    filter: r,
                    updateFilterValue: function(e) {
                        return t = r.filterType,
                        n = e,
                        e = Nn([o]),
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
        var qo = Xo;
        function $o() {
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
        function Ko(o) {
            var i = un();
            (0,
            $.useEffect)(function() {
                var t = window.scrollY
                  , e = we(function() {
                    var e;
                    window.scrollY !== t && (e = null !== (e = null == (e = null === (e = document.getElementById("header")) || void 0 === e ? void 0 : e.getBoundingClientRect()) ? void 0 : e.bottom) && void 0 !== e ? e : 0,
                    wn({
                        distance: window.scrollY - t,
                        scrollAreaSize: window.innerHeight - e,
                        direction: v.Vertical,
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
        (Xe = function(e) {
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
              , m = e.fetchGamesPageData;
            switch (n.treatmentType) {
            case I.Carousel:
                return K().createElement(_r, {
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
            case I.AvatarCarousel:
                return K().createElement(Sr, {
                    sort: n
                });
            case I.SortlessGrid:
                return K().createElement(zr, {
                    translate: t,
                    sort: n,
                    positionId: r,
                    itemsPerRow: i,
                    startingRow: a,
                    recommendations: null != l ? l : [],
                    isExpandHomeContentEnabled: c
                });
            case I.FriendCarousel:
                return K().createElement(Go, {
                    sortId: n.topicId,
                    sortPosition: r
                });
            case I.Pills:
                return K().createElement(qo, {
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
        var Yo = Xe
          , Jo = function(e, o, r) {
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
                Vr.isEqual)(s, l) && (0,
                Vr.isEqual)(null == e ? void 0 : e.sorts, u) || function() {
                    var i = new Map
                      , a = new Map;
                    null != e && e.sorts.forEach(function(e) {
                        var t;
                        e.treatmentType === I.SortlessGrid && ((t = null !== (t = i.get(e.topicId)) && void 0 !== t ? t : []).push.apply(t, e.recommendationList),
                        i.set(e.topicId, t))
                    });
                    var l = new Map;
                    null != e && e.sorts.forEach(function(e, t) {
                        var n, r, o;
                        e.treatmentType === I.SortlessGrid && (n = null !== (r = i.get(e.topicId)) && void 0 !== r ? r : [],
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
            $.useRef)(null)
              , d = (0,
            $.useCallback)(function(e, t) {
                if (o || e.treatmentType === I.InterestGrid) {
                    var n = null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType;
                    return function(e, t, n, r, o, i) {
                        var a = n ? (r ? Et : It)[n] : St;
                        if (!e)
                            return a.minTilesPerRow;
                        var l = a.minTileWidth
                          , s = a.columnGap
                          , n = a.minTilesPerRow
                          , a = a.maxTilesPerRow
                          , s = Math.floor((e - t + s) / (l + s))
                          , s = Math.min(a, Math.max(n, s));
                        return r && o === I.Carousel && void 0 !== i && s < i ? s + .3 : s
                    }(t, 1, n, r || n === q.EventTile, null == e ? void 0 : e.treatmentType, null === (n = null == e ? void 0 : e.recommendationList) || void 0 === n ? void 0 : n.length)
                }
                return (null === (n = e.topicLayoutData) || void 0 === n ? void 0 : n.componentType) === q.GridTile || (null === (e = e.topicLayoutData) || void 0 === e ? void 0 : e.componentType) === q.EventTile ? t && t < qe.wideGameTileTilesPerRowBreakpointWidth ? qe.minWideGameTilesPerCarouselPage : qe.maxWideGameTilesPerCarouselPage : t && t < qe.homeFeedMaxWidth ? Math.max(1, Math.floor(t / qe.gameTileWidth)) : qe.maxTilesPerCarouselPage
            }, [o, r])
              , f = (0,
            $.useCallback)(function(n) {
                var r = new Map;
                null != e && e.sorts.forEach(function(e, t) {
                    (e.treatmentType === I.SortlessGrid || e.treatmentType === I.InterestGrid || o && e.treatmentType === I.Carousel) && r.set(t, d(e, n))
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
          , Zo = function() {
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
          , Xo = {
            common: [],
            feature: "Feature.ContactUpsell"
        }
          , Qo = (P.EnvironmentUrls.apiGatewayUrl,
        P.EnvironmentUrls.voiceApi);
        function ei(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        var ti = function() {
            var l, e = (l = regeneratorRuntime.mark(function e(t, n) {
                var r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return r = {
                                retryable: !0,
                                withCredentials: !0,
                                url: "".concat(Qo, "/v1/settings/user-opt-in")
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
                        ei(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        ei(r, t, n, o, i, "throw", e)
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
        function ni(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function ri(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function oi(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? ri(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : ri(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function ii(e, n) {
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
                            return null === P.UpsellService || void 0 === P.UpsellService ? void 0 : P.UpsellService.renderPhoneUpsell(oi({
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
                                                ti(!0, !1);
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
                                            ni(r, t, n, o, i, "next", e)
                                        }
                                        function i(e) {
                                            ni(r, t, n, o, i, "throw", e)
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
                    buttonStackOrientation: fi
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
                    buttonStackOrientation: di
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
        var ai = {
            ContactMethodEmail: "ContactMethodEmail",
            ContactMethodPhoneNumber: "ContactMethodPhoneNumber",
            ContactMethodPhoneNumberVoiceOptIn: "ContactMethodPhoneNumberVoiceOptIn",
            ContactMethodPhoneNumberEmailHorizontalLayout: "ContactMethodPhoneNumberEmailHorizontalLayout",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1",
            ContactMethodPhoneNumberEmailVerticalLayout: "ContactMethodPhoneNumberEmailVerticalLayout",
            FacebookSunset: "FacebookSunset",
            ContactMethodMandatoryEmailPhone: "ContactMethodMandatoryEmailPhone"
        }
          , li = {
            ContactMethodEmail: "Label.DontGetLockedOut",
            ContactMethodPhoneNumber: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberVoiceOptIn: "Header.UnlockVoiceChat",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.DontGetLockedOut",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Heading.FinishAccountSetup",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.DontGetLockedOut",
            FacebookSunset: ""
        }
          , si = {
            ContactMethodEmail: "Description.HomePageUpsellCardAddEmailText",
            ContactMethodPhoneNumber: "Description.HomePageUpsellCardAddPhoneText",
            ContactMethodPhoneNumberVoiceOptIn: "Description.UnlockVoiceChat.3",
            ContactMethodPhoneNumberEmailHorizontalLayout: "Label.RecoverYourAccount",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "Description.ContactMethodAccessLoss",
            ContactMethodPhoneNumberEmailVerticalLayout: "Label.RecoverYourAccount",
            FacebookSunset: "Description.FacebookSetPasswordUpsellText"
        }
          , ui = {
            ContactMethodEmail: "homePageUpsellCard",
            ContactMethodPhoneNumber: "homePageUpsellCard",
            ContactMethodPhoneNumberVoiceOptIn: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayout: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "homePageUpsellCard",
            ContactMethodPhoneNumberEmailVerticalLayout: "homePageUpsellCard",
            FacebookSunset: "facebookSunsetCard"
        }
          , ci = {
            ContactMethodEmail: "email",
            ContactMethodPhoneNumber: "phone",
            ContactMethodPhoneNumberVoiceOptIn: "phone",
            ContactMethodPhoneNumberEmailHorizontalLayout: "emailOrPhone",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "emailOrPhone",
            ContactMethodPhoneNumberEmailVerticalLayout: "emailOrPhone",
            FacebookSunset: "facebook"
        }
          , di = "vertical"
          , fi = "horizontal"
          , pi = {
            ContactMethodEmail: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumber: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberVoiceOptIn: "icon-voice-mic-unmuted",
            ContactMethodPhoneNumberEmailHorizontalLayout: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1: "upsell-card-lock-icon-image",
            ContactMethodPhoneNumberEmailVerticalLayout: "upsell-card-lock-icon-image",
            FacebookSunset: ""
        };
        function mi(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function hi(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? mi(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = o[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : mi(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        function vi(e, t, n, r, o) {
            o = 4 < arguments.length && void 0 !== o ? o : void 0,
            E.eventStreamService.sendEventWithTarget(e.type, ui[n], hi(hi({}, e.params), {}, {
                origin: t,
                section: r,
                btn: o
            }))
        }
        var Xe = E.eventStreamService.eventTypes
          , gi = "mandatory"
          , yi = "homepage"
          , bi = {
            cardShown: {
                name: "cardShown",
                type: Xe.modalAction,
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
        function wi(e, t) {
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
                    return Ii(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Ii(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Ii(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Ei(e) {
            var t = e.translate
              , n = e.cardType
              , r = e.origin
              , o = e.titleTextOverride
              , i = e.bodyTextOverride
              , a = e.requireExplicitVoiceConsent
              , l = wi((0,
            $.useState)(!1), 2)
              , s = l[0]
              , u = l[1]
              , c = ci[n];
            (0,
            $.useEffect)(function() {
                vi(bi.cardShown, r, n, c)
            }, []);
            var e = ii(n, a)
              , d = null == e ? void 0 : e.primaryButton
              , l = d ? K().createElement(ye.Button, {
                className: "btn-primary-md",
                id: "upsell-card-primary-button",
                onClick: function() {
                    vi(bi.buttonClick, r, n, c, d.buttonClickBtnLog),
                    d.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(d.text)) : null
              , f = null == e ? void 0 : e.secondaryButton
              , a = f ? K().createElement(ye.Button, {
                className: "btn-secondary-md",
                id: "upsell-card-secondary-button",
                onClick: function() {
                    vi(bi.buttonClick, r, n, c, f.buttonClickBtnLog),
                    f.onClick(function(e) {
                        u(e)
                    })
                }
            }, t(f.text)) : null
              , e = null !== (e = null == e ? void 0 : e.buttonStackOrientation) && void 0 !== e ? e : fi
              , a = K().createElement("div", {
                className: e === fi ? "upsell-card-horizontal-button-list" : "upsell-card-vertical-button-list"
            }, l, a)
              , o = Si(o) ? t(li[n]) : o
              , i = Si(i) ? t(si[n]) : i
              , o = K().createElement("div", {
                className: "upsell-card-text-content-group"
            }, li[n] ? K().createElement("div", {
                className: "font-header-1"
            }, " ", o) : null, K().createElement("div", {
                className: "upsell-card-content"
            }, " ", i))
              , i = pi[n] ? K().createElement("div", {
                className: "home-page-upsell-card-image ".concat(pi[n])
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
        function Si(e) {
            return !e || 0 === e.length
        }
        Ei.defaultProps = {
            origin: "homepage",
            titleTextOverride: "",
            bodyTextOverride: "",
            requireExplicitVoiceConsent: !0
        },
        Ei.propTypes = {
            translate: re().func.isRequired,
            cardType: re().string.isRequired,
            titleTextOverride: re().string,
            bodyTextOverride: re().string,
            origin: re().string,
            requireExplicitVoiceConsent: re().bool
        };
        var Pi = Ei
          , _i = function(e) {
            return !![ai.ContactMethodEmail, ai.ContactMethodPhoneNumber, ai.ContactMethodPhoneNumberEmailHorizontalLayout, ai.ContactMethodPhoneNumberEmailHorizontalLayoutAltContent1, ai.ContactMethodPhoneNumberEmailVerticalLayout, ai.ContactMethodPhoneNumberVoiceOptIn, ai.FacebookSunset].includes(e)
        };
        function Ci(e, t, n, r, o, i, a) {
            try {
                var l = e[i](a)
                  , s = l.value
            } catch (e) {
                return void n(e)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, o)
        }
        function Ti(l) {
            return function() {
                var e = this
                  , a = arguments;
                return new Promise(function(t, n) {
                    var r = l.apply(e, a);
                    function o(e) {
                        Ci(r, t, n, o, i, "next", e)
                    }
                    function i(e) {
                        Ci(r, t, n, o, i, "throw", e)
                    }
                    o(void 0)
                }
                )
            }
        }
        function xi(e, t) {
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
                    return Ni(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return Ni(e, t)
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function Ni(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function Oi(e) {
            var t = e.translate
              , n = ai.ContactMethodMandatoryEmailPhone
              , r = xi((0,
            $.useState)(null), 2)
              , o = r[0]
              , i = r[1]
              , a = xi((0,
            $.useState)(""), 2)
              , l = a[0]
              , s = a[1]
              , e = xi((0,
            $.useState)(""), 2)
              , r = e[0]
              , u = e[1]
              , a = xi((0,
            $.useState)(!1), 2)
              , e = a[0]
              , c = a[1];
            return (0,
            $.useEffect)(function() {
                var e = function() {
                    var e = Ti(regeneratorRuntime.mark(function e() {
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
                    var e = Ti(regeneratorRuntime.mark(function e() {
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
            $.useEffect)(function() {
                o === n && null !== P.UpsellService && void 0 !== P.UpsellService && P.UpsellService.renderContactMethodPromptModal({
                    origin: yi,
                    section: gi
                })
            }, [o]),
            _i(o) ? K().createElement(Pi, {
                translate: t,
                cardType: o,
                titleTextOverride: l,
                bodyTextOverride: r,
                requireExplicitVoiceConsent: e
            }) : null
        }
        Oi.propTypes = {
            translate: re().func.isRequired
        };
        var Ai = Oi;
        function Ri(e) {
            var t = e.translate
              , e = e.context;
            return K().createElement(Ai, {
                translate: t,
                context: e
            })
        }
        function Li(e) {
            var t, o = e.sort, n = e.itemsPerRow, r = e.toggleInterest, i = e.interestedUniverses, a = e.homePageSessionInfo, l = e.translate, s = (0,
            $.useRef)(null), u = (0,
            $.useRef)(null), c = br().contentMetadata, d = (0,
            $.useMemo)(function() {
                return En(o.recommendationList, c)
            }, [o.recommendationList, c]), f = (0,
            $.useCallback)(function(t) {
                var e = null == d ? void 0 : d.findIndex(function(e) {
                    return e.universeId === t
                });
                if (void 0 !== e && -1 !== e) {
                    var n, r = d[e];
                    return (n = {})[L.ButtonName] = g.Interested,
                    n[L.PlaceId] = r.placeId,
                    n[L.UniverseId] = t,
                    n[L.Position] = e,
                    n[L.GameSetTypeId] = o.topicId,
                    n[L.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    n[L.Page] = Y.InterestCatcher,
                    n[U.HomePageSessionInfo] = a,
                    n[L.IsInterested] = !i.has(t),
                    n
                }
            }, [i, d, a, o.topicId]), p = (0,
            $.useCallback)(function(e) {
                r(e);
                e = f(e),
                e = Q.interestCatcherClick(e);
                void 0 !== e && E.eventStreamService.sendEvent.apply(E.eventStreamService, e)
            }, [r, f]), e = (0,
            $.useCallback)(function(e) {
                if (d) {
                    var t = e.filter(function(e) {
                        return e < (null == d ? void 0 : d.length)
                    });
                    return Ui(Ui(Ui(((e = {})[L.RootPlaceIds] = t.map(function(e) {
                        return d[e].placeId
                    }),
                    e[L.UniverseIds] = t.map(function(e) {
                        return d[e].universeId
                    }),
                    e), z(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), W(d, o.topicId, t, null === (e = null == o ? void 0 : o.topicLayoutData) || void 0 === e ? void 0 : e.componentType)), ((e = {})[L.AbsPositions] = t,
                    e[L.NumberOfLoadedTiles] = null == d ? void 0 : d.length,
                    e[L.GameSetTypeId] = o.topicId,
                    e[L.Page] = Y.InterestCatcher,
                    e[U.HomePageSessionInfo] = a,
                    e))
                }
            }, [d, a, o.topicId, null === (t = null == o ? void 0 : o.topicLayoutData) || void 0 === t ? void 0 : t.componentType]);
            return dn(s, null !== (t = null == d ? void 0 : d.length) && void 0 !== t ? t : 0, e),
            (0,
            $.useLayoutEffect)(function() {
                n && null != s && s.current && s.current.style.setProperty("--items-per-row", n.toString())
            }, [n]),
            K().createElement(Gr, {
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
        function ki(e) {
            var t = e.sort
              , n = e.itemsPerRow
              , r = e.fetchRecommendations
              , o = e.translate
              , i = (f = (0,
            $.useState)(new Set))[0]
              , a = f[1]
              , l = un()
              , s = (0,
            $.useCallback)(function(e) {
                var t = {};
                return t[L.ButtonName] = e,
                t[U.HomePageSessionInfo] = l,
                t[L.InterestedUniverseIds] = Array.from(i),
                t[L.Page] = Y.InterestCatcher,
                t
            }, [l, i])
              , u = (0,
            $.useCallback)(function(e) {
                e = s(e),
                e = Q.interestCatcherClick(e);
                void 0 !== e && E.eventStreamService.sendEvent.apply(E.eventStreamService, e)
            }, [s])
              , c = (0,
            $.useCallback)(function() {
                r([]),
                u(g.Skip)
            }, [r, u])
              , d = (0,
            $.useCallback)(function() {
                r(Array.from(i)),
                u(g.Continue)
            }, [i, r, u])
              , e = (0,
            $.useMemo)(function() {
                return null != i && i.size ? o(nt.ActionInterestCatcherContinueSelected, {
                    numSelected: i.size
                }) : o(nt.ActionInterestCatcherContinue)
            }, [i, o])
              , f = (0,
            $.useCallback)(function(e) {
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
            }, !(null != i && i.size) && K().createElement(ye.Button, {
                variant: ye.Button.variants.secondary,
                size: ye.Button.sizes.medium,
                title: o(nt.ActionInterestCatcherSkip),
                onClick: c,
                className: "skip-button"
            }, o(nt.ActionInterestCatcherSkip)), K().createElement(ye.Button, {
                variant: ye.Button.variants.primary,
                size: ye.Button.sizes.medium,
                title: e,
                onClick: d,
                isDisabled: !(null != i && i.size),
                className: "continue-button"
            }, e))), K().createElement(Li, {
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
        Ri.defaultProps = {
            context: ai.ContactMethod
        },
        Ri.propTypes = {
            translate: re().func.isRequired,
            context: re().string
        };
        var Di, Mi = (0,
        p.withTranslations)(Ri, Xo), Ui = function() {
            return (Ui = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Gi = function() {
            return (Gi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }, Bi = qe.maxTilesPerCarouselPage, Fi = C, ji = _, Hi = (Di = (0,
        p.withTranslations)(function(e) {
            var n = e.translate
              , t = un()
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
                return Zo()
            }, [])
              , c = (0,
            $.useMemo)(function() {
                try {
                    return (0,
                    E.dataStores.authIntentDataStore.retrieveAuthIntentDataForUser)()
                } catch (e) {
                    return void console.error("Error retrieving auth intent data:", e)
                }
            }, [])
              , d = (0,
            $.useCallback)(function(e) {
                i(void 0),
                s(!1),
                fe(Ee.Home, t, u, c, e).then(function(e) {
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
            $.useEffect)(function() {
                d()
            }, [d]);
            var f = (0,
            $.useState)(void 0)
              , e = f[0]
              , p = f[1];
            (0,
            $.useEffect)(function() {
                de(Fi.homePageWeb, ji.homePageWeb).then(function(e) {
                    p(e)
                }).catch(function() {
                    p(ji.homePageWeb)
                })
            }, []);
            var m = null == e ? void 0 : e.IsExpandHomeContentEnabled
              , h = null == e ? void 0 : e.IsCarouselHorizontalScrollEnabled
              , v = null == e ? void 0 : e.IsNewScrollArrowsEnabled
              , r = (0,
            $.useCallback)(function(n) {
                i(function(e) {
                    var t;
                    return e && Gi(Gi({}, e), {
                        contentMetadata: ((t = {})[w.Game] = Gi(Gi({}, e.contentMetadata[w.Game]), n[w.Game]),
                        t[w.CatalogAsset] = Gi(Gi({}, e.contentMetadata[w.CatalogAsset]), n[w.CatalogAsset]),
                        t[w.CatalogBundle] = Gi(Gi({}, e.contentMetadata[w.CatalogBundle]), n[w.CatalogBundle]),
                        t)
                    })
                })
            }, [])
              , a = Jo(o, m, h)
              , f = a.homeFeedRef
              , g = a.gridRecommendationsMap
              , y = a.itemsPerRowMap
              , b = a.startingRowNumbersMap;
            Ko(Y.HomePage);
            e = (0,
            $.useMemo)(function() {
                return !(null == o || !o.sorts) && o.sorts.every(function(e) {
                    return e.treatmentType !== I.FriendCarousel
                })
            }, [null == o ? void 0 : o.sorts]),
            a = (0,
            $.useMemo)(function() {
                return null == o ? void 0 : o.sorts.findIndex(function(e) {
                    return e.treatmentType === I.InterestGrid
                })
            }, [null == o ? void 0 : o.sorts]);
            if (l)
                return K().createElement("div", {
                    className: "game-home-page-container",
                    "data-testid": "HomePageContainerTestId"
                }, K().createElement("h2", null, n(et.LabelGames)), K().createElement(_e, {
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
                    length: Bi
                }, function(e, t) {
                    return K().createElement($o, {
                        key: t
                    })
                })));
            if (void 0 !== a && -1 < a) {
                l = o.sorts[a];
                if (l && Sn(l))
                    return K().createElement("div", {
                        className: "game-home-page-container",
                        "data-testid": "HomePageContainerTestId"
                    }, K().createElement("div", {
                        ref: f
                    }, K().createElement(wr.Provider, {
                        value: {
                            contentMetadata: o.contentMetadata,
                            appendContentMetadata: r
                        }
                    }, K().createElement(ki, {
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
            }, K().createElement(wr.Provider, {
                value: {
                    contentMetadata: o.contentMetadata,
                    appendContentMetadata: r
                }
            }, K().createElement(Mi, {
                translate: n,
                context: void 0
            }), e && K().createElement(Uo, {
                homePageSessionInfo: t,
                sortId: void 0,
                sortPosition: 0
            }), o.sorts.map(function(e, t) {
                return K().createElement(K().Fragment, {
                    key: t
                }, K().createElement(Yo, {
                    translate: n,
                    sort: e,
                    positionId: t,
                    startingRow: b.get(t),
                    currentPage: Y.HomePage,
                    itemsPerRow: y.get(t),
                    gridRecommendations: null !== (t = g.get(t)) && void 0 !== t ? t : [],
                    isExpandHomeContentEnabled: m,
                    isCarouselHorizontalScrollEnabled: h,
                    isNewScrollArrowsEnabled: v
                }))
            }))))
        }, ee),
        function(e) {
            return K().createElement(sn, null, K().createElement(Di, fn({}, e)))
        }
        );
        (0,
        A.ready)(function() {
            l() && (0,
            e.render)(K().createElement(Hi, null), l())
        })
    }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/1f78c0b0b9295aa71e9b352839943040-placesList.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("PlacesList");
