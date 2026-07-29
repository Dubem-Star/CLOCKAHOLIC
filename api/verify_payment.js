import "dotenv/config";
import setCors from "./cors.js";
import { Order } from "../models.js";
import axios from "axios";
import connectDb from "./db.js";
async function verifyPayment(req, res) {
  try {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    await connectDb();
    const { reference } = req.body;

    const verificationResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        },
      },
    );

    const response = await verificationResponse.data.data;

    if (response.status === "success") {
      await Order.findOneAndUpdate(
        { paystackRef: reference },
        { status: "paid" },
      );
    }

    res.status(200).json({ data: response });
  } catch (e) {
    console.log(`Error verifying payment: ${e}`);
    res.status(500).json({ data: e });
  }
}

export default verifyPayment;
