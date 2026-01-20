import express from "express";
import { adminLogin , createAdmin, getDashboardStats} from "../controllers/admin.controller.js";
import { verifyAdminToken } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/create",createAdmin)
router.post("/login", adminLogin);
router.get("/dashboard/stats", verifyAdminToken, getDashboardStats);


export default router;
