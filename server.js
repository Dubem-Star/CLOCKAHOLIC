import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "./src/data/products.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { Product, Order } from "./models.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongo connected"))
  .catch((e) => console.log("Error connecting Mongo:", e));

// ************************FETCH PRODUCTS FROM DATABASE***************************
// ************************FETCH PRODUCTS FROM DATABASE***************************
app.post("/getProducts", async (req, res) => {
  try {
    const dbProducts = await Product.find({});

    const newlyArrivedProducts = dbProducts.slice(0, 8);
    res.status(200).json({ status: true, data: dbProducts });
    console.log("sent products to frontend");
    return;
  } catch (e) {
    res.status(404).json({ status: false, message: e });
    console.log(`error finding products: ${e}`);
  }
});

// ************************SEARCH PRODUCTS FROM DATABASE***************************
// ************************SEARCH PRODUCTS FROM DATABASE***************************
app.post("/searchProducts", async (req, res) => {
  try {
    const textToEmbed = req.body.query;
    console.log(req.body.query);

    const results = await Product.find({
      $or: [
        { brandName: { $regex: textToEmbed, $options: "i" } },
        { version: { $regex: textToEmbed, $options: "i" } },
        { gender: { $regex: textToEmbed, $options: "i" } },
      ],
    });
    console.log(results.slice(0, 8).length);
    res.status(200).json({
      status: true,
      message: `found results`,
      data: results.slice(0, 8),
    });
  } catch (e) {
    if (res.headersSent) return;

    res
      .status(500)
      .json({ status: false, message: `Error fetching embeds: ${e}` });
    console.log(`Error fetching embeds: ${e}`);
  }
});

// ************************POST ORDERS TO DATABASE***************************
// ************************POST ORDERS TO DATABASE***************************

app.post("/saveOrder", async (req, res) => {
  const { cart, totalAmount } = req.body;

  await Order.insertOne({
    products: cart,
    totalAmount,
  });
});

app.listen(3000, () => {
  console.log("backend listening at 3000");
});
