document.addEventListener('DOMContentLoaded', () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const section = document.getElementById('wishlist-items');

  if (wishlist.length === 0) {
    section.innerHTML = "<p>No items in wishlist.</p>";
    return;
  }

  wishlist.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" width="150" />
      <p>${product.price} INR</p>
      <button onclick="removeFromWishlist(${product.id})">Remove</button>
      <button onclick="addToCartFromWishlist(${product.id})">Add to Cart</button>
    `;
    section.appendChild(div);
  });
});

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  location.reload();
}

function addToCartFromWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const item = wishlist.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
}
