const express = require("express");

const router = express.Router();

// controllers functions
const {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct
} = require("../controllers/productController");
const {isAuthAdmin} = require('../middlewares/isAuthAdmin')
const multer = require("multer");
const fs = require("fs");

// start setting multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync(`./uploads/products/${req.body.name}`)){
        fs.mkdirSync(`./uploads/products/${req.body.name}`)
    }
    cb(null, `./uploads/products/${req.body.name}`);
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file.
    cb(null, file.originalname);
  },
});
//end of setting multer
// Configure storage engine instead of dest object.
const upload = multer({ storage: storage });

// get products (all)
router.get("/", getProducts);

//update product (all)
router.patch("/:id", updateProduct);

// add product (only admin)
router.post("/",isAuthAdmin,upload.single("file"), addProduct);

// delete product (only admin)
router.delete("/:id",isAuthAdmin, deleteProduct);

module.exports = router;
