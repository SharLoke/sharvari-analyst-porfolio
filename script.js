/* =========================================================
   Sharvari Lokegaonkar · Portfolio interactions
   ========================================================= */

/* ---------- 1. EDIT HERE: links and contact ----------
   Any link left as "" is hidden automatically, so the page never shows a broken button. */
const CONFIG = {
  email: "sharvari0913@gmail.com",
  resumeUrl: "resume.pdf",
  linkedin: "https://www.linkedin.com/in/sharvari-lokegaonkar/",   // e.g. "https://www.linkedin.com/in/your-handle"
  github: "https://github.com/SharLoke",     // e.g. "https://github.com/your-handle"
};

/* Job titles for the typing animation */
const ROLES = [
  "Data Analyst",
  "Financial Risk Analyst",
  "Forecasting & Time-Series Modeler",
  "SQL & Python Developer",
];

/* ---------- 2. EDIT HERE: projects ----------
   Cards and modals are both built from this list.
   Add "demo" and "repo" URLs when available; empty ones are hidden. */
const PROJECTS = [
  {
    id: "portfolio-risk",
    domain: "Finance · Risk",
    title: "Portfolio Risk Analysis & Optimization",
    metric: "21% expected return",
    summary:
      "Optimized allocation across 10 Indian stocks with Modern Portfolio Theory and measured the risk behind the return.",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Modern Portfolio Theory"],
    problem:
      "Choosing weights across a basket of equities means trading expected return against volatility and downside risk.",
    approach: [
      "Built an optimization over 10 Indian stocks using Modern Portfolio Theory to find an efficient allocation.",
      "Calculated Value at Risk (VaR), Sharpe ratio, correlation and maximum drawdown for each candidate portfolio.",
      "Compared risk-return trade-offs to select the final allocation.",
    ],
    results: [
      "Identified an allocation with a 21% expected return.",
      "Produced a full risk profile (VaR, Sharpe, drawdown) to support the choice.",
    ],
    demo: "",
    repo: "",
  },
  {
    id: "apple-revenue",
    domain: "Forecasting",
    title: "Forecasting Apple's Revenue",
    metric: "Quarterly time-series forecast",
    summary:
      "Forecasted Apple's quarterly revenue from multi-year financial data and visualized scenario-based outlooks.",
    stack: ["Python", "Time Series", "Pandas", "Matplotlib", "Data Visualization"],
    problem:
      "Revenue planning needs a view of where quarterly revenue is heading and how growth patterns have shifted.",
    approach: [
      "Applied time-series models to multi-year quarterly financial data.",
      "Analyzed growth patterns and seasonality in historical revenue.",
      "Built scenario-based revenue outlooks.",
    ],
    results: [
      "Delivered quarterly revenue forecasts with scenario ranges.",
      "Created visuals that communicate model results and business implications to non-technical readers.",
    ],
    demo: "",
    repo: "",
  },
  {
    id: "pmc-capex",
    domain: "Public Finance",
    title: "Capital Expenditure Forecast & PCA: Pune Municipal Corporation",
    metric: "10 years of budget data (FY 2016–2026)",
    summary:
      "Analyzed a decade of municipal spending, forecast future capital expenditure and used PCA to explain what drives it.",
    stack: ["Python", "Statistical Modeling", "PCA", "Time Series"],
    problem:
      "Municipal budgets span many departments, which makes it hard to see what actually drives changes in capital spending.",
    approach: [
      "Analyzed 10 years of public-finance data to find spending patterns and department-level allocations.",
      "Built time-series forecasts of future capital expenditure.",
      "Applied Principal Component Analysis to isolate the key factors behind expenditure variability.",
    ],
    results: [
      "Forecast of upcoming capital expenditure.",
      "Clearer financial interpretation of which factors drive spending variability.",
    ],
    demo: "",
    repo: "",
  },
  {
    id: "aml-monitoring",
    domain: "Risk · Compliance",
    title: "AML / Fraud Transaction Monitoring System",
    metric: "27,000+ transactions screened",
    summary:
      "A SQL-driven monitoring system that flags anti-money-laundering and fraud patterns in transaction data.",
    stack: ["SQL", "Data Analysis", "AML", "Fraud Detection"],
    problem:
      "Compliance teams need a repeatable way to surface suspicious transactions out of large volumes of normal activity.",
    approach: [
      "Designed structured queries and detection logic for common AML and fraud patterns.",
      "Ran the rules across 27,000+ transactions.",
      "Surfaced anomalous transaction behavior for compliance-style risk screening.",
    ],
    results: [
      "Working transaction-monitoring pipeline built entirely in SQL.",
      "Flagged anomalous transactions ready for analyst review.",
    ],
    demo: "",
    repo: "",
  },
];

/* =========================================================
   Helpers
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  });
  [].concat(children).forEach((c) => c && node.append(c));
  return node;
}

function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* =========================================================
   Typing animation
   ========================================================= */
function initTyping() {
  const target = $(".typed");
  if (!target) return;
  if (prefersReducedMotion) { target.textContent = ROLES[0]; return; }

  let role = 0, char = 0, deleting = false;
  (function tick() {
    const word = ROLES[role];
    target.textContent = word.slice(0, char);
    let delay = deleting ? 35 : 70;

    if (!deleting && char === word.length) { deleting = true; delay = 1600; }
    else if (deleting && char === 0) { deleting = false; role = (role + 1) % ROLES.length; delay = 300; }
    else char += deleting ? -1 : 1;

    setTimeout(tick, delay);
  })();
}

/* =========================================================
   Sticky nav: shadow on scroll + mobile menu
   ========================================================= */
