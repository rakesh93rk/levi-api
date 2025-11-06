const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");

function genId() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
function genPass() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Create User
router.post("/createUser", async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const id = genId();
    const password = genPass();
    const newUser = new Staff({ id, name, mobile, password });
    await newUser.save();
    res.json({ success: true, msg: "User created", id, password });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// ✅ Get Users
router.get("/getUsers", async (req, res) => {
  const users = await Staff.find();
  res.json(users);
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { id, password, deviceid } = req.body;
  const user = await Staff.findOne({ id });
  if (!user) return res.json({ success: false, msg: "User not found" });
  if (user.disabled === "TRUE") return res.json({ success: false, msg: "User is disabled" });
  if (user.password !== password) return res.json({ success: false, msg: "Incorrect password" });

  user.active = "TRUE";
  user.deviceid = deviceid || "";
  await user.save();

  res.json({ success: true, msg: "Login successful", id });
});

// ✅ Update (Enable/Disable)
router.post("/updateUser", async (req, res) => {
  const { id, disabled } = req.body;
  const user = await Staff.findOne({ id });
  if (!user) return res.json({ success: false, msg: "User not found" });

  user.disabled = disabled;
  user.active = disabled === "TRUE" ? "FALSE" : "TRUE";
  await user.save();

  res.json({ success: true, msg: "User updated" });
});

// ✅ Force Logout
router.post("/forceLogout", async (req, res) => {
  const { id } = req.body;
  const user = await Staff.findOne({ id });
  if (!user) return res.json({ success: false, msg: "User not found" });

  user.active = "FALSE";
  user.deviceid = "";
  await user.save();

  res.json({ success: true, msg: "Force logout done" });
});

// ✅ Delete User
router.delete("/deleteUser", async (req, res) => {
  const { id } = req.body;
  await Staff.deleteOne({ id });
  res.json({ success: true, msg: "User deleted" });
});

module.exports = router;
