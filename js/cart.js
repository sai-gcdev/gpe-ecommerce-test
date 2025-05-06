const cartItems = document.getElementById("cart-items");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((id) => {
  const product = products.find((p) => p.id === id);
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("cart-item");
  itemDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" width="100%" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
  `;
  cartItems.appendChild(itemDiv);
});

document.getElementById("checkout-button").addEventListener("click", () => {
  window.location.href = "
::contentReference[oaicite:36]{index=36}
 
