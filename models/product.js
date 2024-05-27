import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
    unique: true,
  },

});
export default mongoose.model("products", ProductSchema);
