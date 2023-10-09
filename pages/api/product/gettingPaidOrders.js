//getting paid orders
// Compare this snippet from pages\api\product\gettingPaidOrders.js:
import connectDB from "../../../utils/connectDB";
import paidModels from "../../../models/paidModels";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await paidModels.find();
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
// Compare this snippet from pages\api\product\gettingPaidOrders.js:
