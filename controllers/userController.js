const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//register user
const registerUser = async (req, res) => {
  //get user from client
  const { name, email, password } = req.body;

  //validation
  try {
    // check if email and password is exists
    if (!email || !password) {
      return res.status(400).send({ message: "All fields required" });
    }
    // check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).send({ message: "The email is exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({ name, email, password: hashPassword });

    // create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validation
  try {
    // check if email and password is exists
    if (!email || !password) {
      return res.status(400).send({ message: "All fields required" });
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "The user is not exits" });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // for real project we will not show this message for wrong password
      return res.status(400).send({ message: "Password is wrong" });
    }

    // create token
    const token = createToken(user._id);
    user.isActive = true;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//post photo
const photoPost = async (req, res) => {
  try {
    const user = req.user;
    const file = req.file;
    user.userPhoto = file.path;
    await User.findOneAndUpdate(user._id, user);

    res.status(200).send({ message: "User photo updated" });
  } catch (error) {
    res.status(400).send({ message: "Upload only photos like jpg png pdf" });
  }
};

module.exports = { registerUser, loginUser, photoPost };
