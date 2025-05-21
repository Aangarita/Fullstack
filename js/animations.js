// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Get all elements that should be animated on scroll
  const elementsToAnimate = document.querySelectorAll('.slide-up, .slide-in-left, .slide-in-right');
  
  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in view
      if (entry.isIntersecting) {
        // Add the active class
        entry.target.classList.add('active');
        // Unobserve the element
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // 10% of the element must be visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element enters the viewport
  });
  
  // Observe each element
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
  
  // Animate the hero section elements initially
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3, .fade-in-right');
    heroElements.forEach(element => {
      element.style.opacity = '1';
    });
  }, 100);
  
  // Prism button hover effect
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--x-pos', `${x}px`);
      button.style.setProperty('--y-pos', `${y}px`);
    });
  });
  
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 600) {
      heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    }
  }
});