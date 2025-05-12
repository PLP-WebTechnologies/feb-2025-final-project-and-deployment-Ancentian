document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Hero Slider Functionality
    function initHeroSlider() {
        const heroSlider = document.querySelector('.hero-slider');
        if (!heroSlider) return;

        const slides = document.querySelectorAll('.hero-slide');
        const dotsContainer = document.querySelector('.slide-dots');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slide-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slide-dot');

        // Start auto-sliding
        function startSlider() {
            slideInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000);
        }

        // Go to specific slide
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Reset timer when manually changing slides
            clearInterval(slideInterval);
            startSlider();
        }

        // Next slide
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        // Previous slide
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        heroSlider.addEventListener('mouseleave', startSlider);

        // Start the slider
        startSlider();
    }

    // Initialize the hero slider
    initHeroSlider();

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials
        let testimonialInterval = setInterval(() => {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);

        // Pause auto-rotation on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            }, 5000);
        });
    }

    // Service Tabs
    if (document.querySelector('.service-tabs')) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const serviceContents = document.querySelectorAll('.service-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                serviceContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });

            // Validate name
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                name.nextElementSibling.textContent = 'Name is required';
                name.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                email.nextElementSibling.textContent = 'Email is required';
                email.nextElementSibling.style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                email.nextElementSibling.textContent = 'Please enter a valid email';
                email.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Validate subject
            const subject = document.getElementById('subject');
            if (subject.value === '') {
                subject.nextElementSibling.textContent = 'Please select a subject';
                subject.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Validate message
            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                message.nextElementSibling.textContent = 'Message is required';
                message.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                document.getElementById('formSuccess').style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});