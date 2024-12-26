const mongoose = require("mongoose");

// Schema
const manSchema = new mongoose.Schema({
  man_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  poster: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    default: "Men",
  },
});

const manData = mongoose.model("manData", manSchema);
module.exports = { manData };
