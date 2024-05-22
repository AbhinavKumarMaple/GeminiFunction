const Product = require("../models/Product");

const updateMultipleInventories = async (inventoryUpdates) => {
  try {
    
    const updateResults = []; 
    console.log(inventoryUpdates)
    for (const [name, quantity] of Object.entries(inventoryUpdates)) {
      // console.log(name,quantity)
      const product = await Product.findOne({ name });
      console.log(product)
      if (!product) {
        updateResults.push({ name, success: false, message: "Product not found" });
        continue;
      }

      product.inventory = quantity;
      product.lastModified = Date.now();
      await product.save();

      updateResults.push({ name, success: true, newInventory: product.inventory });
    }

    return { success: true, results: updateResults };
  } catch (error) {
    console.error("Error updating multiple inventories:", error);
    return { success: false, message: "Failed to update multiple inventories" };
  }
};

module.exports = { updateMultipleInventories };
