function initStickyHeader(): void {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("scrolling", window.scrollY > 0);
    }
  });
}

document.addEventListener("astro:page-load", initStickyHeader);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyHeader);
} else {
  initStickyHeader();
}
