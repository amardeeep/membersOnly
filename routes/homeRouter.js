const { Router } = require("express");
const queries = require("../db/queries");
const homeRouter = Router();
homeRouter.get("/", async (req, res) => {
  const users = await queries.readUsers();
  res.render("home", { user: req.user, users: users });
});
module.exports = homeRouter;
