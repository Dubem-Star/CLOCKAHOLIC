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
          html: `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #333333; margin: 0; padding: 40px 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #eaebed;">
      
      <!-- Header -->
      <div style="background-color: #111111; color: #ffffff; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Clockaholic Store</h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #a1a1a6;">New Order Notification</p>
      </div>

      <!-- Body Content -->
      <div style="padding: 30px; text-align: left;">
        <p style="font-size: 16px; margin-top: 0; color: #111111;">Hello Chidera,</p>
        <p style="font-size: 15px; color: #555555; line-height: 1.5; margin-bottom: 25px;">A new order has been successfully placed and paid for.</p>

        <!-- Order Details Section -->
        <div style="margin-bottom: 25px; border-bottom: 1px solid #eaebed; padding-bottom: 20px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 12px 0;">Order Information</h3>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Order ID:</strong> ${order.orderId}</p>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Customer Name:</strong> ${order.orderOwner}</p>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Email:</strong> ${order.deliveryDetails.email}</p>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Phone Number:</strong> ${order.deliveryDetails.phoneNo}</p>
        </div>

        <!-- Items Bought Section -->
        <div style="margin-bottom: 25px; border-bottom: 1px solid #eaebed; padding-bottom: 20px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 12px 0;">Items Bought</h3>
          <ul style="padding-left: 20px; margin: 0;">
            ${order.products
              .map(
                (p) => `
              <li style="margin-bottom: 8px; font-size: 14px; color: #333333; line-height: 1.4;">
                <strong>${p.version}</strong> <span style="color: #666;">(Qty: ${p.quantity})</span> — ₦${p.price.toLocaleString()} each
              </li>`,
              )
              .join("")}
          </ul>
        </div>

        <!-- Payment Info Section -->
        <div style="margin-bottom: 25px; border-bottom: 1px solid #eaebed; padding-bottom: 20px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 12px 0;">Payment Info</h3>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Total Amount:</strong> <span style="font-size: 16px; color: #000; font-weight: bold;">₦${order.totalAmount.toLocaleString()}</span></p>
          <p style="margin: 6px 0; font-size: 14px; color: #333333;"><strong>Payment Status:</strong> <span style="color: #2e7d32; font-weight: 600;">Paid</span></p>
          <p style="margin: 6px 0; font-size: 13px; color: #666666; word-break: break-all;"><strong>Reference:</strong> ${order.paystackRef}</p>
        </div>

        <!-- Shipping Address Section -->
        <div>
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 12px 0;">Shipping Address</h3>
          <p style="margin: 6px 0; font-size: 14px; color: #333333; line-height: 1.5;">
            ${order.deliveryDetails.address}<br>
            ${order.deliveryDetails.city}, ${order.deliveryDetails.state}
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #f9f9fb; padding: 15px; text-align: center; border-top: 1px solid #eaebed;">
        <p style="margin: 0; font-size: 12px; color: #888888;">Clockaholic Store Automated Notification</p>
      </div>

    </div>
  </div>
`,
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
