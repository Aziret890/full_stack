import dotenv from "dotenv";

import express from "express";

import mongoose from "mongoose";

import { validationResult } from "express-validator";

import userModel from "./models/user.js";
import productModel from "./models/product.js";
import { registerValidation } from "./validation/validationUser.js";
import { addProductValidation } from "./validation/validationProduct.js";
import getAllProduct from "./routers/product/getSertificate.js";
import productSearch from "./routers/product/sertificateSearch.js";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
dotenv.config();

mongoose
  .connect("mongodb+srv://aziret:aziret@shop-api.dawp9yv.mongodb.net/")
  .then(() => console.log("db started"))
  .catch((e) => console.log("error", e));

//!GET

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/product/all", async (req, res) => {
  getAllProduct(res);
});

//!POST

//? add product to mongodb

app.post("/add/product", addProductValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ message: "не валидирован" });
  }
  const products = await productModel.create({
    title: req.body.title,
    price: req.body.price,
    discription: req.body.discription,
    photoTitle: req.body.photoTitle,
    photo: req.body.photo,
    photo2: req.body.photo2,
    photo3: req.body.photo3,
  });
  res.json({ message: "все верно", data: products });
});

//?search product mongodb
app.post("/search", async (req, res) => {
  productSearch(req, res)
});

//!DELETE

//?delete error product with product id

app.delete("/product/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const products = await productModel.findByIdAndDelete(productId);
    res.json({
      message: "Product deleted",
      data: products,
    });
  } catch (e) {
    console.log(e, "delete error product with product id");
  }
});

//!Update

//? update one prolduct to mongodb

app.patch("/product/update/:productId", async (req, res) => {
  const { productId } = req.params;
  const newData = req.body;
  try {
    const products = await productModel.findByIdAndUpdate(productId, newData, {
      new: true,
    });
    res.json({
      message: "Product deleted",
      data: products,
    });
  } catch (e) {
    console.log(e, "delete error product with product id");
  }
});
//!LISTEN
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("server started");
});

//aziret008
//mongodb+srv://<username>:<password>@shop-api.dawp9yv.mongodb.net/
//aziret
//mongodb+srv://aziret:aziret@shop-api.dawp9yv.mongodb.net/
