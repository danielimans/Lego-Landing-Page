/* ===========================
   MOBILE NAVIGATION
   =========================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ===========================
   SMOOTH SCROLL & ACTIVE NAV
   =========================== */

// update active nav link on scroll
window.addEventListener('scroll', () => {
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
});

/* ===========================
   Intersection observer
   for scroll animations
   =========================== */

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

// observe all cards and section elements
document.querySelectorAll('.card, .section-header').forEach(element => {
    observer.observe(element);
});

/* ===========================
   button interactions
   =========================== */

// shop now button click handler
const shopButton = document.querySelector('.btn-primary');
if (shopButton) {
    shopButton.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = shopButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        shopButton.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// read more links animation
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const arrow = this.querySelector('span');
        arrow.style.display = 'inline-block';
    });
});

/* ===========================
   header shadow on scroll
   =========================== */

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

/* ===========================
   icon button animations
   =========================== */

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

    button.addEventListener('click', function(e) {
        // Prevent default and show feedback
        e.preventDefault();
        this.style.backgroundColor = 'rgba(228, 0, 27, 0.1)';
        
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
    });
});

/* ===========================
   lazy load cards
   =========================== */

const lazyLoadCards = () => {
    const cards = document.querySelectorAll('.card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => cardObserver.observe(card));
};

// initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadCards);
} else {
    lazyLoadCards();
}

/* ===========================
   for smooth scroll animations
   =========================== */

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Parallax effect on hero (optional)
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrollTop = window.pageYOffset;
                hero.style.backgroundPositionY = (scrollTop * 0.5) + 'px';
            }
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

/* ===========================
   for mobile devices with mobile UI bars
   =========================== */

const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
};

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

/* ===========================
   console message
   =========================== */

console.log('%cLEGO Landing Page', 'font-size: 24px; font-weight: bold; color: #E4001B;');
console.log('%cMobile-First Responsive Design | High Code Quality | Smooth Animations', 'font-size: 12px; color: #666;');