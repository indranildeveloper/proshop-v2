import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @desc    Get order by id
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  res.status(200).json(order);
});

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:orderId/pay
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

/**
 * @desc    Update order to delivered
 * @route   PUT /api/orders/:orderId/deliver
 * @access  Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders/
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
