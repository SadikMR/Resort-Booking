const express = require('express');
const imageController = require('../controllers/imageController');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

// GET all images
router.get('/images', imageController.getAllImages);

// GET properties with sorting and limit
router.get('/get-property', propertyController.getProperties);

module.exports = router;
