/* ==========================================
   LEGO Landing Page - JavaScript
   ========================================== */

/**
 * Smooth scroll for anchor links
 * Handles navigation to different sections with smooth animation
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        }
    });
});

/**
 * Active navigation link highlight
 * Highlights the current section being viewed
 */
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/**
 * Add active class styling for current page
 * CSS needs to include: .navbar-nav .nav-link.active { ... }
 */
const style = document.createElement('style');
style.textContent = `
    .navbar-nav .nav-link.active {
        color: var(--lego-red) !important;
        border-bottom: 2px solid var(--lego-red);
    }
`;
document.head.appendChild(style);

/**
 * Card animation on scroll
 * Cards fade in and lift when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add animation with staggered delay
            entry.target.style.animation = `
                fadeInUp 0.6s ease-out ${index * 0.1}s forwards
            `;
            entry.target.style.opacity = '0';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Apply observer to card elements
 */
document.querySelectorAll('.card-item').forEach(card => {
    observer.observe(card);
});

/**
 * Scroll to top button functionality
 * Shows when user scrolls down, scrolls page back to top when clicked
 */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--lego-red);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
    width: 50px;
    height: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top when button clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
});

// Hover effect for scroll button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.backgroundColor = '#C40014';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.backgroundColor = 'var(--lego-red)';
});

/**
 * Add keyframe animation for card fade-in
 * This animation is referenced in the observer code above
 */
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

/**
 * Navbar icon interactions
 * Add click handlers for search, heart, and shopping bag icons
 */
document.querySelectorAll('.navbar-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Determine which icon was clicked
        if (this.classList.contains('icon-search')) {
            console.log('Search clicked');
            // Add search functionality here
        } else if (this.classList.contains('icon-heart')) {
            console.log('Wishlist clicked');
            // Add wishlist functionality here
        } else if (this.classList.contains('icon-bag')) {
            console.log('Shopping bag clicked');
            // Add shopping bag functionality here
        }
    });
});

/**
 * Mobile menu close on link click
 * Already handled in smooth scroll section above
 */

/**
 * Initialize page
 * Run setup functions when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('page-loaded');
    
    // Log to console for debugging (remove in production)
    console.log('LEGO Landing Page loaded successfully');
});

/**
 * Unobtrusive error handling
 * Gracefully handle any JavaScript errors
 */
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
});