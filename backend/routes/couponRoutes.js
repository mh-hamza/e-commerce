import express from 'express';
import { adminVerifyMiddleware } from '../middleware/adminLoginMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createCoupon,
  getCoupons,
  toggleCouponStatus,
  deleteCoupon,
  validateCoupon
} from '../controllers/couponController.js';

const router = express.Router();

// Admin Routes
router.post('/admin/create', adminVerifyMiddleware, createCoupon);
router.get('/admin/list', adminVerifyMiddleware, getCoupons);
router.put('/admin/toggle/:id', adminVerifyMiddleware, toggleCouponStatus);
router.delete('/admin/delete/:id', adminVerifyMiddleware, deleteCoupon);

// User Routes 
router.post('/validate', authMiddleware, validateCoupon);

export default router;
