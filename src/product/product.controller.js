// layer untuk request dan response
// biasanya juga handle verifikasi body

const express = require("express");
const {
  getAllProducts,
  getProductsById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductsById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);
    res.send({
      data: product,
      message: "add product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const newProductData = req.body;
    if (
      !(newProductData.name && newProductData.price && newProductData.image)
    ) {
      res.status(400).send("some field are misssing");
    }
    const product = await editProductById(productId, newProductData);

    res.send({
      data: product,
      message: "edit product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const newProductData = req.body;

    const product = await editProductById(productId, newProductData);

    res.send({
      data: product,
      message: "edit product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await deleteProductById(productId);

    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
