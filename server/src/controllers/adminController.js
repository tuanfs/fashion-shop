const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing name or password" });
  }
  try {
    const admin = await Admin.findOne({ name });
    if (!admin || password !== admin.password) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect name or password" });
    }
    const accessTokenAdmin = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_ADMIN_SECRET
    );
    res.json({
      success: true,
      message: "Login admin successfully",
      accessTokenAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// Check if admin logged
exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }
    res.json({ success: true, message: "Admin logged successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
