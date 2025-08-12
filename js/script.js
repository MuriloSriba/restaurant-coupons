// Sample data for coupons and restaurants
let couponsData = [];
let restaurantsData = [];

// DOM Elements
const couponsGrid = document.getElementById('couponsGrid');
const restaurantsGrid = document.getElementById('restaurantsGrid');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.tab');
const categoryCards = document.querySelectorAll('.category-card');
const couponModal = document.getElementById('couponModal');
const restaurantModal = document.getElementById('restaurantModal');
const couponDetails = document.getElementById('couponDetails');
const restaurantDetails = document.getElementById('restaurantDetails');
const restaurantMap = document.getElementById('restaurantMap');

const API_BASE_URL = window.location.origin + '/api';

// Authentication helper
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// Fetch coupons from backend
async function fetchCoupons() {
    try {
        const response = await fetch(`${API_BASE_URL}/coupons`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return [];
    }
}

// Fetch restaurants from backend
async function fetchRestaurants() {
    try {
        const url = `${API_BASE_URL}/restaurants`;
        console.log('Fetching restaurants from:', url);
        const response = await fetch(url, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return [];
    }
}

// Helper function to transform coupon data into a display-friendly format
function transformCoupon(c) {
    let discountText = '';
    if (c.discount_value) {
        if (c.discount_type === 'percentage') {
            discountText = `${c.discount_value}% OFF`;
        } else if (c.discount_type === 'fixed') {
            discountText = `R$ ${Number(c.discount_value).toFixed(2)} OFF`;
        } else {
            discountText = `${c.discount_value} OFF`; // Fallback
        }
    }

    return {
        id: c.id,
        title: c.title,
        restaurant: c.restaurant_name || 'Restaurante',
        description: c.description,
        discount: discountText, // Generated field
        originalPrice: c.original_price,
        discountedPrice: c.discounted_price,
        category: c.category,
        type: c.type,
        image: c.image,
        // Sensitive fields are not included here
    };
}

// Helper function to create image/icon element
function createImageDisplay(image, defaultIconClass) {
    if (image && (image.startsWith('http') || image.startsWith('data:image'))) {
        // It's a URL or base64 string, use an <img> tag
        return `<img src="${image}" alt="Imagem do item" class="card-entity-image">`;
    }
    // It's likely a FontAwesome class or empty, use an <i> tag
    return `<i class="${image || defaultIconClass}"></i>`;
}

// Render coupons
function renderCoupons(coupons) {
    if (!couponsGrid) return;
    couponsGrid.innerHTML = '';

    if (coupons.length === 0) {
        couponsGrid.innerHTML = '<p class="empty-state">Nenhum cupom encontrado.</p>';
        return;
    }
    
    // Transform data before rendering
    const transformedCoupons = coupons.map(transformCoupon);
    
    transformedCoupons.forEach(coupon => {
        const couponCard = createCouponCard(coupon);
        couponsGrid.appendChild(couponCard);
    });
}

// Create coupon card element
function createCouponCard(coupon) {
    const card = document.createElement('div');
    card.className = 'coupon-card';
    card.dataset.id = coupon.id;

    const isLoggedIn = !!localStorage.getItem('token');
    let loggedInUser = null; // Initialize to null

    try {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            loggedInUser = JSON.parse(storedUser);
        }
    } catch (e) {
        console.error("Error parsing loggedInUser from localStorage:", e);
        // Optionally clear invalid data
        localStorage.removeItem('loggedInUser');
    }

    const hasPrice = coupon.originalPrice != null && coupon.discountedPrice != null;
    const priceHTML = hasPrice
        ? `
        <div class="coupon-price">
            <small>R$ ${Number(coupon.originalPrice).toFixed(2)}</small>
            R$ ${Number(coupon.discountedPrice).toFixed(2)}
        </div>`
        : '';

    let buttonHTML = '';
    if (isLoggedIn) {
        if (loggedInUser && loggedInUser.role === 'admin') { // Admin user
            buttonHTML = `<button class="coupon-cta" onclick="openCouponModal(${coupon.id})">Ver Cupom</button>`; // Admin always sees "Ver Cupom"
        } else if (loggedInUser && loggedInUser.status === 'complete') { // Regular user, paid
            buttonHTML = `<button class="coupon-cta" onclick="openCouponModal(${coupon.id})">Ver Cupom</button>`;
        } else if (loggedInUser && loggedInUser.status === 'pending') { // Regular user, not paid
            buttonHTML = `<button class="coupon-cta coupon-cta-subscribe" onclick="window.location.href='payment.html'">Assine para Ver</button>`;
        } else { // Fallback for unexpected logged-in state (e.g., loggedInUser is null or status is something else)
            buttonHTML = `<button class="coupon-cta" onclick="window.location.href='login.html'">Faça Login para Ver</button>`;
        }
    } else { // Not logged in
        buttonHTML = `<button class="coupon-cta" onclick="window.location.href='login.html'">Faça Login para Ver</button>`;
    }

    card.innerHTML = `
        <div class="coupon-image">
            ${createImageDisplay(coupon.image, 'fas fa-tags')}
        </div>
        <div class="coupon-content">
            <div class="coupon-header">
                <h3 class="coupon-title">${coupon.title}</h3>
                <span class="discount-badge">${coupon.discount || ''}</span>
            </div>
            <p class="coupon-description">${coupon.description}</p>
            <div class="coupon-footer">
                ${priceHTML}
                ${buttonHTML}
            </div>
        </div>
    `;

    return card;
}

// Render restaurants
function renderRestaurants(restaurants) {
    if (!restaurantsGrid) return;
    restaurantsGrid.innerHTML = '';

    if (restaurants.length === 0) {
        restaurantsGrid.innerHTML = '<p class="empty-state">Nenhum restaurante encontrado.</p>';
        return;
    }
    restaurants.forEach(restaurant => {
        const restaurantCard = createRestaurantCard(restaurant);
        restaurantsGrid.appendChild(restaurantCard);
    });
}

// Create restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-item'; // Changed class name to avoid conflict with existing card styles
    card.dataset.id = restaurant.id;  // Add data-id attribute for identification
    
    card.style.cursor = 'pointer'; // Indicate clickable
    card.style.userSelect = 'none'; // Prevent text selection
    
    card.innerHTML = `
        <div class="restaurant-item-image">
            ${createImageDisplay(restaurant.image, 'fas fa-utensils')}
        </div>
        <div class="restaurant-item-info">
            <h3 class="restaurant-item-name">${restaurant.name}</h3>
            <p class="restaurant-item-cuisine">${restaurant.cuisine}</p>
            <div class="restaurant-item-rating">
                <div class="stars">
                    ${generateStars(restaurant.rating)}
                </div>
                <span>${restaurant.rating}</span>
            </div>
            <p class="restaurant-item-location">
                <i class="fas fa-map-marker-alt"></i> ${restaurant.location}
            </p>
        </div>
    `;
    
    // Add direct click handler to ensure it works
    card.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openRestaurantModal(restaurant.id);
    });
    
    return card;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Setup event listeners
