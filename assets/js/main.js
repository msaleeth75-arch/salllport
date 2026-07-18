document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
  }

  // Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Cursor Glow
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // Active Link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) link.classList.add('active');
  });

  // Circular Progress Bars Animation on Scroll
  const skillCircles = document.querySelectorAll('.skill-circle');
  if (skillCircles.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.querySelector('.progress');
          const percent = entry.target.dataset.percent;
          // dashoffset = 340 - (340 * percent) / 100
          const offset = 340 - (340 * percent) / 100;
          progress.style.strokeDashoffset = offset;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillCircles.forEach(circle => observer.observe(circle));
  }

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.dataset.target;
          const duration = 2000; // ms
          const increment = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              entry.target.innerText = Math.ceil(current) + '+';
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.innerText = target + '+';
            }
          };
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Project Modals Logic
  const projectCards = document.querySelectorAll('.open-modal');
  const modalOverlay = document.getElementById('project-modal');
  const closeBtns = document.querySelectorAll('.modal-close');
  
  if (projectCards.length > 0 && modalOverlay) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        // Hide all modal contents
        document.querySelectorAll('.modal-content').forEach(mc => mc.classList.remove('active'));
        // Show specific modal content
        const targetModal = document.getElementById(modalId);
        if(targetModal) {
            targetModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        document.querySelectorAll('.modal-content').forEach(mc => mc.classList.remove('active'));
      }, 400);
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

});
