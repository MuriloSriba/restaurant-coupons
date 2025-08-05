// Sample data for coupons and restaurants
const couponsData = [
    {
        id: 1,
        title: "Churrasco Premium - 40% OFF",
        restaurant: "Fogo de Chão",
        description: "Desconto imperdível no melhor churrasco da cidade! Inclui buffet completo e sobremesa.",
        discount: "40%",
        originalPrice: 89.90,
        discountedPrice: 53.94,
        category: "churrasco",
        type: "popular",
        image: "fas fa-fire"
    },
    {
        id: 2,
        title: "Sushi All You Can Eat",
        restaurant: "Sushi Bar",
        description: "Coma à vontade os melhores sushis e sashimis com 30% de desconto!",
        discount: "30%",
        originalPrice: 79.90,
        discountedPrice: 55.93,
        category: "japones",
        type: "new",
        image: "fas fa-fish"
    },
    {
        id: 3,
        title: "Pizza Família + Refrigerante",
        restaurant: "Pizza Hut",
        description: "Pizza grande de até 2 sabores + refrigerante 2L. Perfeito para compartilhar!",
        discount: "25%",
        originalPrice: 59.90,
        discountedPrice: 44.93,
        category: "italiano",
        type: "popular",
        image: "fas fa-pizza-slice"
    },
    {
        id: 4,
        title: "Feijoada Completa",
        restaurant: "Casa da Feijoada",
        description: "Feijoada tradicional com todos os acompanhamentos. Sabor brasileiro autêntico!",
        discount: "35%",
        originalPrice: 49.90,
        discountedPrice: 32.44,
        category: "brasileiro",
        type: "expiring",
        image: "fas fa-drumstick-bite"
    },
    {
        id: 5,
        title: "Menu Vegano Especial",
        restaurant: "Green Food",
        description: "Menu completo vegano com entrada, prato principal e sobremesa. Saudável e delicioso!",
        discount: "20%",
        originalPrice: 45.90,
        discountedPrice: 36.72,
        category: "vegano",
        type: "new",
        image: "fas fa-seedling"
    },
    {
        id: 6,
        title: "Sobremesa Premium",
        restaurant: "Sweet Dreams",
        description: "Escolha 3 sobremesas do nosso menu especial. Perfeito para adoçar seu dia!",
        discount: "50%",
        originalPrice: 35.90,
        discountedPrice: 17.95,
        category: "sobremesas",
        type: "expiring",
        image: "fas fa-ice-cream"
    }
];

