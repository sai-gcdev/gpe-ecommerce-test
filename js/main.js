// main.js

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortSelect = document.getElementById('sort-select');
  const searchInput = document.getElementById('search-input');

  let filteredProducts = [...products];

  // Function to render products
  function renderProducts(productsToRender) {
    productList.innerHTML = '';
    productsToRender.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price.toFixed(2)}</p>
        <button class="wishlist-btn" data-id="${product.id}">Add to Wishlist</button>
        <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(div);
    });

    // Attach event listeners to the new buttons
    attachEventListeners();
  }

  // Function to attach event listeners to buttons
  function attachEventListeners() {
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
  }

  // Function to apply filters and sorting
  function applyFilters() {
    let result = [...products];

    // Category Filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Price Filter
    const selectedPrice = priceFilter.value;
    if (selectedPrice !== 'all') {
      const [min, max] = selectedPrice.split('-').map(Number);
      result = result.filter(product => product.price >= min && product.price <= max);
    }

    // Search Filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      result = result.filter(product => product.name.toLowerCase().includes(searchTerm));
    }

    // Sorting
    const selectedSort = sortSelect.value;
    if (selectedSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(result);
  }

  // Event listeners for filters and search
  categoryFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  // Initial render
  renderProducts(filteredProducts);

  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Category Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
      const panel = header.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
});
