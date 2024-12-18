// this controller is created to add/Modify/Read a new Recipes

const Recipe = require("../../models/Recipe");

const checkCreator = (user, recipe) => {
  if (recipe.creator.equals(user.id)) {
    return true;
  } else {
    return false;
  }
}; // this is an important function thankkk youuuuu

// ----------------------------------------------------------------

// To Create a New Recipy other style
// ONLY registers users can creat a recipy with Specifice creator
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
// any user can get the recipers since requested in rout for all users 
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
// by ID .. only creater can update the recipy created by creater
exports.updateRecipesByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);

    if (foundRecipes) {
      const ownerIsValid = checkCreator(req.user,foundRecipes );
      if (ownerIsValid){
      await foundRecipes.updateOne(req.body);
      res.status(202).json();
    } 
    else {
      res.status(403).json("Recipy not Created By this User");
    }
  }
    else {
      res.status(404).json("Recipy not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------
// to delete a Recipes
//by ID only by the creator of the recipy
exports.deleteRecipesIdController = async (req, res) => {
  try {
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);

    if (foundRecipes) {
      const ownerIsValid = checkCreator(req.user,foundRecipes );

      if (ownerIsValid){
      await foundRecipes.deleteOne();
      res.status(204).end();
    }else {
      res.status(403).json("Recipy not Created By this User");
    }
   } else {
      res.status(404).json("Recipy not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; // to check this
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
// to add ingredient to recipy
exports.addCategoryToRecipy = async (req, res) => {
  const { RecipesId, categoryId } = req.params;
  const recipe = await Recipe.findById(RecipesId);
  const  updatedRecipe = await recipe.updateOne({
    $push: {category : categoryId},
  })
  res.status(200).json(updatedRecipe);
}
//END of Controller
