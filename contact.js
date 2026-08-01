/* ==========================================================================
   CONTACT PAGE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');

  if (mobileToggle && nav && overlay) {
    function toggleMobileMenu() {
      const isOpen = mobileToggle.classList.toggle('open');
      nav.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
    }

    function closeMobileMenu() {
      mobileToggle.classList.remove('open');
      nav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    const drawerLinks = nav.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  // ==========================================
  // 2. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');

  function showToast(message, isSuccess = true) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    if (icon) {
      icon.style.color = isSuccess ? '#10B981' : '#EF4444';
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==========================================
  // 3. MAIN CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit-contact');
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      
      const name = nameInput ? nameInput.value.trim() : 'Thank you';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><span class="arrow">&gt;</span>';
        }
        showToast(`Thank you, ${name}! Your inquiry has been sent to our team. We'll be in touch within 24 hours.`);
        contactForm.reset();
      }, 1200);
    });
  }

  // ==========================================
  // 4. FOOTER NEWSLETTER FORM SUBMISSION
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('.newsletter-input').value;
      const submitBtn = newsletterForm.querySelector('.newsletter-submit');
      
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        showToast(`Thank you! ${email} has been subscribed to our newsletter.`);
        newsletterForm.reset();
      }, 1200);
    });
  }

});
