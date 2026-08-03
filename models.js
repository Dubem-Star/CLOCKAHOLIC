import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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
});

const deliveryDetailsSchema = new mongoose.Schema(
  {
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    country: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    phoneNo: { type: String },
    zipCode: { type: String },
    modeOfPayment: { type: String },
    shippingFee: { type: Number },
    orderId: { type: String },
  },
  { timestamps: true },
);

const ordersSchema = new mongoose.Schema(
  {
    orderOwner: { type: String, default: "loading..." },
    products: [
      {
        ...productsSchema.obj,
        quantity: { type: Number, required: true },
        bin: { type: Boolean, default: false },
      },
    ],
    deliveryDetails: { ...deliveryDetailsSchema.obj },
    totalAmount: { type: Number, required: true },

    status: { type: String, default: "pending..." },
    paystackRef: { type: String },
    orderId: { type: String, default: uuidv4 },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Products", productsSchema);
export const Order = mongoose.model("Orders", ordersSchema);
export const DeliveryDetails = mongoose.model(
  "DeliveryDetails",
  deliveryDetailsSchema,
);
