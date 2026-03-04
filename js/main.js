/**
 * WY Cleaning Products - Main JavaScript
 * Cart functionality, theme toggle, mobile menu, and more
 */

// Product data
const products = [
    {
        id: 1,
        name: "Wash & Shine",
        category: "exterior",
        price: 24.99,
        description: "Kant-en-klare auto reiniger. Spray, wacht 2 minuten, afspuiten. Glanzend resultaat!",
        emoji: "🚗",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Pre-Wash Degreaser",
        category: "exterior",
        price: 19.99,
        description: "Krachtige ontvetter voor hardnekkig vuil, vliegjes en olie. Ook voor motoren en boten!",
        emoji: "⚡",
        badge: null
    },
    {
        id: 3,
        name: "Wheel Cleaner",
        category: "exterior",
        price: 14.99,
        description: "Alkalische velgenreiniger. Geen borstel nodig - spray, wacht, spoel af!",
        emoji: "🛞",
        badge: "Populair"
    },
    {
        id: 4,
        name: "Interior Cleaner",
        category: "interior",
        price: 17.99,
        description: "Alles-in-één interieur reiniger voor dashboard, stoelen en bekleding.",
        emoji: "🪑",
        badge: "Nieuw"
    },
    {
        id: 5,
        name: "Glass Cleaner",
        category: "interior",
        price: 12.99,
        description: "Streepvrije ruitenreiniger. Professionele helderheid zonder strepen.",
        emoji: "✨",
        badge: null
    },
    {
        id: 6,
        name: "Protection Spray",
        category: "protection",
        price: 29.99,
        description: "Langdurige beschermlaag voor lak en glans. Beschermt tot 3 maanden!",
        emoji: "🛡️",
        badge: "Premium"
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('wy_cart')) || [];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initCart();
    renderProducts();
    updateCartUI();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('wy_theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('wy_theme', newTheme);
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Cart Functions
function initCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
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
    
    // Close cart on escape key
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
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.name} toegevoegd aan winkelwagen!`, 'success');
    
    // Open cart briefly to show the item was added
    openCart();
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
        cartTotal.textContent = `€${totalPrice.toFixed(2)}`;
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p>Je winkelwagen is leeg</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">€${item.price.toFixed(2)} x ${item.quantity}</div>
                        <div class="quantity-selector" style="margin-top: 0.5rem;">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                            <input type="text" value="${item.quantity}" readonly>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Verwijder</button>
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
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">€${product.price.toFixed(2)}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Toevoegen aan winkelwagen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    if (featuredContainer) {
        // Show only 3 featured products on homepage
        featuredContainer.innerHTML = productCards.slice(0, 3);
    }
    
    if (shopContainer) {
        shopContainer.innerHTML = productCards;
        initFilters();
    }
}

function getCategoryName(category) {
    const names = {
        'exterior': 'Exterieur',
        'interior': 'Interieur',
        'protection': 'Bescherming'
    };
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
        const price = parseFloat(priceText.replace('€', ''));
        
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
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Product Detail Page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const detailContainer = document.getElementById('productDetail');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-gallery">${product.emoji}</div>
                <div class="product-detail-info">
                    <div class="product-detail-category">${getCategoryName(product.category)}</div>
                    <h1>${product.name}</h1>
                    <div class="product-detail-price">€${product.price.toFixed(2)}</div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-features">
                        <h4>Kenmerken</h4>
                        <ul>
                            <li>Professionele kwaliteit</li>
                            <li>Makkelijk in gebruik</li>
                            <li>Langdurig resultaat</li>
                            <li>Veilig voor alle oppervlakten</li>
                        </ul>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateDetailQuantity(-1)">−</button>
                            <input type="text" id="detailQuantity" value="1" readonly>
                            <button class="quantity-btn" onclick="updateDetailQuantity(1)">+</button>
                        </div>
                        <button class="btn btn-primary btn-lg" onclick="addDetailToCart(${product.id})">
                            In winkelwagen
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateDetailQuantity(change) {
    const input = document.getElementById('detailQuantity');
    if (input) {
        const current = parseInt(input.value) || 1;
        const newValue = Math.max(1, current + change);
        input.value = newValue;
    }
}

function addDetailToCart(productId) {
    const input = document.getElementById('detailQuantity');
    const quantity = parseInt(input?.value) || 1;
    addToCart(productId, quantity);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Bedankt voor je bericht! We nemen zo snel mogelijk contact op.', 'success');
            form.reset();
        });
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadProductDetail();
        initContactForm();
    });
} else {
    loadProductDetail();
    initContactForm();
}
