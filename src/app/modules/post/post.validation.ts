import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").trim(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long")
      .trim(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .trim()
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long")
      .trim()
      .optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
