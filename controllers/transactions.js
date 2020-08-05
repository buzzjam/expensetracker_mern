const Transaction = require("../models/Transaction");

//Get transactions
//route  GET /api/v1/transaction
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      count: transactions.length,
      data: transactions,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Server error",
      success: false,
    });
  }
};

//Add transactions
//route  POST /api/v1/transaction
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      data: transaction,
      success: true,
    });
  } catch (e) {
    const messages = [];

    for (let key in e.errors) {
      messages.push(e.errors[key].properties.message);
    }
    
    if (messages.length > 0) {
      return res.status(400).json({
        error: messages,
        success: false,
      });
    } else {
      return res.status(500).json({
        error: "Server error",
        success: false,
      });
    }
  }
};

//Delete transactions
//route  DELETE /api/v1/transaction/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "Transaction not found.",
      });
    }
    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (e) {
    return res.status(500).json({
      error: "Server error",
      success: false,
    });
  }
};
