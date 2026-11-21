(() => {
  const root = document.documentElement;
  const nav = document.querySelector(".home-nav .nav-links");
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1)));
  const hoverLines = links.map((link) => link.querySelector(".nav-link-line"));
  const line = document.createElement("span");
  let activeLink;
  let frame = 0;

  line.className = "nav-section-line";
  line.setAttribute("aria-hidden", "true");

  function update() {
    frame = 0;
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

  update();
  nav.append(line);
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("pageshow", scheduleUpdate);
  new ResizeObserver(scheduleUpdate).observe(nav);
})();
