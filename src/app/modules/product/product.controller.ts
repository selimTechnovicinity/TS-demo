import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created succesfully.",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products data retrived succesfully.",
    data: result,
  });
});

const getASingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product data retrived succesfully.",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product data deleted succesfully.",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product data updated succesfully.",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getASingleProduct,
  deleteProduct,
  updateProduct,
};
