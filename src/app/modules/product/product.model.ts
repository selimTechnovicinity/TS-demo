import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true } 
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
