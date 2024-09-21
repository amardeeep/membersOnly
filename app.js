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
//set up app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//authenication middleware
//create strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const rows = await queries.readUser(username);
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: "Incorrect Username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect Password" });
    }
    return done(null, user);
  })
);
//create session
app.use(session({ secret: "Cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
//Routes
app.use("/", homeRouter);
app.get("/login", (req, res) => {
  res.render("login", { title: "Login!" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup!" });
});
app.post("/signup", signupcontroller.createUser);
app.listen(3000, console.log("Listening on port 3000"));
