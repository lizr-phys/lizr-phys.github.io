(() => {
  "use strict";
  const root = document.getElementById("llm-ptp-demo");
  if (!root) return;
  const canvas = root.querySelector(".ptp-canvas");
  const svg = root.querySelector(".ptp-wires");
  const caption = root.querySelector(".ptp-explanation");
  const playButton = root.querySelector("[data-ptp-play]");
  const choices = [...root.querySelectorAll("[data-ptp-mechanism]")];
  const nodes = Object.fromEntries([...root.querySelectorAll("[data-ptp-node]")].map(node => [node.dataset.ptpNode, node]));
  const banks = [...root.querySelectorAll("[data-ptp-bank]")];
  const tables = [...root.querySelectorAll("[data-ptp-table]")];
  const tableArea = root.querySelector(".ptp-tables");
  const requests = [...root.querySelectorAll("[data-ptp-request]")].map(element => ({ element, label: element.querySelector("text"), cycle: -1, translated: false, bank: 1 }));
  const tasks = [...root.querySelectorAll("[data-ptp-task]")];
  const feedback = [...root.querySelectorAll("[data-ptp-feedback]")];
  const copies = [...root.querySelectorAll("[data-ptp-copy]")];
  const links = Object.fromEntries([...root.querySelectorAll("[data-ptp-link]")].map(path => [path.dataset.ptpLink, path]));
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const stages = ["addressing", "scheduling", "remapping"];
  const duration = 3.6;
  const descriptions = {
    gpu: "GPU: issues logical requests and executes placed operators.",
    atu: "SRAM + ATU: translates requests through the active mapping.",
    pim: "PIM banks: receive translated requests and memory-side work.",
    scheduler: "Scheduler: uses execution feedback to revise operator placement."
  };
  const routes = {};
  let selected = 0, elapsed = 0, wholeRound = true, complete = false;
  let playing = false, visible = false, printing = false, consent = false;
  let hasRun = false, frame = null, lastTime = null;
  let hovering = null, focused = null, pinned = null;
  let geometryReady = false;
  let lastReduced = preference.matches;
  const clamp = value => Math.max(0, Math.min(1, value));
  const setText = (element, text) => { if (element.textContent !== text) element.textContent = text; };

  function route(name, points) {
    const distances = points.slice(1).map((point, index) => Math.hypot(point[0] - points[index][0], point[1] - points[index][1]));
    routes[name] = { points, distances, total: distances.reduce((sum, value) => sum + value, 0) };
    links[name].setAttribute("d", points.map((point, index) => `${index ? "L" : "M"}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(" "));
  }

  function pointAt(name, progress) {
    const path = routes[name];
    let length = path.total * clamp(progress);
    for (let i = 0; i < path.distances.length; i++) {
      const distance = path.distances[i];
      if (length <= distance || i === path.distances.length - 1) {
        const fraction = distance ? clamp(length / distance) : 0;
        return path.points[i].map((value, axis) => value + (path.points[i + 1][axis] - value) * fraction);
      }
      length -= distance;
    }
    return path.points[0];
  }

  function move(element, name, progress, show = true) {
    element.style.display = show ? "" : "none";
    if (!show) return;
    const point = pointAt(name, progress);
    element.setAttribute("transform", `translate(${point[0].toFixed(2)} ${point[1].toFixed(2)})`);
  }

  function layout() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const rect = element => {
      const box = element.getBoundingClientRect();
      return { l: box.left - bounds.left, r: box.right - bounds.left, t: box.top - bounds.top, b: box.bottom - bounds.top, x: (box.left + box.right) / 2 - bounds.left, y: (box.top + box.bottom) / 2 - bounds.top };
    };
    const gpu = rect(nodes.gpu), atu = rect(nodes.atu), pim = rect(nodes.pim), scheduler = rect(nodes.scheduler);
    const bankBoxes = banks.map(rect);
    const narrow = bounds.width <= 540;
    svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    root.dataset.layout = narrow ? "stacked" : "wide";
    const inJoint = (gpu.r + atu.l) / 2;
    route("request-in", [[gpu.r, gpu.y], [inJoint, gpu.y], [inJoint, atu.y], [atu.l, atu.y]]);
    bankBoxes.forEach((bank, index) => {
      const joint = narrow ? bank.l - 10 : (atu.r + bank.l) / 2;
      route(`bank${index}`, narrow ? [[atu.x, atu.b], [atu.x, atu.b + 28], [joint, atu.b + 28], [joint, bank.y], [bank.l, bank.y]] : [[atu.r, atu.y], [joint, atu.y], [joint, bank.y], [bank.l, bank.y]]);
    });
    if (narrow) {
      route("gpu-task", [[scheduler.x, scheduler.t], [gpu.x, gpu.b]]);
      route("pim-task", [[scheduler.r, scheduler.y], [pim.l - 10, scheduler.y], [pim.l - 10, bankBoxes[2].y], [bankBoxes[2].l, bankBoxes[2].y]]);
      route("gpu-feedback", [[gpu.l, gpu.y], [4, gpu.y], [4, scheduler.y], [scheduler.l, scheduler.y]]);
      route("pim-feedback", [[pim.x, pim.b], [pim.x, bounds.height - 12], [scheduler.x, bounds.height - 12], [scheduler.x, scheduler.b]]);
    } else {
      route("gpu-task", [[scheduler.x, scheduler.t], [scheduler.x, 118], [gpu.x, 118], [gpu.x, gpu.b]]);
      route("pim-task", [[scheduler.x, scheduler.t], [scheduler.x, 118], [pim.l - 50, 118], [pim.l - 50, bankBoxes[2].y], [bankBoxes[2].l, bankBoxes[2].y]]);
      route("gpu-feedback", [[gpu.x, gpu.b], [gpu.x, scheduler.y], [scheduler.l, scheduler.y]]);
      route("pim-feedback", [[pim.x, pim.b], [pim.x, scheduler.y], [scheduler.r, scheduler.y]]);
    }
    route("copy", [[bankBoxes[1].r, bankBoxes[1].y], [bounds.width - 4, bankBoxes[1].y], [bounds.width - 4, bankBoxes[3].y], [bankBoxes[3].r, bankBoxes[3].y]]);
    geometryReady = true;
    root.dataset.ready = "true";
    render();
  }

  function state() {
    const index = wholeRound ? Math.min(2, Math.floor(elapsed / duration)) : selected;
    const progress = clamp((wholeRound ? elapsed - index * duration : elapsed) / duration);
    return { index, mode: stages[index], progress: !hasRun && elapsed === 0 ? [0.72, 0.86, 1][index] : progress, clock: !hasRun && elapsed === 0 ? 1 : elapsed };
  }

  function explain(current) {
    const node = focused || hovering || pinned;
    if (node) {
      root.dataset.focus = node;
      setText(caption, descriptions[node]);
      return;
    }
    delete root.dataset.focus;
    const text = current.mode === "addressing" ? "ATU maps logical requests to banks without GPU-side layout changes." : current.mode === "scheduling" ? "Execution feedback revises the next operator placement (schematic)." : current.progress < 0.2 ? "Prepare a shadow mapping while foreground requests continue." : current.progress < 0.6 ? "Copy a few blocks while the active table serves requests." : "Swap table roles; subsequent requests use the new mapping.";
    setText(caption, text);
  }

  function render() {
    if (!geometryReady) return;
    const current = state(), p = current.progress;
    const remapping = current.mode === "remapping";
    const swapping = remapping ? clamp((p - 0.6) / 0.2) : 0;
    const smooth = swapping * swapping * (3 - 2 * swapping);
    const swapped = remapping && p >= 0.8;
    const activeBank = swapped ? 3 : 1;
    const activeTargets = new Set();
    root.dataset.mechanism = current.mode;
    root.dataset.mapping = swapped ? "B3" : "B1";
    root.dataset.remapPhase = !remapping ? "idle" : p < 0.2 ? "prepare" : p < 0.6 ? "copy" : p < 0.8 ? "swap" : "active";
    choices.forEach((button, index) => {
      const active = String(index === current.index);
      if (button.getAttribute("aria-pressed") !== active) button.setAttribute("aria-pressed", active);
    });
    tables.forEach((table, index) => {
      const isActive = swapped ? index === 1 : index === 0;
      const shift = (tableArea.clientWidth / 2 - 3) * smooth * (index ? -1 : 1);
      table.style.transform = `translate(${shift.toFixed(2)}px, ${(Math.sin(swapping * Math.PI) * (index ? 4 : -4)).toFixed(2)}px)`;
      table.dataset.active = String(isActive);
      setText(table.querySelector("[data-ptp-role]"), isActive ? "Active" : "Shadow");
      setText(table.querySelector("[data-ptp-map]"), index ? (remapping && p < 0.14 ? "Preparing" : "A → B3") : "A → B1");
    });
    Object.entries(links).forEach(([name, path]) => path.classList.toggle("is-running", name === "request-in" || name === `bank${activeBank}` || (current.mode === "scheduling" && (name.includes("task") || name.includes("feedback"))) || (remapping && p >= 0.2 && p < 0.6 && name === "copy")));
    requests.forEach((request, index) => {
      const position = current.clock / 1.25 + index * 0.47;
      const cycle = Math.floor(position), progress = position - cycle;
      if (cycle !== request.cycle) { request.cycle = cycle; request.translated = false; }
      // Latch the mapping at translation; an in-flight request keeps its old bank.
      if (progress >= 0.4 && !request.translated) { request.bank = activeBank; request.translated = true; }
      if (progress < 0.4) {
        setText(request.label, "A");
        move(request.element, "request-in", progress / 0.4);
      } else if (progress < 0.55) {
        request.element.style.display = "none";
      } else {
        setText(request.label, `B${request.bank}`);
        move(request.element, `bank${request.bank}`, (progress - 0.55) / 0.45);
        activeTargets.add(request.bank);
      }
    });
    tasks.forEach((task, index) => {
      if (current.mode !== "scheduling" || (p >= 0.3 && p < 0.6) || (p < 0.3 && index === 2)) { task.style.display = "none"; return; }
      const revised = p >= 0.6;
      const target = revised ? ["pim-task", "gpu-task", "pim-task"][index] : ["gpu-task", "pim-task"][index];
      const progress = revised ? clamp((p - 0.6 - index * 0.025) / (0.4 - index * 0.025)) : clamp(p / 0.3);
      move(task, target, progress);
      if (target === "pim-task") activeTargets.add(2);
    });
    feedback.forEach((dot, index) => move(dot, index ? "pim-feedback" : "gpu-feedback", (p - 0.3) / 0.3, current.mode === "scheduling" && p >= 0.3 && p <= 0.6));
    copies.forEach((block, index) => move(block, "copy", ((p - 0.2) / 0.4 * 2 + index * 0.5) % 1, remapping && p >= 0.2 && p < 0.6));
    banks.forEach((bank, index) => {
      bank.classList.toggle("is-target", activeTargets.has(index));
      bank.classList.toggle("is-copy", remapping && p >= 0.2 && p < 0.6 && (index === 1 || index === 3));
    });
    nodes.scheduler.classList.toggle("is-active", current.mode === "scheduling" && p >= 0.3);
    explain(current);
  }

  const canPlay = () => playing && visible && !document.hidden && !printing && (!preference.matches || consent);
  function readPreference() {
    const reduced = preference.matches;
    if (reduced !== lastReduced) {
      lastReduced = reduced;
      if (reduced) { playing = false; consent = false; }
    }
  }
  function tick(now) {
    frame = null;
    readPreference();
    if (!canPlay()) { sync(); return; }
    elapsed += lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    const end = duration * (wholeRound ? 3 : 1);
    if (elapsed >= end) { elapsed = end; playing = false; complete = true; }
    render();
    sync();
  }

  function sync() {
    readPreference();
    setText(playButton, playing ? "Pause" : complete ? "Replay" : "Play");
    playButton.setAttribute("aria-label", playing ? "Pause LLM-PTP demonstration" : complete ? "Replay LLM-PTP demonstration" : "Play LLM-PTP demonstration");
    root.dataset.motion = !playing ? complete ? "complete" : preference.matches ? "reduced-motion" : "paused" : !visible ? "offscreen" : document.hidden ? "background" : printing ? "printing" : "playing";
    if (canPlay()) {
      if (frame === null) frame = requestAnimationFrame(tick);
    } else {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null; lastTime = null;
    }
  }

  function resetRequests() { requests.forEach(request => { request.cycle = -1; request.translated = false; request.bank = 1; }); }
  choices.forEach((button, index) => {
    button.disabled = false;
    button.addEventListener("click", () => {
      readPreference();
      wholeRound = false; selected = index;
      elapsed = 0; complete = false; hasRun = playing;
      lastTime = null; pinned = null; resetRequests(); render(); sync();
    });
  });
  playButton.disabled = false;
  playButton.addEventListener("click", () => {
    const resume = !playing;
    readPreference();
    consent = resume && preference.matches;
    if (complete || !hasRun) { elapsed = 0; complete = false; resetRequests(); }
    playing = resume; hasRun = true; lastTime = null; render(); sync();
  });
  Object.entries(nodes).forEach(([name, node]) => {
    const button = node.matches("button") ? node : node.querySelector("button");
    button.disabled = false;
    node.addEventListener("pointerenter", event => { if (event.pointerType !== "touch") { hovering = name; explain(state()); } });
    node.addEventListener("pointerleave", () => { hovering = null; explain(state()); });
    node.addEventListener("focusin", () => { focused = name; explain(state()); });
    node.addEventListener("focusout", () => { focused = null; explain(state()); });
    button.addEventListener("click", () => { pinned = name; explain(state()); });
  });
  root.addEventListener("pointerdown", event => { if (!event.target.closest("[data-ptp-node]")) { pinned = null; explain(state()); } });
  preference.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("beforeprint", () => { printing = true; sync(); });
  window.addEventListener("afterprint", () => { printing = false; sync(); });
  window.addEventListener("pagehide", () => { visible = false; sync(); });
  const updateVisibility = value => {
    visible = value;
    sync();
  };
  window.addEventListener("pageshow", () => {
    const bounds = root.getBoundingClientRect();
    const shown = Math.max(0, Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, 0));
    updateVisibility(bounds.height > 0 && shown / bounds.height >= 0.15);
  });
  if ("IntersectionObserver" in window) new IntersectionObserver(([entry]) => updateVisibility(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: [0, 0.15] }).observe(root);
  else updateVisibility(true);
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(canvas);
  else window.addEventListener("resize", layout);
  layout(); sync();
})();
