/*
npm i bcrypt consign cors express jwt-simple knex moment mongoose node-schedule node-schedule passport passport-jwt pg pm2
*/

require("dotenv").config();
const app = require("express")();
const consign = require("consign");

const db = require("./config/db");

//* Dotenv
const PORT = process.env.PORT || 3000;

//* Config
app.db = db;
consign()
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(PORT, () => {
  console.log("┌─────────────────────────────┐");
  console.log("│ Server:\x1b[92m Online \x1b[0m             │");
  console.log(`│ Port: ${PORT}                  │`);
  console.log(`│ link: http://localhost:${PORT} │`);
  console.log("└─────────────────────────────┘");
});
