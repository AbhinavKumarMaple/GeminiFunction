const { GoogleGenerativeAI } = require("@google/generative-ai");
const { decrementCounter } = require("../services/decrementCounter");
const { incrementCounter } = require("../services/incrementCounter");
const { getCurrentProductNumber } = require("../services/getProductNumber");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const decrementCounterFunctionDeclaration = {
  name: "decrementCounter",
  parameters: {
    type: "NUMBER",
    description: "decrement the number of the product",
    properties: {
      number: {
        type: "NUMBER",
        description: "number which will be use to decrement",
      },
    },
    required: ["number"],
  },
};
const incrementCounterFunctionDeclaration = {
  name: "incrementCounter",
  parameters: {
    type: "NUMBER",
    description: "increment the number of the product",
    properties: {
      number: {
        type: "NUMBER",
        description: "number which will be use to increment",
      },
    },
    required: ["number"],
  },
};

const getProductnumberFunctionDeclaration = {
  name: "getCurrentProductNumber",
  parameters: {
    description: "give product amount/number",
    properties: {},
    required: [],
  },
};

const functions = {
  decrementCounter: ({ number }) => {
    return decrementCounter(number);
  },
  incrementCounter: ({ number }) => {
    return incrementCounter(number);
  },
  getCurrentProductNumber: () => {
    return getCurrentProductNumber();
  },
};

const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  tools: {
    functionDeclarations: [
      decrementCounterFunctionDeclaration,
      incrementCounterFunctionDeclaration,
      getProductnumberFunctionDeclaration,
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

module.exports = { handleGeminiRequest };
