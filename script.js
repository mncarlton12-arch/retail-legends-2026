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

  /* Typographic fallback used when a brand logo file is absent/missing */
  function brandMark(logo, name, imgClass, textClass) {
    if (!logo) {
      const t = document.createElement("span");
      t.className = textClass; t.textContent = name;
      return t;
    }
    const img = document.createElement("img");
    img.className = imgClass; img.src = logo;
    img.alt = name + " logo";
    img.addEventListener("error", () => {
      const t = document.createElement("span");
      t.className = textClass; t.textContent = name;
      img.replaceWith(t);
    });
    return img;
  }

  /* Featured speaker profiles (Terry & Lew — confirmed lineup) */
  const profiles = document.getElementById("legend-profiles");
  if (profiles) {
    RL.speakers.forEach((s) => {
      const card = document.createElement("article");
      card.className = "profile reveal";
      card.innerHTML = `
        <img class="profile__photo" src="${esc(s.image)}" alt="${esc(s.imageAlt)}" loading="lazy" />
        <p class="profile__kicker">Speaker</p>
        <h3 class="profile__name">${esc(s.name)}</h3>
        <p class="profile__title">${esc(s.title)}</p>
        <p class="profile__company">${esc(s.company)}</p>
        <p class="profile__bio">${esc(s.bio)}</p>`;
      card.insertBefore(
        brandMark(s.brandLogo, s.brandName || s.company, "profile__brand", "profile__brandtext"),
        card.querySelector(".profile__bio"));
      profiles.append(card);
    });
  }

  /* Brands in the room — logo wall with typographic fallback */
  const wall = document.getElementById("brand-wall");
  if (wall && RL.brands) {
    RL.brands.forEach((b) => {
      const li = document.createElement("li");
      li.className = "brandwall__item";
      li.append(brandMark(b.logo, b.name, "", "brandwall__text"));
      wall.append(li);
    });
  }

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
