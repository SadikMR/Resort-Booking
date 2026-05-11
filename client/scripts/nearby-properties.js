/**
 * Nearby Properties – Dynamic loader with API integration
 *
 * Features:
 * - Fetches properties from API based on sort criteria
 * - Responsive limit (6 for desktop, 4 for mobile)
 * - Defaults to "Most Popular" on page load
 * - Updates grid when sort option changes
 * - Uses image service for property images
 * - Favorites persisted in localStorage
 * - Favorites always shown first within each sort category
 */

(function () {
  const IMAGE_SERVICE_URL = 'https://beta.imgservice.rentbyowner.com/640x300/';
  const API_BASE = '/api/get-property';
  const FAVORITES_KEY = 'nearbyFavorites';

  // Detect viewport size and return limit
  function getResponsiveLimit() {
    return window.innerWidth >= 1024 ? 6 : 4;
  }

  // ===== LocalStorage Helpers =====
  function getFavoriteIds() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function saveFavoriteIds(ids) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  }

  function isFavorite(propertyId) {
    return getFavoriteIds().includes(propertyId);
  }

  function toggleFavorite(propertyId) {
    const favorites = getFavoriteIds();
    const index = favorites.indexOf(propertyId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(propertyId);
    }

    saveFavoriteIds(favorites);
  }

  // Build property card HTML
  function createPropertyCard(property) {
    const imageUrl = `${IMAGE_SERVICE_URL}${property.featureImage}`;
    const locationParts = property.location.split(',');
    const displayLocation = locationParts.slice(-2).join(' >').trim();
    const isFav = isFavorite(property.id);
    const ariaPressed = isFav ? 'true' : 'false';
    const ariaLabel = isFav ? 'Remove from favorites' : 'Add to favorites';

    return `
      <article class="nearby-card" data-property-id="${property.id}">
        <img src="${imageUrl}" alt="${property.name}" onerror="this.src='./images/nearby-resort-placeholder.jpg'" />
        <button type="button" class="nearby-card-favorite" aria-label="${ariaLabel}" aria-pressed="${ariaPressed}">
          <i class="bi bi-heart${isFav ? '-fill' : ''}"></i>
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

    // Toggle favorite in localStorage
    toggleFavorite(propertyId);

    // Update button state
    const isFav = isFavorite(propertyId);
    btn.setAttribute('aria-pressed', isFav);
    btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');

    // Update icon (filled or outline)
    const icon = btn.querySelector('i');
    icon.classList.toggle('bi-heart');
    icon.classList.toggle('bi-heart-fill');

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

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
