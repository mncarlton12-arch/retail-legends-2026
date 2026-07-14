/* ============================================================================
   SEN EVENT HUBS — SHARED CONFIG (single source of truth)
   ----------------------------------------------------------------------------
   Edit THIS file to update names, links, dates, CTAs, sponsors and images on
   both pages (/retail-legends and /ecommerce-expo). No HTML edits needed for
   data changes. Search for "TODO" to find everything still awaiting a final
   value. Never publish a guessed URL — leave it null and the page renders a
   clearly-marked "TBD" state instead.
   ============================================================================ */

/* ============================================================================
   PRE-DEPLOY APPROVALS — items Maria/BB must resolve or sign off before launch
   ----------------------------------------------------------------------------
   1. eCommerce Expo happy hour Luma URL      → ctas.happyHourLuma.url (null = "Luma TBD")
   2. Retail Legends venue                    → retailLegends.venue (null = "announced upon confirmation")
   3. Retail Legends third speaker            → retailLegends.speakers[2] (TBA; do NOT name until confirmed)
   4. Sponsor logos (Fluent Commerce, Seel)   → retailLegends.sponsors[].logo (null = text lockup)
   5. RESOLVED July 8: RL timing = 5:30–9:00 PM (confirmed by Maria)
   6. Neha Kovach exact title                 → ecommerceExpo.executivesConfirmed (public variants exist)
   7. Panel listing ON HOLD (Maria, July 8)   → ecommerceExpo.panel renders descriptive copy + official-agenda link
                                                only; set panel.published = true when BB approves the full listing
   8. After deploy: absolute og:image/og:url  → <head> of both pages (TODO comments in place)
   ============================================================================ */

