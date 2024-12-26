const express = require("express");
const {
  checkOut,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("../Controllers/order_man");

const Order_man_Router = express.Router();
Order_man_Router.post("/order", checkOut);
Order_man_Router.get("/get", getOrder);
Order_man_Router.delete("/delete/:id", deleteOrder);
Order_man_Router.put("/update/:id", updateOrder);

module.exports = { Order_man_Router };
