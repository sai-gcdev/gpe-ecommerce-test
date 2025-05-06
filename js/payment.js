const form = document.getElementById("paymentForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic form validation
  const name = form.name.value.trim();
  const cardNumber = form.cardNumber.value.trim();
  const expiry = form.expiry.value.trim();
  const cvv = form.cvv.value.trim();
  const voucher = form.voucher.value.trim();
  
  if (!name || !cardNumber || !expiry || !cvv) {
    alert("Please fill all required fields.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + (product ? product.price : 0);
  }, 0);

  const discount = voucher.toLowerCase() === "save10" ? 0.1 * total : 0;
  const finalAmount = total - discount;

  localStorage.removeItem("cart");

  confirmation.innerHTML = `
    <h3>🎉 Order Placed Successfully!</h3>
    <p>Thank you, ${name}.</p>
    <p>Total Paid: $${finalAmount.toFixed(2)} (${discount > 0 ? 'Voucher Applied!' : 'No Voucher'})</p>
    <p>Your items will be shipped soon!</p>
  `;

  form.reset();
});
