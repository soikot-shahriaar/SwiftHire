// SwiftHire Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSwitcher();
    initCounters();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    
    // Top Bar Switcher Functionality
    function initSwitcher() {
        const switcherBtns = document.querySelectorAll('.switcher-btn');
        
        switcherBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                switcherBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get target audience
                const target = this.getAttribute('data-target');
                
                // Update page content based on audience
                updateContentForAudience(target);
            });
        });
    }
    
    function updateContentForAudience(audience) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        
        if (audience === 'employers') {
            heroTitle.textContent = 'Connect with Top Tech Talent Faster';
            heroSubtitle.textContent = 'Streamline your recruitment process with AI-powered matching, comprehensive candidate profiles, and faster time-to-hire. Find the perfect fit for your tech team.';
            heroCta.innerHTML = `
                <a href="#post-job" class="btn btn-primary btn-lg">
                    <i class="fas fa-plus"></i>
                    Post a Job
                </a>
                <a href="#browse-candidates" class="btn btn-outline-primary btn-lg">
                    <i class="fas fa-users"></i>
                    Browse Candidates
                </a>
            `;
        } else if (audience === 'jobseekers') {
            heroTitle.textContent = 'Find Your Dream Tech Job';
            heroSubtitle.textContent = 'Discover exciting opportunities with top tech companies. Upload your resume, get matched with relevant positions, and accelerate your career growth.';
            heroCta.innerHTML = `
                <a href="#browse-jobs" class="btn btn-primary btn-lg">
                    <i class="fas fa-search"></i>
                    Browse Jobs
                </a>
                <a href="#upload-resume" class="btn btn-outline-primary btn-lg">
                    <i class="fas fa-upload"></i>
                    Upload Resume
                </a>
            `;
        }
    }
    
    // Animated Counter Functionality
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        };
        
        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.step-card, .pricing-card, .blog-card');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            fadeInObserver.observe(element);
        });
    }
    
    // Navbar Scroll Effect
    function initNavbarScroll() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.backgroundColor = 'rgba(13, 27, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'var(--primary-bg)';
                header.style.backdropFilter = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Mobile Menu Toggle Enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
    
    // Pricing Card Hover Effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Company Logo Animation
    const companyLogos = document.querySelectorAll('.company-logo');
    companyLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Blog Card Image Hover Effect
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const image = card.querySelector('.blog-image img');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Form Validation (for future forms)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary') || this.classList.contains('btn-outline-primary')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Parallax effect for hero section
    function initParallax() {
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (scrolled < hero.offsetHeight) {
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }
    
    // Initialize parallax on larger screens
    if (window.innerWidth > 768) {
        initParallax();
    }
    
    // Performance optimization: Throttle scroll events
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
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        // Scroll-based animations and effects
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Console welcome message
    console.log('%c🚀 Welcome to SwiftHire!', 'color: #ff6b00; font-size: 20px; font-weight: bold;');
    console.log('%cWe\'re hiring! Check out our careers page.', 'color: #e0e1dd; font-size: 14px;');
    
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSwitcher,
        initCounters,
        initSmoothScrolling
    };
}
