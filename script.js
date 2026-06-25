/* ===========================
   INITIALIZATION
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeButtonInteractions();
    initializeIconAnimations();
    setViewportHeight();
});

/* ===========================
   MOBILE NAVIGATION
   =========================== */

function initializeNavigation() {
    const navToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.getElementById('mainNavMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggler.classList.contains('collapsed') === false) {
                navToggler.click();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('show')) {
            navToggler.click();
        }
    });
}

/* ===========================
   SCROLL EFFECTS & ACTIVE NAV
   =========================== */

function initializeScrollEffects() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Update header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink(navLinks);
    }, { passive: true });
}

function updateActiveNavLink(navLinks) {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

/* ===========================
   INTERSECTION OBSERVER
   for scroll animations
   =========================== */

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

/* ===========================
   BUTTON INTERACTIONS
   =========================== */

function initializeButtonInteractions() {
    const shopButton = document.querySelector('.btn-shop');

    if (shopButton) {
        shopButton.addEventListener('click', handleShopButtonClick);
        shopButton.addEventListener('mouseenter', handleButtonHover);
        shopButton.addEventListener('mouseleave', handleButtonLeave);
    }

    // Read more links animation
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('span');
            if (arrow) {
                arrow.style.display = 'inline-block';
            }
        });

        link.addEventListener('click', handleReadMoreClick);
    });
}

function handleShopButtonClick(e) {
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(228, 0, 27, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    console.log('Shop Now button clicked');
}

function handleButtonHover() {
    this.style.transform = 'translateY(-2px)';
}

function handleButtonLeave() {
    this.style.transform = 'translateY(0)';
}

function handleReadMoreClick(e) {
    e.preventDefault();
    console.log('Read more clicked:', this.textContent);
    // Add your navigation or modal logic here
}

/* ===========================
   ICON BUTTON ANIMATIONS
   =========================== */

function initializeIconAnimations() {
    const iconButtons = document.querySelectorAll('.icon-btn');

    iconButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const img = this.querySelector('.icon-img');
            if (img) {
                img.style.transform = 'scale(1.2)';
            }
        });

        button.addEventListener('mouseleave', function() {
            const img = this.querySelector('.icon-img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });

        button.addEventListener('click', handleIconButtonClick);
    });
}

function handleIconButtonClick(e) {
    e.preventDefault();
    
    // Add visual feedback
    this.style.backgroundColor = 'rgba(228, 0, 27, 0.1)';

    setTimeout(() => {
        this.style.backgroundColor = '';
    }, 200);

    const ariaLabel = this.getAttribute('aria-label');
    console.log(`${ariaLabel} button clicked`);
}

/* ===========================
   VIEWPORT HEIGHT FOR MOBILE
   handles notches and mobile UI bars
   =========================== */

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('resize', setViewportHeight, { passive: true });

/* ===========================
   PARALLAX EFFECT ON HERO
   =========================== */

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrollTop = window.pageYOffset;
                const heroBg = document.querySelector('.hero-background');
                if (heroBg) {
                    heroBg.style.backgroundPositionY = (scrollTop * 0.5) + 'px';
                }
            }

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Smooth scroll to element
function smoothScrollTo(element) {
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for sticky header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/* ===========================
   CONSOLE MESSAGING
   =========================== */

console.log('%c✨ LEGO Landing Page ✨', 'font-size: 20px; font-weight: bold; color: #E4001B;');
console.log('%cMobile-First | Responsive | Smooth Animations', 'font-size: 12px; color: #666; font-weight: 500;');
console.log('%cDeveloped with modern HTML5, CSS3, and Vanilla JavaScript', 'font-size: 11px; color: #999;');

/* ===========================
   PERFORMANCE OPTIMIZATION
   Disable animations on low-end devices
   =========================== */

if (isMobileDevice()) {
    // Reduce animation complexity on mobile if needed
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .card {
                animation-duration: 0.3s !important;
            }
        }
    `;
    document.head.appendChild(style);
}