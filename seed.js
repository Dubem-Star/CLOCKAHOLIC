import "dotenv/config"; //loading my keys into memory
import fs from "fs"; //To talk to my harddrive
import path from "path"; //To get the correct file path
import { v2 as cloudinary } from "cloudinary"; //software for the API

import { fileURLToPath } from "url";

cloudinary.config(); // The engine is started!

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function uploadProductsImages() {
  if (true) {
    await cloudinary.api.delete_resources_by_prefix("Clockaholic/");
    return console.log("cleared folder for now 👍🏾");
  }

  for (let brand of brands) {
    const brandFolder = path.join(
      __dirname,
      "src/assets/images/watch_products",
      brand,
    );

    const productImgs = fs.readdirSync(brandFolder);

    const brandName = brand.slice(0, 1).toUpperCase() + brand.slice(1);

    for (let img of productImgs) {
      const filePath = path.join(brandFolder, img);
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `Clockaholic/${brandName}`,
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
async function uploadLogoImages() {
  if (true) {
    await cloudinary.api.delete_resources_by_prefix("Clockaholic/Watch_Logos");
    return console.log("cleared folder for now 👍🏾");
  }

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
uploadLogoImages();
