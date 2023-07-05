// logic if else, handling error disini

const {
  findProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductsById = async (id) => {
  const product = await findProductsById(id);

  if (!product) {
    throw Error("product not found");
  }
  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);

  return product;
};

const editProductById = async (id, newProductData) => {
  await getProductsById(id);

  const product = await editProduct(id, newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductsById(id);

  await deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  deleteProductById,
  editProductById,
};
