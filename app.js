document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');

  function showToast(message, isSuccess = true) {
    toastText.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    if (isSuccess) {
      icon.style.color = '#10B981'; // Green
    } else {
      icon.style.color = '#EF4444'; // Red
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==========================================
  // 2. STICKY NAVBAR SCROLL ACTION
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('nav-overlay');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    }

    // Close nav when clicking any link inside the drawer (good UX on mobile)
    const drawerLinks = nav.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    // Reset menu display on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ==========================================
  // 4. ANIMATING HERO DASHBOARD CHART ON LOAD
  // ==========================================
  const barCols = document.querySelectorAll('.bar-col');
  barCols.forEach(bar => {
    const targetHeight = bar.style.height;
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.height = targetHeight;
    }, 300);
  });

  // Interactive metrics: clicking updates values randomly with pulse effect
  const sparklineCards = document.querySelectorAll('.db-sparkline-card');
  sparklineCards.forEach(card => {
    card.addEventListener('click', () => {
      const valueEl = card.querySelector('.sparkline-val');
      const label = card.querySelector('.sparkline-title').textContent;
      
      // Highlight pulse animation
      valueEl.style.transform = 'scale(1.1)';
      valueEl.style.color = '#0066FF';
      valueEl.style.transition = 'all 0.15s ease';

      setTimeout(() => {
        valueEl.style.transform = 'scale(1)';
        valueEl.style.color = '';
      }, 150);

      // Random updates for demo purposes
      if (label.toLowerCase().includes('revenue')) {
        const newVal = Math.floor(3500 + Math.random() * 500);
        valueEl.textContent = newVal.toLocaleString();
      } else if (label.toLowerCase().includes('products') || label.toLowerCase().includes('orders')) {
        const newVal = Math.floor(500 + Math.random() * 100);
        valueEl.textContent = newVal.toLocaleString();
      } else if (label.toLowerCase().includes('growth') || label.toLowerCase().includes('efficiency')) {
        const newVal = (4.5 + Math.random() * 2).toFixed(1);
        valueEl.textContent = `+${newVal}%`;
      }
    });
  });

  // ==========================================
  // 5. FEATURE SHOWCASE TABS SYSTEM
  // ==========================================
  const tabButtons = document.querySelectorAll('.feature-nav-btn');
  const tabPanes = document.querySelectorAll('.feature-screen-tab');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Update buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `tab-${tabId}`) {
          pane.classList.add('active');
          
          // Re-trigger special inner-tab animations
          if (tabId === 'spa') {
            const spinner = pane.querySelector('.spa-spinner');
            if (spinner) {
              spinner.style.animation = 'none';
              // Trigger reflow
              void spinner.offsetWidth;
              spinner.style.animation = 'spin 1s infinite linear';
            }
          }
        }
      });
    });
  });

  // ==========================================
  // 6. TESTIMONIAL CAROUSEL SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Auto-rotate testimonials every 8 seconds
  let autoRotate = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 8000);

  // Clear auto-rotate on manual click
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(autoRotate);
    });
  });

  // ==========================================
  // 7. FAQ ACCORDION TRANSITIONS
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(headerEl => {
    headerEl.addEventListener('click', () => {
      const faqItem = headerEl.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      const isOpen = faqItem.classList.contains('open');

      // Close all other FAQ items for a cleaner accordion effect
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-body').style.height = '0px';
      });

      if (!isOpen) {
        faqItem.classList.add('open');
        faqBody.style.height = `${faqBody.scrollHeight}px`;
      } else {
        faqItem.classList.remove('open');
        faqBody.style.height = '0px';
      }
    });
  });

  // ==========================================
  // 8. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    
    // Simulate API request delay
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    }, 1200);
  });

  // ==========================================
  // 9. NEWSLETTER FORM SUBMISSION
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('.newsletter-input').value;
    
    // Simulate API request delay
    const submitBtn = newsletterForm.querySelector('.newsletter-submit');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.disabled = false;
      showToast(`Successfully subscribed with ${email}! Welcome aboard.`);
      newsletterForm.reset();
    }, 1000);
  });

  // Add scroll active styling to nav links based on view position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
