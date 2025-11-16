const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  try {
    const { amount, category, type } = req.body;

    const t = await Transaction.create({
      amount,
      category,
      type,
      user_id: req.user.id
    });

    res.status(201).json(t);
  } catch (e) {
    res.status(500).json({ message: "Error creating transaction" });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const t = await Transaction.findAll({ where: { user_id: req.user.id } });
    res.json(t);
  } catch (e) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
