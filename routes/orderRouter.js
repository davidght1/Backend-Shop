const express = require("express");

const router = express.Router();

//import all controllers
const {updateStatus,allOrders,oneOrderByClient,oneOrderByOrder} = require('../controllers/orderController')

//update status
router.patch('/:id', updateStatus)
//get all orders
router.get('/', allOrders)
//order details by user orders
router.get('/:id', oneOrderByClient)
//order details by order id
router.get('/:id', oneOrderByOrder)



module.exports = router;