function initAccordions(): void {
  const items = document.querySelectorAll<HTMLElement>(".accordion-item");
  if (!items.length) return;

  for (const item of items) {
    const header = item.querySelector<HTMLElement>(".accordion-header");
    if (!header) continue;

    header.addEventListener("click", () => {
      for (const sibling of items) {
        sibling.classList.remove("active");
      }
      item.classList.toggle("active");
    });
  }
}

document.addEventListener("astro:page-load", initAccordions);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccordions);
} else {
  initAccordions();
}
