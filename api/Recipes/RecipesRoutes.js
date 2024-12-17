const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
const passport =require("passport");
// ----------------------------------------------------------------

const {
  listRecipesController,
  RecipesDetailsIdController,
  RecipesDetailNameController,
  RecipesDetailCreaterController,
  creatRecipesController,
  updateRecipesByIdController,
  deleteRecipesIdController,
  addIngredientToRecipe,
} = require("./RecipesControllers");
// ----------------------------------------------------------------

// to store images
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
}); // add this from lesson upload image  multer

const upload = multer({
  storage,
}); // add this from lesson upload image  multer

// ----------------------------------------------------------------
// Route List Under this Line
// ----------------------------------------------------------------
//Recipes Routs
// to get all Recipes Fetch Get
router.get("/", passport.authenticate('jwt', { session: false }), listRecipesController);
//to creat a new Recipes
router.post("/", passport.authenticate('jwt', { session: false }), upload.single("image"), creatRecipesController); // registered uses can creat recipies
// to Update an Recipes  by ID
router.put("/:RecipesId", passport.authenticate('jwt', { session: false }), upload.single("image"), updateRecipesByIdController); //updated recipy by creater
// to delete an Recipes by ID
router.delete("/:RecipesId", passport.authenticate('jwt', { session: false }), deleteRecipesIdController);
// to find an Recipes by ID
router.get("/:RecipesId",passport.authenticate('jwt', { session: false }), RecipesDetailsIdController);
// to find an Recipes by Name
router.get("/name/:RecipesName", passport.authenticate('jwt', { session: false }), RecipesDetailNameController);
// to find an Recipes by Creater
router.get("/creater/:RecipesCreater", passport.authenticate('jwt', { session: false }), RecipesDetailCreaterController);
//to add ingredneti to recipy
router.post("/:RecipesId/add/:ingredientId", addIngredientToRecipe);

// ----------------------------------------------------------------

module.exports = router;
