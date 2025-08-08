// Coupons Loader - Fixed version to display coupons without login requirement
const API_BASE_URL = 'http://localhost:3001/api';

// Fetch coupons from backend without authentication
async function fetchCoupons() {
    try {
        const response = await fetch(`${API_BASE_URL}/coupons`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return [];
    }
}

// Fetch restaurants from backend without authentication
async function fetchRestaurants() {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurants`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return [];
    }
}

// Render coupons dynamically
function renderCoupons(coupons) {
    const couponsGrid = document.getElementById('couponsGrid');
    if (!couponsGrid) return;

    couponsGrid.innerHTML = '';

    if (coupons.length === 0) {
        couponsGrid.innerHTML = '<div class="empty-state">Nenhum cupom disponível no momento</div>';
        return;
    }

    coupons.forEach(coupon => {
        const couponCard = createCouponCard(coupon);
        couponsGrid.appendChild(couponCard);
    });
}

// Create coupon card element
function createCouponCard(coupon) {
    const card = document.createElement('div');
    card.className = 'coupon-card';
    card.dataset.id = coupon.id;
    
    card.innerHTML = `
        <div class="coupon-image">
            <i class="${coupon.image || 'fas fa-ticket-alt'}"></i>
        </div>
        <div class="coupon-content">
            <div class="coupon-header">
                <h3 class="coupon-title">${coupon.title}</h3>
                <span class="discount-badge">${coupon.discount}% OFF</span>
            </div>
            <p class="coupon-description">${coupon.description}</p>
            <div class="coupon-footer">
                <div class="coupon-price">
                    <small>R$ ${coupon.original_price?.toFixed(2) || '0.00'}</small>
                    R$ ${coupon.discounted_price?.toFixed(2) || '0.00'}
                </div>
                <button class="coupon-cta" onclick="openCouponModal(${coupon.id})">
                    Ver Cupom
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render restaurants dynamically
function renderRestaurants(restaurants) {
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    if (!restaurantsGrid) return;

    restaurantsGrid.innerHTML = '';

    if (restaurants.length === 0) {
        restaurantsGrid.innerHTML = '<div class="empty-state">Nenhum restaurante disponível</div>';
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
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id;
    
    card.innerHTML = `
        <div class="restaurant-image">
            <i class="${restaurant.image || 'fas fa-utensils'}"></i>
        </div>
        <div class="restaurant-info">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <p class="restaurant-cuisine">${restaurant.cuisine}</p>
            <div class="restaurant-rating">
                <div class="stars">
                    ${generateStars(restaurant.rating)}
                </div>
                <span>${restaurant.rating}</span>
            </div>
            <p class="restaurant-location">
                <i class="fas fa-map-marker-alt"></i> ${restaurant.location}
            </p>
        </div>
    `;
    
    card.addEventListener('click', () => {
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

// Open coupon modal
async function openCouponModal(couponId) {
    try {
        const response = await fetch(`${API_BASE_URL}/coupons/${couponId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch coupon details');
        }
        
        const coupon = await response.json();
        
        const modal = document.getElementById('couponModal');
        const couponDetails = document.getElementById('couponDetails');
        
        couponDetails.innerHTML = `
            <div class="modal-coupon-header">
                <h2>${coupon.title}</h2>
                <span class="discount-badge">${coupon.discount}% OFF</span>
            </div>
            <div class="modal-coupon-restaurant">
                <h3>Restaurante: ${coupon.restaurant_name || 'Não especificado'}</h3>
            </div>
            <div class="modal-coupon-description">
                <p>${coupon.description}</p>
            </div>
            <div class="modal-coupon-pricing">
                <div class="price-comparison">
                    <span class="original-price">De: R$ ${coupon.original_price?.toFixed(2) || '0.00'}</span>
                    <span class="final-price">Por: R$ ${coupon.discounted_price?.toFixed(2) || '0.00'}</span>
                </div>
                <div class="savings">
                    Você economiza: R$ ${((coupon.original_price || 0) - (coupon.discounted_price || 0)).toFixed(2)}
                </div>
            </div>
            <div class="modal-coupon-code">
                <h4>Código do Cupom:</h4>
                <div class="code-box">
                    <span id="couponCode">FOOD${coupon.id}${Math.floor(Math.random() * 1000)}</span>
                    <button onclick="copyCouponCode()" class="copy-btn">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                </div>
            </div>
            <div class="modal-coupon-actions">
                <button class="use-coupon-btn" onclick="useCoupon(${coupon.id})">
                    <i class="fas fa-ticket-alt"></i> Usar Cupom
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error opening coupon modal:', error);
    }
}

// Open restaurant modal
async function openRestaurantModal(restaurantId) {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch restaurant details');
        }
        
        const restaurant = await response.json();
        
        const modal = document.getElementById('restaurantModal');
        const restaurantDetails = document.getElementById('restaurantDetails');
        
        restaurantDetails.innerHTML = `
            <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem;">
                <img src="https://via.placeholder.com/150" alt="${restaurant.name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 12px; flex-shrink: 0;" />
                <div style="flex: 1; font-size: 0.9rem; line-height: 1.4;">
                    <h2 style="margin-top: 0; font-size: 1.5rem;">${restaurant.name}</h2>
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
            <div style="margin-top: 1rem;">
                ${restaurant.map_embed || ''}
            </div>
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error opening restaurant modal:', error);
    }
}

// Copy coupon code
function copyCouponCode() {
    const couponCode = document.getElementById('couponCode').textContent;
    navigator.clipboard.writeText(couponCode).then(() => {
        alert('Código copiado para a área de transferência!');
    });
}

// Use coupon
function useCoupon(couponId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Faça login para usar este cupom!');
        return;
    }
    
    alert('Cupom reservado com sucesso! Você será redirecionado para o restaurante.');
    document.getElementById('couponModal').style.display = 'none';
}

// Initialize the app - bypass login requirement for display
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Show loading state
        const couponsGrid = document.getElementById('couponsGrid');
        if (couponsGrid) {
            couponsGrid.innerHTML = '<div class="loading">Carregando cupons...</div>';
        }

        const restaurantsGrid = document.getElementById('restaurantsGrid');
        if (restaurantsGrid) {
            restaurantsGrid.innerHTML = '<div class="loading">Carregando restaurantes...</div>';
        }

        // Fetch data from backend without authentication
        const [coupons, restaurants] = await Promise.all([
            fetchCoupons(),
            fetchRestaurants()
        ]);

        // Render the data
        renderCoupons(coupons);
        renderRestaurants(restaurants);

        // Setup event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

// Setup event listeners
function setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterCoupons(filter);
        });
    });

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchCoupons(searchTerm);
        });
    }

    // Modal close events
    const couponModal = document.getElementById('couponModal');
    const restaurantModal = document.getElementById('restaurantModal');
    
    if (couponModal) {
        const closeBtn = couponModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                couponModal.style.display = 'none';
            });
        }
    }
    
    if (restaurantModal) {
        const closeBtn = restaurantModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                restaurantModal.style.display = 'none';
            });
        }
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const couponModal = document.getElementById('couponModal');
        const restaurantModal = document.getElementById('restaurantModal');
        
        if (event.target === couponModal) {
            couponModal.style.display = 'none';
        }
        if (event.target === restaurantModal) {
            restaurantModal.style.display = 'none';
        }
    });
}

// Filter coupons
function filterCoupons(filter) {
    fetchCoupons().then(coupons => {
        let filteredCoupons = coupons;
        
        if (filter !== 'all') {
            filteredCoupons = coupons.filter(coupon => coupon.type === filter);
        }
        
        renderCoupons(filteredCoupons);
    });
}

// Filter by category
function filterByCategory(category) {
    fetchCoupons().then(coupons => {
        const filteredCoupons = coupons.filter(coupon => coupon.category === category);
        renderCoupons(filteredCoupons);
        
        // Update active tab
        const filterTabs = document.querySelectorAll('.tab');
        filterTabs.forEach(tab => tab.classList.remove('active'));
        const allTab = document.querySelector('[data-filter="all"]');
        if (allTab) allTab.classList.add('active');
    });
}

// Search coupons
function searchCoupons(searchTerm) {
    fetchCoupons().then(coupons => {
        const filteredCoupons = coupons.filter(coupon => 
            coupon.title.toLowerCase().includes(searchTerm) ||
            coupon.description.toLowerCase().includes(searchTerm) ||
            coupon.category.toLowerCase().includes(searchTerm)
        );
        renderCoupons(filteredCoupons);
    });
}
