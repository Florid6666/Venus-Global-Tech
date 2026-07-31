document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STICKY NAVBAR SCROLL ACTION
  // ==========================================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');

  if (mobileToggle && nav && overlay) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      nav.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      nav.classList.remove('open');
      overlay.classList.remove('open');
    });

    // Close nav when clicking any link inside the drawer
    const drawerLinks = nav.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
      });
    });

    // Reset menu display on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileToggle.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 3. TESTIMONIAL CAROUSEL SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (slides.length > 0 && prevBtn && nextBtn) {
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
  }

  // ==========================================
  // 4. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');

  function showToast(message, isSuccess = true) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    if (icon) {
      if (isSuccess) {
        icon.style.color = '#10B981'; // Green
      } else {
        icon.style.color = '#EF4444'; // Red
      }
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==========================================
  // 5. NEWSLETTER FORM SUBMISSION
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

