const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
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
router.get("/", listIngredientsController);
//to creat a new Ingredients
router.post(
  "/",
  upload.single("image"),
  createIngredientController
);
// to Update an Ingredients  by ID
router.put(
  "/:ingredientId",
  upload.single("image"),
  updateIngredientByIdController
);
// to delete an Ingredients by ID
router.delete("/:ingredientId", deleteIngredientIdController);
// to find an Ingredients by ID
router.get("/:ingredientId", ingredientDetailIdController);
// to find an Ingredients by Name
router.get("/ingredient/:ingredientName", ingredientDetailNameController);

// ----------------------------------------------------------------

module.exports = router;
