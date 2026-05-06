import express from "express";
import { registerUser, loginUser, verifyUser, updateProfile, updateAddress } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, verifyUser);
router.put("/profile", authMiddleware, updateProfile);
router.put("/address", authMiddleware, updateAddress);

export default router;