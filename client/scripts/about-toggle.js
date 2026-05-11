/**
 * About section – Show more / Show less toggle
 *
 * Toggles between a truncated preview and the full resort description
 * inside the #about section.
 */
(function () {
  const toggle = document.getElementById('about-toggle');
  if (!toggle) return;

  const shortText = document.querySelector('.about-short');
  const fullText = document.querySelector('.about-full');
  if (!shortText || !fullText) return;

  toggle.addEventListener('click', function () {
    const isExpanded = !fullText.hidden;

    fullText.hidden = isExpanded;
    shortText.hidden = !isExpanded;
    toggle.textContent = isExpanded ? 'Show more' : 'Show less';
  });
})();

/**
 * Room-Specific Amenities – Show more / Show less toggle
 *
 * Reveals additional amenity items hidden by default.
 */
(function () {
  const toggle = document.getElementById('amenity-toggle');
  if (!toggle) return;

  const extraGrid = document.querySelector('.amenity-grid-extra');
  if (!extraGrid) return;

  toggle.addEventListener('click', function () {
    const isExpanded = !extraGrid.hidden;

    extraGrid.hidden = isExpanded;
    toggle.textContent = isExpanded ? 'Show more' : 'Show less';
  });
})();
