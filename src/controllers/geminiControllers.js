const { GoogleGenerativeAI } = require("@google/generative-ai");
const { makeApiRequest } = require("../untils/apiRequest");
const { decrementCounter } = require("../services/decrementCounter");
const { incrementCounter } = require("../services/incrementCounter");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const getExchangeRateFunctionDeclaration = {
  name: "getExchangeRate",
  parameters: {
    type: "OBJECT",
    description: "Get the exchange rate for currencies between countries",
    properties: {
      currencyFrom: {
        type: "STRING",
        description: "The currency to convert from.",
      },
      currencyTo: {
        type: "STRING",
        description: "The currency to convert to.",
      },
    },
    required: ["currencyTo", "currencyFrom"],
  },
};

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
const incrementCounterCounterFunctionDeclaration = {
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

const functions = {
  getExchangeRate: ({ currencyFrom, currencyTo }) => {
    return makeApiRequest(currencyFrom, currencyTo);
  },
  decrementCounter: ({ number }) => {
    return decrementCounter(number);
  },
  incrementCounter: ({ number }) => {
    return incrementCounter(number);
  },
};

const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  tools: {
    functionDeclarations: [
      getExchangeRateFunctionDeclaration,
      decrementCounterFunctionDeclaration,
      incrementCounterCounterFunctionDeclaration,
    ],
  },
});

const handleGeminiRequest = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    console.log("1");
    const chat = generativeModel.startChat();
    console.log("2");
    const result = await chat.sendMessage(query);
    console.log("3");

    const call = result.response.functionCalls()[0];
    console.log("4");

    if (call) {
      console.log(call.name, call.args);
      const apiResponse = await functions[call.name](call.args);
      console.log("5");
      const result2 = await chat.sendMessage([
        {
          functionResponse: {
            name: call.name,
            response: apiResponse,
          },
        },
      ]);
      console.log(call.name, apiResponse);

      res.status(200).json({ message: result2.response.text() });
    } else {
      res.status(200).json({ message: result.response.text() });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { handleGeminiRequest };
