const  dotenv = require('dotenv').config();
const express = require('express');
const app = express();


const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/expense', require('./routes/expenseRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});