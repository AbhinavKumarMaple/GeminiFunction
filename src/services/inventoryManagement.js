const Product = require("../models/Product");

const updateProductPrice = async (name, newPrice) => {
    try {
        const productName = name?.toLocaleLowerCase()
        console.log("updateProductPrice", name, newPrice)
      const priceValue = Number(newPrice);
      if (isNaN(priceValue) || priceValue <= 0) {
        return { success: false, message: "Invalid price" };
      }
  
      const product = await Product.findOne({ name:productName });
      if (!product) {
        return { success: false, message: "Product not found" };
      }
  
      product.price = priceValue;
      product.lastModified = Date.now();
      await product.save();
  
      console.log(`Updated price for ${productName} to ${priceValue}`);
      return { success: true, price: product.price };
    } catch (error) {
      console.error("Error updating product price:", error);
      return { success: false, message: "Failed to update product price" };
    }
  };

const createProduct = async (name, price, inventory = 0) => {
  try {
    const productName = name.toLocaleLowerCase()
    console.log("createProduct",(name, price, inventory))

    const product = new Product({ name:productName, price, value:inventory });
    await product.save();
    console.log(`Product ${productName} created with price ${price} and inventory ${inventory}`);
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: "Failed to create product" };
  }
};



// Increase inventory
const increaseInventory = async (name, quantity) => {
  try {
    const productName = name.toLocaleLowerCase()
    console.log("increaseInventory",name, quantity)

    const incrementValue = Number(quantity);
    if (isNaN(incrementValue) || incrementValue <= 0) {
      return { success: false, message: "Invalid quantity" };
    }

    const product = await Product.findOne({ name:productName });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    product.inventory += incrementValue;
    product.lastModified = Date.now();
    await product.save();

    console.log(`Increased inventory for ${productName} by ${incrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error increasing inventory:", error);
    return { success: false, message: "Failed to increase inventory" };
  }
};

// Decrease inventory
const decreaseInventory = async (name, quantity) => {
  try {
    console.log("decreaseInventory",(name, quantity))

    const productName = name.toLocaleLowerCase()
    const decrementValue = Number(quantity);
    if (isNaN(decrementValue) || decrementValue <= 0) {
      return { success: false, message: "Invalid quantity" };
    }

    const product = await Product.findOne({ name:productName });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    if (product.inventory < decrementValue) {
      return { success: false, message: "Insufficient inventory" };
    }

    product.inventory -= decrementValue;
    product.lastModified = Date.now();
    await product.save();

    console.log(`Decreased inventory for ${productName} by ${decrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error decreasing inventory:", error);
    return { success: false, message: "Failed to decrease inventory" };
  }
};

// Get current inventory
const getInventory = async (name) => {
  try {
    console.log("getInventory",(name))

    const productName = name.toLocaleLowerCase()
    const product = await Product.findOne({ name:productName });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error getting inventory:", error);
    return { success: false, message: "Failed to get inventory" };
  }
};


const getProductPrice = async (productName) => {
    try {
        console.log("getProductPrice",(productName))
        const productName = name.toLocaleLowerCase()

      const product = await Product.findOne({ name: productName });
      console.log("getProductPrice",product)
      if (!product) {
        return { success: false, message: "Product not found" };
      }
      return { success: true, price: product.price };
    } catch (error) {
      console.error("Error fetching product price:", error);
      return { success: false, message: "Failed to fetch product price" };
    }
  };

module.exports = { increaseInventory, decreaseInventory, getInventory, createProduct,updateProductPrice,getProductPrice };
