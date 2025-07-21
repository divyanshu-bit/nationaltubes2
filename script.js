// National Tubes Website - JavaScript Functionality

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    initScrollEffects();
    initSmoothScrolling();
    initMobileMenu();
    initAnimations();
    initParticleEffects();
    initCounterAnimations();
    initFormHandling();
}

// Navbar scroll effect
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!mobileMenu) {
        // Create mobile menu if it doesn't exist
        createMobileMenu();
        return;
    }
    
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const menuItems = [
        { href: '#home', text: 'Home' },
        { href: '#about', text: 'About' },
        { href: '#products', text: 'Products' },
        { href: '#quality', text: 'Quality' },
        { href: '#industries', text: 'Industries' },
        { href: '#contact', text: 'Contact' }
    ];
    
    let menuHTML = '<div class="text-right p-4"><button onclick="toggleMobileMenu()" class="text-white text-2xl">×</button></div>';
    
    menuItems.forEach(item => {
        menuHTML += `<a href="${item.href}" onclick="toggleMobileMenu()">${item.text}</a>`;
    });
    
    mobileMenu.innerHTML = menuHTML;
    document.body.appendChild(mobileMenu);
    
    // Now toggle it
    toggleMobileMenu();
}

function initMobileMenu() {
    // Add click handler for mobile menu button
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to elements
    const animatedElements = document.querySelectorAll('.bg-white, .text-center, .grid');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Enhanced particle effects
function initParticleEffects() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;
    
    // Create additional particles dynamically
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = `particle particle-${Math.floor(Math.random() * 3) + 1}`;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        heroSection.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 3000);
    
    // Initial particles
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 500);
    }
}

// Counter animations for stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.text-4xl');
    
    const animateCounter = (element, target, suffix = '') => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const text = entry.target.textContent;
                
                if (text.includes('25+')) {
                    animateCounter(entry.target, 25, '+');
                } else if (text.includes('7+')) {
                    animateCounter(entry.target, 7, '+');
                } else if (text.includes('1000+')) {
                    animateCounter(entry.target, 1000, '+');
                } else if (text.includes('6+')) {
                    animateCounter(entry.target, 6, '+');
                }
                
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form handling
function initFormHandling() {
    // Handle button clicks
    const exploreBtn = document.querySelector('.bg-blue-600');
    const quoteBtn = document.querySelector('.border-2');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Scroll to products section
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events that don't need to run on every scroll
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading-skeleton');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    // You could send this to an error reporting service
});

// Accessibility enhancements
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Contact form submission (if you add a form later)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Export functions for potential use in other scripts
window.NationalTubes = {
    toggleMobileMenu,
    initScrollEffects,
    initAnimations,
    handleContactForm
};