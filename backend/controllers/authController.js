import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10)
    const user = await User.create({ fullName, email, phone, password: hashPassword, address });

    return res.status(201).json({ success: true, message: "User registerd Successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not registered" });
    }

    const verifyPassword = await bcryptjs.compare(password, existingUser.password);
    if (!verifyPassword) {
      return res.status(401).json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      userData: { name: existingUser.fullName, email: existingUser.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
};

const verifyUser = async (req, res) => {
  return res.status(200).json({ success: true, message: "User verified successfully", user: req.user })
}
export { registerUser, loginUser, verifyUser };