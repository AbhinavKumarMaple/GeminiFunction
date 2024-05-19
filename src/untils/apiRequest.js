const makeApiRequest = async (currencyFrom, currencyTo) => {
  // This is a mock implementation, replace it with a real API call if needed
  return {
    base: currencyFrom,
    rates: { [currencyTo]: 69 },
  };
};

//write a fucntion which returns hello world

module.exports = { makeApiRequest };
