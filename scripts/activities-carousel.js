(function () {
  function initActivitiesCarousel() {
    const scrollContainer = document.querySelector('.activity-grid');
    const dotsContainer = document.querySelector('.activity-dots');
    if (!scrollContainer || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    const items = scrollContainer.children;
    if (!items.length || !dots.length) return;

    function updateDots() {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = items[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(scrollContainer).gap) || 0;
      const index = Math.round(scrollLeft / (itemWidth + gap));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    scrollContainer.addEventListener('scroll', updateDots, { passive: true });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', function () {
        const itemWidth = items[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(scrollContainer).gap) || 0;
        scrollContainer.scrollTo({ left: i * (itemWidth + gap), behavior: 'smooth' });
      });
    });

    updateDots();
  }

  function setup() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;
    initActivitiesCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
  window.addEventListener('resize', setup);
})();
