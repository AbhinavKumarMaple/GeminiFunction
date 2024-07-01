

const express = require('express');
const router = express.Router();
const { handleGeminiRequest, updateInventories } = require('../controllers/geminiControllers');
const { getAllProducts } = require('../services/getAllProducts');
const { getLast10Transactions } = require('../controllers/transactionsController'); // New controller for transactions

router.post('/', handleGeminiRequest);
router.post('/realtimeupdate', updateInventories);
router.get('/allproducts', getAllProducts);
router.get('/transactions/last-10', getLast10Transactions); // Endpoint for last 10 transactions

module.exports = router;