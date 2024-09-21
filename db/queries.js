const pool = require("./pool");
const asyncHandler = require("express-async-handler");

const insertUser = async (username, first, last, password) => {
  await pool.query(
    `insert into users (username,password,firstname,lastname) values($1,$2,$3,$4) `,
    [username, password, first, last]
  );
};
const readUsers = async (req, res) => {
  const { rows } = await pool.query(`select * from users`);
  console.log(rows);
  return rows;
};
module.exports = { insertUser, readUsers };
