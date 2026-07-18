/*
 * Reads data.json (personal info) and metadata.json (portfolio content)
 * and renders them into index.html.
 *
 * Every section is optional: if a category is missing, null, or an empty
 * array in the JSON, its section stays hidden. Individual fields inside
 * entries are also optional and are simply skipped when absent.
 */

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const [data, metadata] = await Promise.all([
      fetchJson("data.json"),
      fetchJson("metadata.json"),
    ]);
    renderPortfolio(data || {}, metadata || {});
    document.getElementById("loading-message").hidden = true;
    document.getElementById("portfolio").hidden = false;
  } catch (err) {
    console.error("Failed to load portfolio data:", err);
    document.getElementById("loading-message").hidden = true;
    document.getElementById("error-message").hidden = false;
  }
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
  }
  return response.json();
}

/* ---------- helpers ---------- */

function hasText(value) {
  return typeof value === "string" && value.trim() !== "";
}

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (hasText(value)) {
    el.textContent = value;
  } else {
    el.hidden = true;
  }
}

/** Create an element with a class and optional text content. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (hasText(text)) node.textContent = text;
  return node;
}

function link(href, text, className) {
  const a = el("a", className, text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

/**
 * Shows a section and fills its container using renderItem for each entry.
 * Leaves the section hidden when the category is missing or empty.
 */
function renderSection(sectionId, containerId, items, renderItem) {
  if (!hasItems(items)) return;
  const container = document.getElementById(containerId);
  items.forEach((item) => {
    const node = renderItem(item);
    if (node) container.appendChild(node);
  });
  if (container.children.length > 0) {
    document.getElementById(sectionId).hidden = false;
  }
}

/* ---------- rendering ---------- */

function renderPortfolio(data, metadata) {
  renderHero(data);
  renderAbout(data);

  renderSection("education-section", "education-list", metadata.education, renderEducation);
  renderSection("work-section", "work-list", metadata.workExperience, renderWork);
  renderSection("projects-section", "projects-list", metadata.projects, renderProject);
  renderSection("skills-section", "skills-list", metadata.skills, renderSkill);
  renderSection("certificates-section", "certificates-list", metadata.certificates, renderCertificate);
  renderSection("por-section", "por-list", metadata.positionsOfResponsibility, renderPosition);
  renderSection(
    "extracurricular-section",
    "extracurricular-list",
    metadata.extracurricular,
    renderExtracurricular
  );

  renderFooter(data);
}

function renderHero(data) {
  setText("name", data.name || "Your Name");
  setText("title", data.title);
  setText("tagline", data.tagline);

  const links = document.getElementById("contact-links");
  const entries = [
    { label: "Email", href: hasText(data.email) ? `mailto:${data.email}` : "" },
    { label: "LinkedIn", href: data.linkedin },
    { label: "GitHub", href: data.github },
    { label: "Website", href: data.website },
    { label: "Resume", href: data.resumeUrl },
  ];
  entries.forEach(({ label, href }) => {
    if (hasText(href)) links.appendChild(link(href, label, "contact-link"));
  });
  if (hasText(data.location)) {
    links.appendChild(el("span", "contact-link location", data.location));
  }
  if (links.children.length === 0) links.hidden = true;
}

function renderAbout(data) {
  if (!hasText(data.about)) return;
  document.getElementById("about").textContent = data.about;
  document.getElementById("about-section").hidden = false;
}

function renderEducation(entry) {
  if (!hasText(entry.institution) && !hasText(entry.degree)) return null;
  const card = el("article", "card");

  const header = el("div", "card-header");
  header.appendChild(el("h3", "card-title", entry.institution || entry.degree));
  const years = [entry.startYear, entry.endYear].filter(hasText).join(" - ");
  if (years) header.appendChild(el("span", "card-date", years));
  card.appendChild(header);

  if (hasText(entry.institution) && hasText(entry.degree)) {
    card.appendChild(el("p", "card-subtitle", entry.degree));
  }
  if (hasText(entry.score)) card.appendChild(el("p", "card-meta", entry.score));
  if (hasText(entry.details)) card.appendChild(el("p", "card-text", entry.details));
  return card;
}

