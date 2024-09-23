const { Router } = require("express");
const queries = require("../db/queries");
const homeController = require("../controllers/homeControllers");
const homeRouter = Router();
homeRouter.get("/", async (req, res) => {
  const messages = await queries.readMessages();
  const users = await queries.readUsers();
  console.log(req.user);
  res.render("home", { user: req.user, users: users, messages: messages });
});
homeRouter.get("/newMessage", async (req, res) => {
  res.render("newMessage");
});
homeRouter.post("/newMessage", homeController.postNewMessage);
module.exports = homeRouter;
