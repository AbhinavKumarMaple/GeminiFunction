const express = require("express");

const { handleGeminiRequest } = require("../controllers/geminiControllers");

const router = express.Router();

router.post("/", handleGeminiRequest);

module.exports = router;
