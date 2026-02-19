import express from "express";
import { adminLoginMiddleware, adminVerifyMiddleware } from "../middleware/adminLoginMiddleware.js";
import adminLogin from "../controllers/adminController.js";

const router = express.Router();


router.post("/login", adminLoginMiddleware, adminLogin);
router.get("/verify", adminVerifyMiddleware, (req, res) => {
  res.json({ message: "Admin verified successfully", admin: req.admin });
})

router.get("/testadmin",
  (req, res) => {
    res.json({ message: "Admin test successful" });
  }
);
export default router;
