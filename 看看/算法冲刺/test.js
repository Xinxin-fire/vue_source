var e,n, t,r,i,a = -1;
  var o = function (e) {
    addEventListener(
      'pageshow',
      function (n) {
        n.persisted && ((a = n.timeStamp), e(n))
      },
      !0
    )
  },
  c = function () {
    return (
      window.performance &&
      performance.getEntriesByType &&
      performance.getEntriesByType('navigation')[0]
    )
  },
  u = function () {
    var e = c()
    return (e && e.activationStart) || 0
  },
  f = function (e, n) {
    var t = c(),
      r = 'navigate'
    return (
      a >= 0
        ? (r = 'back-forward-cache')
        : t &&
          (r =
            document.prerendering || u() > 0
              ? 'prerender'
              : document.wasDiscarded
              ? 'restore'
              : t.type.replace(/_/g, '-')),
      {
        name: e,
        value: void 0 === n ? -1 : n,
        rating: 'good',
        delta: 0,
        entries: [],
        id: 'v3-'
          .concat(Date.now(), '-')
          .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        navigationType: r,
      }
    )
  },
  s = function (e, n, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        var r = new PerformanceObserver(function (e) {
          Promise.resolve().then(function () {
            n(e.getEntries())
          })
        })
        return r.observe(Object.assign({ type: e, buffered: !0 }, t || {})), r
      }
    } catch (e) {}
  },
  d = function (e, n, t, r) {
    var i, a
    return function (o) {
      n.value >= 0 &&
        (o || r) &&
        ((a = n.value - (i || 0)) || void 0 === i) &&
        ((i = n.value),
        (n.delta = a),
        (n.rating = (function (e, n) {
          return e > n[1] ? 'poor' : e > n[0] ? 'needs-improvement' : 'good'
        })(n.value, t)),
        e(n))
    }
  },
  l = function (e) {
    requestAnimationFrame(function () {
      return requestAnimationFrame(function () {
        return e()
      })
    })
  },
  p = function (e) {
    var n = function (n) {
      ;('pagehide' !== n.type && 'hidden' !== document.visibilityState) || e(n)
    }
    addEventListener('visibilitychange', n, !0),
      addEventListener('pagehide', n, !0)
  },
  v = function (e) {
    var n = !1
    return function (t) {
      n || (e(t), (n = !0))
    }
  },
  m = -1,
  h = function () {
    return 'hidden' !== document.visibilityState || document.prerendering
      ? 1 / 0
      : 0
  },
  g = function (e) {
    'hidden' === document.visibilityState &&
      m > -1 &&
      ((m = 'visibilitychange' === e.type ? e.timeStamp : 0), T())
  },
  y = function () {
    addEventListener('visibilitychange', g, !0),
      addEventListener('prerenderingchange', g, !0)
  },
  T = function () {
    removeEventListener('visibilitychange', g, !0),
      removeEventListener('prerenderingchange', g, !0)
  },
  E = function () {
    return (
      m < 0 &&
        ((m = h()),
        y(),
        o(function () {
          setTimeout(function () {
            ;(m = h()), y()
          }, 0)
        })),
      {
        get firstHiddenTime() {
          return m
        },
      }
    )
  },
  C = function (e) {
    document.prerendering
      ? addEventListener(
          'prerenderingchange',
          function () {
            return e()
          },
          !0
        )
      : e()
  },
  L = [1800, 3e3],
  b = function (e, n) {
    ;(n = n || {}),
      C(function () {
        var t,
          r = E(),
          i = f('FCP'),
          a = s('paint', function (e) {
            e.forEach(function (e) {
              'first-contentful-paint' === e.name &&
                (a.disconnect(),
                e.startTime < r.firstHiddenTime &&
                  ((i.value = Math.max(e.startTime - u(), 0)),
                  i.entries.push(e),
                  t(!0)))
            })
          })
        a &&
          ((t = d(e, i, L, n.reportAllChanges)),
          o(function (r) {
            ;(i = f('FCP')),
              (t = d(e, i, L, n.reportAllChanges)),
              l(function () {
                ;(i.value = performance.now() - r.timeStamp), t(!0)
              })
          }))
      })
  },
  w = [0.1, 0.25],
  S = function (e, n) {
    ;(n = n || {}),
      b(
        v(function () {
          var t,
            r = f('CLS', 0),
            i = 0,
            a = [],
            c = function (e) {
              e.forEach(function (e) {
                if (!e.hadRecentInput) {
                  var n = a[0],
                    t = a[a.length - 1]
                  i &&
                  e.startTime - t.startTime < 1e3 &&
                  e.startTime - n.startTime < 5e3
                    ? ((i += e.value), a.push(e))
                    : ((i = e.value), (a = [e]))
                }
              }),
                i > r.value && ((r.value = i), (r.entries = a), t())
            },
            u = s('layout-shift', c)
          u &&
            ((t = d(e, r, w, n.reportAllChanges)),
            p(function () {
              c(u.takeRecords()), t(!0)
            }),
            o(function () {
              ;(i = 0),
                (r = f('CLS', 0)),
                (t = d(e, r, w, n.reportAllChanges)),
                l(function () {
                  return t()
                })
            }),
            setTimeout(t, 0))
        })
      )
  },
  A = { passive: !0, capture: !0 },
  I = new Date(),
  P = function (r, i) {
    e || ((e = i), (n = r), (t = new Date()), k(removeEventListener), F())
  },
  F = function () {
    if (n >= 0 && n < t - I) {
      var i = {
        entryType: 'first-input',
        name: e.type,
        target: e.target,
        cancelable: e.cancelable,
        startTime: e.timeStamp,
        processingStart: e.timeStamp + n,
      }
      r.forEach(function (e) {
        e(i)
      }),
        (r = [])
    }
  },
  M = function (e) {
    if (e.cancelable) {
      var n =
        (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp
      'pointerdown' == e.type
        ? (function (e, n) {
            var t = function () {
                P(e, n), i()
              },
              r = function () {
                i()
              },
              i = function () {
                removeEventListener('pointerup', t, A),
                  removeEventListener('pointercancel', r, A)
              }
            addEventListener('pointerup', t, A),
              addEventListener('pointercancel', r, A)
          })(n, e)
        : P(n, e)
    }
  },
  k = function (e) {
    ;['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(function (
      n
    ) {
      return e(n, M, A)
    })
  },
  D = [100, 300],
  x = function (t, i) {
    ;(i = i || {}),
      C(function () {
        var a,
          c = E(),
          u = f('FID'),
          l = function (e) {
            e.startTime < c.firstHiddenTime &&
              ((u.value = e.processingStart - e.startTime),
              u.entries.push(e),
              a(!0))
          },
          m = function (e) {
            e.forEach(l)
          },
          h = s('first-input', m)
        ;(a = d(t, u, D, i.reportAllChanges)),
          h &&
            p(
              v(function () {
                m(h.takeRecords()), h.disconnect()
              })
            ),
          h &&
            o(function () {
              var o
              ;(u = f('FID')),
                (a = d(t, u, D, i.reportAllChanges)),
                (r = []),
                (n = -1),
                (e = null),
                k(addEventListener),
                (o = l),
                r.push(o),
                F()
            })
      })
  },
  B = 0,
  R = 1 / 0,
  H = 0,
  N = function (e) {
    e.forEach(function (e) {
      e.interactionId &&
        ((R = Math.min(R, e.interactionId)),
        (H = Math.max(H, e.interactionId)),
        (B = H ? (H - R) / 7 + 1 : 0))
    })
  },
  O = function () {
    return i ? B : performance.interactionCount || 0
  },
  q = function () {
    'interactionCount' in performance ||
      i ||
      (i = s('event', N, { type: 'event', buffered: !0, durationThreshold: 0 }))
  },
  j = [200, 500],
  _ = 0,
  z = function () {
    return O() - _
  },
  G = [],
  J = {},
  K = function (e) {
    var n = G[G.length - 1],
      t = J[e.interactionId]
    if (t || G.length < 10 || e.duration > n.latency) {
      if (t) t.entries.push(e), (t.latency = Math.max(t.latency, e.duration))
      else {
        var r = { id: e.interactionId, latency: e.duration, entries: [e] }
        ;(J[r.id] = r), G.push(r)
      }
      G.sort(function (e, n) {
        return n.latency - e.latency
      }),
        G.splice(10).forEach(function (e) {
          delete J[e.id]
        })
    }
  },
  Q = function (e, n) {
    ;(n = n || {}),
      C(function () {
        q()
        var t,
          r = f('INP'),
          i = function (e) {
            e.forEach(function (e) {
              ;(e.interactionId && K(e), 'first-input' === e.entryType) &&
                !G.some(function (n) {
                  return n.entries.some(function (n) {
                    return (
                      e.duration === n.duration && e.startTime === n.startTime
                    )
                  })
                }) &&
                K(e)
            })
            var n,
              i = ((n = Math.min(G.length - 1, Math.floor(z() / 50))), G[n])
            i &&
              i.latency !== r.value &&
              ((r.value = i.latency), (r.entries = i.entries), t())
          },
          a = s('event', i, { durationThreshold: n.durationThreshold || 40 })
        ;(t = d(e, r, j, n.reportAllChanges)),
          a &&
            (a.observe({ type: 'first-input', buffered: !0 }),
            p(function () {
              i(a.takeRecords()),
                r.value < 0 && z() > 0 && ((r.value = 0), (r.entries = [])),
                t(!0)
            }),
            o(function () {
              ;(G = []),
                (_ = O()),
                (r = f('INP')),
                (t = d(e, r, j, n.reportAllChanges))
            }))
      })
  },
  U = [2500, 4e3],
  V = {},
  W = function (e, n) {
    ;(n = n || {}),
      C(function () {
        var t,
          r = E(),
          i = f('LCP'),
          a = function (e) {
            var n = e[e.length - 1]
            n &&
              n.startTime < r.firstHiddenTime &&
              ((i.value = Math.max(n.startTime - u(), 0)),
              (i.entries = [n]),
              t())
          },
          c = s('largest-contentful-paint', a)
        if (c) {
          t = d(e, i, U, n.reportAllChanges)
          var m = v(function () {
            V[i.id] ||
              (a(c.takeRecords()), c.disconnect(), (V[i.id] = !0), t(!0))
          })
          ;['keydown', 'click'].forEach(function (e) {
            addEventListener(e, m, !0)
          }),
            p(m),
            o(function (r) {
              ;(i = f('LCP')),
                (t = d(e, i, U, n.reportAllChanges)),
                l(function () {
                  ;(i.value = performance.now() - r.timeStamp),
                    (V[i.id] = !0),
                    t(!0)
                })
            })
        }
      })
  },
  X = [800, 1800],
  Y = function e(n) {
    document.prerendering
      ? C(function () {
          return e(n)
        })
      : 'complete' !== document.readyState
      ? addEventListener(
          'load',
          function () {
            return e(n)
          },
          !0
        )
      : setTimeout(n, 0)
  },
  Z = function (e, n) {
    n = n || {}
    var t = f('TTFB'),
      r = d(e, t, X, n.reportAllChanges)
    Y(function () {
      var i = c()
      if (i) {
        var a = i.responseStart
        if (a <= 0 || a > performance.now()) return
        ;(t.value = Math.max(a - u(), 0)),
          (t.entries = [i]),
          r(!0),
          o(function () {
            ;(t = f('TTFB', 0)), (r = d(e, t, X, n.reportAllChanges))(!0)
          })
      }
    })
  }
export {
  w as CLSThresholds,
  L as FCPThresholds,
  D as FIDThresholds,
  j as INPThresholds,
  U as LCPThresholds,
  X as TTFBThresholds,
  S as getCLS,
  b as getFCP,
  x as getFID,
  Q as getINP,
  W as getLCP,
  Z as getTTFB,
  S as onCLS,
  b as onFCP,
  x as onFID,
  Q as onINP,
  W as onLCP,
  Z as onTTFB,
}
