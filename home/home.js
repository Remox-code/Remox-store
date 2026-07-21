// جلوگیری از submit فرم فوتر (اگر وجود داشت)
document
  .querySelector(".lux-footer__form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
  });

/* =========================
   REVEAL ANIMATION (scroll)
========================= */
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal, .reveal-text");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    },
  );

  revealElements.forEach((el) => observer.observe(el));
});

/* =========================
   TRENDING SLIDER (RESPONSIVE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-grid");
  const wrapper = document.querySelector(".products-wrapper");
  const cards = Array.from(track.children);

  const nextButton = document.querySelector(".slider-nav.next");
  const prevButton = document.querySelector(".slider-nav.prev");

  let currentIndex = 0;
  let autoPlayInterval;

  // تعداد آیتم قابل نمایش بر اساس سایز صفحه
  function getItemsToShow() {
    const width = window.innerWidth;
    if (width < 600) return 1; // موبایل
    if (width < 900) return 2; // تبلت
    return 3; // دسکتاپ
  }

  // عرض کارت (با margin)
  function getCardWidth() {
    const card = cards[0];
    const style = getComputedStyle(card);
    return card.getBoundingClientRect().width + parseFloat(style.marginRight);
  }

  function updateSlider() {
    const itemsToShow = getItemsToShow();
    const cardWidth = getCardWidth();

    const maxIndex = Math.max(0, cards.length - itemsToShow);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  }

  function next() {
    const itemsToShow = getItemsToShow();
    const maxIndex = cards.length - itemsToShow;

    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prev() {
    const itemsToShow = getItemsToShow();
    const maxIndex = cards.length - itemsToShow;

    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  nextButton?.addEventListener("click", next);
  prevButton?.addEventListener("click", prev);

  window.addEventListener("resize", updateSlider);

  updateSlider();

  /* =========================
     AUTOPLAY
  ========================= */
  function startAutoPlay() {
    autoPlayInterval = setInterval(next, 2500);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  startAutoPlay();

  wrapper?.addEventListener("mouseenter", stopAutoPlay);
  wrapper?.addEventListener("mouseleave", startAutoPlay);

  /* =========================
     OPTIONAL: REVEAL (stagger cards)
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.5 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
