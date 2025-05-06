const productList = document.getElementById("product-list");

products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" width="100%" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(productDiv);
});

function addToWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
