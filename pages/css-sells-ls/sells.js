document.addEventListener("DOMContentLoaded", () => {
  // --- انیمیشن ورود کارت‌های محصول ---
  const productCards = document.querySelectorAll(".product-card");
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // فعال شدن وقتی 10% کارت دیده شود
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const title = card.querySelector(".product-card__title");
        const description = card.querySelector(".product-card__description");
        const footer = card.querySelector(".product-card__footer");

        // اعمال انیمیشن‌ها با تاخیر
        if (title) {
          title.style.animation = `slideInFromLeft 0.6s ${0.2 + Math.random() * 0.2}s ease-out forwards`;
          title.style.opacity = 1;
        }
        if (description) {
          description.style.animation = `fadeIn 0.6s ${0.4 + Math.random() * 0.2}s ease-out forwards`;
          description.style.opacity = 1;
        }
        if (footer) {
          footer.style.animation = `fadeIn 0.6s ${0.6 + Math.random() * 0.2}s ease-out forwards`;
          footer.style.opacity = 1;
        }

        observer.unobserve(entry.target); // جلوگیری از اجرای مجدد انیمیشن
      }
    });
  }, observerOptions);

  productCards.forEach((card) => {
    observer.observe(card);
  });

  // --- افکت پارالاکس ساده برای هدر و فوتر ---
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // هدر (کمی محو شدن و بالا رفتن)
    if (header) {
      header.style.transform = `translateY(${scrollY * 0.3}px)`;
      header.style.opacity = 1 - scrollY / 200; // محو شدن تدریجی
    }

    // فوتر (اثر پارالاکس ثابت)
    if (footer && footer.style.backgroundAttachment === "fixed") {
      // این افکت در CSS با background-attachment: fixed پیاده‌سازی شده است.
      // در صورت نیاز به کنترل بیشتر، می‌توان اینجا هم اضافه کرد.
    }
  });

  // --- افکت درخشش برای دکمه‌ها هنگام هاور (تکمیل CSS) ---
  const buttons = document.querySelectorAll(".product-card__button");
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // ایجاد افکت درخشش یا موج جزئی
      const glow = button.querySelector(".button-glow");
      if (!glow) {
        const glowElement = document.createElement("span");
        glowElement.className = "button-glow";
        glowElement.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    top: ${y}px;
                    left: ${x}px;
                `;
        button.appendChild(glowElement);
      } else {
        glow.style.top = `${y}px`;
        glow.style.left = `${x}px`;
      }
    });

    button.addEventListener("mouseleave", () => {
      const glow = button.querySelector(".button-glow");
      if (glow) {
        // حذف المان after hover animation is done
        setTimeout(() => {
          if (glow.parentNode) glow.parentNode.removeChild(glow);
        }, 600); // همزمان با انیمیشن ripple
      }
    });
  });

  // اگر در CSS از @keyframes ripple استفاده کردید، نیازی به این بخش نیست.
  // این فقط یک مثال برای افکت موج بود.
}); // End DOMContentLoaded
