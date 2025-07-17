import { Router } from "express";
import userRoutes from "./usersRoute";
import authRoutes from "./authRoute";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
