function initRipple(): void {
  const buttons = document.querySelectorAll<HTMLElement>(".ripple-button");
  if (!buttons.length) return;

  for (const button of buttons) {
    button.addEventListener("click", (e: MouseEvent) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;

      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  }
}

document.addEventListener("astro:page-load", initRipple);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRipple);
} else {
  initRipple();
}
