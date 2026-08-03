import "dotenv/config";
import setCors from "./cors.js";
import { Order, Product } from "../models.js";
import axios from "axios";
import connectDb from "./db.js";
import nodemailer from "nodemailer";

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
          Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
        },
      },
    );

    const response = await verificationResponse.data.data;
    console.log(verificationResponse);

    if (response.status === "success") {
      await Order.findOneAndUpdate(
        { paystackRef: reference },
        { status: "paid" },
      );

      const order = await Order.findOne({ paystackRef: reference });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_KEY,
        },
      });

      const mailStructure = {
        from: "Clockaholic Store",
        to: process.env.EMAIL,
        subject: `New Order from Clockaholic Store`,
        text: `
A new order has been successfully placed!

--- ORDER DETAILS ---
Order ID:       ${order.orderId}
Customer Name:  ${order.orderOwner}
Email:          ${order.deliveryDetails.email}
Phone Number:   ${order.deliveryDetails.phoneNo}


--- ITEMS BOUGHT ---
${order.products
  .map((p, i) => {
    return `• ${p.version} | (Qty: ${p.quantity}) - ₦${p.price.toLocaleString()} each`;
  })
  .join("\n")}


--- PAYMENT INFO ---
Total Amount:   ${order.totalAmount.toLocaleString()}
Payment Status: Paid
Reference:      ${order.paystackRef}


  --- SHIPPING ADDRESS ---
  Address:        ${order.deliveryDetails.address}
City / State:   ${order.deliveryDetails.city} / ${order.deliveryDetails.state}
  `.trim(),
      };

      await transporter.sendMail(mailStructure);
    }

    res.status(200).json({ data: response });
  } catch (e) {
    console.log(`Error verifying payment: ${e}`);
    res.status(500).json({ data: e });
  }
}

export default verifyPayment;
