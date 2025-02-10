import { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import Product from "./product.model";


const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  if (!result || result.length === 0) {
    throw new AppError(404, "No products found.");
  }
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(404, "Product not found.");
  }
  return result;
};

const updateProductInDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(404, "Product not found.");
  }

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Product not found.");
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
