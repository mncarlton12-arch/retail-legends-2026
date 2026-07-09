/* ============================================================
   SEN EVENT HUBS — shared components
   Renders data from shared/config.js into mount points.
   All content edits belong in config.js, not here.
   ============================================================ */
(function () {
  "use strict";
  const C = window.SEN_CONFIG;

  /* ---------------- helpers ---------------- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- link-hub cards ---------------- */
  // <div data-linkcards="retailLegends"></div>
  document.querySelectorAll("[data-linkcards]").forEach((mount) => {
    const evt = C[mount.dataset.linkcards];
    if (!evt || !evt.links) return;
    const wrap = el("div", "linkcards");
    evt.links.forEach((item) => {
      const cta = C.ctas[item.key];
      if (!cta) return;
      const live = !!cta.url;
      const card = el(live ? "a" : "div",
        "linkcard" + (item.primary ? " linkcard--primary" : "") + (live ? "" : " linkcard--tbd"));
      if (live) {
        card.href = cta.url;
        if (/^https?:/i.test(cta.url)) { card.target = "_blank"; card.rel = "noopener"; }
      }
      const badge = live ? "" : ` <span class="badge-tbd">${esc(cta.tbdLabel || "Coming soon")}</span>`;
      card.append(
        el("div", "linkcard__body",
          `<span class="linkcard__label">${esc(cta.label)}${badge}</span>
           <p class="linkcard__note">${esc(item.note || "")}</p>`),
        el("span", "linkcard__arrow", live ? "&#8594;" : "&#8230;"),
      );
      if (!live) card.setAttribute("aria-label", `${cta.label} — link coming soon`);
      wrap.append(card);
    });
    mount.append(wrap);
  });

  /* ---------------- executive / speaker carousel ---------------- */
  // <div data-carousel="ecommerceExpo.executives" data-carousel-label="SEN executive delegation"></div>
  document.querySelectorAll("[data-carousel]").forEach((mount) => {
    const [evtKey, listKey] = mount.dataset.carousel.split(".");
    const people = (C[evtKey] || {})[listKey];
    if (!people || !people.length) return;

    const region = el("div", "carousel");
    region.setAttribute("role", "region");
    region.setAttribute("aria-roledescription", "carousel");
    region.setAttribute("aria-label", mount.dataset.carouselLabel || "Executives");

    const track = el("ul", "carousel__track");
    track.tabIndex = 0;
    track.setAttribute("aria-label", (mount.dataset.carouselLabel || "Executives") + " — scroll or use arrow keys");

    people.forEach((p) => {
      const li = el("li", "execcard");
      const photo = p.image
        ? `<img class="execcard__photo" src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name || "Executive portrait")}" loading="lazy"
             onerror="this.outerHTML='<span class=&quot;execcard__avatar&quot;><img src=&quot;assets/sen-symbol-white.svg&quot; alt=&quot;&quot;></span>'" />`
        : `<span class="execcard__avatar" role="img" aria-label="${esc(p.imageAlt || "SEN placeholder avatar")}">
             <img src="assets/sen-symbol-white.svg" alt="" /></span>`;
      const name = p.name
        ? `<h3 class="execcard__name">${esc(p.name)}</h3>`
        : `<h3 class="execcard__name execcard__name--tba">To be announced</h3>`;
      li.innerHTML = `
        ${photo}
        ${name}
        <p class="execcard__title">${esc(p.title || "")}</p>
        <p class="execcard__company">${esc(p.company || "")}</p>
        ${p.descriptor ? `<p class="execcard__desc">${esc(p.descriptor)}</p>` : ""}`;
      if (p.link) {
        const a = el("a", null, `<span class="sr-only">${esc(p.name || p.title)} — profile</span>`);
        a.href = p.link; a.target = "_blank"; a.rel = "noopener";
        li.append(a);
      }
      track.append(li);
    });

    const controls = el("div", "carousel__controls");
    const prev = el("button", "carousel__btn", "&#8592;");
    const next = el("button", "carousel__btn", "&#8594;");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "Previous");
    next.setAttribute("aria-label", "Next");

    const step = () => {
      const card = track.querySelector(".execcard");
      return card ? card.getBoundingClientRect().width + 16 : 260;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step() * 2 }));
    next.addEventListener("click", () => track.scrollBy({ left: step() * 2 }));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step() }); }
      if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step() }); }
    });
    const sync = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    controls.append(prev, next);
    region.append(track, controls);
    mount.append(region);
    sync();
    requestAnimationFrame(sync);

    /* Optional continuous motion: <div data-carousel="..." data-carousel-auto>.
       Slow marquee drift; pauses on hover/focus/touch and for a few seconds
       after any manual interaction; disabled under prefers-reduced-motion. */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mount.hasAttribute("data-carousel-auto") && !reduce && track.scrollWidth > track.clientWidth) {
      // Clone the cards once so the loop wraps seamlessly. Clones are
      // decorative — hidden from the accessibility tree.
      const firstOriginal = track.children[0];
      [...track.children].forEach((li) => {
        const clone = li.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.append(clone);
      });
      // Exact loop length: distance from the first original to its clone.
      const firstClone = track.children[people.length];
      const wrapWidth = firstClone.offsetLeft - firstOriginal.offsetLeft;
      let hovered = false, focused = false, pauseUntil = 0, last = null;
      const bump = () => { pauseUntil = performance.now() + 4000; };
      track.addEventListener("pointerenter", () => { hovered = true; });
      track.addEventListener("pointerleave", () => { hovered = false; });
      region.addEventListener("focusin", () => { focused = true; });
      region.addEventListener("focusout", () => { focused = false; });
      track.addEventListener("wheel", bump, { passive: true });
      track.addEventListener("touchstart", bump, { passive: true });
      prev.addEventListener("click", bump);
      next.addEventListener("click", bump);
      const SPEED = 28; // px per second — a calm drift
      (function drift(t) {
        if (last !== null && !hovered && !focused && t > pauseUntil && !document.hidden) {
          track.scrollLeft += (SPEED * (t - last)) / 1000;
          if (track.scrollLeft >= wrapWidth) track.scrollLeft -= wrapWidth;
        }
        last = t;
        requestAnimationFrame(drift);
      })(performance.now());
    }
  });

  /* ---------------- sponsors ---------------- */
  // <div data-sponsors="retailLegends"></div>
  document.querySelectorAll("[data-sponsors]").forEach((mount) => {
    const evt = C[mount.dataset.sponsors];
    if (!evt || !evt.sponsors || !evt.sponsors.length) return;
    const wrap = el("div", "sponsors");
    evt.sponsors.forEach((s) => {
      const node = el(s.url ? "a" : "div", "sponsor");
      if (s.url) { node.href = s.url; node.target = "_blank"; node.rel = "noopener"; }
      node.innerHTML = s.logo
        ? `<img src="${esc(s.logo)}" alt="${esc(s.name)} logo" />`
        : esc(s.name);
      wrap.append(node);
    });
    mount.append(wrap);
  });

  /* ---------------- CTA buttons bound to config ---------------- */
  // <a data-cta="retailLegendsLuma" class="btn btn--primary"></a>
  document.querySelectorAll("[data-cta]").forEach((node) => {
    const cta = C.ctas[node.dataset.cta];
    if (!cta) return;
    if (!node.textContent.trim()) node.textContent = cta.label;
    if (cta.url) {
      node.href = cta.url;
      if (/^https?:/i.test(cta.url)) { node.target = "_blank"; node.rel = "noopener"; }
    } else {
      node.removeAttribute("href");
      node.setAttribute("aria-disabled", "true");
      node.setAttribute("role", "link");
      node.textContent = cta.tbdText || ((cta.tbdLabel || "Coming soon") + " — link coming soon");
    }
  });

  /* ---------------- animated count-up stats ---------------- */
  // <div data-stats="ecommerceExpo"></div>
  document.querySelectorAll("[data-stats]").forEach((mount) => {
    const evt = C[mount.dataset.stats];
    if (!evt || !evt.stats) return;
    const wrap = el("div", "stats");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    evt.stats.forEach((s) => {
      const item = el("div", "stat");
      const num = el("span", "stat__num", reduce ? s.value.toLocaleString("en-US") + s.suffix : "0");
      num.dataset.target = s.value;
      num.dataset.suffix = s.suffix || "";
      item.append(num, el("span", "stat__label", esc(s.label)));
      wrap.append(item);
    });
    mount.append(wrap);

    if (!reduce && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const target = +entry.target.dataset.target;
          const suffix = entry.target.dataset.suffix;
          const t0 = performance.now(), dur = 1400;
          (function tick(t) {
            const k = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - k, 3);
            entry.target.textContent = Math.round(target * eased).toLocaleString("en-US") + (k === 1 ? suffix : "");
            if (k < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.4 });
      wrap.querySelectorAll(".stat__num").forEach((n) => io.observe(n));
    }
  });

  /* ---------------- reveal on scroll ---------------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  } else {
    document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));
  }

  /* ---------------- back to top ---------------- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------------- footer (shared) ---------------- */
  document.querySelectorAll("[data-footer]").forEach((mount) => {
    mount.innerHTML = `
      <div class="container footer__inner">
        <img class="footer__logo" src="assets/sen-symbol-white.svg" alt="" width="38" height="36" />
        <p class="footer__name">Presented by ${esc(C.sen.name)}</p>
        <nav class="footer__links" aria-label="SEN links">
          <a href="${esc(C.sen.website)}" target="_blank" rel="noopener">Visit SEN</a>
          <a href="mailto:${esc(C.sen.partnershipsEmail)}">Sponsor Opportunities</a>
          <a href="https://retail-legends-2026.vercel.app/">Retail Legends</a>
          <a href="https://sen-ecommerce-expo-2026.vercel.app/">eCommerce Expo</a>
        </nav>
        <p class="footer__muted">${esc(C.sen.tagline)} · &copy; ${esc(C.sen.copyrightYear)} ${esc(C.sen.name)}</p>
      </div>`;
  });
})();
