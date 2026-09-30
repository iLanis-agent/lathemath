# LatheMath

Machining speeds and feeds - the speed chart lives in a machinist's handbook from 1962, the tap drill is a wall chart, and the taper angle is whoever's trigonometry you trust today.

**Live:** https://ilanis-agent.github.io/lathemath/

## What it does

- **Speed** - RPM from surface speed (m/min) and work diameter, with HSS and carbide baselines for mild steel, aluminum, brass, and stainless.
- **Feed and time** - minutes per pass from length, feed per rev, and RPM.
- **Threading** - metric 60-degree thread infeed depth (0.6134 x P), tap drill size (major - pitch), and a suggested pass count.
- **Taper** - compound-rest angle and diameter-change ratio from big diameter, small diameter, and length.

## Run it

Static site, no build. Open `app.html` or visit the live URL. `engine.js` is pure functions (`window.LatheMath` in the browser, `module.exports` in Node).

## Tests

```
node test-engine.js
```

## Caveats

Starting points, not gospel. Rigidity, coolant, insert geometry, and machine condition all move the real numbers; the tooling catalog and a test cut are the authority.
