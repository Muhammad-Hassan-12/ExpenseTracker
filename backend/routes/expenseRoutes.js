const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');

const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controller/expenseController');

router.route('/').get(authenticate, getExpenses).post(authenticate, addExpense);
router.route('/:id').put(authenticate, updateExpense).delete(authenticate, deleteExpense);

module.exports = router;