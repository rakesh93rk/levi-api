const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 👈 4-digit custom ID
  name: String,
  mobile: String,
  password: String,
  active: { type: Boolean, default: true },
  deviceid: { type: String, default: "" },
  disabled: { type: Boolean, default: false }
});

module.exports = mongoose.model("Staff", staffSchema);
