const express = require("express");
const { createUser, loginUser, refreshToken } = require("./auth.service");
const prisma = require("../db");
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
    const login = await loginUser(userData, res);

    res.status(200).json({
      accessToken: login,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/refresh", async (req, res) => {
  try {
    const getRefreshToken = req.cookies.refreshToken;
    const token = await refreshToken(getRefreshToken, res);
    res.status(200).json({
      accessToken: token,
      message: "Refresh token successful",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
