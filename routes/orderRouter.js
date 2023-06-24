const express = require("express");

const router = express.Router();

//import all controllers
const {updateStatus,allOrders,oneOrderByClient,oneOrderByOrder,createOrder} = require('../controllers/orderController')

//update status
router.patch('/:id', updateStatus)
//get all orders
router.get('/', allOrders)
//order details by user orders
router.get('/userorder', oneOrderByClient)
//order details by order id
router.get('/:id', oneOrderByOrder)
//create order
router.post('/', createOrder)


module.exports = router;