const restaurantsData = [
    {
        id: 1,
        name: "Fogo de Chão",
        cuisine: "Churrasco",
        rating: 4.8,
        location: "Centro",
        image: "fas fa-fire",
        hours: "Seg-Sex: 11h - 23h, Sáb-Dom: 12h - 00h",
        description: "Churrasco tradicional com cortes nobres e buffet completo.",
        whatsapp: "5511999999999",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.633309!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0x123456789abcdef!2sFogo%20de%20Ch%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1234567890' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    },
    {
        id: 2,
        name: "Sushi Bar",
        cuisine: "Japonês",
        rating: 4.6,
        location: "Jardins",
        image: "fas fa-fish",
        hours: "Ter-Dom: 12h - 22h",
        description: "Sushis e sashimis frescos com ingredientes selecionados.",
        whatsapp: "5511988888888",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.987654321!2d-46.650000!3d-23.560000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c987654321%3A0xabcdef123456789!2sSushi%20Bar!5e0!3m2!1spt-BR!2sbr!4v1234567891' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    },
    {
        id: 3,
        name: "Pizza Hut",
        cuisine: "Italiano",
        rating: 4.4,
        location: "Vila Mariana",
        image: "fas fa-pizza-slice",
        hours: "Seg-Dom: 11h - 23h",
        description: "Pizzas tradicionais e especiais com massa fina e crocante.",
        whatsapp: "5511977777777",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.640000!3d-23.570000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0xabcdefabcdef1234!2sPizza%20Hut!5e0!3m2!1spt-BR!2sbr!4v1234567892' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    },
    {
        id: 4,
        name: "Casa da Feijoada",
        cuisine: "Brasileiro",
        rating: 4.7,
        location: "Liberdade",
        image: "fas fa-drumstick-bite",
        hours: "Qua-Dom: 12h - 22h",
        description: "Feijoada completa com acompanhamentos tradicionais.",
        whatsapp: "5511966666666",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.630000!3d-23.580000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0xabcdefabcdef5678!2sCasa%20da%20Feijoada!5e0!3m2!1spt-BR!2sbr!4v1234567893' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    },
    {
        id: 5,
        name: "Green Food",
        cuisine: "Vegano",
        rating: 4.5,
        location: "Pinheiros",
        image: "fas fa-seedling",
        hours: "Seg-Sex: 11h - 21h",
        description: "Comida vegana saudável e saborosa com ingredientes orgânicos.",
        whatsapp: "5511955555555",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.620000!3d-23.590000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0xabcdefabcdef9012!2sGreen%20Food!5e0!3m2!1spt-BR!2sbr!4v1234567894' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    },
    {
        id: 6,
        name: "Sweet Dreams",
        cuisine: "Sobremesas",
        rating: 4.9,
        location: "Moema",
        image: "fas fa-ice-cream",
        hours: "Ter-Dom: 12h - 22h",
        description: "Sobremesas artesanais e especiais para adoçar seu dia.",
        whatsapp: "5511944444444",
        mapEmbed: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.610000!3d-23.600000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0xabcdefabcdef3456!2sSweet%20Dreams!5e0!3m2!1spt-BR!2sbr!4v1234567895' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
    }
];

// DOM Elements
const couponsGrid = document.getElementById('couponsGrid');
const restaurantsGrid = document.getElementById('restaurantsGrid');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.tab');
const categoryCards = document.querySelectorAll('.category-card');
const modal = document.getElementById('couponModal');
const closeModal = document.querySelector('.close');
const couponDetails = document.getElementById('couponDetails');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load restaurants from localStorage and merge with static data
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const allRestaurants = restaurantsData.concat(storedRestaurants);

    renderCoupons(couponsData);
    renderRestaurants(allRestaurants);
    renderTopRatedRestaurantsSlide();
    setupEventListeners();
    checkAdminAccess();
});

// Check if logged-in user is admin and show admin restaurant registration section
function checkAdminAccess() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const adminBtn = document.getElementById('adminBtn');
    
    if (loggedInUser && loggedInUser.role === 'admin') {
        adminBtn.style.display = 'inline-block';
        
        // Add click event to admin button to redirect to admin.html
        adminBtn.addEventListener('click', () => {
            window.location.href = 'admin.html';
        });
    } else {
        adminBtn.style.display = 'none';
    }
}

// Handle restaurant registration form submission
const restaurantRegistrationForm = document.getElementById('restaurantRegistrationForm');
restaurantRegistrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('restaurantRegistrationMessage');
    messageDiv.textContent = '';

    const newRestaurant = {
        id: Date.now(), // simple unique id
        name: this.restaurantName.value.trim(),
        cuisine: this.restaurantCuisine.value.trim(),
        rating: parseFloat(this.restaurantRating.value),
        location: this.restaurantLocation.value.trim(),
        image: this.restaurantImage.value.trim(),
        hours: this.restaurantHours.value.trim(),
        description: this.restaurantDescription.value.trim(),
        whatsapp: this.restaurantWhatsapp.value.trim(),
        mapEmbed: this.restaurantMapEmbed.value.trim()
    };

    // Basic validation
    if (!newRestaurant.name || !newRestaurant.cuisine || isNaN(newRestaurant.rating) || !newRestaurant.location) {
        messageDiv.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
        messageDiv.style.color = 'red';
        return;
    }

    // Save to localStorage or update restaurantsData
    let storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    storedRestaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(storedRestaurants));

    // Update restaurantsData and re-render
    restaurantsData.push(newRestaurant);
    renderRestaurants(restaurantsData);

    messageDiv.textContent = 'Restaurante cadastrado com sucesso!';
    messageDiv.style.color = 'green';
    this.reset();
});

// Render coupons
function renderCoupons(coupons) {
    couponsGrid.innerHTML = '';
    
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
            <i class="${coupon.image}"></i>
        </div>
        <div class="coupon-content">
            <div class="coupon-header">
                <h3 class="coupon-title">${coupon.title}</h3>
                <span class="discount-badge">${coupon.discount} OFF</span>
            </div>
            <p class="coupon-description">${coupon.description}</p>
            <div class="coupon-footer">
                <div class="coupon-price">
                    <small>R$ ${coupon.originalPrice.toFixed(2)}</small>
                    R$ ${coupon.discountedPrice.toFixed(2)}
                </div>
                <button class="coupon-cta" onclick="openCouponModal(${coupon.id})">
                    Ver Cupom
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render restaurants
function renderRestaurants(restaurants) {
    restaurantsGrid.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantCard = createRestaurantCard(restaurant);
        restaurantsGrid.appendChild(restaurantCard);
    });
}

