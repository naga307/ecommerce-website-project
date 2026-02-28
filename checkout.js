// Initialize checkout page
updateCartCount();
loadCheckoutItems();

function loadCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItemsContainer = document.getElementById('checkoutItems');

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} × ₹${item.price}</p>
            </div>
            <span class="checkout-item-total">₹${item.price * item.quantity}</span>
        </div>
    `).join('');

    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    document.getElementById('checkoutSubtotal').textContent = `₹${subtotal}`;
    document.getElementById('checkoutShipping').textContent = `₹${shipping}`;
    document.getElementById('checkoutTax').textContent = `₹${Math.round(tax)}`;
    document.getElementById('checkoutTotal').textContent = `₹${Math.round(total)}`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    // Generate order ID
    const orderId = 'ORD' + Date.now();

    // Create order object
    const order = {
        orderId: orderId,
        date: new Date().toISOString(),
        customer: {
            name: fullName,
            email: email,
            phone: phone,
            address: address,
            city: city,
            pincode: pincode
        },
        items: cart,
        payment: paymentMethod,
        subtotal: subtotal,
        shipping: shipping,
        tax: Math.round(tax),
        total: Math.round(total),
        status: 'Order Placed',
        tracking: [
            {
                status: 'Order Placed',
                date: new Date().toISOString(),
                completed: true
            },
            {
                status: 'Processing',
                date: null,
                completed: false
            },
            {
                status: 'Shipped',
                date: null,
                completed: false
            },
            {
                status: 'Out for Delivery',
                date: null,
                completed: false
            },
            {
                status: 'Delivered',
                date: null,
                completed: false
            }
        ]
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message and redirect
    alert(`Order placed successfully! Your order ID is: ${orderId}\n\nYou can track your order on the Orders page.`);
    window.location.href = 'orders.html';
});
