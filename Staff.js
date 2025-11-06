const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  id: String,
  name: String,
  mobile: String,
  password: String,
  active: { type: String, default: "FALSE" },
  deviceid: { type: String, default: "" },
  disabled: { type: String, default: "FALSE" }
});

module.exports = mongoose.model("Staff", staffSchema);
