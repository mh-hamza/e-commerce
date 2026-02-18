import express from "express";
import adminLoginMiddleware from "../middleware/adminLoginMiddleware.js";
import adminLogin from "../controllers/adminController.js";

const router = express.Router();


router.post("/login", adminLoginMiddleware, adminLogin);

router.get("/testadmin",
  (req, res) => {
    res.json({ message: "Admin test successful" });
  }
);
export default router;
