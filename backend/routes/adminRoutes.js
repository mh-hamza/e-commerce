import express from "express";
import { adminLoginMiddleware, adminVerifyMiddleware } from "../middleware/adminLoginMiddleware.js";
import { adminLogin, adminLogout } from "../controllers/adminController.js";
import { getAllUsersAdmin, toggleBlockUserAdmin } from "../controllers/adminUserController.js";

const router = express.Router();


router.post("/login", adminLoginMiddleware, adminLogin);
router.post("/logout", adminLogout);

router.get("/verify", adminVerifyMiddleware, (req, res) => {
  res.json({ success: true, message: "Admin verified successfully", admin: req.admin });
})

router.get("/testadmin",
  (req, res) => {
    res.json({ message: "Admin test successful" });
  }
);

// User management routes
router.get("/users", adminVerifyMiddleware, getAllUsersAdmin);
router.put("/users/:id/block", adminVerifyMiddleware, toggleBlockUserAdmin);

export default router;
