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

// Helper function to transform coupon data from API to frontend format
function transformCouponFromApi(c) {
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
        discount: discountText,
        originalPrice: c.original_price,
        discountedPrice: c.discounted_price,
        category: c.category,
        type: c.type,
        image: c.image,
        code: c.code,
        valid_from: c.valid_from,
        valid_to: c.valid_to,
        min_order_value: c.min_order_value,
        usage_limit: c.usage_limit
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

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    // We can still get the token to use for authenticated actions if needed,
    // but we won't block the page load if it's not present.
    const token = localStorage.getItem('token');

    try {
        // Fetch restaurants from backend
        const resRestaurants = await fetch('/api/restaurants', {
            // No authorization needed to view public restaurant list
        });
        if (!resRestaurants.ok) throw new Error('Falha ao carregar restaurantes');
        const restaurants = await resRestaurants.json();
        // Sobrescreve os dados estáticos com os dados do backend
        restaurantsData.splice(0, restaurantsData.length, ...restaurants);

        // Fetch coupons from backend
        const resCoupons = await fetch('/api/coupons', {
            // No authorization needed to view public coupon list
        });
        if (!resCoupons.ok) throw new Error('Falha ao carregar cupons');
        const couponsFromApi = await resCoupons.json();

        const transformedCoupons = couponsFromApi.map(transformCouponFromApi);
        // Sobrescreve os dados estáticos com os dados do backend
        couponsData.splice(0, couponsData.length, ...transformedCoupons);

        // Renderiza usando os dados atualizados
        renderCoupons(couponsData);
        renderRestaurants(restaurantsData);
        setupEventListeners();
        initNavigation();

        populateRestaurantDropdown();

        checkAdminAccess();
        
        // Ensure "All" filter is active by default
        const allTab = document.querySelector('[data-filter="all"]');

        if (allTab) {
            allTab.classList.add('active');
            filterCoupons('all');

        }
        } catch (error) {
        console.error('Erro ao carregar dados:', error);
        const couponsGrid = document.getElementById('couponsGrid');
        if (couponsGrid) {
            couponsGrid.innerHTML = '<p style="text-align: center; color: red;">Não foi possível carregar os cupons. Verifique a conexão com o servidor.</p>';
        }
    }
});

// Popula o dropdown de restaurantes no formulário de cupons
function populateRestaurantDropdown() {
    const select = document.getElementById('couponRestaurantId');
    if (!select) return; // Só executa se o elemento existir na página

    // Limpa opções existentes e adiciona a padrão
    select.innerHTML = '<option value="">Selecione um Restaurante</option>';

    restaurantsData.forEach(restaurant => {
        const option = document.createElement('option');
        option.value = restaurant.id;
        option.textContent = restaurant.name;
        select.appendChild(option);
    });
}

// Render restaurants
function renderRestaurants(restaurants) {
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    restaurantsGrid.innerHTML = '';

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.dataset.id = restaurant.id;

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

        card.addEventListener('click', () => {
            openRestaurantModal(restaurant.id);
        });

        restaurantsGrid.appendChild(card);
    });
}

function checkAdminAccess() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const adminBtn = document.getElementById('adminBtn');
    const adminSection = document.getElementById('adminRestaurantRegistration');
    
    if (loggedInUser && loggedInUser.role === 'admin') {
        adminBtn.style.display = 'inline-block';
        adminSection.style.display = 'block';
        
        // Add click event to admin button to redirect to admin.html
        adminBtn.addEventListener('click', () => {
            window.location.href = 'admin.html';
        });
    } else {
        adminBtn.style.display = 'none';
        if (adminSection) {
            adminSection.style.display = 'none';
        }
    }
}

