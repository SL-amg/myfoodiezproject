//------------------------------
//my Components imports

//------------------------------

const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");
const cors = require ('cors');
const passport = require("passport"); // have to add this
const { localStrategy} = require("./passport"); // setup from password local stratgy
const { jwtStrategy } = require("./passport") // setup from password local stratgy
//-------------------------

const accountsRouter = require("./api/account/accountsRoutes"); // this to be checked and changed
const categoryRouter = require("./api/category/categoryRoutes");
const ingredientsRouter = require("./api/ingredients/ingredientsRoutes");
const recipesRouter = require("./api/Recipes/RecipesRoutes");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(
  "/media",
  express.static(path.join(__dirname, "media")) // this will give you your path exatly to ur media file
); // from notion express to uplode image class to upload image form server
app.use("/accounts", accountsRouter); // this one to be checked
app.use("/categories", categoryRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);
connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
//-------------------------------------

