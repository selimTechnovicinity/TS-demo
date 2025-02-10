import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Product Name must be string.",
      })
      .min(1, "Product name is required")
      .trim(),
    description: z.string().trim().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    stock: z.number().min(0, "Stock must be a positive number"),
    category: z.string().min(1, { message: "Category is required." }),
    images: z.array(z.string().url()).optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Product Name must be string.",
      })
      .trim()
      .optional(),
    description: z.string().trim().optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    stock: z.number().min(0, "Stock must be a positive number").optional(),
    category: z.string().optional(),
    images: z.array(z.string().url()).optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
