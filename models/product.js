import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discription: {
    type: String,
    required: true ,
  },
  photoTitle: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
    unique: true,
  },
  photo2: {
    type: String,
    required: true,
    unique: true,
  },
  photo3: {
    type: String,
    required: true,
    unique: true,
  },
});
export default mongoose.model("products", ProductSchema);
