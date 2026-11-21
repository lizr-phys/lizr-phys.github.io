(() => {
  const root = document.documentElement;
  const nav = document.querySelector(".home-nav .nav-links");
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1)));
  const hoverLines = links.map((link) => link.querySelector(".nav-link-line"));
  const line = document.createElement("span");
  const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
  let activeLink;
  let frame = 0;
  let jumpIndex = null;
  let jumpTimer;

  line.className = "nav-section-line";
  line.setAttribute("aria-hidden", "true");

  function sectionAtScroll() {
    // Match the offset used by the browser for the section links.
    const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const margin = parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0;
    const readLine = padding + margin + 1;
    let index = 0;
    for (let i = 1; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top > readLine) break;
      index = i;
    }

    const maxScroll = root.scrollHeight - root.clientHeight;
    if (window.scrollY >= maxScroll - 1) {
      // Some sections near the end cannot scroll as high as their anchor offset.
      const target = links.findIndex((link) => link.hash === location.hash);
      if (target >= index) index = target;
      else if (maxScroll > 0) index = sections.length - 1;
    }

    return index;
  }

  function update() {
    frame = 0;
    // Keep the destination selected while the browser scrolls to a clicked anchor.
    const index = jumpIndex ?? sectionAtScroll();
    const link = links[index];
    // Use the hover line's geometry for the whole slide, including its final position.
    const target = hoverLines[index].getBoundingClientRect();
    const bounds = nav.getBoundingClientRect();

    if (link !== activeLink) {
      activeLink?.removeAttribute("aria-current");
      link.setAttribute("aria-current", "location");
      activeLink = link;
    }

    line.style.top = `${target.top - bounds.top}px`;
    line.style.width = `${target.width}px`;
    line.style.transform = `translateX(${target.left - bounds.left}px)`;
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function finishJump() {
    if (jumpIndex === null) return;
    jumpIndex = null;
    clearTimeout(jumpTimer);
    scheduleUpdate();
  }

  function restartJumpTimer() {
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(finishJump, 160);
  }

  function interruptJump() {
    if (jumpIndex === null) return;
    // End the anchor's smooth scroll before handling manual scrolling.
    window.scrollTo({ top: window.scrollY, behavior: "instant" });
    finishJump();
  }

  update();
  nav.append(line);
  nav.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const index = links.findIndex((link) => link.contains(event.target));
    if (index < 0) return;
    jumpIndex = index;
    restartJumpTimer();
    scheduleUpdate();
  });
  window.addEventListener("scroll", () => {
    if (jumpIndex === null) scheduleUpdate();
    else restartJumpTimer();
  }, { passive: true });
  window.addEventListener("wheel", interruptJump, { passive: true });
  window.addEventListener("touchmove", interruptJump, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (!event.defaultPrevented && scrollKeys.has(event.key)) interruptJump();
  });
  window.addEventListener("hashchange", () => {
    if (jumpIndex !== null && links[jumpIndex].hash !== location.hash) finishJump();
    scheduleUpdate();
  });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) finishJump();
    scheduleUpdate();
  });
  new ResizeObserver(scheduleUpdate).observe(nav);
})();
