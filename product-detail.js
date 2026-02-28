// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Initialize page
updateCartCount();
loadProductDetails();
loadReviews();

function loadProductDetails() {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    const productDetailContainer = document.getElementById('productDetail');
    
    productDetailContainer.innerHTML = `
        <div class="product-images">
            <img src="${product.image}" alt="${product.name}" class="main-image">
        </div>
        <div class="product-main-info">
            <h1>${product.name}</h1>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>${product.rating} (${product.reviews.length} reviews)</span>
            </div>
            <div class="product-price-detail">
                <span class="current-price">₹${product.price}</span>
                ${product.originalPrice > product.price ? `
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                ` : ''}
            </div>
            <div class="product-description-full">
                <h3>Description</h3>
                <p>${product.description}</p>
            </div>
            <div class="product-features">
                <h3>Key Features</h3>
                <ul>
                    ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="product-stock">
                <i class="fas fa-check-circle"></i>
                <span>${product.stock} items in stock</span>
            </div>
            <div class="product-actions-detail">
                <button class="btn-primary" onclick="addToCartFromDetail(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <a href="cart.html" class="btn-secondary">Go to Cart</a>
            </div>
        </div>
    `;
}

function loadReviews() {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reviewsListContainer = document.getElementById('reviewsList');
    
    if (product.reviews.length === 0) {
        reviewsListContainer.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>';
        return;
    }

    reviewsListContainer.innerHTML = product.reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div>
                    <h4>${review.name}</h4>
                    <div class="review-rating">${generateStars(review.rating)}</div>
                </div>
                <span class="review-date">${new Date(review.date).toLocaleDateString('en-IN')}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');
}

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

function addToCartFromDetail(productId) {
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

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Review form handling
let selectedRating = 0;

document.querySelectorAll('.stars i').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.rating);
        document.getElementById('ratingValue').value = selectedRating;
        
        document.querySelectorAll('.stars i').forEach((s, index) => {
            if (index < selectedRating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });

    star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.dataset.rating);
        document.querySelectorAll('.stars i').forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

document.querySelector('.stars').addEventListener('mouseleave', function() {
    document.querySelectorAll('.stars i').forEach((s, index) => {
        if (index < selectedRating) {
            s.classList.remove('far');
            s.classList.add('fas');
        } else {
            s.classList.remove('fas');
            s.classList.add('far');
        }
    });
});

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (selectedRating === 0) {
        alert('Please select a rating');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reviewerName = document.getElementById('reviewerName').value;
    const reviewText = document.getElementById('reviewText').value;

    const newReview = {
        name: reviewerName,
        rating: selectedRating,
        comment: reviewText,
        date: new Date().toISOString()
    };

    product.reviews.push(newReview);

    // Recalculate average rating
    const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
    product.rating = Math.round(avgRating * 10) / 10;

    // Clear form
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    document.querySelectorAll('.stars i').forEach(s => {
        s.classList.remove('fas');
        s.classList.add('far');
    });

    // Reload reviews and product details
    loadReviews();
    loadProductDetails();
    
    showNotification('Thank you for your review!');
});
