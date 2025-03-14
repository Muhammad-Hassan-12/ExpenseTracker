const Expense = require('../Models/expenseModel');
const User = require('../Models/userModel');

const getExpenses = async (req, res) => {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
}

const addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newExpense = await Expense.create({
        title,
        amount,
        category,
        date,
        user: user._id
    });

    res.status(201).json(newExpense);
}

const updateExpense = async (req, res) => {  
    const Expense = await Expense.findById(req.params.id);
    if (!Expense) return res.status(404).json({ msg: 'Expense not found' });

    const user = await User.findById(req.user.id);
if (!user) return res.status(400).json({ message: 'User does not exist' });

if(goal.user.toString() !== user.id) {
    return res.status(401).json({ message: 'User not authorized' });
    }
    
    const updateExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateExpense);
}

const deleteExpense = async (req, res) => {
    const Expense = await Expense.findById(req.params.id);
    if (!Expense) return res.status(404).json({ msg: 'Expense not found' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    if (goal.user.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
}

module.exports = { getExpenses, addExpense , updateExpense, deleteExpense };