const express = require("express");
const bodyParser = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const productRouter = require("./routes/product.js");
const addToCartRouter = require("./routes/cart.js");
const addressRouter = require("./routes/address.js");
const paymentRouter = require("./routes/payment.js");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Home route test
app.get("/", (req, res) => {
  res.send("hello homepage");
});

// User Router
app.use("/api/user", userRouter);

// product Router
app.use("/api/product", productRouter);

//add to cart Router
app.use("/api/cart", addToCartRouter);

// user shipping Router
app.use("/api/address", addressRouter);

//user payment Router
app.use("/api/payment", paymentRouter);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://soab0419:fT2LV3FsLaeNOtmV@cluster-e-commerce.drubt.mongodb.net/",
    {
      dbName: "mern_e_commerce",
    }
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
