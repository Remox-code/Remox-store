document
  .querySelector(".lux-footer__form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
  });

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal, .reveal-text");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-grid");
  const cards = Array.from(track.children);
  const nextButton = document.querySelector(".slider-nav.next");
  const prevButton = document.querySelector(".slider-nav.prev");
  const wrapper = document.querySelector(".products-wrapper");

  let currentIndex = 0;
  const itemsToShow = 3;
  const totalItems = cards.length;
  const cardWidth =
    cards[0].getBoundingClientRect().width +
    parseFloat(getComputedStyle(cards[0]).marginRight);

  function setSliderStyles() {
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const numItemsVisible = Math.floor(wrapperWidth / cardWidth);
    const trackWidth = cardWidth * totalItems + 30 * (totalItems - 1);

    track.style.width = `${trackWidth}px`;
    wrapper.style.width = `${numItemsVisible * cardWidth}px`;
  }

  setSliderStyles();
  window.addEventListener("resize", setSliderStyles);

  function moveToNextSlide() {
    if (currentIndex < totalItems - itemsToShow) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSliderPosition();
  }

  function moveToPrevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalItems - itemsToShow;
    }
    updateSliderPosition();
  }

  function updateSliderPosition() {
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  nextButton.addEventListener("click", moveToNextSlide);
  prevButton.addEventListener("click", moveToPrevSlide);

  let autoPlayInterval;
  const autoPlay = () => {
    autoPlayInterval = setInterval(() => {
      moveToNextSlide();
    }, 1500);
  };

  autoPlay();

  wrapper.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
  wrapper.addEventListener("mouseleave", autoPlay);

  const revealElements = document.querySelectorAll(".reveal");
  const staggerItems = document.querySelectorAll(".stagger-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.5 },
  );

  revealElements.forEach((el) => observer.observe(el));
});
