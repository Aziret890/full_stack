import { body } from "express-validator";
export const addProductValidation = [
  body("title").isLength({ min: 7 }),
  body("price").isLength({ min: 1 }),
  body("discription").isLength({ min: 50 }),
  body("photoTitle").isLength({ min: 10 }),
  body("photo").isLength({ min: 10 }),
  body("photo2").isLength({ min: 10 }),
  body("photo3").isLength({ min: 10 }),
];
