document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const searchBox = document.getElementById('search-box');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');

  const renderProducts = (filteredProducts) => {
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
        <button class="wishlist-btn" data-id="${product.id}">Add to Wishlist</button>
        <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  };

  const filterByCategory = (category) => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  };

  const filterByPrice = (maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
  };

  categoryFilter.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const category = e.target.getAttribute('data-category');
      renderProducts(filterByCategory(category));
    }
  });

  priceFilter.addEventListener('input', () => {
    const maxPrice = priceFilter.value;
    priceValue.textContent = maxPrice;
    renderProducts(filterByPrice(maxPrice));
  });

  searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase();
    renderProducts(products.filter(product => product.name.toLowerCase().includes(query)));
  });

  renderProducts(products);
});