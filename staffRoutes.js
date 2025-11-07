const express = require("express");
const router = express.Router();
const Staff = require("./Staff");

// ✅ Test route
router.get("/", (req, res) => {
  res.json({ success: true, msg: "Levi Staff API working fine 🚀" });
});

// ✅ Get all staff
router.get("/staff", async (req, res) => {
  const staffList = await Staff.find();
  res.json(staffList);
});

// ✅ Add staff
router.post("/addstaff", async (req, res) => {
  const newStaff = new Staff(req.body);
  await newStaff.save();
  res.json({ success: true, msg: "Staff added successfully" });
});

// ✅ Update (disable / enable / logout)
router.put("/updatestaff/:id", async (req, res) => {
  await Staff.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, msg: "Staff updated" });
});

// ✅ Delete
router.delete("/deletestaff/:id", async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ success: true, msg: "Staff deleted" });
});

module.exports = router;
