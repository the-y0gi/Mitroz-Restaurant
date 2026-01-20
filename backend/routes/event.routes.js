import express from "express";
import {
  submitEventRequest,
  getAllEventRequests,
  confirmEvent,
  createEventPaymentOrder,
  verifyEventPayment
} from "../controllers/event.controller.js";

import { verifyAdminToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User route
router.post("/request", submitEventRequest);

router.post("/payment/order", createEventPaymentOrder);
router.post("/payment/verify", verifyEventPayment);

// Admin routes (protected)
router.get("/admin/all", verifyAdminToken, getAllEventRequests);
router.put("/admin/confirm/:id", verifyAdminToken, confirmEvent);



export default router;
