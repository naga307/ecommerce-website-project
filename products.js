// Product Database
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 2499,
        originalPrice: 3999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Experience crystal-clear sound quality and comfortable design for all-day wear.",
        rating: 4.5,
        reviews: [],
        stock: 25,
        features: ["Active Noise Cancellation", "30-hour Battery Life", "Bluetooth 5.0", "Comfortable Ear Cushions"]
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 3999,
        originalPrice: 6999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitor, GPS, and water resistance up to 50m.",
        rating: 4.3,
        reviews: [],
        stock: 15,
        features: ["Heart Rate Monitor", "GPS Tracking", "50m Water Resistance", "7-day Battery Life"]
    },
    {
        id: 3,
        name: "Classic Cotton T-Shirt",
        category: "clothing",
        price: 499,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        description: "100% premium cotton t-shirt with comfortable fit. Available in multiple colors and sizes. Perfect for casual everyday wear.",
        rating: 4.7,
        reviews: [],
        stock: 50,
        features: ["100% Cotton", "Machine Washable", "Multiple Sizes", "Comfortable Fit"]
    },
    {
        id: 4,
        name: "Denim Jeans - Blue",
        category: "clothing",
        price: 1299,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
        description: "Classic blue denim jeans with modern fit. Durable material with stretch for extra comfort. Perfect for any casual occasion.",
        rating: 4.4,
        reviews: [],
        stock: 30,
        features: ["Stretch Denim", "Classic Fit", "Durable Material", "Multiple Sizes"]
    },
    {
        id: 5,
        name: "Non-Stick Cookware Set",
        category: "home",
        price: 2999,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
        description: "Complete 7-piece non-stick cookware set. Includes frying pans, saucepans, and more. Dishwasher safe and PFOA-free coating.",
        rating: 4.6,
        reviews: [],
        stock: 20,
        features: ["7-Piece Set", "Non-Stick Coating", "Dishwasher Safe", "PFOA-Free"]
    },
    {
        id: 6,
        name: "Premium Coffee Maker",
        category: "home",
        price: 4999,
        originalPrice: 7999,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        description: "Programmable coffee maker with 12-cup capacity. Features auto-brew function and keeps coffee hot for hours.",
        rating: 4.5,
        reviews: [],
        stock: 12,
        features: ["12-Cup Capacity", "Programmable", "Auto-Brew", "Keep Warm Function"]
    },
    {
        id: 7,
        name: "The Psychology of Money",
        category: "books",
        price: 399,
        originalPrice: 599,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
        description: "Timeless lessons on wealth, greed, and happiness. A must-read book about managing personal finances and understanding money.",
        rating: 4.8,
        reviews: [],
        stock: 40,
        features: ["Paperback Edition", "320 Pages", "Bestseller", "Personal Finance"]
    },
    {
        id: 8,
        name: "Atomic Habits",
        category: "books",
        price: 449,
        originalPrice: 699,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop",
        description: "An easy and proven way to build good habits and break bad ones. Transform your life one tiny change at a time.",
        rating: 4.9,
        reviews: [],
        stock: 35,
        features: ["Hardcover Edition", "288 Pages", "Bestseller", "Self-Help"]
    },
    {
        id: 9,
        name: "Yoga Mat - Premium Quality",
        category: "sports",
        price: 899,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        description: "Extra thick yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises. Comes with carrying strap.",
        rating: 4.4,
        reviews: [],
        stock: 25,
        features: ["Extra Thick", "Non-Slip Surface", "Free Carrying Strap", "Eco-Friendly Material"]
    },
    {
        id: 10,
        name: "Resistance Bands Set",
        category: "sports",
        price: 699,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop",
        description: "Set of 5 resistance bands with different resistance levels. Perfect for home workouts, strength training, and physical therapy.",
        rating: 4.6,
        reviews: [],
        stock: 30,
        features: ["5 Resistance Levels", "Durable Latex", "Portable", "Workout Guide Included"]
    },
    {
        id: 11,
        name: "Laptop Backpack",
        category: "electronics",
        price: 1499,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        description: "Water-resistant laptop backpack with USB charging port. Fits laptops up to 15.6 inches with multiple compartments.",
        rating: 4.3,
        reviews: [],
        stock: 18,
        features: ["Water Resistant", "USB Charging Port", "Fits 15.6\" Laptop", "Multiple Compartments"]
    },
    {
        id: 12,
        name: "Casual Sneakers",
        category: "clothing",
        price: 1999,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
        description: "Comfortable casual sneakers with breathable mesh upper. Lightweight design perfect for walking and everyday wear.",
        rating: 4.5,
        reviews: [],
        stock: 22,
        features: ["Breathable Mesh", "Lightweight", "Cushioned Sole", "Multiple Sizes"]
    }
];

// Initialize reviews for some products
products[0].reviews = [
    { name: "Rahul Sharma", rating: 5, comment: "Excellent sound quality! Worth every penny.", date: "2026-02-10" },
    { name: "Priya Patel", rating: 4, comment: "Great headphones, comfortable for long use.", date: "2026-02-08" }
];

products[2].reviews = [
    { name: "Amit Kumar", rating: 5, comment: "Perfect fit and very comfortable!", date: "2026-02-09" },
    { name: "Neha Singh", rating: 5, comment: "Great quality cotton, highly recommended.", date: "2026-02-07" },
    { name: "Vikram Reddy", rating: 4, comment: "Good t-shirt for the price.", date: "2026-02-05" }
];

products[6].reviews = [
    { name: "Anjali Gupta", rating: 5, comment: "Life-changing book! Must read.", date: "2026-02-11" },
    { name: "Karan Mehta", rating: 5, comment: "Best book on personal finance I've ever read.", date: "2026-02-06" }
];
