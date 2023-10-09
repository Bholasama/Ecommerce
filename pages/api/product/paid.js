import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import paidModels from "../../../models/paidModels";
import auth from "../../../middleware/auth";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await paid(req, res);
      break;
    case "GET":
      await getProducts(req, res);
  }
};
const getProducts = async (req, res) => {
  //showing error message
  res.status(500).json({ err: "This is error message" });
};

const paid = async (req, res) => {
  try {
    const { address, mobile, cart, total, email, name } = req.body;
    const paymentStatus = "paid";
    //generating random paymentId
    const paymentId = Math.random().toString(36).slice(2);
    const paymentMethod = "esewa";
    const paidFor = "product";
    const paidAt = new Date().toISOString();
    const paidTo = "vesla";
    const paidBy = mobile;
    const amount = total;
    const result = await auth(req, res);
    const user = result.id;

    const newPaid = new paidModels({
      address,
      mobile,
      cart,
      total,
      paymentStatus,
      paymentId,
      paymentMethod,
      paidFor,
      paidAt,
      paidTo,
      paidBy,
      amount,
      email,
      name,
      user,
    });
    await newPaid.save();
    //looping in each _id of cart to update new quantity
    cart.filter((item) => {
      Products.findOneAndUpdate(
        { _id: item._id },
        {
          sold: item.sold + item.quantity,
          inStock: item.inStock - item.quantity,
        }
      ).exec();
    });
    //updating sold and inStock

    res.json({
      msg: "Payment Success! We will contact you to confirm the order.",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
