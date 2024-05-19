const express = require("express");
const cors = require("cors");
const geminiRoutes = require("./routes/geminiRoutes");
const connectDB = require("./config/db");
const { handleGeminiRequest } = require("./controllers/geminiControllers");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

connectDB();

// Define routes
app.use("/api/gemini", geminiRoutes);

app.post("/api/gemini/webhook", handleGeminiRequest);

// router.post("/prompt", handleGeminiRequest);
// router.post("/test", (req, res) => {
//   handleGeminiRequest(req, res);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
