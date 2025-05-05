const allProducts = [
  { id: 1, name: "Smartphone X", price: 499, category: "electronics" },
  { id: 2, name: "Wireless Headphones", price: 199, category: "electronics" },
  { id: 3, name: "T-Shirt", price: 25, category: "clothing" },
  { id: 4, name: "Jeans", price: 45, category: "clothing" },
  { id: 5, name: "Blender", price: 60, category: "home" },
  { id: 6, name: "Air Purifier", price: 150, category: "home" }
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  const cart = getCart();
  cart.push(product);
  setCart(cart);
  alert(`${product.name} added to cart!`);
}
function loadProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const products = allProducts.filter(p => p.category === category);
  container.innerHTML = products.map(product => `
    <div class="product">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}
function loadCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!container) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      container.appendChild(div);
    });
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
  loadCart();
}
function goToCheckout() {
  window.location.href = "checkout.html";
}
function cancelOrder() {
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
function placeOrder(event) {
  event.preventDefault();

  const cart = getCart();
  const form = event.target;
  const name = form.querySelector("input[placeholder='Full Name']").value;
  const address = form.querySelector("input[placeholder='Address']").value;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const formattedDate = deliveryDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const productNames = cart.map(item => item.name).join(", ");

  document.getElementById("order-msg").innerText =
    `🎉 Thank you, ${name}! Your order of (${productNames}) will be delivered to "${address}" on ${formattedDate}.`;

  localStorage.removeItem("cart");
}

window.onload = function() {
  if (document.getElementById("cart-items")) loadCart();
  if (document.getElementById("product-container")) loadProducts();
};
