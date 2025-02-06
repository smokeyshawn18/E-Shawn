import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getproductController,
  productCountController,
  productdeleteController,
  productFilterController,
  productListController,
  productphotoController,
  searchProductController,
  singleproductController,
  updateProductController,
} from "../controller/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

router.get("/get-product", getproductController);
router.get("/single-product/:slug", singleproductController);
router.get("/product-photo/:pid", productphotoController);
router.delete("/productdel/:pid", productdeleteController);
router.post("/product-filters", productFilterController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

export default router;
