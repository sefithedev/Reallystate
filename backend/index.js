const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");

const app = express();

// DB connection
mongoose
  .connect(
    process.env.MONGODB_URL.replace("<user>", process.env.MONGODB_USER).replace(
      "<password>",
      process.env.MONGODB_PASSWORD
    )
  )
  .then(() => console.log("MONGODB connection success"))
  .catch(() => console.log("MONGODB connection failed"));

// Routes and middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);

// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
