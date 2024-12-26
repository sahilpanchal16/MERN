const express = require("express");
const path = require("path"); // Import path module
const { authToken } = require("../Middlewares/tokenAuth");
const {
  getman,
  createman,
  updateman,
  deleteman,
  upload,
} = require("../Controllers/man");

const man_routes = express.Router();

// Serve static files for images
man_routes.use("/img", express.static(path.join(__dirname, "../imgs")));

// Routes
man_routes.get("/get", authToken, getman);
man_routes.post("/create", authToken, upload.single("poster"), createman);
man_routes.put("/update/:id", authToken, upload.single("poster"), updateman);
man_routes.delete("/delete/:id", authToken, deleteman);

module.exports = { man_routes };
