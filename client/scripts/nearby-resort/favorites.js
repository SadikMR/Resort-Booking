/**
 * Nearby Resorts – Favorites Management
 *
 * Handles all favorites-related functionality:
 * - localStorage management for favorite properties
 * - Checking favorite status
 * - Toggling favorites on/off
 * - UI state updates (aria attributes and icon classes)
 */
(function () {
  const FAVORITES_KEY = 'nearbyFavorites';

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

  // ===== UI State Helpers =====
  function updateFavoriteButton(btn) {
    const card = btn.closest('.nearby-card');
    const propertyId = card.dataset.propertyId;
    const isFav = isFavorite(propertyId);

    btn.setAttribute('aria-pressed', isFav);
    btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');

    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isFav ? 'bi bi-heart-fill' : 'bi bi-heart';
    }
  }

  function getInitialButtonState(propertyId) {
    const isFav = isFavorite(propertyId);
    return {
      ariaPressed: isFav ? 'true' : 'false',
      ariaLabel: isFav ? 'Remove from favorites' : 'Add to favorites',
      iconClass: isFav ? 'bi bi-heart-fill' : 'bi bi-heart'
    };
  }

  // Expose public API via window namespace
  window.NearbyFavorites = {
    getFavoriteIds,
    saveFavoriteIds,
    isFavorite,
    toggleFavorite,
    updateFavoriteButton,
    getInitialButtonState
  };
})();
