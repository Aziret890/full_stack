// import dotenv from "dotenv";

// import express from "express";

// import mongoose from "mongoose";

// import multer from "multer";
// import path from "path";

// import { validationResult } from "express-validator";

// import productModel from "./models/product.js";
// import { addProductValidation } from "./validation/validationProduct.js";
// import getAllProduct from "./routers/product/getSertificate.js";
// import productSearch from "./routers/product/sertificateSearch.js";

// const app = express();
// const PORT = process.env.PORT || 4444;

// app.use(express.json());
// dotenv.config();

// mongoose
//   .connect("mongodb+srv://aziret:aziret@shop-api.dawp9yv.mongodb.net/")
//   .then(() => console.log("db started"))
//   .catch((e) => console.log("error", e));

// //!GET

// app.get("/", (req, res) => {
//   res.send("hello world");
// });
// app.get("/product/all", async (req, res) => {
//   getAllProduct(res);
// });

// //!POST

// //? add product to mongodb

// app.post("/add/product", addProductValidation, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return res.status(400).json({ message: "не валидирован" });
//   }
//   const products = await productModel.create({
//     title: req.body.title,
//     price: req.body.price,
//     discription: req.body.discription,
//     photoTitle: req.body.photoTitle,
//     photo: req.body.photo,
//     photo2: req.body.photo2,
//     photo3: req.body.photo3,
//   });
//   res.json({ message: "все верно", data: products });
// });

// //?search product mongodb
// app.post("/search", async (req, res) => {
//   productSearch(req, res);
// });

// //!DELETE

// //?delete error product with product id

// app.delete("/product/delete/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const products = await productModel.findByIdAndDelete(productId);
//     res.json({
//       message: "Product deleted",
//       data: products,
//     });
//   } catch (e) {
//     console.log(e, "delete error product with product id");
//   }
// });

// //!Update

// //? update one prolduct to mongodb

// app.patch("/product/update/:productId", async (req, res) => {
//   const { productId } = req.params;
//   const newData = req.body;
//   try {
//     const products = await productModel.findByIdAndUpdate(productId, newData, {
//       new: true,
//     });
//     res.json({
//       message: "Product deleted",
//       data: products,
//     });
//   } catch (e) {
//     console.log(e, "delete error product with product id");
//   }
// });

// //!MULTER
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Initialize upload middleware and add file size limit
// // const upload = multer({
// //   storage: storage,
// //   limits: { fileSize: 1000000 }, // 1MB file size limit
// // }).single("myFile"); // 'myFile' is the name attribute of the file input field
// // Add file type validation
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 9000000 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("myFile");

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images only! (jpeg, jpg, png, gif)");
//   }
// }
// // File upload route
// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: err });
//     }
//     if (!req.file) {
//       return res.status(400).json({ error: "Please send file" });
//     }
//     console.log(req.file);
//     res.send("File uploaded!");
//   });
// });

// //!LISTEN
// app.listen(PORT, (error) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("server started");
// });

// //aziret008
// //mongodb+srv://<username>:<password>@shop-api.dawp9yv.mongodb.net/
// //aziret
// //mongodb+srv://aziret:aziret@shop-api.dawp9yv.mongodb.net/
//!fmqwp[fmwqp[fmwqp[fqmpf[mqwp[fmqwp[fmwqp[fmqwp[fmqwp[fmqwp[fmwqp[fmqwpf[qwmpf[qw]]]]]]]]]]]]]
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import multer from "multer";
// import path from "path";
// import { validationResult } from "express-validator";
// import productModel from "./models/product.js";
// import { addProductValidation } from "./validation/validationProduct.js";
// import getAllProduct from "./routers/product/getSertificate.js";
// import productSearch from "./routers/product/sertificateSearch.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4444;
// const __dirname = path.resolve();

// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "images")));
// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("DB connected"))
//   .catch((error) => console.error("DB connection error:", error));

// // Routes

// // Home Route
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // Get all products
// app.get("/product/all", async (req, res) => {
//   try {
//     await getAllProduct(req, res);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// // Add a new product
// app.post("/add/product", addProductValidation, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res
//       .status(400)
//       .json({ message: "Validation error", errors: errors.array() });
//   }
//   try {
//     const product = await productModel.create(req.body);
//     res
//       .status(201)
//       .json({ message: "Product added successfully", data: product });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product", error });
//   }
// });

// // Search for products
// app.post("/search", async (req, res) => {
//   try {
//     await productSearch(req, res);
//   } catch (error) {
//     res.status(500).json({ message: "Error searching products", error });
//   }
// });

// // Delete a product by ID
// app.delete("/product/delete/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const product = await productModel.findByIdAndDelete(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "Product deleted successfully", data: product });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// });

// // Update a product by ID
// app.patch("/product/update/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const product = await productModel.findByIdAndUpdate(productId, req.body, {
//       new: true,
//     });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "Product updated successfully", data: product });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// });

// //MULTER
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "./image");
//   },
//   filename(req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// function fileFilter(req, file, cb) {
//   const typeFile = ["image/png", "image/jpg", "image/jpeg"];
//   if (typeFile.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }
// const upload = multer({ storage, fileFilter });

// app.post("/images", upload.single('image'), (req, res) => {
//   try {
//     if (req.file) {
//       res.json({ file: req.file });
//     }
//   } catch (error) {
//     console.log("error ", error);
//   }
// });
// // Start server
// app.listen(PORT, (error) => {
//   if (error) {
//     console.error("Server startup error:", error);
//   } else {
//     console.log(`Server running on port ${PORT}`);
//   }
// });
//!vnqwpovnepowbnwepboe nw
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { validationResult } from "express-validator";
import productModel from "./models/product.js";
import { addProductValidation } from "./validation/validationProduct.js";
import getAllProduct from "./routers/product/getSertificate.js";
import productSearch from "./routers/product/sertificateSearch.js";

dotenv.config();

const app = express();
const PORT = 4444;

const __dirname = path.resolve();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://aziret:aziret@shop-api.dawp9yv.mongodb.net/")
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("DB connection error:", error));

// Routes

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Get all products
app.get("/product/all", async (req, res) => {
  try {
    await getAllProduct(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Add a new product
app.post("/add/product", addProductValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }
  try {
    const product = await productModel.create(req.body);
    res
      .status(201)
      .json({ message: "Product added successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Search for products
app.post("/search", async (req, res) => {
  try {
    await productSearch(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
});

// Delete a product by ID
app.delete("/product/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

// Update a product by ID

app.patch("/product/update/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// MULTER Setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./images"); // corrected the folder name
  },
  filename(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ); // Fixed date format issue
  },
});

const fileFilter = (req, file, cb) => {
  const typeFile = ["image/png", "image/jpg", "image/jpeg"];
  if (typeFile.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

app.post("/images", upload.single("image"), (req, res) => {
  try {
    if (req.file) {
      res.json({ file: req.file });
    } else {
      res.status(400).json({ message: "Invalid file type" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

// Start server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