function checkAdminAccess() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const adminBtn = document.getElementById('adminBtn');
    
    if (adminBtn) {
        if (loggedInUser && loggedInUser.role === 'admin') {
            adminBtn.style.display = 'inline-block';
        } else {
            adminBtn.style.display = 'none';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterCoupons(filter);
        });
    });
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Search functionality
    const searchButton = document.querySelector('.search-button');
    if (searchInput && searchButton) {
        const handleSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            performSearch(searchTerm);
        };

        searchButton.addEventListener('click', handleSearch);

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission if it's in a form
                handleSearch();
            }
        });
    }

    // Header search button functionality
    const headerSearchBtn = document.getElementById('searchBtn');
    if (headerSearchBtn && searchInput) {
        headerSearchBtn.addEventListener('click', () => {
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            searchInput.focus();
        });
    }

    // Modal close
    const closeModal = couponModal.querySelector('.close');
    if (closeModal) {
        closeModal.addEventListener('click', closeCouponModal);
    }
    window.addEventListener('click', function(event) {
        if (event.target === couponModal) {
            closeCouponModal();
        }
    });

    // Restaurant modal close
    const restaurantModalClose = restaurantModal.querySelector('.close');
    if (restaurantModalClose) {
        restaurantModalClose.addEventListener('click', closeRestaurantModal);
    }
    window.addEventListener('click', function(event) {
        if (event.target === restaurantModal) {
            closeRestaurantModal();
        }
    });

    // Add click event to restaurant cards to open modal
    const restaurantsGridElement = document.getElementById('restaurantsGrid');
    if (restaurantsGridElement) {
        restaurantsGridElement.addEventListener('click', (event) => {
            event.preventDefault();
            let card = event.target;
            
            // Find the closest restaurant card
            while (card && !card.classList.contains('restaurant-item')) {
                card = card.parentElement;
            }
            
            if (card && card.dataset.id) {
                const restaurantId = parseInt(card.dataset.id);
                openRestaurantModal(restaurantId);
            }
        });
    }

    // Admin button click event
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            window.location.href = 'admin.html';
        });
    }
}

