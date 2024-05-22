const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { decrementCounter } = require("../services/decrementCounter");
// const { incrementCounter } = require("../services/incrementCounter");
// const { getCurrentProductNumber } = require("../services/getProductNumber"); 
const { increaseInventory, decreaseInventory, getInventory,createProduct,updateProductPrice, getProductPrice } = require("../services/inventoryManagement");
const { updateMultipleInventories } = require("../services/updateMultipleInventories");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Existing function declarations



const getCurrentProductNumberFunctionDeclaration = {
  name: "getCurrentProductNumber",
  parameters: {
    type: "OBJECT",
    description: "Retrieve the current product count",
    properties: {},
    required: [],
  },
};

// New function declarations
const createProductFunctionDeclaration = {
  name: "createProduct",
  parameters: {
    type: "OBJECT",
    description: "Create a new product",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the product in english",
      },
      price: {
        type: "NUMBER",
        description: "Price of the product",
      },
      inventory: {
        type: "NUMBER",
        description: "Initial inventory value of the product",
      },
    },
    required: ["name", "price"],
  },
};

const increaseInventoryFunctionDeclaration = {
  name: "increaseInventory",
  parameters: {
    type: "OBJECT",
    description: "Increase the inventory of a product",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the product in english",
      },
      quantity: {
        type: "NUMBER",
        description: "Quantity to increase",
      },
    },
    required: ["name", "quantity"],
  },
};

const decreaseInventoryFunctionDeclaration = {
  name: "decreaseInventory",
  parameters: {
    type: "OBJECT",
    description: "Decrease the inventory of a product",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the product in english",
      },
      quantity: {
        type: "NUMBER",
        description: "Quantity to decrease",
      },
    },
    required: ["name", "quantity"],
  },
};

const getInventoryFunctionDeclaration = {
  name: "getInventory",
  parameters: {
    type: "OBJECT",
    description: "Get the current inventory of a product",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the product in english",
      },
    },
    required: ["name"],
  },
};

const updateProductPriceFunctionDeclaration = {
  name: "updateProductPrice",
  parameters: {
    type: "OBJECT",
    description: "Update the price of a product",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the product in english",
      },
      newPrice: {
        type: "NUMBER",
        description: "New price of the product",
      },
    },
    required: ["name", "newPrice"],
  },
};
const getProductPriceFunctionDeclaration = {
  name: "getProductPrice",
  parameters: {
    type: "object",
    description: "Retrieve the price of a specified product by its name in english",
    properties: {
      productName: {
        type: "string",
        description: "The name of the product in english if its a fruit give its english name",
      },
    },
    required: ["productName"],
  },
};

const functions = {
  createProduct: ({ name, price, inventory }) => {
    console.log("createProduct")
    return createProduct(name, price, inventory);
  },
  increaseInventory: ({ name, quantity }) => {
    console.log("increaseInventory")

    return increaseInventory(name, quantity);
  },
  decreaseInventory: ({ name, quantity }) => {
    console.log("decreaseInventory")

    return decreaseInventory(name, quantity);
  },
  getInventory: ({ name }) => {
    console.log("getInventory")

    return getInventory(name);
  },
  updateProductPrice: ({ name, newPrice }) => {
    console.log("updateProductPrice")

    return updateProductPrice(name, newPrice);
  },
  getProductPrice: ({ productName }) => {
    console.log("getProductPrice")

    return getProductPrice(productName);
  },
};

const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  tools: {
    functionDeclarations: [
      getCurrentProductNumberFunctionDeclaration,
      createProductFunctionDeclaration,
      increaseInventoryFunctionDeclaration,
      decreaseInventoryFunctionDeclaration,
      getInventoryFunctionDeclaration,
      updateProductPriceFunctionDeclaration,
      getProductPriceFunctionDeclaration
    ],
  },
});

const handleGeminiRequest = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const chat = generativeModel.startChat();
    const result = await chat.sendMessage(query);
    const call = result.response.functionCalls()[0];
    if (call) {
      const apiResponse = await functions[call.name](call.args);
      const result2 = await chat.sendMessage([
        {
          functionResponse: {
            name: call.name,
            response: apiResponse,
          },
        },
      ]);
      res.status(200).json({ message: result2.response.text() });
    } else {
      res.status(200).json({ message: result.response.text() });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateInventories = async (req,res)=>{
  try {
    const { data } = req.body;
    // console.log("reacttime data", typeof JSON.stringify(data), JSON.parse(JSON.stringify(data)) )
    const result = await updateMultipleInventories(data)
    if(result.success==true){
      res.status(200).json({ message: "done" });
    }else{
      res.status(200).json({ message: "error" });

    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = { handleGeminiRequest,updateInventories };