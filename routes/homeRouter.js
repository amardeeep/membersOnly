const { Router } = require("express");
const homeRouter = Router();
homeRouter.get("/", (req, res) => {
  res.render("home", { user: req.user, message: req.message });
});
module.exports = homeRouter;
