const express = require('express');
const geminiRoutes = require('./routers/geminiRoutes');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/gemini', geminiRoutes);

module.exports = app;
