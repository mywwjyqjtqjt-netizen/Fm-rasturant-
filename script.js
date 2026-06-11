// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1000);
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ===== MENU TAB FILTERING =====
const tabButtons = document.querySelectorAll('.tab-btn');
const foodCards = document.querySelectorAll('.food-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter cards
        foodCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                if (card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ===== ORDER FUNCTION =====
function orderItem(itemName, price) {
    const message = `Hi! I'd like to order ${itemName} (Rs. ${price}). Please confirm the order.`;
    const whatsappURL = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ===== FORM SUBMISSION =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappURL = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
    
    // Reset form
    form.reset();
    alert('Your message will be sent via WhatsApp!');
}

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ===== ADD TO CART FUNCTIONALITY (Optional Enhancement) =====
let cart = [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    console.log('Added to cart:', { name: itemName, price: price });
    console.log('Current cart:', cart);
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        // Scroll up
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== DYNAMIC YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${year} Zesto Burgers. All rights reserved.`;
    }
});

// ===== CART COUNTER (Optional) =====
function updateCartCounter() {
    const cartCount = cart.length;
    console.log(`Items in cart: ${cartCount}`);
    // You can add a cart badge to navbar here
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
    }
});

console.log('Zesto Burgers Website Loaded Successfully! 🍔');