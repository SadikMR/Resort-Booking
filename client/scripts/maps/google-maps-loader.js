// Google Maps API Loader
async function loadGoogleMapsAPI() {
  try {
    // Fetch API key from server
    const response = await fetch('/config/google-maps-key');
    const data = await response.json();
    const apiKey = data.apiKey;

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initMaps();
      return;
    }

    // Create and load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps API loaded');
      initMaps();
    };
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error('Error loading Google Maps API:', error);
  }
}

// Initialize both maps
function initMaps() {
  if (typeof initLocationMap !== 'undefined') {
    initLocationMap();
  }
  if (typeof initNearbyMap !== 'undefined') {
    initNearbyMap();
  }
}

// Load when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);
} else {
  loadGoogleMapsAPI();
}
