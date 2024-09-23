const { Router } = require("express");
const queries = require("../db/queries");
const homeController = require("../controllers/homeControllers");
const homeRouter = Router();
homeRouter.get("/", async (req, res) => {
  const messages = await queries.readMessages();
  console.log(messages);
  const users = await queries.readUsers();
  res.render("home", { user: req.user, users: users, messages: messages });
});
homeRouter.get("/newMessage", async (req, res) => {
  if (req.user) {
    res.render("newMessage");
  } else {
    res.redirect("/unauthorized");
  }
});
homeRouter.get("/becomeMember", (req, res) => {
  if (req.user) {
    res.render("becomeMember");
  } else {
    res.redirect("/unauthorized");
  }
});
homeRouter.post("/becomeMember", homeController.postCode);
homeRouter.get("/unauthorized", (req, res) => {
  res.render("unauthorized");
});
homeRouter.post("/newMessage", homeController.postNewMessage);
module.exports = homeRouter;
