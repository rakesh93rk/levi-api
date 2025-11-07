const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  userId: String,
  name: String,
  mobile: String,
  password: String,
  active: { type: Boolean, default: true },
  deviceId: { type: String, default: "" },
  disabled: { type: Boolean, default: false }
});

module.exports = mongoose.model("Staff", StaffSchema);
