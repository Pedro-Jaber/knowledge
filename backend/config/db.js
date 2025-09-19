const config = require("../knexfile.js");
const knex = require("knex")(config);

knex.migrate
  .latest([config])
  .then(() => {
    console.log("\x1b[42m", "PostgreSQL: ONLINE", "\x1b[0m");
  })
  .catch((err) => {
    console.log("\x1b[41m", "PostgreSQL: OFFLINE", "\x1b[0m");
    console.log(`Error: ${err}`);
  });
module.exports = knex;