function renderWork(entry) {
  if (!hasText(entry.company) && !hasText(entry.role)) return null;
  const card = el("article", "card");

  const header = el("div", "card-header");
  const title = el("h3", "card-title", entry.role || entry.company);
  header.appendChild(title);
  if (hasText(entry.type)) {
    const badge = el("span", `badge badge-${entry.type.toLowerCase()}`, formatWorkType(entry.type));
    header.appendChild(badge);
  }
  const dates = [entry.startDate, entry.endDate].filter(hasText).join(" - ");
  if (dates) header.appendChild(el("span", "card-date", dates));
  card.appendChild(header);

  const subtitle = [
    hasText(entry.role) ? entry.company : "",
    entry.location,
  ].filter(hasText).join(" | ");
  if (subtitle) card.appendChild(el("p", "card-subtitle", subtitle));

  if (hasItems(entry.description)) {
    const ul = el("ul", "card-bullets");
    entry.description.filter(hasText).forEach((point) => {
      ul.appendChild(el("li", "", point));
    });
    if (ul.children.length > 0) card.appendChild(ul);
  } else if (hasText(entry.description)) {
    card.appendChild(el("p", "card-text", entry.description));
  }
  return card;
}

function formatWorkType(type) {
  const t = type.trim().toLowerCase();
  if (t === "full-time" || t === "fulltime") return "Full-time";
  if (t === "internship") return "Internship";
  return type;
}

function renderProject(entry) {
  if (!hasText(entry.name)) return null;
  const card = el("article", "card project-card");

  card.appendChild(el("h3", "card-title", entry.name));
  if (hasText(entry.description)) card.appendChild(el("p", "card-text", entry.description));

  if (hasItems(entry.technologies)) {
    const tags = el("div", "tag-list");
    entry.technologies.filter(hasText).forEach((tech) => {
      tags.appendChild(el("span", "tag", tech));
    });
    if (tags.children.length > 0) card.appendChild(tags);
  }

  const linksRow = el("div", "card-links");
  if (hasText(entry.link)) linksRow.appendChild(link(entry.link, "Code", "card-link"));
  if (hasText(entry.demo)) linksRow.appendChild(link(entry.demo, "Live Demo", "card-link"));
  if (linksRow.children.length > 0) card.appendChild(linksRow);
  return card;
}

function renderSkill(skill) {
  if (!hasText(skill)) return null;
  return el("li", "skill", skill);
}

function renderCertificate(entry) {
  if (!hasText(entry.name)) return null;
  const card = el("article", "card");

  const header = el("div", "card-header");
  if (hasText(entry.url)) {
    const h3 = el("h3", "card-title");
    h3.appendChild(link(entry.url, entry.name));
    header.appendChild(h3);
  } else {
    header.appendChild(el("h3", "card-title", entry.name));
  }
  if (hasText(entry.date)) header.appendChild(el("span", "card-date", entry.date));
  card.appendChild(header);

  if (hasText(entry.issuer)) card.appendChild(el("p", "card-subtitle", entry.issuer));
  return card;
}

function renderPosition(entry) {
  if (!hasText(entry.position)) return null;
  const card = el("article", "card");

  const header = el("div", "card-header");
  header.appendChild(el("h3", "card-title", entry.position));
  if (hasText(entry.duration)) header.appendChild(el("span", "card-date", entry.duration));
  card.appendChild(header);

  if (hasText(entry.organization)) card.appendChild(el("p", "card-subtitle", entry.organization));
  if (hasText(entry.description)) card.appendChild(el("p", "card-text", entry.description));
  return card;
}

function renderExtracurricular(entry) {
  if (!hasText(entry.activity)) return null;
  const card = el("article", "card");

  const header = el("div", "card-header");
  header.appendChild(el("h3", "card-title", entry.activity));
  if (hasText(entry.duration)) header.appendChild(el("span", "card-date", entry.duration));
  card.appendChild(header);

  if (hasText(entry.organization)) card.appendChild(el("p", "card-subtitle", entry.organization));
  if (hasText(entry.description)) card.appendChild(el("p", "card-text", entry.description));
  return card;
}

function renderFooter(data) {
  const name = hasText(data.name) ? data.name : "Me";
  document.getElementById("footer-text").textContent =
    `© ${new Date().getFullYear()} ${name}. Built with plain HTML, CSS & JavaScript.`;
}
