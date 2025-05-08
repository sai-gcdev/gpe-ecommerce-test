document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const searchBox = document.getElementById('search-box');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Render products
  const renderProducts = (filteredProducts) => {
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      const isInWishlist = wishlist.some(item => item.id === product.id);
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
        <i class="wishlist-icon ${isInWishlist ? 'active' : ''}" data-id="${product.id}">❤️</i>
        <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  };

  // Filter products by category
  const filterByCategory = (category) => {
    if (category === 'all') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  // Filter products by price
  const filterByPrice = (maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
  };

  // Handle category filter click
  categoryFilter.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const category = e.target.getAttribute('data-category');
      const filteredProducts = filterByCategory(category);
      renderProducts(filteredProducts);
    }
  });

  // Handle price filter change
  priceFilter.addEventListener('input', () => {
    const maxPrice = priceFilter.value;
    priceValue.textContent = maxPrice;
    const filteredProducts = filterByPrice(maxPrice);
    renderProducts(filteredProducts);
  });

  // Handle live search
  searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
  });

  // Handle wishlist toggle
  productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('wishlist-icon')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      if (e.target.classList.contains('active')) {
        wishlist = wishlist.filter(item => item.id !== productId);
        e.target.classList.remove('active');
      } else {
        wishlist.push(product);
        e.target.classList.add('active');
      }
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  });

  // Handle add to cart
  productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-btn')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    }
  });

  // Initial render
  renderProducts(products);
});
