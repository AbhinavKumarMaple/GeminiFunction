const express = require("express");

const { handleGeminiRequest, updateInventories } = require("../controllers/geminiControllers");
const {} = require("../controllers/geminivision");
const { getAllProducts } = require("../services/getAllProducts");

const router = express.Router();

router.post("/", handleGeminiRequest);
router.post("/realtimeupdate", updateInventories);
router.get("/allproducts", getAllProducts)
router.get("/vision", geminivision)


module.exports = router;
