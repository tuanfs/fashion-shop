const jwt = require("jsonwebtoken");

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyTokenAdmin;
