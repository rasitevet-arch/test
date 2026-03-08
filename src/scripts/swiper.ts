import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const initialized = new WeakSet<Element>();

function initSlider(selector: string, config: ConstructorParameters<typeof Swiper>[1]): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (initialized.has(el)) return;
    initialized.add(el);
    new Swiper(el, config);
  });
}

function initSwipers(): void {
  initSlider(".client-slider", {
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    speed: 3000,
    loopAdditionalSlides: 5,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    },
  });

  initSlider(".testimonial-slider", {
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    speed: 8000,
    loopAdditionalSlides: 5,
    spaceBetween: 24,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 2.5 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 4 },
    },
  });

  initSlider(".testimonial-slider-reverse", {
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    speed: 8000,
    loopAdditionalSlides: 5,
    spaceBetween: 24,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: true,
    },
    breakpoints: {
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 2.5 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 4 },
    },
  });
}

document.addEventListener("astro:page-load", initSwipers);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSwipers);
} else {
  initSwipers();
}
