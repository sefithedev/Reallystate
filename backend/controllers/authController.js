const authController = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
authController.post("/register", async (req, res) => {
  try {
    // serach user in DB
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(409)
        .json("This email is already registered, please log in");
    }

    // hash the user password
    const hasedPassword = await bcrypt.hash(req.body.password, 10);

    // create the user document in DB with the hashed password
    const user = new User({ ...req.body, password: hasedPassword });
    await user.save();

    // get user data without the password - this would be sent to the frontend
    const { password, ...userData } = user.toObject();
    console.log(userData);
    // create JWT token (register will automatically log the user in)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    // send user data and new token to frontend
    return res.status(201).json({ userData, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(err.message);
  }
});

// login
authController.post("/login", async (req, res) => {
  try {
    // fetch the user
    const userExists = await User.findOne({ email: req.body.email });

    // if user is not in DB - send error messgae to frontend
    if (!userExists) {
      return res.status(404).json({
        message: "Wrong credentials",
      });
    }

    // compare passwords
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    // if passwords are not a match - send error message to frontend
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    // create new token
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    const { password, ...userData } = userExists.toObject();

    return res.status(200).json({ userData, token });
  } catch (error) {
    return res.status(500).json(err.message);
  }
});

module.exports = authController;
