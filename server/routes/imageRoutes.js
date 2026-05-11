const express = require('express');
const imageController = require('../controllers/imageController');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

// Google Maps API key endpoint
router.get('/config/google-maps-key', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

// GET all images
router.get('/images', imageController.getAllImages);

// GET properties with sorting and limit
router.get('/get-property', propertyController.getProperties);

module.exports = router;
