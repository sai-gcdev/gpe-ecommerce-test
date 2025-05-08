document.addEventListener('DOMContentLoaded', () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const section = document.getElementById('wishlist-items');

  if (wishlist.length === 0) {
    section.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" width="150">
      <p>Price: ₹${product.price}</p>
    `;
    section.appendChild(div);
  });
});