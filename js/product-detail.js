// Product Detail page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    initQuantitySelector();
});

// Load product details
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - WY Cleaning Products`;
    
    // Update breadcrumb
    const breadcrumbName = document.getElementById('breadcrumbProductName');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }
    
    // Update product image
    const productImage = document.getElementById('productImage');
    const productImageContainer = document.getElementById('productImageContainer');
    if (productImage) {
        productImage.textContent = product.emoji;
    }
    
    // Update product category
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        const categoryNames = {
            'exterior': 'Exterieur',
            'interior': 'Interieur',
            'protection': 'Bescherming'
        };
        productCategory.textContent = categoryNames[product.category] || product.category;
    }
    
    // Update product name
    const productName = document.getElementById('productName');
    if (productName) {
        productName.textContent = product.name;
    }
    
    // Update product price
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }
    
    // Update product description
    const productDescription = document.getElementById('productDescription');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    // Update product features
    const productFeatures = document.getElementById('productFeatures');
    if (productFeatures && product.features) {
        productFeatures.innerHTML = product.features.map(feature => 
            `<li>✓ ${feature}</li>`
        ).join('');
    }
    
    // Update add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const qtyInput = document.getElementById('qtyInput');
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
            addToCart(product.id, quantity);
        });
    }
    
    // Load related products
    loadRelatedProducts(productId);
}

// Initialize quantity selector
function initQuantitySelector() {
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    
    if (qtyMinus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
    }
    
    if (qtyPlus && qtyInput) {
        qtyPlus.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue < 99) {
                qtyInput.value = currentValue + 1;
            }
        });
    }
}

// Load related products
function loadRelatedProducts(currentId) {
    const container = document.getElementById('relatedProducts');
    if (container) {
        const related = getRelatedProducts(currentId, 3);
        container.innerHTML = related.map(p => `
            <div class="product-card">
                <div class="product-image">
                    <div class="product-emoji">${p.emoji}</div>
                    <div class="product-actions-overlay">
                        <button class="btn-add-cart" onclick="addToCart(${p.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            In winkelwagen
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${p.category === 'exterior' ? 'Exterieur' : p.category === 'interior' ? 'Interieur' : 'Bescherming'}</div>
                    <h3 class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
                    <p class="product-description">${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(p.price)}</span>
                        <a href="product-detail.html?id=${p.id}" class="btn btn-text">Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}