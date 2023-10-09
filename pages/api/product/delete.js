import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import paidModels from "../../../models/paidModels";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await deleteProduct(req, res);
      break;
  }
};

const deleteProduct = async (req, res) => {
    try {
      const { id } = req.body;
      //checking if the _id exists in the database
        const product = await Products
        .findById(id)
                if (!product) return res.status(400).json({ err: "This product does not exist." +id});
        //deleting the product
        await Products.findByIdAndDelete(id);
         res.json({ msg: "Deleted a Product" });
    } catch (err) {
        return res.status(500).json({ err: err.message });
        }


    }
