const STORAGE_KEY = 'kna_shared_cart';

// Global cart array
let cart = [];

// ==================== PRODUCT DATABASES ====================

// GPU Products (14 graphics cards)
const gpuProducts = [
    { id: 1, name: "RTX 5090", fullName: "Nvidia GeForce RTX 5090", price: 1999, category: "FLAGSHIP", specs: "24GB GDDR7 · 512-bit · 450W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 2, name: "RTX 5080", fullName: "Nvidia GeForce RTX 5080", price: 1199, category: "HIGH-END", specs: "20GB GDDR7 · 384-bit · 350W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 3, name: "RTX 4080 Super", fullName: "Nvidia GeForce RTX 4080 Super", price: 999, category: "HIGH-END", specs: "16GB GDDR6X · 256-bit · 320W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 4, name: "RX 7900 XTX", fullName: "AMD Radeon RX 7900 XTX", price: 949, category: "HIGH-END", specs: "24GB GDDR6 · 384-bit · 355W", type: "gpu", img: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2026/01/amd-gpu-handout-1.jpg?q=70&fit=crop&w=1280&h=720&dpr=1" },
    { id: 5, name: "RX 7900 XT", fullName: "AMD Radeon RX 7900 XT", price: 799, category: "PERFORMANCE", specs: "20GB GDDR6 · 320-bit · 315W", type: "gpu", img: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2026/01/amd-gpu-handout-1.jpg?q=70&fit=crop&w=1280&h=720&dpr=1" },
    { id: 6, name: "RTX 4060", fullName: "Nvidia GeForce RTX 4060", price: 299, category: "MAINSTREAM", specs: "8GB GDDR6 · 128-bit · 115W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 7, name: "RTX 3060 Ti", fullName: "Nvidia GeForce RTX 3060 Ti", price: 399, category: "MAINSTREAM", specs: "8GB GDDR6 · 256-bit · 200W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 8, name: "RTX 2080 Ti", fullName: "Nvidia GeForce RTX 2080 Ti", price: 499, category: "PREMIUM", specs: "11GB GDDR6 · 352-bit · 250W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 9, name: "RX 6600 XT", fullName: "AMD Radeon RX 6600 XT", price: 279, category: "MAINSTREAM", specs: "8GB GDDR6 · 128-bit · 160W", type: "gpu", img: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2026/01/amd-gpu-handout-1.jpg?q=70&fit=crop&w=1280&h=720&dpr=1" },
    { id: 10, name: "RX 5700 XT", fullName: "AMD Radeon RX 5700 XT", price: 199, category: "BUDGET", specs: "8GB GDDR6 · 256-bit · 225W", type: "gpu", img: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2026/01/amd-gpu-handout-1.jpg?q=70&fit=crop&w=1280&h=720&dpr=1" },
    { id: 11, name: "GTX 1080 Ti", fullName: "Nvidia GeForce GTX 1080 Ti", price: 249, category: "BUDGET", specs: "11GB GDDR5X · 352-bit · 250W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 12, name: "GTX 1660 Super", fullName: "Nvidia GeForce GTX 1660 Super", price: 159, category: "BUDGET", specs: "6GB GDDR6 · 192-bit · 125W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 13, name: "GTX 1650 Super", fullName: "Nvidia GeForce GTX 1650 Super", price: 129, category: "ENTRY", specs: "4GB GDDR6 · 128-bit · 100W", type: "gpu", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800" },
    { id: 14, name: "RX 580", fullName: "AMD Radeon RX 580", price: 99, category: "ENTRY", specs: "8GB GDDR5 · 256-bit · 185W", type: "gpu", img: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2026/01/amd-gpu-handout-1.jpg?q=70&fit=crop&w=1280&h=720&dpr=1" }
];

// Laptop Products (6 laptops with dedicated GPUs)
const laptopProducts = [
    {
        id: 101, name: "Zephyrus G14", fullName: "ASUS ROG Zephyrus G14", price: 1599,
        category: "GAMING ULTRABOOK", gpu: "NVIDIA RTX 4060 Laptop GPU", vram: "8GB GDDR6",
        cpu: "AMD Ryzen 9 7940HS", display: "14\" QHD+ 165Hz Mini-LED",
        specs: "8GB VRAM · 165Hz · Ryzen 9", type: "laptop",
        img: "https://media.wired.com/photos/69f4ddb6670176ac727e70db/master/w_1600,c_limit/Review--Asus-Zenbook-A16-(2026).jpg"
    },
    {
        id: 102, name: "ThinkPad X1 Carbon", fullName: "Lenovo ThinkPad X1 Carbon (Gen 12)", price: 2099,
        category: "BUSINESS PREMIUM", gpu: "Intel Arc Graphics (Integrated + AI Boost)", vram: "Shared Memory",
        cpu: "Intel Core Ultra 7 155H", display: "14\" 2.8K OLED 120Hz",
        specs: "Intel Arc GPU · 32GB LPDDR5x · 1TB SSD", type: "laptop",
        img: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800"
    },
    {
        id: 103, name: "OmniBook", fullName: "HP OmniBook Series (Ultra 9)", price: 1349,
        category: "ULTRA PERFORMANCE", gpu: "NVIDIA GeForce RTX 3050", vram: "6GB GDDR6",
        cpu: "Intel Core Ultra 9 185H", display: "16\" WUXGA 144Hz IPS",
        specs: "RTX 3050 · 6GB VRAM · 16\" 144Hz", type: "laptop",
        img: "https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV-650-80.jpg.webp"
    },
    {
        id: 104, name: "ROG Flow X13", fullName: "ASUS ROG Flow X13 (2024)", price: 1849,
        category: "2-in-1 GAMING", gpu: "NVIDIA RTX 4070 Laptop GPU", vram: "8GB GDDR6",
        cpu: "AMD Ryzen 9 7940HS", display: "13.4\" QHD+ 165Hz Touch",
        specs: "RTX 4070 · 8GB VRAM · 165Hz Touch", type: "laptop",
        img: "https://media.wired.com/photos/69f4ddb6670176ac727e70db/master/w_1600,c_limit/Review--Asus-Zenbook-A16-(2026).jpg"
    },
    {
        id: 105, name: "XPS 15", fullName: "Dell XPS 15 (9530)", price: 2299,
        category: "CREATOR EDITION", gpu: "NVIDIA RTX 4080 Laptop GPU", vram: "12GB GDDR6",
        cpu: "Intel Core i9-13900H", display: "15.6\" 3.5K OLED Touch",
        specs: "RTX 4080 · 12GB VRAM · OLED 3.5K", type: "laptop",
        img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800"
    },
    {
        id: 106, name: "Spectre x360", fullName: "HP Spectre x360 13.5", price: 1649,
        category: "PREMIUM CONVERTIBLE", gpu: "Intel Arc Graphics (Integrated)", vram: "Shared",
        cpu: "Intel Core Ultra 7 155H", display: "13.5\" 3K OLED 120Hz",
        specs: "Intel Arc GPU · 3K OLED · 120Hz", type: "laptop",
        img: "https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV-650-80.jpg.webp"
    }
];

// Helper: Get product by ID from either database
function getProductById(id) {
    // Try GPU products first (IDs 1-14)
    let product = gpuProducts.find(p => p.id === id);
    if (product) return { ...product, type: 'gpu' };
    // Try laptop products (IDs 101-106)
    product = laptopProducts.find(p => p.id === id);
    if (product) return { ...product, type: 'laptop' };
    return null;
}

// ==================== CART FUNCTIONS ====================

function loadCartFromStorage() {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    } else {
        cart = [];
    }
    updateCartUI();
}

function persistCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Universal add to cart - works with any product type
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    const existing = cart.find(item => item.id === productId && item.type === product.type);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            type: product.type,
            fullName: product.fullName,
            name: product.name,
            price: product.price,
            quantity: 1,
            // Store additional product-specific info for display
            gpu: product.gpu || null,
            vram: product.vram || null,
            specs: product.specs || null,
            category: product.category || null
        });
    }

    persistCart();
    updateCartUI();
    openCart(); // Optional: auto-open cart on add
}

