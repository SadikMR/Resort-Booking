// Location Map Initialization
let locationMap;

async function initLocationMap() {
  try {
    // Create map
    const mapElement = document.getElementById('location-map');
    if (!mapElement) return;

    const mapOptions = {
      zoom: 14,
      center: { lat: 18.474, lng: -68.365 },
      mapTypeId: 'roadmap',
    };

    locationMap = new google.maps.Map(mapElement, mapOptions);

    // Add marker for resort
    const marker = new google.maps.Marker({
      position: { lat: 18.474, lng: -68.365 },
      map: locationMap,
      title: 'Sanctuary Cap Cana Resort',
      animation: google.maps.Animation.DROP,
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: '<div><strong>Sanctuary Cap Cana</strong><br/>Cap Cana, Dominican Republic</div>',
    });

    marker.addListener('click', () => {
      infoWindow.open(locationMap, marker);
    });
  } catch (error) {
    console.error('Error initializing location map:', error);
  }
}
