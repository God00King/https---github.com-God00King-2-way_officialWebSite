const CMS_ENDPOINT = "https://2way-official.microcms.io/api/v1";
const CMS_API_KEY = "fRJX0nlBGAZXrWij0Kw4HDqsPPuSIHPuB3mQ";

async function fetchCms(path) {
  const res = await fetch(`${CMS_ENDPOINT}/${path}`, {
    headers: { "X-MICROCMS-API-KEY": CMS_API_KEY }
  });
  if (!res.ok) return null;
  return res.json();
}

function linkify(text) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:#ff7a00;">$1</a>');
}

function renderArticles(data, listId) {
  const list = document.getElementById(listId);
  if (!list || !data) return;
  list.innerHTML = data.contents.map(item => `
    <li>
      ${item.title ? `<span class="news-title">${item.title}</span>` : ""}
      ${item.image ? `<img class="news-image" src="${item.image.url}" alt="${item.title || ""}">` : ""}
      ${item.body ? `<p class="news-body">${linkify(item.body)}</p>` : ""}
    </li>
  `).join("");
}

async function init() {
  const [seikyoiku, condom, hpv] = await Promise.all([
    fetchCms("seikyoiku?limit=10"),
    fetchCms("condom?limit=10"),
    fetchCms("hpv?limit=10"),
  ]);
  renderArticles(seikyoiku, "seikyoiku-list");
  renderArticles(condom, "condom-list");
  renderArticles(hpv, "hpv-list");
}

/* MENU */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "auto";
});
menu.addEventListener("click", () => {
  menu.classList.remove("active");
  document.body.style.overflow = "auto";
});

/* BACK TO TOP */
const backToTopBtn = document.getElementById("backToTop");
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("DOMContentLoaded", init);