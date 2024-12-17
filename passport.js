const Account = require("./models/Account");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("./key");



exports.localStrategy = new LocalStrategy(
    { usernameField: "username" },
    async (name, password, done) => { // change it to user name from name sultan code
      try {
        const user = await Account.findOne({ username: name });
        const passwordsMatch = user
          ? await bcrypt.compare(password, user.password)
          : false;
        if (passwordsMatch) {
          return done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  );

  //JWD class see video

  exports.jwtStrategy = new JWTStrategy(
    {
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      if (Date.now() > jwtPayload.exp) {
        console.log("jwt expired");
        return done(null, false);
      }
      try {
        const user = await Account.findById(jwtPayload.id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  );