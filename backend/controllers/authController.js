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
    const user = await User.create({ fullName, email, phone, password: hashPassword });

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
      userData: {
        id: existingUser._id,
        name: existingUser.fullName,
        email: existingUser.email,
        mobile: existingUser.phone,
        address: existingUser.address
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
};

const verifyUser = async (req, res) => {
  return res.status(200).json({ success: true, message: "User verified successfully", user: req.user })
}

const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName: name, email, phone: mobile },
      { returnDocument: 'after' }
    );

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.fullName,
        email: updatedUser.email,
        mobile: updatedUser.phone,
        address: updatedUser.address
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address },
      { returnDocument: 'after' }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.fullName,
        email: updatedUser.email,
        mobile: updatedUser.phone,
        address: updatedUser.address
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating address", error: error.message });
  }
}

// On Logout cart and wishl save on backend
const syncCartWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cart, wishlist } = req.body;

    await User.findByIdAndUpdate(userId, {
      cart: cart || [],
      wishlist: wishlist || []
    });

    return res.status(200).json({ success: true, message: "Cart and wishlist saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error saving cart/wishlist", error: error.message });
  }
};

const getCartWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('cart wishlist');

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      cart: user.cart || [],
      wishlist: user.wishlist || []
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching cart/wishlist", error: error.message });
  }
};

export { registerUser, loginUser, verifyUser, updateProfile, updateAddress, syncCartWishlist, getCartWishlist };