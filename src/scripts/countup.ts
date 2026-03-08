function easeOutQuint(x: number): number {
  return 1 - (1 - x) ** 5;
}

function countDecimals(val: number): number {
  if (Math.floor(val) === val) return 0;
  return val.toString().split(".")[1]?.length ?? 0;
}

function animateValue(el: HTMLElement, end: number, decimals: number): void {
  const duration = 2500;
  let start: number | null = null;

  function step(timestamp: number): void {
    if (!start) start = timestamp;
    const progress = Math.min(easeOutQuint((timestamp - start) / duration), 1);
    const current = Math.abs(progress * end);

    el.textContent = current.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function initCounters(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-module="countup"]');
  if (!containers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        const raw = target.dataset.countupNumber?.replace(/,/g, "") ?? "0";
        const end = parseFloat(raw);
        animateValue(target, end, countDecimals(end));
        observer.unobserve(target);
      }
    },
    { threshold: 0 },
  );

  for (const container of containers) {
    const numbers = container.querySelectorAll<HTMLElement>("[data-countup-number]");
    for (const el of numbers) {
      observer.observe(el);
    }
  }
}

document.addEventListener("astro:page-load", initCounters);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCounters);
} else {
  initCounters();
}
