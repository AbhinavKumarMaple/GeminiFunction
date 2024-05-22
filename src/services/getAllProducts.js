const Product = require("../models/Product");

const getAllProducts = async (req,res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ message: products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(404).json({ message: error });
  }
};

module.exports = { getAllProducts };