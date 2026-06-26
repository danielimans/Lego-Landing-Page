/**
 * Landing Page - Main JavaScript File
 * Handles interactivity, animations, and user interactions
 */

// ========================================
// DOM READY EVENT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ========================================
// INITIALIZATION
// ========================================
function initializeApp() {
    setupEventListeners();
    setupScrollAnimations();
    setupMobileNavigation();
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Search button toggle
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearch);
    }

    // Wishlist button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleWishlist);
    }

    // Shop Now button
    const shopNowBtn = document.querySelector('.btn-shop-now');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', handleShopNowClick);
    }

    // Smooth scroll for internal links
    setupSmoothScroll();

    // Handle window resize for responsive behavior
    window.addEventListener('resize', debounce(handleWindowResize, 250));
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.classList.toggle('active');
        
        // Focus on search input when opened
        if (searchBar.classList.contains('active')) {
            const searchInput = searchBar.querySelector('.form-control');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        }
    }
}

// Expose toggleSearch to global scope for HTML onclick
window.toggleSearch = toggleSearch;

// ========================================
// WISHLIST FUNCTIONALITY
// ========================================
function toggleWishlist(event) {
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    
    // Toggle between far (empty) and fas (filled) heart
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#E74C3C';
        showNotification('Added to wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = 'inherit';
        showNotification('Removed from wishlist', 'info');
    }
}

// ========================================
// SHOP NOW BUTTON
// ========================================
function handleShopNowClick(event) {
    event.preventDefault();
    showNotification('Redirecting to shop...', 'info');
    
    // Simulate navigation after delay
    setTimeout(() => {
        // In a real application, this would navigate to the shop page
        console.log('Navigate to shop');
    }, 500);
}

// ========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar && navbar.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbar, {
                        toggle: true
                    });
                }
                
                // Smooth scroll to target
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function setupScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.mission-card, .section-title, .section-description'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// MOBILE NAVIGATION
// ========================================
function setupMobileNavigation() {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
            }
        });
    });
}

// ========================================
// WINDOW RESIZE HANDLER
// ========================================
function handleWindowResize() {
    // Close search bar on smaller screens if needed
    const searchBar = document.getElementById('searchBar');
    if (window.innerWidth < 768 && searchBar) {
        searchBar.classList.remove('active');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Show notification toast
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already in CSS
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 1rem;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                min-width: 280px;
            }
            
            .notification-success {
                background-color: #4CAF50;
                color: white;
            }
            
            .notification-error {
                background-color: #f44336;
                color: white;
            }
            
            .notification-info {
                background-color: #2196F3;
                color: white;
            }
            
            .notification-warning {
                background-color: #ff9800;
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                transform: scale(1.2);
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @media (max-width: 576px) {
                .notification {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        if (!navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = 'none';
    }
}, 100));

// ========================================
// LAZY LOADING IMAGES (Optional)
// ========================================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', function(e) {
    // Close search bar with Escape key
    if (e.key === 'Escape') {
        const searchBar = document.getElementById('searchBar');
        if (searchBar && searchBar.classList.contains('active')) {
            toggleSearch();
        }
    }
});

// ========================================
// ANALYTICS TRACKING (Optional)
// ========================================
function trackEvent(eventName, eventData = {}) {
    // This is a placeholder for analytics tracking
    // In production, you would send this to your analytics service
    console.log('Event tracked:', eventName, eventData);
}

// Track page interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        if (text) {
            trackEvent('click', { element: target.tagName, text: text });
        }
    }
});