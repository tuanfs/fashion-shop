const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

exports.checkEmailUser = async (req, res) => {
  const { email } = req.body;
  try {
    const emailInValid = await User.findOne({ email: email });
    if (emailInValid) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    res.json({ success: true, message: "Email valid" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Missing name or email or password" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    res.json({
      success: true,
      message: "Register user successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or passwordd",
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id, userEmail: user.email, userName: user.name },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "Login user successfully",
      accessToken,
      user: {
        userEmail: user.email,
        userName: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect password" });
  }
  try {
    const user = await User.findOne({ _id: req.userId });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(401)
        .json({ success: false, message: "User unauthorised" });
    }
    const hashedPassword = await argon2.hash(newPassword);
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        password: hashedPassword,
      }
    );
    res.json({ success: true, message: "Changed password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
