

const express = require('express');
const router = express.Router();
const { handleGeminiRequest, updateInventories } = require('../controllers/geminiControllers');
const { getAllProducts } = require('../services/getAllProducts');

router.post('/', handleGeminiRequest);
router.post('/realtimeupdate', updateInventories);
router.get('/allproducts', getAllProducts);
module.exports = router;