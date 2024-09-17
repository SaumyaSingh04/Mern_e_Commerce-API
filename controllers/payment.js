const Payment = require("../models/payment"); // Import Payment model

// Function to handle COD checkout
const codCheckout = async (req, res) => {
  try {
    const { userId, cartItems, userShipping, amount } = req.body;

    // Validate request data
    if (!userId || !cartItems || !userShipping || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Create new order in the database
    const newOrder = new Payment({
      userId,
      cartItems,
      userShipping,
      amount,
      payStatus: "Pending", // COD orders are usually marked as "Pending" until delivered
      paymentMethod: "Cash on Delivery",
    });

    await newOrder.save(); // Save the order

    res.status(200).json({
      success: true,
      message: "Order placed successfully with Cash on Delivery.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function to get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all orders for the specific user
    const orders = await Payment.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user." });
    }

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};



module.exports = {
  codCheckout, // Export the COD checkout function
  getUserOrders, // Export the function to get user-specific orders
};
