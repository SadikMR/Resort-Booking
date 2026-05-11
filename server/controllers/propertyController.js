const mostPopularData = require('../data/most_popular.json');
const highestPriceData = require('../data/highest_price.json');
const lowestPriceData = require('../data/lowest_price.json');

// Get properties based on sort criteria and limit
const getProperties = (req, res) => {
  try {
    const { sort = 'most-popular', limit = 6 } = req.query;
    const parsedLimit = Math.min(parseInt(limit) || 6, 20); // Cap at 20

    let dataSource;

    // Select data source based on sort parameter
    switch (sort) {
      case 'highest-price':
        dataSource = highestPriceData;
        break;
      case 'lowest-price':
        dataSource = lowestPriceData;
        break;
      case 'most-popular':
      default:
        dataSource = mostPopularData;
        break;
    }

    // Extract items and apply limit
    const items = dataSource?.Result?.Items || [];
    const limitedItems = items.slice(0, parsedLimit);

    // Format response with required fields
    const properties = limitedItems.map((item) => ({
      id: item.ID,
      name: item.Property?.PropertyName || 'Property Name',
      price: item.Property?.Price || 0,
      bedrooms: item.Property?.Counts?.Bedroom || 0,
      bathrooms: item.Property?.Counts?.Bathroom || 0,
      occupancy: item.Property?.Counts?.Occupancy || 0,
      reviews: item.Property?.Counts?.Reviews || 0,
      reviewScore: item.Property?.ReviewScore || 0,
      location: item.GeoInfo?.Display || 'Location',
      featureImage: item.Property?.FeatureImage || '',
      propertyType: item.Property?.PropertyType || 'Property',
      amenities: item.Property?.TopAmenities || [],
      highlights: item.Property?.PropertyHighlights || [],
    }));

    res.json({
      success: true,
      sort,
      limit: parsedLimit,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch properties' 
    });
  }
};

module.exports = {
  getProperties,
};
