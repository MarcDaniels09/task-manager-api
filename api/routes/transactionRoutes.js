const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTransaction, getMyTransactions } = require('../controllers/transactionController');

router.post('/', auth, createTransaction);
router.get('/', auth, getMyTransactions);

module.exports = router;
