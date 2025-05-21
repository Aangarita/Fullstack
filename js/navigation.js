// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        // Calculate scroll position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Scroll smoothly to the target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    // Get current scroll position with buffer for better UX
    const scrollPosition = window.pageYOffset + 100;
    
    // Check each section to see if it's in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const activeLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Call on scroll and initial page load
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink();
});