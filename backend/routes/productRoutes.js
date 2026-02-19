import express from "express";
import { adminVerifyMiddleware } from "../middleware/adminLoginMiddleware.js";
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/create", adminVerifyMiddleware, createProduct);
router.get("/getAllProducts", getAllProducts);
router.delete("/delete/:id", adminVerifyMiddleware, deleteProduct);
router.put("/update/:id", adminVerifyMiddleware, updateProduct);
export default router;