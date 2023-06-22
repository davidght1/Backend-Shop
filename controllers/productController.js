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
  const {_id} = req.params
  const {newstock} = req.body
  try {
    let product = await Product.findOne(_id)
    //check if no value in newstock
    if(!newstock&&newstock!==0){
      return res.status(200).json({product})
    }
    // set new stock
    product.stock = newstock
    // edit the isActive with out stock
    if(product.stock==0){
      product.isActive=false
    }
    else{
      product.isActive=true
    }
    product = await product.save()
    res.status(200).json({product})
  
  } catch (error) {
    
  }
};



// add a product (admin only)
const addProduct = async (req, res) => {
  let { barcode,stock,name,category,isActive} = req.body
  let file = req.file
  // check if we have the name field and the barcode field
  try {
    if(!name || !barcode){
      return res.status(400).send({message: 'The name and barcode is required'})
    }
    //if stock more then 0 so isActive need to be true
    if(stock>0){
      isActive=true
    }
    const product = await Product.create({ barcode, stock, name, category, isActive, photo: file? file.path : ''})
   
    res.status(200).json({product})

  } catch (error) {
      return res.status(400).send({error: error.message})
  }
};



// delete a product (admin only)
const deleteProduct = async (req, res) => {
  const {id} = req.params
  console.log(id)
  try {
    const product = await Product.findOne({ _id: id });
    console.log(product)
    if(!product){
      return res.status(400).json({message: 'there no product exists'})
    }
    await product.deleteOne()
    res.status(201).json({message: 'product deleted'})
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
};



module.exports = { getProducts, updateProduct, addProduct, deleteProduct };
