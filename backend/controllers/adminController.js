import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d", });

  res.json({ success: true, token, role: "admin", message: "Admin login successful" });
};


const adminLogout = async (req, res) => {

  res.json({ success: true, message: "Admin logout successful" });
}

export { adminLogin, adminLogout }