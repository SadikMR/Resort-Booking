const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

// GET all images
router.get('/images', imageController.getAllImages);

module.exports = router;
