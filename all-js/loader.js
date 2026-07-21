async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  const response = await fetch(file);

  element.innerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  const BASE = window.BASE_PATH || "";

  await loadComponent("header", BASE + "components/header.html");

  await loadComponent("category-nav", BASE + "components/category-nav.html");

  await loadComponent("footer", BASE + "components/footer.html");

  /*-------------------*/

  const routes = {
    home: "index.html",

    about: "pages/about/about.html",

    contact: "pages/get-in-touch/get-in-touch.html",

    cart: "pages/cart/cart.html",

    profile: "pages/profile/profile.html",

    category: "pages/category/category.html",
  };

  document.querySelectorAll("[data-page]").forEach((link) => {
    const page = link.dataset.page;

    link.href = BASE + routes[page];
  });

  document.querySelectorAll(".category-link").forEach((link) => {
    link.href =
      BASE + "pages/category/category.html?type=" + link.dataset.category;
  });

  /*-------------------*/

  const current = location.pathname;

  document.querySelectorAll("[data-page]").forEach((link) => {
    const route = routes[link.dataset.page];

    if (current.endsWith(route)) {
      link.classList.add("active");
    }
  });

  const params = new URLSearchParams(location.search);

  const type = params.get("type");

  document.querySelectorAll(".category-link").forEach((link) => {
    if (link.dataset.category === type) {
      link.classList.add("active");
    }
  });
});
