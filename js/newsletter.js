// Newsletter form functionality
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const feedbackElement = document.getElementById('newsletterFeedback');
  
  if (!newsletterForm || !newsletterEmail || !feedbackElement) return;
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterEmail.value.trim();
    
    // Simple email validation
    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    showFeedback('Sending...', 'pending');
    
    // In a real implementation, this would be an API call
    // For this demo, we'll simulate a successful submission after a delay
    setTimeout(() => {
      showFeedback('Success! Check your email for the free lesson.', 'success');
      newsletterForm.reset();
      
      // Store in localStorage to remember the user
      localStorage.setItem('newsletterSubscribed', 'true');
      localStorage.setItem('subscribedEmail', email);
      
    }, 1500);
  });
  
  // Show feedback message
  function showFeedback(message, type = 'info') {
    feedbackElement.textContent = message;
    
    // Reset classes
    feedbackElement.className = 'form-feedback';
    
    // Add appropriate class
    feedbackElement.classList.add(`feedback-${type}`);
    
    // Style based on message type
    switch (type) {
      case 'error':
        feedbackElement.style.color = 'var(--color-error)';
        break;
      case 'success':
        feedbackElement.style.color = 'var(--color-success)';
        break;
      case 'pending':
        feedbackElement.style.color = 'var(--color-gray-300)';
        break;
      default:
        feedbackElement.style.color = 'var(--color-gray-400)';
    }
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Check if user has already subscribed
  if (localStorage.getItem('newsletterSubscribed') === 'true') {
    const email = localStorage.getItem('subscribedEmail');
    if (email) {
      newsletterEmail.value = email;
      showFeedback('You\'re already subscribed!', 'success');
    }
  }
});