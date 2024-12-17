// this controller is created to add/Modify/Read a new Recipes

const Recipe = require("../../models/Recipe");

// ----------------------------------------------------------------
// to create a New Recipes
// const creatNewRecipes = async (newRecipesData) => {
//   console.log("Creating new Category", newRecipesData);
//   const newRecipes = await Recipe.create(newRecipesData);
//   return newRecipes;
// };
// exports.creatRecipesController =async (req, res) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
//     }
//     const newRecipes = await creatNewRecipes(req.body);
//     res.status(201).json(newRecipes);
//   } catch (e) {
//     res.status(500).json(e.message);
//     console.log(e.message);
//   }
// };

// To Create a New Recipy other style

exports.creatRecipesController = async (req, res) => {
const { user } = req
if (user) {
  req.body.creator = user.id
} else{
  res.status(401).json("please Login")
}
if (req.file) {
  req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
}
const recipe = new Recipe(req.body);
const savedRecipe = await recipe.save();
console.log("New recipys is",savedRecipe );
res.status(201).json();
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
// exports.updateRecipesByIdController = async (req, res) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
//     }
//     const { RecipesId } = req.params;
//     const foundRecipes = await Recipe.findById(RecipesId);

//     const { user } = req
    
//     if (user.id !== recipe.creator.id) {
//       return res.status(403).json("This Recipy Belongs to another User")
//     }
//     if (foundRecipes) {
//       await foundRecipes.updateOne(req.body);
//       res.status(202).json();
//     } else {
//       res.status(404).json("Recipy not found");
//     }
//   } catch (e) {
//     res.status(500).json(e.message);
//     console.log(e.message);
//   }
// };

//update recipy new code for testing
exports.updateRecipesByIdController = async (req, res) => {
  const { RecipesId } = req.params;
  const recipe = await Recipe.findById(RecipesId);
  const { user } = req
  console.log(user.id)
  // if (user !== recipe.creator.id) {
  //   return res.status(403).json("This Recipy Belongs to another User")
  // }
  await recipe.updateOne(req.body);
  const updatedRecipe = await Recipe.findById(RecipesId);
  res.status(200).json(updatedRecipe);
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
