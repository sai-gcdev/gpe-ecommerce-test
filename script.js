// Sample product data
const products = [
  {
    id: 1,
    name: "iPhone 12",
    category: "phones",
    price: 799,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTGEDr8fVQMGK7QkXEPguEeD7o7PiKDJTvghEkcTKZAEr9UaF15i_aOn4lxiW51L04JzaEmjgEtf_t2kh-8yNCxOGCTeOrnXaxJqxNiBNWgUZe9ZgEaU_mavw"
  },
  {
    id: 2,
    name: "MacBook Pro",
    category: "laptops",
    price: 1299,
    image: "https://i0.wp.com/www.originalmacguy.com/wp-content/uploads/2024/11/1280-M4-MacBook-Pro.png?w=1280&ssl=1"
  },
  {
    id: 3,
    name: "Men's T-Shirt",
    category: "men",
    price: 25,
    image: "https://unstd.in/cdn/shop/files/SAGE-GREEN-2.jpg?v=1734507963&width=1200"
  },
  {
    id: 4,
    name: "Women's Dress",
    category: "women",
    price: 45,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTQ07vdCZG5v5n_9g1qBPxwMW25HG-wuGAMRr02SrwBR2zaaoQi_ZE_GVpgKOcSXxeB5dcwnCZ_n1f3lmWrqkkTghQ28cM07XicVFnxkonzo4jXKwyQpZPj"
  }
];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const categoryFilters = document.querySelectorAll(".category-filter");
const accordionButtons = document.querySelectorAll(".accordion-btn");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

let filteredProducts = [...products];

function renderProducts(productsToRender) {
  productGrid.innerHTML = "";
  productsToRender.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      <button class="add-to-wishlist" data-id="${product.id}">Wishlist ❤️</button>
    `;
    productGrid.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart").forEach(btn =>
    btn.addEventListener("click", addToCart)
  );
  document.querySelectorAll(".add-to-wishlist").forEach(btn =>
    btn.addEventListener("click", addToWishlist)
  );
}

function addToCart(event) {
  const id = parseInt(event.target.dataset.id);
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function addToWishlist(event) {
  const id = parseInt(event.target.dataset.id);
  const product = products.find(p => p.id === id);
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert(`${product.name} added to wishlist!`);
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

searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);
categoryFilters.forEach(checkbox => checkbox.addEventListener("change", filterProducts));

accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

hamburger.addEventListener("click", () => {
  navMenu.querySelector("ul").classList.toggle("show");
});

renderProducts(products);
