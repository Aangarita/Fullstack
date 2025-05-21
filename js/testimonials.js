// Testimonials slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const testimonials = document.querySelectorAll('.testimonial');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.getElementById('testimonialsButtonPrev');
  const nextButton = document.getElementById('testimonialsButtonNext');
  
  if (!testimonials.length) return;
  
  let currentIndex = 0;
  const totalTestimonials = testimonials.length;
  
  // Initialize autoplay
  let autoplayInterval = setInterval(showNextTestimonial, 5000);
  
  // Function to show testimonial at index
  function showTestimonial(index) {
    // Reset previous testimonial
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Update current index
    currentIndex = index;
    
    // If index is out of bounds
    if (currentIndex < 0) {
      currentIndex = totalTestimonials - 1;
    } else if (currentIndex >= totalTestimonials) {
      currentIndex = 0;
    }
    
    // Show current testimonial
    testimonials[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    // Reset autoplay
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(showNextTestimonial, 5000);
  }
  
  // Function to show next testimonial
  function showNextTestimonial() {
    showTestimonial(currentIndex + 1);
  }
  
  // Function to show previous testimonial
  function showPreviousTestimonial() {
    showTestimonial(currentIndex - 1);
  }
  
  // Event listeners for controls
  if (prevButton) {
    prevButton.addEventListener('click', showPreviousTestimonial);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', showNextTestimonial);
  }
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Pause autoplay on hover
  const testimonialContainer = document.getElementById('testimonialContainer');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(showNextTestimonial, 5000);
    });
  }
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (testimonialContainer) {
    testimonialContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    
    testimonialContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, show next
      showNextTestimonial();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, show previous
      showPreviousTestimonial();
    }
  }
});