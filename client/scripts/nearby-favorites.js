/**
 * Nearby Resorts – Favorite/Love icon toggle
 *
 * Allows users to add/remove nearby resorts from favorites
 * with visual feedback (filled/unfilled heart icon)
 */
(function () {
  const favoriteButtons = document.querySelectorAll('.nearby-card-favorite');

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const isPressed = this.getAttribute('aria-pressed') === 'true';
      const newState = !isPressed;

      this.setAttribute('aria-pressed', newState);
      this.setAttribute('aria-label', newState ? 'Remove from favorites' : 'Add to favorites');
    });
  });
})();
