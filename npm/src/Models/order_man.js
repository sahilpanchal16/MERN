const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  poster: {
    type: String,
  },
 man_name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  totalAmount: {
    type: Number, // Ensure you add this to match your usage in the controller
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: String,

});

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
