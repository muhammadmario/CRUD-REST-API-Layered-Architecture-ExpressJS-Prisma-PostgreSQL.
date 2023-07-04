const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("hello worldss");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return res.status(404).send("product not found");
  }

  res.send(product);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      image: newProductData.image,
    },
  });

  res.send({
    data: product,
    message: "add product success",
  });
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const newProductData = req.body;

  if (!(newProductData.name && newProductData.price && newProductData.image)) {
    return res.status(400).send("some field are misssing");
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: newProductData.name,
      price: newProductData.price,
      image: newProductData.image,
    },
  });

  res.send({
    data: product,
    message: "edit product success",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const newProductData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: newProductData.name,
      price: newProductData.price,
      image: newProductData.image,
    },
  });

  res.send({
    data: product,
    message: "edit product success",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
  });

  res.send("product deleted");
});

app.listen(PORT, () => {
  console.log(`express api running in port ${PORT}`);
});
