const wishlistItems = document.getElementById("wishlist-items");
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist.forEach((id) => {
  const product = products.find((p) => p.id === id);
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("wishlist-item");
  itemDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" width="100%" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
  `;
  wishlistItems.appendChild(itemDiv);
});
