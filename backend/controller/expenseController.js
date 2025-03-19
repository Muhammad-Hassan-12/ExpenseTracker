const Expense = require("../Models/expenseModel");
const User = require("../Models/userModel");

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.status(200).json(expenses);
};

const addExpense = async (req, res) => {

  const { title, amount, category, date } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newExpense = await Expense.create({
    title,
    amount,
    category,
    date,
    user: req.user._id,
  });

  res.status(201).json(newExpense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ message: "User does not exist" });

  if (expense.user.toString() !== user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const { title, amount, category, date } = req.body;

  // only update the fields that are provided using nullish coalescing operator
  expense.title = title ?? expense.title;
  expense.amount = amount ?? expense.amount;
  expense.category = category ?? expense.category;
  expense.date = date ?? expense.date;

  await expense.save();

  res.status(200).json({
    data: expense,
    status: 200,
    message: "Expense updated successfully",
  });
};

const deleteExpense = async (req, res) => {

  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ message: "User does not exist" });

  if (expense.user.toString() !== user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense };
