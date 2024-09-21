const pool = require("./pool");
const asyncHandler = require("express-async-handler");

const insertUser = async (username, first, last, password) => {
  await pool.query(
    `insert into users (username,firstname,lastname,password) values($1,$2,$3,$4) `,
    [username, first, last, password]
  );
};
const readUsers = async (req, res) => {
  const { rows } = await pool.query(`select * from users`);
  return rows;
};
module.exports = { insertUser, readUsers };
