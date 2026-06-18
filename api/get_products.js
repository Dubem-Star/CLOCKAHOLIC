import "dotenv/config";
import { Product, Order } from "../models.js";
import connectDb from "../db.js";

const getProducts = async (req, res) => {
  try {
    await connectDb();
    const dbProducts = await Product.find({});

    res.status(200).json({ status: true, data: dbProducts });
    console.log("sent products to frontend");
    return;
  } catch (e) {
    res.status(404).json({ status: false, message: e });
    console.log(`error finding products: ${e}`);
  }
};

export default getProducts;
