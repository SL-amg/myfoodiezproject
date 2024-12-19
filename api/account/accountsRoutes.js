const express = require("express");
const multer = require("multer");
const router = express.Router();
const passport =require("passport");

// Account Controllers
const {
  accountDetailIdController,
  accountDetailUserController,
  listAccountsController,
  updateAccountController,
  deleteAccountIdController,
  registerUserController,
  logoutUserController,
  loginUserController,
  updateProfileController,
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


//Authnticstion
//Register User
router.post("/signup", upload.single("image"), registerUserController);
//Logout User
router.post("/logoutuser", logoutUserController);
//Login User
router.post("/signin", passport.authenticate('local', { session: false }), loginUserController);

//Account Routes
// Retrieve all Accounts
router.get("/", listAccountsController);

//Create an Account
// router.post("/", upload.single("image"), createAccountController); removed this

// Update an Account by ID
// router.put("/:accountId", upload.single("image"), updateAccountController);

// Update an profile
router.put("/updateprofile", 
  passport.authenticate("jwt", {session: false}) ,
   upload.single("image"), updateProfileController);

// Delete Account by ID
router.delete("/:accountId", deleteAccountIdController);

// Retrieve Account by token
router.get("/details", passport.authenticate("jwt", {session: false}) ,accountDetailIdController);

// Retrieve Account by Username
router.get("/user/:userName", accountDetailUserController);

module.exports = router;
