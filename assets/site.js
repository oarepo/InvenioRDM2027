// Progressive enhancements: the page is fully readable without this script.
(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Binary "rain" background (hero + registration band)
  const cta = document.querySelector(".cta");
  if (cta) cta.prepend(Object.assign(document.createElement("div"), { className: "binary" }));
  const glyphs = ["0", "1", "■", " ", " "];
  document.querySelectorAll(".binary").forEach((el) => {
    const cols = Math.ceil(el.offsetWidth / 32);
    for (let i = 0; i < cols; i++) {
      const rows = Array.from({ length: 40 }, () => glyphs[(Math.random() * glyphs.length) | 0]);
      const col = document.createElement("span");
      col.textContent = rows.concat(rows).join("\n"); // doubled for a seamless loop
      col.style.opacity = (0.06 + Math.random() * 0.2).toFixed(2);
      col.style.animationDuration = `${40 + Math.random() * 60}s`;
      col.style.animationDelay = `-${Math.random() * 60}s`;
      el.append(col);
    }
  });

  // Marquee: duplicate the items so the strip loops without a gap
  document.querySelectorAll(".marquee").forEach((m) => {
    const track = document.createElement("div");
    track.className = "marquee__track";
    track.append(...m.children);
    track.append(...[...track.children].map((c) => Object.assign(c.cloneNode(true), { ariaHidden: "true" })));
    m.append(track);
  });

  // Scroll reveal, staggered within each group
  const revealTargets = ".band > h2, .band > p, .band > h3, .card, .tile, .day, .counters > p, .map";
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(revealTargets).forEach((el) => {
    const index = [...el.parentElement.children].indexOf(el);
    el.style.setProperty("--delay", `${Math.min(index, 5) * 0.1}s`);
    el.classList.add("reveal");
    io.observe(el);
  });

  // Count-up numbers
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIo.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, suffix = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = to + suffix; return; }
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".count[data-to]").forEach((el) => { el.textContent = "0"; countIo.observe(el); });

  // Countdown to the meeting
  const cd = document.querySelector(".countdown");
  if (cd) {
    const start = new Date(cd.dataset.start);
    const set = (unit, v) => { cd.querySelector(`[data-unit="${unit}"]`).textContent = v; };
    const update = () => {
      const ms = Math.max(0, start - Date.now());
      set("d", Math.floor(ms / 864e5));
      set("h", Math.floor(ms / 36e5) % 24);
      set("m", Math.floor(ms / 6e4) % 60);
    };
    update();
    setInterval(update, 30e3);
  }

  // Navbar: shadow when stuck, highlight current section
  const nav = document.querySelector(".navbar");
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.navbar__cta)')];
  addEventListener("scroll", () => nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= 0), { passive: true });
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const s = document.querySelector(a.hash); if (s) navIo.observe(s); });
})();
