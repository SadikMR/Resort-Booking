/**
 * Nearby Properties – Dynamic loader with API integration
 *
 * Features:
 * - Fetches properties from API based on sort criteria
 * - Responsive limit (6 for desktop, 4 for mobile)
 * - Defaults to "Most Popular" on page load
 * - Updates grid when sort option changes
 * - Uses image service for property images
 * - Integrates with favorites management (via favorites.js)
 */

(function () {
  const IMAGE_SERVICE_URL = 'https://beta.imgservice.rentbyowner.com/640x300/';
  const API_BASE = '/get-property';

  // ===== Initialization Check =====
  // Ensure favorites module is loaded
  function waitForFavoritesModule(callback, attempts = 0) {
    if (window.NearbyFavorites) {
      callback();
    } else if (attempts < 10) {
      setTimeout(() => waitForFavoritesModule(callback, attempts + 1), 50);
    } else {
      console.error('Favorites module failed to load');
    }
  }

  // Detect viewport size and return limit
  function getResponsiveLimit() {
    return window.innerWidth >= 1024 ? 6 : 4;
  }

  // Build property card HTML
  function createPropertyCard(property) {
    const imageUrl = `${IMAGE_SERVICE_URL}${property.featureImage}`;
    const locationParts = property.location.split(',');
    const displayLocation = locationParts.slice(-2).join(' >').trim();
    const favState = window.NearbyFavorites.getInitialButtonState(property.id);

    return `
      <article class="nearby-card" data-property-id="${property.id}">
        <img src="${imageUrl}" alt="${property.name}" onerror="this.src='./images/nearby-resort-placeholder.jpg'" />
        <button type="button" class="nearby-card-favorite" aria-label="${favState.ariaLabel}" aria-pressed="${favState.ariaPressed}">
          <i class="${favState.iconClass}"></i>
        </button>
        <h3>${property.name}</h3>
        <p>${displayLocation}</p>
        <a class="btn btn-primary btn-small" href="#">View Availability</a>
      </article>
    `;
  }

  // Render properties to grid
  function renderProperties(properties) {
    const nearbyGrid = document.querySelector('.nearby-grid');
    if (!nearbyGrid) return;

    nearbyGrid.innerHTML = properties.map(createPropertyCard).join('');

    // Reinitialize favorite button functionality
    attachFavoriteHandlers();

    // Attach map synchronization handlers
    if (typeof MapCardSync !== 'undefined') {
      MapCardSync.attachCardHoverListeners();
    }
  }

  // Attach favorite button handlers
  function attachFavoriteHandlers() {
    document.querySelectorAll('.nearby-card-favorite').forEach((btn) => {
      btn.removeEventListener('click', handleFavoriteClick);
      btn.addEventListener('click', handleFavoriteClick);
    });
  }

  // Handle favorite button click
  function handleFavoriteClick(e) {
    e.preventDefault();
    const btn = this;
    const card = btn.closest('.nearby-card');
    const propertyId = card.dataset.propertyId;

    // Toggle favorite in localStorage (via favorites module)
    window.NearbyFavorites.toggleFavorite(propertyId);

    // Update button state
    window.NearbyFavorites.updateFavoriteButton(btn);

    // Re-sort the entire grid to move favorites to top
    const currentSort = document.getElementById('resort-sort').value;
    fetchProperties(currentSort);
  }

  // Fetch properties from API
  async function fetchProperties(sort = 'most-popular') {
    try {
      const limit = getResponsiveLimit();
      const url = `${API_BASE}?sort=${sort}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        renderProperties(data.data);
      } else {
        console.error('API response invalid:', data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  // Initialize on page load
  function init() {
    const sortSelect = document.getElementById('resort-sort');
    const nearbyGrid = document.querySelector('.nearby-grid');

    if (!sortSelect || !nearbyGrid) return;

    // Fetch initial properties (most popular)
    fetchProperties('most-popular');

    // Handle sort dropdown changes
    sortSelect.addEventListener('change', function () {
      fetchProperties(this.value);
    });

    // Refresh on window resize (to update limit for responsive behavior)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentSort = sortSelect.value;
        fetchProperties(currentSort);
      }, 250);
    });
  }

  // Wait for favorites module, then initialize
  waitForFavoritesModule(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });
})();
