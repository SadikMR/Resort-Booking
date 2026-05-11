const galleryData = require('../data/gallery.json');

// Get all images
const getAllImages = (req, res) => {
  try {
    res.json(galleryData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

module.exports = {
  getAllImages,
};
