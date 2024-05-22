const express = require("express");

const { handleGeminiRequest, updateInventories } = require("../controllers/geminiControllers");
const { getAllProducts } = require("../services/getAllProducts");

const router = express.Router();

router.post("/", handleGeminiRequest);
router.post("/realtimeupdate", updateInventories);
router.get("/allproducts", getAllProducts)


module.exports = router;
