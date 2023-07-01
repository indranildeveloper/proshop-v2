import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);
router.route("/my-orders").get(protect, getMyOrders);
router.route("/:orderId").get(protect, admin, getOrderById);
router.route("/:orderId/pay").put(protect, updateOrderToPaid);
router.route("/:orderId/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
