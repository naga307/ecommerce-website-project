// Initialize cart count on page load
updateCartCount();

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    let filteredProducts = [...products];

    // Apply filters
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Filter by category
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }

    // Filter by price range
    if (priceFilter !== 'all') {
        if (priceFilter === '0-1000') {
            filteredProducts = filteredProducts.filter(p => p.price < 1000);
        } else if (priceFilter === '1000-5000') {
            filteredProducts = filteredProducts.filter(p => p.price >= 1000 && p.price < 5000);
        } else if (priceFilter === '5000-10000') {
            filteredProducts = filteredProducts.filter(p => p.price >= 5000 && p.price < 10000);
        } else if (priceFilter === '10000+') {
            filteredProducts = filteredProducts.filter(p => p.price >= 10000);
        }
    }

    // Filter by search
    if (searchInput) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchInput) || 
            p.description.toLowerCase().includes(searchInput) ||
            p.category.toLowerCase().includes(searchInput)
        );
    }

    // Sort products
    switch(sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    // Display products
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.originalPrice > product.price ? `<span class="discount-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews.length})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn-secondary">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = totalItems);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    // Filter event listeners
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');

    if (categoryFilter) categoryFilter.addEventListener('change', loadProducts);
    if (sortFilter) sortFilter.addEventListener('change', loadProducts);
    if (priceFilter) priceFilter.addEventListener('change', loadProducts);
    if (searchInput) {
        searchInput.addEventListener('input', loadProducts);
    }
});