window.SEN_CONFIG = {

  /* ------------------------------------------------------------------ SEN */
  sen: {
    name: "The Social Executive Network",
    shortName: "SEN",
    website: "https://www.socialexec.co/",
    // Sponsorship inquiries. TODO: swap for a sponsor deck link or form URL
    // once final sponsor materials are approved.
    partnershipsEmail: "partnerships@socialexecutivenetwork.com",
    tagline: "The best rooms feel different.",
    copyrightYear: "2026",
  },

  /* --------------------------------------------------- GLOBAL CTA DEFAULTS
     Final CTAs are on hold — these are the practical, editable defaults.   */
  ctas: {
    visitSen:            { label: "Visit SEN",               url: "https://www.socialexec.co/" },
    // Sponsor inquiries route to the SEN website's partnerships page
    // (sponsor tiers + inquiry CTAs). Updated from the mailto per Maria, July 12.
    sponsor:             { label: "Sponsor Opportunities",   url: "https://www.socialexec.co/partnerships" },
    retailLegendsLuma:   { label: "Retail Legends on Luma",  url: "https://luma.com/96gvc9ig" },
    expoInfo:            { label: "eCommerce Expo Event Info", url: "https://www.ecommerceexpo.co.uk/" },
    // TODO: Happy hour Luma page not created yet (internally: "Luma TBD").
    // Set url when it exists — the button and link card switch from the
    // "coming soon" state to live automatically. Public-facing wording never
    // says "TBD": tbdLabel is the short badge, tbdText the button copy.
    happyHourLuma:       { label: "SEN Happy Hour RSVP",     url: null, tbdLabel: "Coming soon", tbdText: "RSVP link coming soon" },
  },

  /* ========================================================= RETAIL LEGENDS
     Sources: Retail_Legends_Live_Recap.docx (June 2026), live Luma event
     (luma.com/96gvc9ig), existing retail-legends-2026.vercel.app hub.      */
  retailLegends: {
    name: "Retail Legends",
    fullTitle: "Retail Legends: An Evening with the Architects of Modern Retail",
    theme: "Where Legends Share, Leaders Inspire.",
    date: "September 15, 2026",
    time: "6:00 – 9:00 PM", // updated by Maria, July 12 2026 (was 5:30–9:00)
    city: "New York City",
    venue: null, // TODO: venue not booked yet — page shows "Venue announced upon confirmation"
    lumaUrl: "https://luma.com/96gvc9ig",
    audience: "A curated room of senior retail and commerce executives",
    format: "Fireside conversation, then cocktails, hors d'oeuvres, networking and a book signing",

    /* Featured speakers. CONFIRMED by Maria (July 8, re-confirmed July 12,
       2026): Terry and Lew ONLY — even though some designer cards show a
       third speaker, do NOT add one without her say-so. Each profile carries
       the speaker's brand wordmark under the photo. */
    speakers: [
      {
        name: "Terry Lundgren",
        title: "Former Chairman & CEO",
        company: "Macy's, Inc.",
        status: "confirmed",
        image: "assets/execs/terry-lundgren-dark.png", // portrait-on-navy from the official event card; see assets/execs/SOURCES.md
        imageAlt: "Portrait of Terry Lundgren, former Chairman and CEO of Macy's, Inc.",
        brandName: "Macy's",
        brandLogo: "assets/brands/macys.svg",
        bio: "Terry Lundgren led Macy's, Inc. as Chairman & CEO for more than a decade, steering the landmark merger of Federated and May Department Stores and shaping Macy's into America's flagship department store. He previously served as Chairman & CEO of Neiman Marcus and twice chaired the National Retail Federation.",
        link: null, // TODO: optional LinkedIn/company link
        source: "Recap doc: confirmed May 27 · name known · headshot verified (Speakers Associates)",
      },
      {
        name: "Lew Frankfort",
        title: "Former Chairman & CEO",
        company: "Coach",
        status: "confirmed",
        image: "assets/execs/lew-frankfort.jpg",
        imageAlt: "Portrait of Lew Frankfort, former Chairman and CEO of Coach",
        brandName: "Coach",
        brandLogo: "assets/brands/coach.svg",
        bio: "Over more than three decades as Chairman & CEO, Lew Frankfort built Coach from a small family leather workshop into a global house of modern luxury — taking the company public in 2000 and authoring one of the most studied brand transformations in retail history.",
        link: null,
        source: "Recap doc: verbally confirmed (written confirmation pending via Mike Taylor) · name known — already public on the live retail-legends hub · headshot verified (lewfrankfort.com)",
      },
    ],

    /* Brands in the Room — brands whose executives are attending.
       List provided by Maria, July 8 2026 ("Flaherty" corrected to Faherty
       July 12). `logo` null = elegant typographic wordmark fallback renders
       instead; see assets/brands/SOURCES.md. */
    brands: [
      { name: "Macy's",                 logo: "assets/brands/macys.svg" },
      { name: "Coach",                  logo: "assets/brands/coach.svg" },
      { name: "Tarte Cosmetics",        logo: null }, // fetched file was a wrong mark — renders as wordmark until a verified logo lands
      { name: "G-STAR",                 logo: "assets/brands/gstar.svg" },
      { name: "Saatva",                 logo: null },
      { name: "David Yurman",           logo: "assets/brands/david-yurman.svg" },
      { name: "Bottega Veneta",         logo: null },
      { name: "Under Armour",           logo: "assets/brands/under-armour.svg" },
      { name: "Centric Brands",         logo: null },
      { name: "Tapestry",               logo: "assets/brands/tapestry.svg" },
      { name: "L'Oréal",                logo: null }, // fetched file was a map graphic, not the wordmark — renders as wordmark text until a verified logo lands
      { name: "Faherty",                logo: "assets/brands/faherty.png" }, // confirmed by Maria July 12 ("Flaherty" was a misspelling)
      { name: "Marriott International", logo: "assets/brands/marriott.svg" },
      { name: "Chanel",                 logo: "assets/brands/chanel.svg" },
      { name: "CVS",                    logo: "assets/brands/cvs.svg" },
      { name: "Kering",                 logo: null },
      { name: "Versace",                logo: "assets/brands/versace.svg" },
      { name: "Brooklinen",             logo: null },
      { name: "Steve Madden",           logo: null },
      { name: "American Eagle",         logo: null },
    ],

    themes: [
      { title: "Brand Building",       body: "The decisions behind iconic retail brands." },
      { title: "Customer Loyalty",     body: "How it was built — and what has changed." },
      { title: "The Future of Retail", body: "AI, digital commerce, and the human element." },
      { title: "Leadership Legacy",    body: "What the next generation needs to know." },
    ],

    agenda: [
      { name: "Arrivals",                        detail: "Welcome drinks on arrival." },
      { name: "Welcome & Fireside Conversation", detail: "The legends in conversation — careers, decisions, risks and the lessons that built modern retail." },
      { name: "Audience Q&A",                    detail: "Open dialogue with the room." },
      { name: "Reception & Book Signing",        detail: "Cocktails, heavy hors d'oeuvres, networking and a book signing as the room comes together." },
    ],

    // Confirmed per Retail_Legends_Live_Recap.docx. Do not add sponsors here
    // until confirmed. Logos: TODO — no approved logo files in the project
    // folder yet; drop files into assets/sponsors/ and set `logo` paths.
    sponsors: [
      { name: "Fluent Commerce", logo: null, url: null },
      { name: "Seel",            logo: null, url: null },
    ],

    links: [
      { key: "retailLegendsLuma", note: "Request an invitation — seating is curated and approval-based.", primary: true },
      { key: "sponsor",           note: "A deliberately small partner group — proximity and substance, no booths." },
      { key: "visitSen",          note: "The community behind the room." },
    ],
  },

  /* ========================================================= ECOMMERCE EXPO
     Sources: eCommerce_Expo_2026_Recap.docx (July 8, 2026),
     ecommerceexpo.co.uk, BB speaker roster (Google Sheet, July 2026).      */
  ecommerceExpo: {
    name: "eCommerce Expo",
    fullTitle: "SEN at eCommerce Expo 2026",
    date: "23 – 24 September 2026",
    city: "London",
    venue: "ExCeL London",
    coLocated: "Co-located with Technology for Marketing",
    officialUrl: "https://www.ecommerceexpo.co.uk/",
    overview: "The Social Executive Network is a media partner of eCommerce Expo 2026 — bringing a delegation of senior executives from end-user brands onto its stages, hosting the Women in eCommerce & Marketing VIP networking hour, and holding court on the show floor.",

    stats: [
      { value: 10000, suffix: "+", label: "Senior eCommerce & marketing professionals" },
      { value: 200,   suffix: "+", label: "World-leading solution providers" },
      { value: 200,   suffix: "+", label: "Hours of CPD-accredited content" },
      { value: 10,    suffix: "",  label: "Conference theatres" },
    ],

    /* SEN-led panel. ON HOLD (Maria, July 8 2026): describe the panel only —
       do NOT publish speaker names, exact slot, or stage from our hub; point
       to the official expo site for the agenda. When BB approves the listing,
       set `published: true` and the full card (names, slot, stage) renders
       automatically from `internal` below. */
    panel: {
      published: false,
      title: "Building High-Performing eCommerce & Marketing Teams",
      subtitle: "The Leadership Habits That Keep Women In (and Moving Up)",
      description: "SEN is convening a panel on the leadership habits that keep women in eCommerce and marketing — and moving up. Full lineup, times and stages on the official expo agenda.",
      agendaCta: { label: "See the Official Agenda", url: "https://www.ecommerceexpo.co.uk/" },
      // Internal detail from BB's roster — rendered only when published: true.
      internal: {
        when: "Wednesday 23 September · 15:30 – 16:15",
        stage: "Headline Stage",
        people: [
          { name: "Brittany Baumgarten", role: "Moderator", title: "Founder, Head of Events & Global Partnerships", company: "The Social Executive Network" },
          { name: "Melissa Minkow",      role: "Moderator", title: "", company: "" }, // TODO: title/company for Melissa Minkow
          { name: "Gaelle Comte",        role: "Speaker",   title: "SVP LIONS Learning", company: "Cannes Lions International Festival of Creativity" },
          { name: "Vijay Talwar",        role: "Speaker",   title: "Chief Digital, Data & Technology Officer", company: "Avolta" },
          { name: "Caroline Johns",      role: "Speaker",   title: "VP, Corporate Communications", company: "Saatva" },
        ],
      },
    },

    /* SEN executive delegation — reconciled against BB's speaker roster
       ("Brittany Baumgarten eComerce Expo / SEN" Google Sheet, "Speakers " tab,
       read July 8 2026). The roster shows EXACTLY 9 rows marked "Confirmed"
       and 2 rows marked "Attending" (Talwar/Avolta, Johns/Saatva).

       - executivesConfirmed = the 9 "Confirmed" rows → THE carousel (the only
         executive list displayed, per Maria July 8).
       - executivesAttending = the 2 "Attending" rows (Talwar/Avolta,
         Johns/Saatva) → NOT DISPLAYED anywhere; kept here as internal data
         only. To surface them later, add a mount like
         <div data-carousel="ecommerceExpo.executivesAttending"> to the page.
       Each entry carries a `source` audit note: roster status / name known
       or TBD / headshot verified (see assets/execs/SOURCES.md) or SEN
       placeholder avatar. Named entries are listed first for display; the
       roster itself has no meaningful order.
       TODO: fill `name` fields as BB releases them. */
    executivesConfirmed: [
      { name: "Miral Youssef", title: "President, Middle East & Africa", company: "Kering", // title per RLC Global Forum speaker page (BB sheet: "MEA Group President")
        status: "Confirmed", image: "assets/execs/miral-youssef.jpg",
        imageAlt: "Portrait of Miral Youssef, President Middle East and Africa at Kering", link: null,
        source: "BB roster: Confirmed · name known · headshot verified (RLC Global Forum)" },
      { name: "Neha Kovach",   title: "Global Head of CRM, Data, Customer Experience & Loyalty", company: "David Yurman", // TODO: confirm preferred title — public variants exist ("Group Head CRM, Data Insights & CX"; "Global Head, Omnichannel CRM, CX, Clienteling & Data Insights")
        status: "Confirmed", image: "assets/execs/neha-kovach.jpg",
        imageAlt: "Portrait of Neha Kovach of David Yurman", link: null,
        source: "BB roster: Confirmed · name known (via SEN Master sheet) · headshot verified (#DMWF) · title needs confirmation" },
      { name: null, title: "Chief Technology Officer", company: "Breitling",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — Chief Technology Officer, Breitling", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "Head of North America", company: "G-STAR",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — Head of North America, G-STAR", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "Chief Product Officer & Supply Chain", company: "UNTUCKit",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — Chief Product Officer and Supply Chain, UNTUCKit", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "Director, Supply Chain", company: "Tarte Cosmetics",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — Director of Supply Chain, Tarte Cosmetics", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "Chief Information Officer", company: "Centric Brands",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — Chief Information Officer, Centric Brands", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "President", company: "Omni Retail Enterprises",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — President, Omni Retail Enterprises", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
      { name: null, title: "VP Retail Operations & Innovation", company: "Helzberg Diamonds",
        status: "Confirmed", image: null, imageAlt: "SEN placeholder avatar — VP Retail Operations and Innovation, Helzberg Diamonds", link: null,
        source: "BB roster: Confirmed · name TBD · placeholder avatar" },
    ],
    executivesAttending: [
      { name: "Vijay Talwar",  title: "Chief Digital, Data & Technology Officer", company: "Avolta",
        status: "Attending", image: "assets/execs/vijay-talwar.jpg",
        imageAlt: "Portrait of Vijay Talwar, Chief Digital, Data and Technology Officer at Avolta", link: null,
        source: "BB roster: Attending · name known · headshot verified (World Retail Congress) · also on the SEN panel" },
      { name: "Caroline Johns", title: "VP, Corporate Communications", company: "Saatva", // title per Saatva press room
        status: "Attending", image: "assets/execs/caroline-johns.jpg",
        imageAlt: "Portrait of Caroline Johns, VP Corporate Communications at Saatva", link: null,
        source: "BB roster: Attending · name known · headshot verified (Saatva press room) · also on the SEN panel" },
    ],

    // Post-Day-1 happy hour. Luma page NOT created yet — do not invent a URL.
    happyHour: {
      title: "SEN Happy Hour",
      when: "Wednesday 23 September · after Day 1",
      where: "Venue to be announced",
      blurb: "Close out Day 1 with the SEN delegation and friends of the network — drinks, introductions, and the conversations the show floor doesn't allow.",
      lumaKey: "happyHourLuma", // resolves against ctas.happyHourLuma above
    },

    links: [
      { key: "expoInfo",      note: "Dates, venue, agenda and registration on the official site.", primary: true },
      { key: "happyHourLuma", note: "Post-Day-1 drinks with the SEN delegation — RSVP link coming soon." },
      { key: "sponsor",       note: "Partner with SEN around the expo and beyond." },
      { key: "visitSen",      note: "The community behind the delegation." },
    ],
  },
};
