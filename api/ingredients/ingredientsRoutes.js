const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
const passport =require("passport");
// ----------------------------------------------------------------
const {
  listIngredientsController,
  ingredientDetailIdController,
  ingredientDetailNameController,
  createIngredientController,
  updateIngredientByIdController,
  deleteIngredientIdController,
} = require("./ingredientsControllers");

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
//Ingredients Routs
// to get all Ingredients Fetch Get
router.get("/", passport.authenticate('jwt', { session: false }), listIngredientsController);
//to creat a new Ingredients
router.post(
  "/", passport.authenticate('jwt', { session: false }),
  upload.single("image"),
  createIngredientController
);
// to Update an Ingredients  by ID
router.put(
  "/:ingredientId", passport.authenticate('jwt', { session: false }),
  upload.single("image"),
  updateIngredientByIdController
);
// to delete an Ingredients by ID
router.delete("/:ingredientId", passport.authenticate('jwt', { session: false }), deleteIngredientIdController);
// to find an Ingredients by ID
router.get("/:ingredientId", passport.authenticate('jwt', { session: false }), ingredientDetailIdController);
// to find an Ingredients by Name
router.get("/ingredient/:ingredientName", passport.authenticate('jwt', { session: false }), ingredientDetailNameController);

// ----------------------------------------------------------------

module.exports = router;
