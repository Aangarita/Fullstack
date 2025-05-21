// Import other JS modules
import './navigation.js';
import './animations.js';
import './testimonials.js';
import './faq.js';
import './newsletter.js';

// Initialize any global functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log('CodeMaster landing page loaded');
  
  // Initialize student counter animation
  animateCounter('studentCount', 2500, 3000);
});

// Counter animation function
function animateCounter(elementId, targetNumber, duration = 2000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const start = 0;
  const increment = 20;
  const totalSteps = Math.ceil(duration / increment);
  const stepValue = targetNumber / totalSteps;
  
  let currentStep = 0;
  let currentValue = start;
  
  const originalText = element.textContent;
  const suffix = originalText.replace(/[0-9,+]/g, '');
  
  const counter = setInterval(() => {
    currentStep++;
    currentValue += stepValue;
    
    if (currentStep >= totalSteps) {
      clearInterval(counter);
      currentValue = targetNumber;
    }
    
    element.textContent = Math.floor(currentValue).toLocaleString() + suffix;
    
    if (currentStep >= totalSteps) {
      element.textContent = originalText;
    }
  }, increment);
}