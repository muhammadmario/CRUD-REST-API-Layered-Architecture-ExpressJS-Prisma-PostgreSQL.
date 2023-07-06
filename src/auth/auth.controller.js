const express = require("express");
const { createUser, loginUser } = require("./auth.service");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUserData = req.body;
    const registeredUser = await createUser(newUserData);
    res.status(200).json({
      data: registeredUser,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const login = await loginUser(userData);
    res.status(200).json({
      data: login,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
