/**
 * WY Cleaning Products - Main JavaScript
 * Gebaseerd op professionele auto-service template stijl
 */

// Product Data
const products = [
    { id: 1, name: "Wash & Shine", category: "exterior", price: 24.99, description: "Kant-en-klare auto reiniger. Spray, wacht 2 minuten, afspuiten. Glanzend resultaat!", emoji: "🚗", badge: "Bestseller" },
    { id: 2, name: "Pre-Wash Degreaser", category: "exterior", price: 19.99, description: "Krachtige ontvetter voor hardnekkig vuil, vliegjes en olie. Ook voor motoren!", emoji: "⚡", badge: null },
    { id: 3, name: "Wheel Cleaner", category: "exterior", price: 14.99, description: "Alkalische velgenreiniger. Geen borstel nodig - spray, wacht, spoel af!", emoji: "🛞", badge: "Populair" },
    { id: 4, name: "Interior Cleaner", category: "interior", price: 17.99, description: "Alles-in-één interieur reiniger voor dashboard, stoelen en bekleding.", emoji: "🪑", badge: "Nieuw" },
    { id: 5, name: "Glass Cleaner", category: "interior", price: 12.99, description: "Streepvrije ruitenreiniger. Professionele helderheid zonder strepen.", emoji: "✨", badge: null },
    { id: 6, name: "Protection Spray", category: "protection", price: 29.99, description: "Langdurige beschermlaag voor lak en glans. Beschermt tot 3 maanden!", emoji: "🛡️", badge: "Premium" }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('wy_cart')) || [];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCart();
    renderProducts();
    updateCartUI();
});

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileDropdownToggle = document.getElementById('mobileDropdownToggle');
    const mobileDropdownMenu = document.getElementById('mobileDropdownMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileDropdownToggle && mobileDropdownMenu) {
        mobileDropdownToggle.addEventListener('click', () => {
            mobileDropdownToggle.classList.toggle('active');
            mobileDropdownMenu.classList.toggle('active');
        });
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Cart Functions
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const continueShopping = document.getElementById('continueShopping');

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', closeCart);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, quantity: quantity });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} toegevoegd aan winkelwagen!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('wy_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (cartTotal) {
        cartTotal.textContent = `€${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Je winkelwagen is leeg</p>
                    <a href="shop.html" class="btn btn-primary" style="margin-top: 1rem;">
                        <i class="fas fa-shopping-bag"></i> Ga naar shop
                    </a>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">€${item.price.toFixed(2).replace('.', ',')}</div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <div class="quantity-selector">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})"><i class="fas fa-minus"></i></button>
                                <input type="text" value="${item.quantity}" readonly>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Render Products
function renderProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const shopContainer = document.getElementById('shopProducts');

    const productCards = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.emoji}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">€${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Toevoegen aan winkelwagen">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (featuredContainer) {
        featuredContainer.innerHTML = productCards.slice(0, 3);
    }

    if (shopContainer) {
        shopContainer.innerHTML = productCards;
        initFilters();
    }
}

function getCategoryName(category) {
    const names = { 'exterior': 'Exterieur', 'interior': 'Interieur', 'protection': 'Bescherming' };
    return names[category] || category;
}

// Filters
function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            priceValue.textContent = `€${e.target.value}`;
            applyFilters();
        });
    }

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const productCards = document.querySelectorAll('.product-card');
    const checkedFilters = Array.from(document.querySelectorAll('.filter-checkbox input:checked')).map(cb => cb.dataset.filter);
    const maxPrice = document.getElementById('priceRange')?.value || 35;

    productCards.forEach(card => {
        const category = card.dataset.category;
        const priceText = card.querySelector('.product-price').textContent;
        const price = parseFloat(priceText.replace('€', '').replace(',', '.'));

        const categoryMatch = checkedFilters.includes('all') || checkedFilters.includes(category);
        const priceMatch = price <= maxPrice;

        card.style.display = categoryMatch && priceMatch ? 'block' : 'none';
    });
}

// Toast Notifications
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Bedankt voor je bericht! We nemen zo snel mogelijk contact op.');
        contactForm.reset();
    });
}
