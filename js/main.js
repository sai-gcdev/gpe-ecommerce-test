document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');

  // Check if products are loaded
  if (!productList || typeof products === 'undefined') {
    console.error("Product list container or products data is missing.");
    return;
  }

  // Render each product to the page
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="150" />
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price}</p>
      <button class="wishlist-btn" data-id="${product.id}">Add to Wishlist</button>
      <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  // Handle Wishlist Button Clicks
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.id);
      const selectedProduct = products.find(p => p.id === productId);
      if (!selectedProduct) return;

      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const exists = wishlist.find(p => p.id === selectedProduct.id);

      if (!exists) {
        wishlist.push(selectedProduct);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    });
  });

  // Handle Cart Button Clicks
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.id);
      const selectedProduct = products.find(p => p.id === productId);
      if (!selectedProduct) return;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
});
