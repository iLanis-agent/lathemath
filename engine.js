/* LatheMath engine - machining speeds and feeds. Pure functions, no DOM. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LatheMath = api;
}(typeof self !== 'undefined' ? self : this, function () {

  // Surface speeds in m/min: [HSS, carbide]
  var SPEEDS = {
    mild: [30, 100],
    aluminum: [90, 300],
    brass: [60, 200],
    stainless: [15, 60]
  };

  function surfaceSpeed(material, tool) {
    var row = SPEEDS[material] || SPEEDS.mild;
    return tool === 'carbide' ? row[1] : row[0];
  }

  // RPM from cutting speed (m/min) and work diameter (mm).
  function rpmFor(vc, diameterMm) {
    if (!(diameterMm > 0)) return 0;
    return Math.round(vc * 1000 / (Math.PI * diameterMm));
  }

  // Minutes for one pass: length / (feed per rev * rpm).
  function cutTime(lengthMm, feedMmRev, rpm) {
    var rate = feedMmRev * rpm;
    if (!(rate > 0)) return 0;
    return Math.round(lengthMm / rate * 100) / 100;
  }

  // 60-degree metric external thread radial infeed depth.
  function threadDepth(pitchMm) {
    return Math.round(0.6134 * pitchMm * 1000) / 1000;
  }

  // Tap drill for a metric internal thread: major - pitch.
  function tapDrill(majorMm, pitchMm) {
    return Math.round((majorMm - pitchMm) * 100) / 100;
  }

  // Suggested infeed passes at ~0.127 mm per pass plus a spring pass.
  function threadPasses(depthMm, perPassMm) {
    var per = perPassMm || 0.127;
    if (!(depthMm > 0)) return 0;
    return Math.ceil(depthMm / per) + 1;
  }

  // Compound-rest angle for a taper, degrees off the cross slide.
  function taperAngle(bigMm, smallMm, lengthMm) {
    if (!(lengthMm > 0)) return 0;
    return Math.round(Math.atan((bigMm - smallMm) / (2 * lengthMm)) * 180 / Math.PI * 1000) / 1000;
  }

  // Diameter change per mm of length.
  function taperRatio(bigMm, smallMm, lengthMm) {
    if (!(lengthMm > 0)) return 0;
    return Math.round((bigMm - smallMm) / lengthMm * 10000) / 10000;
  }

  return {
    surfaceSpeed: surfaceSpeed,
    rpmFor: rpmFor,
    cutTime: cutTime,
    threadDepth: threadDepth,
    tapDrill: tapDrill,
    threadPasses: threadPasses,
    taperAngle: taperAngle,
    taperRatio: taperRatio
  };
}));
