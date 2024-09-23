const queries = require("../db/queries");
const postNewMessage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const message = req.body.message;
    await queries.insertMessage(message, user_id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
};
module.exports = { postNewMessage };