// Filter coupons
function filterCoupons(filter) {
    let filteredCoupons = couponsData;
    
    if (filter !== 'all') {
        filteredCoupons = couponsData.filter(coupon => coupon.type === filter);
    }
    
    renderCoupons(filteredCoupons);
}

// Filter by category
function filterByCategory(category) {
    const filteredCoupons = couponsData.filter(coupon => coupon.category === category);
    renderCoupons(filteredCoupons);
    
    // Update active tab
    filterTabs.forEach(tab => tab.classList.remove('active'));
    const allTab = document.querySelector('[data-filter="all"]');
    if (allTab) allTab.classList.add('active');
}

// Search coupons
function performSearch(searchTerm) {
    // Filter coupons based on search term
    const filteredCoupons = couponsData.filter(coupon =>
        coupon.title.toLowerCase().includes(searchTerm) ||
        coupon.restaurant.toLowerCase().includes(searchTerm) ||
        coupon.description.toLowerCase().includes(searchTerm) ||
        coupon.category.toLowerCase().includes(searchTerm)
    );
    renderCoupons(filteredCoupons);

    // Filter restaurants based on search term
    const filteredRestaurants = restaurantsData.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm)
    );
    renderRestaurants(filteredRestaurants);
}

// Open coupon modal
async function openCouponModal(couponId) {
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    couponDetails.innerHTML = '<div class="loading">Carregando detalhes do cupom...</div>';
    couponModal.style.display = 'block';
    document.body.classList.add('modal-open');

    try {
        const response = await fetch(`${API_BASE_URL}/coupons/${couponId}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 403) {
                couponDetails.innerHTML = '<p class="error-message">Acesso negado. Você precisa estar logado para ver os detalhes do cupom.</p>';
            } else if (response.status === 404) {
                couponDetails.innerHTML = '<p class="error-message">Cupom não encontrado.</p>';
            } else {
                throw new Error(`Failed to fetch coupon details: ${response.statusText}`);
            }
            return;
        }

        const coupon = await response.json();

        // Transform the fetched coupon data for display
        let discountText = '';
        if (coupon.discount_value) {
            if (coupon.discount_type === 'percentage') {
                discountText = `${coupon.discount_value}% OFF`;
            } else if (coupon.discount_type === 'fixed') {
                discountText = `R$ ${Number(coupon.discount_value).toFixed(2)} OFF`;
            } else {
                discountText = `${coupon.discount_value} OFF`; // Fallback
            }
        }

        const hasPrice = coupon.original_price != null && coupon.discounted_price != null;
        const pricingHTML = hasPrice
            ?
            `
            <div class="modal-coupon-pricing">
                <div class="price-comparison">
                    <span class="original-price">De: R$ ${Number(coupon.original_price).toFixed(2)}</span>
                    <span class="final-price">Por: R$ ${Number(coupon.discounted_price).toFixed(2)}</span>
                </div>
                <div class="savings">
                    Você economiza: R$ ${(Number(coupon.original_price) - Number(coupon.discounted_price)).toFixed(2)}
                </div>
            </div>`
            : '';

        couponDetails.innerHTML =
            `
            <div class="modal-coupon-header">
                <h2>${coupon.title}</h2>
                <span class="discount-badge">${discountText || ''}</span>
            </div>
            <div class="modal-coupon-restaurant">
                <h3>${coupon.restaurant_name || 'Restaurante'}</h3>
            </div>
            <div class="modal-coupon-description">
                <p>${coupon.description}</p>
            </div>
            ${pricingHTML}
            <div class="modal-coupon-code">
                <h4>Código do Cupom:</h4>
                <div class="code-box">
                    <span id="couponCode">${coupon.code || 'N/A'}</span>
                    <button onclick="copyCouponCode()" class="copy-btn">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                </div>
            </div>
            <div class="modal-coupon-terms">
                <h4>Termos e Condições</h4>
                <ul>
                    <li><i class="fas fa-calendar-alt"></i><span>Válido de ${coupon.valid_from ? new Date(coupon.valid_from).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'N/A'} até ${coupon.valid_to ? new Date(coupon.valid_to).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'N/A'}</span></li>
                    ${coupon.min_order_value > 0 ? `<li><i class="fas fa-shopping-cart"></i><span>Pedido mínimo de R$ ${Number(coupon.min_order_value).toFixed(2)}</span></li>` : ''}
                    ${coupon.usage_limit ? `<li><i class="fas fa-users"></i><span>Limitado a ${coupon.usage_limit} usos.</span></li>` : ''}
                </ul>
            </div>
            <div class="modal-coupon-actions">
                <button class="use-coupon-btn" onclick="useCoupon(${coupon.id})">
                    <i class="fas fa-ticket-alt"></i> Usar Cupom
                </button>
            </div>
        `;
        
    } catch (error) {
        console.error('Error opening coupon modal:', error);
        couponDetails.innerHTML = '<p class="error-message">Erro ao carregar detalhes do cupom.</p>';
    }
}

// Open restaurant modal
function openRestaurantModal(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);

    if (restaurant) {
        const imageSrc = (restaurant.image && (restaurant.image.startsWith('http') || restaurant.image.startsWith('data:image')))
            ? restaurant.image
            : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\' viewBox=\'0 0 150 150\'%3E%3Crect width=\'150\' height=\'150\' fill=\'%23ccc\'%3E%3C/rect%3E%3Ctext x=\'50%\' y=\'50%\' font-family=\'sans-serif\' font-size=\'50\' fill=\'%23fff\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E${encodeURIComponent(restaurant.name)}%3C/text%3E%3C/svg%3E'; // Fallback for old data or icon classes

        restaurantDetails.innerHTML = `
            <div class="modal-restaurant-content">
                <img src="${imageSrc}" alt="${restaurant.name}" class="modal-restaurant-image"/>
                <div class="modal-restaurant-info">
                    <h2 class="modal-restaurant-name">${restaurant.name}</h2>
                    <p><strong>Culinária:</strong> ${restaurant.cuisine}</p>
                    <p><strong>Horário de Funcionamento:</strong> ${restaurant.hours}</p>
                    <p><strong>Descrição:</strong> ${restaurant.description}</p>
                    <p><strong>Localização:</strong> ${restaurant.location}</p>
                    <p style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 1rem;">
                        <strong>Avaliação:</strong> ${restaurant.rating} / 5
                        <span style="color: #FFD700; font-size: 1.1rem;">
                            ${generateStars(restaurant.rating)}
                        </span>
                    </p>
                    <p><a href="https://wa.me/${restaurant.whatsapp}" target="_blank" style="color: #25D366; font-size: 1.3rem;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a></p>
                </div>
            </div>
        `;

        restaurantMap.innerHTML = restaurant.map_embed;

        // Add animation to rating stars
        const starsSpan = restaurantDetails.querySelector('span');
        if (starsSpan) {
            starsSpan.style.animation = 'pulse 2s infinite';
        }

        restaurantModal.style.display = 'block';
        document.body.classList.add('modal-open'); // Add class to body
    }
}

// Close coupon modal
function closeCouponModal() {
    couponModal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Remove class from body
}

// Close restaurant modal
function closeRestaurantModal() {
    restaurantModal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Remove class from body
}

// Copy coupon code
function copyCouponCode() {
    const couponCode = document.getElementById('couponCode').textContent;
    navigator.clipboard.writeText(couponCode).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
}

// Use coupon
function useCoupon(couponId) {
    alert('Cupom reservado com sucesso! Você será redirecionado para o restaurante.');
    closeCouponModal();
}

// Function to render top rated restaurants in slideshow
function renderTopRatedRestaurantsSlide() {
    const heroSlideshow = document.getElementById('heroSlideshow');
    if (!heroSlideshow) return;

    // Get top 3 rated restaurants
    const topRestaurants = [...restaurantsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    heroSlideshow.innerHTML = '';
    
    topRestaurants.forEach((restaurant, index) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23ccc'%3E%3C/rect%3E%3Ctext x='50%' y='50%' font-family='sans-serif' font-size='50' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(restaurant.name)}%3C/text%3E%3C/svg%3E")`;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.transition = 'opacity 1s ease-in-out';
        
        const slideContent = document.createElement('div');
        slideContent.className = 'hero-slide-content';
        slideContent.style.position = 'absolute';
        slideContent.style.top = '50%';
        slideContent.style.left = '50%';
        slideContent.style.transform = 'translate(-50%, -50%)';
        slideContent.style.textAlign = 'center';
        slideContent.style.color = 'white';
        
        slideContent.innerHTML =
            `
            <h2>${restaurant.name}</h2>
            <p>${restaurant.cuisine} • ${restaurant.rating} ⭐</p>
            <button class="hero-cta" onclick="openRestaurantModal(${restaurant.id})">
                Ver Detalhes
            </button>
        `;
        
        slide.appendChild(slideContent);
        heroSlideshow.appendChild(slide);
    });

    // Auto-rotate slides
    let currentSlide = 0;
    const slides = heroSlideshow.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) {
        return; // No slides to rotate, exit
    }

    setInterval(() => {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
    }, 5000);
}
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active state
                updateActiveNavLink(this);
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
    
    // Set initial active state
    updateActiveNavOnScroll();
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100; // Offset for header height
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Handle edge case - when at bottom of page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = sections[sections.length - 1].getAttribute('id');
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation
function showLoading() {
    if (couponsGrid) {
        couponsGrid.innerHTML = '<div class="loading">Carregando cupons...</div>';
    }
}

