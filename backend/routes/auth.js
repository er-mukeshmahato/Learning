const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUserDetail=require("../middleware/fetchuserdetail");
const router = express.Router();
//write into environment variables
const JWT_SECRET = "ThisIsTestForJwtToken";

//Route 1: Create a User: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters"),
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({
          errors: errors.array().map((error) => ({ msg: error.msg })),
        });
      }

      // Destructure the properties from req.body
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User with this email already exists" }] });
      }

      // Use the create method on the User model
      const newUser = await User.create({
        name,
        email,
        password: hashPassword, // Fix: Use the hashed password here
      });

      // Generate JWT token for the new user
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwtToken.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//ROute 2: Authenticate a User: POST "/api/auth/login". Doesn't require Auth
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid Email."),
    body("password").exists().withMessage("Password cannot be blank."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({
          errors: errors.array().map((error) => ({ msg: error.msg })),
        });
      }

      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      // Compare password using bcryptjs
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      // Generate JWT token for the authenticated user
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwtToken.sign(payload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//ROute 3: Get a User Detail: POST "/api/auth/getuserdetail".  Require Auth

router.post(
  "/getuserdetail",fetchUserDetail,
  async (req, res) => {
    try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
