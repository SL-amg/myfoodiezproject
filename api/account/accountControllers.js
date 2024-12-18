// This Controller's function is to Create/Retrieve/Update an Account
const bcrypt = require("bcrypt");
const Account = require("../../models/Account");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require ("../../key"); // to check this
// ----------------------------------------------------------------

// Create A New Account

// const createNewAccount = async (newAccountData) => {
//   console.log("Creating new Account", newAccountData);
//   const newAccount = await Account.create(newAccountData);
//   return newAccount;
// };
// exports.createAccountController = (req, res) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newAccount = createNewAccount(req.body);
//     res.status(201).json(newAccount);
//   } catch (e) {
//     res.status(500).json(e.message);
//     console.log(e.message);
//   }
// }; removed this

exports.registerUserController = async (req, res) => {
  const saltRounds = 10;
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const accountusername = Account(req.body);
    await accountusername.save();
    const payload = {
      id: accountusername.id,
      name: accountusername.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};
//  Logout from Account
exports.logoutUserController = async (req, res) => {
  const accountusername = await Account.find({ session: `${req.body.token}` });
  if (accountusername.length > 0) {
    const accountusername = users[0];
    accountusername.session = null;
    await accountusername.save();
  }
  res.status(200).json();
};

//  Login from Account
exports.loginUserController = async (req, res) => {
  const { user } = req;
  console.log(user);
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// ----------------------------------------------------------------

// Retrieve all Accounts

exports.listAccountsController = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
};
// ----------------------------------------------------------------

// Retrieve an Account's Detail by token

exports.accountDetailIdController = async (req, res) => {
  const { user } = req;
  const account = await Account.findById(user.id);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
};

// Retrieve an Account's Detail by Username

exports.accountDetailUserController = async (req, res) => {
  const { userName } = req.params;
  const name = await Account.findOne({
    username: { $regex: userName, $options: "i" },
  });
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
};

// ----------------------------------------------------------------

// Update an Account by ID

exports.updateAccountController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(200).json();
    } else {
      res.status(404).json("Account ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------

// Delete Account by ID
exports.deleteAccountIdController = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

//END of Controller
