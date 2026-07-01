import "dotenv/config";
import { Order, Product, DeliveryDetails } from "../models.js";
import connectDb from "./db.js";
import setCors from "./cors.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import {Paystack} from "paystack-sdk"

async function completeOrder(req, res) {
  try {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST")
      return res.status(405).send("Method not allowed.");

    await connectDb();
    const { shippingDetails } = req.body;
    const transactionReference = uuidv4();
    if (!shippingDetails.email || !shippingDetails.firstName) {
      return res.status(400).send("Missing required shipping details.");
    }

    // if (!shippingDetails.modeOfPayment === "Cash on Delivery") {

    // }

    const paystackPayload = {
      email: shippingDetails.email,
      amount: shippingDetails.totalAmount * 100,
      reference: transactionReference,
    };
    if (shippingDetails.modeOfPayment === "Bank Transfer")
      paystackPayload.channels = ["bank_transfer"];

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paystackPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: shippingDetails.orderId },
      {
        $set: {
          orderOwner: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          totalAmount: shippingDetails.totalAmount,
          shippingFee: shippingDetails.shippingFee,
          deliveryDetails: shippingDetails,
        },
      },

      { new: true },
    );

    if (!updatedOrder) return res.status(404).send("Order not found.");
    await DeliveryDetails.create(shippingDetails);

    res.status(200).json({
      ok: true,
      data: response.data.data,
      mod: shippingDetails.modeOfPayment,
    });
    console.log(`Your order is updated: ${updatedOrder}`);
  } catch (e) {
    res.status(500).json({ ok: false, data: `Internal Error: ${e}` });
    console.log(`Error: ${e}`);
  }
}

export default completeOrder;
