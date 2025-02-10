import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";

const router = Router();

router.post(
  "/",
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

router.get("/", ProductControllers.getAllProduct);

router.get("/:id", ProductControllers.getASingleProduct);

router.delete("/:id", ProductControllers.deleteProduct);

router.patch(
  "/:id",
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct
);

export const ProductRoutes = router;
