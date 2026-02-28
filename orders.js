// Initialize orders page
updateCartCount();
loadOrders();

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersListContainer = document.getElementById('ordersList');

    if (orders.length === 0) {
        ordersListContainer.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-box-open"></i>
                <h2>No orders yet</h2>
                <p>Start shopping to see your orders here!</p>
                <a href="index.html#products" class="btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    ordersListContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h3>Order #${order.orderId}</h3>
                    <p class="order-date">${new Date(order.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</p>
                </div>
                <div class="order-status ${order.status.toLowerCase().replace(/ /g, '-')}">
                    ${order.status}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <p><strong>${item.name}</strong></p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <p>₹${item.price * item.quantity}</p>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">
                    <strong>Total: ₹${order.total}</strong>
                </div>
                <button class="btn-primary" onclick="viewOrderTracking('${order.orderId}')">Track Order</button>
            </div>
        </div>
    `).join('');
}

function viewOrderTracking(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderId === orderId);

    if (!order) return;

    displayTracking(order);
    
    // Scroll to tracking result
    document.getElementById('trackingResult').scrollIntoView({ behavior: 'smooth' });
}

function displayTracking(order) {
    const trackingResultContainer = document.getElementById('trackingResult');

    trackingResultContainer.innerHTML = `
        <div class="tracking-details">
            <h3>Order #${order.orderId}</h3>
            <p class="tracking-date">Ordered on ${new Date(order.date).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
            
            <div class="tracking-progress">
                ${order.tracking.map((step, index) => `
                    <div class="tracking-step ${step.completed ? 'completed' : ''}">
                        <div class="step-icon">
                            <i class="fas ${step.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </div>
                        <div class="step-info">
                            <h4>${step.status}</h4>
                            ${step.date ? `<p>${new Date(step.date).toLocaleDateString('en-IN')} ${new Date(step.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="delivery-info">
                <h4>Delivery Address</h4>
                <p>${order.customer.name}</p>
                <p>${order.customer.address}</p>
                <p>${order.customer.city}, ${order.customer.pincode}</p>
                <p>Phone: ${order.customer.phone}</p>
            </div>
        </div>
    `;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Track order button
document.getElementById('trackBtn').addEventListener('click', function() {
    const orderId = document.getElementById('orderIdInput').value.trim();
    
    if (!orderId) {
        alert('Please enter an order ID');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        document.getElementById('trackingResult').innerHTML = `
            <div class="tracking-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Order not found. Please check your order ID and try again.</p>
            </div>
        `;
        return;
    }

    displayTracking(order);
});
