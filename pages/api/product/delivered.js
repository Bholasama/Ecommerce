import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import paidModels from "../../../models/paidModels";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await deliveredProduct(req, res);
      break;
  }
};

const deliveredProduct = async (req, res) => {
    try {
      const { id } = req.body;
      //checking if the _id exists in the database

        const product = await paidModels
        .findById(id)
                if (!product) return res.status(400).json({ err: "This product does not exist." +id});
        //setting the product delivered to true
        await paidModels.findByIdAndUpdate(id, {delivered: true});
          res.json({ msg: "Delivered a Product" });
    } catch (err) {


        return res.status(500).json({ err: err.message });
        }
      }



    
