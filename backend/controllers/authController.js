const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ================= SIGNUP =================

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Name validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Email validation
    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Password validation
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email required
    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Password required
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  signup,
  login,
  profile,
};