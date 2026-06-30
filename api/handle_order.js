import "dotenv/config";
import { Product, Order } from "../models.js";
import connectDb from "./db.js";
import setCors from "./cors.js";
const handleOrder = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    await connectDb();
    const { items, totalAmount } = req.body;
    console.log(items);

    const order = await Order.create({
      products: items,
      totalAmount,
    });

    return res.status(200).json({ status: true, data: order });
  } catch (e) {
    return res.status(500).json({ status: false, message: e });
  }
};

export default handleOrder;
