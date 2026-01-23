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
