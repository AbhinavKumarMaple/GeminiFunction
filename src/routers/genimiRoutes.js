const express = require("express");

const { handleGeminiRequest } = require("../controllers/geminiControllers");

const router = express.Router();

router.post("/", handleGeminiRequest);
router.get("/test", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
