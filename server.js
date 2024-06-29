const express = require('express');
const cors = require('cors');
const app = require('./src/app'); // Assuming app logic is in ./src/app.js or similar
const PORT = process.env.PORT || 3000;

const mainApp = express();

// Middleware to parse JSON bodies
mainApp.use(express.json());

// Use CORS middleware
mainApp.use(cors({
  origin: 'https://voice-based-command.vercel.app', // Replace with your Vercel app URL
}));

// Mount your existing app logic
mainApp.use('/', app); // Assuming your app logic is mounted at '/'

// Basic endpoint for testing
mainApp.get('/', (req, res) => {
  res.send('Hello World!');
});

mainApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
