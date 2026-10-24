(() => {
  "use strict";

  const root = document.getElementById("washbasin-demo");
  if (!root) return;
  const wall = root.querySelector("[data-basin-wall]");
  const water = root.querySelector("[data-basin-water]");
  const depth = root.querySelector("[data-basin-depth]");
  const density = root.querySelector("[data-basin-density]");
  const waterLevel = root.querySelector("[data-basin-level]");
  const liquidClip = root.querySelector("[data-basin-liquid-clip]");
  const particleGroup = root.querySelector("[data-basin-particles]");
  const toggle = root.querySelector("[data-basin-toggle]");
  const handles = [...root.querySelectorAll("[data-basin-handle]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hovering = new Set();
  const focused = new Set();
  const held = new Set();
  const radius = 55;
  const baseAmplitude = 6;
  const drivenAmplitude = 13;
  const baseSpeed = 2 * Math.PI / 3.8;
  // Fixed, staggered sites: density changes occupancy, never the grid spacing.
  const particles = Array.from({ length: 40 }, (_, index) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const row = Math.floor(index / 8);
    dot.setAttribute("cx", (125 + (index % 8) * 4.1 + (row % 2) * 0.5).toFixed(2));
    dot.setAttribute("cy", (81 + row * 4.5).toFixed(2));
    dot.setAttribute("r", "0.65");
    particleGroup.append(dot);
    return { dot, rank: ((index * 13) % 40) / 40 };
  });
  const samples = Array.from({ length: 120 }, (_, index) => {
    const theta = index * 2 * Math.PI / 120;
    return { x: Math.cos(theta), y: Math.sin(theta), shape: Math.sin(2 * theta) };
  });
  const markers = [...root.querySelectorAll("[data-basin-displacement]")].map((group) => {
    const theta = Number(group.dataset.basinDisplacement) * Math.PI / 180;
    return { x: Math.cos(theta), y: Math.sin(theta), shape: Math.sin(2 * theta), line: group.querySelector("line"), tip: group.querySelector("circle") };
  });

  let phase = 0;
  let amplitude = baseAmplitude;
  let targetSpeed = baseSpeed;
  let speed = baseSpeed;
  let paused = true;
  let motionConsent = false;
  let visible = false;
  let printing = false;
  let frame = null;
  let lastTime = null;
  let pulseUntil = 0;
  let pulseTimer;
  let lastReduced = reducedMotion.matches;

  const excited = () => hovering.size > 0 || focused.size > 0 || held.size > 0 || performance.now() < pulseUntil;
  const canAnimate = () => visible && !document.hidden && !printing && !paused && (!reducedMotion.matches || motionConsent);

  function readPreference() {
    const reduced = reducedMotion.matches;
    if (reduced !== lastReduced) {
      lastReduced = reduced;
      if (reduced) { paused = true; motionConsent = false; }
    }
  }

  function draw() {
    const displacement = amplitude * Math.cos(phase);
    wall.setAttribute("d", samples.map((sample, index) => {
      const r = radius + displacement * sample.shape;
      return `${index ? "L" : "M"}${(140 + r * sample.x).toFixed(2)},${(70 - r * sample.y).toFixed(2)}`;
    }).join(" ") + " Z");
    markers.forEach((marker) => {
      const r = radius + displacement * marker.shape;
      const x = (140 + r * marker.x).toFixed(2);
      const y = (70 - r * marker.y).toFixed(2);
      marker.line.setAttribute("x2", x);
      marker.line.setAttribute("y2", y);
      marker.tip.setAttribute("cx", x);
      marker.tip.setAttribute("cy", y);
    });
  }

  function animate(now) {
    frame = null;
    readPreference();
    if (!canAnimate()) { syncMotion(); return; }
    const dt = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const driven = excited();
    root.dataset.excited = String(driven);
    amplitude += ((driven ? drivenAmplitude : baseAmplitude) - amplitude) * (1 - Math.exp(-dt / 0.22));
    speed += (targetSpeed - speed) * (1 - Math.exp(-dt / 0.25));
    phase = (phase + speed * dt) % (2 * Math.PI);
    draw();
    frame = requestAnimationFrame(animate);
  }

  function syncMotion() {
    readPreference();
    toggle.textContent = paused ? "Play" : "Pause";
    toggle.setAttribute("aria-label", paused ? "Play vibration" : "Pause vibration");
    root.dataset.motion = paused ? (reducedMotion.matches ? "reduced-motion" : "paused") : !visible ? "offscreen" : document.hidden ? "background" : printing ? "printing" : "playing";
    if (canAnimate()) {
      if (frame === null) {
        lastTime = null;
        frame = requestAnimationFrame(animate);
      }
    } else {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    }
  }

  function updateExcitation() {
    root.dataset.excited = String(excited());
  }

  function pulse() {
    pulseUntil = performance.now() + 900;
    clearTimeout(pulseTimer);
    pulseTimer = setTimeout(() => { pulseUntil = 0; updateExcitation(); }, 920);
    updateExcitation();
  }

  handles.forEach((handle) => {
    handle.disabled = false;
    handle.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") hovering.add(handle);
      updateExcitation();
    });
    handle.addEventListener("pointerleave", () => { hovering.delete(handle); updateExcitation(); });
    handle.addEventListener("pointerdown", (event) => {
      held.add(handle);
      handle.setPointerCapture(event.pointerId);
      updateExcitation();
    });
    const release = () => { held.delete(handle); updateExcitation(); };
    handle.addEventListener("pointerup", release);
    handle.addEventListener("pointercancel", release);
    handle.addEventListener("lostpointercapture", release);
    handle.addEventListener("focus", () => {
      if (handle.matches(":focus-visible")) focused.add(handle);
      updateExcitation();
    });
    handle.addEventListener("blur", () => { focused.delete(handle); held.delete(handle); updateExcitation(); });
    handle.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") { held.add(handle); updateExcitation(); }
    });
    handle.addEventListener("keyup", release);
    handle.addEventListener("click", pulse);
  });

  function updateDepth() {
    const level = Number(depth.value) / 100;
    const relativeDensity = 0.5 + Number(density.value) / 100;
    // Qualitative added mass proportional to density times depth; no calibrated units.
    targetSpeed = baseSpeed / Math.sqrt(1 + 1.8 * level * relativeDensity);
    water.setAttribute("fill-opacity", (0.035 + level * 0.06 + relativeDensity * 0.035).toFixed(3));
    const height = 1 + 20 * level;
    [waterLevel, liquidClip].forEach((element) => {
      element.setAttribute("y", (101 - height).toFixed(2));
      element.setAttribute("height", height.toFixed(2));
    });
    const occupancy = relativeDensity / 1.5;
    particles.forEach(({ dot, rank }) => {
      const fade = Math.max(0, Math.min(1, (occupancy - rank) / 0.16));
      dot.setAttribute("opacity", (0.78 * fade * fade * (3 - 2 * fade)).toFixed(3));
    });
    waterLevel.setAttribute("fill-opacity", (0.14 + relativeDensity * 0.12).toFixed(2));
    depth.setAttribute("aria-valuetext", level < 0.34 ? "Shallow water; less added mass; faster vibration" : level < 0.67 ? "Moderate water depth and added mass" : "Deep water; more added mass; slower vibration");
    density.setAttribute("aria-valuetext", relativeDensity < 0.84 ? "Lower density; less added mass; faster vibration" : relativeDensity < 1.17 ? "Moderate water density" : "Higher density; more added mass; slower vibration");
  }

  depth.disabled = false;
  depth.addEventListener("input", updateDepth);
  density.disabled = false;
  density.addEventListener("input", updateDepth);
  toggle.disabled = false;
  toggle.addEventListener("click", () => {
    const stop = !paused;
    readPreference();
    paused = stop;
    motionConsent = !paused && reducedMotion.matches;
    syncMotion();
  });
  reducedMotion.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncMotion);
  window.addEventListener("blur", () => { hovering.clear(); focused.clear(); held.clear(); updateExcitation(); });
  window.addEventListener("beforeprint", () => { printing = true; syncMotion(); });
  window.addEventListener("afterprint", () => { printing = false; syncMotion(); });
  window.addEventListener("pagehide", () => { visible = false; syncMotion(); });
  window.addEventListener("pageshow", () => {
    // A cached page may return without a new intersection callback.
    const bounds = root.getBoundingClientRect();
    visible = bounds.bottom > 0 && bounds.top < window.innerHeight && bounds.right > 0 && bounds.left < window.innerWidth;
    syncMotion();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0 }).observe(root);
  } else {
    visible = true;
  }

  updateDepth();
  speed = targetSpeed;
  draw();
  syncMotion();
})();
