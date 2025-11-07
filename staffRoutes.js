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
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.json({
      success: true,
      msg: "Staff added successfully",
      staff: newStaff, // 👈 add this line to return created staff
    });
  } catch (err) {
    console.error("Add Staff Error:", err);
    res.status(500).json({ success: false, msg: "Staff creation failed", error: err.message });
  }
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
