import express from "express";
import {
  categoriesController,
  createCategoryController,
  deleteCategoryContriller,
  signlecategoriesController,
  updateCategoryController,
} from "../controller/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.get("/get-categories", categoriesController);
router.get("/single-category/:slug", signlecategoriesController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryContriller
);

export default router;
