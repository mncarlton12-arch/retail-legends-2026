/* Retail Legends — page renderer (data comes from shared/config.js) */
(function () {
  "use strict";
  const RL = window.SEN_CONFIG.retailLegends;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Hero meta: date · time · city · venue (venue only when confirmed) */
  const meta = document.getElementById("hero-meta");
  if (meta) {
    const parts = [RL.date, RL.time, RL.city];
    if (RL.venue) parts.push(RL.venue);
    else parts.push("Venue to be announced");
    meta.innerHTML = parts.map(esc).join(' <span class="dot" aria-hidden="true">&middot;</span> ');
  }

  const theme = document.getElementById("hero-theme");
  if (theme) theme.textContent = "“" + RL.theme + "”";

  /* What we'll explore */
  const grid = document.getElementById("themes-grid");
  if (grid) {
    RL.themes.forEach((t) => {
      const panel = document.createElement("article");
      panel.className = "quad__panel reveal";
      panel.innerHTML = `<h3 class="quad__title">${esc(t.title)}</h3><p class="quad__body">${esc(t.body)}</p>`;
      grid.append(panel);
    });
  }

  /* Expandable agenda */
  const agenda = document.getElementById("agenda");
  if (agenda) {
    RL.agenda.forEach((row, i) => {
      const d = document.createElement("details");
      if (i === 0) d.open = true;
      d.innerHTML = `
        <summary>
          <span class="agenda__idx" aria-hidden="true">${i + 1}</span>
          <span>${esc(row.name)}</span>
          <span class="agenda__chev" aria-hidden="true">&#9662;</span>
        </summary>
        <p class="agenda__detail">${esc(row.detail)}</p>`;
      agenda.append(d);
    });
  }

  /* Late-added .reveal nodes need observing too (components.js ran already) */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.is-in)").forEach((n) => io.observe(n));
  } else {
    document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));
  }
})();
