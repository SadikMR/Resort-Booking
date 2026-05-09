(function () {
  const CAROUSEL_MQ = "(max-width: 1120px)";

  function initHighlightsCarousel(signal) {
    const scrollContainer = document.querySelector(".highlight-cards");
    const dotsContainer = document.querySelector(".highlight-dots");
    if (!scrollContainer || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll(".dot");
    const items = scrollContainer.children;
    if (!items.length || !dots.length) return;

    function updateDots() {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = items[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(scrollContainer).gap) || 0;
      const index = Math.round(scrollLeft / (itemWidth + gap));
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    scrollContainer.addEventListener("scroll", updateDots, { passive: true, signal });

    dots.forEach((dot, i) => {
      dot.addEventListener(
        "click",
        function () {
          const itemWidth = items[0].offsetWidth;
          const gap = parseFloat(getComputedStyle(scrollContainer).gap) || 0;
          scrollContainer.scrollTo({ left: i * (itemWidth + gap), behavior: "smooth" });
        },
        { signal },
      );
    });

    updateDots();
  }

  let controller;

  function setup() {
    if (controller) {
      controller.abort();
      controller = null;
    }
    if (!window.matchMedia(CAROUSEL_MQ).matches) return;
    controller = new AbortController();
    initHighlightsCarousel(controller.signal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
  window.addEventListener("resize", setup);
})();
