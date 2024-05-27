import productModel from "../../models/product.js";
async function productSearch(req, res) {
  try {
    const allTasks = await productModel.find({ title: req.body.query });
    if (!allTasks || allTasks.length == 0)
      res.status(400).send({ error: "No task was found" });
    console.log("managet search");
    res.status(200).send(allTasks);
  } catch (error) {
    console.log("error search", error);
  }
}
export default productSearch;
