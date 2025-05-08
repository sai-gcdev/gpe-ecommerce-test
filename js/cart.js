document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const section = document.getElementById('cart-items');

  if (cart.length === 0) {
    section.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" width="150">
      <p>Price: ₹${product.price}</p>
    `;
    section.appendChild(div);
  });
});