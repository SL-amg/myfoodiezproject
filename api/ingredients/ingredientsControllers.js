// this controller is created to add/Modify/Read a new Ingredient
const Ingredient = require("../../models/Ingredient");

// ----------------------------------------------------------------
// to Create a new ingredient
exports.createIngredientController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const ingredient = new Ingredient(req.body);
    const savedIngredient = await ingredient.save();
    res.status(201).json(savedIngredient);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; // to check.save works
// ----------------------------------------------------------------
// to get all ingredients List
exports.listIngredientsController = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json(error);
  }
};
// ----------------------------------------------------------------
// to Find an ingredient
// by ID
exports.ingredientDetailIdController = async (req, res) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findById(ingredientId);
  if (ingredient) {
    res.status(200).json(ingredient);
  } else {
    res.status(404).json();
  }
};
// by name of ingrediant
exports.ingredientDetailNameController = async (req, res) => {
  const { ingredientName } = req.params;
  const name = await Ingredient.find({ 
    name: { "$regex": ingredientName, "$options": "i" } }
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
}; // check we can use NAME same as in Categopries
// ----------------------------------------------------------------
// to Update a  ingredient
//by ID
exports.updateIngredientByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { ingredientId } = req.params;
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.updateOne(req.body);
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
// to Delete an Ingredient
//by ID
exports.deleteIngredientIdController = async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.deleteOne();
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
//END of Controller