// Add to favorites functionality (bonus feature)
function toggleFavorite(couponId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(couponId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(couponId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderCoupons(couponsData);
}

// Check if coupon is favorite
function isFavorite(couponId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(couponId);
}

// Initialize the app
    document.addEventListener('DOMContentLoaded', () => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const loginBtn = document.getElementById('loginBtn');
        const userNameDisplay = document.querySelector('#userNameDisplay span'); // Select the span inside userNameDisplay
        const userProfileActions = document.querySelector('.user-profile-actions'); // New element
        const logoutBtn = document.getElementById('logoutBtn');
        const adminBtn = document.getElementById('adminBtn'); // Get the admin button
        const mobileLoginAdmin = document.getElementById('mobileLoginAdmin'); // Get the mobile login/admin button

        if (loggedInUser) {
            loginBtn.style.display = 'none';
            if (userProfileActions) { // Add null check for userProfileActions
                userProfileActions.style.display = 'flex'; // Show the new container
            }

            // Show full name if available, else email
            const fullName = loggedInUser.firstName && loggedInUser.lastName
                ? loggedInUser.firstName + ' ' + loggedInUser.lastName
                : loggedInUser.email;
            
            if (userNameDisplay) { // Add null check for userNameDisplay
                userNameDisplay.textContent = fullName;
            }

            // logoutBtn.style.display = 'inline-block'; // This is now handled by userProfileActions display

            // Update mobile login/admin button
            if (mobileLoginAdmin) {
                if (loggedInUser.role === 'admin') {
                    mobileLoginAdmin.href = 'admin.html';
                    mobileLoginAdmin.querySelector('i').className = 'fas fa-user-shield'; // Admin icon
                    mobileLoginAdmin.querySelector('span').textContent = 'Admin';
                } else {
                    mobileLoginAdmin.href = '#'; // Or a profile page
                    mobileLoginAdmin.querySelector('i').className = 'fas fa-user-circle'; // User icon
                    mobileLoginAdmin.querySelector('span').textContent = 'Perfil';
                }
            }

            // Show admin button in header if user is admin
            if (loggedInUser.role === 'admin') {
                adminBtn.style.display = 'inline-block';
            }

            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
        } else {
            loginBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
            // Ensure mobile login/admin button is set to login if not logged in
            if (mobileLoginAdmin) {
                mobileLoginAdmin.href = 'login.html';
                mobileLoginAdmin.querySelector('i').className = 'fas fa-user';
                mobileLoginAdmin.querySelector('span').textContent = 'Entrar';
            }
        }

    // Initial data load and rendering
    showLoading();
    Promise.all([
        fetchCoupons(),
        fetchRestaurants()
    ]).then(([coupons, restaurants]) => {
        couponsData = coupons;
        restaurantsData = restaurants;
        renderCoupons(couponsData);
        renderRestaurants(restaurantsData);
        renderTopRatedRestaurantsSlide();
        setupEventListeners();
        checkAdminAccess();
        initNavigation();
    }).catch(error => {
        console.error('Error loading initial data:', error);
        if (couponsGrid) {
            couponsGrid.innerHTML = '<p class="error-message">Erro ao carregar dados. Tente novamente mais tarde.</p>';
        }
        if (restaurantsGrid) {
            restaurantsGrid.innerHTML = '<p class="error-message">Erro ao carregar dados. Tente novamente mais tarde.</p>';
        }
    });
});