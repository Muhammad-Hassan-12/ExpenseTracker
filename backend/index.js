const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

const connectDB = require("./config/db");


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/user", require("./routes/userRoutes"));


// app.listen(port, async () => {
//   console.log(`Server is running on port ${port}`);

//   try {
//     await connectDB();
//     console.log("Database connected");
//   } catch (error) {
//     console.error("Failed to connect to database");
//     process.exit(1);
//   }
// });

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
