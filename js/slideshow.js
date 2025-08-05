// Automatic slideshow for top 3 restaurants with best ratings
class RestaurantSlideshow {
    constructor() {
        this.restaurants = [];
        this.currentSlide = 0;
        this.slideshowInterval = null;
        this.slideshowElement = document.getElementById('heroSlideshow');
        this.init();
    }

    init() {
        this.loadRestaurants();
        this.filterTopRated();
        this.createSlides();
        this.startSlideshow();
    }

    loadRestaurants() {
        // Load from localStorage and merge with static data
        const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
        const allRestaurants = restaurantsData.concat(storedRestaurants);
        this.restaurants = allRestaurants;
    }

    filterTopRated() {
        // Sort by rating and take top 3
        this.restaurants = this.restaurants
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
    }

    createSlides() {
        if (!this.slideshowElement) return;

        this.slideshowElement.innerHTML = '';
        
        // Use high-quality background images for each restaurant type
        const backgroundImages = {
            "Churrasco": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            "Japonês": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            "Italiano": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            "Brasileiro": "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            "Vegano": "https://images.unsplash.com/photo-1540189549336-a6f99aae9f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            "Sobremesas": "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        };
        
        this.restaurants.forEach((restaurant, index) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide';
            
            // Use cuisine-specific background image or default
            const bgImage = backgroundImages[restaurant.cuisine] || 
                           "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
            
            slide.style.backgroundImage = `url(${bgImage})`;
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = 'opacity 1.5s ease-in-out';
            
            // Add restaurant info overlay
            const infoOverlay = document.createElement('div');
            infoOverlay.className = 'restaurant-info-overlay';
            infoOverlay.style.cssText = `
                position: absolute;
                bottom: 30px;
                left: 30px;
                z-index: 2;
                color: white;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                background: rgba(0,0,0,0.4);
                padding: 15px 20px;
                border-radius: 8px;
                backdrop-filter: blur(5px);
            `;
            
            infoOverlay.innerHTML = `
                <h3 style="margin: 0 0 5px 0; font-size: 1.5rem; font-weight: 600;">${restaurant.name}</h3>
                <p style="margin: 0 0 5px 0; font-size: 1rem; opacity: 0.9;">${restaurant.cuisine}</p>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <span style="color: #FFD700;">★★★★★</span>
                    <span>${restaurant.rating}/5</span>
                    <span style="margin-left: 10px;">📍 ${restaurant.location}</span>
                </div>
            `;
            
            slide.appendChild(infoOverlay);
            this.slideshowElement.appendChild(slide);
        });
    }

    startSlideshow() {
        if (this.restaurants.length === 0) return;

        this.slideshowInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }

    nextSlide() {
        const slides = this.slideshowElement.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        // Fade out current slide
        slides[this.currentSlide].style.opacity = '0';

        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % slides.length;

        // Fade in new slide
        slides[this.currentSlide].style.opacity = '1';
    }

    stopSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }
    }

    destroy() {
        this.stopSlideshow();
        if (this.slideshowElement) {
            this.slideshowElement.innerHTML = '';
        }
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for restaurantsData to be available
    if (typeof restaurantsData !== 'undefined') {
        const slideshow = new RestaurantSlideshow();
        
        // Add pause on hover functionality
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => slideshow.stopSlideshow());
            heroSection.addEventListener('mouseleave', () => slideshow.startSlideshow());
        }
        
        // Add touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const heroSlideshow = document.getElementById('heroSlideshow');
        if (heroSlideshow) {
            heroSlideshow.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            heroSlideshow.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    slideshow.nextSlide();
                } else if (touchEndX > touchStartX + 50) {
                    slideshow.currentSlide = (slideshow.currentSlide - 1 + slideshow.restaurants.length) % slideshow.restaurants.length;
                    slideshow.nextSlide();
                }
            }
        }
    } else {
        console.error('restaurantsData is not defined. Make sure script.js is loaded before slideshow.js');
    }
});

// Export for use in other modules
window.RestaurantSlideshow = RestaurantSlideshow;
