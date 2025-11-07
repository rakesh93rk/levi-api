require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const staffRoutes = require("./staffRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", staffRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
