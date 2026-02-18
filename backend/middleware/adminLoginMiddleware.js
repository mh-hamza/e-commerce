import bcrypt from "bcryptjs";


const ADMIN_EMAIL = "admin@saadstore.com";


const ADMIN_PASSWORD_HASH =
  "$2a$10$REPLACE_WITH_YOUR_HASH";

const adminLoginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid admin email" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid admin password" });
  }

  next();
};

export default adminLoginMiddleware;
