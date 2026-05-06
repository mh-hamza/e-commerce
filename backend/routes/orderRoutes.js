import express from "express";
import { placeOrder, getUserOrders, getAllOrdersAdmin, updateOrderStatusAdmin } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { adminVerifyMiddleware } from "../middleware/adminLoginMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/user", authMiddleware, getUserOrders);

router.get("/admin", adminVerifyMiddleware, getAllOrdersAdmin);
router.put("/admin/:id/status", adminVerifyMiddleware, updateOrderStatusAdmin);

export default router;
