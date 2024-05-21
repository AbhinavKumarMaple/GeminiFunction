const express = require("express");

const { handleGeminiRequest, updateInventories } = require("../controllers/geminiControllers");

const router = express.Router();

router.post("/", handleGeminiRequest);
router.post("/realtimeupdate", updateInventories);

module.exports = router;
