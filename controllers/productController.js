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
  // const {id} = req.params
  // const {category} = req.body
  // try {
  //   const product = await Product.findOne({id})
  // } catch (error) {
    
  // }
};

//for admins only

// add a product
const addProduct = async (req, res) => {
  let { barcode,stock,name,category,isActive} = req.body
  console.log(barcode)
  console.log(name)
  // check if we have the name field and the barcode field
  try {
    if(!name || !barcode){
      return res.status(400).send({message: 'The name and barcode is required'})
    }
    //if stock more then 0 so isActive need to be true
    if(stock>0){
      isActive=true
    }
    const product = await Product.create({ barcode, stock, name, category, isActive})
   
    res.status(200).json({product})

  } catch (error) {
      return res.status(400).send({error: error.message})
  }
};

// add photo
const addPhoto = async (req,res)=>{
  res.send({ message: "add photo" });
}

// delete a product
const deleteProduct = async (req, res) => {
  res.send({ message: "delete products" });
};



module.exports = { getProducts, updateProduct, addProduct, deleteProduct, addPhoto };
