document.addEventListener("DOMContentLoaded", function () {
  // انیمیشن ورود با اسکرول (مشابه صفحه درباره ما)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));

  // مدیریت ارسال فرم
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // اینجا می‌توانید با یک سرویس مثل EmailJS یا Backend واقعی پیام را بفرستید
      const btn = this.querySelector(".submit-btn");
      const originalContent = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
      btn.style.pointerEvents = "none";

      setTimeout(() => {
        alert("ارباب بزرگ، پیام شما با موفقیت ثبت شد و به تیم ما ارسال گردید!");
        btn.innerHTML = originalContent;
        btn.style.pointerEvents = "all";
        contactForm.reset();
      }, 2000);
    });
  }
});
