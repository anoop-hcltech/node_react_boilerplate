import { roles } from "./../models/userModel";
import { body } from "express-validator";
import { validatorFn } from "../utils/validatorFn";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("email must be a valid email")
    .notEmpty()
    .withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
  validatorFn,
];

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("role is required")
    .isIn(["operator", "traveller", "admin", "nurse"])
    .withMessage("Role must be within operator, traveller, admin, nurse"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorFn,
];
