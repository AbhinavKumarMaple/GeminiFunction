const Product = require("../models/Product");

const updateProductPrice = async (name, newPrice) => {
    try {
      const priceValue = Number(newPrice);
      if (isNaN(priceValue) || priceValue <= 0) {
        return { success: false, message: "Invalid price" };
      }
  
      const product = await Product.findOne({ name });
      if (!product) {
        return { success: false, message: "Product not found" };
      }
  
      product.price = priceValue;
      product.lastModified = Date.now();
      await product.save();
  
      console.log(`Updated price for ${name} to ${priceValue}`);
      return { success: true, price: product.price };
    } catch (error) {
      console.error("Error updating product price:", error);
      return { success: false, message: "Failed to update product price" };
    }
  };

const createProduct = async (name, price, inventory = 0) => {
  try {
    const product = new Product({ name, price, inventory });
    await product.save();
    console.log(`Product ${name} created with price ${price} and inventory ${inventory}`);
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: "Failed to create product" };
  }
};



// Increase inventory
const increaseInventory = async (name, quantity) => {
  try {
    const incrementValue = Number(quantity);
    if (isNaN(incrementValue) || incrementValue <= 0) {
      return { success: false, message: "Invalid quantity" };
    }

    const product = await Product.findOne({ name });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    product.inventory += incrementValue;
    product.lastModified = Date.now();
    await product.save();

    console.log(`Increased inventory for ${name} by ${incrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error increasing inventory:", error);
    return { success: false, message: "Failed to increase inventory" };
  }
};

// Decrease inventory
const decreaseInventory = async (name, quantity) => {
  try {
    const decrementValue = Number(quantity);
    if (isNaN(decrementValue) || decrementValue <= 0) {
      return { success: false, message: "Invalid quantity" };
    }

    const product = await Product.findOne({ name });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    if (product.inventory < decrementValue) {
      return { success: false, message: "Insufficient inventory" };
    }

    product.inventory -= decrementValue;
    product.lastModified = Date.now();
    await product.save();

    console.log(`Decreased inventory for ${name} by ${decrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error decreasing inventory:", error);
    return { success: false, message: "Failed to decrease inventory" };
  }
};

// Get current inventory
const getInventory = async (name) => {
  try {
    const product = await Product.findOne({ name });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error getting inventory:", error);
    return { success: false, message: "Failed to get inventory" };
  }
};

module.exports = { increaseInventory, decreaseInventory, getInventory, createProduct,updateProductPrice };
