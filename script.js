/* =====================
   CMS連携 (microCMS)
===================== */
const CMS_ENDPOINT = "https://2way-official.microcms.io/api/v1";
const CMS_API_KEY = "fRJX0nlBGAZXrWij0Kw4HDqsPPuSIHPuB3mQ";

async function fetchCms(path) {
  const res = await fetch(`${CMS_ENDPOINT}/${path}`, {
    headers: { "X-MICROCMS-API-KEY": CMS_API_KEY }
  });
  if (!res.ok) {
    console.error("CMS取得失敗:", path, res.status);
    return null;
  }
  return res.json();
}

async function renderProfile() {
  const data = await fetchCms("profile");
  if (!data) return;
  const titleEl = document.querySelector(".profile .title");
  const descEl = document.querySelector(".profile .description");
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.innerHTML = data.description.replace(/\n/g, "<br>");
  
  if (data.image) {
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
      heroBg.style.backgroundImage = `url("${data.image.url}")`;
    }
  }
}

async function renderNews() {
  const data = await fetchCms("news?limit=10");
  if (!data) return;
  const list = document.querySelector("#news .list");
  if (!list) return;
  list.innerHTML = data.contents.map(item => `
    <li>
      <span class="date">${item.date || ""}</span>
      ${item.title ? `<span class="news-title">${item.title}</span>` : ""}
      ${item.image ? `<img class="news-image" src="${item.image.url}" alt="${item.title || ""}">` : ""}
      ${item.body ? `<p class="news-body">${item.body.replace(/\n/g, "<br>")}</p>` : ""}
    </li>
  `).join("");
}

async function renderLive() {
  const data = await fetchCms("live?limit=10");
  if (!data) return;
  const list = document.querySelector("#live .list");
  if (!list) return;
  list.innerHTML = data.contents.map(item => `
    <li>
      <span class="category">${item.category}</span>
      <span class="event">${item.event}</span>
      <span class="date">${item.date}</span>
      <span class="place">${item.place}</span>
    </li>
  `).join("");
}

window.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderNews();
  renderLive();
});

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const backToTopBtn = document.getElementById("backToTop");

/* =====================
   MENU OPEN / CLOSE
===================== */
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  document.body.style.overflow = menu.classList.contains("active")
    ? "hidden"
    : "auto";
});

menu.addEventListener("click", () => {
  menu.classList.remove("active");
  document.body.style.overflow = "auto";
});

/* =====================
   HERO ANIMATION
===================== */
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero");

  setTimeout(() => {
    hero.classList.add("hide-text");
  }, 2000);

  setTimeout(() => {
    hero.classList.add("show-bg");
  }, 3000);
});

/* =====================
   BACK TO TOP
===================== */
backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();       // ← 超重要
  menu.classList.remove("active");
  document.body.style.overflow = "auto";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
