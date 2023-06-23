// imports
const Order = require("../models/orderModel");

//update status
const updateStatus = async (req, res) => {};

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

module.exports = { updateStatus, allOrders, oneOrderByClient, oneOrderByOrder };
