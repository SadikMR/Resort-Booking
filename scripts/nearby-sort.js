/**
 * Nearby Resorts – Sort functionality
 *
 * Sorts nearby resort cards by:
 * - Most Popular (default)
 * - Highest Price
 * - Lowest Price
 */
(function () {
  const sortSelect = document.getElementById('resort-sort');
  const nearbyGrid = document.querySelector('.nearby-grid');

  if (!sortSelect || !nearbyGrid) return;

  // Mock price data for each resort (in real app, would come from HTML data attributes)
  const resortPrices = {
    0: 1250,  // Resort 1
    1: 950,   // Resort 2
    2: 1450,  // Resort 3
    3: 1100,  // Resort 4
    4: 800,   // Resort 5
    5: 1300   // Resort 6
  };

  function sortResorts(sortBy) {
    const cards = Array.from(nearbyGrid.querySelectorAll('.nearby-card'));

    cards.sort((a, b) => {
      const indexA = Array.from(nearbyGrid.children).indexOf(a);
      const indexB = Array.from(nearbyGrid.children).indexOf(b);
      const priceA = resortPrices[indexA] || 0;
      const priceB = resortPrices[indexB] || 0;

      switch (sortBy) {
        case 'price-high':
          return priceB - priceA; // Highest first
        case 'price-low':
          return priceA - priceB; // Lowest first
        case 'popular':
        default:
          // Default order (by original position)
          return indexA - indexB;
      }
    });

    // Re-insert sorted cards
    cards.forEach((card) => {
      nearbyGrid.appendChild(card);
    });
  }

  sortSelect.addEventListener('change', function () {
    sortResorts(this.value);
  });

  // Initialize with default sort (popular)
  sortResorts('popular');
})();
