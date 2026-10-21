// Progressive enhancements: the page is fully readable without this script.
(() => {
  // Binary "rain" background in the hero
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
