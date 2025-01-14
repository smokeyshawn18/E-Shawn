import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    const category = new categoryModel({ name, slug: slugify(name) });
    await category.save();
    return res.status(201).json({
      success: true,
      category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error in category",
    });
  }
};
