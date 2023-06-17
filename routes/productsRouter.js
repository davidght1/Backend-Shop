const express = require("express");

const router = express.Router();

// controllers functions
const {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/productController");
const {isAuthAdmin} = require('../middlewares/isAuthAdmin')

// get products (all)
router.get("/", getProducts);

//update product (all)
router.patch("/:id", updateProduct);

// add product (only admin)
router.post("/",isAuthAdmin,  addProduct);
// delete product (only admin)
router.delete("/:id",isAuthAdmin, deleteProduct);

module.exports = router;
