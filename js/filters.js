document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");
  const sortFilter = document.getElementById("sort-filter");
  const searchBox = document.getElementById("search-box");

  let filteredProducts = [...products];

  const renderProducts = () => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    filteredProducts.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
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

  const applyFilters = () => {
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
    const sortBy = sortFilter.value;
    const searchTerm = searchBox.value.toLowerCase();

    filteredProducts = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesPrice && matchesSearch;
    });

    if (sortBy === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "name-asc") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts();
  };

  categoryFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("input", () => {
    priceValue.textContent = `₹0 - ₹${priceFilter.value}`;
    applyFilters();
  });
  sortFilter.addEventListener("change", applyFilters);
  searchBox.addEventListener("input", applyFilters);

  // Initial render
  renderProducts();
});
