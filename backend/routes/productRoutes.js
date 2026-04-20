import express from "express";
import { adminVerifyMiddleware } from "../middleware/adminLoginMiddleware.js";
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", adminVerifyMiddleware, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]), createProduct);
router.get("/getAllProducts", getAllProducts);
router.delete("/delete/:id", adminVerifyMiddleware, deleteProduct);
router.put("/update/:id", adminVerifyMiddleware, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]), updateProduct);
export default router;