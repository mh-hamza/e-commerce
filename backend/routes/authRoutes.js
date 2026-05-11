import express from "express";
import { registerUser, loginUser, verifyUser, updateProfile, updateAddress, syncCartWishlist, getCartWishlist } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, verifyUser);
router.put("/profile", authMiddleware, updateProfile);
router.put("/address", authMiddleware, updateAddress);

// Cart and Wishlist route
router.post("/sync-cart-wishlist", authMiddleware, syncCartWishlist);
router.get("/get-cart-wishlist", authMiddleware, getCartWishlist);

export default router;
