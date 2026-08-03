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
    console.log(process.env.EMAIL_KEY);
    console.log(process.env.EMAIL);

    if (response.status === "success") {
      await Order.findOneAndUpdate(
        { paystackRef: reference },
        { status: "paid" },
      );

      const order = await Order.findOne({ paystackRef: reference });
      try {
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
          html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; width:100%; text-align:center; padding: 20px;"> 
            <h2>A new order has been successfully placed!</h2>
            <h3>--- ORDER DETAILS ---</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Customer Name:</strong> ${order.orderOwner}</p>
            <p><strong>Email:</strong> ${order.deliveryDetails.email}</p>
            <p><strong>Phone Number:</strong> ${order.deliveryDetails.phoneNo}</p>

             <h3>--- ITEMS BOUGHT ---</h3>
             ${order.products
               .map((p, i) => {
                 return `
    <p>• ${p.version} (Qty: ${p.quantity}) - ₦${p.price.toLocaleString()} each</p>`;
               })
               .join("")}
    
            <h3>--- PAYMENT INFO ---</h3>
<p><strong>Total Amount:</strong> ₦${order.totalAmount.toLocaleString()}</p>
<p><strong>Payment Status:</strong> Paid</p>
<p><strong>Reference:</strong> ${order.paystackRef}</p>


  <h3>--- SHIPPING ADDRESS ---</h3>
  <p><strong>Address:</strong> ${order.deliveryDetails.address}</p>
  <p><strong>City / State:</strong> ${order.deliveryDetails.city} / ${order.deliveryDetails.state}</p>
</div>
            </div>`,
        };

        await transporter.sendMail(mailStructure);
      } catch (e) {
        console.log("Error:", e);
      }
    }

    res.status(200).json({ data: response });
  } catch (e) {
    console.log(`Error verifying payment: ${e}`);
    res.status(500).json({ data: e });
  }
}

export default verifyPayment;
