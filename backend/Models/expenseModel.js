const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Food',
            'Transportation',
            'Utilities',
            'Shopping',
            'HealthCare',
            'Entertainment',
            'Rent',
            'Others'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
    });

    module.exports = mongoose.model('Expense', expenseSchema);