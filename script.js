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

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const categoryFilters = document.querySelectorAll(".category-filter");

let filteredProducts = [...products];

function renderProducts(productsToRender) {
  productGrid.innerHTML = "";
  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}" />
      <h4>\${product.name}</h4>
      <p>$\${product.price}</p>
      <button class="add-to-cart" data-id="\${product.id}">Add to Cart</button>
      <button class="add-to-wishlist" data-id="\${product.id}">Wishlist ❤️</button>
    \`;
    productGrid.appendChild(card);
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
  alert(\`\${product.name} added to cart!\`);
}

function addToWishlist(event) {
  const id = parseInt(event.target.dataset.id);
  const product = products.find(p => p.id === id);
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(\`\${product.name} added to wishlist!\`);
  } else {
    alert(\`\${product.name} is already in wishlist!\`);
  }
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(categoryFilters)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  sortProducts();
  renderProducts(filteredProducts);
}

function sortProducts() {
  const value = sortSelect.value;
  if (value === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (value === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (value === "name-asc") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (value === "name-desc") filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
}

searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);
categoryFilters.forEach(cb => cb.addEventListener("change", filterProducts));

renderProducts(filteredProducts);
