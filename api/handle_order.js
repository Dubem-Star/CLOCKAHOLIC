import "dotenv/config";
import { Product, Order } from "../models.js";
import connectDb from "../db.js";
const handleOrder = async (req, res) => {
  try {
    await connectDb();
    const { items, totalAmount } = req.body;
    console.log(items);

    const order = await Order.insertOne({
      products: items,
      totalAmount,
    });

    return res.status(200).json({ status: true, data: order });
  } catch (e) {
    return res.status(500).json({ status: false, message: e });
  }
};

export default handleOrder;
