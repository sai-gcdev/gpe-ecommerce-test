/* script.js */
const products = [
  { id: 1, name: "Smartphone X", price: 499 },
  { id: 2, name: "Wireless Headphones", price: 199 },
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = getCart();
  cart.push(product);
  setCart(cart);
  alert(`${product.name} added to cart!`);
}

function loadCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    container.appendChild(div);
  });
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
  document.getElementById("order-msg").innerText =
    "🎉 Thank you! Your order has been placed successfully.";
  localStorage.removeItem("cart");
}

window.onload = loadCart;
