//import required dependencies
const express = require("express");
const path = require("node:path");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("./db/queries");
//import controllers
const signupcontroller = require("./controllers/signUpController");
const homeRouter = require("./routes/homeRouter");
const pool = require("./db/pool");
//set up app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
//authenication middleware
//create strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        `select * from users where username = $1`,
        [username]
      );
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
//serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(`select * from users where id = $1`, [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});
//create session
app.use(session({ secret: "Cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
//Routes
app.use("/", homeRouter);
app.get("/login", (req, res) => {
  const error = req.session.messages;
  res.render("login", { title: "Login!", error: error });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);
app.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup!" });
});
app.post("/signup", signupcontroller.createUser);
app.listen(3000, console.log("Listening on port 3000"));
