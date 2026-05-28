import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: { type: String },
  brandName: { type: String, required: true },
  price: { type: Number },
  version: { type: String },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  brandUrl: { type: String },
  badge: { type: String },
  strap: { type: String },
  gender: { type: String },
  status: { type: String },
  category: { type: String },
  display: { type: String },
  dialColor: { type: String },
  dialShape: { type: String },
  strapColor: { type: String },
  embedding: { type: [Number], required: true },
});

export const Product = mongoose.model("Products", productsSchema);
