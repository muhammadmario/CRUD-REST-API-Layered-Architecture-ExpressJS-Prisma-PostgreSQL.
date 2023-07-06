const express = require("express");
const dotenv = require("dotenv");
const productController = require("./product/product.controller");
const authController = require("./auth/auth.controller");

const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());

app.use("/", authController);

app.get("/api", (req, res) => {
  res.send("hello worldss");
});

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`express api running in port ${PORT}`);
});
