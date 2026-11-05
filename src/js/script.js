const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

hamburger.addEventListener("click", () => {
  const isActive = menu.classList.toggle("active");
  hamburger.classList.toggle("active", isActive);
  hamburger.setAttribute("aria-expanded", isActive);
  hamburger.setAttribute("aria-label", isActive ? "Tutup menu" : "Buka menu");
});