// Handle restaurant registration form submission
const restaurantRegistrationForm = document.getElementById('restaurantRegistrationForm');
if (restaurantRegistrationForm) {
    restaurantRegistrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const messageDiv = document.getElementById('restaurantRegistrationMessage');
        messageDiv.textContent = '';

        const token = localStorage.getItem('token');
        if (!token) {
            messageDiv.textContent = 'Usuário não autenticado.';
            messageDiv.style.color = 'red';
            return;
        }

        const newRestaurant = {
            name: this.restaurantName.value.trim(),
            cuisine: this.restaurantCuisine.value.trim(),
            rating: parseFloat(this.restaurantRating.value),
            location: this.restaurantLocation.value.trim(),
            image: this.restaurantImage.value.trim(),
            hours: this.restaurantHours.value.trim(),
            description: this.restaurantDescription.value.trim(),
            whatsapp: this.restaurantWhatsapp.value.trim(),
            map_embed: this.restaurantMapEmbed.value.trim()
        };

        // Basic validation
        if (!newRestaurant.name || !newRestaurant.cuisine || isNaN(newRestaurant.rating) || !newRestaurant.location) {
            messageDiv.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
            messageDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newRestaurant)
            });

            if (!response.ok) {
                const errorData = await response.json();
                messageDiv.textContent = errorData.message || 'Erro ao cadastrar restaurante.';
                messageDiv.style.color = 'red';
                return;
            }

            const createdRestaurant = await response.json();

            // Update restaurant list with the new data
            restaurantsData.push(createdRestaurant);
            renderRestaurants(restaurantsData); // Re-render with the updated list
            populateRestaurantDropdown(); // Atualiza a lista de restaurantes no formulário de cupons

            messageDiv.textContent = 'Restaurante cadastrado com sucesso!';
            messageDiv.style.color = 'green';
            console.log('Restaurante cadastrado com sucesso!');
            this.reset();
        } catch (error) {
            messageDiv.textContent = 'Erro ao conectar com o servidor.';
            messageDiv.style.color = 'red';
        }
    });
}

// Handle coupon registration form submission
const couponRegistrationForm = document.getElementById('couponRegistrationForm');
if (couponRegistrationForm) {
    couponRegistrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const messageDiv = document.getElementById('couponRegistrationMessage');
        messageDiv.textContent = '';

        const token = localStorage.getItem('token');
        if (!token) {
            messageDiv.textContent = 'Usuário não autenticado.';
            messageDiv.style.color = 'red';
            return;
        }

        const newCoupon = {
            title: this.couponTitle.value.trim(),
            description: this.couponDescription.value.trim(),
            discount: parseFloat(this.couponDiscount.value),
            original_price: parseFloat(this.couponOriginalPrice.value),
            category: this.couponCategory.value.trim(),
            type: this.couponType.value.trim(),
            image: this.couponImage.value.trim(),
            restaurant_id: parseInt(this.couponRestaurantId.value)
        };

        // Validação básica
        if (!newCoupon.title || !newCoupon.restaurant_id || isNaN(newCoupon.discount) || isNaN(newCoupon.original_price)) {
            messageDiv.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
            messageDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newCoupon)
            });

            if (!response.ok) {
                const errorData = await response.json();
                messageDiv.textContent = errorData.message || 'Erro ao cadastrar cupom.';
                messageDiv.style.color = 'red';
                return;
            }

            const createdCoupon = await response.json();

            // Transforma o cupom criado para o formato do frontend
            const transformedCoupon = {
                id: createdCoupon.id,
                title: createdCoupon.title,
                restaurant: createdCoupon.restaurant_name || 'Restaurante',
                description: createdCoupon.description,
                discount: `${createdCoupon.discount}%`,
                originalPrice: createdCoupon.original_price,
                discountedPrice: createdCoupon.discounted_price,
                category: createdCoupon.category,
                type: createdCoupon.type,
                image: createdCoupon.image
            };

            couponsData.push(transformedCoupon);
            renderCoupons(couponsData); // Re-renderiza a lista com o novo cupom

            messageDiv.textContent = 'Cupom cadastrado com sucesso!';
            messageDiv.style.color = 'green';
            this.reset();
        } catch (error) {
            messageDiv.textContent = 'Erro ao conectar com o servidor.';
            messageDiv.style.color = 'red';
        }
    });
}

