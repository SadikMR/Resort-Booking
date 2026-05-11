// Map and Card Synchronization
// Handles interaction between nearby resort cards and map markers

const MapCardSync = (() => {
  const markerMap = new Map(); // propertyId -> marker
  const infoWindowMap = new Map(); // propertyId -> infoWindow

  return {
    registerMarker(propertyId, marker, infoWindow) {
      markerMap.set(propertyId, marker);
      infoWindowMap.set(propertyId, infoWindow);

      // When marker is clicked, highlight the card
      marker.addListener('click', () => {
        MapCardSync.highlightCard(propertyId);
        MapCardSync.openInfoWindow(propertyId);
      });
    },

    highlightCard(propertyId) {
      // Remove highlight from all cards
      document.querySelectorAll('.nearby-card').forEach((card) => {
        card.classList.remove('highlighted');
      });

      // Highlight the target card
      const targetCard = document.querySelector(
        `.nearby-card[data-property-id="${propertyId}"]`
      );
      if (targetCard) {
        targetCard.classList.add('highlighted');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },

    changeMarkerColor(propertyId, isHover) {
      const marker = markerMap.get(propertyId);
      if (!marker) return;

      if (isHover) {
        // Bright yellow/gold on hover
        marker.setIcon(
          'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        );
      } else {
        // Reset to default
        const card = document.querySelector(
          `.nearby-card[data-property-id="${propertyId}"]`
        );
        const isFirst =
          card &&
          card === document.querySelector('.nearby-card:first-child');

        marker.setIcon(
          isFirst
            ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        );
      }
    },

    openInfoWindow(propertyId) {
      // Close all open info windows
      infoWindowMap.forEach((infoWindow) => {
        infoWindow.close();
      });

      // Open the target info window
      const infoWindow = infoWindowMap.get(propertyId);
      const marker = markerMap.get(propertyId);
      if (infoWindow && marker) {
        infoWindow.open(window.nearbyMap, marker);
      }
    },

    attachCardHoverListeners() {
      document.querySelectorAll('.nearby-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          const propertyId = card.dataset.propertyId;
          MapCardSync.changeMarkerColor(propertyId, true);
        });

        card.addEventListener('mouseleave', () => {
          const propertyId = card.dataset.propertyId;
          MapCardSync.changeMarkerColor(propertyId, false);
        });

        card.addEventListener('click', () => {
          const propertyId = card.dataset.propertyId;
          MapCardSync.openInfoWindow(propertyId);
        });
      });
    },

    clearAll() {
      markerMap.clear();
      infoWindowMap.clear();
    },
  };
})();
