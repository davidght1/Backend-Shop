// imports
const Order = require("../models/orderModel");
const User = require('../models/userModel')
const Product = require('../models/productModel')

//create order

const createOrder = async (req,res)=>{
    const {ordernumber, useremail, products, lastprice, address, status} = req.body
    try {

        if(!ordernumber || !useremail || !products || !lastprice || !address || !status){
            return res.status(400).json({message: 'all fields required'})
        }
        const user = await User.findOne({email: useremail})
       
        if(!user){
             return res.status(404).json({message: 'user not found cant create order without field of user'})
        }
        // the id of user we save
        const newuser= user._id

        // the array of ids we gonna save
        const newproducts = []

        for(const productName of products){
            const product = await Product.findOne({name: productName})
            if(!product){
                return res.status(404).json({message: 'problem with products'})
            }
            newproducts.push(product._id)
        }
        
        //check if status (delivered or stand by or sent)
        if(status!=='delivered' && status!=='stand by' && status!=="sent"){
            return res.status(400).json({message: 'Status invalid'})
        }
        
        const order = await Order.create({ordernumber, user: newuser, products: newproducts, lastprice, address, status})
        
        res.status(200).json(order)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//update status
const updateStatus = async (req, res) => {
    const {_id} = req.params
    const {status} = req.body
    try {
        let order = await Order.findOne(_id)
        console.log(order)
        // check if order exists
        if(!order){
            return res.status(404).json({message: 'no order exists'})
        }
        if(status!='delivered' && status!='stand by' && status!="sent"){
            return res.status(400).json({message: 'Status invalid'})
        }
        order.status = status
        order = await order.save()
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
};

//get all orders
const allOrders = async (req, res) => {
  try {
    const order = await Order.find();

    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({message: 'Something goes wrong with find orders'})
  }


};

//order details by user orders
const oneOrderByClient = async (req, res) => {};
//order details by order id
const oneOrderByOrder = async (req, res) => {};

module.exports = { updateStatus, allOrders, oneOrderByClient, oneOrderByOrder, createOrder };
