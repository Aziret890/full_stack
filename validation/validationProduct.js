import { body } from "express-validator";
export const addProductValidation = [body("photo").isLength({ min: 10 })];
