// =========================================
// Custom Cursor Logic
// =========================================
const cursorDot = document.querySelector('.cursor-dot');
const interactiveElements = document.querySelectorAll('a, button, .service-row, .gallery-item');
const dragSection = document.querySelector('.marquee');

// Mouse move tracking
window.addEventListener('mousemove', (e) => {
    // Only apply custom cursor logic on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
    }
});

// Hover state for interactive elements
interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-hover');
    });
});

// Drag state for specific sections (like the marquee or gallery)
if (dragSection) {
    dragSection.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-drag');
    });
    dragSection.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-drag');
    });
}

// =========================================
// Sticky Navigation
// =========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// GSAP Animations
// =========================================
document.addEventListener("DOMContentLoaded", (event) => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation
    const heroTl = gsap.timeline();
    
    // Animate text blocks staggered
    heroTl.from(".hero-title .block", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    })
    .fromTo(".fade-up", {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.8");

    // Scroll-triggered animations for all mapped fade-up elements
    const elementsToAnimate = gsap.utils.toArray('.fade-up');
    
    elementsToAnimate.forEach((element) => {
        // Ensure elements don't already have inline opacity styling preventing the animation
        element.style.opacity = 1;
        element.style.transform = 'none';
        
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Trigger when top of element is 85% down viewport
                toggleActions: "play none none reverse" // play on enter, reverse on leave back
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Parallax effect for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach((img) => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: 20, // subtle parallax
            scale: 1.05,
            ease: "none"
        });
    });
    
    // Parallax string/glow in hero
    gsap.to(".hero-glow", {
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 150,
        opacity: 0,
        scale: 1.2
    });
});
