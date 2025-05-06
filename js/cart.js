document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const section = document.getElementById('cart-items');
  let total = 0;

  if (cart.length === 0) {
    section.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((product, index) => {
    total += product.price;
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" width="150" />
      <p>${product.price} INR</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    section.appendChild(div);
  });

  const totalDisplay = document.createElement('h3');
    totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
    section.appendChild(totalDisplay);
  
  document.getElementById('checkout-button').addEventListener('click', () => {
    window.location.href = 'payment.html';
  });
});

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
