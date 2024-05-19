const Counter = require("../models/Counter");

const decrementCounter = async (number) => {
  try {
    // Check if number is a number and convert it to a number type if it's a string
    const decrementValue = Number(number);
    if (isNaN(decrementValue))
      return { success: false, message: "Invalid number" };

    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count -= decrementValue;
    await counter.save();

    console.log(
      `Counter value decremented by ${decrementValue}. New value: ${counter.count}`
    );
    return { success: true, newCount: counter.count };
  } catch (error) {
    console.error("Error decrementing counter:", error);
    return { success: false, message: "Failed to decrement counter" };
  }
};

module.exports = { decrementCounter };
