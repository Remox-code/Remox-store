document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");

  if (!container) {
    console.error("product-container پیدا نشد.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const currentCategory = params.get("type");

  if (!currentCategory) {
    container.innerHTML =
      "<h2 class= warning-texts>لطفا دسته بندی خودتون رو مشخص کنید</h2>";
    return;
  }

  fetch("./category.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("خطا در خواندن فایل JSON");
      }
      return response.json();
    })
    .then((products) => {
      const filteredProducts = products.filter(
        (product) => product.category === currentCategory,
      );

      if (filteredProducts.length === 0) {
        container.innerHTML =
          "<h2 class= warning-texts>محصولی برای این دسته پیدا نشد</h2>";
        return;
      }

      container.innerHTML = filteredProducts
        .map(
          (product) => `
        <article class="product-card">

          <img
            class="product-card__image"
            src="${product.image}"
            alt="${product.title}"
          >

          <div class="product-card__content">

            <h2 class="product-card__title">
              ${product.title}
            </h2>

            <p class="product-card__description">
              ${product.description}
            </p>

            <div class="product-card__footer">

              <span class="product-card__price">
${product.price.toLocaleString("fa-IR")} تومان     
         </span>

<button
    class="product-card__button"
    data-id="${product.id}">
    افزودن به سبد خرید
</button>

            </div>

          </div>

        </article>
      `,
        )
        .join("");
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML =
        "<h2 class= warning-texts>خطا در بارگذاری محصولات</h2>";
    });
});

// cart //
const buttons = document.querySelectorAll(".product-card__button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = Number(button.dataset.id);

    const product = products.find((p) => p.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("محصول به سبد خرید اضافه شد.");
  });
});
