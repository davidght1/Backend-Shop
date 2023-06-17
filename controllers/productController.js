// imports
const Product = require("../models/productModel");

//get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// update a product stock
const updateProduct = async (req, res) => {
  res.send({ message: "update products" });
};

//for admins only

// add a product
const addProduct = async (req, res) => {
  res.send({ message: "add product" });
};
// delete a product
const deleteProduct = async (req, res) => {
  res.send({ message: "delete products" });
};

module.exports = { getProducts, updateProduct, addProduct, deleteProduct };