// Render coupons
function renderCoupons(coupons) {
    if (!couponsGrid) return;
    couponsGrid.innerHTML = '';

    if (coupons.length === 0) {
        couponsGrid.innerHTML = '<p class="empty-state">Nenhum cupom encontrado.</p>';
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

    const isLoggedIn = !!localStorage.getItem('token');

    const hasPrice = coupon.originalPrice != null && coupon.discountedPrice != null;
    const priceHTML = hasPrice
        ? `
        <div class="coupon-price">
            <small>R$ ${Number(coupon.originalPrice).toFixed(2)}</small>
            R$ ${Number(coupon.discountedPrice).toFixed(2)}
        </div>`
        : '';

    const buttonHTML = isLoggedIn
        ? `<button class="coupon-cta" onclick="openCouponModal(${coupon.id})">Ver Cupom</button>`
        : `<button class="coupon-cta" onclick="window.location.href='login.html'">Faça Login para Ver</button>`;

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
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id;  // Add data-id attribute for identification
    
    card.style.cursor = 'pointer'; // Indicate clickable
    card.style.userSelect = 'none'; // Prevent text selection
    
    card.innerHTML = `
        <div class="restaurant-image">
            ${createImageDisplay(restaurant.image, 'fas fa-utensils')}
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
        event.preventDefault();
        let card = event.target;
        
        // Find the closest restaurant card
        while (card && !card.classList.contains('restaurant-card')) {
            card = card.parentElement;
        }
        
        if (card && card.dataset.id) {
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
function openCouponModal(couponId) {
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const coupon = couponsData.find(c => c.id === couponId);
    
    if (coupon) {
        const hasPrice = coupon.originalPrice != null && coupon.discountedPrice != null;
        const pricingHTML = hasPrice
            ? `
            <div class="modal-coupon-pricing">
                <div class="price-comparison">
                    <span class="original-price">De: R$ ${Number(coupon.originalPrice).toFixed(2)}</span>
                    <span class="final-price">Por: R$ ${Number(coupon.discountedPrice).toFixed(2)}</span>
                </div>
                <div class="savings">
                    Você economiza: R$ ${(Number(coupon.originalPrice) - Number(coupon.discountedPrice)).toFixed(2)}
                </div>
            </div>`
            : '';

        couponDetails.innerHTML = `
            <div class="modal-coupon-header">
                <h2>${coupon.title}</h2>
                <span class="discount-badge">${coupon.discount || ''}</span>
            </div>
            <div class="modal-coupon-restaurant">
                <h3>${coupon.restaurant}</h3>
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
        
        modal.style.display = 'block';
    }
}

// Open restaurant modal
function openRestaurantModal(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);
    const restaurantModal = document.getElementById('restaurantModal');
    const restaurantDetails = document.getElementById('restaurantDetails');

    if (restaurant) {
        const imageSrc = (restaurant.image && (restaurant.image.startsWith('http') || restaurant.image.startsWith('data:image')))
            ? restaurant.image
            : 'https://via.placeholder.com/150'; // Fallback for old data or icon classes

        restaurantDetails.innerHTML = `
            <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem;">
                <img src="${imageSrc}" alt="${restaurant.name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 12px; flex-shrink: 0;" />
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

// Helper function to create image/icon element
function createImageDisplay(image, defaultIconClass) {
    if (image && (image.startsWith('http') || image.startsWith('data:image'))) {
        // It's a URL or base64 string, use an <img> tag
        return `<img src="${image}" alt="Imagem do item" class="card-entity-image">`;
    }
    // It's likely a FontAwesome class or empty, use an <i> tag
    return `<i class="${image || defaultIconClass}"></i>`;
}

// Render restaurants
function renderRestaurants(restaurants) {
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    restaurantsGrid.innerHTML = '';

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.dataset.id = restaurant.id;

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

        card.addEventListener('click', () => {
            openRestaurantModal(restaurant.id);
        });

        restaurantsGrid.appendChild(card);
    });
}

// Create restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id;  // Add data-id attribute for identification
    
    card.style.cursor = 'pointer'; // Indicate clickable
    card.style.userSelect = 'none'; // Prevent text selection
    
    card.innerHTML = `
        <div class="restaurant-image">
            ${createImageDisplay(restaurant.image, 'fas fa-utensils')}
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
    
    // Add direct click handler to ensure it works
    card.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openRestaurantModal(restaurant.id);
    });
    
    return card;
}

// Open restaurant modal
function openRestaurantModal(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);
    const restaurantModal = document.getElementById('restaurantModal');
    const restaurantDetails = document.getElementById('restaurantDetails');

    if (restaurant) {
        const imageSrc = (restaurant.image && (restaurant.image.startsWith('http') || restaurant.image.startsWith('data:image')))
            ? restaurant.image
            : 'https://via.placeholder.com/150'; // Fallback for old data or icon classes

        restaurantDetails.innerHTML = `
            <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem;">
                <img src="${imageSrc}" alt="${restaurant.name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 12px; flex-shrink: 0;" />
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
        slide.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://via.placeholder.com/1200x600/333/fff?text=${encodeURIComponent(restaurant.name)}')`;
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
        
        slideContent.innerHTML = `
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

        .modal-coupon-terms {
            margin-bottom: 2rem;
        }

        .modal-coupon-terms h4 {
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .modal-coupon-terms ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .modal-coupon-terms li {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: var(--text-light);
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
        slide.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://via.placeholder.com/1200x600/333/fff?text=${encodeURIComponent(restaurant.name)}')`;
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
        
        slideContent.innerHTML = `
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
    
    setInterval(() => {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
    }, 5000);
}
