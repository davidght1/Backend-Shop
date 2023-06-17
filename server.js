require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();


// import routes
const userRoutes = require('./routes/userRouter')
const productRoutes = require('./routes/productsRouter')

//middleware
app.use(express.json());

// routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
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
