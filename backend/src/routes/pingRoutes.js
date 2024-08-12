const express = require('express');
const router = express.Router();
const { getPing } = require('../controllers/pingController');

// Define the /ping route
router.get('/ping', getPing);

module.exports = router;
