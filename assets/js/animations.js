document.addEventListener('DOMContentLoaded', () => {

  // Scroll Reveal Implementation
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Vanilla JS 3D Tilt Effect for cards and profile image
  const tiltElements = document.querySelectorAll('.tilt-card');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max rotation degrees
      const rotateY = ((x - centerX) / centerX) * 15;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Add subtle glare or inner shift if needed via child .tilt-card-inner
      const inner = el.querySelector('.tilt-card-inner');
      if(inner) {
          inner.style.transform = `translateZ(40px) translateX(${rotateY}px) translateY(${-rotateX}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      el.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        el.style.transition = '';
      }, 500);
      
      const inner = el.querySelector('.tilt-card-inner');
      if(inner) {
          inner.style.transform = `translateZ(30px)`;
      }
    });
  });

});
