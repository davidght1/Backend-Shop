require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();


// import routes
const userRoutes = require('./routes/userRouter')
const productRoutes = require('./routes/productsRouter')
const orderRoutes = require('./routes/orderRouter')

//middleware
app.use(express.json());

// routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
