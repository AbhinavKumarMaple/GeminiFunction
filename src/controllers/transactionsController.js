const Transaction = require('../models/Transaction');

const getLast10Transactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching last 10 transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

module.exports = {
  getLast10Transactions,
};
