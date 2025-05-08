document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const searchBox = document.getElementById('search-box');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');

  // Render products
  const renderProducts = (filteredProducts) => {
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
        <button class="wishlist-btn" data-id="${product.id}">Add to Wishlist</button>
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

  // Initial render
  renderProducts(products);
});
