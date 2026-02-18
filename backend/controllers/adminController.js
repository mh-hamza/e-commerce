import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, role: "admin", message: "Admin login successful", });
};
export default adminLogin;