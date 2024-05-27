import productModel from "../../models/product.js";
async function getAllProduct(res) {
  try {
    const getAllPosts = await productModel.find().exec();
    res.json({ data: getAllPosts });
  } catch (error) {
    console.log(error, "error ");
  }
}

export default getAllProduct;
