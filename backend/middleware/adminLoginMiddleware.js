import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@saadstore.com";


const ADMIN_PASSWORD_HASH = "$2b$10$ehdaIBvkDjYwRgDc/YwhseDvH5I1RuNBGEojHK.TB4POqE00As8Wu";


const adminLoginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ success: false, message: "Invalid admin email" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid admin password" });
  }

  next();
};
const adminVerifyMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Auth Header Missing" })
  }
  const token = authHeader.split(" ")[1];
  // console.log(token)

  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid or Missing Token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
}
export { adminLoginMiddleware, adminVerifyMiddleware }
