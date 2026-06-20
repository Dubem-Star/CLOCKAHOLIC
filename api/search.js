import "dotenv/config";
import { Product, Order } from "../models.js";
import connectDb from "./db.js";
import setCors from "./cors.js";
const handleSearch = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    await connectDb();
    const searchValue = req.body.query;

    console.log(searchValue);

    const results = await Product.find({
      $or: [
        { brandName: { $regex: searchValue, $options: "i" } },
        { version: { $regex: searchValue, $options: "i" } },
        { gender: { $regex: searchValue, $options: "i" } },
      ],
    });
    res.status(200).json({
      status: true,
      message: `found results`,
      data: results.slice(0, 8),
    });
  } catch (e) {
    if (res.headersSent) return;

    res
      .status(500)
      .json({ status: false, message: `Error fetching search: ${e}` });
    console.log(`Error fetching search: ${e}`);
  }
};

export default handleSearch;
