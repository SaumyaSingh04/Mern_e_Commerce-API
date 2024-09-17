const Cart = require("../models/cart.js"); // Import the Cart model

// Add to Cart
const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgsrc } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] }); 
  }
   
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
 
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty; 
  } else {
    cart.items.push({ productId, title, price, qty, imgsrc });
  }

  await cart.save();
  res.json({ message: "Items added to cart", cart });
};

// Get User Cart
const userCart = async (req, res) => {
  const userId = req.user;
   
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  res.json({ message: "User cart", cart });
};

// Remove Product from Cart
const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

  await cart.save();

  res.json({ message: "Product removed from cart" });
};

// Clear Cart
const clearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = [];
  await cart.save();

  res.json({ message: "Cart cleared" });
};

// Decrease Quantity from Cart
const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  await cart.save();
  res.json({ message: "Item quantity decreased", cart });
};

module.exports = {
  addToCart,
  userCart,
  removeProductFromCart,
  clearCart,
  decreaseProductQty,
};
