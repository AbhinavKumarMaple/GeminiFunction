const Counter = require("../models/Counter");

const incrementCounter = async (number) => {
  try {
    // Check if number is a number and convert it to a number type if it's a string
    const incrementValue = Number(number);
    if (isNaN(incrementValue))
      return { success: false, message: "Invalid number" };

    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count += incrementValue;
    await counter.save();

    console.log(
      `Counter value incremented by ${incrementValue}. New value: ${counter.count}`
    );
    return { success: true, newCount: counter.count };
  } catch (error) {
    console.error("Error incrementing counter:", error);
    return { success: false, message: "Failed to increment counter" };
  }
};

module.exports = { incrementCounter };
