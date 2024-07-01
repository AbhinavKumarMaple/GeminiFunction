const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = require('./src/app'); // Assuming app logic is in ./src/app.js or similar

const PORT = process.env.PORT || 3000;

const mainApp = express();

// Middleware to parse JSON bodies
mainApp.use(express.json());

// CORS configuration
mainApp.use(cors({
  origin: ['https://voice-based-command.vercel.app', 'http://localhost:3000'],
}));

// Mount your existing app logic
mainApp.use('/', app); // Assuming your app logic is mounted at '/'


// Basic endpoint for testing
mainApp.get('/', (req, res) => {
  res.send('Hello World!');
});

// Proxy endpoint to fetch product list
mainApp.get('/api/gemini/allproducts', async (req, res) => {
  try {
    const response = await axios.get('https://gemini.up.railway.app/api/gemini/allproducts');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

mainApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
