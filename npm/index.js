const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {user_router}= require("./src/routes/user")
const { man_routes } = require("./src/routes/man");
const{Order_man_Router}=require("./src/routes/order_man")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the API" });
});

// Routes
app.use("/user",user_router);
app.use("/man", man_routes);
app.use("/orderman", Order_man_Router);

// Server and DB connection
const PORT = process.env.PORT || 1604;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // No need for extra options
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }

  console.log(`Server started at http://localhost:${PORT}/`);
});
