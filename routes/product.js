const express = require("express");
const {
  addProduct,
  getProducts,
  getProductByid,
  updateProductByid,
  deleteProductByid,
} = require("../controllers/product.js");

const router = express.Router();

//add product router
router.post("/add", addProduct);

//all product
router.get("/all", getProducts);

//get  product by id
router.get("/:id", getProductByid);

//update product by id
router.put("/:id", updateProductByid);

//delete product by id
router.delete("/:id", deleteProductByid);

module.exports = router;
