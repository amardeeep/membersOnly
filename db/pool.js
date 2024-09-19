const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgresql://deetsy4455:ADEEPS7315@localhost:5432/membersOnly",
});
module.exports = pool;
