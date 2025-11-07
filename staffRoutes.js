const express = require("express");
const router = express.Router();
const Staff = require("./Staff");

// ✅ Test route (health check)
router.get("/", (req, res) => {
  res.json({ success: true, msg: "Levi Staff API working fine 🚀" });
});

// ✅ Get all staff
router.get("/staff", async (req, res) => {
  const staffList = await Staff.find();
  res.json(staffList);
});

// ✅ Add staff
router.post("/addStaff", async (req, res) => {
  const newStaff = new Staff(req.body);
  await newStaff.save();
  res.json({ success: true, msg: "Staff added successfully" });
});

// ✅ Update staff
router.put("/updateStaff/:id", async (req, res) => {
  await Staff.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, msg: "Staff updated successfully" });
});

// ✅ Delete staff
router.delete("/deleteStaff/:id", async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ success: true, msg: "Staff deleted successfully" });
});

module.exports = router;
