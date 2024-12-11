const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
// ----------------------------------------------------------------

// our controllers

const {
  listCategoriesController,
  categoryDetailIdController,
  categoryDetailNameController,
  creatCategoryController,
  updateCategoryByIdController,
  deleteCategoryIdController,
} = require("./categoryControllers");

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
//Category Routs
// to get all Category Fetch Get
router.get("/", listCategoriesController);
//to creat a new Category
router.post("/", upload.single("image"), creatCategoryController);
// to Update an Category  by ID
router.put(
  "/:categoryId",
  upload.single("image"),
  updateCategoryByIdController
);
// to delete an Category by ID
router.delete("/:categoryId", deleteCategoryIdController);
// to find an Category by ID
router.get("/:categoryId", categoryDetailIdController);
// to find an Category by Name
router.get("/:categoryName", categoryDetailNameController);
// ----------------------------------------------------------------

module.exports = router;
