import Order from "../models/order.model.js";

const placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      statusHistory: [{ status: "Processing", date: new Date() }]
    });

    const createdOrder = await order.save();
    return res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error placing order", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
};

const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "fullName email phone")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching admin orders", error: error.message });
  }
};

const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Use findById and save to correctly push to the array and trigger validation
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    order.statusHistory.push({ status, date: new Date() });
    await order.save();

    return res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
  }
};

export { placeOrder, getUserOrders, getAllOrdersAdmin, updateOrderStatusAdmin };
