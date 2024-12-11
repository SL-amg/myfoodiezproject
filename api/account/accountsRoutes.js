const express = require("express");
const multer = require("multer");
const router = express.Router();

// Account Controllers
const {
  createAccountController,
  accountDetailIdController,
  accountDetailUserController,
  listAccountsController,
  updateAccountController,
  deleteAccountIdController,
} = require("./accountControllers");

// ----------------------------------------------------------------

// Storing Images
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

// ----------------------------------------------------------------

//Account Routes

// Retrieve all Accounts
router.get("/", listAccountsController);

//Create an Account
router.post("/", upload.single("image"), createAccountController);

// Update an Account by ID
router.put("/:accountId", upload.single("image"), updateAccountController);

// Delete Account by ID
router.delete("/:accountId", deleteAccountIdController);

// Retrieve Account by ID
router.get("/:accountId", accountDetailIdController);

// Retrieve Account by Username
router.get("/user/:userName", accountDetailUserController);

module.exports = router;
