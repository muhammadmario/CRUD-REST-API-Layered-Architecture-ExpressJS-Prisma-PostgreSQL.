const express = require("express");
const dotenv = require("dotenv");
const productController = require("./product/product.controller");
const authController = require("./auth/auth.controller");
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/", authController);

app.get("/api", (req, res) => {
  res.send("hello worldss");
});

app.use("/products", verifyToken, productController);

app.listen(PORT, () => {
  console.log(`express api running in port ${PORT}`);
});
