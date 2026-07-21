const container = document.getElementById("cart-container");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  container.innerHTML = "<h2>سبد خرید خالی است.</h2>";
} else {
  container.innerHTML = cart
    .map(
      (item) => `

        <div class="cart-item">

            <img src="${item.image}">

            <h3>${item.title}</h3>

            <p>${item.price.toLocaleString("fa-IR")} تومان</p>

            <span>تعداد : ${item.quantity}</span>

        </div>

    `,
    )
    .join("");
}
