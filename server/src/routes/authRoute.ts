import express from "express";
import * as authController from "../modules/auth/authController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { authorize } from "../middleware/auth";

const router = express.Router();

router.post("/login", loginValidator, authController.login);
router.post("/register", registerValidator, authController.register);
router.get(
  "/user/profile",
  authorize("admin", "manager", "nurse"),
  authController.getUserProfile
);

export default router;
