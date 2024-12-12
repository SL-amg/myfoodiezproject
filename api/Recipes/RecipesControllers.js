// this controller is created to add/Modify/Read a new Recipes

const Recipe = require("../../models/Recipe");

// ----------------------------------------------------------------
// to create a New Recipes
const creatNewRecipes = async (newRecipesData) => {
  console.log("Creating new Category", newRecipesData);
  const newRecipes = await Recipe.create(newRecipesData);
  return newRecipes;
};
exports.creatRecipesController =async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newRecipes = await creatNewRecipes(req.body);
    res.status(201).json(newRecipes);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
// ----------------------------------------------------------------
// to get all Recipess List
exports.listRecipesController = async (req, res) => {
  try {
    const recipess = await Recipe.find()
    .populate("ingredients")
    .populate("category");
    res.status(200).json(recipess);
  } catch (error) {
    res.status(500).json(error);
  }
};
// ----------------------------------------------------------------
// to find Recipes
// by ID
exports.RecipesDetailsIdController = async (req, res) => {
  const { RecipesId } = req.params;
  const recipes = await Recipe.findById(RecipesId);
  if (recipes) {
    res.status(200).json(recipes);
  } else {
    res.status(404).json();
  }
};
// by Name of Recipes
exports.RecipesDetailNameController = async (req, res) => {
  const { RecipesName } = req.params;
  const name = await Recipe.findOne({ 
    name: { "$regex": RecipesName, "$options": "i" } }
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
};
// by creater of Recipes
exports.RecipesDetailCreaterController = async (req, res) => {
  const { RecipesCreater } = req.params;
  const name = await Recipe.findOne({ 
    creater: { "$regex": RecipesCreater, "$options": "i" } }
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
};
// ----------------------------------------------------------------
// to update a Recipes
// by ID
exports.updateRecipesByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);
    if (foundRecipes) {
      await foundRecipes.updateOne(req.body);
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
// to delete a Recipes
//by ID
exports.deleteRecipesIdController = async (req, res) => {
  try {
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);
    if (foundRecipes) {
      await foundRecipes.deleteOne();
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
exports.addIngredientToRecipe = async (req, res) => {
    const { RecipesId, ingredientId } = req.params;
    const recipe = await Recipe.findById(RecipesId);
    const updatedRecipe = await recipe.updateOne({
      $push: {ingredients : ingredientId},
    })
    res.status(200).json(updatedRecipe);
  }
//END of Controller
