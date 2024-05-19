const express = require("express");

const { handleGeminiRequest } = require("../controllers/geminiControllers");

const router = express.Router();

router.post("/prompt", handleGeminiRequest);
router.get("/test", (req, res) => {
  handleGeminiRequest(req, res);
});

module.exports = router;
