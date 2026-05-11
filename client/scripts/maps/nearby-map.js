// Nearby Resorts Map Initialization
let nearbyMap;
let resizeTimer;

// Detect viewport size and return limit (same as properties.js)
function getResponsiveLimit() {
  return window.innerWidth >= 1024 ? 6 : 4;
}

async function initNearbyMap() {
  try {
    // Create map
    const mapElement = document.getElementById('nearby-map');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    const mapOptions = {
      zoom: 12,
      center: { lat: 36.74, lng: -119.46 },
      mapTypeId: 'roadmap',
    };

    nearbyMap = new google.maps.Map(mapElement, mapOptions);
    window.nearbyMap = nearbyMap; // Global reference for sync module
    
    const bounds = new google.maps.LatLngBounds();
    let markerCount = 0;

    // Fetch nearby properties from API with responsive limit
    try {
      const limit = getResponsiveLimit();
      const response = await fetch(`/api/get-property?sort=most-popular&limit=${limit}`);
      const data = await response.json();
      
      console.log(`Fetched ${limit} properties for map`);
      console.log('Fetched properties data:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        console.log(`Total properties received: ${data.data.length}`);
        
        // Add markers for each property
        data.data.forEach((property, index) => {
          console.log(`Processing property ${index}: ${property.name}`, {lat: property.lat, lng: property.lng});
          
          // Skip properties with no coordinates or invalid lat/lng
          if (!property.lat || !property.lng || isNaN(property.lat) || isNaN(property.lng)) {
            console.warn(`Skipping ${property.name} - invalid coordinates`);
            return;
          }

          markerCount++;
          const position = { lat: parseFloat(property.lat), lng: parseFloat(property.lng) };
          console.log(`Adding marker for ${property.name} at position:`, position);

          const marker = new google.maps.Marker({
            position: position,
            map: nearbyMap,
            title: property.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          });

          bounds.extend(position);

          // Add info window with property details
          const infoContent = `
            <div style="padding: 10px; font-family: Arial, sans-serif; min-width: 220px;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">${property.name}</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">${property.location}</div>
              <div style="font-size: 12px; margin-bottom: 5px;">
                <span>⭐ ${(property.reviewScore || 0).toFixed(1)}/5</span>
                <span style="color: #999;">(${property.reviews} reviews)</span>
              </div>
              <div style="font-size: 13px; font-weight: bold; color: #006972;">$${property.price}</div>
            </div>
          `;
          
          const infoWindow = new google.maps.InfoWindow({
            content: infoContent,
          });

          // Register marker and info window for sync with cards
          if (typeof MapCardSync !== 'undefined') {
            MapCardSync.registerMarker(property.id, marker, infoWindow);
          }
        });

        console.log(`Total markers added: ${markerCount}`);

        // Fit map to bounds if we have markers
        if (markerCount > 0) {
          console.log('Fitting map bounds...');
          nearbyMap.fitBounds(bounds);
          setTimeout(() => {
            const zoomLevel = nearbyMap.getZoom();
            if (zoomLevel > 10) {
              nearbyMap.setZoom(zoomLevel - 1);
            }
          }, 100);
        } else {
          console.warn('No valid markers to display');
        }
      } else {
        console.warn('No properties data or empty response');
      }
    } catch (error) {
      console.error('Error fetching nearby properties:', error);
    }
  } catch (error) {
    console.error('Error initializing nearby map:', error);
  }
}

// Handle window resize to refresh map with responsive limit
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (nearbyMap) {
      console.log('Window resized - reinitializing map with new responsive limit');
      MapCardSync.clearAll();
      initNearbyMap();
    }
  }, 250);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNearbyMap);
} else {
  initNearbyMap();
}
