import Coupon from '../models/coupon.model.js';

// Admin: Create Coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage } = req.body;
    
    if (!code || !discountPercentage) {
      return res.json({ success: false, message: 'Please provide code and discount percentage' });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await Coupon.create({ 
      code: code.toUpperCase(), 
      discountPercentage 
    });

    res.json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Admin: Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Admin: Toggle status
export const toggleCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.json({ success: false, message: 'Coupon not found' });
    
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    
    res.json({ success: true, message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'}`, coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Admin: Delete Coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.json({ success: false, message: 'Coupon not found' });
    
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// User: Validate Coupon
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.json({ success: false, message: 'Coupon code is required' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.json({ success: false, message: 'Invalid coupon code' });
    }
    
    if (!coupon.isActive) {
      return res.json({ success: false, message: 'This coupon is no longer active' });
    }

    res.json({ 
      success: true, 
      message: 'Coupon applied successfully', 
      discountPercentage: coupon.discountPercentage 
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
