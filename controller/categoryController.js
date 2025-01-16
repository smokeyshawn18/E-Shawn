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

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Validate the input
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid category name",
      });
    }

    // Update category in the database
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    // If category not found
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error in category update",
    });
  }
};

export const categoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).send({ success: true, categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error while getting cateogries",
    });
  }
};

export const signlecategoriesController = async (req, res) => {
  try {
    const { slug } = req.params;
    // Correctly query the slug field
    const category = await categoryModel.findOne({ slug });

    // Handle case where no category is found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      category,
      message: "Single category fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

export const deleteCategoryContriller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error while deleteing category",
    });
  }
};
