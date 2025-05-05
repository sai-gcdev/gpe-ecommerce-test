// Sample product data
const products = [
  {
    id: 1,
    name: "iPhone 12",
    category: "phones",
    price: 799,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "MacBook Pro",
    category: "laptops",
    price: 1299,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Men's T-Shirt",
    category: "men",
    price: 25,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Women's Dress",
    category: "women",
    price: 45,
    image: "https://via.placeholder.com/150"
  },
  // Add more products as needed
];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const categoryFilters = document.querySelectorAll(".category-filter");
const accordionButtons = document.querySelectorAll(".accordion-btn");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

// State
let filteredProducts = [...products];

// Functions
function renderProducts(productsToRender) {
  productGrid.innerHTML = "";
  productsToRender.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
    `;
    productGrid.appendChild(productCard);
  });
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(categoryFilters)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  sortProducts();
  renderProducts(filteredProducts);
}

function sortProducts() {
  const sortValue = sortSelect.value;
  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
}

// Event Listeners
searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);
categoryFilters.forEach(checkbox => checkbox.addEventListener("change", filterProducts));

// Accordion functionality
accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navMenu.querySelector("ul").classList.toggle("show");
});

// Initial render
renderProducts(products);
