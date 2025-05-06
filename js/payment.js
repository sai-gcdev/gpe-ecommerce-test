document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');
  const confirmationMessage = document.getElementById('confirmation-message');
  const cancelButton = document.getElementById('cancel-button');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const location = document.getElementById('location').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const paymentType = document.getElementById('paymentType').value;
    const voucher = document.getElementById('voucher').value;

    // Clear cart and wishlist
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');

    // Display confirmation
    confirmationMessage.innerHTML = `
      <h2>🎉 Order Placed Successfully!</h2>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
      <p><strong>Payment Type:</strong> ${paymentType}</p>
      ${voucher ? `<p><strong>Voucher Applied:</strong> ${voucher}</p>` : ''}
    `;
    confirmationMessage.classList.remove('hidden');
    form.classList.add('hidden');
  });

  cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
