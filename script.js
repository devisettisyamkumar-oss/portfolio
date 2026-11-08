
/* ========= CONFIG: edit these ========= */
const GITHUB_USER = "devisettisyamkumar-oss";

// Logos are stored locally in assets/icons so they never fail to load
const dev = (name) => `assets/icons/${name}.svg`;

const techSkills = [
  { name: "Java", logo: dev("java") },
  { name: "Spring Boot", logo: dev("spring") },
  { name: "Hibernate / JPA", logo: dev("hibernate") },
  { name: "SQL (MySQL)", logo: dev("mysql") },
  { name: "HTML5", logo: dev("html5") },
  { name: "CSS3", logo: dev("css3") },
  { name: "JavaScript", logo: dev("javascript") },
  { name: "React", logo: dev("react") },
];

const tools = [
  { name: "Git", logo: dev("git") },
  { name: "GitHub", logo: dev("github"), invert: true },
  { name: "Postman", logo: dev("postman") },
  { name: "Maven", logo: dev("maven") },
  { name: "MySQL", logo: dev("mysql") },
  { name: "VS Code", logo: dev("vscode") },
];

/* First 3 show as cards; the rest sit under "View more".
   Replace the "#" links with your real GitHub / deployed URLs. */
const projects = [
  {
    title: "Java Spring Boot Backend REST API",
    status: "In Progress",
    cover: "assets/spring-api.svg",
    description:
      "A backend service focused on database persistence, ORM mapping and a clean RESTful endpoint structure, with CRUD handling, validation and Postman testing.",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "REST APIs", "Postman"],
    github: `https://github.com/${GITHUB_USER}`,
    demo: null,
  },
  {
    title: "Loan Eligibility Calculator",
    status: "Live Project",
    cover: "assets/loan-calculator.svg",
    description:
      "Responsive web app that calculates loan eligibility in real time from user financial inputs, with client-side validation and instant visual feedback.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: `https://github.com/${GITHUB_USER}`,
    demo: "#",
  },
  {
    title: "Visitor ID Creator / Token System",
    status: "Live Project",
    cover: "assets/visitor-id.svg",
    description:
      "Interactive visitor registration interface that generates unique ID tokens and records check-in data, built for clean usability and fast entry workflows.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: `https://github.com/${GITHUB_USER}`,
    demo: "#",
  },
  {
    title: "Personal Portfolio Website",
    status: "Live Project",
    cover: "assets/portfolio.svg",
    description:
      "This responsive single-page portfolio with a sticky navbar, education timeline, project cards, GitHub activity and a working contact form.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: `https://github.com/${GITHUB_USER}`,
    demo: "#",
  },
];

/* ========= RENDER ========= */
const el = (id) => document.getElementById(id);

function renderLogos(list, target) {
  target.innerHTML = list
    .map(
      (s) => `<div class="logo-item">
        <img src="${s.logo}" alt="${s.name} logo" loading="lazy" class="${s.invert ? "invert" : ""}" />
        <span>${s.name}</span>
      </div>`
    )
    .join("");
}

renderLogos(techSkills, el("techGrid"));
renderLogos(tools, el("toolsGrid"));

