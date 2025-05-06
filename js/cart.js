const cartGrid = document.getElementById("cartGrid");
const totalPriceEl = document.getElementById("totalPrice");

function getCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return products.filter((product) => cart.includes(product.id));
}

function displayCart() {
  const items = getCartItems();
  cartGrid.innerHTML = "";

  if (items.length === 0) {
    cartGrid.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "0.00";
    return;
  }

  let total = 0;
  items.forEach((product) => {
    total += product.price;
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="remove-btn" data-id="${product.id}">Remove</button>
    `;

    cartGrid.appendChild(card);
  });

  totalPriceEl.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((itemId) => itemId !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });
}

displayCart();
