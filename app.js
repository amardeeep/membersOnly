const express = require("express");
const path = require("node:path");

const asyncHandler = require("express-async-handler");
const signupcontroller = require("./controllers/signUpController");
const homeRouter = require("./routes/homeRouter");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", homeRouter);
app.get("/login", (req, res) => {
  res.render("login", { title: "Login!" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup!" });
});
app.post("/signup", signupcontroller.createUser);
app.listen(3000, console.log("Listening on port 3000"));
