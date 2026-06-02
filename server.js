import "dotenv/config";
import {
  newArrivedProducts,
  bestSellingProducts,
  onSaleProducts,
} from "./src/data/products.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { Product } from "./models.js";

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

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function updateProductsImgUrl() {
  await Product.updateMany({ images: [] }, { $set: {} });
}

async function seedProducts() {
  try {
    const products = [
      ...newArrivedProducts,
      ...bestSellingProducts,
      ...onSaleProducts,
    ];

    await Product.deleteMany({});
    console.log("products cleared in DB");

    const finishedProducts = [];

    for (let product of products) {
      console.log(`fetching and pushing ${product.brandName}'s embedding`);

      const textToEmbed = `Name: ${product.brandName}. Version: ${product.version}. Description: ${product.description}`;

      const response = await ai.models.embedContent({
        model: "models/gemini-embedding-001",
        contents: textToEmbed,
      });

      const vectorEmbedding = response.embeddings[0].values;

      finishedProducts.push({
        ...product,
        embedding: vectorEmbedding,
      });
    }
    console.log("products are finished and ready to be saved in DB");

    await Product.insertMany(finishedProducts);
    console.log("products successfully saved to the DB");
  } catch (e) {
    console.log(`Error getting Embedding: ${e}`);
  }
}
// seedProducts();

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

app.post("/api/semanticSearch", async (req, res) => {
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

app.listen(3000, () => {
  console.log("backend listening at 3000");
});

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const products = await Product.find();

    for (let product of products) {
      if (!product.images || product.images.length === 0) continue;

      const updatedImgs = product.images.map((img) => {
        return img.replace(
          "/CLOCKAHOLIC/watch_products/",
          "https://res.cloudinary.com/dirijnb2k/image/upload/f_auto,q_auto/Clockaholic/",
        );
      });

      await Product.updateOne(
        {
          _id: product._id,
        },
        { $set: { images: updatedImgs } },
      );
    }

    console.log("Migration complete 🚀");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// migrateImages();
