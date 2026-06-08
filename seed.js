import "dotenv/config"; //loading my keys into memory
import fs from "fs"; //To talk to my harddrive
import path from "path"; //To get the correct file path
import { v2 as cloudinary } from "cloudinary"; //software for the API
import mongoose from "mongoose";
import { Product, Order } from "./models.js";
import { fileURLToPath } from "url";

cloudinary.config(); // The engine is started!

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongo connected"))
  .catch((e) => console.log("Error connecting Mongo:", e));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ************************UPLOAD PRODUCTS TO DATABASE***************************
// ************************UPLOAD PRODUCTS TO DATABASE***************************
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

// ************************UPLOAD PRODUCTS IMAGES TO CLOUDINARY***************************
// ************************UPLOAD PRODUCTS IMAGES TO CLOUDINARY***************************
async function uploadProductsImages() {
  if (true) {
    await cloudinary.api.delete_resources_by_prefix("Clockaholic/");
  }

  const brands = [
    "cartier",
    "casio",
    "chrome_hearts",
    "citizen",
    "curren",
    "g_shock",
    "glasses",
    "naviforce",
    "poedagar",
    "rolex",
    "seiko",
    "shades",
    "tissot",
    "tommy_hilfiger",
    "watch_organizer",
  ];

  for (let brand of brands) {
    const brandFolder = path.join(__dirname, "public/watch_products", brand);

    const productImgs = fs.readdirSync(brandFolder);

    for (let img of productImgs) {
      const filePath = path.join(brandFolder, img);
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `Clockaholic/${brand.toLocaleLowerCase()}`,
          use_filename: true,
          unique_filename: false,
        });

        console.log("✅All images uploaded");
      } catch (e) {
        console.log("❌Error uploading images:", e);
      }
    }
  }
}

// ************************UPLOAD LOGO IMAGES TO CLOUDINARY***************************
// ************************UPLOAD LOGO IMAGES TO CLOUDINARY***************************
async function uploadLogoImages() {
  // if (true) {
  //   await cloudinary.api.delete_resources_by_prefix("Clockaholic/Watch_Logos");
  //   return console.log("cleared folder for now 👍🏾");
  // }

  const logoFolder = path.join(__dirname, "src/assets/images/watch_logos");
  const logoImages = fs.readdirSync(logoFolder);

  for (let logo of logoImages) {
    const filePath = path.join(logoFolder, logo);
    try {
      const uploader = await cloudinary.uploader.upload(filePath, {
        folder: "Clockaholic/Watch_Logos",
        use_filename: true,
        unique_filename: false,
      });

      console.log("✅All images uploaded");
    } catch (e) {
      console.log("❌Error uploading images:", e);
    }
  }
}

// uploadProductsImages();
// uploadLogoImages();
// seedProducts();
