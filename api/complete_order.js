import { Order, Product } from "../models.js";
import connectDb from "./db.js";
import setCors from "./cors.js";
import { v4 as uuidv4 } from "uuid";
// import {Paystack} from "paystack-sdk"

async function completeOrder(req, res) {
  try {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST")
      return res.status(405).send("Method not allowed.");

    await connectDb();
    const { shippingDetails } = req.body;

    // const transactionReference = uuidv4();

    // const paystackPayload = {
    //   email: shippingDetails.email,
    //   amount: shippingDetails.totalAmount * 100,
    //   reference: transactionReference
    // }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: shippingDetails.orderId },
      {
        $set: {
          orderOwner: `${shippingDetails.firstname} ${shippingDetails.lastname}`,
          totalAmount: shippingDetails.totalAmount,
        },
      },

      { new: true },
    );

    if (!updatedOrder) return res.status(404).send("Order not found");

    res.status(200).json({ ok: true, data: updatedOrder });
    console.log(`Your order is updated: ${updatedOrder}`);
  } catch (e) {
    res.status(500).json({ ok: false, data: `Internal Error: ${e}` });
    console.log(`Error: ${e}`);
  }
}

export default completeOrder;
