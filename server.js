const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { handleGeminiRequest } = require("./src/controllers/geminiControllers");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

connectDB();

// Define routes
// app.use("/api/gemini", geminiRoutes);

app.post("/api/gemini/webhook", handleGeminiRequest);

// router.post("/prompt", handleGeminiRequest);
router.get("/test", (req, res) => {
  handleGeminiRequest(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