const VISIBLE = 3;
el("projectGrid").innerHTML = projects
  .map((p, i) => {
    const isLive = p.status.toLowerCase().includes("live");
    const demoBtn = p.demo
      ? `<a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : `<span class="btn btn-outline btn-sm" aria-disabled="true" style="opacity:.55;cursor:default">Coming Soon</span>`;

    return `<article class="card project-card ${i >= VISIBLE ? "extra" : ""}">
      <img class="project-cover" src="${p.cover}" alt="${p.title} cover" loading="lazy" />
      <div class="project-body">
        <div class="project-head">
          <h5>${p.title}</h5>
          <span class="status ${isLive ? "live" : ""}">${p.status}</span>
        </div>
        <p>${p.description}</p>
        <ul class="stack">${p.stack.map((t) => `<li>${t}</li>`).join("")}</ul>
        <div class="project-actions">
          <a class="btn btn-outline btn-sm" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          ${demoBtn}
        </div>
      </div>
    </article>`;
  })
  .join("");

/* View more / less */
const viewMore = el("viewMore");

if (projects.length <= VISIBLE) {
  viewMore.style.display = "none";
}

viewMore.addEventListener("click", () => {
  const open = el("projectGrid").classList.toggle("expanded");
  viewMore.textContent = open ? "View less" : "View more";
  viewMore.setAttribute("aria-expanded", open);
});

/* GitHub stats, languages and contribution calendar.
   Built in the browser from GitHub's public API, so no image service can break. */
const ghProfile = `https://github.com/${GITHUB_USER}`;

const ghFail = (box, msg) => {
  box.innerHTML = `<p class="gh-msg">${msg} <a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
};

async function loadGithubStats() {
  const statsBox = el("ghStats");
  const langBox = el("ghLang");

  try {
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    ]);

    if (!uRes.ok || !rRes.ok) {
      throw new Error("GitHub API " + uRes.status);
    }

    const user = await uRes.json();
    const repos = (await rRes.json()).filter((r) => !r.fork);
    const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);

    const tiles = [
      ["Public Repos", user.public_repos],
      ["Followers", user.followers],
      ["Following", user.following],
      ["Total Stars", stars],
    ];

    statsBox.innerHTML = `<div class="gh-wrap">
      <h5>GitHub Stats</h5>
      <div class="stat-tiles">${tiles
        .map(([k, v]) => `<div class="stat-tile"><strong data-count="${v}">0</strong><span>${k}</span></div>`)
        .join("")}</div>
    </div>`;

    animateCounters(statsBox);

    const counts = {};

    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
      }
    });

    const entries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const total = entries.reduce((n, [, c]) => n + c, 0);

    langBox.innerHTML = entries.length
      ? `<div class="gh-wrap"><h5>Top Languages</h5><ul class="lang-list">${entries
          .map(([name, c]) => {
            const pct = Math.round((c / total) * 100);

            return `<li><div class="lang-row"><span>${name}</span><span>${pct}%</span></div>
              <div class="lang-bar"><i style="--w:${pct}%"></i></div></li>`;
          })
          .join("")}</ul></div>`
      : `<p class="gh-msg">No public repositories with a language yet.</p>`;
  } catch (e) {
    ghFail(statsBox, "GitHub stats could not be loaded right now.");
    ghFail(langBox, "Languages could not be loaded right now.");
  }
}

function animateCounters(root) {
  root.querySelectorAll("[data-count]").forEach((node) => {
    const end = +node.dataset.count;

    if (reduceMotionPref || end === 0) {
      node.textContent = end;
      return;
    }

    const start = performance.now();
    const dur = 1200;

    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      node.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));

      if (t < 1) {
        requestAnimationFrame(step);
      }
    })(start);
  });
}

async function loadGithubCalendar() {
  const box = el("ghCalendar");

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
    );

    if (!res.ok) {
      throw new Error("calendar " + res.status);
    }

    const data = await res.json();
    const days = data.contributions;
    const total = Object.values(data.total || {}).reduce((a, b) => a + b, 0);

    const pad = new Date(days[0].date + "T00:00:00").getDay();

    // Blank cells so weeks start on Sunday
    const cells = Array(pad).fill('<i class="day pad"></i>').concat(
      days.map(
        (d) => `<i class="day l${d.level}" title="${d.count} contributions on ${d.date}"></i>`
      )
    );

    box.innerHTML = `<div class="gh-wrap">
      <h5>GitHub Contributions <small>${total} in the last year</small></h5>
      <div class="cal-scroll"><div class="cal-grid">${cells.join("")}</div></div>
      <div class="cal-legend"><span>Less</span><i class="day l0"></i><i class="day l1"></i><i class="day l2"></i><i class="day l3"></i><i class="day l4"></i><span>More</span></div>
    </div>`;
  } catch (e) {
    ghFail(box, "Contribution calendar could not be loaded right now.");
  }
}

const reduceMotionPref = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

loadGithubStats();
loadGithubCalendar();

/* ========= NAVBAR ========= */
const menuBtn = el("menuBtn");
const navLinks = el("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

/* Highlight active section */
const links = [...navLinks.querySelectorAll("a:not(.nav-resume)")];

const sections = links.map((l) =>
  document.querySelector(l.getAttribute("href"))
);

const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + e.target.id
          )
        );
      }
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((s) => s && io.observe(s));

/* ========= CONTACT FORM (Web3Forms) ========= */
const form = el("contactForm");
const status = el("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  if (
    !data.get("name").trim() ||
    !data.get("email").trim() ||
    !data.get("message").trim()
  ) {
    status.className = "form-status err";
    status.textContent = "Please fill in your name, email and message.";
    return;
  }

  if (!form.email.checkValidity()) {
    status.className = "form-status err";
    status.textContent = "Please enter a valid email address.";
    return;
  }

  const btn = el("sendBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    const json = await res.json();

    if (json.success) {
      status.className = "form-status ok";
      status.textContent = "Thanks! Your message has been sent.";
      form.reset();
    } else {
      throw new Error(json.message || "Failed");
    }
  } catch (err) {
    status.className = "form-status err";
    status.textContent =
      "Could not send the message. Please email me directly.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Send Message";
  }
});

el("year").textContent = new Date().getFullYear();

/* ========= ANIMATIONS ========= */
document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* Typing effect in the hero */
(function typing() {
  const target = el("typed");

  if (!target || reduceMotion) {
    return;
  }

  const words = [
    "Java Backend Developer",
    "Full Stack Developer",
    "Spring Boot & REST APIs",
    "Problem Solver",
  ];

  let w = 0,
    c = 0,
    deleting = false;

  function tick() {
    const word = words[w];

    target.textContent = word.slice(0, c);

    let speed = deleting ? 45 : 90;

    if (!deleting && c === word.length) {
      deleting = true;
      speed = 1500;
    } else if (deleting && c === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      speed = 350;
    }

    c += deleting ? -1 : 1;

    setTimeout(tick, speed);
  }

  target.textContent = "";
  setTimeout(tick, 900);
})();

/* Scroll progress bar + navbar shadow */
const progress = el("progress");
const navbar = el("navbar");

function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;

  progress.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  navbar.classList.toggle("scrolled", h.scrollTop > 10);
}

addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Reveal on scroll, staggered inside each group */
if (!reduceMotion && "IntersectionObserver" in window) {
  const selector =
    ".section-title, .sub-title, .about-text, .tl-card, .logo-item, .project-card, .gh-card, .contact-info, .contact-form, .center";

  document.querySelectorAll(selector).forEach((node) => {
    const siblings = [...node.parentElement.children].filter((n) =>
      n.matches(selector)
    );

    node.style.setProperty(
      "--d",
      Math.min(siblings.indexOf(node), 8) * 0.08 + "s"
    );

    node.classList.add("reveal");
  });

  const revealIO = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) {
          return;
        }

        e.target.classList.add("in");
        obs.unobserve(e.target);

        // Hand control back to the normal hover transitions afterwards
        setTimeout(() => {
          e.target.classList.remove("reveal", "in");
          e.target.style.removeProperty("--d");
        }, 1300);
      }),
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((n) => revealIO.observe(n));

  const timeline = document.querySelector(".timeline");

  if (timeline) {
    new IntersectionObserver(
      ([e], obs) => {
        if (e.isIntersecting) {
          timeline.classList.add("drawn");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    ).observe(timeline);
  }
} else {
  document.querySelector(".timeline")?.classList.add("drawn");
}

/* Particle network behind the hero */
(function particles() {
  const cv = el("particles");

  if (!cv || reduceMotion) {
    return;
  }

  const ctx = cv.getContext("2d");

  let w = 0,
    h = 0,
    pts = [],
    running = false;

  function resize() {
    const r = cv.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    w = r.width;
    h = r.height;

    cv.width = w * dpr;
    cv.height = h * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.min(70, Math.floor((w * h) / 18000));

    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.7,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) {
        p.vx *= -1;
      }

      if (p.y < 0 || p.y > h) {
        p.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(244,162,97,.7)";
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);

        if (d < 120) {
          ctx.strokeStyle = `rgba(76,201,240,${0.2 * (1 - d / 120)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    if (!running) {
      return;
    }

    draw();
    requestAnimationFrame(loop);
  }

  resize();

  let t;

  addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(resize, 200);
  });

  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;

    if (running && !was) {
      loop();
    }
  }).observe(cv);
})();

/* ========= RESUME =========
   The resume links are configured in index.html.
   No JavaScript changes are required for the Google Drive links. */

