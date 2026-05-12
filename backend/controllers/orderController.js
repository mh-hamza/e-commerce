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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; // Smaller limit for user profile
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments({ user: req.user.id });
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      orders,
      total: totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
};

const getAllOrdersAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { _id: search.length === 24 ? search : null }, // Try exact ID if it's a valid ObjectId
          { "shippingAddress.street": { $regex: search, $options: "i" } },
        ]
      };
      
      // Also try to find by user name if we want to be more thorough, but that requires a join
      // For now, let's keep it simple or use populate/filter
    }

    const totalOrders = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate("user", "fullName email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // If we searched by user name, we might need a more complex aggregation.
    // Let's implement a basic search for now.
    
    return res.status(200).json({
      success: true,
      orders,
      total: totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching admin orders", error: error.message });
  }
};

const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;


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
