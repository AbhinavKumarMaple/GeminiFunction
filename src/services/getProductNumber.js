const Counter = require("../models/Counter");

const getCurrentProductNumber = async () => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      return { success: false, message: "Failed to get the value" };
    }
    console.log(`Counter value is ${counter.count}`);
    return { success: true, newCount: counter.count };
  } catch (error) {
    console.error("Error incrementing counter:", error);
    return { success: false, message: "Failed to increment counter" };
  }
};

module.exports = { getCurrentProductNumber };