// Create restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id;  // Add data-id attribute for identification
    
    card.style.cursor = 'pointer'; // Indicate clickable
    
    card.innerHTML = `
        <div class="restaurant-image">
            <i class="${restaurant.image}"></i>
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
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchCoupons(searchTerm);
    });
    
    // Modal close
    closeModal.addEventListener('click', closeCouponModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeCouponModal();
        }
    });

    // Restaurant modal close
    const restaurantModal = document.getElementById('restaurantModal');
    const restaurantModalClose = document.getElementById('restaurantModalClose');
    restaurantModalClose.addEventListener('click', () => {
        restaurantModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === restaurantModal) {
            restaurantModal.style.display = 'none';
        }
    });

    // Add click event to restaurant cards to open modal
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    restaurantsGrid.addEventListener('click', (event) => {
        let card = event.target;
        while (card && !card.classList.contains('restaurant-card')) {
            card = card.parentElement;
        }
        if (card) {
            const restaurantId = parseInt(card.dataset.id);
            openRestaurantModal(restaurantId);
        }
    });
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
    document.querySelector('[data-filter="all"]').classList.add('active');
}

// Search coupons
function searchCoupons(searchTerm) {
    const filteredCoupons = couponsData.filter(coupon => 
        coupon.title.toLowerCase().includes(searchTerm) ||
        coupon.restaurant.toLowerCase().includes(searchTerm) ||
        coupon.description.toLowerCase().includes(searchTerm) ||
        coupon.category.toLowerCase().includes(searchTerm)
    );
    
    renderCoupons(filteredCoupons);
}

// Open coupon modal
function openCouponModal(couponId) {
    const coupon = couponsData.find(c => c.id === couponId);
    
    if (coupon) {
        couponDetails.innerHTML = `
            <div class="modal-coupon-header">
                <h2>${coupon.title}</h2>
                <span class="discount-badge">${coupon.discount} OFF</span>
            </div>
            <div class="modal-coupon-restaurant">
                <h3>${coupon.restaurant}</h3>
            </div>
            <div class="modal-coupon-description">
                <p>${coupon.description}</p>
            </div>
            <div class="modal-coupon-pricing">
                <div class="price-comparison">
                    <span class="original-price">De: R$ ${coupon.originalPrice.toFixed(2)}</span>
                    <span class="final-price">Por: R$ ${coupon.discountedPrice.toFixed(2)}</span>
                </div>
                <div class="savings">
                    Você economiza: R$ ${(coupon.originalPrice - coupon.discountedPrice).toFixed(2)}
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
            <div class="modal-coupon-validity">
                <p><i class="fas fa-clock"></i> Válido até: ${getRandomDate()}</p>
            </div>
            <div class="modal-coupon-actions">
                <button class="use-coupon-btn" onclick="useCoupon(${coupon.id})">
                    <i class="fas fa-ticket-alt"></i> Usar Cupom
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Open restaurant modal
function openRestaurantModal(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);
    const restaurantModal = document.getElementById('restaurantModal');
    const restaurantDetails = document.getElementById('restaurantDetails');

    if (restaurant) {
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
                ${restaurant.mapEmbed}
            </div>
        `;

        // Add animation to rating stars
        const starsSpan = restaurantDetails.querySelector('span');
        if (starsSpan) {
            starsSpan.style.animation = 'pulse 2s infinite';
        }

        restaurantModal.style.display = 'block';
    }
}

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);

// Close coupon modal
function closeCouponModal() {
    modal.style.display = 'none';
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

// Generate random date for coupon validity
function getRandomDate() {
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + Math.floor(Math.random() * 30) + 7);
    
    return future.toLocaleDateString('pt-BR');
}

// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
});

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
    couponsGrid.innerHTML = '<div class="loading">Carregando cupons...</div>';
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

// Add CSS for modal styles
const modalStyles = `
    <style>
        .modal-coupon-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
        }
        
        .modal-coupon-header h2 {
            color: var(--text-dark);
            margin-bottom: 0.5rem;
        }
        
        .modal-coupon-restaurant h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .modal-coupon-description {
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .modal-coupon-pricing {
            background: var(--bg-light);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            margin-bottom: 2rem;
        }
        
        .price-comparison {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .original-price {
            color: var(--text-light);
            text-decoration: line-through;
        }
        
        .final-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .savings {
            color: var(--secondary-color);
            font-weight: 600;
        }
        
        .modal-coupon-code {
            margin-bottom: 2rem;
        }
        
        .code-box {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: var(--bg-light);
            padding: 1rem;
            border-radius: var(--border-radius);
            margin-top: 0.5rem;
        }
        
        .code-box span {
            font-family: monospace;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
            flex: 1;
        }
        
        .copy-btn {
            background: var(--primary-color);
            color: var(--white);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .copy-btn:hover {
            background: var(--secondary-color);
        }
        
        .modal-coupon-validity {
            color: var(--text-light);
            margin-bottom: 2rem;
        }
        
        .use-coupon-btn {
            width: 100%;
            background: var(--primary-color);
            color: var(--white);
            border: none;
            padding: 1rem;
            border-radius: var(--border-radius);
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .use-coupon-btn:hover {
            background: var(--secondary-color);
        }
        
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--text-light);
            font-size: 1.2rem;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);
