const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const sortOptions = document.getElementById("sortOptions");

let filteredProducts = [...products];

// Populate category filter
const categories = [...new Set(products.map((p) => p.category))];
categories.forEach((cat) => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

function displayProducts(productList) {
  productGrid.innerHTML = "";
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="wishlist-btn" data-id="${product.id}">Add to Wishlist</button>
      <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToStorage("wishlist", id);
      alert("Added to wishlist!");
    });
  });

  document.querySelectorAll(".cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToStorage("cart", id);
      alert("Added to cart!");
    });
  });
}

function addToStorage(key, id) {
  let items = JSON.parse(localStorage.getItem(key)) || [];
  if (!items.includes(id)) {
    items.push(id);
    localStorage.setItem(key, JSON.stringify(items));
  }
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const min = parseFloat(minPrice.value) || 0;
  const max = parseFloat(maxPrice.value) || Infinity;

  filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = product.price >= min && product.price <= max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  sortAndDisplay();
}

function sortAndDisplay() {
  const sortValue = sortOptions.value;
  let sortedProducts = [...filteredProducts];

  switch (sortValue) {
    case "priceLowHigh":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceHighLow":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "az":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  displayProducts(sortedProducts);
}

// Event Listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
minPrice.addEventListener("input", filterProducts);
maxPrice.addEventListener("input", filterProducts);
sortOptions.addEventListener("change", sortAndDisplay);

// Initial display
displayProducts(products);
