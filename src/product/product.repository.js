// berkomunikasi dengan database
// boleh pake ORM, boleh pake raw Query
// supaya kalau ganti ORM disini aja

const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductsById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id: id } });
  return product;
};

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      image: newProductData.image,
    },
  });

  return product;
};

const editProduct = async (id, newProductData) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: newProductData.name,
      price: newProductData.price,
      image: newProductData.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  findProducts,
  findProductsById,
  insertProduct,
  editProduct,
  deleteProduct,
};