function initNav() {
  const header = $(".site-header");
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));

  // Close the mobile menu after choosing a link or CTA
  $$("a, button", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* =========================================================
   Active section highlighting (Intersection Observer)
   ========================================================= */
function initScrollSpy() {
  const links = $$(".nav-link");
  const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);

  const setActive = (id) => {
    links.forEach((l) => {
      const on = l.getAttribute("href") === `#${id}`;
      l.classList.toggle("active", on);
      if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  };

  // The observer tells us when sections move; we then pick the last section whose top
  // has passed a reading line 35% down the viewport. Robust to fast jumps and tall sections.
  const update = () => {
    const line = window.innerHeight * 0.35;
    let current = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s.id; });
    setActive(current); // null while in the hero = nothing highlighted
  };

  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
  const observer = new IntersectionObserver(update, { threshold: thresholds });
  sections.forEach((s) => observer.observe(s));
  observer.observe($("#hero"));
  update();
}

/* =========================================================
   Scroll reveal
   ========================================================= */
function initReveal() {
  const items = $$(".section-head, .card");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;
  items.forEach((i) => i.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach((i) => io.observe(i));
}

/* =========================================================
   Modals (shared open/close, focus trap, Esc to close)
   ========================================================= */
let lastFocused = null;

function openModal(modal) {
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  const first = modal.querySelector("input, textarea, .modal-close");
  first && first.focus();
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocused && lastFocused.focus();
}

function initModals() {
  $$(".modal").forEach((modal) => {
    $$("[data-close-modal]", modal).forEach((b) => b.addEventListener("click", () => closeModal(modal)));
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal(modal);
      if (e.key !== "Tab") return;
      const focusables = $$("a[href], button, input, textarea", modal).filter((n) => n.offsetParent !== null);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  });
}

/* =========================================================
   Projects: render cards + detail modal
   ========================================================= */
function tagList(items, extraClass = "") {
  return el("ul", { class: `tags ${extraClass}`.trim() }, items.map((t) => el("li", { class: "tag", text: t })));
}

function renderProjects() {
  const grid = $("#project-grid");
  PROJECTS.forEach((p) => {
    const btn = el("button", { class: "view-details", type: "button", "aria-haspopup": "dialog" });
    btn.innerHTML = 'View details <span aria-hidden="true">→</span>';

    const card = el("article", { class: "card project-card", "data-id": p.id }, [
      el("p", { class: "project-domain", text: p.domain }),
      el("h3", { text: p.title }),
      el("span", { class: "project-metric", text: p.metric }),
      el("p", { text: p.summary }),
      el("div", { class: "project-foot" }, [tagList(p.stack.slice(0, 3), "tags-sm"), btn]),
    ]);

    // Whole card is clickable for mouse users; the button gives keyboard users the same action
    card.addEventListener("click", () => openProject(p, btn));
    grid.append(card);
  });
}

function openProject(p, trigger) {
  const modal = $("#project-modal");
  $("#pm-kicker").textContent = p.domain;
  $("#pm-title").textContent = p.title;
  $("#pm-summary").textContent = p.summary;
  $("#pm-tags").replaceWith(Object.assign(tagList(p.stack), { id: "pm-tags" }));

  const body = $("#pm-body");
  body.innerHTML = "";
  body.append(
    el("section", {}, [el("h3", { text: "The problem" }), el("p", { text: p.problem })]),
    el("section", {}, [el("h3", { text: "What I did" }), el("ul", {}, p.approach.map((a) => el("li", { text: a })))]),
    el("section", {}, [el("h3", { text: "Impact" }), el("ul", {}, p.results.map((r) => el("li", { text: r })))])
  );

  const links = $("#pm-links");
  links.innerHTML = "";
  if (p.demo) links.append(el("a", { class: "btn btn-primary btn-sm", href: p.demo, target: "_blank", rel: "noopener", text: "Live demo ↗" }));
  if (p.repo) links.append(el("a", { class: "btn btn-ghost btn-sm", href: p.repo, target: "_blank", rel: "noopener", text: "GitHub repo ↗" }));

  openModal(modal);
  lastFocused = trigger; // return focus to the card's button on close
}

/* =========================================================
   Contact modal: copy email + mailto form
   ========================================================= */
function initContact() {
  const modal = $("#contact-modal");
  $$("[data-open-contact]").forEach((b) => b.addEventListener("click", () => openModal(modal)));

  $("#contact-email").textContent = CONFIG.email;
  $("#copy-email").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(CONFIG.email); showToast("Email copied"); }
    catch { showToast(CONFIG.email); }
  });

  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Opportunity for Sharvari${f.get("company") ? ` · ${f.get("company")}` : ""}`;
    const body = `${f.get("message")}\n\n${f.get("name")}${f.get("company") ? `\n${f.get("company")}` : ""}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* =========================================================
   Links from CONFIG (footer + contact modal)
   ========================================================= */
function initLinks() {
  $$('a[download]').forEach((a) => a.setAttribute("href", CONFIG.resumeUrl));
  $$('a[href^="mailto:"]').forEach((a) => a.setAttribute("href", `mailto:${CONFIG.email}`));

  const social = [["LinkedIn", CONFIG.linkedin], ["GitHub", CONFIG.github]].filter(([, url]) => url);
  social.forEach(([label, url]) => {
    $("#footer-links").append(el("li", {}, el("a", { href: url, target: "_blank", rel: "noopener", text: label })));
    $("#contact-social").append(el("a", { href: url, target: "_blank", rel: "noopener", text: `${label} ↗` }));
  });

  $("#year").textContent = new Date().getFullYear();
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();   // before reveal so project cards animate too
  initLinks();
  initTyping();
  initNav();
  initScrollSpy();
  initModals();
  initContact();
  initReveal();
});
