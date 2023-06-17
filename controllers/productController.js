//get all products
const getProducts = async (req, res) => {
    res.send({message: "get all products"})
};

// update a product
const updateProduct = async (req, res) => {
    res.send({message: "update products"})
};

//for admins only

// add a product
const addProduct = async (req, res) => {
    res.send({message: "add product"})
};
// delete a product
const deleteProduct = async (req, res) => {
    res.send({message: "delete products"})
};

module.exports = { getProducts, updateProduct, addProduct, deleteProduct };
