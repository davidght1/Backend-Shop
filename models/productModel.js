const mongoose = require("mongoose");

// counter for Barcode
const count = 0;

const productSchema = mongoose.Schema({
  barcode: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: [],
  },
  photo: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre("save", function (next) {
  const product = this;
  if (product.isNew) {
    product.Barcode = count + 1;
    count++;
  }

  if (product.stock > 0) {
    product.isActive = true;
  } else {
    product.isActive = false;
  }
  next();
});

module.exports = mongoose.model("products", productSchema);
