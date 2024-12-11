const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
// ----------------------------------------------------------------

const {
  listRecipesController,
  RecipesDetailsIdController,
  RecipesDetailNameController,
  RecipesDetailCreaterController,
  creatRecipesController,
  updateRecipesByIdController,
  deleteRecipesIdController,
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
router.get("/", listRecipesController);
//to creat a new Recipes
router.post("/", upload.single("image"), creatRecipesController);
// to Update an Recipes  by ID
router.put("/:RecipesId", upload.single("image"), updateRecipesByIdController);
// to delete an Recipes by ID
router.delete("/:RecipesId", deleteRecipesIdController);
// to find an Recipes by ID
router.get("/:RecipesId", RecipesDetailsIdController);
// to find an Recipes by Name
router.get("/:RecipesName", RecipesDetailNameController);
// to find an Recipes by Creater
router.get("/:RecipesCreater", RecipesDetailCreaterController);

// ----------------------------------------------------------------

module.exports = router;
