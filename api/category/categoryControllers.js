// this controller is created to add/Modify/Read a new Categoray
const Category = require("../../models/Category");

// ----------------------------------------------------------------
// to create a  new categories
const creatNewCategory = async (newCategoryData) => {
  console.log("Creating new Category", newCategoryData);
  const newCategory = await Category.create(newCategoryData);
  return newCategory;
};
exports.creatCategoryController = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newCategory = creatNewCategory(req.body);
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; 
// ----------------------------------------------------------------
// to get all categories Fetch Get
exports.listCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find().populate("recipes"); // added this
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; 
// ----------------------------------------------------------------
// to find a category
// to find an category by ID
exports.categoryDetailIdController = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json();
  }
};
// to find by Category Name
exports.categoryDetailNameController =async (req, res) => {
  const { categoryName } = req.params;
  const name = await Category.find({ 
    name: { "$regex": categoryName, "$options": "i" } }
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
}; 
// ----------------------------------------------------------------
// to update a categories
// by ID
exports.updateCategoryByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
// ----------------------------------------------------------------
// to delete a categories
//by ID
exports.deleteCategoryIdController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
// ----------------------------------------------------------------
// to add ingredient to recipy
exports.addRecipyToCategory = async (req, res) => {
  const { categoryId, RecipesId } = req.params;
  const category = await Category.findById(categoryId);
  const updatedCategory = await category.updateOne({
    $push: {recipes : RecipesId},
  })
  res.status(200).json(updatedCategory);
}
//END of Controller