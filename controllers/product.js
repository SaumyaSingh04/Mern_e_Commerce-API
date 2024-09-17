const Product = require("../models/product.js");

// Add product
const addProduct = async (req, res) => {
    const { title, discription, price, category, qty, imgsrc } = req.body;
    try {
        let product = await Product.create({
            title,
            discription,
            price,
            category,
            qty,
            imgsrc,
        });
        res.json({ message: "Product added successfully", product, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });  
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        let products = await Product.find().sort({ createdAt: -1 });
        res.json({ products, success: true });  
    } catch (error) {
        res.json({ message: error.message, success: false });  
    }
};
// Get product by id
const getProductByid = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id);
        res.json({ product, success: true });  
        if(!product) return res.json({ message: "invalid id"})
    } catch (error) {
        res.json({ message: error.message, success: false });  
    }
};

//update product by id
const updateProductByid = async (req, res) => { 
 const id = req.params.id;
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({ message: "invalid id"});  
            res.json({ product, message:"product has been updated",success: true });  
    };
//update product by id
const deleteProductByid = async (req, res) => { 
 const id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        if(!product) return res.json({ message: "invalid id"});  
            res.json({ product, message:"product has been deleted",success: true });  
    };

module.exports = {
    addProduct,
    getProducts, 
    getProductByid, 
    updateProductByid,
    deleteProductByid,
};