function updateQuantity(productId, delta, itemType = null) {
    const item = cart.find(i => i.id === productId && (itemType ? i.type === itemType : true));
    if (item) {
        const newQuantity = (item.quantity || 1) + delta;
        if (newQuantity <= 0) {
            cart = cart.filter(i => !(i.id === productId && (itemType ? i.type === itemType : true)));
        } else {
            item.quantity = newQuantity;
        }
        persistCart();
        updateCartUI();
    }
}

function removeFromCart(productId, itemType = null) {
    cart = cart.filter(i => !(i.id === productId && (itemType ? i.type === itemType : true)));
    persistCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    persistCart();
    updateCartUI();
}

// ==================== UI UPDATE FUNCTIONS ====================

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-list');
    const totalContainer = document.getElementById('cart-total');
    const cartCountNav = document.getElementById('cart-count-nav');
    const cartCountBtn = document.getElementById('cart-count-btn');

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (totalContainer) totalContainer.innerText = total.toLocaleString();
    if (cartCountNav) cartCountNav.innerText = itemCount;
    if (cartCountBtn) cartCountBtn.innerText = itemCount;

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">Cart is empty</p>';
        return;
    }

    cartContainer.innerHTML = cart.map(item => {
        // Determine what extra info to show based on product type
        let extraInfo = '';
        if (item.type === 'laptop' && item.gpu) {
            extraInfo = `🎮 ${item.gpu} · ${item.vram || ''}`;
        } else if (item.type === 'gpu' && item.specs) {
            extraInfo = `🔧 ${item.specs}`;
        }

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.fullName || item.name} ${item.type === 'laptop' ? '💻' : '🎮'}</div>
                    ${extraInfo ? `<div class="cart-item-specs" style="font-size:0.7rem; color:#aaa;">${extraInfo}</div>` : ''}
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="window.updateQuantity(${item.id}, -1, '${item.type}')">-</button>
                    <span>${item.quantity || 1}</span>
                    <button class="qty-btn" onclick="window.updateQuantity(${item.id}, 1, '${item.type}')">+</button>
                </div>
                <button class="cart-item-remove" onclick="window.removeFromCart(${item.id}, '${item.type}')">REMOVE</button>
            </div>
        `;
    }).join('');
}

// ==================== SIDEBAR / MODAL FUNCTIONS ====================

function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.add('open');
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items from GPU or Laptops page.");
        return;
    }
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('active');
    closeCart();
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
    const nameInput = document.getElementById('customer-name');
    const addressInput = document.getElementById('customer-address');
    if (nameInput) nameInput.value = '';
    if (addressInput) addressInput.value = '';
}

function scrollToTop() {
    const track = document.querySelector('.track');
    if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

// ==================== ORDER SUBMISSION ====================

async function submitOrder() {
    const customerName = document.getElementById('customer-name')?.value?.trim() || '';
    const customerAddress = document.getElementById('customer-address')?.value?.trim() || '';
    const totalAmount = parseFloat(document.getElementById('cart-total')?.innerText?.replace(/,/g, '') || '0');

    if (!customerName || !customerAddress) {
        alert("Please fill in your name and shipping address.");
        return;
    }

    const orderPayload = {
        customerName: customerName,
        address: customerAddress,
        items: cart.map(item => ({
            name: item.fullName || item.name,
            price: item.price,
            quantity: item.quantity || 1,
            type: item.type,
            gpu: item.gpu || null,
            specs: item.specs || null
        })),
        totalAmount: totalAmount,
        source: window.location.pathname || 'unknown-page'
    };

    try {
        // ✅ CHANGED: Replaced hardcoded localhost URL with a relative path
        // Netlify's rewrite rules will transparently map this to your serverless Python code
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
            alert(`✅ Order placed successfully!\n\nOrder ID: ${data.orderId}\nTotal: $${totalAmount.toLocaleString()}\n\nThank you for shopping with KNA Computers!`);
            clearCart();
            closeCheckout();
        } else {
            alert("❌ Order failed: " + (data.detail || "Unknown error"));
        }
    } catch (error) {
        console.error('Order error:', error);
        // ✅ CHANGED: Cleaned up the error text to be generic and server-appropriate 
        alert("⚠️ Could not connect to the checkout server.\n\nPlease check your internet connection or try again in a few moments.\n\nYour cart is saved locally.");
    }
}
// ==================== PRODUCT LOADING (Page-specific) ====================

function loadProducts() {
    const track = document.getElementById('product-track');
    if (!track) return;

    // Determine which product set to load based on page content or URL
    const isGpuPage = window.location.pathname.includes('gpu') ||
        document.body.innerHTML.includes('GRAPHICS CARDS') ||
        document.querySelector('.hero__badge')?.innerText === 'GPU SHOP';

    const isLaptopPage = window.location.pathname.includes('laptop') ||
        document.body.innerHTML.includes('LAPTOPS');

    let productsToLoad = [];
    let productType = '';

    if (isGpuPage) {
        productsToLoad = gpuProducts;
        productType = 'gpu';
    } else if (isLaptopPage) {
        productsToLoad = laptopProducts;
        productType = 'laptop';
    } else {
        // Index page - don't load products (no product track)
        return;
    }

    track.innerHTML = productsToLoad.map((product, idx) => {
        // Build specs HTML based on product type
        let specsHtml = '';
        if (productType === 'gpu') {
            specsHtml = `<div class="details__specs">${product.specs}</div>`;
        } else if (productType === 'laptop') {
            specsHtml = `<div class="details__specs">${product.gpu} · ${product.vram} · ${product.cpu} · ${product.display}</div>`;
        }

        return `
            <article class="panel">
                <div class="panel__bg">
                    <img src="${product.img}" alt="${product.fullName}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'">
                </div>
                <div class="panel__index">${String(idx + 1).padStart(2, '0')}</div>
                <div class="spine">${product.name}</div>
                <div class="details">
                    <div class="details__category">${product.category}${productType === 'laptop' ? ' · DEDICATED GPU' : ''}</div>
                    <div class="details__title">${product.fullName}</div>
                    <div class="details__price">$${product.price.toLocaleString()}</div>
                    ${specsHtml}
                    <button class="btn-add-cart" onclick="window.addToCart(${product.id})">
                        ADD TO CART →
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

// ==================== EVENT LISTENERS ====================

// Close cart when clicking outside
document.addEventListener('click', function (event) {
    const cartElem = document.getElementById('cart-sidebar');
    const cartBtn = event.target.closest('.cart-toggle-btn');
    const cartContent = event.target.closest('.cart-sidebar');
    const navCart = event.target.closest('.nav a');

    if (cartElem && cartElem.classList.contains('open') && !cartBtn && !cartContent && (!navCart || !navCart.innerText.includes('CART'))) {
        closeCart();
    }
});

// Sync cart across tabs/pages
window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
        try {
            cart = JSON.parse(event.newValue);
            updateCartUI();
        } catch (e) { }
    }
});

// Save cart before page unload
window.addEventListener('beforeunload', () => {
    persistCart();
});

// ==================== INITIALIZATION ====================

// Make key functions globally available
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.submitOrder = submitOrder;
window.scrollToTop = scrollToTop;

// Initialize
loadCartFromStorage();
loadProducts();
